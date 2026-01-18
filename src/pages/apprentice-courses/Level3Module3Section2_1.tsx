/**
 * Level 3 Module 3 Section 2.1 - Pure Resistance Circuits
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Pure Resistance Circuits - Level 3 Module 3 Section 2.1";
const DESCRIPTION = "Understand resistive circuits in AC and DC systems, power dissipation calculations, heating effects, and practical applications in electrical installations.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "In a pure resistive AC circuit, what is the phase relationship between voltage and current?",
    options: [
      "Current leads voltage by 90 degrees",
      "Voltage leads current by 90 degrees",
      "Voltage and current are in phase (0 degrees)",
      "They are 180 degrees out of phase"
    ],
    correctIndex: 2,
    explanation: "In a purely resistive circuit, voltage and current rise and fall together - they are perfectly in phase. This is because resistance responds instantaneously to changes in voltage, with no energy storage mechanism to cause any delay."
  },
  {
    id: "check-2",
    question: "A 2.4 kW immersion heater operates on 230V AC supply. What is the resistance of the heating element?",
    options: [
      "10.4 ohms",
      "22.0 ohms",
      "96.0 ohms",
      "552.0 ohms"
    ],
    correctIndex: 1,
    explanation: "Using P = V squared / R, rearranged to R = V squared / P: R = 230 squared / 2400 = 52900 / 2400 = 22.04 ohms. This is a common calculation for sizing heating element conductors and protection."
  },
  {
    id: "check-3",
    question: "Why is the power factor of a pure resistive load equal to 1 (unity)?",
    options: [
      "Because resistance stores energy magnetically",
      "Because voltage and current are in phase, so cos(0 degrees) = 1",
      "Because reactive power equals real power",
      "Because the load draws maximum current"
    ],
    correctIndex: 1,
    explanation: "Power factor = cos(phase angle). In a pure resistive circuit, voltage and current are in phase (phase angle = 0 degrees). Since cos(0 degrees) = 1, the power factor is unity. All power drawn is real power - none is reactive."
  },
  {
    id: "check-4",
    question: "What happens to power dissipation in a resistor if the current is doubled?",
    options: [
      "Power doubles (P = 2P)",
      "Power halves (P = P/2)",
      "Power quadruples (P = 4P)",
      "Power remains the same"
    ],
    correctIndex: 2,
    explanation: "Power dissipation follows P = I squared R. If current doubles (2I), power becomes (2I) squared R = 4I squared R - four times the original power. This I squared relationship is why even small increases in current cause significant heating in conductors and equipment."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A 100W lamp operates on 230V supply. What current does it draw?",
    options: [
      "0.23A",
      "0.43A",
      "2.30A",
      "23.0A"
    ],
    correctAnswer: 1,
    explanation: "Using P = VI, rearranged to I = P/V: I = 100/230 = 0.435A. This is why lighting circuits typically use 6A MCBs - even with multiple lamps, the total current remains relatively low."
  },
  {
    id: 2,
    question: "An electric kettle rated at 3kW is connected to a 230V supply. What is its operating resistance?",
    options: [
      "17.6 ohms",
      "76.7 ohms",
      "13.0 ohms",
      "0.08 ohms"
    ],
    correctAnswer: 0,
    explanation: "Using R = V squared / P: R = 230 squared / 3000 = 52900/3000 = 17.63 ohms. The low resistance allows high current flow (13A), which is why kettles require dedicated socket outlets and are often the highest current domestic appliance."
  },
  {
    id: 3,
    question: "In a pure resistive circuit connected to 50Hz AC supply, how many times per second does the power reach its maximum value?",
    options: [
      "50 times",
      "100 times",
      "25 times",
      "200 times"
    ],
    correctAnswer: 1,
    explanation: "Power reaches maximum twice per cycle - once when both voltage and current are at positive maximum, and once when both are at negative maximum. At 50Hz (50 cycles per second), this means 100 power pulses per second."
  },
  {
    id: 4,
    question: "A resistive heating element dissipates 1.5kW when connected to 230V AC. If the same element is connected to 115V AC, what power will it dissipate?",
    options: [
      "750W",
      "375W",
      "1500W",
      "3000W"
    ],
    correctAnswer: 1,
    explanation: "Power is proportional to V squared. Halving the voltage quarters the power: P2 = P1 x (V2/V1) squared = 1500 x (115/230) squared = 1500 x 0.25 = 375W. This is why voltage regulation is critical for heating applications."
  },
  {
    id: 5,
    question: "Three 60 ohm resistors are connected in parallel across a 230V supply. What is the total power dissipated?",
    options: [
      "881W",
      "2646W",
      "294W",
      "1323W"
    ],
    correctAnswer: 1,
    explanation: "Parallel resistance = 60/3 = 20 ohms. Power P = V squared / R = 230 squared / 20 = 52900/20 = 2645W. Alternatively, each resistor dissipates V squared / R = 230 squared / 60 = 881.7W, total = 3 x 881.7 = 2645W."
  },
  {
    id: 6,
    question: "Why do incandescent lamp filaments have a lower resistance when cold compared to when hot?",
    options: [
      "The filament expands when hot",
      "Tungsten has a positive temperature coefficient of resistance",
      "The lamp draws less current when hot",
      "The voltage drop increases with temperature"
    ],
    correctAnswer: 1,
    explanation: "Tungsten, like most metals, has a positive temperature coefficient - its resistance increases with temperature. Cold resistance may be 10-15 times lower than hot resistance, causing high inrush currents when lamps are switched on."
  },
  {
    id: 7,
    question: "A 230V, 2kW heater operates for 3 hours. How much energy is consumed in kWh?",
    options: [
      "2 kWh",
      "6 kWh",
      "0.67 kWh",
      "690 kWh"
    ],
    correctAnswer: 1,
    explanation: "Energy = Power x Time = 2kW x 3 hours = 6 kWh. This is the billing unit for electricity. At typical UK rates, this would cost approximately 90p to 1.50 pounds depending on tariff."
  },
  {
    id: 8,
    question: "What is the instantaneous power dissipation in a resistive circuit when the AC voltage passes through zero?",
    options: [
      "Maximum power",
      "Zero power",
      "Half the maximum power",
      "Negative power"
    ],
    correctAnswer: 1,
    explanation: "When voltage is zero, current is also zero (they are in phase). Since P = VI, power is zero at this instant. This is why resistive loads have pulsating power delivery at twice the supply frequency."
  },
  {
    id: 9,
    question: "A resistance of 50 ohms carries 4A. What is the voltage drop across it and the power dissipated?",
    options: [
      "200V and 800W",
      "12.5V and 50W",
      "200V and 400W",
      "50V and 200W"
    ],
    correctAnswer: 0,
    explanation: "Voltage drop V = IR = 4 x 50 = 200V. Power P = I squared R = 4 squared x 50 = 16 x 50 = 800W. Alternatively, P = VI = 200 x 4 = 800W. Both methods give the same result."
  },
  {
    id: 10,
    question: "For a pure resistive load, what is the relationship between true power (P), apparent power (S), and reactive power (Q)?",
    options: [
      "P = S, Q = 0",
      "P = Q, S = 0",
      "S = Q, P = 0",
      "P = S = Q"
    ],
    correctAnswer: 0,
    explanation: "In a pure resistive circuit, there is no reactive power (Q = 0) because there is no energy storage. All apparent power is converted to real power, so P = S. This gives a power factor of P/S = 1 (unity)."
  },
  {
    id: 11,
    question: "An electrician measures 10A flowing through a cable with a resistance of 0.5 ohms. What is the power loss in the cable?",
    options: [
      "5W",
      "20W",
      "50W",
      "100W"
    ],
    correctAnswer: 2,
    explanation: "Cable power loss = I squared R = 10 squared x 0.5 = 100 x 0.5 = 50W. This I squared R loss is pure heat and represents wasted energy. It also contributes to cable temperature rise, affecting current-carrying capacity."
  },
  {
    id: 12,
    question: "A bank of resistive heaters totalling 9kW is connected to a 400V three-phase supply (balanced load). What is the line current?",
    options: [
      "22.5A",
      "13.0A",
      "7.5A",
      "39.0A"
    ],
    correctAnswer: 1,
    explanation: "For balanced three-phase: P = root 3 x V_L x I_L x pf. With pf = 1 for resistive loads: I = P/(root 3 x V) = 9000/(1.732 x 400) = 9000/692.8 = 13.0A per line."
  }
];

const faqs = [
  {
    question: "Why is AC power calculation the same as DC for resistive loads?",
    answer: "For pure resistive loads, the RMS (root mean square) values of AC voltage and current give the same heating effect as equivalent DC values. Since P = V_rms x I_rms and voltage and current are in phase, the power equations (P = VI = I squared R = V squared / R) work identically for both AC and DC when using RMS values."
  },
  {
    question: "How does resistance heating work in practical applications?",
    answer: "Resistance heating (also called Joule heating or I squared R heating) converts electrical energy directly to heat. Current flowing through a resistive element causes electron collisions with the atomic lattice, generating heat. Applications include immersion heaters, electric ovens, toasters, and industrial heating processes. The element material (typically nichrome for heaters) is chosen for high resistivity and temperature stability."
  },
  {
    question: "What is the significance of the I squared R relationship in electrical installations?",
    answer: "The I squared R relationship means power loss (and heating) increases with the square of current. Doubling current quadruples losses. This is why cable sizing considers current-carrying capacity carefully, why high-current circuits need larger conductors, and why power distribution uses high voltage (to reduce current for the same power transfer)."
  },
  {
    question: "Why do we need to consider both hot and cold resistance for some calculations?",
    answer: "Many materials change resistance with temperature. Lamp filaments may have 10 times higher resistance when hot. Cables carrying high currents heat up, increasing their resistance. For accurate calculations (especially inrush currents, voltage drop at operating temperature, and protection coordination), you must use the appropriate resistance value for the actual operating condition."
  },
  {
    question: "How do resistive loads affect power quality and power factor?",
    answer: "Pure resistive loads are ideal from a power quality perspective - they have unity power factor (1.0), draw current in phase with voltage, and create no harmonics (assuming linear resistance). This means no reactive power compensation is needed, and the full current-carrying capacity of the supply can deliver useful power."
  },
  {
    question: "What determines the power rating of a resistive component?",
    answer: "A resistor's power rating indicates the maximum continuous power it can dissipate without damage. This depends on its physical size (surface area for heat dissipation), construction materials, and mounting/cooling arrangements. Operating at or near the rating causes significant temperature rise, so derating for ambient temperature and reliability is common practice."
  }
];

const Level3Module3Section2_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">

      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module3-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Article Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 3.2.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Pure Resistance Circuits
          </h1>
          <p className="text-white/80">
            Resistive circuits in AC/DC systems, power dissipation, and heating effects
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Phase relationship:</strong> V and I are in phase (0 degrees)</li>
              <li><strong>Power factor:</strong> Unity (1.0) - all power is real power</li>
              <li><strong>Key formulas:</strong> P = VI = I squared R = V squared / R</li>
              <li><strong>Heating effect:</strong> Proportional to I squared (Joule heating)</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Heaters, incandescent lamps, resistive elements</li>
              <li><strong>Use:</strong> P = V squared / R for fixed voltage applications</li>
              <li><strong>Use:</strong> P = I squared R for current-based heating calculations</li>
              <li><strong>Watch:</strong> Temperature coefficient affects resistance</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Analyse voltage and current phase relationships in resistive circuits",
              "Calculate power dissipation using P = VI, I squared R, and V squared / R formulas",
              "Understand Joule heating and its practical implications",
              "Apply Ohm's Law to AC resistive circuit calculations",
              "Explain why resistive loads have unity power factor",
              "Evaluate energy consumption in resistive heating applications"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Resistance in AC and DC Circuits */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Resistance in AC and DC Circuits
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Pure resistance behaves identically in both AC and DC circuits - it simply opposes the flow of current according to Ohm's Law (V = IR). Unlike inductors and capacitors, resistors have no energy storage capability, meaning they respond instantaneously to any change in applied voltage.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Fundamental Ohm's Law Relationships:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>V = IR</strong> - Voltage equals current times resistance</li>
                <li><strong>I = V/R</strong> - Current equals voltage divided by resistance</li>
                <li><strong>R = V/I</strong> - Resistance equals voltage divided by current</li>
              </ul>
            </div>

            <p>
              In an AC circuit, when a sinusoidal voltage is applied to a pure resistance, the resulting current is also sinusoidal and perfectly in phase with the voltage. Both waveforms reach their positive peaks, zero crossings, and negative peaks at exactly the same instant. This phase relationship is fundamental to understanding resistive circuit behaviour.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">DC Circuit Characteristics</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Constant voltage produces constant current</li>
                  <li>Power is continuous: P = VI = I squared R = V squared / R</li>
                  <li>Simple Ohm's Law calculations apply directly</li>
                  <li>No reactive effects or phase considerations</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">AC Circuit Characteristics</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Voltage and current vary sinusoidally in phase</li>
                  <li>Power pulsates at twice the supply frequency</li>
                  <li>RMS values used for equivalent DC calculations</li>
                  <li>Same power formulas using RMS values</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key Point:</strong> When using AC values in calculations, always use RMS (root mean square) values unless specifically stated otherwise. UK mains at 230V refers to the RMS value - the peak voltage is actually 325V (230 x root 2).
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Power Dissipation Calculations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Power Dissipation Calculations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Power in a resistive circuit represents the rate of energy conversion from electrical energy to heat. This power dissipation can be calculated using three equivalent formulas, each useful in different situations depending on which quantities are known.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The Three Power Formulas:</p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-elec-yellow/80 mb-1">P = V x I</p>
                  <p className="text-xs text-white/80">Use when you know voltage and current</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-elec-yellow/80 mb-1">P = I squared x R</p>
                  <p className="text-xs text-white/80">Use when you know current and resistance</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-elec-yellow/80 mb-1">P = V squared / R</p>
                  <p className="text-xs text-white/80">Use when you know voltage and resistance</p>
                </div>
              </div>
            </div>

            <p>
              The I squared R formula is particularly important for understanding heating effects in conductors and equipment. It shows that power loss (and therefore heating) increases with the <em>square</em> of the current. This non-linear relationship has significant implications for cable sizing and thermal management.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Worked Example:</strong> An immersion heater rated at 3kW operates on 230V supply. First, find the current: I = P/V = 3000/230 = 13.04A. Then find the resistance: R = V/I = 230/13.04 = 17.6 ohms. Verify: P = V squared / R = 230 squared / 17.6 = 3006W (verified).
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Energy Calculations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Energy (kWh)</strong> = Power (kW) x Time (hours)</li>
                <li><strong>Energy (Joules)</strong> = Power (Watts) x Time (seconds)</li>
                <li><strong>Energy (Wh)</strong> = Power (W) x Time (hours)</li>
                <li>1 kWh = 3,600,000 Joules = 3.6 MJ</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical Application:</strong> Energy in kWh is the billing unit for electricity. A 3kW heater running for 4 hours uses 12kWh. At 30p per kWh, this costs 3.60 pounds.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Heating Effects and Joule's Law */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Heating Effects and Joule's Law
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When current flows through a conductor, electrical energy is converted to heat energy. This phenomenon, discovered by James Prescott Joule, is known as Joule heating or resistive heating. The heat generated is given by Joule's Law: H = I squared Rt, where H is heat energy in Joules, I is current in Amperes, R is resistance in Ohms, and t is time in seconds.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Intentional Heating</p>
                <p className="text-white/90 text-xs">Heaters, ovens, kettles, soldering irons - designed to convert electricity to heat</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Unintentional Heating</p>
                <p className="text-white/90 text-xs">Cable losses, motor windings, connections - heating that reduces efficiency</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Damaging Heating</p>
                <p className="text-white/90 text-xs">Overloaded cables, poor connections - fire risks and equipment damage</p>
              </div>
            </div>

            <p>
              The I squared relationship in Joule's Law explains why current is so critical. Consider a cable carrying 10A with 1 ohm resistance: P = 10 squared x 1 = 100W loss. If the current increases to 20A: P = 20 squared x 1 = 400W - four times the heat despite only twice the current. This is why overload protection and correct cable sizing are essential.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Temperature Coefficient of Resistance:</p>
              <p className="text-sm text-white mb-2">Most conductors change resistance with temperature according to:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>R_t = R_20[1 + alpha(t - 20)]</strong></li>
                <li>R_t = Resistance at temperature t degrees C</li>
                <li>R_20 = Resistance at 20 degrees C (reference temperature)</li>
                <li>alpha = Temperature coefficient (copper approximately 0.00393 per degree C)</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A copper conductor has 0.5 ohms resistance at 20 degrees C. At 70 degrees C operating temperature: R_70 = 0.5[1 + 0.00393(70-20)] = 0.5[1 + 0.1965] = 0.5 x 1.1965 = 0.598 ohms - a 20% increase affecting voltage drop and losses.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Power Factor in Resistive Circuits */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Power Factor in Resistive Circuits
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Power factor (pf) is the ratio of real power (P) to apparent power (S), or equivalently, the cosine of the phase angle between voltage and current. In a pure resistive circuit, voltage and current are perfectly in phase (phase angle = 0 degrees), so the power factor is cos(0 degrees) = 1, often called "unity power factor".
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Power Relationships:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Real Power (P)</strong> = V x I x cos(phi) [Watts] - actual useful power</li>
                <li><strong>Reactive Power (Q)</strong> = V x I x sin(phi) [VAr] - power oscillating in reactive components</li>
                <li><strong>Apparent Power (S)</strong> = V x I [VA] - total power supplied by source</li>
                <li><strong>Power Factor</strong> = P/S = cos(phi)</li>
              </ul>
            </div>

            <p>
              For a pure resistive load, there is no reactive power (Q = 0) because there are no components storing and releasing energy. All the apparent power is converted to real power: P = S, giving pf = P/S = 1. This is the ideal condition - all current drawn does useful work.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Pure Resistive Load (pf = 1)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Phase angle phi = 0 degrees</li>
                  <li>P = S (real power equals apparent power)</li>
                  <li>Q = 0 (no reactive power)</li>
                  <li>Most efficient power transfer</li>
                  <li>No power factor correction needed</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Benefits of Unity Power Factor</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Minimum current for given power</li>
                  <li>Reduced cable I squared R losses</li>
                  <li>Maximum utilisation of supply capacity</li>
                  <li>No reactive power charges from DNO</li>
                  <li>Reduced voltage drop</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Pure resistive loads like heaters and incandescent lamps are "good citizens" on the electrical network - they have unity power factor and draw clean, sinusoidal current in phase with the voltage.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Common Resistive Loads</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Immersion heaters:</strong> Typically 2.4-3kW, require dedicated 15A or 20A radial circuit</li>
                <li><strong>Electric showers:</strong> 7-10.5kW, require dedicated high-current supply (32A-45A)</li>
                <li><strong>Electric ovens:</strong> 2-5kW per element, usually on dedicated 32A radial</li>
                <li><strong>Incandescent/halogen lamps:</strong> Resistive but with high inrush current (cold filament)</li>
                <li><strong>Underfloor heating:</strong> Typically 100-200W per square metre, significant total loads</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Calculation Tips</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>For fixed voltage supplies (mains), P = V squared / R is often most convenient</li>
                <li>For series circuits with known current, P = I squared R calculates individual power dissipations</li>
                <li>Total power in series or parallel equals sum of individual powers</li>
                <li>Cable voltage drop: V_drop = I x R_cable (both conductors for single-phase)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Mixing peak and RMS values:</strong> Use RMS for all power calculations</li>
                <li><strong>Forgetting temperature effects:</strong> Resistance increases with temperature for metals</li>
                <li><strong>Ignoring both conductors:</strong> In single-phase, voltage drop includes line and neutral</li>
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

        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Key Formulas</p>
                <ul className="space-y-0.5">
                  <li>V = I x R (Ohm's Law)</li>
                  <li>P = V x I = I squared R = V squared / R</li>
                  <li>Energy = Power x Time</li>
                  <li>R_t = R_20[1 + alpha(t - 20)]</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Values</p>
                <ul className="space-y-0.5">
                  <li>UK mains: 230V RMS (325V peak)</li>
                  <li>Power factor: Unity (1.0)</li>
                  <li>Phase angle: 0 degrees</li>
                  <li>Copper alpha: 0.00393 per degree C</li>
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
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module3-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 2
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module3-section2-2">
              Next: Pure Inductance Circuits
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module3Section2_1;
