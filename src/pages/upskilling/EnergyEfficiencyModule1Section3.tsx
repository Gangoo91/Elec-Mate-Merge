import { ArrowLeft, Zap, CheckCircle, AlertTriangle, Lightbulb, Power, Settings, Cable, Users, TrendingDown, Wrench, Gauge } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Identifying Waste in Electrical Systems - Energy Efficiency Course";
const DESCRIPTION = "Learn to identify common sources of electrical energy waste including standby power, motor inefficiencies, poor power factor, oversized equipment, and distribution losses.";

const quickCheckQuestions = [
  {
    id: "m1s3-check1",
    question: "What percentage of a typical commercial building's electricity consumption can be attributed to standby power and unnecessary operation?",
    options: ["1-2%", "5-15%", "25-30%", "Less than 0.5%"],
    correctIndex: 1,
    explanation: "Standby power and unnecessary operation typically account for 5-15% of commercial electricity consumption. This represents a significant 'easy win' for energy savings with minimal capital investment."
  },
  {
    id: "m1s3-check2",
    question: "A motor operating at 40% of its rated load will typically have what efficiency compared to its full-load efficiency?",
    options: ["About the same efficiency", "Significantly lower efficiency (10-15% reduction)", "Higher efficiency due to less stress", "Cannot be determined without more data"],
    correctIndex: 1,
    explanation: "Motors operating at partial loads (especially below 50%) experience significant efficiency drops of 10-15% or more. This is because the fixed losses (iron losses, friction) remain constant while useful output decreases."
  },
  {
    id: "m1s3-check3",
    question: "What is the approximate I squared R power loss increase when cable current doubles?",
    options: ["Losses double (2x)", "Losses quadruple (4x)", "Losses increase by 50%", "Losses remain the same"],
    correctIndex: 1,
    explanation: "Power loss in cables follows the I squared R formula. When current doubles, the losses increase by the square of 2, meaning they quadruple (4x). This is why correct cable sizing is critical for efficiency."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is 'vampire power' or 'phantom load' in electrical systems?",
    options: ["Power consumed during peak demand periods", "Electricity drawn by devices when switched off but still plugged in", "Power lost due to cable resistance", "Energy used by emergency lighting"],
    correctAnswer: 1,
    explanation: "Vampire power refers to electricity drawn by devices when they are switched off but still plugged in, such as standby mode consumption."
  },
  {
    id: 2,
    question: "Which type of lighting typically wastes the most energy as heat?",
    options: ["LED lighting", "Fluorescent tubes", "Incandescent lamps", "Metal halide lamps"],
    correctAnswer: 2,
    explanation: "Incandescent lamps convert approximately 90% of their energy input into heat rather than light, making them the least efficient lighting option."
  },
  {
    id: 3,
    question: "A power factor of 0.7 means the installation is drawing approximately what percentage more current than necessary?",
    options: ["30% more", "43% more", "70% more", "7% more"],
    correctAnswer: 1,
    explanation: "At power factor 0.7, current is 1/0.7 = 1.43 times what it would be at unity power factor, meaning 43% more current is drawn."
  },
  {
    id: 4,
    question: "What is the most common cause of motor inefficiency in industrial settings?",
    options: ["Motor age", "Oversizing (operating below rated capacity)", "Incorrect supply voltage", "Bearing wear"],
    correctAnswer: 1,
    explanation: "Oversizing motors is the most common cause of inefficiency. Motors operating significantly below their rated capacity have poor efficiency and power factor."
  },
  {
    id: 5,
    question: "When considering distribution losses, which action has the greatest impact on reducing I squared R losses?",
    options: ["Reducing cable temperature", "Using copper instead of aluminium", "Reducing the current by increasing voltage", "Shortening cable runs"],
    correctAnswer: 2,
    explanation: "Since losses are proportional to current squared, reducing current has the greatest impact. Increasing voltage for the same power reduces current proportionally."
  },
  {
    id: 6,
    question: "What percentage of energy can be saved by replacing DOL motor starters with VSDs for variable load applications?",
    options: ["5-10%", "10-20%", "20-50%", "50-70%"],
    correctAnswer: 2,
    explanation: "VSDs can save 20-50% energy on variable load applications like fans and pumps by matching motor speed to actual demand rather than running at full speed."
  },
  {
    id: 7,
    question: "Which of the following is an example of behavioural waste in electrical systems?",
    options: ["Poor power factor", "Lights left on in unoccupied areas", "Undersized cables", "Motor bearing friction"],
    correctAnswer: 1,
    explanation: "Lights left on in unoccupied areas is a behavioural waste issue that can be addressed through awareness training and automatic controls."
  },
  {
    id: 8,
    question: "What is the typical standby power consumption of a modern office computer system?",
    options: ["1-5W", "5-15W", "20-50W", "Over 100W"],
    correctAnswer: 1,
    explanation: "Modern office computer systems typically consume 5-15W in standby mode, though this varies by age and configuration."
  },
  {
    id: 9,
    question: "Poor power factor primarily results in increased:",
    options: ["Active power consumption", "Cable losses and capacity requirements", "Equipment wear", "Harmonic distortion"],
    correctAnswer: 1,
    explanation: "Poor power factor increases the current drawn for the same real power, resulting in higher cable losses and requiring larger capacity infrastructure."
  },
  {
    id: 10,
    question: "What is the recommended minimum loading for a standard induction motor to maintain good efficiency?",
    options: ["25% of rated load", "50% of rated load", "75% of rated load", "100% of rated load"],
    correctAnswer: 1,
    explanation: "Motors should ideally operate at 50% or more of their rated load to maintain reasonable efficiency. Below this, efficiency drops significantly."
  }
];

