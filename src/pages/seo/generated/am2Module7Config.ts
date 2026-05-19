import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// AM2 Module 7 SEO page — content sourced verbatim from the in-app course
// at src/pages/apprentice-courses/AM2Module7.tsx. Section list maps 1:1 to
// the canonical course module. No invented weightings or durations.

const published = '2026-05-19';
const modified = '2026-05-19';

export const am2Module7Config: GeneratedGuideConfig = {
  pagePath: '/guides/am2-module-7-exam-strategy-and-success-tips',
  title: 'AM2 Module 7: Exam Strategy + Success Tips | Time + Pressure',
  description: 'AM2 Module 7 — managing time across the AM2, coping with pressure, the safety-first approach assessors look for, and avoiding the common mistakes. Elec-Mate apprentice course.',
  datePublished: published,
  dateModified: modified,
  readingTime: 8,
  badge: 'AM2 Module',
  badgeIcon: 'GraduationCap',
  breadcrumbLabel: 'AM2 Module 7',
  heroPrefix: 'AM2 Module 7:',
  heroHighlight: 'Exam Strategy + Success Tips',
  heroSuffix: '— Module 7 — 1.5 hours',
  heroSubtitle:
    'The exam-day playbook. Time management across every AM2 phase, techniques for managing nerves under pressure, the safety-first demeanour assessors reward, and the common mistakes that catch candidates out at the last hurdle.',
  keyTakeaways: [
    'Module 7 is the exam-day playbook — time management, nerves, demeanour and mistake avoidance.',
    'Time management across every AM2 phase is the single biggest separator between first-time passers and resits.',
    'The safety-first approach is something assessors actively reward — module 7 shows you how to demonstrate it consistently.',
    'Common-mistake section is built from past candidate patterns — internalise it before the day.',
  ],
  sections: [
    {
      id: 'section-1',
      heading: 'Managing time in each section of the AM2',
      tocLabel: 'Managing time in each sectio…',
      blocks: [
        {
          type: 'paragraph',
          text:
            'How to allocate and protect time across each AM2 section.',
        },
      ],
    },
    {
      id: 'section-2',
      heading: 'Coping with nerves and pressure',
      tocLabel: 'Coping with nerves and press…',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Techniques for managing exam stress and staying focused.',
        },
      ],
    },
    {
      id: 'section-3',
      heading: 'Safety-first approach — show the assessor you\'re safe',
      tocLabel: 'Safety-first approach — show…',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Demonstrating safety competence throughout the assessment.',
        },
      ],
    },
    {
      id: 'section-4',
      heading: 'Avoiding common mistakes',
      tocLabel: 'Avoiding common mistakes',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The typical errors candidates make and how to prevent them.',
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
      question: 'What does AM2 Module 7 cover?',
      answer:
        'The exam-day playbook. Time management across every AM2 phase, techniques for managing nerves under pressure, the safety-first demeanour assessors reward, and the common mistakes that catch candidates out at the last hurdle.',
    },
    {
      question: 'How long does Module 7 take to complete?',
      answer:
        'AM2 Module 7 on the Elec-Mate apprentice course is paced at 1.5 hours. The full AM2 course is 8 modules totalling around 16.5 hours, including the mock assessment.',
    },
    {
      question: 'Is this the official AM2 content?',
      answer:
        'This is the Elec-Mate AM2 preparation course content. It is not the official NET assessment material — for that you should consult your training provider and the NET Services AM2 candidate guidance. Elec-Mate prep is designed to align with the assessment criteria so candidates know what to expect.',
    },
  ],
  faqHeading: 'AM2 Module 7 — FAQ',
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
