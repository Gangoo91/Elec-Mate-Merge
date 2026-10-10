import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';
import { OTJ_RULE_SOURCE, OTJ_ST0152_HOURS } from '@/data/otjStandards';

// Electrical business owner / employer guide. Audience: small electrical contractors and business owners considering taking on an apprentice.
// CTA: Elec-Mate Business AI / Employer tier.
// Updated 2026-05-18.

const published = '2026-05-18';
const modified = '2026-10-10';

export const HowToHireAnElectricalApprenticeConfig: GeneratedGuideConfig = {
  pagePath: '/guides/how-to-hire-an-electrical-apprentice',
  title: 'How to Hire an Electrical Apprentice in the UK',
  description: 'A practical 2026 guide for UK electrical contractors hiring their first (or next) apprentice.',
  datePublished: published,
  dateModified: modified,
  readingTime: 12,
  badge: 'Business Owner Guide',
  badgeIcon: 'Briefcase',
  breadcrumbLabel: 'How to Hire an Electrical Appren...',
  heroPrefix: 'How to Hire an Electrical Apprentice in the UK:',
  heroHighlight: 'Practical 2026 Guide',
  heroSuffix: '— For UK Electrical Contractors',
  heroSubtitle:
    'A practical 2026 guide for UK electrical contractors hiring their first (or next) apprentice. Covers Apprenticeship Levy funding, employer obligations, training provider selection, day-one onboarding, and how to keep the apprentice through to AM2. This guide is for small electrical contractors and business owners considering taking on an apprentice.',
  keyTakeaways: [
    'The Apprenticeship Levy applies to employers with pay bills above £3m — most small electrical contractors pay nothing but still access government funding: all training costs for 16 to 24-year-olds and 95% for 25+ (starts from 1 August 2026).',
    'You need a training provider partnership in place before you advertise the vacancy — most electricians use local colleges.',
    'Minimum apprentice wage in 2026 is the Apprentice National Minimum Wage (typically £6.40/hour for under-19s or 1st-year over-19s); JIB rates apply if you\u2019re a JIB member.',
    `You commit to releasing the apprentice for the off-the-job hours on their standard (${OTJ_ST0152_HOURS} for ST0152), in paid time. It is a statutory requirement and is audited.`,
    'Day-one onboarding: PPE, tools, mentoring assignment, OJT logbook, college enrolment confirmed, ECS card application.',
    'Retention through AM2 is the real challenge — many apprentices leave at year 2-3 if not mentored properly.',
  ],
  sections: [
    {
      id: 'funding',
      heading: 'Apprenticeship Funding in 2026',
      tocLabel: 'Apprenticeship Funding...',
      blocks: [
        {
          type: 'paragraph',
          text: 'If your annual UK pay bill is under £3m (true for most small electrical contractors), the Government pays all of the training and assessment costs, up to the funding band maximum, for an apprentice aged 16 to 24 at the start, for starts from 1 August 2026. For an apprentice aged 25 or over you pay 5% and the Government 95% (DfE funding rules 2026 to 2027, rules 213 to 214). A £2,000 hiring payment is also paid for a 16 to 24-year-old whose practical period starts from 1 October 2026 (rule 133). The Levy itself only applies to employers paying £3m+ in salaries — outside that, the funding is essentially free training for the apprentice.',
        },
      ],
    },
    {
      id: 'training-provider',
      heading: 'Choosing a Training Provider',
      tocLabel: 'Choosing a Training Pr...',
      blocks: [
        {
          type: 'paragraph',
          text: 'You can\u2019t just hire an apprentice — they must be enrolled with an approved training provider (typically a local college). Pick the provider based on: distance from your office (apprentice has to attend), reputation (ask other local electricians), pass rate on the AM2, and which qualification they deliver (5357 Apprenticeship Standard is the default in 2026). Approach the provider FIRST, then advertise the vacancy.',
        },
      ],
    },
    {
      id: 'advertise-recruit',
      heading: 'Advertising the Vacancy and Recruiting',
      tocLabel: 'Advertising the Vacanc...',
      blocks: [
        {
          type: 'paragraph',
          text: 'Post the vacancy on the official "Find an apprenticeship" service (gov.uk). Local college job boards. Indeed, Facebook local groups. Look for: Maths and English at GCSE grade 4+ (a requirement of the standard), interest in electrical work demonstrated by personal projects or work experience, willingness to commit 3-4 years. Interview in pairs (you + your senior electrician). Trial half-day on site before final offer.',
        },
      ],
    },
    {
      id: 'onboarding',
      heading: 'Day-One Onboarding',
      tocLabel: 'Day-One Onboarding',
      blocks: [
        {
          type: 'paragraph',
          text: 'PPE supplied: safety boots, hi-vis, safety glasses, ear defenders, work gloves. Starter tool kit (insulated screwdrivers, side cutters, multi-meter — apprentices typically supply their own larger tools by year 2). Mentor assignment — a senior electrician responsible for the apprentice\u2019s development. OJT logbook (paper or app — Elec-Mate auto-logs). College enrolment confirmation in writing. ECS card application (CSCS Trainee Electrical Operative).',
        },
      ],
    },
    {
      id: 'twenty-percent-otj',
      heading: 'Off-the-Job Training Hours',
      tocLabel: 'Off-the-Job Training Hours',
      blocks: [
        {
          type: 'paragraph',
          text: `A statutory requirement for every English apprenticeship. For starts from 1 August 2025 the apprentice must receive at least the off-the-job hours published on their standard, in paid working hours: ${OTJ_ST0152_HOURS} hours for Installation and Maintenance Electrician (ST0152), often delivered as about one day a week (${OTJ_RULE_SOURCE}). This includes college time, supervised on-site learning of new skills, attending CPD events, reading technical material, simulation work. Track every hour in the apprentice\u2019s logbook — your contract with the training provider includes audits.`,
        },
      ],
    },
    {
      id: 'retention',
      heading: 'Retention to AM2',
      tocLabel: 'Retention to AM2',
      blocks: [
        {
          type: 'paragraph',
          text: 'Apprentices leave for three reasons: bad mentorship (they\u2019re left on dead-end jobs), boredom (they\u2019re not progressing fast enough), or poor pay (a non-apprentice rate would pay more elsewhere). Mitigate by: regular structured progression conversations, rotating them through different job types, considering above-minimum-wage rates from year 2, paying for additional courses where possible. Most apprentices who reach the AM2 with strong support pass first time.',
        },
      ],
    },
    {
      id: 'next-steps',
      heading: 'Next Steps With Elec-Mate',
      tocLabel: 'Next steps',
      blocks: [
        {
          type: 'paragraph',
          text: 'Elec-Mate is built for UK electrical contractors — sole-traders through to multi-electrician firms. The Business AI tier gives you AI-powered quoting, certification, customer management, and team workflow. The Employer tier adds apprentice management, OJT tracking and JIB grading workflows.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'For electrical business owners',
          body:
            '7-day free trial of the Business AI tier — see how fast your team can quote, certify and invoice when the admin is automated. Cancel anytime.',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'Who is this guide for?',
      answer: 'This guide is written for small electrical contractors and business owners considering taking on an apprentice. The advice is practical, UK-specific, and based on 2026 regulations and market rates.',
    },
    {
      question: 'How long will it take to act on this guide?',
      answer: 'Most actionable items in this guide can be completed within 1-12 weeks. Where longer commitments are required (e.g. scheme membership, training provider partnerships), the relevant timelines are noted in the section text.',
    },
    {
      question: 'Where can I get more help?',
      answer: 'For specific advice tailored to your business, speak to: your accountant (tax, VAT, CIS), your insurance broker (PL, PI, EL), your scheme operator (NICEIC, NAPIT, ELECSA, Stroma), or your local JIB office. Elec-Mate\u2019s Business AI also has an AI specialist trained on UK electrical business operations — ask any question and get an answer instantly.',
    },
    {
      question: 'How does Elec-Mate help?',
      answer: 'Elec-Mate is the all-in-one platform for UK electrical contractors. The Business AI tier covers quoting, certification, customer management, and AI-driven business support. The Employer tier adds apprentice management and OJT tracking. 7-day free trial.',
    },
    {
      question: 'Is this guide updated for 2026?',
      answer: 'Yes — this guide reflects 2026 regulatory thresholds, scheme fees, and market rates as of May 2026. Where rules change (e.g. apprenticeship funding, VAT thresholds, CIS rates), we update annually.',
    },
    {
      question: 'What if my situation is different from the typical case?',
      answer: 'Every electrical business is different. The guide gives you the standard playbook; speak to your accountant, broker, or scheme advisor for situation-specific advice. Elec-Mate\u2019s Business AI can also answer specific scenario questions instantly.',
    },
  ],
  howToHeading: 'Five-Step Action Plan',
  howToDescription: 'A focused action plan based on the guide above.',
  howToSteps: [
    { name: 'Read the full guide above', text: 'Get familiar with every section before acting. Skim first, then read carefully — the details matter.' },
    { name: 'Identify your top priority', text: 'Most readers will have one specific area to act on first (registration, insurance, hiring, pricing). Pick one and focus there.' },
    { name: 'Take the first concrete step within 7 days', text: 'Inertia is the biggest barrier. Whether it\u2019s phoning your accountant, getting an insurance quote, or applying to a scheme — do one concrete thing this week.' },
    { name: 'Track progress in Elec-Mate', text: 'Elec-Mate\u2019s business dashboard lets you track scheme status, insurance renewal dates, apprentice progress, and quoting performance — all in one place.' },
    { name: 'Review in 90 days', text: 'Most business operations decisions need a 90-day review. Did the action work? Adjust and try the next thing.' },
  ],
  relatedPages: [
    { href: '/guides/how-to-price-eicr-as-an-electrician', title: 'How to Price EICR as an Electrician', description: 'Trade-side pricing methodology for periodic inspection work.', icon: 'PoundSterling', category: 'Guide' },
    { href: '/guides/how-to-price-consumer-unit-replacement-as-an-electrician', title: 'How to Price CU Replacement', description: 'Fair-margin pricing for consumer unit swaps.', icon: 'PoundSterling', category: 'Guide' },
    { href: '/guides/electrician-insurance-uk', title: 'Electrician Insurance UK', description: 'PL, PI, EL, Tools-in-Van — what you need.', icon: 'ShieldCheck', category: 'Guide' },
    { href: '/guides/competent-person-scheme-electrical', title: 'Competent Person Scheme', description: 'How NICEIC / NAPIT / ELECSA / Stroma membership works.', icon: 'FileCheck2', category: 'Guide' },
    { href: '/electrical-quoting-app', title: 'Electrical Quoting App', description: 'Voice-driven quoting from your phone.', icon: 'FileText', category: 'Tool' },
    { href: '/eic-certificate', title: 'EIC Certificate App', description: 'Issue Electrical Installation Certificates on your phone.', icon: 'FileCheck2', category: 'Tool' },
  ],
  ctaHeading: 'For Electrical Business Owners: Run Your Business on Elec-Mate',
  ctaSubheading:
    'Join 1,000+ UK electrical contractors using Elec-Mate to quote, certify, manage apprentices, and grow. 7-day free trial of the Business AI tier.',
};
