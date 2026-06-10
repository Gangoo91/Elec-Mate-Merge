/**
 * Dynamic Sitemap Generator for Elec-Mate
 *
 * Generates sitemap.xml from all known routes.
 * Run: node scripts/generateSitemap.mjs
 *
 * IMPORTANT: this sitemap is for PUBLIC marketing pages only. App routes
 * (study-centre, electrician dashboards, employer, etc.) are disallowed in
 * robots.txt — including them here generates 200+ GSC warnings and wastes
 * crawl budget. Public SEO pages (/tools, /guides, /compare, /training) live
 * in their own dedicated sitemaps (sitemap-tools.xml, sitemap-guides.xml,
 * etc.) and must NOT be duplicated here.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = 'https://www.elec-mate.com';

// Robots.txt disallow prefixes — any URL starting with one of these is excluded
// at the end of generation. Keeps the sitemap honest if someone adds an app
// route to STATIC_PAGES by mistake.
const ROBOTS_DISALLOW = [
  '/dashboard',
  '/electrician/',
  '/apprentice/',
  '/employer',
  '/study-centre/',
  '/profile',
  '/settings',
  '/walkthrough',
  '/admin',
  '/api',
  '/auth/',
  '/checkout-trial',
  '/notifications',
  '/customers',
  '/subscriptions',
  '/mental-health',
  '/college',
  '/elec-id',
  '/elec-ids',
  '/analytics',
  '/audit',
  '/conversations',
  '/emails',
  '/export',
  '/feature-flags',
  '/founders',
  '/materials',
  '/offers',
  '/revenue',
  '/support',
];

const isAllowed = (url) => !ROBOTS_DISALLOW.some((p) => url.startsWith(p));

// Priority levels
const PRIORITY = {
  HOME: '1.0',
  HUB: '0.9',
  COURSE: '0.8',
  MODULE: '0.7',
  SECTION: '0.6',
  TOOL: '0.8',
  CERT: '0.8',
  OTHER: '0.5',
};

// Public marketing pages only — see header comment.
// App routes (electrician dashboard, study-centre, employer, etc.) are
// disallowed by robots.txt and live behind auth, so they must NOT appear here.
// NOTE: every URL here must be a real route in src/AppRouter.tsx / SEORoutes.tsx.
// /auth, /pricing, /community, /legal/* were phantom URLs (no routes → soft-404s)
// and were removed 2026-06-10. Static pages now live in sitemap-pages.xml;
// sitemap.xml is a sitemap INDEX referencing the sub-sitemaps.
const STATIC_PAGES = [
  { url: '/', changefreq: 'weekly', priority: PRIORITY.HOME },
  { url: '/guides', changefreq: 'weekly', priority: PRIORITY.HUB },
  { url: '/tools', changefreq: 'weekly', priority: PRIORITY.HUB },
  { url: '/training', changefreq: 'weekly', priority: PRIORITY.HUB },
  { url: '/compare', changefreq: 'weekly', priority: PRIORITY.HUB },
  { url: '/privacy', changefreq: 'monthly', priority: PRIORITY.OTHER },
  { url: '/terms', changefreq: 'monthly', priority: PRIORITY.OTHER },
  { url: '/cookies', changefreq: 'monthly', priority: PRIORITY.OTHER },
];

// Sub-sitemaps referenced by the sitemap.xml index. Keep in sync with
// public/robots.txt Sitemap: lines.
const SUB_SITEMAPS = [
  'sitemap-pages.xml',
  'sitemap-guides.xml',
  'sitemap-seo.xml',
  'sitemap-tools.xml',
  'sitemap-training.xml',
  'sitemap-compare.xml',
  'sitemap-mock-exams.xml',
  'sitemap-images.xml',
];

// Generate Level 2 course pages (7 modules, 4-6 sections each)
function generateLevel2Routes() {
  const routes = [];
  const modules = [
    { num: 1, sections: 6, name: 'Health & Safety' },
    { num: 2, sections: 5, name: 'Electrical Science' },
    { num: 3, sections: 6, name: 'Installation Methods' },
    { num: 4, sections: 5, name: 'Wiring Systems' },
    { num: 5, sections: 4, name: 'Testing & Inspection' },
    { num: 6, sections: 5, name: 'Earthing & Bonding' },
    { num: 7, sections: 4, name: 'Legislation & Regulations' },
  ];

  modules.forEach((mod) => {
    // Module page
    routes.push({
      url: `/study-centre/apprentice/level-2/module${mod.num}`,
      changefreq: 'monthly',
      priority: PRIORITY.MODULE,
    });

    // Section pages
    for (let s = 1; s <= mod.sections; s++) {
      routes.push({
        url: `/study-centre/apprentice/level-2/module${mod.num}/section${s}`,
        changefreq: 'monthly',
        priority: PRIORITY.SECTION,
      });
    }
  });

  return routes;
}

// Generate Level 3 course pages (8 modules)
function generateLevel3Routes() {
  const routes = [];
  const modules = [
    { num: 1, sections: 5 },
    { num: 2, sections: 6 },
    { num: 3, sections: 5 },
    { num: 4, sections: 6 },
    { num: 5, sections: 5 },
    { num: 6, sections: 4 },
    { num: 7, sections: 5 },
    { num: 8, sections: 4 },
  ];

  modules.forEach((mod) => {
    routes.push({
      url: `/study-centre/apprentice/level-3/module${mod.num}`,
      changefreq: 'monthly',
      priority: PRIORITY.MODULE,
    });

    for (let s = 1; s <= mod.sections; s++) {
      routes.push({
        url: `/study-centre/apprentice/level-3/module${mod.num}/section${s}`,
        changefreq: 'monthly',
        priority: PRIORITY.SECTION,
      });
    }
  });

  return routes;
}

// Generate AM2 course routes
function generateAM2Routes() {
  const routes = [];
  const modules = [
    { num: 1, sections: 4 },
    { num: 2, sections: 5 },
    { num: 3, sections: 6 },
    { num: 4, sections: 6 },
    { num: 5, sections: 6 },
    { num: 6, sections: 4 },
    { num: 7, sections: 4 },
    { num: 8, sections: 0 }, // Summary module
  ];

  routes.push({
    url: '/study-centre/apprentice/am2',
    changefreq: 'monthly',
    priority: PRIORITY.COURSE,
  });

  modules.forEach((mod) => {
    routes.push({
      url: `/study-centre/apprentice/am2/module${mod.num}`,
      changefreq: 'monthly',
      priority: PRIORITY.MODULE,
    });

    for (let s = 1; s <= mod.sections; s++) {
      routes.push({
        url: `/study-centre/apprentice/am2/module${mod.num}/section${s}`,
        changefreq: 'monthly',
        priority: PRIORITY.SECTION,
      });
    }
  });

  return routes;
}

// Generate 18th Edition course routes
function generate18thEditionRoutes() {
  const routes = [];
  const chapters = [1, 2, 3, 4, 5, 6, 7];

  chapters.forEach((ch) => {
    routes.push({
      url: `/study-centre/upskilling/18th-edition/chapter${ch}`,
      changefreq: 'monthly',
      priority: PRIORITY.MODULE,
    });

    // 4-6 sections per chapter
    const sections = ch <= 3 ? 5 : 4;
    for (let s = 1; s <= sections; s++) {
      routes.push({
        url: `/study-centre/upskilling/18th-edition/chapter${ch}/section${s}`,
        changefreq: 'monthly',
        priority: PRIORITY.SECTION,
      });
    }
  });

  return routes;
}

// Generate inspection & testing routes
function generateInspectionTestingRoutes() {
  const routes = [];
  const modules = [1, 2, 3, 4, 5, 6];

  modules.forEach((mod) => {
    routes.push({
      url: `/study-centre/upskilling/inspection-testing/module${mod}`,
      changefreq: 'monthly',
      priority: PRIORITY.MODULE,
    });

    for (let s = 1; s <= 4; s++) {
      routes.push({
        url: `/study-centre/upskilling/inspection-testing/module${mod}/section${s}`,
        changefreq: 'monthly',
        priority: PRIORITY.SECTION,
      });
    }
  });

  return routes;
}

// Combine all routes — only STATIC_PAGES (public marketing) make it in.
// All course/module/section routes are auth-gated and disallowed; we keep the
// generators below for reference / for use by other sitemap files that index
// public marketing variants of course content (none currently).
function getAllRoutes() {
  const all = [...STATIC_PAGES];
  // Final guard: drop anything that matches a robots.txt disallow prefix.
  return all.filter((r) => isAllowed(r.url));
}

// Generate sitemap index XML — sitemap.xml references the sub-sitemaps;
// actual URLs live in those files (static pages in sitemap-pages.xml).
function generateSitemapIndexXML() {
  const today = new Date().toISOString().split('T')[0];

  const entries = SUB_SITEMAPS.map(
    (file) => `
  <sitemap>
    <loc>${SITE_URL}/${file}</loc>
  </sitemap>`
  ).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Generated by Elec-Mate Sitemap Generator -->
  <!-- Last updated: ${today} -->${entries}
</sitemapindex>`;
}

// Main execution
const routes = getAllRoutes();
const sitemap = generateSitemapIndexXML();
const outputPath = path.join(__dirname, '..', 'public', 'sitemap.xml');

fs.writeFileSync(outputPath, sitemap);

console.log(`✅ Sitemap generated successfully!`);
console.log(`   📍 Output: ${outputPath}`);
console.log(`   📊 Total URLs: ${routes.length}`);
console.log(`   📈 Breakdown:`);
console.log(`      - Static pages: ${STATIC_PAGES.length}`);
console.log(`      - Level 2 course: ${generateLevel2Routes().length}`);
console.log(`      - Level 3 course: ${generateLevel3Routes().length}`);
console.log(`      - AM2 course: ${generateAM2Routes().length}`);
console.log(`      - 18th Edition: ${generate18thEditionRoutes().length}`);
console.log(`      - Inspection & Testing: ${generateInspectionTestingRoutes().length}`);
