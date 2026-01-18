import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Renewable Generation vs Energy Storage - Renewable Energy Module 1 Section 3";
const DESCRIPTION = "Understanding how storage technologies complement variable renewable generation to ensure grid reliability.";

const quickCheckQuestions = [
  {
    id: "duck-curve",
    question: "What causes the 'duck curve' pattern in electricity demand?",
    options: [
      "Industrial production cycles",
      "Solar generation reducing midday net demand",
      "Wind power fluctuations",
      "Evening lighting demand"
    ],
    correctIndex: 1,
    explanation: "The duck curve is caused by high solar generation during midday significantly reducing net demand, creating a steep evening ramp when solar output drops and demand rises."
  },
  {
    id: "battery-response",
    question: "What is the typical response time for lithium-ion battery storage systems?",
    options: [
      "Several minutes",
      "Milliseconds",
      "About 30 seconds",
      "1-2 minutes"
    ],
    correctIndex: 1,
    explanation: "Lithium-ion batteries can respond within milliseconds, making them excellent for fast-acting grid services like frequency response."
  },
  {
    id: "storage-duration",
    question: "What is a typical duration for lithium-ion grid storage systems?",
    options: [
      "15-30 minutes",
      "1-4 hours",
      "12-24 hours",
      "Multiple days"
    ],
    correctIndex: 1,
    explanation: "Most lithium-ion grid storage systems are designed for 1-4 hours of duration, suitable for daily peak shifting and frequency services."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Why don't solar panels generate power when it's needed most in the evening?",
    options: [
      "They're designed for midday only",
      "Solar irradiance peaks at midday while demand peaks in evening",
      "Evening temperatures reduce efficiency",
      "Grid operators limit evening output"
    ],
    correctAnswer: 1,
    explanation: "Solar panels generate peak power at midday when sunlight is strongest, but electricity demand typically peaks in the evening when people return home."
  },
  {
    id: 2,
    question: "What is the round-trip efficiency of lithium-ion battery storage?",
    options: [
      "50-60%",
      "70-80%",
      "85-95%",
      "98-99%"
    ],
    correctAnswer: 2,
    explanation: "Lithium-ion batteries achieve 85-95% round-trip efficiency, meaning they retain most of the energy stored for later use."
  },
  {
    id: 3,
    question: "What is 'curtailment' in renewable energy?",
    options: [
      "Increasing output during peak demand",
      "Wasting renewable energy when generation exceeds demand",
      "Storing excess energy in batteries",
      "Reducing installation costs"
    ],
    correctAnswer: 1,
    explanation: "Curtailment occurs when renewable energy must be wasted because generation exceeds what the grid can accept or demand requires."
  },
  {
    id: 4,
    question: "What is the typical lifespan of pumped hydro storage facilities?",
    options: [
      "10-20 years",
      "20-30 years",
      "30-50 years",
      "50-100 years"
    ],
    correctAnswer: 3,
    explanation: "Pumped hydro storage facilities have very long lifespans of 50-100 years, making them excellent long-term grid assets."
  },
  {
    id: 5,
    question: "What is 'behind-the-meter' storage?",
    options: [
      "Storage hidden from view",
      "Customer-side storage connected before the electricity meter",
      "Utility-scale storage systems",
      "Storage in power stations"
    ],
    correctAnswer: 1,
    explanation: "Behind-the-meter storage is located on the customer's side of the electricity meter, used for self-consumption and backup power."
  },
  {
    id: 6,
    question: "What grid service involves batteries maintaining 50Hz frequency?",
    options: [
      "Energy arbitrage",
      "Peak shaving",
      "Frequency response",
      "Capacity firming"
    ],
    correctAnswer: 2,
    explanation: "Frequency response involves batteries quickly injecting or absorbing power to help maintain the grid frequency at 50Hz."
  },
  {
    id: 7,
    question: "What is 'value stacking' in energy storage?",
    options: [
      "Physically stacking battery modules",
      "Combining multiple revenue streams from one storage system",
      "Installing batteries in sequence",
      "Increasing storage capacity over time"
    ],
    correctAnswer: 1,
    explanation: "Value stacking involves operating a storage system to provide multiple services simultaneously, maximising its economic value."
  },
  {
    id: 8,
    question: "How does seasonal variation affect solar output in the UK?",
    options: [
      "No significant change",
      "Winter is 20-30% of summer levels",
      "Winter is higher than summer",
      "Consistent throughout the year"
    ],
    correctAnswer: 1,
    explanation: "UK solar output in winter is typically only 20-30% of summer levels due to shorter days and lower sun angles."
  },
  {
    id: 9,
    question: "What is the difference between power (MW) and energy (MWh) in storage?",
    options: [
      "They are the same thing",
      "Power is how fast energy can be delivered; energy is total capacity",
      "Energy is more important than power",
      "Power is measured in hours"
    ],
    correctAnswer: 1,
    explanation: "Power (MW) is how fast energy can be delivered or absorbed, while energy (MWh) is the total amount that can be stored."
  },
  {
    id: 10,
    question: "What is 'second life' battery storage?",
    options: [
      "Batteries designed to last twice as long",
      "Using retired EV batteries for stationary storage",
      "Backup batteries for primary storage",
      "Storage systems that recharge themselves"
    ],
    correctAnswer: 1,
    explanation: "Second life batteries are EV batteries that have 70-80% capacity remaining when retired from vehicles, repurposed for stationary storage applications."
  }
];

