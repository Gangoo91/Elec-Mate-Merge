import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// AM2 Module 6 SEO page — content sourced verbatim from the in-app course
// at src/pages/apprentice-courses/AM2Module6.tsx. Section list maps 1:1 to
// the canonical course module. No invented weightings or durations.

const published = '2026-05-19';
const modified = '2026-05-19';

export const am2Module6Config: GeneratedGuideConfig = {
  pagePath: '/guides/am2-module-6-online-knowledge-test',
  title: 'AM2 Module 6: Online Knowledge Test | Format + Core Topics',
  description: 'AM2 Module 6 — format and structure of the online knowledge test, core topics, time management and exam techniques. Elec-Mate apprentice course.',
  datePublished: published,
  dateModified: modified,
  readingTime: 8,
  badge: 'AM2 Module',
  badgeIcon: 'GraduationCap',
  breadcrumbLabel: 'AM2 Module 6',
  heroPrefix: 'AM2 Module 6:',
  heroHighlight: 'Online Knowledge Test',
  heroSuffix: '— Module 6 — 1.5 hours',
  heroSubtitle:
    'The written/MCQ knowledge component of the AM2 — BS 7671, electrical science, health + safety and building regs. Module 6 covers what it looks like, what it covers, how to manage the clock and the in-test technique that picks up easy marks.',
  keyTakeaways: [
    'The online knowledge test is the written/MCQ part of the AM2 — covers BS 7671, electrical science, H&S and building regs.',
    'Module 6 walks through the test format and structure so there are no surprises on the day.',
    'Includes the core-topic breakdown so candidates know exactly which areas to revise.',
    'Time-management + exam-technique sections cover the marks-per-minute discipline that picks up easy points.',
  ],
  sections: [
    {
      id: 'section-1',
      heading: 'Format and structure of the online test',
      tocLabel: 'Format and structure of the …',
      blocks: [
        {
          type: 'paragraph',
          text:
            'How the online knowledge test is laid out and what to expect.',
        },
      ],
    },
    {
      id: 'section-2',
      heading: 'Core topics covered (regs, science, safety)',
      tocLabel: 'Core topics covered (regs, s…',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The key subject areas the knowledge test draws from.',
        },
      ],
    },
    {
      id: 'section-3',
      heading: 'Time management strategies',
      tocLabel: 'Time management strategies',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Effective techniques for managing your time during the test.',
        },
      ],
    },
    {
      id: 'section-4',
      heading: 'Exam techniques and mindset',
      tocLabel: 'Exam techniques and mindset',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Mental preparation and effective in-exam strategies.',
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
      question: 'What does AM2 Module 6 cover?',
      answer:
        'The written/MCQ knowledge component of the AM2 — BS 7671, electrical science, health + safety and building regs. Module 6 covers what it looks like, what it covers, how to manage the clock and the in-test technique that picks up easy marks.',
    },
    {
      question: 'How long does Module 6 take to complete?',
      answer:
        'AM2 Module 6 on the Elec-Mate apprentice course is paced at 1.5 hours. The full AM2 course is 8 modules totalling around 16.5 hours, including the mock assessment.',
    },
    {
      question: 'Is this the official AM2 content?',
      answer:
        'This is the Elec-Mate AM2 preparation course content. It is not the official NET assessment material — for that you should consult your training provider and the NET Services AM2 candidate guidance. Elec-Mate prep is designed to align with the assessment criteria so candidates know what to expect.',
    },
  ],
  faqHeading: 'AM2 Module 6 — FAQ',
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
