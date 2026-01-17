import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "evcharging-m6s5-check1",
    question: "What is the minimum recommended duration for a comprehensive customer walkthrough?",
    options: ["15 minutes", "30 minutes", "40 minutes", "60 minutes"],
    correctIndex: 2,
    explanation: "A comprehensive walkthrough should take 40 minutes minimum: 10 min system overview, 15 min operation demonstration, 10 min maintenance explanation, and 5 min documentation handover."
  },
  {
    id: "evcharging-m6s5-check2",
    question: "Which BS 7671 section covers labelling and identification requirements?",
    options: ["Section 512", "Section 514", "Section 521", "Section 531"],
    correctIndex: 1,
    explanation: "BS 7671 Section 514 covers 'Identification and Notices' including labelling requirements for electrical installations, circuits, and protective devices."
  },
  {
    id: "evcharging-m6s5-check3",
    question: "What type of labels are required for outdoor EV charging installations?",
    options: [
      "Standard paper labels",
      "Laminated paper labels",
      "Marine-grade vinyl or aluminium with UV-stable inks",
      "Any waterproof material"
    ],
    correctIndex: 2,
    explanation: "Outdoor labels must be marine-grade vinyl or aluminium with UV-stable inks, weather-resistant adhesive, temperature tolerance -20°C to +80°C, and minimum 15-year durability."
  }
];

const faqs = [
  {
    question: "What happens if the customer isn't available for the walkthrough?",
    answer: "The installation cannot be considered complete until the walkthrough is conducted. Schedule a specific appointment and ensure the customer understands this is mandatory for warranty validation and safety compliance."
  },
  {
    question: "How often should RCD testing be demonstrated to customers?",
    answer: "Demonstrate the monthly RCD test procedure during walkthrough and provide written instructions. Emphasize this is a legal requirement under BS 7671 and essential for continued protection."
  },
  {
    question: "What documentation must be provided to the customer?",
    answer: "Provide installation certificate, test results, user manual, warranty information, maintenance schedule, emergency contact details, and commissioning checklist — all within 28 days of completion."
  },
  {
    question: "How should emergency procedures be communicated?",
    answer: "Emergency procedures must be clearly explained during walkthrough, provided in written form, and prominently displayed near the charging equipment. Include isolation points, emergency contacts, and evacuation procedures."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A customer complains they can't find any information about their EV charger installation after 6 months. What documentation should they have received?",
  options: [
    "Just the receipt for payment",
    "Only the manufacturer's user manual",
    "Installation certificate, test results, user manual, warranty info, and maintenance schedule",
    "A simple completion note"
  ],
  correctAnswer: 2,
  explanation: "A complete handover package includes: installation certificate with test results, manufacturer's user manual, warranty documentation, maintenance schedule, emergency contacts, and commissioning checklist. All must be provided within 28 days of completion."
  }
];

