import { ArrowLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  LearningOutcomes,
  ContentEyebrow,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  SectionRule,
  AppendixTable,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'datacabling-m5s4-750ma-cap',
    question:
      'A vendor specs a Type 4 PoE++ access point at 90 W PSE, drawing power across all four pairs. The contractor needs to confirm UK regulatory compliance under BS 7671:2018+A4:2026 from 15 April 2026. What is the binding cap?',
    options: [
      '100 W per device — common industry figure.',
      'IEEE 802.3bt allows up to 960 mA per pair theoretically; that is the regulatory cap.',
      '750 mA per conductor (BS 7671 §716.523.2.101) AND 750 mA per contact at the connector (§716.526.101). The IEEE 802.3bt theoretical pair maximum is academic — the BS 7671 regulatory cap of 750 mA per conductor governs UK installations from 15 April 2026, and the PSE / cable / connector chain must respect it. Type 4 PoE++ at 90 W PSE / 71.3 W PD is the IEEE Type ceiling but the design current per conductor must not exceed 750 mA.',
      '500 mA per pair under all conditions.',
    ],
    correctIndex: 2,
    explanation:
      'The BS 7671 regulatory ceiling for ELV DC distribution over balanced ICT cabling is 750 mA per conductor (§716.523.2.101 verbatim) and 750 mA per contact at the connector (§716.526.101 verbatim). These are HARD caps — not guidelines. The IEEE 802.3bt Type 4 spec at 90 W PSE / 71.3 W PD is the IEEE Type ceiling, but the BS 7671 design current cap per conductor governs. The PSE must respect the cap; the cable must support it; the connecting hardware must support it. Cite "100 W" or "960 mA per pair" is wrong — neither reflects the UK regulatory position from 15 April 2026.',
  },
  {
    id: 'datacabling-m5s4-selv-pelv',
    question:
      'BS 7671 §716.410.3.3 mandates a specific protective measure for PoE installations. Which is it?',
    options: [
      'Automatic disconnection of supply per §411.',
      'Double or reinforced insulation per §412.',
      'Extra-low voltage provided by SELV or PELV — the ELV protective measure shall be applied (§716.410.3.3 verbatim). PSE equipment must be SELV or PELV and the ELV protective measure must apply throughout the cabling.',
      'Electrical separation per §413.',
    ],
    correctIndex: 2,
    explanation:
      '§716.410.3.3 reads: "The protective measure extra-low voltage provided by SELV or PELV shall be applied." This is mandatory for PoE under BS 7671:2018+A4:2026. SELV (separated extra-low voltage) and PELV (protective extra-low voltage) are the two ELV protective measures defined in §414. The PSE — typically a PoE switch or PoE injector — must be a SELV or PELV source. The cabling carries ELV. The PD is fed from ELV. The mandate connects the IEEE 802.3 PoE family (which is SELV / PELV at the source) to the BS 7671 protective-measure framework.',
  },
  {
    id: 'datacabling-m5s4-special-locations',
    question:
      'A PoE cable run is being designed to carry power to a sensor in a bathroom Zone 1 area, fed from a regulated DC source per §716.414.1.1(b). What does §716.414.3.201 say?',
    options: [
      'Permitted with no extra requirements.',
      'A source for SELV or PELV described in §716.414.1.1(b) — i.e. a §414.3 source not exceeding 60 V DC dry / 15 V DC wet — shall NOT be used for power feeding of ICT cabling that passes through, or serves, special locations described in Sections 701, 702, 703, 706 and 710. Bathrooms (701), swimming pools (702), saunas (703), restrictive conductive locations (706) and medical (710) are restricted. The PSE option of §716.414.1.1(a) — IEEE 802.3 PSE — has different requirements; check the corresponding Section.',
      'Permitted only with double insulation.',
      'Permitted only with shielded cable.',
    ],
    correctIndex: 1,
    explanation:
      '§716.414.3.201 is verbatim: "A source for SELV or PELV described in Regulation 716.414.1.1(b) shall not be used for power feeding of ICT cabling that passes through, or serves, special locations described in Sections 701, 702, 703, 706 and 710." The §414.3 source path (60 V DC dry / 15 V DC wet) is restricted from these special locations. The IEEE 802.3 PSE path (§716.414.1.1(a)) — conforming to BS EN IEC 62368-1 / BS EN 60950-22 — is regulated separately, and the corresponding special-location section (701 for bathrooms, 702 pools, etc.) governs whether ICT cabling can pass through that location at all.',
  },
  {
    id: 'datacabling-m5s4-cable-category',
    question:
      'BS 7671 §716.521.101 lists the cable categories permitted for PoE / ELV DC distribution. Which of these categories is included?',
    options: [
      'Cat 3 (telephone-grade only).',
      'Cat 5, Cat 6, Cat 6A, Cat 7, Cat 7A, Cat 8.1, or Cat 8.2 — or other cables defined in BS EN 50173-1. Cat 5 (the original Cat 5, NOT Cat 5e, was de-rated in earlier amendments and is not part of the §716.521.101 list in some readings — the verbatim DB list is Cat 5, Cat 6, Cat 6A, Cat 7, Cat 7A, Cat 8.1, Cat 8.2). Cat 3 is NOT permitted.',
      'Only Cat 6A.',
      'Only shielded cables.',
    ],
    correctIndex: 1,
    explanation:
      '§716.521.101 reads: "Information and communication technology (ICT) cables used for the distribution of DC power shall comply with Category 5, Category 6, Category 6A, Category 7, Category 7A, Category 8.1 or Category 8.2 or other cables as defined in BS EN 50173-1 by reference to the specifications given in BS EN 50288 series." Cat 3 (the older telephony-grade) is not in the list. Cat 5 IS in the verbatim list — but in modern UK installations Cat 5e is the de facto Cat 5 family and Cat 5 plain is rare. The practical default for new PoE installations is Cat 6A or above. The list includes shielded and unshielded variants; the choice of shielded vs unshielded is governed by EMC and bonding considerations, not by §716.521.101.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What does the BS 7671:2018+A4:2026 §716 scope cover, and from when?',
    options: [
      'Active equipment only.',
      'The distribution of ELV DC power using balanced, information technology cables and accessories primarily designed for data transmission, as specified in BS EN 50173-1, using power feeding sourcing equipment in accordance with BS EN IEC 62368-3. Includes design, erection, and verification. Includes Power over Ethernet systems specified by ISO/IEC/IEEE DIS 8802-3 (2024). Does NOT cover PBX. From 15 April 2026.',
      'Fibre cabling only.',
      'TV antenna systems only.',
    ],
    correctAnswer: 1,
    explanation:
      '§716.1 (verbatim from RAG): "The particular requirements of this section apply to the distribution of ELV DC power using balanced, information technology cables and accessories primarily designed for data transmission, as specified in BS EN 50173-1 using power feeding sourcing equipment in accordance with BS EN IEC 62368-3. Requirements are included for the design, erection, and verification of telecommunications infrastructure for the purpose of both telecommunications and distribution of ELV DC power feeding. In addition, requirements are included for use of existing telecommunications infrastructure for distribution of ELV DC power. The power delivery systems include, but are not restricted to, the Power over Ethernet systems specified by ISO/IEC/IEEE DIS 8802-3 (2024). This section does not apply to the use of cables and accessories for private branch exchange (PBX)."',
  },
  {
    id: 2,
    question:
      'Under BS 7671:2018+A4:2026 §716.414.1.1, what are the two permitted sources of supply for PoE / ELV DC distribution?',
    options: [
      'Any 24 V or 48 V DC source.',
      '(a) Power sourcing equipment (PSE) conforming to BS EN IEC 62368-1 and BS EN 60950-22 in addition to the interoperability requirements of ISO/IEC/IEEE DIS 8802-3:2024; or (b) a source specified in Regulation 414.3, having a voltage not exceeding 60 V ripple-free DC in dry locations and 15 V ripple-free DC in all other locations.',
      'Only IEEE 802.3 PSE.',
      'Only batteries.',
    ],
    correctAnswer: 1,
    explanation:
      '§716.414.1.1 verbatim: "One of the following sources of supply shall be used: (a) power sourcing equipment (PSE) conforming to BS EN IEC 62368-1 and BS EN 60950-22 in addition to the interoperability requirements of ISO/IEC/IEEE DIS 8802-3:2024; or (b) a source specified in Regulation 414.3, having a voltage not exceeding 60 V ripple-free DC in dry locations and 15 V ripple-free DC in all other locations." Three NOTEs follow — covering PELV mitigation in BS EN 50310 / BS IEC 61000-5-2 contexts, the screen/shielding NOT being suitable for limiting LV fault currents, and PELV being particularly appropriate for EMC mitigation across multi-PSE locations or multi-building links.',
  },
  {
    id: 3,
    question:
      'What is the BS 7671 §716.523.2.101 hard cap for load current per conductor in a PoE installation?',
    options: [
      '500 mA.',
      '750 mA per conductor — verbatim: "The load current (design current) in any conductor shall not exceed 750 mA." This is the regulatory ceiling for ELV DC distribution over balanced ICT cabling under BS 7671:2018+A4:2026.',
      '960 mA per pair.',
      '1 A per conductor.',
    ],
    correctAnswer: 1,
    explanation:
      '§716.523.2.101 verbatim: "The load current (design current) in any conductor shall not exceed 750 mA." This is paired with §716.526.101 verbatim: "The connecting hardware used for data cables used to distribute DC power shall comply with BS ISO/IEC 11801-1 and support a continuous operating current of 750 mA per contact." The two together — 750 mA per conductor in the cable, 750 mA per contact at the connector — bound the entire PoE delivery chain. IEEE 802.3bt Type 4 PSE max 90 W / PD max 71.3 W is the IEEE Type ceiling; the BS 7671 cap is the UK regulatory ceiling that governs from 15 April 2026.',
  },
  {
    id: 4,
    question:
      'Which two protective measures does BS 7671 §716.410.3.3 mandate for PoE installations?',
    options: [
      'Automatic disconnection or RCD protection.',
      'Extra-low voltage provided by SELV OR PELV — verbatim: "The protective measure extra-low voltage provided by SELV or PELV shall be applied." Both SELV and PELV are extra-low-voltage protective measures defined in Section 414; PoE PSE equipment must be a SELV or PELV source.',
      'Double insulation only.',
      'Class II equipment only.',
    ],
    correctAnswer: 1,
    explanation:
      '§716.410.3.3 verbatim: "The protective measure extra-low voltage provided by SELV or PELV shall be applied." SELV (separated extra-low voltage) and PELV (protective extra-low voltage) are the two ELV protective measures from Section 414. SELV is fully isolated from earth; PELV is referenced to earth. PoE PSE equipment is typically PELV (the equipment chassis is earthed for EMC and safety). NOTE 3 in §716.414.1.1 makes PELV particularly appropriate for EMC mitigation in multi-PSE locations.',
  },
  {
    id: 5,
    question:
      'Why does BS 7671 §716.523.1.101 NOTE 1 link conductor temperature to data-channel performance?',
    options: [
      'It does not.',
      '"Any temperature rise of the data cables due to the load current they carry, or other causes, will increase the attenuation/insertion loss of the cables. Thus the performance of information transmission channels can be degraded." PoE current heats the conductors; warmer conductors have higher attenuation; channels that pass Class EA cold may not pass under continuous PoE load.',
      'For marketing reasons.',
      'Because PoE is illegal at higher currents.',
    ],
    correctAnswer: 1,
    explanation:
      '§716.523.1.101 NOTE 1 makes the formal regulatory link between PoE thermal management and data-cabling performance. PoE current produces I²R heating in the conductors. Warmer conductors have higher attenuation (per the temperature coefficient of copper resistance and the dielectric loss tangent of the insulation). Higher attenuation means lower insertion-loss margin. A Cat6A channel with comfortable 5 dB margins at 20 °C may have only 1 dB margins at 60 °C inside a tightly bundled, fully-loaded PoE bundle. NOTE 2 cites the bundle-thermal references — PD CLC/TR 50174-99-1, BS ISO/IEC 14763-2, ISO/IEC TS 29125 — for management of multi-cable bundles. TIA TSB-184-A (2017) is the parallel TIA guidance.',
  },
  {
    id: 6,
    question:
      'For a Type 4 PoE++ access point on Cat 6A cable, what is the IEEE 802.3bt PSE / PD power maximum?',
    options: [
      '100 W PSE / 80 W PD.',
      '90 W PSE max / 71.3 W PD max (IEEE 802.3bt Type 4, four-pair power delivery, Class 7 / Class 8). The difference is loss along the cable. Note: this is the IEEE spec; the BS 7671 regulatory cap is 750 mA per conductor (§716.523.2.101) and 750 mA per contact (§716.526.101) — which constrains the PSE / cable / connector chain in UK installations from 15 April 2026.',
      '60 W PSE / 51 W PD.',
      '30 W PSE / 25.5 W PD.',
    ],
    correctAnswer: 1,
    explanation:
      'IEEE 802.3bt Type 4 (four-pair PoE++, also called 4PPoE): PSE max 90 W, PD max 71.3 W. The 18.7 W difference is cable loss across worst-case 100 m channel. Type 4 maps to Class 7 (up to 75 W PD) and Class 8 (up to 71.3 W PD) in the standard. Type 3 is 60 W PSE / 51 W PD (Class 5-6); Type 2 (PoE+) is 30 W PSE / 25.5 W PD (Class 4); Type 1 (original PoE) is 15.4 W PSE / 12.95 W PD (Class 0-3). Never cite "100 W" or "960 mA per pair" — the IEEE spec is 90 W PSE / 71.3 W PD, and the BS 7671 regulatory cap that governs UK installations is 750 mA per conductor / 750 mA per contact.',
  },
  {
    id: 7,
    question:
      'BS 7671 §716.521.101 lists permitted cable categories. Which is the current default for new commercial PoE installations?',
    options: [
      'Cat 3.',
      'Cat 6A — the practical default for new commercial Cat6A office and PoE-everything builds in 2026. §716.521.101 (verbatim) permits Cat 5, Cat 6, Cat 6A, Cat 7, Cat 7A, Cat 8.1 or Cat 8.2 (or other BS EN 50173-1 cables). Cat 6A delivers Class EA performance, supports Type 4 PoE++ thermally with appropriate bundle management, and provides the headroom for 10GBASE-T services.',
      'Cat 1.',
      'Coaxial only.',
    ],
    correctAnswer: 1,
    explanation:
      '§716.521.101 verbatim: "Information and communication technology (ICT) cables used for the distribution of DC power shall comply with Category 5, Category 6, Category 6A, Category 7, Category 7A, Category 8.1 or Category 8.2 or other cables as defined in BS EN 50173-1 by reference to the specifications given in BS EN 50288 series." For new commercial installations in 2026, Cat 6A is the practical default — Class EA performance, headroom for 10GBASE-T, supports Type 4 PoE++ with proper bundle management. Cat 7 / 7A are niche (no TIA equivalent for Cat 7, ISO-only). Cat 8.1 / 8.2 are short-reach data-centre top-of-rack only.',
  },
  {
    id: 8,
    question:
      'Why is "limited-power" (LP) cable rating specifically called out for high-bundle-count PoE installations?',
    options: [
      'Marketing.',
      'LP-rated cable (per UL standards in North America, equivalent EN ratings in Europe) declares a maximum continuous current per conductor that the cable insulation tolerates without overheating. For PoE bundles where many conductors carry sustained current, LP-rated cable is engineered for the thermal load — typically with 23 AWG conductors (Cat6A standard) and insulation rated for the bundle temperature rise. It is the manufacturer-published declaration that the cable can sustain PoE current in bundles, complementing the regulatory caps in BS 7671 §716.523.2.101.',
      'It is required by HMRC.',
      'It is for fibre cables only.',
    ],
    correctAnswer: 1,
    explanation:
      'LP rating is the manufacturer cable declaration that connects directly to PoE thermal management. PoE current at the regulatory cap (750 mA per conductor under §716.523.2.101) produces I²R heating; in a bundle of 24 cables all carrying near-cap current continuously, the bundle interior temperature rise can be substantial. LP-rated cable declares the maximum continuous current per conductor the insulation tolerates without exceeding its rated temperature. Choosing LP-rated cable for high-bundle-count PoE installations — combined with bundle-size limits per BS EN 50174-2 / TIA TSB-184-A and the BS 7671 §716.523.1.101 NOTE 2 references — is how the contractor delivers a PoE installation that does not silently degrade the data channel under sustained load.',
  },
  {
    id: 9,
    question:
      'What does BS 7671 §716.526.101 require of the connecting hardware (RJ45 plugs, keystones, patch panels) on a PoE installation?',
    options: [
      'No specific requirement.',
      'Verbatim: "The connecting hardware used for data cables used to distribute DC power shall comply with BS ISO/IEC 11801-1 and support a continuous operating current of 750 mA per contact. Where connected equipment may be separated under load the connecting hardware shall meet the requirements of the endurance test specified in BS EN 60512-9-3 at the appropriate disconnection load. Also the anticipated number of separations in operation shall not exceed the value specified in the endurance test for the disconnection load."',
      'It must be gold-plated only.',
      'It must be rated to 1 A per contact.',
    ],
    correctAnswer: 1,
    explanation:
      '§716.526.101 verbatim: "The connecting hardware used for data cables used to distribute DC power shall comply with BS ISO/IEC 11801-1 and support a continuous operating current of 750 mA per contact. Where connected equipment may be separated under load the connecting hardware shall meet the requirements of the endurance test specified in BS EN 60512-9-3 at the appropriate disconnection load. Also the anticipated number of separations in operation shall not exceed the value specified in the endurance test for the disconnection load." This is the connector-side companion to the conductor-side 750 mA cap in §716.523.2.101. The endurance-test reference (BS EN 60512-9-3) addresses arc / contact wear under live disconnection — pulling a PoE patch cord under load draws a small DC arc that erodes the contact plating over many disconnections.',
  },
  {
    id: 10,
    question:
      'What does BS 7671 §716.433.1.101 recognise as a suitable means of overcurrent protection for PoE / ELV DC distribution?',
    options: [
      'A 16 A MCB.',
      'Verbatim: "Limitation of current in accordance with BS EN IEC 62368-3:2020 Clause 5.3.1 is recognized as a suitable means of protecting against overcurrent." The PSE current-limiting function — implemented inside the IEEE 802.3 PoE PSE per BS EN IEC 62368-3 Clause 5.3.1 — is recognised as the protection against overcurrent. No separate MCB or fuse is required on the PoE cable run.',
      'A 32 A RCBO.',
      'A 100 mA RCD.',
    ],
    correctAnswer: 1,
    explanation:
      '§716.433.1.101 verbatim: "Limitation of current in accordance with BS EN IEC 62368-3:2020 Clause 5.3.1 is recognized as a suitable means of protecting against overcurrent." The PSE has a built-in current-limiting function — it monitors per-port current and shuts down or limits if a fault occurs. BS EN IEC 62368-3:2020 Clause 5.3.1 specifies how that current limit is implemented. This is the PSE-side overcurrent protection; no separate downstream MCB or fuse is required on the PoE cable. The current-limit function combined with the §716.523.2.101 conductor cap (750 mA) bounds fault current to a level the cable insulation tolerates.',
  },
];

