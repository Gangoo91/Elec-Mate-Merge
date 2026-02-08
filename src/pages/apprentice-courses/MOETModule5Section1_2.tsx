import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Proximity and Position Sensors - MOET Module 5 Section 1.2";
const DESCRIPTION = "Comprehensive guide to proximity and position sensors for maintenance technicians: inductive, capacitive, optical and ultrasonic sensors, NPN/PNP outputs, switching distances and fault-finding. ST1426 aligned.";

const quickCheckQuestions = [
  {
    id: "inductive-principle",
    question: "What is the operating principle of an inductive proximity sensor?",
    options: [
      "It detects changes in light intensity reflected from a target",
      "It generates a high-frequency electromagnetic field and detects the eddy current losses when a metallic target enters the field",
      "It measures the capacitance between two plates separated by the target material",
      "It uses ultrasonic sound waves to measure distance to the target"
    ],
    correctIndex: 1,
    explanation: "An inductive proximity sensor contains an oscillator that generates a high-frequency electromagnetic field at the sensing face. When a metallic target enters this field, eddy currents are induced in the target, which absorb energy from the oscillator. The resulting change in oscillator amplitude is detected by the trigger circuit, which switches the output."
  },
  {
    id: "capacitive-detection",
    question: "Which sensor type can detect non-metallic materials such as plastics, liquids and powders?",
    options: [
      "Inductive proximity sensor",
      "Magnetic reed switch",
      "Capacitive proximity sensor",
      "Hall effect sensor"
    ],
    correctIndex: 2,
    explanation: "Capacitive proximity sensors detect changes in the dielectric constant of the medium between the sensor face and the target. Because any material with a dielectric constant greater than air will cause a detectable change, capacitive sensors can detect metals, plastics, glass, liquids, powders and granular materials."
  },
  {
    id: "npn-pnp-output",
    question: "What is the difference between an NPN and PNP proximity sensor output?",
    options: [
      "NPN sensors are more accurate than PNP sensors",
      "NPN switches the load to the negative rail (sinking); PNP switches the load to the positive rail (sourcing)",
      "NPN is used for AC circuits; PNP is used for DC circuits",
      "There is no practical difference — the terms are interchangeable"
    ],
    correctIndex: 1,
    explanation: "NPN (sinking) sensors switch the load connection to the 0 V (negative) rail when activated — the load is connected between the sensor output and the positive supply. PNP (sourcing) sensors switch the load connection to the positive rail — the load is connected between the sensor output and the 0 V rail. PNP is more common in European and UK installations."
  },
  {
    id: "photoelectric-modes",
    question: "In a through-beam photoelectric sensor arrangement, where are the emitter and receiver positioned?",
    options: [
      "Both are housed in the same unit facing the target",
      "The emitter and receiver face each other across the detection zone, and the target breaks the beam",
      "The emitter is mounted above and the receiver below the target",
      "They are both aimed at a reflector panel behind the target"
    ],
    correctIndex: 1,
    explanation: "In through-beam (opposed) mode, the emitter and receiver are separate units mounted facing each other. The target is detected when it passes between them and interrupts the light beam. This gives the longest sensing range (up to 60 m) and the most reliable detection, but requires wiring to both sides of the detection zone."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "An inductive proximity sensor will reliably detect which of the following targets?",
    options: [
      "A glass bottle",
      "A cardboard box",
      "A mild steel bracket",
      "A polythene bag"
    ],
    correctAnswer: 2,
    explanation: "Inductive proximity sensors detect metallic targets only. They work by sensing eddy current losses in conductive materials. Mild steel (ferrous metal) provides the best detection range. Non-metallic materials such as glass, cardboard and plastic cannot be detected by inductive sensors."
  },
  {
    id: 2,
    question: "The rated sensing distance (Sn) of an inductive sensor is specified for which target material?",
    options: [
      "Copper",
      "Aluminium",
      "Mild steel (Fe 360)",
      "Stainless steel"
    ],
    correctAnswer: 2,
    explanation: "The rated sensing distance (Sn) is always specified for a standard target of mild steel (Fe 360) with defined dimensions (typically a square plate with side length equal to the sensor diameter or 3 times the sensing distance). For non-ferrous metals, a correction factor must be applied — typically 0.4 for copper and 0.3-0.5 for aluminium."
  },
  {
    id: 3,
    question: "A capacitive proximity sensor is installed to detect the level of a liquid inside a plastic tank. What does the sensor actually measure?",
    options: [
      "The temperature of the liquid",
      "The weight of the liquid pressing on the sensor face",
      "The change in capacitance caused by the liquid's dielectric constant being higher than air",
      "The electrical conductivity of the liquid"
    ],
    correctAnswer: 2,
    explanation: "The capacitive sensor measures the change in capacitance at its sensing face. The liquid has a dielectric constant significantly higher than air (water is approximately 80 versus 1 for air), which increases the capacitance and triggers the sensor. Sensitivity adjustment is critical to prevent false triggering through the tank wall."
  },
  {
    id: 4,
    question: "A PNP (sourcing) proximity sensor is connected to a PLC digital input. Which statement is correct?",
    options: [
      "The PLC input must be configured for sinking (NPN-compatible) to work with a PNP sensor",
      "The PLC input must be configured for sourcing to work with a PNP sensor",
      "PNP sensors cannot be connected to PLCs",
      "The PLC configuration does not matter"
    ],
    correctAnswer: 0,
    explanation: "A PNP (sourcing) sensor provides a positive voltage to the PLC input when activated. The PLC input must therefore be configured as sinking — it receives current from the sensor. Conversely, an NPN (sinking) sensor requires a sourcing PLC input. Mismatching source/sink configurations will result in the input not being read correctly."
  },
  {
    id: 5,
    question: "Which photoelectric sensing mode offers the longest detection range?",
    options: [
      "Diffuse (direct reflection)",
      "Retro-reflective",
      "Through-beam (opposed)",
      "Background suppression"
    ],
    correctAnswer: 2,
    explanation: "Through-beam (opposed) mode provides the longest range — up to 60 m for some models. The emitter and receiver are separate units facing each other, giving a strong, focused signal. Retro-reflective typically reaches 10-15 m, whilst diffuse sensors are generally limited to 0.1-2 m depending on the target surface."
  },
  {
    id: 6,
    question: "An ultrasonic proximity sensor is preferred over an optical sensor when:",
    options: [
      "The detection range exceeds 50 m",
      "The target is transparent glass or clear liquid",
      "The environment contains dust, mist or steam that would block light",
      "Maximum switching speed is required"
    ],
    correctAnswer: 2,
    explanation: "Ultrasonic sensors use sound waves rather than light, making them immune to optical interference such as dust, mist, steam, and varying surface colours. They can also detect transparent materials that optical sensors may miss. However, they are slower than optical sensors and may be affected by temperature changes that alter the speed of sound."
  },
  {
    id: 7,
    question: "A maintenance technician finds that an inductive proximity sensor is not detecting a target that is within the rated sensing distance. The first check should be:",
    options: [
      "Replace the sensor immediately",
      "Verify the supply voltage at the sensor terminals and check the LED indicator status",
      "Increase the sensitivity adjustment",
      "Change the target material"
    ],
    correctAnswer: 1,
    explanation: "The first step in any sensor fault-finding is to verify that the sensor has the correct supply voltage at its terminals (typically 10-30 V DC) and to observe the built-in LED indicator. If the LED does not illuminate at all, the issue is likely a wiring or supply fault. If the LED illuminates but does not change state with the target, the sensor may be faulty or the target may be unsuitable."
  },
  {
    id: 8,
    question: "The 'hysteresis' specification of a proximity sensor describes:",
    options: [
      "The maximum switching frequency of the sensor",
      "The difference between the switch-on point and the switch-off point as the target approaches and then retreats",
      "The delay between the target entering the field and the output changing state",
      "The temperature range over which the sensor operates"
    ],
    correctAnswer: 1,
    explanation: "Hysteresis is the difference between the operate point (target approaching) and the release point (target retreating). It prevents rapid on-off chatter when the target is near the switching threshold. Typical hysteresis values are 5-20 % of the sensing distance. Without hysteresis, output oscillation could damage relay contacts or cause erratic PLC behaviour."
  },
  {
    id: 9,
    question: "A retro-reflective photoelectric sensor uses a reflector on the opposite side of the detection zone. The advantage over a through-beam arrangement is:",
    options: [
      "Longer detection range",
      "Only one cable run is needed — both emitter and receiver are in the same housing",
      "Better detection of transparent objects",
      "Higher switching frequency"
    ],
    correctAnswer: 1,
    explanation: "The main advantage of retro-reflective mode is that the emitter and receiver are in the same housing, requiring only one cable run and one mounting point. The reflector on the opposite side is passive (no wiring needed). This reduces installation cost and complexity compared to through-beam, where both emitter and receiver need power and signal connections."
  },
  {
    id: 10,
    question: "An encoder mounted on a motor shaft provides:",
    options: [
      "The temperature of the motor windings",
      "The vibration frequency of the motor bearings",
      "Position, speed and/or direction information by generating digital pulses proportional to shaft rotation",
      "The torque output of the motor"
    ],
    correctAnswer: 2,
    explanation: "An encoder converts rotary or linear motion into digital pulse signals. An incremental encoder produces a set number of pulses per revolution, allowing speed and relative position to be calculated. An absolute encoder outputs a unique digital code for each shaft position, providing position information even after power loss."
  },
  {
    id: 11,
    question: "The 'flush' and 'non-flush' mounting styles of an inductive sensor refer to:",
    options: [
      "Whether the sensor face is level with the mounting surface or protrudes from it",
      "Whether the sensor has a cable or connector output",
      "Whether the sensor is rated for washdown environments",
      "The colour of the sensor housing"
    ],
    correctAnswer: 0,
    explanation: "A flush-mounted sensor can be installed with its face level with the surrounding metal surface because it has a focused electromagnetic field. A non-flush sensor must protrude from the mounting surface with a free zone around the face. Non-flush sensors offer a longer sensing distance for a given diameter, but require more space. Flush mounting provides better mechanical protection."
  },
  {
    id: 12,
    question: "Which proximity sensor technology would be most suitable for detecting the position of a pneumatic cylinder piston through a non-magnetic aluminium cylinder barrel?",
    options: [
      "Standard inductive proximity sensor",
      "Magnetic reed switch or Hall effect sensor detecting the piston's permanent magnet",
      "Capacitive proximity sensor",
      "Ultrasonic proximity sensor"
    ],
    correctAnswer: 1,
    explanation: "Pneumatic cylinders commonly have a permanent magnet embedded in the piston. Reed switches or Hall effect sensors are mounted externally on the cylinder barrel and detect the magnetic field through the non-magnetic aluminium wall. This is a clean, reliable and industry-standard method for cylinder position sensing."
  }
];

