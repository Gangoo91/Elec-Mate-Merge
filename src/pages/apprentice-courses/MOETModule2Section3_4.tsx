import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "DC Motors and Their Control - MOET Module 2.3.4";
const DESCRIPTION = "Understand DC motor types, speed control methods, armature voltage control, field weakening, regenerative braking, DC drives, commutator maintenance, and brush wear for electrical maintenance technicians.";

const quickCheckQuestions = [
  {
    id: "dc-series-motor",
    question: "Why must a DC series motor NEVER be run without a mechanical load connected?",
    options: [
      "The brushes will wear out quickly",
      "The motor will overheat at low speed",
      "Without load, the speed rises uncontrollably to a dangerous level (runaway) because the weak field at light load allows the speed to increase, which further weakens the field",
      "The supply fuse will blow"
    ],
    correctIndex: 2,
    explanation: "In a series motor, the field current equals the armature current. At no load, the armature current is very small, the field is very weak, and the motor must spin faster to generate sufficient back-EMF. This positive feedback loop causes the speed to increase without limit — the motor 'runs away' and can self-destruct. Series motors must always be directly coupled to their load."
  },
  {
    id: "speed-control-armature",
    question: "What is the effect of reducing the armature voltage of a DC motor while keeping the field voltage constant?",
    options: [
      "The speed increases",
      "The speed decreases — armature voltage control gives speeds below base speed",
      "The speed stays the same but torque increases",
      "The motor reverses direction"
    ],
    correctIndex: 1,
    explanation: "Speed is approximately proportional to armature voltage divided by field flux: N is proportional to Va / phi. Reducing Va while keeping phi constant reduces the speed. This method gives a constant-torque speed range from zero to base speed, making it ideal for applications requiring good low-speed torque."
  },
  {
    id: "commutator-maintenance",
    question: "When inspecting a DC motor commutator, what does a dark brown, polished appearance indicate?",
    options: [
      "The commutator needs immediate repair",
      "The motor is overloaded",
      "A healthy 'patina' — good commutation with correct brush grade and pressure",
      "Excessive brush wear"
    ],
    correctIndex: 2,
    explanation: "A dark brown, evenly polished surface (called the patina or glaze) indicates healthy commutation. The patina is a thin copper oxide film that reduces brush wear and improves contact. A bright, scratched copper surface indicates abrasive contamination, wrong brush grade, or recent machining that has not yet developed a patina."
  },
  {
    id: "regenerative-braking",
    question: "What is regenerative braking in a DC motor system?",
    options: [
      "Using a mechanical brake to stop the motor",
      "Reversing the supply to the motor",
      "The motor acts as a generator, converting kinetic energy to electrical energy and feeding it back to the supply",
      "Disconnecting the motor and letting it coast to a stop"
    ],
    correctIndex: 2,
    explanation: "During regenerative braking, the motor is driven by the mechanical load faster than its normal speed (or the armature voltage is reduced below the back-EMF). The motor becomes a generator, converting the kinetic energy of the rotating load into electrical energy, which is fed back to the supply through the drive. This provides controlled deceleration and recovers energy."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "In a DC motor, the torque is produced by the interaction between:",
    options: [
      "Two magnetic fields from the stator windings",
      "The field flux and the armature current-carrying conductors in the field",
      "Electrostatic forces between plates",
      "Eddy currents in the rotor"
    ],
    correctAnswer: 1,
    explanation: "DC motor torque is produced by the force on current-carrying conductors (armature winding) placed in a magnetic field (from the field poles). The force follows Fleming's left-hand rule: F = B x I x L (force = flux density x current x conductor length). Torque is proportional to the product of field flux and armature current."
  },
  {
    id: 2,
    question: "A DC shunt motor has its field winding connected:",
    options: [
      "In series with the armature",
      "In parallel with the armature, across the full supply voltage",
      "To a separate AC supply",
      "Through the commutator"
    ],
    correctAnswer: 1,
    explanation: "In a shunt motor, the field winding is connected in parallel (shunt) with the armature, across the full supply voltage. This means the field current is independent of the armature current (load), providing approximately constant flux and therefore approximately constant speed across the load range — good speed regulation."
  },
  {
    id: 3,
    question: "What is the 'back-EMF' in a DC motor?",
    options: [
      "The voltage drop across the brushes",
      "The voltage generated by the rotating armature, which opposes the supply voltage",
      "The voltage across the field winding",
      "The voltage drop in the supply cables"
    ],
    correctAnswer: 1,
    explanation: "When the armature rotates in the magnetic field, it generates an EMF (just like a generator) that opposes the applied supply voltage — this is the back-EMF (Eb). The armature current is determined by: Ia = (V - Eb) / Ra. At running speed, the back-EMF is close to the supply voltage, so the armature current (and therefore copper losses) are relatively small."
  },
  {
    id: 4,
    question: "A DC compound motor combines:",
    options: [
      "AC and DC windings",
      "Series and shunt field windings to provide characteristics between a pure series and pure shunt motor",
      "Two armature windings",
      "A permanent magnet field with an electromagnetic field"
    ],
    correctAnswer: 1,
    explanation: "A compound motor has both a series field winding (carrying armature current) and a shunt field winding (across the supply voltage). The series winding adds flux under load, increasing torque, while the shunt winding provides base flux for good speed regulation. The result is moderate speed regulation with better starting torque than a pure shunt motor."
  },
  {
    id: 5,
    question: "Field weakening in a DC shunt motor involves:",
    options: [
      "Reducing the armature voltage",
      "Increasing the resistance in the field circuit to reduce field current and flux, causing the motor to speed up above base speed",
      "Short-circuiting the field winding",
      "Reversing the field connections"
    ],
    correctAnswer: 1,
    explanation: "Since speed is proportional to V/phi, reducing the field flux (phi) by increasing the field circuit resistance causes the speed to increase above base speed. This provides a constant-power speed range above base speed. However, the maximum torque decreases as the field is weakened. Field weakening should not exceed the manufacturer's limits to avoid commutation problems."
  },
  {
    id: 6,
    question: "The function of the commutator in a DC motor is to:",
    options: [
      "Generate the magnetic field",
      "Provide mechanical support for the armature",
      "Act as a mechanical rectifier, reversing the current direction in each armature coil as it passes the brush position, ensuring continuous unidirectional torque",
      "Regulate the motor speed"
    ],
    correctAnswer: 2,
    explanation: "The commutator is a segmented copper cylinder connected to the armature coils. As the armature rotates, the brushes make contact with successive commutator segments, reversing the current direction in each coil at exactly the right moment to ensure all conductors contribute torque in the same rotational direction."
  },
  {
    id: 7,
    question: "What are the two main methods of speed control for DC motors below and above base speed?",
    options: [
      "Changing the number of poles, and reversing the connections",
      "Armature voltage control (below base speed) and field weakening (above base speed)",
      "Changing the brush position and adding external resistance",
      "Varying the supply frequency and adjusting the commutator"
    ],
    correctAnswer: 1,
    explanation: "Below base speed: armature voltage control varies Va from zero to rated voltage, giving constant-torque operation. Above base speed: field weakening reduces the field flux, giving constant-power operation at higher speeds but reduced torque. Together, these provide a wide speed range with excellent control characteristics."
  },
  {
    id: 8,
    question: "A thyristor DC drive converts:",
    options: [
      "DC to AC for the motor",
      "AC mains supply to controlled DC voltage for the motor armature",
      "Three-phase to single-phase",
      "Low voltage DC to high voltage DC"
    ],
    correctAnswer: 1,
    explanation: "A thyristor (SCR) DC drive uses phase-controlled thyristors to convert the AC mains supply to a variable DC voltage. By adjusting the thyristor firing angle, the mean DC output voltage is varied, controlling the motor speed. Four-quadrant drives can provide both motoring and regenerative braking in both directions of rotation."
  },
  {
    id: 9,
    question: "What causes sparking at the brushes of a DC motor?",
    options: [
      "Normal operation — all DC motors spark",
      "Poor commutation — causes include worn brushes, incorrect brush grade, commutator surface defects, overloading, or brush spring tension problems",
      "The motor is operating at rated load",
      "The field winding is energised"
    ],
    correctAnswer: 1,
    explanation: "Sparking at the brushes indicates poor commutation — the current is not transferring smoothly from one commutator segment to the next. Common causes include: worn or chipped brushes, incorrect brush grade, high or low mica between segments, rough or eccentric commutator surface, incorrect brush position, overloading, and weak brush spring pressure."
  },
  {
    id: 10,
    question: "Why is an armature resistance starter used for starting large DC motors?",
    options: [
      "To increase starting torque",
      "To limit the starting current — at standstill there is no back-EMF, so without a starter resistor the armature current would be V/Ra, which is extremely high",
      "To reverse the motor",
      "To improve the power factor"
    ],
    correctAnswer: 1,
    explanation: "At standstill, back-EMF = 0, so Ia = V / Ra. Since Ra is very small (often less than 1 ohm), the starting current without a resistor would be enormous — potentially 10-20 times rated current. The starter resistor limits this to a safe value (typically 1.5-2 times rated current). As the motor accelerates and back-EMF builds up, the resistance is progressively removed."
  },
  {
    id: 11,
    question: "Dynamic braking of a DC motor involves:",
    options: [
      "Reversing the supply voltage",
      "Disconnecting the armature from the supply and connecting it across a braking resistor — the motor acts as a generator, dissipating kinetic energy as heat in the resistor",
      "Applying a mechanical brake",
      "Increasing the field current"
    ],
    correctAnswer: 1,
    explanation: "In dynamic braking, the armature is disconnected from the supply and connected to a braking resistor. The motor, still spinning and with the field energised, acts as a generator, producing current through the resistor. The kinetic energy of the rotating load is converted to heat in the resistor, bringing the motor to a controlled stop. Unlike regenerative braking, the energy is wasted as heat."
  },
  {
    id: 12,
    question: "When undercutting a commutator, you are:",
    options: [
      "Removing material from the copper segments",
      "Cutting the mica insulation between commutator segments to below the copper surface to prevent the mica from protruding as the copper wears",
      "Polishing the commutator surface",
      "Replacing the commutator segments"
    ],
    correctAnswer: 1,
    explanation: "The mica insulation between commutator segments is harder than the copper. As the copper wears, the mica eventually protrudes above the copper surface, causing the brushes to bounce and spark. Undercutting removes the mica to a depth of about 1-1.5mm below the copper surface, ensuring smooth brush contact. This is a routine maintenance task for DC machines."
  }
];

