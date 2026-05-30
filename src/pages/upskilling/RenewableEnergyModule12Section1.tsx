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
    id: 'm12s1-reg-641-scope',
    question:
      'Per Reg 641.1, when must initial verification take place on a renewable-energy installation?',
    options: [
      'After it has been running for a year',
      'During erection and on completion before being put into service. Reg 641.1: every installation shall, during erection and on completion before being put into service, be inspected and tested to verify so far as is reasonably practicable that the requirements of BS 7671 have been met. For LCT this means continuous verification during install + final IV before energisation + final IV before grid-paralleled export commencement',
      'Only when the customer asks',
      'Only if the DNO mandates it',
    ],
    correctIndex: 1,
    explanation:
      'Reg 641.1 is categorical — verification happens during erection AND on completion BEFORE being put into service. For renewable-energy installs this has three implications: (1) continuous verification during the install rather than a one-off at the end (PV DC string isolation tested before connecting strings to the inverter; BESS DC bus IR tested before energising the BESS; etc); (2) final initial verification before the installation is energised on the AC side; (3) for grid-paralleled generators, an additional verification gate before export commencement per Reg 551.7.5 anti-islanding + the EREC G98 / G99 sign-off. Reg 641.2: results of assessment of fundamental principles + general characteristics (Sections 311-313) + info from Reg 514.9.1 must be available to the verifier — meaning the design + drawings + manufacturer DoCs + commissioning procedure are pre-requisites for verification.',
  },
  {
    id: 'm12s1-bs-en-61557',
    question:
      'Per Reg 651.3, what is the role of BS EN 61557 in instrument selection for LCT testing?',
    options: [
      'Optional preference',
      'Mandatory framework. Reg 651.3: measuring instruments and monitoring equipment and methods shall be chosen in accordance with the relevant parts of BS EN 61557. If other instruments are used they shall provide no less a degree of performance and safety. BS EN 61557 family covers: -1 general, -2 IR, -3 loop impedance, -4 continuity, -5 earth electrode resistance, -6 RCD, -8 insulation monitoring (for PV IMD), -9 IT fault location, -10 multi-function. LCT tester must comply with the relevant parts',
      'Only for new instruments',
      'Only for IR testers',
    ],
    correctIndex: 1,
    explanation:
      'Reg 651.3 mandates BS EN 61557 compliance for measuring instruments + monitoring equipment + methods used in inspection + testing. BS EN 61557 family parts relevant to LCT verification: Part 1 General requirements; Part 2 Insulation resistance (PV string IR, BESS DC bus IR, AC IR); Part 3 Loop impedance (Zs measurement); Part 4 Continuity (R1+R2, R2); Part 5 Earth electrode resistance; Part 6 RCD operation (essential — Type AC / A / B per the source electronics); Part 8 Insulation monitoring devices (Reg 712.421.101 PV IMD complies with BS EN 61557-8); Part 9 IT fault location; Part 10 Multi-function. The LCT installer\'s tester (typical Megger MFT, Fluke 1664, Metrel MI series) declares compliance with the relevant parts on its manufacturer datasheet. Cert evidence bundle records: tester make + model + serial + calibration date + BS EN 61557 part compliance on the EIC + Schedule of Test Results.',
  },
  {
    id: 'm12s1-multi-source-verification',
    question:
      'Why does multi-source LCT verification require extending beyond standard single-source AC verification?',
    options: [
      'Identical to single source',
      'Multi-source sites (PV + BESS + EV + heat pump + grid) have multiple energy paths. The standard single-source AC IV checks one supply at the origin + each circuit downstream. With multi-source: (a) each generator is its own source with its own IV requirement; (b) Reg 551.4.2 RCD effectiveness must be verified across EVERY combination of sources operating; (c) anti-islanding (Reg 551.7.5) verified per source + collectively; (d) DC circuit IV (PV strings, BESS DC bus) sits alongside AC IV with different test voltages + procedures',
      'Random',
      'No reason',
    ],
    correctIndex: 1,
    explanation:
      'Standard single-source verification (DNO supply → MET → CU → circuits → loads) is the BS 7671 baseline. Multi-source LCT verification extends this: (1) Per-source IV — PV array verified per Section 712 (DC IR + AC IR + IMD + anti-islanding), BESS verified per Chapter 57 (DC bus IR + AC IR + BMS commissioning + anti-islanding), heat pump verified per Part 4-7 + manufacturer commissioning. (2) Reg 551.4.2 multi-source RCD effectiveness — at commissioning, induce a fault while DIFFERENT COMBINATIONS of sources are running (PV-only, PV + BESS, all sources) + verify the correct RCD trips for each combination. (3) Reg 551.7.5 anti-islanding verified per source via DNO-witnessed or simulated grid-loss test. (4) DC IV on PV / BESS / EV DC fast — different test voltages (250 V / 500 V / 1000 V) + manufacturer-permitted procedures + risk of damage if standard AC IV procedure applied to DC equipment. Cert evidence bundle: per-source EIC entries + multi-source RCD test matrix + anti-islanding records + DC IV records.',
  },
  {
    id: 'm12s1-642-vs-643',
    question:
      'What is the distinction between Reg 642 (inspection) and Reg 643 (testing) in the initial verification sequence?',
    options: [
      'Identical',
      'Reg 642 = visual / dead inspection precedes testing. Reg 642.1: inspection shall precede testing and shall normally be done with the installation under inspection disconnected from the supply. Reg 642.3 lists at least 18 inspection items (connections, identification, routing, conductor selection, protective device selection, voltage drop, isolators, warning notices, etc). Reg 643 = live tests — continuity, IR, polarity, ADS, RCD, prospective fault current, functional, voltage drop verification. Sequence matters — fail an inspection item, fix it, then test',
      'Reg 642 is live',
      'Reg 643 is dead',
    ],
    correctIndex: 1,
    explanation:
      'Reg 642 (Inspection) precedes Reg 643 (Testing) categorically. Reg 642.1: inspection shall precede testing AND shall normally be done with the installation under inspection disconnected from the supply. Reg 642.3 lists at least the inspection items: (a) connection of conductors; (b) identification of conductors; (c) routing of cables in prescribed zones or protected against mechanical damage; (d) selection of conductors for current-carrying capacity + voltage drop; (e) connection of single-pole devices for protection or switching in line conductors only; (f) correct connection of accessories + equipment; (g) presence of fire barriers; (h) methods of basic protection; (i) methods of fault protection; (j) provision of additional protection; (k) prevention of mutual detrimental influence; (l) presence of appropriate devices for isolation + switching; (m) presence of undervoltage protective devices where required; (n) labelling of circuits, protective devices, etc; (o) selection of equipment + measures appropriate to external influences; (p) adequacy of connections; (q) presence of warning notices + diagrams; (r) erection methods. Reg 643 then sequences live tests. For LCT installs, inspection items often include DC string isolators, AC isolators per Reg 537, anti-islanding device presence, manufacturer DoC, MCS handover documentation.',
  },
];