const faqs = [
  {
    question: 'What is the BS 7671 hard cap on PoE current — is it really 750 mA per conductor?',
    answer: (
      <>
        Yes. BS 7671:2018+A4:2026 <strong>§716.523.2.101</strong> reads verbatim: "The load current
        (design current) in any conductor shall not exceed 750 mA." This is the UK regulatory
        ceiling for ELV DC distribution over balanced ICT cabling, paired with{' '}
        <strong>§716.526.101</strong> which requires connecting hardware to support 750 mA per
        contact. The IEEE 802.3bt Type 4 spec at 90 W PSE / 71.3 W PD is the IEEE Type ceiling, but
        the BS 7671 cap governs UK installations from 15 April 2026. The figures "100 W" and "960 mA
        per pair" sometimes seen in older marketing are wrong — the regulatory cap is 750 mA per
        conductor.
      </>
    ),
  },
  {
    question: 'Which sections of BS 7671 are the core PoE references?',
    answer: (
      <>
        <strong>§716</strong> in its entirety — entirely new in BS 7671:2018+A4:2026 (published 15
        April 2026). Key clauses: §716.1 (scope), §716.2 (normative refs), §716.410.3.3 (SELV/PELV
        mandatory), §716.414.1.1 (sources of supply), §716.414.3.201 (special-location restriction),
        §716.433.1.101 (overcurrent — PSE current limit per BS EN IEC 62368-3 Clause 5.3.1),
        §716.521.101 (cable category list), §716.523.1.101 (conductor design current per BS EN
        50173-1), §716.523.2.101 (the 750 mA per conductor cap), and §716.526.101 (750 mA per
        contact at the connector). All quoted verbatim in the section above.
      </>
    ),
  },
  {
    question: 'Which IEEE 802.3 PoE Types are there and what are the figures?',
    answer: (
      <>
        Four IEEE Types: <strong>Type 1</strong> (802.3af, 2003) — 15.4 W PSE / 12.95 W PD, 2-pair,
        Class 0-3. <strong>Type 2</strong> (802.3at, 2009, "PoE+") — 30 W PSE / 25.5 W PD, 2-pair,
        Class 4. <strong>Type 3</strong> (802.3bt, 2018, "PoE++ / 4PPoE") — 60 W PSE / 51 W PD,
        4-pair, Class 5-6. <strong>Type 4</strong> (802.3bt, 2018) — 90 W PSE / 71.3 W PD, 4-pair,
        Class 7-8. Voltage 44-57 V at PSE, 37-57 V at PD (~50 V typical). The BS 7671 §716
        regulatory cap — 750 mA per conductor — applies across all Types in UK installations from 15
        April 2026.
      </>
    ),
  },
  {
    question: 'Are PoE cables allowed in special locations (bathrooms, swimming pools, saunas)?',
    answer: (
      <>
        BS 7671 §716.414.3.201 verbatim: "A source for SELV or PELV described in Regulation
        716.414.1.1(b) shall not be used for power feeding of ICT cabling that passes through, or
        serves, special locations described in Sections 701, 702, 703, 706 and 710." That is — the
        §414.3-source path (60 V DC dry / 15 V DC wet) is restricted from special locations. The
        IEEE 802.3 PSE path (§716.414.1.1(a)) is regulated separately, and the relevant
        special-location section (701 bathrooms, 702 pools, 703 saunas, 706 restrictive conductive
        locations, 710 medical) governs whether ICT cabling can pass through that location. Always
        check the corresponding special-location Section before running PoE cabling through these
        areas.
      </>
    ),
  },
  {
    question: 'What is "LP-rated" cable and when do I need it?',
    answer: (
      <>
        LP (Limited Power) is a manufacturer cable rating that declares the maximum continuous
        current per conductor the cable insulation tolerates without exceeding its rated temperature
        in a specified bundle size and ambient. For high-bundle-count PoE installations — many
        cables in a single bundle each carrying sustained current — LP-rated cable is the
        manufacturer evidence that the cable handles the bundle thermal load. Specify LP-rated cable
        for any installation with continuous PoE Type 3 or Type 4 in bundles greater than ~12
        cables, in elevated ambient (above ceilings, inside enclosed containment), or in
        fully-loaded patch panels. Combined with bundle size limits per BS EN 50174-2 / TIA
        TSB-184-A and the BS 7671 §716.523.1.101 NOTE 2 bundle-management references.
      </>
    ),
  },
  {
    question: 'How does PoE thermal management interact with Class EA channel certification?',
    answer: (
      <>
        BS 7671 §716.523.1.101 NOTE 1 makes the link explicit: "Any temperature rise of the data
        cables due to the load current they carry, or other causes, will increase the
        attenuation/insertion loss of the cables. Thus the performance of information transmission
        channels can be degraded." A Cat6A channel certified to Class EA at room temperature may not
        deliver Class EA inside a tightly-bundled fully-loaded Type 4 PoE bundle. Mitigation: limit
        bundle sizes (BS EN 50174-2 / TIA TSB-184-A), use 23 AWG cable (Cat6A standard), specify
        LP-rated cables, separate bundles physically, certify with comfortable margins (3-5 dB+) at
        install so the channel has headroom under PoE thermal load.
      </>
    ),
  },
];

