import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Testing and Verification - HNC Module 5 Section 4.5";
const DESCRIPTION = "Master testing and verification procedures for building services: pre-commissioning tests, acceptance criteria, performance verification, test certificates, and compliance demonstration for HVAC, electrical, and mechanical systems.";

const quickCheckQuestions = [
  {
    id: "pre-commission-purpose",
    question: "What is the primary purpose of pre-commissioning tests?",
    options: ["To train operatives", "To verify systems are safe to energise/start", "To measure energy consumption", "To calculate maintenance costs"],
    correctIndex: 1,
    explanation: "Pre-commissioning tests verify that systems are correctly installed and safe to energise or start. This includes continuity checks, insulation resistance, pressure tests, and visual inspections before any system is made live."
  },
  {
    id: "acceptance-criteria",
    question: "Acceptance criteria for building services should be:",
    options: ["Defined after testing is complete", "Agreed before installation begins", "Left to the contractor's discretion", "Based solely on manufacturer data"],
    correctIndex: 1,
    explanation: "Acceptance criteria must be defined and agreed with all parties before installation begins. This ensures everyone understands the required performance standards and how compliance will be measured."
  },
  {
    id: "witness-testing",
    question: "Why is witnessed testing important in building services?",
    options: ["It is a legal requirement", "It provides independent verification of results", "It reduces the number of tests needed", "It speeds up the commissioning process"],
    correctIndex: 1,
    explanation: "Witnessed testing provides independent verification that tests were conducted correctly and results are accurate. This is particularly important for critical systems and contractual handover."
  },
  {
    id: "compliance-demo",
    question: "Compliance demonstration typically includes:",
    options: ["Only test certificates", "Test results, certificates, O&M manuals, and as-built drawings", "Verbal confirmation from contractors", "Energy performance data only"],
    correctIndex: 1,
    explanation: "Compliance demonstration requires comprehensive documentation including test certificates, results with acceptance criteria comparison, operation and maintenance manuals, as-built drawings, and warranty information."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What document defines the required test procedures and acceptance criteria for a building services project?",
    options: [
      "The building regulations",
      "The commissioning specification",
      "The contractor's quality plan",
      "The health and safety file"
    ],
    correctAnswer: 1,
    explanation: "The commissioning specification defines all test procedures, acceptance criteria, and verification requirements. It is developed during design and forms part of the contract documentation."
  },
  {
    id: 2,
    question: "An HVAC system pressure test reveals a 10% pressure drop over 30 minutes. What action should be taken?",
    options: ["Accept as minor leakage is normal", "Record and proceed to commissioning", "Locate and repair leaks, then retest", "Increase system pressure to compensate"],
    correctAnswer: 2,
    explanation: "A 10% pressure drop indicates significant leakage. All leaks must be located, repaired, and the system retested until it achieves the specified pressure retention criteria (typically less than 1-2% drop)."
  },
  {
    id: 3,
    question: "Which electrical test must be performed before energising a new distribution board?",
    options: ["Load test at 110% capacity", "Thermal imaging survey", "Insulation resistance between all circuits and earth", "Power factor measurement"],
    correctAnswer: 2,
    explanation: "Insulation resistance testing between all circuits and earth must be performed before energising. This verifies there are no short circuits or insulation failures that could cause faults or fires when power is applied."
  },
  {
    id: 4,
    question: "Performance verification of an air handling unit should include:",
    options: [
      "Only measuring airflow rates",
      "Airflow, temperature, humidity, noise levels, and energy consumption",
      "Visual inspection only",
      "Checking the manufacturer's label"
    ],
    correctAnswer: 1,
    explanation: "Performance verification must cover all specified parameters: airflow rates at each outlet, supply/extract temperatures, humidity control accuracy, noise levels, and energy consumption against design criteria."
  },
  {
    id: 5,
    question: "What is a snagging list in the context of building services handover?",
    options: [
      "A list of all installed equipment",
      "A schedule of maintenance tasks",
      "A record of defects requiring rectification",
      "A training programme for operatives"
    ],
    correctAnswer: 2,
    explanation: "A snagging list records all defects, incomplete works, and items not meeting specification discovered during inspection and testing. These must be rectified before practical completion."
  },
  {
    id: 6,
    question: "The Building Regulations require that fixed building services:",
    options: [
      "Are installed by registered contractors only",
      "Achieve minimum energy efficiency standards",
      "Are tested by independent bodies",
      "Use only British-manufactured equipment"
    ],
    correctAnswer: 1,
    explanation: "Part L of the Building Regulations requires fixed building services (heating, cooling, ventilation, lighting) to achieve minimum energy efficiency standards, with compliance demonstrated through testing and commissioning."
  },
  {
    id: 7,
    question: "A commissioning certificate should be signed by:",
    options: [
      "The client only",
      "The commissioning engineer who conducted the tests",
      "The building control officer",
      "The main contractor's project manager"
    ],
    correctAnswer: 1,
    explanation: "Commissioning certificates must be signed by the commissioning engineer who conducted or witnessed the tests. This provides accountability and professional certification that tests were properly performed."
  },
  {
    id: 8,
    question: "What is the purpose of a 'burn-in' period for building services?",
    options: [
      "To test fire alarm systems",
      "To operate systems under load to identify early failures",
      "To heat the building before occupation",
      "To calibrate temperature sensors"
    ],
    correctAnswer: 1,
    explanation: "A burn-in period operates systems under realistic load conditions to identify early failures (infant mortality) before handover. This typically runs for 2-4 weeks and allows fine-tuning of controls."
  },
  {
    id: 9,
    question: "Seasonal commissioning is required because:",
    options: [
      "Contractors prefer to work in certain seasons",
      "Some systems can only be tested under specific ambient conditions",
      "Building regulations specify testing dates",
      "Equipment warranties require it"
    ],
    correctAnswer: 1,
    explanation: "Seasonal commissioning is needed because heating systems require cold weather and cooling systems require warm weather for meaningful performance testing. Initial handover may include provision for seasonal revisits."
  },
  {
    id: 10,
    question: "What standard governs the commissioning of air distribution systems in the UK?",
    options: [
      "BS 7671",
      "CIBSE Commissioning Codes",
      "Building Regulations Part F only",
      "BSRIA BG 49"
    ],
    correctAnswer: 1,
    explanation: "CIBSE Commissioning Codes (particularly Code A for air systems) provide detailed guidance on commissioning procedures, test methods, and acceptance criteria for building services in the UK."
  },
  {
    id: 11,
    question: "During electrical testing, an RCD fails to trip within 40ms at rated current. The appropriate action is:",
    options: [
      "Increase the test current",
      "Replace the RCD and retest",
      "Record as acceptable with a note",
      "Adjust the trip time setting"
    ],
    correctAnswer: 1,
    explanation: "RCDs must trip within their specified time (typically 40ms for Type A at rated residual current). Failure to meet this requirement means the device must be replaced and retested - there is no adjustment option."
  },
  {
    id: 12,
    question: "Test certificates for building services should be retained:",
    options: [
      "Until practical completion",
      "For the duration of the defects liability period",
      "For the life of the building",
      "For 12 months after handover"
    ],
    correctAnswer: 2,
    explanation: "Test certificates should be retained for the life of the building as part of the health and safety file. They demonstrate original compliance and provide essential information for future modifications or investigations."
  }
];

