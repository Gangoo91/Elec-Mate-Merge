import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Demand Management - HNC Module 7 Section 5.5";
const DESCRIPTION = "Master demand management strategies for electrical installations: load shedding, peak shaving, demand response programmes, tariff optimisation, DUoS/TNUoS charges, smart grid integration, and half-hourly settlement.";

const quickCheckQuestions = [
  {
    id: "max-demand-definition",
    question: "What is maximum demand (MD) in electrical systems?",
    options: ["The total energy consumed over a year", "The highest power drawn during a specified period", "The average power consumption", "The installed capacity of equipment"],
    correctIndex: 1,
    explanation: "Maximum demand is the highest power (kW or kVA) drawn from the supply during a defined measurement period, typically 30 minutes in the UK. It determines network capacity requirements and significantly impacts electricity costs."
  },
  {
    id: "load-shedding-purpose",
    question: "What is the primary purpose of load shedding?",
    options: ["To increase energy consumption", "To reduce maximum demand by temporarily disconnecting non-essential loads", "To improve power quality", "To increase tariff costs"],
    correctIndex: 1,
    explanation: "Load shedding reduces maximum demand by temporarily disconnecting or reducing non-essential loads during peak periods. This prevents exceeding contracted capacity and reduces demand-related charges."
  },
  {
    id: "peak-shaving-method",
    question: "Peak shaving typically involves:",
    options: ["Increasing consumption during peak hours", "Using on-site generation or storage to reduce grid demand during peaks", "Disconnecting all loads", "Changing to a different supplier"],
    correctIndex: 1,
    explanation: "Peak shaving uses on-site generation (diesel, gas, CHP) or battery energy storage systems (BESS) to supply load during peak periods, reducing the power drawn from the grid and lowering maximum demand charges."
  },
  {
    id: "half-hourly-settlement",
    question: "Half-hourly (HH) settlement requires electricity consumption to be:",
    options: ["Estimated monthly", "Measured and recorded every 30 minutes", "Calculated annually", "Averaged over the billing period"],
    correctIndex: 1,
    explanation: "Half-hourly settlement requires metering that records consumption every 30 minutes. This enables accurate billing based on actual consumption patterns and allows customers to benefit from time-of-use tariffs."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which charge is based on maximum demand rather than energy consumption?",
    options: [
      "Unit rate (p/kWh)",
      "Standing charge",
      "Capacity charge (kVA)",
      "Climate Change Levy"
    ],
    correctAnswer: 2,
    explanation: "Capacity charges are based on the maximum demand (kVA) registered during a billing period. This reflects the cost of providing network capacity regardless of how much energy is actually consumed."
  },
  {
    id: 2,
    question: "DUoS (Distribution Use of System) charges are determined by:",
    options: ["The energy supplier only", "National Grid", "The Distribution Network Operator (DNO)", "The customer's meter operator"],
    correctAnswer: 2,
    explanation: "DUoS charges are set by the local Distribution Network Operator (DNO) to recover the cost of maintaining and operating the distribution network. They vary by region and voltage level."
  },
  {
    id: 3,
    question: "Red band DUoS periods typically occur during:",
    options: ["Night time hours", "Weekends", "Peak demand periods (late afternoon/early evening)", "Bank holidays"],
    correctAnswer: 2,
    explanation: "Red band periods cover peak demand times, typically 16:00-19:00 on weekdays during winter months. DUoS charges during red band periods are significantly higher than amber or green bands."
  },
  {
    id: 4,
    question: "TNUoS (Transmission Use of System) charges are based on:",
    options: ["Total energy consumed annually", "Maximum demand during Triad periods", "Average daily consumption", "Number of meters installed"],
    correctAnswer: 1,
    explanation: "TNUoS charges for larger consumers are based on demand during the three highest national demand periods (Triads), which typically occur between November and February on cold winter evenings."
  },
  {
    id: 5,
    question: "A Triad period is defined as:",
    options: [
      "Any three consecutive days of high demand",
      "One of the three half-hour periods of highest national demand, separated by at least 10 days",
      "Three months of peak consumption",
      "Three years of historical data"
    ],
    correctAnswer: 1,
    explanation: "Triads are the three half-hour settlement periods of highest national demand between November and February, each separated by at least 10 clear days. They determine TNUoS charges for HH-metered sites."
  },
  {
    id: 6,
    question: "Demand response programmes allow consumers to:",
    options: [
      "Always pay the same rate for electricity",
      "Reduce or shift consumption in response to grid signals or price incentives",
      "Generate their own electricity without grid connection",
      "Avoid all network charges"
    ],
    correctAnswer: 1,
    explanation: "Demand response enables consumers to reduce, shift, or increase consumption in response to price signals, grid conditions, or operator requests. Participants receive payments or reduced charges for providing flexibility."
  },
  {
    id: 7,
    question: "Which technology is most commonly used for peak shaving in commercial buildings?",
    options: [
      "Diesel generators only",
      "Battery Energy Storage Systems (BESS)",
      "Wind turbines",
      "Fuel cells"
    ],
    correctAnswer: 1,
    explanation: "BESS is increasingly the preferred peak shaving technology due to fast response, quiet operation, low emissions, and ability to provide multiple services including demand reduction, frequency response, and backup power."
  },
  {
    id: 8,
    question: "Smart grid integration enables demand management through:",
    options: [
      "Manual meter reading only",
      "Real-time communication between grid, suppliers, and consumers",
      "Fixed tariff rates",
      "Disconnecting renewable generation"
    ],
    correctAnswer: 1,
    explanation: "Smart grids use advanced metering, sensors, and communication systems to enable real-time data exchange between all parties, allowing dynamic pricing, automated demand response, and optimised grid operation."
  },
  {
    id: 9,
    question: "The threshold for mandatory half-hourly (HH) metering in England is:",
    options: [
      "All commercial customers",
      "Sites with maximum demand greater than 100 kW",
      "All customers above Profile Class 5",
      "Sites consuming more than 100,000 kWh per year"
    ],
    correctAnswer: 0,
    explanation: "As of April 2024, all non-domestic electricity customers in Great Britain are required to be settled on a half-hourly basis (Market-wide Half-Hourly Settlement - MHHS), regardless of consumption level."
  },
  {
    id: 10,
    question: "Reactive power charges (kVArh) can be reduced by:",
    options: [
      "Increasing maximum demand",
      "Installing power factor correction equipment",
      "Using more resistive loads",
      "Reducing operating hours"
    ],
    correctAnswer: 1,
    explanation: "Power factor correction using capacitor banks or active correction equipment reduces reactive power demand (kVAr), improving power factor towards unity and avoiding excess reactive power charges."
  },
  {
    id: 11,
    question: "Load shedding priority should typically disconnect which loads first?",
    options: [
      "Life safety systems",
      "Critical process equipment",
      "Non-essential comfort loads (HVAC, lighting in unoccupied areas)",
      "Emergency lighting"
    ],
    correctAnswer: 2,
    explanation: "Load shedding schemes prioritise loads by criticality. Non-essential comfort loads like HVAC in unoccupied areas and general lighting are typically shed first, while life safety, critical processes, and emergency systems are protected."
  },
  {
    id: 12,
    question: "Which demand management strategy involves permanently shifting load to off-peak periods?",
    options: [
      "Load shedding",
      "Peak shaving",
      "Load shifting",
      "Demand response"
    ],
    correctAnswer: 2,
    explanation: "Load shifting permanently reschedules energy-intensive processes (such as water heating, ice storage, or batch processes) to off-peak periods when electricity costs are lower, without reducing total consumption."
  }
];

