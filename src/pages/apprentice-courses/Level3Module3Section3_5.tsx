import { ArrowLeft, ArrowRight, Zap, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";

const quickCheckQuestions = [
  {
    question: "What is the synchronous speed of a 4-pole motor connected to a 50 Hz supply?",
    options: ["3000 rpm", "1500 rpm", "1000 rpm", "750 rpm"],
    correctIndex: 1,
    explanation: "Synchronous speed Ns = (120 x f) / p = (120 x 50) / 4 = 6000 / 4 = 1500 rpm. The formula uses pole pairs, so 4 poles gives 1500 rpm."
  },
  {
    question: "An induction motor runs at 1440 rpm when the synchronous speed is 1500 rpm. What is the slip?",
    options: ["4%", "6%", "96%", "2%"],
    correctIndex: 0,
    explanation: "Slip s = (Ns - Nr) / Ns = (1500 - 1440) / 1500 = 60 / 1500 = 0.04 = 4%. This is typical for a loaded motor."
  },
  {
    question: "In a DC generator, what component converts AC to DC?",
    options: ["Field windings", "Armature", "Commutator", "Brushes"],
    correctIndex: 2,
    explanation: "The commutator is a mechanical rectifier that reverses connections to the armature coils at the correct moment, converting the AC generated in the armature to DC at the brushes."
  },
  {
    question: "What type of motor has the rotor speed equal to synchronous speed?",
    options: ["Induction motor", "Synchronous motor", "Universal motor", "DC shunt motor"],
    correctIndex: 1,
    explanation: "Synchronous motors run at exactly synchronous speed (Ns = 120f/p) with no slip. They require separate DC excitation and starting means."
  }
];

const quizQuestions = [
  {
    question: "Calculate the synchronous speed of a 6-pole motor on a 50 Hz supply.",
    options: ["500 rpm", "1000 rpm", "1500 rpm", "3000 rpm"],
    correctIndex: 1,
    explanation: "Ns = (120 x f) / p = (120 x 50) / 6 = 6000 / 6 = 1000 rpm."
  },
  {
    question: "A 4-pole induction motor has 3% slip at full load. What is the rotor speed?",
    options: ["1455 rpm", "1500 rpm", "1425 rpm", "1545 rpm"],
    correctIndex: 0,
    explanation: "Ns = 120 x 50 / 4 = 1500 rpm. Nr = Ns x (1 - s) = 1500 x (1 - 0.03) = 1500 x 0.97 = 1455 rpm."
  },
  {
    question: "What happens to an induction motor if rotor speed equals synchronous speed?",
    options: ["Maximum torque is produced", "No torque is produced", "Motor runs at rated power", "Motor reverses direction"],
    correctIndex: 1,
    explanation: "At synchronous speed, there is no relative motion between rotor and rotating field, so no EMF is induced in rotor conductors and no torque is produced. Some slip is essential."
  },
  {
    question: "In a DC motor, what determines the direction of rotation?",
    options: ["Supply frequency", "Relative polarity of field and armature current", "Speed of rotation", "Type of winding"],
    correctIndex: 1,
    explanation: "Direction is determined by Fleming's left-hand rule: the interaction between field flux and armature current. Reversing either field OR armature polarity reverses rotation; reversing both maintains direction."
  },
  {
    question: "Which starting method is most suitable for a large squirrel cage induction motor?",
    options: ["Direct-on-line (DOL)", "Star-delta", "Auto-transformer", "Primary resistance"],
    correctIndex: 2,
    explanation: "Auto-transformer starting provides reduced voltage while maintaining good torque/current ratio. Suitable for large motors where DOL current would be excessive but good starting torque is needed."
  },
  {
    question: "A DC shunt motor runs at 1200 rpm with 200V supply. If field resistance increases, what happens?",
    options: ["Speed decreases", "Speed increases", "Speed stays same", "Motor stops"],
    correctIndex: 1,
    explanation: "Increasing field resistance reduces field current and flux. With reduced flux, back EMF drops, armature current increases, and the motor speeds up to restore back EMF. This is field weakening."
  },
  {
    question: "What is the purpose of damper windings in a synchronous motor?",
    options: ["To improve power factor", "To enable starting and prevent hunting", "To reduce losses", "To increase voltage"],
    correctIndex: 1,
    explanation: "Damper windings (amortisseur windings) allow the motor to start like an induction motor. Once running, they dampen oscillations (hunting) when load changes occur."
  },
  {
    question: "In a 3-phase induction motor, how is the rotating magnetic field created?",
    options: ["By DC excitation", "By the 120 degree phase displacement of 3-phase currents", "By mechanical rotation", "By capacitor phase shift"],
    correctIndex: 1,
    explanation: "The three phases, displaced 120 degrees in time and space, create currents that produce a smoothly rotating magnetic field at synchronous speed, without mechanical movement."
  },
  {
    question: "What is the main advantage of a wound rotor induction motor over squirrel cage?",
    options: ["Higher efficiency", "Lower cost", "External resistance can control starting current and torque", "No maintenance required"],
    correctIndex: 2,
    explanation: "Wound rotor motors allow external resistors to be connected via slip rings. This limits starting current while providing high starting torque, and enables speed control."
  },
  {
    question: "Calculate the frequency of rotor currents in a motor with 4% slip running on 50 Hz supply.",
    options: ["50 Hz", "48 Hz", "2 Hz", "52 Hz"],
    correctIndex: 2,
    explanation: "Rotor frequency fr = s x f = 0.04 x 50 = 2 Hz. At standstill (s = 1), rotor frequency equals supply frequency. At running speed, it is much lower."
  },
  {
    question: "A generator produces 400V at 50 Hz with 8 poles. What is its speed?",
    options: ["375 rpm", "750 rpm", "1500 rpm", "3000 rpm"],
    correctIndex: 1,
    explanation: "For a generator, f = (p x N) / 120. Rearranging: N = (120 x f) / p = (120 x 50) / 8 = 750 rpm."
  },
  {
    question: "What type of DC motor has the best speed regulation under varying load?",
    options: ["Series motor", "Shunt motor", "Compound motor", "Permanent magnet motor"],
    correctIndex: 1,
    explanation: "DC shunt motors have field winding in parallel with armature, so field flux is nearly constant. This gives excellent speed regulation - speed varies only slightly with load changes."
  }
];

const faqItems = [
  {
    question: "Why do induction motors need slip to produce torque?",
    answer: "Induction motors work by electromagnetic induction - the rotating stator field must cut across rotor conductors to induce current. If the rotor ran at synchronous speed, there would be no relative motion, no induced EMF, no rotor current, and therefore no torque. Slip ensures continuous relative motion between field and rotor."
  },
  {
    question: "What is the difference between a motor and a generator?",
    answer: "Both are rotating machines with similar construction. A motor converts electrical energy to mechanical energy (current flows in, shaft rotates). A generator converts mechanical energy to electrical (shaft driven, current flows out). The same machine can operate as either, depending on energy flow direction."
  },
  {
    question: "Why are DC motors still used when AC is more common?",
    answer: "DC motors offer excellent speed control over a wide range, high starting torque (especially series motors), and simple reversing. They are used in traction (trains, lifts), cranes, and applications needing precise speed control. Modern power electronics make DC motor control even more versatile."
  },
  {
    question: "How does a variable frequency drive (VFD) control motor speed?",
    answer: "A VFD converts fixed-frequency AC to variable-frequency AC. Since synchronous speed Ns = 120f/p, changing frequency changes speed. The VFD also adjusts voltage proportionally (V/f ratio) to maintain constant flux and torque capability. This is the most efficient method of speed control."
  },
  {
    question: "What causes a motor to overheat?",
    answer: "Common causes include: overloading beyond rated capacity, low voltage (higher current for same torque), poor ventilation or blocked cooling, single-phasing (one phase lost), high ambient temperature, frequent starting, and bearing failures causing increased friction. Protection devices should prevent damage."
  },
  {
    question: "Why is power factor correction important for motors?",
    answer: "Induction motors draw reactive (magnetising) current, giving power factors of 0.8-0.9 at full load, worse at light loads. Poor power factor means higher current for the same power, increasing cable losses and potentially incurring utility penalties. PFC capacitors are often installed at motor terminals."
  }
];

const Level3Module3Section3_5 = () => {
  useSEO(
    "Motors and Generators - Level 3 Electrical Science | Elec-Mate",
    "Master the principles of rotating electrical machines including DC motors, AC induction motors, synchronous machines and generators. Essential knowledge for City & Guilds Level 3 qualifications."
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 border-b border-white/10 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <Button variant="ghost" className="text-white/70 hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="/study-centre/apprentice/level3-module3-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3
            </Link>
          </Button>
          <span className="text-sm font-bold text-white bg-green-600 rounded-full px-3 py-1">
            Level 3 Module 3
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">
          3.5 Motors and Generators
        </h1>
        <p className="text-xl text-white/70 mb-8">
          Understanding the principles, operation and characteristics of rotating electrical machines
        </p>

        {/* Quick Summary Box */}
        <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-green-400 mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Quick Summary
          </h3>
          <ul className="text-white/80 space-y-2">
            <li>Synchronous speed: Ns = (120 x f) / p rpm</li>
            <li>Slip: s = (Ns - Nr) / Ns (typically 2-5% for induction motors)</li>
            <li>Motor action: Current-carrying conductor in magnetic field experiences force</li>
            <li>Generator action: Conductor moving through magnetic field has EMF induced</li>
            <li>Both machines are reversible - same construction, different energy flow</li>
          </ul>
        </div>

        {/* Learning Outcomes */}
        <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-400 mb-3">Learning Outcomes</h3>
          <ul className="text-white/80 space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-1 text-green-400 flex-shrink-0" />
              Explain the principles of motor action and generator action
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-1 text-green-400 flex-shrink-0" />
              Calculate synchronous speed and slip for AC motors
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-1 text-green-400 flex-shrink-0" />
              Describe the construction and operation of induction motors
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-1 text-green-400 flex-shrink-0" />
              Explain DC motor types and their characteristics
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-1 text-green-400 flex-shrink-0" />
              Understand motor starting methods and speed control
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-1 text-green-400 flex-shrink-0" />
              Describe generator principles and types
            </li>
          </ul>
        </div>

        {/* Main Content Sections */}
        <div className="prose prose-invert max-w-none">
          {/* Section 1 */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
              Fundamental Principles
            </h2>
            <div className="bg-[#242424] rounded-lg p-6 border border-white/10">
              <p className="text-white/80 mb-4">
                Motors and generators are based on the interaction between magnetic fields and current-carrying conductors. They are essentially the same machine operating in reverse.
              </p>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Motor Action (Fleming's Left-Hand Rule)</h4>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
                <p className="text-white/80 mb-3">When a current-carrying conductor is placed in a magnetic field, it experiences a force:</p>
                <p className="text-green-400 font-mono mb-2">F = B x I x L (Newtons)</p>
                <p className="text-white/80 text-sm">Where B = flux density (T), I = current (A), L = conductor length (m)</p>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
                  <div className="bg-[#242424] p-2 rounded">
                    <p className="text-green-400 font-semibold">Thumb</p>
                    <p className="text-white/70">Motion (Force)</p>
                  </div>
                  <div className="bg-[#242424] p-2 rounded">
                    <p className="text-green-400 font-semibold">First finger</p>
                    <p className="text-white/70">Field (N to S)</p>
                  </div>
                  <div className="bg-[#242424] p-2 rounded">
                    <p className="text-green-400 font-semibold">Second finger</p>
                    <p className="text-white/70">Current (+ve to -ve)</p>
                  </div>
                </div>
              </div>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Generator Action (Fleming's Right-Hand Rule)</h4>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
                <p className="text-white/80 mb-3">When a conductor moves through a magnetic field, an EMF is induced:</p>
                <p className="text-green-400 font-mono mb-2">e = B x L x v (Volts)</p>
                <p className="text-white/80 text-sm">Where B = flux density (T), L = conductor length (m), v = velocity (m/s)</p>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
                  <div className="bg-[#242424] p-2 rounded">
                    <p className="text-green-400 font-semibold">Thumb</p>
                    <p className="text-white/70">Motion</p>
                  </div>
                  <div className="bg-[#242424] p-2 rounded">
                    <p className="text-green-400 font-semibold">First finger</p>
                    <p className="text-white/70">Field</p>
                  </div>
                  <div className="bg-[#242424] p-2 rounded">
                    <p className="text-green-400 font-semibold">Second finger</p>
                    <p className="text-white/70">EMF (induced)</p>
                  </div>
                </div>
              </div>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Back EMF in Motors</h4>
              <p className="text-white/80 mb-4">
                A running motor also acts as a generator. The rotating armature generates a <strong>back EMF</strong> that opposes the supply voltage:
              </p>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4 text-center">
                <p className="text-green-400 font-mono mb-2">V = Eb + Ia x Ra</p>
                <p className="text-white/80 text-sm">Supply voltage = Back EMF + Armature voltage drop</p>
              </div>

              <InlineCheck
                question="A motor armature has resistance 0.5 ohms. With 200V supply and back EMF of 190V, what is the armature current?"
                options={["10 A", "20 A", "380 A", "400 A"]}
                correctIndex={1}
                explanation="Ia = (V - Eb) / Ra = (200 - 190) / 0.5 = 10 / 0.5 = 20 A. The back EMF limits current to a reasonable value."
              />
            </div>
          </div>

          {/* Section 2 */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
              AC Induction Motors
            </h2>
            <div className="bg-[#242424] rounded-lg p-6 border border-white/10">
              <p className="text-white/80 mb-4">
                The <strong>3-phase induction motor</strong> is the most common industrial motor due to its rugged construction, reliability and low maintenance. It works on the principle of a rotating magnetic field.
              </p>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Rotating Magnetic Field</h4>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
                <p className="text-white/80 mb-3">Three-phase currents in stator windings displaced 120 degrees apart create a smoothly rotating field:</p>
                <p className="text-green-400 font-mono text-lg mb-2">Ns = (120 x f) / p rpm</p>
                <p className="text-white/80 text-sm">Where Ns = synchronous speed, f = frequency (Hz), p = number of poles</p>
                <div className="mt-4 grid grid-cols-4 gap-2 text-center text-sm">
                  <div className="bg-[#242424] p-2 rounded">
                    <p className="text-green-400 font-semibold">2 poles</p>
                    <p className="text-white/70">3000 rpm</p>
                  </div>
                  <div className="bg-[#242424] p-2 rounded">
                    <p className="text-green-400 font-semibold">4 poles</p>
                    <p className="text-white/70">1500 rpm</p>
                  </div>
                  <div className="bg-[#242424] p-2 rounded">
                    <p className="text-green-400 font-semibold">6 poles</p>
                    <p className="text-white/70">1000 rpm</p>
                  </div>
                  <div className="bg-[#242424] p-2 rounded">
                    <p className="text-green-400 font-semibold">8 poles</p>
                    <p className="text-white/70">750 rpm</p>
                  </div>
                </div>
              </div>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Slip</h4>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
                <p className="text-white/80 mb-3">The rotor always runs slower than synchronous speed. This difference is called <strong>slip</strong>:</p>
                <p className="text-green-400 font-mono mb-2">Slip s = (Ns - Nr) / Ns</p>
                <p className="text-green-400 font-mono mb-2">Rotor speed Nr = Ns x (1 - s)</p>
                <p className="text-green-400 font-mono mb-2">Rotor frequency fr = s x f</p>
                <p className="text-white/80 text-sm mt-3">Typical slip at full load: 2-5%. Higher slip means more torque but higher losses.</p>
              </div>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Rotor Types</h4>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-[#1a1a1a] rounded-lg p-4">
                  <h5 className="font-semibold text-white mb-2">Squirrel Cage</h5>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>Aluminium or copper bars short-circuited by end rings</li>
                    <li>Simple, rugged, low maintenance</li>
                    <li>Fixed rotor resistance</li>
                    <li>High starting current (6-8 x full load)</li>
                    <li>Most common type (90%+ of motors)</li>
                  </ul>
                </div>
                <div className="bg-[#1a1a1a] rounded-lg p-4">
                  <h5 className="font-semibold text-white mb-2">Wound Rotor</h5>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>Three-phase winding connected to slip rings</li>
                    <li>External resistance for starting/speed control</li>
                    <li>High starting torque with low current</li>
                    <li>More expensive, requires maintenance</li>
                    <li>Used for cranes, lifts, heavy starting loads</li>
                  </ul>
                </div>
              </div>

              <InlineCheck
                question="A 4-pole motor runs at 1425 rpm on 50 Hz supply. What is the percentage slip?"
                options={["2.5%", "5%", "7.5%", "10%"]}
                correctIndex={1}
                explanation="Ns = 120 x 50 / 4 = 1500 rpm. Slip = (1500 - 1425) / 1500 = 75 / 1500 = 0.05 = 5%."
              />
            </div>
          </div>

          {/* Section 3 */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</span>
              DC Motors
            </h2>
            <div className="bg-[#242424] rounded-lg p-6 border border-white/10">
              <p className="text-white/80 mb-4">
                DC motors offer excellent speed control and high starting torque. They consist of a stationary field system and a rotating armature with a commutator.
              </p>

              <h4 className="text-lg font-semibold text-green-400 mb-3">DC Motor Types</h4>
              <div className="space-y-4 mb-4">
                <div className="bg-[#1a1a1a] rounded-lg p-4">
                  <h5 className="font-semibold text-white mb-2">Series Motor</h5>
                  <p className="text-white/70 text-sm mb-2">Field winding in series with armature. Current through both is the same.</p>
                  <ul className="text-white/70 text-sm space-y-1 ml-4">
                    <li><strong>High starting torque</strong> - torque proportional to current squared</li>
                    <li><strong>Variable speed</strong> - speed varies greatly with load</li>
                    <li><strong>Danger!</strong> Never run unloaded - can overspeed destructively</li>
                    <li>Used for: Traction, cranes, hoists, vehicle starters</li>
                  </ul>
                </div>
                <div className="bg-[#1a1a1a] rounded-lg p-4">
                  <h5 className="font-semibold text-white mb-2">Shunt Motor</h5>
                  <p className="text-white/70 text-sm mb-2">Field winding in parallel with armature. Field current independent of armature current.</p>
                  <ul className="text-white/70 text-sm space-y-1 ml-4">
                    <li><strong>Constant speed</strong> - excellent speed regulation</li>
                    <li><strong>Moderate starting torque</strong> - torque proportional to armature current</li>
                    <li>Safe unloaded - speed only slightly increases</li>
                    <li>Used for: Machine tools, conveyors, fans, pumps</li>
                  </ul>
                </div>
                <div className="bg-[#1a1a1a] rounded-lg p-4">
                  <h5 className="font-semibold text-white mb-2">Compound Motor</h5>
                  <p className="text-white/70 text-sm mb-2">Has both series and shunt field windings. Combines characteristics of both.</p>
                  <ul className="text-white/70 text-sm space-y-1 ml-4">
                    <li><strong>Cumulative compound:</strong> Series field aids shunt field</li>
                    <li><strong>Good starting torque</strong> with reasonable speed regulation</li>
                    <li>Safe unloaded (shunt field prevents runaway)</li>
                    <li>Used for: Presses, shears, rolling mills</li>
                  </ul>
                </div>
              </div>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Speed Control</h4>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
                <p className="text-white/80 mb-3">Speed equation: N proportional to (V - Ia.Ra) / Phi</p>
                <ul className="text-white/80 space-y-2">
                  <li><strong>Armature voltage control:</strong> Reduce V to reduce speed. Maintains torque. Used with thyristors/PWM.</li>
                  <li><strong>Field weakening:</strong> Increase field resistance to reduce flux. Speed increases. Torque reduces.</li>
                  <li><strong>Armature resistance:</strong> Add series resistance. Speed reduces but very inefficient (I squared R losses).</li>
                </ul>
              </div>

              <InlineCheck
                question="What happens to a DC shunt motor if the field winding opens while running?"
                options={["Motor stops immediately", "Speed decreases", "Motor runs away to dangerous speed", "Nothing - motor continues normally"]}
                correctIndex={2}
                explanation="Loss of field flux means back EMF drops to nearly zero. Armature current increases dramatically, producing high torque and dangerous overspeed. Field failure protection is essential."
              />
            </div>
          </div>

          {/* Section 4 */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</span>
              Motor Starting and Generators
            </h2>
            <div className="bg-[#242424] rounded-lg p-6 border border-white/10">
              <h4 className="text-lg font-semibold text-green-400 mb-3">Induction Motor Starting</h4>
              <p className="text-white/80 mb-4">
                At standstill, induction motors draw 6-8 times full-load current. Starting methods reduce this to acceptable levels:
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-[#1a1a1a] rounded-lg p-4">
                  <h5 className="font-semibold text-white mb-2">Direct-On-Line (DOL)</h5>
                  <p className="text-white/70 text-sm">Full voltage applied. Simple but high current. Only for small motors (typically below 7.5 kW) or where supply can handle surge.</p>
                </div>
                <div className="bg-[#1a1a1a] rounded-lg p-4">
                  <h5 className="font-semibold text-white mb-2">Star-Delta</h5>
                  <p className="text-white/70 text-sm">Starts in star (1/3 current, 1/3 torque), runs in delta. Common for larger motors. Torque dip at changeover.</p>
                </div>
                <div className="bg-[#1a1a1a] rounded-lg p-4">
                  <h5 className="font-semibold text-white mb-2">Auto-transformer</h5>
                  <p className="text-white/70 text-sm">Reduced voltage starting via tapped transformer. Good torque/current ratio. More expensive but smooth.</p>
                </div>
                <div className="bg-[#1a1a1a] rounded-lg p-4">
                  <h5 className="font-semibold text-white mb-2">Soft Starter / VFD</h5>
                  <p className="text-white/70 text-sm">Electronic control of voltage or frequency. Smoothest starting. VFD also provides speed control and energy saving.</p>
                </div>
              </div>

              <h4 className="text-lg font-semibold text-green-400 mb-3">AC Generators (Alternators)</h4>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
                <p className="text-white/80 mb-3">AC generators have a rotating field (rotor) and stationary armature (stator):</p>
                <ul className="text-white/80 space-y-2">
                  <li><strong>Frequency:</strong> f = (p x N) / 120, where N = speed in rpm</li>
                  <li><strong>Voltage:</strong> Controlled by field current (excitation)</li>
                  <li><strong>Synchronisation:</strong> Must match voltage, frequency, phase sequence and phase angle before connecting to grid</li>
                </ul>
              </div>

              <h4 className="text-lg font-semibold text-green-400 mb-3">DC Generators</h4>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
                <p className="text-white/80 mb-3">DC generators use a commutator to convert the AC generated in the armature to DC:</p>
                <ul className="text-white/80 space-y-2">
                  <li><strong>Separately excited:</strong> Field supplied from external DC source. Best regulation.</li>
                  <li><strong>Self-excited:</strong> Field powered from generator output. Shunt, series or compound types.</li>
                  <li><strong>Voltage:</strong> E = K x Phi x N (proportional to flux and speed)</li>
                </ul>
              </div>

              <h4 className="text-lg font-semibold text-green-400 mb-3">Synchronous Motors</h4>
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
                <p className="text-white/80 mb-3">Run at exactly synchronous speed with DC-excited rotor:</p>
                <ul className="text-white/80 space-y-2">
                  <li>Constant speed regardless of load (up to pull-out torque)</li>
                  <li>Can operate at leading power factor (for PFC)</li>
                  <li>Requires starting means (damper windings or VFD)</li>
                  <li>Used for large constant-speed drives and power factor correction</li>
                </ul>
              </div>

              <InlineCheck
                question="What is the main advantage of star-delta starting over DOL?"
                options={["Higher starting torque", "Starting current reduced to 1/3", "Simpler control circuit", "Better speed control"]}
                correctIndex={1}
                explanation="In star connection, line voltage across each winding is reduced to 1/sqrt(3), so current is 1/3 of DOL. However, torque is also reduced to 1/3 (torque proportional to voltage squared)."
              />
            </div>
          </div>

          {/* Practical Guidance */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4">Practical Guidance</h2>
            <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-yellow-400 mb-3">Motor Selection and Installation</h4>
              <ul className="text-white/80 space-y-2">
                <li><strong>Motor rating:</strong> Select for continuous duty with margin. Consider starting frequency, ambient temperature, altitude and duty cycle.</li>
                <li><strong>Protection:</strong> Overcurrent, thermal overload, single-phase protection for 3-phase motors. Consider earth fault and stall protection.</li>
                <li><strong>Cable sizing:</strong> Account for starting current (voltage drop) and running current (thermal). Use correction factors from BS 7671.</li>
                <li><strong>Earthing:</strong> Motor frame must be earthed. Use protective conductors sized per BS 7671 Table 54.7.</li>
                <li><strong>Maintenance:</strong> Regular checks of insulation resistance, bearing condition, ventilation and alignment. Vibration monitoring for critical motors.</li>
              </ul>
            </div>
          </div>

          {/* FAQs */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqItems.map((faq, index) => (
                <div key={index} className="bg-[#242424] rounded-lg p-4 border border-white/10">
                  <h4 className="font-semibold text-white mb-2">{faq.question}</h4>
                  <p className="text-white/70 text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Reference */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4">Quick Reference</h2>
            <div className="bg-[#242424] rounded-lg p-6 border border-white/10">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-green-400 mb-3">Essential Formulas</h4>
                  <ul className="text-white/70 text-sm space-y-2 font-mono">
                    <li>Ns = (120 x f) / p rpm</li>
                    <li>Slip s = (Ns - Nr) / Ns</li>
                    <li>Nr = Ns x (1 - s)</li>
                    <li>fr = s x f</li>
                    <li>F = B x I x L (motor)</li>
                    <li>e = B x L x v (generator)</li>
                    <li>V = Eb + Ia x Ra</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-green-400 mb-3">Key Values (50 Hz)</h4>
                  <ul className="text-white/70 text-sm space-y-2">
                    <li>2-pole: 3000 rpm sync</li>
                    <li>4-pole: 1500 rpm sync</li>
                    <li>6-pole: 1000 rpm sync</li>
                    <li>8-pole: 750 rpm sync</li>
                    <li>Typical slip: 2-5% (full load)</li>
                    <li>DOL current: 6-8 x FLC</li>
                    <li>Star-delta: 1/3 DOL current</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-4">Test Your Knowledge</h2>
          <p className="text-white/70 mb-4">Complete this quiz to check your understanding of motors and generators:</p>
          <Quiz questions={quizQuestions} moduleId="L3M3S3.5" />
        </div>

        {/* Quick Check Questions */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-4">Quick Check Questions</h2>
          <div className="space-y-4">
            {quickCheckQuestions.map((q, index) => (
              <InlineCheck
                key={index}
                question={q.question}
                options={q.options}
                correctIndex={q.correctIndex}
                explanation={q.explanation}
              />
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-white/10">
          <Button variant="outline" className="text-white border-white/30 hover:bg-white/10" asChild>
            <Link to="/study-centre/apprentice/level3-module3-section3-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Transformers
            </Link>
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 text-white" asChild>
            <Link to="/study-centre/apprentice/level3-module3-section4">
              Next: Section 4
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Level3Module3Section3_5;
