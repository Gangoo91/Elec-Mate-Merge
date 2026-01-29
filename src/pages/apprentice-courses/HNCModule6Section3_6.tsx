import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "BREEAM Evidence and Certification - HNC Module 6 Section 3.6";
const DESCRIPTION = "Master BREEAM evidence requirements and certification processes: documentation standards, design stage vs post-construction evidence, assessor verification, achieving target ratings, and certification timeline.";

const quickCheckQuestions = [
  {
    id: "evidence-categories",
    question: "What are the two main stages of BREEAM evidence submission?",
    options: ["Preliminary and Final", "Design Stage and Post-Construction Stage", "Planning and Building Control", "Pre-assessment and Assessment"],
    correctIndex: 1,
    explanation: "BREEAM assessments have two main evidence submission stages: Design Stage (DS) and Post-Construction Stage (PCS). Design Stage confirms credits based on design intent, while Post-Construction Stage verifies actual implementation."
  },
  {
    id: "design-stage-evidence",
    question: "What is the primary purpose of Design Stage evidence?",
    options: ["To obtain building control approval", "To demonstrate design intent and specification compliance", "To satisfy planning requirements", "To calculate energy costs"],
    correctIndex: 1,
    explanation: "Design Stage evidence demonstrates that the design intent, specifications, and contractual requirements will achieve the targeted BREEAM credits. It confirms the design team's commitment to achieving specific performance levels."
  },
  {
    id: "pcs-evidence",
    question: "Post-Construction Stage evidence must demonstrate:",
    options: ["Design calculations only", "Planning compliance only", "That design commitments have been built as specified", "Future maintenance plans"],
    correctIndex: 2,
    explanation: "Post-Construction Stage evidence must demonstrate that the design commitments made at Design Stage have actually been implemented and built as specified. This includes as-built drawings, commissioning records, and installation verification."
  },
  {
    id: "assessor-role",
    question: "What is the BREEAM assessor's primary responsibility?",
    options: ["Designing the building systems", "Independently verifying evidence and awarding credits", "Obtaining planning permission", "Managing the construction contract"],
    correctIndex: 1,
    explanation: "The licensed BREEAM assessor independently reviews submitted evidence against BREEAM criteria, verifies compliance, and awards credits accordingly. They do not design systems but verify that evidence supports claimed credits."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which document type provides the primary evidence for lighting design credits at Design Stage?",
    options: [
      "Building control approval",
      "Lighting design specification with lux levels and controls strategy",
      "Equipment delivery notes",
      "Contractor's programme"
    ],
    correctAnswer: 1,
    explanation: "Lighting design specifications detailing target lux levels, uniformity ratios, glare control, and lighting control strategies provide primary Design Stage evidence. These demonstrate compliance with Hea 01 Visual Comfort requirements."
  },
  {
    id: 2,
    question: "What evidence is required to demonstrate Energy Sub-metering (Ene 02) compliance at Post-Construction Stage?",
    options: ["Design drawings only", "Equipment catalogues", "As-built drawings, commissioning records, and meter schedule", "Planning application"],
    correctAnswer: 2,
    explanation: "Post-Construction Stage evidence for sub-metering requires as-built drawings showing installed meter locations, commissioning records proving functionality, and a meter schedule confirming coverage of all substantial energy uses."
  },
  {
    id: 3,
    question: "A BREEAM credit requires 'Confirmation from a Suitably Qualified Person'. What does this typically involve?",
    options: [
      "A verbal confirmation",
      "A signed letter or report from a professional with relevant expertise",
      "An email from the contractor",
      "A planning officer's approval"
    ],
    correctAnswer: 1,
    explanation: "Confirmation from a Suitably Qualified Person requires a formal signed letter or report from a professional with demonstrable expertise in the relevant field (e.g., chartered engineer, registered specialist) confirming compliance with specific criteria."
  },
  {
    id: 4,
    question: "When must Design Stage assessment be completed?",
    options: [
      "After practical completion",
      "Before construction begins, based on developed design",
      "During demolition",
      "After building occupation"
    ],
    correctAnswer: 1,
    explanation: "Design Stage assessment should be completed before construction begins, typically at RIBA Stage 4 (Technical Design). This ensures design intent is locked in and contractually specified before work starts on site."
  },
  {
    id: 5,
    question: "Which of these is NOT acceptable as primary evidence for BREEAM assessment?",
    options: [
      "Signed specifications",
      "Detailed design drawings",
      "Verbal commitments from the design team",
      "Commissioning certificates"
    ],
    correctAnswer: 2,
    explanation: "Verbal commitments are not acceptable as BREEAM evidence. All evidence must be documented in written form - specifications, drawings, certificates, reports, or formal correspondence that can be verified and audited."
  },
  {
    id: 6,
    question: "What is a Schedule of Evidence in BREEAM assessment?",
    options: [
      "The project construction programme",
      "A tracker linking each credit to required evidence documents",
      "The building's energy certificate",
      "The assessor's fee proposal"
    ],
    correctAnswer: 1,
    explanation: "A Schedule of Evidence (Evidence Tracker) is a document linking each targeted BREEAM credit to the specific evidence documents required, responsible parties, and submission status. It ensures systematic evidence collection."
  },
  {
    id: 7,
    question: "For Wat 01 Water Consumption credits, which calculation tool must be used?",
    options: [
      "SAP calculation",
      "BREEAM Wat 01 Calculator",
      "Building Regulations Part G calculator",
      "SBEM model"
    ],
    correctAnswer: 1,
    explanation: "The BREEAM Wat 01 Calculator is the mandatory tool for calculating water consumption credits. It uses fixture specifications and flow rates to determine the building's water efficiency and corresponding credit achievement."
  },
  {
    id: 8,
    question: "What happens if Post-Construction Stage evidence shows that a Design Stage credit cannot be achieved?",
    options: [
      "The assessment fails completely",
      "The credit is withdrawn and final rating may be affected",
      "Design Stage certificate is revoked",
      "No action is required"
    ],
    correctAnswer: 1,
    explanation: "If Post-Construction evidence shows a Design Stage credit cannot be achieved (e.g., system not installed as specified), the credit is withdrawn from the final assessment. This may affect the overall rating if insufficient credits remain."
  },
  {
    id: 9,
    question: "Which professional typically provides evidence for Hea 02 Indoor Air Quality credits?",
    options: [
      "Quantity surveyor",
      "Building services engineer or ventilation specialist",
      "Structural engineer",
      "Planning consultant"
    ],
    correctAnswer: 1,
    explanation: "Building services engineers or ventilation specialists provide evidence for Indoor Air Quality credits, including ventilation design calculations, fresh air rates, CO2 monitoring strategies, and material specifications for low-VOC emissions."
  },
  {
    id: 10,
    question: "A client wants to achieve BREEAM Excellent. At what percentage of available credits is this typically achieved?",
    options: ["55%", "70%", "85%", "95%"],
    correctAnswer: 1,
    explanation: "BREEAM Excellent rating typically requires achieving 70% or more of available credits. The exact threshold varies slightly by scheme version and building type, but 70% is the standard benchmark for Excellent."
  },
  {
    id: 11,
    question: "What is the purpose of a BREEAM Pre-Assessment?",
    options: [
      "To submit final evidence",
      "To identify achievable credits and evidence requirements early in design",
      "To obtain the final certificate",
      "To verify construction quality"
    ],
    correctAnswer: 1,
    explanation: "A BREEAM Pre-Assessment is conducted early in design (RIBA Stage 2-3) to identify which credits are achievable, their cost implications, and evidence requirements. This allows design decisions to be made while changes are still economical."
  },
  {
    id: 12,
    question: "Site photographs as Post-Construction evidence should include:",
    options: [
      "Marketing images only",
      "Clear images of installed systems with reference to specifications and dates",
      "Aerial photographs of the site",
      "Photos of the design team"
    ],
    correctAnswer: 1,
    explanation: "Site photographs for BREEAM evidence should clearly show installed systems, include references to relevant specifications or drawing details, be dated, and demonstrate that the photographed installations match the design intent."
  }
];

