import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Synchronous Motors and Generators - MOET Module 2.3.3";
const DESCRIPTION = "Understand synchronous machines: synchronous speed, excitation, power factor control, alternators, frequency-pole relationships, parallel operation, and applications for electrical maintenance technicians.";

const quickCheckQuestions = [
  {
    id: "sync-speed-calc",
    question: "A synchronous motor has 6 poles and operates on a 50Hz supply. What is its running speed?",
    options: [
      "750 rev/min",
      "1,000 rev/min",
      "1,500 rev/min",
      "3,000 rev/min"
    ],
    correctIndex: 1,
    explanation: "Synchronous speed = (120 x f) / p = (120 x 50) / 6 = 1,000 rev/min. Unlike induction motors, a synchronous motor runs at exactly synchronous speed — there is no slip. The rotor locks into step with the rotating stator field."
  },
  {
    id: "excitation-pf",
    question: "How does adjusting the DC excitation current of a synchronous motor affect its power factor?",
    options: [
      "It has no effect on power factor",
      "Increasing excitation beyond the normal value causes the motor to operate at a leading power factor",
      "Increasing excitation always causes lagging power factor",
      "Power factor is determined only by the mechanical load"
    ],
    correctIndex: 1,
    explanation: "A synchronous motor's power factor is controlled by its DC field excitation. Under-excited: lagging power factor (absorbs reactive power like an inductor). Normal excitation: unity power factor. Over-excited: leading power factor (generates reactive power like a capacitor). This is why synchronous motors are sometimes used as synchronous condensers for power factor correction."
  },
  {
    id: "parallel-gen-requirements",
    question: "Before connecting an alternator in parallel with the grid, which parameters must be matched?",
    options: [
      "Voltage only",
      "Frequency only",
      "Voltage magnitude, frequency, phase sequence, and phase angle",
      "Power factor and efficiency"
    ],
    correctIndex: 2,
    explanation: "All four parameters must be matched: voltage magnitude (adjust field excitation), frequency (adjust prime mover speed), phase sequence (check once during commissioning), and phase angle (use a synchroscope or synchronising lamps to close the breaker at the exact moment of synchronism). Failure to synchronise correctly causes massive surge currents that can damage the generator and associated equipment."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the fundamental difference between a synchronous motor and an induction motor?",
    options: [
      "A synchronous motor is always larger",
      "A synchronous motor runs at exactly synchronous speed with no slip, using DC excitation on the rotor",
      "A synchronous motor can only operate on DC supply",
      "A synchronous motor has no stator windings"
    ],
    correctAnswer: 1,
    explanation: "The key difference is that a synchronous motor has a DC-excited rotor field that locks into step with the rotating stator field, running at exactly synchronous speed (zero slip). An induction motor's rotor relies on induced currents and always runs below synchronous speed."
  },
  {
    id: 2,
    question: "The frequency of the output voltage of an alternator is determined by:",
    options: [
      "The load connected to it",
      "The rotor speed and the number of poles: f = (p x N) / 120",
      "The strength of the magnetic field only",
      "The type of prime mover"
    ],
    correctAnswer: 1,
    explanation: "The frequency is determined by the speed of rotation (N, in rev/min) and the number of poles (p): f = (p x N) / 120. For a 50Hz output: a 2-pole alternator must run at 3,000 rev/min, a 4-pole at 1,500 rev/min, etc. The prime mover speed must be precisely controlled to maintain correct frequency."
  },
  {
    id: 3,
    question: "What is a 'synchronous condenser'?",
    options: [
      "A type of capacitor bank",
      "A synchronous motor running without mechanical load, used solely for power factor correction by varying its excitation",
      "A device for cooling synchronous machines",
      "A transformer used with synchronous motors"
    ],
    correctAnswer: 1,
    explanation: "A synchronous condenser is a synchronous motor running at no load (or very light load) with its excitation adjusted to generate reactive power (leading power factor). Over-excited, it behaves like a large capacitor connected to the supply, providing power factor correction. They are used at large industrial sites and grid substations."
  },
  {
    id: 4,
    question: "Why does a synchronous motor require special starting arrangements?",
    options: [
      "Because it is too heavy to start directly",
      "Because it has no starting torque of its own — the rotor must be brought close to synchronous speed before it can lock into step with the rotating field",
      "Because it runs on DC supply",
      "Because the stator windings cannot handle starting current"
    ],
    correctAnswer: 1,
    explanation: "A synchronous motor has no inherent starting torque because the DC-excited rotor cannot accelerate from standstill to synchronous speed before the rotating field moves past it. Starting methods include: amortisseur (damper) windings on the rotor (which provide induction motor starting torque), a small pony motor, or a variable frequency drive that ramps up the supply frequency."
  },
  {
    id: 5,
    question: "In a three-phase alternator, the three stator windings are displaced by:",
    options: [
      "90 electrical degrees",
      "120 electrical degrees",
      "180 electrical degrees",
      "60 electrical degrees"
    ],
    correctAnswer: 1,
    explanation: "The three stator windings of a three-phase alternator are physically displaced by 120 electrical degrees around the stator bore. As the rotor (field) rotates past each winding in turn, it generates three sinusoidal voltages displaced by 120 degrees — the balanced three-phase supply."
  },
  {
    id: 6,
    question: "What is the 'pull-out torque' of a synchronous motor?",
    options: [
      "The starting torque",
      "The maximum torque the motor can develop while remaining in synchronism — exceeding this causes the motor to lose synchronism and stall",
      "The torque at no-load",
      "The braking torque"
    ],
    correctAnswer: 1,
    explanation: "Pull-out torque is the maximum torque a synchronous motor can produce while maintaining synchronous speed. If the mechanical load exceeds the pull-out torque, the rotor falls out of step with the stator field (loses synchronism), and the motor stalls. Pull-out torque is typically 1.5 to 2.5 times rated torque and depends on the excitation level."
  },
  {
    id: 7,
    question: "A steam turbine generator has 2 poles and must produce 50Hz. What speed must the turbine operate at?",
    options: [
      "1,500 rev/min",
      "1,000 rev/min",
      "3,000 rev/min",
      "750 rev/min"
    ],
    correctAnswer: 2,
    explanation: "N = (120 x f) / p = (120 x 50) / 2 = 3,000 rev/min. Steam turbines are high-speed machines, so they typically drive 2-pole generators at 3,000 rev/min for 50Hz output. By contrast, a hydroelectric generator with many poles (e.g., 40 poles) runs at only 150 rev/min."
  },
  {
    id: 8,
    question: "What is the purpose of 'damper windings' (amortisseur windings) on a synchronous motor rotor?",
    options: [
      "To provide the DC excitation",
      "To provide starting torque (by induction motor action) and to damp oscillations during load changes",
      "To generate the output voltage",
      "To cool the rotor"
    ],
    correctAnswer: 1,
    explanation: "Damper windings are short-circuited copper or aluminium bars embedded in the rotor pole faces — similar to a squirrel cage. At starting, with the DC field de-energised, they provide induction motor starting torque. During running, they damp out hunting oscillations that occur when the load changes suddenly."
  },
  {
    id: 9,
    question: "When an alternator is operating in parallel with the grid, increasing the prime mover fuel input causes:",
    options: [
      "The frequency to increase",
      "The output voltage to increase",
      "The real power (kW) output to increase — the grid holds the frequency constant",
      "The reactive power output to increase"
    ],
    correctAnswer: 2,
    explanation: "When paralleled with a large grid (effectively an infinite bus), the grid controls the frequency and voltage. Increasing the prime mover power input increases the rotor angle (load angle) relative to the grid, which increases the real power (kW) output. To change reactive power (kVAr), you adjust the field excitation instead."
  },
  {
    id: 10,
    question: "What instrument is used to determine the exact moment for closing the paralleling breaker when synchronising an alternator?",
    options: [
      "An ammeter",
      "A power factor meter",
      "A synchroscope — it shows the frequency difference and phase angle between the incoming machine and the busbar",
      "A wattmeter"
    ],
    correctAnswer: 2,
    explanation: "A synchroscope is a rotating pointer instrument that indicates the frequency difference and relative phase angle between the incoming alternator and the busbar. The breaker should be closed when the pointer is at the 12 o'clock position (zero phase angle) and rotating slowly in the 'fast' direction. Modern digital synchronisers automate this process."
  },
  {
    id: 11,
    question: "Hunting in a synchronous motor refers to:",
    options: [
      "The motor searching for the correct phase sequence",
      "Oscillation of the rotor about its equilibrium position, caused by sudden load changes or supply disturbances",
      "The motor reversing direction",
      "Excessive speed above synchronous"
    ],
    correctAnswer: 1,
    explanation: "Hunting is the oscillation of the rotor angle about its steady-state position following a sudden load change, supply disturbance, or cyclic torque variation. The rotor swings back and forth about synchronous speed, causing current and power pulsations. Damper windings help suppress hunting by generating opposing torques during oscillation."
  },
  {
    id: 12,
    question: "What type of prime mover is typically used with a high-pole-number (e.g., 40-pole) synchronous generator?",
    options: [
      "A gas turbine at 3,000 rev/min",
      "A steam turbine at 3,000 rev/min",
      "A hydroelectric turbine at low speed (e.g., 150 rev/min)",
      "A diesel engine at 1,500 rev/min"
    ],
    correctAnswer: 2,
    explanation: "Hydroelectric generators typically use many poles because the water turbine operates at low speed. For 50Hz with 40 poles: N = (120 x 50) / 40 = 150 rev/min. The large-diameter, low-speed design suits the high torque, low speed characteristics of water turbines. By contrast, steam and gas turbines are high-speed, low-pole machines."
  }
];

