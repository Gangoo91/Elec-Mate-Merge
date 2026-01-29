import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "BIM and Digital Delivery - HNC Module 4 Section 6.6";
const DESCRIPTION = "Master BIM and digital delivery for building services: Level of Development (LOD), COBie data exchange, common data environment, ISO 19650 and digital handover.";

const quickCheckQuestions = [
  {
    id: "bim-definition",
    question: "What does BIM stand for in construction?",
    options: ["Building Information Model", "Building Integrated Management", "Basic Installation Method", "Built Infrastructure Mapping"],
    correctIndex: 0,
    explanation: "BIM stands for Building Information Modelling/Model - a digital representation of the physical and functional characteristics of a facility."
  },
  {
    id: "lod-meaning",
    question: "What does LOD (Level of Development) define?",
    options: ["The cost of the model", "The completeness and reliability of model element information", "Only the visual detail", "The software version used"],
    correctIndex: 1,
    explanation: "LOD defines how complete and reliable the information is for each model element at different project stages, from conceptual to as-built."
  },
  {
    id: "cobie-purpose",
    question: "What is the purpose of COBie?",
    options: ["3D visualisation", "Structured data exchange for facility management", "Cost estimation", "Project scheduling"],
    correctIndex: 1,
    explanation: "COBie (Construction Operations Building Information Exchange) provides a structured format for exchanging facility management data from design through to operation."
  },
  {
    id: "cde-function",
    question: "What is a Common Data Environment (CDE)?",
    options: ["A CAD software package", "A shared digital space for project information management", "A physical document storage room", "A BIM model viewer"],
    correctIndex: 1,
    explanation: "A CDE is a shared digital platform where all project information is stored, managed and exchanged according to defined processes and workflows."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which international standard covers BIM information management?",
    options: ["BS 7671", "ISO 19650", "BS EN 61082", "ISO 9001"],
    correctAnswer: 1,
    explanation: "ISO 19650 is the international standard for information management using BIM, replacing the UK's BS/PAS 1192 series."
  },
  {
    id: 2,
    question: "What LOD level typically represents 'for construction' information?",
    options: ["LOD 100", "LOD 200", "LOD 350/400", "LOD 500"],
    correctAnswer: 2,
    explanation: "LOD 350/400 represents detailed design for construction with accurate geometry, connections and specified products. LOD 500 is as-built verification."
  },
  {
    id: 3,
    question: "What information does COBie capture for electrical equipment?",
    options: [
      "Only the 3D geometry",
      "Equipment attributes, maintenance requirements, warranty information",
      "Just the specification clauses",
      "Only the manufacturer name"
    ],
    correctAnswer: 1,
    explanation: "COBie captures equipment attributes (ratings, model numbers), maintenance requirements, warranty information, location data and other operational information."
  },
  {
    id: 4,
    question: "What is a 'federated model' in BIM?",
    options: [
      "A government-owned model",
      "Multiple discipline models combined for coordination",
      "A model stored on multiple servers",
      "An encrypted model"
    ],
    correctAnswer: 1,
    explanation: "A federated model combines separate discipline models (architectural, structural, MEP) to enable coordination, clash detection and overall project review."
  },
  {
    id: 5,
    question: "What software is commonly used for MEP BIM modelling?",
    options: [
      "Microsoft Word",
      "Autodesk Revit MEP",
      "Adobe Photoshop",
      "Microsoft Excel"
    ],
    correctAnswer: 1,
    explanation: "Autodesk Revit MEP is the most widely used BIM software for mechanical, electrical and plumbing design in the UK construction industry."
  },
  {
    id: 6,
    question: "What is the purpose of clash detection in BIM?",
    options: [
      "To check spelling errors",
      "To identify spatial conflicts between building elements before construction",
      "To verify electrical calculations",
      "To check colour schemes"
    ],
    correctAnswer: 1,
    explanation: "Clash detection identifies where building elements from different disciplines occupy the same space, allowing conflicts to be resolved before construction."
  },
  {
    id: 7,
    question: "What does 'Work in Progress' (WIP) mean in CDE terminology?",
    options: [
      "Final approved information",
      "Information being developed, not ready for sharing",
      "Archived documents",
      "Published for construction"
    ],
    correctAnswer: 1,
    explanation: "WIP is information currently being developed that is not yet ready for sharing with other team members. It remains within the originator's control."
  },
  {
    id: 8,
    question: "What electrical data might be embedded in a BIM luminaire object?",
    options: [
      "Only the 3D shape",
      "Wattage, lumen output, IP rating, emergency duration, manufacturer data",
      "Just the price",
      "Only the colour"
    ],
    correctAnswer: 1,
    explanation: "BIM objects contain rich data: power rating, efficacy, lumen output, colour temperature, IP rating, emergency specifications, manufacturer product data and more."
  },
  {
    id: 9,
    question: "What is an Employer's Information Requirements (EIR)?",
    options: [
      "A payroll document",
      "The client's BIM requirements for the project",
      "Staff qualifications",
      "Building regulations"
    ],
    correctAnswer: 1,
    explanation: "The EIR (now called Exchange Information Requirements in ISO 19650) defines the client's information requirements for the project including BIM deliverables."
  },
  {
    id: 10,
    question: "Why is digital handover important for building operations?",
    options: [
      "It looks impressive",
      "It provides structured data for facilities management systems",
      "It is only required for government projects",
      "It replaces the need for maintenance"
    ],
    correctAnswer: 1,
    explanation: "Digital handover provides structured, verified data that can be imported into FM systems, enabling efficient building operation and maintenance."
  }
];