const DataCablingModule5Section4 = () => {
  const navigate = useNavigate();

  useSEO(
    'Power over Ethernet (PoE) Applications | Data Cabling Module 5.4 | Elec-Mate',
    'PoE under BS 7671:2018+A4:2026 §716 — IEEE 802.3 Types 1-4 (Class 0-8), the 750 mA per conductor regulatory cap, 750 mA per contact at the connector, SELV/PELV mandate, special-location restrictions, the cable category list, LP-rated cable for bundle thermal management, and how PoE current degrades data-channel insertion loss under continuous load.'
  );

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/data-cabling-module-5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 5
          </button>

          <PageHero
            eyebrow="Module 5 · Section 4"
            title="Power over Ethernet (PoE) Applications"
            description="The PoE section. IEEE 802.3 Types 1 through 4, Classes 0 through 8, the BS 7671:2018+A4:2026 §716 regulatory cap of 750 mA per conductor (and 750 mA per contact at the connector), the SELV/PELV mandate, the special-location restrictions, the cable category list, LP-rated cable for bundle thermal management, and how PoE current changes the data-channel performance equation from 15 April 2026."
            tone="yellow"
          />

          <TLDR
            points={[
              'Four IEEE Types. Type 1 (802.3af, 15.4 W PSE / 12.95 W PD, 2-pair); Type 2 / PoE+ (802.3at, 30 W / 25.5 W, 2-pair); Type 3 / PoE++ (802.3bt, 60 W / 51 W, 4-pair); Type 4 / PoE++ (802.3bt, 90 W PSE / 71.3 W PD, 4-pair). Voltage 44-57 V at PSE, ~50 V typical. Never cite "100 W" — that is wrong.',
              'BS 7671:2018+A4:2026 §716 entirely new from 15 April 2026. The hard regulatory caps are §716.523.2.101 (750 mA per conductor in the cable) and §716.526.101 (750 mA per contact at the connector). SELV or PELV mandatory under §716.410.3.3. Cable category list per §716.521.101: Cat 5, 6, 6A, 7, 7A, 8.1, 8.2.',
              'PoE current degrades the data channel. §716.523.1.101 NOTE 1 makes this regulatory: temperature rise from PoE current increases attenuation, which degrades information-transmission performance. Bundle thermal management (BS EN 50174-2, TIA TSB-184-A, PD CLC/TR 50174-99-1, BS ISO/IEC 14763-2, ISO/IEC TS 29125) is the mitigation; LP-rated cable is the manufacturer declaration that the cable handles the bundle load.',
              'Special-location restrictions apply. §716.414.3.201 prohibits the §414.3-source path from cabling that passes through or serves Sections 701 (bathrooms), 702 (pools), 703 (saunas), 706 (restrictive conductive), 710 (medical). Always cross-check the corresponding special-location Section before running PoE through these areas.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify the four IEEE 802.3 PoE Types and their PSE / PD wattage maxima, and state the BS 7671 §716.523.2.101 hard cap of 750 mA per conductor as the binding UK regulatory ceiling',
              'Quote the §716.1 scope and §716.2 normative references, and locate the BS EN 50173-1, BS EN 60512-99-001, BS EN 60512-9-3 references for cable and connector specifications',
              'State the §716.410.3.3 SELV / PELV mandate and the §716.414.1.1 source-of-supply options, including the three NOTEs covering PELV mitigation, screen / shielding limitations, and EMC mitigation',
              'Apply the §716.414.3.201 special-location restriction (Sections 701, 702, 703, 706, 710) and cross-reference to the corresponding special-location Section before running PoE through those areas',
              'Interpret the §716.521.101 cable category list (Cat 5, 6, 6A, 7, 7A, 8.1, 8.2) and pick Cat 6A as the practical 2026 default for commercial PoE',
              'Apply the §716.523.1.101 conductor-design-current rule and link NOTE 1 (temperature rise → attenuation increase → channel degradation) and NOTE 2 (bundle-management references) to the practical install discipline',
              'Apply the §716.526.101 connecting-hardware rule (750 mA per contact, BS EN 60512-9-3 endurance test for live disconnection) and the §716.433.1.101 overcurrent rule (BS EN IEC 62368-3 Clause 5.3.1 PSE current limit)',
              'Specify LP-rated cable, bundle-size limits, and certification margins that deliver a Cat 6A channel which holds Class EA under continuous Type 4 PoE++ thermal load',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>The IEEE 802.3 PoE Types and Classes</ContentEyebrow>

          <ConceptBlock
            title="Four Types, nine Classes — what the active equipment expects"
            plainEnglish="The IEEE 802.3 family defines four PoE Types and nine PoE Classes. A Type is a generation of PoE; a Class is a power level negotiated between the PSE (power sourcing equipment — the switch or injector) and the PD (powered device — the camera, AP, phone, sensor). The PSE delivers; the PD receives. Loss along the cable is why PSE max wattage exceeds PD max wattage. Voltage range is 44-57 V at the PSE and 37-57 V at the PD, ~50 V typical. The IEEE figures are the equipment-side maxima; the BS 7671 §716 regulatory caps (750 mA per conductor, 750 mA per contact) are the UK regulatory maxima from 15 April 2026."
            onSite="On site, the PoE power budget design starts with the PD count and Type, sums the PSE wattage required, sizes the PSE (typically a managed PoE switch with a rated PoE budget), and verifies the cable category and bundle thermal management against §716. A 24-port Type 4 switch needs roughly 24 × 90 W = 2160 W of PSE budget — most managed PoE switches publish a PSE budget that is less than 24 × 90 W, so not all ports can deliver Type 4 simultaneously. The contractor checks the published PSE budget against the foreseeable PD load."
          >
            <p>The four Types in detail:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>Type 1 — IEEE 802.3af (2003), original PoE.</strong> 15.4 W PSE max / 12.95
                W PD max. 2-pair power delivery. Classes 0-3. Voltage 44-57 V at PSE. Used
                historically for IP phones, basic IP cameras, low-power APs. Still widely deployed.
              </li>
              <li>
                <strong>Type 2 — IEEE 802.3at (2009), PoE+.</strong> 30 W PSE max / 25.5 W PD max.
                2-pair power delivery. Class 4. Voltage 44-57 V at PSE. Used for higher-power APs,
                video phones, larger IP cameras. The first generation that handles small PoE-powered
                LED lighting clusters.
              </li>
              <li>
                <strong>Type 3 — IEEE 802.3bt (2018), PoE++ (4PPoE).</strong> 60 W PSE max / 51 W PD
                max. 4-pair power delivery (this is the key change — using all four pairs halves the
                per-conductor current at a given total wattage). Classes 5-6. Voltage 50-57 V at
                PSE. Used for high-density APs, PTZ cameras, larger LED lighting,
                building-automation gateways.
              </li>
              <li>
                <strong>Type 4 — IEEE 802.3bt (2018), PoE++.</strong>{' '}
                <strong>90 W PSE max / 71.3 W PD max.</strong> 4-pair power delivery. Classes 7-8.
                Voltage 50-57 V at PSE. The current ceiling. Used for full-stack PoE-LED lighting,
                large displays, building-management hubs, high-density APs in stadium / convention
                environments. Never cite "100 W" — the IEEE 802.3bt Type 4 max is 90 W PSE / 71.3 W
                PD.
              </li>
            </ul>
            <p>
              The Class system inside the Types is how the PSE and PD negotiate power delivery. The
              PD signals its Class during link-up; the PSE provides the corresponding power budget.
              A Class 4 PD on a Type 4 PSE gets only 30 W (the Class 4 ceiling), not 90 W — the PSE
              caps at the Class. This is why a "Type 4 PSE" gives flexibility to power any Class up
              to 8.
            </p>
          </ConceptBlock>

          <AppendixTable
            caption="IEEE 802.3 PoE Types and Classes — verified figures"
            source="IEEE 802.3af · 802.3at · 802.3bt — paired with BS 7671:2018+A4:2026 §716 regulatory caps"
            headers={['PoE generation', 'Standard', 'Type', 'Class', 'PSE max', 'PD max', 'Pairs']}
            rows={[
              ['PoE', '802.3af (2003)', '1', '0-3', '15.4 W', '12.95 W', '2'],
              ['PoE+', '802.3at (2009)', '2', '4', '30 W', '25.5 W', '2'],
              ['PoE++ (4PPoE)', '802.3bt (2018)', '3', '5-6', '60 W', '51 W', '4'],
              ['PoE++ (4PPoE)', '802.3bt (2018)', '4', '7-8', '90 W', '71.3 W', '4'],
            ]}
            notes="Voltage 44-57 V at PSE, 37-57 V at PD; ~50 V typical. The IEEE figures are the equipment-side maxima. The BS 7671 §716 regulatory caps that govern UK installations from 15 April 2026 are 750 mA per conductor (§716.523.2.101) AND 750 mA per contact at the connector (§716.526.101). NEVER cite 100 W or 960 mA per pair — both are wrong. The IEEE theoretical maximum per pair is academic; the regulatory cap is the binding UK ceiling."
          />

          {/* PoE four-pair delivery diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Type 4 PoE++ four-pair power delivery — and the §716 regulatory caps
            </h4>
            <svg
              viewBox="0 0 880 720"
              className="w-full h-auto"
              role="img"
              aria-label="Type 1 versus Type 4 PoE comparison. The upper diagram shows Type 1 PoE delivering up to 15.4 W from the switch using only 2 of the 4 pairs, with the other 2 pairs idle. The lower diagram shows Type 4 PoE plus plus delivering up to 90 W from the switch using all 4 pairs, with current arrows showing DC flow toward the powered device. The BS 7671 §716.523.2.101 cap of 750 mA per conductor and the §716.526.101 cap of 750 mA per contact at the connector are labelled as the UK regulatory maxima from 15 April 2026. The powered device receives a maximum of 71.3 W after cable losses."
            >
              {/* ============================================== */}
              {/* TOP: TYPE 1 PoE (2-pair)                       */}
              {/* ============================================== */}

              <text
                x="60"
                y="32"
                fill="#BBF7D0"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.06em"
              >
                TYPE 1 PoE — 2-pair power · ≤ 15.4 W from PSE · IEEE 802.3af
              </text>

              {/* PSE box (Type 1) */}
              <rect
                x="40"
                y="74"
                width="100"
                height="80"
                rx="10"
                fill="rgba(34,197,94,0.18)"
                stroke="#22C55E"
                strokeWidth="1.6"
              />
              <text
                x="90"
                y="100"
                textAnchor="middle"
                fill="#BBF7D0"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui"
              >
                PSE
              </text>
              <text
                x="90"
                y="118"
                textAnchor="middle"
                fill="#DCFCE7"
                fontSize="10"
                fontFamily="system-ui"
              >
                switch
              </text>
              <text
                x="90"
                y="136"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="10"
                fontWeight="700"
                fontFamily="system-ui"
              >
                ≤ 15.4 W
              </text>

              {/* RJ45 left */}
              <rect
                x="150"
                y="84"
                width="30"
                height="60"
                rx="3"
                fill="rgba(252,211,77,0.20)"
                stroke="#FACC15"
                strokeWidth="1.4"
              />

              {/* Pairs (Type 1: pair 1 active, pair 2 active, pair 3 + 4 idle) */}
              <line x1="180" y1="92" x2="700" y2="92" stroke="#F97316" strokeWidth="2.4" />
              <line x1="180" y1="100" x2="700" y2="100" stroke="#FED7AA" strokeWidth="2.4" />
              <line x1="180" y1="108" x2="700" y2="108" stroke="#22C55E" strokeWidth="2.4" />
              <line x1="180" y1="116" x2="700" y2="116" stroke="#BBF7D0" strokeWidth="2.4" />
              {/* Pair 3 + 4 idle (greyed) */}
              <line
                x1="180"
                y1="128"
                x2="700"
                y2="128"
                stroke="rgba(156,163,175,0.45)"
                strokeWidth="2"
                strokeDasharray="4 3"
              />
              <line
                x1="180"
                y1="136"
                x2="700"
                y2="136"
                stroke="rgba(156,163,175,0.45)"
                strokeWidth="2"
                strokeDasharray="4 3"
              />
              <line
                x1="180"
                y1="148"
                x2="700"
                y2="148"
                stroke="rgba(156,163,175,0.45)"
                strokeWidth="2"
                strokeDasharray="4 3"
              />
              <line
                x1="180"
                y1="156"
                x2="700"
                y2="156"
                stroke="rgba(156,163,175,0.45)"
                strokeWidth="2"
                strokeDasharray="4 3"
              />

              {/* Current-direction arrow (above pair 1) */}
              <line x1="320" y1="76" x2="560" y2="76" stroke="#FACC15" strokeWidth="1.4" />
              <polygon points="560,72 568,76 560,80" fill="#FACC15" />
              <text
                x="440"
                y="70"
                textAnchor="middle"
                fill="#FACC15"
                fontSize="9.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                DC current →
              </text>

              {/* RJ45 right */}
              <rect
                x="700"
                y="84"
                width="30"
                height="60"
                rx="3"
                fill="rgba(252,211,77,0.20)"
                stroke="#FACC15"
                strokeWidth="1.4"
              />

              {/* PD box (Type 1) */}
              <rect
                x="740"
                y="74"
                width="100"
                height="80"
                rx="10"
                fill="rgba(168,85,247,0.18)"
                stroke="#A855F7"
                strokeWidth="1.6"
              />
              <text
                x="790"
                y="100"
                textAnchor="middle"
                fill="#E9D5FF"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui"
              >
                PD
              </text>
              <text
                x="790"
                y="118"
                textAnchor="middle"
                fill="#F3E8FF"
                fontSize="10"
                fontFamily="system-ui"
              >
                VoIP / sensor
              </text>
              <text
                x="790"
                y="136"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="10"
                fontWeight="700"
                fontFamily="system-ui"
              >
                ≤ 12.95 W
              </text>

              {/* Pair-function row (below pairs) — small boxed pair labels in dedicated row */}
              <rect
                x="200"
                y="172"
                width="80"
                height="20"
                rx="3"
                fill="rgba(249,115,22,0.18)"
                stroke="#F97316"
                strokeWidth="1.2"
              />
              <text
                x="240"
                y="186"
                textAnchor="middle"
                fill="#FED7AA"
                fontSize="10"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Pair 1 — active
              </text>

              <rect
                x="290"
                y="172"
                width="80"
                height="20"
                rx="3"
                fill="rgba(34,197,94,0.18)"
                stroke="#22C55E"
                strokeWidth="1.2"
              />
              <text
                x="330"
                y="186"
                textAnchor="middle"
                fill="#BBF7D0"
                fontSize="10"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Pair 2 — active
              </text>

              <rect
                x="380"
                y="172"
                width="80"
                height="20"
                rx="3"
                fill="rgba(156,163,175,0.18)"
                stroke="rgba(156,163,175,0.50)"
                strokeWidth="1.2"
                strokeDasharray="3 2"
              />
              <text
                x="420"
                y="186"
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="10"
                fontStyle="italic"
                fontFamily="system-ui"
              >
                Pair 3 — idle
              </text>

              <rect
                x="470"
                y="172"
                width="80"
                height="20"
                rx="3"
                fill="rgba(156,163,175,0.18)"
                stroke="rgba(156,163,175,0.50)"
                strokeWidth="1.2"
                strokeDasharray="3 2"
              />
              <text
                x="510"
                y="186"
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="10"
                fontStyle="italic"
                fontFamily="system-ui"
              >
                Pair 4 — idle
              </text>

              <text x="600" y="186" fill="#FDE68A" fontSize="10" fontFamily="system-ui">
                power + data on 1 + 2 only
              </text>

              {/* ============================================== */}
              {/* BOTTOM: TYPE 4 PoE (4-pair)                    */}
              {/* ============================================== */}

              <line
                x1="40"
                y1="226"
                x2="840"
                y2="226"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
              />

              <text
                x="60"
                y="252"
                fill="#FDE68A"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.06em"
              >
                TYPE 4 PoE++ — 4-pair power · ≤ 90 W from PSE · IEEE 802.3bt
              </text>

              {/* PSE box (Type 4) */}
              <rect
                x="40"
                y="294"
                width="100"
                height="80"
                rx="10"
                fill="rgba(34,197,94,0.18)"
                stroke="#22C55E"
                strokeWidth="1.6"
              />
              <text
                x="90"
                y="320"
                textAnchor="middle"
                fill="#BBF7D0"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui"
              >
                PSE
              </text>
              <text
                x="90"
                y="338"
                textAnchor="middle"
                fill="#DCFCE7"
                fontSize="10"
                fontFamily="system-ui"
              >
                switch
              </text>
              <text
                x="90"
                y="356"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="10"
                fontWeight="700"
                fontFamily="system-ui"
              >
                ≤ 90 W · ~50 V
              </text>

              {/* RJ45 left */}
              <rect
                x="150"
                y="304"
                width="30"
                height="60"
                rx="3"
                fill="rgba(252,211,77,0.20)"
                stroke="#FACC15"
                strokeWidth="1.4"
              />

              {/* All four pairs active */}
              <line x1="180" y1="312" x2="700" y2="312" stroke="#F97316" strokeWidth="2.4" />
              <line x1="180" y1="320" x2="700" y2="320" stroke="#FED7AA" strokeWidth="2.4" />
              <line x1="180" y1="328" x2="700" y2="328" stroke="#22C55E" strokeWidth="2.4" />
              <line x1="180" y1="336" x2="700" y2="336" stroke="#BBF7D0" strokeWidth="2.4" />
              <line x1="180" y1="348" x2="700" y2="348" stroke="#3B82F6" strokeWidth="2.4" />
              <line x1="180" y1="356" x2="700" y2="356" stroke="#BFDBFE" strokeWidth="2.4" />
              <line x1="180" y1="368" x2="700" y2="368" stroke="#A16207" strokeWidth="2.4" />
              <line x1="180" y1="376" x2="700" y2="376" stroke="#D6BCFA" strokeWidth="2.4" />

              {/* Current-direction arrow (above pair 1) */}
              <line x1="320" y1="270" x2="560" y2="270" stroke="#FACC15" strokeWidth="1.4" />
              <polygon points="560,266 568,270 560,274" fill="#FACC15" />
              <text
                x="440"
                y="264"
                textAnchor="middle"
                fill="#FACC15"
                fontSize="9.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                DC current → all 4 pairs share
              </text>

              {/* RJ45 right */}
              <rect
                x="700"
                y="304"
                width="30"
                height="60"
                rx="3"
                fill="rgba(252,211,77,0.20)"
                stroke="#FACC15"
                strokeWidth="1.4"
              />

              {/* PD box (Type 4) */}
              <rect
                x="740"
                y="294"
                width="100"
                height="80"
                rx="10"
                fill="rgba(168,85,247,0.18)"
                stroke="#A855F7"
                strokeWidth="1.6"
              />
              <text
                x="790"
                y="320"
                textAnchor="middle"
                fill="#E9D5FF"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui"
              >
                PD
              </text>
              <text
                x="790"
                y="338"
                textAnchor="middle"
                fill="#F3E8FF"
                fontSize="10"
                fontFamily="system-ui"
              >
                AP / camera
              </text>
              <text
                x="790"
                y="356"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="10"
                fontWeight="700"
                fontFamily="system-ui"
              >
                ≤ 71.3 W
              </text>

              {/* Pair-function row (below pairs) — boxed pair labels */}
              <rect
                x="200"
                y="392"
                width="80"
                height="20"
                rx="3"
                fill="rgba(249,115,22,0.18)"
                stroke="#F97316"
                strokeWidth="1.2"
              />
              <text
                x="240"
                y="406"
                textAnchor="middle"
                fill="#FED7AA"
                fontSize="10"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Pair 1 — active
              </text>

              <rect
                x="290"
                y="392"
                width="80"
                height="20"
                rx="3"
                fill="rgba(34,197,94,0.18)"
                stroke="#22C55E"
                strokeWidth="1.2"
              />
              <text
                x="330"
                y="406"
                textAnchor="middle"
                fill="#BBF7D0"
                fontSize="10"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Pair 2 — active
              </text>

              <rect
                x="380"
                y="392"
                width="80"
                height="20"
                rx="3"
                fill="rgba(59,130,246,0.18)"
                stroke="#3B82F6"
                strokeWidth="1.2"
              />
              <text
                x="420"
                y="406"
                textAnchor="middle"
                fill="#BFDBFE"
                fontSize="10"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Pair 3 — active
              </text>

              <rect
                x="470"
                y="392"
                width="80"
                height="20"
                rx="3"
                fill="rgba(161,98,7,0.30)"
                stroke="#A16207"
                strokeWidth="1.2"
              />
              <text
                x="510"
                y="406"
                textAnchor="middle"
                fill="#D6BCFA"
                fontSize="10"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Pair 4 — active
              </text>

              <text x="600" y="406" fill="#FDE68A" fontSize="10" fontFamily="system-ui">
                power + data on ALL 4 — current shared
              </text>

              {/* ============================================== */}
              {/* §716 CAPS PANEL                                */}
              {/* ============================================== */}
              <rect
                x="40"
                y="424"
                width="800"
                height="80"
                rx="10"
                fill="rgba(252,211,77,0.06)"
                stroke="rgba(252,211,77,0.30)"
                strokeWidth="1.4"
              />
              <text
                x="60"
                y="448"
                fill="#FDE68A"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.08em"
              >
                UK §716 REGULATORY CAPS — both binding from 15 April 2026
              </text>

              <text
                x="60"
                y="472"
                fill="#FDE68A"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                §716.523.2.101
              </text>
              <text x="200" y="472" fill="#E5E7EB" fontSize="11" fontFamily="system-ui">
                750 mA per CONDUCTOR — limits resistive heating in cable bundles
              </text>

              <text
                x="60"
                y="494"
                fill="#FDE68A"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                §716.526.101
              </text>
              <text x="200" y="494" fill="#E5E7EB" fontSize="11" fontFamily="system-ui">
                750 mA per CONTACT — every RJ45 plug, keystone and patch-panel port
              </text>

              {/* ============================================== */}
              {/* LEGEND                                         */}
              {/* ============================================== */}
              <rect
                x="40"
                y="524"
                width="800"
                height="180"
                rx="10"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
              />
              <text
                x="60"
                y="548"
                fill="#E5E7EB"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.08em"
              >
                LEGEND
              </text>

              {/* Column 1 */}
              <rect
                x="60"
                y="562"
                width="14"
                height="14"
                rx="3"
                fill="rgba(34,197,94,0.18)"
                stroke="#22C55E"
                strokeWidth="1.4"
              />
              <text x="84" y="574" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                PSE — power sourcing equipment (switch / injector)
              </text>

              <rect
                x="60"
                y="584"
                width="14"
                height="14"
                rx="3"
                fill="rgba(168,85,247,0.18)"
                stroke="#A855F7"
                strokeWidth="1.4"
              />
              <text x="84" y="596" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                PD — powered device (AP, camera, light, sensor)
              </text>

              <line x1="60" y1="616" x2="74" y2="616" stroke="#FACC15" strokeWidth="1.6" />
              <polygon points="74,612 82,616 74,620" fill="#FACC15" />
              <text x="92" y="620" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                DC current direction (PSE → PD)
              </text>

              {/* Column 2 */}
              <line x1="460" y1="568" x2="490" y2="568" stroke="#F97316" strokeWidth="2.4" />
              <text x="498" y="572" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Active pair — carries data + DC power
              </text>

              <line
                x1="460"
                y1="592"
                x2="490"
                y2="592"
                stroke="rgba(156,163,175,0.45)"
                strokeWidth="2"
                strokeDasharray="4 3"
              />
              <text x="498" y="596" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Idle pair — Type 1 only
              </text>

              <line
                x1="60"
                y1="640"
                x2="820"
                y2="640"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
              />

              <text
                x="60"
                y="660"
                fill="#FDE68A"
                fontSize="10"
                fontWeight="700"
                fontFamily="system-ui"
              >
                SELV / PELV mandatory
              </text>
              <text x="220" y="660" fill="#E5E7EB" fontSize="10" fontFamily="system-ui">
                §716.410.3.3 — PSE per BS EN IEC 62368-1 + ISO/IEC/IEEE 8802-3
              </text>

              <text
                x="60"
                y="678"
                fill="#FDE68A"
                fontSize="10"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Cable Cat 5 to 8.2
              </text>
              <text x="220" y="678" fill="#E5E7EB" fontSize="10" fontFamily="system-ui">
                §716.521.101 — Cat 6A is the 2026 commercial default
              </text>

              <text
                x="60"
                y="696"
                fill="#FDE68A"
                fontSize="10"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Special-location ban
              </text>
              <text x="220" y="696" fill="#E5E7EB" fontSize="10" fontFamily="system-ui">
                §716.414.3.201 — §414.3 source not permitted in 701/702/703/706/710
              </text>
            </svg>
          </div>

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>BS 7671:2018+A4:2026 §716 — verbatim</ContentEyebrow>

          <ConceptBlock
            title="The new section that brings PoE inside the wiring regulations"
            plainEnglish="§716 is entirely new in BS 7671:2018+A4:2026, published 15 April 2026. It is the formal regulatory recognition that balanced ICT cabling is now a TWO-FUNCTION asset — a data transmission medium AND an ELV DC power distribution circuit — and that the cabling itself must be designed, installed, and verified against electrical-safety as well as data-performance criteria. The clauses below are quoted verbatim from the BS 7671:2018+A4:2026 RAG."
            onSite="On UK jobs designed from 15 April 2026, every PoE installation is regulated by BS 7671 — not just the active equipment, but the cabling itself. The contractor's standards stack now includes BS EN 50173-1 (cabling performance), BS EN 50174 (install practice), AND BS 7671 §716 for the electrical-safety dimensions of the same job. The hard caps (750 mA per conductor, 750 mA per contact) are the binding regulatory ceilings that Type 4 PoE++ specifically butts up against — Type 4 at 90 W PSE typically draws ~600 mA per conductor across the four pairs, well under 750 mA, but the cap matters because non-spec equipment, fault conditions, and transient peaks must all stay below it."
          >
            <p>The §716 clauses, quoted verbatim:</p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · §716.1 (Scope — verbatim)"
            clause={
              <>
                The particular requirements of this section apply to the distribution of ELV DC
                power using balanced, information technology cables and accessories primarily
                designed for data transmission, as specified in BS EN 50173-1 using power feeding
                sourcing equipment in accordance with BS EN IEC 62368-3. Requirements are included
                for the design, erection, and verification of telecommunications infrastructure for
                the purpose of both telecommunications and distribution of ELV DC power feeding. In
                addition, requirements are included for use of existing telecommunications
                infrastructure for distribution of ELV DC power. The power delivery systems include,
                but are not restricted to, the Power over Ethernet systems specified by ISO/IEC/IEEE
                DIS 8802-3 (2024). This section does not apply to the use of cables and accessories
                for private branch exchange (PBX).
              </>
            }
            meaning="§716 covers the cabling itself, not just the active equipment. From 15 April 2026, every PoE installation in the UK falls under BS 7671 — the cabling is recognised as both a data medium AND an ELV DC distribution circuit. PBX is excluded; everything else (PoE Type 1 through Type 4, ELV DC over balanced cabling for any application) is in scope."
            cite="Verified verbatim from bs7671_regulations.full_text · A4:2026 edition · BS 7671:2018+A4:2026, published 15 April 2026"
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · §716.2 (Normative references — verbatim)"
            clause={
              <>
                The following documents are referred to in the text in such a way that some or all
                of their content constitutes requirements of this document. For dated references,
                only the edition cited applies. For undated references, the latest edition of the
                referenced document (including any amendments) applies.
                <br />
                (a) BS EN 50173-1, Information technology — Generic cabling for customer premises —
                Part 1: General requirements.
                <br />
                (b) BS EN 60512-99-001, Connectors for electronic equipment — Tests and measurements
                — Part 99-001: Test schedule for engaging and separating connectors under electrical
                load — Test 99a: Connectors used in twisted pair communication cabling with remote
                power.
                <br />
                (c) BS EN 60512-9-3, Connectors for electronic equipment — Tests and measurements —
                Part 9-3: Endurance tests — Test 9c: Mechanical operation (engaging/separating) with
                electrical load.
              </>
            }
            meaning="§716 invokes three normative references that bind the cable and connector specification. BS EN 50173-1 is the cabling-performance reference (Cat / Class definitions). The two BS EN 60512 references address connectors under electrical load — specifically, the endurance test for engaging and separating RJ45 connectors while PoE current is flowing. This is the regulatory recognition that pulling a PoE patch cord under load draws a small DC arc that erodes the contact plating, and that connector hardware must be tested for it."
            cite="Verified verbatim from bs7671_regulations.full_text · A4:2026 edition"
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · §716.410.3.3 (SELV/PELV — verbatim)"
            clause={
              <>
                The protective measure extra-low voltage provided by SELV or PELV shall be applied.
              </>
            }
            meaning="The single short clause that anchors the entire PoE protective-measure framework. PoE PSE equipment must be a SELV or PELV source. The cabling carries ELV. The PD is fed from ELV. SELV is fully isolated from earth; PELV is referenced to earth. PoE PSE is typically PELV (the equipment chassis is earthed for EMC). From 15 April 2026, the SELV/PELV mandate is regulatory, not a recommendation."
            cite="Verified verbatim from bs7671_regulations.full_text · A4:2026 edition"
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · §716.414.1.1 (Sources of supply — verbatim including NOTEs)"
            clause={
              <>
                One of the following sources of supply shall be used:
                <br />
                (a) power sourcing equipment (PSE) conforming to BS EN IEC 62368-1 and BS EN
                60950-22 in addition to the interoperability requirements of ISO/IEC/IEEE DIS
                8802-3:2024; or
                <br />
                (b) a source specified in Regulation 414.3, having a voltage not exceeding 60 V
                ripple-free DC in dry locations and 15 V ripple-free DC in all other locations.
                <br />
                NOTE 1: Where PELV is used mitigation measures may be required to limit the sharing
                of LV fault currents in accordance with BS EN 50310 and BS IEC 61000-5-2.
                Exposed-conductive-parts of ELV DC power equipment (such as PoE switches or
                converters) can be connected by a protective conductor to the main earthing
                terminal.
                <br />
                NOTE 2: The screen/shielding of the communications cabling provides functional
                earthing and it is not suitable for limiting the sharing of LV fault currents.
                <br />
                NOTE 3: The protective measure PELV is particularly appropriate where functional
                equipotential bonding is used as an EMC mitigation measure, for example, where many
                power sourcing circuits and equipment are installed in the same location, or where
                equipment is linked together from several buildings.
              </>
            }
            meaning="Two source options for PoE / ELV DC distribution. Option (a) — IEEE 802.3 PSE conforming to BS EN IEC 62368-1 / BS EN 60950-22 — is the dominant path for any commercial PoE switch or injector. Option (b) — a §414.3 source up to 60 V DC dry / 15 V DC wet — is a transformer-isolated DC supply for non-PoE ELV DC distribution. NOTE 1 ties multi-PSE PELV installations to BS EN 50310 / BS IEC 61000-5-2 for fault-current sharing. NOTE 2 explicitly says the cable screen IS functional earthing only — NOT a fault-current path. NOTE 3 makes PELV the natural choice for EMC mitigation in dense PoE environments."
            cite="Verified verbatim from bs7671_regulations.full_text · A4:2026 edition · including NOTEs 1, 2, 3"
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · §716.414.3.201 (Special-location restriction — verbatim)"
            clause={
              <>
                A source for SELV or PELV described in Regulation 716.414.1.1 (b) shall not be used
                for power feeding of ICT cabling that passes through, or serves, special locations
                described in Sections 701, 702, 703, 706 and 710.
              </>
            }
            meaning="The §414.3-source path (60 V DC dry / 15 V DC wet) is restricted from cabling that passes through or serves: §701 (locations containing a bath or shower), §702 (swimming pools and other basins), §703 (rooms and cabins containing sauna heaters), §706 (restrictive conductive locations), §710 (medical locations). The IEEE 802.3 PSE path (716.414.1.1(a)) is regulated separately, and the relevant special-location Section governs whether ICT cabling can pass through that location at all. Always cross-check the corresponding special-location Section before running PoE cabling through these areas."
            cite="Verified verbatim from bs7671_regulations.full_text · A4:2026 edition"
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The 750 mA caps and bundle thermal management</ContentEyebrow>

          <ConceptBlock
            title="The two regulatory ceilings every PoE design must respect"
            plainEnglish="The hard regulatory caps in BS 7671:2018+A4:2026 §716 are 750 mA per conductor in the cable (§716.523.2.101) AND 750 mA per contact at the connector (§716.526.101). Both are binding from 15 April 2026 in UK installations. They are paired with §716.523.1.101 NOTE 1 (temperature rise from PoE current degrades data-channel attenuation) and NOTE 2 (bundle-thermal management references — PD CLC/TR 50174-99-1, BS ISO/IEC 14763-2, ISO/IEC TS 29125). And with §716.433.1.101 (PSE current limit per BS EN IEC 62368-3 Clause 5.3.1 is recognised overcurrent protection)."
            onSite="On site, the design discipline is: (1) check the PD load and Type, (2) confirm the PSE budget and current limit conform to §716.433.1.101, (3) confirm the cable category is in the §716.521.101 list, (4) calculate the per-conductor current under worst-case load, confirm ≤ 750 mA, (5) check connecting hardware is rated 750 mA per contact (most modern Cat 6A connecting hardware is, but verify), (6) plan bundle sizes and thermal management per BS EN 50174-2 / TIA TSB-184-A and the §716.523.1.101 NOTE 2 references — including LP-rated cable for high-bundle-count installations, bundle-size limits, physical separation between bundles, certifier output with comfortable margins, special-location cross-checks per §716.414.3.201."
          >
            <p>The five clauses that bound the design — quoted verbatim:</p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · §716.433.1.101 (Overcurrent — verbatim)"
            clause={
              <>
                Limitation of current in accordance with BS EN IEC 62368-3:2020 Clause 5.3.1 is
                recognized as a suitable means of protecting against overcurrent.
              </>
            }
            meaning="The PSE current-limiting function — implemented inside the IEEE 802.3 PoE PSE per BS EN IEC 62368-3:2020 Clause 5.3.1 — is recognised as the protection against overcurrent. No separate downstream MCB or fuse is required on the PoE cable. The current-limit function combined with the §716.523.2.101 conductor cap (750 mA) bounds fault current to a level the cable insulation tolerates."
            cite="Verified verbatim from bs7671_regulations.full_text · A4:2026 edition"
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · §716.521.101 (Cable category — verbatim)"
            clause={
              <>
                Information and communication technology (ICT) cables used for the distribution of
                DC power shall comply with Category 5, Category 6, Category 6A, Category 7, Category
                7A, Category 8.1 or Category 8.2 or other cables as defined in BS EN 50173-1 by
                reference to the specifications given in BS EN 50288 series.
              </>
            }
            meaning="The permitted cable categories for PoE / ELV DC distribution. Cat 6A is the practical default for new commercial installations. Cat 7 / 7A are niche (no TIA equivalent for Cat 7). Cat 8.1 / 8.2 are short-reach data-centre top-of-rack only. The list is binding — Cat 3 (telephony grade) is NOT permitted for PoE under §716. Practical reading: pick Cat 6A or above for any new PoE installation."
            cite="Verified verbatim from bs7671_regulations.full_text · A4:2026 edition"
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · §716.523.1.101 (Conductor design current — verbatim)"
            clause={
              <>
                The design current in any conductor shall not exceed the limit specified in BS EN
                50173-1.
                <br />
                NOTE 1: Any temperature rise of the data cables due to the load current they carry,
                or other causes, will increase the attenuation/insertion loss of the cables. Thus
                the performance of information transmission channels can be degraded.
                <br />
                NOTE 2: Guidance on the effect of the number of loaded conductors, in a multi-cable
                bundle, on the temperature rise of the cables is given in PD CLC/TR 50174-99-1:2015
                and requirements and recommendations in relation to planning and installation of
                such cable bundles are provided in BS ISO/IEC 14763-2 and ISO/IEC TS 29125.
              </>
            }
            meaning="Establishes the conductor-design-current rule via BS EN 50173-1, and links PoE thermal management to data-channel performance. NOTE 1 is the regulatory recognition that PoE current heats the conductors and degrades insertion loss — the same Cat 6A channel that passes Class EA at 20 °C may not pass it inside a fully-loaded PoE bundle at 60 °C. NOTE 2 brings the bundle-management references into the regulatory scope: PD CLC/TR 50174-99-1:2015, BS ISO/IEC 14763-2, ISO/IEC TS 29125 — collectively the bundle-size and thermal-rise guidance. TIA TSB-184-A (2017) is the parallel TIA guidance."
            cite="Verified verbatim from bs7671_regulations.full_text · A4:2026 edition · including NOTEs 1 and 2"
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · §716.523.2.101 (750 mA conductor cap — verbatim)"
            clause={
              <>
                The load current (design current) in any conductor shall not exceed{' '}
                <strong>750 mA</strong>.
              </>
            }
            meaning="THE hard regulatory ceiling. 750 mA per conductor — every conductor of the balanced cabling in a PoE / ELV DC installation. Not 960 mA per pair. Not 1 A per conductor. Not 100 W total. The design current cap is 750 mA per conductor, full stop. Combined with the PSE current limit (§716.433.1.101) and the connector cap (§716.526.101), the entire delivery chain is bounded at 750 mA per conductor / per contact under all design conditions from 15 April 2026."
            cite="Verified verbatim from bs7671_regulations.full_text · A4:2026 edition"
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · §716.526.101 (Connecting hardware — verbatim)"
            clause={
              <>
                The connecting hardware used for data cables used to distribute DC power shall
                comply with BS ISO/IEC 11801-1 and support a continuous operating current of{' '}
                <strong>750 mA per contact</strong>.
                <br />
                Where connected equipment may be separated under load the connecting hardware shall
                meet the requirements of the endurance test specified in BS EN 60512-9-3 at the
                appropriate disconnection load. Also the anticipated number of separations in
                operation shall not exceed the value specified in the endurance test for the
                disconnection load.
              </>
            }
            meaning="The connector-side companion to the 750 mA conductor cap. Every RJ45 plug, keystone, patch panel port — every contact in the entire PoE chain — must support 750 mA continuously. Most modern Cat 6A connecting hardware does, but verify against the manufacturer datasheet, especially for high-density and Cat 7 / Cat 8 hardware. The endurance-test reference (BS EN 60512-9-3) addresses the live-disconnection problem: pulling a PoE patch cord under load draws a small DC arc that erodes the contact plating across many disconnections; the standard requires the connector to be tested for it."
            cite="Verified verbatim from bs7671_regulations.full_text · A4:2026 edition"
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>
            Bundle thermal management — the practical install discipline
          </ContentEyebrow>

          <ConceptBlock
            title="LP-rated cable, bundle-size limits, certification margins"
            plainEnglish="The §716.523.1.101 NOTE 1 link between PoE current, conductor temperature, attenuation, and channel performance is what makes PoE-everything builds harder than data-only Cat 6A jobs. A single PoE Type 4 cable in free air dissipates its I²R heat to the surroundings; a 24-cable bundle in tight containment, all loaded at the regulatory cap, traps that heat. The bundle interior temperature rises; the conductor attenuation rises; the data-channel insertion-loss margin drops. The discipline that delivers a Cat 6A channel which holds Class EA under continuous PoE load combines LP-rated cable, bundle-size limits per BS EN 50174-2 / TIA TSB-184-A, and certification with comfortable margins."
            onSite="On a PoE-everything build (Type 4 lighting + APs + cameras + sensors continuously across many bundles), the contractor's discipline is: (1) specify Cat 6A LP-rated cable, (2) cap bundle sizes per BS EN 50174-2 / TIA TSB-184-A — typical limits 24 cables per bundle for Type 3, 12-18 cables for Type 4 in tight containment, (3) physically separate bundles, (4) avoid stacking bundles inside enclosed containment, (5) certify channels with comfortable 3-5 dB+ NEXT and return-loss margins so the channel has headroom under load, (6) include DC resistance unbalance in the certifier output as a PoE-readiness indicator."
          >
            <p>The bundle-management discipline in detail:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>LP (Limited Power) cable rating.</strong> Manufacturer declaration of
                maximum continuous current per conductor that the cable insulation tolerates without
                exceeding its rated temperature in a specified bundle size and ambient. Specify
                LP-rated cable for any PoE-everything build, and any installation with sustained
                Type 3 / Type 4 in bundles &gt; 12 cables.
              </li>
              <li>
                <strong>Bundle-size limits.</strong> BS EN 50174-2 and TIA TSB-184-A (2017) give the
                manufacturer-specific bundle-size guidance. PD CLC/TR 50174-99-1:2015 (cited in
                §716.523.1.101 NOTE 2) is the EN bundle-thermal reference. Typical practical limits:
                24 cables per bundle for Type 1 / 2; 18 for Type 3; 12-15 for Type 4 in enclosed
                containment.
              </li>
              <li>
                <strong>Physical separation between bundles.</strong> Two 12-cable Type 4 bundles
                separated by 100 mm of free air dissipate heat better than a single 24-cable Type 4
                bundle. Separate bundles physically; do not stack them inside enclosed containment.
              </li>
              <li>
                <strong>Certification with comfortable margins.</strong> Class EA at 20 °C with 5 dB
                NEXT margin survives the 30-40 °C bundle-interior temperature rise of fully-loaded
                Type 4 PoE. Class EA marginal pass (sub-1 dB) at 20 °C does not — under PoE thermal
                load it drifts to fail within months.
              </li>
              <li>
                <strong>DC resistance unbalance check.</strong> Modern certifiers report intra-pair
                (within a pair) and inter-pair (between pairs) DC resistance unbalance. Both are the
                PoE-readiness indicators. Unbalance causes uneven current sharing, uneven heating,
                accelerated insulation ageing.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <CommonMistake
            title="Designing PoE Type 4 to the IEEE 90 W limit and ignoring the BS 7671 §716 750 mA per conductor cap"
            whatHappens={
              <>
                Contractor specifies a high-density Type 4 PoE++ rollout for stadium APs. Reads the
                IEEE 802.3bt spec, notes 90 W PSE / 71.3 W PD across four pairs, buys cable to
                general Cat 6A spec (no LP rating), bundles 24 cables tightly into a single
                containment, installs without bundle thermal modelling. Channel certifies to Class
                EA marginal pass at install. Six months in, under continuous PoE Type 4 load and
                high ambient, the bundle interior reaches 60 °C, the data channels degrade,
                intermittent link failures spread across the AP fleet, and on inspection the
                contractor discovers some conductors are running close to or above 750 mA —
                non-compliant under §716.523.2.101. Remediation: re-design with bundle-size cap,
                LP-rated cable, separate containment, re-certify with comfortable margins.
              </>
            }
            doInstead={
              <>
                Treat BS 7671 §716 as the binding regulatory ceiling, not the IEEE figures. Design
                to: (1) per-conductor design current ≤ 750 mA in worst-case (§716.523.2.101); (2)
                connecting hardware rated 750 mA per contact (§716.526.101); (3) cable category from
                §716.521.101 list — Cat 6A LP-rated for high-bundle PoE; (4) bundle sizes per BS EN
                50174-2 / TIA TSB-184-A / PD CLC/TR 50174-99-1; (5) physical bundle separation; (6)
                certifier output with 3-5 dB+ NEXT and return loss margins; (7) DC resistance
                unbalance reported and within manufacturer tolerances. The IEEE 90 W figure is the
                equipment ceiling; the BS 7671 regulatory cap is what you actually design to from 15
                April 2026.
              </>
            }
          />

          <Scenario
            title="A PoE-LED-lighting installer wants to bond the cable screens to the comms-room earth bar — is this right?"
            situation={
              <>
                A new build with full PoE-LED lighting throughout. The lighting designer specs Cat
                6A shielded cable (S/FTP) running back to a centralised PoE switch. The installer
                asks the electrician to terminate the cable screens onto the comms-room main
                earthing busbar to "ensure a good earth path".
              </>
            }
            whatToDo={
              <>
                Two BS 7671 references govern. (1) §716.414.1.1 NOTE 2 verbatim: "The
                screen/shielding of the communications cabling provides functional earthing and it
                is not suitable for limiting the sharing of LV fault currents." So the screen IS
                functional earthing — bonded to the equipotential bonding network per BS EN 50310
                and §444.5.3.1(a) — but is NOT a protective earth path for fault currents. (2) §545
                (ICT functional earthing — entirely new in A4:2026) governs the functional bonding
                network, the MFET (main functional earthing terminal), and the 2.5 / 4 mm² Cu
                minimum CSAs for functional earthing conductors. The correct termination is screen →
                keystone shield earth → patch panel chassis earth → rack earth → MFET → MET. NOT a
                separate cable from each screen end to the comms-room earth bar — that creates earth
                loops that pump LV fault current through the screens (which is what NOTE 2
                explicitly says they are NOT for). Specify it correctly per §545 / BS EN 50310,
                document it in the BS EN 50174-1 administration record, and cross-check the bonding
                network against the building protective bonding under §444.1.
              </>
            }
            whyItMatters={
              <>
                Screen-bonding errors on shielded PoE installations are one of the most common EMC
                and fault-current problems in commercial buildings. Done wrong, the screens become a
                fault-current path between distant earth points, pumping current that produces
                interference, degrades data, and in extreme cases damages active equipment. Done
                right per §545 + BS EN 50310, the screens are the functional-earth reference for EMC
                mitigation and contribute nothing to the protective-earth fault-current path. The
                §716.414.1.1 NOTE 2 wording is explicit; the §545 framework is new in A4:2026; the
                interaction is exactly where Module 5 PoE work meets Module 6 standards work.
              </>
            }
          />

          <SectionRule />

          <KeyTakeaways
            title="Worth remembering"
            points={[
              'IEEE 802.3 PoE Types 1 (15.4/12.95 W), 2 (30/25.5 W), 3 (60/51 W), 4 (90/71.3 W). Voltage 44-57 V at PSE. Never cite "100 W" — the IEEE Type 4 max is 90 W PSE / 71.3 W PD, four-pair.',
              'BS 7671:2018+A4:2026 §716 entirely new from 15 April 2026. Hard regulatory caps: §716.523.2.101 — 750 mA per conductor in the cable; §716.526.101 — 750 mA per contact at the connector. Both binding on UK installations.',
              'SELV or PELV mandatory under §716.410.3.3. Two source paths under §716.414.1.1: (a) IEEE 802.3 PSE per BS EN IEC 62368-1 / BS EN 60950-22; (b) §414.3 source ≤ 60 V DC dry / 15 V DC wet (restricted from special locations §701, 702, 703, 706, 710 per §716.414.3.201).',
              'Cable category from §716.521.101: Cat 5, 6, 6A, 7, 7A, 8.1, 8.2. Cat 6A is the 2026 commercial default. PSE current limit per BS EN IEC 62368-3 Cl. 5.3.1 (§716.433.1.101) is recognised overcurrent protection — no downstream MCB needed on the cable.',
              'PoE thermal management is regulatory. §716.523.1.101 NOTE 1: temperature rise from PoE current degrades data-channel attenuation. NOTE 2 cites PD CLC/TR 50174-99-1, BS ISO/IEC 14763-2, ISO/IEC TS 29125 for bundle management. LP-rated cable, bundle-size limits per BS EN 50174-2 / TIA TSB-184-A, and certification with comfortable margins are the practical disciplines.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Knowledge check" questions={quizQuestions} />

          {/* Bottom navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 mt-6 border-t border-white/10">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/data-cabling-module-5-section-3')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-5 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13.5px] font-medium touch-manipulation hover:bg-white/[0.1] active:scale-[0.98]"
            >
              <ArrowLeft className="h-4 w-4" /> Previous: Patch cord performance
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/data-cabling-module-5-section-5')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-5 rounded-full bg-elec-yellow text-black text-[13.5px] font-semibold touch-manipulation hover:bg-elec-yellow/90 active:scale-[0.98]"
            >
              Next section: Future-proofing infrastructure
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>
        </PageFrame>
      </div>
    </div>
  );
};

export default DataCablingModule5Section4;
