import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
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
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/5 sticky top-0 z-50 bg-[#1a1a1a] backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-3">
          <Button variant="ghost" size="sm" className="text-white/70 hover:text-white -ml-2" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content - Full width, minimal padding */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 2.1.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            What is Electricity?
          </h1>
          <p className="text-white/80">
            The fundamentals every apprentice electrician needs to know
          </p>
        </header>

        {/* Quick Summary Boxes - Keep these, they're useful */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Definition:</strong> Flow of electric charge through a circuit</li>
              <li><strong>Power:</strong> Makes lights, motors, heaters work</li>
              <li><strong>Sources:</strong> Power stations, batteries, solar panels</li>
              <li><strong>Safety:</strong> Dangerous - proper training essential</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Live circuits, powered devices, circuit components</li>
              <li><strong>Use:</strong> Fault finding, safe installation practices</li>
              <li><strong>Apply:</strong> Circuit design, material selection</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes - Simple list */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define electricity and explain how it works",
              "Identify different sources of electrical energy",
              "Understand the difference between AC and DC",
              "Explain what makes a complete electrical circuit",
              "Relate theory to practical installation work",
              "Recognise electrical safety hazards"
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

        {/* Section 1: What is Electricity */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What is Electricity?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electricity is a form of energy created by the movement of tiny particles called electrons.
              These particles carry an electric charge, and when they move along a conductor (like copper wire),
              we call that electric current.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Think of electricity like water:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Water flows through pipes — electricity flows through wires</li>
                <li>Water pressure pushes water — voltage pushes electrons</li>
                <li>Amount of water flowing — amount of current flowing</li>
                <li>Water turns a wheel — electricity lights a bulb</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key facts:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>You can't see electricity, but you can see what it does</li>
                <li>It travels at nearly the speed of light</li>
                <li>It always needs a complete path (circuit) to flow</li>
                <li>It can be stored in batteries or generated when needed</li>
                <li>It can be converted into heat, light, movement, or sound</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Sources of Electricity */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Sources of Electricity
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electricity can be produced in several ways. As an electrician, you'll work with electricity from different sources:
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">AC Sources (Alternating Current)</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Mains supply:</strong> 230V from power stations</li>
                  <li><strong>Generators:</strong> Emergency backup power</li>
                  <li><strong>Solar inverters:</strong> Convert DC from panels to AC</li>
                  <li><strong>Wind turbines:</strong> Generate AC from wind</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">DC Sources (Direct Current)</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Batteries:</strong> Car batteries (12V), AA cells (1.5V)</li>
                  <li><strong>Solar panels:</strong> Direct DC output</li>
                  <li><strong>DC power supplies:</strong> Convert AC to DC</li>
                  <li><strong>Emergency lighting:</strong> Battery backup systems</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: AC vs DC */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            AC vs DC — What's the Difference?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-white mb-2">AC (Alternating Current)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Changes direction 50 times per second (50Hz UK)</li>
                  <li>Easy to transform to different voltages</li>
                  <li>Used for mains electricity supply</li>
                  <li>Can travel long distances efficiently</li>
                  <li>Powers most household appliances</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-white mb-2">DC (Direct Current)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Flows in one direction only</li>
                  <li>Steady, constant voltage</li>
                  <li>Used in batteries and electronics</li>
                  <li>Good for low voltage applications</li>
                  <li>Essential for charging devices</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> Your phone charger converts 230V AC from the wall socket
              into low voltage DC to charge the battery.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Complete Circuits */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Complete Circuits
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              For electricity to work, it must flow in a complete circuit. Think of it like a running track —
              you need a complete loop to go around.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">1. Source</p>
                <p className="text-white/90 text-xs">Battery, power station, generator</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">2. Load</p>
                <p className="text-white/90 text-xs">Lamp, motor, heater, TV</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">3. Path</p>
                <p className="text-white/90 text-xs">Wires, cables, connections</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> If any part of the circuit is broken, electricity can't flow and nothing works.
              This is why loose connections, damaged cables, or blown fuses stop things working.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Installing Circuits</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Remember electricity needs a complete path to work</li>
                <li>Check all connections are secure</li>
                <li>Consider what type of load you're connecting</li>
                <li>Match cable size to the expected current flow</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Fault Finding</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Look for breaks in the circuit path first</li>
                <li>Check if the power source is providing electricity</li>
                <li>Test loads separately to isolate the problem</li>
                <li>Use your understanding of current flow to trace faults</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Assuming circuits are dead</strong> — always test first</li>
                <li><strong>Ignoring load types</strong> — motors draw more current on startup</li>
                <li><strong>Poor connections</strong> — create resistance, heat, and fire risks</li>
                <li><strong>Wrong cable sizes</strong> — undersized cables overheat</li>
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

        {/* Reference Cards */}
        <section className="mb-10">
          <UnitsPocketCard />

          <div className="mt-6 p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Basic Facts</p>
                <ul className="space-y-0.5">
                  <li>Electricity = flow of electrons</li>
                  <li>UK mains = 230V AC, 50Hz</li>
                  <li>Complete circuit needed</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Safety</p>
                <ul className="space-y-0.5">
                  <li>Always assume circuits are live</li>
                  <li>Use proper PPE</li>
                  <li>Test before you touch</li>
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
        <nav className="flex justify-between items-center pt-8 border-t border-white/5">
          <Button variant="ghost" size="sm" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="../1-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Module2Section1_1;
