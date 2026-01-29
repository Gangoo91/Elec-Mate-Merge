import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Synchronous Machines - Principles and Uses - HNC Module 3 Section 5.5";
const DESCRIPTION = "Master synchronous machine principles for building services: synchronous speed calculations, excitation control, power factor correction, permanent magnet motors, and standby generator applications.";

const quickCheckQuestions = [
  {
    id: "sync-speed",
    question: "What is the synchronous speed of a 4-pole machine on a 50Hz supply?",
    options: ["1000 rev/min", "1500 rev/min", "3000 rev/min", "750 rev/min"],
    correctIndex: 1,
    explanation: "Using ns = 120f/p: ns = (120 x 50) / 4 = 1500 rev/min. The rotor runs at exactly this speed with no slip."
  },
  {
    id: "overexcitation",
    question: "What happens when a synchronous motor is over-excited?",
    options: ["It draws lagging current", "It draws leading current", "It runs faster", "It stalls"],
    correctIndex: 1,
    explanation: "Over-excitation causes the motor to draw leading current, making it appear capacitive. This is how synchronous condensers correct lagging power factor."
  },
  {
    id: "damper-windings",
    question: "What is the primary purpose of damper windings in a synchronous machine?",
    options: ["To increase efficiency", "To damp hunting oscillations", "To reduce starting current", "To improve power factor"],
    correctIndex: 1,
    explanation: "Damper windings (amortisseur windings) damp out hunting oscillations and provide starting torque. They only carry current during transient conditions."
  },
  {
    id: "pmsm-advantage",
    question: "What is a key advantage of permanent magnet synchronous motors (PMSMs)?",
    options: ["Lower cost", "No rotor losses (higher efficiency)", "Simpler construction", "Higher starting torque"],
    correctIndex: 1,
    explanation: "PMSMs have no rotor copper losses since there are no field windings. This results in higher efficiency, particularly important for variable speed drives."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the synchronous speed formula for an AC machine?",
    options: [
      "ns = 60f/p",
      "ns = 120f/p",
      "ns = f/p",
      "ns = 120p/f"
    ],
    correctAnswer: 1,
    explanation: "The synchronous speed formula is ns = 120f/p, where f is frequency (Hz), p is number of poles, and ns is in rev/min. The factor 120 converts from Hz to rev/min (60 seconds x 2 because speed relates to pole pairs)."
  },
  {
    id: 2,
    question: "A 6-pole synchronous generator operates at 50Hz. What is its speed?",
    options: ["500 rev/min", "750 rev/min", "1000 rev/min", "1500 rev/min"],
    correctAnswer: 2,
    explanation: "Using ns = 120f/p = (120 x 50) / 6 = 1000 rev/min. The generator must be driven at exactly this speed to produce 50Hz output."
  },
  {
    id: 3,
    question: "How does a synchronous motor differ from an induction motor at steady state?",
    options: [
      "It runs at higher than synchronous speed",
      "It runs at exactly synchronous speed with zero slip",
      "It requires less maintenance",
      "It has higher starting torque"
    ],
    correctAnswer: 1,
    explanation: "A synchronous motor runs at exactly synchronous speed with zero slip because the rotor is locked to the rotating magnetic field. Induction motors always have some slip to induce rotor current."
  },
  {
    id: 4,
    question: "What is a synchronous condenser used for?",
    options: [
      "Converting AC to DC",
      "Frequency conversion",
      "Power factor correction",
      "Voltage transformation"
    ],
    correctAnswer: 2,
    explanation: "A synchronous condenser is an unloaded synchronous motor used solely for power factor correction. When over-excited, it draws leading current to correct lagging power factor from inductive loads."
  },
  {
    id: 5,
    question: "Why can't a synchronous motor self-start?",
    options: [
      "It has no rotor windings",
      "The rotating field reverses too quickly for the heavy rotor to follow",
      "It requires DC excitation first",
      "The air gap is too large"
    ],
    correctAnswer: 1,
    explanation: "The rotating magnetic field reverses direction 100 times per second (at 50Hz). The rotor's inertia prevents it from accelerating fast enough to lock on to the field, so auxiliary starting methods are needed."
  },
  {
    id: 6,
    question: "What determines the power factor of a synchronous motor?",
    options: [
      "Supply voltage",
      "Mechanical load",
      "Field excitation current",
      "Number of poles"
    ],
    correctAnswer: 2,
    explanation: "The field excitation current determines power factor. Under-excitation causes lagging pf, normal excitation gives unity pf, and over-excitation gives leading pf. This is shown by the V-curves."
  },
  {
    id: 7,
    question: "What is 'hunting' in a synchronous machine?",
    options: [
      "Speed variation due to load changes",
      "Oscillation of rotor about its equilibrium position",
      "Variation in excitation current",
      "Searching for synchronous speed"
    ],
    correctAnswer: 1,
    explanation: "Hunting is the oscillation of the rotor about its equilibrium position, caused by sudden load changes or supply variations. Damper windings are fitted to suppress these oscillations."
  },
  {
    id: 8,
    question: "In a synchronous generator (alternator), what determines the output frequency?",
    options: [
      "Load current",
      "Excitation voltage",
      "Rotational speed and number of poles",
      "Power factor"
    ],
    correctAnswer: 2,
    explanation: "Output frequency f = (p x n) / 120, where p is poles and n is speed in rev/min. For 50Hz output with 4 poles, the prime mover must maintain exactly 1500 rev/min."
  },
  {
    id: 9,
    question: "What type of motor is commonly used in modern variable speed HVAC drives?",
    options: [
      "Wound rotor induction motor",
      "Synchronous reluctance motor",
      "Permanent magnet synchronous motor (PMSM)",
      "Single-phase induction motor"
    ],
    correctAnswer: 2,
    explanation: "PMSMs are widely used in modern VSD applications due to their high efficiency, compact size, and excellent controllability. They're common in chillers, AHU fans, and pump drives."
  },
  {
    id: 10,
    question: "For a standby generator in a building, what must be controlled when paralleling with the grid?",
    options: [
      "Only voltage",
      "Only frequency",
      "Voltage, frequency, phase sequence, and phase angle",
      "Only power factor"
    ],
    correctAnswer: 2,
    explanation: "Paralleling requires matching voltage magnitude, frequency, phase sequence (for three-phase), and phase angle. Automatic synchronising relays monitor all parameters before closing the paralleling breaker."
  }
];

