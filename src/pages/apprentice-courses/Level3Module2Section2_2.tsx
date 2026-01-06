/**
 * Level 3 Module 2 Section 2.2 - Power Factor Correction
 *
 * Understanding power factor and correction methods for energy efficiency
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

// ============================================
// SEO CONFIGURATION
// ============================================
const TITLE = "Power Factor Correction - Level 3 Module 2 Section 2.2";
const DESCRIPTION = "Understanding power factor, reactive power, and correction methods. Improving energy efficiency through power factor correction in electrical installations.";

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is power factor a measure of?",
    options: [
      "The total power consumed by a circuit",
      "The ratio of real power to apparent power",
      "The voltage drop in a cable",
      "The current carrying capacity"
    ],
    correctIndex: 1,
    explanation: "Power factor is the ratio of real power (kW) to apparent power (kVA). It indicates how effectively electrical power is being converted into useful work. A power factor of 1 (unity) means all power is doing useful work."
  },
  {
    id: "check-2",
    question: "What type of load typically causes a lagging power factor?",
    options: [
      "Resistive loads like heaters",
      "Inductive loads like motors and transformers",
      "Capacitive loads",
      "LED lighting"
    ],
    correctIndex: 1,
    explanation: "Inductive loads such as motors, transformers, and fluorescent ballasts cause current to lag behind voltage, resulting in a lagging power factor. This is the most common type in industrial and commercial installations."
  },
  {
    id: "check-3",
    question: "How is power factor corrected for inductive loads?",
    options: [
      "By adding more inductive loads",
      "By adding capacitors to the circuit",
      "By increasing the supply voltage",
      "By reducing the cable size"
    ],
    correctIndex: 1,
    explanation: "Capacitors provide leading reactive power that cancels out the lagging reactive power from inductive loads. This correction brings the overall power factor closer to unity."
  },
  {
    id: "check-4",
    question: "Why is poor power factor a problem for electricity consumers?",
    options: [
      "It causes equipment to run hotter",
      "It can result in penalty charges and requires larger cables",
      "It reduces voltage to equipment",
      "It causes lights to flicker"
    ],
    correctIndex: 1,
    explanation: "Poor power factor means higher current for the same real power, requiring larger cables. Commercial users may also face reactive power charges from their supplier. It also causes additional losses in the distribution system."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "The unit of apparent power is:",
    options: [
      "Watts (W)",
      "Volt-amperes (VA)",
      "VAR",
      "Joules"
    ],
    correctAnswer: 1,
    explanation: "Apparent power is measured in volt-amperes (VA) or kVA. It represents the total power that must be supplied, regardless of how much does useful work."
  },
  {
    id: 2,
    question: "The unit of reactive power is:",
    options: [
      "Watts (W)",
      "Volt-amperes (VA)",
      "Volt-amperes reactive (VAR)",
      "Kilowatt-hours (kWh)"
    ],
    correctAnswer: 2,
    explanation: "Reactive power is measured in volt-amperes reactive (VAR) or kVAR. It represents power that flows back and forth between supply and load without doing useful work."
  },
  {
    id: 3,
    question: "A power factor of 0.8 lagging means:",
    options: [
      "80% of apparent power is doing useful work",
      "The load is capacitive",
      "The voltage is 80% of nominal",
      "The circuit is 80% efficient"
    ],
    correctAnswer: 0,
    explanation: "A power factor of 0.8 means that 80% of the apparent power (kVA) is real power (kW) doing useful work. The remaining 20% circulates as reactive power. 'Lagging' indicates an inductive load."
  },
  {
    id: 4,
    question: "The power triangle relates:",
    options: [
      "Voltage, current, and resistance",
      "Real power, reactive power, and apparent power",
      "Phase, neutral, and earth currents",
      "Primary, secondary, and tertiary windings"
    ],
    correctAnswer: 1,
    explanation: "The power triangle is a right-angled triangle showing the relationship between real power (kW), reactive power (kVAR), and apparent power (kVA). The angle represents the phase angle, and its cosine is the power factor."
  },
  {
    id: 5,
    question: "Which formula correctly relates power factor to the power triangle?",
    options: [
      "PF = kVA / kW",
      "PF = kVAR / kW",
      "PF = kW / kVA",
      "PF = kW x kVA"
    ],
    correctAnswer: 2,
    explanation: "Power factor equals real power (kW) divided by apparent power (kVA). This gives a value between 0 and 1, with 1 being perfect (unity) power factor."
  },
  {
    id: 6,
    question: "What happens if too much power factor correction is applied?",
    options: [
      "The power factor becomes leading, which can cause voltage rise",
      "The equipment runs more efficiently",
      "Nothing - you can't over-correct",
      "The capacitors will fail immediately"
    ],
    correctAnswer: 0,
    explanation: "Over-correction creates a leading power factor (capacitive), which can cause voltage rise, particularly at light load conditions. This can damage equipment and may not be accepted by the DNO."
  },
  {
    id: 7,
    question: "Automatic power factor correction equipment:",
    options: [
      "Maintains a fixed amount of correction at all times",
      "Switches capacitor stages in and out to maintain target power factor",
      "Only operates during peak hours",
      "Requires manual adjustment"
    ],
    correctAnswer: 1,
    explanation: "Automatic PFC equipment monitors the power factor and switches capacitor stages in or out as load varies. This maintains the target power factor without over-correcting at light loads."
  },
  {
    id: 8,
    question: "The main benefit of power factor correction for consumers is:",
    options: [
      "Increased voltage at equipment",
      "Reduced current for the same power, lower charges, and smaller cables",
      "Faster motor speeds",
      "Elimination of harmonics"
    ],
    correctAnswer: 1,
    explanation: "PFC reduces the current needed to deliver the same real power. This means smaller cables, reduced losses, potentially avoiding supply upgrades, and avoiding reactive power charges from suppliers."
  },
  {
    id: 9,
    question: "Harmonics from modern loads (e.g., VSDs) affect power factor correction by:",
    options: [
      "Improving the power factor automatically",
      "Having no effect on capacitors",
      "Potentially causing capacitor resonance and damage",
      "Reducing the need for correction"
    ],
    correctAnswer: 2,
    explanation: "Harmonics can cause resonance with PFC capacitors, leading to excessive currents, overheating, and capacitor failure. Detuned reactors or harmonic filters may be needed in installations with significant harmonic loads."
  },
  {
    id: 10,
    question: "Where is power factor correction most commonly applied?",
    options: [
      "At the origin of domestic installations",
      "At individual socket outlets",
      "At the main incoming supply of commercial/industrial installations",
      "Only at generators"
    ],
    correctAnswer: 2,
    explanation: "PFC is most commonly applied at the main incoming supply of commercial and industrial installations where there are significant inductive loads. It can also be applied at individual large motors for bulk correction."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "Do domestic installations need power factor correction?",
    answer: "Generally no. Domestic tariffs don't charge for reactive power, and domestic loads (mostly resistive with some small motors) don't create significant power factor issues. Most domestic equipment has built-in PFC where needed (e.g., computer power supplies)."
  },
  {
    question: "How do I know if a site needs power factor correction?",
    answer: "Check the electricity bills for reactive power charges (kVArh), or measure the power factor with a power quality analyser. Sites with many motors, fluorescent lighting (magnetic ballasts), or other inductive loads often benefit from PFC."
  },
  {
    question: "What target power factor should I aim for?",
    answer: "Typically 0.95 to 0.98 lagging is a good target. Avoid correcting to unity (1.0) as load variations could push it into leading territory, which can cause problems. Check with the DNO for any specific requirements."
  },
  {
    question: "Can LED lighting cause power factor problems?",
    answer: "LED drivers with poor power factor can reduce overall site power factor, though the effect is usually smaller than large motors. Quality LED drivers typically have power factor >0.9. Check specifications when specifying large lighting installations."
  },
  {
    question: "What is the relationship between power factor and harmonics?",
    answer: "Both affect power quality but they're different issues. Power factor relates to the phase relationship of current and voltage at fundamental frequency. Harmonics are currents at multiples of the fundamental. Both reduce true power factor, but require different solutions."
  },
  {
    question: "How often do PFC capacitors need maintenance?",
    answer: "PFC capacitors should be inspected annually for signs of swelling, leakage, or overheating. Check contactor operation and control relay function. Capacitor life is typically 10-15 years but varies with operating conditions and harmonic exposure."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module2Section2_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">

      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module2-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Article Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 2.2.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Power Factor Correction
          </h1>
          <p className="text-white/80">
            Understanding and improving power factor for energy efficiency
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Power Factor:</strong> Ratio of real power (kW) to apparent power (kVA)</li>
              <li><strong>Unity:</strong> PF of 1.0 = all power doing useful work</li>
              <li><strong>Correction:</strong> Capacitors for inductive loads</li>
              <li><strong>Target:</strong> Typically 0.95-0.98 lagging</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> PFC capacitor banks in commercial switchrooms</li>
              <li><strong>Use:</strong> Calculate required kVAR from kW and target PF</li>
              <li><strong>Apply:</strong> Recommend PFC when bills show kVArh charges</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "What power factor is and why it matters",
              "The relationship between kW, kVA, and kVAR",
              "Causes of poor power factor",
              "Power factor correction methods",
              "Automatic vs fixed correction systems",
              "Harmonic considerations with PFC"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Understanding Power Factor
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Power factor is the ratio of real power (kW) - the power actually doing useful work - to apparent power (kVA) - the total power that must be supplied by the electricity network. A power factor of 1 (unity) means all the power supplied is being used productively.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The three types of power:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Real Power (kW):</strong> Does useful work - heating, mechanical motion, light</li>
                <li><strong>Reactive Power (kVAR):</strong> Circulates between supply and inductive/capacitive loads</li>
                <li><strong>Apparent Power (kVA):</strong> Total power the supply must provide (vector sum)</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> You pay for real power (kWh), but the supply system must provide apparent power (kVA). Poor power factor means oversized cables, transformers, and potentially reactive power charges.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Causes of Poor Power Factor
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Most electrical loads in commercial and industrial installations are inductive - they cause current to lag behind voltage. This creates reactive power that oscillates between the supply and load without doing useful work.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Inductive Loads (Lagging PF)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Electric motors (the main cause)</li>
                  <li>Transformers</li>
                  <li>Magnetic ballasts (older fluorescent)</li>
                  <li>Welding equipment</li>
                  <li>Induction furnaces</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Capacitive Loads (Leading PF)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Power factor correction capacitors</li>
                  <li>Long cable runs (capacitance)</li>
                  <li>Some electronic equipment</li>
                  <li>Synchronous motors (over-excited)</li>
                  <li>Static VAR compensators</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Power Factor Correction Methods
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The most common method of correcting lagging power factor is adding capacitors. These provide leading reactive power that cancels out the lagging reactive power from inductive loads, reducing the overall reactive power demand.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A factory has 200kW of motor load with 0.75 power factor. The apparent power is 267kVA (200/0.75). To correct to 0.95 PF requires adding approximately 85kVAR of capacitors. This reduces the apparent power to 211kVA - a significant reduction in current.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Correction approaches:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Bulk correction:</strong> Capacitor bank at main switchboard</li>
                <li><strong>Group correction:</strong> Capacitors for motor control centres or groups</li>
                <li><strong>Individual correction:</strong> Capacitors at each large motor</li>
                <li><strong>Automatic correction:</strong> Switched stages responding to load</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Benefits and Considerations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective power factor correction provides real benefits, but requires proper design to avoid problems. Understanding both the advantages and potential issues ensures successful installations.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Reduced Current</p>
                <p className="text-white/90 text-xs">Smaller cables and less I2R losses</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Lower Charges</p>
                <p className="text-white/90 text-xs">Avoid reactive power penalties</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Capacity Release</p>
                <p className="text-white/90 text-xs">Defer supply upgrades</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Over-correction causes leading power factor which can raise voltage levels. Harmonic-rich environments need detuned reactors to prevent resonance damage to capacitors.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Assessing PFC Need</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Check electricity bills for reactive power charges (kVArh)</li>
                <li>Measure power factor with a power quality analyser</li>
                <li>Identify main inductive loads (motors, old lighting)</li>
                <li>Calculate potential savings from correction</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Installing PFC</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Size capacitors to achieve target PF (typically 0.95-0.98)</li>
                <li>Use automatic switching for variable loads</li>
                <li>Consider harmonic filters if VSDs or non-linear loads present</li>
                <li>Ensure adequate ventilation for capacitor heat dissipation</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Over-correction to unity</strong> - Can cause leading PF and voltage rise</li>
                <li><strong>Ignoring harmonics</strong> - Can cause capacitor resonance and failure</li>
                <li><strong>Fixed correction on variable loads</strong> - May over-correct at light load</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
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

        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Power Units</p>
                <ul className="space-y-0.5">
                  <li>Real Power: kW (kilowatts)</li>
                  <li>Reactive Power: kVAR</li>
                  <li>Apparent Power: kVA</li>
                  <li>PF = kW / kVA</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Typical Power Factors</p>
                <ul className="space-y-0.5">
                  <li>Unity (ideal): 1.0</li>
                  <li>Target: 0.95-0.98 lagging</li>
                  <li>Motors (uncorrected): 0.7-0.85</li>
                  <li>Resistive loads: 1.0</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
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
            <Link to="../level3-module2-section2-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module2-section2-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module2Section2_2;