const faqs = [
  {
    question: "Why are synchronous motors less common than induction motors in industry?",
    answer: "Synchronous motors require a DC excitation supply (from a separate exciter or through brushless excitation), have more complex construction, higher initial cost, require special starting arrangements, and need more skilled maintenance. However, they are preferred for large drives (above about 1 MW) where their ability to operate at unity or leading power factor, provide precise constant speed, and deliver high efficiency at full load justifies the additional complexity and cost."
  },
  {
    question: "What happens if a synchronous motor loses its DC excitation while running?",
    answer: "If excitation is lost, the motor loses its synchronous torque. Depending on the load, it may continue to run as an induction motor using the damper windings, but at reduced torque and with high stator currents. The motor will slow down (slip increases) and draw excessive current, causing overheating. Protection systems should detect loss of excitation and trip the motor. If the load is too high, the motor will stall."
  },
  {
    question: "What is the difference between a salient pole and a cylindrical rotor?",
    answer: "A salient pole rotor has projecting poles with concentrated windings — used for low-speed machines with many poles (e.g., hydroelectric generators). A cylindrical (round) rotor has the field winding distributed in slots machined into a solid steel forging — used for high-speed 2-pole and 4-pole machines driven by steam or gas turbines. The cylindrical rotor is mechanically stronger and better balanced at high speeds."
  },
  {
    question: "Can a synchronous generator operate at leading power factor?",
    answer: "Yes. When a synchronous generator is under-excited (reduced DC field current), it operates at a leading power factor, absorbing reactive power from the system. When over-excited, it operates at a lagging power factor, generating reactive power. This ability to control reactive power exchange is one of the key advantages of synchronous machines for grid voltage regulation."
  },
  {
    question: "What maintenance is specific to synchronous machines compared to induction motors?",
    answer: "In addition to standard motor maintenance (bearings, insulation, alignment), synchronous machines require: brush and slip ring inspection and maintenance (for brush-type excitation), exciter inspection and testing, field winding insulation resistance testing, damper winding bar inspection, and checking synchronising equipment. For generators: AVR (automatic voltage regulator) calibration, protection relay testing, and regular load bank testing of standby sets."
  }
];

