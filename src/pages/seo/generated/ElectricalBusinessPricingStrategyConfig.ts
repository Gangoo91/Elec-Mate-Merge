import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Electrical business owner / employer guide. Audience: electrical business owners setting their hourly rate, day rate and job pricing.
// CTA: Elec-Mate Business AI / Employer tier.
// Updated 2026-05-18.

const published = '2026-05-18';
const modified = '2026-05-18';

export const ElectricalBusinessPricingStrategyConfig: GeneratedGuideConfig = {
  pagePath: '/guides/electrical-business-pricing-strategy',
  title: 'Electrical Business Pricing Strategy — How to Set Your',
  description: 'A practical 2026 pricing strategy guide for UK electrical contractors. Calculate your true hourly cost, set a fair-margin rate…',
  datePublished: published,
  dateModified: modified,
  readingTime: 12,
  badge: 'Business Owner Guide',
  badgeIcon: 'Briefcase',
  breadcrumbLabel: 'Electrical Business Pricing Stra...',
  heroPrefix: 'Electrical Business Pricing Strategy — How to Set Your Rates:',
  heroHighlight: 'Practical 2026 Guide',
  heroSuffix: '— For UK Electrical Contractors',
  heroSubtitle:
    'A practical 2026 pricing strategy guide for UK electrical contractors. Calculate your true hourly cost, set a fair-margin rate, decide between hourly / fixed / per-point, and defend your price against pressure. This guide is for electrical business owners setting their hourly rate, day rate and job pricing.',
  keyTakeaways: [
    'Your true hourly cost (including non-chargeable time) is typically 1.4-1.6x your chargeable hourly rate.',
    'A £55/hour charge-out rate covers: scheme fees, insurance, vehicle, tools, training, holiday, sick, pension and 30% margin — IF you bill 30+ chargeable hours/week.',
    'Fixed-price by job type protects your margin against scope creep on standard work (EICR, CU swap, EV charger).',
    'Per-point pricing is industry-standard for rewires and large installs — typical UK rate £35-60 per point.',
    'Day rate pricing only works for sub-contract work — direct-to-customer day rates always lose money.',
    'Below-floor pricing is the single biggest reason electrical businesses fail.',
  ],
  sections: [
    {
      id: 'true-hourly-cost',
      heading: 'Calculate Your True Hourly Cost',
      tocLabel: 'Calculate Your True Ho...',
      blocks: [
        {
          type: 'paragraph',
          text: 'List every monthly cost: vehicle (£200-400 including fuel + insurance + depreciation), scheme fees (£40-50/month), insurance (£40-100/month), tools (£50-100/month average across the year), accountant (£50-150/month), training / CPD (£20-50/month), phone + internet (£30/month), pension (£200-400 ideally). Total typical: £700-1,300/month BEFORE you take any wages. Divide by chargeable hours (typically 30-35/week × 4 weeks = 120-140/month) to get your hourly floor.',
        },
      ],
    },
    {
      id: 'charge-out-rate',
      heading: 'Setting Your Charge-Out Rate',
      tocLabel: 'Setting Your Charge-Ou...',
      blocks: [
        {
          type: 'paragraph',
          text: 'A defensible 2026 charge-out rate for a UK self-employed electrician is £55-80/hour (excluding VAT). Below £55 you are subsidising the customer; above £80 you need either premium positioning (specialist work, exceptional reviews) or commercial / large-job pipeline. Most successful self-employed electricians charge £60-75/hour and bill 30-35 chargeable hours/week.',
        },
      ],
    },
    {
      id: 'fixed-price-vs-hourly',
      heading: 'When to Fixed-Price vs Hourly',
      tocLabel: 'When to Fixed-Price vs...',
      blocks: [
        {
          type: 'paragraph',
          text: 'Fixed-price: standard work where you know the scope (EICR, CU swap, EV charger, rewire). Hourly: unknown scope (fault-finding, callouts, undefined remedial). Per-point: large jobs where complexity scales with outlet count (rewires, commercial fit-out). NEVER quote hourly for known-scope work — customers will haggle the hours; you absorb the variance.',
        },
      ],
    },
    {
      id: 'per-point-pricing',
      heading: 'Per-Point Pricing (Rewires)',
      tocLabel: 'Per-Point Pricing (Rew...',
      blocks: [
        {
          type: 'paragraph',
          text: 'A "point" is one outlet, switch, light fitting or accessory — anything you terminate. Industry standard UK rate 2026: £35-60 per point depending on region and complexity. A typical 3-bed rewire with 50-65 points = £1,750-3,900 labour + materials. Per-point quoting protects you from scope creep ("can you also add a socket here?") because every added point is priced.',
        },
      ],
    },
    {
      id: 'day-rate',
      heading: 'Day Rate — Sub-Contract Only',
      tocLabel: 'Day Rate — Sub-Contrac...',
      blocks: [
        {
          type: 'paragraph',
          text: 'Day rate (£250-340/day for self-employed Approved Electrician) only works for sub-contract work where another contractor manages the customer relationship and absorbs scope risk. NEVER quote day rate to a homeowner — you absorb all the risk, the customer pays the cheapest day-rate, you lose money. Day rate sub-contract is fine as a way to fill quiet weeks; not as the basis of your business.',
        },
      ],
    },
    {
      id: 'defending-price',
      heading: 'Defending Your Price',
      tocLabel: 'Defending Your Price',
      blocks: [
        {
          type: 'paragraph',
          text: 'When customers haggle, the answer is not to discount. The answer is to explain what they\u2019re paying for: scheme membership, insurance, calibrated test kit, certificate liability, BS 7671 compliance, warranty. "I\u2019m the cheapest because…" is always a red flag for the customer — explain why your price is what it is, not why it should be lower. If they walk on price, they were never your customer.',
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
      answer: 'This guide is written for electrical business owners setting their hourly rate, day rate and job pricing. The advice is practical, UK-specific, and based on 2026 regulations and market rates.',
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
    { href: '/tools/electrical-quoting-app', title: 'Electrical Quoting App', description: 'Voice-driven quoting from your phone.', icon: 'FileText', category: 'Tool' },
    { href: '/eic-certificate', title: 'EIC Certificate App', description: 'Issue Electrical Installation Certificates on your phone.', icon: 'FileCheck2', category: 'Tool' },
  ],
  ctaHeading: 'For Electrical Business Owners: Run Your Business on Elec-Mate',
  ctaSubheading:
    'Join 1,000+ UK electrical contractors using Elec-Mate to quote, certify, manage apprentices, and grow. 7-day free trial of the Business AI tier.',
};
