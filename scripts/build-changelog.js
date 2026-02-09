const fs = require('fs');
const path = require('path');
const marked = require('marked');
const frontMatter = require('front-matter');

const CHANGELOG_MD = path.join(__dirname, '../changelog.md');
const TEMPLATE_PATH = path.join(__dirname, '../_layouts/changelog-template.html');
const OUTPUT_PATH = path.join(__dirname, '../changelog.html');

// Icon Mapping
const ICON_MAP = {
    '🚀': { bg: 'bg-purple-50', text: 'text-purple-600', path: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' }, // User/Profile
    '🎨': { bg: 'bg-blue-50', text: 'text-blue-600', path: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z' }, // UI
    '🍏': { bg: 'bg-green-50', text: 'text-green-600', path: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4' }, // Download/System
    '🌓': { bg: 'bg-gray-50', text: 'text-gray-600', path: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z' }, // Dark Mode
    '⚡': { bg: 'bg-blue-50', text: 'text-blue-600', path: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' }, // Update/Lightning
    '🔒': { bg: 'bg-purple-50', text: 'text-purple-600', path: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' }, // Security/Lock (Using Profile icon as fallback/similar)
    '💳': { bg: 'bg-green-50', text: 'text-green-600', path: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' }, // Payment
    'default': { bg: 'bg-gray-50', text: 'text-gray-600', path: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' } // Info
};

function parseChangelog(mdContent) {
    const versions = [];
    // Split by version header (## v...)
    const versionBlocks = mdContent.split(/^##\s+v/gm).slice(1); // Skip preamble

    versionBlocks.forEach(block => {
        const lines = block.trim().split('\n');
        // First line is version number + optional metadata
        // e.g. "1.1.2" or "1.1.2 (2026-01-25) [Latest]"
        // But in my md I used:
        // ## v1.1.2
        // **Date:** ...
        // **Badge:** ...
        
        // Wait, split removes the delimiter. So "1.1.2" is at the start of the block.
        const versionLine = lines[0].trim();
        const version = `v${versionLine}`;
        
        let date = '';
        let badge = '';
        let summary = '';
        let features = [];
        
        let currentFeature = null;
        
        // Process remaining lines
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;
            
            if (line.startsWith('**Date:**')) {
                date = line.replace('**Date:**', '').trim();
            } else if (line.startsWith('**Badge:**')) {
                badge = line.replace('**Badge:**', '').trim();
            } else if (line.startsWith('###')) {
                // New Feature
                if (currentFeature) features.push(currentFeature);
                
                const titleRaw = line.replace(/^###\s+/, '').trim();
                // Extract icon if present (first char)
                // Assuming emoji is 2 chars (surrogate pair) or 1 char. 
                // Simple regex for "Emoji Space Title"
                const match = titleRaw.match(/^([\u{1F300}-\u{1F9FF}|]|[\u2600-\u26FF])\s+(.*)/u);
                
                let icon = 'default';
                let title = titleRaw;
                
                if (match) {
                    icon = match[1];
                    title = match[2];
                }
                
                currentFeature = {
                    icon: icon,
                    title: title,
                    description: ''
                };
            } else {
                // Content
                if (currentFeature) {
                    // Append to feature description
                    // Convert markdown bold to html strong
                    let processedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                    currentFeature.description += (currentFeature.description ? ' ' : '') + processedLine;
                } else {
                    // Summary text
                    if (!summary) summary = line;
                    else summary += ' ' + line;
                }
            }
        }
        if (currentFeature) features.push(currentFeature);
        
        versions.push({
            version,
            date,
            badge,
            summary,
            features
        });
    });
    
    return versions;
}

function generateHtml(versions) {
    return versions.map((v, index) => {
        const isLatest = v.badge === 'Latest';
        const dotColor = isLatest ? 'border-indigo-600' : 'border-blue-500';
        const badgeHtml = isLatest ? `
            <span class="px-3 py-0.5 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold border border-indigo-100">
                Latest
            </span>` : '';
            
        const featuresHtml = v.features.map(f => {
            const iconConfig = ICON_MAP[f.icon] || ICON_MAP['default'];
            return `
                <li class="flex items-start group">
                    <div class="flex-shrink-0 w-10 h-10 rounded-xl ${iconConfig.bg} flex items-center justify-center mr-5 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                        <svg class="w-5 h-5 ${iconConfig.text}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${iconConfig.path}" />
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-lg font-bold text-gray-900 mb-2">${f.title}</h3>
                        <p class="text-gray-600 leading-relaxed text-base">
                            ${f.description}
                        </p>
                    </div>
                </li>
            `;
        }).join('\n');

        return `
            <!-- ${v.version} Entry -->
            <div class="relative pl-8 md:pl-12">
                <!-- Timeline Dot -->
                <div class="absolute -left-[9px] top-1.5 w-5 h-5 bg-white border-4 ${dotColor} rounded-full shadow-sm z-10"></div>
                
                <!-- Header Row -->
                <div class="flex flex-col sm:flex-row sm:items-baseline gap-3 mb-6">
                    <h2 class="text-2xl font-bold text-gray-900">${v.version}</h2>
                    <div class="flex items-center gap-2">
                        ${badgeHtml}
                        <span class="text-gray-400 text-sm font-medium">${v.date}</span>
                    </div>
                </div>

                <!-- Card -->
                <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                    <p class="text-gray-600 mb-8 text-lg">
                        ${v.summary}
                    </p>
                    
                    <ul class="space-y-8">
                        ${featuresHtml}
                    </ul>
                </div>
            </div>
        `;
    }).join('\n\n');
}

function updateIndexHtml(latestVersion) {
    const INDEX_PATH = path.join(__dirname, '../index.html');
    if (!fs.existsSync(INDEX_PATH)) {
        console.warn('index.html not found, skipping homepage update.');
        return;
    }

    let indexContent = fs.readFileSync(INDEX_PATH, 'utf-8');

    // Generate HTML for Index
    // Badge
    const badgeHtml = latestVersion.badge === 'Latest' ? 
        `<span class="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-bold border border-blue-100">Latest Release</span>` : '';

    // Features (Limit to 3)
    const featuresHtml = latestVersion.features.slice(0, 3).map(f => {
        const iconConfig = ICON_MAP[f.icon] || ICON_MAP['default'];
        return `                            <div class="space-y-3">
                                <div class="w-10 h-10 rounded-xl ${iconConfig.bg} flex items-center justify-center">
                                    <svg class="w-5 h-5 ${iconConfig.text}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${iconConfig.path}" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 class="font-bold text-gray-900 mb-1">${f.title}</h4>
                                    <p class="text-sm text-gray-600 leading-relaxed">${f.description}</p>
                                </div>
                            </div>`;
    }).join('\n');

    const newContent = `<!-- LATEST_UPDATE_START -->
                        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                            <div class="flex items-center gap-3">
                                <h3 class="text-2xl font-bold text-gray-900">${latestVersion.version}</h3>
                                ${badgeHtml}
                            </div>
                            <span class="text-gray-500 font-medium">${latestVersion.date}</span>
                        </div>

                        <div class="grid md:grid-cols-3 gap-8 mb-8">
${featuresHtml}
                        </div>
                        <!-- LATEST_UPDATE_END -->`;

    // Replace
    const regex = /<!-- LATEST_UPDATE_START -->[\s\S]*?<!-- LATEST_UPDATE_END -->/;
    if (regex.test(indexContent)) {
        indexContent = indexContent.replace(regex, newContent);
        fs.writeFileSync(INDEX_PATH, indexContent);
        console.log(`Successfully updated index.html with version ${latestVersion.version}.`);
    } else {
        console.warn('Could not find LATEST_UPDATE markers in index.html');
    }
}

// Main execution
try {
    const mdContent = fs.readFileSync(CHANGELOG_MD, 'utf-8');
    const { body } = frontMatter(mdContent);
    
    const versions = parseChangelog(body);
    const timelineHtml = generateHtml(versions);
    
    let template = fs.readFileSync(TEMPLATE_PATH, 'utf-8');
    const finalHtml = template.replace('{{CHANGELOG_TIMELINE}}', timelineHtml);
    
    fs.writeFileSync(OUTPUT_PATH, finalHtml);
    console.log(`Successfully generated changelog.html with ${versions.length} versions.`);
    
    // Update Index
    if (versions.length > 0) {
        updateIndexHtml(versions[0]);
    }
    
} catch (error) {
    console.error('Error building changelog:', error);
    process.exit(1);
}
