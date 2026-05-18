import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// "How to Price Kitchen Rewire as an Electrician" — trade-side pricing guide for
// self-employed UK electricians. NOT a homeowner cost page. Frames pricing as
// fair-margin survival, not race-to-the-bottom.
// Updated 2026-05-18.

const published = '2026-05-18';
const modified = '2026-05-18';

export const howToPriceKitchenRewireConfig: GeneratedGuideConfig = {
  pagePath: '/guides/how-to-price-kitchen-rewire-as-an-electrician',
  title: 'How to Price Kitchen Rewire as an Electrician — UK 2026',
  description: 'How much should you charge for kitchen rewire as a UK electrician in 2026? Fair-margin pricing, what to include…',
  datePublished: published,
  dateModified: modified,
  readingTime: 9,
  badge: 'Trade Pricing Guide',
  badgeIcon: 'PoundSterling',
  breadcrumbLabel: 'How to Price Kitchen Rewire',
  heroPrefix: 'How to Price',
  heroHighlight: 'Kitchen Rewire',
  heroSuffix: 'as an Electrician — UK 2026',
  heroSubtitle:
    'A practical pricing guide for self-employed UK electricians and small contractors. Whether you are new to kitchen rewire or you have been pricing them for years, this guide gives you the fair-margin bands, what to include in every quote, the regulatory background, and the mistakes that quietly destroy your margin. Designed for electricians quoting kitchen-specific rewiring.',
  keyTakeaways: [
    'Typical fair-margin price for kitchen rewire: ££1,400–2,800 (typical kitchen refurb: sockets, hob, oven, dishwasher, lighting, extractor) in 2026. Minimum floor £1200; top end £5500.',
    'Target hourly rate for electricians quoting kitchen-specific rewiring: £55–75 (excluding VAT). Below this band you are subsidising the customer.',
    'Regulatory references: BS 7671:2018+A4:2026 (cooker circuit, ring vs radial, RCD protection), Building Regs Part P.',
    'Always quote the certification (EIC / MWC / specific) as a deliverable — never include it as a freebie. Without the certificate your work is not legally valid.',
    'Below-market quotes from competitors usually mean missing insurance, missing scheme membership, missing test sweep, or missing certificate. Educate clients, don\u2019t race to the bottom.',
    'Your scheme fee (~£500/year), professional indemnity (~£500–1,000/year), calibrated test kit (~£1,200 every 3–5 years) and ongoing CPD are all real costs that justify the band.',
  ],
  sections: [
    {
      id: 'fair-margin-pricing',
      heading: 'Fair-Margin Pricing for Kitchen Rewire',
      tocLabel: 'Fair-margin pricing',
      blocks: [
        {
          type: 'paragraph',
          text: 'The UK electrical trade is being squeezed by aggregator platforms, race-to-the-bottom quoting, and customers who treat compliance as a commodity. This page is on the side of electricians quoting kitchen-specific rewiring. The bands below assume you are a scheme-registered electrician (NICEIC, NAPIT, ELECSA or Stroma) carrying current professional indemnity insurance, calibrated test equipment and the relevant regulatory currency.',
        },
        {
          type: 'list',
          ordered: false,
          items: [
            'Minimum sustainable price: £1200 — below this you are paying the customer to do their work',
            'Typical fair-margin band: ££1,400–2,800 (typical kitchen refurb: sockets, hob, oven, dishwasher, lighting, extractor)',
            'Top end of range (complex / commercial / time-critical): £5500',
            'Target hourly rate: £55–75 excluding VAT',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Why these numbers exist',
          body:
            'Every NICEIC / NAPIT scheme-registered electrician carries: scheme fees (~£500/year), professional indemnity (~£500–1,000/year), calibrated MFT (~£1,200 every 3–5 years), van + tools, ongoing CPD, and personal liability on every certificate signed. If you price below the floor, you are not earning a margin — you are subsidising the customer and accepting unbounded liability.',
        },
      ],
    },
    {
      id: 'what-to-include',
      heading: 'What Must Be Included in the Quote',
      tocLabel: 'What to include',
      blocks: [
        {
          type: 'paragraph',
          text: 'A defensible quote for kitchen rewire should explicitly itemise every line. Below is the list electricians quoting kitchen-specific rewiring should be tracking on every job, with critical line items called out:',
        },
        {
          type: 'list',
          ordered: false,
          items: [
            'Cooker circuit is the biggest cost driver — 32A or 40A radial, depending on hob/oven combined rating',
            'Under-counter sockets need IPX4 in zones near sinks under Section 528 / kitchen-specific guidance',
            'Dishwasher / washing machine spurs from a ring or radial — confirm with the load calc',
            'LED downlighter installations need fire hoods if in a ceiling void — add to material cost',
            'Coordinate with the kitchen fitter on first-fix vs second-fix sequencing',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Quote with confidence — itemise everything',
          body:
            'Elec-Mate generates fully itemised quotes for kitchen rewire in two minutes. Every line item, every certificate, every variation — clear pricing the client cannot haggle. 7-day free trial.',
        },
      ],
    },
    {
      id: 'common-mistakes',
      heading: 'Common Pricing Mistakes',
      tocLabel: 'Common mistakes',
      blocks: [
        {
          type: 'paragraph',
          text: 'These are the most common pricing mistakes electricians quoting kitchen-specific rewiring make on kitchen rewire. Each one quietly eats your margin until you are working for less than minimum wage:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Quoting before final kitchen layout is confirmed — appliance positions change everything',
            'Including extractor wiring as \'standard\' — many extractors need dedicated isolation point',
            'Forgetting that an island socket installation requires safety considerations not relevant in a standard kitchen',
          ],
        },
      ],
    },
    {
      id: 'regulatory-background',
      heading: 'Regulatory Background You Need to Quote Around',
      tocLabel: 'Regulatory background',
      blocks: [
        {
          type: 'paragraph',
          text: 'Pricing without understanding the regulatory requirements is how electricians end up doing extra work for free. The relevant references for kitchen rewire are: BS 7671:2018+A4:2026 (cooker circuit, ring vs radial, RCD protection), Building Regs Part P. Quoting must factor in: time on-site, certification time, scheme-notification time, and any DNO coordination required.',
        },
        {
          type: 'paragraph',
          text: 'BS 7671:2018+A4:2026 (the 18th Edition published 15 April 2026) is the current standard. Any quote that does not factor in current A4:2026 requirements — including AFDDs in HMOs, updated SPD thresholds, and the new Schedule of Tests columns — is under-quoting on certified-compliance work.',
        },
      ],
    },
    {
      id: 'using-elec-mate-to-quote',
      heading: 'Using Elec-Mate to Quote Kitchen Rewire',
      tocLabel: 'Quote with Elec-Mate',
      blocks: [
        {
          type: 'paragraph',
          text: 'Elec-Mate is built for electricians quoting kitchen-specific rewiring. The pricing engine handles: line-item quoting, customer-facing PDF quotes, materials lookups with retail+ markup, certification (EIC, EICR, Minor Works) for the job, and direct payment links. Quote kitchen rewire in two minutes from your phone on site.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'For electricians: stop under-pricing your work',
          body:
            'Join 1,000+ UK electricians using Elec-Mate to quote kitchen rewire at fair-margin prices, issue compliant certificates, and get paid faster. 7-day free trial.',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'How much should I charge for kitchen rewire as a UK electrician?',
      answer: 'Fair-margin pricing for kitchen rewire in 2026 sits at ££1,400–2,800 (typical kitchen refurb: sockets, hob, oven, dishwasher, lighting, extractor) for a scheme-registered electrician. The minimum sustainable floor is £1200; complex / commercial / time-critical jobs reach £5500. Below the floor you are subsidising the customer.',
    },
    {
      question: 'What hourly rate should I target for kitchen rewire?',
      answer: 'Target £55–75/hour for electricians quoting kitchen-specific rewiring doing kitchen rewire in 2026 (excluding VAT). This rate covers scheme fees, professional indemnity, calibrated test equipment, van + tools, CPD and personal liability — the costs that come with being a competent person.',
    },
    {
      question: 'Why do some electricians quote much lower than this band?',
      answer: 'Lower quotes typically mean: missing insurance, missing scheme registration, certificate being skipped, test sweep being skipped, or the work being done by an unqualified person. The cheaper price reflects missing safety + compliance work, not better efficiency. Educate the customer rather than racing to the bottom.',
    },
    {
      question: 'What certificate should I issue for kitchen rewire?',
      answer: 'The relevant certificate depends on the work: full installation = Electrical Installation Certificate (EIC), single circuit alteration = Minor Works Certificate (MWC), periodic inspection = Electrical Installation Condition Report (EICR). For kitchen rewire, the typical deliverable is documented in your scheme operator\u2019s guidance and bundled into the price.',
    },
    {
      question: 'How do I quote kitchen rewire from my phone on site?',
      answer: 'Elec-Mate generates itemised quotes for kitchen rewire in two minutes on a mobile phone. Voice-driven quoting, materials lookup, scheme-compliant pricing, certificate generation, and customer-payable PDF output all happen on the device. 7-day free trial.',
    },
    {
      question: 'Should I price kitchen rewire per hour or fixed?',
      answer: 'Fixed-price for predictable scope (defined number of circuits / outlets / fittings). Hourly for unpredictable scope (fault-finding, emergency callout, undefined remedial). Mixed for jobs with a known fixed element plus possible variations — always quote the fixed element and add a variation clause for extras.',
    },
  ],
  howToHeading: 'A Repeatable Quoting Process for Kitchen Rewire',
  howToDescription:
    'Use this five-step process every time you quote kitchen rewire to ensure you protect your margin and the customer gets a fair, defensible price.',
  howToSteps: [
    {
      name: 'Survey the job before quoting',
      text: 'Either on-site or via phone photos: identify scope, complexity, access, current condition, and any remedial work likely. Never quote off a verbal brief alone.',
    },
    {
      name: 'Itemise every line in writing',
      text: 'Materials at retail+, labour at your hourly rate × estimated time, certification, scheme notification, travel / minimum visit, any DNO coordination, any waste removal.',
    },
    {
      name: 'Apply the right band — never go below floor',
      text: 'Cross-check your total against the ££1,400–2,800 (typical kitchen refurb: sockets, hob, oven, dishwasher, lighting, extractor) fair-margin band. If you\u2019re below £1200, you\u2019ve missed something — re-check materials, time and certificate.',
    },
    {
      name: 'Quote with a variation clause',
      text: 'Make explicit: "Quote excludes [list]. Variations priced at £55–75/hour or fixed quote on identification of additional scope." Get the customer to acknowledge.',
    },
    {
      name: 'Deliver the certificate and invoice promptly',
      text: 'Issue the EIC / MWC / EICR on the day of completion. Invoice the same day. Use payment links to reduce time-to-cash from 30 days to 3 days.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/pricing-electrical-work-per-point',
      title: 'Pricing Electrical Work Per Point',
      description: 'Per-point vs day-rate vs fixed pricing methodology for UK electricians.',
      icon: 'Calculator',
      category: 'Guide',
    },
    {
      href: '/guides/electrician-day-rates-uk',
      title: 'UK Electrician Day Rates',
      description: 'Day-rate benchmarks for self-employed and sub-contract work.',
      icon: 'PoundSterling',
      category: 'Guide',
    },
    {
      href: '/tools/electrical-quoting-app',
      title: 'Electrical Quoting App',
      description: 'Voice-driven quoting on your phone with materials lookup.',
      icon: 'FileText',
      category: 'Tool',
    },
    {
      href: '/guides/electrician-insurance-uk',
      title: 'Electrician Insurance UK',
      description: 'Professional indemnity, public liability and what a scheme-registered electrician needs.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/tools/cable-sizing-calculator',
      title: 'Cable Sizing Calculator',
      description: 'Size cables on the job — feeds straight into your quote.',
      icon: 'Calculator',
      category: 'Tool',
    },
    {
      href: '/eic-certificate',
      title: 'EIC Certificate App',
      description: 'Issue Electrical Installation Certificates on your phone.',
      icon: 'FileCheck2',
      category: 'Tool',
    },
  ],
  ctaHeading: 'Stop Under-Pricing Kitchen Rewire',
  ctaSubheading:
    'Join 1,000+ UK electricians using Elec-Mate to quote kitchen rewire at fair-margin prices, issue compliant certificates, and get paid faster. 7-day free trial.',
};
