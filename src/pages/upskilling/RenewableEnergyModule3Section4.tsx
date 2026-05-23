import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
  Pullquote,
  DiagramPlaceholder,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm3s4-iz-isc',
    question:
      'DC cable thermal sizing on the PV side. What\'s the binding inequality, and why?',
    options: [
      'I_z is irrelevant',
      'I_z ≥ I_sc_max — the cable\'s current-carrying capacity at the installed conditions (after grouping, ambient temperature, route reference method corrections) must be at least equal to the string max short-circuit current. Conventional MCB / RCBO protection at the start of the cable doesn\'t cap the string fault current — PV strings can deliver their I_sc_max continuously without "tripping", so the cable must be rated for that current indefinitely',
      'Use any cable — modules limit',
      'I_z = inverter rated current',
    ],
    correctIndex: 1,
    explanation:
      'PV DC cables are sized against I_sc_max (not the load current, not the inverter rated current). A PV string can deliver its I_sc_max continuously — there\'s no upstream protection that caps it (the string fuse, if fitted, is sized above I_sc_max). The cable must carry I_sc_max indefinitely without exceeding its thermal rating. I_z (current-carrying capacity at installed conditions) must be ≥ I_sc_max. The conservative default per Reg 712.433.101.1 — I_sc_max = 1.25 × I_sc_stc — is the sizing input.',
  },
  {
    id: 'm3s4-cable-spec',
    question:
      'PV DC cables — what\'s the standard per Reg 712.521.1041?',
    options: [
      'Standard T&E (twin and earth)',
      'Reg 712.521.1041 permits: (a) single-core cables with non-metallic sheath, for example H1Z2Z2-K cables to BS EN 50618; or (b) insulated single-core conductors in individually insulated conduit or trunking. Additionally: "Cable(s) shall not be placed directly on the surface of the roof". Standard T&E is unsuitable — wrong voltage class, no UV resistance, no double-insulation',
      'Bell wire',
      'Mains cable',
    ],
    correctIndex: 1,
    explanation:
      'Reg 712.521.1041 specifies PV DC cable selection. Option (a): single-core non-metallic-sheath cables like H1Z2Z2-K to BS EN 50618 (the BS 7671-cited standard; BS EN 62930 is the IEC harmonised counterpart). Option (b): insulated single-core conductors in individually insulated conduit or trunking. A specific install constraint: cables shall NOT be placed directly on the roof surface — must be in containment or otherwise protected. Cable design ambient temperature ≥ 70°C for cables under PV modules per Reg 712.523.101. Connectors per Reg 712.526.101 (BS EN 62852:2015+A1:2020).',
  },
  {
    id: 'm3s4-volt-drop',
    question:
      'PV DC cable voltage drop. Industry typical practice limits VD on the DC side to:',
    options: [
      '20% of nominal',
      'Typically 1-3% of V_mp at STC. Lower than AC-side VD limits because PV is in continuous operation and even small VD percentages compound to material yield loss over the install life. The MCS MIS 3002 design pack records the VD calculation; the cable is upsized if the route length pushes VD above the design limit',
      '50% of nominal',
      '0%',
    ],
    correctIndex: 1,
    explanation:
      'PV DC-side voltage drop limit is typically 1-3% of V_mp at STC — significantly tighter than AC-side limits (3-5%). PV operates in continuous current; small VD percentages compound to material yield loss over the install life. The MCS MIS 3002 design pack records the VD calculation (R × I × 2L per string, then converted to percentage of V_mp). Where the route length pushes VD above the design limit, the cable is upsized (4 mm² to 6 mm², or 6 mm² to 10 mm²).',
  },
  {
    id: 'm3s4-gpv-fuses',
    question:
      'Where DC-side overcurrent protective devices are required per Reg 712.431.101, what device types are permitted by Reg 712.432.103?',
    options: [
      'Only standard BS 88 fuses',
      'Reg 712.432.103 permits two categories: (a) gPV fuses per BS EN 60269-6 or fuse-combination units per BS EN 60947-3; OR (b) circuit-breakers per BS EN 60947-2, BS EN 60898-2, or BS IEC 60898-3. The choice depends on the install design — gPV fuses are most common at the combiner box; DC-rated MCBs are used where switching capability is wanted at the device. Both polarities (+ and −) shall be protected per Reg 712.432.101',
      'Just MCBs',
      'No device',
    ],
    correctIndex: 1,
    explanation:
      'Reg 712.432.103 permits four standards for DC-side overcurrent protective devices: BS EN 60269-6 gPV fuses; BS EN 60947-3 fuse-combination units; BS EN 60947-2 circuit-breakers; BS EN 60898-2 / BS IEC 60898-3 (DC-rated MCB) circuit-breakers. The standard chosen reflects the install design — gPV fuses are most common at the combiner box. Reg 712.432.101 requires BOTH polarities protected (+ and −). Reg 712.432.102 explicitly prohibits relying on blocking diodes for overcurrent protection. Rating per Reg 712.432: 1.1 × I_sc_max of string < I_n ≤ I_mod_max_ocer.',
  },
  {
    id: 'm3s4-fire-reg',
    question:
      'BS 7671 Reg 712.421 covers what specific risk on the PV DC side?',
    options: [
      'Customer satisfaction',
      'Protection against fire caused by electrical equipment. PV-specific concerns: DC arc faults (which don\'t self-extinguish like AC arcs at zero-crossing), connector failures (MC4 connectors corroding or poorly seated), and cable insulation breakdown in continuous high-irradiance operation. Mitigation includes cable specification, connector torque, isolator placement, and where applicable rapid-shutdown devices',
      'AC fire only',
      'Battery fire only',
    ],
    correctIndex: 1,
    explanation:
      'Reg 712.421 in Section 712 addresses protection against fire caused by electrical equipment on the DC side. PV-specific fire concerns: (a) DC arc faults — DC arcs don\'t self-extinguish at zero-crossing like AC, so a DC fault can sustain an arc until physically interrupted; (b) MC4 / MC4-compatible connector failures — poorly seated, contaminated, or corroded connectors are the most common arc-fault source; (c) cable insulation degradation under continuous high-temperature operation. Mitigation: BS EN 50618 / BS EN 62930 cable, manufacturer-torque connectors, robust DC isolator placement, and module-level rapid-shutdown where required.',
  },
  {
    id: 'm3s4-mc4',
    question:
      'MC4 / MC4-compatible connectors — what\'s the BS 7671 requirement per Reg 712.526.1 and Reg 712.526.101?',
    options: [
      'Hand-tight is fine',
      'Per Reg 712.526.1: each pair of connectors shall be electrically and mechanically compatible and suitable for the environment — "It is recommended to check with each manufacturer that each pair of connectors be compatible". Per Reg 712.526.101: connectors shall be selected per BS EN 62852:2015+A1:2020. In practice this means using matched-brand pairs (the simplest way to guarantee compatibility), or pairs explicitly certified compatible by both manufacturers. Use manufacturer-specified crimping tool; manufacturer-torque; mechanical test before commissioning',
      'No connector — just bare wire',
      'Solder them',
    ],
    correctIndex: 1,
    explanation:
      'Reg 712.526.1 requires connector pairs to be electrically and mechanically COMPATIBLE — the reg "recommends" checking with each manufacturer. Reg 712.526.101 requires selection per BS EN 62852:2015+A1:2020 (or BS EN 62852). The reg doesn\'t strictly prohibit mixed brands, but mixing brands without manufacturer-certified compatibility creates micro-arcs at the interface (fire risk under Reg 712.421). Matched-brand throughout is the simplest way to evidence compatibility; the cert evidence bundle records connector brand, manufacturer compatibility evidence (if mixed), and crimping tool used. Connectors in user-accessible locations need key/tool isolation per Reg 712.526.101.',
  },
  {
    id: 'm3s4-dc-isolator',
    question:
      'BS 7671 requires a DC isolator on the PV side. Where is it located, and what\'s its purpose?',
    options: [
      'Doesn\'t need one',
      'Between the array DC output and the inverter — typically immediately before the inverter on the inverter\'s DC input side. Purpose: provides electrical isolation between the array (live during daylight, can\'t be de-energised at source) and the inverter for maintenance, fault-finding, and emergency shutdown. The isolator must be rated for the array V_oc_max and I_sc_max, suitable for DC switching under load',
      'On the AC side only',
      'Anywhere',
    ],
    correctIndex: 1,
    explanation:
      'BS 7671 requires a DC isolator between the array DC output and the inverter, typically located immediately before the inverter on its DC input. Critical for safety per Reg 712.410.101: electrical equipment on the DC side shall be considered to be energised even when the AC side is disconnected from the grid or when the inverter is disconnected from the DC side. So the inverter and downstream wiring must be isolatable for maintenance, fault-finding, and emergency shutdown. The isolator must be: (a) rated for the array V_oc_max and I_sc_max; (b) suitable for DC switching under load (DC arcs don\'t self-extinguish); (c) clearly labelled — per Reg 712.514.102 each point of access to DC live parts shall carry a warning notice "SOLAR DC — Live parts can remain energised after isolation".',
  },
  {
    id: 'm3s4-imd',
    question:
      'BS 7671 Reg 712.421.101.1 requires an Insulation Monitoring Device (IMD) on the DC side. What does it do, and what standard does it comply with?',
    options: [
      'No IMD required',
      'An IMD continuously monitors the insulation status on the DC side throughout the PV array life cycle, detecting insulation faults that could otherwise go unnoticed (DC arcs don\'t self-extinguish per Reg 712.421). Reg 712.421.101.1 + Reg 712.538.101 specify the IMD shall comply with BS EN 61557-8. The IMD function may be provided by an inverter with integrated insulation monitoring per BS EN 62109-2',
      'AC only',
      'Customer\'s choice',
    ],
    correctIndex: 1,
    explanation:
      'Reg 712.421.101.1 mandates an Insulation Monitoring Device (IMD) shall be installed to verify insulation status on the DC side throughout the PV array life cycle. The IMD complies with BS EN 61557-8 per Reg 712.538.101. Modern inverters typically have an integrated IMD function compliant with BS EN 62109-2 — the inverter datasheet states this. Where the inverter\'s integrated IMD satisfies the reg, a separate device isn\'t required. This is critical: DC insulation faults don\'t arc-clear at zero-crossing like AC, so undetected DC insulation degradation sustains until physical interruption (fire risk per Reg 712.421). The IMD catches it before it becomes a hazard. Cert evidence bundle records the IMD source (integrated inverter vs separate device) and the BS EN 61557-8 reference.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A PV string has I_sc_stc = 12.5 A. Two strings in parallel (Ns=2). What\'s I_sc_max at the combiner output, used for cable sizing per Reg 712.433.101.1 conservative default?',
    options: [
      '12.5 A',
      'I_sc_max per string = 1.25 × 12.5 = 15.625 A. Combiner output (Ns=2 strings parallel) = 2 × 15.625 = 31.25 A. Cable from combiner to inverter sized for I_z ≥ 31.25 A at installed conditions (after grouping / ambient / reference method corrections). The 1.25 multiplier captures conditions exceeding STC (high irradiance, reflective surroundings, low-temperature high-V cells operating at high I_sc)',
      '5 A',
      '500 A',
    ],
    correctAnswer: 1,
    explanation:
      'Per Reg 712.433.101.1 conservative default: I_sc_max = 1.25 × I_sc_stc per string. For 2 parallel strings on the same combiner output, the combiner output current = 2 × 15.625 = 31.25 A. The cable from combiner to inverter must have I_z ≥ 31.25 A at installed conditions (after BS 7671 Appendix 4 correction factors for grouping, ambient temperature, and reference method). The 1.25 multiplier is the conservative default — calculated values using manufacturer temperature coefficient + site irradiance extremes also acceptable.',
  },
  {
    id: 2,
    question:
      '4 mm² PV DC cable. CCC at 70°C cable operating temperature for reference method E (clipped to surface) = 50 A. Cable installed in conduit in roof void; grouping factor 0.85; ambient temperature 40°C (correction 0.96). What\'s the effective I_z?',
    options: [
      'Same 50 A',
      'I_z = 50 × 0.85 × 0.96 = 40.8 A. After grouping (0.85, multiple cables in same conduit) and ambient (0.96 for 40°C vs reference 30°C), the cable\'s effective current-carrying capacity at the installed conditions is 40.8 A. Compare against I_sc_max of the string set to verify Iz ≥ Isc_max',
      '200 A',
      '5 A',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 Appendix 4 corrections: I_z (installed) = I_z (reference) × C_g × C_a × C_i (grouping × ambient × insulation correction). For 4 mm² PV DC cable: CCC reference 50 A; grouping 0.85; ambient 0.96 → I_z effective = 50 × 0.85 × 0.96 = 40.8 A. If the string set delivers I_sc_max of 31.25 A (from Q1), I_z 40.8 A > 31.25 A — adequate. If I_sc_max exceeded 40.8 A, the cable would need to be upsized to 6 mm² or larger.',
  },
  {
    id: 3,
    question:
      'Single string of 14 modules. V_mp at STC = 34 V per module. I_mp at STC = 11.8 A. DC cable route length = 25 m (one-way). 4 mm² cable, conductor resistance 4.61 mΩ/m. Voltage drop?',
    options: [
      '50 V',
      'VD = 2 × L × R × I = 2 × 25 × 0.00461 × 11.8 = 2.72 V. String V_mp = 14 × 34 = 476 V. VD as percentage = 2.72 / 476 = 0.57%. Within typical 1-3% PV DC limit. Cable size adequate from VD perspective',
      '0 V',
      '500 V',
    ],
    correctAnswer: 1,
    explanation:
      'VD on a PV string = 2 × L × R × I (where L is one-way route length, R is conductor resistance in Ω/m, I is the operating current at the worst case — typically I_mp at STC). For this string: 2 × 25 × 0.00461 × 11.8 = 2.72 V. String V_mp = 14 × 34 = 476 V. VD percentage = 2.72 / 476 = 0.57% — within the typical 1-3% PV DC VD limit. The MCS MIS 3002 design pack records the VD calculation; cable adequate.',
  },
  {
    id: 4,
    question:
      'String fuse selection per Reg 712.431.102. String I_sc_stc = 12.5 A. What fuse rating is appropriate?',
    options: [
      'Same as I_sc = 12.5 A',
      'Per Reg 712.432 rating formula 1.1 × I_sc_max < I_n ≤ I_mod_max_ocer: I_sc_max = 1.25 × 12.5 = 15.625 A; lower bound = 1.1 × 15.625 = 17.2 A; upper bound = module I_mod_max_ocer (typically 15-25 A from datasheet). Practical fuse rating: 20 A gPV per BS EN 60269-6 — sits above the lower bound and at or below the module rating. Devices per Reg 712.432.103 (gPV per BS EN 60269-6, fuse-combination BS EN 60947-3, or DC-rated MCBs per BS EN 60947-2 / 60898-2 / IEC 60898-3); both polarities protected per Reg 712.432.101',
      '0.1 A',
      '500 A',
    ],
    correctAnswer: 1,
    explanation:
      'String-fuse sizing per Reg 712.432 formula: 1.1 × I_sc_max of the string < I_n ≤ I_mod_max_ocer. For I_sc_stc = 12.5 A: I_sc_max = 1.25 × 12.5 = 15.625 A; lower bound = 1.1 × 15.625 = 17.2 A; module I_mod_max_ocer typically 15-25 A from datasheet; practical fuse 20 A gPV per BS EN 60269-6 (Reg 712.432.103). The 1.1 coefficient is a safety margin against untimely operation under normal stress conditions per the reg NOTE; adjusted for special conditions like reflections or specific module technologies. Both polarities protected per Reg 712.432.101.',
  },
  {
    id: 5,
    question:
      'PV install commissioning. The installer notes a slight burning smell from one MC4-compatible connector on the array. Action?',
    options: [
      'Ignore it',
      'IMMEDIATELY isolate. The burning smell indicates connector overheating — typically caused by (a) mixed-brand connectors creating a micro-arc; (b) improper crimping (loose contact); (c) contamination or corrosion. The connector must be replaced before re-energising — failing this risks fire (Reg 712.421). Investigation: identify the affected connector pair, replace both sides with matched-brand correctly-crimped connectors, mechanically test, re-energise and monitor',
      'Tighten harder',
      'Spray water on it',
    ],
    correctAnswer: 1,
    explanation:
      'A burning smell from an MC4-compatible connector is a fire-risk symptom — Reg 712.421 mandates protection against fire caused by electrical equipment on the DC side. The connector is overheating, likely due to mixed-brand or improperly-crimped connection. Replace both sides with matched-brand correctly-crimped connectors using the manufacturer-specified crimping tool. The cert evidence bundle records the rectification.',
  },
  {
    id: 6,
    question:
      'PV DC cable runs from the roof through the loft to the inverter location. The cable runs alongside existing AC mains cables. Any concerns?',
    options: [
      'No concerns',
      'PV DC cable should be segregated from AC mains where reasonably practicable, but BS 7671 doesn\'t prohibit common containment. Practical concerns: (a) thermal interaction — AC cables under load heat the conduit, reducing PV cable CCC (factor in the grouping factor); (b) electromagnetic interference — PV inverter switching can couple into AC cables and vice versa, particularly relevant for low-signal AC circuits (alarm, IT); (c) inspection / maintenance — sharing routes complicates fault-finding. The competent install separates where practicable, applies appropriate grouping factors where common containment used',
      'PV DC must touch AC cables',
      'Cables explode if near each other',
    ],
    correctAnswer: 1,
    explanation:
      'PV DC and AC mains routing — BS 7671 allows common containment but with practical considerations. Thermal interaction reduces effective CCC for the PV cable (factor in the grouping correction). EMI: PV inverter switching can couple into AC cables — typically not an issue for power circuits but can disturb low-signal AC (alarm, IT, comms). Maintenance: shared routes complicate fault-finding. The competent install separates where practicable; where common containment used, the design pack records the applied grouping factor and the calculation.',
  },
  {
    id: 7,
    question:
      'PV DC isolator failure during commissioning — the isolator can\'t be closed under load (DC arc when attempting). Diagnosis?',
    options: [
      'Use a hammer',
      'Most likely (a) isolator not rated for the array V_oc_max or I_sc_max — wrong-spec isolator; (b) isolator manufactured for AC use, not DC (DC switching capability missing or inadequate); (c) isolator contacts pitted from prior fault clearing. The honest response: STOP, identify the correct DC isolator rating (V_oc_max + I_sc_max + DC switching capability), substitute, retest. The cert evidence bundle records the isolator brand, model, and ratings',
      'Force it closed',
      'Skip the isolator',
    ],
    correctAnswer: 1,
    explanation:
      'PV DC isolator failure is most commonly the wrong-spec isolator. Required: rated for the array V_oc_max (typically 1.5 kV DC), I_sc_max (typically 30+ A), and explicit DC switching capability under load (BS EN 60947-3 utilisation category DC-21 or equivalent). AC-only isolators are NOT interchangeable — DC arcs don\'t self-extinguish at zero-crossing. The cert evidence bundle records the isolator brand, model, V_oc_max rating, I_sc_max rating, and utilisation category.',
  },
  {
    id: 8,
    question:
      'The PWI common-mistakes list flags four high-frequency DC-side faults on UK PV installs. What are they?',
    options: [
      'None',
      '(1) Mixing MC4 connector brands creating micro-arc / fire risk; (2) Improper crimping (wrong tool, loose contact, overheating); (3) Under-sized DC cable not meeting I_z ≥ I_sc_max with installed-conditions corrections; (4) AC-only isolator substituted for DC isolator without DC switching capability. Each is a high-frequency MCS audit finding and a Reg 712.421 fire-risk concern',
      'Customer satisfaction',
      'Module colour',
    ],
    correctAnswer: 1,
    explanation:
      'PWI common-mistakes on UK PV DC side: (1) Mixing MC4 brands — micro-arc / fire; (2) Improper crimping — overheating connector / fire; (3) Under-sized DC cable — thermal overload, insulation breakdown, fire; (4) AC-only isolator — can\'t break DC under load, fault-finding hazard. Each is a Reg 712.421 fire-risk concern and a high-frequency MCS audit finding. The competent install avoids all four by following BS EN 50618 / 62930 + BS EN 60269-6 + manufacturer-specified tools.',
  },
];