const faqs = [
  {
    question: "Why do we need energy storage if renewable generation is free?",
    answer: "While the 'fuel' is free, renewable energy is often generated when it's not needed and unavailable when it is. Storage allows capture of this free energy when abundant and release during peak demand periods."
  },
  {
    question: "How much storage is needed for a fully renewable grid?",
    answer: "Studies suggest 4-24 hours of storage capacity may be needed for 80-100% renewable penetration, depending on the renewable mix, demand flexibility, and grid interconnection."
  },
  {
    question: "What's the difference between power and energy in storage systems?",
    answer: "Power (MW) is how fast energy can be delivered or absorbed, while energy (MWh) is total capacity. A 10MW/40MWh battery can deliver 10MW for 4 hours, or 5MW for 8 hours."
  },
  {
    question: "Are home batteries worth the investment?",
    answer: "Home batteries can be economically justified when combined with solar PV, time-of-use tariffs, or backup power requirements. Payback periods are typically 8-12 years but improving as costs fall."
  },
  {
    question: "How do storage systems provide frequency regulation?",
    answer: "When grid frequency deviates from 50Hz, storage systems instantly inject or absorb power to restore balance. Their millisecond response makes them more effective than traditional generators."
  },
  {
    question: "Can old EV batteries be used for grid storage?",
    answer: "Yes! EV batteries retain 70-80% capacity when retired from vehicles and can have a second life in stationary storage where weight and space are less critical."
  }
];

