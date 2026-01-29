import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Load Management and Demand Reduction - HNC Module 3 Section 6.3";
const DESCRIPTION = "Master load management strategies for building services: maximum demand, load factor, demand response, peak shaving, time-of-use tariffs and BMS load control systems.";

const quickCheckQuestions = [
  {
    id: "load-factor",
    question: "A building has a maximum demand of 500kW and average demand of 300kW. What is the load factor?",
    options: ["0.40", "0.60", "0.80", "1.67"],
    correctIndex: 1,
    explanation: "Load Factor = Average Demand / Maximum Demand = 300kW / 500kW = 0.60 (60%). A higher load factor indicates more efficient use of the electrical supply capacity."
  },
  {
    id: "peak-shaving",
    question: "Which technique involves using battery storage or generators to reduce grid demand during peak periods?",
    options: ["Load shedding", "Peak shaving", "Time shifting", "Load cycling"],
    correctIndex: 1,
    explanation: "Peak shaving uses supplementary power sources (batteries, generators, or renewable energy) to reduce the peak demand drawn from the grid, lowering demand charges and improving supply stability."
  },
  {
    id: "power-factor-benefit",
    question: "Improving power factor from 0.70 to 0.95 reduces the apparent power (kVA) by approximately what percentage for the same real power (kW)?",
    options: ["15%", "26%", "36%", "50%"],
    correctIndex: 1,
    explanation: "At pf 0.70: kVA = kW/0.70 = 1.43×kW. At pf 0.95: kVA = kW/0.95 = 1.05×kW. Reduction = (1.43-1.05)/1.43 = 26.6%. This reduces cable sizing and distribution losses."
  },
  {
    id: "demand-response",
    question: "What is the primary purpose of demand response programmes?",
    options: [
      "Increase electricity consumption",
      "Reduce demand during grid stress periods",
      "Eliminate the need for backup generators",
      "Increase power factor"
    ],
    correctIndex: 1,
    explanation: "Demand response programmes reduce electricity consumption during periods of grid stress (high demand or supply shortage), helping maintain grid stability and often providing financial incentives to participants."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is maximum demand (MD) in building electrical systems?",
    options: [
      "The total installed load capacity",
      "The highest average power drawn over a defined period",
      "The peak instantaneous power",
      "The contracted supply capacity"
    ],
    correctAnswer: 1,
    explanation: "Maximum demand is the highest average power (usually kW or kVA) drawn over a specific time period, typically 30 minutes. It determines supply capacity requirements and often affects electricity billing."
  },
  {
    id: 2,
    question: "A commercial building operates from 08:00 to 18:00 with total energy consumption of 2400 kWh and maximum demand of 400 kW. What is the load factor?",
    options: ["0.50", "0.60", "0.75", "0.80"],
    correctAnswer: 1,
    explanation: "Operating hours = 10h. Average demand = 2400 kWh / 10h = 240 kW. Load Factor = Average / Maximum = 240 / 400 = 0.60 (60%)."
  },
  {
    id: 3,
    question: "Which loads should typically be given highest priority in a load shedding scheme?",
    options: [
      "Air conditioning and comfort cooling",
      "Life safety and emergency systems",
      "General lighting",
      "Electric vehicle charging"
    ],
    correctAnswer: 1,
    explanation: "Life safety systems (fire alarms, emergency lighting, smoke extract, lifts for evacuation) must always be protected from load shedding. These are essential for occupant safety and regulatory compliance."
  },
  {
    id: 4,
    question: "What is the typical ratio between peak and off-peak electricity tariffs in UK time-of-use pricing?",
    options: ["1.2:1", "1.5:1", "2:1 to 3:1", "5:1"],
    correctAnswer: 2,
    explanation: "UK time-of-use tariffs typically see peak rates 2-3 times higher than off-peak rates. This provides significant incentive to shift flexible loads to cheaper periods."
  },
  {
    id: 5,
    question: "A building has 500 kVA apparent power at 0.75 power factor. After installing capacitor banks, the power factor improves to 0.95. What is the new apparent power?",
    options: ["375 kVA", "395 kVA", "475 kVA", "525 kVA"],
    correctAnswer: 1,
    explanation: "Real power P = S × pf = 500 × 0.75 = 375 kW. New apparent power S = P / pf = 375 / 0.95 = 395 kVA. The same real power requires 21% less supply capacity."
  },
  {
    id: 6,
    question: "What is the recommended minimum delay for staggered motor starting in BMS systems?",
    options: ["5 seconds", "10-30 seconds", "2-5 minutes", "10 minutes"],
    correctAnswer: 1,
    explanation: "Typical staggered start delays of 10-30 seconds between large motors prevent coincident inrush currents. This reduces peak demand and voltage dip during building start-up."
  },
  {
    id: 7,
    question: "Which demand-side management technique shifts load from peak to off-peak periods without reducing total consumption?",
    options: ["Peak clipping", "Strategic conservation", "Load shifting", "Valley filling"],
    correctAnswer: 2,
    explanation: "Load shifting moves flexible loads (e.g., thermal storage, EV charging, water heating) from expensive peak periods to cheaper off-peak periods. Total consumption remains similar but costs and grid impact reduce."
  },
  {
    id: 8,
    question: "A factory has a maximum demand charge of 12/kVA/month. Reducing MD from 800 kVA to 650 kVA saves how much annually?",
    options: ["900", "1,800", "10,800", "21,600"],
    correctAnswer: 2,
    explanation: "Monthly saving = (800 - 650) × 12 = 150 × 12 = 1,800. Annual saving = 1,800 × 12 months = 21,600... Wait, let me recalculate: Monthly = 150 × 12 = 1,800. Annual = 1,800 × 12 = 21,600. Actually the question says per month so: Annual = (800-650) × 12 × 12 = 21,600. But typically the charge is per kVA per month, so annual = 150 × 12 × 12 = 21,600."
  },
  {
    id: 9,
    question: "What is the purpose of 'demand limiting' in BMS load control?",
    options: [
      "To prevent power factor penalties",
      "To keep demand below a preset maximum threshold",
      "To balance loads across phases",
      "To protect transformers from overload"
    ],
    correctAnswer: 1,
    explanation: "Demand limiting monitors real-time power consumption and progressively sheds non-essential loads to keep maximum demand below a preset threshold. This prevents costly demand charges and supply upgrades."
  },
  {
    id: 10,
    question: "Which renewable energy technology is most effective for peak shaving in UK commercial buildings?",
    options: [
      "Wind turbines",
      "Solar PV with battery storage",
      "Ground source heat pumps",
      "Biomass CHP"
    ],
    correctAnswer: 1,
    explanation: "Solar PV generates most power during daytime peaks when commercial demand is highest. Combined with battery storage, excess generation can be stored for evening peaks or cloudy periods, making it highly effective for peak shaving."
  }
];

