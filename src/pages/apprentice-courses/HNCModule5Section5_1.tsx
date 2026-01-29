import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Commissioning Planning - HNC Module 5 Section 5.1";
const DESCRIPTION = "Master commissioning planning for building services: CIBSE Code M principles, commissioning management plans, scheduling, resource coordination, and pre-requisites for successful system handover.";

const quickCheckQuestions = [
  {
    id: "cibse-code-m-purpose",
    question: "What is the primary purpose of CIBSE Code M?",
    options: ["To specify equipment ratings", "To provide guidance on commissioning building services", "To define electrical installation standards", "To set energy efficiency targets"],
    correctIndex: 1,
    explanation: "CIBSE Code M (Commissioning Management) provides comprehensive guidance on the commissioning of building services systems to ensure they operate as designed."
  },
  {
    id: "cmp-responsibility",
    question: "Who is typically responsible for producing the Commissioning Management Plan?",
    options: ["The building owner", "The commissioning manager", "The main contractor", "The equipment manufacturer"],
    correctIndex: 1,
    explanation: "The commissioning manager is responsible for producing and maintaining the Commissioning Management Plan, coordinating all commissioning activities across different building services disciplines."
  },
  {
    id: "commissioning-prerequisite",
    question: "Which of the following is a pre-requisite for commissioning HVAC systems?",
    options: ["Final decoration complete", "Building handed over", "Electrical supplies energised and tested", "All furniture installed"],
    correctIndex: 2,
    explanation: "Electrical supplies must be energised and tested before HVAC commissioning can begin, as the systems require power to operate during the commissioning process."
  },
  {
    id: "witness-testing",
    question: "What is the purpose of witness testing during commissioning?",
    options: ["To train maintenance staff", "To allow the client to verify system performance", "To identify design faults", "To complete snagging lists"],
    correctIndex: 1,
    explanation: "Witness testing allows the client or their representative to observe commissioning activities and verify that systems achieve the specified performance requirements."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "CIBSE Code M is divided into how many main parts?",
    options: [
      "Two parts - planning and execution",
      "Three parts - management, air systems, water systems",
      "Four parts - planning, execution, recording, handover",
      "Five parts covering all building services disciplines"
    ],
    correctAnswer: 1,
    explanation: "CIBSE Code M is structured in three main parts: Part A covers commissioning management, Part B covers air distribution systems, and Part C covers water distribution systems."
  },
  {
    id: 2,
    question: "At what project stage should the Commissioning Management Plan first be produced?",
    options: ["After practical completion", "During construction phase", "At design stage (RIBA Stage 3-4)", "During handover"],
    correctAnswer: 2,
    explanation: "The Commissioning Management Plan should be initiated during the design stage (RIBA Stage 3-4) to ensure commissioning requirements are incorporated into the design and specification."
  },
  {
    id: 3,
    question: "What is the recommended minimum notice period for witness testing?",
    options: ["24 hours", "48 hours", "7 days", "14 days"],
    correctAnswer: 2,
    explanation: "CIBSE Code M recommends a minimum of 7 days notice for witness testing to allow the client's representative adequate time to arrange attendance and prepare."
  },
  {
    id: 4,
    question: "Which document records all commissioning results for handover?",
    options: [
      "Building Log Book",
      "Commissioning Record",
      "O&M Manual",
      "As-built drawings"
    ],
    correctAnswer: 1,
    explanation: "The Commissioning Record documents all test results, settings, and commissioning data. This forms part of the handover documentation package alongside O&M manuals and as-built drawings."
  },
  {
    id: 5,
    question: "What percentage of commissioning time should typically be allowed for snagging and re-commissioning?",
    options: ["5-10%", "10-15%", "15-25%", "25-35%"],
    correctAnswer: 2,
    explanation: "Industry guidance suggests allowing 15-25% of total commissioning time for addressing snags and re-commissioning activities, as issues inevitably arise during the process."
  },
  {
    id: 6,
    question: "For a phased handover, commissioning should be planned to:",
    options: [
      "Complete all systems at once at the end",
      "Match the phasing of building occupation",
      "Prioritise electrical systems first",
      "Follow alphabetical order of systems"
    ],
    correctAnswer: 1,
    explanation: "Commissioning programmes must align with phased handover requirements, completing and demonstrating systems in each phase before that area is occupied."
  },
  {
    id: 7,
    question: "What is the role of commissioning specialists in the commissioning process?",
    options: [
      "To design the building services systems",
      "To carry out independent testing and balancing",
      "To manufacture equipment",
      "To approve planning applications"
    ],
    correctAnswer: 1,
    explanation: "Commissioning specialists are independent third parties who carry out testing, adjusting, and balancing of systems. Their independence provides quality assurance."
  },
  {
    id: 8,
    question: "Static completion of a system means:",
    options: [
      "The system has been commissioned",
      "Physical installation is complete but not powered",
      "The system has failed commissioning",
      "The system is operating at reduced capacity"
    ],
    correctAnswer: 1,
    explanation: "Static completion means the physical installation is complete, including all connections and containment, but the system has not yet been powered or commissioned."
  },
  {
    id: 9,
    question: "Which building services system typically requires the longest commissioning duration?",
    options: ["Lighting controls", "Fire alarm", "BMS and controls", "Hot water systems"],
    correctAnswer: 2,
    explanation: "Building Management Systems (BMS) and controls typically require the longest commissioning duration due to the complexity of integrating multiple systems, optimising control strategies, and seasonal commissioning requirements."
  },
  {
    id: 10,
    question: "What documentation must be available before commissioning an electrical distribution system?",
    options: [
      "Only the circuit diagrams",
      "Electrical installation certificates and test results",
      "Equipment warranties only",
      "Maintenance contracts"
    ],
    correctAnswer: 1,
    explanation: "Before commissioning electrical distribution systems, electrical installation certificates (EIC) and test results must be available to confirm the installation is safe and compliant with BS 7671."
  },
  {
    id: 11,
    question: "Seasonal commissioning refers to:",
    options: [
      "Commissioning only in summer months",
      "Commissioning heating and cooling systems in their respective seasons",
      "Annual recommissioning of all systems",
      "Commissioning during mild weather only"
    ],
    correctAnswer: 1,
    explanation: "Seasonal commissioning involves testing heating systems during cold weather and cooling systems during warm weather to verify performance under actual load conditions."
  },
  {
    id: 12,
    question: "A commissioning schedule should interface with:",
    options: [
      "Only the electrical installation programme",
      "The main construction programme and all trade programmes",
      "The architect's design programme only",
      "The client's business plan"
    ],
    correctAnswer: 1,
    explanation: "The commissioning schedule must interface with the main construction programme and all trade programmes to ensure pre-requisites are complete and resources are coordinated."
  }
];

