#!/usr/bin/env node
import { writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');
const SEO_DIR = join(ROOT, 'src/pages/seo');
const GEN_DIR = join(ROOT, 'src/pages/seo/generated');
const FORCE = process.argv.includes('--force');

const COMPARISONS = [
  {
    slug: 'cg-2365-vs-5357-vs-2366',
    title: 'City & Guilds 2365 vs 5357 vs 2366 — Electrical Apprentice Routes Compared',
    summary: 'A side-by-side comparison of the three main City & Guilds pathways for UK electrical apprentices. Which one you take depends on your employer, your training provider, and the funding route — but the differences in scope, exams, and end-point matter.',
    items: [
      { name: 'City & Guilds 2365', body: 'Level 2 + Level 3 Diploma in Electrical Installations', strengths: ['Traditional college-led structure', 'Strong theory foundation across years 1-3', 'Clear unit-by-unit progression'], audience: 'College-based apprentices funded outside the Apprenticeship Standard route', endPoint: 'Multiple unit-level assessments + 2391 inspection-and-testing exam (separate)' },
      { name: 'City & Guilds 5357', body: 'Level 3 Electrotechnical Qualification (Apprenticeship Standard)', strengths: ['Aligns with the Government Apprenticeship Standard', 'Employer-led structure with mandatory on-the-job evidence', 'AM2 end-point assessment is built into the qualification'], audience: 'Apprentices on the official Apprenticeship Standard pathway (most new starters from 2018 onwards)', endPoint: 'AM2 end-point assessment (mandatory)' },
      { name: 'City & Guilds 2366', body: 'Level 3 Diploma in Electrotechnical Technology', strengths: ['Broader electrotechnical scope (motors, building services, controls)', 'Suits maintenance / industrial pathways', 'Often paired with a specific NVQ for the workplace evidence'], audience: 'Industrial / maintenance electricians, technician pathways', endPoint: 'Final exams + workplace NVQ evidence' },
    ],
  },
  {
    slug: 'nvq-2357-vs-apprenticeship-standard-5357',
    title: 'NVQ 2357 vs Apprenticeship Standard 5357 — Which Pathway?',
    summary: 'NVQ 2357 and the Apprenticeship Standard 5357 are the two main on-the-job evidence routes for UK electrical qualification. They sound similar but have different funding, structure, and end-point assessment.',
    items: [
      { name: 'NVQ 2357', body: 'Level 3 NVQ Diploma in Installing Electrotechnical Systems and Equipment', strengths: ['Portfolio-based — evidence collected on real jobs', 'Suits adult learners, experienced workers and career-changers', 'Can be done alongside any compatible Level 3 Diploma'], audience: 'Adult learners, career-changers, experienced workers, those outside the funded apprenticeship route', endPoint: 'Portfolio + AM2 (where applicable)' },
      { name: 'Apprenticeship Standard 5357', body: 'Level 3 Electrotechnical Qualification — Apprenticeship Standard route', strengths: ['Government-funded for under-25 apprentices (employer-subsidised over 25)', 'Includes mandatory 20% off-the-job training', 'AM2 end-point assessment built in'], audience: 'New starters under the Apprenticeship Standard pathway (most 16-24 apprentices)', endPoint: 'AM2 end-point assessment (gateway-controlled)' },
    ],
  },
  {
    slug: 'city-and-guilds-vs-eal',
    title: 'City & Guilds vs EAL — UK Electrical Awarding Bodies Compared',
    summary: 'City & Guilds and EAL are the two largest awarding bodies for UK electrical qualifications. Most apprentices are with one or the other. The qualifications are largely equivalent in industry recognition — but the assessment style and unit structure differ.',
    items: [
      { name: 'City & Guilds', body: 'The oldest and largest UK vocational awarding body', strengths: ['Largest UK electrical apprentice market share', 'Most colleges deliver C&G pathways', 'Strong industry brand recognition'], audience: 'Most UK electrical apprentices — default if your training provider does not specify', endPoint: 'AM2 (under 5357) or unit-level + 2391 (under 2365)' },
      { name: 'EAL', body: 'Engineering and Manufacturing Awarding Body — Level 3 NVQ / Technical pathways', strengths: ['Strong in industrial / engineering pathways', 'Different unit structure that some employers prefer', 'Identical industry recognition once qualified'], audience: 'Apprentices in industrial / engineering-led employers, alternative training providers', endPoint: 'AM2 (under the EAL Apprenticeship Standard) or NVQ portfolio (NETP3)' },
    ],
  },
  {
    slug: 't-level-vs-apprenticeship-electrical',
    title: 'T Level vs Apprenticeship — Which Is Right for Electrical?',
    summary: 'T Levels (Building Services Engineering — Electrical Installation, 8202) launched in 2020 as an alternative to apprenticeships. Both lead to a Level 3 qualification, but the structure, time on site, and employer relationship are very different.',
    items: [
      { name: 'T Level (8202)', body: '2-year Level 3 college-led programme with 45-day industry placement', strengths: ['College-led, structured timetable', 'Single employer placement, lower commitment', 'Strong UCAS points equivalent to A-Levels for university entry'], audience: '16-18 year olds choosing between A-Levels and apprenticeship; those not certain electrical is their long-term path', endPoint: 'Final exams + employer-set project + industry placement evidence' },
      { name: 'Apprenticeship', body: '3-4 year employer-led programme with 20% off-the-job training', strengths: ['Earn while you learn — full apprentice wage from day one', 'Longer industry experience (3-4 years of real jobs)', 'Direct route to JIB Approved Electrician status after AM2'], audience: '16+ committed to electrical as a career; learners who prefer on-the-job learning over classroom', endPoint: 'AM2 end-point assessment + JIB grading' },
    ],
  },
  {
    slug: 'domestic-installer-vs-full-electrician',
    title: 'Domestic Installer vs Full Electrician — Two Different Qualifications',
    summary: 'A "Domestic Installer" (Part P qualification) is a short course covering domestic electrical work only. A full Level 3 electrician (NVQ / Apprenticeship Standard) is qualified across all environments. They are NOT the same qualification.',
    items: [
      { name: 'Domestic Installer (Part P)', body: 'Short course (4-6 weeks typical) — focused on domestic single-dwelling work', strengths: ['Quick route into self-employed domestic work', 'Lower upfront cost (~£2,500-4,500)', 'Allows scheme registration for domestic notifiable work via NICEIC DI / NAPIT DI'], audience: 'Career-changers wanting to do domestic work only; mature learners with limited time', endPoint: 'Scheme assessment (NICEIC DI / NAPIT DI) — much shorter than AM2' },
      { name: 'Full Level 3 Electrician', body: '3-4 year apprenticeship + AM2 + portfolio', strengths: ['Qualified across domestic, commercial, industrial', 'JIB Approved Electrician grade', 'Full scheme membership without restriction'], audience: 'Long-term career electricians wanting full industry recognition', endPoint: 'AM2 end-point assessment + JIB grading' },
    ],
  },
];

function escSingle(s) { return String(s).replace(/'/g, "\\'"); }
function pascalCase(s) { return s.split(/[^a-z0-9]+/i).filter(Boolean).map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(''); }

function configFor(c) {
  const ident = `${pascalCase(c.slug)}Config`;
  const itemSections = c.items.map((it, i) => `    {
      id: '${escSingle(it.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'))}',
      heading: '${escSingle(it.name)} — ${escSingle(it.body)}',
      tocLabel: '${escSingle(it.name)}',
      blocks: [
        {
          type: 'paragraph',
          text: 'Audience: ${escSingle(it.audience)}.',
        },
        {
          type: 'paragraph',
          text: 'Strengths:',
        },
        {
          type: 'list',
          ordered: false,
          items: [
${it.strengths.map((s) => `            '${escSingle(s)}.',`).join('\n')}
          ],
        },
        {
          type: 'paragraph',
          text: 'End-point / assessment: ${escSingle(it.endPoint)}.',
        },
      ],
    },`).join('\n');

  return `import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// UK electrical apprentice pathway comparison page. Helps apprentices, parents,
// and career-changers compare qualifications + routes before committing. Apprentice
// audience — CTA to Elec-Mate apprentice tier or qualification overview.
// Updated 2026-05-18.

const published = '2026-05-18';
const modified = '2026-05-18';

export const ${ident}: GeneratedGuideConfig = {
  pagePath: '/guides/${c.slug}',
  title: '${escSingle(c.title)} — 2026 Guide',
  description: '${escSingle(c.summary)}',
  datePublished: published,
  dateModified: modified,
  readingTime: 10,
  badge: 'Pathway Comparison',
  badgeIcon: 'GraduationCap',
  breadcrumbLabel: '${escSingle(c.title.split('—')[0].trim())}',
  heroPrefix: '${escSingle(c.title.split('—')[0].trim())}',
  heroHighlight: '${escSingle(c.title.split('—')[1] ? c.title.split('—')[1].trim() : 'Compared')}',
  heroSuffix: '— UK 2026 Guide',
  heroSubtitle:
    '${escSingle(c.summary)} This guide explains the practical differences between the routes — audience, structure, time commitment, end-point assessment — so you can choose the right one for your situation.',
  keyTakeaways: [
    'Three (or more) main routes exist — each with different audience, structure and end-point assessment.',
    'All compared pathways lead to a recognised Level 3 electrical qualification once complete.',
    'The right pathway depends on: your age, your employer relationship, your funding, and your career goal.',
    'JIB Approved Electrician grade and ECS Gold Card are available via any of these routes once the qualification is complete.',
    'AM2 (or the equivalent end-point assessment) is the recognised practical capstone — most pathways now include it.',
    'Use the comparison below to identify the route that best matches your circumstances, then read the matching unit revision pages on Elec-Mate to plan your study.',
  ],
  sections: [
${itemSections}
    {
      id: 'how-to-choose',
      heading: 'How to Choose Between These Pathways',
      tocLabel: 'How to choose',
      blocks: [
        {
          type: 'paragraph',
          text: 'Three questions decide most pathway choices:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Do you have an employer offering an apprenticeship? If yes → Apprenticeship Standard route is almost always the right answer.',
            'Are you over 25 / a career-changer? NVQ-based pathways or short Domestic Installer routes are usually more accessible.',
            'Do you want full industry recognition? Full Level 3 + AM2 is the only route that gives you JIB Approved Electrician grade and unrestricted scheme membership.',
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'Are these qualifications equivalent?',
      answer: 'All compared Level 3 routes lead to recognised electrical qualifications. The end-point and on-the-job evidence may differ, but the JIB / ECS recognition once complete is essentially equivalent. Domestic Installer is a separate, narrower qualification — not equivalent to full Level 3.',
    },
    {
      question: 'Can I switch pathways mid-apprenticeship?',
      answer: 'Possible but uncommon. Most training providers deliver one awarding body / pathway per cohort. If you need to switch, look into APL (Accredited Prior Learning) — some completed units may transfer to the new pathway.',
    },
    {
      question: 'Which pathway is most respected by employers?',
      answer: 'For most UK electrical employers, the Apprenticeship Standard 5357 (with AM2) is now the default expectation for new starters. NVQ 2357 + AM2 is equally respected for adult learners. Domestic Installer alone is recognised for self-employed domestic work but is not equivalent to full Level 3.',
    },
    {
      question: 'How long does each pathway take?',
      answer: 'Full Level 3 apprenticeship (5357 / 2365): 3-4 years. NVQ 2357 (typically while working): 2-3 years for adult learners. T Level (8202): 2 years. Domestic Installer (Part P): 4-12 weeks intensive plus 6-12 months scheme registration period.',
    },
    {
      question: 'What if I am over 25 — can I still apprentice?',
      answer: 'Yes. Apprenticeship funding rules changed: employers receive smaller subsidies for 25+ apprentices but apprenticeships are not age-restricted. Many adult learners take the NVQ 2357 route or self-fund Level 3 + AM2.',
    },
    {
      question: 'Will the Elec-Mate revision content work for all these pathways?',
      answer: 'Yes — Elec-Mate covers every major UK electrical qualification with unit-by-unit revision content. Specify your qualification on signup and we tailor the dashboard to your specific units.',
    },
  ],
  howToHeading: 'Five Steps to Choose the Right Pathway',
  howToDescription:
    'Use this checklist to commit to a pathway with confidence.',
  howToSteps: [
    { name: 'Speak to two or three local employers', text: 'Ask which qualification they typically hire from. This tells you what is normal in your area.' },
    { name: 'Speak to two or three local training providers', text: 'Ask which awarding body they deliver and whether they have current apprenticeship vacancies.' },
    { name: 'Match your funding situation to the pathway', text: 'Apprenticeship Standard = government-funded for under-25s. NVQ = self-funded or employer-funded. T Level = college-funded.' },
    { name: 'Check the end-point assessment is one you can commit to', text: 'AM2 is intense but recognised. NVQ portfolio is slower but more flexible. Match to your learning style.' },
    { name: 'Sign up for Elec-Mate apprentice tier and select your qualification', text: 'The dashboard tailors revision content + OJT tracking to your specific units. 7-day free trial.' },
  ],
  relatedPages: [
    { href: '/guides/electrical-apprentice-year-1-revision-plan', title: 'Year 1 Revision Plan', description: 'First-year apprentice study plan across pathways.', icon: 'GraduationCap', category: 'Guide' },
    { href: '/guides/am2-exam-tips', title: 'AM2 Exam Tips', description: 'End-point assessment preparation.', icon: 'GraduationCap', category: 'Guide' },
    { href: '/guides/apprentice-electrician-salary', title: 'Apprentice Electrician Salary', description: 'What you earn at each year of an apprenticeship.', icon: 'PoundSterling', category: 'Guide' },
    { href: '/guides/off-the-job-training-hours', title: 'Off-The-Job Training Hours', description: 'How OTJ hours are logged and what counts.', icon: 'ClipboardCheck', category: 'Guide' },
    { href: '/guides/ecs-gold-card-requirements', title: 'ECS / JIB Gold Card', description: 'Next step after passing the qualification.', icon: 'ShieldCheck', category: 'Guide' },
    { href: '/guides/bs-7671-18th-edition-guide', title: 'BS 7671 18th Edition Guide', description: 'Your single reference book through every pathway.', icon: 'BookOpen', category: 'Guide' },
  ],
  ctaHeading: 'Track Your Pathway With Elec-Mate',
  ctaSubheading:
    'Join 1,000+ UK apprentices using Elec-Mate to revise units, log OJT hours, and prepare for the AM2 — whichever pathway you are on. 7-day free trial.',
};
`;
}

function wrapperFor(c) {
  const ident = `${pascalCase(c.slug)}Config`;
  const pname = `${pascalCase(c.slug)}Page`;
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
for (const c of COMPARISONS) {
  const ident = `${pascalCase(c.slug)}Config`;
  const pname = `${pascalCase(c.slug)}Page`;
  const configFile = join(GEN_DIR, `${ident}.ts`);
  const wrapperFile = join(SEO_DIR, `${pname}.tsx`);
  if (!FORCE && existsSync(configFile)) { skipped++; continue; }
  writeFileSync(configFile, configFor(c));
  writeFileSync(wrapperFile, wrapperFor(c));
  generated++;
  indexEntries.push({ pname, slug: `/guides/${c.slug}` });
}

const lazyLines = indexEntries.map((e) => `const ${e.pname} = lazy(() => import('@/pages/seo/${e.pname}'));`).join('\n');
const routeLines = indexEntries.map((e) => `      <Route path="${e.slug}" element={<LazyRoute><${e.pname} /></LazyRoute>} />`).join('\n');
writeFileSync(join(ROOT, 'reports/programmatic-routes-comparisons.txt'), `// Lazy:\n${lazyLines}\n\n// Routes:\n${routeLines}\n`);
console.log(`Generated ${generated} comparison pages, skipped ${skipped}.`);
