import { ArrowLeft, ChevronLeft, ChevronRight, Activity } from 'lucide-react';
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
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'mod7-s4-functional-vs-trip',
    question:
      'A functional test under Reg 643.10 and an RCD trip test under Reg 643.8 are commonly confused. What is the load-bearing distinction?',
    options: [
      'They are the same test, performed twice for redundancy on each device',
      'The trip test (643.8) measures performance to a number; the functional test (643.10) verifies it operates as installed — both required',
      'The functional test only applies to RCDs, while the trip test only applies to MCBs',
      'The functional test is purely a visual check of the device rating and label',
    ],
    correctIndex: 1,
    explanation:
      'Reg 643.8 demands a numeric trip-current / disconnection-time measurement on RCDs. Reg 643.10 is broader: it asks whether the device works correctly in its installed context — manual switching, the integral test button, mechanical interlocks, indication, and integration with adjacent gear. A device can pass 643.8 and fail 643.10, and vice versa.',
  },
  {
    id: 'mod7-s4-afdd-a4',
    question:
      'A4:2026 introduced AFDDs into the functional-testing landscape. What does the amendment actually require for an AFDD on the functional-test stage?',
    options: [
      'Nothing — AFDDs are exempt from functional testing under Reg 643.10',
      'Verify the manual test facility per the manufacturer, record on the inspection schedule, and check the status indication is healthy',
      'AFDDs are tested only by a live arc-fault simulation method, never via the test button',
      'AFDDs need only pass continuity and insulation resistance, not the 643.10 functional test',
    ],
    correctIndex: 1,
    explanation:
      'A4:2026 brought AFDDs explicitly into Reg 532.6 and Section 421 for arc-fault detection. The functional test under 643.10 is the integral test button (and any manufacturer-specified routine) plus a check that the indication / status LED confirms a healthy armed state. The test is recorded on the inspection schedule, not the schedule of test results.',
  },
  {
    id: 'mod7-s4-order',
    question:
      'You are mid-way through commissioning. Continuity, IR and polarity (dead) are complete and clean. What is the correct next step in the Part 6 sequence before 643.10 functional testing?',
    options: [
      'Energise straight to 643.10 — functional testing is the next step regardless of the device tests',
      'Complete Ze, Zs and the RCD trip-time tests (643.8) first; 643.10 functional testing sits after the numeric verification',
      'Skip functional testing entirely if the insulation resistance result came back clean',
      'Functional testing comes before continuity at the very start of the OSG sequence',
    ],
    correctIndex: 1,
    explanation:
      'Reg 643 lists tests in a specific order: continuity, IR, polarity (dead), Ze, RCD operation, polarity (live), Zs, then functional testing. Functional testing trusts that the device under test has already been numerically verified — running 643.10 first means you might be functionally exercising a device that has not been proven to trip at the right current.',
  },
  {
    id: 'mod7-s4-recording',
    question: 'Where do functional-test results live in the A4:2026 documentation, and why?',
    options: [
      'In the polarity column on the Schedule of Test Results, alongside the circuit polarity tick',
      'On the Schedule of Inspections, because it is a yes/no verification, not a numeric measurement',
      'In the comments column only, since there is no formal location for functional results',
      'On the certificate front page, as a declaration that functional testing was carried out',
    ],
    correctIndex: 1,
    explanation:
      'Functional tests are verifications, not measurements. They belong on the Schedule of Inspections, against the equipment item being verified. The Schedule of Test Results is the home of the numeric measurements (continuity, IR, Zs, RCD trip times). A4:2026 keeps this split — and AFDD test-button verification follows the same rule: inspection schedule entry, not a number on the test schedule.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Reg 643.10 — Functional testing — uses one specific verb for the duty. What does the regulation actually require, and to what equipment does it apply?',
    options: [
      'Equipment shall be subjected to functional testing, as appropriate, to verify that it is properly mounted, adjusted and installed and operates correctly in accordance with the relevant requirements of BS 7671',
      'Equipment shall be tested electrically using an RCD tester applied at the rated residual operating current',
      'Only RCDs shall be functionally tested; switchgear and controlgear are exempt from this regulation',
      'Functional testing is recommended as good practice but is not a requirement for switchgear',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 643.10 verbatim: "Equipment shall be subjected to functional testing, as appropriate, to verify that it is properly mounted, adjusted and installed and operates correctly in accordance with the relevant requirements of BS 7671." Examples named: switchgear and controlgear assemblies, drives, controls and interlocks; emergency switching/stopping systems; insulation monitoring. The list is non-exhaustive.',
  },
  {
    id: 2,
    question:
      'A4:2026 added a specific note to Reg 643.10 covering AFDDs. What does the new requirement state?',
    options: [
      'AFDDs are exempt from functional testing once they pass their factory type test',
      'AFDDs shall be tested using an RCD tester applied at the rated residual operating current',
      "Where an AFDD is installed the effectiveness of any manually operated test facility shall be verified in accordance with the manufacturers' recommendations",
      'AFDDs shall be replaced every 5 years irrespective of the test-facility result',
    ],
    correctAnswer: 2,
    explanation:
      'The A4:2026 amendment added: "Where an AFDD is installed the effectiveness of any manually operated test facility shall be verified in accordance with the manufacturers\' recommendations." This is a real A4 change — in earlier editions AFDDs were not specifically called out under 643.10. Manufacturer-specified procedure is the operating standard, not a generic test method.',
  },
  {
    id: 3,
    question:
      'What is the conceptual difference between a "functional test" of an MCB and a "trip test" of an RCD?',
    options: [
      'They are the same thing, since both confirm the device disconnects the circuit on demand',
      'Functional = does the handle operate (on/off, contacts make/break); trip = injects current to verify threshold and time',
      'A functional test uses a multimeter, whereas a trip test uses an oscilloscope to capture the waveform',
      'A functional test is only for new work, while a trip test is only for periodic inspection',
    ],
    correctAnswer: 1,
    explanation:
      'A functional test is a yes/no on operation: does the device do what its handle says? A trip test characterises performance against an injected fault. An MCB whose contacts have welded slightly may still close and open the handle but fail to interrupt a fault — the functional test alone does not catch this. That is why Reg 643.10 functional testing is in addition to, not instead of, the protective-device trip tests under Reg 643.7 and 643.8.',
  },
  {
    id: 4,
    question:
      'Reg 643.10 lists examples of equipment to be functionally tested. Which of these is NOT in the example list given by the regulation?',
    options: [
      'Switchgear and controlgear assemblies, drives, controls and interlocks',
      'Systems for emergency switching off and emergency stopping',
      'Insulation monitoring',
      'RCD trip-time measurement',
    ],
    correctAnswer: 3,
    explanation:
      'RCD trip-time measurement is governed by Reg 643.7.3 (effectiveness of automatic disconnection) — a measured test, not a functional test. The 643.10 examples are switchgear/controlgear assemblies, drives, controls and interlocks; emergency switching/stopping systems; insulation monitoring. The note adds the RCD integral test facility and the AFDD manual test button. Note 1 in 643.10 says "this list is not exhaustive".',
  },
  {
    id: 5,
    question:
      'A four-pole isolator is to be functionally tested. The mechanical test is performed with the upstream supply locked off. What does this prove, and what does it NOT prove?',
    options: [
      'It proves the isolator works correctly under all loading and fault conditions',
      'Handle and linkages operate mechanically, but NOT that the contacts break electrically — that needs continuity or live verification',
      'It proves the isolator can break the prospective fault current at its terminals',
      'It is not a valid test, because functional testing must always be carried out live',
    ],
    correctAnswer: 1,
    explanation:
      'The mechanical-only test (lock-off, operate the handle, observe linkage) is the safest first step but is not the whole functional test. Confirm electrical operation by either (a) continuity test across each pole with the isolator open and supply isolated, or (b) live verification: prove dead at the load side with the isolator open, then prove live at the load side with the isolator closed. Both checks together = full functional verification of the isolator.',
  },
  {
    id: 6,
    question:
      "An RCD's integral test button is pressed and the device trips. What does this confirm — and what limitations does GN3 explicitly state about this check?",
    options: [
      "It confirms the RCD will operate at IΔn within the regulation's stated disconnection time",
      'It confirms the earth electrode resistance is within the acceptable limit for the system',
      'It confirms the parts can operate, but NOT CPC/electrode/earthing continuity or sensitivity — a measured trip test is still required',
      'It is required only on periodic inspection, not on the initial verification of new work',
    ],
    correctAnswer: 2,
    explanation:
      'GN3 Section 2.6.18 is explicit: pressing the integral test button is a basic confirmation that mechanical and electrical parts work. It does not confirm earth-electrode continuity, CPC continuity, earthing-system integrity, or trip sensitivity. The device test button works only when the RCD is energised and is not a substitute for a measured trip test under Reg 643.7.3.',
  },
  {
    id: 7,
    question:
      'The correct order of operations for functional testing of a piece of switchgear (e.g. a 4-pole isolator) is:',
    options: [
      'Lock off → mechanical-only test (operate the handle, observe contacts) → energise → live verification (prove dead/live across the contacts)',
      'Energise → live test → mechanical test → lock off',
      'Energise → mechanical test → continuity test → lock off',
      'There is no specified order — perform the steps in whichever sequence is convenient',
    ],
    correctAnswer: 0,
    explanation:
      'The defensible order is: lock off → mechanical-only test (cheap, safe, catches gross mechanical failures before any energy is applied) → energise → live verification (using approved voltage tester to confirm the contacts actually break and make the circuit). This order minimises live exposure and means a mechanical fault is found before energy is applied.',
  },
  {
    id: 8,
    question:
      'You are functionally testing an emergency stop button on a CNC machine. What does Reg 643.10 require you to verify, and what does Reg 465.4 add?',
    options: [
      'Only that the button physically clicks and latches when pressed by the operator',
      'A single deliberate operation removes supply immediately, introduces no further danger, and does not impair protective devices',
      'That the button is coloured red on a yellow background and is correctly positioned',
      "That emergency-stop testing is the manufacturer's responsibility, not the installer's, at commissioning",
    ],
    correctAnswer: 1,
    explanation:
      '643.10 requires the emergency switching system to be functionally tested. The acceptance criteria from Reg 465 layer on top: a single deliberate operation removes supply immediately at the relevant equipment, the remotely released device does not auto re-energise, and operation does not introduce further danger or impair protective devices. Test by pressing the e-stop and confirming all of those — not just the click.',
  },
  {
    id: 9,
    question:
      'What does Reg 643.10 require with respect to interlocks (e.g. between a main switch and a sub-board, or between two parallel sources)?',
    options: [
      'Interlocks fall outside the scope of Reg 643.10 and need no functional test at all',
      'Interlocks are verified by visual inspection of the mechanism alone, with no operation',
      'Interlocks need be tested only on the original commissioning date and never again afterwards',
      'They shall be tested; a paralleling interlock must prevent simultaneous closure — any residual possibility is non-acceptance',
    ],
    correctAnswer: 3,
    explanation:
      'Reg 643.10 explicitly names "switchgear and controlgear assemblies, drives, controls and interlocks" as examples. The interlock acceptance criterion: an interlock intended to avoid paralleling shall demonstrably prevent closing of both source-isolating devices. Any residual possibility of simultaneous closing results in non-acceptance until remedial action is taken. Functional test = try to defeat it under controlled conditions and confirm it holds.',
  },
  {
    id: 10,
    question:
      'Note 2 to Reg 643.10 states something specific about how the functional test in 643.10 relates to standards-based functional tests. What does Note 2 say?',
    options: [
      'This functional test does not replace the functional test indicated by the relevant standards',
      'The 643.10 functional test replaces all manufacturer functional tests for the equipment',
      'The 643.10 functional test is required only on equipment manufactured to BS 7671',
      'Functional tests required by product standards are advisory once the 643.10 test passes',
    ],
    correctAnswer: 0,
    explanation:
      'Note 2 to Reg 643.10 states verbatim: "This functional test does not replace the functional test indicated by the relevant standards." The installer\'s 643.10 check (does it work in the installation context?) sits alongside, not in place of, the product-standard functional test the manufacturer has already carried out (does it work to its specification?).',
  },
];