const faqs = [
  {
    question: "Can I use an inductive sensor to detect aluminium or stainless steel?",
    answer: "Yes, but with reduced sensing distance. The rated sensing distance (Sn) is specified for mild steel. Non-ferrous metals have lower correction factors: aluminium typically 0.3-0.5, brass 0.4-0.5, stainless steel 0.6-0.85 depending on the grade. 'All-metal' or 'factor 1' inductive sensors are available that provide the same sensing distance for all metals, but at higher cost."
  },
  {
    question: "What is the difference between NO (normally open) and NC (normally closed) proximity sensors?",
    answer: "A normally open (NO) sensor output is off (no current flow) when no target is present, and switches on when a target is detected. A normally closed (NC) sensor output is on (current flowing) when no target is present, and switches off when a target is detected. NC outputs are preferred for safety-critical applications because a wire break will be detected as a fault (loss of signal), not ignored."
  },
  {
    question: "Why does my proximity sensor work intermittently?",
    answer: "Common causes of intermittent operation include: the target is at the edge of the sensing range (increase overlap or use a sensor with greater range); vibration is causing the gap to vary; loose or corroded wiring connections; inadequate supply voltage (check at the sensor terminals, not just at the panel); electromagnetic interference from nearby VSD cables or welding equipment."
  },
  {
    question: "How do I choose between a photoelectric sensor and an inductive sensor?",
    answer: "Use an inductive sensor when detecting metallic targets at short range (typically under 40 mm) in industrial environments — they are robust, sealed, and have no alignment requirements. Use a photoelectric sensor when you need longer range, when detecting non-metallic objects, or when you need to detect the presence or absence of items on a conveyor regardless of material."
  },
  {
    question: "What IP rating do proximity sensors need for washdown environments?",
    answer: "For food and beverage or pharmaceutical washdown environments, sensors should be rated IP67 minimum (protected against temporary immersion) and preferably IP69K (protected against high-pressure, high-temperature washdown). Stainless steel housings (316L) and FDA-compliant materials are typically required. ECOLAB-approved sensors are recommended for chemical cleaning resistance."
  },
  {
    question: "Can proximity sensors be used in ATEX hazardous areas?",
    answer: "Yes, but only sensors specifically certified for the hazardous area classification. ATEX-rated sensors are available in intrinsically safe (Ex ia/ib), increased safety (Ex e) and encapsulated (Ex m) versions. They must be installed with certified barriers or interfaces and the complete loop must be assessed for compliance with BS EN 60079 and the DSEAR Regulations."
  }
];