const faqs = [
  {
    question: "Why are synchronous motors not self-starting?",
    answer: "The stator's rotating magnetic field rotates at synchronous speed immediately upon energisation. At 50Hz, this field reverses direction 100 times per second. The rotor's mechanical inertia prevents it from accelerating from standstill fast enough to lock on to this rapidly rotating field. Solutions include damper windings for induction starting, auxiliary starting motors, or variable frequency starting using a VSD."
  },
  {
    question: "How does a synchronous condenser improve power factor?",
    answer: "A synchronous condenser is an unloaded synchronous motor. When over-excited (high DC field current), it draws leading reactive current from the supply, appearing as a large capacitor. This leading current cancels the lagging current drawn by inductive loads (motors, transformers), improving the overall power factor and reducing supply current and losses."
  },
  {
    question: "What are the advantages of permanent magnet synchronous motors?",
    answer: "PMSMs offer higher efficiency (no rotor copper losses), higher power density (compact size), better dynamic response, and lower maintenance (no brushes or slip rings). Disadvantages include higher cost, risk of demagnetisation at high temperatures, and fixed field strength requiring sophisticated control algorithms."
  },
  {
    question: "Why do standby generators need synchronising equipment?",
    answer: "When paralleling a generator with the grid or another generator, mismatched conditions cause severe problems: voltage mismatch causes circulating currents, frequency mismatch causes power swings, and phase angle mismatch can cause destructive current surges. Synchronising equipment ensures all parameters match before connecting, and governors/AVRs maintain synchronism during operation."
  },
  {
    question: "What determines the reactive power output of a synchronous generator?",
    answer: "The field excitation current determines reactive power output. Increasing excitation causes the generator to export reactive power (supply VArs to the grid). Decreasing excitation causes the generator to import reactive power. This is used to control voltage on transmission systems - generators near load centres often operate over-excited to support voltage."
  },
  {
    question: "How do modern inverter-fed PMSMs start and run without sensors?",
    answer: "Sensorless control uses back-EMF estimation at higher speeds and various starting techniques (I/f control, high-frequency injection) at low speeds. The drive's microprocessor calculates rotor position from motor currents and voltages, eliminating the need for encoders or resolvers. This reduces cost and improves reliability in HVAC applications."
  }
];

