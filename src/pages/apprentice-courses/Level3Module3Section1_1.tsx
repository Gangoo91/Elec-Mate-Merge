import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Ohm's Law and Power Equations - Level 3 Module 3 Section 1.1";
const DESCRIPTION = "Master Ohm's Law and power equations - understand the mathematical relationships between voltage, current, resistance and power in electrical circuits.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "A circuit has a resistance of 20 ohms and a current of 5A flowing. What is the voltage across the resistance?",
    options: [
      "4V",
      "25V",
      "100V",
      "0.25V"
    ],
    correctIndex: 2,
    explanation: "Using Ohm's Law V = IR: V = 5A x 20 ohms = 100V. The voltage across a resistor is directly proportional to both the current flowing through it and its resistance value."
  },
  {
    id: "check-2",
    question: "Which formula correctly calculates power when you know voltage and current?",
    options: [
      "P = V/I",
      "P = VI",
      "P = V + I",
      "P = V - I"
    ],
    correctIndex: 1,
    explanation: "P = VI is the fundamental power equation. Power (in watts) equals voltage (in volts) multiplied by current (in amperes). This is why we often see 'VA' ratings on equipment."
  },
  {
    id: "check-3",
    question: "A 230V heater element draws 10A. What is its resistance?",
    options: [
      "2300 ohms",
      "2.3 ohms",
      "23 ohms",
      "0.043 ohms"
    ],
    correctIndex: 2,
    explanation: "Using R = V/I: R = 230V / 10A = 23 ohms. This is a typical resistance for a heating element - low enough to draw significant current for heat production."
  },
  {
    id: "check-4",
    question: "If a circuit's resistance is doubled while voltage remains constant, what happens to the power dissipated?",
    options: [
      "Power doubles",
      "Power halves",
      "Power quadruples",
      "Power remains the same"
    ],
    correctIndex: 1,
    explanation: "Using P = V squared / R, if R doubles and V stays constant, power halves. This is why increasing cable size (reducing resistance) reduces power losses in long cable runs."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A 12V battery supplies a lamp with a resistance of 6 ohms. What current flows through the lamp?",
    options: ["0.5A", "2A", "72A", "18A"],
    correctAnswer: 1,
    explanation: "Using I = V/R: I = 12V / 6 ohms = 2A. This is a fundamental Ohm's Law calculation that you'll use frequently for circuit analysis."
  },
  {
    id: 2,
    question: "What is the power consumed by a device drawing 13A from a 230V supply?",
    options: ["17.7W", "243W", "2990W", "2.99kW"],
    correctAnswer: 2,
    explanation: "P = VI = 230V x 13A = 2990W (or 2.99kW). This is close to the maximum for a standard UK 13A socket outlet, which is rated at 3kW."
  },
  {
    id: 3,
    question: "A cable has a resistance of 0.5 ohms and carries 20A. What power is lost as heat in the cable?",
    options: ["10W", "40W", "200W", "400W"],
    correctAnswer: 2,
    explanation: "Using P = I squared x R: P = 20A squared x 0.5 ohms = 400 x 0.5 = 200W. This is why cable sizing is critical - undersized cables waste energy as heat."
  },
  {
    id: 4,
    question: "Which transposition of Ohm's Law correctly calculates resistance?",
    options: ["R = IV", "R = I/V", "R = V/I", "R = V x I"],
    correctAnswer: 2,
    explanation: "R = V/I is the correct transposition. Resistance equals voltage divided by current. Remember: V = IR can be rearranged to R = V/I or I = V/R."
  },
  {
    id: 5,
    question: "A 2kW heater operates from 230V. What is its operating current?",
    options: ["8.7A", "460A", "0.115A", "115A"],
    correctAnswer: 0,
    explanation: "Using I = P/V: I = 2000W / 230V = 8.7A. This is why 2kW heaters can run from a standard 13A socket - they draw less than the 13A maximum."
  },
  {
    id: 6,
    question: "What happens to the current if voltage is doubled while resistance remains constant?",
    options: ["Current halves", "Current stays the same", "Current doubles", "Current quadruples"],
    correctAnswer: 2,
    explanation: "From I = V/R, if V doubles and R stays constant, I must double. Current is directly proportional to voltage - this is the essence of Ohm's Law."
  },
  {
    id: 7,
    question: "A resistor dissipates 100W when connected to 50V. What is its resistance?",
    options: ["0.5 ohms", "2 ohms", "25 ohms", "5000 ohms"],
    correctAnswer: 2,
    explanation: "Using R = V squared / P: R = 50V squared / 100W = 2500 / 100 = 25 ohms. This formula is useful when you know power and voltage but not current."
  },
  {
    id: 8,
    question: "Three 60W lamps are connected in parallel to 230V. What is the total current drawn?",
    options: ["0.26A", "0.78A", "26A", "180A"],
    correctAnswer: 1,
    explanation: "Total power = 3 x 60W = 180W. I = P/V = 180W / 230V = 0.78A. In parallel, powers (and currents) add up while voltage remains constant."
  },
  {
    id: 9,
    question: "What is the resistance of a 3kW immersion heater designed for 230V operation?",
    options: ["17.6 ohms", "76.7 ohms", "690 ohms", "13 ohms"],
    correctAnswer: 0,
    explanation: "R = V squared / P = 230V squared / 3000W = 52900 / 3000 = 17.6 ohms. Low resistance allows high current flow for rapid water heating."
  },
  {
    id: 10,
    question: "A motor draws 4A at 230V. If the supply voltage drops to 200V, what power would the motor consume (assuming constant resistance)?",
    options: ["800W", "920W", "696W", "1000W"],
    correctAnswer: 2,
    explanation: "First find R = V/I = 230/4 = 57.5 ohms. At 200V: P = V squared / R = 40000 / 57.5 = 696W. Reduced voltage significantly reduces power - this is voltage drop's real impact."
  }
];

