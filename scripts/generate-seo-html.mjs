#!/usr/bin/env node

/**
 * generate-seo-html.mjs
 *
 * Post-build script that generates per-route static HTML files for SEO.
 *
 * How it works:
 * 1. Reads dist/index.html as the template
 * 2. Parses src/routes/SEORoutes.tsx to extract route paths + component names
 * 3. Resolves each component to a page source file in src/pages/seo/
 * 4. Extracts title and description from the page source
 * 5. Writes dist/{path}/index.html with correct <title>, meta tags, canonical, OG
 *
 * This lets Vercel serve route-specific HTML with correct metadata before the
 * SPA JavaScript even loads — fixing Google Search Console indexing issues.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIST = join(ROOT, 'dist');
const SEO_ROUTES_FILE = join(ROOT, 'src/routes/SEORoutes.tsx');
const SEO_PAGES_DIR = join(ROOT, 'src/pages/seo');
const BASE_URL = 'https://elec-mate.com';

// ---------------------------------------------------------------------------
// 1. Read the built index.html template
// ---------------------------------------------------------------------------
const templatePath = join(DIST, 'index.html');
if (!existsSync(templatePath)) {
  console.error('ERROR: dist/index.html not found. Run vite build first.');
  process.exit(1);
}
const template = readFileSync(templatePath, 'utf-8');

// ---------------------------------------------------------------------------
// 2. Parse SEORoutes.tsx → array of { path, componentName }
// ---------------------------------------------------------------------------
const routesSource = readFileSync(SEO_ROUTES_FILE, 'utf-8');

// Extract route entries: path="/guides/foo" paired with the component name
// Pattern matches <Route path="..." element={<LazyRoute><ComponentName /></LazyRoute>} />
const routeEntries = [];
const routeRegex = /path="([^"]+)"[\s\S]*?<(\w+)\s*\/>/g;
let match;
while ((match = routeRegex.exec(routesSource)) !== null) {
  routeEntries.push({ path: match[1], componentName: match[2] });
}

console.log(`Found ${routeEntries.length} SEO routes in SEORoutes.tsx`);

// ---------------------------------------------------------------------------
// 3. Build a map of componentName → source file path
//    Component names in SEORoutes.tsx map to files in src/pages/seo/
// ---------------------------------------------------------------------------
const seoFiles = readdirSync(SEO_PAGES_DIR).filter((f) => f.endsWith('.tsx'));
const fileMap = new Map(); // componentName → full file path
for (const file of seoFiles) {
  // File name without extension = component name (by convention)
  const name = file.replace('.tsx', '');
  fileMap.set(name, join(SEO_PAGES_DIR, file));
}

// Also build from the lazy import lines for exact mapping:
// const ComponentName = lazy(() => import('@/pages/seo/ComponentName'));
const importMap = new Map();
const importRegex = /const\s+(\w+)\s*=\s*lazy\(\s*\(\)\s*=>\s*import\(\s*['"]@\/pages\/seo\/(\w+)['"]\s*\)\s*\)/g;
while ((match = importRegex.exec(routesSource)) !== null) {
  const componentName = match[1];
  const importName = match[2];
  if (fileMap.has(importName)) {
    importMap.set(componentName, fileMap.get(importName));
  }
}

// ---------------------------------------------------------------------------
// 4. Extract title + description from a page source file
// ---------------------------------------------------------------------------

// Template component names whose title/description props are the SEO metadata
const TEMPLATE_NAMES = [
  'GuideTemplate',
  'ComparisonTemplate',
  'ToolTemplate',
  'CourseTemplate',
  'BusinessTemplate',
];

function extractMetadata(filePath) {
  if (!filePath || !existsSync(filePath)) return null;

  const src = readFileSync(filePath, 'utf-8');
  let title = null;
  let description = null;

  // Pattern 1: const PAGE_TITLE = '...' or "..."
  const pageTitleMatch = src.match(/(?:const|let)\s+PAGE_TITLE\s*=\s*['"`]([^'"`]+)['"`]/);
  if (pageTitleMatch) title = pageTitleMatch[1];

  const pageDescMatch = src.match(/(?:const|let)\s+PAGE_DESCRIPTION\s*=\s*['"`]([^'"`]+)['"`]/);
  if (pageDescMatch) description = pageDescMatch[1];

  // Pattern 2: Template component props — <GuideTemplate title="..." description="..." ...>
  // We find the template opening tag and extract title/description from its props block
  if (!title || !description) {
    for (const tmpl of TEMPLATE_NAMES) {
      // Match from <TemplateName to the closing > (which may span many lines)
      // We grab up to 2000 chars after the tag open to capture the props
      const tmplIdx = src.indexOf(`<${tmpl}`);
      if (tmplIdx === -1) continue;

      // Extract a chunk of text after <TemplateName (up to 2000 chars should cover props)
      const propsChunk = src.slice(tmplIdx, tmplIdx + 2000);

      if (!title) {
        // title="..." or title={'...'}
        const tMatch =
          propsChunk.match(/\n\s+title="([^"]+)"/) ||
          propsChunk.match(/\n\s+title='([^']+)'/) ||
          propsChunk.match(/\n\s+title=\{['"`]([^'"`]+)['"`]\}/);
        if (tMatch) title = tMatch[1];
      }

      if (!description) {
        const dMatch =
          propsChunk.match(/\n\s+description="([^"]+)"/) ||
          propsChunk.match(/\n\s+description='([^']+)'/) ||
          propsChunk.match(/\n\s+description=\{['"`]([^'"`]+)['"`]\}/);
        if (dMatch) description = dMatch[1];
      }

      if (title && description) break;
    }
  }

  // Pattern 3: useSEO({ title: '...', description: '...' })
  if (!title) {
    const useSEOTitleMatch = src.match(
      /useSEO\(\s*\{[^}]*?title:\s*['"`]([^'"`]+)['"`]/
    );
    if (useSEOTitleMatch) title = useSEOTitleMatch[1];
  }
  if (!description) {
    const useSEODescMatch = src.match(
      /useSEO\(\s*\{[^}]*?description:\s*['"`]([^'"`]+)['"`]/
    );
    if (useSEODescMatch) description = useSEODescMatch[1];
  }

  // Pattern 4: Multi-line PAGE_DESCRIPTION with template literal or string concat
  if (!description) {
    const multiLineDescMatch = src.match(
      /(?:const|let)\s+PAGE_DESCRIPTION\s*=\s*\n?\s*['"`]([^'"`]{20,})['"`]/
    );
    if (multiLineDescMatch) description = multiLineDescMatch[1];
  }

  return title || description ? { title, description } : null;
}

// ---------------------------------------------------------------------------
// 5. Generate HTML for each route
// ---------------------------------------------------------------------------
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function generateHtml(templateHtml, { path: routePath, title, description }) {
  const canonicalUrl = `${BASE_URL}${routePath}`;
  let html = templateHtml;

  // Replace <title>...</title>
  if (title) {
    html = html.replace(
      /<title>[^<]*<\/title>/,
      `<title>${escapeHtml(title)}</title>`
    );
  }

  // Replace or inject <link rel="canonical" ...>
  if (html.includes('rel="canonical"')) {
    html = html.replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
      `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`
    );
  } else {
    // Inject before </head>
    html = html.replace(
      '</head>',
      `  <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />\n  </head>`
    );
  }

  // Replace meta name="title"
  if (title) {
    html = html.replace(
      /<meta\s+name="title"\s+content="[^"]*"\s*\/?>/,
      `<meta name="title" content="${escapeHtml(title)}" />`
    );
  }

  // Replace meta name="description"
  if (description) {
    html = html.replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${escapeHtml(description)}" />`
    );
    // Handle multiline <meta name="description" ...> (with newlines in original)
    html = html.replace(
      /<meta\n\s+name="description"\n\s+content="[^"]*"\n\s*\/?>/,
      `<meta name="description" content="${escapeHtml(description)}" />`
    );
  }

  // Replace OG tags
  if (title) {
    html = html.replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
      `<meta property="og:title" content="${escapeHtml(title)}" />`
    );
  }
  if (description) {
    html = html.replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
      `<meta property="og:description" content="${escapeHtml(description)}" />`
    );
    // Handle multiline og:description
    html = html.replace(
      /<meta\n\s+property="og:description"\n\s+content="[^"]*"\n\s*\/?>/,
      `<meta property="og:description" content="${escapeHtml(description)}" />`
    );
  }
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${escapeHtml(canonicalUrl)}" />`
  );

  // Replace Twitter tags
  if (title) {
    html = html.replace(
      /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
      `<meta name="twitter:title" content="${escapeHtml(title)}" />`
    );
  }
  if (description) {
    html = html.replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
      `<meta name="twitter:description" content="${escapeHtml(description)}" />`
    );
    // Handle multiline twitter:description
    html = html.replace(
      /<meta\n\s+name="twitter:description"\n\s+content="[^"]*"\n\s*\/?>/,
      `<meta name="twitter:description" content="${escapeHtml(description)}" />`
    );
  }
  html = html.replace(
    /<meta\s+name="twitter:url"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:url" content="${escapeHtml(canonicalUrl)}" />`
  );

  return html;
}

// ---------------------------------------------------------------------------
// 6. Main — iterate routes, extract metadata, write files
// ---------------------------------------------------------------------------
let generated = 0;
let skipped = 0;
let fallback = 0;

for (const { path: routePath, componentName } of routeEntries) {
  // Resolve source file
  const sourceFile = importMap.get(componentName) || fileMap.get(componentName);

  let title = null;
  let description = null;

  if (sourceFile) {
    const meta = extractMetadata(sourceFile);
    if (meta) {
      title = meta.title;
      description = meta.description;
    }
  }

  // Even without title/description, we still generate the HTML for the
  // canonical URL alone — that fixes the primary GSC duplicate issue
  if (!title && !description) {
    fallback++;
  }

  const html = generateHtml(template, {
    path: routePath,
    title,
    description,
  });

  // Write to dist/{path}/index.html
  const outDir = join(DIST, routePath);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'index.html'), html, 'utf-8');
  generated++;
}

console.log(
  `\nSEO HTML generation complete:\n` +
    `  ${generated} files generated\n` +
    `  ${fallback} using default metadata (canonical URL still set)\n` +
    `  ${skipped} skipped`
);