const faqs = [
  {
    question: "What happens if evidence is submitted late to the assessor?",
    answer: "Late evidence submission can delay certification and may incur additional assessor fees for extended assessment periods. BRE has time limits for completing assessments after practical completion (typically 3 months for Design Stage issue and 12 months for final certificate). If evidence is not provided within these timeframes, the assessment may need to restart or credits may be lost. Project teams should establish evidence submission schedules aligned with design and construction milestones."
  },
  {
    question: "Can Design Stage credits be claimed without specifications being contractually fixed?",
    answer: "Design Stage credits require evidence that performance requirements will be achieved through contractual commitment. This typically means specifications must be included in tender documentation, employer's requirements, or formal design commitments. Credits based on 'design intent' alone without contractual backing may be challenged by the assessor. The key is demonstrating that the specified performance will be delivered, not just considered."
  },
  {
    question: "Who is responsible for collecting BREEAM evidence on a project?",
    answer: "Evidence collection responsibility varies by project structure but typically involves: the BREEAM Accredited Professional (AP) coordinating overall evidence strategy; design consultants providing design-stage specifications and calculations; the contractor providing installation records, commissioning data, and as-built documentation; and the client providing procurement evidence and sustainability policies. Clear responsibility allocation in the project execution plan prevents gaps."
  },
  {
    question: "What if the installed system differs from the Design Stage specification?",
    answer: "If installed systems differ from Design Stage specifications, the assessor must evaluate whether the actual installation still achieves the credit criteria. Minor variations that maintain performance compliance may be acceptable with supporting evidence. Significant changes require re-evaluation - if the actual installation meets or exceeds requirements, credits may be maintained; if it falls short, credits may be reduced or withdrawn. Change control documentation is essential."
  },
  {
    question: "How long does BREEAM certification take?",
    answer: "BREEAM certification timeline depends on evidence quality and assessor workload. Design Stage certificates are typically issued 4-6 weeks after complete evidence submission. Post-Construction certificates take 6-8 weeks from complete submission. However, evidence queries and incomplete submissions can extend timelines significantly. Projects should allow 3-6 months from practical completion for final certification, accounting for defects correction and commissioning completion."
  },
  {
    question: "Can existing buildings achieve BREEAM certification?",
    answer: "Yes, BREEAM In-Use assesses operational buildings without requiring original design documentation. However, BREEAM New Construction cannot be retrospectively applied to buildings completed without registration. For refurbishment projects, BREEAM Refurbishment & Fit-Out may apply. The key distinction is registration timing - projects must be registered with BRE before practical completion to achieve BREEAM New Construction certification."
  }
];

