import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Power Factor Considerations - HNC Module 4 Section 1.3";
const DESCRIPTION = "Master power factor in building services design: reactive power impact, DNO requirements, power factor correction sizing, and supply capacity implications.";

const quickCheckQuestions = [
  {
    id: "pf-definition",
    question: "Power factor is the ratio of:",
    options: ["Voltage to current", "Real power (kW) to apparent power (kVA)", "Current to voltage", "Reactive power to real power"],
    correctIndex: 1,
    explanation: "Power factor = kW/kVA = cos φ. It represents how effectively electrical power is being converted to useful work output."
  },
  {
    id: "low-pf-effect",
    question: "A low power factor (e.g., 0.7) means:",
    options: ["Higher real power consumption", "Lower current for the same kW load", "Higher current for the same kW load", "Better energy efficiency"],
    correctIndex: 2,
    explanation: "Low power factor means higher current flows for the same real power (kW). This increases cable losses, requires larger infrastructure, and may incur DNO penalties."
  },
  {
    id: "pf-correction",
    question: "Power factor correction capacitors work by:",
    options: ["Reducing real power consumption", "Supplying reactive power locally", "Increasing supply voltage", "Reducing harmonic distortion"],
    correctIndex: 1,
    explanation: "Capacitors supply leading reactive power (kVAr) locally, offsetting the lagging reactive power drawn by inductive loads like motors, reducing the reactive power drawn from supply."
  },
  {
    id: "dno-requirement",
    question: "UK DNOs typically require power factor to be at least:",
    options: ["0.70", "0.80", "0.85", "0.95"],
    correctIndex: 3,
    explanation: "UK DNOs require power factor of 0.95 or better at the point of supply. Failure to meet this may result in reactive power charges or requirement to install correction."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What causes a lagging power factor in building services?",
    options: [
      "Resistive heating loads",
      "LED lighting with PFC",
      "Inductive loads such as motors and transformers",
      "Oversized cables"
    ],
    correctAnswer: 2,
    explanation: "Inductive loads (motors, transformers, fluorescent ballasts) draw lagging reactive current, causing a lagging power factor. The magnetic fields require reactive power to establish."
  },
  {
    id: 2,
    question: "A building draws 200kW at 0.8 power factor. What is the apparent power (kVA)?",
    options: ["160 kVA", "200 kVA", "250 kVA", "280 kVA"],
    correctAnswer: 2,
    explanation: "kVA = kW ÷ power factor = 200 ÷ 0.8 = 250 kVA. The building requires 250 kVA supply capacity despite only using 200kW."
  },
  {
    id: 3,
    question: "What is reactive power?",
    options: [
      "Power lost as heat in cables",
      "Power that oscillates between source and load without doing work",
      "Power used by emergency systems",
      "Power from renewable sources"
    ],
    correctAnswer: 1,
    explanation: "Reactive power (kVAr) is power that oscillates between the source and the reactive components (inductors, capacitors) in the load. It doesn't perform useful work but still loads the supply."
  },
  {
    id: 4,
    question: "If power factor improves from 0.8 to 0.95, the current drawn (for same kW) reduces by:",
    options: ["About 5%", "About 10%", "About 16%", "About 25%"],
    correctAnswer: 2,
    explanation: "Current ratio = pf1/pf2 = 0.8/0.95 = 0.84, so current reduces to 84% of original. This is a 16% reduction in current for the same real power."
  },
  {
    id: 5,
    question: "Where should power factor correction capacitors ideally be installed?",
    options: [
      "Only at the main incomer",
      "As close to the inductive loads as practical",
      "In the substation only",
      "After the energy meter"
    ],
    correctAnswer: 1,
    explanation: "Capacitors are most effective close to inductive loads, reducing reactive current throughout the distribution system. However, practical considerations (cost, maintenance) often mean correction at DB level or main incomer."
  },
  {
    id: 6,
    question: "What is the power factor triangle relationship?",
    options: [
      "kVA² = kW² + kVAr²",
      "kW² = kVA² + kVAr²",
      "kVAr² = kW² + kVA²",
      "kW = kVA × kVAr"
    ],
    correctAnswer: 0,
    explanation: "The power triangle shows: kVA² = kW² + kVAr². Apparent power (kVA) is the vector sum of real power (kW) and reactive power (kVAr)."
  },
  {
    id: 7,
    question: "Why might automatic power factor correction be needed?",
    options: [
      "To handle variable loads that change power factor",
      "To increase energy consumption",
      "To reduce supply voltage",
      "To increase harmonic content"
    ],
    correctAnswer: 0,
    explanation: "Automatic PFC systems switch capacitor banks in and out as load varies, maintaining target power factor. Fixed correction can lead to over-correction (leading pf) at low loads."
  },
  {
    id: 8,
    question: "What is the effect of over-correction (power factor > 1.0 leading)?",
    options: [
      "Improved efficiency",
      "Voltage rise at the point of connection",
      "Reduced cable losses",
      "Lower DNO charges"
    ],
    correctAnswer: 1,
    explanation: "Over-correction creates leading power factor which can cause voltage rise, potentially exceeding supply voltage limits. This can damage equipment and is penalised by some DNOs."
  },
  {
    id: 9,
    question: "A motor draws 50kW at 0.75 pf lagging. What kVAr correction brings this to 0.95 pf?",
    options: ["22 kVAr", "28 kVAr", "33 kVAr", "44 kVAr"],
    correctAnswer: 1,
    explanation: "At 0.75 pf: kVAr = 50 × tan(cos⁻¹0.75) = 50 × 0.882 = 44.1 kVAr. At 0.95 pf: kVAr = 50 × tan(cos⁻¹0.95) = 50 × 0.329 = 16.4 kVAr. Correction needed = 44.1 - 16.4 = 27.7 ≈ 28 kVAr"
  },
  {
    id: 10,
    question: "Why is power factor particularly important for DNO supply capacity?",
    options: [
      "It affects the colour of supply cables",
      "DNO transformers and cables are rated in kVA, not kW",
      "It determines the electricity tariff rate",
      "It affects the supply frequency"
    ],
    correctAnswer: 1,
    explanation: "DNO infrastructure (transformers, cables) is rated by current-carrying capacity, which relates to kVA not kW. Poor power factor uses more of this capacity for the same useful power."
  }
];

