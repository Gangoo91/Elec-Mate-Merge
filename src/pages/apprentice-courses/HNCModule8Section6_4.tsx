import { ArrowLeft, PlayCircle, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Commissioning Procedures - HNC Module 8 Section 6.4";
const DESCRIPTION = "Master CIBSE Commissioning Code M requirements, witness testing procedures, seasonal commissioning and performance verification for building services.";

const quickCheckQuestions = [
  {
    id: "code-m-scope",
    question: "What is the primary purpose of CIBSE Commissioning Code M?",
    options: [
      "To specify equipment manufacturer requirements",
      "To provide a framework for systematic commissioning of building services",
      "To define electrical installation standards",
      "To regulate building construction methods"
    ],
    correctIndex: 1,
    explanation: "CIBSE Commissioning Code M provides a comprehensive framework for the systematic commissioning of building services, ensuring systems operate as designed and meet performance specifications."
  },
  {
    id: "static-vs-dynamic",
    question: "What is the key difference between static and dynamic commissioning?",
    options: [
      "Static commissioning is performed outdoors, dynamic indoors",
      "Static commissioning checks systems at rest, dynamic tests systems under operating conditions",
      "Static commissioning requires witness testing, dynamic does not",
      "Static commissioning is optional, dynamic is mandatory"
    ],
    correctIndex: 1,
    explanation: "Static commissioning involves checks and tests on systems at rest (e.g., ductwork pressure tests, valve settings), whilst dynamic commissioning tests systems under actual operating conditions with flows, temperatures and pressures."
  },
  {
    id: "witness-testing",
    question: "Who typically witnesses commissioning tests on major building projects?",
    options: [
      "Only the installing contractor",
      "The building owner exclusively",
      "The client's representative, commissioning manager, or independent commissioning specialist",
      "Local authority building control only"
    ],
    correctIndex: 2,
    explanation: "Witness testing involves the client's representative, commissioning manager or independent commissioning specialist observing and verifying that tests are conducted correctly and results meet specification."
  },
  {
    id: "seasonal-commissioning",
    question: "Why is seasonal commissioning necessary for HVAC systems?",
    options: [
      "To spread commissioning costs over multiple seasons",
      "To verify system performance under different ambient conditions (heating and cooling modes)",
      "Because building regulations require quarterly testing",
      "To allow equipment manufacturers time to visit site"
    ],
    correctIndex: 1,
    explanation: "Seasonal commissioning verifies that HVAC systems perform correctly under both heating and cooling conditions, which cannot be fully tested during a single commissioning period regardless of season."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "According to CIBSE Commissioning Code M, when should commissioning management begin?",
    options: [
      "After practical completion",
      "During the design stage",
      "When installation is 75% complete",
      "At the start of the defects liability period"
    ],
    correctAnswer: 1,
    explanation: "CIBSE Code M emphasises that commissioning management should begin during the design stage to ensure systems are designed for commissioning and that commissioning requirements are integrated into specifications."
  },
  {
    id: 2,
    question: "What does the commissioning specification typically include?",
    options: [
      "Only the list of equipment to be commissioned",
      "Design criteria, test procedures, acceptance criteria, witnessing requirements and documentation",
      "Equipment manufacturer contact details",
      "Building insurance requirements"
    ],
    correctAnswer: 1,
    explanation: "A comprehensive commissioning specification includes design criteria against which to commission, detailed test procedures, acceptance criteria, witnessing requirements, and documentation requirements."
  },
  {
    id: 3,
    question: "What is the purpose of a commissioning programme?",
    options: [
      "To list all equipment serial numbers",
      "To schedule commissioning activities in logical sequence, coordinated with construction programme",
      "To record final test results",
      "To specify equipment maintenance intervals"
    ],
    correctAnswer: 1,
    explanation: "The commissioning programme schedules commissioning activities in logical sequence, ensuring prerequisites are complete before dependent activities begin, and coordinates with the overall construction programme."
  },
  {
    id: 4,
    question: "During static commissioning of an air handling unit, which checks would be performed?",
    options: [
      "Measuring supply air temperatures",
      "Verifying fan rotational direction, belt tension, damper operation and filter installation",
      "Recording room temperatures",
      "Testing BMS alarm responses"
    ],
    correctAnswer: 1,
    explanation: "Static commissioning of an AHU includes checking fan rotation direction, belt tension and alignment, damper operation through full travel, filter installation and sealing, and access panel security."
  },
  {
    id: 5,
    question: "What is the typical tolerance for air flow rates at terminal devices according to CIBSE guidelines?",
    options: [
      "Exactly as designed with no tolerance",
      "+/- 5% of design flow rate",
      "+/- 10% of design flow rate",
      "+/- 20% of design flow rate"
    ],
    correctAnswer: 2,
    explanation: "CIBSE guidelines typically specify +/- 10% tolerance on air flow rates at terminal devices. Tighter tolerances may be specified for critical applications such as operating theatres or cleanrooms."
  },
  {
    id: 6,
    question: "What documentation should be prepared for witness testing?",
    options: [
      "No documentation is required for witness testing",
      "Test procedures, blank test sheets, calibration certificates for instruments, and method statements",
      "Only the equipment manuals",
      "Building plans only"
    ],
    correctAnswer: 1,
    explanation: "Witness testing requires prepared test procedures, blank test sheets for recording results, current calibration certificates for all test instruments, method statements, and risk assessments."
  },
  {
    id: 7,
    question: "What is a 'snagging list' in the context of commissioning?",
    options: [
      "A list of equipment to be commissioned",
      "A record of defects, incomplete items and remedial works required before handover",
      "A list of building occupants",
      "The commissioning programme schedule"
    ],
    correctAnswer: 1,
    explanation: "A snagging list records defects, incomplete works, and items requiring remedial action identified during commissioning, inspections and witness testing that must be resolved before final handover."
  },
  {
    id: 8,
    question: "What is the purpose of trend logging during commissioning?",
    options: [
      "To record staff attendance on site",
      "To capture system performance data over time for analysis and verification",
      "To log material deliveries",
      "To track commissioning costs"
    ],
    correctAnswer: 1,
    explanation: "Trend logging captures system performance data (temperatures, pressures, flows, energy consumption) over time, enabling analysis of system behaviour, identification of issues, and verification of design performance."
  },
  {
    id: 9,
    question: "During seasonal commissioning in cooling mode, what key parameters should be verified?",
    options: [
      "Heating coil temperatures only",
      "Chiller performance, cooling coil operation, condenser water temperatures and space cooling capacity",
      "Boiler efficiency only",
      "Radiator heat output"
    ],
    correctAnswer: 1,
    explanation: "Cooling season commissioning verifies chiller performance and capacity, cooling coil operation, condenser water temperatures and flow rates, space cooling capacity, and dehumidification performance."
  },
  {
    id: 10,
    question: "What is performance verification in the context of building services?",
    options: [
      "Checking equipment is installed correctly",
      "Demonstrating that systems achieve their design intent under actual operating conditions",
      "Verifying manufacturer warranties",
      "Confirming contractor insurance"
    ],
    correctAnswer: 1,
    explanation: "Performance verification demonstrates that building services systems achieve their design intent, delivering required environmental conditions, energy performance and operational efficiency under actual operating conditions."
  },
  {
    id: 11,
    question: "What is the recommended duration for extended performance monitoring?",
    options: [
      "24 hours",
      "One week",
      "Typically 12 months to capture seasonal variations",
      "48 hours"
    ],
    correctAnswer: 2,
    explanation: "Extended performance monitoring typically continues for 12 months post-handover to capture full seasonal variations, verify energy performance, and identify any issues that only manifest under specific conditions."
  },
  {
    id: 12,
    question: "Who is responsible for coordinating commissioning activities across different trades?",
    options: [
      "Each individual subcontractor",
      "The commissioning manager or commissioning management contractor",
      "The building owner",
      "Local authority inspectors"
    ],
    correctAnswer: 1,
    explanation: "The commissioning manager (or commissioning management contractor on larger projects) coordinates commissioning activities across all trades, ensuring logical sequencing, resolving interface issues and maintaining the commissioning programme."
  }
];

const faqs = [
  {
    question: "What is the difference between commissioning and testing?",
    answer: "Testing is a component of commissioning that verifies specific parameters meet specification. Commissioning is the broader process of bringing systems from installation through to full operational status, including setting to work, regulation, testing, performance verification and handover documentation. Testing confirms compliance; commissioning ensures systems work as intended."
  },
  {
    question: "When should the commissioning manager be appointed?",
    answer: "Ideally, the commissioning manager should be appointed during RIBA Stage 3 (Developed Design) or earlier. Early appointment allows input to design for commissioning, development of commissioning specifications, and planning of commissioning activities. Late appointment often results in inadequate commissioning and performance issues."
  },
  {
    question: "What happens if seasonal commissioning cannot be completed before handover?",
    answer: "If seasonal commissioning cannot be completed before handover, arrangements should be made for the commissioning team to return during the appropriate season. This is typically covered in the defects liability period or through a separate extended commissioning agreement. Results should be documented and any required adjustments made."
  },
  {
    question: "How are commissioning results documented?",
    answer: "Commissioning results are documented through commissioning records (test sheets with measured values), trend data exports, witness test certificates, snagging lists and closeout reports, commissioning summary reports, and inclusion in O&M manuals. All records should be traceable to specific equipment and test procedures."
  },
  {
    question: "What is the role of Building Management System (BMS) in commissioning?",
    answer: "The BMS plays a crucial role in commissioning by enabling system monitoring, control point verification, alarm testing, trend logging, and performance data collection. BMS commissioning includes verifying all points, testing control sequences, setting up trends and alarms, and demonstrating functionality to the client."
  },
  {
    question: "How do you handle commissioning defects and snagging items?",
    answer: "Commissioning defects are recorded on snagging lists with clear descriptions, locations and photographs. Items are categorised by severity and responsibility. Progress is tracked through regular snagging meetings. Critical items preventing handover must be resolved immediately; minor items may be addressed during the defects liability period with agreed timescales."
  }
];

const HNCModule8Section6_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section6">
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
            <PlayCircle className="h-4 w-4" />
            <span>Module 8.6.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Commissioning Procedures
          </h1>
          <p className="text-white/80">
            CIBSE Code M, witness testing, seasonal commissioning and performance verification
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>CIBSE Code M:</strong> Framework for systematic commissioning of building services</li>
              <li className="pl-1"><strong>Commissioning stages:</strong> Static checks, dynamic testing, performance verification</li>
              <li className="pl-1"><strong>Witness testing:</strong> Independent verification of critical test results</li>
              <li className="pl-1"><strong>Seasonal:</strong> Verify heating and cooling operation under actual conditions</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Coordination:</strong> Commissioning spans all MEP trades</li>
              <li className="pl-1"><strong>Timing:</strong> Plan from design stage, execute post-installation</li>
              <li className="pl-1"><strong>Documentation:</strong> Comprehensive records for O&amp;M manuals</li>
              <li className="pl-1"><strong>Handover:</strong> Demonstrates systems meet design intent</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply CIBSE Commissioning Code M requirements to building services projects",
              "Distinguish between static and dynamic commissioning activities",
              "Plan and execute witness testing procedures",
              "Understand seasonal commissioning requirements for HVAC systems",
              "Implement performance verification methodologies",
              "Manage snagging and defects resolution processes"
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

        {/* Section 1: CIBSE Commissioning Code M */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            CIBSE Commissioning Code M
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              CIBSE Commissioning Code M provides a comprehensive framework for the systematic commissioning
              of building services installations. The code establishes best practice procedures that ensure
              systems are set to work correctly, regulated to design parameters, and demonstrated to meet
              their specified performance requirements.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Principles of Code M</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Early involvement:</strong> Commissioning management should begin at design stage</li>
                <li className="pl-1"><strong>Systematic approach:</strong> Logical progression from pre-commissioning through to handover</li>
                <li className="pl-1"><strong>Documentation:</strong> Comprehensive records of all commissioning activities</li>
                <li className="pl-1"><strong>Verification:</strong> Independent checking of results against design criteria</li>
                <li className="pl-1"><strong>Integration:</strong> Coordination across all building services disciplines</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Commissioning Management Structure</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Role</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Responsibilities</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Appointment Stage</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Commissioning Manager</td>
                      <td className="border border-white/10 px-3 py-2">Overall coordination, programme, quality assurance</td>
                      <td className="border border-white/10 px-3 py-2">RIBA Stage 3</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Commissioning Engineer</td>
                      <td className="border border-white/10 px-3 py-2">Technical supervision of commissioning activities</td>
                      <td className="border border-white/10 px-3 py-2">RIBA Stage 4</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Commissioning Specialist</td>
                      <td className="border border-white/10 px-3 py-2">Discipline-specific commissioning (HVAC, electrical, controls)</td>
                      <td className="border border-white/10 px-3 py-2">RIBA Stage 5</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Witness</td>
                      <td className="border border-white/10 px-3 py-2">Independent verification of test results</td>
                      <td className="border border-white/10 px-3 py-2">As required</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Commissioning Specification Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Design criteria and performance parameters to be achieved</li>
                <li className="pl-1">Test procedures and methodologies for each system type</li>
                <li className="pl-1">Acceptance criteria and tolerances for measured values</li>
                <li className="pl-1">Witness testing requirements and hold points</li>
                <li className="pl-1">Documentation and record-keeping requirements</li>
                <li className="pl-1">Calibration requirements for test instruments</li>
                <li className="pl-1">Health and safety requirements for commissioning activities</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> The commissioning specification should be developed alongside the
              technical specifications during design, ensuring that systems are designed with commissioning
              requirements in mind and that adequate access, test points and isolation are provided.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Static and Dynamic Commissioning */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Static and Dynamic Commissioning
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Commissioning activities are typically divided into static commissioning (pre-commissioning checks
              on systems at rest) and dynamic commissioning (testing systems under operating conditions).
              Both phases are essential and must be completed in sequence for successful commissioning.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Static Commissioning (Pre-commissioning)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Visual inspection of installation quality</li>
                  <li className="pl-1">Verification of equipment installation</li>
                  <li className="pl-1">Checking mechanical fixings and supports</li>
                  <li className="pl-1">Ductwork pressure testing</li>
                  <li className="pl-1">Pipework pressure testing</li>
                  <li className="pl-1">Valve position and accessibility checks</li>
                  <li className="pl-1">Damper operation through full travel</li>
                  <li className="pl-1">Electrical installation verification</li>
                  <li className="pl-1">Motor rotation direction checks</li>
                  <li className="pl-1">Belt tension and alignment</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Dynamic Commissioning</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Setting systems to work</li>
                  <li className="pl-1">Air flow measurement and regulation</li>
                  <li className="pl-1">Water flow measurement and balancing</li>
                  <li className="pl-1">Temperature differential checks</li>
                  <li className="pl-1">Pressure readings under load</li>
                  <li className="pl-1">Control sequence verification</li>
                  <li className="pl-1">BMS point commissioning</li>
                  <li className="pl-1">Safety device testing</li>
                  <li className="pl-1">Interlock verification</li>
                  <li className="pl-1">Performance testing</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Commissioning Sequence</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Phase</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Activities</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Prerequisites</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1. Pre-commissioning</td>
                      <td className="border border-white/10 px-3 py-2">Static checks, pressure tests, visual inspection</td>
                      <td className="border border-white/10 px-3 py-2">Installation complete, power available</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2. Setting to work</td>
                      <td className="border border-white/10 px-3 py-2">Initial start-up, direction checks, basic operation</td>
                      <td className="border border-white/10 px-3 py-2">Pre-commissioning signed off</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3. Regulation</td>
                      <td className="border border-white/10 px-3 py-2">Flow balancing, damper setting, valve adjustment</td>
                      <td className="border border-white/10 px-3 py-2">Systems operational</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4. Controls commissioning</td>
                      <td className="border border-white/10 px-3 py-2">BMS points, control loops, sequences</td>
                      <td className="border border-white/10 px-3 py-2">Mechanical regulation complete</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5. Performance testing</td>
                      <td className="border border-white/10 px-3 py-2">Capacity verification, efficiency measurement</td>
                      <td className="border border-white/10 px-3 py-2">Controls commissioned</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">6. Witness testing</td>
                      <td className="border border-white/10 px-3 py-2">Demonstration to client, sign-off</td>
                      <td className="border border-white/10 px-3 py-2">All commissioning complete</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Air System Commissioning Tolerances (CIBSE Code A)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Total system air flow: +/- 5% of design</li>
                <li className="pl-1">Individual terminal devices: +/- 10% of design</li>
                <li className="pl-1">Supply air temperature: +/- 1degC of setpoint</li>
                <li className="pl-1">Room temperature: +/- 1degC of design</li>
                <li className="pl-1">Relative humidity: +/- 5% RH of design</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Critical sequence:</strong> Always complete static commissioning before attempting dynamic
              commissioning. Operating systems with incomplete pre-commissioning risks equipment damage, safety
              hazards, and invalidates commissioning results.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Witness Testing Procedures */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Witness Testing Procedures
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Witness testing provides independent verification that commissioning tests have been conducted
              correctly and that results meet specified requirements. It is a formal process requiring
              preparation, documentation and sign-off by authorised representatives.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Witness Testing Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Hold points:</strong> Activities that cannot proceed without witness sign-off</li>
                <li className="pl-1"><strong>Notification points:</strong> Activities requiring advance notice to witnesses</li>
                <li className="pl-1"><strong>Review points:</strong> Documentation review and acceptance</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Preparation for Witness Testing</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Item</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Requirement</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Responsibility</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Test procedures</td>
                      <td className="border border-white/10 px-3 py-2">Approved written procedures for each test</td>
                      <td className="border border-white/10 px-3 py-2">Commissioning manager</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Test sheets</td>
                      <td className="border border-white/10 px-3 py-2">Blank forms ready for recording results</td>
                      <td className="border border-white/10 px-3 py-2">Commissioning specialist</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Calibration certificates</td>
                      <td className="border border-white/10 px-3 py-2">Current certificates for all test instruments</td>
                      <td className="border border-white/10 px-3 py-2">Commissioning specialist</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Method statements</td>
                      <td className="border border-white/10 px-3 py-2">Safe systems of work for testing activities</td>
                      <td className="border border-white/10 px-3 py-2">Contractor</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Risk assessments</td>
                      <td className="border border-white/10 px-3 py-2">Hazard identification and controls</td>
                      <td className="border border-white/10 px-3 py-2">Contractor</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">PPE</td>
                      <td className="border border-white/10 px-3 py-2">Appropriate protective equipment for witnesses</td>
                      <td className="border border-white/10 px-3 py-2">Contractor</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Tests Typically Requiring Witnessing</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Pressure testing of pipework systems</li>
                  <li className="pl-1">Ductwork air tightness testing</li>
                  <li className="pl-1">Fire damper operation testing</li>
                  <li className="pl-1">Smoke control system testing</li>
                  <li className="pl-1">Emergency generator load testing</li>
                  <li className="pl-1">UPS system performance testing</li>
                  <li className="pl-1">Chiller performance verification</li>
                  <li className="pl-1">Boiler efficiency testing</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Witness Test Documentation</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Completed test sheets with all readings</li>
                  <li className="pl-1">Instrument identification and calibration status</li>
                  <li className="pl-1">Names and signatures of witnesses</li>
                  <li className="pl-1">Date, time and ambient conditions</li>
                  <li className="pl-1">Pass/fail determination with reference</li>
                  <li className="pl-1">Snagging items and defects noted</li>
                  <li className="pl-1">Photographs where required</li>
                  <li className="pl-1">Sign-off or rejection statement</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Witness Test Process</p>
              <ol className="text-sm text-white space-y-1.5 list-decimal list-outside ml-5">
                <li className="pl-1"><strong>Notification:</strong> Give required notice to witnesses (typically 48-72 hours)</li>
                <li className="pl-1"><strong>Pre-meeting:</strong> Review procedures and safety requirements</li>
                <li className="pl-1"><strong>Instrument check:</strong> Verify calibration of all test equipment</li>
                <li className="pl-1"><strong>Test execution:</strong> Conduct tests per approved procedures</li>
                <li className="pl-1"><strong>Recording:</strong> Document all readings on test sheets</li>
                <li className="pl-1"><strong>Evaluation:</strong> Compare results against acceptance criteria</li>
                <li className="pl-1"><strong>Sign-off:</strong> Witness signature confirming acceptance or rejection</li>
                <li className="pl-1"><strong>Follow-up:</strong> Address any snagging items identified</li>
              </ol>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Important:</strong> Tests conducted without proper witness attendance when required may need
              to be repeated, causing programme delays and additional costs. Always confirm witness availability
              before scheduling hold point tests.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Seasonal Commissioning and Performance Verification */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Seasonal Commissioning and Performance Verification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Seasonal commissioning addresses the reality that HVAC systems cannot be fully commissioned
              during a single period if that period does not include both heating and cooling demands.
              Performance verification demonstrates that systems achieve their design intent under actual
              operating conditions over an extended period.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Seasonal Commissioning Requirements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Season</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Systems Tested</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Parameters</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Heating Season</td>
                      <td className="border border-white/10 px-3 py-2">Boilers, heating coils, radiators, underfloor heating</td>
                      <td className="border border-white/10 px-3 py-2">Flow temperatures, heat output, efficiency</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cooling Season</td>
                      <td className="border border-white/10 px-3 py-2">Chillers, cooling coils, condensers, free cooling</td>
                      <td className="border border-white/10 px-3 py-2">Cooling capacity, COP, dehumidification</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Intermediate</td>
                      <td className="border border-white/10 px-3 py-2">Economiser cycles, mixed mode operation</td>
                      <td className="border border-white/10 px-3 py-2">Changeover, free cooling optimisation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Heating Season Verification</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Boiler firing sequence and modulation</li>
                  <li className="pl-1">Flow and return temperatures</li>
                  <li className="pl-1">Heat output capacity verification</li>
                  <li className="pl-1">Heating control response</li>
                  <li className="pl-1">Frost protection operation</li>
                  <li className="pl-1">Zone temperature control</li>
                  <li className="pl-1">Optimum start/stop operation</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cooling Season Verification</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Chiller capacity and efficiency (COP)</li>
                  <li className="pl-1">Condenser water temperatures</li>
                  <li className="pl-1">Cooling coil performance</li>
                  <li className="pl-1">Dehumidification effectiveness</li>
                  <li className="pl-1">Free cooling changeover</li>
                  <li className="pl-1">Cooling tower operation</li>
                  <li className="pl-1">Peak load performance</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Performance Verification Framework</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Design criteria:</strong> Document target performance parameters from design</li>
                <li className="pl-1"><strong>Measurement plan:</strong> Define how each parameter will be measured and verified</li>
                <li className="pl-1"><strong>Trend logging:</strong> Configure BMS to capture relevant data over time</li>
                <li className="pl-1"><strong>Analysis:</strong> Review data to identify performance gaps</li>
                <li className="pl-1"><strong>Optimisation:</strong> Fine-tune systems to improve performance</li>
                <li className="pl-1"><strong>Verification report:</strong> Document achieved performance against design</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Extended Performance Monitoring (12 months)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Parameter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Monitoring Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Review Frequency</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Energy consumption</td>
                      <td className="border border-white/10 px-3 py-2">Sub-metering, BMS trends</td>
                      <td className="border border-white/10 px-3 py-2">Monthly</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Space temperatures</td>
                      <td className="border border-white/10 px-3 py-2">BMS zone sensors</td>
                      <td className="border border-white/10 px-3 py-2">Weekly</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Plant efficiency</td>
                      <td className="border border-white/10 px-3 py-2">Calculated from flow/energy data</td>
                      <td className="border border-white/10 px-3 py-2">Monthly</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Occupant comfort</td>
                      <td className="border border-white/10 px-3 py-2">Feedback, complaints log</td>
                      <td className="border border-white/10 px-3 py-2">Ongoing</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Alarm frequency</td>
                      <td className="border border-white/10 px-3 py-2">BMS alarm logs</td>
                      <td className="border border-white/10 px-3 py-2">Weekly</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Snagging and Defects Management</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Recording:</strong> Log all defects with clear descriptions, locations, photographs</li>
                <li className="pl-1"><strong>Categorisation:</strong> Priority 1 (safety/critical), Priority 2 (operational), Priority 3 (minor)</li>
                <li className="pl-1"><strong>Responsibility:</strong> Assign each item to responsible party</li>
                <li className="pl-1"><strong>Tracking:</strong> Maintain snagging register with status updates</li>
                <li className="pl-1"><strong>Close-out:</strong> Verify rectification and sign off completed items</li>
                <li className="pl-1"><strong>Escalation:</strong> Process for unresolved items at defects period end</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>BREEAM context:</strong> Seasonal commissioning and extended performance monitoring are
              requirements for achieving higher BREEAM ratings. Credits are available for demonstrating that
              buildings perform as designed through post-occupancy evaluation.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Air Handling Unit Commissioning</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Commission a 5000 l/s supply AHU with heating and cooling coils, HEPA filtration, and variable speed supply and extract fans.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="font-bold text-elec-yellow/80">Static Commissioning:</p>
                <p>1. Check installation: Verify AHU level, ductwork sealed, dampers accessible</p>
                <p>2. Pressure test: Ductwork &lt;5% leakage at 400Pa (Class C)</p>
                <p>3. Motor checks: Rotation direction, belt tension, guards fitted</p>
                <p>4. Damper operation: Full travel, actuators responding</p>
                <p>5. Filter installation: HEPA filters sealed, pre-filters in place</p>
                <p className="mt-2 font-bold text-elec-yellow/80">Dynamic Commissioning:</p>
                <p>1. Set to work: Start fans, check airflow direction</p>
                <p>2. Measure total airflow: Design 5000 l/s, Measured 5120 l/s (+2.4%)</p>
                <p>3. Balance terminals: Adjust each to +/- 10% of design</p>
                <p>4. Coil testing: Verify heating output, cooling capacity</p>
                <p>5. Controls: Commission BMS points, test sequences</p>
                <p className="mt-2 text-green-400">Result: System within tolerance, witness test passed</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Chilled Water System Commissioning</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Commission a chilled water system with 500kW chiller, primary/secondary pumping, and 20 fan coil units.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="font-bold text-elec-yellow/80">Static Commissioning:</p>
                <p>1. Pressure test: System at 6 bar, 24hr hold, no pressure drop</p>
                <p>2. Flush and clean: Water quality to BSRIA standard</p>
                <p>3. Valve checks: Isolation valves, balancing valves accessible</p>
                <p>4. Chiller: Refrigerant charge, oil levels, electrical connections</p>
                <p className="mt-2 font-bold text-elec-yellow/80">Dynamic Commissioning:</p>
                <p>1. Pump commissioning: Primary 25 l/s, Secondary 22 l/s</p>
                <p>2. Water balancing: Proportional balance to +/- 10%</p>
                <p>3. FCU commissioning: Each unit flow verified</p>
                <p className="mt-2 font-bold text-elec-yellow/80">Seasonal (Cooling):</p>
                <p>Chiller performance test:</p>
                <p>  - Design cooling capacity: 500kW</p>
                <p>  - Measured at 32degC ambient: 485kW (97% of design)</p>
                <p>  - COP measured: 3.2 (design 3.0) - exceeds specification</p>
                <p className="mt-2 text-green-400">Result: Performance verified, exceeds design COP</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Witness Test - Fire Damper Testing</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Witness testing of 45 fire dampers to BS EN 15650 requirements.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="font-bold text-elec-yellow/80">Preparation:</p>
                <p>- Test procedure approved by commissioning manager</p>
                <p>- Blank test sheets for 45 dampers</p>
                <p>- Access equipment arranged (scaffold, MEWP)</p>
                <p>- 48hr notice given to client's witness</p>
                <p className="mt-2 font-bold text-elec-yellow/80">Test Procedure (each damper):</p>
                <p>1. Verify damper location matches drawing</p>
                <p>2. Check accessibility for inspection/testing</p>
                <p>3. Operate thermal release mechanism</p>
                <p>4. Confirm full closure (no visible gaps)</p>
                <p>5. Reset damper to open position</p>
                <p>6. Test actuator operation (if motorised)</p>
                <p>7. Record results on test sheet</p>
                <p className="mt-2 font-bold text-elec-yellow/80">Results:</p>
                <p>- 43 dampers passed first time</p>
                <p>- 2 dampers failed (thermal link not releasing) - replaced</p>
                <p>- Re-test: Both passed</p>
                <p className="mt-2 text-green-400">Witness signed off: All 45 dampers satisfactory</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 4: Snagging List Management</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Managing snagging items identified during commissioning of a 5-storey office building.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="font-bold text-elec-yellow/80">Initial Snagging List (142 items):</p>
                <p>Priority 1 (Critical): 8 items</p>
                <p>  - Fire damper not closing (Level 3)</p>
                <p>  - Emergency lighting failure (stairwell)</p>
                <p>  - Smoke detector not connected (server room)</p>
                <p className="mt-2">Priority 2 (Operational): 67 items</p>
                <p>  - FCU airflow 15% below design (various)</p>
                <p>  - BMS trend logging not configured</p>
                <p>  - Valve labels missing</p>
                <p className="mt-2">Priority 3 (Minor): 67 items</p>
                <p>  - Ceiling tile marks</p>
                <p>  - Grille alignment</p>
                <p>  - Documentation formatting</p>
                <p className="mt-2 font-bold text-elec-yellow/80">Resolution Timeline:</p>
                <p>- Priority 1: Resolved within 48 hours (before handover)</p>
                <p>- Priority 2: 80% resolved by practical completion</p>
                <p>- Priority 3: Addressed during defects period</p>
                <p className="mt-2 text-green-400">Final status at DLP end: 142/142 items closed</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Documents for Commissioning</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Commissioning specification:</strong> Defines requirements and acceptance criteria</li>
                <li className="pl-1"><strong>Commissioning programme:</strong> Schedule of activities and dependencies</li>
                <li className="pl-1"><strong>Method statements:</strong> Safe procedures for commissioning activities</li>
                <li className="pl-1"><strong>Test sheets:</strong> Standard forms for recording results</li>
                <li className="pl-1"><strong>Snagging register:</strong> Track defects and resolution</li>
                <li className="pl-1"><strong>Commissioning report:</strong> Summary of results and handover</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Common Commissioning Tolerances</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Air flow (system):</strong> +/- 5% of design total</li>
                <li className="pl-1"><strong>Air flow (terminal):</strong> +/- 10% of design</li>
                <li className="pl-1"><strong>Water flow:</strong> +/- 10% of design</li>
                <li className="pl-1"><strong>Temperature (supply):</strong> +/- 1degC of setpoint</li>
                <li className="pl-1"><strong>Temperature (space):</strong> +/- 1degC of design</li>
                <li className="pl-1"><strong>Pressure:</strong> +/- 10% of design</li>
                <li className="pl-1"><strong>Humidity:</strong> +/- 5% RH of design</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Commissioning Issues</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Inadequate access:</strong> Design should allow for commissioning access</li>
                <li className="pl-1"><strong>Missing test points:</strong> Specify during design, not after installation</li>
                <li className="pl-1"><strong>Incomplete installation:</strong> Commissioning attempted too early</li>
                <li className="pl-1"><strong>Poor documentation:</strong> Ensure specifications include commissioning requirements</li>
                <li className="pl-1"><strong>Time pressure:</strong> Allow adequate programme time for commissioning</li>
                <li className="pl-1"><strong>Coordination failures:</strong> Ensure all trades are ready before starting</li>
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
                <p className="font-medium text-white mb-1">CIBSE Code M Structure</p>
                <ul className="space-y-0.5">
                  <li>Design stage: Commissioning management planning</li>
                  <li>Pre-commissioning: Static checks and tests</li>
                  <li>Setting to work: Initial system start-up</li>
                  <li>Regulation: Flow balancing and adjustment</li>
                  <li>Commissioning: Performance demonstration</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Standards</p>
                <ul className="space-y-0.5">
                  <li>CIBSE Commissioning Code M</li>
                  <li>CIBSE Commissioning Codes A, C, R, W</li>
                  <li>BSRIA Commissioning Guides (BG series)</li>
                  <li>ASHRAE Guideline 0 and 1.1</li>
                  <li>BS EN 12599 (HVAC testing)</li>
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
            <Link to="../h-n-c-module8-section6-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Interface Coordination
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section6-5">
              Next: Documentation
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule8Section6_4;
