import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// AM2 Module 5 SEO page — content sourced verbatim from the in-app course
// at src/pages/apprentice-courses/AM2Module5.tsx. Section list maps 1:1 to
// the canonical course module. No invented weightings or durations.

const published = '2026-05-19';
const modified = '2026-05-19';

export const am2Module5Config: GeneratedGuideConfig = {
  pagePath: '/guides/am2-module-5-fault-diagnosis-and-rectification',
  title: 'AM2 Module 5: Fault Diagnosis + Rectification | Logical Process',
  description: 'AM2 Module 5 — typical AM2 faults, the logical fault-finding process, efficient test instrument use, rectification proof and re-testing. Elec-Mate apprentice course.',
  datePublished: published,
  dateModified: modified,
  readingTime: 8,
  badge: 'AM2 Module',
  badgeIcon: 'GraduationCap',
  breadcrumbLabel: 'AM2 Module 5',
  heroPrefix: 'AM2 Module 5:',
  heroHighlight: 'Fault Diagnosis + Rectification',
  heroSuffix: '— Module 5 — 2 hours',
  heroSubtitle:
    'Diagnose and rectify two faults set into the install rig — under time pressure, with the assessor watching the logic, not just the result. Module 5 covers the systematic fault-finding process the AM2 expects, plus the rectification + re-test procedure.',
  keyTakeaways: [
    'Fault diagnosis is where the AM2 assessor watches your method, not just whether you find the fault.',
    'Module 5 of the Elec-Mate course covers the systematic, repeatable fault-finding process that the AM2 expects.',
    'Includes the typical-fault catalogue, rectification proof, re-testing procedure and a quick-reference field sheet.',
    'Pairs with the AM2 Fault-Finding Simulator in the Elec-Mate apprentice app for hands-on practice.',
  ],
  sections: [
    {
      id: 'section-1',
      heading: 'Typical faults set in the AM2 assessment',
      tocLabel: 'Typical faults set in the AM…',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Common fault scenarios you will encounter on the day.',
        },
      ],
    },
    {
      id: 'section-2',
      heading: 'Logical fault-finding process',
      tocLabel: 'Logical fault-finding process',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A systematic, repeatable approach to fault diagnosis.',
        },
      ],
    },
    {
      id: 'section-3',
      heading: 'Using test equipment efficiently',
      tocLabel: 'Using test equipment efficie…',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Effective use of test instruments for fault finding.',
        },
      ],
    },
    {
      id: 'section-4',
      heading: 'Proving and recording rectification',
      tocLabel: 'Proving and recording rectif…',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Demonstrating and documenting the fault rectification.',
        },
      ],
    },
    {
      id: 'section-5',
      heading: 'Re-testing procedures',
      tocLabel: 'Re-testing procedures',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Post-rectification testing and verification.',
        },
      ],
    },
    {
      id: 'section-6',
      heading: 'Quick-reference fault diagnosis sheet',
      tocLabel: 'Quick-reference fault diagno…',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Essential reference guide for AM2 fault-finding.',
        },
      ],
    },
    {
      id: 'study-with-elec-mate',
      heading: 'Study With Elec-Mate',
      tocLabel: 'Study With Elec-Mate',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The Elec-Mate apprentice tier includes the complete AM2 prep course — 8 modules, ~16.5 hours, 40+ pages — plus the AM2 Testing Simulator and a 30-question Mock Day pulled from a 400-question bank. Most apprentices use it alongside their college revision.',
        },
        {
          type: 'callout',
          tone: 'info',
          heading: 'AM2 Mock Day — 30 questions, real timings',
          body: 'The Elec-Mate AM2 Mock Day mirrors the real 4-phase AM2 structure: safe isolation, testing sequence, fault diagnosis, knowledge test. Times you on each phase and scores you against the readiness rubric.',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'What does AM2 Module 5 cover?',
      answer:
        'Diagnose and rectify two faults set into the install rig — under time pressure, with the assessor watching the logic, not just the result. Module 5 covers the systematic fault-finding process the AM2 expects, plus the rectification + re-test procedure.',
    },
    {
      question: 'How long does Module 5 take to complete?',
      answer:
        'AM2 Module 5 on the Elec-Mate apprentice course is paced at 2 hours. The full AM2 course is 8 modules totalling around 16.5 hours, including the mock assessment.',
    },
    {
      question: 'Is this the official AM2 content?',
      answer:
        'This is the Elec-Mate AM2 preparation course content. It is not the official NET assessment material — for that you should consult your training provider and the NET Services AM2 candidate guidance. Elec-Mate prep is designed to align with the assessment criteria so candidates know what to expect.',
    },
  ],
  faqHeading: 'AM2 Module 5 — FAQ',
  relatedPages: [
    {
      href: '/am2-exam-preparation',
      title: 'AM2 Exam Preparation Hub',
      description: 'The Elec-Mate AM2 course landing page — overview of all 8 modules.',
      icon: 'GraduationCap',
      category: 'AM2',
    },
    {
      href: '/am2-assessment-prep',
      title: 'AM2 Assessment Preparation',
      description: 'Practice tests, AM2 Testing Simulator, Mock Day and readiness scoring.',
      icon: 'ClipboardCheck',
      category: 'AM2',
    },
    {
      href: '/am2-exam-tips',
      title: 'AM2 Exam Tips',
      description: 'Compiled exam-day tips from passers + common-mistake patterns.',
      icon: 'BookOpen',
      category: 'AM2',
    },
    {
      href: '/apprentice-portfolio-guide',
      title: 'Apprentice Portfolio Guide',
      description: 'How to build the portfolio that supports your AM2 gateway sign-off.',
      icon: 'FileCheck2',
      category: 'Apprentice',
    },
  ],
};