const faqs = [
  {
    question: "What is the difference between commissioning and testing?",
    answer: "Testing is the process of measuring system parameters against specified criteria - it produces data. Commissioning is the broader process of setting systems to work correctly, which includes testing but also balancing, adjustment, optimization, and demonstration. Testing verifies installation; commissioning verifies performance."
  },
  {
    question: "Who should witness commissioning tests?",
    answer: "Critical tests should be witnessed by the client's representative, commissioning management agent, or building control officer. The witnessing party verifies test methodology, observes results, and countersigns certificates. For major systems, specialist consultants or independent commissioning agents may be required."
  },
  {
    question: "What happens if systems cannot meet the specified acceptance criteria?",
    answer: "If systems genuinely cannot meet specification (not due to installation error), this triggers a formal variation process. The design team reviews whether criteria can be relaxed, whether remedial measures are needed, or whether commercial resolution (cost reduction) is appropriate. All variations must be documented and agreed."
  },
  {
    question: "How do seasonal commissioning requirements affect project handover?",
    answer: "Projects completing in summer cannot fully commission heating systems, and vice versa for cooling. Practical completion proceeds with a contractual commitment to return for seasonal commissioning, typically within 12 months. Retention money may be held until seasonal tests are complete. Clear documentation of outstanding items is essential."
  },
  {
    question: "What documentation is required for building control sign-off?",
    answer: "Building control requires evidence of compliance with all relevant Building Regulations. For services, this typically includes: Part L compliance calculations, commissioning certificates for heating/cooling/ventilation, electrical installation certificates (BS 7671), pressure test certificates, and air tightness test results. Requirements vary by local authority."
  },
  {
    question: "How should test failures be documented and managed?",
    answer: "Test failures must be recorded on the test sheet with the actual result, the required result, and the proposed corrective action. After rectification, the test is repeated and both the original failure and successful retest are retained in the project records. This audit trail demonstrates due diligence."
  }
];

