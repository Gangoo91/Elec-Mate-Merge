import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "initial-verification-purpose",
    question: "Why is initial verification required before energising a new installation?",
    options: [
      "To improve system efficiency",
      "To ensure safety, compliance, and fitness for service",
      "To reduce installation costs",
      "To satisfy manufacturer requirements only"
    ],
    correctIndex: 1,
    explanation: "Initial verification is a legal requirement under EaWR 1989 and BS7671 that ensures the installation is safe, compliant with regulations, and fit for service before energisation."
  },
  {
    id: "work-categories",
    question: "Which work category requires initial verification with an EIC?",
    options: [
      "Adding a socket to an existing circuit",
      "Replacing a light switch like-for-like",
      "Installing a new circuit",
      "Repairing a damaged cable"
    ],
    correctIndex: 2,
    explanation: "New circuits require full initial verification with an Electrical Installation Certificate (EIC). Minor additions to existing circuits can use a Minor Works certificate."
  },
  {
    id: "certificate-signing",
    question: "Who can sign an Electrical Installation Certificate?",
    options: [
      "Any qualified electrician",
      "Only the person who installed the work",
      "A competent person who verified the work",
      "The building owner"
    ],
    correctIndex: 2,
    explanation: "Only a skilled person competent in electrical installation work and testing can sign an EIC. This is typically someone qualified, experienced, and registered with a competent person scheme."
  }
];

const faqs = [
  {
    question: "What's the difference between an EIC and MEIWC?",
    answer: "An EIC (Electrical Installation Certificate) is for new installations, new circuits, or major alterations. An MEIWC (Minor Works) is for minor additions to existing circuits, like adding a socket or light point to an existing circuit."
  },
  {
    question: "Does replacing a consumer unit require an EIC?",
    answer: "Yes. Consumer unit replacement is notifiable work requiring an EIC. It involves significant changes to protective devices and earthing arrangements that must be fully verified."
  },
  {
    question: "Can I self-certify my own work?",
    answer: "If you're registered with a competent person scheme, yes. Otherwise, you must notify Building Control who will arrange third-party inspection and certification."
  },
  {
    question: "What happens if I don't provide certification?",
    answer: "Non-compliance can result in prosecution, invalidated insurance, difficulty selling the property, and personal liability for any accidents. It's a legal requirement under Building Regulations Part P."
  }
];

const quizQuestion = {
  question: "What must be completed before any part of a new installation is energised?",
  options: [
    "Client approval only",
    "Initial verification including inspection and testing",
    "Payment confirmation",
    "Building control notification"
  ],
  correctAnswer: 1,
  explanation: "Initial verification (visual inspection and testing) must be completed before energisation. This ensures the installation is safe and compliant before any live testing can proceed."
};

