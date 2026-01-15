import { ArrowLeft, ArrowRight, BookOpen, Zap, Calculator, AlertTriangle, Lightbulb, CheckCircle2, HelpCircle, Info, Target, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";

const TITLE = "Energy Consumption and kWh - Level 3 Electrical Science";
const DESCRIPTION = "Master energy calculations, kilowatt-hours and practical energy consumption analysis for City & Guilds Level 3.";

const quickCheckQuestions = [
  {
    id: "qc1",
    question: "A 3 kW heater runs for 4 hours. How much energy is consumed?",
    options: ["0.75 kWh", "7.5 kWh", "12 kWh", "12000 Wh"],
    correctIndex: 2,
    explanation: "Energy = Power x Time = 3 kW x 4 h = 12 kWh. Both answers C and D are correct as 12 kWh = 12000 Wh."
  },
  {
    id: "qc2",
    question: "One kilowatt-hour (kWh) is equivalent to:",
    options: ["1000 joules", "3600 joules", "3,600,000 joules", "60,000 joules"],
    correctIndex: 2,
    explanation: "1 kWh = 1000 W x 3600 s = 3,600,000 J = 3.6 MJ. A joule is 1 watt-second."
  },
  {
    id: "qc3",
    question: "At 15p per kWh, what does it cost to run a 2 kW heater for 8 hours?",
    options: ["2.40 pounds", "1.20 pounds", "16 pounds", "0.24 pounds"],
    correctIndex: 0,
    explanation: "Cost = Power x Time x Rate = 2 x 8 x 0.15 = 2.40 pounds."
  },
  {
    id: "qc4",
    question: "A 60 W lamp running continuously for a year uses approximately:",
    options: ["525 kWh", "60 kWh", "2160 kWh", "438 kWh"],
    correctIndex: 0,
    explanation: "Hours per year = 365 x 24 = 8760. Energy = 0.06 kW x 8760 h = 525.6 kWh."
  }
];

const quizQuestions = [
  {
    id: "q1",
    question: "The formula for electrical energy is:",
    options: ["E = P / t", "E = P x t", "E = P + t", "E = P - t"],
    correctAnswer: "E = P x t",
    explanation: "Energy equals power multiplied by time. E = Pt gives energy in watt-seconds (joules) or kilowatt-hours."
  },
  {
    id: "q2",
    question: "1 kWh is equal to how many joules?",
    options: ["1000 J", "3600 J", "1,000,000 J", "3,600,000 J"],
    correctAnswer: "3,600,000 J",
    explanation: "1 kWh = 1000 W x 3600 s = 3,600,000 J = 3.6 MJ. The kWh is a larger, more practical unit for billing."
  },
  {
    id: "q3",
    question: "A washing machine uses 1.5 kWh per cycle. At 18p/kWh, what is the cost per wash?",
    options: ["27p", "12p", "18p", "30p"],
    correctAnswer: "27p",
    explanation: "Cost = 1.5 kWh x 18p = 27p per wash cycle."
  },
  {
    id: "q4",
    question: "Which uses more energy: 100 W for 10 hours or 500 W for 2 hours?",
    options: ["100 W for 10 hours", "500 W for 2 hours", "They use the same", "Cannot be determined"],
    correctAnswer: "They use the same",
    explanation: "100 W x 10 h = 1 kWh. 500 W x 2 h = 1 kWh. Both use exactly 1 kWh of energy."
  },
  {
    id: "q5",
    question: "An electricity meter measures:",
    options: ["Power in kW", "Energy in kWh", "Current in amps", "Voltage in volts"],
    correctAnswer: "Energy in kWh",
    explanation: "Electricity meters (revenue meters) measure energy consumption in kilowatt-hours for billing purposes."
  },
  {
    id: "q6",
    question: "A factory consumes 50,000 kWh per month. What is the average power consumption?",
    options: ["69.4 kW", "1667 kW", "2083 kW", "50 kW"],
    correctAnswer: "69.4 kW",
    explanation: "Hours per month = 30 x 24 = 720. Average power = 50000 / 720 = 69.4 kW."
  },
  {
    id: "q7",
    question: "Standing charges on electricity bills cover:",
    options: ["Energy used", "Maximum demand", "Fixed supply costs", "Power factor penalty"],
    correctAnswer: "Fixed supply costs",
    explanation: "Standing charges are fixed daily/monthly fees covering meter rental, connection maintenance, and supply infrastructure."
  },
  {
    id: "q8",
    question: "Maximum demand tariffs measure:",
    options: ["Total energy used", "Highest kW or kVA in a period", "Average power", "Power factor"],
    correctAnswer: "Highest kW or kVA in a period",
    explanation: "Maximum demand is the highest power drawn during a billing period, typically measured in 30-minute intervals."
  },
  {
    id: "q9",
    question: "Converting from joules to kWh: 18,000,000 J equals:",
    options: ["5 kWh", "18 kWh", "50 kWh", "0.5 kWh"],
    correctAnswer: "5 kWh",
    explanation: "kWh = J / 3,600,000 = 18,000,000 / 3,600,000 = 5 kWh."
  },
  {
    id: "q10",
    question: "A 10 W LED replaces a 60 W incandescent. Annual saving at 8 hours/day, 15p/kWh is:",
    options: ["26.28 pounds", "13.14 pounds", "4.38 pounds", "8.76 pounds"],
    correctAnswer: "13.14 pounds",
    explanation: "Saving = (60-10) x 8 x 365 / 1000 x 0.15 = 50 x 2920 / 1000 x 0.15 = 146 x 0.09 = 13.14 pounds."
  },
  {
    id: "q11",
    question: "Economy 7 tariffs offer cheaper rates:",
    options: ["During peak hours", "For 7 hours overnight", "On weekends only", "For commercial users only"],
    correctAnswer: "For 7 hours overnight",
    explanation: "Economy 7 provides cheaper electricity for 7 hours overnight (typically 12am-7am) for off-peak use like storage heaters."
  },
  {
    id: "q12",
    question: "Smart meters allow:",
    options: ["Only estimated billing", "Real-time energy monitoring", "Free electricity", "Unlimited supply"],
    correctAnswer: "Real-time energy monitoring",
    explanation: "Smart meters provide real-time consumption data, enabling better energy management and accurate billing without manual readings."
  }
];

const faqs = [
  {
    question: "What is the difference between power and energy?",
    answer: "Power (measured in watts or kilowatts) is the rate of energy transfer at any instant. Energy (measured in joules or kilowatt-hours) is the total amount transferred over time. A 3 kW heater has a power rating of 3 kW, but the energy it uses depends on how long it runs. Energy = Power x Time."
  },
  {
    question: "Why do we use kWh instead of joules for electricity billing?",
    answer: "The joule is too small for practical billing - a 1 kW heater uses 3.6 million joules per hour. The kilowatt-hour is more convenient: 1 kWh = 1000 watts for 1 hour = 3.6 MJ. Typical household consumption of 3000-4000 kWh per year is easier to understand than billions of joules."
  },
  {
    question: "How do I calculate electricity running costs?",
    answer: "Cost = Power (kW) x Time (hours) x Rate (pence per kWh). For example, a 2 kW heater running 5 hours at 15p/kWh costs 2 x 5 x 15 = 150p = 1.50 pounds. For appliances rated in watts, divide by 1000 to get kW first."
  },
  {
    question: "What is maximum demand and why does it matter?",
    answer: "Maximum demand is the highest power drawn during a billing period, typically measured in 30-minute windows. Commercial tariffs often charge for maximum demand separately because the supply infrastructure must handle peak loads. Reducing peaks (load shifting) can significantly reduce costs."
  },
  {
    question: "How do smart meters benefit energy management?",
    answer: "Smart meters provide real-time consumption data visible on in-home displays, helping identify high-consumption appliances. They enable accurate billing without estimates, time-of-use tariffs, and remote reading. Half-hourly data helps businesses analyse usage patterns and reduce costs."
  },
  {
    question: "What is the typical electricity consumption for common appliances?",
    answer: "Examples: LED lamp 5-10 W, laptop 30-50 W, TV 80-150 W, microwave 800-1200 W, kettle 2-3 kW, electric shower 7-10 kW, oven 2-3 kW, tumble dryer 2-3 kW. Energy use = power x time, so a 3 kW kettle boiling for 3 minutes uses only 0.15 kWh (3 x 3/60 = 0.15)."
  }
];

const Level3Module3Section5_3 = () => {
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
      <div className="bg-gradient-to-b from-green-900/20 to-transparent border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-green-500/20 rounded-lg">
              <Clock className="w-6 h-6 text-green-400" />
            </div>
            <span className="text-green-400 font-medium">Section 5.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Energy Consumption and kWh
          </h1>
          <p className="text-lg text-white/70 max-w-2xl">
            Understanding energy calculations, kilowatt-hours and practical energy consumption analysis
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
                <span className="text-sm font-medium text-blue-400">Energy Formula</span>
              </div>
              <p className="text-sm text-white/70">E = P x t (kWh = kW x hours)</p>
            </CardContent>
          </Card>
          <Card className="bg-green-500/10 border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <Calculator className="w-4 h-4 text-green-400" />
                <span className="text-sm font-medium text-green-400">Unit Conversion</span>
              </div>
              <p className="text-sm text-white/70">1 kWh = 3,600,000 J = 3.6 MJ</p>
            </CardContent>
          </Card>
          <Card className="bg-amber-500/10 border-amber-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-medium text-amber-400">Cost Calculation</span>
              </div>
              <p className="text-sm text-white/70">Cost = kW x hours x rate (p/kWh)</p>
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
                    <span>Calculate electrical energy consumption in kilowatt-hours and joules</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                    <span>Convert between different units of energy measurement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                    <span>Calculate electricity costs for domestic and commercial applications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                    <span>Understand electricity tariffs and billing structures</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="prose prose-invert max-w-none">
          {/* Section 1: Power vs Energy */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Zap className="w-5 h-5 text-blue-400" />
              </div>
              <h2 className="text-xl font-semibold text-white m-0">Power vs Energy: Understanding the Difference</h2>
            </div>

            <p className="text-white/80 leading-relaxed">
              Power and energy are related but distinct concepts. Power is the rate at which energy
              is transferred or used, measured in watts. Energy is the total amount transferred over
              a period of time, measured in joules or kilowatt-hours.
            </p>

            <Card className="bg-white/5 border-white/10 my-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">The Energy Equation</h3>
                <div className="bg-gradient-to-r from-blue-500/10 to-transparent p-4 rounded-lg border-l-4 border-blue-500 mb-4">
                  <p className="text-white font-medium mb-2">Fundamental Energy Relationship:</p>
                  <p className="text-blue-300 font-mono text-2xl mb-2">E = P x t</p>
                  <div className="text-white/70 text-sm space-y-1">
                    <p>E = Energy (joules or kWh)</p>
                    <p>P = Power (watts or kW)</p>
                    <p>t = Time (seconds or hours)</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-3 bg-white/5 rounded-lg">
                    <p className="text-white font-medium mb-2">SI Units (Joules)</p>
                    <p className="text-white/70 text-sm font-mono">E (J) = P (W) x t (s)</p>
                    <p className="text-white/60 text-xs mt-2">1 joule = 1 watt-second</p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <p className="text-white font-medium mb-2">Practical Units (kWh)</p>
                    <p className="text-white/70 text-sm font-mono">E (kWh) = P (kW) x t (h)</p>
                    <p className="text-white/60 text-xs mt-2">1 kWh = 3,600,000 J = 3.6 MJ</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-500/10 border-green-500/20 my-6">
              <CardContent className="p-6">
                <h4 className="text-green-400 font-medium mb-3">Worked Example: Energy Consumption</h4>
                <p className="text-white/70 text-sm mb-3">
                  Calculate the energy used by a 2.5 kW heater running for 6 hours.
                </p>
                <div className="space-y-2 text-sm font-mono">
                  <p className="text-white/80">E = P x t</p>
                  <p className="text-white/80">E = 2.5 kW x 6 h = 15 kWh</p>
                  <p className="text-white/80">In joules: 15 x 3,600,000 = 54,000,000 J = 54 MJ</p>
                  <p className="text-green-400 mt-2">The heater uses 15 kWh (54 MJ) of electrical energy</p>
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

          {/* Section 2: Unit Conversions */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Calculator className="w-5 h-5 text-green-400" />
              </div>
              <h2 className="text-xl font-semibold text-white m-0">Energy Unit Conversions</h2>
            </div>

            <p className="text-white/80 leading-relaxed">
              The joule (J) is the SI unit of energy, but the kilowatt-hour (kWh) is more
              practical for electrical billing. Understanding conversions between these units
              is essential for energy calculations.
            </p>

            <Card className="bg-white/5 border-white/10 my-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Key Conversion Factors</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left p-2 text-white">Conversion</th>
                        <th className="text-left p-2 text-white">Value</th>
                        <th className="text-left p-2 text-white">Derivation</th>
                      </tr>
                    </thead>
                    <tbody className="text-white/70">
                      <tr className="border-b border-white/10">
                        <td className="p-2">1 kWh to joules</td>
                        <td className="p-2 text-green-400">3,600,000 J</td>
                        <td className="p-2">1000 W x 3600 s</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="p-2">1 kWh to MJ</td>
                        <td className="p-2 text-green-400">3.6 MJ</td>
                        <td className="p-2">3,600,000 / 1,000,000</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="p-2">1 MJ to kWh</td>
                        <td className="p-2 text-green-400">0.278 kWh</td>
                        <td className="p-2">1 / 3.6</td>
                      </tr>
                      <tr>
                        <td className="p-2">1 Wh to joules</td>
                        <td className="p-2 text-green-400">3600 J</td>
                        <td className="p-2">1 W x 3600 s</td>
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
                    <h4 className="text-blue-400 font-medium mb-2">Why Use kWh?</h4>
                    <p className="text-white/80 text-sm mb-3">
                      The joule is impractically small for everyday use. Consider:
                    </p>
                    <ul className="text-white/70 text-sm space-y-1">
                      <li>A kettle boiling for 3 minutes uses 9,000,000 joules</li>
                      <li>The same kettle uses 2.5 kWh - much easier to work with</li>
                      <li>Household annual use: 3000-4000 kWh vs billions of joules</li>
                    </ul>
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

          {/* Section 3: Cost Calculations */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-amber-500/20 rounded-lg">
                <Clock className="w-5 h-5 text-amber-400" />
              </div>
              <h2 className="text-xl font-semibold text-white m-0">Electricity Cost Calculations</h2>
            </div>

            <p className="text-white/80 leading-relaxed">
              Electricity is billed based on energy consumed, typically in kilowatt-hours.
              The cost depends on the tariff rate and the energy used. Understanding these
              calculations helps identify opportunities for savings.
            </p>

            <Card className="bg-white/5 border-white/10 my-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Cost Calculation Formula</h3>
                <div className="bg-gradient-to-r from-amber-500/10 to-transparent p-4 rounded-lg border-l-4 border-amber-500 mb-4">
                  <p className="text-white font-medium mb-2">Running Cost:</p>
                  <p className="text-amber-300 font-mono text-lg mb-2">Cost = Power (kW) x Time (hours) x Rate (p/kWh)</p>
                  <p className="text-white/70 text-sm">Or: Cost = Energy (kWh) x Rate (p/kWh)</p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <h4 className="text-white font-medium mb-2">Worked Example: Heater Running Costs</h4>
                  <p className="text-white/70 text-sm mb-3">
                    Calculate the cost to run a 2 kW fan heater for 5 hours at 16p/kWh.
                  </p>
                  <div className="space-y-2 text-sm font-mono">
                    <p className="text-white/80">Energy = 2 kW x 5 h = 10 kWh</p>
                    <p className="text-white/80">Cost = 10 kWh x 16p = 160p = 1.60 pounds</p>
                    <p className="text-green-400 mt-2">The heater costs 1.60 pounds to run for 5 hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-amber-500/10 border-amber-500/20 my-6">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-amber-400 font-medium mb-2">Common Electricity Costs (Approximate)</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="text-white/80">
                        <p className="font-medium text-white mb-1">Domestic Appliances:</p>
                        <ul className="space-y-1">
                          <li>Kettle (3 kW, 3 min): 2.4p</li>
                          <li>Washing machine: 25-35p per cycle</li>
                          <li>Tumble dryer: 50-80p per cycle</li>
                          <li>LED TV (50 W, 4h): 3.2p</li>
                        </ul>
                      </div>
                      <div className="text-white/80">
                        <p className="font-medium text-white mb-1">Heating/Cooling:</p>
                        <ul className="space-y-1">
                          <li>Fan heater (2 kW, 1h): 32p</li>
                          <li>Electric shower (8 kW, 10 min): 21p</li>
                          <li>Storage heater: 1-2 pounds/night</li>
                          <li>Air con (1.5 kW, 1h): 24p</li>
                        </ul>
                      </div>
                    </div>
                    <p className="text-white/60 text-xs mt-3">Based on 16p/kWh typical rate (2024)</p>
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

          {/* Section 4: Tariffs and Billing */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Lightbulb className="w-5 h-5 text-purple-400" />
              </div>
              <h2 className="text-xl font-semibold text-white m-0">Electricity Tariffs and Billing</h2>
            </div>

            <p className="text-white/80 leading-relaxed">
              Electricity bills comprise several elements beyond the simple unit rate. Understanding
              tariff structures helps in advising customers on the most economical options for
              their usage patterns.
            </p>

            <Card className="bg-white/5 border-white/10 my-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Tariff Components</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <h4 className="text-blue-400 font-medium mb-2">Standing Charge</h4>
                    <p className="text-white/80 text-sm">
                      Fixed daily charge (typically 30-50p/day) covering meter rental, connection
                      maintenance, and infrastructure costs. Payable regardless of consumption.
                    </p>
                  </div>
                  <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                    <h4 className="text-green-400 font-medium mb-2">Unit Rate (kWh rate)</h4>
                    <p className="text-white/80 text-sm">
                      Variable rate per kWh consumed. Typically 14-20p/kWh for domestic users.
                      May vary by time of use on certain tariffs.
                    </p>
                  </div>
                  <div className="p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
                    <h4 className="text-amber-400 font-medium mb-2">Maximum Demand (Commercial)</h4>
                    <p className="text-white/80 text-sm">
                      Charge based on highest power drawn in a 30-minute period. Encourages load
                      management and peak reduction. Measured in kVA to account for power factor.
                    </p>
                  </div>
                  <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                    <h4 className="text-purple-400 font-medium mb-2">Reactive Power Charge</h4>
                    <p className="text-white/80 text-sm">
                      Penalty for poor power factor (typically below 0.9). Charged per kVArh of
                      reactive energy. Encourages power factor correction.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-500/10 border-blue-500/20 my-6">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-blue-400 font-medium mb-2">Time-of-Use Tariffs</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="text-white/80">
                        <p className="font-medium text-white mb-1">Economy 7:</p>
                        <ul className="space-y-1">
                          <li>7 hours cheap rate (typically overnight)</li>
                          <li>Higher day rate than standard</li>
                          <li>Suits storage heaters, hot water</li>
                        </ul>
                      </div>
                      <div className="text-white/80">
                        <p className="font-medium text-white mb-1">Smart Time-of-Use:</p>
                        <ul className="space-y-1">
                          <li>Variable rates throughout day</li>
                          <li>Cheapest: overnight and afternoon</li>
                          <li>Peak: 4-7pm typically most expensive</li>
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
                        <h4 className="text-green-400 font-medium mb-2">Quick Calculations</h4>
                        <ul className="text-sm text-white/80 space-y-1">
                          <li>Hours in a year: 8760 (24 x 365)</li>
                          <li>1 kW running 24/7: ~8760 kWh/year</li>
                          <li>1 W saved continuously: ~8.76 kWh/year</li>
                          <li>At 15p/kWh: 1 W saved = 1.31 pounds/year</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-white/5 rounded-lg">
                        <h4 className="text-green-400 font-medium mb-2">Advising Customers</h4>
                        <ul className="text-sm text-white/80 space-y-1">
                          <li>Compare running costs of alternatives</li>
                          <li>Calculate payback on efficient equipment</li>
                          <li>Suggest time-of-use for high consumption</li>
                          <li>Recommend smart metering for monitoring</li>
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
                Quick Reference - Energy Calculations
              </span>
              <span>{showQuickReference ? '−' : '+'}</span>
            </Button>

            {showQuickReference && (
              <Card className="mt-4 bg-white/5 border-white/10">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-white font-medium mb-3">Energy Formulae</h4>
                      <div className="space-y-2 text-sm font-mono text-white/80">
                        <p>E = P x t</p>
                        <p>kWh = kW x hours</p>
                        <p>J = W x seconds</p>
                        <p>1 kWh = 3.6 MJ</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-3">Cost Calculations</h4>
                      <div className="space-y-2 text-sm font-mono text-white/80">
                        <p>Cost = kWh x rate</p>
                        <p>Cost = kW x h x p/kWh</p>
                        <p>Annual cost = P x 8760 x rate</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-3">Useful Constants</h4>
                      <div className="space-y-2 text-sm text-white/80">
                        <p>Hours per year: 8760</p>
                        <p>Hours per month: 720 (avg)</p>
                        <p>Hours per day: 24</p>
                        <p>Seconds per hour: 3600</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-3">Typical Rates</h4>
                      <div className="space-y-2 text-sm text-white/80">
                        <p>Domestic: 14-20p/kWh</p>
                        <p>Commercial: 12-18p/kWh</p>
                        <p>Economy 7 night: 8-12p/kWh</p>
                        <p>Standing charge: 30-50p/day</p>
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
            title="Energy Consumption and kWh Quiz"
            description="Test your understanding of energy calculations and electricity costs."
          />
        </section>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-8 border-t border-white/10">
          <Button variant="outline" className="text-white border-white/20 hover:bg-white/10" asChild>
            <Link to="../level3-module3-section5-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Efficiency and Losses
            </Link>
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
            <Link to="../level3-module3-section5-4">
              Next: Energy Efficiency in Installations
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Level3Module3Section5_3;
