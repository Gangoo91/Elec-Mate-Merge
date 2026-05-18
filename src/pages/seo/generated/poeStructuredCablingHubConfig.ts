import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in BS 7671:2018+A4:2026 (18th Edition, Section 715 ELV lighting),
// BS EN 50173 (Generic cabling), BS EN 50174 (Cable installation), IEEE 802.3bt
// (PoE Type 3 & 4), BS EN 62386 (DALI) and BS EN 62676 (Video surveillance).

const published = '2026-05-18';
const modified = '2026-05-18';

export const poeStructuredCablingHubConfig: GeneratedGuideConfig = {
  pagePath: '/guides/poe-structured-cabling-hub',
  title:
    'Power over Ethernet & Structured Cabling Hub — UK Installer',
  description:
    'Complete UK installer hub for Power over Ethernet, structured cabling, PoE lighting, IP cameras, DALI and KNX.',
  datePublished: published,
  dateModified: modified,
  readingTime: 10,
  badge: 'Topic Hub',
  badgeIcon: 'Network',
  breadcrumbLabel: 'PoE & Structured Cabling Hub',
  heroPrefix: 'Power over Ethernet &',
  heroHighlight: 'Structured Cabling Hub',
  heroSuffix: '— Everything UK Installers Need',
  heroSubtitle:
    'PoE has moved from niche networking to mainstream electrical installation. 90W PoE++ now powers LED lighting, IP CCTV, access control, and digital signage — and the UK electrician is increasingly responsible for the install. This hub indexes every Elec-Mate guide on PoE, structured cabling, smart-building wiring and the standards behind them.',
  keyTakeaways: [
    'PoE Type 4 (IEEE 802.3bt) delivers up to 90W per port across all four pairs of Cat6a — enough for LED lighting, PTZ cameras, Wi-Fi 6/7 access points and digital signage.',
    'PoE installations crossing 57V DC fall under BS 7671 Section 715 (Extra-Low Voltage lighting) — SELV / PELV classification applies and segregation from mains under Section 528.1 is mandatory.',
    'Structured cabling design follows BS EN 50173 (CD → BD → FD → TO hierarchy, 100m channel rule), with BS EN 50174 governing installation practice (pull tension, bend radius, segregation).',
    'Cable selection for PoE++ depends on bundle de-rating per TIA TSB-184-A — 4-pair currents combined with ambient temperature determine the required Cat6a / Cat7 grade.',
    'Lighting control protocols (DALI, DALI-2, KNX) and PoE-powered fittings represent the largest installer growth area outside of EV charging — they bridge data and electrical disciplines.',
    'This hub links every Elec-Mate guide in the cluster, plus the working calculators (cable sizing, lighting lux, structured-cabling planner) for design jobs.',
  ],
  sections: [
    {
      id: 'overview',
      heading: 'The PoE-First Smart Building',
      tocLabel: 'Overview',
      blocks: [
        {
          type: 'paragraph',
          text: 'For most of the past decade, an electrical contractor would terminate a Cat6 patch panel and walk away — the IT contractor took over from there. That handover has dissolved. Modern PoE-powered devices (LED panels, IP cameras, IoT gateways, smart speakers, even POS terminals) are now electrical equipment under the BS 7671 definition: they consume electricity, they need cable selection, they need protection, they need certification of the supply.',
        },
        {
          type: 'paragraph',
          text: 'This hub indexes every Elec-Mate guide that supports the PoE / structured-cabling installer — from the underlying standards (BS EN 50173, BS EN 50174, IEEE 802.3bt) through the BS 7671 implications (Section 715 ELV lighting, Section 528 segregation), to the practical install topics (camera installation, control protocols, cable bundle de-rating).',
        },
      ],
    },
    {
      id: 'poe-fundamentals',
      heading: 'PoE Fundamentals',
      tocLabel: 'PoE fundamentals',
      blocks: [
        {
          type: 'paragraph',
          text: 'IEEE has now ratified four PoE types, each with progressively higher per-port power budgets. Selecting the right type (and matching cable + switch + powered device) is the first design decision.',
        },
        {
          type: 'list',
          ordered: false,
          items: [
            'PoE Type 4 (90W) installation — IEEE 802.3bt, 4-pair power, used for LED lighting, PTZ IP cameras, digital signage. → /guides/poe-plus-plus-type-4-90w-installation',
            'Cat6 vs Cat6a current rating for PoE — TIA TSB-184-A bundle de-rating tables. → /guides/cat6-cat6a-current-rating-poe',
            'PoE lighting vs traditional mains LED wiring — head-to-head decision framework. → /guides/poe-lighting-vs-traditional-led-wiring',
            'BS 7671 Section 715 (ELV lighting) under A4:2026 — where PoE crosses into electrical regulation. → /guides/section-715-elv-lighting-a4-2026',
          ],
        },
      ],
    },
    {
      id: 'structured-cabling-standards',
      heading: 'Structured Cabling Standards',
      tocLabel: 'Structured cabling',
      blocks: [
        {
          type: 'paragraph',
          text: 'Structured cabling is governed by two interlocking European standards: BS EN 50173 (the system architecture — categories, topology, performance) and BS EN 50174 (the installation practice — pull tension, bend radius, support, segregation). Both apply on every PoE / data install, alongside BS 7671 segregation rules.',
        },
        {
          type: 'list',
          ordered: false,
          items: [
            'Structured cabling under BS EN 50173 — six-part standard, CD/BD/FD/TO hierarchy, certification testing. → /guides/structured-cabling-bs-en-50173-electricians',
            'BS EN 50174 data cable installation practice — bend radius, pull tension, segregation from mains. → /guides/bs-en-50174-data-cable-installation',
          ],
        },
      ],
    },
    {
      id: 'applications',
      heading: 'Common PoE Applications',
      tocLabel: 'Applications',
      blocks: [
        {
          type: 'paragraph',
          text: 'The four highest-value PoE applications for UK installers — each with its own design, segregation, and certification requirements.',
        },
        {
          type: 'list',
          ordered: false,
          items: [
            'IP camera PoE installation — outdoor IP66, lightning protection, BS EN 62676, GDPR / Surveillance Camera CoP. → /guides/ip-camera-poe-installation-uk',
            'PoE lighting (general) — basic install patterns and product selection. → /guides/poe-lighting-guide',
            'DALI lighting control wiring — BS EN 62386, DALI-2, D4i, integration with emergency lighting. → /guides/dali-lighting-control-wiring-bs-en-62386',
            'KNX wiring installation — BS EN 50090, TP1 bus, topology rules, ETS commissioning. → /guides/knx-wiring-installation-guide-uk',
          ],
        },
      ],
    },
    {
      id: 'crossover-with-mains',
      heading: 'Where PoE Crosses Into BS 7671',
      tocLabel: 'BS 7671 crossover',
      blocks: [
        {
          type: 'paragraph',
          text: 'Once a PoE system delivers more than 50V AC or 120V DC ripple-free, it leaves the Extra-Low Voltage definition and falls under the full weight of BS 7671. Even below that, several BS 7671 sections govern PoE work: Section 715 (ELV lighting), Section 528 (segregation from mains), and Section 537 (isolation and switching).',
        },
        {
          type: 'list',
          ordered: false,
          items: [
            'Section 715 ELV lighting under A4:2026 — SELV / PELV / FELV decision tree for PoE lighting. → /guides/section-715-elv-lighting-a4-2026',
            'Section 537 isolation and switching under A4:2026 — applies to PoE-powered installations including smart distribution boards. → /guides/section-537-isolation-switching-a4-2026',
            'Smart distribution board / IoT consumer unit — where PoE meets the consumer unit. → /guides/smart-distribution-board-iot-consumer-unit',
          ],
        },
      ],
    },
    {
      id: 'design-tools',
      heading: 'Design Tools',
      tocLabel: 'Tools',
      blocks: [
        {
          type: 'paragraph',
          text: 'Elec-Mate ships a working calculator suite for every PoE / structured-cabling design step. Each is free to use online and integrated into the mobile app.',
        },
        {
          type: 'list',
          ordered: false,
          items: [
            'Cable sizing calculator — for the mains feed to PoE switches and ELV power supplies. → /tools/cable-sizing-calculator',
            'Volt drop calculator — including 3-phase. → /tools/cable-volt-drop-three-phase',
            'Lighting lux calculator — for spec-compliant fixture counts on PoE lighting jobs. → /tools/lighting-lux-calculator',
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'Do I need an electrician to install PoE lighting in the UK?',
      answer:
        'Yes — once the PoE system is installed as part of a permanent building fit-out and connects to the mains-fed consumer unit at any point (which it almost always does, via the PoE switch power supply), the installation falls under BS 7671 and Part P of the Building Regulations. The PoE switch itself, its cable run, and any consumer-unit modification are notifiable and require a competent person. The data side of the install (Cat6a runs, terminations, certification) sits under BS EN 50173 / 50174 and is typically done by the same contractor.',
    },
    {
      question: 'Is PoE always Extra-Low Voltage (ELV) under BS 7671?',
      answer:
        'PoE Type 1–4 systems all operate at 44–57V DC, which sits within the ELV envelope (≤120V DC ripple-free). Section 715 of BS 7671 governs ELV lighting and applies directly to PoE-powered fittings. SELV (Safety Extra-Low Voltage) requirements typically apply where the PoE power supply is double-insulated from mains and there is no functional earth connection. The PoE switch and its supply still sit under the full weight of BS 7671 — only the PoE-output cabling is ELV.',
    },
    {
      question: 'What cable is required for 90W PoE Type 4?',
      answer:
        'IEEE 802.3bt requires a minimum of Category 5e for 60W (Type 3) and Cat6 for 90W (Type 4). In practice, Cat6a is the recommended minimum on any PoE installation expected to support 90W loads over the standard 100m channel, especially in bundles. The conductor cross-sectional area difference (Cat5e ≈ 0.205 mm², Cat6a ≈ 0.258 mm²) matters because PoE current heats every conductor, and bundle de-rating per TIA TSB-184-A limits the per-cable current as bundle size and ambient temperature increase.',
    },
    {
      question: 'How does PoE cabling segregate from mains under BS 7671?',
      answer:
        'BS 7671 Regulation 528.1 governs proximity of low-voltage data cables to mains circuits. ELV / PoE cables must either run in a separate compartment, in a separate tray or basket, or with a physical barrier — they cannot share the same containment as full LV mains without segregation. Underfloor and ceiling-void installations need to plan this from the outset: most modern PoE installations use a dedicated tray or basket with at least one continuous compartment separation from mains tray.',
    },
    {
      question: 'Do PoE LED installations need an EIC?',
      answer:
        'The mains feed to the PoE switch needs an Electrical Installation Certificate (EIC) like any other circuit. The PoE-powered fittings themselves are typically commissioned by the data installer with a structured-cabling certification (channel test under BS EN 50346) rather than an EIC, because the wiring is ELV-side data. Best practice is to issue the EIC for the mains-side work and attach the structured-cabling certificate as a supplementary record — both sit in the building owner’s O&M pack.',
    },
    {
      question: 'How do DALI and KNX fit into a PoE-driven building?',
      answer:
        'DALI and KNX are control protocols, not power-delivery systems — they govern how lighting, blinds, HVAC and access control communicate inside the building. DALI runs on its own 2-wire polarity-insensitive bus alongside (or even inside) PoE-powered fittings. KNX runs on a separate twisted-pair bus and is usually used to coordinate broader building services. In a PoE-driven building, DALI handles per-fitting control and KNX handles building-wide scenes. Both have their own commissioning and certification process distinct from BS 7671.',
    },
  ],
  howToHeading: 'Designing a PoE + Structured-Cabling Install (Workflow)',
  howToDescription:
    'A repeatable five-step workflow that takes a PoE / data project from concept through commissioning, covering both the BS 7671 mains-side and the BS EN 50173 / 50174 data-side requirements.',
  howToSteps: [
    {
      name: 'Define the load profile and PoE type per fitting',
      text: 'Survey the building, count fittings (lighting, IP cameras, APs), determine peak watts per fitting, and select PoE Type per port (Type 1 ≤15.4W, Type 2 ≤30W, Type 3 ≤60W, Type 4 ≤90W). Group fittings by PoE switch — typically 24- or 48-port switches with a total wattage budget.',
    },
    {
      name: 'Size the mains feed to the PoE switch under BS 7671',
      text: 'Calculate total switch load (sum of all powered devices + switch overhead, ~15–20%). Size the supply cable using the Elec-Mate cable-sizing calculator, accounting for installation method, ambient temperature, grouping. Specify the protective device on the consumer unit and verify earth fault loop impedance.',
    },
    {
      name: 'Plan the structured cabling under BS EN 50173',
      text: 'Lay out the hierarchical topology (CD → BD → FD → outlets). Choose cable category (Cat6 / Cat6a / Cat7) based on PoE type, channel length, and bundle size. Apply TIA TSB-184-A bundle de-rating. Document pathway selection (tray, basket, conduit) and ensure 528.1 segregation from mains.',
    },
    {
      name: 'Install per BS EN 50174 practice',
      text: 'Respect bend radius (4× cable diameter installed, 8× during pull), pull tension limits (Cat6a ≈ 110N), bundle size limits per ambient temperature, and segregation rules. Label every cable at both ends. Test every link against BS EN 50346 channel certification.',
    },
    {
      name: 'Issue both mains EIC and data certification, then hand over',
      text: 'Produce an Electrical Installation Certificate for the mains supply (consumer unit way → PoE switch outlet). Produce a BS EN 50346 channel test report for the data cabling. Commission DALI / KNX control if present. File both certs into the O&M pack and the building owner’s golden-thread documentation.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/poe-plus-plus-type-4-90w-installation',
      title: 'PoE++ Type 4 (90W) Installation',
      description: 'IEEE 802.3bt 90W per port — cable, voltage drop, ELV implications.',
      icon: 'Network',
      category: 'Guide',
    },
    {
      href: '/guides/cat6-cat6a-current-rating-poe',
      title: 'Cat6 vs Cat6a Current Rating',
      description: 'TIA TSB-184-A bundle de-rating, pull tension, ambient temperature.',
      icon: 'Cable',
      category: 'Guide',
    },
    {
      href: '/guides/structured-cabling-bs-en-50173-electricians',
      title: 'Structured Cabling BS EN 50173',
      description: 'CD/BD/FD/TO hierarchy, certification testing, Cat-category selection.',
      icon: 'Network',
      category: 'Guide',
    },
    {
      href: '/guides/bs-en-50174-data-cable-installation',
      title: 'BS EN 50174 Cable Installation',
      description: 'Pull tension, bend radius, segregation, tray fill.',
      icon: 'Cable',
      category: 'Guide',
    },
    {
      href: '/guides/section-715-elv-lighting-a4-2026',
      title: 'Section 715 ELV Lighting (A4:2026)',
      description: 'BS 7671 Section 715 — where PoE lighting crosses into electrical regulation.',
      icon: 'Lightbulb',
      category: 'Guide',
    },
    {
      href: '/guides/ip-camera-poe-installation-uk',
      title: 'IP Camera PoE Installation',
      description: 'BS EN 62676, GDPR, IP/IK ratings, lightning protection.',
      icon: 'Camera',
      category: 'Guide',
    },
  ],
  ctaHeading: 'Quote PoE & Structured Cabling Jobs in Minutes',
  ctaSubheading:
    'Join 1,000+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site EIC certification on PoE and structured cabling installs. 7-day free trial, cancel anytime.',
};
