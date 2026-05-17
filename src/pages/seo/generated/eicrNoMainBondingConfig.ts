import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in BS 7671:2018+A4:2026 (18th Edition), IET Guidance Note 3
// (Inspection & Testing, 9th Edition) and the IET On-Site Guide.

const published = '2026-05-17';
const modified = '2026-05-17';

export const eicrNoMainBondingConfig: GeneratedGuideConfig = {
  pagePath: '/guides/eicr-no-main-protective-bonding',
  title:
    'EICR: No Main Protective Bonding — The Classic C2 Observation | Elec-Mate',
  description:
    'Missing main protective bonding to gas, water or oil services is the most common C2 observation on UK domestic EICRs. What BS 7671 actually requires, how to identify it, and the remedial work that fixes it. A4:2026 aligned.',
  datePublished: published,
  dateModified: modified,
  readingTime: 11,
  badge: 'EICR Common Defect',
  badgeIcon: 'AlertTriangle',
  breadcrumbLabel: 'EICR: No Main Bonding',
  heroPrefix: 'EICR: No Main',
  heroHighlight: 'Protective Bonding',
  heroSuffix: '— The Classic C2',
  heroSubtitle:
    'Across UK domestic EICRs, "no main protective bonding to incoming gas / water / oil services" is the single most common C2 observation. It makes the report unsatisfactory and triggers urgent remedial action under PRS Regs 2020 in rented properties. This guide explains what BS 7671 actually requires, how to identify the defect at inspection, and the exact remedial work that clears the C2.',
  keyTakeaways: [
    'Main protective bonding to extraneous-conductive-parts is required by Regulation 411.3.1.2 and the bonding conductor is sized per Regulation 544.1.1 (and Table 54.8 on PME supplies).',
    'Extraneous-conductive-parts that must be bonded: metallic gas installation pipes, metallic water installation pipes, metallic oil installation pipes, structural steel where applicable, lightning protection systems, other metallic services that could introduce a potential.',
    'Missing bonding is a C2 observation in almost all cases — danger could become present under fault conditions when the missing bonding allows touch voltage to appear on metalwork accessible throughout the dwelling.',
    'PME supplies require LARGER bonding conductors than non-PME TN-C-S — typically 10 mm² minimum on a 100 A service, going to 16 mm² on larger supplies. Refer to Table 54.8.',
    'Plastic pipes ARE NOT extraneous-conductive-parts and do not require bonding. The bonding requirement is for METALLIC pipework where the metal continues outside the building.',
    'Remedial work: install a 10 mm² (or 16 mm² PME-supply dependent) earthing conductor from the Main Earthing Terminal at the consumer unit to the service pipe within 600 mm of the meter or first point of entry into the building.',
  ],
  sections: [
    {
      id: 'what-bs7671-requires',
      heading: 'What BS 7671 Actually Requires',
      tocLabel: 'What BS 7671 requires',
      blocks: [
        {
          type: 'paragraph',
          text:
            'BS 7671 Regulation 411.3.1.2 requires main protective bonding to be applied to extraneous-conductive-parts as part of the Automatic Disconnection of Supply (ADS) protective measure. The bonding ensures that, under a fault condition that places a potential on the installation\'s exposed metalwork, the metallic services entering the dwelling are also raised to (approximately) the same potential — preventing dangerous touch-voltage differences across the building.',
        },
        {
          type: 'list',
          items: [
            '**Regulation 411.3.1.2** — main protective bonding requirement for ADS.',
            '**Regulation 544.1.1** — sizing of main protective bonding conductors.',
            '**Table 54.8** — minimum main protective bonding conductor CSA on PME supplies, by neutral conductor size of the supply.',
            '**Regulation 411.3.1** — defines the protective measure of ADS and what it includes.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'What counts as an extraneous-conductive-part',
          text:
            'An extraneous-conductive-part is metalwork that is liable to introduce a potential — typically earth potential — that\'s not part of the electrical installation. The metallic gas service pipe, metallic water service pipe, metallic oil service pipe are the classic examples. Structural steel that runs to ground level can be an extraneous-conductive-part. Plastic pipes are NOT extraneous-conductive-parts.',
        },
      ],
    },
    {
      id: 'how-to-identify',
      heading: 'How to Identify Missing Bonding at Inspection',
      tocLabel: 'How to identify',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Verifying main protective bonding during EICR is a methodical walk-through of the service entry points:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Locate the Main Earthing Terminal (MET) — typically at or near the consumer unit, sometimes in the meter cupboard or a separate earth block.',
            'Identify each metallic service entering the dwelling: gas meter (within 600 mm of the meter), water service (typically at the rising main / stop tap), oil tank supply (if applicable).',
            'Trace each bonding conductor from the MET to the service pipe. The conductor must be visible / continuous (no joints unless in an accessible enclosure with the joint protected).',
            'Verify the bonding clamp at the service — BS 951-compliant clamp with a permanent "Safety Electrical Connection — Do Not Remove" label.',
            'Verify the bonding conductor CSA against Table 54.8 for the supply earthing arrangement.',
            'Test continuity between the MET and the bonded service (typically R₂ method): a low-resistance reading (< 0.05 Ω is typical for a sound installation).',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Common ways "missing bonding" is hidden',
          text:
            'Bonding sometimes appears to exist but is non-compliant: bonded to a plastic-pipe section (no electrical continuity), undersized conductor for the supply rating, broken/corroded clamp, conductor terminated at the wrong side of an insulating coupling, bonding conductor disconnected at the MET. Each of these is still a C2 observation — the conductor is not providing the required equipotential connection.',
        },
      ],
    },
    {
      id: 'why-c2-not-c1-or-c3',
      heading: 'Why It\'s C2 (Not C1 or C3)',
      tocLabel: 'Why C2',
      blocks: [
        {
          type: 'paragraph',
          text:
            'BS 7671 / IET GN3 give a strict hierarchy for observation coding (see the dedicated EICR Code C1, C2, C3 and FI guides). Missing main bonding is almost always C2 because:',
        },
        {
          type: 'list',
          items: [
            '**Not C1** — danger is not actively present under normal conditions. Touch voltage between the unbonded service and the installation\'s metalwork is only dangerous DURING a fault. The condition is potentially dangerous, not currently dangerous.',
            '**Not C3** — the condition is NOT merely a departure from BS 7671 with no danger implication. Under foreseeable fault conditions, dangerous voltage can appear on metalwork accessible throughout the dwelling. C3 ("Improvement recommended") shall not be used where C2 evidence exists.',
            '**Therefore C2** — "Potentially dangerous — urgent remedial action is necessary."',
          ],
        },
        {
          type: 'paragraph',
          text:
            'The single exception: where the structure has NO extraneous-conductive-parts (e.g., all-plastic plumbing from the boundary, no gas service, no metallic structural steel) — but the inspector MUST verify this and document the rationale on the EICR.',
        },
      ],
    },
    {
      id: 'sizing-the-bonding',
      heading: 'Sizing the Main Bonding Conductor',
      tocLabel: 'Sizing',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Main bonding conductor CSA depends on the earthing arrangement:',
        },
        {
          type: 'list',
          items: [
            '**Non-PME TN-S and TT supplies** — main bonding CSA is half the size of the earthing conductor, with a minimum of 6 mm² (BS 7671 Regulation 544.1.1).',
            '**TN-C-S (PME) supplies** — main bonding CSA is dictated by Table 54.8, based on the line conductor size of the supply (the distributor\'s neutral). Typical 100 A domestic PME service: minimum 10 mm² main bonding. Larger services: 16 mm² or higher.',
            '**TN-C-S (PNB) supplies** — sized per the standard non-PME rules where downstream of the PEN-to-PE split, but the upstream private network may have specific design requirements.',
            'In ALL cases the bonding conductor CSA must not be less than 6 mm² for protective bonding.',
          ],
        },
        {
          type: 'callout',
          tone: 'pricing',
          title: 'Common UK domestic sizing',
          text:
            'Most UK domestic installations on a 100 A PME service install 10 mm² green-and-yellow conductor with a BS 951 clamp at each service. On larger services (e.g. 200 A) or three-phase domestic supplies, 16 mm² becomes the standard.',
        },
      ],
    },
    {
      id: 'remedial-work',
      heading: 'Remedial Work — What Actually Fixes a C2',
      tocLabel: 'Remedial work',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The remedial action for missing main bonding is straightforward: install the missing conductor(s). The specifics:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Confirm the supply earthing arrangement (PME, PNB, TN-S, TT) — this dictates the bonding conductor CSA.',
            'Select the conductor — 10 mm² 6491X green-and-yellow for most PME domestic; 6 mm² for non-PME where appropriate; or larger per Table 54.8.',
            'Route the conductor from the Main Earthing Terminal at the consumer unit to the service pipe, by the shortest practicable route, protected against mechanical damage.',
            'Terminate at the MET with the existing earthing arrangement (typically a brass terminal bar).',
            'Terminate at the service with a BS 951 clamp, applied to bare metal pipe within 600 mm of the meter or first point of entry into the building. Apply the clamp to a continuous run of metallic pipe — never to a section that has a plastic insert downstream.',
            'Affix the BS 951 "Safety Electrical Connection — Do Not Remove" label adjacent to each clamp.',
            'Test continuity between the MET and the bonded service — should read sub-ohm.',
            'Issue an EIC or MEIWC for the remedial work; provide a copy to the responsible person (and, for rented properties under PRS Regs 2020, to the tenant within 28 days).',
          ],
        },
      ],
    },
    {
      id: 'special-cases',
      heading: 'Special Cases',
      tocLabel: 'Special cases',
      blocks: [
        {
          type: 'list',
          items: [
            '**All-plastic plumbing** — no main bonding required to a service that doesn\'t exist. Document the absence in the EICR Section D ("Extent and Limitations") and note in the schedule that no extraneous-conductive-parts were identified.',
            '**Meter remote from the dwelling** — bonding clamp goes within 600 mm of the FIRST point of entry of the metallic pipe into the building, not necessarily at the meter. For meters in outhouses or detached meter cupboards, this typically means at the point where the pipe enters the main dwelling.',
            '**Lightning protection systems** — if the dwelling has a lightning protection system, the system\'s earth termination network connects to the MET via main bonding. Consult BS EN 62305 for the specific arrangement.',
            '**Special locations** — bathrooms (Section 701), swimming pools (Section 702), agricultural premises (Section 705) have additional supplementary equipotential bonding requirements beyond the main bonding. Missing supplementary bonding in special locations is also typically a C2.',
            '**Domestic with shared services** — flats / HMOs may have communal gas / water with bonding at the service entry to the building, not to each flat. Verify the bonding arrangement at the building level matches BS 7671.',
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'My EICR says "C2 — no main protective bonding to incoming water service." What\'s the cost to fix?',
      answer:
        'For a typical UK domestic property, installing one missing main bonding conductor (10 mm² to the water service from the MET, with a BS 951 clamp) is usually a £100-£200 job at trade prices, including the MEIWC certification. The cost rises if multiple services are missing bonding, if access is difficult (suspended floor, ceiling void), or if the consumer unit needs to be upgraded to accommodate a new earthing arrangement.',
    },
    {
      question: 'Do I need to bond plastic pipes?',
      answer:
        'No. Plastic pipes are not extraneous-conductive-parts and are not required to be bonded by BS 7671. The bonding requirement applies to metallic services where the metal continues outside the building (introducing earth potential into the installation). If the entire water supply from boundary to taps is plastic (MDPE outside, blue plastic inside), no bonding is required. Many modern UK properties have all-plastic plumbing for this reason.',
    },
    {
      question: 'My house has metallic pipes inside but the supply pipe is plastic. Do I still need bonding?',
      answer:
        'The decisive question is whether the metallic pipes inside the dwelling form an extraneous-conductive-part — i.e., whether they could introduce a potential to the installation. If the metallic pipes are only on the consumer side of a plastic supply pipe (so the metalwork cannot pick up earth potential from outside), they are not extraneous-conductive-parts and do not require main bonding. The inspector should verify the entire supply route and document the determination.',
    },
    {
      question: 'What sized cable goes from the consumer unit to the gas meter?',
      answer:
        'On a typical 100 A PME domestic supply: 10 mm² 6491X green-and-yellow conductor, with a BS 951 clamp at the gas service end (within 600 mm of the meter or first point of entry). On larger supplies (over 100 A or three-phase), the conductor sizes up per Table 54.8 — 16 mm² is common on 200 A services. On non-PME TN-S or TT, 6 mm² minimum.',
    },
    {
      question: 'Does the bonding need a separate label?',
      answer:
        'Yes. Every BS 951 clamp must carry a "Safety Electrical Connection — Do Not Remove" label, fixed adjacent to or on the clamp itself. The label warns subsequent plumbers / gas engineers / homeowners not to remove the connection during pipework maintenance. The label is part of the BS 951 clamp installation per the product standard, not optional.',
    },
    {
      question: 'How long does the landlord have to fix a "no main bonding" C2 in a rented property?',
      answer:
        'Under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020, the landlord has 28 days from the EICR date to complete remedial work for any C1, C2 or FI observation, and to provide written confirmation (MEIWC or EIC) to the tenant within 28 days of the work being completed. Failure to comply can result in financial penalties up to £30,000 per breach.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/eicr-code-c2-potentially-dangerous',
      title: 'EICR Code C2 — Potentially Dangerous',
      description: 'How C2 observations are recorded on Section K and what the report assessment becomes.',
      icon: 'AlertTriangle',
      category: 'Guide',
    },
    {
      href: '/guides/eicr-code-c1-danger-present',
      title: 'EICR Code C1 — Danger Present',
      description: 'The more serious "immediate danger" classification — typically not appropriate for missing bonding.',
      icon: 'AlertTriangle',
      category: 'Guide',
    },
    {
      href: '/guides/bs-7671-a4-2026-tn-cs-pnb-earthing',
      title: 'TN-C-S (PME vs PNB) Earthing',
      description: 'Why the supply earthing arrangement dictates the bonding conductor size.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/tools/earth-loop-impedance-calculator',
      title: 'Earth Loop Impedance (Zs) Calculator',
      description: 'Verify ADS compliance after bonding remedial work.',
      icon: 'Calculator',
      category: 'Tool',
    },
    {
      href: '/tools/eicr-certificate',
      title: 'EICR Certificate Tool',
      description: 'Digital A4:2026 EICR with built-in bonding observation library and remedial-quote conversion.',
      icon: 'FileCheck2',
      category: 'Tool',
    },
    {
      href: '/minor-works-certificate',
      title: 'Minor Works Certificate Tool',
      description: 'Issue the MEIWC for the bonding remedial work in minutes.',
      icon: 'FileCheck2',
      category: 'Tool',
    },
  ],
  ctaHeading: 'Convert C2 observations into remedial quotes',
  ctaSubheading:
    'Elec-Mate\'s digital EICR has a curated C2 observation library — pick "no main protective bonding", set the service, and the tool auto-generates the remedial quote with materials, labour and certification cost. 7-day free trial.',
};
