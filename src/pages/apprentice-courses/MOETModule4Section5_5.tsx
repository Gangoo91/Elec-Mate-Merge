import { ArrowLeft, FileText, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Test Documentation and Certification - MOET Module 4.5.5";
const DESCRIPTION = "Comprehensive guide to test documentation and certification for maintenance technicians: recording actual values, completing test schedules, electrical installation certificates, and maintaining accurate records in accordance with BS 7671.";

const quickCheckQuestions = [
  {
    id: "doc-purpose",
    question: "Why is accurate test documentation essential in electrical maintenance?",
    options: [
      "It is only needed to satisfy paperwork requirements",
      "It provides a permanent record of the installation's condition, enables comparison between inspections, demonstrates compliance with regulations, and provides evidence of due diligence",
      "It is only needed for new installations",
      "It is optional for maintenance work"
    ],
    correctIndex: 1,
    explanation: "Accurate test documentation serves multiple critical purposes: it provides a baseline record of the installation's condition for future comparison, demonstrates compliance with BS 7671 and the Electricity at Work Regulations 1989, provides evidence of due diligence in the event of an incident, and enables condition-based maintenance decisions based on trending data."
  },
  {
    id: "doc-actual-values",
    question: "When recording test results, what is the correct approach?",
    options: [
      "Round values to the nearest whole number for simplicity",
      "Record 'pass' or 'fail' only",
      "Always record the actual measured value, not a rounded or adjusted figure — if the reading is 127 MΩ, record 127 MΩ",
      "Only record values that fail the acceptance criteria"
    ],
    correctIndex: 2,
    explanation: "Always record the actual measured value, not a rounded or adjusted figure. If the insulation resistance reading is 127 MΩ, record 127 MΩ — not \">1 MΩ\" or \"pass\". Actual values enable meaningful comparison between inspections and provide the data needed for condition-based maintenance decisions."
  },
  {
    id: "doc-eicr",
    question: "What is the purpose of an Electrical Installation Condition Report (EICR)?",
    options: [
      "To certify a new electrical installation",
      "To record the condition of an existing installation, identify deficiencies, and classify them by severity using coding (C1, C2, C3, FI) to indicate the urgency of remedial action required",
      "To provide a warranty for electrical equipment",
      "To replace the need for periodic testing"
    ],
    correctIndex: 1,
    explanation: "An EICR records the condition of an existing electrical installation at the time of inspection. It identifies any deficiencies and classifies them using the standard coding system: C1 (danger present — requires immediate action), C2 (potentially dangerous — urgent remedial action required), C3 (improvement recommended), and FI (further investigation required). The EICR enables the duty holder to make informed decisions about remedial work."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "When completing a schedule of test results, the insulation resistance value recorded should be:",
    options: [
      "The minimum acceptable value from BS 7671",
      "The actual measured value from the calibrated test instrument",
      "An estimated value based on the circuit length",
      "The value printed on the cable specification"
    ],
    correctAnswer: 1,
    explanation: "The schedule of test results must contain the actual measured values obtained using a calibrated test instrument. Recording minimum acceptable values, estimates, or specification values defeats the purpose of testing and may constitute a fraudulent record. The actual values enable trend analysis between inspections and provide genuine evidence of the installation's condition."
  },
  {
    id: 2,
    question: "Which document is issued following the periodic inspection of an existing electrical installation?",
    options: [
      "An Electrical Installation Certificate (EIC)",
      "A Minor Electrical Installation Works Certificate (MEIWC)",
      "An Electrical Installation Condition Report (EICR)",
      "A Building Regulations Compliance Certificate"
    ],
    correctAnswer: 2,
    explanation: "An Electrical Installation Condition Report (EICR) is issued following periodic inspection and testing of an existing installation. An EIC is issued for new installations or significant alterations, and a MEIWC is for minor works that do not involve a new circuit. The EICR includes the inspector's overall assessment, observations with classification codes, and the schedule of test results."
  },
  {
    id: 3,
    question: "The observation code C1 on an EICR indicates:",
    options: [
      "The installation is satisfactory",
      "Improvement is recommended but not required",
      "Danger present — risk of injury. Immediate remedial action required",
      "Further investigation is required before a classification can be given"
    ],
    correctAnswer: 2,
    explanation: "C1 indicates 'Danger present' — there is an immediate risk of injury and the deficiency requires urgent remedial action. The person responsible for the installation should be informed immediately and the danger should be made safe if possible. C1 observations represent the most serious classification and may require immediate isolation of the affected circuit."
  },
  {
    id: 4,
    question: "A calibrated test instrument means:",
    options: [
      "The instrument is brand new",
      "The instrument has been verified against traceable reference standards within a defined period, and a calibration certificate has been issued confirming its accuracy is within acceptable limits",
      "The instrument has been purchased from an approved supplier",
      "The instrument has a valid PAT test label"
    ],
    correctAnswer: 1,
    explanation: "Calibration is the process of verifying an instrument's accuracy against traceable reference standards (traceable to national standards). A calibration certificate confirms the instrument reads within acceptable limits of accuracy. Test results obtained with uncalibrated instruments may be unreliable and could be challenged in legal proceedings. Most test instruments require annual calibration."
  },
  {
    id: 5,
    question: "When a test result is at or near the minimum acceptable value specified in BS 7671, the technician should:",
    options: [
      "Record the value as a pass and move on",
      "Record the actual value, flag it as marginal, investigate the possible cause, and consider recommending remedial action — a value near the limit today may deteriorate to a fail before the next inspection",
      "Round the value up to make it clearly pass",
      "Repeat the test until a better value is obtained"
    ],
    correctAnswer: 1,
    explanation: "Marginal results require professional judgement. While the installation may technically pass at the time of testing, a value near the limit may indicate deterioration that will continue, potentially reaching a dangerous condition before the next inspection. The competent person should record the actual value, note the marginal condition, investigate possible causes (damaged insulation, moisture, contamination), and consider recommending remedial action or a reduced inspection interval."
  },
  {
    id: 6,
    question: "Test records should be retained for:",
    options: [
      "One year only",
      "Until the next inspection",
      "The lifetime of the installation — previous test records enable trend analysis and provide a complete history of the installation's condition over time",
      "Six months"
    ],
    correctAnswer: 2,
    explanation: "Test records should be retained for the lifetime of the installation. Previous records enable comparison between inspections (trend analysis), which can reveal gradual deterioration that might not be apparent from a single set of results. The complete test history also demonstrates a regime of proper maintenance and provides evidence of due diligence in the event of an incident or legal proceedings."
  }
];

const faqs = [
  {
    question: "What test schedules are required for BS 7671 certification?",
    answer: "BS 7671 requires a Schedule of Test Results (formerly Schedule of Inspections and Test Results) to accompany every Electrical Installation Certificate (EIC) and Electrical Installation Condition Report (EICR). The schedule records the results of continuity, insulation resistance, polarity, earth fault loop impedance, RCD, and prospective fault current tests for each circuit. For EICRs, a Schedule of Inspections is also required, recording the visual inspection findings."
  },
  {
    question: "Who is competent to sign electrical test certificates?",
    answer: "Electrical test certificates must be signed by competent persons. For an EIC, three signatures may be required: the designer, the installer, and the person responsible for inspection and testing. For an EICR, the inspector must be a competent person with the necessary knowledge, skills, and experience to inspect and test electrical installations. Registration with a competent person scheme (such as NICEIC, NAPIT, or ELECSA) provides evidence of competence."
  },
  {
    question: "What happens if test instruments are out of calibration?",
    answer: "Test results obtained with instruments that are out of calibration may be unreliable and cannot be relied upon as evidence of compliance. If it is discovered that an instrument was out of calibration, all tests performed since the last valid calibration date may need to be repeated. In legal proceedings, test results from uncalibrated instruments are likely to be challenged and may be inadmissible. Maintaining instruments within calibration is a professional obligation."
  },
  {
    question: "How should I handle a result that is borderline pass/fail?",
    answer: "A borderline result requires professional judgement. Record the actual measured value — never adjust it to make a clear pass or fail. Consider the installation environment, the age of the installation, and the rate of deterioration. A marginal insulation resistance reading in a dry environment may be acceptable with monitoring, while the same reading in a damp environment may indicate a problem requiring immediate attention. Document your reasoning and any recommendations."
  }
];

const MOETModule4Section5_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section5">
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
            <FileText className="h-4 w-4" />
            <span>Module 4.5.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Test Documentation and Certification
          </h1>
          <p className="text-white/80">
            Recording actual values, completing test schedules, and maintaining accurate certification records
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Record actual values:</strong> Never round, estimate, or record pass/fail only</li>
              <li className="pl-1"><strong>Calibrated instruments:</strong> All test results require calibrated equipment</li>
              <li className="pl-1"><strong>Correct certificates:</strong> EIC for new work, EICR for existing installations</li>
              <li className="pl-1"><strong>Retain records:</strong> Keep for the lifetime of the installation</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Technician Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Legal evidence:</strong> Test records demonstrate due diligence and compliance</li>
              <li className="pl-1"><strong>Trend analysis:</strong> Comparing values between inspections reveals deterioration</li>
              <li className="pl-1"><strong>Professional duty:</strong> Accurate documentation is a core competency</li>
              <li className="pl-1"><strong>ST1426:</strong> Maps to documentation and reporting competencies</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Record actual measured test values accurately and consistently",
              "Complete schedules of test results in accordance with BS 7671",
              "Understand the purpose and content of EICs, MEIWCs, and EICRs",
              "Apply the EICR observation classification system (C1, C2, C3, FI)",
              "Maintain calibration records for test instruments",
              "Retain and organise test documentation for the installation lifetime"
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

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Recording Actual Values
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Always record the actual measured value, not a rounded or adjusted figure. If the insulation resistance reading is 127 MΩ, record 127 MΩ — not {'"'}{'>'}{'"'}1 MΩ{'"'} or {'"'}pass{'"'}. If the RCD trip time is 22 ms, record 22 ms — not {'"'}{'<'}40 ms{'"'}. Actual values enable meaningful comparison between inspections and provide the data needed for condition-based maintenance decisions. The only exception is where the instrument reads overrange (e.g., {'"'}{'>'}{'"'}200 MΩ{'"'}), in which case the overrange indication should be recorded as such.
            </p>
            <p>
              Recording {'"'}pass{'"'} or {'"'}fail{'"'} instead of actual values removes all useful information. A circuit with insulation resistance of 2 MΩ and one with 200 MΩ would both be recorded as {'"'}pass{'"'}, yet the first circuit is close to the minimum acceptable value and may be deteriorating. Only by recording actual values can this deterioration be tracked over time.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Good Practice vs Poor Practice</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Test</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Good Record</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Poor Record</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Insulation resistance</td>
                      <td className="border border-white/10 px-3 py-2">127 MΩ</td>
                      <td className="border border-white/10 px-3 py-2">Pass / {'>'}{'"'}1 MΩ{'"'}</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">RCD trip time</td>
                      <td className="border border-white/10 px-3 py-2">22 ms</td>
                      <td className="border border-white/10 px-3 py-2">Pass / {'<'}300 ms</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Zs</td>
                      <td className="border border-white/10 px-3 py-2">0.48 Ω</td>
                      <td className="border border-white/10 px-3 py-2">OK / Within limits</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Continuity (R1+R2)</td>
                      <td className="border border-white/10 px-3 py-2">0.34 Ω</td>
                      <td className="border border-white/10 px-3 py-2">Satisfactory</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Schedules of Test Results
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Schedule of Test Results is the detailed record that accompanies every Electrical Installation Certificate (EIC) and Electrical Installation Condition Report (EICR). It records the results of all tests performed on each circuit, providing a complete picture of the installation's electrical condition at the time of testing.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Information Required for Each Circuit</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Circuit identification:</strong> Circuit number, description, and location</li>
                <li className="pl-1"><strong>Circuit details:</strong> Cable type, size, reference method, overcurrent device type and rating</li>
                <li className="pl-1"><strong>Continuity:</strong> R1+R2 or R2 values in ohms</li>
                <li className="pl-1"><strong>Insulation resistance:</strong> Between live conductors and between live conductors and earth, in MΩ</li>
                <li className="pl-1"><strong>Polarity:</strong> Confirmation of correct polarity</li>
                <li className="pl-1"><strong>Earth fault loop impedance:</strong> Zs value in ohms</li>
                <li className="pl-1"><strong>RCD:</strong> Type, rating, and measured trip time</li>
                <li className="pl-1"><strong>Prospective fault current:</strong> Ipf at the origin or relevant point</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Common Documentation Errors</p>
              <p className="text-sm text-white">
                Common errors include: leaving fields blank (every field should contain a value, N/A, or a dash with explanation), recording values without units, using incorrect test voltage for insulation resistance, failing to record which circuits were tested on the EICR, and not recording the instrument serial numbers and calibration dates. These errors can invalidate the certificate and may have legal consequences.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Certificates and Reports
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671 specifies three main certification documents, each serving a different purpose. Using the correct document for the type of work carried out is essential — issuing the wrong certificate type is a common error that can have regulatory implications.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Electrical Installation Certificate (EIC)</h3>
                <p className="text-sm text-white">
                  Issued for new installations, complete rewires, and alterations that include new circuits. The EIC certifies that the work complies with BS 7671 and includes the design, construction, and inspection/testing stages. It requires up to three signatories: designer, installer, and inspector/tester (which may be the same person for smaller works).
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Minor Electrical Installation Works Certificate (MEIWC)</h3>
                <p className="text-sm text-white">
                  Issued for minor works that do not include the provision of a new circuit — such as adding a socket to an existing circuit, replacing a consumer unit on existing circuits, or adding a fused spur. The MEIWC is a simplified form but still requires test results and confirmation of compliance.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Electrical Installation Condition Report (EICR)</h3>
                <p className="text-sm text-white">
                  Issued following the periodic inspection and testing of an existing installation. The EICR records the condition of the installation at the time of inspection and includes observations classified by severity: C1 (danger present), C2 (potentially dangerous), C3 (improvement recommended), and FI (further investigation required). The overall assessment states whether the installation is satisfactory or unsatisfactory.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Instrument Calibration and Record Keeping
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              All test instruments used for certification purposes must be calibrated and within their calibration period. Calibration is the process of verifying an instrument's accuracy against traceable reference standards — standards that can be traced back to national measurement standards. A calibration certificate confirms that the instrument reads within acceptable limits of accuracy for each measurement function and range.
            </p>
            <p>
              The serial numbers and calibration dates of all instruments used must be recorded on the certification documents. This provides traceability — if a question arises about the validity of test results, the calibration status of the instrument at the time of testing can be verified. Most test instruments require annual calibration, although the calibration interval may vary depending on the instrument type, usage, and manufacturer's recommendations.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Record Retention</p>
              <p className="text-sm text-white">
                Test records should be retained for the lifetime of the installation. Previous records enable trend analysis — comparing values between inspections to identify gradual deterioration that might not be apparent from a single set of results. The Electricity at Work Regulations 1989 do not specify a retention period, but best practice is indefinite retention. Digital record-keeping systems make this practical and allow easy retrieval and comparison.
              </p>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>ST1426 link:</strong> Accurate test documentation and certification is a core competency for the maintenance technician standard. You will be expected to complete test schedules correctly, select the appropriate certification document, and maintain organised records. Developing good documentation habits during your apprenticeship is essential for professional practice.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

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
                <p className="font-medium text-white mb-1">Certification Documents</p>
                <ul className="space-y-0.5">
                  <li>EIC: New installations and new circuits</li>
                  <li>MEIWC: Minor works, no new circuits</li>
                  <li>EICR: Periodic inspection of existing installations</li>
                  <li>All require schedules of test results</li>
                  <li>Record instrument serial numbers and calibration dates</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">EICR Classification Codes</p>
                <ul className="space-y-0.5">
                  <li>C1: Danger present — immediate action required</li>
                  <li>C2: Potentially dangerous — urgent action required</li>
                  <li>C3: Improvement recommended</li>
                  <li>FI: Further investigation required</li>
                  <li>Retain all records for installation lifetime</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section5-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Functional Testing
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section5-6">
              Next: Commissioning Procedures
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule4Section5_5;
