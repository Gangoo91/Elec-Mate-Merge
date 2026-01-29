import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Handover Documentation - HNC Module 5 Section 5.6";
const DESCRIPTION = "Master handover documentation for building services: O&M manual requirements per BSRIA BG 26, as-built drawings, training delivery, building log book compilation, and Soft Landings procedures.";

const quickCheckQuestions = [
  {
    id: "om-manual-purpose",
    question: "What is the primary purpose of an O&M manual?",
    options: ["To satisfy building regulations only", "To enable safe and efficient operation throughout the building lifecycle", "To provide marketing material for the building", "To record construction defects"],
    correctIndex: 1,
    explanation: "The O&M manual is a comprehensive document enabling building operators to safely and efficiently operate, maintain, and manage building services throughout the entire building lifecycle."
  },
  {
    id: "bsria-bg26",
    question: "Which BSRIA guide provides the industry standard for O&M manual structure?",
    options: ["BSRIA BG 6", "BSRIA BG 26", "BSRIA BG 44", "BSRIA BG 8"],
    correctIndex: 1,
    explanation: "BSRIA BG 26 'Operating and Maintenance Manuals for Building Services Installations' is the industry standard guide for O&M manual content, structure, and compilation."
  },
  {
    id: "as-built-timing",
    question: "When should as-built drawings be prepared?",
    options: ["Before construction begins", "Progressively throughout construction as changes occur", "Only after practical completion", "At the end of the defects liability period"],
    correctIndex: 1,
    explanation: "As-built drawings should be prepared progressively throughout construction as variations and site changes occur. Leaving this until completion risks inaccurate records and missing information."
  },
  {
    id: "soft-landings-stage",
    question: "During Soft Landings, when does the extended aftercare period typically occur?",
    options: ["Before practical completion", "During the first 12 months after handover", "For 3 years post-completion", "Only during commissioning"],
    correctIndex: 2,
    explanation: "Soft Landings typically includes a 3-year extended aftercare period post-completion, with intensive support in Year 1, reducing in Years 2 and 3, to ensure the building performs as intended."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "According to BSRIA BG 26, which section of the O&M manual contains emergency procedures?",
    options: [
      "Section A - Asset Register",
      "Section B - Operating Instructions",
      "Section C - Maintenance Information",
      "Section D - Health & Safety Information"
    ],
    correctAnswer: 1,
    explanation: "Section B (Operating Instructions) contains emergency procedures, including shutdown sequences, fault responses, and contact information for emergency situations."
  },
  {
    id: 2,
    question: "What minimum information must as-built drawings show for electrical distribution systems?",
    options: [
      "Only the main switchboard location",
      "Circuit routes, cable sizes, protection settings, and final equipment positions",
      "Just the metre position",
      "Only emergency lighting circuits"
    ],
    correctAnswer: 1,
    explanation: "As-built drawings must accurately show circuit routes, cable sizes and types, protective device ratings and settings, and final installed positions of all equipment including any site variations."
  },
  {
    id: 3,
    question: "How long should training records be retained as part of handover documentation?",
    options: [
      "6 months",
      "12 months",
      "For the life of the building or until superseded",
      "Only during the defects liability period"
    ],
    correctAnswer: 2,
    explanation: "Training records should be retained for the building's operational life, demonstrating that operators received adequate instruction. This supports liability protection and aids future retraining needs."
  },
  {
    id: 4,
    question: "What is the primary function of the building log book?",
    options: [
      "To replace the O&M manual",
      "To record energy consumption and maintenance activities throughout building operation",
      "To list construction defects only",
      "To store design calculations"
    ],
    correctAnswer: 1,
    explanation: "The building log book is an ongoing operational document recording energy consumption, maintenance activities, system modifications, and performance data throughout the building's life."
  },
  {
    id: 5,
    question: "During Soft Landings Stage 5 (Aftercare), what is the contractor's typical commitment?",
    options: [
      "No further involvement after practical completion",
      "Regular seasonal visits and occupant feedback sessions",
      "Full-time site presence for 3 years",
      "Only attending for emergency callouts"
    ],
    correctAnswer: 1,
    explanation: "Soft Landings Stage 5 involves regular seasonal commissioning visits, occupant satisfaction surveys, energy performance reviews, and addressing operational issues - typically monthly in Year 1, quarterly in Years 2-3."
  },
  {
    id: 6,
    question: "Which document provides the framework for post-occupancy evaluation (POE)?",
    options: [
      "BSRIA BG 26",
      "BSRIA BG 54 Soft Landings Framework",
      "Building Regulations Part L",
      "CDM Regulations"
    ],
    correctAnswer: 1,
    explanation: "BSRIA BG 54 'Soft Landings Framework' provides the structured approach to post-occupancy evaluation, ensuring buildings perform as designed through extended aftercare and feedback mechanisms."
  },
  {
    id: 7,
    question: "What format should O&M manuals be provided in for modern building handovers?",
    options: [
      "Paper copies only",
      "Both hard copy and searchable electronic format (typically PDF)",
      "DVD video format",
      "Verbal instructions only"
    ],
    correctAnswer: 1,
    explanation: "Modern practice requires both hard copy reference sets and searchable electronic copies. Electronic formats enable easy searching, updating, and backup, whilst hard copies provide reliable site access."
  },
  {
    id: 8,
    question: "When should end-user training be scheduled for optimal effectiveness?",
    options: [
      "6 months before practical completion",
      "During construction phase",
      "Close to handover when systems are commissioned and operational",
      "Only after 12 months of operation"
    ],
    correctAnswer: 2,
    explanation: "Training should occur close to handover when commissioned systems can be demonstrated in operation. Training too early means staff forget procedures; too late risks unsafe operation."
  },
  {
    id: 9,
    question: "What must the building log book include regarding the DEC (Display Energy Certificate)?",
    options: [
      "Nothing - DECs are separate from the log book",
      "Space to record annual DEC ratings and advisory report actions",
      "Only the first DEC issued",
      "DEC calculations only"
    ],
    correctAnswer: 1,
    explanation: "The building log book should include DEC records and tracking of advisory report recommendations. This supports the requirement to improve energy performance and maintain compliance records."
  },
  {
    id: 10,
    question: "Which items should be included in the O&M manual asset register?",
    options: [
      "Only major plant items over 10kW",
      "All maintainable assets with manufacturer, model, serial number, and location",
      "Just electrical switchgear",
      "Only items with warranty coverage"
    ],
    correctAnswer: 1,
    explanation: "The asset register should comprehensively list all maintainable items including manufacturer details, model numbers, serial numbers, locations, commissioning dates, and warranty information."
  }
];

