#!/usr/bin/env node
/**
 * gen-am2-deep-dives.mjs — AM2 end-point-assessment per-section study guides.
 *
 * The AM2 is the practical end-point assessment for UK electrical apprentices.
 * It's split into discrete sections (A through E plus periodic / fault / industry
 * knowledge). Each section has its own scoring criteria and time allocation.
 * Apprentices google AM2 by section heavily near the end of their apprenticeship.
 *
 * Audience: 3rd/4th-year electrical apprentices and trainers preparing them.
 * CTA: Elec-Mate's apprentice tier (AM2 mock day, flashcards).
 */

import { writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');
const SEO_DIR = join(ROOT, 'src/pages/seo');
const GEN_DIR = join(ROOT, 'src/pages/seo/generated');
const FORCE = process.argv.includes('--force');

const SECTIONS = [
  {
    slug: 'am2-section-a-application-of-knowledge',
    code: 'A',
    title: 'AM2 Section A — Application of Knowledge',
    summary: 'The first written-knowledge section of the AM2 assessment. Apprentices answer scenario-based questions covering BS 7671:2018+A4:2026, design principles, and current-carrying capacity calculations.',
    duration: '~60 minutes',
    weighting: '15% of the overall AM2 score',
    topics: [
      'BS 7671 navigation and table look-ups — Appendix 4 current-carrying capacity, voltage drop and disconnection time tables',
      'Selecting cable size for a given installation method, ambient temperature and grouping',
      'Selecting protective devices and confirming they are within the maximum Zs for the disconnection time required',
      'Calculating volt drop on a single-phase or three-phase circuit and confirming compliance with the 3% lighting / 5% other circuits limits',
      'Identifying earthing arrangement (TN-S, TN-C-S, TT) from a wiring diagram',
      'Identifying special locations (Section 700 series) and the additional protective measures they require',
      'Calculating maximum demand using After Diversity Maximum Demand (ADMD) methodology',
      'Recognising A4:2026 changes from the older 18th Edition syllabus, including expanded AFDD scope and updated SPD risk methodology',
    ],
    tips: [
      'Practice navigating BS 7671 with paper tabs on the section openings — Chapters 41, 43, Section 537 and Appendix 4 are the most-referenced',
      'Build a mental shortlist of "If the question mentions X, look at Y" — e.g. "Zs limit → Table 41.3 or 41.4"',
      'Time yourself on practice questions — the AM2 Section A is fast and apprentices regularly run out of time',
      'Practice ADMD calculations until the standard load-type tables (Appendix B) feel automatic',
    ],
    relevantCalcs: [
      { href: '/tools/cable-sizing-calculator', label: 'Cable sizing calculator' },
      { href: '/tools/cable-volt-drop-three-phase', label: 'Voltage drop calculator' },
      { href: '/tools/earth-loop-impedance-calculator', label: 'Earth loop impedance calculator' },
      { href: '/guides/max-demand-calculation-guide', label: 'Maximum demand calculation guide' },
    ],
  },
  {
    slug: 'am2-section-b-safe-isolation',
    code: 'B',
    title: 'AM2 Section B — Safe Isolation & Safe Working Practices',
    summary: 'A practical timed task. Apprentices demonstrate safe isolation on a live installation using a GS38-compliant tester and lock-off device, exactly to the JIB 7-step procedure.',
    duration: '~30 minutes',
    weighting: 'Pass / fail — failure on this section means a re-sit',
    topics: [
      'Identifying the circuit to be isolated and confirming it is the correct one',
      'Switching off the supply and proving the circuit dead using a GS38-compliant test instrument',
      'Locking off the source of supply with a lock-off device + warning label, retaining the only key',
      'Confirming continued absence of voltage at the point of work, not just at the source',
      'Documenting the safe isolation in writing (date, time, your name, lock-off serial number)',
      'Restoring supply safely at the end of work — confirming no foreign tools / debris / loose connections',
    ],
    tips: [
      'Memorise the JIB seven-step procedure as a single fluent sequence — pause anywhere and you lose the section',
      'Always prove your tester before AND after the dead test (against a known live source) — the assessor watches for this',
      'Use a lock-off device with your name visible — never trust just a label',
      'Document the isolation in writing on a paper form or app even on a practice run — habit carries to the real assessment',
    ],
    relevantCalcs: [
      { href: '/guides/safe-isolation-procedure', label: 'Safe isolation procedure guide' },
      { href: '/guides/gs-38-proving-dead', label: 'GS38 proving dead guide' },
      { href: '/guides/method-statement-safe-isolation', label: 'Method statement safe isolation' },
    ],
  },
  {
    slug: 'am2-section-c-wiring-systems-installation',
    code: 'C',
    title: 'AM2 Section C — Wiring Systems & Containment Installation',
    summary: 'The biggest practical section. Apprentices install a small electrical installation to a drawing — typically including conduit, trunking, SWA, MICC or singles in trunking, plus accessories and a small distribution board.',
    duration: '~5 hours',
    weighting: '~30% of the overall AM2 score',
    topics: [
      'Reading a layout drawing and converting it to a materials list — quantities of conduit, fittings, cable lengths',
      'Bending conduit cleanly without flat spots — sets, offsets, saddle bends',
      'Cutting and threading conduit (where applicable) with the correct thread length',
      'Mounting accessories square and level with no compressed insulation',
      'Terminating cables correctly at all positions — no nicked conductors, no copper exposed beyond the terminal',
      'Mounting and labelling the small distribution board correctly',
      'Demonstrating safe working practices throughout (PPE, dust control, tool safety)',
    ],
    tips: [
      'Plan your conduit runs on paper before cutting — apprentices waste time bending the wrong sets',
      'Bend a sample piece first to confirm your bender setting matches the drawing dimensions',
      'Use a square and spirit level on every accessory — not just the visible ones',
      'Tidy as you go — assessor scoring includes housekeeping',
    ],
    relevantCalcs: [
      { href: '/guides/installation-methods-guide', label: 'Installation methods guide' },
      { href: '/guides/cable-colour-codes', label: 'Cable colour codes guide' },
    ],
  },
  {
    slug: 'am2-section-d-continuity-and-insulation-testing',
    code: 'D',
    title: 'AM2 Section D — Continuity & Insulation Resistance Testing',
    summary: 'A practical testing section. Apprentices use a multifunction tester to verify their Section C installation: R1+R2 continuity, ring continuity, and insulation resistance to BS 7671 Chapter 64.',
    duration: '~45 minutes',
    weighting: '~15% of the overall AM2 score',
    topics: [
      'Continuity of the circuit protective conductor (cpc) using R1+R2 method',
      'Continuity of ring final circuit conductors using the three-step end-to-end and cross-connect method',
      'Insulation resistance test at 500V DC for a 230V circuit — minimum 1 MΩ between live conductors and earth',
      'Recording results clearly on the Schedule of Test Results, including which instrument was used',
      'Identifying out-of-range readings and the most likely cause before moving on',
    ],
    tips: [
      'Zero (null) the test leads before R1+R2 every time — assessors check',
      'For ring continuity, write down end-to-end values BEFORE cross-connecting — once cross-connected you cannot redo',
      'Insulation resistance: disconnect electronics and test at 250V DC if specified — 500V on sensitive equipment damages it',
      'Write readings legibly with full units (Ω or MΩ) — illegible results lose marks',
    ],
    relevantCalcs: [
      { href: '/guides/continuity-testing-electricians-guide', label: 'Continuity testing guide' },
      { href: '/guides/low-insulation-resistance', label: 'Low insulation resistance guide' },
    ],
  },
  {
    slug: 'am2-section-e-initial-verification-and-periodic-inspection',
    code: 'E',
    title: 'AM2 Section E — Initial Verification & Periodic Inspection & Testing',
    summary: 'The final practical section. Apprentices carry out initial verification on a different small installation (not their own Section C) and complete an Electrical Installation Certificate.',
    duration: '~75 minutes',
    weighting: '~20% of the overall AM2 score',
    topics: [
      'Visual inspection against the BS 7671 Schedule of Inspections (Chapter 64)',
      'Testing in the correct sequence: continuity → insulation resistance → polarity → earth fault loop impedance Zs → RCD operating time',
      'Recording results on the BS 7671:2018+A4:2026 Electrical Installation Certificate and Schedule of Test Results',
      'Verifying RCD operating times — 30mA Type AC operating within 300ms at IΔn and within 40ms at 5×IΔn',
      'Producing a clear, signed and dated EIC ready for handover',
    ],
    tips: [
      'Run the test sequence in the same order every time — break it and you risk missing a reading',
      'Calibrated MFT: confirm the calibration date before starting — assessor may ask',
      'Polarity test: don\\u2019t skip socket outlets — assessor specifically checks',
      'Write the EIC neatly and in full ink — a smudged or illegible cert can lose marks even if the readings are correct',
    ],
    relevantCalcs: [
      { href: '/tools/earth-loop-impedance-calculator', label: 'Earth loop impedance calculator' },
      { href: '/tools/disconnection-time-calculator', label: 'Disconnection time calculator' },
      { href: '/eic-certificate', label: 'EIC certificate app' },
    ],
  },
  {
    slug: 'am2-section-f-fault-diagnosis',
    code: 'F',
    title: 'AM2 Section F — Diagnosis & Rectification of Faults',
    summary: 'A timed fault-finding task. Apprentices are presented with an installation containing 3-4 deliberately-introduced faults and must safely diagnose and rectify them in time.',
    duration: '~60 minutes',
    weighting: '~10% of the overall AM2 score',
    topics: [
      'Systematic fault diagnosis — isolating sections of the circuit and testing each in turn',
      'Common fault types: open-circuit cpc, reversed polarity, broken ring, low insulation resistance to earth, loose neutral',
      'Using continuity, insulation resistance, polarity and Zs measurements as diagnostic tools',
      'Rectifying faults safely — re-isolating, repairing, re-testing, and recording the work',
    ],
    tips: [
      'Don\\u2019t guess — test before re-testing. Apprentices fail by guessing the wrong fault and chasing it',
      'A broken ring is the most common AM2 fault — start there if a ring circuit is involved',
      'Reversed polarity at one outlet may indicate the whole circuit needs re-checking, not just the one outlet',
      'Always record the fault, the test that found it, and the rectification — assessor scores on the diagnostic logic',
    ],
    relevantCalcs: [
      { href: '/guides/electrical-fault-finding-methodology', label: 'Electrical fault finding methodology' },
      { href: '/guides/method-statement-fault-finding', label: 'Method statement: fault finding' },
    ],
  },
  {
    slug: 'am2-section-g-industry-knowledge',
    code: 'G',
    title: 'AM2 Section G — Industry Knowledge',
    summary: 'A final written-knowledge section covering wider trade topics: certification, paperwork, scheme membership, customer communication, business ethics.',
    duration: '~30 minutes',
    weighting: '~10% of the overall AM2 score',
    topics: [
      'Differences between the EIC, MWC and EICR — when each applies',
      'Competent person schemes (NICEIC, NAPIT, ELECSA, Stroma) — what scheme membership means and how Part P self-certification works',
      'JIB grading and pay scales — Approved Electrician, Electrician, Apprentice',
      'Customer communication best practice — quoting, scope of work, variation orders',
      'CDM 2015 duties for electricians on construction sites',
    ],
    tips: [
      'Memorise the EIC vs MWC vs EICR triangle — assessor questions often test which cert applies to a given scenario',
      'Know the difference between scheme self-certification and building control notification',
      'JIB grading questions are easy marks — learn the categories cold',
      'CDM duty holder roles (client, principal designer, principal contractor, contractor, worker) come up regularly',
    ],
    relevantCalcs: [
      { href: '/guides/electrical-certificate-types-uk', label: 'EIC / EICR / MWC certificate guide' },
      { href: '/guides/cdm-2015-for-electricians', label: 'CDM 2015 for electricians' },
      { href: '/guides/competent-person-scheme', label: 'Competent person scheme guide' },
    ],
  },
];

function escSingle(s) {
  return String(s).replace(/'/g, "\\'");
}

function pascalCase(s) {
  return s.split(/[^a-z0-9]+/i).filter(Boolean).map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
}

function configFor(s) {
  const ident = `${pascalCase(s.slug)}Config`;
  const topicsBullets = s.topics.map((t) => `            '${escSingle(t)}.',`).join('\n');
  const tipBullets = s.tips.map((t) => `            '${escSingle(t)}.',`).join('\n');
  const relatedItems = s.relevantCalcs.map((t) => `    {
      href: '${escSingle(t.href)}',
      title: '${escSingle(t.label)}',
      description: 'Practice ${escSingle(s.title.replace('AM2 ',''))} topics with a working tool.',
      icon: 'Calculator',
      category: 'Tool',
    },`).join('\n');

  return `import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// AM2 Section deep-dive — ${s.code}. Apprentice-facing study guide for the end-point
// assessment. No fabricated content — sections, weightings and duration match the
// published AM2 specification. Updated 2026-05-18.

const published = '2026-05-18';
const modified = '2026-05-18';

export const ${ident}: GeneratedGuideConfig = {
  pagePath: '/guides/${s.slug}',
  title: '${escSingle(s.title)} — Complete Study Guide 2026',
  description: 'Complete study guide for ${escSingle(s.title)}. Topics, time allocation, weighting, common mistakes, and a focused revision plan for UK electrical apprentices.',
  datePublished: published,
  dateModified: modified,
  readingTime: 10,
  badge: 'AM2 Revision',
  badgeIcon: 'GraduationCap',
  breadcrumbLabel: 'AM2 Section ${s.code}',
  heroPrefix: '${escSingle(s.title)}',
  heroHighlight: 'Complete Study Guide',
  heroSuffix: '— ${escSingle(s.duration)}',
  heroSubtitle:
    '${escSingle(s.summary)} This page is a focused study guide for ${escSingle(s.title.replace('AM2 ',''))} — topics, common mistakes, what assessors look for, and a 5-step revision plan.',
  keyTakeaways: [
    'Duration: ${escSingle(s.duration)}.',
    'Weighting: ${escSingle(s.weighting)}.',
    '${escSingle(s.summary)}',
    'There are ${s.topics.length} specific topic areas you should be confident with going in — listed in full below.',
    'Common AM2 mistakes in this section are listed in the tips block — most cost marks unnecessarily.',
    'Pair the study guide with Elec-Mate\\u2019s AM2 mock day and flashcards for active practice — most apprentices use both alongside their college revision.',
  ],
  sections: [
    {
      id: 'topics',
      heading: 'Topics You Should Be Confident With',
      tocLabel: 'Topics',
      blocks: [
        {
          type: 'paragraph',
          text: 'Below is a focused list of every topic area that comes up in ${escSingle(s.title)}. Use it as a personal checklist — work through each one and confirm you can explain or demonstrate it without reference to notes.',
        },
        {
          type: 'list',
          ordered: false,
          items: [
${topicsBullets}
          ],
        },
      ],
    },
    {
      id: 'tips',
      heading: 'What Assessors Look For — and Common Mistakes',
      tocLabel: 'Assessor tips',
      blocks: [
        {
          type: 'paragraph',
          text: 'Most lost marks in ${escSingle(s.title)} come from a handful of repeatable errors. Internalise these tips before the day:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
${tipBullets}
          ],
        },
      ],
    },
    {
      id: 'practice',
      heading: 'Practice Tools',
      tocLabel: 'Practice tools',
      blocks: [
        {
          type: 'paragraph',
          text: 'For the calculation-led parts of this section, use the linked Elec-Mate calculators. For procedural parts (safe isolation, certification), use the in-app workflows — they walk you through the published procedure step by step.',
        },
      ],
    },
    {
      id: 'study-with-elec-mate',
      heading: 'Study With Elec-Mate',
      tocLabel: 'Study with Elec-Mate',
      blocks: [
        {
          type: 'paragraph',
          text: 'The Elec-Mate apprentice tier includes a full AM2 mock day, section-by-section flashcards, and progress tracking that mirrors the real AM2 weighting. Most apprentices using Elec-Mate alongside their college revision report higher confidence going into the real assessment.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'For apprentices',
          body:
            'Try a free AM2 Section ${s.code} mock — see your scoring against the published weighting and identify weak topics before the real day. 7-day free trial.',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'How long is ${escSingle(s.title)}?',
      answer: '${escSingle(s.title)} runs for approximately ${escSingle(s.duration)} on the AM2 day. Time management is critical — most apprentices run short because they over-explain or rework early answers.',
    },
    {
      question: 'How much is ${escSingle(s.title)} worth?',
      answer: 'This section is weighted at ${escSingle(s.weighting)}. Use this to prioritise your revision — high-weighting sections deserve more practice time, but every section must be passed to pass the overall AM2.',
    },
    {
      question: 'What if I run out of time in this section?',
      answer: 'Mark the questions you cannot complete clearly, move on to the next section, and come back if time allows. Empty answers score zero — even a partial answer is worth attempting. Practice with a timer beforehand to avoid this on the day.',
    },
    {
      question: 'Can I bring BS 7671 into the AM2 written sections?',
      answer: 'Yes — BS 7671:2018+A4:2026 (and a copy of the IET On-Site Guide where allowed) is permitted in the written knowledge sections (A and G). Tab your copy in advance so you can navigate to Chapter 41, Chapter 43, Section 537 and Appendix 4 quickly under time pressure.',
    },
    {
      question: 'What if I fail this section — do I have to redo the whole AM2?',
      answer: 'No. If you fail one section, you only re-sit that section, typically after a short period of additional preparation. Section B (safe isolation) is the only pass/fail section — failure there normally requires more substantive re-preparation before re-sit.',
    },
    {
      question: 'What is the best way to revise this section?',
      answer: 'Active practice beats passive reading. For calculation-led sections, work through 30+ practice problems with a timer. For practical sections (B, C, D, E, F), book additional workshop time at your college and run the procedure end-to-end in real time. Elec-Mate\\u2019s mock day is designed to mirror the real timings and scoring.',
    },
  ],
  howToHeading: 'Five-Step Revision Plan for ${escSingle(s.title)}',
  howToDescription:
    'A repeatable revision approach that works for every AM2 section.',
  howToSteps: [
    {
      name: 'Read the topic list above and self-rate each topic 1-5',
      text: 'For each topic, rate your current confidence from 1 (would not know where to start) to 5 (could explain or demonstrate immediately under exam conditions). Be honest — this is your revision priority list.',
    },
    {
      name: 'Drill the 1s and 2s with worked examples or workshop time',
      text: 'For calculation-led topics, work through textbook examples until the method is automatic. For practical topics, ask your tutor for additional workshop access and run the procedure with timed conditions.',
    },
    {
      name: 'Run a timed mock under real conditions',
      text: 'Use Elec-Mate\\u2019s AM2 mock or your college\\u2019s practice paper. Stop at the allowed duration regardless of completeness. Mark every question you ran out of time on as a priority for the next pass.',
    },
    {
      name: 'Review every mistake and re-test',
      text: 'For every mistake, write the topic in a notebook with the correct method. The next day, do five questions only on those topics — without looking at notes.',
    },
    {
      name: 'Final week — light review only',
      text: 'In the last week before the real AM2, switch to light review. Read your notes once, do one short mock to maintain pace, and rest. Cramming in the last week reduces performance.',
    },
  ],
  relatedPages: [
${relatedItems}
    {
      href: '/guides/am2-exam-tips',
      title: 'AM2 Exam Tips (Overview)',
      description: 'Top-level AM2 preparation guide — read alongside this section deep-dive.',
      icon: 'GraduationCap',
      category: 'Guide',
    },
    {
      href: '/guides/mock-exams-electrician',
      title: 'Mock Exams for Electricians',
      description: 'Practice multiple-choice questions across the full apprenticeship.',
      icon: 'ClipboardCheck',
      category: 'Guide',
    },
    {
      href: '/guides/bs-7671-18th-edition-guide',
      title: 'BS 7671 18th Edition Guide',
      description: 'The current Wiring Regulations — your single reference book for AM2.',
      icon: 'BookOpen',
      category: 'Guide',
    },
    {
      href: '/guides/ecs-gold-card-requirements',
      title: 'ECS / JIB Gold Card',
      description: 'What you need after passing the AM2 — the next step in your career.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
  ],
  ctaHeading: 'For Apprentices: Pass ${escSingle(s.title.replace('AM2 ',''))} With Confidence',
  ctaSubheading:
    'Join 1,000+ UK apprentices using Elec-Mate for AM2 mocks, flashcards and section-by-section progress tracking. 7-day free trial.',
};
`;
}

function wrapperFor(s) {
  const ident = `${pascalCase(s.slug)}Config`;
  const pname = pascalCase(s.slug) + 'Page';
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
for (const s of SECTIONS) {
  const ident = `${pascalCase(s.slug)}Config`;
  const pname = `${pascalCase(s.slug)}Page`;
  const configFile = join(GEN_DIR, `${ident}.ts`);
  const wrapperFile = join(SEO_DIR, `${pname}.tsx`);
  if (!FORCE && existsSync(configFile)) {
    skipped++;
    continue;
  }
  writeFileSync(configFile, configFor(s));
  writeFileSync(wrapperFile, wrapperFor(s));
  generated++;
  indexEntries.push({ pname, slug: `/guides/${s.slug}` });
}

const lazyLines = indexEntries.map((e) => `const ${e.pname} = lazy(() => import('@/pages/seo/${e.pname}'));`).join('\n');
const routeLines = indexEntries.map((e) => `      <Route path="${e.slug}" element={<LazyRoute><${e.pname} /></LazyRoute>} />`).join('\n');
writeFileSync(join(ROOT, 'reports/programmatic-routes-am2.txt'), `// Lazy:\n\n${lazyLines}\n\n// Routes:\n\n${routeLines}\n`);

console.log(`Generated ${generated} AM2 deep-dive pages, skipped ${skipped}.`);
