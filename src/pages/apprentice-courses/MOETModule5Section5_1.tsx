import { ArrowLeft, Clipboard, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Calibration Procedures and Standards - MOET Module 5 Section 5.1";
const DESCRIPTION = "Comprehensive guide to standardised calibration procedures, ISO/IEC 17025, UKAS accreditation, measurement uncertainty, GUM framework and calibration management systems for electrical maintenance technicians under ST1426.";

const quickCheckQuestions = [
  {
    id: "qc1",
    question: "Which international standard specifies requirements for calibration laboratory competence?",
    options: [
      "ISO 9001",
      "ISO/IEC 17025",
      "BS 7671",
      "IEC 61131-3"
    ],
    correctIndex: 1,
    explanation: "ISO/IEC 17025 specifies the general requirements for the competence, impartiality, and consistent operation of calibration and testing laboratories."
  },
  {
    id: "qc2",
    question: "What is a Standard Operating Procedure (SOP) for calibration?",
    options: [
      "A generic instruction manual",
      "A detailed, step-by-step documented procedure specific to a particular instrument type and calibration task",
      "A safety briefing document",
      "A purchase order for calibration equipment"
    ],
    correctIndex: 1,
    explanation: "An SOP provides detailed instructions for performing a specific calibration, ensuring consistency, repeatability, and compliance regardless of which technician performs the work."
  },
  {
    id: "qc3",
    question: "What is measurement uncertainty?",
    options: [
      "Doubt about whether the instrument is working",
      "A quantitative expression of the range of values within which the true value is expected to lie",
      "The instrument's accuracy specification",
      "The cost of performing the calibration"
    ],
    correctIndex: 1,
    explanation: "Measurement uncertainty quantifies the doubt in a measurement result -- the range within which the true value is believed to lie with a stated level of confidence (typically 95%)."
  },
  {
    id: "qc4",
    question: "What is the 'guard band' approach to pass/fail decisions?",
    options: [
      "Using a security guard during calibration",
      "Applying a decision rule that accounts for measurement uncertainty when making conformity statements",
      "Adding extra test points beyond the standard five",
      "Doubling the calibration frequency"
    ],
    correctIndex: 1,
    explanation: "Guard banding narrows the acceptance limits by the measurement uncertainty, ensuring a high probability that a declared 'pass' genuinely means the instrument is within tolerance."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What does a calibration management system (CMS) provide?",
    options: ["Automatic calibration of instruments", "Scheduling, tracking, documentation, and trending of all calibration activities", "A replacement for calibration technicians", "Only a list of instrument serial numbers"],
    correctAnswer: 1,
    explanation: "A CMS manages the complete calibration lifecycle: scheduling calibrations, tracking instrument status, storing calibration records, trending drift data, and generating compliance reports."
  },
  {
    id: 2,
    question: "What is the purpose of a calibration procedure?",
    options: ["To make calibration optional", "To define the method, equipment, acceptance criteria, and documentation requirements for a specific calibration task", "To replace the need for trained technicians", "To calculate instrument cost"],
    correctAnswer: 1,
    explanation: "Calibration procedures ensure that calibrations are performed consistently and correctly, specifying the test equipment, test points, acceptance criteria, environmental requirements, and documentation format."
  },
  {
    id: 3,
    question: "How is measurement uncertainty typically expressed?",
    options: ["As a single number", "As an expanded uncertainty U with a coverage factor k and confidence level (e.g. U = 0.05 bar, k=2, 95% confidence)", "As a percentage of the instrument cost", "As the number of test points used"],
    correctAnswer: 1,
    explanation: "Expanded uncertainty U is calculated from combined standard uncertainty multiplied by coverage factor k (typically k=2 for approximately 95% confidence level)."
  },
  {
    id: 4,
    question: "What is GUM?",
    options: ["A type of adhesive for instrument mounting", "The Guide to the Expression of Uncertainty in Measurement -- the internationally accepted framework for evaluating measurement uncertainty", "A UK government regulation", "A brand of calibration equipment"],
    correctAnswer: 1,
    explanation: "GUM (JCGM 100) provides the internationally agreed framework for evaluating and expressing measurement uncertainty, used by all accredited calibration laboratories."
  },
  {
    id: 5,
    question: "What is an out-of-tolerance (OOT) investigation?",
    options: ["A routine check", "An investigation triggered when an instrument is found outside its acceptable tolerance during calibration, to assess the impact on previous measurements", "A financial audit", "A safety inspection"],
    correctAnswer: 1,
    explanation: "An OOT investigation assesses whether out-of-tolerance readings may have affected process safety, product quality, or compliance since the last successful calibration."
  },
  {
    id: 6,
    question: "What records must be maintained for each calibration?",
    options: ["Only the pass/fail result", "Instrument ID, procedure reference, standards used (with traceability), environmental conditions, as-found/as-left data, uncertainty, technician, and date", "Only the date of calibration", "A photograph of the instrument"],
    correctAnswer: 1,
    explanation: "Complete calibration records are required to demonstrate compliance, enable trend analysis, support OOT investigations, and satisfy audit requirements."
  },
  {
    id: 7,
    question: "What is the role of ISO 9001 in calibration?",
    options: ["It provides calibration procedures", "It requires that measuring equipment used in the quality management system is calibrated and traceable to ensure measurement validity", "It specifies calibration intervals", "It certifies individual calibration technicians"],
    correctAnswer: 1,
    explanation: "ISO 9001 Clause 7.1.5 requires organisations to ensure that monitoring and measuring equipment is calibrated, identified, and protected, and that measurement traceability is maintained."
  },
  {
    id: 8,
    question: "Why is environmental control important during calibration?",
    options: ["For the comfort of the technician", "Temperature, humidity, and pressure affect both the reference standard and instrument under test, potentially introducing errors", "It is not important for modern digital instruments", "Only for laboratory-based calibrations"],
    correctAnswer: 1,
    explanation: "Environmental conditions directly affect measurement accuracy. Calibrations should be performed under controlled conditions or with corrections applied for deviations from reference conditions."
  },
  {
    id: 9,
    question: "What is a calibration interval review?",
    options: ["A meeting to discuss calibration costs", "A periodic assessment of calibration intervals based on drift data, reliability trends, and risk to optimise the frequency of calibration", "A review of the calibration procedure only", "An annual inspection of the calibration laboratory"],
    correctAnswer: 1,
    explanation: "Interval reviews analyse historical drift data to determine if calibration intervals can be extended (consistent in-tolerance results) or need shortening (increasing drift or OOT findings)."
  },
  {
    id: 10,
    question: "What is the difference between Type A and Type B uncertainty evaluation?",
    options: ["Type A is more accurate", "Type A uses statistical analysis of repeated measurements; Type B uses other information such as specifications, certificates, and experience", "There is no difference", "Type A is for pressure, Type B is for temperature"],
    correctAnswer: 1,
    explanation: "Type A evaluation uses statistical methods (standard deviation of repeated measurements). Type B evaluation uses other available information such as calibration certificates, manufacturer specifications, and published data."
  },
  {
    id: 11,
    question: "What action is required when a reference standard is found out of tolerance?",
    options: ["Simply recalibrate it", "Perform a reverse traceability investigation on all instruments calibrated using that standard since its last successful calibration", "Discard the standard immediately", "No action is needed"],
    correctAnswer: 1,
    explanation: "A reverse traceability investigation must assess whether the standard's error could have caused instruments to be incorrectly declared in-tolerance, requiring recall and recalibration of affected instruments."
  },
  {
    id: 12,
    question: "Why must calibration procedures be controlled documents?",
    options: ["To prevent photocopying", "To ensure only current, approved versions are used, maintaining consistency and preventing use of superseded methods", "For filing purposes only", "It is not necessary"],
    correctAnswer: 1,
    explanation: "Controlled documents ensure version control, formal approval, and change management, maintaining the integrity and consistency of calibration results and preventing use of outdated procedures."
  }
];

const faqs = [
  {
    question: "What is the difference between accredited and traceable calibration?",
    answer: "Traceable calibration means the measurement is linked to national standards through an unbroken chain of comparisons. Accredited calibration (e.g. UKAS) additionally means the laboratory has been independently assessed for competence per ISO/IEC 17025, and the uncertainty statement on the certificate is reliable. Accredited calibration provides the highest level of confidence."
  },
  {
    question: "How do I calculate measurement uncertainty?",
    answer: "Follow the GUM methodology: identify all uncertainty sources (reference standard, resolution, repeatability, environmental effects), quantify each as a standard uncertainty, combine them using root-sum-of-squares (assuming independence), and multiply by the coverage factor k (usually k=2) to obtain expanded uncertainty at approximately 95% confidence."
  },
  {
    question: "Can I perform calibration in the field or must it be done in a laboratory?",
    answer: "Many calibrations can be performed in the field using portable calibration equipment. Field calibrations are acceptable provided the calibration procedure is followed, environmental conditions are recorded and accounted for, and the reference equipment has appropriate accuracy and traceability. Some high-accuracy calibrations require controlled laboratory conditions."
  },
  {
    question: "What happens if a reference standard is found out of tolerance?",
    answer: "This triggers a reverse traceability investigation. All instruments calibrated using that standard since its last successful calibration must be re-evaluated. If the standard's error could have caused instruments to be incorrectly declared in-tolerance, those instruments must be recalled and recalibrated."
  },
  {
    question: "How often should calibration procedures be reviewed?",
    answer: "Calibration procedures should be reviewed at defined intervals (typically every 2-3 years), when problems are identified, when equipment or methods change, when regulatory requirements change, or when audit findings require it. Reviews must be documented and any changes formally approved before implementation."
  }
];

const MOETModule5Section5_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Clipboard className="h-4 w-4" />
            <span>Module 5.5.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Calibration Procedures and Standards
          </h1>
          <p className="text-white/80">
            SOPs, ISO/IEC 17025, measurement uncertainty and calibration management
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>SOPs:</strong> Controlled, step-by-step procedures for each calibration task</li>
              <li className="pl-1"><strong>ISO/IEC 17025:</strong> Laboratory competence standard for calibration</li>
              <li className="pl-1"><strong>GUM:</strong> Framework for evaluating measurement uncertainty</li>
              <li className="pl-1"><strong>Guard banding:</strong> Accounts for uncertainty in pass/fail decisions</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>UKAS:</strong> UK accreditation for calibration laboratories</li>
              <li className="pl-1"><strong>OOT investigation:</strong> Assesses impact when instruments found out of tolerance</li>
              <li className="pl-1"><strong>CMS:</strong> Software for scheduling, tracking and trending calibrations</li>
              <li className="pl-1"><strong>Interval optimisation:</strong> Based on historical drift data</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the purpose and structure of calibration procedures and SOPs",
              "Describe ISO/IEC 17025 requirements for calibration laboratory competence",
              "Understand measurement uncertainty and the GUM evaluation framework",
              "Outline the role of calibration management systems in maintaining compliance",
              "Explain out-of-tolerance investigations and their impact on process integrity",
              "Apply guard banding and decision rules for conformity assessment"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Calibration Procedures and SOPs
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A calibration procedure (Standard Operating Procedure, SOP) provides step-by-step instructions for
              performing a specific calibration. It ensures that the calibration is performed consistently regardless
              of which technician carries it out. A well-written SOP is the foundation of reliable calibration practice.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Essential SOP Content</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Scope:</strong> Which instrument types and ranges the procedure covers</li>
                <li className="pl-1"><strong>Reference standards:</strong> Required equipment and their accuracy specifications</li>
                <li className="pl-1"><strong>Environmental requirements:</strong> Temperature, humidity, vibration limits</li>
                <li className="pl-1"><strong>Safety precautions:</strong> Isolation requirements, PPE, hazardous materials</li>
                <li className="pl-1"><strong>Test steps:</strong> Detailed, numbered steps including test points and stabilisation times</li>
                <li className="pl-1"><strong>Acceptance criteria:</strong> Tolerance limits expressed as percentage of span or reading</li>
                <li className="pl-1"><strong>Documentation:</strong> What must be recorded and where</li>
                <li className="pl-1"><strong>Failure actions:</strong> OOT investigation requirements if the instrument fails</li>
              </ul>
            </div>

            <p>
              Procedures must be controlled documents within the quality management system. They are reviewed and
              approved by authorised personnel, version-controlled, and available at the point of use. Changes require
              a formal change process. Training records must demonstrate that technicians are competent to perform
              each procedure they are assigned.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> A calibration performed without following the approved procedure has no
              demonstrated validity, regardless of how accurate the result might be. Always use the current, controlled
              version of the SOP.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            ISO/IEC 17025 and UKAS Accreditation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              <strong>ISO/IEC 17025</strong> is the international standard specifying requirements for the competence
              of testing and calibration laboratories. It covers both management system requirements (similar to
              ISO 9001) and technical requirements including staff competence, method validation, equipment calibration
              and maintenance, measurement traceability, and reporting of results.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">UKAS Accreditation</h3>
                <p className="text-sm text-white">
                  In the UK, laboratory accreditation against ISO/IEC 17025 is provided by <strong>UKAS (United
                  Kingdom Accreditation Service)</strong>. Accreditation involves rigorous assessment of the
                  laboratory's management system, technical competence, and measurement capability through
                  regular surveillance visits.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Accredited vs Non-Accredited</h3>
                <p className="text-sm text-white">
                  An accredited calibration certificate carries the UKAS logo and provides the highest level
                  of confidence. It includes a verified uncertainty statement. Many industries (pharmaceutical,
                  aerospace, nuclear) require UKAS-accredited calibration for critical instruments.
                </p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">ISO/IEC 17025 Technical Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Staff competence:</strong> Training, qualifications, and authorisation records</li>
                <li className="pl-1"><strong>Method validation:</strong> Demonstrating procedures are fit for purpose</li>
                <li className="pl-1"><strong>Equipment:</strong> Calibrated, maintained, and within calibration due dates</li>
                <li className="pl-1"><strong>Traceability:</strong> Unbroken chain to national measurement standards</li>
                <li className="pl-1"><strong>Uncertainty:</strong> Evaluated and reported for all calibration results</li>
                <li className="pl-1"><strong>Reporting:</strong> Complete, unambiguous calibration certificates</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> Maintenance technicians should understand the significance of UKAS
              accreditation when selecting calibration services, and ensure their own calibration activities
              follow documented procedures with traceable reference standards.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Measurement Uncertainty
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Every measurement has uncertainty -- no measurement is perfectly exact. <strong>Measurement uncertainty</strong>
              quantifies this doubt, expressing the range of values within which the true value is expected to lie
              with a stated confidence level. The internationally accepted framework for evaluating uncertainty is the
              <strong> GUM (Guide to the Expression of Uncertainty in Measurement, JCGM 100)</strong>.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">GUM Methodology Steps</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Step 1:</strong> Identify all sources of uncertainty (Type A -- statistical analysis of repeated measurements; Type B -- specifications, certificates, environmental effects)</li>
                <li className="pl-1"><strong>Step 2:</strong> Quantify each source as a standard uncertainty</li>
                <li className="pl-1"><strong>Step 3:</strong> Combine using root-sum-of-squares to obtain combined standard uncertainty</li>
                <li className="pl-1"><strong>Step 4:</strong> Multiply by coverage factor k (typically k=2) for expanded uncertainty U at approximately 95% confidence</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Sources of Uncertainty</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Source</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2">Repeatability</td><td className="border border-white/10 px-3 py-2">A</td><td className="border border-white/10 px-3 py-2">Standard deviation of repeated readings</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Reference standard</td><td className="border border-white/10 px-3 py-2">B</td><td className="border border-white/10 px-3 py-2">From calibration certificate</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Resolution</td><td className="border border-white/10 px-3 py-2">B</td><td className="border border-white/10 px-3 py-2">Smallest display increment / 2</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Temperature effect</td><td className="border border-white/10 px-3 py-2">B</td><td className="border border-white/10 px-3 py-2">Temperature coefficient x deviation</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical tip:</strong> When making pass/fail decisions, always consider measurement uncertainty.
              The guard band approach subtracts uncertainty from acceptance limits, ensuring declared passes are genuine.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            OOT Investigations and Interval Management
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When an instrument is found <strong>out of tolerance (OOT)</strong> during calibration, an investigation
              must be performed to assess the impact on measurements made since the last successful calibration. This
              is a critical quality process that protects product quality, process safety, and regulatory compliance.
            </p>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">OOT Investigation Steps</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Identify which processes or products were measured using the instrument</li>
                <li className="pl-1">Estimate the potential error in those measurements based on the as-found deviation</li>
                <li className="pl-1">Determine whether the error could have affected safety, quality, or compliance</li>
                <li className="pl-1">Decide on corrective action (product recall, process review, re-testing)</li>
                <li className="pl-1">Document the investigation findings and actions taken</li>
                <li className="pl-1">Review the calibration interval for adequacy</li>
              </ul>
            </div>

            <p>
              <strong>Calibration interval management</strong> balances the risk of using an out-of-tolerance instrument
              against the cost and disruption of frequent calibration. Intervals are initially set based on manufacturer
              recommendations, then optimised using drift data. If as-found data consistently shows the instrument well
              within tolerance, the interval may be extended. If drift approaches tolerance limits, the interval should
              be shortened.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Calibration Management Systems</p>
              <p className="text-sm text-white">
                Effective calibration management requires software that tracks all instruments, schedules calibrations,
                stores records, trends drift data, manages OOT events, and generates compliance reports. Systems such
                as Beamex CMX, Fluke DPC/TRACK, and enterprise CMMS platforms (SAP PM, Maximo) provide these capabilities.
                They automatically generate work orders when calibrations are due and flag instruments showing excessive drift.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> An OOT finding is not just a calibration issue -- it is a quality event that
              can have wide-ranging implications. Always follow the OOT investigation procedure thoroughly.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Decision Rules and Conformity Assessment
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When declaring an instrument as 'pass' or 'fail', the measurement uncertainty must be considered.
              <strong> ILAC-G8</strong> provides guidance on decision rules for statements of conformity. The
              simplest approach is <strong>guard banding</strong>, which narrows the acceptance limits by the
              measurement uncertainty.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Guard Band Example</p>
              <p className="text-sm text-white mb-3">
                If the instrument tolerance is plus/minus 0.1 bar and the measurement uncertainty is plus/minus 0.02 bar:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Without guard band:</strong> Pass if reading is within plus/minus 0.1 bar</li>
                <li className="pl-1"><strong>With guard band:</strong> Pass if reading is within plus/minus 0.08 bar (0.1 - 0.02)</li>
                <li className="pl-1">The narrower acceptance band ensures high confidence that a declared pass is genuine</li>
                <li className="pl-1">Readings between 0.08 and 0.1 bar fall into the 'indeterminate zone'</li>
              </ul>
            </div>

            <p>
              Different industries and regulatory frameworks may require different decision rules. Some accept 'simple
              acceptance' (no uncertainty consideration), while regulated industries (pharmaceutical, nuclear) typically
              require guard banding. The decision rule used must be documented and agreed with the customer or
              regulatory authority.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Calibration procedures and standards form the quality framework for all
              measurement activities. The principles covered here underpin the practical calibration techniques
              covered in the following sections of Module 5.5.
            </p>
          </div>
        </section>

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

        <hr className="border-white/5 my-12" />

        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Standards and Frameworks</p>
                <ul className="space-y-0.5">
                  <li>ISO/IEC 17025 -- laboratory competence</li>
                  <li>GUM (JCGM 100) -- uncertainty evaluation</li>
                  <li>UKAS -- UK accreditation service</li>
                  <li>ILAC-G8 -- decision rules for conformity</li>
                  <li>ISO 9001 Clause 7.1.5 -- measurement resources</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Concepts</p>
                <ul className="space-y-0.5">
                  <li>SOP -- controlled step-by-step procedure</li>
                  <li>Guard band -- acceptance limit minus uncertainty</li>
                  <li>OOT -- out-of-tolerance investigation required</li>
                  <li>CMS -- calibration management system</li>
                  <li>Coverage factor k=2 -- approximately 95% confidence</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <Quiz title="Test Your Knowledge" questions={quizQuestions} />
        </section>

        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section Overview
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section5-2">
              Next: Test Instruments for Control Systems
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule5Section5_1;
