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
} from '@/components/study-centre/learning';
import { DcIvAcrossLct } from '@/components/study-centre/diagrams/renewableM12';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm12s2-dc-vs-ac-ir',
    question:
      'Why is DC insulation resistance testing different from standard AC IR?',
    options: [
      'Test voltage follows the DC nominal value per Table 64, equipment is more sensitive, and readings drift with irradiance and state of charge',
      'There is no real difference; the same 500 V test and procedure apply to both AC and DC circuits',
      'DC insulation resistance cannot be measured and is verified only by the manufacturer at the factory',
      'DC IR is always tested at 250 V regardless of the circuit voltage, unlike AC which uses 500 V',
    ],
    correctIndex: 0,
    explanation:
      'DC IR vs AC IR specifics: (1) Test voltage selection — AC IR per Reg 643.3 + Table 64 typically 500 V DC for LV installations; for DC LCT the manufacturer + Table 64 guide higher voltages where Voc / DC nominal warrants (PV with Voc 1000 V uses 1000 V IR tester per manufacturer + Section 712). (2) Equipment sensitivity — PV inverter DC input has surge protection, capacitors, IMD electronics; test voltage above the manufacturer-permitted limit damages the inverter. Reg 643.3.3 + manufacturer DoC must be followed. (3) Operating-state drift — PV string IR varies with irradiance (humid panels in damp morning have different IR than dry midday); BESS DC bus IR varies with SoC + electrolyte condition. Document the test conditions. (4) Polarity — DC IR per Reg 712: live conductors + protective conductor; verify test voltage applied between PV positive + earth, negative + earth, positive + negative as relevant. (5) Procedure — disconnect equipment per Reg 643.3.3, apply test voltage, record reading, repeat at the 250 V DC test where required for equipment-connected verification.',
  },
  {
    id: 'm12s2-table-64-test-voltages',
    question:
      'Per Reg 643.3.2 + Table 64, what test voltage applies to PV string IR testing?',
    options: [
      'A 24 V test, matching the SELV battery voltage commonly used in DC systems',
      'No insulation resistance test is required on the DC side of a PV array',
      'Table 64 sets the voltage by band, so a string with Voc 600–1000 V uses the 1000 V DC test',
      'A fixed 500 V test always applies to PV regardless of string Voc',
    ],
    correctIndex: 2,
    explanation:
      'Table 64 (Minimum values of insulation resistance) — referenced by Reg 643.3.2 — sets test voltages + minimum IR by nominal circuit voltage band: (1) SELV + PELV ≤50 V: test voltage 250 V DC, minimum IR 0.5 MΩ. (2) Up to and including 500 V (with the exception of SELV + PELV): test voltage 500 V DC, minimum IR 1 MΩ. (3) Above 500 V: test voltage 1000 V DC, minimum IR 1 MΩ. For LCT: PV string at Voc 600-1000 V → 1000 V DC test per Table 64 + manufacturer DoC. BESS DC bus typically 48-100 V (residential) or higher (commercial) → 500 V DC test typical; verify per manufacturer. EV DC fast at CHAdeMO / CCS voltages → manufacturer commissioning + appropriate test voltage. Reg 643.3.3: where equipment is likely to influence the test result or be damaged, the test is applied prior to connection — then a 250 V DC test applied between live conductors + protective conductor after equipment connected. Cert evidence bundle: pre-connection IR + post-connection 250 V re-test per Reg 643.3.3.',
  },
  {
    id: 'm12s2-712-imd',
    question:
      'How does Reg 712.421.101 IMD verification fit into PV DC initial verification?',
    options: [
      'It is not relevant to PV initial verification and applies only to commercial installations',
      'The IMD test simply replaces the DC string IR test, so only one of the two needs to be done',
      'It is optional and can be omitted whenever the inverter passes its grid-synchronisation check',
      'At IV you inspect the IMD, run its self-test and confirm the trip path; it complements rather than replaces the string IR test',
    ],
    correctIndex: 3,
    explanation:
      'Reg 712.421.101 IMD requirement: (1) Mandatory presence — except where Reg 712.421.101.2 applies (galvanic separation between AC + DC sides + other conditions); verify the exception before omitting. (2) Standard — BS EN 61557-8 (insulation monitoring devices). (3) Lifecycle function — IMD monitors insulation continuously throughout the PV array life, not just at IV. (4) Implementation — most modern PV inverters have integrated IMD that self-tests on each grid connection + alarms on insulation degradation. (5) IV verification — at install: inspect IMD presence; trigger IMD self-test via inverter commissioning interface; record IMD type + BS EN 61557-8 DoC; document trip threshold (typically configured per manufacturer in the kohm range — e.g. inverter alarms at 1 MΩ then trips at lower threshold); confirm trip path (inverter disconnects + alarm raised + portal alert). (6) Documentation — cert evidence bundle records: IMD make + model + DoC + self-test result + trip threshold. (7) Operational — IMD running fault path is a key piece of customer monitoring portal data alongside yield (covered §12.7).',
  },
  {
    id: 'm12s2-bess-dc-iv',
    question:
      'What is unique about BESS DC bus IR + IV at initial verification?',
    options: [
      'It is identical to PV string verification and uses the same 1000 V test in every case',
      'BMS commissioning comes first, the test voltage follows the bus voltage per Table 64, capacitor discharge is observed, and the SoC/SoH baseline is recorded',
      'There is no meaningful difference between BESS and any other DC circuit at initial verification',
      'No testing is needed because the manufacturer’s BMS continuously monitors the bus in service',
    ],
    correctIndex: 1,
    explanation:
      'BESS DC bus IV unique aspects: (1) BMS commissioning is the prerequisite — without BMS communications + cell balance + fault tolerance verified, the BESS DC bus is not safe to energise. Manufacturer commissioning engineer typically does this; cert evidence bundle includes the BMS commissioning record. (2) Test voltage selection — Table 64 applies; the DC nominal voltage governs (48 V residential battery bus uses 500 V DC test per Table 64 ≤500 V band; 400-800 V commercial may use 1000 V test). Manufacturer DoC mandates the procedure. (3) Capacitor discharge — BESS inverters have substantial DC link capacitors (hundreds of µF up to mF); after disconnect, the bus retains charge for seconds to minutes. Reg 641.4 + safety: wait the manufacturer-specified discharge time before working DC side. (4) Cell-string-level — some BESS architectures have multiple cell strings; each may need separate IR per manufacturer. (5) Operational baseline — at commissioning the BMS reports SoC + SoH initial values; these become the baseline against which condition reporting tracks degradation (covered §12.3). Cert evidence bundle: BMS commissioning record + DC bus IR + manufacturer DoC + initial SoC + SoH baseline.',
  },
];

