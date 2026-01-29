import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "DC Machines (Types, Control, Applications) - HNC Module 3 Section 5.6";
const DESCRIPTION = "Master DC motor and generator types, speed-torque characteristics, control methods, and building services applications including lifts, older HVAC systems, and battery-powered equipment.";

const quickCheckQuestions = [
  {
    id: "dc-series-motor",
    question: "What type of DC motor provides the highest starting torque?",
    options: ["Shunt motor", "Series motor", "Compound motor", "Separately excited motor"],
    correctIndex: 1,
    explanation: "Series DC motors provide the highest starting torque because armature current flows through both the armature and field windings, creating a strong magnetic field at startup when current is highest."
  },
  {
    id: "dc-speed-control",
    question: "Which method provides the widest range of speed control for DC motors?",
    options: ["Field weakening only", "Armature resistance control", "PWM armature voltage control", "Changing pole pairs"],
    correctIndex: 2,
    explanation: "PWM (Pulse Width Modulation) armature voltage control provides smooth, efficient speed control over the widest range, from zero to full speed, and is the basis of modern DC drives."
  },
  {
    id: "armature-reaction",
    question: "What is the main effect of armature reaction in DC machines?",
    options: ["Increased efficiency", "Distortion of the main field flux", "Improved commutation", "Reduced starting torque"],
    correctIndex: 1,
    explanation: "Armature reaction distorts the main field flux distribution, shifting the magnetic neutral axis. This causes sparking at the brushes if not compensated by interpoles or brush shift."
  },
  {
    id: "bldc-advantage",
    question: "What is the main advantage of brushless DC (BLDC) motors over conventional DC motors?",
    options: ["Higher starting torque", "Simpler control electronics", "No brush wear and lower maintenance", "Lower initial cost"],
    correctIndex: 2,
    explanation: "BLDC motors eliminate brushes and commutators, removing the main wear components. This significantly reduces maintenance requirements and extends motor life, making them ideal for applications requiring high reliability."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "In a DC series motor, how are the field and armature windings connected?",
    options: [
      "In parallel with each other",
      "In series with each other",
      "Field winding connected to a separate supply",
      "Through a transformer"
    ],
    correctAnswer: 1,
    explanation: "In a series motor, the field winding carries the full armature current, connected in series. This creates high torque at low speeds as the field strength increases with load current."
  },
  {
    id: 2,
    question: "Why must a DC series motor never be operated without a mechanical load?",
    options: [
      "It will not start",
      "The brushes will wear out",
      "It may overspeed and be damaged (runaway)",
      "The field will demagnetise"
    ],
    correctAnswer: 2,
    explanation: "Series motors can run away to dangerous speeds at no load because speed is inversely proportional to field flux, which decreases as current drops. Belt-driven loads must never be used as belt slip can cause runaway."
  },
  {
    id: 3,
    question: "What is the purpose of interpoles (commutating poles) in DC machines?",
    options: [
      "To increase motor efficiency",
      "To provide regenerative braking",
      "To improve commutation and reduce brush sparking",
      "To increase starting torque"
    ],
    correctAnswer: 2,
    explanation: "Interpoles are small poles between main poles that produce a flux opposing armature reaction. They improve commutation by ensuring the EMF in coils undergoing commutation is in the correct direction, reducing sparking."
  },
  {
    id: 4,
    question: "A DC shunt motor runs at 1500 rpm at full load. If the field current is reduced by 20%, the approximate new speed will be:",
    options: [
      "1200 rpm",
      "1500 rpm",
      "1875 rpm",
      "1800 rpm"
    ],
    correctAnswer: 2,
    explanation: "In a shunt motor, speed is inversely proportional to field flux. If field is reduced to 80% (0.8), speed increases by factor of 1/0.8 = 1.25. New speed = 1500 x 1.25 = 1875 rpm (field weakening)."
  },
  {
    id: 5,
    question: "What type of DC generator excitation uses a portion of the output to energise the field?",
    options: [
      "Separately excited",
      "Permanent magnet",
      "Self-excited (shunt/series/compound)",
      "Synchronous"
    ],
    correctAnswer: 2,
    explanation: "Self-excited generators (shunt, series, or compound wound) use part of the generated output to supply their own field windings, whereas separately excited generators require an external DC supply for the field."
  },
  {
    id: 6,
    question: "During regenerative braking of a DC motor, the machine operates as a:",
    options: [
      "Motor absorbing power",
      "Generator returning power to the supply",
      "Transformer",
      "Resistive load"
    ],
    correctAnswer: 1,
    explanation: "During regenerative braking, the motor's inertia keeps it spinning faster than the equivalent supply-driven speed, so it generates EMF greater than the supply voltage and feeds current back to the supply as a generator."
  },
  {
    id: 7,
    question: "Which DC motor type is most commonly used in modern lift/elevator applications?",
    options: [
      "Series wound DC motor",
      "Shunt wound DC motor",
      "Gearless permanent magnet synchronous motor (PMSM)",
      "Compound DC motor"
    ],
    correctAnswer: 2,
    explanation: "Modern lifts predominantly use gearless permanent magnet synchronous motors (PMSM) with variable frequency drives. Traditional DC motors were common historically but are now mainly found in older installations."
  },
  {
    id: 8,
    question: "What is the back-EMF in a DC motor?",
    options: [
      "The voltage drop across brush resistance",
      "The voltage induced in the armature opposing the supply voltage",
      "The voltage across the field winding",
      "The starting voltage required"
    ],
    correctAnswer: 1,
    explanation: "Back-EMF (counter-EMF) is the voltage generated in the rotating armature that opposes the applied voltage. It limits armature current and is proportional to speed: E = V - IaRa. At startup, back-EMF is zero so starting current is very high."
  },
  {
    id: 9,
    question: "In a BLDC motor, what provides the commutation function that brushes perform in conventional DC motors?",
    options: [
      "A mechanical commutator",
      "Electronic switching via Hall sensors or sensorless control",
      "Slip rings",
      "A gearbox"
    ],
    correctAnswer: 1,
    explanation: "BLDC motors use electronic commutation where transistors switch stator windings based on rotor position feedback from Hall effect sensors or back-EMF detection (sensorless), eliminating mechanical brushes."
  },
  {
    id: 10,
    question: "A compound DC motor combines which characteristics?",
    options: [
      "AC and DC operation",
      "High starting torque of series and good speed regulation of shunt",
      "Synchronous and induction motor features",
      "Single-phase and three-phase operation"
    ],
    correctAnswer: 1,
    explanation: "Compound motors have both series and shunt field windings, combining high starting torque (series characteristic) with reasonable speed regulation under varying load (shunt characteristic). Used in cranes, hoists, and presses."
  }
];

