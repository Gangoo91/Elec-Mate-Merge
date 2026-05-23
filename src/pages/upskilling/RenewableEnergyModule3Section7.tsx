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
    id: 'm3s7-standard',
    question:
      'BS EN 62446-1:2016+A1:2018 is the UK / international standard for PV system commissioning. What does it cover?',
    options: [
      'Just visual inspection',
      'Documentation requirements, visual inspection, electrical test, commissioning test report, and Schedule of Test Results. Covers continuity testing, polarity verification, IV-curve measurement (recommended for larger installs), insulation resistance test, functional test of isolators and protective devices, and the baseline records for future diagnostic reference',
      'Just paperwork',
      'Inverter cleaning',
    ],
    correctIndex: 1,
    explanation:
      'BS EN 62446-1:2016+A1:2018 (the precise current reference) covers the full PV commissioning workflow: documentation requirements (design pack, single-line schematic, component schedule); visual inspection; electrical tests (continuity, polarity, insulation resistance, I-V curve, function test); commissioning test report; Schedule of Test Results. The standard ensures every PV install has a baseline record at commissioning that can be referenced in future EICR-style periodic inspections or fault investigations.',
  },
  {
    id: 'm3s7-continuity',
    question:
      'Continuity testing on the PV side per BS EN 62446-1 — what\'s being tested and what\'s the typical result?',
    options: [
      'Voltage only',
      'Continuity of the equipotential bonding (module frames to rail to bonding conductor to MET) and of the protective earthing (CPC). Tested with a continuity tester (R < 0.5 Ω typically). Confirms the bonding network is electrically continuous — no high-resistance joints from corrosion, loose torque, or missing anti-corrosion gel. Records the resistance measurement per cable segment in the Schedule of Test Results',
      'Customer satisfaction',
      'Module colour matching',
    ],
    correctIndex: 1,
    explanation:
      'Continuity testing per BS EN 62446-1 covers: (1) equipotential bonding continuity — module frame to rail, rail-to-rail joints, rail to bonding conductor, bonding conductor to MET — confirms the bonding network is electrically continuous; (2) protective earthing (CPC) continuity from the inverter chassis / metal enclosure back to the MET. Typical result for a good install: R < 0.5 Ω end-to-end. Higher resistances indicate corrosion, loose torque, missing anti-corrosion gel, or a poorly-terminated bonding conductor. The Schedule of Test Results records each measurement.',
  },
  {
    id: 'm3s7-polarity',
    question:
      'Polarity verification on the PV DC side. What\'s the discipline, and why does it matter?',
    options: [
      'Polarity doesn\'t matter',
      'Verify positive and negative connections at every interface — module to module, string to combiner, combiner to inverter. Reversed polarity at the inverter input damages the inverter; reversed polarity on a string would prevent normal operation. Test method: measure V_oc with multimeter at each interface, confirm polarity matches the design pack. The Schedule of Test Results records the measurements',
      'Inverter sorts it out',
      'No testing needed',
    ],
    correctIndex: 1,
    explanation:
      'Polarity verification is critical on the PV DC side. Reversed polarity at the inverter input typically damages the inverter (sometimes catastrophically — input diodes / MOSFETs fail). Reversed polarity on a string would prevent normal operation and could damage bypass diodes. Test: measure V_oc with a DC-rated multimeter at each interface (string output, combiner output, inverter input), confirm the measured voltage is positive when red probe on positive marking. The Schedule of Test Results records each measurement.',
  },
  {
    id: 'm3s7-iv-curve',
    question:
      'I-V curve measurement during commissioning. What does it show, and is it required for all installs?',
    options: [
      'Required for all installs',
      'The I-V curve shows the string\'s current vs voltage characteristic at the test conditions. Compared against modelled / nameplate expectation, identifies under-performing modules, shading, mismatch, and module-level faults. RECOMMENDED for larger installs (typically >10 kWp) and for commissioning installs where individual module performance verification is wanted. NOT mandatory for typical UK domestic — V_oc and I_sc string measurements suffice for the standard install',
      'Just for show',
      'No purpose',
    ],
    correctIndex: 1,
    explanation:
      'I-V curve measurement uses a dedicated I-V curve tracer to measure the string\'s full current-vs-voltage characteristic at the test conditions. Compared against the modelled curve (based on STC + irradiance correction + temperature correction), identifies under-performing modules, shading, mismatch, and module-level faults. BS EN 62446-1 recommends I-V curve for larger installs (>10 kWp) and for installs where individual module performance verification is wanted; for typical UK domestic, V_oc and I_sc string measurements per the standard\'s simpler test suffice. The Schedule of Test Results records the measurement type.',
  },
  {
    id: 'm3s7-ir-test',
    question:
      'Insulation resistance (IR) test on the PV DC side per BS EN 62446-1. What\'s the test voltage and pass criterion?',
    options: [
      'Test at 12 V',
      'Test voltage typically 500 V DC or 1,000 V DC for system V_oc_max up to 500 V or 1,000 V respectively (per the standard\'s table). Test method: array short-circuited at the inverter end; insulation resistance measured between (positive+negative tied) and earth. Pass criterion typically ≥1 MΩ for systems up to 100 kW. Lower IR indicates degraded insulation, water ingress, or earth fault — full investigation required',
      'No IR test',
      'Customer signature only',
    ],
    correctIndex: 1,
    explanation:
      'BS EN 62446-1 insulation resistance test: test voltage depends on system V_oc_max — 500 V DC test for systems up to V_oc_max 500 V; 1,000 V DC test for systems above. Test method: array short-circuited at the inverter end (positive and negative joined), IR meter measures resistance between this short and the earthing system. Pass criterion ≥1 MΩ for systems up to 100 kW. Lower IR indicates: degraded module insulation (one or more modules); water ingress at a connector or junction box; earth fault somewhere on the DC side. The Schedule of Test Results records the test voltage, measured IR, and the test conditions (irradiance, ambient temperature).',
  },
  {
    id: 'm3s7-functional',
    question:
      'Functional test of isolators and protective devices per BS EN 62446-1. What\'s being verified?',
    options: [
      'Visual inspection only',
      'Each isolator and protective device tested under simulated fault / operating conditions: DC isolator opens / closes under load (rated DC switching capability per BS EN 60947-3 DC-21); AC isolator / RCBO trips on simulated earth fault (RCD test button + manual trip test); string fuses verified by visual inspection and (where practical) electrical continuity. The Schedule of Test Results records each device\'s test result',
      'Skip the test',
      'Customer photographs only',
    ],
    correctIndex: 1,
    explanation:
      'Functional test of protective devices is a critical commissioning step per BS EN 62446-1. Each device tested: (1) DC isolator — open and close under load (verifies DC switching capability per BS EN 60947-3 DC-21); (2) AC isolator / RCBO — RCD test button operates and trips the device; manual trip test confirms the OCPD function; (3) string fuses (if fitted) — visual inspection for correct rating and type, electrical continuity test where practical. The Schedule of Test Results records each device\'s test result; failures trigger rectification before commissioning is complete.',
  },
  {
    id: 'm3s7-sotr',
    question:
      'The Schedule of Test Results (SoTR) per BS EN 62446-1 — what does it contain, and what\'s its purpose?',
    options: [
      'Just a sticker',
      'A structured record of every commissioning test result: continuity per cable / bonding segment; polarity per interface; V_oc / I_sc / V_mp / I_mp per string at test conditions; I-V curve (where measured); insulation resistance; functional test of each isolator and protective device. Provides the baseline record for future EICR diagnostic reference and the audit trail for MCS / DNO. Archived in the cert evidence bundle for the install life',
      'Customer\'s favourite biscuit',
      'No purpose',
    ],
    correctIndex: 1,
    explanation:
      'The Schedule of Test Results (SoTR) per BS EN 62446-1 is the structured record of every commissioning test result. Contains: continuity per cable / bonding segment; polarity per interface; V_oc / I_sc / V_mp / I_mp per string at test conditions (with the test irradiance / ambient temperature corrections); I-V curve (where measured); insulation resistance; functional test results for each isolator and protective device. Purposes: (1) baseline record for future EICR-style periodic inspection (compare measured against current values to diagnose degradation / faults); (2) audit trail for MCS audit; (3) handover document to the customer. Archived in the cert evidence bundle for the 25-year install life.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'During commissioning, the installer measures V_oc on a single string of 14 modules. Modelled V_oc at the test conditions (irradiance 600 W/m², cell temperature ~35°C) is 565 V. Measured V_oc is 540 V. Diagnose?',
    options: [
      'Install OK',
      'Within typical commissioning tolerance (~5%). 540 V vs modelled 565 V is a 4.4% difference — could be (a) modules cooler than estimated (V_oc rises at lower cell temperature, so cooler modules would actually give HIGHER V_oc — not the explanation here); (b) one module under-performing (V_oc per module ~38.6 V vs expected ~40.4 V); (c) test conditions slightly different from assumed; (d) measurement uncertainty. Acceptable for commissioning — record the result in the SoTR. If measured V_oc is more than 10% below modelled, investigate per-module',
      'Always fail',
      'Reject the install',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 62446-1 commissioning tolerance is typically ~5-10% on V_oc / I_sc measurements vs modelled. The 4.4% difference here is within the acceptable band — could be module-by-module variation, test condition uncertainty, or measurement uncertainty. Record in the SoTR with the test conditions. If measured V_oc were more than 10% below modelled, investigate per-module (which one is under-performing?) before commissioning. The Schedule of Test Results captures the measurement and the rationale for the result.',
  },
  {
    id: 2,
    question:
      'IR test on a 6 kWp PV install. System V_oc_max = 600 V. Test voltage chosen?',
    options: [
      '12 V',
      'Per BS EN 62446-1 — system V_oc_max 600 V is above the 500 V threshold for the 500 V DC test, so use 1,000 V DC test voltage. Test method: array short-circuited at the inverter; IR meter measures resistance between the (positive+negative tied) short and earth. Pass criterion ≥1 MΩ. Record measurement, test voltage, irradiance, ambient temperature in the SoTR',
      '500 V always',
      '10,000 V',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 62446-1 test voltage table: 500 V DC test for system V_oc_max ≤ 500 V; 1,000 V DC test for system V_oc_max > 500 V. The 6 kWp install with V_oc_max 600 V triggers the 1,000 V DC test. Pass criterion ≥1 MΩ for systems up to 100 kW. Test conditions (irradiance, ambient temperature) recorded with the measurement — IR varies with humidity and temperature, so the conditions matter for future diagnostic comparison.',
  },
  {
    id: 3,
    question:
      'Functional test of the DC isolator. The installer opens the isolator under load. The handle moves but the contacts don\'t fully separate (mechanical fault). Action?',
    options: [
      'Continue commissioning',
      'STOP. The DC isolator is the safety isolation between the array (live during daylight) and the inverter; a mechanical fault that prevents full contact separation is a safety hazard — the isolator can\'t safely break the circuit under load. Rectification: substitute the isolator with a correctly-functioning unit of the same or better spec (rated for V_oc_max, I_sc_max, BS EN 60947-3 DC-21 utilisation category). Re-test functional. Update the cert evidence bundle component schedule with the substitute. SoTR records the rectification',
      'Hammer it shut',
      'Bypass with a link',
    ],
    correctAnswer: 1,
    explanation:
      'DC isolator failure during commissioning is a safety-critical finding. The isolator is the primary safety isolation for the DC side; a mechanical fault preventing full contact separation means the isolator can\'t safely break the circuit under load. Rectification: substitute with a correctly-functioning isolator. The substitute must match the spec — V_oc_max, I_sc_max, BS EN 60947-3 DC-21. The SoTR records the rectification.',
  },
  {
    id: 4,
    question:
      'Continuity test on the equipotential bonding. The measured resistance from a module frame to the MET is 2.5 Ω. Pass or fail?',
    options: [
      'Pass',
      'FAIL. Typical BS EN 62446-1 pass criterion is R < 0.5 Ω end-to-end for bonding continuity. 2.5 Ω is high — indicates a high-resistance joint somewhere in the chain (corrosion at a rail joint, loose torque on a bonding clamp, missing anti-corrosion gel, broken / damaged bonding conductor). Investigate: isolate the section, re-test the module-to-rail link, rail-to-rail joints, rail-to-bonding-conductor, bonding-conductor-to-MET. Rectify the high-resistance joint. Re-test',
      'Customer\'s choice',
      'No criterion exists',
    ],
    correctAnswer: 1,
    explanation:
      'Continuity pass criterion per BS EN 62446-1 is typically R < 0.5 Ω end-to-end for the bonding network. 2.5 Ω is 5× the threshold — fail. Causes: (a) high-resistance joint at rail-to-rail (corrosion, missing anti-corrosion gel); (b) loose torque on a bonding clamp; (c) damaged bonding conductor (kink, cut, water ingress at termination). Diagnose by testing in sections — measure module-to-rail, rail-to-rail joints individually, rail-to-bonding-conductor, bonding-conductor-to-MET. Identify the high-R section, rectify, re-test, re-record in the SoTR.',
  },
  {
    id: 5,
    question:
      'I-V curve measurement on a 10 kWp commercial install. One string\'s measured I-V curve shows a distinct "step" partway down the curve. Diagnose?',
    options: [
      'Normal',
      'The "step" indicates one or more modules in the string are bypassed by their bypass diodes — likely partial shading on the module, or a module-level fault (cracked cells, mismatched module). Walk the array and identify the affected modules. Action: (a) if shading — confirm with shade-analysis tool, consider module-level optimisation retrofit; (b) if cracked module — replace the module, re-test; (c) if installation fault — rectify and re-test. The SoTR records the I-V curve and the diagnostic finding',
      'I-V curves always have steps',
      'No issue',
    ],
    correctAnswer: 1,
    explanation:
      'A distinct "step" in the I-V curve indicates bypass-diode activation — one or more cell groups in the string are bypassed. Causes: (a) partial shading on the affected modules (confirm with shade-analysis tool); (b) module-level fault (cracked cells, mismatched module type / size, faulty bypass diode that\'s permanently bypassed); (c) installation fault (broken connection within a module, shading from a localised obstruction). Diagnose by walking the array, identifying the affected modules, and matching to root cause. The SoTR records the I-V curve characteristic and the diagnostic outcome.',
  },
  {
    id: 6,
    question:
      'BS EN 62446-1 IR test result on a 6 kWp install: measured IR = 0.3 MΩ at 1,000 V test voltage. Pass or fail?',
    options: [
      'Pass',
      'FAIL — below the 1 MΩ pass criterion for systems up to 100 kW. Investigation triggers: (a) is the test condition aggravating — high humidity, recent rain, condensation on modules / connectors? Re-test in dry conditions; (b) module-level fault — degraded insulation in one or more modules; (c) earth fault somewhere on the DC side — accidental connection between live DC and earth via damaged cable / connector / module backsheet. Isolate sections to localise; rectify; re-test. SoTR records the result',
      'No criterion',
      'Always pass',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 62446-1 IR pass criterion ≥1 MΩ for systems up to 100 kW. 0.3 MΩ is below — fail. Investigation: (1) test conditions — high humidity / rain / condensation aggravate IR; re-test in dry conditions; (2) module-level fault — degraded insulation in one or more modules (rare at commissioning); (3) earth fault on the DC side — damaged cable / connector / module backsheet creating an inadvertent DC-to-earth path. Diagnose by sectioning: test per string, per cable run, per module. Localise the fault; rectify; re-test; re-record in SoTR.',
  },
  {
    id: 7,
    question:
      'Polarity test at the inverter DC input. The installer measures DC voltage with multimeter red probe on the "+" terminal of the inverter input. Reading = -540 V. Action?',
    options: [
      'Connect anyway',
      'STOP — polarity reversed. Reverse polarity at the inverter input typically destroys the inverter on energisation (input diodes / MOSFETs fail). Investigation: (1) trace the DC cable back from the inverter input to the combiner / string output, identifying where the polarity reversal occurred; (2) rectify the connection (swap positive and negative at the affected interface); (3) re-test polarity; (4) only then proceed with inverter energisation. The SoTR records the polarity finding and the rectification',
      'Reverse the inverter',
      'Hammer it in',
    ],
    correctAnswer: 1,
    explanation:
      'Reverse polarity at the inverter DC input is a high-consequence install fault — typically destroys the inverter on energisation. The polarity test at the inverter input catches this BEFORE energisation, allowing rectification. Investigation: trace the DC cable from inverter back to combiner / string output; identify where positive and negative were swapped; rectify the connection; re-test polarity. The SoTR records the finding and the rectification. The cert evidence bundle archives the corrected as-installed wiring.',
  },
  {
    id: 8,
    question:
      'Commissioning completion. The Schedule of Test Results (SoTR) is signed off. What\'s the next step in the cert evidence bundle?',
    options: [
      'Throw it away',
      'Customer handover pack. The cert evidence bundle assembles: (1) MCS MIS 3002 design pack (site survey, modelling, schematic, schedule, calculations); (2) install photographs (DC, AC, mounting, flashing, labels); (3) BS EN 62446-1 commissioning records and SoTR; (4) MCS certificate; (5) EREC G98 / G99 notification / approval; (6) DNO confirmation; (7) customer information pack (operating, maintenance, warranty, emergency contacts). Customer signs receipt of the handover pack; bundle archived for the install life',
      'Customer never sees it',
      'Skip handover',
    ],
    correctAnswer: 1,
    explanation:
      'After commissioning, the cert evidence bundle is assembled and handed over to the customer. Contents: (1) MCS MIS 3002 design pack; (2) install photographs; (3) BS EN 62446-1 commissioning records and SoTR; (4) MCS certificate; (5) EREC G98 / G99 notification / approval; (6) DNO confirmation; (7) customer information pack (operating manual, maintenance schedule, warranty details, emergency contacts). Customer signs receipt; the bundle is archived for the install life (typically 25 years). Section 8 covers the integrated reading of the bundle — every Section 712 clause mapped to the bundle\'s evidence.',
  },
];

const faqs = [
  {
    question: 'How does BS EN 62446-1:2016+A1:2018 relate to BS 7671 Section 712?',
    answer:
      'BS 7671 Section 712 sets the regulatory framework for PV electrical installations (design, install, protection, isolation, bonding). BS EN 62446-1 sets the commissioning testing standard — the standardised methodology for verifying the install at handover. They\'re complementary: Section 712 says what the install must achieve; BS EN 62446-1 says how to test that it achieves it. The cert evidence bundle includes both — the Section 712 compliance design pack AND the BS EN 62446-1 commissioning records.',
  },
  {
    question: 'When was BS EN 62446-1:2016+A1:2018 published, and is it still current?',
    answer:
      'BS EN 62446-1 was originally published in 2016; Amendment 1 (A1) was published in 2018, updating clauses for newer module / inverter technology and clarifying the test methodology. The current reference is BS EN 62446-1:2016+A1:2018. A revision is in progress as of 2026; for now, the 2016+A1:2018 version is the operational standard. The MCS MIS 3002 design pack and the cert evidence bundle should reference the precise current edition.',
  },
  {
    question: 'How are the test conditions (irradiance, temperature) factored into the V_oc / I_sc measurements?',
    answer:
      'BS EN 62446-1 doesn\'t require commissioning tests at STC (1,000 W/m², 25°C cell temp) — clearly impractical for typical UK commissioning visits. Test conditions: whatever the actual irradiance and temperature on the day. The measured V_oc / I_sc are recorded WITH the test conditions in the SoTR. The standard provides correction formulae to translate measured values to equivalent-STC values for comparison against the nameplate / design pack. The MCS auditor reads the SoTR with the corrections to verify the as-installed performance.',
  },
  {
    question: 'Does every UK domestic PV install need I-V curve measurement?',
    answer:
      'No — BS EN 62446-1 recommends I-V curve measurement for larger installs (typically >10 kWp) and for installs where individual module performance verification is wanted. For typical UK domestic (<10 kWp), the simpler V_oc / I_sc per-string measurement suffices. I-V curve tracers are specialised tools — typically £2,000-£8,000 — outside the standard van inventory for small installers. Commercial / industrial installs typically have access to the tool through specialist commissioning contractors.',
  },
  {
    question: 'What\'s the IR test methodology for a multi-string install?',
    answer:
      'Two approaches per BS EN 62446-1: (1) test the whole array as one — short-circuit the array at the inverter input, measure IR from this short to earth; (2) test per-string — short each string at its combiner connection, measure IR per-string. Method (2) localises any IR fault to a specific string; method (1) is quicker for fault-free installs. The SoTR records the methodology and per-segment results.',
  },
  {
    question: 'How does the SoTR support future EICR-style periodic inspection?',
    answer:
      'The SoTR is the BASELINE record. Future EICR-style periodic inspection (typically 5-yearly for a PV install) measures the same values — V_oc / I_sc per string, IR, continuity, functional tests — and compares against the SoTR baseline. Degradation, faults, or operational issues show up as deviations from the baseline. Without the baseline, the inspector has no reference for "is this normal" — making fault diagnosis significantly harder. The SoTR is therefore archived for the install life and made available to subsequent inspectors.',
  },
  {
    question: 'Who is qualified to commission a PV install per BS EN 62446-1?',
    answer:
      'BS EN 62446-1 doesn\'t specify a competency requirement directly — but the MCS MIS 3002 scheme requires the commissioning to be performed by an MCS-certified contractor with appropriate PV competency (typically City & Guilds Level 3 PV qualifications, or equivalent). The cert evidence bundle records the commissioning contractor\'s MCS reference and the named commissioning engineer. For commercial / large installs, additional competency requirements may apply (NICEIC commercial / industrial scheme, AC + DC switching qualifications, working-at-height training).',
  },
  {
    question: 'What if the IR test triggers an inverter\'s earth-leakage detection during the test?',
    answer:
      'Modern transformerless inverters often have earth-leakage detection that may trigger during an IR test on the connected DC side. Standard practice: disconnect the inverter from the DC during the IR test — IR meter applies test voltage to the disconnected DC side, no interaction with the inverter. Reconnect after IR test, verify normal inverter operation. The SoTR records the test method (with inverter disconnected) and the measured IR.',
  },
  {
    question: 'How does the IET CoP for Grid-Connected Solar PV Installations operationalise BS EN 62446-1?',
    answer:
      'The IET CoP (5th edition) provides operational guidance on BS EN 62446-1: detailed test methodology, example SoTR templates, photo / record-keeping discipline, troubleshooting common findings (e.g. failed IR, unusual I-V curve features), and integration with the MCS MIS 3002 design pack and the cert evidence bundle. The MCS-certified contractor typically uses the IET CoP as the day-to-day commissioning reference; the cert evidence bundle records the methodology source.',
  },
];

export default function RenewableEnergyModule3Section7() {
  const navigate = useNavigate();

  useSEO({
    title:
      'BS EN 62446-1 commissioning & test results | Renewable Energy 3.7 | Elec-Mate',
    description:
      'PV commissioning per BS EN 62446-1:2016+A1:2018 — continuity, polarity, V_oc / I_sc per string, I-V curve, insulation resistance, functional test of isolators and protective devices, Schedule of Test Results, baseline records for future diagnostic reference.',
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
            eyebrow="Module 3 · Section 7 · BS 7671:2018+A4:2026 · BS EN 62446-1:2016+A1:2018"
            title="BS EN 62446-1 commissioning & test results"
            description="The commissioning evidence pack — continuity, polarity, V_oc / I_sc per string, I-V curve, insulation resistance, functional test of isolators and protective devices, Schedule of Test Results, and the baseline records for future diagnostic reference."
            tone="yellow"
          />

          <TLDR
            points={[
              'BS EN 62446-1:2016+A1:2018 is the operational standard for PV system commissioning — documentation, visual inspection, electrical test, commissioning test report, Schedule of Test Results.',
              'Commissioning test suite: continuity (bonding + CPC, R < 0.5 Ω typical); polarity (every interface, multimeter measurement); V_oc / I_sc per string at test conditions; I-V curve for larger installs; insulation resistance (500 V or 1,000 V test, ≥1 MΩ pass); functional test of isolators and protective devices.',
              'Polarity reversal at the inverter input destroys the inverter on energisation. Polarity test BEFORE energisation catches and rectifies the fault — the SoTR records the finding.',
              'IR test pass criterion ≥1 MΩ for systems up to 100 kW. Below 1 MΩ triggers investigation — test conditions, module fault, or earth fault on the DC side. Localise by sectioning the test.',
              'Functional test of DC isolator, AC isolator / RCBO, string fuses — each verified under simulated fault / operating conditions. DC isolator must rate for BS EN 60947-3 DC-21.',
              'Schedule of Test Results (SoTR) is the structured record of every commissioning test result. Baseline for future EICR-style periodic inspection; audit trail for MCS; handover to customer in the cert evidence bundle.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Plan and execute a BS EN 62446-1:2016+A1:2018 commissioning test sequence for a UK domestic PV install.',
              'Test continuity of the equipotential bonding and protective earthing — confirm R < 0.5 Ω end-to-end.',
              'Verify polarity at every DC interface — string output, combiner output, inverter input — before energisation.',
              'Measure V_oc / I_sc per string at the test conditions and translate to equivalent-STC for comparison against modelled / nameplate.',
              'Run the BS EN 62446-1 insulation resistance test at the correct test voltage (500 V or 1,000 V) and confirm IR ≥ 1 MΩ.',
              'Functionally test the DC isolator, AC isolator / RCBO, and string fuses; record results in the Schedule of Test Results.',
              'Assemble the BS EN 62446-1 commissioning records into the cert evidence bundle alongside the MCS MIS 3002 design pack.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>Continuity. Polarity. V_oc. I_sc. IR. Function. SoTR.</Pullquote>

          <ContentEyebrow>BS EN 62446-1:2016+A1:2018 — the commissioning standard</ContentEyebrow>

          <ConceptBlock
            title="What BS EN 62446-1 covers"
            plainEnglish="The international / UK standard for PV system commissioning. Specifies documentation requirements, visual inspection, electrical tests, commissioning test report content, and the Schedule of Test Results structure."
            onSite="Used by MCS-certified contractors as the operational commissioning methodology. The IET CoP for Grid-Connected Solar PV Installations expands the standard\'s requirements with worked examples, templates, and troubleshooting guidance."
          >
            <p>The standard\'s structure:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Documentation requirements</strong> — design pack, single-line schematic, component schedule, manufacturer datasheets, MCS cert</li>
              <li><strong className="text-white">Visual inspection</strong> — physical install inspection: module mounting, cable routing, connector engagement, labels, isolator accessibility</li>
              <li><strong className="text-white">Electrical tests</strong> — continuity, polarity, V_oc / I_sc per string, I-V curve (recommended for larger installs), insulation resistance, functional test of isolators / protective devices</li>
              <li><strong className="text-white">Commissioning test report</strong> — narrative summary of the commissioning visit, findings, rectifications</li>
              <li><strong className="text-white">Schedule of Test Results</strong> — structured record of every test result, including test conditions, methodology, pass / fail criterion, measured value</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 712.6.101 — Inspection and testing"
            clause="Inspection and testing. NOTE: Having complied with the relevant requirements of Part 6, additional requirements for system documentation, commissioning tests and inspection are given in BS EN 62446 series."
            meaning="Reg 712.6.101 is the formal regulatory authority for the BS EN 62446 commissioning workflow. BS 7671 Part 6 sets the general inspection / testing framework; the BS EN 62446 series (specifically BS EN 62446-1:2016+A1:2018) adds PV-specific documentation, commissioning tests, and inspection requirements. Both must be satisfied: the cert evidence bundle includes both the BS 7671 Part 6 inspection records AND the BS EN 62446-1 commissioning records."
          />

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>Continuity — equipotential bonding and CPC</ContentEyebrow>

          <Pullquote>R &lt; 0.5 Ω end-to-end. Bonding network electrically continuous.</Pullquote>

          <ConceptBlock
            title="Continuity test methodology"
            plainEnglish="Continuity tester measures resistance from a metal frame at the array back to the building Main Earthing Terminal (MET). Confirms the bonding network is electrically continuous, with no high-resistance joints."
            onSite="Test instrument: low-resistance ohmmeter (continuity tester) with sufficient test current (typically 200 mA). Test from each module frame (or representative frames) back to the MET. Record per-segment resistance in the SoTR; investigate any reading above 0.5 Ω."
          >
            <p>Continuity test workflow:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Module-to-rail</strong> — measure resistance from module frame (test probe on frame) to nearest rail (test probe on rail). Confirms module clamp electrical contact</li>
              <li><strong className="text-white">Rail-to-rail joints</strong> — measure across each rail joint. Confirms anti-corrosion gel applied and torque correct</li>
              <li><strong className="text-white">Rail-to-bonding conductor</strong> — measure from rail to the start of the dedicated bonding conductor</li>
              <li><strong className="text-white">Bonding conductor end-to-end</strong> — measure full length from rail termination to inverter / MET termination</li>
              <li><strong className="text-white">Inverter chassis to MET</strong> — measure the inverter CPC continuity</li>
              <li><strong className="text-white">Each section recorded in SoTR</strong> — section identifier, measured R, pass / fail (against 0.5 Ω criterion)</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>Polarity — every DC interface</ContentEyebrow>

          <Pullquote>Polarity test before energisation. Reverse polarity at inverter input = inverter destroyed.</Pullquote>

          <ConceptBlock
            title="Polarity verification methodology"
            plainEnglish="Polarity test: multimeter on DC voltage range, red probe on positive, black on negative — confirm positive voltage reading. Repeat at every DC interface (string output, combiner output, inverter input)."
            onSite="Critical to test BEFORE inverter energisation. Reverse polarity at the inverter input typically destroys the inverter on first energisation. The test catches and allows rectification."
          >
            <p>Polarity test workflow:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">String output</strong> — multimeter red probe on string positive, black on string negative. Expected: positive V_oc reading (typical 300-600 V for UK domestic). Negative reading = reversed string polarity at the modules / module-to-module connections</li>
              <li><strong className="text-white">Combiner output</strong> — multimeter on combiner output positive and negative. Same expected positive reading. Reversal indicates a combiner internal mis-wiring</li>
              <li><strong className="text-white">Inverter input</strong> — multimeter on inverter input positive and negative. Same expected positive reading. Reversal would destroy the inverter on energisation</li>
              <li><strong className="text-white">Record in SoTR</strong> — measured V_oc per interface with confirmed polarity</li>
              <li><strong className="text-white">Rectification before energisation</strong> — any reversal traced back to source; corrected; re-tested</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>V_oc / I_sc per string — and the I-V curve option</ContentEyebrow>

          <Pullquote>Measure V_oc / I_sc at test conditions. Translate to equivalent-STC. Compare against design.</Pullquote>

          <ConceptBlock
            title="V_oc / I_sc per string at test conditions"
            plainEnglish="Multimeter (or PV-specific tester) measures V_oc (string open-circuit voltage) and I_sc (string short-circuit current) at the test conditions on the day. Record the measured values WITH the test irradiance and ambient temperature in the SoTR."
            onSite="UK domestic commissioning typical conditions: irradiance 200-800 W/m², ambient 5-20°C, cell temp 10-35°C. The measured V_oc / I_sc will be lower than STC nameplate (lower irradiance, possibly higher cell temp). Translate to equivalent-STC using the standard\'s correction formulae for comparison against design."
          >
            <p>The translation workflow:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Measure V_oc / I_sc</strong> — at test conditions, recorded with irradiance and ambient / cell temperature</li>
              <li><strong className="text-white">Correct V_oc to STC</strong> — V_oc rises at low temperature: V_oc (STC) = V_oc (measured) − V_oc_coefficient × (25°C − cell_temp_at_test)</li>
              <li><strong className="text-white">Correct I_sc to STC</strong> — I_sc rises linearly with irradiance: I_sc (STC) = I_sc (measured) × 1000 / measured_irradiance</li>
              <li><strong className="text-white">Compare against design / nameplate</strong> — typical tolerance ±5-10% on V_oc / I_sc per string</li>
              <li><strong className="text-white">Larger deviations</strong> — investigate per-module before completing commissioning</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="I-V curve measurement — when to use it"
            plainEnglish="I-V curve tracer measures the string\'s full current-vs-voltage characteristic — not just V_oc and I_sc. Compared against modelled I-V curve, identifies per-module faults, shading patterns, mismatch."
            onSite="BS EN 62446-1 RECOMMENDS I-V curve for larger installs (>10 kWp) and where individual module performance verification is wanted. For typical UK domestic, V_oc / I_sc per string suffices. I-V tracers cost £2,000-£8,000 — typically used by commercial / industrial commissioning specialists, not van inventory."
          >
            <p>I-V curve features and what they reveal:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Smooth curve, V_oc and I_sc as modelled</strong> — install OK</li>
              <li><strong className="text-white">"Step" partway down the curve</strong> — bypass diode activated; partial shading, cracked module, mismatched module</li>
              <li><strong className="text-white">Low MPP power</strong> — module degradation or installation fault reducing string output below expected</li>
              <li><strong className="text-white">Low fill factor</strong> — series resistance increase; loose connection, corroded connector, module damage</li>
              <li><strong className="text-white">Low V_oc</strong> — one or more modules under-performing; investigate per-module</li>
            </ul>
          </ConceptBlock>

          <DiagramPlaceholder
            caption="I-V curve commissioning examples — four panels. Panel 1 (good install): smooth curve, V_oc and I_sc at modelled values. Panel 2 (partial shading): &lsquo;step&rsquo; partway down indicating bypass-diode activation. Panel 3 (low MPP): smooth shape but lower peak power than modelled. Panel 4 (loose connection): low fill factor, distorted curve shape near V_oc."
            filename="renewable/m3s7-iv-curves.png"
          />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>Insulation resistance (IR) — Reg 712.6.1 + BS EN 62446-1</ContentEyebrow>

          <Pullquote>500 V test for V_oc_max ≤ 500 V; 1,000 V test for higher. Pass ≥1 MΩ.</Pullquote>

          <ConceptBlock
            title="IR test methodology per BS EN 62446-1"
            plainEnglish="IR meter applies high DC test voltage between the array (short-circuited at the inverter end) and earth. Measures the insulation resistance — confirms no inadvertent path between DC live and earth."
            onSite="Test voltage depends on system V_oc_max — 500 V test for ≤500 V V_oc_max systems; 1,000 V test for higher. Pass criterion ≥1 MΩ for systems up to 100 kW."
          >
            <p>IR test workflow:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Disconnect inverter from DC</strong> — modern transformerless inverters\' earth-leakage detection can interfere; disconnect to isolate the IR test to the array side</li>
              <li><strong className="text-white">Short-circuit the array at the inverter end</strong> — join positive and negative DC conductors with a temporary jumper</li>
              <li><strong className="text-white">Connect IR meter</strong> — between the temporary short (positive+negative joined) and the bonding / earth conductor</li>
              <li><strong className="text-white">Select test voltage</strong> — 500 V DC for ≤500 V V_oc_max system; 1,000 V DC for higher</li>
              <li><strong className="text-white">Apply test voltage</strong> — typically for ~10 seconds; record the measured IR</li>
              <li><strong className="text-white">Pass criterion</strong> — ≥1 MΩ for systems up to 100 kW</li>
              <li><strong className="text-white">Record in SoTR</strong> — test voltage, measured IR, test conditions (irradiance, ambient temperature, humidity)</li>
              <li><strong className="text-white">Reconnect inverter</strong> — after test complete; verify normal inverter operation</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Sub-1 MΩ findings — investigation workflow"
            plainEnglish="A failed IR test (below 1 MΩ) indicates degraded insulation or an earth fault. Localise the fault by sectioning the test."
            onSite="Most common causes: (a) high humidity / condensation at test conditions (re-test in dry conditions); (b) damaged cable or connector creating a DC-to-earth path; (c) damaged module backsheet."
          >
            <p>Sub-1 MΩ investigation:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Step 1 — Re-test in dry conditions</strong> — if test conditions were humid / wet, condensation aggravates IR. Dry conditions and re-test</li>
              <li><strong className="text-white">Step 2 — Test per string</strong> — disconnect strings at combiner; test each string separately. Localises fault to one string</li>
              <li><strong className="text-white">Step 3 — Test per cable run</strong> — within the faulty string, disconnect and test the DC cable separately (no modules connected) and the modules separately. Localises to cable or module</li>
              <li><strong className="text-white">Step 4 — Test per module</strong> — within the faulty section, test modules individually. Identifies the specific module with degraded insulation</li>
              <li><strong className="text-white">Rectification</strong> — repair / replace the affected component (cable, connector, module); re-test; re-record in SoTR</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 62446-1:2016+A1:2018 — insulation resistance test"
            clause="The insulation resistance between the DC system and earth shall be measured at a test voltage determined by the maximum system voltage. For systems with V_oc_max up to 500 V, the test voltage shall be 500 V DC; for systems above, 1,000 V DC. The minimum acceptable insulation resistance for systems up to 100 kW is 1 MΩ."
            meaning="BS EN 62446-1 IR test ensures the DC side has no inadvertent path to earth. Test voltage matches system V_oc_max; 1 MΩ minimum is the universal pass criterion for systems up to 100 kW. Test conditions (humidity, temperature) recorded with the measurement for future diagnostic comparison."
          />

          <InlineCheck {...inlineChecks[4]} />

          <SectionRule />

          <ContentEyebrow>Functional test of isolators and protective devices</ContentEyebrow>

          <Pullquote>DC isolator under load. AC RCD via test button. String fuses inspected.</Pullquote>

          <ConceptBlock
            title="Functional test methodology"
            plainEnglish="Each isolator and protective device is tested under simulated operating / fault conditions. Confirms the device operates correctly in the intended use cases."
            onSite="Critical for safety: failed isolators / RCDs mean the install can\'t safely isolate or protect under fault. Test catches the failure before handover."
          >
            <p>Functional tests by device:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">DC isolator</strong> — open under load (during daylight operation). Confirms BS EN 60947-3 DC-21 utilisation. Test: with array active, manually open the isolator; verify clean break, no sustained arc, full contact separation. Re-close under load; verify clean engagement</li>
              <li><strong className="text-white">AC isolator / RCBO</strong> — test button operates: press the RCD test button; verify RCBO trips and disconnects the circuit. Manual trip: trip the RCBO by hand; verify clean operation</li>
              <li><strong className="text-white">String overcurrent devices (if fitted)</strong> — visual inspection: correct rating per design pack per Reg 712.432; correct device standard per Reg 712.432.103 (gPV per BS EN 60269-6, BS EN 60947-3 fuse-combination, or DC-rated MCBs per BS EN 60947-2 / 60898-2 / IEC 60898-3); both polarities protected per Reg 712.432.101; secure mounting; ventilation per manufacturer spec</li>
              <li><strong className="text-white">SPDs</strong> — visual inspection: correct type / class per design (Type 2 default per Reg 712.534.102.1; Type 1 only where direct-strike LPS separation isn\'t maintained); BS EN 61643-31 (DC) / BS EN 61643-11 (AC); I_n ≥ 5 kA per Reg 712.534.102.4; mounted correctly; indicator window shows healthy status</li>
              <li><strong className="text-white">IMD (Insulation Monitoring Device)</strong> — verify present and operating per Reg 712.421.101.1 / 712.538.101 / BS EN 61557-8 (or inverter-integrated per BS EN 62109-2). Test by simulated insulation fault per manufacturer procedure where supported; confirm fault annunciation / inverter trip</li>
              <li><strong className="text-white">Inverter</strong> — power-on test: confirm inverter starts up, identifies the array, begins MPPT tracking, exports AC. Check inverter telemetry for fault codes including any IMD alarms</li>
              <li><strong className="text-white">Notices and labels</strong> — verify Reg 712.514.101 instruction notice at origin / metering / CU; Reg 712.514.102 "SOLAR DC — Live parts can remain energized after isolation" at each DC access point; Reg 712.514.103 "Isolate both AC and DC sides before servicing" on the inverter</li>
              <li><strong className="text-white">Record in SoTR</strong> — each device tested, test method, result</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>Schedule of Test Results (SoTR) — the baseline record</ContentEyebrow>

          <Pullquote>SoTR is the baseline. Future EICRs compare against it. Archived for the install life.</Pullquote>

          <ConceptBlock
            title="SoTR content and structure"
            plainEnglish="The Schedule of Test Results is the structured record of every commissioning test result. Contains continuity, polarity, V_oc / I_sc per string at test conditions, I-V curve (where measured), insulation resistance, functional tests."
            onSite="The SoTR is the BASELINE record. Future EICR-style periodic inspection compares measured values against the SoTR baseline — degradation, faults, and operational issues show up as deviations. Without the baseline, fault diagnosis is significantly harder."
          >
            <p>SoTR sections:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Header</strong> — install address, MCS cert number, commissioning date, commissioning engineer name, test instruments used (with cal certs)</li>
              <li><strong className="text-white">System overview</strong> — kWp, modules, inverter, strings, mounting type. Cross-reference to the design pack</li>
              <li><strong className="text-white">Continuity</strong> — per-segment R measurements, pass / fail per 0.5 Ω criterion</li>
              <li><strong className="text-white">Polarity</strong> — per-interface verification</li>
              <li><strong className="text-white">V_oc / I_sc per string</strong> — measured at test conditions; corrected to STC; comparison to design</li>
              <li><strong className="text-white">I-V curve (where measured)</strong> — per string; embedded image or appendix</li>
              <li><strong className="text-white">Insulation resistance</strong> — test voltage, measured IR, test conditions</li>
              <li><strong className="text-white">Functional tests</strong> — per-device result</li>
              <li><strong className="text-white">Findings and rectifications</strong> — any commissioning-stage rectifications, with before / after</li>
              <li><strong className="text-white">Sign-off</strong> — commissioning engineer signature; date; competency reference (MCS, scheme membership)</li>
            </ul>
          </ConceptBlock>

          <DiagramPlaceholder
            caption="SoTR document structure — table-format layout with header (install / engineer / instruments), system overview, continuity test rows, polarity test rows, V_oc / I_sc per string rows, IR test row, functional test rows, findings & rectifications section, sign-off block. Annotated with BS EN 62446-1 reference and the baseline-for-future-EICR purpose."
            filename="renewable/m3s7-sotr-structure.png"
          />

          <InlineCheck {...inlineChecks[6]} />

          <InlineCheck {...inlineChecks[7]} />

          <SectionRule />

          <ContentEyebrow>What it looks like in the wild</ContentEyebrow>

          <Scenario
            title="IR test fails at commissioning — investigation locates a damaged MC4 connector"
            situation="6 kWp install commissioning. IR test at 1,000 V DC measures 0.4 MΩ — below 1 MΩ pass criterion. Test conditions: dry weather, 18°C ambient, low humidity. Re-test confirms 0.4 MΩ — not a transient condition."
            whatToDo="Section the IR test to localise. Step 1: disconnect strings at the combiner; test each string separately. String 1 = 1.5 MΩ (pass); String 2 = 0.3 MΩ (fail). Fault in String 2. Step 2: within String 2, disconnect the DC cable from the modules; test cable separately (3 MΩ — pass) and modules separately (0.4 MΩ — fail). Fault in the modules. Step 3: walk the string\'s modules; visual inspection reveals a damaged MC4 connector with water ingress at the module-to-module interface (cracked strain relief). Replace the damaged connector (matched brand, manufacturer-spec crimping tool). Re-test: 1.8 MΩ — pass. SoTR records the investigation, rectification, and final pass result. Customer informed."
            whyItMatters="IR failures are common at commissioning — typically MC4 connector or module backsheet damage. The systematic sectioning approach localises efficiently. The SoTR baseline now reflects the rectified state; future EICRs reference this baseline."
          />

          <Scenario
            title="DC isolator can\'t close under load — wrong-spec isolator from a previous installer"
            situation="EICR-style review of a 5-year-old PV install. Initial inspection reveals the DC isolator hesitates when closing under load, with audible arcing. The previous installer used an AC-only 32 A isolator from a generic supplier — not BS EN 60947-3 DC-21 rated."
            whatToDo="Document the finding. Substitute the AC-only isolator with a correctly-rated DC isolator: BS EN 60947-3 DC-21 utilisation category, rated for the array V_oc_max (typical 1,000 V DC for residential) and I_sc_max. Re-test the functional operation — open and close under load, clean break, no sustained arc. Update the cert evidence bundle with the rectification and the new isolator brand / model / ratings. Customer informed about the rectification and the reason — informing the EICR audit trail."
            whyItMatters="AC-only isolators on PV DC are a real fire-risk and a fault-finding hazard. The competent installer specifies BS EN 60947-3 DC-21 from day-one; the EICR-style review catches the legacy mis-spec and triggers rectification. Section 712 + Reg 712.421 are operationalised through BS EN 60947-3 spec discipline."
          />

          <CommonMistake
            title="Skipping the BS EN 62446-1 SoTR — no baseline for future EICR"
            whatHappens="An installer commissions a PV install without producing a structured SoTR per BS EN 62446-1. Five years later, the customer\'s install under-performs — yields 15% below modelled. EICR-style investigation tries to compare against the baseline. There IS no baseline — the original installer\'s commissioning records are sparse. Investigation has to start from scratch, much more expensive than baseline comparison."
            doInstead="Always produce a structured SoTR per BS EN 62446-1 at commissioning. Continuity, polarity, V_oc / I_sc per string, IR, functional tests — each recorded with the test conditions. The SoTR is the baseline for future diagnostic reference; archived in the cert evidence bundle for the install life. The MCS audit also expects the SoTR."
          />

          <CommonMistake
            title="IR test failed but installer ignores it — energises anyway"
            whatHappens="IR test measures 0.5 MΩ — below 1 MΩ pass criterion. Installer notes &ldquo;maybe humidity&rdquo; and energises the inverter. Install commissions and operates. Months later, the customer reports inverter earth-fault trips during humid weather — the install\'s actual IR is degraded; modules have water ingress at a damaged connector. Rectification at year 1 costs more than rectification at commissioning."
            doInstead="Always investigate sub-1 MΩ IR findings at commissioning. Re-test in dry conditions; section the test to localise the fault; rectify before energising. The SoTR records the investigation and rectification. Customer\'s long-term install reliability and safety depend on this."
          />

          <CommonMistake
            title="Polarity tested visually only — installer reads &ldquo;+&rdquo; labels, doesn\'t multimeter-verify"
            whatHappens="Installer relies on the &ldquo;+&rdquo; / &ldquo;-&rdquo; labels on cables and connectors for polarity verification. One cable was mis-labelled at manufacture (or a previous installer); the inverter is energised with reverse polarity. Inverter destroyed instantly; warranty void; £1,500-£2,500 replacement cost."
            doInstead="Always multimeter-verify polarity at every interface BEFORE energisation. Red probe on positive, black on negative; positive voltage confirms correct polarity. Labels can be wrong; measurements don\'t lie. The SoTR records the measured polarity per interface."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'BS EN 62446-1:2016+A1:2018 is the operational standard for PV commissioning — documentation, visual, electrical tests, SoTR, baseline records.',
              'Continuity test: bonding network end-to-end, R < 0.5 Ω typical pass. Section-by-section to localise high-R joints.',
              'Polarity verification at every DC interface BEFORE energisation. Multimeter measurement, not visual. Reverse polarity at inverter input destroys the inverter.',
              'V_oc / I_sc per string at test conditions; corrected to STC for comparison against design / nameplate. Typical tolerance ±5-10%.',
              'I-V curve measurement RECOMMENDED for >10 kWp installs and for per-module performance verification. Identifies bypass-diode steps, fill-factor faults, low V_oc / I_sc.',
              'Insulation resistance test: 500 V DC for V_oc_max ≤500 V; 1,000 V DC for higher. Pass ≥1 MΩ for systems up to 100 kW. Section the test to localise failures.',
              'Functional test of DC isolator (BS EN 60947-3 DC-21 under load), AC isolator / RCBO (test button + manual trip), string fuses (visual + electrical), SPDs (visual indicator).',
              'Schedule of Test Results (SoTR) is the structured baseline record. Archived in the cert evidence bundle. Reference for future EICR-style periodic inspection.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 7 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-3-section-6')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 6
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                AC-side &amp; DNO
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-3-section-8')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.8 Section 712 reading
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
