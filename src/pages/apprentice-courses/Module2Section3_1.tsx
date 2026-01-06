import React from "react";
import { ArrowLeft, Zap, CheckCircle, Eye, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import UnitsPocketCard from "@/components/apprentice-courses/UnitsPocketCard";
import useSEO from "@/hooks/useSEO";

const TITLE = "Series and Parallel Circuits - Level 2 Module 2 Section 3.1";
const DESCRIPTION = "Master series and parallel circuits for UK electrical installations. Learn circuit types, characteristics, and BS 7671 applications for apprentice electricians.";

const quickCheckQuestions = [
  {
    id: "series-current",
    question: "What is the key characteristic of current in a series circuit?",
    options: ["Current varies", "Current is the same everywhere", "Current is zero", "Current doubles"],
    correctIndex: 1,
    explanation: "In series circuits, there's only one path, so current must be the same through all components."
  },
  {
    id: "parallel-voltage", 
    question: "What happens to voltage in parallel branches?",
    options: ["Voltage divides equally", "Voltage is the same across each branch", "Voltage is zero", "Voltage adds up"],
    correctIndex: 1,
    explanation: "In parallel circuits, each branch is connected directly to the supply, so voltage is the same across all branches."
  },
  {
    id: "series-resistance",
    question: "How do you calculate total resistance in series?",
    options: ["R₁ × R₂", "R₁ + R₂", "1/R₁ + 1/R₂", "R₁ ÷ R₂"],
    correctIndex: 1,
    explanation: "In series, resistances simply add together: Rtotal = R₁ + R₂ + R₃..."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "In a series circuit with three resistors (10Ω, 20Ω, 30Ω), what is the total resistance?",
    options: ["60Ω", "20Ω", "6.67Ω", "10Ω"],
    correctAnswer: 0,
    explanation: "In series circuits, total resistance = R₁ + R₂ + R₃ = 10 + 20 + 30 = 60Ω"
  },
  {
    id: 2,
    question: "What happens to the brightness of lamps in a series circuit when you add more lamps?",
    options: ["They get brighter", "They stay the same", "They get dimmer", "Only the first lamp changes"],
    correctAnswer: 2,
    explanation: "Adding more lamps in series increases total resistance, reducing current flow, so all lamps get dimmer."
  },
  {
    id: 3,
    question: "In a parallel circuit, if one branch has 2A and another has 3A, what is the total current from the supply?",
    options: ["1A", "2.5A", "5A", "6A"],
    correctAnswer: 2,
    explanation: "In parallel circuits, total current is the sum of branch currents: 2A + 3A = 5A"
  },
  {
    id: 4,
    question: "Which circuit type is used for household socket outlets?",
    options: ["Series only", "Parallel only", "Both series and parallel", "Neither"],
    correctAnswer: 1,
    explanation: "Household sockets use parallel circuits so each device gets full voltage and operates independently."
  },
  {
    id: 5,
    question: "In a series circuit, if one component fails and creates an open circuit, what happens?",
    options: ["Only that component stops working", "All components stop working", "The other components work harder", "Nothing changes"],
    correctAnswer: 1,
    explanation: "In series circuits, if one component fails and breaks the circuit, no current can flow so all components stop working."
  },
  {
    id: 6,
    question: "What is the voltage across each branch in a parallel circuit connected to a 230V supply?",
    options: ["115V each", "230V each", "Depends on resistance", "Voltage divides equally"],
    correctAnswer: 1,
    explanation: "In parallel circuits, each branch is connected directly across the supply, so each gets the full 230V."
  },
  {
    id: 7,
    question: "Which statement about series circuits is correct?",
    options: ["Voltage is the same everywhere", "Current divides between components", "Resistance values add together", "Each component can be controlled separately"],
    correctAnswer: 2,
    explanation: "In series circuits, resistance values add together: Rtotal = R₁ + R₂ + R₃..."
  },
  {
    id: 8,
    question: "Why are car headlights wired in parallel rather than series?",
    options: ["It's cheaper", "Each light gets full voltage and works independently", "It uses less current", "Series circuits don't work in cars"],
    correctAnswer: 1,
    explanation: "Parallel wiring ensures each headlight gets the full 12V supply and if one fails, the other continues to work."
  },
  {
    id: 9,
    question: "In a parallel circuit with identical resistors, how does current divide?",
    options: ["All current goes through one resistor", "Current divides equally", "Current goes through the first resistor only", "Current direction reverses"],
    correctAnswer: 1,
    explanation: "With identical parallel resistors, current divides equally between them since they have the same resistance."
  },
  {
    id: 10,
    question: "What is a key advantage of parallel circuits in electrical installations?",
    options: ["Uses less cable", "Components can be controlled independently", "Total resistance is higher", "Current is the same everywhere"],
    correctAnswer: 1,
    explanation: "Parallel circuits allow independent control - you can switch devices on/off without affecting others, which is essential for practical installations."
  }
];

const faqs = [
  {
    question: "What's the main difference between series and parallel circuits?",
    answer: "In series circuits, components are connected end-to-end in a single path, so current flows through each component in turn. In parallel circuits, components are connected alongside each other, creating multiple paths for current to flow."
  },
  {
    question: "Why do Christmas lights sometimes all go out when one bulb fails?",
    answer: "Older Christmas lights were wired in series. When one bulb failed (creating an open circuit), it broke the complete circuit path, so no current could flow to any of the bulbs. Modern Christmas lights often use parallel wiring or special bulbs that maintain the circuit when they fail."
  },
  {
    question: "Which circuit type is better for household wiring?",
    answer: "Parallel circuits are much better for household wiring. Each outlet, light, or appliance can operate independently. If one device fails or is switched off, it doesn't affect the others. Also, each device gets the full supply voltage."
  },
  {
    question: "What happens to current when you add more branches to a parallel circuit?",
    answer: "Total current increases because you're providing more paths for current to flow. Each new branch draws its own current, so the supply must provide the sum of all branch currents."
  },
  {
    question: "Why does voltage drop in series circuits but not in parallel?",
    answer: "In series circuits, components share the supply voltage between them - each component uses up some voltage. In parallel circuits, each branch is connected directly across the supply, so each gets the full supply voltage."
  },
  {
    question: "How do I recognise series vs parallel circuits in practice?",
    answer: "Look at the connections: Series circuits have components connected end-to-end in a chain. Parallel circuits have components connected side-by-side with separate paths. In building wiring, most circuits are parallel - each socket or light has its own connection back to the distribution board."
  }
];

const Module2Section3_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2.3
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
                Module 2.3.1
              </span>
              <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-white">
                Series and Parallel Circuits
              </h1>
              <p className="text-xl text-white max-w-3xl mt-2">
                Master circuit types and their characteristics for UK electrical installations
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
                <li><strong>Series:</strong> Components connected end-to-end, current same everywhere, voltage divides.</li>
                <li><strong>Parallel:</strong> Components side-by-side, voltage same everywhere, current divides.</li>
                <li><strong>Series resistance:</strong> R₁ + R₂ + R₃... (adds up)</li>
                <li><strong>Parallel resistance:</strong> 1/Rtotal = 1/R₁ + 1/R₂... (gets smaller)</li>
                <li><strong>UK practice:</strong> Most building circuits are parallel for independent operation.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Christmas lights (series), household sockets (parallel), car headlights (parallel).</li>
                <li><strong>Use:</strong> Circuit design, fault finding, load calculations, cable sizing.</li>
                <li><strong>Apply:</strong> Ring circuits, radial circuits, emergency lighting, distribution boards.</li>
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
              <span>Distinguish between series and parallel circuit configurations</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Calculate total resistance for both series and parallel arrangements</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Predict voltage and current behaviour in different circuit types</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Apply Ohm's Law to series and parallel circuit calculations</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Recognise series and parallel configurations in UK installations</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Understand the advantages and disadvantages of each circuit type</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Apply circuit knowledge to fault finding and troubleshooting</span>
            </li>
          </ul>
        </Card>

        {/* Section 1: Series Circuits */}
        <div className="mb-8">
          <div className="border-l-4 border-elec-yellow dark:bg-card p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="bg-elec-yellow text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
              Series Circuits - One Path for Current
            </h2>
            <div className="space-y-4 text-white">
              <p>
                In series circuits, components are connected end-to-end in a single path. 
                Current has only one route to follow, so it must be the same through every component.
              </p>
              
              <div className="space-y-4">
                <div>
                  <p className="font-bold">Key characteristics of series circuits:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li><strong>Current:</strong> Same everywhere (I₁ = I₂ = I₃ = Itotal)</li>
                    <li><strong>Voltage:</strong> Divides between components (Vsupply = V₁ + V₂ + V₃)</li>
                    <li><strong>Resistance:</strong> Adds together (Rtotal = R₁ + R₂ + R₃)</li>
                    <li><strong>Failure:</strong> One component fails, whole circuit stops</li>
                  </ul>
                </div>

                <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                  <p className="text-yellow-300">
                    <strong>Real Example:</strong> Old-style Christmas lights were wired in series. 
                    When one bulb failed, all the lights went out because the circuit path was broken.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Parallel Circuits */}
        <div className="mb-8">
          <div className="border-l-4 border-elec-yellow dark:bg-card p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="bg-elec-yellow text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
              Parallel Circuits - Multiple Paths for Current
            </h2>
            <div className="space-y-4 text-white">
              <p>
                In parallel circuits, components are connected side-by-side across common points. 
                This creates multiple paths for current to flow, like lanes on a motorway.
              </p>
              
              <div className="space-y-4">
                <div>
                  <p className="font-bold">Key characteristics of parallel circuits:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li><strong>Voltage:</strong> Same across all branches (V₁ = V₂ = V₃ = Vsupply)</li>
                    <li><strong>Current:</strong> Divides between branches (Itotal = I₁ + I₂ + I₃)</li>
                    <li><strong>Resistance:</strong> 1/Rtotal = 1/R₁ + 1/R₂ + 1/R₃ (gets smaller)</li>
                    <li><strong>Independence:</strong> Each branch works independently</li>
                  </ul>
                </div>

                <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                  <p className="text-yellow-300">
                    <strong>Real Example:</strong> Household sockets are wired in parallel. 
                    Each appliance gets full 230V and if one fails, the others keep working.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Calculations and Formulas */}
        <div className="mb-8">
          <div className="border-l-4 border-purple-500 dark:bg-card p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
              Circuit Calculations
            </h2>
            <div className="space-y-4 text-white">
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-3">
                  <h4 className="font-bold text-elec-yellow">Series Calculations</h4>
                  <div className="bg-card border border-border/30 p-4 rounded-lg">
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Total resistance: Rtotal = R₁ + R₂ + R₃...</li>
                      <li>Current everywhere: I = V/Rtotal</li>
                      <li>Voltage across each: V = I × R</li>
                      <li>Power in each: P = V × I or I²R</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-bold text-elec-yellow">Parallel Calculations</h4>
                  <div className="bg-card border border-elec-yellow/30 p-4 rounded-lg">
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Total resistance: 1/Rtotal = 1/R₁ + 1/R₂ + 1/R₃...</li>
                      <li>Current in each branch: I = V/R</li>
                      <li>Total current: Itotal = I₁ + I₂ + I₃...</li>
                      <li>Power in each: P = V²/R</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-yellow-300">
                  <strong>Important:</strong> In parallel, total resistance is always less than the smallest individual resistance. 
                  Adding more parallel branches decreases total resistance and increases total current.
                </p>
              </div>
            </div>
          </div>
        </div>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: UK Installation Context */}
        <div className="mb-8">
          <div className="border-l-4 border-amber-500 dark:bg-card p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">4</span>
              UK Installation Applications
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Understanding series and parallel circuits is essential for UK electrical installations 
                and BS 7671 compliance.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-3">
                  <h4 className="font-bold text-elec-yellow">Common Series Applications</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>LED strip lighting (low voltage)</li>
                    <li>Some decorative lighting chains</li>
                    <li>Voltage divider circuits</li>
                    <li>Current limiting applications</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-bold text-elec-yellow">Common Parallel Applications</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Socket outlet circuits (ring and radial)</li>
                    <li>Lighting circuits with independent switching</li>
                    <li>Distribution board circuits</li>
                    <li>Emergency lighting systems</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card border border-border/30 p-4 rounded-lg">
                <p className="text-elec-yellow">
                  <strong>BS 7671 Considerations:</strong> Circuit design must consider voltage drop, 
                  protective device coordination, and load diversity - all dependent on understanding 
                  series and parallel behaviour.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20 bg-none shadow-none">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Practical Guidance for Apprentices</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">On Site Application</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-card border border-border/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-elec-yellow mb-2">When Designing Circuits</h4>
                  <ul className="list-disc pl-4 space-y-1 text-sm text-blue-200">
                    <li>Use parallel for independence and full voltage supply</li>
                    <li>Consider total current when adding parallel loads</li>
                    <li>Remember voltage drop increases with circuit length</li>
                    <li>Size cables for total expected current</li>
                  </ul>
                </div>
                <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-elec-yellow mb-2">When Fault Finding</h4>
                  <ul className="list-disc pl-4 space-y-1 text-sm text-elec-yellow/80">
                    <li>In series: one fault affects whole circuit</li>
                    <li>In parallel: faults usually affect one branch only</li>
                    <li>Check connections at junction points</li>
                    <li>Use understanding of current paths to trace faults</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Common Mistakes to Avoid</h3>
              <div className="bg-card border border-border/30 p-4 rounded-lg">
                <ul className="list-disc pl-4 space-y-2 text-sm text-red-200">
                  <li><strong>Confusing voltage and current behaviour:</strong> Remember voltage divides in series, current divides in parallel</li>
                  <li><strong>Wrong resistance calculations:</strong> Series adds directly, parallel uses reciprocals</li>
                  <li><strong>Ignoring cable resistance:</strong> Long cable runs add series resistance</li>
                  <li><strong>Poor connections:</strong> Loose connections create unwanted series resistance</li>
                  <li><strong>Overloading parallel circuits:</strong> Each new branch adds to total current</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Building Your Understanding</h3>
              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <ul className="list-disc pl-4 space-y-2 text-sm text-elec-yellow/80">
                  <li><strong>Practice calculations:</strong> Work through examples until formulas become natural</li>
                  <li><strong>Identify circuits:</strong> Look at real installations and identify series/parallel sections</li>
                  <li><strong>Use test equipment:</strong> Measure voltage and current to verify your understanding</li>
                  <li><strong>Think about consequences:</strong> What happens when loads are added or removed?</li>
                  <li><strong>Connect to BS 7671:</strong> Understand how circuit types affect regulation compliance</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-8 p-0 bg-transparent border-white/20 bg-none shadow-none overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-lg sm:text-xl font-semibold text-white">Frequently Asked Questions</h2>
          </div>
          <div className="divide-y divide-border/20">
            {faqs.map((faq, index) => (
              <div key={index} className="p-6">
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-white text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Pocket Cards */}
        <div className="mb-8 space-y-6">
          <UnitsPocketCard />
          
          <Card className="p-6 bg-transparent border-white/20 bg-none shadow-none">
            <div className="mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-white">Quick Reference Card</h2>
            </div>
            <p className="text-sm text-white mb-4">
              Essential series and parallel circuit facts
            </p>
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-sm">
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-white">Series Circuits</h4>
                  <ul className="list-disc pl-4 space-y-1 text-white">
                    <li>Current same everywhere</li>
                    <li>Voltage divides between components</li>
                    <li>Resistance: Rtotal = R₁ + R₂ + R₃</li>
                    <li>One fails, all stop</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Series Examples</h4>
                  <ul className="list-disc pl-4 space-y-1 text-white">
                    <li>Old Christmas lights</li>
                    <li>LED strip sections</li>
                    <li>Cable resistance</li>
                    <li>Voltage dividers</li>
                  </ul>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-white">Parallel Circuits</h4>
                  <ul className="list-disc pl-4 space-y-1 text-white">
                    <li>Voltage same across all branches</li>
                    <li>Current divides between branches</li>
                    <li>Resistance: 1/Rtotal = 1/R₁ + 1/R₂</li>
                    <li>Independent operation</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Parallel Examples</h4>
                  <ul className="list-disc pl-4 space-y-1 text-white">
                    <li>Household sockets</li>
                    <li>Car headlights</li>
                    <li>Lighting circuits</li>
                    <li>Distribution boards</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Quiz */}
        <Quiz 
          title="Test Your Knowledge: Series and Parallel Circuits"
          questions={quizQuestions}
        />

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2.3
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../3-2">
              Next: Series Circuits - Current and Voltage
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default Module2Section3_1;