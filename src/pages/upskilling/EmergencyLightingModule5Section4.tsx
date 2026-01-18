import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "emergencylighting-m5s4-check1",
    question: "Why must emergency lighting circuits be labelled separately from normal lighting circuits?",
    options: ["For aesthetic reasons", "To ensure safe isolation and rapid identification during maintenance", "Only required for large installations", "Building regulations only"],
    correctIndex: 1,
    explanation: "Separate labelling ensures electricians and maintenance staff can quickly identify and isolate emergency circuits without accidentally disconnecting life-safety systems. This prevents dangerous mistakes during maintenance and allows fire inspectors to verify dedicated protection."
  },
  {
    id: "emergencylighting-m5s4-check2",
    question: "Name three system components that must be labelled for compliance.",
    options: ["Cables, switches, and fuses only", "Luminaires, distribution boards, and test points", "Walls, ceilings, and floors", "Only the main control panel"],
    correctIndex: 1,
    explanation: "Luminaires (with circuit references and maintained/non-maintained status), distribution boards (clearly marked as Emergency Lighting Circuits Only), and test points or key switches (identified for monthly functional checks) must all be labelled."
  },
  {
    id: "emergencylighting-m5s4-check3",
    question: "What must always be recorded after a failed luminaire test?",
    options: ["Only the date", "The fault, luminaire reference, remedial action, and re-test result", "Nothing if fixed immediately", "Just the pass/fail result"],
    correctIndex: 1,
    explanation: "Complete records must include the specific fault found, luminaire reference number, date of failure, remedial action taken, who carried out the work, and the re-test result confirming the fault has been rectified. This creates a complete audit trail."
  }
];

const faqs = [
  {
    question: "Can labels be handwritten?",
    answer: "No - labels must be durable, permanent, and legible under fire conditions. Handwritten labels fade, peel, and are unacceptable to fire inspectors. Use engraved or industrial label printers (Brady, Dymo XTL, Brother) to produce professional, long-lasting labels that comply with BS 5266-1 requirements."
  },
  {
    question: "Is a paper logbook enough?",
    answer: "Yes, but electronic systems are recommended for large sites to reduce errors. A bound paper logbook is legally acceptable and remains the most common method for small to medium installations. For sites with 100+ luminaires, digital maintenance software offers automated reminders, fault alerts, cloud backup, and instant compliance reporting."
  },
  {
    question: "Who is responsible for keeping records up to date?",
    answer: "The building's Responsible Person under the Fire Safety Order, often supported by contractors. While routine testing can be delegated to competent staff or contractors, the Responsible Person retains ultimate legal responsibility and must ensure systems are in place to maintain compliance."
  },
  {
    question: "What legal risk arises from not keeping maintenance records?",
    answer: "The Responsible Person can face enforcement notices, unlimited fines, criminal prosecution, and even imprisonment under the Regulatory Reform (Fire Safety) Order 2005. Insurance policies may become void, and civil liability increases significantly if fire-related injury or death occurs due to non-compliance."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A fire inspector finds emergency lighting records are missing for 6 months. What is the likely consequence?",
    options: [
      "Verbal warning only",
      "Enforcement notice, potential prosecution, and invalid insurance",
      "No consequence if the system works",
      "Small fine only"
    ],
    correctAnswer: 1,
    explanation: "Missing or incomplete records can result in enforcement notices from the Fire and Rescue Authority, invalid insurance policies, criminal prosecution of the Responsible Person, unlimited fines, up to 2 years imprisonment, and significantly increased civil liability."
  }
];

