/**
 * Level 3 Module 6 Section 1.3 - Client Requirements and Design Specifications
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Client Requirements and Design Specifications - Level 3 Module 6 Section 1.3";
const DESCRIPTION = "Learn to interpret client briefs, establish design specifications, and translate requirements into practical electrical installation designs compliant with BS 7671.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the primary purpose of a design brief in electrical installation work?",
    options: [
      "To satisfy building regulations only",
      "To establish clear requirements and expectations between client and designer",
      "To calculate cable sizes automatically",
      "To replace the need for site surveys"
    ],
    correctIndex: 1,
    explanation: "A design brief establishes clear requirements and expectations between client and designer. It captures what the client needs, their constraints, and preferences, forming the foundation for all design decisions and helping avoid costly misunderstandings later."
  },
  {
    id: "check-2",
    question: "When interpreting client requirements, which factor typically takes priority?",
    options: [
      "Aesthetic preferences",
      "Safety and regulatory compliance",
      "Cost minimisation",
      "Installation speed"
    ],
    correctIndex: 1,
    explanation: "Safety and regulatory compliance always take priority. While cost, aesthetics, and programme are important considerations, no design can compromise on safety requirements or BS 7671 compliance. These are non-negotiable foundations upon which other factors are balanced."
  },
  {
    id: "check-3",
    question: "A client requests a socket every 2 metres in a commercial kitchen. What should the designer do?",
    options: [
      "Install exactly as requested without question",
      "Refuse the request as impractical",
      "Review the request against regulations and discuss appropriate IP ratings and RCD protection",
      "Install standard domestic sockets to save cost"
    ],
    correctIndex: 2,
    explanation: "The designer should review the request against regulations for commercial kitchens, including IP ratings (typically IP44 minimum), RCD protection, and positioning relative to water sources. The client's needs are valid but must be met within regulatory requirements."
  },
  {
    id: "check-4",
    question: "What documentation should typically accompany a completed electrical design specification?",
    options: [
      "Only the final invoice",
      "Design calculations, drawings, equipment schedules, and compliance statements",
      "Manufacturer brochures only",
      "Verbal agreements are sufficient"
    ],
    correctIndex: 1,
    explanation: "A completed specification should include design calculations (cable sizing, voltage drop, fault levels), layout drawings, circuit schedules, equipment schedules, and statements of compliance with BS 7671 and other relevant standards. This documentation is essential for verification and future reference."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A client brief for a new office development states '200 workstations with IT provision'. What information is essential to clarify before proceeding with the electrical design?",
    options: [
      "The colour of the carpet",
      "Power density per workstation, UPS requirements, and data infrastructure coordination",
      "The name of the building contractor",
      "Whether to use plastic or metal switches"
    ],
    correctAnswer: 1,
    explanation: "Power density (W/m² or VA per workstation), UPS/standby power needs, and coordination with IT infrastructure are essential for correctly sizing supplies, circuits, and containment. These directly affect distribution board sizing, cable sizing, and diversity calculations."
  },
  {
    id: 2,
    question: "When translating a client's functional requirements into a design specification, which BS 7671 appendix provides guidance on estimated current demand?",
    options: [
      "Appendix 1 - Definitions",
      "Appendix 4 - Current-carrying capacities",
      "Appendix 14 - Methods of measuring earth fault loop impedance",
      "Appendix 15 - Estimated current demand"
    ],
    correctAnswer: 3,
    explanation: "Appendix 15 of BS 7671 provides guidance on estimated current demand and diversity for different types of installations. This is essential when translating client requirements into actual circuit designs and supply sizing."
  },
  {
    id: 3,
    question: "A client specification requires 'future expansion capability'. How should this be addressed in the electrical design?",
    options: [
      "Ignore it - clients always change their minds anyway",
      "Double all cable sizes regardless of cost",
      "Include spare capacity in distribution boards, cable containment, and supply infrastructure as agreed",
      "Only provide spare fuses"
    ],
    correctAnswer: 2,
    explanation: "Future expansion should be addressed through agreed spare capacity - typically spare ways in distribution boards (20-30%), oversized containment, and potentially larger incoming supplies. The extent should be documented and agreed to balance cost against flexibility."
  },
  {
    id: 4,
    question: "What is 'design risk assessment' in the context of CDM Regulations and electrical installation design?",
    options: [
      "Checking the client's credit rating",
      "Identifying and mitigating risks arising from design decisions that affect construction, maintenance, and use",
      "Calculating the prospective fault current",
      "Testing insulation resistance before design"
    ],
    correctAnswer: 1,
    explanation: "Under CDM Regulations, designers must identify risks arising from their design decisions and either eliminate them or reduce them through design changes. This includes considering safe access for maintenance, avoiding work at height where possible, and designing out electrical hazards."
  },
  {
    id: 5,
    question: "A client requests 'industrial-grade installation' for a warehouse. Which factors differentiate industrial specifications from commercial?",
    options: [
      "Only the colour of the distribution boards",
      "Higher mechanical protection, industrial socket types, different IP ratings, and potentially different earthing arrangements",
      "Industrial installations don't need to comply with BS 7671",
      "Industrial means using longer cables"
    ],
    correctAnswer: 1,
    explanation: "Industrial specifications typically require higher mechanical protection (steel conduit, SWA cables), industrial socket ratings (16A, 32A CEE types), higher IP ratings for harsh environments, and may use different earthing arrangements (IT systems in some process industries)."
  },
  {
    id: 6,
    question: "When should a designer recommend specialist consultation during the design process?",
    options: [
      "Never - designers should know everything",
      "Only if the client insists",
      "When the installation includes lifts, fire systems, lightning protection, or other specialist systems",
      "Only for domestic installations"
    ],
    correctAnswer: 2,
    explanation: "Designers should recommend specialist consultation for lifts, fire alarm systems, lightning protection, emergency lighting, data centres, and other specialist areas covered by specific standards beyond general BS 7671 requirements. This ensures competent design across all systems."
  },
  {
    id: 7,
    question: "A design specification states 'earthing in accordance with BS 7671'. What specific information should actually be included?",
    options: [
      "This statement is sufficient",
      "The earthing system type (TN-S, TN-C-S, TT), main earth conductor size, and bonding requirements",
      "Only the colour of earth conductors",
      "The name of the earthing contractor"
    ],
    correctAnswer: 1,
    explanation: "A proper specification must detail the earthing system type (based on DNO supply), main earthing conductor sizing, main protective bonding requirements, supplementary bonding locations, and earth electrode requirements if TT. 'In accordance with BS 7671' is too vague for installation."
  },
  {
    id: 8,
    question: "Client requirements conflict with Building Regulations Part P. What is the correct approach?",
    options: [
      "The client is always right, proceed as requested",
      "Explain the conflict, propose compliant alternatives, and document the discussion",
      "Ignore the regulations - they're only guidance",
      "Refuse the project entirely"
    ],
    correctAnswer: 1,
    explanation: "When requirements conflict with regulations, the designer must explain the conflict clearly, propose compliant alternatives that meet the client's underlying needs, and document the discussion. Regulations are mandatory, but creative solutions can often satisfy both."
  },
  {
    id: 9,
    question: "What purpose does a 'design freeze' date serve in an electrical installation project?",
    options: [
      "It's when the heating is installed",
      "It establishes when the design is finalised and changes become formal variations",
      "It indicates winter working conditions",
      "It's the date when design software licences expire"
    ],
    correctAnswer: 1,
    explanation: "A design freeze date establishes when the design is finalised for costing and procurement. Changes after this date become formal variations with associated cost and programme implications. This protects both designer and client by establishing a clear baseline."
  },
  {
    id: 10,
    question: "A client's requirements include 'energy monitoring capability'. What should the design specification include?",
    options: [
      "Just smart meters at the intake",
      "Sub-metering at distribution boards, CT provisions, and communication infrastructure for BMS integration",
      "Only LED lighting",
      "Solar panels on the roof"
    ],
    correctAnswer: 1,
    explanation: "Energy monitoring capability requires sub-metering provisions at distribution boards, current transformer (CT) spaces, pulse outputs or Modbus communication, and infrastructure for Building Management System (BMS) integration. This needs designing in from the start, not retrofitting."
  },
  {
    id: 11,
    question: "When preparing a design specification for a healthcare facility, which additional standards must be considered alongside BS 7671?",
    options: [
      "No additional standards apply",
      "HTM 06-01 (Electrical services supply and distribution) and IEC 60364-7-710",
      "Only fire alarm standards",
      "Agricultural standards"
    ],
    correctAnswer: 1,
    explanation: "Healthcare facilities require compliance with HTM 06-01 for NHS premises and IEC 60364-7-710 for medical locations. These specify medical IT systems, equipotential bonding, standby power requirements, and other patient safety provisions beyond standard BS 7671."
  },
  {
    id: 12,
    question: "What is the purpose of a 'design development log' in electrical installation projects?",
    options: [
      "Recording the designer's working hours",
      "Documenting design decisions, changes, and their rationale for audit trail and future reference",
      "Listing all the materials ordered",
      "Recording site attendance"
    ],
    correctAnswer: 1,
    explanation: "A design development log documents decisions made during the design process, reasons for changes, alternatives considered, and stakeholder agreements. This provides an audit trail, supports dispute resolution, and helps future designers understand the installation's development."
  }
];

const faqs = [
  {
    question: "How do I handle conflicting requirements from different stakeholders?",
    answer: "Document all requirements from each stakeholder, identify conflicts clearly, and arrange a coordination meeting. Present the conflicts with their implications and potential solutions. Ultimately, record the agreed resolution and ensure the principal designer/client representative formally approves the solution. Never proceed with unresolved conflicts."
  },
  {
    question: "What level of detail should a design specification contain?",
    answer: "Sufficient detail for accurate pricing and installation without ambiguity. This includes equipment ratings and types, cable specifications, containment routes and sizes, distribution board schedules, circuit designations, and reference to applicable standards. If an installer could interpret something two ways, it needs more detail."
  },
  {
    question: "How do I establish appropriate diversity factors for an unusual installation?",
    answer: "For unusual installations, start with BS 7671 Appendix 15 guidance, consult similar completed projects if available, discuss with the client about actual usage patterns, and consider any special operational requirements. Document your assumptions clearly - diversity decisions significantly affect supply sizing and costs."
  },
  {
    question: "Should design specifications include maintenance requirements?",
    answer: "Yes - CDM Regulations require designers to consider maintenance during use. Specifications should note access requirements for equipment, isolation points, and any special maintenance procedures. Include provisions for safe access to distribution boards, cable trays, and outdoor equipment."
  },
  {
    question: "How do I handle a client who wants to specify particular manufacturers?",
    answer: "Client specifications of manufacturers are acceptable if the products meet the design requirements. Include 'or approved equivalent' clauses to allow alternatives, specify the key performance characteristics required, and ensure any equivalents are approved before installation. Document why specific products were specified if relevant."
  },
  {
    question: "What should I do if site conditions differ from the brief during design development?",
    answer: "Conduct a thorough site survey as part of design development. When discrepancies are found, formally notify the client with the implications for design, cost, and programme. Propose solutions and obtain written agreement before proceeding. Never assume the brief is accurate without verification."
  }
];

const Level3Module6Section1_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">

      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module6-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Article Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Design brief:</strong> Captures client needs and constraints</li>
              <li><strong>Specification:</strong> Translates needs into technical requirements</li>
              <li><strong>Compliance:</strong> Ensures BS 7671 and regulations are met</li>
              <li><strong>Documentation:</strong> Records decisions for verification</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Process Steps</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>1:</strong> Gather and clarify client requirements</li>
              <li><strong>2:</strong> Conduct site survey and assessment</li>
              <li><strong>3:</strong> Develop technical specification</li>
              <li><strong>4:</strong> Review, approve, and document</li>
            </ul>
          </div>
        </div>

        

        

        {/* Section 01: Understanding Client Briefs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Understanding Client Briefs
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A client brief is the starting point of any electrical design. It may be a formal document from an architect or project manager, a verbal discussion with a homeowner, or a combination of drawings, specifications, and meetings. Your first task as a designer is to understand what the client actually needs - which isn't always what they initially ask for.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">A comprehensive client brief should address:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Functional requirements:</strong> What does the installation need to do? Lighting levels, socket quantities, equipment to be supplied</li>
                <li><strong>Performance requirements:</strong> Reliability expectations, energy efficiency targets, future flexibility needs</li>
                <li><strong>Constraints:</strong> Budget limitations, programme dates, aesthetic requirements, existing infrastructure</li>
                <li><strong>Regulatory context:</strong> Planning conditions, building type, special requirements (healthcare, education, etc.)</li>
                <li><strong>Stakeholder requirements:</strong> End user needs, facilities management preferences, landlord requirements</li>
              </ul>
            </div>

            <p>
              When a client says "I want good lighting", your job is to establish what "good" means to them. Is it task lighting for detailed work? Ambient lighting for atmosphere? Energy-efficient lighting to meet BREEAM targets? The brief rarely contains enough detail - questioning and clarification are essential parts of the design process.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design Principle:</strong> Never assume you understand the requirement until you can explain it back to the client and they confirm it's correct. Misunderstanding at the brief stage leads to expensive changes later.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: From Brief to Specification */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            From Brief to Specification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The design specification translates the client's requirements into technical terms that can be installed, tested, and verified. It bridges the gap between "I want reliable power for my IT suite" and "32A radial circuit with 6mm² Twin and Earth, 30mA RCD protection, dedicated distribution board with UPS bypass facility".
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Client Requirement</p>
                <ul className="text-sm text-white space-y-1">
                  <li>"Enough sockets for a busy kitchen"</li>
                  <li>"Good security lighting outside"</li>
                  <li>"Electric car charging point"</li>
                  <li>"Ability to expand in future"</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Design Specification</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Ring final circuit with 8 double sockets, 30mA RCD protected</li>
                  <li>4No. LED floodlights, PIR activated, 10 lux minimum</li>
                  <li>7.4kW Mode 3 charge point, 32A radial, PME isolation</li>
                  <li>30% spare ways in DBs, oversized cable containment</li>
                </ul>
              </div>
            </div>

            <p>
              A good specification is unambiguous - two different contractors reading it should produce identical installations. It references standards (BS 7671, BS 5839, manufacturer data), specifies equipment clearly, and includes sufficient detail for accurate pricing without requiring further clarification.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> Rather than specifying "MCB suitable for circuit", specify "Type B MCB, 32A, 6kA breaking capacity, to BS EN 60898-1, single pole with switched neutral for RCD-protected circuit". This leaves no room for interpretation.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Regulatory Compliance */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Regulatory Compliance in Specifications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Every electrical design must comply with a framework of regulations and standards. The designer's task is to identify which apply and ensure the specification meets all requirements. This isn't just about BS 7671 - building regulations, planning conditions, and sector-specific requirements all affect the design.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key regulatory considerations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>BS 7671:</strong> The fundamental standard for electrical installation safety - mandatory reference for all designs</li>
                <li><strong>Building Regulations Part P:</strong> Notification requirements for domestic work, competent person schemes</li>
                <li><strong>Building Regulations Part L:</strong> Energy efficiency requirements affecting lighting, controls, and sub-metering</li>
                <li><strong>Building Regulations Part B:</strong> Fire safety provisions affecting circuit integrity, emergency lighting</li>
                <li><strong>CDM Regulations:</strong> Designer duties for health and safety during construction and maintenance</li>
                <li><strong>Sector standards:</strong> HTM 06-01 (healthcare), BB93 (schools), BS 5839 (fire detection)</li>
              </ul>
            </div>

            <p>
              When client requirements conflict with regulations, the regulations take precedence. However, the designer should explain the constraint and offer compliant alternatives. A client may request sockets near a bath - BS 7671 prohibits this within Zone 0, 1, and 2, but a shaver socket to BS EN 61558-2-5 outside Zone 2 may meet the underlying need.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Compliance Statement:</strong> The specification should include a clear statement of the standards to which the installation will be designed, enabling verification during and after installation.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Specification Documentation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Specification Documentation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The design specification comprises multiple documents that together describe the complete electrical installation. Each serves a specific purpose and together they enable procurement, installation, and verification.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Written Specification</p>
                <p className="text-white/90 text-xs">Describes standards, materials, workmanship requirements</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Design Drawings</p>
                <p className="text-white/90 text-xs">Layouts, schematics, containment routes</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Schedules</p>
                <p className="text-white/90 text-xs">Distribution boards, circuits, equipment lists</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Calculations</p>
                <p className="text-white/90 text-xs">Cable sizing, voltage drop, fault levels</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Data Sheets</p>
                <p className="text-white/90 text-xs">Equipment specifications, cut sheets</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Compliance Matrix</p>
                <p className="text-white/90 text-xs">Shows how requirements are met</p>
              </div>
            </div>

            <p>
              Version control is essential - as designs develop, multiple revisions are issued. Each document should be clearly numbered (Rev A, B, C or 1.0, 1.1, 2.0) with dates and a schedule of revisions. Superseded documents should be clearly marked to prevent installation from outdated information.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Best Practice:</strong> Use a document register to track all specification documents, their current revision, and their approval status. Issue documents formally with transmittal records showing what was sent, when, and to whom.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Clarifying Ambiguous Requirements</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Prepare specific questions before client meetings - "How many desk positions?" rather than "What do you need?"</li>
                <li>Use sketches and diagrams to confirm understanding - visual communication prevents misinterpretation</li>
                <li>Record meeting outcomes in writing and circulate for confirmation</li>
                <li>Where requirements are vague, propose specific solutions with reasoning for client review</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Managing Specification Changes</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Establish a formal change control process from project start</li>
                <li>Assess impact of changes on cost, programme, and other design elements before agreeing</li>
                <li>Document all changes with reason, requester, date, and approval</li>
                <li>Issue revised documents promptly and confirm receipt</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Starting design without complete brief</strong> - Leads to assumptions that may prove wrong</li>
                <li><strong>Vague specifications</strong> - "MCB as appropriate" invites wrong choices and disputes</li>
                <li><strong>Ignoring site constraints</strong> - A design that can't be built is worthless</li>
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

        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Specification Checklist</p>
                <ul className="space-y-0.5">
                  <li>Client requirements captured and confirmed</li>
                  <li>Site survey completed</li>
                  <li>Regulatory requirements identified</li>
                  <li>Technical specification complete</li>
                  <li>Drawings and schedules produced</li>
                  <li>Calculations documented</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Standards Reference</p>
                <ul className="space-y-0.5">
                  <li>BS 7671 - Installation requirements</li>
                  <li>Building Regs Part P - Notification</li>
                  <li>Building Regs Part L - Energy</li>
                  <li>CDM 2015 - Designer duties</li>
                  <li>BS 7671 App 15 - Demand assessment</li>
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
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module6-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 1
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module6-section1-4">
              Next: Site Assessment and Surveys
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module6Section1_3;
