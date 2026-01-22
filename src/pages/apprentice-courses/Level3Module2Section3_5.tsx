/**
 * Level 3 Module 2 Section 3.5 - Maintenance and Lifecycle
 * Battery maintenance, performance monitoring, degradation, and end-of-life considerations
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
const TITLE = "Battery Maintenance and Lifecycle - Level 3 Module 2 Section 3.5";
const DESCRIPTION = "Understanding battery maintenance requirements, performance monitoring, degradation factors, and end-of-life disposal for energy storage systems.";

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is 'calendar ageing' in battery systems?",
    options: [
      "The warranty period from manufacture date",
      "Capacity loss that occurs over time even when not in use",
      "Ageing caused only by charge cycles",
      "The recommended replacement schedule"
    ],
    correctIndex: 1,
    explanation: "Calendar ageing refers to capacity degradation that occurs simply due to the passage of time, regardless of whether the battery is being cycled. It's influenced by storage temperature and state of charge. Even an unused battery will slowly lose capacity, which is why batteries should not be stored indefinitely."
  },
  {
    id: "check-2",
    question: "What is the typical end-of-life definition for lithium-ion batteries?",
    options: [
      "When the battery stops working completely",
      "After exactly 10 years",
      "When capacity falls to 70-80% of original",
      "When the warranty expires"
    ],
    correctIndex: 2,
    explanation: "End-of-life is typically defined as when usable capacity falls to 70-80% of original rated capacity. The battery doesn't stop working at this point but may no longer meet the application's requirements. For home storage, a battery at 80% capacity is still useful; for EVs, reduced range may be unacceptable."
  },
  {
    id: "check-3",
    question: "How often should domestic battery systems typically be inspected?",
    options: [
      "Only when there's a fault",
      "Every month",
      "Annually, with periodic electrical inspection as per EIC",
      "Only at the end of warranty"
    ],
    correctIndex: 2,
    explanation: "Most manufacturers recommend annual visual inspection and system health checks. Electrical installations require periodic inspection at intervals specified on the EIC (typically 5 years for domestic). Regular monitoring via the system's app or display helps identify issues between formal inspections."
  },
  {
    id: "check-4",
    question: "What happens to lithium batteries at end of life?",
    options: [
      "They must be disposed of in normal waste",
      "They should be recycled through specialist facilities or repurposed",
      "They can be buried safely",
      "They are returned to the electricity grid"
    ],
    correctIndex: 1,
    explanation: "Lithium batteries contain valuable materials and should be recycled through specialist facilities. Many manufacturers and retailers offer take-back schemes. Some end-of-life EV batteries are repurposed for less demanding stationary storage applications ('second life'). Disposal in normal waste is illegal and environmentally harmful."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "Which factor has the greatest impact on lithium-ion battery degradation rate?",
    options: [
      "The colour of the enclosure",
      "Operating temperature, especially high temperatures",
      "The brand of inverter used",
      "The time of day when charging"
    ],
    correctAnswer: 1,
    explanation: "Temperature has the most significant impact on battery degradation. High temperatures accelerate chemical reactions that cause capacity loss. A battery consistently operated at 35°C may degrade twice as fast as one kept at 25°C. This is why installation location and ventilation are so important."
  },
  {
    id: 2,
    question: "What is 'cycle ageing' in batteries?",
    options: [
      "Ageing due to time passing",
      "Degradation caused by repeated charging and discharging",
      "Ageing during shipping",
      "Capacity increase with use"
    ],
    correctAnswer: 1,
    explanation: "Cycle ageing refers to degradation caused by repeated charge/discharge cycles. Each cycle causes small amounts of irreversible change to the electrodes and electrolyte. Deep cycles (high DoD) cause more wear than shallow cycles. Cycle life ratings indicate expected cycles to 70-80% capacity."
  },
  {
    id: 3,
    question: "Why is it beneficial to avoid storing lithium batteries at 100% state of charge for extended periods?",
    options: [
      "It saves electricity",
      "High SoC accelerates calendar ageing",
      "The battery might overflow",
      "It's not beneficial - always store at 100%"
    ],
    correctAnswer: 1,
    explanation: "Storing lithium batteries at high state of charge (especially 100%) accelerates calendar ageing. For long-term storage, 40-60% SoC is ideal. Many battery systems have a 'storage mode' setting. For daily use, full charges are fine - this guidance applies to extended idle periods."
  },
  {
    id: 4,
    question: "What should be checked during an annual battery system inspection?",
    options: [
      "Only the battery colour",
      "Visual condition, connections, ventilation, BMS data, and operating logs",
      "Just the electricity bill",
      "Only the warranty card"
    ],
    correctAnswer: 1,
    explanation: "Annual inspection should include: visual check for damage, swelling, or corrosion; verification that connections are secure; checking ventilation is unobstructed; reviewing BMS data for cell balance and State of Health; and examining operating logs for fault history or unusual patterns."
  },
  {
    id: 5,
    question: "What does a significant imbalance between cell voltages indicate?",
    options: [
      "Normal operation",
      "A potential cell failure or BMS issue requiring investigation",
      "The battery is fully charged",
      "Improved performance"
    ],
    correctAnswer: 1,
    explanation: "Significant cell voltage imbalance may indicate a weak or failing cell, BMS balancing malfunction, or connection issues. Small variations (20-50mV) are normal, but larger differences warrant investigation. Continuing to operate with significant imbalance can damage healthy cells and reduce total capacity."
  },
  {
    id: 6,
    question: "What is 'capacity fade' in battery systems?",
    options: [
      "Temporary capacity reduction in cold weather",
      "Permanent reduction in maximum energy storage capability over time",
      "Reduction in charging speed",
      "Loss of colour on the battery case"
    ],
    correctAnswer: 1,
    explanation: "Capacity fade is the permanent, irreversible reduction in a battery's maximum energy storage capability over time. It's caused by chemical and physical changes to electrodes and electrolyte. A new 10kWh battery may only store 8kWh after several years of use. This is tracked as State of Health (SoH)."
  },
  {
    id: 7,
    question: "How can battery system owners monitor performance between professional inspections?",
    options: [
      "They cannot - only professionals can monitor",
      "Through manufacturer apps, monitoring portals, or inverter displays",
      "By weighing the battery monthly",
      "Only by measuring output voltage with a multimeter"
    ],
    correctAnswer: 1,
    explanation: "Most modern battery systems include monitoring through smartphone apps, web portals, or inverter displays. Users can track State of Charge, daily energy throughput, self-consumption rates, and often State of Health. This data helps identify performance changes and potential issues early."
  },
  {
    id: 8,
    question: "What is 'second life' use for batteries?",
    options: [
      "Using two batteries in parallel",
      "Repurposing degraded EV batteries for less demanding stationary storage",
      "The period after warranty expiry",
      "Using batteries during the day and night"
    ],
    correctAnswer: 1,
    explanation: "Second life refers to repurposing batteries from EVs (typically at 70-80% capacity) for stationary storage applications where the reduced capacity is acceptable. A battery too degraded for vehicle range requirements can still provide years of useful service in home storage applications with lower performance demands."
  },
  {
    id: 9,
    question: "Why is proper disposal of lithium batteries important?",
    options: [
      "Only for the warranty claim",
      "Lithium batteries contain valuable recyclable materials and can be hazardous if improperly disposed",
      "To avoid warranty charges",
      "It's not important - they're safe in landfill"
    ],
    correctAnswer: 1,
    explanation: "Lithium batteries contain valuable materials (lithium, cobalt, nickel) that can be recycled. Improper disposal poses fire risks (damaged batteries in waste) and environmental hazards (chemical leakage). UK regulations require proper disposal through licensed facilities. Many manufacturers offer take-back programs."
  },
  {
    id: 10,
    question: "What maintenance task should NEVER be attempted by untrained personnel on battery systems?",
    options: [
      "Checking the app for status",
      "Visual inspection of the exterior",
      "Opening the battery enclosure or working on internal components",
      "Cleaning dust from ventilation grilles"
    ],
    correctAnswer: 2,
    explanation: "Opening battery enclosures or working on internal components should only be done by trained personnel. High DC voltages present within can cause serious injury or death. Cell terminals can deliver extremely high fault currents. Even 'dead' batteries may contain dangerous residual charge. External visual inspection and cleaning is appropriate for users."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "How long will my battery system last?",
    answer: "Quality lithium batteries typically last 10-15 years with daily cycling. LFP batteries often achieve 4,000-6,000+ cycles before reaching 80% capacity. Actual lifespan depends on operating conditions (especially temperature), depth of discharge, and charging patterns. Most manufacturers warrant 10 years or a specified energy throughput."
  },
  {
    question: "Should I let my battery fully discharge regularly?",
    answer: "No, unlike older battery technologies, lithium batteries don't need regular full discharge cycles. In fact, frequent deep discharges (below 20%) slightly accelerate degradation. Normal daily use with partial cycles is ideal. Occasional full cycles help the BMS calibrate State of Charge readings but aren't required for battery health."
  },
  {
    question: "My battery's capacity seems lower than when new - is this normal?",
    answer: "Yes, gradual capacity fade is normal and expected. A typical high-quality battery might lose 1-2% capacity per year under good conditions. If capacity is declining significantly faster than this, or State of Health drops suddenly, investigate potential causes including operating temperature, cell imbalance, or system faults."
  },
  {
    question: "Can I upgrade or replace individual battery cells?",
    answer: "Generally no - battery modules are designed as integrated units. Mixing cells of different ages and conditions causes balancing issues and accelerated degradation. When capacity becomes unacceptable, the usual approach is whole-battery or whole-module replacement. Some modular systems allow adding new modules, but mixing with aged modules isn't recommended."
  },
  {
    question: "What happens to my data if the battery is replaced?",
    answer: "Historical performance data stored in the inverter or cloud monitoring system is typically retained when the battery is replaced. However, battery-specific data (cycle count, manufacturing date) will reset with the new unit. Keep records of original installation documentation for warranty and performance tracking purposes."
  },
  {
    question: "Is there anything I can do to extend my battery's life?",
    answer: "Yes: ensure good ventilation to control temperature; avoid leaving at 100% SoC for extended periods if possible; don't consistently discharge to very low levels; ensure the system is properly configured and maintained; and address any faults promptly. Most importantly, follow manufacturer guidelines for your specific system."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module2Section3_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">

      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module2-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Article Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Lifespan:</strong> 10-15 years typical, 3,000-6,000 cycles for quality LFP</li>
              <li><strong>Degradation:</strong> Temperature and cycling patterns are key factors</li>
              <li><strong>Inspection:</strong> Annual visual + electrical, ongoing monitoring via app</li>
              <li><strong>End of life:</strong> Recycle through specialist facilities, never normal waste</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> State of Health (SoH) reading in monitoring system</li>
              <li><strong>Use:</strong> Cell voltage balance data to identify issues</li>
              <li><strong>Apply:</strong> Manufacturer take-back schemes for disposal</li>
            </ul>
          </div>
        </div>

        

        

        {/* Content Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Understanding Battery Degradation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              All batteries degrade over time - this is an unavoidable chemical and physical process. Understanding the mechanisms helps predict lifespan and take steps to minimise degradation. Two main processes drive capacity loss: calendar ageing and cycle ageing.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Degradation mechanisms:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Calendar ageing:</strong> Time-based degradation regardless of use. Higher storage temperature and high state of charge accelerate this.</li>
                <li><strong>Cycle ageing:</strong> Wear from charging/discharging. Deep cycles and high currents cause more wear than shallow cycles.</li>
                <li><strong>SEI layer growth:</strong> A film forms on the anode that consumes lithium and increases resistance over time.</li>
                <li><strong>Mechanical stress:</strong> Electrode materials expand/contract during cycling, causing micro-fractures over thousands of cycles.</li>
              </ul>
            </div>

            <p>
              Quality LFP batteries typically retain 80% capacity after 4,000-6,000 cycles or 10+ years. NMC batteries may reach this point faster (2,000-4,000 cycles) but offer higher initial energy density. Operating temperature has the largest controllable impact on degradation rate.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> A battery reaching 80% capacity isn't dead - it simply stores less energy. Many continue useful service well beyond this point, particularly in applications tolerant of reduced capacity.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Content Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Routine Maintenance Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Modern lithium battery systems require minimal routine maintenance compared to older technologies like lead-acid. However, regular inspection and monitoring remain important to ensure safe, optimal operation and to identify developing issues before they become serious.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Annual Inspection (Professional)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Visual inspection for damage, swelling, corrosion</li>
                  <li>Check all electrical connections are secure</li>
                  <li>Verify ventilation is unobstructed</li>
                  <li>Review BMS data and fault logs</li>
                  <li>Check State of Health and cell balance</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Ongoing Owner Monitoring</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Review app/portal data regularly</li>
                  <li>Note any fault alerts or warnings</li>
                  <li>Check displayed capacity and SoH trends</li>
                  <li>Ensure ventilation remains clear</li>
                  <li>Report unusual noises, smells, or temperatures</li>
                </ul>
              </div>
            </div>

            <p>
              The Electrical Installation Certificate specifies periodic inspection intervals. For domestic installations, this is typically every 5 years, but more frequent inspection may be appropriate for battery systems given their importance and complexity.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Content Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Performance Monitoring
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Modern battery systems provide extensive monitoring data through apps, web portals, and inverter displays. Understanding what to look for helps identify issues early and track long-term performance trends.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key metrics to monitor:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>State of Health (SoH):</strong> Current capacity as percentage of original. Should decrease slowly (1-2% per year typical).</li>
                <li><strong>Cell voltage balance:</strong> Difference between highest and lowest cell. Large variations indicate problems.</li>
                <li><strong>Temperature:</strong> Operating temperature during charge/discharge. Consistently high temperatures accelerate ageing.</li>
                <li><strong>Cycle count / throughput:</strong> Total cycles or energy throughput helps track usage against warranty terms.</li>
                <li><strong>Fault history:</strong> Log of past alerts and warnings. Recurring faults need investigation.</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> If SoH drops from 95% to 85% within six months rather than several years, this indicates abnormal degradation requiring investigation - possible causes include high operating temperature, BMS issues, or a failing cell module.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Content Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            End of Life and Disposal
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When batteries reach end of useful life for their original application, proper handling is essential. Lithium batteries cannot be disposed of in normal waste due to fire risks and environmental regulations. Recycling recovers valuable materials and is increasingly well-established.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Recycling</p>
                <p className="text-white/90 text-xs">Specialist facilities extract lithium, cobalt, nickel for reuse</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Second Life</p>
                <p className="text-white/90 text-xs">Repurposed for less demanding applications</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Take-back</p>
                <p className="text-white/90 text-xs">Many manufacturers offer collection schemes</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">End-of-life considerations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Check manufacturer and retailer take-back programs</li>
                <li>Contact local authority for battery recycling facilities</li>
                <li>Never dispose of lithium batteries in normal household or commercial waste</li>
                <li>Damaged or swollen batteries require specialist handling - do not transport in normal vehicles</li>
                <li>Consider second-life applications if capacity remains useful</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> UK WEEE (Waste Electrical and Electronic Equipment) regulations require proper disposal of batteries. Distributors and retailers have obligations to accept old batteries when selling new ones.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">For Maximum Battery Life</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Maintain good ventilation and reasonable operating temperature</li>
                <li>Avoid leaving at 100% SoC for extended idle periods</li>
                <li>Address any BMS faults or warnings promptly</li>
                <li>Follow manufacturer guidelines for system configuration</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Inspecting Systems</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Compare current SoH to previous readings - track the trend</li>
                <li>Check cell voltage balance for significant variations</li>
                <li>Review fault log for recurring issues</li>
                <li>Verify all labels remain legible and connections secure</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Ignoring degradation warnings</strong> - sudden SoH drops indicate problems</li>
                <li><strong>Skipping annual inspections</strong> - issues can develop unnoticed</li>
                <li><strong>Improper disposal</strong> - illegal and hazardous; use proper channels</li>
                <li><strong>Opening battery enclosures</strong> - dangerous high voltages inside; trained personnel only</li>
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
                <p className="font-medium text-white mb-1">Typical Battery Lifespan</p>
                <ul className="space-y-0.5">
                  <li>LFP: 10-15 years, 4,000-6,000 cycles</li>
                  <li>NMC: 8-12 years, 2,000-4,000 cycles</li>
                  <li>End of life: 70-80% original capacity</li>
                  <li>Warranty: Typically 10 years</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Monitoring Priorities</p>
                <ul className="space-y-0.5">
                  <li>State of Health trend</li>
                  <li>Cell voltage balance</li>
                  <li>Operating temperatures</li>
                  <li>Fault/warning history</li>
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
            <Link to="/study-centre/apprentice/level3-module2-section3-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Safety and Installation
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module2-section4">
              Next: Section 4 - EV Charging
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module2Section3_5;
