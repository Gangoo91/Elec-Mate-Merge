#!/usr/bin/env node

/**
 * Topic coverage audit — buckets all routed SEO pages by topic family,
 * then identifies high-commercial-intent topics with NO coverage (genuine
 * content gaps) and topics with potential over-saturation.
 *
 * Output: reports/seo-audit/topic-coverage.json
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');
const REPORT = join(ROOT, 'reports', 'seo-audit.json');
const OUT_DIR = join(ROOT, 'reports', 'seo-audit');

if (!existsSync(REPORT)) {
  console.error(`No audit report at ${REPORT}.`);
  process.exit(1);
}

const { scored } = JSON.parse(readFileSync(REPORT, 'utf-8'));
const pages = scored.filter((p) => p.slug && p.suggestedAction !== 'kill_301');

// ---------------------------------------------------------------------------
// Topic taxonomy — what categories of UK electrical SEO content exist
// ---------------------------------------------------------------------------
// Each topic = { id, label, patterns (regex or substring matchers on slug),
//                minCoverage (target page count), commercialValue 'low|med|high' }
const TOPICS = [
  // --- BS 7671 Regulations ---
  { id: 'bs7671-amendments',    label: 'BS 7671 Amendments (A1/A2/A3/A4)', patterns: [/amendment[-_]?[1-4]/i, /\ba[1-4]:?20[2-3]\d/i], commercialValue: 'high' },
  { id: 'bs7671-18th-edition',  label: 'BS 7671 18th Edition',             patterns: [/18th[-_]?edition/i, /eighteenth[-_]?edition/i, /bs[-_]?7671[-_]?run/i], commercialValue: 'high' },
  { id: 'part-7-special',       label: 'BS 7671 Part 7 Special Locations', patterns: [/section[-_]?7[0-5]\d/i, /bathroom.*bs|swimming-pool|sauna|construction-site-electric|agricultural-electrical|caravan-park|marina|medical-location|exhibition-electric|outdoor-lighting/i], commercialValue: 'high' },
  { id: 'chapter-4-protection', label: 'BS 7671 Part 4 Protection',        patterns: [/protection[-_](against|method)/i, /chapter[-_]?4[1-6]/i, /\b(41[0-5]\.|421\.|443\.)/i, /afdd|spd|rcbo|rcd/i], commercialValue: 'high' },

  // --- Calculations / Tools ---
  { id: 'cable-sizing',         label: 'Cable sizing',                     patterns: [/cable[-_]?siz|cable[-_]?current[-_]?capacity|cable[-_]?derat|appendix[-_]?4/i], commercialValue: 'high' },
  { id: 'voltage-drop',         label: 'Voltage drop',                     patterns: [/volt[-_]?drop|voltage[-_]?drop/i], commercialValue: 'high' },
  { id: 'zs-earth-loop',        label: 'Earth loop impedance / Zs',        patterns: [/\bzs\b|earth[-_]?loop|earth[-_]?fault[-_]?loop|loop[-_]?impedance/i], commercialValue: 'high' },
  { id: 'fault-current',        label: 'Fault current (PSCC/PEFC)',        patterns: [/fault[-_]?current|pscc|pefc|prospective[-_]?fault/i], commercialValue: 'high' },
  { id: 'rcd-testing',          label: 'RCD testing / discrimination',     patterns: [/rcd[-_]?(test|discrim|trip|type|values)/i], commercialValue: 'med' },
  { id: 'adiabatic-cpc',        label: 'Adiabatic / CPC sizing',           patterns: [/adiabatic|cpc[-_]?siz/i], commercialValue: 'high' },
  { id: 'business-calcs',       label: 'Business calculators (rates, costs)', patterns: [/(hourly[-_]?rate|day[-_]?rate|profit|tax|vat|cash[-_]?flow|cost[-_]?estimat|business[-_]?cost|break[-_]?even|minimum[-_]?charge|equipment[-_]?roi)/i], commercialValue: 'high' },
  { id: 'ohms-power-basic',     label: 'Ohms / power / basic AC',          patterns: [/ohms[-_]?law|ohms[-_]?calc|power[-_]?(calc|factor[-_]?correct)|three[-_]?phase|single[-_]?phase|ac[-_]?(power|circuit)/i], commercialValue: 'med' },

  // --- Certificates ---
  { id: 'eicr',                 label: 'EICR',                             patterns: [/\beicr\b/i], commercialValue: 'high' },
  { id: 'eic',                  label: 'EIC',                              patterns: [/\beic[-_]/i, /electrical[-_]?installation[-_]?cert/i], commercialValue: 'high' },
  { id: 'minor-works',          label: 'Minor Works',                      patterns: [/minor[-_]?works/i], commercialValue: 'high' },
  { id: 'cert-other',           label: 'Other certificates',               patterns: [/(pat[-_]?testing|fire[-_]?alarm[-_]?cert|emergency[-_]?lighting[-_]?cert|ev[-_]?charger[-_]?cert|solar[-_]?pv[-_]?cert|earthing[-_]?cert)/i], commercialValue: 'med' },
  { id: 'observation-codes',    label: 'EICR observation codes (C1/C2/C3/FI)', patterns: [/(observation[-_]?code|c1[-_]?c2|coded[-_]?observation|fi[-_]?code)/i], commercialValue: 'high' },

  // --- Inspection & Testing ---
  { id: 'inspection-testing',   label: 'Inspection & testing',             patterns: [/(inspection[-_]?and|inspection[-_]?test|testing[-_]?sequence|continuity|insulation[-_]?resist|polarity[-_]?test|earth[-_]?electrode)/i], commercialValue: 'high' },
  { id: 'testing-equipment',    label: 'Test equipment',                   patterns: [/(multifunction[-_]?tester|test[-_]?instr|cable[-_]?detect|thermal[-_]?imag|insulation[-_]?test)/i], commercialValue: 'med' },

  // --- Apprentice / Training ---
  { id: 'apprentice-general',   label: 'Apprentice general',               patterns: [/apprentice/i], commercialValue: 'med' },
  { id: 'am2',                  label: 'AM2 / AM2E',                       patterns: [/\bam2/i, /am2e/i], commercialValue: 'high' },
  { id: 'level2-3-2365',        label: 'Level 2/3 / 2365',                 patterns: [/level[-_]?[23]|2365|5357|8202/i], commercialValue: 'med' },
  { id: 'city-guilds',          label: 'City & Guilds qualifications',     patterns: [/city[-_]?guilds|2391|2919/i], commercialValue: 'med' },
  { id: 'epa-end-point',        label: 'EPA / End-point assessment',       patterns: [/\bepa[-_]/i, /endpoint|end[-_]?point/i], commercialValue: 'high' },

  // --- Tools / Equipment ---
  { id: 'electricians-tools',   label: 'Electrician\'s tools (best of, lists)', patterns: [/(best[-_]?(cable[-_]?detect|multifunction|label[-_]?printer|thermal|van[-_]?racking))|tool[-_]?list|tool[-_]?insurance|insulated[-_]?tools/i], commercialValue: 'low' },

  // --- Comparison / Software ---
  { id: 'software-comparison',  label: 'Software comparisons',             patterns: [/(elec[-_]?mate[-_]?vs|vs[-_]?simply|vs[-_]?icertifi|vs[-_]?certs[-_]?app|vs[-_]?electrical[-_]?om|best[-_]?(eicr|electric|invoice|quoting|cable[-_]?sizing|apprentice|ai)[-_]?(software|app|tool))/i], commercialValue: 'high' },

  // --- Pricing / Cost ---
  { id: 'rewire-cost',          label: 'Rewire costs',                     patterns: [/(rewire[-_]?cost|full[-_]?rewire|partial[-_]?rewire|bungalow[-_]?rewire|victorian[-_]?(terrace|rewire)|edwardian)/i], commercialValue: 'high' },
  { id: 'consumer-unit',        label: 'Consumer unit',                    patterns: [/consumer[-_]?unit/i], commercialValue: 'high' },
  { id: 'ev-charger',           label: 'EV charger',                       patterns: [/ev[-_]?charger/i], commercialValue: 'high' },
  { id: 'solar-pv',             label: 'Solar PV',                         patterns: [/solar[-_]?(pv|panel|grant)/i], commercialValue: 'high' },
  { id: 'battery-storage',      label: 'Battery storage',                  patterns: [/battery[-_]?(storage|backup)/i], commercialValue: 'high' },
  { id: 'heat-pump',            label: 'Heat pumps',                       patterns: [/heat[-_]?pump/i], commercialValue: 'high' },

  // --- Faults / Diagnostics ---
  { id: 'fault-finding',        label: 'Fault finding / diagnostics',      patterns: [/(fault[-_]?find|fault[-_]?diagn|burning[-_]?smell|trip[-_]?switch|warm[-_]?plug|humming|smoke[-_]?detector[-_]?beep|no[-_]?electric|intermittent[-_]?electric|borrowed[-_]?neutral|rcbo[-_]?keeps|rcd[-_]?keeps|garage[-_]?door[-_]?electric)/i], commercialValue: 'med' },

  // --- Business / Trade ---
  { id: 'business-admin',       label: 'Business admin (invoicing, quotes)', patterns: [/(invoic|quot|cash[-_]?flow|tax|vat|cis|hourly[-_]?rate|day[-_]?rate|pricing[-_]?strateg|capacity[-_]?plan|cv[-_]?builder|customer[-_]?manage|business[-_]?(cost|analyt|valuat|website|insurance|develop|plan|growth|admin)|accounting|payment|jib|niceic[-_]?regist|stripe)/i], commercialValue: 'high' },

  // --- AI / Agents (in-app) ---
  { id: 'ai-agents',            label: 'AI agents / tools (Elec-Mate)',    patterns: [/^\/(tools\/)?ai[-_]/i, /elec[-_]?ai|mate|ai[-_]?circuit[-_]?design|ai[-_]?cost[-_]?engineer|ai[-_]?electric/i], commercialValue: 'med' },

  // --- Health & Safety / Compliance ---
  { id: 'health-safety',        label: 'Health & safety / compliance',     patterns: [/(health[-_]?safety|hse|safety[-_]?check|risk[-_]?assess|rams|method[-_]?statement|cdm|lock[-_]?off|loto|toolbox[-_]?talk|near[-_]?miss|permit[-_]?to[-_]?work|safe[-_]?isolation|electric[-_]?shock|electrical[-_]?fire|fire[-_]?safety|electrical[-_]?fire[-_]?prevent|arc[-_]?flash|lightning[-_]?prot|asbestos|pasma|ipaf|manual[-_]?handling|wellbeing|mental[-_]?health)/i], commercialValue: 'med' },

  // --- Industrial / Special ---
  { id: 'specialist-installs',  label: 'Specialist installations',         patterns: [/(data[-_]?cent|hospital|warehouse|cleanroom|exhibition|smart[-_]?(home|lighting|meter)|access[-_]?control|smart[-_]?home|fire[-_]?alarm[-_]?inst|underfloor[-_]?heat|emergency[-_]?light|bms|building[-_]?management|cctv|conduit[-_]?install|trunking|cable[-_]?tray|busbar|wind[-_]?turbine|hydro|off[-_]?grid|hybrid[-_]?solar|sump[-_]?pump|transformer[-_]?install)/i], commercialValue: 'med' },

  // --- Property types ---
  { id: 'property-types',       label: 'Specific property types',          patterns: [/(hmo|landlord|tenant|airbnb|listed[-_]?build|new[-_]?build|new[-_]?home|barn[-_]?conversion|basement[-_]?conv|loft[-_]?conv|garden|garage|kitchen|bathroom[-_]?(elec|wir)|annex|outbuild|swimming[-_]?pool[-_]?install|shed[-_]?electric|caravan|gym[-_]?electric|hair[-_]?salon|restaurant|warehouse[-_]?electric|cleanroom|datacent|exhibition[-_]?electric|domestic[-_]?vs[-_]?commercial)/i], commercialValue: 'med' },

  // --- City / Location pages ---
  { id: 'location-pages',       label: 'Location-specific pages',          patterns: [/(electrician[-_]?(london|manchester|birmingham|leeds|liverpool|sheffield|newcastle|bristol|cardiff|edinburgh|glasgow|nottingham|leicester|coventry|hull|stoke|brighton|oxford|cambridge|reading|southampton|portsmouth|york|aberdeen|dundee|harrogate|huddersfield|inverness|ipswich|canterbury|lincoln|swindon|bradford|wolverhampton|rotherham|workington|basingstoke|luton|essex|kent|berkshire|cambridgeshire|cumbria|derbyshire|lincolnshire|salary[-_](london|edinburgh|glasgow|manchester|birmingham))|consumer[-_]?unit[-_]?replacement[-_](edinburgh|liverpool|cardiff|newcastle)|eicr[-_](cardiff|coventry|dundee|edinburgh|leicester|london|luton|middlesbrough|oxford|stoke|aberdeen)|ev[-_]?charger[-_]?install[-_]?(birmingham|brighton|bristol|cambridge|cardiff|edinburgh|glasgow|leeds|liverpool|london|manchester|newcastle|norwich|nottingham|oxford|reading|southampton|wolverhampton|york))/i], commercialValue: 'med' },

  // --- Career / Salary ---
  { id: 'career-salary',        label: 'Careers / salary',                 patterns: [/(salary|day[-_]?rate|career[-_]?prog|become[-_]?electric|how[-_]?to[-_]?become|first[-_]?year|year4|year[-_]?4|electrician[-_]?retire|electrician[-_]?working[-_]?abroad|specialist[-_]?electrician|self[-_]?employed|interview[-_]?question|women[-_]?in[-_]?electric|mental[-_]?health[-_]?support|future[-_]?of[-_]?electric)/i], commercialValue: 'med' },
];

// ---------------------------------------------------------------------------
// Bucket pages into topics
// ---------------------------------------------------------------------------
const topicCounts = new Map();
const topicSamples = new Map();
const uncategorised = [];

for (const page of pages) {
  let matched = false;
  for (const t of TOPICS) {
    if (t.patterns.some((p) => p.test(page.slug))) {
      topicCounts.set(t.id, (topicCounts.get(t.id) || 0) + 1);
      if (!topicSamples.has(t.id)) topicSamples.set(t.id, []);
      if (topicSamples.get(t.id).length < 5) topicSamples.get(t.id).push(page.slug);
      matched = true;
    }
  }
  if (!matched) uncategorised.push(page.slug);
}

// ---------------------------------------------------------------------------
// Identify gaps — high-value SEO topics we DON'T have or are under-served
// ---------------------------------------------------------------------------
// Curated list of high-intent UK electrical search topics. Anything in this
// list with 0 or low coverage is a real opportunity.
const PRIORITY_GAPS = [
  // BS 7671 sections + specific regs
  { topic: 'Section 706 (conducting locations with restricted movement)', slug: '/guides/bs-7671-section-706-conducting-locations', minWords: 1800 },
  { topic: 'Section 715 (extra-low voltage lighting)', slug: '/guides/bs-7671-section-715-extra-low-voltage-lighting', minWords: 1800 },
  { topic: 'Section 717 (mobile / transportable units)', slug: '/guides/bs-7671-section-717-mobile-transportable-units', minWords: 1800 },
  { topic: 'Section 729 (operating and maintenance gangways)', slug: '/guides/bs-7671-section-729-operating-gangways', minWords: 1600 },
  { topic: 'Section 730 (onshore power supply for inland waterways)', slug: '/guides/bs-7671-section-730-onshore-power', minWords: 1800 },
  { topic: 'Section 753 (floor and ceiling heating)', slug: '/guides/bs-7671-section-753-floor-ceiling-heating', minWords: 1800 },

  // AFDD / A4:2026 specifics
  { topic: 'AFDD Type detection requirements (A4:2026)', slug: '/guides/afdd-type-detection-a4-2026', minWords: 1800 },
  { topic: 'TN-C-S / PNB earthing in A4:2026', slug: '/guides/tn-cs-pnb-earthing-a4-2026', minWords: 1800 },
  { topic: 'New schedule of test results columns (A4:2026)', slug: '/guides/eicr-schedule-of-tests-a4-2026', minWords: 1500 },
  { topic: 'A4:2026 model form changes (EIC, EICR, MWC)', slug: '/guides/a4-2026-model-form-changes', minWords: 1500 },

  // EICR observation code library — one page per most-common code/defect
  { topic: 'EICR code C1 (danger present — immediate action)', slug: '/guides/eicr-code-c1-danger-present', minWords: 1500 },
  { topic: 'EICR code C2 (potentially dangerous — urgent remedial)', slug: '/guides/eicr-code-c2-potentially-dangerous', minWords: 1500 },
  { topic: 'EICR code C3 (improvement recommended)', slug: '/guides/eicr-code-c3-improvement-recommended', minWords: 1500 },
  { topic: 'EICR code FI (further investigation required)', slug: '/guides/eicr-code-fi-further-investigation', minWords: 1500 },
  { topic: 'EICR: No main protective bonding (common C2)', slug: '/guides/eicr-no-main-protective-bonding', minWords: 1500 },
  { topic: 'EICR: Missing RCD on socket-outlet circuit', slug: '/guides/eicr-missing-rcd-socket-outlet', minWords: 1500 },
  { topic: 'EICR: Insulation resistance below 1 MΩ', slug: '/guides/eicr-insulation-resistance-below-1-megohm', minWords: 1500 },
  { topic: 'EICR: High Zs above maximum permitted', slug: '/guides/eicr-high-zs-above-maximum', minWords: 1500 },
  { topic: 'EICR: Borrowed neutral observation', slug: '/guides/eicr-borrowed-neutral-observation', minWords: 1500 },
  { topic: 'EICR: Plastic consumer unit in HMO', slug: '/guides/eicr-plastic-consumer-unit-hmo', minWords: 1500 },

  // Cable sizing — specific Q&A pages
  { topic: 'What current does 2.5 mm² cable carry?', slug: '/guides/2-5mm-cable-current-rating', minWords: 1500 },
  { topic: 'What current does 4 mm² cable carry?', slug: '/guides/4mm-cable-current-rating', minWords: 1500 },
  { topic: 'What current does 6 mm² cable carry?', slug: '/guides/6mm-cable-current-rating', minWords: 1500 },
  { topic: 'What current does 10 mm² cable carry?', slug: '/guides/10mm-cable-current-rating', minWords: 1500 },
  { topic: 'Cable size for an EV charger (7 kW / 22 kW)', slug: '/guides/cable-size-for-ev-charger', minWords: 1500 },
  { topic: 'Cable size for an electric shower (8.5/9.5/10.5 kW)', slug: '/guides/cable-size-for-electric-shower', minWords: 1500 },
  { topic: 'Cable size for a cooker circuit', slug: '/guides/cable-size-for-cooker-circuit', minWords: 1500 },

  // Specific scenarios
  { topic: 'Listed building electrical requirements', slug: '/guides/listed-building-electrical-requirements', minWords: 1800 },
  { topic: 'HMO electrical safety (landlord)', slug: '/guides/hmo-electrical-safety-landlord', minWords: 1800 },
  { topic: 'EICR for letting agency (England 2020 regs)', slug: '/guides/eicr-for-letting-agency-england-2020', minWords: 1800 },
  { topic: 'Selling a house with no EICR', slug: '/guides/selling-house-no-eicr', minWords: 1500 },
];

// Compute coverage status for each priority gap
const gapStatus = PRIORITY_GAPS.map((g) => {
  const exists = pages.some((p) => p.slug === g.slug);
  return { ...g, exists };
});

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------
mkdirSync(OUT_DIR, { recursive: true });

const summary = {
  generatedAt: new Date().toISOString(),
  totalRoutedPages: pages.length,
  topicCoverage: TOPICS.map((t) => ({
    id: t.id,
    label: t.label,
    commercialValue: t.commercialValue,
    pageCount: topicCounts.get(t.id) || 0,
    samples: topicSamples.get(t.id) || [],
  })).sort((a, b) => b.pageCount - a.pageCount),
  uncategorisedCount: uncategorised.length,
  uncategorisedSample: uncategorised.slice(0, 30),
  priorityGaps: gapStatus,
  gapsToFill: gapStatus.filter((g) => !g.exists).length,
};

writeFileSync(join(OUT_DIR, 'topic-coverage.json'), JSON.stringify(summary, null, 2));

console.log('=== TOPIC COVERAGE AUDIT ===\n');
console.log(`Total routed pages: ${summary.totalRoutedPages}`);
console.log(`Uncategorised:       ${summary.uncategorisedCount}\n`);

console.log('--- Topic counts (sorted) ---');
summary.topicCoverage.forEach((t) => {
  const cv = { high: '★★★', med: '★★ ', low: '★  ' }[t.commercialValue];
  console.log(`  ${cv} ${String(t.pageCount).padStart(4)} pages  ${t.label}`);
});

console.log('\n--- Priority gaps (missing high-commercial-intent pages) ---');
console.log(`${summary.gapsToFill} of ${PRIORITY_GAPS.length} priority topics not yet covered:\n`);
gapStatus.filter((g) => !g.exists).forEach((g) => {
  console.log(`  ✗ ${g.slug.padEnd(58)} — ${g.topic}`);
});

console.log(`\nFull report: ${join(OUT_DIR, 'topic-coverage.json')}`);
