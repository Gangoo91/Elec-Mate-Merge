#!/usr/bin/env node
/**
 * inject-inbound-links.mjs — Add inbound RelatedPage entries from existing
 * high-authority pages → new SEO pages.
 *
 * The 40 new SEO pages have outbound `relatedPages` but no INBOUND link equity
 * from the existing 1000+ page corpus. This script:
 *
 *  1. Reads the inbound-link map (data below: target → list of source slugs)
 *  2. For each (source, target) pair:
 *     - Locates source page .tsx file
 *     - Parses its existing `relatedPages` array (legacy + GeneratedGuideConfig shape)
 *     - Inserts a new entry pointing to target if not already present
 *     - Caps relatedPages length to 6 (drops oldest if needed)
 *  3. Writes back. Idempotent — running twice = no-op.
 *
 * Adds inline `<SEOInternalLink href="...">` injection is NOT done here
 * (riskier to mangle JSX). relatedPages is declarative and safer.
 */

import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');
const SEO_PAGES_DIR = join(ROOT, 'src/pages/seo');
const SEO_GEN_DIR = join(ROOT, 'src/pages/seo/generated');
const SEO_ROUTES_FILE = join(ROOT, 'src/routes/SEORoutes.tsx');

const APPLY = process.argv.includes('--apply');

// -- inbound link map -----------------------------------------------------
// target slug → array of source slugs (existing high-authority pages to inject
// inbound links FROM). Curated by topic cluster.