const faqs = [
  {
    question: "How can I quickly identify the biggest sources of waste in an electrical installation?",
    answer: "Start with an energy audit focusing on: 1) Equipment operating hours vs. actual need, 2) Motor loading levels using clamp meters, 3) Power factor at the main incomer, 4) Lighting in unoccupied areas, 5) Equipment running during non-production hours. Sub-metering key circuits provides valuable data for targeting improvements."
  },
  {
    question: "Is it worth replacing a working motor with a more efficient model?",
    answer: "It depends on running hours and loading. For motors running over 4,000 hours/year at good loading (>50%), upgrading to IE3 or IE4 efficiency class can pay back in 2-4 years. For intermittent or lightly loaded motors, focus on right-sizing first. Always calculate total cost of ownership including energy costs."
  },
  {
    question: "What is the quickest way to improve power factor?",
    answer: "Installing power factor correction capacitors at the main distribution board is the quickest fix. Automatic PFC units monitor and adjust capacitance to maintain target power factor (typically 0.95-0.98). Payback is often under 2 years through reduced maximum demand charges and lower distribution losses."
  },
  {
    question: "How much energy do VSDs (Variable Speed Drives) actually save?",
    answer: "For fan and pump applications following the affinity laws, reducing speed by 20% reduces power consumption by approximately 50%. Typical savings range from 20-50% depending on the application. VSDs also provide soft starting, reducing mechanical stress and peak demand charges."
  },
  {
    question: "Should cables always be oversized for efficiency?",
    answer: "While larger cables reduce I squared R losses, there is an economic optimum. BS 7671 provides minimum sizes for safety, but the IET guidance on energy efficiency recommends economic cable sizing that balances capital cost against lifetime energy losses. For long runs or high utilisation, oversizing by one or two sizes is often justified."
  },
  {
    question: "How can behavioural waste be addressed effectively?",
    answer: "Combine awareness training with technology: automatic controls (PIR sensors, timers, BMS), visual feedback (energy dashboards), clear responsibilities (switch-off procedures), and regular monitoring. Culture change requires sustained effort - quick wins help build momentum and demonstrate value."
  }
];

