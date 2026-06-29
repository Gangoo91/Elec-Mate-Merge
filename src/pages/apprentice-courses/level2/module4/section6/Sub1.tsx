/**
 * Module 4 · Section 6 · Sub 1 — Test continuity of protective conductor
 * Maps to City & Guilds 2365-02 / Unit 204 / LO6 / AC 6.1
 *   AC 6.1 — "Test continuity of protective conductor"
 *
 * Frame: continuity of every CPC — circuit CPCs, main bonding, supplementary
 * bonding — is the FIRST dead test after isolation. If the earth path back to
 * the MET is broken, every other test downstream is meaningless because there
 * is no fault clearance route. Two methods: R1+R2 loop, and R2 wander-lead.
 * Acceptance against Table 41.3 (A4:2026 values) — for example B32 = 1.37 Ω.
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

const TITLE = 'Test continuity of protective conductor | Level 2 Module 4.6.1 | Elec-Mate';
const DESCRIPTION =
  'R1+R2 and R2-only methods for proving CPC continuity using a low-resistance ohmmeter — null the leads, work circuit by circuit, compare to BS 7671 Table 41.3 (A4:2026) maximum Zs values.';

const checks = [
  {
    id: 'm4-s6-sub1-method-choice',
    question:
      'You need to confirm the CPC continuity of a 32 A radial circuit feeding a single far-end socket. Cable run is short and accessible at both ends. Which method is most efficient?',
    options: [
      'Insulation-resistance method: apply 500 V DC between line and CPC and read the result as the continuity figure.',
      'R2-only wander-lead method: run a long lead from the MET to the socket CPC and read the CPC resistance on its own.',
      'R1+R2 loop method: link line and CPC at the socket, measure end-to-end at the consumer unit.',
      'Earth-loop impedance (Zs) method: leave the circuit live and read the loop at the socket to confirm the CPC is intact.',
    ],
    correctIndex: 2,
    explanation:
      'R1+R2 is the standard method on a final circuit because it gives you both the line + CPC end-to-end resistance in one reading — useful later when comparing measured Zs to Table 41.3. R2-only with a wander lead is reserved for bonding conductors (where there is no L conductor to loop with) and for cases where you cannot reach both ends of the run from the same point. Insulation testers are 500 V DC — they would damage equipment and are the wrong instrument for continuity work.',
  },
  {
    id: 'm4-s6-sub1-table-413-b32',
    question:
      'BS 7671 A4:2026 Table 41.3 — Type B 32 A MCB at U₀ = 230 V, 0.4 s disconnection on a TN system. What is the maximum permitted Zs?',
    options: [
      '0.87 Ω',
      '1.37 Ω',
      '2.19 Ω',
      '1.44 Ω',
    ],
    correctIndex: 1,
    explanation:
      'A4:2026 Table 41.3 — Type B 32 A = 1.37 Ω. (The older 17th/A2 era value of 1.44 Ω is obsolete — never quote it on a new test result.) Your measured Zs at the far end of the circuit must come in below 1.37 Ω, and BS 7671 method requires applying the 0.8 multiplier when comparing measured (cold cable) values to the table — so the practical measured ceiling is 1.37 × 0.8 = 1.10 Ω.',
  },
  {
    id: 'm4-s6-sub1-bonding-rule',
    question:
      'You measure the continuity of a 10 mm² main bonding conductor from the MET to the gas service clamp. The reading is 0.04 Ω. Pass or fail?',
    options: [
      'Fail — main bonding must read 0.00 Ω; any measurable resistance, including 0.04 Ω, means a poor clamp connection that must be remade.',
      'Fail — 0.04 Ω exceeds the BS 7671 fixed limit of 0.02 Ω for main bonding conductors, so the run must be upsized to 16 mm².',
      'Cannot say — bonding continuity has no acceptance figure, so the reading is meaningless and you should record it without a pass or fail.',
      'Pass — comfortably below the 0.05 Ω rule of thumb for main bonding continuity, and well within any sensible acceptance limit.',
    ],
    correctIndex: 3,
    explanation:
      'For main bonding the practical rule of thumb taught on site (and in the IET Guidance Note 3) is < 0.05 Ω for a sensibly short bonding run. 0.04 Ω passes. There is no single BS 7671 numerical limit for bonding continuity — the regulation says it must be of negligible resistance and prove a continuous low-impedance path. As long as you can demonstrate that, with the leads nulled and a calibrated low-resistance ohmmeter, the reading is acceptable.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which BS 7671 regulation requires continuity of every protective conductor to be verified by measurement of resistance?',
    options: [
      '643.3.1',
      '643.2.1',
      '411.4.5',
      '514.16.1',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 643.2.1 (Continuity of conductors): "The continuity of conductors and connections to exposed-conductive-parts and extraneous-conductive-parts, if any, shall be verified by a measurement of resistance of (a) protective conductors, including protective bonding conductors; and (b) in the case of ring final circuits, live conductors." That covers every CPC, every bonding conductor and every ring leg.',
  },
  {
    id: 2,
    question: 'What instrument do you use for the R1+R2 continuity test?',
    options: [
      'Insulation-resistance tester on the 500 V DC range, reading the result in megohms.',
      'Earth-loop impedance tester, taking a live reading at the far accessory.',
      'Low-resistance ohmmeter (continuity range of an MFT — typically resolution down to 0.01 Ω, with leads nulled).',
      'Multimeter on the 200 Ω resistance range, with the probes touched together first.',
    ],
    correctAnswer: 2,
    explanation:
      'Continuity is measured with a low-resistance ohmmeter — the dedicated continuity range of a multifunction tester (MFT) such as a Megger MFT1741 or Fluke 1664FC. The instrument injects a small DC current (≥ 200 mA, ≥ 4 V open-circuit per BS EN 61557-4) and reads resistance to two decimal places. Always null the leads before recording — typical lead nulling deducts 0.10 to 0.30 Ω depending on lead length.',
  },
  {
    id: 3,
    question: 'You are about to start the R1+R2 test on a kitchen ring final. Step one is to:',
    options: [
      'Energise the circuit and take a live loop-impedance reading at the first socket to confirm the ring is intact before any dead testing.',
      'Link the two legs of the ring together at the consumer unit and measure across the link without isolating the circuit first.',
      'Measure insulation resistance between line and CPC at 500 V DC, then move on to the continuity readings.',
      'Verify safe isolation, then disconnect the line and CPC from the protective device at the consumer unit so the circuit is electrically isolated from the rest of the installation.',
    ],
    correctAnswer: 3,
    explanation:
      'Continuity is a dead test. After verifying safe isolation per the JIB sequence, you disconnect the line and CPC of the circuit from their terminals at the consumer unit so your reading captures only the circuit you are testing, not parallel paths through other circuits or via bonding loops. Forgetting this gives a falsely low reading because the meter sees multiple paths to earth.',
  },
  {
    id: 4,
    question: 'For a circuit protected by a 32 A Type B RCBO on a TN-C-S supply, you measure R1+R2 at the far socket = 0.45 Ω. Ze previously measured at the MET = 0.30 Ω. Compute Zs and decide pass/fail against the A4:2026 Table 41.3 limit using the 0.8 method.',
    options: [
      'Zs = 0.75 Ω. Pass — 0.75 Ω is below the corrected limit of 1.37 × 0.8 = 1.10 Ω.',
      'Zs = 0.75 Ω. Fail — 0.75 Ω exceeds the corrected limit of 1.37 × 0.4 = 0.55 Ω.',
      'Zs = 0.15 Ω. Pass — you subtract Ze from R1+R2 (0.45 − 0.30) to find the loop at the far end.',
      'Zs = 1.05 Ω. Borderline — add Ze, R1+R2 and the 0.30 Ω lead resistance, giving a value close to the 1.10 Ω limit.',
    ],
    correctAnswer: 0,
    explanation:
      'Zs = Ze + (R1 + R2) = 0.30 + 0.45 = 0.75 Ω. A4:2026 Table 41.3 max Zs for Type B 32 A = 1.37 Ω. Apply the 0.8 multiplier for cold-cable test comparison: 1.37 × 0.8 = 1.096 Ω ≈ 1.10 Ω. 0.75 Ω is comfortably below 1.10 Ω → compliant. Worth recording the headroom (0.35 Ω) on the schedule of test results so any future periodic inspection can spot drift.',
  },
  {
    id: 5,
    question: 'You measure the CPC continuity of a 1.5/1.0 mm² lighting circuit and get 0.00 Ω at the far light fitting. What is the most likely explanation?',
    options: [
      'The circuit is in perfect condition — a 0.00 Ω reading is exactly what you want and confirms the CPC has the lowest possible resistance.',
      'You forgot to disconnect the CPC from the earth bar — your meter is reading the parallel path through the earth bar and main bonding rather than the circuit CPC alone, masking a possible break in the circuit CPC.',
      'The leads were not nulled, so the meter has subtracted too much and shows zero; null again and the true reading will appear.',
      'The lighting circuit is wired in 1.0/1.0 mm² rather than 1.5/1.0 mm², so the CPC is the same size as the line and reads zero by design.',
    ],
    correctAnswer: 1,
    explanation:
      'A genuinely zero reading on a 1.5/1.0 mm² lighting circuit run is implausible — even a 5 m run gives R1+R2 ≈ 0.15 Ω. 0.00 Ω almost always means the meter has found a parallel path through the main earthing terminal and bonding back to the far end via another circuit. Always disconnect the CPC at the consumer unit before testing so your meter sees only the circuit you are testing. Suspect zero readings: re-test with the CPC properly isolated from the bar.',
  },
  {
    id: 6,
    question: 'When testing the continuity of a main bonding conductor from the MET to the gas service:',
    options: [
      'Disconnect the bonding conductor at both ends first, then read its resistance on the bench so the clamps do not affect the figure.',
      'Apply 500 V DC between the bonding conductor and the gas pipe to confirm the insulation around the clamp is sound.',
      'Connect one MFT lead to the MET clamp and the other to the bonding clamp at the gas service — read directly. The reading proves end-to-end resistance of the conductor including both clamps. Acceptance: < 0.05 Ω as a practical rule of thumb.',
      'Measure the loop impedance from the gas clamp back to the supply with the installation live, and accept any value under 1 Ω.',
    ],
    correctAnswer: 2,
    explanation:
      'For bonding continuity you do not normally disconnect the conductor — the test reads resistance through the in-place clamps which is exactly what matters in service. Read directly between the MET clamp and the bonding clamp at the service. < 0.05 Ω passes for a typical short main bonding run; if it reads higher, check the clamp tightness, the tag length and whether the clamp is on bare metal not paint.',
  },
  {
    id: 7,
    question: 'A4:2026 Table 41.3 max Zs values are presented differently to legacy texts. Which statement is correct?',
    options: [
      'Table 41.3 values are still raw figures — you must multiply every reading by 0.95 yourself to apply Cmin before comparing, exactly as in the older A2 texts.',
      'The A4:2026 values went UP compared to A2 because the disconnection time was relaxed, so B32 rose from 1.37 Ω to 1.44 Ω.',
      'Table 41.3 now gives the cold-measured site limit directly, so the 1.37 Ω figure is already the value you compare your measured reading against with no further correction.',
      'Table 41.3 max Zs values in A4:2026 are now published with the Cmin factor (0.95) already applied — you don\'t multiply by 0.95 yourself. Use the table value directly, then apply the 0.8 measured-vs-calculated correction (e.g. B32 max Zs = 1.37 Ω → 1.10 Ω corrected).',
    ],
    correctAnswer: 3,
    explanation:
      'Table 41.3 max Zs values in A4:2026 are now published with the Cmin factor (0.95) already applied — you don\'t multiply by 0.95 yourself. The 0.8 figure that appears in some legacy texts is a separate temperature correction (Ct), not Cmin. Always use Table 41.3 directly: B32 max Zs = 1.37 Ω, with the 0.8 Ct correction giving 1.10 Ω at the measured-vs-calculated threshold. The net effect compared to older A2 figures is that several rows came down a few percent (B32 from 1.44 Ω to 1.37 Ω, B16 from 2.87 Ω to 2.73 Ω) — quote the A4:2026 value on every new schedule of test results.',
  },
  {
    id: 8,
    question: 'Order of dead tests in the BS 7671 sequence (a common exam question):',
    options: [
      'Continuity of CPCs (including bonding) → continuity of ring final → insulation resistance → polarity → earth electrode resistance (TT only). Then live tests.',
      'Insulation resistance → continuity of CPCs → polarity → ring final continuity → earth electrode resistance (TT only). Then live tests.',
      'Polarity → insulation resistance → continuity of CPCs → earth electrode resistance (TT only) → ring final continuity. Then live tests.',
      'Earth fault loop impedance → continuity of CPCs → insulation resistance → polarity → RCD operation. All carried out dead in this order.',
    ],
    correctAnswer: 0,
    explanation:
      'The dead-test sequence per BS 7671 Section 643 (and IET GN3): continuity of protective conductors first, ring final continuity second, insulation resistance third, polarity fourth, earth electrode resistance fifth (TT only). The order matters because each test verifies the integrity needed for the next: an insulation test on a circuit with a broken CPC is meaningless because there is no return path to read against. Live tests (Ze, PFC, Zs at far end, RCD trip times) come after first energisation.',
  },
];

const faqs = [
  {
    question: 'Why test continuity if I just installed the circuit and saw the CPC go in?',
    answer:
      'Because in between routing the cable and energising it, plenty can go wrong. A back-box screw can pinch the CPC. A clamp can be over-tightened and shear a strand. The terminal might be on the conductor insulation, not the copper. A junction box can be left disconnected. None of these are visible from a quick eyeball. Continuity test is the only proof that the earth path actually works end-to-end — and Reg 643.2.1 makes it mandatory regardless of how confident you feel about the install.',
  },
  {
    question: 'R1+R2 versus R2-only — when should I use each?',
    answer:
      'R1+R2 (link the line and CPC at the far end, measure at the consumer unit): your default for final circuits. Gives you the loop reading you will compare to Table 41.3 later. Quick because you only need access at the consumer-unit end once you have linked at the far end. R2-only (long lead from the MET to the far end of each accessory): used for bonding conductors (no L to link with), supplementary bonding in special locations like bathrooms, and any case where you cannot reach both ends of the conductor from the same point — e.g. an inaccessible junction box where the link cannot be made.',
  },
  {
    question: 'How do I null the leads properly on the MFT?',
    answer:
      'Switch the instrument to the continuity range. Touch the two test probes together firmly. Press the null / zero button. The meter stores the lead resistance and subtracts it from subsequent readings. Re-null whenever you change leads or after an instrument knock. A typical pair of test leads adds 0.10 to 0.30 Ω. Without nulling you would over-read every continuity result by that amount, which can push a borderline circuit into a false fail.',
  },
  {
    question: 'My MFT shows OL (overload) on the continuity range — what does that mean?',
    answer:
      'OL on the continuity range means the resistance is above the meter range — effectively an open circuit. There is no continuity at all. Common causes: a disconnected CPC at a junction box, a CPC trapped under terminal jaws on the insulation rather than the copper, a connector block that has not been tightened, a broken core inside a damaged cable, or simply that you have wired the test up wrong. Trace from the MET outwards.',
  },
  {
    question: 'Do I need to test bonding continuity every time?',
    answer:
      'Yes — Reg 643.2.1 covers protective bonding conductors as well as circuit CPCs. On a new install you test main bonding to gas, water, oil and any other extraneous-conductive-parts after they are clamped, and supplementary bonding in special locations. On periodic inspection (EICR) bonding continuity is one of the items the inspector will retest at least sample-wise — particularly after kitchen or bathroom refurbishments where bonding is often disturbed.',
  },
  {
    question: 'Where do I record continuity results?',
    answer:
      'Schedule of Test Results (STR) — the per-circuit form that goes with the Electrical Installation Certificate. Columns for R1+R2 (or R2 alone where applicable), and a separate row at the top of the form for main bonding continuity readings. The IET model STR has a column specifically for the CPC continuity reading; bonding goes on the Schedule of Inspections or as a header item on the STR depending on the form variant. See Sub 8 of this section for the full column-by-column walk-through.',
  },
];

export default function Sub1() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 6
          </button>

          <PageHero
            eyebrow="Module 4 · Section 6 · Subsection 1"
            title="Test continuity of protective conductor"
            description="The R1+R2 and R2-only methods for proving the CPC works end-to-end — instrument setup, lead nulling, the test sequence and how the reading feeds into your Zs calculation."
            tone="emerald"
          />

          <TLDR
            points={[
              'Continuity of every CPC and bonding conductor is the FIRST dead test after safe isolation. It is mandatory under BS 7671 Reg 643.2.1.',
              'Use a low-resistance ohmmeter (the continuity range of an MFT) with leads nulled. R1+R2 loop method is the default for final circuits; R2-only with a wander lead is for bonding conductors and inaccessible runs.',
              'Acceptance: combine R1+R2 with Ze to get Zs, then check against BS 7671 A4:2026 Table 41.3 (e.g. B32 = 1.37 Ω) using the 0.8 multiplier for cold-cable test comparison.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Carry out an R1+R2 continuity test on a final circuit using the link-and-test method.',
              'Carry out an R2-only continuity test using a wander lead, for bonding conductors and otherwise inaccessible CPCs.',
              'Null the test leads on a multifunction tester before each set of readings, and re-null after lead changes.',
              'Cite Reg 643.2.1 (continuity of conductors), Reg 643.2.1.1 (every protective conductor) and Reg 411.4.5 (max Zs for ADS).',
              'Read max Zs values from BS 7671 A4:2026 Table 41.3 for Type B MCBs and apply the 0.8 multiplier for measured-temperature comparison.',
              'Record continuity results on the Schedule of Test Results, including bonding readings.',
              'Diagnose suspect readings (zero readings, OL, drift between accessories) by tracing parallel paths and termination quality.',
            ]}
            initialVisibleCount={4}
          />

          <ContentEyebrow>What you are proving</ContentEyebrow>

          <ConceptBlock
            title="Why continuity comes first in the dead-test sequence"
            plainEnglish="Every later test assumes there is an earth path back to the MET. If the CPC is broken, insulation, polarity, Zs and RCD trip-time all become meaningless or misleading. So you prove the earth path exists before testing anything else."
            onSite="On a new circuit you have just installed, the CPC continuity test is the first reading you take with an instrument. Verify safe isolation, lift the line and CPC out of the protective device terminals at the consumer unit, then test."
          >
            <p>
              The dead-test sequence (Section 643) is ordered deliberately. Continuity of protective
              conductors comes first because every test downstream depends on a working earth path
              back to the MET. A line-to-earth insulation resistance test on a circuit with a broken
              CPC will read open-circuit and look fine — even though there is a serious safety
              defect waiting for the moment you energise.
            </p>
            <p>The dead-test order:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>Continuity of protective conductors — circuit CPCs and bonding (this Sub).</li>
              <li>Continuity of ring final circuit — r1, rn, r2 plus cross-connections (Sub 2).</li>
              <li>Insulation resistance — between live conductors and to earth (Sub 3).</li>
              <li>Polarity — line in the right place at every accessory (Sub 4).</li>
              <li>Earth electrode resistance — TT installations only.</li>
              <li>(Then live tests after first energisation: Ze, PFC, Zs, RCD trip times.)</li>
            </ol>
            <p>
              Continuity is the foundation. Get it wrong and every later test result is suspect.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 643.2.1 (Continuity of conductors)"
            clause="The continuity of conductors and connections to exposed-conductive-parts and extraneous-conductive-parts, if any, shall be verified by a measurement of resistance of: (a) protective conductors, including protective bonding conductors; and (b) in the case of ring final circuits, live conductors."
            meaning={
              <>
                Every CPC and every bonding conductor must be continuity-tested by measurement —
                not by visual inspection alone. The ring-final live-conductor part of (b) is covered
                in Sub 2; the protective-conductor part of (a) is what this Sub covers. Note: it is
                not enough to confirm the CPC is connected — you must measure resistance and record
                the value.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 6, Chapter 64, Regulation 643.2.1."
          />

          <SectionRule />

          <ContentEyebrow>The instrument and lead nulling</ContentEyebrow>

          <ConceptBlock
            title="Low-resistance ohmmeter — what to use, how to set it up"
            plainEnglish="A multifunction tester (MFT) on the continuity range. It pumps a small DC test current through the conductor under test and reads the voltage drop, calculating resistance to two decimal places."
            onSite="Megger MFT1741, Fluke 1664FC, Kewtech KT65DL — any current MFT to BS EN 61557 has a continuity range. Check the calibration sticker is in date before you start."
          >
            <p>
              Continuity readings are taken with a dedicated low-resistance ohmmeter — practically
              speaking, the continuity range of a multifunction tester. The instrument injects a
              minimum 200 mA test current at no less than 4 V open-circuit per BS EN 61557-4. That
              level of current punches through any thin oxide on a terminal, giving you a reliable
              reading on connections that a low-power multimeter would miss.
            </p>
            <p>What to check before you start:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Calibration in date.</strong> 12-month calibration cycle is industry
                standard. The certificate should be available on request and the sticker in date.
              </li>
              <li>
                <strong>Battery condition.</strong> A flat battery on the continuity range will
                quietly under-read — the meter cannot drive enough current to read accurately. Most
                MFTs show a low-battery icon; check it before recording results.
              </li>
              <li>
                <strong>Test leads in good condition.</strong> No cracked sheaths, no loose
                crocodile-clip jaws, no exposed copper near the probe handles. Replace dodgy leads
                before testing — they can add unpredictable resistance.
              </li>
              <li>
                <strong>Lead null performed.</strong> Touch the probes together, press null/zero,
                read 0.00 Ω. Repeat after every lead change.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Lead nulling — why and how"
            plainEnglish="Test leads add a small resistance of their own — typically 0.10 to 0.30 Ω depending on lead length. The meter needs to know that figure so it can deduct it from your readings."
            onSite="Null the leads at the start of every test session, after lead swaps, after the meter has been knocked, and any time you change probe attachments (clip versus prod tip)."
          >
            <p>
              The nulling routine on a typical MFT:
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>Switch the meter to the continuity range (often labelled R-LO or similar).</li>
              <li>Connect both test leads to the meter — usually red to + and black to common/COM.</li>
              <li>
                Touch the two probe tips together firmly. Hold for a couple of seconds — the meter
                should display a small but stable resistance (typical 0.15 Ω for a standard lead
                pair).
              </li>
              <li>Press the null/zero button (often marked with a Ø or 0). The reading should snap to 0.00 Ω.</li>
              <li>
                Separate the probes. The meter should now read OL (open) — confirming nulling
                stored correctly.
              </li>
            </ol>
            <p>
              Without nulling, every reading is over-stated by the lead resistance. On a 30 m
              lighting run with R1+R2 ≈ 0.90 Ω that might not matter; on a short bonding run
              expected to read 0.04 Ω it would push the reading to 0.20 Ω and trigger an
              unnecessary investigation.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Method 1 — R1+R2 loop test (default)</ContentEyebrow>

          <ConceptBlock
            title="The R1+R2 method, step by step"
            plainEnglish="Link the line and CPC together at the far end of the circuit. At the consumer-unit end, measure resistance between the line terminal and the CPC terminal. The reading is the loop of L conductor + CPC end-to-end."
            onSite="This is the standard test on every final circuit because it gives you the value you will use later in the Zs calc — Zs = Ze + (R1+R2)."
          >
            <p>
              R1+R2 step-by-step on a domestic radial:
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Verify safe isolation.</strong> Per the JIB sequence: identify the circuit,
                isolate, lock off, prove the proving unit is working, prove the circuit dead at
                point of work, prove the proving unit again.
              </li>
              <li>
                <strong>Disconnect the circuit at the consumer unit.</strong> Lift the line and CPC
                of the circuit out of the protective device and earth bar respectively. This stops
                the meter seeing parallel paths through other circuits.
              </li>
              <li>
                <strong>At the far end of the circuit</strong> (the furthest accessory or the
                socket nearest the end of the cable), link the line and CPC together with a short
                jumper or by squeezing them into a single connector block.
              </li>
              <li>
                <strong>Back at the consumer unit</strong>, connect one MFT lead to the line
                conductor and the other to the CPC. Press TEST. Note the reading.
              </li>
              <li>
                <strong>Record the value</strong> on the Schedule of Test Results in the R1+R2
                column for that circuit.
              </li>
              <li>
                <strong>Remove the link</strong> at the far end and re-connect line and CPC into
                the protective device and earth bar at the CU.
              </li>
            </ol>
            <p>
              For a long radial with multiple accessories, link at the furthest one — that captures
              the full circuit length. For a ring final, see Sub 2 (different method, three-part
              test).
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 411.4.5 (paraphrased — Maximum earth fault loop impedance for TN system ADS)"
            clause="In a TN system, the maximum value of earth fault loop impedance (Zs) shall be such that the protective device disconnects within the time stated in Table 41.1 — namely 0.4 s for final circuits up to 63 A with sockets or up to 32 A with fixed equipment at U₀ ≤ 230 V AC, and 5 s for distribution circuits and final circuits exceeding those ratings. Maximum Zs values for the various overcurrent protective devices are given in Table 41.3."
            meaning={
              <>
                Your measured R1+R2 plus the Ze you measured at the MET gives Zs. Compare Zs to
                Table 41.3 (with the 0.8 multiplier for cold-cable test conditions). If Zs is too
                high, the protective device cannot guarantee 0.4 s disconnection — you must reduce
                R1+R2 (thicker cable, shorter run, fix bad terminations) or change the protective
                device rating, then re-test.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 4, Chapter 41, Regulation 411.4.5 and Table 41.3."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <ConceptBlock
            title="R1+R2 vs R2-only — when each is appropriate"
            plainEnglish="R1+R2 is your default when you can reach both ends of the run from one place to make the link. R2-only with a long wander lead is for cases where you can't — bonding conductors with no L to loop with, or a run whose far end you can't access to fit the link."
            onSite="If you'd have to walk a 25 m wander lead from the MET out to a single distant socket and back to test it, R1+R2 is faster — link L+CPC at the socket, take the reading at the CU and you're done. But if the far end is in a sealed back-box behind kitchen units, R2-only from the MET to the nearest accessible point is the only practical option."
          >
            <p>
              The choice between R1+R2 and R2-only is mostly about access and what's actually
              there to loop:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Use R1+R2 when</strong> you have a circuit final with a line conductor and
                a CPC running together, both ends accessible, and you want the value that feeds
                directly into Zs = Ze + (R1+R2). Default for every domestic radial and (via the
                three-part test) every ring final.
              </li>
              <li>
                <strong>Use R2-only when</strong> there is no L to loop with — main bonding,
                supplementary bonding in special locations, standalone earth conductors to
                structural steel — or when the far end of a circuit cannot be reached to fit a
                link.
              </li>
              <li>
                <strong>R2-only on a long lead</strong> is also the right call when you want to
                spot-check a single accessory mid-run on a long radial — wander lead from the MET
                out to the suspect terminal lets you verify the CPC is intact at that point
                without disturbing the whole circuit.
              </li>
            </ul>
            <p>
              On a typical domestic install you might use R1+R2 for every final circuit (8-12
              readings) and R2-only with the wander lead for the 2-3 main bonding runs. On a
              swimming pool or zone-rich bathroom rebuild you'll do far more R2-only work because
              of the supplementary bonding requirements.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Test instrument null/zero technique on the continuity range"
            plainEnglish="Lead nulling is a one-button operation but it has to be redone any time the lead set changes — different leads, different probes, even after the meter takes a knock on a hard floor. Skipping the re-null is a leading cause of false high readings."
            onSite="Develop a habit: change leads → null → test. Touch the probes together firmly, hold for two seconds, press the null button, watch the display snap to 0.00 Ω. Separate the probes — should read OL. If it doesn't, repeat the null."
          >
            <p>
              The MFT continuity range injects a small DC current (≥ 200 mA per BS EN 61557-4)
              and reads the voltage drop across whatever's between the probes. Test leads
              themselves are conductors and add their own resistance to the reading — typically
              0.10 to 0.30 Ω depending on lead length and condition. Nulling tells the meter to
              subtract that lead resistance from every subsequent reading.
            </p>
            <p>What you're nulling out:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Lead resistance itself</strong> — the copper of the test leads.
              </li>
              <li>
                <strong>Probe-tip oxide</strong> — the thin oxide layer that builds up on probe
                tips between uses. The 200 mA test current punches through it but it still adds
                a small resistance the meter has to know about.
              </li>
              <li>
                <strong>Connector contact resistance</strong> — where the leads plug into the
                meter. Worn sockets add resistance.
              </li>
            </ul>
            <p>
              <strong>Calibration drift:</strong> over time the meter's internal reference can
              drift slightly, especially on instruments that haven't been calibrated in 12+
              months. The null routine compensates for short-term drift but not for major
              reference error — that's what the annual calibration cycle is for. If you find
              yourself nulling and the meter won't snap to 0.00 (it sits at 0.05 or higher even
              with probes touching), the meter needs a service before it goes any further on the
              job.
            </p>
            <p>
              <strong>Practical tip:</strong> on a long testing day, re-null at the start of every
              circuit. Takes five seconds, removes any doubt, catches any subtle drift before it
              affects your numbers.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Method 2 — R2-only with a wander lead</ContentEyebrow>

          <ConceptBlock
            title="When to reach for the wander lead"
            plainEnglish="When you cannot link the line and CPC together at one end — typically because there is no line conductor to link with (bonding conductors), or because access at one end is impossible."
            onSite="Wander lead = a long flexible lead, usually drum-mounted, run from the MET out to the test point. The MFT reads from the MET clamp through the wander lead to the probe at the far end."
          >
            <p>
              Cases where R2-only with a wander lead is the right call:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Bonding conductors.</strong> A 10 mm² main bonding cable from the MET to
                the gas service has no line conductor to loop with. R2-only is the only way.
              </li>
              <li>
                <strong>Supplementary bonding in special locations.</strong> Bathroom
                supplementary bonding (where still required), swimming-pool zone bonding, agricultural
                bonding — these are stand-alone CPCs without an associated L conductor.
              </li>
              <li>
                <strong>Inaccessible far ends.</strong> If the far end of a circuit is buried in a
                wall void or a sealed enclosure and cannot be opened to fit a link, R2-only from
                the MET to the nearest accessible point can prove the CPC.
              </li>
              <li>
                <strong>Bonding continuity to extraneous parts</strong> like structural steel, where
                you want to prove the bonding clamp works — measure from the MET via wander lead
                to the metalwork itself.
              </li>
            </ul>
            <p>The R2-only method, step by step:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>Verify safe isolation.</li>
              <li>
                Connect the wander lead to the MET clamp (or to the bonding clamp / earth bar at
                the consumer unit, depending on what you are proving).
              </li>
              <li>
                Null the leads — null with the wander lead in circuit, not just the short MFT
                leads, otherwise you are not zeroing out the wander-lead resistance.
              </li>
              <li>
                Touch the probe end of the wander lead to the far point — the bonding clamp at the
                gas service, the CPC terminal at a socket, the accessible metalwork.
              </li>
              <li>Read and record.</li>
            </ol>
            <p>
              Acceptance values: bonding continuity should read &lt; 0.05 Ω as a practical rule of
              thumb (no specific BS 7671 numerical limit, but the regulation requires "negligible
              resistance"). Circuit CPC R2-only should be the cable length × R2 mΩ/m from BS 7671
              Appendix 4 — e.g. 30 m of 1.0 mm² CPC ≈ 30 × 18.1 = 0.54 Ω.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Acceptance against Table 41.3 (A4:2026)</ContentEyebrow>

          <ConceptBlock
            title="The A4:2026 Type B max Zs values you must memorise"
            plainEnglish="Type B MCBs at 230 V — the most common protection in UK domestic. A4:2026 reissued these slightly lower than the earlier A2 values to give more headroom under realistic supply tolerance."
            onSite="Apply the 0.8 multiplier on every measured comparison. The headline numbers below are operating-temperature limits; your meter reads at ambient."
          >
            <p>
              BS 7671 A4:2026 Table 41.3 — Type B MCB to BS EN 60898 at U₀ = 230 V, 0.4 s
              disconnection on a TN system:
            </p>

            <div className="hidden sm:block bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-xl p-4 text-[14px] font-mono">
              <div className="grid grid-cols-3 gap-2 text-white/90">
                <div className="text-elec-yellow/80 text-[12px] uppercase tracking-wide">Device</div>
                <div className="text-elec-yellow/80 text-[12px] uppercase tracking-wide">Max Zs (table)</div>
                <div className="text-elec-yellow/80 text-[12px] uppercase tracking-wide">Measured limit (×0.8)</div>
                <div>Type B 6 A</div><div>7.28 Ω</div><div>5.82 Ω</div>
                <div>Type B 10 A</div><div>4.37 Ω</div><div>3.50 Ω</div>
                <div>Type B 16 A</div><div>2.73 Ω</div><div>2.18 Ω</div>
                <div>Type B 20 A</div><div>2.19 Ω</div><div>1.75 Ω</div>
                <div>Type B 32 A</div><div>1.37 Ω</div><div>1.10 Ω</div>
                <div>Type B 40 A</div><div>1.09 Ω</div><div>0.87 Ω</div>
              </div>
            </div>

            <div className="sm:hidden space-y-2">
              {[
                { device: 'Type B 6 A', table: '7.28 Ω', measured: '5.82 Ω' },
                { device: 'Type B 10 A', table: '4.37 Ω', measured: '3.50 Ω' },
                { device: 'Type B 16 A', table: '2.73 Ω', measured: '2.18 Ω' },
                { device: 'Type B 20 A', table: '2.19 Ω', measured: '1.75 Ω' },
                { device: 'Type B 32 A', table: '1.37 Ω', measured: '1.10 Ω' },
                { device: 'Type B 40 A', table: '1.09 Ω', measured: '0.87 Ω' },
              ].map((row) => (
                <div
                  key={row.device}
                  className="bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-xl p-3 font-mono text-[13px]"
                >
                  <div className="text-elec-yellow font-semibold">{row.device}</div>
                  <div className="grid grid-cols-2 gap-2 mt-1.5 text-white/80">
                    <div>
                      <div className="text-[10.5px] uppercase tracking-wide text-white/50">Max Zs (table)</div>
                      <div>{row.table}</div>
                    </div>
                    <div>
                      <div className="text-[10.5px] uppercase tracking-wide text-white/50">Measured (×0.8)</div>
                      <div>{row.measured}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p>
              Note the changes from the older A2 values: B16 dropped from 2.87 → 2.73 Ω, B20 from
              2.30 → 2.19 Ω, B32 from 1.44 → 1.37 Ω. Always quote the A4:2026 figures on a new
              schedule of test results.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>What goes wrong on site</ContentEyebrow>

          <CommonMistake
            title="Reading 0.00 Ω and recording it as a pass"
            whatHappens={
              <>
                You test R1+R2 on a 25 m radial circuit. The meter reads 0.00 Ω. You think
                "perfect" and write it down. The reality: you forgot to disconnect the CPC at the
                earth bar in the consumer unit. The meter is reading a parallel path back through
                the main earthing terminal and bonding to the far end via another circuit's CPC.
                Your circuit's actual CPC could be completely broken and you would never know
                until a fault occurred and the path through the bonding loop saturates or
                disconnects.
              </>
            }
            doInstead={
              <>
                For any continuity test on a CPC, disconnect the CPC of the circuit being tested
                from the earth bar at the consumer unit. The meter then sees only the cable you
                are testing. A 25 m run of 2.5/1.5 T&E should give R1+R2 ≈ 0.49 Ω — a reading
                anywhere near zero on a sensible cable run is a red flag, not a pass. Re-test
                with the CPC properly isolated.
              </>
            }
          />

          <CommonMistake
            title="Skipping the lead null after a lead change"
            whatHappens={
              <>
                Mid-job you change from short prod-tip leads to a long crocodile-clip lead set so
                you can reach inside a deep back-box. You forget to re-null. Every subsequent
                reading is over-stated by an extra 0.20-0.40 Ω. A B32 ring final reading 1.05 Ω
                R1+R2 (which when added to a Ze of 0.30 gives Zs of 1.35 Ω — already at the
                corrected limit) gets recorded as 1.45 Ω — and you re-design the circuit
                unnecessarily, or worse, you mark a perfectly fine circuit as a fail.
              </>
            }
            doInstead={
              <>
                Re-null the leads any time you change them, even briefly. Modern MFTs make this a
                single button press. Develop the habit: change leads → null → test. The thirty
                seconds it takes is much less than the time you would lose chasing a phantom
                fault on a circuit that was actually compliant.
              </>
            }
          />

          <Scenario
            title="R1+R2 on a 32 A Type B kitchen ring final"
            situation={
              <>
                You have just installed a kitchen ring final circuit on a domestic refurb. T&E
                2.5/1.5 mm², measured route length around the ring ≈ 28 m. Protective device is a
                32 A Type B RCBO. Ze previously measured at the MET = 0.30 Ω (TN-C-S supply). You
                are about to take the R1+R2 reading at the furthest socket (the one nearest the
                halfway point of the ring electrically). You measure 0.45 Ω.
              </>
            }
            whatToDo={
              <>
                Compute Zs: Zs = Ze + (R1+R2) = 0.30 + 0.45 = 0.75 Ω. Compare against Table 41.3
                (A4:2026) Type B 32 A = 1.37 Ω. Apply the 0.8 multiplier: corrected measured
                limit = 1.37 × 0.8 = 1.10 Ω. Your measured Zs of 0.75 Ω is comfortably below
                1.10 Ω. Pass. Record 0.45 Ω in the R1+R2 column of the STR for that circuit, and
                note Zs = 0.75 Ω in the calculated-Zs column. Headroom of 0.35 Ω means you have
                margin to absorb terminal degradation, future cable warming or minor DNO supply
                changes.
              </>
            }
            whyItMatters={
              <>
                A 0.45 Ω R1+R2 on a 28 m ring of 2.5/1.5 T&E is exactly what you would expect from
                first-principles cable resistance: 28 m × 19.5 mΩ/m ÷ 4 (the ring divides loop in
                four when measured at the electrical midpoint) ≈ 0.14 Ω calculated cold. You are
                reading higher than the cold calc because the meter is measuring real-world
                terminations, not idealised cable. The 0.45 Ω includes the resistance of every
                outlet box terminal and the RCBO outgoing terminal — perfectly reasonable on a
                fresh install. If the reading came in at 1.05 Ω, you would be looking at three
                or four marginal terminations adding up — worth investigating before sign-off.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Continuity of every CPC and bonding conductor is mandatory under BS 7671 Reg 643.2.1 — verified by measurement of resistance, not by visual inspection alone.',
              'Use a low-resistance ohmmeter (the continuity range of an MFT to BS EN 61557-4) with leads nulled. Re-null after every lead change.',
              'R1+R2 loop method is the default for final circuits. Disconnect the circuit at the CU first, link L and CPC at the far end, measure between L and CPC terminals at the CU.',
              'R2-only with a wander lead is for bonding conductors and inaccessible runs. Null with the wander lead in circuit so its resistance is included in the zero.',
              'Acceptance: combine measured R1+R2 with Ze to get Zs. Check against BS 7671 A4:2026 Table 41.3 — Type B 6 A = 7.28 Ω, B10 = 4.37 Ω, B16 = 2.73 Ω, B20 = 2.19 Ω, B32 = 1.37 Ω, B40 = 1.09 Ω.',
              'Apply the 0.8 multiplier when comparing measured Zs to Table 41.3 — table values are at operating temperature, your meter reads at ambient.',
              'Bonding continuity rule of thumb: < 0.05 Ω for a sensibly short main bonding run. There is no single BS 7671 numerical limit but the regulation requires "negligible resistance".',
              'Suspicious 0.00 Ω readings almost always mean you forgot to isolate the CPC at the earth bar. Re-test with proper isolation.',
            ]}
          />

          <Quiz title="Continuity of CPC — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section5/5-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                5.4 Non-conformances
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section6/6-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                6.2 Test ring final circuit
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
