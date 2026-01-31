export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Handle download route
    if (url.pathname === '/download') {
      const platform = url.searchParams.get('os');
      const arch = url.searchParams.get('arch'); // 'arm64' or 'x64'
      
      if (!platform) {
        return new Response('Missing "os" parameter (mac or win)', { status: 400 });
      }

      // Map platform to file extension and manifest file
      const isMac = platform === 'mac';
      const extension = isMac ? '.dmg' : '.exe';
      const manifestFile = isMac ? 'latest-mac.yml' : 'latest.yml';
      
      // Strategy 1: Fast Path - Read from manifest file (Source of Truth)
      try {
        const manifestObj = await env.RELEASE_BUCKET.get(`release/${manifestFile}`);
        if (manifestObj) {
          const content = await manifestObj.text();
          const lines = content.split('\n');
          
          for (const line of lines) {
            // Look for lines containing "url:" and the target extension
            // YAML format: "  - url: AiRenamify-1.1.3-mac-arm64.dmg"
            if (line.includes('url:') && line.includes(extension)) {
              const parts = line.split('url:');
              if (parts.length > 1) {
                const filename = parts[1].trim().replace(/['"]/g, ''); // Remove quotes if present
                
                // Check Architecture Match
                // If arch is specified (e.g. 'arm64'), filename MUST include it
                let matchesArch = true;
                if (arch) {
                   matchesArch = filename.toLowerCase().includes(arch.toLowerCase());
                }
                
                if (matchesArch) {
                   // Found the correct file in manifest
                   return Response.redirect(`https://contents-cdn.airenamify.com/release/${filename}`, 302);
                }
              }
            }
          }
        }
      } catch (err) {
        // Log error but continue to fallback
        console.error(`Manifest lookup failed for ${manifestFile}:`, err);
      }

      // Strategy 2: Robust Fallback - List and Sort R2 bucket files
      try {
        const listing = await env.RELEASE_BUCKET.list({ prefix: 'release/' });
        
        if (!listing.objects || listing.objects.length === 0) {
          return new Response('No release files found', { status: 404 });
        }

        // Filter and find the latest version
        const latest = listing.objects
          .filter(obj => {
            const hasExtension = obj.key.endsWith(extension);
            const isNotBlockmap = !obj.key.includes('blockmap');
            
            let matchesArch = true;
            if (arch) {
              matchesArch = obj.key.toLowerCase().includes(arch.toLowerCase());
            }
            
            return hasExtension && isNotBlockmap && matchesArch;
          })
          .sort((a, b) => {
            // Semantic Versioning Sorting
            const versionRegex = /-(\d+)\.(\d+)\.(\d+)[-.]/;
            const versionA = a.key.match(versionRegex);
            const versionB = b.key.match(versionRegex);

            if (versionA && versionB) {
              const majorA = parseInt(versionA[1]);
              const minorA = parseInt(versionA[2]);
              const patchA = parseInt(versionA[3]);
              
              const majorB = parseInt(versionB[1]);
              const minorB = parseInt(versionB[2]);
              const patchB = parseInt(versionB[3]);

              if (majorA !== majorB) return majorB - majorA;
              if (minorA !== minorB) return minorB - minorA;
              if (patchA !== patchB) return patchB - patchA;
            }
            
            return b.key.localeCompare(a.key);
          })[0];

        if (!latest) {
           return new Response(`No ${platform} release found${arch ? ' for ' + arch : ''}`, { status: 404 });
        }

        return Response.redirect(`https://contents-cdn.airenamify.com/${latest.key}`, 302);

      } catch (err) {
        return new Response(`Error fetching releases: ${err.message}`, { status: 500 });
      }
    }

    // Fallback to static assets
    return env.ASSETS.fetch(request);
  }
};
