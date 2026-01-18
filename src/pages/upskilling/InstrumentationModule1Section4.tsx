import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";

const quickCheckQuestions = [
  {
    id: "iso-17025",
    question: "What does ISO/IEC 17025 focus on?",
    options: [
      "Building construction only",
      "General requirements for the competence of testing and calibration laboratories",
      "Computer programming",
      "Food safety regulations"
    ],
    correctIndex: 1,
    explanation: "ISO/IEC 17025 is the international standard that specifies the general requirements for the competence, impartiality and consistent operation of testing and calibration laboratories."
  },
  {
    id: "ukas-importance",
    question: "Why is UKAS accreditation important in calibration?",
    options: [
      "It's not important",
      "It ensures calibration laboratories meet quality standards and provides traceability",
      "It's only for decoration",
      "It increases costs unnecessarily"
    ],
    correctIndex: 1,
    explanation: "UKAS accreditation provides confidence that calibration laboratories operate competently and generate valid results with proper traceability to national standards."
  },
  {
    id: "standards-purpose",
    question: "Name one reason standards are essential in instrumentation.",
    options: [
      "To make things more complicated",
      "To ensure accuracy, safety, and regulatory compliance",
      "To increase bureaucracy",
      "They serve no purpose"
    ],
    correctIndex: 1,
    explanation: "Standards ensure instrumentation systems meet accuracy requirements, maintain safety levels, enable interoperability, and support regulatory compliance across industries."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What does ISO/IEC 17025 focus on?",
    options: [
      "Building construction only",
      "General requirements for the competence of testing and calibration laboratories",
      "Computer programming",
      "Food safety regulations"
    ],
    correctAnswer: 1,
    explanation: "ISO/IEC 17025 is the international standard that specifies the general requirements for the competence, impartiality and consistent operation of testing and calibration laboratories."
  },
  {
    id: 2,
    question: "Why is UKAS accreditation important in calibration?",
    options: [
      "It's not important",
      "It ensures calibration laboratories meet quality standards and provides traceability",
      "It's only for decoration",
      "It increases costs unnecessarily"
    ],
    correctAnswer: 1,
    explanation: "UKAS accreditation provides confidence that calibration laboratories operate competently and generate valid results with proper traceability to national standards."
  },
  {
    id: 3,
    question: "Name one reason standards are essential in instrumentation.",
    options: [
      "To make things more complicated",
      "To ensure accuracy, safety, and regulatory compliance",
      "To increase bureaucracy",
      "They serve no purpose"
    ],
    correctAnswer: 1,
    explanation: "Standards ensure instrumentation systems meet accuracy requirements, maintain safety levels, enable interoperability, and support regulatory compliance across industries."
  },
  {
    id: 4,
    question: "How do standards support legal compliance?",
    options: [
      "They don't affect legal compliance",
      "By providing accepted benchmarks for demonstrating due diligence and regulatory conformity",
      "Only through increasing costs",
      "By making systems more complex"
    ],
    correctAnswer: 1,
    explanation: "Standards provide recognised benchmarks that regulators and courts use to assess whether organisations have met their legal obligations for safety and quality."
  },
  {
    id: 5,
    question: "What industry might be required to follow ISO standards strictly?",
    options: [
      "Entertainment industry only",
      "Pharmaceutical manufacturing",
      "Fashion industry only",
      "Sports equipment only"
    ],
    correctAnswer: 1,
    explanation: "Pharmaceutical manufacturing requires strict adherence to ISO standards (including ISO/IEC 17025) to ensure product safety, efficacy, and regulatory approval from authorities like MHRA."
  },
  {
    id: 6,
    question: "What does BS EN stand for in standards nomenclature?",
    options: [
      "British Safety Engineering",
      "British Standard European Norm",
      "Building Standards Europe",
      "Basic Safety Evaluation"
    ],
    correctAnswer: 1,
    explanation: "BS EN stands for British Standard European Norm - these are European standards adopted as British Standards to ensure consistency across European markets."
  },
  {
    id: 7,
    question: "What is traceability in measurement terms?",
    options: [
      "Finding lost equipment",
      "An unbroken chain of measurements linking to national or international standards",
      "Tracking equipment location",
      "Recording serial numbers"
    ],
    correctAnswer: 1,
    explanation: "Traceability means measurements can be related to appropriate standards (usually national or international) through an unbroken chain of comparisons with stated uncertainties."
  },
  {
    id: 8,
    question: "Which BS EN standard covers safety requirements for measurement equipment?",
    options: [
      "BS EN 61010",
      "BS EN 12345",
      "BS EN 00001",
      "BS EN 99999"
    ],
    correctAnswer: 0,
    explanation: "BS EN 61010 specifies safety requirements for electrical equipment used for measurement, control, and laboratory use."
  },
  {
    id: 9,
    question: "What is the UKAS assessment cycle for accredited laboratories?",
    options: [
      "Monthly visits",
      "Annual surveillance with four-yearly re-assessment",
      "One-time assessment only",
      "Weekly inspections"
    ],
    correctAnswer: 1,
    explanation: "UKAS conducts annual surveillance visits to accredited laboratories and performs a full re-assessment every four years to maintain accreditation status."
  },
  {
    id: 10,
    question: "Why is repeatability important in instrumentation?",
    options: [
      "It's not important",
      "It ensures consistent measurement procedures and reliable results",
      "Only for calibration labs",
      "To increase paperwork"
    ],
    correctAnswer: 1,
    explanation: "Repeatability ensures that measurement procedures produce consistent results, enabling reliable quality control, calibration intervals, and confidence in measurement data."
  }
];

