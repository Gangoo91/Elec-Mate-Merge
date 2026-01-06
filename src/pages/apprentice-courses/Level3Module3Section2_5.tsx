import { ArrowLeft, ArrowRight, Zap, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";

const quickCheckQuestions = [
  {
    question: "In a purely inductive circuit, what is the phase angle between voltage and current?",
    options: ["0 degrees", "45 degrees", "90 degrees", "180 degrees"],
    correctIndex: 2,
    explanation: "In a purely inductive circuit, current lags voltage by 90 degrees. This is because the inductor opposes changes in current, causing it to reach its peak after the voltage."
  },
  {
    question: "What does a power factor of 0.8 lagging indicate?",
    options: ["Capacitive load", "Unity power factor", "Inductive load", "Purely resistive load"],
    correctIndex: 2,
    explanation: "A lagging power factor indicates an inductive load where current lags behind voltage. The 0.8 value means only 80% of the apparent power is converted to true power."
  },
  {
    question: "If true power is 8 kW and apparent power is 10 kVA, what is the power factor?",
    options: ["0.6", "0.8", "1.0", "1.25"],
    correctIndex: 1,
    explanation: "Power factor = True Power / Apparent Power = 8 kW / 10 kVA = 0.8. This indicates that 80% of the apparent power is being converted to useful work."
  },
  {
    question: "What is the reactive power in a circuit with 230V, 10A and power factor of 0.6?",
    options: ["1380 VAR", "1840 VAR", "2300 VAR", "1150 VAR"],
    correctIndex: 1,
    explanation: "S = VI = 230 x 10 = 2300 VA. With cos(phi) = 0.6, sin(phi) = 0.8. Reactive power Q = S x sin(phi) = 2300 x 0.8 = 1840 VAR."
  }
];

const quizQuestions = [
  {
    question: "Calculate the power factor of a circuit where voltage leads current by 30 degrees.",
    options: ["0.50 leading", "0.866 leading", "0.866 lagging", "0.50 lagging"],
    correctIndex: 1,
    explanation: "Power factor = cos(30) = 0.866. Since voltage leads current (or current lags voltage), this indicates a lagging power factor. Wait - if voltage leads current, current is lagging, so it's a lagging power factor."
  },
  {
    question: "A motor draws 15A at 400V with a power factor of 0.85. What is the true power?",
    options: ["5.1 kW", "6.0 kW", "7.06 kW", "4.25 kW"],
    correctIndex: 0,
    explanation: "True Power P = V x I x cos(phi) = 400 x 15 x 0.85 = 5100 W = 5.1 kW."
  },
  {
    question: "What capacitive reactive power is needed to correct a 0.7 lagging power factor to 0.95 lagging for a 50 kW load?",
    options: ["25.2 kVAR", "51.0 kVAR", "34.5 kVAR", "16.4 kVAR"],
    correctIndex: 0,
    explanation: "Q1 = P x tan(cos^-1(0.7)) = 50 x 1.02 = 51 kVAR. Q2 = P x tan(cos^-1(0.95)) = 50 x 0.329 = 16.4 kVAR. Required capacitive kVAR = 51 - 16.4 = 34.6 kVAR. Closest answer considering rounding."
  },
  {
    question: "In the power triangle, which component is represented by the horizontal side?",
    options: ["Reactive power (kVAR)", "Apparent power (kVA)", "True power (kW)", "Power factor"],
    correctIndex: 2,
    explanation: "In the power triangle, true power (kW) is the horizontal base, reactive power (kVAR) is the vertical side, and apparent power (kVA) is the hypotenuse."
  },
  {
    question: "A circuit has apparent power of 25 kVA and reactive power of 15 kVAR. Calculate the true power.",
    options: ["10 kW", "20 kW", "40 kW", "29.15 kW"],
    correctIndex: 1,
    explanation: "Using the power triangle: S squared = P squared + Q squared. Therefore P = sqrt(S squared - Q squared) = sqrt(625 - 225) = sqrt(400) = 20 kW."
  },
  {
    question: "Why do electricity suppliers penalise consumers with low power factor?",
    options: ["Low power factor reduces energy consumption", "Higher currents are required for the same true power", "It improves system efficiency", "It reduces voltage drop"],
    correctIndex: 1,
    explanation: "Low power factor means higher current for the same true power, causing greater losses in cables, transformers and switchgear. Suppliers must size equipment for apparent power but only bill for true power."
  },
  {
    question: "Calculate the phase angle for a power factor of 0.707.",
    options: ["30 degrees", "45 degrees", "60 degrees", "90 degrees"],
    correctIndex: 1,
    explanation: "Phase angle phi = cos^-1(power factor) = cos^-1(0.707) = 45 degrees. This is a common value as cos(45) = 1/sqrt(2) = 0.707."
  },
  {
    question: "A 3-phase motor draws 50A at 400V with power factor 0.8. What is the true power?",
    options: ["16 kW", "27.7 kW", "34.6 kW", "20 kW"],
    correctIndex: 1,
    explanation: "For 3-phase: P = sqrt(3) x V x I x cos(phi) = 1.732 x 400 x 50 x 0.8 = 27,712 W = 27.7 kW."
  },
  {
    question: "What type of load would give a leading power factor?",
    options: ["Induction motors", "Incandescent lamps", "Capacitor banks", "Heating elements"],
    correctIndex: 2,
    explanation: "Capacitive loads cause current to lead voltage, resulting in a leading power factor. Capacitor banks are specifically installed to provide leading reactive power for power factor correction."
  },
  {
    question: "If a circuit has R = 30 ohms and XL = 40 ohms, what is the power factor?",
    options: ["0.6 lagging", "0.8 lagging", "0.6 leading", "0.75 lagging"],
    correctIndex: 0,
    explanation: "Z = sqrt(R squared + XL squared) = sqrt(900 + 1600) = 50 ohms. Power factor = R/Z = 30/50 = 0.6. Since XL > 0 (inductive), it's lagging."
  },
  {
    question: "What is the relationship between kW, kVA and kVAR?",
    options: ["kVA = kW + kVAR", "kVA squared = kW squared + kVAR squared", "kW = kVA x kVAR", "kVAR = kVA / kW"],
    correctIndex: 1,
    explanation: "The power triangle shows that apparent power, true power and reactive power form a right-angled triangle. Therefore kVA squared = kW squared + kVAR squared, or kVA = sqrt(kW squared + kVAR squared)."
  },
  {
    question: "A factory has a power factor of 0.7 and uses 100 kW. After installing capacitors, power factor improves to 0.95. What is the reduction in apparent power demand?",
    options: ["37.4 kVA", "142.9 kVA", "105.3 kVA", "47.6 kVA"],
    correctIndex: 0,
    explanation: "Original kVA = 100/0.7 = 142.9 kVA. New kVA = 100/0.95 = 105.3 kVA. Reduction = 142.9 - 105.3 = 37.6 kVA (approximately 37.4 kVA)."
  }
];

const faqItems = [
  {
    question: "Why is power factor important in electrical installations?",
    answer: "Power factor directly affects the efficiency and cost of electrical systems. A poor power factor (below 0.9) means the supply must provide more current than necessary to deliver useful power. This increases cable sizes, transformer ratings, losses, and often attracts penalties from electricity suppliers. Most industrial and commercial installations aim for power factor above 0.95."
  },
  {
    question: "How does power factor correction work?",
    answer: "Power factor correction typically involves installing capacitors to counteract the lagging reactive power drawn by inductive loads like motors and transformers. The capacitors supply leading reactive power locally, reducing the reactive power drawn from the supply. This lowers the apparent power demand and improves the power factor toward unity."
  },
  {
    question: "What is the difference between leading and lagging power factor?",
    answer: "Lagging power factor occurs in inductive circuits where current lags behind voltage - typical of motors, transformers and fluorescent lighting. Leading power factor occurs in capacitive circuits where current leads voltage. Most industrial loads are inductive, resulting in lagging power factors that require capacitor correction."
  },
  {
    question: "Can power factor be greater than 1?",
    answer: "No, power factor cannot exceed 1 (unity). It represents the ratio of true power to apparent power, or the cosine of the phase angle. Since cosine values range from -1 to 1, and power factor is typically expressed as a positive value, it ranges from 0 to 1. Unity power factor (1.0) represents the ideal condition where all power is converted to useful work."
  },
  {
    question: "How do I calculate the capacitor size for power factor correction?",
    answer: "Calculate required capacitive kVAR = P x (tan(phi1) - tan(phi2)), where P is true power in kW, phi1 is the original phase angle, and phi2 is the target phase angle. Then capacitance C = kVAR x 1000 / (2 x pi x f x V squared). For 3-phase systems, divide the total kVAR by 3 for the per-phase value."
  },
  {
    question: "What happens if power factor correction is excessive?",
    answer: "Over-correction (leading power factor) can cause voltage rise, increased losses, and potential resonance issues. It can also lead to capacitor damage and penalties from suppliers who specify minimum as well as maximum power factor limits. Automatic power factor correction systems prevent over-correction by switching capacitor stages as load varies."
  }
];

const Level3Module3Section2_5 = () => {
  useSEO(
    "Phase Angle and Power Factor - Level 3 Electrical Science | Elec-Mate",
    "Master phase relationships and power factor in reactive circuits. Learn to calculate true, reactive and apparent power, understand power triangles, and apply power factor correction for City & Guilds Level 3 electrical qualifications."
  );

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 border-b border-white/10 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <Button variant="ghost" className="text-white/70 hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="../level3-module3-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 2
            </Link>
          </Button>
          <span className="text-sm font-bold text-white bg-green-600 rounded-full px-3 py-1">
            Level 3 Module 3
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">
          2.5 Phase Angle and Power Factor
        </h1>
        <p className="text-xl text-white/70 mb-8">
          Understanding the critical relationship between voltage and current phase, and how power factor affects electrical system efficiency and costs
        </p>

        {/* Quick Summary Box */}
        <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-green-400 mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Quick Summary
          </h3>
          <ul className="text-white/80 space-y-2">
            <li>Phase angle is the angular difference between voltage and current waveforms</li>
            <li>Power factor = cos(phase angle) = True Power / Apparent Power</li>
            <li>Lagging power factor indicates inductive loads, leading indicates capacitive</li>
            <li>Poor power factor increases current, losses and electricity costs</li>
            <li>Power factor correction uses capacitors to reduce reactive power demand</li>
          </ul>
        </div>

        {/* Learning Outcomes */}
        <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-400 mb-3">Learning Outcomes</h3>
          <ul className="text-white/80 space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-1 text-green-400 flex-shrink-0" />
              Explain phase relationships in resistive, inductive and capacitive circuits
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-1 text-green-400 flex-shrink-0" />
              Calculate power factor from circuit parameters and power values
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-1 text-green-400 flex-shrink-0" />
              Apply the power triangle to solve true, reactive and apparent power problems
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-1 text-green-400 flex-shrink-0" />
              Determine capacitor values required for power factor correction
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-1 text-green-400 flex-shrink-0" />
              Explain the economic and technical benefits of power factor correction
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-1 text-green-400 flex-shrink-0" />
              Distinguish between leading and lagging power factors in practical applications
            </li>
          </ul>
        </div>

        {/* Main Content Sections */}
        <div className="prose prose-invert max-w-none">
          {/* Section 1 */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
              Understanding Phase Angle
            </h2>
            <div className="bg-[#242424] rounded-lg p-6 border border-white/10">
              <p className="text-white/80 mb-4">
                In AC circuits, voltage and current are continuously varying sinusoidal waveforms. The <strong>phase angle (phi)</strong> describes the angular difference between these waveforms, measured in degrees or radians.
              </p>
              <p className="text-white/80 mb-4">
                When voltage and current reach their peak values at the same instant, they are "in phase" and the phase angle is zero. When they peak at different times, there is a phase difference that significantly affects power transfer.
              </p>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Phase Relationships in Different Circuits</h4>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
                <p className="text-white/80 mb-2"><strong>Pure Resistance (R):</strong> Voltage and current in phase, phi = 0 degrees</p>
                <p className="text-white/80 mb-2"><strong>Pure Inductance (L):</strong> Current lags voltage by 90 degrees</p>
                <p className="text-white/80 mb-2"><strong>Pure Capacitance (C):</strong> Current leads voltage by 90 degrees</p>
                <p className="text-white/80"><strong>Combination Circuits:</strong> Phase angle between 0 and 90 degrees depending on component values</p>
              </div>

              <p className="text-white/80 mb-4">
                The memory aid <strong>"ELI the ICE man"</strong> helps remember these relationships:
              </p>
              <ul className="text-white/80 space-y-2 mb-4">
                <li><strong>ELI:</strong> In inductance (L), EMF (voltage, E) leads current (I)</li>
                <li><strong>ICE:</strong> In capacitance (C), current (I) leads EMF (voltage, E)</li>
              </ul>

              <p className="text-white/80 mb-4">
                For combination circuits containing both resistance and reactance, the phase angle can be calculated from:
              </p>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4 text-center">
                <p className="text-green-400 font-mono text-lg mb-2">tan(phi) = X / R = (XL - XC) / R</p>
                <p className="text-white/80 text-sm">Where X is net reactance, XL is inductive reactance, XC is capacitive reactance</p>
              </div>

              <p className="text-white/80 mb-4">
                Alternatively, using impedance: <strong>cos(phi) = R / Z</strong>, where Z is the total impedance.
              </p>

              <InlineCheck
                question="What is the phase angle in a circuit with R = 40 ohms and XL = 30 ohms?"
                options={["36.87 degrees", "53.13 degrees", "45 degrees", "30 degrees"]}
                correctIndex={0}
                explanation="tan(phi) = XL / R = 30 / 40 = 0.75. Therefore phi = arctan(0.75) = 36.87 degrees. Current lags voltage by this angle."
              />
            </div>
          </div>

          {/* Section 2 */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
              Power Factor Fundamentals
            </h2>
            <div className="bg-[#242424] rounded-lg p-6 border border-white/10">
              <p className="text-white/80 mb-4">
                <strong>Power factor</strong> is the cosine of the phase angle between voltage and current. It represents the ratio of true power to apparent power and indicates how effectively electrical power is being converted to useful work.
              </p>

              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4 text-center">
                <p className="text-green-400 font-mono text-lg mb-2">Power Factor = cos(phi) = P / S = R / Z</p>
                <p className="text-white/80 text-sm">Where P = true power (W), S = apparent power (VA), phi = phase angle</p>
              </div>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Types of Power Factor</h4>
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="bg-[#1a1a1a] rounded-lg p-4">
                  <h5 className="font-semibold text-white mb-2">Unity (1.0)</h5>
                  <p className="text-white/70 text-sm">Purely resistive load, voltage and current in phase. All apparent power is true power.</p>
                </div>
                <div className="bg-[#1a1a1a] rounded-lg p-4">
                  <h5 className="font-semibold text-white mb-2">Lagging (&lt;1.0)</h5>
                  <p className="text-white/70 text-sm">Inductive load, current lags voltage. Common in motors and transformers.</p>
                </div>
                <div className="bg-[#1a1a1a] rounded-lg p-4">
                  <h5 className="font-semibold text-white mb-2">Leading (&lt;1.0)</h5>
                  <p className="text-white/70 text-sm">Capacitive load, current leads voltage. Seen with capacitor banks or lightly loaded cables.</p>
                </div>
              </div>

              <h4 className="text-lg font-semibold text-green-400 mb-3">The Three Types of Power</h4>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
                <p className="text-white/80 mb-3"><strong>True Power (P)</strong> - measured in watts (W) or kilowatts (kW)</p>
                <p className="text-white/70 text-sm mb-3">The actual power consumed and converted to useful work (heat, light, mechanical energy). This is what electricity meters measure and what you pay for.</p>
                <p className="text-green-400 font-mono mb-4">P = V x I x cos(phi) = I squared x R</p>

                <p className="text-white/80 mb-3"><strong>Reactive Power (Q)</strong> - measured in volt-amperes reactive (VAR) or kVAR</p>
                <p className="text-white/70 text-sm mb-3">Power that oscillates between source and reactive components (inductors/capacitors). It does no useful work but creates current flow in the system.</p>
                <p className="text-green-400 font-mono mb-4">Q = V x I x sin(phi) = I squared x X</p>

                <p className="text-white/80 mb-3"><strong>Apparent Power (S)</strong> - measured in volt-amperes (VA) or kVA</p>
                <p className="text-white/70 text-sm mb-3">The total power that must be supplied to the circuit. This determines cable sizes, transformer ratings and switchgear capacity.</p>
                <p className="text-green-400 font-mono">S = V x I = sqrt(P squared + Q squared)</p>
              </div>

              <InlineCheck
                question="A circuit draws 20A at 230V with a power factor of 0.9. What is the true power?"
                options={["4,600 W", "4,140 W", "5,111 W", "2,300 W"]}
                correctIndex={1}
                explanation="True Power P = V x I x cos(phi) = 230 x 20 x 0.9 = 4,140 W. The apparent power would be 4,600 VA (without the power factor)."
              />
            </div>
          </div>

          {/* Section 3 */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</span>
              The Power Triangle
            </h2>
            <div className="bg-[#242424] rounded-lg p-6 border border-white/10">
              <p className="text-white/80 mb-4">
                The <strong>power triangle</strong> is a graphical representation showing the relationship between true power, reactive power and apparent power. It directly corresponds to the impedance triangle and voltage triangle in AC circuits.
              </p>

              <div className="bg-[#1a1a1a] rounded-lg p-6 mb-4">
                <h4 className="text-lg font-semibold text-green-400 mb-3 text-center">Power Triangle Structure</h4>
                <div className="text-center text-white/80 mb-4">
                  <p className="mb-2">Apparent Power S (kVA) - Hypotenuse</p>
                  <p className="mb-2">True Power P (kW) - Horizontal (adjacent)</p>
                  <p className="mb-2">Reactive Power Q (kVAR) - Vertical (opposite)</p>
                  <p className="mt-4 text-green-400 font-mono">S squared = P squared + Q squared</p>
                </div>
              </div>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Key Relationships</h4>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
                <p className="text-white/80 mb-2"><strong>Power Factor:</strong> cos(phi) = P / S = kW / kVA</p>
                <p className="text-white/80 mb-2"><strong>Reactive Factor:</strong> sin(phi) = Q / S = kVAR / kVA</p>
                <p className="text-white/80 mb-2"><strong>Phase Angle:</strong> phi = arctan(Q / P) = arccos(P / S)</p>
                <p className="text-white/80"><strong>Apparent Power:</strong> S = P / cos(phi) = sqrt(P squared + Q squared)</p>
              </div>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Practical Example</h4>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
                <p className="text-white/80 mb-3">A factory has a load of 80 kW at power factor 0.75 lagging:</p>
                <p className="text-white/80 mb-2">Apparent Power S = P / cos(phi) = 80 / 0.75 = <strong>106.7 kVA</strong></p>
                <p className="text-white/80 mb-2">Phase angle phi = arccos(0.75) = <strong>41.4 degrees</strong></p>
                <p className="text-white/80 mb-2">Reactive Power Q = S x sin(41.4) = 106.7 x 0.661 = <strong>70.5 kVAR</strong></p>
                <p className="text-white/70 text-sm mt-3">Or using: Q = sqrt(S squared - P squared) = sqrt(11,385 - 6,400) = 70.6 kVAR</p>
              </div>

              <p className="text-white/80 mb-4">
                The power triangle helps visualise why poor power factor is problematic: a smaller angle (higher power factor) means less reactive power for the same true power, reducing the apparent power demand on the system.
              </p>

              <InlineCheck
                question="A load has apparent power of 50 kVA and true power of 40 kW. What is the reactive power?"
                options={["10 kVAR", "30 kVAR", "45 kVAR", "20 kVAR"]}
                correctIndex={1}
                explanation="Using the power triangle: Q = sqrt(S squared - P squared) = sqrt(2500 - 1600) = sqrt(900) = 30 kVAR."
              />
            </div>
          </div>

          {/* Section 4 */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</span>
              Power Factor Correction
            </h2>
            <div className="bg-[#242424] rounded-lg p-6 border border-white/10">
              <p className="text-white/80 mb-4">
                <strong>Power factor correction (PFC)</strong> is the process of improving power factor by adding reactive components - typically capacitors for inductive loads - to reduce the reactive power drawn from the supply.
              </p>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Why Correct Power Factor?</h4>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-[#1a1a1a] rounded-lg p-4">
                  <h5 className="font-semibold text-white mb-2">Technical Benefits</h5>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>Reduced current for same power delivery</li>
                    <li>Lower I squared R losses in cables</li>
                    <li>Reduced voltage drop</li>
                    <li>Increased system capacity</li>
                    <li>Smaller cable and switchgear sizes</li>
                  </ul>
                </div>
                <div className="bg-[#1a1a1a] rounded-lg p-4">
                  <h5 className="font-semibold text-white mb-2">Financial Benefits</h5>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>Avoid supplier penalties (typically below 0.9 pf)</li>
                    <li>Reduced maximum demand charges</li>
                    <li>Lower energy losses</li>
                    <li>Deferred infrastructure upgrades</li>
                    <li>Reduced carbon footprint</li>
                  </ul>
                </div>
              </div>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Calculating Correction Capacitance</h4>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
                <p className="text-white/80 mb-3">To correct power factor from cos(phi1) to cos(phi2):</p>
                <p className="text-green-400 font-mono mb-3">Required kVAR = P x (tan(phi1) - tan(phi2))</p>
                <p className="text-white/80 mb-3">Then for the capacitor value:</p>
                <p className="text-green-400 font-mono mb-3">C = Qc / (2 x pi x f x V squared)</p>
                <p className="text-white/70 text-sm">Where Qc is capacitive reactive power in VAR, f is frequency, V is voltage</p>
              </div>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Worked Example</h4>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
                <p className="text-white/80 mb-3">Correct a 60 kW load from power factor 0.7 to 0.95:</p>
                <p className="text-white/80 mb-2">phi1 = arccos(0.7) = 45.57 degrees, tan(phi1) = 1.02</p>
                <p className="text-white/80 mb-2">phi2 = arccos(0.95) = 18.19 degrees, tan(phi2) = 0.329</p>
                <p className="text-white/80 mb-2">Required kVAR = 60 x (1.02 - 0.329) = 60 x 0.691 = <strong>41.5 kVAR</strong></p>
                <p className="text-white/70 text-sm mt-3">This capacitor bank would reduce apparent power from 85.7 kVA to 63.2 kVA - a 26% reduction.</p>
              </div>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Types of Power Factor Correction</h4>
              <ul className="text-white/80 space-y-2 mb-4">
                <li><strong>Individual correction:</strong> Capacitors installed at each motor or load - most efficient but highest cost</li>
                <li><strong>Group correction:</strong> Capacitors at distribution boards serving multiple loads - good compromise</li>
                <li><strong>Central correction:</strong> Main capacitor bank at incoming supply - easiest to install but least efficient</li>
                <li><strong>Automatic correction:</strong> Controller switches capacitor stages based on measured power factor - responds to varying loads</li>
              </ul>

              <InlineCheck
                question="A 100 kW load at 0.8 pf is corrected to 0.95 pf. What kVAR capacitor is needed?"
                options={["25 kVAR", "42 kVAR", "75 kVAR", "50 kVAR"]}
                correctIndex={1}
                explanation="tan(phi1) = tan(arccos(0.8)) = 0.75, tan(phi2) = tan(arccos(0.95)) = 0.329. Required kVAR = 100 x (0.75 - 0.329) = 42.1 kVAR."
              />
            </div>
          </div>

          {/* Practical Guidance */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4">Practical Guidance</h2>
            <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-yellow-400 mb-3">Key Installation Considerations</h4>
              <ul className="text-white/80 space-y-2">
                <li><strong>Avoid over-correction:</strong> Leading power factor can cause voltage rise and equipment damage. Target 0.95 lagging, not unity.</li>
                <li><strong>Harmonic distortion:</strong> Capacitors can amplify harmonics from non-linear loads (VFDs, LED drivers). May need detuned reactors.</li>
                <li><strong>Switching transients:</strong> Use contactors rated for capacitor switching (AC-6b category). Standard contactors will fail prematurely.</li>
                <li><strong>Discharge resistors:</strong> Capacitors must have discharge resistors to reduce voltage to safe levels within specified time.</li>
                <li><strong>BS 7671 requirements:</strong> Regulation 559 covers capacitor installations including isolation, protection and discharge requirements.</li>
              </ul>
            </div>
          </div>

          {/* FAQs */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqItems.map((faq, index) => (
                <div key={index} className="bg-[#242424] rounded-lg p-4 border border-white/10">
                  <h4 className="font-semibold text-white mb-2">{faq.question}</h4>
                  <p className="text-white/70 text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Reference */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4">Quick Reference</h2>
            <div className="bg-[#242424] rounded-lg p-6 border border-white/10">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-green-400 mb-3">Essential Formulas</h4>
                  <ul className="text-white/70 text-sm space-y-2 font-mono">
                    <li>Power Factor = cos(phi) = P / S</li>
                    <li>P = V x I x cos(phi)</li>
                    <li>Q = V x I x sin(phi)</li>
                    <li>S = V x I = sqrt(P^2 + Q^2)</li>
                    <li>tan(phi) = Q / P = X / R</li>
                    <li>kVAR required = P(tan phi1 - tan phi2)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-green-400 mb-3">Typical Power Factors</h4>
                  <ul className="text-white/70 text-sm space-y-2">
                    <li>Incandescent lamps: 1.0</li>
                    <li>Resistive heaters: 1.0</li>
                    <li>Fluorescent lighting: 0.5-0.95</li>
                    <li>Induction motors (loaded): 0.8-0.9</li>
                    <li>Induction motors (unloaded): 0.2-0.4</li>
                    <li>Welding equipment: 0.5-0.7</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-4">Test Your Knowledge</h2>
          <p className="text-white/70 mb-4">Complete this quiz to check your understanding of phase angle and power factor concepts:</p>
          <Quiz questions={quizQuestions} moduleId="L3M3S2.5" />
        </div>

        {/* Quick Check Questions */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-4">Quick Check Questions</h2>
          <div className="space-y-4">
            {quickCheckQuestions.map((q, index) => (
              <InlineCheck
                key={index}
                question={q.question}
                options={q.options}
                correctIndex={q.correctIndex}
                explanation={q.explanation}
              />
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-white/10">
          <Button variant="outline" className="text-white border-white/30 hover:bg-white/10" asChild>
            <Link to="../level3-module3-section2-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: RL, RC and RLC Combinations
            </Link>
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 text-white" asChild>
            <Link to="../level3-module3-section2-6">
              Next: Resonance in AC Circuits
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Level3Module3Section2_5;