const faqs = [
  {
    question: "What's the difference between O&M manuals and the building log book?",
    answer: "The O&M manual is a fixed reference document compiled at handover containing manufacturer information, operating procedures, and maintenance schedules. The building log book is a live operational document that records ongoing activities - energy consumption, maintenance completed, system modifications, and performance data throughout the building's life. Think of the O&M manual as the instruction book, and the log book as the service history."
  },
  {
    question: "How detailed should training be for complex BMS systems?",
    answer: "BMS training should be tiered: basic operation for all building users, intermediate training for facilities staff (adjusting setpoints, acknowledging alarms, running reports), and advanced training for maintenance technicians (programming, trend analysis, system modifications). Allow 4-8 hours for intermediate training and 2-3 days for advanced training. Always provide hands-on sessions with the actual installed system."
  },
  {
    question: "What happens if as-built drawings aren't provided at handover?",
    answer: "This is a serious contractual matter. As-built drawings are typically a condition precedent to practical completion certification and final payment. Without them, the client cannot safely maintain or modify installations. The contract administrator should withhold certification until compliant drawings are provided. Retrospective surveys to create as-builts are expensive and often incomplete."
  },
  {
    question: "Is Soft Landings mandatory for all projects?",
    answer: "Soft Landings is not universally mandatory but is required for all central government projects under the Government Soft Landings (GSL) policy. Many local authorities and private clients now specify it, particularly for complex or energy-sensitive buildings. BREEAM credits are available for implementing Soft Landings principles. Even when not contractually required, the principles represent best practice."
  },
  {
    question: "How long should spare parts and maintenance materials be held after handover?",
    answer: "Contracts typically require a spares package for the first 12-24 months of operation. This should include critical items with long lead times (specialist lamps, belts, filters, fuses, control cards). The O&M manual should list recommended spares stockholding. After handover, the building owner becomes responsible for spares procurement, guided by the O&M manual recommendations."
  },
  {
    question: "Who is responsible for keeping O&M manuals updated after handover?",
    answer: "After handover, the building owner/operator is responsible for maintaining and updating O&M documentation. Any modifications, replacements, or upgrades should trigger O&M manual updates. This is often overlooked, leading to outdated documentation. Modern practice includes digital O&M systems that facilitate updates. Major alterations should include updated O&M documentation as a deliverable."
  }
];

