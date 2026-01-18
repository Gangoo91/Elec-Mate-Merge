import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "emergencylighting-m6s4-check1",
    question: "Why is documentation as important as the installation itself?",
    options: ["It reduces costs", "It provides legal compliance evidence", "It improves light output", "It extends battery life"],
    correctIndex: 1,
    explanation: "Documentation provides legal evidence that the system was designed, installed, tested, and maintained correctly. Without a complete paper trail, compliance cannot be demonstrated regardless of system performance."
  },
  {
    id: "emergencylighting-m6s4-check2",
    question: "Where should emergency lighting records normally be stored?",
    options: ["In a locked safe off-site", "Near the fire alarm panel or security office", "With the building owner at home", "In a computer only"],
    correctIndex: 1,
    explanation: "Records must be kept on-site and immediately accessible to inspectors, typically near the main fire alarm panel or security office, with both digital and paper copies available."
  },
  {
    id: "emergencylighting-m6s4-check3",
    question: "How long must emergency lighting records be retained?",
    options: ["1 year", "3 years", "At least 6 years", "12 months only"],
    correctIndex: 2,
    explanation: "Records should be retained for at least 6 years, ideally for the life of the installation. This ensures a complete system history is available for inspections and demonstrates ongoing compliance."
  }
];

const faqs = [
  {
    question: "Can digital records replace paper ones?",
    answer: "Yes, if they're securely stored, easily accessible, and printable during an inspection. However, you must be able to produce them immediately when requested, so both digital backups and readily available paper copies are recommended."
  },
  {
    question: "Who is responsible for maintaining documentation?",
    answer: "The building's Responsible Person under the RRO 2005, often supported by maintenance contractors. The Responsible Person has ultimate legal accountability for ensuring all records are complete, accurate, and accessible."
  },
  {
    question: "What happens if documents are missing during an audit?",
    answer: "Missing documentation can result in Improvement Notices requiring corrective action, Prohibition Notices restricting building use, or fines and prosecution for serious breaches - even if the physical system works correctly."
  },
  {
    question: "What certificates are required at handover?",
    answer: "Commissioning certificate (BS 5266-1 Annex G), Electrical Installation Certificate (BS 7671), and Design Declaration Certificate verifying standards compliance. These form the core of compliance demonstration."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "During a fire safety audit, which three documents form the core of compliance demonstration?",
    options: [
      "Invoice, warranty card, and delivery note",
      "System drawings, logbook, and commissioning certificate",
      "Building plans, insurance policy, and tenancy agreement",
      "Manufacturer brochure, price list, and installation photos"
    ],
    correctAnswer: 1,
    explanation: "The three core documents are: (1) System design drawings, (2) Emergency lighting logbook with all monthly and annual test entries, and (3) Commissioning certificate (BS 5266-1 Annex G)."
  }
];

