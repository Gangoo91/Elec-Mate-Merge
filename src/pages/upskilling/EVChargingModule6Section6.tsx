import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "evcharging-m6s6-check1",
    question: "Within how many days must the customer receive their installation certificate?",
    options: ["7 days", "14 days", "28 days", "56 days"],
    correctIndex: 2,
    explanation: "BS 7671 requires that customers receive their installation certificate and associated documentation within 28 days of installation completion."
  },
  {
    id: "evcharging-m6s6-check2",
    question: "What are the main sections of an Electrical Installation Certificate (EIC)?",
    options: [
      "Customer details and payment information",
      "Installation details, design/construction, inspection/testing, declarations",
      "Product specifications and warranty terms",
      "Site survey and quotation"
    ],
    correctIndex: 1,
    explanation: "An EIC has four main sections: 1) Installation Details, 2) Design and Construction compliance, 3) Inspection and Testing results, and 4) Declarations and Signatures."
  },
  {
    id: "evcharging-m6s6-check3",
    question: "Which regulations make installation certificates mandatory for EV charging installations?",
    options: [
      "Health and Safety at Work Act only",
      "Building Regulations Part P and BS 7671",
      "OZEV grant requirements only",
      "Local authority planning permission"
    ],
    correctIndex: 1,
    explanation: "Installation certificates are legally required by Building Regulations Part P (notifiable electrical work) and BS 7671 (Wiring Regulations) for new electrical installations including EV charging."
  }
];

const faqs = [
  {
    question: "Can the customer refuse to accept the installation certificate?",
    answer: "Providing the certificate is a legal requirement. The customer must be informed that without it, they have no proof of compliance and may face insurance and legal issues. The installation is not complete until certificate handover."
  },
  {
    question: "What happens if test results don't meet the required standards?",
    answer: "The installation cannot be certified until all test results are satisfactory. Investigate and rectify any failures, then retest. Only issue the certificate when all tests pass the required standards."
  },
  {
    question: "How long should certificates and test results be retained?",
    answer: "Certificates and test results must be retained for the lifetime of the installation. Recommend customers keep copies in a safe place and consider digital backups for long-term storage."
  },
  {
    question: "Is notification to Building Control always required?",
    answer: "Notification is required unless the work is carried out by a competent person registered with an approved scheme. Most EV charging installations by registered electricians are self-certifying under Building Regulations Part P."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A customer reports they sold their house but the buyer is querying the EV charger installation from 3 years ago. What documentation should exist?",
  options: [
    "Just the original invoice",
    "Nothing is required after installation",
    "Installation certificate, test results, and notification records",
    "Only the manufacturer's warranty"
  ],
  correctAnswer: 2,
  explanation: "Complete records should exist: Electrical Installation Certificate, Schedule of Test Results, Building Regulations notification (or competent person scheme certificate), and ideally a copy retained by the installer. These documents transfer with the property and prove compliance."
  }
];

