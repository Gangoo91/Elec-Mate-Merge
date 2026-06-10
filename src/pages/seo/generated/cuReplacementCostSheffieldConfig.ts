import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Programmatically generated consumer-unit-replacement cost landing page for Sheffield.
// Market-rate data only — pricing bands derived from Sheffield labour rates
// and typical 10–18 way RCBO board kit costs. BS 7671 references kept short
// and link out to existing grounded guides.
//
// Updated: 2026-05-18.

const published = '2026-05-18';
const modified = '2026-05-18';

export const cuReplacementCostSheffieldConfig: GeneratedGuideConfig = {
  pagePath: '/guides/consumer-unit-replacement-cost-sheffield',
  title: 'Consumer Unit Replacement Cost Sheffield 2026 — Full',
  description: 'Consumer unit (fuse board) replacement cost in Sheffield — typical 2026 prices £434–680 for a domestic swap with RCBOs, BS 7671:2018+A4:2026 compliant.',
  datePublished: published,
  dateModified: modified,
  readingTime: 8,
  badge: 'Cost Guide',
  badgeIcon: 'PoundSterling',
  breadcrumbLabel: 'Consumer Unit Replacement Cost in Sheffield',
  breadcrumbParent: { label: 'Consumer Unit Replacement Cost', href: '/guides/consumer-unit-replacement-cost' },
  heroPrefix: 'Consumer Unit Replacement Cost in Sheffield:',
  heroHighlight: '2026 Full Pricing Guide',
  heroSuffix: '— RCBO Boards & BS 7671:2018+A4:2026',
  heroSubtitle:
    'Whether you are an electrician quoting consumer unit replacements in Sheffield or a homeowner trying to understand the market rate, this guide gives the fair-margin 2026 prices for a NICEIC or NAPIT scheme-registered electrician. Old wired-fuse boards, plastic enclosures and missing RCD protection are all driving replacements. Labour rates in Sheffield typically run £50–£70/hour. Use it as a market-rate reference for your next quote, or as a buyer\u2019s guide to a fair price.',
  keyTakeaways: [
    'A typical 10–14 way domestic consumer unit replacement in Sheffield costs £434–680 (2026 prices) including the new board, RCBOs, surge protection, labour and the Electrical Installation Certificate.',
    'Larger 18+ way boards, three-phase boards, or boards needing tail upgrades push the price toward £816 and beyond.',
    'Most modern installations under BS 7671:2018+A4:2026 use all-RCBO boards (one RCBO per circuit) for granular protection — older split-load designs are now legacy.',
    'AFDDs are now mandatory in HMOs, care homes and certain residential settings under A4:2026 — adding £15–25 per circuit if specified.',
    'A new consumer unit triggers an Electrical Installation Certificate (EIC) and is notifiable work under Part P of the Building Regulations in England and Wales.',
    'The DNO for South Yorkshire is Northern Powergrid. Any work that requires the meter to be pulled (e.g. tails upgrade) must be coordinated with the DNO or a metal-seal-cutting service.',
  ],
  sections: [
    {
      id: 'typical-prices',
      heading: 'Typical Consumer Unit Replacement Prices in Sheffield (2026)',
      tocLabel: 'Typical prices',
      blocks: [
        {
          type: 'paragraph',
          text: 'These are working prices for Sheffield based on competent-person scheme members in the area, current copper / steel pricing, and typical labour. Each scenario assumes a same-day swap with no unexpected remedial work.',
        },
        {
          type: 'list',
          ordered: false,
          items: [
            'Small property (1-bed flat or maisonette, 6–8 way board) — £369–456 including board, RCBOs, labour, EIC',
            'Standard 3-bed house (10–14 way all-RCBO board) — £434–680 (typical 4–6 hours on site)',
            'Larger 4-bed house (14–18 way board with SPD) — £680–816',
            'HMO or rented property (with AFDDs on relevant circuits) — £748–952',
            'Three-phase domestic / light commercial board — £884–1224+ (priced on site)',
            'Tails upgrade and meter coordination (where required) — add £80–180',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Watch out for missing items',
          body:
            'Some quotes look low because they exclude the EIC, surge protection (SPD), AFDDs, and tails upgrade. Always insist on a written itemised quote. The Elec-Mate quote tool generates a fully itemised PDF in two minutes.',
        },
      ],
    },
    {
      id: 'whats-included',
      heading: 'What Should Be Included in the Price',
      tocLabel: 'What is included',
      blocks: [
        {
          type: 'paragraph',
          text: 'A compliant consumer unit replacement in Sheffield should include all of the following — anything missing should be flagged in the quote:',
        },
        {
          type: 'list',
          ordered: false,
          items: [
            'New metal-clad consumer unit to BS EN 61439-3 (plastic boards are no longer permitted for domestic dwellings)',
            'RCBO per circuit (typically Type AC or Type A depending on circuit), or split-load RCDs as the minimum legacy alternative',
            'Surge protective device (SPD) to BS 7671 Chapter 443 — mandatory in most domestic installations under A4:2026',
            'AFDDs (Arc Fault Detection Devices) where required by A4:2026 — HMOs, care homes, student accommodation, certain residential settings',
            'Main switch isolator (often a 100A double-pole)',
            'Labelling of every circuit at the board',
            'Initial verification testing (R1+R2, Zs, insulation resistance, RCD trip times, polarity)',
            'BS 7671:2018+A4:2026 Electrical Installation Certificate (EIC) and Schedule of Test Results',
            'Part P notification (either via competent-person scheme or building control)',
          ],
        },
      ],
    },
    {
      id: 'what-affects-price',
      heading: 'What Pushes the Price Up',
      tocLabel: 'What affects price',
      blocks: [
        {
          type: 'paragraph',
          text: 'Beyond the board itself, six factors push the final Sheffield price into the upper band:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Tails upgrade — if existing tails are < 25mm² or in poor condition, they must be replaced and coordinated with the DNO Northern Powergrid.',
            'Meter position move — relocating the meter (rare but sometimes needed for board access) is a DNO job, charged separately.',
            'Bonding upgrades — if main bonding to gas, water or oil is undersized or missing, it must be brought up to current BS 7671 requirements.',
            'AFDDs — required on certain circuits in HMOs and other premises under A4:2026. Adds ~£15–25 per AFDD-protected way.',
            'Three-phase supply — a three-phase board, RCBOs, and testing equipment cost significantly more.',
            'Inaccessible board position — boards behind stairs, in lofts, or under stairs add labour time for access.',
          ],
        },
      ],
    },
    {
      id: 'when-required',
      heading: 'When You Need a New Consumer Unit',
      tocLabel: 'When required',
      blocks: [
        {
          type: 'paragraph',
          text: 'You should consider replacing your consumer unit if any of the following apply:',
        },
        {
          type: 'list',
          ordered: false,
          items: [
            'You have a wired-fuse board (rewireable fuses) — the technology is 40+ years old and incompatible with modern RCD protection.',
            'Your existing board is plastic — plastic boards are no longer permitted in new domestic installations under A3:2015 and later amendments.',
            'There is no RCD protection — sockets, lighting and bathroom circuits must all be RCD-protected under current BS 7671.',
            'You are getting an EICR and the inspector codes the board C1 or C2 — this almost always means replacement.',
            'You are letting the property — the Electrical Safety Standards Regulations 2020 require a compliant installation in all PRS properties.',
            'You are adding significant new load (EV charger, solar PV, heat pump, battery storage) — these often need a new larger board.',
          ],
        },
      ],
    },
    {
      id: 'for-electricians',
      heading: 'For Electricians: Quote CU Replacements in Sheffield at the Right Price',
      tocLabel: 'For electricians',
      blocks: [
        {
          type: 'paragraph',
          text: 'If you are quoting consumer unit replacements in Sheffield, the £434–680 band above is your fair-margin floor for a 10–14 way RCBO board with SPD, EIC and labour. Quoting below this band means you are absorbing the cost of your scheme fee, professional indemnity, calibrated test kit, and the certificate liability you sign. Use the bands as anchors, then adjust for: tails upgrade, bonding remedials, AFDDs (mandatory in HMOs / certain residential under A4:2026), and any DNO coordination through Northern Powergrid.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Quote CU swaps from your phone in 60 seconds',
          body:
            'Elec-Mate gives Sheffield electricians the tools to scan the existing board, generate an itemised quote with RCBOs, SPDs, AFDDs and labour, and issue the EIC on-site. 7-day free trial.',
        },
        {
          type: 'paragraph',
          text: 'For a deeper pricing methodology — fixed vs hourly, defending the price against haggling, when to walk away from a job — read the full trade guide: How to Price Consumer Unit Replacement as an Electrician.',
        },
      ],
    },
    {
      id: 'get-a-quote',
      heading: 'For Homeowners: Booking a CU Replacement in Sheffield',
      tocLabel: 'For homeowners',
      blocks: [
        {
          type: 'paragraph',
          text: 'For a fair quote, contact at least three scheme-registered electricians (NICEIC, NAPIT, ELECSA or Stroma). Provide a clear brief: number of circuits, current board type, intended use of the property (private home, let, HMO), and any planned additional loads. Elec-Mate matches you to vetted Sheffield electricians and returns same-day quotes for most domestic jobs.',
        },
        {
          type: 'paragraph',
          text: 'Once the work is complete, demand the BS 7671:2018+A4:2026 Electrical Installation Certificate, Schedule of Test Results, and the Part P notification letter / certificate from the competent-person scheme. Keep these documents — they are the legal record of compliance and the buyer or insurer will ask for them later.',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'How much does it cost to replace a consumer unit in Sheffield?',
      answer: 'A typical 10–14 way domestic consumer unit replacement in Sheffield costs £434–680 in 2026, including the new metal-clad board, all RCBOs, surge protection, labour and the EIC. Larger or HMO-spec boards push toward £816+.',
    },
    {
      question: 'How long does a consumer unit replacement take?',
      answer: 'Most domestic CU swaps take 4–6 hours on site. The power is off for the duration of the work. Larger boards or jobs requiring a tails upgrade can take a full day.',
    },
    {
      question: 'Do I need to be home during the work?',
      answer: 'Yes, typically. The electrician needs access to the consumer unit and may need to test each room\u2019s circuits. The job is also notifiable under Part P, and you will need to sign for the Electrical Installation Certificate at the end.',
    },
    {
      question: 'Will my electrician notify the council?',
      answer: 'If they are scheme-registered (NICEIC, NAPIT, ELECSA, Stroma) they will self-certify the work via their scheme — no separate building control notification needed. Non-scheme electricians must notify building control separately, which usually adds £150–300 in fees.',
    },
    {
      question: 'Do I need AFDDs in my new consumer unit?',
      answer: 'AFDDs (Arc Fault Detection Devices) are mandatory under BS 7671:2018+A4:2026 in HMOs, care homes, student accommodation, and certain residential settings. For owner-occupied homes they remain recommended but not mandatory. If you are letting the property, factor in AFDDs.',
    },
    {
      question: 'Can I just have a few RCDs added instead of a full replacement?',
      answer: 'Sometimes — a competent person can add an RCD upstream of an existing board as a stop-gap. However if the board is old, plastic, or has missing labelling, the EICR will continue to flag observations. For most Sheffield properties, a full replacement is the better long-term option.',
    },
  ],
  howToHeading: 'How to Book a Consumer Unit Replacement in Sheffield',
  howToDescription:
    'Five steps to a fair price and a fully compliant board.',
  howToSteps: [
    {
      name: 'Take photos of your existing consumer unit',
      text: 'Phone photos of the existing board (open and closed), the meter position, and the main intake. This lets the electrician quote accurately before site visit and avoids surprise extras.',
    },
    {
      name: 'Get three quotes from competent-person scheme members',
      text: 'Use Elec-Mate or check NICEIC / NAPIT directories directly. Provide the photos and a clear brief: house size, property type, whether you are letting, any planned EV / PV / heat pump loads.',
    },
    {
      name: 'Confirm exactly what is included',
      text: 'Insist on a written itemised quote: board model, number of RCBOs, SPD model, AFDDs (yes/no), tails upgrade if needed, labelling, testing, EIC, Part P notification.',
    },
    {
      name: 'Schedule the work and arrange access',
      text: 'Allow 4–6 hours minimum. The power will be off for the duration. Have the meter location, any prior cert and the consumer unit area cleared of obstructions.',
    },
    {
      name: 'Collect your paperwork',
      text: 'After completion, you should receive: the BS 7671:2018+A4:2026 EIC, Schedule of Test Results, Part P notification letter / certificate from the scheme. Keep both digitally and in your O&M pack.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/consumer-unit-replacement-cost',
      title: 'Consumer Unit Replacement Cost UK',
      description: 'National consumer unit replacement prices, what is included, and regulations.',
      icon: 'PoundSterling',
      category: 'Guide',
    },
    {
      href: '/guides/consumer-unit-replacement-cost-leeds',
      title: 'Consumer unit replacement cost in Leeds',
      description: 'Local price bands and labour rates for Leeds.',
      icon: 'MapPin',
      category: 'Guide',
    },
    {
      href: '/guides/consumer-unit-replacement-cost-nottingham',
      title: 'Consumer unit replacement cost in Nottingham',
      description: 'Local price bands and labour rates for Nottingham.',
      icon: 'MapPin',
      category: 'Guide',
    },
    {
      href: '/guides/how-to-price-consumer-unit-replacement-as-an-electrician',
      title: 'How to Price CU Replacement as an Electrician',
      description: 'Trade-side fair-margin pricing methodology for UK electricians.',
      icon: 'PoundSterling',
      category: 'Guide',
    },
    {
      href: '/electricians/sheffield',
      title: 'Find an Electrician in Sheffield',
      description: 'Vetted scheme-registered electricians in Sheffield.',
      icon: 'MapPin',
      category: 'Guide',
    },
    {
      href: '/guides/eicr-cost-sheffield',
      title: 'EICR Cost in Sheffield',
      description: 'Periodic inspection pricing — often paired with a CU upgrade.',
      icon: 'FileCheck2',
      category: 'Guide',
    },
    {
      href: '/guides/consumer-unit-upgrade',
      title: 'Consumer Unit Upgrade Guide',
      description: 'Why and when to upgrade, plus what to ask for.',
      icon: 'Zap',
      category: 'Guide',
    },
    {
      href: '/guides/afdd-mandatory-hmo-care-home-a4-2026',
      title: 'AFDD Mandatory in HMOs (A4:2026)',
      description: 'When AFDDs are required in 2026 onwards.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/eic-certificate',
      title: 'EIC Certificate App',
      description: 'Issue Electrical Installation Certificates from your phone.',
      icon: 'FileCheck2',
      category: 'Tool',
    },
    {
      href: '/tools/cable-sizing-calculator',
      title: 'Cable Sizing Calculator',
      description: 'Free BS 7671 cable-sizing tool for tails and circuit upgrades.',
      icon: 'Calculator',
      category: 'Tool',
    },
  ],
  ctaHeading: 'For Electricians: Quote CU Swaps in Sheffield',
  ctaSubheading:
    'Join 1,000+ UK electricians using Elec-Mate to scan boards, itemise RCBO/SPD/AFDD spec, and issue the BS 7671:2018+A4:2026 EIC on-site. 7-day free trial.',
};
