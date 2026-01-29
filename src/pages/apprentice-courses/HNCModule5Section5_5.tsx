import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Witness Testing - HNC Module 5 Section 5.5";
const DESCRIPTION = "Master witness testing procedures for building services: client attendance requirements, documentation standards, sign-off procedures, acceptance protocols, and failed test procedures.";

const quickCheckQuestions = [
  {
    id: "witness-test-purpose",
    question: "What is the primary purpose of witness testing?",
    options: ["To train the client on system operation", "To provide independent verification that systems meet specification", "To identify defects before practical completion", "To generate snagging lists"],
    correctIndex: 1,
    explanation: "Witness testing provides independent verification that installed systems meet the specification requirements. It allows the client's representative to observe tests being performed and confirm acceptable results."
  },
  {
    id: "notification-period",
    question: "What is the typical minimum notice period required for witness testing?",
    options: ["24 hours", "48 hours", "5 working days", "10 working days"],
    correctIndex: 2,
    explanation: "Industry standard requires a minimum of 5 working days' notice for witness testing to allow client representatives to schedule attendance. This is typically specified in the contract preliminaries."
  },
  {
    id: "failed-test-action",
    question: "If a witness test fails, what is the correct procedure?",
    options: ["Continue with remaining tests and address failures later", "Immediately terminate the testing session", "Record the failure, rectify the issue, and reschedule the specific test", "Ask the client to sign off despite the failure"],
    correctIndex: 2,
    explanation: "Failed tests must be recorded in the witness test documentation with details of the deficiency. The contractor rectifies the issue and arranges a re-test with appropriate notice to the client."
  },
  {
    id: "sign-off-authority",
    question: "Who should sign witness test documentation on behalf of the client?",
    options: ["Any site visitor", "The main contractor's site manager", "An authorised client representative named in the contract", "The installing electrician"],
    correctIndex: 3,
    explanation: "Only authorised client representatives (typically named in contract documents or formally delegated) have authority to sign witness test documentation. Their signature confirms the client accepts the test results."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What documentation should be prepared before a witness testing session?",
    options: [
      "Test certificates only",
      "Test procedure, acceptance criteria, equipment list, and blank results sheets",
      "As-built drawings only",
      "Operation and maintenance manuals"
    ],
    correctAnswer: 1,
    explanation: "Before witness testing, prepare the test procedure, defined acceptance criteria from the specification, calibrated test equipment list, and blank results sheets. This ensures efficient, professional testing sessions."
  },
  {
    id: 2,
    question: "What is the purpose of a witness test schedule?",
    options: ["To list all equipment on site", "To programme testing dates and notify all parties of attendance requirements", "To record test results", "To calculate final account values"],
    correctAnswer: 1,
    explanation: "A witness test schedule programmes all required tests with proposed dates, allowing coordination with the client's representative and ensuring adequate notice for attendance at each test."
  },
  {
    id: 3,
    question: "During an emergency lighting witness test, the client representative arrives 30 minutes late. What should you do?",
    options: [
      "Refuse to conduct the test",
      "Complete the test without them and have them sign retrospectively",
      "Brief them on progress, allow them to witness the remaining duration test",
      "Cancel and reschedule for another day"
    ],
    correctAnswer: 2,
    explanation: "Brief the late arrival on progress and allow them to witness the remaining test duration. Document their late arrival on the test sheet. The test can proceed if meaningful verification is still possible."
  },
  {
    id: 4,
    question: "What should be recorded if the client fails to attend a properly notified witness test?",
    options: [
      "Nothing - abandon the test",
      "Record non-attendance and proceed with the test as 'deemed witnessed'",
      "Only record non-attendance",
      "Send an invoice for wasted time"
    ],
    correctAnswer: 1,
    explanation: "If proper notice was given (typically 5 working days) and the client fails to attend, record non-attendance, proceed with the test, and document results. Most contracts allow tests to be 'deemed witnessed' in these circumstances."
  },
  {
    id: 5,
    question: "A fire alarm witness test requires a 100% detector test. How should this be demonstrated?",
    options: [
      "Test every tenth detector and extrapolate",
      "Test each detector individually, recording device address and response",
      "Conduct a general evacuation drill only",
      "Submit manufacturer's test certificates"
    ],
    correctAnswer: 1,
    explanation: "A 100% detector test requires each detector to be individually activated (using appropriate test equipment), with the panel response verified and recorded by device address. This proves every detector functions correctly."
  },
  {
    id: 6,
    question: "What is the role of hold points in commissioning and witness testing?",
    options: [
      "To delay the project",
      "To define stages where work must not proceed without client approval",
      "To calculate interim payments",
      "To schedule equipment deliveries"
    ],
    correctAnswer: 1,
    explanation: "Hold points are defined stages in the commissioning process where work cannot proceed until the client has witnessed and approved the preceding tests. They are critical for quality assurance on complex installations."
  },
  {
    id: 7,
    question: "What information must a witness test sign-off sheet contain?",
    options: [
      "Test date only",
      "Test description, acceptance criteria, actual results, pass/fail status, and signatures",
      "Equipment serial numbers only",
      "Warranty information"
    ],
    correctAnswer: 1,
    explanation: "Witness test sign-off sheets must include: test description, acceptance criteria from specification, actual measured/observed results, clear pass/fail status, date, and signatures of both contractor and client representative."
  },
  {
    id: 8,
    question: "During witness testing, the specified acceptance criterion is 85% of rated output. The system achieves 83%. What should happen?",
    options: [
      "Round up and pass the test",
      "Record as failed, investigate cause, rectify, and re-test",
      "Ask the client to accept a derogation",
      "Ignore the shortfall if it's within 5%"
    ],
    correctAnswer: 1,
    explanation: "If a test fails to meet the specified acceptance criteria, it must be recorded as failed regardless of how close the result. The contractor investigates, rectifies, and arranges a re-test. Any derogations require formal agreement."
  },
  {
    id: 9,
    question: "What is the significance of the Inspection Test Plan (ITP) in witness testing?",
    options: [
      "It replaces the specification",
      "It lists all tests required, inspection levels, hold points, and acceptance criteria",
      "It is only used for quality audits",
      "It records as-built information"
    ],
    correctAnswer: 1,
    explanation: "The Inspection Test Plan (ITP) is the master document listing all required tests, inspection levels (witness/hold/surveillance), acceptance criteria, and responsibilities. It ensures nothing is missed during commissioning."
  },
  {
    id: 10,
    question: "After successful witness testing, what must be handed over to the client?",
    options: [
      "Verbal confirmation only",
      "Signed test records, commissioning data, and certificates",
      "Equipment user manuals only",
      "Final account documentation"
    ],
    correctAnswer: 1,
    explanation: "Successful witness testing requires handover of signed witness test records, commissioning data sheets showing all settings and results, and relevant compliance certificates. These form part of the O&M documentation."
  }
];

