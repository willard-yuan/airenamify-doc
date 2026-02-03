const fs = require('fs');
const path = require('path');
const marked = require('marked');
const frontMatter = require('front-matter');

const BLOG_DIR = path.join(__dirname, '../blog_posts');
const PUBLIC_DIR = path.join(__dirname, '../public');
const BLOG_PUBLIC_DIR = path.join(PUBLIC_DIR, 'blog');
const LAYOUTS_DIR = path.join(__dirname, '../_layouts');

// Ensure directories exist
if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR);
if (!fs.existsSync(BLOG_PUBLIC_DIR)) fs.mkdirSync(BLOG_PUBLIC_DIR);

// Helper to format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// 1. Read and Parse Posts
const posts = [];
const files = fs.readdirSync(BLOG_DIR);

files.forEach(file => {
    if (!file.endsWith('.md')) return;
    
    const content = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
    const { attributes, body } = frontMatter(content);
    let html = marked.parse(body);

    // Optional: Remove the first H1 if it exists, as we render title in the header
    html = html.replace(/<h1[^>]*>.*?<\/h1>/s, '');
    
    // Auto-generate description if missing
    let description = attributes.description || attributes.summary;
    if (!description) {
        const plainText = html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
        description = plainText.substring(0, 160) + (plainText.length > 160 ? '...' : '');
    }
    
    // Update attributes with ensured description
    attributes.description = description;
    
    posts.push({
        attributes,
        body,
        html,
        filename: file,
        slug: attributes.slug || file.replace('.md', ''),
        date: new Date(attributes.date)
    });
});

// Sort by date descending
posts.sort((a, b) => b.date - a.date);

// 2. Generate List Page (blog.html)
const listTemplate = fs.readFileSync(path.join(LAYOUTS_DIR, 'blog-list.html'), 'utf-8');
let listHtml = listTemplate;

const gridHtml = posts.map(post => `
    <article class="flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
        <a href="blog/${post.slug}.html" class="block h-48 overflow-hidden bg-gray-100 relative">
            <img src="${post.attributes.cover_image}" alt="${post.attributes.title}" class="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500">
        </a>
        <div class="flex-1 p-6 flex flex-col">
            <div class="flex items-center gap-2 mb-3">
                 <span class="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">Article</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2 leading-tight">
                <a href="blog/${post.slug}.html" class="hover:text-emerald-600 transition-colors">
                    ${post.attributes.title}
                </a>
            </h3>
            <div class="flex items-center text-gray-500 text-sm mt-auto pt-2">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                ${formatDate(post.attributes.date)}
            </div>
            <p class="text-gray-600 mt-3 line-clamp-3 text-sm">
                ${post.attributes.description}
            </p>
            <a href="blog/${post.slug}.html" class="inline-flex items-center mt-4 text-emerald-600 font-medium hover:text-emerald-700">
                Read more <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </a>
        </div>
    </article>
`).join('\n');

listHtml = listHtml.replace('<!-- BLOG_POSTS_GRID -->', gridHtml);
listHtml = listHtml.replace('{{TOTAL_POSTS}}', posts.length);

fs.writeFileSync(path.join(PUBLIC_DIR, 'blog.html'), listHtml);
console.log(`Generated blog.html with ${posts.length} posts.`);

// 3. Generate Detail Pages
const postTemplate = fs.readFileSync(path.join(LAYOUTS_DIR, 'blog-post.html'), 'utf-8');

posts.forEach(post => {
    let postHtml = postTemplate;
    
    // Recommendations: Pick top 2 posts that are NOT the current one
    const recommendations = posts.filter(p => p.slug !== post.slug).slice(0, 2);
    
    let recommendationSectionHtml = '';

    if (recommendations.length >= 2) {
        const recCardsHtml = recommendations.map(rec => `
        <article class="flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <a href="${rec.slug}.html" class="block h-48 overflow-hidden bg-gray-100 relative">
                <img src="../${rec.attributes.cover_image}" alt="${rec.attributes.title}" class="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500">
            </a>
            <div class="flex-1 p-6 flex flex-col">
                <h3 class="text-xl font-bold text-gray-900 mb-2 leading-tight">
                    <a href="${rec.slug}.html" class="hover:text-emerald-600 transition-colors">
                        ${rec.attributes.title}
                    </a>
                </h3>
                <div class="flex items-center text-gray-500 text-sm mt-2 mb-3">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    ${formatDate(rec.attributes.date)}
                </div>
                <a href="${rec.slug}.html" class="inline-flex items-center mt-auto text-emerald-600 font-medium hover:text-emerald-700">
                    Read more <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </a>
            </div>
        </article>
        `).join('\n');

        recommendationSectionHtml = `
        <section class="bg-gray-50 py-16 border-t border-gray-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 class="text-3xl font-bold text-gray-900 mb-8">Read next</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    ${recCardsHtml}
                </div>
            </div>
        </section>
        `;
    }

    // Replacements
    postHtml = postHtml.replace(/{{TITLE}}/g, post.attributes.title);
    postHtml = postHtml.replace(/{{DATE}}/g, formatDate(post.attributes.date));
    postHtml = postHtml.replace(/{{AUTHOR}}/g, post.attributes.author || 'AiRenamify Team');
    postHtml = postHtml.replace(/{{CONTENT}}/g, post.html);
    postHtml = postHtml.replace(/{{COVER_IMAGE}}/g, post.attributes.cover_image);
    postHtml = postHtml.replace(/{{COVER_IMAGE_FULL}}/g, `https://airenamify.com/${post.attributes.cover_image}`);
    postHtml = postHtml.replace(/{{DESCRIPTION}}/g, post.attributes.description);
    postHtml = postHtml.replace('{{RECOMMENDATIONS_SECTION}}', recommendationSectionHtml);
    postHtml = postHtml.replace(/{{CANONICAL_URL}}/g, `https://airenamify.com/blog/${post.slug}.html`);
    
    // Fix image paths: ./images/ -> ../images/
    postHtml = postHtml.replace(/src="\.\/images\//g, 'src="../images/');
    postHtml = postHtml.replace(/src="images\//g, 'src="../images/');

    fs.writeFileSync(path.join(BLOG_PUBLIC_DIR, `${post.slug}.html`), postHtml);
    console.log(`Generated blog/${post.slug}.html`);
});

// 4. Update Sitemap
const sitemapPath = path.join(PUBLIC_DIR, 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
    let sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
    const today = new Date().toISOString().split('T')[0];

    const blogListEntry = `
  <url>
    <loc>https://airenamify.com/blog.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`;

    const blogPostEntries = posts.map(post => `
  <url>
    <loc>https://airenamify.com/blog/${post.slug}.html</loc>
    <lastmod>${new Date(post.attributes.date).toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('');

    // Insert before </urlset>
    sitemapContent = sitemapContent.replace('</urlset>', `${blogListEntry}${blogPostEntries}\n</urlset>`);
    fs.writeFileSync(sitemapPath, sitemapContent);
    console.log('Updated sitemap.xml with blog entries.');
}

console.log('Blog build complete!');
