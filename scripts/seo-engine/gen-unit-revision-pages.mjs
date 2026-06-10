#!/usr/bin/env node
/**
 * gen-unit-revision-pages.mjs — Apprentice unit revision page generator.
 *
 * Reads scripts/seo-engine/curriculum/all-curriculum.json (extracted from
 * qualification_requirements via MCP) and produces one revision page per
 * (qualification, unit) pair.
 *
 * Output:
 *   src/pages/seo/generated/unitRevision{Qual}{Unit}Config.ts
 *   src/pages/seo/UnitRevision{Qual}{Unit}Page.tsx
 *
 * Public terminology rules (Andrew):
 *  - Do NOT say "Assessment Criteria", "AC", "Learning Outcome", "LO", "RAG"
 *  - Unit code IS fine to reference (apprentices google it)
 *  - Frame each LO as a study section / topic group
 *  - Frame each AC as a bullet of "what you should be able to do" / topic point
 *  - Add exam-prep tips, recommended calculators, and CTAs to study tools
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');
const CURRICULUM = join(__dirname, 'curriculum/all-curriculum.json');
const SEO_DIR = join(ROOT, 'src/pages/seo');
const GEN_DIR = join(ROOT, 'src/pages/seo/generated');
const FORCE = process.argv.includes('--force');

// ----- helpers ----------------------------------------------------------

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .replace(/-+/g, '-');
}

function pascalCase(s) {
  return s.replace(/[^a-z0-9]+/gi, ' ').trim().split(/\s+/).map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
}

function escSingle(s) {
  return String(s).replace(/'/g, "\\'");
}

// Map qualification code → friendly + body
const QUAL_META = {
  '2365-02': { display: 'City & Guilds 2365-02', body: 'Level 2 Diploma in Electrical Installations', year: '1st-year apprentices' },
  '2365-03': { display: 'City & Guilds 2365-03', body: 'Level 3 Diploma in Electrical Installations', year: '2nd to 4th-year apprentices' },
  '2366-03': { display: 'City & Guilds 2366-03', body: 'Level 3 Diploma in Electrotechnical Technology', year: 'Level 3 apprentices' },
  '5357': { display: 'City & Guilds 5357', body: 'Level 3 Electrotechnical Qualification (Apprenticeship Standard)', year: 'electrotechnical apprentices on the apprenticeship standard' },
  '5393-03': { display: 'City & Guilds 5393-03', body: 'Level 3 Electrotechnical (Dwellings)', year: 'apprentices working primarily in domestic environments' },
  '2357': { display: 'City & Guilds 2357', body: 'Level 3 NVQ Diploma in Installing Electrotechnical Systems and Equipment', year: 'apprentices working through an NVQ pathway with on-the-job portfolio evidence' },
  '8202': { display: 'City & Guilds 8202', body: 'T Level in Building Services Engineering — Electrical Installation', year: 'T Level students taking the electrical installation specialism' },
  '610/3907/X': { display: 'EAL Level 3', body: 'EAL Level 3 Electrotechnical Technical Occupational Entry qualification', year: 'EAL Level 3 apprentices' },
  '2346-03': { display: 'City & Guilds 2346-03', body: 'Electrotechnical Experienced Worker Qualification', year: 'experienced workers consolidating skills outside a formal apprenticeship' },
  '601/7345/2': { display: 'EAL Level 3 Electrotechnical Qualification', body: 'EAL Level 3 Electrotechnical Qualification (601/7345/2)', year: 'apprentices and adult learners on the EAL electrotechnical pathway' },
  '610/1335/3': { display: 'EAL Level 3 Electrotechnical in Dwellings', body: 'EAL Level 3 Electrotechnical Qualification in Dwellings (610/1335/3)', year: 'learners on the EAL dwellings pathway' },
};

// Group curriculum rows by (qual, unit)
const rows = JSON.parse(readFileSync(CURRICULUM, 'utf-8'));
const byUnit = new Map();
for (const r of rows) {
  const key = `${r.qualification_code}|${r.unit_code}`;
  if (!byUnit.has(key)) {
    byUnit.set(key, {
      qualification_code: r.qualification_code,
      unit_code: r.unit_code,
      unit_title: r.unit_title,
      los: new Map(),
    });
  }
  const u = byUnit.get(key);
  if (!u.los.has(r.lo_number)) u.los.set(r.lo_number, { number: r.lo_number, text: r.lo_text, acs: [] });
  u.los.get(r.lo_number).acs.push({ code: r.ac_code, text: r.ac_text });
}

// Reword common LO openings into study-section openings.
function rephraseLo(loText) {
  // Strip the "Understand X" / "Know X" / "Be able to X" verb opener and present
  // the topic naturally. Keep the meaning intact.
  return loText
    .replace(/^Understand\s+/i, '')
    .replace(/^Know\s+(how|that|when|why|where)?\s*/i, '')
    .replace(/^Know\s+/i, '')
    .replace(/^Be able to\s+/i, 'How to ')
    .replace(/^Demonstrate\s+/i, 'How to demonstrate ')
    .replace(/^Apply\s+/i, 'Applying ')
    .replace(/^Identify\s+/i, 'Identifying ')
    .replace(/^Specify\s+/i, 'Specifying ')
    // Capitalise first letter
    .replace(/^(.)/, (c) => c.toUpperCase());
}