const MOETModule2Section3_3 = () => {
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
            <span>Module 2.3.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Synchronous Motors and Generators
          </h1>
          <p className="text-white/80">
            Synchronous speed, DC excitation, power factor control, alternators, and parallel operation for electrical maintenance
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Speed:</strong> Runs at exactly synchronous speed — zero slip</li>
              <li className="pl-1"><strong>Excitation:</strong> DC field on rotor locks it to the stator rotating field</li>
              <li className="pl-1"><strong>Power factor:</strong> Controllable — under/over excitation adjusts leading/lagging PF</li>
              <li className="pl-1"><strong>Generators:</strong> Frequency = (p x N) / 120 — must synchronise before paralleling</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Context — Why This Matters</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Power generation:</strong> Every power station uses synchronous generators</li>
              <li className="pl-1"><strong>Large drives:</strong> Used for drives above ~1 MW (compressors, mills, pumps)</li>
              <li className="pl-1"><strong>PF correction:</strong> Synchronous condensers correct site power factor</li>
              <li className="pl-1"><strong>ST1426:</strong> Understand synchronous machine principles and maintenance</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the principle of synchronous motor operation and how it differs from an induction motor",
              "Describe the relationship between frequency, speed, and number of poles in synchronous machines",
              "Explain how DC excitation controls power factor in a synchronous motor",
              "Describe the construction and operation of alternators (synchronous generators)",
              "State the requirements for paralleling a generator with the grid or another generator",
              "Identify maintenance requirements specific to synchronous machines"
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

        {/* Section 1: Synchronous Motor Principles */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Synchronous Motor Principles
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A synchronous motor operates at exactly synchronous speed — the speed of the rotating
              magnetic field produced by the stator windings. Unlike an induction motor, where the rotor
              always lags behind the field (slip), a synchronous motor's rotor locks into step with the
              rotating field and rotates at the same speed. This is achieved by providing a separate DC
              excitation to the rotor, creating fixed magnetic poles that are attracted to the rotating
              stator field and pulled along with it.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Key Characteristics</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-blue-500/10 border border-blue-500/20">
                  <p className="text-sm font-medium text-blue-400 mb-2">Synchronous Motor</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Runs at exactly synchronous speed</li>
                    <li className="pl-1">Zero slip under all load conditions</li>
                    <li className="pl-1">Requires DC excitation on rotor</li>
                    <li className="pl-1">Power factor controllable</li>
                    <li className="pl-1">No inherent starting torque</li>
                    <li className="pl-1">More expensive and complex</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-purple-500/10 border border-purple-500/20">
                  <p className="text-sm font-medium text-purple-400 mb-2">Induction Motor (comparison)</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Runs below synchronous speed</li>
                    <li className="pl-1">Slip increases with load (3-6%)</li>
                    <li className="pl-1">No external excitation needed</li>
                    <li className="pl-1">Always operates at lagging PF</li>
                    <li className="pl-1">Self-starting</li>
                    <li className="pl-1">Simpler, cheaper, more robust</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-white mb-3">Starting a Synchronous Motor</p>
              <p className="text-sm text-white/90 mb-3">
                A synchronous motor cannot start from standstill under its own synchronous torque — the
                rotating field moves past the stationary rotor too quickly for the DC-excited poles to lock
                on. Special starting arrangements are required:
              </p>
              <div className="space-y-3">
                <div className="bg-black/30 p-3 rounded">
                  <p className="text-sm font-medium text-white mb-1">Damper (Amortisseur) Winding Starting</p>
                  <p className="text-xs text-white/80">
                    The most common method. Short-circuited bars embedded in the rotor pole faces act as a squirrel
                    cage, providing induction motor starting torque. The motor accelerates to near synchronous speed
                    with the DC field de-energised, then the field is energised and the rotor pulls into synchronism.
                  </p>
                </div>
                <div className="bg-black/30 p-3 rounded">
                  <p className="text-sm font-medium text-white mb-1">Pony Motor Starting</p>
                  <p className="text-xs text-white/80">
                    A small auxiliary motor (pony motor) mechanically coupled to the synchronous motor shaft
                    accelerates it to near synchronous speed. The DC field is then energised and the motor
                    synchronises. The pony motor is then disconnected or declutched.
                  </p>
                </div>
                <div className="bg-black/30 p-3 rounded">
                  <p className="text-sm font-medium text-white mb-1">Variable Frequency Drive (VFD) Starting</p>
                  <p className="text-xs text-white/80">
                    The supply frequency is started at a very low value and gradually increased, bringing the
                    synchronous motor up to speed without the rotor ever falling out of step. This is the
                    modern preferred method for large synchronous motors.
                  </p>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-white mb-3">The Load Angle</p>
              <p className="text-sm text-white/90">
                When a synchronous motor is loaded, the rotor poles do not align exactly with the stator field
                poles — the rotor lags behind by an angle called the load angle (delta). As mechanical load
                increases, the load angle increases. At the pull-out torque (typically 1.5 to 2.5 times rated
                torque), the load angle reaches a critical value (typically about 90 degrees for a cylindrical
                rotor). If the load exceeds this, the motor loses synchronism and stalls.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Power Factor Control and Excitation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Power Factor Control and Excitation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              One of the most valuable characteristics of a synchronous motor is its ability to operate
              at a controllable power factor. By adjusting the DC excitation current, the motor can be
              made to operate at unity, lagging, or leading power factor — a capability that no induction
              motor possesses.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">V-Curves — Excitation vs Stator Current</p>
              <p className="text-sm text-white/90 mb-3">
                The relationship between DC excitation and stator current for a synchronous motor at
                constant load produces a characteristic V-shaped curve:
              </p>
              <div className="space-y-3">
                <div className="bg-black/30 p-3 rounded">
                  <p className="text-sm font-medium text-amber-400 mb-1">Under-Excited (low DC field current)</p>
                  <p className="text-xs text-white/80">
                    The motor operates at a lagging power factor — it absorbs reactive power from the supply,
                    similar to an induction motor. Stator current is relatively high.
                  </p>
                </div>
                <div className="bg-black/30 p-3 rounded">
                  <p className="text-sm font-medium text-green-400 mb-1">Normal Excitation (unity power factor)</p>
                  <p className="text-xs text-white/80">
                    At the correct excitation level, the motor operates at unity power factor — stator current
                    is at its minimum for a given load. This is the bottom of the V-curve.
                  </p>
                </div>
                <div className="bg-black/30 p-3 rounded">
                  <p className="text-sm font-medium text-blue-400 mb-1">Over-Excited (high DC field current)</p>
                  <p className="text-xs text-white/80">
                    The motor operates at a leading power factor — it generates reactive power, acting like
                    a capacitor connected to the supply. Stator current increases again. This mode is used
                    for power factor correction.
                  </p>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-green-500/10 border-l-2 border-green-500/50">
              <p className="text-sm font-medium text-green-400 mb-3">Synchronous Condensers</p>
              <p className="text-sm text-white/90 mb-3">
                A synchronous condenser is a synchronous motor running at no mechanical load, operated
                in the over-excited condition solely to generate reactive power for power factor correction.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Continuously variable reactive power output (unlike fixed capacitor banks)</li>
                <li className="pl-1">Can both generate and absorb reactive power (adjusting excitation)</li>
                <li className="pl-1">Used at large industrial sites and grid substations</li>
                <li className="pl-1">Being reintroduced to provide grid inertia as conventional generators are replaced by renewables</li>
                <li className="pl-1">Maintenance: bearings, brushes/slip rings, exciter, cooling — similar to any synchronous machine</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-white mb-3">Excitation Systems</p>
              <div className="space-y-3">
                <div className="bg-black/30 p-3 rounded">
                  <p className="text-sm font-medium text-white mb-1">Brushless Excitation</p>
                  <p className="text-xs text-white/80">
                    An AC exciter (small alternator) mounted on the same shaft has its output rectified by
                    rotating diodes and fed directly to the main field winding. No brushes or slip rings —
                    reduced maintenance. Controlled by the automatic voltage regulator (AVR) which adjusts
                    the exciter field current.
                  </p>
                </div>
                <div className="bg-black/30 p-3 rounded">
                  <p className="text-sm font-medium text-white mb-1">Static Excitation (Brush-Type)</p>
                  <p className="text-xs text-white/80">
                    DC from a controlled rectifier is fed to the rotor field winding through slip rings and
                    brushes. Faster response than brushless systems but requires brush maintenance. Used on
                    many older and some modern large machines.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Alternators (Synchronous Generators) */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Alternators (Synchronous Generators)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              An alternator is a synchronous generator that converts mechanical energy from a prime mover
              (turbine, engine, or wind turbine) into three-phase AC electrical energy. Every power station,
              every standby generator, and every wind turbine uses a synchronous generator. Understanding
              alternator principles is essential for maintenance technicians working with standby power systems.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Frequency and Pole Relationship</p>
              <div className="bg-black/30 p-3 rounded text-sm text-white/90 mb-3">
                <p className="font-mono">f = (p x N) / 120</p>
                <p className="text-xs text-white/60 mt-2">Where: f = frequency (Hz), p = number of poles, N = speed (rev/min)</p>
              </div>
              <div className="overflow-x-auto mt-3">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="py-2 pr-4 text-white/70 font-medium">Prime Mover</th>
                      <th className="py-2 pr-4 text-white/70 font-medium">Typical Poles</th>
                      <th className="py-2 pr-4 text-white/70 font-medium">Speed for 50Hz</th>
                      <th className="py-2 text-white/70 font-medium">Rotor Type</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/90 text-xs">
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">Steam turbine</td>
                      <td className="py-2 pr-4">2</td>
                      <td className="py-2 pr-4">3,000 rev/min</td>
                      <td className="py-2">Cylindrical</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">Gas turbine</td>
                      <td className="py-2 pr-4">2 or 4</td>
                      <td className="py-2 pr-4">3,000 or 1,500</td>
                      <td className="py-2">Cylindrical</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">Diesel engine</td>
                      <td className="py-2 pr-4">4 to 8</td>
                      <td className="py-2 pr-4">1,500 to 750</td>
                      <td className="py-2">Salient pole</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">Hydro turbine</td>
                      <td className="py-2 pr-4">12 to 80+</td>
                      <td className="py-2 pr-4">500 to 75</td>
                      <td className="py-2">Salient pole</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-white mb-3">Voltage Regulation</p>
              <p className="text-sm text-white/90 mb-3">
                The output voltage of an alternator varies with load due to the armature reaction effect
                and the impedance voltage drop in the stator windings. The automatic voltage regulator (AVR)
                continuously adjusts the DC field excitation to maintain constant output voltage as the load
                changes.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Resistive load:</strong> Moderate voltage drop — AVR increases excitation slightly</li>
                <li className="pl-1"><strong>Inductive load (lagging PF):</strong> Large voltage drop — AVR must increase excitation significantly</li>
                <li className="pl-1"><strong>Capacitive load (leading PF):</strong> Voltage may rise — AVR reduces excitation</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-white mb-3">Rotor Construction</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-blue-500/10 border border-blue-500/20">
                  <p className="text-sm font-medium text-blue-400 mb-2">Salient Pole Rotor</p>
                  <ul className="text-xs text-white space-y-1 list-disc list-outside ml-4">
                    <li>Projecting poles with concentrated field coils</li>
                    <li>Large diameter, short axial length</li>
                    <li>4 or more poles — used for low-speed machines</li>
                    <li>Hydro generators, diesel generator sets</li>
                    <li>Damper bars fitted in pole face slots</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-purple-500/10 border border-purple-500/20">
                  <p className="text-sm font-medium text-purple-400 mb-2">Cylindrical (Round) Rotor</p>
                  <ul className="text-xs text-white space-y-1 list-disc list-outside ml-4">
                    <li>Distributed field winding in machined slots</li>
                    <li>Small diameter, long axial length</li>
                    <li>2 or 4 poles — used for high-speed machines</li>
                    <li>Steam turbine and gas turbine generators</li>
                    <li>Solid steel forging — high mechanical strength</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Parallel Operation of Generators */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Parallel Operation and Synchronisation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In many installations — power stations, data centres, hospitals, and industrial plants —
              multiple generators operate in parallel to share the electrical load. Before a generator
              can be connected in parallel with the grid or another running generator, it must be
              synchronised to prevent catastrophic damage.
            </p>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
              <p className="text-sm font-medium text-red-400 mb-3">Synchronising Requirements — All Four Must Be Matched</p>
              <div className="space-y-3">
                <div className="bg-black/30 p-3 rounded">
                  <p className="text-sm font-medium text-white mb-1">1. Voltage Magnitude</p>
                  <p className="text-xs text-white/80">
                    The incoming generator's terminal voltage must match the busbar voltage. Adjusted by
                    varying the DC field excitation (AVR setpoint). A voltage mismatch causes large
                    circulating currents (reactive power flow) when the breaker closes.
                  </p>
                </div>
                <div className="bg-black/30 p-3 rounded">
                  <p className="text-sm font-medium text-white mb-1">2. Frequency</p>
                  <p className="text-xs text-white/80">
                    The incoming generator's frequency must closely match the busbar frequency. Adjusted by
                    varying the prime mover speed (governor setpoint). Ideally, the incoming machine should
                    be running very slightly fast (0.1-0.5Hz above busbar frequency) so the breaker closes
                    while the phase angle is slowly advancing.
                  </p>
                </div>
                <div className="bg-black/30 p-3 rounded">
                  <p className="text-sm font-medium text-white mb-1">3. Phase Sequence</p>
                  <p className="text-xs text-white/80">
                    The phase sequence (rotation direction of the three-phase system) of the incoming generator
                    must match the busbar. Verified once during commissioning using a phase rotation meter.
                    Incorrect phase sequence would result in a short circuit when the breaker closes.
                  </p>
                </div>
                <div className="bg-black/30 p-3 rounded">
                  <p className="text-sm font-medium text-white mb-1">4. Phase Angle (In-Phase)</p>
                  <p className="text-xs text-white/80">
                    The breaker must close at the instant when the voltages of the incoming generator and
                    the busbar are exactly in phase (zero phase difference). Monitored using a synchroscope
                    or synchronising lamps. Modern automatic synchronisers handle this precisely.
                  </p>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-white mb-3">Load Sharing Between Parallel Generators</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Real power (kW) sharing:</strong> Controlled by the governor droop settings — increasing fuel to one machine increases its share of the real power load</li>
                <li className="pl-1"><strong>Reactive power (kVAr) sharing:</strong> Controlled by the AVR droop settings — increasing excitation on one machine increases its share of the reactive power</li>
                <li className="pl-1"><strong>Isochronous mode:</strong> One generator controls frequency (isochronous governor), others follow with droop — used in island mode (no grid connection)</li>
                <li className="pl-1"><strong>Grid parallel:</strong> The grid is effectively an infinite bus — it controls frequency and voltage; the generator's real and reactive power output are adjusted by governor and AVR</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
              <p className="text-sm font-medium text-elec-yellow mb-2">ST1426 Maintenance Competency</p>
              <p className="text-sm text-white/90">
                The Level 3 apprenticeship standard requires you to understand the principles of synchronous
                machines, including starting methods, excitation systems, and the requirements for parallel
                operation. You should be able to assist with generator maintenance, interpret test results,
                and understand the safety implications of working on synchronous machines — particularly the
                risk of back-feed from generators and stored magnetic energy.
              </p>
            </div>
          </div>
        </section>

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
            title="Test Your Knowledge — Synchronous Machines"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section3-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Induction Motors
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section3-4">
              Next: DC Motors
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule2Section3_3;