const faqs = [
  {
    question: "What is the difference between leading and lagging power factor?",
    answer: "Lagging power factor (most common) is caused by inductive loads like motors - current lags behind voltage. Leading power factor is caused by capacitive loads or over-correction - current leads voltage. DNOs penalise both extremes; target is typically 0.95-1.0 lagging."
  },
  {
    question: "Do modern LED lights affect power factor?",
    answer: "LED drivers can have poor power factor (0.5-0.7) without built-in correction. Quality LED luminaires include power factor correction circuits achieving 0.9+. When specifying LED lighting, always check the power factor specification - it significantly affects circuit sizing."
  },
  {
    question: "How do variable speed drives (VSDs) affect power factor?",
    answer: "VSDs typically have good displacement power factor (close to unity) because they draw current in phase with voltage. However, they create harmonic currents which reduce the true power factor. Modern VSDs with active front ends can achieve near-unity true power factor."
  },
  {
    question: "When should I use automatic vs fixed power factor correction?",
    answer: "Fixed correction suits loads with consistent power factor (large constant motors). Automatic correction suits variable loads where power factor changes with demand. Most commercial buildings need automatic systems due to varying occupancy and load patterns."
  },
  {
    question: "What size capacitor bank do I need?",
    answer: "Calculate existing kVAr from kW and current power factor, then target kVAr at 0.95 pf. Correction needed = existing kVAr - target kVAr. Size automatic banks with 10-15% margin and appropriate step sizes for smooth regulation."
  },
  {
    question: "Can power factor correction reduce my electricity bills?",
    answer: "Yes, in three ways: (1) Avoiding reactive power charges if your DNO applies them, (2) Reducing maximum demand charges as kVA reduces, (3) Reducing I²R losses in your distribution system. Payback periods of 1-3 years are typical for well-designed PFC systems."
  }
];

