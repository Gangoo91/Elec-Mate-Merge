import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Programmatically generated EICR cost landing page for Leeds.
// Market-rate data only — no BS 7671 content invented. Technical references
// link out to existing grounded guides (EICR observation codes, Schedule of
// Inspections, EIC vs EICR).
//
// Sources: public job-board hourly rate aggregates + competitor pricing pages.
// Updated: 2026-05-18.

const published = '2026-05-18';
const modified = '2026-05-18';

export const eicrCostLeedsConfig: GeneratedGuideConfig = {
  pagePath: '/guides/eicr-cost-leeds',
  title: 'EICR Cost Leeds 2026 — Domestic & Commercial Pricing',
  description: 'How much does an EICR cost in Leeds? Fair-margin 2026 prices for scheme-registered electricians — £220–290 for a 1-bed, £330–450 for a 4-bed…',
  datePublished: published,
  dateModified: modified,
  readingTime: 7,
  badge: 'Cost Guide',
  badgeIcon: 'PoundSterling',
  breadcrumbLabel: 'EICR Cost in Leeds',
  heroPrefix: 'EICR Cost in Leeds:',
  heroHighlight: '2026 Pricing Guide',
  heroSuffix: '— Domestic & Commercial',
  heroSubtitle:
    'Whether you are an electrician quoting EICRs in Leeds or a landlord trying to understand the market rate, this guide gives the fair-margin 2026 prices charged by NICEIC and NAPIT scheme-registered electricians, what is included, and why below-market quotes are usually missing something. Hourly rates for inspection work in Leeds run £55–£75, with a typical 3-bed terrace EICR landing at £270–360. Use it as a market-rate reference for your next quote, or as a buyer\u2019s guide to a fair price.',
  keyTakeaways: [
    'A 1-bed flat EICR in Leeds typically costs £220–290, a 3-bed terrace £270–360, and a 4-bed house £330–450 (2026 prices for a scheme-registered electrician, excluding remedial work).',
    'Commercial EICRs in Leeds are priced per socket / fitting — typically £16–24 per item, with minimum visit fees of £75–£113.',
    'Below-market quotes (substantially below these bands) are usually missing one or more of: the EIC certificate, RCD/RCBO test sweep, supplementary bonding verification, or the contractor\u2019s scheme registration fee — pay close attention to what is included before booking.',
    'Hourly rates for Leeds sit at £55–£75 because a NICEIC / NAPIT registered electrician carries professional indemnity insurance, scheme fees, calibrated test equipment (typically £1,200+ MFT), and is liable for the certificate they sign.',
    'Property size, consumer unit condition, accessibility, age of the installation, and number of circuits all push the price within or above these bands. Older properties with cellars, lofts and outbuildings cost more.',
    'West Yorkshire\u2019s DNO is Northern Powergrid. Any remedial work involving DNO notification (PME, supply upgrades) routes through them.',
    'An EICR is a safety-critical document. Code C1 and C2 observations require remedial work; C3 is recommended but not mandatory. Choose competence over price.',
  ],
  sections: [
    {
      id: 'typical-prices',
      heading: 'Typical EICR Prices in Leeds (2026)',
      tocLabel: 'Typical prices',
      blocks: [
        {
          type: 'paragraph',
          text: 'Below is a working price guide for Leeds based on competent-person scheme members operating in the area, hourly rate aggregates, and competitor pricing. Prices exclude any remedial work, which is quoted separately.',
        },
        {
          type: 'list',
          ordered: false,
          items: [
            '1-bedroom flat or maisonette — £220–290 (typically 1.5–2 hours on site)',
            '2-bedroom terrace — £270–342 (typically 2–3 hours)',
            '3-bedroom semi or terrace — £270–360 (typically 2.5–3.5 hours)',
            '4-bedroom detached — £330–450 (typically 3.5–5 hours)',
            '5+ bedroom / large houses — £518+ (priced on visit)',
            'Commercial property — £16–24 per socket / fitting with a minimum visit fee of £75–£113',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Why these bands exist — and what cheap quotes are hiding',
          body:
            'A scheme-registered electrician carries: professional indemnity insurance (~£500–1,000/year), NICEIC or NAPIT scheme fees (~£500/year), calibrated test equipment (~£1,200 MFT replaced every 3-5 years), van + tools, ongoing CPD, and liability for every certificate signed. Quotes substantially below these bands usually mean the contractor is uninsured, unregistered, or the EIC certificate / test sweep is being skipped. Choose a scheme-registered electrician with insurance — the certificate is the legal record.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Remedial work is always quoted separately',
          body:
            'These prices cover inspection + certification only. Consumer unit replacements, RCD/RCBO upgrades, fault-finding beyond a standard sample inspection, and earthing/bonding remedials are quoted separately. Insist on an itemised quote.',
        },
      ],
    },
    {
      id: 'what-affects-price',
      heading: 'What Affects the Price',
      tocLabel: 'What affects price',
      blocks: [
        {
          type: 'paragraph',
          text: 'Six factors push an EICR price up or down within Leeds:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Number of circuits — every additional circuit adds testing time. A house with a back-house consumer unit and a separate garage CU will cost more.',
            'Age and condition of the consumer unit — older Wylex / Crabtree boards with rewireable fuses take longer to inspect safely.',
            'Property size and access — lofts, cellars, integrated garages, outhouses each add time.',
            'Number of inspectors visiting — solo inspectors charge per hour; two-person crews charge more but finish faster.',
            'Scheme membership — NICEIC or NAPIT members typically charge more than non-scheme electricians but their certificate is universally accepted.',
            'Remedial work flagged during inspection — quoted as a separate visit, not included in the EICR fee.',
          ],
        },
      ],
    },
    {
      id: 'when-required',
      heading: 'When You Need an EICR in Leeds',
      tocLabel: 'When required',
      blocks: [
        {
          type: 'paragraph',
          text: 'EICRs are mandatory in several scenarios under UK regulation, regardless of West Yorkshire location:',
        },
        {
          type: 'list',
          ordered: false,
          items: [
            'Private rented sector (Electrical Safety Standards in the Private Rented Sector Regulations 2020) — every 5 years and at every change of tenancy.',
            'HMO licensing — every 5 years (and at first licence application).',
            'Commercial leases — typically every 5 years; many landlords require it at lease renewal.',
            'Property sale — many conveyancers and mortgage lenders request a current EICR.',
            'Insurance — some commercial insurance policies require a current EICR.',
            'Recommended for owner-occupiers every 10 years (or sooner if there are concerns).',
          ],
        },
      ],
    },
    {
      id: 'for-electricians',
      heading: 'For Electricians: Quote EICRs in Leeds at the Right Price',
      tocLabel: 'For electricians',
      blocks: [
        {
          type: 'paragraph',
          text: 'If you are a self-employed electrician or small contractor working in Leeds, this page is your local market-rate reference. The £270–360 band for a 3-bed terrace EICR is the fair-margin floor for a scheme-registered electrician — quoting below it means you are undercutting yourself before you start. Use the figures above to anchor your own quoting, with adjustments for property complexity, accessibility, and your scheme + insurance overhead.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Quote EICRs from your phone in 60 seconds',
          body:
            'Elec-Mate gives Leeds electricians voice-driven test entry, 16 certificate types, on-site Schedule of Test Results, and a professional PDF quote that the client cannot haggle. 7-day free trial — see how much faster you can quote and certify in your area.',
        },
        {
          type: 'paragraph',
          text: 'For a deeper breakdown of how to price EICRs as a UK electrician — including hourly targets, fixed-price vs per-hour methodology, certificate liability, and how to defend the price against client haggling — read the full trade pricing guide: How to Price EICR as an Electrician. The companion page covers commercial EICR pricing in the same depth.',
        },
      ],
    },
    {
      id: 'get-a-quote',
      heading: 'For Property Owners: Booking an EICR in Leeds',
      tocLabel: 'For property owners',
      blocks: [
        {
          type: 'paragraph',
          text: 'If you are a landlord, owner or managing agent in Leeds looking for an EICR, Elec-Mate connects you to vetted competent-person scheme electricians. Send a brief — property type, postcode, last EICR date — and get a price from a local electrician. Most Leeds jobs are booked within 5–10 working days, with same-day availability typical for smaller properties or urgent landlord deadlines under the Electrical Safety Standards in the Private Rented Sector Regulations 2020.',
        },
        {
          type: 'paragraph',
          text: 'When picking an electrician, always verify their competent-person scheme membership directly through the scheme operator — NICEIC, NAPIT, ELECSA or Stroma — using the property postcode in their public search. Insurance and IPAF / PASMA cards should be available on request. The Elec-Mate marketplace pre-vets every electrician so you do not need to chase scheme confirmations or insurance certificates manually.',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'How much does a standard EICR cost in Leeds?',
      answer: 'For a 3-bedroom property in Leeds the typical 2026 EICR price from a NICEIC or NAPIT scheme-registered electrician is £270–360, excluding any remedial work. Prices vary with property size, consumer unit condition, and number of circuits. Quotes substantially below this band usually mean the EIC certificate, RCD test sweep or insurance is missing — verify what is included.',
    },
    {
      question: 'How long is an EICR valid for in Leeds?',
      answer: 'EICRs in privately rented homes (including HMOs) are valid for 5 years or until change of tenancy, whichever is sooner. Owner-occupied homes are typically advised to renew every 10 years.',
    },
    {
      question: 'Who can carry out an EICR in Leeds?',
      answer: 'EICRs must be carried out by a qualified and competent person — typically NICEIC, NAPIT, ELECSA or Stroma registered electricians. The inspector must be insured and competent for the size and complexity of the installation. Always verify scheme membership directly on the scheme operator\u2019s public register using the contractor\u2019s postcode — unregistered electricians cannot sign a compliant EIC.',
    },
    {
      question: 'What happens if my EICR fails?',
      answer: 'A failed EICR (containing C1 or C2 codes) means the installation is unsafe and remedial work is needed. Landlords have 28 days to remediate under the Electrical Safety Standards Regulations 2020. The original electrician will normally quote the remedial work; you do not have to use them.',
    },
    {
      question: 'Does the EICR cost include remedial work?',
      answer: 'No. The EICR fee covers inspection and certification only. Remedial work (consumer unit upgrade, RCD replacement, earthing upgrades) is quoted separately. Always confirm in writing what is included before booking.',
    },
    {
      question: 'Can I get a same-day EICR in Leeds?',
      answer: 'Same-day or next-day EICRs are possible in Leeds for smaller properties (1–2 bed) where an electrician is local and a slot is available. Larger jobs typically require 5–10 working days lead time.',
    },
  ],
  howToHeading: 'How to Book an EICR in Leeds',
  howToDescription:
    'A simple five-step process to get a fair price and a competent inspector.',
  howToSteps: [
    {
      name: 'Gather key information',
      text: 'Property address and postcode, property type (flat / terrace / semi / detached), approximate age of the installation, number of circuits if you know them, last EICR date.',
    },
    {
      name: 'Request three quotes from competent-person scheme members',
      text: 'Use Elec-Mate to find vetted Leeds electricians, or check NICEIC / NAPIT directories directly. Avoid trader-aggregator sites that bid jobs out without checking competence.',
    },
    {
      name: 'Confirm what is included in the EICR fee',
      text: 'Get in writing: standard sample inspection, remedial work pricing if needed, callout fee, parking/access fees, and the certificate format (digital PDF vs paper).',
    },
    {
      name: 'Book the visit and prepare access',
      text: 'Ensure access to the consumer unit, every room, the loft and any outbuildings. Move furniture blocking sockets if possible. Have any prior certs and the meter location to hand.',
    },
    {
      name: 'Review the certificate',
      text: 'Check every observation code (C1 / C2 / C3 / FI). C1 and C2 require remedial work; C3 is recommended but not mandatory. Cross-reference with the schedule of test results.',
    },
  ],
  relatedPages: [
    {
      href: '/electricians/leeds',
      title: 'Find an Electrician in Leeds',
      description: 'Vetted scheme-registered electricians in Leeds.',
      icon: 'MapPin',
      category: 'Guide',
    },
    {
      href: '/guides/eicr-observation-codes-explained',
      title: 'EICR Observation Codes',
      description: 'C1, C2, C3, FI explained with examples.',
      icon: 'FileCheck2',
      category: 'Guide',
    },
    {
      href: '/guides/eicr-when-you-need-one',
      title: 'When You Need an EICR',
      description: 'Landlord, HMO, sale, insurance — what triggers a mandatory EICR.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/guides/how-to-price-eicr-as-an-electrician',
      title: 'How to Price EICR as an Electrician',
      description: 'Trade-side fair-margin pricing guide for UK electricians quoting EICRs.',
      icon: 'PoundSterling',
      category: 'Guide',
    },
    {
      href: '/guides/pricing-electrical-work-per-point',
      title: 'Pricing Electrical Work Per Point',
      description: 'How UK electricians price per-point vs day-rate vs fixed-price jobs.',
      icon: 'Calculator',
      category: 'Guide',
    },
    {
      href: '/eic-certificate',
      title: 'EIC Certificate App',
      description: 'Issue EICs and EICRs from your phone with full digital signature.',
      icon: 'FileCheck2',
      category: 'Tool',
    },
    {
      href: '/tools/cable-sizing-calculator',
      title: 'Cable Sizing Calculator',
      description: 'Free BS 7671 cable-sizing tool for remedial work uncovered in an EICR.',
      icon: 'Calculator',
      category: 'Tool',
    },
  ],
  ctaHeading: 'For Electricians: Quote and Certify EICRs in Leeds',
  ctaSubheading:
    'Join 1,000+ UK electricians using Elec-Mate to inspect, certify and quote EICRs on their phone. Voice-driven test entry, 16 certificate types, on-site PDF. 7-day free trial.',
};
