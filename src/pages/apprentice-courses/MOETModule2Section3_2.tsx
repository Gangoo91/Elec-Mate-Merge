import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Induction Motors - MOET Module 2.3.2";
const DESCRIPTION = "Understand three-phase and single-phase induction motors: rotating magnetic fields, slip, torque-speed characteristics, motor types, nameplate data, fault diagnosis, and maintenance for electrical maintenance technicians.";

const quickCheckQuestions = [
  {
    id: "slip-calculation",
    question: "A 4-pole induction motor operates on a 50Hz supply. The synchronous speed is 1,500 rev/min and the rotor runs at 1,440 rev/min. What is the slip?",
    options: [
      "2%",
      "4%",
      "6%",
      "10%"
    ],
    correctIndex: 1,
    explanation: "Slip = (Ns - Nr) / Ns x 100 = (1500 - 1440) / 1500 x 100 = 60/1500 x 100 = 4%. Typical full-load slip for a standard induction motor is between 3% and 6%. At no-load, slip is very small (less than 1%)."
  },
  {
    id: "squirrel-cage-advantage",
    question: "What is the PRIMARY advantage of a squirrel cage induction motor over a wound rotor motor?",
    options: [
      "Higher starting torque",
      "Variable speed capability",
      "Robust construction, low maintenance, no brushes or slip rings",
      "Better power factor at all loads"
    ],
    correctIndex: 2,
    explanation: "The squirrel cage rotor has no brushes, slip rings, or external rotor connections — it is essentially a set of aluminium or copper bars short-circuited by end rings. This makes it extremely robust, cheap to manufacture, and requires minimal maintenance. Over 90% of industrial motors are squirrel cage type."
  },
  {
    id: "bearing-failure-signs",
    question: "Which of the following is an early indication of bearing failure in an induction motor?",
    options: [
      "Reduced supply voltage",
      "Increased vibration levels and elevated bearing temperature",
      "Tripping on earth fault",
      "Reduced motor speed"
    ],
    correctIndex: 1,
    explanation: "Bearing failure typically shows early signs of increased vibration (detectable with a vibration analyser) and elevated bearing temperature. As the fault develops, you may also hear grinding or rumbling noises. Regular vibration monitoring is one of the most effective predictive maintenance techniques for rotating machinery."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What creates the rotating magnetic field in a three-phase induction motor?",
    options: [
      "The rotor windings energised through slip rings",
      "Three-phase currents in the stator windings, displaced 120 degrees apart",
      "A DC excitation current applied to the stator",
      "Permanent magnets on the rotor"
    ],
    correctAnswer: 1,
    explanation: "Three balanced currents, each displaced by 120 electrical degrees, flowing in the stator windings create a rotating magnetic field. This field rotates at synchronous speed (determined by frequency and number of poles) and induces currents in the rotor, which produce torque."
  },
  {
    id: 2,
    question: "The synchronous speed of a 2-pole motor on a 50Hz supply is:",
    options: [
      "1,500 rev/min",
      "3,000 rev/min",
      "750 rev/min",
      "1,000 rev/min"
    ],
    correctAnswer: 1,
    explanation: "Synchronous speed Ns = (120 x f) / p = (120 x 50) / 2 = 3,000 rev/min. A 2-pole motor has the highest synchronous speed. Adding more poles reduces the speed: 4-pole = 1,500, 6-pole = 1,000, 8-pole = 750 rev/min."
  },
  {
    id: 3,
    question: "Why can an induction motor rotor NEVER reach synchronous speed?",
    options: [
      "The supply voltage is too low",
      "Friction prevents it from reaching full speed",
      "If the rotor reached synchronous speed, there would be no relative motion between rotor and stator field, so no EMF would be induced and no torque produced",
      "The motor protection limits the speed"
    ],
    correctAnswer: 2,
    explanation: "The induction motor operates on the principle of relative motion between the rotating stator field and the rotor. If the rotor reached synchronous speed, there would be no relative motion, no change of flux through the rotor bars, no induced EMF, no rotor current, and therefore no torque. The rotor must always 'slip' behind the field."
  },
  {
    id: 4,
    question: "On a motor nameplate, the designation IP55 refers to:",
    options: [
      "The motor's power rating",
      "The motor's insulation class",
      "The degree of protection against solid objects (5) and water (5)",
      "The motor's efficiency class"
    ],
    correctAnswer: 2,
    explanation: "IP (Ingress Protection) is defined by BS EN 60529. The first digit (5) means 'dust protected' and the second digit (5) means 'protected against water jets from any direction'. IP55 is a common rating for motors used in industrial and outdoor environments."
  },
  {
    id: 5,
    question: "A single-phase capacitor-start motor uses a capacitor connected in series with the start winding to:",
    options: [
      "Reduce the supply voltage during starting",
      "Create a phase displacement between the start and run windings, simulating a two-phase supply to produce starting torque",
      "Improve the power factor at full load",
      "Limit the starting current to safe levels"
    ],
    correctAnswer: 1,
    explanation: "A single-phase supply alone cannot create a rotating magnetic field. The capacitor shifts the current in the start winding approximately 90 degrees ahead of the current in the run winding, creating a pseudo two-phase supply that produces a rotating field for starting. Once up to speed, a centrifugal switch disconnects the start winding."
  },
  {
    id: 6,
    question: "What is the typical full-load slip for a standard squirrel cage induction motor?",
    options: [
      "0% — it runs at synchronous speed",
      "3% to 6%",
      "15% to 20%",
      "50%"
    ],
    correctAnswer: 1,
    explanation: "Typical full-load slip for a standard squirrel cage motor is 3% to 6%. High-efficiency motors tend to have lower slip (closer to 3%). High-slip motors (used for intermittent loads like cranes) may have slip up to 10-15%."
  },
  {
    id: 7,
    question: "A wound rotor induction motor differs from a squirrel cage motor because:",
    options: [
      "It has more stator poles",
      "It has windings on the rotor connected to external resistance via slip rings and brushes",
      "It uses permanent magnets on the rotor",
      "It can only operate on single-phase supply"
    ],
    correctAnswer: 1,
    explanation: "The wound rotor has three-phase windings connected to external resistors through slip rings and brushes. This allows control of starting current and torque by varying the external resistance. As the motor accelerates, resistance is progressively reduced. Wound rotor motors are used for high-inertia loads requiring controlled starting."
  },
  {
    id: 8,
    question: "Which motor insulation class has a maximum operating temperature of 155 degrees C?",
    options: [
      "Class A (105 degrees C)",
      "Class B (130 degrees C)",
      "Class F (155 degrees C)",
      "Class H (180 degrees C)"
    ],
    correctAnswer: 2,
    explanation: "Insulation classes define the maximum safe operating temperature: Class A = 105 degrees C, Class B = 130 degrees C, Class F = 155 degrees C, Class H = 180 degrees C. Most modern industrial motors use Class F insulation. Exceeding the temperature rating accelerates insulation degradation — the '10 degree rule' states that insulation life halves for every 10 degrees C above the rated temperature."
  },
  {
    id: 9,
    question: "What causes 'single phasing' in a three-phase motor, and what are its effects?",
    options: [
      "A blown fuse or open conductor on one phase, causing the motor to run on two phases with increased current and overheating",
      "The motor running at synchronous speed",
      "Excessive supply voltage on all three phases",
      "A short circuit in the motor starter"
    ],
    correctAnswer: 0,
    explanation: "Single phasing occurs when one phase is lost (e.g., blown fuse, broken conductor, loose connection). The motor may continue to run but draws increased current on the remaining two phases, causing rapid overheating. A motor that is stationary will not start on single phase. This is why three-phase motors should be protected by overload relays on all three phases."
  },
  {
    id: 10,
    question: "When performing an insulation resistance test on a motor, which tests should be carried out?",
    options: [
      "Phase to earth only",
      "Phase to earth, and phase to phase on all combinations",
      "Phase to neutral only",
      "Only a continuity test"
    ],
    correctAnswer: 1,
    explanation: "A full motor IR test should include phase-to-earth (each phase to the motor frame) and phase-to-phase (between each pair of windings). This detects both earth faults and inter-winding insulation breakdown. Minimum acceptable value for a motor is typically 1 megohm per kV of rated voltage plus 1 megohm, though manufacturer's values should always be used."
  },
  {
    id: 11,
    question: "What is the purpose of the centrifugal switch in a single-phase capacitor-start motor?",
    options: [
      "To reverse the motor direction",
      "To disconnect the start winding and capacitor once the motor reaches approximately 75% speed",
      "To limit the running current",
      "To protect against overload"
    ],
    correctAnswer: 1,
    explanation: "The centrifugal switch is mounted on the motor shaft and opens at approximately 75% of full speed, disconnecting the start winding and its capacitor from the circuit. The motor then continues to run on the main winding alone. A faulty centrifugal switch is a common failure — if it fails to open, the start winding overheats; if it fails to close, the motor will not restart."
  },
  {
    id: 12,
    question: "Shaft misalignment between a motor and its driven load causes:",
    options: [
      "Reduced supply voltage",
      "Increased vibration, premature bearing failure, coupling wear, and increased energy consumption",
      "The motor to run at synchronous speed",
      "Tripping on earth fault"
    ],
    correctAnswer: 1,
    explanation: "Misalignment (angular, parallel, or axial) creates cyclic forces on the bearings and coupling, leading to excessive vibration, premature bearing and seal failure, coupling wear, and wasted energy. Laser alignment tools should be used during installation and after any maintenance that disturbs the alignment. Typical alignment tolerance is 0.05mm."
  }
];