const faqs = [
  {
    question: "Do all businesses need UKAS accredited calibration?",
    answer: "Not all businesses require UKAS accredited calibration, but regulated industries (pharmaceuticals, aerospace, automotive, nuclear) typically mandate it. Even non-regulated businesses benefit from traceable calibration for quality assurance."
  },
  {
    question: "How often should instruments be calibrated?",
    answer: "Calibration frequency depends on the instrument type, usage intensity, environmental conditions, and industry requirements. Typically ranges from 6 months to 2 years, with critical instruments requiring more frequent calibration."
  },
  {
    question: "What happens if equipment fails calibration?",
    answer: "If equipment fails calibration, it must be adjusted, repaired, or replaced. Historical data may need review to assess if measurements taken were affected. Some industries require impact assessments and corrective actions."
  },
  {
    question: "Are international standards the same as British standards?",
    answer: "Many British standards (BS) are identical to international (ISO/IEC) or European (EN) standards. The prefix indicates the standard's origin: BS = British, EN = European, ISO = International. BS EN indicates European norms adopted as British standards."
  },
  {
    question: "What is measurement uncertainty?",
    answer: "Measurement uncertainty quantifies the doubt about the result of a measurement. It includes all possible sources of error and is expressed as a range within which the true value is expected to lie with a stated confidence level."
  }
];

