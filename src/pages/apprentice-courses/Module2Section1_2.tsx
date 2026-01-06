import { ArrowLeft, Zap, CheckCircle, Battery, RefreshCw, Calculator } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import UnitsPocketCard from "@/components/apprentice-courses/UnitsPocketCard";
import OhmsCalculator from "@/components/apprentice-courses/OhmsCalculator";
import useSEO from "@/hooks/useSEO";

const TITLE = "Voltage, Current, and Resistance - Level 2 Module 2 Section 1.2";
const DESCRIPTION = "Master the fundamental electrical concepts of voltage, current, and resistance. Learn definitions, relationships, and practical applications for apprentice electricians following BS7671.";

const quickCheckQuestions = [
  {
    id: "voltage-definition",
    question: "What is voltage often compared to in water flow analogies?",
    options: [
      "The amount of water flowing",
      "The pressure pushing the water",
      "The size of the pipe",
      "The resistance to flow"
    ],
    correctIndex: 1,
    explanation: "Voltage is like the pressure in a water system - it's the electrical 'pressure' that pushes current through a circuit."
  },
  {
    id: "uk-voltage",
    question: "In the UK, what is the standard single-phase supply voltage?",
    options: [
      "110V",
      "230V", 
      "240V",
      "415V"
    ],
    correctIndex: 1,
    explanation: "The UK standard single-phase supply voltage is 230V (±10%), harmonised across Europe since the 1990s."
  },
  {
    id: "resistance-temperature",
    question: "What happens to resistance when a conductor gets hotter?",
    options: [
      "It decreases",
      "It stays the same",
      "It increases",
      "It becomes zero"
    ],
    correctIndex: 2,
    explanation: "For most conductors (like copper), resistance increases with temperature. This is why cable ratings must account for ambient temperature."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What does voltage do in a circuit?",
    options: [
      "Measures the resistance",
      "Provides the electrical pressure or force that pushes current",
      "Controls the temperature",
      "Prevents current flow"
    ],
    correctAnswer: 1,
    explanation: "Voltage is the electrical pressure or force that pushes current through a conductor, like water pressure in a pipe."
  },
  {
    id: 2,
    question: "What unit is current measured in?",
    options: [
      "Volts (V)",
      "Ohms (Ω)",
      "Amperes or Amps (A)",
      "Watts (W)"
    ],
    correctAnswer: 2,
    explanation: "Current is measured in Amperes or Amps, with the symbol A."
  },
  {
    id: 3,
    question: "What is resistance?",
    options: [
      "The flow of electric charge",
      "The electrical pressure in a circuit",
      "How much a material resists or slows down the flow of current",
      "The power consumed by a device"
    ],
    correctAnswer: 2,
    explanation: "Resistance is how much a material resists or slows down the flow of current, measured in Ohms (Ω)."
  },
  {
    id: 4,
    question: "If resistance increases, what happens to current (if voltage stays the same)?",
    options: [
      "Current increases",
      "Current decreases",
      "Current stays the same",
      "Voltage increases"
    ],
    correctAnswer: 1,
    explanation: "According to Ohm's Law, if resistance increases and voltage stays the same, current decreases."
  },
  {
    id: 5,
    question: "True or False: High resistance is good for conductors.",
    options: [
      "True",
      "False"
    ],
    correctAnswer: 1,
    explanation: "False. Good conductors should have low resistance to allow current to flow easily. High resistance is good for insulators."
  },
  {
    id: 6,
    question: "What is the UK standard single-phase mains voltage?",
    options: [
      "110V",
      "230V",
      "240V",
      "415V"
    ],
    correctAnswer: 1,
    explanation: "The UK standard single-phase mains voltage is 230V (±10%), harmonised across Europe."
  },
  {
    id: 7,
    question: "What happens to the resistance of a copper conductor when it gets hotter?",
    options: [
      "It decreases significantly",
      "It stays exactly the same",
      "It increases",
      "It becomes zero"
    ],
    correctAnswer: 2,
    explanation: "For copper and most metals, resistance increases with temperature. This is why cable current ratings must be reduced in hot environments."
  },
  {
    id: 8,
    question: "According to Ohm's Law, if you double the voltage and keep resistance the same, what happens to current?",
    options: [
      "Current halves",
      "Current stays the same",
      "Current doubles",
      "Current becomes zero"
    ],
    correctAnswer: 2,
    explanation: "Using V = I × R, if voltage doubles and resistance stays the same, current must double to maintain the relationship."
  },
  {
    id: 9,
    question: "Which material would make the best electrical conductor?",
    options: [
      "PVC plastic",
      "Rubber",
      "Copper",
      "Glass"
    ],
    correctAnswer: 2,
    explanation: "Copper has very low resistance and is the most common material for electrical cables and conductors."
  },
  {
    id: 10,
    question: "Why is understanding V, I, and R important for apprentice electricians?",
    options: [
      "It's only needed for exams",
      "It helps with fault finding, safety, and circuit design",
      "It's not important for practical work",
      "Only supervisors need to know this"
    ],
    correctAnswer: 1,
    explanation: "Understanding voltage, current, and resistance is fundamental for all electrical work - from basic testing to complex fault finding and ensuring safe installations."
  }
];