const faqs = [
  {
    question: "Why are DC motors still used when AC motors are more common?",
    answer: "DC motors offer inherently simple speed control (varying armature voltage), high starting torque (series types), and precise speed regulation. They remain in use for lifts, cranes, traction (older trains), battery-powered vehicles, and applications requiring fine speed control. However, modern variable frequency drives have made AC motors competitive in most applications."
  },
  {
    question: "What causes brush wear and how is it minimised?",
    answer: "Brush wear results from mechanical friction against the commutator and electrical erosion from sparking during commutation. Wear is minimised by: proper brush grade selection (carbon/graphite composition), correct spring tension, good commutation (interpoles), proper brush alignment, and keeping the commutator clean and concentric."
  },
  {
    question: "How does a four-quadrant DC drive work?",
    answer: "A four-quadrant drive can operate in all four combinations of rotation direction and torque direction: forward motoring, forward braking (regenerative), reverse motoring, and reverse braking. This is achieved using a fully controlled thyristor or IGBT converter that can reverse both voltage polarity and current direction."
  },
  {
    question: "What is the difference between dynamic and regenerative braking?",
    answer: "Dynamic braking dissipates kinetic energy as heat in resistors connected across the armature when the motor acts as a generator. Regenerative braking returns this energy to the supply, which is more efficient but requires a supply that can accept power (or a battery in DC systems). Lifts commonly use regenerative braking when descending with heavy loads."
  },
  {
    question: "Why do BLDC motors require electronic controllers?",
    answer: "BLDC motors have permanent magnet rotors and wound stators (opposite to brushed DC). Without brushes and a commutator to mechanically switch current to the appropriate windings, an electronic controller must sense rotor position and sequentially energise the stator phases to maintain rotation - a process called electronic commutation."
  },
  {
    question: "What building services applications still use DC motors?",
    answer: "DC motors are found in: older lift installations (Ward-Leonard systems), some legacy HVAC damper actuators, battery-powered emergency systems, UPS-powered critical equipment, golf carts and industrial trucks, and older cranes/hoists. New installations typically use AC motors with VFDs or BLDC motors."
  }
];

