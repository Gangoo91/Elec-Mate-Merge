import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Induction Motors (Construction, Operation, Performance) - HNC Module 3 Section 5.4";
const DESCRIPTION = "Master three-phase induction motor principles: squirrel cage vs wound rotor construction, rotating magnetic field theory, slip calculations, torque-speed characteristics and building services applications.";

const quickCheckQuestions = [
  {
    id: "sync-speed",
    question: "What is the synchronous speed of a 4-pole motor on a 50Hz supply?",
    options: ["1000 rev/min", "1500 rev/min", "3000 rev/min", "750 rev/min"],
    correctIndex: 1,
    explanation: "Synchronous speed ns = (120 x f) / p = (120 x 50) / 4 = 1500 rev/min. The motor runs slightly slower than this due to slip."
  },
  {
    id: "slip-calc",
    question: "A 4-pole, 50Hz motor runs at 1440 rev/min. What is the slip?",
    options: ["2%", "4%", "5%", "6%"],
    correctIndex: 1,
    explanation: "Slip s = (ns - nr) / ns = (1500 - 1440) / 1500 = 60/1500 = 0.04 = 4%. This is typical for a fully loaded motor."
  },
  {
    id: "starting-current",
    question: "A motor has a full load current of 25A. What starting current would you expect with DOL starting?",
    options: ["25-50A", "75-100A", "150-200A", "250-300A"],
    correctIndex: 2,
    explanation: "DOL starting current is typically 6-8 times FLC. For 25A FLC: 25 x 6 = 150A to 25 x 8 = 200A. This is why reduced voltage starting methods are used for larger motors."
  },
  {
    id: "rotor-type",
    question: "Which rotor type is most commonly used in HVAC applications?",
    options: ["Wound rotor", "Squirrel cage", "Salient pole", "Cylindrical"],
    correctIndex: 1,
    explanation: "Squirrel cage rotors dominate HVAC applications due to their robust construction, low maintenance, and cost-effectiveness. They have no brushes, slip rings, or external rotor connections."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What creates the rotating magnetic field in a three-phase induction motor?",
    options: [
      "Permanent magnets in the stator",
      "Three-phase currents in spatially displaced stator windings",
      "DC excitation of the rotor",
      "Commutator action"
    ],
    correctAnswer: 1,
    explanation: "Three-phase currents displaced by 120 degrees, flowing through windings physically displaced by 120 degrees, create a smoothly rotating magnetic field at synchronous speed."
  },
  {
    id: 2,
    question: "Why must the rotor of an induction motor run slower than synchronous speed?",
    options: [
      "To reduce noise and vibration",
      "To allow relative motion between rotor and field, inducing rotor current",
      "To prevent overheating",
      "To match the load speed"
    ],
    correctAnswer: 1,
    explanation: "If the rotor ran at synchronous speed, there would be no relative motion between the rotor conductors and the rotating field. No relative motion means no induced EMF, no rotor current, and therefore no torque."
  },
  {
    id: 3,
    question: "A 2-pole motor operates on a 50Hz supply. Calculate the synchronous speed.",
    options: ["1500 rev/min", "3000 rev/min", "1000 rev/min", "750 rev/min"],
    correctAnswer: 1,
    explanation: "ns = (120 x f) / p = (120 x 50) / 2 = 3000 rev/min. Two-pole motors have the highest synchronous speed for a given frequency."
  },
  {
    id: 4,
    question: "At what point on the torque-speed curve is maximum torque developed?",
    options: [
      "At synchronous speed",
      "At zero speed (starting)",
      "At the pull-out point (typically 20-30% slip)",
      "At full load speed"
    ],
    correctAnswer: 2,
    explanation: "Maximum (breakdown) torque occurs at the pull-out point, typically at 20-30% slip. Beyond this point, increasing slip reduces torque and the motor stalls."
  },
  {
    id: 5,
    question: "What is the typical power factor of an induction motor at no load?",
    options: ["0.95 lagging", "0.85 lagging", "0.5 lagging", "0.2-0.3 lagging"],
    correctAnswer: 3,
    explanation: "At no load, the motor draws mainly magnetising current with very little active power component. Power factor is very low (0.2-0.3 lagging) and improves significantly as load increases."
  },
  {
    id: 6,
    question: "What does the efficiency class IE3 indicate on a motor nameplate?",
    options: [
      "Standard efficiency",
      "High efficiency",
      "Premium efficiency",
      "Super premium efficiency"
    ],
    correctAnswer: 2,
    explanation: "IE3 indicates Premium Efficiency per IEC 60034-30-1. IE1 = Standard, IE2 = High, IE3 = Premium, IE4 = Super Premium. Building services should specify IE3 minimum for energy efficiency."
  },
  {
    id: 7,
    question: "A motor nameplate shows 'Duty: S1'. What does this mean?",
    options: [
      "Intermittent duty with starting",
      "Continuous running duty",
      "Short-time duty",
      "Periodic duty with braking"
    ],
    correctAnswer: 1,
    explanation: "S1 indicates continuous running duty - the motor can run indefinitely at rated load. HVAC fans and pumps typically require S1 duty rating."
  },
  {
    id: 8,
    question: "Why might a wound rotor motor be specified instead of squirrel cage for a large pump?",
    options: [
      "Lower initial cost",
      "Higher efficiency at full load",
      "Reduced starting current and adjustable starting torque",
      "Smaller physical size"
    ],
    correctAnswer: 2,
    explanation: "Wound rotor motors allow external resistance to be added to the rotor circuit, reducing starting current and providing high starting torque. This is valuable for large pumps where supply limitations exist."
  },
  {
    id: 9,
    question: "An AHU fan motor draws 45A at full load with 0.85 power factor. What is the apparent power on 400V three-phase?",
    options: ["15.3 kVA", "26.5 kVA", "31.2 kVA", "45.0 kVA"],
    correctAnswer: 2,
    explanation: "S = root3 x VL x IL = 1.732 x 400 x 45 = 31,177 VA = 31.2 kVA. The power factor determines the real power: P = S x pf = 31.2 x 0.85 = 26.5 kW."
  },
  {
    id: 10,
    question: "What is the primary advantage of using a VSD with an HVAC fan motor?",
    options: [
      "Eliminates the need for motor protection",
      "Energy savings through speed control matching actual demand",
      "Increases motor starting torque",
      "Allows operation above synchronous speed"
    ],
    correctAnswer: 1,
    explanation: "VSDs allow fan speed to match actual airflow demand. Since fan power varies with the cube of speed, reducing speed by 20% reduces power by approximately 50%. This delivers significant energy savings in variable load HVAC systems."
  }
];

