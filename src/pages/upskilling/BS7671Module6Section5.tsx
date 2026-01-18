import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "bs7671-m6s5-check1",
    question: "What are the most common types of certification errors during electrical inspections?",
    options: [
      "Minor spelling mistakes only",
      "Incorrect circuit descriptions, wrong protective device ratings, incomplete test records",
      "Paper quality issues",
      "Colour of forms used"
    ],
    correctIndex: 1,
    explanation: "Common errors include incorrect circuit descriptions, wrong protective device ratings, incomplete testing records, missing observations, incorrect earthing arrangements documentation, and failure to record limitations. These errors can invalidate certificates and create legal liability."
  },
  {
    id: "bs7671-m6s5-check2",
    question: "How should certification errors be corrected once identified?",
    options: [
      "Simply cross out and initial the error",
      "Ignore minor errors if the installation works",
      "Issue formal correction notices with traceable amendments",
      "Start the entire certification process again"
    ],
    correctIndex: 2,
    explanation: "Errors must be corrected through formal amendment procedures, including issuing correction notices, updating all relevant documentation, re-testing if necessary, and notifying all relevant parties. The original certificate should never be altered - corrections must be traceable and documented."
  },
  {
    id: "bs7671-m6s5-check3",
    question: "What quality assurance procedures help prevent certification errors?",
    options: [
      "Working faster to finish sooner",
      "Using cheaper test equipment",
      "Peer reviews, standardised checklists, and systematic verification procedures",
      "Delegating all testing to apprentices"
    ],
    correctIndex: 2,
    explanation: "Effective QA includes peer reviews, standardised checklists, systematic verification procedures, proper training programs, regular competency assessments, and comprehensive documentation systems. Independent verification of critical measurements and calculations is essential."
  }
];

const faqs = [
  {
    question: "What happens if I discover an error on a certificate after issuing it?",
    answer: "You must issue a formal correction notice immediately, notify the client and any other parties who received the original, and maintain a clear audit trail of the correction. Never alter original documents - corrections must be traceable."
  },
  {
    question: "Can certification errors invalidate insurance coverage?",
    answer: "Yes. Major certification errors, especially those affecting safety assessments, can void insurance coverage and create legal liability. Professional indemnity insurance may not cover claims arising from gross negligence or falsified certificates."
  },
  {
    question: "How can I prevent transcription errors when recording test results?",
    answer: "Use standardised recording forms, double-check readings before writing them down, use digital test equipment with data logging where possible, and have a colleague verify critical readings. Take your time and avoid rushing."
  }
];

const quizQuestion = {
  question: "An electrician discovers that test results on a recently issued EIC were transposed between two circuits. What is the correct response?",
  options: [
    "Ignore it as the installation is safe overall",
    "Wait until the next periodic inspection to correct it",
    "Issue a formal correction notice and notify the client immediately",
    "Recall and destroy the original certificate"
  ],
  correctAnswer: 2,
  explanation: "The correct response is to issue a formal correction notice and notify the client immediately. The original certificate should be retained with the correction notice, maintaining a clear audit trail. Re-testing may be required if there's any doubt about which results apply to which circuit."
};

