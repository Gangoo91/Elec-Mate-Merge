import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Maintenance, Testing and Fault Diagnosis - HNC Module 3 Section 5.8";
const DESCRIPTION = "Comprehensive coverage of electrical machine maintenance, testing procedures and fault diagnosis techniques for building services including insulation resistance testing, vibration analysis and thermographic inspection.";

const quickCheckQuestions = [
  {
    id: "insulation-minimum",
    question: "What is the minimum acceptable insulation resistance for a motor winding tested at 500V DC?",
    options: ["0.5 MΩ", "1 MΩ", "5 MΩ", "10 MΩ"],
    correctIndex: 1,
    explanation: "The minimum acceptable insulation resistance is 1 MΩ when tested at 500V DC. Values below this indicate degraded insulation requiring investigation. BS 7671 specifies this as the minimum for circuits up to 500V."
  },
  {
    id: "vibration-bearing",
    question: "Which vibration frequency pattern typically indicates bearing wear in a motor?",
    options: ["1× running speed", "2× running speed", "High-frequency random pattern", "50Hz electrical frequency"],
    correctIndex: 2,
    explanation: "Bearing defects produce characteristic high-frequency vibration patterns often with random components. Inner and outer race defects have specific frequency signatures based on bearing geometry and shaft speed."
  },
  {
    id: "thermography-hotspot",
    question: "During thermographic inspection, what temperature rise above ambient typically indicates a serious connection problem?",
    options: ["5°C", "10°C", "20°C", "40°C or more"],
    correctIndex: 3,
    explanation: "A temperature rise of 40°C or more above ambient typically indicates a serious problem requiring immediate attention. Rises of 10-25°C warrant monitoring and planned maintenance."
  },
  {
    id: "mcsa-purpose",
    question: "What does Motor Current Signature Analysis (MCSA) primarily detect?",
    options: ["Insulation breakdown", "Mechanical faults through current spectrum analysis", "Earth fault current", "Power factor"],
    correctIndex: 1,
    explanation: "MCSA detects mechanical faults (broken rotor bars, eccentricity, bearing defects) by analysing the frequency spectrum of the motor supply current. Mechanical issues create characteristic sidebands around the supply frequency."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "At what test voltage should insulation resistance testing be performed for a 400V three-phase motor?",
    options: [
      "250V DC",
      "500V DC",
      "1000V DC",
      "2500V DC"
    ],
    correctAnswer: 1,
    explanation: "For circuits rated up to 500V, insulation resistance testing should be performed at 500V DC. Higher test voltages (1000V or above) are used for HV equipment. The test voltage should not exceed the circuit's rated voltage by more than a factor of two."
  },
  {
    id: 2,
    question: "What does a Polarisation Index (PI) value of less than 1.5 indicate?",
    options: [
      "Excellent insulation condition",
      "Acceptable insulation condition",
      "Contaminated or moisture-affected insulation",
      "Normal operating temperature"
    ],
    correctAnswer: 2,
    explanation: "A PI value below 1.5 indicates contaminated or moisture-affected insulation. Good insulation typically has a PI of 2-4, while excellent insulation exceeds 4. PI is the ratio of the 10-minute to 1-minute insulation resistance readings."
  },
  {
    id: 3,
    question: "What is the primary purpose of winding resistance measurement?",
    options: [
      "To determine insulation quality",
      "To detect turn-to-turn faults and connection problems",
      "To measure motor efficiency",
      "To calculate power factor"
    ],
    correctAnswer: 1,
    explanation: "Winding resistance measurement detects turn-to-turn faults, open windings, and poor connections. An imbalance greater than 2% between phases in a three-phase motor indicates a potential problem requiring investigation."
  },
  {
    id: 4,
    question: "In vibration analysis, what does a dominant vibration at 2× line frequency (100Hz in the UK) typically indicate?",
    options: [
      "Mechanical imbalance",
      "Bearing wear",
      "Electrical problems such as broken rotor bars or air gap eccentricity",
      "Misalignment"
    ],
    correctAnswer: 2,
    explanation: "Vibration at 2× line frequency (100Hz) indicates electrical problems such as broken rotor bars, air gap eccentricity, or unbalanced magnetic pull. Mechanical imbalance typically shows at 1× running speed."
  },
  {
    id: 5,
    question: "What temperature classification would indicate immediate action is required during thermographic inspection?",
    options: [
      "Delta-T 1-10°C above ambient",
      "Delta-T 10-25°C above ambient",
      "Delta-T 25-40°C above ambient",
      "Delta-T greater than 40°C above ambient"
    ],
    correctAnswer: 3,
    explanation: "A temperature rise greater than 40°C above ambient is critical and requires immediate action. This indicates a serious fault such as a high-resistance connection, overloaded conductor, or failing component that could lead to fire or equipment failure."
  },
  {
    id: 6,
    question: "What bearing fault produces a characteristic 'BPFO' frequency in vibration analysis?",
    options: [
      "Inner race defect",
      "Outer race defect",
      "Rolling element defect",
      "Cage defect"
    ],
    correctAnswer: 1,
    explanation: "BPFO (Ball Pass Frequency Outer) is produced by outer race defects. BPFI indicates inner race defects. These frequencies are calculated from bearing geometry and shaft speed, enabling specific fault identification."
  },
  {
    id: 7,
    question: "According to BS EN 60034-1, what is the maximum allowable winding temperature rise for Class F insulation?",
    options: [
      "80°C",
      "105°C",
      "125°C",
      "155°C"
    ],
    correctAnswer: 2,
    explanation: "Class F insulation permits a maximum winding temperature rise of 105°C above a 40°C ambient, giving a maximum winding temperature of 145°C. However, many motors use Class F insulation with Class B temperature rise (80°C) for extended life."
  },
  {
    id: 8,
    question: "What is the recommended inspection interval for critical motor bearings in continuous operation?",
    options: [
      "Weekly",
      "Monthly",
      "Quarterly",
      "Annually"
    ],
    correctAnswer: 2,
    explanation: "Critical motor bearings in continuous operation should be inspected quarterly using vibration analysis or other predictive techniques. More frequent monitoring may be required based on operating conditions or if trending indicates deterioration."
  },
  {
    id: 9,
    question: "In MCSA, what do sidebands around the fundamental frequency at (1 ± 2s)f indicate?",
    options: [
      "Bearing defects",
      "Broken rotor bars",
      "Stator winding faults",
      "Supply voltage imbalance"
    ],
    correctAnswer: 1,
    explanation: "Sidebands at frequencies (1 ± 2s)f, where s is slip and f is supply frequency, indicate broken rotor bars. The number and severity of broken bars can be estimated from the amplitude of these sidebands relative to the fundamental."
  },
  {
    id: 10,
    question: "What is the primary purpose of a planned preventive maintenance (PPM) schedule for electrical machines?",
    options: [
      "To comply with warranty requirements only",
      "To prevent unexpected failures and extend equipment life",
      "To reduce energy consumption",
      "To satisfy insurance requirements only"
    ],
    correctAnswer: 1,
    explanation: "PPM schedules are designed to prevent unexpected failures, extend equipment life, and optimise maintenance costs. While they may help with warranty and insurance compliance, the primary purpose is reliability and lifecycle cost optimisation."
  }
];

