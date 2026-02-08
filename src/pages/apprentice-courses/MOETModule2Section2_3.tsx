import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Single-Phase vs Three-Phase Systems - MOET Module 2.2.3";
const DESCRIPTION = "Comprehensive guide to single-phase and three-phase AC systems for maintenance technicians: 230 V single-phase, 400 V three-phase, star and delta connections, line vs phase values, neutral current, power calculations, balanced and unbalanced loads, and industrial applications under BS 7671 and ST1426.";

const quickCheckQuestions = [
  {
    id: "three-phase-voltage",
    question: "In a UK three-phase supply, the voltage between any two line conductors is 400 V. What is the voltage between any line and neutral?",
    options: [
      "200 V",
      "230 V",
      "325 V",
      "400 V"
    ],
    correctIndex: 1,
    explanation: "In a star-connected three-phase system, the line-to-neutral voltage (phase voltage) equals the line voltage divided by √3: VL-N = VL-L / √3 = 400 / 1.732 = 230 V. This is the standard UK single-phase supply voltage and is derived directly from the three-phase system."
  },
  {
    id: "star-delta",
    question: "In a star (Y) connection, the neutral point is formed by connecting together:",
    options: [
      "The start terminals of all three windings",
      "One end of each of the three phase windings",
      "The line conductors",
      "Two adjacent phase windings"
    ],
    correctIndex: 1,
    explanation: "In a star connection, one end of each of the three phase windings is connected to a common point called the star point (or neutral point). The other ends of the windings connect to the three line conductors (L1, L2, L3). The neutral conductor is connected to the star point, providing the reference for the 230 V line-to-neutral voltage."
  },
  {
    id: "balanced-load",
    question: "In a perfectly balanced three-phase four-wire system, the neutral current is:",
    options: [
      "Equal to one line current",
      "Three times the line current",
      "Zero",
      "Equal to the sum of all three line currents"
    ],
    correctIndex: 2,
    explanation: "In a perfectly balanced three-phase system, the three line currents are equal in magnitude and displaced by 120 degrees. When added vectorially, they cancel out completely, resulting in zero neutral current. This is one of the key advantages of three-phase systems — the neutral conductor carries no current under balanced conditions."
  },
  {
    id: "three-phase-power",
    question: "The total power in a balanced three-phase load is calculated as:",
    options: [
      "P = VL x IL",
      "P = 3 x VL x IL",
      "P = √3 x VL x IL x cos φ",
      "P = VL² / R"
    ],
    correctIndex: 2,
    explanation: "The total three-phase power is: P = √3 x VL x IL x cos φ. The √3 factor accounts for the 120-degree phase displacement between the three phases. For a 400 V supply with 100 A line current at unity power factor: P = 1.732 x 400 x 100 x 1 = 69.28 kW."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A UK domestic property is typically supplied with:",
    options: [
      "Single-phase 400 V",
      "Single-phase 230 V (one phase and neutral from the three-phase network)",
      "Three-phase 230 V",
      "DC 240 V"
    ],
    correctAnswer: 1,
    explanation: "UK domestic properties are typically supplied with single-phase 230 V — this is one phase conductor and a neutral conductor taken from the local three-phase distribution network. The DNO distributes three-phase 400 V along the street and connects individual properties to alternate phases to balance the load across the three-phase system."
  },
  {
    id: 2,
    question: "The phase displacement between L1, L2 and L3 in a three-phase supply is:",
    options: [
      "90 degrees",
      "120 degrees",
      "180 degrees",
      "360 degrees"
    ],
    correctAnswer: 1,
    explanation: "In a three-phase supply, the three phases are displaced by 120 degrees (one-third of a complete cycle). This means L2 lags L1 by 120 degrees, and L3 lags L1 by 240 degrees (or leads by 120 degrees). This uniform displacement is what produces the constant instantaneous power and rotating magnetic field that make three-phase systems so efficient."
  },
  {
    id: 3,
    question: "In a delta (Δ) connection, the relationship between line current and phase current is:",
    options: [
      "IL = IP (they are equal)",
      "IL = √3 x IP",
      "IL = IP / √3",
      "IL = 3 x IP"
    ],
    correctAnswer: 1,
    explanation: "In a delta connection, each line conductor is connected to the junction of two phase windings. The line current is the vector sum of the two phase currents meeting at each junction, giving: IL = √3 x IP. Conversely, in a delta connection the line voltage equals the phase voltage: VL = VP."
  },
  {
    id: 4,
    question: "Which connection type provides both 230 V and 400 V from the same system?",
    options: [
      "Delta connection",
      "Star connection with neutral",
      "Series connection",
      "Parallel connection"
    ],
    correctAnswer: 1,
    explanation: "A star connection with a neutral conductor provides two voltage levels: 400 V between any two lines (line voltage) and 230 V between any line and neutral (phase voltage). This is the standard distribution arrangement in the UK, allowing single-phase 230 V loads and three-phase 400 V loads to be supplied from the same system."
  },
  {
    id: 5,
    question: "A three-phase motor has a nameplate rating of 'Δ 400 V'. This means:",
    options: [
      "The motor requires a 400 V star connection",
      "Each motor winding is rated for 400 V, connected in delta across the 400 V supply",
      "The motor can only run on single-phase",
      "The motor windings are connected in series"
    ],
    correctAnswer: 1,
    explanation: "A delta 400 V rating means each motor winding is rated for 400 V and is connected directly across the 400 V line voltage in delta configuration. In star, each winding would only receive 230 V (400/√3). Many motors are dual-rated (e.g., Δ400V/Y690V), allowing the winding configuration to be changed to match the available supply voltage."
  },
  {
    id: 6,
    question: "An unbalanced three-phase load causes which of the following problems?",
    options: [
      "No problems — unbalance is normal and expected",
      "Current flowing in the neutral conductor, voltage imbalance between phases, increased losses",
      "The supply frequency changes",
      "All circuit breakers trip simultaneously"
    ],
    correctAnswer: 1,
    explanation: "Unbalanced loads cause neutral current to flow (which would be zero in a balanced system), create voltage imbalance between phases (the most heavily loaded phase has the lowest voltage), increase system losses (I²R losses increase with imbalance), and can cause overheating of the neutral conductor. Severe unbalance can also cause three-phase motors to overheat and fail."
  },
  {
    id: 7,
    question: "Star-delta starting of a three-phase motor reduces the starting current to approximately:",
    options: [
      "Half of the direct-on-line starting current",
      "One-third of the direct-on-line starting current",
      "One-quarter of the direct-on-line starting current",
      "One-tenth of the direct-on-line starting current"
    ],
    correctAnswer: 1,
    explanation: "Star-delta starting connects the motor in star during start-up, reducing the voltage across each winding to 230 V (instead of 400 V in delta). Since power is proportional to V², the starting current is reduced to approximately one-third (1/√3² = 1/3) of the direct-on-line delta current. The motor is then switched to delta for full-speed running."
  },
  {
    id: 8,
    question: "The main advantage of three-phase power over single-phase for industrial applications is:",
    options: [
      "Three-phase equipment is always smaller and cheaper",
      "Three-phase supplies provide constant instantaneous power and a rotating magnetic field for motors",
      "Three-phase is safer than single-phase",
      "Three-phase uses less copper for the neutral conductor"
    ],
    correctAnswer: 1,
    explanation: "Three-phase power delivers constant instantaneous power (unlike single-phase, which pulsates at 100 Hz). This means three-phase motors produce smooth, constant torque with no vibration. Three-phase also provides a naturally rotating magnetic field, allowing simple and robust induction motors with no starting mechanisms. Additionally, three-phase transmits 73% more power than single-phase using only 50% more conductors."
  },
  {
    id: 9,
    question: "A three-phase 400 V supply feeds a balanced load drawing 50 A per line at a power factor of 0.85. The total power consumed is:",
    options: [
      "17 kW",
      "29.4 kW",
      "34 kW",
      "58.8 kW"
    ],
    correctAnswer: 1,
    explanation: "Total three-phase power P = √3 x VL x IL x cos φ = 1.732 x 400 x 50 x 0.85 = 29,444 W ≈ 29.4 kW. This formula applies to both star and delta balanced loads when using line values. Always remember to include the power factor — without it, you would calculate the apparent power (kVA), not the real power (kW)."
  },
  {
    id: 10,
    question: "Phase rotation (phase sequence) is important because:",
    options: [
      "Incorrect phase rotation has no practical effect",
      "It only matters for lighting circuits",
      "Incorrect phase rotation causes three-phase motors to rotate in the wrong direction",
      "It determines the supply frequency"
    ],
    correctAnswer: 2,
    explanation: "Phase rotation (the order in which the three phases reach their peak values — typically L1-L2-L3) determines the direction of the rotating magnetic field in three-phase motors. Incorrect phase rotation causes the motor to rotate in the wrong direction, which can be dangerous for pumps, fans, conveyors and other driven equipment. Always verify phase rotation with a phase rotation meter before connecting three-phase motors."
  },
  {
    id: 11,
    question: "In a star-connected system, the relationship between line voltage and phase voltage is:",
    options: [
      "VL = VP",
      "VL = √3 x VP",
      "VL = VP / √3",
      "VL = 3 x VP"
    ],
    correctAnswer: 1,
    explanation: "In a star connection, the line voltage is √3 times the phase voltage: VL = √3 x VP. This is because the line voltage is the vector difference between two phase voltages 120 degrees apart. For the UK: VP = 230 V, so VL = 1.732 x 230 = 400 V (approximately). The line current equals the phase current in a star connection: IL = IP."
  },
  {
    id: 12,
    question: "Which of the following loads is most likely to cause a significant neutral current in a three-phase four-wire system?",
    options: [
      "A three-phase induction motor (balanced three-wire load)",
      "Three identical heaters, one on each phase",
      "A large number of single-phase computer loads unevenly distributed across phases",
      "A three-phase transformer with no load connected"
    ],
    correctAnswer: 2,
    explanation: "Single-phase loads (computers, lighting, socket outlets) connected unevenly across the three phases create an unbalanced system with neutral current. Additionally, computer power supplies draw current rich in third harmonics, which add arithmetically in the neutral (they are in phase on all three lines). In modern office buildings, the neutral current can actually exceed the line current due to triplen harmonics — a significant fire risk if the neutral is undersized."
  }
];

