import { ArrowLeft, FileText, CheckCircle, Scale, Clock, Shield, AlertTriangle, Zap, HelpCircle, ClipboardList, ChevronRight, ChevronLeft } from "lucide-react";
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
  { question: "Under the Electricity at Work Regulations 1989, who has a duty to maintain electrical equipment safely?", options: ["Only qualified electricians", "Equipment manufacturers only", "Duty holders including employers and employees", "Local authorities"], correctAnswer: 2 },
  { question: "What is the primary purpose of maintaining PAT test records?", options: ["To increase company profits", "To demonstrate due diligence and compliance", "To keep testers busy", "To satisfy customers only"], correctAnswer: 1 },
  { question: "Which document provides guidance on PAT testing but is NOT legally binding?", options: ["HASAWA 1974", "EAWR 1989", "IET Code of Practice", "All are legally binding"], correctAnswer: 2 },
  { question: "What information should be recorded about the person conducting PAT tests?", options: ["Just their first name", "Name, qualifications, and signature/ID", "Nothing - it's not required", "Their age only"], correctAnswer: 1 },
  { question: "In the event of an accident involving electrical equipment, records should be:", options: ["Destroyed immediately", "Kept indefinitely or as advised by legal counsel", "Kept for 6 months only", "Not relevant to investigations"], correctAnswer: 1 },
  { question: "What does 'due diligence' mean in the context of PAT testing?", options: ["Testing as fast as possible", "Taking all reasonable steps to ensure safety", "Only testing new equipment", "Avoiding documentation"], correctAnswer: 1 },
  { question: "Electronic PAT record systems should include which security feature?", options: ["No backup needed", "Audit trail and data protection", "Open access to everyone", "Manual entry only"], correctAnswer: 1 },
  { question: "What happens to PAT records when equipment is disposed of?", options: ["Delete immediately", "Retain for defined period showing disposal date", "Transfer to new owner only", "Records not needed for disposed equipment"], correctAnswer: 1 },
  { question: "Which Regulation specifically addresses electrical equipment maintenance?", options: ["Regulation 4 of EAWR", "Regulation 1 of HASAWA", "Building Regulation Part P", "Fire Safety Order"], correctAnswer: 0 },
  { question: "What constitutes a legally defensible PAT testing regime?", options: ["Testing every 3 months regardless of risk", "Risk-based intervals with comprehensive records", "No formal records needed if equipment looks safe", "Verbal confirmation only"], correctAnswer: 1 }
];

const faqs = [
  { question: "Is PAT testing a legal requirement?", answer: "PAT testing itself isn't specifically mandated by law, but the Electricity at Work Regulations 1989 require electrical equipment to be maintained to prevent danger. PAT testing is a recognised method of demonstrating compliance with this duty." },
  { question: "Can I keep PAT records electronically?", answer: "Yes, electronic records are acceptable and often preferred. They should be secure, backed up regularly, and include audit trails. The system should allow easy retrieval of historical data and generation of reports." },
  { question: "Who can access PAT test records?", answer: "Records should be accessible to relevant duty holders, HSE inspectors, insurance companies, and auditors. Access should be controlled under GDPR principles if personal data is included." },
  { question: "What if I can't find historical PAT records?", answer: "Missing records represent a compliance gap. Immediately test all equipment without records and establish proper record-keeping systems. Document the gap and actions taken to address it." },
  { question: "Do contractors' equipment records need to be kept?", answer: "Yes, you should verify contractors' equipment is tested and may need to retain copies of their test certificates while they work on your premises. This demonstrates your due diligence." },
  { question: "How do records help in accident investigations?", answer: "Records demonstrate your testing regime, equipment condition history, and compliance efforts. They can prove reasonable precautions were taken, which is crucial for legal defence and insurance claims." }
];

