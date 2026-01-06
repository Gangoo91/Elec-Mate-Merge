import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "emergencylighting-m4s3-check1",
    question: "What are the two standard autonomy durations for emergency lighting?",
    options: ["30 minutes and 2 hours", "1 hour and 3 hours", "2 hours and 4 hours", "45 minutes and 90 minutes"],
    correctIndex: 1,
    explanation: "BS 5266-1 specifies 1-hour and 3-hour durations. 3 hours is standard; 1 hour only where immediate evacuation with no reoccupation is documented in the fire risk assessment."
  },
  {
    id: "emergencylighting-m4s3-check2",
    question: "What factor affects battery capacity when temperature varies?",
    options: ["Humidity only", "Temperature correction factor", "Air pressure", "Light output"],
    correctIndex: 1,
    explanation: "Battery capacity reduces at low temperatures. Temperature correction factors must be applied when batteries are in cold locations. Capacity may be only 50% at 0°C compared to 20°C."
  },
  {
    id: "emergencylighting-m4s3-check3",
    question: "How long must emergency lighting batteries be able to recharge after a 3-hour discharge?",
    options: ["12 hours", "24 hours", "48 hours", "72 hours"],
    correctIndex: 1,
    explanation: "BS 5266-1 requires batteries to fully recharge within 24 hours of a complete discharge. This ensures the system is ready for another emergency within a day."
  }
];

const faqs = [
  {
    question: "How do I calculate battery capacity for a central system?",
    answer: "Sum all luminaire loads in watts, multiply by duration in hours, add 25% margin for ageing, then apply temperature correction if needed. Result is in Watt-hours (Wh). Convert to Amp-hours using system voltage."
  },
  {
    question: "What is battery ageing factor?",
    answer: "Batteries lose capacity over time. A 25% ageing factor (or design to 80% of initial capacity) ensures the system still meets duration requirements at end of battery life, typically 4 years."
  },
  {
    question: "Do LED luminaires affect battery sizing differently?",
    answer: "LED luminaires typically require less power than fluorescent equivalents, allowing smaller batteries. However, driver efficiency and LED thermal derating should be considered in calculations."
  },
  {
    question: "What happens if the mains fails during battery recharge?",
    answer: "Partial recharge gives partial duration. After 12 hours recharge, expect approximately 50% duration. Critical applications may need faster recharge systems or backup arrangements."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A central battery system serves 50 luminaires at 5W each for 3 hours. What minimum battery capacity is needed (including ageing factor)?",
  options: [
    "750 Wh",
    "937.5 Wh (750 × 1.25)",
    "500 Wh",
    "1500 Wh"
  ],
  correctAnswer: 1,
  explanation: "Load = 50 × 5W = 250W. Duration = 3 hours. Capacity = 250W × 3h = 750Wh. With 25% ageing factor: 750 × 1.25 = 937.5Wh minimum rated capacity."
  }
];

const EmergencyLightingModule4Section3 = () => {
  useSEO({
    title: "Battery Sizing and Autonomy | Emergency Lighting Module 4.3",
    description: "Calculate emergency lighting battery capacity, understand autonomy durations, correction factors, and BS 5266-1/BS EN 50171 compliance."
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
            <Link to="../emergency-lighting-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 4.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Battery Sizing and Autonomy Duration
          </h1>
          <p className="text-white/80">
            Calculating capacity requirements for emergency lighting systems
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Duration:</strong> 1 hour or 3 hours</li>
              <li><strong>Ageing:</strong> 25% capacity margin</li>
              <li><strong>Recharge:</strong> 24 hours maximum</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Calculation</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Load:</strong> Sum of all luminaire watts</li>
              <li><strong>Capacity:</strong> Load × Duration × 1.25</li>
              <li><strong>Correction:</strong> Temperature factors</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Calculate battery capacity",
              "Apply autonomy durations",
              "Use correction factors",
              "Account for battery ageing",
              "Verify recharge capability",
              "Comply with BS 5266-1/BS EN 50171"
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
            Autonomy Duration Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Autonomy duration is the time the emergency lighting system must operate
              on battery power. BS 5266-1 specifies standard durations based on
              building risk assessment.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">3-Hour Duration (Standard)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Default for all premises</li>
                  <li>Sleeping accommodation</li>
                  <li>Complex evacuation</li>
                  <li>Fire service operations</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">1-Hour Duration (Justified)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Simple, immediate evacuation</li>
                  <li>No reoccupation planned</li>
                  <li>Documented in fire risk assessment</li>
                  <li>Small single-storey buildings</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">1 hour</p>
                <p className="text-white/90 text-xs">Justified only</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">3 hours</p>
                <p className="text-white/90 text-xs">Standard</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">24 hours</p>
                <p className="text-white/90 text-xs">Recharge time</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Battery Capacity Calculation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Battery capacity must be calculated to ensure the system operates for the
              full required duration, accounting for all loads and correction factors.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Calculation Steps:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>1. Sum loads:</strong> Total watts of all luminaires on the system</li>
                <li><strong>2. Duration:</strong> Multiply by required hours (1 or 3)</li>
                <li><strong>3. Ageing factor:</strong> Multiply by 1.25 (25% margin)</li>
                <li><strong>4. Temperature:</strong> Apply correction if needed</li>
                <li><strong>5. Result:</strong> Minimum battery capacity in Wh</li>
              </ul>
            </div>

            <p>
              For central systems, convert Wh to Ah using system voltage: Ah = Wh ÷ V.
              A 48V system with 960Wh requirement needs 20Ah battery.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Recharge Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              After emergency operation, batteries must recharge within specified times
              to be ready for subsequent emergencies.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Recharge Standards</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Full recharge:</strong> 24 hours maximum</li>
                  <li><strong>50% capacity:</strong> Within 12 hours</li>
                  <li><strong>Charger sizing:</strong> Must achieve rate</li>
                  <li><strong>Verification:</strong> Part of commissioning</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Charger Considerations</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Automatic operation</li>
                  <li>Battery technology matched</li>
                  <li>Temperature compensation</li>
                  <li>Fault indication</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Calculation Example</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>30 luminaires × 5W = 150W total load</li>
                <li>3-hour duration: 150W × 3h = 450Wh</li>
                <li>Ageing factor: 450 × 1.25 = 562.5Wh</li>
                <li>At 24V: 562.5 ÷ 24 = 23.4Ah minimum</li>
                <li>Select next standard size: 25Ah or 30Ah battery</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Sizing Errors</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>No ageing factor:</strong> — System fails as batteries age</li>
                <li><strong>Ignoring temperature:</strong> — Cold locations reduce capacity</li>
                <li><strong>Wrong duration:</strong> — Using 1 hour without justification</li>
                <li><strong>Undersized charger:</strong> — Cannot meet 24h recharge</li>
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
              <p className="font-medium text-white mb-1">Duration</p>
              <ul className="space-y-0.5">
                <li>Standard: 3 hours</li>
                <li>Justified: 1 hour</li>
                <li>Recharge: 24 hours</li>
                <li>50% in 12 hours</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Calculation</p>
              <ul className="space-y-0.5">
                <li>Load × Duration = Wh</li>
                <li>× 1.25 ageing factor</li>
                <li>÷ Voltage = Ah</li>
                <li>Apply temp correction</li>
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
            <Link to="../emergency-lighting-module-4-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../emergency-lighting-module-4-section-4">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EmergencyLightingModule4Section3;