const HNCModule5Section5_6 = () => {
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
            <span>Module 5.5.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Handover Documentation
          </h1>
          <p className="text-white/80">
            O&M manuals, as-built drawings, training delivery, and building log book compilation for successful project handover
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>O&M manuals:</strong> Structured per BSRIA BG 26</li>
              <li className="pl-1"><strong>As-built drawings:</strong> Accurate record of installed systems</li>
              <li className="pl-1"><strong>Training:</strong> Tiered delivery for all user levels</li>
              <li className="pl-1"><strong>Building log book:</strong> Ongoing operational record</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Soft Landings:</strong> 3-year extended aftercare</li>
              <li className="pl-1"><strong>Post-occupancy:</strong> Performance verification</li>
              <li className="pl-1"><strong>Compliance:</strong> Building Regulations Part L</li>
              <li className="pl-1"><strong>Format:</strong> Hard copy and searchable digital</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Structure O&M manuals to BSRIA BG 26 requirements",
              "Prepare accurate as-built drawings for electrical installations",
              "Plan and deliver effective training programmes",
              "Compile and maintain building log books",
              "Implement Soft Landings procedures for extended aftercare",
              "Support post-occupancy evaluation and building performance"
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

        {/* Section 1: O&M Manual Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            O&M Manual Requirements - BSRIA BG 26
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Operation and Maintenance (O&M) manuals are essential handover documents enabling building
              operators to safely and efficiently manage building services throughout the building lifecycle.
              BSRIA BG 26 provides the industry-standard structure and content requirements.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">BSRIA BG 26 Standard Structure:</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Section</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Content</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Items</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Section A</td>
                      <td className="border border-white/10 px-3 py-2">Asset Register</td>
                      <td className="border border-white/10 px-3 py-2">Equipment list, manufacturers, model/serial numbers, locations</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Section B</td>
                      <td className="border border-white/10 px-3 py-2">Operating Instructions</td>
                      <td className="border border-white/10 px-3 py-2">Start-up/shutdown, normal operation, emergency procedures</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Section C</td>
                      <td className="border border-white/10 px-3 py-2">Maintenance Information</td>
                      <td className="border border-white/10 px-3 py-2">Schedules, procedures, spare parts lists, lubrication charts</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Section D</td>
                      <td className="border border-white/10 px-3 py-2">Health & Safety</td>
                      <td className="border border-white/10 px-3 py-2">Risk assessments, COSHH data, isolation procedures, PPE requirements</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Section E</td>
                      <td className="border border-white/10 px-3 py-2">Technical Data</td>
                      <td className="border border-white/10 px-3 py-2">Commissioning records, test certificates, warranties, design data</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Section F</td>
                      <td className="border border-white/10 px-3 py-2">Drawings</td>
                      <td className="border border-white/10 px-3 py-2">As-built drawings, schematics, wiring diagrams, layout plans</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Electrical Installation Content</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Distribution board schedules</li>
                  <li className="pl-1">Circuit charts and cable schedules</li>
                  <li className="pl-1">Protection coordination studies</li>
                  <li className="pl-1">Emergency lighting test records</li>
                  <li className="pl-1">Fire alarm zone plans and operation</li>
                  <li className="pl-1">BMS point schedules and graphics</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Format Requirements</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Hard copy in durable ring binders</li>
                  <li className="pl-1">Searchable PDF electronic copy</li>
                  <li className="pl-1">Native CAD files for drawings</li>
                  <li className="pl-1">Indexed and tabbed for easy navigation</li>
                  <li className="pl-1">Building-specific, not generic literature</li>
                  <li className="pl-1">Updated to reflect as-installed conditions</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Quality check:</strong> O&M manuals must be reviewed by the commissioning manager before acceptance - generic manufacturer literature without project-specific information is unacceptable.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: As-Built Drawings */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            As-Built Drawing Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              As-built drawings (also called record drawings) accurately document the installation as
              actually constructed, including all variations from the original design. They are essential
              for future maintenance, modifications, and compliance verification.
            </p>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Critical Requirement</p>
              <p className="text-sm text-white">
                As-built drawings must be prepared progressively during construction - not retrospectively after completion.
                Site supervisors should mark up design drawings with variations as they occur. Retrospective surveys are
                expensive, often inaccurate, and risk missing concealed services.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Electrical As-Built Drawing Content</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Drawing Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Required Information</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Layout Plans</td>
                      <td className="border border-white/10 px-3 py-2">Equipment positions, containment routes, floor box locations, final luminaire positions</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Schematics</td>
                      <td className="border border-white/10 px-3 py-2">Single line diagrams showing actual protective device ratings, cable sizes, discrimination settings</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Distribution Boards</td>
                      <td className="border border-white/10 px-3 py-2">Board schedules, circuit references, phase allocation, spare capacity</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Containment</td>
                      <td className="border border-white/10 px-3 py-2">Cable tray and trunking routes, sizes, fixing centres, fire stopping locations</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fire Alarm</td>
                      <td className="border border-white/10 px-3 py-2">Zone plans, detector types and locations, sounder coverage, cause and effect matrix</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Emergency Lighting</td>
                      <td className="border border-white/10 px-3 py-2">Luminaire positions, circuit references, duration ratings, test switch locations</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">As-Built Drawing Standards</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Format:</strong> Native CAD (DWG/DXF) plus PDF - minimum A3 for layout plans</li>
                <li className="pl-1"><strong>Scale:</strong> Layout plans at 1:50 or 1:100, schematics not to scale (NTS)</li>
                <li className="pl-1"><strong>Title block:</strong> Clear "AS BUILT" notation with revision date and approval</li>
                <li className="pl-1"><strong>Layer standards:</strong> Consistent with project CAD standards for future editing</li>
                <li className="pl-1"><strong>Coordination:</strong> Referenced to architect's floor plans and grid lines</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Real-world example:</strong> A hospital electrical upgrade required as-built drawings showing exact cable routes
              through ceiling voids. Without these records, a subsequent ward refurbishment accidentally severed theatre supply cables,
              causing significant patient safety concerns and costly emergency repairs.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Training Delivery */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Training Programmes and Delivery
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective training ensures building operators can safely manage installed systems from day one.
              Training should be structured for different user levels and delivered close to handover when
              systems are commissioned and operational.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Training Level Structure</p>
              <div className="space-y-3">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-1">Level 1: Awareness Training</p>
                  <p className="text-sm text-white/80">For all building users - fire alarm response, emergency procedures, reporting faults. Duration: 30-60 minutes.</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-1">Level 2: Operational Training</p>
                  <p className="text-sm text-white/80">For facilities staff - BMS operation, lighting controls, adjusting setpoints, acknowledging alarms. Duration: 4-8 hours.</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-1">Level 3: Technical Training</p>
                  <p className="text-sm text-white/80">For maintenance technicians - fault diagnosis, BMS programming, testing procedures, equipment maintenance. Duration: 2-3 days.</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-1">Level 4: Specialist Training</p>
                  <p className="text-sm text-white/80">Manufacturer-specific training for complex systems - UPS, generators, fire suppression, specialist controls. Duration: varies.</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Training Delivery Best Practice</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Aspect</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Requirement</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Timing</td>
                      <td className="border border-white/10 px-3 py-2">2-4 weeks before practical completion when systems are commissioned</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Location</td>
                      <td className="border border-white/10 px-3 py-2">On-site using actual installed equipment, not off-site simulations</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Trainer</td>
                      <td className="border border-white/10 px-3 py-2">Equipment manufacturer or specialist commissioning engineer</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Materials</td>
                      <td className="border border-white/10 px-3 py-2">Project-specific handouts referencing actual O&M manual sections</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Documentation</td>
                      <td className="border border-white/10 px-3 py-2">Signed attendance register, training syllabus, competency checklist</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Follow-up</td>
                      <td className="border border-white/10 px-3 py-2">Refresher sessions during Soft Landings aftercare period</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Training Record Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Date, duration, and location of training session</li>
                <li className="pl-1">Name and qualifications of trainer</li>
                <li className="pl-1">Detailed syllabus/agenda covered</li>
                <li className="pl-1">Signed attendance register with attendee job roles</li>
                <li className="pl-1">Competency assessment results where applicable</li>
                <li className="pl-1">Copies of training materials provided</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> Training is not a box-ticking exercise - it must genuinely enable staff to operate systems safely and efficiently. Inadequate training transfers liability to the contractor if incidents occur.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Building Log Book and Soft Landings */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Building Log Book and Soft Landings
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The building log book is an operational document recording energy consumption and maintenance
              activities throughout the building's life. Soft Landings extends contractor involvement beyond
              handover to ensure buildings perform as designed.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Log Book Contents (Part L Requirement)</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5">
                  <p className="text-sm font-medium text-white mb-2">Design Information</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Building performance targets</li>
                    <li>Design assumptions (occupancy, hours)</li>
                    <li>U-values and air permeability</li>
                    <li>System efficiencies and outputs</li>
                    <li>Predicted energy consumption</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <p className="text-sm font-medium text-white mb-2">Operational Records</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Monthly energy consumption data</li>
                    <li>Sub-metering readings</li>
                    <li>Maintenance activities completed</li>
                    <li>System modifications/upgrades</li>
                    <li>DEC ratings and advisory reports</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BSRIA Soft Landings Framework (BG 54)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Stage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Phase</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Activities</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Stage 1</td>
                      <td className="border border-white/10 px-3 py-2">Inception & Briefing</td>
                      <td className="border border-white/10 px-3 py-2">Define performance outcomes, engage FM early</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Stage 2</td>
                      <td className="border border-white/10 px-3 py-2">Design Development</td>
                      <td className="border border-white/10 px-3 py-2">Reality checking, FM input on maintainability</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Stage 3</td>
                      <td className="border border-white/10 px-3 py-2">Pre-Handover</td>
                      <td className="border border-white/10 px-3 py-2">Commissioning review, training, documentation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Stage 4</td>
                      <td className="border border-white/10 px-3 py-2">Initial Aftercare</td>
                      <td className="border border-white/10 px-3 py-2">Resident on-site support, settling-in period (4-6 weeks)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Stage 5</td>
                      <td className="border border-white/10 px-3 py-2">Extended Aftercare</td>
                      <td className="border border-white/10 px-3 py-2">3-year POE, seasonal commissioning, energy monitoring</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <p className="text-sm font-medium text-green-400 mb-2">Soft Landings Year 1 Activities</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Monthly visits:</strong> Review BMS trends, energy data, occupant feedback</li>
                <li className="pl-1"><strong>Seasonal commissioning:</strong> Heating season and cooling season optimisation</li>
                <li className="pl-1"><strong>Occupant surveys:</strong> Comfort, usability, and satisfaction feedback</li>
                <li className="pl-1"><strong>Energy review:</strong> Compare actual vs predicted consumption</li>
                <li className="pl-1"><strong>Fine-tuning:</strong> Adjust controls, setpoints, and schedules</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Post-Occupancy Evaluation (POE)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Energy POE:</strong> Actual consumption vs design predictions, identify performance gaps</li>
                <li className="pl-1"><strong>Functional POE:</strong> Does the building meet operational requirements?</li>
                <li className="pl-1"><strong>Occupant POE:</strong> User satisfaction with comfort, lighting, controls</li>
                <li className="pl-1"><strong>Technical POE:</strong> System reliability, maintenance issues, design shortcomings</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Real-world impact:</strong> A university building implementing Soft Landings achieved 15% energy savings in Year 1
              through seasonal commissioning adjustments that would not have been identified without extended aftercare involvement.
              The performance gap between design predictions and actual consumption was closed within 2 years.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: O&M Manual Compilation Schedule</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> 10,000m² office building with complex M&E systems. Practical completion target: Week 40.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm text-white/90">
                <p className="font-medium mb-2">Recommended Programme:</p>
                <p>Week 1-4: Issue O&M specification to subcontractors</p>
                <p>Week 20: First draft submissions from major packages</p>
                <p>Week 28: Review and return comments</p>
                <p>Week 32: Final draft submissions</p>
                <p>Week 36: Commissioning data integration</p>
                <p>Week 38: Final compilation and binding</p>
                <p>Week 40: Handover with practical completion</p>
                <p className="mt-2 text-green-400">Key: Start early - O&M compilation is on the critical path</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Training Programme Structure</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> New hospital wing with BMS-controlled HVAC, lighting controls, and standby generator.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm text-white/90">
                <p className="font-medium mb-2">Training Schedule:</p>
                <p><strong>Day 1:</strong> BMS Overview (8 hours)</p>
                <p className="pl-4">- System architecture and graphics navigation</p>
                <p className="pl-4">- Alarm management and acknowledgement</p>
                <p className="pl-4">- Basic trending and reporting</p>
                <p className="mt-2"><strong>Day 2:</strong> HVAC Controls (6 hours)</p>
                <p className="pl-4">- Setpoint adjustments and scheduling</p>
                <p className="pl-4">- AHU operation and fault diagnosis</p>
                <p className="mt-2"><strong>Day 3:</strong> Electrical Systems (4 hours)</p>
                <p className="pl-4">- Generator test procedures and manual operation</p>
                <p className="pl-4">- Emergency lighting testing protocols</p>
                <p className="mt-2 text-elec-yellow/70">Attendees: 2× Estates Managers, 4× Maintenance Technicians</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Soft Landings Aftercare Visit Agenda</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Month 6 review visit for commercial office building.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm text-white/90">
                <p className="font-medium mb-2">Visit Agenda (Half Day):</p>
                <p>09:00 - FM team briefing and issues review</p>
                <p>09:30 - BMS trend analysis (energy, temperatures)</p>
                <p>10:30 - Physical plant room inspection</p>
                <p>11:00 - Lighting control system check</p>
                <p>11:30 - Occupant feedback discussion</p>
                <p>12:00 - Action log update and next visit planning</p>
                <p className="mt-2 text-green-400">Outcome: 3 control strategy adjustments, 2 training refresher items identified</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Handover Documentation Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">O&M manuals complete to BSRIA BG 26 structure</li>
                <li className="pl-1">As-built drawings in CAD and PDF format</li>
                <li className="pl-1">Commissioning certificates and test records</li>
                <li className="pl-1">Training records with signed attendance</li>
                <li className="pl-1">Spare parts package and recommended spares list</li>
                <li className="pl-1">Warranty certificates and contact details</li>
                <li className="pl-1">Building log book template populated with design data</li>
                <li className="pl-1">BMS graphics and point schedule</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Standards and References</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>BSRIA BG 26:</strong> O&M manual guidance</li>
                <li className="pl-1"><strong>BSRIA BG 54:</strong> Soft Landings Framework</li>
                <li className="pl-1"><strong>CIBSE TM31:</strong> Building log book toolkit</li>
                <li className="pl-1"><strong>Building Regulations Part L:</strong> Log book requirement</li>
                <li className="pl-1"><strong>BSRIA BG 8:</strong> Commissioning management</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Handover Problems</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Generic O&M content:</strong> Manufacturer brochures without project-specific information</li>
                <li className="pl-1"><strong>Late as-built drawings:</strong> Prepared retrospectively with inaccuracies</li>
                <li className="pl-1"><strong>Rushed training:</strong> Delivered too early or with insufficient time allocated</li>
                <li className="pl-1"><strong>Missing commissioning data:</strong> Test results not included in O&M manual</li>
                <li className="pl-1"><strong>No aftercare plan:</strong> Contractor disengages immediately after handover</li>
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
                <p className="font-medium text-white mb-1">O&M Manual (BSRIA BG 26)</p>
                <ul className="space-y-0.5">
                  <li>Section A - Asset Register</li>
                  <li>Section B - Operating Instructions</li>
                  <li>Section C - Maintenance Information</li>
                  <li>Section D - Health & Safety</li>
                  <li>Section E - Technical Data</li>
                  <li>Section F - Drawings</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Soft Landings Stages</p>
                <ul className="space-y-0.5">
                  <li>Stage 1 - Inception & Briefing</li>
                  <li>Stage 2 - Design Development</li>
                  <li>Stage 3 - Pre-Handover</li>
                  <li>Stage 4 - Initial Aftercare (4-6 weeks)</li>
                  <li>Stage 5 - Extended Aftercare (3 years)</li>
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
              Back to Section 5
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule5Section5_6;