const faqs = [
  {
    question: "What is the difference between commissioning and testing?",
    answer: "Testing verifies that individual components or systems meet specified parameters (e.g., insulation resistance, pressure tests). Commissioning is a broader process that includes testing but also involves setting up, adjusting, balancing, and optimising complete systems to achieve the design intent. Commissioning demonstrates that systems work together as an integrated whole."
  },
  {
    question: "When should the commissioning manager be appointed?",
    answer: "The commissioning manager should ideally be appointed during RIBA Stage 3 (Developed Design) or early Stage 4 (Technical Design). Early appointment allows input into buildability, commissioning access requirements, and ensures the design facilitates effective commissioning. Late appointment often leads to commissioning difficulties and programme delays."
  },
  {
    question: "How do you handle commissioning when seasonal conditions are not available?",
    answer: "For systems requiring seasonal conditions (heating in winter, cooling in summer), initial commissioning establishes base settings and verifies operation. Seasonal commissioning is then carried out during the appropriate season, often during the defects liability period. The contract should include provisions for return visits and seasonal commissioning activities."
  },
  {
    question: "What happens if commissioning reveals design or installation defects?",
    answer: "Defects discovered during commissioning are recorded and notified through the project defect reporting system. The commissioning manager assesses impact on programme and coordinates remedial works. Significant defects may require design changes and approvals. Re-commissioning is required after remedial works are complete."
  },
  {
    question: "How should commissioning be coordinated across multiple contractors?",
    answer: "The commissioning manager chairs regular commissioning progress meetings attended by all relevant contractors. A master commissioning schedule identifies interfaces and dependencies. Pre-commissioning checklists ensure each trade completes their pre-requisites. Clear communication protocols and a shared project platform help coordinate activities."
  },
  {
    question: "What training is required for commissioning specialists?",
    answer: "Commissioning specialists typically hold relevant trade qualifications plus specialist commissioning training. BSRIA offers accredited commissioning training courses. Many clients specify that commissioning engineers must hold CSCS cards and relevant competency certifications. BMS commissioning engineers often require manufacturer-specific training."
  }
];