const faqs = [
  {
    question: "How is maximum demand measured and billed?",
    answer: "Maximum demand is typically measured as the highest average power (kW or kVA) over a 30-minute integration period during the billing month. Meters record the peak value which is used for demand charges. Some suppliers use shorter periods (15 minutes) or measure kVA to include reactive power. Understanding your billing basis is essential for effective demand management."
  },
  {
    question: "What is the difference between load shedding and demand response?",
    answer: "Load shedding is typically automated, building-level control that reduces loads when demand exceeds preset limits. Demand response is a grid-level programme where buildings voluntarily reduce consumption during network stress events, often in exchange for financial incentives. Both reduce demand but operate at different scales and with different triggers."
  },
  {
    question: "How do I calculate the payback for power factor correction equipment?",
    answer: "Calculate current reactive power penalty charges from bills. Determine the required kVAr to achieve target pf. Quote capacitor bank equipment and installation costs. Payback = Equipment Cost / Annual Savings. Typical paybacks are 1-3 years. Also consider reduced cable/transformer losses and potential to avoid supply upgrades."
  },
  {
    question: "What loads are suitable for automated load shedding?",
    answer: "Suitable loads have thermal mass or storage capacity and can tolerate brief interruptions: HVAC (excluding critical areas), water heating, ice storage, EV charging, non-essential lighting, and deferrable processes. Unsuitable loads include life safety systems, critical IT, lifts during occupied hours, and process-critical equipment."
  },
  {
    question: "How does thermal storage help with demand management?",
    answer: "Thermal storage (ice banks, chilled water, hot water) allows cooling or heating capacity to be built up during off-peak periods using cheaper electricity. During peak periods, stored thermal energy meets loads without running chillers/heaters, significantly reducing electrical demand. Ice storage is particularly effective as it allows chillers to be much smaller."
  },
  {
    question: "What BMS features support load management?",
    answer: "Key BMS features include: demand monitoring with trend logging, optimum start/stop to avoid peak periods, staggered motor starting sequences, demand limiting with load priority tables, time-of-use scheduling to shift loads, integration with utility demand response signals, and reporting dashboards for analysis and billing verification."
  }
];

