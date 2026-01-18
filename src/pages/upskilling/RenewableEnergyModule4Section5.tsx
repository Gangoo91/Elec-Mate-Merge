import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Grid Services and Energy Markets - Renewable Energy Module 4";
const DESCRIPTION = "Learn about grid services, frequency response, demand response, and energy market participation for battery energy storage systems.";

const quickCheckQuestions = [
  {
    id: "grid-frequency-response",
    question: "What is the primary purpose of frequency response services?",
    options: ["Increase energy production", "Maintain grid frequency at 50Hz by balancing supply and demand", "Reduce electricity costs", "Store excess energy"],
    correctIndex: 1,
    explanation: "Frequency response services maintain grid frequency at 50Hz by rapidly injecting or absorbing power to balance supply and demand. This is essential for grid stability."
  },
  {
    id: "grid-ffr-speed",
    question: "What response time is required for Fast Frequency Response (FFR)?",
    options: ["Within 30 minutes", "Within 1 second", "Within 10 minutes", "Within 1 hour"],
    correctIndex: 1,
    explanation: "Fast Frequency Response requires response within 1 second of detecting frequency deviation, making batteries ideal due to their rapid response capability compared to conventional generation."
  },
  {
    id: "grid-arbitrage",
    question: "What is energy arbitrage in battery storage?",
    options: ["Selling batteries", "Buying energy cheap and selling when prices are high", "Grid frequency control", "Battery recycling"],
    correctIndex: 1,
    explanation: "Energy arbitrage involves charging batteries when electricity prices are low (typically overnight) and discharging when prices are high (peak periods), profiting from price differences."
  },
  {
    id: "grid-aggregation",
    question: "What is the role of aggregators in grid services?",
    options: ["Battery manufacturing", "Combining multiple small assets to provide grid services collectively", "Grid maintenance", "Metering services"],
    correctIndex: 1,
    explanation: "Aggregators combine multiple smaller battery systems into a virtual power plant, enabling collective participation in grid services markets that require minimum capacity thresholds."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What frequency range must UK grid operate within under normal conditions?",
    options: [
      "48-52Hz",
      "49.5-50.5Hz",
      "45-55Hz",
      "Exactly 50Hz always"
    ],
    correctAnswer: 1,
    explanation: "The UK grid normally operates within 49.5-50.5Hz. Wider limits (49.0-51.0Hz) apply during system events. Outside these ranges, protection systems disconnect generation and load."
  },
  {
    id: 2,
    question: "What is Dynamic Containment (DC) frequency response?",
    options: [
      "Slow response over hours",
      "Sub-second response to maintain frequency within statutory limits",
      "Monthly energy supply",
      "Annual capacity contracts"
    ],
    correctAnswer: 1,
    explanation: "Dynamic Containment is National Grid ESO's fastest frequency response service, requiring delivery within 1 second to contain frequency within statutory limits following large generation losses."
  },
  {
    id: 3,
    question: "What is the Capacity Market designed to ensure?",
    options: [
      "Lowest electricity prices",
      "Sufficient generation and storage capacity for peak demand periods",
      "Maximum renewable generation",
      "Grid frequency control"
    ],
    correctAnswer: 1,
    explanation: "The Capacity Market provides payments to ensure sufficient reliable capacity (generation, storage, DSR) is available to meet peak demand, typically providing 4-year contracts for new build."
  },
  {
    id: 4,
    question: "What is demand side response (DSR)?",
    options: [
      "Generating more electricity",
      "Shifting or reducing electricity consumption in response to signals",
      "Building new power stations",
      "Increasing grid capacity"
    ],
    correctAnswer: 1,
    explanation: "DSR involves adjusting electricity consumption patterns in response to grid conditions or price signals, helping balance supply and demand without additional generation."
  },
  {
    id: 5,
    question: "What minimum capacity is typically required for direct participation in wholesale markets?",
    options: [
      "1 kW",
      "100 kW",
      "1 MW or more",
      "No minimum"
    ],
    correctAnswer: 2,
    explanation: "Direct wholesale market participation typically requires 1 MW minimum capacity. Smaller assets can participate through aggregators who combine multiple sites."
  },
  {
    id: 6,
    question: "What is revenue stacking in battery storage?",
    options: [
      "Storing multiple battery types",
      "Combining multiple revenue streams from different services",
      "Stacking batteries physically",
      "Sequential charging cycles"
    ],
    correctAnswer: 1,
    explanation: "Revenue stacking optimises battery income by combining multiple services - e.g., frequency response during some hours, arbitrage during others, and capacity market payments annually."
  },
  {
    id: 7,
    question: "What does the Smart Export Guarantee (SEG) provide?",
    options: [
      "Free batteries",
      "Payment for exported electricity from small-scale generation",
      "Grid connection subsidy",
      "Installation grants"
    ],
    correctAnswer: 1,
    explanation: "The SEG requires licensed suppliers to offer payment for electricity exported from small-scale generation (up to 5MW). Rates vary by supplier and time of day."
  },
  {
    id: 8,
    question: "What is the typical response time advantage of batteries over gas turbines?",
    options: [
      "Same response time",
      "Seconds vs minutes",
      "Minutes vs hours",
      "Gas is faster"
    ],
    correctAnswer: 1,
    explanation: "Batteries can respond in milliseconds to seconds, while gas turbines typically take 5-10 minutes to ramp up. This makes batteries ideal for fast frequency response services."
  },
  {
    id: 9,
    question: "What is a Power Purchase Agreement (PPA)?",
    options: [
      "Battery warranty",
      "Long-term contract to buy/sell electricity at agreed terms",
      "Grid connection agreement",
      "Insurance policy"
    ],
    correctAnswer: 1,
    explanation: "A PPA is a long-term contract between electricity generator/storage operator and buyer, providing revenue certainty through agreed prices and volumes."
  },
  {
    id: 10,
    question: "What role does battery storage play in renewable integration?",
    options: [
      "Replaces renewable generation",
      "Stores excess renewable energy for use when generation is low",
      "Reduces renewable capacity",
      "Only provides backup"
    ],
    correctAnswer: 1,
    explanation: "Battery storage enables greater renewable penetration by storing excess generation during high output periods and releasing it when renewable generation is low, smoothing variability."
  }
];

