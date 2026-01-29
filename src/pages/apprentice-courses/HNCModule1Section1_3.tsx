import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "CDM Regulations 2015 - HNC Module 1 Section 1.3";
const DESCRIPTION = "Master the Construction (Design and Management) Regulations 2015 for building services: duty holders, client duties, Principal Designer and Contractor roles, F10 notifications, and Construction Phase Plans.";

const quickCheckQuestions = [
  {
    id: "cdm-client-domestic",
    question: "Under CDM 2015, when does a domestic client's duties transfer to another duty holder?",
    options: ["Never - domestic clients always retain duties", "When they appoint a Principal Contractor", "Automatically to the contractor in control of the construction phase", "Only when notified to the HSE"],
    correctIndex: 2,
    explanation: "Under Regulation 7, domestic client duties automatically transfer to the contractor in control of the construction phase, or to the Principal Contractor on projects with more than one contractor. This recognises that domestic clients lack construction expertise."
  },
  {
    id: "cdm-f10-trigger",
    question: "An F10 notification to HSE is required when a project exceeds which threshold?",
    options: ["Any project with more than one contractor", "30 working days with more than 20 workers OR 500 person-days", "Projects over £100,000 value", "All commercial construction projects"],
    correctIndex: 1,
    explanation: "F10 notification is required for projects lasting more than 30 working days with more than 20 workers at any one time, OR exceeding 500 person-days of construction work. This applies regardless of project value."
  },
  {
    id: "cdm-principal-designer",
    question: "What is the PRIMARY duty of the Principal Designer under CDM 2015?",
    options: ["Managing all site contractors", "Planning, managing and coordinating health and safety during the pre-construction phase", "Writing the Construction Phase Plan", "Conducting site safety inspections"],
    correctIndex: 1,
    explanation: "The Principal Designer's primary duty is planning, managing and coordinating health and safety in the pre-construction phase. They ensure designers comply with their duties and that design risks are eliminated or reduced so far as reasonably practicable."
  },
  {
    id: "cdm-cpp-required",
    question: "Who is responsible for ensuring a Construction Phase Plan is in place before the construction phase begins?",
    options: ["The Client", "The Principal Designer", "The Principal Contractor", "The HSE"],
    correctIndex: 2,
    explanation: "The Principal Contractor must draw up a Construction Phase Plan before the construction phase begins. However, the Client must ensure this plan is in place before allowing construction to start - a joint responsibility."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Under CDM 2015, which duty holder must make suitable arrangements for managing a project including allocating sufficient time and resources?",
    options: [
      "Principal Designer",
      "Principal Contractor",
      "Client",
      "Designer"
    ],
    correctAnswer: 2,
    explanation: "The Client has overarching duties under Regulation 4 to make suitable arrangements for managing the project, including allocating sufficient time and resources. This ensures projects are not rushed and properly resourced for health and safety."
  },
  {
    id: 2,
    question: "A building services contractor is installing a new electrical distribution system in an occupied office building. The project will last 8 weeks with a maximum of 12 workers. Is an F10 notification required?",
    options: ["Yes - any project over 4 weeks requires notification", "Yes - commercial projects always require notification", "No - does not meet the 30 days with 20+ workers threshold", "No - building services work is exempt from CDM"],
    correctAnswer: 2,
    explanation: "No F10 is required. The project is 8 weeks (40 days) but only has 12 workers maximum, not exceeding 20. The alternative 500 person-days threshold (8×5×12 = 480 person-days) is also not exceeded."
  },
  {
    id: 3,
    question: "Which document must be prepared by the Principal Designer and passed to the Client at project completion?",
    options: ["Construction Phase Plan", "F10 Notification", "Health and Safety File", "Designer Risk Assessment"],
    correctAnswer: 2,
    explanation: "The Health and Safety File must be prepared by the Principal Designer (or Principal Contractor if no PD) and handed to the Client at project completion. It contains information needed for future construction work on the building."
  },
  {
    id: 4,
    question: "An M&E consultancy is designing HVAC systems for a new hospital. Under CDM 2015, what is their PRIMARY duty as a Designer?",
    options: [
      "Prepare the Construction Phase Plan",
      "Eliminate foreseeable risks or reduce them so far as is reasonably practicable",
      "Manage all contractors on site",
      "Notify HSE of the project"
    ],
    correctAnswer: 1,
    explanation: "Designers must eliminate foreseeable health and safety risks or, where not possible, reduce them so far as is reasonably practicable. For HVAC, this includes considering safe access for maintenance, weight of equipment, and installation sequences."
  },
  {
    id: 5,
    question: "The Principal Contractor must ensure which of the following regarding welfare facilities?",
    options: [
      "Facilities are available from day one of construction",
      "Facilities meet minimum standards in Schedule 2",
      "Both A and B",
      "Facilities are the Client's responsibility"
    ],
    correctAnswer: 2,
    explanation: "The Principal Contractor must ensure suitable welfare facilities (toilets, washing, rest areas, drinking water) are available from the start of construction and meet the minimum standards set out in Schedule 2 of CDM 2015."
  },
  {
    id: 6,
    question: "A domestic client is having a house rewire. Under CDM 2015, who holds the client duties?",
    options: [
      "The homeowner retains all client duties",
      "The electrical contractor controlling the work",
      "The local Building Control authority",
      "No client duties apply to domestic work"
    ],
    correctAnswer: 1,
    explanation: "For domestic clients, client duties automatically transfer to the contractor in control of the construction phase (Regulation 7). The homeowner is not expected to have construction health and safety expertise."
  },
  {
    id: 7,
    question: "Which of the following must be included in a Construction Phase Plan?",
    options: [
      "Arrangements for managing health and safety risks",
      "The health and safety aims of the project",
      "Site rules and emergency procedures",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "The Construction Phase Plan must include all of these elements plus arrangements for coordination, site induction, welfare facilities, and any project-specific requirements. It is the key document for managing H&S during construction."
  },
  {
    id: 8,
    question: "Under CDM 2015, at what point must a Principal Designer be appointed on a notifiable project?",
    options: [
      "Before the construction phase begins",
      "As soon as practicable and before the construction phase begins",
      "Within 14 days of project commencement",
      "When HSE requests it"
    ],
    correctAnswer: 1,
    explanation: "The Client must appoint a Principal Designer 'as soon as is practicable, and in any event before the construction phase begins'. Early appointment allows proper influence over design decisions and health and safety planning."
  },
  {
    id: 9,
    question: "A building services designer specifies cable containment at high level requiring work at height for installation and maintenance. What CDM duty does this engage?",
    options: [
      "No duty - contractors choose installation methods",
      "Designer duty to eliminate or reduce foreseeable risks",
      "Principal Contractor duty to plan safe access",
      "Client duty to provide suitable equipment"
    ],
    correctAnswer: 1,
    explanation: "The Designer has a duty to consider risks from the design. Specifying high-level containment creates foreseeable work at height risks for installation AND future maintenance. The designer should consider whether lower-level routing is reasonably practicable."
  },
  {
    id: 10,
    question: "Which regulation requires the Principal Contractor to consult and engage with workers on health and safety matters?",
    options: [
      "Regulation 8 - General duties",
      "Regulation 13 - Duties of Principal Contractors",
      "Regulation 14 - Principal Contractor's duties to consult",
      "Regulation 15 - Duties of contractors"
    ],
    correctAnswer: 2,
    explanation: "Regulation 14 specifically requires the Principal Contractor to consult and engage with workers and their representatives on health and safety matters. This includes site inductions, toolbox talks, and ensuring workers can raise concerns."
  },
  {
    id: 11,
    question: "The Health and Safety File should contain information about which of the following?",
    options: [
      "As-built drawings showing service routes and isolation points",
      "Hazardous materials used or encountered",
      "Information needed for future construction work",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "The H&S File must contain all information useful for future construction work including as-built drawings, hazardous materials, structural information, and any residual risks. For building services, this includes cable routes, isolation points, and asbestos surveys."
  },
  {
    id: 12,
    question: "A contractor on a multi-contractor site must cooperate with the Principal Contractor by:",
    options: [
      "Following site rules",
      "Providing information for the Construction Phase Plan",
      "Complying with reasonable directions",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Contractors must cooperate with the Principal Contractor by following site rules, providing information for the CPP, reporting incidents, and complying with reasonable directions. This duty under Regulation 15 enables effective coordination."
  }
];

const faqs = [
  {
    question: "Does CDM 2015 apply to all building services work?",
    answer: "CDM 2015 applies to all construction work in Great Britain, which includes installation, maintenance, repair, and removal of building services (electrical, mechanical, plumbing). Even small jobs like installing a new distribution board or replacing an AHU are covered. The regulations scale with project complexity - more duty holders and documentation are required for larger, higher-risk projects."
  },
  {
    question: "What is the difference between a Designer and Principal Designer?",
    answer: "A Designer is anyone who prepares or modifies designs for construction work - including M&E consultants, electrical contractors designing installations, and manufacturers specifying bespoke equipment. The Principal Designer is the organisation appointed by the Client to plan, manage and coordinate health and safety during the pre-construction phase on projects with more than one contractor. The Principal Designer has additional duties around coordination and the Health and Safety File."
  },
  {
    question: "When does an electrical contractor become a Principal Contractor?",
    answer: "An electrical contractor becomes Principal Contractor when appointed by the Client on a project with more than one contractor to plan, manage and coordinate the construction phase. On single-contractor projects, the contractor automatically has Principal Contractor duties. For domestic clients, the contractor controlling the work assumes client duties automatically under Regulation 7."
  },
  {
    question: "What should building services designers include in the Health and Safety File?",
    answer: "Building services designers should contribute: as-built drawings showing cable routes, pipework, and equipment locations; isolation and switching arrangements; weight and lifting requirements for heavy equipment (transformers, chillers); access requirements for maintenance; hazardous materials (PCBs in old capacitors, refrigerants); and any residual risks that cannot be designed out (e.g., high-level access for luminaire replacement)."
  },
  {
    question: "How does CDM 2015 affect design decisions for electrical installations?",
    answer: "CDM 2015 requires designers to consider buildability and maintainability. This means designing adequate working space around switchgear, considering safe access for cable installation, specifying lighter alternatives where manual handling is a risk, ensuring isolation points are accessible, and avoiding designs that create confined space entry requirements. The hierarchy is: eliminate, reduce, inform about residual risks."
  },
  {
    question: "What happens if CDM duties are breached?",
    answer: "Breach of CDM 2015 is a criminal offence. HSE can issue improvement or prohibition notices, and prosecutions can result in unlimited fines and up to 2 years imprisonment. Directors can be personally liable if offences are committed with their consent or connivance. Beyond legal penalties, breaches often indicate systemic failures that increase accident risk."
  }
];

const HNCModule1Section1_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module1-section1">
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
            <span>Module 1.1.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            CDM Regulations 2015
          </h1>
          <p className="text-white/80">
            The Construction (Design and Management) Regulations - the framework for managing health and safety throughout construction projects
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>CDM 2015:</strong> Applies to ALL construction work in GB</li>
              <li className="pl-1"><strong>Duty holders:</strong> Client, Designer, Principal Designer, Principal Contractor, Contractor</li>
              <li className="pl-1"><strong>F10:</strong> Notify HSE for projects exceeding thresholds</li>
              <li className="pl-1"><strong>CPP:</strong> Construction Phase Plan required before work starts</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>M&E designers:</strong> Must consider installation and maintenance risks</li>
              <li className="pl-1"><strong>Contractors:</strong> Often Principal Contractor on refurbishment projects</li>
              <li className="pl-1"><strong>Coordination:</strong> Critical for multi-service installations</li>
              <li className="pl-1"><strong>H&S File:</strong> Must include as-built service information</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify the five duty holder roles and their responsibilities",
              "Understand Client duties and when F10 notification is required",
              "Explain the Principal Designer's role in the pre-construction phase",
              "Describe Principal Contractor duties and the Construction Phase Plan",
              "Apply CDM requirements to building services coordination",
              "Contribute appropriate information to the Health and Safety File"
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

        {/* Section 1: Duty Holders */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Duty Holders and Their Responsibilities
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              CDM 2015 replaced the previous 2007 regulations and introduced significant changes including
              the new Principal Designer role. The regulations place duties on five categories of duty
              holder, with responsibilities proportionate to their ability to influence project health and safety.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Five Duty Holders</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Duty Holder</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Who</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Duties</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Client</td>
                      <td className="border border-white/10 px-3 py-2">Anyone for whom construction work is carried out</td>
                      <td className="border border-white/10 px-3 py-2">Make suitable arrangements, appoint duty holders, provide pre-construction information</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Principal Designer</td>
                      <td className="border border-white/10 px-3 py-2">Designer appointed by Client (projects with more than one contractor)</td>
                      <td className="border border-white/10 px-3 py-2">Plan, manage and coordinate pre-construction phase H&S, prepare H&S File</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Designer</td>
                      <td className="border border-white/10 px-3 py-2">Anyone who prepares or modifies designs</td>
                      <td className="border border-white/10 px-3 py-2">Eliminate or reduce foreseeable risks, provide information about residual risks</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Principal Contractor</td>
                      <td className="border border-white/10 px-3 py-2">Contractor appointed by Client (projects with more than one contractor)</td>
                      <td className="border border-white/10 px-3 py-2">Plan, manage and coordinate construction phase, prepare CPP, ensure welfare</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Contractor</td>
                      <td className="border border-white/10 px-3 py-2">Anyone who carries out or manages construction work</td>
                      <td className="border border-white/10 px-3 py-2">Plan and manage own work safely, cooperate with Principal Contractor</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key principles of CDM 2015:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Duties are proportionate to the ability to influence project H&S</li>
                <li className="pl-1">The Client is the most influential - they appoint the team and set the programme</li>
                <li className="pl-1">Designers can eliminate risks before they reach site</li>
                <li className="pl-1">Everyone has a duty to cooperate and communicate</li>
                <li className="pl-1">Competence requirements removed - focus on skills, knowledge, experience</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> On single-contractor projects, the contractor automatically takes on Principal Designer and Principal Contractor duties - no separate appointments needed.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Client Duties and F10 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Client Duties and F10 Notification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Client has overarching duties to ensure projects are set up for success. Even commercial
              clients who lack construction expertise cannot delegate their statutory duties - they must
              make suitable arrangements or appoint competent duty holders to assist them.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Core Client Duties (Regulation 4):</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Make suitable arrangements for managing the project</li>
                <li className="pl-1">Allocate sufficient time and resources</li>
                <li className="pl-1">Appoint Principal Designer and Principal Contractor in writing (multi-contractor projects)</li>
                <li className="pl-1">Provide pre-construction information to designers and contractors</li>
                <li className="pl-1">Ensure a Construction Phase Plan is in place before construction starts</li>
                <li className="pl-1">Ensure welfare facilities are provided from day one</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">F10 Notification Thresholds</p>
              <p className="text-sm text-white mb-3">The Client must notify HSE when a project:</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-black/30">
                  <p className="font-bold text-elec-yellow mb-1">Duration + Workers</p>
                  <p className="text-sm text-white/90">More than 30 working days AND more than 20 workers at any one time</p>
                </div>
                <div className="p-3 rounded bg-black/30">
                  <p className="font-bold text-elec-yellow mb-1">OR Person-Days</p>
                  <p className="text-sm text-white/90">More than 500 person-days of construction work</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">F10 Notification Contents</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Date of submission and address of construction site</li>
                <li className="pl-1">Client name, address and contact details</li>
                <li className="pl-1">Principal Designer and Principal Contractor details</li>
                <li className="pl-1">Date construction phase is planned to start and estimated duration</li>
                <li className="pl-1">Maximum number of workers and contractors on site at any one time</li>
                <li className="pl-1">Name and address of anyone who has already been appointed</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Timing:</strong> F10 must be submitted as soon as practicable before the construction phase begins. It can be submitted electronically via the HSE website.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Principal Designer Role */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Principal Designer Role
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Principal Designer replaced the CDM Coordinator role from the 2007 regulations. Unlike
              the coordinator role, the Principal Designer must be a designer themselves - they cannot
              simply coordinate without having design capability and understanding.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Principal Designer Duties (Regulation 11):</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Plan, manage and monitor the pre-construction phase</li>
                <li className="pl-1">Identify and eliminate or control foreseeable risks</li>
                <li className="pl-1">Ensure designers comply with their duties under Regulation 9</li>
                <li className="pl-1">Ensure all designers cooperate and coordinate their work</li>
                <li className="pl-1">Assist the Client with pre-construction information</li>
                <li className="pl-1">Prepare and update the Health and Safety File</li>
                <li className="pl-1">Liaise with the Principal Contractor during construction</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Designer Duties for Building Services (Regulation 9)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Design Aspect</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Risk Consideration</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Mitigation Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cable containment routes</td>
                      <td className="border border-white/10 px-3 py-2">Work at height for installation/maintenance</td>
                      <td className="border border-white/10 px-3 py-2">Route at lower level where practicable</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Distribution board location</td>
                      <td className="border border-white/10 px-3 py-2">Access for testing, maintenance, isolation</td>
                      <td className="border border-white/10 px-3 py-2">Adequate working space, good lighting</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Heavy equipment (transformers)</td>
                      <td className="border border-white/10 px-3 py-2">Manual handling, lifting operations</td>
                      <td className="border border-white/10 px-3 py-2">Access for mechanical handling, lifting points</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Service penetrations</td>
                      <td className="border border-white/10 px-3 py-2">Structural integrity, fire stopping</td>
                      <td className="border border-white/10 px-3 py-2">Coordinate with structural engineer early</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Roof-mounted equipment</td>
                      <td className="border border-white/10 px-3 py-2">Edge protection, access routes</td>
                      <td className="border border-white/10 px-3 py-2">Design permanent access and fall protection</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 my-6">
              <p className="text-sm text-amber-300">
                <strong>Design Risk Hierarchy:</strong> Designers must apply the hierarchy: (1) Eliminate hazards where possible, (2) Reduce risks that cannot be eliminated, (3) Provide information about significant residual risks. Simply noting a risk in a risk register does not discharge the duty.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Note:</strong> On projects where the Principal Designer's appointment ends before construction completion, they must pass the H&S File to the Principal Contractor who then maintains and completes it.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Principal Contractor and CPP */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Principal Contractor and Construction Phase Plan
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Principal Contractor manages health and safety during the construction phase. They must
              be a contractor - an organisation or individual who carries out or manages construction work.
              The CPP is the key document that sets out how the construction phase will be managed safely.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Principal Contractor Duties (Regulations 12-14):</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Plan, manage and monitor the construction phase</li>
                <li className="pl-1">Draw up the Construction Phase Plan before work starts</li>
                <li className="pl-1">Organise cooperation between contractors</li>
                <li className="pl-1">Ensure suitable site inductions are provided</li>
                <li className="pl-1">Take reasonable steps to prevent unauthorised access</li>
                <li className="pl-1">Ensure welfare facilities are in place from day one</li>
                <li className="pl-1">Consult and engage with workers on H&S matters</li>
                <li className="pl-1">Liaise with Principal Designer on design matters</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Construction Phase Plan Contents</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-white/70 mb-2">Required Elements:</p>
                  <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Description of the project</li>
                    <li className="pl-1">Management arrangements</li>
                    <li className="pl-1">Arrangements for controlling significant risks</li>
                    <li className="pl-1">Health and safety aims for the project</li>
                    <li className="pl-1">Site rules</li>
                    <li className="pl-1">Emergency procedures</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs text-white/70 mb-2">Building Services Specifics:</p>
                  <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Isolation procedures for live systems</li>
                    <li className="pl-1">Permit to work systems</li>
                    <li className="pl-1">Coordination between M&E trades</li>
                    <li className="pl-1">Commissioning sequences</li>
                    <li className="pl-1">Interface with occupied areas</li>
                    <li className="pl-1">Hot work procedures</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Services Coordination Requirements</p>
              <p className="text-sm text-white mb-3">M&E installation requires careful coordination due to:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Shared routes:</strong> Cable trays, pipework, ductwork competing for ceiling void space</li>
                <li className="pl-1"><strong>Sequencing:</strong> Containment before cables, pipework before insulation</li>
                <li className="pl-1"><strong>Testing interfaces:</strong> Electrical tests before BMS integration</li>
                <li className="pl-1"><strong>Fire stopping:</strong> All penetrations must be coordinated and properly sealed</li>
                <li className="pl-1"><strong>Live systems:</strong> Working near or on energised equipment requires permits</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Health and Safety File - Building Services Content</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">As-built drawings showing cable routes, containment, equipment locations</li>
                <li className="pl-1">Schematic diagrams and circuit charts</li>
                <li className="pl-1">Isolation and switching arrangements</li>
                <li className="pl-1">Equipment O&M manuals and specifications</li>
                <li className="pl-1">Hazardous materials (asbestos surveys, refrigerant types, PCBs)</li>
                <li className="pl-1">Structural information (lifting points, floor loadings)</li>
                <li className="pl-1">Access requirements for maintenance</li>
                <li className="pl-1">Residual risks not eliminated by design</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Client responsibility:</strong> The Client must keep the H&S File available for inspection and ensure it is revised if further construction work takes place. The file stays with the building.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Notification Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A new office fit-out will take 12 weeks. The workforce will ramp up from 5 workers in weeks 1-2, to 15 workers in weeks 3-8, then 8 workers in weeks 9-12. Is F10 notification required?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Check threshold 1: More than 30 days with more than 20 workers?</p>
                <p>Maximum workers = 15 (does not exceed 20) - <span className="text-red-400">NO</span></p>
                <p className="mt-2">Check threshold 2: More than 500 person-days?</p>
                <p>Weeks 1-2: 2 × 5 × 5 = 50 person-days</p>
                <p>Weeks 3-8: 6 × 5 × 15 = 450 person-days</p>
                <p>Weeks 9-12: 4 × 5 × 8 = 160 person-days</p>
                <p className="mt-2">Total = 50 + 450 + 160 = <strong>660 person-days</strong></p>
                <p className="mt-2 text-green-400">✓ Exceeds 500 - F10 NOTIFICATION REQUIRED</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Designer Risk Considerations</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> An M&E consultant is designing the electrical installation for a warehouse with 10m high ceilings. What CDM considerations apply to luminaire specification?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm text-white/90">
                <p className="font-medium mb-2">Design Risks to Consider:</p>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Installation: Work at height, MEWP access, lifting heavy luminaires</li>
                  <li>Maintenance: Lamp replacement, cleaning, emergency light testing</li>
                  <li>Future alterations: Relamping, upgrade to LED, layout changes</li>
                </ul>
                <p className="font-medium mt-3 mb-2">Designer's Response:</p>
                <ul className="list-disc ml-5 space-y-1">
                  <li><strong>Eliminate:</strong> Specify long-life LED luminaires (25,000+ hours)</li>
                  <li><strong>Reduce:</strong> Use high-level access with lowering winches for maintenance</li>
                  <li><strong>Inform:</strong> Note in H&S File that MEWP access is required, specify clear zones</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Duty Holder Identification</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> A property management company commissions a rewire of a commercial unit. They appoint an electrical contractor who designs and installs the new system. Identify the duty holders.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm text-white/90">
                <p><strong>Client:</strong> Property management company</p>
                <p className="text-white/60 text-xs ml-4">- Has duties even though they appoint only one contractor</p>
                <p className="mt-2"><strong>Designer:</strong> Electrical contractor (they design the installation)</p>
                <p className="text-white/60 text-xs ml-4">- Must consider risks in design decisions</p>
                <p className="mt-2"><strong>Principal Designer:</strong> Electrical contractor (single contractor project)</p>
                <p className="text-white/60 text-xs ml-4">- Duties apply automatically, no separate appointment needed</p>
                <p className="mt-2"><strong>Principal Contractor:</strong> Electrical contractor (single contractor)</p>
                <p className="text-white/60 text-xs ml-4">- Must prepare CPP if project is notifiable</p>
                <p className="mt-2"><strong>Contractor:</strong> Electrical contractor</p>
                <p className="text-white/60 text-xs ml-4">- General contractor duties also apply</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Regulations to Know</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Regulation 4:</strong> Client duties</li>
                <li className="pl-1"><strong>Regulation 6:</strong> Notification (F10)</li>
                <li className="pl-1"><strong>Regulation 7:</strong> Domestic clients</li>
                <li className="pl-1"><strong>Regulation 9:</strong> Designer duties</li>
                <li className="pl-1"><strong>Regulation 11:</strong> Principal Designer duties</li>
                <li className="pl-1"><strong>Regulation 12-13:</strong> Principal Contractor duties</li>
                <li className="pl-1"><strong>Regulation 14:</strong> Worker consultation</li>
                <li className="pl-1"><strong>Schedule 2:</strong> Welfare facilities minimum standards</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Notification Thresholds Summary</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">More than 30 working days AND more than 20 workers, OR</li>
                <li className="pl-1">More than 500 person-days of construction work</li>
                <li className="pl-1">Notify as soon as practicable before construction starts</li>
                <li className="pl-1">Can be submitted online via HSE website</li>
                <li className="pl-1">Display F10 in site office (or where impracticable, keep available)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Compliance Failures</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>No written appointment:</strong> PD and PC must be appointed in writing</li>
                <li className="pl-1"><strong>Late CPP:</strong> Must exist BEFORE construction starts</li>
                <li className="pl-1"><strong>Generic CPP:</strong> Must be project-specific, not a template</li>
                <li className="pl-1"><strong>Missing H&S File:</strong> Must be handed to Client at completion</li>
                <li className="pl-1"><strong>Designer duties ignored:</strong> Designing risks into projects</li>
                <li className="pl-1"><strong>No pre-construction information:</strong> Client must provide to designers</li>
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
                <p className="font-medium text-white mb-1">Duty Holders</p>
                <ul className="space-y-0.5">
                  <li>Client - Overall project arrangements</li>
                  <li>Principal Designer - Pre-construction H&S</li>
                  <li>Designer - Eliminate/reduce design risks</li>
                  <li>Principal Contractor - Construction phase</li>
                  <li>Contractor - Own work and cooperation</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Documents</p>
                <ul className="space-y-0.5">
                  <li>F10 - HSE notification (if thresholds met)</li>
                  <li>Pre-construction information - From Client</li>
                  <li>Construction Phase Plan - Before work starts</li>
                  <li>Health and Safety File - At completion</li>
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
            <Link to="../h-n-c-module1-section1-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module1-section1-4">
              Next: Section 1.4
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule1Section1_3;
