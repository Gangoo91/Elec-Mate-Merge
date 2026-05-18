import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in BS 7671:2018+A4:2026 (18th Edition), IET Guidance Note 3
// (Inspection & Testing, 9th Edition) and the IET On-Site Guide.
// Every regulation cite resolves to a canonical reference.

const published = '2026-05-17';
const modified = '2026-05-18';

export const section714OutdoorLightingConfig: GeneratedGuideConfig = {
  pagePath: '/guides/bs-7671-section-714-outdoor-lighting',
  title:
    'BS 7671 Section 714 Outdoor Lighting Installations',
  description:
    'BS 7671 Section 714 explained: scope, exclusions, 5 second disconnection time, IP44 minimum…',
  datePublished: published,
  dateModified: modified,
  readingTime: 13,
  badge: 'BS 7671 Section 714',
  badgeIcon: 'ShieldCheck',
  breadcrumbLabel: 'Section 714 Outdoor Lighting',
  heroPrefix: 'BS 7671',
  heroHighlight: 'Section 714',
  heroSuffix: 'Outdoor Lighting Installations',
  heroSubtitle:
    'Highway power supplies, street furniture, floodlighting, monument illumination, car park lighting and outdoor luminaires — the BS 7671:2018+A4:2026 requirements that apply, the items explicitly excluded, and the inspection-and-testing rules you must follow.',
  keyTakeaways: [
    'Section 714 covers outdoor lighting installations including roads, parks, car parks, gardens, sporting areas, monument illumination, floodlighting, road signs, telephone kiosks, bus shelters and advertising panels.',
    'Highway power supplies and street furniture are explicitly within Section 714 even when not strictly "lighting" — road traffic signals, although excluded from outdoor lighting classification, fall under Section 714 as highway power supplies.',
    'Excluded: luminaires fixed to building exteriors supplied from internal wiring, road traffic signal systems (classed as highway power supplies instead), temporary festoon lighting.',
    'Maximum disconnection time for fixed outdoor lighting circuits is 5 seconds (Regulation 714.411.202) whether the system is TN or TT.',
    'Minimum IP rating for outdoor lighting equipment is IP44; locations subject to hosing or heavy weather may require IP55 or higher.',
    'A firefighter\'s switch is mandatory for outdoor lighting circuits operating at a voltage exceeding low voltage (Regulation 537.4.2).',
    'Luminaires mounted below 2.80 m above ground must permit access to the light source only after removing a barrier or enclosure that requires the use of a tool.',
  ],
  sections: [
    {
      id: 'scope-and-included-items',
      heading: 'What Section 714 Covers',
      tocLabel: 'Scope',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Section 714 of BS 7671:2018+A4:2026 covers outdoor lighting installations and a wider set of "highway power supplies and street furniture" items. The scope is broader than it sounds — it includes more than just streetlights.',
        },
        {
          type: 'list',
          tone: 'info',
          items: [
            'Roads, parks, car parks, gardens, places open to the public, sporting areas',
            'Floodlighting and illumination of monuments',
            'Road signs (lighting associated with them)',
            'Telephone kiosks, bus shelters, advertising panels, town plans',
            'Highway power supplies and street furniture generally',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Highway power supplies are in scope even without lighting',
          text:
            'Road traffic signal systems are explicitly excluded from the "outdoor lighting" classification but are included within "highway power supplies and street furniture" — and therefore still fall under Section 714 requirements.',
        },
      ],
    },
    {
      id: 'exclusions',
      heading: 'What Section 714 Does NOT Cover',
      tocLabel: 'Exclusions',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Several installation types that look like outdoor lighting are deliberately excluded from Section 714 — they are governed by other parts of BS 7671 or by other standards entirely.',
        },
        {
          type: 'list',
          tone: 'warning',
          items: [
            'Luminaires fixed to the outside of a building that are supplied directly from the internal wiring of that building. These fall under the general wiring regulations applicable to the building, not Section 714.',
            'Road traffic signal systems (excluded from "outdoor lighting" but still in scope as highway power supplies — different requirements apply).',
            'Temporary festoon lighting — events, Christmas displays, temporary illuminations.',
          ],
        },
      ],
    },
    {
      id: 'disconnection-times',
      heading: 'Disconnection Times and Protection',
      tocLabel: 'Disconnection times',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Regulation 714.411.202 sets the maximum disconnection time for outdoor lighting circuits supplying fixed equipment:',
        },
        {
          type: 'callout',
          tone: 'pricing',
          title: '5 seconds maximum disconnection time',
          text:
            'The maximum disconnection time is 5 seconds whether the system is TN (per Regulation 411.3.2.3) or TT (per Regulation 411.3.2.4). This is the relaxed disconnection time appropriate to fixed external installations.',
        },
        {
          type: 'paragraph',
          text:
            'Note that this 5-second limit applies to fixed equipment such as street lighting columns. Socket-outlets in outdoor lighting installations follow the general additional-protection rules (30 mA RCD) and shorter disconnection times.',
        },
      ],
    },
    {
      id: 'ip-ratings-and-external-influences',
      heading: 'IP Ratings and External Influences',
      tocLabel: 'IP ratings',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Outdoor luminaires and electrical equipment are exposed to weather, dust and (often) physical impact. BS 7671 sets minimum protection requirements via IP ratings.',
        },
        {
          type: 'list',
          items: [
            'Minimum IP44 for outdoor lighting equipment — protects against solid objects greater than 1 mm and water splashing from any direction.',
            'IP55 or higher where the location is subject to hosing down or heavy weather exposure (car wash bays, sports stadium pitch-level fittings).',
            'UV-resistant enclosures for any equipment exposed to direct sunlight long-term.',
            'Mechanical impact rating (IK rating) should also be considered for installations vulnerable to vandalism or accidental damage — bollard lights, low-level fittings on highways.',
          ],
        },
      ],
    },
    {
      id: 'firefighters-switch',
      heading: 'Firefighter\'s Switch Requirements',
      tocLabel: 'Firefighter\'s switch',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Outdoor lighting that operates above the low voltage threshold requires a dedicated firefighter\'s switch so the supply can be safely isolated from the road during an incident.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Regulation 537.4.2(a)',
          text:
            'A firefighter\'s switch shall be provided in the low-voltage circuit supplying outdoor lighting installations operating at a voltage exceeding low voltage. This applies to high-voltage floodlighting at sports stadiums, large outdoor venues and similar installations.',
        },
        {
          type: 'paragraph',
          text:
            'The switch must be positioned where the fire service can reach it from ground level, clearly labelled, and operable without keys, tools or unusual force. The local fire authority may have additional requirements on positioning and signage.',
        },
      ],
    },
    {
      id: 'isolation-and-bonding',
      heading: 'Isolation and Bonding',
      tocLabel: 'Isolation and bonding',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Outdoor lighting installations need their own readily accessible means of isolation — relying on a distributor\'s cut-out is not acceptable without explicit approval.',
        },
        {
          type: 'list',
          items: [
            'Each distribution circuit supplying outdoor lighting must have its own readily accessible and properly identifiable means of isolation. Multiple small fittings on the same circuit still require direct isolation of the distribution circuit itself.',
            'A contractor intending to isolate via the distributor\'s service cut-out must obtain the distributor\'s approval first.',
            'Regulation 714.411.3.1.2 covers protective equipotential bonding of metallic structures in the proximity of (but not part of) the outdoor lighting installation.',
            'Where a metallic structure (railing, fence, gantry) lies near an outdoor lighting column but is not part of it, the relationship to the main earthing terminal must be assessed and bonding applied if required.',
          ],
        },
      ],
    },
    {
      id: 'access-and-luminaire-mounting',
      heading: 'Access to Light Sources and Mounting Heights',
      tocLabel: 'Access and mounting',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Where luminaires are mounted within reach of the public, BS 7671 requires that access to live parts be deliberately difficult.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Mounting below 2.80 m: tool-required access',
          text:
            'A luminaire mounted below 2.80 m above ground must permit access to the light source only after removing a barrier or enclosure that requires the use of a tool. This prevents casual contact with live parts at hand-reachable heights.',
        },
      ],
    },
    {
      id: 'inspection-and-testing',
      heading: 'Periodic Inspection of Outdoor Lighting',
      tocLabel: 'Inspection and testing',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Outdoor lighting installations have a harsh duty cycle — weather, traffic vibration, vandalism and UV all degrade equipment. Verification covers:',
        },
        {
          type: 'list',
          tone: 'success',
          items: [
            'Continuity of protective conductors at every lighting column, sign, kiosk and structure.',
            'Insulation resistance (often degraded by moisture ingress through compromised gland seals).',
            'Earth fault loop impedance at the furthest point of each circuit — verify the 5 s disconnection time is achievable.',
            'RCD testing where additional protection is provided (e.g. socket-outlets in the installation).',
            'Polarity and correct connection of all luminaires and accessories.',
            'IP rating still satisfied — check gland seals, gaskets, enclosure integrity.',
            'Firefighter\'s switch operation where present.',
            'Physical condition: column corrosion at root level, door integrity, cable damage.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Periodic inspection interval — highway lighting',
          text:
            'IET Guidance Note 3 recommends a maximum periodic inspection interval of 6 years for highway lighting (with annual visual surveys), but local authorities and asset owners typically specify shorter intervals based on asset age and condition.',
        },
        {
          type: 'paragraph',
          text:
            'Documentation for outdoor lighting can extend beyond BS 7671 Part 6 — BS EN 62446 series provides additional requirements for system documentation, commissioning tests and inspection for larger installations.',
        },
      ],
    },
  ],
  howToSteps: [
    {
      name: 'Classify the installation under Section 714',
      text:
        'Determine whether the work is genuinely an "outdoor lighting installation", a "highway power supply / street furniture" item, or specifically excluded (luminaires fed from a building\'s internal wiring, road traffic signals as outdoor lighting, temporary festoons). The classification dictates which subsection applies.',
    },
    {
      name: 'Select IP-rated equipment for the actual external influences',
      text:
        'IP44 is the floor — but consider IP55 or higher for installations subject to hosing, hose-down wash, sea spray, or floodlighting on a sports pitch. Add UV stability and an appropriate IK rating where impact damage is foreseeable.',
    },
    {
      name: 'Design protection to meet 5 s disconnection',
      text:
        'For fixed outdoor lighting circuits, design the earth fault loop impedance and protective device selection to meet a 5 s maximum disconnection time per Regulation 714.411.202, whether TN or TT.',
    },
    {
      name: 'Fit a firefighter\'s switch if voltage exceeds LV',
      text:
        'Any outdoor lighting operating above the low voltage threshold requires a firefighter\'s switch per Regulation 537.4.2(a). Position the switch where the fire service can reach it from ground level without tools, label it clearly, and confirm requirements with the local fire authority.',
    },
    {
      name: 'Provide dedicated isolation per distribution circuit',
      text:
        'Each distribution circuit supplying outdoor lighting must have its own readily accessible and properly identifiable means of isolation. Do not rely on a distributor\'s service cut-out unless you have explicit approval from the distributor in writing.',
    },
    {
      name: 'Verify bonding of nearby metallic structures',
      text:
        'Where metalwork is close to a lighting column or street-furniture item but not part of it, assess the relationship to the main earthing terminal per Regulation 714.411.3.1.2 and bond where required.',
    },
  ],
  howToHeading: 'How to apply Section 714 on a real outdoor lighting project',
  howToDescription:
    'Sequence for an electrician, designer or local authority asset team installing or inspecting outdoor lighting, highway power supplies, or street furniture.',
  faqs: [
    {
      question: 'Are luminaires on the outside of my house covered by Section 714?',
      answer:
        'No — luminaires fixed to the outside of a building and supplied directly from the internal wiring of that building are explicitly excluded from Section 714. They fall under the general wiring regulations applicable to the building. Section 714 applies to dedicated outdoor lighting installations (highway, parks, car parks, floodlighting) and to highway power supplies / street furniture.',
    },
    {
      question: 'Does Section 714 apply to road traffic signals?',
      answer:
        'Yes, but not as "outdoor lighting". Road traffic signal systems are explicitly excluded from the outdoor lighting classification, however they are included within the definition of highway power supplies and street furniture — and therefore still fall under Section 714 requirements. The protection, disconnection time and isolation rules apply.',
    },
    {
      question: 'What is the maximum disconnection time for a street lighting column?',
      answer:
        '5 seconds, per Regulation 714.411.202. This applies whether the system is TN (per Regulation 411.3.2.3) or TT (per Regulation 411.3.2.4). Design earth fault loop impedance and protective device selection to achieve this disconnection time at the furthest point of the circuit.',
    },
    {
      question: 'When do I need a firefighter\'s switch on outdoor lighting?',
      answer:
        'Regulation 537.4.2(a) requires a firefighter\'s switch in the low-voltage circuit supplying any outdoor lighting installation operating at a voltage exceeding low voltage. Typical scenarios: high-voltage stadium floodlighting, large outdoor entertainment venues, illuminated advertising at significant scale. Position the switch where the fire service can operate it from ground level, label it clearly, and confirm any local fire authority requirements before sign-off.',
    },
    {
      question: 'Is IP44 enough for an outdoor luminaire in heavy rain?',
      answer:
        'IP44 is the absolute minimum and covers protection against solid objects greater than 1 mm and water splashing from any direction — it is fine for general outdoor use, including garden lighting in normal rain. Where the equipment is subject to hosing down (car parks washed with jet washers, sports stadium pitch-level fittings), specify IP55 or higher. For exposed coastal locations, also factor in UV stability and corrosion resistance of the enclosure.',
    },
    {
      question: 'Can I isolate a street lighting circuit using the distributor\'s cut-out?',
      answer:
        'Only with the distributor\'s approval. A contractor intending to isolate a street lighting circuit by operating the distributor\'s service cut-out must obtain the distributor\'s approval first. Without that approval, the distributor\'s cut-out shall not be relied on as the means of isolation — the installation must have its own readily accessible and properly identifiable means of isolation for each distribution circuit.',
    },
    {
      question: 'How often should outdoor lighting be inspected?',
      answer:
        'IET Guidance Note 3 recommends a maximum periodic inspection interval of 6 years for highway lighting installations, supported by annual visual surveys. Local authorities and asset owners frequently specify shorter intervals (3-4 years) based on asset age, condition and incident history. Larger and stadium installations often follow BS EN 62446 series for additional documentation and commissioning requirements beyond BS 7671 Part 6.',
    },
  ],
  relatedPages: [
    {
      href: '/tools/eicr-certificate',
      title: 'EICR Certificate Tool',
      description: 'Digital EICR with BS 7671 A4:2026 observation codes — includes outdoor lighting inspection workflow.',
      icon: 'FileCheck2',
      category: 'Tool',
    },
    {
      href: '/tools/earth-loop-impedance-calculator',
      title: 'Earth Loop Impedance (Zs) Calculator',
      description: 'Verify the 5 s disconnection time per Regulation 714.411.202 for fixed outdoor lighting circuits.',
      icon: 'Calculator',
      category: 'Tool',
    },
    {
      href: '/tools/cable-sizing-calculator',
      title: 'Cable Sizing Calculator (BS 7671 Appendix 4)',
      description: 'Size buried cable runs to street lighting columns including grouping and ambient temperature factors.',
      icon: 'Cable',
      category: 'Tool',
    },
    {
      href: '/guides/bs-7671-section-710-medical-locations',
      title: 'BS 7671 Section 710 Medical Locations',
      description: 'Another Part 7 special location with its own protection rules.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/guides/bs-7671-amendment-4-2026',
      title: 'BS 7671 Amendment 4 (2026) Summary',
      description: 'What changed in A4:2026 — including new requirements affecting outdoor and special location installations.',
      icon: 'BookOpen',
      category: 'Guide',
    },
    {
      href: '/guides/eicr-observation-codes-explained',
      title: 'EICR Observation Codes (C1, C2, C3, FI)',
      description: 'Common observation codes for outdoor lighting issues — corrosion, ingress, missing isolation.',
      icon: 'ClipboardCheck',
      category: 'Guide',
    },
  ],
  ctaHeading: 'Inspect outdoor lighting with confidence',
  ctaSubheading:
    'Elec-Mate ships the digital EICR tool, 70+ calculators and BS 7671:2018+A4:2026 reference materials UK electricians use on highway, car park and floodlighting projects. 7-day free trial, cancel anytime.',
};