const faqs = [
  {
    question: "Why do we have three different formulas for calculating power?",
    answer: "The three power formulas (P = VI, P = I squared R, P = V squared / R) are mathematically equivalent - they're derived from combining Ohm's Law with the basic power equation. Which one you use depends on what values you know. If you have voltage and current, use P = VI. If you have current and resistance, use P = I squared R. If you have voltage and resistance, use P = V squared / R."
  },
  {
    question: "Does Ohm's Law work for all components?",
    answer: "Ohm's Law applies strictly to 'ohmic' or linear resistive components where resistance remains constant regardless of voltage or current. However, many real-world components are non-ohmic - lamp filaments increase resistance when hot, diodes only conduct one way, and thermistors change resistance with temperature. Ohm's Law is still useful as an approximation in many practical situations."
  },
  {
    question: "Why is I squared R important for cable calculations?",
    answer: "The I squared R formula shows that power loss in cables increases with the square of current. Double the current means four times the power loss. This is why high-current circuits need larger cables - not just for current capacity, but to reduce energy waste and heating. It's also why the electricity grid uses high voltage (lower current) for transmission."
  },
  {
    question: "How do I remember the Ohm's Law triangle?",
    answer: "Draw a triangle with V at the top, I at bottom left, and R at bottom right. Cover the quantity you want to find: covering V gives IR (multiply), covering I gives V/R (divide), covering R gives V/I (divide). For power, use a similar triangle with P at top, I at bottom left, and V at bottom right."
  },
  {
    question: "What's the difference between power and energy?",
    answer: "Power is the rate of energy transfer, measured in watts. Energy is the total amount transferred over time, measured in joules or kilowatt-hours. A 1000W heater uses 1000 joules of energy every second. Run it for an hour and it uses 1kWh (3,600,000 joules). Your electricity bill charges for energy (kWh), not power."
  }
];

