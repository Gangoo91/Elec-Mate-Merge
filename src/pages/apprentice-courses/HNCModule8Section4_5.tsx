import { ArrowLeft, Zap, CheckCircle, TrendingDown, Calculator, Leaf, FileCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Energy Efficiency - HNC Module 8 Section 4.5";
const DESCRIPTION = "Master energy efficiency in motor systems: affinity laws for fans and pumps, energy savings calculations comparing fixed vs variable speed drives, payback analysis, NPV calculations, carbon savings and Part L compliance for motor systems.";

const quickCheckQuestions = [
  {
    id: "affinity-power-law",
    question: "According to the affinity laws, if fan speed is reduced to 80% of full speed, what percentage of original power is consumed?",
    options: ["80%", "64%", "51.2%", "40%"],
    correctIndex: 2,
    explanation: "Power varies with the cube of speed. At 80% speed: Power = 0.8³ = 0.512 = 51.2% of original power. This cubic relationship is why VSDs offer such significant energy savings on variable flow applications."
  },
  {
    id: "simple-payback",
    question: "A VSD installation costs £4,500 and saves £1,800 per year in energy costs. What is the simple payback period?",
    options: ["1.5 years", "2.0 years", "2.5 years", "3.0 years"],
    correctIndex: 2,
    explanation: "Simple Payback = Capital Cost / Annual Savings = £4,500 / £1,800 = 2.5 years. Projects with payback periods under 3 years are generally considered attractive investments."
  },
  {
    id: "carbon-factor",
    question: "Using a UK grid carbon factor of 0.233 kgCO₂/kWh, what annual carbon saving results from 15,000 kWh energy reduction?",
    options: ["2,495 kgCO₂", "3,495 kgCO₂", "4,495 kgCO₂", "5,495 kgCO₂"],
    correctIndex: 1,
    explanation: "Carbon Saving = Energy Saved × Carbon Factor = 15,000 kWh × 0.233 kgCO₂/kWh = 3,495 kgCO₂ (3.5 tonnes CO₂ per year). This demonstrates the environmental benefit of VSD installations."
  },
  {
    id: "part-l-motors",
    question: "Under Part L of the Building Regulations, what is the minimum motor efficiency class required for new installations?",
    options: ["IE1 Standard", "IE2 High", "IE3 Premium", "IE4 Super Premium"],
    correctIndex: 2,
    explanation: "Part L requires IE3 Premium efficiency motors as minimum for new installations since 2017. IE4 Super Premium motors are increasingly specified for applications with long running hours to maximise energy savings."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The affinity laws state that flow rate (Q) varies with which relationship to speed (N)?",
    options: ["Q ∝ N (directly proportional)", "Q ∝ N² (square law)", "Q ∝ N³ (cube law)", "Q ∝ √N (square root)"],
    correctAnswer: 0,
    explanation: "Flow rate is directly proportional to speed: Q₂/Q₁ = N₂/N₁. Doubling the speed doubles the flow rate. This linear relationship contrasts with the cubic relationship for power."
  },
  {
    id: 2,
    question: "A centrifugal pump operates at 2900 rpm delivering 50 m³/h. If speed is reduced to 2175 rpm, what is the new flow rate?",
    options: ["25.0 m³/h", "37.5 m³/h", "42.2 m³/h", "66.7 m³/h"],
    correctAnswer: 1,
    explanation: "Using Q₂/Q₁ = N₂/N₁: Q₂ = 50 × (2175/2900) = 50 × 0.75 = 37.5 m³/h. The flow reduces linearly with speed."
  },
  {
    id: 3,
    question: "According to the affinity laws, pressure (head) varies with which relationship to speed?",
    options: ["H ∝ N (directly proportional)", "H ∝ N² (square law)", "H ∝ N³ (cube law)", "H ∝ N⁰·⁵ (square root)"],
    correctAnswer: 1,
    explanation: "Pressure (head) varies with the square of speed: H₂/H₁ = (N₂/N₁)². If speed halves, pressure reduces to one quarter. This is why VSDs must be carefully applied to maintain minimum system pressure."
  },
  {
    id: 4,
    question: "A supply air fan consumes 15 kW at full speed. If the ductwork dampers are throttled to reduce flow to 70%, approximately what power is saved?",
    options: ["No significant savings - dampers dissipate energy", "4.5 kW (30% reduction)", "7.5 kW (50% reduction)", "10.5 kW (70% reduction)"],
    correctAnswer: 0,
    explanation: "Throttling with dampers maintains motor speed - the fan still works against the system but the energy is dissipated as noise and turbulence. VSDs reduce speed to match demand, saving the cubic power difference."
  },
  {
    id: 5,
    question: "A 22 kW motor operates 5,000 hours/year at average 65% load. If electricity costs £0.18/kWh, what are the annual running costs?",
    options: ["£9,900", "£12,870", "£19,800", "£25,740"],
    correctAnswer: 1,
    explanation: "Annual cost = Power × Load factor × Hours × Cost = 22 × 0.65 × 5000 × 0.18 = £12,870. Understanding running costs helps justify efficiency investments."
  },
  {
    id: 6,
    question: "What is the typical efficiency improvement when replacing an IE2 motor with an IE4 motor at 11 kW rating?",
    options: ["1-2%", "3-4%", "5-7%", "10-12%"],
    correctAnswer: 1,
    explanation: "At 11 kW, typical efficiency improves from ~89% (IE2) to ~93% (IE4), a 3-4% improvement. While seemingly small, over thousands of running hours this represents significant energy and cost savings."
  },
  {
    id: 7,
    question: "A VSD installation costs £6,000, saves £2,400/year, with maintenance cost increase of £200/year. What is the true simple payback?",
    options: ["2.5 years", "2.73 years", "3.0 years", "3.33 years"],
    correctAnswer: 1,
    explanation: "Net annual saving = £2,400 - £200 = £2,200. Payback = £6,000 / £2,200 = 2.73 years. Always account for maintenance and lifecycle costs in investment calculations."
  },
  {
    id: 8,
    question: "For NPV calculations with 8% discount rate over 10 years, what is the approximate present value factor?",
    options: ["4.21", "5.34", "6.71", "7.25"],
    correctAnswer: 2,
    explanation: "The cumulative present value factor for 10 years at 8% discount rate is approximately 6.71. This is used to calculate NPV: NPV = (Annual Savings × PV Factor) - Capital Cost."
  },
  {
    id: 9,
    question: "A building has 10 × 7.5 kW AHU motors running 3,500 hours/year. If VSDs could save 35% energy, what is the annual kWh saving?",
    options: ["65,625 kWh", "91,875 kWh", "131,250 kWh", "262,500 kWh"],
    correctAnswer: 1,
    explanation: "Total motor power = 10 × 7.5 = 75 kW. Annual consumption = 75 × 3,500 = 262,500 kWh. Saving = 262,500 × 0.35 = 91,875 kWh per year."
  },
  {
    id: 10,
    question: "Under the Energy-related Products (ErP) Directive, which motors are exempt from minimum efficiency requirements?",
    options: ["Motors below 0.75 kW", "Motors integrated into machinery", "Motors for intermittent duty", "All of the above"],
    correctAnswer: 3,
    explanation: "ErP exemptions include motors below 0.75 kW or above 375 kW, motors designed for intermittent duty, brake motors, and motors integrated into products where efficiency cannot be tested separately."
  },
  {
    id: 11,
    question: "A pump system shows 40% energy saving from VSD installation with £3,200 annual saving. If carbon costs £50/tonne and grid factor is 0.233 kgCO₂/kWh, what additional carbon credit value?",
    options: ["£160", "£340", "£535", "£800"],
    correctAnswer: 2,
    explanation: "Energy saved = £3,200 / £0.15/kWh ≈ 21,333 kWh. Carbon saved = 21,333 × 0.233 = 4,971 kg = 4.97 tonnes. Carbon value = 4.97 × £50 = £248.50. Note: actual calculation depends on electricity price assumed."
  },
  {
    id: 12,
    question: "What is the recommended approach when applying affinity laws to systems with significant static head?",
    options: [
      "Apply affinity laws without modification",
      "Use only the flow relationship, not power",
      "Account for static head as minimum pressure requirement",
      "Affinity laws cannot be used for static head systems"
    ],
    correctAnswer: 2,
    explanation: "Systems with static head (like pumping to height) have a minimum pressure requirement regardless of flow. The affinity laws apply to the variable friction losses only - the static head component must be maintained at all speeds."
  }
];

const faqs = [
  {
    question: "Why do the affinity laws show such dramatic power savings with small speed reductions?",
    answer: "The cubic relationship (P ∝ N³) means power drops rapidly with speed. At 90% speed, power is 72.9% (0.9³). At 80% speed, power is 51.2% (0.8³). At 50% speed, power is just 12.5% (0.5³). This contrasts sharply with throttling methods which maintain full speed and dissipate excess energy as heat and turbulence. The physics behind this is that centrifugal machines do work on the fluid - reducing speed reduces the energy imparted to every molecule of air or water passing through."
  },
  {
    question: "When should I use simple payback versus NPV for investment analysis?",
    answer: "Simple payback is quick to calculate and easy to communicate - suitable for screening projects and comparing similar options. However, it ignores the time value of money and benefits beyond the payback period. NPV (Net Present Value) accounts for discount rates and provides true project value over its lifetime. Use NPV for major capital decisions, comparing projects with different lifespans, and when discount rates significantly affect outcomes. A positive NPV indicates the investment exceeds the required return rate."
  },
  {
    question: "How do I account for varying load profiles in energy savings calculations?",
    answer: "Real systems rarely operate at constant load. Use load duration analysis: divide operation into bands (e.g., 0-25%, 25-50%, 50-75%, 75-100% load) and estimate hours at each band from BMS data or operational knowledge. Calculate energy at each band considering the cubic power relationship, then sum for total consumption. Compare fixed speed (always 100% power when running) with variable speed operation. Many VSDs provide built-in energy logging to verify actual savings."
  },
  {
    question: "What Part L requirements apply to motor replacements in existing buildings?",
    answer: "Part L applies to new installations and replacements in existing buildings. When replacing motors, the new motor must meet minimum IE3 efficiency (or IE2 with VSD). Consequential improvements may be required for larger projects - replacing motors could trigger requirements to improve other building services. Document motor efficiency in building log books. Consider whole-life costs: an IE4 motor may have higher capital cost but lower running costs over its 15-20 year lifespan."
  },
  {
    question: "How do carbon factors affect payback calculations for energy efficiency projects?",
    answer: "Carbon pricing adds value beyond energy savings. UK grid carbon factor (approximately 0.233 kgCO₂/kWh in 2024, declining as grid decarbonises) converts kWh savings to carbon savings. If carbon is priced (via carbon tax, ETS, or corporate commitments), this adds to project value. Many organisations set internal carbon prices (£50-100/tonne) for investment decisions. Include carbon value in NPV calculations, but note the grid factor will decrease over time as renewable generation increases."
  },
  {
    question: "What is the typical energy saving from retrofitting VSDs to existing HVAC systems?",
    answer: "Savings depend heavily on the application and existing control method. For fans and pumps currently controlled by dampers or throttling valves, expect 30-50% savings on variable flow systems. For constant volume systems converted to variable volume, savings can exceed 60%. Chilled water pumps with two-port valve control typically save 40-50%. However, systems with mostly constant load (e.g., process cooling) show minimal savings. Always conduct proper assessment including load profile analysis before specifying VSDs."
  }
];

const HNCModule8Section4_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section4">
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
            <span>Module 8.4.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Energy Efficiency
          </h1>
          <p className="text-white/80">
            Affinity laws, energy savings calculations and financial analysis for motor systems
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Flow:</strong> Q ∝ N (linear with speed)</li>
              <li className="pl-1"><strong>Pressure:</strong> H ∝ N² (square of speed)</li>
              <li className="pl-1"><strong>Power:</strong> P ∝ N³ (cube of speed)</li>
              <li className="pl-1"><strong>50% speed = 12.5% power</strong></li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>HVAC fans:</strong> AHUs, FCUs, extract systems</li>
              <li className="pl-1"><strong>Pumps:</strong> CHW, HHW, condenser water</li>
              <li className="pl-1"><strong>Part L:</strong> IE3 minimum efficiency</li>
              <li className="pl-1"><strong>Typical savings:</strong> 30-50% with VSDs</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply the affinity laws to predict fan and pump performance at varying speeds",
              "Calculate energy savings comparing fixed speed vs variable speed operation",
              "Perform simple payback analysis for VSD and motor upgrade investments",
              "Calculate Net Present Value (NPV) for energy efficiency projects",
              "Quantify carbon savings using UK grid emission factors",
              "Understand Part L Building Regulations requirements for motor systems"
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

        {/* Section 1: The Affinity Laws */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The Affinity Laws for Fans and Pumps
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The affinity laws (also called fan laws or pump laws) describe how centrifugal machine
              performance changes with rotational speed. These fundamental relationships explain why
              variable speed drives offer such dramatic energy savings on HVAC systems.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">The Three Affinity Laws</p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <p className="text-xs text-white/60 mb-1">Flow Rate (Q)</p>
                  <p className="font-mono text-lg mb-1">Q<sub>2</sub>/Q<sub>1</sub> = N<sub>2</sub>/N<sub>1</sub></p>
                  <p className="text-xs text-elec-yellow/70">Linear relationship</p>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <p className="text-xs text-white/60 mb-1">Pressure/Head (H)</p>
                  <p className="font-mono text-lg mb-1">H<sub>2</sub>/H<sub>1</sub> = (N<sub>2</sub>/N<sub>1</sub>)²</p>
                  <p className="text-xs text-elec-yellow/70">Square relationship</p>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <p className="text-xs text-white/60 mb-1">Power (P)</p>
                  <p className="font-mono text-lg mb-1">P<sub>2</sub>/P<sub>1</sub> = (N<sub>2</sub>/N<sub>1</sub>)³</p>
                  <p className="text-xs text-elec-yellow/70">Cubic relationship</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Understanding the Cubic Power Law</p>
              <p className="text-sm text-white/90 mb-3">
                The cubic relationship between power and speed is the key to VSD energy savings. Small
                speed reductions yield large power reductions because power varies with the <strong>cube</strong> of speed.
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Speed (%)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Flow (%)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Pressure (%)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Power (%)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Energy Saved</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">100%</td>
                      <td className="border border-white/10 px-3 py-2">100%</td>
                      <td className="border border-white/10 px-3 py-2">100%</td>
                      <td className="border border-white/10 px-3 py-2">100%</td>
                      <td className="border border-white/10 px-3 py-2">0%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">90%</td>
                      <td className="border border-white/10 px-3 py-2">90%</td>
                      <td className="border border-white/10 px-3 py-2">81%</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">72.9%</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">27.1%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">80%</td>
                      <td className="border border-white/10 px-3 py-2">80%</td>
                      <td className="border border-white/10 px-3 py-2">64%</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">51.2%</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">48.8%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">70%</td>
                      <td className="border border-white/10 px-3 py-2">70%</td>
                      <td className="border border-white/10 px-3 py-2">49%</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">34.3%</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">65.7%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">60%</td>
                      <td className="border border-white/10 px-3 py-2">60%</td>
                      <td className="border border-white/10 px-3 py-2">36%</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">21.6%</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">78.4%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">50%</td>
                      <td className="border border-white/10 px-3 py-2">50%</td>
                      <td className="border border-white/10 px-3 py-2">25%</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">12.5%</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">87.5%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Why VSDs Beat Throttling</p>
              <p className="text-sm text-white/90">
                Traditional flow control uses dampers (fans) or throttle valves (pumps) to restrict flow
                while the motor runs at full speed. This wastes energy as the motor does work that is
                immediately dissipated as turbulence and noise. A VSD reduces motor speed to match demand,
                exploiting the cubic power relationship to dramatically cut energy consumption.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">When Affinity Laws Apply</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Centrifugal fans and pumps</li>
                  <li className="pl-1">Systems with variable flow demand</li>
                  <li className="pl-1">Friction-dominated systems</li>
                  <li className="pl-1">Geometrically similar operation</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Limitations to Consider</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Systems with significant static head</li>
                  <li className="pl-1">Positive displacement machines</li>
                  <li className="pl-1">Very low speed operation (&lt;20%)</li>
                  <li className="pl-1">Minimum pressure requirements</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> The affinity laws assume the system curve scales with the square
              of flow. Systems with static head (pumping to height) have a minimum pressure requirement
              that must be maintained regardless of flow rate.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Energy Savings Calculations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Energy Savings Calculations: Fixed vs Variable Speed
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Calculating energy savings requires understanding the load profile - how demand varies
              over time. Fixed speed systems consume constant power regardless of demand, while
              variable speed systems reduce power consumption at partial loads.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Energy Calculation Methodology</p>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <span className="bg-elec-yellow/20 text-elec-yellow px-2 py-0.5 rounded text-xs font-medium">1</span>
                  <p>Establish load profile: hours at each load percentage</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-elec-yellow/20 text-elec-yellow px-2 py-0.5 rounded text-xs font-medium">2</span>
                  <p>Calculate fixed speed energy: Full power × Total running hours</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-elec-yellow/20 text-elec-yellow px-2 py-0.5 rounded text-xs font-medium">3</span>
                  <p>Calculate VSD energy: Sum of (Power at each load × Hours at that load)</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-elec-yellow/20 text-elec-yellow px-2 py-0.5 rounded text-xs font-medium">4</span>
                  <p>Energy saving = Fixed speed energy - VSD energy</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical HVAC Load Profile Example</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Load Band</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Hours/Year</th>
                      <th className="border border-white/10 px-3 py-2 text-left">% of Runtime</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Power (cubic)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Fixed Power</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">100% load</td>
                      <td className="border border-white/10 px-3 py-2">500</td>
                      <td className="border border-white/10 px-3 py-2">10%</td>
                      <td className="border border-white/10 px-3 py-2">100%</td>
                      <td className="border border-white/10 px-3 py-2">100%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">80% load</td>
                      <td className="border border-white/10 px-3 py-2">1,500</td>
                      <td className="border border-white/10 px-3 py-2">30%</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">51.2%</td>
                      <td className="border border-white/10 px-3 py-2">100%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">60% load</td>
                      <td className="border border-white/10 px-3 py-2">2,000</td>
                      <td className="border border-white/10 px-3 py-2">40%</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">21.6%</td>
                      <td className="border border-white/10 px-3 py-2">100%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">40% load</td>
                      <td className="border border-white/10 px-3 py-2">1,000</td>
                      <td className="border border-white/10 px-3 py-2">20%</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">6.4%</td>
                      <td className="border border-white/10 px-3 py-2">100%</td>
                    </tr>
                    <tr className="bg-white/5 font-medium">
                      <td className="border border-white/10 px-3 py-2">Total</td>
                      <td className="border border-white/10 px-3 py-2">5,000</td>
                      <td className="border border-white/10 px-3 py-2">100%</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">Weighted avg: 35%</td>
                      <td className="border border-white/10 px-3 py-2">100%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/60 mt-2">This profile shows 65% energy saving potential - typical for variable air volume systems</p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Worked Example: AHU Supply Fan</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Motor power: 15 kW</p>
                <p>Annual running hours: 5,000</p>
                <p>Electricity cost: £0.18/kWh</p>
                <p className="mt-2 text-white/60">Fixed speed annual energy:</p>
                <p>E<sub>fixed</sub> = 15 kW × 5,000 h = 75,000 kWh</p>
                <p>Cost = 75,000 × £0.18 = <strong>£13,500/year</strong></p>
                <p className="mt-2 text-white/60">VSD annual energy (using profile above):</p>
                <p>E<sub>VSD</sub> = 15 × [(500×1.0) + (1500×0.512) + (2000×0.216) + (1000×0.064)]</p>
                <p>E<sub>VSD</sub> = 15 × [500 + 768 + 432 + 64] = 15 × 1,764 = 26,460 kWh</p>
                <p>Cost = 26,460 × £0.18 = <strong>£4,763/year</strong></p>
                <p className="mt-2 text-green-400">Annual saving = £13,500 - £4,763 = <strong>£8,737/year (65%)</strong></p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Important: VSD Losses</p>
              <p className="text-sm text-white/90">
                VSDs are not 100% efficient. Typical VSD efficiency is 95-98% at full load but drops
                at partial loads. Include VSD losses in calculations by applying approximately 3-5%
                additional loss factor. Modern drives with active front ends have better partial load efficiency.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design tip:</strong> Obtain actual load profile data from BMS trending where possible.
              If unavailable, use standardised profiles from CIBSE Guide F or manufacturer data.
              Conservative assumptions lead to more reliable payback predictions.
            </p>
          </div>
        </section>

        {/* Section 3: Simple Payback Analysis */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Simple Payback Analysis
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Simple payback period is the time required for energy savings to equal the initial
              investment. It's a quick screening tool for comparing projects but has limitations
              as it ignores benefits beyond the payback period and the time value of money.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Simple Payback Formula</p>
              <p className="font-mono text-center text-xl mb-2">
                Payback Period = Capital Cost / Net Annual Savings
              </p>
              <div className="grid sm:grid-cols-2 gap-2 mt-4 text-xs text-white/80">
                <div>
                  <p><strong>Capital Cost</strong> = Equipment + Installation + Commissioning</p>
                </div>
                <div>
                  <p><strong>Net Annual Savings</strong> = Energy savings - Additional maintenance</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical VSD Payback Periods</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Running Hours</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Load Variation</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Payback</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">VAV AHU fans</td>
                      <td className="border border-white/10 px-3 py-2">&gt;4,000</td>
                      <td className="border border-white/10 px-3 py-2">High (40-100%)</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">1-2 years</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">CHW pumps</td>
                      <td className="border border-white/10 px-3 py-2">&gt;3,000</td>
                      <td className="border border-white/10 px-3 py-2">Medium-High</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">2-3 years</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cooling tower fans</td>
                      <td className="border border-white/10 px-3 py-2">&gt;2,500</td>
                      <td className="border border-white/10 px-3 py-2">Medium</td>
                      <td className="border border-white/10 px-3 py-2 text-yellow-400">2-4 years</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Extract fans</td>
                      <td className="border border-white/10 px-3 py-2">&gt;3,500</td>
                      <td className="border border-white/10 px-3 py-2">Low-Medium</td>
                      <td className="border border-white/10 px-3 py-2 text-yellow-400">3-5 years</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Constant volume fans</td>
                      <td className="border border-white/10 px-3 py-2">Any</td>
                      <td className="border border-white/10 px-3 py-2">None</td>
                      <td className="border border-white/10 px-3 py-2 text-red-400">&gt;10 years</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Worked Example: Pump VSD Installation</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Capital costs:</p>
                <p>15 kW VSD supply and install: £3,800</p>
                <p>Electrical modifications: £850</p>
                <p>Commissioning and setup: £450</p>
                <p>Total capital cost: <strong>£5,100</strong></p>
                <p className="mt-2 text-white/60">Annual savings:</p>
                <p>Energy saving: 32,000 kWh × £0.18 = £5,760</p>
                <p>Additional filter changes (cleaner air): -£120</p>
                <p>VSD maintenance allowance: -£150</p>
                <p>Net annual saving: <strong>£5,490</strong></p>
                <p className="mt-2 text-green-400">Simple payback = £5,100 / £5,490 = <strong>0.93 years (11 months)</strong></p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Factors Improving Payback</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">High running hours (&gt;4,000/year)</li>
                  <li className="pl-1">High electricity costs</li>
                  <li className="pl-1">Significant load variation</li>
                  <li className="pl-1">Current throttling control</li>
                  <li className="pl-1">Larger motor sizes (economies of scale)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Factors Lengthening Payback</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Low running hours</li>
                  <li className="pl-1">Constant load operation</li>
                  <li className="pl-1">Small motor sizes (&lt;5 kW)</li>
                  <li className="pl-1">Complex installation requirements</li>
                  <li className="pl-1">Already efficient control method</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Industry guidance:</strong> Projects with simple payback under 3 years are
              generally considered attractive. Under 2 years is excellent. Over 5 years may struggle
              to gain approval without additional justification (carbon targets, reliability, noise reduction).
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: NPV, Carbon and Part L */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            NPV Calculations, Carbon Savings and Part L Compliance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Net Present Value (NPV) provides a more sophisticated investment analysis by accounting
              for the time value of money. Combined with carbon savings calculations and regulatory
              compliance (Part L), this forms a comprehensive business case for energy efficiency investments.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Net Present Value Formula</p>
              <p className="font-mono text-center text-lg mb-2">
                NPV = Σ (Annual Savings / (1 + r)<sup>n</sup>) - Capital Cost
              </p>
              <p className="text-xs text-white/70 text-center mt-2">
                Or using present value factor: NPV = (Annual Savings × PV Factor) - Capital Cost
              </p>
              <div className="mt-4 text-xs text-white/80">
                <p><strong>r</strong> = Discount rate (typically 6-10% for commercial projects)</p>
                <p><strong>n</strong> = Year number (1, 2, 3... to equipment lifespan)</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Present Value Factors (Cumulative)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Years</th>
                      <th className="border border-white/10 px-3 py-2 text-left">6%</th>
                      <th className="border border-white/10 px-3 py-2 text-left">8%</th>
                      <th className="border border-white/10 px-3 py-2 text-left">10%</th>
                      <th className="border border-white/10 px-3 py-2 text-left">12%</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5</td>
                      <td className="border border-white/10 px-3 py-2">4.21</td>
                      <td className="border border-white/10 px-3 py-2">3.99</td>
                      <td className="border border-white/10 px-3 py-2">3.79</td>
                      <td className="border border-white/10 px-3 py-2">3.60</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">10</td>
                      <td className="border border-white/10 px-3 py-2">7.36</td>
                      <td className="border border-white/10 px-3 py-2">6.71</td>
                      <td className="border border-white/10 px-3 py-2">6.14</td>
                      <td className="border border-white/10 px-3 py-2">5.65</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">15</td>
                      <td className="border border-white/10 px-3 py-2">9.71</td>
                      <td className="border border-white/10 px-3 py-2">8.56</td>
                      <td className="border border-white/10 px-3 py-2">7.61</td>
                      <td className="border border-white/10 px-3 py-2">6.81</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">20</td>
                      <td className="border border-white/10 px-3 py-2">11.47</td>
                      <td className="border border-white/10 px-3 py-2">9.82</td>
                      <td className="border border-white/10 px-3 py-2">8.51</td>
                      <td className="border border-white/10 px-3 py-2">7.47</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/60 mt-2">Multiply annual savings by factor to get present value of all future savings</p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">NPV Worked Example</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>VSD installation cost: £5,100</p>
                <p>Annual energy saving: £5,490</p>
                <p>Equipment lifespan: 15 years</p>
                <p>Discount rate: 8%</p>
                <p className="mt-2">PV factor (15 years, 8%) = 8.56</p>
                <p className="mt-2">NPV = (£5,490 × 8.56) - £5,100</p>
                <p>NPV = £46,994 - £5,100 = <strong>£41,894</strong></p>
                <p className="mt-2 text-green-400">Positive NPV indicates excellent investment - proceed!</p>
              </div>
            </div>

            {/* Carbon Savings */}
            <div className="my-6">
              <div className="flex items-center gap-2 mb-3">
                <Leaf className="h-5 w-5 text-green-400" />
                <p className="text-sm font-medium text-green-400">Carbon Savings Calculations</p>
              </div>
              <p className="text-sm text-white/90 mb-3">
                Carbon savings add environmental value to energy efficiency projects. The UK grid
                carbon factor represents the CO₂ emissions per unit of electricity consumed.
              </p>

              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <p className="font-mono text-center mb-2">
                  Carbon Saving (kgCO₂) = Energy Saved (kWh) × Grid Carbon Factor (kgCO₂/kWh)
                </p>
                <p className="text-xs text-center text-white/70">
                  UK Grid Factor 2024: approximately 0.233 kgCO₂/kWh (declining as renewable share increases)
                </p>
              </div>

              <div className="mt-4 bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Example calculation:</p>
                <p>Energy saved: 48,540 kWh/year</p>
                <p>Carbon factor: 0.233 kgCO₂/kWh</p>
                <p>Carbon saving = 48,540 × 0.233 = <strong>11,310 kgCO₂ (11.3 tonnes/year)</strong></p>
                <p className="mt-2">If carbon priced at £50/tonne:</p>
                <p>Additional value = 11.3 × £50 = <strong>£565/year</strong></p>
              </div>
            </div>

            {/* Part L Compliance */}
            <div className="my-6">
              <div className="flex items-center gap-2 mb-3">
                <FileCheck className="h-5 w-5 text-blue-400" />
                <p className="text-sm font-medium text-blue-400">Part L Building Regulations</p>
              </div>
              <p className="text-sm text-white/90 mb-3">
                Part L of the Building Regulations sets minimum energy efficiency standards for
                building services, including motors and their control systems.
              </p>

              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Requirement</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Motor efficiency class</td>
                      <td className="border border-white/10 px-3 py-2">Minimum IE3 Premium (or IE2 with VSD)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Variable speed control</td>
                      <td className="border border-white/10 px-3 py-2">Required for fans/pumps &gt;1.1 kW in variable demand systems</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Building log book</td>
                      <td className="border border-white/10 px-3 py-2">Motor ratings and efficiency classes must be documented</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Metering</td>
                      <td className="border border-white/10 px-3 py-2">Sub-metering required for motors &gt;15 kW</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Commissioning</td>
                      <td className="border border-white/10 px-3 py-2">Motor systems must be commissioned to design efficiency</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Motor Efficiency Classes (IEC 60034-30-1)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Class</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Name</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical η at 11 kW</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Regulatory Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">IE1</td>
                      <td className="border border-white/10 px-3 py-2">Standard</td>
                      <td className="border border-white/10 px-3 py-2">~86.5%</td>
                      <td className="border border-white/10 px-3 py-2 text-red-400">Below minimum - not permitted</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">IE2</td>
                      <td className="border border-white/10 px-3 py-2">High</td>
                      <td className="border border-white/10 px-3 py-2">~89.0%</td>
                      <td className="border border-white/10 px-3 py-2 text-yellow-400">Only with VSD</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">IE3</td>
                      <td className="border border-white/10 px-3 py-2">Premium</td>
                      <td className="border border-white/10 px-3 py-2">~91.0%</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">Minimum standard</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">IE4</td>
                      <td className="border border-white/10 px-3 py-2">Super Premium</td>
                      <td className="border border-white/10 px-3 py-2">~93.0%</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">Best practice</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">IE5</td>
                      <td className="border border-white/10 px-3 py-2">Ultra Premium</td>
                      <td className="border border-white/10 px-3 py-2">~94.5%</td>
                      <td className="border border-white/10 px-3 py-2 text-blue-400">Future standard</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">ErP Directive Requirements</p>
              <p className="text-sm text-white/90">
                The Energy-related Products (ErP) Directive sets minimum efficiency requirements
                for motors placed on the EU/UK market. From July 2023, motors 75-200 kW must meet
                IE4. Motors 0.12-0.75 kW must meet IE2. Check current requirements for your application
                as regulations continue to tighten.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Compliance tip:</strong> Document motor selections at design stage showing
              IE class, power rating, and justification for any exemptions. This evidence is
              required for Building Control sign-off under Part L.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <Calculator className="h-5 w-5 text-elec-yellow" />
            Comprehensive Worked Examples
          </h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Complete VSD Business Case</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> A 22 kW chilled water pump operates 4,500 hours/year with
                average 65% load. Evaluate VSD installation.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Current operation (fixed speed with throttle valve):</p>
                <p>Energy = 22 kW × 4,500 h = 99,000 kWh/year</p>
                <p>Cost @ £0.18/kWh = <strong>£17,820/year</strong></p>
                <p className="mt-2 text-white/60">With VSD (average 65% flow = 65% speed):</p>
                <p>Power = 0.65³ × 22 = 0.274 × 22 = 6.04 kW average</p>
                <p>Energy = 6.04 × 4,500 = 27,180 kWh/year</p>
                <p>Cost = <strong>£4,892/year</strong></p>
                <p className="mt-2 text-green-400">Annual saving = £17,820 - £4,892 = <strong>£12,928 (72%)</strong></p>
                <p className="mt-2 text-white/60">Investment analysis:</p>
                <p>VSD cost installed: £6,200</p>
                <p>Simple payback = £6,200 / £12,928 = <strong>0.48 years (6 months)</strong></p>
                <p className="mt-2">NPV (15 years, 8%): (£12,928 × 8.56) - £6,200 = <strong>£104,464</strong></p>
                <p className="mt-2 text-white/60">Carbon saving:</p>
                <p>Energy saved = 99,000 - 27,180 = 71,820 kWh</p>
                <p>CO₂ saved = 71,820 × 0.233 = <strong>16,734 kgCO₂ (16.7 tonnes/year)</strong></p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: IE3 vs IE4 Motor Comparison</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Specify a 15 kW motor for 6,000 hours/year continuous duty.
                Compare IE3 (91.2% efficiency) vs IE4 (93.3% efficiency).
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">IE3 motor (91.2% efficient):</p>
                <p>Input power = 15 / 0.912 = 16.45 kW</p>
                <p>Annual energy = 16.45 × 6,000 = 98,700 kWh</p>
                <p>Annual cost = 98,700 × £0.18 = <strong>£17,766</strong></p>
                <p className="mt-2 text-white/60">IE4 motor (93.3% efficient):</p>
                <p>Input power = 15 / 0.933 = 16.08 kW</p>
                <p>Annual energy = 16.08 × 6,000 = 96,480 kWh</p>
                <p>Annual cost = 96,480 × £0.18 = <strong>£17,366</strong></p>
                <p className="mt-2 text-green-400">Annual saving = £17,766 - £17,366 = <strong>£400/year</strong></p>
                <p className="mt-2">Premium for IE4: approximately £350</p>
                <p>Simple payback = £350 / £400 = <strong>0.88 years</strong></p>
                <p className="mt-2">Over 20 year motor life: £400 × 20 = <strong>£8,000 saving</strong></p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Fan Speed Reduction Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> A supply fan delivers 5.0 m³/s at 750 Pa, consuming 5.5 kW.
                The system requires only 4.0 m³/s. Calculate the new operating point.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Required flow reduction:</p>
                <p>Flow ratio = 4.0 / 5.0 = 0.80 (80%)</p>
                <p className="mt-2 text-white/60">Apply affinity laws:</p>
                <p>New speed = 0.80 × original speed (N₂ = 0.8N₁)</p>
                <p>New pressure = 0.80² × 750 = 0.64 × 750 = <strong>480 Pa</strong></p>
                <p>New power = 0.80³ × 5.5 = 0.512 × 5.5 = <strong>2.82 kW</strong></p>
                <p className="mt-2 text-green-400">Power saving = 5.5 - 2.82 = <strong>2.68 kW (48.7%)</strong></p>
                <p className="mt-2 text-white/60">Verify system pressure requirement:</p>
                <p>If system needs 480 Pa at 4.0 m³/s, operation is satisfactory.</p>
                <p>If higher pressure needed (e.g., filter dirty), speed must increase.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-elec-yellow" />
            Practical Guidance
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Formulas</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Q₂/Q₁ = N₂/N₁</strong> - Flow proportional to speed</li>
                <li className="pl-1"><strong>H₂/H₁ = (N₂/N₁)²</strong> - Pressure proportional to speed squared</li>
                <li className="pl-1"><strong>P₂/P₁ = (N₂/N₁)³</strong> - Power proportional to speed cubed</li>
                <li className="pl-1"><strong>Simple Payback = Capital Cost / Annual Savings</strong></li>
                <li className="pl-1"><strong>NPV = (Savings × PV Factor) - Capital</strong></li>
                <li className="pl-1"><strong>CO₂ = kWh × Grid Factor</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">50% speed = 12.5% power (0.5³)</li>
                <li className="pl-1">70% speed = 34% power (0.7³)</li>
                <li className="pl-1">80% speed = 51% power (0.8³)</li>
                <li className="pl-1">UK grid carbon: ~0.233 kgCO₂/kWh</li>
                <li className="pl-1">Good payback: &lt;3 years</li>
                <li className="pl-1">Minimum motor class: IE3</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Ignoring static head</strong> - Affinity laws only apply to friction losses</li>
                <li className="pl-1"><strong>Optimistic load profiles</strong> - Use measured data where available</li>
                <li className="pl-1"><strong>Forgetting VSD losses</strong> - Add 3-5% for drive inefficiency</li>
                <li className="pl-1"><strong>NPV without inflation</strong> - Energy costs typically rise over time</li>
                <li className="pl-1"><strong>Ignoring minimum speed limits</strong> - Motors need minimum cooling airflow</li>
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
                <p className="font-medium text-white mb-1">Affinity Laws</p>
                <ul className="space-y-0.5">
                  <li>Flow: Q ∝ N (linear)</li>
                  <li>Pressure: H ∝ N² (square)</li>
                  <li>Power: P ∝ N³ (cube)</li>
                  <li>80% speed = 51.2% power</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Investment Analysis</p>
                <ul className="space-y-0.5">
                  <li>Simple Payback = Cost/Savings</li>
                  <li>Target: &lt;3 years payback</li>
                  <li>NPV positive = good investment</li>
                  <li>Include carbon value at £50+/tonne</li>
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
            <Link to="../h-n-c-module8-section4-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Motor Protection
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section4-6">
              Next: Installation and Commissioning
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule8Section4_5;
