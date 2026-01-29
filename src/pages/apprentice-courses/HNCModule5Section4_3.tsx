import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Material and Equipment Approval - HNC Module 5 Section 4.3";
const DESCRIPTION = "Master material and equipment approval processes for building services: submittal registers, data sheet requirements, sample approval, mock-ups, alternative products, specification compliance, and approved status tracking.";

const quickCheckQuestions = [
  {
    id: "submittal-register",
    question: "What is the primary purpose of a submittal register?",
    options: ["To track material costs", "To log and track approval status of all submitted items", "To record installation dates", "To list subcontractor details"],
    correctIndex: 1,
    explanation: "A submittal register is a comprehensive log that tracks the approval status of all submitted materials, equipment, and documentation throughout the project lifecycle."
  },
  {
    id: "data-sheet-content",
    question: "Technical data sheets must include which essential information?",
    options: ["Only the manufacturer's address", "Performance specifications, compliance standards, and installation requirements", "Just the product price", "Marketing information only"],
    correctIndex: 1,
    explanation: "Technical data sheets must include performance specifications, relevant compliance standards (BS/EN), installation requirements, and maintenance information to verify specification compliance."
  },
  {
    id: "mock-up-purpose",
    question: "When is a mock-up typically required on a building services project?",
    options: ["For every single installation", "When quality standards need visual verification before bulk installation", "Only for residential projects", "Never required in the UK"],
    correctIndex: 1,
    explanation: "Mock-ups are required when quality standards need visual and functional verification before bulk installation proceeds, particularly for high-value or visible installations such as exposed containment or feature lighting."
  },
  {
    id: "alternative-product",
    question: "What must be demonstrated when proposing an alternative product?",
    options: ["That it is cheaper", "Equal or better performance to the specified item", "That the original is unavailable", "That the contractor prefers it"],
    correctIndex: 1,
    explanation: "Alternative products must demonstrate equal or better performance compared to the specified item, including compliance with the same standards and meeting all functional requirements."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Who typically has final authority to approve submittals on a building services project?",
    options: [
      "The installing contractor",
      "The client or their appointed representative (engineer/architect)",
      "The material supplier",
      "The site manager"
    ],
    correctAnswer: 1,
    explanation: "The client or their appointed representative (consulting engineer or architect) typically has final authority for submittal approval, as defined in the contract documents."
  },
  {
    id: 2,
    question: "What information should be included on a submittal register?",
    options: [
      "Submittal number, description, date submitted, and approval status",
      "Only the product name",
      "Just the supplier contact details",
      "Installation instructions only"
    ],
    correctAnswer: 0,
    explanation: "A submittal register should include submittal number, description, specification reference, date submitted, date required, reviewer, approval status, and any revision history."
  },
  {
    id: 3,
    question: "What does 'approved as noted' mean on a returned submittal?",
    options: [
      "Fully rejected",
      "Approved with comments that must be incorporated",
      "Approved with no changes required",
      "Resubmission required"
    ],
    correctAnswer: 1,
    explanation: "'Approved as noted' means the submittal is acceptable but comments or modifications noted by the reviewer must be incorporated before procurement or installation."
  },
  {
    id: 4,
    question: "What is the typical review period for submittals specified in most contracts?",
    options: [
      "1 day",
      "7-14 days",
      "3 months",
      "No time limit"
    ],
    correctAnswer: 1,
    explanation: "Most contracts specify a 7-14 day review period for submittals, though this can vary. Contractors should factor this into their procurement programme."
  },
  {
    id: 5,
    question: "Why are material samples required before bulk ordering?",
    options: [
      "To test durability over 10 years",
      "To verify quality, colour, and finish match specification requirements",
      "To check if the supplier is reliable",
      "For insurance purposes only"
    ],
    correctAnswer: 1,
    explanation: "Material samples verify that quality, colour, finish, and other physical characteristics match the specification requirements before committing to bulk orders."
  },
  {
    id: 6,
    question: "A contractor wishes to substitute a specified luminaire. What documentation is typically required?",
    options: [
      "Just a verbal request",
      "Comparative data sheet, photometric data, and evidence of equivalent performance",
      "Only the price difference",
      "No documentation needed"
    ],
    correctAnswer: 1,
    explanation: "Substitution requests require comparative technical data, photometric data for lighting, evidence of equivalent or better performance, and usually a completed substitution request form."
  },
  {
    id: 7,
    question: "What is the purpose of maintaining a record of approved submittals?",
    options: [
      "For future marketing purposes",
      "To provide an audit trail and reference for installation verification",
      "To compare supplier prices",
      "For recycling records only"
    ],
    correctAnswer: 1,
    explanation: "Approved submittal records provide an audit trail for quality assurance, reference during installation for verification, and documentation for handover and future maintenance."
  },
  {
    id: 8,
    question: "When should electrical containment mock-ups typically be installed?",
    options: [
      "After all containment is complete",
      "Before bulk containment installation commences",
      "During the handover phase",
      "Mock-ups are never required for containment"
    ],
    correctAnswer: 1,
    explanation: "Containment mock-ups should be installed before bulk installation commences to establish quality benchmarks, verify installation methods, and gain approval for the standard to be achieved."
  },
  {
    id: 9,
    question: "What status indicates a submittal cannot proceed without modification?",
    options: [
      "Approved",
      "Approved as noted",
      "Rejected - resubmit",
      "For information only"
    ],
    correctAnswer: 2,
    explanation: "'Rejected - resubmit' indicates the submittal does not meet specification requirements and must be revised and resubmitted before approval can be granted."
  },
  {
    id: 10,
    question: "BS 7671 compliance certificates for equipment are typically submitted as part of which process?",
    options: [
      "Tender documentation only",
      "Material and equipment submittals",
      "Final handover only",
      "Not required in the UK"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 compliance certificates and declarations of conformity are submitted as part of material and equipment submittals to verify regulatory compliance before installation."
  },
  {
    id: 11,
    question: "What is the contractor's responsibility if approved materials become unavailable?",
    options: [
      "Use any available substitute",
      "Notify the client/engineer and submit an alternative for approval",
      "Delay the project indefinitely",
      "Proceed without the material"
    ],
    correctAnswer: 1,
    explanation: "If approved materials become unavailable, the contractor must promptly notify the client or engineer and submit an alternative product for approval through the formal substitution process."
  },
  {
    id: 12,
    question: "How long should approved submittal records typically be retained?",
    options: [
      "1 week",
      "Until project completion and through the defects liability period",
      "Indefinitely with no reason",
      "Records are not required"
    ],
    correctAnswer: 1,
    explanation: "Approved submittal records should be retained through project completion and the defects liability period (typically 12-24 months), and copies provided as part of the O&M documentation."
  }
];

const faqs = [
  {
    question: "What is the difference between a submittal and a shop drawing?",
    answer: "A submittal is a broad term covering all documentation submitted for approval including product data, samples, and certifications. Shop drawings are specific detailed drawings prepared by the contractor or fabricator showing how products will be manufactured or installed. Shop drawings are a type of submittal but not all submittals are shop drawings."
  },
  {
    question: "Can work proceed while submittals are pending approval?",
    answer: "Generally, no. Installing materials before submittal approval carries significant risk as rejected items may need to be removed at the contractor's expense. However, procurement of long lead-time items may commence at contractor's risk with client notification. The contract should specify requirements."
  },
  {
    question: "How do I handle a rejected submittal with tight programme constraints?",
    answer: "First, understand the rejection reasons by clarifying with the reviewer. Address all comments comprehensively in the resubmission. Request expedited review if contractually permitted. If specification compliance is impossible, submit a formal substitution request with evidence of equivalence. Document all programme impacts for potential extension of time claims."
  },
  {
    question: "What happens if the specified product is discontinued?",
    answer: "The contractor should notify the client immediately upon discovering discontinuation. Obtain documentation from the manufacturer confirming discontinuation. Identify suitable alternatives that meet or exceed the specification. Submit a formal substitution request with comparative data. The client may issue a variation if the alternative has cost implications."
  },
  {
    question: "Are generic products acceptable if the specification names a specific manufacturer?",
    answer: "This depends on the specification wording. If the specification states 'or equal approved', generic products meeting all performance criteria may be acceptable subject to approval. If the specification states 'no substitution', only the named product is acceptable. Always seek clarification from the specifier if uncertain."
  },
  {
    question: "Who is responsible for the cost of mock-ups?",
    answer: "Mock-up costs should be addressed in the contract preliminaries. Typically, the contractor bears the cost of mock-ups as part of their quality management system. However, if mock-ups are instructed beyond those reasonably anticipated at tender, additional costs may be claimable. Mock-up areas that form part of the permanent works avoid duplicate cost."
  }
];

const HNCModule5Section4_3 = () => {
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
            <span>Module 5.4.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Material and Equipment Approval
          </h1>
          <p className="text-white/80">
            Submittal processes, sample approval, mock-up requirements, and specification compliance for building services
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Submittal register:</strong> Tracks all approval requests and status</li>
              <li className="pl-1"><strong>Data sheets:</strong> Technical compliance evidence</li>
              <li className="pl-1"><strong>Samples:</strong> Physical verification of quality</li>
              <li className="pl-1"><strong>Mock-ups:</strong> Benchmark for installation standards</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Review period:</strong> Typically 7-14 days</li>
              <li className="pl-1"><strong>Approval authority:</strong> Client's representative</li>
              <li className="pl-1"><strong>Substitutions:</strong> Require formal approval</li>
              <li className="pl-1"><strong>Records:</strong> Retained for defects period</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Establish and maintain a comprehensive submittal register",
              "Prepare technical data sheets for specification compliance",
              "Manage the sample approval process effectively",
              "Understand mock-up requirements for quality benchmarking",
              "Process alternative product and substitution requests",
              "Track approved status and maintain audit trails"
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

        {/* Section 1: Submittal Register and Process */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Submittal Register and Process
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The submittal register is the cornerstone of material and equipment approval management. It provides
              a comprehensive log of all items requiring approval, their current status, and a complete audit trail
              throughout the project lifecycle.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Submittal Register Contents:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Unique reference number:</strong> Sequential numbering system (e.g., SUB-E-001)</li>
                <li className="pl-1"><strong>Specification clause:</strong> Reference to relevant specification section</li>
                <li className="pl-1"><strong>Description:</strong> Clear description of material or equipment</li>
                <li className="pl-1"><strong>Submission date:</strong> Date submittal was issued for review</li>
                <li className="pl-1"><strong>Required date:</strong> Date approval is needed for procurement</li>
                <li className="pl-1"><strong>Revision number:</strong> Track resubmissions (Rev A, B, C)</li>
                <li className="pl-1"><strong>Status:</strong> Current approval status</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Approval Status Categories</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Status</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Meaning</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Action Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-green-400">Approved</td>
                      <td className="border border-white/10 px-3 py-2">Fully compliant, no changes</td>
                      <td className="border border-white/10 px-3 py-2">Proceed with procurement</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-yellow-400">Approved as Noted</td>
                      <td className="border border-white/10 px-3 py-2">Acceptable with comments</td>
                      <td className="border border-white/10 px-3 py-2">Incorporate comments, then proceed</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-orange-400">Revise and Resubmit</td>
                      <td className="border border-white/10 px-3 py-2">Changes required</td>
                      <td className="border border-white/10 px-3 py-2">Address comments, resubmit</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-red-400">Rejected</td>
                      <td className="border border-white/10 px-3 py-2">Does not meet specification</td>
                      <td className="border border-white/10 px-3 py-2">Submit compliant alternative</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-blue-400">For Information</td>
                      <td className="border border-white/10 px-3 py-2">No approval required</td>
                      <td className="border border-white/10 px-3 py-2">File for record</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Programme impact:</strong> Allow 7-14 days for review. Factor submittal approval into procurement lead times.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Technical Data Sheets and Documentation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Technical Data Sheets and Documentation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Technical data sheets form the documentary evidence that proposed materials and equipment
              comply with specification requirements. Complete and accurate documentation is essential
              for efficient review and approval.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Electrical Equipment Data</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Rated voltage and current</li>
                  <li className="pl-1">IP rating (ingress protection)</li>
                  <li className="pl-1">Fault rating (kA)</li>
                  <li className="pl-1">Operating temperature range</li>
                  <li className="pl-1">Compliance certifications (BS/EN)</li>
                  <li className="pl-1">CE/UKCA marking documentation</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Luminaire Data</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Photometric data (IES/LDT files)</li>
                  <li className="pl-1">Lumen output and efficacy</li>
                  <li className="pl-1">Colour temperature (CCT)</li>
                  <li className="pl-1">Colour rendering index (CRI)</li>
                  <li className="pl-1">Emergency conversion options</li>
                  <li className="pl-1">DALI/control compatibility</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Required Submittal Documentation</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Document Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Purpose</th>
                      <th className="border border-white/10 px-3 py-2 text-left">When Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Product data sheet</td>
                      <td className="border border-white/10 px-3 py-2">Technical specifications</td>
                      <td className="border border-white/10 px-3 py-2">All equipment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Declaration of conformity</td>
                      <td className="border border-white/10 px-3 py-2">Regulatory compliance</td>
                      <td className="border border-white/10 px-3 py-2">All CE/UKCA marked items</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Test certificates</td>
                      <td className="border border-white/10 px-3 py-2">Third-party verification</td>
                      <td className="border border-white/10 px-3 py-2">Switchgear, cables, containment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Installation instructions</td>
                      <td className="border border-white/10 px-3 py-2">Correct installation method</td>
                      <td className="border border-white/10 px-3 py-2">All equipment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Maintenance schedule</td>
                      <td className="border border-white/10 px-3 py-2">Lifecycle requirements</td>
                      <td className="border border-white/10 px-3 py-2">Major plant items</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Warranty terms</td>
                      <td className="border border-white/10 px-3 py-2">Guarantee conditions</td>
                      <td className="border border-white/10 px-3 py-2">As specified</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Compile all documentation into a single PDF with clear indexing. Highlight specification compliance on each data sheet.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Sample Approval and Mock-ups */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Sample Approval and Mock-ups
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Physical samples and mock-up installations provide tangible verification of quality standards
              that cannot be fully assessed from documentation alone. They establish the benchmark against
              which all subsequent work will be measured.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Sample Approval Process</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Step 1:</strong> Submit sample with data sheet and specification reference</li>
                <li className="pl-1"><strong>Step 2:</strong> Client/engineer inspects for colour, finish, and quality</li>
                <li className="pl-1"><strong>Step 3:</strong> Written approval or comments issued</li>
                <li className="pl-1"><strong>Step 4:</strong> Approved sample retained as project benchmark</li>
                <li className="pl-1"><strong>Step 5:</strong> Delivered materials compared against approved sample</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Mock-up Requirements</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Cable Containment</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>3m minimum run of each type</li>
                    <li>Include bends, tees, and crossings</li>
                    <li>Earthing bonding connections</li>
                    <li>Support bracket spacing</li>
                    <li>Lid and cover alignment</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Feature Lighting</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Full luminaire with trim/bezel</li>
                    <li>Ceiling integration detail</li>
                    <li>Light output demonstration</li>
                    <li>Control dimming range</li>
                    <li>Emergency function (if applicable)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Mock-up Approval Checklist</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Location:</strong> Representative of final installation conditions</li>
                <li className="pl-1"><strong>Coordination:</strong> Other trades' interfaces included</li>
                <li className="pl-1"><strong>Documentation:</strong> Photographic record before and after approval</li>
                <li className="pl-1"><strong>Sign-off:</strong> Written approval from client representative</li>
                <li className="pl-1"><strong>Retention:</strong> Mock-up retained until bulk installation accepted</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Commercial consideration:</strong> Where mock-ups form part of the permanent works, coordinate location to avoid abortive work and double handling.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Alternative Products and Specification Compliance */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Alternative Products and Specification Compliance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When specified products are unavailable or the contractor wishes to propose alternatives,
              a formal substitution process ensures that replacement items meet or exceed the original
              specification requirements.
            </p>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Substitution Request Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Reason for substitution (cost, availability, improved performance)</li>
                <li className="pl-1">Side-by-side comparison of technical specifications</li>
                <li className="pl-1">Evidence of equal or better performance</li>
                <li className="pl-1">Compliance with same standards and regulations</li>
                <li className="pl-1">Impact on warranties and guarantees</li>
                <li className="pl-1">Cost implication (saving or additional)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Specification Compliance Verification</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Parameter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Specified</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Proposed</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Compliance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">IP rating</td>
                      <td className="border border-white/10 px-3 py-2">IP65</td>
                      <td className="border border-white/10 px-3 py-2">IP66</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">Exceeds</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lumen output</td>
                      <td className="border border-white/10 px-3 py-2">3000lm</td>
                      <td className="border border-white/10 px-3 py-2">3100lm</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">Exceeds</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Colour temp</td>
                      <td className="border border-white/10 px-3 py-2">4000K</td>
                      <td className="border border-white/10 px-3 py-2">4000K</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">Meets</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">CRI</td>
                      <td className="border border-white/10 px-3 py-2">{">"}90</td>
                      <td className="border border-white/10 px-3 py-2">85</td>
                      <td className="border border-white/10 px-3 py-2 text-red-400">Below spec</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Warranty</td>
                      <td className="border border-white/10 px-3 py-2">5 years</td>
                      <td className="border border-white/10 px-3 py-2">5 years</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">Meets</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/60 mt-2">Example comparison table - CRI below specification would likely result in rejection</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Approved Status Tracking</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Approved products list:</strong> Maintained and updated throughout project</li>
                <li className="pl-1"><strong>Distribution:</strong> Issued to procurement, site teams, and QA manager</li>
                <li className="pl-1"><strong>Goods receipt:</strong> Check delivered materials against approved list</li>
                <li className="pl-1"><strong>Traceability:</strong> Retain batch numbers and delivery records</li>
                <li className="pl-1"><strong>Change control:</strong> Any changes require re-approval process</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> Never install materials without prior approval. The cost of removal always exceeds the cost of waiting for approval.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Managing a Rejected Submittal</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Cable tray submittal rejected - specified perforated base but submitted solid base.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>1. Review rejection comments carefully</p>
                <p>2. Identify correct product from same manufacturer (perforated variant)</p>
                <p>3. Prepare revised submittal (Rev B) with correct data sheet</p>
                <p className="mt-2">Submittal cover sheet notes:</p>
                <p className="text-white/60">"Resubmission addressing rejection comments.</p>
                <p className="text-white/60">Now submitting perforated cable tray per specification</p>
                <p className="text-white/60">clause 5.2.3. See highlighted compliance on data sheet."</p>
                <p className="mt-2 text-green-400">→ Submit within 3 working days to maintain programme</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Substitution Request</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Specified distribution board has 16-week lead time; alternative available in 4 weeks.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Substitution Request Form:</p>
                <p className="mt-2"><span className="text-white/60">Specified:</span> Manufacturer A, Type DB-250</p>
                <p><span className="text-white/60">Proposed:</span> Manufacturer B, Type PowerBoard-250</p>
                <p><span className="text-white/60">Reason:</span> Lead time reduction (16 weeks to 4 weeks)</p>
                <p className="mt-2">Technical comparison attached showing:</p>
                <p>- Same fault rating (25kA)</p>
                <p>- Same IP rating (IP41)</p>
                <p>- Compatible outgoing ways</p>
                <p>- Both BS EN 61439 compliant</p>
                <p className="mt-2"><span className="text-white/60">Cost impact:</span> +£450 per board (6 boards = £2,700)</p>
                <p className="mt-2 text-green-400">→ Submit with programme showing critical path impact</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Mock-up Coordination</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Exposed stainless steel containment in reception area requires mock-up approval.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Mock-up scope:</p>
                <p>- 4m straight run with support brackets at 1.2m centres</p>
                <p>- One 90° bend with radius piece</p>
                <p>- One tee junction</p>
                <p>- Earth bonding at each joint</p>
                <p className="mt-2">Location: Plant room corridor (not visible in final scheme)</p>
                <p className="mt-2">Witness inspection:</p>
                <p>- Architect: finish and alignment</p>
                <p>- M&E Engineer: technical compliance</p>
                <p>- Client: overall acceptance</p>
                <p className="mt-2 text-green-400">→ Photograph and file approval signatures before bulk install</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Submittal Preparation Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Reference the specification clause requiring the submittal</li>
                <li className="pl-1">Include complete product data sheets (not just brochures)</li>
                <li className="pl-1">Highlight compliance with each specification requirement</li>
                <li className="pl-1">Attach all relevant certificates and test reports</li>
                <li className="pl-1">Include installation and maintenance information</li>
                <li className="pl-1">Submit as searchable PDF with clear indexing</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Review period: <strong>7-14 days</strong> (check contract)</li>
                <li className="pl-1">Resubmission target: <strong>3-5 working days</strong></li>
                <li className="pl-1">Sample retention: <strong>Until bulk installation accepted</strong></li>
                <li className="pl-1">Record retention: <strong>Through defects liability period</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Submitting marketing brochures</strong> — Use technical data sheets</li>
                <li className="pl-1"><strong>Not referencing specification</strong> — Always cite the clause</li>
                <li className="pl-1"><strong>Installing before approval</strong> — Risk of costly removal</li>
                <li className="pl-1"><strong>Ignoring approval conditions</strong> — 'Approved as noted' means action required</li>
                <li className="pl-1"><strong>Poor record keeping</strong> — Maintain complete audit trail</li>
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
                <p className="font-medium text-white mb-1">Submittal Process</p>
                <ul className="space-y-0.5">
                  <li>Maintain comprehensive submittal register</li>
                  <li>Include spec reference and compliance evidence</li>
                  <li>Allow 7-14 days for review</li>
                  <li>Track status and revision history</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Samples and Mock-ups</p>
                <ul className="space-y-0.5">
                  <li>Physical verification of quality standards</li>
                  <li>Written approval required before bulk install</li>
                  <li>Retain as benchmark throughout project</li>
                  <li>Photograph and document approval</li>
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
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module5-section4-4">
              Next: Testing and Commissioning
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule5Section4_3;