const faqs = [
  {
    question: "How do I determine the direction of rotation of a three-phase motor?",
    answer: "The direction of rotation depends on the phase sequence of the supply connections to the motor terminals. Swapping any two of the three phase connections (e.g., swapping L1 and L2) will reverse the direction of rotation. Before connecting, check the required rotation direction from the driven equipment requirements. Use a phase rotation meter to confirm phase sequence before first start."
  },
  {
    question: "What causes a motor to trip on overload shortly after starting?",
    answer: "Common causes include: mechanical overload (seized bearing, jammed driven equipment, excessive belt tension), single phasing (one supply phase lost), low supply voltage (increases current draw), incorrect overload relay setting, and winding faults (inter-turn short circuits reducing impedance and increasing current). Systematically check each possibility before resetting and restarting."
  },
  {
    question: "Why is the starting current of an induction motor so high?",
    answer: "At standstill, the slip is 100% and the rotor impedance is at its lowest. The large relative speed between the stator field and the stationary rotor induces a large EMF in the rotor bars, driving a high current. The stator must supply this rotor current plus its own magnetising current, resulting in starting currents typically 6 to 8 times the full-load current. As the motor accelerates and slip decreases, the current falls."
  },
  {
    question: "How often should motor bearings be greased?",
    answer: "Bearing re-greasing intervals depend on the motor size, speed, bearing type, operating temperature, and environment. As a general guide: small motors (up to 30kW) every 6-12 months, medium motors (30-200kW) every 3-6 months, large motors or harsh environments every 1-3 months. Always use the correct grade and quantity of grease specified by the manufacturer. Over-greasing is as damaging as under-greasing — it causes overheating."
  },
  {
    question: "What is the difference between IE1, IE2, IE3, and IE4 efficiency classes?",
    answer: "IE (International Efficiency) classes define minimum motor efficiency levels per BS EN 60034-30-1. IE1 = Standard Efficiency, IE2 = High Efficiency, IE3 = Premium Efficiency, IE4 = Super Premium Efficiency. Since July 2023, EU regulations (EC 2019/1781) require that new motors from 0.75kW to 1,000kW must meet IE3 minimum, and motors from 75kW to 200kW must meet IE4 when operated with a VSD. Higher efficiency motors cost more but pay back through reduced energy consumption."
  }
];

