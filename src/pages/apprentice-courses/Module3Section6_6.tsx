import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  Shield,
  AlertTriangle,
  Settings,
  CheckSquare,
} from "lucide-react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE =
  "Following Manufacturer Instructions and Site Specs - Module 3.6.6 | Level 2 Electrical Course";
const DESCRIPTION =
  "Critical importance of following manufacturer instructions and site specifications for safe, compliant electrical installations. Legal requirements, warranties and best practices.";

// Quiz (8 questions)
const quizQuestions = [
  {
    id: 1,
    question: "What regulation requires following manufacturer's installation instructions?",
    options: ["BS 5839", "BS 7671", "BS 5266", "ISO 9001"],
    correctAnswer: 1,
    explanation:
      "BS 7671 explicitly requires adherence to manufacturer's instructions as part of safe installation practice.",
  },
  {
    id: 2,
    question: "True or False: Site specifications can require higher standards than BS 7671.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "Site specifications can exceed BS 7671 minimum requirements but cannot permit anything that would be unsafe or non-compliant.",
  },
  {
    id: 3,
    question: "Name one reason warranties may be voided.",
    options: [
      "Installing outside manufacturer's stated parameters",
      "Using approved cable types",
      "Following BS 7671 requirements",
      "Proper earthing connections",
    ],
    correctAnswer: 0,
    explanation:
      "Installing equipment outside manufacturer's specified parameters typically voids warranty coverage and may create safety risks.",
  },
  {
    id: 4,
    question: "Which document details preferred brands and finishes for a project?",
    options: [
      "Manufacturer manual",
      "BS 7671",
      "Site specification",
      "NICEIC logbook",
    ],
    correctAnswer: 2,
    explanation:
      "Site specifications detail project-specific requirements including preferred brands, finishes, and installation methods.",
  },
  {
    id: 5,
    question: "Why should you record any deviation from installation instructions?",
    options: [
      "For fun",
      "For accountability, inspection approval, and warranty protection",
      "To increase project costs",
      "To confuse inspectors",
    ],
    correctAnswer: 1,
    explanation:
      "Recording deviations provides accountability, enables inspection approval, and protects warranty coverage by documenting approved variations.",
  },
  {
    id: 6,
    question: "What is the safest approach if site specs and manufacturer instructions differ?",
    options: [
      "Ignore both",
      "Follow site specs only",
      "Follow the most stringent requirement and seek clarification",
      "Choose randomly",
    ],
    correctAnswer: 2,
    explanation:
      "Always follow the most stringent requirement while seeking clarification from relevant parties to resolve conflicts safely.",
  },
  {
    id: 7,
    question: "Give one example of a site-specific requirement.",
    options: [
      "Basic cable sizing",
      "Specified cable brand, containment type, or colour coding",
      "Standard BS 7671 compliance",
      "Generic installation methods",
    ],
    correctAnswer: 1,
    explanation:
      "Site specifications commonly detail specific brands, containment systems, colour coding schemes, and installation finishes.",
  },
  {
    id: 8,
    question: "What is one consequence of failing to follow site specs on a commercial job?",
    options: [
      "Improved efficiency",
      "Project delay, failed inspection, or contract breach",
      "Cost savings",
      "Enhanced safety",
    ],
    correctAnswer: 1,
    explanation:
      "Failing to follow site specifications can result in project delays, failed inspections, contract breaches, and potential legal consequences.",
  },
];