const faqs = [
  {
    question: "How can I predict when Triad periods will occur?",
    answer: "Triads typically occur on cold, dark winter weekday evenings between November and February, usually between 17:00-18:00. Triad warning services use weather forecasts, demand predictions, and historical patterns to alert subscribers when a Triad is likely. Sites can then reduce demand during these periods to minimise TNUoS charges, potentially saving thousands of pounds annually."
  },
  {
    question: "What is the difference between DUoS and TNUoS charges?",
    answer: "DUoS (Distribution Use of System) charges cover the local distribution network (11kV and below) operated by DNOs. They are banded by time (red/amber/green) and vary by region. TNUoS (Transmission Use of System) charges cover the high voltage transmission network (275/400kV) operated by National Grid. For larger consumers, TNUoS is based on Triad demand rather than total consumption."
  },
  {
    question: "How does Market-wide Half-Hourly Settlement (MHHS) affect my business?",
    answer: "MHHS means all non-domestic sites are now settled based on actual half-hourly consumption rather than profile estimates. This creates opportunities to reduce costs through demand management, as you directly benefit from shifting consumption away from expensive periods. However, it also means poor consumption patterns result in higher bills. Smart meters or AMR (Automatic Meter Reading) are required."
  },
  {
    question: "What size of battery storage is needed for peak shaving?",
    answer: "Battery sizing depends on your load profile and peak reduction target. Typically, 15-30 minutes of peak demand coverage is sufficient for peak shaving. For a site with 500 kW peak demand aiming to reduce by 200 kW for 2 hours, approximately 400 kWh of usable battery capacity would be required. Professional load analysis and simulation is recommended before investment."
  },
  {
    question: "Can demand response participation affect our operations?",
    answer: "Well-designed demand response schemes should have minimal operational impact. Options include reducing non-critical loads, using backup generation, or adjusting HVAC setpoints within comfort ranges. Participation is typically voluntary with advance notice, and sites can opt out if operational requirements prevent response. The financial benefits often significantly outweigh minor inconveniences."
  },
  {
    question: "How do I calculate the payback period for demand management investments?",
    answer: "Calculate annual savings from: (1) reduced capacity/demand charges based on lower kVA, (2) Triad avoidance savings, (3) DUoS red band avoidance, (4) reactive power charge reductions. Compare total annual savings against capital cost and maintenance. BESS systems typically achieve 3-7 year payback depending on tariff structure and usage patterns. Include any grid services revenue for comprehensive analysis."
  }
];

