import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// "How to Price Minor Electrical Work (Minor Works Certificate) as an Electrician" — trade-side pricing guide for
// self-employed UK electricians. NOT a homeowner cost page. Frames pricing as
// fair-margin survival, not race-to-the-bottom.
// Updated 2026-05-18.

const published = '2026-05-18';
const modified = '2026-05-18';

export const howToPriceMinorWorksConfig: GeneratedGuideConfig = {
  pagePath: '/guides/how-to-price-minor-works-as-an-electrician',
  title: 'How to Price Minor Electrical Work (Minor Works',
  description: 'How much should you charge for minor electrical work (minor works certificate) as a UK electrician in 2026?',
  datePublished: published,
  dateModified: modified,
  readingTime: 9,
  badge: 'Trade Pricing Guide',
  badgeIcon: 'PoundSterling',
  breadcrumbLabel: 'How to Price Minor Electrical Work (Minor Works Certificate)',
  heroPrefix: 'How to Price',
  heroHighlight: 'Minor Electrical Work (Minor Works Certificate)',
  heroSuffix: 'as an Electrician — UK 2026',
  heroSubtitle:
    'A practical pricing guide for self-employed UK electricians and small contractors. Whether you are new to minor electrical work (minor works certificate) or you have been pricing them for years, this guide gives you the fair-margin bands, what to include in every quote, the regulatory background, and the mistakes that quietly destroy your margin. Designed for self-employed electricians pricing small notifiable / non-notifiable jobs.',
  keyTakeaways: [
    'Typical fair-margin price for minor electrical work (minor works certificate): ££95–180 per job (single circuit alteration, new socket on existing circuit) in 2026. Minimum floor £95; top end £350.',
    'Target hourly rate for self-employed electricians pricing small notifiable / non-notifiable jobs: £55–75 (excluding VAT). Below this band you are subsidising the customer.',
    'Regulatory references: BS 7671:2018+A4:2026 (Section 644 + Form 4), Part P (notifiable vs non-notifiable work).',
    'Always quote the certification (EIC / MWC / specific) as a deliverable — never include it as a freebie. Without the certificate your work is not legally valid.',
    'Below-market quotes from competitors usually mean missing insurance, missing scheme membership, missing test sweep, or missing certificate. Educate clients, don\u2019t race to the bottom.',
    'Your scheme fee (~£500/year), professional indemnity (~£500–1,000/year), calibrated test kit (~£1,200 every 3–5 years) and ongoing CPD are all real costs that justify the band.',
  ],
  sections: [
    {
      id: 'fair-margin-pricing',
      heading: 'Fair-Margin Pricing for Minor Electrical Work (Minor Works Certificate)',
      tocLabel: 'Fair-margin pricing',
      blocks: [
        {
          type: 'paragraph',
          text: 'The UK electrical trade is being squeezed by aggregator platforms, race-to-the-bottom quoting, and customers who treat compliance as a commodity. This page is on the side of self-employed electricians pricing small notifiable / non-notifiable jobs. The bands below assume you are a scheme-registered electrician (NICEIC, NAPIT, ELECSA or Stroma) carrying current professional indemnity insurance, calibrated test equipment and the relevant regulatory currency.',
        },
        {
          type: 'list',
          ordered: false,
          items: [
            'Minimum sustainable price: £95 — below this you are paying the customer to do their work',
            'Typical fair-margin band: ££95–180 per job (single circuit alteration, new socket on existing circuit)',
            'Top end of range (complex / commercial / time-critical): £350',
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
          text: 'A defensible quote for minor electrical work (minor works certificate) should explicitly itemise every line. Below is the list self-employed electricians pricing small notifiable / non-notifiable jobs should be tracking on every job, with critical line items called out:',
        },
        {
          type: 'list',
          ordered: false,
          items: [
            'Every minor works requires testing (R1+R2, Zs, insulation resistance) and a Minor Works Certificate — bake into the price',
            'Travel + setup time on a 30-minute job is the same as a 4-hour job — minimum visit fee covers it',
            'Materials at retail + (sockets, faceplates, fused spurs)',
            'If the job becomes notifiable mid-way (added a circuit, extended a circuit), it\'s no longer minor works — quote needs to flex to EIC',
            'Same-day or next-day availability is worth premium pricing',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Quote with confidence — itemise everything',
          body:
            'Elec-Mate generates fully itemised quotes for minor electrical work (minor works certificate) in two minutes. Every line item, every certificate, every variation — clear pricing the client cannot haggle. 7-day free trial.',
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
          text: 'These are the most common pricing mistakes self-employed electricians pricing small notifiable / non-notifiable jobs make on minor electrical work (minor works certificate). Each one quietly eats your margin until you are working for less than minimum wage:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Skipping the MWC certificate to save time — the certificate IS the deliverable, you\'re not paid otherwise',
            'Charging £40 for an \'easy\' job — your kit, calibration and insurance cost more than that to maintain',
            'Forgetting that adding a circuit is notifiable Part P, not minor works',
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
          text: 'Pricing without understanding the regulatory requirements is how electricians end up doing extra work for free. The relevant references for minor electrical work (minor works certificate) are: BS 7671:2018+A4:2026 (Section 644 + Form 4), Part P (notifiable vs non-notifiable work). Quoting must factor in: time on-site, certification time, scheme-notification time, and any DNO coordination required.',
        },
        {
          type: 'paragraph',
          text: 'BS 7671:2018+A4:2026 (the 18th Edition published 15 April 2026) is the current standard. Any quote that does not factor in current A4:2026 requirements — including AFDDs in HMOs, updated SPD thresholds, and the new Schedule of Tests columns — is under-quoting on certified-compliance work.',
        },
      ],
    },
    {
      id: 'using-elec-mate-to-quote',
      heading: 'Using Elec-Mate to Quote Minor Electrical Work (Minor Works Certificate)',
      tocLabel: 'Quote with Elec-Mate',
      blocks: [
        {
          type: 'paragraph',
          text: 'Elec-Mate is built for self-employed electricians pricing small notifiable / non-notifiable jobs. The pricing engine handles: line-item quoting, customer-facing PDF quotes, materials lookups with retail+ markup, certification (EIC, EICR, Minor Works) for the job, and direct payment links. Quote minor electrical work (minor works certificate) in two minutes from your phone on site.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'For electricians: stop under-pricing your work',
          body:
            'Join 1,000+ UK electricians using Elec-Mate to quote minor electrical work (minor works certificate) at fair-margin prices, issue compliant certificates, and get paid faster. 7-day free trial.',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'How much should I charge for minor electrical work (minor works certificate) as a UK electrician?',
      answer: 'Fair-margin pricing for minor electrical work (minor works certificate) in 2026 sits at ££95–180 per job (single circuit alteration, new socket on existing circuit) for a scheme-registered electrician. The minimum sustainable floor is £95; complex / commercial / time-critical jobs reach £350. Below the floor you are subsidising the customer.',
    },
    {
      question: 'What hourly rate should I target for minor electrical work (minor works certificate)?',
      answer: 'Target £55–75/hour for self-employed electricians pricing small notifiable / non-notifiable jobs doing minor electrical work (minor works certificate) in 2026 (excluding VAT). This rate covers scheme fees, professional indemnity, calibrated test equipment, van + tools, CPD and personal liability — the costs that come with being a competent person.',
    },
    {
      question: 'Why do some electricians quote much lower than this band?',
      answer: 'Lower quotes typically mean: missing insurance, missing scheme registration, certificate being skipped, test sweep being skipped, or the work being done by an unqualified person. The cheaper price reflects missing safety + compliance work, not better efficiency. Educate the customer rather than racing to the bottom.',
    },
    {
      question: 'What certificate should I issue for minor electrical work (minor works certificate)?',
      answer: 'The relevant certificate depends on the work: full installation = Electrical Installation Certificate (EIC), single circuit alteration = Minor Works Certificate (MWC), periodic inspection = Electrical Installation Condition Report (EICR). For minor electrical work (minor works certificate), the typical deliverable is documented in your scheme operator\u2019s guidance and bundled into the price.',
    },
    {
      question: 'How do I quote minor electrical work (minor works certificate) from my phone on site?',
      answer: 'Elec-Mate generates itemised quotes for minor electrical work (minor works certificate) in two minutes on a mobile phone. Voice-driven quoting, materials lookup, scheme-compliant pricing, certificate generation, and customer-payable PDF output all happen on the device. 7-day free trial.',
    },
    {
      question: 'Should I price minor electrical work (minor works certificate) per hour or fixed?',
      answer: 'Fixed-price for predictable scope (defined number of circuits / outlets / fittings). Hourly for unpredictable scope (fault-finding, emergency callout, undefined remedial). Mixed for jobs with a known fixed element plus possible variations — always quote the fixed element and add a variation clause for extras.',
    },
  ],
  howToHeading: 'A Repeatable Quoting Process for Minor Electrical Work (Minor Works Certificate)',
  howToDescription:
    'Use this five-step process every time you quote minor electrical work (minor works certificate) to ensure you protect your margin and the customer gets a fair, defensible price.',
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
      text: 'Cross-check your total against the ££95–180 per job (single circuit alteration, new socket on existing circuit) fair-margin band. If you\u2019re below £95, you\u2019ve missed something — re-check materials, time and certificate.',
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
  ctaHeading: 'Stop Under-Pricing Minor Electrical Work (Minor Works Certificate)',
  ctaSubheading:
    'Join 1,000+ UK electricians using Elec-Mate to quote minor electrical work (minor works certificate) at fair-margin prices, issue compliant certificates, and get paid faster. 7-day free trial.',
};
