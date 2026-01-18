import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Battery Types and Chemistry - Renewable Energy Module 4";
const DESCRIPTION = "Understand major battery chemistries including Li-Ion, Lead-Acid, LFP, and Flow batteries for renewable energy storage systems.";

const quickCheckQuestions = [
  {
    id: "battery-energy-density",
    question: "Which battery chemistry offers the highest energy density?",
    options: ["Lead-Acid", "LFP (Lithium Iron Phosphate)", "Standard Lithium-Ion", "Flow Batteries"],
    correctIndex: 2,
    explanation: "Standard Lithium-Ion batteries have the highest energy density at 150-250 Wh/kg, making them ideal for applications where space and weight are critical factors."
  },
  {
    id: "battery-lfp-advantage",
    question: "What is the primary advantage of LFP batteries over standard Li-Ion?",
    options: ["Higher energy density", "Lower cost per kWh", "Better thermal stability and safety", "Faster charging speeds"],
    correctIndex: 2,
    explanation: "LFP batteries offer superior thermal stability with no risk of thermal runaway, making them inherently safer. They also provide longer cycle life (3000-5000 cycles) compared to standard Li-Ion."
  },
  {
    id: "battery-lead-acid-dod",
    question: "What is the recommended depth of discharge for lead-acid batteries to maintain cycle life?",
    options: ["20-30%", "50-60%", "80-90%", "95-100%"],
    correctIndex: 1,
    explanation: "Lead-acid batteries typically operate best with 50-60% depth of discharge. Deeper discharges significantly reduce cycle life and can cause permanent damage."
  },
  {
    id: "battery-flow-unique",
    question: "What makes flow batteries unique compared to other battery types?",
    options: ["Highest efficiency rating", "Energy and power can be scaled independently", "Lowest maintenance requirements", "Smallest physical footprint"],
    correctIndex: 1,
    explanation: "Flow batteries uniquely allow independent scaling of energy capacity (determined by electrolyte volume) and power output (determined by stack size), making them ideal for long-duration storage."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the typical round-trip efficiency of lithium-ion batteries?",
    options: ["75-80%", "85-90%", "95%+", "60-70%"],
    correctAnswer: 2,
    explanation: "Lithium-ion batteries achieve 95%+ round-trip efficiency, significantly higher than lead-acid (80-85%) or flow batteries (70-80%)."
  },
  {
    id: 2,
    question: "Which battery type has the longest cycle life?",
    options: ["Lead-Acid (300-1200 cycles)", "Standard Li-Ion (1000-3000 cycles)", "LFP (3000-5000 cycles)", "Flow Batteries (10,000+ cycles)"],
    correctAnswer: 3,
    explanation: "Flow batteries can achieve 10,000+ cycles because the electrolyte does not degrade during cycling. LFP follows with 3000-5000 cycles."
  },
  {
    id: 3,
    question: "What is a key disadvantage of standard lithium-ion batteries?",
    options: ["Low energy density", "Risk of thermal runaway if damaged", "Cannot be charged quickly", "High self-discharge rate"],
    correctAnswer: 1,
    explanation: "Standard lithium-ion batteries carry a risk of thermal runaway if damaged, overcharged, or exposed to extreme temperatures, requiring sophisticated battery management systems."
  },
  {
    id: 4,
    question: "Which lead-acid battery type is best suited for deep cycle applications?",
    options: ["Flooded lead-acid", "AGM (Absorbed Glass Mat)", "Gel batteries", "Calcium batteries"],
    correctAnswer: 2,
    explanation: "Gel batteries are best for deep cycling due to their construction allowing better recovery from deep discharges and temperature tolerance."
  },
  {
    id: 5,
    question: "What is the typical cost range for LFP batteries per kWh?",
    options: ["GBP 80-150", "GBP 200-400", "GBP 500-800", "GBP 100-200"],
    correctAnswer: 1,
    explanation: "LFP batteries typically cost GBP 200-400 per kWh installed, offering a balance between lead-acid affordability and standard Li-Ion performance."
  },
  {
    id: 6,
    question: "Why are flow batteries particularly suited for grid-scale storage?",
    options: ["Highest energy density", "Lowest installation cost", "4-12 hour discharge capability and independent scaling", "Smallest footprint"],
    correctAnswer: 2,
    explanation: "Flow batteries excel at grid-scale storage due to their 4-12 hour discharge capability, independent power/energy scaling, and very long cycle life without degradation."
  },
  {
    id: 7,
    question: "What safety standard specifically covers lithium battery safety?",
    options: ["IEC 61215", "IEC 62619", "BS EN 50272", "UN38.3"],
    correctAnswer: 1,
    explanation: "IEC 62619 specifically covers safety requirements for secondary lithium cells and batteries for use in industrial applications including energy storage."
  },
  {
    id: 8,
    question: "What is the typical self-discharge rate of LFP batteries per month?",
    options: ["Less than 3%", "5-10%", "15-20%", "Greater than 25%"],
    correctAnswer: 0,
    explanation: "LFP batteries have very low self-discharge rates of less than 3% per month, making them excellent for standby and long-term storage applications."
  },
  {
    id: 9,
    question: "Which emerging battery technology uses abundant materials and offers 20-30% cost advantage?",
    options: ["Solid-state batteries", "Sodium-ion batteries", "Zinc-air batteries", "Lithium-sulphur batteries"],
    correctAnswer: 1,
    explanation: "Sodium-ion batteries use abundant sodium instead of lithium, offering 20-30% lower material costs whilst maintaining acceptable performance characteristics."
  },
  {
    id: 10,
    question: "What ventilation requirement applies to flooded lead-acid batteries?",
    options: ["No ventilation required", "Hydrogen gas emission requires ventilation", "Only cooling ventilation needed", "CO2 extraction required"],
    correctAnswer: 1,
    explanation: "Flooded lead-acid batteries emit hydrogen gas during charging, requiring adequate ventilation to prevent explosive gas accumulation."
  }
];