const EVChargingModule6Section6 = () => {
  useSEO({
    title: "Certificate, Test Sheet, and Handover Pack | EV Charging Module 6.6",
    description: "Master certification completion, test sheet documentation, and handover pack preparation for EV charging installations. Ensure compliance and professional delivery."
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
            <Link to="../ev-charging-module-6">
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
            <span>Module 6.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Certificate, Test Sheet, and Handover Pack
          </h1>
          <p className="text-white/80">
            Completing documentation and ensuring professional customer handover
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Certificate:</strong> EIC required by BS 7671 and Part P</li>
              <li><strong>Deadline:</strong> Documentation within 28 days</li>
              <li><strong>Retention:</strong> Lifetime of installation</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Legal Requirements</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Building Control:</strong> Notification or self-cert</li>
              <li><strong>Competent person:</strong> Must sign certificate</li>
              <li><strong>Test records:</strong> All results documented</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Complete Electrical Installation Certificates accurately",
              "Record and verify all test results comprehensively",
              "Understand notification and compliance requirements",
              "Prepare comprehensive handover packages",
              "Document warranty and maintenance requirements",
              "Establish maintenance schedules and record systems"
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
            Electrical Installation Certificate (EIC)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The EIC is a legal document required by BS 7671 for all new installations.
              It confirms the installation complies with regulations and is safe for use.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Legal Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• Required by BS 7671 for new installations</li>
                  <li>• Mandatory under Building Regulations Part P</li>
                  <li>• Must be completed by competent person</li>
                  <li>• Copy to customer within 28 days</li>
                  <li>• Copy to Building Control (if required)</li>
                  <li>• Retained for life of installation</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Certificate Contents</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• Installation details and description</li>
                  <li>• Design and construction compliance</li>
                  <li>• Inspection and test results</li>
                  <li>• Limitations and recommendations</li>
                  <li>• Next inspection date</li>
                  <li>• Designer and installer signatures</li>
                </ul>
              </div>
            </div>

            <div className="my-6 space-y-3">
              <p className="text-sm font-medium text-white">EIC Section Breakdown:</p>
              <div className="p-3 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="text-xs font-medium text-elec-yellow/80 mb-1">Section 1: Installation Details</p>
                <p className="text-xs text-white/80">Customer name, address, description ("Installation of EV charging point(s)"), date, extent of work</p>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="text-xs font-medium text-elec-yellow/80 mb-1">Section 2: Design and Construction</p>
                <p className="text-xs text-white/80">BS 7671:2018+A2:2022 reference, IET Code of Practice, manufacturer's instructions, Part 7 compliance</p>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="text-xs font-medium text-elec-yellow/80 mb-1">Section 3: Inspection and Testing</p>
                <p className="text-xs text-white/80">All tests completed satisfactorily, results on schedule, limitations noted, recommendations listed</p>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="text-xs font-medium text-elec-yellow/80 mb-1">Section 4: Declarations</p>
                <p className="text-xs text-white/80">Designer, constructor, and inspector signatures with registration details</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Test Result Documentation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              All test results must be recorded on the Schedule of Test Results. This provides
              evidence of compliance and a baseline for future inspections.
            </p>

            <div className="my-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-2 text-elec-yellow/80 font-medium">Test</th>
                    <th className="text-left py-2 text-elec-yellow/80 font-medium">Example Result</th>
                    <th className="text-left py-2 text-elec-yellow/80 font-medium">Standard</th>
                    <th className="text-left py-2 text-elec-yellow/80 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="text-white/90">
                  <tr className="border-b border-white/10">
                    <td className="py-2">Continuity (R1+R2)</td>
                    <td className="py-2">0.03Ω</td>
                    <td className="py-2">≤0.05Ω</td>
                    <td className="py-2 text-green-400">Pass</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2">Insulation Resistance</td>
                    <td className="py-2">&gt;999MΩ</td>
                    <td className="py-2">≥1MΩ</td>
                    <td className="py-2 text-green-400">Pass</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2">Earth Fault Loop (Zs)</td>
                    <td className="py-2">0.85Ω</td>
                    <td className="py-2">≤1.44Ω (32A Type B)</td>
                    <td className="py-2 text-green-400">Pass</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2">RCD Operating Time</td>
                    <td className="py-2">28ms @ 5×IΔn</td>
                    <td className="py-2">≤40ms</td>
                    <td className="py-2 text-green-400">Pass</td>
                  </tr>
                  <tr>
                    <td className="py-2">Functional Test</td>
                    <td className="py-2">Satisfactory</td>
                    <td className="py-2">Per Manufacturer</td>
                    <td className="py-2 text-green-400">Pass</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              Record actual values, not just pass/fail. This provides valuable information for
              future maintenance and helps identify trending issues during periodic inspections.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Complete Handover Package
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A professional handover package includes all documentation the customer needs
              for safe operation, maintenance, and future reference.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Certification</p>
                <ul className="text-xs text-white space-y-1">
                  <li>• Electrical Installation Certificate</li>
                  <li>• Schedule of Test Results</li>
                  <li>• Schedule of Items Inspected</li>
                  <li>• Building Reg compliance</li>
                  <li>• Competent person cert</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Operation & Safety</p>
                <ul className="text-xs text-white space-y-1">
                  <li>• User manual and quick start</li>
                  <li>• Safety instructions</li>
                  <li>• Emergency procedures</li>
                  <li>• Operating instructions</li>
                  <li>• Troubleshooting guide</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Warranty & Support</p>
                <ul className="text-xs text-white space-y-1">
                  <li>• Warranty certificates</li>
                  <li>• Maintenance schedule</li>
                  <li>• Service contact info</li>
                  <li>• Spare parts details</li>
                  <li>• Software update info</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <p className="text-sm font-medium text-green-400 mb-2">Professional Tip</p>
              <p className="text-sm text-white/80">
                Present documents in a branded folder or binder. Include your business card and
                a follow-up care card. This professional touch increases referrals and repeat business.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Documentation Best Practice</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Complete certificates on-site before leaving</li>
                <li>Use digital certificates for faster delivery</li>
                <li>Keep copies of all documentation issued</li>
                <li>Email digital copies as backup</li>
                <li>Follow up within 7 days to confirm receipt</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Delayed certificates:</strong> — must be within 28 days legally</li>
                <li><strong>Missing signatures:</strong> — invalidates the certificate</li>
                <li><strong>Incomplete test results:</strong> — all tests must be recorded</li>
                <li><strong>No limitation notes:</strong> — record any access restrictions</li>
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
              <p className="font-medium text-white mb-1">EIC Sections</p>
              <ul className="space-y-0.5">
                <li>1. Installation Details</li>
                <li>2. Design and Construction</li>
                <li>3. Inspection and Testing</li>
                <li>4. Declarations and Signatures</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Key Deadlines</p>
              <ul className="space-y-0.5">
                <li>Certificate to customer: 28 days</li>
                <li>Building Control notification: 30 days</li>
                <li>Record retention: Life of installation</li>
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
            <Link to="../ev-charging-module-6-section-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ev-charging-module-7">
              Module 7
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EVChargingModule6Section6;