const EVChargingModule6Section5 = () => {
  useSEO({
    title: "Customer Walkthrough and Labelling | EV Charging Module 6.5",
    description: "Learn customer walkthrough procedures and system labelling requirements for EV charging installations. Master handover protocols and BS 7671 compliance."
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
            <Link to="/study-centre/upskilling/ev-charging-module-6">
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
            <span>Module 6.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Customer Walkthrough and Labelling
          </h1>
          <p className="text-white/80">
            Professional handover procedures and comprehensive system labelling
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Walkthrough:</strong> 40 min minimum, structured approach</li>
              <li><strong>Labelling:</strong> BS 7671 Section 514 compliance</li>
              <li><strong>Documentation:</strong> Within 28 days to customer</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Requirements</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Outdoor labels:</strong> Marine-grade, UV-stable</li>
              <li><strong>Indoor labels:</strong> 10-year minimum durability</li>
              <li><strong>Monthly RCD test:</strong> Demonstrate and document</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Plan and conduct effective customer walkthroughs",
              "Demonstrate safe operation procedures",
              "Understand BS 7671 labelling requirements",
              "Apply correct labelling standards and materials",
              "Document customer training and handover",
              "Provide ongoing support information"
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
            Structured Walkthrough Process
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A professional customer walkthrough ensures the customer can safely operate their
              charging equipment and understands maintenance requirements. Use a structured
              approach to cover all essential topics.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-3 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">1. System Overview (10 minutes)</p>
                <ul className="text-xs text-white space-y-1 ml-4">
                  <li>• Complete system layout explanation</li>
                  <li>• Key components and their functions</li>
                  <li>• Isolation points and emergency stops</li>
                  <li>• Safety features and protection devices</li>
                </ul>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">2. Operation Demonstration (15 minutes)</p>
                <ul className="text-xs text-white space-y-1 ml-4">
                  <li>• Normal charging procedure start-to-finish</li>
                  <li>• Authentication methods (RFID, app, etc.)</li>
                  <li>• Status indicators and their meanings</li>
                  <li>• Scheduling and smart charging features</li>
                  <li>• Emergency stop and fault procedures</li>
                </ul>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">3. Maintenance and Care (10 minutes)</p>
                <ul className="text-xs text-white space-y-1 ml-4">
                  <li>• Regular cleaning and inspection</li>
                  <li>• Monthly RCD testing procedure (demonstrate)</li>
                  <li>• Annual professional inspection requirements</li>
                  <li>• Common faults and troubleshooting</li>
                </ul>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">4. Documentation Handover (5 minutes)</p>
                <ul className="text-xs text-white space-y-1 ml-4">
                  <li>• Installation certificate explanation</li>
                  <li>• Warranty terms and conditions</li>
                  <li>• Contact information for support</li>
                  <li>• Maintenance record keeping</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            BS 7671 Labelling Standards
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671 Section 514 mandates specific labelling requirements for electrical
              installations. EV charging installations have particular needs due to their
              location and operational requirements.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Consumer Unit Labels</p>
                <ul className="text-xs text-white space-y-1">
                  <li>• Circuit identification</li>
                  <li>• Maximum demand</li>
                  <li>• RCD test schedule</li>
                  <li>• Emergency contact details</li>
                  <li>• Installation date</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Charging Point Labels</p>
                <ul className="text-xs text-white space-y-1">
                  <li>• Maximum charging current</li>
                  <li>• Voltage and phase info</li>
                  <li>• Emergency stop procedure</li>
                  <li>• Warning notices</li>
                  <li>• Manufacturer details</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cable Labels</p>
                <ul className="text-xs text-white space-y-1">
                  <li>• Cable identification</li>
                  <li>• Route marking</li>
                  <li>• Voltage warnings</li>
                  <li>• Installation method</li>
                  <li>• Depth markers (buried)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Label Materials and Durability
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Label materials must be appropriate for the installation environment.
              Indoor and outdoor applications have different requirements.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Indoor Applications</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• Laminated paper or vinyl acceptable</li>
                  <li>• UV-resistant if natural light present</li>
                  <li>• Temperature range: -10°C to +70°C</li>
                  <li>• Minimum 10-year durability</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Outdoor Applications</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• Marine-grade vinyl or aluminium</li>
                  <li>• UV-stable inks mandatory</li>
                  <li>• Temperature range: -20°C to +80°C</li>
                  <li>• Weather-resistant adhesive</li>
                  <li>• Minimum 15-year durability</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-sm font-medium text-red-400 mb-2">Important</p>
              <p className="text-sm text-white/80">
                Faded or illegible labels are a common inspection failure. Using cheap labels
                outdoors is a false economy — they'll need replacement within 2-3 years.
                Marine-grade materials cost more initially but last the life of the installation.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Documentation Package
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Complete documentation must be provided within 28 days of installation.
              A well-organized package reduces support calls and protects both parties.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Pre-Walkthrough Preparation</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• Installation certificate completed</li>
                  <li>• Test results recorded and verified</li>
                  <li>• User manual and warranty info</li>
                  <li>• Maintenance schedule prepared</li>
                  <li>• Emergency contact details</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">System Verification</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• All testing completed successfully</li>
                  <li>• System fully operational</li>
                  <li>• Safety devices tested and functional</li>
                  <li>• Labelling completed and verified</li>
                  <li>• Site cleaned and tidied</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Walkthrough Best Practice</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Allow customer to perform operations under supervision</li>
                <li>Use simple, non-technical language where possible</li>
                <li>Confirm understanding with questions</li>
                <li>Provide written summary of key points</li>
                <li>Schedule follow-up call after first week of use</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Rushed walkthrough:</strong> — customer won't retain information</li>
                <li><strong>Technical jargon:</strong> — confuses rather than educates</li>
                <li><strong>No written backup:</strong> — customer forgets verbal instructions</li>
                <li><strong>Skipping RCD demo:</strong> — monthly testing won't happen</li>
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
              <p className="font-medium text-white mb-1">Walkthrough Structure</p>
              <ul className="space-y-0.5">
                <li>10 min: System overview</li>
                <li>15 min: Operation demonstration</li>
                <li>10 min: Maintenance explanation</li>
                <li>5 min: Documentation handover</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Label Requirements</p>
              <ul className="space-y-0.5">
                <li>Indoor: 10-year durability</li>
                <li>Outdoor: 15-year durability</li>
                <li>Reference: BS 7671 Section 514</li>
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
            <Link to="/study-centre/upskilling/ev-charging-module-6-section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/ev-charging-module-6-section-6">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EVChargingModule6Section5;