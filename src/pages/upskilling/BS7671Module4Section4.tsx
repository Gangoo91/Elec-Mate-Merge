import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "rcd-trip-current",
    question: "At what current level does a 30mA RCD typically trip?",
    options: ["Exactly 30mA only", "30mA or above", "15mA only", "100mA"],
    correctIndex: 1,
    explanation: "A 30mA RCD will trip when the residual current reaches 30mA or above, providing protection against earth leakage currents that could cause electric shock."
  },
  {
    id: "type-a-rcd",
    question: "Which RCD type is suitable for appliances with pulsed DC leakage?",
    options: ["Type AC", "Type A", "Type S", "Type B"],
    correctIndex: 1,
    explanation: "Type A RCDs can detect both AC and pulsating DC residual currents, making them suitable for modern appliances that may produce pulsed DC leakage currents."
  },
  {
    id: "s-type-purpose",
    question: "What does an S-type (selective) RCD provide?",
    options: ["Surge protection", "Time delay for selectivity", "Single-phase only protection", "Extra earth leakage detection"],
    correctIndex: 1,
    explanation: "S-type (selective) RCDs have a built-in time delay to provide discrimination with downstream RCDs, preventing unnecessary tripping of upstream devices when only a local fault occurs."
  }
];

const faqs = [
  {
    question: "Why do RCDs need regular testing?",
    answer: "RCDs contain mechanical and electronic components that can degrade over time. Regular testing (user monthly, professional at periodic inspection) ensures the device still trips within required parameters."
  },
  {
    question: "Can I use Type AC RCDs in new installations?",
    answer: "Type AC RCDs are being phased out for many applications. BS 7671 generally requires Type A minimum for most circuits, as modern equipment can produce pulsating DC leakage that Type AC cannot detect."
  },
  {
    question: "What causes nuisance tripping of RCDs?",
    answer: "Common causes include cumulative earth leakage from multiple appliances, moisture ingress, faulty equipment, and using the wrong RCD type for the load. Type F or Type B RCDs may reduce nuisance tripping with modern electronics."
  },
  {
    question: "When is Type B RCD required?",
    answer: "Type B RCDs are mandatory for EV charging points and solar PV inverters because these systems can produce smooth DC residual currents that Type A RCDs cannot detect."
  }
];

const quizQuestion = {
  question: "Where are 30mA RCDs required under the 18th Edition?",
  options: [
    "Only in bathrooms",
    "Only outdoor circuits",
    "All socket outlets ≤32A, special locations, and generally all final circuits in new domestic installations",
    "Only TT systems"
  ],
  correctAnswer: 2,
  explanation: "The 18th Edition requires RCD protection for socket outlets ≤32A, circuits in special locations like bathrooms, and generally all final circuits in new domestic installations."
};

