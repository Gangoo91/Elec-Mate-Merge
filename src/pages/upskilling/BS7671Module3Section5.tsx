import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "ads-definition",
    question: "What does ADS stand for in BS 7671?",
    options: [
      "Advanced Detection System",
      "Automatic Disconnection of Supply",
      "Arc Detection Safety",
      "Automatic Device Switching"
    ],
    correctIndex: 1,
    explanation: "ADS stands for Automatic Disconnection of Supply—the protective measure that ensures automatic disconnection during earth faults to prevent electric shock. It's the most common protective measure in UK installations."
  },
  {
    id: "tt-protection",
    question: "What protective method is essential in TT systems?",
    options: [
      "MCBs only",
      "Fuses only",
      "RCD protection is essential",
      "No special protection needed"
    ],
    correctIndex: 2,
    explanation: "TT systems have high earth fault loop impedance (typically 20-200Ω) because the earth electrode resistance is relatively high. This means overcurrent devices cannot achieve fast enough disconnection, making RCD protection essential."
  },
  {
    id: "selv-definition",
    question: "What is SELV?",
    options: [
      "Safety Extra Low Voltage - separated supply ≤50V AC",
      "Standard Electrical Low Voltage",
      "Secure Emergency Low Voltage",
      "Single Earth Low Voltage"
    ],
    correctIndex: 0,
    explanation: "SELV is Safety Extra Low Voltage—a supply not exceeding 50V AC or 120V DC ripple-free, with safety isolation from higher voltages. SELV circuits have no connection to earth, providing protection through voltage limitation alone."
  }
];

const faqs = [
  {
    question: "Why do socket outlets require faster disconnection times than fixed equipment?",
    answer: "Socket outlets present higher risk because they're accessible to anyone, may be used with portable equipment held by hand, and are more likely to experience cord damage or wet contact. The 0.4-second maximum ensures rapid disconnection before dangerous currents can cause harm to people directly holding equipment."
  },
  {
    question: "What's the difference between SELV and PELV?",
    answer: "SELV (Safety Extra Low Voltage) has no earthed points—protection relies entirely on voltage limitation and separation. PELV (Protective Extra Low Voltage) may have an earthed point but maintains the same voltage limits. PELV is used where earthing is needed for functional purposes (e.g., some control circuits)."
  },
  {
    question: "How do I know if my Zs value is acceptable?",
    answer: "Compare your measured Zs against the maximum values in BS 7671 Table 41.2-41.5 for the specific protective device type and rating. The measured value must be lower than the tabulated maximum. Remember to apply the 0.8 multiplier to account for cable temperature rise under fault conditions."
  },
  {
    question: "When should I use an IT system instead of TN or TT?",
    answer: "IT systems are used where continuity of supply is critical (hospitals, laboratories, mines) because the first earth fault doesn't cause disconnection—only an alarm. This allows continued operation while the fault is located and repaired. IT systems require continuous insulation monitoring."
  }
];

const quizQuestion = {
  question: "What's the maximum disconnection time for a 230V socket outlet circuit?",
  options: [
    "5 seconds",
    "0.4 seconds",
    "1 second",
    "0.1 seconds"
  ],
  correctAnswer: 1,
  explanation: "Socket outlets at 230V require maximum 0.4 second disconnection time due to the increased risk of direct contact and portable equipment use. This is specified in BS 7671 Table 41.1 and applies to all final circuits not exceeding 63A."
};