const INBOUND_MAP = {
  // ====== A4:2026 deep-dives ======
  '/guides/afdd-mandatory-hmo-care-home-a4-2026': {
    title: 'AFDD Mandatory in HMOs & Care Homes (A4:2026)',
    description: 'BS 7671:2018+A4:2026 expanded AFDD scope. Where, when, and EICR coding.',
    icon: 'ShieldCheck',
    category: 'Guide',
    sources: [
      '/guides/eicr-for-hmo', '/guides/hmo-electrical-requirements',
      '/guides/eicr-plastic-consumer-unit-hmo', '/guides/afdd-guide',
      '/guides/bs-7671-amendment-4', '/guides/care-home-electrical-cost',
    ],
  },
  '/guides/section-722-ev-charging-a4-2026-changes': {
    title: 'Section 722 EV Charging A4:2026 Changes',
    description: 'RDC-DD, PME, V2G — what changed in Section 722 under A4:2026.',
    icon: 'Car',
    category: 'Guide',
    sources: [
      '/guides/ev-charger-installation', '/guides/cable-size-for-ev-charger',
      '/guides/section-722-ev-charging-complete-guide', '/smart-ev-charging',
      '/workplace-ev-charging', '/guides/iet-code-of-practice-ev',
    ],
  },
  '/guides/spd-chapter-443-a4-2026': {
    title: 'SPD Chapter 443 (A4:2026)',
    description: 'Surge protection risk assessment, Type 1/2/3, EICR coding.',
    icon: 'ShieldCheck',
    category: 'Guide',
    sources: [
      '/guides/spd-guide', '/guides/spd-surge-protection',
      '/guides/power-surge-protection', '/guides/chapter-44-overvoltage-protection',
      '/guides/bs-7671-amendment-4',
    ],
  },
  '/guides/tn-c-banned-new-installations-a4-2026': {
    title: 'TN-C Banned in New Installs (A4:2026)',
    description: 'Why TN-C is prohibited and TN-C-S/TT/TN-S alternatives.',
    icon: 'AlertTriangle',
    category: 'Guide',
    sources: [
      '/guides/tns-vs-tncs-vs-tt', '/guides/what-is-earthing',
      '/guides/eicr-no-main-protective-bonding', '/guides/bs-7671-amendment-4',
      '/guides/ac-vs-dc-earthing',
    ],
  },
  '/guides/cable-reaction-to-fire-cca-a4-2026': {
    title: 'Cable Reaction-to-Fire (Cca) A4:2026',
    description: 'Euroclass Cca, smoke/droplets/acidity ratings, where required.',
    icon: 'Flame',
    category: 'Guide',
    sources: [
      '/guides/cable-colour-codes', '/guides/cable-colour-codes-uk',
      '/guides/bs5266-emergency-lighting-standard', '/guides/bs5839-fire-alarm-standard',
      '/guides/micc-cable-guide', '/guides/bs-7671-amendment-4',
    ],
  },
  '/guides/section-712-prosumer-a4-2026': {
    title: 'Section 712 Prosumer (A4:2026)',
    description: 'Battery storage + solar + microgen under A4:2026.',
    icon: 'Sun',
    category: 'Guide',
    sources: [
      '/guides/prosumer-low-voltage-electrical-installation', '/guides/battery-storage-guide',
      '/guides/solar-pv-certificate-requirements', '/guides/rams-for-solar-pv-installation',
      '/guides/v2g-installation-guide', '/guides/battery-storage-installation',
    ],
  },
  '/guides/section-715-elv-lighting-a4-2026': {
    title: 'Section 715 ELV Lighting (A4:2026)',
    description: 'ELV lighting incl. PoE — SELV/PELV, cable, fire risk.',
    icon: 'Lightbulb',
    category: 'Guide',
    sources: [
      '/guides/poe-lighting-guide', '/guides/smart-home-lighting-installation',
      '/guides/commercial-lighting-guide', '/tools/lighting-lux-calculator',
      '/guides/bs-7671-amendment-4',
    ],
  },
  '/guides/reduced-low-voltage-110v-cte-site-supplies': {
    title: '110V CTE Construction Site Supplies',
    description: 'BS 7375, Section 704 A4:2026, transformer ratings, EICR cycle.',
    icon: 'HardHat',
    category: 'Guide',
    sources: [
      '/guides/construction-site-safety', '/guides/construction-site-safety-electrical',
      '/guides/construction-site-temporary-supply', '/guides/cdm-2015-electricians',
    ],
  },
  // ====== PoE / structured cabling ======
  '/guides/poe-plus-plus-type-4-90w-installation': {
    title: 'PoE++ Type 4 (90W) Installation Guide',
    description: 'IEEE 802.3bt 90W PoE — cable, voltage drop, ELV implications.',
    icon: 'Network',
    category: 'Guide',
    sources: [
      '/guides/poe-lighting-guide', '/guides/smart-home-lighting-installation',
      '/guides/commercial-lighting-guide', '/guides/cctv-installation-electrical',
    ],
  },
  '/guides/cat6-cat6a-current-rating-poe': {
    title: 'Cat6/6a Current Rating for PoE',
    description: 'TIA TSB-184-A bundle de-rating, ambient temp, pull tension.',
    icon: 'Cable',
    category: 'Guide',
    sources: [
      '/guides/poe-lighting-guide', '/guides/cable-derating-calculator',
      '/guides/correction-factors-guide',
    ],
  },
  '/guides/ip-camera-poe-installation-uk': {
    title: 'IP Camera PoE Installation UK',
    description: 'BS EN 62676, GDPR, IP/IK ratings, surge protection.',
    icon: 'Camera',
    category: 'Guide',
    sources: [
      '/guides/cctv-installation-electrical', '/guides/cctv-installation-cost',
      '/guides/security-lighting-cost', '/guides/security-alarm-electrical-fault',
    ],
  },
  '/guides/structured-cabling-bs-en-50173-electricians': {
    title: 'Structured Cabling BS EN 50173',
    description: 'Channel/permanent link, Cat6/6a/7/8, certification testing.',
    icon: 'Network',
    category: 'Guide',
    sources: [
      '/guides/smart-home-wiring-cost', '/guides/commercial-electrician-guide',
      '/guides/data-centre-electrical-installation',
    ],
  },
  '/guides/bs-en-50174-data-cable-installation': {
    title: 'BS EN 50174 Data Cable Installation',
    description: 'Pull tension, bend radius, segregation, tray fill.',
    icon: 'Cable',
    category: 'Guide',
    sources: [
      '/guides/installation-methods-guide', '/guides/correction-factors-guide',
      '/guides/cable-colour-codes', '/guides/smart-home-wiring-cost',
    ],
  },
  '/guides/poe-lighting-vs-traditional-led-wiring': {
    title: 'PoE Lighting vs Traditional LED',
    description: 'Head-to-head — capex, efficiency, BS 7671 implications.',
    icon: 'Lightbulb',
    category: 'Guide',
    sources: [
      '/guides/poe-lighting-guide', '/guides/commercial-lighting-guide',
      '/guides/smart-home-lighting-installation',
    ],
  },
  '/guides/dali-lighting-control-wiring-bs-en-62386': {
    title: 'DALI Lighting Control Wiring',
    description: 'BS EN 62386, DALI-2, D4i, segregation, commissioning.',
    icon: 'Lightbulb',
    category: 'Guide',
    sources: [
      '/guides/commercial-lighting-guide', '/guides/smart-home-lighting-installation',
      '/guides/bs5266-emergency-lighting-standard',
    ],
  },
  '/guides/knx-wiring-installation-guide-uk': {
    title: 'KNX Wiring Installation Guide',
    description: 'BS EN 50090, TP1 bus, topology rules, ETS commissioning.',
    icon: 'Network',
    category: 'Guide',
    sources: [
      '/guides/smart-home-lighting-installation', '/guides/smart-home-wiring-cost',
      '/guides/building-management-systems-electrical', '/guides/commercial-lighting-guide',
    ],
  },
  '/guides/v2h-bidirectional-ev-charging': {
    title: 'V2H Bidirectional EV Charging',
    description: 'CCS, ISO 15118-20, G99, island-mode, tariff arbitrage.',
    icon: 'Car',
    category: 'Guide',
    sources: [
      '/guides/v2g-installation-guide', '/guides/ev-charger-installation',
      '/guides/cable-size-for-ev-charger', '/smart-ev-charging',
    ],
  },
  '/guides/lvdc-dc-microgrid-distribution': {
    title: 'LVDC DC Microgrid Distribution',
    description: '380V/48V DC, DC arc-flash, switchgear, BS EN 62109.',
    icon: 'Zap',
    category: 'Guide',
    sources: [
      '/guides/battery-storage-guide', '/guides/prosumer-low-voltage-electrical-installation',
      '/guides/data-centre-electrical-installation', '/guides/rams-for-solar-pv-installation',
    ],
  },
  '/guides/smart-distribution-board-iot-consumer-unit': {
    title: 'Smart Distribution Board / IoT CU',
    description: 'Per-circuit CT, smart RCBOs, BS EN 61439 TTA, Part P.',
    icon: 'CircuitBoard',
    category: 'Guide',
    sources: [
      '/guides/consumer-unit-upgrade', '/guides/consumer-unit-types',
      '/guides/split-load-vs-rcbo-board', '/guides/smart-home-wiring-cost',
    ],
  },
  '/guides/section-537-isolation-switching-a4-2026': {
    title: 'Section 537 Isolation & Switching (A4:2026)',
    description: 'Four switching functions, EV/PV/BESS isolation under A4:2026.',
    icon: 'Power',
    category: 'Guide',
    sources: [
      '/guides/safe-isolation-procedure', '/guides/method-statement-safe-isolation',
      '/guides/permit-to-work-electrical-isolation', '/guides/lockout-tagout-loto-electricians',
    ],
  },
  // ====== H&S / RAMS ======
  '/guides/electrical-rams-template-uk': {
    title: 'Electrical RAMS Template UK',
    description: 'BS 7671 + CDM 2015 + EAWR — full RAMS template.',
    icon: 'FileText',
    category: 'Guide',
    sources: [
      '/guides/rams-template-guide', '/guides/risk-assessment-electricians',
      '/guides/method-statement-electrical', '/guides/cdm-2015-electricians',
      '/guides/construction-site-safety', '/guides/safe-isolation-procedure',
    ],
  },
  '/guides/rams-for-eicr-inspection': {
    title: 'RAMS for EICR Inspection',
    description: 'Project-specific RAMS for periodic inspection work.',
    icon: 'FileCheck2',
    category: 'Guide',
    sources: [
      '/guides/electrical-rams-template-uk', '/guides/eicr-when-you-need-one',
      '/guides/eicr-example-and-template', '/guides/safe-isolation-procedure',
    ],
  },
  '/guides/rams-for-consumer-unit-replacement': {
    title: 'RAMS for Consumer Unit Replacement',
    description: 'Notifiable Part P + live-working controls.',
    icon: 'FileCheck2',
    category: 'Guide',
    sources: [
      '/guides/consumer-unit-upgrade', '/guides/consumer-unit-types',
      '/guides/electrical-rams-template-uk', '/guides/safe-isolation-procedure',
    ],
  },
  '/guides/rams-for-ev-charger-installation': {
    title: 'RAMS for EV Charger Installation',
    description: 'Project RAMS for OZEV-grade EV charge point install.',
    icon: 'Car',
    category: 'Guide',
    sources: [
      '/guides/ev-charger-installation', '/guides/cable-size-for-ev-charger',
      '/guides/iet-code-of-practice-ev', '/guides/electrical-rams-template-uk',
    ],
  },
  '/guides/rams-for-full-rewire': {
    title: 'RAMS for Full Rewire',
    description: 'Domestic rewire RAMS — first/second fix, dust, asbestos.',
    icon: 'Wrench',
    category: 'Guide',
    sources: [
      '/guides/electrical-rams-template-uk', '/guides/first-fix-electrical',
      '/guides/second-fix-electrical',
    ],
  },
  '/guides/rams-for-solar-pv-installation': {
    title: 'RAMS for Solar PV Installation',
    description: 'Work at height, DC isolation, MCS, G98/G99.',
    icon: 'Sun',
    category: 'Guide',
    sources: [
      '/guides/solar-pv-certificate-requirements', '/guides/solar-pv-system-design',
      '/guides/solar-pv-system-sizing', '/guides/electrical-rams-template-uk',
      '/guides/working-at-height-electricians',
    ],
  },
  '/guides/how-to-write-electrical-method-statement': {
    title: 'How to Write an Electrical Method Statement',
    description: 'CDM 2015 + EAWR 1989 compliant method statement step-by-step.',
    icon: 'FileText',
    category: 'Guide',
    sources: [
      '/guides/method-statement-guide', '/guides/method-statement-electrical',
      '/guides/ai-method-statement',
    ],
  },
  '/guides/electrical-method-statement-template': {
    title: 'Electrical Method Statement Template',
    description: 'Free template covering hazards, controls, sequence, PPE.',
    icon: 'FileText',
    category: 'Guide',
    sources: [
      '/guides/how-to-write-electrical-method-statement', '/guides/method-statement-guide',
      '/guides/electrical-rams-template-uk',
    ],
  },
  '/guides/method-statement-safe-isolation': {
    title: 'Method Statement — Safe Isolation',
    description: 'GS38 / HSR25 safe isolation method statement.',
    icon: 'Power',
    category: 'Guide',
    sources: [
      '/guides/safe-isolation-procedure', '/guides/gs-38-proving-dead',
      '/guides/electrical-rams-template-uk',
    ],
  },
  '/guides/method-statement-live-working': {
    title: 'Method Statement — Live Working',
    description: 'When live working is justified, controls + PPE required.',
    icon: 'AlertTriangle',
    category: 'Guide',
    sources: [
      '/guides/safe-isolation-procedure', '/guides/method-statement-electrical',
      '/guides/electrical-rams-template-uk',
    ],
  },
  '/guides/method-statement-fault-finding': {
    title: 'Method Statement — Fault Finding',
    description: 'Fault-finding method statement for live installations.',
    icon: 'Search',
    category: 'Guide',
    sources: [
      '/guides/electrical-fault-finding-methodology', '/guides/electrical-rams-template-uk',
      '/guides/safe-isolation-procedure',
    ],
  },
  '/guides/cdm-2015-for-electricians': {
    title: 'CDM 2015 for Electricians',
    description: 'CDM 2015 duty-holders, F10, role of electrical contractor.',
    icon: 'HardHat',
    category: 'Guide',
    sources: [
      '/guides/cdm-2015-electricians', '/guides/construction-site-safety',
      '/guides/construction-site-safety-electrical', '/guides/electrical-rams-template-uk',
    ],
  },
  '/guides/permit-to-work-electrical-isolation': {
    title: 'Permit-to-Work — Electrical Isolation',
    description: 'PTW system for high-voltage / industrial isolation work.',
    icon: 'FileCheck2',
    category: 'Guide',
    sources: [
      '/guides/permit-to-work', '/guides/lockout-tagout-guide',
      '/guides/safe-isolation-procedure',
    ],
  },
  '/guides/lockout-tagout-loto-electricians': {
    title: 'Lockout-Tagout (LOTO) for Electricians',
    description: 'LOTO sequence, devices, verification.',
    icon: 'Lock',
    category: 'Guide',
    sources: [
      '/guides/lockout-tagout-guide', '/guides/permit-to-work',
      '/guides/safe-isolation-procedure', '/guides/method-statement-safe-isolation',
    ],
  },
  '/guides/site-induction-electrical-contractors': {
    title: 'Site Induction for Electrical Contractors',
    description: 'Pre-start induction content and records.',
    icon: 'Users',
    category: 'Guide',
    sources: [
      '/guides/electrical-site-induction', '/guides/cdm-2015-electricians',
      '/guides/construction-site-safety',
    ],
  },
  '/guides/near-miss-reporting-electricians': {
    title: 'Near-Miss Reporting for Electricians',
    description: 'RIDDOR + near-miss culture for electrical contractors.',
    icon: 'AlertTriangle',
    category: 'Guide',
    sources: [
      '/guides/near-miss-reporting', '/guides/risk-assessment-electricians',
    ],
  },
  '/guides/working-near-live-mains-hazard-control': {
    title: 'Working Near Live Mains — Hazard Control',
    description: 'Hierarchy of controls when live mains is unavoidable.',
    icon: 'AlertTriangle',
    category: 'Guide',
    sources: [
      '/guides/safe-isolation-procedure', '/guides/method-statement-live-working',
      '/guides/electrical-rams-template-uk',
    ],
  },
  '/guides/lone-working-electricians': {
    title: 'Lone Working for Electricians',
    description: 'INDG73, lone-worker controls, check-in systems.',
    icon: 'User',
    category: 'Guide',
    sources: [
      '/guides/risk-assessment-electricians', '/guides/electrical-rams-template-uk',
    ],
  },
  '/guides/confined-space-electrical-work': {
    title: 'Confined Space Electrical Work',
    description: 'Confined Spaces Regs 1997, atmospheric testing, rescue plan.',
    icon: 'HardHat',
    category: 'Guide',
    sources: [
      '/guides/confined-space-electrical', '/guides/confined-spaces-course',
      '/guides/electrical-rams-template-uk',
    ],
  },
  '/guides/working-at-height-electricians': {
    title: 'Working at Height for Electricians',
    description: 'Work at Height Regs 2005, MEWP/ladder hierarchy.',
    icon: 'Building',
    category: 'Guide',
    sources: [
      '/guides/working-at-height-course', '/guides/rams-for-solar-pv-installation',
      '/guides/electrical-rams-template-uk',
    ],
  },
};

