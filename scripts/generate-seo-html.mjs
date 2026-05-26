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
const MOCK_EXAM_ROUTES_FILE = join(ROOT, 'src/routes/MockExamRoutes.tsx');
const MOCK_EXAM_PAGES_DIR = join(ROOT, 'src/pages/mock-exams');
const MOCK_EXAM_PREFIX = '/mock-exams';
const BASE_URL = 'https://www.elec-mate.com';

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

// Also parse MockExamRoutes.tsx. Its routes are relative (no leading slash)
// because they're mounted under /mock-exams/* in AppRouter — prepend that.
if (existsSync(MOCK_EXAM_ROUTES_FILE)) {
  const mockSrc = readFileSync(MOCK_EXAM_ROUTES_FILE, 'utf-8');
  let m;
  // Match <Route path="X" element={wrap(ComponentName)} />
  // and the special index route: <Route index element={wrap(HubPage)} />.
  const mockRouteRegex = /<Route\s+(?:path="([^"]+)"|index)\s+element=\{wrap\((\w+)\)\}/g;
  let mockCount = 0;
  while ((m = mockRouteRegex.exec(mockSrc)) !== null) {
    const sub = m[1]; // undefined for `index`
    const path = sub ? `${MOCK_EXAM_PREFIX}/${sub}` : MOCK_EXAM_PREFIX;
    routeEntries.push({ path, componentName: m[2] });
    mockCount++;
  }
  console.log(`Found ${mockCount} mock-exam routes in MockExamRoutes.tsx`);
}

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
// Also map the mock-exam pages
if (existsSync(MOCK_EXAM_PAGES_DIR)) {
  for (const file of readdirSync(MOCK_EXAM_PAGES_DIR).filter((f) => f.endsWith('.tsx'))) {
    fileMap.set(file.replace('.tsx', ''), join(MOCK_EXAM_PAGES_DIR, file));
  }
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
  'PublicMockExamPage',
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

  // Pattern 5: GeneratedGuidePage wrapper — follow into the linked config file.
  // The wrapper pattern is:
  //   import { someConfig } from '@/pages/seo/generated/someConfig';
  //   ...
  //   <GeneratedGuidePage config={someConfig} />
  // Read someConfig.ts and extract `title:` and `description:` from the
  // object literal.
  if (!title || !description) {
    const cfgUseMatch = src.match(/<GeneratedGuidePage\s+config=\{(\w+)\}/);
    if (cfgUseMatch) {
      const configIdent = cfgUseMatch[1];
      const importRe = new RegExp(
        `import\\s*\\{\\s*${configIdent}\\s*\\}\\s*from\\s*['"]@/pages/seo/generated/(\\w+)['"]`
      );
      const importMatch = src.match(importRe);
      if (importMatch) {
        const configFile = join(SEO_PAGES_DIR, 'generated', `${importMatch[1]}.ts`);
        if (existsSync(configFile)) {
          const cfgSrc = readFileSync(configFile, 'utf-8');
          if (!title) {
            const t =
              cfgSrc.match(/\btitle:\s*\n?\s*'([^']+)'/) ||
              cfgSrc.match(/\btitle:\s*\n?\s*"([^"]+)"/);
            if (t) title = t[1].replace(/\\'/g, "'");
          }
          if (!description) {
            const d =
              cfgSrc.match(/\bdescription:\s*\n?\s*'([^']+)'/) ||
              cfgSrc.match(/\bdescription:\s*\n?\s*"([^"]+)"/);
            if (d) description = d[1].replace(/\\'/g, "'");
          }
        }
      }
    }
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

/**
 * Inject extra JSON-LD schema blocks (LearningResource + BreadcrumbList +
 * FAQPage) just before </head>. Helmet only renders client-side; for fast
 * first-crawl indexing we need these in the static HTML too.
 */
function injectExtraSchemas(html, schemas) {
  if (!schemas || schemas.length === 0) return html;
  const blocks = schemas
    .map((s) => `  <script type="application/ld+json">${JSON.stringify(s)}</script>`)
    .join('\n');
  return html.replace('</head>', `${blocks}\n  </head>`);
}

/**
 * Build the mock-exam-specific JSON-LD schemas. We pre-render
 * LearningResource (rich snippet eligibility), BreadcrumbList (sitelinks),
 * and a basic FAQPage (PAA box capture) using only the page metadata —
 * Quiz schema with sample questions still renders client-side via Helmet
 * because pulling them in JS would mean parsing TypeScript banks here.
 */
