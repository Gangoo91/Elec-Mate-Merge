import { ArrowLeft, Activity, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Power Quality - HNC Module 4 Section 5.5";
const DESCRIPTION = "Master power quality for building services: voltage regulation, transient protection with SPDs, earthing arrangements and EMC considerations in commercial installations.";

const quickCheckQuestions = [
  {
    id: "voltage-range",
    question: "What is the permissible voltage range for a 230V UK supply under BS EN 50160?",
    options: ["220V-240V (±4.3%)", "207V-253V (±10%)", "218V-242V (±5%)", "225V-235V (±2%)"],
    correctIndex: 1,
    explanation: "BS EN 50160 specifies 230V +10%/-10% for LV supplies, giving a range of 207V to 253V. This harmonised European standard replaced the previous UK 240V ±6% tolerance."
  },
  {
    id: "spd-type",
    question: "Where should a Type 1 SPD be installed?",
    options: ["At socket outlets", "At the main distribution board near the origin", "On IT equipment only", "External to the building"],
    correctIndex: 1,
    explanation: "Type 1 (T1) SPDs are installed at or near the origin of the installation to protect against direct lightning strikes and major transients. They handle high energy surges."
  },
  {
    id: "earthing-tncs",
    question: "What is the key characteristic of a TN-C-S (PME) earthing system?",
    options: ["Separate earth electrode required", "Combined neutral and earth (PEN) from DNO", "No earth connection", "Earth via water pipes"],
    correctIndex: 1,
    explanation: "TN-C-S (Protective Multiple Earthing) has combined neutral and earth (PEN conductor) in the supply, which is split at the origin to provide separate N and PE for the installation."
  },
  {
    id: "harmonic",
    question: "What is the main cause of harmonic distortion in modern buildings?",
    options: ["Incandescent lighting", "Resistive heating", "Electronic loads (computers, LED drivers, VFDs)", "Induction motors"],
    correctIndex: 2,
    explanation: "Non-linear loads like switch-mode power supplies, LED drivers and variable frequency drives draw non-sinusoidal current, creating harmonics. These are increasingly common in modern buildings."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is 'voltage dip' (sag)?",
    options: [
      "Complete loss of voltage",
      "Temporary reduction in RMS voltage below 90%",
      "Voltage increase above normal",
      "Harmonic distortion"
    ],
    correctAnswer: 1,
    explanation: "A voltage dip (or sag) is a temporary reduction in RMS voltage typically to 10-90% of nominal for 0.5 cycles to 1 minute. Common causes include motor starting, fault clearance and large load switching."
  },
  {
    id: 2,
    question: "What does THD (Total Harmonic Distortion) measure?",
    options: [
      "Voltage level only",
      "The ratio of harmonic content to fundamental frequency",
      "Power factor",
      "Frequency variation"
    ],
    correctAnswer: 1,
    explanation: "THD quantifies harmonic distortion as a percentage - the ratio of all harmonic components to the fundamental frequency. THD below 5% is typically acceptable for most equipment."
  },
  {
    id: 3,
    question: "What is the function of an SPD (Surge Protective Device)?",
    options: [
      "To generate backup power",
      "To divert transient overvoltages to earth",
      "To regulate voltage level",
      "To correct power factor"
    ],
    correctAnswer: 1,
    explanation: "SPDs protect equipment by providing a low-impedance path to earth for transient overvoltages (surges). They clamp voltage to safe levels and divert surge energy away from sensitive equipment."
  },
  {
    id: 4,
    question: "What causes flicker in electrical systems?",
    options: [
      "Steady-state operation",
      "Rapid voltage fluctuations causing visible light variation",
      "High power factor",
      "Good quality earthing"
    ],
    correctAnswer: 1,
    explanation: "Flicker is caused by rapid voltage fluctuations (typically 0.5-25Hz) that produce visible variation in light output. Common causes include arc furnaces, welding equipment and large motor starting."
  },
  {
    id: 5,
    question: "In a TN-S earthing system, how is the earth provided?",
    options: [
      "Combined with neutral (PEN)",
      "Separate earth conductor from DNO transformer",
      "Local earth electrode only",
      "Through the building structure"
    ],
    correctAnswer: 1,
    explanation: "TN-S has a separate earth conductor from the supply transformer (usually the cable sheath) providing a dedicated PE throughout. This is common in older installations with lead-sheathed cables."
  },
  {
    id: 6,
    question: "What is the purpose of EMC (Electromagnetic Compatibility) measures?",
    options: [
      "To increase power consumption",
      "To ensure equipment neither emits nor is affected by electromagnetic interference",
      "To improve aesthetics",
      "To reduce installation costs"
    ],
    correctAnswer: 1,
    explanation: "EMC ensures electrical equipment operates without causing interference to other equipment (emission) and can function in its electromagnetic environment (immunity). It's a legal requirement under EMC Directive."
  },
  {
    id: 7,
    question: "What is the third harmonic (3rd) particularly problematic for?",
    options: [
      "Single-phase loads only",
      "Neutral conductors in three-phase systems - they add rather than cancel",
      "Earth conductors",
      "Circuit breakers"
    ],
    correctAnswer: 1,
    explanation: "Third harmonics (and their multiples) from balanced three-phase loads add in the neutral rather than cancelling. This can cause neutral current to exceed phase current, requiring oversized neutrals."
  },
  {
    id: 8,
    question: "What voltage regulation problem can occur with long cable runs?",
    options: [
      "Voltage increase",
      "Excessive voltage drop causing equipment malfunction",
      "Harmonic generation",
      "Improved power quality"
    ],
    correctAnswer: 1,
    explanation: "Long cables have higher resistance, causing voltage drop (I×R losses). If the voltage at the load drops below the equipment tolerance (typically -10%), malfunction or damage can occur."
  },
  {
    id: 9,
    question: "What is a Type 2 SPD designed to protect against?",
    options: [
      "Direct lightning strikes only",
      "Switching transients and indirect lightning effects",
      "Harmonic distortion",
      "Voltage sags"
    ],
    correctAnswer: 1,
    explanation: "Type 2 SPDs protect against switching transients and the residual effects of lightning after Type 1 protection. They're installed at distribution boards to protect final circuits and equipment."
  },
  {
    id: 10,
    question: "What is power factor correction used for?",
    options: [
      "Increasing voltage",
      "Reducing reactive power demand and improving efficiency",
      "Generating harmonics",
      "Providing backup power"
    ],
    correctAnswer: 1,
    explanation: "Power factor correction capacitors supply reactive power locally, reducing the reactive current drawn from the supply. This improves efficiency, reduces losses and can lower electricity bills."
  }
];

const faqs = [
  {
    question: "What causes voltage dips and how can they be mitigated?",
    answer: "Voltage dips are caused by large motor starting, transformer energisation, faults on the supply network, or large load switching. Mitigation includes soft starters/VFDs for motors, electronic voltage regulators, UPS for sensitive equipment, or increased supply capacity with lower source impedance."
  },
  {
    question: "When are Type 1 SPDs required?",
    answer: "Type 1 SPDs are required where lightning protection systems (LPS) are installed, as per BS EN 62305. They're also recommended for buildings at high risk of direct lightning strikes, or where the supply enters via overhead lines. They must be coordinated with Type 2 devices downstream."
  },
  {
    question: "How do I select the right earthing arrangement for a building?",
    answer: "The earthing system is usually determined by the DNO supply type. TN-C-S (PME) is most common for new supplies. TN-S is used where available (older areas). TT with local electrode is used in rural areas or where PME is unsuitable (swimming pools, caravans). The designer must work with the DNO and consider special locations."
  },
  {
    question: "What causes neutral conductor overheating?",
    answer: "In three-phase systems with non-linear loads, third-harmonic currents add in the neutral instead of cancelling. If the neutral is sized the same as phases (as per traditional practice), it can overheat. Modern designs may specify 200% neutral sizing or separate neutrals for non-linear loads."
  },
  {
    question: "What is the difference between EMC filtering and shielding?",
    answer: "Filtering attenuates conducted interference on power and signal cables using inductors and capacitors. Shielding prevents radiated interference using conductive enclosures or screens around cables/equipment. Both may be needed depending on the frequency and type of interference."
  }
];

const HNCModule4Section5_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Activity className="h-4 w-4" />
            <span>Module 4.5.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Power Quality
          </h1>
          <p className="text-white/80">
            Ensuring clean, stable power for sensitive building services equipment
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Voltage regulation:</strong> UK supply 230V ±10%</li>
              <li className="pl-1"><strong>SPDs:</strong> Protect against transient surges</li>
              <li className="pl-1"><strong>Earthing:</strong> TN-C-S (PME) most common</li>
              <li className="pl-1"><strong>EMC:</strong> Prevent electromagnetic interference</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>IT equipment:</strong> Sensitive to voltage variations</li>
              <li className="pl-1"><strong>LED lighting:</strong> Source of harmonics</li>
              <li className="pl-1"><strong>VFDs:</strong> Require EMC filtering</li>
              <li className="pl-1"><strong>Medical:</strong> Stringent power quality needs</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand voltage quality parameters and tolerances",
              "Specify and coordinate surge protection devices",
              "Select appropriate earthing arrangements",
              "Recognise and mitigate harmonic distortion",
              "Apply EMC principles to building services design",
              "Diagnose common power quality problems"
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

        {/* Section 1: Voltage Regulation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Voltage Regulation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Voltage quality directly affects equipment performance and lifespan. UK supplies
              must comply with BS EN 50160, which defines acceptable voltage characteristics
              at the point of supply.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BS EN 50160 Voltage Quality Parameters</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Parameter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Requirement</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Supply voltage</td>
                      <td className="border border-white/10 px-3 py-2">230V ±10%</td>
                      <td className="border border-white/10 px-3 py-2">207V-253V for 95% of week</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Frequency</td>
                      <td className="border border-white/10 px-3 py-2">50Hz ±1%</td>
                      <td className="border border-white/10 px-3 py-2">49.5-50.5Hz for 95% of year</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Voltage dips</td>
                      <td className="border border-white/10 px-3 py-2">Variable</td>
                      <td className="border border-white/10 px-3 py-2">Typically 10-1000 per year</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">THD voltage</td>
                      <td className="border border-white/10 px-3 py-2">≤8%</td>
                      <td className="border border-white/10 px-3 py-2">Total harmonic distortion</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Unbalance</td>
                      <td className="border border-white/10 px-3 py-2">≤2%</td>
                      <td className="border border-white/10 px-3 py-2">Three-phase voltage unbalance</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Voltage problems and effects:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Under-voltage:</strong> Motor overheating, equipment malfunction</li>
                <li className="pl-1"><strong>Over-voltage:</strong> Shortened lamp life, equipment damage</li>
                <li className="pl-1"><strong>Voltage dips:</strong> IT resets, process interruption</li>
                <li className="pl-1"><strong>Flicker:</strong> Visible light variation, annoyance</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design consideration:</strong> Total voltage drop (supply + installation) must keep equipment voltage within tolerance. BS 7671 limits installation voltage drop to 3-5%.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Transient Protection */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Transient Protection (SPDs)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Surge Protective Devices (SPDs) protect against transient overvoltages from
              lightning, switching operations and network disturbances. Properly coordinated
              SPDs are essential for protecting sensitive electronic equipment.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">SPD Types and Applications</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Test Current</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Location</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Type 1 (T1)</td>
                      <td className="border border-white/10 px-3 py-2">10/350µs (Iimp)</td>
                      <td className="border border-white/10 px-3 py-2">Main DB/origin</td>
                      <td className="border border-white/10 px-3 py-2">Direct lightning, LPS buildings</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Type 2 (T2)</td>
                      <td className="border border-white/10 px-3 py-2">8/20µs (In/Imax)</td>
                      <td className="border border-white/10 px-3 py-2">Sub-distribution</td>
                      <td className="border border-white/10 px-3 py-2">Switching, indirect lightning</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Type 3 (T3)</td>
                      <td className="border border-white/10 px-3 py-2">1.2/50µs + 8/20µs</td>
                      <td className="border border-white/10 px-3 py-2">Point of use</td>
                      <td className="border border-white/10 px-3 py-2">Fine protection for equipment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Type 1+2</td>
                      <td className="border border-white/10 px-3 py-2">Combined</td>
                      <td className="border border-white/10 px-3 py-2">Main DB</td>
                      <td className="border border-white/10 px-3 py-2">Simplified two-stage protection</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">SPD Selection Parameters</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Uc:</strong> Maximum continuous operating voltage (&gt;253V for UK)</li>
                <li className="pl-1"><strong>Up:</strong> Voltage protection level (lower is better, &lt;1.5kV typical)</li>
                <li className="pl-1"><strong>In:</strong> Nominal discharge current (typically 5-20kA for T2)</li>
                <li className="pl-1"><strong>Imax:</strong> Maximum discharge current</li>
                <li className="pl-1"><strong>Mode:</strong> L-N, L-PE, N-PE (common mode/differential mode)</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Coordination:</strong> T1 and T2 SPDs must be coordinated - typically 10m cable minimum between them, or use manufacturer-specified coordination components.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Earthing Arrangements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Earthing Arrangements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The earthing system is fundamental to electrical safety and affects fault loop
              impedance, protective device operation and electromagnetic compatibility.
              Understanding different systems enables correct design for each situation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">UK Earthing Systems</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">System</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Earth Source</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Characteristics</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">TN-S</td>
                      <td className="border border-white/10 px-3 py-2">Separate DNO earth conductor</td>
                      <td className="border border-white/10 px-3 py-2">Low Zs, reliable earth</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">TN-C-S (PME)</td>
                      <td className="border border-white/10 px-3 py-2">Combined PEN split at origin</td>
                      <td className="border border-white/10 px-3 py-2">Most common, some restrictions</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">TT</td>
                      <td className="border border-white/10 px-3 py-2">Local earth electrode</td>
                      <td className="border border-white/10 px-3 py-2">RCD protection essential</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">IT</td>
                      <td className="border border-white/10 px-3 py-2">Isolated or high-impedance earth</td>
                      <td className="border border-white/10 px-3 py-2">Medical, continuous process</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">PME Restrictions</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Not for swimming pools/saunas</li>
                  <li className="pl-1">Restrictions for caravan parks</li>
                  <li className="pl-1">Careful consideration for petrol stations</li>
                  <li className="pl-1">Additional bonding may be required</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Main Bonding Requirements</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Water, gas and oil service pipes</li>
                  <li className="pl-1">Structural steelwork</li>
                  <li className="pl-1">Lightning protection system</li>
                  <li className="pl-1">Minimum 10mm² copper (TN), 16mm² (TT)</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design note:</strong> Always verify earthing type with the DNO before design. PME availability and restrictions affect the entire installation design.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: EMC Considerations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            EMC Considerations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electromagnetic Compatibility (EMC) ensures electrical equipment operates reliably
              without causing or being affected by electromagnetic interference. Modern buildings
              with extensive electronic systems require careful EMC design.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Sources of EMI in Buildings</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Source</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Interference Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Affected Equipment</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">VFDs/Inverters</td>
                      <td className="border border-white/10 px-3 py-2">Conducted and radiated HF</td>
                      <td className="border border-white/10 px-3 py-2">IT, audio systems, sensors</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LED drivers</td>
                      <td className="border border-white/10 px-3 py-2">Conducted harmonics</td>
                      <td className="border border-white/10 px-3 py-2">Audio, radio receivers</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Switching contacts</td>
                      <td className="border border-white/10 px-3 py-2">Transient spikes</td>
                      <td className="border border-white/10 px-3 py-2">Control systems, PLCs</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">IT equipment</td>
                      <td className="border border-white/10 px-3 py-2">Harmonics, HF noise</td>
                      <td className="border border-white/10 px-3 py-2">Audio, measurement</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Welding equipment</td>
                      <td className="border border-white/10 px-3 py-2">High current transients</td>
                      <td className="border border-white/10 px-3 py-2">Most electronic equipment</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">EMC Design Measures</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Cable segregation:</strong> Separate power, control and data cables</li>
                <li className="pl-1"><strong>Shielded cables:</strong> For sensitive signals, earthed at one/both ends</li>
                <li className="pl-1"><strong>EMC filters:</strong> On VFD inputs, switched-mode power supplies</li>
                <li className="pl-1"><strong>Ferrite cores:</strong> On data cables near interference sources</li>
                <li className="pl-1"><strong>Star earthing:</strong> Single point earth for sensitive systems</li>
                <li className="pl-1"><strong>Twisted pairs:</strong> Reduce magnetic field pickup</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Harmonics:</strong> Third harmonics (150Hz) from electronic loads add in three-phase neutrals. Consider oversized neutrals or separate neutrals for non-linear load circuits.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: SPD Specification</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Specify SPDs for an office building with lightning protection system.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Building has external LPS → Type 1 SPD required</p>
                <p className="mt-2">Main switchboard (Type 1+2 combined):</p>
                <p>• Uc ≥ 253V (for 230V +10%)</p>
                <p>• Up ≤ 1.5kV</p>
                <p>• Iimp ≥ 12.5kA (10/350µs)</p>
                <p>• Mode: L-N, L-PE, N-PE</p>
                <p className="mt-2">Sub-distribution (Type 2):</p>
                <p>• In ≥ 5kA (8/20µs)</p>
                <p>• Up ≤ 1.2kV</p>
                <p className="mt-2">IT room final DB (Type 2+3):</p>
                <p>• Up ≤ 1.0kV for sensitive equipment</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Harmonic Neutral Sizing</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Calculate neutral current for 3-phase IT load with 60% third harmonic current.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Phase current per phase: 50A (balanced)</p>
                <p>Third harmonic per phase: 50 × 0.6 = 30A</p>
                <p className="mt-2">Third harmonics add in neutral:</p>
                <p>Neutral 3rd harmonic = 3 × 30 = 90A</p>
                <p className="mt-2">Total neutral current (RMS):</p>
                <p>In = √(fundamental² + 3rd²)</p>
                <p>Fundamental cancels → approximately 0A</p>
                <p>In ≈ <strong>90A</strong> (from 3rd harmonic alone)</p>
                <p className="text-red-400 mt-2">Neutral exceeds phase current!</p>
                <p>Specify 200% rated neutral or separate neutrals</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Voltage Drop Check</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Verify voltage at end of 80m sub-main when supply is at lower tolerance.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Supply voltage: 207V (lower limit -10%)</p>
                <p>Sub-main: 80m, 35mm² copper, 100A load</p>
                <p>Voltage drop: 80m × 100A × 1.25mV/A/m = 10V</p>
                <p className="mt-2">Voltage at sub-DB: 207 - 10 = 197V</p>
                <p className="mt-2">Add final circuit drop (3%): 197 × 0.97 = 191V</p>
                <p className="text-red-400 mt-2">191V is below -15% limit (195.5V)</p>
                <p>Solution: Increase cable size or reduce length</p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Cable Segregation Rules</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Power and data cables: 300mm minimum separation</li>
                <li className="pl-1">VFD outputs: Shielded cable, separate containment</li>
                <li className="pl-1">Fire alarm cables: Segregated or fire-rated</li>
                <li className="pl-1">Cross cables at 90° where separation impossible</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Power Quality Monitoring</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Install power quality meters at main intake</li>
                <li className="pl-1">Monitor voltage, current, harmonics, power factor</li>
                <li className="pl-1">Log events (dips, swells, transients)</li>
                <li className="pl-1">Trend data for predictive maintenance</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Power Quality Problems</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Nuisance RCD trips</strong> - Often harmonic or EMI related</li>
                <li className="pl-1"><strong>IT resets during storms</strong> - Inadequate surge protection</li>
                <li className="pl-1"><strong>Overheating neutrals</strong> - Third harmonic currents</li>
                <li className="pl-1"><strong>Motor hunting</strong> - Voltage unbalance</li>
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
                <p className="font-medium text-white mb-1">Voltage Quality</p>
                <ul className="space-y-0.5">
                  <li>UK supply: 230V ±10%</li>
                  <li>Frequency: 50Hz ±1%</li>
                  <li>THD: ≤8% voltage</li>
                  <li>Installation Vd: 3-5%</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">SPD Types</p>
                <ul className="space-y-0.5">
                  <li>T1: Origin, direct lightning</li>
                  <li>T2: Sub-DBs, switching</li>
                  <li>T3: Point of use, fine</li>
                  <li>T1+2: Combined protection</li>
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
            <Link to="../h-n-c-module4-section5-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: UPS and Standby Power
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section5-6">
              Next: Metering and Monitoring
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule4Section5_5;