const faqs = [
  {
    question: "Are DC motors still used in modern industry?",
    answer: "Yes, although their dominance has declined significantly with the widespread adoption of AC variable speed drives. DC motors are still found in: existing installations (many large DC drives remain in service in steel mills, paper mills, and mining), traction applications (some rail systems), battery-powered vehicles and equipment, small servo drives, and applications requiring very precise speed and torque control at low speeds. New installations increasingly use AC motors with VFDs, but the maintenance technician will encounter many DC machines in service."
  },
  {
    question: "How often should DC motor brushes be inspected?",
    answer: "Brush inspection intervals depend on the duty cycle, environment, and motor size. As a general guide: high-duty applications (continuous running, reversing, high load) every 1-3 months; moderate duty every 3-6 months; light duty every 6-12 months. Check for: brush length (replace when worn to minimum length mark), correct brush grade, freedom of movement in brush holders, spring pressure (use a spring balance), commutator condition, and evidence of sparking or brush dust buildup."
  },
  {
    question: "What is the difference between a 2-quadrant and 4-quadrant DC drive?",
    answer: "A 2-quadrant drive provides motoring and braking in one direction of rotation (e.g., forward motoring + forward regenerative braking). A 4-quadrant drive provides motoring and regenerative braking in both directions — forward motoring, forward braking, reverse motoring, and reverse braking. A 4-quadrant drive uses two thyristor bridges (one for each direction) and can seamlessly transition between all four operating modes. Used for reversing drives, hoists, and winding applications."
  },
  {
    question: "Why do DC motors need interpoles (commutating poles)?",
    answer: "Interpoles are small poles placed between the main field poles, carrying armature current. They generate a local magnetic field at the commutation zone (where the brushes contact the commutator) that helps neutralise the EMF induced in the coil undergoing commutation. Without interpoles, this EMF would cause sparking at the brushes. Interpoles are essential for good commutation, especially at higher loads and speeds."
  },
  {
    question: "Can you reverse the direction of a DC motor?",
    answer: "Yes. Reverse either the armature connections OR the field connections — but not both (reversing both would maintain the same direction). In practice, it is more common to reverse the armature connections because the armature circuit has lower inductance and responds faster. Modern DC drives reverse the armature voltage electronically using a 4-quadrant thyristor bridge. Reversing a series motor requires reversing the armature connections only, as the field is in series with the armature."
  }
];

