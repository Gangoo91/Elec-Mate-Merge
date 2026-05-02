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
    id: 'elm5-s2-funcvsdur',
    question: 'What is the difference between a functional test and a duration test?',
    options: [
      'Same thing.',
      'A FUNCTIONAL test is a brief mains-fail simulation (typically 5-15 minutes) that confirms every luminaire transfers to emergency operation, illuminates, and is free of fault indications. A DURATION test is a full discharge of the batteries — running the system on emergency power for the full rated duration (typically 3 hours, occasionally 1 hour). The functional test is monthly; the duration test is annual. The functional verifies operation; the duration verifies the energy capacity to sustain operation for the rated time.',
      'Functional is annual.',
      'Duration is shorter.',
    ],
    correctIndex: 1,
    explanation:
      'Two different tests for two different purposes. Functional = does it switch on (monthly cadence). Duration = can it sustain (annual cadence). Both are required by BS EN 50172:2024 and BS 5266-1:2025; neither replaces the other.',
  },
  {
    id: 'elm5-s2-recovery',
    question: 'After a 3-hour duration test, what is the BS EN 50171/50172 recovery requirement?',
    options: [
      'Immediate.',
      'Recharge to ≥ 80% of rated battery capacity within 24 hours of mains restoration. Full recharge to 100% within a longer manufacturer-specified period (typically 12-72 hours depending on chemistry and capacity). The 24-hour-to-80% rule ensures that if a second emergency occurs the day after a duration test, the system still has substantial usable capacity.',
      'Within 1 hour.',
      'Within 1 week.',
    ],
    correctIndex: 1,
    explanation:
      'The 24 h to 80% rule is the BS EN 50171/50172 minimum. It is the protection against back-to-back emergencies — if mains fails again the next day, there is still enough capacity to evacuate. Failure to recover within 24 h indicates a battery problem (capacity loss) or charger problem (insufficient charge current); either is a defect requiring investigation.',
  },
  {
    id: 'elm5-s2-when',
    question: 'When should a 3-hour duration test typically be scheduled?',
    options: [
      'Mid-day busy period.',
      'OUTSIDE business hours — typically overnight, very early morning, or weekend when the building is unoccupied. Two reasons: (1) during the test, the batteries discharge, and during the subsequent 24 h recharge the protection is reduced (a real emergency at hour 22 of the recharge would find batteries at <80% — outside acceptance); (2) the duration test causes maintained luminaires to operate visibly for 3 hours, which is disruptive to building users. Self-test luminaires can schedule and report the test automatically; central battery typically requires a manual or scheduled test.',
      'During fire drill.',
      'During occupancy.',
    ],
    correctIndex: 1,
    explanation:
      'The duration test creates a temporary protection deficit during the recharge period. Scheduling it when the building is empty is risk management. The 2025 standard reinforces this — protection during recharge is reduced and should be acknowledged in the operational planning.',
  },
  {
    id: 'elm5-s2-tolerance',
    question: 'BS 5266-1:2025 tightened the timing tolerance on test scheduling. What is the practical effect?',
    options: [
      'Tests can be done any time.',
      'The 2025 standard expects schedules to be CONSISTENT — monthly functional tests within the calendar month, annual duration tests within the 12-month window from the previous test, with documented justification for any deviation. The previous practice of allowing wide tolerance bands has tightened. Self-test systems automatically maintain this; manual testing requires a logbook and a calendar discipline. Slipping a monthly test by 10 days is a non-conformance against the 2025 schedule expectation.',
      'No change.',
      'All tests are weekly.',
    ],
    correctIndex: 1,
    explanation:
      'The schedule consistency is one of the 2025 emphasis areas. Tests have always been monthly / annual, but the tolerance was sometimes treated loosely. The 2025 update expects the schedule to be kept; deviations need documented reasons. Self-test systems are explicitly recognised as a way to achieve this.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What does the monthly functional test verify?',
    options: [
      'Battery capacity.',
      'That every emergency luminaire correctly transfers to emergency operation when its local supply is interrupted, illuminates, is free of fault indications, and produces light at the design level. The test is brief (5-15 minutes typical) and is intended to catch step-change failures: failed batteries, failed lamps, miswired luminaires, fault-flagged self-test luminaires. It does NOT verify duration capacity — that is the annual duration test.',
      'Lamp colour.',
      'Cable insulation.',
    ],
    correctAnswer: 1,
    explanation:
      'The monthly functional test is a step-change-failure detection test. It catches anything that has stopped working since the last test. It does not catch gradual battery capacity decay — that needs the duration test. Both tests are required because they catch different failure modes.',
  },
  {
    id: 2,
    question: 'What is the rated duration for most commercial emergency lighting installations?',
    options: [
      '15 minutes.',
      '3 hours — the BS 5266-1 default for most occupancy classes, designed to allow time for evacuation and for any necessary fire-fighting / building-clearance operations. A 1-hour rating is permitted for some specific occupancy classes (e.g. small premises with simple evacuation, where the design risk assessment supports 1 hour). The duration is a design parameter — verify what the design specifies, then verify that the actual system meets it under test.',
      '1 day.',
      '15 hours.',
    ],
    correctAnswer: 1,
    explanation:
      '3 hours is the standard duration for commercial premises. 1 hour is permitted for some specific cases. The duration is determined at design time by the risk assessment; the duration test verifies the actual installation meets the design.',
  },
  {
    id: 3,
    question: 'During a 3-hour duration test, what must be checked at the END of the test?',
    options: [
      'Just that lights are on.',
      'Multiple checks at the end: (a) every luminaire is still illuminated; (b) where the design specifies a minimum lux at end-of-discharge, that minimum is still met (some 2025 designs include this); (c) self-test fault indicators are clear; (d) recovery begins promptly when mains is restored. The test is not a binary on/off observation — it is a sustained capacity verification with end-of-test acceptance criteria.',
      'Coffee.',
      'Time only.',
    ],
    correctAnswer: 1,
    explanation:
      'The duration test outcome is multi-faceted. The simple binary (luminaires on or off) catches the worst failures but misses degraded performance. The 2025 standard increasingly expects end-of-test lux verification on critical escape routes. Recovery start is also a check — slow or failed recovery is a defect.',
  },
  {
    id: 4,
    question: 'Per BS EN 50171/50172, what is the maximum permitted recovery time?',
    options: [
      'Unlimited.',
      'Recharge to ≥ 80% of rated capacity within 24 hours of mains restoration; full recharge to 100% per manufacturer specification (typically 12-72 h). The 24 h to 80% is the system-level requirement that protects against back-to-back emergencies. A failure to recover within 24 h is a defect — typical causes are battery capacity loss (battery service required) or charger fault (charger service required).',
      '7 days.',
      '24 h to 100%.',
    ],
    correctAnswer: 1,
    explanation:
      'Two thresholds: 80% within 24 h (the system-level protection floor) and 100% per manufacturer spec (typically longer). The 80%/24 h is the binding requirement for a passing recovery check.',
  },
  {
    id: 5,
    question: 'Why is the duration test typically scheduled outside business hours?',
    options: [
      'Tradition.',
      'During the test, the batteries fully discharge. During the subsequent 24-hour recharge, the system protection level is reduced — a second emergency occurring during recharge would find the batteries at less than full capacity. Scheduling the test when the building is empty (overnight, weekend) means the reduced-protection window aligns with the lowest-risk occupancy time. Additionally, the test causes maintained luminaires to operate visibly for 3 hours, which is disruptive to occupants.',
      'Cost.',
      'Faster results.',
    ],
    correctAnswer: 1,
    explanation:
      'Risk-aware scheduling. The recharge window is a temporary protection deficit. Aligning the test with low-occupancy periods minimises the population at risk during the recharge. The 2025 standard reinforces this practice.',
  },
  {
    id: 6,
    question: 'A self-test luminaire automates which tests?',
    options: [
      'None.',
      'A self-test luminaire automatically performs the monthly functional test (brief discharge, verify changeover and illumination, log result) and the annual duration test (full discharge, log result, log recovery). The luminaire reports pass/fail to a controller or via local indication (LED status). The competent person reviews the log rather than manually performing each test. Self-test does NOT remove the need for the five-yearly photometric survey, the visual inspection, or the BS 7671 periodic verification.',
      'Five-yearly photometric.',
      'Visual inspection.',
    ],
    correctAnswer: 1,
    explanation:
      'Self-test luminaires automate the schedule for functional and duration tests and provide an electronic logbook. They do not replace the human-led visual inspection or photometric survey. They are an aid, not a complete substitute for competent oversight.',
  },
  {
    id: 7,
    question: 'During a duration test, one luminaire fails at 90 minutes. What is the response?',
    options: [
      'Ignore.',
      'Record the failure with luminaire reference and time of failure. Continue the test on the rest of the system to obtain the full result. After the test, investigate the failed luminaire — likely causes: failed battery (most common, replace battery), failed inverter / electronics (replace luminaire), wiring fault (rectify). After repair, perform a single-luminaire functional test; the next monthly test will exercise the repaired luminaire as part of the routine cycle. Update the logbook with the failure, the corrective action, and the verification.',
      'Stop the test immediately.',
      'Replace all luminaires.',
    ],
    correctAnswer: 1,
    explanation:
      'A single luminaire failure during duration is data, not catastrophe. Continue the test for the system result; investigate the failed luminaire afterwards. The most common cause is age-related battery capacity loss (typical battery life 3-5 years for self-contained); the cure is targeted, not system-wide.',
  },
  {
    id: 8,
    question: 'How is the duration test result recorded?',
    options: [
      'Verbally.',
      'In the BS 5266-1 logbook (paper or electronic): test date and start time, test type (full duration), rated duration, actual duration achieved, luminaires tested (typically by area, with any individual failures listed by reference), end-of-test observations (all illuminated; lux readings on critical points if specified), recovery start time, recovery confirmation time (when ≥ 80% reached), tester name, signature. The logbook entry is the contemporaneous record relied on by insurers, fire authorities, and future maintainers.',
      'Photo only.',
      'Email.',
    ],
    correctAnswer: 1,
    explanation:
      'The logbook is the legal record. BS 5266-1:2025 and the RRO 2005 Article 23 expect contemporaneous structured records. Verbal or photo-only is not record-keeping. The logbook entry must contain enough detail to demonstrate compliance years later.',
  },
  {
    id: 9,
    question: 'Why is recovery time as important as discharge duration?',
    options: [
      'It is not.',
      'Because the system is in a reduced-protection state during recovery — the batteries are at less than full capacity until recharge completes. A second emergency during recovery finds reduced run-time available. The 24-hour-to-80% rule is the design assumption that limits this deficit. A system that takes 48 hours to recover has twice the deficit window. Slow recovery is a defect even if discharge duration was met.',
      'Recovery is irrelevant.',
      'Recovery is for charging only.',
    ],
    correctAnswer: 1,
    explanation:
      'Recovery is the second half of the duration test. A pass on discharge with a fail on recovery is still a fail. The 80%/24 h rule limits the size of the reduced-protection window to a defined risk.',
  },
  {
    id: 10,
    question: 'The 2025 BS 5266-1 update emphasises consistency in test scheduling. What does this mean for a contractor providing periodic testing?',
    options: [
      'Nothing changed.',
      'Monthly functional tests must be carried out within the calendar month they are due; annual duration tests within the 12-month anniversary of the previous test (with a small documented tolerance). Slipping a monthly by several weeks or an annual by months is a non-conformance against the 2025 schedule expectation. The contractor needs to maintain a planning system (digital scheduling, self-test reports, calendar discipline) that demonstrates the schedule is being kept. Insurers and fire authorities increasingly look at the schedule consistency, not just the individual test results.',
      'Tests can be skipped.',
      'Schedule is irrelevant.',
    ],
    correctAnswer: 1,
    explanation:
      'Schedule discipline is a 2025 emphasis. Tests carried out reliably each cycle catch defects early; tests that drift miss the early signals. The contractor providing maintenance must demonstrate the schedule, not just the test results.',
  },
];

