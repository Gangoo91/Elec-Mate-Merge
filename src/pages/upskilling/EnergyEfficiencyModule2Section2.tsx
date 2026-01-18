import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Analysing Loads and Demand Patterns - Energy Efficiency Module 2";
const DESCRIPTION = "Learn to analyse electrical load profiles, understand demand patterns, calculate load factors, and identify energy savings opportunities through effective load management.";

const quickCheckQuestions = [
  {
    id: "m2s2-qc1",
    question: "A factory has a maximum demand of 500kW and consumes 180,000 kWh per month. Assuming a 30-day month with 24 hours per day, what is the load factor?",
    options: ["25%", "50%", "75%", "100%"],
    correctIndex: 1,
    explanation: "Load Factor = (Actual Energy Used) / (Max Demand x Hours). 180,000 kWh / (500kW x 720 hours) = 180,000 / 360,000 = 0.50 or 50%. A 50% load factor indicates reasonable but improvable utilisation."
  },
  {
    id: "m2s2-qc2",
    question: "During which DUoS time band would running a large industrial process typically incur the highest distribution charges?",
    options: ["Green band (overnight)", "Amber band (shoulder periods)", "Red band (peak periods 4pm-7pm)", "All bands cost the same"],
    correctIndex: 2,
    explanation: "Red band periods (typically 4pm-7pm on weekdays) incur the highest DUoS charges as this is when the distribution network experiences maximum stress. Shifting loads to green band periods can significantly reduce costs."
  },
  {
    id: "m2s2-qc3",
    question: "A building has three separate loads with individual maximum demands of 20kW, 30kW, and 50kW. If the building's actual maximum demand is 80kW, what is the diversity factor?",
    options: ["0.80", "1.00", "1.25", "1.50"],
    correctIndex: 2,
    explanation: "Diversity Factor = Sum of Individual Max Demands / Actual Combined Max Demand = (20 + 30 + 50) / 80 = 100 / 80 = 1.25. A diversity factor greater than 1 indicates that not all loads peak simultaneously, which is typical in real installations."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the primary purpose of half-hourly (HH) metering in the UK?",
    options: ["To provide more accurate billing for domestic customers", "To enable time-of-use pricing and demand management for larger consumers", "To reduce the cost of electricity for all users", "To simplify the billing process for suppliers"],
    correctAnswer: 1,
    explanation: "Half-hourly metering enables time-of-use pricing and demand management for larger consumers, providing 48 data points per day for detailed load analysis."
  },
  {
    id: 2,
    question: "Which formula correctly calculates the load factor?",
    options: ["Maximum Demand / Average Demand x 100", "Average Demand / Maximum Demand x 100", "Total Energy / Connected Load x 100", "Peak Load / Base Load x 100"],
    correctAnswer: 1,
    explanation: "Load Factor = (Average Demand / Maximum Demand) x 100. This shows what percentage of your maximum capacity is being utilised on average."
  },
  {
    id: 3,
    question: "In a typical UK commercial building, when does the 'Triad' period usually occur?",
    options: ["Summer afternoons between 2pm-4pm", "Winter weekday evenings between 4pm-7pm", "Spring mornings between 8am-10am", "Weekend peak periods"],
    correctAnswer: 1,
    explanation: "Triad periods occur during winter weekday evenings (typically 4pm-7pm) when national demand is at its highest, usually on cold, dark days in November-February."
  },
  {
    id: 4,
    question: "What does a low load factor typically indicate?",
    options: ["Efficient and consistent energy usage", "High base load with minimal variation", "Peaky demand with poor capacity utilisation", "Optimal equipment sizing"],
    correctAnswer: 2,
    explanation: "A low load factor indicates peaky demand with poor capacity utilisation - the infrastructure is sized for peaks but underutilised most of the time."
  },
  {
    id: 5,
    question: "What is the typical duration of a DUoS red band period on weekdays?",
    options: ["24 hours", "4-5 hours during afternoon/evening peak", "8 hours during business hours", "12 hours from 6am to 6pm"],
    correctAnswer: 1,
    explanation: "DUoS red band periods typically last 4-5 hours during the afternoon/evening peak (around 4pm-7pm) when network stress is highest."
  },
  {
    id: 6,
    question: "Which type of load would typically contribute most to a building's base load?",
    options: ["Air conditioning during a heatwave", "IT server rooms and refrigeration", "Lighting in occupied offices", "Electric vehicle charging"],
    correctAnswer: 1,
    explanation: "IT server rooms and refrigeration run 24/7 regardless of occupancy, making them primary contributors to base load."
  },
  {
    id: 7,
    question: "How is maximum demand (kVA) typically measured for commercial tariffs?",
    options: ["Instantaneous peak reading", "Average of the highest three readings in a month", "Highest average demand in any 30-minute period", "Total monthly consumption divided by hours"],
    correctAnswer: 2,
    explanation: "Maximum demand is typically the highest average demand recorded in any 30-minute (half-hourly) period during the billing cycle."
  },
  {
    id: 8,
    question: "What is the benefit of improving power factor in relation to maximum demand charges?",
    options: ["It reduces the kWh consumption", "It reduces the kVA demand for the same kW load", "It eliminates the need for half-hourly metering", "It increases the diversity factor"],
    correctAnswer: 1,
    explanation: "Improving power factor reduces kVA demand for the same kW load, as kVA = kW / Power Factor. Better power factor means lower demand charges."
  },
  {
    id: 9,
    question: "Which strategy would most effectively reduce Triad charges?",
    options: ["Running all equipment at night", "Reducing load specifically during predicted Triad warning periods", "Increasing base load throughout the day", "Installing larger circuit breakers"],
    correctAnswer: 1,
    explanation: "Reducing load during predicted Triad warning periods is most effective, as Triad charges are based on demand during just three specific half-hours per year."
  },
  {
    id: 10,
    question: "What information does a load duration curve provide that a standard load profile does not?",
    options: ["The time of day when peaks occur", "The percentage of time demand exceeds various levels", "The power factor at each interval", "The cost of electricity at each period"],
    correctAnswer: 1,
    explanation: "A load duration curve shows the percentage of time demand exceeds various levels, useful for sizing generation and storage systems."
  }
];