const quizQuestions = [
  {
    question:
      'PV install: 12 modules per string, Voc 40 V per module, 2 strings parallel. What IR test voltage applies + how is the test performed?',
    options: [
      'String Voc is 480 V (parallel adds current, not voltage), so a 500 V DC test applies — or 1000 V for cold-weather headroom',
      '250 V is used everywhere on the DC side regardless of the string voltage, in line with the SELV band of Table 64',
      'No DC test is performed because parallel strings cancel out and the array produces no hazardous voltage',
      'A fixed 24 V test applies, as parallel PV strings are treated as SELV circuits under Table 64',
    ],
    correctAnswer: 0,
    explanation:
      'PV string IR: string Voc 480 V at standard test conditions (Voc rises in cold conditions per the temperature coefficient — typical -0.3 %/°C below STC 25°C; at -10°C the Voc rises ~10% — so 480 V at STC becomes ~530 V at -10°C, which crosses the Table 64 500 V band threshold). Conservative approach: use 1000 V DC test where Voc may approach or exceed 500 V at coldest operating temperature. Procedure per Reg 643.3 + Section 712: (1) Cover PV array OR open string isolators OR perform at low-irradiance time (early morning) — but the array still produces some voltage. (2) Disconnect string from inverter DC input. (3) Apply IR test between PV positive + protective earth conductor: record reading. (4) Repeat between PV negative + protective earth: record. (5) Repeat between PV positive + negative (with the array effectively shorted at the string level via the tester for the duration of the test): record. (6) Reg 643.3.3 re-test at 250 V DC between live + CPC after equipment connected. Minimum IR per Table 64 = 1 MΩ; modern PV arrays typically MΩ to 10s of MΩ; damp or aged arrays may approach the threshold. Cert evidence bundle: per-string IR results + test voltage + irradiance / weather conditions at time of test.',
  },
  {
    question:
      'BESS install: 10 kWh residential battery, 48 V nominal DC bus, BMS commissioned by manufacturer engineer. What IV remains for the electrician?',
    options: [
      'Nothing remains; once the manufacturer has commissioned the BMS the whole install is fully certified',
      'Only the AC-side terminations are left; no DC bus testing or anti-islanding check falls to the electrician',
      'Reg 642 inspection, Reg 643 AC testing, DC bus IR per the manufacturer and an anti-islanding check — integrated with the BMS record',
      'The electrician picks whichever tests seem relevant on the day; no defined remaining scope exists for the BESS circuit',
    ],
    correctAnswer: 2,
    explanation:
      'BESS install IV split between manufacturer + electrician: (1) Manufacturer commissioning engineer: BMS commissioning (cell balance, communications, fault tolerance), DC bus connection + initial energisation, SoC + SoH baseline. (2) Electrician IV scope: (a) Reg 642 inspection — disconnected from supply; BESS DC terminations torque-checked + correct polarity; AC terminations; isolators; warning notices per Reg 514 + manufacturer; cable routing per Section 522. (b) Reg 643 testing on AC side: continuity (R1+R2, R2 on the BESS AC supply circuit); IR at 500 V per Reg 643.3 + Table 64; polarity; loop impedance Zs at the BESS AC isolation point; RCD operation — Type B 30 mA verified per BS EN 61557-6 because the BESS inverter electronics may produce DC fault leakage (check manufacturer DoC for the BESS); PFC. (c) DC bus IR per manufacturer — typically 500 V DC test for 48 V nominal bus per Table 64 ≤500 V band; some manufacturers specify higher. (d) Reg 551.7.5 anti-islanding: simulate grid loss + verify the BESS inverter disconnects within the specified time. (e) Functional test: BESS charges + discharges correctly; BMS communicates; alarms function. (3) Documentation: manufacturer BMS commissioning record + electrician\'s EIC + Schedule of Test Results + cert evidence bundle.',
  },
  {
    question:
      'EV DC fast charger commissioning — why is the DC IV procedure handled mainly by the manufacturer commissioning engineer?',
    options: [
      'There is no particular reason; any electrician can commission the DC side with a standard multi-function tester',
      'DC fast charging is actually AC under the bonnet, so the manufacturer has no special commissioning role',
      'The electrician commissions the high-voltage DC side, while the manufacturer only supplies and delivers the unit',
      'The DC side (200–1000 V) has bespoke converter electronics, safety circuits and a vehicle handshake needing manufacturer rigs and software; the electrician handles the AC supply IV and install',
    ],
    correctAnswer: 3,
    explanation:
      'EV DC fast charging is a specialist commissioning area: (1) Voltage range — CCS Combo 200-1000 V DC per vehicle; CHAdeMO 50-500 V DC typical; Tesla Supercharger proprietary. (2) Power levels — domestic AC charging is 7-22 kW; commercial DC fast is 50-350 kW. (3) Commissioning complexity — DC side has bespoke power electronics (active rectifier, DC-DC converter), thermal management, communication protocol with the vehicle (ISO 15118 / CHAdeMO protocol), safety circuits (isolation monitoring, ground fault detection), software calibration. (4) Manufacturer engineer scope — DC side commissioning: handshake verification, calibration, vehicle simulation tests using manufacturer software + bespoke test loads; firmware updates; communication with central management system (CMS / OCPP). (5) Electrician scope — AC supply IV (continuity, IR, polarity, ADS, RCD Type B + RDC-DD per Section 722 manufacturer DoC, loop impedance, PFC); protective conductor + earthing per Reg 722.411.4 (OPDD or alternative architecture if PME + outdoor); DC connector physical install + cable routing + ingress protection. (6) Joint sign-off — manufacturer commissioning record + electrician\'s EIC + cert evidence bundle integrates both.',
  },
  {
    question:
      'Why is irradiance / weather state important when recording PV string IR results?',
    options: [
      'It is not important; the IR reading is identical in any weather, so the conditions need not be recorded',
      'PV string IR drifts with operating state — damp lowers it, dry raises it — so recording date, weather, irradiance and module temperature lets you baseline and trend it',
      'Weather is recorded only for the customer’s interest and has no real bearing on the IR test result',
      'Irradiance and humidity have no effect on insulation resistance and influence only the energy yield',
    ],
    correctAnswer: 1,
    explanation:
      'PV string IR + weather-state interaction: (1) Moisture path — PV modules + DC cables outdoor have a moisture-dependent leakage path; humid morning conditions (dew on glass surface, damp connectors) show lower IR than dry midday. (2) Module temperature — module IR drifts with temperature: cold modules show higher IR; hot modules show slightly lower. (3) Irradiance — at high irradiance, modules produce high voltage + the IR reading is in the presence of operating voltage (which is why we cover the array or test at low irradiance). (4) Cell-level degradation — over years, PEC (Potential-Induced Degradation), micro-cracks, junction-box humidity ingress lower IR; trending against baseline catches degradation early. (5) Documentation — cert evidence bundle records: test date + time + weather + ambient temperature + module temperature + irradiance estimate (if measured). Periodic IR testing (every 5-10 years for EICR-equivalent) compares trend rather than absolute. (6) Threshold — Table 64 minimum 1 MΩ at the test voltage; PV manufacturer DoCs often specify higher thresholds for healthy operation (often 10s of MΩ). A reading approaching 1 MΩ on a new install indicates a problem worth investigating; a reading falling toward 1 MΩ over years indicates degradation requiring intervention.',
  },
  {
    question:
      'Reg 643.3.3 specifies a 250 V DC re-test after equipment is connected. Why?',
    options: [
      'There is no reason; the 250 V figure is simply a historical convention carried over with no technical basis',
      'The lower 250 V test verifies the as-installed insulation with equipment connected — low enough not to damage electronics, high enough to catch real degradation',
      'The 250 V re-test replaces the pre-connection test entirely, so only a single IR test is ever performed',
      'No re-test at all is required once the higher-voltage pre-connection test has already passed',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 643.3.3 logic: (1) Pre-connection IR — at higher test voltage (500 V or 1000 V) to detect insulation faults at realistic operating-voltage stress, performed BEFORE equipment is connected (so the equipment electronics + surge protection + IMD circuits aren\'t damaged or aren\'t influencing the measurement). (2) Post-connection 250 V DC re-test — between live conductors + protective conductor with the equipment connected — verifies the IR with the real-world load topology. (3) Why 250 V — low enough not to damage equipment electronics, capacitors, surge protection; high enough to detect significant insulation degradation. (4) When applied — Reg 643.3.3 says "where connected equipment is likely to influence the measurement or result of the test, or be damaged" — virtually all LCT installs trigger this (PV inverter + BESS BMS + heat pump VSD + EV charger electronics all influence the test or risk damage). (5) Process — disconnect equipment, do pre-connection IR at appropriate voltage per Table 64, connect equipment, do 250 V re-test. (6) Documentation — cert evidence bundle records both: pre-connection IR (high voltage, with values per Table 64) + post-connection 250 V re-test result. The pre-connection IR is the structural insulation health; the 250 V re-test is the as-installed verification.',
  },
  {
    question:
      'Micro-hydro install with DC interim bus (rare but exists) — how is DC IV approached?',
    options: [
      'A micro-hydro DC bus cannot be insulation-tested at all and is verified solely by the turbine supplier',
      'Micro-hydro generation is AC throughout the system, so there is never any DC bus to insulation-test',
      'There is no defined approach; the electrician improvises a bespoke test procedure for each system',
      'The manufacturer DoC governs the bespoke bus, but the Table 64 and Reg 643.3 framework still applies — voltage by band, BS EN 61557-2 instrument, allowing for water exposure and capacitor discharge',
    ],
    correctAnswer: 3,
    explanation:
      'Micro-hydro DC interim bus IV: (1) Bespoke nature — micro-hydro installs are typically small-volume bespoke designs from specialist manufacturers (Powerspout, Stream Engine, Powerpal, etc); the DC bus architecture varies per turbine + grid-tie inverter combination. Manufacturer DoC mandates the test procedure. (2) Voltage range — micro-hydro DC bus typically 24-300 V depending on system; Table 64 + Reg 643.3 framework applies with test voltage per nominal band. (3) BS EN 61557-2 IR tester; the typical multi-function tester covers this. (4) Weather + water exposure — micro-hydro cabling is typically buried / outdoor / wet-environment; pay attention to gland integrity + cable IR vs water ingress; cert evidence bundle records weather conditions at IR test. (5) DC capacitors + discharge — the grid-tie inverter has DC link capacitors that retain charge; observe manufacturer discharge wait time. (6) Functional verification — turbine spinning + DC bus charging + inverter exporting to grid + Reg 551.7.5 anti-islanding verified. (7) Documentation — manufacturer commissioning record + EIC + Schedule of Test Results + cert evidence bundle records the bespoke DC bus IV per manufacturer instruction. M9 §9.7 covered the micro-hydro install scope; here we cover the DC IV specifics.',
  },
];

const faqs = [
  {
    question: 'Can a standard multi-function tester do PV DC IR at 1000 V?',
    answer:
      'Most modern multi-function testers (Megger MFT 1741, Fluke 1664 FC, Metrel MI 3155) include 1000 V DC IR capability — declared on the datasheet per BS EN 61557-2. Verify the test voltage capability on the model + ensure it is the right tool for the PV string Voc range. Older MFTs may top out at 500 V; for high-Voc commercial PV strings (1500 V systems) specialist testers may be needed.',
  },
  {
    question: 'When can PV DC IR be performed safely?',
    answer:
      'Standard practice: cover the PV array to suppress generation OR test at very low irradiance (early morning / dusk / heavy overcast). Open the DC string isolators to disconnect from the inverter. Apply the IR test between PV positive + earth + negative + earth + positive + negative as required. Some systems with array-level optimisers / micro-inverters require manufacturer-specific procedures + the optimiser shutdown function before DC IR.',
  },
  {
    question: 'Does the BESS DC bus IR need to be performed annually?',
    answer:
      'Initial verification at install per Reg 641.1. Periodic frequency depends on Reg 652.1 — type of installation, equipment, use, maintenance, external influences. For typical residential BESS: ~5-10 yr EICR cycle aligned with the AC EICR. Modern BESS BMS continuously monitors cell + DC bus IR-equivalent metrics + alarms on degradation — so the IV at commissioning + ongoing BMS monitoring covers most of the lifecycle; periodic dedicated test confirms BMS reporting. §12.3 covers BESS condition reporting.',
  },
  {
    question: 'Reg 712.421.101 IMD — what if the inverter is replaced mid-life?',
    answer:
      'When an inverter is replaced (common after 10-15 yr lifecycle), the new inverter\'s IMD function must be verified per Reg 712.421.101 + BS EN 61557-8. The replacement is an alteration per Reg 641.5: comply with current BS 7671 AND not impair existing safety. Cert evidence bundle records the replacement IMD make + model + DoC + self-test result + integration with the existing PV array. The original PV array IR baseline can be compared at the same time as an ongoing condition check.',
  },
  {
    question: 'Why does Reg 643.3.3 specify 250 V DC for the equipment-connected re-test?',
    answer:
      'Two reasons: (1) 250 V is high enough to detect significant insulation degradation without damaging sensitive equipment electronics, surge protection, capacitors, or IMD circuits. (2) The pre-connection test (at 500 V or 1000 V per Table 64) verifies structural insulation; the 250 V re-test verifies the as-installed system with real-world load topology. Together they cover the IR verification envelope — structural + as-installed.',
  },
];

export default function RenewableEnergyModule12Section2() {
  const navigate = useNavigate();

  useSEO({
    title: 'IR + Initial Verification on DC circuits | Renewable Energy 12.2 | Elec-Mate',
    description:
      'DC insulation resistance is different from AC IR. PV strings (Reg 712.421.101 IMD + 1000 V test where Voc warrants), BESS DC bus (Chapter 57 isolation), EV DC fast (CCS / CHAdeMO manufacturer-led), micro-hydro DC. Test voltage selection, polarity, why DC IR drifts with irradiance + SoC.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-12')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 12
          </button>

          <PageHero
            eyebrow="Module 12 · Section 2 · BS 7671:2018+A4:2026 · Reg 643.3 + Table 64 + Reg 712.421.101"
            title="Insulation resistance + Initial Verification on DC circuits"
            description="DC IR is different from AC IR. PV strings per Section 712 with Reg 712.421.101 IMD + DC test voltage per Voc + Table 64. BESS DC bus per Chapter 57 + manufacturer commissioning. EV DC fast per Section 722 manufacturer-led commissioning. Micro-hydro DC interim bus per Section 551 + manufacturer DoC."
            tone="yellow"
          />

          <TLDR
            points={[
              'DC IR is different from standard AC IR. Test voltage per Table 64 + nominal circuit voltage band; equipment-connected re-test at 250 V per Reg 643.3.3.',
              'PV string IR: Voc governs test voltage. Modern strings with Voc 600-1000 V use 1000 V DC IR test per Table 64 (over-500 V band) + manufacturer DoC.',
              'Reg 712.421.101 IMD verification: BS EN 61557-8 compliant; typically integrated in modern PV inverters; self-test at commissioning + ongoing lifecycle monitoring.',
              'BESS DC bus IR: per manufacturer + Table 64; BMS commissioning is the prerequisite; capacitor discharge time observed; SoC + SoH baseline recorded.',
              'EV DC fast (CCS / CHAdeMO): manufacturer commissioning engineer handles DC side; electrician handles AC supply IV + protective conductor + DC connector physical install.',
              'Micro-hydro DC interim bus: bespoke per manufacturer; Table 64 + Reg 643.3 framework applies; manufacturer DoC mandates the procedure.',
              'PV IR drifts with weather state (humidity, irradiance, module temperature). Record conditions; baseline at commissioning; trend over EICR cycles to detect degradation.',
              'Reg 643.3.3 re-test at 250 V DC after equipment connected — protects equipment electronics while verifying as-installed IR.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Distinguish DC IR from AC IR in test voltage, procedure, and equipment sensitivity.',
              'Apply Table 64 + Reg 643.3 to select test voltage for PV strings, BESS DC bus, EV DC, micro-hydro DC.',
              'Apply Reg 712.421.101 IMD verification at PV initial verification.',
              'Sequence BESS DC bus IV with BMS commissioning, capacitor discharge, manufacturer DoC procedure.',
              'Position the electrician scope within EV DC fast commissioning vs manufacturer commissioning engineer scope.',
              'Approach micro-hydro DC interim bus IV per manufacturer + Section 551 framework.',
              'Account for weather + operating state when recording + interpreting PV string IR results.',
              'Apply Reg 643.3.3 250 V re-test after equipment connected.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            DC isn\'t AC. The test voltage, the procedure, the sensitivity of the equipment — different at every stage. Read the manufacturer DoC + Table 64 before applying a tester to DC LCT equipment.
          </Pullquote>

          <ContentEyebrow>Table 64 + Reg 643.3 DC IR fundamentals</ContentEyebrow>

          <ConceptBlock
            title="Reg 643.3 + Table 64 applied to DC LCT circuits"
            plainEnglish="Reg 643.3.1: insulation resistance shall be measured between live conductors + live conductors + protective conductor. Reg 643.3.2: the IR measured with test voltages indicated in Table 64 shall be considered satisfactory if the main switchboard + each distribution circuit tested separately has an IR not less than the appropriate value. Reg 643.3.3: where connected equipment is likely to influence the test or be damaged, the test shall be applied prior to the connection — then 250 V DC re-test after equipment connected."
            onSite="For DC LCT this means: select test voltage per nominal DC voltage band in Table 64; disconnect equipment that could influence or be damaged; apply IR tester per BS EN 61557-2; re-test at 250 V with equipment connected. PV string Voc + BESS DC nominal + EV DC + micro-hydro DC each have their own nominal voltage band + manufacturer guidance."
          >
            <p>Table 64 test voltage bands applied to LCT:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">SELV / PELV ≤50
                  V</strong> — test voltage 250 V DC, minimum IR 0.5 MΩ. LCT: rare —
                some low-voltage micro-installs (24 V battery for off-grid cabin)
              </li>
              <li>
                <strong className="text-white">Up to 500 V (LV
                  AC + LV DC)</strong> — test voltage 500 V DC, minimum IR 1 MΩ. LCT:
                BESS residential 48 V bus; PV strings with Voc ≤ 500 V; standard AC
                IV
              </li>
              <li>
                <strong className="text-white">Above 500 V</strong>
                — test voltage 1000 V DC, minimum IR 1 MΩ. LCT: PV strings with Voc
                600-1000 V; high-voltage BESS commercial 400-800 V; high-voltage
                micro-hydro DC bus
              </li>
              <li>
                <strong className="text-white">Reg 643.3.3
                  re-test</strong> — 250 V DC between live + CPC after equipment connected.
                Verifies as-installed IR without risking equipment damage
              </li>
              <li>
                <strong className="text-white">Procedure</strong>
                — disconnect equipment likely to influence / be damaged → apply
                pre-connection IR at appropriate voltage → record per circuit → connect
                equipment → apply 250 V DC re-test → record
              </li>
              <li>
                <strong className="text-white">Polarity</strong>
                — IR tester typically auto-polarity; for DC circuits verify the test
                voltage is applied with the correct polarity per manufacturer DoC
                (some IMD-equipped inverters may interpret reverse-polarity test as fault)
              </li>
              <li>
                <strong className="text-white">Documentation</strong>
                — cert evidence bundle: per-circuit IR result + test voltage applied +
                connection state (equipment connected / disconnected) + tester serial
                + calibration date
              </li>
              <li>
                <strong className="text-white">Reg 643.3.3 nuance</strong>
                — "likely to influence" applies broadly to LCT: PV inverters have
                surge protection + capacitors + IMD; BESS BMS has electronics; EV
                charger has rectifier + protection. Default position: disconnect for
                pre-test
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Why DC IR drifts with operating + environmental state"
            plainEnglish="DC IR readings are not single-point absolute values — they vary with moisture, temperature, irradiance (PV), SoC (BESS). A reading at 8am dewy summer morning differs from a 2pm dry sunny reading. The IV reading at commissioning becomes a baseline; periodic readings trend against it; record the conditions every time."
            onSite="UK 2025-26 reality: cert evidence bundle records date + time + weather + ambient temperature + module temperature (PV) + SoC (BESS) alongside the IR result. Periodic EICR-equivalent (5-10 yr) trends the readings; sudden drops indicate degradation requiring intervention."
          >
            <p>State-dependent factors:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Moisture</strong> —
                humid morning + damp panels show lower IR; dry midday higher. PV
                module surface, junction-box ingress, connector seals all moisture
                paths
              </li>
              <li>
                <strong className="text-white">Module
                  temperature</strong> — cold modules show higher IR; hot lower.
                Polarisation effect in PV cell + cable insulation temperature-dependent
              </li>
              <li>
                <strong className="text-white">Irradiance</strong>
                — at low irradiance the string voltage is low + IR test in absence
                of operating voltage; at higher irradiance the array still produces
                voltage (which is why we cover or test at low light)
              </li>
              <li>
                <strong className="text-white">SoC (BESS)</strong>
                — BESS DC bus IR varies slightly with cell SoC + electrolyte condition.
                Manufacturer DoC specifies the SoC range for accurate IR test
              </li>
              <li>
                <strong className="text-white">Cable
                  age + condition</strong> — over 10-20 years, cable insulation degrades;
                outdoor / buried cables faster than indoor. PEC (Potential-Induced
                Degradation) in PV cells lowers module IR over time
              </li>
              <li>
                <strong className="text-white">Documentation
                  matters more than absolute value</strong> — record conditions every
                time + trend over EICR cycles. A reading of 5 MΩ on a new install in
                dry conditions is acceptable; the same reading in 5 years in similar
                conditions indicates degradation worth investigating
              </li>
              <li>
                <strong className="text-white">Threshold</strong>
                — Table 64 minimum 1 MΩ at the test voltage. Manufacturer DoCs often
                specify higher thresholds for healthy operation (often 10s of MΩ).
                Approaching 1 MΩ on new install = investigate
              </li>
              <li>
                <strong className="text-white">BMS-equivalent
                  monitoring</strong> — modern PV inverters + BESS BMS continuously
                monitor insulation-equivalent metrics; the dedicated IR test at
                commissioning + EICR confirms BMS reporting
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 643.3.3 — IR with equipment connected"
            clause="Where connected equipment is likely to influence the measurement or result of the test, or be damaged, the test shall be applied prior to the connection of such equipment, in accordance with Table 64. Following connection of the equipment, a test at 250 V DC shall be applied between live conductors and the protective conductor connected to the earthing arrangement."
            meaning="Reg 643.3.3 sets the two-stage IR test protocol when equipment is likely to influence or be damaged. For LCT this applies broadly: PV inverters (capacitors + surge protection + IMD electronics), BESS BMS (low-voltage logic + communications), EV chargers (rectifier + protection), heat pump VSDs (DC link + EMI filter), micro-hydro inverters (similar to PV). Stage 1: pre-connection IR at appropriate Table 64 voltage (500 V or 1000 V) verifies structural insulation health. Stage 2: post-connection 250 V DC test between live + CPC verifies as-installed IR with real-world load topology — at a voltage low enough not to damage equipment electronics while high enough to detect significant insulation degradation. Cert evidence bundle records both stages + which equipment was disconnected for stage 1 + which was connected for stage 2. The protocol protects: equipment from damage; test integrity from equipment influence; the verifier from missing genuine insulation faults masked by equipment loading."
          />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>Per-technology DC IV — PV / BESS / EV / hydro</ContentEyebrow>

          <Pullquote>
            For PV the Voc rules; for BESS the BMS rules; for EV the manufacturer rules; for hydro the bespoke design rules. Read first, test second.
          </Pullquote>

          <ConceptBlock
            title="PV string IV — Reg 712 + Table 64 procedure"
            plainEnglish="PV string IV follows Section 712 PV-specific framework. Reg 712.421.101 IMD; Section 712 protective conductor + earthing; Table 64 test voltage per string Voc. Procedure: cover array or test at low irradiance, disconnect strings from inverter, apply IR per Table 64, re-test at 250 V after equipment connected."
            onSite="The PV string IR at commissioning becomes the baseline against which 5-10 yr EICR-equivalent IR is compared. Modern inverters with integrated IMD continuously monitor between IV events. Cert evidence bundle records per-string + per-test-condition data."
          >
            <p>PV string IV procedure:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Pre-test
                  preparation</strong> — cover array OR open string isolators OR test at
                low irradiance. Open inverter DC input. Wait for capacitor discharge
                per manufacturer
              </li>
              <li>
                <strong className="text-white">Test voltage
                  selection</strong> — per string Voc at coldest expected ambient
                temperature. Voc 600 V at STC may rise to 660 V at -10°C —
                conservative use 1000 V test per Table 64 over-500 V band
              </li>
              <li>
                <strong className="text-white">IR test points</strong>
                — PV positive to CPC; PV negative to CPC; PV positive to PV negative
                (with PV connected through the IR tester). Record three readings per
                string
              </li>
              <li>
                <strong className="text-white">Reg 712.421.101
                  IMD</strong> — inspect IMD presence (typically integrated in inverter);
                trigger IMD self-test; record IMD make + model + BS EN 61557-8 DoC
                + trip threshold + self-test result
              </li>
              <li>
                <strong className="text-white">Reg 643.3.3
                  re-test</strong> — connect inverter, apply 250 V DC between live + CPC,
                record. Confirms as-installed IR with inverter electronics in circuit
              </li>
              <li>
                <strong className="text-white">Functional
                  verification</strong> — uncover / re-energise PV, start inverter,
                verify grid synchronisation, anti-islanding self-test, yield matches
                modelled output for irradiance
              </li>
              <li>
                <strong className="text-white">Documentation</strong>
                — Schedule of Test Results per string + IMD verification + weather +
                module temperature + irradiance + inverter commissioning report from
                manufacturer engineer
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — EIC + Schedule + MIS 3002 PV handover + manufacturer
                inverter commissioning + EREC G98 / G99 reference + DNO confirmation
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="BESS DC bus IV — Chapter 57 + manufacturer commissioning"
            plainEnglish="BESS DC bus IV requires BMS commissioning as the prerequisite. Manufacturer commissioning engineer typically does BMS + initial DC bus energisation. Electrician scope: Reg 642 inspection + AC supply IV per Reg 643 + DC bus IR per manufacturer + Reg 643.3.3 re-test + Reg 551.7.5 anti-islanding."
            onSite="The split-scope reality: BMS commissioning needs manufacturer-specific software + access + training; electrician handles BS 7671 AC + DC IV per the manufacturer DoC. Cert evidence bundle integrates both records."
          >
            <p>BESS DC bus IV elements:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">BMS commissioning
                  (manufacturer)</strong> — cell balance, communications, fault
                tolerance, SoC + SoH baseline, alarm calibration, firmware up-to-date.
                Manufacturer engineer signs off
              </li>
              <li>
                <strong className="text-white">Reg 642 inspection
                  (electrician)</strong> — disconnected from supply; DC + AC
                terminations torque-checked; polarity; isolators + warning notices;
                cable routing; cable selection per Section 522
              </li>
              <li>
                <strong className="text-white">Reg 643 AC IV</strong>
                — continuity (R1+R2, R2), IR at 500 V per Table 64 ≤500 V band,
                polarity, loop impedance at the BESS isolator, RCD operation —
                Type B 30 mA verified per BS EN 61557-6 (BESS inverter typically
                produces DC fault leakage), PFC
              </li>
              <li>
                <strong className="text-white">DC bus IR
                  (per manufacturer)</strong> — typically 500 V DC for 48 V residential
                bus per Table 64 ≤500 V band; commercial 400-800 V bus 1000 V test;
                manufacturer DoC mandates the procedure
              </li>
              <li>
                <strong className="text-white">Capacitor
                  discharge wait</strong> — observe manufacturer-specified discharge
                time (seconds to minutes) before working DC side. Reg 641.4 safety
              </li>
              <li>
                <strong className="text-white">Reg 551.7.5
                  anti-islanding</strong> — simulate grid loss; verify BESS inverter
                disconnects within specified time; DNO-witnessed where applicable
              </li>
              <li>
                <strong className="text-white">Functional
                  verification</strong> — BESS charges from grid + discharges to load
                + PV-paired self-consumption; BMS communicates SoC + SoH; alarm
                paths verified
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — BMS commissioning record + EIC + Schedule of Test
                Results + Chapter 57 compliance + EREC notification + cert assembled
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 712.421.101 — Insulation Monitoring Device for PV"
            clause="An insulation monitoring device (IMD) shall be installed except where Regulation 712.421.101.2 applies, to verify the insulation status on the DC side throughout the life cycle of the PV array. NOTE: Insulation monitoring devices (IMDs) complying with BS EN 61557-8 provide this function. The monitoring function may be provided by an inverter with integrated insulation monitoring also capable of detecting insulation faults."
            meaning="Reg 712.421.101.1 mandates IMD presence on the PV DC side (with the 712.421.101.2 exception for galvanic-separation + other conditions). BS EN 61557-8 is the IMD standard. Modern grid-tied PV inverters typically integrate the IMD — checking DC isolation before each grid connection + raising an alarm on insulation degradation. At initial verification: (1) inspect IMD presence (integrated in inverter or separate device); (2) verify IMD function via the manufacturer self-test feature or controlled fault injection per manufacturer DoC; (3) record IMD make + model + BS EN 61557-8 DoC + trip threshold (typically configured per manufacturer in kohm range); (4) confirm IMD trip path (inverter disconnects + alarm raised + portal alert). The IMD provides ongoing lifecycle monitoring — complementing not replacing the structural IR test at install. Cert evidence bundle records IMD details alongside string IR results. Reg 712.421.101.2 exception requires careful verification — galvanic separation between AC + DC sides + other manufacturer-DoC conditions — before omitting the IMD."
          />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>EV DC fast + micro-hydro DC + the bespoke envelope</ContentEyebrow>

          <ConceptBlock
            title="EV DC fast charging — manufacturer-led DC commissioning"
            plainEnglish="EV DC fast (CCS Combo, CHAdeMO) operates at 200-1000 V DC with substantial converter electronics + safety + communication with the vehicle. DC commissioning is manufacturer engineer territory; electrician handles AC supply IV + protective conductor + Section 722 + DC connector physical install."
            onSite="UK 2025-26 EV DC fast install model: manufacturer commissioning engineer arrives with bespoke test rig + manufacturer software + handles DC side; electrician handles BS 7671 install side + AC supply IV + Section 722 outdoor PME architecture (Reg 722.411.4 OPDD / RDC-DD)."
          >
            <p>EV DC fast IV scope split:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Manufacturer
                  engineer scope</strong> — DC side commissioning: handshake verification
                with vehicle test load, calibration, vehicle simulation tests,
                firmware updates, CMS / OCPP communication, manufacturer software
                access
              </li>
              <li>
                <strong className="text-white">Electrician AC
                  supply IV</strong> — Reg 643 continuity + IR at 500 V + polarity +
                loop impedance + RCD operation (Type B + RDC-DD per Section 722
                manufacturer DoC) + PFC
              </li>
              <li>
                <strong className="text-white">Reg 722.411.4
                  PME architecture</strong> — outdoor EV: OPDD or alternative method per
                the manufacturer + Section 722. §12.4 covers PEN faults
              </li>
              <li>
                <strong className="text-white">DC connector
                  physical install</strong> — DC cable routing, ingress protection, gland
                integrity, mechanical protection per Section 522
              </li>
              <li>
                <strong className="text-white">Earthing +
                  protective conductor</strong> — TT or TN-C-S PME with appropriate
                architecture; protective conductor cross-section per Section 543;
                main equipotential bonding
              </li>
              <li>
                <strong className="text-white">Joint sign-off</strong>
                — manufacturer commissioning record + electrician EIC + Schedule of
                Test Results + Section 722 compliance + cert evidence bundle integrates
              </li>
              <li>
                <strong className="text-white">UK 2025-26 EV DC
                  market</strong> — commercial / forecourt DC fast 50-350 kW (Tritium,
                Alpitronic, ABB, BTC Power); domestic AC charging 7-22 kW (Zappi, Ohme,
                Hypervolt, Easee, Pod Point) — covered M6-M7
              </li>
              <li>
                <strong className="text-white">Functional
                  verification</strong> — vehicle test charge cycle + communication +
                stop-on-fault; DNO export check if V2G capability
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Micro-hydro DC interim bus + bespoke LCT envelope"
            plainEnglish="Some LCT systems have DC interim buses: micro-hydro with rectifier + DC bus + grid-tie inverter; certain wind systems with battery buffer + grid-tie; fuel cells (Section 551 + emerging). DC IV per manufacturer DoC + Table 64 + Reg 643.3 framework adapted to the system design."
            onSite="Bespoke LCT installs are typically small-volume; the manufacturer DoC is the primary source of test procedure. Cert evidence bundle records: manufacturer commissioning + electrician IV per the DoC + per-system test voltage selection."
          >
            <p>Bespoke DC IV considerations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Manufacturer DoC
                  governs</strong> — read first. Test procedure + test voltage + procedure
                + safety wait times all per manufacturer
              </li>
              <li>
                <strong className="text-white">Table 64 + Reg
                  643.3 framework</strong> — applies — test voltage per nominal DC
                voltage band; pre-connection IR + 250 V re-test per Reg 643.3.3
              </li>
              <li>
                <strong className="text-white">Micro-hydro
                  specifics</strong> — turbine + rectifier produces DC; DC bus to grid-tie
                inverter; voltage typically 24-300 V depending on system; outdoor +
                wet environment + buried cables — weather + ingress affect IR
                readings
              </li>
              <li>
                <strong className="text-white">Wind systems</strong>
                — many modern small wind systems are AC at turbine (induction or PMG)
                + inverter does AC-DC-AC conversion; some have DC bus between
                rectifier + inverter; verify per system architecture
              </li>
              <li>
                <strong className="text-white">Fuel cells</strong>
                — Section 551 emerging LCT; UK 2025-26 mostly trials. DC bus from fuel
                cell stack + grid-tie inverter. Per manufacturer + Table 64
              </li>
              <li>
                <strong className="text-white">Hydrogen-blend
                  CHP</strong> — electrical generation side similar to natural-gas CHP
                (engine + generator); DC bus rarely present in this generation type
              </li>
              <li>
                <strong className="text-white">Safety wait
                  times</strong> — DC link capacitors retain charge after disconnect;
                manufacturer-specified discharge wait times (seconds to minutes)
                observed before working
              </li>
              <li>
                <strong className="text-white">Documentation</strong>
                — cert evidence bundle: manufacturer commissioning record + electrician
                EIC + Schedule of Test Results per bespoke DC bus procedure +
                Section 551 + Section 712 cross-references where applicable
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 643.3.1 — IR measurement points"
            clause="The insulation resistance shall be measured between: (a) live conductors; and (b) live conductors and the protective conductor connected to the earthing arrangement. During this measurement, line and neutral conductors may be connected together."
            meaning="Reg 643.3.1 sets the IR measurement topology. For DC LCT this translates to: (1) Between live conductors — PV positive to PV negative; BESS DC positive to BESS DC negative; micro-hydro DC pos to neg. (2) Between live conductors + CPC — PV pos to earth; PV neg to earth; BESS pos to earth; BESS neg to earth. (3) Line + neutral may be connected together for the measurement — relevant for AC; for DC the equivalent is whether to measure pos-to-earth + neg-to-earth as separate tests OR connect pos + neg together and measure to earth. Procedure depends on the tester + manufacturer DoC; cert evidence bundle records the topology used. The minimum IR per Table 64 is the floor; in practice modern installs return values much higher (10s of MΩ on dry conditions). Approaching the floor on a new install indicates a problem worth investigating; approaching the floor on a periodic re-test indicates degradation. Documentation flow: record the test topology + conditions + result per circuit; trend over EICR cycles."
          />

          <InlineCheck {...inlineChecks[3]} />

          <DcIvAcrossLct
            caption="DC IR + IV across LCT — comparison diagram. Columns: PV string (Voc 600-1000 V → 1000 V test, IMD per Reg 712.421.101, weather-dependent); BESS DC bus (48 V or 400-800 V, BMS prerequisite, capacitor discharge wait, Reg 643.3.3 re-test at 250 V); EV DC fast (200-1000 V, manufacturer engineer DC, electrician AC + Section 722 PME); micro-hydro DC interim (24-300 V, bespoke manufacturer DoC, wet-environment cable). Common framework rows: Reg 642 inspection precedes Reg 643 testing; Table 64 test voltage per nominal band; BS EN 61557-2 instrument; Reg 643.3.3 250 V re-test after equipment connected; weather + state recording; cert evidence bundle integration."
          />

          <SectionRule />

          <Scenario
            title="PV string IR at commissioning — 8 kWp array, Voc 720 V, December UK morning"
            situation="8 kWp PV array on south-facing roof; 20 modules in 2 strings of 10; module Voc 36 V at STC → string Voc 360 V at STC, but cold December morning at -3°C raises string Voc to ~395 V (temperature coefficient ~-0.3 %/°C below STC). Hold on — that\'s 2 strings; let\'s say it\'s actually 1 string of 20 modules → Voc at STC = 720 V → at -3°C cold = ~790 V → well above 500 V band per Table 64."
            whatToDo="(1) Pre-test: cover the array with opaque sheets OR perform at pre-dawn / dusk; open the string isolator at the inverter; wait for the inverter DC link capacitor discharge per manufacturer (~30s-2min). (2) Test voltage selection: per Table 64 above-500 V band → 1000 V DC test. Conservative because Voc rises in cold. (3) IR test using the MFT in 1000 V DC mode (BS EN 61557-2 compliant): PV positive to CPC: record (modern dry array typically 10s of MΩ); PV negative to CPC: record; PV positive to PV negative: record. (4) Reg 712.421.101 IMD verification: inspect IMD presence in inverter (typically integrated); trigger inverter self-test via commissioning interface; record IMD make / model / BS EN 61557-8 DoC reference / trip threshold (typically 1-100 kohm depending on configuration) / self-test result. (5) Uncover the array; connect the string isolator; energise the inverter; verify grid synchronisation; verify anti-islanding self-test per Reg 551.7.5. (6) Reg 643.3.3 re-test: with the inverter connected + system running, apply 250 V DC between PV-side live + CPC; record. (7) Functional verification: monitor inverter output vs irradiance; verify yield in line with modelled output. (8) Documentation: per-string IR per test voltage condition + IMD verification + weather (cold dry December morning -3°C; humidity ~60%) + inverter commissioning report from manufacturer engineer + EIC + Schedule of Test Results + cert evidence bundle integrates MIS 3002 PV handover + EREC G98 / G99 reference."
            whyItMatters="PV string IR at commissioning becomes the baseline against which 5-10 yr EICR-equivalent re-tests compare. Recording weather + module temperature + irradiance is what makes the baseline meaningful — a 50 MΩ reading at -3°C dry doesn\'t directly compare with a 30 MΩ reading at 20°C humid summer morning. The IMD function check at commissioning is the safety net for the lifecycle: once the IMD is verified working, ongoing PV insulation monitoring is continuous, and the periodic dedicated IR test confirms the IMD reporting."
          />

          <Scenario
            title="BESS commissioning at a small commercial site — 30 kWh, 400 V DC bus"
            situation="Office unit, three-phase 100 A supply, existing PV 15 kWp installed 3 years ago. Customer adds 30 kWh BESS (commercial-scale, 400 V DC bus, AC inverter coupled). Manufacturer commissioning engineer + electrician on-site together for the BESS IV day."
            whatToDo="Sequence: (1) Manufacturer engineer arrives first — BMS commissioning: cell balance (all cells within 50 mV at SoC midpoint), communications (BMS to inverter to cloud); fault tolerance (over-temp, over-voltage, under-voltage all calibrated); firmware up-to-date; SoC + SoH baseline recorded (SoH typically 100% on new install; baseline for future degradation tracking). Manufacturer engineer signs commissioning record. (2) Electrician Reg 642 inspection — disconnected from supply: BESS DC + AC terminations torque-checked (typically 5-10 Nm per manufacturer); polarity on DC bus (commercial 400 V DC: never assume polarity, verify); isolators per Section 537 + manufacturer; warning notices per Reg 514 + manufacturer (BESS warning + emergency shutdown); cable routing per Section 522 (DC + AC separated where required; fire compartmentation per Chapter 42). (3) Reg 643 AC IV on the BESS AC supply circuit: continuity R1+R2 + R2; IR at 500 V per Reg 643.3 + Table 64 ≤500 V band; polarity; loop impedance at the BESS AC isolator (Zs verified for ADS per Reg 411); RCD operation — Type B 30 mA verified per BS EN 61557-6 (commercial BESS inverter electronics produce DC fault leakage); PFC. (4) DC bus IR per manufacturer: 1000 V DC test per Table 64 above-500 V band; pos-to-earth + neg-to-earth + pos-to-neg; record. Capacitor discharge wait observed (~60s per manufacturer DoC). (5) Reg 551.7.5 anti-islanding: simulate grid loss via switching the supply isolator OR via manufacturer self-test; verify BESS inverter disconnects within specified time (typically <2s); record. (6) Reg 643.3.3 re-test: with BESS inverter connected + running, 250 V DC between live + CPC; record. (7) Reg 551.4.2 multi-source RCD effectiveness: induce fault under combinations (PV-only, PV + BESS); verify RCD trip matrix. (8) Functional verification: BESS charges from grid + PV + discharges to load; BMS communicates SoC + SoH; alarm paths verified. (9) Documentation: BMS commissioning record (manufacturer signed) + EIC for the BESS addition (electrician signed) + Schedule of Test Results + Section 551 + Chapter 57 compliance + EREC G99 reference (commercial BESS likely G99) + cert evidence bundle assembled for customer + DNO + installer audit."
            whyItMatters="Commercial BESS IV is the textbook multi-trade split-scope IV. The BMS commissioning is non-trivial manufacturer-software-locked work; the BS 7671 IV is the electrician\'s expertise. Cert evidence bundle integrating both records is the audit + customer + DNO deliverable. UK 2025-26 commercial BESS market growing — getting this scope-split right is critical for the contractor."
          />

          <CommonMistake
            title="Using 500 V DC IR test on a high-Voc PV string"
            whatHappens="Electrician arrives at PV install + uses the default 500 V DC IR setting on the MFT to test PV strings with Voc 800 V (12 modules × 67 V Voc at STC). 500 V test voltage is BELOW the operating voltage that the array experiences during real-world conditions — meaning the IR result doesn\'t verify insulation at realistic stress. Per Table 64 the above-500 V band requires 1000 V DC test. Reading passes superficially but doesn\'t verify the relevant insulation condition. EICR-equivalent re-test 5 years later catches degradation that should have been baseline at commissioning."
            doInstead="Read the manufacturer datasheet + module Voc + calculate string Voc at STC + adjust for coldest expected ambient (typically +10% above STC for UK -10°C). Select test voltage per Table 64: ≤500 V band → 500 V test; above 500 V → 1000 V test. Modern MFTs include 1000 V DC IR mode. Cert evidence bundle records the test voltage selected + the Voc calculation rationale. The 1000 V test verifies the insulation can withstand realistic operating stress + provides headroom for ambient + ageing factors."
          />

          <CommonMistake
            title="Performing PV DC IR without covering the array — getting hit by 800 V DC"
            whatHappens="Electrician opens DC isolator at inverter, assumes array side is dead, starts disconnecting DC cables — but the array is in full midday sun, generating 800 V DC at the string terminals. Open DC isolator does NOT make the array side dead — it just disconnects from the inverter. Touching the string-side DC cable terminals = direct 800 V DC contact = serious arc + burn risk + potential electrocution."
            doInstead="Reg 641.4 + safety: a PV array in sunlight is a live DC source even with all isolators open. To make it safe for DC work: cover the array with opaque sheets / tarpaulins (suppresses generation); OR open string-level disconnects (rapid shutdown devices on each module — Tigo, SolarEdge optimisers, Enphase micro-inverters) per manufacturer; OR work at pre-dawn / post-dusk with the array effectively shaded. Treat the DC side as live until proven dead via tester reading. Reg 712.410.101: electrical equipment on the DC side shall be considered to be energized, even when the AC side is disconnected from the grid or when the inverter is disconnected from the DC side. Read it, live it."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'DC IR is different from AC IR. Test voltage per Table 64 + nominal circuit voltage band. Reg 643.3.3 re-test at 250 V after equipment connected.',
              'PV string IR: Voc governs test voltage. Above 500 V band uses 1000 V DC test. Cold ambient raises Voc — design test voltage conservatively.',
              'PV array in sunlight is live DC source even with isolators open. Reg 712.410.101. Cover the array or use rapid shutdown before DC work.',
              'Reg 712.421.101 IMD: mandatory presence + BS EN 61557-8 + self-test at IV + ongoing lifecycle monitoring. Modern PV inverters typically integrate IMD.',
              'BESS DC bus IV: BMS commissioning is the prerequisite (manufacturer-side); electrician does Reg 642 + AC IV + DC IR per manufacturer + anti-islanding.',
              'EV DC fast: manufacturer engineer handles DC commissioning; electrician handles AC supply IV + Section 722 PME architecture + DC connector physical install.',
              'Micro-hydro DC interim: bespoke per manufacturer DoC; Table 64 + Reg 643.3 framework applies; weather + wet environment + cable IR considerations.',
              'PV IR drifts with weather state (humidity, irradiance, module temperature, age). Record conditions; baseline at commissioning; trend over EICR cycles.',
              'Reg 643.3.3 two-stage protocol: pre-connection IR at appropriate Table 64 voltage + 250 V DC re-test after equipment connected.',
              'BS EN 61557-2 IR tester family; BS EN 61557-8 IMD; BS EN 61557-6 RCD. Tester compliance recorded on cert evidence bundle.',
              'Capacitor discharge wait times for BESS + PV inverter + EV charger DC links; manufacturer DoC mandates the wait.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 2 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-12-section-1')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                12.1 Part 6 IV framework
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-12-section-3')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                12.3 BESS health monitoring
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