const MOETModule2Section3_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 2.3
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span>Module 2.3.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            DC Motors and Their Control
          </h1>
          <p className="text-white/80">
            Series, shunt, and compound wound motors — speed control, braking, DC drives, and commutator maintenance
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Types:</strong> Series (high starting torque), shunt (constant speed), compound (compromise)</li>
              <li className="pl-1"><strong>Speed control:</strong> Armature voltage (below base speed), field weakening (above)</li>
              <li className="pl-1"><strong>Braking:</strong> Regenerative, dynamic, plugging — each with distinct characteristics</li>
              <li className="pl-1"><strong>Maintenance:</strong> Brushes, commutator, bearings — more than AC motors</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Context — Why This Matters</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Still in service:</strong> Many DC drives remain in heavy industry (steel, paper, mining)</li>
              <li className="pl-1"><strong>Maintenance-heavy:</strong> Brushes and commutators need regular skilled attention</li>
              <li className="pl-1"><strong>ST1426:</strong> Understand DC motor principles, maintenance, and speed control</li>
              <li className="pl-1"><strong>Safety:</strong> Series motors can run away; stored energy in field windings</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Describe the construction and operating principles of series, shunt, and compound wound DC motors",
              "Explain speed control by armature voltage variation and field weakening",
              "Describe regenerative, dynamic, and plugging braking methods",
              "Explain the function of thyristor and chopper DC drives",
              "Carry out commutator inspection and maintenance including undercutting and brush replacement",
              "Identify common DC motor faults and their causes"
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

        {/* Section 1: DC Motor Types */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            DC Motor Types and Characteristics
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A DC motor produces torque through the interaction of a magnetic field (from the field
              winding or permanent magnets) and current-carrying conductors in the armature. The way
              the field winding is connected relative to the armature determines the motor's speed-torque
              characteristics, and therefore its suitability for different applications.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Fundamental DC Motor Equation</p>
              <div className="bg-black/30 p-3 rounded text-sm text-white/90">
                <p className="font-mono mb-1">V = Eb + Ia x Ra</p>
                <p className="font-mono mb-1">Eb = k x phi x N (back-EMF)</p>
                <p className="font-mono mb-1">T = k x phi x Ia (torque)</p>
                <p className="text-xs text-white/60 mt-2">Where: V = supply voltage, Eb = back-EMF, Ia = armature current, Ra = armature resistance, phi = field flux, N = speed, k = machine constant</p>
              </div>
            </div>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
                <h3 className="text-sm font-medium text-red-400 mb-3">Series Wound Motor</h3>
                <p className="text-sm text-white/90 mb-3">
                  The field winding is connected in series with the armature — field current equals
                  armature current. This gives unique characteristics.
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Very high starting torque</strong> — because field flux is strong at high starting current</li>
                  <li className="pl-1"><strong>Speed varies inversely with load</strong> — heavy load = slow, light load = fast</li>
                  <li className="pl-1"><strong>DANGER — will run away at no load!</strong> At light load, armature current is small, field is weak, speed rises uncontrollably</li>
                  <li className="pl-1"><strong>Must always be mechanically coupled to its load</strong> — never use belt drive (belt could slip/break)</li>
                  <li className="pl-1"><strong>Applications:</strong> Traction (trains, trams), cranes, hoists, winches — where high starting torque and variable speed are needed</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-blue-500/10 border-l-2 border-blue-500/50">
                <h3 className="text-sm font-medium text-blue-400 mb-3">Shunt Wound Motor</h3>
                <p className="text-sm text-white/90 mb-3">
                  The field winding is connected in parallel (shunt) with the armature, across the full
                  supply voltage. Field current is independent of load.
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Approximately constant speed</strong> — good speed regulation across load range</li>
                  <li className="pl-1"><strong>Moderate starting torque</strong> — lower than series motor</li>
                  <li className="pl-1"><strong>Speed easily controlled</strong> — by armature voltage or field current adjustment</li>
                  <li className="pl-1"><strong>Safe at no-load</strong> — field flux remains constant, speed stays near rated</li>
                  <li className="pl-1"><strong>Applications:</strong> Machine tools, conveyors, fans, pumps — where constant speed is required</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-green-500/10 border-l-2 border-green-500/50">
                <h3 className="text-sm font-medium text-green-400 mb-3">Compound Wound Motor</h3>
                <p className="text-sm text-white/90 mb-3">
                  Has both series and shunt field windings, combining characteristics of both types.
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Cumulative compound:</strong> Series and shunt fields aid each other — better starting torque than shunt, better speed regulation than series</li>
                  <li className="pl-1"><strong>Differential compound:</strong> Series field opposes shunt field — very constant speed but unstable at high loads (rarely used)</li>
                  <li className="pl-1"><strong>No-load safety:</strong> Shunt winding prevents runaway at no-load</li>
                  <li className="pl-1"><strong>Applications:</strong> Presses, shears, rolling mills, elevators — where good starting torque and reasonable speed regulation are both needed</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Speed Control Methods */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Speed Control Methods
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              One of the great advantages of DC motors — and the main reason they dominated variable-speed
              drives for decades — is the ease and precision with which their speed can be controlled.
              The two primary methods provide a wide speed range with excellent control characteristics.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-blue-400 mb-3">Armature Voltage Control (Below Base Speed)</h3>
                <p className="text-sm text-white/90 mb-3">
                  The armature voltage is varied from zero to rated voltage while the field current is held
                  constant at its rated value. This provides constant-torque operation.
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Speed range:</strong> Zero to base speed (rated speed)</li>
                  <li className="pl-1"><strong>Torque:</strong> Full rated torque available at all speeds (constant torque)</li>
                  <li className="pl-1"><strong>Power:</strong> Power increases linearly with speed (P = T x omega)</li>
                  <li className="pl-1"><strong>Method:</strong> Thyristor converter or chopper varies the armature voltage</li>
                  <li className="pl-1"><strong>Smooth control:</strong> Stepless speed adjustment from standstill to full speed</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-purple-400 mb-3">Field Weakening (Above Base Speed)</h3>
                <p className="text-sm text-white/90 mb-3">
                  The armature voltage is held at its rated value and the field current is reduced below
                  its rated value. This provides constant-power operation.
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Speed range:</strong> Base speed to typically 2-3 times base speed</li>
                  <li className="pl-1"><strong>Torque:</strong> Decreases inversely with speed (constant power)</li>
                  <li className="pl-1"><strong>Power:</strong> Approximately constant across the speed range</li>
                  <li className="pl-1"><strong>Limit:</strong> Maximum speed limited by commutation capability and mechanical strength</li>
                  <li className="pl-1"><strong>Caution:</strong> Excessive field weakening causes poor commutation and sparking</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
                <p className="text-sm font-medium text-elec-yellow mb-2">Combined Speed Range</p>
                <p className="text-sm text-white/90">
                  Using armature voltage control from zero to base speed, then field weakening from base speed
                  upwards, a DC drive can achieve speed ranges of 100:1 or greater. Below base speed: constant
                  torque capability. Above base speed: constant power capability. This wide, controllable speed
                  range is why DC drives were historically preferred for demanding applications.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: DC Drives and Braking */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            DC Drives and Braking Methods
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Modern DC drives use power electronic converters to provide precise, efficient speed control.
              The maintenance technician must understand the drive types and their braking capabilities.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-white mb-3">Drive Types</h3>
                <div className="space-y-3">
                  <div className="bg-black/30 p-3 rounded">
                    <p className="text-sm font-medium text-blue-400 mb-1">Thyristor (SCR) Converter Drive</p>
                    <p className="text-xs text-white/80">
                      Uses phase-controlled thyristors to convert three-phase AC to variable DC voltage. The
                      firing angle controls the output voltage. Single converter = 2-quadrant (forward motoring +
                      forward regenerative braking). Dual converter = 4-quadrant (both directions, full regeneration).
                      Still widely used for large DC drives (100kW to several MW).
                    </p>
                  </div>
                  <div className="bg-black/30 p-3 rounded">
                    <p className="text-sm font-medium text-blue-400 mb-1">Chopper (PWM) Drive</p>
                    <p className="text-xs text-white/80">
                      Uses transistors (IGBTs or MOSFETs) to rapidly switch a fixed DC supply on and off,
                      controlling the mean voltage to the motor. Used in battery-powered vehicles, small drives,
                      and traction applications. Faster response than thyristor drives, less supply harmonic distortion.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-white mb-3">Braking Methods</h3>
                <div className="space-y-3">
                  <div className="bg-black/30 p-3 rounded">
                    <p className="text-sm font-medium text-green-400 mb-1">Regenerative Braking</p>
                    <p className="text-xs text-white/80">
                      The motor acts as a generator, feeding energy back to the supply. The armature voltage
                      (or back-EMF) exceeds the supply voltage, reversing the current flow. Efficient — energy
                      is recovered. Requires a regenerative (4-quadrant) drive or a supply that can accept
                      returned energy. Used for cranes, hoists, and electric traction.
                    </p>
                  </div>
                  <div className="bg-black/30 p-3 rounded">
                    <p className="text-sm font-medium text-amber-400 mb-1">Dynamic (Rheostatic) Braking</p>
                    <p className="text-xs text-white/80">
                      The armature is disconnected from the supply and connected across a braking resistor.
                      The motor generates current through the resistor, converting kinetic energy to heat.
                      Energy is wasted but the method is simple and effective. Braking torque decreases as
                      the motor slows — cannot hold at zero speed. Field must remain energised during braking.
                    </p>
                  </div>
                  <div className="bg-black/30 p-3 rounded">
                    <p className="text-sm font-medium text-red-400 mb-1">Plugging (Counter-Current Braking)</p>
                    <p className="text-xs text-white/80">
                      The armature supply is reversed while the motor is still running, applying torque in
                      the opposite direction. Very high braking torque but extremely high armature current
                      (supply voltage + back-EMF across the armature resistance). A current-limiting resistor
                      is essential. Energy from both the supply and the kinetic energy is dissipated as heat.
                      Motor must be disconnected at zero speed to prevent reverse running.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Commutator and Brush Maintenance */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Commutator and Brush Maintenance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The commutator and brushes are the components that distinguish DC machine maintenance from
              AC machine maintenance. They are the primary wearing parts and require regular skilled
              attention. Poor commutator condition leads to sparking, brush wear, motor damage, and
              ultimately machine failure.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-white mb-3">Commutator Inspection</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="py-2 pr-4 text-white/70 font-medium">Condition</th>
                      <th className="py-2 text-white/70 font-medium">Interpretation</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/90 text-xs">
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 text-green-400">Dark brown, even polish</td>
                      <td className="py-2">Healthy patina — good commutation</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 text-amber-400">Bright copper, scratched</td>
                      <td className="py-2">Abrasive contamination, wrong brush grade, or recently machined</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 text-red-400">Blackened or burnt segments</td>
                      <td className="py-2">Severe sparking — possibly shorted coils, high mica, or overloading</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 text-red-400">Copper drag (smearing)</td>
                      <td className="py-2">Copper from segments smeared across mica — will cause inter-segment short circuits</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 text-amber-400">High mica</td>
                      <td className="py-2">Mica protruding above copper surface — needs undercutting</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-white mb-3">Commutator Maintenance Tasks</p>
              <div className="space-y-3">
                <div className="bg-black/30 p-3 rounded">
                  <p className="text-sm font-medium text-blue-400 mb-1">Undercutting</p>
                  <p className="text-xs text-white/80">
                    Removing mica insulation to 1-1.5mm below the copper surface using a purpose-made
                    undercutting tool or small circular saw. Must produce a clean, square-bottomed slot
                    with no burrs or copper drag. Deburr segment edges after undercutting.
                  </p>
                </div>
                <div className="bg-black/30 p-3 rounded">
                  <p className="text-sm font-medium text-blue-400 mb-1">Skimming (Turning)</p>
                  <p className="text-xs text-white/80">
                    Machining the commutator surface in a lathe to restore a true cylindrical surface when
                    it becomes oval, eccentric, or has flat spots. Minimum diameter must not be exceeded.
                    Follow with undercutting and deburring. Run with old brushes initially to re-establish patina.
                  </p>
                </div>
                <div className="bg-black/30 p-3 rounded">
                  <p className="text-sm font-medium text-blue-400 mb-1">Cleaning</p>
                  <p className="text-xs text-white/80">
                    Remove carbon dust and brush debris with a vacuum cleaner (not compressed air, which
                    drives dust into insulation). Clean commutator surface with a lint-free cloth dampened
                    with approved solvent. Never use emery cloth — use only fine glass paper if abrasive
                    cleaning is needed, and only while the motor is running slowly.
                  </p>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-white mb-3">Brush Maintenance</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Brush grade:</strong> Must match the manufacturer's specification — wrong grade causes excessive wear, sparking, or commutator damage</li>
                <li className="pl-1"><strong>Brush length:</strong> Replace when worn to the minimum length mark (typically 50% of original length)</li>
                <li className="pl-1"><strong>Free movement:</strong> Brushes must slide freely in their holders without rocking or sticking</li>
                <li className="pl-1"><strong>Spring pressure:</strong> Check with a spring balance — typically 150-250 g/cm&sup2; of brush face area. Too light = sparking. Too heavy = rapid wear.</li>
                <li className="pl-1"><strong>Bedding in:</strong> New brushes must be bedded to the commutator curvature using fine glass paper wrapped around the commutator</li>
                <li className="pl-1"><strong>Pigtail connections:</strong> Check for fraying, loose connections, or broken strands</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
              <p className="text-sm font-medium text-elec-yellow mb-2">ST1426 Maintenance Competency</p>
              <p className="text-sm text-white/90">
                The Level 3 apprenticeship standard requires you to carry out inspection and maintenance of
                DC machines, including commutator assessment, brush replacement, insulation testing, and
                fault diagnosis. You should be able to identify the causes of poor commutation and take
                appropriate corrective action.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

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

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge — DC Motors"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section3-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Synchronous Motors
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section3-5">
              Next: Motor Starting Methods
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule2Section3_4;