const faqs = [
  {
    question: "What is the difference between kW and kVA in demand charges?",
    answer: "kW (kilowatts) measures real power - the actual power doing useful work. kVA (kilovolt-amperes) measures apparent power, which includes both real power and reactive power. Many UK commercial tariffs charge based on kVA because this reflects the total capacity required from the network. If your power factor is poor (below 1.0), your kVA will be higher than your kW, resulting in higher demand charges."
  },
  {
    question: "How do Triad charges work and how can they be avoided?",
    answer: "Triad charges are transmission network costs based on your demand during the three highest half-hour periods of national demand between November and February. These can be substantial - sometimes £40-50/kW/year. To reduce them, subscribe to Triad warning services, reduce non-essential loads when warnings are issued, or install on-site generation or battery storage for Triad periods."
  },
  {
    question: "What is a good load factor and how can it be improved?",
    answer: "A load factor above 70% is generally considered good. Typical values vary by sector: process industries often achieve 70-85%, commercial buildings 30-50%, and retail 25-40%. Improve load factor by spreading production across more hours, using thermal storage, scheduling high-demand processes off-peak, and staggering equipment start-up times."
  },
  {
    question: "How does half-hourly metering data help identify savings opportunities?",
    answer: "Half-hourly data reveals patterns invisible in monthly bills: unexpected overnight loads, demand spikes from poor motor starting, consumption during unoccupied periods, and gradual increases suggesting maintenance issues. Many businesses find 10-20% savings opportunities through HH data analysis."
  },
  {
    question: "What are DUoS bands and why do they matter?",
    answer: "Distribution Use of System (DUoS) charges vary by time band: Red (peak, typically 4pm-7pm weekdays) has the highest charges, Amber (shoulder periods) is moderate, and Green (overnight and weekends) is lowest. The ratio between red and green rates can be 10:1 or more, making load shifting highly valuable."
  }
];

