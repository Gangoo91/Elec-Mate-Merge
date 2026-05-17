import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in BS 7671:2018+A4:2026 (18th Edition), IET Guidance Note 3
// (Inspection & Testing, 9th Edition) and the IET On-Site Guide.

const published = '2026-05-17';
const modified = '2026-05-17';

export const cableSizeForCookerCircuitConfig: GeneratedGuideConfig = {
  pagePath: '/guides/cable-size-for-cooker-circuit',
  title:
    'Cable Size for a Cooker Circuit — UK Sizing Guide (with Diversity) | Elec-Mate',
  description:
    'Cable size for UK cooker circuits explained: 6 mm² for most domestic single-oven + hob installations after applying BS 7671 diversity, 10 mm² for double ovens / Range / commercial-spec cookers. Diversity calculation, cooker control unit selection and RCD protection.',
  datePublished: published,
  dateModified: modified,
  readingTime: 11,
  badge: 'Cable Sizing',
  badgeIcon: 'Cable',
  breadcrumbLabel: 'Cable Size for Cooker',
  heroPrefix: 'Cable Size for a',
  heroHighlight: 'Cooker Circuit',
  heroSuffix: '(With Diversity)',
  heroSubtitle:
    'Cooker circuits differ from showers and EV chargers in one critical way: BS 7671 permits diversity. A 10 kW cooker rated nameplate-current of 43 A typically only needs a 32 A protective device and 6 mm² cable after the diversity calculation. This guide explains the IET On-Site Guide diversity formula, cooker control unit selection, and the practical UK domestic sizing.',
  keyTakeaways: [
    'Cooker circuits get DIVERSITY under BS 7671 / IET On-Site Guide — first 10 A taken at 100%, remainder at 30%, plus 5 A for any cooker control unit with a socket-outlet.',
    'Most UK domestic single-oven + 4-burner hob installations end up at a diversified design current around 25-30 A — easily served by a 32 A protective device and 6 mm² cable on a typical run.',
    'Larger installations (double oven + 5-burner hob, Range cookers, induction hobs with built-in extractor) may require 10 mm² and a 40 A or 45 A protective device.',
    'A standard "cooker control unit" with built-in 13 A socket-outlet adds 5 A to the diversified design current and must have its socket-outlet on 30 mA RCD protection per Regulation 411.3.3.',
    'BS 7671:2018+A4:2026 Regulation 411.3.4 adds 30 mA RCD protection on AC luminaire final circuits in domestic premises — but the cooker circuit itself is not directly affected unless the cooker control unit also feeds a kitchen luminaire (rare).',
    'The cooker control unit must be outside the kitchen prep area\'s zone-of-easy-access — typical installation is at chest height to the side of the cooker, not directly above the hob.',
  ],
  sections: [
    {
      id: 'why-diversity',
      heading: 'Why Diversity Matters for Cooker Circuits',
      tocLabel: 'Why diversity',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Cookers, unlike showers and EV chargers, do not operate at full nameplate rating continuously. A 10 kW cooker has multiple elements (oven, grill, hob rings) that are individually controlled — most users have only some elements on at any time, and even those elements thermostatically cycle on and off rather than running continuously. BS 7671 and the IET On-Site Guide recognise this through the diversity formula.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'The IET On-Site Guide diversity formula for cookers',
          text:
            'Diversified current = first 10 A at 100% + remainder of total connected current at 30% + 5 A if the cooker control unit includes a socket-outlet. For a 10 kW (43.5 A) cooker on a control unit with a socket: Id = 10 + (43.5 - 10) × 0.30 + 5 = 10 + 10.05 + 5 ≈ 25 A.',
        },
        {
          type: 'paragraph',
          text:
            'The diversified current is the design current Ib used for cable sizing and protective device selection — NOT the nameplate full-load current. This is why a 10 kW cooker that would seem to need a 50 A circuit ends up sized for a 32 A circuit in practice.',
        },
      ],
    },
    {
      id: 'short-answer',
      heading: 'The Short Answer',
      tocLabel: 'Short answer',
      blocks: [
        {
          type: 'paragraph',
          text:
            'For typical UK domestic cooker installations:',
        },
        {
          type: 'list',
          tone: 'pricing',
          items: [
            '**Single oven + 4-burner ceramic / induction hob (typically 8-10 kW combined nameplate)** → 6 mm² twin-and-earth with 32 A protective device on a short run.',
            '**Single oven + 5-burner hob OR small Range cooker (10-13 kW combined)** → 6 mm² for short runs, 10 mm² for longer runs (>15 m) or where derating applies.',
            '**Double oven + 5-burner hob, or large Range cooker (14-18 kW combined)** → 10 mm² with 40 A protective device.',
            '**Commercial-spec or very large Range (20+ kW)** → 10 mm² minimum, possibly 16 mm² depending on diversity calculation and run length. Verify.',
          ],
        },
      ],
    },
    {
      id: 'diversity-worked-example',
      heading: 'Diversity Worked Example — 10 kW Cooker + Hob',
      tocLabel: 'Worked example',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A typical UK kitchen: built-in single oven 3 kW + 4-burner ceramic hob 7 kW = 10 kW combined connected load. Cooker control unit includes a 13 A socket-outlet. 230 V single-phase supply, 12 m cable run from consumer unit.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            '**Full-load current** If = 10,000 / 230 = 43.5 A. (Would need a 50 A circuit if there were no diversity — but there is.)',
            '**Apply IET diversity** — first 10 A at 100% = 10 A. Remainder of full load = 43.5 - 10 = 33.5 A. Apply 30% = 33.5 × 0.30 = 10.05 A. Add the socket-outlet 5 A. Diversified current Id = 10 + 10.05 + 5 = 25.05 A.',
            '**Design current Ib = 25 A** (rounded). Select protective device: 32 A Type B MCB or 32 A 30 mA Type A RCBO (next standard rating at or above Ib).',
            '**Cable selection** — 6 mm² twin-and-earth (6242Y), reference method 100 — Iz = 47 A. Ib (25 A) << Iz (47 A) — passes comfortably with headroom.',
            '**Voltage drop** — 6 mm² 6242Y at 7.3 mV/A/m. For 12 m at 25 A: 7.3 × 25 × 12 / 1000 = 2.19 V ≈ 0.95% of 230 V. Passes.',
            '**Disconnection time** — 32 A Type B MCB requires Zs ≤ 1.37 Ω at 0.4 s (Table 41.3 with correction). 12 m of 6 mm² with proper bonding will typically be 0.4-0.6 Ω at the cooker. Passes.',
          ],
        },
        {
          type: 'callout',
          tone: 'success',
          title: 'Conclusion',
          text:
            '6 mm² twin-and-earth with a 32 A 30 mA Type A RCBO is the standard UK installation for a typical 10 kW cooker + hob with cooker control unit including a socket-outlet on a short run.',
        },
      ],
    },
    {
      id: 'larger-installations',
      heading: 'Larger Cookers and Range Cookers',
      tocLabel: 'Range cookers',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Range cookers and double-oven installations have higher connected loads. The diversity calculation still applies but the diversified current rises:',
        },
        {
          type: 'list',
          items: [
            '**Double oven (5 kW) + 5-burner gas hob (1 kW for ignition) + extractor (0.3 kW) ≈ 6.3 kW** — diversified Id ≈ 10 + (27.4 - 10) × 0.3 + 5 = 20.2 A. Easily 6 mm² with 25 A protective device.',
            '**Double oven (5 kW) + 5-burner ceramic hob (8 kW) = 13 kW** — diversified Id ≈ 10 + (56.5 - 10) × 0.3 + 5 = 28.95 A. 6 mm² with 32 A RCBO.',
            '**Range cooker (e.g. AGA all-electric, induction Range) 18 kW** — diversified Id ≈ 10 + (78.3 - 10) × 0.3 + 5 = 35.5 A. 10 mm² with 40 A RCBO.',
            '**Very large commercial-spec installation (20+ kW)** — diversified Id approaching 40-45 A. 10 mm² typically, but verify the design.',
          ],
        },
      ],
    },
    {
      id: 'cooker-control-unit',
      heading: 'Cooker Control Unit Selection',
      tocLabel: 'Control unit',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A cooker control unit (CCU) is a double-pole switch unit that isolates the cooker. Two main types in UK domestic use:',
        },
        {
          type: 'list',
          items: [
            '**CCU with 13 A socket-outlet** — combines isolation + a kitchen socket-outlet on the same plate. The socket-outlet adds 5 A to the diversity calculation per the IET formula. The socket-outlet is RCD-protected by the cooker circuit\'s 30 mA RCBO.',
            '**CCU without socket-outlet** — pure isolator. No socket-outlet, no 5 A diversity addition. Common where a separate ring final circuit serves the rest of the kitchen sockets.',
            '**Pole configuration** — always double-pole, isolating both line and neutral.',
            '**Current rating** — at least equal to the protective device rating. Common UK ratings are 32 A and 45 A.',
            '**Position** — to the side of the cooker, within reach but not directly above the hob (heat / steam exposure). Typical UK practice is at chest height, 100-300 mm offset from the cooker side.',
          ],
        },
      ],
    },
    {
      id: 'rcd-and-a4',
      heading: 'RCD Protection and A4:2026',
      tocLabel: 'RCD + A4',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A cooker circuit\'s RCD requirements come from a combination of regulations:',
        },
        {
          type: 'list',
          items: [
            '**Regulation 411.3.3** — 30 mA RCD on any socket-outlet circuit intended for general use up to 32 A. The 13 A socket-outlet in a cooker control unit falls under this — RCD protection required.',
            '**Regulation 522.6.202** — 30 mA RCD on cables concealed in walls without earthed metallic covering, at depth less than 50 mm. Most cooker circuits run partially in this category.',
            '**Regulation 411.3.4 (new in A4:2026)** — 30 mA RCD on AC luminaire final circuits in domestic premises. Direct cooker circuits don\'t feed luminaires, so this regulation doesn\'t directly apply unless an installer has mis-wired a kitchen light from the cooker control unit (rare and non-compliant).',
            '**Type selection** — Type A or higher recommended for modern cookers with electronic temperature controls and induction hobs. Type AC may not reliably detect DC fault current components from induction hob switching.',
          ],
        },
      ],
    },
    {
      id: 'common-mistakes',
      heading: 'Common Cooker Cable Sizing Mistakes',
      tocLabel: 'Common mistakes',
      blocks: [
        {
          type: 'list',
          tone: 'warning',
          items: [
            '**Ignoring diversity and sizing for full nameplate load** — over-specifying. A 10 kW cooker on full-load current basis would need a 50 A circuit, but with proper diversity calculation a 32 A circuit on 6 mm² is correct.',
            '**Applying diversity to a non-cooker high-power load** — diversity is specific to cookers and certain other discontinuous loads. EV chargers, electric showers, immersion heaters are CONTINUOUS loads and DO NOT get diversity — size them on full-load current.',
            '**Forgetting the 5 A addition for a socket-outlet CCU** — adding the socket on the cooker control unit increases Id by 5 A in the IET formula. Missing this can leave the circuit slightly undersized.',
            '**Wrong Type AC RCD for modern induction hob** — Type AC RCDs can fail to trip on DC fault components from induction hob switching electronics. Specify Type A or higher.',
            '**Sharing cooker circuit with other loads** — a cooker circuit should be dedicated. Sharing with kitchen sockets or other loads invalidates the diversity calculation (the assumption that the cooker is the dominant load no longer holds).',
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'Why does a 10 kW cooker only need a 32 A circuit?',
      answer:
        'Because of diversity. The IET On-Site Guide diversity formula for cookers is: first 10 A at 100% + remainder of total connected current at 30% + 5 A if the cooker control unit includes a socket-outlet. For a 10 kW cooker (43.5 A nameplate), this gives a diversified design current of about 25 A — well within a 32 A circuit. The diversity reflects the reality that cookers cycle elements on and off rather than running at full power continuously.',
    },
    {
      question: 'Can I use diversity for an induction hob?',
      answer:
        'Yes — induction hobs are still cookers for BS 7671 / IET On-Site Guide purposes. Apply the same diversity formula. Induction hobs do switch more quickly than ceramic hobs and have higher peak draws during boost mode, but the average load is still well below nameplate. The diversity calculation handles this. For a 7.2 kW induction hob alongside a 3 kW oven, diversified Id ≈ 18-22 A depending on whether a socket-outlet is included.',
    },
    {
      question: 'Do I need a 30 mA RCD on the cooker circuit?',
      answer:
        'If the cooker control unit has a 13 A socket-outlet, yes — Regulation 411.3.3 requires 30 mA RCD on any socket-outlet circuit intended for general use up to 32 A. If the cable run is concealed in walls at less than 50 mm depth without earthed metallic covering, Regulation 522.6.202 also requires 30 mA RCD. In practice, most modern UK domestic cooker circuits use a 32 A or 40 A Type A 30 mA RCBO which satisfies both requirements simultaneously.',
    },
    {
      question: 'Where do I position the cooker control unit?',
      answer:
        'BS 7671 doesn\'t give an exact distance, but kitchen good practice is: to the side of the cooker (not directly above the hob — heat / steam / cleaning issues), at chest height (typically 1.2-1.4 m above floor level), within easy reach but not exposed to splashing or direct steam. The IET Code of Practice for Kitchen Installations and the BS 8210 Code of Practice for Building Maintenance Management provide additional guidance. A common position is 100-300 mm offset from the cooker side, on the wall.',
    },
    {
      question: 'What\'s the difference between a CCU with and without a socket-outlet?',
      answer:
        'A CCU with a 13 A socket-outlet (often labelled "cooker control unit with socket") provides both isolation for the cooker AND a kitchen socket-outlet on the same face plate. Convenient for a kettle / toaster near the cooker. A CCU without a socket-outlet is purely an isolator. The choice affects diversity calculation (5 A more for the socket-outlet version) and the kitchen socket-outlet layout overall. In most modern kitchens, the dedicated cooker socket-outlet is on a separate ring final circuit and the CCU is just an isolator — but the combined unit remains common in smaller kitchens.',
    },
    {
      question: 'Do I need a separate cooker circuit if I have a Range cooker?',
      answer:
        'Yes — almost always. Range cookers (especially all-electric or induction Range models) have connected loads in the 15-25 kW range, well above what can be served by sharing a circuit with anything else. The diversified design current still gives a manageable cable size (10 mm² typically, sometimes 16 mm² for very large installations), but the circuit must be dedicated. The protective device is typically 40 A or 45 A. Verify with the cooker manufacturer\'s installation instructions — many large Range cookers specify exact circuit and cable requirements.',
    },
    {
      question: 'Does the cooker circuit need an isolator if I have a CCU?',
      answer:
        'The cooker control unit IS the isolator — that\'s its primary function. A separate isolator is not required. The CCU provides double-pole isolation for the cooker, mounted where the user (or an electrician working on the cooker) can reach it. This is similar to the dedicated shower isolator requirement (Regulation 701.512.3 for showers), but cooker isolation is a practical accessibility requirement rather than a Section 7-specific regulation.',
    },
  ],
  relatedPages: [
    {
      href: '/tools/cable-sizing-calculator',
      title: 'Cable Sizing Calculator (BS 7671 Appendix 4)',
      description: 'Free interactive calculator with built-in cooker diversity option.',
      icon: 'Calculator',
      category: 'Tool',
    },
    {
      href: '/tools/max-demand-calculator',
      title: 'Maximum Demand Calculator',
      description: 'Apply diversity to the whole installation, not just the cooker circuit.',
      icon: 'Calculator',
      category: 'Tool',
    },
    {
      href: '/guides/cable-size-for-electric-shower',
      title: 'Cable Size for an Electric Shower',
      description: 'Contrast: showers do NOT get diversity — they\'re continuous loads.',
      icon: 'Cable',
      category: 'Guide',
    },
    {
      href: '/guides/cable-size-for-ev-charger',
      title: 'Cable Size for an EV Charger',
      description: 'Another continuous-load circuit with no diversity allowance.',
      icon: 'Cable',
      category: 'Guide',
    },
    {
      href: '/guides/kitchen-electrical-regulations',
      title: 'Kitchen Electrical Regulations',
      description: 'Wider kitchen circuit design — socket-outlets, lighting, extractor.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/tools/voltage-drop-calculator',
      title: 'Voltage Drop Calculator',
      description: 'Verify the 3% / 5% voltage drop limit for the cooker cable run.',
      icon: 'Calculator',
      category: 'Tool',
    },
  ],
  ctaHeading: 'Size cooker circuits with diversity built in',
  ctaSubheading:
    'Elec-Mate\'s Cable Sizing Calculator applies the IET diversity formula automatically — enter the cooker nameplate, choose CCU type, get the diversified design current and recommended cable size. 7-day free trial.',
};