// Map of base exam slug → display title, used for the parent-exam crumb
// on topic pages. Kept inline rather than importing from the TS catalog
// to keep this script dependency-free at runtime.
const MOCK_EXAM_TITLE_BY_SLUG = {
  'am2-online-knowledge-test': 'AM2 Online Knowledge Test',
  '2391-inspection-testing': 'C&G 2391 Inspection & Testing',
  'asbestos-awareness': 'Asbestos Awareness',
  'confined-spaces': 'Confined Spaces',
  'coshh': 'COSHH',
  'cscs-card': 'CSCS Card HS&E Test',
  'fire-safety': 'Fire Safety',
  'first-aid': 'First Aid at Work',
  'ipaf': 'IPAF MEWP Operator',
  'manual-handling': 'Manual Handling',
  'pasma': 'PASMA Towers for Users',
  'working-at-height': 'Working at Height',
};

function buildMockExamSchemas({ url, title, description, slug, isHub }) {
  const schemas = [];
  // LearningResource — the headline schema for a free educational resource
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: title,
    description,
    url,
    learningResourceType: isHub ? 'Resource list' : 'Quiz',
    educationalLevel: 'professional',
    teaches: title,
    isAccessibleForFree: true,
    inLanguage: 'en-GB',
    provider: {
      '@type': 'Organization',
      name: 'Elec-Mate',
      url: BASE_URL,
    },
  });
  // BreadcrumbList — Home > Mock Exams > Page
  if (isHub) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: 'Mock Exams', item: `${BASE_URL}/mock-exams` },
      ],
    });
  } else {
    // Topic landings have a 4-level crumb (Home → Mock Exams → Exam → Topic).
    const slugParts = slug.split('/');
    const isTopic = slugParts.length === 2;
    const parentExamTitle = isTopic ? MOCK_EXAM_TITLE_BY_SLUG[slugParts[0]] : null;
    const itemListElement = [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Mock Exams', item: `${BASE_URL}/mock-exams` },
    ];
    if (isTopic && parentExamTitle) {
      itemListElement.push({
        '@type': 'ListItem',
        position: 3,
        name: parentExamTitle,
        item: `${BASE_URL}/mock-exams/${slugParts[0]}`,
      });
      itemListElement.push({ '@type': 'ListItem', position: 4, name: title, item: url });
    } else {
      itemListElement.push({ '@type': 'ListItem', position: 3, name: title, item: url });
    }
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement,
    });
  }
  // FAQPage — basic, exam-format Q&As reusable across every page
  if (!isHub) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: `Is the ${title.replace(/Free|Mock Exam|2026|UK/gi, '').trim() || 'mock exam'} free?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. This mock exam is 100% free with no sign-up required. Questions are pulled at random from a substantial question bank, with worked answer explanations on every question after submit.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I retake the mock exam?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes — every attempt picks a different random selection of questions from the bank, so each retake gives you new questions. No limit on retakes.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does the score on this mock exam count towards the real qualification?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. This is independent practice material for revision purposes only. To gain the actual qualification you need to take the real assessment through an approved provider.',
          },
        },
        {
          '@type': 'Question',
          name: 'What happens if I get a question wrong?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'After you submit the exam you see your overall score, a per-topic breakdown bar chart, and a worked explanation on every question — including why the correct answer is right.',
          },
        },
      ],
    });
  }
  return schemas;
}

// ---------------------------------------------------------------------------
// 5b. Expand the dynamic topic route /mock-exams/:examSlug/:topicSlug.
//     Without this the prerender would try to write a literal
//     `:examSlug/:topicSlug` directory. Each concrete (exam, topic) pair
//     generates its own static HTML with topic-specific title +
//     description + canonical, so Google indexes ~67 long-tail landings.
// ---------------------------------------------------------------------------

// Banks that participate in topic landings — mirrors src/components/seo/
// mockExamTopicRegistry.ts. Update both files together when adding new
// topic-enabled exams.
const TOPIC_REGISTRY = [
  { examSlug: 'am2-online-knowledge-test', shortName: 'AM2 Online Knowledge Test', subject: 'AM2 questions', bankFile: 'src/data/apprentice-courses/am2/questionBank.ts', questionsPerExam: 15, timeLimit: 25 },
  { examSlug: '2391-inspection-testing', shortName: 'C&G 2391 Inspection & Testing', subject: 'inspection and testing questions', bankFile: 'src/data/upskilling/inspectionTestingMockExamData.ts', questionsPerExam: 20, timeLimit: 25 },
  { examSlug: 'asbestos-awareness', shortName: 'Asbestos Awareness', subject: 'asbestos awareness questions', bankFile: 'src/data/general-upskilling/asbestosMockExamData.ts', questionsPerExam: 15, timeLimit: 20 },
  { examSlug: 'confined-spaces', shortName: 'Confined Spaces', subject: 'confined spaces questions', bankFile: 'src/data/general-upskilling/confinedSpacesMockExamData.ts', questionsPerExam: 15, timeLimit: 20 },
  { examSlug: 'coshh', shortName: 'COSHH', subject: 'COSHH questions', bankFile: 'src/data/general-upskilling/coshhMockExamData.ts', questionsPerExam: 15, timeLimit: 20 },
  { examSlug: 'cscs-card', shortName: 'CSCS Card HS&E Test', subject: 'CSCS test questions', bankFile: 'src/data/general-upskilling/cscsCardMockExamData.ts', questionsPerExam: 15, timeLimit: 20 },
  { examSlug: 'fire-safety', shortName: 'Fire Safety', subject: 'fire safety questions', bankFile: 'src/data/general-upskilling/fireSafetyMockExamData.ts', questionsPerExam: 15, timeLimit: 20 },
  { examSlug: 'first-aid', shortName: 'First Aid at Work', subject: 'first aid questions', bankFile: 'src/data/general-upskilling/firstAidMockExamData.ts', questionsPerExam: 15, timeLimit: 20 },
  { examSlug: 'ipaf', shortName: 'IPAF MEWP Operator', subject: 'IPAF questions', bankFile: 'src/data/general-upskilling/ipafMockExamData.ts', questionsPerExam: 15, timeLimit: 20 },
  { examSlug: 'manual-handling', shortName: 'Manual Handling', subject: 'manual handling questions', bankFile: 'src/data/general-upskilling/manualHandlingMockExamData.ts', questionsPerExam: 15, timeLimit: 20 },
  { examSlug: 'pasma', shortName: 'PASMA Towers for Users', subject: 'PASMA questions', bankFile: 'src/data/general-upskilling/pasmaMockExamData.ts', questionsPerExam: 15, timeLimit: 20 },
  { examSlug: 'working-at-height', shortName: 'Working at Height', subject: 'working at height questions', bankFile: 'src/data/general-upskilling/workingAtHeightMockExamData.ts', questionsPerExam: 15, timeLimit: 20 },
];

function categoryToSlug(c) {
  return c.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

// Filter out the dynamic topic route from the main loop, then build
// concrete entries for every (exam, topic) pair instead.
const dynamicTopicRouteIdx = routeEntries.findIndex(
  (r) => r.path === '/mock-exams/:examSlug/:topicSlug'
);
if (dynamicTopicRouteIdx >= 0) routeEntries.splice(dynamicTopicRouteIdx, 1);

let topicCount = 0;
for (const entry of TOPIC_REGISTRY) {
  const bankPath = join(ROOT, entry.bankFile);
  if (!existsSync(bankPath)) continue;
  const bankSrc = readFileSync(bankPath, 'utf-8');
  // Count per-category from category: 'X' literals.
  const counts = new Map();
  for (const m of bankSrc.matchAll(/category\s*:\s*['"`]([^'"`]+)['"`]/g)) {
    counts.set(m[1], (counts.get(m[1]) ?? 0) + 1);
  }
  for (const [category, qCount] of counts) {
    if (qCount < 5) continue; // matches resolveTopicPage() guard
    const slug = categoryToSlug(category);
    const questionsPerExam = Math.min(entry.questionsPerExam, qCount);
    const title = `${category} — ${entry.shortName} Mock Exam 2026`;
    const description = `Practice ${qCount} ${entry.subject} focused on ${category}. Free mock exam, ${questionsPerExam} random questions, ${entry.timeLimit}-minute timer, instant results + explanations. No sign-up.`;
    routeEntries.push({
      path: `${MOCK_EXAM_PREFIX}/${entry.examSlug}/${slug}`,
      componentName: '__TOPIC__',
      __topicMeta: { title, description, examSlug: entry.examSlug, topicSlug: slug, category },
    });
    topicCount++;
  }
}
console.log(`Expanded ${topicCount} topic landings from ${TOPIC_REGISTRY.length} exams`);

