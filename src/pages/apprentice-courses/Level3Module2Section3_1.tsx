/**
 * Level 3 Module 2 Section 3.1 - Battery Chemistry and Types
 * Battery Storage Systems: Li-ion, LFP, and other battery technologies
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
const TITLE = "Battery Chemistry and Types - Level 3 Module 2 Section 3.1";
const DESCRIPTION = "Understanding lithium-ion, lithium iron phosphate, and other battery chemistries used in domestic and commercial energy storage systems.";

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the typical nominal voltage of a single lithium-ion cell?",
    options: [
      "1.2V",
      "2.0V",
      "3.6-3.7V",
      "12V"
    ],
    correctIndex: 2,
    explanation: "A single lithium-ion cell has a nominal voltage of approximately 3.6-3.7V, significantly higher than NiMH (1.2V) or lead-acid cells (2.0V). This is why Li-ion batteries require fewer cells in series for the same system voltage."
  },
  {
    id: "check-2",
    question: "Which battery chemistry is considered safest for domestic installations due to its thermal stability?",
    options: [
      "Lithium Cobalt Oxide (LCO)",
      "Lithium Iron Phosphate (LFP)",
      "Lithium Nickel Manganese Cobalt (NMC)",
      "Lead-acid"
    ],
    correctIndex: 1,
    explanation: "LFP (Lithium Iron Phosphate) batteries have excellent thermal stability and are much less prone to thermal runaway than other lithium chemistries. This makes them the preferred choice for domestic energy storage where safety is paramount."
  },
  {
    id: "check-3",
    question: "What does 'depth of discharge' (DoD) refer to in battery systems?",
    options: [
      "How quickly the battery can discharge",
      "The percentage of battery capacity that has been used",
      "The maximum voltage during discharge",
      "The number of discharge cycles completed"
    ],
    correctIndex: 1,
    explanation: "Depth of discharge (DoD) indicates what percentage of the battery's total capacity has been used. For example, if a 10kWh battery has discharged 8kWh, the DoD is 80%. Most lithium batteries allow 80-90% DoD, while lead-acid typically limits to 50% to preserve lifespan."
  },
  {
    id: "check-4",
    question: "What is the typical expected cycle life of a quality LFP battery at 80% DoD?",
    options: [
      "500-1,000 cycles",
      "1,000-2,000 cycles",
      "3,000-6,000 cycles",
      "10,000-15,000 cycles"
    ],
    correctIndex: 2,
    explanation: "Quality LFP batteries typically achieve 3,000-6,000 cycles at 80% depth of discharge before reaching 80% of original capacity. This represents approximately 10-15 years of daily cycling, making them highly cost-effective for long-term energy storage."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "What is the primary advantage of lithium-ion batteries over lead-acid for domestic energy storage?",
    options: [
      "Lower initial purchase cost",
      "Higher energy density and longer cycle life",
      "Simpler installation requirements",
      "No need for a battery management system"
    ],
    correctAnswer: 1,
    explanation: "Lithium-ion batteries offer significantly higher energy density (storing more energy in less space) and can achieve 3,000-6,000+ cycles compared to 500-1,000 for lead-acid. While initial costs are higher, the total cost of ownership is often lower."
  },
  {
    id: 2,
    question: "In a lithium-ion battery, what moves between the electrodes during charging and discharging?",
    options: [
      "Electrons only",
      "Lithium ions",
      "Hydrogen ions",
      "Lead sulphate"
    ],
    correctAnswer: 1,
    explanation: "Lithium-ion batteries work by lithium ions (Li+) moving between the anode and cathode through the electrolyte. During discharge, ions move from anode to cathode; during charging, they move back. Electrons flow through the external circuit to balance this ion movement."
  },
  {
    id: 3,
    question: "What does NMC stand for in battery chemistry?",
    options: [
      "Nickel Metal Cobalt",
      "Nickel Manganese Cobalt",
      "Nickel Magnesium Carbon",
      "Non-Metallic Compound"
    ],
    correctAnswer: 1,
    explanation: "NMC stands for Nickel Manganese Cobalt, referring to the cathode material composition. NMC batteries offer a good balance of energy density, power, and lifespan, making them popular for both EV and stationary storage applications."
  },
  {
    id: 4,
    question: "Why must lithium-ion batteries be stored within specific temperature ranges?",
    options: [
      "To prevent the electrolyte from evaporating",
      "To avoid accelerated degradation and safety risks",
      "To comply with fire regulations only",
      "To maintain warranty coverage"
    ],
    correctAnswer: 1,
    explanation: "Lithium-ion batteries degrade faster at high temperatures and can experience reduced performance or safety issues at extreme temperatures. Most manufacturers specify 0-45°C for operation and 15-25°C for optimal storage to maximise lifespan and safety."
  },
  {
    id: 5,
    question: "What is 'thermal runaway' in lithium-ion batteries?",
    options: [
      "Normal heating during fast charging",
      "A self-sustaining exothermic reaction that can cause fire",
      "Heat generated by the inverter",
      "Temperature increase from solar gain"
    ],
    correctAnswer: 1,
    explanation: "Thermal runaway is a dangerous condition where internal reactions cause the battery to heat uncontrollably, potentially leading to fire or explosion. It can be triggered by overcharging, physical damage, or internal short circuits. This is why proper BMS protection is essential."
  },
  {
    id: 6,
    question: "What is the typical round-trip efficiency of a modern lithium-ion battery system?",
    options: [
      "60-70%",
      "75-80%",
      "85-95%",
      "98-100%"
    ],
    correctAnswer: 2,
    explanation: "Modern lithium-ion battery systems achieve 85-95% round-trip efficiency, meaning 85-95% of energy put in can be retrieved. This compares favourably to lead-acid (70-85%) and makes lithium-ion more cost-effective for daily cycling applications."
  },
  {
    id: 7,
    question: "Why are LFP batteries becoming increasingly popular for home storage despite lower energy density than NMC?",
    options: [
      "They are significantly cheaper to manufacture",
      "They require no battery management system",
      "They offer superior safety, longer cycle life, and no cobalt content",
      "They can operate without ventilation"
    ],
    correctAnswer: 2,
    explanation: "LFP batteries excel in safety (thermal stability), longevity (4,000-6,000+ cycles), and sustainability (no cobalt). While they have lower energy density than NMC, this is less critical for stationary storage where space is less constrained than in vehicles."
  },
  {
    id: 8,
    question: "What happens to a lithium-ion battery's capacity over its lifetime?",
    options: [
      "It remains constant until sudden failure",
      "It gradually decreases, typically to 70-80% after rated cycle life",
      "It increases slightly before declining",
      "It fluctuates based on temperature only"
    ],
    correctAnswer: 1,
    explanation: "Lithium-ion batteries experience gradual capacity fade over time and cycles. End-of-life is typically defined as reaching 70-80% of original capacity. A 10kWh battery might retain 7-8kWh usable capacity after its rated cycle life."
  },
  {
    id: 9,
    question: "Which factor has the greatest impact on lithium-ion battery degradation?",
    options: [
      "Humidity levels",
      "Operating at temperature extremes",
      "The colour of the battery enclosure",
      "AC frequency"
    ],
    correctAnswer: 1,
    explanation: "Temperature has the most significant impact on lithium-ion battery lifespan. Operating consistently at high temperatures (above 35°C) or charging in very cold conditions (below 0°C) accelerates degradation. This is why proper ventilation and installation location are critical."
  },
  {
    id: 10,
    question: "What is the purpose of cell balancing in a lithium-ion battery pack?",
    options: [
      "To make all cells the same physical size",
      "To ensure all cells reach the same state of charge",
      "To balance the weight distribution",
      "To equalise the temperature across cells"
    ],
    correctAnswer: 1,
    explanation: "Cell balancing ensures all cells in a battery pack reach the same state of charge. Without balancing, capacity differences between cells would limit the usable capacity of the entire pack, as charging must stop when any cell reaches full and discharging when any cell is empty."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "Can I mix different battery chemistries in the same installation?",
    answer: "No, different battery chemistries should never be mixed in the same battery bank or system. They have different voltage characteristics, charge profiles, and degradation rates. Mixing them would result in poor performance, accelerated degradation, and potential safety hazards. Each chemistry requires its own compatible inverter/charger settings."
  },
  {
    question: "How long do domestic battery storage systems typically last?",
    answer: "Quality lithium-ion systems typically last 10-15 years with daily cycling. LFP batteries often achieve 4,000-6,000 cycles, while NMC achieves 2,000-4,000 cycles. Most manufacturers warrant their products for 10 years or a specified number of cycles/throughput, whichever comes first. Actual lifespan depends heavily on operating conditions and depth of discharge."
  },
  {
    question: "What size battery do I need for a typical home?",
    answer: "Battery sizing depends on daily energy consumption, solar PV size (if present), and desired backup duration. A typical UK home uses 8-10kWh per day. A 5-10kWh battery suits most self-consumption applications, while 10-20kWh+ provides meaningful backup capability. Proper load analysis should be conducted for each installation."
  },
  {
    question: "Are lithium batteries safe for indoor installation?",
    answer: "Modern LFP batteries are generally considered safe for indoor installation when properly installed with adequate ventilation and in compliance with manufacturer guidelines. NMC batteries may have additional requirements due to higher thermal runaway risk. Always follow manufacturer specifications and relevant standards including BS 7671 for electrical installation requirements."
  },
  {
    question: "What happens to battery performance in cold weather?",
    answer: "Cold temperatures reduce lithium-ion battery performance and capacity temporarily. Below 0°C, charging should be limited or disabled to prevent lithium plating damage. Most BMS systems automatically derate charging in cold conditions. Performance returns to normal when temperature rises. Installing batteries in temperature-controlled spaces optimises year-round performance."
  },
  {
    question: "Can old EV batteries be repurposed for home storage?",
    answer: "Yes, 'second-life' EV batteries are increasingly being repurposed for stationary storage. When EV batteries degrade to 70-80% capacity (unsuitable for vehicle range), they remain viable for less demanding home storage applications for many more years. However, this requires specialist knowledge for safe integration and appropriate BMS configuration."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module2Section3_1 = () => {
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
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 2.3.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Battery Chemistry and Types
          </h1>
          <p className="text-white/80">
            Understanding the technology behind modern energy storage systems
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Lithium-ion:</strong> High energy density, 3.6-3.7V per cell, requires BMS</li>
              <li><strong>LFP (LiFePO4):</strong> Safest lithium chemistry, 3,000-6,000+ cycles</li>
              <li><strong>NMC:</strong> Higher energy density but shorter lifespan than LFP</li>
              <li><strong>Key specs:</strong> Capacity (kWh), DoD, cycle life, round-trip efficiency</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Battery chemistry on nameplate (LFP, NMC, etc.)</li>
              <li><strong>Use:</strong> Match charger settings to battery chemistry</li>
              <li><strong>Apply:</strong> Consider safety requirements for installation location</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "How lithium-ion batteries store and release energy",
              "Differences between LFP, NMC, and other lithium chemistries",
              "Key battery specifications and what they mean",
              "Factors affecting battery lifespan and performance",
              "Safety characteristics of different battery types",
              "How to select appropriate battery chemistry for applications"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Content Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            How Lithium-Ion Batteries Work
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Lithium-ion batteries store energy through the movement of lithium ions between two electrodes. During discharge, lithium ions travel from the negative electrode (anode) through an electrolyte to the positive electrode (cathode), releasing electrons that flow through the external circuit to power connected loads. Charging reverses this process.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key components of a lithium-ion cell:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Anode (negative):</strong> Typically graphite, stores lithium ions when charged</li>
                <li><strong>Cathode (positive):</strong> Metal oxide compound that determines battery chemistry (LFP, NMC, etc.)</li>
                <li><strong>Electrolyte:</strong> Allows ion movement but blocks electron flow</li>
                <li><strong>Separator:</strong> Prevents physical contact between electrodes while allowing ion passage</li>
              </ul>
            </div>

            <p>
              A single lithium-ion cell produces approximately 3.6-3.7V nominal voltage. Battery packs combine multiple cells in series to achieve system voltages (typically 48V, 400V, or higher for commercial systems) and in parallel to increase capacity.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> The cathode material determines the battery's chemistry name and characteristics. Understanding these differences is essential for proper system design and safety.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Content Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Lithium Iron Phosphate (LFP) Batteries
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              LFP (LiFePO4) batteries use lithium iron phosphate as the cathode material. They have become the dominant choice for domestic energy storage due to their exceptional safety profile and longevity, despite having lower energy density than other lithium chemistries.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Advantages of LFP</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Excellent thermal stability - resistant to thermal runaway</li>
                  <li>Long cycle life: 3,000-6,000+ cycles at 80% DoD</li>
                  <li>Flat discharge curve - stable voltage output</li>
                  <li>No cobalt - more sustainable and ethical sourcing</li>
                  <li>Wide operating temperature range</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Considerations</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Lower energy density (~160 Wh/kg vs 250+ for NMC)</li>
                  <li>Larger physical size for same capacity</li>
                  <li>Slightly lower nominal voltage (3.2V per cell)</li>
                  <li>Reduced low-temperature performance</li>
                  <li>Requires accurate state-of-charge monitoring</li>
                </ul>
              </div>
            </div>

            <p>
              The safety advantage of LFP cannot be overstated for residential applications. The phosphate cathode forms a strong bond that remains stable at high temperatures, making thermal runaway extremely unlikely even under abuse conditions such as overcharging or physical damage.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Content Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            NMC and Other Lithium Chemistries
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              NMC (Nickel Manganese Cobalt) batteries offer higher energy density than LFP, making them popular for electric vehicles where weight and space are critical. They are also used in some stationary storage applications, particularly where compact size is important.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common lithium chemistries compared:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>NMC (Nickel Manganese Cobalt):</strong> High energy density (200-250 Wh/kg), 1,500-3,000 cycles, used in EVs and some home storage</li>
                <li><strong>NCA (Nickel Cobalt Aluminium):</strong> Very high energy density, used by Tesla vehicles, less common in stationary storage</li>
                <li><strong>LCO (Lithium Cobalt Oxide):</strong> Highest energy density, used in phones/laptops, not suitable for large-scale storage due to safety concerns</li>
                <li><strong>LTO (Lithium Titanate):</strong> Exceptional cycle life (15,000+ cycles), very safe, but expensive and lower energy density</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A commercial installation requiring maximum capacity in limited space might specify NMC batteries, while a residential garage installation would typically use LFP for the safety margin it provides.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Content Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Key Battery Specifications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding battery specifications is essential for proper system design and customer consultation. These specifications determine how a battery will perform and how long it will last in a given application.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Capacity (kWh)</p>
                <p className="text-white/90 text-xs">Total energy storage. Usable capacity = Total x DoD</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">DoD (%)</p>
                <p className="text-white/90 text-xs">Depth of Discharge - how much can be used (typically 80-100% for Li-ion)</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Cycle Life</p>
                <p className="text-white/90 text-xs">Charge/discharge cycles before reaching 70-80% capacity</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Additional important specifications:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Round-trip efficiency:</strong> Energy out vs energy in (85-95% for Li-ion)</li>
                <li><strong>C-rate:</strong> Charge/discharge rate relative to capacity (0.5C = 2hr full charge)</li>
                <li><strong>Operating temperature:</strong> Safe temperature range for charging and discharging</li>
                <li><strong>Warranty terms:</strong> Years, cycles, or throughput (kWh) covered</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Specifying Batteries</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Match battery chemistry to application requirements (domestic = LFP preferred)</li>
                <li>Calculate required capacity based on daily consumption and desired backup duration</li>
                <li>Consider future expansion - many systems allow battery stacking</li>
                <li>Verify compatibility between battery and inverter/charger</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Assessing Existing Installations</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Check battery chemistry on nameplate - affects maintenance and safety requirements</li>
                <li>Review BMS display for state of health (SoH) if available</li>
                <li>Note installation date and cycle count if displayed</li>
                <li>Assess environmental conditions - temperature, ventilation, cleanliness</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Oversizing without need</strong> - larger batteries cost more and may never be fully utilised</li>
                <li><strong>Ignoring temperature requirements</strong> - installing in unventilated spaces shortens lifespan</li>
                <li><strong>Mixing battery types</strong> - different chemistries must never be combined in one system</li>
                <li><strong>Overlooking warranty conditions</strong> - improper installation may void coverage</li>
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
                <p className="font-medium text-white mb-1">LFP Batteries</p>
                <ul className="space-y-0.5">
                  <li>Nominal voltage: 3.2V per cell</li>
                  <li>Cycle life: 3,000-6,000+ cycles</li>
                  <li>Energy density: ~160 Wh/kg</li>
                  <li>Safety: Excellent thermal stability</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">NMC Batteries</p>
                <ul className="space-y-0.5">
                  <li>Nominal voltage: 3.6-3.7V per cell</li>
                  <li>Cycle life: 1,500-3,000 cycles</li>
                  <li>Energy density: ~200-250 Wh/kg</li>
                  <li>Safety: Good with proper BMS</li>
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
            <Link to="/study-centre/apprentice/level3-module2-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module2-section3-2">
              Next: Battery Management Systems
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module2Section3_1;
