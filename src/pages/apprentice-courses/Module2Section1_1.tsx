import { ArrowLeft, Zap, CheckCircle, Battery, Power, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import UnitsPocketCard from "@/components/apprentice-courses/UnitsPocketCard";
import useSEO from "@/hooks/useSEO";

const TITLE = "What is Electricity? - Level 2 Module 2 Section 1.1";
const DESCRIPTION = "Learn the fundamentals of electricity for apprentice electricians: definition, sources, applications, and basic electrical theory.";

const quickCheckQuestions = [
  {
    id: "electricity-definition",
    question: "What is electricity?",
    options: [
      "A type of metal wire",
      "The flow of electric charge through a circuit",
      "A measurement tool",
      "A safety device"
    ],
    correctIndex: 1,
    explanation: "Electricity is the flow of electric charge (electrons) through a circuit, creating energy that can power devices and equipment."
  },
  {
    id: "electron-charge",
    question: "What particles carry electric charge?",
    options: [
      "Protons",
      "Neutrons",
      "Electrons",
      "Atoms"
    ],
    correctIndex: 2,
    explanation: "Electrons are negatively charged particles that move through conductors to create electric current."
  },
  {
    id: "ac-vs-dc",
    question: "What's the difference between AC and DC?",
    options: [
      "AC is safer than DC",
      "DC changes direction, AC flows one way",
      "AC changes direction, DC flows one way",
      "There's no difference"
    ],
    correctIndex: 2,
    explanation: "AC (Alternating Current) changes direction many times per second, while DC (Direct Current) flows in one direction only."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is electricity?",
    options: [
      "A form of energy created by the movement of electrons",
      "A type of metal conductor", 
      "A measurement tool",
      "A safety device"
    ],
    correctAnswer: 0,
    explanation: "Electricity is a form of energy created by the movement of tiny particles called electrons that carry electric charge."
  },
  {
    id: 2,
    question: "What particles carry electric charge?",
    options: [
      "Protons",
      "Neutrons",
      "Electrons", 
      "Atoms"
    ],
    correctAnswer: 2,
    explanation: "Electrons are the particles that carry electric charge and their movement creates electric current."
  },
  {
    id: 3,
    question: "Which of these are sources of electricity?",
    options: [
      "Power stations and solar panels",
      "Cables and switches",
      "Motors and lights",
      "Fuses and circuit breakers"
    ],
    correctAnswer: 0,
    explanation: "Power stations, solar panels, batteries, and generators are all sources of electricity that produce electrical energy."
  },
  {
    id: 4,
    question: "What does DC stand for?",
    options: [
      "Direct Cable",
      "Direct Current",
      "Domestic Current",
      "Dual Current"
    ],
    correctAnswer: 1,
    explanation: "DC stands for Direct Current - electricity that flows in one direction only, like from a battery."
  },
  {
    id: 5,
    question: "What does AC stand for?",
    options: [
      "Alternating Current",
      "Automatic Current", 
      "Active Current",
      "Available Current"
    ],
    correctAnswer: 0,
    explanation: "AC stands for Alternating Current - electricity that changes direction many times per second, like UK mains supply."
  },
  {
    id: 6,
    question: "What voltage is UK mains electricity?",
    options: [
      "110V",
      "230V",
      "240V", 
      "400V"
    ],
    correctAnswer: 1,
    explanation: "UK mains electricity is 230V AC, which is the standard voltage supplied to homes and most commercial buildings."
  },
  {
    id: 7,
    question: "For electricity to work, what do you need?",
    options: [
      "Just a power source",
      "Just some wire",
      "A complete circuit",
      "Just a load (like a lamp)"
    ],
    correctAnswer: 2,
    explanation: "Electricity needs a complete circuit - a path from the power source, through the load (device), and back to the source."
  },
  {
    id: 8,
    question: "Which is an example of electrical energy being converted to light energy?",
    options: [
      "A kettle boiling water",
      "A fan spinning",
      "An LED lamp lighting up",
      "A doorbell ringing"
    ],
    correctAnswer: 2,
    explanation: "An LED lamp converts electrical energy into light energy. Kettles make heat, fans create movement, and doorbells make sound."
  },
  {
    id: 9,
    question: "What happens if there's a break anywhere in an electrical circuit?",
    options: [
      "The electricity flows faster",
      "Nothing works because the circuit is incomplete",
      "Only half the devices work",
      "The voltage doubles"
    ],
    correctAnswer: 1,
    explanation: "If there's a break anywhere in the circuit, electricity cannot flow and nothing will work because the circuit is incomplete."
  },
  {
    id: 10,
    question: "Why is it important for apprentice electricians to understand what electricity is?",
    options: [
      "It's only needed for exams",
      "It helps with material selection, safety, and fault finding",
      "It's not really important for practical work",
      "Only supervisors need to understand electricity"
    ],
    correctAnswer: 1,
    explanation: "Understanding electricity is fundamental for apprentices as it helps with choosing correct materials, working safely, and troubleshooting problems on site."
  }
];

const faqs = [
  {
    question: "Is electricity dangerous?",
    answer: "Yes, electricity can be very dangerous if not handled properly. Even small amounts can cause serious injury or death. That's why electricians need proper training, use safety equipment, and follow strict procedures to work safely with electrical systems."
  },
  {
    question: "Why do we use AC instead of DC for mains electricity?",
    answer: "AC is easier to transform to different voltages using transformers, making it more efficient for long-distance transmission. Power stations can generate high voltage AC, step it down for distribution, and step it down again for safe use in homes."
  },
  {
    question: "What's the difference between voltage and current?",
    answer: "Think of voltage like water pressure - it's the 'push' that makes electricity flow. Current is like the amount of water flowing - it's how much electricity is actually moving through the wire. You need both for electricity to do useful work."
  },
  {
    question: "Can I see electricity?",
    answer: "You can't see electricity itself, but you can see its effects - lights glowing, motors spinning, sparks arcing. You can also measure it with meters and see what it does when it flows through different materials."
  },
  {
    question: "Why do some countries use different voltages?",
    answer: "Different countries developed their electrical systems at different times and made different choices. The UK uses 230V because it's a good balance between safety and efficiency. Some countries use 110V (considered safer) while others use 400V for more power."
  },
  {
    question: "What happens if a circuit is broken?",
    answer: "If there's a break anywhere in the circuit, electricity can't flow and nothing will work. This is why loose connections, damaged cables, or blown fuses stop electrical devices from working - they break the circuit."
  }
];

const Module2Section1_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
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
            <Zap className="h-8 w-8 text-emerald-400" />
            <div>
              <span className="inline-block bg-emerald-500 text-black px-3 py-1 rounded-full text-sm font-semibold mb-2">
                Module 2.1.1
              </span>
              <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                What is Electricity?
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mt-2">
                Learn the fundamentals of electricity for apprentice electricians
              </p>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20 bg-none shadow-none">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Definition:</strong> Electricity is the flow of electric charge through a circuit.</li>
                <li><strong>Power:</strong> Used to make lights, motors, heaters, and all electrical devices work.</li>
                <li><strong>Sources:</strong> Power stations, batteries, solar panels, generators.</li>
                <li><strong>Safety:</strong> Can be dangerous - proper training and procedures essential.</li>
                <li><strong>Applications:</strong> Powers everything from mobile phones to factory machinery.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Live circuits, electrical energy flow, powered devices, circuit components.</li>
                <li><strong>Use:</strong> Understanding circuits, fault finding, safe installation practices.</li>
                <li><strong>Apply:</strong> Circuit design, material selection, electrical safety procedures.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20 bg-none shadow-none">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning Outcomes</h2>
          <p className="text-muted-foreground mb-4">By the end of this section, you'll be able to:</p>
          <ul className="space-y-3 text-foreground">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Define electricity and explain how it works in simple terms</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Identify different sources of electrical energy and their applications</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Understand the fundamental difference between AC and DC electricity</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Explain what makes a complete electrical circuit and why it's important</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Relate electrical theory to practical installation work scenarios</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Recognise electrical safety hazards and understand basic protection principles</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Apply basic electrical knowledge to troubleshoot simple circuit problems</span>
            </li>
          </ul>
        </Card>

        {/* Section 1: What is Electricity */}
        <div className="mb-8">
          <div className="border-l-4 border-emerald-500 bg-card dark:bg-card p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
              What is Electricity?
            </h2>
            <div className="space-y-4 text-foreground">
              <p>
                Electricity is a form of energy created by the movement of tiny particles called electrons. 
                These particles carry an electric charge, and when they move along a conductor (like copper wire), 
                we call that electric current.
              </p>
              
              <div className="space-y-4">
                <div>
                  <p className="font-bold">Think of electricity like water:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Water flows through pipes - electricity flows through wires</li>
                    <li>Water pressure pushes water - voltage pushes electrons</li>
                    <li>Amount of water flowing - amount of current flowing</li>
                    <li>Water does work (turns a water wheel) - electricity does work (lights a bulb)</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold">Key facts about electricity:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>You can't see electricity, but you can see what it does</li>
                    <li>It travels at nearly the speed of light</li>
                    <li>It always needs a complete path (circuit) to flow</li>
                    <li>It can be stored (in batteries) or generated when needed</li>
                    <li>It can be converted into heat, light, movement, or sound</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Sources of Electricity */}
        <div className="mb-8">
          <div className="border-l-4 border-emerald-500 bg-card dark:bg-card p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
              Sources of Electricity
            </h2>
            <div className="space-y-4 text-foreground">
              <p>
                Electricity can be produced in several ways. As an electrician, you'll work with electricity from different sources:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-bold text-emerald-400">AC Sources (Alternating Current)</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li><strong>Mains supply:</strong> 230V from power stations via National Grid</li>
                    <li><strong>Generators:</strong> Emergency backup power for buildings</li>
                    <li><strong>Solar inverters:</strong> Convert DC from panels to AC for use</li>
                    <li><strong>Wind turbines:</strong> Generate AC from wind power</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-bold text-emerald-400">DC Sources (Direct Current)</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li><strong>Batteries:</strong> Car batteries (12V), AA cells (1.5V)</li>
                    <li><strong>Solar panels:</strong> Direct DC output from sunlight</li>
                    <li><strong>DC power supplies:</strong> Convert mains AC to DC</li>
                    <li><strong>Emergency lighting:</strong> Battery backup systems</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: AC vs DC */}
        <div className="mb-8">
          <div className="border-l-4 border-purple-500 bg-card dark:bg-card p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
              AC vs DC - What's the Difference?
            </h2>
            <div className="space-y-4 text-foreground">
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-3">
                  <h4 className="font-bold text-emerald-400">AC (Alternating Current)</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Changes direction 50 times per second (50Hz in UK)</li>
                    <li>Easy to transform to different voltages</li>
                    <li>Used for mains electricity supply</li>
                    <li>Can travel long distances efficiently</li>
                    <li>Powers most household appliances</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-bold text-emerald-400">DC (Direct Current)</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Flows in one direction only</li>
                    <li>Steady, constant voltage</li>
                    <li>Used in batteries and electronics</li>
                    <li>Good for low voltage applications</li>
                    <li>Essential for charging devices</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-yellow-300">
                  <strong>Practical Example:</strong> Your mobile phone charger converts 230V AC from the wall socket 
                  into low voltage DC to charge the battery. Most electronic devices need DC to work properly.
                </p>
              </div>
            </div>
          </div>
        </div>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Complete Circuits */}
        <div className="mb-8">
          <div className="border-l-4 border-red-500 bg-card dark:bg-card p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">4</span>
              Complete Circuits - Why Electricity Needs a Path
            </h2>
            <div className="space-y-4 text-foreground">
              <p>
                For electricity to work, it must flow in a complete circuit. Think of it like a running track - 
                you need a complete loop to go around.
              </p>
              
              <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-card border border-border/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-emerald-400 mb-2">1. Source</h4>
                  <p className="text-sm text-blue-200">Provides the electrical energy - battery, power station, generator</p>
                </div>
                <div className="bg-card border border-green-400/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-300 mb-2">2. Load</h4>
                  <p className="text-sm text-green-200">Uses the electrical energy - lamp, motor, heater, TV</p>
                </div>
                <div className="bg-card border border-border/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-emerald-400 mb-2">3. Path</h4>
                  <p className="text-sm text-purple-200">Allows current to flow - wires, cables, connections</p>
                </div>
              </div>
              
              <div className="bg-card border border-border/30 p-4 rounded-lg">
                <p className="text-emerald-400">
                  <strong>Remember:</strong> If any part of the circuit is broken, electricity can't flow and nothing works. 
                  This is why loose connections, damaged cables, or blown fuses stop things working.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20 bg-none shadow-none">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Practical Guidance for Apprentices</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">On Site Application</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-card border border-border/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-emerald-400 mb-2">When Installing Circuits</h4>
                  <ul className="list-disc pl-4 space-y-1 text-sm text-blue-200">
                    <li>Remember electricity needs a complete path to work</li>
                    <li>Check all connections are secure to maintain the circuit</li>
                    <li>Consider what type of load you're connecting (resistive, inductive)</li>
                    <li>Match cable size to the expected current flow</li>
                  </ul>
                </div>
                <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-emerald-400 mb-2">When Fault Finding</h4>
                  <ul className="list-disc pl-4 space-y-1 text-sm text-emerald-400/80">
                    <li>Look for breaks in the circuit path first</li>
                    <li>Check if the power source is actually providing electricity</li>
                    <li>Test loads separately to isolate the problem</li>
                    <li>Use your understanding of current flow to trace faults</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Common Mistakes to Avoid</h3>
              <div className="bg-card border border-border/30 p-4 rounded-lg">
                <ul className="list-disc pl-4 space-y-2 text-sm text-red-200">
                  <li><strong>Assuming circuits are dead:</strong> Always test with a proper voltage indicator</li>
                  <li><strong>Ignoring load types:</strong> Motors draw more current when starting than when running</li>
                  <li><strong>Poor connections:</strong> Loose connections create resistance, heat, and potential fire risks</li>
                  <li><strong>Wrong cable sizes:</strong> Undersized cables can overheat; oversized cables waste money</li>
                  <li><strong>Mixing AC and DC:</strong> Some equipment only works with specific supply types</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Building Your Understanding</h3>
              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <ul className="list-disc pl-4 space-y-2 text-sm text-emerald-400/80">
                  <li><strong>Start simple:</strong> Master basic circuits before moving to complex installations</li>
                  <li><strong>Ask questions:</strong> If you don't understand why something works, ask your supervisor</li>
                  <li><strong>Practice with meters:</strong> Get comfortable measuring voltage, current, and resistance</li>
                  <li><strong>Think safety first:</strong> Every electrical job has potential hazards - identify them early</li>
                  <li><strong>Learn from experience:</strong> Each job teaches you something new about how electricity behaves</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-8 p-0 bg-card border-border/20 bg-none shadow-none overflow-hidden">
          <div className="p-6 border-b border-border/20">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Frequently Asked Questions</h2>
          </div>
          <div className="divide-y divide-border/20">
            {faqs.map((faq, index) => (
              <div key={index} className="p-6">
                <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Pocket Cards */}
        <div className="mb-8 space-y-6">
          <UnitsPocketCard />
          
          <Card className="p-6 bg-card border-border/20 bg-none shadow-none">
            <div className="mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-foreground">Quick Reference Card</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Essential electricity facts for apprentice electricians
            </p>
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-sm">
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-foreground">Basic Facts</h4>
                  <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                    <li>Electricity = flow of electrons</li>
                    <li>UK mains = 230V AC, 50Hz</li>
                    <li>Complete circuit needed</li>
                    <li>AC changes direction, DC flows one way</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Common Sources</h4>
                  <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                    <li>Mains supply (AC)</li>
                    <li>Batteries (DC)</li>
                    <li>Solar panels (DC)</li>
                    <li>Generators (AC)</li>
                  </ul>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-foreground">Safety Points</h4>
                  <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                    <li>Always assume circuits are live</li>
                    <li>Use proper PPE</li>
                    <li>Follow isolation procedures</li>
                    <li>Test before you touch</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Circuit Components</h4>
                  <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                    <li>Source (power supply)</li>
                    <li>Load (device using power)</li>
                    <li>Path (wires and connections)</li>
                    <li>Control (switches, protection)</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Quiz */}
        <Quiz 
          title="Test Your Knowledge: What is Electricity?"
          questions={quizQuestions}
        />

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-border/20">
          <Button variant="outline" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button asChild>
            <Link to="..">
              Next
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Module2Section1_1;