const faqs = [
  {
    question: 'Why is PV DC cable sized differently from AC mains cable?',
    answer:
      'Three reasons: (1) Source characteristics — a PV string is a current-limited source that can deliver its I_sc_max continuously without upstream protection capping it (unlike an AC load circuit, where the MCB / RCBO at the source limits sustained overcurrent); (2) Voltage class — typical UK domestic PV array V_oc_max is 400-800 V DC, AC mains is 230 V — cable insulation must be rated 1.5 kV DC for PV; (3) Environmental — PV cables on the roof experience UV, temperature swings, and continuous current — BS EN 50618 / BS EN 62930 cable is specified, not standard PVC.',
  },
  {
    question: 'What\'s the difference between BS EN 50618 and BS EN 62930?',
    answer:
      'BS EN 50618 (H1Z2Z2-K cable) is the standard cited by BS 7671:2018+A4:2026 Reg 712.521.1041 — the operational UK reference. BS EN 62930 is the IEC harmonised counterpart, with the same fundamental requirements (single-core, double-insulated, UV-resistant, halogen-free, 1.5 kV DC, 90°C continuous), used internationally. Manufacturers typically certify against both. For UK MCS compliance, BS EN 50618 is the citation expected in the MCS MIS 3002 design pack; BS EN 62930-certified cable is acceptable where it also meets BS EN 50618.',
  },
  {
    question: 'How does the DC voltage drop limit interact with cable cost?',
    answer:
      'Tighter VD limit → larger conductor → higher cable cost. UK domestic PV typically targets 1-3% VD on the DC side. For typical roof-to-inverter routes (15-30 m), 4 mm² PV DC cable usually achieves this on standard array sizes; longer routes (35-50 m) may require 6 mm² or 10 mm². The MCS MIS 3002 design pack records the VD calculation and the cable size choice. The trade-off is cable cost vs the present-value of yield gained from lower VD over the install life.',
  },
  {
    question: 'Where does the DC isolator go physically?',
    answer:
      'BS 7671 Section 712 requires a DC isolator between the array and the inverter. Common locations: (a) immediately before the inverter on the inverter\'s DC input side (typical for inverter-integrated DC isolator on modern string inverters); (b) on a roof-mounted combiner box for arrays where the inverter is in the loft / garage / outdoor enclosure; (c) on a wall-mounted combiner box adjacent to the inverter. Whichever location, the isolator must be: (i) accessible without tools for emergency shutdown; (ii) clearly labelled "PV DC ISOLATOR — LIVE WHEN ILLUMINATED"; (iii) rated for the array V_oc_max + I_sc_max + DC switching capability.',
  },
  {
    question: 'How does Reg 712.421 (fire) interact with arc-fault detection?',
    answer:
      'Arc-fault detection (AFCI / AFDD-equivalent for DC) is not currently mandated in BS 7671 Section 712 for residential PV — the regulation requires "protection against fire caused by electrical equipment" but doesn\'t prescribe AFCI specifically. Some markets (US NEC, Germany) require DC AFCI on residential PV. UK practice: rely on BS EN 50618 / 62930 cable spec, matched-brand MC4 connectors, manufacturer-torque crimping, and DC isolator rated for DC switching — combined, these mitigate the major arc-fault sources. Module-level rapid-shutdown (where specified by the module manufacturer) provides additional protection.',
  },
  {
    question: 'Why do PV DC cables tend to fail at the MC4 connector rather than the cable itself?',
    answer:
      'The cable itself (BS EN 50618 / 62930) is robust — UV-stable, double-insulated, 25-year-rated. The MC4 / MC4-compatible connector is the weak point: (a) mixing brands creates micro-arcs at the interface; (b) improper crimping leaves a loose contact that heats up under current; (c) water ingress at unsealed connectors causes corrosion; (d) UV-exposed strain relief degrades over 5-10 years. The PWI common-mistakes list flags MC4 issues as the #1 PV DC fault category. The competent installer uses matched brand, manufacturer-specified crimping tool, mechanical test before commissioning, and visual inspection at the 5-yearly customer service.',
  },
  {
    question: 'How does the design pack evidence cable sizing?',
    answer:
      'The MCS MIS 3002 design pack records: (1) the cable type and standard reference (BS EN 50618 or BS EN 62930); (2) the conductor size in mm²; (3) the route length and reference method; (4) the I_z calculation showing CCC reference × grouping × ambient × any other correction factors; (5) the I_sc_max calculation for the relevant cable segment (per-string vs combiner output); (6) the verification I_z ≥ I_sc_max; (7) the voltage drop calculation as a percentage of V_mp; (8) the string-fuse inequality per Reg 712.431.101; (9) the string fuse rating per Reg 712.431.102 if required. The MCS auditor reads the design pack against BS 7671 Section 712.',
  },
  {
    question: 'Where does BS EN 60269-6 gPV fit in the wider fuse standards landscape?',
    answer:
      'BS EN 60269 is the umbrella standard for low-voltage fuses. Parts: -1 (general), -2 (industrial), -3 (domestic, gG / aM), -4 (semiconductor protection), -5 (low-voltage standardised fuses), -6 (PV systems — gPV). The "gPV" characteristic captures PV-specific fault behaviour — slow fault-current rise on DC, no AC zero-crossing for arc clearing, UV environment. UK installs specify "BS EN 60269-6, gPV" — this is the operational reference.',
  },
  {
    question: 'How does the IET CoP for Grid-Connected Solar PV Installations operationalise the DC-side regulations?',
    answer:
      'The IET CoP (5th edition) is the operational complement to BS 7671 Section 712. For DC-side: it walks through cable selection, sizing examples, voltage drop calculations, connector discipline (matched-brand, torque, crimping), isolator selection (DC switching capability), and fire-protection workflow. The MCS MIS 3002 design pack typically references the IET CoP as the methodology source. The cert evidence bundle includes the design pack and the as-installed photos evidencing the DC-side workmanship.',
  },
];