const EnergyEfficiencyModule1Section3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
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
        <div className="max-w-3xl mx-auto">
          {/* Centered Title Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <Zap className="h-4 w-4" />
              <span>Module 1 Section 3</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
              Identifying Waste in Electrical Systems
            </h1>
            <p className="text-white/80">
              Recognising common sources of energy waste and inefficiency
            </p>
          </header>

          {/* Quick Summary Boxes */}
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
              <ul className="text-sm text-white space-y-1">
                <li><strong>Standby:</strong> 5-15% of consumption</li>
                <li><strong>Motors:</strong> 10-30% losses if oversized</li>
                <li><strong>Power Factor:</strong> 20-40% excess current</li>
                <li><strong>Cables:</strong> Losses proportional to I squared</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
              <ul className="text-sm text-white space-y-1">
                <li><strong>Spot:</strong> Equipment running overnight/weekends</li>
                <li><strong>Spot:</strong> Motors at less than 50% load</li>
                <li><strong>Use:</strong> Sub-metering for baseline data</li>
                <li><strong>Use:</strong> Clamp meters for motor loading</li>
              </ul>
            </div>
          </div>

          {/* Learning Outcomes */}
          <section className="mb-12">
            <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
            <div className="grid sm:grid-cols-2 gap-2">
              {[
                "Identify common sources of standby power and unnecessary operation",
                "Recognise motor and drive inefficiencies and their causes",
                "Understand power factor and its impact on system efficiency",
                "Evaluate equipment sizing and loading issues",
                "Calculate distribution losses and assess cable sizing",
                "Address behavioural waste and management issues"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-white">
                  <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          <hr className="border-white/5 mb-12" />

          {/* Section 01: Common Sources of Electrical Waste */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Common Sources of Electrical Waste
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>Electrical waste falls into two main categories: technical losses inherent in equipment and systems, and operational waste from poor management or behaviour. Understanding these categories helps prioritise improvement efforts.</p>

              <div className="my-6">
                <p className="text-sm font-medium text-white mb-2 flex items-center gap-2"><Power className="h-4 w-4 text-elec-yellow" /> Standby Power (Vampire Loads):</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Equipment in standby mode: 5-15W typical</li>
                  <li>Phone chargers left plugged in: 0.5-1W</li>
                  <li>Vending machines: 50-100W constant</li>
                  <li>IT equipment on but idle: 30-80W</li>
                  <li>Total impact: 5-15% of building load</li>
                </ul>
              </div>

              <div className="my-6">
                <p className="text-sm font-medium text-white mb-2 flex items-center gap-2"><Lightbulb className="h-4 w-4 text-elec-yellow" /> Inefficient Lighting:</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Incandescent: 90% energy as heat</li>
                  <li>Halogen: 85% energy as heat</li>
                  <li>Fluorescent T8: 75% as light</li>
                  <li>LED: 80-90% as light</li>
                  <li>Over-illumination: 20-50% waste</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-elec-yellow text-sm font-medium mb-2">Easy Wins: Standby and Lighting</p>
                <p className="text-sm text-white mb-2">These represent the lowest-hanging fruit for energy savings:</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Install switched socket strips for office equipment clusters</li>
                  <li>Use 7-day timers on vending machines (save 35-50%)</li>
                  <li>Replace incandescent with LED (80-90% saving)</li>
                  <li>Install occupancy sensors in intermittently used areas</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[0]} />

          {/* Section 02: Motor and Drive Inefficiencies */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Motor and Drive Inefficiencies
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>Electric motors account for approximately 65-70% of industrial electricity consumption. Even small efficiency improvements translate to significant savings. Key sources of motor inefficiency include:</p>

              <div className="my-6 space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow flex items-center justify-center font-bold text-sm">1</div>
                  <div>
                    <p className="text-white font-medium">Motor Efficiency Class</p>
                    <p className="text-white text-sm mt-1">Old standard efficiency motors (IE1) waste 3-5% more energy than IE3/IE4 premium efficiency motors. For a 30kW motor running 4,000 hours/year, this represents 3,600-6,000 kWh annually.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow flex items-center justify-center font-bold text-sm">2</div>
                  <div>
                    <p className="text-white font-medium">Part-Load Operation</p>
                    <p className="text-white text-sm mt-1">Motors are most efficient at 75-100% of rated load. At 50% load, efficiency drops by 5-10%. Below 40% load, efficiency can drop by 10-20% or more.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow flex items-center justify-center font-bold text-sm">3</div>
                  <div>
                    <p className="text-white font-medium">Fixed Speed vs Variable Speed</p>
                    <p className="text-white text-sm mt-1">Fan and pump applications following the affinity laws can save 20-50% with VSDs. Throttling valves and dampers waste energy as pressure drops.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow flex items-center justify-center font-bold text-sm">4</div>
                  <div>
                    <p className="text-white font-medium">Mechanical Losses</p>
                    <p className="text-white text-sm mt-1">Belt drives waste 3-5% compared to direct drives. Worn bearings, misalignment, and poor lubrication add further losses and reduce motor lifespan.</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-elec-yellow text-sm font-medium mb-2">The Affinity Laws</p>
                <p className="text-white text-sm mb-2">For centrifugal fans and pumps:</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Flow is proportional to speed (reduce speed 20% = 20% less flow)</li>
                  <li>Pressure is proportional to speed squared</li>
                  <li>Power is proportional to speed cubed (reduce speed 20% = ~50% less power)</li>
                </ul>
              </div>

              <div className="overflow-x-auto mt-4">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-3 px-2 text-white font-semibold">Motor Loading</th>
                      <th className="text-center py-3 px-2 text-white font-semibold">Typical Efficiency</th>
                      <th className="text-center py-3 px-2 text-white font-semibold">Power Factor</th>
                    </tr>
                  </thead>
                  <tbody className="text-white">
                    <tr className="border-b border-white/10"><td className="py-3 px-2">100% load</td><td className="text-center py-3 px-2">92-95%</td><td className="text-center py-3 px-2">0.85-0.90</td></tr>
                    <tr className="border-b border-white/10"><td className="py-3 px-2">75% load</td><td className="text-center py-3 px-2">91-94%</td><td className="text-center py-3 px-2">0.80-0.85</td></tr>
                    <tr className="border-b border-white/10"><td className="py-3 px-2">50% load</td><td className="text-center py-3 px-2">85-90%</td><td className="text-center py-3 px-2">0.70-0.78</td></tr>
                    <tr><td className="py-3 px-2">25% load</td><td className="text-center py-3 px-2">70-80%</td><td className="text-center py-3 px-2">0.50-0.60</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[1]} />

          {/* Section 03: Poor Power Factor and Reactive Power */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Poor Power Factor and Reactive Power
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>Power factor represents the ratio of real power (kW) doing useful work to apparent power (kVA) supplied. A poor power factor means the installation draws more current than necessary to perform the same work.</p>

              <div className="my-6">
                <p className="text-sm font-medium text-white mb-2 flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-elec-yellow" /> Impact of Poor Power Factor:</p>
                <div className="grid sm:grid-cols-2 gap-4 text-sm text-white">
                  <ul className="space-y-1">
                    <li>Increased current flow for same kW</li>
                    <li>Higher I squared R losses in cables</li>
                    <li>Reduced transformer/cable capacity</li>
                    <li>Reactive power charges from DNO</li>
                  </ul>
                  <ul className="space-y-1">
                    <li>Increased voltage drop</li>
                    <li>Larger switchgear requirements</li>
                    <li>Higher maximum demand charges</li>
                    <li>Potential supply capacity issues</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-elec-yellow text-sm font-medium mb-2">Calculating Current Increase</p>
                <p className="text-white text-sm mb-2">Current is inversely proportional to power factor. For a load requiring 100kW:</p>
                <ul className="text-sm text-white space-y-1">
                  <li>At PF 1.0: Current = 100kW / (400V x 1.73 x 1.0) = 144A</li>
                  <li>At PF 0.7: Current = 100kW / (400V x 1.73 x 0.7) = 206A (43% more)</li>
                  <li>At PF 0.8: Current = 100kW / (400V x 1.73 x 0.8) = 180A (25% more)</li>
                </ul>
              </div>

              <div className="my-6">
                <p className="text-sm font-medium text-white mb-2">Common Causes and Correction Methods:</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-elec-yellow text-sm font-medium mb-1">Common Causes:</p>
                    <ul className="text-sm text-white space-y-1">
                      <li>Lightly loaded induction motors</li>
                      <li>Fluorescent/discharge lighting</li>
                      <li>Welding equipment</li>
                      <li>Induction and arc furnaces</li>
                      <li>Old magnetic ballasts</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-elec-yellow text-sm font-medium mb-1">Correction Methods:</p>
                    <ul className="text-sm text-white space-y-1">
                      <li>Power factor correction capacitors</li>
                      <li>Automatic PFC equipment</li>
                      <li>Synchronous condensers</li>
                      <li>Active power filters</li>
                      <li>Right-sizing motors</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 04: Oversized or Underloaded Equipment */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Oversized or Underloaded Equipment
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>Equipment oversizing is common due to safety margins added at each design stage. While ensuring reliability, excessive oversizing creates ongoing efficiency penalties through poor part-load performance.</p>

              <div className="my-6">
                <p className="text-sm font-medium text-white mb-2">Why Oversizing Occurs:</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Client adds 20% safety margin to requirements</li>
                  <li>Consultant adds 15% for future expansion</li>
                  <li>Contractor rounds up to next standard size</li>
                  <li>Result: Equipment running at 40-50% capacity</li>
                </ul>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 my-6">
                <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                  <p className="text-elec-yellow text-sm font-medium mb-2 flex items-center gap-2"><Settings className="h-4 w-4" /> Motors</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Fixed losses remain constant</li>
                    <li>Efficiency drops significantly at low loads</li>
                    <li>Power factor deteriorates</li>
                    <li>Higher capital and running costs</li>
                  </ul>
                  <p className="text-white text-sm mt-2">Studies show 30-40% of industrial motors are oversized by more than 20%.</p>
                </div>
                <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                  <p className="text-elec-yellow text-sm font-medium mb-2 flex items-center gap-2"><Gauge className="h-4 w-4" /> Transformers</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Iron losses constant regardless of load</li>
                    <li>Maximum efficiency at 50-70% loading</li>
                    <li>Very light loads waste iron losses</li>
                    <li>Consider de-energising paralleled units</li>
                  </ul>
                  <p className="text-white text-sm mt-2">A 1000kVA transformer at 20% load wastes more energy on iron losses than a correctly sized 315kVA unit.</p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-elec-yellow text-sm font-medium mb-2">Identification Methods</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Compare nameplate rating to measured current draw</li>
                  <li>Use data logging to capture load profiles over operating cycles</li>
                  <li>Check motor current with clamp meter (I/In ratio)</li>
                  <li>Review original design calculations vs actual requirements</li>
                  <li>Identify equipment that cycles on/off frequently (oversized)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 05: Distribution Losses and Cable Sizing */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Distribution Losses and Cable Sizing
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>Cables dissipate energy as heat due to their resistance. These I squared R losses are often overlooked but can be significant, particularly for long cable runs, high currents, or cables operating near their rated capacity.</p>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 my-6">
                <p className="text-elec-yellow text-sm font-medium mb-2 flex items-center gap-2"><Cable className="h-4 w-4" /> The I squared R Loss Formula</p>
                <p className="text-white text-lg font-mono mb-2">P(loss) = I squared x R (watts)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Power loss increases with the SQUARE of current</li>
                  <li>Double the current = 4x the losses</li>
                  <li>Reducing current by 10% reduces losses by 19%</li>
                </ul>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 my-6">
                <div>
                  <p className="text-sm font-medium text-white mb-2">Factors Affecting Cable Losses:</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Cable cross-sectional area (larger = lower R)</li>
                    <li>Cable length (longer = higher R)</li>
                    <li>Conductor material (Cu vs Al)</li>
                    <li>Operating temperature (hotter = higher R)</li>
                    <li>Current magnitude (I squared)</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-2">Example Calculation:</p>
                  <p className="text-sm text-white mb-2">100m of 16mm squared copper cable carrying 60A:</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Resistance: 0.115 ohms/100m</li>
                    <li>Loss per phase: 60 squared x 0.115 = 414W</li>
                    <li>Three-phase loss: 1,242W</li>
                    <li>Annual: 10,890 kWh at 8,760 hours</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-elec-yellow text-sm font-medium mb-2">Economic Cable Sizing</p>
                <p className="text-white text-sm mb-2">BS 7671 provides minimum sizes for safety. IET guidance recommends considering lifetime energy costs:</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Calculate annual losses at expected loading</li>
                  <li>Compare incremental cable cost vs energy savings</li>
                  <li>Typically justified to upsize by 1-2 sizes for heavily loaded cables</li>
                  <li>Most beneficial for long runs and high utilisation</li>
                </ul>
              </div>

              <div className="overflow-x-auto mt-4">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-3 px-2 text-white font-semibold">Cable Size</th>
                      <th className="text-center py-3 px-2 text-white font-semibold">Resistance (ohm/km)</th>
                      <th className="text-center py-3 px-2 text-white font-semibold">Loss Reduction vs Smaller</th>
                    </tr>
                  </thead>
                  <tbody className="text-white">
                    <tr className="border-b border-white/10"><td className="py-3 px-2">10mm squared Cu</td><td className="text-center py-3 px-2">1.83</td><td className="text-center py-3 px-2">-</td></tr>
                    <tr className="border-b border-white/10"><td className="py-3 px-2">16mm squared Cu</td><td className="text-center py-3 px-2">1.15</td><td className="text-center py-3 px-2">37% less</td></tr>
                    <tr className="border-b border-white/10"><td className="py-3 px-2">25mm squared Cu</td><td className="text-center py-3 px-2">0.727</td><td className="text-center py-3 px-2">37% less</td></tr>
                    <tr><td className="py-3 px-2">35mm squared Cu</td><td className="text-center py-3 px-2">0.524</td><td className="text-center py-3 px-2">28% less</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[2]} />

          {/* Section 06: Behavioural Waste and Management Issues */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Behavioural Waste and Management Issues
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>Technical solutions alone cannot address all energy waste. Human behaviour and management practices significantly impact energy consumption. Studies suggest behavioural factors account for 10-30% of potential savings.</p>

              <div className="grid sm:grid-cols-2 gap-4 my-6">
                <div>
                  <p className="text-sm font-medium text-white mb-2 flex items-center gap-2"><Users className="h-4 w-4 text-elec-yellow" /> Common Behavioural Waste:</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Lights left on in unoccupied areas</li>
                    <li>Equipment running outside working hours</li>
                    <li>Doors/windows open while HVAC operates</li>
                    <li>Personal heaters under desks</li>
                    <li>Computers left on overnight</li>
                    <li>Compressed air leaks unreported</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-2 flex items-center gap-2"><Settings className="h-4 w-4 text-elec-yellow" /> Management Issues:</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>No energy policy or targets</li>
                    <li>Lack of sub-metering data</li>
                    <li>No accountability for consumption</li>
                    <li>Deferred maintenance</li>
                    <li>Poor commissioning of controls</li>
                    <li>Override culture (BMS bypassed)</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-elec-yellow text-sm font-medium mb-2">Addressing Behavioural Waste</p>
                <div className="grid sm:grid-cols-2 gap-4 text-sm text-white">
                  <div>
                    <p className="font-medium mb-1">Technical Controls:</p>
                    <ul className="space-y-1">
                      <li>PIR/occupancy sensors for lighting</li>
                      <li>Timer controls on equipment</li>
                      <li>BMS scheduling and optimisation</li>
                      <li>Automatic power-down settings</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Cultural Approaches:</p>
                    <ul className="space-y-1">
                      <li>Energy awareness training</li>
                      <li>Visual feedback (dashboards)</li>
                      <li>Clear switch-off procedures</li>
                      <li>Energy champions programme</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mt-4">
                <p className="text-elec-yellow text-sm font-medium mb-2">The 10% Behaviour Bonus</p>
                <p className="text-white text-sm">Research consistently shows that awareness campaigns combined with feedback can achieve 5-15% savings with minimal capital investment. Key success factors: visible data, clear targets, recognition, and sustained management commitment.</p>
              </div>
            </div>
          </section>

          {/* Practical Guidance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Conducting an Energy Audit</h3>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Start with sub-metering to establish baselines</li>
                  <li>Walk the site during both occupied and unoccupied periods</li>
                  <li>Use clamp meters to check motor loading</li>
                  <li>Check power factor at main incomer</li>
                  <li>Compare overnight/weekend loads to expected essential loads</li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Quick Win Opportunities</h3>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>LED lighting upgrades with controls: 60-80% savings</li>
                  <li>Power factor correction: 1-2 year payback</li>
                  <li>VSD retrofits on fans and pumps: 20-50% savings</li>
                  <li>Timer controls on equipment: minimal cost, immediate benefit</li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li><strong>Focusing only on technical fixes</strong> - behavioural change is often cheaper and faster</li>
                  <li><strong>Oversizing replacement equipment</strong> - right-size based on actual measured load</li>
                  <li><strong>Ignoring power factor</strong> - affects both efficiency and costs</li>
                  <li><strong>Not monitoring after improvements</strong> - verify savings are achieved and sustained</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Quick Reference Card */}
          <section className="mb-10">
            <div className="p-5 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h3 className="text-sm font-medium text-white mb-4 flex items-center gap-2"><Wrench className="h-4 w-4 text-elec-yellow" /> Quick Reference: Identifying Electrical Waste</h3>
              <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
                <div>
                  <p className="font-medium text-elec-yellow mb-1">Standby and Lighting</p>
                  <ul className="space-y-0.5">
                    <li>Standby: 5-15% of total load</li>
                    <li>LED vs incandescent: 80-90% saving</li>
                    <li>Occupancy sensors: 30-50% saving</li>
                    <li>Quick payback, low risk</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-elec-yellow mb-1">Motors and Drives</p>
                  <ul className="space-y-0.5">
                    <li>VSD savings: 20-50% on fans/pumps</li>
                    <li>Optimal loading: 75-100%</li>
                    <li>Part-load penalty: 10-20% loss</li>
                    <li>Right-size on replacement</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-elec-yellow mb-1">Power Factor</p>
                  <ul className="space-y-0.5">
                    <li>Target: 0.95-0.98</li>
                    <li>PF 0.7 = 43% excess current</li>
                    <li>Auto PFC: 1-2 year payback</li>
                    <li>Reduces MD charges</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-elec-yellow mb-1">Distribution Losses</p>
                  <ul className="space-y-0.5">
                    <li>Loss = I squared R (current squared)</li>
                    <li>Double current = 4x losses</li>
                    <li>Economic cable sizing justified</li>
                    <li>Long runs: upsize 1-2 sizes</li>
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
              <Link to="/study-centre/upskilling/energy-efficiency/module-1/section-2">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous Section
              </Link>
            </Button>
            <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
              <Link to="/study-centre/upskilling/energy-efficiency/module-1/section-4">
                Next Section
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default EnergyEfficiencyModule1Section3;
