import { useState } from "react";
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp, Flame, ThermometerSun, AlertTriangle, Zap, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

// Quick check questions for inline comprehension
const quickCheckQuestions = [
  {
    id: "qc1",
    question: "A termination shows discolouration but no visible damage. The cable insulation nearby has hardened and become brittle. What is the most likely cause?",
    options: [
      "Recent overload event",
      "Chronic loose connection causing localised heating",
      "Manufacturing defect in the cable",
      "Water ingress damaging the insulation"
    ],
    correctIndex: 1,
    explanation: "Chronic loose connections cause repeated heating cycles that gradually degrade insulation. The oxidation and discolouration indicate ongoing thermal stress, while the brittle insulation confirms prolonged exposure. A single overload would cause more uniform damage along the cable rather than localised effects at the termination."
  },
  {
    id: "qc2",
    question: "During inspection, you notice a faint burning smell near a consumer unit but cannot identify visible damage. What systematic approach should you take?",
    options: [
      "Replace the entire consumer unit immediately",
      "Use thermal imaging to identify hot spots, then investigate connections",
      "Increase the rating of the MCBs to prevent overloading",
      "Spray contact cleaner on all connections"
    ],
    correctIndex: 1,
    explanation: "Thermal imaging reveals temperature anomalies invisible to the naked eye, identifying exactly where overheating occurs. This non-invasive method allows targeted investigation without unnecessarily disturbing sound connections. Replacing components without diagnosis wastes resources and may not address the actual fault location."
  },
  {
    id: "qc3",
    question: "Insulation resistance testing on a 20-year-old installation shows readings of 0.8 megohms on several circuits. What does this indicate?",
    options: [
      "The installation is dangerous and must be isolated immediately",
      "Normal aging - no action required",
      "Insulation degradation requiring investigation and remediation planning",
      "Moisture ingress that will resolve naturally"
    ],
    correctIndex: 2,
    explanation: "While 0.8 megohms meets the minimum 1 megohm standard when temperature-corrected, readings this low in an older installation indicate significant insulation degradation. BS 7671 recommends investigation when readings approach minimum values. This suggests planning for cable replacement whilst monitoring for further deterioration."
  },
  {
    id: "qc4",
    question: "A thermal image shows a 15°C temperature rise at one MCB compared to adjacent units on the same busbar. What is the most probable cause?",
    options: [
      "Higher rated MCB generating more heat",
      "Poor connection between MCB and busbar",
      "Faulty thermal imaging equipment",
      "Normal variation between MCBs"
    ],
    correctIndex: 1,
    explanation: "A 15°C differential between adjacent MCBs on the same busbar strongly indicates connection resistance at that specific device. Good connections show minimal temperature rise. The IET Guidance Note 3 considers rises above 10°C as requiring investigation, with 15°C+ warranting immediate attention to prevent fire risk."
  }
];

// Quiz questions for end-of-section assessment
const quizQuestions = [
  {
    id: "q1",
    question: "What is the primary mechanism by which loose connections cause overheating?",
    options: [
      "Increased inductance in the circuit",
      "Higher resistance at the connection point (P = I²R)",
      "Capacitive heating effects",
      "Electromagnetic interference"
    ],
    correctIndex: 1
  },
  {
    id: "q2",
    question: "According to BS 7671, what is the minimum acceptable insulation resistance for a 230V circuit?",
    options: [
      "0.5 megohms",
      "1.0 megohms",
      "2.0 megohms",
      "5.0 megohms"
    ],
    correctIndex: 1
  },
  {
    id: "q3",
    question: "Which cable type is most susceptible to thermal degradation from overloading?",
    options: [
      "XLPE insulated cables",
      "Mineral insulated cables",
      "PVC insulated cables at maximum operating temperature",
      "LSF (Low Smoke and Fume) cables"
    ],
    correctIndex: 2
  },
  {
    id: "q4",
    question: "What temperature differential in thermal imaging typically indicates a connection requiring immediate attention?",
    options: [
      "3-5°C above ambient",
      "5-10°C above adjacent connections",
      "10-15°C above adjacent connections",
      "Greater than 15°C above adjacent connections"
    ],
    correctIndex: 3
  },
  {
    id: "q5",
    question: "How does humidity affect insulation resistance readings?",
    options: [
      "Humidity has no effect on insulation resistance",
      "Higher humidity increases insulation resistance",
      "Higher humidity decreases insulation resistance",
      "Humidity only affects outdoor installations"
    ],
    correctIndex: 2
  },
  {
    id: "q6",
    question: "What visual indicator suggests chronic overheating at a cable termination?",
    options: [
      "Bright copper coloration",
      "Black oxidation and discolouration of conductors",
      "Shiny terminal screws",
      "Flexible cable insulation"
    ],
    correctIndex: 1
  },
  {
    id: "q7",
    question: "Which factor has the greatest impact on cable current-carrying capacity?",
    options: [
      "Cable colour",
      "Installation method and grouping",
      "Cable manufacturer",
      "Time of installation"
    ],
    correctIndex: 1
  },
  {
    id: "q8",
    question: "At what temperature does PVC insulation begin to soften and deform?",
    options: [
      "50°C",
      "70°C",
      "90°C",
      "115°C"
    ],
    correctIndex: 1
  },
  {
    id: "q9",
    question: "What causes arcing at deteriorated connections?",
    options: [
      "Excessive voltage drop",
      "High resistance creating heat that carbonises insulation, creating conductive paths",
      "Incorrect polarity",
      "Undersized neutral conductors"
    ],
    correctIndex: 1
  },
  {
    id: "q10",
    question: "Which thermal imaging temperature range is considered 'critical' requiring immediate isolation?",
    options: [
      "10-20°C rise",
      "20-40°C rise",
      "40-70°C rise",
      "Greater than 70°C rise or approaching material limits"
    ],
    correctIndex: 3
  },
  {
    id: "q11",
    question: "How should cables in thermal insulation be derated according to BS 7671?",
    options: [
      "No derating required",
      "Derated by 25%",
      "Derated by 50% or more depending on length in insulation",
      "Cables must not pass through thermal insulation"
    ],
    correctIndex: 2
  },
  {
    id: "q12",
    question: "What is the recommended action when insulation resistance falls below 2 megohms but remains above 1 megohm?",
    options: [
      "No action required - circuit is compliant",
      "Monitor and plan investigation - approaching minimum limits",
      "Immediate circuit replacement required",
      "Increase test voltage to obtain accurate reading"
    ],
    correctIndex: 1
  }
];

