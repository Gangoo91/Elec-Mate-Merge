import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "overcurrent-types",
    question: "What are the two main types of overcurrent?",
    options: [
      "Voltage surge and voltage dip",
      "Overload and short-circuit",
      "Earth fault and line fault",
      "Phase imbalance and harmonic distortion"
    ],
    correctIndex: 1,
    explanation: "The two main types of overcurrent are overload (gradual current increase beyond design capacity, 1.1-10× rated) and short-circuit (sudden high current due to low impedance path, 10-1000+× rated). Each requires different protection characteristics."
  },
  {
    id: "rcbo-function",
    question: "Which device combines overcurrent and earth fault protection?",
    options: [
      "MCB",
      "MCCB",
      "RCBO",
      "Fuse"
    ],
    correctIndex: 2,
    explanation: "RCBO (Residual Current Breaker with Overcurrent protection) combines both overcurrent protection (like an MCB) and earth fault protection (like an RCD) in a single device, providing comprehensive circuit protection."
  },
  {
    id: "type-d-mcb",
    question: "When would you typically use a Type D MCB?",
    options: [
      "For lighting circuits only",
      "For socket outlet circuits",
      "For motors with high starting currents",
      "For computer equipment"
    ],
    correctIndex: 2,
    explanation: "Type D MCBs have the highest tripping threshold (10-20× In for magnetic trip) and are used for loads with very high inrush currents such as large motors, transformers, and welding equipment where Type B or C would nuisance trip."
  }
];

const faqs = [
  {
    question: "How do I choose between Type B, C, and D MCBs?",
    answer: "Type B (trips at 3-5× In): General circuits—lighting, sockets, resistive loads. Type C (trips at 5-10× In): Motors with moderate starting current, discharge lighting, IT equipment with inrush. Type D (trips at 10-20× In): Large motors, transformers, welding equipment with very high starting currents."
  },
  {
    question: "What is discrimination (selectivity) and why does it matter?",
    answer: "Discrimination ensures only the protective device closest to a fault operates, maintaining supply to unaffected circuits. Without proper discrimination, upstream devices may trip unnecessarily, causing widespread disruption. Achieved through current grading (2:1 ratio typical), time grading, or energy discrimination."
  },
  {
    question: "What is breaking capacity and why must I verify it?",
    answer: "Breaking capacity (Icn or Icu) is the maximum fault current a device can safely interrupt. It must exceed the prospective fault current (PFC) at the installation point. If PFC exceeds breaking capacity, the device may fail to interrupt the fault, potentially causing fire or explosion."
  },
  {
    question: "When should I consider AFDD (Arc Fault Detection Device) protection?",
    answer: "AFDDs detect series arc faults that MCBs cannot sense (high resistance faults producing less current than trip threshold but generating heat/fire risk). Recommended for final circuits in sleeping accommodation, locations with combustible materials, and buildings with aging wiring where arcing risk is higher."
  }
];

const quizQuestion = {
  question: "What does 'discrimination' mean in overcurrent protection?",
  options: [
    "Choosing the right device type",
    "Setting the correct current rating",
    "Ensuring only the device closest to the fault operates",
    "Matching device characteristics to load"
  ],
  correctAnswer: 2,
  explanation: "Discrimination (selectivity) ensures that when a fault occurs, only the protective device closest to the fault operates, leaving the rest of the installation energised. This minimises disruption and maintains supply to unaffected areas."
};