const quizQuestions = [
  {
    question:
      'A combined PV (6 kWp) + BESS (10 kWh) + EV charger (7 kW) install. What initial verification framework applies?',
    options: [
      'Single AC IV only',
      'Full Part 6 IV applied per source + multi-source extensions: PV per Section 712 (Reg 712.421.101 IMD + DC IR at 1000 V + AC IR + anti-islanding per Reg 551.7.5) + BESS per Chapter 57 (BMS commissioning + DC bus IR + AC IR + anti-islanding) + EV per Section 722 (Reg 722.411.4 PME / open-PEN check + RDC-DD + RCD Type B if integral) + Reg 551.4.2 multi-source RCD effectiveness across combinations + EIC + Schedule of Inspections + Schedule of Test Results + cert evidence bundle integrating all sources',
      'Only PV',
      'Only EV',
    ],
    correctAnswer: 1,
    explanation:
      'Combined LCT install initial verification: each source has its specific framework + the multi-source extensions apply. (1) PV — Section 712.421.101 IMD verification + Section 712 DC IR procedure (test voltage per Table 64 — typically 500 V or 1000 V depending on system Voc); AC IR per Reg 643.3; anti-islanding per Reg 551.7.5. (2) BESS — BMS commissioning per manufacturer (cell balance, communications, fault tolerance); Chapter 57 DC bus isolation + IR; AC IR per Reg 643.3; anti-islanding. (3) EV — Section 722.411.4 PME / open-PEN architecture; Type B RCD or RDC-DD per manufacturer DoC; protective conductor + earthing verification specific to the EV charging point. (4) Multi-source extensions — Reg 551.4.2 RCD effectiveness: induce a fault, verify RCD trip across combinations (PV only, PV + BESS, PV + BESS + EV charging); record results matrix. (5) Documentation — single EIC covers the additions + Schedule of Test Results lists each source\'s tests + cert evidence bundle integrates per-MCS handover packs (MIS 3002 PV + Chapter 57 BESS + Section 722 EV). Cert + handover go to customer + DNO + MCS Ofgem registration where applicable.',
  },
  {
    question:
      'BS EN 61557 part for an insulation monitoring device (IMD) on PV per Reg 712.421.101 — which part?',
    options: [
      'Part 6',
      'Part 8 — Insulation monitoring devices. Reg 712.421.101.1: an insulation monitoring device (IMD) shall be installed except where Reg 712.421.101.2 applies, to verify the insulation status on the DC side throughout the life cycle of the PV array. The NOTE confirms IMDs complying with BS EN 61557-8 provide this function. The monitoring function may be provided by an inverter with integrated insulation monitoring. At IV the IMD presence + function + alarm path are inspected + tested',
      'Part 2',
      'Part 10',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 712.421.101 + BS EN 61557-8: PV systems require an IMD on the DC side to verify insulation status throughout the array life. BS EN 61557-8 is the IMD standard. Most modern grid-tied PV inverters have integrated IMD (the inverter checks DC isolation before connection + on fault). At initial verification: (1) inspect that an IMD is present (either integrated into the inverter or as a separate device); (2) verify the IMD alarm function via the manufacturer self-test feature; (3) record the IMD type + DoC reference; (4) document the IMD trip threshold (typically configured per manufacturer — kohm range for low-voltage DC); (5) confirm the IMD trip path (does it disable the inverter, raise alarm, or both). Cert evidence bundle records: IMD make + model + manufacturer DoC + BS EN 61557-8 compliance + IV test result. The IMD complements (not replaces) the standard DC string IR test at install. Reg 712.421.101.2 exception: where galvanic separation between AC + DC sides plus other conditions are met, the IMD may be omitted — verify the exception applies before omitting.',
  },
  {
    question:
      'Reg 642.1 inspection precedes testing. Why is this sequence critical for LCT installs?',
    options: [
      'No reason',
      'Live testing (Reg 643) on an installation with a visible inspection defect (e.g. wrong polarity, missing earth, unsupported cable, incorrect Type RCD for the source electronics) can be DANGEROUS — risk of damage to the tester, equipment, or person. Reg 642.1 also requires inspection while disconnected from supply — for LCT this includes confirming DC isolators + AC isolators are open + PV array covered or string isolators open + BESS DC bus open. Catches install errors before they become fault events',
      'Random',
      'Reg 642 is optional',
    ],
    correctAnswer: 1,
    explanation:
      'Inspection precedes testing because: (1) Safety — live testing on an installation with visible defects (cross-connected polarity, missing earth, broken termination, wrong-rated protective device) risks tester damage + fault current + equipment damage + personal injury. (2) Dead inspection — Reg 642.1 specifies the installation under inspection should be disconnected from supply. For LCT this means: DC string isolators open + PV modules covered or shaded + BESS DC bus isolator open + AC supply isolated. Catches: incorrect polarity at the inverter DC terminals (PV inverter destroyed in seconds if polarity reversed + DC isolator closed); BESS DC fuses installed wrong rating; battery cell strings cross-connected. (3) Documentation flow — Reg 642.2 requires sufficient information to be available + Reg 642.3 mandates checking specific items (18+ items listed). The inspection record feeds the Schedule of Inspections on the EIC. (4) Order — Reg 643.2 Continuity precedes Reg 643.3 Insulation Resistance (must verify the protective conductor is continuous + connected before applying 500 V or higher to verify the insulation). Cert evidence bundle: Schedule of Inspections shows the inspection completion + outcome.',
  },
  {
    question:
      'A skilled person under Reg 641.6 must compile + sign the EIC per Reg 644.5. What does "skilled person competent to verify" mean for LCT?',
    options: [
      'Anyone with a course',
      'BS 7671 + LCT competency. Reg 641.6: verification shall be made by one or more skilled persons competent in such work. Reg 644.5: EICs shall be compiled + signed by skilled persons competent to verify BS 7671 has been met. For LCT this means: BS 7671 18th Edition / A4:2026 qualification (C&G 2382 + 2391 etc); LCT-specific competency where applicable (PV per MCS PV competency; EV per IEE COP; BESS per manufacturer training); manufacturer commissioning training for the specific equipment (proprietary inverter + BMS commissioning typically requires manufacturer course + sign-off)',
      'Random',
      'No competency required',
    ],
    correctAnswer: 1,
    explanation:
      'Skilled person competent to verify (Reg 641.6 + Reg 644.5) for LCT install: (1) BS 7671 18th Edition + A4:2026 qualification — typically C&G 2391 Initial Verification + Periodic Inspection; competence covering the regs invoked by the install. (2) LCT-specific competency — for PV, MCS PV competency (MCS-affiliated installer) + IET COP for Solar PV; for EV, IET COP for EV Charging Installations; for BESS, MCS Battery Storage where applicable + manufacturer commissioning. (3) Manufacturer commissioning training — most LCT manufacturers (Tesla Powerwall, GivEnergy, Solis, Fronius, etc) require certified-installer course + sign-off for warranty + commissioning. (4) Multi-trade boundaries — the electrician\'s EIC covers the electrical install side; the MCS company\'s handover pack integrates this with the technology-specific sizing + commissioning. (5) The skilled person\'s name + signature appears on the EIC + Schedule of Test Results — recorded in cert evidence bundle + customer records + DNO submission where applicable.',
  },
  {
    question:
      'Where does the EIC fit in the larger LCT handover documentation?',
    options: [
      'It is the only document',
      'EIC is ONE document in a larger pack. The MCS handover pack typically contains: MCS sizing report (energy yield + payback); product DoCs (modules + inverters + BMS); commissioning report (inverter + BMS + anti-islanding); BS 7671 EIC + Schedule of Inspections + Schedule of Test Results (the electrician\'s contribution); DNO EREC G98 / G99 reference; warranty registration; customer operating guide. EIC is the BS 7671-side anchor + the cert evidence bundle assembles around it',
      'Only EIC matters',
      'Random',
    ],
    correctAnswer: 1,
    explanation:
      'EIC is the BS 7671 electrical install certificate — a critical document but one part of a larger LCT handover pack. The MCS handover pack typical contents: (1) MCS sizing report — yield modelling + payback + grant submission (for technologies eligible like heat pumps under BUS). (2) Product DoCs + datasheets — PV modules, inverters, BMS, mounting + ancillary equipment. (3) Commissioning report — inverter + BMS + anti-islanding + DNO sign-off. (4) BS 7671 EIC — the electrician\'s contribution per Reg 644.5; integrated alongside the technology-specific commissioning record. (5) Schedule of Inspections + Schedule of Test Results — supporting the EIC. (6) EREC G98 / G99 reference — DNO notification documentation. (7) Warranty registration — per manufacturer (PV typically 10-25 yr; inverters 10-25 yr; BMS 10-15 yr). (8) Customer operating guide — how to operate the system, fault response, contacts. (9) Annual monitoring expectations — yield monitoring portal access, alerts. The cert evidence bundle assembles these into a single deliverable to the customer + a digital + paper copy for the installer\'s records + a submission to MCS where applicable.',
  },
  {
    question:
      'Reg 641.5 covers additions / alterations. What does this mean when retrofitting PV onto an existing 1990s installation?',
    options: [
      'No relevance',
      'Reg 641.5: for an addition or alteration, it shall be verified that the addition or alteration COMPLIES with BS 7671 AND DOES NOT IMPAIR the safety of the existing installation. PV retrofit onto a 1990s install: (a) the new PV circuit must meet BS 7671:2018+A4:2026; (b) the existing CU + earthing arrangement must be assessed to confirm the PV addition doesn\'t impair safety. If the existing CU has no main RCD, no Type S architecture, insufficient ways, the PV addition may trigger CU replacement / upgrade',
      'Random',
      'New install only',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 641.5 is the addition / alteration verification gate. For PV retrofit on a 1990s install: (1) The new PV circuit must comply with current BS 7671 — Section 712 + Reg 551 + Reg 415.1 + manufacturer DoC. (2) The existing installation must be assessed for whether the PV addition impairs its safety. Common findings: (a) Existing CU has no main RCD (or only a 100 mA Type AC) — the PV inverter electronics may produce DC fault leakage requiring Type B; (b) Existing earthing arrangement is TT or TN-C-S with no PV-specific consideration — re-evaluate for the new export path; (c) Existing CU has no spare ways for the new PV circuit; (d) Existing wiring shows degraded insulation that won\'t pass current IR thresholds. (3) The verifier\'s judgment: minor non-conformance may be acceptable with notification; substantial impairment requires remediation before PV commissioned. UK 2025-26 typical: PV retrofit ~£5-8k + CU replacement frequently required ~£600-1500 + cert evidence bundle records both the new PV install + the existing-install assessment + any remediation.',
  },
];

const faqs = [
  {
    question: 'Does Part 6 IV apply differently to PV vs heat pumps?',
    answer:
      'Part 6 is the unified IV framework — Chapter 64 + Reg 641-644. What differs is the source-specific scope: PV adds Section 712 (IMD, DC IR procedure, anti-islanding); heat pumps don\'t generate so they sit under Part 4-7 + manufacturer commissioning (no Section 551 source-specific requirements). PV is a Section 551 generating set + Section 712 PV installation; heat pump is a load. Verification depth differs accordingly.',
  },
  {
    question: 'Can a single EIC cover a multi-source LCT site?',
    answer:
      'Yes — the EIC covers the electrical installation work done by that contractor. For multi-source sites the EIC lists the circuits + equipment + tests; the Schedule of Inspections + Schedule of Test Results detail per-circuit results. The cert evidence bundle adds the per-technology MCS handover packs alongside. One EIC + multi-source detail is the standard pattern; some installers issue per-technology EICs for clarity.',
  },
  {
    question: 'Does the customer get the EIC + supporting documents at handover?',
    answer:
      'Yes. Reg 644 + the BS 7671 framework require the EIC + Schedule of Inspections + Schedule of Test Results to be given to the customer / person ordering the work. For LCT installs this typically goes into the MCS handover pack as one section + the customer receives a digital + paper copy. The installer keeps a copy (cert evidence bundle) for their records + audit + Building Control + DNO submission where applicable.',
  },
  {
    question: 'How long does multi-source LCT initial verification take?',
    answer:
      'For typical 6 kWp PV + 10 kWh BESS + EV charger combined IV: 2-4 hours on-site testing + 1-2 hours documentation + 30-60 mins anti-islanding test (often DNO-witnessed or via manufacturer self-test). Compared with a single AC IV (1-2 hours), the multi-source IV is 4-6x more work — reflected in the contractor\'s pricing. Pre-commissioning checks (manufacturer commissioning) typically add 2-4 hours per source.',
  },
  {
    question: 'What if a test fails during initial verification?',
    answer:
      'Reg 643.7.2: if any test indicates a failure to comply, that test AND any preceding test, the results of which may have been influenced by the fault, shall be repeated after the fault has been rectified. So a continuity test fail + an IR test pass — once you fix the continuity fault, you re-test continuity AND re-test IR (which may have been influenced by the earlier fault path). For LCT this protects against silent issues: a bad earth connection somewhere in the system might pass IR while masking a real fault path.',
  },
];

export default function RenewableEnergyModule12Section1() {
  const navigate = useNavigate();

  useSEO({
    title: 'Part 6 Initial Verification applied to LCT | Renewable Energy 12.1 | Elec-Mate',
    description:
      'Chapter 64 Initial Verification + Reg 641-644 framework applied to PV / BESS / EV / heat pumps / wind / hydro / CHP. BS EN 61557 instrument family. Reg 642.3 inspection checklist + Reg 643 testing sequence. Multi-source verification beyond single-source AC.',
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
            eyebrow="Module 12 · Section 1 · BS 7671:2018+A4:2026 · Chapter 64 + Reg 641-644"
            title="Part 6 Initial Verification framework applied to LCT"
            description="The Chapter 64 + Reg 641-644 initial verification framework applied to renewable-energy installations. BS EN 61557 instrument family. Reg 642 inspection + Reg 643 testing sequence. Multi-source extensions beyond single-source AC verification. Per-source + cross-source verification with cert evidence bundle as the integrating record."
            tone="yellow"
          />

          <TLDR
            points={[
              'Reg 641.1: every installation shall, during erection and on completion before being put into service, be inspected + tested to verify so far as is reasonably practicable that the requirements of BS 7671 have been met.',
              'Reg 642 (inspection) precedes Reg 643 (testing). Inspection while disconnected from supply. Reg 642.3 lists at least 18 inspection items.',
              'Reg 643 testing sequence: continuity → IR → polarity → ADS → RCD operation → prospective fault current → functional → voltage drop. LCT adds DC IR, anti-islanding verification, multi-source RCD effectiveness.',
              'Reg 651.3: instruments shall comply with the relevant parts of BS EN 61557. Parts 2 (IR), 3 (loop), 4 (continuity), 6 (RCD), 8 (IMD for PV) most relevant.',
              'Multi-source LCT verification extends single-source AC IV: per-source IV + Reg 551.4.2 RCD effectiveness across source combinations + Reg 551.7.5 anti-islanding + DC IV on PV / BESS / EV DC fast.',
              'Reg 641.5: additions / alterations must comply with BS 7671 AND not impair the existing installation safety. PV retrofit onto older CU often triggers CU upgrade.',
              'Reg 641.6 + Reg 644.5: skilled person competent in such work compiles + signs the EIC. For LCT: BS 7671 qualification + LCT-specific competency + manufacturer commissioning.',
              'EIC + Schedule of Inspections + Schedule of Test Results are the BS 7671-side anchors in a larger MCS handover pack delivered to the customer.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Apply Reg 641.1-641.6 initial verification framework to LCT installs (PV / BESS / EV / heat pump / wind / hydro / CHP).',
              'Sequence Reg 642 inspection items before Reg 643 testing with disconnected-from-supply discipline.',
              'Select BS EN 61557-compliant instruments for IR, continuity, loop impedance, RCD, IMD verification.',
              'Apply Reg 643 testing sequence (continuity → IR → polarity → ADS → RCD → PFC → functional → voltage drop).',
              'Extend single-source AC IV to multi-source LCT with per-source + cross-source verification.',
              'Apply Reg 641.5 addition / alteration logic to PV / BESS retrofits onto existing installations.',
              'Identify the skilled-person competencies needed for LCT IV per Reg 641.6 + Reg 644.5.',
              'Position EIC + Schedule of Inspections + Schedule of Test Results within the larger MCS handover pack.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            Verification doesn\'t happen at the end. It happens during erection and on completion before being put into service. Read Reg 641.1 — that\'s the whole framework right there.
          </Pullquote>

          <ContentEyebrow>Reg 641 framework + verification sequence</ContentEyebrow>

          <ConceptBlock
            title="Reg 641.1-641.6 the initial verification mandate"
            plainEnglish="Reg 641.1: every installation shall, during erection and on completion before being put into service, be inspected and tested to verify so far as is reasonably practicable that the requirements of BS 7671 have been met. The other 641 regs scaffold this — assessment availability (641.2), comparison with criteria (641.3), safety precautions (641.4), additions / alterations (641.5), skilled person (641.6)."
            onSite="For LCT installs this means continuous verification across the install lifecycle: pre-energisation inspection of DC strings + BESS cells; commissioning testing of inverter + BMS; final IV before grid-paralleled export commences. Not one-off — multi-stage."
          >
            <p>Reg 641 family applied to LCT:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Reg 641.1</strong> — during
                erection AND on completion before being put into service. For LCT: continuous
                + final. Pre-energisation DC string IR + post-energisation AC IR
              </li>
              <li>
                <strong className="text-white">Reg 641.2</strong> — assessment of
                fundamental principles + general characteristics + Reg 514.9.1
                information shall be available to verifier. Design + drawings + DoCs +
                commissioning procedure as pre-requisites
              </li>
              <li>
                <strong className="text-white">Reg 641.3</strong> — comparison of
                results with relevant criteria to confirm BS 7671 requirements met.
                For LCT: per-source criteria + multi-source extensions
              </li>
              <li>
                <strong className="text-white">Reg 641.4</strong> — precautions to
                avoid danger to persons + livestock + damage to property + installed
                equipment during inspection + testing. LCT: PV array covered / shaded;
                DC isolators open; BESS DC bus open; AC isolated
              </li>
              <li>
                <strong className="text-white">Reg 641.5</strong> — addition /
                alteration shall comply AND not impair safety of existing. PV / BESS
                retrofit triggers existing-CU assessment + frequent upgrade
              </li>
              <li>
                <strong className="text-white">Reg 641.6</strong> — verification
                by skilled persons competent in such work. For LCT: BS 7671 + LCT-specific
                + manufacturer commissioning competencies
              </li>
              <li>
                <strong className="text-white">Reg 644.5</strong> — EIC compiled
                + signed by skilled person competent to verify. The cert evidence bundle
                signature anchor
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — EIC + Schedule of Inspections + Schedule of Test Results
                + per-source supporting docs + manufacturer commissioning records + MCS
                handover pack as the integrating record
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Reg 642 inspection before testing"
            plainEnglish="Reg 642.1: inspection shall precede testing and shall normally be done with that part of the installation under inspection disconnected from the supply. Reg 642.3 lists the inspection items — at least 18 (a) through (r). Sequence matters because live testing on an installation with a visible defect is dangerous."
            onSite="For LCT installs the disconnected-from-supply rule means: PV array covered or string isolators open; BESS DC bus open; AC isolated; EV charger isolated. Inspection items checked + ticked off against Schedule of Inspections before any live test."
          >
            <p>Reg 642.3 inspection items (a)-(r):</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">(a) Connection of
                  conductors</strong> — terminations torque-tightened, no loose strands.
                LCT: DC string + BESS DC + AC inverter terminations all checked
              </li>
              <li>
                <strong className="text-white">(b) Identification of
                  conductors</strong> — colour code + labelling. LCT: brown live / blue
                neutral / green-yellow CPC; DC red positive / black or grey negative
                (per manufacturer)
              </li>
              <li>
                <strong className="text-white">(c) Routing of
                  cables</strong> — in prescribed zones or protected against mechanical
                damage per Section 522. LCT: roof PV cables clipped + clear of moving
                parts; BESS DC routed safely
              </li>
              <li>
                <strong className="text-white">(d) Conductor
                  selection</strong> — current-carrying capacity + voltage drop per design.
                LCT: PV DC cable Isc + 1.25 factor; AC cable per inverter rating
              </li>
              <li>
                <strong className="text-white">(e)-(g)</strong> — single-pole
                devices in line conductors only; correct accessory connection; fire
                barriers. LCT: PV DC isolator polarity-correct; combiner box gland
                fire-rated
              </li>
              <li>
                <strong className="text-white">(h)-(j)</strong> — basic +
                fault + additional protection methods. LCT: Class II PV DC per Reg
                712.412.101; Reg 415.1 30 mA RCD; Type B where DC fault leakage
              </li>
              <li>
                <strong className="text-white">(k)-(m)</strong> — mutual
                detrimental influence; isolation + switching; undervoltage. LCT:
                generation isolators per Section 537; anti-islanding device
              </li>
              <li>
                <strong className="text-white">(n)-(r)</strong> — labelling +
                external influences + connections + warning notices + erection
                methods. LCT: PV warning notices per Reg 712.514; G98 / G99 reference;
                cert evidence bundle records each item
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 641.1 — Initial verification mandate"
            clause="Every installation shall, during erection and on completion before being put into service, be inspected and tested to verify, so far as is reasonably practicable, that the requirements of BS 7671 have been met."
            meaning={`Reg 641.1 is the foundational initial verification mandate. The phrase "during erection and on completion before being put into service" is doing real work — verification is not a one-off final check; it spans the install lifecycle. For LCT this matters because the typical install has multiple energisation stages: DC strings energised (PV) or DC bus closed (BESS) before AC; AC energised before grid synchronisation; grid synchronisation + anti-islanding sign-off before sustained export. Each stage has IV gates. "So far as is reasonably practicable" sets the diligence threshold — the verifier applies the relevant Reg 642 + Reg 643 procedures + manufacturer commissioning + Reg 551 multi-source extensions to the install scope at hand. Cert evidence bundle records: every stage gate + test results + sign-off + skilled-person signatures.`}
          />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>BS EN 61557 instrument family + multi-source extensions</ContentEyebrow>

          <Pullquote>
            The right tester for the right test, calibrated, in date, with the right BS EN 61557 part on its datasheet. If the tester is not compliant, neither is the verification.
          </Pullquote>

          <ConceptBlock
            title="BS EN 61557 instrument family applied to LCT"
            plainEnglish="Reg 651.3: measuring instruments + monitoring equipment + methods shall be chosen in accordance with the relevant parts of BS EN 61557. The standard family covers IR, continuity, loop impedance, RCD operation, IMD, multi-function testers. For LCT verification, the multi-function tester typical (Megger MFT 1741+, Fluke 1664 FC, Metrel MI 3155, etc) declares compliance with the relevant parts."
            onSite="The LCT installer\'s typical kit includes: multi-function tester (covers Parts 2, 3, 4, 6, 10); separate calibrated DC IR tester capable of 1000 V for high-Voc PV arrays where required; thermal imager (Reg 651.4 photographic evidence + thermal anomaly detection); torque wrench for terminations + DC connector crimp tool. Calibration in date + manufacturer DoCs + cert evidence bundle records instrument details on every test result."
          >
            <p>BS EN 61557 parts + LCT relevance:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Part 1 General</strong> — general
                safety + accuracy requirements for the tester. Covers all subsequent
                parts
              </li>
              <li>
                <strong className="text-white">Part 2 IR</strong> — insulation
                resistance. LCT: PV string IR at 500 V or 1000 V DC; BESS DC bus IR;
                AC IR at 500 V per Reg 643.3 + Table 64
              </li>
              <li>
                <strong className="text-white">Part 3 Loop
                  impedance</strong> — Zs measurement. LCT: confirms ADS time per Reg
                411.4 / Reg 411.5 on the new LCT circuits
              </li>
              <li>
                <strong className="text-white">Part 4 Continuity</strong> —
                R1+R2 + R2 measurements. LCT: protective conductor continuity on PV
                + BESS + EV charging point earth path
              </li>
              <li>
                <strong className="text-white">Part 5 Earth electrode
                  resistance</strong> — TT earthing or supplementary local earth.
                LCT: outdoor PV / wind / hydro may use TT or local earth electrodes
              </li>
              <li>
                <strong className="text-white">Part 6 RCD operation</strong> —
                RCD trip current + time per type. LCT: Type AC / A / B selection
                depends on source electronics; Type B critical for DC-fault-leakage
                sources
              </li>
              <li>
                <strong className="text-white">Part 8 IMD</strong> — insulation
                monitoring device. LCT: Reg 712.421.101 PV IMD compliance + IMD
                self-test at IV
              </li>
              <li>
                <strong className="text-white">Part 10 Multi-function</strong>
                — the typical MFT tester combines Parts 2, 3, 4, 6 in one instrument.
                LCT: ensure the model covers Type B RCD testing where the install
                requires it
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Multi-source LCT verification beyond single-source AC"
            plainEnglish="Single-source AC IV is the BS 7671 baseline (DNO supply → MET → CU → circuits → loads). Multi-source LCT extends this with per-source + cross-source verification. Per-source: each generator has its own framework (Section 712 PV, Chapter 57 BESS, Section 722 EV, manufacturer commissioning). Cross-source: Reg 551.4.2 RCD effectiveness across combinations + Reg 551.7.5 anti-islanding per source + collectively."
            onSite="The verifier plans the IV sequence to handle multi-source: (1) per-source IV with the other sources isolated where possible; (2) cross-source combination tests — induce a fault while operating PV-only, PV + BESS, all sources, verify the correct RCD trips; (3) anti-islanding verification per source (DNO-witnessed or simulated); (4) DC IV (PV strings, BESS DC bus) at the right test voltages with manufacturer-permitted procedures."
          >
            <p>Multi-source LCT IV extensions:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Per-source IV</strong> —
                PV per Section 712 (DC IR + AC IR + IMD + anti-islanding); BESS per
                Chapter 57 (DC bus + AC + BMS); EV per Section 722 (PME architecture
                + Type B / RDC-DD); heat pump per Part 4-7 + manufacturer
              </li>
              <li>
                <strong className="text-white">Reg 551.4.2 RCD
                  multi-source</strong> — verify each combination of sources triggers
                correct RCD on fault. Test matrix: PV-only, PV + BESS, PV + BESS + EV
                charging, etc. Record results
              </li>
              <li>
                <strong className="text-white">Reg 551.7.5
                  anti-islanding</strong> — verify per source the generator disconnects
                on grid loss. DNO-witnessed or manufacturer-self-test
              </li>
              <li>
                <strong className="text-white">DC IV procedures</strong>
                — PV DC at 500 V or 1000 V per Voc; BESS DC bus per manufacturer; EV
                DC fast per CHAdeMO / CCS commissioning. §12.2 covers DC IR specifics
              </li>
              <li>
                <strong className="text-white">BMS commissioning</strong>
                — BESS BMS verified per manufacturer: cell balance, communications,
                fault tolerance, SoC + SoH baseline. §12.3 covers BESS health
              </li>
              <li>
                <strong className="text-white">PEN-fault
                  verification</strong> — outdoor LCT (EV, outdoor PV, outdoor BESS,
                ASHP outdoor unit): OPDD / RDC-DD verification per Reg 722.411.4 +
                Section 712. §12.4 covers PEN faults
              </li>
              <li>
                <strong className="text-white">Documentation</strong>
                — single EIC covers the work with per-source detail in Schedule of
                Test Results; cert evidence bundle assembles per-source MCS handover
                packs around the EIC
              </li>
              <li>
                <strong className="text-white">Skilled person</strong>
                — Reg 641.6 + Reg 644.5: BS 7671 + LCT competency + manufacturer
                commissioning. Multi-trade boundary: electrician\'s EIC + technology
                specialist commissioning
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 642.3 — Inspection items"
            clause="The inspection shall include at least the checking of the following items where relevant: (a) connection of conductors; (b) identification of conductors; (c) routing of cables in prescribed zones, or protection against mechanical damage, in compliance with Section 522; (d) selection of conductors for current-carrying capacity and voltage drop, in accordance with the design; (e) connection of single-pole devices for protection or switching in line conductors only; (f) correct connection of accessories and equipment; (g) presence of fire barriers, suitable seals and protection against thermal effects; (h) methods of basic protection; (i) methods of fault protection; (j) provision of additional protection ..."
            meaning="Reg 642.3 lists the minimum inspection items — at least (a) through (r). The where-relevant qualifier matters for LCT: not every item applies to every install (a domestic EV charger doesn\'t have fire barriers; a PV array doesn\'t have single-pole switching in the AC sense). The verifier ticks the applicable items + records observations on Schedule of Inspections. For LCT additions specifically: items (d) conductor selection — DC cable for PV per Isc + 1.25 factor (Reg 712.433.101); (e) single-pole devices — DC isolators are typically 2-pole for PV positive + negative isolation; (h)-(j) basic + fault + additional protection — PV Class II per Reg 712.412.101, Reg 415.1 30 mA RCD; (n) labelling — Reg 712.514 PV warning notices at origin + metering + CU; (q) warning notices + diagrams — Reg 712.514 + Section 537 isolator labelling. Cert evidence bundle: Schedule of Inspections records each ticked item + observation."
          />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>Addition / alteration verification + the skilled person</ContentEyebrow>

          <ConceptBlock
            title="Reg 641.5 addition / alteration logic for LCT retrofit"
            plainEnglish="Reg 641.5: for an addition or alteration to an existing installation, it shall be verified that the addition or alteration complies with BS 7671 and does not impair the safety of the existing installation. PV / BESS / EV retrofit onto an existing installation is the canonical addition case — and the existing-install assessment frequently triggers remediation."
            onSite="UK 2025-26 reality: most LCT installs are retrofits onto existing electricity supplies. The verifier assesses: (1) does the new circuit comply with current BS 7671; (2) does the addition impair the existing installation safety. Common findings: older CU lacks RCD architecture for LCT; earthing arrangement needs reassessment; CU has no spare ways; AFDD requirement under A4:2026 not met on existing circuits."
          >
            <p>Reg 641.5 LCT retrofit considerations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">New circuit
                  compliance</strong> — PV / BESS / EV / heat pump circuit must meet
                BS 7671:2018+A4:2026 (RCD architecture, AFDD where applicable, Type B
                where source electronics, Section 712 / Chapter 57 / Section 722
                specifics)
              </li>
              <li>
                <strong className="text-white">Existing-install
                  assessment</strong> — CU age + condition + spare ways + RCD
                architecture + earthing arrangement (TN-C-S PME considerations for
                outdoor LCT, TT for outdoor PV / wind)
              </li>
              <li>
                <strong className="text-white">Pre-1980s
                  installations</strong> — frequently no main RCD, rubber-insulated
                cables degraded, no Type B; substantial remediation may be needed
                before LCT can be added safely
              </li>
              <li>
                <strong className="text-white">1980s-2000s
                  installations</strong> — CU often functional but lacks Type S
                architecture or has only Type AC; PV / BESS / EV add typically
                triggers a CU change ~£600-1500
              </li>
              <li>
                <strong className="text-white">Post-2008
                  installations</strong> — typically RCD-protected; LCT add usually
                fits with minor additions (extra MCB / RCBO ways)
              </li>
              <li>
                <strong className="text-white">Earthing
                  arrangement</strong> — TN-C-S PME + outdoor LCT (EV per Reg 722.411.4,
                outdoor PV inverter) requires OPDD or alternative architecture. §12.4
                covers PEN faults in detail
              </li>
              <li>
                <strong className="text-white">AFDD A4:2026</strong> —
                A4 update introduced AFDD requirements in certain final circuits;
                LCT additions may need AFDD per current rules
              </li>
              <li>
                <strong className="text-white">Documentation</strong>
                — Reg 641.5 verification recorded on the EIC alongside the new-circuit
                IV; cert evidence bundle includes the existing-install assessment +
                any remediation
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Reg 641.6 + Reg 644.5 the skilled person for LCT"
            plainEnglish="Reg 641.6: the verification shall be made by one or more skilled persons competent in such work. Reg 644.5: EICs shall be compiled and signed or otherwise authenticated by one or more skilled persons competent to verify that the requirements of BS 7671 have been met. For LCT this means layered competency: BS 7671 baseline + LCT-specific + manufacturer commissioning."
            onSite="The single-name-on-EIC pattern works for simple installs. For LCT, the EIC may carry the electrician\'s signature for the BS 7671 install side while the manufacturer commissioning record carries the technology specialist\'s signature for the inverter / BMS / heat pump. Cert evidence bundle integrates both."
          >
            <p>Skilled-person competency layers for LCT:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">BS 7671
                  baseline</strong> — C&G 2391 Initial Verification + Periodic
                Inspection; 18th Edition / A4:2026 qualification; electrical
                installation experience appropriate to the install scope
              </li>
              <li>
                <strong className="text-white">PV competency</strong>
                — MCS PV competency (MCS-affiliated installer); IET COP for Solar PV;
                manufacturer inverter commissioning training (typically certified
                installer status with the inverter manufacturer)
              </li>
              <li>
                <strong className="text-white">BESS competency</strong>
                — MCS Battery Storage (where applicable); manufacturer BMS
                commissioning training (Tesla Powerwall certified installer, GivEnergy
                pro, etc); Chapter 57 understanding
              </li>
              <li>
                <strong className="text-white">EV competency</strong>
                — IET COP for EV Charging Installations; manufacturer EV charger
                commissioning (Zappi, Ohme, Hypervolt, Easee, etc); Section 722 +
                Reg 722.411.4 understanding
              </li>
              <li>
                <strong className="text-white">Heat pump
                  competency</strong> — MCS Heat Pump certified (MIS 3005); manufacturer
                heat pump training; Part 4-7 + Reg 314 understanding
              </li>
              <li>
                <strong className="text-white">Other LCT
                  competency</strong> — MIS 3001 solar thermal, MIS 3003 wind, MIS 3004
                biomass, MIS 3007 micro-CHP, MIS 3008 micro-hydro; technology-specific
                manufacturer commissioning
              </li>
              <li>
                <strong className="text-white">Multi-trade
                  boundary</strong> — the electrician\'s EIC covers BS 7671 electrical
                install; the MCS company\'s handover pack integrates this with the
                technology-specific commissioning by the technology specialist
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — every skilled person\'s name + signature + competency
                evidence retained for audit + customer record + DNO submission where
                applicable
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 644.5 — Skilled person compiling + signing EICs"
            clause="Electrical Installation Certificates and Minor Electrical Installation Works Certificates shall be compiled and signed or otherwise authenticated by one or more skilled persons, competent to verify that the requirements of BS 7671 have been met."
            meaning="Reg 644.5 places the EIC + Minor Works Certificate in the hands of skilled persons competent to verify BS 7671. For LCT this means the electrician signing the EIC has BS 7671 competence appropriate to the install — and ideally LCT-specific competency. Where multiple competencies are needed (BS 7671 install + manufacturer commissioning + MCS sizing), the EIC may carry one or more signatures; the manufacturer commissioning record carries the specialist\'s signature; the MCS handover pack carries the MCS company\'s authorisation. Cert evidence bundle assembles these into a single deliverable. The competent-skilled-person requirement is also why LCT-specific training + manufacturer-certified-installer status matters for the contractor: a customer claim against an LCT install relies on the installer being demonstrably competent at the date of install."
          />

          <InlineCheck {...inlineChecks[1]} />

          <DiagramPlaceholder
            caption="Part 6 Initial Verification framework applied to LCT — flow diagram. Top: Reg 641.1 mandate (during erection + on completion before service). Middle row: Reg 642 inspection sequence (a-r items, disconnected from supply) → Reg 643 testing sequence (continuity → IR → polarity → ADS → RCD → PFC → functional → voltage drop). Side stream: BS EN 61557 instrument compliance (parts 2, 3, 4, 6, 8, 10). Multi-source extensions: per-source IV (Section 712 PV / Chapter 57 BESS / Section 722 EV / Part 4-7 heat pump) + cross-source Reg 551.4.2 RCD effectiveness + Reg 551.7.5 anti-islanding per source. Bottom: documentation flow — EIC (Reg 644.5 skilled-person signed) + Schedule of Inspections + Schedule of Test Results + cert evidence bundle integrating MCS handover packs."
            filename="renewable/m12s1-iv-framework-applied-to-lct.png"
          />

          <SectionRule />

          <Scenario
            title="6 kWp PV + 10 kWh BESS retrofit onto 1995 CU — Reg 641.5 applied"
            situation="3-bed semi, 1995 build. Existing CU is a 10-way split-load board with no main RCD + Type AC 30 mA RCBOs on the lighting + sockets circuits. TN-C-S PME supply. Customer wants 6 kWp PV (rooftop) + 10 kWh BESS (garage) + future EV charger. Contractor proposes Reg 641.5 assessment + CU upgrade."
            whatToDo="Reg 641.5 addition / alteration verification: (1) New PV circuit per Section 712 — Class II DC per Reg 712.412.101 + Reg 712.421.101 IMD (typically integrated in modern inverter); AC supply circuit + Type B 30 mA RCD on the PV AC side because the inverter is a DC-fault-leakage source (verify per manufacturer DoC). (2) New BESS circuit per Chapter 57 — DC bus per manufacturer; AC supply with Type B RCD + protective device coordinated with BMS communications. (3) Existing-install assessment: existing CU has no main RCD + Type AC RCBOs only; Type AC unsuitable for the LCT additions + the BESS inverter electronics may produce DC fault leakage that bypasses Type AC. Conclusion: CU upgrade required — replace with main switch + Type S 100 mA RCD upstream + Type B 30 mA RCBOs per circuit + new ways for PV + BESS + future EV. (4) Earthing arrangement: TN-C-S PME existing; outdoor PV inverter mounted in garage acceptable; future EV charger outdoor will need OPDD / Reg 722.411.4 architecture (covered §12.4). (5) Initial verification across the works: Reg 642 inspection items + Reg 643 testing sequence + Section 712 PV-specific (DC IR at 1000 V + IMD test) + Chapter 57 BESS (BMS commissioning + DC bus IR) + Reg 551.7.5 anti-islanding per source. (6) Documentation: EIC covering the CU replacement + PV + BESS works; Schedule of Inspections + Schedule of Test Results; cert evidence bundle integrates MCS PV (MIS 3002) handover + BESS commissioning. UK 2025-26 typical: ~£8-12k PV + BESS + £600-1200 CU upgrade + £400-800 EV future-readiness wiring."
            whyItMatters="Reg 641.5 retrofit is the dominant pattern for UK 2025-26 LCT installs — most installs are additions to existing supplies. The existing-install assessment is non-trivial: 1995-era CUs typically need upgrade to support the LCT additions safely. The verifier\'s judgement matters — minor non-conformance may be acceptable with notification, but DC-fault-leakage sources without correct RCD type + earthing without correct PME architecture are not. Cert evidence bundle records the existing-install assessment + remediation alongside the new-install IV."
          />

          <Scenario
            title="Multi-source IV: PV + BESS + heat pump + EV charger — sequencing the test day"
            situation="New-build with: 8 kWp PV array (already commissioned 2 weeks earlier as part of new-build cert evidence); 13 kWh BESS (just commissioned by manufacturer commissioning engineer); ASHP (commissioned by heat pump specialist); EV charger 7 kW (being installed by you). Combined IV scheduled today for the EV charger addition + Reg 551.4.2 multi-source RCD effectiveness verification."
            whatToDo="Test-day sequencing: (1) Reg 642 inspection — disconnected from supply where possible; verify EV charger DC connector, cable routing, gland; check existing PV / BESS / ASHP installation labelling + warning notices intact; confirm Type B RCDs on PV + BESS + EV; CU Schedule of Inspections updated. (2) Reg 643 testing on new EV circuit: continuity (R1+R2, R2); IR at 500 V AC; polarity; loop impedance at the EV charging point; RCD operation Type B 30 mA per Reg 415.1; PFC. (3) Reg 722.411.4 outdoor EV PME architecture verification: OPDD or alternative method per the manufacturer + Section 722. (4) Reg 551.4.2 multi-source RCD effectiveness: induce a fault (test current via the MFT or controlled simulation) under combinations — PV-only running, PV + BESS, PV + ASHP, PV + BESS + EV charging, etc. Verify the correct RCD trips for each combination + record results matrix. (5) Reg 551.7.5 anti-islanding: verify PV inverter, BESS inverter, EV charger (if it has export capability) disconnect on simulated grid loss. (6) Documentation: EIC for the EV addition; updated Schedule of Test Results integrating the multi-source RCD matrix; cert evidence bundle merges with existing PV + BESS + ASHP records. (7) Customer handover — operating guide for the now-integrated system + monitoring portal access + service contacts."
            whyItMatters="Multi-source IV on a fully-integrated LCT site is the high-end of the BS 7671 IV envelope. Reg 551.4.2 multi-source RCD effectiveness is rarely-discussed but critical: a fault that triggers the correct RCD with one combination of sources may NOT trigger it correctly with another combination. The IV process must verify across combinations. Cert evidence bundle records the matrix + provides the audit trail."
          />

          <CommonMistake
            title="Skipping Reg 642 inspection because the install looks tidy"
            whatHappens="Electrician arrives at finished LCT install — looks neat, equipment connected, DC cables in trunking. Skips the Reg 642 inspection items + goes straight to Reg 643 live testing. Closes DC isolator, energises inverter — destroys the inverter because the polarity is reversed on one of the DC strings. Tester damaged. Customer install delayed by weeks while replacement inverter sourced."
            doInstead="Reg 642.1: inspection precedes testing AND should be done disconnected from supply. The disconnected-state inspection catches polarity, conductor selection, connection torque, identification, isolators-correct-position, warning notices, fire barriers. Reg 642.3 (a)-(r) checklist + Schedule of Inspections. Only after inspection passes do you energise + Reg 643 test. For PV specifically: cover the array OR open string isolators before opening DC isolators at the inverter — a sun-exposed array is a live DC source even with isolators open."
          />

          <CommonMistake
            title="Treating LCT IV like a single-source AC IV"
            whatHappens="Verifier completes IV for a PV + BESS install using only the standard single-source AC IV framework — continuity, IR at 500 V, polarity, ADS, RCD, PFC. Misses Section 712.421.101 IMD verification, misses Reg 551.4.2 multi-source RCD across combinations, misses Reg 551.7.5 anti-islanding per source, misses the DC IR at appropriate test voltage. EIC signed off; install passes; 6 months later DNO investigates an anti-islanding fault that was never verified at IV."
            doInstead="Multi-source LCT IV is its own discipline. Per-source extensions: Section 712 for PV, Chapter 57 for BESS, Section 722 for EV, Part 4-7 + manufacturer commissioning for heat pump. Cross-source: Reg 551.4.2 RCD effectiveness matrix + Reg 551.7.5 anti-islanding per source. DC IV at the right test voltage. BS EN 61557 instrument compliance for IMD (Part 8) + Type B RCD (Part 6). Cert evidence bundle records every test + result + sign-off. §12.2-12.4 covers the source-specific extensions in detail."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Reg 641.1: every installation shall, during erection and on completion before being put into service, be inspected + tested. Verification spans the install lifecycle for LCT — not one-off.',
              'Reg 642 (inspection) precedes Reg 643 (testing). Inspection while disconnected from supply. Reg 642.3 lists 18+ inspection items.',
              'Reg 643 testing sequence: continuity → IR → polarity → ADS → RCD → PFC → functional → voltage drop. LCT adds DC IR, IMD, anti-islanding, multi-source RCD.',
              'Reg 651.3 mandates BS EN 61557 instrument compliance. Parts 2 (IR), 3 (loop), 4 (continuity), 6 (RCD), 8 (IMD for PV), 10 (multi-function) most relevant.',
              'Multi-source LCT extends single-source AC IV: per-source per-section framework + Reg 551.4.2 RCD effectiveness across combinations + Reg 551.7.5 anti-islanding per source + DC IV.',
              'Reg 641.5 addition / alteration: comply with BS 7671 AND not impair existing safety. LCT retrofit frequently triggers existing-CU upgrade for RCD + Type + earthing reasons.',
              'Reg 641.6 + Reg 644.5: skilled person competent to verify. For LCT: BS 7671 + LCT-specific + manufacturer commissioning competencies.',
              'EIC + Schedule of Inspections + Schedule of Test Results are BS 7671-side anchors. Cert evidence bundle integrates these with manufacturer commissioning + MCS handover.',
              'Reg 643.7.2: if any test fails, that test AND any preceding test influenced by the fault must be repeated after rectification. Protects against silent issues.',
              'Reg 641.4: precautions to avoid danger during inspection + testing. For LCT: cover PV array; open DC isolators; isolate BESS DC bus; treat DC side as live until proven dead.',
              'Documentation flow: EIC + Schedules → MCS handover pack → customer + DNO + installer cert evidence bundle. Multi-trade signatures where multi-trade scope.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 1 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/renewable-energy-module-12')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 12
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-12-section-2')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                12.2 IR + Initial Verification on DC circuits
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