const BS7671Module6Section5 = () => {
  useSEO({
    title: "Certification Errors and Quality Control | BS7671 Module 6.5",
    description: "Learn about common certification errors, quality control systems, and error correction procedures under BS 7671."
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/bs7671-module-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 6.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Certification Errors and Quality Control
          </h1>
          <p className="text-white/80">
            Preventing, identifying, and correcting certification errors to maintain professional standards
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Prevention:</strong> Standardised checklists and peer reviews</li>
              <li><strong>Detection:</strong> Systematic verification before issue</li>
              <li><strong>Correction:</strong> Formal amendment with audit trail</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Transcription errors, missing data, incorrect calculations</li>
              <li><strong>Use:</strong> QA checklists before every certificate issue</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify common types of certification errors and their causes",
              "Implement quality control procedures to prevent errors",
              "Apply systematic error correction and amendment procedures",
              "Understand legal implications and professional responsibilities"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1: Common Certification Errors */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Common Certification Errors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Certification errors can have serious legal and safety consequences, potentially invalidating
              insurance coverage and creating liability for electricians. Understanding error types helps
              prevent them.
            </p>

            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Critical Impact</p>
              <p className="text-sm text-white">
                Certification errors can invalidate electrical certificates, void insurance coverage, create
                legal liability, and compromise safety. Every error represents a failure in professional standards.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Circuit Description Errors</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Wrong circuit numbers or descriptions</li>
                  <li>Missing or incomplete circuit details</li>
                  <li>Incorrect design current calculations</li>
                  <li>Wrong cable types or sizes recorded</li>
                  <li>Incorrect reference methods documented</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Protective Device Errors</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Wrong MCB/RCBO type curves recorded</li>
                  <li>Incorrect current ratings documented</li>
                  <li>Wrong RCD sensitivity or type recorded</li>
                  <li>Missing or incorrect kA ratings</li>
                  <li>AFDD, SPD documentation errors</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-3">Test Result Recording Errors:</p>
              <div className="grid grid-cols-3 gap-3 text-center text-sm">
                <div className="p-3 rounded bg-transparent border border-white/10">
                  <p className="font-medium text-white mb-1">Transcription</p>
                  <p className="text-white/90 text-xs">Reading/writing errors</p>
                </div>
                <div className="p-3 rounded bg-transparent border border-white/10">
                  <p className="font-medium text-white mb-1">Units</p>
                  <p className="text-white/90 text-xs">mΩ/Ω conversion</p>
                </div>
                <div className="p-3 rounded bg-transparent border border-white/10">
                  <p className="font-medium text-white mb-1">Calculations</p>
                  <p className="text-white/90 text-xs">Decimal/rounding</p>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[0]} />
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 2: Quality Control Systems */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Quality Control Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Systematic quality assurance prevents errors before they occur. Implementing robust QA
              procedures protects both electricians and clients from the consequences of certification errors.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Pre-Certification Checks</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Confirm installation matches approved designs</li>
                  <li>Verify all components meet specifications</li>
                  <li>Check compliance with BS 7671 requirements</li>
                  <li>Prepare comprehensive test schedules</li>
                  <li>Confirm tester qualifications</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Testing Quality Assurance</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Regular calibration schedules</li>
                  <li>Pre-use equipment checks</li>
                  <li>Double-checking critical readings</li>
                  <li>Real-time result validation</li>
                  <li>Peer review of critical results</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 my-6">
              <p className="text-sm font-medium text-green-400/80 mb-2">QA Framework Benefits</p>
              <ul className="text-sm text-white space-y-1">
                <li>Reduces error rate by 90%+ when properly implemented</li>
                <li>Protects professional reputation and liability</li>
                <li>Improves client confidence and satisfaction</li>
                <li>Supports competent person scheme compliance</li>
              </ul>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[2]} />
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 3: Error Correction Procedures */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Error Correction Procedures
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When errors are discovered, they must be corrected through formal procedures that maintain
              traceability and protect all parties involved.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Immediate Response Protocol</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Acknowledge and document the error immediately</li>
                  <li>Evaluate safety implications and urgency</li>
                  <li>Inform affected parties within 24 hours</li>
                  <li>Stop related activities if safety is compromised</li>
                  <li>Preserve evidence and document circumstances</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Amendment Process</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Issue formal written amendments</li>
                  <li>Keep original documents with corrections</li>
                  <li>Implement clear document versioning</li>
                  <li>Ensure all parties receive corrections</li>
                  <li>Maintain complete correction history</li>
                </ul>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[1]} />
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 4: Legal Implications */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Legal Implications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Certification errors carry significant legal implications, affecting both criminal and civil
              liability for electricians and their employers.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-sm font-medium text-red-400/80 mb-2">Criminal Liability</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Health and Safety at Work Act 1974</li>
                  <li>Electricity at Work Regulations 1989</li>
                  <li>CDM Regulations</li>
                  <li>Corporate Manslaughter Act 2007</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <p className="text-sm font-medium text-orange-400/80 mb-2">Civil Liability</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Negligence claims and damages</li>
                  <li>Breach of contract actions</li>
                  <li>Professional indemnity claims</li>
                  <li>Third-party compensation claims</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Real World Example */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">Real World Example</h2>
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <p className="text-sm font-medium text-red-400/80 mb-2">Manchester Office Building - Certification Error Case</p>
            <p className="text-sm text-white mb-3">
              A £180,000 electrical contract with 45 distribution boards had major certification errors
              discovered during client handover, causing contract delays and professional reputation damage.
            </p>
            <p className="text-sm font-medium text-white mb-2">Errors Found:</p>
            <ul className="text-sm text-white space-y-1 ml-4 mb-3">
              <li>60% of circuit descriptions incorrectly documented</li>
              <li>Multiple transcription errors in protective device ratings</li>
              <li>Earth loop impedance values transposed between circuits</li>
              <li>Wrong RCD sensitivity ratings recorded</li>
            </ul>
            <p className="text-sm text-elec-yellow/80">
              <strong>Lesson:</strong> Systematic QA procedures would have caught these errors before certificate
              issue, saving significant time, cost, and reputation damage.
            </p>
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Practical Guidance Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Pre-Issue Verification</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Review all test results against BS 7671 limits before signing</li>
                <li>Cross-check circuit descriptions against actual installation</li>
                <li>Verify protective device ratings match design specifications</li>
                <li>Confirm all required tests have been completed and recorded</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Pitfalls to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Rushing:</strong> Time pressure is the leading cause of transcription errors</li>
                <li><strong>Copy/paste:</strong> Re-using old certificates without updating all fields</li>
                <li><strong>Assumptions:</strong> Recording values from memory instead of actual readings</li>
                <li><strong>Delegation:</strong> Signing certificates without personally verifying data</li>
              </ul>
            </div>
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* FAQ Section */}
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

        {/* Quick Reference Card */}
        <div className="mt-6 p-5 rounded-lg bg-transparent border border-white/10">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference - Error Prevention Checklist</h3>
          <div className="grid sm:grid-cols-3 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-elec-yellow/80 mb-1">Before Testing</p>
              <ul className="space-y-0.5">
                <li>Calibrated equipment</li>
                <li>Correct test forms</li>
                <li>Design documentation</li>
                <li>Circuit identification</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-elec-yellow/80 mb-1">During Testing</p>
              <ul className="space-y-0.5">
                <li>Real-time recording</li>
                <li>Double-check readings</li>
                <li>Note anomalies</li>
                <li>Verify units</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-elec-yellow/80 mb-1">Before Issue</p>
              <ul className="space-y-0.5">
                <li>Peer review</li>
                <li>Calculation check</li>
                <li>Completeness audit</li>
                <li>Signature verification</li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="border-white/5 my-12" />

        {/* Quiz Section */}
        <section className="mb-10">
          <SingleQuestionQuiz
            question={quizQuestion.question}
            options={quizQuestion.options}
            correctAnswer={quizQuestion.correctAnswer}
            explanation={quizQuestion.explanation}
          />
        </section>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/bs7671-module-6-section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/bs7671-module-6-section-6">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BS7671Module6Section5;
