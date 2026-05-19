import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// AM2 Module 4 SEO page — content sourced verbatim from the in-app course
// at src/pages/apprentice-courses/AM2Module4.tsx. Section list maps 1:1 to
// the canonical course module. No invented weightings or durations.

const published = '2026-05-19';
const modified = '2026-05-19';

export const am2Module4Config: GeneratedGuideConfig = {
  pagePath: '/guides/am2-module-4-inspection-and-testing',
  title: 'AM2 Module 4: Inspection + Testing | Sequence, Instruments, Cert',
  description: 'AM2 Module 4 — full test sequence, GS38-compliant instrument use, certification, functional testing and reporting non-compliances. Elec-Mate apprentice course.',
  datePublished: published,
  dateModified: modified,
  readingTime: 8,
  badge: 'AM2 Module',
  badgeIcon: 'GraduationCap',
  breadcrumbLabel: 'AM2 Module 4',
  heroPrefix: 'AM2 Module 4:',
  heroHighlight: 'Inspection + Testing',
  heroSuffix: '— Module 4 — 3 hours',
  heroSubtitle:
    'The dead and live test sequence, instrument use to GS38, certification paperwork, functional testing and reporting non-compliances. Module 4 covers everything between safe isolation and signing the EIC.',
  keyTakeaways: [
    'Module 4 of the Elec-Mate AM2 course covers the full inspection + testing phase of the assessment.',
    'Test sequence, instrument use to GS38 and certification paperwork are each their own assessable element.',
    'Functional testing under load and reporting non-compliances finish the testing phase — both need to be demonstrated to the assessor.',
    'Pairs with the Elec-Mate AM2 Testing Simulator for hands-on practice between college blocks.',
  ],
  sections: [
    {
      id: 'section-1',
      heading: 'Full test sequence and order of tests',
      tocLabel: 'Full test sequence and order…',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The correct testing sequence and methodology for the AM2.',
        },
      ],
    },
    {
      id: 'section-2',
      heading: 'Safe use of test instruments (GS38 compliance)',
      tocLabel: 'Safe use of test instruments…',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Using test equipment safely and to GS38 requirements.',
        },
      ],
    },
    {
      id: 'section-3',
      heading: 'Recording test results on certification',
      tocLabel: 'Recording test results on ce…',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Accurate completion of the test certificate paperwork.',
        },
      ],
    },
    {
      id: 'section-4',
      heading: 'Functional and operational testing',
      tocLabel: 'Functional and operational t…',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Proving the install works under load and in normal operation.',
        },
      ],
    },
    {
      id: 'section-5',
      heading: 'Identifying and reporting non-compliances',
      tocLabel: 'Identifying and reporting no…',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Finding installation defects and recording them properly.',
        },
      ],
    },
    {
      id: 'section-6',
      heading: 'Time management during testing',
      tocLabel: 'Time management during testing',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Efficient testing under exam time constraints.',
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
      question: 'What does AM2 Module 4 cover?',
      answer:
        'The dead and live test sequence, instrument use to GS38, certification paperwork, functional testing and reporting non-compliances. Module 4 covers everything between safe isolation and signing the EIC.',
    },
    {
      question: 'How long does Module 4 take to complete?',
      answer:
        'AM2 Module 4 on the Elec-Mate apprentice course is paced at 3 hours. The full AM2 course is 8 modules totalling around 16.5 hours, including the mock assessment.',
    },
    {
      question: 'Is this the official AM2 content?',
      answer:
        'This is the Elec-Mate AM2 preparation course content. It is not the official NET assessment material — for that you should consult your training provider and the NET Services AM2 candidate guidance. Elec-Mate prep is designed to align with the assessment criteria so candidates know what to expect.',
    },
  ],
  faqHeading: 'AM2 Module 4 — FAQ',
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