const faqs = [
  {
    question: "Why would I choose LFP over standard lithium-ion for a home battery system?",
    answer: "LFP offers superior safety (no thermal runaway risk), longer cycle life (3000-5000 vs 1000-3000 cycles), and better tolerance to being kept at full charge. While energy density is lower, this matters less for stationary home applications where space is typically not critical."
  },
  {
    question: "Are lead-acid batteries still a viable option for renewable energy storage?",
    answer: "Yes, lead-acid remains viable for budget-conscious installations or backup power systems with infrequent cycling. They offer the lowest upfront cost (GBP 80-150/kWh) and proven reliability. However, lower cycle life and maintenance requirements mean lithium technologies often provide better lifetime value."
  },
  {
    question: "What determines whether a flow battery is the right choice?",
    answer: "Flow batteries excel when long-duration storage (4-12+ hours), very long cycle life (10,000+), and independent power/energy scaling are priorities. They are best suited for grid-scale applications rather than residential due to their larger footprint and higher complexity."
  },
  {
    question: "How do I evaluate battery warranties and what should I look for?",
    answer: "Key warranty factors include: cycle warranty (number of full cycles guaranteed), calendar warranty (years), end-of-life capacity guarantee (typically 70-80% retained), and throughput warranty (total kWh). Compare these against expected usage patterns and project lifetime."
  },
  {
    question: "What safety certifications should batteries have for UK installations?",
    answer: "Look for IEC 62619 (lithium battery safety), UN38.3 (transport safety), and UL 9540 (energy storage system safety). For installations, comply with BS EN 50272 for secondary battery installations and relevant G98/G99 grid connection requirements."
  },
  {
    question: "How do battery costs compare when considering total cost of ownership?",
    answer: "While lead-acid has lowest upfront cost, lithium technologies often win on lifetime cost due to longer cycle life and higher efficiency. Calculate cost per cycle and cost per kWh throughput rather than just upfront cost per kWh capacity."
  }
];

