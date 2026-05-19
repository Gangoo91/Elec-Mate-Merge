import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// AM2 SEO page — content sourced from the in-app course at
// src/pages/apprentice-courses/AM2Module*Section*.tsx, grounded in the NET
// assessment specification. No invented timings, weightings or procedures.

const published = '2026-05-19';
const modified = '2026-05-19';

export const am2SectionDConfig: GeneratedGuideConfig = {
  pagePath: '/guides/am2-section-d-fault-diagnosis',
  title: 'AM2 Section D — Fault Diagnosis + Rectification (2 hours)',
  description:
    'AM2 Section D: 2 hours of systematic fault diagnosis and rectification. Typical NET faults (open circuits, shorts, polarity swaps, missing CPCs) + method assessors mark.',
  datePublished: published,
  dateModified: modified,
  readingTime: 10,
  badge: 'AM2 Section D',
  badgeIcon: 'GraduationCap',
  breadcrumbLabel: 'AM2 Section D',
  heroPrefix: 'AM2 Section D:',
  heroHighlight: 'AM2 Section D — Fault Diagnosis + Rectification',
  heroSuffix: '— 2 hours — systematic method',
  heroSubtitle:
    'Section D is fault diagnosis and rectification. 2 hours to find and fix the faults NET has built into the rig. The assessor watches your METHOD as much as your result — a candidate who logically isolates the fault scores higher than one who guesses correctly. Random poking is a fail signal.',
  keyTakeaways: [
    'Section D is 2 hours covering systematic fault diagnosis + rectification.',
    'NET typically builds in: open circuits, short circuits, polarity swaps, missing CPCs (protective conductors), high-resistance connections.',
    'Assessors mark your METHOD, not just whether you find the fault. Logical sequence + reasoning is graded.',
    'Open circuit symptom: circuit completely dead, no power at all to the load.',
    'Short circuit symptom: very low or zero insulation resistance between the affected conductors.',
    'High-resistance connection symptom: continuity test shows higher than expected resistance.',
    'Rectification must be safe + verified — re-test after the fix to confirm the circuit is now compliant.',
  ],
  sections: [
    {
      id: 'what-section-d-covers',
      heading: 'What Section D covers',
      tocLabel: 'What Section D covers',
      blocks: [
        {
          type: 'paragraph',
          text: 'Section D is fault diagnosis and rectification on a pre-built rig with deliberate faults set by the assessor. You have 2 hours to find, rectify, and verify each fault. The faults vary by sitting but follow common patterns — open circuits, shorts, polarity swaps, missing CPCs, high-resistance connections. The assessor is grading your method: a logical, repeatable diagnostic sequence scores higher than guessing, even if you arrive at the same answer.',
        },
      ],
    },
    {
      id: 'typical-faults',
      heading: 'Typical AM2 faults NET builds in',
      tocLabel: 'Typical AM2 faults NET build…',
      blocks: [
        {
          type: 'list',
          ordered: false,
          items: [
            'Open circuit — broken conductor, loose connection, blown internal fuse. Symptom: dead circuit, no power.',
            'Short circuit — conductors touching, damaged insulation, wrong wiring. Symptom: very low IR (close to zero).',
            'Polarity swap — L and N transposed somewhere in the circuit. Symptom: appliances may work, but live/neutral reversed at the accessory.',
            'Missing CPC — protective conductor not terminated or broken. Symptom: high or infinite continuity reading on R1+R2 test.',
            'High-resistance connection — loose terminal, oxidised joint, badly stripped conductor. Symptom: continuity test reads higher than expected.',
          ],
        },
      ],
    },
    {
      id: 'logical-method',
      heading: 'The logical fault-finding method assessors expect',
      tocLabel: 'The logical fault-finding me…',
      blocks: [
        {
          type: 'list',
          ordered: false,
          items: [
            'Read the symptom — confirm what the user reports + what the test indicates.',
            'Form a hypothesis — what type of fault could produce this symptom?',
            'Narrow the location — half-split the circuit, test at the midpoint, identify which half contains the fault.',
            'Test the hypothesis — apply the specific test that confirms or rules out your fault type.',
            'Identify the precise fault location — accessory, terminal, conductor.',
            'Plan the rectification — safe isolation, parts needed, time required.',
            'Rectify safely — make the repair with the circuit isolated and locked off.',
            'Verify — re-test the affected circuit after the fix. The fault must be cleared AND the original test values must now be within BS 7671 limits.',
          ],
        },
      ],
    },
    {
      id: 'common-mistakes',
      heading: 'Common Section D mistakes',
      tocLabel: 'Common Section D mistakes',
      blocks: [
        {
          type: 'list',
          ordered: false,
          items: [
            'Random poking — checking accessories without a hypothesis. The assessor sees this as guessing.',
            'Forgetting to safely isolate before rectification.',
            'Not re-testing after the fix — assessor needs to see the verification.',
            'Misreading the symptom — assuming open circuit when it is actually high resistance.',
            'Using the wrong test instrument range or function for the fault type.',
            'Not documenting the fault + rectification on the test sheet.',
          ],
        },
      ],
    },
    {
      id: 'study-with-elec-mate',
      heading: 'Study with Elec-Mate',
      tocLabel: 'Study with Elec-Mate',
      blocks: [
        {
          type: 'paragraph',
          text: 'The Elec-Mate apprentice tier covers every AM2 section in detail — 8 modules across ~16.5 hours, 40+ pages of NET-grounded content, plus the AM2 Testing Simulator and Mock Day. Built specifically for UK NVQ Level 3 candidates preparing for the practical assessment.',
        },
        {
          type: 'callout',
          tone: 'info',
          heading: 'AM2 Mock Day — practice under real timings',
          body: 'The Elec-Mate AM2 Mock Day mirrors the real assessment phases with the actual NET timings. Times you on each phase and scores you against the readiness rubric — the closest practice you can get to the real day.',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'How long is Section D of the AM2?',
      answer:
        'Section D is 2 hours covering fault diagnosis and rectification on a pre-built rig. The number of faults varies but is typically 2-3 distinct faults of different types. The 2-hour budget includes diagnosis, safe isolation, rectification, and verification re-testing for each fault.',
    },
    {
      question: 'What faults does NET typically set in the AM2?',
      answer:
        'NET draws faults from a defined pool: open circuits (broken conductor or loose connection), short circuits (touching or damaged conductors), polarity swaps (L and N transposed), missing CPC (protective conductor not terminated), and high-resistance connections (loose or oxidised joints). Each fault type produces a distinctive symptom on the test instruments — the diagnostic skill is recognising the symptom and tracing back to the cause.',
    },
    {
      question: 'How do I identify an open circuit fault?',
      answer:
        'Symptom: the circuit is completely dead with no power reaching the load. Diagnosis: continuity test on the affected conductor reads infinity. Common locations: terminations at accessories (loose or unmade), conductor breaks inside the cable, blown internal fuses on protective devices. Trace systematically from the load back towards the supply.',
    },
    {
      question: 'How do I identify a high-resistance connection?',
      answer:
        'Symptom: appliance works but underperforms (motor runs slow, light dim), or testing shows higher than expected resistance on the continuity test. Diagnosis: compare your continuity reading against the calculated value for the cable length + size. A reading materially higher than expected suggests a loose, oxidised, or under-stripped connection somewhere in the circuit.',
    },
    {
      question: 'Why does method matter more than result in Section D?',
      answer:
        'Because the AM2 assesses your competence as a future qualified electrician — and on real jobs you will face faults you have never seen before. A logical, repeatable diagnostic method works on any fault. Guessing only works on faults you have memorised. The assessor wants to see you can apply the method to unfamiliar problems, which is why they grade the process not just the outcome.',
    },
  ],
  faqHeading: 'AM2 Section D — FAQ',
  relatedPages: [
    {
      href: '/guides/am2-overview-and-structure',
      title: 'AM2 Assessment Structure',
      description: 'What AM2 is, the 6 sections, marking criteria + common fail patterns.',
      icon: 'GraduationCap',
      category: 'AM2',
    },
    {
      href: '/guides/am2-section-a-composite-installation',
      title: 'AM2 Section A — Composite Installation (8.5h)',
      description: 'The longest section: cable, containment, terminations, time management.',
      icon: 'Wrench',
      category: 'AM2',
    },
    {
      href: '/guides/am2-section-b-inspection-testing-certification',
      title: 'AM2 Section B — Inspection + Testing (3.5h)',
      description: 'GN3 dead-then-live sequence + EIC certification.',
      icon: 'ClipboardCheck',
      category: 'AM2',
    },
    {
      href: '/guides/am2-section-c-safe-isolation',
      title: 'AM2 Section C — Safe Isolation (45 min)',
      description: '10-step procedure + 10-point test sequence + six critical fails.',
      icon: 'Lock',
      category: 'AM2',
    },
  ],
};
