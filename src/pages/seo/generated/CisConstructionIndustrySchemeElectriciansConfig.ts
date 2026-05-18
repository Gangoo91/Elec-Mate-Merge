import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Electrical business owner / employer guide. Audience: self-employed electricians doing any sub-contract work.
// CTA: Elec-Mate Business AI / Employer tier.
// Updated 2026-05-18.

const published = '2026-05-18';
const modified = '2026-05-18';

export const CisConstructionIndustrySchemeElectriciansConfig: GeneratedGuideConfig = {
  pagePath: '/guides/cis-construction-industry-scheme-electricians',
  title: 'CIS for Electricians — The 2026 Guide — Practical 2026 Guide',
  description: 'The Construction Industry Scheme (CIS) is the HMRC system for deducting tax at source from construction sub-contractors — including electricians.',
  datePublished: published,
  dateModified: modified,
  readingTime: 12,
  badge: 'Business Owner Guide',
  badgeIcon: 'Briefcase',
  breadcrumbLabel: 'CIS for Electricians — The 2026 ...',
  heroPrefix: 'CIS for Electricians — The 2026 Guide:',
  heroHighlight: 'Practical 2026 Guide',
  heroSuffix: '— For UK Electrical Contractors',
  heroSubtitle:
    'The Construction Industry Scheme (CIS) is the HMRC system for deducting tax at source from construction sub-contractors — including electricians. This guide covers registration, 20% vs 30% deduction rates, monthly returns, and what happens if you ignore it. This guide is for self-employed electricians doing any sub-contract work.',
  keyTakeaways: [
    'CIS applies to any electrician doing sub-contract work for another contractor — even an occasional day-rate shift.',
    'Registered sub-contractors are deducted at 20%; unregistered at 30%.',
    'Gross Payment Status (no deduction) is available after 12 months of CIS compliance + £30k+ annual turnover.',
    'Contractors must verify you with HMRC before paying — this is automatic if your CIS registration is current.',
    'CIS deductions are credited against your annual self-assessment tax bill — most electricians get a refund at year-end.',
    'Ignoring CIS means 30% deductions every job — significant cashflow drag.',
  ],
  sections: [
    {
      id: 'what-is-cis',
      heading: 'What CIS Is and Why It Exists',
      tocLabel: 'What CIS Is and Why It...',
      blocks: [
        {
          type: 'paragraph',
          text: 'CIS (Construction Industry Scheme) is HMRC\u2019s tax-at-source system for construction sub-contractors, introduced 1971 and reformed several times since. The contractor (the main builder, electrical contractor or principal) deducts tax from your invoice before paying you. HMRC then credits the deduction against your annual tax bill. It exists because historically construction sub-contractors had a high rate of self-assessment non-compliance.',
        },
      ],
    },
    {
      id: 'who-applies',
      heading: 'Who CIS Applies To',
      tocLabel: 'Who CIS Applies To',
      blocks: [
        {
          type: 'paragraph',
          text: 'Any electrician who: works as a sub-contractor for another contractor on construction work (defined broadly — includes most electrical install work on building sites), is paid through CIS-recognised contracts, is not on PAYE for that contractor. Domestic small jobs direct to a homeowner are NOT CIS work. Doing the occasional day at a commercial site for another sparky IS CIS work.',
        },
      ],
    },
    {
      id: 'registration',
      heading: 'Registering with CIS',
      tocLabel: 'Registering with CIS',
      blocks: [
        {
          type: 'paragraph',
          text: 'Register via the HMRC online service (gov.uk/register-cis-subcontractor). You need: your Unique Taxpayer Reference (UTR), National Insurance number, bank details for refunds. Registration is free. Without CIS registration you are deducted at 30% — registration drops this to 20%. Takes 1-2 weeks for HMRC to process.',
        },
      ],
    },
    {
      id: 'gross-payment-status',
      heading: 'Gross Payment Status (No Deductions)',
      tocLabel: 'Gross Payment Status (...',
      blocks: [
        {
          type: 'paragraph',
          text: 'After 12 months of CIS compliance + £30,000+ annual turnover, you can apply for Gross Payment Status. Approved sub-contractors are paid in full with no deductions — you settle the tax at year-end through self-assessment. Significant cashflow improvement. Apply via HMRC online service. HMRC reviews compliance annually — late returns or unpaid tax revokes Gross Payment Status.',
        },
      ],
    },
    {
      id: 'monthly-returns',
      heading: 'Monthly CIS Returns (For Contractors)',
      tocLabel: 'Monthly CIS Returns (F...',
      blocks: [
        {
          type: 'paragraph',
          text: 'If you are a contractor (i.e. hiring sub-contractors), you must file a monthly CIS return to HMRC by the 19th of each month, listing every sub-contractor paid and the deduction made. Late returns: £100 fine + escalating fines. Submit via HMRC online service or via your accountant. Most electrical companies hiring even one sub-contractor have monthly CIS returns alongside PAYE.',
        },
      ],
    },
    {
      id: 'year-end-reconciliation',
      heading: 'Year-End Reconciliation',
      tocLabel: 'Year-End Reconciliation',
      blocks: [
        {
          type: 'paragraph',
          text: 'Your CIS deductions appear on your self-assessment tax return as tax already paid. If you\u2019ve been deducted £8,000 across the year and your total tax liability is £6,000, you get a £2,000 refund. Many electricians under-claim because they don\u2019t track CIS deductions properly — keep the CIS payment-and-deduction statements from every contractor. Reconcile at year-end.',
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
      answer: 'This guide is written for self-employed electricians doing any sub-contract work. The advice is practical, UK-specific, and based on 2026 regulations and market rates.',
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