const faqs = [
  {
    question: "Why is the UK three-phase voltage 400 V and not 690 V?",
    answer: "The UK three-phase line voltage of 400 V is derived from the single-phase voltage of 230 V via the √3 relationship: 230 x 1.732 ≈ 400 V. The system was designed primarily to deliver 230 V single-phase to domestic consumers from a star-connected distribution transformer. The 400 V line voltage is a consequence of this design. Higher distribution voltages (e.g., 690 V) are used in some industrial applications where the benefits of reduced current (and therefore smaller conductors) outweigh the increased safety precautions required."
  },
  {
    question: "Can I connect a three-phase motor to a single-phase supply?",
    answer: "A standard three-phase induction motor cannot run directly on a single-phase supply because single-phase cannot produce a rotating magnetic field. However, solutions exist: a variable speed drive (VSD) can convert single-phase to three-phase (with derating); a static phase converter or rotary phase converter can generate the third phase; and some small motors can be rewound for single-phase operation. Running a three-phase motor from a single-phase VSD typically requires derating the drive by 50%."
  },
  {
    question: "What happens if the neutral conductor breaks in a three-phase four-wire system?",
    answer: "A broken neutral in a three-phase four-wire system (with single-phase loads) is extremely dangerous. Without the neutral reference point, the voltage across each single-phase load is no longer fixed at 230 V — it redistributes based on the impedance of the loads. Lightly loaded phases see voltages rising towards 400 V, while heavily loaded phases see reduced voltage. Overvoltage can destroy equipment and cause fires. This is why neutral conductors must never be switched or fused in TN systems under BS 7671."
  },
  {
    question: "What is the difference between a TN-S, TN-C-S and TT earthing system?",
    answer: "These are the three main earthing arrangements defined by BS 7671. TN-S: separate neutral and earth conductors throughout (supply earth via cable sheath). TN-C-S (PME): combined neutral and earth in the supply cable (PEN conductor), separated at the consumer's installation. TT: no earth from the supply — the consumer provides their own earth electrode. The earthing system determines the fault loop impedance, the type of protective device required, and the maximum disconnection times for safety."
  },
  {
    question: "Why are some three-phase motors rated 400V/690V?",
    answer: "Dual-voltage motors have windings that can be connected in either delta (Δ) or star (Y). At 400 V supply: delta connection puts 400 V across each winding. At 690 V supply: star connection puts 690/√3 = 400 V across each winding. In both cases, each winding receives 400 V and the motor operates identically. This allows the same motor to be used on either 400 V or 690 V three-phase supplies simply by changing the terminal links. Star-delta starting on a 400 V supply temporarily connects the motor in star (winding voltage = 230 V), then switches to delta for running."
  }
];