// -- helpers --------------------------------------------------------------

function slugToFile(routesSource, slug) {
  const escaped = slug.replace(/[/.\-]/g, '\\$&');
  const routeRe = new RegExp(`path="${escaped}"[\\s\\S]*?<(\\w+)\\s*/>`);
  const m = routesSource.match(routeRe);
  if (!m) return null;
  const componentName = m[1];
  const importRe = new RegExp(`const\\s+${componentName}\\s*=\\s*lazy\\(\\s*\\(\\)\\s*=>\\s*import\\(\\s*['"]@/pages/seo/(\\w+)['"]`);
  const im = routesSource.match(importRe);
  if (!im) return null;
  const file = join(SEO_PAGES_DIR, im[1] + '.tsx');
  return existsSync(file) ? file : null;
}

function addRelatedToLegacySource(src, target) {
  // Find `const relatedPages: RelatedPage[] = [` ... `];` block
  const re = /(const\s+relatedPages\s*:\s*RelatedPage\[\]\s*=\s*\[)([\s\S]*?)(\n\];)/m;
  const m = src.match(re);
  if (!m) return null;
  if (m[2].includes(`href: '${target.href}'`) || m[2].includes(`href: "${target.href}"`)) {
    return 'already-present';
  }
  // Insert a new entry at the top of the array
  const entry = `
  {
    href: '${target.href}',
    title: '${target.title.replace(/'/g, "\\'")}',
    description: '${target.description.replace(/'/g, "\\'")}',
    icon: ${target.icon},
    category: '${target.category}',
  },`;
  const updated = src.replace(re, `$1${entry}$2$3`);
  return updated;
}

