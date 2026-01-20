/**
 * Dynamic Sitemap Generator for Elec-Mate
 *
 * Generates sitemap.xml from all known routes.
 * Run: node scripts/generateSitemap.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = 'https://elec-mate.com';

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

// Core static pages
const STATIC_PAGES = [
  // Home & Auth
  { url: '/', changefreq: 'weekly', priority: PRIORITY.HOME },
  { url: '/auth', changefreq: 'monthly', priority: PRIORITY.OTHER },
  { url: '/pricing', changefreq: 'weekly', priority: PRIORITY.HUB },

  // Main Hubs
  { url: '/apprentice', changefreq: 'weekly', priority: PRIORITY.HUB },
  { url: '/electrician', changefreq: 'weekly', priority: PRIORITY.HUB },
  { url: '/employer', changefreq: 'weekly', priority: PRIORITY.HUB },
  { url: '/community', changefreq: 'daily', priority: PRIORITY.OTHER },

  // Study Centre
  { url: '/study-centre', changefreq: 'weekly', priority: PRIORITY.HUB },
  { url: '/study-centre/apprentice', changefreq: 'weekly', priority: PRIORITY.HUB },
  { url: '/study-centre/apprentice/level-2', changefreq: 'monthly', priority: PRIORITY.COURSE },
  { url: '/study-centre/apprentice/level-3', changefreq: 'monthly', priority: PRIORITY.COURSE },
  { url: '/study-centre/upskilling', changefreq: 'weekly', priority: PRIORITY.HUB },
  { url: '/study-centre/upskilling/18th-edition', changefreq: 'monthly', priority: PRIORITY.COURSE },
  { url: '/study-centre/upskilling/inspection-testing', changefreq: 'monthly', priority: PRIORITY.COURSE },
  { url: '/study-centre/upskilling/pat-testing', changefreq: 'monthly', priority: PRIORITY.COURSE },
  { url: '/study-centre/upskilling/ev-charging', changefreq: 'monthly', priority: PRIORITY.COURSE },
  { url: '/study-centre/upskilling/solar-pv', changefreq: 'monthly', priority: PRIORITY.COURSE },

  // Electrician Tools
  { url: '/electrician/tools', changefreq: 'weekly', priority: PRIORITY.HUB },
  { url: '/electrician/cable-calculator', changefreq: 'monthly', priority: PRIORITY.TOOL },
  { url: '/electrician/max-demand', changefreq: 'monthly', priority: PRIORITY.TOOL },
  { url: '/electrician/voltage-drop', changefreq: 'monthly', priority: PRIORITY.TOOL },
  { url: '/electrician/conduit-calculator', changefreq: 'monthly', priority: PRIORITY.TOOL },
  { url: '/electrician/trunking-calculator', changefreq: 'monthly', priority: PRIORITY.TOOL },
  { url: '/electrician/lighting-calculator', changefreq: 'monthly', priority: PRIORITY.TOOL },
  { url: '/electrician/power-calculator', changefreq: 'monthly', priority: PRIORITY.TOOL },
  { url: '/electrician/fault-current', changefreq: 'monthly', priority: PRIORITY.TOOL },
  { url: '/electrician/earth-loop', changefreq: 'monthly', priority: PRIORITY.TOOL },
  { url: '/electrician/rcd-calculator', changefreq: 'monthly', priority: PRIORITY.TOOL },

  // Certification
  { url: '/electrician/certificates', changefreq: 'weekly', priority: PRIORITY.HUB },
  { url: '/electrician/certificates/eicr', changefreq: 'monthly', priority: PRIORITY.CERT },
  { url: '/electrician/certificates/eic', changefreq: 'monthly', priority: PRIORITY.CERT },
  { url: '/electrician/certificates/minor-works', changefreq: 'monthly', priority: PRIORITY.CERT },

  // AI Tools
  { url: '/electrician/ai-designer', changefreq: 'weekly', priority: PRIORITY.TOOL },
  { url: '/electrician/cost-engineer', changefreq: 'weekly', priority: PRIORITY.TOOL },

  // Live Pricing
  { url: '/electrician/live-pricing', changefreq: 'daily', priority: PRIORITY.HUB },

  // Employer
  { url: '/employer/job-board', changefreq: 'daily', priority: PRIORITY.OTHER },

  // Legal
  { url: '/legal/privacy', changefreq: 'monthly', priority: PRIORITY.OTHER },
  { url: '/legal/terms', changefreq: 'monthly', priority: PRIORITY.OTHER },
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

  modules.forEach(mod => {
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

  modules.forEach(mod => {
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

  modules.forEach(mod => {
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

  chapters.forEach(ch => {
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

  modules.forEach(mod => {
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

// Combine all routes
function getAllRoutes() {
  return [
    ...STATIC_PAGES,
    ...generateLevel2Routes(),
    ...generateLevel3Routes(),
    ...generateAM2Routes(),
    ...generate18thEditionRoutes(),
    ...generateInspectionTestingRoutes(),
  ];
}

// Generate sitemap XML
function generateSitemapXML(routes) {
  const today = new Date().toISOString().split('T')[0];

  const urlEntries = routes.map(route => `
  <url>
    <loc>${SITE_URL}${route.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <!-- Generated by Elec-Mate Sitemap Generator -->
  <!-- Last updated: ${today} -->
  <!-- Total URLs: ${routes.length} -->${urlEntries}
</urlset>`;
}

// Main execution
const routes = getAllRoutes();
const sitemap = generateSitemapXML(routes);
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