const RenewableEnergyModule1Section3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 1 Section 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Renewable Generation vs Energy Storage
          </h1>
          <p className="text-white/80">
            How storage enables higher renewable penetration
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Challenge:</strong> Generation and demand timing mismatch</li>
              <li><strong>Solution:</strong> Storage bridges the gap</li>
              <li><strong>Technologies:</strong> Batteries, pumped hydro, thermal</li>
              <li><strong>Value:</strong> Grid stability, price arbitrage, backup</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Battery containers, pumped hydro plants</li>
              <li><strong>Use:</strong> Sizing storage for solar/wind systems</li>
              <li><strong>Apply:</strong> Maximising self-consumption for customers</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand the mismatch between renewable generation and demand",
              "Learn about key energy storage technologies",
              "Grasp how storage stabilises the grid",
              "Compare grid-scale and behind-the-meter storage",
              "Understand frequency regulation and grid services",
              "Apply storage concepts to system design"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 1: Solar and Wind Variability */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Solar and Wind Variability Challenges
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Renewable energy systems don't always produce power when it's needed most. Solar panels generate peak power during midday when demand is often lower, while wind turbines produce variable output depending on weather conditions.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Solar Variability</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Daily cycles:</strong> Peak at midday, zero at night</li>
                  <li><strong>Seasonal:</strong> Lower output in winter months</li>
                  <li><strong>Weather:</strong> Clouds reduce output by 70-90%</li>
                  <li><strong>Winter performance:</strong> 20-30% of summer levels</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Wind Variability</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Diurnal:</strong> Often stronger at night</li>
                  <li><strong>Seasonal:</strong> Higher in winter (UK)</li>
                  <li><strong>Offshore:</strong> More consistent than onshore</li>
                  <li><strong>Ramp rates:</strong> Can change rapidly</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Peak Demand vs Generation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Peak Demand vs Peak Generation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The timing mismatch between renewable energy generation and electricity demand is a fundamental challenge that storage helps address.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">UK Electricity Demand</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Morning peak:</strong> 7-9 AM</li>
                  <li><strong>Evening peak:</strong> 5-7 PM (highest)</li>
                  <li><strong>Midday dip:</strong> Lower demand</li>
                  <li><strong>Night minimum:</strong> 2-5 AM</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Solar Generation</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Peak generation:</strong> 12-2 PM</li>
                  <li><strong>Morning ramp:</strong> 8 AM-12 PM</li>
                  <li><strong>Evening ramp:</strong> 2-7 PM (decreasing)</li>
                  <li><strong>Zero output:</strong> Night hours</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 my-6">
              <p className="text-elec-yellow text-sm font-medium mb-2">The Duck Curve:</p>
              <p className="text-white text-sm">
                High solar penetration creates a characteristic demand curve: the "belly" is midday demand depression as solar meets load, the "neck" is steep evening ramp as solar drops, and the "head" is evening peak requiring rapid generation ramp-up.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Storage Technologies */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Energy Storage Technologies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Various storage technologies address different timescales and applications, from seconds to seasons.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-elec-yellow text-sm font-medium mb-2">Lithium-ion Batteries</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Duration:</strong> 1-4 hours</li>
                  <li><strong>Efficiency:</strong> 85-95%</li>
                  <li><strong>Response:</strong> Milliseconds</li>
                  <li><strong>Lifespan:</strong> 10-20 years</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-elec-yellow text-sm font-medium mb-2">Pumped Hydro</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Duration:</strong> 6-24+ hours</li>
                  <li><strong>Efficiency:</strong> 70-85%</li>
                  <li><strong>Response:</strong> Minutes</li>
                  <li><strong>Lifespan:</strong> 50-100 years</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-elec-yellow text-sm font-medium mb-2">Thermal Storage</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Duration:</strong> Hours to days</li>
                  <li><strong>Efficiency:</strong> 90-95%</li>
                  <li><strong>Response:</strong> Minutes</li>
                  <li><strong>Lifespan:</strong> 20-30 years</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Grid-scale vs Behind-the-meter */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Grid-scale vs Behind-the-meter Storage
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Energy storage can be deployed at different scales and locations, each serving distinct purposes.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Grid-scale Storage</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Capacity:</strong> 10MW to 1GW+</li>
                  <li><strong>Connection:</strong> Transmission network</li>
                  <li><strong>Owner:</strong> Utility or merchant</li>
                  <li><strong>Uses:</strong> Arbitrage, balancing, firming</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Behind-the-meter</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Capacity:</strong> 5kWh to 10MWh</li>
                  <li><strong>Connection:</strong> Customer side of meter</li>
                  <li><strong>Owner:</strong> End-user owned/leased</li>
                  <li><strong>Uses:</strong> Self-consumption, backup</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 5: Grid Services */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Frequency Regulation and Grid Services
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Beyond shifting energy in time, storage systems provide valuable grid services that help maintain power quality and system stability.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Frequency Services</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Primary response:</strong> Within seconds to frequency deviations</li>
                  <li><strong>Secondary response:</strong> Sustained for 30 minutes</li>
                  <li><strong>Enhanced response:</strong> Sub-second for stability</li>
                  <li><strong>Synthetic inertia:</strong> From power electronics</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Additional Services</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Voltage support:</strong> Reactive power provision</li>
                  <li><strong>Black start:</strong> Grid restoration after outages</li>
                  <li><strong>Congestion relief:</strong> Transmission constraints</li>
                  <li><strong>Fast ramping:</strong> Maintain stability</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Value Stacking:</p>
              <p className="text-sm text-white">
                Modern storage systems can provide multiple services simultaneously, maximising economic value: energy arbitrage + frequency response, peak shaving + backup power, solar self-consumption + grid services.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Real World Example */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Real World Example: Solar + Storage
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A 50MW solar farm installs 20MW/80MWh of battery storage to improve economics and grid compatibility. The storage captures excess midday solar when wholesale prices are low and releases energy during the evening peak when prices are highest.
            </p>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 my-6">
              <p className="text-elec-yellow text-sm font-medium mb-2">Project Benefits:</p>
              <ul className="text-sm text-white space-y-1">
                <li><strong>Revenue increase:</strong> 30-40% higher than solar alone</li>
                <li><strong>Grid value:</strong> Transforms intermittent to dispatchable</li>
                <li><strong>Capacity factor:</strong> Effective increase from 25% to 35%</li>
                <li><strong>Additional revenue:</strong> Frequency regulation markets</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Sizing Storage Systems</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Match storage capacity to generation profile and demand patterns</li>
                <li>Consider both power (kW) and energy (kWh) requirements</li>
                <li>Factor in round-trip efficiency losses in calculations</li>
                <li>Account for battery degradation over system lifetime</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Advising Customers</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Explain self-consumption benefits clearly</li>
                <li>Discuss backup power capabilities and limitations</li>
                <li>Consider time-of-use tariff opportunities</li>
                <li>Be realistic about payback periods and ROI</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Oversizing storage</strong> - match to actual usage patterns</li>
                <li><strong>Ignoring degradation</strong> - batteries lose capacity over time</li>
                <li><strong>Forgetting efficiency losses</strong> - not all energy stored is recovered</li>
                <li><strong>Unrealistic expectations</strong> - storage doesn't eliminate bills</li>
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

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-4">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default RenewableEnergyModule1Section3;