// FAQ data
const faqs = [
  {
    question: "How can I identify overheating damage that occurred in the past but is no longer active?",
    answer: "Historical overheating leaves characteristic evidence: discoloured or blackened conductors and terminals, hardened and brittle insulation that cracks when flexed, melted or deformed cable sheaths, charred markings on enclosures, and a distinctive burnt smell that persists in components. The insulation may have changed colour from its original state - white becoming yellow or brown, and grey becoming darker. Check for crystallised or oxidised conductor surfaces. If insulation crumbles when touched, this indicates severe historical thermal damage requiring cable replacement regardless of current temperature readings."
  },
  {
    question: "When should thermal imaging be performed during an electrical inspection?",
    answer: "Thermal imaging is most effective when circuits are under normal load conditions - ideally during peak usage periods. For commercial installations, this typically means during business hours when lighting, equipment and HVAC systems operate. For domestic properties, evening periods when cooking, heating and entertainment systems run simultaneously provide representative loading. Allow circuits to reach thermal equilibrium (typically 30-60 minutes under load) before imaging. Record ambient temperature and note loading conditions for accurate interpretation. Thermal imaging should be part of periodic inspections for installations over 10 years old or where overheating risk factors exist."
  },
  {
    question: "What causes cables to fail prematurely even when correctly rated?",
    answer: "Several factors accelerate cable degradation beyond calculated service life: grouping with other cables without adequate derating reduces heat dissipation; installation in thermal insulation traps heat; ambient temperatures exceeding design assumptions; harmonic currents in neutral conductors generating additional heat; repeated short-duration overloads that cycling heating and cooling stress insulation; exposure to UV radiation degrading sheath materials; chemical contamination from building materials or processes; and rodent damage compromising insulation integrity. Physical damage during installation that goes undetected can create localised hot spots. Regular inspection and testing identifies deterioration before failure occurs."
  },
  {
    question: "How do I determine if a circuit has been overloaded historically?",
    answer: "Historical overload evidence includes: MCB or fuse that runs warm compared to lightly-loaded adjacent devices; conductor discolouration at terminations particularly in the consumer unit; insulation softening or deformation where cables exit enclosures; reduced insulation resistance compared to similar-aged circuits; evidence of thermal movement at cable supports; and user reports of intermittent tripping. Check the connected load against circuit rating - if close to or exceeding 80% continuously, chronic overload is likely. Examine neutral connections carefully as these often show damage first in single-phase overload scenarios due to loose connections being more common than phase conductors."
  },
  {
    question: "What immediate actions should I take upon discovering active overheating?",
    answer: "Upon discovering active overheating: 1) Assess fire risk - if imminent danger exists, isolate the supply and call emergency services; 2) If safe to proceed, isolate the affected circuit at the distribution board; 3) Allow components to cool before handling - hot terminations can cause burns; 4) Document the fault with photographs and thermal images if available; 5) Investigate the cause - loose connection, overload, or component failure; 6) Do not restore supply until the fault is rectified and verified; 7) If the cause cannot be immediately determined, recommend specialist investigation; 8) Issue an appropriate electrical installation condition report code reflecting the severity."
  },
  {
    question: "How does cable installation method affect overheating risk?",
    answer: "Installation method critically impacts cable thermal performance. Cables clipped direct to surfaces dissipate heat effectively and can operate at full rated capacity. Enclosed cables in conduit or trunking require derating (typically 0.725-0.9 depending on grouping) as heat dissipation is restricted. Cables in thermal insulation require significant derating (0.5 or lower) as heat cannot escape. Buried cables depend on soil thermal resistivity. Grouping multiple circuits together requires cumulative derating as each cable heats its neighbours. Vertical cable runs in trunking can create chimney effects where heat rises and accumulates. Always verify installation method before assessing cable adequacy."
  }
];

