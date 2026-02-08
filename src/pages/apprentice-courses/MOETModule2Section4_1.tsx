import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Fuses and Circuit Breakers - MOET Module 2 Section 4.1";
const DESCRIPTION = "Comprehensive guide to overcurrent protection devices for electrical maintenance technicians: fuse types, MCB characteristics, selection criteria, BS 88, BS 3036, BS EN 60898 and BS 7671 compliance.";

const quickCheckQuestions = [
  {
    id: "fuse-purpose",
    question: "What is the primary function of a fuse in an electrical circuit?",
    options: [
      "To regulate voltage levels across the load",
      "To disconnect the circuit automatically when current exceeds a safe level",
      "To provide a convenient switching point for maintenance",
      "To improve the power factor of the installation"
    ],
    correctIndex: 1,
    explanation: "A fuse is a sacrificial overcurrent protective device. Its primary function is to disconnect the circuit by melting its fuse element when the current flowing through it exceeds a predetermined safe level for a specified time, thereby protecting conductors and equipment from damage due to overload or short-circuit conditions."
  },
  {
    id: "mcb-type-b",
    question: "A Type B MCB is designed to trip instantaneously (magnetically) at what multiple of its rated current?",
    options: [
      "2 to 3 times rated current",
      "3 to 5 times rated current",
      "5 to 10 times rated current",
      "10 to 20 times rated current"
    ],
    correctIndex: 1,
    explanation: "A Type B MCB provides magnetic (instantaneous) tripping between 3 and 5 times its rated current (In). This makes it suitable for resistive loads such as lighting and socket circuits where high inrush currents are not expected. Type C (5-10 x In) and Type D (10-20 x In) are used where higher inrush currents occur."
  },
  {
    id: "bs88-application",
    question: "BS 88 HRC fuses are most commonly used in which application?",
    options: [
      "Domestic consumer units for socket circuits",
      "Industrial distribution boards, motor circuits and commercial switchgear",
      "Plug-top fuses for portable appliances",
      "Telecommunications equipment protection"
    ],
    correctIndex: 1,
    explanation: "BS 88 High Rupturing Capacity (HRC) fuses are the standard industrial fuse type in the UK. They are used in distribution boards, motor control centres, and commercial switchgear where high prospective fault currents require a device with a substantial breaking capacity — typically up to 80 kA at 415 V."
  },
  {
    id: "discrimination-fuses",
    question: "What is meant by 'discrimination' between protective devices?",
    options: [
      "Choosing devices from the same manufacturer",
      "Ensuring only the device nearest the fault operates, leaving upstream supplies intact",
      "Using different colours to identify different circuits",
      "Installing devices in order of physical size"
    ],
    correctIndex: 1,
    explanation: "Discrimination (also called selectivity) means that in the event of a fault, only the protective device closest to the fault operates, disconnecting the faulty circuit whilst leaving all upstream devices and healthy circuits unaffected. This is achieved by coordinating the time/current characteristics of devices in series."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A semi-enclosed (rewirable) fuse to BS 3036 has a fusing factor of approximately:",
    options: [
      "1.0 — it blows at exactly its rated current",
      "1.45 — it requires 1.45 times rated current to blow",
      "1.8 to 2.0 — it requires nearly double its rated current to blow reliably",
      "3.0 — it requires three times rated current to blow"
    ],
    correctAnswer: 2,
    explanation: "BS 3036 semi-enclosed (rewirable) fuses have a fusing factor of approximately 1.8 to 2.0. This means the fuse element must carry nearly twice its rated current before it melts. This poor fusing factor requires a derating factor (typically 0.725) to be applied when selecting cable sizes, as specified in BS 7671 Appendix 4."
  },
  {
    id: 2,
    question: "Which standard covers miniature circuit breakers (MCBs) for household and similar installations?",
    options: [
      "BS 88",
      "BS 3036",
      "BS EN 60898",
      "BS EN 61009"
    ],
    correctAnswer: 2,
    explanation: "BS EN 60898 covers miniature circuit breakers (MCBs) for overcurrent protection in household and similar installations. BS 88 covers industrial HRC fuses, BS 3036 covers semi-enclosed fuses, and BS EN 61009 covers residual current operated circuit breakers with integral overcurrent protection (RCBOs)."
  },
  {
    id: 3,
    question: "The breaking capacity of a protective device refers to:",
    options: [
      "The maximum continuous current it can carry",
      "The maximum prospective fault current it can safely interrupt",
      "The minimum current at which it will operate",
      "The number of times it can be reset"
    ],
    correctAnswer: 1,
    explanation: "Breaking capacity (also called rupturing capacity) is the maximum prospective fault current that the device can safely interrupt without damage to itself or danger to its surroundings. BS 7671 Regulation 434.5.1 requires that the breaking capacity of every protective device must be not less than the prospective fault current at its point of installation."
  },
  {
    id: 4,
    question: "A Type C MCB would be most appropriate for protecting:",
    options: [
      "A domestic lighting circuit",
      "A circuit supplying a fluorescent lighting installation with electronic ballasts",
      "A motor circuit with significant inrush current on starting",
      "A resistive heating circuit"
    ],
    correctAnswer: 2,
    explanation: "Type C MCBs trip magnetically between 5 and 10 times their rated current, making them suitable for circuits with moderate inrush currents such as small motors, fluorescent lighting with magnetic ballasts, and some commercial equipment. Motor circuits with very high inrush may require Type D (10-20 x In)."
  },
  {
    id: 5,
    question: "In BS 7671, Regulation 433.1 requires that every circuit shall be protected against:",
    options: [
      "Undervoltage only",
      "Overload current by a device that disconnects before conductors reach their limiting temperature",
      "Lightning strikes and transient overvoltages",
      "Harmonic distortion above 5%"
    ],
    correctAnswer: 1,
    explanation: "Regulation 433.1 requires that every circuit is protected against overload current by a device that will disconnect the supply before the conductor insulation reaches a temperature that would cause damage. The device must have characteristics such that it operates before the conductor is subjected to sustained overcurrent."
  },
  {
    id: 6,
    question: "An HRC fuse achieves arc extinction by:",
    options: [
      "Using a spring-loaded mechanical trip mechanism",
      "Filling the fuse body with quartz sand which absorbs the arc energy",
      "Applying a magnetic field to deflect the arc",
      "Using an electronic sensor to detect the fault"
    ],
    correctAnswer: 1,
    explanation: "HRC (High Rupturing Capacity) fuses contain a silver or copper fuse element surrounded by granular quartz sand within a ceramic body. When the element melts due to fault current, the arc energy is absorbed by the sand, which vitrifies (turns to glass) around the arc path. This rapidly quenches the arc and limits the let-through energy (I squared t)."
  },
  {
    id: 7,
    question: "The I squared t (I²t) characteristic of a fuse is important because it indicates:",
    options: [
      "The voltage rating of the fuse",
      "The total energy let-through during fault clearance",
      "The physical dimensions of the fuse carrier",
      "The ambient temperature rating"
    ],
    correctAnswer: 1,
    explanation: "I²t (current squared multiplied by time) represents the total energy let-through of the fuse during fault clearance. It is critical for ensuring that downstream cables and equipment can withstand the energy released during a fault. BS 7671 Regulation 434.5.2 requires that the I²t of the protective device does not exceed the I²t withstand of the cable (k²S²)."
  },
  {
    id: 8,
    question: "Which of the following is NOT an advantage of MCBs over fuses?",
    options: [
      "MCBs can be reset after tripping without replacement",
      "MCBs have more precise and consistent tripping characteristics",
      "MCBs always have a higher breaking capacity than HRC fuses",
      "MCBs provide visible trip indication"
    ],
    correctAnswer: 2,
    explanation: "MCBs do not always have a higher breaking capacity than HRC fuses. In fact, standard domestic MCBs typically have a breaking capacity of 6 kA or 10 kA, whereas BS 88 HRC fuses can have breaking capacities up to 80 kA. In high fault-level installations, HRC fuses or MCBs with enhanced breaking capacity must be selected."
  },
  {
    id: 9,
    question: "When selecting a protective device for a circuit, the rated current (In) of the device must satisfy:",
    options: [
      "In must equal the cable's current-carrying capacity exactly",
      "Ib <= In <= Iz, where Ib is design current and Iz is cable current-carrying capacity",
      "In must be at least three times the design current",
      "In must match the supply voltage"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 Regulation 433.1.1 requires that the nominal current (In) of the protective device must be not less than the design current (Ib) of the circuit and not greater than the current-carrying capacity (Iz) of the cable. This ensures the device allows normal current flow whilst protecting the cable from overload."
  },
  {
    id: 10,
    question: "A cartridge fuse to BS 1362 is designed for use in:",
    options: [
      "Industrial distribution boards",
      "Motor starter circuits",
      "BS 1363 13 A plug tops",
      "Street lighting columns"
    ],
    correctAnswer: 2,
    explanation: "BS 1362 cartridge fuses are specifically designed for use in BS 1363 13 A plug tops. They are available in 3 A (red) and 13 A (brown) as standard ratings, though other ratings exist. They provide overcurrent protection for the flexible cord between the plug and the appliance."
  },
  {
    id: 11,
    question: "The thermal element of an MCB provides protection against:",
    options: [
      "Short-circuit faults only",
      "Earth faults only",
      "Overload currents (sustained moderate overcurrents)",
      "Voltage surges"
    ],
    correctAnswer: 2,
    explanation: "An MCB contains two trip mechanisms: a thermal (bimetallic strip) element for overload protection and a magnetic (solenoid) element for short-circuit protection. The thermal element responds to sustained moderate overcurrents by heating and bending a bimetallic strip, which releases the trip mechanism after a time delay inversely proportional to the magnitude of the overcurrent."
  },
  {
    id: 12,
    question: "Under BS 7671, if a BS 3036 semi-enclosed fuse is used, the cable current-carrying capacity (Iz) must be at least:",
    options: [
      "Equal to In",
      "1.25 times In",
      "In divided by 0.725 (approximately 1.38 times In)",
      "Twice In"
    ],
    correctAnswer: 2,
    explanation: "Because BS 3036 fuses have a high fusing factor, BS 7671 requires a correction factor of 0.725 to be applied. This means the cable must be sized so that its current-carrying capacity is at least In / 0.725 (approximately 1.38 x In). This compensates for the fuse's inability to operate precisely at its rated current and prevents cable overheating."
  }
];

const faqs = [
  {
    question: "Can I replace a BS 3036 rewirable fuse with an MCB?",
    answer: "Not directly. Replacing a rewirable fuse with an MCB requires consideration of the prospective fault current at the point of installation, the breaking capacity of the proposed MCB, and compatibility with the existing switchgear. The consumer unit itself may need replacing, as BS 3036 fuseboards are not designed to accept MCBs. Any modification must comply with BS 7671 and Part P of the Building Regulations where applicable."
  },
  {
    question: "What is the difference between breaking capacity and rated current?",
    answer: "Rated current (In) is the maximum continuous current the device is designed to carry without tripping. Breaking capacity is the maximum prospective fault current the device can safely interrupt during a short-circuit. For example, a 32 A MCB with a breaking capacity of 6 kA can carry 32 A continuously but can safely interrupt a fault current of up to 6,000 A."
  },
  {
    question: "Why do some installations still use fuses instead of MCBs?",
    answer: "Fuses — particularly BS 88 HRC types — offer several advantages in certain applications: extremely high breaking capacity (up to 80 kA), excellent current-limiting properties, very low I²t let-through energy, no maintenance requirements, and inherent back-up protection capability. In industrial installations with high prospective fault currents, HRC fuses remain the preferred choice for main and sub-main protection."
  },
  {
    question: "How do I check if a protective device is suitable for the prospective fault current?",
    answer: "You must measure or calculate the prospective fault current (Ipf) at the point of installation using a loop impedance tester or by calculation from supply impedance data. The breaking capacity marked on the device (in kA) must be equal to or greater than the measured Ipf. BS 7671 Regulation 434.5.1 makes this an absolute requirement — there is no exception."
  },
  {
    question: "What does 'back-up protection' mean in the context of fuses and MCBs?",
    answer: "Back-up protection occurs when an upstream device (typically an HRC fuse) assists a downstream device (typically an MCB) in clearing fault currents that exceed the downstream device's breaking capacity. The upstream fuse limits the fault current to a level the MCB can handle. This is permitted under BS 7671 Regulation 434.5.1 provided the devices are tested and certified as a coordinated combination by the manufacturer."
  }
];

const MOETModule2Section4_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section4">
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
            <span>Module 2.4.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Fuses and Circuit Breakers
          </h1>
          <p className="text-white/80">
            Overcurrent protection devices, selection and operation for electrical maintenance
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Fuses:</strong> Sacrificial devices — BS 88 HRC, BS 3036 rewirable, BS 1362 cartridge</li>
              <li className="pl-1"><strong>MCBs:</strong> Resettable devices — Type B (3-5x), Type C (5-10x), Type D (10-20x)</li>
              <li className="pl-1"><strong>Selection:</strong> Ib &le; In &le; Iz; breaking capacity &ge; Ipf</li>
              <li className="pl-1"><strong>Standards:</strong> BS 7671, BS EN 60898, BS 88, BS 3036</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Technician Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Fault finding:</strong> Identify why a device has operated before resetting</li>
              <li className="pl-1"><strong>Replacement:</strong> Always like-for-like unless re-designed</li>
              <li className="pl-1"><strong>Testing:</strong> Verify Ipf does not exceed device breaking capacity</li>
              <li className="pl-1"><strong>ST1426:</strong> Maps to electrical engineering principles KSBs</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the operating principles of fuses and miniature circuit breakers",
              "Identify the main fuse types used in UK electrical installations (BS 88, BS 3036, BS 1362)",
              "Describe MCB trip characteristics (Type B, C and D) and their applications",
              "Apply the selection criteria Ib <= In <= Iz for overcurrent protective devices",
              "Understand breaking capacity requirements and back-up protection",
              "Reference BS 7671, BS EN 60898 and BS 88 requirements for device selection"
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
            The Purpose of Overcurrent Protection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Every electrical circuit carries the risk of overcurrent — a condition where the current flowing
              through conductors exceeds the level for which they are designed. Overcurrent can arise from two
              distinct causes: overload, where too many loads draw current simultaneously through a circuit that
              is otherwise healthy; and short-circuit (or fault current), where an unintended low-impedance path
              allows a very large current to flow, often thousands of amperes.
            </p>
            <p>
              Without adequate protection, overcurrent causes conductor insulation to overheat, degrade and
              ultimately fail. This can lead to fire, equipment damage, and danger to persons. The role of
              overcurrent protective devices — fuses and circuit breakers — is to detect these conditions and
              disconnect the circuit before damage occurs.
            </p>
            <p>
              BS 7671 (the IET Wiring Regulations, 18th Edition) addresses overcurrent protection primarily in
              Chapter 43. Regulation 430.3 states the fundamental requirement: every circuit shall be provided
              with overcurrent protection that disconnects the supply before the current causes a temperature
              rise detrimental to the insulation, joints, terminations or surroundings of the conductors. The
              two aspects of protection — overload (Section 433) and short-circuit (Section 434) — may be
              provided by a single device or by separate devices.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Two Types of Overcurrent</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Overload current:</strong> An overcurrent occurring in a circuit that is electrically sound — caused by excessive demand. Typically 1.5 to 6 times the design current. Requires disconnection within minutes to hours depending on magnitude.</li>
                <li className="pl-1"><strong>Short-circuit current (fault current):</strong> An overcurrent resulting from a fault of negligible impedance between live conductors or between a live conductor and earth. Can reach tens of thousands of amperes. Requires disconnection in fractions of a second.</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Why This Matters for Maintenance Technicians</p>
              <p className="text-sm text-white">
                As a maintenance technician, you will frequently encounter protective devices that have operated.
                Understanding why a fuse has blown or an MCB has tripped is fundamental to fault diagnosis.
                A device operating on overload indicates a different problem from one operating on short-circuit.
                The condition of the device after operation — for example, a fuse element that has melted cleanly
                (overload) versus one that has exploded with sand discolouration (short-circuit) — provides
                valuable diagnostic information.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Fuse Types and Operating Principles
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A fuse is the simplest form of overcurrent protection. It consists of a carefully calibrated
              conductor (the fuse element) that is designed to melt when the current exceeds a predetermined
              value. Once the element melts, it creates a gap in the circuit, and the resulting arc must be
              safely extinguished to fully interrupt the current. The method of arc extinction varies between
              fuse types and directly affects the device's breaking capacity and current-limiting ability.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">BS 88 HRC (High Rupturing Capacity) Fuses</h3>
                <p className="text-sm text-white mb-2">
                  BS 88 fuses are the workhorse of industrial and commercial electrical protection in the UK.
                  They consist of a silver or copper fuse element enclosed within a robust ceramic body filled
                  with granular quartz sand. When the element melts, the arc energy is absorbed by the sand,
                  which vitrifies (turns to glass) in the arc path. This provides extremely effective arc
                  quenching and current-limiting properties.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Breaking capacity: up to 80 kA at 415 V AC</li>
                  <li className="pl-1">Excellent current-limiting (low I²t let-through)</li>
                  <li className="pl-1">Available in ratings from 2 A to 1250 A</li>
                  <li className="pl-1">Bolt-in (tag) or clip-in carrier types</li>
                  <li className="pl-1">Category of duty: gG (general purpose) or aM (motor circuit back-up)</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">BS 3036 Semi-Enclosed (Rewirable) Fuses</h3>
                <p className="text-sm text-white mb-2">
                  BS 3036 fuses use a thin tinned copper wire as the fuse element, held between two terminal
                  screws in an open or semi-enclosed ceramic holder. When the wire melts, the arc is quenched
                  in the surrounding air — a far less effective method than the sand-filled HRC design. This
                  results in a lower breaking capacity and a poor fusing factor.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Fusing factor: approximately 1.8 to 2.0 (requires cable derating by factor 0.725)</li>
                  <li className="pl-1">Breaking capacity: typically 1 kA to 4 kA</li>
                  <li className="pl-1">Risk of incorrect fuse wire being fitted</li>
                  <li className="pl-1">Still found in older domestic and light commercial installations</li>
                  <li className="pl-1">Being progressively replaced by MCBs in new installations</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">BS 1362 Cartridge Fuses (Plug-Top Fuses)</h3>
                <p className="text-sm text-white mb-2">
                  BS 1362 fuses are small ceramic cartridge fuses designed specifically for BS 1363 13 A plug
                  tops. They contain a sand-filled ceramic body with a silver element and brass end caps. Their
                  primary purpose is to protect the flexible cord between the plug and the appliance.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Standard ratings: 3 A (red) and 13 A (brown)</li>
                  <li className="pl-1">Other ratings available: 1 A, 2 A, 5 A, 7 A, 10 A</li>
                  <li className="pl-1">Must be correctly selected for the appliance rating</li>
                  <li className="pl-1">Common maintenance task: checking and replacing blown plug fuses</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Comparison of Fuse Types</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Characteristic</th>
                      <th className="border border-white/10 px-3 py-2 text-left">BS 88 HRC</th>
                      <th className="border border-white/10 px-3 py-2 text-left">BS 3036 Rewirable</th>
                      <th className="border border-white/10 px-3 py-2 text-left">BS 1362 Cartridge</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Breaking capacity</td>
                      <td className="border border-white/10 px-3 py-2">Up to 80 kA</td>
                      <td className="border border-white/10 px-3 py-2">1-4 kA</td>
                      <td className="border border-white/10 px-3 py-2">6 kA</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fusing factor</td>
                      <td className="border border-white/10 px-3 py-2">~1.25</td>
                      <td className="border border-white/10 px-3 py-2">~1.8-2.0</td>
                      <td className="border border-white/10 px-3 py-2">~1.5</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Current limiting</td>
                      <td className="border border-white/10 px-3 py-2">Excellent</td>
                      <td className="border border-white/10 px-3 py-2">Poor</td>
                      <td className="border border-white/10 px-3 py-2">Moderate</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Typical application</td>
                      <td className="border border-white/10 px-3 py-2">Industrial/commercial</td>
                      <td className="border border-white/10 px-3 py-2">Older domestic</td>
                      <td className="border border-white/10 px-3 py-2">Plug tops</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> When replacing fuses during maintenance, always use the correct type
              and rating. Never substitute a higher-rated fuse to "stop it blowing" — this defeats the
              protection and puts the installation at risk. If a fuse operates repeatedly, investigate and
              rectify the cause.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Miniature Circuit Breakers (MCBs)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Miniature circuit breakers (MCBs) to BS EN 60898 have largely replaced fuses in modern domestic
              and commercial installations. Unlike fuses, MCBs are resettable — after operating on a fault,
              they can be switched back on once the fault is rectified, without replacing any component. This
              makes them more convenient for maintenance and reduces downtime.
            </p>
            <p>
              An MCB contains two independent trip mechanisms working in parallel. The thermal mechanism uses
              a bimetallic strip that bends when heated by overcurrent, releasing a latch after a time delay.
              This provides overload protection. The magnetic mechanism uses a solenoid that trips
              instantaneously when the current exceeds a high threshold. This provides short-circuit protection.
              The combination of both mechanisms in a single device makes the MCB effective across the full
              range of overcurrent conditions.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">MCB Trip Types (BS EN 60898)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Type B — 3 to 5 times In:</strong> For resistive and low-inrush loads. Standard for domestic lighting and socket circuits. Most common type in UK dwellings.</li>
                <li className="pl-1"><strong>Type C — 5 to 10 times In:</strong> For loads with moderate inrush currents. Suitable for small motors, commercial lighting with magnetic ballasts, and some IT equipment.</li>
                <li className="pl-1"><strong>Type D — 10 to 20 times In:</strong> For loads with very high inrush currents. Used for large motors, transformers, welding equipment and X-ray machines.</li>
              </ul>
            </div>

            <p>
              The choice of MCB type is critical. If a Type B MCB is used on a circuit with high inrush current
              (such as a direct-on-line motor starter), the magnetic element may trip on the inrush current
              during normal starting. Conversely, using a Type D MCB on a lighting circuit would mean the
              magnetic trip threshold is set so high that it may not provide adequate short-circuit protection
              for the cable under certain fault conditions.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">MCB Ratings and Markings</h3>
              <p className="text-sm text-white mb-2">
                Every MCB carries markings indicating its rated current, trip type, breaking capacity and
                applicable standard. Understanding these markings is essential for correct identification
                and replacement during maintenance.
              </p>
              <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Rated current (In):</strong> 6, 10, 16, 20, 25, 32, 40, 50, 63 A (standard preferred values)</li>
                <li className="pl-1"><strong>Trip type:</strong> B, C or D (marked before the current rating, e.g., "B32")</li>
                <li className="pl-1"><strong>Breaking capacity:</strong> Typically 6 kA (6000) or 10 kA (10000) for domestic MCBs</li>
                <li className="pl-1"><strong>Standard:</strong> BS EN 60898 for household; BS EN 60947-2 for industrial (MCCBs)</li>
                <li className="pl-1"><strong>Single-pole, double-pole or triple-pole:</strong> Indicated by the number of switching contacts</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Maintenance Tip: Nuisance Tripping</p>
              <p className="text-sm text-white">
                If an MCB trips repeatedly without an obvious fault, consider whether the trip type is correct
                for the load. LED driver inrush, IT equipment switch-on surge, and motor starting currents are
                common causes of nuisance tripping on Type B MCBs. Do not simply uprate the device — assess
                the load characteristics and select the appropriate trip type. If the MCB is correct for the
                load, investigate for a developing fault such as insulation breakdown or a loose connection
                causing intermittent arcing.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Selection Criteria and BS 7671 Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Selecting the correct overcurrent protective device requires satisfying several conditions
              simultaneously. BS 7671 Chapter 43 sets out the requirements, and a maintenance technician
              must understand these to verify that existing protection is adequate and to specify
              replacements correctly.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Fundamental Selection Conditions</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Condition 1 (Reg 433.1.1):</strong> Ib &le; In &le; Iz — the device rated current must be between the design current and the cable current-carrying capacity</li>
                <li className="pl-1"><strong>Condition 2 (Reg 433.1.1):</strong> I2 &le; 1.45 &times; Iz — the current causing effective operation of the device must not exceed 1.45 times the cable current-carrying capacity</li>
                <li className="pl-1"><strong>Condition 3 (Reg 434.5.1):</strong> Breaking capacity &ge; Ipf — the device must be able to safely interrupt the maximum prospective fault current at its point of installation</li>
                <li className="pl-1"><strong>Condition 4 (Reg 434.5.2):</strong> I²t &le; k²S² — the energy let-through of the device must not exceed the energy withstand of the cable during a short-circuit</li>
              </ul>
            </div>

            <p>
              For MCBs to BS EN 60898, Condition 2 is automatically satisfied because the conventional
              tripping current (I2) is defined as 1.45 times In by the standard. However, for BS 3036
              semi-enclosed fuses, the poor fusing factor means an additional correction factor of 0.725
              must be applied to the cable sizing, effectively requiring a larger cable to compensate for
              the fuse's imprecision.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Worked Example: Device Selection</p>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm text-white mb-2">
                  <strong>Scenario:</strong> A 230 V single-phase circuit supplies a 6 kW electric shower.
                  The cable is 6 mm² twin and earth (PVC, clipped direct), with a current-carrying capacity
                  (Iz) of 47 A after applying correction factors.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Design current (Ib) = P / V = 6000 / 230 = 26.1 A</li>
                  <li className="pl-1">Select In: Ib &le; In &le; Iz → 26.1 &le; In &le; 47 → choose 32 A Type B MCB</li>
                  <li className="pl-1">Check I2: 1.45 &times; In = 1.45 &times; 32 = 46.4 A &le; 1.45 &times; 47 = 68.15 A ✓</li>
                  <li className="pl-1">Check breaking capacity: measured Ipf = 2.8 kA; MCB breaking capacity = 6 kA ✓</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Back-Up Protection (Reg 434.5.1)</h3>
              <p className="text-sm text-white">
                Where the prospective fault current exceeds the breaking capacity of an individual device,
                back-up protection may be used. A higher-rated upstream device (typically an HRC fuse) limits
                the fault current to a level the downstream device can handle. The combination must be tested
                and verified by the manufacturer — you cannot simply assume any fuse will provide adequate
                back-up for any MCB. The manufacturer's coordination tables must be consulted.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance relevance:</strong> When replacing a protective device, verify that the
              replacement satisfies all four conditions. If the installation has changed since original
              design (e.g., additional loads added), the existing protection may no longer be adequate.
              Always check rather than assuming like-for-like replacement is sufficient.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Time/Current Characteristics and Discrimination
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Every overcurrent protective device has a characteristic curve that shows the relationship
              between the magnitude of the current flowing through it and the time it takes to operate.
              These time/current characteristics are published by manufacturers and are essential for
              verifying that devices will operate within the disconnection times required by BS 7671 and
              for ensuring discrimination between devices in series.
            </p>
            <p>
              For fuses, the characteristic curve shows a continuous inverse relationship — as current
              increases, operating time decreases. For MCBs, the curve has two distinct regions: the thermal
              (overload) region, which follows an inverse time curve, and the magnetic (instantaneous) region,
              which is a near-vertical line at the magnetic trip threshold.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Disconnection Times (BS 7671 Regulation 411.3.2)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>TN systems, 230 V final circuits &le; 32 A:</strong> Maximum 0.4 seconds</li>
                <li className="pl-1"><strong>TN systems, 230 V distribution circuits:</strong> Maximum 5 seconds</li>
                <li className="pl-1"><strong>TT systems, 230 V final circuits &le; 32 A:</strong> Maximum 0.2 seconds</li>
                <li className="pl-1"><strong>TT systems, 230 V distribution circuits:</strong> Maximum 1 second</li>
              </ul>
            </div>

            <p>
              Discrimination (selectivity) is the coordination of protective devices in series such that
              only the device nearest to the fault operates. This minimises disruption — a fault on one
              circuit should not trip the main supply and disconnect all circuits. Achieving discrimination
              requires the downstream device to operate faster than the upstream device at all fault current
              levels up to the maximum prospective fault current at the downstream device.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Achieving Discrimination</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Time discrimination:</strong> Upstream device has a longer operating time than the downstream device at the same current level</li>
                <li className="pl-1"><strong>Current discrimination:</strong> Upstream device has a higher current setting so it does not respond to fault currents cleared by the downstream device</li>
                <li className="pl-1"><strong>Energy discrimination:</strong> The I²t let-through of the downstream device is less than the I²t required to trip the upstream device</li>
                <li className="pl-1"><strong>Zone discrimination:</strong> In complex installations, intelligent devices communicate to ensure only the device nearest the fault operates</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Fuse-to-Fuse Discrimination</h3>
                <p className="text-sm text-white">
                  Generally achieved with a ratio of 1.6:1 or greater between upstream and downstream fuse
                  ratings (for BS 88 HRC fuses of the same manufacturer). For example, a 100 A upstream fuse
                  will discriminate with a 63 A downstream fuse (ratio 1.59:1 — borderline) but will reliably
                  discriminate with a 50 A downstream fuse (ratio 2:1).
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">MCB-to-MCB Discrimination</h3>
                <p className="text-sm text-white">
                  More difficult to achieve because the magnetic trip regions overlap. A ratio of at least 2:1
                  between upstream and downstream MCB ratings is often needed, and full discrimination may not
                  be possible at high fault currents. Manufacturer data sheets must be consulted for specific
                  device combinations.
                </p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical point:</strong> In maintenance work, if you find that a main device is tripping
              instead of the device protecting the faulty circuit, this indicates a discrimination problem. The
              time/current characteristics of the devices in series need to be reviewed, and it may be necessary
              to change device types or ratings to restore correct coordination.
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
                <p className="font-medium text-white mb-1">Device Selection (BS 7671 Ch.43)</p>
                <ul className="space-y-0.5">
                  <li>Ib &le; In &le; Iz (design current &le; device rating &le; cable capacity)</li>
                  <li>I2 &le; 1.45 &times; Iz (tripping current &le; 1.45 &times; cable capacity)</li>
                  <li>Breaking capacity &ge; Ipf (prospective fault current)</li>
                  <li>I²t &le; k²S² (energy let-through &le; cable withstand)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Standards</p>
                <ul className="space-y-0.5">
                  <li>BS 88 — HRC industrial fuses</li>
                  <li>BS 3036 — Semi-enclosed (rewirable) fuses</li>
                  <li>BS 1362 — Plug-top cartridge fuses</li>
                  <li>BS EN 60898 — MCBs for household installations</li>
                  <li>BS 7671:2018+A2:2022 — IET Wiring Regulations</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section Overview
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section4-2">
              Next: RCDs and RCBOs
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule2Section4_1;
