import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// AM2 Section deep-dive — A. Apprentice-facing study guide for the end-point
// assessment. No fabricated content — sections, weightings and duration match the
// published AM2 specification. Updated 2026-05-18.

const published = '2026-05-18';
const modified = '2026-05-18';

export const Am2SectionAApplicationOfKnowledgeConfig: GeneratedGuideConfig = {
  pagePath: '/guides/am2-section-a-application-of-knowledge',
  title: 'AM2 Section A — Application of Knowledge — Complete Study',
  description: 'Complete study guide for AM2 Section A — Application of Knowledge. Topics, time allocation, weighting, common mistakes…',
  datePublished: published,
  dateModified: modified,
  readingTime: 10,
  badge: 'AM2 Revision',
  badgeIcon: 'GraduationCap',
  breadcrumbLabel: 'AM2 Section A',
  heroPrefix: 'AM2 Section A — Application of Knowledge',
  heroHighlight: 'Complete Study Guide',
  heroSuffix: '— ~60 minutes',
  heroSubtitle:
    'The first written-knowledge section of the AM2 assessment. Apprentices answer scenario-based questions covering BS 7671:2018+A4:2026, design principles, and current-carrying capacity calculations. This page is a focused study guide for Section A — Application of Knowledge — topics, common mistakes, what assessors look for, and a 5-step revision plan.',
  keyTakeaways: [
    'Duration: ~60 minutes.',
    'Weighting: 15% of the overall AM2 score.',
    'The first written-knowledge section of the AM2 assessment. Apprentices answer scenario-based questions covering BS 7671:2018+A4:2026, design principles, and current-carrying capacity calculations.',
    'There are 8 specific topic areas you should be confident with going in — listed in full below.',
    'Common AM2 mistakes in this section are listed in the tips block — most cost marks unnecessarily.',
    'Pair the study guide with Elec-Mate\u2019s AM2 mock day and flashcards for active practice — most apprentices use both alongside their college revision.',
  ],
  sections: [
    {
      id: 'topics',
      heading: 'Topics You Should Be Confident With',
      tocLabel: 'Topics',
      blocks: [
        {
          type: 'paragraph',
          text: 'Below is a focused list of every topic area that comes up in AM2 Section A — Application of Knowledge. Use it as a personal checklist — work through each one and confirm you can explain or demonstrate it without reference to notes.',
        },
        {
          type: 'list',
          ordered: false,
          items: [
            'BS 7671 navigation and table look-ups — Appendix 4 current-carrying capacity, voltage drop and disconnection time tables.',
            'Selecting cable size for a given installation method, ambient temperature and grouping.',
            'Selecting protective devices and confirming they are within the maximum Zs for the disconnection time required.',
            'Calculating volt drop on a single-phase or three-phase circuit and confirming compliance with the 3% lighting / 5% other circuits limits.',
            'Identifying earthing arrangement (TN-S, TN-C-S, TT) from a wiring diagram.',
            'Identifying special locations (Section 700 series) and the additional protective measures they require.',
            'Calculating maximum demand using After Diversity Maximum Demand (ADMD) methodology.',
            'Recognising A4:2026 changes from the older 18th Edition syllabus, including expanded AFDD scope and updated SPD risk methodology.',
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
          text: 'Most lost marks in AM2 Section A — Application of Knowledge come from a handful of repeatable errors. Internalise these tips before the day:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Practice navigating BS 7671 with paper tabs on the section openings — Chapters 41, 43, Section 537 and Appendix 4 are the most-referenced.',
            'Build a mental shortlist of "If the question mentions X, look at Y" — e.g. "Zs limit → Table 41.3 or 41.4".',
            'Time yourself on practice questions — the AM2 Section A is fast and apprentices regularly run out of time.',
            'Practice ADMD calculations until the standard load-type tables (Appendix B) feel automatic.',
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
            'Try a free AM2 Section A mock — see your scoring against the published weighting and identify weak topics before the real day. 7-day free trial.',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'How long is AM2 Section A — Application of Knowledge?',
      answer: 'AM2 Section A — Application of Knowledge runs for approximately ~60 minutes on the AM2 day. Time management is critical — most apprentices run short because they over-explain or rework early answers.',
    },
    {
      question: 'How much is AM2 Section A — Application of Knowledge worth?',
      answer: 'This section is weighted at 15% of the overall AM2 score. Use this to prioritise your revision — high-weighting sections deserve more practice time, but every section must be passed to pass the overall AM2.',
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
      answer: 'Active practice beats passive reading. For calculation-led sections, work through 30+ practice problems with a timer. For practical sections (B, C, D, E, F), book additional workshop time at your college and run the procedure end-to-end in real time. Elec-Mate\u2019s mock day is designed to mirror the real timings and scoring.',
    },
  ],
  howToHeading: 'Five-Step Revision Plan for AM2 Section A — Application of Knowledge',
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
      text: 'Use Elec-Mate\u2019s AM2 mock or your college\u2019s practice paper. Stop at the allowed duration regardless of completeness. Mark every question you ran out of time on as a priority for the next pass.',
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
    {
      href: '/tools/cable-sizing-calculator',
      title: 'Cable sizing calculator',
      description: 'Practice Section A — Application of Knowledge topics with a working tool.',
      icon: 'Calculator',
      category: 'Tool',
    },
    {
      href: '/tools/cable-volt-drop-three-phase',
      title: 'Voltage drop calculator',
      description: 'Practice Section A — Application of Knowledge topics with a working tool.',
      icon: 'Calculator',
      category: 'Tool',
    },
    {
      href: '/tools/earth-loop-impedance-calculator',
      title: 'Earth loop impedance calculator',
      description: 'Practice Section A — Application of Knowledge topics with a working tool.',
      icon: 'Calculator',
      category: 'Tool',
    },
    {
      href: '/guides/max-demand-calculation-guide',
      title: 'Maximum demand calculation guide',
      description: 'Practice Section A — Application of Knowledge topics with a working tool.',
      icon: 'Calculator',
      category: 'Tool',
    },
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
  ctaHeading: 'For Apprentices: Pass Section A — Application of Knowledge With Confidence',
  ctaSubheading:
    'Join 1,000+ UK apprentices using Elec-Mate for AM2 mocks, flashcards and section-by-section progress tracking. 7-day free trial.',
};
