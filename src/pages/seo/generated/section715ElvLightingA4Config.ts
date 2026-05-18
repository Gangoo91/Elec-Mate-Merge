import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in BS 7671:2018+A4:2026 (18th Edition, published 15 April 2026),
// BS EN 61347 (Lamp Controlgear), BS EN 60598 (Luminaires), and the IET
// On-Site Guide for low-voltage installations.

const published = '2026-05-17';
const modified = '2026-05-18';

export const section715ElvLightingA4Config: GeneratedGuideConfig = {
  pagePath: '/guides/section-715-elv-lighting-a4-2026',
  title:
    'BS 7671 Section 715 Extra-Low Voltage Lighting (A4:2026)',
  description:
    'BS 7671:2018+A4:2026 Section 715 explained: ELV definition, SELV vs PELV vs FELV, Class III equipment, transformer / driver selection under BS EN 61347…',
  datePublished: published,
  dateModified: modified,
  readingTime: 17,
  badge: 'BS 7671 Section 715',
  badgeIcon: 'Zap',
  breadcrumbLabel: 'Section 715 ELV Lighting',
  heroPrefix: 'BS 7671',
  heroHighlight: 'Section 715',
  heroSuffix: 'Extra-Low Voltage Lighting Installations (A4:2026)',
  heroSubtitle:
    'Extra-low voltage lighting circuits — feature lighting, display lighting, downlighters fed from remote drivers, garden and architectural lighting, and the rapidly growing world of Power over Ethernet (PoE) lighting — all sit inside the scope of BS 7671:2018+A4:2026 Section 715. This guide walks through the ELV definition, the SELV / PELV / FELV distinction that determines protective measures, transformer and driver selection under BS EN 61347, maximum cable cross-sectional area and run length, fire and thermal risk, and how Section 715 applies cleanly to 57 V DC PoE class 3 and class 4 lighting installations.',
  keyTakeaways: [
    'Extra-low voltage (ELV) is defined as a nominal voltage not exceeding 50 V AC RMS or 120 V DC ripple-free between conductors or between any conductor and earth.',
    'Section 715 of BS 7671:2018+A4:2026 covers extra-low voltage lighting installations supplied from a source at a voltage not exceeding 50 V AC (or 120 V DC ripple-free), whether indoor, outdoor or display-based.',
    'SELV (Separated Extra-Low Voltage), PELV (Protective Extra-Low Voltage) and FELV (Functional Extra-Low Voltage) are not interchangeable — only SELV and PELV are recognised as protective measures against electric shock; FELV always requires additional protection because the source is not safety-isolated.',
    'Class III equipment is designed for connection to a SELV or PELV source only — it has no provision for protective earthing and must never be connected to a low-voltage supply.',
    'A4:2026 reinforces the alignment of Section 715 with BS EN 61347 (lamp controlgear / drivers) and BS EN 60598 (luminaires), and clarifies the documentation expected on the Schedule of Inspections where ELV circuits are present.',
    'Power over Ethernet (PoE) lighting — IEEE 802.3bt class 3 and class 4 systems delivering up to 71.3 W per port at a maximum 57 V DC — sits inside Section 715 because the voltage does not exceed the ELV ceiling, but the cable management, fire stopping and luminaire compatibility requirements still apply.',
    'Transformer and driver selection must comply with BS EN 61347 — short-circuit protected, thermally protected, and rated for the actual continuous load with appropriate derating for ambient temperature.',
    'Maximum cable cross-sectional area, volt drop limits and the practical run length on an ELV lighting circuit are governed by the same Appendix 4 principles as LV circuits, but the lower voltage makes volt drop the dominant constraint long before current-carrying capacity becomes the limit.',
  ],
  sections: [
    {
      id: 'what-is-elv',
      heading: 'Extra-Low Voltage — The Definition That Anchors Section 715',
      tocLabel: 'What is ELV?',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Extra-low voltage (ELV) is defined in Part 2 of BS 7671:2018+A4:2026 as a nominal voltage not exceeding 50 V AC RMS or 120 V DC ripple-free, measured between conductors or between any conductor and earth. This is the voltage ceiling that determines whether a circuit falls under Section 715 of the Wiring Regulations or under the general low-voltage rules.',
        },
        {
          type: 'paragraph',
          text:
            'The phrase "ripple-free" matters — for DC supplies, the ripple component must not exceed 10% RMS of the nominal value. A nominally 120 V DC supply with excessive ripple is not ELV for the purposes of Section 715. In practice, modern switched-mode drivers and PoE injectors used in ELV lighting circuits produce well-regulated DC outputs that sit comfortably below the ripple limit.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Why the ELV threshold exists',
          text:
            'Below 50 V AC / 120 V DC ripple-free, the risk of dangerous electric shock from contact with live parts is substantially reduced. ELV is not, however, "no shock risk" — wet skin, immersed body parts and prolonged contact can still cause harm. Section 715 still requires protective measures appropriate to the source and environment.',
        },
      ],
    },
    {
      id: 'selv-pelv-felv',
      heading: 'SELV, PELV and FELV — The Three Flavours of ELV',
      tocLabel: 'SELV / PELV / FELV',
      blocks: [
        {
          type: 'paragraph',
          text:
            'ELV circuits come in three operational categories: SELV (Separated Extra-Low Voltage), PELV (Protective Extra-Low Voltage) and FELV (Functional Extra-Low Voltage). They look similar on a single-line drawing — but their protective status, and therefore their installation rules under Section 715, differ significantly.',
        },
        {
          type: 'list',
          ordered: true,
          tone: 'info',
          items: [
            'SELV — Separated Extra-Low Voltage. The source is electrically separated from earth and from any other circuit by double or reinforced insulation. The output is not earthed at any point. A failure of the LV side cannot raise the ELV side above 50 V AC / 120 V DC. Used where any earth reference must be excluded — for example bathroom Zone 0/1 luminaires.',
            'PELV — Protective Extra-Low Voltage. Identical to SELV in source isolation requirements, but the ELV side IS connected to earth at one point. Used where exposed-conductive-parts must be earth-referenced for functional reasons or where a Class I luminaire body is involved.',
            'FELV — Functional Extra-Low Voltage. The voltage is in the ELV band, but the source is NOT a safety-isolating transformer. The LV side and the ELV side are not separated by double or reinforced insulation. FELV is NOT a protective measure — a fault on the LV side can put LV onto the ELV conductors. Additional protection (automatic disconnection, basic insulation rated for LV) is required on the ELV wiring.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'FELV is NOT safe by virtue of being ELV',
          text:
            'A circuit that is "extra-low voltage in normal operation" but supplied from a non-isolating source (an autotransformer, a simple resistive dropper, a non-safety-isolating switched-mode supply) is FELV. The ELV wiring on a FELV circuit must be treated as though it could become live at LV under a single fault. Always confirm the source type from the manufacturer\'s data before classifying.',
        },
      ],
    },
    {
      id: 'section-715-scope',
      heading: 'Scope of Section 715 — Indoor and Outdoor ELV Lighting',
      tocLabel: 'Section 715 scope',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Section 715 applies to extra-low voltage lighting installations supplied from a source at a voltage not exceeding 50 V AC, or 120 V DC ripple-free. The section sits in Part 7 of BS 7671:2018+A4:2026 alongside other special installations and locations. It applies whether the installation is indoor, outdoor, residential, commercial or display-based — what matters is the supply voltage and the fact that the load is lighting.',
        },
        {
          type: 'list',
          items: [
            'Remote-driver LED downlighter circuits where the driver output is in the ELV band — the wiring from the driver to each luminaire is governed by Section 715.',
            'Track lighting and feature lighting systems with a 12 V or 24 V ELV bus.',
            'Garden, path, deck and architectural lighting fed from a SELV source.',
            'Display lighting in retail and museum settings — the long, exposed conductor runs are precisely the situation Section 715 was written for.',
            'Decorative and cove lighting where the LED tape or module is supplied from a remote ELV driver.',
            'Power over Ethernet (PoE) lighting — class 3 or class 4 PoE delivering up to 71.3 W per port at a maximum 57 V DC.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'Regulation 715.411 sets the protection-against-electric-shock framework — SELV and PELV are recognised; FELV is restricted. Regulation 715.422 deals with protection against fire and thermal effects (driver enclosure, ambient considerations). Regulation 715.512 covers the selection and erection of equipment, including the requirement that ELV wiring be physically separated from LV wiring (or insulated for the higher voltage). Regulation 715.521 covers wiring systems — cable type, cross-sectional area, run length and supports.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Section 715 sits alongside, not instead of, the rest of BS',
          text:
            'An ELV lighting circuit still has an upstream LV final circuit feeding the driver or PoE switch. The LV side is governed by Section 4, Section 5 and the relevant Section 7 location requirements (Section 701 bathrooms, Section 702 swimming pools, etc.). Section 715 governs the ELV side downstream of the source.',
        },
      ],
    },
    {
      id: 'class-iii-equipment',
      heading: 'Class III Equipment — Designed for SELV / PELV Only',
      tocLabel: 'Class III equipment',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Equipment used on a Section 715 circuit will frequently be Class III. Class III equipment is designed for connection to a SELV or PELV source only — it has no provision for protective earthing, and its internal insulation is rated only for the ELV nominal voltage. It carries the Class III symbol (a Roman numeral III inside a diamond) on the equipment marking.',
        },
        {
          type: 'list',
          items: [
            'Class III luminaires have no Earth terminal — the moulded body, lampholder and any exposed metallic trim are not connected to the protective conductor.',
            'A Class III luminaire must NEVER be connected to a low-voltage supply, even briefly during commissioning. Its insulation is not rated for LV and its body is not earth-referenced.',
            'On Class III equipment the connecting cable should be selected for the actual ELV voltage and current, but with mechanical protection appropriate to the location — flex on garden lighting, fixed cable in plaster, etc.',
            'Class III plugs and connectors typically use non-standard or polarised connectors specifically so they cannot be inadvertently plugged into LV outlets.',
          ],
        },
      ],
    },
    {
      id: 'transformer-driver-selection',
      heading: 'Transformer and Driver Selection — BS EN 61347',
      tocLabel: 'Drivers (BS EN 61347)',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The source for an ELV lighting circuit is almost always a controlgear unit — either a magnetic transformer (now rare) or, far more commonly, an electronic LED driver. These devices are governed by BS EN 61347, the lamp controlgear standard. Driver selection is one of the most important decisions on any Section 715 design — get it wrong and the entire circuit either fails to start, runs hot, or fails prematurely.',
        },
        {
          type: 'list',
          tone: 'success',
          items: [
            'Confirm the driver is a SELV (or PELV) source — look for the safety-isolating transformer symbol on the label, or the SELV / PELV declaration in the data sheet. A non-isolating driver creates an FELV circuit downstream.',
            'Rate the driver for the actual total connected load, with a margin — many drivers are rated for "up to 60 W" but should not be loaded above 80% of nameplate for thermal headroom.',
            'Check the maximum cable length from driver to luminaire stated in the data sheet — for low-voltage 12 V circuits this can be as little as 2 m on small-cross-section conductors before volt drop is significant.',
            'Confirm short-circuit protection, overload protection and thermal protection are integral — modern BS EN 61347 drivers include all three, but legacy units may not.',
            'Verify the ambient temperature rating (Ta) — drivers in ceiling voids or behind cove battens can be exposed to 40-50 °C continuous, and many domestic-grade drivers are rated only to 25 °C ambient.',
            'For dimmable circuits, confirm the driver is dimmable and compatible with the dimmer type — leading-edge, trailing-edge, 1-10 V analogue, DALI, DMX, Zigbee, etc.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Driver mounting and access',
          text:
            'A driver buried above a plasterboard ceiling with no access hatch is a foreseeable maintenance failure. Section 715.512 and the broader BS 7671 requirements for accessibility of accessories effectively rule out fully concealed drivers. Where the architecture demands concealment, a hinged access plate, a removable downlighter aperture, or a dedicated access panel should be provided.',
        },
      ],
    },
    {
      id: 'cable-length-volt-drop',
      heading: 'Cable Length, Volt Drop and Cross-Sectional Area',
      tocLabel: 'Cable length / volt drop',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Volt drop is the dominant constraint on most ELV lighting circuits, well before current-carrying capacity becomes the limit. The reason is simple arithmetic: at 12 V nominal, a 0.5 V drop is over 4% — already at the BS 7671 Appendix 4 limit for lighting circuits. At 230 V the same 0.5 V drop is below 0.25% and would never be noticed.',
        },
        {
          type: 'paragraph',
          text:
            'Section 715 does not override the Appendix 4 voltage-drop guidance — the same 3% for lighting (and 5% for power) limits apply, expressed as a percentage of the source voltage. For 12 V SELV that means 0.36 V at the furthest luminaire; for 24 V SELV 0.72 V; for 48 V SELV 1.44 V; and for 57 V PoE class 4 it is approximately 1.71 V.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Calculate the load current at the furthest luminaire — sum the wattage of all downstream fittings on that branch and divide by the nominal voltage.',
            'Choose a candidate cross-sectional area (1.0 mm², 1.5 mm², 2.5 mm², 4.0 mm² etc.) from Appendix 4 Table 4D2A or equivalent for ELV.',
            'Calculate the volt drop using mV/A/m values for that conductor, then multiply by the run length in metres.',
            'Compare the calculated volt drop to the 3% limit (or stricter, if the luminaire data sheet specifies a tighter window).',
            'If the calculated volt drop exceeds the limit, increase the cross-sectional area or shorten the run.',
            'For long runs at 12 V or 24 V, consider relocating the driver closer to the load rather than upsizing the cable — every doubled cross-sectional area roughly halves the volt drop, but is significantly more expensive and harder to install.',
          ],
        },
        {
          type: 'callout',
          tone: 'pricing',
          title: 'Practical rule of thumb for ELV lighting runs',
          text:
            'At 12 V, expect to drive no more than ~20 W down 1.5 mm² for around 5 m before volt drop becomes a problem. At 24 V the same cable will comfortably run ~40 W over 8-10 m. At 48 V it will run ~80 W over 15+ m. PoE class 4 at 57 V DC behaves like a 48-57 V SELV circuit electrically, with the additional constraint of the PoE port budget (71.3 W).',
        },
        {
          type: 'paragraph',
          text:
            'Cable cross-sectional area for ELV lighting is also affected by the wiring system. ELV cable installed alongside or sharing containment with LV cable must either be physically separated, or insulated for the higher voltage present — Regulation 715.512 is explicit about this, and the same rule appears in Section 528. The practical implication for an electrician retrofitting ELV feature lighting into an existing LV containment system is that ELV-only cable cannot simply be dropped into the same trunking — it must be either rated for the higher voltage or run in its own segregated route.',
        },
      ],
    },
    {
      id: 'a4-2026-updates',
      heading: 'A4:2026 Updates Affecting Section 715',
      tocLabel: 'A4:2026 updates',
      blocks: [
        {
          type: 'paragraph',
          text:
            'BS 7671:2018+A4:2026 (the 18th Edition Amendment 4, published 15 April 2026) refreshed Section 715 in step with developments in LED lighting, PoE infrastructure, and the wider Part 7 alignment work.',
        },
        {
          type: 'list',
          tone: 'info',
          items: [
            'Tighter cross-references to BS EN 61347 (lamp controlgear) — the controlgear / driver standard family is explicitly named, making it easier for a designer or inspector to confirm whether a particular driver is compliant.',
            'Updated cross-references to BS EN 60598 (luminaires) and the Class III construction requirements that follow from a SELV / PELV source.',
            'Clarified documentation expectations on the Schedule of Inspections where ELV circuits are present — the ELV source type, voltage and protective measure should be recorded against each affected circuit.',
            'Recognition of Power over Ethernet (PoE) lighting as an in-scope wiring system at ELV — A4:2026 does not introduce PoE-specific regulations within Section 715 itself, but its application to PoE follows logically from the voltage definition and source rules.',
            'Alignment with the wider A4:2026 changes affecting Section 701 (bathrooms) — SELV luminaires in Zone 0 of a bath / shower remain permitted with a 12 V AC or 30 V DC SELV source, mounted in accordance with the manufacturer\'s instructions, and the cross-references in Section 715 are now consistent with the revised Section 701 text.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'For a full summary of the changes introduced by Amendment 4, see our [BS 7671 A4:2026 summary guide](/guides/bs-7671-a4-2026-summary). The AFDD requirements (Section 421.1.7), TN-C-S (PNB) earthing rules and new schedule columns all sit on the LV side and indirectly affect any final circuit that feeds an ELV driver.',
        },
      ],
    },
    {
      id: 'poe-lighting',
      heading: 'Power over Ethernet (PoE) Lighting — Where Section 715 Lands',
      tocLabel: 'PoE lighting',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Power over Ethernet (PoE) lighting is the fastest-growing class of ELV lighting installation in UK commercial buildings, and it sits squarely inside the scope of Section 715. PoE delivers both data and DC power to a luminaire over a single Cat 6 or Cat 6A cable from a network switch. The voltage is below the ELV ceiling, the load is lighting, and the circuit is therefore an extra-low voltage lighting installation by the Section 715 definition.',
        },
        {
          type: 'list',
          items: [
            'PoE class 3 (IEEE 802.3bt Type 3) delivers up to 51 W at the source / 40 W at the powered device, at a port voltage in the 50-57 V DC range.',
            'PoE class 4 (IEEE 802.3bt Type 4) delivers up to 90 W at the source / 71.3 W at the powered device, at the same 50-57 V DC port voltage range.',
            'At 57 V DC the circuit is within the ELV ceiling of 120 V DC ripple-free — PoE is therefore an ELV system and Section 715 applies.',
            'The PoE switch is the equivalent of the LED driver — it is the SELV source for the ELV circuit. Confirm that the switch power supply is safety-isolating (almost all modern PoE switches are).',
            'PoE class 3 / class 4 also use 4-pair power delivery, which spreads the current across all four conductor pairs in the Cat 6 / Cat 6A cable to reduce I²R heating and conductor temperature rise.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'PoE cable bundles and fire risk',
          text:
            'A bundle of Cat 6A cables each carrying class 4 PoE can develop a measurable temperature rise inside trunking, especially where the bundle is dense and the ambient is warm. TIA TSB-184-A gives bundle derating guidance for PoE cable; designers should consider it alongside the BS 7671 cable grouping rules. The fire risk is low at the current levels involved but bundle management still matters for thermal performance.',
        },
        {
          type: 'paragraph',
          text:
            'For a deep dive into PoE lighting installation — switch selection, cable routing, luminaire commissioning and the convergence with the building IT infrastructure — see our [PoE lighting installation guide](/guides/poe-lighting-guide). The two guides are complementary: this Section 715 page anchors the regulatory framework; the PoE guide walks through the practical specification and install.',
        },
      ],
    },
    {
      id: 'fire-thermal-protection',
      heading: 'Fire Risk and Thermal Protection',
      tocLabel: 'Fire and thermal protection',
      blocks: [
        {
          type: 'paragraph',
          text:
            'ELV lighting is sometimes assumed to be inherently fire-safe because of the low voltage — that assumption is wrong. The current in a 12 V or 24 V circuit can be substantial (a 60 W load at 12 V draws 5 A), and a short circuit in poorly designed ELV wiring can develop significant heat before any upstream protective device operates.',
        },
        {
          type: 'list',
          tone: 'warning',
          items: [
            'Section 715.422 requires that the lighting installation does not present a fire risk through thermal effects — the driver, the cable and the luminaire must each operate within their thermal ratings.',
            'Drivers must be short-circuit-protected and overload-protected — confirm from the data sheet that the driver shuts down (rather than smouldering) on a short on the ELV output.',
            'LED tape and flexible LED modules can develop hot spots where they are kinked, where the adhesive backing has lifted, or where they are run inside a sealed cove with no airflow. Specify aluminium channel for any tape run over 3-5 m and respect the manufacturer\'s thermal derating.',
            'Recessed downlighters disturb the thermal performance of the ceiling — A4:2026 maintains the requirement that downlighters in fire-rated ceilings either carry the appropriate fire rating themselves, or are fitted with a fire hood that restores the rating.',
            'Cable in contact with thermal insulation is subject to the standard Appendix 4 derating — at ELV currents this is often a minor issue, but at higher PoE class 4 loads it can matter on bundles of Cat 6A.',
          ],
        },
      ],
    },
    {
      id: 'inspection-and-testing',
      heading: 'Inspection and Testing of ELV Lighting Circuits',
      tocLabel: 'Inspection and testing',
      blocks: [
        {
          type: 'paragraph',
          text:
            'ELV circuits still need to be inspected and tested before energisation and at periodic intervals afterwards. The test sequence differs from a standard LV final circuit because the protective measures and the source characteristics are different, but the principle of structured verification is identical.',
        },
        {
          type: 'list',
          ordered: true,
          tone: 'success',
          items: [
            'Continuity — verify the continuity of every ELV conductor from source (driver / PoE port) to luminaire. For PELV circuits, also verify continuity of the bonding from the ELV-side reference earth.',
            'Insulation resistance — test between live conductors and between live conductors and earth on the ELV wiring. The test voltage is reduced for ELV (250 V DC test voltage for circuits ≤ 50 V) to avoid damaging connected electronics.',
            'Polarity — confirm correct polarity on DC ELV circuits, especially LED downlighters and LED tape, where reverse polarity will simply prevent operation and is easy to miss without a methodical check.',
            'Functional test — energise the circuit through the driver / PoE source, confirm each luminaire operates, confirm dimming or scene control responds as commissioned, confirm any addressable luminaires (DALI, DMX, Zigbee, PoE-managed) are correctly addressed and report status.',
            'SELV / PELV verification — confirm by inspection that the source is the declared type (look for the safety-isolating transformer symbol on the driver, or the SELV / PELV declaration in the data sheet).',
            'Record on the Schedule of Inspections — note the source type, the nominal voltage, the protective measure (SELV / PELV), and any specific Section 715 considerations for the inspector who follows on the next periodic.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Insulation resistance — reduced test voltage on ELV',
          text:
            'BS 7671 Table 64 gives a 250 V DC test voltage and a minimum acceptable value of 0.5 MΩ for circuits at ELV (nominal voltage ≤ 50 V). Using the standard 500 V test voltage on a connected ELV circuit can damage drivers and electronic control gear — always disconnect electronics first or use the lower test voltage.',
        },
        {
          type: 'paragraph',
          text:
            'Where the ELV lighting forms part of an EIC submission, the Schedule of Inspections should record the source location, the voltage, the protective measure, and any limitations on access for maintenance. Where it forms part of an EICR, the same items should be examined and recorded, with an observation code raised against any deficiency (typically C3 for missing labelling, C2 for missing isolation or a damaged driver enclosure that exposes LV conductors).',
        },
      ],
    },
  ],
  howToHeading: 'How to Design a Compliant Section 715 ELV Lighting Circuit',
  howToDescription:
    'A practical sequence for designing, installing and signing off an extra-low voltage lighting circuit under BS 7671:2018+A4:2026 — covering source selection, cable sizing, fire and thermal protection, and inspection.',
  howToSteps: [
    {
      name: 'Confirm the voltage band and protective measure',
      text:
        'Identify the nominal source voltage and confirm it does not exceed 50 V AC RMS or 120 V DC ripple-free. Determine whether the circuit will be SELV, PELV or FELV — this drives every downstream design decision and the protective measures required.',
    },
    {
      name: 'Select a BS EN 61347 driver or PoE source',
      text:
        'Choose a controlgear unit or PoE switch with a safety-isolating output, integral short-circuit, overload and thermal protection, an appropriate ambient temperature rating for the actual install location, and a power rating that loads to no more than approximately 80% of nameplate for thermal headroom.',
    },
    {
      name: 'Calculate volt drop and choose conductor cross-sectional area',
      text:
        'Calculate the load current at the furthest luminaire, then use Appendix 4 mV/A/m values to size the cable so the total volt drop is within 3% of the nominal source voltage. At 12 V SELV that is a 0.36 V budget; at 24 V it is 0.72 V; at 48 V it is 1.44 V; at 57 V PoE it is approximately 1.71 V.',
    },
    {
      name: 'Route cable with segregation from LV',
      text:
        'Plan the cable route so ELV wiring is physically separated from LV wiring, or use cable insulated for the higher voltage present, per Regulation 715.512. Allow access to the driver and any addressable nodes for future maintenance and avoid burying the driver where it cannot be reached without destructive work.',
    },
    {
      name: 'Verify fire and thermal performance',
      text:
        'Check the driver ambient temperature against the actual install location, confirm the luminaire fire rating where it is recessed into a fire-rated ceiling, and ensure any LED tape installations have appropriate aluminium channel and respect manufacturer thermal limits. For PoE bundles, review the bundle size against TIA TSB-184-A derating guidance.',
    },
    {
      name: 'Inspect, test and document on the EIC',
      text:
        'Test continuity, insulation resistance (with 250 V DC test voltage on ELV), polarity and function before energising. Record the source type, voltage, protective measure and any maintenance access limitations on the Schedule of Inspections so the next inspector has a clear picture.',
    },
  ],
  faqs: [
    {
      question: 'What voltage is "extra-low voltage" under BS 7671:2018+A4:2026?',
      answer:
        'A nominal voltage not exceeding 50 V AC RMS or 120 V DC ripple-free, between conductors or between any conductor and earth. The "ripple-free" qualifier means the DC ripple must not exceed 10% RMS of the nominal value. Section 715 of BS 7671:2018+A4:2026 governs lighting installations at this voltage.',
    },
    {
      question: 'What is the difference between SELV, PELV and FELV?',
      answer:
        'SELV (Separated Extra-Low Voltage) and PELV (Protective Extra-Low Voltage) both use a safety-isolating source that separates the ELV circuit from LV by double or reinforced insulation. The difference is that SELV is not earthed at any point, while PELV is earth-referenced at one point. FELV (Functional Extra-Low Voltage) is in the ELV voltage band but does NOT use a safety-isolating source — under fault, the ELV wiring could be raised to LV. Only SELV and PELV are recognised as protective measures; FELV requires additional protection on the ELV wiring itself.',
    },
    {
      question: 'Does Section 715 apply to PoE lighting?',
      answer:
        'Yes. Power over Ethernet (PoE) class 3 and class 4 lighting operates at up to 57 V DC, which sits below the 120 V DC ripple-free ELV ceiling. The luminaire is the load and the PoE switch is the source. The circuit is therefore an extra-low voltage lighting installation under the Section 715 definition. PoE-specific guidance (Cat 6/6A cable selection, bundle derating per TIA TSB-184-A, PoE switch budgeting) sits alongside Section 715 rather than within it.',
    },
    {
      question: 'What is Class III equipment and where does it fit in?',
      answer:
        'Class III equipment is designed for connection to a SELV or PELV source only. It has no provision for protective earthing — the body, lampholder and any exposed metallic parts are not connected to a protective conductor, and the internal insulation is rated only for the ELV nominal voltage. It must NEVER be connected to a low-voltage supply. Most ELV downlighters, garden lighting fittings and feature luminaires are Class III. Look for the Class III symbol (Roman numeral III in a diamond) on the equipment marking.',
    },
    {
      question: 'How long can my cable run be on a 12 V ELV lighting circuit?',
      answer:
        'Volt drop is the constraint, not current-carrying capacity. At 12 V SELV the 3% volt drop budget is only 0.36 V — which on 1.5 mm² cable carrying a 5 A load (60 W) is reached after roughly 5 m of run. Doubling the voltage to 24 V doubles both the budget and reduces the current by half for the same wattage, which roughly quadruples the practical run length. For long runs, relocate the driver closer to the load rather than upsizing the cable indefinitely.',
    },
    {
      question: 'Can I run ELV lighting cable in the same trunking as my LV circuits?',
      answer:
        'Not without taking specific precautions. Regulation 715.512 requires that ELV wiring be physically separated from LV wiring, or insulated for the higher voltage present. In practice this means either using a cable rated for the LV voltage even though it carries ELV, or providing a separate compartment or separate containment for the ELV cable. Simply running standard ELV flex alongside LV singles in the same trunking is not compliant.',
    },
    {
      question: 'What did A4:2026 change in Section 715?',
      answer:
        'A4:2026 tightened the cross-references to BS EN 61347 (lamp controlgear / drivers) and BS EN 60598 (luminaires), clarified the documentation expected on the Schedule of Inspections where ELV circuits are present, and aligned with the wider Part 7 updates including the revised Section 701 (bathrooms) text on SELV luminaires in Zone 0. A4:2026 did not introduce PoE-specific regulations within Section 715, but its application to PoE follows naturally from the voltage definition and source rules already in the section.',
    },
    {
      question: 'What test voltage should I use for insulation resistance on an ELV circuit?',
      answer:
        '250 V DC, per BS 7671 Table 64, with a minimum acceptable value of 0.5 MΩ. Using the standard 500 V DC test voltage on a connected ELV circuit can damage drivers, LED control gear and other electronics. If you must test at 500 V, disconnect the electronics first and reconnect after the test.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/bs-7671-a4-2026-summary',
      title: 'BS 7671 A4:2026 Summary',
      description: 'The full set of changes introduced by Amendment 4 — AFDD, TN-C-S (PNB) earthing, new schedule columns, and model form updates.',
      icon: 'BookOpen',
      category: 'Guide',
    },
    {
      href: '/guides/poe-lighting-guide',
      title: 'PoE Lighting Installation Guide',
      description: 'Practical specification, cable selection, switch budgeting and commissioning for Power over Ethernet class 3 and class 4 lighting.',
      icon: 'Cable',
      category: 'Guide',
    },
    {
      href: '/guides/smart-home-lighting-installation',
      title: 'Smart Home Lighting Installation',
      description: 'Where ELV feature lighting meets smart-home control — drivers, dimming protocols, and scene control on residential projects.',
      icon: 'Home',
      category: 'Guide',
    },
    {
      href: '/guides/commercial-lighting-guide',
      title: 'Commercial Lighting Guide',
      description: 'Designing commercial lighting schemes with a mix of LV and ELV circuits, addressable control and emergency lighting.',
      icon: 'Building2',
      category: 'Guide',
    },
    {
      href: '/tools/lighting-lux-calculator',
      title: 'Lighting Lux Calculator',
      description: 'Calculate the lux level delivered by a proposed lighting scheme — useful when specifying ELV or PoE luminaires for a given task area.',
      icon: 'Calculator',
      category: 'Tool',
    },
    {
      href: '/guides/bs-7671-a4-2026-luminaire-rcd-protection',
      title: 'A4:2026 Luminaire RCD Protection',
      description: 'How the A4:2026 RCD protection rules for luminaires interact with the ELV side of a Section 715 circuit and the LV side feeding the driver.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
  ],
  ctaHeading: 'Design and certify ELV lighting with confidence',
  ctaSubheading:
    'Elec-Mate ships the digital EIC and EICR tools, 70+ calculators and the BS 7671:2018+A4:2026 reference materials UK electricians use on Section 715 ELV and PoE lighting projects. 7-day free trial, cancel anytime.',
};