const BS7671Module4Section4 = () => {
  useSEO({
    title: "Residual Current Devices (RCDs) | BS7671 Module 4.4",
    description: "Understand RCD types, operation principles, and BS 7671 requirements for residual current device installation and testing."
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/bs7671-module-4">
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
            <span>Module 4.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Residual Current Devices (RCDs)
          </h1>
          <p className="text-white/80">
            Use and Placement for Maximum Safety
          </p>
        </header>

        {/* Quick Summary */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Function:</strong> Detects earth leakage and disconnects supply</li>
              <li><strong>Sensitivity:</strong> 30mA for shock protection, 100mA for fire</li>
              <li><strong>Response:</strong> Trips within 40ms at 5×IΔn</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Consumer units, distribution boards, as RCBOs</li>
              <li><strong>Use:</strong> Select correct type for load characteristics</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand RCD types and sensitivity ratings",
              "Identify when and where RCDs are required under BS 7671",
              "Learn how RCDs complement other protective devices",
              "Recognise limitations and special installation considerations"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1: Operating Principle */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            How RCDs Work
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              RCDs continuously monitor the balance between live conductors. In a healthy circuit, current flowing out through the line conductor should equal current returning through the neutral. When an earth fault occurs, some current flows to earth instead of returning through neutral, creating an imbalance.
            </p>
            <p>
              When this imbalance reaches the device's rated sensitivity (typically 30mA), the RCD trips and disconnects the supply within milliseconds, providing protection against electric shock and reducing fire risk.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Operating Sequence:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>1. Monitoring:</strong> Toroidal transformer monitors current flow continuously</li>
                <li><strong>2. Detection:</strong> Compares outgoing line current with returning neutral</li>
                <li><strong>3. Sensing:</strong> Detects any imbalance indicating earth leakage</li>
                <li><strong>4. Tripping:</strong> Activates when threshold exceeded (typically 30mA)</li>
                <li><strong>5. Disconnection:</strong> Opens contacts within 10-40 milliseconds</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Types of RCDs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Types of RCDs
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Different RCD types are designed to detect different waveforms of residual current. Modern appliances often produce complex leakage currents that older RCD types cannot detect effectively.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Standard Types</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Type AC:</strong> Standard AC residual currents only - being phased out</li>
                  <li><strong>Type A:</strong> AC and pulsating DC - now standard requirement</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Advanced Types</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Type F:</strong> Up to 1kHz - for VSDs and LED lighting</li>
                  <li><strong>Type B:</strong> All types including smooth DC - for EV charging</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Type A</p>
                <p className="text-white/90 text-xs">Most applications</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Type F</p>
                <p className="text-white/90 text-xs">VSDs, electronics</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Type B</p>
                <p className="text-white/90 text-xs">EV charging, PV</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: BS 7671 Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            BS 7671 Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The 18th Edition significantly expanded RCD requirements, making them mandatory for most final circuits in new installations and many existing installation modifications.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Mandatory 30mA RCD Protection:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>All socket outlets rated 32A or less</li>
                <li>All circuits in bathrooms (except SELV)</li>
                <li>Outdoor installations and equipment</li>
                <li>Swimming pools and surrounding areas</li>
                <li>Construction sites and temporary installations</li>
                <li>All final circuits in new domestic installations</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">TT Systems</p>
                <ul className="text-sm text-white space-y-1">
                  <li>RCD protection essential for all circuits</li>
                  <li>Cannot achieve fast disconnection otherwise</li>
                  <li>Usually 100mA for fire protection</li>
                  <li>30mA for additional shock protection</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">TN Systems</p>
                <ul className="text-sm text-white space-y-1">
                  <li>RCD provides additional protection</li>
                  <li>Required for specific circuits/locations</li>
                  <li>Helps with high impedance faults</li>
                  <li>Fire protection benefit</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Selectivity and Discrimination */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Selectivity and Discrimination
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In installations with multiple RCDs, proper selectivity ensures that only the RCD closest to the fault trips, maintaining power to unaffected circuits.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Time-Delayed (S-Type) RCDs:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Built-in delay of 130-500ms before tripping</li>
                <li>Used as main incomer RCDs (upstream)</li>
                <li>Allows downstream RCDs to trip first</li>
                <li>Prevents loss of entire installation on single fault</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Nuisance Tripping Prevention:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Separate high-leakage equipment onto dedicated RCDs</li>
                <li>Use appropriate RCD types for load characteristics</li>
                <li>Consider cumulative earth leakage from multiple appliances</li>
                <li>Use RCBOs for individual circuit protection</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 5: Testing */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Testing and Maintenance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Regular testing ensures RCDs continue to provide protection throughout their service life. Both functional and comprehensive testing are required at different intervals.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Functional Testing (User)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Press test button quarterly (or monthly)</li>
                  <li>RCD should click and switch off</li>
                  <li>Reset after testing</li>
                  <li>Call electrician if no trip occurs</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Professional Testing</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Calibrated RCD tester required</li>
                  <li>Test at 50%, 100%, and 500% of IΔn</li>
                  <li>Record trip times and currents</li>
                  <li>At IΔn: ≤300ms, at 5×IΔn: ≤40ms</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Real World Scenario */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Real World Scenario
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Kitchen Rewiring with RCD Protection</p>
              <p className="text-sm mb-3">
                An electrician is rewiring a domestic kitchen as part of a larger renovation project. The new installation must comply with the 18th Edition requirements for RCD protection.
              </p>
              <p className="text-sm mb-2">
                <strong>Design Solution:</strong> The electrician installs individual RCBOs (combined MCB + RCD) for each final circuit, providing both overload protection and 30mA RCD protection.
              </p>
              <p className="text-sm mb-2">
                <strong>Circuits Protected:</strong> Ring final circuit for sockets, radial circuit for dishwasher, dedicated circuit for electric oven, under-cabinet lighting circuit.
              </p>
              <p className="text-sm">
                <strong>Benefits:</strong> Each circuit has independent protection, fault on one circuit won't affect others, easier fault finding, compliance with current standards.
              </p>
            </div>
          </div>
        </section>

        {/* Section 7: Amendment 3 Updates */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Amendment 3 RCD Updates
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Amendment 3 enhanced RCD requirements, introducing new applications and improved selectivity requirements for modern electrical systems.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">EV Charging Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Type B RCD mandatory for EV charging</li>
                  <li>6mA DC fault detection capability</li>
                  <li>Coordination with smart charging systems</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Energy Storage Systems</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Type B RCD for inverter AC output</li>
                  <li>DC residual current monitoring</li>
                  <li>Emergency shutdown coordination</li>
                </ul>
              </div>
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
        <div className="mt-6 p-5 rounded-lg bg-transparent">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">RCD Types</p>
              <ul className="space-y-0.5">
                <li>Type AC: AC only (obsolete)</li>
                <li>Type A: AC + pulsating DC (standard)</li>
                <li>Type F: High frequency (electronics)</li>
                <li>Type B: All types (EV, PV)</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Trip Times</p>
              <ul className="space-y-0.5">
                <li>At IΔn: ≤300ms</li>
                <li>At 5×IΔn: ≤40ms</li>
                <li>S-type: Additional delay 130-500ms</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz */}
        <section className="mb-10">
          <SingleQuestionQuiz
            question={quizQuestion.question}
            options={quizQuestion.options}
            correctAnswer={quizQuestion.correctAnswer}
            explanation={quizQuestion.explanation}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bs7671-module-4-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bs7671-module-4-section-5">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BS7671Module4Section4;