const HNCModule5Section5_1 = () => {
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
            <span>Module 5.5.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Commissioning Planning
          </h1>
          <p className="text-white/80">
            CIBSE Code M principles, commissioning management plans, and coordination of building services commissioning
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>CIBSE Code M:</strong> Industry standard for commissioning management</li>
              <li className="pl-1"><strong>CMP:</strong> Commissioning Management Plan coordinates all activities</li>
              <li className="pl-1"><strong>Pre-requisites:</strong> Static completion before dynamic commissioning</li>
              <li className="pl-1"><strong>Integration:</strong> Aligns with construction programme and handover</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>HVAC:</strong> Air and water balancing, BMS integration</li>
              <li className="pl-1"><strong>Electrical:</strong> Protection settings, metering, controls</li>
              <li className="pl-1"><strong>Fire systems:</strong> Detection, suppression, cause and effect</li>
              <li className="pl-1"><strong>Lifts:</strong> Safety devices, door timing, levelling</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand CIBSE Code M structure and application",
              "Develop commissioning management plans for building services",
              "Schedule commissioning activities and resource requirements",
              "Identify pre-requisites for commissioning different systems",
              "Coordinate specialist commissioning contractors",
              "Integrate commissioning with project handover requirements"
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

        {/* Section 1: CIBSE Code M Structure */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            CIBSE Code M Structure and Principles
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              CIBSE Code M (Commissioning Management) is the industry standard guidance document for commissioning
              building services systems. It provides a structured framework ensuring that installed systems
              operate as designed and meet the client's requirements.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Code M Structure:</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Part</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Title</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Coverage</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Part A</td>
                      <td className="border border-white/10 px-3 py-2">Commissioning Management</td>
                      <td className="border border-white/10 px-3 py-2">Planning, organisation, documentation, handover</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Part B</td>
                      <td className="border border-white/10 px-3 py-2">Air Distribution Systems</td>
                      <td className="border border-white/10 px-3 py-2">Ductwork, AHUs, terminals, extract systems</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Part C</td>
                      <td className="border border-white/10 px-3 py-2">Water Distribution Systems</td>
                      <td className="border border-white/10 px-3 py-2">Heating, chilled water, domestic water</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Commissioning Principles</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Early planning:</strong> Commissioning requirements identified at design stage</li>
                <li className="pl-1"><strong>Clear responsibilities:</strong> Defined roles for all parties involved</li>
                <li className="pl-1"><strong>Systematic approach:</strong> Logical sequence from static to dynamic commissioning</li>
                <li className="pl-1"><strong>Documentation:</strong> Comprehensive records of all commissioning activities</li>
                <li className="pl-1"><strong>Verification:</strong> Independent checking and witness testing</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Related Standards and Guidance</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>BSRIA BG 8:</strong> Model Commissioning Plan</li>
                <li className="pl-1"><strong>BSRIA BG 29:</strong> Pre-commission Cleaning of Pipework Systems</li>
                <li className="pl-1"><strong>BSRIA AG 1:</strong> Commissioning Air Systems</li>
                <li className="pl-1"><strong>BSRIA AG 2:</strong> Commissioning Water Systems</li>
                <li className="pl-1"><strong>BS 7671:</strong> Electrical installation testing and commissioning</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Industry requirement:</strong> Most major building contracts and BREEAM assessments require compliance with CIBSE Code M commissioning principles.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Commissioning Management Plan */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Commissioning Management Plan Content
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Commissioning Management Plan (CMP) is the master document that defines how commissioning
              will be organised, executed, and documented. It is a living document updated throughout the project.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Management Sections</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Project description and scope</li>
                  <li className="pl-1">Commissioning objectives and criteria</li>
                  <li className="pl-1">Organisation and responsibilities</li>
                  <li className="pl-1">Communication protocols</li>
                  <li className="pl-1">Quality assurance procedures</li>
                  <li className="pl-1">Health and safety requirements</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Technical Sections</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Systems to be commissioned</li>
                  <li className="pl-1">Commissioning procedures per system</li>
                  <li className="pl-1">Pre-requisites and interfaces</li>
                  <li className="pl-1">Test equipment requirements</li>
                  <li className="pl-1">Acceptance criteria</li>
                  <li className="pl-1">Record formats and templates</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">CMP Development Stages</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Stage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">RIBA Stage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">CMP Content</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Initial</td>
                      <td className="border border-white/10 px-3 py-2">3-4</td>
                      <td className="border border-white/10 px-3 py-2">Strategy, objectives, initial programme</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Developed</td>
                      <td className="border border-white/10 px-3 py-2">4-5</td>
                      <td className="border border-white/10 px-3 py-2">Detailed procedures, responsibilities, schedules</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Final</td>
                      <td className="border border-white/10 px-3 py-2">5</td>
                      <td className="border border-white/10 px-3 py-2">Complete commissioning records, as-built data</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Real-World Example: Hospital Development</p>
              <p className="text-sm text-white">
                A 400-bed hospital CMP identified 47 separate building services systems requiring commissioning,
                with 12 specialist commissioning contractors. The CMP included detailed interface matrices showing
                dependencies between systems (e.g., medical gas commissioning requiring electrical completion,
                theatre ventilation requiring BMS integration). The commissioning programme spanned 18 months
                with seasonal commissioning provisions for heating and cooling systems.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> The CMP should be reviewed and updated at each project milestone and after significant changes to design or programme.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Scheduling and Resource Coordination */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Scheduling and Resource Coordination
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective commissioning scheduling requires integration with the main construction programme
              and coordination of specialist resources across multiple disciplines.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Commissioning Programme Structure</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Level 1:</strong> Master commissioning milestones aligned with main programme</li>
                <li className="pl-1"><strong>Level 2:</strong> Commissioning phases by building zone or system type</li>
                <li className="pl-1"><strong>Level 3:</strong> Detailed commissioning activities with durations and resources</li>
                <li className="pl-1"><strong>Level 4:</strong> Daily task schedules during active commissioning</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Commissioning Durations</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">System</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Duration Range</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Factors</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Electrical distribution</td>
                      <td className="border border-white/10 px-3 py-2">2-4 weeks</td>
                      <td className="border border-white/10 px-3 py-2">Number of boards, protection coordination</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lighting controls</td>
                      <td className="border border-white/10 px-3 py-2">1-3 weeks</td>
                      <td className="border border-white/10 px-3 py-2">System complexity, scene programming</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">HVAC air systems</td>
                      <td className="border border-white/10 px-3 py-2">4-8 weeks</td>
                      <td className="border border-white/10 px-3 py-2">Number of AHUs, VAV terminals</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">HVAC water systems</td>
                      <td className="border border-white/10 px-3 py-2">3-6 weeks</td>
                      <td className="border border-white/10 px-3 py-2">Number of circuits, balancing complexity</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">BMS and controls</td>
                      <td className="border border-white/10 px-3 py-2">6-12 weeks</td>
                      <td className="border border-white/10 px-3 py-2">Points count, integration requirements</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fire detection</td>
                      <td className="border border-white/10 px-3 py-2">2-4 weeks</td>
                      <td className="border border-white/10 px-3 py-2">Device count, cause and effect</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lifts</td>
                      <td className="border border-white/10 px-3 py-2">2-4 weeks per lift</td>
                      <td className="border border-white/10 px-3 py-2">Type, traffic analysis, firefighting mode</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Specialist Resources</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Air balancing engineers (BSRIA/NEBB)</li>
                  <li className="pl-1">Water balancing engineers</li>
                  <li className="pl-1">BMS commissioning engineers</li>
                  <li className="pl-1">Lighting control programmers</li>
                  <li className="pl-1">Fire system engineers</li>
                  <li className="pl-1">Lift commissioning engineers</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Coordination Requirements</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Weekly commissioning coordination meetings</li>
                  <li className="pl-1">Shared access schedules for plant rooms</li>
                  <li className="pl-1">Coordinated witness testing programme</li>
                  <li className="pl-1">Interface management between contractors</li>
                  <li className="pl-1">Progress reporting and KPI tracking</li>
                  <li className="pl-1">Defect management and resolution</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Programme tip:</strong> Build in 15-25% contingency for snagging and re-commissioning. Complex systems rarely commission perfectly first time.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Pre-requisites for Commissioning */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Pre-requisites for Commissioning
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Each building services system has specific pre-requisites that must be complete before
              commissioning can commence. Missing pre-requisites are a major cause of commissioning delays.
            </p>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">General Pre-requisites (All Systems)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Installation physically complete (static completion)</li>
                <li className="pl-1">All safety systems operational or suitable temporary measures</li>
                <li className="pl-1">Area clean and free from construction debris</li>
                <li className="pl-1">Adequate lighting for commissioning activities</li>
                <li className="pl-1">Safe access to all equipment and controls</li>
                <li className="pl-1">Relevant drawings and documentation available</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">System-Specific Pre-requisites</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">System</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Pre-requisites</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Electrical distribution</td>
                      <td className="border border-white/10 px-3 py-2">DNO supply available, installation certificates, earthing complete</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">HVAC air systems</td>
                      <td className="border border-white/10 px-3 py-2">Ductwork pressure tested, electrical supplies, controls wired</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">HVAC water systems</td>
                      <td className="border border-white/10 px-3 py-2">Pipework flushed and cleaned, chemical treatment, pump rotation checked</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">BMS</td>
                      <td className="border border-white/10 px-3 py-2">All field devices connected, network installed, graphics available</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fire detection</td>
                      <td className="border border-white/10 px-3 py-2">All devices installed, ceilings complete, interfaces connected</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lifts</td>
                      <td className="border border-white/10 px-3 py-2">Shaft complete, machine room ready, electrical supplies, fire service connections</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Emergency lighting</td>
                      <td className="border border-white/10 px-3 py-2">Permanent power available, batteries charged (24-48 hours minimum)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Pre-commissioning Checklist Process</p>
              <ol className="text-sm text-white space-y-1.5 list-decimal list-outside ml-5">
                <li className="pl-1">Installing contractor completes pre-commissioning checklist</li>
                <li className="pl-1">Commissioning manager reviews and signs off checklist</li>
                <li className="pl-1">Any outstanding items documented with resolution dates</li>
                <li className="pl-1">Commissioning start date confirmed once all items complete</li>
                <li className="pl-1">Checklist forms part of commissioning record</li>
              </ol>
            </div>

            <div className="my-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <p className="text-sm font-medium text-green-400 mb-2">Real-World Example: Office Building HVAC</p>
              <p className="text-sm text-white">
                A 15-storey office building commissioning was delayed by 3 weeks because water system
                pre-commissioning flushing was incomplete. Debris in pipework damaged pump seals during
                initial operation. The lesson: commissioning manager now requires photographic evidence
                of strainer condition and water sample test results before allowing pump energisation.
              </p>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Critical interface:</strong> Electrical installation must be complete with EIC issued before any HVAC, BMS, or life safety system commissioning can commence.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Commissioning Schedule Development</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Develop commissioning milestone dates for a 5,000m2 office building with handover on 1st September.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Working backwards from handover:</p>
                <p className="mt-2">1 Sept: Handover (practical completion)</p>
                <p>15 Aug: Witness testing complete (-2 weeks)</p>
                <p>1 Aug: BMS commissioning complete (-2 weeks)</p>
                <p>15 July: HVAC commissioning complete (-2 weeks)</p>
                <p>1 July: Electrical commissioning complete (-2 weeks)</p>
                <p>15 June: Static completion all systems (-2 weeks)</p>
                <p className="mt-2 text-green-400">Allow 2-week contingency before handover</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Resource Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Calculate air balancing resource requirement for 25 AHUs and 400 VAV terminals.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Typical production rates:</p>
                <p>AHU commissioning: 1-2 days each = 25-50 days</p>
                <p>VAV commissioning: 8-12 per day = 33-50 days</p>
                <p className="mt-2">Total air balancing duration: 58-100 days</p>
                <p className="mt-2">With 2-person team (standard):</p>
                <p>Programme duration: 29-50 working days</p>
                <p className="mt-2 text-green-400">Allow 8-10 weeks for air balancing phase</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Interface Matrix</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Identify commissioning dependencies for a fire alarm system.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Fire alarm commissioning requires:</p>
                <p className="mt-2">Before fire alarm:</p>
                <p className="ml-4">- Electrical distribution commissioned</p>
                <p className="ml-4">- All detectors and sounders installed</p>
                <p className="ml-4">- Ceilings substantially complete</p>
                <p className="ml-4">- Interface wiring to AHUs, dampers, lifts</p>
                <p className="mt-2">After fire alarm (dependent systems):</p>
                <p className="ml-4">- Smoke damper operation testing</p>
                <p className="ml-4">- AHU shutdown sequences</p>
                <p className="ml-4">- Lift recall testing</p>
                <p className="ml-4">- Door holder release testing</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Commissioning Manager Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Produce and maintain Commissioning Management Plan</li>
                <li className="pl-1">Chair weekly commissioning coordination meetings</li>
                <li className="pl-1">Review and approve pre-commissioning checklists</li>
                <li className="pl-1">Coordinate specialist commissioning contractors</li>
                <li className="pl-1">Arrange and attend witness testing</li>
                <li className="pl-1">Compile commissioning records for handover</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Witness testing notice: <strong>7 days minimum</strong></li>
                <li className="pl-1">Snagging contingency: <strong>15-25% of programme</strong></li>
                <li className="pl-1">BMS commissioning: <strong>longest duration system</strong></li>
                <li className="pl-1">CMP first issue: <strong>RIBA Stage 3-4</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Late CMP development</strong> - Leads to inadequate planning and resource issues</li>
                <li className="pl-1"><strong>Ignoring pre-requisites</strong> - Starting commissioning before systems ready</li>
                <li className="pl-1"><strong>Insufficient contingency</strong> - Unrealistic programmes without snagging allowance</li>
                <li className="pl-1"><strong>Poor coordination</strong> - Commissioning clashes between trades</li>
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
                  <li>Part A - Commissioning management</li>
                  <li>Part B - Air distribution systems</li>
                  <li>Part C - Water distribution systems</li>
                  <li>Related: BSRIA BG 8, AG 1, AG 2</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">CMP Key Contents</p>
                <ul className="space-y-0.5">
                  <li>Systems and procedures</li>
                  <li>Organisation and responsibilities</li>
                  <li>Programme and resources</li>
                  <li>Documentation and records</li>
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
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module5-section5-2">
              Next: Commissioning Procedures
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule5Section5_1;