const HNCModule4Section1_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section1">
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
            <span>Module 4.1.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Power Factor Considerations
          </h1>
          <p className="text-white/80">
            Understanding reactive power and power factor correction in building services electrical design
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Power factor:</strong> kW/kVA = cos φ (0 to 1.0)</li>
              <li className="pl-1"><strong>Lagging pf:</strong> Caused by inductive loads (motors)</li>
              <li className="pl-1"><strong>DNO requirement:</strong> Typically 0.95 minimum</li>
              <li className="pl-1"><strong>Correction:</strong> Capacitors supply local reactive power</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Motors:</strong> 0.7-0.85 pf typical uncorrected</li>
              <li className="pl-1"><strong>LED drivers:</strong> 0.5-0.95 depending on quality</li>
              <li className="pl-1"><strong>UPS systems:</strong> Unity or leading pf possible</li>
              <li className="pl-1"><strong>Impact:</strong> Affects transformer/cable sizing</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define power factor and distinguish between leading and lagging",
              "Calculate apparent power, real power, and reactive power",
              "Understand the impact of poor power factor on supply capacity",
              "Apply DNO requirements for power factor at point of supply",
              "Size power factor correction capacitor banks",
              "Select between fixed and automatic PFC systems"
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

        {/* Section 1: Power Factor Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Power Factor Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Power factor is one of the most important parameters in electrical system design, affecting
              everything from cable sizing to electricity costs. Understanding power factor is essential
              for efficient building services design.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Power Triangle</p>
              <div className="grid grid-cols-3 gap-3 text-center text-sm my-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-elec-yellow mb-1">kW</p>
                  <p className="text-white/70 text-xs">Real Power</p>
                  <p className="text-white/50 text-xs">Does useful work</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-elec-yellow mb-1">kVAr</p>
                  <p className="text-white/70 text-xs">Reactive Power</p>
                  <p className="text-white/50 text-xs">Magnetic fields</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-elec-yellow mb-1">kVA</p>
                  <p className="text-white/70 text-xs">Apparent Power</p>
                  <p className="text-white/50 text-xs">Total supplied</p>
                </div>
              </div>
              <p className="font-mono text-center text-sm">kVA² = kW² + kVAr² &nbsp;&nbsp;|&nbsp;&nbsp; pf = kW / kVA = cos φ</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key relationships:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Power factor:</strong> pf = cos φ = kW ÷ kVA</li>
                <li className="pl-1"><strong>Apparent power:</strong> kVA = √(kW² + kVAr²)</li>
                <li className="pl-1"><strong>Reactive power:</strong> kVAr = kW × tan φ</li>
                <li className="pl-1"><strong>Current:</strong> I = kVA ÷ (√3 × kV) for three-phase</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Power Factor Values by Load Type</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Load Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical pf</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Resistive heaters</td>
                      <td className="border border-white/10 px-3 py-2">1.0</td>
                      <td className="border border-white/10 px-3 py-2">Unity</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Incandescent lighting</td>
                      <td className="border border-white/10 px-3 py-2">1.0</td>
                      <td className="border border-white/10 px-3 py-2">Unity</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Induction motors (loaded)</td>
                      <td className="border border-white/10 px-3 py-2">0.80-0.90</td>
                      <td className="border border-white/10 px-3 py-2">Lagging</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Induction motors (light load)</td>
                      <td className="border border-white/10 px-3 py-2">0.50-0.70</td>
                      <td className="border border-white/10 px-3 py-2">Lagging</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fluorescent (magnetic ballast)</td>
                      <td className="border border-white/10 px-3 py-2">0.50-0.60</td>
                      <td className="border border-white/10 px-3 py-2">Lagging</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LED (with PFC)</td>
                      <td className="border border-white/10 px-3 py-2">0.90-0.98</td>
                      <td className="border border-white/10 px-3 py-2">Near unity</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">VSD (6-pulse)</td>
                      <td className="border border-white/10 px-3 py-2">0.95</td>
                      <td className="border border-white/10 px-3 py-2">Near unity*</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/60 mt-2">*Displacement pf good, but harmonic distortion affects true pf</p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Power factor of 0.8 means 80% of apparent power does useful work; 20% is reactive, circulating but not working.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Impact on Supply Capacity */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Impact on Supply Capacity
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Poor power factor has significant practical and financial implications. DNO infrastructure
              is rated by current-carrying capacity, which means poor power factor uses more of the
              available supply capacity for the same useful power.
            </p>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Impact of Poor Power Factor</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Higher current for same kW → larger cables needed</li>
                <li className="pl-1">More supply capacity used → larger transformer required</li>
                <li className="pl-1">Increased I²R losses → higher running costs</li>
                <li className="pl-1">DNO penalties → reactive power charges</li>
                <li className="pl-1">Reduced system capacity → less spare for growth</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Current Increase Due to Poor Power Factor</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Power Factor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">kVA for 100kW</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Current (400V 3φ)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">% Increase</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1.00</td>
                      <td className="border border-white/10 px-3 py-2">100 kVA</td>
                      <td className="border border-white/10 px-3 py-2">144A</td>
                      <td className="border border-white/10 px-3 py-2">Reference</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0.95</td>
                      <td className="border border-white/10 px-3 py-2">105 kVA</td>
                      <td className="border border-white/10 px-3 py-2">152A</td>
                      <td className="border border-white/10 px-3 py-2">+5%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0.90</td>
                      <td className="border border-white/10 px-3 py-2">111 kVA</td>
                      <td className="border border-white/10 px-3 py-2">160A</td>
                      <td className="border border-white/10 px-3 py-2">+11%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0.85</td>
                      <td className="border border-white/10 px-3 py-2">118 kVA</td>
                      <td className="border border-white/10 px-3 py-2">170A</td>
                      <td className="border border-white/10 px-3 py-2">+18%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0.80</td>
                      <td className="border border-white/10 px-3 py-2">125 kVA</td>
                      <td className="border border-white/10 px-3 py-2">180A</td>
                      <td className="border border-white/10 px-3 py-2">+25%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0.70</td>
                      <td className="border border-white/10 px-3 py-2">143 kVA</td>
                      <td className="border border-white/10 px-3 py-2">206A</td>
                      <td className="border border-white/10 px-3 py-2">+43%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design impact:</strong> A building at 0.7 pf needs 43% more supply capacity than one at unity pf for the same useful power.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: DNO Requirements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            DNO Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              UK Distribution Network Operators require customers to maintain adequate power factor
              at the point of supply. This is both a technical requirement (network capacity) and
              a commercial requirement (connection agreement).
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">DNO Power Factor Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Minimum requirement:</strong> 0.95 lagging typical</li>
                <li className="pl-1"><strong>Specified in:</strong> Connection agreement terms</li>
                <li className="pl-1"><strong>Measurement point:</strong> At the point of supply (meter)</li>
                <li className="pl-1"><strong>Penalty:</strong> Reactive power charges (kVArh)</li>
                <li className="pl-1"><strong>Leading pf:</strong> Also penalised (causes voltage rise)</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Reactive Power Charges</p>
              <p className="text-sm text-white mb-3">DNOs may apply charges for excessive reactive power consumption:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Typically applied when pf falls below 0.95</li>
                <li className="pl-1">Charged per kVArh (reactive energy)</li>
                <li className="pl-1">Can be significant for industrial loads</li>
                <li className="pl-1">Some suppliers include in maximum demand charges</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Connection Agreement Implications</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Power Factor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">DNO Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">≥0.95 lagging</td>
                      <td className="border border-white/10 px-3 py-2">Compliant - no action required</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0.90-0.95 lagging</td>
                      <td className="border border-white/10 px-3 py-2">Reactive charges may apply</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">&lt;0.90 lagging</td>
                      <td className="border border-white/10 px-3 py-2">PFC required, significant charges</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Leading (capacitive)</td>
                      <td className="border border-white/10 px-3 py-2">Voltage issues, charges possible</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Check with your local DNO for specific requirements - these vary between operators and may change.
            </p>
          </div>
        </section>

        {/* Section 4: Power Factor Correction Sizing */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Power Factor Correction Sizing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Power factor correction uses capacitors to supply reactive power locally, reducing the
              reactive power drawn from the supply. Correct sizing ensures target power factor is achieved
              without over-correction.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">PFC Sizing Formula</p>
              <p className="font-mono text-center text-lg mb-2">kVAr required = kW × (tan φ₁ - tan φ₂)</p>
              <p className="text-xs text-white/70 text-center">Where φ₁ = original angle, φ₂ = target angle</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">kVAr Multipliers (kVAr per kW)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Original pf</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Target 0.90</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Target 0.95</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Target 1.00</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0.65</td>
                      <td className="border border-white/10 px-3 py-2">0.685</td>
                      <td className="border border-white/10 px-3 py-2">0.840</td>
                      <td className="border border-white/10 px-3 py-2">1.169</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0.70</td>
                      <td className="border border-white/10 px-3 py-2">0.536</td>
                      <td className="border border-white/10 px-3 py-2">0.691</td>
                      <td className="border border-white/10 px-3 py-2">1.020</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0.75</td>
                      <td className="border border-white/10 px-3 py-2">0.398</td>
                      <td className="border border-white/10 px-3 py-2">0.553</td>
                      <td className="border border-white/10 px-3 py-2">0.882</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0.80</td>
                      <td className="border border-white/10 px-3 py-2">0.266</td>
                      <td className="border border-white/10 px-3 py-2">0.421</td>
                      <td className="border border-white/10 px-3 py-2">0.750</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0.85</td>
                      <td className="border border-white/10 px-3 py-2">0.140</td>
                      <td className="border border-white/10 px-3 py-2">0.291</td>
                      <td className="border border-white/10 px-3 py-2">0.620</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0.90</td>
                      <td className="border border-white/10 px-3 py-2">-</td>
                      <td className="border border-white/10 px-3 py-2">0.155</td>
                      <td className="border border-white/10 px-3 py-2">0.484</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/60 mt-2">Example: 200kW at 0.75 pf → 0.95 pf needs 200 × 0.553 = 110.6 kVAr</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fixed PFC</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Single capacitor or fixed bank</li>
                  <li className="pl-1">Suits constant loads</li>
                  <li className="pl-1">Lower cost, simpler</li>
                  <li className="pl-1">Risk of over-correction at low load</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Automatic PFC</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Controller switches capacitor steps</li>
                  <li className="pl-1">Maintains target pf under varying load</li>
                  <li className="pl-1">Higher initial cost</li>
                  <li className="pl-1">Essential for variable loads</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design tip:</strong> Size automatic banks to 110-115% of calculated kVAr to allow for load growth and measurement tolerance.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Power Factor Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A building draws 300A at 400V three-phase. Real power measured is 160kW. Calculate power factor.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Apparent power: S = √3 × V × I</p>
                <p>S = 1.732 × 400 × 300 = 207.8 kVA</p>
                <p className="mt-2">Power factor: pf = kW / kVA</p>
                <p>pf = 160 / 207.8 = <strong>0.77 lagging</strong></p>
                <p className="mt-2 text-orange-400">→ Below 0.95 requirement - PFC needed</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: PFC Sizing</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> The 160kW load at 0.77 pf needs correction to 0.95. Calculate capacitor bank size.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Original angle: φ₁ = cos⁻¹(0.77) = 39.6°</p>
                <p>Target angle: φ₂ = cos⁻¹(0.95) = 18.2°</p>
                <p className="mt-2">kVAr = kW × (tan φ₁ - tan φ₂)</p>
                <p>kVAr = 160 × (tan 39.6° - tan 18.2°)</p>
                <p>kVAr = 160 × (0.828 - 0.329)</p>
                <p>kVAr = 160 × 0.499 = <strong>79.8 kVAr</strong></p>
                <p className="mt-2 text-green-400">→ Specify 80-90 kVAr automatic bank</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Current Reduction</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> After PFC, power factor improves from 0.77 to 0.95. What is the new current?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Original: S₁ = 160 / 0.77 = 207.8 kVA</p>
                <p>Original current: 207.8 × 1000 / (√3 × 400) = 300A</p>
                <p className="mt-2">After PFC: S₂ = 160 / 0.95 = 168.4 kVA</p>
                <p>New current: 168.4 × 1000 / (√3 × 400) = <strong>243A</strong></p>
                <p className="mt-2">Reduction = (300 - 243) / 300 × 100 = <strong>19% reduction</strong></p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">PFC Design Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Measure or calculate existing power factor</li>
                <li className="pl-1">Determine target power factor (typically 0.95)</li>
                <li className="pl-1">Calculate required kVAr correction</li>
                <li className="pl-1">Select fixed or automatic system</li>
                <li className="pl-1">Consider harmonic environment (may need detuned reactors)</li>
                <li className="pl-1">Locate equipment for effective correction</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Formulas</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>pf = kW / kVA</strong> = cos φ</li>
                <li className="pl-1"><strong>kVA = √(kW² + kVAr²)</strong></li>
                <li className="pl-1"><strong>kVAr = kW × tan φ</strong></li>
                <li className="pl-1"><strong>Correction = kW × (tan φ₁ - tan φ₂)</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Over-correction</strong> — Leading pf can cause voltage rise</li>
                <li className="pl-1"><strong>Fixed PFC on variable loads</strong> — Leads to over-correction at low load</li>
                <li className="pl-1"><strong>Ignoring harmonics</strong> — Can damage capacitors without detuning</li>
                <li className="pl-1"><strong>Installing after VSD</strong> — VSDs need special consideration</li>
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
                <p className="font-medium text-white mb-1">Power Factor Basics</p>
                <ul className="space-y-0.5">
                  <li>pf = kW/kVA = cos φ</li>
                  <li>Lagging pf: Inductive loads (motors)</li>
                  <li>Leading pf: Capacitive or over-correction</li>
                  <li>Target: 0.95 or better</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">PFC Sizing</p>
                <ul className="space-y-0.5">
                  <li>kVAr = kW × (tan φ₁ - tan φ₂)</li>
                  <li>Fixed: Constant loads only</li>
                  <li>Automatic: Variable loads</li>
                  <li>Allow 10-15% margin</li>
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
            <Link to="../h-n-c-module4-section1-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Diversity Factors
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section1-4">
              Next: Harmonic Assessment
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule4Section1_3;
