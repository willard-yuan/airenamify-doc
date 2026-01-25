export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Handle download route
    if (url.pathname === '/download') {
      const platform = url.searchParams.get('os');
      
      if (!platform) {
        return new Response('Missing "os" parameter (mac or win)', { status: 400 });
      }

      // Map platform to file extension/pattern
      // Mac uses .dmg, Windows uses .exe
      const isMac = platform === 'mac';
      const extension = isMac ? '.dmg' : '.exe';
      
      try {
        // List files from R2 bucket
        // Ensure "release/" prefix matches your bucket structure
        const listing = await env.RELEASE_BUCKET.list({ prefix: 'release/' });
        
        if (!listing.objects || listing.objects.length === 0) {
          return new Response('No release files found', { status: 404 });
        }

        // Filter and find the latest version
        const latest = listing.objects
          .filter(obj => obj.key.endsWith(extension) && !obj.key.includes('blockmap')) // Filter correct extension and ignore blockmaps
          .sort((a, b) => {
            // Robust Semantic Versioning Sorting
            // Assumes filenames like: AiRenamify-1.1.2-mac... or AiRenamify-1.1.2-win...
            // Regex captures: 1=Major, 2=Minor, 3=Patch
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

              // Compare Major
              if (majorA !== majorB) return majorB - majorA;
              // Compare Minor
              if (minorA !== minorB) return minorB - minorA;
              // Compare Patch
              if (patchA !== patchB) return patchB - patchA;
            }
            
            // Fallback to string comparison (descending) if version parsing fails
            // Note: String sort works for fixed-width numbers but fails for 1.10 vs 1.2
            return b.key.localeCompare(a.key);
          })[0];

        if (!latest) {
           return new Response(`No ${platform} release found`, { status: 404 });
        }

        // Redirect to the public CDN URL
        const redirectUrl = `https://contents-cdn.airenamify.com/${latest.key}`;
        return Response.redirect(redirectUrl, 302);

      } catch (err) {
        return new Response(`Error fetching releases: ${err.message}`, { status: 500 });
      }
    }

    // Fallback to static assets for all other routes
    // This serves the content from "assets.directory" (./public)
    return env.ASSETS.fetch(request);
  }
};
