#!/usr/bin/env node
/**
 * gen-qualification-hubs.mjs — One pillar page per UK electrical
 * qualification. Lists every unit and links to its revision page. Becomes
 * the natural entry point for searches like "City & Guilds 5357 complete guide".
 *
 * Reads scripts/seo-engine/curriculum/all-curriculum.json to derive the
 * unit list per qualification.
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

const QUAL_META = {
  '2365-02': { display: 'City & Guilds 2365-02', body: 'Level 2 Diploma in Electrical Installations', level: 'Level 2', awarding: 'City & Guilds', regulated: 'Ofqual', who: 'first-year electrical apprentices and adult learners starting out in the trade', endPoint: 'Multiple unit-level online and written assessments, plus college bench observations', duration: '1 year typical, can be done part-time over 2 years', leadsTo: 'Level 3 Diploma (2365-03) or Apprenticeship Standard (5357) Level 3 progression', funding: 'Adult learner funding (19+ Advanced Learner Loan) or apprenticeship-funded if part of a Level 2 + Level 3 combined route', slug: '2365-02' },
  '2365-03': { display: 'City & Guilds 2365-03', body: 'Level 3 Diploma in Electrical Installations', level: 'Level 3', awarding: 'City & Guilds', regulated: 'Ofqual', who: 'second to fourth-year apprentices and adult learners progressing from Level 2', endPoint: 'Unit-level online and written assessments plus the optional 2391 inspection-and-testing exam', duration: '2-3 years typical part-time alongside on-the-job work', leadsTo: 'AM2 end-point assessment, NVQ 2357 portfolio, ECS Gold Card', funding: 'Adult learner funding (Advanced Learner Loan) or apprenticeship-funded under the Apprenticeship Standard', slug: '2365-03' },
  '2366-03': { display: 'City & Guilds 2366-03', body: 'Level 3 Diploma in Electrotechnical Technology', level: 'Level 3', awarding: 'City & Guilds', regulated: 'Ofqual', who: 'industrial / maintenance electricians and technicians', endPoint: 'Unit-level assessments plus workplace NVQ evidence', duration: '2-3 years typical', leadsTo: 'NVQ 2357 portfolio + AM2 end-point assessment', funding: 'Mainly employer-funded for industrial maintenance pathways', slug: '2366-03' },
  '5357': { display: 'City & Guilds 5357', body: 'Level 3 Electrotechnical Qualification (Apprenticeship Standard)', level: 'Level 3', awarding: 'City & Guilds', regulated: 'IfATE', who: 'apprentices on the official Apprenticeship Standard (most new starters since 2018)', endPoint: 'AM2 end-point assessment (mandatory)', duration: '3-4 years', leadsTo: 'JIB Approved Electrician grade, ECS Gold Card, scheme membership eligibility', funding: 'Apprenticeship Levy + 95% Government funding (or 100% for under-21s with under-50-employee firms)', slug: '5357' },
  '5393-03': { display: 'City & Guilds 5393-03', body: 'Level 3 Electrotechnical Qualification — Dwellings pathway', level: 'Level 3', awarding: 'City & Guilds', regulated: 'IfATE', who: 'apprentices working primarily in domestic dwellings — sole-trader-track', endPoint: 'AM2 end-point assessment (dwellings-focused)', duration: '3-4 years', leadsTo: 'JIB Approved Electrician (Dwellings), ECS Gold Card, NICEIC DI scheme membership', funding: 'Apprenticeship Standard funding', slug: '5393-03' },
  '2357': { display: 'City & Guilds 2357', body: 'Level 3 NVQ Diploma in Installing Electrotechnical Systems and Equipment', level: 'Level 3', awarding: 'City & Guilds', regulated: 'Ofqual', who: 'adult learners, career-changers, experienced workers, those outside the funded apprenticeship route', endPoint: 'Portfolio-based — typically 80+ pieces of on-the-job evidence + AM2 (where applicable)', duration: '2-3 years typical for adult learners', leadsTo: 'JIB Approved Electrician grade + AM2 + ECS Gold Card', funding: 'Mostly self-funded or employer-funded; some Adult Learner Loan eligibility', slug: '2357' },
  '8202': { display: 'City & Guilds 8202', body: 'T Level in Building Services Engineering — Electrical Installation', level: 'Level 3 (T Level)', awarding: 'City & Guilds', regulated: 'IfATE', who: '16-18 year olds choosing between A-Levels and apprenticeship', endPoint: 'Final exams + employer-set project + 45-day industry placement', duration: '2 years (college-based with placement)', leadsTo: 'Direct university entry or apprenticeship year-2 entry', funding: '16-18 college funding (free for students)', slug: '8202' },
  '2346-03': { display: 'City & Guilds 2346-03', body: 'Electrotechnical Experienced Worker Qualification', level: 'Level 3', awarding: 'City & Guilds', regulated: 'Ofqual', who: 'experienced electricians consolidating skills outside a formal apprenticeship — typically those who learned on the job without formal qualification', endPoint: 'Portfolio + verification of existing competence + AM2 or equivalent', duration: '6-18 months typical', leadsTo: 'JIB Approved Electrician + ECS Gold Card eligibility', funding: 'Self-funded — typical cost £2,500-4,500', slug: '2346-03' },
  '610/3907/X': { display: 'EAL Level 3', body: 'EAL Level 3 Electrotechnical Technical Occupational Entry qualification', level: 'Level 3', awarding: 'EAL', regulated: 'Ofqual', who: 'EAL Level 3 apprentices (alternative to C&G 5357)', endPoint: 'AM2 end-point assessment (mandatory)', duration: '3-4 years', leadsTo: 'JIB Approved Electrician + ECS Gold Card', funding: 'Apprenticeship Standard funding (95-100%)', slug: 'eal-level-3-electrotechnical' },
  'EAL-NETP3': { display: 'EAL NETP3', body: 'EAL Level 3 NVQ in Electrotechnical Practice', level: 'Level 3', awarding: 'EAL', regulated: 'Ofqual', who: 'adult learners and apprentices on the EAL NVQ pathway', endPoint: 'NVQ portfolio + AM2 (where applicable)', duration: '2-3 years', leadsTo: 'JIB Approved Electrician + ECS Gold Card', funding: 'Self-funded or employer-funded for adult learners; apprenticeship-funded for under-25s', slug: 'eal-netp3' },
};

function slugify(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
function escSingle(s) { return String(s).replace(/'/g, "\\'"); }
function pascalCase(s) { return s.split(/[^a-z0-9]+/i).filter(Boolean).map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(''); }

const rows = JSON.parse(readFileSync(CURRICULUM, 'utf-8'));
const byQual = new Map();
for (const r of rows) {
  if (!byQual.has(r.qualification_code)) byQual.set(r.qualification_code, new Map());
  const units = byQual.get(r.qualification_code);
  if (!units.has(r.unit_code)) units.set(r.unit_code, { unit_code: r.unit_code, unit_title: r.unit_title, acCount: 0 });
  units.get(r.unit_code).acCount++;
}

function unitRevSlug(qualCode, unitCode, unitTitle) {
  return `/guides/${slugify(qualCode)}-unit-${unitCode.replace(/[/]/g, '-')}-${slugify(unitTitle)}-revision`;
}

function configFor(qualCode, units) {
  const meta = QUAL_META[qualCode];
  if (!meta) return null;
  const unitList = [...units.values()].sort((a, b) => a.unit_code.localeCompare(b.unit_code, undefined, { numeric: true }));
  const unitItems = unitList.map((u) => `      {
        href: '${unitRevSlug(qualCode, u.unit_code, u.unit_title)}',
        title: '${escSingle(meta.display)} Unit ${escSingle(u.unit_code)}',
        description: '${escSingle(u.unit_title)} — ${u.acCount} topic points across the unit.',
        icon: 'BookOpen',
        category: 'Guide',
      },`).join('\n');

  const ident = `qualHub${pascalCase(qualCode)}Config`;
  const pageSlug = `/guides/${meta.slug}-complete-guide`;

  return `import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Qualification hub for ${meta.display}. Pillar page that lists every unit
// and links to its revision page. Apprentice-facing.
// Updated 2026-05-18.

const published = '2026-05-18';
const modified = '2026-05-18';

export const ${ident}: GeneratedGuideConfig = {
  pagePath: '${pageSlug}',
  title: '${escSingle(meta.display)}: ${escSingle(meta.body)} — Complete Guide',
  description: 'The complete 2026 guide to ${escSingle(meta.display)} (${escSingle(meta.body)}). Every unit listed with revision links, full structure, who it is for, end-point assessment, and how to study it. For ${escSingle(meta.who)}.',
  datePublished: published,
  dateModified: modified,
  readingTime: 11,
  badge: 'Qualification Hub',
  badgeIcon: 'GraduationCap',
  breadcrumbLabel: '${escSingle(meta.display)} Hub',
  heroPrefix: '${escSingle(meta.display)}:',
  heroHighlight: '${escSingle(meta.body)}',
  heroSuffix: '— Complete 2026 Guide',
  heroSubtitle:
    'A complete guide to ${escSingle(meta.display)} (${escSingle(meta.body)}). Designed for ${escSingle(meta.who)}. This hub indexes every unit with a direct link to its revision page, plus structure, end-point, duration and funding — everything you need to plan your study.',
  keyTakeaways: [
    'Level: ${escSingle(meta.level)} — awarded by ${escSingle(meta.awarding)} — regulated by ${escSingle(meta.regulated)}.',
    'Designed for: ${escSingle(meta.who)}.',
    'Typical duration: ${escSingle(meta.duration)}.',
    'End-point assessment: ${escSingle(meta.endPoint)}.',
    'On completion this leads to: ${escSingle(meta.leadsTo)}.',
    'Funding route: ${escSingle(meta.funding)}.',
    '${unitList.length} core units cover ${unitList.reduce((s, u) => s + u.acCount, 0)} specific topic points across the qualification.',
  ],
  sections: [
    {
      id: 'overview',
      heading: 'Qualification Overview',
      tocLabel: 'Overview',
      blocks: [
        {
          type: 'paragraph',
          text: '${escSingle(meta.display)} (${escSingle(meta.body)}) is a ${escSingle(meta.level)} qualification awarded by ${escSingle(meta.awarding)} and regulated by ${escSingle(meta.regulated)}. It is designed for ${escSingle(meta.who)} and typically runs ${escSingle(meta.duration)}.',
        },
        {
          type: 'paragraph',
          text: 'The qualification is built around ${unitList.length} core units. Each unit covers a distinct theme — health and safety, electrical science, installation, fault diagnosis, inspection and testing, design — and combines theory assessment with practical workshop observation. Below is every unit with a direct link to its full revision page.',
        },
      ],
    },
    {
      id: 'units',
      heading: 'Every Unit With Revision Link',
      tocLabel: 'All units',
      blocks: [
        {
          type: 'paragraph',
          text: 'Click any unit to open the full revision page — every topic point, exam tips, 5-step study plan, and Elec-Mate practice tools mapped to that unit.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
${unitList.map((u) => `            'Unit ${escSingle(u.unit_code)} — ${escSingle(u.unit_title)} (${u.acCount} topic points).',`).join('\n')}
          ],
        },
      ],
    },
    {
      id: 'end-point',
      heading: 'How the Qualification is Assessed',
      tocLabel: 'Assessment',
      blocks: [
        {
          type: 'paragraph',
          text: '${escSingle(meta.endPoint)}. Each individual unit also has its own assessment — typically a mix of online multiple-choice exams, written short-answer papers, and practical workshop tasks observed by your tutor or assessor.',
        },
        {
          type: 'paragraph',
          text: 'Plan your revision unit by unit using the linked Elec-Mate revision pages above. Each gives you the topic checklist, common mistakes, and a 5-step revision plan.',
        },
      ],
    },
    {
      id: 'funding',
      heading: 'Funding and Cost',
      tocLabel: 'Funding',
      blocks: [
        {
          type: 'paragraph',
          text: 'Funding route: ${escSingle(meta.funding)}. Exact arrangements vary by your specific employer, college, and personal circumstances — confirm with your training provider before enrolling.',
        },
      ],
    },
    {
      id: 'study-with-elec-mate',
      heading: 'Study ${escSingle(meta.display)} With Elec-Mate',
      tocLabel: 'Study with Elec-Mate',
      blocks: [
        {
          type: 'paragraph',
          text: 'The Elec-Mate apprentice tier covers every unit in ${escSingle(meta.display)} with mock exams, flashcards, revision notes, and OJT (off-the-job) hour tracking. Tutors get a dashboard showing every apprentice\\u2019s progress in real time.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'For apprentices and adult learners',
          body:
            '7-day free trial of the Elec-Mate apprentice tier. Specify ${escSingle(meta.display)} on signup and the dashboard tailors to your specific units.',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'How long does ${escSingle(meta.display)} take?',
      answer: '${escSingle(meta.display)} typically takes ${escSingle(meta.duration)} to complete. Time depends on whether you are full-time at college, part-time alongside on-the-job work, or an adult learner self-funding.',
    },
    {
      question: 'Who is ${escSingle(meta.display)} for?',
      answer: '${escSingle(meta.display)} is designed for ${escSingle(meta.who)}. Confirm with your training provider that this is the right pathway for your situation before enrolling.',
    },
    {
      question: 'What is the end-point assessment?',
      answer: 'The end-point assessment is: ${escSingle(meta.endPoint)}. This sits alongside each unit\\u2019s own assessment — every unit must be passed to be eligible for the end-point.',
    },
    {
      question: 'How much does ${escSingle(meta.display)} cost?',
      answer: 'Cost depends on funding route: ${escSingle(meta.funding)}. Adult learners self-funding typically pay £2,000-6,500 across the duration. Apprentices on the Apprenticeship Standard route typically pay nothing themselves.',
    },
    {
      question: 'What does ${escSingle(meta.display)} qualify me to do?',
      answer: 'On completion this leads to: ${escSingle(meta.leadsTo)}. With JIB Approved Electrician grade and an ECS Gold Card you are eligible for competent person scheme membership (NICEIC, NAPIT, ELECSA, Stroma) and can self-certify Part P notifiable work.',
    },
    {
      question: 'Can I revise for ${escSingle(meta.display)} on my phone?',
      answer: 'Yes — Elec-Mate\\u2019s apprentice tier covers every ${escSingle(meta.display)} unit with mobile-friendly revision content, mock exams, and flashcards. 7-day free trial.',
    },
  ],
  howToHeading: 'How to Get the Most Out of ${escSingle(meta.display)}',
  howToDescription:
    'Five steps to a confident pass on every unit and the end-point assessment.',
  howToSteps: [
    { name: 'Read every unit revision page above', text: 'Get familiar with the scope of every unit before you start the academic year. Knowing what is coming means no surprises.' },
    { name: 'Self-rate every topic 1-5 on each unit', text: 'For each unit\\u2019s topic checklist, rate yourself 1-5. The 1s and 2s become your revision priorities.' },
    { name: 'Build a weekly study habit', text: 'Aim for 4-6 hours of focused revision per week during college blocks. Short sessions on the train to site work — use the flashcard mode.' },
    { name: 'Run mock exams a month before each unit assessment', text: 'Elec-Mate mocks mirror the real exam timings and weighting. Use them to find weak topics with enough time to re-revise.' },
    { name: 'Track OJT hours and portfolio evidence', text: 'Off-the-job training hours and portfolio evidence are regulatory requirements. Use Elec-Mate\\u2019s logger so your tutor and assessor have everything they need.' },
  ],
  relatedPages: [
    { href: '/guides/electrical-apprentice-year-1-revision-plan', title: 'Year 1 Revision Plan', description: 'First-year apprentice study plan.', icon: 'GraduationCap', category: 'Guide' },
    { href: '/guides/electrical-apprentice-year-3-revision-plan', title: 'Year 3 Revision Plan', description: 'Inspection, testing, design, AM2 prep.', icon: 'GraduationCap', category: 'Guide' },
    { href: '/guides/am2-exam-tips', title: 'AM2 Exam Tips', description: 'End-point assessment preparation.', icon: 'GraduationCap', category: 'Guide' },
    { href: '/guides/mock-exams-electrician', title: 'Mock Exams for Electricians', description: 'Practice papers across the qualification.', icon: 'ClipboardCheck', category: 'Guide' },
    { href: '/guides/apprentice-electrician-salary', title: 'Apprentice Electrician Salary', description: 'What you earn at each year.', icon: 'PoundSterling', category: 'Guide' },
    { href: '/guides/ecs-gold-card-requirements', title: 'ECS / JIB Gold Card', description: 'Next step after completing the qualification.', icon: 'ShieldCheck', category: 'Guide' },
  ],
  ctaHeading: 'Study ${escSingle(meta.display)} With Confidence',
  ctaSubheading:
    'Join 1,000+ UK apprentices using Elec-Mate for unit revision, mock exams, OJT tracking and end-point assessment prep. 7-day free trial.',
};
`;
}

function wrapperFor(qualCode) {
  const meta = QUAL_META[qualCode];
  const ident = `qualHub${pascalCase(qualCode)}Config`;
  const pname = `QualHub${pascalCase(qualCode)}Page`;
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
for (const [qualCode, units] of byQual.entries()) {
  if (!QUAL_META[qualCode]) continue;
  const meta = QUAL_META[qualCode];
  const ident = `qualHub${pascalCase(qualCode)}Config`;
  const pname = `QualHub${pascalCase(qualCode)}Page`;
  const configFile = join(GEN_DIR, `${ident}.ts`);
  const wrapperFile = join(SEO_DIR, `${pname}.tsx`);
  if (!FORCE && existsSync(configFile)) { skipped++; continue; }
  const cfg = configFor(qualCode, units);
  if (!cfg) { skipped++; continue; }
  writeFileSync(configFile, cfg);
  writeFileSync(wrapperFile, wrapperFor(qualCode));
  generated++;
  indexEntries.push({ pname, slug: `/guides/${meta.slug}-complete-guide` });
}

const lazyLines = indexEntries.map((e) => `const ${e.pname} = lazy(() => import('@/pages/seo/${e.pname}'));`).join('\n');
const routeLines = indexEntries.map((e) => `      <Route path="${e.slug}" element={<LazyRoute><${e.pname} /></LazyRoute>} />`).join('\n');
writeFileSync(join(ROOT, 'reports/programmatic-routes-qual-hubs.txt'), `// Lazy:\n${lazyLines}\n\n// Routes:\n${routeLines}\n`);
console.log(`Generated ${generated} qualification hubs, skipped ${skipped}.`);