const HNCModule3Section5_6 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 3.5.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            DC Machines (Types, Control, Applications)
          </h1>
          <p className="text-white/80">
            Understanding DC motor and generator principles, control methods, and their role in building services
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Series motors:</strong> High starting torque, speed varies with load</li>
              <li className="pl-1"><strong>Shunt motors:</strong> Constant speed, good regulation</li>
              <li className="pl-1"><strong>Compound motors:</strong> Combine series and shunt characteristics</li>
              <li className="pl-1"><strong>BLDC:</strong> Electronic commutation, maintenance-free</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Lifts:</strong> Historically DC, now PMSM with VFD</li>
              <li className="pl-1"><strong>Legacy HVAC:</strong> Older damper actuators and fans</li>
              <li className="pl-1"><strong>Battery systems:</strong> UPS, emergency equipment</li>
              <li className="pl-1"><strong>BLDC fans:</strong> EC motors in modern ventilation</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the construction and operation of DC motors and generators",
              "Compare series, shunt, and compound motor characteristics",
              "Analyse speed-torque curves for different DC motor types",
              "Describe armature reaction and commutation principles",
              "Apply speed control methods including PWM drives",
              "Explain BLDC motor operation and advantages",
              "Understand regenerative braking principles",
              "Identify DC machine applications in building services"
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

        {/* Section 1: DC Motor Construction and Operation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            DC Motor Construction and Operation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              DC machines are rotating electrical machines that can operate as either motors (converting electrical
              energy to mechanical) or generators (converting mechanical energy to electrical). Their construction
              comprises stationary field poles and a rotating armature with a commutator.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Components</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Stator (field system):</strong> Provides the main magnetic field via electromagnets or permanent magnets</li>
                <li className="pl-1"><strong>Rotor (armature):</strong> Carries the armature windings that produce torque when carrying current</li>
                <li className="pl-1"><strong>Commutator:</strong> Segmented copper cylinder that reverses current direction in armature coils</li>
                <li className="pl-1"><strong>Brushes:</strong> Carbon blocks that conduct current to/from the rotating commutator</li>
                <li className="pl-1"><strong>Interpoles:</strong> Small poles between main poles to improve commutation</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fundamental Motor Equations</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-mono text-center mb-1">E = V - I<sub>a</sub>R<sub>a</sub></p>
                  <p className="text-xs text-white/70 text-center">Back-EMF relationship</p>
                </div>
                <div>
                  <p className="font-mono text-center mb-1">E = k<sub>e</sub> x phi x n</p>
                  <p className="text-xs text-white/70 text-center">EMF proportional to flux and speed</p>
                </div>
                <div>
                  <p className="font-mono text-center mb-1">T = k<sub>t</sub> x phi x I<sub>a</sub></p>
                  <p className="text-xs text-white/70 text-center">Torque proportional to flux and current</p>
                </div>
                <div>
                  <p className="font-mono text-center mb-1">n = (V - I<sub>a</sub>R<sub>a</sub>) / (k<sub>e</sub> x phi)</p>
                  <p className="text-xs text-white/70 text-center">Speed equation</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> At startup, back-EMF is zero so armature current is limited only by winding resistance.
              Starters or electronic control are essential to limit inrush current.
            </p>
          </div>
        </section>

        {/* Section 2: DC Motor Types */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            DC Motor Types - Series, Shunt, and Compound
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              DC motors are classified by how the field winding is connected relative to the armature.
              This configuration determines the motor's speed-torque characteristics and suitability for different applications.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">DC Motor Types Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Connection</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Characteristics</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Applications</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Series</td>
                      <td className="border border-white/10 px-3 py-2">Field in series with armature</td>
                      <td className="border border-white/10 px-3 py-2">Very high starting torque, speed varies inversely with load, can runaway at no load</td>
                      <td className="border border-white/10 px-3 py-2">Traction, cranes, hoists, starter motors</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Shunt</td>
                      <td className="border border-white/10 px-3 py-2">Field in parallel with armature</td>
                      <td className="border border-white/10 px-3 py-2">Nearly constant speed, good regulation, moderate starting torque</td>
                      <td className="border border-white/10 px-3 py-2">Machine tools, pumps, fans, conveyors</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Compound (cumulative)</td>
                      <td className="border border-white/10 px-3 py-2">Both series and shunt fields</td>
                      <td className="border border-white/10 px-3 py-2">High starting torque with better speed regulation than series</td>
                      <td className="border border-white/10 px-3 py-2">Lifts, presses, rolling mills</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Separately excited</td>
                      <td className="border border-white/10 px-3 py-2">Field from separate DC supply</td>
                      <td className="border border-white/10 px-3 py-2">Excellent speed control, linear characteristics</td>
                      <td className="border border-white/10 px-3 py-2">Precision drives, Ward-Leonard systems</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Permanent magnet</td>
                      <td className="border border-white/10 px-3 py-2">PM field (no field winding)</td>
                      <td className="border border-white/10 px-3 py-2">Similar to shunt, compact, efficient at small sizes</td>
                      <td className="border border-white/10 px-3 py-2">Small fans, automotive, battery tools</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-1">Series Motor Safety Warning</p>
              <p className="text-sm text-white/90">
                Never operate a series motor without mechanical load directly coupled. If load is removed
                (e.g., belt breaks), the motor will accelerate to destructive speeds. Series motors must
                have direct coupling, not belt drives, and load-sensing protection.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 3: Speed-Torque Characteristics */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Speed-Torque Characteristics
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The speed-torque curve defines how a motor's speed changes with mechanical load. Understanding
              these characteristics is essential for matching motors to applications.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Characteristic Curves</p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-white/5">
                  <p className="font-medium text-elec-yellow mb-2">Series Motor</p>
                  <ul className="text-xs text-white/90 space-y-1 list-disc list-outside ml-4">
                    <li>Hyperbolic speed-torque curve</li>
                    <li>Speed drops significantly with load</li>
                    <li>Very high torque at low speed</li>
                    <li>Torque proportional to I<sup>2</sup></li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <p className="font-medium text-elec-yellow mb-2">Shunt Motor</p>
                  <ul className="text-xs text-white/90 space-y-1 list-disc list-outside ml-4">
                    <li>Nearly flat speed-torque curve</li>
                    <li>Speed drops 5-10% from no load to full load</li>
                    <li>Constant field flux</li>
                    <li>Torque proportional to I<sub>a</sub></li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <p className="font-medium text-elec-yellow mb-2">Compound Motor</p>
                  <ul className="text-xs text-white/90 space-y-1 list-disc list-outside ml-4">
                    <li>Curve between series and shunt</li>
                    <li>Good starting torque</li>
                    <li>Better speed regulation than series</li>
                    <li>No runaway risk at no load</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Speed Regulation</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Speed regulation = (N<sub>no-load</sub> - N<sub>full-load</sub>) / N<sub>full-load</sub> x 100%</p>
                <p className="mt-2 text-white/60">Typical values:</p>
                <p>Series motor: 20-50% (poor)</p>
                <p>Shunt motor: 5-10% (good)</p>
                <p>Compound motor: 10-25% (moderate)</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Application matching:</strong> Lifts require high starting torque (compound/series) while
              machine tools need constant speed (shunt). Modern drives can modify characteristics electronically.
            </p>
          </div>
        </section>

        {/* Section 4: Armature Reaction and Commutation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Armature Reaction and Commutation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Armature reaction is the effect of the magnetic field produced by armature current on the main
              field flux. Understanding this phenomenon is critical for proper machine operation and maintenance.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Armature Reaction Effects</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Field distortion:</strong> Main flux is distorted, strengthened at one pole tip and weakened at the other</li>
                <li className="pl-1"><strong>MNA shift:</strong> Magnetic neutral axis shifts in the direction of rotation (motor) or opposite (generator)</li>
                <li className="pl-1"><strong>Reduced flux:</strong> Cross-magnetising effect can reduce effective main flux (flux weakening)</li>
                <li className="pl-1"><strong>Commutation problems:</strong> If brushes remain on geometric neutral, sparking occurs</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="font-medium text-elec-yellow mb-2">Commutation Process</p>
                <p className="text-sm text-white/90 mb-2">
                  As each armature coil passes under the brushes, current must reverse. Good commutation
                  requires this reversal to be complete before the coil leaves the brush contact.
                </p>
                <ul className="text-xs text-white/80 space-y-1 list-disc list-outside ml-4">
                  <li>Under-commutation: current reversal incomplete, trailing sparks</li>
                  <li>Over-commutation: current reverses too fast, leading sparks</li>
                  <li>Ideal: sparkless, linear current reversal</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="font-medium text-elec-yellow mb-2">Improving Commutation</p>
                <ul className="text-xs text-white/90 space-y-1 list-disc list-outside ml-4">
                  <li><strong>Interpoles (commutating poles):</strong> Small poles between main poles produce flux that opposes armature MMF in the commutation zone</li>
                  <li><strong>Compensating windings:</strong> Windings in main pole faces cancel armature reaction</li>
                  <li><strong>Brush shift:</strong> Older method - move brushes to new neutral axis (varies with load)</li>
                  <li><strong>High-resistance brushes:</strong> Reduce circulating current in commutating coils</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance note:</strong> Brush sparking indicates commutation problems. Check brush pressure,
              commutator condition, interpole gaps, and ensure brushes are on the correct neutral axis.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 5: Speed Control Methods */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Speed Control Methods
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              DC motors offer excellent speed control capabilities. The fundamental speed equation
              n = (V - I<sub>a</sub>R<sub>a</sub>) / (k x phi) shows three methods: armature voltage,
              armature resistance, and field flux control.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Speed Control Methods Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Principle</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Speed Range</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Efficiency</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Armature voltage (PWM)</td>
                      <td className="border border-white/10 px-3 py-2">Vary V<sub>a</sub> from 0 to rated</td>
                      <td className="border border-white/10 px-3 py-2">0 to base speed</td>
                      <td className="border border-white/10 px-3 py-2">High (90%+)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Field weakening</td>
                      <td className="border border-white/10 px-3 py-2">Reduce field current (increase If rheostat)</td>
                      <td className="border border-white/10 px-3 py-2">Base speed to 2-3x base</td>
                      <td className="border border-white/10 px-3 py-2">High</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Armature resistance</td>
                      <td className="border border-white/10 px-3 py-2">Add resistance in armature circuit</td>
                      <td className="border border-white/10 px-3 py-2">0 to base speed</td>
                      <td className="border border-white/10 px-3 py-2">Low (I<sup>2</sup>R losses)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Ward-Leonard</td>
                      <td className="border border-white/10 px-3 py-2">Motor-generator set with field control</td>
                      <td className="border border-white/10 px-3 py-2">Full range, reversible</td>
                      <td className="border border-white/10 px-3 py-2">Moderate (3 machines)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Modern DC Drives (PWM Converters)</p>
              <p className="text-sm text-white/90 mb-3">
                Modern DC drives use thyristor or IGBT converters to provide smooth, efficient speed control.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-white mb-1">Single-quadrant drive</p>
                  <ul className="text-xs text-white/80 space-y-0.5 list-disc list-outside ml-4">
                    <li>Forward motoring only</li>
                    <li>Simple half-controlled converter</li>
                    <li>Fans, pumps, conveyors</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-1">Four-quadrant drive</p>
                  <ul className="text-xs text-white/80 space-y-0.5 list-disc list-outside ml-4">
                    <li>Both directions, motoring and braking</li>
                    <li>Fully controlled dual converter</li>
                    <li>Lifts, cranes, winders</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Base speed concept:</strong> Armature voltage control gives constant torque below base speed.
              Field weakening above base speed gives constant power (torque reduces as speed increases).
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 6: DC Generators and Excitation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            DC Generators and Excitation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              DC generators produce direct current from mechanical input. While largely superseded by AC generation
              with rectification, understanding DC generator principles is essential for maintenance of existing
              systems and for understanding motor operation in regenerative mode.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">DC Generator Excitation Types</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Field Supply</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Voltage Characteristic</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Separately excited</td>
                      <td className="border border-white/10 px-3 py-2">External DC source</td>
                      <td className="border border-white/10 px-3 py-2">Drops slightly with load</td>
                      <td className="border border-white/10 px-3 py-2">Ward-Leonard systems</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Self-excited shunt</td>
                      <td className="border border-white/10 px-3 py-2">From own output (parallel)</td>
                      <td className="border border-white/10 px-3 py-2">Relatively constant</td>
                      <td className="border border-white/10 px-3 py-2">General purpose DC supply</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Self-excited series</td>
                      <td className="border border-white/10 px-3 py-2">From own output (series)</td>
                      <td className="border border-white/10 px-3 py-2">Rises with load</td>
                      <td className="border border-white/10 px-3 py-2">Arc welding, boosters</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Compound (level)</td>
                      <td className="border border-white/10 px-3 py-2">Both series and shunt</td>
                      <td className="border border-white/10 px-3 py-2">Flat (series compensates drop)</td>
                      <td className="border border-white/10 px-3 py-2">Automotive (historically)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Build-up of Self-Excited Generators</p>
              <p className="text-sm text-white/90 mb-2">
                Self-excited generators rely on residual magnetism in the poles to begin voltage generation.
                Conditions for successful build-up:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Residual magnetism:</strong> Must exist in poles (if lost, flash field from external DC)</li>
                <li className="pl-1"><strong>Correct field polarity:</strong> Field current must strengthen residual flux, not oppose it</li>
                <li className="pl-1"><strong>Field resistance:</strong> Must be below critical value where OCC and field line intersect</li>
                <li className="pl-1"><strong>Sufficient speed:</strong> Prime mover must drive above minimum required speed</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance tip:</strong> If a self-excited generator fails to build up voltage, check for loss of
              residual magnetism. A brief application of DC to the field (flashing) can restore it.
            </p>
          </div>
        </section>

        {/* Section 7: Brushless DC Motors (BLDC) */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Brushless DC Motors (BLDC)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BLDC motors are essentially "inside-out" DC motors with permanent magnets on the rotor and
              windings on the stator. Electronic commutation replaces mechanical brushes and commutator,
              offering significant advantages in reliability and efficiency.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">BLDC Construction</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Rotor:</strong> Permanent magnets (NdFeB or ferrite)</li>
                  <li className="pl-1"><strong>Stator:</strong> Three-phase windings (typically)</li>
                  <li className="pl-1"><strong>Position sensing:</strong> Hall effect sensors or back-EMF</li>
                  <li className="pl-1"><strong>Controller:</strong> Inverter switches stator phases</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Advantages over Brushed DC</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">No brush wear - minimal maintenance</li>
                  <li className="pl-1">No commutator arcing - longer life</li>
                  <li className="pl-1">Better heat dissipation (heat in stator)</li>
                  <li className="pl-1">Higher power density and efficiency</li>
                  <li className="pl-1">Suitable for cleanroom/hazardous areas</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Electronic Commutation</p>
              <p className="text-sm text-white/90 mb-3">
                The controller must know rotor position to energise the correct stator phases. Two methods:
              </p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-white mb-1">Sensored (Hall sensors)</p>
                  <ul className="text-xs text-white/80 space-y-0.5 list-disc list-outside ml-4">
                    <li>Three Hall sensors 120 degrees apart</li>
                    <li>Provide position signal at all speeds</li>
                    <li>Works from zero speed</li>
                    <li>Higher cost, sensor can fail</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-1">Sensorless (back-EMF)</p>
                  <ul className="text-xs text-white/80 space-y-0.5 list-disc list-outside ml-4">
                    <li>Detects back-EMF zero crossings</li>
                    <li>No position sensors needed</li>
                    <li>Cannot work at zero/low speed</li>
                    <li>Lower cost, more reliable</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BLDC in Building Services</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>EC fans:</strong> Electronically commutated fans for HVAC - high efficiency, variable speed</li>
                <li className="pl-1"><strong>Pumps:</strong> Circulator pumps with integrated BLDC motors</li>
                <li className="pl-1"><strong>Refrigeration:</strong> Compressor motors in inverter-driven systems</li>
                <li className="pl-1"><strong>Automation:</strong> Actuators and positioning systems</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 8: Regenerative Braking */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
            Regenerative Braking
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Regenerative braking recovers kinetic energy by operating the motor as a generator, returning
              electrical energy to the supply or storing it in batteries. This is a key energy-saving feature
              in lifts, cranes, and electric vehicles.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Types of Electric Braking</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Principle</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Energy</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Regenerative</td>
                      <td className="border border-white/10 px-3 py-2">Back-EMF exceeds supply, motor becomes generator</td>
                      <td className="border border-white/10 px-3 py-2">Returned to supply/battery</td>
                      <td className="border border-white/10 px-3 py-2">Lifts, EVs, trains</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Dynamic (rheostatic)</td>
                      <td className="border border-white/10 px-3 py-2">Armature connected to resistors, motor generates</td>
                      <td className="border border-white/10 px-3 py-2">Dissipated as heat</td>
                      <td className="border border-white/10 px-3 py-2">Cranes, older lifts</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Plugging (counter-current)</td>
                      <td className="border border-white/10 px-3 py-2">Supply polarity reversed while running</td>
                      <td className="border border-white/10 px-3 py-2">High dissipation in motor</td>
                      <td className="border border-white/10 px-3 py-2">Emergency stops (rare)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Regeneration in Lifts</p>
              <p className="text-sm text-white/90 mb-2">
                Lift systems regenerate energy in two scenarios:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Descending with heavy load:</strong> Gravitational potential energy converted to electrical</li>
                <li className="pl-1"><strong>Ascending with light load:</strong> Counterweight descends, providing regeneration</li>
              </ul>
              <p className="text-sm text-white/70 mt-2">
                Energy can be fed back to the building supply, stored in batteries/supercapacitors, or dissipated
                in braking resistors if regeneration is not possible.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Four-Quadrant Operation</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Quadrant 1: Forward motoring (positive speed, positive torque)</p>
                <p>Quadrant 2: Forward braking/regenerating (positive speed, negative torque)</p>
                <p>Quadrant 3: Reverse motoring (negative speed, negative torque)</p>
                <p>Quadrant 4: Reverse braking/regenerating (negative speed, positive torque)</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Energy savings:</strong> Modern regenerative lift drives can recover 20-40% of motor energy,
              significantly reducing building energy consumption compared to non-regenerative systems.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Section 9: Building Services Applications */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Building Services Applications</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Lifts and Hoists</h3>
              <p className="text-sm text-white mb-2">
                <strong>Historical:</strong> DC motors dominated lift applications for decades due to excellent
                speed control capabilities. Ward-Leonard systems (motor-generator sets) provided smooth,
                variable-speed operation essential for passenger comfort.
              </p>
              <ul className="text-sm text-white/90 space-y-1 list-disc list-outside ml-5">
                <li>Compound DC motors provided high starting torque for acceleration</li>
                <li>Four-quadrant drives enabled regenerative braking</li>
                <li>Ward-Leonard systems now largely replaced by VFD-driven AC motors</li>
                <li>Gearless PMSM motors are the modern standard for high-rise lifts</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Older HVAC Systems</h3>
              <p className="text-sm text-white mb-2">
                <strong>Legacy installations:</strong> Some older buildings retain DC motor-driven HVAC equipment
                requiring maintenance knowledge.
              </p>
              <ul className="text-sm text-white/90 space-y-1 list-disc list-outside ml-5">
                <li>Large DC motors on older centrifugal chillers</li>
                <li>Variable-speed fans and pumps (pre-VFD era)</li>
                <li>Damper actuators in pneumatic/electric hybrid systems</li>
                <li>Modern replacement: VFD-driven induction motors or EC fans</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Battery-Powered Equipment</h3>
              <p className="text-sm text-white mb-2">
                <strong>DC supply natural fit:</strong> Battery systems provide DC, making DC motors or BLDC
                motors ideal for battery-powered applications.
              </p>
              <ul className="text-sm text-white/90 space-y-1 list-disc list-outside ml-5">
                <li>UPS-powered critical equipment (data centres, hospitals)</li>
                <li>Emergency lighting and fire alarm systems</li>
                <li>Battery-powered tools and equipment</li>
                <li>Electric vehicles and golf carts</li>
                <li>Forklift trucks and warehouse equipment</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Modern EC/BLDC Applications</h3>
              <p className="text-sm text-white mb-2">
                <strong>Current trend:</strong> BLDC motors (often marketed as EC motors) are increasingly
                specified for their efficiency and controllability.
              </p>
              <ul className="text-sm text-white/90 space-y-1 list-disc list-outside ml-5">
                <li>EC plug fans for AHUs - up to 90% efficiency</li>
                <li>High-efficiency circulator pumps</li>
                <li>Variable refrigerant flow (VRF) compressors</li>
                <li>Fan coil unit motors</li>
                <li>Domestic appliances (washing machines, fridges)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: DC Motor Starting Current</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 230V DC shunt motor has an armature resistance of 0.5 ohm and draws
                20A at full load when running at 1200 rpm. Calculate (a) the back-EMF at full load, and
                (b) the starting current if connected directly to supply.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>(a) Back-EMF at full load:</p>
                <p>E = V - I<sub>a</sub>R<sub>a</sub></p>
                <p>E = 230 - (20 x 0.5) = 230 - 10 = <strong>220V</strong></p>
                <p className="mt-2">(b) Starting current (back-EMF = 0 at standstill):</p>
                <p>I<sub>start</sub> = V / R<sub>a</sub></p>
                <p>I<sub>start</sub> = 230 / 0.5 = <strong>460A</strong></p>
                <p className="mt-2 text-white/60">This is 23x full-load current - a starter is essential!</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Speed Control by Field Weakening</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A DC shunt motor runs at 1000 rpm with full field current.
                If the field current is reduced to 80% of its original value, calculate the new speed
                (assuming constant armature current and negligible armature resistance drop).
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Speed is inversely proportional to field flux:</p>
                <p>n<sub>2</sub> / n<sub>1</sub> = phi<sub>1</sub> / phi<sub>2</sub></p>
                <p className="mt-2">If phi<sub>2</sub> = 0.8 x phi<sub>1</sub>:</p>
                <p>n<sub>2</sub> = n<sub>1</sub> x (phi<sub>1</sub> / phi<sub>2</sub>)</p>
                <p>n<sub>2</sub> = 1000 x (1 / 0.8)</p>
                <p>n<sub>2</sub> = <strong>1250 rpm</strong></p>
                <p className="mt-2 text-white/60">Field weakening increases speed above base value</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Regenerative Braking Power</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A lift DC motor rated at 15kW is descending with a heavy load,
                regenerating at 80% of rated power. If the DC bus voltage is 600V and losses are 5%,
                calculate the power returned to the supply.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Regenerated mechanical power:</p>
                <p>P<sub>regen</sub> = 0.8 x 15kW = 12kW</p>
                <p className="mt-2">Power returned (after 5% losses):</p>
                <p>P<sub>return</sub> = 12kW x 0.95 = <strong>11.4kW</strong></p>
                <p className="mt-2">Current fed back to supply:</p>
                <p>I = P / V = 11400 / 600 = <strong>19A</strong></p>
                <p className="mt-2 text-white/60">This current flows back into the supply or to other loads</p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">DC Motor Maintenance Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Brushes:</strong> Check wear, spring tension, freedom of movement in holders</li>
                <li className="pl-1"><strong>Commutator:</strong> Inspect for scoring, burning, out-of-round, high mica</li>
                <li className="pl-1"><strong>Interpoles:</strong> Check air gaps are equal and within specification</li>
                <li className="pl-1"><strong>Bearings:</strong> Listen for noise, check temperature, lubrication</li>
                <li className="pl-1"><strong>Windings:</strong> Measure insulation resistance, check for overheating signs</li>
                <li className="pl-1"><strong>Connections:</strong> Tighten all terminals, check for corrosion</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Formulas</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Back-EMF:</strong> E = V - I<sub>a</sub>R<sub>a</sub></li>
                <li className="pl-1"><strong>Torque:</strong> T = k<sub>t</sub> x phi x I<sub>a</sub></li>
                <li className="pl-1"><strong>Speed:</strong> n = (V - I<sub>a</sub>R<sub>a</sub>) / (k x phi)</li>
                <li className="pl-1"><strong>Power:</strong> P = E x I<sub>a</sub> = T x omega</li>
                <li className="pl-1"><strong>Speed regulation:</strong> (N<sub>nl</sub> - N<sub>fl</sub>) / N<sub>fl</sub> x 100%</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Faults and Causes</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Excessive brush sparking:</strong> Wrong brush grade, incorrect brush position, worn commutator, open armature coil</li>
                <li className="pl-1"><strong>Motor fails to start:</strong> Open circuit in armature or field, seized bearings, mechanical jam</li>
                <li className="pl-1"><strong>Motor runs slowly:</strong> Low supply voltage, high armature resistance, weak field</li>
                <li className="pl-1"><strong>Motor overspeeds:</strong> Open shunt field, series motor at no load</li>
                <li className="pl-1"><strong>Overheating:</strong> Overload, poor ventilation, high ambient, short-circuit turns</li>
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

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">DC Motor Types</p>
                <ul className="space-y-0.5">
                  <li>Series: High torque, variable speed, no-load runaway</li>
                  <li>Shunt: Constant speed, moderate torque</li>
                  <li>Compound: Combines both characteristics</li>
                  <li>PM/BLDC: Efficient, maintenance-free</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Speed Control</p>
                <ul className="space-y-0.5">
                  <li>Armature voltage: 0 to base speed</li>
                  <li>Field weakening: Base to 2-3x base</li>
                  <li>PWM drives: Efficient, smooth control</li>
                  <li>Four-quadrant: Full motoring/braking</li>
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
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section5-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Synchronous Machines
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section5-7">
              Next: Single-Phase Motors
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule3Section5_6;
