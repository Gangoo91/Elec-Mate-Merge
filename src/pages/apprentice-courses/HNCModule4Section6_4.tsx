import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Design Calculations - HNC Module 4 Section 6.4";
const DESCRIPTION = "Master design calculation documentation for building services: calculation reports, verification procedures, checking methods, design reviews and approval processes.";

const quickCheckQuestions = [
  {
    id: "calc-purpose",
    question: "What is the primary purpose of documented design calculations?",
    options: ["To increase paperwork", "To demonstrate compliance and enable verification", "To satisfy the client only", "To replace drawings"],
    correctIndex: 1,
    explanation: "Documented calculations demonstrate that designs meet regulatory and performance requirements, enabling independent verification and providing an audit trail."
  },
  {
    id: "verification",
    question: "What is 'verification' in the context of design calculations?",
    options: ["Checking spelling", "Confirming calculations are correct through independent review", "Getting client sign-off", "Printing final reports"],
    correctIndex: 1,
    explanation: "Verification involves independent checking of calculations to confirm they are technically correct, use appropriate methods and assumptions, and meet the design requirements."
  },
  {
    id: "assumptions",
    question: "Why must calculation assumptions be documented?",
    options: ["They are optional information", "To enable review and identify if conditions change", "Only for complex calculations", "Because regulations require it"],
    correctIndex: 1,
    explanation: "Documented assumptions enable reviewers to understand the calculation basis and identify if site conditions differ from those assumed, requiring design review."
  },
  {
    id: "approval",
    question: "Who typically approves design calculations in a building services project?",
    options: ["Anyone on the team", "The client only", "A competent engineer at appropriate level", "Only the Building Control officer"],
    correctIndex: 2,
    explanation: "Design calculations should be approved by a competent engineer with appropriate experience and authority level for the complexity and risk of the design."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What should be included in a calculation report cover sheet?",
    options: [
      "Only the calculation results",
      "Project details, calculation reference, revision status, prepared/checked/approved names and dates",
      "Just the date",
      "Only the engineer's signature"
    ],
    correctAnswer: 1,
    explanation: "Cover sheets provide essential identification: project, calc reference, revision, status, and the names and dates of those who prepared, checked and approved the calculation."
  },
  {
    id: 2,
    question: "What is the difference between 'checking' and 'verification'?",
    options: [
      "They are identical terms",
      "Checking is arithmetic review; verification confirms methodology and compliance",
      "Verification is for drawings only",
      "Checking is more thorough than verification"
    ],
    correctAnswer: 1,
    explanation: "Checking typically focuses on arithmetic accuracy, while verification is broader - confirming appropriate methodology, standards application, and that the design meets requirements."
  },
  {
    id: 3,
    question: "Which calculations are mandatory for BS 7671 compliance?",
    options: [
      "Only lighting calculations",
      "Prospective fault current, earth fault loop impedance, cable sizing, voltage drop",
      "Just cable sizing",
      "Only calculations requested by the client"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 requires calculations for prospective fault current, earth fault loop impedance (Zs), cable sizing (current capacity), and voltage drop to demonstrate compliance."
  },
  {
    id: 4,
    question: "What should happen when design input data changes?",
    options: [
      "Ignore the change",
      "Review and revise affected calculations, then re-approve",
      "Only update if the client notices",
      "Add a note without recalculating"
    ],
    correctAnswer: 1,
    explanation: "Changed input data (load changes, route changes, etc.) requires affected calculations to be reviewed, revised if necessary, and re-approved through the normal approval process."
  },
  {
    id: 5,
    question: "What software is commonly used for electrical design calculations?",
    options: [
      "Word processors only",
      "Amtech, Trimble, DIALux, spreadsheet templates",
      "CAD software only",
      "No software is used - all calculations are manual"
    ],
    correctAnswer: 1,
    explanation: "Specialised software like Amtech (cable sizing), Trimble (cable sizing), DIALux/Relux (lighting), and validated spreadsheets are commonly used, with appropriate verification."
  },
  {
    id: 6,
    question: "How should calculation software outputs be documented?",
    options: [
      "Just keep digital files",
      "Print outputs with input data visible, version noted, and include in calc package",
      "Software outputs don't need documentation",
      "Only save to the server"
    ],
    correctAnswer: 1,
    explanation: "Software outputs should be printed/exported with all input data visible, software version noted, and included in the calculation package for complete traceability."
  },
  {
    id: 7,
    question: "What is 'design validation' as opposed to verification?",
    options: [
      "The same as verification",
      "Confirming the design works as intended in practice",
      "Getting client approval",
      "Checking arithmetic only"
    ],
    correctAnswer: 1,
    explanation: "Validation confirms that the completed installation performs as designed - typically through testing and commissioning. Verification is the design stage review process."
  },
  {
    id: 8,
    question: "At what project stage should calculations be complete?",
    options: [
      "After construction",
      "Before construction information is issued",
      "Only for final certification",
      "Calculations are optional"
    ],
    correctAnswer: 1,
    explanation: "Calculations should be complete and approved before issuing construction information. This ensures designs are verified before installation begins."
  },
  {
    id: 9,
    question: "What calculation documentation is typically required for O&M manuals?",
    options: [
      "No calculations are required",
      "Key design calculations, assumptions, and any as-built revisions",
      "Only lighting calculations",
      "Just the software licence information"
    ],
    correctAnswer: 1,
    explanation: "O&M manuals typically include key design calculations showing system capacity, major assumptions, and any variations from original design reflecting as-built conditions."
  },
  {
    id: 10,
    question: "How should calculation errors discovered during checking be handled?",
    options: [
      "Ignore if minor",
      "Document the error, correct the calculation, re-check and update revision",
      "Just correct without documenting",
      "Start a new calculation with different reference"
    ],
    correctAnswer: 1,
    explanation: "Errors should be documented (for learning and audit), corrected, re-checked, and the calculation revision updated. This maintains the integrity of the quality system."
  }
];

const faqs = [
  {
    question: "What level of calculation detail is needed?",
    answer: "Sufficient detail for a competent engineer to understand and verify the work without access to the original designer. Include: input data sources, assumptions, calculation method, standards references, and clear conclusions. Over-complex calculations should be simplified where possible."
  },
  {
    question: "Should I use calculation software or manual methods?",
    answer: "Both are acceptable if properly documented. Software is faster and reduces arithmetic errors, but must be validated. Manual calculations may be preferred for simple cases or where software validation is uncertain. Many engineers use software with manual verification checks."
  },
  {
    question: "How do I handle calculations inherited from another designer?",
    answer: "Review the calculations for competence and accuracy. If satisfactory, document your review and acceptance. If deficient, either request corrections from the original designer or revise/replace them yourself. Never accept responsibility for calculations you haven't verified."
  },
  {
    question: "What is a Category 3 check?",
    answer: "In some engineering frameworks (e.g., rail), Category 3 is an independent design check by a party not involved in the original design. Building services typically uses similar concepts with Design Review (internal) and Independent Design Check (external) terminology."
  },
  {
    question: "How long should calculation records be retained?",
    answer: "As-built calculations should be retained for the life of the installation, ideally 25+ years for building services. They may be needed for future alterations, incident investigations, or when questions arise about original design intent."
  }
];

const HNCModule4Section6_4 = () => {
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
            <span>Module 4.6.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Design Calculations
          </h1>
          <p className="text-white/80">
            Documenting, verifying and approving engineering calculations for building services design
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Purpose:</strong> Demonstrate compliance and enable verification</li>
              <li className="pl-1"><strong>Content:</strong> Input data, assumptions, method, results</li>
              <li className="pl-1"><strong>Process:</strong> Prepare, check, verify, approve</li>
              <li className="pl-1"><strong>Documentation:</strong> Clear audit trail throughout</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Cable sizing:</strong> Current capacity, voltage drop</li>
              <li className="pl-1"><strong>Protection:</strong> Fault current, earth loop impedance</li>
              <li className="pl-1"><strong>Lighting:</strong> Lux levels, emergency coverage</li>
              <li className="pl-1"><strong>Load assessment:</strong> Diversity, maximum demand</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Structure calculation reports for clarity and traceability",
              "Document assumptions and input data sources",
              "Apply verification and checking procedures",
              "Understand design review and approval processes",
              "Manage calculation revisions and change control",
              "Prepare calculations for project handover"
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

        {/* Section 1: Calculation Report Structure */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Calculation Report Structure
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Well-structured calculation reports enable efficient review, provide clear audit trails,
              and support future reference. A consistent format across projects improves quality
              and reduces errors.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Standard calculation report elements:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Cover sheet:</strong> Project, reference, revision, signatures</li>
                <li className="pl-1"><strong>Contents:</strong> List of calculations included</li>
                <li className="pl-1"><strong>Introduction:</strong> Scope and purpose</li>
                <li className="pl-1"><strong>Design basis:</strong> Standards, codes, criteria</li>
                <li className="pl-1"><strong>Input data:</strong> Parameters and sources</li>
                <li className="pl-1"><strong>Assumptions:</strong> Items assumed for calculation</li>
                <li className="pl-1"><strong>Calculations:</strong> Detailed working</li>
                <li className="pl-1"><strong>Results summary:</strong> Key findings and compliance</li>
                <li className="pl-1"><strong>References:</strong> Standards, drawings, data sources</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cover Sheet Information</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Field</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Content</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Project</td>
                      <td className="border border-white/10 px-3 py-2">Name and number</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Calc reference</td>
                      <td className="border border-white/10 px-3 py-2">E.g., 12345-E-CALC-001</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Revision</td>
                      <td className="border border-white/10 px-3 py-2">Rev A, B, C... with date</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Prepared by</td>
                      <td className="border border-white/10 px-3 py-2">Name, signature, date</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Checked by</td>
                      <td className="border border-white/10 px-3 py-2">Name, signature, date</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Approved by</td>
                      <td className="border border-white/10 px-3 py-2">Name, signature, date</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Status</td>
                      <td className="border border-white/10 px-3 py-2">Preliminary/For Construction/As-built</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Every calculation page should be identifiable with project, reference and revision even when separated from the cover.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Verification and Checking */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Verification and Checking Procedures
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Verification ensures calculations are technically sound and appropriate for purpose.
              A systematic checking process catches errors before they reach site, preventing
              costly remediation and potential safety issues.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Checking levels:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Self-check:</strong> Designer reviews own work before submission</li>
                <li className="pl-1"><strong>Peer check:</strong> Colleague at similar level reviews</li>
                <li className="pl-1"><strong>Senior review:</strong> Experienced engineer verifies approach</li>
                <li className="pl-1"><strong>Independent check:</strong> External party for critical items</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Arithmetic Check</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Numbers correct from input data</li>
                  <li className="pl-1">Formulas applied correctly</li>
                  <li className="pl-1">Units consistent throughout</li>
                  <li className="pl-1">Results reasonable (sense check)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Technical Verification</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Appropriate method selected</li>
                  <li className="pl-1">Correct standards applied</li>
                  <li className="pl-1">Assumptions valid and documented</li>
                  <li className="pl-1">Conclusions supported by results</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Checking Scope by Complexity</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-2 py-2 text-left">Complexity</th>
                      <th className="border border-white/10 px-2 py-2 text-left">Example</th>
                      <th className="border border-white/10 px-2 py-2 text-left">Check Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">Simple</td>
                      <td className="border border-white/10 px-2 py-2">Final circuit sizing</td>
                      <td className="border border-white/10 px-2 py-2">Self + peer</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">Standard</td>
                      <td className="border border-white/10 px-2 py-2">Sub-main sizing, lighting</td>
                      <td className="border border-white/10 px-2 py-2">Peer + senior review</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">Complex</td>
                      <td className="border border-white/10 px-2 py-2">Fault calculations, discrimination</td>
                      <td className="border border-white/10 px-2 py-2">Full technical verification</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">Critical</td>
                      <td className="border border-white/10 px-2 py-2">HV design, specialist systems</td>
                      <td className="border border-white/10 px-2 py-2">Independent external check</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> The checker should be independent from the original calculation - not simply repeating the same method.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Design Review Process */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Design Review and Approval
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Design reviews provide structured opportunities to assess calculations and designs
              against requirements. The approval process confirms the design is fit for purpose
              before information is issued for construction.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Design review stages:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Concept review:</strong> Validate approach and methodology</li>
                <li className="pl-1"><strong>Detailed design review:</strong> Check calculations against requirements</li>
                <li className="pl-1"><strong>Pre-issue review:</strong> Final check before construction issue</li>
                <li className="pl-1"><strong>As-built review:</strong> Verify changes during construction</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Review Meeting Agenda</p>
              <div className="bg-white/5 p-4 rounded text-sm">
                <ul className="text-white space-y-1 list-disc list-outside ml-5">
                  <li>Confirm design basis and requirements</li>
                  <li>Review calculations against specification</li>
                  <li>Check coordination with other disciplines</li>
                  <li>Identify outstanding items and actions</li>
                  <li>Agree approval status and next steps</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Approval Authority Matrix</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-2 py-2 text-left">Design Type</th>
                      <th className="border border-white/10 px-2 py-2 text-left">Typical Approver</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">Standard circuits</td>
                      <td className="border border-white/10 px-2 py-2">Project Engineer</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">Distribution systems</td>
                      <td className="border border-white/10 px-2 py-2">Senior Engineer</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">HV/specialist systems</td>
                      <td className="border border-white/10 px-2 py-2">Principal Engineer/Director</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">Safety-critical</td>
                      <td className="border border-white/10 px-2 py-2">Independent Certifier</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Important:</strong> Approvers take responsibility for the design - they must have appropriate competence and authority.
            </p>
          </div>
        </section>

        {/* Section 4: Calculation Types and Standards */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Key Calculation Types
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Building services electrical design requires specific calculation types to demonstrate
              compliance with BS 7671 and other standards. Each calculation type has defined
              methodology and acceptance criteria.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BS 7671 Required Calculations</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-2 py-2 text-left">Calculation</th>
                      <th className="border border-white/10 px-2 py-2 text-left">Purpose</th>
                      <th className="border border-white/10 px-2 py-2 text-left">Key Criteria</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">Cable sizing (Iz)</td>
                      <td className="border border-white/10 px-2 py-2">Current capacity</td>
                      <td className="border border-white/10 px-2 py-2">Iz ≥ In ≥ Ib</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">Voltage drop</td>
                      <td className="border border-white/10 px-2 py-2">Supply quality</td>
                      <td className="border border-white/10 px-2 py-2">≤3% lighting, ≤5% power</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">Fault current (Ipf)</td>
                      <td className="border border-white/10 px-2 py-2">Device breaking capacity</td>
                      <td className="border border-white/10 px-2 py-2">Device Icn ≥ Ipf</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">Earth fault loop (Zs)</td>
                      <td className="border border-white/10 px-2 py-2">ADS operation</td>
                      <td className="border border-white/10 px-2 py-2">Zs ≤ Zs max (Table 41.2-41.4)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">Adiabatic (k²S²)</td>
                      <td className="border border-white/10 px-2 py-2">Conductor thermal limit</td>
                      <td className="border border-white/10 px-2 py-2">k²S² ≥ I²t</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Lighting Calculations</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Illuminance (lux levels)</li>
                  <li className="pl-1">Uniformity ratio</li>
                  <li className="pl-1">Glare rating (UGR)</li>
                  <li className="pl-1">Emergency lighting coverage</li>
                  <li className="pl-1">Energy efficiency (LENI)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Load Assessment</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Connected load summation</li>
                  <li className="pl-1">Diversity factors applied</li>
                  <li className="pl-1">Maximum demand calculation</li>
                  <li className="pl-1">Power factor consideration</li>
                  <li className="pl-1">Future growth allowance</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Documentation:</strong> All calculations must clearly state the acceptance criteria and demonstrate compliance.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Documenting Assumptions</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">State assumptions clearly at the start of calculations</li>
                <li className="pl-1">Reference sources for assumed values</li>
                <li className="pl-1">Identify critical assumptions affecting design decisions</li>
                <li className="pl-1">Flag assumptions requiring site verification</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Software Calculation Records</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Record software name and version</li>
                <li className="pl-1">Include all input data in outputs</li>
                <li className="pl-1">Print/export complete calculation set</li>
                <li className="pl-1">Verify software is validated for purpose</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Missing assumptions</strong> - Leaving reviewers guessing the basis</li>
                <li className="pl-1"><strong>Unsigned calculations</strong> - No accountability or audit trail</li>
                <li className="pl-1"><strong>Outdated inputs</strong> - Using superseded load data or routes</li>
                <li className="pl-1"><strong>Over-reliance on software</strong> - No manual sense-checking</li>
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
                <p className="font-medium text-white mb-1">Calculation Process</p>
                <ul className="space-y-0.5">
                  <li>1. Define scope and basis</li>
                  <li>2. Document assumptions</li>
                  <li>3. Perform calculations</li>
                  <li>4. Check and verify</li>
                  <li>5. Review and approve</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Standards</p>
                <ul className="space-y-0.5">
                  <li>BS 7671 - Wiring regulations</li>
                  <li>BS EN 12464-1 - Lighting</li>
                  <li>BS 5266 - Emergency lighting</li>
                  <li>BS EN 61439 - Switchgear</li>
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
            <Link to="../h-n-c-module4-section6-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section6-5">
              Next: CDM Design Risk Register
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule4Section6_4;
