import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
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
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
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
            <span>Module 2.3.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Series and Parallel Circuits
          </h1>
          <p className="text-white/80">
            Master circuit types and their characteristics for UK electrical installations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Series:</strong> Components connected end-to-end, current same everywhere, voltage divides</li>
              <li><strong>Parallel:</strong> Components side-by-side, voltage same everywhere, current divides</li>
              <li><strong>Series resistance:</strong> R₁ + R₂ + R₃... (adds up)</li>
              <li><strong>Parallel resistance:</strong> 1/Rtotal = 1/R₁ + 1/R₂... (gets smaller)</li>
              <li><strong>UK practice:</strong> Most building circuits are parallel for independent operation</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Christmas lights (series), household sockets (parallel), car headlights (parallel)</li>
              <li><strong>Use:</strong> Circuit design, fault finding, load calculations, cable sizing</li>
              <li><strong>Apply:</strong> Ring circuits, radial circuits, emergency lighting, distribution boards</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes - Simple list */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Distinguish between series and parallel circuit configurations",
              "Calculate total resistance for both series and parallel arrangements",
              "Predict voltage and current behaviour in different circuit types",
              "Apply Ohm's Law to series and parallel circuit calculations",
              "Recognise series and parallel configurations in UK installations",
              "Understand the advantages and disadvantages of each circuit type",
              "Apply circuit knowledge to fault finding and troubleshooting"
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

        {/* Section 1: Series Circuits */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Series Circuits - One Path for Current
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In series circuits, components are connected end-to-end in a single path.
              Current has only one route to follow, so it must be the same through every component.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key characteristics of series circuits:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Current:</strong> Same everywhere (I₁ = I₂ = I₃ = Itotal)</li>
                <li><strong>Voltage:</strong> Divides between components (Vsupply = V₁ + V₂ + V₃)</li>
                <li><strong>Resistance:</strong> Adds together (Rtotal = R₁ + R₂ + R₃)</li>
                <li><strong>Failure:</strong> One component fails, whole circuit stops</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Real Example:</strong> Old-style Christmas lights were wired in series.
              When one bulb failed, all the lights went out because the circuit path was broken.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Parallel Circuits */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Parallel Circuits - Multiple Paths for Current
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In parallel circuits, components are connected side-by-side across common points.
              This creates multiple paths for current to flow, like lanes on a motorway.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key characteristics of parallel circuits:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Voltage:</strong> Same across all branches (V₁ = V₂ = V₃ = Vsupply)</li>
                <li><strong>Current:</strong> Divides between branches (Itotal = I₁ + I₂ + I₃)</li>
                <li><strong>Resistance:</strong> 1/Rtotal = 1/R₁ + 1/R₂ + 1/R₃ (gets smaller)</li>
                <li><strong>Independence:</strong> Each branch works independently</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Real Example:</strong> Household sockets are wired in parallel.
              Each appliance gets full 230V and if one fails, the others keep working.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Calculations and Formulas */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Circuit Calculations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Series Calculations</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Total resistance: Rtotal = R₁ + R₂ + R₃...</li>
                  <li>Current everywhere: I = V/Rtotal</li>
                  <li>Voltage across each: V = I × R</li>
                  <li>Power in each: P = V × I or I²R</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Parallel Calculations</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Total resistance: 1/Rtotal = 1/R₁ + 1/R₂ + 1/R₃...</li>
                  <li>Current in each branch: I = V/R</li>
                  <li>Total current: Itotal = I₁ + I₂ + I₃...</li>
                  <li>Power in each: P = V²/R</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Important:</strong> In parallel, total resistance is always less than the smallest individual resistance.
              Adding more parallel branches decreases total resistance and increases total current.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: UK Installation Context */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            UK Installation Applications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding series and parallel circuits is essential for UK electrical installations
              and BS 7671 compliance.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Series Applications</p>
                <ul className="text-sm text-white space-y-1">
                  <li>LED strip lighting (low voltage)</li>
                  <li>Some decorative lighting chains</li>
                  <li>Voltage divider circuits</li>
                  <li>Current limiting applications</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Parallel Applications</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Socket outlet circuits (ring and radial)</li>
                  <li>Lighting circuits with independent switching</li>
                  <li>Distribution board circuits</li>
                  <li>Emergency lighting systems</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>BS 7671 Considerations:</strong> Circuit design must consider voltage drop,
              protective device coordination, and load diversity - all dependent on understanding
              series and parallel behaviour.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance for Apprentices</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Designing Circuits</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Use parallel for independence and full voltage supply</li>
                <li>Consider total current when adding parallel loads</li>
                <li>Remember voltage drop increases with circuit length</li>
                <li>Size cables for total expected current</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Fault Finding</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>In series: one fault affects whole circuit</li>
                <li>In parallel: faults usually affect one branch only</li>
                <li>Check connections at junction points</li>
                <li>Use understanding of current paths to trace faults</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Confusing voltage and current behaviour:</strong> Remember voltage divides in series, current divides in parallel</li>
                <li><strong>Wrong resistance calculations:</strong> Series adds directly, parallel uses reciprocals</li>
                <li><strong>Ignoring cable resistance:</strong> Long cable runs add series resistance</li>
                <li><strong>Poor connections:</strong> Loose connections create unwanted series resistance</li>
                <li><strong>Overloading parallel circuits:</strong> Each new branch adds to total current</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Building Your Understanding</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Practice calculations:</strong> Work through examples until formulas become natural</li>
                <li><strong>Identify circuits:</strong> Look at real installations and identify series/parallel sections</li>
                <li><strong>Use test equipment:</strong> Measure voltage and current to verify your understanding</li>
                <li><strong>Think about consequences:</strong> What happens when loads are added or removed?</li>
                <li><strong>Connect to BS 7671:</strong> Understand how circuit types affect regulation compliance</li>
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
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference Card</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Series Circuits</p>
                <ul className="space-y-0.5">
                  <li>Current same everywhere</li>
                  <li>Voltage divides between components</li>
                  <li>Resistance: Rtotal = R₁ + R₂ + R₃</li>
                  <li>One fails, all stop</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Parallel Circuits</p>
                <ul className="space-y-0.5">
                  <li>Voltage same across all branches</li>
                  <li>Current divides between branches</li>
                  <li>Resistance: 1/Rtotal = 1/R₁ + 1/R₂</li>
                  <li>Independent operation</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge: Series and Parallel Circuits"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../3-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Module2Section3_1;