const Level3Module3Section1_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module3-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 3.1.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Ohm's Law and Power Equations
          </h1>
          <p className="text-white/80">
            The mathematical foundation of all electrical circuit analysis
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Ohm's Law:</strong> V = IR (voltage equals current times resistance)</li>
              <li><strong>Power basics:</strong> P = VI (power equals voltage times current)</li>
              <li><strong>Power variants:</strong> P = I squared R and P = V squared / R</li>
              <li><strong>Key insight:</strong> Doubling current quadruples power loss</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Equipment nameplates showing V, A, W ratings</li>
              <li><strong>Use:</strong> Cable sizing calculations using I squared R</li>
              <li><strong>Apply:</strong> Fault finding by comparing expected vs measured values</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply Ohm's Law in all its transposed forms",
              "Calculate power using the appropriate formula for available data",
              "Understand why power loss is proportional to current squared",
              "Use these equations for practical cable and circuit calculations",
              "Recognise when Ohm's Law applies and when it doesn't",
              "Link these equations to real-world installation scenarios"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Ohm's Law - The Foundation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Ohm's Law describes the fundamental relationship between voltage, current and resistance in an electrical circuit. Discovered by Georg Ohm in 1827, it states that the current flowing through a conductor is directly proportional to the voltage across it and inversely proportional to its resistance.
            </p>
            <p>
              The formula is elegantly simple: <strong>V = IR</strong>, where V is voltage in volts, I is current in amperes, and R is resistance in ohms. This single equation, along with its transpositions (I = V/R and R = V/I), forms the basis of virtually every electrical calculation you'll perform.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The Three Forms of Ohm's Law:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>V = IR</strong> - Calculate voltage when you know current and resistance</li>
                <li><strong>I = V/R</strong> - Calculate current when you know voltage and resistance</li>
                <li><strong>R = V/I</strong> - Calculate resistance when you know voltage and current</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Ohm's Law assumes constant temperature and applies to ohmic (linear) components. Real-world components like lamp filaments change resistance when hot, so measured values may differ from cold calculations.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Power Equations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Power is the rate at which electrical energy is converted or transferred. The fundamental power equation is <strong>P = VI</strong>, where P is power in watts, V is voltage in volts, and I is current in amperes. This equation explains why equipment ratings often show both voltage and current - multiply them to get power.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Derived Power Formulas</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>P = VI</strong> - Basic power equation</li>
                  <li><strong>P = I squared R</strong> - When you know current and resistance</li>
                  <li><strong>P = V squared / R</strong> - When you know voltage and resistance</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Why Multiple Formulas?</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Different information available in different situations</li>
                  <li>All derived by substituting Ohm's Law into P = VI</li>
                  <li>Results are identical - choose the most convenient formula</li>
                </ul>
              </div>
            </div>

            <p>
              The I squared R formula is particularly important for cable calculations because it shows that power loss (and hence heating) increases with the <em>square</em> of the current. This is why doubling the current in a cable quadruples the power loss - a critical consideration for cable sizing.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Practical Applications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              These equations aren't just theory - they're tools you'll use daily. Cable sizing relies on I squared R to calculate voltage drop and power loss. Fault finding uses Ohm's Law to predict what readings you should see. Load calculations use P = VI to determine circuit current requirements.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A client wants to install a 9.5kW electric shower on an existing 6mm squared cable run of 15 metres. Using I = P/V gives 9500 / 230 = 41.3A. Checking manufacturer tables, 6mm squared cable can only carry about 32A when clipped direct. The cable is undersized - you'd need 10mm squared minimum. This is Ohm's Law and power equations protecting against a fire risk.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common Site Calculations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Finding expected current from equipment power rating</li>
                <li>Calculating voltage drop in long cable runs</li>
                <li>Verifying equipment is suitable for the supply voltage</li>
                <li>Determining if a circuit can handle additional load</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            The Power Triangle and Ohm's Law Triangle
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Memory aids like the Ohm's Law triangle help you quickly find the right formula. Place V at the top, I and R at the bottom corners. Cover what you want to find - if the remaining quantities are side by side, multiply them; if one is above the other, divide the top by the bottom.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Find Voltage</p>
                <p className="text-white/90 text-xs">Cover V: see IR, so V = I x R</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Find Current</p>
                <p className="text-white/90 text-xs">Cover I: see V/R, so I = V / R</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Find Resistance</p>
                <p className="text-white/90 text-xs">Cover R: see V/I, so R = V / I</p>
              </div>
            </div>

            <p>
              A similar triangle exists for power with P at the top and V and I at the bottom. For more complex calculations involving resistance and power, you can construct an expanded wheel showing all twelve possible formulas - but understanding the principles means you can derive any formula from the basics.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Pro tip:</strong> Don't just memorise formulas - understand what they mean. V = IR tells you voltage is the 'push' needed to force current through resistance. P = I squared R tells you losses grow rapidly with current. Understanding beats memorisation every time.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Installing</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always calculate expected current before selecting cable sizes</li>
                <li>Use I squared R to check voltage drop on long runs</li>
                <li>Verify that circuit protection matches the cable's current-carrying capacity</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Fault Finding</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Compare measured values with calculated expectations</li>
                <li>High current with normal voltage suggests low resistance (possible short)</li>
                <li>Low current with normal voltage suggests high resistance (possible open circuit or bad connection)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Using cold resistance values</strong> - Lamp filaments and heating elements have much lower resistance when cold, drawing higher inrush currents</li>
                <li><strong>Forgetting units</strong> - Mixing kilowatts and watts, or milliamps and amps gives answers out by factors of 1000</li>
                <li><strong>Ignoring the squared relationship</strong> - Underestimating how quickly losses increase with current leads to undersized cables</li>
              </ul>
            </div>
          </div>
        </section>

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

        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Ohm's Law</p>
                <ul className="space-y-0.5">
                  <li>V = IR (voltage = current x resistance)</li>
                  <li>I = V/R (current = voltage / resistance)</li>
                  <li>R = V/I (resistance = voltage / current)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Power Equations</p>
                <ul className="space-y-0.5">
                  <li>P = VI (power = voltage x current)</li>
                  <li>P = I squared R (power = current squared x resistance)</li>
                  <li>P = V squared / R (power = voltage squared / resistance)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module3-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module3-section1-2">
              Next: Electrical Quantities
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default Level3Module3Section1_1;