const MOETModule5Section1_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section1">
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
            <Shield className="h-4 w-4" />
            <span>Module 5.1.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Proximity and Position Sensors
          </h1>
          <p className="text-white/80">
            Inductive, capacitive, optical and ultrasonic proximity sensors for industrial detection
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Inductive:</strong> Detect metallic targets using electromagnetic fields — short range, very robust</li>
              <li className="pl-1"><strong>Capacitive:</strong> Detect any material (including liquids, powders) via capacitance change</li>
              <li className="pl-1"><strong>Photoelectric:</strong> Use light beams for long-range, non-contact detection of any object</li>
              <li className="pl-1"><strong>Outputs:</strong> NPN (sinking) or PNP (sourcing) — must match PLC input configuration</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Fault-finding:</strong> Check supply voltage, LED status and output state with multimeter</li>
              <li className="pl-1"><strong>Replacement:</strong> Match type, sensing distance, output (NPN/PNP, NO/NC), voltage and connector</li>
              <li className="pl-1"><strong>Alignment:</strong> Through-beam and retro-reflective sensors require precise optical alignment</li>
              <li className="pl-1"><strong>ST1426:</strong> Maps to control and instrumentation maintenance knowledge</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the operating principle of inductive, capacitive and photoelectric proximity sensors",
              "Identify NPN (sinking) and PNP (sourcing) output configurations and match them to PLC inputs",
              "Describe through-beam, retro-reflective and diffuse photoelectric sensing modes",
              "Select the appropriate sensor technology for common industrial detection tasks",
              "Apply systematic fault-finding procedures to proximity sensor circuits",
              "Specify replacement sensors using manufacturer data sheets and correction factors"
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

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Inductive Proximity Sensors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Inductive proximity sensors are the workhorses of industrial automation. Found on every production line, packaging machine and conveyor system, they detect the presence or absence of metallic objects without physical contact. Their sealed, solid-state construction — with no moving parts — makes them extremely reliable in harsh industrial environments where mechanical switches would rapidly wear out.
            </p>
            <p>
              The sensor contains an oscillator coil wound around a ferrite core at the sensing face. The oscillator generates a high-frequency alternating electromagnetic field (typically 100-600 kHz) that radiates from the face. When a metallic target enters this field, eddy currents are induced in the target surface. These eddy currents absorb energy from the oscillator, reducing its amplitude. A Schmitt trigger circuit detects this reduction and switches the output.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Specifications</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Sensing distance (Sn):</strong> Rated for mild steel standard target — ranges from 1 mm (M8 barrel) to 40 mm (M30 barrel) for standard sensors</li>
                <li className="pl-1"><strong>Correction factors:</strong> Non-ferrous metals reduce the effective range — aluminium approximately 0.4, copper approximately 0.4, brass approximately 0.5, stainless steel approximately 0.7</li>
                <li className="pl-1"><strong>Hysteresis:</strong> Typically 5-15 % of Sn — prevents output chatter at the switching threshold</li>
                <li className="pl-1"><strong>Switching frequency:</strong> Up to 5000 Hz for short-range sensors — critical for high-speed counting applications</li>
                <li className="pl-1"><strong>Supply voltage:</strong> Typically 10-30 V DC (some models 10-60 V DC)</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Flush vs Non-Flush Mounting</p>
              <p className="text-sm text-white mb-3">
                Mounting style affects the sensing distance and installation requirements:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Flush (embeddable):</strong> Can be mounted with the face level with the surrounding metal surface. The electromagnetic field is focused forward. Provides a shorter sensing distance but better mechanical protection.</li>
                <li className="pl-1"><strong>Non-flush (non-embeddable):</strong> Must protrude from the mounting surface with a clear zone around the face equal to the sensor diameter. Provides approximately double the sensing distance of a flush sensor of the same diameter.</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Inductive Sensor Sizes and Typical Ranges</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Barrel Size</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Flush Sn</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Non-Flush Sn</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2">M8</td><td className="border border-white/10 px-3 py-2">1.5 mm</td><td className="border border-white/10 px-3 py-2">3 mm</td><td className="border border-white/10 px-3 py-2">Small part detection, precision positioning</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">M12</td><td className="border border-white/10 px-3 py-2">2-4 mm</td><td className="border border-white/10 px-3 py-2">4-8 mm</td><td className="border border-white/10 px-3 py-2">General purpose, conveyor detection</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">M18</td><td className="border border-white/10 px-3 py-2">5-8 mm</td><td className="border border-white/10 px-3 py-2">8-14 mm</td><td className="border border-white/10 px-3 py-2">Machine guarding, cylinder position</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">M30</td><td className="border border-white/10 px-3 py-2">10-15 mm</td><td className="border border-white/10 px-3 py-2">15-30 mm</td><td className="border border-white/10 px-3 py-2">Heavy industry, large gap detection</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance tip:</strong> Always install inductive sensors with a gap of 70-80 % of the rated sensing distance to allow for manufacturing tolerances, temperature drift and target variations. Operating at exactly the rated distance is unreliable and will cause intermittent faults.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Capacitive and Ultrasonic Sensors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Where inductive sensors are limited to metallic targets, capacitive and ultrasonic sensors extend detection capability to virtually any material. Understanding when to use each type is a key competence for maintenance technicians working in process, food and beverage, pharmaceutical, and water treatment industries.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Capacitive Proximity Sensors</h3>
              <p className="text-sm text-white mb-3">
                Capacitive sensors detect changes in capacitance at the sensing face. The sensor contains two concentric plate electrodes that form one half of a capacitor. The target material — and the air gap — form the other half and the dielectric. When a material with a dielectric constant greater than air approaches the sensor face, the capacitance increases, triggering the output.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Detection capability:</strong> Metals, plastics, glass, wood, paper, liquids, powders and granular materials</li>
                <li className="pl-1"><strong>Level sensing:</strong> Can detect liquid levels through non-metallic tank walls (plastic, glass)</li>
                <li className="pl-1"><strong>Sensitivity adjustment:</strong> A potentiometer or teach-in function adjusts the trigger threshold — critical for through-wall detection</li>
                <li className="pl-1"><strong>Limitations:</strong> Sensitive to moisture, condensation and build-up on the sensing face; shorter range than inductive for metals</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Ultrasonic Proximity Sensors</h3>
              <p className="text-sm text-white mb-3">
                Ultrasonic sensors use sound waves (typically 40-400 kHz) to measure distance. A piezoelectric transducer emits a burst of ultrasonic pulses and measures the time of flight for the echo to return from the target. The distance is calculated from d = (v x t) / 2, where v is the speed of sound and t is the round-trip time.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Range:</strong> Typically 30 mm to 8 m depending on model and target size</li>
                <li className="pl-1"><strong>Material independence:</strong> Detects virtually any material — solid, liquid, powder — regardless of colour, transparency or surface finish</li>
                <li className="pl-1"><strong>Environmental immunity:</strong> Unaffected by dust, steam, mist and spray — ideal for harsh environments</li>
                <li className="pl-1"><strong>Dead zone:</strong> Cannot detect targets closer than the minimum range (typically 30-200 mm) due to transducer ringing</li>
                <li className="pl-1"><strong>Temperature sensitivity:</strong> Speed of sound varies with temperature — sensors must compensate or accuracy is affected</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Practical Consideration</p>
              <p className="text-sm text-white">
                Ultrasonic sensors can produce false echoes from structural steelwork, pipes or adjacent objects within the sound cone. When installing an ultrasonic sensor for level measurement, ensure the sound cone is clear of obstructions. The beam angle widens with distance — typically 5-12 degrees total — so mounting the sensor perpendicular to the surface being measured is essential for reliable operation.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Capacitive sensors are the go-to choice for detecting non-metallic materials at close range and for level detection through tank walls. Ultrasonic sensors are preferred when the environment is too harsh for optical sensors (dust, steam, spray) or when distance measurement is needed rather than simple presence detection.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Photoelectric Sensors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Photoelectric sensors use light (visible red, infrared or laser) to detect the presence, absence, position or distance of objects. They offer significantly longer sensing ranges than inductive or capacitive sensors and can detect objects of any material. Three main operating modes cover the vast majority of industrial applications.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Through-Beam (Opposed Mode)</h3>
                <p className="text-sm text-white mb-2">
                  The emitter and receiver are mounted in separate housings facing each other across the detection zone. The target is detected when it breaks the light beam between them.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Longest range: up to 60 m for standard models</li>
                  <li className="pl-1">Most reliable detection — strong signal, not dependent on target reflectivity</li>
                  <li className="pl-1">Can detect transparent and translucent materials</li>
                  <li className="pl-1">Disadvantage: requires wiring to both sides of the detection zone</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Retro-Reflective</h3>
                <p className="text-sm text-white mb-2">
                  The emitter and receiver are in the same housing. Light is transmitted to a reflector on the opposite side and returned to the receiver. The target is detected when it interrupts the reflected beam.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Range: up to 10-15 m</li>
                  <li className="pl-1">Only one wiring point — reflector is passive</li>
                  <li className="pl-1">Polarised filters prevent false triggering from shiny target surfaces</li>
                  <li className="pl-1">Difficulty detecting highly reflective targets without polarisation</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Diffuse (Direct Reflection)</h3>
                <p className="text-sm text-white mb-2">
                  The emitter and receiver are in the same housing. Light is transmitted toward the target and the receiver detects light scattered back from the target surface. No reflector is needed.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Range: typically 100 mm to 2 m (target-dependent)</li>
                  <li className="pl-1">Simplest installation — only one mounting point, no alignment</li>
                  <li className="pl-1">Detection range varies significantly with target colour and surface finish</li>
                  <li className="pl-1"><strong>Background suppression:</strong> Advanced variant that ignores objects beyond a set distance regardless of reflectivity</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Safety Warning</p>
              <p className="text-sm text-white">
                Photoelectric sensors used as part of a safety system (e.g., access detection for guarding) must be safety-rated light curtains or muting sensors conforming to BS EN 61496 and used with safety relay modules. Standard photoelectric sensors do not have the required redundancy, self-monitoring or response time for safety-of-persons applications.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance tip:</strong> Dirty lenses are the most common cause of photoelectric sensor failure. Establish a regular cleaning schedule and use sensors with built-in contamination compensation where possible. Laser-based sensors are more tolerant of contamination than LED-based models due to their focused beam.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Output Configurations and Wiring
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding sensor output configurations is essential for correct wiring and PLC integration. The two main DC output types — NPN (sinking) and PNP (sourcing) — determine how the sensor connects to the PLC digital input module. Mismatching the output type will result in the sensor appearing to not work, even though it is functioning correctly.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">NPN (Sinking) Output</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">When activated, the sensor switches the output pin to 0 V (negative rail)</li>
                  <li className="pl-1">The load (or PLC input) is connected between the sensor output and the positive supply</li>
                  <li className="pl-1">Current flows into the sensor output pin (it "sinks" current)</li>
                  <li className="pl-1">Common in Japanese and Asian manufactured equipment</li>
                  <li className="pl-1">Wire colours: Brown (+V), Blue (0 V), Black (output)</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">PNP (Sourcing) Output</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">When activated, the sensor switches the output pin to the positive supply rail</li>
                  <li className="pl-1">The load (or PLC input) is connected between the sensor output and 0 V</li>
                  <li className="pl-1">Current flows out of the sensor output pin (it "sources" current)</li>
                  <li className="pl-1">Standard in European and UK installations — matches most Siemens, Allen-Bradley, Schneider PLC inputs</li>
                  <li className="pl-1">Wire colours: Brown (+V), Blue (0 V), Black (output)</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">NO/NC and Complementary Outputs</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>NO (Normally Open):</strong> Output is off when no target is present; switches on when target detected</li>
                <li className="pl-1"><strong>NC (Normally Closed):</strong> Output is on when no target is present; switches off when target detected</li>
                <li className="pl-1"><strong>Complementary (NO+NC):</strong> Two output pins — one NO and one NC — for maximum flexibility</li>
                <li className="pl-1"><strong>Push-pull:</strong> Can drive both sinking and sourcing loads without external configuration</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Standard Wire Colours (3-Wire DC Sensors)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Wire Colour</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Function</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Connection</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2">Brown (BN)</td><td className="border border-white/10 px-3 py-2">Positive supply</td><td className="border border-white/10 px-3 py-2">+24 V DC</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Blue (BU)</td><td className="border border-white/10 px-3 py-2">Negative supply (0 V)</td><td className="border border-white/10 px-3 py-2">0 V DC</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Black (BK)</td><td className="border border-white/10 px-3 py-2">Output (NO)</td><td className="border border-white/10 px-3 py-2">PLC input</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">White (WH)</td><td className="border border-white/10 px-3 py-2">Output (NC) — 4-wire sensors only</td><td className="border border-white/10 px-3 py-2">PLC input (if used)</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> When replacing a proximity sensor, always verify whether the PLC input module is sinking or sourcing. A PNP sensor connected to a sourcing PLC input will not work — the PLC will never see the input change state. Check the PLC hardware manual or measure the voltage at the input terminal relative to 0 V with no sensor connected.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Position Sensors and Encoders
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Whilst proximity sensors detect the presence or absence of an object at a specific point, position sensors and encoders provide continuous information about position, speed or direction. They are essential components in servo systems, CNC machines, conveyor positioning and anywhere precise motion control is required.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Incremental Encoders</h3>
                <p className="text-sm text-white mb-2">
                  An incremental encoder generates a set number of pulses per revolution (PPR). The controller counts these pulses to determine speed and relative position. A second channel, offset by 90 degrees (quadrature), provides direction information.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Resolution: 100 to 10,000+ PPR (pulses per revolution)</li>
                  <li className="pl-1">Quadrature outputs (A and B channels) for direction detection</li>
                  <li className="pl-1">Index pulse (Z channel) provides one pulse per revolution for homing</li>
                  <li className="pl-1">Loses position on power loss — must be re-homed after restart</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Absolute Encoders</h3>
                <p className="text-sm text-white mb-2">
                  An absolute encoder outputs a unique digital code for each shaft position. Unlike an incremental encoder, it knows its exact position immediately on power-up without needing a homing sequence.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Single-turn: unique code for each position within one revolution (e.g., 12-bit = 4096 positions)</li>
                  <li className="pl-1">Multi-turn: tracks position across multiple revolutions using gear mechanisms or battery-backed counters</li>
                  <li className="pl-1">Output: parallel binary, SSI (Synchronous Serial Interface), or fieldbus (Profibus, EtherCAT)</li>
                  <li className="pl-1">Higher cost than incremental, but no position loss on power failure</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Linear Position Sensors</h3>
                <p className="text-sm text-white mb-2">
                  Linear position sensors measure displacement along a straight line. Common types include:
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>LVDT (Linear Variable Differential Transformer):</strong> Contactless, robust, analogue output — used in hydraulic actuators, precision measurement</li>
                  <li className="pl-1"><strong>Magnetostrictive:</strong> Absolute position along a waveguide — used in hydraulic cylinders</li>
                  <li className="pl-1"><strong>Potentiometric:</strong> Simple resistive slider — low cost but wears over time</li>
                  <li className="pl-1"><strong>Linear encoder:</strong> Optical or magnetic strip with read head — high resolution for CNC machines</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Under ST1426, maintenance technicians are expected to understand sensor types, their operating principles and common failure modes. You should be able to replace encoders, verify pulse counts with an oscilloscope or frequency counter, and interpret encoder data sheets for correct replacement specification.
            </p>
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
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section1-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Principles of Sensing
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section1-3">
              Next: Temperature and Pressure Sensors
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule5Section1_2;