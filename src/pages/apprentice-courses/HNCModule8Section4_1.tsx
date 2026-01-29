import { ArrowLeft, Zap, CheckCircle, RotateCcw, Gauge, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Motor Fundamentals - HNC Module 8 Section 4.1";
const DESCRIPTION = "Master three-phase induction motor principles for HVAC applications: synchronous speed, slip, torque-speed characteristics, IE1-IE5 efficiency classes, motor nameplate data, frame sizes, duty cycles and selection criteria.";

const quickCheckQuestions = [
  {
    id: "synchronous-speed",
    question: "A 4-pole three-phase motor is connected to a 50Hz supply. What is the synchronous speed?",
    options: ["3000 rpm", "1500 rpm", "1000 rpm", "750 rpm"],
    correctIndex: 1,
    explanation: "Synchronous speed Ns = (120 x f) / p = (120 x 50) / 4 = 1500 rpm. A 4-pole motor has two pairs of poles, giving 1500 rpm at 50Hz. This is the speed of the rotating magnetic field."
  },
  {
    id: "slip-calculation",
    question: "A 4-pole motor runs at 1440 rpm on a 50Hz supply. What is the slip?",
    options: ["2%", "4%", "6%", "8%"],
    correctIndex: 1,
    explanation: "Slip s = (Ns - Nr) / Ns x 100% = (1500 - 1440) / 1500 x 100% = 4%. Typical full-load slip for induction motors is 2-6%. The rotor must slip behind the rotating field to induce current."
  },
  {
    id: "ie-efficiency",
    question: "Which IE efficiency class is now the minimum legal requirement for new motors in the EU/UK?",
    options: ["IE1 Standard", "IE2 High", "IE3 Premium", "IE4 Super Premium"],
    correctIndex: 2,
    explanation: "Since July 2021, IE3 (Premium Efficiency) is the minimum requirement for most three-phase motors 0.75-1000kW. IE4 is required for some applications. This regulation drives significant energy savings across industry."
  },
  {
    id: "duty-cycle",
    question: "An AHU fan motor runs continuously at constant load. Which duty cycle designation applies?",
    options: ["S1 - Continuous duty", "S2 - Short-time duty", "S3 - Intermittent periodic duty", "S6 - Continuous operation periodic duty"],
    correctIndex: 0,
    explanation: "S1 (continuous duty) applies when the motor runs at constant load for sufficient time to reach thermal equilibrium. This is typical for HVAC fans, pumps and other continuously operating equipment."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What produces the rotating magnetic field in a three-phase induction motor?",
    options: [
      "The rotor windings energised by slip rings",
      "Three-phase currents displaced by 120 degrees in the stator windings",
      "Permanent magnets in the rotor",
      "A commutator and brushes"
    ],
    correctAnswer: 1,
    explanation: "Three-phase currents, displaced by 120 electrical degrees, flow through spatially displaced stator windings. This produces a rotating magnetic field at synchronous speed without any moving contacts."
  },
  {
    id: 2,
    question: "Why must there be slip in an induction motor for it to produce torque?",
    options: [
      "To prevent overheating of the stator",
      "To induce voltage and current in the rotor conductors",
      "To reduce starting current",
      "To improve power factor"
    ],
    correctAnswer: 1,
    explanation: "If the rotor turned at synchronous speed, there would be no relative motion between rotor and stator field, so no EMF would be induced in the rotor. Slip causes relative motion, inducing rotor current which interacts with the stator field to produce torque."
  },
  {
    id: 3,
    question: "A motor nameplate shows 400V, 11kW, 21.5A, cos phi 0.85, 1460 rpm. What is the number of poles?",
    options: ["2 poles", "4 poles", "6 poles", "8 poles"],
    correctAnswer: 1,
    explanation: "At 1460 rpm with ~3% slip, synchronous speed is approximately 1500 rpm. Using Ns = 120f/p, we get p = 120 x 50/1500 = 4 poles. The actual speed is slightly below synchronous due to slip."
  },
  {
    id: 4,
    question: "What is the typical full-load efficiency of an IE3 motor rated at 7.5kW?",
    options: ["75-80%", "80-85%", "89-91%", "95-97%"],
    correctAnswer: 2,
    explanation: "IE3 (Premium Efficiency) motors typically achieve 89-91% efficiency at 7.5kW. This represents significant improvement over older IE1 motors (84-86%) and reduces running costs substantially over the motor's lifetime."
  },
  {
    id: 5,
    question: "Which factor has the greatest impact on motor efficiency losses?",
    options: [
      "Bearing friction",
      "Windage losses",
      "Copper losses (I squared R) in windings",
      "Stray losses"
    ],
    correctAnswer: 2,
    explanation: "Copper losses (I squared R losses) in the stator and rotor windings are typically the largest component, accounting for 30-50% of total losses. This is why high-efficiency motors use more copper and better quality materials."
  },
  {
    id: 6,
    question: "A motor has frame size 132M. What does the '132' indicate?",
    options: [
      "Motor power in watts",
      "Shaft height in millimetres",
      "Overall length in millimetres",
      "Mounting bolt spacing"
    ],
    correctAnswer: 1,
    explanation: "The frame size number (132) indicates the shaft centre height above the mounting surface in millimetres. This standardisation (IEC 60072) ensures interchangeability between manufacturers. 'M' indicates medium length for that frame."
  },
  {
    id: 7,
    question: "For HVAC fan and pump applications, what is the relationship between motor speed and power consumption?",
    options: [
      "Power is proportional to speed",
      "Power is proportional to speed squared",
      "Power is proportional to speed cubed",
      "Power is inversely proportional to speed"
    ],
    correctAnswer: 2,
    explanation: "The affinity laws state that power varies with the cube of speed (P proportional to N cubed). Reducing fan speed by 20% reduces power consumption by approximately 50%. This makes variable speed drives highly effective for HVAC energy savings."
  },
  {
    id: 8,
    question: "What does the motor insulation class 'F' indicate?",
    options: [
      "Maximum winding temperature of 105 degrees C",
      "Maximum winding temperature of 130 degrees C",
      "Maximum winding temperature of 155 degrees C",
      "Maximum winding temperature of 180 degrees C"
    ],
    correctAnswer: 2,
    explanation: "Class F insulation permits a maximum winding temperature of 155 degrees C. Most modern motors use Class F insulation but are designed for Class B temperature rise (80K), giving a 25K safety margin and extended insulation life."
  },
  {
    id: 9,
    question: "Which duty cycle applies to a motor used for crane hoisting with defined on/off periods?",
    options: [
      "S1 - Continuous duty",
      "S2 - Short-time duty",
      "S3 - Intermittent periodic duty",
      "S4 - Intermittent periodic duty with starting"
    ],
    correctAnswer: 3,
    explanation: "S4 applies when the starting process contributes significantly to thermal loading. Crane motors experience frequent starts under load, so starting losses must be considered alongside running periods."
  },
  {
    id: 10,
    question: "What is the typical starting current for a standard squirrel cage motor started direct-on-line?",
    options: [
      "1-2 times full load current",
      "3-4 times full load current",
      "6-8 times full load current",
      "10-12 times full load current"
    ],
    correctAnswer: 2,
    explanation: "DOL starting current is typically 6-8 times full load current (FLC). This high inrush can cause voltage dips on the supply, which is why reduced voltage starting methods are used for larger motors."
  },
  {
    id: 11,
    question: "When selecting a motor for a variable speed application, why might you choose a motor with higher power rating?",
    options: [
      "To achieve higher maximum speed",
      "To compensate for reduced cooling at low speeds",
      "To improve power factor",
      "To reduce cable size requirements"
    ],
    correctAnswer: 1,
    explanation: "Standard motors have shaft-mounted cooling fans that provide less airflow at reduced speeds. For continuous operation at low speeds, either an oversized motor or a force-ventilated motor should be selected to prevent overheating."
  },
  {
    id: 12,
    question: "A 15kW IE3 motor costs 800 pounds more than an equivalent IE2 motor. If electricity costs 15p/kWh and the motor runs 4000 hours/year, what is the approximate payback period?",
    options: [
      "Less than 1 year",
      "1-2 years",
      "3-4 years",
      "More than 5 years"
    ],
    correctAnswer: 1,
    explanation: "IE3 is typically 2% more efficient than IE2 at this rating. Annual savings = 15kW x 0.02 x 4000h x 0.15 pounds = 180 pounds/year. Payback = 800/180 = 4.4 years. However, larger motors and higher running hours give faster payback, often under 2 years."
  }
];

const faqs = [
  {
    question: "Why are induction motors so widely used in HVAC systems?",
    answer: "Induction motors dominate HVAC applications because they are robust, reliable, require minimal maintenance (no brushes or slip rings), have good efficiency, and can operate directly from the mains supply. They handle the dusty, humid environments common in plant rooms well and have long service lives of 15-20+ years with basic maintenance."
  },
  {
    question: "How do I read a motor nameplate correctly?",
    answer: "Key nameplate data includes: rated voltage (e.g., 400V), rated power (kW), rated current (A), power factor (cos phi), rated speed (rpm), efficiency class (IE1-IE4), insulation class (typically F), duty cycle (S1-S10), frame size, and protection rating (IP). The speed indicates the number of poles, and the relationship between voltage, current, power and power factor should be consistent."
  },
  {
    question: "What is the difference between motor frame size letters (S, M, L)?",
    answer: "Frame size letters indicate relative length for a given shaft height. 'S' is short, 'M' is medium, and 'L' is long. A longer frame typically means higher power output at that shaft height. For example, frame 132S might be 4kW while 132M could be 7.5kW. The shaft height remains constant at 132mm."
  },
  {
    question: "Can I replace an IE2 motor with an IE3 directly?",
    answer: "Usually yes, as IE3 motors are designed for dimensional compatibility with IE2. However, IE3 motors may have slightly different starting characteristics (higher starting current, higher starting torque) which could affect protection settings and starter sizing. Always check that the existing installation can accommodate any differences."
  },
  {
    question: "What happens if I run a 50Hz motor on a 60Hz supply?",
    answer: "Running at 60Hz increases speed by 20% (proportional to frequency) and may increase power output. However, the motor will also run hotter due to increased iron losses and may exceed its thermal limits. Voltage should ideally be increased proportionally (480V instead of 400V). Motors designed for dual frequency operation (50/60Hz) state both ratings on the nameplate."
  },
  {
    question: "How do I select the correct motor for an intermittent duty application?",
    answer: "For intermittent duty (S2-S10), you need to define the duty cycle accurately: on-time, off-time, number of starts per hour, and load during operation. Motor manufacturers provide derating factors or specific ratings for different duty cycles. A motor rated for continuous duty (S1) may be suitable for intermittent duty at higher power, but thermal calculations should verify this."
  }
];

const HNCModule8Section4_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section4">
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
            <span>Module 8.4.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Motor Fundamentals
          </h1>
          <p className="text-white/80">
            Understanding three-phase induction motors: the workhorses of HVAC systems
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Induction motors:</strong> Rotating magnetic field induces rotor current</li>
              <li className="pl-1"><strong>Synchronous speed:</strong> Ns = 120f / p (depends on poles and frequency)</li>
              <li className="pl-1"><strong>Slip:</strong> Rotor runs 2-6% slower than synchronous speed</li>
              <li className="pl-1"><strong>IE efficiency:</strong> IE3 (Premium) now minimum legal requirement</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>AHU fans:</strong> 2 or 4-pole motors, 1-30kW typical</li>
              <li className="pl-1"><strong>Pumps:</strong> 2-pole for centrifugal, 4-pole for positive displacement</li>
              <li className="pl-1"><strong>Chillers:</strong> Large motors up to 500kW, high efficiency critical</li>
              <li className="pl-1"><strong>Selection:</strong> Match duty cycle, efficiency class and frame size</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the operating principle of three-phase induction motors",
              "Calculate synchronous speed and slip for different pole configurations",
              "Interpret motor nameplate data including efficiency and duty ratings",
              "Compare IE efficiency classes and their impact on running costs",
              "Select appropriate motors for different HVAC applications",
              "Understand frame sizes, insulation classes and protection ratings"
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

        {/* Section 1: Three-Phase Induction Motor Principles */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Three-Phase Induction Motor Principles
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The <strong>three-phase squirrel cage induction motor</strong> is the most common motor type in
              building services. It converts electrical energy to mechanical energy using electromagnetic induction,
              with no electrical connection to the rotor.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Motor Construction</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-white mb-2">Stator (Stationary Part)</p>
                  <ul className="text-sm text-white/90 space-y-1 list-disc list-outside ml-4">
                    <li>Laminated steel core to reduce eddy current losses</li>
                    <li>Three-phase windings displaced by 120 electrical degrees</li>
                    <li>Windings connected in star or delta configuration</li>
                    <li>Creates the rotating magnetic field</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-2">Rotor (Rotating Part)</p>
                  <ul className="text-sm text-white/90 space-y-1 list-disc list-outside ml-4">
                    <li>Laminated steel core mounted on shaft</li>
                    <li>Aluminium or copper bars in slots (squirrel cage)</li>
                    <li>Bars short-circuited by end rings</li>
                    <li>No external electrical connections required</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Operating Principle - The Rotating Magnetic Field</p>
              <p className="text-sm text-white/90 mb-3">
                When three-phase AC is applied to the stator windings, the currents create a magnetic field
                that rotates at <strong>synchronous speed</strong>. This rotation occurs because:
              </p>
              <ol className="text-sm text-white space-y-2 list-decimal list-outside ml-5">
                <li className="pl-1">Three-phase currents are displaced by 120 degrees in time</li>
                <li className="pl-1">The windings are displaced by 120 degrees in space</li>
                <li className="pl-1">The combination produces a field of constant magnitude that rotates smoothly</li>
                <li className="pl-1">The field rotates at a speed determined by frequency and number of poles</li>
              </ol>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Synchronous Speed Formula</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Ns = (120 x f) / p</p>
                <p className="mt-2 text-white/60">Where:</p>
                <p className="text-white/60">Ns = synchronous speed (rpm)</p>
                <p className="text-white/60">f = supply frequency (Hz)</p>
                <p className="text-white/60">p = number of poles</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Synchronous Speeds at 50Hz</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Poles</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Synchronous Speed</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Full-Load Speed</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Common Applications</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2</td>
                      <td className="border border-white/10 px-3 py-2">3000 rpm</td>
                      <td className="border border-white/10 px-3 py-2">2850-2950 rpm</td>
                      <td className="border border-white/10 px-3 py-2">Centrifugal pumps, small fans</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4</td>
                      <td className="border border-white/10 px-3 py-2">1500 rpm</td>
                      <td className="border border-white/10 px-3 py-2">1420-1480 rpm</td>
                      <td className="border border-white/10 px-3 py-2">AHU fans, HVAC pumps</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">6</td>
                      <td className="border border-white/10 px-3 py-2">1000 rpm</td>
                      <td className="border border-white/10 px-3 py-2">940-980 rpm</td>
                      <td className="border border-white/10 px-3 py-2">Large fans, cooling towers</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">8</td>
                      <td className="border border-white/10 px-3 py-2">750 rpm</td>
                      <td className="border border-white/10 px-3 py-2">700-740 rpm</td>
                      <td className="border border-white/10 px-3 py-2">Low-speed drives, conveyors</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> Fewer poles = higher speed. 2-pole motors are the fastest,
              but 4-pole motors are most common in HVAC due to good balance of speed, torque and efficiency.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Slip and Torque Production */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Slip and Torque Production
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              <strong>Slip</strong> is the difference between synchronous speed and actual rotor speed,
              expressed as a percentage. It is essential for motor operation - without slip, there would
              be no induced rotor current and therefore no torque.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Slip Formula</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>s = (Ns - Nr) / Ns x 100%</p>
                <p className="mt-2 text-white/60">Where:</p>
                <p className="text-white/60">s = slip (%)</p>
                <p className="text-white/60">Ns = synchronous speed (rpm)</p>
                <p className="text-white/60">Nr = rotor speed (rpm)</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Why Slip is Essential:</p>
              <ol className="text-sm text-white space-y-2 list-decimal list-outside ml-5">
                <li className="pl-1">The rotating stator field cuts the rotor conductors</li>
                <li className="pl-1">This relative motion induces EMF in the rotor bars (Faraday's law)</li>
                <li className="pl-1">The EMF drives current through the short-circuited rotor bars</li>
                <li className="pl-1">Current-carrying conductors in a magnetic field experience force (motor action)</li>
                <li className="pl-1">The rotor accelerates, trying to catch the rotating field</li>
                <li className="pl-1">As speed increases, slip decreases and induced EMF reduces</li>
                <li className="pl-1">Equilibrium is reached when motor torque equals load torque</li>
              </ol>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Torque-Speed Characteristic</p>
              <div className="font-mono text-sm text-white/90 leading-relaxed">
                <pre className="overflow-x-auto">
{`Torque
   ^
   |        Pull-out (breakdown) torque
   |              _____
   |            /       \\
   |          /           \\_____ Full-load operating point
   |        /                   \\
   |      /    Starting           \\
   |     |     torque               \\
   |    /                            \\
   +---+-----+-----+-----+-----+-----+---> Speed
   0   Starting   Full    Sync
       (s=1)      load    speed
                  (s=3-5%) (s=0)`}
                </pre>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Points on the Torque-Speed Curve</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Operating Point</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Slip</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Characteristics</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Starting (locked rotor)</td>
                      <td className="border border-white/10 px-3 py-2">s = 100%</td>
                      <td className="border border-white/10 px-3 py-2">High current (6-8x FLC), moderate torque (1.5-2.5x rated)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pull-out (breakdown)</td>
                      <td className="border border-white/10 px-3 py-2">s = 10-20%</td>
                      <td className="border border-white/10 px-3 py-2">Maximum torque (2-3x rated), unstable beyond this</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Full load</td>
                      <td className="border border-white/10 px-3 py-2">s = 2-6%</td>
                      <td className="border border-white/10 px-3 py-2">Rated torque, rated current, stable operation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">No load</td>
                      <td className="border border-white/10 px-3 py-2">s = 0.5-1%</td>
                      <td className="border border-white/10 px-3 py-2">Minimal torque (friction only), low current</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <p className="text-sm font-medium text-amber-300 mb-2">Critical Understanding</p>
              <p className="text-sm text-white/90">
                If the load torque exceeds pull-out torque, the motor will <strong>stall</strong>.
                The rotor slows dramatically, slip increases, and current rises to starting levels.
                Without protection, the motor will overheat rapidly. This is why overload and
                stall protection are essential.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: IE Efficiency Classes */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            IE Efficiency Classes and Regulations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The <strong>International Efficiency (IE) classification</strong> system standardises motor
              efficiency ratings globally. Higher IE numbers indicate better efficiency and lower running
              costs, though typically with higher purchase price.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">IE Efficiency Classes (IEC 60034-30-1)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Class</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Name</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Efficiency (11kW 4-pole)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">IE1</td>
                      <td className="border border-white/10 px-3 py-2">Standard</td>
                      <td className="border border-white/10 px-3 py-2">87.6%</td>
                      <td className="border border-white/10 px-3 py-2">No longer permitted for most applications</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">IE2</td>
                      <td className="border border-white/10 px-3 py-2">High</td>
                      <td className="border border-white/10 px-3 py-2">89.4%</td>
                      <td className="border border-white/10 px-3 py-2">Permitted only with VSD</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-bold">IE3</td>
                      <td className="border border-white/10 px-3 py-2 font-bold">Premium</td>
                      <td className="border border-white/10 px-3 py-2">91.0%</td>
                      <td className="border border-white/10 px-3 py-2 text-green-300">Minimum standard (since July 2021)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">IE4</td>
                      <td className="border border-white/10 px-3 py-2">Super Premium</td>
                      <td className="border border-white/10 px-3 py-2">92.1%</td>
                      <td className="border border-white/10 px-3 py-2">Required for some applications from 2023</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">IE5</td>
                      <td className="border border-white/10 px-3 py-2">Ultra Premium</td>
                      <td className="border border-white/10 px-3 py-2">&gt;93%</td>
                      <td className="border border-white/10 px-3 py-2">Future standard, emerging technology</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">UK/EU Ecodesign Regulations (2021 onwards)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>July 2021:</strong> IE3 minimum for motors 0.75-1000kW (2, 4, 6, 8 pole)</li>
                <li className="pl-1"><strong>July 2021:</strong> IE2 permitted only when used with VSD</li>
                <li className="pl-1"><strong>July 2023:</strong> IE4 minimum for motors 75-200kW (2-6 pole)</li>
                <li className="pl-1"><strong>Exemptions:</strong> ATEX motors, brake motors, some special applications</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Motor Losses and Efficiency</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Types of Losses</p>
                  <ul className="text-sm text-white/90 space-y-1 list-disc list-outside ml-4">
                    <li>Stator copper losses (I squared R)</li>
                    <li>Rotor copper losses</li>
                    <li>Iron losses (hysteresis and eddy current)</li>
                    <li>Mechanical losses (friction, windage)</li>
                    <li>Stray load losses</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">How IE3/IE4 Reduce Losses</p>
                  <ul className="text-sm text-white/90 space-y-1 list-disc list-outside ml-4">
                    <li>More copper in windings (lower resistance)</li>
                    <li>Better quality laminations (lower iron losses)</li>
                    <li>Optimised air gap and slot geometry</li>
                    <li>Better bearings and lubrication</li>
                    <li>Precision manufacturing</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Cost-Benefit Example: IE2 vs IE3</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Motor: 15kW, 4-pole, running 4000 hours/year</p>
                <p>Electricity cost: 15p/kWh</p>
                <p className="mt-2">IE2 efficiency: 90.0%</p>
                <p>Annual energy: 15kW / 0.90 x 4000h = 66,667 kWh</p>
                <p>Annual cost: 66,667 x 0.15 = <strong>10,000 pounds</strong></p>
                <p className="mt-2">IE3 efficiency: 91.5%</p>
                <p>Annual energy: 15kW / 0.915 x 4000h = 65,574 kWh</p>
                <p>Annual cost: 65,574 x 0.15 = <strong>9,836 pounds</strong></p>
                <p className="mt-2 text-green-400">Annual saving: 164 pounds</p>
                <p className="text-white/60">Typical price premium for IE3: 200-400 pounds</p>
                <p className="text-green-400">Payback: 1-2.5 years</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design guidance:</strong> Always specify IE3 or better. For motors running
              &gt;4000 hours/year, IE4 often provides better lifetime value despite higher purchase cost.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Motor Selection for HVAC */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Motor Nameplate Data and Selection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Correct motor selection requires understanding all nameplate parameters. The nameplate
              provides critical information for installation, protection settings and maintenance.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Motor Nameplate Data Explained</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Parameter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Example</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Meaning</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Rated voltage</td>
                      <td className="border border-white/10 px-3 py-2">400V 3~</td>
                      <td className="border border-white/10 px-3 py-2">Three-phase 400V supply</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Rated power</td>
                      <td className="border border-white/10 px-3 py-2">11kW</td>
                      <td className="border border-white/10 px-3 py-2">Mechanical output power at shaft</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Rated current</td>
                      <td className="border border-white/10 px-3 py-2">21.5A</td>
                      <td className="border border-white/10 px-3 py-2">Full load current per line</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Power factor</td>
                      <td className="border border-white/10 px-3 py-2">cos phi 0.85</td>
                      <td className="border border-white/10 px-3 py-2">Ratio of real to apparent power</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Rated speed</td>
                      <td className="border border-white/10 px-3 py-2">1460 rpm</td>
                      <td className="border border-white/10 px-3 py-2">Full load speed (indicates 4-pole)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Efficiency</td>
                      <td className="border border-white/10 px-3 py-2">IE3 / 91.0%</td>
                      <td className="border border-white/10 px-3 py-2">Efficiency class and value at rated load</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Insulation class</td>
                      <td className="border border-white/10 px-3 py-2">F</td>
                      <td className="border border-white/10 px-3 py-2">Maximum winding temperature 155 degrees C</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Duty cycle</td>
                      <td className="border border-white/10 px-3 py-2">S1</td>
                      <td className="border border-white/10 px-3 py-2">Continuous duty at rated load</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Frame size</td>
                      <td className="border border-white/10 px-3 py-2">160M</td>
                      <td className="border border-white/10 px-3 py-2">160mm shaft height, medium length</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Protection</td>
                      <td className="border border-white/10 px-3 py-2">IP55</td>
                      <td className="border border-white/10 px-3 py-2">Dust protected, water jet protected</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Duty Cycles (IEC 60034-1)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Duty</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">HVAC Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-bold">S1</td>
                      <td className="border border-white/10 px-3 py-2">Continuous duty</td>
                      <td className="border border-white/10 px-3 py-2">AHU fans, pumps, chillers</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">S2</td>
                      <td className="border border-white/10 px-3 py-2">Short-time duty (10, 30, 60, 90 min)</td>
                      <td className="border border-white/10 px-3 py-2">Fire damper actuators</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">S3</td>
                      <td className="border border-white/10 px-3 py-2">Intermittent periodic duty</td>
                      <td className="border border-white/10 px-3 py-2">Cooling tower fans (on/off control)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">S4</td>
                      <td className="border border-white/10 px-3 py-2">Intermittent periodic with starting</td>
                      <td className="border border-white/10 px-3 py-2">Lift motors, crane hoists</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">S5</td>
                      <td className="border border-white/10 px-3 py-2">Intermittent with electric braking</td>
                      <td className="border border-white/10 px-3 py-2">Positioning drives</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">S6-S10</td>
                      <td className="border border-white/10 px-3 py-2">Various cyclic duties</td>
                      <td className="border border-white/10 px-3 py-2">Specialist applications</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">IEC Frame Sizes (Shaft Height)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Frame</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Shaft Height</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Power Range (4-pole)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">80</td>
                      <td className="border border-white/10 px-3 py-2">80mm</td>
                      <td className="border border-white/10 px-3 py-2">0.55-1.1kW</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">100</td>
                      <td className="border border-white/10 px-3 py-2">100mm</td>
                      <td className="border border-white/10 px-3 py-2">1.5-3kW</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">132</td>
                      <td className="border border-white/10 px-3 py-2">132mm</td>
                      <td className="border border-white/10 px-3 py-2">5.5-11kW</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">160</td>
                      <td className="border border-white/10 px-3 py-2">160mm</td>
                      <td className="border border-white/10 px-3 py-2">11-18.5kW</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">180</td>
                      <td className="border border-white/10 px-3 py-2">180mm</td>
                      <td className="border border-white/10 px-3 py-2">22kW</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">200</td>
                      <td className="border border-white/10 px-3 py-2">200mm</td>
                      <td className="border border-white/10 px-3 py-2">30-37kW</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">225</td>
                      <td className="border border-white/10 px-3 py-2">225mm</td>
                      <td className="border border-white/10 px-3 py-2">45-55kW</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">250-315</td>
                      <td className="border border-white/10 px-3 py-2">250-315mm</td>
                      <td className="border border-white/10 px-3 py-2">75-200kW</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Motor Selection Checklist for HVAC</p>
              <div className="p-4 rounded-lg bg-white/5">
                <ol className="text-sm text-white space-y-2 list-decimal list-outside ml-5">
                  <li className="pl-1"><strong>Power requirement:</strong> Calculate shaft power needed (with margin)</li>
                  <li className="pl-1"><strong>Speed:</strong> Match to driven equipment (direct or via gearbox/belt)</li>
                  <li className="pl-1"><strong>Voltage:</strong> Match supply (typically 400V three-phase in UK)</li>
                  <li className="pl-1"><strong>Efficiency:</strong> IE3 minimum, IE4 for high running hours</li>
                  <li className="pl-1"><strong>Duty cycle:</strong> S1 for continuous, or appropriate S-rating</li>
                  <li className="pl-1"><strong>Environment:</strong> IP rating, temperature range, altitude</li>
                  <li className="pl-1"><strong>Mounting:</strong> B3 (foot), B5 (flange), B14 (face), B35 (foot and flange)</li>
                  <li className="pl-1"><strong>Starting method:</strong> DOL, star-delta, soft start or VSD</li>
                  <li className="pl-1"><strong>Special requirements:</strong> Hazardous area, brake, encoder</li>
                </ol>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <p className="text-sm font-medium text-amber-300 mb-2">VSD Applications - Derating Considerations</p>
              <p className="text-sm text-white/90">
                When motors operate with variable speed drives at reduced speeds, cooling is compromised
                (shaft-mounted fan provides less airflow). For continuous operation below 50% speed,
                either <strong>oversize the motor</strong> or specify a <strong>force-ventilated motor</strong>
                with separate cooling fan.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Building services tip:</strong> For standard HVAC applications (fans, pumps),
              4-pole IE3 motors with IP55 protection are the default choice. 2-pole motors are used
              for high-speed applications like small centrifugal pumps.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <Gauge className="h-5 w-5 text-elec-yellow/80" />
            Worked Examples
          </h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Calculating Synchronous Speed and Slip</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 6-pole motor operates on a 50Hz supply and runs at 960 rpm at full load. Calculate the synchronous speed and percentage slip.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Synchronous speed Ns = (120 x f) / p</p>
                <p>Ns = (120 x 50) / 6 = <strong>1000 rpm</strong></p>
                <p className="mt-2">Slip s = (Ns - Nr) / Ns x 100%</p>
                <p>s = (1000 - 960) / 1000 x 100% = <strong>4%</strong></p>
                <p className="mt-2 text-white/60">This is typical slip for a fully loaded motor</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Verifying Nameplate Data</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A motor nameplate shows: 400V, 15kW, 28A, cos phi 0.87, efficiency 91.5%. Verify these values are consistent.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Input power = Output power / Efficiency</p>
                <p>Pin = 15,000W / 0.915 = 16,393W</p>
                <p className="mt-2">From three-phase power formula:</p>
                <p>Pin = root3 x V x I x cos(phi)</p>
                <p>Pin = 1.732 x 400 x 28 x 0.87 = <strong>16,874W</strong></p>
                <p className="mt-2 text-green-400">Values are consistent (small difference due to rounding)</p>
                <p className="text-white/60">This verification confirms nameplate data is correct</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Energy Savings from Motor Upgrade</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> An AHU fan motor (22kW, 4-pole) runs 6000 hours/year. Compare annual running costs for IE2 (90.5%) vs IE4 (93.0%) at 18p/kWh.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>IE2 annual energy: 22kW / 0.905 x 6000h = 145,856 kWh</p>
                <p>IE2 annual cost: 145,856 x 0.18 = <strong>26,254 pounds</strong></p>
                <p className="mt-2">IE4 annual energy: 22kW / 0.930 x 6000h = 141,935 kWh</p>
                <p>IE4 annual cost: 141,935 x 0.18 = <strong>25,548 pounds</strong></p>
                <p className="mt-2 text-green-400">Annual saving: 706 pounds</p>
                <p className="text-white/60">Over 15-year motor life: 10,590 pounds saved</p>
                <p className="text-white/60">Plus reduced carbon emissions: ~0.7 tonnes CO2/year</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 4: Motor Selection for Variable Speed Pump</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Select a motor for a LPHW pump requiring 7.5kW at full speed, operating continuously via VSD at 30-100% speed. Ambient temperature 40 degrees C.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Base requirement: 7.5kW, 4-pole, 400V, IE3</p>
                <p className="mt-2">VSD derating factor (continuous below 50%): 0.85</p>
                <p>Required motor rating: 7.5 / 0.85 = 8.8kW</p>
                <p className="mt-2">High ambient derating (40 degrees C vs 40 degrees C standard): 1.0</p>
                <p>(No derating needed if standard 40 degrees C rated)</p>
                <p className="mt-2 text-green-400">Selection: 11kW IE3 motor (next standard size up)</p>
                <p className="text-white/60">Frame: 160M, IP55, Class F insulation</p>
                <p className="text-white/60">Alternative: 7.5kW force-ventilated motor</p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <Settings className="h-5 w-5 text-elec-yellow/80" />
            Practical Guidance
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Formulas</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Synchronous speed:</strong> Ns = 120f / p (rpm)</li>
                <li className="pl-1"><strong>Slip:</strong> s = (Ns - Nr) / Ns x 100%</li>
                <li className="pl-1"><strong>Power input:</strong> Pin = root3 x V x I x cos(phi)</li>
                <li className="pl-1"><strong>Efficiency:</strong> eta = Pout / Pin x 100%</li>
                <li className="pl-1"><strong>Torque:</strong> T = P / omega = P x 60 / (2 x pi x N)</li>
                <li className="pl-1"><strong>Affinity law (power):</strong> P2 / P1 = (N2 / N1) cubed</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">2-pole sync speed at 50Hz: <strong>3000 rpm</strong></li>
                <li className="pl-1">4-pole sync speed at 50Hz: <strong>1500 rpm</strong></li>
                <li className="pl-1">6-pole sync speed at 50Hz: <strong>1000 rpm</strong></li>
                <li className="pl-1">Typical full-load slip: <strong>2-6%</strong></li>
                <li className="pl-1">DOL starting current: <strong>6-8x FLC</strong></li>
                <li className="pl-1">IE3 minimum efficiency (11kW 4-pole): <strong>~91%</strong></li>
                <li className="pl-1">Class F max temperature: <strong>155 degrees C</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Undersizing:</strong> Not allowing margin for load variations and degradation</li>
                <li className="pl-1"><strong>Oversizing:</strong> Running motors at low load reduces efficiency and power factor</li>
                <li className="pl-1"><strong>Wrong duty rating:</strong> Using S1 motor for intermittent duty without checking</li>
                <li className="pl-1"><strong>VSD derating:</strong> Not accounting for reduced cooling at low speeds</li>
                <li className="pl-1"><strong>Environment:</strong> Ignoring ambient temperature and altitude derating</li>
                <li className="pl-1"><strong>Frame compatibility:</strong> Not checking mounting dimensions when replacing motors</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <RotateCcw className="h-5 w-5 text-elec-yellow/80" />
            Common Questions
          </h2>
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
                <p className="font-medium text-white mb-1">Induction Motor Basics</p>
                <ul className="space-y-0.5">
                  <li>Ns = 120f / p (synchronous speed)</li>
                  <li>Slip essential for torque production</li>
                  <li>Typical slip 2-6% at full load</li>
                  <li>Starting current 6-8x full load</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Selection Criteria</p>
                <ul className="space-y-0.5">
                  <li>IE3 minimum efficiency class</li>
                  <li>Match duty cycle (S1-S10)</li>
                  <li>Account for VSD derating</li>
                  <li>Check frame size compatibility</li>
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
            <Link to="../h-n-c-module8-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 4
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section4-2">
              Next: Starting Methods
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule8Section4_1;
