import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Electrical business owner / employer guide. Audience: self-employed electricians and small electrical business owners approaching VAT registration.
// CTA: Elec-Mate Business AI / Employer tier.
// Updated 2026-05-18.

const published = '2026-05-18';
const modified = '2026-05-18';

export const ElectricalContractorVatGuideConfig: GeneratedGuideConfig = {
  pagePath: '/guides/electrical-contractor-vat-guide',
  title: 'VAT for Electrical Contractors — The 2026 Guide — Practical',
  description: 'A practical VAT guide for UK electrical contractors in 2026. When you must register, when you should register voluntarily…',
  datePublished: published,
  dateModified: modified,
  readingTime: 12,
  badge: 'Business Owner Guide',
  badgeIcon: 'Briefcase',
  breadcrumbLabel: 'VAT for Electrical Contractors —...',
  heroPrefix: 'VAT for Electrical Contractors — The 2026 Guide:',
  heroHighlight: 'Practical 2026 Guide',
  heroSuffix: '— For UK Electrical Contractors',
  heroSubtitle:
    'A practical VAT guide for UK electrical contractors in 2026. When you must register, when you should register voluntarily, how the Domestic Reverse Charge affects your invoicing, and the Flat Rate vs Standard Rate decision. This guide is for self-employed electricians and small electrical business owners approaching VAT registration.',
  keyTakeaways: [
    'VAT registration is mandatory once your rolling 12-month turnover exceeds £90,000 (2026 threshold).',
    'Voluntary registration below £90k can recover input VAT — useful if you have high tools / material spend.',
    'The Domestic Reverse Charge applies to most construction sub-contract work — you do NOT charge VAT on the invoice; the customer accounts for it.',
    'Standard VAT rate is 20%; some installations (energy-saving) attract 0% or 5% in specific circumstances.',
    'The Flat Rate Scheme simplifies VAT for small businesses but is often less efficient than Standard Rate for electricians.',
    'Get an accountant familiar with construction VAT before deciding — wrong invoices to wrong customers create £10k+ tax problems.',
  ],
  sections: [
    {
      id: 'when-to-register',
      heading: 'When You Must Register for VAT',
      tocLabel: 'When You Must Register...',
      blocks: [
        {
          type: 'paragraph',
          text: 'The mandatory threshold for VAT registration is £90,000 of taxable turnover in any rolling 12-month period (2026). The clock starts the moment your 12-month turnover crosses £90k — you have 30 days to register from the END of the month you crossed. Late registration: HMRC backdates and you owe VAT on every invoice you should have charged it on. Use accounting software (Xero, FreeAgent, QuickBooks) that warns you as you approach.',
        },
      ],
    },
    {
      id: 'voluntary-registration',
      heading: 'Voluntary Registration Below £90k',
      tocLabel: 'Voluntary Registration...',
      blocks: [
        {
          type: 'paragraph',
          text: 'You can register voluntarily below the threshold. Benefits: recover input VAT on tools, vehicles, materials, scheme fees, insurance, training. Drawbacks: you must charge VAT on every invoice — customer-pay sole traders (domestic homeowners) absorb this as extra cost. Worth doing if: majority of customers are VAT-registered (commercial), high material / tool spend, planning to grow quickly past £90k anyway.',
        },
      ],
    },
    {
      id: 'domestic-reverse-charge',
      heading: 'Domestic Reverse Charge — Critical for Sub-Contractors',
      tocLabel: 'Domestic Reverse Charg...',
      blocks: [
        {
          type: 'paragraph',
          text: 'Since March 2021, the Domestic Reverse Charge (DRC) applies to most construction services between VAT-registered businesses. If you sub-contract to another VAT-registered electrical contractor: you do NOT charge VAT on the invoice. You write "Reverse charge: customer to pay VAT to HMRC" on the invoice and the customer accounts for the VAT. Get this wrong and you and your customer both face penalties. Direct-to-end-customer work is NOT under DRC — normal VAT applies.',
        },
      ],
    },
    {
      id: 'vat-rates',
      heading: 'VAT Rates — Standard, Reduced, Zero',
      tocLabel: 'VAT Rates — Standard, ...',
      blocks: [
        {
          type: 'paragraph',
          text: 'Standard rate: 20% — applies to most electrical work. Reduced rate: 5% — applies to energy-saving installations in residential dwellings (solar PV, ground source heat pumps, certain insulation), but only when supplied + fitted by the same VAT-registered contractor (not material-only). Zero rate: applies to limited cases (e.g. new-build construction in some circumstances). Get specific advice for every job — wrong rate creates VAT problems later.',
        },
      ],
    },
    {
      id: 'flat-rate-scheme',
      heading: 'Flat Rate Scheme — Simpler, Often Less Efficient',
      tocLabel: 'Flat Rate Scheme — Sim...',
      blocks: [
        {
          type: 'paragraph',
          text: 'Designed for small businesses, the Flat Rate Scheme lets you pay a fixed percentage of your turnover (typically 9.5% for construction trades) to HMRC, with no input VAT recovery. Simpler to administer. Often less efficient for electrical contractors because: input VAT on tools, materials, scheme fees, training and vehicles is significant. Most electrical contractors are better off on the Standard Rate Scheme.',
        },
      ],
    },
    {
      id: 'getting-help',
      heading: 'Get an Accountant Before Registering',
      tocLabel: 'Get an Accountant Befo...',
      blocks: [
        {
          type: 'paragraph',
          text: 'VAT is the single most common reason electrical contractors get into tax trouble. Get an accountant familiar with construction VAT before your first VAT return. Typical cost: £500-1,500/year for a small electrical business. They will: set up your Making Tax Digital (MTD) software, manage your quarterly VAT returns, advise on DRC, optimise the Flat Rate vs Standard decision, and represent you if HMRC investigates.',
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
      answer: 'This guide is written for self-employed electricians and small electrical business owners approaching VAT registration. The advice is practical, UK-specific, and based on 2026 regulations and market rates.',
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