const InstrumentationModule1Section4 = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/instrumentation-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 1 Section 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Key Industry Standards
          </h1>
          <p className="text-white/80">
            BS EN, UKAS, ISO/IEC 17025 and their importance in instrumentation
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>BS EN:</strong> European norms adopted as British Standards</li>
              <li><strong>UKAS:</strong> UK's National Accreditation Body</li>
              <li><strong>ISO/IEC 17025:</strong> International standard for lab competence</li>
              <li><strong>Purpose:</strong> Ensure accuracy, safety, and compliance</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> UKAS logo on calibration certificates</li>
              <li><strong>Use:</strong> Verify calibration traceability for critical measurements</li>
              <li><strong>Apply:</strong> Select accredited suppliers for regulated industries</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify key instrumentation-related standards",
              "Understand their importance in calibration and compliance",
              "Recognise the role of accreditation bodies",
              "Appreciate the impact on safety, performance, and audits",
              "Apply standards knowledge to real-world scenarios",
              "Understand traceability and measurement uncertainty"
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

        {/* Section 1: BS EN Standards */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            BS EN Standards: European Norms for Electrical Instrumentation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS EN standards represent European norms (EN) adopted as British Standards (BS). These
              harmonised standards ensure consistency across European markets and provide technical
              specifications for instrumentation design, installation, and operation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key BS EN Standards for Instrumentation:</p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-1">Safety &amp; EMC Standards</p>
                  <ul className="text-sm text-white space-y-1">
                    <li><strong>BS EN 61010:</strong> Safety requirements for measurement, control, and laboratory equipment</li>
                    <li><strong>BS EN 61326:</strong> EMC requirements for measurement, control, and laboratory equipment</li>
                    <li><strong>BS EN 50581:</strong> Technical documentation for RoHS assessment</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-1">Performance Standards</p>
                  <ul className="text-sm text-white space-y-1">
                    <li><strong>BS EN 60751:</strong> Industrial platinum resistance thermometers</li>
                    <li><strong>BS EN 62058:</strong> Electricity metering equipment requirements</li>
                    <li><strong>BS EN 61298:</strong> Process measurement device performance evaluation</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Functional Safety Standards</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>BS EN 61508:</strong> Functional safety of E/E/PE safety-related systems</li>
                  <li><strong>BS EN 61511:</strong> Safety instrumented systems for process industry</li>
                  <li><strong>BS EN 62061:</strong> Safety of machinery control systems</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Communication &amp; Interoperability</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>BS EN 50325:</strong> Industrial communications (CAN-based)</li>
                  <li><strong>BS EN 61158:</strong> Fieldbus specifications</li>
                  <li><strong>BS EN 62541:</strong> OPC unified architecture specifications</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Note:</strong> Despite Brexit, the UK continues to recognise many BS EN standards as they
              remain technically valid and support international trade compatibility.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: UKAS Accreditation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            UKAS: United Kingdom Accreditation Service
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              UKAS is the UK's National Accreditation Body, ensuring that calibration and testing
              laboratories meet internationally recognised quality standards. UKAS accreditation
              provides confidence in measurement results and is often mandatory for regulated industries.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">UKAS Accreditation Services:</p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-1">Calibration (ISO/IEC 17025)</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Electrical measurements (voltage, current, resistance)</li>
                    <li>Temperature and humidity calibration</li>
                    <li>Pressure and flow measurement standards</li>
                    <li>Dimensional and mass calibration</li>
                    <li>Time and frequency standards</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-1">Testing (ISO/IEC 17025)</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>EMC testing and compliance</li>
                    <li>Safety testing to relevant standards</li>
                    <li>Environmental testing</li>
                    <li>Product performance verification</li>
                    <li>Type approval and certification</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Benefits of UKAS Accreditation:</p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-1">Quality Assurance</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Competence demonstration</li>
                    <li>Regular assessment and surveillance</li>
                    <li>Continuous improvement</li>
                    <li>International recognition</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-1">Traceability</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Links to national standards</li>
                    <li>Measurement uncertainty quantification</li>
                    <li>Documented calibration chain</li>
                    <li>Legal metrology compliance</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-1">Market Access</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Regulatory acceptance</li>
                    <li>Customer confidence</li>
                    <li>International recognition</li>
                    <li>Reduced audit requirements</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">UKAS Assessment Process</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Initial application and documentation review</li>
                  <li>On-site assessment by technical experts</li>
                  <li>Competence demonstration through witness testing</li>
                  <li>Annual surveillance visits</li>
                  <li>Four-yearly re-assessment cycle</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Industries Requiring UKAS</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Pharmaceuticals (MHRA requirements)</li>
                  <li>Automotive (IATF 16949)</li>
                  <li>Aerospace (AS9100)</li>
                  <li>Medical devices (ISO 13485)</li>
                  <li>Nuclear industry (safety-critical measurements)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: ISO/IEC 17025 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            ISO/IEC 17025: Standard for Testing and Calibration Laboratories
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              ISO/IEC 17025 is the international standard that specifies the general requirements for
              the competence, impartiality and consistent operation of testing and calibration laboratories.
              It is the foundation standard for all laboratory accreditation worldwide.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">ISO/IEC 17025:2017 Structure:</p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-1">General Requirements</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Impartiality and confidentiality</li>
                    <li>Organisational structure and responsibility</li>
                    <li>Risk-based thinking approach</li>
                    <li>Customer focus and service quality</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-1">Structural Requirements</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Legal entity and responsibility</li>
                    <li>Laboratory management requirements</li>
                    <li>Organisational structure definition</li>
                    <li>Authority and responsibility allocation</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Resource Requirements:</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-1">Personnel</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Competence requirements</li>
                    <li>Training and development</li>
                    <li>Competence records</li>
                    <li>Authorisation processes</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-1">Facilities</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Environmental conditions</li>
                    <li>Laboratory design</li>
                    <li>Access and security</li>
                    <li>Housekeeping standards</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-1">Equipment</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Equipment specifications</li>
                    <li>Calibration requirements</li>
                    <li>Maintenance programmes</li>
                    <li>Equipment records</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-1">Traceability</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Metrological traceability</li>
                    <li>Calibration certificates</li>
                    <li>Reference standards</li>
                    <li>Uncertainty evaluation</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>2017 Revision:</strong> The current version emphasises risk-based thinking, customer focus,
              and flexibility in quality management system implementation while maintaining technical rigour.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Why Standards Matter */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Why Standards Matter: Traceability, Repeatability, Legal Compliance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Standards provide the framework for consistent, reliable, and legally defensible instrumentation
              practices. They ensure measurements are accurate, comparable, and traceable while supporting
              safety, quality, and regulatory compliance across all industries.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Core Benefits of Standards Compliance:</p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-1">Traceability</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Unbroken chain to national standards</li>
                    <li>Documented measurement uncertainty</li>
                    <li>International recognition and acceptance</li>
                    <li>Legal validity of measurements</li>
                    <li>Audit trail for quality systems</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-1">Repeatability</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Consistent measurement procedures</li>
                    <li>Standardised calibration intervals</li>
                    <li>Uniform competence requirements</li>
                    <li>Reproducible test conditions</li>
                    <li>Quality assurance protocols</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-1">Legal Compliance</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Regulatory requirement satisfaction</li>
                    <li>Due diligence demonstration</li>
                    <li>Professional liability protection</li>
                    <li>Insurance coverage maintenance</li>
                    <li>Court-admissible evidence</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Impact on Safety</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Consistent safety system performance</li>
                  <li>Reliable alarm and trip functions</li>
                  <li>Predictable equipment behaviour</li>
                  <li>Standardised maintenance procedures</li>
                  <li>Clear responsibility definitions</li>
                  <li>Emergency response protocols</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Impact on Performance</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Optimised process efficiency</li>
                  <li>Reduced measurement uncertainty</li>
                  <li>Improved product quality</li>
                  <li>Enhanced system reliability</li>
                  <li>Lower maintenance costs</li>
                  <li>Extended equipment life</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Real-World Scenario: Pharmaceutical Manufacturing Compliance</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Step 1:</strong> Internal calibration lab achieves UKAS accreditation to ISO/IEC 17025 for temperature, pressure, and analytical measurements</li>
                <li><strong>Step 2:</strong> All process instrumentation calibrated with certificates traceable to national standards, with documented uncertainty budgets</li>
                <li><strong>Step 3:</strong> Calibration procedures integrated with GMP quality system, including risk assessments and validation protocols</li>
                <li><strong>Step 4:</strong> MHRA audit successfully completed, with product licence approved based on demonstrated measurement capability</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Selecting Calibration Suppliers</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Verify UKAS accreditation status and scope coverage</li>
                <li>Check calibration certificate includes measurement uncertainty</li>
                <li>Ensure traceability chain is documented</li>
                <li>Review supplier's quality management system</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Ignoring accreditation scope</strong> — UKAS accreditation must cover the specific measurements required</li>
                <li><strong>Missing calibration intervals</strong> — out-of-calibration equipment invalidates measurements</li>
                <li><strong>Incomplete records</strong> — traceability requires documented calibration history</li>
                <li><strong>Assuming all certificates are equal</strong> — non-UKAS certificates may not be accepted by regulators</li>
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
            <Link to="/electrician/upskilling/instrumentation-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/upskilling/instrumentation-module-2">
              Next Module
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default InstrumentationModule1Section4;