const faqs = [
  {
    question: "Why is understanding V, I, and R so important for electricians?",
    answer: "These three quantities form the foundation of all electrical work. Whether you're fault-finding, designing circuits, or ensuring safety, you need to understand how voltage, current, and resistance interact. They're governed by Ohm's Law, which is used daily in electrical calculations."
  },
  {
    question: "How do I measure these quantities safely on site?",
    answer: "Always follow safe isolation procedures first. Use a calibrated multimeter: voltage is measured in parallel across components, current requires breaking the circuit to measure in series, and resistance is only measured on de-energised circuits. Never measure resistance on live circuits."
  },
  {
    question: "What's the difference between AC and DC current?",
    answer: "DC (Direct Current) flows in one direction only, like from a battery. AC (Alternating Current) changes direction regularly - UK mains supply alternates 50 times per second (50Hz). AC allows efficient transmission over long distances and easy voltage transformation."
  },
  {
    question: "Why does cable size affect resistance?",
    answer: "Larger cross-sectional area means lower resistance - more 'lanes' for current to flow. Length increases resistance - longer cables have more material to resist current flow. This is why we use larger cables for longer runs or higher current loads."
  }
];

const Module2Section1_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2.1
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="h-8 w-8 text-elec-yellow" />
            <div>
              <span className="inline-block bg-elec-yellow text-black px-3 py-1 rounded-full text-sm font-semibold mb-2">
                Module 2.1.2
              </span>
              <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-white">
                Voltage, Current, and Resistance
              </h1>
              <p className="text-xl text-white max-w-3xl mt-2">
                Definitions and Relationships – The Foundation of All Electrical Work
              </p>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20 bg-none shadow-none">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Voltage:</strong> Electrical pressure that pushes current through circuits (measured in Volts).</li>
                <li><strong>Current:</strong> Flow of electrons through conductors (measured in Amperes).</li>
                <li><strong>Resistance:</strong> Opposition to current flow, creates heat and voltage drop (measured in Ohms).</li>
                <li><strong>Relationship:</strong> Governed by Ohm's Law - V = I × R (fundamental to all electrical work).</li>
                <li><strong>Applications:</strong> Essential for circuit design, fault finding, and safety calculations.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Multimeter readings (230V, 13A, 2.3Ω), cable ratings, fuse sizes.</li>
                <li><strong>Use:</strong> Circuit testing, load calculations, cable selection, fault diagnosis.</li>
                <li><strong>Apply:</strong> Ohm's Law calculations, power formulas, voltage drop assessments.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20 bg-none shadow-none">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning Outcomes</h2>
          <p className="text-white mb-4">By the end of this section, you'll be able to:</p>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Define voltage, current, and resistance with real-world examples</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Explain the relationship between these quantities using Ohm's Law</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Identify typical voltage and current values in UK electrical systems</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Understand factors affecting resistance in conductors and circuits</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Apply basic power calculations using voltage and current</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Use Ohm's Law calculator for practical electrical calculations</span>
            </li>
          </ul>
        </Card>

        {/* Section 1: Voltage */}
        <div className="mb-8">
          <div className="border-l-4 border-elec-yellow dark:bg-card p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="bg-elec-yellow text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
              Voltage (V) - Electrical Pressure
            </h2>
            <div className="space-y-4 text-white">
              <p>
                <strong>Voltage</strong> is the electrical pressure that pushes current through a circuit. 
                Think of it like water pressure in pipes - higher pressure pushes more water through.
              </p>
              
              <div className="space-y-4">
                <div>
                  <p className="font-bold">Key concepts about voltage:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Measured in <strong>Volts (V)</strong></li>
                    <li>Also called "potential difference" or "electromotive force (EMF)"</li>
                    <li>Exists between two points - always measured across components</li>
                    <li>Can exist without current flowing (like a battery not connected to anything)</li>
                    <li>Higher voltage = greater ability to push current through resistance</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold">UK common voltages:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li><strong>230V</strong> - Single-phase supply to homes and small businesses</li>
                    <li><strong>400V</strong> - Three-phase supply between lines</li>
                    <li><strong>110V</strong> - Site supply from transformers (safer for portable tools)</li>
                    <li><strong>12V/24V</strong> - Low voltage for controls and safety systems</li>
                    <li><strong>1.5V/9V</strong> - Batteries for small devices and controls</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Current */}
        <div className="mb-8">
          <div className="border-l-4 border-elec-yellow dark:bg-card p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="bg-elec-yellow text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
              Current (I) - Flow of Electrons
            </h2>
            <div className="space-y-4 text-white">
              <p>
                <strong>Current</strong> is the flow of electrons through a conductor. Like water flowing through a pipe, 
                it's the actual movement of charge carriers through the circuit.
              </p>
              
              <div className="space-y-4">
                <div>
                  <p className="font-bold">Understanding current:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Measured in <strong>Amperes (A)</strong> or "Amps"</li>
                    <li>1 Amp = 1 Coulomb of charge per second (6.24 x 10¹⁸ electrons!)</li>
                    <li>Flows from positive to negative (conventional current direction)</li>
                    <li>Must have a complete circuit to flow</li>
                    <li>Same current flows through all parts of a series circuit</li>
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-bold text-elec-yellow">DC (Direct Current)</p>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Flows in one direction only</li>
                      <li>From batteries, solar panels, DC power supplies</li>
                      <li>Used in electronics, LED lighting, electric vehicles</li>
                      <li>Easier to store in batteries</li>
                    </ul>
                  </div>
                  
                  <div>
                    <p className="font-bold text-elec-yellow">AC (Alternating Current)</p>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Changes direction 50 times per second (50Hz in UK)</li>
                      <li>UK mains supply - generated by power stations</li>
                      <li>Efficient transmission over long distances</li>
                      <li>Easy to transform to different voltages</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Resistance */}
        <div className="mb-8">
          <div className="border-l-4 border-purple-500 dark:bg-card p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
              Resistance (R) - Opposition to Current
            </h2>
            <div className="space-y-4 text-white">
              <p>
                <strong>Resistance</strong> opposes the flow of current. Like friction in water pipes, 
                it reduces flow and converts electrical energy to heat.
              </p>
              
              <div className="space-y-4">
                <div>
                  <p className="font-bold">Key concepts about resistance:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Measured in <strong>Ohms (Ω)</strong></li>
                    <li>All materials have some resistance (even good conductors)</li>
                    <li>Converts electrical energy to heat</li>
                    <li>Can be useful (heating elements) or unwanted (cable losses)</li>
                    <li>Affected by material, length, cross-sectional area, and temperature</li>
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-bold text-green-400">Good Conductors (Low Resistance)</p>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li><strong>Copper</strong> - most common for cables</li>
                      <li><strong>Aluminium</strong> - overhead power lines</li>
                      <li><strong>Silver</strong> - best conductor (too expensive for cables)</li>
                      <li><strong>Gold</strong> - corrosion-resistant connections</li>
                    </ul>
                  </div>
                  
                  <div>
                    <p className="font-bold text-elec-yellow">Poor Conductors (High Resistance)</p>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li><strong>PVC</strong> - cable insulation</li>
                      <li><strong>Rubber</strong> - flexible insulation</li>
                      <li><strong>Air</strong> - good insulator (until breakdown)</li>
                      <li><strong>Glass, ceramics</strong> - high voltage insulators</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: The Relationship - Ohm's Law */}
        <div className="mb-8">
          <div className="border-l-4 border-amber-500 dark:bg-card p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">4</span>
              Ohm's Law - How V, I, and R Relate
            </h2>
            <div className="space-y-4 text-white">
              <p>
                <strong>Ohm's Law</strong> shows the mathematical relationship between voltage, current, and resistance. 
                It's the most important formula in electrical work.
              </p>
              
              <div className="space-y-4">
                <div className="bg-[#121212]/50 p-4 rounded-lg border">
                  <p className="font-bold text-center text-lg mb-2">V = I × R</p>
                  <p className="text-center text-sm">Voltage = Current × Resistance</p>
                  <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
                    <div className="text-center">
                      <p className="font-semibold">V = I × R</p>
                      <p>Find Voltage</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold">I = V ÷ R</p>
                      <p>Find Current</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold">R = V ÷ I</p>
                      <p>Find Resistance</p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="font-bold">What Ohm's Law tells us:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>If voltage increases and resistance stays the same → current increases</li>
                    <li>If resistance increases and voltage stays the same → current decreases</li>
                    <li>If current increases and voltage stays the same → resistance must have decreased</li>
                    <li>All three quantities are interconnected - change one, others are affected</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ohm's Law Calculator */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20 bg-none shadow-none">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Calculator className="h-5 w-5 text-elec-yellow" />
            Interactive Ohm's Law Calculator
          </h2>
          <p className="text-white mb-4">
            Use this calculator to practice Ohm's Law calculations. Enter any two values to find the third:
          </p>
          <OhmsCalculator />
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20 bg-none shadow-none">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Practical Guidance for Apprentices</h2>
          <div className="space-y-4 text-white">
            <div>
              <p className="font-bold">Why these concepts matter on site:</p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li><strong>Cable selection:</strong> Higher current = larger cable needed (lower resistance)</li>
                <li><strong>Fault finding:</strong> Unexpected readings indicate problems (high resistance = poor connection)</li>
                <li><strong>Safety:</strong> Understanding current flow helps prevent shocks and fires</li>
                <li><strong>Testing:</strong> Multimeter readings make sense when you understand V, I, R</li>
                <li><strong>Load calculations:</strong> Ensure circuits can handle the current safely</li>
              </ul>
            </div>

            <div>
              <p className="font-bold">Common apprentice questions answered:</p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li><strong>"Why do cables get warm?"</strong> - Current flowing through resistance creates heat</li>
                <li><strong>"Why bigger cables for more current?"</strong> - Lower resistance = less heat = safer</li>
                <li><strong>"What's voltage drop?"</strong> - Voltage lost due to cable resistance</li>
                <li><strong>"Why test before work?"</strong> - Voltage can kill, current causes the damage</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Units Pocket Card */}
        <UnitsPocketCard />

        {/* Real-World Scenario */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20 bg-none shadow-none">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Real-World Scenario</h2>
          <div className="space-y-4 text-white">
            <div className="bg-[#121212]/50 p-4 rounded-lg border">
              <p className="font-bold mb-2">Scenario: Testing a Ring Final Circuit</p>
              <p className="text-sm">
                You're testing a 32A ring final circuit in a domestic property. Your multimeter shows:
                <br />• Supply voltage: 230V
                <br />• Load current: 20A
                <br />• Cable resistance: 0.8Ω
              </p>
            </div>
            
            <div>
              <p className="font-bold">Using your knowledge:</p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li><strong>Voltage drop check:</strong> V = I × R = 20A × 0.8Ω = 16V drop (acceptable under 11.5V limit)</li>
                <li><strong>Current assessment:</strong> 20A on 32A circuit = 62.5% loading (safe)</li>
                <li><strong>Cable condition:</strong> Resistance reading normal for cable length and type</li>
                <li><strong>Safety verification:</strong> All readings within expected parameters</li>
              </ul>
            </div>

            <div className="bg-card border border-elec-yellow/30 p-4 rounded-lg">
              <p className="font-semibold text-emerald-600 mb-2">This shows how V, I, R knowledge helps you:</p>
              <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-white">
                <li>Verify circuit safety through calculations</li>
                <li>Identify potential problems before they cause issues</li>
                <li>Understand what your test equipment is telling you</li>
                <li>Make informed decisions about circuit modifications</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20 bg-none shadow-none">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/10 pb-4 last:border-b-0">
                <p className="font-semibold text-white mb-2">{faq.question}</p>
                <p className="text-white text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20 bg-none shadow-none">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Summary</h2>
          <div className="space-y-4 text-white">
            <p>
              Understanding voltage, current, and resistance is fundamental to all electrical work. 
              These three quantities, governed by Ohm's Law, form the foundation of circuit analysis, 
              fault finding, and safe electrical practice.
            </p>
            
            <div className="grid md:grid-cols-3 gap-3 sm:gap-4 text-sm">
              <div className="bg-card border border-border/30 p-4 rounded-lg">
                <p className="font-bold text-elec-yellow mb-2">Voltage (V)</p>
                <p>The electrical pressure that drives current through circuits. UK mains = 230V.</p>
              </div>
              <div className="bg-card border border-elec-yellow/30 p-4 rounded-lg">
                <p className="font-bold text-emerald-600 mb-2">Current (I)</p>
                <p>The flow of electrons through conductors. Measured in Amperes (A).</p>
              </div>
              <div className="bg-card border border-border/30 p-4 rounded-lg">
                <p className="font-bold text-purple-600 mb-2">Resistance (R)</p>
                <p>Opposition to current flow. Creates heat and voltage drop. Measured in Ohms (Ω).</p>
              </div>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
              <p className="font-bold mb-2">Key Takeaway for Apprentices:</p>
              <p className="text-sm">
                Master these concepts now - they'll help you understand every aspect of electrical work, 
                from basic circuits to complex industrial installations. Practice with the calculator 
                and always think about how V, I, and R interact in real circuits.
              </p>
            </div>
          </div>
        </Card>

        {/* Quiz */}
        <Quiz questions={quizQuestions} title="Test Your Knowledge: Voltage, Current, and Resistance" />

        {/* Navigation */}
        <div className="flex justify-between pt-8">
          <Button variant="outline" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: What is Electricity?
            </Link>
          </Button>
          
          <Button asChild>
            <Link to="..">
              Next: Power and Energy
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Module2Section1_2;