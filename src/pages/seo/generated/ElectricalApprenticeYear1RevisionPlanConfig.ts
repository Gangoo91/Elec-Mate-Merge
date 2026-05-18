import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Year-1 apprentice revision master plan. Links to specific unit revision pages
// for each pathway (2365, 5357, 5393, EAL) and the AM2 deep-dives where Year-1
// involves the end-point assessment.
// Updated 2026-05-18.

const published = '2026-05-18';
const modified = '2026-05-18';

export const ElectricalApprenticeYear1RevisionPlanConfig: GeneratedGuideConfig = {
  pagePath: '/guides/electrical-apprentice-year-1-revision-plan',
  title: 'Year 1 Electrical Apprentice Revision Plan — Complete 2026',
  description: 'A complete revision plan for first-year electrical apprentices in the UK. Covers the Level 2 foundation units, AM1 (where applicable)…',
  datePublished: published,
  dateModified: modified,
  readingTime: 11,
  badge: 'Year 1 Apprentice',
  badgeIcon: 'GraduationCap',
  breadcrumbLabel: 'Year 1 Revision Plan',
  heroPrefix: 'Year 1 Electrical Apprentice:',
  heroHighlight: 'Complete Revision Plan',
  heroSuffix: '— Units, Skills & Assessments',
  heroSubtitle:
    'A complete revision plan for first-year electrical apprentices in the UK. Covers the Level 2 foundation units, AM1 (where applicable), and the core knowledge you must lock in before progressing to second year. This page maps the year to specific Elec-Mate unit revision pages and tools, so you can prioritise what to study next.',
  keyTakeaways: [
    'Typical Year 1 qualifications: 2365-02 (City & Guilds), 5357 Level 2 (Apprenticeship Standard), EAL Level 2 (where offered).',
    'Assessment focus this year: Online multiple-choice exams (3-4 per unit), college bench observations, written short-answer papers.',
    'Year 1 core unit areas cover 5 main themes — listed in full below.',
    'Year 1 key practical skills cover 7 on-site / bench-based competencies.',
    'Year 1 progression depends on completing both college units AND on-site portfolio evidence (where NVQ-based).',
    'Use Elec-Mate\u2019s apprentice dashboard to track your progress against every Year 1 unit and the AM2 milestones.',
  ],
  sections: [
    {
      id: 'core-unit-areas',
      heading: 'Core Unit Areas Covered in Year 1',
      tocLabel: 'Core unit areas',
      blocks: [
        {
          type: 'paragraph',
          text: 'Year 1 of a UK electrical apprenticeship typically covers these main unit areas. Exact unit titles vary by awarding body and qualification — use the linked unit revision pages for the specific qualification you are on.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Health and safety in building services engineering.',
            'Principles of Electrical Science (Level 2).',
            'Electrical installations technology.',
            'Installation of wiring systems and enclosures.',
            'Communication in building services engineering.',
          ],
        },
      ],
    },
    {
      id: 'key-skills',
      heading: 'Key Practical Skills for Year 1',
      tocLabel: 'Key skills',
      blocks: [
        {
          type: 'paragraph',
          text: 'These are the practical / calculation / certification skills you should be confident with by the end of Year 1. Build them on the college bench, on site, and through Elec-Mate\u2019s tools.',
        },
        {
          type: 'list',
          ordered: false,
          items: [
            'Safe isolation 7-step procedure.',
            'Basic circuit theory (Ohm\u2019s Law, series, parallel).',
            'Conduit bending and trunking installation.',
            'Hand and power tool safety.',
            'Reading scaled drawings.',
            'BS 7671 navigation — first pass.',
            'Cable identification and current ratings (Appendix 4 introduction).',
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
          text: 'Below is a typical Year 1 rhythm. Adjust to your specific college block schedule and on-site rotation.',
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
            'Month 12: Transition to next year — close off the current year\u2019s portfolio, review weak areas with your tutor, prepare for the next block.',
          ],
        },
      ],
    },
    {
      id: 'study-with-elec-mate',
      heading: 'Study Year 1 With Elec-Mate',
      tocLabel: 'Study with Elec-Mate',
      blocks: [
        {
          type: 'paragraph',
          text: 'The Elec-Mate apprentice tier is built specifically for UK electrical apprentices in Year 1. Unit-by-unit revision content, mock exams, flashcards, OJT tracking, and a tutor-shared dashboard so your college can see your progress in real time.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'For Year 1 apprentices',
          body:
            'Try the Year 1 dashboard free for 7 days. See your progress against every unit, every mock exam, and every AM2 section. Cancel anytime.',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'What units do you typically take in Year 1?',
      answer: 'Year 1 typically covers: Health and safety in building services engineering; Principles of Electrical Science (Level 2); Electrical installations technology; Installation of wiring systems and enclosures; Communication in building services engineering. The exact unit codes depend on your qualification — 2365-02 (City & Guilds), 5357 Level 2 (Apprenticeship Standard), EAL Level 2 (where offered).',
    },
    {
      question: 'How is Year 1 assessed?',
      answer: 'Year 1 assessment focus: Online multiple-choice exams (3-4 per unit), college bench observations, written short-answer papers. Most apprentices complete a combination of online multiple-choice exams, written short-answer papers, observed bench tasks and (in NVQ-based pathways) on-site portfolio evidence.',
    },
    {
      question: 'What if I fail a unit in Year 1?',
      answer: 'Most college pathways allow at least one re-sit per unit. Speak to your tutor immediately — early re-sits go better than late ones. Year 1 performance also affects your NVQ portfolio and progression, so do not let a failed unit drift.',
    },
    {
      question: 'How many hours per week should I revise in Year 1?',
      answer: 'A typical apprentice does 4-6 hours of focused revision per week during college blocks, plus the on-the-job training hours (typically 20% of working time = ~6-8 hours/week). Elec-Mate\u2019s OJT logger captures both.',
    },
    {
      question: 'What is the next step after Year 1?',
      answer: 'After Year 1, you progress to Year 2.',
    },
    {
      question: 'Can I switch awarding body mid-apprenticeship?',
      answer: 'Possible but uncommon — most colleges deliver one awarding body per cohort. If you switch (e.g. C&G to EAL) some units may map across via APL (Accredited Prior Learning); confirm with your training provider and awarding body before committing.',
    },
  ],
  howToHeading: 'A Five-Step Year 1 Revision Approach',
  howToDescription:
    'Use this approach every term to stay on top of Year 1.',
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
      text: 'Off-the-job training hours are a regulatory requirement for the apprenticeship — and the NVQ portfolio is where they are evidenced. Use Elec-Mate\u2019s OJT logger so your tutor and assessor have everything they need.',
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
      description: 'What you\u2019ll earn at each stage of the apprenticeship.',
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
  ctaHeading: 'For Year 1 Apprentices: Track Every Unit on Your Phone',
  ctaSubheading:
    'Join 1,000+ UK apprentices using Elec-Mate for unit revision, mock exams, OJT tracking and tutor-shared progress. 7-day free trial.',
};
