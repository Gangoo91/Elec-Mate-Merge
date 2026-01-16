import { ArrowLeft, FileText, CheckCircle, Scale, Clock, Shield, AlertTriangle, BookOpen, ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Test Record Keeping & Legal Requirements - PAT Testing Course";
const DESCRIPTION = "Master PAT test record keeping, understand legal obligations under HASAWA and EAWR, and learn best practices for maintaining compliant documentation.";

const quickCheckQuestions = [
  {
    id: "m5s2-qc1",
    question: "How long should PAT test records typically be retained?",
    options: ["1 year", "3 years", "At least 5 years or equipment lifetime", "Until next test"],
    correctIndex: 2,
    explanation: "Records should be kept for at least 5 years or the lifetime of the equipment, whichever is longer, to demonstrate ongoing compliance."
  },
  {
    id: "m5s2-qc2",
    question: "What legislation requires employers to maintain electrical equipment in a safe condition?",
    options: ["HASAWA 1974 & EAWR 1989", "Building Regulations 2010", "COSHH Regulations", "Manual Handling Regulations"],
    correctIndex: 0,
    explanation: "The Health and Safety at Work Act 1974 and Electricity at Work Regulations 1989 require employers to ensure electrical equipment safety."
  },
  {
    id: "m5s2-qc3",
    question: "What must be included in a PAT test record as a minimum?",
    options: ["Just pass/fail", "Equipment description and result only", "Asset ID, date, tester, results, and outcome", "Manufacturer name only"],
    correctIndex: 2,
    explanation: "Minimum records include asset identification, test date, tester identity, all test results with values, and the overall pass/fail outcome."
  }
];

const quizQuestions = [
  {
    question: "Under the Electricity at Work Regulations 1989, who has a duty to maintain electrical equipment safely?",
    options: ["Only qualified electricians", "Equipment manufacturers only", "Duty holders including employers and employees", "Local authorities"],
    correctAnswer: 2
  },
  {
    question: "What is the primary purpose of maintaining PAT test records?",
    options: ["To increase company profits", "To demonstrate due diligence and compliance", "To keep testers busy", "To satisfy customers only"],
    correctAnswer: 1
  },
  {
    question: "Which document provides guidance on PAT testing but is NOT legally binding?",
    options: ["HASAWA 1974", "EAWR 1989", "IET Code of Practice", "All are legally binding"],
    correctAnswer: 2
  },
  {
    question: "What information should be recorded about the person conducting PAT tests?",
    options: ["Just their first name", "Name, qualifications, and signature/ID", "Nothing - it's not required", "Their age only"],
    correctAnswer: 1
  },
  {
    question: "In the event of an accident involving electrical equipment, records should be:",
    options: ["Destroyed immediately", "Kept indefinitely or as advised by legal counsel", "Kept for 6 months only", "Not relevant to investigations"],
    correctAnswer: 1
  },
  {
    question: "What does 'due diligence' mean in the context of PAT testing?",
    options: ["Testing as fast as possible", "Taking all reasonable steps to ensure safety", "Only testing new equipment", "Avoiding documentation"],
    correctAnswer: 1
  },
  {
    question: "Electronic PAT record systems should include which security feature?",
    options: ["No backup needed", "Audit trail and data protection", "Open access to everyone", "Manual entry only"],
    correctAnswer: 1
  },
  {
    question: "What happens to PAT records when equipment is disposed of?",
    options: ["Delete immediately", "Retain for defined period showing disposal date", "Transfer to new owner only", "Records not needed for disposed equipment"],
    correctAnswer: 1
  },
  {
    question: "Which Regulation specifically addresses electrical equipment maintenance?",
    options: ["Regulation 4 of EAWR", "Regulation 1 of HASAWA", "Building Regulation Part P", "Fire Safety Order"],
    correctAnswer: 0
  },
  {
    question: "What constitutes a legally defensible PAT testing regime?",
    options: ["Testing every 3 months regardless of risk", "Risk-based intervals with comprehensive records", "No formal records needed if equipment looks safe", "Verbal confirmation only"],
    correctAnswer: 1
  }
];

const faqs = [
  {
    question: "Is PAT testing a legal requirement?",
    answer: "PAT testing itself isn't specifically mandated by law, but the Electricity at Work Regulations 1989 require electrical equipment to be maintained to prevent danger. PAT testing is a recognised method of demonstrating compliance with this duty."
  },
  {
    question: "Can I keep PAT records electronically?",
    answer: "Yes, electronic records are acceptable and often preferred. They should be secure, backed up regularly, and include audit trails. The system should allow easy retrieval of historical data and generation of reports."
  },
  {
    question: "Who can access PAT test records?",
    answer: "Records should be accessible to relevant duty holders, HSE inspectors, insurance companies, and auditors. Access should be controlled under GDPR principles if personal data is included."
  },
  {
    question: "What if I can't find historical PAT records?",
    answer: "Missing records represent a compliance gap. Immediately test all equipment without records and establish proper record-keeping systems. Document the gap and actions taken to address it."
  },
  {
    question: "Do contractors' equipment records need to be kept?",
    answer: "Yes, you should verify contractors' equipment is tested and may need to retain copies of their test certificates while they work on your premises. This demonstrates your due diligence."
  },
  {
    question: "How do records help in accident investigations?",
    answer: "Records demonstrate your testing regime, equipment condition history, and compliance efforts. They can prove reasonable precautions were taken, which is crucial for legal defence and insurance claims."
  }
];

const PATTestingModule5Section2 = () => {
  useSEO({
    title: TITLE,
    description: DESCRIPTION
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a] text-white">
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

      <main className="container px-4 py-6 md:py-8 max-w-3xl mx-auto">
        {/* Title Section */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-elec-yellow/10 mb-4">
            <FileText className="h-8 w-8 text-elec-yellow" />
          </div>
          <div className="text-sm text-elec-yellow font-medium mb-2">Module 5 • Section 2</div>
          <h1 className="text-2xl md:text-3xl font-bold mb-3">Test Record Keeping & Legal Requirements</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Understanding your legal obligations and maintaining comprehensive records for compliance and protection.
          </p>
        </div>

        {/* Quick Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <h3 className="font-semibold text-elec-yellow mb-2 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              In 30 Seconds
            </h3>
            <p className="text-sm text-gray-300">
              PAT testing demonstrates compliance with HASAWA 1974 and EAWR 1989. Records must include asset ID, test date,
              tester details, all results, and outcomes. Retain for minimum 5 years. Electronic systems with backups are recommended.
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <h3 className="font-semibold text-elec-yellow mb-2 flex items-center gap-2">
              <Scale className="h-4 w-4" />
              Legal Framework
            </h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• HASAWA 1974 - General duty of care</li>
              <li>• EAWR 1989 - Equipment maintenance duty</li>
              <li>• IET CoP - Industry guidance (advisory)</li>
              <li>• Due diligence demonstration</li>
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
              "Understand the legal framework governing PAT testing",
              "Identify minimum record-keeping requirements",
              "Implement compliant documentation systems",
              "Recognise duty holder responsibilities",
              "Apply records for accident investigation defence",
              "Maintain data security and retention policies"
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

        {/* Section 01: Legal Framework */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-lg font-bold text-elec-yellow">01</span>
            </div>
            <h2 className="text-xl font-semibold">The Legal Framework</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Understanding the legal framework is essential for any PAT tester. While PAT testing itself isn't explicitly
              required by law, it serves as a practical method of complying with broader electrical safety legislation.
            </p>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-red-400 mb-2">Health and Safety at Work Act 1974</h4>
              <p className="text-sm mb-3">
                Section 2 places a general duty on employers to ensure, so far as is reasonably practicable,
                the health, safety and welfare of employees. This includes providing safe equipment.
              </p>
              <ul className="text-sm space-y-1">
                <li>• Section 2(1): General duty to employees</li>
                <li>• Section 2(2)(a): Safe plant and systems of work</li>
                <li>• Section 3: Duty to non-employees (visitors, contractors)</li>
                <li>• Section 7: Employee duties to cooperate</li>
              </ul>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-2">Electricity at Work Regulations 1989 (EAWR)</h4>
              <p className="text-sm mb-3">
                These regulations specifically address electrical safety. Regulation 4(2) is particularly relevant:
              </p>
              <blockquote className="text-sm italic border-l-2 border-blue-500 pl-4 mb-3">
                "As may be necessary to prevent danger, all systems shall be maintained so as to prevent,
                so far as is reasonably practicable, such danger."
              </blockquote>
              <ul className="text-sm space-y-1">
                <li>• Regulation 4(2): Maintenance to prevent danger</li>
                <li>• Regulation 4(3): Work on equipment must be safe</li>
                <li>• Applies to all work activities</li>
                <li>• Criminal sanctions for non-compliance</li>
              </ul>
            </div>

            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Key Legal Concepts</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="text-elec-yellow font-medium mb-1">Reasonably Practicable</h5>
                  <p>Balancing risk reduction against cost, time and effort. You must do what's reasonable, not impossible.</p>
                </div>
                <div>
                  <h5 className="text-elec-yellow font-medium mb-1">Due Diligence</h5>
                  <p>Taking all reasonable steps to prevent harm. Records demonstrate you've exercised due diligence.</p>
                </div>
                <div>
                  <h5 className="text-elec-yellow font-medium mb-1">Duty Holder</h5>
                  <p>Person(s) responsible for electrical safety - typically employers, self-employed, or premises controllers.</p>
                </div>
                <div>
                  <h5 className="text-elec-yellow font-medium mb-1">Competent Person</h5>
                  <p>Someone with suitable training, knowledge and experience to conduct PAT testing safely.</p>
                </div>
              </div>
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

        {/* Section 02: Record Requirements */}
        <section className="mb-8 mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-lg font-bold text-elec-yellow">02</span>
            </div>
            <h2 className="text-xl font-semibold">Minimum Record Requirements</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              The IET Code of Practice provides guidance on what should be recorded. While the Regulations don't specify
              exact record formats, maintaining comprehensive records demonstrates compliance and supports due diligence.
            </p>

            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-elec-yellow" />
                Essential Record Elements
              </h4>
              <div className="space-y-3">
                <div className="border-l-2 border-elec-yellow pl-3">
                  <h5 className="font-medium text-elec-yellow">Equipment Identification</h5>
                  <ul className="text-sm mt-1 space-y-1">
                    <li>• Unique asset ID number</li>
                    <li>• Equipment description/type</li>
                    <li>• Manufacturer and model</li>
                    <li>• Serial number (if available)</li>
                    <li>• Location/department</li>
                  </ul>
                </div>
                <div className="border-l-2 border-elec-yellow pl-3">
                  <h5 className="font-medium text-elec-yellow">Test Information</h5>
                  <ul className="text-sm mt-1 space-y-1">
                    <li>• Date of test</li>
                    <li>• Tester name and signature/ID</li>
                    <li>• Test equipment used (with calibration date)</li>
                    <li>• Tests performed</li>
                    <li>• Actual test readings/values</li>
                  </ul>
                </div>
                <div className="border-l-2 border-elec-yellow pl-3">
                  <h5 className="font-medium text-elec-yellow">Results and Actions</h5>
                  <ul className="text-sm mt-1 space-y-1">
                    <li>• Pass/Fail outcome</li>
                    <li>• Next test due date</li>
                    <li>• Remedial actions required</li>
                    <li>• Any observations or notes</li>
                    <li>• Equipment class (I, II, or III)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-green-400 mb-2">Good Practice</h4>
                <ul className="text-sm space-y-1">
                  <li>✓ Record actual test values, not just pass/fail</li>
                  <li>✓ Include equipment photographs</li>
                  <li>✓ Document any repairs made</li>
                  <li>✓ Note condition observations</li>
                  <li>✓ Track equipment history over time</li>
                </ul>
              </div>
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-red-400 mb-2">Poor Practice</h4>
                <ul className="text-sm space-y-1">
                  <li>✗ Recording only pass/fail status</li>
                  <li>✗ Missing tester identification</li>
                  <li>✗ No equipment serial numbers</li>
                  <li>✗ Inconsistent dating formats</li>
                  <li>✗ Illegible handwritten records</li>
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

        {/* Section 03: Record Systems */}
        <section className="mb-8 mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-lg font-bold text-elec-yellow">03</span>
            </div>
            <h2 className="text-xl font-semibold">Record Keeping Systems</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Records can be maintained in various formats, from paper-based systems to sophisticated software.
              The key is consistency, accessibility, and security.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-3">Paper-Based Systems</h4>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-400">Advantages:</p>
                  <ul className="space-y-1">
                    <li>• Low initial cost</li>
                    <li>• No technical knowledge required</li>
                    <li>• Immediate hard copy evidence</li>
                  </ul>
                  <p className="text-gray-400 mt-2">Disadvantages:</p>
                  <ul className="space-y-1">
                    <li>• Difficult to search and analyse</li>
                    <li>• Risk of loss or damage</li>
                    <li>• Storage space requirements</li>
                    <li>• Manual duplicate entry</li>
                  </ul>
                </div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-3">Electronic Systems</h4>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-400">Advantages:</p>
                  <ul className="space-y-1">
                    <li>• Easy searching and reporting</li>
                    <li>• Automatic reminders for retests</li>
                    <li>• Integration with PAT testers</li>
                    <li>• Cloud backup options</li>
                  </ul>
                  <p className="text-gray-400 mt-2">Disadvantages:</p>
                  <ul className="space-y-1">
                    <li>• Initial setup costs</li>
                    <li>• Training requirements</li>
                    <li>• Data security considerations</li>
                    <li>• Software maintenance</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-2">Electronic System Requirements</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <h5 className="font-medium text-white">Security Features</h5>
                  <ul className="mt-1 space-y-1">
                    <li>• User authentication and access control</li>
                    <li>• Audit trail of changes</li>
                    <li>• Regular automated backups</li>
                    <li>• Encryption of sensitive data</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-white">Functionality</h5>
                  <ul className="mt-1 space-y-1">
                    <li>• Report generation capability</li>
                    <li>• Retest scheduling and alerts</li>
                    <li>• Barcode/QR code integration</li>
                    <li>• Export options (PDF, CSV)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Record Retention */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-lg font-bold text-elec-yellow">04</span>
            </div>
            <h2 className="text-xl font-semibold">Record Retention and Disposal</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              How long you keep records and how you dispose of them properly are important considerations
              for compliance and legal protection.
            </p>

            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <h4 className="font-semibold text-elec-yellow mb-2">Recommended Retention Periods</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-start border-b border-gray-700 pb-2">
                  <span>Active equipment records</span>
                  <span className="text-elec-yellow font-medium">Lifetime of equipment + 5 years</span>
                </div>
                <div className="flex justify-between items-start border-b border-gray-700 pb-2">
                  <span>Disposed equipment records</span>
                  <span className="text-elec-yellow font-medium">5 years from disposal date</span>
                </div>
                <div className="flex justify-between items-start border-b border-gray-700 pb-2">
                  <span>Records following an incident</span>
                  <span className="text-elec-yellow font-medium">Indefinitely / as advised by legal</span>
                </div>
                <div className="flex justify-between items-start">
                  <span>Calibration certificates</span>
                  <span className="text-elec-yellow font-medium">5 years minimum</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Equipment Lifecycle Records</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <span className="text-green-400 font-bold text-xs">1</span>
                  </div>
                  <span>Acquisition: Date purchased, supplier, initial inspection</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <span className="text-blue-400 font-bold text-xs">2</span>
                  </div>
                  <span>Service life: All tests, repairs, modifications, incidents</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                    <span className="text-orange-400 font-bold text-xs">3</span>
                  </div>
                  <span>Disposal: Date, method, reason, authorisation</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <span className="text-purple-400 font-bold text-xs">4</span>
                  </div>
                  <span>Archive: Retain records for defined retention period</span>
                </div>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Important Warning
              </h4>
              <p className="text-sm">
                Never destroy records following an accident or incident, or when legal action is anticipated.
                Such destruction could be viewed as spoliation of evidence and may result in adverse legal consequences.
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

        {/* Section 05: Records for Defence */}
        <section className="mb-8 mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-lg font-bold text-elec-yellow">05</span>
            </div>
            <h2 className="text-xl font-semibold">Records as Legal Defence</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              In the event of an incident or HSE investigation, your records serve as crucial evidence
              that you took reasonable steps to ensure safety.
            </p>

            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">What Records Demonstrate</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Systematic approach to electrical safety</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Risk-based testing frequency</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Competent persons conducting tests</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Proper calibrated equipment used</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Failed equipment was removed from service</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Ongoing compliance and improvement</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-2">Investigation Scenarios</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <h5 className="font-medium text-white">HSE Investigation</h5>
                  <p className="text-gray-300 mt-1">
                    Inspectors will examine your testing regime, records, and competency. Good records showing
                    a systematic approach demonstrate compliance with Regulation 4 of EAWR.
                  </p>
                </div>
                <div>
                  <h5 className="font-medium text-white">Insurance Claim</h5>
                  <p className="text-gray-300 mt-1">
                    Insurers may require evidence of maintenance and testing. Claims can be denied if
                    you cannot demonstrate reasonable care through documented testing.
                  </p>
                </div>
                <div>
                  <h5 className="font-medium text-white">Civil Action</h5>
                  <p className="text-gray-300 mt-1">
                    In personal injury claims, records help demonstrate the foreseeability of the hazard
                    and the reasonable steps taken to prevent harm.
                  </p>
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
              <h4 className="font-semibold text-white mb-3">Implementing a Record System</h4>
              <ol className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 text-xs font-bold text-elec-yellow">1</span>
                  <span>Audit existing equipment and create initial asset register</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 text-xs font-bold text-elec-yellow">2</span>
                  <span>Choose appropriate record system (paper or electronic)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 text-xs font-bold text-elec-yellow">3</span>
                  <span>Define unique identification system for all equipment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 text-xs font-bold text-elec-yellow">4</span>
                  <span>Establish data entry procedures and responsibilities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 text-xs font-bold text-elec-yellow">5</span>
                  <span>Set up backup and retention procedures</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 text-xs font-bold text-elec-yellow">6</span>
                  <span>Train all relevant personnel on the system</span>
                </li>
              </ol>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-orange-400 mb-2">Common Mistakes to Avoid</h4>
              <ul className="text-sm space-y-1">
                <li>• Recording only pass/fail without actual test values</li>
                <li>• Failing to update records when equipment moves location</li>
                <li>• Not documenting repairs or modifications</li>
                <li>• Incomplete tester identification</li>
                <li>• Inconsistent or missing dates</li>
                <li>• No backup of electronic records</li>
                <li>• Premature destruction of disposed equipment records</li>
              </ul>
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
            <h3 className="font-semibold text-elec-yellow mb-4">Quick Reference: Record Keeping Checklist</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-white mb-2">For Each Test Record</h4>
                <ul className="space-y-1 text-gray-300">
                  <li>□ Asset ID number</li>
                  <li>□ Equipment description</li>
                  <li>□ Test date</li>
                  <li>□ Tester name/ID</li>
                  <li>□ All test values</li>
                  <li>□ Pass/Fail outcome</li>
                  <li>□ Next test date</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">System Requirements</h4>
                <ul className="space-y-1 text-gray-300">
                  <li>□ Regular backups</li>
                  <li>□ Access controls</li>
                  <li>□ Audit trail</li>
                  <li>□ 5+ year retention</li>
                  <li>□ Report capability</li>
                  <li>□ Retest reminders</li>
                  <li>□ Disposal tracking</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-8">
          <Quiz
            title="Section 2 Quiz: Record Keeping & Legal Requirements"
            questions={quizQuestions}
            passingScore={80}
          />
        </section>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-gray-800">
          <Link to="/electrical-upskilling/pat-testing/module5/section1">
            <Button variant="outline" className="w-full sm:w-auto border-gray-700 hover:bg-gray-800 touch-manipulation min-h-[44px]">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous: PAT Labels
            </Button>
          </Link>
          <Link to="/electrical-upskilling/pat-testing/module5/section3">
            <Button className="w-full sm:w-auto bg-elec-yellow text-gray-900 hover:bg-elec-yellow/90 touch-manipulation min-h-[44px]">
              Next: Asset Register Management
              <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default PATTestingModule5Section2;