const BS7671Module3Section5 = () => {
  useSEO({
    title: "Earthing Arrangements & Protective Measures | BS 7671 Module 3.5",
    description: "Learn to select appropriate protective measures for different earthing systems including ADS, RCDs, SELV, and PELV per BS 7671 requirements."
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
            <Link to="/study-centre/upskilling/bs7671-module-3">
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
            <span>Module 3.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Earthing Arrangements & Protective Measures
          </h1>
          <p className="text-white/80">
            Matching earthing systems with appropriate protection strategies
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>ADS:</strong> Most common measure—disconnection during earth fault</li>
              <li><strong>Socket circuits:</strong> 0.4s max disconnection time</li>
              <li><strong>TT systems:</strong> RCD protection essential (high Zs)</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Zs test:</strong> Verifies protective device will operate in time</li>
              <li><strong>SELV/PELV:</strong> Protection through voltage limitation (≤50V AC)</li>
              <li><strong>Reference:</strong> BS 7671 Chapter 41</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Evaluate earthing system characteristics and their impact on protection",
              "Design ADS systems with appropriate disconnection times",
              "Calculate and verify earth fault loop impedance (Zs) values",
              "Select appropriate RCD types and ratings for TT systems",
              "Apply SELV and PELV systems where enhanced safety is required",
              "Assess protective measure effectiveness through testing"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1: Automatic Disconnection of Supply */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Automatic Disconnection of Supply (ADS)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              ADS is the most common protective measure in UK installations. It works by ensuring that during an earth fault, the protective device (MCB, RCD, fuse) disconnects the supply quickly enough to prevent dangerous shock.
            </p>

            <div className="p-5 rounded-lg bg-white/5 my-6">
              <h3 className="text-sm font-medium text-elec-yellow mb-3">Disconnection Time Requirements (230V)</h3>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-white mb-2">Final Circuits ≤63A</p>
                  <ul className="text-white/90 space-y-1">
                    <li><strong>TN systems:</strong> 0.4 seconds maximum</li>
                    <li><strong>TT systems:</strong> 0.2 seconds (or 1s with RCD)</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-2">Distribution Circuits &gt;63A</p>
                  <ul className="text-white/90 space-y-1">
                    <li><strong>TN systems:</strong> 5 seconds maximum</li>
                    <li><strong>TT systems:</strong> 1 second maximum</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">ADS Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Earthing:</strong> All exposed-conductive-parts connected to earth</li>
                  <li><strong>Bonding:</strong> Main equipotential bonding in place</li>
                  <li><strong>Low Zs:</strong> Earth fault loop impedance allows fault current</li>
                  <li><strong>Correct device:</strong> Protective device trips in required time</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Testing ADS Effectiveness</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Zs test:</strong> Measure earth fault loop impedance</li>
                  <li><strong>Compare:</strong> Check against BS 7671 maximum values</li>
                  <li><strong>Apply factor:</strong> Multiply measured by 0.8 (temp rise)</li>
                  <li><strong>Document:</strong> Record on schedule of test results</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Check 1 */}
        <div className="mb-10">
          <InlineCheck {...quickCheckQuestions[0]} />
        </div>

        {/* Section 2: Protective Devices */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Protective Devices for Earth Fault Protection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Different protective devices have different characteristics. The choice depends on the earthing system, circuit type, and required disconnection time.
            </p>

            <div className="my-6 overflow-x-auto">
              <table className="w-full text-sm border border-white/10 rounded-lg overflow-hidden">
                <thead className="bg-white/5">
                  <tr>
                    <th className="text-left p-3 text-elec-yellow font-medium">Device</th>
                    <th className="text-left p-3 text-elec-yellow font-medium">Best For</th>
                    <th className="text-left p-3 text-elec-yellow font-medium">Limitations</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-white/5">
                    <td className="p-3 font-medium">MCB (Type B)</td>
                    <td className="p-3">General circuits, resistive loads</td>
                    <td className="p-3 text-white/70 text-xs">Trips 3-5× In; needs low Zs</td>
                  </tr>
                  <tr className="border-t border-white/5">
                    <td className="p-3 font-medium">MCB (Type C)</td>
                    <td className="p-3">Motor starting, discharge lighting</td>
                    <td className="p-3 text-white/70 text-xs">Trips 5-10× In; higher Zs limit</td>
                  </tr>
                  <tr className="border-t border-white/5">
                    <td className="p-3 font-medium">RCD (30mA)</td>
                    <td className="p-3">Additional protection, TT systems</td>
                    <td className="p-3 text-white/70 text-xs">Sensitive to earth leakage; nuisance trips</td>
                  </tr>
                  <tr className="border-t border-white/5">
                    <td className="p-3 font-medium">RCBO</td>
                    <td className="p-3">Individual circuit protection</td>
                    <td className="p-3 text-white/70 text-xs">Higher cost; selective protection</td>
                  </tr>
                  <tr className="border-t border-white/5">
                    <td className="p-3 font-medium">Fuse (BS 88)</td>
                    <td className="p-3">High fault current applications</td>
                    <td className="p-3 text-white/70 text-xs">Slow operation; needs replacement</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">RCD Selection for TT Systems</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>30mA:</strong> Required for socket outlets, additional protection</li>
                <li><strong>100mA:</strong> May be used for fire protection where 30mA not practical</li>
                <li><strong>300mA:</strong> Suitable for equipment with high earth leakage</li>
                <li><strong>Time-delayed:</strong> For discrimination with downstream RCDs</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Inline Check 2 */}
        <div className="mb-10">
          <InlineCheck {...quickCheckQuestions[1]} />
        </div>

        {/* Section 3: SELV and PELV */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            SELV and PELV Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Where ADS cannot provide adequate protection, or where enhanced safety is required, SELV or PELV systems provide protection through voltage limitation rather than disconnection.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">SELV (Safety Extra Low Voltage)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• Maximum 50V AC or 120V DC</li>
                  <li>• No connection to earth</li>
                  <li>• Safety isolation from higher voltages</li>
                  <li><strong>Use:</strong> Swimming pools, bathrooms, special locations</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">PELV (Protective Extra Low Voltage)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• Maximum 50V AC or 120V DC</li>
                  <li>• May have earthed point</li>
                  <li>• Safety isolation maintained</li>
                  <li><strong>Use:</strong> Control circuits, machine tools</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-3">SELV Source Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>• Safety isolating transformer to BS EN 61558</li>
                <li>• Motor generator with equivalent isolation</li>
                <li>• Electronic source with equivalent safety</li>
                <li>• Battery or solar cells (no connection to higher voltages)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Inline Check 3 */}
        <div className="mb-10">
          <InlineCheck {...quickCheckQuestions[2]} />
        </div>

        {/* Section 4: Zs Calculations */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Earth Fault Loop Impedance (Zs)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Zs is the total impedance of the earth fault loop—from the source, through the live conductor, fault, and back via the earth path. Low Zs ensures high fault current for fast disconnection.
            </p>

            <div className="p-5 rounded-lg bg-white/5 my-6">
              <h3 className="text-sm font-medium text-elec-yellow mb-3">Zs Calculation</h3>
              <div className="text-center mb-4">
                <p className="text-lg font-mono text-white">Zs = Ze + (R1 + R2)</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-white mb-2">Where:</p>
                  <ul className="text-white/90 space-y-1">
                    <li><strong>Zs:</strong> Total earth fault loop impedance</li>
                    <li><strong>Ze:</strong> External earth fault loop impedance</li>
                    <li><strong>R1:</strong> Line conductor resistance</li>
                    <li><strong>R2:</strong> CPC resistance</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-2">Typical Ze Values:</p>
                  <ul className="text-white/90 space-y-1">
                    <li><strong>TN-S:</strong> 0.35Ω typical, 0.8Ω max</li>
                    <li><strong>TN-C-S:</strong> 0.20Ω typical, 0.35Ω max</li>
                    <li><strong>TT:</strong> 20-200Ω (earth electrode)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Verification Process</p>
              <ol className="text-sm text-white space-y-2 ml-4">
                <li><strong>1.</strong> Measure Zs at furthest point of circuit</li>
                <li><strong>2.</strong> Multiply measured value by 0.8 (temperature correction)</li>
                <li><strong>3.</strong> Compare against BS 7671 maximum for device type/rating</li>
                <li><strong>4.</strong> If exceeded, upsize CPC or add RCD protection</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Real World Scenario */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Real World Scenario</h2>
          <div className="p-5 rounded-lg bg-red-500/5 border border-red-500/20">
            <h3 className="text-sm font-medium text-red-400 mb-3">TN System Zs Test Failure</h3>
            <p className="text-sm text-white mb-3">
              A TN-C-S system circuit with a long cable run fails the Zs test. The measured Zs of 1.8Ω exceeds the 1.15Ω maximum for the 32A Type B MCB installed. The installer selected cable based only on current-carrying capacity, not earth fault requirements.
            </p>
            <div className="p-3 rounded bg-white/5 text-sm mb-3">
              <p><strong>Problem:</strong> Long cable run increased R1+R2 beyond acceptable limits.</p>
            </div>
            <div className="p-3 rounded bg-green-500/5 border border-green-500/20">
              <p className="text-sm text-green-400 font-medium mb-1">Solutions:</p>
              <ul className="text-sm text-white space-y-1">
                <li>• Increase cable CSA to reduce R1+R2</li>
                <li>• Use larger CPC (e.g., 4mm² instead of 2.5mm²)</li>
                <li>• Add 30mA RCD protection (removes Zs limit)</li>
                <li>• Use Type C MCB (higher Zs limit acceptable)</li>
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

        {/* Quick Reference */}
        <div className="mt-6 p-5 rounded-lg bg-transparent border border-white/10">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-elec-yellow mb-1">Disconnection Times (230V)</p>
              <ul className="space-y-0.5 text-white/90">
                <li>Socket circuits TN: 0.4s max</li>
                <li>Socket circuits TT: 0.2s (or RCD)</li>
                <li>Distribution TN: 5s max</li>
                <li>SELV/PELV: ≤50V AC, ≤120V DC</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-elec-yellow mb-1">Key Protective Measures</p>
              <ul className="space-y-0.5 text-white/90">
                <li>ADS: Main measure, Zs critical</li>
                <li>RCD: Essential for TT, 30mA sockets</li>
                <li>SELV: No earth, voltage limitation</li>
                <li>PELV: Earthed, voltage limitation</li>
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
            <Link to="/study-centre/upskilling/bs7671-module-3-section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/bs7671-module-3-section-6">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BS7671Module3Section5;
