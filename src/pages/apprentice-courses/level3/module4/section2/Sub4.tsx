/**
 * Module 4 · Section 2 · Subsection 4 — MFT testing for fault diagnosis
 * Maps to C&G 2365-03 / Unit 303 / LO4 / AC 4.5
 *   AC 4.5 — "specify an appropriate and logical procedure for carrying out fault diagnosis tests"
 *
 * Layered depth: 2357 Unit 608 ELTK07 / AC 4.7 — undertake the procedures for
 * continuity, insulation resistance, polarity, earth fault loop impedance,
 * RCD operation, current and voltage measurement, phase sequence.
 *
 * Frame: the seven BS 7671 643 tests done with an MFT, framed as
 * fault-diagnosis investigations rather than commissioning. What each test
 * tells you, the test sequence, the typical readings on a faulted vs healthy
 * circuit, and the BS 7671 643 / GN3 references.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

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
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'MFT testing for fault diagnosis (2.4) | Level 3 Module 4.2.4 | Elec-Mate';
const DESCRIPTION =
  'The seven BS 7671 643 tests done with an MFT, framed as fault diagnosis — continuity, IR, polarity, EFLI, RCD, current/voltage, phase sequence. Test sequence, typical readings on faulted vs healthy circuits, GN3 references.';

const checks = [
  {
    id: 'mod4-s2-sub4-sequence',
    question:
      "BS 7671 643 sets out the test sequence for an EICR. For fault diagnosis the same sequence applies — what's the order and why?",
    options: [
      "Random.",
      "Six tests in order: (1) continuity of protective conductors (R1+R2 and earth), (2) continuity of ring final conductors, (3) insulation resistance (IR), (4) polarity, (5) earth fault loop impedance (EFLI), (6) operation of RCDs. Order matters because each test assumes the previous tests passed — IR can damage electronics if polarity is wrong; EFLI assumes IR is good (otherwise the test current goes through the fault); RCD assumes EFLI is healthy. Tests 1–4 are dead tests; tests 5–6 are live. The dead-then-live order keeps you safe and gives clean diagnostic data.",
      "Live first.",
      "RCD first.",
    ],
    correctIndex: 1,
    explanation:
      "The BS 7671 643 sequence is the gold standard. For fault diagnosis you might focus on a subset (e.g. just IR + EFLI on the affected circuit) but the underlying logic is the same — verify cleanliness, then verify continuity, then verify protection. The MFT (Megger MFT1741+, Kewtech KT64+, Fluke 1664FC) is designed around this sequence with a dedicated function knob position for each test.",
  },
  {
    id: 'mod4-s2-sub4-ir-voltage',
    question:
      "What test voltage do you use for insulation resistance and why does it matter for fault diagnosis on circuits with electronics?",
    options: [
      "Always 500 V.",
      "BS 7671 643.3 specifies 500 V DC for SELV/PELV at 250 V; 500 V DC for LV up to 500 V; 1000 V DC for LV &gt;500 V. BUT — modern installations have electronic devices (LED drivers, dimmers, AFDDs, RCBOs with electronic detection, surge protection devices, smart meters) that 500 V will damage. Standard L3 practice: disconnect or shunt-out electronic devices before IR test, OR test at 250 V (lower, less damaging) and apply manufacturer's compliance criterion. Megger MFT1741+ supports 250 V / 500 V / 1000 V. The risk of damage is high; the cost of a customer-replaced LED driver wall is real.",
      "Doesn't matter.",
      "Always 1000 V.",
    ],
    correctIndex: 1,
    explanation:
      "IR testing at 500 V on a circuit with embedded electronics is the most damage-prone test in the MFT's repertoire. BS 7671 643.3 lets you adapt the test voltage; GN3 (Guidance Note 3) gives the practical guidance on disconnection vs shunting. The L3 expectation is that you check for electronic loads BEFORE pressing the IR test button.",
  },
  {
    id: 'mod4-s2-sub4-eflivalues',
    question:
      "What are typical EFLI (earth fault loop impedance) values you'd expect on different circuit types in a healthy installation?",
    options: [
      "Same for everything.",
      "Domestic single-phase 230 V: Ze (origin) typically 0.35–0.65 Ω on TN-C-S, 0.5–1.0 Ω on TN-S, 1–10+ Ω on TT. Zs (final circuit) = Ze + R1+R2 + cable loop impedance. For a typical 32 A B6 RCBO ring final with 50 m of 2.5 mm² T+E: Zs typically 0.6–1.2 Ω. For a 6 A B6 lighting circuit with 30 m of 1.0 mm² T+E: Zs typically 1.0–1.8 Ω. BS 7671 Appendix 3 / Table 41.3 sets the maximum Zs for each protective device — typically 1.4 Ω for B16 RCBO at 230 V (for 0.4s disconnection). Readings above the table value indicate poor cable, poor termination, or supply-side problems.",
      "Always under 1 Ω.",
      "Always over 5 Ω.",
    ],
    correctIndex: 1,
    explanation:
      "EFLI readings are the headline diagnostic for circuit health. A reading wildly different from the calculated expected value (Ze + R1+R2 + cable loop) suggests either supply-side issue (high Ze) or circuit fault (loose termination, broken CPC, partial open). The BS 7671 Appendix 3 maximum values are pass/fail thresholds; the diagnostic is the trend.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What's an R1+R2 test and how is it different from a simple continuity test?",
    options: [
      "Same thing.",
      "R1+R2 is the resistance from the line conductor at the origin (R1) plus the resistance of the protective conductor back to the origin (R2) — measured by linking L and CPC at the far end of the circuit and reading from the DB end. Gives you the loop resistance for use in calculating Zs (Zs = Ze + R1+R2). Simple continuity is just R2 — CPC continuity from the DB to a single point. R1+R2 is the more useful measurement for fault diagnosis because it characterises the whole circuit; simple continuity confirms a single-point connection.",
      "Same as IR.",
      "Same as EFLI.",
    ],
    correctAnswer: 1,
    explanation:
      "R1+R2 is the standard L3 test method for circuit continuity in BS 7671 643.2. Linking L and CPC at the furthest point, measuring at the DB. The MFT (Megger MFT1741+) has a dedicated continuity function with null-leads compensation. Typical reading on a healthy domestic ring: R1+R2 = 0.3–0.7 Ω; R1+rn = 0.2–0.5 Ω (line + neutral, ring closed).",
  },
  {
    id: 2,
    question: "How do you test ring final continuity to verify the ring is actually a ring (not a broken-into-radial)?",
    options: [
      "Just continuity test.",
      "Three-step BS 7671 643.2.2 test. (1) Measure end-to-end resistance of L (r1), N (rn), CPC (r2) — disconnect at the DB. (2) Cross-connect L1 of one leg to N2 of the other leg, and N1 of one leg to L2 of the other leg, at the DB. (3) Measure resistance L–N at every socket on the ring — readings should all be within 0.05 Ω of each other (the geometric average of the ring) for a healthy ring. A socket showing wildly different reading is on a spur or the ring is broken at that point. The test physically confirms the ring topology, not just continuity.",
      "Just measure at one socket.",
      "Just visual.",
    ],
    correctAnswer: 1,
    explanation:
      "The cross-connection technique creates a parallel circuit that allows the engineer to measure at each socket and confirm the ring is closed. A broken ring shows up as one or more sockets with much higher resistance (because they're now on the dead-end side of a break). Standard L3 fault-diagnosis test for ring problems.",
  },
  {
    id: 3,
    question: "What's the IR test telling you and what readings indicate a problem?",
    options: [
      "Just continuity.",
      "IR (insulation resistance) measures the resistance between live conductors and earth, AND between live conductors themselves, with the circuit dead. BS 7671 643.3 limit: ≥ 1 MΩ for LV circuits up to 500 V (test at 500 V DC); ≥ 0.5 MΩ for SELV/PELV (test at 250 V DC). BUT — modern installations should typically read 100+ MΩ on healthy circuits; a reading of 1–5 MΩ even though it 'passes' the threshold suggests degradation worth investigating. A reading of 0.1–0.9 MΩ is below threshold and indicates real insulation breakdown — wet cable, damaged sheath, contaminated terminal.",
      "Always pass.",
      "Always fail.",
    ],
    correctAnswer: 1,
    explanation:
      "IR is the early-warning test for insulation degradation. The 1 MΩ minimum is a 30-year-old threshold; modern thermoplastic cables typically read 100+ MΩ. A circuit at 2 MΩ is technically 'passing' but is showing signs that warrant investigation. The MFT (Megger MFT1741+) reads up to 200+ GΩ — well into the healthy range.",
  },
  {
    id: 4,
    question: "What's a polarity test and what does it find?",
    options: [
      "Just continuity.",
      "Polarity test confirms that the line conductor is connected to the line terminal at every accessory and switching device, AND that switches break the line conductor (not the neutral). BS 7671 643.6 requires polarity verification at every accessory and at the origin. Failed polarity findings: switch breaks neutral instead of line (entire fitting remains live when off — common older-installation fault); reversed polarity at a socket (line and neutral swapped — appliances work but earth/neutral references are wrong); two-way switching wired wrong (intermittent operation). MFT has a polarity test mode; socket testers do polarity-only on 13A sockets.",
      "Just resistance.",
      "Same as IR.",
    ],
    correctAnswer: 1,
    explanation:
      "Polarity faults are surprisingly common on older installations — pre-1990s wiring sometimes broke neutral on lighting switches, leaving the lampholder energised at all times. Modern accessories with integral switching (some downlights, EV chargers) MUST switch line; reversed polarity defeats the protection. BS 7671 643.6 makes verification mandatory.",
  },
  {
    id: 5,
    question: "How do you do an EFLI test with the MFT and what's the safety procedure?",
    options: [
      "Just plug in.",
      "Setup: MFT in EFLI / Loop mode (typically position '4' on Megger MFT1741+). Test leads to L and CPC at the test point (typically a socket, an accessory, or the DB output). Safety: this is a LIVE test — circuit must be energised, RCD-protected (MFT injects a low-current test pulse that doesn't trip the RCD on most tests, but use the 'Hi' or 'no-trip' mode for verification on RCD-protected circuits). Press TEST. The MFT measures the current that flows during the brief test pulse and calculates Zs. Reading appears in 1–3 seconds. Compare to BS 7671 Appendix 3 / Table 41.3 maximum for the protective device.",
      "Without supply.",
      "With RCD off.",
    ],
    correctAnswer: 1,
    explanation:
      "EFLI is one of the live tests in BS 7671 643. The 'no-trip' mode (Megger calls it 'Hi-Z' or 'Loop No-Trip') uses a sequence of low-current pulses that statistically don't accumulate enough residual current to trip a 30 mA RCD; standard mode injects a brief higher-current pulse and may trip RCDs. Always select no-trip mode on RCD-protected circuits.",
  },
  {
    id: 6,
    question: "What does an RCD trip-time test measure and what are the BS 7671 maximum times?",
    options: [
      "Just trip.",
      "Trip-time test injects a calibrated residual current and measures how long the RCD takes to disconnect. BS 7671 643.7 / Table 643.7 maximums: at I∆n (rated trip current, e.g. 30 mA): ≤ 300 ms (general type, ≤ 40 ms for type S); at 1×IΔn: ≤ 40 ms (general type). Modern RCDs typically trip at I∆n in 10–30 ms — well under the limit. Slow tripping (&gt;50 ms at I∆n) indicates a failing RCD. The MFT (Megger MFT1741+) tests at multiple injection levels and at 0° / 180° phase angles — the slowest of the four readings is the recorded trip time.",
      "Just current.",
      "Just voltage.",
    ],
    correctAnswer: 1,
    explanation:
      "RCD trip-time is the diagnostic for the RCD's responsiveness. A passing time at I∆n confirms basic operation; the 1×IΔn test confirms operation at higher fault currents. Failing RCDs typically show slowing trip times before they fail completely — periodic testing catches them before they cause harm.",
  },
  {
    id: 7,
    question: "What's a phase sequence test and when is it needed?",
    options: [
      "Never needed.",
      "Phase sequence test confirms the order of phase rotation (L1, L2, L3 or A, B, C in correct sequence) on three-phase supplies. Wrong sequence reverses the rotation of three-phase induction motors and pumps — can cause damage to driven plant and wrong direction of conveyors / lifts. Tested with a phase rotation indicator (Fluke 9040, Megger PRMA1) — three probe leads, instrument indicates correct or reversed sequence. Required at three-phase commissioning and after any maintenance that may have disturbed phase identification (e.g. cable replacement, supply transformer changes).",
      "Same as polarity.",
      "Same as continuity.",
    ],
    correctAnswer: 1,
    explanation:
      "Phase sequence matters for any three-phase rotating plant. A reversed sequence runs the motor backwards — driven plant runs backwards (conveyor, fan, pump). Specific test instruments (Fluke 9040, Megger PRMA1) indicate sequence with a clear arrow direction. Modern MFTs (Megger MFT1741+) include phase sequence as a function on three-phase tests.",
  },
  {
    id: 8,
    question: "What test results indicate a high-resistance joint somewhere on the circuit?",
    options: [
      "IR fail.",
      "Three readings in combination. (1) R1+R2 higher than calculated expected (a 50 m run of 2.5 mm² ring should give R1+R2 of 0.5 Ω; if it reads 1.4 Ω something is adding resistance). (2) EFLI Zs higher than expected for the same reason. (3) Voltage drop on full load greater than calculated — an in-service measurement with a clamp meter showing &gt;5% volt drop confirms IR² heating at a high-resistance joint. The thermal camera (Sub 2.3) then locates the joint by its heat signature. Diagnostic combination: high R1+R2 + high Zs + thermal hotspot = HRJ at the hotspot location.",
      "RCD fail.",
      "Polarity fail.",
    ],
    correctAnswer: 1,
    explanation:
      "High-resistance joints don't show up on a single test — they show up as a pattern across multiple tests. The diagnostic combination of high continuity reading + high EFLI + thermal hotspot is the classic L3 HRJ identification. Sub 3.3 (likely fault locations) walks through the locations they typically appear.",
  },
];

const faqs = [
  {
    question: "What's the difference between Zs and Ze?",
    answer:
      "Ze is earth fault loop impedance at the ORIGIN of the installation — the impedance of the supply transformer winding + the supply cable + the supply earth + the consumer's main bonding back to the transformer. Measured at the cut-out / main switch by isolating the consumer side. Typical Ze: 0.35–0.65 Ω on TN-C-S, 0.5–1.0 Ω on TN-S, 1–200 Ω on TT. Zs is earth fault loop impedance at the END of a circuit — Ze + R1+R2 + cable loop impedance to the test point. Used to verify the protective device will operate within the BS 7671 643 disconnection time. Zs - Ze = (R1+R2) for the circuit.",
  },
  {
    question: "How do I know if my MFT readings are accurate?",
    answer:
      "Three checks. (1) Calibration sticker in date and certificate available (Sub 2.2). (2) Function check passes at the start of shift (Sub 2.2). (3) Field verification — for important readings, take a reading with a second instrument (e.g. socket tester for polarity, multimeter for voltage) and confirm agreement within tolerance. Where field readings disagree by more than the instruments' combined tolerance, both are suspect — repeat with a third instrument or escalate. Most L3 readings are accepted on the basis of (1) + (2); (3) is reserved for high-stakes decisions.",
  },
  {
    question: "Can I test IR with the loads still connected?",
    answer:
      "No — BS 7671 643.3 requires the test to be between live conductors and earth with no load impedance distorting the reading. Disconnect or remove all loads (lamps, appliances, electronic equipment). For circuits with embedded electronics (LED drivers, dimmers, AFDDs, RCBOs with electronic detection), test at 250 V instead of 500 V to avoid damage, OR remove / shunt the electronic device. The test result should be the insulation of the cabling alone.",
  },
  {
    question: "What's the Hi-Z (no-trip) mode on an MFT and when do I use it?",
    answer:
      "Hi-Z (or 'Loop No-Trip', 'Z LOOP') is a low-current pulsed test that statistically doesn't accumulate enough residual current to trip a 30 mA RCD. Used for EFLI testing on RCD-protected circuits where you don't want to trip the RCD during the test. Slightly slower (1.5–2 seconds vs ~0.5 second for standard mode) and slightly less accurate (the low test current means lower signal-to-noise ratio). Standard mode (Z PSC, 'No-Loop') uses higher current and is faster + more accurate but trips RCDs. Use Hi-Z on RCD-protected circuits; standard on non-RCD circuits.",
  },
  {
    question: "What's a 'PSCC' test and how is it different from EFLI?",
    answer:
      "PSCC (Prospective Short-Circuit Current) is the maximum fault current that would flow on a phase-to-neutral or phase-to-phase fault. Calculated from the L–N or L–L impedance using Ohm's law (PSCC = U / Z_LN). EFLI is the impedance for a phase-to-EARTH fault. PSCC matters for sizing protective devices (the breaking capacity of the breaker must exceed the PSCC at its location). EFLI matters for fault clearance time. The MFT (Megger MFT1741+) measures both; PSCC is typically read at the same time as Ze at the origin.",
  },
  {
    question: "How do I record my MFT readings for a fault investigation?",
    answer:
      "Most modern MFTs (Megger MFT1741+, Fluke 1664FC) have onboard memory and Bluetooth/USB transfer. Readings are tagged with circuit ID, date, time, instrument serial. Transfer to certification software (NICEIC Cert Plus, Megger PowerDB, Easycert) at the depot for the final report. For fault investigations specifically, record: (1) initial readings on the affected circuit (the symptoms), (2) readings during diagnosis (narrowing down the fault), (3) readings after rectification (proof of correction). All three sets become the diagnostic narrative on the job sheet and any associated certificate.",
  },
];

export default function Sub4() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section2')} className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start">
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero
            eyebrow="Module 4 · Section 2 · Subsection 4"
            title="MFT testing for fault diagnosis"
            description="The seven BS 7671 643 tests done with an MFT, framed as fault-diagnosis investigations rather than commissioning — continuity, IR, polarity, EFLI, RCD, current/voltage, phase sequence. What each tells you, the test sequence, typical readings on faulted vs healthy circuits."
            tone="emerald"
          />

          <TLDR
            points={[
              "BS 7671 643 tests in order: continuity (R1+R2 + ring), IR, polarity, EFLI, RCD, phase sequence. Order matters — each test assumes previous tests passed.",
              "Test voltages: IR at 500 V DC for LV (250 V if electronics on circuit). EFLI uses Hi-Z mode on RCD-protected circuits to avoid tripping. RCD trip-time at I∆n and 1×IΔn.",
              "High-resistance joint diagnostic = high R1+R2 + high Zs + thermal hotspot. No single test catches HRJ; the pattern across multiple tests does.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Specify the BS 7671 643 test sequence — continuity, IR, polarity, EFLI, RCD, phase sequence — and explain why order matters.",
              "Use an MFT (Megger MFT1741+, Kewtech KT64+, Fluke 1664FC) for each of the seven tests with appropriate test voltages and modes.",
              "Distinguish R1+R2 (whole circuit loop) from simple continuity (single-point) and use each in fault diagnosis.",
              "Apply the BS 7671 643.2.2 ring final continuity three-step test to verify ring topology.",
              "Distinguish Hi-Z (no-trip) and standard EFLI test modes and use the right one for RCD-protected vs non-RCD circuits.",
              "Recognise high-resistance joint signatures across multiple tests: high R1+R2 + high Zs + thermal hotspot.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The BS 7671 643 test sequence</ContentEyebrow>

          <ConceptBlock
            title="Six tests, in order, every time"
            plainEnglish="BS 7671 643 sets out the standard sequence for inspection and testing. For fault diagnosis the same sequence applies — verify cleanliness (continuity, IR), then verify protection (polarity, EFLI, RCD)."
            onSite="Modern MFTs (Megger MFT1741+, Kewtech KT64+, Fluke 1664FC) have a function knob that walks you through the sequence — each position is one test. The tests are designed to be done in order; each assumes the previous tests passed."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1. Continuity of protective conductors</strong> (Reg 643.2.1) — R1+R2 method or simple continuity to a single point. Confirms CPC integrity.</li>
              <li><strong>2. Continuity of ring final conductors</strong> (Reg 643.2.1) — three-step cross-connection test confirms ring topology.</li>
              <li><strong>3. Insulation resistance</strong> (Reg 643.3) — between live conductors and earth, between live conductors. 500 V DC for LV (250 V for circuits with electronics).</li>
              <li><strong>4. Polarity</strong> (Section 643) — confirms line connected to line terminal at every accessory; switches break line not neutral.</li>
              <li><strong>5. Earth fault loop impedance</strong> (Reg 643.7.3) — Ze at origin, Zs at every protective device. Verify against Table 41.3 maximums.</li>
              <li><strong>6. Operation of RCDs</strong> (Reg 643.7.1, 643.8) — trip-time at I∆n and 1×IΔn. Verify against Table 643.7 maximums.</li>
            </ul>
            <p>Tests 1–4 are dead tests; tests 5–6 are live. The dead-then-live order keeps you safe and gives clean diagnostic data.</p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 134.2.1 (Inspection and testing)"
            clause={<>"During erection and on completion of an installation or an addition or alteration to an installation, and before it is put into service, appropriate inspection and testing shall be carried out by one or more skilled persons competent to verify that the requirements of BS 7671 have been met. Appropriate certification shall be issued in accordance with Chapter 64."</>}
            meaning={<>Reg 134.2.1 is the parent duty that the Chapter 64 test sequence implements. For fault diagnosis, the same tests are used to verify the installation has not departed from compliance — the post-fault retest is itself a 134.2.1 verification, and certification under Chapter 64 follows.</>}
            cite="Source: BS 7671:2018+A4:2026 Part 1, Chapter 13, Regulation 134.2.1."
          />

          <InlineCheck {...checks[0]} />

          <SectionRule />

          <ContentEyebrow>Continuity tests — R1+R2 and ring final</ContentEyebrow>

          <ConceptBlock
            title="The MFT's continuity function — what it actually measures"
            plainEnglish="Continuity at the MFT level is a low-resistance measurement (typically 0.01–999.9 Ω range) at a calibrated test current of 200 mA. The 200 mA confirms the connection has 'durable mechanical strength' under load — a high-resistance joint that would heat up under load shows up as a high reading at 200 mA."
          >
            <p>Two continuity test methods:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>R1+R2</strong> (whole circuit loop) — link L and CPC at the far end of the circuit; measure from the DB end. Gives the loop resistance for use in calculating Zs. Standard L3 method for fault diagnosis.</li>
              <li><strong>Simple continuity (R2)</strong> — measure from the CPC at the DB to a single point (an accessory's earth terminal). Confirms the CPC reaches the accessory but doesn\'t characterise the whole circuit.</li>
            </ul>
            <p>
              Ring final continuity (BS 7671 Reg 643.2.1) uses the three-step cross-connection method:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Measure end-to-end of L (r1), N (rn), CPC (r2) — disconnect at DB.</li>
              <li>Cross-connect L1↔N2 and N1↔L2 at DB.</li>
              <li>Measure L–N at every socket on the ring — readings should be within 0.05 Ω of each other for a healthy ring.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Insulation resistance — the most damage-prone test</ContentEyebrow>

          <ConceptBlock
            title="500 V DC test current — and what it can damage"
            onSite="IR testing at 500 V on a circuit with embedded electronics is the most damage-prone test in the MFT\'s repertoire. LED drivers, dimmer modules, RCBOs with electronic detection, smart meters, surge protection devices — all can be damaged silently."
          >
            <p>Standard L3 IR procedure:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Confirm circuit is fully isolated AND proved dead with separate two-pole tester.</li>
              <li>Disconnect or shunt-out electronic loads — LEDs, dimmers, AFDDs, smart switches.</li>
              <li>Set MFT to 500 V DC (or 250 V if you can\'t fully disconnect electronics).</li>
              <li>Connect probes between L and CPC; press TEST. Reading should be ≥ 1 MΩ (BS 7671 minimum), typically 100+ MΩ on a healthy circuit.</li>
              <li>Repeat between N and CPC, then between L and N (live conductors).</li>
              <li>Reconnect the loads; verify operation.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[1]} />

          <SectionRule />

          <ContentEyebrow>EFLI — earth fault loop impedance</ContentEyebrow>

          <ConceptBlock
            title="The headline diagnostic for circuit health"
            plainEnglish="EFLI tells you how quickly a fault current would clear through the protective device. High EFLI = slow clearance = potentially dangerous. Low EFLI = fast clearance = safe. The BS 7671 Appendix 3 / Table 41.3 maximums are pass/fail thresholds; the diagnostic is the trend."
          >
            <p>Typical EFLI values on healthy circuits:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Domestic Ze (origin): 0.35–0.65 Ω on TN-C-S, 0.5–1.0 Ω on TN-S, 1–200 Ω on TT.</li>
              <li>Ring final 32 A B32 RCBO, 50 m of 2.5 mm² T+E: Zs typically 0.6–1.2 Ω.</li>
              <li>Lighting 6 A B6, 30 m of 1.0 mm² T+E: Zs typically 1.0–1.8 Ω.</li>
              <li>Cooker 32 A B32, 5 m of 6 mm² T+E: Zs typically 0.4–0.8 Ω.</li>
              <li>Shower 40 A B40, 8 m of 10 mm² T+E: Zs typically 0.4–0.7 Ω.</li>
            </ul>
            <p>Use Hi-Z (no-trip) mode on RCD-protected circuits; standard mode on non-RCD circuits.</p>
          </ConceptBlock>

          <InlineCheck {...checks[2]} />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 411.5.3"
            clause={
              <>
                "Where an RCD is used for fault protection, the following conditions shall be fulfilled: (a) the disconnection time shall be that required by Regulation 411.3.2.2 or 411.3.2.4; and (b) Ra &times; I&Delta;n &le; 50&nbsp;V where Ra is the sum of the resistances of the earth electrode and the protective conductor connecting it to the exposed-conductive-parts (in ohms), I&Delta;n is the rated residual operating current of the RCD."
              </>
            }
            meaning={
              <>
                The Ra &times; I&Delta;n &le; 50&nbsp;V test is your TT-system back-stop. On a TT job where the EFLI looks borderline, calculate it: a 30&nbsp;mA RCD with Ra of 200&nbsp;&Omega; gives Ra &times; I&Delta;n = 6&nbsp;V &mdash; well inside the limit. The same RCD with a 1700&nbsp;&Omega; electrode gives 51&nbsp;V &mdash; fail, regardless of what the loop tester says.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Reg 411.5.3 (RCD-based fault protection)."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 643.3"
            clause={
              <>
                "The requirements for RCD testing have been changed and Table 3A (Time/current performance criteria for RCDs) in Appendix 3 has been deleted. Regardless of RCD Type, an alternating current test at rated residual operating current (IΔn) is used to verify the effectiveness."
              </>
            }
            meaning={
              <>
                A4:2026 simplified the RCD test to a single AC trip at rated I&Delta;n. The 5&times;I&Delta;n test is gone, Table 3A is gone, and the test pass criterion is whichever device-standard limit applies (BS EN 61008 / 61009 / 62423 / 7288). Update your firm&apos;s test pro forma if it still has a 5&times; column.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Reg 643.3 (RCD testing redraft)."
          />

          <SectionRule />

          <ContentEyebrow>RCD trip-time and phase sequence</ContentEyebrow>

          <ConceptBlock
            title="Verifying the protective device is actually protecting"
            onSite="An RCD that\'s slow to trip is more dangerous than no RCD at all — the customer believes they\'re protected. Trip-time testing is the L3 fault-diagnosis equivalent of putting your hand in front of a fan to check it\'s spinning the right speed."
          >
            <p>BS 7671 Reg 643.7.1 / Table 643.7 maximum trip times:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>At I∆n (rated trip current, 30 mA): ≤ 300 ms (general type), ≤ 40 ms for type S.</li>
              <li>At 1×IΔn (150 mA on a 30 mA RCD): ≤ 40 ms (general type).</li>
              <li>Modern RCDs typically trip at I∆n in 10–30 ms — well under the limit.</li>
            </ul>
            <p>
              Phase sequence test (3-phase only) confirms L1 / L2 / L3 rotation order. Wrong sequence reverses three-phase induction motor rotation. Tested with phase rotation indicator (Fluke 9040, Megger PRMA1).
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Running an IR test at 500 V on a circuit with electronic loads still connected"
            whatHappens={<>Apprentice has isolated a kitchen circuit, set the MFT to 500 V IR, presses TEST. Reading is fine (200 MΩ). Half an hour later the LED dimmer in the kitchen has started failing intermittently — the 500 V test pulse damaged its input filter capacitors. Customer reports flickering lights two days later. Apprentice didn\'t realise the test had caused the damage; firm replaces the dimmer at their cost.</>}
            doInstead={<>Before pressing IR test, check for electronic loads on the circuit — LED drivers, dimmer modules, smart switches, AFDDs. Disconnect or shunt them, OR test at 250 V instead of 500 V. Megger and Fluke MFTs both support 250 V; the lower voltage is BS 7671-acceptable for circuits with electronics per GN3 guidance.</>}
          />

          <CommonMistake
            title="Running EFLI in standard mode on an RCD-protected circuit"
            whatHappens={<>Apprentice tests EFLI with the MFT in default mode (high test current). The test pulse trips the 30 mA RCD that protects the circuit. Apprentice resets the RCD, retests, trips again, eventually realises they need Hi-Z mode. Meanwhile the customer\'s freezer (also on the affected RCD) has been off for 20 minutes. Customer complaint, refund of inconvenience.</>}
            doInstead={<>For any RCD-protected circuit, use the Hi-Z (no-trip) EFLI mode. Megger calls it \'Loop No-Trip' or 'Hi-Z'; Fluke calls it 'Z LOOP No-Trip'; Kewtech calls it similar. Slightly slower, slightly less accurate, but doesn't trip RCDs. Standard mode is for non-RCD circuits only.</>}
          />

          <Scenario
            title="Diagnosing a high-resistance joint on a 32 A radial"
            situation={<>Customer reports the RCBO on the upstairs ring final keeps tripping under load (kettle, microwave on simultaneously). The thermal magnetic mechanism trips, not the RCD. You isolate, prove dead, and start MFT testing.</>}
            whatToDo={<>(1) Continuity R1+R2 — reads 1.4 Ω. Calculated expected for 35 m of 2.5 mm² T+E ring = 0.5 Ω. R1+R2 is THREE TIMES expected — strong indicator of a high-resistance joint somewhere on the circuit. (2) Ring continuity three-step — readings vary across sockets by 0.3 Ω (should be within 0.05 Ω) — confirms the high resistance is concentrated at one branch of the ring. (3) IR — passes at 200 MΩ — insulation is fine. (4) EFLI Zs — reads 1.7 Ω against expected 0.7 Ω — confirms the additional resistance shows up in the loop. (5) Restore supply, set up clamp meter, energise the circuit and turn on the kettle. Measure voltage drop at suspect sockets — one socket shows 8 V drop under 13 A load (3.5%, well above 1% expected). (6) Thermal camera scan — the suspect socket reads 60 °C at the L terminal vs 25 °C ambient. (7) Isolate, open the suspect socket — terminal screw is loose, conductor is partially blackened. Re-strip, re-terminate, retest. R1+R2 now reads 0.55 Ω — fault corrected.</>}
            whyItMatters={<>HRJ diagnosis is the canonical L3 multi-test investigation. No single test finds the joint; the pattern across continuity + EFLI + voltage drop + thermal does. The MFT gives you the values; the multimeter and clamp meter give you the in-service measurements; the thermal camera gives you the location. All four instruments contributing to one fault diagnosis is the L3 step-up from L2\'s single-instrument approach.</>}
          />

          <SectionRule />

          <ContentEyebrow>RCD trip-time and ramp testing in fault diagnosis</ContentEyebrow>

          <ConceptBlock
            title="The MFT's RCD test functions — what each tells you"
            plainEnglish="The MFT's RCD test injects a defined fault current and measures the trip time. BS EN 61008 / 61009 specifies the limits: a Type AC 30 mA RCD must trip within 300 ms at 1×IΔn (30 mA) and within 40 ms at 1×IΔn (150 mA). The MFT runs the tests automatically and reports the actual trip time."
            onSite="The Megger MFT1741+, Kewtech KT64+ and Fluke 1664FC all have AutoRCD modes that walk through 1× / 5× / ramp tests and produce a pass/fail report. For fault diagnosis the trip-time tells you whether the RCD is operating within spec OR whether it's slow (suggesting wear, contamination, or wrong-type RCD for the load — e.g. Type AC on a circuit with DC components)."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>×½ test</strong> — 15 mA injection on a 30 mA RCD. Should NOT trip. If it does, the RCD is over-sensitive (typically ageing).</li>
              <li><strong>×1 test</strong> — 30 mA injection. Trip within 300 ms (Type AC) or 200 ms (Type A on DC pulse).</li>
              <li><strong>×5 test</strong> — 150 mA injection. Trip within 40 ms.</li>
              <li><strong>Ramp test</strong> — gradually increases current from 0 mA upward, captures the actual trip current. A 30 mA RCD should trip between 15 mA and 30 mA. Below 15 mA = nuisance-trip risk; above 30 mA = won't protect at the rated current.</li>
              <li><strong>Type AC vs Type A vs Type B</strong> — Type AC sees only sinusoidal AC residual current (legacy); Type A also sees pulsating DC residual (modern domestic standard); Type B also sees smooth DC (required for EV chargers, VSDs, certain solar PV). Mismatch causes nuisance trips OR worse, no protection.</li>
              <li><strong>Phase angle</strong> — modern MFTs let you choose 0° or 180° phase angle for the test. Faulty RCDs sometimes pass on one angle and fail on the other.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Phase sequence and three-phase tests</ContentEyebrow>

          <ConceptBlock
            title="Three-phase rotation, phase loss, and the MFT's phase-sequence function"
            plainEnglish="On three-phase circuits the rotation (L1-L2-L3 vs L1-L3-L2) determines the direction of motor rotation. Wrong rotation = pumps run backwards, lifts go down instead of up, conveyors go the wrong way. The MFT (or a dedicated phase-sequence indicator) confirms rotation in seconds."
            onSite="Standard tools: Megger PSI4 (phase sequence indicator, ~£100), Megger MFT1741+ (built-in phase sequence on the rotary switch), Kewtech KT200 (combined phase-sequence + voltage tester). The phase-sequence test is non-invasive — connect three probes to L1, L2, L3 and the indicator shows direction of rotation."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Correct rotation</strong> — UK standard is L1-L2-L3 clockwise (some sources call this "ABC"). Rotation indicator shows clockwise arrow / "1-2-3" / green LED.</li>
              <li><strong>Wrong rotation</strong> — anticlockwise / "1-3-2" / red LED. Swap any two phases at the supply to reverse.</li>
              <li><strong>Phase loss</strong> — one of L1/L2/L3 missing. Three-phase motor will hum but not rotate; some indicators flash to show. Voltage check L-L confirms (e.g. L1-L2 = 0 V or 230 V instead of 400 V).</li>
              <li><strong>Phase imbalance</strong> — voltages between phases differ significantly (&gt;5%). Causes motor overheating and reduced torque. Power-quality analyser logs over time.</li>
              <li><strong>Open neutral on 3-phase</strong> — supplies become unbalanced; load with low resistance gets full L-L voltage. Catastrophic for connected single-phase equipment. Check N voltage to true earth at sub-DB.</li>
              <li><strong>Earth fault on 3-phase</strong> — Type B RCD or earth-leakage relay fires. Use clamp meter on N + 3 phases together to confirm leakage current.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Special tests — earth electrode, prospective fault current</ContentEyebrow>

          <ConceptBlock
            title="The dedicated tests when MFT loop test isn't enough"
            plainEnglish="For TT installations and for installations where prospective fault current matters, dedicated tests beyond the MFT's standard loop function are needed."
            onSite="Earth electrode resistance: Megger DET3TC (3-pole), DET14C (stakeless clamp method) — typical TT electrode 50-200 Ω, anything &gt;200 Ω needs investigation. Prospective fault current (PSCC, Ipf): Megger MFT1845 has a high-current loop test that gives Ipf directly; standard MFTs calculate Ipf from Ze (Ipf = U0 / Ze)."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Earth electrode test (3-pole)</strong> — main electrode + auxiliary current stake (10-20 m away) + auxiliary potential stake (5-10 m). MFT injects current, measures voltage gradient. Electrode resistance read directly.</li>
              <li><strong>Earth electrode test (stakeless)</strong> — Megger DET14C clamps around the electrode lead. Measures using induced current method. Needs an earth network present (won't work on isolated electrodes).</li>
              <li><strong>Prospective Short Circuit Current (PSCC)</strong> — measured at origin between phases (or L-N for single-phase). UK domestic typically 6 kA at cut-out; commercial 16-25 kA at TX-side. Used to confirm protective device breaking capacity (BS EN 60898 MCBs typically 6 kA, BS EN 60947-2 MCCBs 25-50 kA).</li>
              <li><strong>Prospective Earth Fault Current (PEFC)</strong> — measured L-E at origin. Often the limiting figure for breaker selection. Always less than PSCC.</li>
              <li><strong>Insulation resistance at higher voltage</strong> — for SWA cables and larger motors, IR test at 1 kV (Megger MIT400-2) or 2.5 kV (MIT525). Compare to BS 7671 643.3.3 minimum (1 MΩ at 500 V test for general circuits).</li>
              <li><strong>Polarisation index</strong> — for motors and transformers. IR ratio at 10 minutes vs 1 minute. PI &gt; 2.0 = good insulation; PI &lt; 1.0 = wet or damaged windings.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "BS 7671 643 test sequence: continuity, ring continuity, IR, polarity, EFLI, RCD, phase sequence. Each test assumes the previous passed. Dead tests then live tests.",
              "R1+R2 measures whole-circuit loop resistance; simple continuity measures CPC to a single point. R1+R2 is the standard L3 fault-diagnosis method.",
              "Ring final continuity uses three-step cross-connection (BS 7671 643.2.2) to verify ring topology — readings within 0.05 Ω at every socket.",
              "IR test at 500 V damages electronics. Disconnect / shunt electronic loads OR test at 250 V per GN3 guidance.",
              "EFLI Hi-Z (no-trip) mode for RCD-protected circuits; standard mode for non-RCD. Always check supply arrangement before pressing TEST.",
              "RCD trip-time max 300 ms at I∆n (40 ms for type S), 40 ms at 1×IΔn. Modern RCDs typically trip in 10–30 ms.",
              "Phase sequence (3-phase) confirms rotation order. Wrong sequence reverses motor direction. Tested with Fluke 9040 / Megger PRMA1.",
              "High-resistance joint diagnostic = high R1+R2 + high Zs + voltage drop on load + thermal hotspot. No single test catches HRJ.",
            ]}
          />

          <Quiz title="MFT testing for fault diagnosis — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section2-3')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Previous</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">2.3 Multimeter / clamp / IR</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section3')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Next section <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">§3 Common faults</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
