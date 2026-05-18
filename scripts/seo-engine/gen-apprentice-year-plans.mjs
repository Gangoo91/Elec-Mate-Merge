#!/usr/bin/env node
import { writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');
const SEO_DIR = join(ROOT, 'src/pages/seo');
const GEN_DIR = join(ROOT, 'src/pages/seo/generated');
const FORCE = process.argv.includes('--force');

const YEARS = [
  {
    year: 1, slug: 'electrical-apprentice-year-1-revision-plan',
    title: 'Year 1 Electrical Apprentice Revision Plan',
    summary: 'A complete revision plan for first-year electrical apprentices in the UK. Covers the Level 2 foundation units, AM1 (where applicable), and the core knowledge you must lock in before progressing to second year.',
    coreUnits: ['Health and safety in building services engineering', 'Principles of Electrical Science (Level 2)', 'Electrical installations technology', 'Installation of wiring systems and enclosures', 'Communication in building services engineering'],
    keySkills: ['Safe isolation 7-step procedure', 'Basic circuit theory (Ohm\\u2019s Law, series, parallel)', 'Conduit bending and trunking installation', 'Hand and power tool safety', 'Reading scaled drawings', 'BS 7671 navigation — first pass', 'Cable identification and current ratings (Appendix 4 introduction)'],
    typicalQuals: '2365-02 (City & Guilds), 5357 Level 2 (Apprenticeship Standard), EAL Level 2 (where offered)',
    examFocus: 'Online multiple-choice exams (3-4 per unit), college bench observations, written short-answer papers',
  },
  {
    year: 2, slug: 'electrical-apprentice-year-2-revision-plan',
    title: 'Year 2 Electrical Apprentice Revision Plan',
    summary: 'A complete revision plan for second-year electrical apprentices. Year 2 introduces Level 3 theory — fault diagnosis foundations, three-phase principles, and the start of inspection & testing.',
    coreUnits: ['Principles of Electrical Science (Level 3)', 'Electrical installations: fault diagnosis foundations', 'Environmental technology systems (solar, heat pumps, EV)', 'On-site portfolio building (NVQ-style)'],
    keySkills: ['R1+R2 continuity testing', 'Ring continuity testing (three-step method)', 'Insulation resistance testing at 250V/500V DC', 'Single-phase vs three-phase systems', 'Basic fault-finding logic', 'Reading the BS 7671 Schedule of Inspections', 'Submitting OJT (off-the-job) training hour evidence'],
    typicalQuals: '2365-03 (City & Guilds early units), 5357 Level 3 first-stage, 2357 NVQ year 2 portfolio',
    examFocus: 'Online multiple-choice (4-6 per unit), college bench fault-finding observations, ongoing NVQ portfolio submissions',
  },
  {
    year: 3, slug: 'electrical-apprentice-year-3-revision-plan',
    title: 'Year 3 Electrical Apprentice Revision Plan',
    summary: 'A complete revision plan for third-year electrical apprentices. Year 3 is the heaviest — full inspection & testing, electrical systems design, AM2 preparation, and the BS 7671 18th Edition exam.',
    coreUnits: ['Inspection, Testing and Commissioning', 'Electrical Systems Design', 'Fault diagnosis and rectification', 'BS 7671 Requirements for Electrical Installations'],
    keySkills: ['Initial verification full procedure', 'Earth fault loop impedance Zs measurement and verification', 'RCD operating time testing', 'Maximum demand calculation (ADMD)', 'Cable selection by installation method, ambient temperature, grouping', 'Voltage drop calculation for radial and ring circuits', 'AM2 mock day preparation'],
    typicalQuals: '2365-03 Unit 304 + 305 (heavy weighting), 5357 Level 3 main units, 18th Edition Amendment 4:2026 exam',
    examFocus: '18th Edition C&G 2382 (or equivalent), AM2 mock assessments, written design papers, large bench builds',
  },
  {
    year: 4, slug: 'electrical-apprentice-year-4-revision-plan',
    title: 'Year 4 Electrical Apprentice Revision Plan',
    summary: 'A complete revision plan for fourth-year electrical apprentices. Year 4 is dominated by the AM2 end-point assessment, NVQ portfolio completion, and the start of the working-electrician career.',
    coreUnits: ['NVQ portfolio completion (Level 3 NVQ 2357 or 5393-03 evidence)', 'AM2 end-point assessment preparation', 'Workplace-led learning + observed practice', 'Professional development planning'],
    keySkills: ['AM2 Section A timed practice', 'AM2 Section B safe isolation under observation', 'AM2 Section C complete bench install', 'AM2 Section D continuity and IR testing', 'AM2 Section E initial verification + EIC completion', 'AM2 Section F fault diagnosis under time pressure', 'AM2 Section G industry-knowledge written'],
    typicalQuals: '5357 end-point AM2 (apprenticeship standard pathway), 2357 NVQ completion, JIB grading interview',
    examFocus: 'AM2 end-point assessment — pass it and the apprenticeship is complete. JIB Approved Electrician application follows.',
  },
];

function escSingle(s) { return String(s).replace(/'/g, "\\'"); }
function pascalCase(s) { return s.split(/[^a-z0-9]+/i).filter(Boolean).map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(''); }

function configFor(y) {
  const ident = `${pascalCase(y.slug)}Config`;
  const coreList = y.coreUnits.map((u) => `            '${escSingle(u)}.',`).join('\n');
  const skillList = y.keySkills.map((u) => `            '${escSingle(u)}.',`).join('\n');

  return `import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Year-${y.year} apprentice revision master plan. Links to specific unit revision pages
// for each pathway (2365, 5357, 5393, EAL) and the AM2 deep-dives where Year-${y.year}
// involves the end-point assessment.
// Updated 2026-05-18.

const published = '2026-05-18';
const modified = '2026-05-18';

export const ${ident}: GeneratedGuideConfig = {
  pagePath: '/guides/${y.slug}',
  title: '${escSingle(y.title)} — Complete 2026 Study Plan',
  description: '${escSingle(y.summary)}',
  datePublished: published,
  dateModified: modified,
  readingTime: 11,
  badge: 'Year ${y.year} Apprentice',
  badgeIcon: 'GraduationCap',
  breadcrumbLabel: 'Year ${y.year} Revision Plan',
  heroPrefix: 'Year ${y.year} Electrical Apprentice:',
  heroHighlight: 'Complete Revision Plan',
  heroSuffix: '— Units, Skills & Assessments',
  heroSubtitle:
    '${escSingle(y.summary)} This page maps the year to specific Elec-Mate unit revision pages and tools, so you can prioritise what to study next.',
  keyTakeaways: [
    'Typical Year ${y.year} qualifications: ${escSingle(y.typicalQuals)}.',
    'Assessment focus this year: ${escSingle(y.examFocus)}.',
    'Year ${y.year} core unit areas cover ${y.coreUnits.length} main themes — listed in full below.',
    'Year ${y.year} key practical skills cover ${y.keySkills.length} on-site / bench-based competencies.',
    'Year ${y.year} progression depends on completing both college units AND on-site portfolio evidence (where NVQ-based).',
    'Use Elec-Mate\\u2019s apprentice dashboard to track your progress against every Year ${y.year} unit and the AM2 milestones.',
  ],
  sections: [
    {
      id: 'core-unit-areas',
      heading: 'Core Unit Areas Covered in Year ${y.year}',
      tocLabel: 'Core unit areas',
      blocks: [
        {
          type: 'paragraph',
          text: 'Year ${y.year} of a UK electrical apprenticeship typically covers these main unit areas. Exact unit titles vary by awarding body and qualification — use the linked unit revision pages for the specific qualification you are on.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
${coreList}
          ],
        },
      ],
    },
    {
      id: 'key-skills',
      heading: 'Key Practical Skills for Year ${y.year}',
      tocLabel: 'Key skills',
      blocks: [
        {
          type: 'paragraph',
          text: 'These are the practical / calculation / certification skills you should be confident with by the end of Year ${y.year}. Build them on the college bench, on site, and through Elec-Mate\\u2019s tools.',
        },
        {
          type: 'list',
          ordered: false,
          items: [
${skillList}
          ],
        },
      ],
    },
    {
      id: 'monthly-plan',
      heading: 'A Suggested Month-by-Month Plan',
      tocLabel: 'Monthly plan',
      blocks: [
        {
          type: 'paragraph',
          text: 'Below is a typical Year ${y.year} rhythm. Adjust to your specific college block schedule and on-site rotation.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Months 1-2: Orientate with the college handbook. Read every unit specification in full. Open the matching Elec-Mate unit revision page and self-rate every topic.',
            'Months 3-4: Bench-focused practical work. Use OJT hours wisely — record everything in your portfolio (Elec-Mate auto-logs this).',
            'Months 5-6: First mid-year assessments. Use mock exams to find weak topics. Re-revise the 1s and 2s on your topic self-rating.',
            'Months 7-9: Theory-heavy block. BS 7671 navigation, electrical science, design or fault diagnosis depending on year.',
            'Months 10-11: Final assessments and end-of-year exam window. Light review, plenty of rest, and one final mock per unit.',
            'Month 12: Transition to next year — close off the current year\\u2019s portfolio, review weak areas with your tutor, prepare for the next block.',
          ],
        },
      ],
    },
    {
      id: 'study-with-elec-mate',
      heading: 'Study Year ${y.year} With Elec-Mate',
      tocLabel: 'Study with Elec-Mate',
      blocks: [
        {
          type: 'paragraph',
          text: 'The Elec-Mate apprentice tier is built specifically for UK electrical apprentices in Year ${y.year}. Unit-by-unit revision content, mock exams, flashcards, OJT tracking, and a tutor-shared dashboard so your college can see your progress in real time.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'For Year ${y.year} apprentices',
          body:
            'Try the Year ${y.year} dashboard free for 7 days. See your progress against every unit, every mock exam, and every AM2 section. Cancel anytime.',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'What units do you typically take in Year ${y.year}?',
      answer: 'Year ${y.year} typically covers: ${escSingle(y.coreUnits.join('; '))}. The exact unit codes depend on your qualification — ${escSingle(y.typicalQuals)}.',
    },
    {
      question: 'How is Year ${y.year} assessed?',
      answer: 'Year ${y.year} assessment focus: ${escSingle(y.examFocus)}. Most apprentices complete a combination of online multiple-choice exams, written short-answer papers, observed bench tasks and (in NVQ-based pathways) on-site portfolio evidence.',
    },
    {
      question: 'What if I fail a unit in Year ${y.year}?',
      answer: 'Most college pathways allow at least one re-sit per unit. Speak to your tutor immediately — early re-sits go better than late ones. Year ${y.year} performance also affects your NVQ portfolio and progression, so do not let a failed unit drift.',
    },
    {
      question: 'How many hours per week should I revise in Year ${y.year}?',
      answer: 'A typical apprentice does 4-6 hours of focused revision per week during college blocks, plus the on-the-job training hours (typically 20% of working time = ~6-8 hours/week). Elec-Mate\\u2019s OJT logger captures both.',
    },
    {
      question: 'What is the next step after Year ${y.year}?',
      answer: 'After Year ${y.year}, you progress to ${y.year < 4 ? `Year ${y.year + 1}` : 'qualified electrician status — JIB Approved Electrician grade, ECS Gold Card, and the option to register with a competent person scheme (NICEIC, NAPIT, ELECSA, Stroma)'}.',
    },
    {
      question: 'Can I switch awarding body mid-apprenticeship?',
      answer: 'Possible but uncommon — most colleges deliver one awarding body per cohort. If you switch (e.g. C&G to EAL) some units may map across via APL (Accredited Prior Learning); confirm with your training provider and awarding body before committing.',
    },
  ],
  howToHeading: 'A Five-Step Year ${y.year} Revision Approach',
  howToDescription:
    'Use this approach every term to stay on top of Year ${y.year}.',
  howToSteps: [
    {
      name: 'Map your year onto the Elec-Mate unit revision pages',
      text: 'Find your qualification + units in our unit-by-unit revision library. Bookmark every page you will study this year.',
    },
    {
      name: 'Self-rate every topic and identify priorities',
      text: 'For each unit, work through the Elec-Mate topic checklist and rate yourself 1-5. The 1s and 2s become your revision priorities.',
    },
    {
      name: 'Build a weekly study habit',
      text: 'Aim for 4-6 hours of focused revision per week during college blocks. Short sessions on the train to site work surprisingly well — use the flashcard mode.',
    },
    {
      name: 'Run mock exams a month before the real ones',
      text: 'Elec-Mate mocks mirror the real exam timings and weighting. Use them to find weak topics with enough time to re-revise.',
    },
    {
      name: 'Log every hour of OJT in your portfolio',
      text: 'Off-the-job training hours are a regulatory requirement for the apprenticeship — and the NVQ portfolio is where they are evidenced. Use Elec-Mate\\u2019s OJT logger so your tutor and assessor have everything they need.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/off-the-job-training-hours',
      title: 'Off-The-Job Training Hours',
      description: 'How OTJ hours are logged and what counts.',
      icon: 'ClipboardCheck',
      category: 'Guide',
    },
    {
      href: '/guides/am2-exam-tips',
      title: 'AM2 Exam Tips',
      description: 'End-point assessment preparation — most relevant in Year 4.',
      icon: 'GraduationCap',
      category: 'Guide',
    },
    {
      href: '/guides/mock-exams-electrician',
      title: 'Mock Exams for Electricians',
      description: 'Practice papers across the whole apprenticeship.',
      icon: 'ClipboardCheck',
      category: 'Guide',
    },
    {
      href: '/guides/apprentice-electrician-salary',
      title: 'Apprentice Electrician Salary',
      description: 'What you\\u2019ll earn at each stage of the apprenticeship.',
      icon: 'PoundSterling',
      category: 'Guide',
    },
    {
      href: '/guides/bs-7671-18th-edition-guide',
      title: 'BS 7671 18th Edition Guide',
      description: 'Your single reference book through the apprenticeship.',
      icon: 'BookOpen',
      category: 'Guide',
    },
    {
      href: '/guides/ecs-gold-card-requirements',
      title: 'ECS / JIB Gold Card',
      description: 'The next step after passing AM2.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
  ],
  ctaHeading: 'For Year ${y.year} Apprentices: Track Every Unit on Your Phone',
  ctaSubheading:
    'Join 1,000+ UK apprentices using Elec-Mate for unit revision, mock exams, OJT tracking and tutor-shared progress. 7-day free trial.',
};
`;
}

function wrapperFor(y) {
  const ident = `${pascalCase(y.slug)}Config`;
  const pname = `${pascalCase(y.slug)}Page`;
  return `import GeneratedGuidePage from '@/pages/seo/generated/GeneratedGuidePage';
import { ${ident} } from '@/pages/seo/generated/${ident}';

export default function ${pname}() {
  return <GeneratedGuidePage config={${ident}} />;
}
`;
}

let generated = 0;
let skipped = 0;
const indexEntries = [];
for (const y of YEARS) {
  const ident = `${pascalCase(y.slug)}Config`;
  const pname = `${pascalCase(y.slug)}Page`;
  const configFile = join(GEN_DIR, `${ident}.ts`);
  const wrapperFile = join(SEO_DIR, `${pname}.tsx`);
  if (!FORCE && existsSync(configFile)) { skipped++; continue; }
  writeFileSync(configFile, configFor(y));
  writeFileSync(wrapperFile, wrapperFor(y));
  generated++;
  indexEntries.push({ pname, slug: `/guides/${y.slug}` });
}

const lazyLines = indexEntries.map((e) => `const ${e.pname} = lazy(() => import('@/pages/seo/${e.pname}'));`).join('\n');
const routeLines = indexEntries.map((e) => `      <Route path="${e.slug}" element={<LazyRoute><${e.pname} /></LazyRoute>} />`).join('\n');
writeFileSync(join(ROOT, 'reports/programmatic-routes-year-plans.txt'), `// Lazy:\n${lazyLines}\n\n// Routes:\n${routeLines}\n`);
console.log(`Generated ${generated} year-plan pages, skipped ${skipped}.`);
