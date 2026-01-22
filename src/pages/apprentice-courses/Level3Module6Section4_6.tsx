/**
 * Level 3 Module 6 Section 4.6 - Discrimination
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Discrimination - Level 3 Module 6 Section 4.6";
const DESCRIPTION = "Learn about discrimination (selectivity) between protective devices. Understand time and current discrimination, cascade protection, and coordinating MCBs, fuses and RCDs per BS 7671.";

const quickCheckQuestions = [
  { id: "check-1", question: "What is the purpose of discrimination between protective devices?", options: ["To reduce installation cost", "To ensure only the device nearest the fault operates", "To increase fault current", "To speed up all devices"], correctIndex: 1, explanation: "Discrimination ensures only the protective device nearest the fault operates, leaving other circuits unaffected. This improves supply continuity and simplifies fault location." },
  { id: "check-2", question: "What ratio of ratings typically achieves discrimination between MCBs of the same type?", options: ["1:1", "2:1", "3:1 or greater", "1.5:1"], correctIndex: 2, explanation: "For MCBs of the same type (e.g., both Type B), a ratio of 3:1 or greater typically provides discrimination. Devices of different types may achieve discrimination at lower ratios." },
  { id: "check-3", question: "Which type of discrimination relies on the device nearest the fault operating faster?", options: ["Current discrimination", "Time discrimination", "Energy discrimination", "Zone discrimination"], correctIndex: 1, explanation: "Time discrimination uses the principle that the device nearest the fault operates faster due to higher fault current, while upstream devices see lower current and take longer." },
  { id: "check-4", question: "What is back-up protection (cascading)?", options: ["Using two RCDs in series", "Allowing upstream device to help clear downstream faults", "Installing spare MCBs", "Using larger cables"], correctIndex: 1, explanation: "Back-up protection (cascading) allows an upstream device to assist in clearing faults that exceed the downstream device's breaking capacity, but requires specific manufacturer verification." }
];

const quizQuestions = [
  { id: 1, question: "Discrimination is also known as:", options: ["Coordination", "Selectivity", "Both A and B", "Neither"], correctAnswer: 2, explanation: "Discrimination is also called selectivity or coordination - all terms describe the same concept of only the nearest device operating on fault." },
  { id: 2, question: "For a 32A downstream MCB, what upstream MCB rating provides likely discrimination?", options: ["40A", "63A", "100A (3:1 ratio)", "32A"], correctAnswer: 2, explanation: "With a 3:1 ratio, a 100A upstream device (100:32 = 3.125:1) would provide discrimination with the 32A downstream device." },
  { id: 3, question: "What information is needed to verify discrimination between MCBs?", options: ["Cable colours only", "Time-current characteristic curves from manufacturer", "Only the device ratings", "Installation method"], correctAnswer: 1, explanation: "Manufacturers provide time-current characteristic curves showing operating times at different currents. Comparing curves shows if discrimination is achieved." },
  { id: 4, question: "BS 7671 Regulation 536.1 states that discrimination:", options: ["Is always mandatory", "May be required where lack would cause danger or damage", "Is never required", "Only applies to RCDs"], correctAnswer: 1, explanation: "Regulation 536.1 states discrimination may be required where lack of discrimination could cause danger, inconvenience or damage." },
  { id: 5, question: "Two RCDs in series require what for time discrimination?", options: ["Same rating", "Upstream device has delayed operation (Type S)", "Both must be 30mA", "No special requirements"], correctAnswer: 1, explanation: "For RCD discrimination, the upstream device typically needs delayed operation (Type S or time-delayed) to allow the downstream RCD to operate first." },
  { id: 6, question: "A main switch upstream of MCBs typically achieves discrimination because:", options: ["It has higher current rating", "It operates on different principle (not current-dependent)", "It is larger physically", "It costs more"], correctAnswer: 1, explanation: "Main switches (isolators) do not automatically trip on overcurrent, so they don't compete with downstream MCBs for fault clearance." },
  { id: 7, question: "Energy let-through (I2t) is important for discrimination because:", options: ["It affects cable cost", "Downstream device must clear fault before upstream device reaches its energy limit", "It determines cable colour", "It sets RCD sensitivity"], correctAnswer: 1, explanation: "If the downstream device clears the fault quickly enough, the energy let-through won't trigger the upstream device's magnetic trip." },
  { id: 8, question: "What is partial discrimination?", options: ["Only one device installed", "Discrimination achieved up to a certain fault level only", "Discrimination at all fault levels", "No discrimination"], correctAnswer: 1, explanation: "Partial discrimination means devices discriminate at lower fault currents but may both trip at higher fault currents. Still useful in many applications." },
  { id: 9, question: "Which provides easier discrimination: fuses or MCBs?", options: ["MCBs always", "Fuses typically discriminate more readily", "No difference", "Neither discriminate"], correctAnswer: 1, explanation: "Fuses typically achieve discrimination more easily because their time-current curves spread further apart at different ratings. A 2:1 ratio often suffices for fuses." },
  { id: 10, question: "When is discrimination most critical?", options: ["Domestic installations", "Essential services, hospitals, data centres", "Outdoor lighting", "Temporary installations"], correctAnswer: 1, explanation: "Discrimination is critical where supply interruption causes significant impact: hospitals, data centres, continuous processes, essential services." }
];

const faqs = [
  { question: "Do I always need to achieve discrimination?", answer: "Not always. BS 7671 states it may be required where lack would cause danger or damage. In domestic installations, full discrimination is often not critical. In commercial/industrial with essential services, it's very important." },
  { question: "How do I verify discrimination between devices?", answer: "Obtain time-current curves from manufacturers. Plot both devices on same axes. If curves don't overlap at expected fault currents, discrimination is achieved. Manufacturer software tools can also verify this." },
  { question: "What about RCBOs - do they need discrimination?", answer: "RCBOs combine RCD and MCB functions. The overcurrent element follows MCB rules, the RCD element needs time-delay consideration if multiple RCDs are in series." },
  { question: "Can cascade protection replace proper discrimination?", answer: "Cascade (back-up) protection is different - it's about breaking capacity, not selectivity. With cascade, both devices may trip. It's used where downstream device has insufficient breaking capacity alone." }
];

const Level3Module6Section4_6 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5" asChild>
            <Link to="/study-centre/apprentice/level3-module6-section4"><ArrowLeft className="w-4 h-4 mr-2" />Back</Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Purpose:</strong> Only fault-affected circuit loses supply</li>
              <li><strong>MCB ratio:</strong> Typically 3:1 same type for discrimination</li>
              <li><strong>RCDs:</strong> Use Type S (delayed) upstream</li>
              <li><strong>Verify:</strong> Compare time-current curves</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Tiered protection schemes, Type S RCDs</li>
              <li><strong>Use:</strong> Design protection coordination</li>
              <li><strong>Apply:</strong> Essential services, complex installations</li>
            </ul>
          </div>
        </div>

        

        

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3"><span className="text-elec-yellow/80 text-sm font-normal">01</span>What is Discrimination?</h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Discrimination (selectivity) means that when a fault occurs, only the protective device nearest the fault operates, leaving upstream devices and other circuits unaffected. This minimises disruption and makes fault location easier.</p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Benefits of Discrimination:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Other circuits remain energised</li>
                <li>Essential services maintained</li>
                <li>Fault location simplified</li>
                <li>Reduced downtime and disruption</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3"><span className="text-elec-yellow/80 text-sm font-normal">02</span>MCB Discrimination</h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>MCBs have both thermal (overload) and magnetic (short-circuit) trip elements. Discrimination depends on the devices' time-current characteristics.</p>
            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Discrimination Rules</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Same type: typically 3:1 ratio minimum</li>
                  <li>Different types may achieve at lower ratios</li>
                  <li>Compare manufacturer curves for certainty</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Partial Discrimination</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Discrimination at lower fault currents</li>
                  <li>Both may trip at very high faults</li>
                  <li>Often acceptable in practice</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3"><span className="text-elec-yellow/80 text-sm font-normal">03</span>RCD Discrimination</h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>When RCDs are in series, the upstream device must be time-delayed (Type S) to allow the downstream RCD to operate first on earth faults.</p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">RCD Discrimination Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Upstream: Type S (selective/time-delayed) RCD</li>
                <li>Downstream: Standard (instantaneous) RCD</li>
                <li>Sensitivity ratio: upstream typically 3x downstream</li>
                <li>Example: 100mA Type S upstream, 30mA downstream</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3"><span className="text-elec-yellow/80 text-sm font-normal">04</span>Cascade Protection</h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Cascade (back-up) protection is different from discrimination. It allows a lower breaking capacity device to be used where an upstream device can assist fault clearance.</p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Cascade vs Discrimination:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Discrimination:</strong> Only one device trips</li>
                <li><strong>Cascade:</strong> Both devices may trip but combined breaking capacity is adequate</li>
                <li>Cascade requires manufacturer confirmation of tested combinations</li>
                <li>Used to reduce cost where high Ipf exists</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When to Prioritise Discrimination</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Hospitals and healthcare facilities</li>
                <li>Data centres and IT critical systems</li>
                <li>Continuous process industries</li>
                <li>High-rise buildings with essential services</li>
                <li>Emergency and safety systems</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Assuming all MCBs automatically discriminate</li>
                <li>Using instantaneous RCDs in series without time delay</li>
                <li>Confusing cascade with discrimination</li>
                <li>Not checking manufacturer data for specific combinations</li>
              </ul>
            </div>
          </div>
        </section>

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

        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference - Discrimination</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">MCB Ratios (Same Type)</p>
                <ul className="space-y-0.5">
                  <li>32A downstream: 100A upstream (3:1)</li>
                  <li>20A downstream: 63A upstream (3:1)</li>
                  <li>Different types may achieve at 2:1</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">RCD Discrimination</p>
                <ul className="space-y-0.5">
                  <li>Upstream: Type S (delayed)</li>
                  <li>Downstream: Standard (instant)</li>
                  <li>Sensitivity: 3x ratio typical</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <Quiz title="Test Your Knowledge" questions={quizQuestions} />
        </section>

        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5" asChild>
            <Link to="/study-centre/apprentice/level3-module6-section4"><ArrowLeft className="w-4 h-4 mr-2" />Back</Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold" asChild>
            <Link to="/study-centre/apprentice/level3-module6-section5">Next: Section 5<ArrowLeft className="w-4 h-4 ml-2 rotate-180" /></Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default Level3Module6Section4_6;