const faqs = [
  {
    question: "Why is slip essential for induction motor operation?",
    answer: "Slip is the relative speed difference between the rotating magnetic field and the rotor. Without slip, rotor conductors would not cut through magnetic flux lines, so no EMF would be induced in the rotor. No EMF means no rotor current, and without rotor current there can be no torque. The motor self-regulates: as load increases, speed drops, slip increases, more current is induced, and more torque is produced."
  },
  {
    question: "How do I size a motor for a centrifugal pump or fan?",
    answer: "Calculate the mechanical power required: for pumps P = (Q x H x rho x g) / eta, for fans P = (Q x deltaP) / eta. Add a service factor (typically 1.1-1.25) to account for uncertainties and ensure the motor is not continuously overloaded. Select the next standard motor size up from your calculated requirement. Check that starting torque exceeds the load torque at all speeds."
  },
  {
    question: "What causes poor power factor in induction motors?",
    answer: "Induction motors require magnetising current to establish the rotating magnetic field. This magnetising current is reactive (lagging) and does not contribute to mechanical power output. At light loads, magnetising current dominates, giving very poor power factor (0.2-0.4). At full load, the active current component increases, improving power factor to typically 0.85-0.9. Oversized motors operating at light load have chronically poor power factor."
  },
  {
    question: "When should I specify a wound rotor motor over squirrel cage?",
    answer: "Wound rotor motors are specified when: (1) starting current must be limited due to supply constraints, (2) high starting torque is required for high-inertia loads, (3) speed control via rotor resistance is acceptable, or (4) the application involves frequent starting and stopping. However, modern VSDs have largely replaced wound rotor motors for most applications as they offer better control with squirrel cage motors."
  },
  {
    question: "How do I interpret motor nameplate data for building services design?",
    answer: "Key parameters: rated power (kW), voltage (400V for three-phase UK), full load current (for cable sizing), efficiency class (IE3 minimum for new installations), power factor (for supply sizing), speed (determines pole number and slip), duty type (S1 for continuous HVAC), insulation class (F typical), and IP rating (IP55 minimum for plant rooms). The rated current is particularly important for circuit design - size cables, protection, and switchgear accordingly."
  },
  {
    question: "What efficiency class should I specify for HVAC motors?",
    answer: "Current EU regulations (Ecodesign Directive) require IE3 minimum for motors 0.75-375 kW in most applications. IE4 (Super Premium) is recommended for motors with long running hours such as main AHU fans and chilled water pumps. The energy savings over the motor lifetime typically justify the higher capital cost within 1-2 years for continuously running motors."
  }
];

