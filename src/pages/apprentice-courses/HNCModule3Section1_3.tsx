import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Series Circuits - HNC Module 3 Section 1.3";
const DESCRIPTION = "Understand series circuit behaviour: current distribution, voltage division, total resistance calculations, and practical building services applications.";

const quickCheckQuestions = [
  {
    id: "series-current",
    question: "In a series circuit with three resistors, the current through R2 is 2A. What is the current through R1 and R3?",
    options: ["1A through each", "2A through each", "Depends on resistance values", "6A total split between them"],
    correctIndex: 1,
    explanation: "In a series circuit, current is the SAME through all components. If 2A flows through R2, then 2A also flows through R1 and R3 - this is the defining characteristic of series circuits."
  },
  {
    id: "voltage-divider",
    question: "A 24V supply feeds two resistors in series: 100Ω and 200Ω. What voltage appears across the 200Ω resistor?",
    options: ["8V", "12V", "16V", "24V"],
    correctIndex: 2,
    explanation: "Using the voltage divider rule: V2 = VT × (R2/RT) = 24V × (200/300) = 24V × 0.667 = 16V. The larger resistor drops the larger voltage."
  },
  {
    id: "total-resistance",
    question: "Three resistors of 10Ω, 22Ω, and 47Ω are connected in series. What is the total resistance?",
    options: ["26.3Ω", "47Ω", "79Ω", "6.1Ω"],
    correctIndex: 2,
    explanation: "In series circuits, total resistance is simply the sum: RT = R1 + R2 + R3 = 10 + 22 + 47 = 79Ω. Series resistance always increases total resistance."
  },
  {
    id: "emergency-lighting",
    question: "An emergency lighting battery pack has 10 cells in series, each 1.2V. What is the total battery voltage?",
    options: ["1.2V", "6V", "12V", "120V"],
    correctIndex: 2,
    explanation: "Voltage sources in series add together: VT = 10 × 1.2V = 12V. This is why NiCd/NiMH emergency lighting packs use multiple cells in series to achieve the required voltage."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the defining characteristic of a series circuit?",
    options: [
      "Voltage is the same across all components",
      "Current is the same through all components",
      "Resistance is the same for all components",
      "Power is equally distributed"
    ],
    correctAnswer: 1,
    explanation: "In a series circuit, there is only one path for current flow, so the current must be identical through every component. This is the fundamental property of series circuits."
  },
  {
    id: 2,
    question: "Three resistors of 15Ω, 27Ω, and 33Ω are connected in series to a 230V supply. What current flows?",
    options: ["1.53A", "3.07A", "6.13A", "17.25A"],
    correctAnswer: 1,
    explanation: "RT = 15 + 27 + 33 = 75Ω. Using Ohm's Law: I = V/R = 230/75 = 3.07A. This current flows through all three resistors."
  },
  {
    id: 3,
    question: "In a series circuit, how does voltage distribute across components?",
    options: [
      "Equally across all components",
      "Inversely proportional to resistance",
      "Proportional to resistance",
      "Randomly distributed"
    ],
    correctAnswer: 2,
    explanation: "Voltage divides proportionally to resistance. Larger resistors drop more voltage (V = IR, and since I is constant, V is proportional to R)."
  },
  {
    id: 4,
    question: "A PIR sensor circuit has three series resistors: 4.7kΩ, 10kΩ, and 2.2kΩ from a 12V supply. What voltage appears across the 10kΩ resistor?",
    options: ["3.33V", "5.92V", "7.10V", "10V"],
    correctAnswer: 2,
    explanation: "RT = 4.7 + 10 + 2.2 = 16.9kΩ. V10k = 12V × (10/16.9) = 12V × 0.592 = 7.10V"
  },
  {
    id: 5,
    question: "What happens to total resistance when more resistors are added in series?",
    options: [
      "Total resistance decreases",
      "Total resistance increases",
      "Total resistance stays the same",
      "Depends on the voltage"
    ],
    correctAnswer: 1,
    explanation: "Adding resistors in series always increases total resistance because RT = R1 + R2 + R3 + ... Each additional resistor adds to the total."
  },
  {
    id: 6,
    question: "An emergency lighting unit contains 8 NiCd cells (1.2V each) in series. During discharge, each cell drops to 1.0V. What is the pack voltage?",
    options: ["1.0V", "8.0V", "9.6V", "12.8V"],
    correctAnswer: 1,
    explanation: "With 8 cells at 1.0V each in series: VT = 8 × 1.0V = 8.0V. This voltage drop indicates the battery needs recharging."
  },
  {
    id: 7,
    question: "A voltage divider uses R1 = 1kΩ and R2 = 2kΩ from a 9V supply. What voltage is available at the junction (across R2)?",
    options: ["3V", "4.5V", "6V", "9V"],
    correctAnswer: 2,
    explanation: "V2 = VT × (R2/RT) = 9V × (2kΩ/3kΩ) = 9V × 0.667 = 6V. The output is taken across R2."
  },
  {
    id: 8,
    question: "In a series circuit with a 12V supply, if one component drops 5V and another drops 3V, what must the third component drop?",
    options: ["2V", "4V", "8V", "12V"],
    correctAnswer: 1,
    explanation: "Kirchhoff's Voltage Law states that the sum of voltage drops equals the supply voltage. 5V + 3V + V3 = 12V, therefore V3 = 4V."
  },
  {
    id: 9,
    question: "Why are fuses connected in series with the load they protect?",
    options: [
      "So voltage is the same through both",
      "So current flows through both - if fuse blows, circuit opens",
      "To reduce power consumption",
      "To increase the voltage available"
    ],
    correctAnswer: 1,
    explanation: "The fuse must carry the same current as the load (series connection). When current exceeds the rating, the fuse element melts, breaking the circuit and stopping current flow to the load."
  },
  {
    id: 10,
    question: "A cable has resistance of 0.1Ω per metre. For a 50m single-phase run, what is the total cable resistance?",
    options: ["5Ω", "10Ω", "50Ω", "100Ω"],
    correctAnswer: 1,
    explanation: "Cable resistance is in series: line conductor (50m × 0.1Ω = 5Ω) + neutral conductor (50m × 0.1Ω = 5Ω) = 10Ω total. Always remember both conductors in single-phase circuits."
  }
];