const faqs = [
  {
    question: "Do all projects require BIM?",
    answer: "BIM is mandated for UK government projects over certain thresholds. Private sector adoption varies but is increasing. Even without formal BIM requirements, digital approaches offer benefits in coordination, error reduction and information management."
  },
  {
    question: "What skills do electrical engineers need for BIM?",
    answer: "Understanding of BIM software (typically Revit MEP), knowledge of LOD requirements, ability to produce and check COBie data, familiarity with CDE workflows, and understanding of how models integrate with traditional deliverables."
  },
  {
    question: "How does BIM affect traditional drawings and specifications?",
    answer: "BIM models can generate drawings and schedules automatically, reducing manual production. However, quality checking remains essential. Specifications may reference model-embedded data. The relationship between model and documents must be clearly defined."
  },
  {
    question: "What is a BIM Execution Plan (BEP)?",
    answer: "A BEP defines how BIM will be implemented on a project: software, standards, responsibilities, deliverables, coordination procedures, and quality management. It responds to the EIR/Exchange Information Requirements."
  },
  {
    question: "How is model accuracy verified for as-built?",
    answer: "As-built verification may include site surveys (laser scanning), checking model geometry against installed conditions, and verifying data attributes are correct. This ensures the digital twin accurately represents the physical building."
  }
];