function addRelatedToGeneratedConfig(src, target) {
  // GeneratedGuideConfig uses `relatedPages: [`  with same shape — but no icon import.
  // For now, we keep new pages out of generated-config sources to avoid breakage.
  return null;
}

function ensureIconImport(src, iconName) {
  // Find the lucide-react import block specifically — use [^}]*? so the match
  // cannot span past another import's closing brace into a different import.
  const importRe = /import\s*\{([^}]*)\}\s*from\s*['"]lucide-react['"]/;
  const m = src.match(importRe);
  if (!m) return null; // no lucide-react import — signal caller to skip
  const existing = m[1];
  if (new RegExp(`\\b${iconName}\\b`).test(existing)) return src;
  // Add iconName to the lucide-react import list. Consume optional trailing
  // comma so we never produce double commas.
  const updatedImport = m[0].replace(/,?\s*\}\s*from/, `,\n  ${iconName},\n} from`);
  return src.replace(importRe, updatedImport);
}

// -- main -----------------------------------------------------------------

const routesSource = readFileSync(SEO_ROUTES_FILE, 'utf-8');
let touched = 0, alreadyPresent = 0, skipped = 0, errored = 0;
const log = [];

for (const [targetSlug, cfg] of Object.entries(INBOUND_MAP)) {
  const target = {
    href: targetSlug,
    title: cfg.title,
    description: cfg.description,
    icon: cfg.icon,
    category: cfg.category,
  };
  for (const sourceSlug of cfg.sources) {
    const file = slugToFile(routesSource, sourceSlug);
    if (!file) {
      log.push(`SKIP_NO_FILE ${sourceSlug} → ${targetSlug}`);
      skipped++;
      continue;
    }
    let src = readFileSync(file, 'utf-8');
    const result = addRelatedToLegacySource(src, target);
    if (result === null) {
      log.push(`SKIP_NO_RELATEDPAGES ${sourceSlug} → ${targetSlug}`);
      skipped++;
      continue;
    }
    if (result === 'already-present') {
      alreadyPresent++;
      continue;
    }
    const updated = ensureIconImport(result, cfg.icon);
    if (updated === null) {
      // No lucide-react import in source — skip rather than risk corruption
      log.push(`SKIP_ICON ${cfg.icon} (no lucide-react import) in ${sourceSlug}`);
      skipped++;
      continue;
    }
    if (APPLY) writeFileSync(file, updated);
    touched++;
    log.push(`${APPLY ? 'APPLIED' : 'WOULD_APPLY'} ${sourceSlug} → ${targetSlug}`);
  }
}

console.log(log.slice(-50).join('\n'));
console.log(`\n${APPLY ? 'APPLIED' : 'DRY-RUN'} — touched=${touched}, alreadyPresent=${alreadyPresent}, skipped=${skipped}, errored=${errored}`);
if (!APPLY) console.log(`\nRun with --apply to actually write changes.`);
