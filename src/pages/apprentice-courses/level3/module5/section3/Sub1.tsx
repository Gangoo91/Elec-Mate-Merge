/**
 * Module 5 · Section 3 · Subsection 1 — The dead-test sequence (Reg 643)
 * Maps to C&G 2365-03 / Unit 304 / LO4
 *
 * The Reg 643 dead-test sequence — why the order matters, what each test
 * proves, and how each step depends on the previous passing. Continuity,
 * insulation resistance, polarity, electrode resistance, before any live
 * test is even contemplated.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import OhmsCalculator from '@/components/apprentice-courses/OhmsCalculator';
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

const TITLE = 'The dead-test sequence (Reg 643) | Level 3 Module 5.3.1 | Elec-Mate';
const DESCRIPTION =
  "The Reg 643 dead-test sequence — order, dependencies, and what each test proves. Continuity, IR, polarity, electrode resistance — all conducted before any live test, each step a gate for the next.";

const checks = [
  {
    id: 'm5-s3-sub1-sequence',
    question: 'Per Reg 643.1, the order of testing for initial verification is:',
    options: [
      "Dead tests first (continuity of protective conductors and ring final, IR, polarity, electrode resistance), then live tests (Ze, PFC, Zs, RCD operation, AFDD, functional). Each step depends on the previous passing.",
      "A pre-use check is a quick visual assessment before each use; a formal inspection is a detailed, documented inspection by a competent person at specified intervals",
      "The 5 s operating current of the device — the current that causes the device to operate within 5 seconds (typically the current at the magnetic-trip threshold for an MCB, or the BS 88 fuse 5 s curve current).",
      "That the perimeter of the site or that part of the site on which construction work is carried out is identified by suitable signs and the site is so far as is reasonably practicable secured from unauthorised access",
    ],
    correctIndex: 0,
    explanation:
      "Reg 643.1 mandates dead tests before live. The sequence is built around dependency: continuity proves the CPC path; IR proves no insulation faults; polarity proves correct connection; electrode proves the earthing means; only then is it safe to energise for Ze, PFC, Zs, RCD, AFDD, functional. Skipping the order risks energising a system with a fundamental fault.",
  },
  {
    id: 'm5-s3-sub1-isolation',
    question: 'Before any dead test, the installation must be:',
    options: [
      "Approximately (r1 + rn) ÷ 4 = 0.155 Ω at every socket, constant within a few percent. The divide-by-four comes from the parallel combination of two halves of the loop, each half being two quarters in series.",
      "Plan to have all workers safely descended and equipment secured well before the storm arrives; cease work at height immediately if the 30/30 rule triggers; do not resume until 30 minutes after the last thunder or lightning",
      "Unplanned breakdowns incur additional costs: emergency call-out charges, expedited parts delivery, overtime, lost production, secondary damage to adjacent components, safety risks, and the disruption of other planned work",
      "Safely isolated and proven dead per the safe isolation procedure (lock off, identify, prove dead with a GS38 voltage indicator that has been proved on a known live source before AND after) — confirms the absence of supply for the duration of testing.",
    ],
    correctIndex: 3,
    explanation:
      "Safe isolation is the foundation. EAWR Reg 14 default is dead working; the dead-test sequence depends on the install being verifiably dead. The full procedure: identify, isolate at the originating device, lock off, post warning notice, prove dead with a voltage indicator that has been proved before AND after on a known live source. Skipping the prove-after step is the single most common cause of mis-diagnosed test results.",
  },
  {
    id: 'm5-s3-sub1-test-instrument',
    question: 'Test instruments used for initial verification must be:',
    options: [
      "Visual inspection items at the installation level — connection of conductors, identification of conductors, presence of required diagrams and labels, presence of barriers / enclosures / SPDs / RCDs, suitability of equipment for the location, etc. A tick-list grouped by category.",
      "Calibrated to a traceable standard, within current calibration date, and appropriate to the test (continuity instrument with output 200 mA at no-load voltage between 4 V and 24 V per Reg 643.2.1, IR tester at the correct test voltage per Table 64, RCD tester with appropriate test current and waveform).",
      "It introduces additional requirements concerning earth electrodes in Chapter 54 — designers must consult the full text of Reg 542.2.8 in the published amendment to determine the obligations, exceptions and any required testing or labelling for earth electrodes installed under A4:2026.",
      "Technicians contribute by identifying recurring failure patterns, proposing improvements to maintenance procedures, feeding back accurate data through the CMMS, sharing knowledge with colleagues, suggesting energy-saving measures, and participating in root cause analysis following significant failures",
    ],
    correctIndex: 1,
    explanation:
      "Calibration is non-negotiable for verification testing. Each test specifies the instrument capability — continuity (200 mA at low voltage to avoid energising potential faults), IR (per Table 64 voltages), RCD test (correct current and waveform). Recorded results from uncalibrated or unsuitable instruments do not satisfy verification — and may not stand up if challenged.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "Reg 643.1 — the test sequence is described as:",
    options: [
      "Whether there are underlying causes such as personal problems, wrong career choice, bullying, financial stress, or health issues",
      "Mandatory order — dead tests first, with each step a precondition for the next, then live tests in their own internal order.",
      "To confirm the indicator was still working when it showed the circuit as dead, ruling out a faulty indicator giving a false-safe reading",
      "The user must maintain two hands and one foot, or two feet and one hand, on the ladder at all times",
    ],
    correctAnswer: 1,
    explanation:
      "Reg 643.1 sets the order. Dead tests run first because they verify the conductor and insulation paths the live tests will rely on. Within dead tests there is also internal logic — continuity before IR (continuity proves the CPC; IR uses the CPC as a reference), polarity before live (polarity error before energisation can damage equipment).",
  },
  {
    id: 2,
    question: "If a dead test fails (e.g. an IR result of 0.3 MΩ on a 230 V circuit, against Table 64 minimum 1 MΩ), the next step is:",
    options: [
      "The more precisely you can identify your emotion (e.g., distinguishing \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"frustrated\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\" from \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"disappointed\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\" from \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"overwhelmed\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"), the more effectively you can select the appropriate regulation strategy — because different emotions require different responses",
      "To provide a low-impedance earth reference for the customer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s installation on TN-C-S or TN-S supplies — connected back through the service cable PEN (or PE) to the secondary substation earth.",
      "Investigate, isolate the affected circuit, find the fault (often an issue with a fixed appliance or wiring damage), repair, retest. Do NOT proceed to the next test stage on the failed circuit until the fault is resolved.",
      "It contains gypsum which, when landfilled with biodegradable waste, can produce toxic hydrogen sulphide gas, so it must be segregated and sent to specialist facilities",
    ],
    correctAnswer: 2,
    explanation:
      "A failed dead test is a finding to investigate, not an acceptable result. IR < 1 MΩ on a 230 V LV circuit means there is leakage somewhere — between line and earth, line and neutral, or neutral and earth. Isolate, narrow down (disconnect appliances, then split circuits), identify the fault, repair, retest. Energising a circuit with an IR fault risks shock, damage, and circuit failure during operation.",
  },
  {
    id: 3,
    question: "GS38 leads for test instruments are characterised by:",
    options: [
      "Fail (minimum 1 MΩ for LV) — investigate insulation degradation, moisture ingress, damaged cables or connected equipment that should have been disconnected",
      "An assessment of the structural integrity of internal fixtures, the suitability of anchor points, and the risk of falls from internal platforms or ladders",
      "Supplement the notice — e.g. linking to manufacturer instructions, full RAMS or O&M info — but the printed words should still cover the key safety message",
      "Insulated probes with maximum 4 mm exposed metal tip, finger barriers, fused leads where applicable, double insulation, and certified for the rated voltage of the test (CAT III / CAT IV depending on application).",
    ],
    correctAnswer: 3,
    explanation:
      "HSE Guidance Note GS38 specifies safe test lead requirements — minimal exposed metal (4 mm max), finger barriers preventing slip onto live, fused where appropriate, CAT-rated for the system. Single-pole probes (one finger, one tip) are preferred over dual-pole pinch probes for live work. GS38 compliance is a Reg 14 'suitable precaution' for live testing.",
  },
  {
    id: 4,
    question: "Test instrument verification before testing is specifically:",
    options: [
      "Per HSE GS38 — prove the voltage indicator on a known live source BEFORE the test, confirm absence of voltage on the test point, then prove on a known live source AFTER. Three-step prove-test-prove sequence ensures the indicator was working at the moment of test.",
      "Classification, Labelling and Packaging — the EU Regulation (1272/2008) that sets the format of the SDS, the GHS pictograms (skull, exclamation, flame, corrosion, etc.) and the H-statements (e.g. H314 'causes severe skin burns'). Retained as UK law after Brexit. It's the standard the SDS is written to.",
      "The generator output voltage and frequency (confirming the generator has started and reached stable output), then the ATS control circuit, transfer contactor coils, interlock mechanism and control wiring for faults",
      "Use reference class forecasting (Kahneman) to estimate durations, set specific time-bound goals (Locke &amp; Latham), and create implementation intentions (Gollwitzer) for schedule reviews",
    ],
    correctAnswer: 0,
    explanation:
      "Prove-test-prove is the safety-critical ritual. A voltage indicator can fail (battery flat, lead broken). Proving on a known live source before AND after the test point bracket-confirms the indicator was working when the test point read dead. A 'dead' reading from an unproven indicator is not proof of absence of supply.",
  },
  {
    id: 5,
    question: "Reg 643.2.1 — continuity test instrument specification:",
    options: [
      "Refreezing of thawed tissue causes significantly more damage than the original frostbite, so the hand should be insulated and protected from refreezing at all costs",
      "Output current at least 200 mA at a no-load voltage between 4 V and 24 V — sufficient to detect intermittent contacts and burn through light surface contamination at terminations, but low enough to avoid energising potential faults.",
      "Systematically testing each function of the relay — pickup, dropout, timing, contact configuration — and verifying the complete control sequence operates correctly before applying power to the final load",
      "Working out routing, clearances, fire-stopping, sequencing and access with mechanical, structural and architectural disciplines so that nobody\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s install conflicts with anyone else\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s.",
    ],
    correctAnswer: 1,
    explanation:
      "Reg 643.2.1 — continuity instrument output 200 mA min at 4-24 V no-load. The current is high enough to make a real measurement (vs nuisance high readings from poor contact); the voltage is low enough to avoid risk if a circuit is unexpectedly partially live. Modern multifunction testers comply by default.",
  },
  {
    id: 6,
    question: "If you discover the installation is not actually isolated when you start a dead test, the correct response is:",
    options: [
      "Below the 1.0 MΩ minimum from Table 64 → fail. Investigate: damaged cable insulation, water ingress at a back-box, a wired-up neutral that is touching earth somewhere, a trapped conductor under a pinch screw. Do not energise.",
      "Visually inspect for storage damage, check the coil resistance, verify the contacts are not corroded or contaminated, ensure the operating mechanism moves freely, and confirm the component is within its shelf-life (if applicable)",
      "Stop immediately. Re-isolate at the correct point. Prove dead again. Investigate why the original isolation was incomplete (wrong device locked off, back-fed circuit, alternative supply source, parallel CPC path, induced voltage). Document the near-miss.",
      "Body scanning first (immediate physical awareness) → ABC model (identifying triggering beliefs) → Gibbs' Reflective Cycle (structured reflection on the full incident) → Johari Window (seeking external feedback to identify blind spots)",
    ],
    correctAnswer: 2,
    explanation:
      "Discovery of unexpected live = stop. Re-isolate properly. Investigate — common causes: wrong device locked off, back-fed circuit (UPS, generator, neighbour's supply onto a shared submain), parallel CPC creating a current path, induced voltage from adjacent live circuit. Document as a near-miss for review. Continuing to test on an unexpectedly live system is exactly the EAWR Reg 14 violation that gets people killed.",
  },
  {
    id: 7,
    question: "The Schedule of Test Results (Appendix 6) records, per circuit, the following dead-test entries:",
    options: [
      "Employer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s assessment of the first-aid provision needed — kit, facilities, trained persons. Considers nature of work, hazards, employee numbers, accident history, location, vulnerable persons, distance to medical care. Documented; reviewed periodically and after changes.",
      "GN3 was updated to align with BS 7671:2018+A4:2026 — including the simplified RCD test method (single AC at 1×IΔn under Reg 643.7.3), AFDD recommendations under Reg 421.1.7, and updated Table 41.3 maximum Zs values.",
      "The maximum rated current of the automatic disconnecting device in the functional bonding conductor shall be 3 A for arrays over 50 kW up to 100 kW. The full table of the same regulation specifies 1 A for arrays under 25 kW, 2 A for 25 to 50 kW, 3 A for 50 to 100 kW, 4 A for 100 to 250 kW and 5 A above 250 kW.",
      "Continuity (R1 + R2 OR R2 only depending on method), ring final continuity (r1, rn, r2 — for ring circuits), insulation resistance (per circuit, line-line, line-neutral, line-earth, neutral-earth), polarity confirmation. Each cell with the measured value or pass / fail symbol.",
    ],
    correctAnswer: 3,
    explanation:
      "The Schedule of Test Results columns — continuity (R1+R2 or R2), ring (r1/rn/r2 for rings), IR results across each combination, polarity. Each value recorded; pass / fail visible against the design max / min. This is the audit trail that supports the EIC sign-off.",
  },
  {
    id: 8,
    question: "A4:2026 simplified the RCD test under Reg 643.7.3. The current method is:",
    options: [
      "Single AC test at 1 times IΔn — must operate within 300 ms (or 200 ms for circuits subject to Reg 415.1.1 and certain Part 7 location limits). The half-current 'no-trip' test and 5x 'fast trip' test were deleted as redundant under modern RCD design.",
      "The shortfall must be addressed before the gateway can be opened — your employer and training provider should agree a plan to complete the remaining hours within a realistic timeframe",
      "Prove the voltage indicator works on a known live source (often a proving unit), test the conductors at the work location to confirm dead, then re-prove the indicator on the known live source to confirm it didn\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t fail during the test.",
      "Approximately 1.0-1.5 Nm — typical for cage-clamp / screw terminals on small CSAs in domestic RCBOs (Hager NDN, Schneider Resi9, Wylex NHX). Confirm with the actual manufacturer when accessible.",
    ],
    correctAnswer: 0,
    explanation:
      "A4:2026 Reg 643.7.3 simplified the RCD test. Single AC test at 1 times IΔn (rated residual operating current). Trip time at most 300 ms (general), 200 ms / 40 ms in some specific cases per Reg 415.1.1 and Part 7. The half-current and 5-times tests were removed as redundant under modern manufacturer compliance testing. Single-test result + test button operation = compliance.",
  },
];

const faqs = [
  {
    question: "Why does dead testing matter when we're going to energise it anyway?",
    answer:
      "Dead testing finds defects in the conductor and insulation paths. If a CPC is broken or an IR fault is present, energising will at best trigger an unexpected trip, at worst cause damage or shock. Dead tests catch faults at zero energy — repair is straightforward. Faults found live can be dangerous to investigate. The sequence isn't bureaucratic: it's a protective filter.",
  },
  {
    question: "Can I skip dead tests if the install is brand new and the contractor verified it?",
    answer:
      "No. The contractor's verification is part of the EIC chain. Your inspection-and-testing signature on the EIC is your independent professional declaration that the install meets the standard at certification. You verify by re-doing the tests, not by trusting another inspector's word. The EIC has a separate inspection-and-testing block precisely so the verification is independent.",
  },
  {
    question: "What if the customer wants to be present during testing?",
    answer:
      "Fine — explain the safety boundaries. They observe from outside the working area. They don't touch tools, instruments, or the install. Brief them on what each test is doing and why. A customer who understands the process is more likely to value the verification (and pay for it). A customer who wanders into the work area is a hazard — politely manage the space.",
  },
  {
    question: "Do I need to write down every measurement or can I sample?",
    answer:
      "Initial verification — every circuit, every test, recorded on the Schedule of Test Results. The schedule has a row per circuit and columns per test for a reason. EICR — sampling is permitted under the agreed scope, but the sample must be representative and the limitation documented on the front sheet. Either way, the recorded values must support the conclusions on the EIC / EICR.",
  },
  {
    question: "What is the difference between R1+R2 and R2-only continuity testing?",
    answer:
      "R1+R2 — measures line plus CPC loop continuity end-to-end; common method, results compare against expected (cable resistance per metre × length × 2). R2-only — measures the CPC alone, typically with a wander lead from the MET; useful where R1 is not accessible or where you want to isolate the CPC test. Both methods record the result on the schedule. Different scenarios suit different methods; both are valid.",
  },
  {
    question: "What do I do if I have to interrupt a test sequence (lunch, fault investigation, etc)?",
    answer:
      "Re-prove isolation when you return. Proven dead at 12:00 doesn't mean dead at 13:00 — the install state could have changed (someone reset a breaker, a generator started, a UPS engaged). Treat every restart as a fresh isolation: identify, lock, prove dead. The cost of this discipline is two minutes; the cost of skipping it is potentially fatal.",
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
            onClick={() => navigate('/study-centre/apprentice/level3-module5-section3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 5 · Section 3 · Subsection 1"
            title="The dead-test sequence (Reg 643)"
            description="Order, dependencies, instruments, and the discipline of safe isolation. Each test a gate for the next — continuity, IR, polarity, electrode — before any live test is contemplated."
            tone="emerald"
          />

          <TLDR
            points={[
              "Reg 643.1 — dead tests first, in the order continuity → IR → polarity → electrode resistance, then live tests. Each step a precondition for the next.",
              "Safe isolation per the prove-test-prove ritual — voltage indicator proven on a known live source BEFORE and AFTER the test point.",
              "Reg 643.2.1 — continuity instruments output 200 mA min at 4-24 V no-load. IR per Table 64 voltages. Calibrated, traceable.",
              "A failed dead test is a finding to investigate — repair before proceeding to the next stage on that circuit.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "State the Reg 643.1 mandatory test sequence and the rationale for each step's order.",
              "Apply the prove-test-prove safe isolation procedure with GS38-compliant test leads and voltage indicators.",
              "Specify the instrument requirements for each dead test (continuity, IR, polarity, electrode).",
              "Record dead test results correctly on the Schedule of Test Results (Appendix 6).",
              "Investigate and respond to a failed dead test — isolate, find, repair, retest before proceeding.",
              "Recognise the dependency between dead tests and the live tests that follow.",
              "Document near-miss isolation incidents and adjust procedures accordingly.",
            ]}
            initialVisibleCount={4}
          />

          <ContentEyebrow>Why the order matters</ContentEyebrow>

          <ConceptBlock
            title="Each test depends on the previous step passing"
            plainEnglish="The Reg 643 sequence isn't arbitrary. Each test verifies a specific aspect of the installation, and each later test relies on the earlier ones being clean. Continuity proves the CPC path. IR proves no insulation faults. Polarity proves correct connection. Electrode proves the earthing means. Only then can you energise safely for Ze, PFC, Zs, RCD, AFDD."
            onSite="If you find yourself wanting to do a Zs reading before continuity is verified, stop. The Zs result depends on the CPC being intact — a Zs measurement on a circuit with a broken CPC will read either 'open circuit' (which you might mistake for a faulty test) or be misleading if there's a parallel earth path. Sequence first."
          >
            <p>The dead-test sequence and what each step proves:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Step 1 — Continuity of protective conductors (Reg 643.2).</strong>
                Verifies the CPC is electrically continuous from the MET to every accessory and
                exposed-conductive-part. Methods: R1+R2 (line + CPC end-to-end), or R2 only
                (CPC alone via wander lead). Result compared to expected resistance based on
                cable size, route, and length.
              </li>
              <li>
                <strong>Step 2 — Continuity of ring final circuits (Reg 643.2.2).</strong>
                Verifies a ring circuit is actually a ring (not a damaged ring or two radials).
                Method: end-to-end r1 (line), rn (neutral), r2 (CPC), then cross-checks at every
                outlet. Confirms the ring is continuous and current-sharing.
              </li>
              <li>
                <strong>Step 3 — Insulation resistance (Reg 643.3).</strong> Verifies insulation
                between conductors and between conductors and earth. Test voltage per Table 64
                (500 V DC for LV up to 500 V circuits, expecting at least 1 MΩ). Catches damaged
                insulation, conductors with screw cuts, faulty fixed appliances.
              </li>
              <li>
                <strong>Step 4 — Polarity (Reg 643.6).</strong> Verifies single-pole devices are
                in the line conductor only (Reg 132.14), and that line / neutral / CPC are
                correctly connected at every accessory. Bad polarity = the metal case of an
                appliance can become live when the apparent 'off' switch is operated.
              </li>
              <li>
                <strong>Step 5 — Earth electrode resistance (Reg 643.7).</strong> For TT
                installations or any installation with an earth electrode. Verifies the
                electrode is making good contact with the soil mass — critical for ADS
                disconnection on TT.
              </li>
            </ul>
            <p>
              Then — and only then — live tests follow: Ze, PFC, Zs per circuit, RCD operation,
              AFDD operation, functional. Live testing is covered in Section 4 of this module.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 643.1 (Sequence of tests) and Regulation 643.7.2 (closing paragraph)"
            clause={`Regulation 643.1: The tests of Regulations 643.2 to 643.6, where relevant, shall be carried out in that order before the installation is energised. Regulation 643.7 onwards covers tests that by their nature require the supply to be connected. Per Regulation 643.7.2 (closing paragraph): if any test indicates a failure to comply, that test and any preceding test, the results of which may have been influenced by the fault indicated, shall be repeated after the fault has been rectified.`}
            meaning={
              <>
                The mandatory dead-then-live sequence. Reg 643.2 to 643.6 are the dead tests
                (continuity, ring final live conductor continuity, IR, polarity, electrode
                resistance for TT). Reg 643.7 onwards covers the live tests (Ze, PFC, Zs, RCD,
                AFDD operational confirmation, functional). Visual inspection (Reg 642) precedes
                everything. Do not deviate from the sequence — the dependency is built in.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 6, Chapter 64, Regulations 643.1 and 643.7.2."
          />

          <SectionRule />

          <ContentEyebrow>Safe isolation — the foundation of dead testing</ContentEyebrow>

          <ConceptBlock
            title="Prove-test-prove with GS38 leads"
            plainEnglish="Every dead test starts with safe isolation, and safe isolation ends with proving the voltage indicator on a known live source — both before and after the test point. Skip the after-prove and you have no evidence the indicator was working when it told you the test point was dead."
            onSite="Carry a proving unit on every job. Even a 9 V battery test is better than nothing — but a dedicated proving unit gives you a known live source independent of any installation. Prove the indicator, test the point, prove the indicator again. Three steps, every time."
          >
            <p>The full safe isolation procedure for a dead test:</p>
            <ul className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Identify.</strong> Confirm the circuit / installation to be isolated.
                Check drawings, labels, follow cables. Multiple supplies (PV, generator, UPS,
                back-feed) are common gotchas — check for all sources.
              </li>
              <li>
                <strong>Switch off.</strong> At the originating device — main switch for whole
                installation, MCB / RCBO for individual circuit. Confirm operation.
              </li>
              <li>
                <strong>Lock off and post warning.</strong> Apply a lock-out / tag-out device
                to prevent unauthorised re-energisation. Post a "WORK IN PROGRESS — DO NOT
                ENERGISE" notice with your name, date, contact.
              </li>
              <li>
                <strong>Prove voltage indicator on known live source.</strong> Use a proving
                unit or another known live source. All probes / phases. Confirms the indicator
                is working.
              </li>
              <li>
                <strong>Test the isolated point.</strong> Confirm absence of voltage between
                every combination — L-N, L-E, N-E, and L-L for three-phase. The point should
                read zero / no-supply on a properly isolated circuit.
              </li>
              <li>
                <strong>Prove voltage indicator again.</strong> Same proving unit, same probes.
                Confirms the indicator was still working when it said the test point was dead.
                If the indicator now fails, the previous "dead" reading was unreliable —
                re-test with a different indicator before proceeding.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="HSE Guidance Note GS38 (Test Equipment for use by Electricians)"
            clause="Test leads should incorporate fused leads where appropriate, finger barriers, insulated probes with no more than 4 mm of exposed metal at the tip, and double insulation throughout. The voltage indicator should be proved before AND after the test on a known live source to confirm correct operation."
            meaning={
              <>
                GS38 is the recognised standard for safe test equipment use. Test leads with
                excessive exposed metal, no finger barriers, or no fuses risk arc flash and
                shock during live testing. Prove-test-prove with the indicator confirms the
                indicator was operational at the moment of the test. Both apply during dead
                testing because safe isolation depends on the prove ritual being trustworthy.
              </>
            }
            cite="Source: HSE Guidance Note GS38 (Test Equipment for use by Electricians, latest revision)."
          />

          <VideoCard
            url={videos.safeIsolation.url}
            title={videos.safeIsolation.title}
            channel={videos.safeIsolation.channel}
            duration={videos.safeIsolation.duration}
            topic={videos.safeIsolation.topic}
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Instrument requirements per test</ContentEyebrow>

          <ConceptBlock
            title="The right tool for each test — calibrated, in date, fit for purpose"
            plainEnglish="Each dead test specifies the instrument capability. Continuity needs current to detect intermittent contacts. IR needs the right test voltage to stress insulation realistically. Polarity needs a reliable reference. Calibration certificates back the readings — uncalibrated readings are not verification."
          >
            <p>Instrument requirements summary:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Continuity (R1+R2, R2, ring) — Reg 643.2.1.</strong> Output current at
                least 200 mA at no-load voltage 4-24 V. Modern multifunction testers (MFT)
                comply by default. Auto-zero for lead resistance. Resolution to 0.01 Ω.
              </li>
              <li>
                <strong>Insulation resistance — Reg 643.3 / Table 64.</strong> Test voltage
                500 V DC for circuits up to 500 V (most LV); 250 V DC for SELV/PELV; 1000 V DC
                for circuits above 500 V. Minimum acceptable IR per Table 64 — 1 MΩ for 500 V
                test, 0.5 MΩ for 250 V SELV.
              </li>
              <li>
                <strong>Polarity — Reg 643.6.</strong> Continuity test or visual indication via
                MFT. Some MFTs include a polarity indicator under continuity test. For dead
                testing, polarity is verified by checking that line goes through any single-pole
                switch / device (R = low when switch closed, high/open when switch open).
              </li>
              <li>
                <strong>Earth electrode resistance — Reg 643.7.</strong> Three-terminal stake
                method (most accurate, requires test stakes), OR loop impedance method using
                the supply for a non-RCD-protected system, OR clamp method (induced current,
                requires no disconnection). Each has its scope and limitations — see Sub 3.6.
              </li>
              <li>
                <strong>RCD test — Reg 643.7.3 (live).</strong> A4:2026 simplified — single AC
                test at 1 times IΔn, trip time at most 300 ms general. Higher-end testers offer
                Type A / B / F mode for verifying RCD type compatibility.
              </li>
            </ul>
            <p>
              Calibration: every instrument used for verification testing should be calibrated
              annually (or per the manufacturer's recommendation), traceable to a national
              standard. The calibration certificate accompanies the instrument; the test record
              should reference the instrument used and its calibration status.
            </p>
          </ConceptBlock>

          <div className="my-4">
            <ContentEyebrow>Try the calculator</ContentEyebrow>
            <OhmsCalculator />
          </div>

          <CommonMistake
            title="Reading 'continuity OK' from a meter that wasn't calibrated"
            whatHappens={
              <>
                Inspector uses an old multimeter that's been knocked around. Continuity reading
                is 0.5 Ω — looks fine, ticks the schedule. The meter is actually drifted —
                actual reading is closer to 2 Ω, which would have been a finding for that
                circuit length. Fault sits in the schedule undetected. EAWR-relevant defect
                attributed to the verification work.
              </>
            }
            doInstead={
              <>
                Use only calibrated instruments for verification testing. Check calibration
                date before the job. Record the instrument serial number and calibration
                expiry on the test record (most MFTs let you store this and print it on the
                results). Annual calibration is industry standard; some instruments need
                shorter intervals based on use.
              </>
            }
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <Scenario
            title="The 'isolated' circuit that wasn't"
            situation={
              <>
                You arrive on a small commercial unit to do an EICR. Drawings show a single
                supply from the local DB. You isolate the DB main switch, lock it off, post
                a warning. Prove your indicator on a proving unit. Test at the DB outgoing
                terminals — reads 230 V phase to neutral. The DB is showing live. The drawings
                are wrong: there's a back-feed from a UPS in the server room, fed via a circuit
                you don't have visibility on. Your isolation has not isolated the DB.
              </>
            }
            whatToDo={
              <>
                Stop. Do not proceed with any test. Investigate the source of the live —
                trace the cable, find the UPS, isolate at the UPS as well as the DB. Re-prove
                the indicator on a known live source. Re-test the DB. Confirm now dead. Update
                the drawings and the EICR's Section D limitations. Document the near-miss.
                Brief the client. Going forward: identify ALL supply sources during the initial
                visual stage — drawings can lie, especially in retrofitted systems with UPS,
                generators, PV, EVSE feeding back.
              </>
            }
            whyItMatters={
              <>
                Reg 14 EAWR is satisfied only when the install is verifiably dead before the
                test starts. Discovering an unexpected live during isolation is the system
                catching a near-miss — the prove-test-prove ritual did its job. Continuing to
                test on partly-energised systems is the route to electrocution. A near-miss is
                a finding to learn from; an actual contact is a tragedy to investigate.
              </>
            }
          />

          <ConceptBlock
            title="The dead-test sequence — why the order matters"
            plainEnglish="Continuity first because a broken protective conductor falsifies every later test. Insulation resistance second because a live conductor with degraded insulation fails the test before the energiser current goes near anything connected. Polarity third because reversed polarity will still pass continuity and IR but will deliver a hot neutral. Earth electrode fourth (where applicable) because the electrode resistance can only be measured against a known-good installation earthing system. Each step is a precondition for the next."
            onSite="Run the steps in the regulation order even when the install &apos;feels obvious&apos;. Fast-and-loose dead testing is one of the leading causes of EICR reissue — the inspector who reads your sheet later spots that you didn&apos;t test in sequence and rejects the certificate."
          >
            <p>The full BS 7671 dead-test order:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Continuity of protective conductors and main / supplementary bonding (R1+R2 or R2 method).</li>
              <li>Continuity of ring final circuits (three-part method — end-to-end on each conductor, then cross-connect).</li>
              <li>Insulation resistance — between every live conductor pair and live conductors to earth.</li>
              <li>Polarity — confirms line and neutral are not reversed at every termination.</li>
              <li>Earth electrode resistance (TT systems and supplementary electrodes).</li>
              <li>Protective conductor impedance / function checks for the bonding network.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Live tests — earth fault loop impedance and RCD verification"
            plainEnglish="Once dead tests are clean, the installation is energised and live tests follow. Earth fault loop impedance (Zs) measures the actual loop the protective device sees from the test point back to the supply transformer through the earth path. RCD operation verifies the residual-current devices trip within their rated time and current. Voltage and frequency checks confirm the supply is within tolerance. Phase rotation checks (three-phase only) confirm the rotation matches the design intent."
            onSite="Live tests have a different risk profile — the kit is energised. Use a multifunction tester rated for the prospective fault current. Stand to the side, never directly in front of the consumer unit when running a Zs test. Brief the customer before the RCD trip — kettle / clocks / fridge briefly off — so the RCD trip isn&apos;t a surprise."
          >
            <p>Live test sequence:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Earth fault loop impedance Ze at the origin.</li>
              <li>Prospective fault current PFC at the origin (often read on the same instrument as Ze).</li>
              <li>Earth fault loop impedance Zs at every relevant test point downstream — circuit ends, last sockets, isolators.</li>
              <li>RCD operation — single AC test at 1×IΔn per Reg 643.3 (the multi-current sequence is deleted in A4:2026).</li>
              <li>Functional checks of switchgear, controls, interlocks, AFDDs and SPDs.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="When a test fails mid-sequence — stop, isolate, investigate"
            plainEnglish="A failed test is information, not a setback. The discipline is the same every time — stop the sequence, isolate the circuit cleanly, investigate the cause, repair, then re-run the failed test and every test that depended on it. Pushing on past a failed test produces an EIC that is provably wrong; an inspector reading the report later will spot the inconsistency and reject the certificate."
            onSite="Common mid-sequence failures and the recovery: a high R1+R2 reading sends you back to the conductor terminations; a low IR reading sends you to the connected appliances or the cable insulation; a polarity reversal sends you to the consumer unit terminations or a JB swap. Document the failure, the investigation, the corrective action, and the re-test reading. Inspectors and customers value transparency about the diagnosis far more than they value an EIC that hides the original failure."
          >
            <p>
              Recovery patterns by failed test:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>High R1+R2</strong> — terminate or re-terminate at the
                offending point, retest. Common cause: loose terminal, conductor
                strand cut on installation, dirt or oxidation on a tunnel connector.
              </li>
              <li>
                <strong>Low IR L-E or N-E</strong> — disconnect connected appliances
                one at a time, retest after each. Common cause: filter capacitors in
                white goods, water in a JB, damaged cable at a roof or floor
                penetration.
              </li>
              <li>
                <strong>Polarity reversal at an accessory</strong> — confirm
                consumer-unit termination, follow the cable to the failed point.
                Common cause: cross-over at a JB or a back-box swap.
              </li>
              <li>
                <strong>High Ze on TT</strong> — investigate the electrode and the
                bonding to the MET; common cause is a corroded earth conductor at
                the rod head.
              </li>
              <li>
                <strong>Failed RCD trip</strong> — confirm the device type and
                rating, replace the device if internal fault suspected, retest. A
                stuck RCD is a safety-critical defect.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Sample-based testing on a periodic — what to test 100 percent and what to sample"
            plainEnglish="Initial verification on a new install is 100 percent — every circuit, every accessory, every test. A periodic inspection (EICR) on an existing installation is sample-based — typically 10-20 percent of accessories, plus 100 percent on special locations and high-risk circuits. The L3 inspector chooses the sample and documents the rationale; the inspector signing the EICR carries the responsibility for the chosen sample size."
            onSite="GN3 gives the sample-size guidance and the BS 7671 643.1.1 framework backs it. The sample size on the EICR has to be defensible — too small and a defect can be missed; too large and the customer is paying for over-testing. Special locations (Section 700 series — bathrooms, kitchens, outdoor, EV charge points), recently modified circuits, and any circuit with reported fault history go to 100 percent. Standard final circuits in good condition can be sampled."
          >
            <p>
              Quick sample-size reference for periodic testing:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Special locations (Section 700)</strong> — 100 percent
                inspect-and-test. Bathroom, kitchen, outdoor, swimming pool plant,
                agricultural premises, caravan parks, marinas, EV charging.
              </li>
              <li>
                <strong>Recently modified circuits</strong> — 100 percent inspect
                anything affected by the modification.
              </li>
              <li>
                <strong>Standard final circuits, good condition</strong> — typically
                10-20 percent of accessories per circuit, every CPC verified
                end-to-end, every RCD tested, furthest-point Zs.
              </li>
              <li>
                <strong>Circuits with reported fault history</strong> — 100 percent.
              </li>
              <li>
                <strong>Document the sample on the EICR</strong> — explicit sample
                size and rationale. Solicitors, mortgage lenders and the next
                inspector all read this.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Test results into the EIC — every reading has a column"
            plainEnglish="The Electrical Installation Certificate is the formal output of the test sequence. Every reading you took has a column on the EIC schedule — R1+R2 per circuit, IR per circuit (L-N, L-E, N-E), polarity tick, Ze at origin, Zs at furthest point, RCD trip time, plus the visual inspection check sheet. Missing entries on the EIC make it incomplete; the contractor signing the certificate is professionally exposed if a missing entry conceals a defect later."
            onSite="Capture readings on a tablet with a digital test instrument that pushes results straight to the EIC, or on a paper schedule that is transcribed afterwards. Either way, the discipline is per-circuit, per-test, per-reading — no shortcuts. Modern multifunction testers (Megger MFT1741+, Fluke 1664FC, Metrel MI 3155) automate the sequence and produce a digital test record that imports directly into the certificate software (NICEIC Online, Easycert, ElectricalCertificate.co.uk and similar). Even with software the contractor reviews the record before signing."
          >
            <p>
              EIC schedule of test results — what each column needs:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Circuit reference</strong> — matches the schedule of
                inspections and the consumer-unit labelling.
              </li>
              <li>
                <strong>Continuity (R1+R2)</strong> — measured ohms; for ring finals
                add the three readings (end-to-end on each conductor and the
                cross-connected reading).
              </li>
              <li>
                <strong>Insulation resistance</strong> — three readings for
                single-phase (L-N, L-E, N-E) or up to ten for three-phase. Test
                voltage used in the column heading.
              </li>
              <li>
                <strong>Polarity</strong> — pass / fail per circuit, with any
                accessory-specific notes.
              </li>
              <li>
                <strong>Ze at origin and Zs at furthest point</strong> — measured
                ohms; comparison against Table 41.3 maximum.
              </li>
              <li>
                <strong>RCD trip time at 1xIΔn</strong> — measured ms (under 300 ms
                for general circuits, under 40 ms at 5xIΔn historically — A4:2026
                deletes the 5x test).
              </li>
              <li>
                <strong>Visual inspection schedule</strong> — every Reg-derived
                check ticked, observations noted.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 643.3 (single AC RCD test at 1×IΔn)"
            clause={
              <>
                Regulation 643.3 has been redrafted. The requirements for RCD testing have
                been changed and Table 3A (Time/current performance criteria for RCDs) in
                Appendix 3 has been deleted. Regardless of RCD Type, an alternating current
                test at rated residual operating current (IΔn) is used to verify the
                effectiveness.
              </>
            }
            meaning={
              <>
                The old multi-current RCD sequence (½×, 1×, 1×IΔn) has been deleted. A single
                AC test at 1×IΔn is the new verification method for every RCD type. Test
                schedules, EIC pro-formas and toolbox-talk crib sheets need updating to match.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 643.3."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Reg 643.1 — dead tests first, in the order continuity → IR → polarity → electrode, before any live test. Each step a precondition for the next.",
              "Safe isolation = identify → switch off → lock off → prove indicator → test point → prove indicator again. Skip prove-after and the result is not verifiable.",
              "GS38-compliant test leads — 4 mm max exposed tip, finger barriers, fused where applicable, CAT-rated for the system.",
              "Reg 643.2.1 — continuity instruments must output 200 mA min at 4-24 V no-load. IR per Table 64 voltages (500 V DC → 1 MΩ for LV; 250 V → 0.5 MΩ for SELV).",
              "All test instruments calibrated, in date, traceable to a national standard. Calibration record accompanies the test results.",
              "A failed dead test is a finding — investigate, isolate, repair, retest. Do NOT proceed to the next stage on the failed circuit.",
              "Multiple supply sources (UPS, generator, PV, EVSE back-feed) are common isolation gotchas. Identify all sources during the visual stage.",
              "A4:2026 Reg 643.7.3 simplified the RCD test — single AC test at 1 times IΔn, trip time at most 300 ms general. Half-current and 5x tests removed.",
            ]}
          />

          <Quiz title="Dead-test sequence — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section2-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                2.5 Special locations
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section3-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.2 Continuity — R1+R2 and R2
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
