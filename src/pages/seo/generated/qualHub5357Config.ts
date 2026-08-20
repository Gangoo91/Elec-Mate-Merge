import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Qualification hub for City & Guilds 5357. Pillar page that lists every unit
// and links to its revision page. Apprentice-facing.
// Updated 2026-08-07 — fact pass: JIB grade on completion is Electrician, not
// Approved Electrician (SJIB Grading Definitions K6.3 requires two years as a
// graded Electrician first); Ofqual regulates the qualification, not IfATE;
// BS 7671 is "Requirements FOR Electrical Installations" and the current
// edition is 2018+A4:2026; unit list now actually links to the revision pages
// it promises; ECS related-page href fixed (route is ...-2026).

const published = '2026-05-18';
const modified = '2026-08-07';

export const qualHub5357Config: GeneratedGuideConfig = {
  pagePath: '/guides/5357-complete-guide',
  title: 'City & Guilds 5357: Level 3 Qualification',
  description: 'The complete 2026 guide to City & Guilds 5357 (Level 3 Electrotechnical Qualification (Apprenticeship Standard)).',
  datePublished: published,
  dateModified: modified,
  readingTime: 11,
  badge: 'Qualification Hub',
  badgeIcon: 'GraduationCap',
  breadcrumbLabel: 'City & Guilds 5357 Hub',
  heroPrefix: 'City & Guilds 5357:',
  heroHighlight: 'Level 3 Electrotechnical Qualification (Apprenticeship Standard)',
  heroSuffix: '— Complete 2026 Guide',
  heroSubtitle:
    'A complete guide to City & Guilds 5357 (Level 3 Electrotechnical Qualification (Apprenticeship Standard)). Designed for apprentices on the official Apprenticeship Standard (most new starters since 2018). This hub indexes every unit with a direct link to its revision page, plus structure, end-point, duration and funding — everything you need to plan your study.',
  answerBox: {
    question: 'What is City & Guilds 5357?',
    answer:
      'City & Guilds 5357 is the Level 3 electrotechnical qualification sat by apprentice electricians in England, Wales and Northern Ireland (Scotland runs an SVQ route through the SJIB). It takes 3-4 years alongside paid work, is built from 15 units totalling 340 topic points, and finishes with the AM2 end-point assessment. Pass it and you are graded a JIB Electrician.',
  },
  keyTakeaways: [
    'Level 3, awarded by City & Guilds and regulated by Ofqual. It sits inside the government-approved electrical apprenticeship — most new starters since 2018 are on this route.',
    'Typical duration: 3-4 years, in paid employment throughout.',
    '15 units covering 340 topic points. Every unit is linked to its revision page below.',
    'End-point assessment: the AM2. Every unit must be passed before you sit it.',
    'On completion you are graded a JIB Electrician and can hold an ECS Gold Card. Approved Electrician is a higher grade applied for later — the SJIB grading definitions require two years as a graded Electrician first.',
    'JIB national standard rate from 5 January 2026 (transport provided): £18.38/hour for an Electrician, £20.08 for an Approved Electrician.',
    'Funding in England: levy-paying employers pay from their levy account; smaller employers co-invest 5% with government paying 95%. The apprentice pays nothing towards training.',
  ],
  sections: [
    {
      id: 'overview',
      heading: 'Qualification Overview',
      tocLabel: 'Overview',
      blocks: [
        {
          type: 'paragraph',
          text: 'City & Guilds 5357 is a Level 3 qualification awarded by City & Guilds and regulated by Ofqual. It is the technical qualification inside the government-approved electrical apprenticeship, so it is what most new starters since 2018 are enrolled on. It typically runs 3-4 years while you are employed and paid.',
        },
        {
          type: 'paragraph',
          text: 'The qualification is built around 15 units. Each covers a distinct theme — health and safety, electrical science, installation, fault diagnosis, inspection and testing, design — and combines theory assessment with practical workshop observation. Below is every unit with a direct link to its full revision page.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Which edition of BS 7671 are you being assessed against?',
          body:
            'The Wiring Regulations unit is examined against the current edition, and that is now BS 7671:2018+A4:2026. Amendment 2 (2022) material — still the label on a lot of older course listings and revision notes — is out of date. Check with your centre which edition your paper is set from before you start revising.',
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
          text: 'Tap any unit to open its full revision page — every topic point, exam tips, a 5-step study plan, and the Elec-Mate practice tools mapped to that unit. The bracketed figure is the number of topic points you are examined on.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            '[Unit 022 — Understand the Requirements for Electrical Installations BS 7671](/guides/5357-unit-022-understand-the-requirements-of-electrical-installations-bs-7671-2018-2022-revision) (17 topic points).',
            '[Unit 101/001 — Understand Health, Safety and Environmental Considerations](/guides/5357-unit-101-001-understand-health-safety-and-environmental-considerations-revision) (26 topic points).',
            '[Unit 102 — Apply Health, Safety and Environmental Considerations](/guides/5357-unit-102-apply-health-safety-and-environmental-considerations-revision) (14 topic points).',
            '[Unit 103/003 — Electrical Scientific Principles and Technologies](/guides/5357-unit-103-003-electrical-scientific-principles-and-technologies-revision) (47 topic points).',
            '[Unit 104/004 — Understand Design and Installation Practices and Procedures](/guides/5357-unit-104-004-understand-design-and-installation-practices-and-procedures-revision) (45 topic points).',
            '[Unit 105/505 — Understand How to Plan and Oversee Electrical Work Activities](/guides/5357-unit-105-505-understand-how-to-plan-and-oversee-electrical-work-activities-revision) (17 topic points).',
            '[Unit 106 — Organise and Oversee the Electrical Work Environment](/guides/5357-unit-106-organise-and-oversee-the-electrical-work-environment-revision) (18 topic points).',
            '[Unit 107 — Understand Terminations and Connections of Conductors](/guides/5357-unit-107-understand-terminations-and-connections-of-conductors-revision) (7 topic points).',
            '[Unit 109 — Apply Design and Installation Practices and Procedures](/guides/5357-unit-109-apply-design-and-installation-practices-and-procedures-revision) (13 topic points).',
            '[Unit 110 — Apply Practices and Procedures for Maintenance](/guides/5357-unit-110-apply-practices-and-procedures-for-maintenance-revision) (22 topic points).',
            '[Unit 113 — Inspect, Test and Commission Electrical Systems](/guides/5357-unit-113-inspect-test-and-commission-electrical-systems-revision) (12 topic points).',
            '[Unit 114/014 — Understand Fault Diagnosis and Rectification](/guides/5357-unit-114-014-understand-fault-diagnosis-and-rectification-revision) (21 topic points).',
            '[Unit 115 — Apply Fault Diagnosis and Rectification](/guides/5357-unit-115-apply-fault-diagnosis-and-rectification-revision) (18 topic points).',
            '[Unit 118 — Termination and Connection of Conductors](/guides/5357-unit-118-termination-and-connection-of-conductors-revision) (7 topic points).',
            '[Unit 312/212 — Inspection, Testing and Commissioning](/guides/5357-unit-312-212-inspection-testing-and-commissioning-revision) (56 topic points).',
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
          text: 'Each unit carries its own assessment — typically a mix of online multiple-choice exams, written short-answer papers, and practical workshop tasks observed by your tutor or assessor. Those unit results are the gateway: every unit has to be passed before you go forward to the end-point.',
        },
        {
          type: 'paragraph',
          text: 'The end-point assessment is the AM2, and it is mandatory. It is a timed practical assessment sat away from your normal workplace, so it rewards speed and accuracy on things you have already done a hundred times on site — not last-minute theory cramming.',
        },
        {
          type: 'paragraph',
          text: 'Plan revision unit by unit using the linked pages above. Each gives you the topic checklist, the mistakes that cost marks, and a 5-step revision plan. For the end-point itself, start with the [AM2 exam tips guide](/guides/am2-exam-tips).',
        },
      ],
    },
    {
      id: 'what-it-leads-to',
      heading: 'What 5357 Leads To',
      tocLabel: 'What it leads to',
      blocks: [
        {
          type: 'paragraph',
          text: 'Passing every unit and the AM2 makes you a qualified electrician. In JIB terms that is the Electrician grade, evidenced by an ECS Gold Card. Approved Electrician is a separate, higher grade you apply for later — under the SJIB grading definitions it needs two years’ experience as a graded Electrician plus an advanced competence assessment before it is issued, so it is not something the qualification hands you on day one.',
        },
        {
          type: 'paragraph',
          text: 'These are the JIB national standard hourly rates that took effect on 5 January 2026, on the transport-provided column. Own-transport and shop-employed rates differ, and London has its own separate, higher table.',
        },
        {
          type: 'list',
          tone: 'pricing',
          items: [
            'Electrician (including Domestic Electrician) — £18.38 per hour.',
            'Approved Electrician — £20.08 per hour.',
            'Site/Installation Technician — £22.70 per hour.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Being qualified also opens the door to competent person scheme registration (NICEIC, NAPIT and others). That registration is what allows notifiable domestic work to be self-certified under Part P in England and Wales. Note that the registration is held by the business rather than by you personally, and the scheme assesses a nominated qualified supervisor. See the [ECS Gold Card requirements guide](/guides/ecs-gold-card-requirements-2026) for the application route.',
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
          text: 'Funding differs by nation. In England, an employer that pays the Apprenticeship Levy funds the training from its levy account. A smaller employer that does not pay the levy co-invests 5% of the cost with government paying the other 95%, and an employer with fewer than 50 staff pays nothing at all towards an apprentice aged 16 to 21. Either way, the apprentice pays nothing towards training. Scotland, Wales and Northern Ireland run their own apprenticeship funding systems.',
        },
        {
          type: 'paragraph',
          text: 'Rates, age bands and eligibility change with each funding year, so confirm the current position with your training provider before you enrol rather than relying on a figure you read online.',
        },
      ],
    },
    {
      id: 'study-with-elec-mate',
      heading: 'Study City & Guilds 5357 With Elec-Mate',
      tocLabel: 'Study with Elec-Mate',
      blocks: [
        {
          type: 'paragraph',
          text: 'The Elec-Mate apprentice tier covers every unit in City & Guilds 5357 with mock exams, flashcards, revision notes, and off-the-job training hour tracking. Tutors get a dashboard showing every apprentice’s progress in real time.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'For apprentices and adult learners',
          body:
            '7-day free trial of the Elec-Mate apprentice tier. Specify City & Guilds 5357 on signup and the dashboard tailors to your specific units.',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'How long does City & Guilds 5357 take?',
      answer: 'City & Guilds 5357 typically takes 3-4 years to complete. Time depends on whether you are full-time at college, part-time alongside on-the-job work, or an adult learner self-funding.',
    },
    {
      question: 'Who is City & Guilds 5357 for?',
      answer: 'City & Guilds 5357 is designed for apprentices on the official Apprenticeship Standard (most new starters since 2018) in England, Wales and Northern Ireland. Scotland runs an SVQ route through the SJIB instead. Confirm with your training provider that this is the right pathway for your situation before enrolling.',
    },
    {
      question: 'What is the end-point assessment?',
      answer: 'The end-point assessment is the AM2, and it is mandatory. It sits alongside each unit’s own assessment — every unit must be passed before you are put forward for it.',
    },
    {
      question: 'How much does City & Guilds 5357 cost?',
      answer: 'Apprentices pay nothing towards training. In England the employer either draws on its Apprenticeship Levy account or co-invests 5% with government paying 95%, and employers with fewer than 50 staff pay nothing for an apprentice aged 16 to 21. Adult learners funding themselves outside an apprenticeship pay commercial course fees that vary widely by provider — get a written quote covering registration, exam and re-sit fees before you commit.',
    },
    {
      question: 'What does City & Guilds 5357 qualify me to do?',
      answer: 'On completion you are graded a JIB Electrician and can hold an ECS Gold Card. That opens the door to competent person scheme registration (NICEIC, NAPIT and others), which is what allows notifiable domestic work to be self-certified under Part P in England and Wales — the registration is held by the business, not by you personally. Approved Electrician is a higher JIB grade you apply for after further experience, not something awarded on completion.',
    },
    {
      question: 'Which edition of BS 7671 does the Wiring Regulations unit cover?',
      answer: 'The current edition of the Wiring Regulations is BS 7671:2018+A4:2026 — BS 7671:2018 as amended by Amendment 1:2020, Amendment 2:2022, Amendment 3:2024 and Amendment 4:2026. Older revision material labelled 18th Edition, Amendment 2 or 2022 is out of date. Confirm with your centre which edition your paper is set from.',
    },
    {
      question: 'Can I revise for City & Guilds 5357 on my phone?',
      answer: 'Yes — Elec-Mate’s apprentice tier covers every City & Guilds 5357 unit with mobile-friendly revision content, mock exams, and flashcards. 7-day free trial.',
    },
  ],
  howToHeading: 'How to Get the Most Out of City & Guilds 5357',
  howToDescription:
    'Five steps to a confident pass on every unit and the end-point assessment.',
  howToSteps: [
    { name: 'Read every unit revision page above', text: 'Get familiar with the scope of every unit before you start the academic year. Knowing what is coming means no surprises.' },
    { name: 'Self-rate every topic 1-5 on each unit', text: 'For each unit’s topic checklist, rate yourself 1-5. The 1s and 2s become your revision priorities.' },
    { name: 'Build a weekly study habit', text: 'Aim for 4-6 hours of focused revision per week during college blocks. Short sessions on the way to site work well — use the flashcard mode.' },
    { name: 'Run mock exams a month before each unit assessment', text: 'Elec-Mate mocks mirror the real exam timings and weighting. Use them to find weak topics with enough time to re-revise.' },
    { name: 'Track off-the-job hours and portfolio evidence', text: 'Off-the-job training hours and portfolio evidence are regulatory requirements, and they are counted in hours rather than as a percentage you can eyeball. Use Elec-Mate’s logger so your tutor and assessor have everything they need.' },
  ],
  relatedPages: [
    { href: '/guides/electrical-apprentice-year-1-revision-plan', title: 'Year 1 Revision Plan', description: 'First-year apprentice study plan.', icon: 'GraduationCap', category: 'Guide' },
    { href: '/guides/electrical-apprentice-year-3-revision-plan', title: 'Year 3 Revision Plan', description: 'Inspection, testing, design, AM2 prep.', icon: 'GraduationCap', category: 'Guide' },
    { href: '/guides/am2-exam-tips', title: 'AM2 Exam Tips', description: 'End-point assessment preparation.', icon: 'GraduationCap', category: 'Guide' },
    { href: '/guides/mock-exams-electrician', title: 'Mock Exams for Electricians', description: 'Practice papers across the qualification.', icon: 'ClipboardCheck', category: 'Guide' },
    { href: '/guides/apprentice-electrician-salary', title: 'Apprentice Electrician Salary', description: 'What you earn at each year.', icon: 'PoundSterling', category: 'Guide' },
    { href: '/guides/ecs-gold-card-requirements-2026', title: 'ECS / JIB Gold Card', description: 'Next step after completing the qualification.', icon: 'ShieldCheck', category: 'Guide' },
  ],
  ctaHeading: 'Study City & Guilds 5357 With Confidence',
  ctaSubheading:
    'Unit revision, mock exams, off-the-job hour tracking and end-point assessment prep in one place. 7-day free trial.',
};