const faqs = [
  {
    question: "Can domestic batteries participate in grid services?",
    answer: "Yes, through aggregation. Companies like Octopus Energy, Social Energy, and others aggregate thousands of home batteries into virtual power plants that collectively provide grid services. Homeowners typically receive payments or reduced energy bills in exchange."
  },
  {
    question: "What revenue can grid services generate for commercial battery systems?",
    answer: "Revenue varies significantly with market conditions. Frequency response can generate GBP 50-150 per kW per year. Arbitrage opportunities depend on price spreads. Capacity Market payments provide GBP 15-45 per kW per year. Combined revenue stacking can achieve GBP 100-200+ per kW annually."
  },
  {
    question: "How do time-of-use tariffs benefit battery storage?",
    answer: "Time-of-use tariffs with significant price differences between peak and off-peak periods enable profitable arbitrage. Tariffs like Octopus Agile can have 4-5x price differences, making battery storage economically attractive even without grid service participation."
  },
  {
    question: "What is the difference between energy and power in grid services?",
    answer: "Power services (kW) involve rapid response for short durations - frequency response pays for power availability. Energy services (kWh) involve storing and releasing energy over longer periods - arbitrage and capacity depend on energy throughput."
  },
  {
    question: "How do batteries compete with other flexibility providers?",
    answer: "Batteries offer superior response speed (milliseconds vs minutes for gas), round-trip efficiency (85-95%), and no fuel costs. However, they have duration limitations and higher capital costs per MWh than pumped hydro. Optimal grid flexibility uses multiple technologies."
  },
  {
    question: "What technical requirements exist for grid service participation?",
    answer: "Requirements include: certified metering, real-time communication with aggregator/market operator, demonstrated response capability through qualification testing, and compliance with Grid Code requirements. Aggregators typically handle technical requirements for smaller participants."
  }
];

