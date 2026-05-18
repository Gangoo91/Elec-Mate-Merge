import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in BS 7671:2018+A4:2026 (18th Edition, published 15 April 2026),
// BS EN 50173 (Generic cabling), BS EN 50174 (Cable installation practice),
// IEEE 802.3bt (PoE Type 3 & 4) and TIA TSB-184-A (Telecommunications Industry
// Association — guidelines for supporting PoE).

const published = '2026-05-17';
const modified = '2026-05-18';

export const cat6Cat6aCurrentRatingPoeConfig: GeneratedGuideConfig = {
  pagePath: '/guides/cat6-cat6a-current-rating-poe',
  title:
    'Cat6 vs Cat6a Current Rating for PoE Installations | Bundle',
  description:
    'Cat6 vs Cat6a current rating for PoE — conductor area, current per pair by PoE type, bundle de-rating, ambient impact, LSZH vs PVC…',
  datePublished: published,
  dateModified: modified,
  readingTime: 14,
  badge: 'Data Cabling & PoE',
  badgeIcon: 'Cable',
  breadcrumbLabel: 'Cat6 vs Cat6a Current Rating (PoE)',
  heroPrefix: 'Cat6 vs Cat6a Current Rating',
  heroHighlight: 'for PoE Installations',
  heroSuffix: '— Bundle De-rating Guide',
  heroSubtitle:
    'Power over Ethernet has graduated from a low-current curiosity to a serious electrical load. IEEE 802.3bt Type 4 delivers up to 90 W per port across four pairs, and a fully-loaded 48-port switch into a ceiling-void bundle now draws continuous current comparable to a small lighting circuit. This guide explains the current carrying capacity of Cat6 and Cat6a in PoE service, how bundle de-rating works, how ambient temperature changes the maths, and what TIA TSB-184-A, BS EN 50173 and BS EN 50174 actually require.',
  keyTakeaways: [
    'PoE current is DC, carried across the cable pairs. Type 3 (60 W) and Type 4 (90 W) use all four pairs. At the Type 4 limit, current is approximately 0.45 to 0.6 A per conductor depending on PD voltage and cable losses.',
    'Conductor cross-sectional area dominates thermal performance. Cat5e (24 AWG) is 0.205 mm², Cat6 (23 AWG) is 0.258 mm², Cat6a is 23 AWG stranded or 22 AWG solid (up to 0.326 mm²). More copper means lower DC loop resistance and cooler running.',
    'Bundle de-rating is the real design constraint. TIA TSB-184-A reports approximately 5 °C rise inside a 24-cable Cat6 UTP bundle at full Type 4, and around 15 °C for a 100-cable Cat5e bundle — past the 60 °C rated operating temperature.',
    'Ambient stacks on top of bundle rise. A 40 °C ceiling void plus a 10 °C rise puts the cable jacket at 50 °C, leaving minimal margin before performance and life degrade.',
    'LSZH jackets are required by BS 7671:2018+A4:2026 Section 422 and Approved Document B in escape routes, risers and protected zones. LSZH does not give thermal headroom over PVC — the choice is driven by fire and smoke behaviour, not PoE heat.',
    'BS EN 50174 limits pull tension to 110 N (about 11.3 kgf) for Cat6/Cat6a UTP. Exceeding this stretches conductors and raises DC loop resistance — which directly raises PoE heat.',
    'Open ladder rack and basket trays are materially better than enclosed conduit. The same bundle in sealed conduit can more than double its temperature rise.',
  ],
  sections: [
    {
      id: 'why-cable-current-rating-matters-for-poe',
      heading: 'Why Cable Current Rating Suddenly Matters for PoE',
      tocLabel: 'Why current rating matters',
      blocks: [
        {
          type: 'paragraph',
          text:
            'For most of the history of Ethernet, installers only worried about signal performance — return loss, NEXT, insertion loss, and the 100 m channel limit. Current was negligible.',
        },
        {
          type: 'paragraph',
          text:
            'PoE changed that. IEEE 802.3af introduced 15.4 W per port; 802.3at took it to 30 W; 802.3bt, ratified in 2018, brought Type 3 at 60 W and Type 4 at 90 W — both spreading load across all four pairs. At Type 4 with a PD voltage near 50 V, total cable current is roughly 1.8 A, giving 0.45 to 0.6 A per conductor.',
        },
        {
          type: 'paragraph',
          text:
            'On a single isolated cable, 0.6 A is unremarkable. But PoE cables are bundled — 24, 48, sometimes 96 cables packed together for tens of metres through ceiling voids, risers and conduit. The problem is bundle heat dissipation with nowhere to escape.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'PoE is now a continuous current load',
          text:
            'Cameras, access control panels, LED lighting and digital signage all run effectively 24/7. The "continuous current" assumption that drives BS 7671 derating for mains circuits applies to PoE in everything but name. See our [PoE++ Type 4 90 W installation guide](/guides/poe-plus-plus-type-4-90w-installation) for wider Type 4 design context.',
        },
      ],
    },
    {
      id: 'conductor-area-by-cable-category',
      heading: 'Conductor Cross-Sectional Area by Cable Category',
      tocLabel: 'Conductor area by category',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Category determines conductor gauge, which determines DC loop resistance — the biggest single factor in PoE heat. More copper, lower I²R loss per metre, cooler bundle.',
        },
        {
          type: 'list',
          items: [
            'Cat5e — 24 AWG solid, 0.205 mm² cross-sectional area, typical DC loop resistance of around 9.4 ohms per 100 m per pair.',
            'Cat6 — 23 AWG solid, 0.258 mm² cross-sectional area, typical DC loop resistance of around 7.4 ohms per 100 m per pair. Roughly 26 per cent more copper than Cat5e.',
            'Cat6a UTP or F/UTP — 23 AWG stranded or 22 AWG solid, 0.258 mm² to 0.326 mm² cross-sectional area, DC loop resistance of around 6.6 to 5.8 ohms per 100 m per pair. Up to 60 per cent more copper than Cat5e in the 22 AWG case.',
            'Cat7 / Cat7a / Cat8 — 22 AWG individually screened pairs (S/FTP). Lowest DC loop resistance of any category.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'In a 48-cable bundle running Type 4, the gap between Cat5e and Cat6a is roughly 10 °C vs 5 °C rise — which decides whether the install passes or fails.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Stranded patch cable is not solid-core horizontal cable',
          text:
            'Stranded cable used for patch leads has measurably higher DC resistance than solid-core for the same nominal AWG. Permanent horizontal runs must be solid-core. Using stranded patch as fixed cabling is a common cause of PoE under-voltage at the PD and excess heat in the bundle.',
        },
      ],
    },
    {
      id: 'current-per-pair-by-poe-type',
      heading: 'Maximum Current per Pair by PoE Type',
      tocLabel: 'Current per PoE type',
      blocks: [
        {
          type: 'paragraph',
          text:
            'IEEE 802.3 specifies maximum power at the PSE, minimum power at the PD, and a voltage band. Current per pair falls out of those once you fix PD voltage and cable resistance.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'IEEE 802.3af (Type 1, "PoE") — 15.4 W at PSE, 12.95 W at PD, two pairs used, around 175 mA per conductor. Heat negligible.',
            'IEEE 802.3at (Type 2, "PoE+") — 30 W at PSE, 25.5 W at PD, two pairs used, around 360 mA per conductor.',
            'IEEE 802.3bt Type 3 ("PoE++", "4PPoE") — 60 W at PSE, 51 W at PD, all four pairs used, around 300 mA per conductor.',
            'IEEE 802.3bt Type 4 — 90 W at PSE, 71.3 W minimum at PD, all four pairs used, 450 to 600 mA per conductor depending on PD voltage and cable losses. This is the design case for bundle heating.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'The key number is I²R loss per metre. For Cat6 at 600 mA per conductor that is around 0.27 W per metre across all four conductors. Multiply by a 24-cable bundle and you have 6 to 7 W per metre dissipating into the bundle.',
        },
      ],
    },
    {
      id: 'bundle-derating-curve',
      heading: 'The Bundle De-rating Curve — TIA TSB-184-A',
      tocLabel: 'Bundle de-rating curve',
      blocks: [
        {
          type: 'paragraph',
          text:
            'TIA TSB-184-A is the industry design reference for PoE bundle sizing. BS EN 50174-1 references the same body of work via informative annexes. Headline figures in free air at 20 °C lab ambient:',
        },
        {
          type: 'list',
          items: [
            '1 to 6 cables, free air — negligible rise (under 1 °C) at any PoE type up to Type 4.',
            '12 cables, Cat6 UTP, Type 4 — approximately 3 °C rise above ambient at the centre of the bundle.',
            '24 cables, Cat6 UTP, Type 4 — approximately 5 °C rise. This is the most quoted figure from TSB-184-A and is the reference design point.',
            '48 cables, Cat6 UTP, Type 4 — approximately 8 to 10 °C rise.',
            '100 cables, Cat5e UTP, Type 4 — approximately 15 °C rise. Generally regarded as the upper bound before active intervention is required.',
            '100 cables, Cat6a UTP, Type 4 — approximately 8 to 10 °C rise. The lower DC resistance of Cat6a roughly halves the rise relative to Cat5e at the same bundle size.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'The TIA numbers assume 20 °C ambient — yours may not',
          text:
            'TSB-184-A measurements are conducted at lab ambient. In a UK summer ceiling void above an open-plan office, ambient can sit at 35 to 40 °C continuously; in an unventilated south-facing riser, 45 to 50 °C is not unusual. The bundle rise stacks on top of whatever ambient your building actually delivers.',
        },
      ],
    },
    {
      id: 'ambient-temperature-impact',
      heading: 'Ambient Temperature Impact — 40 °C to 60 °C',
      tocLabel: 'Ambient temperature',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Most Category cable is rated for continuous operation up to 60 °C conductor temperature. Above that the dielectric drifts (degrading signal performance) and the jacket begins long-term creep. Rule: ambient plus bundle rise must stay below 60 °C with margin.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            '25 °C ambient + 5 °C bundle rise (24 Cat6, Type 4) = 30 °C operating. Plenty of headroom — the design point most office installations should aim for.',
            '35 °C ambient + 5 °C rise = 40 °C operating. Still safe.',
            '40 °C ambient + 10 °C rise (48 Cat6, Type 4) = 50 °C operating. Within rating; margin shrinking. Specify Cat6a to reduce the rise.',
            '50 °C ambient + 10 °C rise = 60 °C operating. At the limit. Not recommended for new design — use smaller bundles, Cat6a, ventilation or lower PoE type.',
            '60 °C ambient + meaningful bundle rise — cable is being driven beyond its rated operating temperature. PoE current must be limited, bundles broken up, or routing changed.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'For how ambient correction integrates with the wider BS 7671 derating framework for parallel mains cabling, see our [correction factors guide](/guides/correction-factors-guide).',
        },
      ],
    },
    {
      id: 'heat-in-enclosed-pathways',
      heading: 'Total Cable Bundle Heat in Enclosed Pathways',
      tocLabel: 'Heat in enclosed pathways',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A horizontal bundle on an open mesh basket above a suspended ceiling behaves very differently from the same bundle in a riser conduit or sealed firestop. The difference is whether convective airflow can carry heat away.',
        },
        {
          type: 'list',
          items: [
            'Open ladder rack / open basket tray — free convective airflow on all sides. TSB-184-A figures apply directly.',
            'Closed cable tray with lid — modest restriction. Add roughly 1.5 to 2 °C to the TSB-184-A figure.',
            'Round PVC conduit, partially filled (under 40 per cent) — moderate restriction. Add 3 to 5 °C.',
            'Round PVC conduit, densely packed (60 per cent or more) — bundle rise can more than double. A 24-cable bundle rising 5 °C in free air may rise 12 to 15 °C in packed conduit.',
            'Riser shafts with no ventilation — the worst case. Hot air rises and accumulates at the top. Bundles in unventilated risers running Type 4 PoE for 50 m have been measured above 70 °C in industry case studies.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Firestop sleeves trap heat',
          text:
            'Intumescent firestop sleeves at fire compartment boundaries are airtight by design and concentrate heat at the crossing point. Where possible, split bundles into multiple smaller sleeves with thermal breaks between them rather than routing the entire bundle through a single sealed sleeve.',
        },
      ],
    },
    {
      id: 'lszh-vs-pvc-jacket',
      heading: 'LSZH vs PVC Jacket — Thermal and Fire Performance',
      tocLabel: 'LSZH vs PVC jacket',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Jacket choice has a fire-safety dimension (mandated by BS 7671:2018+A4:2026, Approved Document B and BS 6701) and a thermal dimension (driven by PoE bundle heat). The two are not always aligned.',
        },
        {
          type: 'list',
          items: [
            'PVC jacket (Cca, Dca to BS EN 13501-6) — continuous operating temperature 60 to 75 °C. Cheaper. Emits dense black smoke and HCl gas when burnt. Not permitted in protected escape routes, risers or assembly buildings under Approved Document B.',
            'LSZH (B2ca or Cca to BS EN 13501-6) — continuous operating temperature 60 to 70 °C. More expensive. Emits much less smoke and no halogen gases. Required in escape routes, risers, hospital corridors and many commercial new-builds.',
            'PVC and LSZH are equivalent for PoE current-carrying purposes inside the 60 °C operating window. LSZH does not give more thermal headroom — its advantage is fire and smoke behaviour.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'For the wider rules on installing data cabling — including jacket selection by building type, routing and segregation — see our [BS EN 50174 data cable installation guide](/guides/bs-en-50174-data-cable-installation). For the underlying generic cabling standard that defines what Cat6 and Cat6a actually mean, see our [structured cabling BS EN 50173 guide](/guides/structured-cabling-bs-en-50173-electricians).',
        },
      ],
    },
    {
      id: 'pull-tension-limits',
      heading: 'Pull-Tension Limits During Installation',
      tocLabel: 'Pull-tension limits',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Installation damage is the silent killer of PoE bundles. A cable pulled too hard passes signal certification but fails thermally months later under Type 4 load — the pull stretched the conductors, adding 10 to 20 per cent to DC loop resistance, which becomes extra I²R heat.',
        },
        {
          type: 'list',
          items: [
            'Cat6 UTP, 4-pair — maximum pull tension 110 N (approximately 11.3 kgf). The universal industry figure, in BS EN 50174-2.',
            'Cat6a UTP, 4-pair — same 110 N limit. The constraint is set by dielectric and jacket, not copper.',
            'Cat6a F/UTP and Cat7/Cat7a S/FTP — typically 130 to 150 N depending on manufacturer.',
            'Bend radius during installation — at least 4x the cable outer diameter for Cat6, 8x for Cat6a.',
            'Bend radius after installation — at least 1x the cable outer diameter once the cable is at rest.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Use a tension-measuring puller for long runs',
          text:
            'Hand-pulling Cat6/Cat6a through long conduit runs almost always exceeds 110 N — a determined two-person pull on a stuck cable can exceed 200 N. Use a winch puller with a calibrated tension limiter, or pull in shorter stages with intermediate access points. Over-pull damage is invisible from outside the jacket.',
        },
      ],
    },
    {
      id: 'recommended-max-bundle-size',
      heading: 'Recommended Maximum Bundle Size by Category and PoE Type',
      tocLabel: 'Max bundle size table',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Combining conductor area, current per pair, ambient, pathway type and the TSB-184-A curve, the practical design recommendations for UK installations:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Cat5e UTP, Type 1 or 2 — no practical bundle limit up to 100 cables in free air. Heat negligible.',
            'Cat5e UTP, Type 3 — maximum 48 cables in free air, 24 in conduit. Not recommended for new installs; specify Cat6 or Cat6a.',
            'Cat5e UTP, Type 4 — not recommended. Use Cat6 minimum.',
            'Cat6 UTP, Type 3 — maximum 96 cables in free air, 48 in conduit.',
            'Cat6 UTP, Type 4 — maximum 48 cables in free air, 24 in conduit. The standard commercial office design point.',
            'Cat6a UTP/F/UTP, Type 3 — no practical limit up to 100 cables in free air; 96 in conduit. Preferred for any new PoE-heavy installation.',
            'Cat6a UTP/F/UTP, Type 4 — maximum 96 cables in free air, 48 in conduit. Roughly double the bundle capacity of Cat6 at the same PoE type.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'These figures assume 25 to 30 °C pathway ambient and continuous current at design maximum. For higher ambient — plant rooms, south-facing risers, unventilated voids over IT rooms — reduce bundle sizes by 25 to 50 per cent.',
        },
      ],
    },
    {
      id: 'tia-tsb-184a-bundle-recommendations',
      heading: 'TIA TSB-184-A Bundle Recommendations',
      tocLabel: 'TIA TSB-184-A detail',
      blocks: [
        {
          type: 'paragraph',
          text:
            'TIA TSB-184-A "Guidelines for Supporting Power Delivery Over Balanced Twisted-Pair Cabling" is advisory under UK law but universally followed and underpins manufacturer PoE warranties.',
        },
        {
          type: 'list',
          items: [
            'Recommendation 1 — for any IEEE 802.3bt Type 3 or Type 4 installation, specify Category 6 minimum, Category 6a strongly preferred for new builds.',
            'Recommendation 2 — limit bundles to 24 cables in free air for the worst case (Cat6 UTP, Type 4, 60 °C operating environment). Larger bundles permitted with lower PoE types, larger conductors (Cat6a) or lower ambient.',
            'Recommendation 3 — where high bundle counts are unavoidable, use Cat6a or higher, increase cable spacing (open ladder rack), and ventilate the pathway.',
            'Recommendation 4 — calculate temperature rise from manufacturer-published per-cable dissipation figures, not generic rules of thumb. Different jackets and screens change the result by 1 to 3 °C.',
            'Recommendation 5 — for cables in conduit, derate bundle size by 50 per cent relative to the free-air figure. For densely-packed conduit or sealed sleeves, derate further or specify Cat6a as a baseline.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'BS EN 50174-2:2018 informative annex',
          text:
            'BS EN 50174-2:2018 includes an informative annex on PoE thermal considerations that mirrors the TSB-184-A approach. The annex is informative (not normative), but UK specifiers including NHS Estates, MoD and large commercial new-build reference BS EN 50174-2 explicitly in cabling specifications.',
        },
      ],
    },
    {
      id: 'routing-best-practice',
      heading: 'Routing Best Practice — Open Ladder vs Enclosed Conduit',
      tocLabel: 'Routing best practice',
      blocks: [
        {
          type: 'paragraph',
          text:
            'For BS 7671 mains cabling, conduit is the gold standard. For PoE-heavy data cabling, it is the worst choice — PoE bundles need airflow to manage I²R heat, and conduit removes it.',
        },
        {
          type: 'list',
          items: [
            'Open ladder rack — preferred for high-density PoE. Cables sit on rungs with airflow on all four sides. Largest bundles and highest PoE types permitted.',
            'Wire mesh basket — almost as good as ladder. Airflow on three sides, mesh acts as a heat sink. Standard for commercial office ceiling voids.',
            'Closed cable tray with lid — acceptable for medium density. Apply TSB-184-A free-air figures plus 1 to 2 °C.',
            'PVC conduit, well-spaced — acceptable for low to medium density PoE. Derate the bundle to 50 per cent of free air.',
            'PVC conduit, densely packed — avoid for Type 3 or Type 4. No thermal escape route.',
            'Plenum spaces — air movement helps cool the bundle, but many UK jurisdictions require LSZH or plenum-rated jackets. Check Approved Document B and local building control.',
            'Risers — must be vented top and bottom for any high-density PoE. A sealed riser with 48 cables of Type 4 will accumulate heat at the top, with cables there 10 to 15 °C hotter than at the bottom.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'BS 7671 Section 528 separation between Band I (data, ELV) and Band II (mains) for EMC reasons incidentally also helps PoE thermally — the bundle is not in contact with warm mains cables.',
        },
      ],
    },
    {
      id: 'bs-7671-and-a4-2026-considerations',
      heading: 'BS 7671:2018+A4:2026 Considerations',
      tocLabel: 'BS 7671 considerations',
      blocks: [
        {
          type: 'paragraph',
          text:
            'BS 7671:2018+A4:2026 governs the mains supply side of any PoE installation — the circuits feeding the switches, distribution-board protection, and bonding of network equipment. The PoE cabling itself (Cat6/Cat6a at 50 to 57 V DC) is SELV.',
        },
        {
          type: 'list',
          items: [
            'Section 414 — protection by SELV and PELV. PoE at 50 to 57 V DC qualifies as SELV when the source is double-insulated and isolated from earth.',
            'Section 422 — protection against fire. Where PoE cables run in protected escape routes, risers or assembly buildings, LSZH (or higher) fire performance is required.',
            'Section 528 — proximity to other services. Maintain segregation from Band II mains cabling to satisfy both BS 7671 and BS EN 50174-2 EMC requirements.',
            'Section 542 — earthing arrangements. Network cabinets and PoE switch chassis must be bonded to the main earthing terminal. Functional earth connections for shielded Cat6a (F/UTP, S/FTP) are covered here.',
            'Section 715 — ELV lighting installations. Applies to PoE-driven lighting under A4:2026. See our [Section 715 ELV lighting A4:2026 guide](/guides/section-715-elv-lighting-a4-2026).',
          ],
        },
        {
          type: 'callout',
          tone: 'pricing',
          title: 'EICR and EIC implications',
          text:
            'For BS 7671 inspection and testing, PoE switches are fixed equipment. The supply circuit is tested in the normal way — IR, polarity, Zs, RCD operation. The PoE cabling itself is not a BS 7671 circuit and is not tested on the EIC or EICR — but manufacturers require a structured-cabling certification test (Fluke DSX or equivalent) for warranty validity.',
        },
      ],
    },
    {
      id: 'design-checklist',
      heading: 'Design Checklist for a Compliant PoE Installation',
      tocLabel: 'Design checklist',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A practical checklist for the design stage of a PoE-heavy commercial project:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Identify the PoE type per device. Do not assume Type 4 — most cameras and access control panels are Type 2 or 3.',
            'Calculate total simultaneous current draw on the PoE switch — drives mains supply sizing and switch power budget.',
            'Specify the cable category — Cat6 minimum for Type 3 or 4; Cat6a preferred for high-density.',
            'Map the cable routes — ceiling voids, risers, conduits, firestops, plenum. Note ambient in each pathway.',
            'Size the bundles — apply TSB-184-A figures, derated for pathway type and ambient.',
            'Specify the jacket compound — LSZH for escape routes, risers and protected zones (Section 422 and Approved Document B).',
            'Plan firestops — split bundles across multiple sleeves where layout allows.',
            'Specify the mains supply to each PoE switch — sized and protected per BS 7671, RCD where required, labelled.',
            'Specify the structured cabling certification — Fluke DSX or equivalent, with PoE thermal report in handover.',
            'Schedule a thermal recheck 3 to 6 months after full PoE load is applied to confirm bundles are running within the design envelope.',
          ],
        },
      ],
    },
    {
      id: 'elec-mate-tools',
      heading: 'Tools That Make This Easier',
      tocLabel: 'In-app tools',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Hand-calculating PoE bundle thermal performance for a 200-luminaire office traditionally fell to a building services consultant. Most UK contractors taking on PoE work will be doing the design themselves.',
        },
        {
          type: 'list',
          tone: 'success',
          items: [
            'Cable sizing calculator — for the mains supply to PoE switches, sized to BS 7671:2018+A4:2026 with current carrying capacity, voltage drop and earth fault loop impedance checks.',
            'EIC certificate tool — for the mains supply circuits to PoE switches and network cabinets. BS 7671:2018+A4:2026 model form, AFDD declaration, digital sign-off.',
            'Quoting app — itemised quotes for PoE-heavy commercial work including structured cabling, terminations, certification testing and the mains supply.',
            'Mate (the in-app AI assistant) can answer design questions like "what is the maximum bundle size for Cat6a Type 4 in a 40 °C ceiling void" with a worked figure plus references.',
          ],
        },
        {
          type: 'callout',
          tone: 'pricing',
          title: 'Included on the Electrician tier',
          text:
            'The BS 7671 calculator and certificate tools are included with the Elec-Mate Electrician subscription. 7-day free trial, cancel anytime.',
        },
      ],
    },
  ],
  howToHeading: 'How to Size and De-rate a Cat6/Cat6a PoE Bundle',
  howToDescription:
    'A six-step working method for taking a PoE-heavy installation from device list to a defensible, certifiable cable design.',
  howToSteps: [
    {
      name: 'Total the PoE load and find the worst-case bundle',
      text:
        'List every powered device, its PoE type, and its location. Identify the longest, hottest, most densely-bundled pathway — that is the worst-case bundle, and the rest of the design works inwards from it.',
    },
    {
      name: 'Choose the cable category from the worst-case bundle',
      text:
        'Apply the practical bundle-size table. If the worst case would exceed 24 cables of Cat6 UTP at Type 4, upgrade the whole installation to Cat6a — partial upgrades are not warrantied by major manufacturers.',
    },
    {
      name: 'Calculate ambient + bundle rise for each pathway',
      text:
        'For each pathway take the design ambient from the building services HVAC schedule, add the TSB-184-A bundle rise, and confirm the result stays below 60 °C with margin. See the [correction factors guide](/guides/correction-factors-guide) for parallel mains cabling considerations.',
    },
    {
      name: 'Select the routing method',
      text:
        'Open ladder rack and basket trays are preferred for any high-density PoE bundle. Where conduit is mandated, derate the bundle to 50 per cent of the free-air figure and document the derating in the design submission.',
    },
    {
      name: 'Specify the jacket compound and firestop strategy',
      text:
        'LSZH for any escape route, riser or protected zone (Section 422 and Approved Document B). Plan firestop crossings so the entire bundle does not pass through a single sealed sleeve.',
    },
    {
      name: 'Document, certify and schedule a thermal recheck',
      text:
        'Issue the design with the bundle sizing calculations as part of the cabling specification. After installation, run a full structured-cabling certification. Schedule a thermal recheck 3 to 6 months after full PoE load is applied, measuring jacket temperature at the hottest point of the worst-case bundle.',
    },
  ],
  faqs: [
    {
      question: 'Can Cat5e be used for PoE++ (Type 3 or Type 4)?',
      answer:
        'Technically Cat5e will pass current for Type 3 and Type 4, and IEEE 802.3bt does not prohibit it — but it is strongly not recommended for new installation. The 24 AWG conductor has 20 to 30 per cent more DC loop resistance per metre than Cat6, meaning proportionally more I²R heat. In bundles over about 12 cables at Type 4, Cat5e runs hot, PD voltage drop may be excessive, and most manufacturers void their PoE warranty on Cat5e. Cat6 is the practical minimum; Cat6a is preferred.',
    },
    {
      question: 'What is the maximum bundle size for 90 W PoE in a typical UK office?',
      answer:
        'For a 25 to 30 °C ceiling-void ambient on open ladder rack, the practical maximum is 48 cables of Cat6 UTP per bundle, or 96 cables of Cat6a UTP per bundle. In conduit, halve those — 24 Cat6, 48 Cat6a. For higher ambient (riser, plant room, void above an IT room), reduce by a further 25 to 50 per cent. These figures derive from TIA TSB-184-A and the BS EN 50174-2 informative annex.',
    },
    {
      question: 'Why does ambient temperature matter so much for PoE cabling?',
      answer:
        'Category cabling is rated for continuous operation up to 60 °C conductor temperature. Above that, the dielectric drifts (degrading signal performance) and the jacket begins long-term creep. The PoE I²R bundle rise stacks directly on pathway ambient. A 5 °C rise is fine in a 25 °C ceiling void but becomes a 60 °C operating temperature in a 55 °C riser. Ambient is the single most important non-cable variable in PoE bundle design.',
    },
    {
      question: 'What is the benefit of LSZH over PVC for PoE cabling?',
      answer:
        'LSZH jackets are required by BS 7671:2018+A4:2026 Section 422 and Approved Document B in protected escape routes, risers, hospital corridors and many commercial new-builds. The benefit is fire and smoke behaviour during combustion — LSZH emits substantially less smoke and no halogen acid gases. LSZH does not give more thermal headroom under PoE load — both PVC and LSZH operate to 60 to 75 °C continuously. The choice is driven by fire regulations, not PoE heat.',
    },
    {
      question: 'What is the maximum pulling tension for Cat6 and Cat6a cable?',
      answer:
        '110 N — about 11.3 kgf or 25 lbf — for 4-pair Cat6 and Cat6a UTP, per BS EN 50174-2 and major manufacturer specifications. Cat7 and Cat7a S/FTP tolerate 130 to 150 N. Hand-pulling long conduit runs almost always exceeds 110 N — use a calibrated winch puller or pull in shorter stages. Over-pulling stretches conductors, increases DC loop resistance, and causes the cable to run hotter under PoE load months later.',
    },
    {
      question: 'Is there a real difference between standard Cat6a and "jumbo" large-conductor Cat6a?',
      answer:
        'Yes. Standard Cat6a is 23 AWG (0.258 mm² conductor area). Some manufacturers produce 22 AWG solid Cat6a (often marketed as "jumbo" or "PoE-rated") with a 0.326 mm² conductor — roughly 26 per cent more copper. The larger conductor reduces DC loop resistance by 15 to 25 per cent, directly reducing I²R heat. For Type 4 on large bundles or high-ambient pathways, 22 AWG solid Cat6a is worth the modest extra cost. For standard office PoE the difference is academic.',
    },
    {
      question: 'Do I need to be a qualified electrician to install PoE cabling itself?',
      answer:
        'Under the Electricity at Work Regulations 1989 and BS 7671, Cat6/Cat6a carrying PoE at 50 to 57 V DC is SELV and does not require a qualified electrician to install. The mains supply to PoE switches and network cabinets does — that is a BS 7671 circuit. Most PoE projects are delivered by mixed teams: an electrician for the mains side and a data cabling specialist (typically City and Guilds 3667 or a vendor certification) for the structured cabling.',
    },
    {
      question: 'How does cabling certification testing relate to PoE thermal performance?',
      answer:
        'A standard certification test (Fluke DSX or equivalent) measures signal performance — insertion loss, return loss, NEXT, ELFEXT, length, wiremap. It does not measure PoE current capacity or bundle temperature. The signal test catches gross faults but will pass a bundle that is thermally marginal. For PoE-heavy installations, supplement with a thermal survey: measure jacket temperature at the centre of the worst-case bundle under full continuous load, and confirm it sits below 60 °C with margin. Some specifiers now mandate the thermal survey as part of handover.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/poe-plus-plus-type-4-90w-installation',
      title: 'PoE++ Type 4 (90 W) Installation Guide',
      description:
        'Full design walk-through for IEEE 802.3bt Type 4 — switch sizing, power budget, PD selection, and how the 90 W limit drives the rest of the cabling design.',
      icon: 'Zap',
      category: 'Guide',
    },
    {
      href: '/guides/poe-lighting-guide',
      title: 'PoE Lighting Guide',
      description:
        'Power over Ethernet lighting end to end — IEEE 802.3bt, Cat6/Cat6a cabling, switch sizing, commercial applications and BS 7671 considerations.',
      icon: 'Cable',
      category: 'Guide',
    },
    {
      href: '/guides/structured-cabling-bs-en-50173-electricians',
      title: 'Structured Cabling — BS EN 50173',
      description:
        'The generic cabling standard that defines Cat6 and Cat6a, channel performance, and how structured cabling integrates with electrical installation work.',
      icon: 'Cable',
      category: 'Guide',
    },
    {
      href: '/guides/bs-en-50174-data-cable-installation',
      title: 'BS EN 50174 — Data Cable Installation',
      description:
        'Installation practice for data cabling — pathway design, segregation from mains, pull tension, bend radius…',
      icon: 'ClipboardCheck',
      category: 'Guide',
    },
    {
      href: '/guides/section-715-elv-lighting-a4-2026',
      title: 'Section 715 ELV Lighting (A4:2026)',
      description:
        'BS 7671:2018+A4:2026 Section 715 requirements for extra-low voltage lighting, including PoE-driven LED installations and the mains-supply rules they sit…',
      icon: 'BookOpen',
      category: 'Guide',
    },
    {
      href: '/guides/correction-factors-guide',
      title: 'Correction Factors Guide',
      description:
        'BS 7671 ambient temperature, grouping and thermal insulation correction factors — the parallel framework for derating mains cables that sits alongside…',
      icon: 'Calculator',
      category: 'Guide',
    },
  ],
  ctaHeading: 'Stop guessing whether your PoE bundle will run hot',
  ctaSubheading:
    'Elec-Mate gives UK electricians the BS 7671 calculators, on-site certificates and quoting tools needed to deliver PoE-heavy commercial installations with confidence — including the mains-supply cable sizing and EIC certification that surround the structured cabling work. 7-day free trial, cancel anytime.',
};