const BS7671Module6Section1 = () => {
  useSEO({
    title: "Requirements for Initial Verification | BS7671 Module 6.1",
    description: "Learn about initial verification requirements under BS7671 including when it's required, mandatory checks, and certification responsibilities."
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
            <Link to="/study-centre/upskilling/bs7671-module-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 6.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Requirements for Initial Verification
          </h1>
          <p className="text-white/80">
            Mandatory verification before energising electrical installations
          </p>
        </header>

        {/* Quick Summary */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Legal:</strong> Required by EaWR 1989 and BS7671</li>
              <li><strong>Safety:</strong> Confirms protection against shock and fire</li>
              <li><strong>Documentation:</strong> Evidence for client, insurers, regulators</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">When Required</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>New installations:</strong> Complete new builds, rewires</li>
              <li><strong>Additions:</strong> New circuits, consumer units</li>
              <li><strong>Alterations:</strong> Significant changes to existing work</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Purpose of initial verification in electrical installations",
              "Mandatory checks required under BS7671",
              "When initial verification must be carried out",
              "Electrician's responsibilities for recording results"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1: Purpose */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Purpose of Initial Verification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Initial verification is not merely a recommended practice—it's a fundamental legal requirement. This process serves as the critical bridge between installation completion and safe energisation.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Primary Safety Objectives</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• Confirms compliance with BS7671 (18th Edition)</li>
                  <li>• Ensures protection against electric shock</li>
                  <li>• Verifies protection against thermal effects</li>
                  <li>• Validates fault protection and earthing</li>
                  <li>• Confirms fire safety measures</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Legal Compliance</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• Electricity at Work Regulations 1989</li>
                  <li>• Building Regulations Part P</li>
                  <li>• Health and Safety at Work Act 1974</li>
                  <li>• CDM Regulations 2015</li>
                  <li>• Insurance policy requirements</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-sm font-medium text-red-400 mb-2">Consequences of Non-Compliance</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm text-white/90">
                <ul className="space-y-1">
                  <li>• Criminal prosecution under EaWR</li>
                  <li>• Unlimited fines and imprisonment</li>
                  <li>• Professional disqualification</li>
                </ul>
                <ul className="space-y-1">
                  <li>• Insurance claim rejection</li>
                  <li>• Reputation damage</li>
                  <li>• Personal liability for accidents</li>
                </ul>
              </div>
            </div>

            <InlineCheck {...quickCheckQuestions[0]} />
          </div>
        </section>

        {/* Section 2: When Required */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            When Initial Verification is Required
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Initial verification applies to any new installation, addition, or significant alteration. The scope determines the certificate type required.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="font-medium text-elec-yellow mb-2">New Installations</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>• New build properties</li>
                  <li>• Complete rewiring</li>
                  <li>• New consumer units</li>
                  <li>• Outbuilding supplies</li>
                  <li>• EV charging points</li>
                  <li>• Solar PV systems</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="font-medium text-orange-400 mb-2">Additions</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>• New socket circuits</li>
                  <li>• New lighting circuits</li>
                  <li>• Cooker circuits</li>
                  <li>• Shower circuits</li>
                  <li>• Fire alarm circuits</li>
                  <li>• Security systems</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="font-medium text-red-400 mb-2">Major Alterations</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>• Distribution board replacement</li>
                  <li>• Earthing system changes</li>
                  <li>• RCD protection installation</li>
                  <li>• Special location work</li>
                  <li>• Three-phase upgrades</li>
                  <li>• Supply capacity increases</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-transparent border border-white/10">
              <p className="text-sm font-medium text-white mb-2">Certificate Selection Guide</p>
              <div className="grid sm:grid-cols-2 gap-4 text-xs text-white/80">
                <div>
                  <p className="font-medium text-elec-yellow mb-1">EIC Required</p>
                  <ul className="space-y-0.5">
                    <li>• New installations</li>
                    <li>• New circuits</li>
                    <li>• Consumer unit replacements</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-elec-yellow mb-1">MEIWC Sufficient</p>
                  <ul className="space-y-0.5">
                    <li>• Socket additions to existing circuits</li>
                    <li>• Light points on existing circuits</li>
                    <li>• Like-for-like replacements</li>
                  </ul>
                </div>
              </div>
            </div>

            <InlineCheck {...quickCheckQuestions[1]} />
          </div>
        </section>

        {/* Section 3: Mandatory Checks */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Mandatory Checks Under BS7671
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS7671 Chapter 61 mandates a specific sequence: visual inspection first (with installation de-energised), then electrical testing.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Visual Inspection (Reg 611)</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Equipment:</strong> Selection and suitability</li>
                  <li><strong>Environment:</strong> IP ratings, fire resistance</li>
                  <li><strong>Cables:</strong> Correct sizing and installation</li>
                  <li><strong>Protection:</strong> Devices correctly rated</li>
                  <li><strong>Earthing:</strong> Proper bonding arrangements</li>
                  <li><strong>Labelling:</strong> Circuit identification</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Electrical Testing (Reg 612)</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Dead tests:</strong> Continuity, insulation, polarity</li>
                  <li><strong>Live tests:</strong> Zs, RCD operation, PFC</li>
                  <li><strong>Functional:</strong> Switches, controls, devices</li>
                  <li><strong>Recording:</strong> All results documented</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Testing Sequence</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-sm">
                <div className="p-3 rounded bg-transparent border border-white/10">
                  <p className="font-medium text-elec-yellow mb-1">1. Continuity</p>
                  <p className="text-white/90 text-xs">Protective conductors</p>
                </div>
                <div className="p-3 rounded bg-transparent border border-white/10">
                  <p className="font-medium text-elec-yellow mb-1">2. Insulation</p>
                  <p className="text-white/90 text-xs">Resistance ≥1MΩ</p>
                </div>
                <div className="p-3 rounded bg-transparent border border-white/10">
                  <p className="font-medium text-elec-yellow mb-1">3. Polarity</p>
                  <p className="text-white/90 text-xs">Correct connections</p>
                </div>
                <div className="p-3 rounded bg-transparent border border-white/10">
                  <p className="font-medium text-elec-yellow mb-1">4. Live Tests</p>
                  <p className="text-white/90 text-xs">Zs, RCD, functional</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Recording Results */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Recording Results and Certification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The person signing certificates assumes full legal responsibility for the accuracy of all recorded information and the safety of the installation.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">EIC Components</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• Designer's declaration</li>
                  <li>• Constructor's declaration</li>
                  <li>• Inspector/tester's declaration</li>
                  <li>• Schedule of inspections</li>
                  <li>• Schedule of test results</li>
                  <li>• Circuit charts and max Zs values</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Competent Person Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• Formal electrical qualifications</li>
                  <li>• Inspection and testing competence</li>
                  <li>• Current BS7671 knowledge</li>
                  <li>• Professional indemnity insurance</li>
                  <li>• Registration scheme membership</li>
                </ul>
              </div>
            </div>

            <InlineCheck {...quickCheckQuestions[2]} />
          </div>
        </section>

        {/* Real World Application */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Real World Application</h2>
          <div className="p-5 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
            <h3 className="text-sm font-medium text-elec-yellow mb-3">Office Complex Initial Verification</h3>
            <p className="text-sm text-white/90 leading-relaxed mb-4">
              During initial verification of a 3-floor office fit-out, the electrician discovered multiple polarity issues and a poor earthing connection. Because verification was completed before handover, all defects were corrected before staff occupied the building.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white/80">
              <div>
                <p className="font-medium text-white mb-1">Issues Found</p>
                <p>12 circuits with reversed polarity, main earth resistance of 2.3Ω, and 2 faulty RCDs not tripping within time limits.</p>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Outcome</p>
                <p>All defects corrected, re-tested satisfactorily, and safe installation handed over with proper EIC documentation.</p>
              </div>
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
        <div className="mt-6 p-5 rounded-lg bg-transparent border border-white/10">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-3 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">EIC Required</p>
              <ul className="space-y-0.5 text-white/80">
                <li>• New installations</li>
                <li>• New circuits</li>
                <li>• Consumer unit changes</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Test Sequence</p>
              <ul className="space-y-0.5 text-white/80">
                <li>• Visual inspection first</li>
                <li>• Dead tests second</li>
                <li>• Live tests last</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Key Regulations</p>
              <ul className="space-y-0.5 text-white/80">
                <li>• EaWR 1989 Reg 4</li>
                <li>• BS7671 Chapter 61</li>
                <li>• Building Regs Part P</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz */}
        <section className="mb-10 mt-10">
          <SingleQuestionQuiz
            question={quizQuestion.question}
            options={quizQuestion.options}
            correctAnswer={quizQuestion.correctAnswer}
            explanation={quizQuestion.explanation}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/bs7671-module-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 6
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/bs7671-module-6-section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BS7671Module6Section1;
