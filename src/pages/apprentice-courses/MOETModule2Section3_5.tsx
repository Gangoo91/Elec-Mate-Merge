import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Motor Starting Methods - MOET Module 2.3.5";
const DESCRIPTION = "Comprehensive guide to motor starting methods for maintenance technicians: direct-on-line (DOL), star-delta, auto-transformer, soft starter, variable speed drive (VSD), rotor resistance starting, current limiting, torque characteristics, protection coordination and BS 7671 compliance for ST1426.";

const quickCheckQuestions = [
  {
    id: "dol-starting-current",
    question: "A 15 kW three-phase induction motor has a full-load current of 28 A. When started direct-on-line (DOL), the typical starting current is approximately:",
    options: [
      "28 A",
      "56 A",
      "168–224 A",
      "500 A"
    ],
    correctIndex: 2,
    explanation: "DOL starting draws 6 to 8 times the full-load current. For a 28 A motor: 28 × 6 = 168 A to 28 × 8 = 224 A. This high inrush current lasts for several seconds until the motor reaches speed. While the motor can withstand this, the supply system, cables and protective devices must be rated to handle it. On weak supplies, the voltage dip caused by this inrush can affect other equipment — which is why reduced-voltage starting methods are often required."
  },
  {
    id: "star-delta-voltage",
    question: "During star-delta starting, the voltage applied to each motor winding during the star connection phase is:",
    options: [
      "Full line voltage (400 V)",
      "Line voltage divided by √3 (approximately 230 V)",
      "Half the line voltage (200 V)",
      "Line voltage divided by 3 (approximately 133 V)"
    ],
    correctIndex: 1,
    explanation: "In star connection, each winding receives the phase voltage, which is the line voltage divided by √3. For a 400 V supply: 400 / 1.732 = 231 V per winding. Since starting current is proportional to applied voltage, and starting torque is proportional to the square of the voltage, star-delta starting reduces the starting current to one-third and the starting torque to one-third of the DOL values. The motor is then switched to delta for full-voltage running."
  },
  {
    id: "soft-starter-principle",
    question: "A soft starter reduces motor starting current by:",
    options: [
      "Reducing the supply frequency during starting",
      "Switching resistance into the motor circuit",
      "Controlling the voltage applied to the motor using thyristors (phase-angle control)",
      "Changing the motor winding connections"
    ],
    correctIndex: 2,
    explanation: "A soft starter uses back-to-back thyristors (silicon controlled rectifiers) to control the voltage applied to the motor by varying the firing angle during each half-cycle. During starting, the voltage is ramped up gradually from a set initial level to the full supply voltage over a programmable time period. This provides a smooth, controlled current ramp without the current transients associated with star-delta changeover."
  },
  {
    id: "vsd-starting-advantage",
    question: "The primary advantage of using a variable speed drive (VSD) for motor starting, compared with a star-delta starter, is:",
    options: [
      "Lower capital cost",
      "Simpler installation with fewer cables",
      "Controlled starting current with full torque available from zero speed, and continuous speed control during running",
      "No need for motor overload protection"
    ],
    correctIndex: 2,
    explanation: "A VSD controls both voltage and frequency, so the motor can develop full rated torque from zero speed with a starting current limited to the motor's full-load current or less. Star-delta starting reduces both current and torque to one-third of DOL values, which may be insufficient for high-inertia loads. Additionally, a VSD provides continuous speed control during running, energy savings on variable-torque loads, and controlled deceleration — none of which star-delta offers."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Direct-on-line (DOL) starting is suitable for motors up to approximately:",
    options: [
      "0.5 kW",
      "7.5 kW (depending on supply capacity)",
      "50 kW",
      "Any size of motor"
    ],
    correctAnswer: 1,
    explanation: "While there is no absolute limit, DOL starting is typically used for motors up to about 7.5 kW on standard commercial/industrial supplies. Larger motors may cause unacceptable voltage dips on the supply, affecting other connected equipment. The distribution network operator (DNO) may impose limits on starting current — typically no more than 60-100 A starting current without prior agreement. The exact limit depends on the supply capacity and the prospective fault level at the point of connection."
  },
  {
    id: 2,
    question: "A star-delta starter requires the motor to have:",
    options: [
      "A single winding connection brought out to three terminals",
      "All six winding ends brought out to the terminal box (U1, V1, W1, U2, V2, W2)",
      "A wound rotor with slip rings",
      "A built-in centrifugal switch"
    ],
    correctAnswer: 1,
    explanation: "Star-delta starting requires access to both ends of each of the three stator windings — six terminals in total, designated U1, V1, W1 (start) and U2, V2, W2 (finish). The contactor arrangement connects the windings in star for starting and then switches to delta for running. A motor with only three terminals (internally connected in star or delta) cannot be used with a star-delta starter."
  },
  {
    id: 3,
    question: "During star-delta starting, the starting torque is approximately:",
    options: [
      "Equal to DOL starting torque",
      "One-half of DOL starting torque",
      "One-third of DOL starting torque",
      "Twice the DOL starting torque"
    ],
    correctAnswer: 2,
    explanation: "Torque is proportional to the square of the applied voltage. In star, each winding receives V_line/√3 voltage. Since torque ∝ V², the star torque = (1/√3)² = 1/3 of the DOL torque. Similarly, the starting current is reduced to one-third. This reduction in starting torque means star-delta is unsuitable for loads that require high starting torque (e.g., loaded conveyors, positive displacement pumps) — the motor may not accelerate to the changeover speed."
  },
  {
    id: 4,
    question: "The main disadvantage of star-delta starting is:",
    options: [
      "High starting current",
      "A current transient (spike) occurs at the star-to-delta changeover point",
      "It requires a variable frequency drive",
      "It can only be used with single-phase motors"
    ],
    correctAnswer: 1,
    explanation: "When the star-delta starter switches from star to delta, the motor is momentarily disconnected from the supply. When delta is reconnected, the motor draws a transient current that can be as high as the DOL starting current. This current spike can trip protective devices, cause voltage dips, and impose mechanical stress on the drive train. Closed-transition star-delta starters use resistors to maintain a current path during changeover, reducing but not eliminating this transient."
  },
  {
    id: 5,
    question: "An auto-transformer starter reduces starting current by:",
    options: [
      "Changing the motor winding connections",
      "Applying a reduced voltage from a tapped auto-transformer during starting",
      "Inserting resistance in the stator circuit",
      "Reducing the supply frequency"
    ],
    correctAnswer: 1,
    explanation: "An auto-transformer starter uses a tapped auto-transformer to supply the motor at a reduced voltage during starting — typically 50%, 65% or 80% of the supply voltage. The starting current drawn from the supply is reduced by the square of the voltage ratio (e.g., at 65% tap: supply current = 0.65² × DOL current = 42% of DOL). Once the motor reaches speed, the auto-transformer is bypassed and full voltage is applied."
  },
  {
    id: 6,
    question: "A soft starter provides which advantage over a star-delta starter?",
    options: [
      "Higher starting torque",
      "Smooth, stepless voltage ramp with no changeover transient",
      "Lower capital cost",
      "Speed control during running"
    ],
    correctAnswer: 1,
    explanation: "The key advantage of a soft starter is smooth, stepless voltage ramping from a set initial level to full voltage over a programmable time period. There is no abrupt changeover as with star-delta, so there is no current transient spike. The starting current and torque profiles can be adjusted to suit the application. However, a soft starter does not provide speed control during running — once at full speed, the thyristors are bypassed and the motor runs at mains frequency."
  },
  {
    id: 7,
    question: "When a variable speed drive (VSD) starts a motor, the starting current is typically limited to:",
    options: [
      "6-8 times full-load current (same as DOL)",
      "3 times full-load current",
      "100-150% of full-load current",
      "50% of full-load current"
    ],
    correctAnswer: 2,
    explanation: "A VSD starts the motor by applying a low-frequency, low-voltage supply and gradually increasing both to ramp the motor up to speed. The starting current is typically limited to 100-150% of the motor's full-load current by the drive's current-limiting function. This is dramatically lower than DOL (600-800%) or star-delta (200-300%) starting currents, and the motor develops full rated torque throughout the starting period because the V/f ratio is maintained."
  },
  {
    id: 8,
    question: "Rotor resistance starting is used with:",
    options: [
      "Squirrel-cage induction motors",
      "Wound-rotor (slip-ring) induction motors",
      "Synchronous motors",
      "Single-phase motors"
    ],
    correctAnswer: 1,
    explanation: "Rotor resistance starting is used with wound-rotor (slip-ring) induction motors. External resistance is connected to the rotor windings via slip rings. The added resistance increases the rotor circuit impedance, reducing the starting current while simultaneously increasing the starting torque (up to the maximum value). As the motor accelerates, the resistance is progressively short-circuited in stages. This method provides excellent starting characteristics but is now largely superseded by VSDs."
  },
  {
    id: 9,
    question: "Which motor starting method provides the lowest starting current drawn from the supply?",
    options: [
      "Direct-on-line (DOL)",
      "Star-delta",
      "Soft starter",
      "Variable speed drive (VSD)"
    ],
    correctAnswer: 3,
    explanation: "A VSD provides the lowest starting current because it controls both voltage and frequency, maintaining the V/f ratio to keep the motor flux constant while limiting the current to typically 100-150% of FLC. Soft starters typically limit starting current to 200-400% FLC, star-delta to approximately 200% FLC (one-third of DOL), and DOL draws 600-800% FLC. The VSD is the most technically advanced starting method and also provides the most controllable starting torque."
  },
  {
    id: 10,
    question: "When selecting a motor starting method, which of the following is the MOST important consideration?",
    options: [
      "The colour of the starter enclosure",
      "The starting torque required by the load, the supply capacity, and the acceptable voltage dip",
      "Whether the motor manufacturer is UK-based",
      "The ambient temperature of the motor room"
    ],
    correctAnswer: 1,
    explanation: "The three primary considerations for selecting a starting method are: (1) the starting torque required by the mechanical load — if the load needs high torque from standstill (e.g., a loaded conveyor), methods that reduce starting torque (star-delta) may be unsuitable; (2) the available supply capacity and acceptable voltage dip — the DNO limits on starting current may dictate reduced-current methods; and (3) the cost and complexity versus the frequency of starting and the criticality of the application."
  },
  {
    id: 11,
    question: "A DOL starter typically consists of:",
    options: [
      "A contactor, an overload relay, and a control circuit (start/stop)",
      "Three contactors and a timer",
      "A thyristor bridge and a control board",
      "An auto-transformer and a bypass contactor"
    ],
    correctAnswer: 0,
    explanation: "A DOL starter is the simplest motor starting arrangement: a main contactor (to switch the supply to the motor), an overload relay (thermal or electronic, to protect the motor from sustained overcurrent), and a control circuit with start and stop push-buttons plus a holding contact. The simplicity of DOL starters makes them reliable and inexpensive, which is why they are used wherever the supply can tolerate the high starting current."
  },
  {
    id: 12,
    question: "BS 7671 requires that motor circuits are protected by:",
    options: [
      "Only a fuse",
      "An overload protective device (for sustained overcurrent) and a short-circuit protective device (for fault current)",
      "A residual current device only",
      "A time-delay relay"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 Section 552 requires motor circuits to have two types of protection: overcurrent protection (to protect the motor and cables from sustained overloads — typically an overload relay set to the motor FLC) and short-circuit protection (to protect against fault currents — typically fuses or an MCCB rated to handle the high starting current without tripping). The overload device must allow the starting current to flow for the duration of the start without tripping, while still protecting against genuine overloads during running."
  }
];

const faqs = [
  {
    question: "How do I know which starting method is used on a motor I am maintaining?",
    answer: "Check the motor control panel documentation and single-line diagram. A DOL starter has a single contactor and an overload relay. A star-delta starter has three contactors (main, star, delta) and a changeover timer. A soft starter has a thyristor unit (typically with a heat sink and a bypass contactor). A VSD has an electronic drive unit with a control panel, DC bus capacitors and power semiconductor modules. The motor terminal box also gives clues — six terminals indicate star-delta capability, while three terminals suggest DOL or soft-start/VSD. The nameplate on the starter should identify the type and the settings."
  },
  {
    question: "Can I change the starting method on an existing motor installation?",
    answer: "Yes, but it requires careful engineering assessment. Changing from DOL to star-delta requires a motor with six terminals and a cable with six cores (or two three-core cables) to the motor. Changing to a soft starter or VSD requires verifying that the cable type is suitable (shielded cable is recommended for VSD installations to reduce electromagnetic interference), that the motor insulation can withstand the voltage waveform from a VSD (dV/dt stress on older motors), and that the protective devices and cable sizing remain adequate. Any change must be designed and verified in accordance with BS 7671."
  },
  {
    question: "Why does a motor sometimes fail to start with a star-delta starter but works with DOL?",
    answer: "Star-delta starting reduces the starting torque to one-third of the DOL value. If the load requires more torque to break away from standstill than the star-connected motor can provide, the motor will stall in star and may not reach sufficient speed before the timer switches to delta. Common causes include: belt-driven loads with high static friction, loaded conveyor belts, positive displacement pumps against back-pressure, and cold oil in hydraulic systems. The solution may be to use a soft starter or VSD that maintains better torque during starting, or to ensure the load is unloaded before starting."
  },
  {
    question: "What maintenance does a soft starter require?",
    answer: "Soft starters have fewer moving parts than star-delta starters (no changeover contactors) but do require maintenance: clean the heat sinks and check cooling fans (thyristors generate heat from conduction losses), check the bypass contactor contacts (if fitted — most soft starters bypass the thyristors once at full speed to reduce running losses), verify the current-limiting and ramp-time settings are still appropriate for the application, check for alarm/fault logs in the soft starter control panel, and perform periodic insulation resistance tests on the motor and cables. Replace the cooling fans every 3-5 years as a preventive measure."
  },
  {
    question: "What is a 'current spike' at star-delta changeover and how can it be prevented?",
    answer: "When a star-delta starter switches from star to delta, the motor is briefly disconnected from the supply (open-transition changeover). During this brief disconnection, the motor decelerates slightly and the rotor flux decays. When delta is reconnected, the motor is momentarily out of synchronisation with the supply, drawing a high transient current that can be comparable to DOL starting current. A closed-transition star-delta starter uses resistors to maintain a current path during the changeover, preventing the motor from becoming fully disconnected and significantly reducing the transient. Alternatively, modern installations use soft starters or VSDs which eliminate the changeover transient entirely."
  },
  {
    question: "How does a VSD provide full torque at low speed during starting?",
    answer: "A VSD maintains a constant voltage-to-frequency (V/f) ratio during starting. At low speed, both voltage and frequency are low — for example, at 10 Hz the voltage might be 80 V. This maintains the motor's magnetic flux at the design value, which in turn maintains the motor's ability to produce full rated torque. The current is limited to approximately 150% of full-load current by the drive's current controller. This is fundamentally different from reduced-voltage starting methods (star-delta, soft starter) which reduce voltage at mains frequency, causing the motor's magnetic flux to decrease and the torque to fall. VSDs with sensorless vector control or closed-loop vector control can provide even better torque control at low speeds."
  }
];

const MOETModule2Section3_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section3">
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
            <span>Module 2.3.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Motor Starting Methods
          </h1>
          <p className="text-white/80">
            Starting techniques, current limiting, torque characteristics and protection coordination
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>DOL:</strong> Full voltage, 6-8× FLC starting current, simplest method</li>
              <li className="pl-1"><strong>Star-delta:</strong> 1/3 current and torque, needs 6-terminal motor</li>
              <li className="pl-1"><strong>Soft starter:</strong> Thyristor voltage ramp, smooth start, no speed control</li>
              <li className="pl-1"><strong>VSD:</strong> V/f control, full torque from zero speed, lowest starting current</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Selection:</strong> Based on load torque, supply capacity and voltage dip limits</li>
              <li className="pl-1"><strong>Protection:</strong> Overload + short-circuit per BS 7671 Section 552</li>
              <li className="pl-1"><strong>Fault-finding:</strong> Timer settings, contactor sequencing, drive parameters</li>
              <li className="pl-1"><strong>ST1426:</strong> Understand and maintain motor starting equipment</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the principle and operation of DOL, star-delta, soft start and VSD starting methods",
              "Compare starting current and starting torque characteristics of each method",
              "Select an appropriate starting method based on load requirements and supply constraints",
              "Describe the components and operation of each type of motor starter",
              "Identify common faults and maintenance requirements for motor starting equipment",
              "Apply BS 7671 Section 552 requirements for motor circuit protection"
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
            Why Motor Starting Matters
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When an induction motor is started, the rotor is stationary and the slip is 100%. At this
              moment, the motor behaves almost like a short-circuited transformer — the impedance of the
              rotor circuit is very low, and the motor draws a very high current from the supply. This
              starting current (also called locked-rotor current or inrush current) is typically 6 to 8
              times the motor's full-load current (FLC) and persists until the motor accelerates close to
              its synchronous speed.
            </p>
            <p>
              This high starting current creates several problems. It causes a voltage dip on the supply
              system that can affect other connected equipment — lights may dim, sensitive electronics may
              malfunction, and other motors may stall. The supply cables, switchgear and protective devices
              must be rated to carry the starting current without tripping or overheating. The mechanical
              shock of the high starting torque can damage couplings, gearboxes and driven equipment. For
              these reasons, various starting methods have been developed to reduce the starting current
              and/or control the starting torque.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Relationships for Motor Starting</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Starting current ∝ applied voltage:</strong> Reducing the voltage proportionally reduces the current</li>
                <li className="pl-1"><strong>Starting torque ∝ (applied voltage)²:</strong> Reducing voltage to 58% (1/√3, as in star) reduces torque to 33% (1/3)</li>
                <li className="pl-1"><strong>Supply current reduction:</strong> For auto-transformer starting, the supply current is reduced by the square of the tap ratio</li>
                <li className="pl-1"><strong>VSD starting:</strong> Maintains V/f ratio, so full torque is available even at reduced frequency/speed</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Starting Method Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Starting Current (× FLC)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Starting Torque (% DOL)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Motor Size</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2">DOL</td><td className="border border-white/10 px-3 py-2">6-8×</td><td className="border border-white/10 px-3 py-2">100%</td><td className="border border-white/10 px-3 py-2">Up to 7.5 kW</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Star-delta</td><td className="border border-white/10 px-3 py-2">2-2.7×</td><td className="border border-white/10 px-3 py-2">33%</td><td className="border border-white/10 px-3 py-2">7.5-75 kW</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Auto-transformer (65%)</td><td className="border border-white/10 px-3 py-2">2.5-3.5×</td><td className="border border-white/10 px-3 py-2">42%</td><td className="border border-white/10 px-3 py-2">15-200 kW</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Soft starter</td><td className="border border-white/10 px-3 py-2">2-4×</td><td className="border border-white/10 px-3 py-2">Variable (adjustable)</td><td className="border border-white/10 px-3 py-2">5-500+ kW</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">VSD</td><td className="border border-white/10 px-3 py-2">1-1.5×</td><td className="border border-white/10 px-3 py-2">100% (full torque available)</td><td className="border border-white/10 px-3 py-2">0.37-1000+ kW</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Rotor resistance</td><td className="border border-white/10 px-3 py-2">2-3×</td><td className="border border-white/10 px-3 py-2">Up to 200%</td><td className="border border-white/10 px-3 py-2">Wound-rotor motors</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The choice of starting method is always a compromise between starting
              current (what the supply can tolerate), starting torque (what the load requires), cost, complexity,
              and the need for speed control during running. There is no single best method — each has its place.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            DOL and Star-Delta Starting
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Direct-on-line (DOL) and star-delta are the two most common electromechanical starting methods
              found in industrial and commercial installations. DOL is the simplest and most cost-effective;
              star-delta is the traditional method for reducing starting current on larger motors. Both use
              contactors and are well-understood by maintenance technicians.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Direct-On-Line (DOL) Starting</h3>
                <p className="text-sm text-white mb-2">
                  DOL is the simplest starting method. The motor is connected directly to the full supply
                  voltage by closing a single contactor. The starting current is high (6-8× FLC) but the
                  starting torque is also high (100% of the motor's locked-rotor torque), making it suitable
                  for loads that require high breakaway torque.
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Components:</strong> Main contactor (K1), thermal/electronic overload relay (F1), control circuit with start/stop buttons and holding contact</li>
                  <li className="pl-1"><strong>Advantages:</strong> Simple, cheap, reliable, high starting torque, easy to maintain</li>
                  <li className="pl-1"><strong>Disadvantages:</strong> Very high starting current, voltage dip on supply, mechanical shock to driven equipment</li>
                  <li className="pl-1"><strong>Maintenance:</strong> Check contactor contacts for pitting/erosion, verify overload relay setting matches motor FLC, test control circuit operation, check tightness of all terminations</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Star-Delta Starting</h3>
                <p className="text-sm text-white mb-2">
                  Star-delta starting uses three contactors and a timer. During starting, the windings are
                  connected in star (each winding receives line voltage / √3). After a timed period (typically
                  5-15 seconds), the star contactor opens and the delta contactor closes, connecting the
                  windings in delta for normal full-voltage running.
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Components:</strong> Main contactor (K1), star contactor (K2), delta contactor (K3), changeover timer, overload relay</li>
                  <li className="pl-1"><strong>Interlocking:</strong> K2 (star) and K3 (delta) must be electrically and mechanically interlocked to prevent both closing simultaneously (dead short circuit across windings)</li>
                  <li className="pl-1"><strong>Timer setting:</strong> Must allow the motor to accelerate close to full speed in star before changeover. Too short = motor stalls at changeover; too long = motor runs in star longer than necessary (reduced torque, higher winding current)</li>
                  <li className="pl-1"><strong>Closed transition:</strong> Advanced star-delta starters insert resistors during changeover to maintain a current path, reducing the current transient at the star-to-delta switch point</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Common Star-Delta Fault: Contactor Interlock Failure</p>
              <p className="text-sm text-white">
                If the electrical interlock between the star and delta contactors fails and both close
                simultaneously, the motor windings are short-circuited. This draws an extremely high fault
                current and will blow the fuses or trip the circuit breaker immediately. During maintenance,
                always verify both the electrical interlock (auxiliary NC contacts wired in series with the
                opposing contactor coil) and the mechanical interlock (physical bar preventing both contactors
                from pulling in). Replace interlocked contactor pairs as a set to ensure the mechanical
                interlock is correctly aligned.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance tip:</strong> When a star-delta starter is reported as tripping during starting,
              check the changeover timer setting first. If the motor has not reached sufficient speed in star
              before the timer switches to delta, the high transient current at changeover can trip the overload
              or supply fuse. Increasing the star time by 2-3 seconds may resolve the issue — but investigate
              why the motor is accelerating slowly (bearing failure, increased load, low voltage).
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Soft Starters and Electronic Starting
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Soft starters represent the transition from electromechanical to electronic motor starting.
              They use power semiconductors (thyristors) to control the voltage applied to the motor,
              providing a smooth, stepless ramp from zero to full voltage. This eliminates the mechanical
              contactors used in star-delta starting and removes the problematic changeover transient.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">How a Soft Starter Works</h3>
              <p className="text-sm text-white mb-3">
                A soft starter has two back-to-back thyristors (or a triac) in each phase, forming a
                three-phase AC voltage controller. By varying the firing angle of the thyristors, the
                effective voltage applied to the motor is controlled.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Initial voltage:</strong> Set between 30-70% of line voltage depending on the load torque requirement</li>
                <li className="pl-1"><strong>Ramp time:</strong> Programmable from 1 to 60+ seconds — the time for the voltage to increase from initial to full</li>
                <li className="pl-1"><strong>Current limit:</strong> Many soft starters can limit the starting current to a set maximum (e.g., 350% FLC)</li>
                <li className="pl-1"><strong>Soft stop:</strong> The voltage can also be ramped down for a controlled deceleration — useful for pumps (prevents water hammer)</li>
                <li className="pl-1"><strong>Bypass contactor:</strong> Once the motor is at full speed, a bypass contactor closes to conduct the running current, and the thyristors are turned off. This reduces losses and heat generation during running</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Soft Starter vs Star-Delta — Key Differences</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Feature</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Star-Delta</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Soft Starter</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2">Starting current profile</td><td className="border border-white/10 px-3 py-2">Step change at changeover</td><td className="border border-white/10 px-3 py-2">Smooth ramp, no transient</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Motor requirement</td><td className="border border-white/10 px-3 py-2">6-terminal motor required</td><td className="border border-white/10 px-3 py-2">Any 3-phase motor</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Cables to motor</td><td className="border border-white/10 px-3 py-2">6 cores required</td><td className="border border-white/10 px-3 py-2">3 cores sufficient</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Starting torque control</td><td className="border border-white/10 px-3 py-2">Fixed at 1/3 DOL in star</td><td className="border border-white/10 px-3 py-2">Adjustable via initial voltage</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Soft stop capability</td><td className="border border-white/10 px-3 py-2">No</td><td className="border border-white/10 px-3 py-2">Yes — voltage ramp-down</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Speed control during run</td><td className="border border-white/10 px-3 py-2">No</td><td className="border border-white/10 px-3 py-2">No</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Maintenance</td><td className="border border-white/10 px-3 py-2">Contactors, timer, interlocks</td><td className="border border-white/10 px-3 py-2">Bypass contactor, cooling fans, electronics</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Soft Starter Maintenance</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Cooling:</strong> Clean heat sinks quarterly; replace cooling fans every 3-5 years or when noisy/vibrating</li>
                <li className="pl-1"><strong>Bypass contactor:</strong> Inspect contacts annually; replace on signs of pitting or erosion. The bypass contactor carries the full running current continuously</li>
                <li className="pl-1"><strong>Thyristors:</strong> Check for signs of overheating (discolouration of heat sink compound). Thyristor failure usually presents as a short circuit or open circuit on one phase</li>
                <li className="pl-1"><strong>Settings verification:</strong> Check initial voltage, ramp time and current limit settings match the application requirements — settings may need adjustment if the load changes</li>
                <li className="pl-1"><strong>Fault log:</strong> Review the soft starter's fault log for recurring trips or warnings — patterns may indicate developing faults</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> A soft starter does not provide speed control during running. Once the
              motor reaches full speed, it runs at mains frequency. If variable speed operation is required, a
              variable speed drive (VSD) must be used instead.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Variable Speed Drives for Motor Starting and Control
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Variable speed drives (VSDs), also called variable frequency drives (VFDs) or inverter drives,
              represent the most technically advanced method of motor starting and control. A VSD converts the
              fixed-frequency, fixed-voltage mains supply into a variable-frequency, variable-voltage output,
              allowing precise control of motor speed, torque and acceleration from zero to above rated speed.
            </p>
            <p>
              For motor starting, the VSD provides the ideal characteristics: the motor can develop full rated
              torque from standstill, the starting current is limited to typically 100-150% of FLC (compared
              with 600-800% for DOL), and the acceleration rate is fully programmable. After starting, the VSD
              continues to provide speed control during running, energy savings on variable-torque loads, and
              controlled deceleration.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">VSD Starting Principle</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>V/f ratio:</strong> The VSD maintains a constant ratio of voltage to frequency. At 50% speed (25 Hz), it applies 50% voltage (200 V for a 400 V motor). This maintains constant motor flux and therefore constant torque capability</li>
                <li className="pl-1"><strong>Ramp time:</strong> The acceleration ramp is programmable — typically 5-30 seconds for a smooth start. The VSD's current-limiting function prevents the motor from drawing more than the set current limit during acceleration</li>
                <li className="pl-1"><strong>S-curve ramp:</strong> Advanced VSDs offer S-curve acceleration profiles that reduce the initial and final jerk, providing even smoother mechanical starting</li>
                <li className="pl-1"><strong>Flying start:</strong> If a motor is still spinning when the VSD is restarted (e.g., after a brief supply interruption), the VSD can detect the motor speed and synchronise its output frequency to match before ramping up — preventing a dangerous out-of-phase reconnection</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">VSD Installation Considerations (BS 7671)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Cable type:</strong> Shielded (SY/CY or SWA) cable is recommended between the VSD and motor to contain electromagnetic emissions and prevent interference with adjacent circuits</li>
                <li className="pl-1"><strong>Cable length:</strong> Long cable runs between the VSD and motor increase the dV/dt stress on the motor insulation and may require output chokes or dV/dt filters</li>
                <li className="pl-1"><strong>Earthing:</strong> The cable screen/armour must be earthed at both ends with 360° terminations for effective EMC screening</li>
                <li className="pl-1"><strong>Motor insulation:</strong> Older motors (pre-2000) may not have insulation rated for the voltage spikes from a VSD output. Verify the motor insulation is rated for VSD duty, or fit an output filter</li>
                <li className="pl-1"><strong>RCD compatibility:</strong> VSDs produce DC and high-frequency leakage currents that can trip standard Type A RCDs. Type B RCDs are required on circuits supplying VSDs</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">VSD Advantages for Starting</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Lowest starting current of any method</li>
                  <li className="pl-1">Full torque available from zero speed</li>
                  <li className="pl-1">Fully programmable acceleration profile</li>
                  <li className="pl-1">No mechanical contactors to wear out</li>
                  <li className="pl-1">Continuous speed control during running</li>
                  <li className="pl-1">Energy savings on fans/pumps (up to 50-70%)</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">VSD Maintenance Requirements</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Clean cooling fans and heat sinks regularly</li>
                  <li className="pl-1">DC bus capacitors degrade over time (replace every 5-7 years)</li>
                  <li className="pl-1">Check for harmonic distortion on the supply side</li>
                  <li className="pl-1">Verify parameter settings after firmware updates</li>
                  <li className="pl-1">Monitor fault logs for recurring alarms</li>
                  <li className="pl-1">Allow full discharge time before internal work</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> A VSD is not just a starting device — it is a comprehensive motor
              control system. The initial cost is higher than a simple contactor starter, but the benefits in
              terms of energy savings, reduced mechanical stress, lower maintenance costs and precise process
              control often provide a payback period of 1-3 years on applications such as fans, pumps and
              compressors.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Motor Circuit Protection and BS 7671 Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671 Section 552 sets out the requirements for motor circuits. The fundamental challenge is
              that motor protective devices must allow the high starting current to flow for the duration of
              the start (several seconds) without tripping, while still providing protection against sustained
              overloads during running and rapid disconnection in the event of a short circuit.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Motor Circuit Protection Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Overload protection:</strong> Protects the motor from sustained overcurrent (e.g., mechanical overload, seized bearing, loss of phase). The overload device (thermal or electronic relay) is set to the motor's full-load current. It has a time-delay characteristic that allows the starting current to flow for the expected starting time without tripping</li>
                <li className="pl-1"><strong>Short-circuit protection:</strong> Protects against high-level fault currents (e.g., insulation failure, terminal fault). Typically provided by fuses (gG or aM type) or an MCCB upstream of the contactor. Must operate fast enough to protect the contactor and overload relay from damage</li>
                <li className="pl-1"><strong>Coordination:</strong> The overload device and short-circuit device must be coordinated to ensure correct operation under all fault conditions. Type 1 coordination allows the contactor and overload to be damaged but safe; Type 2 coordination requires no damage to any component</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Motor-Rated Fuses</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Fuse Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Characteristic</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2">gG</td><td className="border border-white/10 px-3 py-2">General purpose — full-range breaking</td><td className="border border-white/10 px-3 py-2">Cable and general circuit protection; can be used for motors if rated to withstand starting current</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">aM</td><td className="border border-white/10 px-3 py-2">Motor-rated — back-up protection only</td><td className="border border-white/10 px-3 py-2">Specifically designed for motor circuits. Higher starting current withstand. Must be used with a separate overload device</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Overload Relay Types</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Thermal (bimetallic):</strong> The traditional type. Bimetallic strips heat up with motor current and trip when they bend beyond a set point. Ambient temperature compensated versions are available. Simple and reliable but less accurate than electronic types</li>
                <li className="pl-1"><strong>Electronic (solid-state):</strong> Uses current transformers to measure the motor current and a microprocessor to calculate the thermal model of the motor. More accurate, adjustable trip class (10, 20, 30), phase loss detection, ground fault detection and communication capabilities</li>
                <li className="pl-1"><strong>Thermistor (PTC):</strong> PTC thermistors embedded in the motor windings measure the actual winding temperature. Provides direct motor protection regardless of the cause of overheating (overload, blocked ventilation, high ambient, frequent starting)</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Single Phasing — A Common and Dangerous Fault</p>
              <p className="text-sm text-white">
                If one phase of a three-phase motor supply is lost (single phasing), the motor continues to
                run but draws approximately 1.73 times normal current in the remaining two phases. The motor
                overheats rapidly and can fail within minutes. Modern electronic overload relays detect single
                phasing and trip immediately. Older thermal overload relays may not detect single phasing
                quickly enough, especially on lightly loaded motors. If you encounter repeated motor winding
                failures, check for evidence of single phasing — burnt windings on two phases with the third
                relatively undamaged is a classic indicator.
              </p>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>ST1426 requirement:</strong> The Maintenance and Operations Engineering Technician standard
              requires you to understand motor starting equipment, set overload relays to the correct motor
              rating, verify contactor operation, interpret starter fault codes, and replace components as part
              of planned and reactive maintenance. You must also understand the protection coordination
              requirements of BS 7671 Section 552.
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

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Starting Method Summary</p>
                <ul className="space-y-0.5">
                  <li>DOL — 6-8× FLC, 100% torque, simplest</li>
                  <li>Star-delta — 1/3 current and torque, changeover transient</li>
                  <li>Auto-transformer — adjustable voltage taps</li>
                  <li>Soft starter — thyristor voltage ramp, smooth start</li>
                  <li>VSD — V/f control, 100-150% FLC, full torque</li>
                  <li>Rotor resistance — wound-rotor motors only</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key References</p>
                <ul className="space-y-0.5">
                  <li>BS 7671 Section 552 — Motor circuits</li>
                  <li>BS EN 60947-4-1 — Contactor starters</li>
                  <li>BS EN 60947-4-2 — Soft starters</li>
                  <li>BS EN 61800-5-1 — VSD safety</li>
                  <li>IET Guidance Note 1 — Selection and erection</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section3-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: DC Motors
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section3">
              Back to Section Overview
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule2Section3_5;
