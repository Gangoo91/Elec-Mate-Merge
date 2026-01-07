import { ArrowLeft, FileCheck, CheckCircle, Award, FileText, Send, ClipboardCheck, Shield, AlertTriangle, BookOpen, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Certification & Reporting Requirements - PAT Testing Course";
const DESCRIPTION = "Learn how to produce professional PAT test certificates, create compliant reports, and communicate results effectively to clients and stakeholders.";

const quickCheckQuestions = [
  {
    id: "m5s5-qc1",
    question: "What is the primary purpose of a PAT test certificate?",
    options: ["To prove the tester is qualified", "To provide formal evidence of testing and results", "To satisfy insurance requirements only", "To authorise equipment use"],
    correctIndex: 1,
    explanation: "The primary purpose is to provide formal documented evidence that testing was conducted and record the results for compliance and safety records."
  },
  {
    id: "m5s5-qc2",
    question: "What should a certificate include regarding failed equipment?",
    options: ["Only pass results should be recorded", "Details of failure, action taken, and recommendations", "Just mark as 'fail' without details", "Failed equipment shouldn't be certificated"],
    correctIndex: 1,
    explanation: "Failed equipment should include full details: what failed, why, actions taken (removed from service, labelled), and recommendations for repair or disposal."
  },
  {
    id: "m5s5-qc3",
    question: "Who should receive copies of PAT test certificates?",
    options: ["Tester keeps all copies", "Client/duty holder, with tester retaining copy", "Posted to HSE", "Displayed publicly"],
    correctIndex: 1,
    explanation: "The client or duty holder should receive the original certificate as evidence of their compliance. The tester should retain a copy for their records."
  }
];

const quizQuestions = [
  {
    question: "A PAT test certificate must include:",
    options: ["Just pass/fail status", "Test date, tester details, equipment ID, results, and outcome", "Equipment colour and size", "User's signature only"],
    correctAnswer: 1
  },
  {
    question: "What format should PAT certificates ideally follow?",
    options: ["Any format is acceptable", "Aligned with IET Code of Practice model forms", "Only handwritten is valid", "Government-issued templates only"],
    correctAnswer: 1
  },
  {
    question: "When providing a summary report, what should be highlighted?",
    options: ["Only failed items and actions required", "All details of every item", "Nothing - certificates are sufficient", "Personal opinions about equipment"],
    correctAnswer: 0
  },
  {
    question: "Electronic certificates are:",
    options: ["Not legally acceptable", "Acceptable if they contain required information and are secure", "Only valid for IT equipment", "Required by law"],
    correctAnswer: 1
  },
  {
    question: "What should happen immediately when an item fails testing?",
    options: ["Ignore and continue", "Remove from service, label clearly, and document", "Test again until it passes", "Hide the equipment"],
    correctAnswer: 1
  },
  {
    question: "A report for management should typically include:",
    options: ["Every test reading in detail", "Executive summary, statistics, recommendations, and risk areas", "Just a list of equipment", "Photographs of all items"],
    correctAnswer: 1
  },
  {
    question: "How long should test certificates be retained?",
    options: ["6 months", "Until next test only", "At least 5 years or equipment lifetime", "Forever by law"],
    correctAnswer: 2
  },
  {
    question: "What distinguishes a test certificate from a test report?",
    options: ["They are the same thing", "Certificate covers individual items; report provides overview/analysis", "Certificates are legal; reports are not", "Only electricians can issue certificates"],
    correctAnswer: 1
  },
  {
    question: "When should verbal communication supplement written reports?",
    options: ["Never - written only", "Always - to explain all results", "For urgent safety issues requiring immediate action", "Only on Fridays"],
    correctAnswer: 2
  },
  {
    question: "What should the 'next test due' date be based on?",
    options: ["Fixed 12-month interval always", "Risk assessment and review of failure data", "Equipment age only", "Client preference regardless of risk"],
    correctAnswer: 1
  }
];

const faqs = [
  {
    question: "Can I issue a certificate if some equipment was unavailable?",
    answer: "Yes. Certificate the equipment tested and clearly note which items were unavailable with reasons. Schedule follow-up to test missing items. The certificate should reflect work completed, not a false comprehensive test."
  },
  {
    question: "What if a client asks me to pass equipment I believe is unsafe?",
    answer: "Never compromise professional integrity. Explain your findings, document the refusal, and recommend appropriate action. Your duty is to safety, not client satisfaction with unsafe outcomes."
  },
  {
    question: "Do I need professional indemnity insurance to issue certificates?",
    answer: "While not legally required, professional indemnity insurance is strongly recommended. It protects you if a client claims your testing was negligent. Most commercial clients require testers to hold insurance."
  },
  {
    question: "Should I include photographs in my reports?",
    answer: "Photographs can be valuable evidence, especially for defects. They help clients understand issues and provide evidence if disputes arise. Include them for significant findings but they're not mandatory."
  },
  {
    question: "How should I handle confidential business information?",
    answer: "Treat client information with confidentiality. Store records securely, don't share with third parties without permission, and follow GDPR principles if personal data is involved in records."
  },
  {
    question: "Can clients refuse to accept my certificate?",
    answer: "Clients can dispute findings but cannot demand you change factual results. If they disagree, recommend independent verification. Document any disputes. Never falsify results under pressure."
  }
];

const PATTestingModule5Section5 = () => {
  useSEO({
    title: TITLE,
    description: DESCRIPTION
  });

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-[#1a1a1a]/95 backdrop-blur supports-[backdrop-filter]:bg-[#1a1a1a]/60">
        <div className="container flex h-14 items-center px-4">
          <Link
            to="/electrical-upskilling/pat-testing/module5"
            className="flex items-center gap-2 text-gray-400 hover:text-elec-yellow transition-colors touch-manipulation min-h-[44px]"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm">Module 5</span>
          </Link>
        </div>
      </header>

      <main className="container px-4 py-6 md:py-8 max-w-4xl mx-auto">
        {/* Title Section */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-elec-yellow/10 mb-4">
            <FileCheck className="h-8 w-8 text-elec-yellow" />
          </div>
          <div className="text-sm text-elec-yellow font-medium mb-2">Module 5 • Section 5</div>
          <h1 className="text-2xl md:text-3xl font-bold mb-3">Certification & Reporting Requirements</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Producing professional documentation that provides evidence of testing and communicates results effectively.
          </p>
        </div>

        {/* Quick Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <h3 className="font-semibold text-elec-yellow mb-2 flex items-center gap-2">
              <Award className="h-4 w-4" />
              In 30 Seconds
            </h3>
            <p className="text-sm text-gray-300">
              Certificates document individual test results with all required details. Reports summarise findings for management.
              Both serve as evidence of due diligence. Failed items must be clearly documented with actions taken.
              Retain records for minimum 5 years.
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <h3 className="font-semibold text-elec-yellow mb-2 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Key Documents
            </h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Test certificates (per item/batch)</li>
              <li>• Summary reports (management)</li>
              <li>• Failure/remedial notices</li>
              <li>• Statistical analysis reports</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-elec-yellow" />
            Learning Outcomes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Produce compliant PAT test certificates",
              "Create effective management summary reports",
              "Document failed equipment appropriately",
              "Communicate results to different audiences",
              "Manage certificate distribution and retention",
              "Handle disputes and challenging situations"
            ].map((outcome, index) => (
              <div key={index} className="flex items-start gap-3 bg-gray-800/30 rounded-lg p-3">
                <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-elec-yellow">{index + 1}</span>
                </div>
                <span className="text-sm text-gray-300">{outcome}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 01: Test Certificates */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-lg font-bold text-elec-yellow">01</span>
            </div>
            <h2 className="text-xl font-semibold">PAT Test Certificates</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              A PAT test certificate is the formal document recording that testing has been conducted
              and detailing the results. It serves as primary evidence of your testing work and the
              client's compliance efforts.
            </p>

            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Essential Certificate Elements</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="text-elec-yellow font-medium mb-2">Header Information</h5>
                  <ul className="space-y-1">
                    <li>• Client/company name and address</li>
                    <li>• Site/location tested</li>
                    <li>• Date(s) of testing</li>
                    <li>• Certificate unique reference number</li>
                    <li>• Tester's company name and details</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-elec-yellow font-medium mb-2">Tester Details</h5>
                  <ul className="space-y-1">
                    <li>• Tester's full name</li>
                    <li>• Qualifications/competence statement</li>
                    <li>• Signature (electronic acceptable)</li>
                    <li>• Contact details</li>
                    <li>• Insurance reference (if applicable)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Per-Item Test Data</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-2 text-elec-yellow">Field</th>
                      <th className="text-left py-2 text-elec-yellow">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-700/50">
                      <td className="py-2 font-medium">Asset ID</td>
                      <td>Unique identifier matching equipment label</td>
                    </tr>
                    <tr className="border-b border-gray-700/50">
                      <td className="py-2 font-medium">Description</td>
                      <td>Equipment type, make, model</td>
                    </tr>
                    <tr className="border-b border-gray-700/50">
                      <td className="py-2 font-medium">Serial Number</td>
                      <td>Manufacturer serial if available</td>
                    </tr>
                    <tr className="border-b border-gray-700/50">
                      <td className="py-2 font-medium">Location</td>
                      <td>Where equipment was tested/found</td>
                    </tr>
                    <tr className="border-b border-gray-700/50">
                      <td className="py-2 font-medium">Class</td>
                      <td>Equipment class (I, II, or III)</td>
                    </tr>
                    <tr className="border-b border-gray-700/50">
                      <td className="py-2 font-medium">Visual Inspection</td>
                      <td>Pass/Fail with notes</td>
                    </tr>
                    <tr className="border-b border-gray-700/50">
                      <td className="py-2 font-medium">Earth Continuity</td>
                      <td>Result in ohms (Class I)</td>
                    </tr>
                    <tr className="border-b border-gray-700/50">
                      <td className="py-2 font-medium">Insulation Resistance</td>
                      <td>Result in MΩ</td>
                    </tr>
                    <tr className="border-b border-gray-700/50">
                      <td className="py-2 font-medium">Other Tests</td>
                      <td>As applicable (polarity, leakage, etc.)</td>
                    </tr>
                    <tr className="border-b border-gray-700/50">
                      <td className="py-2 font-medium">Overall Result</td>
                      <td>PASS or FAIL</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium">Next Test Due</td>
                      <td>Recommended retest date</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-2">Test Equipment Details</h4>
              <p className="text-sm mb-2">
                The certificate should also record details of the test equipment used:
              </p>
              <ul className="text-sm space-y-1">
                <li>• PAT tester make and model</li>
                <li>• Serial number</li>
                <li>• Last calibration date</li>
                <li>• Calibration certificate reference</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck
          id={quickCheckQuestions[0].id}
          question={quickCheckQuestions[0].question}
          options={quickCheckQuestions[0].options}
          correctIndex={quickCheckQuestions[0].correctIndex}
          explanation={quickCheckQuestions[0].explanation}
        />

        {/* Section 02: Documenting Failures */}
        <section className="mb-8 mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-lg font-bold text-elec-yellow">02</span>
            </div>
            <h2 className="text-xl font-semibold">Documenting Failed Equipment</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Failed equipment requires careful documentation. This protects you, informs the client,
              and creates an audit trail showing appropriate action was taken.
            </p>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Immediate Actions for Failed Equipment
              </h4>
              <ol className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 text-xs font-bold">1</span>
                  <span><strong>Remove from service</strong> - Disconnect and ensure it cannot be used</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 text-xs font-bold">2</span>
                  <span><strong>Apply FAIL label</strong> - Clearly visible, stating "DO NOT USE"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 text-xs font-bold">3</span>
                  <span><strong>Inform responsible person</strong> - Verbally and in writing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 text-xs font-bold">4</span>
                  <span><strong>Document fully</strong> - Record all details and actions taken</span>
                </li>
              </ol>
            </div>

            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Failure Documentation Requirements</h4>
              <div className="space-y-3 text-sm">
                <div className="border-l-2 border-red-500 pl-3">
                  <h5 className="font-medium text-red-400">What Failed</h5>
                  <p className="mt-1">Specify which test failed - visual inspection, earth continuity, insulation resistance, etc.
                  Include the actual reading obtained.</p>
                </div>
                <div className="border-l-2 border-orange-500 pl-3">
                  <h5 className="font-medium text-orange-400">Why It Failed</h5>
                  <p className="mt-1">Describe the defect - damaged cable, broken earth, moisture ingress, burnt components.
                  Include photographs if possible.</p>
                </div>
                <div className="border-l-2 border-yellow-500 pl-3">
                  <h5 className="font-medium text-yellow-400">Actions Taken</h5>
                  <p className="mt-1">Record that equipment was removed from service, labelled, and who was informed.
                  Note if equipment was isolated or secured.</p>
                </div>
                <div className="border-l-2 border-blue-500 pl-3">
                  <h5 className="font-medium text-blue-400">Recommendations</h5>
                  <p className="mt-1">Advise whether equipment can be repaired, needs professional repair, or should be disposed.
                  If repairable, state what needs attention.</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h4 className="font-semibold text-elec-yellow mb-2">Failure Severity Levels</h4>
                <ul className="text-sm space-y-2">
                  <li><span className="text-red-400 font-medium">Critical:</span> Immediate danger - exposed live parts, no earth</li>
                  <li><span className="text-orange-400 font-medium">Major:</span> Significant defect - damaged insulation, poor earth</li>
                  <li><span className="text-yellow-400 font-medium">Minor:</span> Defect requiring attention - worn cable, loose plug</li>
                </ul>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h4 className="font-semibold text-elec-yellow mb-2">Recommended Actions</h4>
                <ul className="text-sm space-y-1">
                  <li>• <strong>Dispose:</strong> Beyond economic repair</li>
                  <li>• <strong>Repair:</strong> Defect is repairable</li>
                  <li>• <strong>PAC:</strong> Repair and retest by electrician</li>
                  <li>• <strong>Replace:</strong> Like-for-like replacement</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck
          id={quickCheckQuestions[1].id}
          question={quickCheckQuestions[1].question}
          options={quickCheckQuestions[1].options}
          correctIndex={quickCheckQuestions[1].correctIndex}
          explanation={quickCheckQuestions[1].explanation}
        />

        {/* Section 03: Management Reports */}
        <section className="mb-8 mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-lg font-bold text-elec-yellow">03</span>
            </div>
            <h2 className="text-xl font-semibold">Management Summary Reports</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              While certificates document individual tests, management reports provide an overview
              for decision-makers. They should be concise, highlight key issues, and recommend actions.
            </p>

            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Report Structure</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-elec-yellow">1</span>
                  </div>
                  <div>
                    <h5 className="font-medium text-elec-yellow">Executive Summary</h5>
                    <p className="text-gray-400 mt-1">One paragraph overview: items tested, pass rate, critical findings,
                    immediate actions required. Managers may only read this section.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-elec-yellow">2</span>
                  </div>
                  <div>
                    <h5 className="font-medium text-elec-yellow">Testing Statistics</h5>
                    <p className="text-gray-400 mt-1">Total items tested, pass/fail breakdown, failure rate percentage,
                    comparison with previous testing (if applicable).</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-elec-yellow">3</span>
                  </div>
                  <div>
                    <h5 className="font-medium text-elec-yellow">Failed Items Summary</h5>
                    <p className="text-gray-400 mt-1">List of all failed items with location, fault type, and
                    recommended action. Highlight critical issues prominently.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-elec-yellow">4</span>
                  </div>
                  <div>
                    <h5 className="font-medium text-elec-yellow">Recommendations</h5>
                    <p className="text-gray-400 mt-1">Suggested actions for remediation, interval adjustments,
                    areas requiring attention, equipment replacement budgeting.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-elec-yellow">5</span>
                  </div>
                  <div>
                    <h5 className="font-medium text-elec-yellow">Appendices</h5>
                    <p className="text-gray-400 mt-1">Full test certificates, photographs of defects,
                    calibration certificates, any supporting documentation.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-green-400 mb-2">Good Report Practice</h4>
                <ul className="text-sm space-y-1">
                  <li>✓ Lead with critical findings</li>
                  <li>✓ Use clear, non-technical language</li>
                  <li>✓ Include visual aids (charts, tables)</li>
                  <li>✓ Provide actionable recommendations</li>
                  <li>✓ Include comparison with previous tests</li>
                  <li>✓ State next test due dates clearly</li>
                </ul>
              </div>
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-red-400 mb-2">Poor Report Practice</h4>
                <ul className="text-sm space-y-1">
                  <li>✗ Burying critical findings in detail</li>
                  <li>✗ Using excessive technical jargon</li>
                  <li>✗ Missing executive summary</li>
                  <li>✗ No clear recommendations</li>
                  <li>✗ Inconsistent formatting</li>
                  <li>✗ Missing tester identification</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Communication */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-lg font-bold text-elec-yellow">04</span>
            </div>
            <h2 className="text-xl font-semibold">Communicating Results</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Different stakeholders need different levels of detail. Tailoring your communication
              ensures results are understood and acted upon appropriately.
            </p>

            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Audience-Specific Communication</h4>
              <div className="space-y-4 text-sm">
                <div className="border-l-2 border-elec-yellow pl-3">
                  <h5 className="font-medium text-elec-yellow">Facilities/Maintenance Manager</h5>
                  <p className="text-gray-300 mt-1">Full technical detail. List of failed items for repair/replacement.
                  Asset register updates needed. Next test schedule. Budget implications.</p>
                </div>
                <div className="border-l-2 border-elec-yellow pl-3">
                  <h5 className="font-medium text-elec-yellow">Health & Safety Manager</h5>
                  <p className="text-gray-300 mt-1">Compliance summary. Risk areas identified. Failure trends.
                  Actions taken for dangerous items. Evidence for audits and inspections.</p>
                </div>
                <div className="border-l-2 border-elec-yellow pl-3">
                  <h5 className="font-medium text-elec-yellow">Senior Management</h5>
                  <p className="text-gray-300 mt-1">Executive summary only. Pass/fail statistics. Compliance status.
                  Critical risks requiring budget or policy decisions.</p>
                </div>
                <div className="border-l-2 border-elec-yellow pl-3">
                  <h5 className="font-medium text-elec-yellow">Department Managers</h5>
                  <p className="text-gray-300 mt-1">Results for their area. Failed items and required actions.
                  User awareness points. Next test dates for planning.</p>
                </div>
              </div>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-orange-400 mb-2 flex items-center gap-2">
                <Send className="h-5 w-5" />
                Urgent Communication
              </h4>
              <p className="text-sm mb-2">
                Some findings require immediate verbal communication, not just written reports:
              </p>
              <ul className="text-sm space-y-1">
                <li>• Equipment presenting immediate danger</li>
                <li>• Multiple critical failures indicating systemic issues</li>
                <li>• Equipment in public areas that could harm visitors</li>
                <li>• Findings requiring immediate management decisions</li>
                <li>• Evidence of misuse or tampering</li>
              </ul>
              <p className="text-sm mt-2 text-gray-400">
                Always follow verbal communication with written confirmation.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck
          id={quickCheckQuestions[2].id}
          question={quickCheckQuestions[2].question}
          options={quickCheckQuestions[2].options}
          correctIndex={quickCheckQuestions[2].correctIndex}
          explanation={quickCheckQuestions[2].explanation}
        />

        {/* Section 05: Certificate Management */}
        <section className="mb-8 mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-lg font-bold text-elec-yellow">05</span>
            </div>
            <h2 className="text-xl font-semibold">Certificate Distribution & Retention</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Proper management of certificates ensures they're available when needed and retained
              for the required periods.
            </p>

            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Download className="h-5 w-5 text-elec-yellow" />
                Distribution Requirements
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="text-elec-yellow font-medium mb-2">Client Receives</h5>
                  <ul className="space-y-1">
                    <li>• Original certificate or authenticated copy</li>
                    <li>• Management summary report</li>
                    <li>• Failed items report with recommendations</li>
                    <li>• Updated asset register (if applicable)</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-elec-yellow font-medium mb-2">Tester Retains</h5>
                  <ul className="space-y-1">
                    <li>• Copy of all certificates issued</li>
                    <li>• Copy of reports provided</li>
                    <li>• Record of any verbal communications</li>
                    <li>• Photographs taken during testing</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <h4 className="font-semibold text-elec-yellow mb-2">Retention Periods</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                  <span>Active equipment certificates</span>
                  <span className="font-medium">Equipment lifetime + 5 years</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                  <span>Disposed equipment records</span>
                  <span className="font-medium">5 years from disposal</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                  <span>Post-incident records</span>
                  <span className="font-medium">Indefinitely/as advised</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Calibration certificates</span>
                  <span className="font-medium">5+ years</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Electronic vs Paper Certificates</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="text-green-400 font-medium mb-2">Electronic Advantages</h5>
                  <ul className="space-y-1">
                    <li>• Easy searching and retrieval</li>
                    <li>• Secure cloud backup</li>
                    <li>• Instant distribution</li>
                    <li>• Integration with PAT software</li>
                    <li>• Reduced storage space</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-blue-400 font-medium mb-2">Requirements for Electronic</h5>
                  <ul className="space-y-1">
                    <li>• Secure, tamper-evident storage</li>
                    <li>• Regular backups</li>
                    <li>• Audit trail of access</li>
                    <li>• GDPR compliance if personal data</li>
                    <li>• Long-term format accessibility</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
            Practical Guidance
          </h2>

          <div className="space-y-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Professional Standards</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <Shield className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span><strong>Accuracy:</strong> All data must be accurate. Never falsify results or omit failures.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span><strong>Completeness:</strong> Document all equipment tested and all findings.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span><strong>Timeliness:</strong> Issue certificates promptly after testing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span><strong>Confidentiality:</strong> Treat client information appropriately.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span><strong>Independence:</strong> Report findings objectively regardless of pressure.</span>
                </li>
              </ul>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-orange-400 mb-2">Handling Difficult Situations</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-white">Client disputes findings:</p>
                  <p className="text-gray-300 mt-1">Stand by factual results. Offer to re-test witnessed. Recommend independent verification. Document all discussions.</p>
                </div>
                <div>
                  <p className="font-medium text-white">Pressure to pass unsafe equipment:</p>
                  <p className="text-gray-300 mt-1">Refuse. Document the request and your refusal. Remove equipment from service. Report to appropriate authority if immediate danger.</p>
                </div>
                <div>
                  <p className="font-medium text-white">Missing equipment during testing:</p>
                  <p className="text-gray-300 mt-1">Document what was unavailable. Complete certificate for tested items. Schedule follow-up visit. Don't claim comprehensive test.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <details key={index} className="group bg-gray-800 rounded-lg">
                <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
                  <span className="font-medium text-sm pr-4">{faq.question}</span>
                  <span className="text-elec-yellow transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="px-4 pb-4 text-sm text-gray-400">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="mb-8">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 border border-gray-700">
            <h3 className="font-semibold text-elec-yellow mb-4">Quick Reference: Certification Checklist</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-white mb-2">Certificate Must Include</h4>
                <ul className="space-y-1 text-gray-300">
                  <li>□ Client details and site</li>
                  <li>□ Date of testing</li>
                  <li>□ Tester details and signature</li>
                  <li>□ Test equipment details</li>
                  <li>□ All equipment tested with IDs</li>
                  <li>□ Test results with values</li>
                  <li>□ Pass/Fail outcomes</li>
                  <li>□ Next test dates</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">For Failed Items</h4>
                <ul className="space-y-1 text-gray-300">
                  <li>□ Which test failed</li>
                  <li>□ Actual readings obtained</li>
                  <li>□ Description of defect</li>
                  <li>□ Actions taken</li>
                  <li>□ Recommendations</li>
                  <li>□ Photographs if applicable</li>
                  <li>□ Who was informed</li>
                  <li>□ Equipment secured/labelled</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-8">
          <Quiz
            title="Section 5 Quiz: Certification & Reporting Requirements"
            questions={quizQuestions}
            passingScore={80}
          />
        </section>

        {/* Course Completion */}
        <section className="mb-8">
          <div className="bg-gradient-to-br from-green-500/10 to-elec-yellow/10 rounded-xl p-6 border border-green-500/30 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
              <Award className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Module 5 Complete!</h3>
            <p className="text-gray-300 mb-4">
              You've completed the final module of the PAT Testing course. You now understand documentation,
              record keeping, and professional reporting requirements.
            </p>
            <Link to="/electrical-upskilling/pat-testing">
              <Button className="bg-green-500 text-white hover:bg-green-600 touch-manipulation min-h-[44px]">
                Return to Course Overview
              </Button>
            </Link>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-gray-800">
          <Link to="/electrical-upskilling/pat-testing/module5/section4">
            <Button variant="outline" className="w-full sm:w-auto border-gray-700 hover:bg-gray-800 touch-manipulation min-h-[44px]">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous: Re-Test Planning
            </Button>
          </Link>
          <Link to="/electrical-upskilling/pat-testing">
            <Button className="w-full sm:w-auto bg-elec-yellow text-gray-900 hover:bg-elec-yellow/90 touch-manipulation min-h-[44px]">
              Course Overview
              <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default PATTestingModule5Section5;
