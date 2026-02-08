import { ArrowLeft, AlertTriangle, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Overcurrent and Short-Circuit Protection - MOET Module 2 Section 4.3";
const DESCRIPTION = "Protection coordination and fault current calculations for electrical maintenance technicians: prospective fault current, adiabatic equation, discrimination, cascading, BS 7671 Chapter 43 compliance.";

const quickCheckQuestions = [
  {
    id: "pfc-definition",
    question: "What is prospective fault current (Ipf)?",
    options: [
      "The normal operating current of the circuit",
      "The maximum current that could flow at a given point under fault conditions",
      "The current drawn by the largest single load on the circuit",
      "The current that flows when the RCD test button is pressed"
    ],
    correctIndex: 1,
    explanation: "Prospective fault current (Ipf) is the maximum current that would flow at a given point in the installation if a fault of negligible impedance occurred at that point. It is determined by the supply voltage and the total impedance of the fault loop. BS 7671 Regulation 434.5.1 requires that the breaking capacity of every protective device must not be less than the Ipf at its point of installation."
  },
  {
    id: "adiabatic-equation",
    question: "The adiabatic equation t = k²S²/I² is used to verify that:",
    options: [
      "The cable voltage drop does not exceed the permitted limit",
      "The cable can withstand the thermal energy released during a fault without damage",
      "The circuit design current does not exceed the MCB rating",
      "The earth fault loop impedance is low enough for disconnection"
    ],
    correctIndex: 1,
    explanation: "The adiabatic equation relates the maximum fault clearance time (t) to the cable cross-sectional area (S), a factor representing the cable conductor and insulation material (k), and the fault current (I). It ensures that the energy let-through (I²t) of the protective device does not exceed the thermal withstand capability (k²S²) of the cable during a short-circuit or earth fault."
  },
  {
    id: "overload-vs-shortcircuit",
    question: "What is the key difference between an overload current and a short-circuit current?",
    options: [
      "There is no difference — they are the same thing",
      "An overload occurs in a sound circuit due to excess demand; a short-circuit results from a fault of negligible impedance",
      "An overload is always greater than a short-circuit current",
      "Short-circuit currents only occur on three-phase circuits"
    ],
    correctIndex: 1,
    explanation: "An overload current is an overcurrent occurring in a circuit that is electrically sound — the conductors and insulation are intact, but the total connected load exceeds the circuit's designed capacity. A short-circuit current results from a fault of negligible impedance between live conductors or between a live conductor and earth, allowing extremely high currents to flow. The magnitude and required response time differ greatly."
  },
  {
    id: "coordination-meaning",
    question: "In protection coordination, what does 'total discrimination' between two devices in series mean?",
    options: [
      "Both devices trip simultaneously",
      "The upstream device always trips first",
      "The downstream device always trips before the upstream device, for all fault currents up to its breaking capacity",
      "Neither device trips on fault"
    ],
    correctIndex: 2,
    explanation: "Total discrimination means that for every fault current up to the breaking capacity of the downstream device, the downstream device will always operate before the upstream device. Partial discrimination exists when the downstream device operates first only up to a certain fault level, beyond which both may operate. Manufacturers publish discrimination tables showing the maximum fault current for which discrimination is achieved between specific device pairs."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The prospective fault current at the origin of a typical UK domestic installation is usually in the range of:",
    options: [
      "100 A to 500 A",
      "1 kA to 16 kA",
      "20 kA to 50 kA",
      "50 kA to 100 kA"
    ],
    correctAnswer: 1,
    explanation: "The prospective fault current at the origin of a typical UK domestic installation supplied from the public network is usually between 1 kA and 16 kA. The DNO (Distribution Network Operator) maximum declared value is typically 16 kA for single-phase supplies. BS 7671 Regulation 434.5.1 requires that all protective devices have a breaking capacity not less than this value."
  },
  {
    id: 2,
    question: "BS 7671 Regulation 434.5.2 requires that the energy let-through of a protective device satisfies:",
    options: [
      "I²t ≤ k²S²",
      "I²t ≥ k²S²",
      "Ib ≤ In ≤ Iz",
      "Zs × Ia ≤ Uo"
    ],
    correctAnswer: 0,
    explanation: "Regulation 434.5.2 requires that the let-through energy (I²t) of the protective device during a short-circuit does not exceed the withstand energy (k²S²) of the cable. This ensures the cable insulation is not damaged by the thermal effects of the fault current during the time taken for the protective device to operate. The value of k depends on the conductor and insulation materials."
  },
  {
    id: 3,
    question: "In the adiabatic equation, the factor 'k' depends on:",
    options: [
      "The circuit voltage and frequency",
      "The conductor material and insulation type",
      "The ambient temperature only",
      "The length of the cable run"
    ],
    correctAnswer: 1,
    explanation: "The k factor is a constant that accounts for the thermal properties of the conductor material (copper or aluminium) and the insulation material (PVC, XLPE, etc.), along with the initial and final temperatures of the conductor. Values of k are tabulated in BS 7671 Table 43.1. For example, copper conductors with thermoplastic (PVC) insulation have k = 115."
  },
  {
    id: 4,
    question: "When the prospective fault current exceeds the breaking capacity of a downstream MCB, the installation can be made compliant by:",
    options: [
      "Accepting the risk and proceeding anyway",
      "Using back-up protection from an upstream HRC fuse with a verified coordination combination",
      "Adding a surge protection device",
      "Increasing the cable size"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 Regulation 434.5.1 permits the use of back-up protection where the downstream device's breaking capacity is exceeded. An upstream device (typically an HRC fuse) limits the prospective fault current to a level the downstream MCB can handle. The combination must be verified by the manufacturer — the devices must be tested together and the results published in coordination tables."
  },
  {
    id: 5,
    question: "The maximum disconnection time for a 32 A final circuit in a TN system at 230 V is:",
    options: [
      "0.1 seconds",
      "0.4 seconds",
      "1 second",
      "5 seconds"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 Table 41.1 specifies a maximum disconnection time of 0.4 seconds for TN systems on final circuits not exceeding 32 A at 230 V nominal (120-230 V Uo). For distribution circuits, the maximum disconnection time is 5 seconds. These times ensure that in the event of an earth fault, the supply is disconnected before the touch voltage duration becomes dangerous."
  },
  {
    id: 6,
    question: "Earth fault loop impedance (Zs) is important for overcurrent protection because:",
    options: [
      "It determines the circuit's power factor",
      "It determines the magnitude of the earth fault current and therefore whether the protective device will operate within the required time",
      "It affects the voltage drop along the cable",
      "It determines the cable's current-carrying capacity"
    ],
    correctAnswer: 1,
    explanation: "The earth fault loop impedance (Zs) determines the magnitude of the earth fault current: If = Uo / Zs. The protective device must be able to carry this fault current and disconnect within the maximum permitted time specified by BS 7671. If Zs is too high, the fault current will be too low to trip the device quickly enough, and the disconnection time requirement will not be met."
  },
  {
    id: 7,
    question: "For a circuit protected by a 32 A Type B MCB in a TN system, the maximum earth fault loop impedance (Zs) is approximately:",
    options: [
      "0.27 ohms",
      "1.09 ohms",
      "1.44 ohms",
      "7.19 ohms"
    ],
    correctAnswer: 2,
    explanation: "For a Type B MCB, instantaneous magnetic tripping occurs between 3 and 5 times In. Using the worst case (5 × In): the minimum fault current needed = 5 × 32 = 160 A. Maximum Zs = Uo / If = 230 / 160 = 1.4375 ohms (approximately 1.44 ohms). The tabulated value in BS 7671 may differ slightly as it accounts for the specific device characteristics. Always refer to the actual table values."
  },
  {
    id: 8,
    question: "Cascading (also called series connection or let-through energy coordination) allows:",
    options: [
      "Two protective devices to share the fault current equally",
      "A downstream device to have a lower breaking capacity than the prospective fault current, backed up by an upstream current-limiting device",
      "Two devices to operate simultaneously for faster disconnection",
      "A single device to protect multiple parallel circuits"
    ],
    correctAnswer: 1,
    explanation: "Cascading (or back-up protection) allows a downstream device (e.g., MCB) to have a breaking capacity lower than the prospective fault current at its location, provided an upstream current-limiting device (e.g., HRC fuse or MCCB) limits the energy let-through to within the downstream device's capability. The combination must be tested and certified by the manufacturer."
  },
  {
    id: 9,
    question: "If a cable has a cross-sectional area (S) of 2.5 mm² and k = 115, the maximum fault energy the cable can withstand (k²S²) is:",
    options: [
      "287.5 A²s",
      "82,656 A²s",
      "115,000 A²s",
      "828 A²s"
    ],
    correctAnswer: 1,
    explanation: "k²S² = 115² × 2.5² = 13,225 × 6.25 = 82,656.25 A²s. This is the maximum energy (I²t) that the cable can absorb during a short-circuit without the insulation temperature exceeding its damage threshold. The protective device's I²t let-through must not exceed this value. This calculation is fundamental to verifying short-circuit protection per BS 7671 Regulation 434.5.2."
  },
  {
    id: 10,
    question: "When checking protection coordination during periodic inspection, a maintenance technician should verify:",
    options: [
      "Only that the devices are from the same manufacturer",
      "That breaking capacity ≥ Ipf, Zs values meet tables, and discrimination is adequate for the installation",
      "Only that the cable size matches the MCB rating",
      "Only that the RCD test button works"
    ],
    correctAnswer: 1,
    explanation: "During periodic inspection, protection coordination should be verified by confirming: the prospective fault current has not increased beyond device breaking capacities, Zs values are within the maximum tabulated values for the devices installed, devices are correctly rated for the circuits they protect, and discrimination between devices in series is adequate to minimise disruption during fault conditions."
  },
  {
    id: 11,
    question: "The term 'let-through energy' of a protective device refers to:",
    options: [
      "The electrical energy consumed by the device during normal operation",
      "The I²t value — the total thermal energy the device allows to pass through to the circuit during fault clearance",
      "The power dissipated in the device contacts",
      "The energy required to reset the device after tripping"
    ],
    correctAnswer: 1,
    explanation: "Let-through energy (I²t) is the integral of the square of the fault current over the time taken for the device to clear the fault. It represents the total thermal energy that passes through the device and into the downstream circuit during fault clearance. Current-limiting devices (HRC fuses, current-limiting MCBs) are specifically designed to minimise I²t, reducing stress on cables and equipment."
  }
];

const faqs = [
  {
    question: "How do I measure prospective fault current on site?",
    answer: "Prospective fault current is measured using a loop impedance tester or a dedicated prospective fault current (PFC) tester connected at the point of interest. The instrument measures the earth fault loop impedance (Zs) or line-neutral loop impedance and calculates the PFC using Ohm's law (Ipf = Uo / Z). Measurements should be taken at the origin of the installation and at each distribution board. Always use a calibrated instrument and follow the manufacturer's instructions."
  },
  {
    question: "What happens if the measured Ipf exceeds the breaking capacity of the installed devices?",
    answer: "This is a serious deficiency. The installation does not comply with BS 7671 Regulation 434.5.1 and is potentially dangerous — the device may fail catastrophically under fault conditions, causing fire or explosion. The deficiency must be recorded as a C1 (danger present) on the EICR. Remedial action involves either upgrading the devices to ones with adequate breaking capacity or installing upstream current-limiting devices (back-up protection) with verified coordination."
  },
  {
    question: "What is the difference between partial and total discrimination?",
    answer: "Total discrimination means the downstream device will always trip before the upstream device for all fault currents up to the downstream device's breaking capacity. Partial discrimination means the downstream device trips first only up to a certain fault level (called the discrimination limit) — above that level, both devices may trip. Manufacturers publish discrimination tables showing whether total or partial discrimination exists for specific device combinations and at what current level partial discrimination fails."
  },
  {
    question: "Why is the adiabatic equation called 'adiabatic'?",
    answer: "The term 'adiabatic' means 'without heat transfer to the surroundings'. The equation assumes that during the very short duration of a fault (typically milliseconds to a few seconds), all the thermal energy generated by the fault current is retained within the conductor — none is dissipated through the insulation to the surrounding environment. This is a worst-case assumption that provides a safety margin. For longer fault durations (above approximately 5 seconds), the adiabatic assumption becomes invalid and a more complex thermal analysis is required."
  },
  {
    question: "Can I use the same device for both overload and short-circuit protection?",
    answer: "Yes, and this is the most common arrangement. MCBs and fuses inherently provide both overload protection (via the thermal element or fuse element's time/current characteristic) and short-circuit protection (via the magnetic element or rapid element rupture). BS 7671 Regulation 435.1 permits a single device to provide both functions provided it satisfies the requirements of both Section 433 (overload) and Section 434 (short-circuit)."
  }
];

const MOETModule2Section4_3 = () => {
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
            <AlertTriangle className="h-4 w-4" />
            <span>Module 2.4.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Overcurrent and Short-Circuit Protection
          </h1>
          <p className="text-white/80">
            Protection coordination, fault current calculations and the adiabatic equation
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Overload:</strong> Excess demand in a sound circuit — moderate overcurrent</li>
              <li className="pl-1"><strong>Short-circuit:</strong> Fault of negligible impedance — very high current</li>
              <li className="pl-1"><strong>Adiabatic:</strong> I²t &le; k²S² verifies cable can withstand fault energy</li>
              <li className="pl-1"><strong>Coordination:</strong> Discrimination ensures only nearest device trips</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Technician Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Measurement:</strong> Verify Ipf at each board during inspection</li>
              <li className="pl-1"><strong>Verification:</strong> Breaking capacity must exceed measured Ipf</li>
              <li className="pl-1"><strong>Fault diagnosis:</strong> Determine overload vs short-circuit from evidence</li>
              <li className="pl-1"><strong>ST1426:</strong> Maps to engineering principles and maintenance KSBs</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Distinguish between overload and short-circuit fault conditions and their protection requirements",
              "Calculate and measure prospective fault current at the origin and at distribution boards",
              "Apply the adiabatic equation (I²t ≤ k²S²) to verify short-circuit withstand of cables",
              "Understand protection coordination: discrimination, cascading and back-up protection",
              "Verify disconnection times using earth fault loop impedance and device characteristics",
              "Reference BS 7671 Chapter 43 requirements for overcurrent and short-circuit protection"
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
            Overload Current vs Short-Circuit Current
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671 recognises two fundamentally different types of overcurrent, each requiring different
              protective characteristics. Understanding the distinction is critical for both design and
              maintenance, as the evidence left by each type of fault differs and informs the diagnostic
              approach.
            </p>
            <p>
              An overload current is an overcurrent flowing in a circuit that is electrically intact. The
              conductors, insulation and connections are all healthy, but the total current demanded by the
              connected loads exceeds the rated capacity of the circuit. This might occur because too many
              appliances are connected to a ring final circuit, or because a motor is mechanically overloaded
              and draws excessive current. Overload currents are typically modest — perhaps 1.5 to 6 times
              the normal design current — and they develop relatively slowly.
            </p>
            <p>
              A short-circuit current (also called fault current) results from a breakdown in insulation that
              creates a low-impedance path between live conductors (line-to-neutral or line-to-line) or
              between a live conductor and earth. Because the impedance of the fault path is very low (ideally
              zero, though in practice a few milliohms), the resulting current can be enormous — potentially
              tens of thousands of amperes. The rise time is extremely fast, typically reaching peak value
              within the first half-cycle (10 ms at 50 Hz).
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Comparison of Overcurrent Types</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Characteristic</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Overload</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Short-Circuit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Circuit condition</td>
                      <td className="border border-white/10 px-3 py-2">Electrically sound</td>
                      <td className="border border-white/10 px-3 py-2">Insulation breakdown / fault</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Typical magnitude</td>
                      <td className="border border-white/10 px-3 py-2">1.5 to 6 &times; design current</td>
                      <td className="border border-white/10 px-3 py-2">100s to 10,000s of amps</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Rise time</td>
                      <td className="border border-white/10 px-3 py-2">Gradual (seconds to minutes)</td>
                      <td className="border border-white/10 px-3 py-2">Near instantaneous (&lt; 10 ms)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Protection mechanism</td>
                      <td className="border border-white/10 px-3 py-2">Thermal (time-delayed)</td>
                      <td className="border border-white/10 px-3 py-2">Magnetic (instantaneous)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">BS 7671 section</td>
                      <td className="border border-white/10 px-3 py-2">Section 433</td>
                      <td className="border border-white/10 px-3 py-2">Section 434</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Diagnostic Clue for Maintenance Technicians</p>
              <p className="text-sm text-white">
                When an MCB trips, examining the trip flag or indicator can reveal whether the thermal or
                magnetic element operated. Some MCBs have separate indicators for each. For fuses, a clean
                melt of the element with minimal discolouration of the sand suggests an overload (slow, sustained
                heating). A violently ruptured element with extensive sand vitrification and possible external
                discolouration indicates a high-energy short-circuit. This diagnostic evidence guides your
                fault-finding approach.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Prospective Fault Current and Breaking Capacity
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The prospective fault current (Ipf) at any point in an installation is the maximum current
              that would flow if a bolted fault (zero impedance) occurred at that point. It is determined
              by the supply voltage and the total impedance of the circuit from the source to the fault
              point. The closer the fault is to the supply transformer, the higher the Ipf — because there
              is less cable impedance to limit the current.
            </p>
            <p>
              BS 7671 Regulation 434.5.1 states an absolute requirement: the rated short-circuit breaking
              capacity of every protective device shall not be less than the prospective fault current at
              its point of installation. This is not a recommendation — it is a mandatory regulation. If a
              fault occurs and the device cannot safely interrupt the fault current, the device may fail
              explosively, causing fire, arc flash and potentially fatal injuries.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Measuring and Calculating Ipf</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Measurement:</strong> Use a calibrated loop impedance or PFC tester at the point of interest. The instrument measures the loop impedance and calculates Ipf = Uo / Z.</li>
                <li className="pl-1"><strong>At the origin:</strong> Ipf is highest. The DNO typically declares a maximum external loop impedance (Ze) for the supply. Ipf at origin = Uo / Ze.</li>
                <li className="pl-1"><strong>At sub-distribution boards:</strong> Ipf reduces as cable impedance is added. Ipf = Uo / (Ze + R1 + Rn), where R1 + Rn is the line and neutral conductor resistance of the sub-main cable.</li>
                <li className="pl-1"><strong>Typical UK values:</strong> 1 kA to 16 kA for domestic; up to 50 kA or more for large industrial installations near transformers.</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Breaking Capacity of Common Devices</h3>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Device Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Breaking Capacity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">BS 3036 rewirable fuse</td>
                      <td className="border border-white/10 px-3 py-2">1 kA to 4 kA</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">MCB to BS EN 60898 (domestic)</td>
                      <td className="border border-white/10 px-3 py-2">6 kA or 10 kA</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">MCB to BS EN 60898 (enhanced)</td>
                      <td className="border border-white/10 px-3 py-2">10 kA to 25 kA</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">BS 88 HRC fuse</td>
                      <td className="border border-white/10 px-3 py-2">Up to 80 kA</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">MCCB to BS EN 60947-2</td>
                      <td className="border border-white/10 px-3 py-2">16 kA to 150 kA</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical tip:</strong> During periodic inspection, always measure Ipf at the origin and
              at each distribution board. If the supply has been upgraded (e.g., the incoming cable or
              transformer has been changed), Ipf may have increased beyond the breaking capacity of existing
              devices. This is a common finding on older installations.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            The Adiabatic Equation — Cable Fault Withstand
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Even when a protective device has adequate breaking capacity, the cable must also survive the
              fault. During the brief time between the fault occurring and the device clearing it, a large
              current flows through the cable, generating heat. If this heat exceeds the thermal capacity of
              the cable insulation, the insulation will be damaged — potentially causing a secondary fault or
              fire.
            </p>
            <p>
              The adiabatic equation provides the mathematical check. It states that the thermal energy
              let-through by the protective device (I²t, measured in A²s) must not exceed the thermal energy
              the cable can absorb without damage (k²S², also in A²s). The 'adiabatic' assumption is that
              during the very short fault duration, all heat is retained in the conductor — none escapes
              through the insulation. This is conservative (worst-case) and valid for fault durations up
              to approximately 5 seconds.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Adiabatic Equation</p>
              <div className="text-center my-4">
                <p className="text-lg font-mono text-elec-yellow">t &le; k²S² / I²</p>
              </div>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>t:</strong> Maximum permitted fault duration (seconds)</li>
                <li className="pl-1"><strong>k:</strong> Constant for conductor/insulation material (from BS 7671 Table 43.1)</li>
                <li className="pl-1"><strong>S:</strong> Conductor cross-sectional area (mm²)</li>
                <li className="pl-1"><strong>I:</strong> Fault current (amperes)</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Values of k (BS 7671 Table 43.1)</h3>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Conductor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">PVC (70°C)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">XLPE (90°C)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Copper</td>
                      <td className="border border-white/10 px-3 py-2">115</td>
                      <td className="border border-white/10 px-3 py-2">143</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Aluminium</td>
                      <td className="border border-white/10 px-3 py-2">76</td>
                      <td className="border border-white/10 px-3 py-2">94</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Worked Example</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> A 4 mm² copper/PVC cable is protected by a 32 A MCB. The measured
                prospective fault current at the MCB is 3 kA (3000 A). Verify the cable can withstand the
                fault.
              </p>
              <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                <li className="pl-1">k = 115 (copper conductor, PVC insulation)</li>
                <li className="pl-1">S = 4 mm²</li>
                <li className="pl-1">k²S² = 115² &times; 4² = 13,225 &times; 16 = 211,600 A²s</li>
                <li className="pl-1">Maximum permitted time: t = k²S²/I² = 211,600 / 3000² = 211,600 / 9,000,000 = 0.0235 s (23.5 ms)</li>
                <li className="pl-1">Check: Does the MCB clear a 3 kA fault in less than 23.5 ms? A Type B 32 A MCB with 6 kA breaking capacity will operate magnetically (instantaneously) at 3 kA, clearing the fault in approximately 5-10 ms. ✓</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The adiabatic equation is particularly important for small cables at
              high fault levels. A 1 mm² cable has only k²S² = 13,225 A²s — at a fault current of 6 kA, the
              maximum permitted clearing time is just 0.37 ms. If the protective device cannot clear that fast,
              a larger cable must be used.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Discrimination, Cascading and Coordination
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In any installation with multiple levels of protection (main switch, sub-main devices, final
              circuit devices), the devices must be coordinated so that a fault causes minimum disruption.
              Ideally, only the device immediately upstream of the fault should operate — this is
              discrimination. In practice, achieving total discrimination across all fault current levels
              requires careful selection and verification using manufacturer coordination data.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Discrimination Methods</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Time grading:</strong> Each upstream device has a progressively longer time delay. Common in industrial installations using adjustable MCCBs or electronic trip units.</li>
                <li className="pl-1"><strong>Current grading:</strong> Upstream devices have higher current settings. Effective for overload discrimination but less reliable for short-circuits where both devices may operate in the instantaneous region.</li>
                <li className="pl-1"><strong>Energy (I²t) discrimination:</strong> The I²t let-through of the downstream device is less than the I²t needed to trip the upstream device. HRC fuses are particularly good at this due to their excellent current-limiting properties.</li>
                <li className="pl-1"><strong>Zone-selective interlocking (ZSI):</strong> Electronic communication between devices — a downstream device signals the upstream device to add a time delay, allowing the downstream device to clear the fault first.</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Cascading (Back-Up Protection)</h3>
              <p className="text-sm text-white mb-2">
                Cascading allows an installation to use downstream devices with a breaking capacity lower
                than the prospective fault current, provided an upstream current-limiting device (the back-up
                device) reduces the let-through energy to within the downstream device's capability. This is
                permitted by BS 7671 Regulation 434.5.1 but only where the devices are tested and certified
                as a coordinated combination by the manufacturer.
              </p>
              <p className="text-sm text-white/70">
                Example: An MCB with 6 kA breaking capacity installed where the Ipf is 12 kA. An upstream
                BS 88 HRC fuse limits the fault current to below 6 kA. The combination is verified by the
                manufacturer's coordination tables as safe and compliant.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Maintenance Implication</p>
              <p className="text-sm text-white">
                When replacing a protective device, you must check whether it forms part of a coordinated
                back-up protection arrangement. Replacing the upstream fuse with a different type or rating
                could invalidate the coordination, leaving the downstream MCBs unprotected against fault
                currents exceeding their breaking capacity. Always consult manufacturer documentation before
                changing any device in a coordinated system.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> Protection coordination is a key area of the electrical engineering
              maintenance pathway. The ability to verify that protection is correctly coordinated — and to
              identify when it is not — is essential for maintaining safe and reliable electrical systems.
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

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Key Equations</p>
                <ul className="space-y-0.5">
                  <li>Adiabatic: t &le; k²S² / I²</li>
                  <li>Ipf = Uo / Zs (at any point)</li>
                  <li>Ib &le; In &le; Iz (overload)</li>
                  <li>I2 &le; 1.45 &times; Iz</li>
                  <li>Breaking capacity &ge; Ipf</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">BS 7671 References</p>
                <ul className="space-y-0.5">
                  <li>Section 433 — Overload protection</li>
                  <li>Section 434 — Short-circuit protection</li>
                  <li>Reg 434.5.1 — Breaking capacity requirement</li>
                  <li>Reg 434.5.2 — I²t &le; k²S²</li>
                  <li>Table 43.1 — Values of k</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section4-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: RCDs and RCBOs
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section4-4">
              Next: Earthing Systems (TN, TT, IT)
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule2Section4_3;
