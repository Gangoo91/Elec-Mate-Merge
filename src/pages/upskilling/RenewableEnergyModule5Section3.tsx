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
    id: 'm5s3-570-6-1-1-1',
    question:
      'Reg 570.6.1.1.1 sets the foundational safety standard for BESS in BS 7671:2018+A4:2026. What does it require, and what does the &ldquo;bidirectional protective devices&rdquo; line mean?',
    options: [
      'No requirement',
      'Reg 570.6.1.1.1: &ldquo;Stationary secondary battery installations shall conform to the relevant parts of the BS EN IEC 62485 series. Where appropriate, bidirectional protective devices shall be selected.&rdquo; BS EN IEC 62485 covers: -1 general safety; -2 stationary Pb-acid; -5 Li-ion stationary. UK domestic LFP BESS conformance via manufacturer product certification. The bidirectional protective device line ties to Reg 826.1.2.2 (Chapter 82) — current can flow either direction at the BESS-PCE interface (charging vs discharging), so OCPDs must operate to trip on overcurrent regardless of direction',
      'Customer chooses',
      'Only AC side',
    ],
    correctIndex: 1,
    explanation:
      'Reg 570.6.1.1.1 (Chapter 57 NEW A4:2026) is the foundational reg pointing at the BS EN IEC 62485 series — five parts covering battery installation safety. Most relevant for UK domestic LFP: Part -5 (Li-ion stationary). The standard covers: cell-level safety, BMS function, fault detection, contactor control, communication, hazard mitigation. The competent installer verifies conformance via the manufacturer&rsquo;s product certification declaration — recorded in the cert evidence bundle. The bidirectional protective device line is critical for hybrid PV+BESS installs: current flows either way at the BESS connection (charge OR discharge); OCPDs must operate in both directions. Cross-refs: Reg 826.1.2.2 (Chapter 82), Reg 712.533.101 (PV DC OCPDs), Reg 551.7.1(c) via Reg 530.3.201 (parallel-source AC OCPDs).',
  },
  {
    id: 'm5s3-570-6-1-1-2',
    question:
      'Reg 570.6.1.1.2 — battery terminal voltage shall be assumed to be ALWAYS PRESENT. What\'s the practical implication for installers and maintenance work?',
    options: [
      'No implication',
      'The battery DC side cannot be &ldquo;turned off&rdquo; — even with the PCE disconnected, the battery itself remains live at full V at the terminals. Maintenance work must: (a) isolate at the battery DC isolator nearest the cells; (b) treat the battery V as live until physically lifted off the terminals; (c) apply BS EN IEC 62485 safe-maintenance procedures (insulated tools, PPE, sequence). Plus the Reg 570.6.8.202 warning notice: &ldquo;BATTERY - Live parts can remain energized after isolation&rdquo; — mandatory on each battery enclosure access point',
      'Customer\'s problem',
      'Only when PCE is on',
    ],
    correctIndex: 1,
    explanation:
      'Reg 570.6.1.1.2: &ldquo;Voltage at the terminals of cells or monobloc batteries shall be assumed to be always present, and appropriate provisions for safe maintenance shall be provided in accordance with the BS EN IEC 62485 series.&rdquo; This is the BESS analog of Reg 712.410.101 for PV (DC side always live even when AC off + inverter off). Practical implications: (1) BESS DC side cannot be &ldquo;de-energised&rdquo; like an AC circuit can; (2) isolators are for SAFE-WORK separation, not for removing battery V; (3) maintenance work assumes live cells throughout; (4) Reg 570.6.8.202 warning notice mandatory: &ldquo;BATTERY - Live parts can remain energized after isolation&rdquo;. Cert evidence bundle records: battery DC isolator location, warning notice presence, manufacturer&rsquo;s safe-maintenance procedure.',
  },
  {
    id: 'm5s3-570-6-1-1-3',
    question:
      'Reg 570.6.1.1.3 — what does it require for battery racks / cabinets made from conductive materials?',
    options: [
      'No requirement',
      'Where ADS (automatic disconnection of supply) or PELV are used as protective measures, battery racks or battery cabinets made from conductive materials shall be CONNECTED TO THE PROTECTIVE CONDUCTOR. Plus: irrespective of the nominal voltage, live parts of batteries, cells, monoblocs and related connections shall only be accessible to SKILLED AND/OR INSTRUCTED PERSONS. So: bond metal enclosures to PE; restrict access to live battery parts to electrically-competent persons',
      'Customer choice',
      'No PE bonding',
    ],
    correctIndex: 1,
    explanation:
      'Reg 570.6.1.1.3 has two requirements: (1) conductive battery racks / cabinets bonded to PE where ADS or PELV are the protective measures — standard electrical safety principle, prevents the rack itself becoming a touch-voltage hazard on a fault; (2) live parts accessible only to skilled / instructed persons — the BESS enclosure shouldn&rsquo;t allow casual touch of live cells. UK domestic LFP BESS products achieve this via the enclosure design (sealed, accessible only with tools); installer must ensure the metal enclosure is bonded to PE per the manufacturer instructions + cert evidence bundle records the bonding test result.',
  },
  {
    id: 'm5s3-570-6-1-2-1',
    question:
      'Reg 570.6.1.2.1 — DC side earthing of a live conductor. What does it permit and what&rsquo;s the condition?',
    options: [
      'Earthing forbidden',
      '&ldquo;Earthing of one of the live conductors of the DC side is permitted, if there is at least simple separation between the AC side and the DC side.&rdquo; Mirrors Reg 712.312.2 for PV. The simple-separation condition (transformer winding separation, or galvanically-isolated PCE) is provided by the hybrid inverter / battery PCE in most UK domestic installs. Allows the DC negative to be earthed if required — typical for some BMS designs',
      'Always earth',
      'Customer\'s decision',
    ],
    correctIndex: 1,
    explanation:
      'Reg 570.6.1.2.1 mirrors Reg 712.312.2 for PV — both permit DC live-conductor earthing where AC-DC simple separation exists. The simple separation comes from the PCE&rsquo;s output transformer / isolated topology. Without separation, earthing the DC live would couple AC into the DC system or vice versa, creating shock + fault current issues. UK domestic LFP BESS: simple separation is the manufacturer&rsquo;s standard topology; DC earthing decision is per the manufacturer&rsquo;s electrical design (some bond DC negative; others float). Cert evidence bundle records the earthing arrangement + the manufacturer&rsquo;s reference to the simple-separation design.',
  },
  {
    id: 'm5s3-570-6-1-2-2',
    question:
      'Reg 570.6.1.2.2 — single-point earthing. What systems does it apply to, and why does it matter?',
    options: [
      'All systems',
      '&ldquo;To prevent circulating currents, TN-S and TT systems shall be earthed at one point only. The point at which the system is earthed shall take into account the correct operation of protective devices for final circuits.&rdquo; Single-point earthing in TN-S or TT installs prevents parallel earth-return paths that would split fault current, undermining the OCPD&rsquo;s ability to operate within the required disconnection time. Multiple earth points on the DC side amplify corrosion risk. The single point is typically inside the PCE / hybrid inverter — installer doesn&rsquo;t add field earth connections',
      'Customer\'s choice',
      'No earthing needed',
    ],
    correctIndex: 1,
    explanation:
      'Reg 570.6.1.2.2 prevents circulating currents in TN-S and TT systems by mandating single-point earthing. Multiple earth connections create parallel return paths — fault current splits, OCPDs see only a fraction, may fail to operate within Chapter 41 disconnection times. NOTE 1: corrosion on the DC side is amplified by parallel earth paths — see BS EN 13636 + BS EN 15112. NOTE 2: earthing may not be required where the system is neither TN nor TT (e.g. IT). For UK domestic (TN-C-S DNO supplies → TN-S at consumer side): single-point earthing is critical. Practical: manufacturer specifies the point (usually internal to the PCE / hybrid inverter at the DC midpoint or DC-). Installer doesn&rsquo;t add field earth connections to the DC side. Cert evidence bundle records the single-point location.',
  },
  {
    id: 'm5s3-570-6-2-2-rcd',
    question:
      'Reg 570.6.2.2 — Type B RCD requirement for BESS AC supply. When is Type B required and when can a lower type be used?',
    options: [
      'Always Type B',
      'Where an RCD protects the AC supply circuit of a BESS, the RCD shall be Type B (BS EN 62423 or BS EN 60947-2), UNLESS: (a) the PCE provides at least simple separation between AC and DC sides; OR (b) at least simple separation is provided between the PCE and the RCD by means of separate windings of a transformer; OR (c) the PCE manufacturer states a Type B RCD is not required. Most modern UK domestic BESS PCE (hybrid inverters) provide internal simple separation — so Type B is not always mandatory. The manufacturer\'s spec dictates',
      'Customer\'s choice',
      'No RCD needed',
    ],
    correctIndex: 1,
    explanation:
      'Reg 570.6.2.2 mirrors the Reg 712.531.3.5.1 logic for PV. Default: Type B RCD (detects DC + AC residual currents) needed where a transformerless / non-isolated PCE could feed DC fault currents back into the AC RCD circuit. Exceptions (a)/(b)/(c): if galvanic separation exists between AC and DC (PCE transformer winding separation, external transformer, or manufacturer-stated exemption), a lower RCD type (Type A or A+F) may be adequate. The competent installer reads the PCE manufacturer datasheet for the RCD-type requirement; cert evidence bundle records the manufacturer statement + the as-installed RCD type. Most modern UK hybrid inverters specify Type A as adequate due to internal simple separation; the older / non-isolated topologies require Type B.',
  },
  {
    id: 'm5s3-570-6-3-ventilation',
    question:
      'Reg 570.6.3 — ventilation. How does it apply differently to Li-ion vs Pb-acid in UK domestic practice?',
    options: [
      'Same for all',
      'Reg 570.6.3: &ldquo;The location or enclosure of stationary secondary batteries shall be adequately ventilated taking account of the manufacturer&rsquo;s instructions.&rdquo; For LFP (Li-ion): no gas evolution under normal operation; ventilation requirement is modest — manufacturer-specified clearances + airflow paths. For Pb-acid: hydrogen evolution during charging (especially equalisation); ventilation calculated per BS EN IEC 62485-2 Annex A; explosion-proof fittings in the hazardous zone. The reg covers both via the manufacturer-instructions hook; PAS 63100:2024 adds UK domestic-specific requirements',
      'No ventilation needed',
      'Customer\'s choice',
    ],
    correctIndex: 1,
    explanation:
      'Reg 570.6.3 is technology-agnostic — &ldquo;adequately ventilated taking account of the manufacturer&rsquo;s instructions&rdquo;. The manufacturer&rsquo;s instructions encode the technology-specific reality. LFP under normal operation: no gas evolution; ventilation focused on heat removal + thermal-runaway scenario clearances. Pb-acid: hydrogen during charging (typically 2-3 mL H2 per Ah per cell during equalisation); ventilation per BS EN IEC 62485-2 Annex A volumetric calculation; explosion-proof fittings in the IEC zone (typically 0.5 m around vents). UK domestic: virtually always LFP — ventilation is straightforward manufacturer-clearance compliance. Plus PAS 63100:2024 for UK domestic-specific install (location, clearances, fire safety, signage). Cert evidence bundle records the manufacturer ventilation spec + PAS 63100 compliance.',
  },
  {
    id: 'm5s3-570-6-4-fault-current',
    question:
      'Reg 570.6.4 — fault current on the DC side. What contributions must be accounted for, and what&rsquo;s the practical impact for OCPD selection?',
    options: [
      'Only battery',
      '&ldquo;Determination of the battery prospective fault current shall take account of the contribution of the battery AND the PCE which charges it.&rdquo; Two contributors: (1) the battery itself — a multi-kWh LFP pack delivers 10-30 kA prospective short-circuit current for milliseconds; (2) the PCE — provides additional fault current via its DC charging path. OCPDs on the DC side must have breaking capacity equal to the SUM. Plus Reg 570.6.4.201/.202: wiring systems selected + erected to minimize earth-fault + short-circuit risk; inherently short-circuit and earth-fault-proof wiring required where PCE lacks simple separation AND the DC side is unearthed',
      'Customer\'s choice',
      'No fault current',
    ],
    correctIndex: 1,
    explanation:
      'Reg 570.6.4 mandates fault-current calculation accounting for BOTH battery AND PCE contributions. Battery contribution: 10-30 kA prospective ISC from a typical multi-kWh LFP pack for milliseconds before DC fuses operate. PCE contribution: charging path provides additional current; current-limited but not zero. Combined: DC OCPDs sized for total breaking capacity. The manufacturer datasheet provides the ISC + PCE fault contribution; the design pack records the calculation. Reg 570.6.4.201/202: wiring shall minimize earth-fault + short-circuit risk; where PCE lacks simple separation between battery DC and other supplies AND DC side is unearthed, inherently short-circuit + earth-fault-proof wiring required (single-core non-metallic-sheath cables, insulated conductors in insulated conduit, or equivalent). BS EN 50618 PV cable referenced as appropriate. Cert evidence bundle records the fault analysis + OCPD selection.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Reg 570.6.5 + 570.6.5.201 — isolation requirements for BESS. How many isolators are typically required and where?',
    options: [
      'One isolator',
      'Reg 570.6.5: every power circuit connecting to a stationary secondary battery shall be provided with appropriate means of isolation conforming to Section 462. The NOTE clarifies: isolation likely required at BOTH ENDS of the power circuit. Reg 570.6.5.201: to allow maintenance and replacement of PCE not incorporated in a battery assembly, isolation provided for ALL POWER PORTS of the PCE. For a typical UK domestic LFP BESS install: (a) battery DC isolator at the battery; (b) PCE AC output isolator at the consumer unit; (c) PCE DC input isolator at the PCE (where battery and PCE are separate units, per 570.6.5.201)',
      'Customer&rsquo;s choice',
      'No isolation',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 570.6.5 mandates isolation per Section 462 for every BESS power circuit. NOTE specifies BOTH ENDS of the circuit — i.e. isolators on the battery side AND the PCE side. Reg 570.6.5.201 expands: when the PCE is a separate unit (not integrated into the battery enclosure), ALL POWER PORTS of the PCE get isolators — AC output + DC input(s). Typical UK domestic install: (1) battery DC isolator integral to battery enclosure or fitted at the battery cabling; (2) PCE AC output isolator at the consumer unit (BS EN 60947-3 switch-disconnector); (3) PCE DC input isolator where the PCE is separate from the battery. Modular HV stacks (GivEnergy HV, BYD Battery Box) typically have battery DC isolator integral to the master module; AC isolator at CU. Cert evidence bundle records each isolator location + spec.',
  },
  {
    id: 2,
    question:
      'Reg 570.6.7 — protection against other hazards. What two hazards does it specifically mention, and what does &ldquo;automatic or remote controls&rdquo; refer to?',
    options: [
      'Just one',
      'Reg 570.6.7: protection against (a) risk of arcing and explosion; AND (b) automatic or remote controls impairing the safety of the installation. (a) is straightforward — Li-ion thermal runaway, Pb-acid hydrogen explosion risk during charging or fault. (b) refers to BMS / EEMS / inverter control logic that could create unsafe states — e.g. forcing a fault-state battery to continue operating, overriding safety thresholds, mis-coordinated multi-source switching. Mitigation per the battery manufacturer&rsquo;s instructions + IEC TS 62933-5-1 + BS EN IEC 62485 + BS EN IEC 62933-5-2',
      'Customer&rsquo;s problem',
      'No hazards',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 570.6.7 lists two specific hazards: (a) arcing + explosion — Li-ion thermal-runaway flame, Pb-acid hydrogen explosion at vents during equalisation. The location / enclosure must mitigate per the manufacturer instructions. (b) automatic or remote controls impairing safety — BMS firmware bugs that could mis-trip protection; EEMS / inverter logic that could force the battery into an unsafe operating state; remote-disable functions that could be hacked / misconfigured. Mitigation: design + commissioning verify automatic / remote control logic doesn&rsquo;t override safety thresholds. Referenced standards: IEC TS 62933-5-1 (energy storage safety considerations); BS EN IEC 62485 series; BS EN IEC 62933-5-2 (safety requirements for batteries integrated into electrical energy storage systems). Cert evidence bundle records the manufacturer compliance + commissioning verification.',
  },
  {
    id: 3,
    question:
      'Reg 570.6.7.201 — fuses for DC circuits of batteries. What\'s the access restriction, and why?',
    options: [
      'No restriction',
      'Fuses arranged so that: (a) they are accessible only by the use of a key or tool; OR (b) fuses can only be removed after the opening of a means of isolation suitable for on-load isolation of DC. NOTE: fuses should not be removed on load or replaced onto a fault. Reason: DC arcs at battery V are difficult to extinguish — pulling a fuse under load could draw a sustained arc; pulling onto a fault could cause severe arcing + injury. The key/tool restriction or interlock with isolator prevents accidental on-load fuse operation',
      'Customer\'s discretion',
      'No fuses needed',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 570.6.7.201 — DC fuse access restriction. Two methods: (a) key/tool access only (fuse panel locked or requires tool); OR (b) interlocked with an on-load DC isolator that must be opened first. Why: DC arcs are harder to extinguish than AC arcs (no zero-crossing); pulling a fuse under DC load could create a sustained plasma arc; pulling onto a fault could cause arc-flash injury. The NOTE makes the safety point explicit: never remove a fuse on load, never replace onto a fault. Practical UK domestic implementation: BESS DC fuses inside the battery enclosure (locked panel), accessible only after the battery DC isolator is open. Cert evidence bundle records the DC fuse location + access method.',
  },
  {
    id: 4,
    question:
      'Reg 570.6.7.202 + 570.6.7.203 — where can a stationary secondary battery be located? And what UK-specific spec applies to dwellings?',
    options: [
      'Anywhere',
      'Reg 570.6.7.202: &ldquo;Stationary secondary batteries shall be located and adequately ventilated, taking account of the manufacturer&rsquo;s instructions and/or safety data sheets. Such ventilation shall not create a hazard and, therefore, can require ventilation to an outdoor space. Battery types that can evolve flammable or combustible gases or vapours shall be located at a safe distance from equipment liable to generate arcs, sparks or flames in normal use.&rdquo; Reg 570.6.7.203: &ldquo;Stationary secondary batteries in dwellings shall be installed in a suitable location taking account of manufacturer&rsquo;s instructions and PAS 63100.&rdquo;',
      'Customer&rsquo;s preference',
      'Only outdoors',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 570.6.7.202 + .203 set BESS location requirements. .202 general: ventilated location per manufacturer + safety data; ventilation must not create hazard (may require outdoor venting for gas-evolving batteries); gas-evolving batteries (Pb-acid) at safe distance from arc/spark sources. .203 specific to UK DWELLINGS: location per manufacturer instructions AND PAS 63100. PAS 63100:2024 covers: no installation in habitable spaces (bedroom / lounge); clearances from windows / doors / escape routes; smoke / heat detector required; fire-rated enclosure or location; warning signage. UK domestic LFP location options: garage (preferred), utility room, outbuilding, fire-rated external enclosure. Cert evidence bundle records the location + PAS 63100 compliance evidence.',
  },
  {
    id: 5,
    question:
      'Reg 570.6.8.201 — where must the BESS warning notice be fixed, and what does it indicate?',
    options: [
      'Customer\'s choice',
      'A warning notice indicating the PRESENCE AND LOCATION of a stationary secondary battery system shall be fixed at: (a) the origin of each electrical installation; (b) each metering position, if remote from the origin; (c) each consumer unit or distribution board to which a supply from a stationary secondary battery is connected. Exception: the LOCATION need not appear on the notice in installs covered by a fire strategy with plans readily available to fire and rescue services. The notice typically follows Figure 57.1 in BS 7671',
      'Customer doesn\'t need to know',
      'No notice',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 570.6.8.201 mandates BESS warning notices at THREE locations: (a) origin of installation (typically the cut-out / supply head); (b) metering position (if remote from origin); (c) every consumer unit / distribution board connected to the BESS. The notice indicates BESS PRESENCE and LOCATION. The location part can be omitted where a fire strategy + plans are available to fire-and-rescue services (commercial / industrial typical). For UK domestic: all three locations get the notice + the battery location stated. The reg references Figure 57.1 as the example template (yellow background, black text + warning triangle). Cert evidence bundle includes photos of each as-installed notice.',
  },
  {
    id: 6,
    question:
      'Reg 570.6.8.202 — what warning notice does each battery room or enclosure access point need?',
    options: [
      'No notice',
      'A PERMANENT warning notice indicating that LIVE PARTS may remain energized after isolation. Example text: &ldquo;BATTERY - Live parts can remain energized after isolation&rdquo;. Reflects Reg 570.6.1.1.2 (terminal V always present). Yellow background, black text, warning triangle per Figure 57.3. The notice alerts maintenance personnel that opening the AC isolator doesn\'t make the battery safe — battery cells remain at terminal V regardless',
      'Customer\'s problem',
      'Same as PV notice',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 570.6.8.202: each access point to a battery room / enclosure gets a permanent warning notice. The text indicates live parts may remain energized after isolation — i.e. the AC isolator doesn&rsquo;t make the cells safe. Example text given in the reg: &ldquo;BATTERY - Live parts can remain energized after isolation&rdquo;. Figure 57.3 illustrates: yellow background, black text + warning triangle. Per Reg 570.6.1.1.2 the cell terminal V is always present; the warning notice is the operational safeguard alerting personnel. UK domestic install: notice on the battery enclosure access door / panel. Cert evidence bundle records the as-installed notice photo.',
  },
  {
    id: 7,
    question:
      'Reg 570.6.8.203 — what warning notice gets fixed to the PCE, and why?',
    options: [
      'No notice',
      'A warning notice fixed to all PCE with text similar to: &ldquo;WARNING - Isolate both AC and DC sides before servicing&rdquo;. Reason: the PCE has BOTH AC (output) AND DC (battery side) live circuits; safe servicing requires isolating BOTH. Without the notice, personnel may isolate only the AC side (familiar from PV practice) and assume the DC side is dead — it&rsquo;s not (Reg 570.6.1.1.2 battery V always present). The notice prevents this safety failure',
      'Customer&rsquo;s preference',
      'Only AC isolation',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 570.6.8.203 mandates the &ldquo;isolate both AC and DC sides before servicing&rdquo; warning on every PCE. The reasoning: PV inverter practice typically has an AC isolator + a DC isolator + the DC side &ldquo;dead&rdquo; when the array is covered. BESS PCE is different: the DC side is the BATTERY, which is ALWAYS LIVE (Reg 570.6.1.1.2). Isolating only AC leaves the DC side live; touching the PCE DC terminals would expose personnel to battery voltage. The warning notice (yellow background, black text) at the PCE alerts service personnel: isolate both AC and DC before servicing. Cert evidence bundle records the as-installed notice. Combined with Reg 570.6.8.201 (presence) + 570.6.8.202 (battery enclosure access) — three layers of warning signage.',
  },
  {
    id: 8,
    question:
      'A customer&rsquo;s installer hasn&rsquo;t fitted the Reg 570.6.8.201 warning notices at any of the three required locations. EICR-style review. What&rsquo;s the finding and remediation?',
    options: [
      'No issue',
      'EICR finding: non-compliance with Reg 570.6.8.201 — BESS warning notices missing at origin, metering position, and consumer unit. Coded per BS 7671 EICR coding (typically C3 improvement recommended — not immediate danger, but maintenance personnel + future inspectors need to know the BESS is present). Remediation: fit the three notices per Figure 57.1; update cert evidence bundle. Customer informed; install retrospectively compliant. May also be a major MCS audit finding',
      'Customer\'s fault',
      'Skip the notices',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 570.6.8.201 is mandatory for BESS-connected installs — three warning notice locations (origin, metering, CU). Missing notices = EICR finding, typically C3 (improvement recommended — install operates safely but lacks the warning required for safe future work / inspection). Remediation: fit notices per Figure 57.1; record in updated cert evidence bundle. MCS audit (for grant-funded installs) is more stringent — missing required signage may trigger a major audit finding. Best practice: include all three notices at install commissioning; photograph as part of cert evidence bundle. For retrofit / discovery cases: rectify promptly + record the rectification.',
  },
];

const faqs = [
  {
    question: 'Why does Chapter 57 reference so many warning notice locations?',
    answer:
      'Three independent reasons: (1) the install&rsquo;s ELECTRICAL ARCHITECTURE has multiple entry points — origin, metering, distribution — each needs to inform future inspectors / electricians that a BESS is present (Reg 570.6.8.201); (2) the BATTERY ENCLOSURE itself contains live parts that don&rsquo;t de-energise on isolation — physical access points need the warning (Reg 570.6.8.202); (3) the PCE has BOTH AC and DC live sides — service personnel need to isolate both (Reg 570.6.8.203). Different audiences (future installers, emergency responders, service engineers, customer) each need different information. The three regs together form a comprehensive signage strategy.',
  },
  {
    question: 'How does Reg 570.6.4 fault current interact with Reg 826.1.2.1 (Chapter 82) for hybrid PV+BESS?',
    answer:
      'Chapter 57\'s Reg 570.6.4 covers the BESS fault contribution specifically (battery + PCE). Chapter 82\'s Reg 826.1.2.1 covers PEI-level fault current — &ldquo;overload and short-circuit currents shall be determined at every point of the PEI where a protective device is installed: (a) for all possible configurations of each type of PEI; and (b) for situations corresponding to the minimum and maximum current magnitudes&rdquo;. Translation: the PEI designer combines the BESS contribution (570.6.4) with the PV contribution (712.x) and the DNO contribution to determine total fault current at every protective device. Cert evidence bundle records the integrated fault analysis.',
  },
  {
    question: 'For UK domestic LFP, do I need Type B RCD per Reg 570.6.2.2?',
    answer:
      'Read the PCE manufacturer datasheet. Reg 570.6.2.2 default: Type B unless the PCE provides simple separation (a), or external transformer separation (b), or the manufacturer states Type B not required (c). Most modern UK hybrid inverters (GivEnergy, Sigenergy, Solis, Tesla Powerwall 3, SolarEdge Energy Hub) state Type B is NOT required because the PCE provides internal simple separation. Type A or A+F adequate. Some older / non-isolated PCE topologies do require Type B. Cert evidence bundle records the manufacturer&rsquo;s RCD-type statement + the as-installed RCD type. Same logic as Reg 712.531.3.5.1 for PV — different reg, same principle.',
  },
  {
    question: 'What does &ldquo;simple separation&rdquo; mean in Chapter 57 context?',
    answer:
      'Simple separation = galvanic separation between two circuits provided by basic insulation (e.g. transformer winding separation). Not as strong as protective separation (which adds an earthed screen), but sufficient to prevent DC currents migrating between circuits. In BESS context: the PCE provides simple separation between AC side and DC battery side if it includes a transformer or equivalent isolated topology. The PCE manufacturer datasheet confirms. Some &ldquo;transformerless&rdquo; inverter topologies skip the transformer (lighter, cheaper, more efficient) but lose simple separation — those need Type B RCD + special earthing considerations.',
  },
  {
    question: 'Does the &ldquo;always live&rdquo; rule for BESS terminals (Reg 570.6.1.1.2) mean I can\'t safely work on a BESS?',
    answer:
      'You can work safely — but with the right discipline. The rule means the cells / monoblocs remain at terminal V regardless of isolation; you can\'t make them dead by switching. Safe work practice: (1) isolate at the battery DC isolator nearest the cells; (2) apply lock-out / tag-out per the manufacturer; (3) use insulated tools rated for the battery V; (4) test for absence of voltage at the cabling AFTER the isolator (not at the battery terminals — they&rsquo;re still live); (5) only access cells / terminals where the manufacturer&rsquo;s safe-work procedure permits (typically only manufacturer-certified engineers). UK domestic LFP customer-side maintenance is essentially nil; service is via manufacturer-trained engineers.',
  },
  {
    question: 'Reg 570.6.4.202 mentions &ldquo;inherently short-circuit and earth fault proof&rdquo; wiring. When does this apply?',
    answer:
      'Specific scenario: (a) the PCE does NOT include at least simple separation between battery DC and other sources; AND (b) the DC side is UNEARTHED. Both conditions together. In this case the DC wiring must be inherently fault-proof — single-core non-metallic-sheath cables, OR insulated conductors in individually-insulated conduit / trunking, OR equivalent. BS EN 50618 (the PV DC cable standard) is referenced as appropriate. Most UK domestic LFP BESS PCE provides simple separation, so this stricter wiring rule rarely binds — but where it does (specific transformerless / unearthed designs), the cabling spec changes materially.',
  },
  {
    question: 'How do the BESS warning notices interact with the PV system notices (Reg 712.514.101)?',
    answer:
      'The PV install gets its own notices per Reg 712.514.101 (PV PRESENT at origin / metering / CU). The BESS install gets its own notices per Reg 570.6.8.201 (BESS PRESENT at origin / metering / CU). For a hybrid PV+BESS install: both sets of notices required. They can be combined onto one notice (covering both PV + BESS) where space permits, but the information for both must be present. Plus Reg 826.1.1.4 (Chapter 82) multi-source isolation warning. Cert evidence bundle records all notice locations + contents.',
  },
  {
    question: 'PAS 63100:2024 vs Chapter 57 — how do they overlap?',
    answer:
      'Chapter 57 is the BS 7671 framework — regulatory authority. PAS 63100:2024 is the UK domestic-specific install specification — operational guidance. Reg 570.6.7.203 explicitly cross-references PAS 63100 for batteries in dwellings: &ldquo;Stationary secondary batteries in dwellings shall be installed in a suitable location taking account of manufacturer&rsquo;s instructions and PAS 63100.&rdquo; PAS 63100 covers: location (no habitable spaces, clearances, escape routes); fire detection requirements; ventilation specifics for UK climate; signage details; commissioning workflow. The competent UK domestic BESS install complies with BOTH — Chapter 57 sets the framework, PAS 63100 sets the install detail. Cert evidence bundle records compliance against both.',
  },
  {
    question: 'A customer asks if their existing pre-A4 install needs to be retrofitted to Chapter 57. What\'s the answer?',
    answer:
      'No retrospective compliance required. Existing installs commissioned under A3:2024 or earlier comply with the regs in force at commission — they don&rsquo;t become non-compliant when A4:2026 takes effect (15 April 2026). HOWEVER: any addition / alteration / replacement after the effective date triggers Chapter 57 compliance for the new work. EICR-style periodic inspection may flag the lack of Chapter 57 features (e.g. missing warning notices, single-isolator architecture) as informational findings — not immediate danger but informing the customer + the installer. Cert evidence bundle records the BS 7671 edition / amendment applied at commission + any subsequent updates.',
  },
];

export default function RenewableEnergyModule5Section3() {
  const navigate = useNavigate();

  useSEO({
    title: 'Chapter 57 protection deep dive | Renewable Energy 5.3 | Elec-Mate',
    description:
      'Chapter 57 protection deep dive — Reg 570.6.1.1.1 BS EN IEC 62485; 570.6.1.1.2 always-live; 570.6.1.1.3 PE bonding; 570.6.1.2.1/2 DC earthing + single-point; 570.6.2.2 Type B RCD; 570.6.3 ventilation; 570.6.4 fault current; 570.6.5 isolation; 570.6.7 hazards; 570.6.8.x warning notices.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 5
          </button>

          <PageHero
            eyebrow="Module 5 · Section 3 · BS 7671:2018+A4:2026 · Chapter 57"
            title="Chapter 57 protection deep dive"
            description="Every Reg 570.6.x sub-clause in full. BS EN IEC 62485 conformance, always-live cells, PE bonding, DC earthing + single-point rule, Type B RCD logic, ventilation, fault current, isolation, hazards, warning notices."
            tone="yellow"
          />

          <TLDR
            points={[
              'Reg 570.6.1.1.1 — BS EN IEC 62485 series conformance + bidirectional protective devices where appropriate. Anchors UK BESS install safety to the international standard family.',
              'Reg 570.6.1.1.2 — battery TERMINAL VOLTAGE always present; safe maintenance per BS EN IEC 62485. The cell side cannot be &ldquo;turned off&rdquo;; isolation is for safe-work separation only.',
              'Reg 570.6.1.1.3 — conductive battery racks / cabinets bonded to PE where ADS or PELV are protective measures; live parts accessible only to skilled / instructed persons.',
              'Reg 570.6.1.2.1 — DC live-conductor earthing permitted with simple separation between AC and DC. Reg 570.6.1.2.2 — TN-S + TT systems earthed at one point only (prevent circulating currents + amplified corrosion).',
              'Reg 570.6.2.1.201 — battery connections have basic protection (insulation / enclosure) where touch-V &gt;120V. Reg 570.6.2.2 — Type B RCD for AC supply UNLESS PCE provides simple separation OR manufacturer states otherwise.',
              'Reg 570.6.3 — ventilation per manufacturer instructions. LFP: heat removal + thermal-runaway clearances. Pb-acid: hydrogen-evolution ventilation per BS EN IEC 62485-2 Annex A.',
              'Reg 570.6.4 — DC fault current = battery contribution + PCE contribution. Reg 570.6.4.202 — inherently fault-proof wiring where PCE lacks simple separation AND DC side unearthed.',
              'Reg 570.6.5 — isolation per Section 462; both ends of every BESS power circuit. Reg 570.6.5.201 — all PCE power ports get isolators. Reg 570.6.7 — hazards (arcing/explosion + control-impairment-safety). Reg 570.6.7.201-203 — DC fuse access, location + ventilation, dwellings + PAS 63100.',
              'Reg 570.6.8.201-203 — three warning notices: BESS presence + location (origin, metering, CU); battery enclosure access (always-live warning); PCE (isolate both AC and DC).',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Apply Reg 570.6.1.1.1 BS EN IEC 62485 series conformance + bidirectional protective device principle.',
              'Apply Reg 570.6.1.1.2 always-live cells + safe maintenance procedure + Reg 570.6.8.202 warning notice.',
              'Apply Reg 570.6.1.1.3 PE bonding + skilled-persons-only access rule.',
              'Apply Reg 570.6.1.2.1 DC live-conductor earthing rule + Reg 570.6.1.2.2 single-point earthing for TN-S / TT.',
              'Apply Reg 570.6.2.2 Type B RCD rule + the three exceptions (PCE simple separation, transformer separation, manufacturer exemption).',
              'Apply Reg 570.6.3 ventilation per manufacturer instructions; recognise the LFP vs Pb-acid difference.',
              'Apply Reg 570.6.4 fault current = battery + PCE contributions; Reg 570.6.4.202 inherently fault-proof wiring condition.',
              'Apply Reg 570.6.5 + .5.201 isolation discipline; Reg 570.6.7 + .7.201-203 hazard protection + location + ventilation + PAS 63100.',
              'Apply Reg 570.6.8.201-203 three warning notice locations + content.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>Chapter 57 protection: BS EN IEC 62485 conformance + always-live cells + bidirectional OCPDs + three warning notices. Every sub-clause matters.</Pullquote>

          <ContentEyebrow>Reg 570.6.1.1.x — Foundational safety</ContentEyebrow>

          <ConceptBlock
            title="Reg 570.6.1.1.1 + 570.6.1.1.2 + 570.6.1.1.3 — three foundational regs"
            plainEnglish="The 570.6.1.1.x family sets the foundational safety principles: BS EN IEC 62485 conformance, always-live cell terminals, conductive-enclosure PE bonding + restricted access."
            onSite="UK domestic LFP BESS install: the BS EN IEC 62485 conformance comes via the manufacturer&rsquo;s product certification; the always-live cell terminal V is a hard physical reality; the PE bonding + restricted access is ensured by the manufacturer&rsquo;s enclosure design + the installer&rsquo;s correct connection."
          >
            <p>The three sub-regs together:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Reg 570.6.1.1.1</strong> — Stationary secondary battery installations shall conform to the relevant parts of the BS EN IEC 62485 series. Where appropriate, bidirectional protective devices shall be selected. Five parts in the 62485 family; -5 covers Li-ion stationary (the UK domestic reference)</li>
              <li><strong className="text-white">Reg 570.6.1.1.2</strong> — Voltage at the terminals of cells or monobloc batteries shall be assumed to be always present, and appropriate provisions for safe maintenance shall be provided in accordance with the BS EN IEC 62485 series</li>
              <li><strong className="text-white">Reg 570.6.1.1.3</strong> — Where ADS or PELV are protective measures, battery racks or battery cabinets made from conductive materials shall be connected to the protective conductor. Live parts only accessible to skilled and/or instructed persons</li>
              <li><strong className="text-white">Bidirectional protective device link</strong> — pairs with Reg 826.1.2.2 (Chapter 82): every OCPD at the BESS interface must operate on overcurrent regardless of direction (charge OR discharge)</li>
              <li><strong className="text-white">Always-live consequence</strong> — the battery cannot be &ldquo;de-energised&rdquo;; safe maintenance practices treat cells as live throughout</li>
              <li><strong className="text-white">Restricted access</strong> — the enclosure ensures casual touch cannot reach live cells; only competent persons access the cells; achieved via product design (sealed, tool-required access)</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 570.6.1.1.1, .1.1.2, .1.1.3 — Foundational safety"
            clause="570.6.1.1.1: Stationary secondary battery installations shall conform to the relevant parts of the BS EN IEC 62485 series. Where appropriate, bidirectional protective devices shall be selected. 570.6.1.1.2: Voltage at the terminals of cells or monobloc batteries shall be assumed to be always present, and appropriate provisions for safe maintenance shall be provided in accordance with the BS EN IEC 62485 series. 570.6.1.1.3: Where the protective measures of automatic disconnection of supply or extra-low voltage provided by PELV are used, battery racks or battery cabinets made from conductive materials shall be connected to the protective conductor. Irrespective of the nominal voltage, live parts of batteries, cells, monoblocs and related connections shall only be accessible to skilled and/or instructed persons."
            meaning="Three regs together set the foundational safety floor for any UK BESS install. .1.1.1 ties to BS EN IEC 62485 series (international standard for battery safety); UK domestic LFP refers primarily to Part -5. The bidirectional OCPD line is the cross-reference to Chapter 82&rsquo;s bidirectional protection principle (Reg 826.1.2.2). .1.1.2 reflects the physical reality of cells: terminal V is always present regardless of isolation; safe maintenance procedures account for this (insulated tools, lock-out, sequence). .1.1.3 requires PE bonding of conductive enclosures + restricted access to live cells. Cert evidence bundle records the BS EN IEC 62485 conformance declaration + the PE bonding test result + the enclosure access provisions."
          />

          <DiagramPlaceholder
            caption="Chapter 57 protection-reg map — central node BESS with branches to each 570.6.x sub-reg family. Foundational: 570.6.1.1.1 (BS EN IEC 62485) → 570.6.1.1.2 (always-live cells) → 570.6.1.1.3 (PE bonding + restricted access). Earthing: 570.6.1.2.1 (DC earthing permitted with simple separation) → 570.6.1.2.2 (single-point for TN-S/TT). Protective devices: 570.6.2.1.201 (battery connections basic protection) + 570.6.2.2 (Type B RCD rules). Hazards + location: 570.6.3 (ventilation) + 570.6.4 (fault current battery + PCE) + 570.6.5 (isolation both ends + all PCE ports) + 570.6.7 (arcing/explosion + control logic) → 570.6.7.201 (DC fuse access) + 570.6.7.202 (location + ventilation) + 570.6.7.203 (dwellings + PAS 63100). Notices: 570.6.8.201 (origin/metering/CU) + 570.6.8.202 (battery enclosure always-live) + 570.6.8.203 (PCE both-sides isolation)."
            filename="renewable/m5s3-chapter-57-reg-map.png"
          />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[1]} />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>Reg 570.6.1.2.x — Earthing</ContentEyebrow>

          <Pullquote>DC earthing permitted with simple separation. TN-S + TT: single-point earthing.</Pullquote>

          <ConceptBlock
            title="Reg 570.6.1.2.1 + 570.6.1.2.2 — DC earthing arrangement"
            plainEnglish="Two complementary regs covering battery DC earthing. .1.2.1 permits earthing of one of the live DC conductors IF simple separation exists between AC and DC. .1.2.2 mandates single-point earthing for TN-S and TT systems to prevent circulating currents."
            onSite="UK domestic LFP BESS: simple separation comes from the PCE/hybrid inverter&rsquo;s output transformer or isolated topology. The manufacturer specifies the DC earthing point (typically internal to the PCE). Installer doesn&rsquo;t add field earth connections to the DC side — single-point principle preserved."
          >
            <p>The two earthing regs in detail:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Reg 570.6.1.2.1</strong> — Earthing of one of the live conductors of the DC side is permitted, if there is at least simple separation between the AC side and the DC side. Mirrors Reg 712.312.2 for PV — same principle</li>
              <li><strong className="text-white">Simple separation</strong> — typically provided by the PCE&rsquo;s output transformer or isolated topology. &ldquo;Transformerless&rdquo; PCE doesn&rsquo;t provide simple separation; cannot use this earthing path</li>
              <li><strong className="text-white">Reg 570.6.1.2.2</strong> — To prevent circulating currents, TN-S and TT systems shall be earthed at one point only. The point of earthing shall take into account correct OCPD operation for final circuits</li>
              <li><strong className="text-white">NOTE 1</strong> — Connections with Earth on the DC side should avoid corrosion (BS EN 13636 + BS EN 15112)</li>
              <li><strong className="text-white">NOTE 2</strong> — Earthing might not be required if system other than TN or TT is used (e.g. IT — rare for UK domestic)</li>
              <li><strong className="text-white">Practical implementation</strong> — manufacturer specifies the single earth point (usually internal to PCE at DC midpoint or DC-); installer doesn&rsquo;t add field earth connections; cert evidence bundle records the earthing arrangement</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[3]} />

          <InlineCheck {...inlineChecks[4]} />

          <SectionRule />

          <ContentEyebrow>Reg 570.6.2.x — Basic protection + RCD</ContentEyebrow>

          <Pullquote>Type B RCD by default — unless the PCE manufacturer says otherwise (most modern UK domestic exempt).</Pullquote>

          <ConceptBlock
            title="Reg 570.6.2.1.201 + 570.6.2.2 — basic protection and RCD"
            plainEnglish="Two regs covering basic protection of battery connections and RCD type for the BESS AC supply circuit."
            onSite="UK domestic LFP BESS: battery enclosures provide insulation/enclosure-based basic protection per design. The Type B RCD decision comes down to the PCE manufacturer&rsquo;s statement: most modern hybrid inverters state Type A or A+F adequate due to internal simple separation."
          >
            <p>The two regs in detail:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Reg 570.6.2.1.201</strong> — Battery connections shall have basic protection by insulation or enclosures OR shall be arranged so that conductive parts having a potential difference exceeding 120 volts cannot be inadvertently touched simultaneously</li>
              <li><strong className="text-white">Practical for UK domestic LFP</strong> — battery enclosure is sealed; insulation + tool-required access provides basic protection automatically. Compliance is via the manufacturer&rsquo;s product certification</li>
              <li><strong className="text-white">Reg 570.6.2.2</strong> — Where an RCD is used for protection of the AC supply circuit, the RCD shall be Type B (BS EN 62423 or BS EN 60947-2), UNLESS: (a) the PCE provides at least simple separation between AC and DC sides; OR (b) at least simple separation provided between PCE and RCD via separate transformer windings; OR (c) the PCE manufacturer states a Type B RCD is not required</li>
              <li><strong className="text-white">Modern UK practice</strong> — most hybrid inverters specify Type A (or A+F) adequate via exception (a) or (c). Older transformerless / non-isolated topologies may require Type B. Read the PCE datasheet</li>
              <li><strong className="text-white">Why Type B sometimes mandatory</strong> — Type A detects AC residual + pulsating DC residual currents but not smooth DC. Smooth DC residual current can &ldquo;blind&rdquo; a Type A RCD if it exceeds the saturation threshold. Type B detects smooth DC residual too. Where the PCE could produce smooth DC residual flowing through the RCD, Type B is needed</li>
              <li><strong className="text-white">Cert evidence bundle</strong> — records the PCE manufacturer&rsquo;s RCD-type statement + the as-installed RCD type + the BS EN certification</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>Reg 570.6.3 + 570.6.4 — Ventilation + fault current</ContentEyebrow>

          <Pullquote>LFP: heat + clearances. Pb-acid: hydrogen ventilation. Fault current: battery + PCE.</Pullquote>

          <ConceptBlock
            title="Reg 570.6.3 — Protection against thermal effects (ventilation)"
            plainEnglish="The location or enclosure of stationary secondary batteries shall be adequately ventilated taking account of the manufacturer&rsquo;s instructions. The reg is technology-agnostic — the manufacturer instructions encode the technology-specific reality."
            onSite="UK domestic LFP: no gas evolution under normal operation; ventilation is for heat removal + thermal-runaway clearances. Pb-acid: hydrogen evolution during charging (especially equalisation); ventilation calculated per BS EN IEC 62485-2 Annex A. Plus PAS 63100:2024 adds UK domestic-specific requirements."
          >
            <p>Reg 570.6.3 in practice by chemistry:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">LFP normal operation</strong> — no gas evolution; ventilation focused on heat removal (LFP self-heats slightly during high-rate cycling). Manufacturer specifies clearances (typically 200-500 mm above + 100-200 mm sides)</li>
              <li><strong className="text-white">LFP thermal runaway scenario</strong> — produces CO, HF, flammable hydrocarbons; ventilation strategy is escape route + clearances from ignition sources + fire detection (PAS 63100)</li>
              <li><strong className="text-white">Pb-acid normal operation</strong> — hydrogen evolution during charging; full BS EN IEC 62485-2 Annex A calculation. Approx 2-3 mL H2 per Ah per cell during equalisation; ventilation volume calculated to keep H2 concentration below 4% lower explosive limit</li>
              <li><strong className="text-white">Pb-acid hazardous zone</strong> — typically 0.5 m radius around vents; explosion-proof fittings within zone</li>
              <li><strong className="text-white">NOTE: heating / cooling may also be necessary</strong> — battery temperature performance varies; some installs need active thermal management (rare for UK domestic LFP)</li>
              <li><strong className="text-white">Cert evidence bundle</strong> — records the manufacturer ventilation spec + clearances + PAS 63100 compliance (for UK dwellings)</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Reg 570.6.4 — DC fault current = battery + PCE contributions"
            plainEnglish="Determination of the battery prospective fault current shall take account of the contribution of the battery AND the PCE which charges it. The NOTE clarifies: where the fault current value is required for OCPD coordination, the LOWEST usable battery voltage should be taken into account."
            onSite="The battery contribution is the headline number: a multi-kWh LFP pack delivers 10-30 kA prospective ISC for milliseconds. The PCE adds a smaller but non-zero contribution. DC OCPDs must have breaking capacity ≥ combined fault current. Manufacturer datasheets provide both values; design pack records the calculation."
          >
            <p>Reg 570.6.4 + .4.201 + .4.202 in practice:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Battery contribution</strong> — 10-30 kA prospective ISC for typical multi-kWh LFP pack (specific to manufacturer + capacity)</li>
              <li><strong className="text-white">PCE contribution</strong> — current-limited at ~1.1-1.5&times; I_n during fault; additive to battery contribution</li>
              <li><strong className="text-white">OCPD selection</strong> — DC fuses (NH-style gG / aR / aM / gPV) or DC-rated MCBs (BS EN 60898-2 / BS IEC 60898-3) sized for combined breaking capacity</li>
              <li><strong className="text-white">Reg 570.6.4.201</strong> — wiring systems selected + erected to minimize earth-fault + short-circuit risk</li>
              <li><strong className="text-white">Reg 570.6.4.202</strong> — inherently short-circuit + earth-fault-proof wiring required where (a) PCE lacks simple separation between battery DC and other supplies AND (b) DC side unearthed. Single-core non-metallic-sheath, OR insulated conductors in insulated conduit, OR equivalent. BS EN 50618 (PV cable) appropriate</li>
              <li><strong className="text-white">Cert evidence bundle</strong> — records the fault analysis + the OCPD selection + the wiring system spec</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 570.6.3 + 570.6.4 — Thermal + fault current"
            clause="570.6.3: The location or enclosure of stationary secondary batteries shall be adequately ventilated taking account of the manufacturer&rsquo;s instructions. NOTE: To prevent damage to batteries, provisions of heating or cooling might also be necessary to maintain battery temperatures within a range specified by the battery manufacturer. 570.6.4: Determination of the battery prospective fault current shall take account of the contribution of the battery and the PCE which charges it. NOTE: Where the prospective fault current value is required to coordinate the disconnection with a protective device, for thermal effects and/or automatic disconnection of supply, the lowest usable battery voltage should be taken into account."
            meaning="Reg 570.6.3 mandates ventilation per manufacturer instructions — for LFP this is straightforward clearance compliance, for Pb-acid it&rsquo;s the BS EN IEC 62485-2 Annex A hydrogen calculation. Reg 570.6.4 sets the fault-current methodology: combined battery + PCE contributions. The NOTE on lowest usable V matters for OCPD coordination: as the battery discharges, the V drops; the fault current capability changes; the design analysis must consider the WORST case for the protective measure. UK domestic LFP: manufacturer datasheets provide both fault contributions; the competent designer calculates + records in cert evidence bundle."
          />

          <InlineCheck {...inlineChecks[6]} />

          <InlineCheck {...inlineChecks[7]} />

          <SectionRule />

          <ContentEyebrow>Reg 570.6.5 + 570.6.7 — Isolation + hazards</ContentEyebrow>

          <Pullquote>Isolation at both ends of every power circuit. All PCE power ports. DC fuse access restricted. Location per PAS 63100 for dwellings.</Pullquote>

          <ConceptBlock
            title="Reg 570.6.5 + 570.6.5.201 — Isolation discipline"
            plainEnglish="Every power circuit connecting to a BESS shall be provided with isolation per Section 462. The NOTE clarifies isolation likely required at both ends. Reg 570.6.5.201 expands: where the PCE is a separate unit, isolation provided for ALL PCE POWER PORTS."
            onSite="UK domestic LFP BESS install: typical isolators are (a) battery DC isolator (integral to battery or fitted close-coupled); (b) PCE AC output isolator (BS EN 60947-3 switch-disconnector at CU); (c) PCE DC input isolator (where battery + PCE separate units)."
          >
            <p>Reg 570.6.5 + 570.6.5.201 in detail:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Reg 570.6.5</strong> — Every power circuit connecting to a stationary secondary battery shall be provided with appropriate means of isolation conforming to Section 462</li>
              <li><strong className="text-white">NOTE both ends</strong> — Isolation likely required at both ends of the power circuit; achieved via combination of isolators within / external to manufacturer-supplied equipment</li>
              <li><strong className="text-white">Reg 570.6.5.201</strong> — To allow maintenance and replacement of PCE not incorporated in a battery assembly, a means of isolation shall be provided for all power ports of the PCE</li>
              <li><strong className="text-white">Practical UK install</strong> — battery DC isolator close to battery (often integral); PCE AC isolator at CU; PCE DC isolator at PCE side where battery + PCE separate units (modular HV stacks: battery has integral DC isolator at master module, PCE-side may be combined or separate)</li>
              <li><strong className="text-white">Switch-disconnector spec</strong> — BS EN 60947-3 for AC isolators; manufacturer-specific or BS EN 60947-3 DC-rated for DC isolators</li>
              <li><strong className="text-white">Cert evidence bundle</strong> — records each isolator location, manufacturer, model, rating</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Reg 570.6.7 + .7.201/.202/.203 — Protection against other hazards"
            plainEnglish="Reg 570.6.7 mandates protection against (a) arcing + explosion and (b) automatic / remote controls impairing installation safety. Sub-regs cover DC fuse access, location + ventilation, and the UK-specific PAS 63100 dwelling reference."
            onSite="UK domestic LFP BESS: manufacturer&rsquo;s product certification handles arcing/explosion mitigation through the enclosure design; the BMS handles control-logic safety. The location decision is the installer&rsquo;s responsibility per Reg 570.6.7.202 + .203 + PAS 63100."
          >
            <p>Reg 570.6.7 family in detail:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Reg 570.6.7</strong> — protection against (a) arcing + explosion, (b) automatic or remote controls impairing safety. References IEC TS 62933-5-1, BS EN IEC 62485, BS EN IEC 62933-5-2</li>
              <li><strong className="text-white">Reg 570.6.7.201</strong> — Fuses for DC circuits: accessible only by key/tool, OR fuses can only be removed after on-load DC isolator opened. Fuses should not be removed on load or replaced onto a fault</li>
              <li><strong className="text-white">Reg 570.6.7.202</strong> — Stationary secondary batteries located + ventilated per manufacturer instructions / safety data sheets. Ventilation shall not create a hazard (may require outdoor venting). Gas-evolving batteries at safe distance from arc/spark sources</li>
              <li><strong className="text-white">Reg 570.6.7.203</strong> — Stationary secondary batteries IN DWELLINGS: location per manufacturer instructions AND PAS 63100. Other premises: location + fire protection per fire strategy</li>
              <li><strong className="text-white">PAS 63100:2024 dwelling rules</strong> — no installation in habitable spaces (bedroom / lounge); clearances from windows / doors / escape routes; smoke / heat detector required; warning signage; fire strategy if multi-occupancy</li>
              <li><strong className="text-white">UK domestic LFP location options</strong> — garage (preferred), utility room, outbuilding, fire-rated external enclosure</li>
              <li><strong className="text-white">Cert evidence bundle</strong> — records the location decision + PAS 63100 compliance evidence + fire detection + signage</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Reg 570.6.8.x — Warning notices</ContentEyebrow>

          <Pullquote>Three notices: BESS presence (origin/metering/CU); battery enclosure always-live; PCE both-sides isolation.</Pullquote>

          <ConceptBlock
            title="Reg 570.6.8.201 + .202 + .203 — three mandatory warning notices"
            plainEnglish="Three warning-notice regs covering different audiences: .201 informs future inspectors that a BESS is present at the install; .202 informs personnel accessing the battery enclosure that cells remain live after isolation; .203 informs PCE service personnel to isolate both AC and DC sides before servicing."
            onSite="Cert evidence bundle photo-records each as-installed notice. The three notices are mandatory for any UK BESS install — missing notices = EICR / MCS finding."
          >
            <p>The three notice regs in detail:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Reg 570.6.8.201</strong> — Warning notice indicating the PRESENCE AND LOCATION of a BESS, fixed at: (a) origin of installation; (b) metering position (if remote); (c) consumer unit / distribution board connected to the BESS. Exception for fire-strategy installs: location can be omitted if plans available to fire+rescue. Example: Figure 57.1</li>
              <li><strong className="text-white">Reg 570.6.8.202</strong> — Permanent warning notice at each battery room / enclosure access point: live parts may be still energized after isolation. Example text: &ldquo;BATTERY - Live parts can remain energized after isolation&rdquo;. Yellow background, black text, warning triangle, Figure 57.3</li>
              <li><strong className="text-white">Reg 570.6.8.203</strong> — Warning notice fixed to all PCE: &ldquo;WARNING - Isolate both AC and DC sides before servicing&rdquo;</li>
              <li><strong className="text-white">Combined notices acceptable</strong> — for hybrid PV+BESS installs the PV notice (Reg 712.514.101) + BESS notice (570.6.8.201) can be combined onto one notice where space permits, provided both information sets present</li>
              <li><strong className="text-white">Photo evidence</strong> — cert evidence bundle includes photos of each as-installed notice; the install date + location annotated</li>
              <li><strong className="text-white">Common EICR finding</strong> — missing notices on retrofit installs is a typical EICR observation; remediation straightforward (fit notices + update bundle)</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 570.6.8.201, .202, .203 — Warning notices"
            clause="570.6.8.201: A warning notice indicating the presence and location of a stationary secondary battery system, shall be fixed: (a) at the origin of each electrical installation; (b) at each metering position, if remote from the origin; (c) at each consumer unit or distribution board to which a supply from a stationary secondary battery is connected. The location of stationary secondary batteries need not be provided on warning notices according to this regulation in installations covered by a fire strategy where plans, indicating the presence and location of each battery, are readily available to fire and rescue services and relevant operational personnel. 570.6.8.202: Each point of access to a battery room or each battery enclosure shall have a permanent warning notice indicating that live parts may be still energized after isolation, for example, by the text, &lsquo;BATTERY - Live parts can remain energized after isolation&rsquo;. 570.6.8.203: A warning notice shall be fixed to all PCE with words similar to the following: &lsquo;WARNING - Isolate both AC and DC sides before servicing&rsquo;."
            meaning="Three independent warning notice requirements covering three different audiences: (a) .201 informs future inspectors, emergency responders, and electricians arriving at the install that a BESS is present — at the origin, the metering position, and the consumer unit. The location of the battery is included unless a fire strategy + plans are available. (b) .202 informs personnel about to access the battery enclosure that cells remain live after isolation — pairs with Reg 570.6.1.1.2 always-live principle. (c) .203 informs PCE service personnel that BOTH AC and DC must be isolated before servicing — pairs with the DC side being the always-live battery. The three together form the BESS signage strategy. Cert evidence bundle records each as-installed notice."
          />

          <SectionRule />

          <ContentEyebrow>What it looks like in the wild</ContentEyebrow>

          <Scenario
            title="Comprehensive UK domestic BESS install — full Chapter 57 compliance"
            situation="Customer wants 10 kWh GivEnergy LFP BESS fitted alongside existing 5 kWp PV (existing Solis hybrid inverter, retrofitted by adding GivEnergy AC battery + AC isolator). Install in indoor utility room — 12-22°C year-round."
            whatToDo="Full Chapter 57 compliance package: (1) Reg 570.6.1.1.1 — verify GivEnergy BS EN IEC 62485 series conformance via product certification; (2) Reg 570.6.1.1.2 — recognise battery DC always live; install GivEnergy battery with integral DC isolator close to cells; (3) Reg 570.6.1.1.3 — verify battery enclosure PE bonded + sealed (no casual access to cells); (4) Reg 570.6.1.2.1 — DC earthing per GivEnergy spec (single point in PCE); (5) Reg 570.6.2.2 — RCD per GivEnergy spec (Type A adequate via simple separation exception); (6) Reg 570.6.3 — utility room ventilation per GivEnergy spec (manufacturer clearances respected); (7) Reg 570.6.4 — DC OCPDs sized for battery + PCE combined fault current (GivEnergy datasheet); (8) Reg 570.6.5 — battery DC isolator + PCE AC isolator at CU + PCE DC isolator at PCE; (9) Reg 570.6.7.203 — utility room satisfies PAS 63100:2024 dwelling location rules; (10) Reg 570.6.8.201 — warning notices at origin, metering, CU; (11) Reg 570.6.8.202 — &ldquo;BATTERY - Live parts can remain energized after isolation&rdquo; on battery enclosure; (12) Reg 570.6.8.203 — &ldquo;WARNING - Isolate both AC and DC sides before servicing&rdquo; on PCE. Cert evidence bundle: 12 photos covering all notices + isolator locations + manufacturer certificates + compliance statements."
            whyItMatters="Chapter 57 is a comprehensive framework — every install requires every sub-reg considered. The competent install isn&rsquo;t just &ldquo;fit the battery&rdquo; — it&rsquo;s a systematic Chapter 57 compliance package. UK domestic LFP makes this manageable (manufacturer products handle most physical implementation); the installer&rsquo;s job is verification + documentation. Cert evidence bundle is the install&rsquo;s long-term legibility."
          />

          <Scenario
            title="EICR finding — retrofit BESS missing all three warning notice sets"
            situation="EICR-style review of a 2-year-old BESS retrofit. Battery itself fitted correctly with PE bonding, isolators, and PCE notice — but the Reg 570.6.8.201 origin / metering / CU notices are all missing. Customer asks if the install is safe."
            whatToDo="Confirm safety: the install operates safely with isolation + protective measures in place; the warning notices are operational safeguards, not life-safety devices. EICR finding: typically C3 (improvement recommended) — install operates safely but lacks the future-information signage required by Reg 570.6.8.201. Remediation: fit three notices per Figure 57.1; update cert evidence bundle. Customer informed; install retrospectively compliant. Total remediation cost ~£20-50 for the notice labels + ~30 minutes installer time."
            whyItMatters="Warning notice compliance is THE most common EICR finding for BESS installs (especially retrofits). Easy to fix; high audit-trail impact. The competent installer treats notices as part of every BESS install commissioning checklist. The compliant install signals to future inspectors / electricians / emergency responders that the BESS is present + where + how to safely interact with it."
          />

          <CommonMistake
            title="Working on PCE DC terminals assuming the battery is &ldquo;dead&rdquo; after AC isolation"
            whatHappens="An electrician opens the PCE AC isolator (standard PV-style isolation) then opens the PCE casing to investigate a fault. They touch the DC terminals expecting them to be dead — but the battery DC is ALWAYS LIVE per Reg 570.6.1.1.2. Risk of significant shock (battery V can be 200-500V DC for HV LFP packs). Possible arc / injury if a short-circuit occurs."
            doInstead="Per Reg 570.6.1.1.2 + Reg 570.6.8.203 warning notice: always isolate BOTH AC AND DC before servicing the PCE. Sequence: (1) PCE off via app/control; (2) open battery DC isolator at the battery (or PCE-side DC isolator); (3) open PCE AC isolator at CU; (4) verify zero voltage at PCE terminals with approved voltage detector; (5) only then access PCE internals. Manufacturer-trained engineers follow this discipline; the warning notice on the PCE is the reminder. Cert evidence bundle documents the procedure for the customer information pack."
          />

          <CommonMistake
            title="Fitting BESS in habitable space (bedroom adjoining utility room)"
            whatHappens="Installer fits a 10 kWh LFP BESS in a customer&rsquo;s &ldquo;utility room&rdquo; — but the room shares a wall with a bedroom + has a door direct to a habitable space. PAS 63100:2024 rules: no installation in habitable spaces; clearances from sleeping areas. The install is non-compliant; EICR finding C2 (potentially dangerous) or even C1 (immediate danger) depending on the proximity + fire risk."
            doInstead="Per Reg 570.6.7.203 + PAS 63100:2024 — verify the install location BEFORE quoting. PAS 63100 rules for UK dwellings: no habitable spaces (bedroom, lounge, dining, kitchen typical); clearances from windows / doors / escape routes; smoke / heat detector in the BESS location, interconnected with dwelling alarm where present; fire-rated location or separation for multi-occupancy. Acceptable locations: garage, dedicated plant room, outbuilding, fire-rated external enclosure. The competent surveyor confirms location compliance at survey; cert evidence bundle records the location + the PAS 63100 compliance evidence."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Reg 570.6.1.1.1 — BS EN IEC 62485 series conformance + bidirectional protective devices where appropriate. Anchors UK BESS install safety to the international standard family.',
              'Reg 570.6.1.1.2 — battery terminal V always present; safe maintenance per BS EN IEC 62485 series; cells cannot be &ldquo;turned off&rdquo;.',
              'Reg 570.6.1.1.3 — conductive battery racks / cabinets bonded to PE; live parts accessible only to skilled / instructed persons.',
              'Reg 570.6.1.2.1 — DC live-conductor earthing permitted with simple separation between AC and DC. Mirrors Reg 712.312.2 for PV.',
              'Reg 570.6.1.2.2 — TN-S + TT systems earthed at one point only. NOTE 1 references BS EN 13636 / BS EN 15112 for corrosion prevention.',
              'Reg 570.6.2.1.201 — battery connections basic protection (insulation / enclosure) where touch-V &gt;120V.',
              'Reg 570.6.2.2 — Type B RCD for AC supply UNLESS PCE provides simple separation (a), external transformer separation (b), or manufacturer states otherwise (c). Modern UK hybrid inverters typically Type A adequate.',
              'Reg 570.6.3 — ventilation per manufacturer instructions. LFP: heat removal + clearances. Pb-acid: BS EN IEC 62485-2 Annex A hydrogen calculation.',
              'Reg 570.6.4 — DC fault current = battery contribution + PCE contribution. Reg 570.6.4.202 — inherently fault-proof wiring where PCE lacks simple separation AND DC side unearthed.',
              'Reg 570.6.5 + .5.201 — isolation per Section 462 at both ends of every power circuit + all PCE power ports get isolators.',
              'Reg 570.6.7 + .7.201/.202/.203 — protection against arcing/explosion + control-impairment + DC fuse access + location/ventilation + dwellings per PAS 63100.',
              'Reg 570.6.8.201 — three warning notices for BESS presence (origin, metering, CU). 570.6.8.202 — battery enclosure always-live notice. 570.6.8.203 — PCE both-sides-isolation notice.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 3 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-5-section-2')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 2
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                BMS, balancing, SoC/SoH
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-5-section-4')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.4 BS EN IEC 62485 + PAS 63100
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