function rephraseAc(acText) {
  // Light first-letter capitalisation; the text is already imperative-style.
  return acText.replace(/^(.)/, (c) => c.toUpperCase());
}

// Calculator + tool recommendations by topic keyword. Apprentices benefit
// most when they can immediately try the concept in a working tool.
const TOOL_HINTS = [
  { match: /voltage drop|volt drop/i, tool: '/tools/cable-volt-drop-three-phase', label: 'voltage drop calculator' },
  { match: /cable siz|conductor siz|current carrying/i, tool: '/tools/cable-sizing-calculator', label: 'cable sizing calculator' },
  { match: /insulation resistance/i, tool: '/loop-impedance-testing-guide', label: 'insulation resistance guide' },
  { match: /loop impedance|zs|earth fault loop/i, tool: '/tools/earth-loop-impedance-calculator', label: 'earth loop impedance calculator' },
  { match: /lighting|lumen|lux/i, tool: '/tools/lighting-lux-calculator', label: 'lighting lux calculator' },
  { match: /adiabatic|cpc/i, tool: '/tools/adiabatic-equation-calculator', label: 'adiabatic equation calculator' },
  { match: /power factor/i, tool: '/tools/power-factor-calculator', label: 'power factor calculator' },
  { match: /disconnection time|protective device/i, tool: '/tools/disconnection-time-calculator', label: 'disconnection time calculator' },
  { match: /busbar/i, tool: '/tools/busbar-sizing-calculator', label: 'busbar calculator' },
  { match: /maximum demand|max demand/i, tool: '/guides/max-demand-calculation-guide', label: 'max demand guide' },
  { match: /risk assessment|method statement|rams/i, tool: '/guides/electrical-rams-template-uk', label: 'RAMS template guide' },
  { match: /safe isolation|isolation/i, tool: '/guides/safe-isolation-procedure', label: 'safe isolation guide' },
];

function recommendedTools(unit) {
  const recs = new Set();
  const allText = (unit.unit_title + ' ' + [...unit.los.values()].map((l) => l.text + ' ' + l.acs.map((a) => a.text).join(' ')).join(' '));
  for (const h of TOOL_HINTS) {
    if (h.match.test(allText)) recs.add(JSON.stringify({ href: h.tool, label: h.label }));
  }
  return [...recs].slice(0, 4).map((s) => JSON.parse(s));
}

