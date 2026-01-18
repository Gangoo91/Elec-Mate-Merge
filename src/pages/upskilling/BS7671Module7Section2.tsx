import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "bs7671-m7s2-check1",
    question: "What is the minimum IP rating for outdoor EV charging equipment?",
    options: ["IP44", "IP55", "IP65", "IP67"],
    correctIndex: 0,
    explanation: "Outdoor EV charging equipment requires a minimum of IP44 protection, though IP55 or higher is often specified for fully exposed locations."
  },
  {
    id: "bs7671-m7s2-check2",
    question: "Why is PME earthing a concern for EV charging installations?",
    options: [
      "It increases electricity costs",
      "Open circuit PEN conductor creates shock risk via vehicle chassis",
      "It slows down charging speed",
      "It requires larger cable sizes"
    ],
    correctIndex: 1,
    explanation: "With PME supplies, an open-circuit PEN conductor can cause dangerous voltages on exposed metalwork, including vehicle chassis. Special protective measures are required."
  },
  {
    id: "bs7671-m7s2-check3",
    question: "What is the maximum disconnection time for a 32A EV charger circuit?",
    options: ["0.2 seconds", "0.4 seconds", "1 second", "5 seconds"],
    correctIndex: 1,
    explanation: "For circuits up to 32A, the maximum disconnection time is 0.4 seconds under fault conditions. This ensures rapid isolation to prevent electric shock."
  }
];

const faqs = [
  {
    question: "Can I install an EV charger on a TT earthing system?",
    answer: "Yes, TT systems are often preferred for EV installations as they avoid PME concerns. Ensure adequate earth electrode resistance and use appropriate RCD protection."
  },
  {
    question: "What cable size is needed for a 7.4kW home charger?",
    answer: "A 7.4kW (32A single-phase) charger typically requires 6mm² cable for runs up to 20m, or 10mm² for longer runs. Always calculate volt drop for the specific installation."
  },
  {
    question: "Is a dedicated circuit required for EV charging?",
    answer: "Yes, BS 7671 requires a dedicated final circuit for EV charging equipment. This circuit should have its own protective device and cannot be shared with other loads."
  },
  {
    question: "What RCD protection is required for EV chargers?",
    answer: "Type A or Type B RCD protection is required, depending on the charger type. Most Mode 3 chargers with DC fault protection allow Type A RCDs; otherwise Type B is needed."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "An EV charger is being installed on a PME supply. What additional protective measure must be considered?",
  options: [
    "Larger cable cross-section",
    "Earth electrode and protective equipotential bonding",
    "Higher rated MCB",
    "Longer circuit length"
  ],
  correctAnswer: 1,
  explanation: "For PME supplies, additional earth electrode installation and protective equipotential bonding to the vehicle charging location are required to mitigate open-circuit PEN conductor risks."
  }
];

