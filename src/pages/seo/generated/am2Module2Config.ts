import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// AM2 Module 2 SEO page — content sourced verbatim from the in-app course
// at src/pages/apprentice-courses/AM2Module2.tsx. Section list maps 1:1 to
// the canonical course module. No invented weightings or durations.

const published = '2026-05-19';
const modified = '2026-05-19';

export const am2Module2Config: GeneratedGuideConfig = {
  pagePath: '/guides/am2-module-2-health-safety-documentation',
  title: 'AM2 Module 2: Health, Safety + Documentation | Safe Isolation',
  description: 'AM2 Module 2 — safe isolation procedures, RAMS, drawings and completing paperwork under exam pressure. From the Elec-Mate apprentice course.',
  datePublished: published,
  dateModified: modified,
  readingTime: 8,
  badge: 'AM2 Module',
  badgeIcon: 'GraduationCap',
  breadcrumbLabel: 'AM2 Module 2',
  heroPrefix: 'AM2 Module 2:',
  heroHighlight: 'Health, Safety + Documentation',
  heroSuffix: '— Module 2 — 2 hours',
  heroSubtitle:
    'Safe isolation is the single most-tested skill of the AM2 and an instant fail if done wrong. This module covers the full safe isolation sequence, RAMS, drawings + spec interpretation, and the paperwork discipline that holds up under timed assessment pressure.',
  keyTakeaways: [
    'Safe isolation is the AM2\'s most-tested and most-failed skill — get it wrong and the rest of the day is over.',
    'The module walks through the full safe-isolation sequence as taught in the Elec-Mate course, with the documentation that goes alongside it.',
    'RAMS, drawings and spec interpretation are all assessable parts of the AM2 — module 2 covers each one.',
    'Includes the critical-safety-error list — the specific mistakes that have ended candidates\' AM2s in past sittings.',
  ],
  sections: [
    {
      id: 'section-1',
      heading: 'Safe isolation procedures (instant fail if wrong)',
      tocLabel: 'Safe isolation procedures (i…',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The critical safe-isolation sequence and why it is the most-tested skill.',
        },
      ],
    },
    {
      id: 'section-2',
      heading: 'Risk assessments and method statements (RAMS)',
      tocLabel: 'Risk assessments and method …',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Completing RAMS documentation accurately for AM2 tasks.',
        },
      ],
    },
    {
      id: 'section-3',
      heading: 'Working with drawings and specifications',
      tocLabel: 'Working with drawings and sp…',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Interpreting technical drawings and matching the install to the spec.',
        },
      ],
    },
    {
      id: 'section-4',
      heading: 'Completing paperwork under pressure',
      tocLabel: 'Completing paperwork under p…',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Efficient documentation during a timed practical assessment.',
        },
      ],
    },
    {
      id: 'section-5',
      heading: 'Avoiding critical safety errors',
      tocLabel: 'Avoiding critical safety err…',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The common safety mistakes that lead to instant failure.',
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
      question: 'What does AM2 Module 2 cover?',
      answer:
        'Safe isolation is the single most-tested skill of the AM2 and an instant fail if done wrong. This module covers the full safe isolation sequence, RAMS, drawings + spec interpretation, and the paperwork discipline that holds up under timed assessment pressure.',
    },
    {
      question: 'How long does Module 2 take to complete?',
      answer:
        'AM2 Module 2 on the Elec-Mate apprentice course is paced at 2 hours. The full AM2 course is 8 modules totalling around 16.5 hours, including the mock assessment.',
    },
    {
      question: 'Is this the official AM2 content?',
      answer:
        'This is the Elec-Mate AM2 preparation course content. It is not the official NET assessment material — for that you should consult your training provider and the NET Services AM2 candidate guidance. Elec-Mate prep is designed to align with the assessment criteria so candidates know what to expect.',
    },
  ],
  faqHeading: 'AM2 Module 2 — FAQ',
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
