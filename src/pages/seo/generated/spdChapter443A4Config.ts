import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in BS 7671:2018+A4:2026 (18th Edition, published 15 April 2026),
// IET Guidance Note 8 (Earthing & Bonding), BS EN 62305 (Lightning Protection)
// and BS EN 61643 (Low-voltage surge protective devices).

const published = '2026-05-17';
const modified = '2026-05-17';

export const spdChapter443A4Config: GeneratedGuideConfig = {
  pagePath: '/guides/spd-chapter-443-a4-2026',
  title:
    'Surge Protective Devices — Chapter 443 under BS 7671:2018+A4:2026 | Elec-Mate',
  description:
    'Chapter 443 of BS 7671:2018+A4:2026 explained for UK electricians — the new Calculated Risk Level (CRL) methodology, when SPDs are mandatory, Type 1, Type 2 and Type 3 selection, Section 534 installation rules, AC and DC coordination for solar PV and battery storage, and EICR coding for missing or failed surge protective devices.',
  datePublished: published,
  dateModified: modified,
  readingTime: 18,
  badge: 'BS 7671 A4:2026',
  badgeIcon: 'ShieldCheck',
  breadcrumbLabel: 'SPDs — Chapter 443 (A4:2026)',
  heroPrefix: 'Surge Protective Devices',
  heroHighlight: 'Chapter 443',
  heroSuffix: '— under BS 7671:2018+A4:2026',
  heroSubtitle:
    'Chapter 443 of BS 7671 governs the protection of low-voltage electrical installations against transient overvoltages of atmospheric origin or due to switching. Under Amendment 4:2026, the risk-assessment methodology has been overhauled, the Calculated Risk Level (CRL) replaces the older AQ assessment for many installations, and a fresh wave of installations now sit firmly inside the mandatory-SPD scope. This guide walks UK electricians through the regulation cite-by-cite, sets out Type 1, Type 2 and Type 3 selection, explains the Section 534 installation rules that decide whether the device actually works in practice, and shows how to code missing or failed SPDs at EICR.',
  keyTakeaways: [
    'Chapter 443 of BS 7671:2018+A4:2026 governs protection against transient overvoltages — atmospheric (lightning) and switching origin. Section 534 covers how the SPDs that deliver that protection are installed and coordinated.',
    'A4:2026 replaces the older AQ-based assessment with a clearer Calculated Risk Level (CRL) methodology at Regulation 443.5, drawing on the lightning protection risk model in BS EN 62305-2.',
    'Where the CRL exceeds the tolerable level, or where the consequence of a transient overvoltage event would result in serious injury, loss of human life, loss of public services, loss of cultural heritage, or commercial or industrial activity loss, SPDs are mandatory.',
    'Type 1 SPDs (10/350 µs waveform) are needed where a structural Lightning Protection System (LPS) is present or where a direct strike to the supply is a credible risk. Type 2 SPDs (8/20 µs) are the standard origin-of-installation device. Type 3 SPDs sit close to sensitive equipment in addition to upstream protection.',
    'Section 534 imposes strict installation rules — total connecting-conductor length ideally below 0.5 m, never above 1 m, parallel (V-shape) connection at the busbar, and a backup overcurrent device sized to the SPD manufacturer\'s declared short-circuit current rating.',
    'For solar PV, battery energy storage and EV charging, A4:2026 makes clear that the DC side requires its own coordinated SPDs to BS EN 61643-31 / -41, separate from the AC origin device, with the same length and coordination rules applied to the DC cabling.',
    'Missing surge protection where it is now mandatory is typically coded C3 (improvement recommended) on an EICR, but where the absence is paired with an obvious downstream risk — life-safety systems, medical equipment, data centres — a C2 (potentially dangerous) becomes defensible.',
  ],
  sections: [
    {
      id: 'what-chapter-443-does',
      heading: 'What Chapter 443 Actually Does',
      tocLabel: 'What Chapter 443 does',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Chapter 443 of BS 7671:2018+A4:2026 sits inside Part 4 — Protection for Safety — and deals exclusively with one threat: transient overvoltages. A transient overvoltage is a short-duration spike, typically lasting microseconds, that travels along the supply cables or down the equipotential bonding system and lands on the terminals of equipment connected to the installation. The two sources Chapter 443 cares about are atmospheric (a lightning strike to the distribution network, the structure or nearby ground) and switching (high-current breaks elsewhere on the network, large inductive loads cycling, capacitor switching).',
        },
        {
          type: 'paragraph',
          text:
            'The regulation does not say "fit an SPD on every job." It says: assess the risk, and where the calculated risk exceeds the tolerable level, or where the consequence of a transient overvoltage event would be serious, surge protective devices shall be provided. The mechanism that delivers that protection is then governed by Section 534 of the standard — how the SPD is selected, where it is installed, how it is connected, and how multiple SPDs are coordinated.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Chapter 443 vs Section 534 — the split',
          text:
            'Chapter 443 (Part 4, Protection) tells you when an SPD is required and what overvoltage category equipment falls into. Section 534 (Part 5, Selection and Erection) tells you how to install it so it works. You need both regulations side by side on any job that touches surge protection.',
        },
        {
          type: 'paragraph',
          text:
            'BS 7671:2018+A4:2026 (the 18th Edition, fourth amendment, published 15 April 2026) does not change the structural location of Chapter 443. Regulation 443.1 still scopes the chapter, 443.4 still deals with overvoltage categories of equipment, and 443.5 still carries the requirement and assessment. What A4:2026 has done is rewrite the assessment in 443.5 around a Calculated Risk Level, tighten the language on consequence categories, and bring DC-side surge protection for prosumer installations into clearer focus through cross-references to Chapter 712 (PV) and Chapter 826 (prosumer LV installations).',
        },
        {
          type: 'paragraph',
          text:
            'For a fuller picture of how A4:2026 affects the rest of the standard, see our [BS 7671 A4:2026 summary](/guides/bs-7671-a4-2026-summary). For the SPD device itself in isolation — what it is, how it clamps, and how it differs from an MCB — see our [SPD guide](/guides/spd-guide) and the broader [power surge protection](/guides/power-surge-protection) explainer.',
        },
      ],
    },
    {
      id: 'the-crl-methodology',
      heading: 'The Calculated Risk Level (CRL) Methodology',
      tocLabel: 'CRL methodology',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The headline change in A4:2026 is the rewrite of Regulation 443.5. The older assessment route — heavily influenced by an environmental classification (AQ) of the structure\'s exposure to lightning — was widely felt to be hard to apply consistently. Two electricians looking at the same building could reach different AQ values, and the binary mandatory / not-mandatory outcome that fell out the other end did not always feel proportionate to the actual risk.',
        },
        {
          type: 'paragraph',
          text:
            'The new methodology turns 443.5 into a quantitative calculation. The Calculated Risk Level (CRL) draws explicitly on the lightning-risk framework in BS EN 62305-2, the international standard for protection against lightning. The designer establishes the relevant risk components — the probability of a damaging transient reaching the installation, the type and length of supply, the structure\'s position, dimensions and exposure, and the consequence to people and property if the event occurs — then compares the calculated value against a tolerable risk level fixed by the standard.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Establish whether the consequence of a transient overvoltage event would result in serious injury or loss of human life — a "Cl 1" consequence category. If yes, SPDs are mandatory regardless of CRL.',
            'Establish whether the consequence would interrupt public services (telecoms, transport, healthcare), result in loss of cultural heritage, or cause significant commercial or industrial activity loss. If yes, SPDs are mandatory regardless of CRL.',
            'For all other installations, calculate the CRL using the risk components in BS EN 62305-2 — supply type and length, structural exposure, lightning ground flash density (Ng), shielding, isolating interfaces — and compare with the tolerable risk level set in 443.5.',
            'If CRL exceeds the tolerable level, SPDs are mandatory. If CRL is below the tolerable level, SPDs are not mandatory by Chapter 443 — but the designer may still install them as a discretionary measure where the cost-benefit case is clear.',
            'Document the assessment. Whichever route — consequence trigger or CRL calculation — the designer must keep a record of the assessment so that it can be audited at handover and at periodic inspection.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'The "consequence" route triggers SPDs even on low-risk sites',
          text:
            'A small rural building with a short underground supply may calculate a CRL well below the tolerable threshold — but if that building houses a dialysis clinic or a life-safety system, the consequence categories in 443.5 make SPDs mandatory anyway. Read the consequence triggers first; calculate the CRL second.',
        },
        {
          type: 'paragraph',
          text:
            'The CRL methodology aligns BS 7671 more closely with how BS EN 62305 already handles structural lightning protection, which means that on any project where a structural LPS designer has produced a risk assessment, the electrician can lift parameters directly out of that document rather than reproducing the work. In practice this is a major simplification for designers working on commercial, healthcare, education and industrial projects.',
        },
      ],
    },
    {
      id: 'when-spd-mandatory',
      heading: 'When SPDs Are Mandatory and When They Are Optional',
      tocLabel: 'When SPDs are mandatory',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Putting Regulation 443.5 into plain English for working electricians: there are three routes that make SPDs mandatory under A4:2026, and a fourth that makes them strongly recommended even where they are technically optional.',
        },
        {
          type: 'list',
          items: [
            'Mandatory by consequence — installations where a transient overvoltage event could result in serious injury or loss of life (e.g. medical locations to Chapter 710, fire detection and alarm systems, emergency lighting central battery systems, safety-related industrial control).',
            'Mandatory by public service — installations supplying telecoms, transport infrastructure, power generation, water and waste, healthcare, where loss of service would have a wider public impact.',
            'Mandatory by CRL — installations where the calculated CRL under 443.5 exceeds the tolerable risk level. The most common driver here is an overhead supply, a structure on an exposed elevation, or a relatively long supply length without shielding.',
            'Strongly recommended (but not mandatory) — most modern domestic installations: a typical new-build or full rewire with a long supply, a mix of mains-connected smart electronics, solar PV, battery storage and EV charging will benefit from SPDs even where the CRL number sits below the tolerable threshold.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'In domestic practice, the practical answer for most A4:2026 consumer unit replacements is: fit SPDs unless the client has been clearly informed that the assessment is below the tolerable level and has declined the protection in writing. That position lines up with what most insurers and CPS schemes are now expecting on a 2026-onwards installation, and it means the documentation trail at handover is clean.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'TT systems deserve special attention',
          text:
            'TT-earthed installations sit at higher risk from transient overvoltage events because the earth return path is via a local rod rather than a low-impedance network earth. A4:2026 keeps the general expectation that SPDs feature prominently in TT installations, particularly where the supply is overhead or where the structure is exposed.',
        },
      ],
    },
    {
      id: 'spd-types',
      heading: 'Type 1, Type 2 and Type 3 SPDs',
      tocLabel: 'Type 1, 2 and 3',
      blocks: [
        {
          type: 'paragraph',
          text:
            'BS 7671:2018+A4:2026 retains the three-tier classification of low-voltage SPDs, tested and declared to BS EN 61643-11. The Type number is not a quality grade — it describes the test waveform the device is qualified against, and therefore the kind of event the device is designed to handle and the position in the installation where it is meant to live.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Type 1 SPD — tested with a 10/350 µs current waveform that simulates a partial direct lightning current. Required at the origin of the installation where a structural Lightning Protection System (LPS) is present, where the installation is supplied by an overhead line in an exposed location, or where a direct strike to the supply is a credible risk. Typically declared with an Iimp (impulse current) rating in kA.',
            'Type 2 SPD — tested with an 8/20 µs current waveform that simulates an induced transient, including the residual of a strike further away on the network. This is the standard origin-of-installation device for the vast majority of UK installations and is declared with an In (nominal discharge current) and Imax (maximum discharge current). Most consumer-unit-mounted SPDs are Type 2.',
            'Type 3 SPD — tested with a combination waveform and intended for the finer level of protection close to sensitive equipment. Type 3 devices live downstream of the main Type 2 device — at a sub-board, in an equipment rack, or as a socket-outlet or plug-in unit serving an item of high-value electronics.',
            'Combined-type devices — many modern SPDs are declared as Type 1+2 or Type 1+2+3. These are convenient at the origin of an installation that has an LPS overhead, because one chassis covers the impulse and the induced events.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'Selecting the right Type starts with the question: is there a Lightning Protection System? If yes, you need Type 1 (or combined 1+2) at the origin. If no, you typically need Type 2 at the origin. Then, separately, decide whether you also need Type 3 close to sensitive equipment. The two decisions are independent — fitting Type 3 alone, without a Type 2 upstream, leaves the Type 3 device exposed to events well beyond its rating and will not deliver compliant protection.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Don\'t buy Type 3 without Type 2',
          text:
            'A Type 3 SPD installed at a sub-board without a Type 2 device upstream at the origin is not Chapter 443 compliant. Type 3 devices are co-ordinated downstream protection — they assume an upstream Type 2 device has already clamped the bulk of the event.',
        },
        {
          type: 'paragraph',
          text:
            'For a deeper dive into device construction and how the metal-oxide varistor (MOV) or spark-gap technology actually clamps the transient, see our [SPD surge protection](/guides/spd-surge-protection) article.',
        },
      ],
    },
    {
      id: 'overvoltage-categories',
      heading: 'Overvoltage Categories (Regulation 443.4)',
      tocLabel: 'Overvoltage categories',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Regulation 443.4 establishes four overvoltage categories (sometimes written OVC I to OVC IV) that describe the level of transient overvoltage a piece of equipment must withstand at its terminals before it is considered damaged. The categories are progressive: OVC IV equipment is built to withstand more than OVC III, which is built to withstand more than OVC II, and so on. Selecting the right SPD at the origin is then a matter of clamping the transient down to a residual voltage Up at the equipment terminals that is below the equipment\'s declared withstand category.',
        },
        {
          type: 'list',
          items: [
            'OVC IV — equipment for use at the origin of the installation (service entrance side). Electricity meters, ripple-control equipment, primary overcurrent protective devices.',
            'OVC III — equipment for use in the fixed installation. Distribution boards, fixed wiring, socket outlets, fixed motors, industrial control gear.',
            'OVC II — equipment intended to be supplied from the fixed installation. Domestic appliances, portable tools, most consumer electronics.',
            'OVC I — equipment intended for connection to a circuit where measures have been taken to limit transient overvoltages to a specifically low level. Computer logic and electronic equipment whose internal supply has its own filtering or isolation.',
        ],
        },
        {
          type: 'paragraph',
          text:
            'The practical relevance for SPD selection is that the residual voltage Up declared on the device must be lower than the impulse withstand voltage Uw of the equipment it protects, with an appropriate margin for the connecting conductors. For a typical UK 230 V installation, Uw at OVC II is 2.5 kV. An SPD with a declared Up of 1.5 kV at the origin, plus a well-controlled installation with short connection conductors, will sit comfortably below that limit.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'The 20% rule of thumb for Up',
          text:
            'A common BS 7671 designer rule is that Up at the SPD plus the conductor-length voltage drop during the surge should not exceed 80% of the protected equipment\'s Uw. That margin accounts for ageing of the SPD, manufacturing tolerance, and the inductive voltage that develops across the connecting leads during the µs-scale event.',
        },
      ],
    },
    {
      id: 'section-534-installation',
      heading: 'Section 534 — Installation Requirements',
      tocLabel: 'Section 534 installation',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Section 534 ("Devices for protection against transient overvoltages") is where the regulation gets unforgiving. A perfectly specified Chapter 443 SPD will deliver no protection at all if it is installed with the wrong conductor length, the wrong topology, or the wrong upstream device. The headline rule electricians need to remember:',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Total connecting-conductor length must be short',
          text:
            'Section 534 requires that the total length of the conductors connecting the SPD to the live conductor and to the earthing terminal be as short as practicable. The standard expects this total to be no more than 0.5 m where possible, and strictly no more than 1 m. Beyond 1 m, the inductive voltage that develops across the conductor during a microsecond-scale surge eats into the SPD\'s effective protection level.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Use parallel ("V-shape") connection at the busbar — the SPD is teed off the live conductor and bonded to the main earthing terminal with the shortest practicable conductors. Do not loop the live or neutral through the SPD; tee it.',
            'Keep the total of (live lead + earth lead) ideally below 0.5 m. If physical constraints push it to between 0.5 m and 1 m, document the design. Above 1 m, the residual voltage at the protected equipment terminals can rise above the equipment\'s Uw, and the device cannot be relied on as Chapter 443 protection.',
            'Provide a backup overcurrent device upstream of the SPD, selected according to the SPD manufacturer\'s declared maximum backup overcurrent rating. This protects the SPD against end-of-life short-circuit failure and ensures the installation\'s prospective fault current does not exceed the SPD\'s declared Iscr (short-circuit current rating).',
            'Where the upstream device is shared with the installation supply, confirm that the discrimination between the backup OCD and downstream devices is acceptable — an SPD failure should not trip the entire supply.',
            'Earth the SPD to the main earthing terminal of the installation, not to a separate rod or to a structural steel that has not been confirmed as bonded to the MET. The SPD only works if its earth reference is the same as the equipment it is protecting.',
            'Coordinate the SPD with RCD/RCBO protection — install the SPD on the supply side of the RCD where possible (or use a Type S, time-delayed RCD upstream) to avoid nuisance tripping during a transient event that releases earth-leakage current through the SPD.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Bury the length issue at first fix',
          text:
            'On a consumer unit replacement, decide where the SPD will live before you punch the gland holes. Putting the SPD on the far side of the board from the meter tails almost guarantees you exceed the 0.5 m practical target. Mount it as close to the incoming way as the consumer unit layout allows.',
        },
      ],
    },
    {
      id: 'spd-coordination-cascade',
      heading: 'SPD Coordination and Cascade',
      tocLabel: 'Coordination and cascade',
      blocks: [
        {
          type: 'paragraph',
          text:
            'For installations that need protection at multiple levels — origin, sub-board and equipment — Section 534 requires that the SPDs be coordinated. Coordination means that when a transient arrives at the origin, the upstream device clamps the bulk of the current and the downstream device handles only the residual that gets past. The two devices must share the load in a way that is consistent with both manufacturers\' declared performance.',
        },
        {
          type: 'list',
          items: [
            'Energetic coordination — the let-through energy of the upstream device must be below the survivability rating of the downstream device. Most SPD manufacturers publish coordination tables for their own product family that an electrician can lift directly.',
            'Voltage coordination — the residual voltage Up at each stage steps down progressively. Type 2 at the origin typically clamps to around 1.2 to 1.5 kV; a downstream Type 3 then clamps further to around 0.7 to 0.9 kV at the equipment.',
            'Distance coordination — where the cable run between two SPDs exceeds approximately 10 m (with no shielded path), the natural impedance of the cabling provides enough decoupling that the two devices coordinate without further measures. Where the run is shorter, a decoupling inductor or specifically declared coordinated pair may be required.',
            'Cross-brand coordination — if upstream and downstream SPDs are from different manufacturers, verify coordination using the published Up and let-through values rather than assuming compatibility. The safer path is single-manufacturer coordinated sets.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'In domestic and small-commercial practice, most installations need only a single Type 2 (or combined Type 1+2) at the origin. Cascade only becomes a routine design question on larger sites with multiple sub-boards, in installations that include particularly sensitive electronics, or where part of the building has been retrofitted with on-site generation.',
        },
      ],
    },
    {
      id: 'ac-dc-solar-battery',
      heading: 'AC and DC SPDs — Solar PV and Battery Storage',
      tocLabel: 'Solar PV and battery',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A4:2026 sharpens the requirement that prosumer installations — those with solar PV, battery energy storage systems (BESS), and bidirectional EV charging — receive coordinated surge protection on both the AC and DC sides of the installation. This is not a new principle in 2026; Chapter 712 (Solar PV) and Chapter 826 (Prosumer LV installations) have referenced surge protection for several editions. What A4:2026 has done is tighten the cross-references and the assessment so that designers cannot reasonably leave the DC side undefended.',
        },
        {
          type: 'list',
          items: [
            'AC side — install Type 2 (or Type 1+2 where a structural LPS is present or where the supply is overhead) SPDs at the origin of the AC installation. This is the same Section 534 device an electrician would specify on any other dwelling. Tested to BS EN 61643-11.',
            'DC side — install DC-rated SPDs on the PV array DC cabling between the array and the inverter, selected and installed in accordance with BS EN 61643-31 (PV applications). On longer DC runs, an SPD is needed at both ends of the cable.',
            'Battery DC — for BESS, the DC busbar between the battery and the hybrid inverter needs its own SPD, sized to the system DC voltage (rated Uc above the maximum continuous DC voltage of the array or battery), and complying with BS EN 61643-41.',
            'EV charging — for a unidirectional charge point downstream of the consumer unit, the origin SPD usually covers the AC side. For vehicle-to-grid (V2G / V2H) installations the inverter\'s DC port may also need its own DC SPD; follow the inverter manufacturer\'s instructions and Chapter 722.',
            'Lightning Protection System — where a structural LPS is fitted to the roof on which the PV is installed, the AC origin device should be Type 1 (or 1+2) and the DC SPDs on the array should be selected with the LPS Iimp share in mind. Coordinate with the LPS designer.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Section 534 length rules apply to DC too',
          text:
            'The "as short as practicable, below 0.5 m where possible" Section 534 rule applies on the DC side as well as on the AC. On a roof-mounted array with cabling routed away from the inverter, an SPD mounted in the inverter enclosure will rarely sit within 0.5 m of the panel string. Mount the DC SPD at the array end as well, or use a combined SPD-equipped DC isolator close to the panels.',
        },
      ],
    },
    {
      id: 'eicr-coding',
      heading: 'EICR Coding for Missing or Failed SPDs',
      tocLabel: 'EICR coding',
      blocks: [
        {
          type: 'paragraph',
          text:
            'One of the most frequently asked questions from inspectors since Amendment 2 introduced strengthened SPD requirements has been: how do I code an installation that does not have surge protection? The answer under A4:2026 is unchanged in principle but tighter in practice. The codes available are C1 (immediate danger), C2 (potentially dangerous), C3 (improvement recommended) and FI (further investigation required). The right code depends on what the installation actually contains and what the consequence of a transient event would be.',
        },
        {
          type: 'list',
          items: [
            'C3 (improvement recommended) — the standard default for a domestic or small-commercial installation that has no SPDs where Chapter 443 would now require them. The consumer unit is older than A4:2026 and the absence is a non-compliance with the current edition, not an immediate danger. C3 communicates to the client that the absence should be remedied at the next opportunity (typically the next CU replacement).',
            'C2 (potentially dangerous) — defensible where the consequence triggers in Regulation 443.5 apply. If the installation contains life-safety systems, medical equipment, fire detection central units, or other equipment whose failure during a transient event would create a real and present risk to people, C2 is the appropriate code.',
            'C1 (immediate danger) — rarely the right code for the mere absence of an SPD. C1 is reserved for situations where danger to persons or property is present and immediate. An SPD that has visibly failed in a way that exposes live parts, or that has burned out the consumer unit, may justify C1.',
            'FI (further investigation required) — appropriate where the inspector cannot determine without testing whether an installed SPD is still serviceable. Modern SPDs include a status window (green / red flag); if it is red, replace the device. If the window is missing or unreadable, FI is the honest call.',
            'Notes on the schedule — whichever code is recorded, the inspector should reference Regulation 443.5 and 534 in the observation, and explicitly note whether the consequence trigger or the CRL trigger drove the coding.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'The C2 vs C3 debate, settled by consequence',
          text:
            'The recurring industry debate over whether missing SPDs are C2 or C3 is resolved cleanly by reading 443.5\'s consequence triggers. If the consequence categories apply (life safety, public service, cultural heritage, commercial loss) the absence is more than an improvement opportunity — it is potentially dangerous. If they do not apply, C3 remains the proportionate code.',
        },
        {
          type: 'paragraph',
          text:
            'Inspectors and verifiers running EICRs from 1 April 2026 onward should be testing against the A4:2026 wording, not the older AQ-based language. The Calculated Risk Level methodology produces a more defensible record of why a particular code was given, especially where the inspector wants to support a C2 finding.',
        },
      ],
    },
    {
      id: 'a4-2026-specific-updates',
      heading: 'What Specifically Changed in A4:2026',
      tocLabel: 'A4:2026 changes',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Pulling together the regulation-level changes A4:2026 introduces into Chapter 443 and Section 534:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Regulation 443.5 has been rewritten around the Calculated Risk Level (CRL) methodology, replacing the older AQ-classification-led assessment for the general case.',
            'The consequence categories in 443.5 have been clarified to make explicit that life safety, public service, cultural heritage and commercial / industrial activity loss each independently trigger mandatory SPDs.',
            'Cross-references between Chapter 443 and BS EN 62305-2 (lightning protection risk management) have been tightened so that designers working alongside a structural LPS designer can lift risk parameters directly.',
            'Chapter 712 (Solar PV) and Chapter 826 (Prosumer LV installations) cross-reference Chapter 443 more explicitly, anchoring the requirement for coordinated AC and DC SPDs on prosumer installations.',
            'Section 534 retains the existing connecting-conductor length rules but the supporting notes emphasise that exceeding 1 m total length voids the protection in practice.',
            'New model forms (EIC, EICR, MEIWC) for A4:2026 carry SPD-related declarations in the schedule of inspections and the schedule of test results, making the presence or absence of SPDs explicitly recorded on certification.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'A4:2026 is also the amendment that brings the wider package of AFDD changes, TN-C-S (PNB) earthing updates, and new schedule columns. For the surge-protection-specific picture of A4:2026, the most important practical change is the CRL methodology in 443.5 — for the rest, see our [BS 7671 A4:2026 AFDD changes](/guides/bs-7671-a4-2026-afdd-changes) guide and the broader [BS 7671 A4:2026 summary](/guides/bs-7671-a4-2026-summary).',
        },
        {
          type: 'callout',
          tone: 'success',
          title: 'Audit your design library against A4:2026',
          text:
            'Any standard design office text — RAMS templates, EICR observation libraries, consumer unit specification sheets — that references the old AQ-led 443.5 wording should be revised. The CRL language and the consequence triggers should now appear wherever the old wording lived.',
        },
      ],
    },
    {
      id: 'commissioning-testing-handover',
      heading: 'Commissioning, Testing and Handover',
      tocLabel: 'Commissioning and handover',
      blocks: [
        {
          type: 'paragraph',
          text:
            'An SPD is not a tested device in the same sense as an RCD — there is no equivalent of an RCD trip test that an electrician performs on energisation. What there is, however, is a body of checks at commissioning that confirm the device is fitted correctly, that the upstream backup OCD is in place and the right size, and that the SPD\'s status indicator is reading healthy. Those checks belong on the Schedule of Inspections.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Visual inspection — confirm the SPD is the correct Type (1, 2, 1+2 or 3) for its position in the installation, that its Uc (maximum continuous operating voltage) is appropriate for the system voltage, and that its status window reads healthy.',
            'Connection inspection — confirm the live and earth connecting conductors are as short as practicable, parallel-connected at the busbar, and that the total length is below 1 m. Photograph the installation for the records.',
            'Backup OCD verification — confirm the upstream backup overcurrent device is in place and sized in accordance with the SPD manufacturer\'s declared maximum backup OCD. Record the type and rating on the schedule.',
            'Earth path verification — confirm the SPD\'s earth lead lands on the main earthing terminal of the installation, not on a separate rod or a non-bonded structural item.',
            'RCD coordination — verify the SPD is upstream of the RCD/RCBO protection wherever this is achievable. Where the SPD is downstream of an RCD, confirm the RCD is Type S or otherwise rated for the SPD\'s discharge current and will not nuisance-trip.',
            'Documentation — record the SPD make, model, Type, Uc, Up, In, Iimp (where applicable), and the backup OCD type and rating on the EIC schedule of inspections. Hand the client the SPD manufacturer\'s data sheet alongside the certificate.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'For consumer-unit-mounted SPDs, the device is part of the same enclosure as the rest of the assembly, and the new A4:2026 EIC model form makes provision in the schedule of inspections for the SPD entry to be ticked off. Make sure this is captured at energisation rather than being treated as an extra item the electrician scribbles on the back of the form.',
        },
      ],
    },
    {
      id: 'spd-lifespan-replacement',
      heading: 'SPD Lifespan, Status Indication and Replacement',
      tocLabel: 'Lifespan and replacement',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Unlike most other parts of the installation, an SPD is consumable. Each transient event the device clamps degrades its internal varistors slightly, and large events can take the device out of service in a single hit. Section 534 therefore expects the device to have a clear status indicator visible without dismantling the enclosure, and Chapter 443 expects the installation\'s periodic inspection regime to check that indicator.',
        },
        {
          type: 'list',
          items: [
            'Status window — almost all current-generation Type 2 SPDs include a flag that reads green when the device is serviceable and red (or shows a fault symbol) when the device has reached end of life. The flag should be visible without removing the consumer unit cover.',
            'Replacement — when the status flag indicates failure, the SPD module is replaced as a unit. Most manufacturers design the device as a plug-in cassette so the replacement is a five-minute job with the supply isolated.',
            'Service life — in a quiet electrical environment, a Type 2 SPD will typically deliver 10+ years of service. In an exposed location with frequent overhead-supply switching events, the same device may need replacement after a single severe lightning season.',
            'Whole-device end-of-life — when the consumer unit reaches end-of-life and is replaced under A4:2026, the SPD will be replaced as part of the new assembly; do not transplant a 10-year-old SPD into a new CU.',
            'Periodic inspection — at every EICR, the inspector should photograph and record the SPD status. A failed indicator drives an FI (further investigation) or a recommendation to replace, depending on whether the inspector has confirmed the failure on site.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Client briefing matters',
          text:
            'At handover, brief the client on the SPD status window. Show them where it is, what green means, what red means, and what to do (call you back) if it changes. A two-minute conversation at handover turns a passive device into something the householder is willing to glance at every few months.',
        },
      ],
    },
    {
      id: 'elec-mate-tools',
      heading: 'Building Chapter 443 Compliance into Daily Practice',
      tocLabel: 'Tools and workflow',
      blocks: [
        {
          type: 'paragraph',
          text:
            'For most UK electricians, the Chapter 443 / Section 534 workflow now sits inside the standard consumer-unit-replacement and EICR routines. The Elec-Mate platform supports this in three places:',
        },
        {
          type: 'list',
          tone: 'success',
          items: [
            'EIC and EICR tools — the schedule of inspections includes A4:2026-aligned SPD line items, the schedule of test results captures the SPD make, model, Type and Uc, and the report rendering keeps the SPD entry visible at handover.',
            'Circuit Designer — assists with selecting Type 1 vs Type 2 vs Type 3 at the origin and at sub-boards, and with sizing the upstream backup overcurrent device against the SPD\'s declared maximum backup OCD.',
            'RAMS Generator — produces the safe-working method statement that wraps around any consumer unit replacement, including the safe isolation steps that precede the SPD installation and the energisation steps that follow it.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'For the working electrician, the most important takeaway from A4:2026 is that the days of "I don\'t fit SPDs as standard" are over. The CRL methodology, paired with the consequence triggers in 443.5, has tightened the assessment in a way that means a default-fit position is now the path of least resistance on almost every consumer unit replacement and almost every new installation.',
        },
      ],
    },
  ],
  howToHeading: 'How to Apply Chapter 443 on a Consumer Unit Replacement',
  howToDescription:
    'A practical six-step workflow that takes a working electrician from "is an SPD needed?" through to "SPD installed, tested and on the certificate" under BS 7671:2018+A4:2026.',
  howToSteps: [
    {
      name: 'Run the consequence check first',
      text:
        'Before reaching for the CRL calculator, ask whether the installation falls into any of the 443.5 consequence categories: life safety, public service, cultural heritage, commercial / industrial activity loss. If yes, SPDs are mandatory and no further assessment is needed.',
    },
    {
      name: 'Calculate the CRL for the general case',
      text:
        'Where the consequence triggers do not apply, calculate the CRL using the risk components in BS EN 62305-2 — supply type, supply length, lightning ground flash density, structural exposure, shielding, isolating interfaces. Compare against the tolerable risk level set in 443.5. If CRL exceeds the tolerable level, SPDs are mandatory.',
    },
    {
      name: 'Select Type 1, Type 2 or combined',
      text:
        'If a structural Lightning Protection System (LPS) is present, or the supply is overhead in an exposed location, specify a Type 1 (or combined Type 1+2) at the origin. Otherwise, specify a Type 2 at the origin. Where downstream sensitive equipment is present, add coordinated Type 3 at the equipment.',
    },
    {
      name: 'Plan the Section 534 installation',
      text:
        'Locate the SPD as close to the incoming way of the consumer unit as the assembly allows. Plan parallel ("V-shape") connection at the busbar with total connecting-conductor length below 0.5 m where possible. Confirm the upstream backup OCD type and rating against the SPD manufacturer\'s declaration.',
    },
    {
      name: 'Install, isolate, energise and verify',
      text:
        'Carry out the consumer unit replacement under a safe isolation procedure. On energisation, confirm the SPD status indicator reads healthy, the backup OCD is in service, and the SPD earth lead lands on the main earthing terminal. Photograph the installation for the project record.',
    },
    {
      name: 'Certify and hand over',
      text:
        'Tick the SPD line items on the schedule of inspections and capture the SPD make, model, Type, Uc, Up, In (or Iimp for Type 1) on the schedule of test results in the A4:2026 EIC. Brief the client on the status window and what to do if it changes. File the certificate, the schedule, and the photographs together.',
    },
  ],
  faqs: [
    {
      question: 'When is an SPD mandatory under BS 7671:2018+A4:2026?',
      answer:
        'Regulation 443.5 makes SPDs mandatory in three situations: (a) where the consequence of a transient overvoltage event would result in serious injury or loss of human life, loss of public service, loss of cultural heritage, or significant commercial or industrial activity loss; (b) where the Calculated Risk Level (CRL) for the installation exceeds the tolerable level set in 443.5; or (c) where another specific chapter of BS 7671 — for example Chapter 710 (medical locations) or Chapter 712 (solar PV) — independently calls for surge protection. Outside these triggers, SPDs are recommended rather than mandatory, but most A4:2026 consumer unit replacements will now fit SPDs as a default position because the documentation trail and insurer expectation make discretionary omission harder to defend.',
    },
    {
      question: 'How much do SPDs in a consumer unit add to the cost of a CU change?',
      answer:
        'A single Type 2 SPD module that bolts into a modern consumer unit typically costs between £40 and £90 trade for the device itself, depending on manufacturer. The associated labour is small — most installations are a five-to-ten minute add-on at the point of CU assembly, provided the planning for parallel connection and short conductor length has been done up front. On a typical UK consumer unit replacement the total installed uplift for adding a Type 2 SPD is in the £80 to £150 range. For installations needing Type 1 (combined 1+2) at the origin where a structural LPS is present, expect a higher device cost — £150 to £350 trade — and a slightly larger enclosure footprint to satisfy the Section 534 connection rules.',
    },
    {
      question: 'When do I need a Type 1 SPD instead of a Type 2?',
      answer:
        'You need a Type 1 (or combined Type 1+2) SPD at the origin of the installation where there is a structural Lightning Protection System (LPS) to BS EN 62305 fitted to the building, where the installation is supplied by an overhead line in an exposed location, or where a direct strike to the supply or the structure is a credible risk. A Type 1 device is tested with a 10/350 µs current waveform that simulates partial direct lightning current and is declared with an Iimp rating in kA. A Type 2 is tested with an 8/20 µs waveform and is the standard origin device for the vast majority of UK installations without a structural LPS. If you are not sure, the safer specification on a project that already has a structural LPS is Type 1+2 combined.',
    },
    {
      question: 'What code do I give an EICR for a missing SPD — C2 or C3?',
      answer:
        'The default code for a missing SPD where Chapter 443 would now require one is C3 (improvement recommended). This communicates to the client that the absence is a non-compliance with the current edition of BS 7671 and should be remedied at the next opportunity. C2 (potentially dangerous) becomes defensible where the installation contains equipment that maps onto the consequence triggers in Regulation 443.5 — life-safety systems, medical equipment, fire detection central units, or other equipment whose failure during a transient event would create a real and present risk. C1 is rarely the right code for the mere absence of an SPD; it is reserved for visible immediate danger such as a failed device that has burned out the consumer unit. Whichever code is used, the EICR observation should reference 443.5 and 534 explicitly and state which trigger drove the coding.',
    },
    {
      question: 'How do I coordinate an SPD with downstream RCBOs without nuisance tripping?',
      answer:
        'There are two routes. The first, and preferred, is to install the SPD on the supply side of the RCD or RCBO protection — typically immediately downstream of the main switch and ahead of the RCBO bank in the consumer unit. The transient event then discharges through the SPD to earth without passing through the RCD. The second, used where the consumer unit layout makes upstream placement impractical, is to use a Type S (time-delayed) RCD upstream of the SPD. Type S RCDs are designed to ride through short pulses of earth leakage of the kind that an SPD passes during a discharge event. Always check the SPD manufacturer\'s declared In or Imax against the RCD specification — coordination is a manufacturer claim, not an assumption.',
    },
    {
      question: 'How long does an SPD last and how do I know when to replace it?',
      answer:
        'In a quiet electrical environment, a Type 2 SPD will typically deliver 10 or more years of service before its varistors degrade enough to trigger the end-of-life indicator. In an exposed location with frequent overhead-supply switching events or repeated lightning activity, the same device may reach end of life in a single severe season. The device tells you when it is done: modern SPDs include a status window that reads green when serviceable and red (or shows a fault symbol) when degraded. Check the window at every EICR and brief the client to glance at it every few months. When the indicator changes, replace the SPD module — almost all current-generation devices are designed as plug-in cassettes that swap out in minutes with the supply safely isolated. When the consumer unit itself reaches end of life and is replaced, the SPD is replaced as part of the new assembly; do not transplant an older SPD into a new CU.',
    },
    {
      question: 'Do I need a separate SPD for the DC side of a solar PV or battery system?',
      answer:
        'Yes, for any DC cable run of meaningful length. Chapter 712 (Solar PV) and Chapter 826 (Prosumer LV installations) cross-reference Chapter 443 to make clear that the DC side of an installation needs its own coordinated surge protection, separate from the AC origin device. The DC SPD is selected to BS EN 61643-31 (PV applications) or BS EN 61643-41 (battery DC), sized so its Uc sits above the maximum continuous DC voltage of the array or battery, and installed under the same Section 534 length rules as the AC device. On longer DC cable runs an SPD is needed at both ends of the cable — typically a combined SPD-equipped DC isolator close to the panels, and a second device inside the inverter enclosure. Where a structural LPS is fitted to the roof on which the PV is installed, coordinate the DC SPD selection with the LPS designer so the Iimp share is correctly allocated.',
    },
    {
      question: 'How does the CRL methodology in A4:2026 differ from the older AQ assessment?',
      answer:
        'The older Regulation 443 assessment in earlier editions relied heavily on an environmental classification of the structure\'s lightning exposure (AQ), and produced a relatively binary "fit / do not fit" outcome that two designers could reach inconsistently. A4:2026 rewrites 443.5 around a Calculated Risk Level (CRL), drawing explicitly on the risk-management framework in BS EN 62305-2. The designer establishes the relevant risk components — supply type and length, lightning ground flash density, structural exposure, shielding, isolating interfaces, and the consequence to people and property — calculates a CRL value, and compares it against a tolerable risk level fixed by the standard. The methodology is more quantitative, more reproducible between designers, and aligns BS 7671 more closely with how structural LPS designers already work under BS EN 62305. The consequence triggers in 443.5 (life safety, public service, cultural heritage, commercial activity loss) remain available as a separate route that makes SPDs mandatory regardless of CRL.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/bs-7671-a4-2026-summary',
      title: 'BS 7671 A4:2026 Summary',
      description:
        'The full A4:2026 picture — AFDD changes, TN-C-S (PNB) earthing updates, new schedule columns, model form changes, and the Chapter 443 CRL methodology in context.',
      icon: 'BookOpen',
      category: 'Guide',
    },
    {
      href: '/guides/power-surge-protection',
      title: 'Power Surge Protection',
      description:
        'What a power surge actually is, how an SPD clamps it, and how the residual voltage at equipment terminals stays below the impulse withstand voltage.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/guides/spd-guide',
      title: 'SPD Guide',
      description:
        'The Type 1, Type 2 and Type 3 SPD distinction in detail — test waveforms, Up, Uc, In, Iimp, and how to read an SPD datasheet line by line.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/guides/spd-surge-protection',
      title: 'SPD Surge Protection Deep Dive',
      description:
        'How a metal-oxide varistor (MOV) clamps the transient, what spark-gap technology adds, and how SPDs behave at end of life.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/guides/bs-7671-a4-2026-afdd-changes',
      title: 'BS 7671 A4:2026 AFDD Changes',
      description:
        'The companion A4:2026 update on AFDDs — when they are mandatory, where they live in the consumer unit, and how they relate to the SPD and RCBO stack.',
      icon: 'BookOpen',
      category: 'Guide',
    },
    {
      href: '/guides/chapter-44-overvoltage-protection',
      title: 'Chapter 44 Overvoltage Protection',
      description:
        'The parent chapter to 443 — the full overvoltage protection framework in Part 4 of BS 7671, including 441 (general), 442 (faults between systems) and 443 (transient overvoltages).',
      icon: 'BookOpen',
      category: 'Guide',
    },
  ],
  ctaHeading: 'Build Chapter 443 compliance into every certificate',
  ctaSubheading:
    'The Elec-Mate EIC and EICR tools carry A4:2026-aligned SPD line items on the schedule of inspections, capture SPD make, model, Type, Uc and Up on the schedule of test results, and produce a clean handover record for the client. 7-day free trial, cancel anytime.',
};