const BS7671Module7Section2 = () => {
  useSEO({
    title: "EV Charging Installations | BS7671 Module 7.2",
    description: "Learn BS 7671 Part 722 requirements for safe electric vehicle charging infrastructure including PME considerations and protection requirements."
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/bs7671-module-7">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 7
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 7.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Electric Vehicle Charging Installations
          </h1>
          <p className="text-white/80">
            BS 7671 Part 722 requirements for safe EV infrastructure
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Part 722:</strong> Dedicated section for EV charging</li>
              <li><strong>PME risk:</strong> Open PEN = shock via vehicle</li>
              <li><strong>Protection:</strong> Type A or B RCD required</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Domestic garages, car parks, commercial premises</li>
              <li><strong>Use:</strong> Verify earthing, install correct RCD type, check PME mitigation</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Part 722 scope and application",
              "EV charging modes (Mode 1-4)",
              "PME supply considerations and mitigation",
              "Cable sizing for EV circuits",
              "RCD selection (Type A vs Type B)",
              "Installation and testing requirements"
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
            Charging Modes Explained
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              EV charging is categorised into four modes based on power levels and communication
              protocols. Understanding these modes is essential for correct equipment selection
              and installation.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">AC Charging (Mode 1-3)</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Mode 1:</strong> Standard socket (rarely used UK)</li>
                  <li><strong>Mode 2:</strong> Socket + in-cable control box</li>
                  <li><strong>Mode 3:</strong> Dedicated EVSE with Type 2 socket</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">DC Charging (Mode 4)</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>High power:</strong> 50kW to 350kW+</li>
                  <li><strong>Connectors:</strong> CCS, CHAdeMO</li>
                  <li><strong>Application:</strong> Public rapid chargers</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">3.6kW</p>
                <p className="text-white/90 text-xs">Single phase 16A</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">7.4kW</p>
                <p className="text-white/90 text-xs">Single phase 32A</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">22kW</p>
                <p className="text-white/90 text-xs">Three phase 32A</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            PME Supply Considerations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Most UK domestic supplies use PME (Protective Multiple Earthing). While effective
              for fixed installations, PME presents specific risks for EV charging due to the
              vehicle's connection to true earth through its tyres.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The PME Risk:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Open-circuit PEN conductor raises neutral voltage</li>
                <li>Vehicle chassis becomes energised via charging cable</li>
                <li>Person touching vehicle experiences shock to true earth</li>
                <li>Risk exists regardless of RCD protection</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">PME Mitigation Options:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Option 1:</strong> TT earthing with local earth electrode</li>
                <li><strong>Option 2:</strong> PME earthing + protective equipotential bonding</li>
                <li><strong>Option 3:</strong> Use compliant EVSE with in-built protection</li>
              </ul>
            </div>

            <p>
              The most common solution for domestic installations is using an EVSE that incorporates
              appropriate protection, combined with manufacturer guidance on PME compatibility.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Protection and Cable Selection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              EV charging circuits require careful consideration of protection coordination,
              cable sizing, and RCD selection to ensure safety and performance.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">RCD Selection</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Type A:</strong> AC + pulsating DC faults</li>
                  <li><strong>Type B:</strong> All fault types including smooth DC</li>
                  <li><strong>Type A + DC detection:</strong> Alternative to Type B</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cable Sizing (7.4kW)</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Up to 20m:</strong> 6mm² minimum</li>
                  <li><strong>20-35m:</strong> 10mm² typical</li>
                  <li><strong>35m+:</strong> Calculate volt drop</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Volt Drop Limits:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Maximum 5% from origin to final circuit</li>
                <li>Typically 3% allocated to final circuit</li>
                <li>32A at 230V over 20m in 6mm² = ~2.8% drop</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Checklist</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Verify supply earthing type (TN-C-S, TN-S, TT)</li>
                <li>Assess DNO supply capacity and diversity</li>
                <li>Select EVSE with appropriate PME compatibility</li>
                <li>Calculate cable size for volt drop and thermal constraints</li>
                <li>Install dedicated circuit with correct RCD type</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Wrong RCD type:</strong> — Using Type AC instead of Type A/B</li>
                <li><strong>Ignoring PME:</strong> — Not considering open PEN risk</li>
                <li><strong>Undersized cables:</strong> — Not accounting for continuous load</li>
                <li><strong>No diversity:</strong> — Overloading existing supply</li>
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
              <p className="font-medium text-white mb-1">Key Regulations</p>
              <ul className="space-y-0.5">
                <li>BS 7671 Part 722</li>
                <li>IET Code of Practice for EV</li>
                <li>BS EN 61851 (EVSE standards)</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Common Ratings</p>
              <ul className="space-y-0.5">
                <li>Home: 7.4kW (32A single phase)</li>
                <li>Workplace: 22kW (32A three phase)</li>
                <li>Rapid: 50-150kW DC</li>
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
            <Link to="/study-centre/upskilling/bs7671-module-7-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/bs7671-module-7-section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BS7671Module7Section2;