function configFor(unit) {
  const qual = QUAL_META[unit.qualification_code] || { display: unit.qualification_code, body: '', year: 'apprentices' };
  const unitSlug = slugify(unit.unit_title);
  const slug = `/guides/${slugify(unit.qualification_code)}-unit-${unit.unit_code.replace(/[\/]/g, '-')}-${unitSlug}-revision`;
  const tools = recommendedTools(unit);

  const sections = [];
  const los = [...unit.los.values()].sort((a, b) => a.number - b.number);
  for (const lo of los) {
    const sectionId = `topic-${lo.number}`;
    const heading = `Topic ${lo.number}: ${rephraseLo(lo.text)}`;
    const intro = `In this section you should be confident with the following points. Each one is a specific topic you should be able to explain, demonstrate, or calculate.`;
    const bullets = lo.acs.map((a) => `${rephraseAc(a.text)}.`);
    sections.push({
      id: sectionId,
      heading,
      tocLabel: `Topic ${lo.number}`,
      intro,
      bullets,
    });
  }

  const keyTakeaways = [
    `${qual.display} Unit ${unit.unit_code} — ${unit.unit_title} — is a core component of the ${qual.body}.`,
    `This unit is typically delivered to ${qual.year} and covers ${unit.los.size} main topic areas.`,
    `Across the ${unit.los.size} topics there are ${los.reduce((sum, l) => sum + l.acs.length, 0)} specific points you should be able to explain, demonstrate or calculate before the end-of-unit assessment.`,
    `Common assessment formats include online multiple-choice exams, written short-answer papers, and practical workshop tasks observed by your tutor.`,
    `Use the structured topic list below as a personal checklist — work through each point and confirm you can explain it without referring to your notes.`,
    `The Elec-Mate apprentice tier includes mock exams, flashcards, and revision notes mapped to this unit. Use the tools to test yourself between college blocks and on-site days.`,
  ];

  const sectionBlocks = sections.map((s) => `    {
      id: '${escSingle(s.id)}',
      heading: '${escSingle(s.heading)}',
      tocLabel: '${escSingle(s.tocLabel)}',
      blocks: [
        {
          type: 'paragraph',
          text: '${escSingle(s.intro)}',
        },
        {
          type: 'list',
          ordered: false,
          items: [
${s.bullets.map((b) => `            '${escSingle(b)}',`).join('\n')}
          ],
        },
      ],
    },`).join('\n');

  const toolBullets = tools.map((t) => `'Try the ${escSingle(t.label)} — link in the related pages below.'`).join(', ');

  return `import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Apprentice revision page for ${qual.display} Unit ${unit.unit_code}.
// Generated from curriculum data — no fabricated content. Maps the published
// unit specification to natural-language study points and pairs with working
// Elec-Mate calculators where the topic is calculation-led.
// Updated 2026-05-18.

const published = '2026-05-18';
const modified = '2026-05-18';

export const ${ident(unit)}: GeneratedGuideConfig = {
  pagePath: '${slug}',
  title: '${qual.display} Unit ${unit.unit_code}: ${escSingle(unit.unit_title)} — Revision Guide',
  description: 'Complete revision guide for ${qual.display} Unit ${unit.unit_code} (${escSingle(unit.unit_title)}). Every topic structured as a study checklist, with mock exams, flashcards and calculator links for ${qual.year}.',
  datePublished: published,
  dateModified: modified,
  readingTime: ${Math.max(8, Math.round(los.reduce((s, l) => s + l.acs.length, 0) * 0.4))},
  badge: 'Unit Revision',
  badgeIcon: 'GraduationCap',
  breadcrumbLabel: 'Unit ${unit.unit_code} Revision',
  heroPrefix: '${qual.display} Unit ${unit.unit_code}:',
  heroHighlight: '${escSingle(unit.unit_title)}',
  heroSuffix: '— Complete Revision Guide',
  heroSubtitle:
    'A structured revision walkthrough of every topic in ${qual.display} Unit ${unit.unit_code} (${escSingle(unit.unit_title)}). Use it as a personal study checklist — work through each topic, tick off the points you can confidently explain or calculate, and use the linked Elec-Mate tools to practice the calculation-led parts. Designed for ${qual.year}.',
  keyTakeaways: [
${keyTakeaways.map((k) => `    '${escSingle(k)}',`).join('\n')}
  ],
  sections: [
${sectionBlocks}
    {
      id: 'study-with-elec-mate',
      heading: 'Study This Unit with Elec-Mate',
      tocLabel: 'Study with Elec-Mate',
      blocks: [
        {
          type: 'paragraph',
          text: 'Elec-Mate\\u2019s apprentice tier turns this unit checklist into an active study plan. You get mock exam questions, flashcards, and revision notes mapped to this unit, plus working calculators for every calculation-led topic. Most apprentices use the app between college blocks and on the train to site — short bursts of revision compound across the year.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'For apprentices',
          body:
            'The Elec-Mate apprentice tier includes mock exams, flashcards, and revision notes for ${qual.display} Unit ${unit.unit_code} plus every other unit in your qualification. 7-day free trial — see your progress on the tutor dashboard.',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'What does ${qual.display} Unit ${unit.unit_code} cover?',
      answer: 'Unit ${unit.unit_code} (${escSingle(unit.unit_title)}) covers ${unit.los.size} main topic areas: ${los.map((l) => escSingle(rephraseLo(l.text))).join('; ')}. Each topic has specific points you should be able to explain, demonstrate or calculate.',
    },
    {
      question: 'How is this unit assessed?',
      answer: 'Assessment for ${qual.display} units typically uses a combination of online multiple-choice exams, written short-answer papers, and practical workshop tasks observed by your tutor. The exact format is set by your college and the awarding body — confirm with your tutor.',
    },
    {
      question: 'When in my apprenticeship will I study this unit?',
      answer: '${qual.body} units are typically delivered across the apprenticeship in college-block weeks. Unit ${unit.unit_code} is usually delivered to ${qual.year}. Check your individual learning plan with your tutor for exact timing.',
    },
    {
      question: 'How long will it take to revise this unit?',
      answer: 'A focused revision pass through this checklist typically takes 4\\u20136 hours spread across a week. Apprentices who use Elec-Mate\\u2019s mock exams and flashcards alongside the checklist usually find the multiple-choice exam confident within two short revision sessions.',
    },
    {
      question: 'What if I struggle with a specific topic?',
      answer: 'Use the linked Elec-Mate guides and calculators in the related-pages section below for any calculation-led topic. For theory-led topics, the BS 7671 18th Edition Guide and IET On-Site Guide are the canonical references. Your college tutor and assessor are also there to help — ask early, not at the end of the unit.',
    },
    {
      question: 'Where does this unit fit in the wider qualification?',
      answer: 'Unit ${unit.unit_code} is one of several units that together make up the ${qual.body}. Passing every unit and the end-point assessment (AM2 or equivalent) earns you the full qualification. Check the unit overview in our City & Guilds qualification hub for the full unit list.',
    },
  ],
  howToHeading: 'A Five-Step Revision Plan for This Unit',
  howToDescription:
    'A repeatable approach that works for ${qual.display} Unit ${unit.unit_code} and every other unit in your qualification.',
  howToSteps: [
    {
      name: 'Read through every topic point once',
      text: 'Start at Topic 1 and read every bullet point. Don\\u2019t try to memorise — just get familiar with the scope. Note any topic that feels unfamiliar so you can come back to it.',
    },
    {
      name: 'Map each topic to its calculator or guide',
      text: 'For calculation-led topics, open the relevant Elec-Mate calculator and try one worked example. For theory-led topics, find the matching section in BS 7671 or the IET On-Site Guide.',
    },
    {
      name: 'Work through Elec-Mate mock exam questions',
      text: 'The Elec-Mate apprentice tier includes mock questions mapped to this unit. Aim for 80%+ on a clean run before the real exam.',
    },
    {
      name: 'Get hands-on time on the bench',
      text: 'For practical units (inspection and testing, installation), ask your tutor for additional workshop access. The bench is where the points click.',
    },
    {
      name: 'Self-explain each topic to a peer',
      text: 'If you can explain a topic in your own words to another apprentice and they understand it, you know it. This is the single highest-leverage revision tactic.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/bs-7671-18th-edition-guide',
      title: 'BS 7671 18th Edition Guide',
      description: 'The current Wiring Regulations — the canonical reference for every unit.',
      icon: 'BookOpen',
      category: 'Guide',
    },
${tools.map((t) => `    {
      href: '${escSingle(t.href)}',
      title: '${escSingle(t.label.replace(/\\b(\\w)/g, (c) => c.toUpperCase()))}',
      description: 'Practice this unit\\u2019s calculation-led topics with a working tool.',
      icon: 'Calculator',
      category: 'Tool',
    },`).join('\n')}
    {
      href: '/guides/mock-exams-electrician',
      title: 'Mock Exams for Electricians',
      description: 'Mock multiple-choice questions across the full apprenticeship.',
      icon: 'ClipboardCheck',
      category: 'Guide',
    },
    {
      href: '/guides/am2-exam-tips',
      title: 'AM2 Exam Tips',
      description: 'End-point assessment preparation guide.',
      icon: 'GraduationCap',
      category: 'Guide',
    },
    {
      href: '/guides/apprentice-electrician-salary',
      title: 'Apprentice Electrician Salary',
      description: 'What you\\u2019ll earn in each year of your apprenticeship.',
      icon: 'PoundSterling',
      category: 'Guide',
    },
    {
      href: '/guides/off-the-job-training-hours',
      title: 'Off-The-Job Training Hours',
      description: 'How OTJ hours are logged and what counts toward your apprenticeship.',
      icon: 'ClipboardCheck',
      category: 'Guide',
    },
    {
      href: '/guides/year-1-apprentice-guide',
      title: 'Apprentice Year-by-Year Guide',
      description: 'What you\\u2019ll cover at college and on site through every year.',
      icon: 'GraduationCap',
      category: 'Guide',
    },
    {
      href: '/guides/ecs-gold-card-requirements',
      title: 'ECS / JIB Gold Card',
      description: 'What you need to qualify as a full electrician after apprenticeship.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
  ],
  ctaHeading: 'For Apprentices: Pass ${qual.display} Unit ${unit.unit_code} with Confidence',
  ctaSubheading:
    'Join 1,000+ UK apprentices using Elec-Mate for mock exams, flashcards and revision notes mapped to every unit. 7-day free trial — see your progress on the tutor dashboard.',
};
`;
}