const faqs = [
  {
    question: "What happens if the client continuously fails to attend witness tests?",
    answer: "Most contracts include a 'deemed witnessed' clause. If proper notice is given (typically 5 working days minimum) and the client fails to attend, the contractor proceeds with the test, documents results, and the test is deemed witnessed. This prevents clients from delaying projects by non-attendance. Always confirm your contract terms and document all notification attempts."
  },
  {
    question: "Can witness test results be retrospectively signed?",
    answer: "Retrospective signing should be avoided as it undermines the purpose of witness testing. If unavoidable (e.g., late arrival), the sign-off sheet should clearly note that the signatory did not witness the entire test. Some clients refuse retrospective sign-off entirely, requiring a complete re-test with full attendance."
  },
  {
    question: "Who pays for re-tests when witness tests fail?",
    answer: "If failure is due to contractor deficiencies (installation errors, equipment faults), the contractor bears all re-test costs. If failure results from design issues or client changes, additional costs may be claimable. Document the cause of failure clearly to support any claims."
  },
  {
    question: "What level of detail is required in witness test documentation?",
    answer: "Documentation must be sufficient for an independent party to verify the test was conducted correctly and results meet acceptance criteria. This includes: test procedure reference, equipment used (with calibration dates), environmental conditions if relevant, all measured values, clear pass/fail determination, and dated signatures."
  },
  {
    question: "Can witness testing be conducted remotely?",
    answer: "Remote witnessing (via video link) has become more accepted, particularly since 2020. However, it requires prior agreement in the contract, suitable technology with recorded evidence, and clear protocols. Many clients still require physical attendance for critical systems (fire, life safety). Always confirm acceptability before proposing remote witnessing."
  },
  {
    question: "What is the difference between witness testing and snagging?",
    answer: "Witness testing verifies that systems function correctly against specified acceptance criteria - it's a formal pass/fail process. Snagging identifies minor defects, incomplete works, or aesthetic issues that don't affect system function. Both occur before handover, but witness testing typically precedes snagging."
  }
];