const PATTestingModule5Section2 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/pat-testing-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 pb-24">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-elec-yellow/10">
              <FileText className="h-6 w-6 text-elec-yellow" />
            </div>
            <span className="text-elec-yellow/80 text-sm font-medium">Module 5 - Section 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">Test Record Keeping & Legal Requirements</h1>
          <p className="text-white/60 text-base">Understanding your legal obligations and maintaining comprehensive records for compliance and protection</p>
          <div className="flex items-center gap-4 text-sm text-white/50">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> 15 min read</span>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
          <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
          <ul className="text-sm text-white space-y-1">
            <li>- PAT testing demonstrates compliance with HASAWA 1974 and EAWR 1989</li>
            <li>- Records must include asset ID, test date, tester details, all results, and outcomes</li>
            <li>- Retain records for minimum 5 years or equipment lifetime</li>
            <li>- Electronic systems with backups are recommended</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-400" /> Learning Outcomes
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {["Understand the legal framework governing PAT testing", "Identify minimum record-keeping requirements", "Implement compliant documentation systems", "Recognise duty holder responsibilities", "Apply records for accident investigation defence", "Maintain data security and retention policies"].map((outcome, i) => (
              <div key={i} className="flex items-start gap-2 text-white text-sm">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs flex items-center justify-center font-medium">{i + 1}</span>
                {outcome}
              </div>
            ))}
          </div>
        </div>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The Legal Framework
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>Understanding the legal framework is essential for any PAT tester. While PAT testing itself isn't explicitly required by law, it serves as a practical method of complying with broader electrical safety legislation.</p>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-red-400 mb-2">Health and Safety at Work Act 1974</h4>
              <p className="text-white/70 text-sm mb-3">Section 2 places a general duty on employers to ensure, so far as is reasonably practicable, the health, safety and welfare of employees. This includes providing safe equipment.</p>
              <ul className="text-white/70 text-sm space-y-1">
                <li>- Section 2(1): General duty to employees</li>
                <li>- Section 2(2)(a): Safe plant and systems of work</li>
                <li>- Section 3: Duty to non-employees (visitors, contractors)</li>
                <li>- Section 7: Employee duties to cooperate</li>
              </ul>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-2">Electricity at Work Regulations 1989 (EAWR)</h4>
              <p className="text-white/70 text-sm mb-3">These regulations specifically address electrical safety. Regulation 4(2) is particularly relevant:</p>
              <blockquote className="text-white/70 text-sm italic border-l-2 border-blue-500 pl-4 mb-3">"As may be necessary to prevent danger, all systems shall be maintained so as to prevent, so far as is reasonably practicable, such danger."</blockquote>
              <ul className="text-white/70 text-sm space-y-1">
                <li>- Regulation 4(2): Maintenance to prevent danger</li>
                <li>- Regulation 4(3): Work on equipment must be safe</li>
                <li>- Applies to all work activities</li>
                <li>- Criminal sanctions for non-compliance</li>
              </ul>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <h4 className="font-semibold text-elec-yellow mb-3">Key Legal Concepts</h4>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="text-white font-medium mb-1">Reasonably Practicable</h5>
                  <p className="text-white/70">Balancing risk reduction against cost, time and effort. You must do what's reasonable, not impossible.</p>
                </div>
                <div>
                  <h5 className="text-white font-medium mb-1">Due Diligence</h5>
                  <p className="text-white/70">Taking all reasonable steps to prevent harm. Records demonstrate you've exercised due diligence.</p>
                </div>
                <div>
                  <h5 className="text-white font-medium mb-1">Duty Holder</h5>
                  <p className="text-white/70">Person(s) responsible for electrical safety - typically employers, self-employed, or premises controllers.</p>
                </div>
                <div>
                  <h5 className="text-white font-medium mb-1">Competent Person</h5>
                  <p className="text-white/70">Someone with suitable training, knowledge and experience to conduct PAT testing safely.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Minimum Record Requirements
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>The IET Code of Practice provides guidance on what should be recorded. While the Regulations don't specify exact record formats, maintaining comprehensive records demonstrates compliance and supports due diligence.</p>

            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <h4 className="font-semibold text-elec-yellow mb-3 flex items-center gap-2"><ClipboardList className="h-5 w-5" /> Essential Record Elements</h4>
              <div className="space-y-3">
                <div className="border-l-2 border-elec-yellow pl-3">
                  <h5 className="font-medium text-white">Equipment Identification</h5>
                  <ul className="text-white/70 text-sm mt-1 space-y-1">
                    <li>- Unique asset ID number</li>
                    <li>- Equipment description/type</li>
                    <li>- Manufacturer and model</li>
                    <li>- Serial number (if available)</li>
                    <li>- Location/department</li>
                  </ul>
                </div>
                <div className="border-l-2 border-elec-yellow pl-3">
                  <h5 className="font-medium text-white">Test Information</h5>
                  <ul className="text-white/70 text-sm mt-1 space-y-1">
                    <li>- Date of test</li>
                    <li>- Tester name and signature/ID</li>
                    <li>- Test equipment used (with calibration date)</li>
                    <li>- Tests performed</li>
                    <li>- Actual test readings/values</li>
                  </ul>
                </div>
                <div className="border-l-2 border-elec-yellow pl-3">
                  <h5 className="font-medium text-white">Results and Actions</h5>
                  <ul className="text-white/70 text-sm mt-1 space-y-1">
                    <li>- Pass/Fail outcome</li>
                    <li>- Next test due date</li>
                    <li>- Remedial actions required</li>
                    <li>- Any observations or notes</li>
                    <li>- Equipment class (I, II, or III)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-green-400 mb-2">Good Practice</h4>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>- Record actual test values, not just pass/fail</li>
                  <li>- Include equipment photographs</li>
                  <li>- Document any repairs made</li>
                  <li>- Note condition observations</li>
                  <li>- Track equipment history over time</li>
                </ul>
              </div>
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-red-400 mb-2">Poor Practice</h4>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>- Recording only pass/fail status</li>
                  <li>- Missing tester identification</li>
                  <li>- No equipment serial numbers</li>
                  <li>- Inconsistent dating formats</li>
                  <li>- Illegible handwritten records</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Record Keeping Systems
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>Records can be maintained in various formats, from paper-based systems to sophisticated software. The key is consistency, accessibility, and security.</p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-3">Paper-Based Systems</h4>
                <div className="space-y-2 text-sm">
                  <p className="text-green-400 font-medium">Advantages:</p>
                  <ul className="text-white/70 space-y-1">
                    <li>- Low initial cost</li>
                    <li>- No technical knowledge required</li>
                    <li>- Immediate hard copy evidence</li>
                  </ul>
                  <p className="text-red-400 font-medium mt-2">Disadvantages:</p>
                  <ul className="text-white/70 space-y-1">
                    <li>- Difficult to search and analyse</li>
                    <li>- Risk of loss or damage</li>
                    <li>- Storage space requirements</li>
                  </ul>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-3">Electronic Systems</h4>
                <div className="space-y-2 text-sm">
                  <p className="text-green-400 font-medium">Advantages:</p>
                  <ul className="text-white/70 space-y-1">
                    <li>- Easy searching and reporting</li>
                    <li>- Automatic reminders for retests</li>
                    <li>- Integration with PAT testers</li>
                    <li>- Cloud backup options</li>
                  </ul>
                  <p className="text-red-400 font-medium mt-2">Disadvantages:</p>
                  <ul className="text-white/70 space-y-1">
                    <li>- Initial setup costs</li>
                    <li>- Training requirements</li>
                    <li>- Data security considerations</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-2">Electronic System Requirements</h4>
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <h5 className="font-medium text-white">Security Features</h5>
                  <ul className="text-white/70 mt-1 space-y-1">
                    <li>- User authentication and access control</li>
                    <li>- Audit trail of changes</li>
                    <li>- Regular automated backups</li>
                    <li>- Encryption of sensitive data</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-white">Functionality</h5>
                  <ul className="text-white/70 mt-1 space-y-1">
                    <li>- Report generation capability</li>
                    <li>- Retest scheduling and alerts</li>
                    <li>- Barcode/QR code integration</li>
                    <li>- Export options (PDF, CSV)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Record Retention and Disposal
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>How long you keep records and how you dispose of them properly are important considerations for compliance and legal protection.</p>

            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <h4 className="font-semibold text-elec-yellow mb-2">Recommended Retention Periods</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-start border-b border-white/10 pb-2">
                  <span className="text-white/70">Active equipment records</span>
                  <span className="text-white font-medium">Lifetime of equipment + 5 years</span>
                </div>
                <div className="flex justify-between items-start border-b border-white/10 pb-2">
                  <span className="text-white/70">Disposed equipment records</span>
                  <span className="text-white font-medium">5 years from disposal date</span>
                </div>
                <div className="flex justify-between items-start border-b border-white/10 pb-2">
                  <span className="text-white/70">Records following an incident</span>
                  <span className="text-white font-medium">Indefinitely / as advised by legal</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-white/70">Calibration certificates</span>
                  <span className="text-white font-medium">5 years minimum</span>
                </div>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-red-400 mb-2 flex items-center gap-2"><AlertTriangle className="h-5 w-5" /> Important Warning</h4>
              <p className="text-white/70 text-sm">Never destroy records following an accident or incident, or when legal action is anticipated. Such destruction could be viewed as spoliation of evidence and may result in adverse legal consequences.</p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Records as Legal Defence
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>In the event of an incident or HSE investigation, your records serve as crucial evidence that you took reasonable steps to ensure safety.</p>

            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <h4 className="font-semibold text-elec-yellow mb-3">What Records Demonstrate</h4>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-white/70">Systematic approach to electrical safety</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-white/70">Risk-based testing frequency</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-white/70">Competent persons conducting tests</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-white/70">Proper calibrated equipment used</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-white/70">Failed equipment was removed from service</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-white/70">Ongoing compliance and improvement</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-2">Investigation Scenarios</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <h5 className="font-medium text-white">HSE Investigation</h5>
                  <p className="text-white/70 mt-1">Inspectors will examine your testing regime, records, and competency. Good records showing a systematic approach demonstrate compliance with Regulation 4 of EAWR.</p>
                </div>
                <div>
                  <h5 className="font-medium text-white">Insurance Claim</h5>
                  <p className="text-white/70 mt-1">Insurers may require evidence of maintenance and testing. Claims can be denied if you cannot demonstrate reasonable care through documented testing.</p>
                </div>
                <div>
                  <h5 className="font-medium text-white">Civil Action</h5>
                  <p className="text-white/70 mt-1">In personal injury claims, records help demonstrate the foreseeability of the hazard and the reasonable steps taken to prevent harm.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-elec-yellow" /> Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Zap className="h-5 w-5 text-elec-yellow" /> Quick Reference: Record Keeping Checklist</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="bg-black/20 rounded-lg p-4">
              <h4 className="text-elec-yellow font-semibold mb-2">For Each Test Record</h4>
              <ul className="text-white space-y-1">
                <li>- Asset ID number</li>
                <li>- Equipment description</li>
                <li>- Test date</li>
                <li>- Tester name/ID</li>
                <li>- All test values</li>
                <li>- Pass/Fail outcome</li>
                <li>- Next test date</li>
              </ul>
            </div>
            <div className="bg-black/20 rounded-lg p-4">
              <h4 className="text-elec-yellow font-semibold mb-2">System Requirements</h4>
              <ul className="text-white space-y-1">
                <li>- Regular backups</li>
                <li>- Access controls</li>
                <li>- Audit trail</li>
                <li>- 5+ year retention</li>
                <li>- Report capability</li>
                <li>- Retest reminders</li>
                <li>- Disposal tracking</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">Module 5.2 Quiz</h2>
          <p className="text-white/60">Test your understanding of record keeping and legal requirements.</p>
          <Quiz questions={quizQuestions} moduleId="pat-m5s2" />
        </section>

        <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-white/10">
          <Link to="../section-1" className="flex-1">
            <Button variant="outline" className="w-full min-h-[48px] border-white/20 text-white hover:bg-white/10 gap-2 touch-manipulation active:scale-[0.98]">
              <ChevronLeft className="h-4 w-4" /> Previous: PAT Labels
            </Button>
          </Link>
          <Link to="../section-3" className="flex-1">
            <Button className="w-full min-h-[48px] bg-elec-yellow text-black hover:bg-elec-yellow/90 gap-2 touch-manipulation active:scale-[0.98]">
              Next: Asset Register Management <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PATTestingModule5Section2;