function ident(unit) {
  return `unitRevision${unit.qualification_code.replace(/[^a-z0-9]/gi, '')}Unit${unit.unit_code.replace(/[^a-z0-9]/gi, '')}Config`;
}

function pageName(unit) {
  return `UnitRevision${unit.qualification_code.replace(/[^a-z0-9]/gi, '')}Unit${unit.unit_code.replace(/[^a-z0-9]/gi, '')}Page`;
}

function wrapperFor(unit) {
  const identName = ident(unit);
  const pname = pageName(unit);
  return `import GeneratedGuidePage from '@/pages/seo/generated/GeneratedGuidePage';
import { ${identName} } from '@/pages/seo/generated/${identName}';

export default function ${pname}() {
  return <GeneratedGuidePage config={${identName}} />;
}
`;
}

let generated = 0;
let skipped = 0;
const indexEntries = [];

for (const unit of byUnit.values()) {
  // Skip very thin units (< 7 ACs total)
  const acCount = [...unit.los.values()].reduce((s, l) => s + l.acs.length, 0);
  if (acCount < 7) {
    skipped++;
    continue;
  }
  const identName = ident(unit);
  const configFile = join(GEN_DIR, `${identName}.ts`);
  const wrapperFile = join(SEO_DIR, `${pageName(unit)}.tsx`);

  if (!FORCE && existsSync(configFile)) {
    skipped++;
    continue;
  }

  writeFileSync(configFile, configFor(unit));
  writeFileSync(wrapperFile, wrapperFor(unit));
  generated++;

  const slug = `/guides/${slugify(unit.qualification_code)}-unit-${unit.unit_code.replace(/[/]/g, '-')}-${slugify(unit.unit_title)}-revision`;
  indexEntries.push({ pname: pageName(unit), slug });
}

// Output a routes snippet
const lazyLines = indexEntries.map((e) => `const ${e.pname} = lazy(() => import('@/pages/seo/${e.pname}'));`).join('\n');
const routeLines = indexEntries.map((e) => `      <Route path="${e.slug}" element={<LazyRoute><${e.pname} /></LazyRoute>} />`).join('\n');
const routesOut = join(ROOT, 'reports/programmatic-routes-unit-revision.txt');
writeFileSync(routesOut, `// Paste lazy imports:\n\n${lazyLines}\n\n// Paste routes:\n\n${routeLines}\n`);

console.log(`Generated ${generated} unit revision pages, skipped ${skipped} thin units.`);
console.log(`Routes snippet written to ${routesOut}`);