const HNCModule3Section5_4 = () => {
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
            <span>Module 3.5.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Induction Motors
          </h1>
          <p className="text-white/80">
            Construction, operation, performance characteristics and building services applications
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Principle:</strong> Rotating magnetic field induces current in rotor</li>
              <li className="pl-1"><strong>Slip:</strong> s = (ns - nr) / ns, typically 2-5% at full load</li>
              <li className="pl-1"><strong>Starting current:</strong> 6-8 times full load current (DOL)</li>
              <li className="pl-1"><strong>Power factor:</strong> Poor at light load, improves with loading</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>HVAC fans:</strong> Squirrel cage with VSD control</li>
              <li className="pl-1"><strong>Pumps:</strong> Centrifugal load characteristics</li>
              <li className="pl-1"><strong>Compressors:</strong> High starting torque requirements</li>
              <li className="pl-1"><strong>Efficiency:</strong> IE3 minimum for new installations</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Compare squirrel cage and wound rotor motor construction",
              "Explain rotating magnetic field generation in three-phase stators",
              "Calculate synchronous speed and slip for various pole configurations",
              "Analyse torque-speed characteristics and motor loading",
              "Understand starting current implications and starting methods",
              "Interpret motor nameplate data for building services design"
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

        {/* Section 1: Motor Construction */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Motor Construction - Stator and Rotor
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Three-phase induction motors consist of two main components: a stationary stator carrying
              the three-phase windings, and a rotating rotor. The type of rotor construction determines
              the motor's characteristics and applications.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Stator Construction (Common to Both Types)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Laminated silicon steel core to reduce eddy current losses</li>
                <li className="pl-1">Slots around the inner circumference for windings</li>
                <li className="pl-1">Three-phase windings displaced by 120 electrical degrees</li>
                <li className="pl-1">Windings connected in star or delta configuration</li>
                <li className="pl-1">Terminal box with six terminals for connection flexibility</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Rotor Types Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Feature</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Squirrel Cage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Wound Rotor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Construction</td>
                      <td className="border border-white/10 px-3 py-2">Aluminium/copper bars short-circuited by end rings</td>
                      <td className="border border-white/10 px-3 py-2">Three-phase windings connected to slip rings</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">External connections</td>
                      <td className="border border-white/10 px-3 py-2">None - completely enclosed</td>
                      <td className="border border-white/10 px-3 py-2">Slip rings and brushes for external resistance</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Maintenance</td>
                      <td className="border border-white/10 px-3 py-2">Very low - bearings only</td>
                      <td className="border border-white/10 px-3 py-2">Higher - brushes and slip rings require attention</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Starting current</td>
                      <td className="border border-white/10 px-3 py-2">High (6-8 x FLC)</td>
                      <td className="border border-white/10 px-3 py-2">Controllable via external resistance</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Starting torque</td>
                      <td className="border border-white/10 px-3 py-2">Moderate (1.5-2.5 x rated)</td>
                      <td className="border border-white/10 px-3 py-2">High and adjustable</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Speed control</td>
                      <td className="border border-white/10 px-3 py-2">VSD required for variable speed</td>
                      <td className="border border-white/10 px-3 py-2">Limited control via rotor resistance</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cost</td>
                      <td className="border border-white/10 px-3 py-2">Lower</td>
                      <td className="border border-white/10 px-3 py-2">Higher</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Typical applications</td>
                      <td className="border border-white/10 px-3 py-2">HVAC fans, pumps, general machinery</td>
                      <td className="border border-white/10 px-3 py-2">Cranes, hoists, large compressors</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Building services:</strong> Squirrel cage motors dominate HVAC applications (over 90%) due to their
              reliability, low maintenance, and compatibility with VSDs for energy-efficient speed control.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 2: Rotating Magnetic Field */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Rotating Magnetic Field Principle
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The rotating magnetic field is the fundamental principle enabling induction motor operation.
              Three-phase currents, displaced by 120 degrees in time, flow through windings displaced by
              120 degrees in space, creating a magnetic field that rotates at synchronous speed.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Synchronous Speed Formula</p>
              <p className="font-mono text-center text-lg mb-2">n<sub>s</sub> = (120 x f) / p</p>
              <p className="text-xs text-white/70 text-center">Where: ns = synchronous speed (rev/min), f = frequency (Hz), p = number of poles</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Synchronous Speeds at 50Hz</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Poles</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Synchronous Speed</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Running Speed</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Common Applications</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2</td>
                      <td className="border border-white/10 px-3 py-2">3000 rev/min</td>
                      <td className="border border-white/10 px-3 py-2">2850-2950 rev/min</td>
                      <td className="border border-white/10 px-3 py-2">Small pumps, fans</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4</td>
                      <td className="border border-white/10 px-3 py-2">1500 rev/min</td>
                      <td className="border border-white/10 px-3 py-2">1420-1480 rev/min</td>
                      <td className="border border-white/10 px-3 py-2">Most HVAC motors, general purpose</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">6</td>
                      <td className="border border-white/10 px-3 py-2">1000 rev/min</td>
                      <td className="border border-white/10 px-3 py-2">940-980 rev/min</td>
                      <td className="border border-white/10 px-3 py-2">Larger fans, cooling towers</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">8</td>
                      <td className="border border-white/10 px-3 py-2">750 rev/min</td>
                      <td className="border border-white/10 px-3 py-2">700-740 rev/min</td>
                      <td className="border border-white/10 px-3 py-2">Low-speed applications</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">How the rotating field develops:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">At any instant, the three-phase currents have different magnitudes and directions</li>
                <li className="pl-1">The resultant magnetic field has constant magnitude but rotates in space</li>
                <li className="pl-1">The field completes one revolution per cycle for a 2-pole motor</li>
                <li className="pl-1">More poles means more field reversals per revolution, hence lower speed</li>
                <li className="pl-1">Reversing any two supply phases reverses the direction of rotation</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key insight:</strong> The rotating field speed depends only on supply frequency and number of poles.
              VSDs control motor speed by varying supply frequency.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 3: Slip */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Slip - The Essential Speed Difference
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Slip is the relative difference between synchronous speed and actual rotor speed. It is
              essential for motor operation: without slip, no EMF would be induced in the rotor
              conductors and no torque could be produced.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Slip Formula</p>
              <p className="font-mono text-center text-lg mb-2">s = (n<sub>s</sub> - n<sub>r</sub>) / n<sub>s</sub></p>
              <p className="text-xs text-white/70 text-center">Where: s = slip (per-unit or %), ns = synchronous speed, nr = rotor speed</p>
            </div>

            <div className="grid sm:grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-white/5">
                <p className="font-bold text-elec-yellow mb-1">No Load</p>
                <p className="text-white/90">s = 1-2%</p>
                <p className="text-white/60 text-xs">Just enough slip to overcome friction</p>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="font-bold text-elec-yellow mb-1">Full Load</p>
                <p className="text-white/90">s = 3-5%</p>
                <p className="text-white/60 text-xs">Normal operating range</p>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="font-bold text-elec-yellow mb-1">Starting</p>
                <p className="text-white/90">s = 100%</p>
                <p className="text-white/60 text-xs">Rotor stationary</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Why slip is essential:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Rotor conductors must cut through the rotating magnetic field</li>
                <li className="pl-1">Relative motion induces EMF in rotor (Faraday's law)</li>
                <li className="pl-1">EMF drives current through the shorted rotor bars</li>
                <li className="pl-1">Rotor current interacts with stator field to produce torque</li>
                <li className="pl-1">As load increases, speed drops, slip increases, more torque produced</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Worked Example: Slip Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 6-pole motor on 50Hz supply runs at 960 rev/min. Calculate the slip.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Synchronous speed: ns = (120 x 50) / 6 = 1000 rev/min</p>
                <p className="mt-2">Slip: s = (1000 - 960) / 1000 = 0.04 = <strong>4%</strong></p>
                <p className="mt-2 text-white/60">This indicates the motor is operating near full load</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical note:</strong> Motor nameplate speed indicates the full-load running speed,
              from which you can determine the slip and verify the number of poles.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Torque-Speed Characteristics */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Torque-Speed Characteristics
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The torque-speed curve is crucial for understanding motor behaviour under different loading
              conditions and for matching motors to mechanical loads in building services applications.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Points on the Torque-Speed Curve</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Operating Point</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Slip</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Torque</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Starting torque</td>
                      <td className="border border-white/10 px-3 py-2">s = 1 (100%)</td>
                      <td className="border border-white/10 px-3 py-2">1.5-2.5 x rated</td>
                      <td className="border border-white/10 px-3 py-2">Motor stationary, maximum slip</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pull-up torque</td>
                      <td className="border border-white/10 px-3 py-2">s = 0.6-0.8</td>
                      <td className="border border-white/10 px-3 py-2">Minimum during acceleration</td>
                      <td className="border border-white/10 px-3 py-2">Must exceed load torque at all speeds</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Breakdown torque</td>
                      <td className="border border-white/10 px-3 py-2">s = 0.15-0.30</td>
                      <td className="border border-white/10 px-3 py-2">2-3 x rated (maximum)</td>
                      <td className="border border-white/10 px-3 py-2">Pull-out point - motor stalls if exceeded</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Full load</td>
                      <td className="border border-white/10 px-3 py-2">s = 0.03-0.05</td>
                      <td className="border border-white/10 px-3 py-2">Rated torque</td>
                      <td className="border border-white/10 px-3 py-2">Normal operating point</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">No load</td>
                      <td className="border border-white/10 px-3 py-2">s = 0.01-0.02</td>
                      <td className="border border-white/10 px-3 py-2">Minimal (friction only)</td>
                      <td className="border border-white/10 px-3 py-2">Near synchronous speed</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Synchronous</td>
                      <td className="border border-white/10 px-3 py-2">s = 0</td>
                      <td className="border border-white/10 px-3 py-2">Zero</td>
                      <td className="border border-white/10 px-3 py-2">Theoretical - never reached</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Stable Operating Region</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Between no-load and breakdown torque</li>
                  <li className="pl-1">Torque increases as speed decreases (self-regulating)</li>
                  <li className="pl-1">Motor automatically adjusts to load changes</li>
                  <li className="pl-1">Slight speed droop with increasing load</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Unstable Region</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Below breakdown torque (high slip)</li>
                  <li className="pl-1">Torque decreases as speed decreases</li>
                  <li className="pl-1">Motor stalls if load exceeds breakdown torque</li>
                  <li className="pl-1">Only passed through during starting</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Load Matching in Building Services</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Fans and pumps:</strong> Torque proportional to speed squared (T ~ n squared) - easy starting</li>
                <li className="pl-1"><strong>Compressors:</strong> May require high starting torque, often started unloaded</li>
                <li className="pl-1"><strong>Conveyors:</strong> Constant torque loads - starting torque must exceed load torque</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design requirement:</strong> Always ensure the motor torque exceeds the load torque at all speeds
              from starting to full load, with adequate margin for voltage variations.
            </p>
          </div>
        </section>

        {/* Section 5: Starting Current */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Starting Current and Starting Methods
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              At starting, with the rotor stationary (100% slip), the motor acts like a short-circuited
              transformer. The starting current is typically 6-8 times full load current, which has
              significant implications for supply design and motor protection.
            </p>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Starting Current Impact</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Voltage dip on supply affecting other equipment</li>
                <li className="pl-1">Increased cable sizing requirements</li>
                <li className="pl-1">Higher rated switchgear and protection</li>
                <li className="pl-1">Supply authority limitations (often 100A maximum starting current)</li>
                <li className="pl-1">Generator capacity constraints in standby systems</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Starting Methods Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Starting Current</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Starting Torque</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Direct On Line (DOL)</td>
                      <td className="border border-white/10 px-3 py-2">6-8 x FLC</td>
                      <td className="border border-white/10 px-3 py-2">100%</td>
                      <td className="border border-white/10 px-3 py-2">Small motors up to 7.5kW</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Star-Delta</td>
                      <td className="border border-white/10 px-3 py-2">2-2.7 x FLC</td>
                      <td className="border border-white/10 px-3 py-2">33%</td>
                      <td className="border border-white/10 px-3 py-2">Medium motors, light starting loads</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Autotransformer</td>
                      <td className="border border-white/10 px-3 py-2">Adjustable (40-80%)</td>
                      <td className="border border-white/10 px-3 py-2">Proportional to voltage squared</td>
                      <td className="border border-white/10 px-3 py-2">Large motors, adjustable reduction needed</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Soft Starter</td>
                      <td className="border border-white/10 px-3 py-2">2-4 x FLC (adjustable)</td>
                      <td className="border border-white/10 px-3 py-2">Adjustable ramp</td>
                      <td className="border border-white/10 px-3 py-2">Pumps, conveyors, smooth acceleration</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">VSD (Variable Speed Drive)</td>
                      <td className="border border-white/10 px-3 py-2">1-1.5 x FLC</td>
                      <td className="border border-white/10 px-3 py-2">Up to 150% available</td>
                      <td className="border border-white/10 px-3 py-2">All HVAC applications with speed control</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Wound Rotor (resistance)</td>
                      <td className="border border-white/10 px-3 py-2">1.5-2 x FLC</td>
                      <td className="border border-white/10 px-3 py-2">High and adjustable</td>
                      <td className="border border-white/10 px-3 py-2">Cranes, hoists, high-inertia loads</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Worked Example: Starting Current</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 22kW motor has FLC of 42A. Calculate starting currents for DOL and star-delta.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>DOL starting current = 7 x 42A = <strong>294A</strong></p>
                <p className="mt-2">Star-delta starting current = 294 / 3 = <strong>98A</strong></p>
                <p className="mt-2 text-white/60">Star-delta reduces current to 1/3 but also reduces torque to 1/3</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Building services standard:</strong> VSDs are now the preferred starting method for HVAC motors as they provide soft
              starting (low starting current), speed control for energy saving, and eliminate the need for star-delta changeover.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 6: Power Factor Variation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Power Factor Variation with Load
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Induction motors always operate at lagging power factor because they require reactive
              power to establish the rotating magnetic field. The power factor varies significantly
              with load, which has important implications for electrical system design.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Power Factor vs Loading</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Load</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Power Factor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Explanation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">No load</td>
                      <td className="border border-white/10 px-3 py-2">0.15-0.30</td>
                      <td className="border border-white/10 px-3 py-2">Mainly magnetising current (reactive)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">25% load</td>
                      <td className="border border-white/10 px-3 py-2">0.50-0.60</td>
                      <td className="border border-white/10 px-3 py-2">Increasing active power component</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">50% load</td>
                      <td className="border border-white/10 px-3 py-2">0.70-0.80</td>
                      <td className="border border-white/10 px-3 py-2">Active and reactive comparable</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">75% load</td>
                      <td className="border border-white/10 px-3 py-2">0.80-0.88</td>
                      <td className="border border-white/10 px-3 py-2">Approaching optimum</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">100% load</td>
                      <td className="border border-white/10 px-3 py-2">0.85-0.92</td>
                      <td className="border border-white/10 px-3 py-2">Best power factor for the motor</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Overload</td>
                      <td className="border border-white/10 px-3 py-2">0.88-0.93</td>
                      <td className="border border-white/10 px-3 py-2">Slight improvement but not sustainable</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Effects of Poor Power Factor</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Higher current for same real power (I = P / (V x pf))</li>
                  <li className="pl-1">Increased cable and switchgear sizing</li>
                  <li className="pl-1">Higher I squared R losses in cables</li>
                  <li className="pl-1">Reactive power charges from DNO</li>
                  <li className="pl-1">Reduced transformer and generator capacity</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Power Factor Improvement Methods</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Capacitor banks (individual or central)</li>
                  <li className="pl-1">Correct motor sizing (avoid oversizing)</li>
                  <li className="pl-1">High-efficiency motors (better pf)</li>
                  <li className="pl-1">VSDs (some models offer pf correction)</li>
                  <li className="pl-1">Synchronous motors (can provide leading pf)</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Worked Example: Power Factor Impact</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 15kW load at 0.7 pf vs 0.9 pf on 400V three-phase. Compare currents.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>At 0.7 pf: I = 15000 / (1.732 x 400 x 0.7) = <strong>30.9A</strong></p>
                <p className="mt-2">At 0.9 pf: I = 15000 / (1.732 x 400 x 0.9) = <strong>24.0A</strong></p>
                <p className="mt-2 text-white/60">Improving pf from 0.7 to 0.9 reduces current by 22%</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design practice:</strong> Size motors correctly for the expected load. An oversized motor running
              at light load has poor power factor and reduced efficiency - a common problem in building services.
            </p>
          </div>
        </section>

        {/* Section 7: Motor Nameplate Data */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Motor Nameplate Data Interpretation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The motor nameplate contains essential information for installation, protection,
              and circuit design. Understanding this data is critical for building services engineers.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Nameplate Information</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Parameter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Example Value</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Design Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Rated power</td>
                      <td className="border border-white/10 px-3 py-2">15 kW</td>
                      <td className="border border-white/10 px-3 py-2">Load matching, energy calculations</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Voltage</td>
                      <td className="border border-white/10 px-3 py-2">400V Delta / 690V Star</td>
                      <td className="border border-white/10 px-3 py-2">Connection configuration, VSD compatibility</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Full load current</td>
                      <td className="border border-white/10 px-3 py-2">28.5A</td>
                      <td className="border border-white/10 px-3 py-2">Cable sizing, protection settings</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Frequency</td>
                      <td className="border border-white/10 px-3 py-2">50 Hz</td>
                      <td className="border border-white/10 px-3 py-2">VSD frequency range</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Speed</td>
                      <td className="border border-white/10 px-3 py-2">1460 rev/min</td>
                      <td className="border border-white/10 px-3 py-2">Pole number (4-pole), slip calculation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Efficiency class</td>
                      <td className="border border-white/10 px-3 py-2">IE3</td>
                      <td className="border border-white/10 px-3 py-2">Energy performance, regulatory compliance</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Power factor</td>
                      <td className="border border-white/10 px-3 py-2">0.86</td>
                      <td className="border border-white/10 px-3 py-2">Supply sizing, pf correction</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Duty type</td>
                      <td className="border border-white/10 px-3 py-2">S1</td>
                      <td className="border border-white/10 px-3 py-2">Continuous (S1), intermittent (S3), etc.</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Insulation class</td>
                      <td className="border border-white/10 px-3 py-2">F</td>
                      <td className="border border-white/10 px-3 py-2">Maximum winding temperature (155 degrees C)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">IP rating</td>
                      <td className="border border-white/10 px-3 py-2">IP55</td>
                      <td className="border border-white/10 px-3 py-2">Protection against dust and water jets</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Frame size</td>
                      <td className="border border-white/10 px-3 py-2">160M</td>
                      <td className="border border-white/10 px-3 py-2">Mounting dimensions, replacement</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Efficiency Classes (IEC 60034-30-1)</p>
              <div className="grid grid-cols-4 gap-3 text-center text-sm">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-white/70 mb-1">IE1</p>
                  <p className="text-white/60 text-xs">Standard</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-white/70 mb-1">IE2</p>
                  <p className="text-white/60 text-xs">High</p>
                </div>
                <div className="p-3 rounded bg-elec-yellow/20">
                  <p className="font-bold text-elec-yellow mb-1">IE3</p>
                  <p className="text-white/60 text-xs">Premium (minimum)</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-white/70 mb-1">IE4</p>
                  <p className="text-white/60 text-xs">Super Premium</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Duty Types (IEC 60034-1)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>S1:</strong> Continuous running duty - standard for HVAC fans and pumps</li>
                <li className="pl-1"><strong>S2:</strong> Short-time duty - specified duration (e.g., S2 30 min)</li>
                <li className="pl-1"><strong>S3:</strong> Intermittent periodic duty - cyclic operation</li>
                <li className="pl-1"><strong>S4-S10:</strong> Various intermittent duties with starting, braking, speed changes</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Circuit design:</strong> Always use the nameplate FLC for cable and protection sizing.
              Calculate starting current as 6-8 times FLC for protection coordination and voltage drop assessment.
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
              Induction motors are the workhorses of building services, driving HVAC equipment,
              water systems, and building infrastructure. Understanding application-specific
              requirements ensures correct motor selection and efficient operation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">HVAC Applications</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Equipment</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Motor Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Size</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Considerations</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">AHU supply fan</td>
                      <td className="border border-white/10 px-3 py-2">SCIM + VSD</td>
                      <td className="border border-white/10 px-3 py-2">5-75 kW</td>
                      <td className="border border-white/10 px-3 py-2">Variable flow control, energy saving</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Extract fan</td>
                      <td className="border border-white/10 px-3 py-2">SCIM (DOL or VSD)</td>
                      <td className="border border-white/10 px-3 py-2">0.5-15 kW</td>
                      <td className="border border-white/10 px-3 py-2">Often constant speed, simple control</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Chilled water pump</td>
                      <td className="border border-white/10 px-3 py-2">SCIM + VSD</td>
                      <td className="border border-white/10 px-3 py-2">7.5-55 kW</td>
                      <td className="border border-white/10 px-3 py-2">Variable flow, pressure control</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Condenser water pump</td>
                      <td className="border border-white/10 px-3 py-2">SCIM (DOL)</td>
                      <td className="border border-white/10 px-3 py-2">11-45 kW</td>
                      <td className="border border-white/10 px-3 py-2">Often constant flow, high reliability</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cooling tower fan</td>
                      <td className="border border-white/10 px-3 py-2">SCIM + VSD</td>
                      <td className="border border-white/10 px-3 py-2">7.5-37 kW</td>
                      <td className="border border-white/10 px-3 py-2">Temperature control, energy saving</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Chiller compressor</td>
                      <td className="border border-white/10 px-3 py-2">SCIM or scroll</td>
                      <td className="border border-white/10 px-3 py-2">50-500 kW</td>
                      <td className="border border-white/10 px-3 py-2">High starting torque, soft starting</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fan and Pump Load Characteristics</p>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm text-white mb-2">Centrifugal fans and pumps follow the affinity laws:</p>
                <div className="grid grid-cols-3 gap-3 text-center text-sm mt-3">
                  <div className="p-2 rounded bg-black/30">
                    <p className="font-mono text-elec-yellow">Q ~ n</p>
                    <p className="text-white/60 text-xs">Flow proportional to speed</p>
                  </div>
                  <div className="p-2 rounded bg-black/30">
                    <p className="font-mono text-elec-yellow">H ~ n squared</p>
                    <p className="text-white/60 text-xs">Head proportional to speed squared</p>
                  </div>
                  <div className="p-2 rounded bg-black/30">
                    <p className="font-mono text-elec-yellow">P ~ n cubed</p>
                    <p className="text-white/60 text-xs">Power proportional to speed cubed</p>
                  </div>
                </div>
                <p className="text-sm text-white/70 mt-3 text-center">
                  Reducing speed by 20% reduces power consumption by approximately 50%
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">VSD Benefits for HVAC</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Energy savings (30-50% typical for variable loads)</li>
                  <li className="pl-1">Soft starting (reduced starting current)</li>
                  <li className="pl-1">Precise speed control for comfort</li>
                  <li className="pl-1">Reduced mechanical stress on belts and bearings</li>
                  <li className="pl-1">Lower noise at reduced speeds</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Selection Criteria</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Match motor power to load with 10-15% margin</li>
                  <li className="pl-1">Specify IE3 minimum (IE4 for long running hours)</li>
                  <li className="pl-1">IP55 minimum for plant rooms</li>
                  <li className="pl-1">Class F insulation standard</li>
                  <li className="pl-1">Consider inverter-duty rating for VSD operation</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Worked Example: AHU Fan Motor</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> An AHU requires 12m cubed per second at 800Pa total pressure. Fan efficiency is 75%. Select motor size.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Air power = Q x deltaP = 12 x 800 = 9600 W</p>
                <p className="mt-2">Shaft power = Air power / Fan efficiency</p>
                <p>Shaft power = 9600 / 0.75 = 12,800 W = 12.8 kW</p>
                <p className="mt-2">With 15% margin: 12.8 x 1.15 = 14.7 kW</p>
                <p className="mt-2 text-elec-yellow">Select: <strong>15 kW motor</strong> (next standard size)</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Energy efficiency:</strong> Motors typically run for 3000-8000 hours annually in building services.
              Energy costs over the motor lifetime far exceed the purchase price - specifying high-efficiency motors pays back quickly.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Formulas</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>ns = (120 x f) / p</strong> - Synchronous speed (rev/min)</li>
                <li className="pl-1"><strong>s = (ns - nr) / ns</strong> - Slip (per-unit or percentage)</li>
                <li className="pl-1"><strong>P = root3 x VL x IL x cos phi x eta</strong> - Input power (three-phase)</li>
                <li className="pl-1"><strong>Starting current = 6-8 x FLC</strong> - DOL starting</li>
                <li className="pl-1"><strong>P varies with n cubed</strong> - Fan and pump affinity law</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">4-pole, 50Hz: <strong>1500 rev/min</strong> synchronous, ~1450 running</li>
                <li className="pl-1">Full load slip: <strong>3-5%</strong></li>
                <li className="pl-1">DOL starting current: <strong>6-8 x FLC</strong></li>
                <li className="pl-1">Full load power factor: <strong>0.85-0.90</strong></li>
                <li className="pl-1">IE3 efficiency (15kW motor): <strong>91-92%</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Oversizing motors</strong> - Leads to poor power factor and efficiency</li>
                <li className="pl-1"><strong>Ignoring starting current</strong> - Can cause voltage dip problems</li>
                <li className="pl-1"><strong>Forgetting VSD derating</strong> - Motors may need derating for VSD operation</li>
                <li className="pl-1"><strong>Wrong IP rating</strong> - IP55 minimum for plant rooms</li>
                <li className="pl-1"><strong>Incorrect duty type</strong> - S1 required for continuous HVAC operation</li>
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
                <p className="font-medium text-white mb-1">Motor Fundamentals</p>
                <ul className="space-y-0.5">
                  <li>Squirrel cage - robust, low maintenance, most common</li>
                  <li>Wound rotor - adjustable starting, higher cost</li>
                  <li>Slip essential for torque production</li>
                  <li>Power factor improves with loading</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Building Services</p>
                <ul className="space-y-0.5">
                  <li>VSD standard for variable HVAC loads</li>
                  <li>IE3 minimum efficiency class</li>
                  <li>Size motor correctly - avoid oversizing</li>
                  <li>Consider starting current for supply design</li>
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
            <Link to="../h-n-c-module3-section5-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Transformers
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section5-5">
              Next: Synchronous Machines
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule3Section5_4;
