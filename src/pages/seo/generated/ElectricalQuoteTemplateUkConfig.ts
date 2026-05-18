import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Electrical business owner / employer guide. Audience: self-employed electricians and small contractors writing customer quotes.
// CTA: Elec-Mate Business AI / Employer tier.
// Updated 2026-05-18.

const published = '2026-05-18';
const modified = '2026-05-18';

export const ElectricalQuoteTemplateUkConfig: GeneratedGuideConfig = {
  pagePath: '/guides/electrical-quote-template-uk',
  title: 'Electrical Quote Template UK — How to Quote Like a Pro',
  description: 'A practical template + walk-through for electrical contractors writing professional customer quotes.',
  datePublished: published,
  dateModified: modified,
  readingTime: 12,
  badge: 'Business Owner Guide',
  badgeIcon: 'Briefcase',
  breadcrumbLabel: 'Electrical Quote Template UK — H...',
  heroPrefix: 'Electrical Quote Template UK — How to Quote Like a Pro:',
  heroHighlight: 'Practical 2026 Guide',
  heroSuffix: '— For UK Electrical Contractors',
  heroSubtitle:
    'A practical template + walk-through for electrical contractors writing professional customer quotes. Covers structure, line-itemisation, variation clauses, payment terms, and how to defend the price against haggling. This guide is for self-employed electricians and small contractors writing customer quotes.',
  keyTakeaways: [
    'A defensible quote is itemised, in writing, signed and dated, and includes a clear scope + exclusions.',
    'Always quote materials at retail+ (25-40% markup typical), never at trade cost — your time finding + supplying materials has value.',
    'Include certification (EIC / MWC / EICR) as a line item — never give it away.',
    'Variation clause: anything outside the scope is priced separately and acknowledged before work proceeds.',
    'Payment terms: typical is 30 days, but consider 14 or 7 for new customers, with progress payments on large jobs.',
    'The Elec-Mate quote tool generates a fully itemised PDF quote in under two minutes.',
  ],
  sections: [
    {
      id: 'header-info',
      heading: 'Quote Header — What Must Be on Every Quote',
      tocLabel: 'Quote Header — What Mu...',
      blocks: [
        {
          type: 'paragraph',
          text: 'Your business name (legal entity name), your address, your scheme membership numbers (NICEIC / NAPIT) with logos, VAT number if registered, contact email + phone. The customer\u2019s name and address. A unique quote reference number (e.g. EM2026-101). Date of quote and a "Valid until" date (typically 30 days — prices change with copper, scheme fees, fuel).',
        },
      ],
    },
    {
      id: 'scope',
      heading: 'Scope of Work',
      tocLabel: 'Scope of Work',
      blocks: [
        {
          type: 'paragraph',
          text: 'The single most important section. Write what you WILL do, not what you might do. Be specific: "Install one new 32A radial circuit from the consumer unit to a single 32A outdoor socket on the rear of the property, including chase + plaster patching to be done by others, RCD protection, and Electrical Installation Certificate." Vague scope ("install garden socket") guarantees scope creep + arguments later.',
        },
      ],
    },
    {
      id: 'line-items',
      heading: 'Line-by-Line Itemisation',
      tocLabel: 'Line-by-Line Itemisation',
      blocks: [
        {
          type: 'paragraph',
          text: 'Every line is a separate cost. Materials at retail+ (25-40% markup). Labour at your hourly rate × estimated hours, or fixed-price by job type. Travel / setup time as a separate line. Certification as a separate line. Scheme notification fee (often included in cert line). Waste removal if applicable. NOT a single "Total: £450" — that invites haggling and reveals nothing about value.',
        },
      ],
    },
    {
      id: 'exclusions',
      heading: 'Exclusions — What is NOT in the Price',
      tocLabel: 'Exclusions — What is N...',
      blocks: [
        {
          type: 'paragraph',
          text: 'Almost as important as the scope. Standard exclusions: "Plaster patching by others. Decoration / paintwork. Removal of furniture / fixtures. Disposal of any asbestos or hazardous materials. Building control variations beyond the scope above. Customer-supplied materials warranty." Get customers to acknowledge the exclusions before signing.',
        },
      ],
    },
    {
      id: 'variation-clause',
      heading: 'Variation Clause',
      tocLabel: 'Variation Clause',
      blocks: [
        {
          type: 'paragraph',
          text: 'Word this exactly: "Any variations to the agreed scope will be priced separately at £[your hourly rate]/hour plus materials at retail+25% or fixed-price quote by agreement. No variations will commence without written customer approval." This is the line that protects you from "while you\u2019re here, can you also do…"',
        },
      ],
    },
    {
      id: 'payment-terms',
      heading: 'Payment Terms',
      tocLabel: 'Payment Terms',
      blocks: [
        {
          type: 'paragraph',
          text: 'New customer: deposit (e.g. 25% on acceptance), balance on completion. Repeat customer: 30 days net. Large jobs (£3k+): progress payments at agreed milestones. Always offer multiple payment methods (bank transfer, card via Stripe link, cheque, cash — but write down everything). State your late-payment policy: typical "Late payment over 30 days will accrue interest at 8% + base rate per the Late Payment Act."',
        },
      ],
    },
    {
      id: 'use-elec-mate',
      heading: 'Use the Elec-Mate Quote Tool',
      tocLabel: 'Use the Elec-Mate Quot...',
      blocks: [
        {
          type: 'paragraph',
          text: 'Elec-Mate generates a fully itemised PDF quote in under two minutes from voice or text input. Includes: your scheme logo, customer details, scope, line items with retail+ pricing, exclusions, variation clause, payment terms, and a one-click acceptance link. Used by 1,000+ UK electricians for every quote.',
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
      answer: 'This guide is written for self-employed electricians and small contractors writing customer quotes. The advice is practical, UK-specific, and based on 2026 regulations and market rates.',
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