const BS7671Module4Section2 = () => {
  useSEO({
    title: "Overcurrent Protection & Device Selection | BS 7671 Module 4.2",
    description: "Learn to select MCBs, fuses, RCBOs and understand discrimination, breaking capacity, and AFDD protection per BS 7671 requirements."
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
            <Link to="/electrician/upskilling/bs7671-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 4.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Overcurrent Protection & Device Selection
          </h1>
          <p className="text-white/80">
            Understanding protective devices and selection criteria
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Overload:</strong> 1.1-10× rated current, gradual heating</li>
              <li><strong>Short-circuit:</strong> 10-1000+× rated, milliseconds to damage</li>
              <li><strong>Protection must:</strong> Match load, exceed PFC, coordinate with system</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Type B MCB:</strong> General circuits (3-5× In)</li>
              <li><strong>Type C MCB:</strong> Motors, IT equipment (5-10× In)</li>
              <li><strong>Type D MCB:</strong> High inrush loads (10-20× In)</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Analyse overload and short-circuit conditions and their consequences",
              "Select appropriate protective devices based on load characteristics",
              "Calculate breaking capacity requirements for installations",
              "Design protection schemes with proper discrimination",
              "Evaluate modern protection technologies including AFDDs",
              "Apply Amendment 2/3 requirements for enhanced protection"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1: Types of Overcurrent */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Types of Overcurrent
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Overcurrent occurs when current in a circuit exceeds the designed or rated value. Different types require different protection strategies and device characteristics.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-orange-400/80 mb-2">Overload Current</p>
                <p className="text-xs text-white/70 mb-2">Gradual increase beyond design capacity</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Level:</strong> 1.1 to 10× rated current</li>
                  <li><strong>Duration:</strong> Seconds to hours before damage</li>
                  <li><strong>Causes:</strong> Additional loads, motor stalling</li>
                  <li><strong>Effects:</strong> Gradual heating, insulation degradation</li>
                  <li><strong>Protection:</strong> Thermal or thermal-magnetic devices</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-2">Short-Circuit Current</p>
                <p className="text-xs text-white/70 mb-2">Sudden high current from low impedance path</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Level:</strong> 10 to 1000+× rated current</li>
                  <li><strong>Duration:</strong> Milliseconds before severe damage</li>
                  <li><strong>Causes:</strong> Insulation failure, conductor contact</li>
                  <li><strong>Effects:</strong> Magnetic forces, arcing, fire risk</li>
                  <li><strong>Protection:</strong> Magnetic or current-limiting devices</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Check 1 */}
        <div className="mb-10">
          <InlineCheck {...quickCheckQuestions[0]} />
        </div>

        {/* Section 2: MCB Types and Selection */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            MCB Types and Selection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              MCBs combine thermal (overload) and magnetic (short-circuit) protection. The type letter indicates the instantaneous magnetic trip threshold.
            </p>

            <div className="my-6 overflow-x-auto">
              <table className="w-full text-sm border border-white/10 rounded-lg overflow-hidden">
                <thead className="bg-white/5">
                  <tr>
                    <th className="text-left p-3 text-elec-yellow font-medium">Type</th>
                    <th className="text-left p-3 text-elec-yellow font-medium">Magnetic Trip</th>
                    <th className="text-left p-3 text-elec-yellow font-medium">Typical Applications</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-white/5">
                    <td className="p-3 font-medium">Type B</td>
                    <td className="p-3">3-5× In</td>
                    <td className="p-3 text-white/70 text-xs">Lighting, sockets, resistive loads</td>
                  </tr>
                  <tr className="border-t border-white/5">
                    <td className="p-3 font-medium">Type C</td>
                    <td className="p-3">5-10× In</td>
                    <td className="p-3 text-white/70 text-xs">Motors, discharge lighting, IT equipment</td>
                  </tr>
                  <tr className="border-t border-white/5">
                    <td className="p-3 font-medium">Type D</td>
                    <td className="p-3">10-20× In</td>
                    <td className="p-3 text-white/70 text-xs">Large motors, transformers, welding</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Selection Considerations</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Inrush current:</strong> Motors 6-8× FLC, transformers up to 25× In</li>
                <li><strong>Load type:</strong> Resistive (low inrush), inductive (high inrush)</li>
                <li><strong>Discrimination:</strong> Upstream device must coordinate with downstream</li>
                <li><strong>Zs limits:</strong> Type affects maximum earth fault loop impedance</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Inline Check 2 */}
        <div className="mb-10">
          <InlineCheck {...quickCheckQuestions[1]} />
        </div>

        {/* Section 3: Breaking Capacity */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Breaking Capacity & Prospective Fault Current
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Breaking capacity must exceed the maximum prospective fault current (PFC) at the installation point. If PFC exceeds breaking capacity, the device cannot safely interrupt the fault.
            </p>

            <div className="p-5 rounded-lg bg-white/5 my-6">
              <h3 className="text-sm font-medium text-elec-yellow mb-3">Breaking Capacity Ratings</h3>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-white mb-2">Rating Types:</p>
                  <ul className="text-white/90 space-y-1">
                    <li><strong>Icn:</strong> Ultimate (maximum) breaking capacity</li>
                    <li><strong>Ics:</strong> Service breaking capacity (usually 50-100% of Icn)</li>
                    <li><strong>Icw:</strong> Short-time withstand current</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-2">Typical Values:</p>
                  <ul className="text-white/90 space-y-1">
                    <li>Domestic MCBs: 6kA typical</li>
                    <li>Commercial MCBs: 10-16kA typical</li>
                    <li>Industrial MCCBs: 25-50kA+</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20 my-6">
              <p className="text-sm font-medium text-red-400 mb-2">Critical Requirement</p>
              <p className="text-sm text-white">
                Always verify PFC at the installation point (via DNO enquiry or measurement) and ensure protective device breaking capacity exceeds this value. Close to substations, PFC may exceed 16kA—standard domestic MCBs may be inadequate.
              </p>
            </div>
          </div>
        </section>

        {/* Inline Check 3 */}
        <div className="mb-10">
          <InlineCheck {...quickCheckQuestions[2]} />
        </div>

        {/* Section 4: Modern Protection Technologies */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            AFDD and Modern Protection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Arc Fault Detection Devices (AFDDs) detect dangerous series arc faults that MCBs cannot sense—high resistance faults producing heat and fire risk without sufficient current to trip overcurrent protection.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">AFDD Detection Capabilities</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• Series arc faults (high resistance)</li>
                  <li>• Parallel arc faults (line to line/earth)</li>
                  <li>• Combination arc fault patterns</li>
                  <li>• Distinguishes normal arcing (switches, motors)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Amendment 2/3 Recommendations</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• Final circuits in sleeping accommodation</li>
                  <li>• Locations with combustible materials</li>
                  <li>• Higher risk buildings (care homes, HMOs)</li>
                  <li>• Historic buildings with aging wiring</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Smart Protection Systems:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Smart MCBs:</strong> Remote monitoring, energy tracking, predictive maintenance</li>
                <li><strong>IoT integration:</strong> Real-time fault notifications, historical data analysis</li>
                <li><strong>Load pattern recognition:</strong> Automated load management and optimization</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Real World Scenario */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Real World Scenario</h2>
          <div className="p-5 rounded-lg bg-red-500/5 border border-red-500/20">
            <h3 className="text-sm font-medium text-red-400 mb-3">Industrial Motor Nuisance Tripping</h3>
            <p className="text-sm text-white mb-3">
              A factory reports frequent MCB tripping on a 15kW motor circuit. The installer used Type B MCBs. Motor starting current is approximately 7× full load current, exceeding the Type B magnetic trip threshold.
            </p>
            <div className="p-3 rounded bg-green-500/5 border border-green-500/20">
              <p className="text-sm text-green-400 font-medium mb-1">Solution:</p>
              <p className="text-sm text-white">
                Replace with Type D MCB (10-20× In threshold) or Type C MCB with soft-start motor controller. The higher magnetic trip threshold allows motor starting current without nuisance tripping while maintaining fault protection.
              </p>
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

        {/* Quick Reference */}
        <div className="mt-6 p-5 rounded-lg bg-transparent border border-white/10">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-elec-yellow mb-1">MCB Types</p>
              <ul className="space-y-0.5 text-white/90">
                <li>Type B: 3-5× In (general use)</li>
                <li>Type C: 5-10× In (motors, IT)</li>
                <li>Type D: 10-20× In (high inrush)</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-elec-yellow mb-1">Breaking Capacity</p>
              <ul className="space-y-0.5 text-white/90">
                <li>Domestic: 6kA minimum</li>
                <li>Commercial: 10-16kA typical</li>
                <li>Must exceed PFC at installation</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz */}
        <section className="my-10">
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
            <Link to="/study-centre/upskilling/bs7671-module-4-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/bs7671-module-4-section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BS7671Module4Section2;