const MOETModule2Section3_2 = () => {
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
            <span>Module 2.3.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Induction Motors
          </h1>
          <p className="text-white/80">
            The workhorse of industry — rotating magnetic fields, slip, torque characteristics, motor types, fault diagnosis, and maintenance
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Principle:</strong> Rotating stator field induces current in rotor, producing torque</li>
              <li className="pl-1"><strong>Slip:</strong> Rotor always runs slower than the field — typically 3-6% at full load</li>
              <li className="pl-1"><strong>Types:</strong> Squirrel cage (90%+ of motors) and wound rotor</li>
              <li className="pl-1"><strong>Faults:</strong> Bearing failure, winding insulation breakdown, shaft misalignment</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Context — Why This Matters</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Most common motor:</strong> Over 90% of industrial motors are induction type</li>
              <li className="pl-1"><strong>Energy:</strong> Electric motors consume approximately 45% of global electricity</li>
              <li className="pl-1"><strong>ST1426 requirement:</strong> Diagnose faults, perform maintenance, understand motor principles</li>
              <li className="pl-1"><strong>Cost impact:</strong> Motor failure causes expensive production downtime</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain how a rotating magnetic field is produced and how it creates torque in an induction motor",
              "Calculate synchronous speed and slip for motors with different pole numbers",
              "Compare squirrel cage and wound rotor induction motors and state their applications",
              "Describe single-phase motor types including capacitor-start, capacitor-run, and split phase",
              "Interpret motor nameplate data including power, voltage, current, IP rating, and insulation class",
              "Identify common motor faults and describe appropriate maintenance and testing procedures"
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

        {/* Section 1: The Rotating Magnetic Field and Motor Principle */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The Rotating Magnetic Field
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The three-phase induction motor is the most widely used electric motor in industry. Its operation
              depends on a fundamental principle: when three balanced alternating currents, each displaced by
              120 electrical degrees, flow through three sets of stator windings arranged symmetrically around
              the stator bore, they create a magnetic field that rotates at a constant speed. This rotating
              field is the driving force of the motor.
            </p>
            <p>
              The speed at which the magnetic field rotates is called the synchronous speed, and is determined
              by two factors: the supply frequency and the number of magnetic poles in the stator winding.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Synchronous Speed Formula</p>
              <div className="bg-black/30 p-3 rounded text-sm text-white/90 mb-3">
                <p className="font-mono">Ns = (120 x f) / p</p>
                <p className="text-xs text-white/60 mt-2">Where: Ns = synchronous speed (rev/min), f = supply frequency (Hz), p = number of poles</p>
              </div>
              <div className="overflow-x-auto mt-3">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="py-2 pr-4 text-white/70 font-medium">Poles</th>
                      <th className="py-2 pr-4 text-white/70 font-medium">Synchronous Speed (50Hz)</th>
                      <th className="py-2 text-white/70 font-medium">Typical Full-Load Speed</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/90">
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">2</td>
                      <td className="py-2 pr-4">3,000 rev/min</td>
                      <td className="py-2">2,880 - 2,950 rev/min</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">4</td>
                      <td className="py-2 pr-4">1,500 rev/min</td>
                      <td className="py-2">1,420 - 1,470 rev/min</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">6</td>
                      <td className="py-2 pr-4">1,000 rev/min</td>
                      <td className="py-2">940 - 970 rev/min</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">8</td>
                      <td className="py-2 pr-4">750 rev/min</td>
                      <td className="py-2">710 - 730 rev/min</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-white mb-3">Slip</p>
              <p className="text-sm text-white/90 mb-3">
                The rotor of an induction motor can never reach synchronous speed. If it did, there would
                be no relative motion between the rotor conductors and the rotating stator field, no change
                of flux linkage, no induced EMF, no rotor current, and no torque. The rotor must always
                "slip" behind the field.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm text-white/90 mb-3">
                <p className="font-medium mb-2">Slip Formula:</p>
                <p className="font-mono">s = (Ns - Nr) / Ns x 100%</p>
                <p className="text-xs text-white/60 mt-2">Where: s = slip (%), Ns = synchronous speed, Nr = rotor speed</p>
              </div>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>At no-load:</strong> Slip is very small (less than 1%) — rotor nearly reaches synchronous speed</li>
                <li className="pl-1"><strong>At full load:</strong> Typical slip is 3-6% for standard motors</li>
                <li className="pl-1"><strong>At standstill:</strong> Slip = 100% (starting condition)</li>
                <li className="pl-1"><strong>As load increases:</strong> Rotor slows down, slip increases, more torque is produced</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-white mb-3">Torque-Speed Characteristic</p>
              <p className="text-sm text-white/90 mb-3">
                The torque-speed curve of an induction motor shows how torque varies with speed from
                standstill to synchronous speed. Key points on the curve include:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Starting torque:</strong> Torque produced at standstill — typically 1.5 to 2.5 times full-load torque for a squirrel cage motor</li>
                <li className="pl-1"><strong>Pull-up torque:</strong> Minimum torque during acceleration — must exceed load torque at all speeds for successful starting</li>
                <li className="pl-1"><strong>Breakdown (pull-out) torque:</strong> Maximum torque the motor can produce — typically 2 to 3 times full-load torque</li>
                <li className="pl-1"><strong>Full-load torque:</strong> The rated continuous torque at the nameplate speed</li>
                <li className="pl-1"><strong>Stall:</strong> If the load torque exceeds the breakdown torque, the motor stalls and draws locked-rotor current</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Motor Types */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Motor Types: Squirrel Cage, Wound Rotor, and Single-Phase
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Induction motors come in several variants, each suited to different applications. The
              maintenance technician must recognise each type and understand its specific characteristics,
              advantages, and maintenance requirements.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-blue-500/10 border-l-2 border-blue-500/50">
                <h3 className="text-sm font-medium text-blue-400 mb-3">Squirrel Cage Induction Motor</h3>
                <p className="text-sm text-white/90 mb-3">
                  The most common industrial motor — accounts for over 90% of all motors in service. Named
                  for its rotor construction, which resembles a squirrel cage.
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Rotor:</strong> Cast aluminium or copper bars set in slots in the rotor core, short-circuited at each end by conducting rings</li>
                  <li className="pl-1"><strong>No brushes or slip rings:</strong> No external rotor connections, no wearing parts (except bearings)</li>
                  <li className="pl-1"><strong>Robust and reliable:</strong> Simple construction, low maintenance, long service life</li>
                  <li className="pl-1"><strong>Limitation:</strong> Fixed speed (determined by supply frequency and pole number) — speed control requires a VSD</li>
                  <li className="pl-1"><strong>High starting current:</strong> Typically 6-8 times full-load current — may require reduced-voltage starting methods</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-purple-500/10 border-l-2 border-purple-500/50">
                <h3 className="text-sm font-medium text-purple-400 mb-3">Wound Rotor Induction Motor</h3>
                <p className="text-sm text-white/90 mb-3">
                  Used for applications requiring high starting torque or controlled acceleration — such as
                  cranes, hoists, large fans, and crushers.
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Rotor:</strong> Three-phase windings connected to external resistance through slip rings and brushes</li>
                  <li className="pl-1"><strong>Speed control:</strong> Varying the external rotor resistance changes the torque-speed characteristic</li>
                  <li className="pl-1"><strong>Starting:</strong> Full rotor resistance inserted at start (reduces starting current, increases starting torque), then progressively removed as motor accelerates</li>
                  <li className="pl-1"><strong>Maintenance:</strong> Brushes and slip rings require regular inspection and replacement — more maintenance than squirrel cage</li>
                  <li className="pl-1"><strong>Declining use:</strong> Being replaced by squirrel cage motors with variable speed drives in many applications</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-green-400 mb-3">Single-Phase Induction Motors</h3>
                <p className="text-sm text-white/90 mb-3">
                  A single-phase supply cannot create a rotating magnetic field on its own — it produces a
                  pulsating field. Special arrangements are needed to produce starting torque.
                </p>
                <div className="space-y-3 mt-3">
                  <div className="bg-black/30 p-3 rounded">
                    <p className="text-sm font-medium text-white mb-1">Capacitor-Start Motor</p>
                    <p className="text-xs text-white/80">
                      Has a start winding with a capacitor in series, creating a phase displacement that simulates
                      a two-phase supply. A centrifugal switch disconnects the start winding at approximately 75% speed.
                      Good starting torque — used for compressors, pumps, and machine tools up to about 3kW.
                    </p>
                  </div>
                  <div className="bg-black/30 p-3 rounded">
                    <p className="text-sm font-medium text-white mb-1">Capacitor-Start, Capacitor-Run Motor</p>
                    <p className="text-xs text-white/80">
                      Two capacitors: a large electrolytic capacitor for starting (switched out by centrifugal switch)
                      and a smaller oil-filled capacitor that remains in circuit during running. Better running
                      performance and power factor than capacitor-start alone.
                    </p>
                  </div>
                  <div className="bg-black/30 p-3 rounded">
                    <p className="text-sm font-medium text-white mb-1">Split-Phase Motor</p>
                    <p className="text-xs text-white/80">
                      Uses a start winding with higher resistance (thinner wire) to create a small phase displacement
                      from the run winding. Lower starting torque than capacitor-start. Used for light-duty applications
                      such as fans and small pumps. Centrifugal switch disconnects start winding.
                    </p>
                  </div>
                  <div className="bg-black/30 p-3 rounded">
                    <p className="text-sm font-medium text-white mb-1">Shaded-Pole Motor</p>
                    <p className="text-xs text-white/80">
                      Simplest single-phase motor — a copper ring (shading coil) on part of each pole face delays
                      the flux in that area, creating a weak rotating component. Very low starting torque, low
                      efficiency, small ratings only. Used for fans, small pumps, and domestic appliances.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Motor Nameplate Data and Selection */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Motor Nameplate Data and Selection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Every motor carries a nameplate (rating plate) that provides essential information for
              installation, operation, and maintenance. Understanding nameplate data is a core competency
              for the maintenance technician — it tells you everything you need to know about the motor's
              design operating conditions.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Key Nameplate Parameters</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="py-2 pr-4 text-white/70 font-medium">Parameter</th>
                      <th className="py-2 text-white/70 font-medium">Meaning</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/90 text-xs">
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 font-medium">Rated Power (kW)</td>
                      <td className="py-2">Mechanical output power at the shaft at full load</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 font-medium">Rated Voltage (V)</td>
                      <td className="py-2">Supply voltage for rated performance (e.g., 400V, 690V)</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 font-medium">Rated Current (A)</td>
                      <td className="py-2">Full-load current at rated voltage and power</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 font-medium">Rated Speed (rev/min)</td>
                      <td className="py-2">Full-load speed — slightly less than synchronous speed due to slip</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 font-medium">Power Factor (cos phi)</td>
                      <td className="py-2">The ratio of real power to apparent power at full load</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 font-medium">Efficiency (%)</td>
                      <td className="py-2">Ratio of mechanical output to electrical input (IE class)</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 font-medium">Insulation Class</td>
                      <td className="py-2">Maximum winding temperature (B=130, F=155, H=180 degrees C)</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 font-medium">IP Rating</td>
                      <td className="py-2">Ingress protection (e.g., IP55 = dust protected, water jets)</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 font-medium">Duty Type (S1-S10)</td>
                      <td className="py-2">S1 = continuous, S2 = short-time, S3 = intermittent periodic</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-medium">Connection (Delta/Star)</td>
                      <td className="py-2">Winding configuration: delta for lower voltage, star for higher</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-white mb-3">Motor Selection Considerations</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Load torque profile:</strong> Constant torque (conveyors), variable torque (fans, pumps), or high starting torque (crushers)</li>
                <li className="pl-1"><strong>Duty cycle:</strong> Continuous (S1), intermittent (S3), or short-time (S2) — affects thermal rating</li>
                <li className="pl-1"><strong>Environment:</strong> Temperature, altitude, humidity, dust, corrosive gases — determines enclosure (IP rating) and cooling method</li>
                <li className="pl-1"><strong>Starting method:</strong> DOL, star-delta, soft starter, or VSD — affects motor design and cable sizing</li>
                <li className="pl-1"><strong>Speed requirements:</strong> Fixed speed or variable speed — VSD compatibility may require inverter-duty insulation</li>
                <li className="pl-1"><strong>Efficiency class:</strong> IE3 minimum for most applications (current regulations)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: Common Faults and Maintenance */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Common Faults and Maintenance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding common motor failure modes enables the maintenance technician to implement
              effective preventive and predictive maintenance strategies, reducing unplanned downtime and
              extending motor service life.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
                <p className="text-sm font-medium text-red-400 mb-3">Bearing Failure (40-50% of motor failures)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Causes:</strong> Inadequate or excessive lubrication, contamination, misalignment, overloading, electrical discharge (VSD-induced shaft currents)</li>
                  <li className="pl-1"><strong>Symptoms:</strong> Increased vibration, elevated temperature, noise (grinding, rumbling), shaft play</li>
                  <li className="pl-1"><strong>Prevention:</strong> Correct lubrication schedule, vibration monitoring, laser alignment, shaft grounding (for VSD applications)</li>
                  <li className="pl-1"><strong>Testing:</strong> Vibration analysis (time domain and frequency spectrum), bearing temperature monitoring, acoustic emission</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-amber-500/10 border-l-2 border-amber-500/50">
                <p className="text-sm font-medium text-amber-400 mb-3">Winding Insulation Failure (30-40% of motor failures)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Causes:</strong> Thermal ageing (10 degree rule), moisture ingress, voltage spikes (VSD dV/dt), contamination, mechanical damage</li>
                  <li className="pl-1"><strong>Symptoms:</strong> Tripping on earth fault or overcurrent, reduced IR readings, increased winding temperature, smell of burnt insulation</li>
                  <li className="pl-1"><strong>Prevention:</strong> Correct operating temperature, clean environment, surge protection for VSD-fed motors</li>
                  <li className="pl-1"><strong>Testing:</strong> Insulation resistance (IR), polarisation index (PI), surge comparison test, motor circuit analysis (MCA)</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-white mb-3">Shaft Misalignment</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Types:</strong> Angular (shaft axes at an angle), parallel/offset (shaft axes parallel but displaced), axial (excessive end-play)</li>
                  <li className="pl-1"><strong>Symptoms:</strong> Vibration at 1x and 2x running speed, premature bearing and coupling failure, seal leaks, excessive energy consumption</li>
                  <li className="pl-1"><strong>Prevention:</strong> Laser alignment during installation and after any work that disturbs the motor position</li>
                  <li className="pl-1"><strong>Tolerance:</strong> Typically 0.05mm offset and 0.05mm/100mm angular for standard couplings</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-white mb-3">Electrical Supply Problems</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Single phasing:</strong> Loss of one supply phase — motor runs hot on remaining phases, uneven magnetic pull</li>
                  <li className="pl-1"><strong>Voltage unbalance:</strong> Even a small voltage unbalance (2%) can cause significant current unbalance (12-15%) and overheating</li>
                  <li className="pl-1"><strong>Undervoltage:</strong> Motor draws more current to maintain torque, increasing copper losses and heat</li>
                  <li className="pl-1"><strong>Overvoltage:</strong> Increases iron losses and magnetising current, can damage insulation</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
              <p className="text-sm font-medium text-elec-yellow mb-2">ST1426 Maintenance Competency</p>
              <p className="text-sm text-white/90">
                The Level 3 apprenticeship standard (ST1426) requires you to diagnose motor faults using
                a systematic approach, carry out routine maintenance including lubrication, alignment checks,
                and electrical testing, interpret motor nameplate data, and select replacement motors to match
                the application requirements.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

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
            title="Test Your Knowledge — Induction Motors"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section3-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Transformers
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section3-3">
              Next: Synchronous Motors
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule2Section3_2;