const EmergencyLightingModule6Section4 = () => {
  useSEO({
    title: "Documentation for Audits and Fire Authorities | Emergency Lighting Module 6.4",
    description: "Learn BS 5266-1 documentation requirements for emergency lighting audits, Fire Authority inspections, and compliance record-keeping under UK fire safety regulations."
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
            <Link to="/electrician/upskilling/emergency-lighting-module-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 6
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 6.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Documentation for Audits and Fire Authorities
          </h1>
          <p className="text-white/80">
            Maintaining compliance records and audit-ready documentation
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Key:</strong> Documentation = compliance</li>
              <li><strong>Retention:</strong> Minimum 6 years</li>
              <li><strong>Location:</strong> On-site, accessible</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Core Documents</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Logbook:</strong> Test records</li>
              <li><strong>Certificate:</strong> BS 5266-1 Annex G</li>
              <li><strong>Drawings:</strong> As-built system</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand documentation requirements",
              "Prepare for Fire Authority audits",
              "Maintain compliant records",
              "Avoid common audit failures",
              "Present accessible documentation",
              "Protect against legal liability"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The Role of Documentation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Emergency lighting is among the first items inspected during fire safety audits.
              Even a perfectly functioning system can fail inspection if required documentation
              is missing, incomplete, or inconsistent.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Documentation Proves</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Design to correct standards</li>
                  <li>Proper installation</li>
                  <li>Regular testing and maintenance</li>
                  <li>Responsible Person compliance</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Legal Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li>RRO 2005 obligations</li>
                  <li>BS 5266-1 standards</li>
                  <li>BS 7671 certification</li>
                  <li>Available on request</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Evidence</p>
                <p className="text-white/90 text-xs">Legal proof</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Accessible</p>
                <p className="text-white/90 text-xs">On-site always</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Complete</p>
                <p className="text-white/90 text-xs">Full history</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Documents Required for Audits
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Fire Authorities expect specific documentation during inspections.
              Having these readily available demonstrates professional compliance.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Design and Installation:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>System design drawings and risk-based design statements</li>
                <li>Specification documents referencing BS 5266-1 and EN 1838</li>
                <li>Cable routing and circuit identification plans</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Testing and Maintenance:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Emergency lighting logbook with all test entries</li>
                <li>Records of remedial work and component replacement</li>
                <li>Proof of failed luminaire repairs and retests</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Certification:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Commissioning certificate (BS 5266-1 Annex G)</li>
                <li>Electrical Installation Certificate (BS 7671)</li>
                <li>Design Declaration Certificate</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Common Audit Failures
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Fire inspectors regularly identify recurring documentation issues that
              lead to enforcement action, even when the physical system works correctly.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-sm font-medium text-red-400 mb-2">Common Failures</p>
                <ul className="text-xs text-white space-y-1">
                  <li>Missing or incomplete logbook entries</li>
                  <li>Unsigned or misdated certificates</li>
                  <li>Out-of-date fire risk assessments</li>
                  <li>Drawing/installation mismatch</li>
                  <li>No 3-hour duration test evidence</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <p className="text-sm font-medium text-orange-400 mb-2">Consequences</p>
                <ul className="text-xs text-white space-y-1">
                  <li>Improvement Notices</li>
                  <li>Prohibition Notices</li>
                  <li>Fines for breaches</li>
                  <li>Prosecution in serious cases</li>
                  <li>Insurance implications</li>
                </ul>
              </div>
            </div>

            <p>
              Such issues can result in enforcement action regardless of whether
              the emergency lighting system physically operates correctly.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Record Accessibility</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Keep on-site near fire alarm panel</li>
                <li>Maintain both digital and paper copies</li>
                <li>Ensure logbooks are legible and signed</li>
                <li>Retain records for minimum 6 years</li>
                <li>Update drawings after modifications</li>
                <li>Include fire risk assessment copies</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Avoid These Errors</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Incomplete entries:</strong> — All fields must be completed</li>
                <li><strong>Missing signatures:</strong> — Tester must sign each entry</li>
                <li><strong>Wrong dates:</strong> — Certificates must match installation</li>
                <li><strong>Outdated drawings:</strong> — Must reflect current system</li>
              </ul>
            </div>
          </div>
        </section>

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

        {/* Quick Reference */}
        <div className="mt-6 p-5 rounded-lg bg-transparent">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">Required Documents</p>
              <ul className="space-y-0.5">
                <li>Design drawings</li>
                <li>Test logbook</li>
                <li>Commissioning certificate</li>
                <li>Fire risk assessment</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Record Keeping</p>
              <ul className="space-y-0.5">
                <li>Retain: 6 years minimum</li>
                <li>Location: on-site</li>
                <li>Format: digital + paper</li>
                <li>Signed: all entries</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <section className="mb-10 mt-12">
          <SingleQuestionQuiz
            title="Test Your Knowledge"
            questions={quizQuestions}
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
            <Link to="/electrician/upskilling/emergency-lighting-module-6-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/emergency-lighting-module-6">
              Complete Module 6
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EmergencyLightingModule6Section4;
