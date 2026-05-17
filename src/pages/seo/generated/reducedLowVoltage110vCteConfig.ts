import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in BS 7671:2018+A4:2026 (18th Edition, published 15 April 2026),
// BS 7375 (Code of practice for distribution of electricity on construction
// and demolition sites), HSE HSG141, CDM 2015 and the Electricity at Work
// Regulations 1989.

const published = '2026-05-17';
const modified = '2026-05-17';

export const reducedLowVoltage110vCteConfig: GeneratedGuideConfig = {
  pagePath: '/guides/reduced-low-voltage-110v-cte-site-supplies',
  title:
    'Reduced Low Voltage (110V CTE) Construction Site Supplies — BS 7671:2018+A4:2026 Section 704 | Elec-Mate',
  description:
    '110V centre-tapped earth (CTE) reduced low voltage construction site supplies under BS 7671:2018+A4:2026 Section 704 — why 55V to earth is used on sites, BS 7375 yellow socket colour coding, site transformer ratings, RCD requirements, distribution units, tool selection and the temporary supply certificate that gets you off the gate.',
  datePublished: published,
  dateModified: modified,
  readingTime: 14,
  badge: 'Construction Site Electrical',
  badgeIcon: 'Zap',
  breadcrumbLabel: 'Reduced Low Voltage 110V CTE',
  heroPrefix: 'Reduced Low Voltage',
  heroHighlight: '110V CTE',
  heroSuffix: '— Construction Site Supplies (Section 704)',
  heroSubtitle:
    'On almost every UK construction site, portable tools and task lighting run at 110V centre-tapped to earth — giving 55V to earth on each leg. This is the single most important shock-reduction measure on a live site, and the foundation BS 7671:2018+A4:2026 Section 704, BS 7375 and HSE HSG141 build on. This guide explains what reduced low voltage is, the yellow socket colour code, transformer sizing, RCD requirements, tool selection, and how to certify the temporary supply.',
  keyTakeaways: [
    'Reduced Low Voltage on UK sites means 110V centre-tapped to earth (CTE) — the transformer secondary midpoint is bonded to earth, so each line sits at 55V to earth, not 110V.',
    '55V to earth is below the conventional shock-hazard threshold and is regarded by HSE HSG141 and BS 7375 as the most practical risk reduction for portable tools.',
    'BS 7375 colour codes: yellow = 110V, blue = 230V, red = 400V three-phase, black = 500V. Wrong colour socket = site refusal.',
    'Site transformers are rated by continuous kVA — 3.3 / 5 / 7.5 / 10 kVA — and must be sized for the largest tool inrush, not just the steady-state load.',
    'BS 7671:2018+A4:2026 Section 704 sets the requirements for construction site installations. A4:2026 tightens AFDD guidance and refines TN-C-S (PNB) earthing language affecting the site origin.',
    'The 110V CTE circuit itself does not require additional RCD protection — the 55V-to-earth condition IS the protective measure. The 230V transformer primary and any 230V/400V outlets still need 30 mA RCDs.',
    'A temporary site supply must be certified with an EIC before energisation, and that certificate is the document the principal contractor asks for before work begins.',
  ],
  sections: [
    {
      id: 'what-is-rlv',
      heading: 'What "Reduced Low Voltage" Actually Means',
      tocLabel: 'What is RLV?',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Reduced Low Voltage (RLV) is the UK construction term for a supply with voltage between live conductors reduced below 230V to reduce shock severity. The universal implementation on UK sites is 110V centre-tapped earth (CTE) — the secondary winding of an isolating transformer gives 110V between its two outer terminals, with the midpoint bonded to earth.',
        },
        {
          type: 'paragraph',
          text:
            'Bonding the midpoint to earth has a precise consequence: each line sits at 55V to earth, not 110V. Voltage between the two lines stays at 110V (what the tool runs on), but exposure voltage to earth is only 55V.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Why "centre-tapped" matters',
          text:
            'A 110V system that is NOT centre-tapped (for example a 0V/110V system) would put one leg at 110V to earth and the other at 0V. Centre-tapping moves the reference point to the midpoint, so both legs sit at 55V to earth — the lower exposure voltage is what makes CTE the preferred construction site system.',
        },
        {
          type: 'paragraph',
          text:
            'This is the single most important shock-reduction measure on a site. Tools get dropped in puddles, leads get crushed, plugs get yanked, and operatives are wet and standing on conductive ground. The same exposures at 230V to earth have historically caused most construction electrical fatalities. Designing the system at 55V to earth is a far more effective control than relying on operatives being careful.',
        },
        {
          type: 'paragraph',
          text:
            'The 55V threshold is physiologically grounded. Above ~50V AC to earth, contact through dry skin can drive enough current through the heart to cause ventricular fibrillation; below 50V AC the risk in healthy adults is negligible. 55V-to-earth sits just above that threshold — high enough for practical tool power, low enough that direct contact is no longer a fatality risk on normal site conditions. The same reasoning underpins the ELV bands of IEC 61140 and BS 7671 Part 2.',
        },
      ],
    },
    {
      id: 'why-construction-sites',
      heading: 'Why Construction Sites Use 110V CTE',
      tocLabel: 'Why sites use it',
      blocks: [
        {
          type: 'paragraph',
          text:
            'No statutory instrument names 110V CTE specifically — but EAWR 1989 and CDM 2015 set the duty to control electrical risk, and HSE HSG141 plus BS 7375 identify 110V CTE as the standard arrangement for portable tools and task lighting.',
        },
        {
          type: 'list',
          items: [
            'Lower shock voltage — 55V to earth is below the let-go threshold for involuntary muscular contraction, dramatically reducing contact severity.',
            'Lower fault energy — a line-to-earth fault at 55V dissipates roughly a quarter of the energy of an equivalent 230V fault, reducing arc-flash and burn severity.',
            'Built-in galvanic separation — the site transformer is an isolating transformer, so a fault on the secondary does not propagate to the primary mains.',
            'Universal industry adoption — almost every UK principal contractor mandates 110V CTE for portable tools in their site rules at induction.',
            'Tool ecosystem — every major UK trade tool brand (Hilti, Makita, DeWalt, Bosch, Festool, Milwaukee) supplies 110V variants of every common corded tool.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Not "voluntary" in practice',
          text:
            'Even on a small commercial fit-out where 230V tools might technically be permitted with appropriate RCD protection, principal contractors routinely refuse 230V tools at the gate. The site rules issued at induction are contractually binding — turn up with a 230V tool when the rules say 110V and you go home unpaid.',
        },
        {
          type: 'paragraph',
          text:
            'HSE statistics over decades show construction electrical fatalities cluster around damaged 230V leads and contact with concealed cables — almost all survivable at 55V to earth. The few fatalities on 110V CTE sites have almost always involved failure of the protective measure (broken centre-tap bond, illicit tool conversion), not failure of the principle.',
        },
      ],
    },
    {
      id: 'bs-7375-colour-coding',
      heading: 'BS 7375 — The Yellow Socket Colour Code',
      tocLabel: 'BS 7375 colours',
      blocks: [
        {
          type: 'paragraph',
          text:
            'BS 7375 sets the colour-coded plug and socket system universal on UK sites for decades. The colour tells you the voltage band at a glance — wrong-coloured plug at induction is a fast route off site.',
        },
        {
          type: 'list',
          items: [
            'Yellow — 110V single-phase or three-phase, centre-tapped to earth (the universal portable tool voltage on UK construction sites).',
            'Blue — 230V single-phase (used for site office equipment, kettles, electric heaters in cabins, but generally not for portable tools).',
            'Red — 400V three-phase (used for larger plant: site cabins with heat-pump HVAC, larger mixers, welding plant, tower cranes).',
            'Black — 500V three-phase (less common, used for some larger industrial plant and on demolition for higher-capacity supplies).',
            'White — 50V (extra-low voltage, used for some specialist task lighting and instrumentation, rarely encountered on general sites).',
          ],
        },
        {
          type: 'paragraph',
          text:
            'Connectors conform to BS EN 60309-2 — colour, keyway position and pin configuration combine to make it physically impossible to plug a 110V tool into a 230V socket. Adapting a tool to a different-colour socket is an EAWR 1989 Regulation 4 breach.',
        },
        {
          type: 'callout',
          tone: 'success',
          title: 'Keyway position is the locking feature',
          text:
            'On a yellow 110V plug, the earth pin (keyway) sits at the four-o\'clock position. On a blue 230V plug it sits at six o\'clock. On a red 400V plug it sits at nine o\'clock. The pins and sleeves are all the same size — it is the keyway angle that makes mis-connection physically impossible.',
        },
        {
          type: 'paragraph',
          text:
            'BS EN 60309-2 also defines the current rating by pin diameter, so you cannot cross-connect different ratings within a colour band. Common UK ratings: 16A/32A yellow, 16A/32A blue, 16A/32A/63A red. The colour code also acts as a visual audit tool — anyone walking the site can verify the voltage policy at a glance.',
        },
      ],
    },
    {
      id: 'site-transformers',
      heading: 'Site Transformer Ratings — 3.3 kVA, 5 kVA, 10 kVA',
      tocLabel: 'Transformer ratings',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The heart of every 110V CTE supply is the site isolating transformer. It steps the 230V or 400V site distribution down to 110V on the secondary, provides galvanic isolation between the windings, and centre-taps the secondary to earth to establish the 55V-to-earth condition. Site transformers are rated by continuous kVA.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            '3.3 kVA — standard portable transformer for one operative running one large 110V tool with headroom for task lighting. Yellow case, two 16A sockets.',
            '5 kVA — medium portable, two operatives or one heavy continuous load plus task lighting. Four 16A sockets is typical.',
            '7.5 kVA — larger portable used when a small team shares one supply running multiple heavy tools concurrently.',
            '10 kVA — fixed-location transformer at the head of a 110V sub-circuit feeding multiple 16A/32A outlets, often 400V three-phase input.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'Selecting the rating is not just adding up tool badge ratings — inrush current on a large SDS or circular saw can be 5-7 times the running current for the first few cycles. An under-rated transformer sags the voltage at the tool and overheats the windings. Rule of thumb: size for the LARGEST single tool inrush, not the steady-state load.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Inrush is the killer',
          text:
            'A 1700W 110V SDS hammer drill draws roughly 15A in continuous use — comfortable for a 3.3 kVA transformer. At start-up the inrush can hit 70-80A for two or three cycles, and on an under-rated supply the voltage collapses, the drill stalls, and the windings overheat. Always check the tool\'s start-up inrush spec, not just the running load.',
        },
        {
          type: 'paragraph',
          text:
            'A compliant site transformer must be a SAFETY ISOLATING transformer to BS EN 61558-2-6 — reinforced insulation, flame-retardant case, labelled centre-tap earth terminal, thermal cut-out on the secondary. At 110V the current for a given power is double, so BS 7375 recommends 2.5mm² minimum on 110V extension reels carrying 16A.',
        },
      ],
    },
    {
      id: 'a4-2026-section-704',
      heading: 'BS 7671:2018+A4:2026 — Section 704 Updates',
      tocLabel: 'A4:2026 Section 704',
      blocks: [
        {
          type: 'paragraph',
          text:
            'BS 7671:2018+A4:2026 (18th Edition, A4 published 15 April 2026) sets the special requirements for construction and demolition site installations in Section 704, modifying the general requirements of Parts 1-6 for the live site environment.',
        },
        {
          type: 'list',
          items: [
            'Regulation 704.410.3.10 — confirms automatic disconnection of supply may apply throughout the temporary installation, and sets constraints on Uo where RLV is used.',
            'Regulation 704.410.3.5 — explicitly recognises Reduced Low Voltage Systems (110V CTE) as a protective measure for portable tools and luminaires, sourced from a safety isolating transformer to BS EN 61558-2-6 with the secondary midpoint earthed.',
            'Regulation 704.411.3.2.1 — sets the LV disconnection times, with standard 230V-to-earth values applying to socket-outlets up to 32A.',
            'Regulation 704.511.1 — requires all site socket-outlets to comply with BS EN 60309-2 (the BS 7375 colour codes).',
            'Regulation 704.537 — covers isolation, switching and emergency switching at the origin, including the accessible main switch requirement.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'A4:2026 brings two changes that intersect with site design: AFDD requirements clarified for socket-outlets in higher-risk premises (relevant to 230V site office sockets), and TN-C-S (PNB) terminology refined for the site origin description on the EIC.',
        },
        {
          type: 'paragraph',
          text:
            'For every A4:2026 change including AFDD, TN-C-S (PNB) and the new EIC schedule columns, see our [BS 7671 A4:2026 summary](/guides/bs-7671-a4-2026-summary).',
        },
        {
          type: 'paragraph',
          text:
            'Section 704 is binding; BS 7375 is a Code of Practice (non-binding guidance on how to comply). A4:2026 strengthens Regulation 704.537 on isolation at the origin, requiring the TBC main switch to be reachable, labelled and lockable OFF.',
        },
      ],
    },
    {
      id: 'distribution-units',
      heading: 'Site Distribution Units (TBC / TCC / TSC / OSC)',
      tocLabel: 'Distribution units',
      blocks: [
        {
          type: 'paragraph',
          text:
            'BS 7375 sets out a family of site distribution assemblies that take the incoming supply and split it across the site. Each has a defined function and standard connectors.',
        },
        {
          type: 'list',
          items: [
            'TBC — Temporary Building Connection. The site origin: a metered enclosure with the main switch, origin earth and primary protective device.',
            'TCC — Temporary Circuit Connection. A sub-distribution assembly splitting the 230V or 400V supply to outgoing circuits (MCBs, RCDs, blue or red socket-outlets).',
            'TSC — Temporary Supply (Centre Tapped). The workhorse: houses the 110V isolating transformer, takes 230V or 400V in, provides yellow 110V CTE socket-outlets.',
            'OSC — Outlet Socket Connection. A smaller local assembly near the work area, fed from a TCC or TSC upstream.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Yellow distribution boards are the visible standard',
          text:
            'On any UK site, the yellow plastic-cased distribution boards with the 16A and 32A yellow sockets on the front are TSCs — they contain the 110V transformer and the centre-tapped earth bond. They are what every operative on site plugs into to run a tool.',
        },
        {
          type: 'paragraph',
          text:
            'A well-designed temporary distribution follows a tree topology — TBC at the root, TCCs branching out, TSCs at the leaves close to the tools. Distribute around the site at 230V/400V and drop to 110V CTE locally — voltage drop on long 110V cables is double that of 230V. Every cable, socket and assembly must be clearly labelled.',
        },
      ],
    },
    {
      id: 'rcd-on-110v',
      heading: 'RCD Protection on 110V CTE Circuits',
      tocLabel: 'RCDs on 110V',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The most commonly misunderstood point on site. Where the protective measure is RLV with a centre-tapped secondary maintained at 55V to earth, the 110V CTE sub-circuit does not require additional RCD protection by Section 704 — the reduced voltage IS the protective measure. The 30 mA RCD requirement is satisfied at the upstream 230V supply.',
        },
        {
          type: 'list',
          items: [
            '230V supply to the transformer primary MUST have 30 mA RCD protection (BS 7671 411.3.3 plus Section 704).',
            'Any 230V (blue) sub-circuit or socket-outlet on site MUST be 30 mA RCD protected.',
            'Any 400V (red) socket-outlet up to 32A MUST be 30 mA RCD protected.',
            'The 110V CTE secondary feeding portable tools does NOT require additional RCD protection — the 55V-to-earth condition IS the protective measure under 704.410.3.5.',
            'Many TSCs include an RCD on the 110V secondary as belt-and-braces protection — there is no objection; it sits on top of the RLV measure, not in place of it.',
            'Earth-fault loop impedance on the 110V CTE circuit must still satisfy automatic disconnection requirements — usually straightforward given short cable runs.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'If the centre-tap earth bond fails, you lose the protective measure',
          text:
            'The entire 55V-to-earth assumption depends on the midpoint of the transformer secondary being bonded to earth. If that bond is broken (cut wire, corroded terminal, missing link) the 110V system is no longer CTE — it becomes a floating 110V system, and the protective measure is lost. Periodic inspection (EICR) of a site supply must verify the centre-tap earth bond.',
        },
        {
          type: 'paragraph',
          text:
            'Verifying the centre-tap bond is simple: at each 110V outlet, Line 1 to earth ~55V AC, Line 2 to earth ~55V AC, Line 1 to Line 2 110V AC. If one line reads 110V to earth and the other 0V, the centre-tap is open — take the unit out of service immediately. On long reels Zs can rise enough that disconnection times are no longer met, so record against the BS 7671 Tables 41.2/41.3 limits.',
        },
      ],
    },
    {
      id: 'tool-selection',
      heading: 'Selecting 110V Tools and Equipment',
      tocLabel: 'Tool selection',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The 110V tool ecosystem is mature — every major manufacturer produces 110V variants with the yellow plug fitted at the factory.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Power tools — SDS hammers, breakers, circular saws, jigsaws, angle grinders, mitre saws, planers, sanders all available in 110V from Hilti, Makita, DeWalt, Bosch, Festool, Milwaukee.',
            'Task lighting — 110V tripod lights, festoon lighting, area floods. LED has largely replaced halogen on UK sites.',
            'Extension leads — 110V reels (yellow, 14m / 25m / 50m) with BS EN 60309 yellow connectors. Look for the fully-unwound continuous rating.',
            'Adaptors and splitters — yellow 16A splitter boxes, 32A-to-16A reducers and 4-way distribution boards are standard wholesaler stock.',
            'Test equipment — most MFTs are dual-voltage (110V/230V). GS38-compliant probes work the same on either system.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'For wider construction site electrical risks and controls, see our [construction site safety](/guides/construction-site-safety) overview and the electrician-specific [construction site safety for electricians](/guides/construction-site-safety-electrical).',
        },
        {
          type: 'paragraph',
          text:
            'Battery cordless tools are an increasingly common third option — a modern 18V/54V Li-ion drill or SDS matches a corded 110V tool and avoids the trailing lead. Chargers themselves are still 110V or 230V appliances and must follow the site voltage policy. Cordless complements rather than replaces 110V CTE.',
        },
      ],
    },
    {
      id: 'eicr-on-sites',
      heading: 'EICR on a Construction Site',
      tocLabel: 'EICR on sites',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Temporary site installations have a much shorter inspection interval than permanent ones. Section 704 and HSE HSG141 both recommend a maximum three months between full inspection-and-test cycles, and BS 7375 sets out a more frequent routine check regime on top.',
        },
        {
          type: 'list',
          items: [
            'Daily — operatives visually check leads, plugs, transformer cases and socket-outlets before use. Anything damaged is taken out of service.',
            'Weekly — a competent person walks the site performing a thorough visual inspection of all assemblies, leads and transformers.',
            'Monthly — an electrician performs continuity, insulation resistance, Zs and RCD function tests on the 230V/400V sections and verifies the centre-tap earth bond.',
            'Three-monthly — a full EICR-style periodic inspection of the whole temporary supply, with the next inspection set three months ahead.',
            'On any incident — any RCD trip, damaged lead or near-miss triggers immediate inspection-and-test of the affected circuit before return to service.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'PAT-style portable appliance testing is separate',
          text:
            'The transformer leads, extension reels and portable tools themselves are portable appliances and are subject to in-service inspection-and-test (PAT) at intervals appropriate to the equipment class and usage environment. On a construction site this is typically every 3 months for Class I portable equipment. PAT is a separate regime from the fixed-installation EICR.',
        },
        {
          type: 'paragraph',
          text:
            'Records matter as much as inspections — keep them digital (date, inspector, assembly, test readings, action). On long-running projects, any addition or alteration should trigger a partial re-verification and an EIC variation — what BS 7375 calls "alterations and additions" management.',
        },
      ],
    },
    {
      id: 'temporary-supply-certification',
      heading: 'Certifying the Temporary Site Supply',
      tocLabel: 'Temporary supply EIC',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Every temporary site supply must be certified before sub-circuits are energised. An EIC is issued listing the origin, main switch, protective devices, earthing arrangement, bonding, cable types and test results. The principal contractor will ask to see it at induction.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Design — confirm the earthing arrangement (TT, TN-S, TN-C-S/PNB), maximum demand, prospective fault current at origin, and protective device coordination.',
            'Installation — install the TBC at the origin, the TCCs for 230V/400V distribution and the TSCs for 110V CTE supply.',
            'Initial verification — continuity, insulation resistance, Zs, RCD function, and verification of the centre-tap earth bond on every 110V transformer.',
            'Issue the EIC — complete the schedule of inspections, schedule of test results and the designer/constructor/verifier declaration.',
            'Hand the EIC to the principal contractor and post a copy at the TBC for inspection during the project.',
            'Schedule the next inspection — typically three months ahead for a construction site.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'For a full walk-through of design and certification see our [construction site temporary supply](/guides/construction-site-temporary-supply) guide. The CDM 2015 framework is covered in [CDM 2015 for electricians](/guides/cdm-2015-for-electricians).',
        },
        {
          type: 'callout',
          tone: 'success',
          title: 'The EIC is the gate pass',
          text:
            'No EIC for the temporary supply means no live circuits, which means no tools, which means no work. The EIC is not a piece of paperwork to do at the end of the project — it is the document that gets the project started. Issue it early and post it visibly.',
        },
        {
          type: 'paragraph',
          text:
            'The EIC for a temporary supply uses the standard model form with A4:2026 schedule columns. State the installation explicitly as a "temporary construction site supply", declare the earthing arrangement (A4:2026 PNB terminology applies), and record maximum demand, prospective fault current, protective device coordination and next inspection date. The certificate must be signed by a competent person under EAWR 1989 Regulation 16 — typically NVQ Level 3 plus the 18th Edition and 2391 qualifications.',
        },
      ],
    },
    {
      id: 'common-failures',
      heading: 'Common Failures and How to Avoid Them',
      tocLabel: 'Common failures',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A handful of recurring failure modes account for most incidents and audit findings.',
        },
        {
          type: 'list',
          items: [
            'Broken centre-tap earth bond — turns CTE into a floating 110V system. Verify with a 55V-to-earth voltmeter reading at every inspection.',
            'Wrong-coloured plug fitted to a tool — a 110V tool with a BS 1363 13A plug is an EAWR 1989 Regulation 4 breach. Quarantine immediately.',
            'Undersized cable on a long 110V extension reel — use 2.5mm² minimum on reels carrying 16A over any meaningful length.',
            'Partly wound reel overheating — extension reels carry rated current only fully unwound. Unwind before heavy load.',
            'Mixed colour distribution on a single assembly — a blue socket added to a yellow TSC for "convenience" fails any audit.',
            'Generic step-down transformer without BS EN 61558-2-6 marking — only use equipment from recognised manufacturers with the correct safety isolating standard.',
            'Cables crushed at floor level — run overhead on hooks, protect crossings with cable ramps, inspect daily.',
            'Inaccessible main isolation at the TBC — the main switch must be labelled, accessible and lockable for emergency shutdown.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'The "small modification" trap',
          text:
            'The most common audit finding on temporary site supplies is undocumented modification after the initial EIC was issued. Every material change should trigger an EIC variation — most do not. The discipline of documenting every change determines whether the supply ages well or becomes a hazard.',
        },
        {
          type: 'paragraph',
          text:
            'CDM 2015 sits around all of this — the principal contractor sets the site rules including the 110V CTE policy, and every contractor is briefed at induction. For the wider process see our [site induction for electrical contractors](/guides/site-induction-electrical-contractors) guide.',
        },
      ],
    },
  ],
  howToHeading: 'How to Set Up a 110V CTE Site Supply',
  howToDescription:
    'The practical sequence for designing, installing, testing and certifying a 110V centre-tapped earth construction site supply under BS 7671:2018+A4:2026 Section 704 and BS 7375.',
  howToSteps: [
    {
      name: 'Confirm the earthing arrangement and origin',
      text:
        'Identify how the site is supplied — DNO connection (TN-C-S/PNB or TN-S) or temporary generator (typically TT with rod earthing). A4:2026 has refined the TN-C-S (PNB) language so use the current terminology on the EIC origin.',
    },
    {
      name: 'Size the transformers to the connected tool load',
      text:
        'Calculate the maximum simultaneous tool load on each TSC and add headroom for inrush. 3.3 kVA covers one operative with one large tool; 5 kVA covers two operatives; 10 kVA serves a small team with shared heavy tools.',
    },
    {
      name: 'Install the distribution in the right order',
      text:
        'Install the TBC at the origin, TCCs for 230V/400V distribution, and TSCs for 110V CTE. Use BS EN 60309-2 yellow / blue / red connectors throughout — no mixed colours, no makeshift adaptors.',
    },
    {
      name: 'Confirm the centre-tap earth bond on every TSC',
      text:
        'Verify that each transformer secondary midpoint is bonded to protective earth. Test line-to-earth at each 110V outlet — both legs should read ~55V. Document on the EIC schedule.',
    },
    {
      name: 'Perform initial verification and issue the EIC',
      text:
        'Complete continuity, insulation resistance, Zs and RCD function tests on the 230V/400V circuits; verify polarity and earth bond on the 110V circuits. Issue the EIC with the next inspection set at three months. Hand to the principal contractor and post a copy at the TBC.',
    },
    {
      name: 'Set up the in-service inspection regime',
      text:
        'Brief operatives on daily visual checks. Schedule weekly walk-rounds by a competent person, monthly inspection-and-test by an electrician, and three-monthly EICRs. Put PAT testing on a three-month cycle for Class I portable equipment.',
    },
  ],
  faqs: [
    {
      question: 'Is 110V CTE legally required on UK construction sites?',
      answer:
        'No statutory instrument names 110V CTE as mandatory. The legal duties sit in EAWR 1989 and CDM 2015; HSE HSG141 and BS 7375 identify 110V CTE as the practical means of discharging them; Section 704 explicitly recognises Reduced Low Voltage as a protective measure. In practice every UK principal contractor mandates 110V CTE in the site rules, making it contractually compulsory.',
    },
    {
      question: 'Why is each leg of a 110V CTE system at 55V to earth and not 110V to earth?',
      answer:
        'Because the transformer secondary is centre-tapped to earth — the midpoint of the 110V winding is bonded to the earth terminal. One outer terminal sits at +55V, the other at -55V. The voltage between them is still 110V (what the tool runs on), but the maximum voltage any one conductor reaches to earth is only 55V — below the let-go threshold for involuntary muscular contraction.',
    },
    {
      question: 'Do I still need an RCD on a 110V CTE circuit?',
      answer:
        'Not by Section 704 — the centre-tapped earth and the 55V-to-earth condition IS the protective measure under Regulation 704.410.3.5. Standard 30 mA additional RCD protection is required on the 230V supply to the transformer primary and on any 230V or 400V site socket-outlets up to 32A. Many TSCs include an RCD on the 110V secondary as a belt-and-braces feature, which is additional protection on top of the RLV measure rather than a replacement.',
    },
    {
      question: 'What is the difference between BS 7375 and BS 7671 Section 704?',
      answer:
        'Section 704 is the binding regulatory specification — the technical requirements an installation must meet under BS 7671. BS 7375 is a Code of Practice — practical guidance on layout, distribution, management and inspection of a construction site installation, including the colour-coded connector convention and the TBC / TCC / TSC / OSC distribution assembly nomenclature. They are complementary.',
    },
    {
      question: 'How often must a construction site supply be inspected and tested?',
      answer:
        'Section 704 and HSE HSG141 recommend a maximum three months between full EICR-style inspections. BS 7375 adds a more frequent routine: daily visual checks by operatives, weekly visual inspection by a competent person, monthly inspection-and-test by an electrician. Any incident or damaged lead triggers immediate inspection before return to service.',
    },
    {
      question: 'Does BS 7671:2018+A4:2026 change anything for 110V CTE site supplies?',
      answer:
        'A4:2026 keeps RLV under Section 704 unchanged. It refines AFDD guidance for socket-outlets in higher-risk locations (relevant where a site office is higher-risk) and refines TN-C-S (PNB) language for the site origin description. The new A4:2026 EIC schedule columns must be used on the temporary supply certificate.',
    },
    {
      question: 'Can I use a 230V tool on a site if I have RCD protection?',
      answer:
        'Technically yes where the principal contractor permits it with 30 mA RCD protection. In practice almost every UK principal contractor mandates 110V CTE in the site rules, and turning up with a 230V tool is a common reason for being turned away at the gate. If in doubt, bring 110V.',
    },
    {
      question: 'What certificate do I issue for a temporary construction site supply?',
      answer:
        'An EIC is issued before any sub-circuits are energised, covering the origin (TBC), main switch, protective devices, earthing arrangement, bonding, cable types and initial verification results — including the centre-tap earth bond on every transformer. The next inspection date is typically set three months ahead. The Elec-Mate digital EIC tool includes the A4:2026 schedule columns and construction-site-specific declarations.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/bs-7671-a4-2026-summary',
      title: 'BS 7671 A4:2026 Summary',
      description: 'Every change in Amendment 4 — AFDD, TN-C-S (PNB), new schedule columns and the Section 704 modifications affecting site supplies.',
      icon: 'BookOpen',
      category: 'Guide',
    },
    {
      href: '/guides/construction-site-safety',
      title: 'Construction Site Safety Overview',
      description: 'CDM 2015 duties, RAMS, induction, PPE and the management of electrical risk on a live site.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/guides/construction-site-safety-electrical',
      title: 'Construction Site Safety (Electrical)',
      description: 'Safe isolation, lock-off, RCD protection of 230V sub-circuits and the management of 110V CTE supplies.',
      icon: 'Zap',
      category: 'Guide',
    },
    {
      href: '/guides/construction-site-temporary-supply',
      title: 'Construction Site Temporary Supply',
      description: 'Designing, installing, testing and certifying the temporary site supply — TBC, TCC, TSC, OSC and the EIC.',
      icon: 'FileCheck2',
      category: 'Guide',
    },
    {
      href: '/guides/cdm-2015-for-electricians',
      title: 'CDM 2015 for Electricians',
      description: 'The duty holder framework, principal contractor responsibilities and the planning chain around the temporary supply certificate.',
      icon: 'BookOpen',
      category: 'Guide',
    },
    {
      href: '/guides/site-induction-electrical-contractors',
      title: 'Site Induction for Electrical Contractors',
      description: 'Site rules, voltage policy, RAMS submission, EIC presentation and the documentation needed to clear the gate.',
      icon: 'ClipboardCheck',
      category: 'Guide',
    },
  ],
  ctaHeading: 'Certify your temporary site supply in minutes',
  ctaSubheading:
    'The Elec-Mate digital EIC tool includes the BS 7671:2018+A4:2026 schedule columns, the construction-site-specific declarations and the centre-tap earth bond verification fields you need for a 110V CTE site supply. Issue, sign and send to the principal contractor straight from your phone. 7-day free trial, cancel anytime.',
};