const Level3Module4Section3_6 = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  useSEO(
    "Overheating and Insulation Breakdown - Level 3 Fault Diagnosis",
    "Identifying thermal faults and insulation failures in electrical systems"
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 border-b border-white/10 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white/70 hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="../section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <Flame className="w-6 h-6 text-red-400" />
            </div>
            <span className="text-elec-yellow font-medium">Module 4: Section 3.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Overheating and Insulation Breakdown
          </h1>
          <p className="text-lg text-white/70">
            Identifying thermal faults and insulation failures in electrical systems - understanding the mechanisms,
            detection methods, and remediation strategies for preventing fire hazards and system failures.
          </p>
        </div>

        {/* Learning Outcomes */}
        <div className="bg-white/5 rounded-xl p-6 mb-10 border border-white/10">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-elec-yellow" />
            Learning Outcomes
          </h2>
          <ul className="space-y-2">
            {[
              "Understand the thermal mechanisms that cause conductor and connection overheating",
              "Identify visual, thermal, and test indicators of insulation degradation",
              "Apply thermal imaging techniques for non-invasive fault detection",
              "Implement appropriate remediation strategies for thermal faults",
              "Relate overheating risks to BS 7671 cable selection and installation requirements"
            ].map((outcome, index) => (
              <li key={index} className="flex items-start gap-3 text-white/80">
                <span className="text-elec-yellow mt-1">-</span>
                {outcome}
              </li>
            ))}
          </ul>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          {/* Section 01 - Causes of Electrical Overheating */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-elec-yellow/30">01</span>
              <h2 className="text-xl font-semibold text-white">Causes of Electrical Overheating</h2>
            </div>

            <div className="space-y-6 text-white/80">
              <p>
                Electrical overheating represents one of the most significant fire risks in installations.
                Understanding the thermal mechanisms allows electricians to identify potential hazards before
                they develop into dangerous conditions. All overheating fundamentally derives from the
                relationship P = I²R - power dissipated as heat equals current squared multiplied by resistance.
              </p>

              <div className="bg-white/5 rounded-lg p-5 border border-white/10">
                <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                  <ThermometerSun className="w-5 h-5 text-orange-400" />
                  Loose Connections - The Primary Cause
                </h3>
                <p className="mb-4">
                  Loose connections cause the majority of electrical fires. When a termination loosens, the
                  contact area between conductor and terminal reduces, concentrating current flow through a
                  smaller cross-section. This dramatically increases local resistance and heat generation.
                  The heat then causes oxidation of the copper, further increasing resistance in a
                  self-accelerating cycle.
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <span className="text-red-400 font-bold">Stage 1:</span>
                    <span>Initial loosening - slight resistance increase, minimal temperature rise</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-orange-400 font-bold">Stage 2:</span>
                    <span>Oxidation develops - resistance increases, noticeable warming, discolouration begins</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-yellow-400 font-bold">Stage 3:</span>
                    <span>Significant heating - insulation softens, burning smell, conductor blackening</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-500 font-bold">Stage 4:</span>
                    <span>Critical - arcing begins, carbonised material creates conductive paths, fire risk imminent</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-5 border border-white/10">
                <h3 className="text-white font-medium mb-4">Overloaded Circuits</h3>
                <p className="mb-4">
                  When current exceeds cable rating, the I²R heating exceeds the cable's ability to
                  dissipate heat to surroundings. PVC insulation is rated to 70°C maximum operating
                  temperature. Exceeding this degrades the plasticisers that keep insulation flexible,
                  causing it to harden and eventually crack.
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="bg-white/5 rounded p-4">
                    <h4 className="text-white font-medium mb-2">Short-Term Overload Effects</h4>
                    <ul className="space-y-1 text-sm">
                      <li>- Temperature rise above rating</li>
                      <li>- Insulation softening</li>
                      <li>- Protective device operation if severe</li>
                      <li>- Generally recoverable if brief</li>
                    </ul>
                  </div>
                  <div className="bg-white/5 rounded p-4">
                    <h4 className="text-white font-medium mb-2">Chronic Overload Effects</h4>
                    <ul className="space-y-1 text-sm">
                      <li>- Progressive insulation degradation</li>
                      <li>- Reduced insulation resistance</li>
                      <li>- Increased fire risk over time</li>
                      <li>- Cable replacement required</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-5 border border-white/10">
                <h3 className="text-white font-medium mb-4">Installation Method Factors</h3>
                <p className="mb-4">
                  BS 7671 Appendix 4 specifies current-carrying capacities based on installation
                  methods. Cables unable to dissipate heat effectively must be derated. Common
                  scenarios causing overheating include:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">-</span>
                    <span><strong>Thermal insulation:</strong> Cables surrounded by loft or wall insulation cannot dissipate heat - 50% derating typically required</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">-</span>
                    <span><strong>Cable grouping:</strong> Multiple cables in close proximity heat each other - cumulative derating required</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">-</span>
                    <span><strong>High ambient temperature:</strong> Plant rooms, airing cupboards, and areas near heat sources require derating</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">-</span>
                    <span><strong>Enclosed trunking:</strong> Restricted airflow reduces heat dissipation compared to clipped direct</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-lg p-5 border border-white/10">
                <h3 className="text-white font-medium mb-4">Harmonic Heating in Neutral Conductors</h3>
                <p className="mb-4">
                  In three-phase systems with non-linear loads (LED drivers, computer equipment, VFDs),
                  triplen harmonics (3rd, 9th, 15th) add arithmetically in the neutral rather than
                  cancelling. This can result in neutral currents exceeding phase currents, causing
                  overheating in neutrals sized assuming balanced cancellation.
                </p>
                <div className="bg-red-500/10 border border-red-500/30 rounded p-4 text-sm">
                  <p className="text-red-300 font-medium mb-2">Critical Consideration</p>
                  <p>
                    Older installations with reduced neutral conductors are particularly vulnerable.
                    When investigating three-phase distribution board heating, always check neutral
                    connections and consider harmonic analysis if electronic loads predominate.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Check 1 */}
            <div className="mt-8">
              <InlineCheck
                question={quickCheckQuestions[0].question}
                options={quickCheckQuestions[0].options}
                correctIndex={quickCheckQuestions[0].correctIndex}
                explanation={quickCheckQuestions[0].explanation}
              />
            </div>
          </section>

          {/* Section 02 - Insulation Degradation Mechanisms */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-elec-yellow/30">02</span>
              <h2 className="text-xl font-semibold text-white">Insulation Degradation Mechanisms</h2>
            </div>

            <div className="space-y-6 text-white/80">
              <p>
                Insulation degradation is a progressive process that reduces the dielectric strength
                separating live conductors from earth and each other. Understanding degradation mechanisms
                allows prediction of failure modes and appropriate testing strategies. The goal is
                detecting deterioration before complete failure causes faults or fires.
              </p>

              <div className="bg-white/5 rounded-lg p-5 border border-white/10">
                <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                  Thermal Ageing
                </h3>
                <p className="mb-4">
                  Elevated temperatures accelerate insulation degradation through chemical changes in
                  the polymer structure. The Arrhenius equation describes this relationship - for every
                  10°C increase above rated temperature, insulation life approximately halves. A cable
                  rated for 30-year life at 70°C might last only 15 years at 80°C and 7 years at 90°C.
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <h4 className="text-white font-medium">PVC Degradation Signs</h4>
                    <ul className="space-y-1 text-sm">
                      <li>- Loss of flexibility - becomes rigid</li>
                      <li>- Colour change - yellowing or browning</li>
                      <li>- Cracking when flexed</li>
                      <li>- Chalky surface texture</li>
                      <li>- Distinctive acidic smell</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-white font-medium">XLPE Degradation Signs</h4>
                    <ul className="space-y-1 text-sm">
                      <li>- More resistant than PVC</li>
                      <li>- Develops micro-cracks</li>
                      <li>- Surface oxidation</li>
                      <li>- Reduced elasticity</li>
                      <li>- Water tree formation (buried cables)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-5 border border-white/10">
                <h3 className="text-white font-medium mb-4">Moisture Effects</h3>
                <p className="mb-4">
                  Water significantly reduces insulation resistance. Moisture can enter through
                  damaged sheaths, condensation, or during installation. The effects depend on
                  insulation type and water purity:
                </p>
                <div className="space-y-4">
                  <div className="bg-white/5 rounded p-4">
                    <h4 className="text-white font-medium mb-2">Surface Tracking</h4>
                    <p className="text-sm">
                      Contaminated moisture on insulation surfaces creates conductive paths.
                      When voltage stress exceeds the surface dielectric strength, small arcs
                      carbonise the material, progressively extending the track until flashover
                      occurs. Common in damp locations with pollution (industrial environments,
                      outdoor terminations).
                    </p>
                  </div>
                  <div className="bg-white/5 rounded p-4">
                    <h4 className="text-white font-medium mb-2">Water Trees (Underground Cables)</h4>
                    <p className="text-sm">
                      Water molecules penetrate XLPE insulation under voltage stress, forming
                      tree-like structures that grow from the conductor or sheath towards the
                      opposite side. Eventually these convert to electrical trees that cause
                      cable failure. UV-resistant and water-blocked cables resist this degradation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-5 border border-white/10">
                <h3 className="text-white font-medium mb-4">Environmental Factors</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <h4 className="text-elec-yellow font-medium">UV Radiation</h4>
                    <p className="text-sm">
                      Sunlight degrades cable sheaths not rated for UV exposure. PVC becomes
                      brittle and cracks, exposing insulation. Use UV-resistant cables or
                      protective conduit for external installations.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-elec-yellow font-medium">Chemical Attack</h4>
                    <p className="text-sm">
                      Oils, solvents, and some building materials attack insulation. Check
                      cable compatibility with environment. LSF cables resist many chemicals
                      better than standard PVC.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-elec-yellow font-medium">Mechanical Damage</h4>
                    <p className="text-sm">
                      Physical damage from installation or subsequent works compromises
                      insulation. Even minor nicks or abrasions concentrate electrical stress
                      and admit moisture, accelerating degradation.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-elec-yellow font-medium">Rodent Damage</h4>
                    <p className="text-sm">
                      Rodents gnaw cable sheaths and insulation. Steel wire armoured cables
                      or conduit provide protection in vulnerable areas. Regular inspection
                      reveals damage before failure.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-5 border border-white/10">
                <h3 className="text-white font-medium mb-4">Insulation Resistance Testing</h3>
                <p className="mb-4">
                  Insulation resistance measurement quantifies degradation and predicts remaining
                  life. BS 7671 specifies minimum values, but trending over time provides more
                  valuable information than single readings:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-2 text-white">Circuit Voltage</th>
                        <th className="text-left py-2 text-white">Test Voltage</th>
                        <th className="text-left py-2 text-white">Minimum IR</th>
                        <th className="text-left py-2 text-white">Preferred IR</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-white/5">
                        <td className="py-2">SELV/PELV</td>
                        <td className="py-2">250V DC</td>
                        <td className="py-2">0.5 MΩ</td>
                        <td className="py-2">&gt;2 MΩ</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2">Up to 500V (inc 230V)</td>
                        <td className="py-2">500V DC</td>
                        <td className="py-2">1.0 MΩ</td>
                        <td className="py-2">&gt;2 MΩ</td>
                      </tr>
                      <tr>
                        <td className="py-2">Above 500V</td>
                        <td className="py-2">1000V DC</td>
                        <td className="py-2">1.0 MΩ</td>
                        <td className="py-2">&gt;2 MΩ</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm mt-4 text-white/60">
                  Note: Temperature significantly affects readings. Cool, damp conditions produce
                  lower readings than warm, dry conditions. Apply temperature correction factors
                  for accurate comparison between tests performed in different conditions.
                </p>
              </div>
            </div>

            {/* Quick Check 2 */}
            <div className="mt-8">
              <InlineCheck
                question={quickCheckQuestions[1].question}
                options={quickCheckQuestions[1].options}
                correctIndex={quickCheckQuestions[1].correctIndex}
                explanation={quickCheckQuestions[1].explanation}
              />
            </div>
          </section>

          {/* Section 03 - Thermal Imaging and Detection */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-elec-yellow/30">03</span>
              <h2 className="text-xl font-semibold text-white">Thermal Imaging and Detection Methods</h2>
            </div>

            <div className="space-y-6 text-white/80">
              <p>
                Thermal imaging (infrared thermography) has revolutionised electrical fault detection.
                It allows non-contact, non-invasive identification of hot spots that indicate developing
                faults before they cause failures or fires. Understanding proper technique and
                interpretation is essential for effective use.
              </p>

              <div className="bg-white/5 rounded-lg p-5 border border-white/10">
                <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-elec-yellow" />
                  Thermal Imaging Fundamentals
                </h3>
                <p className="mb-4">
                  Infrared cameras detect radiation emitted by objects above absolute zero. The
                  Stefan-Boltzmann law relates emitted radiation to temperature. Cameras convert
                  this radiation into visible images with temperature data. Key parameters include:
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="bg-white/5 rounded p-4">
                    <h4 className="text-white font-medium mb-2">Emissivity</h4>
                    <p className="text-sm mb-2">
                      How efficiently a surface emits infrared radiation compared to a perfect
                      blackbody. Most painted and oxidised electrical components have emissivity
                      of 0.9-0.95. Shiny metal surfaces may be as low as 0.1-0.3.
                    </p>
                    <ul className="text-sm space-y-1">
                      <li>- Oxidised copper: 0.78</li>
                      <li>- Polished copper: 0.03</li>
                      <li>- Painted surfaces: 0.90-0.95</li>
                      <li>- Plastic enclosures: 0.85-0.95</li>
                    </ul>
                  </div>
                  <div className="bg-white/5 rounded p-4">
                    <h4 className="text-white font-medium mb-2">Temperature Differential (ΔT)</h4>
                    <p className="text-sm mb-2">
                      More reliable than absolute temperature for identifying faults. Compare
                      similar components under similar load conditions. IET Guidance Note 3
                      severity classifications:
                    </p>
                    <ul className="text-sm space-y-1">
                      <li>- 1-10°C: Monitor - schedule investigation</li>
                      <li>- 10-20°C: Investigate - repair at next opportunity</li>
                      <li>- 20-40°C: Urgent - repair as soon as practical</li>
                      <li>- &gt;40°C: Critical - consider immediate isolation</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-5 border border-white/10">
                <h3 className="text-white font-medium mb-4">Conducting Thermal Surveys</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-elec-yellow font-medium mb-2">Pre-Survey Requirements</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-elec-yellow">1.</span>
                        <span>Ensure circuits are under representative load - minimum 40% of rated capacity, ideally normal operating load</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-elec-yellow">2.</span>
                        <span>Allow thermal equilibrium - circuits should be energised for at least 30-60 minutes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-elec-yellow">3.</span>
                        <span>Record ambient temperature and environmental conditions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-elec-yellow">4.</span>
                        <span>Arrange access to all distribution equipment with covers removed or inspection windows open</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-elec-yellow font-medium mb-2">Survey Technique</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-elec-yellow">-</span>
                        <span>Scan all connections systematically - incoming supply, busbars, outgoing circuits</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-elec-yellow">-</span>
                        <span>Compare similar components - three phases of same circuit, adjacent MCBs on same busbar</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-elec-yellow">-</span>
                        <span>Document hot spots with photographs and thermal images together for location reference</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-elec-yellow">-</span>
                        <span>Record load current at time of survey for correlation with temperature data</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-5 border border-white/10">
                <h3 className="text-white font-medium mb-4">Other Detection Methods</h3>
                <div className="grid gap-4">
                  <div className="bg-white/5 rounded p-4">
                    <h4 className="text-white font-medium mb-2">Visual Inspection</h4>
                    <p className="text-sm mb-2">Often reveals thermal damage that has occurred:</p>
                    <ul className="text-sm space-y-1">
                      <li>- Discoloured or blackened conductors and terminals</li>
                      <li>- Melted, deformed, or charred insulation</li>
                      <li>- Heat marks on enclosure surfaces</li>
                      <li>- Crystallised flux deposits at solder joints</li>
                      <li>- Distorted or loose terminals</li>
                    </ul>
                  </div>
                  <div className="bg-white/5 rounded p-4">
                    <h4 className="text-white font-medium mb-2">Smell Detection</h4>
                    <p className="text-sm mb-2">Overheating produces characteristic odours:</p>
                    <ul className="text-sm space-y-1">
                      <li>- Burning plastic: PVC or thermoplastic degradation</li>
                      <li>- Sweet chemical smell: Overheated varnish or resin</li>
                      <li>- Ozone: Electrical discharge or arcing</li>
                      <li>- Burning wood: Carbonised materials in enclosures</li>
                    </ul>
                  </div>
                  <div className="bg-white/5 rounded p-4">
                    <h4 className="text-white font-medium mb-2">Contact Temperature Measurement</h4>
                    <p className="text-sm">
                      Infrared spot thermometers or contact thermocouples verify thermal camera
                      readings or measure where camera access is limited. Always consider emissivity
                      settings and ensure good thermal contact for contact measurements. Record
                      measurement location and method for future comparison.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-5">
                <h3 className="text-amber-300 font-medium mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Safety Considerations for Thermal Surveys
                </h3>
                <ul className="space-y-2 text-sm text-white/80">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">-</span>
                    <span>Thermal imaging of live equipment requires appropriate training and authorisation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">-</span>
                    <span>Maintain safe working distances - use zoom capabilities rather than approaching closer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">-</span>
                    <span>Never touch connections or components until isolated and proved dead</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">-</span>
                    <span>Hot connections may fail during survey - be prepared for arc flash</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">-</span>
                    <span>Wear appropriate PPE when opening switchgear enclosures</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Quick Check 3 */}
            <div className="mt-8">
              <InlineCheck
                question={quickCheckQuestions[2].question}
                options={quickCheckQuestions[2].options}
                correctIndex={quickCheckQuestions[2].correctIndex}
                explanation={quickCheckQuestions[2].explanation}
              />
            </div>
          </section>

          {/* Section 04 - Remediation and Prevention */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-elec-yellow/30">04</span>
              <h2 className="text-xl font-semibold text-white">Remediation and Prevention Strategies</h2>
            </div>

            <div className="space-y-6 text-white/80">
              <p>
                Effective remediation addresses both the immediate fault and underlying causes.
                Prevention strategies embedded in installation practice and maintenance procedures
                reduce future overheating risks. The goal is eliminating thermal hazards whilst
                maintaining system reliability.
              </p>

              <div className="bg-white/5 rounded-lg p-5 border border-white/10">
                <h3 className="text-white font-medium mb-4">Addressing Loose Connections</h3>
                <p className="mb-4">
                  When loose connections are identified, proper remediation requires more than
                  simply retightening. Damaged conductors and terminals often require replacement:
                </p>
                <div className="space-y-4">
                  <div className="bg-white/5 rounded p-4">
                    <h4 className="text-elec-yellow font-medium mb-2">Assessment Protocol</h4>
                    <ol className="space-y-2 text-sm list-decimal list-inside">
                      <li>Isolate and lock off the circuit - verify dead</li>
                      <li>Allow components to cool before handling</li>
                      <li>Disconnect and examine the conductor - check for annealing (softening from heat)</li>
                      <li>Examine the terminal - check for damage, oxidation, or material transfer</li>
                      <li>Assess insulation condition - flexibility, colour, integrity</li>
                      <li>Check enclosure for heat damage - melting, distortion, carbonisation</li>
                    </ol>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="bg-green-500/10 border border-green-500/30 rounded p-4">
                      <h4 className="text-green-300 font-medium mb-2">Can Be Remediated</h4>
                      <ul className="text-sm space-y-1">
                        <li>- Slight oxidation on sound conductor</li>
                        <li>- Terminal in good condition</li>
                        <li>- Insulation flexible and intact</li>
                        <li>- No enclosure damage</li>
                      </ul>
                      <p className="text-sm mt-2 text-green-200">
                        Clean conductor, apply joint compound if aluminium,
                        retighten to correct torque, and verify.
                      </p>
                    </div>
                    <div className="bg-red-500/10 border border-red-500/30 rounded p-4">
                      <h4 className="text-red-300 font-medium mb-2">Requires Replacement</h4>
                      <ul className="text-sm space-y-1">
                        <li>- Conductor annealed or brittle</li>
                        <li>- Terminal damaged or pitted</li>
                        <li>- Insulation hardened or cracked</li>
                        <li>- Evidence of arcing or carbonisation</li>
                      </ul>
                      <p className="text-sm mt-2 text-red-200">
                        Cut back cable to sound material, replace
                        terminal/device as required.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-5 border border-white/10">
                <h3 className="text-white font-medium mb-4">Addressing Overloading</h3>
                <p className="mb-4">
                  When overloading causes thermal damage, simply replacing the cable does not
                  address the underlying issue. Investigation must determine why loading exceeds
                  design capacity:
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <span className="text-elec-yellow font-bold">1.</span>
                    <div>
                      <span className="text-white font-medium">Measure actual load current</span>
                      <p className="text-white/60">Use clamp meter over representative period - single reading may not capture peak demand</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-elec-yellow font-bold">2.</span>
                    <div>
                      <span className="text-white font-medium">Verify cable selection was correct</span>
                      <p className="text-white/60">Check original design against BS 7671 requirements for route, grouping, ambient</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-elec-yellow font-bold">3.</span>
                    <div>
                      <span className="text-white font-medium">Identify load changes since installation</span>
                      <p className="text-white/60">Additional equipment or higher-rated replacements may have exceeded original capacity</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-elec-yellow font-bold">4.</span>
                    <div>
                      <span className="text-white font-medium">Propose appropriate solution</span>
                      <p className="text-white/60">Redistribute loads, upgrade cable, add circuits, or reduce connected load</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-5 border border-white/10">
                <h3 className="text-white font-medium mb-4">Insulation Failure Remediation</h3>
                <p className="mb-4">
                  When insulation resistance falls below acceptable limits or physical degradation
                  is evident, cable replacement is typically required. However, the extent of
                  replacement depends on the failure pattern:
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="bg-white/5 rounded p-4">
                    <h4 className="text-white font-medium mb-2">Localised Degradation</h4>
                    <ul className="text-sm space-y-1">
                      <li>- Damage at specific point (termination, bend)</li>
                      <li>- Rest of cable tests satisfactorily</li>
                      <li>- May be able to cut back and re-terminate</li>
                      <li>- Or replace only the damaged section</li>
                    </ul>
                  </div>
                  <div className="bg-white/5 rounded p-4">
                    <h4 className="text-white font-medium mb-2">General Degradation</h4>
                    <ul className="text-sm space-y-1">
                      <li>- Low IR throughout cable length</li>
                      <li>- Age-related deterioration</li>
                      <li>- Environmental exposure damage</li>
                      <li>- Complete cable replacement required</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-5 border border-white/10">
                <h3 className="text-white font-medium mb-4">Prevention Through Good Practice</h3>
                <div className="grid gap-4">
                  <div>
                    <h4 className="text-elec-yellow font-medium mb-2">Installation Best Practices</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-elec-yellow">-</span>
                        <span>Use correct torque settings for all terminations - under or over-tightening both cause problems</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-elec-yellow">-</span>
                        <span>Apply appropriate cable selection factors for installation method, grouping, and ambient</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-elec-yellow">-</span>
                        <span>Use correct cable types for environment - UV resistant, oil resistant, LSF as required</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-elec-yellow">-</span>
                        <span>Avoid damage during installation - suitable bending radii, no insulation nicks</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-elec-yellow">-</span>
                        <span>Provide adequate ventilation for equipment generating heat</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-elec-yellow font-medium mb-2">Maintenance Recommendations</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-elec-yellow">-</span>
                        <span>Schedule periodic thermal surveys for critical installations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-elec-yellow">-</span>
                        <span>Trend insulation resistance measurements to identify deterioration</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-elec-yellow">-</span>
                        <span>Retorque connections after initial settling period (typically 6-12 months)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-elec-yellow">-</span>
                        <span>Respond promptly to reports of burning smells or warm equipment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-elec-yellow">-</span>
                        <span>Document all thermal faults for pattern analysis across installations</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-5">
                <h3 className="text-blue-300 font-medium mb-3">BS 7671 Requirements</h3>
                <p className="text-sm text-white/80 mb-3">
                  The Wiring Regulations address thermal protection through several chapters:
                </p>
                <ul className="space-y-2 text-sm text-white/80">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">-</span>
                    <span><strong>Chapter 42:</strong> Protection against thermal effects - fire, burns, overheating</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">-</span>
                    <span><strong>Chapter 43:</strong> Protection against overcurrent - correct device selection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">-</span>
                    <span><strong>Chapter 52:</strong> Selection and erection of wiring systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">-</span>
                    <span><strong>Appendix 4:</strong> Current-carrying capacities and voltage drop tables</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Quick Check 4 */}
            <div className="mt-8">
              <InlineCheck
                question={quickCheckQuestions[3].question}
                options={quickCheckQuestions[3].options}
                correctIndex={quickCheckQuestions[3].correctIndex}
                explanation={quickCheckQuestions[3].explanation}
              />
            </div>
          </section>

          {/* Practical Guidance Section */}
          <section className="bg-gradient-to-r from-elec-yellow/10 to-transparent rounded-xl p-6 border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Flame className="w-5 h-5 text-elec-yellow" />
              Practical Guidance: Thermal Fault Investigation
            </h2>

            <div className="space-y-6 text-white/80">
              <div>
                <h3 className="text-white font-medium mb-3">Scenario: Consumer Unit Running Warm</h3>
                <p className="text-sm mb-4">
                  A customer reports their consumer unit enclosure feels warm to touch. They notice
                  this is more pronounced in the evening when cooking and using the shower.
                </p>

                <div className="space-y-4">
                  <div className="bg-white/5 rounded p-4">
                    <h4 className="text-elec-yellow font-medium mb-2">Step 1: Initial Assessment</h4>
                    <ul className="text-sm space-y-1">
                      <li>- Confirm customer description - when, how warm, any smells</li>
                      <li>- Check if protective devices have tripped recently</li>
                      <li>- Visual inspection of consumer unit exterior - any discolouration</li>
                      <li>- Use non-contact thermometer to measure enclosure temperature</li>
                      <li>- Record ambient temperature for reference</li>
                    </ul>
                  </div>

                  <div className="bg-white/5 rounded p-4">
                    <h4 className="text-elec-yellow font-medium mb-2">Step 2: Load Investigation</h4>
                    <ul className="text-sm space-y-1">
                      <li>- Use clamp meter on main tails and heavily loaded circuits</li>
                      <li>- Identify which circuits carry highest current during peak use</li>
                      <li>- Compare measured currents with circuit ratings and cable sizes</li>
                      <li>- Check for circuits operating close to or above design capacity</li>
                    </ul>
                  </div>

                  <div className="bg-white/5 rounded p-4">
                    <h4 className="text-elec-yellow font-medium mb-2">Step 3: Internal Examination</h4>
                    <ul className="text-sm space-y-1">
                      <li>- Isolate main switch and verify dead before opening</li>
                      <li>- If thermal camera available, image internal components first</li>
                      <li>- Visual inspection - look for discolouration, melting, or damage</li>
                      <li>- Check neutral bar connections carefully - often overlooked</li>
                      <li>- Examine main switch terminals and meter tails connections</li>
                    </ul>
                  </div>

                  <div className="bg-white/5 rounded p-4">
                    <h4 className="text-elec-yellow font-medium mb-2">Step 4: Remediation</h4>
                    <ul className="text-sm space-y-1">
                      <li>- If loose connections found: assess conductor condition, retorque or replace</li>
                      <li>- If overloading confirmed: discuss load redistribution or additional circuits</li>
                      <li>- If component damage: replace affected MCBs, busbars, or neutral bar</li>
                      <li>- Document findings and actions in report for customer</li>
                      <li>- Recommend periodic thermal survey if installation at capacity</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="text-white font-medium mb-2">Key Investigation Points</h4>
                <div className="grid gap-4 md:grid-cols-3 text-sm">
                  <div>
                    <span className="text-elec-yellow font-medium">Cooking Circuit</span>
                    <p className="text-white/60">Hob and oven connections - high current, often problematic</p>
                  </div>
                  <div>
                    <span className="text-elec-yellow font-medium">Shower Circuit</span>
                    <p className="text-white/60">High current flow - check cable size matches shower rating</p>
                  </div>
                  <div>
                    <span className="text-elec-yellow font-medium">Neutral Bar</span>
                    <p className="text-white/60">All return currents pass through - often overlooked connection point</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs Section */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white/5 rounded-lg border border-white/10 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
                  >
                    <span className="text-white font-medium pr-4">{faq.question}</span>
                    {openFAQ === index ? (
                      <ChevronUp className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-white/50 flex-shrink-0" />
                    )}
                  </button>
                  {openFAQ === index && (
                    <div className="px-4 pb-4 text-white/70 text-sm">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Quick Reference Section */}
          <section className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-6">Quick Reference: Thermal Fault Diagnosis</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-elec-yellow font-medium mb-3">Temperature Differential Severity Guide</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-2 text-white">ΔT Range</th>
                        <th className="text-left py-2 text-white">Severity</th>
                        <th className="text-left py-2 text-white">Action Required</th>
                      </tr>
                    </thead>
                    <tbody className="text-white/70">
                      <tr className="border-b border-white/5">
                        <td className="py-2">1-10°C</td>
                        <td className="py-2 text-green-400">Low</td>
                        <td className="py-2">Monitor - note for next survey</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2">10-20°C</td>
                        <td className="py-2 text-yellow-400">Moderate</td>
                        <td className="py-2">Investigate and repair at next opportunity</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2">20-40°C</td>
                        <td className="py-2 text-orange-400">High</td>
                        <td className="py-2">Urgent repair - schedule within days</td>
                      </tr>
                      <tr>
                        <td className="py-2">&gt;40°C</td>
                        <td className="py-2 text-red-400">Critical</td>
                        <td className="py-2">Immediate isolation and repair</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-elec-yellow font-medium mb-3">Common Overheating Locations</h3>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="bg-white/5 rounded p-3">
                    <span className="text-white font-medium">Consumer Unit:</span>
                    <p className="text-sm text-white/60">Main switch connections, neutral bar, busbar joints, MCB terminals</p>
                  </div>
                  <div className="bg-white/5 rounded p-3">
                    <span className="text-white font-medium">Socket Outlets:</span>
                    <p className="text-sm text-white/60">Terminal screws, ring final connections, spur fused connection units</p>
                  </div>
                  <div className="bg-white/5 rounded p-3">
                    <span className="text-white font-medium">Lighting:</span>
                    <p className="text-sm text-white/60">Ceiling rose terminals, switch terminals, loop-in connections</p>
                  </div>
                  <div className="bg-white/5 rounded p-3">
                    <span className="text-white font-medium">Fixed Equipment:</span>
                    <p className="text-sm text-white/60">Isolator switches, connection units, cooker connections</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-elec-yellow font-medium mb-3">Insulation Resistance Interpretation</h3>
                <div className="grid gap-3 md:grid-cols-3">
                  <div className="bg-green-500/10 border border-green-500/30 rounded p-3 text-center">
                    <span className="text-green-400 font-bold text-lg">&gt;200 MΩ</span>
                    <p className="text-sm text-white/60 mt-1">Excellent - new installation</p>
                  </div>
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-3 text-center">
                    <span className="text-yellow-400 font-bold text-lg">2-200 MΩ</span>
                    <p className="text-sm text-white/60 mt-1">Good - normal aging</p>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/30 rounded p-3 text-center">
                    <span className="text-red-400 font-bold text-lg">&lt;2 MΩ</span>
                    <p className="text-sm text-white/60 mt-1">Investigate - approaching limits</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Quiz Section */}
          <section>
            <Quiz
              title="Test Your Understanding"
              questions={quizQuestions}
              passingScore={75}
            />
          </section>

          {/* Navigation */}
          <nav className="flex flex-col sm:flex-row justify-between gap-4 pt-8 border-t border-white/10">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" asChild>
              <Link to="../section3-5">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Appliance and Equipment Faults
              </Link>
            </Button>
            <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90" asChild>
              <Link to="../section4">
                Next: Section 4 - Fault Correction
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Level3Module4Section3_6;
