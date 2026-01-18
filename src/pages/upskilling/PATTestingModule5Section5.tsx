import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Certification and Reporting Requirements - PAT Testing Module 5 Section 5";
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
    options: ["Only pass results should be recorded", "Details of failure, action taken, and recommendations", "Just mark as 'fail' without details", "Failed equipment should not be certificated"],
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
    id: 1,
    question: "A PAT test certificate must include:",
    options: ["Just pass/fail status", "Test date, tester details, equipment ID, results, and outcome", "Equipment colour and size", "User's signature only"],
    correctAnswer: 1,
    explanation: "Certificates must include comprehensive information for traceability and compliance evidence."
  },
  {
    id: 2,
    question: "What format should PAT certificates ideally follow?",
    options: ["Any format is acceptable", "Aligned with IET Code of Practice model forms", "Only handwritten is valid", "Government-issued templates only"],
    correctAnswer: 1,
    explanation: "The IET Code of Practice provides model forms that ensure all necessary information is captured."
  },
  {
    id: 3,
    question: "When providing a summary report, what should be highlighted?",
    options: ["Only failed items and actions required", "All details of every item", "Nothing - certificates are sufficient", "Personal opinions about equipment"],
    correctAnswer: 0,
    explanation: "Summary reports should highlight failed items and required actions for management attention."
  },
  {
    id: 4,
    question: "Electronic certificates are:",
    options: ["Not legally acceptable", "Acceptable if they contain required information and are secure", "Only valid for IT equipment", "Required by law"],
    correctAnswer: 1,
    explanation: "Electronic certificates are fully acceptable provided they contain all required information and are stored securely."
  },
  {
    id: 5,
    question: "What should happen immediately when an item fails testing?",
    options: ["Ignore and continue", "Remove from service, label clearly, and document", "Test again until it passes", "Hide the equipment"],
    correctAnswer: 1,
    explanation: "Failed equipment must be immediately removed from service, clearly labelled, and fully documented."
  },
  {
    id: 6,
    question: "A report for management should typically include:",
    options: ["Every test reading in detail", "Executive summary, statistics, recommendations, and risk areas", "Just a list of equipment", "Photographs of all items"],
    correctAnswer: 1,
    explanation: "Management reports should provide an overview with key statistics and actionable recommendations."
  },
  {
    id: 7,
    question: "How long should test certificates be retained?",
    options: ["6 months", "Until next test only", "At least 5 years or equipment lifetime", "Forever by law"],
    correctAnswer: 2,
    explanation: "Records should be retained for at least 5 years or the lifetime of the equipment, whichever is longer."
  },
  {
    id: 8,
    question: "What distinguishes a test certificate from a test report?",
    options: ["They are the same thing", "Certificate covers individual items; report provides overview/analysis", "Certificates are legal; reports are not", "Only electricians can issue certificates"],
    correctAnswer: 1,
    explanation: "Certificates document individual test results; reports provide summary analysis for management."
  },
  {
    id: 9,
    question: "When should verbal communication supplement written reports?",
    options: ["Never - written only", "Always - to explain all results", "For urgent safety issues requiring immediate action", "Only on Fridays"],
    correctAnswer: 2,
    explanation: "Urgent safety issues should be communicated verbally immediately, then followed up in writing."
  },
  {
    id: 10,
    question: "What should the 'next test due' date be based on?",
    options: ["Fixed 12-month interval always", "Risk assessment and review of failure data", "Equipment age only", "Client preference regardless of risk"],
    correctAnswer: 1,
    explanation: "Next test dates should be based on risk assessment, not arbitrary fixed intervals."
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
    answer: "Photographs can be valuable evidence, especially for defects. They help clients understand issues and provide evidence if disputes arise. Include them for significant findings but they are not mandatory."
  },
  {
    question: "How should I handle confidential business information?",
    answer: "Treat client information with confidentiality. Store records securely, do not share with third parties without permission, and follow GDPR principles if personal data is involved in records."
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
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
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
            <span>Module 5 Section 5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Certification and Reporting
          </h1>
          <p className="text-white/80">
            Producing professional documentation that evidences your testing work
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Certificates:</strong> Document individual test results</li>
              <li><strong>Reports:</strong> Summarise findings for management</li>
              <li><strong>Evidence:</strong> Proves due diligence and compliance</li>
              <li><strong>Retention:</strong> Keep records for minimum 5 years</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Missing information on certificates</li>
              <li><strong>Use:</strong> IET model forms as templates</li>
              <li><strong>Apply:</strong> Professional standards throughout</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Produce compliant PAT test certificates",
              "Create effective management summary reports",
              "Document failed equipment appropriately",
              "Communicate results to different audiences",
              "Manage certificate distribution and retention",
              "Handle disputes and challenging situations"
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

        {/* Section 1: PAT Test Certificates */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            PAT Test Certificates
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A PAT test certificate is the formal document recording that testing has been conducted
              and detailing the results. It serves as primary evidence of your testing work and the
              client's compliance efforts.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Essential certificate elements:</p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-2">Header Information</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Client/company name and address</li>
                    <li>Site/location tested</li>
                    <li>Date(s) of testing</li>
                    <li>Certificate unique reference number</li>
                    <li>Tester's company name and details</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-2">Tester Details</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Tester's full name</li>
                    <li>Qualifications/competence statement</li>
                    <li>Signature (electronic acceptable)</li>
                    <li>Contact details</li>
                    <li>Insurance reference (if applicable)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Per-item test data required:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Asset ID:</strong> Unique identifier matching equipment label</li>
                <li><strong>Description:</strong> Equipment type, make, model</li>
                <li><strong>Serial Number:</strong> Manufacturer serial if available</li>
                <li><strong>Location:</strong> Where equipment was tested/found</li>
                <li><strong>Class:</strong> Equipment class (I, II, or III)</li>
                <li><strong>Visual Inspection:</strong> Pass/Fail with notes</li>
                <li><strong>Earth Continuity:</strong> Result in ohms (Class I)</li>
                <li><strong>Insulation Resistance:</strong> Result in megohms</li>
                <li><strong>Overall Result:</strong> PASS or FAIL</li>
                <li><strong>Next Test Due:</strong> Recommended retest date</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Test equipment details to record:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>PAT tester make and model</li>
                <li>Serial number</li>
                <li>Last calibration date</li>
                <li>Calibration certificate reference</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Documenting Failed Equipment */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Documenting Failed Equipment
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Failed equipment requires careful documentation. This protects you, informs the client,
              and creates an audit trail showing appropriate action was taken.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Immediate actions for failed equipment:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>1. Remove from service</strong> — Disconnect and ensure it cannot be used</li>
                <li><strong>2. Apply FAIL label</strong> — Clearly visible, stating "DO NOT USE"</li>
                <li><strong>3. Inform responsible person</strong> — Verbally and in writing</li>
                <li><strong>4. Document fully</strong> — Record all details and actions taken</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Failure documentation requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>What failed:</strong> Specify which test - visual, earth, insulation, etc. Include the actual reading.</li>
                <li><strong>Why it failed:</strong> Describe the defect - damaged cable, broken earth, moisture ingress</li>
                <li><strong>Actions taken:</strong> Record equipment removed, labelled, who was informed</li>
                <li><strong>Recommendations:</strong> Advise repair, professional repair, or disposal</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Failure Severity Levels</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Critical:</strong> Immediate danger - exposed live parts, no earth</li>
                  <li><strong>Major:</strong> Significant defect - damaged insulation, poor earth</li>
                  <li><strong>Minor:</strong> Needs attention - worn cable, loose plug</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Recommended Actions</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Dispose:</strong> Beyond economic repair</li>
                  <li><strong>Repair:</strong> Defect is repairable</li>
                  <li><strong>PAC:</strong> Repair and retest by electrician</li>
                  <li><strong>Replace:</strong> Like-for-like replacement</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Management Summary Reports */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Management Summary Reports
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              While certificates document individual tests, management reports provide an overview
              for decision-makers. They should be concise, highlight key issues, and recommend actions.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Report structure:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>1. Executive Summary:</strong> One paragraph overview - items tested, pass rate, critical findings</li>
                <li><strong>2. Testing Statistics:</strong> Total items, pass/fail breakdown, failure rate percentage</li>
                <li><strong>3. Failed Items Summary:</strong> List all failed items with location and recommended action</li>
                <li><strong>4. Recommendations:</strong> Actions for remediation, interval adjustments, budget items</li>
                <li><strong>5. Appendices:</strong> Full certificates, photographs, calibration certificates</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Good Report Practice</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Lead with critical findings</li>
                  <li>Use clear, non-technical language</li>
                  <li>Include visual aids (charts, tables)</li>
                  <li>Provide actionable recommendations</li>
                  <li>Include comparison with previous tests</li>
                  <li>State next test due dates clearly</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Poor Report Practice</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Burying critical findings in detail</li>
                  <li>Using excessive technical jargon</li>
                  <li>Missing executive summary</li>
                  <li>No clear recommendations</li>
                  <li>Inconsistent formatting</li>
                  <li>Missing tester identification</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Communicating Results */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Communicating Results
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Different stakeholders need different levels of detail. Tailoring your communication
              ensures results are understood and acted upon appropriately.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Audience-specific communication:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Facilities Manager:</strong> Full technical detail, failed items list, asset register updates, budget implications</li>
                <li><strong>Health and Safety Manager:</strong> Compliance summary, risk areas, failure trends, evidence for audits</li>
                <li><strong>Senior Management:</strong> Executive summary only, pass/fail statistics, compliance status, critical risks</li>
                <li><strong>Department Managers:</strong> Results for their area, failed items, user awareness points, next test dates</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Urgent communication required for:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Equipment presenting immediate danger</li>
                <li>Multiple critical failures indicating systemic issues</li>
                <li>Equipment in public areas that could harm visitors</li>
                <li>Findings requiring immediate management decisions</li>
                <li>Evidence of misuse or tampering</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Always follow verbal communication with written confirmation.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 5: Certificate Distribution and Retention */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Distribution and Retention
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper management of certificates ensures they are available when needed and retained
              for the required periods.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Client Receives</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Original certificate or authenticated copy</li>
                  <li>Management summary report</li>
                  <li>Failed items report with recommendations</li>
                  <li>Updated asset register (if applicable)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Tester Retains</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Copy of all certificates issued</li>
                  <li>Copy of reports provided</li>
                  <li>Record of any verbal communications</li>
                  <li>Photographs taken during testing</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Retention periods:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Active equipment certificates:</strong> Equipment lifetime + 5 years</li>
                <li><strong>Disposed equipment records:</strong> 5 years from disposal</li>
                <li><strong>Post-incident records:</strong> Indefinitely/as advised</li>
                <li><strong>Calibration certificates:</strong> 5+ years</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Electronic Advantages</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Easy searching and retrieval</li>
                  <li>Secure cloud backup</li>
                  <li>Instant distribution</li>
                  <li>Integration with PAT software</li>
                  <li>Reduced storage space</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Electronic Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Secure, tamper-evident storage</li>
                  <li>Regular backups</li>
                  <li>Audit trail of access</li>
                  <li>GDPR compliance if personal data</li>
                  <li>Long-term format accessibility</li>
                </ul>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Professional Standards</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Accuracy:</strong> All data must be accurate. Never falsify results or omit failures</li>
                <li><strong>Completeness:</strong> Document all equipment tested and all findings</li>
                <li><strong>Timeliness:</strong> Issue certificates promptly after testing</li>
                <li><strong>Confidentiality:</strong> Treat client information appropriately</li>
                <li><strong>Independence:</strong> Report findings objectively regardless of pressure</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Handling Difficult Situations</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Client disputes findings:</strong> Stand by factual results, offer witnessed re-test, recommend independent verification</li>
                <li><strong>Pressure to pass unsafe equipment:</strong> Refuse, document the request and refusal, remove equipment from service</li>
                <li><strong>Missing equipment during testing:</strong> Document what was unavailable, complete certificate for tested items, schedule follow-up</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Incomplete certificates</strong> — missing tester details, dates, or test values</li>
                <li><strong>Poor failure documentation</strong> — just writing "fail" without explanation</li>
                <li><strong>Delayed reporting</strong> — certificates should be issued promptly</li>
                <li><strong>Not retaining copies</strong> — always keep your own records</li>
                <li><strong>Ignoring urgent findings</strong> — critical issues need immediate verbal communication</li>
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
                <p className="font-medium text-white mb-1">Certificate Must Include</p>
                <ul className="space-y-0.5">
                  <li>Client details and site</li>
                  <li>Date of testing</li>
                  <li>Tester details and signature</li>
                  <li>Test equipment details</li>
                  <li>All equipment tested with IDs</li>
                  <li>Test results with values</li>
                  <li>Pass/Fail outcomes</li>
                  <li>Next test dates</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">For Failed Items</p>
                <ul className="space-y-0.5">
                  <li>Which test failed</li>
                  <li>Actual readings obtained</li>
                  <li>Description of defect</li>
                  <li>Actions taken</li>
                  <li>Recommendations</li>
                  <li>Photographs if applicable</li>
                  <li>Who was informed</li>
                  <li>Equipment secured/labelled</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Module Completion */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="text-lg font-semibold text-white mb-2">Module 5 Complete</h3>
            <p className="text-sm text-white mb-4">
              Congratulations on completing Module 5: Documentation and Record Keeping. You now understand
              how to create professional certificates, document findings accurately, and communicate
              results effectively to different stakeholders.
            </p>
            <Button size="lg" className="bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
              <Link to="../../pat-testing">
                Return to Course Overview
              </Link>
            </Button>
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
            <Link to="../section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../../pat-testing">
              Course Overview
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default PATTestingModule5Section5;
