import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// AM2 Module 3 SEO page — content sourced verbatim from the in-app course
// at src/pages/apprentice-courses/AM2Module3.tsx. Section list maps 1:1 to
// the canonical course module. No invented weightings or durations.

const published = '2026-05-19';
const modified = '2026-05-19';

export const am2Module3Config: GeneratedGuideConfig = {
  pagePath: '/guides/am2-module-3-installation-tasks',
  title: 'AM2 Module 3: Installation Tasks | Cables, Circuits, Containment',
  description: 'AM2 Module 3 — cable selection, power and lighting circuits, containment, terminations and time management for the AM2 install. Elec-Mate apprentice course.',
  datePublished: published,
  dateModified: modified,
  readingTime: 8,
  badge: 'AM2 Module',
  badgeIcon: 'GraduationCap',
  breadcrumbLabel: 'AM2 Module 3',
  heroPrefix: 'AM2 Module 3:',
  heroHighlight: 'Installation Tasks',
  heroSuffix: '— Module 3 — 3 hours',
  heroSubtitle:
    'Cable selection, containment, power and lighting circuits, terminations and the time-management discipline that lets you finish the AM2 install without overrunning. The single longest module in the course because the install is the longest part of the assessment.',
  keyTakeaways: [
    'The installation phase is the longest part of the AM2 — module 3 is the longest in the prep course for that reason.',
    'Covers cable selection, containment, every common power and lighting circuit type and the workmanship standards assessors look for.',
    'Termination quality, circuit labelling and BS 7671 compliance are graded throughout the install.',
    'Includes a time-management section — the install is where most candidates lose the clock.',
  ],
  sections: [
    {
      id: 'section-1',
      heading: 'Cable selection and containment',
      tocLabel: 'Cable selection and containm…',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Choosing the right cable, trunking, conduit and tray for the AM2 install.',
        },
      ],
    },
    {
      id: 'section-2',
      heading: 'Power circuits — ring, radial, cooker, motor',
      tocLabel: 'Power circuits — ring, radia…',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Installing each common power circuit type to spec.',
        },
      ],
    },
    {
      id: 'section-3',
      heading: 'Lighting circuits and control systems',
      tocLabel: 'Lighting circuits and contro…',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Lighting installations and switching arrangements.',
        },
      ],
    },
    {
      id: 'section-4',
      heading: 'Termination, connections and circuit labelling',
      tocLabel: 'Termination, connections and…',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Workmanship standards, connections and clear circuit labelling.',
        },
      ],
    },
    {
      id: 'section-5',
      heading: 'Accuracy, neatness and BS 7671 compliance',
      tocLabel: 'Accuracy, neatness and BS 76…',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Meeting installation standards and the regulatory requirements.',
        },
      ],
    },
    {
      id: 'section-6',
      heading: 'Managing time during installation',
      tocLabel: 'Managing time during install…',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Efficient installation techniques when the clock is against you.',
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
      question: 'What does AM2 Module 3 cover?',
      answer:
        'Cable selection, containment, power and lighting circuits, terminations and the time-management discipline that lets you finish the AM2 install without overrunning. The single longest module in the course because the install is the longest part of the assessment.',
    },
    {
      question: 'How long does Module 3 take to complete?',
      answer:
        'AM2 Module 3 on the Elec-Mate apprentice course is paced at 3 hours. The full AM2 course is 8 modules totalling around 16.5 hours, including the mock assessment.',
    },
    {
      question: 'Is this the official AM2 content?',
      answer:
        'This is the Elec-Mate AM2 preparation course content. It is not the official NET assessment material — for that you should consult your training provider and the NET Services AM2 candidate guidance. Elec-Mate prep is designed to align with the assessment criteria so candidates know what to expect.',
    },
  ],
  faqHeading: 'AM2 Module 3 — FAQ',
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