// Inline knowledge checks
const quickCheckQuestions = [
  {
    id: "torque-settings",
    question: "Why do manufacturers provide specific torque settings for terminations?",
    options: [
      "To increase installation time",
      "To ensure optimal connection integrity and prevent overheating",
      "To sell more tools",
      "For cosmetic purposes only",
    ],
    correctIndex: 1,
    explanation:
      "Specific torque settings ensure proper connection integrity, prevent overheating from loose connections, and avoid damage from overtightening.",
  },
  {
    id: "site-specs-vs-bs7671",
    question: "What is the main difference between site specifications and BS 7671?",
    options: [
      "They are identical",
      "Site specs are project-specific requirements that may exceed BS 7671 minimums",
      "Site specs replace BS 7671",
      "BS 7671 is optional",
    ],
    correctIndex: 1,
    explanation:
      "Site specifications are project-specific requirements that often exceed BS 7671 minimum standards but cannot permit non-compliance with safety regulations.",
  },
  {
    id: "ignoring-instructions",
    question: "Give one potential consequence of ignoring manufacturer instructions.",
    options: [
      "Improved performance",
      "Voided warranty, unsafe operation, or compliance failure",
      "Cost savings",
      "Faster installation",
    ],
    correctIndex: 1,
    explanation:
      "Ignoring manufacturer instructions can void warranties, create unsafe conditions, cause compliance failures, and result in legal liability.",
  },
];