const RenewableEnergyModule4Section5 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
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
            <span>Module 4 Section 5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Grid Services and Energy Markets
          </h1>
          <p className="text-white/80">
            Frequency response, capacity markets, and revenue opportunities for BESS
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">Grid Services</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Frequency response:</strong> Sub-second to seconds</li>
              <li><strong>Capacity Market:</strong> Peak demand assurance</li>
              <li><strong>Arbitrage:</strong> Buy low, sell high</li>
              <li><strong>DSR:</strong> Demand flexibility</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Revenue Potential</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>FFR:</strong> GBP 50-150/kW/year</li>
              <li><strong>Capacity:</strong> GBP 15-45/kW/year</li>
              <li><strong>Arbitrage:</strong> Variable with spread</li>
              <li><strong>Stacked:</strong> GBP 100-200+/kW/year</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand grid frequency and stability requirements",
              "Compare different frequency response services",
              "Evaluate Capacity Market opportunities",
              "Apply energy arbitrage strategies",
              "Assess aggregation and revenue stacking",
              "Identify revenue opportunities for BESS"
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
            Grid Frequency and Stability
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The UK electricity grid operates at a nominal frequency of 50Hz. Maintaining this frequency within tight limits is essential for grid stability and the safe operation of connected equipment.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Frequency Limits:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Normal operation:</strong> 49.5-50.5Hz</li>
                <li><strong>Occasional deviation:</strong> 49.0-51.0Hz</li>
                <li><strong>Emergency action:</strong> Below 49.0Hz triggers load shedding</li>
                <li><strong>System failure:</strong> Outside 47-52Hz causes widespread disconnection</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Frequency Deviation Causes:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Generation loss:</strong> Power station trip causes frequency drop</li>
                <li><strong>Demand surge:</strong> Sudden load increase drops frequency</li>
                <li><strong>Excess generation:</strong> More supply than demand raises frequency</li>
                <li><strong>Renewable variability:</strong> Cloud cover, wind changes affect balance</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-white mb-2">Battery Storage Advantages:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Response speed:</strong> Milliseconds vs minutes for thermal plant</li>
                <li><strong>Bidirectional:</strong> Can inject or absorb power</li>
                <li><strong>Precision:</strong> Accurate, proportional response</li>
                <li><strong>No warm-up:</strong> Available instantly from idle</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Frequency Response Services
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              National Grid ESO procures various frequency response services to maintain grid stability. Battery storage is increasingly preferred due to superior response characteristics.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Dynamic Containment (DC):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Purpose:</strong> Contain frequency within statutory limits</li>
                <li><strong>Response time:</strong> Full delivery within 1 second</li>
                <li><strong>Duration:</strong> Continuous until frequency recovers</li>
                <li><strong>Variants:</strong> DC Low (under-frequency), DC High (over-frequency)</li>
                <li><strong>Payment:</strong> Availability-based, GBP/MW/hour</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Dynamic Moderation (DM):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Purpose:</strong> Slow rate of frequency change</li>
                <li><strong>Response time:</strong> Within 1 second</li>
                <li><strong>Activation:</strong> 0.2Hz deadband</li>
                <li><strong>Payment:</strong> Availability-based payments</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Dynamic Regulation (DR):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Purpose:</strong> Continuously regulate frequency around 50Hz</li>
                <li><strong>Response time:</strong> Within 10 seconds</li>
                <li><strong>Operation:</strong> Near-continuous operation</li>
                <li><strong>Deadband:</strong> +/- 0.015Hz from 50Hz</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Service Comparison</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>DC:</strong> Fastest, highest value, most demanding</li>
                <li><strong>DM:</strong> Moderate speed, lower cycling</li>
                <li><strong>DR:</strong> Continuous, lower individual response</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Capacity Market and Wholesale Trading
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Beyond frequency services, battery storage can participate in capacity markets and wholesale electricity trading, providing additional revenue streams.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Capacity Market:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Purpose:</strong> Ensure sufficient capacity for peak demand</li>
                <li><strong>Mechanism:</strong> Annual auction for capacity agreements</li>
                <li><strong>Contracts:</strong> 1-year (existing), up to 15-year (new build)</li>
                <li><strong>Requirements:</strong> Must be available during stress events</li>
                <li><strong>Payment:</strong> GBP/kW/year, varies by auction clearing price</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Wholesale Trading:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Day-ahead market:</strong> Trade for next day delivery</li>
                <li><strong>Intraday market:</strong> Adjust positions closer to delivery</li>
                <li><strong>Balancing mechanism:</strong> Real-time energy balancing</li>
                <li><strong>Minimum size:</strong> Typically 1 MW for direct participation</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Energy Arbitrage:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Strategy:</strong> Charge during low prices, discharge during high</li>
                <li><strong>Typical cycle:</strong> Overnight charging, evening peak discharge</li>
                <li><strong>Revenue driver:</strong> Price spread between peak and off-peak</li>
                <li><strong>Considerations:</strong> Efficiency losses reduce net profit</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Aggregation and Virtual Power Plants
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Aggregation enables smaller battery systems to participate in grid services by combining their capacity into virtual power plants that meet minimum threshold requirements.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Aggregation Model:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Virtual power plant:</strong> Multiple assets controlled as single entity</li>
                <li><strong>Central platform:</strong> Aggregator manages dispatch signals</li>
                <li><strong>Communication:</strong> Real-time control and monitoring</li>
                <li><strong>Revenue sharing:</strong> Payments distributed to participants</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Domestic Aggregation:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Participants:</strong> Home batteries with smart control</li>
                <li><strong>Requirements:</strong> Internet connection, compatible inverter</li>
                <li><strong>Control:</strong> Aggregator dispatches within agreed limits</li>
                <li><strong>Benefits:</strong> Reduced bills, grid service payments</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">UK Aggregator Examples</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Octopus Energy:</strong> Tesla Powerwall, various batteries</li>
                <li><strong>Social Energy:</strong> Multiple battery brands</li>
                <li><strong>Moixa/Lunar:</strong> GridShare platform</li>
                <li><strong>EDF/Pod Point:</strong> EV and home battery integration</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Revenue Stacking and Optimisation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Maximising battery revenue requires intelligent combination of multiple services and market participation, known as revenue stacking.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Revenue Stacking Strategy:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Base revenue:</strong> Capacity Market provides annual income</li>
                <li><strong>Primary service:</strong> Frequency response during eligible hours</li>
                <li><strong>Secondary service:</strong> Arbitrage during non-committed periods</li>
                <li><strong>Optimisation:</strong> Switch services based on real-time value</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Typical Commercial BESS Revenue:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Frequency response:</strong> GBP 50-150/kW/year</li>
                <li><strong>Capacity Market:</strong> GBP 15-45/kW/year</li>
                <li><strong>Arbitrage:</strong> GBP 20-80/kW/year (variable)</li>
                <li><strong>Combined:</strong> GBP 100-200+/kW/year achievable</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Domestic Battery Benefits:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Self-consumption:</strong> Avoid grid import at peak rates</li>
                <li><strong>Export payments:</strong> SEG rates for excess generation</li>
                <li><strong>Aggregation income:</strong> GBP 50-150/year typical</li>
                <li><strong>Tariff optimisation:</strong> Time-of-use arbitrage savings</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Evaluating Grid Service Opportunities</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Assess battery specifications against service requirements</li>
                <li>Consider cycling impact on battery warranty and lifespan</li>
                <li>Evaluate aggregator terms and revenue sharing models</li>
                <li>Model revenue potential against installation costs</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Advising Customers</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Explain aggregation options for domestic batteries</li>
                <li>Consider time-of-use tariffs for maximum benefit</li>
                <li>Ensure inverter and battery support required protocols</li>
                <li>Discuss potential impact on self-consumption patterns</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Overestimating revenue</strong> - market rates are variable</li>
                <li><strong>Ignoring cycling degradation</strong> - affects battery lifespan</li>
                <li><strong>Incompatible equipment</strong> - must support required protocols</li>
                <li><strong>Lock-in contracts</strong> - understand aggregator terms</li>
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
            <Link to="../section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-6">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default RenewableEnergyModule4Section5;