const faqs = [
  {
    question: "How often should motor insulation resistance testing be performed?",
    answer: "Critical motors should have insulation resistance tested annually as a minimum, with quarterly testing recommended for high-value or critical applications. Trend analysis is essential - a steady decline in IR values over time is more concerning than a single low reading. Environmental factors such as humidity and contamination can cause temporary reductions."
  },
  {
    question: "What are the signs of impending bearing failure?",
    answer: "Early signs include increased vibration (particularly at bearing-specific frequencies), elevated temperature, changes in noise characteristics, and grease condition. Advanced bearing failure shows as excessive play, visible damage on inspection, metallic particles in lubricant, and potentially smoke or burning smell. Vibration monitoring can detect bearing defects months before failure."
  },
  {
    question: "When should thermographic inspection be performed?",
    answer: "Thermographic inspection should be performed during normal operating conditions with equipment under typical load. Annual inspections are common for distribution equipment, with more frequent surveys for critical systems. Inspections should also be performed following major maintenance or after any unusual operating events."
  },
  {
    question: "What is the difference between time-based and condition-based maintenance?",
    answer: "Time-based maintenance performs tasks at fixed intervals regardless of equipment condition (e.g., annual bearing replacement). Condition-based maintenance monitors equipment parameters and performs maintenance when indicators suggest it is needed. Condition-based approaches are generally more cost-effective and can prevent both unnecessary maintenance and unexpected failures."
  },
  {
    question: "How does voltage imbalance affect motor performance and diagnostics?",
    answer: "A 1% voltage imbalance can cause a 6-10% current imbalance, leading to increased heating and reduced motor life. When performing diagnostics, it is essential to measure supply voltage balance first - many apparent motor faults are actually supply problems. NEMA MG1 recommends derating motors operating with voltage imbalance exceeding 1%."
  },
  {
    question: "What maintenance records should be kept for electrical machines?",
    answer: "Essential records include: commissioning data and baseline measurements, all test results with dates and conditions, maintenance performed and parts replaced, operating hours and number of starts, fault history and repairs, and environmental conditions. These records enable trend analysis and inform maintenance decisions."
  }
];