const EmergencyLightingModule5Section2 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Functional and 3-hour duration tests | Emergency Lighting Module 5.2 | Elec-Mate',
    description:
      'BS EN 50172:2024 and BS 5266-1:2025 functional (monthly) and full duration (annual) tests: method, recovery requirements, scheduling outside business hours, self-test integration, logbook entries.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 5
          </button>

          <PageHero
            eyebrow="Module 5 · Section 2"
            title="Functional and 3-hour duration tests"
            description="The two periodic tests that BS EN 50172:2024 and BS 5266-1:2025 build the periodic regime around: the monthly functional test (brief mains-fail simulation, verifies every luminaire still operates) and the annual full duration test (full discharge of the batteries for the rated duration, verifies sustained capacity). Method, scheduling, recovery, self-test integration, and logbook discipline."
            tone="yellow"
          />

          <TLDR
            points={[
              'Functional test: brief mains-fail simulation (typically 5-15 minutes), monthly cadence, verifies every luminaire transfers, illuminates, no faults logged. Catches step-change failures.',
              'Duration test: full discharge of batteries for rated duration (typically 3 h), annual cadence, verifies sustained capacity. Catches gradual battery capacity decay that the functional test cannot see.',
              'Recovery: per BS EN 50171/50172, recharge to ≥ 80% of rated capacity within 24 hours of mains restoration. Full recharge to 100% per manufacturer (typically 12-72 h).',
              'Schedule outside business hours — during recharge the protection is reduced, so align the recharge window with low-occupancy periods.',
              '2025 emphasis: schedule consistency. Monthly tests within calendar month, annual within 12-month anniversary, with documented justification for any deviation.',
              'Self-test luminaires automate functional and duration testing and provide electronic logbooks. They do not replace visual inspection or photometric survey.',
              'Central battery systems typically require manual / scheduled testing because the central battery transfer is a system-level operation, not a luminaire-level one.',
              'Logbook entry per BS 5266-1:2025: date, type, luminaires tested, results, faults, corrective actions, recovery confirmation, tester signature.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Distinguish a functional test (brief, monthly, verifies operation) from a duration test (full, annual, verifies capacity)',
              'Carry out a monthly functional test on a self-contained or central battery installation, with proper observation and recording',
              'Carry out an annual full duration test over the rated time, with start-of-test, end-of-test, and recovery checks',
              'Apply the BS EN 50171/50172 recovery requirement (≥ 80% of rated capacity within 24 hours of mains restoration)',
              'Schedule tests outside business hours to align the reduced-protection recharge window with low-occupancy periods',
              'Apply the BS 5266-1:2025 schedule consistency expectation: monthly within month, annual within 12-month anniversary',
              'Integrate self-test luminaire reports with the logbook and identify what self-test does and does not replace',
              'Record functional and duration tests in the BS 5266-1 logbook with sufficient detail to demonstrate compliance over time',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Functional vs duration — two tests, two purposes</ContentEyebrow>

          <ConceptBlock
            title="Why both tests are required"
            plainEnglish="The functional test and the duration test are both required by BS EN 50172:2024 and BS 5266-1:2025, and they are required because they catch different failure modes. The functional test is brief — long enough to verify each luminaire transfers and illuminates, but not long enough to verify the battery capacity. It catches step-change failures: a failed lamp, a failed inverter, a battery that has gone open-circuit, a self-test luminaire flagging a fault. The duration test is the full rated time — typically 3 hours — and verifies that the battery actually has the energy capacity to sustain the luminaire for the design duration. It catches gradual battery capacity decay that the functional test cannot see (a battery at 50% of rated capacity will pass a 5-minute functional test but fail a 3-hour duration test)."
            onSite="Think of it as 'does it work' (functional) plus 'does it last' (duration). Both are required because real emergencies demand both — instant transfer plus sustained operation. Either test alone leaves a blind spot."
          >
            <p>The two tests by purpose:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Functional test (monthly).</strong> A brief mains-fail simulation, typically 5-15 minutes, that verifies each luminaire correctly enters emergency mode and produces light. Catches: failed batteries (open-circuit or completely flat), failed lamps, failed inverters / electronics, miswiring (luminaire on wrong supply), self-test fault flags. Does NOT catch gradual battery capacity decay because the test does not run long enough to expose it.
              </li>
              <li>
                <strong>Duration test (annual).</strong> A full discharge of the batteries for the rated emergency operating time, typically 3 hours (1 hour for some specific occupancy classes). Verifies the battery has the energy capacity to sustain the luminaire output for the design duration. Catches: gradual battery capacity decay (the dominant failure mode of self-contained luminaire batteries after 3-5 years), undersized batteries (rare but happens after substitutions), charger problems (the battery starts the test undercharged), insulation degradation that increases self-discharge.
              </li>
            </ul>
            <p>
              The functional test catches the failures that have happened since the last test. The duration test catches the failures that are happening but have not yet manifested. Both are required for confidence the system will actually work when needed.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 50172:2024 · Clause 7 (Periodic tests)"
            clause={
              <>
                The emergency lighting installation shall be tested at intervals not exceeding one month for correct operation of each luminaire and at intervals not exceeding one year for the full rated duration. Records of all periodic tests shall be maintained for inspection by the responsible person and the appropriate authorities.
              </>
            }
            meaning="Two separate cadences mandated. Monthly functional, annual full-duration. Records maintained. The wording 'each luminaire' makes the monthly test explicit at the per-luminaire level — not a sample, every one. The annual full-duration test is the full rated time, not a fraction."
          />

          <RegsCallout
            source="BS 5266-1:2025 · Clause 12 (Periodic inspection and testing)"
            clause={
              <>
                Periodic inspection and testing shall be carried out at the intervals specified for the system type, by competent persons, with results recorded contemporaneously. Tests shall be scheduled to be carried out at consistent intervals — monthly tests within the calendar month and annual tests within the twelve-month anniversary of the previous test, with any deviation documented.
              </>
            }
            meaning="The clause makes consistency explicit — monthly in month, annual in anniversary. The 2025 update tightens what was sometimes treated as flexible. The competent person clause and the contemporaneous recording clause apply to every test, not just commissioning."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The monthly functional test</ContentEyebrow>

          <ConceptBlock
            title="Method"
            plainEnglish="The functional test simulates a mains failure for long enough to verify the system responds correctly. For self-contained luminaires, this means interrupting each final emergency lighting circuit (or operating the test facility provided) for typically 5-15 minutes, while observing each luminaire to confirm it has switched, is producing light, and shows no fault indication. For central battery systems, it means simulating mains failure to the central battery itself (or operating the test facility on the panel) and verifying the central battery transfers and the slave luminaires illuminate. Either way, the observation is per-luminaire — every one is checked, every month."
          >
            <p>The functional test sequence:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Plan the test window.</strong> Outside business hours where practical. Notify building users that emergency lighting will operate (so observed maintained luminaires running on emergency mode are not raised as a fault by occupants).
              </li>
              <li>
                <strong>Confirm last duration test.</strong> If the last duration test was within the past 24 hours and recovery is incomplete, postpone the functional test until recovery is complete. A functional test on a partially-charged system will fail and the failure is misleading.
              </li>
              <li>
                <strong>Interrupt the supply.</strong> Use the test facility (key-operated test switch on consumer unit, or central battery test mode), or open the relevant final circuit breaker(s).
              </li>
              <li>
                <strong>Observe each luminaire.</strong> Per-luminaire — confirm: changeover within design class (typically the response is sub-second for most modern equipment); illumination producing visible light; no fault indication on the luminaire (LED status, beep). Walk the area; observe each one.
              </li>
              <li>
                <strong>Record any failures.</strong> Luminaire reference, observation (no light, dim, fault flag), area, photo if practical.
              </li>
              <li>
                <strong>Restore mains.</strong> After typically 5-15 minutes, restore supply. Confirm each luminaire returns to charging mode (LED status changes back).
              </li>
              <li>
                <strong>Log.</strong> Logbook entry: date, time, test type (functional), areas tested, luminaires observed, failures (if any), corrective action initiated, signature.
              </li>
              <li>
                <strong>Investigate failures.</strong> Each failed luminaire is investigated separately. Common causes: failed battery (most common after 3-5 years), failed lamp (LED arrays typically very long-lived but possible), failed inverter / electronics, miswiring not previously caught.
              </li>
            </ol>
            <p>
              The duration of the functional test is intentionally short. It is not trying to verify capacity; it is trying to verify operation. 5-15 minutes is enough to observe transfer and steady-state illumination on every luminaire while limiting the discharge depth of the batteries (so the system is not significantly compromised after the test).
            </p>
          </ConceptBlock>

          <Scenario
            title="Functional test misses a degraded battery"
            situation="Monthly functional test on a 200-luminaire installation. All luminaires transfer correctly, all illuminate, no fault flags. Functional test passes. Three months later, an actual mains failure lasts 45 minutes; eight luminaires go dark at the 30-minute mark."
            whatToDo="The functional test cannot catch a battery that has lost most of its capacity but is still capable of illuminating the lamp for 5-15 minutes. A 50%-capacity battery passes a 10-minute functional test (because 10 minutes is a small fraction of the full duration); the same battery fails a 3-hour duration test. The annual duration test exists precisely to catch this. The site should review when the last duration test was; if it was over 12 months ago, the schedule has slipped. Reinstate the duration test cadence; replace the failed batteries; treat the gap as a non-conformance and document the corrective action."
            whyItMatters="The functional + duration combination is the BS EN 50172 / BS 5266-1 design. Skipping the duration test (because the monthly test was passing) is a category of practice that the 2025 update explicitly identifies as a non-conformance. The functional test is necessary but not sufficient — duration is the other half of the verification."
          />

          <SectionRule />

          <ContentEyebrow>The annual 3-hour duration test</ContentEyebrow>

          <ConceptBlock
            title="The full discharge"
            plainEnglish="The duration test runs the system on emergency power for the full rated duration. For most commercial installations, this is 3 hours; for some specific occupancy classes the design rating is 1 hour. The test is performed by isolating the mains supply (to the system overall, or to the specific zones being tested if the design supports zoned testing) and observing the luminaires throughout. At the end of the rated time, every luminaire must still be illuminated; recovery (recharge) must begin promptly when mains is restored and reach ≥ 80% within 24 hours."
            onSite="Plan the test like an event. The 3-hour discharge plus 24-hour recharge is a real time commitment. Schedule out-of-hours; ensure observers are present at start, middle, and end; have spare batteries and luminaires on hand for any failures observed."
          >
            <p>The duration test sequence:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Pre-conditions.</strong> Batteries fully charged (verify charger LED, central battery panel state of charge, or self-test luminaire status). System has had at least 24 hours since the last functional or duration test for full recharge.
              </li>
              <li>
                <strong>Schedule.</strong> Outside business hours — typically late evening start so the 3-hour test plus the early hours of recovery fall in the unoccupied period. Notify the responsible person; agree the window.
              </li>
              <li>
                <strong>Visual check immediately before.</strong> Walk the system; confirm no obvious faults; record any pre-existing flags.
              </li>
              <li>
                <strong>Initiate the test.</strong> Isolate mains to the system (or operate the duration test facility on the central battery panel, or instruct each self-test luminaire to enter duration mode via the controller). Record start time precisely.
              </li>
              <li>
                <strong>Observe at start.</strong> Every luminaire transfers; every luminaire illuminates. Record any that did not transfer correctly — these are functional failures, separate from duration failures, and are investigated as such.
              </li>
              <li>
                <strong>Mid-test observation.</strong> At approximately 50% of the rated duration (1.5 h for a 3-hour test), walk the system. Note any luminaires showing degradation (visibly dim, flickering, dark). Mid-failure is a battery that is closer to end-of-life than the full duration.
              </li>
              <li>
                <strong>End-of-test observation.</strong> At the rated duration, every luminaire must still be illuminated. Where the design specifies an end-of-discharge minimum lux on critical points (some 2025 designs do), measure those points. Record the result per luminaire / per area.
              </li>
              <li>
                <strong>Restore mains.</strong> Re-energise the system. Record time of restoration.
              </li>
              <li>
                <strong>Confirm recovery starts.</strong> Within minutes of restoration, charging indicators should show on each luminaire (LED status) or on the central battery panel.
              </li>
              <li>
                <strong>24-hour recovery confirmation.</strong> 24 hours after mains restoration, verify state of charge ≥ 80% of rated capacity. For self-contained luminaires this is typically a charger LED status; for central battery a state-of-charge reading on the panel.
              </li>
              <li>
                <strong>Log the test.</strong> Date, start time, end time, rated duration, actual duration achieved, per-luminaire results (in summary tables; full per-luminaire detail attached), end-of-test observations, recovery start time, recovery confirmation time, tester signature.
              </li>
            </ol>
            <p>
              The duration test is the most informative single test on the periodic schedule. It exposes the gradual capacity decay that is the dominant battery failure mode and catches it before it becomes a real-emergency failure. It is also the most disruptive test — the planning is real work.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 50171:2021 · Clause 6.4 (Recovery time)"
            clause={
              <>
                After complete discharge, the central battery system shall recharge to not less than 80 % of rated capacity within 24 hours and to full rated capacity within the time specified by the manufacturer. Recovery times longer than these limits indicate a defect in the battery or charging system requiring corrective action.
              </>
            }
            meaning="The 24 h to 80% rule comes from BS EN 50171 for central battery and is mirrored in BS EN 50172 for self-contained. The clause is explicit that exceeding the limit is a defect. The corrective action is investigation — battery service or replacement, charger service or replacement."
          />

          {/* Duration test sequence and recovery diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              3-hour duration test sequence and recovery window
            </h4>
            <svg
              viewBox="0 0 820 480"
              className="w-full h-auto"
              role="img"
              aria-label="Timeline showing the 3-hour duration test phases (full charge, discharge, end-of-test verification, recovery to 80% within 24 hours, full recharge per manufacturer) and the reduced-protection window during recovery."
            >
              {/* Time axis */}
              <line x1="60" y1="360" x2="780" y2="360" stroke="rgba(255,255,255,0.4)" strokeWidth="1.4" />
              <text x="60" y="380" fill="rgba(255,255,255,0.6)" fontSize="9">T=0 h</text>
              <text x="220" y="380" fill="rgba(255,255,255,0.6)" fontSize="9">T=3 h</text>
              <text x="220" y="392" fill="rgba(255,255,255,0.55)" fontSize="8">end of test</text>
              <text x="430" y="380" fill="rgba(255,255,255,0.6)" fontSize="9">T=24 h post-mains</text>
              <text x="430" y="392" fill="rgba(255,255,255,0.55)" fontSize="8">≥ 80% reached</text>
              <text x="660" y="380" fill="rgba(255,255,255,0.6)" fontSize="9">T=72 h (typical)</text>
              <text x="660" y="392" fill="rgba(255,255,255,0.55)" fontSize="8">100% per mfr</text>

              {/* Phase: pre-test full charge */}
              <rect x="60" y="60" width="80" height="280" rx="6" fill="rgba(34,197,94,0.10)" stroke="#22C55E" strokeWidth="1.4" />
              <text x="100" y="80" textAnchor="middle" fill="#22C55E" fontSize="10" fontWeight="bold">Pre-test</text>
              <text x="100" y="94" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">Full charge</text>
              <text x="100" y="108" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="8">100%</text>

              {/* Phase: 3-hour discharge */}
              <rect x="140" y="60" width="80" height="280" rx="6" fill="rgba(239,68,68,0.10)" stroke="#EF4444" strokeWidth="1.4" />
              <text x="180" y="80" textAnchor="middle" fill="#EF4444" fontSize="10" fontWeight="bold">Discharge</text>
              <text x="180" y="94" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">3 h on battery</text>
              <text x="180" y="108" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="8">isolate mains</text>
              <text x="180" y="124" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="8">observe</text>

              {/* End-of-test verification */}
              <rect x="220" y="60" width="40" height="280" rx="6" fill="rgba(251,191,36,0.10)" stroke="#FBBF24" strokeWidth="1.4" />
              <text x="240" y="80" textAnchor="middle" fill="#FBBF24" fontSize="10" fontWeight="bold">End</text>
              <text x="240" y="94" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">Verify</text>
              <text x="240" y="108" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="8">all on</text>

              {/* Recovery to 80% within 24 h */}
              <rect x="260" y="60" width="220" height="280" rx="6" fill="rgba(168,85,247,0.10)" stroke="#A855F7" strokeWidth="1.4" />
              <text x="370" y="80" textAnchor="middle" fill="#A855F7" fontSize="10" fontWeight="bold">Recovery to ≥ 80%</text>
              <text x="370" y="94" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">≤ 24 h after mains restored</text>
              <text x="370" y="108" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="8">BS EN 50171/50172</text>
              <text x="370" y="124" textAnchor="middle" fill="#FBBF24" fontSize="9" fontWeight="bold">⚠ reduced-protection window</text>

              {/* Recovery to 100% per mfr */}
              <rect x="480" y="60" width="220" height="280" rx="6" fill="rgba(34,211,238,0.10)" stroke="#22D3EE" strokeWidth="1.4" />
              <text x="590" y="80" textAnchor="middle" fill="#22D3EE" fontSize="10" fontWeight="bold">Full recharge</text>
              <text x="590" y="94" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">to 100% per manufacturer</text>
              <text x="590" y="108" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="8">typical 12-72 h</text>

              {/* Capacity curve */}
              <path d="M 60,90 L 140,90 L 220,330 L 220,330 L 480,160 L 700,90" fill="none" stroke="#FBBF24" strokeWidth="2" strokeDasharray="3,2" />
              <text x="60" y="50" fill="#FBBF24" fontSize="10" fontWeight="bold">Battery capacity</text>

              {/* Y-axis markers */}
              <text x="50" y="94" textAnchor="end" fill="rgba(255,255,255,0.6)" fontSize="9">100%</text>
              <text x="50" y="166" textAnchor="end" fill="rgba(255,255,255,0.6)" fontSize="9">80%</text>
              <text x="50" y="334" textAnchor="end" fill="rgba(255,255,255,0.6)" fontSize="9">0%</text>
              <line x1="55" y1="160" x2="780" y2="160" stroke="rgba(168,85,247,0.4)" strokeWidth="1" strokeDasharray="2,2" />

              {/* Footer */}
              <text x="410" y="430" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                Schedule the discharge outside business hours so the recharge window aligns with low-occupancy periods
              </text>
              <text x="410" y="446" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                A second emergency during the recovery window finds reduced run-time available — the deficit is real and bounded by the 80%/24 h rule
              </text>
            </svg>
          </div>

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Scheduling and timing tolerance</ContentEyebrow>

          <ConceptBlock
            title="When to test"
            plainEnglish="The duration test creates a temporary protection deficit during the recharge period. Until the batteries are back to ≥ 80%, the system has less than full capability. If the system is needed during the recharge window, it will deliver less run-time than rated. The standard mitigation is to schedule the test out-of-hours so the recharge window aligns with the lowest-occupancy period of the building. For a 9-to-5 office, an evening start (e.g. 18:00) gives a 3-hour test ending at 21:00, with recharge running through the night and most of the working day — ≥ 80% reached well before the next out-of-hours risk window."
          >
            <p>Scheduling principles:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Out-of-hours where practical.</strong> Office buildings: late evening start. 24-hour buildings: lowest-occupancy period (typically very early morning). Industrial sites: weekend.
              </li>
              <li>
                <strong>Avoid back-to-back full-duration tests.</strong> Each test depletes the batteries. Two tests close together compound the recovery requirement and may exceed the chemistry tolerance for some batteries. Stick to the annual cadence; do not run an unscheduled second test in the same calendar period without justification.
              </li>
              <li>
                <strong>Do not run a duration test immediately after a long real mains failure.</strong> If the mains has been off for an extended period (e.g. several hours) and the batteries are still recovering, postpone the scheduled test. The state of charge must be at full before a duration test begins.
              </li>
              <li>
                <strong>Coordinate with fire alarm testing.</strong> Where the fire alarm is on the same maintenance contract, schedule the duration test for a different night to avoid both safety systems being in test simultaneously. The risk of two simultaneous test windows is unnecessary.
              </li>
              <li>
                <strong>Notify the responsible person.</strong> Written notice of the test window. Arrangements for any building users on site (security, cleaning, overnight occupants).
              </li>
              <li>
                <strong>Have spares on hand.</strong> Batteries (the most common consumable that fails during duration testing), lamps, occasional electronic boards. The test that finds a fault should leave the contractor able to remediate before leaving site, not waiting on parts.
              </li>
            </ul>
            <p>
              The 2025 schedule consistency expectation runs through all of this — the duration test should fall within the 12-month anniversary of the previous test (with documented tolerance), not drift later year on year. A drift of weeks per year compounds into months of lost cadence over a contract life.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Running a duration test during business hours to suit the contractor"
            whatHappens="The maintenance contractor is on site for the day on routine work and decides to add the annual duration test to the day's tasks for efficiency. The test starts at 11:00 and runs to 14:00 — the busiest period of the building. Maintained luminaires illuminate visibly throughout. Recovery runs through the afternoon and evening. At 19:00 (still during recovery, batteries at 70%), there is a real mains failure. The system delivers 2 hours instead of the rated 3, and one zone of the building goes dark before evacuation completes."
            doInstead="The duration test creates a real protection deficit during the recharge window. Schedule out-of-hours so that deficit aligns with low-occupancy time. The contractor's convenience is not a justification for testing during occupancy. Plan the test as a discrete event — agreed window, staff notified, observers in place — not as a casual addition to a day's other work."
          />

          <CommonMistake
            title="Testing every emergency luminaire on the same day across a large estate"
            whatHappens="A facilities team running a multi-building estate schedules all emergency lighting duration tests for the same maintenance day, across all buildings. During the recharge window (24 h after the test), every building has a temporarily reduced protection. A widespread mains event during the recharge window finds the entire estate compromised."
            doInstead="Stagger the duration tests across the estate. Different buildings on different nights. The recharge window for any single building should fall outside the recharge window for any other. Self-test systems can be configured to avoid simultaneous duration cycles. The cost of staggering is small; the risk of synchronised reduced-protection windows across an estate is not."
          />

          <SectionRule />

          <ContentEyebrow>Self-test luminaires</ContentEyebrow>

          <ConceptBlock
            title="What self-test does and does not replace"
            plainEnglish="A self-test luminaire performs the monthly functional test and the annual duration test automatically — discharging the battery for the appropriate duration, observing the response electronically, logging the result, and reporting via local LED indication or central controller. The benefits are real: the schedule is enforced electronically; the test is consistent every time; the human time required for routine testing is reduced; the logbook is electronic and auditable. The limitations are also real: self-test does not replace the human visual inspection (LED indicators can themselves fail without flagging), does not replace the photometric survey (the luminaire cannot measure its own delivered lux at the floor), and does not replace BS 7671 periodic verification (the luminaire is not testing the wiring system)."
          >
            <p>What self-test gives you:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Automated functional test.</strong> Monthly, on schedule, on every luminaire. The luminaire briefly disconnects from mains and runs on battery, observing changeover and illumination via internal sensors. Pass/fail logged.
              </li>
              <li>
                <strong>Automated duration test.</strong> Annual, on schedule, full rated duration. The luminaire runs on battery for the design duration; logs the result.
              </li>
              <li>
                <strong>Electronic logbook.</strong> Per-luminaire test history accessible via central controller, app, or local indicator. Acceptable as the BS 5266-1 logbook entry where the system is configured to retain the data and produce reports.
              </li>
              <li>
                <strong>Failure flagging.</strong> Any failed test illuminates a fault LED on the luminaire and (where central controller used) flags on the controller, allowing targeted maintenance.
              </li>
            </ul>
            <p>What self-test does NOT replace:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Visual inspection.</strong> The human walk-around at the periodic intervals. Catches: damaged luminaires, obstructions, signage degradation, label legibility, environmental concerns. The luminaire's self-test does not see the room.
              </li>
              <li>
                <strong>Five-yearly photometric survey.</strong> The luminaire cannot measure delivered lux at the floor. Only a calibrated lux meter on a human survey can do that. The 2025 update made this explicit.
              </li>
              <li>
                <strong>BS 7671 periodic verification.</strong> The luminaire does not test the wiring system. Insulation, continuity, polarity, Zs are external to the self-test scope.
              </li>
              <li>
                <strong>Status of the self-test system itself.</strong> The self-test electronics can fail. A fault LED stuck off would not flag a failure. Periodic visual inspection of the self-test indicators is the cross-check.
              </li>
            </ul>
            <p>
              Self-test is a powerful aid but not a complete substitute. Use it to automate the schedule discipline; do not let it remove the competent person from the loop.
            </p>
          </ConceptBlock>

          <Scenario
            title="Self-test electronic logbook accepted by insurer"
            situation="A multi-tenanted office building has 800 emergency luminaires across six floors, all self-test type with a central addressable controller. The maintenance contractor downloads the controller's test log monthly and includes it as an appendix to the periodic inspection report. The building insurer audits the system after a small claim. The insurer accepts the controller log as the BS 5266-1 logbook entry on the basis that (a) it is contemporaneous, (b) it identifies each luminaire individually, (c) it shows the schedule has been kept, (d) the visual inspection and photometric survey records are also on file, (e) the competent person's signature ratifies the log."
            whatToDo="The lesson: a properly configured self-test electronic log is acceptable as the BS 5266-1 logbook entry, but only when supported by the human-led elements (visual, photometric, BS 7671) and ratified by a competent person. Set up the controller to retain logs, configure reporting, train the responsible person to read the log, ensure the contractor downloads and reviews. Do not assume self-test alone is enough — the rest of the framework still applies."
            whyItMatters="Insurers and fire authorities are increasingly comfortable with electronic logbooks for self-test installations — they actually provide better evidence than paper because they cannot be retrospectively backdated. But the acceptance is conditional on the supporting framework (visual, photometric, competent signature). Self-test alone, with no other evidence, is not the BS 5266-1 model."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Edge cases — what to do when something goes wrong</ContentEyebrow>

          <ConceptBlock
            title="Failures during testing — how to respond"
            plainEnglish="Most tests pass cleanly. The minority that do not test the contractor's diagnostic skill and the contractor's discipline. The wrong response — assume the test is wrong, repeat until it passes, ignore the failure — is a regulatory exposure. The right response — investigate, identify the root cause, remediate, re-test — is the only defensible answer."
          >
            <p>The recurring failure patterns and the correct response:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Whole circuit goes dark immediately.</strong> Likely cause: circuit isolated incorrectly (mains is still on the luminaires somewhere, so the test is not actually testing emergency operation), or the circuit truly has total failure across all luminaires (unlikely but possible — typically a wiring fault or supply error). Check the test method first. If the test method is correct and all luminaires fail simultaneously, the fault is upstream — investigate the supply path, not individual luminaires.
              </li>
              <li>
                <strong>Random scattered single-luminaire failures.</strong> Battery age. Each failure is independent — replace batteries at each failed luminaire, log the replacement, schedule a re-verification. If failures cluster around a particular install date, consider whether the original batch is at end of life (typical for early-installed batteries reaching the 4-5 year mark together).
              </li>
              <li>
                <strong>Duration short by 10-20%.</strong> Capacity decay across the installation. Schedule a battery replacement programme. Where the system is approaching 4-5 years from initial install, this is a normal end-of-life signal and the budget for replacement should already have been secured.
              </li>
              <li>
                <strong>Recovery slow but eventually completes.</strong> Charger derating (charger working at reduced output) or marginal battery. Investigate charger first (easier to remediate); if the charger is good, consider battery replacement. Document the slow recovery as a defect even though the system did eventually recover.
              </li>
              <li>
                <strong>Self-test reports OK but visual reveals a failed luminaire.</strong> The self-test electronics have failed without flagging. Replace the luminaire (electronics fault not separately repairable in most consumer products). Increase the visual cross-check frequency on similar units.
              </li>
              <li>
                <strong>Central battery panel shows alarm but luminaires illuminate.</strong> Could be a panel fault (alarm raised in error) or a real fault that is not yet manifesting at the luminaires (e.g. one battery cell weak in a multi-cell string). Investigate the panel diagnostics; do not silence the alarm without root cause.
              </li>
              <li>
                <strong>Test is interrupted (real mains restored prematurely).</strong> Test invalid; restart from full charge after the next available recovery window. Do not extrapolate from a partial test to claim a pass.
              </li>
            </ul>
            <p>
              The discipline is: a failure is data, not a problem to be talked around. The logbook records the failure honestly, the corrective action records what was done, the re-test records the verification. If a future investigation looks at the logbook, the chain of evidence must be clean.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Logbook discipline</ContentEyebrow>

          <ConceptBlock
            title="What the logbook entry contains"
            plainEnglish="The BS 5266-1 logbook is the contemporaneous record of every test, every observation, every fault, every repair. Insurers, fire authorities, and tribunal investigators rely on it. A logbook missing entries, with backdated entries, or with vague entries provides no defence. The logbook should be kept like a flight log — every test recorded the day it happened, signed at the time, in enough detail to reconstruct what was done and what was found years later."
          >
            <p>Per-test logbook content:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Date and time of test.</strong> When it was carried out. Start time and end time for duration tests.
              </li>
              <li>
                <strong>Test type.</strong> Functional / duration / commissioning / fault investigation. Be specific.
              </li>
              <li>
                <strong>Scope.</strong> What was tested — whole installation, specific zones, specific circuits. For a partial test, document why.
              </li>
              <li>
                <strong>Method.</strong> How the test was performed — circuit interrupted, test facility used, central battery test mode, controller-initiated. Sufficient to allow reconstruction.
              </li>
              <li>
                <strong>Observations.</strong> Per-luminaire results (in summary tables for large installations; per-luminaire detail for fault investigation). Self-test electronic logs as appendix.
              </li>
              <li>
                <strong>Faults.</strong> Any luminaire or system that did not pass. Reference, observation, suspected cause.
              </li>
              <li>
                <strong>Corrective action.</strong> What was done about the fault — replacement, repair, escalation. Date of corrective action; verification re-test.
              </li>
              <li>
                <strong>Recovery.</strong> For duration tests, recovery start time and 24-h confirmation of ≥ 80% capacity.
              </li>
              <li>
                <strong>Tester.</strong> Name, qualification, signature. The competent person.
              </li>
              <li>
                <strong>Cross-references.</strong> Photometric survey (if same visit), visual inspection (if same visit), BS 7671 verification (if same visit). The logbook ties together the elements of the periodic regime.
              </li>
            </ul>
            <p>
              The logbook is the operational memory of the installation. Future maintainers, future verifiers, and any future investigation rely on it. Filling it in properly each time is the single most important discipline of periodic testing.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Functional test: brief mains-fail simulation (5-15 min), monthly cadence, verifies operation and catches step-change failures.',
              'Duration test: full discharge for rated duration (typically 3 h), annual cadence, verifies sustained capacity and catches gradual battery decay.',
              'Both tests required by BS EN 50172:2024 and BS 5266-1:2025. Neither replaces the other.',
              'Recovery: ≥ 80% of rated capacity within 24 h of mains restoration per BS EN 50171/50172. Slower recovery = defect.',
              'Schedule duration tests outside business hours so the reduced-protection recharge window aligns with low occupancy.',
              '2025 emphasis: schedule consistency. Monthly within calendar month, annual within 12-month anniversary, deviations documented.',
              'Self-test luminaires automate functional and duration testing and provide electronic logbooks. They do NOT replace visual inspection, photometric survey, or BS 7671 verification.',
              'Stagger tests across an estate — never have all buildings in the same recharge window simultaneously.',
              'Single-luminaire failure during duration test: continue test for system result; investigate failed luminaire afterwards. Most common cause is age-related battery capacity loss.',
              'Logbook entry per test: date, type, scope, method, observations, faults, corrective action, recovery, tester signature. Contemporaneous, not backdated.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'Can I do a functional test instead of a duration test, to save battery wear?',
                answer:
                  'No. The functional test does not replace the duration test — they catch different failure modes. The functional test does not verify capacity (because it is too short to expose capacity decay). Skipping the duration test means the gradual battery capacity decay (the dominant failure mode after 3-5 years) goes undetected until a real emergency reveals it. The 2025 standard is firm on this; some past-practice patterns of substituting functional for duration are now declared non-compliant.',
              },
              {
                question: 'How long does battery wear from annual duration testing affect overall battery life?',
                answer:
                  'Modern emergency lighting batteries (typically NiCd, NiMH, or LiFePO4 chemistry) are designed for the periodic test cycle. The annual full discharge plus 11 monthly partial discharges is within the design cycle life. Manufacturer life ratings (typically 3-5 years for NiCd, 4-7 years for LiFePO4) account for this regime. Skipping tests does not extend battery life meaningfully; it just means defects are detected later. The annual duration test is part of the ownership cost.',
              },
              {
                question: 'What if our building is 24/7 and we cannot find an out-of-hours window?',
                answer:
                  'Two options. First, a low-occupancy period (e.g. 03:00-07:00 in a hospital) is still substantially less risk than 11:00-15:00 — schedule there. Second, where genuinely no window exists, the test is run during operation with explicit responsible-person agreement and the fire authority informed. Some installations split the test by zone — test zone A while zone B is still on full mains, then swap. The 2025 standard accommodates these arrangements with the consistency-of-schedule emphasis; document the arrangement and stick to it.',
              },
              {
                question: 'How is a central battery duration test different from self-contained?',
                answer:
                  'The central battery is a single energy source feeding many slave luminaires. The duration test is a single discharge event observed at the central battery panel (state of charge, discharge profile) and at each slave luminaire (still illuminated through the duration). The central battery side has more instrumentation (panel readouts, capacity gauge) than self-contained; the slave luminaires must still be visually verified. Recovery is at the central battery, observed on the panel; individual slaves do not have batteries to recover. Capacity issues localise to the central battery (not to individual luminaires) — when something fails, it is a system event, not a per-luminaire one.',
              },
              {
                question: 'Can I run a duration test in zones to limit the protection deficit?',
                answer:
                  'Yes, where the design supports zoned testing. Zone A runs in test mode while Zone B is still fully charged on mains; complete Zone A, allow recovery, then Zone B. This limits the deficit to one zone at any given time. Self-test luminaires can be configured to stagger automatically; central battery systems usually require manual or programmed sequencing. Document the zoning in the test method; the result must still cover the whole installation across the year.',
              },
              {
                question: 'What does a typical battery failure look like during duration?',
                answer:
                  'Three patterns. (1) Early total failure — luminaire goes dark in the first few minutes, indicating a battery that has gone open-circuit or a fault that the brief functional test could just sustain. (2) Mid-test fade — luminaire visibly dims at 60-80% of duration, indicating partial capacity loss. (3) Late failure — luminaire goes dark in the last 15-20 minutes, indicating a battery near end of life with capacity reduced by 10-15% but still substantially functional. Pattern (1) is rare and dramatic; (2) and (3) are normal end-of-life signatures and the duration test catches them at the right time.',
              },
              {
                question: 'Is a duration test on a partially-charged battery acceptable?',
                answer:
                  'No. The test result would be unreliable — a battery starting at 80% will deliver less than rated duration on a 3-hour discharge, but that does not mean the battery is defective; it means the test was run from the wrong starting state. Always confirm full charge before initiating a duration test. If the system has been recently exercised (e.g. a real mains failure within the past 24 h), postpone the duration test until full recovery is confirmed.',
              },
              {
                question: 'What if the responsible person refuses to allow the annual duration test?',
                answer:
                  'The annual duration test is a BS EN 50172:2024 / BS 5266-1:2025 requirement and a regulatory expectation under the RRO 2005. Refusal places the responsible person in non-compliance. The contractor should write to the responsible person setting out the requirement, the consequences of omission, and the contractual position. If refusal continues, the contractor cannot reliably maintain the system to standard; the position must be escalated, recorded, and may end the contract. The competent person cannot be coerced into omitting required tests.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Functional and 3-hour duration tests — Module 5.2" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 5
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-5-section-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.3 Monthly and annual testing
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

export default EmergencyLightingModule5Section2;