// ---------------------------------------------------------------------------
// 6. Main — iterate routes, extract metadata, write files
// ---------------------------------------------------------------------------
let generated = 0;
let skipped = 0;
let fallback = 0;

for (const { path: routePath, componentName, __topicMeta } of routeEntries) {
  // Resolve source file
  const sourceFile = importMap.get(componentName) || fileMap.get(componentName);

  let title = null;
  let description = null;

  // Dynamic topic landings come with pre-built meta — no file to parse.
  if (__topicMeta) {
    title = __topicMeta.title;
    description = __topicMeta.description;
  } else if (sourceFile) {
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

  let html = generateHtml(template, {
    path: routePath,
    title,
    description,
  });

  // Mock-exam routes get extra schemas (LearningResource, BreadcrumbList,
  // FAQPage) baked into the static HTML for first-crawl indexability.
  const isMockExam = routePath === MOCK_EXAM_PREFIX || routePath.startsWith(`${MOCK_EXAM_PREFIX}/`);
  if (isMockExam && title && description) {
    const slug = routePath === MOCK_EXAM_PREFIX ? '' : routePath.slice(MOCK_EXAM_PREFIX.length + 1);
    const url = `${BASE_URL}${routePath}`;
    const schemas = buildMockExamSchemas({
      url,
      title: `${title} | Elec-Mate`,
      description,
      slug,
      isHub: routePath === MOCK_EXAM_PREFIX,
    });
    html = injectExtraSchemas(html, schemas);
  }

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
