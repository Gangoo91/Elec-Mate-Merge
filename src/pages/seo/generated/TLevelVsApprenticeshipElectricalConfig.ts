import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// UK electrical apprentice pathway comparison page. Helps apprentices, parents,
// and career-changers compare qualifications + routes before committing. Apprentice
// audience — CTA to Elec-Mate apprentice tier or qualification overview.
// Updated 2026-05-18.

const published = '2026-05-18';
const modified = '2026-05-18';

export const TLevelVsApprenticeshipElectricalConfig: GeneratedGuideConfig = {
  pagePath: '/guides/t-level-vs-apprenticeship-electrical',
  title: 'T Level vs Apprenticeship — Which Is Right for Electrical?',
  description: 'T Levels (Building Services Engineering — Electrical Installation, 8202) launched in 2020 as an alternative to apprenticeships.',
  datePublished: published,
  dateModified: modified,
  readingTime: 10,
  badge: 'Pathway Comparison',
  badgeIcon: 'GraduationCap',
  breadcrumbLabel: 'T Level vs Apprenticeship',
  heroPrefix: 'T Level vs Apprenticeship',
  heroHighlight: 'Which Is Right for Electrical?',
  heroSuffix: '— UK 2026 Guide',
  heroSubtitle:
    'T Levels (Building Services Engineering — Electrical Installation, 8202) launched in 2020 as an alternative to apprenticeships. Both lead to a Level 3 qualification, but the structure, time on site, and employer relationship are very different. This guide explains the practical differences between the routes — audience, structure, time commitment, end-point assessment — so you can choose the right one for your situation.',
  keyTakeaways: [
    'Three (or more) main routes exist — each with different audience, structure and end-point assessment.',
    'All compared pathways lead to a recognised Level 3 electrical qualification once complete.',
    'The right pathway depends on: your age, your employer relationship, your funding, and your career goal.',
    'JIB Approved Electrician grade and ECS Gold Card are available via any of these routes once the qualification is complete.',
    'AM2 (or the equivalent end-point assessment) is the recognised practical capstone — most pathways now include it.',
    'Use the comparison below to identify the route that best matches your circumstances, then read the matching unit revision pages on Elec-Mate to plan your study.',
  ],
  sections: [
    {
      id: 't-level-8202-',
      heading: 'T Level (8202) — 2-year Level 3 college-led programme with 45-day industry placement',
      tocLabel: 'T Level (8202)',
      blocks: [
        {
          type: 'paragraph',
          text: 'Audience: 16-18 year olds choosing between A-Levels and apprenticeship; those not certain electrical is their long-term path.',
        },
        {
          type: 'paragraph',
          text: 'Strengths:',
        },
        {
          type: 'list',
          ordered: false,
          items: [
            'College-led, structured timetable.',
            'Single employer placement, lower commitment.',
            'Strong UCAS points equivalent to A-Levels for university entry.',
          ],
        },
        {
          type: 'paragraph',
          text: 'End-point / assessment: Final exams + employer-set project + industry placement evidence.',
        },
      ],
    },
    {
      id: 'apprenticeship',
      heading: 'Apprenticeship — 3-4 year employer-led programme with 20% off-the-job training',
      tocLabel: 'Apprenticeship',
      blocks: [
        {
          type: 'paragraph',
          text: 'Audience: 16+ committed to electrical as a career; learners who prefer on-the-job learning over classroom.',
        },
        {
          type: 'paragraph',
          text: 'Strengths:',
        },
        {
          type: 'list',
          ordered: false,
          items: [
            'Earn while you learn — full apprentice wage from day one.',
            'Longer industry experience (3-4 years of real jobs).',
            'Direct route to JIB Approved Electrician status after AM2.',
          ],
        },
        {
          type: 'paragraph',
          text: 'End-point / assessment: AM2 end-point assessment + JIB grading.',
        },
      ],
    },
    {
      id: 'how-to-choose',
      heading: 'How to Choose Between These Pathways',
      tocLabel: 'How to choose',
      blocks: [
        {
          type: 'paragraph',
          text: 'Three questions decide most pathway choices:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Do you have an employer offering an apprenticeship? If yes → Apprenticeship Standard route is almost always the right answer.',
            'Are you over 25 / a career-changer? NVQ-based pathways or short Domestic Installer routes are usually more accessible.',
            'Do you want full industry recognition? Full Level 3 + AM2 is the only route that gives you JIB Approved Electrician grade and unrestricted scheme membership.',
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'Are these qualifications equivalent?',
      answer: 'All compared Level 3 routes lead to recognised electrical qualifications. The end-point and on-the-job evidence may differ, but the JIB / ECS recognition once complete is essentially equivalent. Domestic Installer is a separate, narrower qualification — not equivalent to full Level 3.',
    },
    {
      question: 'Can I switch pathways mid-apprenticeship?',
      answer: 'Possible but uncommon. Most training providers deliver one awarding body / pathway per cohort. If you need to switch, look into APL (Accredited Prior Learning) — some completed units may transfer to the new pathway.',
    },
    {
      question: 'Which pathway is most respected by employers?',
      answer: 'For most UK electrical employers, the Apprenticeship Standard 5357 (with AM2) is now the default expectation for new starters. NVQ 2357 + AM2 is equally respected for adult learners. Domestic Installer alone is recognised for self-employed domestic work but is not equivalent to full Level 3.',
    },
    {
      question: 'How long does each pathway take?',
      answer: 'Full Level 3 apprenticeship (5357 / 2365): 3-4 years. NVQ 2357 (typically while working): 2-3 years for adult learners. T Level (8202): 2 years. Domestic Installer (Part P): 4-12 weeks intensive plus 6-12 months scheme registration period.',
    },
    {
      question: 'What if I am over 25 — can I still apprentice?',
      answer: 'Yes. Apprenticeship funding rules changed: employers receive smaller subsidies for 25+ apprentices but apprenticeships are not age-restricted. Many adult learners take the NVQ 2357 route or self-fund Level 3 + AM2.',
    },
    {
      question: 'Will the Elec-Mate revision content work for all these pathways?',
      answer: 'Yes — Elec-Mate covers every major UK electrical qualification with unit-by-unit revision content. Specify your qualification on signup and we tailor the dashboard to your specific units.',
    },
  ],
  howToHeading: 'Five Steps to Choose the Right Pathway',
  howToDescription:
    'Use this checklist to commit to a pathway with confidence.',
  howToSteps: [
    { name: 'Speak to two or three local employers', text: 'Ask which qualification they typically hire from. This tells you what is normal in your area.' },
    { name: 'Speak to two or three local training providers', text: 'Ask which awarding body they deliver and whether they have current apprenticeship vacancies.' },
    { name: 'Match your funding situation to the pathway', text: 'Apprenticeship Standard = government-funded for under-25s. NVQ = self-funded or employer-funded. T Level = college-funded.' },
    { name: 'Check the end-point assessment is one you can commit to', text: 'AM2 is intense but recognised. NVQ portfolio is slower but more flexible. Match to your learning style.' },
    { name: 'Sign up for Elec-Mate apprentice tier and select your qualification', text: 'The dashboard tailors revision content + OJT tracking to your specific units. 7-day free trial.' },
  ],
  relatedPages: [
    { href: '/guides/electrical-apprentice-year-1-revision-plan', title: 'Year 1 Revision Plan', description: 'First-year apprentice study plan across pathways.', icon: 'GraduationCap', category: 'Guide' },
    { href: '/guides/am2-exam-tips', title: 'AM2 Exam Tips', description: 'End-point assessment preparation.', icon: 'GraduationCap', category: 'Guide' },
    { href: '/guides/apprentice-electrician-salary', title: 'Apprentice Electrician Salary', description: 'What you earn at each year of an apprenticeship.', icon: 'PoundSterling', category: 'Guide' },
    { href: '/guides/off-the-job-training-hours', title: 'Off-The-Job Training Hours', description: 'How OTJ hours are logged and what counts.', icon: 'ClipboardCheck', category: 'Guide' },
    { href: '/guides/ecs-gold-card-requirements', title: 'ECS / JIB Gold Card', description: 'Next step after passing the qualification.', icon: 'ShieldCheck', category: 'Guide' },
    { href: '/guides/bs-7671-18th-edition-guide', title: 'BS 7671 18th Edition Guide', description: 'Your single reference book through every pathway.', icon: 'BookOpen', category: 'Guide' },
  ],
  ctaHeading: 'Track Your Pathway With Elec-Mate',
  ctaSubheading:
    'Join 1,000+ UK apprentices using Elec-Mate to revise units, log OJT hours, and prepare for the AM2 — whichever pathway you are on. 7-day free trial.',
};