const HNCModule7Section5_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section5">
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
            <span>Module 7.5.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Demand Management
          </h1>
          <p className="text-white/80">
            Load shedding, peak shaving, demand response, tariff optimisation, and smart grid integration
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Maximum demand:</strong> Peak kVA determines capacity charges</li>
              <li className="pl-1"><strong>Load shedding:</strong> Disconnect non-essential loads at peak</li>
              <li className="pl-1"><strong>Peak shaving:</strong> BESS/generation reduces grid demand</li>
              <li className="pl-1"><strong>Triads:</strong> Three highest UK demand periods - major cost driver</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Cost Impact</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>DUoS red band:</strong> Up to 10x higher than green band</li>
              <li className="pl-1"><strong>TNUoS Triad:</strong> £50-70/kW/year in many zones</li>
              <li className="pl-1"><strong>Capacity charges:</strong> £5-15/kVA/month typical</li>
              <li className="pl-1"><strong>Reactive power:</strong> Charges above 0.95 power factor threshold</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand maximum demand and its impact on electricity costs",
              "Apply load shedding strategies to reduce peak demand",
              "Evaluate peak shaving technologies including BESS",
              "Navigate DUoS and TNUoS charging structures",
              "Implement Triad avoidance strategies",
              "Integrate demand response and smart grid technologies"
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

        {/* Section 1: Maximum Demand and Load Shedding */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Maximum Demand and Load Shedding
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Maximum demand (MD) is the highest power drawn from the supply during a defined period, typically
              measured in 30-minute intervals in the UK. It directly impacts capacity charges and network costs,
              often representing 20-40% of a commercial customer's electricity bill.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Maximum Demand Concepts:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Contracted capacity:</strong> Agreed maximum import (kVA) with DNO - exceeding incurs penalties</li>
                <li className="pl-1"><strong>Measured maximum demand:</strong> Highest recorded value in billing period</li>
                <li className="pl-1"><strong>Diversity factor:</strong> Ratio of actual MD to sum of individual load MDs</li>
                <li className="pl-1"><strong>Load factor:</strong> Average demand ÷ maximum demand - indicates demand profile efficiency</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Load Shedding Strategies</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Strategy</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Loads</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Priority-based shedding</td>
                      <td className="border border-white/10 px-3 py-2">Shed lowest priority first</td>
                      <td className="border border-white/10 px-3 py-2">Non-essential HVAC, decorative lighting</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Rotational shedding</td>
                      <td className="border border-white/10 px-3 py-2">Cycle loads on/off</td>
                      <td className="border border-white/10 px-3 py-2">Refrigeration, water heating, chillers</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Demand limiting</td>
                      <td className="border border-white/10 px-3 py-2">Prevent threshold breach</td>
                      <td className="border border-white/10 px-3 py-2">EV charging, industrial processes</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Predictive control</td>
                      <td className="border border-white/10 px-3 py-2">Pre-emptive reduction</td>
                      <td className="border border-white/10 px-3 py-2">BMS-controlled systems</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Load Priority Classification</p>
              <div className="text-sm space-y-1">
                <p><span className="text-green-400">Priority 1 (Never shed):</span> Life safety, emergency lighting, fire systems, critical IT</p>
                <p><span className="text-yellow-400">Priority 2 (Last resort):</span> Essential production, server rooms, security</p>
                <p><span className="text-orange-400">Priority 3 (Shed if needed):</span> General HVAC, non-critical processes</p>
                <p><span className="text-red-400">Priority 4 (First to shed):</span> EV charging, water heating, unoccupied area HVAC</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> Effective load shedding reduces maximum demand without impacting critical operations or occupant comfort.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Peak Shaving and Energy Storage */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Peak Shaving and Energy Storage
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Peak shaving uses on-site generation or energy storage to reduce grid demand during peak periods.
              Unlike load shedding (which reduces consumption), peak shaving maintains full supply to loads while
              reducing the power drawn from the distribution network.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Battery Energy Storage (BESS)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Charge during off-peak periods</li>
                  <li className="pl-1">Discharge to reduce grid demand at peak</li>
                  <li className="pl-1">Sub-second response capability</li>
                  <li className="pl-1">Silent operation, zero emissions</li>
                  <li className="pl-1">Multiple revenue streams possible</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">On-site Generation</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Diesel/gas generators for peak periods</li>
                  <li className="pl-1">CHP for combined heat and power</li>
                  <li className="pl-1">Solar PV with battery storage</li>
                  <li className="pl-1">May require planning permission</li>
                  <li className="pl-1">Emission and noise considerations</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BESS Operating Modes</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Mode</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Function</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Revenue/Benefit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Peak shaving</td>
                      <td className="border border-white/10 px-3 py-2">Reduce maximum demand</td>
                      <td className="border border-white/10 px-3 py-2">Capacity charge reduction</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Triad avoidance</td>
                      <td className="border border-white/10 px-3 py-2">Discharge during Triad warnings</td>
                      <td className="border border-white/10 px-3 py-2">TNUoS charge reduction</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Arbitrage</td>
                      <td className="border border-white/10 px-3 py-2">Buy cheap, sell/use expensive</td>
                      <td className="border border-white/10 px-3 py-2">Energy cost savings</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Frequency response</td>
                      <td className="border border-white/10 px-3 py-2">Grid balancing services</td>
                      <td className="border border-white/10 px-3 py-2">Ancillary services revenue</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Backup power</td>
                      <td className="border border-white/10 px-3 py-2">UPS function during outages</td>
                      <td className="border border-white/10 px-3 py-2">Business continuity value</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BESS Sizing Example</p>
              <div className="text-sm space-y-1 font-mono">
                <p>Site maximum demand: 800 kW</p>
                <p>Target maximum demand: 500 kW</p>
                <p>Required reduction: 300 kW</p>
                <p>Peak duration: 3 hours</p>
                <p className="mt-2">Minimum capacity = 300 kW × 3 h = 900 kWh</p>
                <p>With 80% depth of discharge: 900 ÷ 0.8 = 1,125 kWh installed</p>
                <p className="text-green-400 mt-2">System specification: 300 kW / 1,125 kWh lithium-ion BESS</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Investment tip:</strong> Stack multiple revenue streams (peak shaving + Triad + frequency response) to improve BESS payback period.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Tariff Structures and Network Charges */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Tariff Structures and Network Charges
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding electricity tariff components enables effective demand management. Network charges
              (DUoS and TNUoS) often represent 25-35% of total electricity costs for commercial consumers and
              are directly influenced by consumption patterns and maximum demand.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Electricity Bill Components</p>
              <div className="text-sm space-y-1">
                <p><span className="text-white/60">Wholesale energy:</span> Commodity cost of electricity (40-50%)</p>
                <p><span className="text-white/60">DUoS charges:</span> Distribution network costs (15-20%)</p>
                <p><span className="text-white/60">TNUoS charges:</span> Transmission network costs (5-10%)</p>
                <p><span className="text-white/60">BSUoS charges:</span> Balancing Services Use of System (2-5%)</p>
                <p><span className="text-white/60">Supplier margin:</span> Supplier costs and profit (5-10%)</p>
                <p><span className="text-white/60">Levies:</span> RO, FiT, CFD, CM, CCL (15-25%)</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">DUoS Time Bands (Typical Winter)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Band</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Hours</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Relative Cost</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Strategy</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-red-400">Red</td>
                      <td className="border border-white/10 px-3 py-2">16:00-19:00 weekdays</td>
                      <td className="border border-white/10 px-3 py-2">Highest (10x green)</td>
                      <td className="border border-white/10 px-3 py-2">Minimise consumption</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-yellow-400">Amber</td>
                      <td className="border border-white/10 px-3 py-2">07:00-16:00, 19:00-20:00</td>
                      <td className="border border-white/10 px-3 py-2">Medium (3x green)</td>
                      <td className="border border-white/10 px-3 py-2">Manage where possible</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-green-400">Green</td>
                      <td className="border border-white/10 px-3 py-2">20:00-07:00, weekends</td>
                      <td className="border border-white/10 px-3 py-2">Lowest (baseline)</td>
                      <td className="border border-white/10 px-3 py-2">Shift loads here</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">TNUoS and Triad Charges</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Triads:</strong> Three half-hours of highest national demand (Nov-Feb)</li>
                <li className="pl-1"><strong>Separation:</strong> Each Triad at least 10 clear days apart</li>
                <li className="pl-1"><strong>Zonal charges:</strong> Vary by location (£40-75/kW/year typically)</li>
                <li className="pl-1"><strong>Calculation:</strong> Average of your demand during the three Triads × zonal rate</li>
                <li className="pl-1"><strong>Avoidance value:</strong> Reducing demand by 100 kW could save £4,000-7,500/year</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Capacity and Reactive Power Charges</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Charge Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Basis</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Management Strategy</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Agreed capacity</td>
                      <td className="border border-white/10 px-3 py-2">Contracted kVA</td>
                      <td className="border border-white/10 px-3 py-2">Right-size to actual need</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Excess capacity</td>
                      <td className="border border-white/10 px-3 py-2">kVA exceeding agreement</td>
                      <td className="border border-white/10 px-3 py-2">Load shedding, peak shaving</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Reactive power</td>
                      <td className="border border-white/10 px-3 py-2">kVArh when PF &lt; 0.95</td>
                      <td className="border border-white/10 px-3 py-2">Power factor correction</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Tariff optimisation:</strong> Review your load profile against tariff structure - often 10-15% savings are achievable through demand management alone.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Demand Response and Smart Grid Integration */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Demand Response and Smart Grid Integration
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Demand response (DR) programmes enable consumers to actively participate in grid balancing by
              adjusting consumption in response to price signals or operator requests. Smart grid technologies
              enable automated, real-time demand management across the electricity system.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Demand Response Programme Types:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Price-based DR:</strong> Respond to time-of-use or dynamic pricing signals</li>
                <li className="pl-1"><strong>Incentive-based DR:</strong> Receive payments for reducing demand when requested</li>
                <li className="pl-1"><strong>Emergency DR:</strong> Mandatory reduction during grid emergencies</li>
                <li className="pl-1"><strong>Ancillary services:</strong> Provide frequency response or reserve capacity</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">UK Flexibility Markets</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Capacity Market (CM)</li>
                  <li className="pl-1">Firm Frequency Response (FFR)</li>
                  <li className="pl-1">Dynamic Containment (DC)</li>
                  <li className="pl-1">Short-Term Operating Reserve (STOR)</li>
                  <li className="pl-1">DNO flexibility services</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Participation Requirements</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Half-hourly metering (mandatory)</li>
                  <li className="pl-1">Minimum capacity threshold</li>
                  <li className="pl-1">Response time capability</li>
                  <li className="pl-1">Telemetry and communication</li>
                  <li className="pl-1">Aggregator contract (for smaller sites)</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Smart Grid Technologies</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Technology</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Function</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Demand Management Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Smart meters</td>
                      <td className="border border-white/10 px-3 py-2">HH consumption recording</td>
                      <td className="border border-white/10 px-3 py-2">Enables settlement and monitoring</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">AMI/AMR</td>
                      <td className="border border-white/10 px-3 py-2">Automatic meter reading</td>
                      <td className="border border-white/10 px-3 py-2">Real-time data for control</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">EMS/BMS</td>
                      <td className="border border-white/10 px-3 py-2">Building/energy management</td>
                      <td className="border border-white/10 px-3 py-2">Automated demand response</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">IoT devices</td>
                      <td className="border border-white/10 px-3 py-2">Connected equipment</td>
                      <td className="border border-white/10 px-3 py-2">Granular load control</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">AI/ML platforms</td>
                      <td className="border border-white/10 px-3 py-2">Predictive optimisation</td>
                      <td className="border border-white/10 px-3 py-2">Forecast-driven scheduling</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Half-Hourly Settlement (MHHS)</p>
              <div className="text-sm space-y-2">
                <p>Market-wide Half-Hourly Settlement (MHHS) now applies to all non-domestic customers:</p>
                <ul className="space-y-1 list-disc list-outside ml-5 mt-2">
                  <li className="pl-1">Consumption recorded every 30 minutes via smart/AMR meters</li>
                  <li className="pl-1">Bills reflect actual consumption patterns, not profiles</li>
                  <li className="pl-1">Direct incentive to shift consumption to cheaper periods</li>
                  <li className="pl-1">Enables participation in flexibility markets</li>
                  <li className="pl-1">Foundation for time-of-use and dynamic tariffs</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Future trend:</strong> The transition to a smart, flexible grid means demand management will become increasingly automated, with AI-driven systems optimising consumption in real-time against multiple signals.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Triad Avoidance Savings Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Calculate potential savings from Triad avoidance at a manufacturing site.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Given data:</p>
                <p>Current average Triad demand: 450 kW</p>
                <p>Target Triad demand: 150 kW (using BESS)</p>
                <p>TNUoS zonal rate: £62/kW/year</p>
                <p className="mt-2 text-white/60">Calculation:</p>
                <p>Demand reduction = 450 - 150 = 300 kW</p>
                <p>Annual saving = 300 kW × £62/kW = £18,600/year</p>
                <p className="mt-2 text-green-400">Triad avoidance value: £18,600 per year</p>
                <p className="text-white/60 mt-2">Note: This alone could justify significant BESS investment</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: DUoS Band Optimisation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Evaluate cost savings from shifting EV charging from red to green band.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Current pattern (red band charging 16:00-19:00):</p>
                <p>EV charging load: 100 kW for 3 hours = 300 kWh daily</p>
                <p>Red band DUoS: 15p/kWh</p>
                <p>Daily DUoS cost: 300 × £0.15 = £45</p>
                <p className="mt-2 text-white/60">Optimised pattern (green band charging 22:00-01:00):</p>
                <p>Green band DUoS: 1.5p/kWh</p>
                <p>Daily DUoS cost: 300 × £0.015 = £4.50</p>
                <p className="mt-2 text-green-400">Daily saving: £40.50</p>
                <p className="text-green-400">Annual saving: £40.50 × 250 days = £10,125</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Load Factor Improvement</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Assess the impact of demand management on load factor.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Before demand management:</p>
                <p>Average demand: 400 kW</p>
                <p>Maximum demand: 800 kW</p>
                <p>Load factor = 400 ÷ 800 = 0.50 (50%)</p>
                <p className="mt-2 text-white/60">After implementing load shedding and peak shaving:</p>
                <p>Average demand: 400 kW (unchanged)</p>
                <p>Maximum demand: 550 kW (reduced)</p>
                <p>New load factor = 400 ÷ 550 = 0.73 (73%)</p>
                <p className="mt-2 text-green-400">Improvement: 23 percentage points</p>
                <p className="text-white/60 mt-2">Higher load factor = better utilisation of contracted capacity</p>
                <p className="text-white/60">Capacity charge reduction: (800-550) × £8/kVA/month = £2,000/month</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Demand Management Implementation Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Analyse historical consumption data (HH meter data essential)</li>
                <li className="pl-1">Identify peak demand periods and contributing loads</li>
                <li className="pl-1">Classify loads by priority and flexibility</li>
                <li className="pl-1">Model financial impact of demand reduction strategies</li>
                <li className="pl-1">Implement monitoring and control systems</li>
                <li className="pl-1">Establish operational procedures for demand events</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">DUoS red band: <strong>16:00-19:00 weekdays</strong> (winter)</li>
                <li className="pl-1">Triads: <strong>November to February</strong>, typically 17:00-18:00</li>
                <li className="pl-1">TNUoS rates: <strong>£40-75/kW/year</strong> depending on zone</li>
                <li className="pl-1">Power factor threshold: <strong>0.95</strong> (charges apply below)</li>
                <li className="pl-1">HH settlement period: <strong>30 minutes</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Ignoring network charges</strong> - Often 25-35% of bill, directly controllable</li>
                <li className="pl-1"><strong>Oversizing contracted capacity</strong> - Review annually against actual MD</li>
                <li className="pl-1"><strong>Missing Triad warnings</strong> - Subscribe to forecasting services</li>
                <li className="pl-1"><strong>Poor load priority classification</strong> - May shed critical loads inappropriately</li>
                <li className="pl-1"><strong>Neglecting power factor</strong> - Reactive charges add up significantly</li>
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
                <p className="font-medium text-white mb-1">Demand Management Strategies</p>
                <ul className="space-y-0.5">
                  <li>Load shedding - disconnect non-essential loads</li>
                  <li>Peak shaving - BESS/generation at peaks</li>
                  <li>Load shifting - move to off-peak periods</li>
                  <li>Demand response - respond to grid signals</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Charge Components</p>
                <ul className="space-y-0.5">
                  <li>DUoS - red/amber/green time bands</li>
                  <li>TNUoS - based on Triad demand</li>
                  <li>Capacity - contracted kVA</li>
                  <li>Reactive power - kVArh when PF &lt; 0.95</li>
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
            <Link to="../h-n-c-module7-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section5-6">
              Next: Section 5.6
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule7Section5_5;