const faqs = [
  {
    question: "How do I remember the difference between series and parallel circuits?",
    answer: "Series = Single path (current has no choice but to flow through every component). Think of a string of Christmas lights where if one bulb fails, they all go out. Parallel = Multiple paths (current can choose different routes). Each component has its own direct connection to the supply."
  },
  {
    question: "Why does voltage divide in a series circuit?",
    answer: "Because energy is transferred as current flows through each resistance. Think of it like water flowing through pipes - pressure (voltage) drops as the water passes through restrictions (resistors). The larger the restriction, the greater the pressure drop. Mathematically, V = IR, and since I is constant in series, voltage is proportional to resistance."
  },
  {
    question: "What practical applications use series circuits in building services?",
    answer: "Emergency lighting battery packs (cells in series for higher voltage), fuses and circuit breakers (in series with protected circuits), voltage dividers in sensor circuits, cable resistance (inherently in series), and some LED strings. However, most power distribution uses parallel circuits for redundancy."
  },
  {
    question: "Why is total series resistance just the sum of individual resistances?",
    answer: "Because the same current must flow through each resistor in turn. The total opposition to current flow is cumulative - each resistor adds its resistance to the path. There is no alternative path, so the current faces all the resistances sequentially."
  },
  {
    question: "How do I calculate voltage drop across a specific resistor in series?",
    answer: "Two methods: (1) Calculate current first using I = VT/RT, then use V = I × R for the specific resistor. (2) Use the voltage divider rule directly: V1 = VT × (R1/RT). Both give the same answer - the divider rule is often quicker."
  },
  {
    question: "What happens if one component fails open in a series circuit?",
    answer: "The entire circuit stops working - current cannot flow because there is no complete path. This is why series circuits are used for safety devices (fuses, emergency stops) but not typically for power distribution where continuity of supply is important."
  }
];