const EnergyEfficiencyModule2Section2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/energy-efficiency-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        {/* Centered Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 2 Section 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Analysing Loads and Demand Patterns
          </h1>
          <p className="text-white/80">
            Master load profiling techniques to identify energy savings and optimise electricity costs
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Load Factor:</strong> Average demand / Maximum demand</li>
              <li><strong>Good Target:</strong> Above 70% utilisation</li>
              <li><strong>Triads:</strong> Three peak half-hours Nov-Feb</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> High overnight base load, demand spikes</li>
              <li><strong>Use:</strong> Load shifting, Triad avoidance, staggered starts</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Interpret load profiles and demand curves",
              "Calculate load factor and diversity factor",
              "Understand UK DUoS bands and Triad charges",
              "Identify base load vs peak demand",
              "Analyse half-hourly metering data",
              "Develop demand management strategies"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Understanding Load Profiles
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A load profile is a graphical representation of electrical demand over time, typically showing kW or kVA on the vertical axis and time on the horizontal axis. These profiles reveal consumption patterns essential for energy management and cost optimisation.
            </p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Types of Load Profiles:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Daily Load Profile:</strong> Shows 24-hour demand pattern, revealing peak times, base load, and consumption during occupied vs unoccupied periods</li>
                <li><strong>Weekly Load Profile:</strong> Reveals weekday vs weekend patterns, helping identify unnecessary weekend consumption</li>
                <li><strong>Annual Load Profile:</strong> Shows seasonal variations driven by heating, cooling, and lighting demands</li>
                <li><strong>Load Duration Curve:</strong> Ranks demand from highest to lowest, showing percentage of time at each level</li>
              </ul>
            </div>
            <p>
              Sites with maximum demand above 100kW are required to have half-hourly (HH) metering in the UK. This provides 48 data points per day, enabling detailed load analysis. From 2024-2025, smart meter rollout is extending half-hourly settlement to smaller consumers.
            </p>
          </div>
        </section>

        {/* Section 02 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Base Load vs Peak Demand
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding the difference between base load and peak demand is fundamental to effective energy management and identifies different types of saving opportunities.
            </p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Base Load Components (24/7 regardless of occupancy):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Server rooms and IT infrastructure</li>
                <li>Refrigeration and cold storage</li>
                <li>Security systems and emergency lighting</li>
                <li>Continuous ventilation (e.g., car parks)</li>
                <li>Building management systems</li>
              </ul>
            </div>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Peak Demand Contributors:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>HVAC systems at full capacity</li>
                <li>Lighting in fully occupied spaces</li>
                <li>Production equipment during shifts</li>
                <li>Catering equipment at meal times</li>
                <li>Motor starting currents</li>
              </ul>
            </div>
            <p>
              Excessive base load often indicates significant waste. Compare overnight/weekend demand to expected essential loads. A typical commercial building should see overnight demand drop to 20-30% of peak. If it remains above 50%, investigate for equipment left running unnecessarily.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Load Factor and Diversity Factor
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              These key metrics help assess the efficiency of electrical installations and inform decisions about capacity, tariffs, and demand management strategies.
            </p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Load Factor Calculation:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Formula:</strong> Load Factor = (Average Demand / Maximum Demand) x 100%</li>
                <li><strong>Below 40%:</strong> Poor - highly variable demand, poor utilisation</li>
                <li><strong>40-70%:</strong> Moderate - typical for commercial buildings</li>
                <li><strong>Above 70%:</strong> Good - consistent demand, efficient operation</li>
              </ul>
            </div>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Diversity Factor Calculation:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Formula:</strong> Diversity Factor = Sum of Individual Max Demands / Actual Combined Max Demand</li>
                <li>A diversity factor greater than 1.0 indicates loads do not peak simultaneously</li>
                <li>Example: Three loads (50kW + 75kW + 100kW = 225kW total) with combined max of 180kW gives diversity factor of 1.25</li>
              </ul>
            </div>
            <p>
              A higher load factor generally means lower unit costs (as fixed charges are spread over more kWh) and may enable negotiation of better supply contracts. Improving load factor from 40% to 60% can reduce effective unit costs by 10-15%.
            </p>
          </div>
        </section>

        {/* Section 04 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            UK DUoS Time Bands
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Distribution Use of System (DUoS) charges vary significantly by time band. Understanding these is essential for optimising tariff selection and scheduling flexible loads.
            </p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">DUoS Time Bands (typical - varies by DNO region):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Red Band (Peak):</strong> Typically 16:00-19:00 weekdays - highest cost when network stress is greatest</li>
                <li><strong>Amber Band (Shoulder):</strong> Daytime hours outside peak (e.g., 07:00-16:00 and 19:00-23:00) - moderate cost</li>
                <li><strong>Green Band (Off-Peak):</strong> Overnight (23:00-07:00) and weekends - lowest cost with spare capacity</li>
              </ul>
            </div>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Seasonal Patterns:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Winter (Nov-Feb):</strong> Higher heating loads, extended lighting hours, Triad exposure period</li>
                <li><strong>Summer (May-Aug):</strong> Higher cooling loads, reduced lighting demand, generally lower overall demand in UK climate</li>
              </ul>
            </div>
            <p>
              The ratio between red and green rates can be 10:1 or more. For a business with flexible loads, shifting consumption from red to green periods can reduce DUoS costs by 50% or more.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Maximum Demand Charges
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              For larger electricity consumers, maximum demand (MD) charges can represent 20-40% of the total electricity bill. Understanding these charges is crucial for cost management.
            </p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Types of Demand Charges:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Supply Capacity Charges (£/kVA/month):</strong> Based on your Agreed Supply Capacity with the DNO</li>
                <li><strong>Maximum Demand Charges (£/kVA):</strong> Based on your highest half-hourly average demand in the billing period</li>
                <li><strong>Triad Charges (£/kW/year):</strong> Based on demand during three peak national demand half-hours (Nov-Feb), typically £40-50/kW</li>
              </ul>
            </div>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Impact of Demand Spikes:</p>
              <p className="text-sm text-white">A single 30-minute spike can set your maximum demand for the entire month. For example, if three large motors start simultaneously and spike demand from 400kVA to 600kVA, at £5/kVA/month that 30-minute spike costs an extra £1,000 that month.</p>
            </div>
            <p>
              Many tariffs include charges for excessive reactive power (poor power factor). If your power factor falls below 0.95, you may face additional charges or your kVA demand will be inflated.
            </p>
          </div>
        </section>

        {/* Section 06 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Load Analysis for Savings
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Systematic load analysis reveals multiple categories of savings opportunities, from quick wins to strategic investments.
            </p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Analysis Techniques:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Out-of-Hours Analysis:</strong> Compare night/weekend demand to expected essential loads - typically 10-25% of consumption is avoidable</li>
                <li><strong>Peak Demand Analysis:</strong> Identify coincident equipment operation that could be staggered - 15-30% peak reduction possible</li>
                <li><strong>Load Shifting Opportunities:</strong> Identify flexible loads that could move from red to green band - 20-50% DUoS cost reduction</li>
                <li><strong>Anomaly Detection:</strong> Look for step changes in base load, consumption not correlating with occupancy, or gradual drift upward</li>
              </ul>
            </div>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Demand Management Strategies:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Immediate Actions:</strong> Stagger motor start times, schedule high-load processes off-peak, implement time controls</li>
                <li><strong>Investment Options:</strong> Power factor correction, BEMS upgrades, thermal energy storage, battery storage for peak shaving</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Conducting Load Analysis</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Obtain at least 12 months of half-hourly data to capture seasonal variations</li>
                <li>Compare weekday vs weekend profiles to identify unnecessary out-of-hours consumption</li>
                <li>Benchmark load factor against similar organisations in the sector</li>
                <li>Correlate demand with occupancy, production output, and weather data</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Advising Clients</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Quantify potential savings in £ per year to build the business case</li>
                <li>Prioritise quick wins with payback under 2 years</li>
                <li>Consider Triad warning services for sites with flexible loads</li>
                <li>Check power factor before recommending supply capacity increases</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Ignoring power factor</strong> - it significantly affects kVA demand charges</li>
                <li><strong>Not checking DUoS bands</strong> - time-of-use savings can be substantial</li>
                <li><strong>Oversizing supplies</strong> - pay for capacity you don't use</li>
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
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent border border-white/10">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Key Formulas</p>
                <ul className="space-y-0.5">
                  <li>Load Factor = Avg Demand / Max Demand</li>
                  <li>Diversity Factor = Sum Individual / Combined Max</li>
                  <li>kVA = kW / Power Factor</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Target Values</p>
                <ul className="space-y-0.5">
                  <li>Good Load Factor: &gt;70%</li>
                  <li>Target Power Factor: &gt;0.95</li>
                  <li>Night vs Day Demand: &lt;30%</li>
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

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EnergyEfficiencyModule2Section2;