const HNCModule5Section4_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module5-section4">
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
            <span>Module 5.4.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Testing and Verification
          </h1>
          <p className="text-white/80">
            Test procedures, acceptance criteria, and compliance demonstration for building services systems
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Pre-commissioning:</strong> Safety tests before energisation</li>
              <li className="pl-1"><strong>System testing:</strong> Verifying performance against design</li>
              <li className="pl-1"><strong>Acceptance criteria:</strong> Defined standards for pass/fail</li>
              <li className="pl-1"><strong>Compliance:</strong> Documentation proving regulatory adherence</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Electrical:</strong> BS 7671 verification tests</li>
              <li className="pl-1"><strong>HVAC:</strong> CIBSE commissioning codes</li>
              <li className="pl-1"><strong>Mechanical:</strong> Pressure and leak testing</li>
              <li className="pl-1"><strong>Controls:</strong> BMS point-to-point verification</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Plan and conduct pre-commissioning tests for building services",
              "Define appropriate acceptance criteria for different system types",
              "Implement systematic test procedures and documentation",
              "Verify system performance against design specifications",
              "Prepare test certificates and compliance documentation",
              "Manage test failures and remedial actions"
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

        {/* Section 1: Pre-Commissioning Tests */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Pre-Commissioning Tests
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Pre-commissioning tests verify that systems are correctly installed and safe to energise or start.
              These tests must be completed and documented before any system is made operational, protecting
              both personnel and equipment from potential damage.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Pre-commissioning test categories:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Visual inspection:</strong> Checking installation quality and compliance with drawings</li>
                <li className="pl-1"><strong>Continuity tests:</strong> Verifying electrical connections and earthing</li>
                <li className="pl-1"><strong>Insulation tests:</strong> Confirming no short circuits or earth faults</li>
                <li className="pl-1"><strong>Pressure tests:</strong> Checking pipework integrity for HVAC and plumbing</li>
                <li className="pl-1"><strong>Ductwork tests:</strong> Air leakage testing to DW/144 standards</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Electrical Pre-Commissioning Tests (BS 7671)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Test</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Purpose</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Criteria</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Continuity of protective conductors</td>
                      <td className="border border-white/10 px-3 py-2">Verify earth path integrity</td>
                      <td className="border border-white/10 px-3 py-2">R1+R2 within expected range</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Insulation resistance</td>
                      <td className="border border-white/10 px-3 py-2">Detect insulation failures</td>
                      <td className="border border-white/10 px-3 py-2">&gt;1 MΩ at 500V d.c.</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Polarity</td>
                      <td className="border border-white/10 px-3 py-2">Confirm correct wiring</td>
                      <td className="border border-white/10 px-3 py-2">Phase on switched contacts</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Earth fault loop impedance</td>
                      <td className="border border-white/10 px-3 py-2">Verify fault current path</td>
                      <td className="border border-white/10 px-3 py-2">Zs ≤ tabulated maximum</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">RCD operation</td>
                      <td className="border border-white/10 px-3 py-2">Confirm protection function</td>
                      <td className="border border-white/10 px-3 py-2">Trip ≤40ms at IΔn</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">HVAC Pressure Testing Requirements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">System Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Test Pressure</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Duration</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Acceptance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LTHW heating</td>
                      <td className="border border-white/10 px-3 py-2">1.5 × working pressure</td>
                      <td className="border border-white/10 px-3 py-2">2 hours minimum</td>
                      <td className="border border-white/10 px-3 py-2">No visible drop</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Chilled water</td>
                      <td className="border border-white/10 px-3 py-2">1.5 × working pressure</td>
                      <td className="border border-white/10 px-3 py-2">2 hours minimum</td>
                      <td className="border border-white/10 px-3 py-2">No visible drop</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Refrigerant pipework</td>
                      <td className="border border-white/10 px-3 py-2">Per F-gas regulations</td>
                      <td className="border border-white/10 px-3 py-2">24 hours</td>
                      <td className="border border-white/10 px-3 py-2">&lt;1% pressure loss</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Natural gas</td>
                      <td className="border border-white/10 px-3 py-2">Per IGE/UP/1</td>
                      <td className="border border-white/10 px-3 py-2">Varies by volume</td>
                      <td className="border border-white/10 px-3 py-2">Specific criteria</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Critical principle:</strong> Never energise or start any system until all pre-commissioning tests are complete and documented with satisfactory results.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: System Testing Procedures */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            System Testing Procedures
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              System testing verifies that installed equipment and systems perform as designed. This follows
              pre-commissioning and involves operating systems under controlled conditions to measure actual
              performance against specified requirements.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Electrical System Tests</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Functional testing of switchgear</li>
                  <li className="pl-1">Protection relay settings verification</li>
                  <li className="pl-1">Generator load bank testing</li>
                  <li className="pl-1">UPS autonomy verification</li>
                  <li className="pl-1">Lighting level measurements</li>
                  <li className="pl-1">Emergency lighting duration tests</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">HVAC System Tests</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Air flow measurement and balancing</li>
                  <li className="pl-1">Water flow regulation</li>
                  <li className="pl-1">Temperature control verification</li>
                  <li className="pl-1">Humidity control testing</li>
                  <li className="pl-1">Noise level measurements</li>
                  <li className="pl-1">Vibration assessment</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Test Procedure Structure</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Scope:</strong> Define exactly what will be tested and what is excluded</li>
                <li className="pl-1"><strong>Prerequisites:</strong> List conditions that must be met before testing</li>
                <li className="pl-1"><strong>Equipment:</strong> Specify calibrated instruments required</li>
                <li className="pl-1"><strong>Method:</strong> Step-by-step testing process</li>
                <li className="pl-1"><strong>Acceptance criteria:</strong> Specific pass/fail values</li>
                <li className="pl-1"><strong>Recording:</strong> Data capture requirements and format</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Example: AHU Performance Test Procedure</p>
              <div className="text-sm text-white space-y-2">
                <p><strong>1. Prerequisites:</strong></p>
                <ul className="list-disc list-outside ml-5 mb-2">
                  <li>Ductwork pressure tested and passed</li>
                  <li>Filters installed and grilles/diffusers fitted</li>
                  <li>BMS controls commissioned</li>
                  <li>Electrical supply verified</li>
                </ul>
                <p><strong>2. Test method:</strong></p>
                <ul className="list-disc list-outside ml-5 mb-2">
                  <li>Start AHU and allow to stabilise (15 minutes minimum)</li>
                  <li>Measure supply air volume at each diffuser using calibrated hood</li>
                  <li>Record supply and extract temperatures</li>
                  <li>Measure external static pressure</li>
                  <li>Check fan speed against design</li>
                </ul>
                <p><strong>3. Acceptance:</strong> ±10% of design air volume, temperature within 0.5°C of setpoint</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BMS Point-to-Point Verification</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Point Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Test Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Verification</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Temperature sensor</td>
                      <td className="border border-white/10 px-3 py-2">Compare with calibrated reference</td>
                      <td className="border border-white/10 px-3 py-2">±0.5°C accuracy</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Digital input</td>
                      <td className="border border-white/10 px-3 py-2">Force input state change</td>
                      <td className="border border-white/10 px-3 py-2">Correct status displayed</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Analogue output</td>
                      <td className="border border-white/10 px-3 py-2">Command 0%, 50%, 100%</td>
                      <td className="border border-white/10 px-3 py-2">Actuator responds correctly</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Digital output</td>
                      <td className="border border-white/10 px-3 py-2">Command on/off</td>
                      <td className="border border-white/10 px-3 py-2">Equipment starts/stops</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Use standardised test sheets for consistency and ensure all instruments are within calibration date.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Acceptance Criteria and Performance Verification */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Acceptance Criteria and Performance Verification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Acceptance criteria define the specific performance standards that systems must achieve.
              These must be measurable, achievable, and agreed by all parties before installation begins.
              Clear criteria prevent disputes and ensure objective assessment of system performance.
            </p>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Essential Elements of Acceptance Criteria</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Specific:</strong> Exact numerical values, not vague descriptions</li>
                <li className="pl-1"><strong>Measurable:</strong> Can be verified with available test equipment</li>
                <li className="pl-1"><strong>Achievable:</strong> Realistic given equipment specifications</li>
                <li className="pl-1"><strong>Documented:</strong> Written in commissioning specification before tender</li>
                <li className="pl-1"><strong>Tolerances:</strong> Acceptable range around target values</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Acceptance Criteria by System</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">System</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Parameter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Criteria</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Air distribution</td>
                      <td className="border border-white/10 px-3 py-2">Volume flow rate</td>
                      <td className="border border-white/10 px-3 py-2">±10% of design</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Air distribution</td>
                      <td className="border border-white/10 px-3 py-2">Noise level (NR rating)</td>
                      <td className="border border-white/10 px-3 py-2">≤ specified NR value</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Heating system</td>
                      <td className="border border-white/10 px-3 py-2">Temperature control</td>
                      <td className="border border-white/10 px-3 py-2">±1°C of setpoint</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Chilled water</td>
                      <td className="border border-white/10 px-3 py-2">Flow rate</td>
                      <td className="border border-white/10 px-3 py-2">±5% of design</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lighting</td>
                      <td className="border border-white/10 px-3 py-2">Illuminance</td>
                      <td className="border border-white/10 px-3 py-2">≥ specified lux level</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Generator</td>
                      <td className="border border-white/10 px-3 py-2">Start time</td>
                      <td className="border border-white/10 px-3 py-2">&lt;15 seconds to full load</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">UPS</td>
                      <td className="border border-white/10 px-3 py-2">Autonomy</td>
                      <td className="border border-white/10 px-3 py-2">≥ specified minutes at full load</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Performance Verification Process</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Stage 1 - Static tests:</strong> Component checks before operation</li>
                <li className="pl-1"><strong>Stage 2 - Dynamic tests:</strong> System operation under controlled conditions</li>
                <li className="pl-1"><strong>Stage 3 - Integrated tests:</strong> Multiple systems operating together</li>
                <li className="pl-1"><strong>Stage 4 - Witnessed tests:</strong> Key tests observed by client/consultant</li>
                <li className="pl-1"><strong>Stage 5 - Extended operation:</strong> Burn-in period under realistic loads</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Real-World Example: Data Centre Cooling Verification</p>
              <div className="text-sm text-white space-y-2">
                <p>A 500kW data centre cooling system requires comprehensive performance verification:</p>
                <ul className="list-disc list-outside ml-5">
                  <li><strong>Design criteria:</strong> 20°C ±1°C supply temperature, 45% ±5% RH</li>
                  <li><strong>Test method:</strong> Operate at 25%, 50%, 75%, 100% load using load banks</li>
                  <li><strong>Measurement:</strong> Temperature at 12 points per room, humidity at 4 points</li>
                  <li><strong>Duration:</strong> 4 hours stable operation at each load point</li>
                  <li><strong>Acceptance:</strong> All readings within tolerance, N+1 redundancy proven</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Industry guidance:</strong> CIBSE Commissioning Codes and BSRIA guides provide detailed acceptance criteria templates for common building services systems.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Test Certificates and Compliance Demonstration */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Test Certificates and Compliance Demonstration
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Test certificates provide formal documentation that systems have been tested and meet specified
              requirements. They form part of the building's permanent records and demonstrate compliance
              with Building Regulations, British Standards, and contractual obligations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Certification Documents</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Certificate</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Purpose</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Issued By</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Electrical Installation Certificate</td>
                      <td className="border border-white/10 px-3 py-2">BS 7671 compliance</td>
                      <td className="border border-white/10 px-3 py-2">Competent electrician</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">HVAC Commissioning Certificate</td>
                      <td className="border border-white/10 px-3 py-2">System performance verified</td>
                      <td className="border border-white/10 px-3 py-2">Commissioning engineer</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pressure Test Certificate</td>
                      <td className="border border-white/10 px-3 py-2">Pipework integrity</td>
                      <td className="border border-white/10 px-3 py-2">Mechanical contractor</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">F-Gas Certificate</td>
                      <td className="border border-white/10 px-3 py-2">Refrigerant system compliance</td>
                      <td className="border border-white/10 px-3 py-2">F-Gas certified engineer</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fire Alarm Certificate</td>
                      <td className="border border-white/10 px-3 py-2">BS 5839 compliance</td>
                      <td className="border border-white/10 px-3 py-2">Fire alarm installer</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Gas Safe Certificate</td>
                      <td className="border border-white/10 px-3 py-2">Gas installation safety</td>
                      <td className="border border-white/10 px-3 py-2">Gas Safe registered engineer</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Regulations Compliance Documentation</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Part L:</strong> Energy efficiency calculations, commissioning certificates, EPC</li>
                <li className="pl-1"><strong>Part F:</strong> Ventilation system commissioning, air flow test results</li>
                <li className="pl-1"><strong>Part B:</strong> Fire alarm certificates, emergency lighting tests</li>
                <li className="pl-1"><strong>Part P:</strong> Electrical installation certificates</li>
                <li className="pl-1"><strong>Part G:</strong> Hot water safety device certification</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">O&M Manual Contents</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">System descriptions and schematics</li>
                  <li className="pl-1">Equipment data sheets</li>
                  <li className="pl-1">Commissioning records and certificates</li>
                  <li className="pl-1">As-built drawings</li>
                  <li className="pl-1">Maintenance schedules</li>
                  <li className="pl-1">Spare parts lists</li>
                  <li className="pl-1">Warranty information</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Health and Safety File</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Design risk assessments</li>
                  <li className="pl-1">Hazardous materials register</li>
                  <li className="pl-1">Safe isolation procedures</li>
                  <li className="pl-1">Access requirements for maintenance</li>
                  <li className="pl-1">Emergency procedures</li>
                  <li className="pl-1">Key contact information</li>
                  <li className="pl-1">Residual risks register</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Handover Documentation Checklist</p>
              <div className="grid sm:grid-cols-2 gap-2 text-sm text-white">
                <div>
                  <p className="font-medium mb-1">Before Practical Completion:</p>
                  <ul className="space-y-1 list-disc list-outside ml-5">
                    <li>All test certificates issued</li>
                    <li>Snagging lists cleared</li>
                    <li>Building control sign-off</li>
                    <li>Training completed</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-1">At Handover:</p>
                  <ul className="space-y-1 list-disc list-outside ml-5">
                    <li>O&M manuals delivered</li>
                    <li>As-built drawings issued</li>
                    <li>Keys and access cards</li>
                    <li>Warranty documents</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Legal requirement:</strong> Under CDM Regulations, the health and safety file must be handed to the client and maintained for the life of the building.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Electrical Testing Programme</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Plan the testing programme for a new office building distribution system.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p><strong>Phase 1 - Pre-energisation:</strong></p>
                <p>• Visual inspection of all switchgear and cabling</p>
                <p>• Continuity of protective conductors</p>
                <p>• Insulation resistance (all circuits isolated)</p>
                <p>• Polarity checks</p>
                <p className="mt-2"><strong>Phase 2 - Energisation:</strong></p>
                <p>• Phase rotation verification</p>
                <p>• Voltage measurements at all distribution boards</p>
                <p>• Earth fault loop impedance</p>
                <p>• RCD functional tests</p>
                <p className="mt-2"><strong>Phase 3 - Functional:</strong></p>
                <p>• Protective device discrimination tests</p>
                <p>• Generator changeover tests</p>
                <p>• Emergency lighting duration (3-hour test)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: HVAC Acceptance Test Failure</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> An AHU delivers 4,200 l/s against design requirement of 5,000 l/s. How should this be managed?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p><strong>Analysis:</strong></p>
                <p>Shortfall = 5,000 - 4,200 = 800 l/s (16% below design)</p>
                <p>Acceptance tolerance = ±10% = 4,500 - 5,500 l/s</p>
                <p>Result: <span className="text-red-400">FAIL</span> - outside tolerance</p>
                <p className="mt-2"><strong>Investigation steps:</strong></p>
                <p>1. Check fan running at correct speed</p>
                <p>2. Verify filter condition (pressure drop)</p>
                <p>3. Check damper positions (fully open)</p>
                <p>4. Measure system static pressure</p>
                <p>5. Review ductwork for restrictions</p>
                <p className="mt-2"><strong>Resolution:</strong> Found partially closed fire damper</p>
                <p>After correction, retest achieved 4,950 l/s = <span className="text-green-400">PASS</span></p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Witness Test Documentation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Document a witnessed generator load test.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p><strong>TEST RECORD - Generator Load Bank Test</strong></p>
                <p>Date: 15/01/2026 | Project: Office Block A</p>
                <p>Equipment: 500kVA standby generator</p>
                <p className="mt-2"><strong>Test criteria:</strong></p>
                <p>• Start within 15 seconds of mains failure</p>
                <p>• Accept 100% load within 10 seconds</p>
                <p>• Maintain voltage ±2.5% at all loads</p>
                <p>• Maintain frequency ±0.5Hz</p>
                <p className="mt-2"><strong>Results:</strong></p>
                <p>Start time: 11.2 seconds <span className="text-green-400">✓ PASS</span></p>
                <p>Load acceptance: 8.5 seconds <span className="text-green-400">✓ PASS</span></p>
                <p>Voltage at 100%: 398V (±0.5%) <span className="text-green-400">✓ PASS</span></p>
                <p>Frequency at 100%: 50.1Hz <span className="text-green-400">✓ PASS</span></p>
                <p className="mt-2">Witnessed by: J. Smith (Client) / M. Jones (Consultant)</p>
                <p>Tested by: A. Brown (Commissioning Engineer)</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Testing Programme Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Review commissioning specification for all test requirements</li>
                <li className="pl-1">Prepare test procedures and record sheets in advance</li>
                <li className="pl-1">Verify all test instruments are calibrated and in date</li>
                <li className="pl-1">Confirm prerequisites are complete before each test</li>
                <li className="pl-1">Schedule witnessed tests with appropriate notice</li>
                <li className="pl-1">Document all results, including failures and retests</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Standards to Know</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>BS 7671:</strong> Electrical installation testing</li>
                <li className="pl-1"><strong>CIBSE Commissioning Codes:</strong> HVAC systems (A, B, C, M, R, W)</li>
                <li className="pl-1"><strong>BSRIA BG 8:</strong> Model commissioning specification</li>
                <li className="pl-1"><strong>DW/144:</strong> Ductwork air leakage testing</li>
                <li className="pl-1"><strong>BS 5839:</strong> Fire detection and alarm systems</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Testing Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Skipping pre-commissioning:</strong> Risks equipment damage and safety</li>
                <li className="pl-1"><strong>Vague acceptance criteria:</strong> Leads to disputes at handover</li>
                <li className="pl-1"><strong>Incomplete documentation:</strong> Affects building control sign-off</li>
                <li className="pl-1"><strong>Out-of-calibration instruments:</strong> Invalidates test results</li>
                <li className="pl-1"><strong>Not recording failures:</strong> Loses audit trail for due diligence</li>
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
                <p className="font-medium text-white mb-1">Testing Sequence</p>
                <ul className="space-y-0.5">
                  <li>1. Visual inspection</li>
                  <li>2. Pre-commissioning (dead) tests</li>
                  <li>3. Energisation/start-up</li>
                  <li>4. Performance verification</li>
                  <li>5. Integrated system tests</li>
                  <li>6. Witnessed tests and sign-off</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Documentation Required</p>
                <ul className="space-y-0.5">
                  <li>Test certificates (BS 7671, etc.)</li>
                  <li>Commissioning records</li>
                  <li>As-built drawings</li>
                  <li>O&M manuals</li>
                  <li>Health and safety file</li>
                  <li>Warranty documents</li>
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
            <Link to="../h-n-c-module5-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Quality Management
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module5-section4-6">
              Next: Continuous Improvement
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule5Section4_5;