const HNCModule3Section6_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 3.6.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Load Management and Demand Reduction
          </h1>
          <p className="text-white/80">
            Strategies and techniques to optimise electrical demand, reduce peak loads and minimise energy costs in building services
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Maximum demand:</strong> Peak power averaged over 30 minutes</li>
              <li className="pl-1"><strong>Load factor:</strong> Average demand / Maximum demand</li>
              <li className="pl-1"><strong>Peak shaving:</strong> Reduce grid peaks using storage or generation</li>
              <li className="pl-1"><strong>Load shifting:</strong> Move flexible loads to off-peak periods</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>BMS control:</strong> Automated demand limiting</li>
              <li className="pl-1"><strong>Staggered starting:</strong> Avoid motor inrush coincidence</li>
              <li className="pl-1"><strong>ToU tariffs:</strong> 2-3x cost difference peak vs off-peak</li>
              <li className="pl-1"><strong>Power factor:</strong> Reduce kVA for same kW output</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Calculate maximum demand and load factor for buildings",
              "Explain demand response and load shedding strategies",
              "Apply peak shaving techniques using storage and generation",
              "Understand time-of-use tariff structures and optimisation",
              "Quantify power factor correction benefits",
              "Design BMS load control schemes with staggered starting"
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

        {/* Section 1: Maximum Demand and Load Factor */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Maximum Demand and Load Factor
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Maximum demand (MD) is the highest average power drawn by a building over a defined period,
              typically 30 minutes. It determines supply infrastructure sizing, affects electricity costs,
              and is the key metric for load management strategies.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key definitions:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Maximum Demand (MD):</strong> Highest average power over integration period (kW or kVA)</li>
                <li className="pl-1"><strong>Integration Period:</strong> Time over which demand is averaged (typically 30 minutes)</li>
                <li className="pl-1"><strong>Connected Load:</strong> Total installed equipment rating</li>
                <li className="pl-1"><strong>Diversity Factor:</strong> Ratio of maximum demand to connected load</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Load Factor Calculation</p>
              <p className="font-mono text-center text-lg mb-2">Load Factor = Average Demand / Maximum Demand</p>
              <p className="text-xs text-white/70 text-center">Also expressed as: Total Energy (kWh) / (MD × Operating Hours)</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Load Factors by Building Type</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Building Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Load Factor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Characteristics</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Continuous process industry</td>
                      <td className="border border-white/10 px-3 py-2">0.80 - 0.95</td>
                      <td className="border border-white/10 px-3 py-2">24/7 operation, stable loads</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Office building</td>
                      <td className="border border-white/10 px-3 py-2">0.40 - 0.60</td>
                      <td className="border border-white/10 px-3 py-2">Peak morning start-up, daytime only</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Retail premises</td>
                      <td className="border border-white/10 px-3 py-2">0.50 - 0.65</td>
                      <td className="border border-white/10 px-3 py-2">Extended hours, variable occupancy</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Schools and colleges</td>
                      <td className="border border-white/10 px-3 py-2">0.30 - 0.45</td>
                      <td className="border border-white/10 px-3 py-2">Term-time only, holidays</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Residential</td>
                      <td className="border border-white/10 px-3 py-2">0.25 - 0.35</td>
                      <td className="border border-white/10 px-3 py-2">Morning/evening peaks, diverse occupancy</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Commercial benefit:</strong> Higher load factor means better utilisation of supply infrastructure.
              Many suppliers offer lower unit rates to customers with high load factors.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Demand Response Strategies */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Demand Response Strategies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Demand response (DR) encompasses actions taken to reduce electricity consumption during periods
              of peak demand or grid stress. Participation in DR programmes can provide significant financial
              benefits whilst supporting grid stability.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Types of demand response:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Price-based DR:</strong> Respond to time-varying electricity prices</li>
                <li className="pl-1"><strong>Incentive-based DR:</strong> Receive payments for reducing load when called upon</li>
                <li className="pl-1"><strong>Emergency DR:</strong> Mandatory reductions during grid emergencies</li>
                <li className="pl-1"><strong>Capacity market:</strong> Commit to providing demand reduction capacity</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">UK Demand Response Schemes</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Demand Flexibility Service:</strong> National Grid payments for shifting load</li>
                  <li className="pl-1"><strong>STOR:</strong> Short-term operating reserve</li>
                  <li className="pl-1"><strong>Capacity Market:</strong> Annual payments for availability</li>
                  <li className="pl-1"><strong>Triad avoidance:</strong> Avoid top 3 demand peaks</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical DR Actions</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Pre-cool buildings before DR event</li>
                  <li className="pl-1">Reduce HVAC setpoints temporarily</li>
                  <li className="pl-1">Dim non-essential lighting</li>
                  <li className="pl-1">Defer EV charging and water heating</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">DR Event Notification Timeline</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Notice Period</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Programme</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Payment Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Day-ahead</td>
                      <td className="border border-white/10 px-3 py-2">Scheduled DR, Triad avoidance</td>
                      <td className="border border-white/10 px-3 py-2">Lower</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2-4 hours</td>
                      <td className="border border-white/10 px-3 py-2">Demand Flexibility Service</td>
                      <td className="border border-white/10 px-3 py-2">Medium</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">20-30 minutes</td>
                      <td className="border border-white/10 px-3 py-2">STOR, Emergency response</td>
                      <td className="border border-white/10 px-3 py-2">Higher</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Building automation:</strong> BMS integration with aggregator platforms enables automatic DR response,
              maximising participation without manual intervention.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 3: Load Shedding and Prioritisation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Load Shedding and Prioritisation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Load shedding is the systematic reduction of electrical loads to keep demand below a threshold.
              Effective load shedding requires careful prioritisation to maintain essential services whilst
              reducing non-critical consumption.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Load Priority Categories</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Priority</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Category</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Example Loads</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Shedding</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-red-400 font-medium">1 - Critical</td>
                      <td className="border border-white/10 px-3 py-2">Life safety</td>
                      <td className="border border-white/10 px-3 py-2">Fire systems, emergency lighting, lifts</td>
                      <td className="border border-white/10 px-3 py-2">Never shed</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-orange-400 font-medium">2 - Essential</td>
                      <td className="border border-white/10 px-3 py-2">Core operations</td>
                      <td className="border border-white/10 px-3 py-2">IT servers, security, critical process</td>
                      <td className="border border-white/10 px-3 py-2">Only in emergency</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-yellow-400 font-medium">3 - Important</td>
                      <td className="border border-white/10 px-3 py-2">Comfort critical</td>
                      <td className="border border-white/10 px-3 py-2">Primary HVAC, main lighting</td>
                      <td className="border border-white/10 px-3 py-2">Reduce before shed</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-green-400 font-medium">4 - Deferrable</td>
                      <td className="border border-white/10 px-3 py-2">Flexible loads</td>
                      <td className="border border-white/10 px-3 py-2">EV charging, water heating, storage</td>
                      <td className="border border-white/10 px-3 py-2">First to shed</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-blue-400 font-medium">5 - Non-essential</td>
                      <td className="border border-white/10 px-3 py-2">Amenity</td>
                      <td className="border border-white/10 px-3 py-2">Decorative lighting, displays, vending</td>
                      <td className="border border-white/10 px-3 py-2">Shed freely</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Load Shedding Strategies</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Rotating shed:</strong> Cycle loads on/off in sequence</li>
                  <li className="pl-1"><strong>Duty cycling:</strong> Limit run-time percentage</li>
                  <li className="pl-1"><strong>Staged reduction:</strong> Progressive load removal</li>
                  <li className="pl-1"><strong>Demand limiting:</strong> Auto-shed at threshold</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Implementation Requirements</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Real-time demand monitoring</li>
                  <li className="pl-1">Controllable load circuits/contactors</li>
                  <li className="pl-1">BMS integration and programming</li>
                  <li className="pl-1">Occupant communication protocols</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Regulatory note:</strong> BS 7671 and building regulations require that life safety systems remain
              operational. Load shedding schemes must be designed to protect these circuits.
            </p>
          </div>
        </section>

        {/* Section 4: Peak Shaving Techniques */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Peak Shaving Techniques
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Peak shaving reduces maximum demand by supplementing grid supply with local generation or storage
              during peak periods. This reduces demand charges, improves supply resilience, and can provide
              significant cost savings.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Peak Shaving Technologies</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Technology</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Response Time</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Duration</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Battery storage (BESS)</td>
                      <td className="border border-white/10 px-3 py-2">Milliseconds</td>
                      <td className="border border-white/10 px-3 py-2">1-4 hours</td>
                      <td className="border border-white/10 px-3 py-2">Daily peak shaving, DR</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Diesel/gas generator</td>
                      <td className="border border-white/10 px-3 py-2">30-60 seconds</td>
                      <td className="border border-white/10 px-3 py-2">Hours (fuel limited)</td>
                      <td className="border border-white/10 px-3 py-2">Extended peaks, backup</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">CHP (combined heat/power)</td>
                      <td className="border border-white/10 px-3 py-2">Minutes</td>
                      <td className="border border-white/10 px-3 py-2">Continuous</td>
                      <td className="border border-white/10 px-3 py-2">Base load with heat demand</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Solar PV</td>
                      <td className="border border-white/10 px-3 py-2">Instant (when generating)</td>
                      <td className="border border-white/10 px-3 py-2">Daylight hours</td>
                      <td className="border border-white/10 px-3 py-2">Daytime peak reduction</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Thermal storage (ice/water)</td>
                      <td className="border border-white/10 px-3 py-2">Minutes</td>
                      <td className="border border-white/10 px-3 py-2">Hours</td>
                      <td className="border border-white/10 px-3 py-2">HVAC peak shifting</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Battery Sizing for Peak Shaving</p>
              <p className="font-mono text-center text-base mb-2">Required Capacity (kWh) = Peak Reduction (kW) x Duration (hours) / DoD</p>
              <p className="text-xs text-white/70 text-center">DoD = Depth of Discharge (typically 0.8-0.9 for lithium-ion)</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6 text-sm">
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-elec-yellow mb-1">Example: Battery Sizing</p>
                <p className="text-white/70">Reduce peak by 100 kW for 2 hours</p>
                <p className="text-white/70">Capacity = 100 x 2 / 0.85 = 235 kWh</p>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-elec-yellow mb-1">Economic Benefit</p>
                <p className="text-white/70">MD reduction: 100 kW</p>
                <p className="text-white/70">At £15/kVA/month = £18,000/year saving</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Hybrid systems:</strong> Combining solar PV with battery storage maximises peak shaving benefits -
              PV reduces daytime peaks whilst batteries handle morning start-up and evening peaks.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 5: Time-of-Use Tariffs */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Time-of-Use Tariffs
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Time-of-use (ToU) tariffs charge different rates depending on when electricity is consumed.
              Understanding tariff structures is essential for optimising load scheduling and achieving
              cost savings through load shifting.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical UK ToU Tariff Periods</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Period</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Times</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Rate (example)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Strategy</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-red-400 font-medium">Peak (Red)</td>
                      <td className="border border-white/10 px-3 py-2">16:00-19:00 weekdays</td>
                      <td className="border border-white/10 px-3 py-2">30-45p/kWh</td>
                      <td className="border border-white/10 px-3 py-2">Minimise consumption</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-orange-400 font-medium">High (Amber)</td>
                      <td className="border border-white/10 px-3 py-2">07:00-16:00, 19:00-23:00</td>
                      <td className="border border-white/10 px-3 py-2">18-25p/kWh</td>
                      <td className="border border-white/10 px-3 py-2">Normal operations</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-green-400 font-medium">Off-peak (Green)</td>
                      <td className="border border-white/10 px-3 py-2">23:00-07:00, weekends</td>
                      <td className="border border-white/10 px-3 py-2">8-15p/kWh</td>
                      <td className="border border-white/10 px-3 py-2">Shift flexible loads here</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Loads suitable for time shifting:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Electric vehicle charging:</strong> Easily deferred to overnight</li>
                <li className="pl-1"><strong>Water heating:</strong> Thermal storage provides flexibility</li>
                <li className="pl-1"><strong>Ice storage:</strong> Make ice overnight for daytime cooling</li>
                <li className="pl-1"><strong>Batch processes:</strong> Schedule to avoid peak periods</li>
                <li className="pl-1"><strong>Battery charging:</strong> Charge off-peak, discharge on-peak</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Triad Periods (Half-Hourly Metered Sites)</p>
              <p className="text-sm text-white mb-2">
                Triads are the three highest demand periods on the national grid between November and February.
                Transmission charges (TNUoS) are based on your demand during these periods.
              </p>
              <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                <li className="pl-1">Typical Triad periods: 17:00-18:00 on cold winter weekdays</li>
                <li className="pl-1">Triad charges: £50-70/kW depending on region</li>
                <li className="pl-1">Reducing demand by 100 kW during Triads saves £5,000-7,000/year</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Forecasting:</strong> National Grid publishes Triad warnings. BMS systems can integrate
              these alerts to automatically reduce demand during likely Triad periods.
            </p>
          </div>
        </section>

        {/* Section 6: Power Factor Correction Benefits */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Power Factor Correction Benefits
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Power factor correction (PFC) reduces the reactive power drawn from the supply, lowering
              apparent power (kVA) for the same real power (kW). This reduces maximum demand charges,
              cable losses, and may avoid supply capacity upgrades.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Power Factor Relationships</p>
              <div className="grid grid-cols-3 gap-3 text-center text-sm">
                <div className="p-3 rounded bg-black/20">
                  <p className="font-bold text-elec-yellow mb-1">pf = kW / kVA</p>
                  <p className="text-white/70 text-xs">Power factor definition</p>
                </div>
                <div className="p-3 rounded bg-black/20">
                  <p className="font-bold text-elec-yellow mb-1">kVAr = kVA x sin(cos⁻¹pf)</p>
                  <p className="text-white/70 text-xs">Reactive power</p>
                </div>
                <div className="p-3 rounded bg-black/20">
                  <p className="font-bold text-elec-yellow mb-1">kVA = kW / pf</p>
                  <p className="text-white/70 text-xs">Apparent power</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Benefits of Power Factor Improvement</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Benefit</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Saving</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Reduced MD charges</td>
                      <td className="border border-white/10 px-3 py-2">Lower kVA demand</td>
                      <td className="border border-white/10 px-3 py-2">5-15% of demand charge</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Avoid pf penalty</td>
                      <td className="border border-white/10 px-3 py-2">Suppliers penalise pf &lt; 0.90</td>
                      <td className="border border-white/10 px-3 py-2">Varies by supplier</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Released capacity</td>
                      <td className="border border-white/10 px-3 py-2">More kW from same kVA supply</td>
                      <td className="border border-white/10 px-3 py-2">Avoid supply upgrade cost</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Reduced I²R losses</td>
                      <td className="border border-white/10 px-3 py-2">Lower current = less heat loss</td>
                      <td className="border border-white/10 px-3 py-2">1-3% energy saving</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Voltage improvement</td>
                      <td className="border border-white/10 px-3 py-2">Less voltage drop in cables</td>
                      <td className="border border-white/10 px-3 py-2">Improved equipment performance</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">PFC Equipment Types</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Fixed capacitors:</strong> Simple, low-cost, constant loads</li>
                  <li className="pl-1"><strong>Auto-switching:</strong> Banks with contactors for varying loads</li>
                  <li className="pl-1"><strong>Static (thyristor):</strong> Fast-switching, harmonic-filtered</li>
                  <li className="pl-1"><strong>Active filters:</strong> For non-linear loads with harmonics</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Capacitor Sizing</p>
                <p className="text-sm text-white mb-2">Required kVAr to correct from pf₁ to pf₂:</p>
                <p className="font-mono text-sm text-center bg-black/20 p-2 rounded">
                  kVAr = kW × (tan(cos⁻¹pf₁) - tan(cos⁻¹pf₂))
                </p>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Warning:</strong> Over-correction (leading pf) can cause voltage rise and equipment damage.
              Target pf of 0.95-0.98 is recommended.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 7: Demand Side Management */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Demand Side Management
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Demand side management (DSM) encompasses all strategies to modify consumer demand patterns
              through efficiency improvements, load shifting, and demand reduction. Effective DSM reduces
              costs, improves grid stability, and supports decarbonisation goals.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">DSM Strategy Types</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Strategy</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Example Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Peak Clipping</td>
                      <td className="border border-white/10 px-3 py-2">Reduce peaks directly</td>
                      <td className="border border-white/10 px-3 py-2">Load shedding, demand limiting</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Valley Filling</td>
                      <td className="border border-white/10 px-3 py-2">Increase off-peak consumption</td>
                      <td className="border border-white/10 px-3 py-2">Off-peak water/ice storage</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Load Shifting</td>
                      <td className="border border-white/10 px-3 py-2">Move loads from peak to off-peak</td>
                      <td className="border border-white/10 px-3 py-2">EV charging, batch processes</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Strategic Conservation</td>
                      <td className="border border-white/10 px-3 py-2">Permanent demand reduction</td>
                      <td className="border border-white/10 px-3 py-2">Efficiency upgrades, LED retrofit</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Flexible Load Shape</td>
                      <td className="border border-white/10 px-3 py-2">Adapt to grid conditions</td>
                      <td className="border border-white/10 px-3 py-2">Smart controls, price response</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">DSM Implementation Hierarchy</p>
              <ol className="text-sm text-white space-y-1 list-decimal list-outside ml-5">
                <li className="pl-1"><strong>Measure:</strong> Install sub-metering to understand load profiles</li>
                <li className="pl-1"><strong>Analyse:</strong> Identify peak contributors and flexible loads</li>
                <li className="pl-1"><strong>Reduce:</strong> Implement efficiency measures to lower base load</li>
                <li className="pl-1"><strong>Shift:</strong> Reschedule flexible loads to off-peak periods</li>
                <li className="pl-1"><strong>Automate:</strong> Integrate controls with BMS for automatic optimisation</li>
                <li className="pl-1"><strong>Monitor:</strong> Track performance and refine strategies</li>
              </ol>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6 text-sm">
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-elec-yellow mb-1">Quick Wins</p>
                <ul className="text-white/70 space-y-1 list-disc list-outside ml-4">
                  <li>Stagger start-up sequences</li>
                  <li>Optimise HVAC schedules</li>
                  <li>Control hot water heating times</li>
                  <li>Adjust EV charging times</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-elec-yellow mb-1">Strategic Investments</p>
                <ul className="text-white/70 space-y-1 list-disc list-outside ml-4">
                  <li>Battery energy storage</li>
                  <li>Thermal storage systems</li>
                  <li>Smart building controls</li>
                  <li>On-site generation (PV, CHP)</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Grid services:</strong> Buildings with effective DSM can participate in balancing services,
              frequency response, and capacity markets, creating revenue streams from flexibility.
            </p>
          </div>
        </section>

        {/* Section 8: Building Services - BMS Load Control */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
            Building Services: BMS Load Control
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Building Management Systems (BMS) provide the automation platform for implementing load
              management strategies. Effective BMS programming can significantly reduce maximum demand
              through demand limiting, optimum start, and staggered equipment control.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BMS Load Control Functions</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Function</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">MD Reduction</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Demand limiting</td>
                      <td className="border border-white/10 px-3 py-2">Auto-shed loads at threshold</td>
                      <td className="border border-white/10 px-3 py-2">10-20%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Staggered starting</td>
                      <td className="border border-white/10 px-3 py-2">Sequential equipment start-up</td>
                      <td className="border border-white/10 px-3 py-2">15-30%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Optimum start</td>
                      <td className="border border-white/10 px-3 py-2">Pre-condition before occupancy</td>
                      <td className="border border-white/10 px-3 py-2">5-10%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Duty cycling</td>
                      <td className="border border-white/10 px-3 py-2">Limit equipment run-time %</td>
                      <td className="border border-white/10 px-3 py-2">10-15%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Load rotation</td>
                      <td className="border border-white/10 px-3 py-2">Cycle similar loads</td>
                      <td className="border border-white/10 px-3 py-2">5-10%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Staggered Motor Starting Sequence</p>
              <p className="text-sm text-white mb-3">
                Without staggered starting, coincident motor inrush can create demand spikes 6-8 times
                running current. A typical sequence for building start-up:
              </p>
              <ol className="text-sm text-white space-y-1 list-decimal list-outside ml-5">
                <li className="pl-1"><strong>T+0s:</strong> Supply fans start (priority ventilation)</li>
                <li className="pl-1"><strong>T+15s:</strong> Return fans start</li>
                <li className="pl-1"><strong>T+30s:</strong> Chilled water pumps start</li>
                <li className="pl-1"><strong>T+45s:</strong> Heating water pumps start</li>
                <li className="pl-1"><strong>T+60s:</strong> Chiller 1 starts</li>
                <li className="pl-1"><strong>T+90s:</strong> Chiller 2 starts (if required)</li>
                <li className="pl-1"><strong>T+120s:</strong> Non-essential loads enabled</li>
              </ol>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Demand Limiting Algorithm</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Monitor kW at 1-minute intervals</li>
                  <li className="pl-1">Predict end-of-period demand</li>
                  <li className="pl-1">Shed loads when threshold approached</li>
                  <li className="pl-1">Restore loads in priority order</li>
                  <li className="pl-1">Minimum off-time to protect equipment</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Load Priority Programming</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Assign priority levels 1-10</li>
                  <li className="pl-1">Lowest priority shed first</li>
                  <li className="pl-1">Set minimum on/off times</li>
                  <li className="pl-1">Protect critical equipment</li>
                  <li className="pl-1">Log all shed events for analysis</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Soft Starter and VSD Benefits</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Soft starters:</strong> Reduce starting current from 6-8x to 2-3x FLC</li>
                <li className="pl-1"><strong>VSDs:</strong> Eliminate starting current spike entirely, enable speed control</li>
                <li className="pl-1">Both reduce peak demand during start-up and protect supply infrastructure</li>
                <li className="pl-1">VSDs additionally reduce running power at part-load (follows cube law for fans/pumps)</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Commissioning note:</strong> Staggered start sequences must be tested during commissioning
              to verify delays are appropriate and no critical services are delayed excessively.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Load Factor Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> An office building consumes 15,000 kWh over a 22-day working month,
                operating 10 hours per day. Maximum demand is 95 kW. Calculate the load factor.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Operating hours = 22 days x 10 hours = 220 hours</p>
                <p className="mt-2">Average demand = Total energy / Operating hours</p>
                <p>Average demand = 15,000 kWh / 220 h = <strong>68.2 kW</strong></p>
                <p className="mt-2">Load Factor = Average demand / Maximum demand</p>
                <p>Load Factor = 68.2 / 95 = <strong>0.72 (72%)</strong></p>
                <p className="mt-2 text-white/60">→ Good load factor indicates efficient supply utilisation</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Power Factor Correction Savings</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A factory has 400 kW load at 0.75 pf. Calculate the kVAr required
                to improve to 0.95 pf, and the kVA reduction achieved.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Original kVA = kW / pf = 400 / 0.75 = <strong>533 kVA</strong></p>
                <p className="mt-2">Required kVAr = kW x (tan(cos⁻¹0.75) - tan(cos⁻¹0.95))</p>
                <p>tan(cos⁻¹0.75) = 0.882</p>
                <p>tan(cos⁻¹0.95) = 0.329</p>
                <p>kVAr = 400 x (0.882 - 0.329) = 400 x 0.553 = <strong>221 kVAr</strong></p>
                <p className="mt-2">New kVA = 400 / 0.95 = <strong>421 kVA</strong></p>
                <p className="mt-2">kVA reduction = 533 - 421 = <strong>112 kVA (21%)</strong></p>
                <p className="mt-2 text-green-400">At £12/kVA/month = £1,344/month = £16,128/year saving</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Battery Sizing for Peak Shaving</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A building has maximum demand of 600 kW. You want to limit grid
                demand to 450 kW for a 3-hour peak period using battery storage. Size the system.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Peak reduction required = 600 - 450 = 150 kW</p>
                <p className="mt-2">Energy required = Power x Time = 150 kW x 3 h = 450 kWh</p>
                <p className="mt-2">Accounting for 85% depth of discharge:</p>
                <p>Battery capacity = 450 / 0.85 = <strong>529 kWh</strong></p>
                <p className="mt-2">Inverter rating = Peak power = <strong>150 kW minimum</strong></p>
                <p className="mt-2 text-white/60">→ Specify 530 kWh / 200 kW battery system</p>
                <p className="mt-2 text-green-400">At £15/kVA/month demand saving = £2,250/month = £27,000/year</p>
              </div>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Formulas</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Load Factor = Average Demand / Maximum Demand</strong></li>
                <li className="pl-1"><strong>kVA = kW / Power Factor</strong></li>
                <li className="pl-1"><strong>kVAr = kW x tan(cos⁻¹pf)</strong></li>
                <li className="pl-1"><strong>Battery kWh = Peak Reduction (kW) x Duration (h) / DoD</strong></li>
                <li className="pl-1"><strong>Annual Saving = MD Reduction x Rate x 12 months</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Integration period: typically <strong>30 minutes</strong></li>
                <li className="pl-1">Target power factor: <strong>0.95-0.98</strong></li>
                <li className="pl-1">Motor inrush: <strong>6-8x FLC</strong> (DOL starting)</li>
                <li className="pl-1">Soft starter inrush: <strong>2-3x FLC</strong></li>
                <li className="pl-1">Typical stagger delay: <strong>10-30 seconds</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Over-correcting pf:</strong> Leading power factor damages equipment</li>
                <li className="pl-1"><strong>Shedding critical loads:</strong> Life safety must be protected</li>
                <li className="pl-1"><strong>Ignoring rebound:</strong> Released loads can create new peak</li>
                <li className="pl-1"><strong>Inadequate monitoring:</strong> Cannot manage what you do not measure</li>
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

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Load Management Metrics</p>
                <ul className="space-y-0.5">
                  <li>Maximum Demand - Highest 30-min average power</li>
                  <li>Load Factor - Average/Maximum demand ratio</li>
                  <li>Diversity Factor - MD/Connected load ratio</li>
                  <li>Power Factor - kW/kVA ratio</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">DSM Strategies</p>
                <ul className="space-y-0.5">
                  <li>Peak clipping - Reduce peak directly</li>
                  <li>Load shifting - Move to off-peak periods</li>
                  <li>Valley filling - Increase off-peak use</li>
                  <li>Strategic conservation - Efficiency gains</li>
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
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section6-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Efficiency Calculations
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section6-4">
              Next: Motor and Lighting Design
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule3Section6_3;