export default function RenewableEnergyModule3Section4() {
  const navigate = useNavigate();

  useSEO({
    title:
      'DC cable sizing, protection & fire | Renewable Energy 3.4 | Elec-Mate',
    description:
      'PV DC-side cable sizing per Iz ≥ Isc_max, BS EN 50618 cable spec per Reg 712.521.1041, gPV fuses per Reg 712.431.102 / BS EN 60269-6 (or DC-MCBs per Reg 712.432.103), IMD per Reg 712.421.101.1 / BS EN 61557-8, MC4 connectors per Reg 712.526, DC isolators, Reg 712.421 fire protection, and the permanent DC live-after-isolation notice per Reg 712.514.102.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 3
          </button>

          <PageHero
            eyebrow="Module 3 · Section 4 · BS 7671:2018+A4:2026"
            title="DC cable sizing, protection & fire"
            description="The PV DC side — cable sizing per Iz ≥ Isc_max, cable selection per Reg 712.521.1041 (BS EN 50618), protective devices per Reg 712.432.103 (gPV / MCBs), IMD per Reg 712.421.101.1 / BS EN 61557-8, MC4 connectors per Reg 712.526, DC isolator per BS EN 60947-3, and Reg 712.421 fire protection."
            tone="yellow"
          />

          <TLDR
            points={[
              'PV DC cable sized against I_z ≥ I_sc_max (not load current, not inverter rated current). I_sc_max = 1.25 × I_sc_stc per Reg 712.433.101.1 conservative default. Cable must carry I_sc_max continuously without thermal damage. Reg 712.433.1: overload protection may be omitted when cable CCC ≥ 1.25 × I_sc_stc at any location.',
              'Reg 712.521.1041 cable selection: (a) single-core non-metallic-sheath cables like H1Z2Z2-K to BS EN 50618; or (b) insulated single-core conductors in individually insulated conduit. CRITICAL — "Cable(s) shall not be placed directly on the surface of the roof". Cable ambient design ≥ 70°C under modules per Reg 712.523.101. Class II insulation per Reg 712.412.101.',
              'DC voltage drop typically 1-3% of V_mp at STC (tighter than AC). VD = 2 × L × R × I. Long routes may require cable upsizing.',
              'Reg 712.432.103 protective devices: (a) gPV per BS EN 60269-6 OR fuse-combination per BS EN 60947-3; OR (b) DC-rated circuit-breakers per BS EN 60947-2 / 60898-2 / IEC 60898-3. Reg 712.533.101: devices shall be BIDIRECTIONAL; U_e ≥ U_oc_max; breaking capacity ≥ I_sc_max of array. Rating per Reg 712.432: 1.1 × I_sc_max < I_n ≤ I_mod_max_ocer. Reg 712.432.101: both polarities protected. Reg 712.432.102: blocking diodes NOT acceptable as overcurrent protection. Reg 712.512.101: where blocking diodes ARE used (polarity protection), reverse V ≥ 2 × U_oc_max; rated I ≥ 1.1 × I_sc_max; in series with strings.',
              'Reg 712.421.101.1: IMD per BS EN 61557-8 SHALL be installed EXCEPT where Reg 712.421.101.2 applies (functional earthing arrangement with fault-current interruption means per Reg 712.2 disconnecting device). Modern transformerless installs need IMD (typically inverter-integrated per BS EN 62109-2); functional-bonded installs (Reg 712.542.102) use the disconnecting device instead.',
              'Reg 712.421 fire protection — DC side. Reg 712.410.101: DC side considered energised even when AC disconnected. Reg 712.514.102: "SOLAR DC — Live parts can remain energised after isolation" notice at every DC access point. Reg 712.526.1: connector pairs shall be compatible (matched brand is the simplest evidence). DC isolator BS EN 60947-3 utilisation category for DC switching under load.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Size PV DC cable per Reg 712.433.101 against I_z ≥ I_sc_max with BS 7671 Appendix 4 corrections for grouping, ambient temperature, and reference method.',
              'Select PV DC cable per Reg 712.521.1041 (H1Z2Z2-K to BS EN 50618 or insulated single-core in conduit) and Reg 712.523.101 (70°C ambient under modules); apply the "not directly on roof surface" rule.',
              'Calculate DC voltage drop per VD = 2 × L × R × I and convert to a percentage of V_mp; upsize the cable where the VD exceeds the design limit.',
              'Select DC protective devices per Reg 712.432.103 (gPV per BS EN 60269-6, fuse-combination per BS EN 60947-3, or circuit-breakers per BS EN 60947-2 / 60898-2 / IEC 60898-3); rate per Reg 712.432 (1.1 × I_sc_max < I_n ≤ I_mod_max_ocer); protect both polarities per Reg 712.432.101.',
              'Install Insulation Monitoring Device per Reg 712.421.101.1 / 712.538.101 / BS EN 61557-8 (or inverter-integrated per BS EN 62109-2).',
              'Apply Reg 712.421 fire protection: BS EN 50618 cable spec, BS EN 62852 connectors per Reg 712.526.101, BS EN 60947-3 DC-21 isolator. Apply Reg 712.514.102 notices at all DC access points.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>Iz ≥ Isc_max. BS EN 50618 / 62930 cable. gPV fuses. DC isolator.</Pullquote>

          <ContentEyebrow>DC cable thermal sizing — Iz ≥ Isc_max</ContentEyebrow>

          <ConceptBlock
            title="Why Iz ≥ Isc_max — not load current, not inverter current"
            plainEnglish="A PV string is a current-limited source. Its I_sc_max sets the maximum current the cable can ever see — and there\'s no upstream protection capping it (the string fuse, if fitted, is sized ABOVE I_sc_max). The cable must carry I_sc_max continuously without thermal damage."
            onSite="This is different from AC load circuits. On AC, the MCB at the source caps sustained overcurrent — the cable is sized for the design current, not the worst-case fault current (because the MCB clears the fault). On DC PV, there\'s no equivalent upstream cap — I_sc_max can flow continuously under normal operation at high irradiance."
          >
            <p>The sizing chain:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Start with I_sc_stc</strong> — from the module datasheet (typical modern modules 11-12.5 A)</li>
              <li><strong className="text-white">Apply Reg 712.433.101.1 conservative default</strong> — I_sc_max = 1.25 × I_sc_stc (or use manufacturer temperature coefficient + site irradiance extremes if data available)</li>
              <li><strong className="text-white">For single string</strong> — cable current = I_sc_max</li>
              <li><strong className="text-white">For parallel strings on a combiner</strong> — combiner output current = Ns × I_sc_max</li>
              <li><strong className="text-white">Check I_z ≥ this current</strong> — at installed conditions (after grouping, ambient, reference method corrections)</li>
              <li><strong className="text-white">If I_z &lt; I_sc_max</strong> — upsize the cable</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="BS 7671 Appendix 4 corrections for installed conditions"
            plainEnglish="Cable manufacturer datasheets quote CCC at a reference condition (typically 30°C ambient, single cable, reference method A or B). The installed condition may be different — grouping (multiple cables in the same containment), higher ambient temperature, different reference method. The corrections reduce CCC from the reference value to the installed-condition I_z."
            onSite="Typical UK PV install corrections: ambient correction 0.94-0.96 for roof-void temperature 35-40°C; grouping correction 0.85-0.95 for 2-3 cables in conduit; reference method correction depending on routing (clipped vs in conduit vs in thermal insulation)."
          >
            <p>The correction formula:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">I_z (installed) = I_z (reference) × C_g × C_a × C_i</strong></li>
              <li>C_g = grouping correction factor (BS 7671 Appendix 4, depends on number of grouped cables)</li>
              <li>C_a = ambient temperature correction (depends on installation temperature)</li>
              <li>C_i = thermal insulation correction (where cable runs through insulation)</li>
            </ul>
            <p>Worked example:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>4 mm² PV DC cable, reference method E (clipped to surface): I_z reference = 50 A</li>
              <li>Grouping correction (2 cables in conduit): C_g = 0.85</li>
              <li>Ambient correction (roof void 40°C): C_a = 0.96</li>
              <li>I_z (installed) = 50 × 0.85 × 0.96 = 40.8 A</li>
              <li>Compare to I_sc_max — adequate if I_sc_max &lt; 40.8 A; upsize otherwise</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>PV DC cable spec — Reg 712.521.1041 / BS EN 50618</ContentEyebrow>

          <Pullquote>BS EN 50618 (H1Z2Z2-K). Not on the roof surface. 70°C ambient design.</Pullquote>

          <ConceptBlock
            title="Cable selection per Reg 712.521.1041"
            plainEnglish="Reg 712.521.1041 sets the PV DC cable selection rules. Two options: (a) single-core cables with non-metallic sheath, for example H1Z2Z2-K cables to BS EN 50618; or (b) insulated single-core conductors in individually insulated conduit or trunking. PLUS the constraint: cables shall not be placed directly on the roof surface."
            onSite="BS EN 50618 is the BS 7671-cited standard (the H1Z2Z2-K cable type). BS EN 62930 is the IEC harmonised counterpart; many manufacturers certify against both, but BS EN 50618 is the operational UK reference. Standard T&E (twin and earth) is unsuitable — wrong voltage class, no UV resistance, no double-insulation, wrong construction."
          >
            <p>BS EN 50618 H1Z2Z2-K PV DC cable spec:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Voltage rating</strong> — 1.5 kV DC (covers V_oc_max for typical UK PV arrays up to ~1,000 V_oc_max with margin)</li>
              <li><strong className="text-white">Temperature rating</strong> — 90°C continuous operating (for high-radiation roof installs and continuous current carrying)</li>
              <li><strong className="text-white">UV resistance</strong> — outdoor-rated for 25+ year exposure on roof</li>
              <li><strong className="text-white">Double insulation</strong> — inner and outer insulation layers (Class II equivalent), additional safety margin on the DC side</li>
              <li><strong className="text-white">Halogen-free</strong> — fire behaviour: doesn\'t release toxic / corrosive halogen gas if burned (important for indoor-routed sections of the DC cable run)</li>
              <li><strong className="text-white">Single-core construction</strong> — each polarity (positive / negative) on its own cable, no shared sheath</li>
              <li><strong className="text-white">Tinned-copper conductor</strong> — corrosion-resistant for outdoor / connector use</li>
              <li><strong className="text-white">Cross-linked polyolefin insulation</strong> — UV-stable, halogen-free, durable</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="MC4 connectors per Reg 712.526 / BS EN 62852"
            plainEnglish="Reg 712.526.1 requires connector pairs to be electrically and mechanically COMPATIBLE — and recommends checking with each manufacturer. Reg 712.526.101 requires selection per BS EN 62852:2015+A1:2020. The reg mandates compatibility, not specifically matched-brand."
            onSite="In practice, matched-brand throughout is the simplest way to evidence compatibility. Mixed-brand pairs are only acceptable where both manufacturers certify compatibility. Mixed without certification creates micro-arcs at the interface, leading to overheating and fire risk per Reg 712.421. Reg 712.526.101 also requires that connectors in locations accessible to ordinary persons can only be disconnected by means of a key or a tool, or be installed within an enclosure opened only by key/tool."
          >
            <p>MC4 discipline per the regs:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Reg 712.526.1 compatibility</strong> — each pair shall be electrically and mechanically compatible and suitable for the environment. Manufacturer-certified compatibility evidence is the cleanest path</li>
              <li><strong className="text-white">Reg 712.526.101 standard</strong> — connectors per BS EN 62852:2015+A1:2020 (or BS EN 62852)</li>
              <li><strong className="text-white">Brand matching (practical)</strong> — Stäubli MC4 with Stäubli MC4; Tongling with Tongling. Simplest way to evidence Reg 712.526.1 compatibility without manufacturer cross-certification</li>
              <li><strong className="text-white">Manufacturer-specified crimping tool</strong> — calibrated for the specific connector. Generic crimpers leave loose contact, overheating, fire risk</li>
              <li><strong className="text-white">Torque to spec</strong> — manufacturer datasheet specifies; typically 1.5-2.5 Nm for the body</li>
              <li><strong className="text-white">Mechanical test</strong> — pull-test before commissioning (manufacturer specifies the test force)</li>
              <li><strong className="text-white">Key/tool isolation</strong> — connectors accessible to ordinary persons require key/tool isolation per Reg 712.526.101</li>
              <li><strong className="text-white">Cert evidence bundle</strong> — records connector brand, BS EN 62852 reference, manufacturer compatibility evidence (if mixed), crimping tool used</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 712.521.1041 — cables on the DC side"
            clause="Cables on the DC side shall be selected and erected so as to minimize the risk of earth faults and short-circuits. This shall be achieved by using one of the following: (a) single-core cables having a non-metallic sheath, for example H1Z2Z2-K cables to BS EN 50618; or (b) insulated (single-core) conductors installed in individually insulated conduit or trunking. Cable(s) shall not be placed directly on the surface of the roof. NOTE: Cables passing through the roof, and the use of a containment system attached to the roof, are not precluded. Other types of wiring system providing an equivalent degree of safety are not precluded."
            meaning="Reg 712.521.1041 sets the two permitted DC cable installation options. The critical operational constraint: cables shall NOT be placed directly on the roof surface — must be in conduit/trunking, or in a containment system attached to the roof, or otherwise protected. The reg explicitly cites BS EN 50618 (H1Z2Z2-K) as the example single-core PV DC cable. Reg 712.523.101 separately requires the cable design ambient temperature ≥ 70°C for cables subject to direct heating from the underside of PV modules."
          />

          <DiagramPlaceholder
            caption="PV DC cable cross-section — single-core construction. Tinned-copper conductor in centre; cross-linked polyolefin inner insulation; outer UV-stable double-insulation layer. Annotated with BS EN 50618 / BS EN 62930 spec parameters: 1.5 kV DC voltage rating, 90°C continuous, UV-rated, halogen-free, typical conductor sizes 4 / 6 / 10 mm²."
            filename="renewable/m3s4-cable-cross-section.png"
          />

          <InlineCheck {...inlineChecks[1]} />

          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>DC voltage drop — tighter than AC</ContentEyebrow>

          <Pullquote>VD = 2 × L × R × I. Target 1-3% of V_mp. Compounds over the install life.</Pullquote>

          <ConceptBlock
            title="Why DC VD limits are tighter than AC"
            plainEnglish="PV is in continuous operation under sunlight. Even small voltage drop percentages compound to material yield loss over the install life. UK industry typical practice limits DC-side VD to 1-3% of V_mp."
            onSite="The calculation: VD = 2 × L × R × I where L is one-way route length (metres), R is conductor resistance (Ω/m), I is the operating current (typically I_mp at STC). Multiplied by 2 because the current flows through both polarity conductors (positive and negative). Convert to percentage of V_mp for the design pack."
          >
            <p>Typical cable resistances for PV DC:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">2.5 mm² tinned copper</strong> — ~7.41 mΩ/m</li>
              <li><strong className="text-white">4 mm² tinned copper</strong> — ~4.61 mΩ/m</li>
              <li><strong className="text-white">6 mm² tinned copper</strong> — ~3.08 mΩ/m</li>
              <li><strong className="text-white">10 mm² tinned copper</strong> — ~1.83 mΩ/m</li>
              <li><strong className="text-white">16 mm² tinned copper</strong> — ~1.15 mΩ/m</li>
            </ul>
            <p>Worked example:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>Single string of 14 modules; V_mp = 14 × 34 = 476 V; I_mp = 11.8 A</li>
              <li>Route length 25 m one-way; 4 mm² cable; R = 4.61 mΩ/m</li>
              <li>VD = 2 × 25 × 0.00461 × 11.8 = 2.72 V</li>
              <li>VD percentage = 2.72 / 476 = 0.57%</li>
              <li>Within 1-3% PV DC limit — adequate</li>
            </ul>
            <p>If the same string had a 40 m route, VD = 4.35 V = 0.91% — still within. At 60 m, VD = 6.53 V = 1.37% — still within but heading toward upsize. The design pack records the VD calculation per cable segment.</p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>DC-side protective devices — Reg 712.431 / 712.432</ContentEyebrow>

          <Pullquote>gPV fuses OR DC-rated MCBs. Both polarities. Blocking diodes ≠ protection. Sized 1.1 × I_sc_max &lt; I_n ≤ I_mod_max_ocer.</Pullquote>

          <ConceptBlock
            title="When DC-side overcurrent protection is required"
            plainEnglish="Per Reg 712.431.101: in a PV array with strings above 2 in parallel, protective devices shall be provided where 1.35 × I_mod_max_ocer < (Ns − 1) × I_sc_max. When this CONDITION IS MET, protective devices are required. Arrays with one or two parallel strings: no overcurrent device required regardless."
            onSite="Devices go in the combiner box. Reg 712.432.101 requires BOTH polarities (+ and −) to be protected when devices are required. Reg 712.432.102 prohibits relying on blocking diodes as overcurrent protection."
          >
            <p>The inequality outcomes:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">1 or 2 parallel strings</strong> — no overcurrent device required (explicit reg statement); cable sized per Reg 712.433.101(a) for I_z ≥ (Ns-1) × I_sc_max</li>
              <li><strong className="text-white">3+ parallel strings with condition MET</strong> — overcurrent protection required per Reg 712.431.101</li>
              <li><strong className="text-white">3+ parallel strings with condition NOT MET</strong> — overcurrent device not required by the inequality; cable still sized to handle reverse current</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Device options per Reg 712.432.103"
            plainEnglish="The reg permits two device categories. Most UK installs use gPV fuses at the combiner; some use DC-rated MCBs where switching capability is wanted at the device."
            onSite="Reg 712.432.103 explicitly permits: (a) gPV fuses per BS EN 60269-6 or fuse-combination units per BS EN 60947-3; OR (b) circuit-breakers per BS EN 60947-2, BS EN 60898-2, or BS IEC 60898-3."
          >
            <p>Device selection per Reg 712.432.103:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">gPV fuses per BS EN 60269-6</strong> — most common at combiner. Designed for PV DC fault characteristics: slow current rise, no AC zero-crossing for arc clearing, UV environment</li>
              <li><strong className="text-white">Fuse-combination units per BS EN 60947-3</strong> — fuse + integral switching capability</li>
              <li><strong className="text-white">Circuit-breakers per BS EN 60947-2</strong> — industrial DC-rated MCBs</li>
              <li><strong className="text-white">Circuit-breakers per BS EN 60898-2 / BS IEC 60898-3</strong> — DC-rated domestic MCBs (more common in residential combiners with switching needs)</li>
            </ul>
            <p>Sizing per Reg 712.432:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">String device rating</strong> — 1.1 × I_sc_max of the string &lt; I_n ≤ I_mod_max_ocer. With I_sc_max = 1.25 × I_sc_stc: lower bound = 1.375 × I_sc_stc (typically 1.4× in practice); upper bound = module reverse-current rating</li>
              <li><strong className="text-white">Sub-array device rating (where 3+ sub-arrays parallel)</strong> — 1.1 × I_sc_max of the sub-array &lt; I_n ≤ I_mod_max_ocer (analogous formula for sub-arrays per Reg 712.433.102)</li>
              <li><strong className="text-white">Multiple parallel strings on one device</strong> — Np × 1.1 × I_sc_max ≤ I_n ≤ I_mod_max_ocer − (Np − 1) × I_sc_max</li>
              <li><strong className="text-white">Voltage rating</strong> — DC voltage rating ≥ V_oc_max of the system</li>
              <li><strong className="text-white">Breaking capacity</strong> — typically 10-30 kA depending on the prospective fault current</li>
              <li><strong className="text-white">Pole count</strong> — both polarities protected per Reg 712.432.101</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 712.432.103 / Reg 712.533.101 — Nature of protective devices"
            clause="712.432.103: The overcurrent protective devices of the DC side shall be either: (a) gPV fuses in accordance with BS EN 60269-6 or fuse-combination units in accordance with BS EN 60947-3; or (b) circuit-breakers in accordance with BS EN 60947-2, BS EN 60898-2 or BS IEC 60898-3. 712.533.101 adds specific measures: (i) rated voltage U_e ≥ U_oc_max of the PV array; (ii) rated current I_n per Reg 712.431.102; (iii) rated breaking capacity ≥ I_sc_max of the PV array; (iv) overcurrent protective devices shall be BIDIRECTIONAL."
            meaning="Reg 712.432.103 permits four device standards on the DC side. Reg 712.533.101 adds critical measures: voltage rating against U_oc_max; current rating per the sizing formula; breaking capacity against the array I_sc_max; and BIDIRECTIONAL operation. The bidirectional requirement is essential — PV fault current can flow in either direction (a faulted string draws reverse current from parallel strings). Standard AC-only MCBs are unidirectional and NOT acceptable. DC-rated MCBs per BS EN 60898-2 / IEC 60898-3 designed for PV are bidirectional. The cert evidence bundle records the device datasheet bidirectional capability and the four 712.533.101 measures."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 712.432.101 / 712.432.102 — both polarities + no blocking-diode reliance"
            clause="712.432.101: Where overcurrent protective devices are required on the DC side according to Regulation 712.431.101, both polarities shall be protected, irrespective of the installation's configuration. 712.432.102: Blocking diodes used to connect the PV strings in parallel shall not be relied upon as a means of protection against overcurrents."
            meaning="When fuses or MCBs are required by Reg 712.431.101, BOTH the positive and the negative conductor of each string must be protected — single-pole-protected DC strings are non-compliant. Separately, blocking diodes (sometimes fitted between parallel strings) are NOT acceptable as overcurrent protection — they\'re a string-isolation device, not a fault-clearing device. The competent design relies on gPV fuses or DC-rated MCBs, not on diodes."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 712.512.101 — Blocking diode specifications"
            clause="If blocking diodes are used, their reverse voltage shall be rated for ≥2 U_oc_max of the PV string and their rated current shall be not less than 1.1 I_sc_max. The blocking diodes shall be connected in series with the PV strings."
            meaning="Blocking diodes (when used) prevent reverse current flow between parallel strings — a polarity-protection role, NOT overcurrent protection (which is prohibited per Reg 712.432.102). When fitted, Reg 712.512.101 sizes them: reverse voltage rating ≥ 2 × U_oc_max of the string (with safety factor); forward current rating ≥ 1.1 × I_sc_max of the string. They go in series with each PV string. Blocking diodes are less common on modern installs (most multi-MPPT inverters handle string isolation internally) but remain valid for specific applications like agricultural / commercial multi-string commissions where physical diode isolation is wanted."
          />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>Reg 712.421 — protection against fire</ContentEyebrow>

          <Pullquote>DC arcs don\'t self-extinguish. Spec the cable. Match the connectors. Rate the isolator.</Pullquote>

          <ConceptBlock
            title="The DC fire-risk landscape"
            plainEnglish="Reg 712.421 mandates protection against fire caused by electrical equipment on the DC side. The PV-specific risks: DC arc faults (which don\'t self-extinguish like AC arcs at zero-crossing), connector failures, and cable insulation breakdown."
            onSite="Mitigation is mostly preventive: BS EN 50618 / 62930 cable spec (UV, double-insulation, halogen-free), matched-brand MC4 connectors with manufacturer-torque crimping, DC isolator with DC switching capability, and where applicable module-level rapid-shutdown."
          >
            <p>The fire-risk sources and mitigations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">DC arc faults</strong> — DC arcs sustain themselves (no AC zero-crossing). Cable insulation breakdown can sustain an arc until physically interrupted. Mitigation: BS EN 50618 / 62930 cable with double-insulation; module-level rapid-shutdown where required</li>
              <li><strong className="text-white">Connector failures (most common source)</strong> — mixed-brand or improperly-crimped MC4 connectors create micro-arcs that overheat and ignite. Mitigation: matched-brand, manufacturer-torque crimping, mechanical test, periodic inspection</li>
              <li><strong className="text-white">Cable insulation degradation</strong> — UV / temperature / age. Mitigation: BS EN 50618 / 62930 cable spec; periodic visual inspection</li>
              <li><strong className="text-white">Inverter / DC isolator failures</strong> — AC-only isolator can\'t break DC under load, sustaining an arc. Mitigation: BS EN 60947-3 DC-21 utilisation category</li>
              <li><strong className="text-white">Rodent / mechanical damage</strong> — rodents can chew through cable in lofts. Mitigation: protected conduit / armoured cable in vulnerable sections; periodic inspection</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 712.421 — protection against fire"
            clause="Protection against fire caused by electrical equipment on the DC side shall be provided. PV modules, cables, connectors, combiner boxes, isolators, inverters and other DC-side equipment shall be selected and erected to minimise the risk of fire. Particular attention shall be paid to the selection of components rated for DC operation, the prevention of arc faults at connectors and joints, and the protection of cables against mechanical damage and UV degradation."
            meaning="Reg 712.421 is the umbrella fire-protection requirement on the DC side. Operationalised through: BS EN 50618 / 62930 cable, BS EN 62852 connectors with matched-brand discipline, gPV fuses per BS EN 60269-6, BS EN 60947-3 DC-rated isolators, and the install workflow that follows the IET CoP for Grid-Connected Solar PV Installations."
          />

          <InlineCheck {...inlineChecks[4]} />

          <InlineCheck {...inlineChecks[6]} />

          <SectionRule />

          <ContentEyebrow>Insulation Monitoring Device (IMD) — Reg 712.421.101.1 / 712.538.101</ContentEyebrow>

          <Pullquote>IMD per BS EN 61557-8. Continuous DC insulation monitoring throughout the array life. Often inverter-integrated.</Pullquote>

          <ConceptBlock
            title="Why the IMD is mandatory on the DC side"
            plainEnglish="Reg 712.421.101.1 requires an Insulation Monitoring Device (IMD) on the DC side to verify insulation status throughout the array life cycle. DC insulation faults don\'t arc-clear at zero-crossing like AC faults — they sustain until physically interrupted. The IMD catches degradation before it becomes a fire hazard under Reg 712.421."
            onSite="Modern transformerless inverters typically have an integrated IMD function compliant with BS EN 62109-2 — the inverter datasheet states this. Where the inverter\'s integrated IMD satisfies the regs, a separate device isn\'t required. Where the inverter doesn\'t have integrated IMD (older transformer-isolated inverters in some configurations), a standalone IMD per BS EN 61557-8 is fitted on the DC side."
          >
            <p>IMD requirements per the regs:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Reg 712.421.101.1 mandate</strong> — IMD shall be installed to verify insulation status on the DC side throughout the life cycle of the PV array</li>
              <li><strong className="text-white">Reg 712.538.101 standard</strong> — IMD shall be selected in accordance with BS EN 61557-8</li>
              <li><strong className="text-white">Inverter-integrated option</strong> — where IMD is integral to the inverter, the IMD function shall be in accordance with BS EN 62109-2 or BS EN 61557-8</li>
              <li><strong className="text-white">Fault response</strong> — IMD detects insulation degradation and either trips the inverter offline (transformerless) or interrupts the fault current path (functional-earthing arrangement per Reg 712.421.101.2)</li>
              <li><strong className="text-white">Cert evidence bundle</strong> — records the IMD source (inverter-integrated vs separate device), manufacturer datasheet extract confirming BS EN 61557-8 (or BS EN 62109-2) compliance, and the commissioning test result</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 712.421.101 / 712.421.101.1 / 712.421.101.2 / 712.538.101 — Insulation Monitoring Device"
            clause="712.421.101: Protection against the effects of insulation faults on the DC side in case of simple separation inside the inverter or on the AC side. 712.421.101.1: An insulation monitoring device (IMD) shall be installed except where Regulation 712.421.101.2 applies, to verify the insulation status on the DC side throughout the life cycle of the PV array. NOTE: IMDs complying with BS EN 61557-8 provide this function. The monitoring function may be provided by an inverter with integrated insulation monitoring also capable of detecting insulation faults. 712.421.101.2: Where functional earthing is applied to a live conductor inside the inverter on the DC side, means shall be provided to interrupt the fault current in case of an insulation fault to earth. 712.538.101: An IMD shall be selected in accordance with BS EN 61557-8. Where the IMD is an integral part of the inverter, the IMD function has to be in accordance with BS EN 62109-2 or BS EN 61557-8."
            meaning="The IMD is mandatory on the DC side — UNLESS Reg 712.421.101.2 applies (functional earthing on the DC side with fault-current interruption means). For typical transformerless UK domestic installs (no functional earthing), the IMD is required; modern inverters satisfy this through integrated insulation monitoring per BS EN 62109-2. For installs with functional bonding per Reg 712.542.102 (transformer-isolated inverter + module manufacturer specifies), the fault-current interruption means per Reg 712.421.101.2 replaces the standalone IMD requirement — the automatic disconnecting device in the functional bonding conductor (per Reg 712.2 sizing table) provides this. Cert evidence bundle records the design decision: IMD (separate or integrated) for transformerless, or fault-current interruption arrangement for functional-bonded installs."
          />

          <InlineCheck {...inlineChecks[7]} />

          <SectionRule />

          <ContentEyebrow>DC isolator — DC switching capability and placement</ContentEyebrow>

          <Pullquote>BS EN 60947-3 DC-21. Live when illuminated. Accessible without tools.</Pullquote>

          <ConceptBlock
            title="DC isolator selection — rated for DC switching"
            plainEnglish="A PV DC isolator must break the array current under load. DC arcs don\'t self-extinguish at zero-crossing like AC arcs, so the isolator must be specifically designed for DC switching — capable of drawing out and quenching the arc."
            onSite="BS EN 60947-3 utilisation category DC-21 (resistive load, including PV arrays under normal operation) is the typical reference. AC-only isolators are NOT interchangeable. The isolator must be rated for V_oc_max and I_sc_max of the array."
          >
            <p>DC isolator selection criteria:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">DC switching capability</strong> — BS EN 60947-3 utilisation category DC-21 or higher</li>
              <li><strong className="text-white">Voltage rating</strong> — DC voltage rating ≥ array V_oc_max (typically 1,000 V or 1,500 V depending on the array)</li>
              <li><strong className="text-white">Current rating</strong> — rated for ≥ I_sc_max of the array (or per parallel-string segment if multiple isolators)</li>
              <li><strong className="text-white">Pole count</strong> — both polarities (positive and negative) isolated simultaneously by a 2-pole isolator</li>
              <li><strong className="text-white">Location</strong> — accessible without tools for emergency shutdown; typically immediately before the inverter on the DC input side</li>
              <li><strong className="text-white">Labelling</strong> — clearly marked "PV DC ISOLATOR — LIVE WHEN ILLUMINATED"; warning that the array remains live during daylight even when the isolator is open</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Permanent residual-energy warnings on the combiner / DC isolator"
            plainEnglish="The PV array remains LIVE during daylight — can\'t be de-energised at source. Anyone opening a combiner box or working on the DC side must know this."
            onSite="The cert evidence bundle and the install include permanent residual-energy warning labels on: (a) the combiner box / DC isolator enclosure; (b) the inverter; (c) the consumer unit if a PV-fed circuit is present (Section 6 covers AC side). Labels are weatherproof, UV-resistant, and durable for the install life."
          >
            <p>Permanent residual-energy warning label requirements (per Section 8 of this module — recap):</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Reg 712.514.102 (DC access points)</strong> — "SOLAR DC — Live parts can remain energized after isolation" at each point of access to live parts on the DC side (combiner boxes, DC isolator)</li>
              <li><strong className="text-white">Reg 712.514.103 (inverter)</strong> — "WARNING — Isolate both AC and DC sides before servicing" on all inverters</li>
              <li><strong className="text-white">Reg 712.514.101 (origin / metering / CU)</strong> — instruction notice indicating the presence of a PV system at the origin of the electrical installation, the metering position (if remote), and the consumer unit / DB to which the supply from the inverter is connected</li>
              <li><strong className="text-white">Format</strong> — weatherproof, UV-resistant, durable for the install life</li>
              <li><strong className="text-white">Cert evidence</strong> — install photos document the labels in place</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[6]} />

          <SectionRule />

          <ContentEyebrow>What it looks like in the wild</ContentEyebrow>

          <Scenario
            title="MCS audit finds mixed-brand MC4 connectors — major finding, full replacement"
            situation="MCS audit of a 6 kWp install reveals the installer used Stäubli MC4 connectors on the module side and Tongling MC4-compatible connectors on the combiner side. The interfaces have begun to show heat discolouration after 18 months operation."
            whatToDo="Major MCS audit finding under Reg 712.421 (fire risk) and PWI common-mistakes #1. Rectification: (1) isolate the array per the install\'s DC isolator; (2) replace all mixed-brand connector pairs with matched-brand (use Stäubli throughout, or Tongling throughout — not mixed); (3) re-crimp using manufacturer-specified tool; (4) mechanical test; (5) re-energise and thermal-imaging inspection of all replaced connections; (6) update the cert evidence bundle with the rectification record. Cost: typically £500-£1,500 in labour + materials for a residential install. Customer must be informed; the fire-risk concern is real."
            whyItMatters="Mixed MC4 brands is the #1 PWI-common-mistake on the DC side and a real fire-risk under Reg 712.421. The competent installer uses matched-brand throughout day-one; the cert evidence bundle records connector brand and crimping tool to head off the audit finding."
          />

          <Scenario
            title="Inverter DC isolator can\'t close under load — wrong-spec isolator"
            situation="During commissioning, the installer closes the DC isolator on a single-string array. The isolator arcs visibly; the installer hears the arc; the isolator handle won\'t complete its travel."
            whatToDo="STOP immediately. Diagnosis: most likely the isolator is AC-only (not BS EN 60947-3 DC-21 rated), or the V_oc_max / I_sc_max rating is below the array. Substitute a correctly-rated DC isolator. Verify the new isolator: (a) BS EN 60947-3 DC-21 or higher utilisation category; (b) DC voltage rating ≥ array V_oc_max; (c) DC current rating ≥ I_sc_max. Re-test under load. Update the cert evidence bundle and the design pack component schedule. Customer must be informed about the rectification."
            whyItMatters="AC-only isolators on PV DC are a fire-risk and a fault-finding hazard (can\'t safely break the circuit under load). The competent install specifies BS EN 60947-3 DC-21 from day-one and records the isolator brand / model / ratings in the cert evidence bundle."
          />

          <CommonMistake
            title="Standard T&E used for the PV DC run"
            whatHappens="An installer uses 2.5 mm² T&E (twin and earth) for the array-to-inverter DC run because it was on the van. The cable is 230 V AC PVC, not 1.5 kV DC double-insulated UV-stable. After 18 months of UV exposure on the roof section of the run, the outer sheath cracks; water ingress; insulation breakdown; potential DC arc-fault per Reg 712.421."
            doInstead="Always use BS EN 50618 / BS EN 62930 PV DC cable for ALL DC-side cable runs — module-to-module, string-to-combiner, combiner-to-inverter. T&E is fundamentally wrong for PV DC: wrong voltage class, wrong UV behaviour, wrong insulation construction. The MCS MIS 3002 design pack records the cable standard reference; the install photos evidence the correct cable."
          />

          <CommonMistake
            title="DC cable sized against load / inverter current, not Isc_max"
            whatHappens="An installer sizes the DC cable against the inverter rated DC input current (e.g. 15 A for a 5 kW inverter) rather than against I_sc_max. The cable is 2.5 mm² with effective I_z of 25 A. The string I_sc_max is 32 A. Under normal high-irradiance operation, the cable carries 32 A continuously — exceeds I_z by 30%. Cable runs hot; insulation degrades; arc-fault risk."
            doInstead="Always size against I_sc_max, not load current or inverter rated current. I_sc_max = 1.25 × I_sc_stc per Reg 712.433.101.1 conservative default (or use manufacturer temperature coefficient + site extremes). For parallel strings, I_sc_max scales by Ns. The cable\'s effective I_z (after grouping / ambient / reference method corrections) must be ≥ I_sc_max."
          />

          <CommonMistake
            title="String fuses fitted on a 2-parallel-string install (over-fusing)"
            whatHappens="An installer fits string fuses on a 2-parallel-string single-MPPT install &ldquo;to be safe&rdquo;. Reg 712.431.101 explicitly states: &ldquo;In a PV array with one PV string or two PV strings in parallel, no overcurrent protective device is required.&rdquo; The unnecessary fuses add cost, fault-find complexity, and a periodic-replacement burden. Doesn\'t cause harm but adds operational cost."
            doInstead="Apply the Reg 712.431.101 inequality before specifying string fuses. Single-string and dual-string installs never need them per the explicit reg statement. The MCS MIS 3002 design pack records the inequality calculation and the design decision either way."
          />

          <CommonMistake
            title="Single-pole-protected DC string — Reg 712.432.101 violation"
            whatHappens="An installer fits string fuses on the positive conductor only — leaving the negative conductor unprotected. Reg 712.432.101 explicitly requires BOTH polarities to be protected, irrespective of the installation configuration. MCS audit flags as major finding."
            doInstead="When string protection is required by Reg 712.431.101, BOTH the positive and the negative conductor of each string must carry overcurrent protection per Reg 712.432.101. Two-pole gPV fuse-holders (or equivalent two-pole DC-MCBs) are the standard solution. The cert evidence bundle records the device pole count."
          />

          <CommonMistake
            title="No Insulation Monitoring Device fitted — Reg 712.421.101.1 violation"
            whatHappens="An installer commissions a PV install without an IMD on the DC side. The inverter datasheet doesn\'t confirm integrated IMD compliance per BS EN 62109-2. MCS audit flags major finding under Reg 712.421.101.1 — IMD shall be installed to verify insulation status throughout the array life cycle. Rectification: retrospectively fit a BS EN 61557-8 IMD or substitute for an inverter with confirmed integrated IMD."
            doInstead="Read the inverter datasheet at design stage for integrated IMD compliance (BS EN 62109-2). Where the inverter has integrated IMD, no separate device required. Where it doesn\'t, fit a standalone BS EN 61557-8 IMD on the DC side. The cert evidence bundle records the IMD source and the manufacturer compliance statement."
          />

          <CommonMistake
            title="DC cable laid directly on the roof surface — Reg 712.521.1041 violation"
            whatHappens="An installer clips DC cable runs directly to the roof tiles without conduit or containment. Reg 712.521.1041 explicitly states: &ldquo;Cable(s) shall not be placed directly on the surface of the roof.&rdquo; MCS audit major finding; rectification requires installing containment (conduit, trunking, or cable tray attached to the roof structure) and re-routing the cables."
            doInstead="At design stage, plan the DC cable route in containment — conduit, trunking, or a cable tray attached to the roof structure. Cables passing through the roof, and the use of containment attached to the roof, are explicitly NOT precluded by the reg. The cert evidence bundle records the containment system; install photos evidence the as-installed routing."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'PV DC cable sized against I_z ≥ I_sc_max (Reg 712.433.101). I_sc_max = 1.25 × I_sc_stc per Reg 712.433.101.1 conservative default. Reg 712.433.1: overload protection may be omitted when cable CCC ≥ 1.25 × I_sc_stc.',
              'Reg 712.521.1041 cable selection: (a) single-core non-metallic-sheath like H1Z2Z2-K to BS EN 50618; or (b) insulated single-core in individually insulated conduit. CRITICAL — cables shall NOT be placed directly on the roof surface. Reg 712.523.101: 70°C ambient design temperature under modules. Reg 712.412.101: Class II insulation throughout DC side.',
              'Reg 712.432.103 protective devices: (a) gPV per BS EN 60269-6 / fuse-combination per BS EN 60947-3; OR (b) DC-rated circuit-breakers per BS EN 60947-2 / 60898-2 / IEC 60898-3. Rating per Reg 712.432: 1.1 × I_sc_max < I_n ≤ I_mod_max_ocer.',
              'Reg 712.533.101: DC OCPDs SHALL be bidirectional; U_e ≥ U_oc_max; breaking capacity ≥ I_sc_max of array. Reg 712.432.101: BOTH polarities protected when devices required. Reg 712.432.102: blocking diodes NOT acceptable as overcurrent protection. Reg 712.431.101: 1 or 2 parallel strings — no devices required explicit. Reg 712.512.101: when blocking diodes used (for polarity protection), reverse V ≥ 2 × U_oc_max; rated I ≥ 1.1 × I_sc_max.',
              'Reg 712.421.101.1 / 712.538.101: IMD per BS EN 61557-8 SHALL be installed EXCEPT where Reg 712.421.101.2 applies (functional earthing arrangement with fault-current interruption means per Reg 712.2 disconnecting device). May be inverter-integrated per BS EN 62109-2 — manufacturer datasheet evidences. For functional-bonded installs (Reg 712.542.102), the disconnecting device per Reg 712.2 substitutes for IMD.',
              'Reg 712.526.1: connector pairs shall be compatible (manufacturer-recommended check). Reg 712.526.101: BS EN 62852:2015+A1:2020. Matched-brand is the simplest evidence; key/tool isolation for connectors accessible to ordinary persons.',
              'DC voltage drop typically 1-3% of V_mp at STC. VD = 2 × L × R × I. Tighter than AC because PV is continuous operation.',
              'Reg 712.421 fire protection. Reg 712.410.101: DC side considered energised even when AC disconnected. Reg 712.514.102: "SOLAR DC — Live parts can remain energized after isolation" at each DC access point. Reg 712.514.103: "WARNING — Isolate both AC and DC sides before servicing" on inverters. DC isolator with BS EN 60947-3 DC switching capability.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 4 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-3-section-3')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 3
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Roof safety &amp; mounting
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-3-section-5')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.5 Bonding &amp; lightning
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