const HNCModule3Section5_5 = () => {
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
            <span>Module 3.5.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Synchronous Machines - Principles and Uses
          </h1>
          <p className="text-white/80">
            Understanding synchronous motors, generators, and their critical role in building services power systems
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Synchronous speed:</strong> ns = 120f/p (no slip)</li>
              <li className="pl-1"><strong>Excitation control:</strong> Adjusts power factor</li>
              <li className="pl-1"><strong>Synchronous condensers:</strong> Large-scale PF correction</li>
              <li className="pl-1"><strong>PMSMs:</strong> High-efficiency VSD applications</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Standby generators:</strong> Emergency power supply</li>
              <li className="pl-1"><strong>PF correction:</strong> Large commercial/industrial sites</li>
              <li className="pl-1"><strong>PMSM drives:</strong> Chillers, fans, pumps</li>
              <li className="pl-1"><strong>Grid paralleling:</strong> CHP and renewable integration</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Calculate synchronous speed using ns = 120f/p",
              "Explain synchronous motor construction and excitation",
              "Describe power factor control through field current adjustment",
              "Understand synchronous condenser operation for PF correction",
              "Compare PMSMs with wound-field synchronous machines",
              "Explain hunting phenomena and damper winding function",
              "Describe alternator operation and synchronisation requirements",
              "Apply knowledge to standby generators and PF correction systems"
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

        {/* Section 1: Synchronous Speed */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Synchronous Speed
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Synchronous machines operate at a fixed speed determined by the supply frequency and the
              number of poles. Unlike induction motors, there is no slip - the rotor is magnetically
              locked to the rotating field and runs at exactly synchronous speed.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Synchronous Speed Formula</p>
              <p className="font-mono text-center text-lg mb-2">n<sub>s</sub> = 120f / p</p>
              <div className="text-xs text-white/70 text-center space-y-1">
                <p>Where: n<sub>s</sub> = synchronous speed (rev/min)</p>
                <p>f = supply frequency (Hz)</p>
                <p>p = number of poles</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Synchronous Speeds at 50Hz (UK Supply)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Poles (p)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Synchronous Speed</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2</td>
                      <td className="border border-white/10 px-3 py-2">3000 rev/min</td>
                      <td className="border border-white/10 px-3 py-2">High-speed turbine generators</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4</td>
                      <td className="border border-white/10 px-3 py-2">1500 rev/min</td>
                      <td className="border border-white/10 px-3 py-2">Standard generators, large motors</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">6</td>
                      <td className="border border-white/10 px-3 py-2">1000 rev/min</td>
                      <td className="border border-white/10 px-3 py-2">Medium-speed applications</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">8</td>
                      <td className="border border-white/10 px-3 py-2">750 rev/min</td>
                      <td className="border border-white/10 px-3 py-2">Direct-drive applications</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">12</td>
                      <td className="border border-white/10 px-3 py-2">500 rev/min</td>
                      <td className="border border-white/10 px-3 py-2">Low-speed hydro generators</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> For a generator producing 50Hz, the prime mover must maintain exactly the synchronous speed. Any speed variation directly affects output frequency.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Synchronous Motor Construction */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Synchronous Motor Construction
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A synchronous motor consists of a three-phase stator winding (similar to an induction motor)
              and a rotor with DC field windings or permanent magnets. The DC field creates poles that
              lock on to the rotating magnetic field produced by the stator.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Stator Construction</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Laminated silicon steel core</li>
                  <li className="pl-1">Three-phase distributed winding</li>
                  <li className="pl-1">Creates rotating magnetic field at n<sub>s</sub></li>
                  <li className="pl-1">Identical to induction motor stator</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Rotor Types</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Salient pole:</strong> Projecting poles, low speed</li>
                  <li className="pl-1"><strong>Cylindrical:</strong> Smooth rotor, high speed</li>
                  <li className="pl-1"><strong>Permanent magnet:</strong> No field windings</li>
                  <li className="pl-1">Field winding fed via slip rings and brushes</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Rotor Construction Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Feature</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Salient Pole</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Cylindrical</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Construction</td>
                      <td className="border border-white/10 px-3 py-2">Projecting poles</td>
                      <td className="border border-white/10 px-3 py-2">Distributed winding in slots</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Speed range</td>
                      <td className="border border-white/10 px-3 py-2">Low to medium</td>
                      <td className="border border-white/10 px-3 py-2">High speed</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pole number</td>
                      <td className="border border-white/10 px-3 py-2">4 to many</td>
                      <td className="border border-white/10 px-3 py-2">Usually 2 or 4</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Typical use</td>
                      <td className="border border-white/10 px-3 py-2">Hydro, diesel generators</td>
                      <td className="border border-white/10 px-3 py-2">Turbo-generators</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Starting Methods</p>
              <p className="text-sm text-white/90 mb-2">
                Synchronous motors cannot self-start because the rotating field reverses too quickly
                for the rotor inertia. Common starting methods include:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Damper winding start:</strong> Acts as induction motor cage during start-up</li>
                <li className="pl-1"><strong>Auxiliary motor:</strong> Small induction motor brings rotor to near-synchronous speed</li>
                <li className="pl-1"><strong>VSD starting:</strong> Frequency gradually increased from zero</li>
                <li className="pl-1"><strong>Reduced voltage:</strong> Star-delta or soft starter reduces starting current</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Excitation requirement:</strong> DC field current is typically 1-5% of the rated stator current, supplied via slip rings or brushless exciter.
            </p>
          </div>
        </section>

        {/* Section 3: Excitation and Power Factor Control */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Excitation and Power Factor Control
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A unique feature of synchronous motors is the ability to control power factor by adjusting
              the DC field excitation. This makes them valuable for power factor correction as well as
              providing mechanical drive.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Effect of Field Excitation on Power Factor</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Excitation Level</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Power Factor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Current Characteristic</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Equivalent Load</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Under-excited</td>
                      <td className="border border-white/10 px-3 py-2">Lagging</td>
                      <td className="border border-white/10 px-3 py-2">Current lags voltage</td>
                      <td className="border border-white/10 px-3 py-2">Inductive (like a coil)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Normal excitation</td>
                      <td className="border border-white/10 px-3 py-2">Unity (1.0)</td>
                      <td className="border border-white/10 px-3 py-2">Current in phase with voltage</td>
                      <td className="border border-white/10 px-3 py-2">Resistive</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Over-excited</td>
                      <td className="border border-white/10 px-3 py-2">Leading</td>
                      <td className="border border-white/10 px-3 py-2">Current leads voltage</td>
                      <td className="border border-white/10 px-3 py-2">Capacitive</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">V-Curves (Armature Current vs Field Current)</p>
              <p className="text-sm text-white/90 mb-3">
                The relationship between armature current and field current at constant load forms
                characteristic V-shaped curves. The minimum armature current occurs at unity power factor.
              </p>
              <div className="p-4 rounded bg-black/30">
                <pre className="text-xs text-white/80 font-mono whitespace-pre overflow-x-auto">
{`    Armature
    Current
       |     Lagging pf        Leading pf
       |         \\              /
       |          \\    Unity   /
       |           \\    pf    /
       |            \\   |   /
       |             \\  |  /
       |              \\ | /
       |               \\|/
       |________________|________________
                        |
              Field Current (If)

         Under-excited  |  Over-excited`}
                </pre>
              </div>
              <p className="text-xs text-white/60 mt-2">
                Each curve represents a different mechanical load. Higher loads shift the entire curve upward.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Practical Excitation Control</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Manual control:</strong> Field rheostat adjusted by operator</li>
                <li className="pl-1"><strong>Automatic voltage regulator (AVR):</strong> Maintains constant terminal voltage</li>
                <li className="pl-1"><strong>Power factor controller:</strong> Adjusts excitation to maintain target pf</li>
                <li className="pl-1"><strong>Brushless exciter:</strong> Rotating rectifier eliminates slip rings</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Operating point:</strong> Running slightly over-excited (0.95 leading) provides a safety margin whilst contributing to site power factor correction.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Synchronous Condensers */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Synchronous Condensers for Power Factor Correction
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A synchronous condenser is an unloaded synchronous motor used solely for reactive power
              compensation. When over-excited, it draws leading current from the supply, appearing as
              a large variable capacitor.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Advantages</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Continuously variable reactive power</li>
                  <li className="pl-1">Can absorb or generate VArs</li>
                  <li className="pl-1">Provides inertia to the system</li>
                  <li className="pl-1">High reliability and long life</li>
                  <li className="pl-1">No harmonic generation</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Disadvantages</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">High capital cost</li>
                  <li className="pl-1">Requires foundations and space</li>
                  <li className="pl-1">Mechanical maintenance (bearings, brushes)</li>
                  <li className="pl-1">Continuous losses (even unloaded)</li>
                  <li className="pl-1">Slower response than static compensators</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Synchronous Condenser vs Static Capacitors</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Aspect</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Synchronous Condenser</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Static Capacitors</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Control</td>
                      <td className="border border-white/10 px-3 py-2">Continuously variable</td>
                      <td className="border border-white/10 px-3 py-2">Stepped (switched banks)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">VAr direction</td>
                      <td className="border border-white/10 px-3 py-2">Generate or absorb</td>
                      <td className="border border-white/10 px-3 py-2">Generate only</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Harmonics</td>
                      <td className="border border-white/10 px-3 py-2">None generated</td>
                      <td className="border border-white/10 px-3 py-2">Can amplify harmonics</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Response time</td>
                      <td className="border border-white/10 px-3 py-2">Seconds</td>
                      <td className="border border-white/10 px-3 py-2">Milliseconds (thyristor-switched)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cost</td>
                      <td className="border border-white/10 px-3 py-2">High capital, low running</td>
                      <td className="border border-white/10 px-3 py-2">Lower capital, minimal running</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Modern Applications</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Grid stability:</strong> Providing inertia as rotating generation decreases</li>
                <li className="pl-1"><strong>Transmission support:</strong> Voltage control at strategic locations</li>
                <li className="pl-1"><strong>Industrial sites:</strong> Large steelworks, chemical plants</li>
                <li className="pl-1"><strong>Renewable integration:</strong> Compensating for variable generation</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Building services note:</strong> Static capacitor banks are more common for commercial buildings. Synchronous condensers are typically utility or heavy industrial scale.
            </p>
          </div>
        </section>

        {/* Section 5: Permanent Magnet Synchronous Motors */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Permanent Magnet Synchronous Motors (PMSMs)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              PMSMs use permanent magnets instead of DC field windings to create the rotor magnetic field.
              They offer superior efficiency and power density, making them ideal for modern variable
              speed drive applications in building services.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">PMSM Rotor Configurations</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Magnet Location</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Characteristics</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Surface-mounted (SPM)</td>
                      <td className="border border-white/10 px-3 py-2">On rotor surface</td>
                      <td className="border border-white/10 px-3 py-2">Simple, good torque, speed limited</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Interior (IPM)</td>
                      <td className="border border-white/10 px-3 py-2">Buried in rotor</td>
                      <td className="border border-white/10 px-3 py-2">Higher speed, field weakening possible</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Spoke type</td>
                      <td className="border border-white/10 px-3 py-2">Radially arranged</td>
                      <td className="border border-white/10 px-3 py-2">Flux concentration, ferrite magnets</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Advantages over Induction Motors</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">No rotor copper losses (2-5% higher efficiency)</li>
                  <li className="pl-1">Higher power density (smaller size)</li>
                  <li className="pl-1">Better dynamic response</li>
                  <li className="pl-1">Lower operating temperature</li>
                  <li className="pl-1">Quieter operation</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Considerations</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Higher initial cost (rare earth magnets)</li>
                  <li className="pl-1">Risk of demagnetisation at high temperature</li>
                  <li className="pl-1">Requires sophisticated drive control</li>
                  <li className="pl-1">Cannot adjust field strength</li>
                  <li className="pl-1">Magnet material sustainability concerns</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">PMSM Efficiency Comparison (IE Classes)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Motor Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Efficiency</th>
                      <th className="border border-white/10 px-3 py-2 text-left">IE Class Equivalent</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Standard induction (11kW)</td>
                      <td className="border border-white/10 px-3 py-2">89-91%</td>
                      <td className="border border-white/10 px-3 py-2">IE2-IE3</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Premium induction (11kW)</td>
                      <td className="border border-white/10 px-3 py-2">91-93%</td>
                      <td className="border border-white/10 px-3 py-2">IE3-IE4</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">PMSM (11kW)</td>
                      <td className="border border-white/10 px-3 py-2">94-96%</td>
                      <td className="border border-white/10 px-3 py-2">IE4-IE5</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Building Services Applications</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Chiller compressors:</strong> Oil-free magnetic bearing designs</li>
                <li className="pl-1"><strong>AHU supply/extract fans:</strong> Direct-drive eliminates belt losses</li>
                <li className="pl-1"><strong>Circulation pumps:</strong> Integrated motor-pump units</li>
                <li className="pl-1"><strong>Lift machines:</strong> Gearless direct-drive traction</li>
                <li className="pl-1"><strong>Heat pump compressors:</strong> Variable speed for part-load efficiency</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ErP Directive:</strong> EU regulations increasingly mandate IE4+ efficiency for motors, driving PMSM adoption in new building services installations.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 6: Hunting and Damper Windings */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Hunting and Damper Windings
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              'Hunting' refers to oscillations of the rotor about its equilibrium position relative to
              the rotating magnetic field. These oscillations can cause mechanical stress, voltage
              fluctuations, and resonance problems if not controlled.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Causes of Hunting</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Sudden load changes:</strong> Mechanical load torque variations</li>
                <li className="pl-1"><strong>Supply variations:</strong> Voltage or frequency fluctuations</li>
                <li className="pl-1"><strong>Pulsating loads:</strong> Reciprocating compressors, stamping presses</li>
                <li className="pl-1"><strong>Prime mover variations:</strong> Diesel engine torque pulsations</li>
                <li className="pl-1"><strong>System resonance:</strong> Mechanical-electrical natural frequencies</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Damper (Amortisseur) Windings</p>
              <p className="text-sm text-white/90 mb-3">
                Damper windings are short-circuited copper or aluminium bars embedded in the rotor
                pole faces, similar to a squirrel cage.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-white mb-1">How They Work:</p>
                  <ul className="text-xs text-white/80 space-y-1 list-disc list-outside ml-4">
                    <li>At synchronous speed: no relative motion, no induced current</li>
                    <li>During hunting: relative motion induces currents</li>
                    <li>Induced currents create opposing torque</li>
                    <li>Oscillations are damped out</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-white mb-1">Additional Functions:</p>
                  <ul className="text-xs text-white/80 space-y-1 list-disc list-outside ml-4">
                    <li>Provide starting torque (induction motor action)</li>
                    <li>Protect field winding during asymmetrical faults</li>
                    <li>Reduce rotor surface losses</li>
                    <li>Improve transient stability</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Hunting Prevention Methods</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Damper windings:</strong> Standard on most synchronous machines</li>
                <li className="pl-1"><strong>Flywheels:</strong> Increase rotor inertia for pulsating loads</li>
                <li className="pl-1"><strong>Proper sizing:</strong> Avoid operation near natural frequency</li>
                <li className="pl-1"><strong>Excitation control:</strong> Fast-acting AVR reduces electrical disturbances</li>
                <li className="pl-1"><strong>Power system stabilisers:</strong> On large generators</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Generator protection:</strong> Severe hunting can cause pole slipping, leading to large current surges and mechanical damage. Loss-of-synchronism protection disconnects the machine.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 7: Synchronous Generators (Alternators) */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Synchronous Generators (Alternators)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A synchronous generator (alternator) converts mechanical energy to electrical energy.
              The prime mover (diesel engine, gas turbine, steam turbine) drives the rotor, and AC
              voltage is induced in the stator windings.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Generator Output Equations</p>
              <div className="space-y-2 text-sm font-mono">
                <p><strong>Frequency:</strong> f = (p x n) / 120 Hz</p>
                <p><strong>EMF:</strong> E = 4.44 x f x N x phi x k<sub>w</sub> Volts</p>
                <p><strong>Three-phase power:</strong> P = sqrt(3) x V<sub>L</sub> x I<sub>L</sub> x cos phi Watts</p>
              </div>
              <p className="text-xs text-white/60 mt-2">
                Where: p = poles, n = speed (rev/min), N = turns, phi = flux, k<sub>w</sub> = winding factor
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Generator Voltage Regulation</p>
              <p className="text-sm text-white/90 mb-2">
                Terminal voltage varies with load due to armature reaction and internal impedance.
                The Automatic Voltage Regulator (AVR) adjusts field current to maintain constant voltage.
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Load Power Factor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Effect on Terminal Voltage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">AVR Response</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lagging (inductive)</td>
                      <td className="border border-white/10 px-3 py-2">Voltage drops significantly</td>
                      <td className="border border-white/10 px-3 py-2">Increase excitation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Unity</td>
                      <td className="border border-white/10 px-3 py-2">Moderate voltage drop</td>
                      <td className="border border-white/10 px-3 py-2">Moderate increase</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Leading (capacitive)</td>
                      <td className="border border-white/10 px-3 py-2">Voltage may rise</td>
                      <td className="border border-white/10 px-3 py-2">Decrease excitation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Excitation Systems</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Static exciter:</strong> Thyristor-controlled DC from PT/CT</li>
                  <li className="pl-1"><strong>Brushless exciter:</strong> Rotating rectifier, no slip rings</li>
                  <li className="pl-1"><strong>PMG exciter:</strong> Permanent magnet pilot generator</li>
                  <li className="pl-1"><strong>Self-excited:</strong> Residual magnetism starts, shunt builds</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Generator Protection</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Differential:</strong> Internal fault detection</li>
                  <li className="pl-1"><strong>Overcurrent:</strong> External fault backup</li>
                  <li className="pl-1"><strong>Reverse power:</strong> Motoring protection</li>
                  <li className="pl-1"><strong>Loss of excitation:</strong> Field failure</li>
                  <li className="pl-1"><strong>Under/over voltage:</strong> AVR failure</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Voltage regulation:</strong> Typically +/-0.5% for modern AVR-controlled generators, meeting BS EN 61000-2-2 compatibility requirements.
            </p>
          </div>
        </section>

        {/* Section 8: Building Services Applications */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
            Building Services Applications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Synchronous machines play critical roles in building services, from standby power generation
              to power factor correction on large commercial and industrial sites.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Standby Generator Systems</p>
              <p className="text-sm text-white/90 mb-3">
                Diesel generators provide emergency power for life safety systems, data centres,
                hospitals, and other critical facilities.
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Size</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Start Time</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Standard</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Emergency lighting</td>
                      <td className="border border-white/10 px-3 py-2">50-200 kVA</td>
                      <td className="border border-white/10 px-3 py-2">&lt;15 seconds</td>
                      <td className="border border-white/10 px-3 py-2">BS 5266</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Hospital essential</td>
                      <td className="border border-white/10 px-3 py-2">500-2000 kVA</td>
                      <td className="border border-white/10 px-3 py-2">&lt;15 seconds</td>
                      <td className="border border-white/10 px-3 py-2">HTM 06-01</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Data centre Tier III</td>
                      <td className="border border-white/10 px-3 py-2">1000-3000 kVA</td>
                      <td className="border border-white/10 px-3 py-2">&lt;10 seconds</td>
                      <td className="border border-white/10 px-3 py-2">Uptime Institute</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fire pump</td>
                      <td className="border border-white/10 px-3 py-2">100-500 kVA</td>
                      <td className="border border-white/10 px-3 py-2">&lt;10 seconds</td>
                      <td className="border border-white/10 px-3 py-2">BS EN 12845</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Generator Paralleling Requirements</p>
              <p className="text-sm text-white/90 mb-2">
                When paralleling generators with each other or the grid, the following must match:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Voltage:</strong> Within +/-5% of nominal</li>
                <li className="pl-1"><strong>Frequency:</strong> Within +/-0.5 Hz (incoming slightly faster)</li>
                <li className="pl-1"><strong>Phase sequence:</strong> Must be identical (L1-L2-L3)</li>
                <li className="pl-1"><strong>Phase angle:</strong> Within +/-10 degrees (synchronoscope or sync check relay)</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Large-Scale Power Factor Correction</p>
              <p className="text-sm text-white/90 mb-3">
                For sites with large motor loads (industrial processes, multiple chillers), centralised
                PF correction is more economical than individual motor correction.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-white mb-1">Capacitor Bank Installation:</p>
                  <ul className="text-xs text-white/80 space-y-1 list-disc list-outside ml-4">
                    <li>Automatic power factor controller</li>
                    <li>Stepped switching (contactor or thyristor)</li>
                    <li>Detuning reactors for harmonic-rich sites</li>
                    <li>Target pf typically 0.95-0.98 lagging</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-white mb-1">Benefits:</p>
                  <ul className="text-xs text-white/80 space-y-1 list-disc list-outside ml-4">
                    <li>Reduced reactive power charges</li>
                    <li>Lower distribution losses</li>
                    <li>Released transformer capacity</li>
                    <li>Improved voltage regulation</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Combined Heat and Power (CHP)</p>
              <p className="text-sm text-white/90 mb-2">
                Synchronous generators in CHP systems can export power to the grid, requiring:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>G99 connection:</strong> DNO approval for embedded generation</li>
                <li className="pl-1"><strong>Protection scheme:</strong> Loss of mains (ROCOF, vector shift)</li>
                <li className="pl-1"><strong>Metering:</strong> Import/export kWh and kVArh</li>
                <li className="pl-1"><strong>Synchronising:</strong> Automatic sync panel</li>
                <li className="pl-1"><strong>Power quality:</strong> Harmonic limits per G5/4-1</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>BS 7671 requirements:</strong> Standby generators must comply with Section 551 (Low voltage generating sets) including earth fault loop impedance verification and RCD coordination.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Synchronous Speed Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A standby generator has 4 poles and must produce 50Hz. What speed must the diesel engine maintain?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Using: f = (p x n) / 120</p>
                <p className="mt-2">Rearranging for n: n = (120 x f) / p</p>
                <p className="mt-2">n = (120 x 50) / 4 = 6000 / 4 = <strong>1500 rev/min</strong></p>
                <p className="mt-2 text-white/60">The engine governor must maintain 1500 +/-0.5% for frequency stability</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Generator Sizing for Building Load</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A hospital has 800kW essential load at 0.85 pf lagging. Size the standby generator.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Apparent power: S = P / cos phi</p>
                <p>S = 800 / 0.85 = <strong>941 kVA</strong></p>
                <p className="mt-2">Allow 20% margin for motor starting:</p>
                <p>Generator rating = 941 x 1.2 = 1129 kVA</p>
                <p className="mt-2">Select: <strong>1250 kVA generator</strong> (standard size)</p>
                <p className="mt-2 text-white/60">Prime rated for continuous operation</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Power Factor Correction Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A factory has 500kW load at 0.75 pf. Calculate kVAr required to improve to 0.95 pf.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Original reactive power:</p>
                <p>Q1 = P x tan(cos^-1 0.75) = 500 x tan(41.4 deg) = 500 x 0.882 = 441 kVAr</p>
                <p className="mt-2">Target reactive power:</p>
                <p>Q2 = P x tan(cos^-1 0.95) = 500 x tan(18.2 deg) = 500 x 0.329 = 164 kVAr</p>
                <p className="mt-2">Capacitor bank required:</p>
                <p>Qc = Q1 - Q2 = 441 - 164 = <strong>277 kVAr</strong></p>
                <p className="mt-2 text-white/60">Install 300 kVAr automatic capacitor bank</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 4: PMSM Energy Savings</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 30kW AHU fan motor runs 6000 hours/year. Compare IE3 induction (91%) vs PMSM (95%) efficiency.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>IE3 induction motor input power:</p>
                <p>Pin = 30 / 0.91 = 33.0 kW</p>
                <p className="mt-2">PMSM input power:</p>
                <p>Pin = 30 / 0.95 = 31.6 kW</p>
                <p className="mt-2">Annual saving:</p>
                <p>Delta E = (33.0 - 31.6) x 6000 = <strong>8,400 kWh/year</strong></p>
                <p className="mt-2">At GBP 0.15/kWh: <strong>GBP 1,260/year saving</strong></p>
                <p className="mt-2 text-white/60">Payback typically 3-5 years on motor premium</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Formulas</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>ns = 120f / p</strong> - Synchronous speed</li>
                <li className="pl-1"><strong>f = (p x n) / 120</strong> - Generator frequency</li>
                <li className="pl-1"><strong>S = P / cos phi</strong> - Apparent power from real power</li>
                <li className="pl-1"><strong>Q = P x tan phi</strong> - Reactive power</li>
                <li className="pl-1"><strong>Qc = P x (tan phi1 - tan phi2)</strong> - Capacitor kVAr for PF correction</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">2-pole at 50Hz: <strong>3000 rev/min</strong></li>
                <li className="pl-1">4-pole at 50Hz: <strong>1500 rev/min</strong></li>
                <li className="pl-1">6-pole at 50Hz: <strong>1000 rev/min</strong></li>
                <li className="pl-1">PMSM efficiency advantage: <strong>2-5%</strong> over induction</li>
                <li className="pl-1">Generator sizing margin: <strong>20-25%</strong> for motor starting</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Confusing poles and pole pairs:</strong> Formula uses total poles, not pairs</li>
                <li className="pl-1"><strong>Ignoring motor starting:</strong> Generator must handle inrush currents</li>
                <li className="pl-1"><strong>Over-correction of pf:</strong> Leading pf can cause voltage rise</li>
                <li className="pl-1"><strong>Forgetting synchronising:</strong> Paralleling without matching causes damage</li>
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
                <p className="font-medium text-white mb-1">Synchronous Machine Principles</p>
                <ul className="space-y-0.5">
                  <li>Synchronous speed: ns = 120f/p</li>
                  <li>Zero slip at steady state</li>
                  <li>Field excitation controls pf</li>
                  <li>Damper windings suppress hunting</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Building Services</p>
                <ul className="space-y-0.5">
                  <li>Standby generators: 4-pole, 1500 rev/min</li>
                  <li>PF correction: 0.95-0.98 target</li>
                  <li>PMSM: IE4-IE5 efficiency</li>
                  <li>G99 for grid-connected generation</li>
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
            <Link to="../h-n-c-module3-section5-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Speed Control
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section5-6">
              Next: Practical Applications
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule3Section5_5;