const HNCModule3Section5_8 = () => {
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
            <span>Module 3.5.8</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Maintenance, Testing and Fault Diagnosis
          </h1>
          <p className="text-white/80">
            Preventive maintenance practices, diagnostic techniques and condition monitoring for electrical machines in building services
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Insulation testing:</strong> Minimum 1 MΩ at 500V DC</li>
              <li className="pl-1"><strong>Vibration analysis:</strong> Detects mechanical faults early</li>
              <li className="pl-1"><strong>Thermography:</strong> Identifies hot spots and connections</li>
              <li className="pl-1"><strong>MCSA:</strong> Detects rotor faults from current spectrum</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>HVAC motors:</strong> AHUs, chillers, pumps, fans</li>
              <li className="pl-1"><strong>Critical systems:</strong> Life safety, data centres</li>
              <li className="pl-1"><strong>PPM schedules:</strong> SFG20 and manufacturer guidance</li>
              <li className="pl-1"><strong>Condition monitoring:</strong> Predictive maintenance approach</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Perform and interpret insulation resistance tests on motors",
              "Apply vibration analysis techniques to diagnose mechanical faults",
              "Use thermographic inspection to identify electrical problems",
              "Understand motor current signature analysis principles",
              "Diagnose common bearing failure modes",
              "Develop preventive maintenance schedules for building services",
              "Apply condition-based monitoring strategies",
              "Document maintenance activities and trend equipment condition"
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

        {/* Section 1: Insulation Resistance Testing */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Insulation Resistance Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Insulation resistance (IR) testing is the primary method for assessing winding insulation condition.
              It measures the resistance between conductors and earth, and between windings, to detect degradation
              before catastrophic failure occurs.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Test Voltages and Minimum Values (BS 7671)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Circuit Voltage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Test Voltage (DC)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Minimum IR</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">SELV and PELV</td>
                      <td className="border border-white/10 px-3 py-2">250V</td>
                      <td className="border border-white/10 px-3 py-2">0.5 MΩ</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Up to 500V (including 400V motors)</td>
                      <td className="border border-white/10 px-3 py-2">500V</td>
                      <td className="border border-white/10 px-3 py-2">1 MΩ</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Above 500V</td>
                      <td className="border border-white/10 px-3 py-2">1000V</td>
                      <td className="border border-white/10 px-3 py-2">1 MΩ</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Polarisation Index (PI) Test</p>
              <p className="text-sm text-white mb-3">
                The PI test extends IR testing by comparing readings at 1 minute and 10 minutes. This ratio
                indicates the condition of insulation independent of temperature effects.
              </p>
              <p className="font-mono text-center text-lg mb-3">PI = IR<sub>10min</sub> / IR<sub>1min</sub></p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">PI Value</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Insulation Condition</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">&lt; 1.0</td>
                      <td className="border border-white/10 px-3 py-2">Dangerous</td>
                      <td className="border border-white/10 px-3 py-2">Do not energise - investigate immediately</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1.0 - 1.5</td>
                      <td className="border border-white/10 px-3 py-2">Poor (contaminated/wet)</td>
                      <td className="border border-white/10 px-3 py-2">Clean and dry, retest</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1.5 - 2.0</td>
                      <td className="border border-white/10 px-3 py-2">Questionable</td>
                      <td className="border border-white/10 px-3 py-2">Monitor trend, investigate if declining</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2.0 - 4.0</td>
                      <td className="border border-white/10 px-3 py-2">Good</td>
                      <td className="border border-white/10 px-3 py-2">Normal maintenance schedule</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">&gt; 4.0</td>
                      <td className="border border-white/10 px-3 py-2">Excellent</td>
                      <td className="border border-white/10 px-3 py-2">Continue monitoring</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">IR Testing Best Practice:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Disconnect motor from supply and discharge capacitance before testing</li>
                <li className="pl-1">Record ambient temperature - IR decreases by approximately 50% for each 10°C rise</li>
                <li className="pl-1">Test phase-to-earth and phase-to-phase on three-phase machines</li>
                <li className="pl-1">Discharge windings safely after test (high voltage stored)</li>
                <li className="pl-1">Compare results with previous readings - trend is more important than absolute value</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Rule of thumb:</strong> Minimum acceptable IR in MΩ = Rated voltage in kV + 1.
              For a 400V motor: 0.4 + 1 = 1.4 MΩ minimum recommended.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Winding Resistance Measurement */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Winding Resistance Measurement
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Winding resistance measurement detects faults within the copper conductors themselves, including
              turn-to-turn shorts, open windings, and poor connections that IR testing cannot identify.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">What It Detects</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Shorted turns (reduced resistance)</li>
                  <li className="pl-1">Open circuits (infinite resistance)</li>
                  <li className="pl-1">Poor connections (elevated resistance)</li>
                  <li className="pl-1">Phase imbalance in three-phase motors</li>
                  <li className="pl-1">Winding damage from overheating</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Test Equipment</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Low-resistance ohmmeter (micro-ohmmeter)</li>
                  <li className="pl-1">Kelvin (four-wire) measurement method</li>
                  <li className="pl-1">Stable DC current source</li>
                  <li className="pl-1">Temperature compensation capability</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Acceptance Criteria</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Three-phase balance:</strong> Maximum 2% variation between phases</li>
                <li className="pl-1"><strong>Comparison with baseline:</strong> Maximum 5% deviation from commissioning values</li>
                <li className="pl-1"><strong>Temperature correction:</strong> Standardise to 20°C or 25°C reference</li>
              </ul>
              <p className="text-sm text-white/70 mt-3">
                Temperature correction formula: R<sub>2</sub> = R<sub>1</sub> × (234.5 + T<sub>2</sub>) / (234.5 + T<sub>1</sub>) for copper
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-300 mb-2">Important Consideration</p>
              <p className="text-sm text-white">
                Winding resistance values are typically very low (milliohms to a few ohms). Standard digital
                multimeters lack the precision required - always use a dedicated low-resistance ohmmeter with
                four-wire (Kelvin) connections to eliminate lead resistance errors.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Vibration Analysis */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Vibration Analysis
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Vibration analysis is the most powerful predictive maintenance technique for rotating machinery.
              By analysing the frequency spectrum of machine vibration, specific mechanical and electrical
              faults can be identified long before failure occurs.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Fault Frequencies</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Fault Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Characteristic Frequency</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Mechanical imbalance</td>
                      <td className="border border-white/10 px-3 py-2">1× shaft speed</td>
                      <td className="border border-white/10 px-3 py-2">Dominant radial vibration</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Misalignment (angular)</td>
                      <td className="border border-white/10 px-3 py-2">1× and 2× shaft speed</td>
                      <td className="border border-white/10 px-3 py-2">High axial vibration</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Misalignment (parallel)</td>
                      <td className="border border-white/10 px-3 py-2">2× shaft speed</td>
                      <td className="border border-white/10 px-3 py-2">Radial at 2× running speed</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Looseness</td>
                      <td className="border border-white/10 px-3 py-2">Harmonics: 1×, 2×, 3×...</td>
                      <td className="border border-white/10 px-3 py-2">Multiple harmonics present</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Bearing defects</td>
                      <td className="border border-white/10 px-3 py-2">BPFO, BPFI, BSF, FTF</td>
                      <td className="border border-white/10 px-3 py-2">Bearing-specific frequencies</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Electrical (2× line freq)</td>
                      <td className="border border-white/10 px-3 py-2">100Hz (UK)</td>
                      <td className="border border-white/10 px-3 py-2">Rotor bars, eccentricity</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Bearing Defect Frequencies</p>
              <div className="grid grid-cols-2 gap-3 text-center text-sm">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-elec-yellow mb-1">BPFO</p>
                  <p className="text-white/70 text-xs">Ball Pass Frequency Outer Race</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-elec-yellow mb-1">BPFI</p>
                  <p className="text-white/70 text-xs">Ball Pass Frequency Inner Race</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-elec-yellow mb-1">BSF</p>
                  <p className="text-white/70 text-xs">Ball Spin Frequency</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-elec-yellow mb-1">FTF</p>
                  <p className="text-white/70 text-xs">Fundamental Train Frequency (Cage)</p>
                </div>
              </div>
              <p className="text-xs text-white/60 mt-2">
                These frequencies are calculated from bearing geometry - number of rolling elements, contact angle, and bearing dimensions.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">ISO 10816 Vibration Severity (mm/s RMS)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Class</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Good</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Satisfactory</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Unsatisfactory</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Unacceptable</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Small machines (&lt;15kW)</td>
                      <td className="border border-white/10 px-3 py-2">&lt;0.71</td>
                      <td className="border border-white/10 px-3 py-2">0.71-1.8</td>
                      <td className="border border-white/10 px-3 py-2">1.8-4.5</td>
                      <td className="border border-white/10 px-3 py-2">&gt;4.5</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Medium (15-75kW)</td>
                      <td className="border border-white/10 px-3 py-2">&lt;1.12</td>
                      <td className="border border-white/10 px-3 py-2">1.12-2.8</td>
                      <td className="border border-white/10 px-3 py-2">2.8-7.1</td>
                      <td className="border border-white/10 px-3 py-2">&gt;7.1</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Large rigid (&gt;75kW)</td>
                      <td className="border border-white/10 px-3 py-2">&lt;1.8</td>
                      <td className="border border-white/10 px-3 py-2">1.8-4.5</td>
                      <td className="border border-white/10 px-3 py-2">4.5-11.2</td>
                      <td className="border border-white/10 px-3 py-2">&gt;11.2</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Trending is key:</strong> A doubling of vibration amplitude indicates a significant change
              requiring investigation, even if absolute levels remain within acceptable limits.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Thermographic Inspection */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Thermographic Inspection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Infrared thermography detects abnormal heating patterns in electrical equipment before visible
              damage occurs. It is particularly effective for identifying high-resistance connections,
              overloaded conductors, and failing components.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Temperature Rise Classification (Delta-T)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Temperature Rise</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Priority</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Action Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1-10°C above ambient</td>
                      <td className="border border-white/10 px-3 py-2">Low</td>
                      <td className="border border-white/10 px-3 py-2">Monitor and repair at next maintenance</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">10-25°C above ambient</td>
                      <td className="border border-white/10 px-3 py-2">Medium</td>
                      <td className="border border-white/10 px-3 py-2">Schedule repair as soon as practical</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">25-40°C above ambient</td>
                      <td className="border border-white/10 px-3 py-2">High</td>
                      <td className="border border-white/10 px-3 py-2">Repair within days, increase monitoring</td>
                    </tr>
                    <tr className="bg-red-500/10">
                      <td className="border border-white/10 px-3 py-2">&gt;40°C above ambient</td>
                      <td className="border border-white/10 px-3 py-2">Critical</td>
                      <td className="border border-white/10 px-3 py-2">Immediate action required</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Findings - Motors</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Hot bearings indicating lubrication or wear issues</li>
                  <li className="pl-1">Uneven winding temperatures suggesting phase imbalance</li>
                  <li className="pl-1">Hot terminal connections</li>
                  <li className="pl-1">Cooling system blockages (hot spots on frame)</li>
                  <li className="pl-1">VSD heat sink issues</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Findings - Distribution</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Loose busbar connections</li>
                  <li className="pl-1">Overloaded cables and circuit breakers</li>
                  <li className="pl-1">Failing fuses (one phase hot)</li>
                  <li className="pl-1">Unbalanced three-phase loads</li>
                  <li className="pl-1">Harmonic heating in neutrals</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Thermographic Inspection Best Practice:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Inspect under normal operating load (minimum 40% of rated load)</li>
                <li className="pl-1">Allow equipment to reach thermal equilibrium before inspection</li>
                <li className="pl-1">Use consistent emissivity settings for comparable surfaces</li>
                <li className="pl-1">Compare similar equipment phases to identify anomalies</li>
                <li className="pl-1">Document with both thermal and visual images</li>
                <li className="pl-1">Account for ambient conditions and reflected temperatures</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 5: Motor Current Signature Analysis */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Motor Current Signature Analysis (MCSA)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              MCSA is a non-invasive technique that analyses the frequency spectrum of motor supply current
              to detect mechanical and electrical faults. It can identify problems while the motor is running
              under normal operating conditions.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Principle of Operation</p>
              <p className="text-sm text-white mb-3">
                Mechanical faults in a motor create characteristic load variations that modulate the supply current.
                By performing FFT (Fast Fourier Transform) analysis on the current waveform, specific fault
                frequencies can be identified as sidebands around the fundamental supply frequency.
              </p>
              <p className="text-sm text-white/70">
                For example, broken rotor bars create sidebands at frequencies: f<sub>brb</sub> = f × (1 ± 2s)
                where f is supply frequency and s is slip.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Detectable Faults</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Fault</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Frequency Signature</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical dB Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Broken rotor bars</td>
                      <td className="border border-white/10 px-3 py-2">f × (1 ± 2s)</td>
                      <td className="border border-white/10 px-3 py-2">&gt;-50dB indicates fault</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Air gap eccentricity</td>
                      <td className="border border-white/10 px-3 py-2">f × (1 ± (1-s)/p)</td>
                      <td className="border border-white/10 px-3 py-2">Varies with severity</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Bearing defects</td>
                      <td className="border border-white/10 px-3 py-2">Bearing frequencies modulated on f</td>
                      <td className="border border-white/10 px-3 py-2">Early detection possible</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Load oscillations</td>
                      <td className="border border-white/10 px-3 py-2">f ± mechanical frequency</td>
                      <td className="border border-white/10 px-3 py-2">Coupling/alignment issues</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Advantages of MCSA</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Non-invasive - no physical access to motor required</li>
                  <li className="pl-1">Testing during normal operation</li>
                  <li className="pl-1">Detects both electrical and mechanical faults</li>
                  <li className="pl-1">Can be performed remotely via MCC</li>
                  <li className="pl-1">Relatively low equipment cost</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Limitations</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Requires motor to be running under load</li>
                  <li className="pl-1">VSD operation complicates analysis</li>
                  <li className="pl-1">Specialist interpretation required</li>
                  <li className="pl-1">Some fault types not easily detected</li>
                  <li className="pl-1">Baseline comparison essential</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Section 6: Bearing Failure Diagnosis */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Bearing Failure Diagnosis
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Bearings are the most common failure point in rotating machinery. Understanding failure modes
              and their diagnostic signatures enables proactive maintenance before catastrophic failure.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Bearing Failure Stages</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Stage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Detection Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Symptoms</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Time to Failure</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1 - Sub-surface</td>
                      <td className="border border-white/10 px-3 py-2">Ultrasonic, HF vibration</td>
                      <td className="border border-white/10 px-3 py-2">Microscopic fatigue</td>
                      <td className="border border-white/10 px-3 py-2">Months</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2 - Surface damage</td>
                      <td className="border border-white/10 px-3 py-2">Vibration (bearing frequencies)</td>
                      <td className="border border-white/10 px-3 py-2">Spalling, pitting</td>
                      <td className="border border-white/10 px-3 py-2">Weeks to months</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3 - Advanced damage</td>
                      <td className="border border-white/10 px-3 py-2">Vibration, temperature, noise</td>
                      <td className="border border-white/10 px-3 py-2">Large spalls, wear</td>
                      <td className="border border-white/10 px-3 py-2">Days to weeks</td>
                    </tr>
                    <tr className="bg-red-500/10">
                      <td className="border border-white/10 px-3 py-2">4 - Failure imminent</td>
                      <td className="border border-white/10 px-3 py-2">All methods, audible noise</td>
                      <td className="border border-white/10 px-3 py-2">Excessive clearance, heat</td>
                      <td className="border border-white/10 px-3 py-2">Hours to days</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Bearing Failure Causes</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-1">Lubrication Issues (36%)</p>
                  <ul className="text-xs text-white/80 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Insufficient or excessive grease</li>
                    <li className="pl-1">Wrong lubricant type</li>
                    <li className="pl-1">Contamination</li>
                    <li className="pl-1">Lubricant degradation</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">Contamination (14%)</p>
                  <ul className="text-xs text-white/80 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Moisture ingress</li>
                    <li className="pl-1">Dirt and debris</li>
                    <li className="pl-1">Seal failure</li>
                    <li className="pl-1">Process contamination</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">Misalignment (16%)</p>
                  <ul className="text-xs text-white/80 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Shaft misalignment</li>
                    <li className="pl-1">Bearing housing issues</li>
                    <li className="pl-1">Thermal growth</li>
                    <li className="pl-1">Foundation settlement</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">Electrical Damage (10%)</p>
                  <ul className="text-xs text-white/80 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">VSD-induced shaft currents</li>
                    <li className="pl-1">Fluting (EDM damage)</li>
                    <li className="pl-1">Frosting patterns</li>
                    <li className="pl-1">Requires shaft grounding or insulated bearings</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>VSD bearing damage:</strong> High dV/dt switching creates common-mode voltage that can
              discharge through bearings. Mitigation includes shaft grounding brushes, insulated bearings,
              or common-mode filters.
            </p>
          </div>
        </section>

        {/* Section 7: Preventive Maintenance Schedules */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Preventive Maintenance Schedules
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective maintenance combines time-based preventive maintenance with condition-based monitoring.
              Industry standards such as SFG20 provide guidance for building services maintenance scheduling.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Motor Maintenance Schedule</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Interval</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Task</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Method</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Daily/Weekly</td>
                      <td className="border border-white/10 px-3 py-2">Visual inspection, listen for abnormal noise</td>
                      <td className="border border-white/10 px-3 py-2">Operator rounds</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Monthly</td>
                      <td className="border border-white/10 px-3 py-2">Check operating temperature, current draw</td>
                      <td className="border border-white/10 px-3 py-2">Instrumentation/BMS</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Quarterly</td>
                      <td className="border border-white/10 px-3 py-2">Vibration analysis, thermography</td>
                      <td className="border border-white/10 px-3 py-2">Condition monitoring</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">6-Monthly</td>
                      <td className="border border-white/10 px-3 py-2">Bearing lubrication (if grease points)</td>
                      <td className="border border-white/10 px-3 py-2">Preventive maintenance</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Annually</td>
                      <td className="border border-white/10 px-3 py-2">Insulation resistance test, alignment check</td>
                      <td className="border border-white/10 px-3 py-2">Planned shutdown</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3-5 Years</td>
                      <td className="border border-white/10 px-3 py-2">Bearing replacement (based on running hours)</td>
                      <td className="border border-white/10 px-3 py-2">Major overhaul</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Transformer Maintenance Schedule</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Interval</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Dry Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Oil-Filled</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Monthly</td>
                      <td className="border border-white/10 px-3 py-2">Visual, temperature check</td>
                      <td className="border border-white/10 px-3 py-2">Oil level, temperature, leaks</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Annually</td>
                      <td className="border border-white/10 px-3 py-2">IR test, thermography, clean</td>
                      <td className="border border-white/10 px-3 py-2">Oil sample, IR test, thermography</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3 Years</td>
                      <td className="border border-white/10 px-3 py-2">Detailed inspection, torque connections</td>
                      <td className="border border-white/10 px-3 py-2">DGA, winding resistance</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5+ Years</td>
                      <td className="border border-white/10 px-3 py-2">Turns ratio test, PD test</td>
                      <td className="border border-white/10 px-3 py-2">Full oil processing, comprehensive tests</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">SFG20 - Standard Maintenance Specification</p>
              <p className="text-sm text-white mb-2">
                SFG20 provides comprehensive maintenance schedules for building services equipment.
                It covers mechanical, electrical, and specialist systems with task frequencies based on:
              </p>
              <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                <li className="pl-1">Equipment type and criticality</li>
                <li className="pl-1">Statutory and regulatory requirements</li>
                <li className="pl-1">Manufacturer recommendations</li>
                <li className="pl-1">Industry best practice</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 8: Building Services - Planned Maintenance and Condition Monitoring */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
            Building Services: Planned Maintenance and Condition Monitoring
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Modern building services maintenance integrates planned preventive maintenance (PPM) with
              condition-based monitoring (CBM) to optimise reliability while minimising costs. Building
              Management Systems (BMS) increasingly support predictive maintenance strategies.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Planned Preventive Maintenance (PPM)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Fixed-interval tasks regardless of condition</li>
                  <li className="pl-1">Based on time, running hours, or cycles</li>
                  <li className="pl-1">Predictable resource requirements</li>
                  <li className="pl-1">May result in unnecessary maintenance</li>
                  <li className="pl-1">Cannot prevent random failures</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Condition-Based Maintenance (CBM)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Maintenance triggered by equipment condition</li>
                  <li className="pl-1">Uses monitoring data and trend analysis</li>
                  <li className="pl-1">Reduces unnecessary interventions</li>
                  <li className="pl-1">Requires investment in monitoring systems</li>
                  <li className="pl-1">Can extend component life significantly</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Critical Building Services Equipment</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">System</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Equipment</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Monitoring Parameters</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">HVAC</td>
                      <td className="border border-white/10 px-3 py-2">AHU fans, pumps, chillers</td>
                      <td className="border border-white/10 px-3 py-2">Vibration, temperature, current, pressure</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Life Safety</td>
                      <td className="border border-white/10 px-3 py-2">Smoke extract fans, fire pumps</td>
                      <td className="border border-white/10 px-3 py-2">Weekly run tests, vibration, IR</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lifts</td>
                      <td className="border border-white/10 px-3 py-2">Motors, drives, door operators</td>
                      <td className="border border-white/10 px-3 py-2">Current, travel time, door cycles</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Standby Power</td>
                      <td className="border border-white/10 px-3 py-2">Generators, UPS systems</td>
                      <td className="border border-white/10 px-3 py-2">Battery condition, fuel, load tests</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Distribution</td>
                      <td className="border border-white/10 px-3 py-2">Transformers, switchgear</td>
                      <td className="border border-white/10 px-3 py-2">Temperature, partial discharge, IR</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BMS Integration for Predictive Maintenance</p>
              <p className="text-sm text-white mb-3">
                Modern BMS platforms can support predictive maintenance through continuous monitoring:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Motor current trending:</strong> Detects degradation over time</li>
                <li className="pl-1"><strong>VSD fault logging:</strong> Early warning of drive issues</li>
                <li className="pl-1"><strong>Run time metering:</strong> Triggers time-based maintenance</li>
                <li className="pl-1"><strong>Temperature monitoring:</strong> Identifies overheating equipment</li>
                <li className="pl-1"><strong>Pressure differentials:</strong> Filter condition monitoring</li>
                <li className="pl-1"><strong>Power quality:</strong> Voltage imbalance, harmonics</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Maintenance Documentation Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Asset register:</strong> Equipment identification, specifications, location</li>
                <li className="pl-1"><strong>Maintenance history:</strong> All work performed with dates and findings</li>
                <li className="pl-1"><strong>Test records:</strong> IR tests, thermography, vibration baselines</li>
                <li className="pl-1"><strong>Statutory compliance:</strong> Fixed wiring tests, emergency lighting, fire systems</li>
                <li className="pl-1"><strong>Warranty information:</strong> Terms, expiry dates, authorised service providers</li>
                <li className="pl-1"><strong>O&M manuals:</strong> Manufacturer maintenance requirements</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> The optimum maintenance strategy combines PPM for statutory compliance
              and basic care with CBM for high-value or critical equipment where monitoring investment is justified.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Insulation Resistance Assessment</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> A 22kW AHU supply fan motor shows the following IR readings:
                Phase A-E: 45 MΩ, Phase B-E: 42 MΩ, Phase C-E: 8 MΩ. All tested at 500V DC.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p><strong>Analysis:</strong></p>
                <p className="mt-2">All readings exceed 1 MΩ minimum - technically acceptable</p>
                <p className="mt-2">However, Phase C is significantly lower than A and B</p>
                <p>Ratio: Phase A/C = 45/8 = 5.6:1 (significant imbalance)</p>
                <p className="mt-2"><strong>Interpretation:</strong></p>
                <p>Phase C winding shows degraded insulation</p>
                <p>Possible moisture, contamination, or thermal damage</p>
                <p className="mt-2"><strong>Recommendation:</strong></p>
                <p className="text-yellow-400">1. Perform PI test on Phase C</p>
                <p className="text-yellow-400">2. Check historical trend data</p>
                <p className="text-yellow-400">3. Schedule detailed inspection at next opportunity</p>
                <p className="text-yellow-400">4. Increase monitoring frequency</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Vibration Analysis Interpretation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> A chilled water pump (1450 rpm, 4-pole) shows dominant vibration at 24.2 Hz
                with amplitude of 3.2 mm/s RMS.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p><strong>Analysis:</strong></p>
                <p>Running speed: 1450 rpm = 24.2 Hz ✓ (matches dominant frequency)</p>
                <p className="mt-2">1× running speed vibration indicates: <strong>Mechanical imbalance</strong></p>
                <p className="mt-2">Amplitude assessment (ISO 10816 Class II - medium machines):</p>
                <p>3.2 mm/s is in the "Satisfactory" range (1.12-2.8 is good, 2.8-7.1 satisfactory)</p>
                <p className="mt-2"><strong>Interpretation:</strong></p>
                <p>Rotor imbalance developing but not yet critical</p>
                <p className="mt-2"><strong>Recommendation:</strong></p>
                <p className="text-yellow-400">1. Check impeller for debris or erosion</p>
                <p className="text-yellow-400">2. Schedule dynamic balancing at next planned shutdown</p>
                <p className="text-yellow-400">3. Increase monitoring to monthly until corrected</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Thermographic Finding</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Annual thermographic survey shows a motor terminal box with Phase A at 85°C,
                Phase B at 52°C, and Phase C at 48°C. Ambient temperature is 25°C.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p><strong>Analysis:</strong></p>
                <p>Phase A: ΔT = 85 - 25 = <strong>60°C above ambient</strong></p>
                <p>Phase B: ΔT = 52 - 25 = 27°C above ambient</p>
                <p>Phase C: ΔT = 48 - 25 = 23°C above ambient</p>
                <p className="mt-2"><strong>Classification (Phase A):</strong></p>
                <p className="text-red-400">ΔT &gt; 40°C = CRITICAL - Immediate action required</p>
                <p className="mt-2"><strong>Likely cause:</strong></p>
                <p>High-resistance connection at Phase A terminal</p>
                <p>Possibly loose termination or corroded lug</p>
                <p className="mt-2"><strong>Action required:</strong></p>
                <p className="text-red-400">1. Isolate motor as soon as operationally possible</p>
                <p className="text-red-400">2. Clean, inspect and re-terminate Phase A connection</p>
                <p className="text-red-400">3. Check torque on all terminals</p>
                <p className="text-red-400">4. Re-survey after repair to confirm resolution</p>
              </div>
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

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Test Minimum Values</p>
                <ul className="space-y-0.5">
                  <li>IR at 500V DC: minimum 1 MΩ</li>
                  <li>PI ratio: minimum 1.5 (good &gt;2.0)</li>
                  <li>Winding R balance: within 2%</li>
                  <li>Vibration (medium): &lt;2.8 mm/s good</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Thermographic Action Levels</p>
                <ul className="space-y-0.5">
                  <li>1-10°C: Monitor</li>
                  <li>10-25°C: Schedule repair</li>
                  <li>25-40°C: Repair within days</li>
                  <li>&gt;40°C: Immediate action</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Vibration Fault Frequencies</p>
                <ul className="space-y-0.5">
                  <li>Imbalance: 1× running speed</li>
                  <li>Misalignment: 1× and 2× speed</li>
                  <li>Electrical: 100Hz (2× line)</li>
                  <li>Bearings: BPFO, BPFI, BSF, FTF</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Maintenance Standards</p>
                <ul className="space-y-0.5">
                  <li>SFG20: Building services PPM</li>
                  <li>ISO 10816: Vibration severity</li>
                  <li>BS 7671: Electrical testing</li>
                  <li>BS EN 60034: Rotating machines</li>
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
            <Link to="../h-n-c-module3-section5-7">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Starting and Speed Control
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section6">
              Next: Section 6
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule3Section5_8;