const MOETModule2Section2_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section Overview
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
            <span>Module 2.2.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Single-Phase vs Three-Phase Systems
          </h1>
          <p className="text-white/80">
            Understanding single-phase and three-phase supply arrangements, connections and applications in electrical maintenance
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Single-phase:</strong> 230 V line-to-neutral — domestic and light commercial</li>
              <li className="pl-1"><strong>Three-phase:</strong> 400 V line-to-line — industrial motors, large loads</li>
              <li className="pl-1"><strong>Star (Y):</strong> VL = √3 x VP, provides both 230 V and 400 V</li>
              <li className="pl-1"><strong>Delta (Δ):</strong> IL = √3 x IP, used for motor windings and distribution</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Key Formulae</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Star:</strong> VL = √3 x VP | IL = IP</li>
              <li className="pl-1"><strong>Delta:</strong> VL = VP | IL = √3 x IP</li>
              <li className="pl-1"><strong>3φ Power:</strong> P = √3 x VL x IL x cos φ</li>
              <li className="pl-1"><strong>VL-N = VL-L / √3</strong> = 400/1.732 = 230 V</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the UK single-phase supply arrangement (230 V line-to-neutral)",
              "Describe three-phase generation and the 120-degree phase displacement",
              "Calculate line and phase values for star and delta connections",
              "Calculate three-phase power using P = √3 x VL x IL x cos φ",
              "Explain the effects of balanced and unbalanced loads on neutral current",
              "Identify applications for single-phase and three-phase supplies in industry"
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

        {/* Section 01: Single-Phase Supply */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Single-Phase Supply Arrangements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The single-phase supply is the most common electrical supply in the UK. Every domestic property,
              most small commercial premises and many individual circuits within larger installations use
              single-phase power. The UK single-phase supply is 230 V AC at 50 Hz, delivered as one line (phase)
              conductor and one neutral conductor, with a separate or combined earth conductor depending on the
              earthing arrangement.
            </p>
            <p>
              The single-phase supply is derived from the three-phase distribution network. At the local
              distribution transformer, the secondary winding is star-connected, producing three phase voltages
              of 230 V (line-to-neutral) and three line voltages of 400 V (line-to-line). Each domestic property
              is connected between one line conductor and the neutral, receiving 230 V. The DNO (Distribution
              Network Operator) connects adjacent properties to different phases to balance the load across the
              three-phase system.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Single-Phase Supply Characteristics</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Nominal voltage:</strong> 230 V +10%/-6% (216.2 V to 253 V) per ESQCR 2002</li>
                <li className="pl-1"><strong>Frequency:</strong> 50 Hz ± 1% (49.5-50.5 Hz normal operating range)</li>
                <li className="pl-1"><strong>Conductors:</strong> Line (L), neutral (N), earth (E or PE)</li>
                <li className="pl-1"><strong>Colour coding:</strong> Line = brown, neutral = blue, earth = green/yellow (BS 7671 harmonised colours)</li>
                <li className="pl-1"><strong>Maximum demand:</strong> Typically 60-100 A for domestic (14-23 kW), limited by the DNO service fuse</li>
                <li className="pl-1"><strong>Waveform:</strong> Sinusoidal — instantaneous power pulsates at 100 Hz (twice supply frequency)</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Limitations of Single-Phase</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Pulsating power:</strong> Single-phase power drops to zero twice per cycle (at the zero crossings). This causes vibration in single-phase motors and requires smoothing for sensitive DC loads</li>
                <li className="pl-1"><strong>No rotating field:</strong> Single-phase cannot produce a rotating magnetic field — single-phase motors require additional starting mechanisms (capacitor start, shaded pole, etc.)</li>
                <li className="pl-1"><strong>Limited power capacity:</strong> At 230 V and 100 A, maximum power is approximately 23 kW. Larger loads require three-phase supplies</li>
                <li className="pl-1"><strong>Conductor utilisation:</strong> Less efficient use of conductor material than three-phase for the same power transfer</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The neutral conductor carries the return current in a single-phase circuit.
              It is at or near earth potential under normal conditions but must be treated as a live conductor
              because it can become live at full line voltage if the neutral is broken upstream. Under BS 7671,
              the neutral must not be switched or fused independently of the line conductor in TN systems.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Three-Phase Supply */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Three-Phase Supply and Generation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Three-phase power is generated by an alternator with three separate windings displaced by 120
              electrical degrees around the stator. As the rotor turns, it induces three sinusoidal EMFs of
              equal magnitude but displaced in time by one-third of a cycle (120 degrees). This three-phase
              arrangement is the standard for power generation, transmission and distribution worldwide.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Advantages of Three-Phase Systems</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Constant instantaneous power:</strong> The sum of the three instantaneous powers is constant at all times — no pulsation, no vibration, smooth motor operation</li>
                <li className="pl-1"><strong>Rotating magnetic field:</strong> Three phases naturally produce a rotating magnetic field in three-phase motors — simple, robust, self-starting (no capacitors or centrifugal switches needed)</li>
                <li className="pl-1"><strong>Efficient power transmission:</strong> Three-phase transmits 73% more power than single-phase using only 50% more conductors (3 vs 2) and 75% of the copper weight</li>
                <li className="pl-1"><strong>Dual voltage levels:</strong> Star connection provides both line (400 V) and phase (230 V) voltages from the same system</li>
                <li className="pl-1"><strong>Reduced conductor sizing:</strong> For the same total power, three-phase line currents are lower than single-phase, requiring smaller conductors</li>
                <li className="pl-1"><strong>Balanced neutral:</strong> Under balanced conditions, neutral current is zero — reducing losses and allowing a smaller neutral conductor</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">UK Three-Phase Voltage Levels</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Level</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Voltage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Low voltage (LV)</td>
                      <td className="border border-white/10 px-3 py-2">400 V (line-to-line)</td>
                      <td className="border border-white/10 px-3 py-2">Final distribution to consumers, motors up to ~150 kW</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">High voltage (HV)</td>
                      <td className="border border-white/10 px-3 py-2">11 kV</td>
                      <td className="border border-white/10 px-3 py-2">Primary distribution, large industrial sites</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">High voltage</td>
                      <td className="border border-white/10 px-3 py-2">33 kV</td>
                      <td className="border border-white/10 px-3 py-2">Grid supply points, major substations</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Extra-high voltage</td>
                      <td className="border border-white/10 px-3 py-2">132 kV</td>
                      <td className="border border-white/10 px-3 py-2">Sub-transmission</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Transmission</td>
                      <td className="border border-white/10 px-3 py-2">275 kV / 400 kV</td>
                      <td className="border border-white/10 px-3 py-2">National Grid transmission (supergrid)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> All UK power stations generate three-phase AC (typically at 11-25 kV),
              which is stepped up to 275 kV or 400 kV for efficient transmission over the National Grid, then
              stepped down through a series of substations (132 kV, 33 kV, 11 kV, 400 V) for local distribution.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Star and Delta Connections */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Star and Delta Connections
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The three phase windings of a generator, transformer or motor can be connected in two fundamental
              configurations: star (Y) and delta (Δ). Each configuration has different voltage and current
              relationships between the line and phase quantities, and each has specific applications. Understanding
              these connections is critical for maintenance work on three-phase equipment.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Star (Y) Connection</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">One end of each winding connected to common star point</li>
                  <li className="pl-1">Other ends connect to line conductors</li>
                  <li className="pl-1">Neutral available from star point</li>
                  <li className="pl-1"><strong>VL = √3 x VP</strong> (400 = √3 x 230)</li>
                  <li className="pl-1"><strong>IL = IP</strong> (line current equals phase current)</li>
                  <li className="pl-1">Used for: distribution transformers, motor starting, generators</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Delta (Δ) Connection</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Windings connected end-to-end forming a closed loop</li>
                  <li className="pl-1">Line conductors connected at the junctions</li>
                  <li className="pl-1">No neutral point available</li>
                  <li className="pl-1"><strong>VL = VP</strong> (line voltage equals phase voltage)</li>
                  <li className="pl-1"><strong>IL = √3 x IP</strong> (400 V: line current is √3 x phase current)</li>
                  <li className="pl-1">Used for: motor running, power distribution, transformers</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Star-Delta (Y-Δ) Starting</p>
              <p className="text-sm text-white mb-3">
                Star-delta starting is a widely used method for reducing the starting current of three-phase
                induction motors. The sequence is:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Step 1 — Star:</strong> Motor connected in star. Each winding receives VP = VL/√3 = 230 V. Starting current reduced to 1/3 of direct-on-line delta current. Starting torque also reduced to 1/3</li>
                <li className="pl-1"><strong>Step 2 — Transition:</strong> After the motor has accelerated to near full speed (typically 3-10 seconds), the contactor switches from star to delta. A brief open transition occurs</li>
                <li className="pl-1"><strong>Step 3 — Delta:</strong> Motor connected in delta. Each winding receives VP = VL = 400 V. Motor operates at full voltage, full speed, full torque</li>
                <li className="pl-1"><strong>Limitation:</strong> The motor must be designed for delta running at the supply voltage (Δ400V). The reduced starting torque may be insufficient for high-inertia loads</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Motor Terminal Connections</p>
              <p className="text-sm text-white mb-3">
                Three-phase motor terminal boxes contain six terminals labelled U1, V1, W1 (start of windings)
                and U2, V2, W2 (end of windings). The link configuration determines the connection:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Star:</strong> U2, V2, W2 linked together (star point). Supply connected to U1, V1, W1</li>
                <li className="pl-1"><strong>Delta:</strong> U1-W2, V1-U2, W1-V2 linked. Supply connected at the junctions</li>
                <li className="pl-1"><strong>Always verify:</strong> Check the motor nameplate rating matches the supply voltage and the correct link configuration before energising</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance tip:</strong> When working on motor terminal boxes, always photograph the existing
              link configuration before removing any links. Incorrect reconnection can result in the motor running
              at reduced power (star instead of delta), overheating, or in the worst case, destruction of the
              windings due to excessive voltage.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Power Calculations and Balanced/Unbalanced Loads */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Three-Phase Power and Load Balancing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Calculating three-phase power is a fundamental skill for maintenance technicians. The standard
              formula uses line values (which are the values you measure at the terminals) and includes the
              power factor to account for the phase angle between voltage and current. Load balancing — ensuring
              approximately equal loading on all three phases — is essential for efficient and safe operation.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Three-Phase Power Formulae (Balanced Loads)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Real power (kW):</strong> P = √3 x VL x IL x cos φ</li>
                <li className="pl-1"><strong>Reactive power (kVAr):</strong> Q = √3 x VL x IL x sin φ</li>
                <li className="pl-1"><strong>Apparent power (kVA):</strong> S = √3 x VL x IL</li>
                <li className="pl-1"><strong>Power triangle:</strong> S² = P² + Q² (Pythagoras)</li>
                <li className="pl-1"><strong>Power factor:</strong> cos φ = P / S = kW / kVA</li>
              </ul>
              <div className="mt-3 p-3 rounded bg-white/5">
                <p className="text-xs text-white/80"><strong>Example:</strong> 400 V, 3-phase motor drawing 25 A at PF 0.85</p>
                <p className="text-xs text-white/80">P = √3 x 400 x 25 x 0.85 = 14.72 kW</p>
                <p className="text-xs text-white/80">S = √3 x 400 x 25 = 17.32 kVA</p>
                <p className="text-xs text-white/80">Q = √(17.32² - 14.72²) = 9.13 kVAr</p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Balanced vs Unbalanced Loads</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Characteristic</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Balanced</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Unbalanced</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Line currents</td>
                      <td className="border border-white/10 px-3 py-2">Equal on all three phases</td>
                      <td className="border border-white/10 px-3 py-2">Unequal — different loads on each phase</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Neutral current</td>
                      <td className="border border-white/10 px-3 py-2">Zero</td>
                      <td className="border border-white/10 px-3 py-2">Non-zero — can be significant</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Phase voltages</td>
                      <td className="border border-white/10 px-3 py-2">Equal (230 V each)</td>
                      <td className="border border-white/10 px-3 py-2">Unequal — voltage imbalance</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">System losses</td>
                      <td className="border border-white/10 px-3 py-2">Minimised</td>
                      <td className="border border-white/10 px-3 py-2">Increased I²R losses</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Motor operation</td>
                      <td className="border border-white/10 px-3 py-2">Smooth, efficient</td>
                      <td className="border border-white/10 px-3 py-2">Overheating, reduced efficiency, vibration</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Neutral Overloading — A Hidden Danger</p>
              <p className="text-sm text-white mb-3">
                In modern installations with large numbers of non-linear single-phase loads (computers, LED
                drivers, switch-mode power supplies), the neutral conductor can carry more current than the
                line conductors. This occurs because:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Third harmonic currents:</strong> Non-linear loads generate significant third harmonic (150 Hz) current. Unlike fundamental frequency currents, third harmonics from all three phases are in phase with each other and add arithmetically in the neutral</li>
                <li className="pl-1"><strong>Result:</strong> The neutral current can reach up to 1.73 times the line current in extreme cases</li>
                <li className="pl-1"><strong>Risk:</strong> Overheated neutral conductors, insulation damage, fire — particularly in older installations where the neutral was sized at 50% of line conductors</li>
                <li className="pl-1"><strong>Solution:</strong> Size the neutral at 100% of line conductors (or larger) in installations with significant non-linear loads. BS 7671 requires this consideration in the design process</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The maintenance technician must be able to identify single-phase and
              three-phase supplies, understand star and delta connections, calculate three-phase power and
              recognise the importance of load balancing. Phase rotation verification before motor connection
              is a critical maintenance procedure.
            </p>
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
            title="Test Your Knowledge — Single-Phase vs Three-Phase"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section2-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: AC Principles
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section2-4">
              Next: Frequency and Waveforms
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule2Section2_3;