const HNCModule5Section5_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module5-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 5.5.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Witness Testing
          </h1>
          <p className="text-white/80">
            Client attendance requirements, documentation standards, sign-off procedures, and acceptance protocols
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Purpose:</strong> Independent verification systems meet specification</li>
              <li className="pl-1"><strong>Notice period:</strong> Minimum 5 working days typically required</li>
              <li className="pl-1"><strong>Documentation:</strong> Signed test sheets with pass/fail status</li>
              <li className="pl-1"><strong>Failed tests:</strong> Record, rectify, re-test with notice</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Fire alarm:</strong> 100% detector test, cause and effect</li>
              <li className="pl-1"><strong>Emergency lighting:</strong> 3-hour duration test</li>
              <li className="pl-1"><strong>HVAC systems:</strong> Air flow, temperature control</li>
              <li className="pl-1"><strong>BMS:</strong> Sequence of operations verification</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand the purpose and importance of witness testing",
              "Apply correct notification procedures for client attendance",
              "Prepare comprehensive test documentation and sign-off sheets",
              "Manage failed test procedures professionally",
              "Implement hold points and inspection test plans",
              "Handle non-attendance and deemed witnessed situations"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 1: Purpose of Witness Testing */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Purpose of Witness Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Witness testing is a formal process where the client's representative observes tests being performed
              on installed systems to verify they meet specification requirements. It provides independent assurance
              that the installation functions correctly before handover and acceptance.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key objectives of witness testing:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Verification:</strong> Confirm installed systems meet specified performance criteria</li>
                <li className="pl-1"><strong>Transparency:</strong> Demonstrate test procedures and results to the client</li>
                <li className="pl-1"><strong>Documentation:</strong> Create signed evidence of system compliance</li>
                <li className="pl-1"><strong>Acceptance:</strong> Formal sign-off enabling practical completion</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Witness Tests in Building Services</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">System</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Witness Tests</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fire alarm</td>
                      <td className="border border-white/10 px-3 py-2">100% detector test, cause and effect, sounders</td>
                      <td className="border border-white/10 px-3 py-2">Half to full day</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Emergency lighting</td>
                      <td className="border border-white/10 px-3 py-2">3-hour duration test, lux level verification</td>
                      <td className="border border-white/10 px-3 py-2">3+ hours</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LV distribution</td>
                      <td className="border border-white/10 px-3 py-2">Phase rotation, protection coordination, load test</td>
                      <td className="border border-white/10 px-3 py-2">Half to full day</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Generator</td>
                      <td className="border border-white/10 px-3 py-2">Load bank test, auto-start, synchronisation</td>
                      <td className="border border-white/10 px-3 py-2">Full day</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">BMS</td>
                      <td className="border border-white/10 px-3 py-2">Point-to-point verification, alarms, graphics</td>
                      <td className="border border-white/10 px-3 py-2">Multiple days</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> Witness testing is not a diagnostic exercise - systems should be fully commissioned and known to work before inviting the client to witness.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Notification Requirements and Attendance */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Notification Requirements and Attendance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper notification is essential for witness testing. Contracts typically specify minimum notice
              periods and the consequences of non-attendance by either party.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Notification Requirements</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Minimum 5 working days' notice (typical)</li>
                  <li className="pl-1">Written notification (email acceptable)</li>
                  <li className="pl-1">State test type, location, proposed date/time</li>
                  <li className="pl-1">Request confirmation of attendance</li>
                  <li className="pl-1">Reference contract clause for deemed witnessed</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Attendee Responsibilities</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Arrive on time with appropriate PPE</li>
                  <li className="pl-1">Bring relevant specification documents</li>
                  <li className="pl-1">Authority to sign on behalf of client</li>
                  <li className="pl-1">Technical competence to verify test methods</li>
                  <li className="pl-1">Decision-making authority for pass/fail</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <p className="text-sm font-medium text-amber-400 mb-2">Deemed Witnessed Clause</p>
              <p className="text-sm text-white">
                Most contracts include a deemed witnessed clause: if the contractor provides proper notice and the
                client fails to attend without requesting postponement, the contractor may proceed and the test is
                deemed witnessed. Document everything - notification sent, no response received, test proceeded as scheduled.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Witness Test Schedule Example</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Test</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Proposed Date</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notice Sent</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fire alarm cause & effect</td>
                      <td className="border border-white/10 px-3 py-2">15/02/2026</td>
                      <td className="border border-white/10 px-3 py-2">05/02/2026</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">Confirmed</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Emergency lighting 3hr</td>
                      <td className="border border-white/10 px-3 py-2">18/02/2026</td>
                      <td className="border border-white/10 px-3 py-2">08/02/2026</td>
                      <td className="border border-white/10 px-3 py-2 text-amber-400">Awaiting</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Generator load test</td>
                      <td className="border border-white/10 px-3 py-2">22/02/2026</td>
                      <td className="border border-white/10 px-3 py-2">12/02/2026</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">Confirmed</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">BMS point-to-point</td>
                      <td className="border border-white/10 px-3 py-2">25/02/2026</td>
                      <td className="border border-white/10 px-3 py-2">15/02/2026</td>
                      <td className="border border-white/10 px-3 py-2 text-blue-400">Scheduled</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Issue a consolidated witness test schedule at project start and update weekly during commissioning phase.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Documentation and Sign-off Procedures */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Documentation and Sign-off Procedures
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Witness test documentation must be comprehensive, accurate, and provide clear evidence of test
              outcomes. Well-prepared documentation demonstrates professionalism and protects all parties.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Documentation Elements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Test procedure:</strong> Step-by-step method statement for the test</li>
                <li className="pl-1"><strong>Acceptance criteria:</strong> Specific pass/fail values from specification</li>
                <li className="pl-1"><strong>Equipment list:</strong> Test instruments with calibration certificates</li>
                <li className="pl-1"><strong>Results sheet:</strong> Pre-formatted for recording actual values</li>
                <li className="pl-1"><strong>Sign-off section:</strong> Spaces for signatures, names, dates, and comments</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Witness Test Record Sheet - Key Fields</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-white mb-2">Header Information</p>
                  <ul className="text-white/80 space-y-1 list-disc list-outside ml-5">
                    <li>Project name and reference</li>
                    <li>Test description and reference number</li>
                    <li>Location/area being tested</li>
                    <li>Date and time of test</li>
                    <li>Specification clause reference</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-2">Results Section</p>
                  <ul className="text-white/80 space-y-1 list-disc list-outside ml-5">
                    <li>Acceptance criterion (specified value)</li>
                    <li>Actual result (measured/observed)</li>
                    <li>Pass/Fail status (clear indication)</li>
                    <li>Comments/observations</li>
                    <li>Re-test requirements if failed</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Sign-off Requirements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Signatory</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Role</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Confirms</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Commissioning engineer</td>
                      <td className="border border-white/10 px-3 py-2">Contractor</td>
                      <td className="border border-white/10 px-3 py-2">Test conducted per procedure, results accurate</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Site supervisor</td>
                      <td className="border border-white/10 px-3 py-2">Contractor</td>
                      <td className="border border-white/10 px-3 py-2">Test overseen, resources adequate</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Client representative</td>
                      <td className="border border-white/10 px-3 py-2">Client/CA</td>
                      <td className="border border-white/10 px-3 py-2">Test witnessed, results accepted</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">M&E consultant</td>
                      <td className="border border-white/10 px-3 py-2">Designer</td>
                      <td className="border border-white/10 px-3 py-2">Test meets specification intent (if attending)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Critical: Calibration Records</p>
              <p className="text-sm text-white">
                All test equipment must have valid calibration certificates. Record instrument serial numbers
                and calibration dates on witness test documentation. Tests conducted with uncalibrated equipment
                may be rejected and require repetition.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Professional tip:</strong> Prepare all documentation before the test day. Arriving with blank or incomplete paperwork reflects poorly on the contractor.
            </p>
          </div>
        </section>

        {/* Section 4: Failed Test Procedures and Acceptance Protocols */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Failed Test Procedures and Acceptance Protocols
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Not all witness tests pass first time. Having a clear procedure for managing failures maintains
              professionalism and keeps the project on track. The key is transparency and prompt rectification.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Failed Test Procedure</p>
              <ol className="text-sm text-white space-y-2 list-decimal list-outside ml-5">
                <li className="pl-1"><strong>Record the failure:</strong> Document exactly what failed and by how much</li>
                <li className="pl-1"><strong>Agree the deficiency:</strong> Ensure client representative agrees with the failure assessment</li>
                <li className="pl-1"><strong>Investigate cause:</strong> Determine whether installation error, equipment fault, or design issue</li>
                <li className="pl-1"><strong>Propose rectification:</strong> Provide method and timescale for correction</li>
                <li className="pl-1"><strong>Schedule re-test:</strong> Agree new date with appropriate notice period</li>
                <li className="pl-1"><strong>Document resolution:</strong> Link re-test results to original failure record</li>
              </ol>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                <p className="text-sm font-medium text-red-400 mb-2">What NOT to Do</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Argue that the failure is "close enough"</li>
                  <li className="pl-1">Blame the specification or design</li>
                  <li className="pl-1">Ask the client to sign off despite failure</li>
                  <li className="pl-1">Leave the failure undocumented</li>
                  <li className="pl-1">Delay rectification indefinitely</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <p className="text-sm font-medium text-green-400 mb-2">Professional Approach</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Accept responsibility professionally</li>
                  <li className="pl-1">Focus on solution, not blame</li>
                  <li className="pl-1">Provide realistic rectification timescale</li>
                  <li className="pl-1">Keep client informed of progress</li>
                  <li className="pl-1">Ensure first-time pass at re-test</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Acceptance Protocols</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Full acceptance:</strong> All tests pass, documentation complete, system handed over</li>
                <li className="pl-1"><strong>Conditional acceptance:</strong> Minor items outstanding, listed for completion within agreed period</li>
                <li className="pl-1"><strong>Partial acceptance:</strong> Some areas/systems accepted while others require further work</li>
                <li className="pl-1"><strong>Derogation:</strong> Formal agreement to accept performance below specification (requires written approval)</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Real-World Example: Fire Alarm Cause and Effect Failure</p>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> During witness testing of a fire alarm cause and effect matrix, activating Zone 3 detectors
                fails to release the magnetic door holders on Fire Exit 2 as specified.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm text-white/90 mt-3">
                <p><strong>Recorded failure:</strong> Zone 3 detection did not trigger output to MagLock 2</p>
                <p><strong>Investigation:</strong> Cause and effect programming error - output not mapped</p>
                <p><strong>Rectification:</strong> Panel reprogrammed by fire alarm engineer</p>
                <p><strong>Re-test:</strong> Scheduled for 3 days later, client notified</p>
                <p><strong>Outcome:</strong> Re-test passed, linked to original failure record</p>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Contract tip:</strong> Review your contract for maximum time allowed between failed test and re-test. Missing deadlines may incur liquidated damages.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Emergency Lighting Witness Test</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Conduct a 3-hour duration test on emergency lighting installation.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p><strong>Preparation:</strong></p>
                <p>- Notify client 5 working days in advance</p>
                <p>- Prepare lux meter (calibrated), test log sheet</p>
                <p>- Confirm all luminaires fully charged (min 24hrs)</p>
                <p className="mt-2"><strong>Test procedure:</strong></p>
                <p>1. Record mains supply on, note start time: 09:00</p>
                <p>2. Simulate mains failure at distribution board</p>
                <p>3. Verify all emergency luminaires illuminate</p>
                <p>4. Take lux readings at designated points</p>
                <p>5. Monitor throughout 3-hour period</p>
                <p>6. At 12:00, verify luminaires still illuminated</p>
                <p>7. Restore mains, verify recharge indication</p>
                <p className="mt-2"><strong>Acceptance criteria:</strong> All luminaires operational after 3 hours</p>
                <p><strong>Result:</strong> PASS - 100% operational at test end</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Managing Non-Attendance</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Client representative fails to attend a notified generator load test.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p><strong>Timeline:</strong></p>
                <p>Day 1: Notification email sent (test scheduled Day 8)</p>
                <p>Day 3: Reminder email sent - no response</p>
                <p>Day 7: Phone call - left voicemail</p>
                <p>Day 8: No attendance at 09:00 start time</p>
                <p className="mt-2"><strong>Action taken:</strong></p>
                <p>- Waited 30 minutes beyond scheduled start</p>
                <p>- Photographed empty witness area with timestamp</p>
                <p>- Proceeded with test as "deemed witnessed"</p>
                <p>- Recorded all results with photographic evidence</p>
                <p>- Noted on test sheet: "Client non-attendance despite proper notice"</p>
                <p className="mt-2"><strong>Documentation:</strong></p>
                <p>- Retained copies of all notification emails</p>
                <p>- Test sheet signed by contractor personnel</p>
                <p>- Issued copy to client with covering letter</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Recording a Partial Failure</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Fire alarm 100% detector test - 2 detectors out of 150 fail to respond.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p><strong>Test result summary:</strong></p>
                <p>- Total detectors tested: 150</p>
                <p>- Detectors passed: 148</p>
                <p>- Detectors failed: 2 (D047 on Loop 1, D089 on Loop 2)</p>
                <p className="mt-2"><strong>Failure analysis:</strong></p>
                <p>D047: No panel response - suspected wiring fault</p>
                <p>D089: Slow response (&gt;30 seconds) - suspect contamination</p>
                <p className="mt-2"><strong>Agreed actions:</strong></p>
                <p>1. Investigation and repair by contractor</p>
                <p>2. Re-test of failed detectors only</p>
                <p>3. Re-test scheduled 3 working days later</p>
                <p className="mt-2"><strong>Sign-off:</strong></p>
                <p>- Partial pass signed for 148 detectors</p>
                <p>- Failure record created for 2 detectors</p>
                <p>- Re-test linked to original witness test reference</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Pre-Test Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">System fully commissioned and known to work</li>
                <li className="pl-1">All documentation prepared and printed</li>
                <li className="pl-1">Test equipment calibrated and certificates available</li>
                <li className="pl-1">Client notified with minimum required notice</li>
                <li className="pl-1">Attendance confirmed in writing</li>
                <li className="pl-1">Area safe and accessible for test</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">During the Test</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Brief attendees on test procedure and safety</li>
                <li className="pl-1">Explain acceptance criteria before starting</li>
                <li className="pl-1">Conduct tests methodically, explaining each step</li>
                <li className="pl-1">Record results as you go, not retrospectively</li>
                <li className="pl-1">Allow client to verify readings independently</li>
                <li className="pl-1">Take photographs of key test activities</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Insufficient notice:</strong> Client rejects test as improperly notified</li>
                <li className="pl-1"><strong>Unprepared documentation:</strong> Delays test, appears unprofessional</li>
                <li className="pl-1"><strong>Testing uncommissioned systems:</strong> High failure rate, wastes time</li>
                <li className="pl-1"><strong>No calibration records:</strong> Results may be rejected</li>
                <li className="pl-1"><strong>Unsigned results:</strong> Test has no evidential value</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Notification Requirements</p>
                <ul className="space-y-0.5">
                  <li>Minimum 5 working days' notice (typical)</li>
                  <li>Written notification with test details</li>
                  <li>Request confirmation of attendance</li>
                  <li>Reference deemed witnessed clause</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Documentation Essentials</p>
                <ul className="space-y-0.5">
                  <li>Test procedure and acceptance criteria</li>
                  <li>Calibrated equipment with certificates</li>
                  <li>Clear pass/fail determination</li>
                  <li>Dated signatures from all parties</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module5-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Commissioning and Handover
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module5-section5-6">
              Next: Practical Completion
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule5Section5_5;