const InspectionTestingModule7Section4 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Functional testing of switchgear (Reg 643.10) | I&T Module 7.4 | Elec-Mate',
    description:
      'Reg 643.10 + A4:2026 AFDD addition: switchgear, controlgear, interlocks and protective-device functional verification. Mechanical-only first, then live verification, manufacturer-specified procedures.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 7
          </button>

          <PageHero
            eyebrow="Module 7 · Section 4"
            title="Functional testing of switchgear"
            description="Reg 643.10 — does the kit actually work in the installation, not just in the catalogue? Mechanical-only first, then live verification. AFDD manual test button now an A4:2026 explicit duty."
            tone="yellow"
          />

          <TLDR
            points={[
              "Reg 643.10 obliges you to functionally test equipment to verify it is properly mounted, adjusted and installed and operates correctly. Switchgear, controlgear, drives, controls, interlocks, emergency systems, insulation monitoring — the regulation's named examples (and the list is non-exhaustive).",
              "A4:2026 added an explicit AFDD requirement to 643.10: where an AFDD is installed, the effectiveness of any manually operated test facility shall be verified in accordance with the manufacturers' recommendations. Real A4 change.",
              'A functional test ≠ a trip test. Functional = does the handle / button / interlock do what it should? Trip = does the device break the circuit at its specified threshold? An MCB with stuck contacts may pass functional and fail trip. Both required, separately.',
              'Order of operations: lock off → mechanical-only test → energise → live verification. This minimises live exposure and finds gross mechanical failures before any energy is applied.',
              'Note 2 to 643.10: "This functional test does not replace the functional test indicated by the relevant standards." The installer\'s context check sits alongside the product-standard functional test the manufacturer already did — it does not subsume it.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Quote Reg 643.10 verbatim, name the four example equipment categories, and explain the "as appropriate" qualifier',
              'Apply the A4:2026 AFDD addition: identify the manual test button, follow manufacturer-specified procedure, and record the result',
              'Distinguish functional testing from protective-device trip testing and explain why both are required for the same MCB / RCD / RCBO',
              'Apply the correct order of operations — lock off, mechanical-only test, energise, live verification — and justify the order on safety and diagnostic grounds',
              'Functionally test an emergency switching system against the layered acceptance criteria of Reg 465 (single deliberate action, no further danger, no auto re-energise)',
              'Carry the functional test result onto the Schedule of Inspections (items 7.11, 7.12, 7.13 referencing 643.10) without merging it with the protective-device trip-test record',
            ]}
          />

          <ContentEyebrow>What the regulation actually says</ContentEyebrow>

          <ConceptBlock
            title="Reg 643.10 — Functional testing"
            plainEnglish="Once equipment is installed and protective tests are complete, you have to actually operate it and confirm it works. Switchgear, contactors, isolators, interlocks, emergency stops, insulation monitors. Operate them. Watch what happens. Record."
            onSite="The 'as appropriate' phrasing in 643.10 is not a get-out clause — it acknowledges that the depth of functional test depends on the equipment. A 100 A switch-fuse needs operating mechanically and verifying live. A complex emergency-shutdown system needs scenario-based testing across all of its trigger inputs."
          >
            <p>
              Reg 643.10 in BS&nbsp;7671:2018+A4:2026 is the regulation that turns paper compliance
              into operating reality. Every other test in Part 6 measures something — a resistance,
              an impedance, a voltage. Reg 643.10 does not measure: it operates. The functional test
              answers the question "does it actually work in this installation, in this
              configuration, with these terminations?".
            </p>
            <p>
              The regulation gives a non-exhaustive list of equipment categories explicitly within
              its scope:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>Switchgear and controlgear assemblies, drives, controls and interlocks</li>
              <li>Systems for emergency switching off and emergency stopping</li>
              <li>Insulation monitoring</li>
            </ul>
            <p>
              Note 1 says explicitly that the list is not exhaustive. Anything else where "operates
              correctly" is part of compliance is in scope: contactors, motor-starter control
              circuits, lockable isolators, busbar drop-out chambers, transfer switches, automatic
              transfer schemes, fire-alarm interface relays, lighting controls. If it has to operate
              to be compliant, 643.10 binds it.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 643.10 — Functional testing"
            clause={
              <>
                Equipment shall be subjected to functional testing, as appropriate, to verify that
                it is properly mounted, adjusted and installed and operates correctly in accordance
                with the relevant requirements of BS&nbsp;7671. Examples of such equipment are:
                <br />
                (a) switchgear and controlgear assemblies, drives, controls and interlocks;
                <br />
                (b) systems for emergency switching off and emergency stopping;
                <br />
                (c) insulation monitoring.
                <br />
                NOTE 1: This list is not exhaustive.
                <br />
                Protective devices shall be submitted to a test of their function, as necessary, to
                check that they are properly installed and adjusted. Where fault protection and/or
                additional protection is provided by an RCD, the effectiveness of any test facility
                incorporated in the device shall be verified.
              </>
            }
            meaning="Three distinct duties in one regulation: (1) functional test of switchgear / control / interlocks / emergency systems / insulation monitoring; (2) functional test of any protective device (separate from the trip test under 643.7/643.8); (3) verification of the integral test facility on RCDs (the test button)."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 643.10 — AFDD addition (A4 change)"
            clause={
              <>
                Where an AFDD is installed the effectiveness of any manually operated test facility
                shall be verified in accordance with the manufacturers&rsquo; recommendations.
                <br />
                NOTE 2: This functional test does not replace the functional test indicated by the
                relevant standards.
              </>
            }
            meaning="A4:2026 explicitly bound the AFDD test button into 643.10. The procedure is the manufacturer's, not a generic press-and-watch — different AFDDs handle the manual test differently, and Note 2 reminds you that the standards-based functional test is still in effect alongside this installer's check."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>
            Functional test vs trip test — the load-bearing distinction
          </ContentEyebrow>

          <ConceptBlock
            title="What 'functional' actually means — and why it is not the same as 'trip-tested'"
            plainEnglish="A functional test confirms the device does what its handle, switch, button or sensor is supposed to do. A trip test confirms the device disconnects under fault conditions to the right threshold and within the right time. They are different tests with different purposes. An MCB with a stuck contact may still close and open from the handle and look fine on the functional test, yet not break a fault current."
          >
            <p>
              The classic example is an MCB whose contacts have begun to weld from a previous
              high-energy event. The thermal-magnetic mechanism still operates the toggle. The
              handle moves between ON and OFF normally. A functional test — operate the handle,
              observe ON/OFF — passes. But the contacts no longer fully separate at the rated
              breaking capacity. When the next fault arrives, the MCB does not interrupt cleanly: it
              arcs, possibly burns through, and downstream protection is left to do the breaking.
            </p>
            <p>
              That is why Reg 643.10 functional testing is an addition to, not a replacement for,
              Reg 643.7 (effectiveness of automatic disconnection) and Reg 643.8 (additional
              protection). Both test types appear on the schedule. The functional test confirms the
              user can operate the device. The trip test confirms it operates in fault conditions to
              the regulation\'s disconnection time.
            </p>
            <p>
              For RCDs the same logic applies. Pressing the integral T button is a functional test —
              confirms the mechanical and electrical parts can operate. The 30 mA / 300 ms measured
              trip test (Reg 643.8) is the performance test. GN3 is explicit: operation of the
              integral test device does not provide a means of checking (a) the continuity of the
              earthing conductor or the associated CPCs, (b) any earth electrode or other means of
              earthing, (c) any other part of the associated installation earthing, or (d) the
              sensitivity of the device. The T button is necessary, not sufficient.
            </p>
          </ConceptBlock>

          {/* Functional-test scope diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Functional test scope — four things that have to be verified on a typical MCB
            </h4>
            <svg
              viewBox="0 0 800 400"
              className="w-full h-auto"
              role="img"
              aria-label="A central MCB symbol with four labelled callouts: mechanical operation (toggle), contact integrity (continuity across), protective device trip (measured trip test, separate Reg), and interlock with adjacent equipment (e.g. lock-off, busbar drop-out)."
            >
              {/* Central MCB */}
              <rect
                x="320"
                y="160"
                width="160"
                height="80"
                rx="6"
                fill="rgba(251,191,36,0.10)"
                stroke="#FBBF24"
                strokeWidth="2"
              />
              <text
                x="400"
                y="186"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="13"
                fontWeight="bold"
              >
                MCB / RCBO
              </text>
              <text x="400" y="206" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                e.g. 32 A B-curve
              </text>
              <text x="400" y="222" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                on a final circuit
              </text>

              {/* Toggle indicator on top */}
              <line x1="400" y1="160" x2="400" y2="140" stroke="#FBBF24" strokeWidth="2" />
              <circle cx="400" cy="138" r="5" fill="#FBBF24" />

              {/* TOP-LEFT — Mechanical operation */}
              <rect
                x="40"
                y="40"
                width="220"
                height="80"
                rx="8"
                fill="rgba(34,197,94,0.08)"
                stroke="#22C55E"
                strokeWidth="1.4"
              />
              <text
                x="150"
                y="62"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="11"
                fontWeight="bold"
              >
                1. MECHANICAL OPERATION
              </text>
              <text x="150" y="80" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Toggle moves freely between ON and OFF
              </text>
              <text x="150" y="94" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Linkage operates, no resistance
              </text>
              <text x="150" y="108" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                Reg 643.10 functional test
              </text>
              <line
                x1="260"
                y1="80"
                x2="320"
                y2="170"
                stroke="#22C55E"
                strokeWidth="1.5"
                strokeDasharray="3,3"
              />

              {/* TOP-RIGHT — Contact integrity */}
              <rect
                x="540"
                y="40"
                width="220"
                height="80"
                rx="8"
                fill="rgba(59,130,246,0.08)"
                stroke="#3B82F6"
                strokeWidth="1.4"
              />
              <text
                x="650"
                y="62"
                textAnchor="middle"
                fill="#3B82F6"
                fontSize="11"
                fontWeight="bold"
              >
                2. CONTACT INTEGRITY
              </text>
              <text x="650" y="80" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Continuity across the closed contacts
              </text>
              <text x="650" y="94" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Open circuit when toggle is OFF
              </text>
              <text x="650" y="108" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                Verifies the contacts actually make/break
              </text>
              <line
                x1="540"
                y1="80"
                x2="480"
                y2="170"
                stroke="#3B82F6"
                strokeWidth="1.5"
                strokeDasharray="3,3"
              />

              {/* BOTTOM-LEFT — Protective device trip */}
              <rect
                x="40"
                y="290"
                width="220"
                height="80"
                rx="8"
                fill="rgba(239,68,68,0.08)"
                stroke="#EF4444"
                strokeWidth="1.4"
              />
              <text
                x="150"
                y="312"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="11"
                fontWeight="bold"
              >
                3. PROTECTIVE-DEVICE TRIP
              </text>
              <text x="150" y="330" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Measured trip-time / threshold
              </text>
              <text x="150" y="344" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Reg 643.7 (loop) / 643.8 (RCD)
              </text>
              <text x="150" y="358" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                SEPARATE TEST — not 643.10
              </text>
              <line
                x1="260"
                y1="330"
                x2="320"
                y2="230"
                stroke="#EF4444"
                strokeWidth="1.5"
                strokeDasharray="3,3"
              />

              {/* BOTTOM-RIGHT — Interlock with adjacent equipment */}
              <rect
                x="540"
                y="290"
                width="220"
                height="80"
                rx="8"
                fill="rgba(168,85,247,0.08)"
                stroke="#A855F7"
                strokeWidth="1.4"
              />
              <text
                x="650"
                y="312"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="11"
                fontWeight="bold"
              >
                4. INTERLOCK WITH ADJACENT
              </text>
              <text x="650" y="330" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Lock-off accepts padlock when OFF
              </text>
              <text x="650" y="344" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Busbar drop-out / mechanical interlock
              </text>
              <text x="650" y="358" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                Reg 643.10 functional test
              </text>
              <line
                x1="540"
                y1="330"
                x2="480"
                y2="230"
                stroke="#A855F7"
                strokeWidth="1.5"
                strokeDasharray="3,3"
              />

              {/* Caption box */}
              <rect x="40" y="385" width="720" height="14" rx="4" fill="rgba(251,191,36,0.06)" />
            </svg>
          </div>

          <Scenario
            title="A 63 A four-pole isolator on a sub-board"
            situation="You are commissioning a new sub-board fed from a 63 A four-pole isolator. The isolator is upstream of the sub-board's main switch and is intended as the lock-off point for any subsequent maintenance work. The Schedule of Inspections requires items 7.10 (means of isolation) and 7.11 (operation of main switches — functional check) referencing 643.10."
            whatToDo="Three-step functional test. (1) Lock off the upstream supply to the isolator. With supply isolated, operate the isolator handle through several full ON-OFF cycles, observing free movement and clean engagement of the contacts (some isolators have a viewing window; otherwise listen for the audible click on each pole). Confirm the lock-off feature accepts a padlock with the handle in the OFF position and rejects the padlock with the handle in ON. (2) With the isolator OFF and supply still off, perform a continuity check across each pole — should read open circuit. Close the isolator and re-test continuity — should read near-zero (just the contact resistance). (3) Energise the upstream supply. Use an approved voltage tester to confirm the load-side terminals are dead with the isolator OFF and live with the isolator ON, on every pole."
            whyItMatters="Each step catches a different failure mode. The mechanical-only test catches a seized linkage. The continuity-across-poles test catches one stuck pole on a four-pole isolator (a single pole that fails to break the circuit when the others do is invisible to the handle test alone). The live verification catches a wired-through fault — the isolator was wired with input and output connected on the same side, a remarkably common installer error on busy sub-boards."
          />

          <SectionRule />

          <ContentEyebrow>The order of operations</ContentEyebrow>

          <ConceptBlock
            title="Lock-off → mechanical-only → energise → live verification"
            plainEnglish="Always do the cheap, safe test first. Then escalate to the more dangerous test only if needed. The defensible order is: lock off, mechanical test, energise, live verification."
            onSite="The temptation on a busy commissioning is to do everything live because the rest of the schedule needs the supply on. Resist. Do the dead test first; it is faster than treating an injury."
          >
            <p>The four-step order:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Lock off and prove dead.</strong> The same safe-isolation procedure that
                protects you for the wiring tests still applies here. Isolate at the supply,
                lock-off, prove dead at the test point with an approved tester proven against a
                known live source before and after.
              </li>
              <li>
                <strong>Mechanical-only test.</strong> Operate the device through its full range:
                handles, buttons, knobs, levers. Confirm free movement, audible engagement of
                contacts, indicator flags follow the operation, lock-off facilities work correctly.
                This step catches mechanical failures (seized linkages, stripped gears, jammed
                levers) before any energy is applied.
              </li>
              <li>
                <strong>Energise.</strong> Restore supply at the agreed switching point, having
                first confirmed nothing downstream is exposed.
              </li>
              <li>
                <strong>Live verification.</strong> Confirm with an approved voltage tester that the
                device makes and breaks the circuit electrically as the mechanical operation
                suggests. For an isolator: load side dead with handle OFF, load side live with
                handle ON. For an RCD: pressing T button trips. For an emergency stop: pressing
                button removes supply at the relevant equipment immediately.
              </li>
            </ol>
            <p>
              On equipment with multiple test modes (e.g. a contactor that can be energised
              electrically OR operated by a manual override pushbutton), test both. The manual
              override is the safety-significant case and the one most often skipped.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The A4:2026 AFDD addition — what changed</ContentEyebrow>

          <ConceptBlock
            title="The new AFDD manual-test-button duty under 643.10"
            plainEnglish="A4:2026 added a sentence to Reg 643.10 specifically for AFDDs. Where one is installed, you have to verify the manual test facility per the manufacturer's recommendations. Earlier editions of BS 7671 did not call this out explicitly under 643.10."
            onSite="AFDDs vary considerably between manufacturers. Some have a press-and-trip manual test like an RCD button. Others have an automatic self-test that only trips on detected malfunction (and shows status by indicator LED). The procedure depends on the device, which is exactly why A4:2026 wrote 'in accordance with the manufacturers' recommendations' rather than a generic procedure."
          >
            <p>
              AFDDs (arc-fault detection devices) are now a real protective measure under
              BS&nbsp;7671 — particularly post-A4:2026 where they are required or strongly
              recommended in specific high-risk locations. The A4 amendment binds them to 643.10
              functional testing in two ways:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Manual test button (where fitted):</strong> press it. The device should
                trip. Confirm trip, reset, confirm normal indication. Manufacturer-specified
                interval for periodic re-test (typically 6 months, advised to user via on-site
                notice).
              </li>
              <li>
                <strong>Automatic self-test (where fitted):</strong> some AFDDs have an automatic
                test facility which will trip the device in the event of a malfunction; where this
                automatic test exists it will be indicated on the device. No manual six-monthly
                action is implied for such devices beyond following manufacturer instructions.
              </li>
            </ul>
            <p>
              Two practical points. First, the A4 wording binds the test facility, not the arc-fault
              detection itself — there is no installer-side test for arc-fault sensing beyond what
              the manufacturer\'s built-in self-test offers. Second, AFDDs are listed in GN3 as
              devices that can present a low-resistance path during insulation testing, so order
              matters: insulation tests at 500 V DC happen with the AFDD disconnected; the
              functional test of its manual button happens after the AFDD is connected and the
              circuit is energised.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="The user-facing notice — six-monthly RCD / AFDD test reminder"
            plainEnglish="Reg 514.12.2 requires a notice to be fixed in a prominent position advising users to operate the RCD test button at six-monthly intervals. The same logic extends to AFDDs with manual test buttons — manufacturer-specified intervals, with a notice where appropriate. Reg 643.10 obliges you to confirm at handover that this notice is present and legible."
          >
            <p>
              The six-monthly user-test routine is part of the installation\'s ongoing safety: a
              degraded RCD that only trips slowly under fault conditions may still trip on the test
              button, but the trend over months reveals the degradation. The user has to be prompted
              to do this — hence the notice requirement.
            </p>
            <p>At handover, confirm:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                Notice is fixed in a prominent position (typically on or adjacent to the consumer
                unit, visible without opening the cover).
              </li>
              <li>
                Notice text is current (BS 7671 has updated wording across editions — the A4:2026
                model wording is the one to use on new work).
              </li>
              <li>
                Where AFDDs are installed with manual test facilities, the notice covers the
                manufacturer-specified test interval (typically six-monthly, but check the IFU).
              </li>
              <li>
                The user has been verbally walked through how to operate the test button(s) and what
                a healthy / unhealthy result looks like.
              </li>
              <li>
                Where the user is the duty-holder under EAWR (commercial / industrial premises), the
                notice is paired with a documented routine maintenance schedule that names the
                responsible person and the test interval.
              </li>
              <li>
                For AFDDs with automatic self-test (i.e. no manual button), confirm the device
                indicator is visible without opening any cover. The user\'s duty there is inspection
                of the indicator, not operation of a button.
              </li>
            </ul>
            <p>
              Reg 643.10\'s functional-test duty includes confirming the notice and the user
              instruction. A valid commissioning is one where the user knows how to keep the
              protection working, not just one where the protection works on the day.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Treating the RCD test button as a substitute for the trip test"
            whatHappens="On an EICR the inspector presses the T button on each RCD, observes a trip, ticks the box, and moves on. There is no measured trip-time test. Six months later an RCD whose sensitivity has degraded fails to interrupt a fault. Investigation reveals the RCD trips on the test button (which is a fixed, internal stimulus) but does not trip at IΔn within the regulation\'s disconnection time."
            doInstead="The integral test button is a functional test only — it confirms mechanical and electrical operation. The RCD\'s sensitivity, trip threshold, and disconnection time can only be confirmed by a measured trip test under Reg 643.7.3 / 643.8 with a BS EN 61557-6 RCD tester. GN3 is explicit on this. On the schedule, the test-button result and the measured trip-time result are two separate columns — both required, neither replacing the other."
          />

          <CommonMistake
            title="Skipping the mechanical-only test on the way to the live verification"
            whatHappens="An installer commissioning a 100 A switch-fuse goes straight to live verification. The handle moves freely with the supply on, the load energises, the test passes. Six weeks later a maintenance team locks off, pulls the handle, and only one of the four poles actually opens — the other three\'s linkage has had a subtle defect from the start. Now they have a partially live load while believing it is isolated."
            doInstead="The mechanical-only test, done with the upstream supply isolated and a continuity check across each pole, would have caught the partial-pole failure before any energy was applied. The mechanical step is the diagnostic step — it catches the things the live test cannot see, because under load the working poles disguise the fault. Lock off, operate, continuity-check each pole. Then energise."
          />

          <CommonMistake
            title="Functionally testing an emergency stop only by pressing it once"
            whatHappens="The e-stop on a CNC machine is pressed once during commissioning, the machine stops, the box is ticked. No-one tested whether (a) the machine\'s control circuit actually de-energised and the contactors dropped out (it might have used a soft-stop instead), (b) the e-stop button latches mechanically and requires deliberate twist-to-release (Reg 465 acceptance criterion: no auto-reset), or (c) any other interlocked safety device was operating correctly."
            doInstead="Reg 465 layered acceptance: (i) single deliberate operation removes supply at the relevant equipment immediately (not via a soft-stop ramp-down), (ii) released device does not allow auto re-energise, (iii) operation does not introduce further danger or impair protective devices. Test by pressing, observing immediate contactor drop-out, attempting to release without the deliberate twist (it should not release), then deliberately releasing and confirming the system requires a separate restart action. Document each criterion separately."
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
            Manufacturer-specified procedures and the standards-based functional test
          </ContentEyebrow>

          <ConceptBlock
            title="Note 2 to 643.10 — your test does not replace the standards-based one"
            plainEnglish="Manufacturers test their switchgear to product standards (BS EN 60947, BS EN 60898, BS EN 61009, BS EN 62606, etc.) before it leaves the factory. Your 643.10 test is on top of that, not instead of it."
          >
            <p>
              Note 2 to Reg 643.10 reads: "This functional test does not replace the functional test
              indicated by the relevant standards." This means two things in practice:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                The product-standard functional test (carried out by the manufacturer, attested by
                the CE / UKCA marking and the test certificate) is the test that demonstrates the
                device is fit for its rated service. Your installer\'s test does not subsume that.
              </li>
              <li>
                Your 643.10 test is contextual — does this device, as installed in this enclosure,
                with these terminations, on this circuit, work correctly? It catches the faults that
                arise from the installation, not the design.
              </li>
            </ul>
            <p>
              The two tests answer different questions. Manufacturer: does the device meet its
              specification? Installer: did we install it in a way that lets it meet its
              specification? Both required.
            </p>
            <p>
              Where manufacturers specify a functional-test procedure beyond the basic
              press-and-watch (typical for AFDDs, smart switchgear, motor protection relays, and
              transfer switches), follow it. The A4:2026 AFDD addition is explicit: "in accordance
              with the manufacturers' recommendations". Read the IFU before you press anything.
            </p>
          </ConceptBlock>

          <Scenario
            title="A new AFDD on a TT-system bedroom socket circuit"
            situation="You are installing a Type-A combined RCBO/AFDD on a bedroom socket circuit in a HMO. The device has a manufacturer-specified test routine: press the T button — RCD trips; press the AFDD-test button — AFDD self-test runs and the LED flashes a sequence. Manufacturer instructs that the AFDD self-test should be performed monthly, with a status-LED reading required immediately after."
            whatToDo="Two functional tests, both recorded against Reg 643.10 (with the AFDD aspect linked to the A4 addition). (1) Press the integral T button — confirm the device trips. Reset. Record on Schedule of Inspections item 7.13. (2) Press the AFDD-test button — observe the LED sequence per the manufacturer's manual. If the sequence indicates pass, record. If the sequence indicates a fault, the device fails 643.10 and shall be replaced before handover. Provide the user with a notice advising the AFDD self-test should be operated at the manufacturer-specified interval."
            whyItMatters="The A4:2026 amendment binds the AFDD manual test to the manufacturer's procedure, not a generic press-and-watch. Different manufacturers run different self-test routines — some flash the LED, some send a status code over a Bluetooth interface, some require a held-button sequence. Skipping the manufacturer's specific routine fails 643.10's A4 addition and the user's ongoing maintenance instruction is incomplete."
          />

          <SectionRule />

          <ContentEyebrow>Insulation monitoring — the third 643.10 example category</ContentEyebrow>

          <ConceptBlock
            title="Functional testing an insulation monitoring device (IMD)"
            plainEnglish="Insulation monitoring devices are required on certain IT-system supplies (e.g. medical locations, safety services). They continuously measure the insulation resistance between the live conductors and earth, and alarm when it drops below threshold. Reg 643.10 obliges you to functionally test one — confirm both the audible alarm and the visual indication operate on a simulated first fault."
            onSite="Acceptance criteria for IMDs in safety-services systems: on simulated first-fault the device shall provide both audible alarm and a visual indication. The installation is not acceptable if either indication type fails to operate under test. Read the manufacturer\'s commissioning routine — most IMDs have a built-in test function that injects a known-impedance fault for the test."
          >
            <p>The IMD functional test sequence:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                Confirm the IMD is energised and showing a healthy state (typically a green
                indicator, no alarm condition).
              </li>
              <li>
                Either operate the manufacturer\'s built-in test function, or apply a known
                test-impedance between a live conductor and earth to simulate the alarm threshold.
              </li>
              <li>
                Confirm the visual indication operates (alarm LED, display message, or relay
                contacts to a remote panel) — and confirm the audible alarm sounds.
              </li>
              <li>Reset and confirm the device returns to a healthy state.</li>
              <li>
                For IT systems where the IMD covers safety services (medical locations, fire pumps,
                life-safety circuits), confirm any remote alarm signal also operates.
              </li>
            </ol>
            <p>
              Insulation monitoring is a continuous-running protective measure, so the functional
              test is doubly important: a silent-failed IMD on an IT system means the first earth
              fault is undetected, and the system continues running with degraded protection until
              the second fault arrives. Reg 643.10 catches a silent IMD at commissioning before the
              first fault.
            </p>
          </ConceptBlock>

          <Scenario
            title="Two-source interlock on a small data-centre transfer scheme"
            situation="A small data-centre is fed from two parallel transformer feeds, A and B. A mechanical/electrical interlock is intended to prevent both A and B isolators being closed simultaneously (paralleling the two transformers, a vendor-disallowed condition). Reg 643.10 requires the interlock to be functionally tested at commissioning."
            whatToDo="Sequence: with both isolators open and both supplies isolated upstream, attempt to close A and B together. The interlock should make this physically or electrically impossible. Document. Open A, close B, attempt to close A — the interlock should hold. Open B, close A, attempt to close B — the interlock should hold. With one source closed, momentarily attempt to close the other in normal operating sequence (closure sequence: open closed source, close other source) and confirm there is no transient overlap. The acceptance criterion (per Reg 643.10 plus paralleling guidance) is: any residual possibility of simultaneous closing results in non-acceptance. If the test reveals even a brief overlap, that is a non-compliance and the interlock has to be re-engineered before handover."
            whyItMatters="Two transformer feeds paralleled without intent can cause large circulating currents, transformer damage, and switchgear failure under fault conditions. The interlock\'s entire job is to prevent that one fault. A 30-minute structured functional test at commissioning catches an interlock that was wired correctly on paper but not engineered correctly in the cabinet."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>What gets recorded — the inspection-schedule items</ContentEyebrow>

          <ConceptBlock
            title="643.10 on the Schedule of Inspections — items 7.11, 7.12, 7.13 and beyond"
            plainEnglish="Functional testing under Reg 643.10 maps to specific items on the Schedule of Inspections. Each gets its own tick or comment. The Schedule of Test Results does not have a single 'functional' column — the result is recorded against the inspection items, with detail in comments where remediation occurred."
          >
            <p>
              On the standard Schedule of Inspections (consumer-unit / switchgear section), the
              643.10 duties map across:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>
                  Item 7.11 — Operation of main switch(es) (functional check) (643.10):
                </strong>{' '}
                main switch / isolator manual operation verified.
              </li>
              <li>
                <strong>
                  Item 7.12 — Manual operation of circuit-breakers, RCDs and AFDDs to prove
                  functionality (643.10):
                </strong>{' '}
                each protective device toggled to confirm mechanical operation.
              </li>
              <li>
                <strong>
                  Item 7.13 — Confirmation that integral test button/switch causes RCD(s) to trip
                  when operated (functional check) (643.10):
                </strong>{' '}
                T-button on each RCD pressed and trip observed.
              </li>
              <li>
                <strong>Items further down the schedule</strong> for emergency switching,
                interlocks, insulation monitoring, where present.
              </li>
            </ul>
            <p>
              For AFDDs specifically, item 7.12 covers the manual functional test (handle-style
              operation), and where the manufacturer specifies a separate AFDD self-test routine,
              that is recorded in the comments column with reference to the manufacturer\'s IFU.
            </p>
            <p>
              Where a functional test failed and remediation was carried out before re-test, record
              both the original failure and the remediation in the comments column. The next
              inspector reading the report needs to know what was wrong and what was done — an
              unannotated "pass" hides the diagnostic history.
            </p>
          </ConceptBlock>

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Reg 643.10: equipment shall be subjected to functional testing, as appropriate, to verify it operates correctly. Switchgear, controls, drives, interlocks, emergency systems, insulation monitoring — non-exhaustive list.',
              "A4:2026 explicitly added AFDD manual-test-facility verification to 643.10. The procedure is the manufacturer's, not a generic press-and-watch.",
              'Functional ≠ trip. Functional test = does the handle / button / interlock work? Trip test = does the device break the circuit at threshold? Both required, separate columns on the schedule.',
              'Order: lock off → mechanical-only test → energise → live verification. Mechanical-only first catches gross failures before any energy is applied.',
              'The RCD T button is a functional test only. It does NOT verify earth-electrode continuity, CPC continuity, earthing-system integrity, or device sensitivity. The measured trip test (643.7.3 / 643.8) covers those.',
              'For interlocks, the test is "try to defeat it under controlled conditions and confirm it holds". An interlock that can be defeated, even partially, is not acceptable.',
              'Emergency switching adds Reg 465 acceptance: single deliberate operation, no auto re-energise, no further danger, no impaired protection.',
              "Note 2 to 643.10: your installer's test does not replace the manufacturer's product-standard functional test. Both are required, they answer different questions.",
              'Records: items 7.11 (main switch), 7.12 (CBs/RCDs/AFDDs manual op), 7.13 (RCD T button) on the Schedule of Inspections — each its own tick. Use comments for any remediation history.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'Does Reg 643.10 require functional testing on every protective device on the board, or only on a sample?',
                answer:
                  "Initial verification: every protective device. Manual operation of every MCB, RCD, RCBO and AFDD is required (Schedule of Inspections item 7.12) and the integral T button on every RCD is required (item 7.13). Periodic inspection (EICR): sample-based per the agreed scope and limitations declared on the report. The number sampled and the rationale should be defensible against the agreed scope, the condition of the installation and the inspector's competent judgement.",
              },
              {
                question:
                  'I have an AFDD on a circuit. Do I need to do anything beyond the RCD test button to satisfy A4:2026 Reg 643.10?',
                answer:
                  "Yes. The A4 addition is explicit: where an AFDD is installed the effectiveness of any manually operated test facility shall be verified in accordance with the manufacturers' recommendations. AFDDs typically have either a separate manual test button (different from the RCD T button) or an automatic self-test indicator. Read the manufacturer's instruction-for-use, run the routine they specify, observe the result they specify. Record on the Schedule of Inspections with reference to the manufacturer's IFU.",
              },
              {
                question:
                  'A four-pole isolator passes the handle test but I am not sure all four poles are actually breaking. How do I confirm without taking it apart?',
                answer:
                  'Continuity test across each pole with the supply isolated and the isolator open — should read open circuit on every pole. Close the isolator (still with supply isolated) and re-test — should read near-zero on every pole. If one pole reads open with the isolator closed, that pole has failed to make. If one pole reads continuity with the isolator open, that pole has failed to break. Both are 643.10 fails. The continuity test takes longer than the handle test but it is the only non-destructive way to confirm pole integrity.',
              },
              {
                question:
                  'What counts as a "functional test" of an interlock — am I supposed to actually try to defeat it?',
                answer:
                  'Yes, in the controlled sense. The acceptance criterion is that the interlock demonstrably prevents the unwanted condition (e.g. simultaneous closure of two parallel sources). Try to close both sources simultaneously, with the interlock active; the interlock should hold. If it can be defeated by any reasonable operating sequence, that is a non-acceptance condition under Reg 643.10. Document the test sequence carried out and the result. Do not test under fault-current conditions — the test is whether the interlock holds, not whether it survives a fault.',
              },
              {
                question:
                  'How does Reg 643.10 interact with manufacturer-specified test schedules for complex switchgear (e.g. ACBs, MCCBs with electronic trip units)?',
                answer:
                  "Note 2 to 643.10 is the controlling principle: your installer's functional test does not replace the standards-based test the manufacturer carried out. For ACBs and MCCBs with electronic trip units, the manufacturer typically specifies (a) primary injection or secondary injection trip-curve verification, (b) mechanical operation tests, (c) racking-mechanism tests for withdrawable units. The 643.10 functional test covers the operational aspect — handle / racking / electrical control circuit. The trip-curve verification falls under Reg 643.7 (effectiveness of automatic disconnection) and the manufacturer's commissioning routine. Both required.",
              },
              {
                question:
                  'On an EICR, do I have to functionally test the main switch by actually opening it (which interrupts supply to the whole installation)?',
                answer:
                  'The pragmatic answer is in the agreed scope and limitations. Genuine functional testing of the main switch requires operation, which on an occupied installation means a planned outage. Most EICRs declare this as a limitation: main-switch operation is verified by visual inspection, lock-off facility check, and inspection of the operating mechanism rather than by an actual cycle. Document the limitation on the EICR. If the client requests full functional testing, schedule a planned outage and operate the main switch as part of that.',
              },
              {
                question:
                  'The RCD I am testing trips on the T button but the customer says it has been "tripping for no reason". What does Reg 643.10 require me to do?',
                answer:
                  "The functional test passing only confirms the T button works. The customer's complaint is about sensitivity and behaviour under fault conditions — that is the 643.7.3 / 643.8 measured trip test territory, not 643.10. Carry out the measured RCD trip test at IΔn, ½IΔn (no-trip), and 5×IΔn or per the relevant schedule. Combine with insulation-resistance testing on the protected circuits and an earth leakage check at the consumer unit. Nuisance tripping is most often (a) accumulated leakage on a long circuit, (b) a healthy circuit on the wrong side of a 30 mA threshold for its protective bonding configuration, or (c) a degrading appliance. The functional test is your starting point, not your stopping point.",
              },
              {
                question:
                  'Does Reg 643.10 apply on additions and alterations as well as initial verification?',
                answer:
                  'Yes. Reg 643 binds initial verification, but additions and alterations that introduce new equipment within the 643.10 scope (new main switch, new isolator, new RCBO, new AFDD, new emergency stop, new interlock) require functional testing of that new equipment before handover. The Minor Works Certificate / EIC Addition declaration covers this — testing scope is "the work undertaken" and includes functional testing of every device introduced or modified.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Functional testing of switchgear — Module 7.4" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/inspection-testing/module-7')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 7
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/inspection-testing/module-7/section-5')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                7.5 Protective device operation verification
              </div>
            </button>
          </div>

          <div className="hidden">
            <Activity />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default InspectionTestingModule7Section4;