const HNCModule4Section6_6 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section6">
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
            <span>Module 4.6.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            BIM and Digital Delivery
          </h1>
          <p className="text-white/80">
            Implementing Building Information Modelling for electrical building services design and handover
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>BIM:</strong> Digital representation of building with data</li>
              <li className="pl-1"><strong>LOD:</strong> Information completeness at each stage</li>
              <li className="pl-1"><strong>COBie:</strong> Structured data for facility management</li>
              <li className="pl-1"><strong>CDE:</strong> Shared platform for information management</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>MEP models:</strong> Electrical systems in 3D with data</li>
              <li className="pl-1"><strong>Coordination:</strong> Clash detection with other services</li>
              <li className="pl-1"><strong>Schedules:</strong> Auto-generated from model</li>
              <li className="pl-1"><strong>Handover:</strong> Digital asset information</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand BIM principles and ISO 19650 framework",
              "Apply Level of Development (LOD) requirements",
              "Produce COBie data for facility management",
              "Work within a Common Data Environment (CDE)",
              "Coordinate electrical design in federated models",
              "Deliver digital handover information"
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

        {/* Section 1: BIM Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            BIM Fundamentals and ISO 19650
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Building Information Modelling represents a fundamental shift in how building information
              is created, managed and exchanged. For electrical engineers, BIM enables better coordination,
              richer information delivery and improved handover to operations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key BIM concepts:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>3D Model:</strong> Geometry representing physical elements</li>
                <li className="pl-1"><strong>Data:</strong> Information attached to model elements</li>
                <li className="pl-1"><strong>Process:</strong> Workflows for creating and managing information</li>
                <li className="pl-1"><strong>Collaboration:</strong> Multi-discipline working on shared data</li>
                <li className="pl-1"><strong>Lifecycle:</strong> Information maintained through operations</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">ISO 19650 Framework</p>
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
                      <td className="border border-white/10 px-3 py-2">19650-1</td>
                      <td className="border border-white/10 px-3 py-2">Concepts and principles</td>
                      <td className="border border-white/10 px-3 py-2">Framework and definitions</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">19650-2</td>
                      <td className="border border-white/10 px-3 py-2">Delivery phase</td>
                      <td className="border border-white/10 px-3 py-2">Design and construction</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">19650-3</td>
                      <td className="border border-white/10 px-3 py-2">Operational phase</td>
                      <td className="border border-white/10 px-3 py-2">Asset management</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">19650-5</td>
                      <td className="border border-white/10 px-3 py-2">Security</td>
                      <td className="border border-white/10 px-3 py-2">Information security</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">UK BIM Mandate</p>
              <p className="text-sm text-white">
                UK government projects require BIM Level 2 (now termed 'BIM according to ISO 19650').
                This means federated models, structured data exchange, and collaborative working
                using a Common Data Environment.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> BIM is not just 3D modelling - it's about structured information management throughout the asset lifecycle.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Level of Development */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Level of Development (LOD)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              LOD defines the completeness and reliability of information in model elements at
              different project stages. It governs both geometric detail and data content,
              ensuring appropriate information is available when needed.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">LOD Definitions for Electrical Elements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-2 py-2 text-left">LOD</th>
                      <th className="border border-white/10 px-2 py-2 text-left">Stage</th>
                      <th className="border border-white/10 px-2 py-2 text-left">Electrical Content</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">100</td>
                      <td className="border border-white/10 px-2 py-2">Concept</td>
                      <td className="border border-white/10 px-2 py-2">Indicative zones, allowances</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">200</td>
                      <td className="border border-white/10 px-2 py-2">Schematic</td>
                      <td className="border border-white/10 px-2 py-2">Generic elements, approximate size</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">300</td>
                      <td className="border border-white/10 px-2 py-2">Design development</td>
                      <td className="border border-white/10 px-2 py-2">Specific elements, accurate geometry</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">350</td>
                      <td className="border border-white/10 px-2 py-2">Construction docs</td>
                      <td className="border border-white/10 px-2 py-2">Detailed with connections</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">400</td>
                      <td className="border border-white/10 px-2 py-2">Fabrication</td>
                      <td className="border border-white/10 px-2 py-2">Manufacturer-specific data</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">500</td>
                      <td className="border border-white/10 px-2 py-2">As-built</td>
                      <td className="border border-white/10 px-2 py-2">Verified installed condition</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Geometry Development</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">LOD 200: Placeholder box</li>
                  <li className="pl-1">LOD 300: Correct overall dimensions</li>
                  <li className="pl-1">LOD 350: Connection points</li>
                  <li className="pl-1">LOD 400: Detailed geometry</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Data Development</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">LOD 200: Generic type</li>
                  <li className="pl-1">LOD 300: Specified product</li>
                  <li className="pl-1">LOD 350: Full parameters</li>
                  <li className="pl-1">LOD 400: Manufacturer data</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical note:</strong> LOD requirements are defined in the EIR/BEP - don't over-model early stages.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: COBie and Data Exchange */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            COBie and Data Exchange
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              COBie (Construction Operations Building Information Exchange) provides a standardised
              format for delivering facility management data. For electrical systems, this includes
              equipment data, maintenance requirements and spatial information.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">COBie data categories:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Facility:</strong> Building/site information</li>
                <li className="pl-1"><strong>Floor:</strong> Level data</li>
                <li className="pl-1"><strong>Space:</strong> Room information</li>
                <li className="pl-1"><strong>Zone:</strong> Grouped spaces (e.g., lighting zones)</li>
                <li className="pl-1"><strong>Type:</strong> Equipment types and specifications</li>
                <li className="pl-1"><strong>Component:</strong> Individual equipment instances</li>
                <li className="pl-1"><strong>System:</strong> Related components (e.g., lighting circuit)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Electrical COBie Data Examples</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-2 py-2 text-left">Element</th>
                      <th className="border border-white/10 px-2 py-2 text-left">COBie Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">Distribution board</td>
                      <td className="border border-white/10 px-2 py-2">Rating, ways, manufacturer, model, serial number</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">Luminaire</td>
                      <td className="border border-white/10 px-2 py-2">Wattage, lumens, lamp type, emergency duration</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">Socket outlet</td>
                      <td className="border border-white/10 px-2 py-2">Type, rating, circuit reference</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">Cable containment</td>
                      <td className="border border-white/10 px-2 py-2">Type, size, material, fire rating</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">COBie Delivery Format</p>
              <p className="text-sm text-white">
                COBie is typically delivered as a spreadsheet (xlsx) with standardised worksheets
                for each data category. It can be exported directly from BIM software or compiled
                from multiple sources. The format is designed for import into CAFM systems.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Quality:</strong> COBie data must be complete, accurate and validated before handover.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Common Data Environment */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Common Data Environment and Digital Handover
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Common Data Environment provides a structured approach to information management,
              ensuring the right information is available to the right people at the right time.
              Digital handover transfers this information to the client for operational use.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">CDE Information States</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-2 py-2 text-left">State</th>
                      <th className="border border-white/10 px-2 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-2 py-2 text-left">Access</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">Work in Progress</td>
                      <td className="border border-white/10 px-2 py-2">Being developed</td>
                      <td className="border border-white/10 px-2 py-2">Originator only</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">Shared</td>
                      <td className="border border-white/10 px-2 py-2">For coordination</td>
                      <td className="border border-white/10 px-2 py-2">Project team</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">Published</td>
                      <td className="border border-white/10 px-2 py-2">Approved for use</td>
                      <td className="border border-white/10 px-2 py-2">Authorised users</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">Archived</td>
                      <td className="border border-white/10 px-2 py-2">Historical record</td>
                      <td className="border border-white/10 px-2 py-2">Reference only</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">CDE Platforms</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Autodesk Construction Cloud</li>
                  <li className="pl-1">Bentley ProjectWise</li>
                  <li className="pl-1">Aconex</li>
                  <li className="pl-1">Viewpoint</li>
                  <li className="pl-1">BIM 360</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Digital Handover Content</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">As-built BIM models</li>
                  <li className="pl-1">COBie data deliverables</li>
                  <li className="pl-1">O&M documentation</li>
                  <li className="pl-1">Commissioning records</li>
                  <li className="pl-1">H&S file information</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Handover Verification</p>
              <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                <li>Model geometry matches as-built condition</li>
                <li>Data attributes are complete and accurate</li>
                <li>COBie validates against requirements</li>
                <li>Documentation is linked and accessible</li>
                <li>Client can import into their FM systems</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Success criterion:</strong> The client can effectively use the digital information to operate and maintain the building.
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
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">MEP Model Coordination</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Regular clash detection with other services</li>
                <li className="pl-1">Coordination meetings to resolve clashes</li>
                <li className="pl-1">Document clash resolution decisions</li>
                <li className="pl-1">Update models promptly after coordination</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Data Quality Management</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Define required parameters in BEP</li>
                <li className="pl-1">Use standardised naming conventions</li>
                <li className="pl-1">Regular data validation checks</li>
                <li className="pl-1">Verify manufacturer data accuracy</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Over-modelling</strong> - Excessive detail at early stages</li>
                <li className="pl-1"><strong>Missing data</strong> - Geometry without parameters</li>
                <li className="pl-1"><strong>Poor naming</strong> - Inconsistent or unclear references</li>
                <li className="pl-1"><strong>Late COBie</strong> - Trying to compile at handover</li>
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
                <p className="font-medium text-white mb-1">Key Standards</p>
                <ul className="space-y-0.5">
                  <li>ISO 19650 - Information management</li>
                  <li>BS EN ISO 19650-1/2 - UK adoption</li>
                  <li>COBie UK 2012 - Data exchange</li>
                  <li>Uniclass 2015 - Classification</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">LOD Summary</p>
                <ul className="space-y-0.5">
                  <li>LOD 200 - Schematic design</li>
                  <li>LOD 300 - Design development</li>
                  <li>LOD 350 - Construction documents</li>
                  <li>LOD 400 - Fabrication</li>
                  <li>LOD 500 - As-built</li>
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
            <Link to="../h-n-c-module4-section6-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module5">
              Next: Module 5
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule4Section6_6;
