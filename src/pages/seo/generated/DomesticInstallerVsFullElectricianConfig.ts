import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// UK electrical apprentice pathway comparison page. Helps apprentices, parents,
// and career-changers compare qualifications + routes before committing. Apprentice
// audience — CTA to Elec-Mate apprentice tier or qualification overview.
// Updated 2026-05-18.

const published = '2026-05-18';
const modified = '2026-05-18';

export const DomesticInstallerVsFullElectricianConfig: GeneratedGuideConfig = {
  pagePath: '/guides/domestic-installer-vs-full-electrician',
  title: 'Domestic Installer vs Full Electrician — Two Different',
  description: 'A "Domestic Installer" (Part P qualification) is a short course covering domestic electrical work only.',
  datePublished: published,
  dateModified: modified,
  readingTime: 10,
  badge: 'Pathway Comparison',
  badgeIcon: 'GraduationCap',
  breadcrumbLabel: 'Domestic Installer vs Full Electrician',
  heroPrefix: 'Domestic Installer vs Full Electrician',
  heroHighlight: 'Two Different Qualifications',
  heroSuffix: '— UK 2026 Guide',
  heroSubtitle:
    'A "Domestic Installer" (Part P qualification) is a short course covering domestic electrical work only. A full Level 3 electrician (NVQ / Apprenticeship Standard) is qualified across all environments. They are NOT the same qualification. This guide explains the practical differences between the routes — audience, structure, time commitment, end-point assessment — so you can choose the right one for your situation.',
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
      id: 'domestic-installer-part-p-',
      heading: 'Domestic Installer (Part P) — Short course (4-6 weeks typical) — focused on domestic single-dwelling work',
      tocLabel: 'Domestic Installer (Part P)',
      blocks: [
        {
          type: 'paragraph',
          text: 'Audience: Career-changers wanting to do domestic work only; mature learners with limited time.',
        },
        {
          type: 'paragraph',
          text: 'Strengths:',
        },
        {
          type: 'list',
          ordered: false,
          items: [
            'Quick route into self-employed domestic work.',
            'Lower upfront cost (~£2,500-4,500).',
            'Allows scheme registration for domestic notifiable work via NICEIC DI / NAPIT DI.',
          ],
        },
        {
          type: 'paragraph',
          text: 'End-point / assessment: Scheme assessment (NICEIC DI / NAPIT DI) — much shorter than AM2.',
        },
      ],
    },
    {
      id: 'full-level-3-electrician',
      heading: 'Full Level 3 Electrician — 3-4 year apprenticeship + AM2 + portfolio',
      tocLabel: 'Full Level 3 Electrician',
      blocks: [
        {
          type: 'paragraph',
          text: 'Audience: Long-term career electricians wanting full industry recognition.',
        },
        {
          type: 'paragraph',
          text: 'Strengths:',
        },
        {
          type: 'list',
          ordered: false,
          items: [
            'Qualified across domestic, commercial, industrial.',
            'JIB Approved Electrician grade.',
            'Full scheme membership without restriction.',
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