export default function Module3Section6_6() {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[#1a1a1a] overflow-x-hidden">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button
            variant="ghost"
            className="min-h-[44px] touch-manipulation active:scale-[0.98] text-white hover:text-white active:text-white p-0 -ml-1"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3.6
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <header className="mb-6 sm:mb-8 text-center">
          <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/30 mb-4">
            <span className="text-elec-yellow text-sm font-medium">Module 3.6.6</span>
          </div>
          <div className="flex justify-center mb-4">
            <div className="p-2 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Following Manufacturer Instructions and Site Specs
          </h1>
          <p className="text-white">
            Critical compliance requirements for following manufacturer instructions and site specifications alongside BS 7671 for safe, warranty-compliant electrical installations.
          </p>
        </header>

        {/* Introduction */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Introduction
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-2 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Manufacturer instructions are mandatory under BS 7671 and contractual obligations.</li>
                <li>Ignoring instructions voids warranties and creates safety and legal liabilities.</li>
                <li>Site specifications add project-specific requirements beyond regulatory minimums.</li>
                <li>Always follow the most stringent requirement when multiple standards apply.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-2 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Missing manuals, ignored torque specs, non-compliant mounting, warranty voids.</li>
                <li><strong>Use:</strong> Latest manuals, specified tools, approved sequences, documented approvals.</li>
                <li><strong>Check:</strong> Instruction compliance, site spec alignment, warranty validity, deviation records.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Learning Outcomes */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Learning Outcomes
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-white">
            <li>Understand the legal and contractual importance of following manufacturer installation instructions.</li>
            <li>Identify sources and interpret manufacturer guidance for electrical equipment.</li>
            <li>Distinguish between regulatory requirements and site-specific specifications.</li>
            <li>Apply integrated compliance approach using standards, instructions and site specifications.</li>
            <li>Recognise and mitigate consequences of non-compliance with instructions and specifications.</li>
          </ul>
        </section>

        {/* Content */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Content / Learning
          </h2>

          {/* 1. Legal and Safety Imperatives for Following Instructions */}
          <div className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5" /> 1. Legal and Safety Imperatives for Following Instructions
            </h3>

            <div className="mb-6">
              <h4 className="font-medium text-white mb-3">Regulatory and Legal Framework</h4>
              <div className="p-4 bg-transparent border border-border/30 rounded-lg mb-4">
                <h5 className="font-medium text-elec-yellow mb-3">Statutory Requirements and Liability</h5>
                <p className="text-xs sm:text-sm text-white mb-3">
                  <strong>Legal Foundation:</strong> Manufacturer instructions form part of the legal framework for electrical safety. BS 7671 explicitly requires adherence to manufacturer's instructions, making them legally binding rather than advisory. Failure to comply creates criminal and civil liability under multiple statutory instruments.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium text-white mb-2">Statutory Obligations</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Health and Safety at Work Act 1974:</strong> Duty of care obligations</li>
                      <li>• <strong>Electricity at Work Regulations 1989:</strong> Systems to prevent danger</li>
                      <li>• <strong>BS 7671 Regulation 134.1.1:</strong> Equipment selection per manufacturer specs</li>
                      <li>• <strong>Construction (Design and Management) Regulations:</strong> Competent installation</li>
                      <li>• <strong>Consumer Rights Act 2015:</strong> Goods to be as described and fit for purpose</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-white mb-2">Legal Consequences</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Criminal prosecution:</strong> HSE enforcement for unsafe systems</li>
                      <li>• <strong>Civil liability:</strong> Damages for injury/property loss</li>
                      <li>• <strong>Professional sanctions:</strong> Loss of competent person status</li>
                      <li>• <strong>Insurance voidance:</strong> Non-compliant installation exclusions</li>
                      <li>• <strong>Contract breach:</strong> Failure to meet specification requirements</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-transparent border border-amber-400/30 rounded-lg mb-4">
                <h5 className="font-medium text-amber-400 mb-3">Safety Engineering Principles</h5>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-white/10 text-sm">
                    <thead>
                      <tr className="">
                        <th className="border border-white/10 p-3 text-left">Safety Parameter</th>
                        <th className="border border-white/10 p-3 text-left">Manufacturer Testing</th>
                        <th className="border border-white/10 p-3 text-left">Installation Impact</th>
                        <th className="border border-white/10 p-3 text-left">Failure Consequence</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-white/10 p-3">Thermal performance</td>
                        <td className="border border-white/10 p-3">Heat rise testing under defined conditions</td>
                        <td className="border border-white/10 p-3">Ventilation, derating, ambient limits</td>
                        <td className="border border-white/10 p-3">Overheating, fire risk, component failure</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-white/10 p-3">Mechanical strength</td>
                        <td className="border border-white/10 p-3">Load testing, vibration, shock</td>
                        <td className="border border-white/10 p-3">Support requirements, fixing methods</td>
                        <td className="border border-white/10 p-3">Structural failure, conductor damage</td>
                      </tr>
                      <tr>
                        <td className="border border-white/10 p-3">Environmental sealing</td>
                        <td className="border border-white/10 p-3">IP testing, chemical resistance</td>
                        <td className="border border-white/10 p-3">Gasket compression, entry protection</td>
                        <td className="border border-white/10 p-3">Ingress, corrosion, insulation failure</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-white/10 p-3">Electrical performance</td>
                        <td className="border border-white/10 p-3">Dielectric testing, current capacity</td>
                        <td className="border border-white/10 p-3">Torque values, conductor termination</td>
                        <td className="border border-white/10 p-3">Arcing, tracking, overcurrent damage</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-4 bg-transparent border border-cyan-400/30 rounded-lg">
                <h5 className="font-medium text-cyan-400 mb-3">Warranty and Insurance Implications</h5>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium text-white mb-2">Warranty Voidance Triggers</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Installation outside parameters:</strong> Environmental limits exceeded</li>
                      <li>• <strong>Incorrect tool usage:</strong> Non-specified torque or connections</li>
                      <li>• <strong>Mounting deviations:</strong> Orientation or support modifications</li>
                      <li>• <strong>Modified products:</strong> Unauthorised alterations or adaptations</li>
                      <li>• <strong>Incompatible integration:</strong> Use with non-approved accessories</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-white mb-2">Insurance Risk Factors</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Policy exclusions:</strong> Non-compliant installation coverage gaps</li>
                      <li>• <strong>Premium increases:</strong> Risk assessment impact of poor practices</li>
                      <li>• <strong>Claim rejection:</strong> Failure to follow instructions as contributory factor</li>
                      <li>• <strong>Professional indemnity:</strong> Competence demonstration requirements</li>
                      <li>• <strong>Product liability:</strong> Shared responsibility with manufacturers</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[0]} />
          <div className="my-6 border-t border-white/10" />

          {/* 2. Manufacturer Documentation and Information Sources */}
          <div className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Settings className="w-5 h-5" /> 2. Manufacturer Documentation and Information Sources
            </h3>

            <div className="mb-6">
              <h4 className="font-medium text-white mb-3">Comprehensive Documentation Ecosystem</h4>
              <div className="p-4 bg-transparent border border-border/30 rounded-lg mb-4">
                <h5 className="font-medium text-elec-yellow mb-3">Information Hierarchy and Sources</h5>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium text-white mb-2">Primary Documentation</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Installation manuals:</strong> Step-by-step procedures and requirements</li>
                      <li>• <strong>Technical data sheets:</strong> Performance parameters and limitations</li>
                      <li>• <strong>Wiring diagrams:</strong> Connection requirements and termination details</li>
                      <li>• <strong>Dimensional drawings:</strong> Mounting requirements and clearances</li>
                      <li>• <strong>Certification documents:</strong> Test reports and compliance declarations</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-white mb-2">Supporting Information</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Application notes:</strong> Specific use case guidance</li>
                      <li>• <strong>Compatibility matrices:</strong> Approved combinations and accessories</li>
                      <li>• <strong>Troubleshooting guides:</strong> Fault diagnosis and resolution</li>
                      <li>• <strong>Software/firmware:</strong> Programming and configuration requirements</li>
                      <li>• <strong>Training materials:</strong> Installation and commissioning procedures</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-transparent border border-green-400/30 rounded-lg mb-4">
                <h5 className="font-medium text-green-400 mb-3">Critical Installation Parameters</h5>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-white/10 text-sm">
                    <thead>
                      <tr className="">
                        <th className="border border-white/10 p-3 text-left">Parameter Category</th>
                        <th className="border border-white/10 p-3 text-left">Typical Specifications</th>
                        <th className="border border-white/10 p-3 text-left">Tolerance Limits</th>
                        <th className="border border-white/10 p-3 text-left">Verification Method</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-white/10 p-3"><strong>Cable termination</strong></td>
                        <td className="border border-white/10 p-3">Torque values, conductor size range, preparation length</td>
                        <td className="border border-white/10 p-3">±10% torque, exact AWG/mm² range</td>
                        <td className="border border-white/10 p-3">Calibrated torque wrench, measurement</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-white/10 p-3"><strong>Environmental limits</strong></td>
                        <td className="border border-white/10 p-3">Operating temperature, humidity, altitude</td>
                        <td className="border border-white/10 p-3">Absolute limits, no tolerance</td>
                        <td className="border border-white/10 p-3">Environmental monitoring, site survey</td>
                      </tr>
                      <tr>
                        <td className="border border-white/10 p-3"><strong>Mounting orientation</strong></td>
                        <td className="border border-white/10 p-3">Vertical/horizontal restrictions, cooling requirements</td>
                        <td className="border border-white/10 p-3">±5° typically, specific ventilation clearances</td>
                        <td className="border border-white/10 p-3">Spirit level, clearance measurement</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-white/10 p-3"><strong>Integration requirements</strong></td>
                        <td className="border border-white/10 p-3">Compatible accessories, communication protocols</td>
                        <td className="border border-white/10 p-3">Approved lists only, version compatibility</td>
                        <td className="border border-white/10 p-3">Compatibility matrix check, testing</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-4 bg-transparent border border-border/30 rounded-lg">
                <h5 className="font-medium text-elec-yellow mb-3">Information Access and Version Control</h5>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium text-white mb-2">Access Methods</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Manufacturer websites:</strong> Latest versions, downloadable PDFs</li>
                      <li>• <strong>Technical support:</strong> Direct clarification and application guidance</li>
                      <li>• <strong>Training centres:</strong> Hands-on instruction and certification</li>
                      <li>• <strong>Mobile apps:</strong> On-site access to instructions and calculators</li>
                      <li>• <strong>Distributor resources:</strong> Local support and technical assistance</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-white mb-2">Version Control Best Practices</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Regular updates:</strong> Check for latest versions before each project</li>
                      <li>• <strong>Revision tracking:</strong> Maintain records of document versions used</li>
                      <li>• <strong>Change notifications:</strong> Subscribe to manufacturer update services</li>
                      <li>• <strong>Archive management:</strong> Keep installation-specific versions on file</li>
                      <li>• <strong>Team distribution:</strong> Ensure all team members have current versions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[1]} />
          <div className="my-6 border-t border-white/10" />

          {/* 3. Site Specifications and Project Requirements */}
          <div className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" /> 3. Site Specifications and Project Requirements
            </h3>

            <div className="mb-6">
              <h4 className="font-medium text-white mb-3">Understanding Project-Specific Requirements</h4>
              <div className="p-4 bg-transparent border border-amber-400/30 rounded-lg mb-4">
                <h5 className="font-medium text-amber-400 mb-3">Site Specification Hierarchy and Sources</h5>
                <p className="text-xs sm:text-sm text-white mb-3">
                  <strong>Specification Framework:</strong> Site specifications represent the project's specific requirements that often exceed regulatory minimums. They form contractual obligations and must be clearly understood and implemented alongside manufacturer instructions and BS 7671 requirements.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-white/10 text-sm">
                    <thead>
                      <tr className="">
                        <th className="border border-white/10 p-3 text-left">Document Type</th>
                        <th className="border border-white/10 p-3 text-left">Typical Content</th>
                        <th className="border border-white/10 p-3 text-left">Authority Level</th>
                        <th className="border border-white/10 p-3 text-left">Compliance Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-white/10 p-3"><strong>Architectural specifications</strong></td>
                        <td className="border border-white/10 p-3">Aesthetic requirements, finishes, integration</td>
                        <td className="border border-white/10 p-3">Client/architect directive</td>
                        <td className="border border-white/10 p-3">Contractually binding</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-white/10 p-3"><strong>Electrical design specs</strong></td>
                        <td className="border border-white/10 p-3">Cable types, containment, protection methods</td>
                        <td className="border border-white/10 p-3">Design engineer directive</td>
                        <td className="border border-white/10 p-3">Technically and contractually binding</td>
                      </tr>
                      <tr>
                        <td className="border border-white/10 p-3"><strong>Client requirements</strong></td>
                        <td className="border border-white/10 p-3">Preferred brands, maintenance access, documentation</td>
                        <td className="border border-white/10 p-3">End user preference</td>
                        <td className="border border-white/10 p-3">Commercial obligation</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-white/10 p-3"><strong>Main contractor specs</strong></td>
                        <td className="border border-white/10 p-3">Work sequences, coordination, quality standards</td>
                        <td className="border border-white/10 p-3">Project management directive</td>
                        <td className="border border-white/10 p-3">Contractual and programme binding</td>
                      </tr>
                      <tr>
                        <td className="border border-white/10 p-3"><strong>Health & safety specs</strong></td>
                        <td className="border border-white/10 p-3">Site-specific safety measures, access restrictions</td>
                        <td className="border border-white/10 p-3">Safety management directive</td>
                        <td className="border border-white/10 p-3">Legally and contractually binding</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-4 bg-transparent border border-border/30 rounded-lg mb-4">
                <h5 className="font-medium text-elec-yellow mb-3">Common Site Specification Requirements</h5>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium text-white mb-2">Material and Equipment Specifications</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Approved manufacturer lists:</strong> Specific brands/models only</li>
                      <li>• <strong>Cable specifications:</strong> Fire performance, low smoke variants</li>
                      <li>• <strong>Containment systems:</strong> Material type, finish, fixing methods</li>
                      <li>• <strong>Protection devices:</strong> Specific characteristics and settings</li>
                      <li>• <strong>Earthing systems:</strong> Enhanced requirements beyond BS 7671</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-white mb-2">Installation and Quality Requirements</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Installation routes:</strong> Specific paths and containment locations</li>
                      <li>• <strong>Labelling standards:</strong> Format, content, durability requirements</li>
                      <li>• <strong>Testing protocols:</strong> Enhanced testing beyond minimum requirements</li>
                      <li>• <strong>Documentation standards:</strong> Specific formats and submission requirements</li>
                      <li>• <strong>Access requirements:</strong> Maintenance access and operating clearances</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-transparent border border-green-400/30 rounded-lg">
                <h5 className="font-medium text-green-400 mb-3">Specification Conflict Resolution</h5>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium text-white mb-2">Resolution Hierarchy</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Safety first:</strong> No specification can compromise safety requirements</li>
                      <li>• <strong>Regulatory compliance:</strong> BS 7671 minimum standards must be met</li>
                      <li>• <strong>Manufacturer limits:</strong> Cannot exceed equipment design parameters</li>
                      <li>• <strong>Most stringent rule:</strong> Apply highest standard when conflicts arise</li>
                      <li>• <strong>Written clarification:</strong> Document all resolution decisions</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-white mb-2">Stakeholder Communication</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Early identification:</strong> Flag conflicts during design review</li>
                      <li>• <strong>Technical discussions:</strong> Engineer/manufacturer/client meetings</li>
                      <li>• <strong>Alternative proposals:</strong> Present compliant solutions</li>
                      <li>• <strong>Formal approvals:</strong> Obtain written sign-off for changes</li>
                      <li>• <strong>Change control:</strong> Document specification modifications</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[2]} />
          <div className="my-6 border-t border-white/10" />

          {/* 4. Integration and Best Practice Implementation */}
          <div className="mb-2">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <CheckSquare className="w-5 h-5" /> 4. Integration and Best Practice Implementation
            </h3>

            <div className="mb-6">
              <h4 className="font-medium text-white mb-3">Systematic Compliance Approach</h4>
              <div className="p-4 bg-transparent border border-border/30 rounded-lg mb-4">
                <h5 className="font-medium text-elec-yellow mb-3">Four-Step Compliance Framework</h5>
                <div className="space-y-4">
                  <div className="p-3 border border-white/10 rounded-lg">
                    <h6 className="font-medium text-white mb-2">Step 1: Regulatory Foundation Review</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• Confirm BS 7671 requirements applicable to the installation</li>
                      <li>• Check Building Regulations and other statutory requirements</li>
                      <li>• Verify special location requirements (e.g., bathrooms, medical locations)</li>
                      <li>• Confirm competent person scheme obligations</li>
                    </ul>
                  </div>
                  <div className="p-3 border border-white/10 rounded-lg bg-muted/5">
                    <h6 className="font-medium text-white mb-2">Step 2: Manufacturer Instruction Integration</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• Obtain latest version of all relevant manufacturer documentation</li>
                      <li>• Cross-reference regulatory requirements with manufacturer specifications</li>
                      <li>• Identify any conflicts or areas requiring clarification</li>
                      <li>• Confirm tool requirements and installation sequences</li>
                    </ul>
                  </div>
                  <div className="p-3 border border-white/10 rounded-lg">
                    <h6 className="font-medium text-white mb-2">Step 3: Site Specification Application</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• Review all project-specific requirements and standards</li>
                      <li>• Identify requirements that exceed regulatory/manufacturer minimums</li>
                      <li>• Flag any conflicts between different specification sources</li>
                      <li>• Develop installation methodology incorporating all requirements</li>
                    </ul>
                  </div>
                  <div className="p-3 border border-white/10 rounded-lg bg-muted/5">
                    <h6 className="font-medium text-white mb-2">Step 4: Implementation and Documentation</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• Apply most stringent requirements throughout installation</li>
                      <li>• Document any approved deviations with written authorization</li>
                      <li>• Maintain installation records linking to specific requirements</li>
                      <li>• Conduct compliance verification and testing protocols</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-transparent border border-border/30 rounded-lg">
                <h5 className="font-medium text-elec-yellow mb-3">Risk Management and Quality Assurance</h5>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium text-white mb-2">Risk Mitigation Strategies</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Pre-installation review:</strong> Comprehensive documentation analysis</li>
                      <li>• <strong>Tool calibration:</strong> Ensure measurement accuracy for critical parameters</li>
                      <li>• <strong>Stage inspections:</strong> Progressive compliance verification</li>
                      <li>• <strong>Photographic records:</strong> Document installation methodology</li>
                      <li>• <strong>Training verification:</strong> Confirm competence for specific equipment</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-white mb-2">Quality Assurance Processes</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Installation checklists:</strong> Systematic verification of requirements</li>
                      <li>• <strong>Independent review:</strong> Third-party compliance verification</li>
                      <li>• <strong>Test protocols:</strong> Comprehensive commissioning procedures</li>
                      <li>• <strong>Documentation packages:</strong> Complete compliance records</li>
                      <li>• <strong>Handover procedures:</strong> Client education and warranty protection</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Real-World Example */}
          <div className="mt-6 p-4 bg-transparent border-l-2 border-elec-yellow rounded-lg border border-white/10">
            <h5 className="font-medium text-elec-yellow mb-2">Real-World Example</h5>
            <p className="text-xs sm:text-sm text-white">
              A contractor installed a high-integrity consumer unit without following the manufacturer's specific torque settings for busbar terminals. Six months later, loose connections caused overheating, arcing, and eventual failure of the main switch. The manufacturer rejected the warranty claim because installation records showed non-compliance with their specified 25Nm torque requirement. The contractor faced £15,000 in replacement costs, project delays, and potential legal action from the client.
            </p>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-transparent border border-white/10 rounded-lg">
              <h3 className="font-medium text-white mb-2">Q: Can site specifications override BS 7671 requirements?</h3>
              <p className="text-xs sm:text-sm text-white">
                A: No — site specifications can exceed BS 7671 requirements but cannot permit anything that would be unsafe or non-compliant with regulatory minimums.
              </p>
            </div>
            <div className="p-4 bg-transparent border border-white/10 rounded-lg">
              <h3 className="font-medium text-white mb-2">Q: What should I do if manufacturer instructions conflict with BS 7671?</h3>
              <p className="text-xs sm:text-sm text-white">
                A: Follow BS 7671 as the minimum legal requirement and seek immediate clarification from both the manufacturer and the design engineer. Document all communications and obtain written approval for any variations.
              </p>
            </div>
            <div className="p-4 bg-transparent border border-white/10 rounded-lg">
              <h3 className="font-medium text-white mb-2">Q: Do all products need to be installed exactly as per the manual?</h3>
              <p className="text-xs sm:text-sm text-white">
                A: Yes — unless you have written confirmation from the manufacturer approving an alternative method that maintains safety and performance standards.
              </p>
            </div>
            <div className="p-4 bg-transparent border border-white/10 rounded-lg">
              <h3 className="font-medium text-white mb-2">Q: Who is liable if I follow site specs that later prove inadequate?</h3>
              <p className="text-xs sm:text-sm text-white">
                A: Liability is shared — you have a duty to highlight safety concerns even when following specifications. Always document concerns and seek written clarification from specifiers.
              </p>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Summary
          </h2>
          <div className="p-4 bg-transparent border-l-2 border-elec-yellow rounded-lg border border-white/10">
            <p className="text-white/90">
              Following manufacturer instructions and site specifications is legally mandated under BS 7671 and forms essential contractual obligations. These requirements protect safety, ensure warranty coverage, and maintain professional standards. A systematic approach integrating regulatory requirements, manufacturer instructions, and site specifications ensures compliant, safe, and high-quality electrical installations while protecting all stakeholders from legal and financial risks.
            </p>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Quiz (8 Questions)
          </h2>
          <Quiz questions={quizQuestions} />
        </section>

        {/* Navigation */}
        <div className="flex flex-col-reverse sm:flex-row justify-between items-stretch sm:items-center gap-3 pt-8 border-t border-white/10">
          <Button variant="outline" className="min-h-[44px] touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../6-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button className="min-h-[44px] touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../module3">
              Back to Module 3
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