const EmergencyLightingModule5Section4 = () => {
  useSEO({
    title: "System Labelling and Maintenance Records | Emergency Lighting Module 5.4",
    description: "Documentation, compliance, and legal requirements for emergency lighting systems. BS 5266-1 labelling requirements and maintenance record keeping."
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
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 5.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            System Labelling and Maintenance Records
          </h1>
          <p className="text-white/80">
            Documentation, compliance, and legal requirements for emergency lighting systems
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Labelling:</strong> Durable, permanent, legible</li>
              <li><strong>Records:</strong> Legal requirement under RRO 2005</li>
              <li><strong>Consequence:</strong> Prosecution for missing records</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Must Label</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Luminaires:</strong> Circuit ref and M/NM status</li>
              <li><strong>DBs:</strong> Emergency Lighting Circuits Only</li>
              <li><strong>Test points:</strong> Monthly check identification</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand labelling requirements under BS 5266-1",
              "Identify which components require labelling",
              "Maintain compliant maintenance records",
              "Understand legal requirements under RRO 2005",
              "Use digital vs paper logbook systems",
              "Avoid common documentation failures"
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
            Importance of Labelling
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Clear labelling ensures that emergency lighting systems can be safely maintained,
              tested, and inspected without confusion or risk. It provides essential information
              to electricians, fire officers, and building managers, enabling rapid fault-finding
              and compliance verification.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Labelling Ensures</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Circuits can be isolated safely</li>
                  <li>Test points are quickly identified</li>
                  <li>Emergency fittings distinguished from normal</li>
                  <li>Fire inspectors can verify efficiently</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Label Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Durable, legible, and permanent</li>
                  <li>Exit signs: ISO 7010 pictograms</li>
                  <li>DBs: Emergency Lighting Circuits Only</li>
                  <li>Engraved or industrial label printers</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Durable</p>
                <p className="text-white/90 text-xs">Fire conditions</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Permanent</p>
                <p className="text-white/90 text-xs">No handwriting</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Legible</p>
                <p className="text-white/90 text-xs">Clear identification</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            What Needs Labelling
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 5266-1 and BS 7671 specify which components of an emergency lighting system
              must be clearly identified. Every critical element requires appropriate labelling
              to ensure safe operation and maintenance.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Components Requiring Labels:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Luminaires:</strong> Maintained or non-maintained, with circuit references</li>
                <li><strong>Distribution boards:</strong> Clearly marked as supplying emergency circuits</li>
                <li><strong>Test points / key switches:</strong> Identified for monthly functional checks</li>
                <li><strong>Cabling:</strong> Where accessible, labelled as Fire-Resistant Emergency Lighting Supply</li>
                <li><strong>Logbooks:</strong> Must reference labelled circuits for easy correlation</li>
              </ul>
            </div>

            <p>
              Always cross-reference luminaire numbers on the drawings with those in the logbook
              to ensure accurate identification during maintenance.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Maintenance Records
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Maintenance documentation is essential for proving compliance with the Regulatory
              Reform (Fire Safety) Order 2005. Incomplete or missing records render testing
              legally worthless, even if the physical system is functioning perfectly.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Records Must Include</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Dates and results of tests</li>
                  <li>Details of any faults found</li>
                  <li>Repairs or remedial work carried out</li>
                  <li>Battery replacements and upgrades</li>
                  <li>Commissioning and certification evidence</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Test Entry Details</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Date and test type</li>
                  <li>Luminaire reference</li>
                  <li>Pass/fail result</li>
                  <li>Fault description if failed</li>
                  <li>Engineer name and company</li>
                </ul>
              </div>
            </div>

            <p>
              For large sites, use digital maintenance software to store records. This provides
              automated reminders, fault alerts, cloud backup, and instant compliance reporting.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Legal and Regulatory Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Under the Regulatory Reform (Fire Safety) Order 2005, the Responsible Person has
              a legal duty to maintain life-safety systems in efficient working order. Maintenance
              records provide the only evidence that this duty has been fulfilled.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Legal Consequences of Missing Records:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Enforcement notices requiring immediate action</li>
                <li>Invalid insurance policies</li>
                <li>Criminal prosecution, unlimited fines</li>
                <li>Up to 2 years imprisonment</li>
                <li>Increased civil liability in fire-related injury or death</li>
              </ul>
            </div>

            <p>
              Fire inspectors and insurers may request records at any time. The Responsible
              Person (usually the building owner, employer, or facilities manager) has legal
              accountability for maintaining life-safety systems and ensuring records are
              complete and accurate.
            </p>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Documentation Checklist</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Use engraved or industrial label printers (not handwritten)</li>
                <li>Cross-reference luminaire numbers between drawings and logbooks</li>
                <li>Record all tests including passes, not just failures</li>
                <li>Maintain records for the lifetime of the installation</li>
                <li>Consider digital systems for sites with 100+ luminaires</li>
                <li>Ensure records are accessible for fire inspector audits</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Documentation Failures</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Handwritten labels:</strong> Fade, peel, unacceptable to inspectors</li>
                <li><strong>Gaps in testing:</strong> 3-6 month gaps trigger enforcement</li>
                <li><strong>Missing commissioning records:</strong> No proof of initial compliance</li>
                <li><strong>No remedial work evidence:</strong> Fault fixed but not documented</li>
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
              <p className="font-medium text-white mb-1">Labelling Requirements</p>
              <ul className="space-y-0.5">
                <li>Luminaires: Circuit ref + M/NM</li>
                <li>DBs: Emergency Lighting Only</li>
                <li>Test points: Identified</li>
                <li>Cabling: Fire-resistant labelled</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Record Requirements</p>
              <ul className="space-y-0.5">
                <li>Test dates and results</li>
                <li>Faults and remedial work</li>
                <li>Battery replacements</li>
                <li>Commissioning evidence</li>
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
            <Link to="/electrician/upskilling/emergency-lighting-module-5-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/emergency-lighting-module-5-section-5">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EmergencyLightingModule5Section4;
