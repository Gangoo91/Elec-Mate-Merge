/**
 * Level 3 Module 2 Section 2.4 - Load Management and Diversity
 *
 * Understanding electrical load management, diversity factors, and demand-side response
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
const TITLE = "Load Management and Diversity - Level 3 Module 2 Section 2.4";
const DESCRIPTION = "Understanding electrical load management, diversity factors, peak demand reduction, and demand-side response for efficient installations.";

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is 'diversity' in electrical installations?",
    options: [
      "Having many different types of equipment",
      "The assumption that not all loads operate simultaneously at full capacity",
      "Using multiple suppliers",
      "Installing circuits of different sizes"
    ],
    correctIndex: 1,
    explanation: "Diversity recognises that not all connected loads operate at the same time or at full load. This allows electrical installations to be sized smaller than the total connected load."
  },
  {
    id: "check-2",
    question: "What is 'maximum demand' in an electrical installation?",
    options: [
      "The total connected load",
      "The highest power drawn at any time during normal operation",
      "The circuit breaker rating",
      "The supply fuse size"
    ],
    correctIndex: 1,
    explanation: "Maximum demand is the highest power drawn from the supply at any point during normal operation. It's typically less than the total connected load due to diversity."
  },
  {
    id: "check-3",
    question: "What is 'demand-side response' (DSR)?",
    options: [
      "Increasing supply capacity when demand rises",
      "Adjusting consumption patterns in response to grid conditions or price signals",
      "Adding more socket outlets",
      "Upgrading the incoming supply"
    ],
    correctIndex: 1,
    explanation: "Demand-side response involves adjusting electricity consumption in response to grid signals or pricing. Shifting flexible loads to off-peak times helps balance the grid and reduces costs."
  },
  {
    id: "check-4",
    question: "Why is load management becoming more important with renewable energy?",
    options: [
      "Renewables produce more power",
      "Solar and wind generation varies, requiring demand flexibility to match supply",
      "Renewables are cheaper",
      "Load management is only for fossil fuels"
    ],
    correctIndex: 1,
    explanation: "Renewable generation from wind and solar varies with weather conditions. Load management helps shift demand to times of high renewable generation, reducing the need for fossil fuel backup."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "BS7671 Appendix 15 provides guidance on:",
    options: [
      "Cable colours",
      "Assessment of maximum demand and diversity",
      "Emergency lighting",
      "Earthing arrangements"
    ],
    correctAnswer: 1,
    explanation: "Appendix 15 of BS7671 provides guidance on assessing maximum demand, including diversity factors for different types of circuits and buildings."
  },
  {
    id: 2,
    question: "For domestic ring final circuits, BS7671 Appendix 15 suggests diversity of:",
    options: [
      "100% - no diversity allowed",
      "Approximately 30-40% of total connected load",
      "50% exactly",
      "5% only"
    ],
    correctAnswer: 1,
    explanation: "BS7671 suggests using diversity for socket outlet circuits based on the assumed load - typically 30-40% of the rated current for additional circuits. The exact application depends on the specific installation."
  },
  {
    id: 3,
    question: "Maximum demand is typically measured over a period of:",
    options: [
      "1 second",
      "15 or 30 minutes",
      "24 hours",
      "1 year"
    ],
    correctAnswer: 1,
    explanation: "Maximum demand is typically averaged over 15 or 30 minutes to smooth out brief spikes. This reflects how supply equipment thermal limits work and how suppliers typically measure demand."
  },
  {
    id: 4,
    question: "Which load is most suitable for demand-side response shifting?",
    options: [
      "Lighting",
      "Medical life support equipment",
      "Electric vehicle charging",
      "Emergency systems"
    ],
    correctAnswer: 2,
    explanation: "EV charging is ideal for DSR as it's a large, flexible load. Vehicles often sit parked for hours, so charging can be shifted to off-peak times without affecting the user, as long as the vehicle is charged when needed."
  },
  {
    id: 5,
    question: "A time-of-use tariff encourages load shifting by:",
    options: [
      "Charging the same rate at all times",
      "Offering lower prices during off-peak periods",
      "Increasing prices at random",
      "Charging only for peak consumption"
    ],
    correctAnswer: 1,
    explanation: "Time-of-use tariffs charge different rates at different times, with lower prices during off-peak periods (typically overnight). This incentivises shifting flexible loads like EV charging and hot water heating."
  },
  {
    id: 6,
    question: "Load shedding in building management means:",
    options: [
      "Removing unnecessary circuits",
      "Temporarily reducing or disconnecting non-essential loads during peak periods",
      "Installing more circuits",
      "Upgrading the supply"
    ],
    correctAnswer: 1,
    explanation: "Load shedding automatically reduces or disconnects non-essential loads when demand approaches the supply limit. This prevents supply overload while maintaining essential services."
  },
  {
    id: 7,
    question: "Which factor typically has the highest diversity in domestic installations?",
    options: [
      "Electric shower circuit",
      "Cooker circuit",
      "Lighting circuits",
      "Ring final circuits for socket outlets"
    ],
    correctAnswer: 3,
    explanation: "Ring final circuits have high diversity because many appliances might be plugged in but few operate simultaneously at full load. Fixed heating loads like showers and cookers have lower diversity as they draw near-full load when used."
  },
  {
    id: 8,
    question: "Smart EV chargers can support load management by:",
    options: [
      "Charging faster than standard chargers",
      "Automatically adjusting charging rate based on available supply capacity",
      "Using only solar power",
      "Eliminating the need for supply upgrades completely"
    ],
    correctAnswer: 1,
    explanation: "Smart EV chargers can receive signals to adjust their charging rate based on available supply capacity, time-of-use tariffs, or grid conditions. This enables load management without manual intervention."
  },
  {
    id: 9,
    question: "The term 'demand response' in grid management refers to:",
    options: [
      "The grid responding to customer complaints",
      "Consumers adjusting their electricity use in response to grid signals",
      "Increasing generation capacity",
      "Building more substations"
    ],
    correctAnswer: 1,
    explanation: "Demand response refers to changes in electricity consumption by end-users in response to signals such as price changes, grid frequency, or direct control signals from grid operators."
  },
  {
    id: 10,
    question: "Why might an installation benefit from a maximum demand indicator (MDI)?",
    options: [
      "It's required by Building Regulations",
      "It helps identify when peak demand occurs and its magnitude",
      "It reduces electricity consumption automatically",
      "It's only needed for three-phase supplies"
    ],
    correctAnswer: 1,
    explanation: "An MDI records the maximum power drawn, helping identify peak demand periods. This information is valuable for load management planning and identifying opportunities to reduce demand charges."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "How do I calculate maximum demand for a domestic installation?",
    answer: "Use BS7671 Appendix 15 as a guide. Add up the assessed current demand for each circuit type, applying appropriate diversity factors. Consider the specific loads - an all-electric home with EV charging will have higher maximum demand than one with gas heating."
  },
  {
    question: "What is the difference between connected load and maximum demand?",
    answer: "Connected load is the total rating of all equipment that could potentially draw power. Maximum demand is the actual peak power drawn during normal operation. Due to diversity (not everything runs at once), maximum demand is typically 30-60% of connected load."
  },
  {
    question: "How can I help customers reduce their maximum demand charges?",
    answer: "Identify their peak demand periods and what's causing them. Install load management systems, shift flexible loads to off-peak times, consider battery storage to peak-shave, and ensure equipment isn't starting simultaneously (stagger start times)."
  },
  {
    question: "What equipment is suitable for demand response?",
    answer: "Good candidates are loads that have thermal storage (hot water cylinders, refrigeration), can be time-shifted (EV charging, dishwashers, washing machines), or can be briefly interrupted without significant impact (pool pumps, HVAC pre-conditioning)."
  },
  {
    question: "How do smart meters support load management?",
    answer: "Smart meters provide near real-time consumption data, enabling time-of-use tariffs and demand response programs. They show customers when they're using most power and can communicate with smart appliances for automated load shifting."
  },
  {
    question: "Will electrification of heat and transport increase maximum demand?",
    answer: "Yes, heat pumps and EV chargers significantly increase domestic maximum demand. This is why load management is increasingly important - smart charging, thermal storage, and demand-side response help manage this without requiring extensive supply upgrades."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module2Section2_4 = () => {
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
            <Link to="/study-centre/apprentice/level3-module2-section2">
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
              <li><strong>Diversity:</strong> Not all loads run at once</li>
              <li><strong>Max demand:</strong> Peak power actually drawn</li>
              <li><strong>DSR:</strong> Shifting loads to match grid needs</li>
              <li><strong>Time-of-use:</strong> Lower prices off-peak</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Maximum demand indicator in commercial boards</li>
              <li><strong>Use:</strong> BS7671 Appendix 15 for diversity</li>
              <li><strong>Apply:</strong> Smart EV chargers for load management</li>
            </ul>
          </div>
        </div>

        

        

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Understanding Diversity
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Diversity is a fundamental concept in electrical installation design. It recognises that not all connected loads operate at the same time or at their full rated capacity. This allows installations to be sized economically without compromising safety.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Diversity factors depend on:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Load type:</strong> Fixed loads vs general socket outlets</li>
                <li><strong>Building use:</strong> Domestic vs commercial vs industrial</li>
                <li><strong>Number of circuits:</strong> More circuits = more diversity</li>
                <li><strong>Usage patterns:</strong> Known vs unknown loads</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Diversity must be applied sensibly. A data centre with servers running 24/7 has minimal diversity. A domestic property with normal appliances has high diversity.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Maximum Demand Assessment
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Maximum demand is the highest power drawn during normal operation, typically measured as a 15 or 30-minute average. Accurate assessment ensures the supply is adequate without being oversized.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Low Diversity Loads (near 100%)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Electric showers</li>
                  <li>Immersion heaters</li>
                  <li>Space heating systems</li>
                  <li>Motors at full load</li>
                  <li>Cookers (higher diversity internally)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">High Diversity Loads (30-50%)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Socket outlet circuits</li>
                  <li>Lighting circuits</li>
                  <li>Small power generally</li>
                  <li>Multiple dwellings combined</li>
                  <li>Intermittent equipment</li>
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
            Demand-Side Response
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Demand-side response (DSR) involves adjusting electricity consumption in response to grid conditions, price signals, or direct control. As renewable generation increases, flexible demand becomes crucial for grid stability.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A homeowner with solar PV and an EV can set their smart charger to charge the car during the day when solar is generating, or overnight when grid electricity is cheapest. This flexibility provides value to both the consumer and the grid.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">DSR mechanisms:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Time-of-use tariffs:</strong> Price signals encourage off-peak use</li>
                <li><strong>Direct control:</strong> Utility can signal or control loads</li>
                <li><strong>Automated response:</strong> Smart systems respond to signals</li>
                <li><strong>Manual response:</strong> Users shift behaviour based on information</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Load Management Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Load management systems help maintain supply capacity limits by monitoring demand and controlling loads. This is increasingly important as buildings add EV charging and heat pumps to existing supplies.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Monitoring</p>
                <p className="text-white/90 text-xs">Track demand vs supply capacity</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Load Shedding</p>
                <p className="text-white/90 text-xs">Reduce non-essential loads when needed</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Smart Control</p>
                <p className="text-white/90 text-xs">Automatic response to conditions</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Load management can allow more loads on existing supplies by ensuring they don't all operate simultaneously. This may avoid costly supply upgrades.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Assessing Maximum Demand</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Use BS7671 Appendix 15 as starting guidance</li>
                <li>Consider actual usage patterns where known</li>
                <li>Account for future loads (EV charging, heat pumps)</li>
                <li>Be conservative with new or unknown loads</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Specifying Load Management</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Install smart EV chargers with load management capability</li>
                <li>Consider whole-house energy management for multiple loads</li>
                <li>Ensure controls can communicate with each other</li>
                <li>Provide monitoring so customers can see their consumption</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Over-relying on diversity</strong> - Know your loads and usage patterns</li>
                <li><strong>Ignoring future loads</strong> - EV charging is coming to most homes</li>
                <li><strong>No load management for EVs</strong> - Multiple EVs can exceed supply</li>
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
                <p className="font-medium text-white mb-1">Diversity Guidance</p>
                <ul className="space-y-0.5">
                  <li>See BS7671 Appendix 15</li>
                  <li>Socket circuits: high diversity</li>
                  <li>Fixed heating: low diversity</li>
                  <li>Consider actual usage patterns</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">DSR-Suitable Loads</p>
                <ul className="space-y-0.5">
                  <li>EV charging (time flexible)</li>
                  <li>Hot water heating (thermal storage)</li>
                  <li>Washing machines/dishwashers</li>
                  <li>Pool pumps, HVAC pre-conditioning</li>
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
            <Link to="/study-centre/apprentice/level3-module2-section2-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module2-section2-5">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module2Section2_4;
