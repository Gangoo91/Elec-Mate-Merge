import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';
import { OTJ_HOURS_FLOOR, OTJ_RULE_SOURCE, OTJ_ST0152_HOURS } from '@/data/otjStandards';

// Off-The-Job (OTJ) Training Hours Tracking — Apprentice Guide — apprentice / electrician / employer content.
// Updated 2026-05-18.

const published = '2026-05-18';
const modified = '2026-10-10';

export const OffTheJobTrainingHoursTrackingConfig: GeneratedGuideConfig = {
  pagePath: '/guides/off-the-job-training-hours-tracking',
  title: 'OTJ Training Hours Tracking: Apprentice Guide',
  description: 'A practical guide to off-the-job (OTJ) training hour tracking for UK electrical apprentices. What counts, what doesn\u2019t, the minimum hours for your standard…',
  datePublished: published,
  dateModified: modified,
  readingTime: 11,
  badge: 'Apprenticeship',
  badgeIcon: 'ClipboardCheck',
  breadcrumbLabel: 'Off-The-Job (OTJ) Training Hours...',
  heroPrefix: 'Off-The-Job (OTJ) Training Hours Tracking — Apprentice Guide:',
  heroHighlight: 'Complete 2026 Guide',
  heroSuffix: '— For UK Electrical Trade',
  heroSubtitle:
    'A practical guide to off-the-job (OTJ) training hour tracking for UK electrical apprentices. What counts, what doesn\u2019t, the minimum hours for your standard, and how to keep evidence your provider can rely on. This guide is for electrical apprentices logging their off-the-job training hours.',
  keyTakeaways: [
    `OTJ training is a statutory part of every apprenticeship. For starts from 1 August 2025 the minimum is the number of hours published on your standard: ${OTJ_ST0152_HOURS} for ST0152 (${OTJ_RULE_SOURCE}).`,
    'What counts: college day, supervised on-site learning of new skills, CPD events, reading technical material, simulation work, online courses.',
    'What does NOT count: regular productive work, repeating known tasks, lunch breaks, travel time to college.',
    'Track every hour with: activity, duration, what was learned, who supervised — typically logged weekly.',
    'Your provider must evidence the OTJ hours delivered; funds are at risk of recovery from the provider if the policy is not met (DfE funding rules 2026 to 2027, rule 82.4).',
    'Elec-Mate\u2019s apprentice tier includes a built-in OJT logger that auto-categorises activities.',
  ],
  sections: [
    {
      id: 'what-is-otj',
      heading: 'What OTJ Training Is and Why It Exists',
      tocLabel: 'What OTJ Training Is and ...',
      blocks: [
        {
          type: 'paragraph',
          text: 'Off-the-Job (OTJ) training is the formal learning component of the Apprenticeship Standard — distinct from on-the-job productive work. It exists because an apprenticeship is a training programme, not a cheap labour scheme. For apprenticeships starting from 1 August 2025 the Department for Education sets the minimum as a fixed number of OTJ hours published on each standard, delivered in paid working hours. With day release that is often about one day a week, though it can be distributed differently.',
        },
      ],
    },
    {
      id: 'what-counts',
      heading: 'What Counts as OTJ',
      tocLabel: 'What Counts as OTJ',
      blocks: [
        {
          type: 'paragraph',
          text: 'Activities that count: scheduled college days (full days credited). Supervised learning of new skills on site (e.g. shadowing a more experienced electrician on first-time work). CPD events / conferences. Reading technical material (BS 7671, IET On-Site Guide, manufacturer guides). Simulation / bench work practising new techniques. Online courses (manufacturer product training, scheme-led CPD). Time with your mentor reviewing your portfolio.',
        },
      ],
    },
    {
      id: 'what-doesnt-count',
      heading: 'What Does NOT Count',
      tocLabel: 'What Does NOT Count',
      blocks: [
        {
          type: 'paragraph',
          text: 'Activities that do NOT count: regular productive work where you are doing the same task you can already do. Repeating routine jobs. Travel time to and from college / site. Lunch breaks and rest periods. Statutory holidays. Sick days. Time spent fixing your own mistakes on existing work. Be honest in your log — overstating OTJ is the single biggest reason apprentices get pulled up at audit.',
        },
      ],
    },
    {
      id: 'minimum-20-percent',
      heading: 'The Minimum Hours Rule',
      tocLabel: 'The Minimum Hours Rule',
      blocks: [
        {
          type: 'paragraph',
          text: `For starts from 1 August 2025 the minimum is a total for the whole programme, published on the front of each standard: ${OTJ_ST0152_HOURS} hours for Installation and Maintenance Electrician (ST0152). It is reduced only for relevant prior learning and can never go below ${OTJ_HOURS_FLOOR} hours (${OTJ_RULE_SOURCE}). Apprenticeships that started earlier keep the old rule: 20% of normal working hours capped at 30 a week, an average of 6 hours a week. The hours can be front-loaded, spread evenly, or block-released. Confirm your specific arrangement with your training provider.`,
        },
      ],
    },
    {
      id: 'logging-evidence',
      heading: 'Logging Your OTJ Evidence',
      tocLabel: 'Logging Your OTJ Evidence',
      blocks: [
        {
          type: 'paragraph',
          text: 'For every OTJ activity, record: date, activity description (specific — not "training"), duration, what was learned (the new skill or knowledge), who supervised. Most colleges supply a paper logbook; many apprentices supplement with an app for ease of use. Submit weekly to your tutor. Get the supervisor / mentor / tutor signature where possible — un-signed evidence is harder to defend in an audit.',
        },
      ],
    },
    {
      id: 'use-elec-mate',
      heading: 'Use Elec-Mate\u2019s OJT Logger',
      tocLabel: 'Use Elec-Mate\u2019s OJT ...',
      blocks: [
        {
          type: 'paragraph',
          text: 'The Elec-Mate apprentice tier includes a built-in OTJ hour logger. Auto-categorises activities (college, supervised learning, CPD, reading, simulation). Pre-populates from your calendar. Generates the report your tutor and training provider expect. Tutor dashboard view so your college can see your progress in real time. 7-day free trial — see how much faster OTJ logging is on a phone.',
        },
      ],
    },
    {
      id: 'study-with-elec-mate',
      heading: 'Use Elec-Mate to Track and Study',
      tocLabel: 'Elec-Mate',
      blocks: [
        {
          type: 'paragraph',
          text: 'Elec-Mate is built for UK electrical apprentices, qualified electricians, and business owners. Unit revision, AM2 mocks, OJT tracking, quoting, certification — all in one place. 7-day free trial.',
        },
      ],
    },
  ],
  faqs: [
    { question: 'Who is this guide for?', answer: 'This guide is written for electrical apprentices logging their off-the-job training hours. The advice is practical, UK-specific, and based on current 2026 regulations.' },
    { question: 'How does Elec-Mate help with this?', answer: 'Elec-Mate covers every part of the UK electrical apprentice + electrician journey. Unit revision, AM2 mocks, OTJ tracking, quoting, certification, scheme paperwork. 7-day free trial.' },
    { question: 'Is the content updated for 2026?', answer: 'Yes — every page reflects 2026 regulatory thresholds, scheme fees, and market rates as of May 2026. We update annually as rules change.' },
    { question: 'What if I need specific advice for my situation?', answer: 'Speak to: your college tutor (apprentices), your scheme operator (NICEIC, NAPIT, ELECSA, Stroma for qualified electricians), your accountant (for business owners). Elec-Mate\u2019s AI specialist can also answer specific scenario questions instantly.' },
    { question: 'How long does it take to act on this guide?', answer: 'Most actionable items can be completed within 1-12 weeks. Longer commitments (qualification, scheme membership) are noted explicitly in the text.' },
    { question: 'Where can I find more guides like this?', answer: 'See our full apprentice + qualification hub at elec-mate.com/guides — every unit revision page, AM2 deep-dive, year-by-year plan, and business owner guide is indexed there.' },
  ],
  howToHeading: 'Five-Step Action Plan',
  howToDescription: 'Based on the guide above.',
  howToSteps: [
    { name: 'Read the full guide above', text: 'Get familiar with every section. Details matter — skim then read carefully.' },
    { name: 'Identify your priority', text: 'Pick the single most important action for your situation today.' },
    { name: 'Take a concrete step within 7 days', text: 'Inertia is the biggest barrier. Do ONE concrete thing this week.' },
    { name: 'Track progress in Elec-Mate', text: 'Use the Elec-Mate dashboard for the relevant tier (apprentice, electrician, business owner).' },
    { name: 'Review in 90 days', text: 'Most decisions need a 90-day review. Did it work? Adjust and try the next thing.' },
  ],
  relatedPages: [
    {
      href: '/guides/electrical-apprentice-year-1-revision-plan',
      title: 'Year 1 Revision Plan',
      description: 'Related guide for electrical apprentices logging their off-the-job training hours.',
      icon: 'GraduationCap',
      category: 'Guide',
    },
    {
      href: '/guides/finding-an-electrical-apprenticeship-uk',
      title: 'Finding an Apprenticeship',
      description: 'Related guide for electrical apprentices logging their off-the-job training hours.',
      icon: 'GraduationCap',
      category: 'Guide',
    },
    {
      href: '/guides/how-to-hire-an-electrical-apprentice',
      title: 'How to Hire (Employer)',
      description: 'Related guide for electrical apprentices logging their off-the-job training hours.',
      icon: 'Briefcase',
      category: 'Guide',
    },
    {
      href: '/guides/apprentice-electrician-salary',
      title: 'Apprentice Salary',
      description: 'Related guide for electrical apprentices logging their off-the-job training hours.',
      icon: 'PoundSterling',
      category: 'Guide',
    },
    {
      href: '/guides/cg-2365-vs-5357-vs-2366',
      title: 'Qualification Comparison',
      description: 'Related guide for electrical apprentices logging their off-the-job training hours.',
      icon: 'GraduationCap',
      category: 'Guide',
    },
    {
      href: '/guides/am2-exam-tips',
      title: 'AM2 Exam Tips',
      description: 'Related guide for electrical apprentices logging their off-the-job training hours.',
      icon: 'GraduationCap',
      category: 'Guide',
    },
  ],
  ctaHeading: 'Start Free with Elec-Mate',
  ctaSubheading:
    'Join 1,000+ UK electrical apprentices, electricians, and business owners using Elec-Mate. 7-day free trial.',
};