const HNCModule3Section1_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section1">
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
            <span>Module 3.1.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Series Circuits
          </h1>
          <p className="text-white/80">
            Understanding how current, voltage, and resistance behave when components share a single path
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Current:</strong> Same through all components (I<sub>T</sub> = I<sub>1</sub> = I<sub>2</sub> = I<sub>3</sub>)</li>
              <li><strong>Voltage:</strong> Divides across components (V<sub>T</sub> = V<sub>1</sub> + V<sub>2</sub> + V<sub>3</sub>)</li>
              <li><strong>Resistance:</strong> Adds up (R<sub>T</sub> = R<sub>1</sub> + R<sub>2</sub> + R<sub>3</sub>)</li>
              <li>Single path for current flow</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Emergency lighting:</strong> Battery cells in series</li>
              <li><strong>Protection:</strong> Fuses/MCBs in series with loads</li>
              <li><strong>Sensors:</strong> Voltage divider reference circuits</li>
              <li><strong>Cables:</strong> Line + neutral resistance in series</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify the key characteristics of series circuits",
              "Calculate total resistance in series combinations",
              "Apply the voltage divider rule to practical circuits",
              "Analyse current flow in series configurations",
              "Design voltage divider circuits for sensor applications",
              "Understand series circuit applications in building services"
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

        {/* Section 01: Series Circuit Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Series Circuit Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A series circuit has only one path for current to flow. Every electron that leaves
              the supply must pass through each component in turn before returning. This single-path
              characteristic determines all the behaviour of series circuits.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-4">The Three Rules of Series Circuits</p>
              <div className="grid md:grid-cols-3 gap-3 text-sm">
                <div className="p-3 rounded bg-black/30 border border-blue-500/30">
                  <p className="text-lg font-bold text-blue-400 mb-1">Current</p>
                  <p className="font-mono text-sm">I<sub>T</sub> = I<sub>1</sub> = I<sub>2</sub> = I<sub>3</sub></p>
                  <p className="text-white/70 text-xs mt-2">Same through all components</p>
                </div>
                <div className="p-3 rounded bg-black/30 border border-elec-yellow/30">
                  <p className="text-lg font-bold text-elec-yellow mb-1">Voltage</p>
                  <p className="font-mono text-sm">V<sub>T</sub> = V<sub>1</sub> + V<sub>2</sub> + V<sub>3</sub></p>
                  <p className="text-white/70 text-xs mt-2">Divides across components</p>
                </div>
                <div className="p-3 rounded bg-black/30 border border-green-500/30">
                  <p className="text-lg font-bold text-green-400 mb-1">Resistance</p>
                  <p className="font-mono text-sm">R<sub>T</sub> = R<sub>1</sub> + R<sub>2</sub> + R<sub>3</sub></p>
                  <p className="text-white/70 text-xs mt-2">Adds up (sum of all)</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-3">Why Current is Constant:</p>
              <p className="text-sm text-white/80 mb-3">
                Think of water flowing through a pipe with several restrictions. The same amount of
                water must pass through each restriction - it cannot accumulate or disappear. Similarly,
                charge is conserved in electrical circuits. Every coulomb entering a component must exit it.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">If 2A enters a resistor, 2A must exit it</li>
                <li className="pl-1">Charge cannot be stored in a resistor</li>
                <li className="pl-1">This is Kirchhoff's Current Law in action</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-3">Why Voltage Divides:</p>
              <p className="text-sm text-white/80 mb-3">
                Energy is transferred as current flows through each resistance. The voltage drop across
                each resistor represents the energy converted per coulomb of charge. Larger resistors
                convert more energy, so they have larger voltage drops.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Kirchhoff's Voltage Law: V<sub>supply</sub> = V<sub>1</sub> + V<sub>2</sub> + V<sub>3</sub></li>
                <li className="pl-1">Voltage is proportional to resistance (V = IR, I is constant)</li>
                <li className="pl-1">Larger resistors drop more voltage</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Calculating Total Resistance */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Calculating Total Resistance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Total resistance in a series circuit is simply the sum of all individual resistances.
              This is because the current must overcome each resistance in sequence - there is no
              alternative path.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Series Resistance Formula</p>
              <div className="bg-black/30 p-4 rounded text-center">
                <p className="text-2xl font-bold font-mono text-elec-yellow">R<sub>T</sub> = R<sub>1</sub> + R<sub>2</sub> + R<sub>3</sub> + ... + R<sub>n</sub></p>
                <p className="text-xs text-white/60 mt-2">Simply add all resistance values together</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Worked Example 1: Emergency Lighting Control Circuit</p>
              <div className="bg-black/30 p-4 rounded text-sm font-mono text-white/90">
                <p><strong>Given:</strong> Control circuit with 3 resistors in series:</p>
                <p>R<sub>1</sub> = 1.2kΩ, R<sub>2</sub> = 3.3kΩ, R<sub>3</sub> = 2.7kΩ</p>
                <p className="mt-3"><strong>Calculate total resistance:</strong></p>
                <p>R<sub>T</sub> = 1.2kΩ + 3.3kΩ + 2.7kΩ</p>
                <p className="text-elec-yellow">R<sub>T</sub> = <strong>7.2kΩ</strong></p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Worked Example 2: Cable Resistance</p>
              <div className="bg-black/30 p-4 rounded text-sm font-mono text-white/90">
                <p><strong>Given:</strong> 25m cable run, 2.5mm² copper (7.41mΩ/m)</p>
                <p>Single-phase circuit (line + neutral in series)</p>
                <p className="mt-3"><strong>Calculate total cable resistance:</strong></p>
                <p>Line conductor: 25m × 7.41mΩ/m = 0.185Ω</p>
                <p>Neutral conductor: 25m × 7.41mΩ/m = 0.185Ω</p>
                <p className="text-elec-yellow mt-2">R<sub>cable</sub> = 0.185 + 0.185 = <strong>0.37Ω</strong></p>
                <p className="text-white/60 mt-2">(Or simply: 25m × 2 × 7.41mΩ/m = 0.37Ω)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-blue-500/10 border-l-2 border-blue-500/50">
              <p className="text-sm font-medium text-blue-400 mb-2">Key Point</p>
              <p className="text-sm text-white/80">
                Series resistance is always <strong>greater than the largest individual resistance</strong>.
                Adding any resistance to a series circuit increases the total - there is no way to
                reduce it by adding components in series.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 03: Voltage Divider Rule */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Voltage Divider Rule
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The voltage divider rule allows direct calculation of the voltage across any resistor
              in a series circuit without first calculating the current. This is particularly useful
              for sensor circuits and reference voltage generation.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Voltage Divider Formula</p>
              <div className="bg-black/30 p-4 rounded text-center">
                <p className="text-xl font-bold font-mono text-elec-yellow">V<sub>x</sub> = V<sub>T</sub> × (R<sub>x</sub> / R<sub>T</sub>)</p>
                <p className="text-xs text-white/60 mt-2">Voltage across any resistor = Total voltage × (that resistance / total resistance)</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Worked Example 3: PIR Sensor Reference Voltage</p>
              <div className="bg-black/30 p-4 rounded text-sm font-mono text-white/90">
                <p><strong>Given:</strong> 12V DC supply, need 4V reference for comparator</p>
                <p>Using R<sub>1</sub> = 2kΩ (top) and R<sub>2</sub> = 1kΩ (bottom)</p>
                <p className="mt-3"><strong>Calculate output voltage (across R<sub>2</sub>):</strong></p>
                <p>R<sub>T</sub> = 2kΩ + 1kΩ = 3kΩ</p>
                <p>V<sub>out</sub> = 12V × (1kΩ / 3kΩ)</p>
                <p>V<sub>out</sub> = 12V × 0.333</p>
                <p className="text-elec-yellow">V<sub>out</sub> = <strong>4V</strong> ✓</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Worked Example 4: Two-Resistor Divider Design</p>
              <div className="bg-black/30 p-4 rounded text-sm font-mono text-white/90">
                <p><strong>Task:</strong> Design a divider to give 5V from 24V DC (BMS sensor input)</p>
                <p className="mt-3"><strong>Method:</strong></p>
                <p>V<sub>out</sub>/V<sub>in</sub> = R<sub>2</sub>/(R<sub>1</sub>+R<sub>2</sub>) = 5/24 = 0.208</p>
                <p className="mt-2">Choose R<sub>2</sub> = 10kΩ</p>
                <p>0.208 = 10k/(R<sub>1</sub>+10k)</p>
                <p>R<sub>1</sub> + 10k = 10k/0.208 = 48.1kΩ</p>
                <p className="text-elec-yellow">R<sub>1</sub> = <strong>38.1kΩ</strong> (use 39kΩ standard value)</p>
                <p className="text-white/60 mt-2">Check: V<sub>out</sub> = 24 × (10/49) = 4.9V ✓</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-green-500/10 border-l-2 border-green-500/50">
                <p className="text-sm font-medium text-green-400 mb-2">Voltage Divider Advantages</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Simple, passive, no power supply needed</li>
                  <li className="pl-1">Creates reference voltages for sensors</li>
                  <li className="pl-1">Scales high voltages for measurement</li>
                  <li className="pl-1">Level shifting between systems</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-amber-500/10 border-l-2 border-amber-500/50">
                <p className="text-sm font-medium text-amber-400 mb-2">Voltage Divider Limitations</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Output changes if load is connected</li>
                  <li className="pl-1">Wastes power (current flows constantly)</li>
                  <li className="pl-1">Not suitable for power delivery</li>
                  <li className="pl-1">Load must be high impedance</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Building Services Applications */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Building Services Applications
          </h2>
          <div className="text-white space-y-6 leading-relaxed">

            {/* Emergency Lighting Batteries */}
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-red-400 mb-3">Application 1: Emergency Lighting Battery Packs</h3>
              <p className="text-sm text-white mb-3">
                Emergency lighting units typically use NiCd or NiMH cells connected in series to
                achieve the required voltage. Each cell provides approximately 1.2V.
              </p>
              <div className="bg-black/30 p-3 rounded text-center mb-3">
                <p className="font-mono text-lg"><strong>V<sub>pack</sub> = n × V<sub>cell</sub></strong></p>
                <p className="text-xs text-white/60 mt-1">Pack voltage = number of cells × cell voltage</p>
              </div>
              <p className="text-sm font-medium text-white mb-2">Worked Example:</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p><strong>Given:</strong> Emergency luminaire requires 24V battery backup</p>
                <p>Using NiCd cells: 1.2V per cell (charged)</p>
                <p className="mt-2"><strong>Calculate cells required:</strong></p>
                <p>n = V<sub>required</sub> / V<sub>cell</sub> = 24V / 1.2V = <strong>20 cells</strong></p>
                <p className="mt-2"><strong>End of discharge (1.0V/cell):</strong></p>
                <p>V<sub>min</sub> = 20 × 1.0V = 20V</p>
                <p className="text-white/60 mt-1">Luminaire must operate from 20V to 24V range</p>
              </div>
            </div>

            {/* Control Circuit Sensing */}
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-blue-400 mb-3">Application 2: PIR Sensor Threshold Circuits</h3>
              <p className="text-sm text-white mb-3">
                PIR sensors use voltage dividers to set reference thresholds for motion detection
                comparators. The divider creates a stable reference voltage.
              </p>
              <p className="text-sm font-medium text-white mb-2">Worked Example:</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p><strong>Given:</strong> PIR circuit powered by 5V, needs 2.5V reference</p>
                <p>Using equal resistors: R<sub>1</sub> = R<sub>2</sub> = 10kΩ</p>
                <p className="mt-2"><strong>Verify reference voltage:</strong></p>
                <p>V<sub>ref</sub> = 5V × (10k / 20k) = 5V × 0.5 = <strong>2.5V</strong> ✓</p>
                <p className="mt-2"><strong>Current draw:</strong></p>
                <p>I = 5V / 20kΩ = 0.25mA (negligible for battery operation)</p>
              </div>
              <p className="text-xs text-white/70 mt-3">
                <strong>Design Note:</strong> High resistance values (10kΩ+) minimise current drain
                in battery-powered sensors.
              </p>
            </div>

            {/* Fuses and Protection */}
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-amber-400 mb-3">Application 3: Protective Devices in Series</h3>
              <p className="text-sm text-white mb-3">
                Fuses, MCBs, and RCBOs are always connected in series with the circuit they protect.
                This ensures the protective device carries the full load current.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm text-white/90">
                <p><strong>Series connection ensures:</strong></p>
                <ul className="list-disc list-outside ml-5 mt-2 space-y-1">
                  <li className="pl-1">Protective device sees full circuit current</li>
                  <li className="pl-1">When device operates, circuit is completely disconnected</li>
                  <li className="pl-1">No current can bypass the protection</li>
                  <li className="pl-1">Fault current must flow through the device</li>
                </ul>
              </div>
              <p className="text-xs text-amber-400/80 mt-3">
                <strong>Critical:</strong> A protective device in parallel would be ineffective -
                current would bypass it through the lower-resistance parallel path.
              </p>
            </div>

            {/* Control Panel LEDs */}
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-green-400 mb-3">Application 4: Control Panel Indicator LEDs</h3>
              <p className="text-sm text-white mb-3">
                Multiple LEDs can be connected in series from a higher voltage supply. The supply
                voltage must exceed the sum of all LED forward voltages.
              </p>
              <p className="text-sm font-medium text-white mb-2">Worked Example:</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p><strong>Given:</strong> 3 green LEDs (V<sub>f</sub>=2.2V each) from 24V DC</p>
                <p>Required current: 15mA per LED</p>
                <p className="mt-2"><strong>Calculate series resistor:</strong></p>
                <p>V<sub>LEDs</sub> = 3 × 2.2V = 6.6V</p>
                <p>V<sub>R</sub> = 24V - 6.6V = 17.4V</p>
                <p>R = 17.4V / 0.015A = <strong>1160Ω</strong></p>
                <p className="mt-1">Use 1.2kΩ standard value (I = 14.5mA)</p>
                <p className="mt-2"><strong>Power dissipation:</strong></p>
                <p>P<sub>R</sub> = 0.0145² × 1200 = 0.25W (use 0.5W resistor)</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Series Circuit Calculations</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Total resistance:</strong> Simply add all values (R<sub>T</sub> = R<sub>1</sub> + R<sub>2</sub> + ...)</li>
                <li className="pl-1"><strong>Current:</strong> Calculate once, applies everywhere (I = V<sub>T</sub>/R<sub>T</sub>)</li>
                <li className="pl-1"><strong>Voltage drops:</strong> Use V = IR for each component, or voltage divider rule</li>
                <li className="pl-1"><strong>Cable resistance:</strong> Remember to double for single-phase (line + neutral)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-blue-400/80 mb-2">Voltage Divider Design Tips</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Choose resistor values 10× higher than load impedance minimum</li>
                <li className="pl-1">Use 1% tolerance resistors for precision applications</li>
                <li className="pl-1">Consider temperature coefficient for outdoor installations</li>
                <li className="pl-1">Add decoupling capacitor for noise-sensitive circuits</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Forgetting cable return path:</strong> Always multiply by 2 for single-phase</li>
                <li className="pl-1"><strong>Loading voltage dividers:</strong> Connected loads change the output voltage</li>
                <li className="pl-1"><strong>Mixing units:</strong> Convert all to same units (kΩ, Ω, mΩ) before adding</li>
                <li className="pl-1"><strong>Assuming parallel behaviour:</strong> Series current is constant, not voltage</li>
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
                <p className="font-medium text-white mb-1">Series Circuit Rules</p>
                <ul className="space-y-0.5">
                  <li>Current: I<sub>T</sub> = I<sub>1</sub> = I<sub>2</sub> = I<sub>3</sub></li>
                  <li>Voltage: V<sub>T</sub> = V<sub>1</sub> + V<sub>2</sub> + V<sub>3</sub></li>
                  <li>Resistance: R<sub>T</sub> = R<sub>1</sub> + R<sub>2</sub> + R<sub>3</sub></li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Voltage Divider</p>
                <ul className="space-y-0.5">
                  <li>V<sub>x</sub> = V<sub>T</sub> × (R<sub>x</sub> / R<sub>T</sub>)</li>
                  <li>Output across bottom resistor</li>
                  <li>Load must be high impedance</li>
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
            <Link to="../h-n-c-module3-section1-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section1-4">
              Next: Parallel Circuits
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule3Section1_3;
