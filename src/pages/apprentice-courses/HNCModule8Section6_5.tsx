import { ArrowLeft, FileText, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Documentation - HNC Module 8 Section 6.5";
const DESCRIPTION = "Comprehensive coverage of O&M manuals, as-built drawings, testing records, building log book requirements, health and safety files, BSRIA guidance and digital handover (COBie).";

const quickCheckQuestions = [
  {
    id: "om-manual-purpose",
    question: "What is the primary purpose of an O&M manual?",
    options: [
      "To record construction costs",
      "To provide information for safe operation, maintenance and future modification of building systems",
      "To satisfy planning requirements",
      "To document site safety incidents"
    ],
    correctIndex: 1,
    explanation: "O&M manuals provide comprehensive information enabling building operators to safely operate, maintain and modify building systems throughout their operational life. This includes equipment schedules, maintenance procedures, safety information and emergency protocols."
  },
  {
    id: "as-built-purpose",
    question: "When should as-built drawings be prepared?",
    options: [
      "Before construction begins",
      "During the design development stage",
      "Progressively during construction, finalised at practical completion",
      "Only if requested by the client"
    ],
    correctIndex: 2,
    explanation: "As-built drawings should be prepared progressively during construction and finalised at practical completion. This ensures they accurately reflect the installed works, including any variations from the original design drawings."
  },
  {
    id: "building-log-book",
    question: "Under which regulation is a building log book required for new non-domestic buildings?",
    options: [
      "Part P of the Building Regulations",
      "Part L of the Building Regulations",
      "CDM Regulations 2015",
      "Health and Safety at Work Act"
    ],
    correctIndex: 1,
    explanation: "Part L (Conservation of Fuel and Power) of the Building Regulations requires a building log book for new non-domestic buildings. It must contain information about installed systems, their operation and maintenance to achieve energy efficiency."
  },
  {
    id: "cobie-definition",
    question: "What does COBie stand for?",
    options: [
      "Construction Operations Building information exchange",
      "Certified Operations Building information exchange",
      "Construction Operational Building Interface Equipment",
      "Consolidated Operations Building Information Environment"
    ],
    correctIndex: 0,
    explanation: "COBie (Construction Operations Building information exchange) is a structured data format for exchanging building information from design through construction to operation. It enables digital handover of asset data without relying on proprietary software formats."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which BSRIA guide provides comprehensive guidance on O&M manuals?",
    options: [
      "BG 6 - The Design Framework",
      "BG 49 - Soft Landings",
      "BG 8 - Model O&M Manual",
      "BG 26 - Service Coordination"
    ],
    correctAnswer: 2,
    explanation: "BSRIA BG 8 provides model templates and comprehensive guidance for producing O&M manuals for building services installations."
  },
  {
    id: 2,
    question: "What information must be included in the Health and Safety File under CDM 2015?",
    options: [
      "Only electrical installation certificates",
      "Information about risks to health and safety during future construction, maintenance or demolition work",
      "Daily site inspection records",
      "Employee training records"
    ],
    correctAnswer: 1,
    explanation: "The Health and Safety File must contain information about risks to health and safety during any future construction, maintenance, repair, renovation or demolition work on the building."
  },
  {
    id: 3,
    question: "What is the minimum retention period for electrical test certificates?",
    options: [
      "5 years",
      "10 years",
      "Life of the installation",
      "Until next inspection"
    ],
    correctAnswer: 2,
    explanation: "Electrical test certificates should be retained for the life of the installation. They form an essential part of the electrical installation records and are needed for comparison at subsequent periodic inspections."
  },
  {
    id: 4,
    question: "Which document provides the format specification for digital asset data handover?",
    options: [
      "BS 7671",
      "BS 1192",
      "BS 8536 (now incorporated into BS EN ISO 19650)",
      "BS 5839"
    ],
    correctAnswer: 2,
    explanation: "BS 8536 (now incorporated into BS EN ISO 19650) provides guidance on information management during the operational phase of assets, including requirements for digital handover using formats such as COBie."
  },
  {
    id: 5,
    question: "What must be recorded in the building log book regarding HVAC systems?",
    options: [
      "Only the manufacturer's contact details",
      "Design parameters, installed capacities, control strategies and target energy consumption",
      "Staff training attendance records",
      "Construction programme dates"
    ],
    correctAnswer: 1,
    explanation: "The building log book must include design parameters (temperatures, flow rates), installed capacities, control strategies, maintenance requirements and target energy consumption figures for HVAC systems."
  },
  {
    id: 6,
    question: "Who is responsible for preparing and maintaining the Health and Safety File?",
    options: [
      "The contractor",
      "The architect",
      "The Principal Designer during construction, then the client",
      "The building control officer"
    ],
    correctAnswer: 2,
    explanation: "Under CDM 2015, the Principal Designer is responsible for preparing the Health and Safety File during the construction phase. Upon handover, responsibility transfers to the client who must maintain it for future works."
  },
  {
    id: 7,
    question: "What type of drawings should show cable routes, containment systems and equipment locations?",
    options: [
      "Schematic diagrams only",
      "Block diagrams",
      "Installation or layout drawings",
      "Single line diagrams"
    ],
    correctAnswer: 2,
    explanation: "Installation or layout drawings show physical cable routes, containment systems, equipment locations and spatial coordination. These are essential for maintenance access and future modifications."
  },
  {
    id: 8,
    question: "What is the purpose of commissioning records in handover documentation?",
    options: [
      "To demonstrate design intent only",
      "To evidence that systems have been tested and perform to specification",
      "To record construction costs",
      "To satisfy planning requirements"
    ],
    correctAnswer: 1,
    explanation: "Commissioning records provide evidence that all systems have been installed, tested and adjusted to perform to their design specification. They form a baseline for future performance monitoring."
  },
  {
    id: 9,
    question: "According to BSRIA Soft Landings, when should O&M manual content be reviewed?",
    options: [
      "Only at practical completion",
      "Progressively throughout construction with staged reviews",
      "After 12 months occupation",
      "Only when requested by the client"
    ],
    correctAnswer: 1,
    explanation: "BSRIA Soft Landings advocates progressive review of O&M content throughout construction, with staged submissions and reviews to ensure quality and completeness before practical completion."
  },
  {
    id: 10,
    question: "What information should as-built drawings show that differs from design drawings?",
    options: [
      "Original design intent only",
      "Variations, actual cable routes, final equipment positions and any deviations from design",
      "Only the building outline",
      "Manufacturer catalogue information"
    ],
    correctAnswer: 1,
    explanation: "As-built drawings must show the actual installed works including all variations from design, actual cable routes, final equipment positions, revised containment layouts and any site-initiated changes."
  },
  {
    id: 11,
    question: "What does the building log book requirement under Part L help achieve?",
    options: [
      "Fire safety compliance",
      "Structural safety verification",
      "Energy efficient operation throughout the building's life",
      "Acoustic performance standards"
    ],
    correctAnswer: 2,
    explanation: "The building log book requirement under Part L aims to enable energy efficient operation by providing building managers with information about design assumptions, installed systems and their intended operation."
  },
  {
    id: 12,
    question: "Which testing records must be included for fire alarm systems?",
    options: [
      "Only the initial commissioning certificate",
      "Commissioning certificate, cause and effect matrix, zone plans and detector schedule",
      "Manufacturer's test data only",
      "Training attendance records"
    ],
    correctAnswer: 1,
    explanation: "Fire alarm testing records must include the commissioning certificate, cause and effect matrix showing all input/output relationships, zone plans, detector schedules and results of all function and integration tests."
  }
];

const faqs = [
  {
    question: "What is the difference between O&M manuals and the building log book?",
    answer: "O&M manuals provide comprehensive technical information for operating and maintaining all building systems - they include equipment specifications, maintenance procedures, spare parts lists and safety information. The building log book, required under Part L, focuses specifically on energy-related information including design assumptions, installed capacities, control strategies and target energy consumption. The log book is intended as a concise reference for building managers to achieve energy efficient operation, while O&M manuals are detailed technical documents for maintenance teams."
  },
  {
    question: "How should digital handover documentation be structured?",
    answer: "Digital handover should follow a structured approach using COBie (Construction Operations Building information exchange) or similar open formats. Documentation should be organised hierarchically: facility level (site information), floor level (spatial data), space level (room data), then component level (equipment and systems). Each asset should have linked documentation including specifications, test certificates, O&M instructions and warranties. The structure should align with the building owner's existing asset management systems where possible."
  },
  {
    question: "What happens if O&M documentation is incomplete at practical completion?",
    answer: "Incomplete O&M documentation typically prevents the issue of a practical completion certificate under most standard forms of contract. The employer may retain a portion of the contract sum (often 2-5%) until documentation is complete and accepted. Under BSRIA Soft Landings, documentation quality reviews should occur progressively to avoid last-minute problems. Where certificates are issued with documentation deficiencies, these should be clearly listed as snagging items with agreed completion dates."
  },
  {
    question: "How long should project documentation be retained?",
    answer: "Retention periods vary by document type: electrical certificates should be retained for the life of the installation; Health and Safety Files must be retained for the life of the building; test records typically 6-12 years for liability purposes; O&M manuals for the life of the systems they cover. Under limitation legislation, records relating to potential personal injury claims should be retained indefinitely. Digital storage with appropriate backup and version control is recommended for long-term retention."
  },
  {
    question: "What training documentation should be provided at handover?",
    answer: "Training documentation should include: training plans showing content and duration for each system; attendance registers signed by trainees; competency assessments where applicable; video recordings of training sessions (increasingly common); quick reference guides for day-to-day operation; emergency procedures and contact information. BSRIA Soft Landings recommends follow-up training sessions at 3 and 12 months post-handover to address issues arising during actual operation."
  },
  {
    question: "How does BIM affect handover documentation requirements?",
    answer: "BIM (Building Information Modelling) enables rich digital handover where the model becomes an asset information model containing or linking to all O&M documentation. The model should include accurate as-built geometry, equipment data (manufacturer, model, serial numbers), maintenance requirements and linked documents (certificates, manuals). BS EN ISO 19650 provides the framework for information management, with COBie or native model formats used for data exchange. The client's Employer's Information Requirements (EIR) should specify required level of detail and formats."
  }
];

const HNCModule8Section6_5 = () => {
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
            <FileText className="h-4 w-4" />
            <span>Module 8.6.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Documentation
          </h1>
          <p className="text-white/80">
            O&amp;M manuals, as-built drawings, testing records and building log book requirements for successful project handover
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>O&amp;M manuals:</strong> Comprehensive operation and maintenance information</li>
              <li className="pl-1"><strong>As-built drawings:</strong> Accurate record of installed works</li>
              <li className="pl-1"><strong>Testing records:</strong> Evidence of system performance verification</li>
              <li className="pl-1"><strong>Building log book:</strong> Part L requirement for energy management</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>BSRIA BG 8:</strong> Model O&amp;M manual guidance</li>
              <li className="pl-1"><strong>CDM 2015:</strong> Health and Safety File requirement</li>
              <li className="pl-1"><strong>COBie:</strong> Digital asset data exchange format</li>
              <li className="pl-1"><strong>Soft Landings:</strong> Progressive documentation review</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Describe O&M manual content requirements and BSRIA guidance",
              "Explain as-built drawing standards and revision procedures",
              "Identify testing and commissioning record requirements",
              "Understand building log book requirements under Part L",
              "Describe Health and Safety File contents under CDM 2015",
              "Explain digital handover requirements including COBie"
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

        {/* Section 1: O&M Manuals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Operation and Maintenance Manuals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Operation and Maintenance (O&amp;M) manuals are comprehensive documents that provide building
              owners, managers and maintenance personnel with all information required to safely and efficiently
              operate, maintain and modify building systems throughout their operational life.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">O&amp;M Manual Structure (BSRIA BG 8)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Section</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Content</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Volume 1</td>
                      <td className="border border-white/10 px-3 py-2">System descriptions, operating procedures, emergency procedures</td>
                      <td className="border border-white/10 px-3 py-2">Day-to-day operational reference</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Volume 2</td>
                      <td className="border border-white/10 px-3 py-2">Equipment schedules, maintenance procedures, spare parts</td>
                      <td className="border border-white/10 px-3 py-2">Planned maintenance guidance</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Volume 3</td>
                      <td className="border border-white/10 px-3 py-2">Manufacturer data, product literature, certificates</td>
                      <td className="border border-white/10 px-3 py-2">Technical reference information</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Volume 4</td>
                      <td className="border border-white/10 px-3 py-2">Record drawings, schematics, as-built information</td>
                      <td className="border border-white/10 px-3 py-2">Spatial and schematic reference</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-white mb-2">Essential Content Requirements</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">System descriptions and design parameters</li>
                  <li className="pl-1">Operating procedures for normal and emergency conditions</li>
                  <li className="pl-1">Maintenance schedules with frequencies</li>
                  <li className="pl-1">Equipment schedules with specifications</li>
                  <li className="pl-1">Spare parts lists with supplier information</li>
                  <li className="pl-1">Health and safety information</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-white mb-2">Quality Requirements</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Project-specific content (not generic)</li>
                  <li className="pl-1">Clear, consistent formatting</li>
                  <li className="pl-1">Indexed and cross-referenced</li>
                  <li className="pl-1">Digital format with searchable text</li>
                  <li className="pl-1">Regular review and updates</li>
                  <li className="pl-1">Version control procedures</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Electrical Installation O&amp;M Content</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Distribution systems:</strong> Schematic diagrams, distribution schedules, protective device settings</li>
                <li className="pl-1"><strong>Lighting:</strong> Luminaire schedules, control system programming, lamp replacement procedures</li>
                <li className="pl-1"><strong>Fire alarm:</strong> Cause and effect matrix, zone plans, test procedures</li>
                <li className="pl-1"><strong>Emergency lighting:</strong> Luminaire locations, test log templates, battery replacement schedule</li>
                <li className="pl-1"><strong>Access control:</strong> System architecture, user management procedures, credential protocols</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical tip:</strong> Review O&amp;M manual submissions progressively during construction. BSRIA Soft Landings recommends staged reviews at 25%, 50%, 75% and 100% completion to ensure quality and avoid last-minute problems.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: As-Built Drawings */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            As-Built Drawings
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              As-built drawings (also called record drawings or as-installed drawings) provide an accurate
              graphical record of the installed works. They are essential for future maintenance, modifications,
              fault finding and compliance verification.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Types of As-Built Drawings</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Drawing Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Content</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Layout drawings</td>
                      <td className="border border-white/10 px-3 py-2">Equipment positions, cable routes, containment</td>
                      <td className="border border-white/10 px-3 py-2">Locating equipment, planning modifications</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Schematic diagrams</td>
                      <td className="border border-white/10 px-3 py-2">System topology, interconnections, control sequences</td>
                      <td className="border border-white/10 px-3 py-2">Understanding system operation, fault finding</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Single line diagrams</td>
                      <td className="border border-white/10 px-3 py-2">Distribution hierarchy, protective devices, circuit references</td>
                      <td className="border border-white/10 px-3 py-2">Electrical distribution overview, isolation planning</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Wiring diagrams</td>
                      <td className="border border-white/10 px-3 py-2">Terminal connections, cable cores, control circuits</td>
                      <td className="border border-white/10 px-3 py-2">Detailed fault finding, modifications</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Coordination drawings</td>
                      <td className="border border-white/10 px-3 py-2">Combined services layouts, spatial coordination</td>
                      <td className="border border-white/10 px-3 py-2">Access planning, clash avoidance</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-white mb-2">As-Built Requirements</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Show actual installed positions and routes</li>
                  <li className="pl-1">Record all variations from design drawings</li>
                  <li className="pl-1">Include cable sizes and types</li>
                  <li className="pl-1">Show protective device ratings and settings</li>
                  <li className="pl-1">Include circuit references and labelling</li>
                  <li className="pl-1">Record depths for buried services</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-white mb-2">Drawing Standards</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">BS EN ISO 7200 - Title blocks</li>
                  <li className="pl-1">BS EN ISO 5457 - Drawing sheet sizes</li>
                  <li className="pl-1">BS EN 61082 - Electrical documentation</li>
                  <li className="pl-1">BS 1192 (now BS EN ISO 19650) - CAD management</li>
                  <li className="pl-1">Project-specific CAD standards</li>
                  <li className="pl-1">Consistent symbol libraries</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Revision and Version Control</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Revision numbering:</strong> Clear, sequential revision system (P01, P02 for preliminary; C01, C02 for construction; A01, A02 for as-built)</li>
                <li className="pl-1"><strong>Cloud markings:</strong> Identify areas of change on each revision</li>
                <li className="pl-1"><strong>Revision history:</strong> Document all changes with dates and reasons</li>
                <li className="pl-1"><strong>Superseded drawings:</strong> Clear marking and controlled disposal of superseded versions</li>
                <li className="pl-1"><strong>Digital storage:</strong> Secure repository with backup and access control</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>BIM integration:</strong> Where BIM is used, as-built models should be updated to reflect installed conditions. The model becomes the primary record with 2D drawings extracted as required.
            </p>
          </div>
        </section>

        {/* Section 3: Testing and Commissioning Records */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Testing and Commissioning Records
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Testing and commissioning records provide evidence that all systems have been installed correctly,
              tested to verify performance and adjusted to meet design specifications. They establish a baseline
              for future performance monitoring and maintenance.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Electrical Testing Records (BS 7671)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Certificate/Schedule</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Content</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Requirement</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">EIC</td>
                      <td className="border border-white/10 px-3 py-2">Electrical Installation Certificate for new installations</td>
                      <td className="border border-white/10 px-3 py-2">Mandatory for new work</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">MEIWC</td>
                      <td className="border border-white/10 px-3 py-2">Minor Electrical Installation Works Certificate</td>
                      <td className="border border-white/10 px-3 py-2">Additions to existing circuits</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Schedule of Inspections</td>
                      <td className="border border-white/10 px-3 py-2">Visual inspection checklist results</td>
                      <td className="border border-white/10 px-3 py-2">Accompanies EIC</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Schedule of Test Results</td>
                      <td className="border border-white/10 px-3 py-2">Measured test values for each circuit</td>
                      <td className="border border-white/10 px-3 py-2">Accompanies EIC</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">System-Specific Commissioning Records</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">System</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Records Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Fire alarm</td>
                      <td className="border border-white/10 px-3 py-2">Commissioning certificate (BS 5839-1), zone test results, cause and effect verification, integration tests</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Emergency lighting</td>
                      <td className="border border-white/10 px-3 py-2">Commissioning certificate (BS 5266-1), duration test results, luminaire schedule verification</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">BMS/controls</td>
                      <td className="border border-white/10 px-3 py-2">Point-to-point test sheets, control loop verification, trend logs, integration test results</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">HVAC electrical</td>
                      <td className="border border-white/10 px-3 py-2">Motor rotation checks, VSD parameter records, interlock verification, safety device tests</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Lighting controls</td>
                      <td className="border border-white/10 px-3 py-2">DALI addressing records, scene programming verification, sensor commissioning</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-white mb-2">Witness Testing Requirements</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Pre-agreed witness points</li>
                  <li className="pl-1">Advance notification period</li>
                  <li className="pl-1">Signed attendance records</li>
                  <li className="pl-1">Defect reporting procedures</li>
                  <li className="pl-1">Re-test arrangements</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-white mb-2">Record Retention</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Electrical certificates: life of installation</li>
                  <li className="pl-1">Fire system records: minimum 6 years</li>
                  <li className="pl-1">Commissioning data: life of systems</li>
                  <li className="pl-1">Trend logs: per client requirements</li>
                  <li className="pl-1">Digital backup essential</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>CIBSE Code M:</strong> Provides comprehensive guidance on commissioning management including record keeping, witness testing protocols and handover procedures for building services.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Building Log Book and Health & Safety File */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Building Log Book and Health &amp; Safety File
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The building log book (required under Part L of the Building Regulations) and the Health and
              Safety File (required under CDM 2015) are distinct legal requirements that ensure buildings
              can be operated safely and efficiently throughout their life.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Log Book Requirements (Part L)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Section</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Content Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Design criteria</td>
                      <td className="border border-white/10 px-3 py-2">Internal temperatures, fresh air rates, illuminance levels, occupancy assumptions</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">HVAC systems</td>
                      <td className="border border-white/10 px-3 py-2">System descriptions, installed capacities, control strategies, operating schedules</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Lighting systems</td>
                      <td className="border border-white/10 px-3 py-2">Lighting strategy, control types, installed load, lux levels achieved</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Metering</td>
                      <td className="border border-white/10 px-3 py-2">Meter locations, sub-metering arrangements, energy monitoring provisions</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Energy targets</td>
                      <td className="border border-white/10 px-3 py-2">Predicted energy consumption, benchmarks, carbon emissions targets</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Maintenance</td>
                      <td className="border border-white/10 px-3 py-2">Recommended maintenance schedules to maintain efficiency</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Part L Compliance Note</p>
              <p className="text-sm text-white">
                The building log book is a legal requirement for new non-domestic buildings under Part L of the
                Building Regulations. It must be provided to the building owner before the building is occupied
                or, where applicable, before the building control body issues a final certificate. The log book
                format should follow CIBSE TM31 guidance.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Health and Safety File (CDM 2015)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Category</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Information to Include</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Structure</td>
                      <td className="border border-white/10 px-3 py-2">Key structural elements, safe working loads, access provisions</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Hazardous materials</td>
                      <td className="border border-white/10 px-3 py-2">Location of any hazardous materials (e.g., asbestos in existing buildings)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Services</td>
                      <td className="border border-white/10 px-3 py-2">Location of services, isolation points, safety systems</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Safe access</td>
                      <td className="border border-white/10 px-3 py-2">Equipment requiring access for maintenance, roof access provisions</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Residual risks</td>
                      <td className="border border-white/10 px-3 py-2">Risks that could not be designed out, required precautions</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-white mb-2">Electrical H&amp;S File Content</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Location of distribution boards</li>
                  <li className="pl-1">Main isolation points</li>
                  <li className="pl-1">High voltage equipment locations</li>
                  <li className="pl-1">Battery room hazards</li>
                  <li className="pl-1">Cable routes in concealed locations</li>
                  <li className="pl-1">Access requirements for maintenance</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-white mb-2">File Maintenance</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Client responsibility after handover</li>
                  <li className="pl-1">Update after any significant works</li>
                  <li className="pl-1">Make available to future contractors</li>
                  <li className="pl-1">Retain for life of building</li>
                  <li className="pl-1">Transfer with building ownership</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Legal requirement:</strong> Under CDM 2015, the client must ensure the Health and Safety File is prepared and maintained. Failure to do so is a criminal offence that can result in enforcement action by the HSE.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 5: Digital Handover and COBie */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Digital Handover and COBie
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Digital handover increasingly replaces or supplements traditional paper-based documentation.
              COBie (Construction Operations Building information exchange) provides a standardised format
              for exchanging building asset data from design through construction to operation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">COBie Data Structure</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Sheet</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Content</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Example Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Facility</td>
                      <td className="border border-white/10 px-3 py-2">Site and building information</td>
                      <td className="border border-white/10 px-3 py-2">Building name, address, project details</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Floor</td>
                      <td className="border border-white/10 px-3 py-2">Level information</td>
                      <td className="border border-white/10 px-3 py-2">Floor names, elevations, areas</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Space</td>
                      <td className="border border-white/10 px-3 py-2">Room and zone data</td>
                      <td className="border border-white/10 px-3 py-2">Room numbers, names, areas, usable heights</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Type</td>
                      <td className="border border-white/10 px-3 py-2">Asset type specifications</td>
                      <td className="border border-white/10 px-3 py-2">Manufacturer, model, specifications</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Component</td>
                      <td className="border border-white/10 px-3 py-2">Individual asset instances</td>
                      <td className="border border-white/10 px-3 py-2">Serial numbers, installation dates, locations</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">System</td>
                      <td className="border border-white/10 px-3 py-2">System groupings</td>
                      <td className="border border-white/10 px-3 py-2">Electrical distribution, fire alarm, HVAC</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Document</td>
                      <td className="border border-white/10 px-3 py-2">Linked documentation</td>
                      <td className="border border-white/10 px-3 py-2">O&amp;M manuals, certificates, warranties</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BS EN ISO 19650 Information Management</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>EIR:</strong> Employer's Information Requirements define what information is required at handover</li>
                <li className="pl-1"><strong>BEP:</strong> BIM Execution Plan describes how information will be delivered</li>
                <li className="pl-1"><strong>AIR:</strong> Asset Information Requirements define operational phase needs</li>
                <li className="pl-1"><strong>AIM:</strong> Asset Information Model is the delivered operational database</li>
                <li className="pl-1"><strong>Level of Information Need:</strong> Specifies detail required for each asset type</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-white mb-2">Benefits of Digital Handover</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Searchable, accessible information</li>
                  <li className="pl-1">Direct import to CAFM systems</li>
                  <li className="pl-1">Consistent data structure</li>
                  <li className="pl-1">Reduced duplication of effort</li>
                  <li className="pl-1">Version control and audit trail</li>
                  <li className="pl-1">Cloud-based access</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-white mb-2">Implementation Challenges</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Supply chain capability varies</li>
                  <li className="pl-1">Data quality assurance required</li>
                  <li className="pl-1">Software interoperability issues</li>
                  <li className="pl-1">Training requirements</li>
                  <li className="pl-1">Legacy system integration</li>
                  <li className="pl-1">Ongoing maintenance of data</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Government mandate:</strong> UK government projects require BIM Level 2 (now defined by BS EN ISO 19650) including COBie data drops at key project stages. Many private sector clients are adopting similar requirements.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Documentation Submission Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">O&amp;M manual complete with all volumes and appendices</li>
                <li className="pl-1">As-built drawings in agreed format (PDF and native CAD/BIM)</li>
                <li className="pl-1">All test certificates signed and dated</li>
                <li className="pl-1">Commissioning records with witness signatures</li>
                <li className="pl-1">Building log book (Part L compliance)</li>
                <li className="pl-1">Health and Safety File contribution</li>
                <li className="pl-1">Training records and attendance registers</li>
                <li className="pl-1">Warranty documentation and contact details</li>
                <li className="pl-1">Spare parts lists with supplier information</li>
                <li className="pl-1">Software licences and access credentials</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Common Documentation Deficiencies</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Generic content:</strong> Manufacturer literature without project-specific information</li>
                <li className="pl-1"><strong>Missing test results:</strong> Certificates without supporting test schedules</li>
                <li className="pl-1"><strong>Outdated drawings:</strong> Design drawings not updated to as-built status</li>
                <li className="pl-1"><strong>Incomplete schedules:</strong> Equipment lists missing serial numbers or locations</li>
                <li className="pl-1"><strong>Poor indexing:</strong> Difficult to navigate without clear contents and cross-references</li>
                <li className="pl-1"><strong>No maintenance procedures:</strong> Manufacturer data without maintenance instructions</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">BSRIA Soft Landings Documentation Review</h3>
              <p className="text-sm text-white mb-2">
                Soft Landings recommends progressive review of documentation quality:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Stage 1 (25%):</strong> Review structure, format and content headings</li>
                <li className="pl-1"><strong>Stage 2 (50%):</strong> Review system descriptions and operating procedures</li>
                <li className="pl-1"><strong>Stage 3 (75%):</strong> Review maintenance procedures and equipment schedules</li>
                <li className="pl-1"><strong>Stage 4 (100%):</strong> Final review of complete documentation package</li>
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
                <p className="font-medium text-white mb-1">O&amp;M Manual Standards</p>
                <ul className="space-y-0.5">
                  <li>BSRIA BG 8 - Model O&amp;M manual</li>
                  <li>BSRIA BG 49 - Soft Landings</li>
                  <li>BS EN ISO 19650 - Information management</li>
                  <li>Project-specific requirements</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Regulatory Requirements</p>
                <ul className="space-y-0.5">
                  <li>Part L - Building log book</li>
                  <li>CDM 2015 - Health and Safety File</li>
                  <li>BS 7671 - Electrical certificates</li>
                  <li>BS 5839/5266 - Fire/emergency lighting</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Digital Handover</p>
                <ul className="space-y-0.5">
                  <li>COBie - Asset data exchange format</li>
                  <li>EIR - Employer requirements</li>
                  <li>AIM - Asset information model</li>
                  <li>BIM Level 2 - Government mandate</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Record Retention</p>
                <ul className="space-y-0.5">
                  <li>Electrical certificates - Life of installation</li>
                  <li>H&amp;S File - Life of building</li>
                  <li>Test records - 6-12 years minimum</li>
                  <li>O&amp;M manuals - Life of systems</li>
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
            <Link to="../h-n-c-module8-section6-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Commissioning Procedures
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section6-6">
              Next: Handover and Training
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule8Section6_5;
