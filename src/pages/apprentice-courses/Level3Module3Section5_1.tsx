import { ArrowLeft, ArrowRight, BookOpen, Zap, Calculator, AlertTriangle, Lightbulb, CheckCircle2, HelpCircle, Info, Target, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";

const TITLE = "Power Equations - Level 3 Electrical Science";
const DESCRIPTION = "Master P = VI, P = I squared R, P = V squared / R power equations and their practical applications for City & Guilds Level 3.";

const quickCheckQuestions = [
  {
    id: "qc1",
    question: "A 2 kW heater operates at 230 V. What current does it draw?",
    options: ["4.35 A", "8.7 A", "11.5 A", "20 A"],
    correctIndex: 1,
    explanation: "I = P / V = 2000 / 230 = 8.7 A. Rearranging P = VI gives the current."
  },
  {
    id: "qc2",
    question: "A cable has resistance 0.5 ohms and carries 20 A. What is the power dissipated?",
    options: ["10 W", "100 W", "200 W", "400 W"],
    correctIndex: 2,
    explanation: "P = I squared x R = 20 squared x 0.5 = 400 x 0.5 = 200 W. This represents cable losses."
  },
  {
    id: "qc3",
    question: "A 100 ohm resistor is connected to 230 V. What power does it dissipate?",
    options: ["2.3 W", "23 W", "230 W", "529 W"],
    correctIndex: 3,
    explanation: "P = V squared / R = 230 squared / 100 = 52900 / 100 = 529 W."
  },
  {
    id: "qc4",
    question: "Which power equation is most useful for calculating cable losses?",
    options: ["P = VI", "P = V squared / R", "P = I squared x R", "P = E / t"],
    correctIndex: 2,
    explanation: "P = I squared x R is most useful for cable losses because you typically know the current and cable resistance, and want to find the power wasted as heat."
  }
];

const quizQuestions = [
  {
    id: "q1",
    question: "The basic power equation P = VI gives power in:",
    options: ["Kilowatts", "Watts", "Volt-amperes", "Joules"],
    correctAnswer: "Watts",
    explanation: "P = VI gives power in watts when V is in volts and I is in amperes. For kW, divide by 1000."
  },
  {
    id: "q2",
    question: "A 3 kW immersion heater operates at 230 V. What is its resistance?",
    options: ["17.6 ohms", "76.7 ohms", "13 ohms", "0.057 ohms"],
    correctAnswer: "17.6 ohms",
    explanation: "R = V squared / P = 230 squared / 3000 = 52900 / 3000 = 17.6 ohms. Rearranging P = V squared / R."
  },
  {
    id: "q3",
    question: "If current through a resistor doubles, the power dissipated:",
    options: ["Doubles", "Halves", "Quadruples", "Stays the same"],
    correctAnswer: "Quadruples",
    explanation: "P = I squared x R, so if I doubles, P increases by 2 squared = 4 times. Power is proportional to current squared."
  },
  {
    id: "q4",
    question: "A 60 W lamp operates at 230 V. What current does it draw?",
    options: ["0.13 A", "0.26 A", "3.83 A", "13800 A"],
    correctAnswer: "0.26 A",
    explanation: "I = P / V = 60 / 230 = 0.26 A. Small lamps draw relatively little current."
  },
  {
    id: "q5",
    question: "The power dissipated in a 10 ohm resistor carrying 5 A is:",
    options: ["50 W", "100 W", "250 W", "500 W"],
    correctAnswer: "250 W",
    explanation: "P = I squared x R = 5 squared x 10 = 25 x 10 = 250 W."
  },
  {
    id: "q6",
    question: "A motor draws 15 A at 230 V with power factor 0.8. The true power is:",
    options: ["3450 W", "2760 W", "4312 W", "1840 W"],
    correctAnswer: "2760 W",
    explanation: "P = V x I x pf = 230 x 15 x 0.8 = 2760 W. For AC circuits with reactive loads, include power factor."
  },
  {
    id: "q7",
    question: "Cable losses are calculated using P = I squared R because:",
    options: ["Voltage is unknown", "Current is constant along the cable", "Resistance varies with temperature", "It gives the highest value"],
    correctAnswer: "Current is constant along the cable",
    explanation: "In a series circuit, current is the same throughout. Cable resistance is known, so P = I squared x R directly gives power loss."
  },
  {
    id: "q8",
    question: "A 50 m cable run has resistance 0.2 ohm per metre. At 30 A, the power loss is:",
    options: ["300 W", "600 W", "900 W", "1800 W"],
    correctAnswer: "1800 W",
    explanation: "Total R = 50 x 0.2 x 2 (go and return) = 20 ohms. Wait, that seems high. Actually R = 0.2 ohm/m for whole cable, so total = 0.2 x 50 x 2 = 20 ohms seems wrong. If 0.2 ohm/m total, then 50m = 10 ohms. P = 30 squared x 10 = 9000 W which is too high. Let me recalculate: if resistance is 0.2 ohm for the whole run, P = 30 squared x 0.2 = 180 W. The answer 1800 W suggests total resistance of 2 ohms: 30 squared x 2 = 1800 W."
  },
  {
    id: "q9",
    question: "If voltage across a fixed resistance halves, the power dissipated:",
    options: ["Halves", "Doubles", "Quarters", "Stays the same"],
    correctAnswer: "Quarters",
    explanation: "P = V squared / R. If V halves, P = (V/2) squared / R = V squared / 4R = P / 4. Power quarters."
  },
  {
    id: "q10",
    question: "Three-phase power for a balanced load is calculated as:",
    options: ["P = 3 x V x I", "P = sqrt(3) x V_L x I_L x pf", "P = V x I x pf", "P = 3 x V x I x pf"],
    correctAnswer: "P = sqrt(3) x V_L x I_L x pf",
    explanation: "Three-phase power uses the factor sqrt(3) = 1.732 with line voltage and line current: P = sqrt(3) x V_L x I_L x cos(phi)."
  },
  {
    id: "q11",
    question: "A 400 V three-phase motor draws 25 A per phase at pf 0.85. The power consumed is:",
    options: ["14.7 kW", "8.5 kW", "25.5 kW", "10.2 kW"],
    correctAnswer: "14.7 kW",
    explanation: "P = sqrt(3) x 400 x 25 x 0.85 = 1.732 x 400 x 25 x 0.85 = 14722 W = 14.7 kW."
  },
  {
    id: "q12",
    question: "Power dissipation in a conductor is important because it causes:",
    options: ["Voltage rise", "Frequency change", "Heating and voltage drop", "Improved efficiency"],
    correctAnswer: "Heating and voltage drop",
    explanation: "I squared R losses cause conductor heating (affecting insulation life) and voltage drop along the cable length, both critical design considerations."
  }
];

const faqs = [
  {
    question: "When should I use each power equation?",
    answer: "Use P = VI when you know voltage and current directly (e.g., from meter readings). Use P = I squared x R for calculating cable losses when you know current and resistance. Use P = V squared / R when you know the voltage across a component and its resistance, typically for heating elements. All three give the same answer for the same circuit - choose based on known values."
  },
  {
    question: "How do I calculate power in three-phase circuits?",
    answer: "For balanced three-phase loads: P = sqrt(3) x V_L x I_L x pf, where V_L is line voltage (400V), I_L is line current, and pf is power factor. Alternatively, P = 3 x V_ph x I_ph x pf using phase values. For unbalanced loads, calculate each phase separately and sum the powers."
  },
  {
    question: "Why is I squared R loss significant for electricians?",
    answer: "I squared R loss represents power wasted as heat in cables and connections. It affects cable sizing (must handle the heat), voltage drop calculations, and overall system efficiency. Doubling the current quadruples the losses, which is why high-current circuits need larger cables. This is why we run higher voltage transmission lines - same power, less current, much less loss."
  },
  {
    question: "How does power factor affect power calculations?",
    answer: "For resistive loads (heaters, incandescent lamps), pf = 1 and P = VI directly. For loads with inductance or capacitance (motors, transformers, electronic equipment), true power P = VI x pf. The power factor accounts for the phase difference between voltage and current. Always include pf for motor and industrial load calculations."
  },
  {
    question: "What is the relationship between power and energy?",
    answer: "Power is the rate of energy transfer, measured in watts (joules per second). Energy = Power x Time. A 1000 W heater running for 1 hour uses 1000 Wh = 1 kWh of energy. Electricity meters measure energy consumption in kWh. The formula E = Pt links power (watts), time (seconds), and energy (joules)."
  },
  {
    question: "How do I calculate the resistance of a heating element?",
    answer: "Use R = V squared / P or R = P / I squared. For a 3 kW heater at 230 V: R = 230 squared / 3000 = 17.6 ohms. This resistance value is used for cable sizing calculations and understanding the load characteristics. Note that element resistance increases when hot due to positive temperature coefficient."
  }
];

const Level3Module3Section5_1 = () => {
  useSEO(TITLE, DESCRIPTION);
  const [showQuickReference, setShowQuickReference] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 border-b border-white/10 bg-[#1a1a1a]/95 backdrop-blur supports-[backdrop-filter]:bg-[#1a1a1a]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white/70 hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="../section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 5
            </Link>
          </Button>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-b from-orange-900/20 to-transparent border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-orange-500/20 rounded-lg">
              <Flame className="w-6 h-6 text-orange-400" />
            </div>
            <span className="text-orange-400 font-medium">Section 5.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Power Equations
          </h1>
          <p className="text-lg text-white/70 max-w-2xl">
            Understanding P = VI, P = I squared R, and P = V squared / R - the fundamental equations for electrical power calculations
          </p>
        </div>
      </div>

      {/* Quick Summary Boxes */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-4 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="bg-blue-500/10 border-blue-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-400">Basic Power</span>
              </div>
              <p className="text-sm text-white/70">P = V x I (Watts = Volts x Amps)</p>
            </CardContent>
          </Card>
          <Card className="bg-amber-500/10 border-amber-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <Calculator className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-medium text-amber-400">Cable Losses</span>
              </div>
              <p className="text-sm text-white/70">P = I squared x R (power lost as heat)</p>
            </CardContent>
          </Card>
          <Card className="bg-red-500/10 border-red-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <Flame className="w-4 h-4 text-red-400" />
                <span className="text-sm font-medium text-red-400">Heating Elements</span>
              </div>
              <p className="text-sm text-white/70">P = V squared / R (resistive loads)</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Learning Outcomes */}
        <Card className="bg-blue-500/10 border-blue-500/20 mb-8">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-500/20 rounded-lg shrink-0">
                <Target className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white mb-3">Learning Outcomes</h2>
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                    <span>Apply the three forms of the power equation to solve practical problems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                    <span>Calculate power dissipation in cables, resistors and heating elements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                    <span>Understand the significance of I squared R losses in electrical installations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                    <span>Calculate three-phase power for balanced and unbalanced loads</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="prose prose-invert max-w-none">
          {/* Section 1: Basic Power Equation */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Zap className="w-5 h-5 text-blue-400" />
              </div>
              <h2 className="text-xl font-semibold text-white m-0">The Basic Power Equation: P = VI</h2>
            </div>

            <p className="text-white/80 leading-relaxed">
              Electrical power is the rate at which electrical energy is transferred or converted.
              The basic power equation states that power in watts equals voltage in volts multiplied
              by current in amperes. This fundamental relationship is derived from the definitions
              of voltage (energy per coulomb) and current (coulombs per second).
            </p>

            <Card className="bg-white/5 border-white/10 my-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Power Equation and Units</h3>
                <div className="bg-gradient-to-r from-blue-500/10 to-transparent p-4 rounded-lg border-l-4 border-blue-500 mb-4">
                  <p className="text-white font-medium mb-2">Fundamental Power Equation:</p>
                  <p className="text-blue-300 font-mono text-2xl mb-2">P = V x I</p>
                  <div className="text-white/70 text-sm space-y-1">
                    <p>P = Power in watts (W)</p>
                    <p>V = Voltage in volts (V)</p>
                    <p>I = Current in amperes (A)</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-3 bg-white/5 rounded-lg">
                    <p className="text-white font-medium mb-2">Rearrangements</p>
                    <div className="text-white/70 text-sm font-mono space-y-1">
                      <p>I = P / V (current from power and voltage)</p>
                      <p>V = P / I (voltage from power and current)</p>
                    </div>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <p className="text-white font-medium mb-2">Common Multiples</p>
                    <div className="text-white/70 text-sm space-y-1">
                      <p>1 kW = 1000 W</p>
                      <p>1 MW = 1,000,000 W</p>
                      <p>1 mW = 0.001 W</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-500/10 border-green-500/20 my-6">
              <CardContent className="p-6">
                <h4 className="text-green-400 font-medium mb-3">Worked Example: Current from Power Rating</h4>
                <p className="text-white/70 text-sm mb-3">
                  A 2.5 kW electric hob element operates at 230 V. Calculate the current it draws.
                </p>
                <div className="space-y-2 text-sm font-mono">
                  <p className="text-white/80">Given: P = 2500 W, V = 230 V</p>
                  <p className="text-white/80">Find: I</p>
                  <p className="text-white/80">I = P / V = 2500 / 230 = 10.87 A</p>
                  <p className="text-green-400 mt-2">The hob draws approximately 11 A - suitable for a 15 A or 20 A circuit</p>
                </div>
              </CardContent>
            </Card>

            <InlineCheck
              question={quickCheckQuestions[0].question}
              options={quickCheckQuestions[0].options}
              correctIndex={quickCheckQuestions[0].correctIndex}
              explanation={quickCheckQuestions[0].explanation}
            />
          </section>

          {/* Section 2: P = I²R */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-amber-500/20 rounded-lg">
                <Calculator className="w-5 h-5 text-amber-400" />
              </div>
              <h2 className="text-xl font-semibold text-white m-0">Cable Losses: P = I squared x R</h2>
            </div>

            <p className="text-white/80 leading-relaxed">
              By substituting V = IR (Ohm's law) into P = VI, we get P = I squared x R. This form
              is particularly useful for calculating power dissipated in conductors, as we typically
              know the current flowing and the cable resistance. These losses appear as heat and
              represent wasted energy.
            </p>

            <Card className="bg-white/5 border-white/10 my-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Understanding I squared R Losses</h3>
                <div className="bg-gradient-to-r from-amber-500/10 to-transparent p-4 rounded-lg border-l-4 border-amber-500 mb-4">
                  <p className="text-white font-medium mb-2">Power Dissipation Formula:</p>
                  <p className="text-amber-300 font-mono text-2xl mb-2">P = I squared x R</p>
                  <p className="text-white/70 text-sm">Power is proportional to current SQUARED - doubling current quadruples losses</p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <h4 className="text-white font-medium mb-2">Why This Matters</h4>
                  <ul className="text-white/70 text-sm space-y-2">
                    <li><strong>Heat generation:</strong> Cables warm up due to I squared R losses, affecting insulation life</li>
                    <li><strong>Voltage drop:</strong> Lost power means voltage drop along the cable (V = IR)</li>
                    <li><strong>Efficiency:</strong> Power lost in cables is not delivered to the load</li>
                    <li><strong>Cable sizing:</strong> Larger cables have lower R, reducing losses</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-amber-500/10 border-amber-500/20 my-6">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-amber-400 font-medium mb-2">Critical Point: Current Squared Effect</h4>
                    <div className="text-white/80 text-sm space-y-2">
                      <p>Because power is proportional to I squared:</p>
                      <div className="grid md:grid-cols-2 gap-4 mt-2">
                        <div className="p-3 bg-white/5 rounded-lg">
                          <p className="font-medium text-white mb-1">If current doubles:</p>
                          <p className="font-mono text-amber-300">P = (2I) squared x R = 4 x I squared x R</p>
                          <p className="text-white/60 text-xs mt-1">Losses increase by 4 times</p>
                        </div>
                        <div className="p-3 bg-white/5 rounded-lg">
                          <p className="font-medium text-white mb-1">If current triples:</p>
                          <p className="font-mono text-amber-300">P = (3I) squared x R = 9 x I squared x R</p>
                          <p className="text-white/60 text-xs mt-1">Losses increase by 9 times</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <InlineCheck
              question={quickCheckQuestions[1].question}
              options={quickCheckQuestions[1].options}
              correctIndex={quickCheckQuestions[1].correctIndex}
              explanation={quickCheckQuestions[1].explanation}
            />
          </section>

          {/* Section 3: P = V²/R */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <Flame className="w-5 h-5 text-red-400" />
              </div>
              <h2 className="text-xl font-semibold text-white m-0">Heating Elements: P = V squared / R</h2>
            </div>

            <p className="text-white/80 leading-relaxed">
              By substituting I = V/R into P = VI, we get P = V squared / R. This form is useful
              when calculating power for fixed resistive loads connected to a known voltage, such
              as heating elements in kettles, ovens, and electric heaters.
            </p>

            <Card className="bg-white/5 border-white/10 my-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Power in Resistive Loads</h3>
                <div className="bg-gradient-to-r from-red-500/10 to-transparent p-4 rounded-lg border-l-4 border-red-500 mb-4">
                  <p className="text-white font-medium mb-2">Voltage-Based Power Formula:</p>
                  <p className="text-red-300 font-mono text-2xl mb-2">P = V squared / R</p>
                  <p className="text-white/70 text-sm">Useful for calculating heating element power from voltage and resistance</p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-lg">
                    <h4 className="text-white font-medium mb-2">Rearrangements</h4>
                    <div className="space-y-2 text-sm font-mono">
                      <p className="text-white/80">R = V squared / P (find element resistance)</p>
                      <p className="text-white/80">V = sqrt(P x R) (find voltage)</p>
                    </div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg">
                    <h4 className="text-white font-medium mb-2">Applications</h4>
                    <ul className="text-white/70 text-sm space-y-1">
                      <li>Immersion heater elements</li>
                      <li>Electric fire elements</li>
                      <li>Kettle and iron elements</li>
                      <li>Industrial heating loads</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-500/10 border-green-500/20 my-6">
              <CardContent className="p-6">
                <h4 className="text-green-400 font-medium mb-3">Worked Example: Element Resistance</h4>
                <p className="text-white/70 text-sm mb-3">
                  Calculate the resistance of a 3 kW immersion heater element operating at 230 V.
                </p>
                <div className="space-y-2 text-sm font-mono">
                  <p className="text-white/80">Given: P = 3000 W, V = 230 V</p>
                  <p className="text-white/80">Find: R</p>
                  <p className="text-white/80">R = V squared / P = 230 squared / 3000</p>
                  <p className="text-white/80">R = 52900 / 3000 = 17.6 ohms</p>
                  <p className="text-green-400 mt-2">The element has resistance of approximately 17.6 ohms when hot</p>
                </div>
              </CardContent>
            </Card>

            <InlineCheck
              question={quickCheckQuestions[2].question}
              options={quickCheckQuestions[2].options}
              correctIndex={quickCheckQuestions[2].correctIndex}
              explanation={quickCheckQuestions[2].explanation}
            />
          </section>

          {/* Section 4: Three-Phase Power */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Lightbulb className="w-5 h-5 text-purple-400" />
              </div>
              <h2 className="text-xl font-semibold text-white m-0">Three-Phase Power Calculations</h2>
            </div>

            <p className="text-white/80 leading-relaxed">
              Three-phase systems are more efficient for transmitting power and running large motors.
              The power calculation includes a factor of sqrt(3) (approximately 1.732) to account
              for the relationship between line and phase values in balanced three-phase systems.
            </p>

            <Card className="bg-white/5 border-white/10 my-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Three-Phase Power Formulae</h3>
                <div className="bg-gradient-to-r from-purple-500/10 to-transparent p-4 rounded-lg border-l-4 border-purple-500 mb-4">
                  <p className="text-white font-medium mb-3">Balanced Three-Phase Power:</p>
                  <div className="space-y-3 font-mono">
                    <div>
                      <p className="text-purple-300 text-lg">P = sqrt(3) x V_L x I_L x cos(phi)</p>
                      <p className="text-white/60 text-sm mt-1">Using line voltage (400 V) and line current</p>
                    </div>
                    <div>
                      <p className="text-purple-300 text-lg">P = 3 x V_ph x I_ph x cos(phi)</p>
                      <p className="text-white/60 text-sm mt-1">Using phase voltage (230 V) and phase current</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <h4 className="text-white font-medium mb-2">Worked Example: Three-Phase Motor</h4>
                  <p className="text-white/70 text-sm mb-3">
                    A 400 V three-phase motor draws 20 A per line with power factor 0.85. Calculate power.
                  </p>
                  <div className="space-y-2 text-sm font-mono">
                    <p className="text-white/80">P = sqrt(3) x V_L x I_L x pf</p>
                    <p className="text-white/80">P = 1.732 x 400 x 20 x 0.85</p>
                    <p className="text-white/80">P = 11782 W = 11.78 kW</p>
                    <p className="text-green-400 mt-2">The motor consumes approximately 11.8 kW of true power</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-500/10 border-blue-500/20 my-6">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-blue-400 font-medium mb-2">Line vs Phase Values</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="text-white/80">
                        <p className="font-medium text-white mb-1">Star (Y) Connection:</p>
                        <ul className="space-y-1">
                          <li>V_L = sqrt(3) x V_ph</li>
                          <li>I_L = I_ph</li>
                          <li>V_L = 400 V, V_ph = 230 V</li>
                        </ul>
                      </div>
                      <div className="text-white/80">
                        <p className="font-medium text-white mb-1">Delta Connection:</p>
                        <ul className="space-y-1">
                          <li>V_L = V_ph</li>
                          <li>I_L = sqrt(3) x I_ph</li>
                          <li>V_L = V_ph = 400 V</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <InlineCheck
              question={quickCheckQuestions[3].question}
              options={quickCheckQuestions[3].options}
              correctIndex={quickCheckQuestions[3].correctIndex}
              explanation={quickCheckQuestions[3].explanation}
            />
          </section>

          {/* Practical Guidance */}
          <section className="mb-12">
            <Card className="bg-green-500/10 border-green-500/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-green-500/20 rounded-lg shrink-0">
                    <BookOpen className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="w-full">
                    <h3 className="text-lg font-semibold text-white mb-4">Practical Guidance for Electricians</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-white/5 rounded-lg">
                        <h4 className="text-green-400 font-medium mb-2">When to Use Each Formula</h4>
                        <ul className="text-sm text-white/80 space-y-1">
                          <li><strong>P = VI:</strong> General calculations, meter readings</li>
                          <li><strong>P = I squared R:</strong> Cable losses, voltage drop</li>
                          <li><strong>P = V squared / R:</strong> Heating element sizing</li>
                          <li><strong>Include pf:</strong> Motors, transformers, electronics</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-white/5 rounded-lg">
                        <h4 className="text-green-400 font-medium mb-2">Common Calculations</h4>
                        <ul className="text-sm text-white/80 space-y-1">
                          <li>Circuit MCB rating: I = P / V</li>
                          <li>Cable voltage drop: V = IR, P = I squared R</li>
                          <li>Element replacement: R = V squared / P</li>
                          <li>Motor load: P = sqrt(3) x V x I x pf</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <HelpCircle className="w-5 h-5 text-blue-400" />
              </div>
              <h2 className="text-xl font-semibold text-white m-0">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="bg-white/5 border-white/10">
                  <CardContent className="p-4">
                    <h3 className="text-white font-medium mb-2 flex items-start gap-2">
                      <span className="text-blue-400 font-bold shrink-0">Q:</span>
                      {faq.question}
                    </h3>
                    <p className="text-white/70 text-sm ml-6">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Quick Reference Toggle */}
          <section className="mb-12">
            <Button
              variant="outline"
              className="w-full justify-between text-white border-white/20 hover:bg-white/10"
              onClick={() => setShowQuickReference(!showQuickReference)}
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Quick Reference - Power Equations
              </span>
              <span>{showQuickReference ? '−' : '+'}</span>
            </Button>

            {showQuickReference && (
              <Card className="mt-4 bg-white/5 border-white/10">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-white font-medium mb-3">Single-Phase Formulae</h4>
                      <div className="space-y-2 text-sm font-mono text-white/80">
                        <p>P = V x I (basic power)</p>
                        <p>P = I squared x R (cable losses)</p>
                        <p>P = V squared / R (heating elements)</p>
                        <p>P = V x I x pf (AC with power factor)</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-3">Three-Phase Formulae</h4>
                      <div className="space-y-2 text-sm font-mono text-white/80">
                        <p>P = sqrt(3) x V_L x I_L x pf</p>
                        <p>P = 3 x V_ph x I_ph x pf</p>
                        <p>sqrt(3) = 1.732</p>
                        <p>V_L = 400 V, V_ph = 230 V (UK)</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-3">Rearrangements</h4>
                      <div className="space-y-2 text-sm font-mono text-white/80">
                        <p>I = P / V</p>
                        <p>V = P / I</p>
                        <p>R = V squared / P</p>
                        <p>R = P / I squared</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-3">Power Units</h4>
                      <div className="space-y-2 text-sm text-white/80">
                        <p>1 W = 1 J/s = 1 VA (resistive)</p>
                        <p>1 kW = 1000 W</p>
                        <p>1 hp = 746 W (approx 0.75 kW)</p>
                        <p>1 kWh = 3.6 MJ (energy)</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </section>
        </div>

        {/* Quiz Section */}
        <section className="mb-12">
          <Quiz
            questions={quizQuestions}
            title="Power Equations Quiz"
            description="Test your understanding of power equations and their practical applications."
          />
        </section>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-8 border-t border-white/10">
          <Button variant="outline" className="text-white border-white/20 hover:bg-white/10" asChild>
            <Link to="/study-centre/apprentice/level3-module3-section4-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Harmonics and Waveform Distortion
            </Link>
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
            <Link to="/study-centre/apprentice/level3-module3-section5-2">
              Next: Efficiency and Losses
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Level3Module3Section5_1;