const RenewableEnergyModule4Section1 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/renewable-energy-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 4 Section 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Battery Types and Chemistry
          </h1>
          <p className="text-white/80">
            Understanding Li-Ion, Lead-Acid, LFP, and Flow batteries for energy storage
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Li-Ion:</strong> High density, 95%+ efficiency</li>
              <li><strong>LFP:</strong> Safest, 3000-5000 cycles</li>
              <li><strong>Lead-Acid:</strong> Lowest cost, 50% DoD</li>
              <li><strong>Flow:</strong> 10,000+ cycles, grid-scale</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Selection Criteria</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Cost:</strong> Lead-acid lowest upfront</li>
              <li><strong>Safety:</strong> LFP most stable</li>
              <li><strong>Longevity:</strong> Flow batteries best</li>
              <li><strong>Density:</strong> Standard Li-Ion highest</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Compare major battery chemistry types",
              "Understand energy density and efficiency ratings",
              "Evaluate cycle life and depth of discharge",
              "Assess safety characteristics of each type",
              "Apply selection criteria to project requirements",
              "Identify relevant safety standards and certifications"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Lithium-Ion Batteries
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Lithium-ion batteries represent the current standard for high-performance energy storage, offering excellent energy density and efficiency characteristics that make them suitable for both residential and commercial applications.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Advantages:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>High energy density:</strong> 150-250 Wh/kg, ideal for space-constrained applications</li>
                <li><strong>Excellent efficiency:</strong> 95%+ round-trip efficiency minimises energy losses</li>
                <li><strong>Long cycle life:</strong> 1000-3000 cycles with proper management</li>
                <li><strong>Low self-discharge:</strong> Less than 5% per month when stored</li>
                <li><strong>No memory effect:</strong> Partial charging does not reduce capacity</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Limitations to Consider:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Higher cost:</strong> GBP 300-600/kWh installed</li>
                <li><strong>Thermal sensitivity:</strong> Performance degrades at temperature extremes</li>
                <li><strong>Safety concerns:</strong> Risk of thermal runaway if damaged or overcharged</li>
                <li><strong>Complex BMS required:</strong> Sophisticated management systems essential</li>
                <li><strong>Calendar aging:</strong> Capacity fades over time even when unused</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-white mb-2">Best Applications:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Residential solar battery systems with daily cycling</li>
                <li>Commercial peak shaving where space is limited</li>
                <li>Electric vehicle integration (V2G systems)</li>
                <li>Portable and mobile power applications</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            LFP (Lithium Iron Phosphate) Batteries
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              LFP batteries offer the optimal balance of safety, longevity, and performance for stationary energy storage, making them increasingly popular for renewable energy systems where safety is paramount.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Safety Advantages:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Thermal stability:</strong> No thermal runaway risk due to stable chemistry</li>
                <li><strong>Chemical stability:</strong> Phosphate cathode inherently stable</li>
                <li><strong>No toxic gas emission:</strong> Safe for indoor installation</li>
                <li><strong>Wide temperature range:</strong> -20C to +60C operation</li>
                <li><strong>Overcharge tolerance:</strong> More forgiving of charging errors</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Performance Characteristics:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Long cycle life:</strong> 3000-5000 cycles at 80% depth of discharge</li>
                <li><strong>Flat discharge curve:</strong> Consistent voltage throughout discharge</li>
                <li><strong>Fast charging:</strong> 1C charge rates achievable</li>
                <li><strong>Low self-discharge:</strong> Less than 3% per month</li>
                <li><strong>Energy density:</strong> 90-120 Wh/kg (lower than standard Li-Ion)</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">LFP vs Standard Li-Ion</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Safety:</strong> LFP significantly safer, no thermal runaway</li>
                <li><strong>Cycle life:</strong> LFP 2-3x longer cycle life</li>
                <li><strong>Energy density:</strong> Standard Li-Ion 30-50% higher</li>
                <li><strong>Cost:</strong> LFP typically 20-30% lower per cycle</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Lead-Acid Batteries
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Lead-acid technology represents the most mature and cost-effective battery solution, with over 150 years of development making it reliable and well-understood for specific applications.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Flooded Lead-Acid:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Lowest cost:</strong> GBP 80-150/kWh installed</li>
                <li><strong>Proven reliability:</strong> Well-understood technology</li>
                <li><strong>Maintenance required:</strong> Regular topping up with distilled water</li>
                <li><strong>Ventilation needed:</strong> Hydrogen gas emission during charging</li>
                <li><strong>Cycle life:</strong> 300-800 cycles at 50% depth of discharge</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">AGM (Absorbed Glass Mat):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Sealed design:</strong> No maintenance required</li>
                <li><strong>Better performance:</strong> Higher discharge rates possible</li>
                <li><strong>Spill-proof:</strong> Can be mounted in any orientation</li>
                <li><strong>Moderate cost:</strong> GBP 120-200/kWh</li>
                <li><strong>Cycle life:</strong> 400-1000 cycles at 50% depth of discharge</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Gel Batteries:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Deep cycle capability:</strong> Best lead-acid option for regular cycling</li>
                <li><strong>Temperature tolerance:</strong> Better performance in extreme temperatures</li>
                <li><strong>Slow charging:</strong> Lower charge acceptance rates required</li>
                <li><strong>Higher cost:</strong> GBP 150-250/kWh</li>
                <li><strong>Cycle life:</strong> 500-1200 cycles at 50% depth of discharge</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Flow Batteries
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Flow batteries offer unique advantages for large-scale, long-duration energy storage applications where scalability and longevity are more important than energy density.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Unique Architecture:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Separate power and energy:</strong> Independent scaling possible</li>
                <li><strong>External electrolyte:</strong> Energy stored in liquid tanks</li>
                <li><strong>Pump-driven circulation:</strong> Electrolyte flows through reaction stack</li>
                <li><strong>Modular design:</strong> Easy capacity expansion by adding tanks</li>
                <li><strong>No degradation:</strong> Electrolyte does not wear out with cycling</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Performance Characteristics:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Cycle life:</strong> 10,000+ cycles with no capacity fade</li>
                <li><strong>100% depth of discharge:</strong> No penalty for full discharge</li>
                <li><strong>Efficiency:</strong> 70-80% round-trip (lower than lithium)</li>
                <li><strong>Duration:</strong> 4-12+ hour discharge capability</li>
                <li><strong>Cost:</strong> GBP 400-800/kWh (declining with scale)</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Grid-Scale Applications</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Load shifting:</strong> Daily energy arbitrage opportunities</li>
                <li><strong>Renewable integration:</strong> Smoothing variable generation</li>
                <li><strong>Backup power:</strong> Extended duration emergency supply</li>
                <li><strong>Grid stability:</strong> Frequency regulation services</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Battery Comparison and Selection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Selecting the right battery chemistry requires balancing multiple factors against specific project requirements and constraints.
            </p>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-white mb-2">Comparison Summary:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Lead-Acid:</strong> 300-1200 cycles, GBP 80-250/kWh, 50-60% DoD</li>
                <li><strong>Li-Ion:</strong> 1000-3000 cycles, GBP 300-600/kWh, 80-90% DoD</li>
                <li><strong>LFP:</strong> 3000-5000 cycles, GBP 200-400/kWh, 80-95% DoD</li>
                <li><strong>Flow:</strong> 10,000+ cycles, GBP 400-800/kWh, 100% DoD</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Emerging Technologies:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Solid-state:</strong> 2-3x energy density, improved safety, 2025-2030 timeline</li>
                <li><strong>Sodium-ion:</strong> 20-30% cost reduction, abundant materials, entering market</li>
                <li><strong>Zinc-air:</strong> Very high energy density potential, long-duration storage</li>
                <li><strong>Lithium-sulphur:</strong> Theoretical 5x energy density, development ongoing</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Selecting Battery Chemistry</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Consider total cost of ownership, not just upfront cost per kWh</li>
                <li>Match cycle life expectations to actual cycling requirements</li>
                <li>Assess safety requirements based on installation location</li>
                <li>Verify warranty terms cover expected usage patterns</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Specifying Systems</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Ensure BMS compatibility with chosen inverter systems</li>
                <li>Verify certifications meet UK installation requirements</li>
                <li>Consider future expansion capability and compatibility</li>
                <li>Check temperature ratings match installation environment</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Exceeding DoD limits</strong> - dramatically reduces cycle life</li>
                <li><strong>Ignoring temperature requirements</strong> - affects performance and safety</li>
                <li><strong>Comparing only upfront costs</strong> - lifetime costs often differ significantly</li>
                <li><strong>Mismatching BMS and inverter</strong> - can cause system failures</li>
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

        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/renewable-energy-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default RenewableEnergyModule4Section1;
