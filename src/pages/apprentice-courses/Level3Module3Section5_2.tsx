import { ArrowLeft, ArrowRight, BookOpen, Zap, Calculator, AlertTriangle, Lightbulb, CheckCircle2, HelpCircle, Info, Target, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";

const TITLE = "Efficiency and Losses - Level 3 Electrical Science";
const DESCRIPTION = "Master efficiency calculations and understand electrical losses in motors, transformers and cables for City & Guilds Level 3.";

const quickCheckQuestions = [
  {
    id: "qc1",
    question: "A motor produces 7.5 kW output from 9 kW input. What is its efficiency?",
    options: ["75%", "83.3%", "120%", "66.7%"],
    correctIndex: 1,
    explanation: "Efficiency = Output / Input x 100% = 7.5 / 9 x 100 = 83.3%. The remaining 16.7% is lost as heat."
  },
  {
    id: "qc2",
    question: "Copper losses in a transformer are also known as:",
    options: ["Core losses", "I squared R losses", "Eddy current losses", "Hysteresis losses"],
    correctIndex: 1,
    explanation: "Copper losses are the I squared R losses in the transformer windings. They are load-dependent and increase with the square of the current."
  },
  {
    id: "qc3",
    question: "Which type of loss is constant regardless of load?",
    options: ["Copper losses", "I squared R losses", "Iron losses", "Winding losses"],
    correctIndex: 2,
    explanation: "Iron losses (core losses) occur due to the magnetising of the core and are constant as long as the transformer is energised, regardless of load."
  },
  {
    id: "qc4",
    question: "A cable has 2% power loss. If 10 kW is delivered to the load, what was the input power?",
    options: ["10.2 kW", "10.4 kW", "10.204 kW", "9.8 kW"],
    correctIndex: 2,
    explanation: "If 2% is lost, 98% reaches the load. Input = Output / 0.98 = 10 / 0.98 = 10.204 kW."
  }
];

const quizQuestions = [
  {
    id: "q1",
    question: "The formula for electrical efficiency is:",
    options: ["Input / Output x 100%", "Output / Input x 100%", "Losses / Input x 100%", "Input - Output"],
    correctAnswer: "Output / Input x 100%",
    explanation: "Efficiency = (Useful Output Power / Input Power) x 100%. This gives the percentage of input power that becomes useful output."
  },
  {
    id: "q2",
    question: "A transformer has 500 W iron losses and 300 W copper losses at full load. Total losses are:",
    options: ["200 W", "800 W", "500 W", "1500 W"],
    correctAnswer: "800 W",
    explanation: "Total losses = Iron losses + Copper losses = 500 + 300 = 800 W. Iron losses are constant; copper losses vary with load."
  },
  {
    id: "q3",
    question: "If a motor is 85% efficient and produces 11 kW output, the input power is:",
    options: ["12.94 kW", "9.35 kW", "11.85 kW", "13.5 kW"],
    correctAnswer: "12.94 kW",
    explanation: "Input = Output / Efficiency = 11 / 0.85 = 12.94 kW. The motor draws more power than it outputs due to losses."
  },
  {
    id: "q4",
    question: "Eddy current losses in a transformer core can be reduced by:",
    options: ["Using solid iron core", "Using laminated core", "Increasing frequency", "Using copper core"],
    correctAnswer: "Using laminated core",
    explanation: "Laminations break up the paths for eddy currents, reducing these losses. Each thin lamination is insulated from the next."
  },
  {
    id: "q5",
    question: "Maximum efficiency in a transformer occurs when:",
    options: ["At no load", "Copper losses equal iron losses", "At full load", "Iron losses are zero"],
    correctAnswer: "Copper losses equal iron losses",
    explanation: "Mathematically, maximum efficiency occurs when variable losses (copper) equal fixed losses (iron). This typically occurs around 50-75% load."
  },
  {
    id: "q6",
    question: "A 15 kW motor with 90% efficiency has losses of:",
    options: ["1.5 kW", "1.67 kW", "13.5 kW", "1.35 kW"],
    correctAnswer: "1.67 kW",
    explanation: "Input = 15 / 0.9 = 16.67 kW. Losses = Input - Output = 16.67 - 15 = 1.67 kW."
  },
  {
    id: "q7",
    question: "Hysteresis losses in a transformer are caused by:",
    options: ["Resistance in windings", "Changing magnetic domains in core", "Circulating currents in core", "Leakage flux"],
    correctAnswer: "Changing magnetic domains in core",
    explanation: "Hysteresis losses occur because energy is needed to repeatedly magnetise and demagnetise the core material as the AC field changes direction."
  },
  {
    id: "q8",
    question: "IE3 motor efficiency classification indicates:",
    options: ["Standard efficiency", "High efficiency", "Premium efficiency", "Super premium efficiency"],
    correctAnswer: "Premium efficiency",
    explanation: "IE3 is premium efficiency under IEC 60034-30. IE1 is standard, IE2 is high, IE3 is premium, and IE4 is super premium."
  },
  {
    id: "q9",
    question: "Cable losses are primarily affected by:",
    options: ["Voltage only", "Current squared", "Frequency", "Power factor"],
    correctAnswer: "Current squared",
    explanation: "Cable losses follow P = I squared x R, so they increase with the square of the current. Doubling current quadruples losses."
  },
  {
    id: "q10",
    question: "The overall efficiency of a system with two 90% efficient stages is:",
    options: ["180%", "90%", "81%", "95%"],
    correctAnswer: "81%",
    explanation: "Overall efficiency = 0.9 x 0.9 = 0.81 = 81%. Efficiencies multiply for series stages, always giving a lower result."
  },
  {
    id: "q11",
    question: "Stray losses in motors are caused by:",
    options: ["Winding resistance", "Bearing friction", "Leakage flux and harmonic currents", "Ventilation fan"],
    correctAnswer: "Leakage flux and harmonic currents",
    explanation: "Stray losses include losses from leakage flux, harmonic currents, and other effects not accounted for in main iron and copper losses."
  },
  {
    id: "q12",
    question: "A transformer with 97% efficiency delivering 50 kW has losses of:",
    options: ["1.5 kW", "1.55 kW", "48.5 kW", "3 kW"],
    correctAnswer: "1.55 kW",
    explanation: "Input = 50 / 0.97 = 51.55 kW. Losses = 51.55 - 50 = 1.55 kW. Alternatively: Losses = Input x (1 - efficiency)."
  }
];

const faqs = [
  {
    question: "What is the difference between iron losses and copper losses?",
    answer: "Iron losses (core losses) occur in the magnetic core due to hysteresis and eddy currents - they are constant whenever the equipment is energised. Copper losses (I squared R losses) occur in the windings due to their resistance - they increase with the square of the current and are therefore load-dependent. Total losses = iron losses + copper losses."
  },
  {
    question: "Why does efficiency matter for electrical equipment?",
    answer: "Efficiency affects running costs, heat generation, and environmental impact. A 1% efficiency improvement on a large motor can save thousands of pounds annually. Heat from losses must be dissipated, affecting cooling requirements. EU regulations (Ecodesign) mandate minimum motor efficiencies (IE3/IE4) for environmental reasons."
  },
  {
    question: "How do I calculate the running cost of inefficient equipment?",
    answer: "Extra cost = Power x Hours x Rate x (1/efficiency_old - 1/efficiency_new). For example, replacing an 85% efficient motor with 92% efficient: for 10 kW output, 8000 hours/year, 15p/kWh: Annual saving = 10 x 8000 x 0.15 x (1/0.85 - 1/0.92) = 12000 x (1.176 - 1.087) = 1068 pounds per year."
  },
  {
    question: "What are the main sources of loss in electric motors?",
    answer: "Motor losses include: Stator copper losses (I squared R in stator windings), Rotor copper losses (I squared R in rotor), Iron losses (hysteresis and eddy current in core), Mechanical losses (bearing friction, windage), and Stray losses (leakage flux effects). Larger motors typically have higher efficiency as fixed losses become proportionally smaller."
  },
  {
    question: "How does load affect transformer efficiency?",
    answer: "Transformer efficiency varies with load. Iron losses are constant, but copper losses increase with load squared. Maximum efficiency occurs when copper losses equal iron losses (typically 50-75% load). At light loads, iron losses dominate; at heavy loads, copper losses dominate. This is why transformers are sized to operate near their optimal efficiency point."
  },
  {
    question: "What is the significance of motor efficiency classes IE1 to IE4?",
    answer: "IEC 60034-30 defines motor efficiency classes: IE1 (Standard), IE2 (High), IE3 (Premium), IE4 (Super Premium). EU Ecodesign regulations require IE3 minimum for most industrial motors. IE4 motors offer typically 1-2% higher efficiency than IE3, providing significant lifetime savings on large continuously running motors. Payback period depends on running hours and electricity costs."
  }
];

const Level3Module3Section5_2 = () => {
  useSEO(TITLE, DESCRIPTION);
  const [showQuickReference, setShowQuickReference] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
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
      <div className="bg-gradient-to-b from-amber-900/20 to-transparent border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-amber-500/20 rounded-lg">
              <TrendingDown className="w-6 h-6 text-amber-400" />
            </div>
            <span className="text-amber-400 font-medium">Section 5.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Efficiency and Losses
          </h1>
          <p className="text-lg text-white/70 max-w-2xl">
            Calculating efficiency and understanding electrical losses in motors, transformers and cables
          </p>
        </div>
      </div>

      {/* Quick Summary Boxes */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-4 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="bg-green-500/10 border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-green-400" />
                <span className="text-sm font-medium text-green-400">Efficiency Formula</span>
              </div>
              <p className="text-sm text-white/70">Eff = Output / Input x 100%</p>
            </CardContent>
          </Card>
          <Card className="bg-amber-500/10 border-amber-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <Calculator className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-medium text-amber-400">Power Loss</span>
              </div>
              <p className="text-sm text-white/70">Losses = Input - Output (watts)</p>
            </CardContent>
          </Card>
          <Card className="bg-red-500/10 border-red-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <TrendingDown className="w-4 h-4 text-red-400" />
                <span className="text-sm font-medium text-red-400">Total Losses</span>
              </div>
              <p className="text-sm text-white/70">Iron losses + Copper losses (I squared R)</p>
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
                    <span>Calculate electrical efficiency for motors, transformers and systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                    <span>Distinguish between different types of electrical losses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                    <span>Understand the relationship between load and losses in transformers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                    <span>Apply efficiency classifications for motors (IE1 to IE4)</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="prose prose-invert max-w-none">
          {/* Section 1: Efficiency Basics */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Zap className="w-5 h-5 text-green-400" />
              </div>
              <h2 className="text-xl font-semibold text-white m-0">Understanding Electrical Efficiency</h2>
            </div>

            <p className="text-white/80 leading-relaxed">
              Electrical efficiency measures how effectively a device converts input power to useful output.
              No real device is 100% efficient - some energy is always lost, primarily as heat. Understanding
              efficiency is essential for equipment selection, running cost calculations, and meeting
              regulatory requirements.
            </p>

            <Card className="bg-white/5 border-white/10 my-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Efficiency Calculations</h3>
                <div className="bg-gradient-to-r from-green-500/10 to-transparent p-4 rounded-lg border-l-4 border-green-500 mb-4">
                  <p className="text-white font-medium mb-2">Efficiency Formula:</p>
                  <p className="text-green-300 font-mono text-2xl mb-2">Efficiency = (Output Power / Input Power) x 100%</p>
                  <div className="text-white/70 text-sm space-y-1 mt-3">
                    <p>Alternative forms:</p>
                    <p className="font-mono">Efficiency = (Input - Losses) / Input x 100%</p>
                    <p className="font-mono">Losses = Input x (1 - Efficiency)</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-lg">
                    <h4 className="text-white font-medium mb-2">Finding Input Power</h4>
                    <p className="text-white/70 text-sm font-mono">Input = Output / Efficiency</p>
                    <p className="text-white/60 text-xs mt-2">Use when you know output and efficiency</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg">
                    <h4 className="text-white font-medium mb-2">Finding Losses</h4>
                    <p className="text-white/70 text-sm font-mono">Losses = Input - Output</p>
                    <p className="text-white/60 text-xs mt-2">Power converted to heat</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-500/10 border-green-500/20 my-6">
              <CardContent className="p-6">
                <h4 className="text-green-400 font-medium mb-3">Worked Example: Motor Efficiency</h4>
                <p className="text-white/70 text-sm mb-3">
                  A motor delivers 15 kW mechanical output while drawing 18 kW electrical input. Calculate efficiency and losses.
                </p>
                <div className="space-y-2 text-sm font-mono">
                  <p className="text-white/80">Efficiency = Output / Input x 100%</p>
                  <p className="text-white/80">Efficiency = 15 / 18 x 100 = 83.3%</p>
                  <p className="text-white/80">Losses = Input - Output = 18 - 15 = 3 kW</p>
                  <p className="text-green-400 mt-2">The motor is 83.3% efficient with 3 kW lost as heat</p>
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

          {/* Section 2: Types of Losses */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-amber-500/20 rounded-lg">
                <TrendingDown className="w-5 h-5 text-amber-400" />
              </div>
              <h2 className="text-xl font-semibold text-white m-0">Types of Electrical Losses</h2>
            </div>

            <p className="text-white/80 leading-relaxed">
              Electrical losses can be categorised into different types depending on their cause and
              characteristics. Understanding these helps in designing efficient systems and selecting
              appropriate equipment.
            </p>

            <Card className="bg-white/5 border-white/10 my-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Loss Categories</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
                    <h4 className="text-amber-400 font-medium mb-2">Copper Losses (I squared R Losses)</h4>
                    <p className="text-white/80 text-sm mb-2">
                      Power dissipated as heat in conductors due to their resistance. Also called
                      winding losses in motors and transformers.
                    </p>
                    <div className="text-sm font-mono text-amber-300">
                      P_copper = I squared x R (load-dependent, increases with current squared)
                    </div>
                  </div>
                  <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <h4 className="text-blue-400 font-medium mb-2">Iron Losses (Core Losses)</h4>
                    <p className="text-white/80 text-sm mb-2">
                      Losses in magnetic cores due to changing magnetic field. Constant when energised.
                    </p>
                    <ul className="text-white/70 text-sm space-y-1">
                      <li><strong>Hysteresis:</strong> Energy to repeatedly magnetise the core</li>
                      <li><strong>Eddy currents:</strong> Circulating currents induced in the core</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                    <h4 className="text-purple-400 font-medium mb-2">Mechanical Losses (Motors)</h4>
                    <p className="text-white/80 text-sm">
                      Friction in bearings, windage (air resistance), and brush friction in DC motors.
                      These are approximately constant at a given speed.
                    </p>
                  </div>
                  <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                    <h4 className="text-green-400 font-medium mb-2">Stray Losses</h4>
                    <p className="text-white/80 text-sm">
                      Additional losses from leakage flux, non-uniform current distribution, and
                      harmonic effects. Typically 1-2% of input in motors.
                    </p>
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

          {/* Section 3: Transformer Efficiency */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Calculator className="w-5 h-5 text-blue-400" />
              </div>
              <h2 className="text-xl font-semibold text-white m-0">Transformer Efficiency and Loading</h2>
            </div>

            <p className="text-white/80 leading-relaxed">
              Transformer efficiency varies with load because copper losses are load-dependent while
              iron losses are constant. Maximum efficiency occurs at a specific load point where
              copper losses equal iron losses.
            </p>

            <Card className="bg-white/5 border-white/10 my-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Efficiency vs Load Relationship</h3>
                <div className="bg-gradient-to-r from-blue-500/10 to-transparent p-4 rounded-lg border-l-4 border-blue-500 mb-4">
                  <p className="text-white font-medium mb-2">Maximum Efficiency Condition:</p>
                  <p className="text-blue-300 font-mono text-lg mb-2">Copper Losses = Iron Losses</p>
                  <p className="text-white/70 text-sm">This typically occurs at 50-75% of full load</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left p-2 text-white">Load</th>
                        <th className="text-left p-2 text-white">Iron Losses</th>
                        <th className="text-left p-2 text-white">Copper Losses</th>
                        <th className="text-left p-2 text-white">Efficiency</th>
                      </tr>
                    </thead>
                    <tbody className="text-white/70">
                      <tr className="border-b border-white/10">
                        <td className="p-2">No load</td>
                        <td className="p-2">Full (constant)</td>
                        <td className="p-2">Zero</td>
                        <td className="p-2">0% (no output)</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="p-2">25% load</td>
                        <td className="p-2">Full</td>
                        <td className="p-2">6.25% of FL</td>
                        <td className="p-2">Lower</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="p-2">50% load</td>
                        <td className="p-2">Full</td>
                        <td className="p-2">25% of FL</td>
                        <td className="p-2">Near maximum</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="p-2">75% load</td>
                        <td className="p-2">Full</td>
                        <td className="p-2">56.25% of FL</td>
                        <td className="p-2">Maximum region</td>
                      </tr>
                      <tr>
                        <td className="p-2">Full load</td>
                        <td className="p-2">Full</td>
                        <td className="p-2">100%</td>
                        <td className="p-2">High</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-500/10 border-blue-500/20 my-6">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-blue-400 font-medium mb-2">Copper Loss Variation with Load</h4>
                    <p className="text-white/80 text-sm mb-2">
                      Copper losses vary with the square of the load fraction:
                    </p>
                    <p className="text-blue-300 font-mono text-sm">
                      Copper losses at x load = x squared x Full load copper losses
                    </p>
                    <p className="text-white/60 text-sm mt-2">
                      At 50% load: Copper losses = 0.5 squared x FL = 0.25 x Full load copper losses
                    </p>
                  </div>
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

          {/* Section 4: Motor Efficiency Classes */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Lightbulb className="w-5 h-5 text-purple-400" />
              </div>
              <h2 className="text-xl font-semibold text-white m-0">Motor Efficiency Classes and Regulations</h2>
            </div>

            <p className="text-white/80 leading-relaxed">
              Motor efficiency is classified under IEC 60034-30 into four levels. EU Ecodesign
              regulations mandate minimum efficiency levels for motors to reduce energy consumption
              and carbon emissions.
            </p>

            <Card className="bg-white/5 border-white/10 my-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">IEC Motor Efficiency Classes</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left p-2 text-white">Class</th>
                        <th className="text-left p-2 text-white">Name</th>
                        <th className="text-left p-2 text-white">Typical Efficiency*</th>
                        <th className="text-left p-2 text-white">EU Requirement</th>
                      </tr>
                    </thead>
                    <tbody className="text-white/70">
                      <tr className="border-b border-white/10">
                        <td className="p-2 text-purple-400">IE1</td>
                        <td className="p-2">Standard Efficiency</td>
                        <td className="p-2">85-88%</td>
                        <td className="p-2">No longer permitted</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="p-2 text-blue-400">IE2</td>
                        <td className="p-2">High Efficiency</td>
                        <td className="p-2">88-91%</td>
                        <td className="p-2">With VSD only</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="p-2 text-green-400">IE3</td>
                        <td className="p-2">Premium Efficiency</td>
                        <td className="p-2">91-93%</td>
                        <td className="p-2">Minimum (0.75-375kW)</td>
                      </tr>
                      <tr>
                        <td className="p-2 text-amber-400">IE4</td>
                        <td className="p-2">Super Premium</td>
                        <td className="p-2">93-95%</td>
                        <td className="p-2">Required 75-200kW (2023)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-white/60 text-xs mt-4">*Typical values for 11 kW 4-pole motor. Actual efficiency varies with size and speed.</p>
              </CardContent>
            </Card>

            <Card className="bg-amber-500/10 border-amber-500/20 my-6">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-amber-400 font-medium mb-2">Economic Impact of Efficiency</h4>
                    <p className="text-white/70 text-sm mb-3">
                      Higher efficiency motors cost more initially but save significantly over their lifetime.
                    </p>
                    <div className="p-3 bg-white/5 rounded-lg">
                      <p className="text-white font-medium mb-2">Example: 11 kW motor, 8000 hours/year</p>
                      <div className="text-sm text-white/70 space-y-1">
                        <p>IE2 (89% eff): Draws 12.36 kW, costs 14,833 pounds/year at 15p/kWh</p>
                        <p>IE3 (91.4% eff): Draws 12.03 kW, costs 14,436 pounds/year</p>
                        <p className="text-green-400 font-medium mt-2">Annual saving: 397 pounds - payback in 1-2 years</p>
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
                        <h4 className="text-green-400 font-medium mb-2">Reducing System Losses</h4>
                        <ul className="text-sm text-white/80 space-y-1">
                          <li>Use correctly sized cables (reduce I squared R)</li>
                          <li>Specify IE3/IE4 motors for new installations</li>
                          <li>Match transformer loading to expected demand</li>
                          <li>Improve power factor to reduce current</li>
                          <li>Use VSDs to reduce motor speed when possible</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-white/5 rounded-lg">
                        <h4 className="text-green-400 font-medium mb-2">Measuring Efficiency</h4>
                        <ul className="text-sm text-white/80 space-y-1">
                          <li>Use power analysers for accurate measurement</li>
                          <li>Measure both input and output power</li>
                          <li>Account for power factor in AC circuits</li>
                          <li>Compare against nameplate data</li>
                          <li>Monitor for efficiency degradation over time</li>
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
                Quick Reference - Efficiency Formulae
              </span>
              <span>{showQuickReference ? '−' : '+'}</span>
            </Button>

            {showQuickReference && (
              <Card className="mt-4 bg-white/5 border-white/10">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-white font-medium mb-3">Basic Efficiency</h4>
                      <div className="space-y-2 text-sm font-mono text-white/80">
                        <p>Eff = (Output / Input) x 100%</p>
                        <p>Input = Output / Efficiency</p>
                        <p>Losses = Input - Output</p>
                        <p>Losses = Input x (1 - Eff)</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-3">Series Efficiency</h4>
                      <div className="space-y-2 text-sm font-mono text-white/80">
                        <p>Eff_total = Eff1 x Eff2 x Eff3...</p>
                        <p>Example: 0.9 x 0.95 x 0.85 = 0.73</p>
                        <p>Always less than lowest individual</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-3">Transformer Losses</h4>
                      <div className="space-y-2 text-sm text-white/80">
                        <p>Iron losses: Constant (core)</p>
                        <p>Copper losses: Vary with I squared</p>
                        <p>Max eff when: Cu = Fe losses</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-3">Motor Classes (IE)</h4>
                      <div className="space-y-2 text-sm text-white/80">
                        <p>IE1: Standard (not permitted)</p>
                        <p>IE2: High (with VSD)</p>
                        <p>IE3: Premium (minimum)</p>
                        <p>IE4: Super Premium</p>
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
            title="Efficiency and Losses Quiz"
            description="Test your understanding of electrical efficiency and loss calculations."
          />
        </section>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-8 border-t border-white/10">
          <Button variant="outline" className="text-white border-white/20 hover:bg-white/10" asChild>
            <Link to="../level3-module3-section5-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Power Equations
            </Link>
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
            <Link to="../level3-module3-section5-3">
              Next: Energy Consumption and kWh
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Level3Module3Section5_2;
