import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// AM2 Module 1 SEO page — content sourced verbatim from the in-app course
// at src/pages/apprentice-courses/AM2Module1.tsx. Section list maps 1:1 to
// the canonical course module. No invented weightings or durations.

const published = '2026-05-19';
const modified = '2026-05-19';

export const am2Module1Config: GeneratedGuideConfig = {
  pagePath: '/guides/am2-module-1-introduction',
  title: 'AM2 Module 1: Introduction | What the AM2 Is + Who Takes It',
  description: 'AM2 Module 1 from the Elec-Mate apprentice course — assessment purpose, structure, marking and the common reasons candidates fail.',
  datePublished: published,
  dateModified: modified,
  readingTime: 8,
  badge: 'AM2 Module',
  badgeIcon: 'GraduationCap',
  breadcrumbLabel: 'AM2 Module 1',
  heroPrefix: 'AM2 Module 1:',
  heroHighlight: 'Introduction to the AM2',
  heroSuffix: '— Module 1 — 2 hours',
  heroSubtitle:
    'The first module of the Elec-Mate AM2 prep course. Covers what the AM2 actually assesses, who it is for, how it is structured and marked, and the patterns we see in candidates who do not pass first time.',
  keyTakeaways: [
    'AM2 Module 1 of the Elec-Mate apprentice course covers what the AM2 actually assesses, who takes it, and how the day is structured.',
    'The module walks through the AM2 marking criteria and the pass/fail thresholds in plain language.',
    'Includes a focused section on the most common reasons candidates fail — the patterns repeat year after year.',
    'Designed as an entry point to the full 8-module / 16.5-hour AM2 prep course on Elec-Mate.',
  ],
  sections: [
    {
      id: 'section-1',
      heading: 'Purpose of the AM2 and who it\'s for',
      tocLabel: 'Purpose of the AM2 and who i…',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Assessment objectives, qualification context and target candidates.',
        },
      ],
    },
    {
      id: 'section-2',
      heading: 'Structure and timings of the assessment',
      tocLabel: 'Structure and timings of the…',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Breakdown of the AM2 components and time allocations.',
        },
      ],
    },
    {
      id: 'section-3',
      heading: 'Marking criteria and pass/fail thresholds',
      tocLabel: 'Marking criteria and pass/fa…',
      blocks: [
        {
          type: 'paragraph',
          text:
            'How the AM2 is marked and what counts as a pass.',
        },
      ],
    },
    {
      id: 'section-4',
      heading: 'Common reasons for failure',
      tocLabel: 'Common reasons for failure',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Typical mistakes and the areas where most candidates slip up.',
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
      question: 'What does AM2 Module 1 cover?',
      answer:
        'The first module of the Elec-Mate AM2 prep course. Covers what the AM2 actually assesses, who it is for, how it is structured and marked, and the patterns we see in candidates who do not pass first time.',
    },
    {
      question: 'How long does Module 1 take to complete?',
      answer:
        'AM2 Module 1 on the Elec-Mate apprentice course is paced at 2 hours. The full AM2 course is 8 modules totalling around 16.5 hours, including the mock assessment.',
    },
    {
      question: 'Is this the official AM2 content?',
      answer:
        'This is the Elec-Mate AM2 preparation course content. It is not the official NET assessment material — for that you should consult your training provider and the NET Services AM2 candidate guidance. Elec-Mate prep is designed to align with the assessment criteria so candidates know what to expect.',
    },
  ],
  faqHeading: 'AM2 Module 1 — FAQ',
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