const HNCModule6Section3_6 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module6-section3">
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
            <span>Module 6.3.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            BREEAM Evidence and Certification
          </h1>
          <p className="text-white/80">
            Documentation requirements, design stage vs post-construction evidence, assessor verification, and achieving certification
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Design Stage:</strong> Evidence of design intent and specifications</li>
              <li className="pl-1"><strong>Post-Construction:</strong> Verification of actual implementation</li>
              <li className="pl-1"><strong>Documentation:</strong> Written, signed, and auditable evidence only</li>
              <li className="pl-1"><strong>Certification:</strong> Independent assessor verification to BRE</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>MEP evidence:</strong> Specifications, calculations, commissioning</li>
              <li className="pl-1"><strong>Key categories:</strong> Energy, Health & Wellbeing, Water</li>
              <li className="pl-1"><strong>Timelines:</strong> 4-6 weeks DS, 6-8 weeks PCS</li>
              <li className="pl-1"><strong>Ratings:</strong> Pass (30%), Good (45%), Very Good (55%), Excellent (70%)</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify documentation requirements for BREEAM credits",
              "Distinguish between Design Stage and Post-Construction evidence",
              "Apply assessor verification standards to evidence preparation",
              "Develop evidence schedules for building services credits",
              "Understand certification timeline and process requirements",
              "Avoid common evidence issues that delay certification"
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

        {/* Section 1: Documentation Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Documentation Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BREEAM assessment requires comprehensive documentation to demonstrate compliance with credit criteria.
              Evidence must be written, verifiable, and submitted in formats that allow independent audit. Verbal
              commitments, unsigned documents, and undated records are not acceptable.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Evidence Types Required for Building Services Credits:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Design specifications:</strong> Signed technical specifications with performance requirements</li>
                <li className="pl-1"><strong>Calculations:</strong> Energy models, lighting calculations, water consumption analyses</li>
                <li className="pl-1"><strong>Drawings:</strong> Design drawings at DS, as-built drawings at PCS</li>
                <li className="pl-1"><strong>Product data:</strong> Manufacturer datasheets, certifications, test reports</li>
                <li className="pl-1"><strong>Commissioning records:</strong> Test certificates, commissioning reports, handover documentation</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Evidence Quality Standards</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Requirement</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Standard</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Dated</td>
                      <td className="border border-white/10 px-3 py-2">Clear issue date visible</td>
                      <td className="border border-white/10 px-3 py-2">Specification Rev C - 15/03/2024</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Signed/Authorised</td>
                      <td className="border border-white/10 px-3 py-2">Named responsible person</td>
                      <td className="border border-white/10 px-3 py-2">Approved by: J. Smith CEng</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Project-specific</td>
                      <td className="border border-white/10 px-3 py-2">References project name/number</td>
                      <td className="border border-white/10 px-3 py-2">Project: Manchester Office - Ref: 12345</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Complete</td>
                      <td className="border border-white/10 px-3 py-2">All relevant information included</td>
                      <td className="border border-white/10 px-3 py-2">Full meter schedule with all locations</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Traceable</td>
                      <td className="border border-white/10 px-3 py-2">Clear reference system</td>
                      <td className="border border-white/10 px-3 py-2">Drawing ME-101 Rev D correlates to spec clause 5.3</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> If evidence cannot be independently verified by reading the document alone, it is insufficient for BREEAM assessment.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Design Stage Evidence */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Design Stage Evidence
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Design Stage (DS) assessment confirms that the building design will achieve targeted BREEAM credits
              when built as specified. Evidence must demonstrate design intent, specification compliance, and
              contractual commitment to achieving performance requirements.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Specifications</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Signed M&E specifications</li>
                  <li className="pl-1">Employer's Requirements</li>
                  <li className="pl-1">Performance standards stated</li>
                  <li className="pl-1">Contractual obligations clear</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Design Calculations</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Energy modelling (SBEM/DSM)</li>
                  <li className="pl-1">Lighting design calculations</li>
                  <li className="pl-1">Wat 01 water calculations</li>
                  <li className="pl-1">Ventilation airflow analysis</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Design Drawings</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Schematic layouts</li>
                  <li className="pl-1">Equipment schedules</li>
                  <li className="pl-1">Meter locations shown</li>
                  <li className="pl-1">Control strategies illustrated</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Services Design Stage Evidence by Credit</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Credit</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Primary Evidence</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Supporting Evidence</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ene 01 Energy Performance</td>
                      <td className="border border-white/10 px-3 py-2">SBEM/DSM calculations</td>
                      <td className="border border-white/10 px-3 py-2">M&E specifications, plant schedules</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ene 02 Sub-metering</td>
                      <td className="border border-white/10 px-3 py-2">Metering strategy document</td>
                      <td className="border border-white/10 px-3 py-2">Meter schedule, schematic drawings</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Hea 01 Visual Comfort</td>
                      <td className="border border-white/10 px-3 py-2">Lighting design calculations</td>
                      <td className="border border-white/10 px-3 py-2">Luminaire specifications, control strategy</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Hea 02 Indoor Air Quality</td>
                      <td className="border border-white/10 px-3 py-2">Ventilation design calculations</td>
                      <td className="border border-white/10 px-3 py-2">AHU schedules, fresh air rates</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Wat 01 Water Consumption</td>
                      <td className="border border-white/10 px-3 py-2">BREEAM Wat 01 Calculator</td>
                      <td className="border border-white/10 px-3 py-2">Sanitaryware specifications</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Timing:</strong> Design Stage assessment should be completed at RIBA Stage 4 (Technical Design) before construction contracts are let.
            </p>
          </div>
        </section>

        {/* Section 3: Post-Construction Stage Evidence */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Post-Construction Stage Evidence
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Post-Construction Stage (PCS) assessment verifies that Design Stage commitments have been
              implemented as specified. Evidence must demonstrate actual installation, commissioning results,
              and operational compliance with credited performance levels.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">PCS Evidence Hierarchy</p>
              <div className="text-sm space-y-1">
                <p><span className="text-white/60">Level 1:</span> <span className="text-white">As-built drawings (shows what was installed)</span></p>
                <p><span className="text-white/60">Level 2:</span> <span className="text-white">Commissioning certificates (proves it works)</span></p>
                <p><span className="text-white/60">Level 3:</span> <span className="text-white">Site photographs (visual verification)</span></p>
                <p><span className="text-white/60">Level 4:</span> <span className="text-white">O&M manuals (handover documentation)</span></p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Post-Construction Evidence Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>As-built drawings:</strong> Final installation drawings showing actual meter locations, equipment positions, and system configurations</li>
                <li className="pl-1"><strong>Commissioning records:</strong> Signed certificates demonstrating systems meet specified performance</li>
                <li className="pl-1"><strong>Test results:</strong> Air tightness testing, water flow rates, lux level surveys, thermal imaging</li>
                <li className="pl-1"><strong>Installation records:</strong> Delivery notes, installation sign-off sheets, quality records</li>
                <li className="pl-1"><strong>Site photographs:</strong> Dated images showing installed systems with specification references</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Services PCS Evidence Examples</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Credit</th>
                      <th className="border border-white/10 px-3 py-2 text-left">PCS Evidence Required</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Responsible Party</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ene 01 Energy Performance</td>
                      <td className="border border-white/10 px-3 py-2">Final EPC, as-built SBEM, air tightness test</td>
                      <td className="border border-white/10 px-3 py-2">Energy assessor</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ene 02 Sub-metering</td>
                      <td className="border border-white/10 px-3 py-2">Meter commissioning certificates, as-built schedule</td>
                      <td className="border border-white/10 px-3 py-2">M&E contractor</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Hea 01 Visual Comfort</td>
                      <td className="border border-white/10 px-3 py-2">Lux level survey results, lighting commissioning</td>
                      <td className="border border-white/10 px-3 py-2">Electrical contractor</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Hea 02 Indoor Air Quality</td>
                      <td className="border border-white/10 px-3 py-2">Ventilation commissioning, air quality testing</td>
                      <td className="border border-white/10 px-3 py-2">Mechanical contractor</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Wat 01 Water Consumption</td>
                      <td className="border border-white/10 px-3 py-2">Flow rate test results, sanitaryware installation photos</td>
                      <td className="border border-white/10 px-3 py-2">Plumbing contractor</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Critical note:</strong> PCS evidence must correlate with Design Stage specifications. Any deviations must be documented with explanation of how credit compliance is maintained.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Assessor Verification and Certification */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Assessor Verification and Certification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Licensed BREEAM assessors independently verify submitted evidence against credit criteria before
              submitting the assessment to BRE for Quality Assurance audit. The certification process involves
              multiple verification stages to ensure assessment integrity.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Certification Process Timeline</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Design Stage Certificate</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>1. Evidence submission to assessor</li>
                    <li>2. Assessor review and queries (2-4 weeks)</li>
                    <li>3. Evidence completion and sign-off</li>
                    <li>4. Submission to BRE QA (1-2 weeks)</li>
                    <li>5. BRE QA review and queries (2-3 weeks)</li>
                    <li>6. Certificate issue (1 week)</li>
                    <li className="font-medium text-elec-yellow/80 pt-2">Total: 6-10 weeks typical</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Post-Construction Certificate</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>1. Practical completion achieved</li>
                    <li>2. PCS evidence collection (2-8 weeks)</li>
                    <li>3. Assessor review and site visit</li>
                    <li>4. Evidence completion (2-4 weeks)</li>
                    <li>5. BRE QA submission (2-3 weeks)</li>
                    <li>6. Final certificate issue (1 week)</li>
                    <li className="font-medium text-elec-yellow/80 pt-2">Total: 8-16 weeks from PC</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Assessor Verification Checks</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Verification Area</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Assessor Check</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Common Issues</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Evidence authenticity</td>
                      <td className="border border-white/10 px-3 py-2">Dates, signatures, project references</td>
                      <td className="border border-white/10 px-3 py-2">Unsigned documents, generic templates</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Criteria compliance</td>
                      <td className="border border-white/10 px-3 py-2">Evidence matches credit requirements</td>
                      <td className="border border-white/10 px-3 py-2">Partial compliance, missing elements</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Calculation accuracy</td>
                      <td className="border border-white/10 px-3 py-2">Methodology and inputs verified</td>
                      <td className="border border-white/10 px-3 py-2">Errors in BREEAM calculators</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Consistency</td>
                      <td className="border border-white/10 px-3 py-2">Evidence documents align</td>
                      <td className="border border-white/10 px-3 py-2">Specifications contradict drawings</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Completeness</td>
                      <td className="border border-white/10 px-3 py-2">All required evidence present</td>
                      <td className="border border-white/10 px-3 py-2">Missing commissioning records</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BREEAM Rating Thresholds</p>
              <div className="text-sm space-y-2">
                <p><strong>Pass:</strong> 30% of available credits</p>
                <p><strong>Good:</strong> 45% of available credits</p>
                <p><strong>Very Good:</strong> 55% of available credits</p>
                <p><strong>Excellent:</strong> 70% of available credits</p>
                <p><strong>Outstanding:</strong> 85% of available credits</p>
                <p className="text-white/70 mt-2 italic">Note: Minimum standards must be achieved in certain credits regardless of overall percentage.</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>BRE QA:</strong> All assessments undergo BRE Quality Assurance audit. Approximately 10% receive detailed technical audit which may raise additional queries.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Energy Sub-metering Evidence Package</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Compile evidence for Ene 02 Sub-metering credits (3 credits targeted).
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Design Stage Evidence:</p>
                <p className="mt-2">1. Metering Strategy Document (dated, signed)</p>
                <p className="ml-4">- Lists all energy uses over 10% of total</p>
                <p className="ml-4">- Identifies meter locations and types</p>
                <p className="ml-4">- States BMS integration requirements</p>
                <p className="mt-2">2. Electrical Specification Clause 5.7</p>
                <p className="ml-4">- "Sub-meters to all substantial loads (heating,</p>
                <p className="ml-4">   cooling, lighting, small power, lifts, etc.)"</p>
                <p className="mt-2">3. Schematic Drawing ME-SK-101</p>
                <p className="ml-4">- Shows meter positions on distribution schematic</p>
                <p className="mt-2 text-white/60">Post-Construction Stage Evidence:</p>
                <p className="mt-2">4. As-built Meter Schedule (Rev Final)</p>
                <p className="ml-4">- Lists 24 meters installed with references</p>
                <p className="mt-2">5. Commissioning Certificates</p>
                <p className="ml-4">- Meter calibration certificates</p>
                <p className="ml-4">- BMS point verification sheets</p>
                <p className="mt-2">6. Site Photographs</p>
                <p className="ml-4">- Dated photos of installed meters with labels</p>
                <p className="mt-2 text-green-400">Result: 3 credits achieved - full sub-metering coverage verified</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Lighting Design Evidence for Hea 01</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Prepare Visual Comfort evidence for office building.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Design Stage Package:</p>
                <p className="mt-2">1. Lighting Design Report (by qualified designer)</p>
                <p className="ml-4">Target lux levels per space type:</p>
                <p className="ml-4">- Offices: 500 lux maintained, UGR &lt;19</p>
                <p className="ml-4">- Circulation: 200 lux maintained</p>
                <p className="ml-4">- Meeting rooms: 500 lux, dimming provision</p>
                <p className="mt-2">2. DIALux Calculation Outputs</p>
                <p className="ml-4">- Room-by-room calculations with uniformity</p>
                <p className="ml-4">- UGR calculations for desk positions</p>
                <p className="mt-2">3. Luminaire Schedule with Product Data</p>
                <p className="ml-4">- TM66 circularity data (if targeting exemplary)</p>
                <p className="ml-4">- Photometric files referenced</p>
                <p className="mt-2 text-white/60">Post-Construction Stage Package:</p>
                <p className="mt-2">4. Commissioning Lux Level Survey</p>
                <p className="ml-4">- Measured values per space (signed by engineer)</p>
                <p className="ml-4">- Results exceed design targets</p>
                <p className="mt-2">5. Lighting Control Commissioning</p>
                <p className="ml-4">- Dimming function tested and verified</p>
                <p className="ml-4">- Scene setting completed</p>
                <p className="mt-2 text-green-400">Result: Credits achieved - design targets met on site</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Resolving a PCS Evidence Gap</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Design Stage specified DALI lighting controls, but contractor installed standard switching.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Issue Identified:</p>
                <p className="ml-4">- DS specification: DALI dimming throughout</p>
                <p className="ml-4">- PCS reality: Manual switching only in some areas</p>
                <p className="mt-2 text-white/60">Impact Assessment:</p>
                <p className="ml-4">- Hea 01 Credit 2 (zoned control) at risk</p>
                <p className="ml-4">- ENE 01 assumptions may be affected</p>
                <p className="mt-2 text-white/60">Resolution Options:</p>
                <p className="mt-2">Option A: Remediation</p>
                <p className="ml-4 text-green-400">- Retrofit DALI drivers and controls</p>
                <p className="ml-4 text-green-400">- Commission and evidence as specified</p>
                <p className="ml-4 text-green-400">- Credit maintained</p>
                <p className="mt-2">Option B: Accept credit loss</p>
                <p className="ml-4 text-red-400">- Document variation with explanation</p>
                <p className="ml-4 text-red-400">- Withdraw credit from final assessment</p>
                <p className="ml-4 text-red-400">- Check overall rating impact</p>
                <p className="mt-2 text-elec-yellow">Lesson: Early site monitoring prevents PCS surprises</p>
              </div>
            </div>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Evidence Collection Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Create evidence tracker at project start with responsible parties</li>
                <li className="pl-1">Include BREEAM requirements in tender documentation</li>
                <li className="pl-1">Schedule evidence review meetings at key project stages</li>
                <li className="pl-1">Collect evidence progressively - don't wait until practical completion</li>
                <li className="pl-1">Maintain clear document version control and references</li>
                <li className="pl-1">Photograph installations during construction (before concealment)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Deadlines to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Project registration: <strong>Before practical completion</strong></li>
                <li className="pl-1">Design Stage submission: <strong>RIBA Stage 4</strong> (before construction)</li>
                <li className="pl-1">PCS evidence submission: <strong>Within 12 months</strong> of practical completion</li>
                <li className="pl-1">Final certificate: <strong>Typically 3-4 months</strong> after complete evidence submission</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Evidence Problems to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Unsigned documents</strong> - All evidence requires named responsible person</li>
                <li className="pl-1"><strong>Generic specifications</strong> - Must be project-specific with clear references</li>
                <li className="pl-1"><strong>Undated photographs</strong> - Site photos must include date stamps</li>
                <li className="pl-1"><strong>Missing commissioning records</strong> - Systems must be proven to work as designed</li>
                <li className="pl-1"><strong>Inconsistent documents</strong> - Specifications must match drawings and as-built records</li>
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
                <p className="font-medium text-white mb-1">Evidence Standards</p>
                <ul className="space-y-0.5">
                  <li>Dated - clear issue date visible</li>
                  <li>Signed - named responsible person</li>
                  <li>Project-specific - referenced correctly</li>
                  <li>Complete - all information included</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Rating Thresholds</p>
                <ul className="space-y-0.5">
                  <li>Pass: 30% | Good: 45%</li>
                  <li>Very Good: 55%</li>
                  <li>Excellent: 70%</li>
                  <li>Outstanding: 85%</li>
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
            <Link to="../h-n-c-module6-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module6-section4-1">
              Next: Section 4.1
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule6Section3_6;
