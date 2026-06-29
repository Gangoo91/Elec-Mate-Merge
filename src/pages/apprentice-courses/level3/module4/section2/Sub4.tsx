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
  VideoCard,
} from '@/components/study-centre/learning';
import { videos } from '@/data/study-centre/video-library';
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
      "Continuity (protective conductors then ring final), insulation resistance, polarity, EFLI, then RCD operation — dead tests first, live tests last.",
      "Live tests first (EFLI and RCD) while the circuit is still energised, then the dead tests (continuity and IR) once it is isolated, to save an isolation step.",
      "RCD operation first, then insulation resistance, then continuity, then EFLI, so the most safety-critical device is always tested before anything else on the board.",
      "Order is irrelevant — each test is independent, so the EICR runs in whatever sequence suits the layout of the board.",
    ],
    correctIndex: 0,
    explanation:
      "Each test assumes the previous one passed, so the sequence runs continuity, IR, polarity, EFLI then RCD — verify cleanliness, then continuity, then protection. Tests 1–4 are dead and 5–6 are live, so dead-then-live keeps you safe and gives clean diagnostic data. For fault diagnosis you might focus on a subset (e.g. just IR + EFLI on the affected circuit) but the logic is identical. The MFT (Megger MFT1741+, Kewtech KT64+, Fluke 1664FC) has a dedicated function knob position for each test.",
  },
  {
    id: 'mod4-s2-sub4-ir-voltage',
    question:
      "What test voltage do you use for insulation resistance and why does it matter for fault diagnosis on circuits with electronics?",
    options: [
      "Always test at 1000 V DC regardless of circuit type, because a higher test voltage gives a clearer pass/fail and electronics are immune to DC stress.",
      "500 V DC for LV up to 500 V — but on circuits carrying electronics, disconnect or shunt them first, or drop to 250 V.",
      "Use an AC test voltage of 230 V matching the supply, because testing at the working voltage avoids damaging any connected electronics.",
      "The test voltage is fixed automatically by the MFT and cannot be changed, so there is no decision to make about electronics on the circuit.",
    ],
    correctIndex: 1,
    explanation:
      "BS 7671 643.3 gives 500 V DC for LV up to 500 V (250 V for SELV/PELV, 1000 V for >500 V). Modern circuits carry electronics (LED drivers, dimmers, AFDDs, SPDs, smart meters) that a 500 V pulse can damage silently — IR is the most damage-prone test in the MFT's repertoire. GN3 gives the practical guidance on disconnection vs shunting. The L3 expectation is that you check for electronic loads BEFORE pressing the IR test button. The MFT supports all three voltage ranges.",
  },
  {
    id: 'mod4-s2-sub4-eflivalues',
    question:
      "What are typical EFLI (earth fault loop impedance) values you'd expect on different circuit types in a healthy installation?",
    options: [
      "Every healthy final circuit reads a Zs of exactly 0 Ω, so any reading above zero indicates a fault on the circuit being tested.",
      "A healthy domestic circuit reads a Zs of around 50–200 Ω, with lighting circuits at the higher end because they are run in thinner cable.",
      "Zs is identical on every circuit in a property because it depends only on the supply origin Ze, not on the length of the cable run to the test point.",
      "Around 0.6–1.2 Ω on a 32 A ring final and 1.0–1.8 Ω on a 6 A lighting circuit, each well within the Table 41.3 maximum for its device.",
    ],
    correctIndex: 3,
    explanation:
      "Zs = Ze + R1+R2. Ze at the origin is typically 0.35–0.65 Ω on TN-C-S, 0.5–1.0 Ω on TN-S, 1–10+ Ω on TT. A 32 A ring final reads ~0.6–1.2 Ω, a 6 A lighting circuit ~1.0–1.8 Ω; Table 41.3 sets the maximum per device. A reading wildly different from the calculated expected value suggests a supply-side issue (high Ze) or a circuit fault (loose termination, broken CPC, partial open). The Appendix 3 maximum values are pass/fail thresholds; the diagnostic is the trend.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What's an R1+R2 test and how is it different from a simple continuity test?",
    options: [
      "R1+R2 is the resistance of the line conductor alone, measured between its two ends; it has nothing to do with the protective conductor and is not used in Zs calculations.",
      "Line resistance plus CPC resistance, measured by linking L and CPC at the far end — it gives the whole-circuit loop, whereas simple continuity is just R2 to a single point.",
      "R1+R2 is a live test injecting current at 230 V, whereas simple continuity is a dead test — that injection voltage is the only difference between the two methods.",
      "R1+R2 and simple continuity are the same measurement under two names, both reading CPC resistance from the board to one accessory's earth terminal.",
    ],
    correctAnswer: 1,
    explanation:
      "R1+R2 links L and CPC at the furthest point and reads at the DB, giving the loop resistance for Zs (Zs = Ze + R1+R2) and characterising the whole circuit; simple continuity reads R2 only to a single point. It is the standard L3 continuity method in BS 7671 643.2. The MFT (Megger MFT1741+) has a dedicated continuity function with null-leads compensation. Typical healthy domestic ring: R1+R2 = 0.3–0.7 Ω; R1+rn = 0.2–0.5 Ω (line + neutral, ring closed).",
  },
  {
    id: 2,
    question: "How do you test ring final continuity to verify the ring is actually a ring (not a broken-into-radial)?",
    options: [
      "Measure CPC continuity from the board to one socket only; if it reads under 1 Ω the ring is confirmed as a complete ring.",
      "Insulation-resistance test the ring at 500 V; a reading above 1 MΩ proves the ring is continuous and not broken into a radial.",
      "The three-step 643.2.2 cross-connection test, with L–N at every socket reading within 0.05 Ω — confirming topology, not just continuity.",
      "Energise the ring and clamp the load current at each socket; equal currents at every socket prove the ring is intact and unbroken.",
    ],
    correctAnswer: 2,
    explanation:
      "The three-step 643.2.2 test: measure end-to-end r1, rn and r2 with the legs disconnected; cross-connect L1↔N2 and N1↔L2 at the DB; then measure L–N at every socket. Readings within 0.05 Ω confirm a healthy ring; an outlier is on a spur or marks a break. The cross-connection creates a parallel circuit so a broken ring shows up as one or more sockets with much higher resistance (now on the dead-end side of a break). It is the standard L3 fault-diagnosis test for ring problems.",
  },
  {
    id: 3,
    question: "What's the IR test telling you and what readings indicate a problem?",
    options: [
      "IR measures the loop impedance from line to earth at the test point, confirming the protective device disconnects within the required time.",
      "IR measures the resistance of the protective conductor from the board to each accessory, confirming the CPC is continuous along the circuit.",
      "IR measures the current that flows when a deliberate earth fault is applied, confirming the RCD trips within 300 ms of the fault.",
      "IR measures resistance between live conductors and earth, and between live conductors, with the circuit dead — a real breakdown reads well below the limit.",
    ],
    correctAnswer: 3,
    explanation:
      "The 643.3 limit is ≥ 1 MΩ for LV (test at 500 V DC), but healthy modern thermoplastic cables read 100+ MΩ. A 1–5 MΩ result 'passes' yet warrants investigation; 0.1–0.9 MΩ is real breakdown (wet cable, damaged sheath, contaminated terminal). The 1 MΩ minimum is a 30-year-old threshold and IR is the early-warning test for insulation degradation. The MFT (Megger MFT1741+) reads up to 200+ GΩ — well into the healthy range.",
  },
  {
    id: 4,
    question: "What's a polarity test and what does it find?",
    options: [
      "It confirms line is on the line terminal at every accessory and that switches break line not neutral, finding reversed polarity and switches left in the neutral.",
      "Polarity test confirms the magnetic field rotation direction on a three-phase supply, finding motors and pumps that would otherwise run backwards.",
      "Polarity test measures the resistance between line and neutral, finding shorted conductors on the circuit before it is first energised.",
      "Polarity test checks that the insulation between conductors stays above 1 MΩ, finding damaged sheaths, wet cable and contaminated terminals.",
    ],
    correctAnswer: 0,
    explanation:
      "Polarity verification finds switches breaking neutral (the fitting stays live when off), reversed polarity at sockets, and miswired two-way switching. The MFT has a polarity mode; socket testers do polarity-only checks on 13 A sockets. Faults are common on older installations — pre-1990s wiring sometimes broke neutral on lighting switches, leaving the lampholder permanently energised. Modern accessories with integral switching (some downlights, EV chargers) MUST switch line; reversed polarity defeats the protection. BS 7671 643.6 makes verification mandatory.",
  },
  {
    id: 5,
    question: "How do you do an EFLI test with the MFT and what's the safety procedure?",
    options: [
      "Set the MFT to insulation-resistance mode at 500 V, isolate and prove dead, then connect L and CPC and press TEST — the loop impedance reads the same as the IR value because both use the line-to-earth path.",
      "Set the MFT to Loop/EFLI mode, leads to L and CPC; it is a LIVE test, so select no-trip mode on RCD-protected circuits before pressing TEST.",
      "Isolate and prove dead first, since EFLI is a dead test; link L and N at the far end, measure from the board, and read Zs directly.",
      "Clamp the MFT's current jaw around the earth conductor at the consumer unit with the circuit live; the leakage current it reads converts internally into a Zs value.",
    ],
    correctAnswer: 1,
    explanation:
      "EFLI is a live test — the circuit is energised. With leads on L and CPC the MFT measures the test-pulse current and calculates Zs in 1–3 seconds; compare to the Table 41.3 maximum for the device. The 'no-trip' mode (Megger 'Hi-Z' or 'Loop No-Trip') uses low-current pulses that statistically don't accumulate enough residual current to trip a 30 mA RCD; standard mode injects a brief higher-current pulse and may trip RCDs. Always select no-trip mode on RCD-protected circuits.",
  },
  {
    id: 6,
    question: "What does an RCD trip-time test measure and what are the BS 7671 maximum times?",
    options: [
      "It measures the residual current at which the RCD operates rather than the time; a general 30 mA RCD is expected to trip somewhere between 50 mA and 100 mA of leakage.",
      "It measures the earth fault loop impedance of the RCD-protected circuit and confirms it sits below the Table 41.3 maximum for the device.",
      "It injects a calibrated residual current and times the disconnection: ≤ 300 ms at I∆n for a general RCD, 130–500 ms for a Type S delay device.",
      "It measures how long the RCD's internal contacts take to close when the test button is pressed, confirming the mechanism is not seized up.",
    ],
    correctAnswer: 2,
    explanation:
      "RCD trip-time is the diagnostic for responsiveness. A general 30 mA RCD must disconnect within 300 ms at rated I∆n; a time-delayed Type S device is allowed 130–500 ms to give selectivity with downstream RCDs. Modern RCDs trip in 10–40 ms, so slow tripping near the limit signals a failing device — periodic testing catches them before they cause harm. The MFT tests at 0° and 180° and records the slower result. A4:2026 simplified verification to a single AC trip at I∆n.",
  },
  {
    id: 7,
    question: "What's a phase sequence test and when is it needed?",
    options: [
      "It confirms all three line conductors sit at the same voltage to earth, and is needed on every single-phase final circuit before energising.",
      "It measures the time delay between the three phases reaching peak voltage, and is needed only on DC installations and battery systems.",
      "It checks the neutral is correctly identified on a three-phase supply, and is needed only when adding a new three-phase socket circuit.",
      "It confirms the order of phase rotation (L1-L2-L3) on three-phase supplies, needed at commissioning and after any work that disturbs phase identification.",
    ],
    correctAnswer: 3,
    explanation:
      "Phase sequence matters for any three-phase rotating plant. A wrong sequence reverses induction motors and pumps — driven plant runs backwards (conveyor, fan, lift), damaging equipment or running the wrong way. Tested with a phase rotation indicator (Fluke 9040, Megger PRMA1) that shows a clear arrow direction. Modern MFTs (Megger MFT1741+) include phase sequence as a function on three-phase tests.",
  },
  {
    id: 8,
    question: "What test results indicate a high-resistance joint somewhere on the circuit?",
    options: [
      "A combination of high R1+R2, raised EFLI Zs and excess voltage drop on load, pinned down by a thermal hotspot at the joint.",
      "A low insulation-resistance reading (below 1 MΩ) between line and earth, the classic signature of a high-resistance joint.",
      "An RCD that trips on its test button but holds at 5×IΔn, indicating resistance gradually building up in a joint.",
      "A higher-than-expected prospective fault current at the origin, because a high-resistance joint increases the available fault current.",
    ],
    correctAnswer: 0,
    explanation:
      "High-resistance joints show up as a pattern across multiple tests, not on one. R1+R2 reads higher than calculated (a 50 m 2.5 mm² ring should give ~0.5 Ω, not 1.4 Ω); EFLI Zs is raised for the same reason; and voltage drop on load runs above 5% by clamp meter, confirming I²R heating. The thermal camera then locates the joint. High continuity + high EFLI + thermal hotspot is the classic L3 HRJ identification. Sub 3.3 walks through where they typically appear.",
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
              "Test voltages: IR at 500 V DC for LV (250 V if electronics on circuit). EFLI uses Hi-Z mode on RCD-protected circuits to avoid tripping. RCD verification (Reg 643.8) is a single AC test at 1×IΔn.",
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
              <li><strong>6. Operation of RCDs</strong> (Reg 643.8) — a single AC test at rated 1×IΔn. Verify the operating time against the Reg 643.8 limits (≤ 300 ms general non-delay; 130–500 ms delay 'S' type).</li>
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

          <VideoCard
            url={videos.ringFinalTest.url}
            title={videos.ringFinalTest.title}
            channel={videos.ringFinalTest.channel}
            duration={videos.ringFinalTest.duration}
            topic={videos.ringFinalTest.topic}
          />

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
            source="BS 7671:2018+A4:2026 — Summary of changes / Reg 643.8"
            clause={
              <>
                "The requirements for RCD testing have been changed and Table 3A (Time/current performance criteria for RCDs) in Appendix 3 has been deleted. Regardless of RCD Type, an alternating current test at rated residual operating current (IΔn) is used to verify the effectiveness."
              </>
            }
            meaning={
              <>
                A4:2026 simplified the RCD test to a single AC trip at rated I&Delta;n. The 5&times;I&Delta;n test is gone and Table 3A is gone. The pass criterion is now stated in Reg 643.8 itself: a general non-delay RCD must disconnect within 300 ms, and a delay &apos;S&apos; type within 130&ndash;500 ms. Update your firm&apos;s test pro forma if it still has a 5&times; column.
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
            <p>BS 7671 Reg 643.8 (A4:2026) verification — a single AC test at rated I∆n:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>At I∆n (rated residual current, 30 mA): ≤ 300 ms (general non-delay type).</li>
              <li>A delay 'S' type RCD: between 130 ms and 500 ms at I∆n, to give selectivity.</li>
              <li>A4:2026 deleted Table 3A and the 5×IΔn test — there is no longer a 40 ms / 5×IΔn pass criterion. Modern RCDs typically operate in ~25–40 ms in practice, but that is real-world behaviour, not the regulatory limit.</li>
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
            plainEnglish="The MFT's RCD test injects a defined fault current and measures the trip time. Under A4:2026 the BS 7671 verification (Reg 643.8) is a single AC test at 1×IΔn: a general non-delay 30 mA RCD must disconnect within 300 ms, a delay 'S' type within 130–500 ms. The MFT runs the test and reports the actual operating time. (MFTs can still offer ½× and ramp functions as diagnostics, but the standard's pass criterion is the single 1×IΔn test.)"
            onSite="The Megger MFT1741+, Kewtech KT64+ and Fluke 1664FC all have AutoRCD modes; for verification you now only need the 1×IΔn AC operating time. For fault diagnosis the trip-time tells you whether the RCD is operating within spec OR whether it's slow (suggesting wear, contamination, or wrong-type RCD for the load — e.g. Type AC on a circuit with DC components)."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>×½ test</strong> — 15 mA injection on a 30 mA RCD. Should NOT trip. If it does, the RCD is over-sensitive (typically ageing). Diagnostic only — not part of the A4:2026 verification.</li>
              <li><strong>×1 test (the BS 7671 verification)</strong> — 30 mA AC injection at rated IΔn. General non-delay type must disconnect within 300 ms; delay 'S' type within 130–500 ms. This single 1×IΔn AC test is the A4:2026 pass criterion (Reg 643.8).</li>
              <li><strong>×5 test</strong> — 150 mA injection. A legacy diagnostic that some MFTs still offer; the old 40 ms / 5×IΔn pass criterion and Table 3A were DELETED in A4:2026, so it is no longer a verification requirement.</li>
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
              "A4:2026 RCD verification (Reg 643.8) is a single AC test at 1×IΔn: ≤ 300 ms for a general non-delay RCD, 130–500 ms for a delay 'S' type. Table 3A and the 5×IΔn/40 ms test were deleted. Modern RCDs typically operate in ~25–40 ms in practice — but that is real-world behaviour, not the limit.",
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
