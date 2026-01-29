import { ArrowLeft, Calculator, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Ohm's Law - HNC Module 3 Section 1.2";
const DESCRIPTION = "Master Ohm's Law (V=IR) and its applications in building services: cable sizing, voltage drop calculations, and load analysis for electrical installations.";

const quickCheckQuestions = [
  {
    id: "ohm-relationship",
    question: "According to Ohm's Law, if voltage remains constant and resistance doubles, what happens to current?",
    options: ["Current doubles", "Current halves", "Current stays the same", "Current quadruples"],
    correctIndex: 1,
    explanation: "From I = V/R, if R doubles while V stays constant, current is halved. This is an inverse relationship between current and resistance."
  },
  {
    id: "basic-calculation",
    question: "A 230V circuit has a load resistance of 23Ω. What current flows?",
    options: ["5A", "10A", "23A", "230A"],
    correctIndex: 1,
    explanation: "Using I = V/R: I = 230V ÷ 23Ω = 10A. This is a straightforward application of Ohm's Law."
  },
  {
    id: "non-ohmic",
    question: "What type of component does NOT follow Ohm's Law?",
    options: ["Fixed resistor", "Copper wire", "LED", "Heating element"],
    correctIndex: 2,
    explanation: "LEDs are non-linear (non-ohmic) devices - their resistance changes with current. Fixed resistors, copper wire and heating elements are approximately linear (ohmic) devices."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What does Ohm's Law state?",
    options: [
      "Voltage equals current divided by resistance",
      "Voltage equals current multiplied by resistance",
      "Resistance equals voltage multiplied by current",
      "Current equals voltage multiplied by resistance"
    ],
    correctAnswer: 1,
    explanation: "Ohm's Law states V = I × R (Voltage equals Current times Resistance). This fundamental relationship governs all resistive circuits."
  },
  {
    id: 2,
    question: "A 2kW heater operates at 230V. What is its operating resistance?",
    options: ["8.7Ω", "26.5Ω", "115Ω", "460Ω"],
    correctAnswer: 1,
    explanation: "First find current: I = P/V = 2000/230 = 8.7A. Then R = V/I = 230/8.7 = 26.5Ω. Alternatively, R = V²/P = 230²/2000 = 26.45Ω"
  },
  {
    id: 3,
    question: "If the voltage across a fixed resistor increases by 50%, what happens to the current?",
    options: ["Decreases by 50%", "Increases by 50%", "Doubles", "Stays the same"],
    correctAnswer: 1,
    explanation: "For a fixed (ohmic) resistor, current is directly proportional to voltage (I = V/R). If V increases by 50%, current also increases by 50%."
  },
  {
    id: 4,
    question: "Why do NTC thermistors not follow Ohm's Law exactly?",
    options: [
      "They only work on AC",
      "Their resistance changes with temperature",
      "They require DC supply",
      "They have no resistance"
    ],
    correctAnswer: 1,
    explanation: "NTC (Negative Temperature Coefficient) thermistors have resistance that decreases as temperature increases. This non-linear behaviour means they don't follow Ohm's Law strictly."
  },
  {
    id: 5,
    question: "A cable with 0.5Ω resistance carries 20A. What is the voltage drop?",
    options: ["0.025V", "2.5V", "10V", "40V"],
    correctAnswer: 2,
    explanation: "Using V = I × R: V = 20A × 0.5Ω = 10V. This voltage is 'dropped' across the cable resistance."
  },
  {
    id: 6,
    question: "What is the maximum voltage drop allowed for power circuits in BS 7671?",
    options: ["3%", "4%", "5%", "10%"],
    correctAnswer: 2,
    explanation: "BS 7671 allows a maximum 5% voltage drop for power circuits (11.5V at 230V). Lighting circuits are limited to 3%."
  },
  {
    id: 7,
    question: "A 40m cable run supplies a 13A load. Using 2.5mm² cable (7.41mΩ/m), what is the voltage drop?",
    options: ["3.85V", "7.7V", "15.4V", "30.8V"],
    correctAnswer: 1,
    explanation: "Total cable length = 40m × 2 = 80m (go and return). R = 80 × 0.00741 = 0.593Ω. Vd = 13 × 0.593 = 7.7V"
  },
  {
    id: 8,
    question: "Which rearrangement of Ohm's Law calculates current?",
    options: ["I = VR", "I = V/R", "I = R/V", "I = V + R"],
    correctAnswer: 1,
    explanation: "Rearranging V = IR gives I = V/R. Current equals voltage divided by resistance."
  },
  {
    id: 9,
    question: "A LED has a forward voltage of 3V and requires 20mA. What series resistor is needed from a 24V DC supply?",
    options: ["105Ω", "150Ω", "1050Ω", "1200Ω"],
    correctAnswer: 2,
    explanation: "Voltage across resistor = 24V - 3V = 21V. R = V/I = 21V / 0.02A = 1050Ω"
  },
  {
    id: 10,
    question: "Why is Ohm's Law important for earth fault loop impedance (Zs) calculations?",
    options: [
      "It determines cable colour",
      "It calculates fault current: If = U₀/Zs",
      "It sets the supply voltage",
      "It defines cable sizes"
    ],
    correctAnswer: 1,
    explanation: "Fault current If = U₀/Zs uses Ohm's Law where U₀ is nominal voltage and Zs is earth fault loop impedance. This determines if protective devices will operate fast enough."
  }
];

const faqs = [
  {
    question: "Why is Ohm's Law so important in electrical engineering?",
    answer: "Ohm's Law is the foundation of circuit analysis. Every calculation involving voltage, current and resistance uses this relationship - from sizing cables to determining protective device operation. Understanding V = IR is essential for all electrical work."
  },
  {
    question: "What is an 'ohmic' versus 'non-ohmic' device?",
    answer: "Ohmic devices (like fixed resistors and copper conductors) have constant resistance regardless of voltage or current - they follow Ohm's Law linearly. Non-ohmic devices (LEDs, thermistors, diodes) have resistance that varies with conditions, so their V-I relationship is non-linear."
  },
  {
    question: "How do I remember the three forms of Ohm's Law?",
    answer: "Use the VIR triangle: V at top, I and R at bottom. Cover what you want to find: V = I×R, I = V÷R, R = V÷I. Or remember 'Vodka Is Refreshing' for V = I × R."
  },
  {
    question: "Does cable temperature affect Ohm's Law calculations?",
    answer: "Yes - copper resistance increases with temperature. At 70°C (typical operating temperature), resistance is about 20% higher than at 20°C. BS 7671 tables account for this, but for precise calculations use the 1.2 correction factor."
  },
  {
    question: "Why do we multiply cable length by 2 for voltage drop?",
    answer: "Current flows out through the line conductor and returns through the neutral (or earth for fault current). Both conductors have resistance, so total cable resistance = resistance per metre × length × 2."
  }
];

const HNCModule3Section1_2 = () => {
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
            <Calculator className="h-4 w-4" />
            <span>Module 3.1.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Ohm's Law
          </h1>
          <p className="text-white/80">
            The fundamental relationship between voltage, current and resistance that governs all electrical circuits
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>V = I × R</strong> - The fundamental equation</li>
              <li className="pl-1">Rearranged: <strong>I = V/R</strong> and <strong>R = V/I</strong></li>
              <li className="pl-1">Applies to linear (ohmic) resistive elements</li>
              <li className="pl-1">Foundation for all circuit calculations</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Applications</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Cable sizing:</strong> Voltage drop calculations</li>
              <li className="pl-1"><strong>Load current:</strong> Protection device selection</li>
              <li className="pl-1"><strong>Fault current:</strong> Earth loop impedance</li>
              <li className="pl-1"><strong>Controls:</strong> Sensor circuit design</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "State and apply Ohm's Law in all three forms (V=IR, I=V/R, R=V/I)",
              "Distinguish between ohmic and non-ohmic devices",
              "Calculate voltage drop in cables using Ohm's Law",
              "Apply Ohm's Law to fault current calculations",
              "Design current-limiting circuits for LEDs and sensors",
              "Understand the temperature dependence of resistance"
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

        {/* Section 1: Ohm's Law Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Ohm's Law Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Georg Ohm discovered in 1827 that current through a conductor is directly proportional
              to the voltage across it, with resistance as the constant of proportionality.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-4">The Three Forms of Ohm's Law</p>
              <div className="grid grid-cols-3 gap-3 text-center text-sm">
                <div className="p-3 rounded bg-black/30 border border-elec-yellow/30">
                  <p className="text-xl font-bold text-elec-yellow mb-1">V = I × R</p>
                  <p className="text-white/70 text-xs">Find voltage</p>
                </div>
                <div className="p-3 rounded bg-black/30 border border-blue-500/30">
                  <p className="text-xl font-bold text-blue-400 mb-1">I = V / R</p>
                  <p className="text-white/70 text-xs">Find current</p>
                </div>
                <div className="p-3 rounded bg-black/30 border border-green-500/30">
                  <p className="text-xl font-bold text-green-400 mb-1">R = V / I</p>
                  <p className="text-white/70 text-xs">Find resistance</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-3">The VIR Triangle:</p>
              <div className="bg-white/5 p-4 rounded mb-3 flex flex-col items-center">
                <div className="relative w-32 h-28">
                  {/* Triangle shape */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 flex items-center justify-center">
                    <span className="text-2xl font-bold text-elec-yellow">V</span>
                  </div>
                  <div className="absolute bottom-0 left-2 w-12 h-12 flex items-center justify-center">
                    <span className="text-2xl font-bold text-blue-400">I</span>
                  </div>
                  <div className="absolute bottom-0 right-2 w-12 h-12 flex items-center justify-center">
                    <span className="text-2xl font-bold text-green-400">R</span>
                  </div>
                  {/* Division line */}
                  <div className="absolute top-12 left-1/2 -translate-x-1/2 w-20 h-0.5 bg-white/40"></div>
                  {/* Multiplication symbol */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white/60 text-lg">×</div>
                </div>
                <p className="text-xs text-white/60 mt-2 text-center">Cover what you want to find - the remaining show the formula</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Relationships:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Current is <strong>directly proportional</strong> to voltage (double V, double I)</li>
                <li className="pl-1">Current is <strong>inversely proportional</strong> to resistance (double R, halve I)</li>
                <li className="pl-1">These relationships only hold for <strong>ohmic (linear)</strong> components</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Ohmic vs Non-Ohmic */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Ohmic vs Non-Ohmic Devices
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Not all components follow Ohm's Law. Understanding which devices are linear helps you
              know when to apply simple calculations versus when more complex analysis is needed.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-green-500/10 border-l-2 border-green-500/50">
                <p className="text-sm font-medium text-green-400 mb-2">Ohmic (Linear) Devices</p>
                <p className="text-xs text-white/80 mb-2">Resistance remains constant:</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Fixed resistors</strong> - Carbon, metal film</li>
                  <li className="pl-1"><strong>Copper conductors</strong> - At constant temp</li>
                  <li className="pl-1"><strong>Heating elements</strong> - Approximately</li>
                  <li className="pl-1"><strong>Potentiometers</strong> - At fixed setting</li>
                </ul>
                <p className="text-xs text-white/60 mt-2">V-I Graph: Straight line through origin</p>
              </div>
              <div className="p-4 rounded-lg bg-amber-500/10 border-l-2 border-amber-500/50">
                <p className="text-sm font-medium text-amber-400 mb-2">Non-Ohmic (Non-Linear) Devices</p>
                <p className="text-xs text-white/80 mb-2">Resistance varies with conditions:</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>LEDs</strong> - R drops when forward biased</li>
                  <li className="pl-1"><strong>Thermistors</strong> - NTC: R decreases with temp</li>
                  <li className="pl-1"><strong>Diodes</strong> - High R reverse, low R forward</li>
                  <li className="pl-1"><strong>Lamps</strong> - R increases when hot</li>
                </ul>
                <p className="text-xs text-white/60 mt-2">V-I Graph: Curved line, slope varies</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>BMS Note:</strong> Temperature sensors often use NTC thermistors (10kΩ at 25°C is common).
              Their non-linear response requires lookup tables or linearisation for accurate measurement.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 3: Building Services Applications */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Building Services Applications
          </h2>
          <div className="text-white space-y-6 leading-relaxed">

            {/* Cable Voltage Drop */}
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-blue-400 mb-3">Application 1: Cable Voltage Drop</h3>
              <p className="text-sm text-white mb-3">
                Every cable has resistance. When current flows, Ohm's Law dictates that voltage is
                dropped across this resistance.
              </p>
              <div className="bg-black/30 p-3 rounded text-center mb-3">
                <p className="font-mono text-lg"><strong>Voltage Drop = I × R<sub>cable</sub> × 2</strong></p>
                <p className="text-xs text-white/60 mt-1">(×2 accounts for line and neutral conductors)</p>
              </div>
              <p className="text-sm font-medium text-white mb-2">Worked Example:</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p><strong>Given:</strong> 20A load, 30m cable run, 2.5mm² copper</p>
                <p>Cable resistance: 7.41 mΩ/m</p>
                <p className="mt-2">R<sub>total</sub> = 30m × 2 × 7.41mΩ/m = 0.445Ω</p>
                <p>V<sub>drop</sub> = 20A × 0.445Ω = <strong>8.9V</strong></p>
                <p className="mt-2">As percentage of 230V: (8.9/230) × 100 = <strong>3.9%</strong></p>
                <p className="text-green-400 mt-1">✓ Within 5% limit for power circuits</p>
              </div>
              <div className="mt-3 text-xs text-white/70">
                <strong>BS 7671 Limits:</strong> Lighting circuits: 3% (6.9V) | Other circuits: 5% (11.5V)
              </div>
            </div>

            {/* Fault Current */}
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-red-400 mb-3">Application 2: Earth Fault Loop Impedance</h3>
              <p className="text-sm text-white mb-3">
                Ohm's Law calculates fault current, which determines if protective devices operate fast enough.
              </p>
              <div className="bg-black/30 p-3 rounded text-center mb-3">
                <p className="font-mono text-lg"><strong>I<sub>f</sub> = U₀ / Z<sub>s</sub></strong></p>
                <p className="text-xs text-white/60 mt-1">Fault current = Nominal voltage ÷ Earth fault loop impedance</p>
              </div>
              <p className="text-sm font-medium text-white mb-2">Worked Example:</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p><strong>Given:</strong> Z<sub>s</sub> measured = 1.2Ω, U₀ = 230V</p>
                <p className="mt-2">Fault current I<sub>f</sub> = 230V / 1.2Ω = <strong>192A</strong></p>
                <p className="mt-2">For a 32A Type B MCB, requires 160A (5× In)</p>
                <p className="text-green-400 mt-1">✓ 192A &gt; 160A, MCB will trip within 0.4s</p>
              </div>
              <p className="text-xs text-red-400/80 mt-3">
                <strong>Critical:</strong> If Zs is too high, fault current is too low, and the protective device may not operate in time.
              </p>
            </div>

            {/* LED Current Limiting */}
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-green-400 mb-3">Application 3: LED Current Limiting</h3>
              <p className="text-sm text-white mb-3">
                LEDs require current-limiting resistors because they are non-ohmic - without limiting, current would destroy them.
              </p>
              <div className="bg-black/30 p-3 rounded text-center mb-3">
                <p className="font-mono text-lg"><strong>R = (V<sub>supply</sub> - V<sub>LED</sub>) / I<sub>LED</sub></strong></p>
              </div>
              <p className="text-sm font-medium text-white mb-2">Worked Example:</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p><strong>Given:</strong> 24V DC supply, green LED (V<sub>f</sub>=2.2V, I=20mA)</p>
                <p className="mt-2">Voltage across resistor = 24V - 2.2V = 21.8V</p>
                <p>R = 21.8V / 0.02A = <strong>1090Ω</strong></p>
                <p className="mt-1">Use nearest standard value: <strong>1.1kΩ</strong></p>
                <p className="mt-2">Power dissipation: P = I²R = 0.02² × 1100 = 0.44W</p>
                <p className="text-white/60">Use 0.5W or 1W rated resistor</p>
              </div>
              <p className="text-xs text-white/70 mt-3">
                <strong>BMS Application:</strong> Status indicator LEDs on control panels commonly use this calculation.
              </p>
            </div>

          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Temperature Effects */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Temperature Effects on Resistance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Conductor resistance increases with temperature. This is important for cable sizing and testing.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-purple-400 mb-3">Temperature Coefficient of Copper</p>
              <div className="bg-black/30 p-3 rounded text-center mb-3">
                <p className="font-mono">R<sub>t</sub> = R<sub>20</sub> × [1 + α(t - 20)]</p>
                <p className="text-xs text-white/60 mt-1">Where α = 0.00393/°C for copper</p>
              </div>

              <p className="text-sm font-medium text-white mb-2">Practical Implications:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Cables at 70°C have ~20% higher resistance than at 20°C</li>
                <li className="pl-1">Use factor of 1.2 to convert measured R to operating R</li>
                <li className="pl-1">BS 7671 tables already account for this in current ratings</li>
                <li className="pl-1">Cold cables have lower resistance - relevant for motor starting</li>
              </ul>

              <p className="text-sm font-medium text-white mb-2 mt-4">Worked Example:</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Cable measured at 20°C: R = 0.5Ω</p>
                <p>Operating at 70°C: R = 0.5 × [1 + 0.00393 × 50]</p>
                <p>R = 0.5 × 1.197 = <strong>0.6Ω</strong></p>
                <p className="text-white/60 mt-1">(Or use quick factor: 0.5 × 1.2 = 0.6Ω)</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Ohm's Law Applications</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>V = IR</strong> — Calculate voltage drop in cables</li>
                <li className="pl-1"><strong>I = V/R</strong> — Calculate load current or fault current</li>
                <li className="pl-1"><strong>R = V/I</strong> — Determine load resistance from measurements</li>
                <li className="pl-1">Always multiply cable length by 2 for single-phase circuits</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Forgetting to double cable length</strong> — Both conductors have resistance</li>
                <li className="pl-1"><strong>Assuming LEDs are ohmic</strong> — They need current limiting</li>
                <li className="pl-1"><strong>Not accounting for temperature</strong> — Use 1.2 factor for 70°C</li>
                <li className="pl-1"><strong>Confusing mΩ with Ω</strong> — 7.41mΩ = 0.00741Ω in calculations</li>
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
                <p className="font-medium text-white mb-1">Ohm's Law Forms</p>
                <ul className="space-y-0.5">
                  <li>V = I × R — Find voltage</li>
                  <li>I = V / R — Find current</li>
                  <li>R = V / I — Find resistance</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Voltage Drop Limits</p>
                <ul className="space-y-0.5">
                  <li>Power circuits: 5% (11.5V)</li>
                  <li>Lighting circuits: 3% (6.9V)</li>
                  <li>Formula: Vd = I × R × 2</li>
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
            <Link to="../h-n-c-module3-section1-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section1-3">
              Next: Series Circuits
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule3Section1_2;
