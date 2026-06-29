/**
 * Module 5 · Section 5 · Subsection 5 — Witness Testing
 * HNC Electrical Engineering for Building Services (Project Management — Pearson U4004 + BSE PM context)
 *   Client/designer attendance at testing milestones — formal acceptance of work against the specification through witnessed verification.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  CommonMistake,
  ConceptBlock,
  FAQ,
  KeyTakeaways,
  LearningOutcomes,
  RegsCallout,
  Scenario,
  SectionRule,
  TLDR,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Witness Testing - HNC Module 5 Section 5.5';
const DESCRIPTION =
  'Master witness testing procedures for building services: client attendance requirements, documentation standards, sign-off procedures, acceptance protocols, and failed test procedures.';

const quickCheckQuestions = [
  {
    id: 'witness-test-purpose',
    question: 'What is the primary purpose of witness testing?',
    options: [
      'To provide independent verification that systems meet specification',
      'To reduce the contractor’s liability for defects after handover',
      'To replace the need for formal commissioning documentation',
      'To allow the client to negotiate a lower final account figure',
    ],
    correctIndex: 0,
    explanation:
      "Witness testing provides independent verification that installed systems meet the specification requirements. It allows the client's representative to observe tests being performed and confirm acceptable results.",
  },
  {
    id: 'notification-period',
    question: 'What is the typical minimum notice period required for witness testing?',
    options: [
      '5 working days',
      '48 hours',
      '24 hours',
      '10 working days',
    ],
    correctIndex: 0,
    explanation:
      "Industry standard requires a minimum of 5 working days' notice for witness testing to allow client representatives to schedule attendance. This is typically specified in the contract preliminaries.",
  },
  {
    id: 'failed-test-action',
    question: 'If a witness test fails, what is the correct procedure?',
    options: [
      'Record the failure, rectify the issue, and reschedule the specific test',
      'Continue with remaining tests and address failures later',
      'Ask the client to sign off despite the failure',
      'Immediately terminate the testing session',
    ],
    correctIndex: 0,
    explanation:
      'Failed tests must be recorded in the witness test documentation with details of the deficiency. The contractor rectifies the issue and arranges a re-test with appropriate notice to the client.',
  },
  {
    id: 'sign-off-authority',
    question: 'Who should sign witness test documentation on behalf of the client?',
    options: [
      'The installing electrician',
      "The main contractor's site manager",
      'An authorised client representative named in the contract',
      'Any site visitor',
    ],
    correctIndex: 0,
    explanation:
      'Only authorised client representatives (typically named in contract documents or formally delegated) have authority to sign witness test documentation. Their signature confirms the client accepts the test results.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What documentation should be prepared before a witness testing session?',
    options: [
      'A list of outstanding snagging items left for the next contractor',
      'Test procedure, acceptance criteria, equipment list, and blank results sheets',
      'Only the manufacturer’s data sheets for the installed equipment',
      'A summary of the project programme and the remaining payment schedule',
    ],
    correctAnswer: 1,
    explanation:
      'Before witness testing, prepare the test procedure, defined acceptance criteria from the specification, calibrated test equipment list, and blank results sheets. This ensures efficient, professional testing sessions.',
  },
  {
    id: 2,
    question: 'What is the purpose of a witness test schedule?',
    options: [
      'To record the actual measured results of each completed witness test',
      'To list the calibration dates of all test instruments on site',
      'To programme testing dates and notify all parties of attendance requirements',
      'To allocate which contractor is responsible for each item of plant',
    ],
    correctAnswer: 2,
    explanation:
      "A witness test schedule programmes all required tests with proposed dates, allowing coordination with the client's representative and ensuring adequate notice for attendance at each test.",
  },
  {
    id: 3,
    question:
      'During an emergency lighting witness test, the client representative arrives 30 minutes late. What should you do?',
    options: [
      'Abandon the test and reschedule it for a later date with fresh notice',
      'Restart the three-hour duration test from the beginning so they see it all',
      'Continue without comment and have them sign as though they saw the full test',
      'Brief them on progress, allow them to witness the remaining duration test',
    ],
    correctAnswer: 3,
    explanation:
      'Brief the late arrival on progress and allow them to witness the remaining test duration. Document their late arrival on the test sheet. The test can proceed if meaningful verification is still possible.',
  },
  {
    id: 4,
    question:
      'What should be recorded if the client fails to attend a properly notified witness test?',
    options: [
      "Record non-attendance and proceed with the test as 'deemed witnessed'",
      "Postpone the test indefinitely until the client confirms a new date",
      "Carry out the test but leave the results unsigned and unrecorded",
      "Treat the client's absence as automatic rejection of the installation",
    ],
    correctAnswer: 0,
    explanation:
      "If proper notice was given (typically 5 working days) and the client fails to attend, record non-attendance, proceed with the test, and document results. Most contracts allow tests to be 'deemed witnessed' in these circumstances.",
  },
  {
    id: 5,
    question:
      'A fire alarm witness test requires a 100% detector test. How should this be demonstrated?',
    options: [
      'Test every tenth detector and extrapolate',
      'Test each detector individually, recording device address and response',
      "Submit manufacturer's test certificates",
      'Conduct a general evacuation drill only',
    ],
    correctAnswer: 1,
    explanation:
      'A 100% detector test requires each detector to be individually activated (using appropriate test equipment), with the panel response verified and recorded by device address. This proves every detector functions correctly.',
  },
  {
    id: 6,
    question: 'What is the role of hold points in commissioning and witness testing?',
    options: [
      'To mark the points where test instruments must be recalibrated',
      'To identify where temporary supplies may be safely isolated',
      'To define stages where work must not proceed without client approval',
      'To record where additional access equipment will be needed',
    ],
    correctAnswer: 2,
    explanation:
      'Hold points are defined stages in the commissioning process where work cannot proceed until the client has witnessed and approved the preceding tests. They are critical for quality assurance on complex installations.',
  },
  {
    id: 7,
    question: 'What information must a witness test sign-off sheet contain?',
    options: [
      'Only the date of the test and the name of the attending client',
      'The contractor’s payment application reference and retention figure',
      'A photograph of the installation and the manufacturer’s warranty details',
      'Test description, acceptance criteria, actual results, pass/fail status, and signatures',
    ],
    correctAnswer: 3,
    explanation:
      'Witness test sign-off sheets must include: test description, acceptance criteria from specification, actual measured/observed results, clear pass/fail status, date, and signatures of both contractor and client representative.',
  },
  {
    id: 8,
    question:
      'During witness testing, the specified acceptance criterion is 85% of rated output. The system achieves 83%. What should happen?',
    options: [
      'Record as failed, investigate cause, rectify, and re-test',
      'Record as a pass because the result is within normal measurement tolerance',
      'Adjust the acceptance criterion down to 83% to reflect site conditions',
      'Pass the test but list the shortfall as a snagging item for later',
    ],
    correctAnswer: 0,
    explanation:
      'If a test fails to meet the specified acceptance criteria, it must be recorded as failed regardless of how close the result. The contractor investigates, rectifies, and arranges a re-test. Any derogations require formal agreement.',
  },
  {
    id: 9,
    question: 'What is the significance of the Inspection Test Plan (ITP) in witness testing?',
    options: [
      'It is a daily record of which operatives attended site during commissioning',
      'It lists all tests required, inspection levels, hold points, and acceptance criteria',
      'It is the manufacturer’s recommended maintenance schedule for the plant',
      'It is the contractor’s method statement for working safely at height',
    ],
    correctAnswer: 1,
    explanation:
      'The Inspection Test Plan (ITP) is the master document listing all required tests, inspection levels (witness/hold/surveillance), acceptance criteria, and responsibilities. It ensures nothing is missed during commissioning.',
  },
  {
    id: 10,
    question: 'After successful witness testing, what must be handed over to the client?',
    options: [
      'A verbal confirmation from the site manager that all tests passed',
      'The contractor’s internal cost records for the commissioning works',
      'Signed test records, commissioning data, and certificates',
      'Only the certificates, with the test results retained by the contractor',
    ],
    correctAnswer: 2,
    explanation:
      'Successful witness testing requires handover of signed witness test records, commissioning data sheets showing all settings and results, and relevant compliance certificates. These form part of the O&M documentation.',
  },
];

const faqs = [
  {
    question: 'What happens if the client continuously fails to attend witness tests?',
    answer:
      "Most contracts include a 'deemed witnessed' clause. If proper notice is given (typically 5 working days minimum) and the client fails to attend, the contractor proceeds with the test, documents results, and the test is deemed witnessed. This prevents clients from delaying projects by non-attendance. Always confirm your contract terms and document all notification attempts.",
  },
  {
    question: 'Can witness test results be retrospectively signed?',
    answer:
      'Retrospective signing should be avoided as it undermines the purpose of witness testing. If unavoidable (e.g., late arrival), the sign-off sheet should clearly note that the signatory did not witness the entire test. Some clients refuse retrospective sign-off entirely, requiring a complete re-test with full attendance.',
  },
  {
    question: 'Who pays for re-tests when witness tests fail?',
    answer:
      'If failure is due to contractor deficiencies (installation errors, equipment faults), the contractor bears all re-test costs. If failure results from design issues or client changes, additional costs may be claimable. Document the cause of failure clearly to support any claims.',
  },
  {
    question: 'What level of detail is required in witness test documentation?',
    answer:
      'Documentation must be sufficient for an independent party to verify the test was conducted correctly and results meet acceptance criteria. This includes: test procedure reference, equipment used (with calibration dates), environmental conditions if relevant, all measured values, clear pass/fail determination, and dated signatures.',
  },
  {
    question: 'Can witness testing be conducted remotely?',
    answer:
      'Remote witnessing (via video link) has become more accepted, particularly since 2020. However, it requires prior agreement in the contract, suitable technology with recorded evidence, and clear protocols. Many clients still require physical attendance for critical systems (fire, life safety). Always confirm acceptability before proposing remote witnessing.',
  },
  {
    question: 'What is the difference between witness testing and snagging?',
    answer:
      "Witness testing verifies that systems function correctly against specified acceptance criteria - it's a formal pass/fail process. Snagging identifies minor defects, incomplete works, or aesthetic issues that don't affect system function. Both occur before handover, but witness testing typically precedes snagging.",
  },
];

const HNCModule5Section5_5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 5 · Section 5 · Subsection 5"
            title="Witness Testing"
            description="Client attendance requirements, documentation standards, sign-off procedures, and acceptance protocols."
            tone="purple"
          />

          <TLDR
            points={[
              "Witness testing = client/designer/independent attends and observes specified tests, typically with formal sign-off authority.",
              "Witness points scheduled in the ITP and the commissioning programme — never surprise calls to the client.",
              "Notification: typically 5 working days minimum; client can attend or accept written results.",
              "Witness pack: test method statement, calibration certificates, test record sheet, sign-off form — issued before the test.",
              "Failed witness test = NCR, root cause investigation, rectification, re-witness — never quietly proceed.",
            ]}
          />

          <RegsCallout
            source="CIBSE Commissioning Code M — Witnessing"
            clause="Witnessing is a key element of the commissioning process. The Commissioning Manager shall plan witness testing with the client representative or their nominee, give appropriate notice, and ensure that test method statements, calibration evidence and record sheets are available at the witness event."
            meaning={
              <>
                Code M makes witnessing a managed process — planned, notified, supported with documentation. Surprise tests where the witness arrives to find the contractor unprepared damage the project relationship and risk failed acceptance. Discipline at witness stage signals the project's overall quality posture.
              </>
            }
            cite="Source: CIBSE Commissioning Code M (refer to CIBSE published text for verbatim clauses)."
          />


          <LearningOutcomes
            outcomes={[
              'Understand the purpose and importance of witness testing',
              'Apply correct notification procedures for client attendance',
              'Prepare comprehensive test documentation and sign-off sheets',
              'Manage failed test procedures professionally',
              'Implement hold points and inspection test plans',
              'Handle non-attendance and deemed witnessed situations',
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Purpose of Witness Testing">
            <p>
              Witness testing is a formal process where the client's representative observes tests
              being performed on installed systems to verify they meet specification requirements.
              It provides independent assurance that the installation functions correctly before
              handover and acceptance.
            </p>
            <p>
              <strong>Key objectives of witness testing:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Verification:</strong> Confirm installed systems meet specified performance
                criteria
              </li>
              <li>
                <strong>Transparency:</strong> Demonstrate test procedures and results to the client
              </li>
              <li>
                <strong>Documentation:</strong> Create signed evidence of system compliance
              </li>
              <li>
                <strong>Acceptance:</strong> Formal sign-off enabling practical completion
              </li>
            </ul>
            <p>
              <strong>Typical witness tests in building services:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Fire alarm:</strong> 100% detector test, cause and effect, sounders — Half
                to full day
              </li>
              <li>
                <strong>Emergency lighting:</strong> 3-hour duration test, lux level verification —
                3+ hours
              </li>
              <li>
                <strong>LV distribution:</strong> Phase rotation, protection coordination, load test
                — Half to full day
              </li>
              <li>
                <strong>Generator:</strong> Load bank test, auto-start, synchronisation — Full day
              </li>
              <li>
                <strong>BMS:</strong> Point-to-point verification, alarms, graphics — Multiple days
              </li>
            </ul>
            <p>
              <strong>Key principle:</strong> Witness testing is not a diagnostic exercise - systems
              should be fully commissioned and known to work before inviting the client to witness.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Notification Requirements and Attendance">
            <p>
              Proper notification is essential for witness testing. Contracts typically specify
              minimum notice periods and the consequences of non-attendance by either party.
            </p>
            <p>
              <strong>Notification requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Minimum 5 working days' notice (typical)</li>
              <li>Written notification (email acceptable)</li>
              <li>State test type, location, proposed date/time</li>
              <li>Request confirmation of attendance</li>
              <li>Reference contract clause for deemed witnessed</li>
            </ul>
            <p>
              <strong>Attendee responsibilities:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Arrive on time with appropriate PPE</li>
              <li>Bring relevant specification documents</li>
              <li>Authority to sign on behalf of client</li>
              <li>Technical competence to verify test methods</li>
              <li>Decision-making authority for pass/fail</li>
            </ul>
            <p>
              <strong>Deemed witnessed clause:</strong> Most contracts include a deemed witnessed
              clause: if the contractor provides proper notice and the client fails to attend
              without requesting postponement, the contractor may proceed and the test is deemed
              witnessed. Document everything - notification sent, no response received, test
              proceeded as scheduled.
            </p>
            <p>
              <strong>Witness test schedule example:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Fire alarm cause & effect:</strong> Proposed 15/02/2026 — Notice 05/02/2026
                — Confirmed
              </li>
              <li>
                <strong>Emergency lighting 3hr:</strong> Proposed 18/02/2026 — Notice 08/02/2026 —
                Awaiting
              </li>
              <li>
                <strong>Generator load test:</strong> Proposed 22/02/2026 — Notice 12/02/2026 —
                Confirmed
              </li>
              <li>
                <strong>BMS point-to-point:</strong> Proposed 25/02/2026 — Notice 15/02/2026 —
                Scheduled
              </li>
            </ul>
            <p>
              <strong>Best practice:</strong> Issue a consolidated witness test schedule at project
              start and update weekly during commissioning phase.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Documentation and Sign-off Procedures">
            <p>
              Witness test documentation must be comprehensive, accurate, and provide clear evidence
              of test outcomes. Well-prepared documentation demonstrates professionalism and
              protects all parties.
            </p>
            <p>
              <strong>Essential documentation elements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Test procedure:</strong> Step-by-step method statement for the test
              </li>
              <li>
                <strong>Acceptance criteria:</strong> Specific pass/fail values from specification
              </li>
              <li>
                <strong>Equipment list:</strong> Test instruments with calibration certificates
              </li>
              <li>
                <strong>Results sheet:</strong> Pre-formatted for recording actual values
              </li>
              <li>
                <strong>Sign-off section:</strong> Spaces for signatures, names, dates, and comments
              </li>
            </ul>
            <p>
              <strong>Witness test record sheet — header information:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Project name and reference</li>
              <li>Test description and reference number</li>
              <li>Location/area being tested</li>
              <li>Date and time of test</li>
              <li>Specification clause reference</li>
            </ul>
            <p>
              <strong>Witness test record sheet — results section:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Acceptance criterion (specified value)</li>
              <li>Actual result (measured/observed)</li>
              <li>Pass/Fail status (clear indication)</li>
              <li>Comments/observations</li>
              <li>Re-test requirements if failed</li>
            </ul>
            <p>
              <strong>Sign-off requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Commissioning engineer (Contractor):</strong> Confirms test conducted per
                procedure, results accurate
              </li>
              <li>
                <strong>Site supervisor (Contractor):</strong> Confirms test overseen, resources
                adequate
              </li>
              <li>
                <strong>Client representative (Client/CA):</strong> Confirms test witnessed, results
                accepted
              </li>
              <li>
                <strong>M&E consultant (Designer):</strong> Confirms test meets specification intent
                (if attending)
              </li>
            </ul>
            <p>
              <strong>Critical — calibration records:</strong> All test equipment must have valid
              calibration certificates. Record instrument serial numbers and calibration dates on
              witness test documentation. Tests conducted with uncalibrated equipment may be
              rejected and require repetition.
            </p>
            <p>
              <strong>Professional tip:</strong> Prepare all documentation before the test day.
              Arriving with blank or incomplete paperwork reflects poorly on the contractor.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Failed Test Procedures and Acceptance Protocols">
            <p>
              Not all witness tests pass first time. Having a clear procedure for managing failures
              maintains professionalism and keeps the project on track. The key is transparency and
              prompt rectification.
            </p>
            <p>
              <strong>Failed test procedure:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Record the failure:</strong> Document exactly what failed and by how much
              </li>
              <li>
                <strong>Agree the deficiency:</strong> Ensure client representative agrees with the
                failure assessment
              </li>
              <li>
                <strong>Investigate cause:</strong> Determine whether installation error, equipment
                fault, or design issue
              </li>
              <li>
                <strong>Propose rectification:</strong> Provide method and timescale for correction
              </li>
              <li>
                <strong>Schedule re-test:</strong> Agree new date with appropriate notice period
              </li>
              <li>
                <strong>Document resolution:</strong> Link re-test results to original failure
                record
              </li>
            </ul>
            <p>
              <strong>What NOT to do:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Argue that the failure is "close enough"</li>
              <li>Blame the specification or design</li>
              <li>Ask the client to sign off despite failure</li>
              <li>Leave the failure undocumented</li>
              <li>Delay rectification indefinitely</li>
            </ul>
            <p>
              <strong>Professional approach:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Accept responsibility professionally</li>
              <li>Focus on solution, not blame</li>
              <li>Provide realistic rectification timescale</li>
              <li>Keep client informed of progress</li>
              <li>Ensure first-time pass at re-test</li>
            </ul>
            <p>
              <strong>Acceptance protocols:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Full acceptance:</strong> All tests pass, documentation complete, system
                handed over
              </li>
              <li>
                <strong>Conditional acceptance:</strong> Minor items outstanding, listed for
                completion within agreed period
              </li>
              <li>
                <strong>Partial acceptance:</strong> Some areas/systems accepted while others
                require further work
              </li>
              <li>
                <strong>Derogation:</strong> Formal agreement to accept performance below
                specification (requires written approval)
              </li>
            </ul>
            <p>
              <strong>Real-world example — fire alarm cause and effect failure:</strong> During
              witness testing of a fire alarm cause and effect matrix, activating Zone 3 detectors
              fails to release the magnetic door holders on Fire Exit 2 as specified.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Recorded failure:</strong> Zone 3 detection did not trigger output to
                MagLock 2
              </li>
              <li>
                <strong>Investigation:</strong> Cause and effect programming error - output not
                mapped
              </li>
              <li>
                <strong>Rectification:</strong> Panel reprogrammed by fire alarm engineer
              </li>
              <li>
                <strong>Re-test:</strong> Scheduled for 3 days later, client notified
              </li>
              <li>
                <strong>Outcome:</strong> Re-test passed, linked to original failure record
              </li>
            </ul>
            <p>
              <strong>Contract tip:</strong> Review your contract for maximum time allowed between
              failed test and re-test. Missing deadlines may incur liquidated damages.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — Emergency lighting witness test:</strong> Conduct a 3-hour
              duration test on emergency lighting installation.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Notify client 5 working days in advance</li>
              <li>Prepare lux meter (calibrated), test log sheet</li>
              <li>Confirm all luminaires fully charged (min 24hrs)</li>
              <li>1. Record mains supply on, note start time: 09:00</li>
              <li>2. Simulate mains failure at distribution board</li>
              <li>3. Verify all emergency luminaires illuminate</li>
              <li>4. Take lux readings at designated points</li>
              <li>5. Monitor throughout 3-hour period</li>
              <li>6. At 12:00, verify luminaires still illuminated</li>
              <li>7. Restore mains, verify recharge indication</li>
              <li>
                <strong>Acceptance criteria:</strong> All luminaires operational after 3 hours
              </li>
              <li>
                <strong>Result:</strong> PASS - 100% operational at test end
              </li>
            </ul>
            <p>
              <strong>Example 2 — Managing non-attendance:</strong> Client representative fails to
              attend a notified generator load test.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Day 1: Notification email sent (test scheduled Day 8)</li>
              <li>Day 3: Reminder email sent - no response</li>
              <li>Day 7: Phone call - left voicemail</li>
              <li>Day 8: No attendance at 09:00 start time</li>
              <li>Waited 30 minutes beyond scheduled start</li>
              <li>Photographed empty witness area with timestamp</li>
              <li>Proceeded with test as "deemed witnessed"</li>
              <li>Recorded all results with photographic evidence</li>
              <li>Noted on test sheet: "Client non-attendance despite proper notice"</li>
              <li>Retained copies of all notification emails</li>
              <li>Test sheet signed by contractor personnel</li>
              <li>Issued copy to client with covering letter</li>
            </ul>
            <p>
              <strong>Example 3 — Recording a partial failure:</strong> Fire alarm 100% detector
              test - 2 detectors out of 150 fail to respond.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Total detectors tested: 150</li>
              <li>Detectors passed: 148</li>
              <li>Detectors failed: 2 (D047 on Loop 1, D089 on Loop 2)</li>
              <li>D047: No panel response - suspected wiring fault</li>
              <li>D089: Slow response (&gt;30 seconds) - suspect contamination</li>
              <li>1. Investigation and repair by contractor</li>
              <li>2. Re-test of failed detectors only</li>
              <li>3. Re-test scheduled 3 working days later</li>
              <li>Partial pass signed for 148 detectors</li>
              <li>Failure record created for 2 detectors</li>
              <li>Re-test linked to original witness test reference</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Pre-test checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>System fully commissioned and known to work</li>
              <li>All documentation prepared and printed</li>
              <li>Test equipment calibrated and certificates available</li>
              <li>Client notified with minimum required notice</li>
              <li>Attendance confirmed in writing</li>
              <li>Area safe and accessible for test</li>
            </ul>
            <p>
              <strong>During the test:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Brief attendees on test procedure and safety</li>
              <li>Explain acceptance criteria before starting</li>
              <li>Conduct tests methodically, explaining each step</li>
              <li>Record results as you go, not retrospectively</li>
              <li>Allow client to verify readings independently</li>
              <li>Take photographs of key test activities</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Insufficient notice:</strong> Client rejects test as improperly notified
                </li>
                <li>
                  <strong>Unprepared documentation:</strong> Delays test, appears unprofessional
                </li>
                <li>
                  <strong>Testing uncommissioned systems:</strong> High failure rate, wastes time
                </li>
                <li>
                  <strong>No calibration records:</strong> Results may be rejected
                </li>
                <li>
                  <strong>Unsigned results:</strong> Test has no evidential value
                </li>
              </ul>
            }
            doInstead="Issue 5+ working days written notice, prepare procedure, criteria and signed equipment calibration before the day, only invite the client when systems are proven, and obtain dated signatures from authorised representatives on every test sheet."
          />

          <SectionRule />

          <Scenario
            title="Failed witness test triggers re-mobilisation cost"
            situation={
              <>
                The witness test for the chilled water system is scheduled. The client's engineer attends. The test fails: balancing is out of tolerance, two zones cannot achieve design flow. The contractor rebooks for two weeks later; the client engineer charges a re-attendance fee of £2,500. After re-balancing, the system passes. Total cost: £2,500 attendance fee + £1,800 contractor rework + 1-week programme impact.
              </>
            }
            whatToDo={
              <>
                Pre-witness internal testing is essential. The commissioning team should run the full test on their own and confirm it passes before notifying the witness. If anything is uncertain, defer notification — never notify and hope. Build pre-witness testing into the programme as a 1-week preceding activity. The cost of pre-testing is a fraction of the cost of failed witness.
              </>
            }
            whyItMatters={
              <>
                Witness testing is the formal acceptance gate. A failed witness signals weak commissioning discipline; a passed one signals professional execution. The client's perception of project quality is shaped at witness events more than at any other moment.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

                    <KeyTakeaways
            points={[
              "Witness test = client/designer attends and observes; often signs off acceptance.",
              "Scheduled in ITP and commissioning programme — never surprise calls.",
              "Notification typically 5 working days minimum.",
              "Witness pack: method statement, calibration, record sheet, sign-off — issued before test.",
              "Pre-witness internal testing essential — never notify and hope.",
              "Failed witness = NCR, root cause, rectify, re-witness — never quietly proceed.",
              "CIBSE Code M defines witness as a managed process.",
              "Witness events shape client perception of project quality more than any other moment.",
            ]}
          />


          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Commissioning and handover
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section5-6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Handover documentation
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule5Section5_5;
