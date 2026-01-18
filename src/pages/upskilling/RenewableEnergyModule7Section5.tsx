import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Test Equipment and Diagnostics - Renewable Energy Module 7";
const DESCRIPTION =
  "Master the selection and use of meters, test equipment, and diagnostic tools for renewable energy system assessment, performance evaluation, and safe working practices.";

const quickCheckQuestions = [
  {
    id: "test-equip-qc1",
    question: "What minimum CAT rating is required for test equipment used on PV systems?",
    options: ["CAT I", "CAT II", "CAT III", "CAT IV"],
    correctIndex: 2,
    explanation:
      "CAT III rated equipment is required for fixed installations including PV systems. CAT I and II are insufficient for the voltage levels and fault energies present.",
  },
  {
    id: "test-equip-qc2",
    question: "What is the primary advantage of a DC-capable clamp meter for PV systems?",
    options: [
      "Lower cost",
      "Non-intrusive current measurement without breaking the circuit",
      "Higher accuracy than multimeters",
      "Automatic data logging",
    ],
    correctIndex: 1,
    explanation:
      "DC clamp meters measure current without breaking the circuit, enabling safe measurement of string currents whilst the system remains operational.",
  },
  {
    id: "test-equip-qc3",
    question: "What minimum irradiance is typically required for meaningful I-V curve testing?",
    options: ["200 W/m²", "400 W/m²", "700 W/m²", "1000 W/m²"],
    correctIndex: 2,
    explanation:
      "At least 700 W/m² irradiance is recommended for I-V curve tracing to ensure sufficient power production for accurate characterisation. 1000 W/m² (STC) is ideal.",
  },
  {
    id: "test-equip-qc4",
    question: "What does a thermal imaging camera primarily detect in PV systems?",
    options: [
      "Voltage levels",
      "Temperature anomalies indicating faults",
      "Current flow direction",
      "Insulation resistance",
    ],
    correctIndex: 1,
    explanation:
      "Thermal imaging detects temperature differences that indicate issues such as loose connections, failed bypass diodes, cell defects, and internal short circuits.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What does True RMS mean in a digital multimeter?",
    options: [
      "Real-time measurement system",
      "Accurate measurement of non-sinusoidal waveforms",
      "Remote monitoring system",
      "Rapid measurement speed",
    ],
    correctAnswer: 1,
    explanation:
      "True RMS (Root Mean Square) meters accurately measure non-sinusoidal waveforms common in inverter outputs, providing correct readings regardless of waveform shape.",
  },
  {
    id: 2,
    question: "What is the purpose of an irradiance meter in PV testing?",
    options: [
      "To measure panel temperature",
      "To measure solar radiation for performance normalisation",
      "To measure inverter efficiency",
      "To detect ground faults",
    ],
    correctAnswer: 1,
    explanation:
      "Irradiance meters measure solar radiation reaching the panels, enabling normalisation of performance data to standard test conditions for accurate comparison.",
  },
  {
    id: 3,
    question: "What does a PV analyser with I-V curve tracing capability measure?",
    options: [
      "Only open circuit voltage",
      "Complete current-voltage characteristic of modules/strings",
      "Grid frequency only",
      "Cable resistance only",
    ],
    correctAnswer: 1,
    explanation:
      "I-V curve tracers measure the complete current-voltage relationship, revealing fill factor, maximum power point, series resistance, and other parameters indicating module health.",
  },
  {
    id: 4,
    question: "What insulation resistance test voltage is appropriate for 1000V DC PV systems?",
    options: ["250V", "500V", "1000V", "2500V"],
    correctAnswer: 2,
    explanation:
      "Insulation resistance testing should use a test voltage appropriate to the system voltage. For 1000V systems, use 1000V DC test voltage.",
  },
  {
    id: 5,
    question: "What is the recommended temperature range indication for thermal imaging of PV systems?",
    options: [
      "Any temperature above ambient",
      "Hot spots greater than 10°C above surrounding cells",
      "Hot spots greater than 30°C above surrounding cells",
      "Hot spots greater than 50°C above surrounding cells",
    ],
    correctAnswer: 1,
    explanation:
      "Temperature differences greater than 10°C compared to surrounding cells typically indicate issues requiring investigation. Larger differences suggest more serious problems.",
  },
  {
    id: 6,
    question: "What should be checked before using any electrical test equipment?",
    options: [
      "Only battery level",
      "Calibration status, physical condition, and lead integrity",
      "Colour and appearance",
      "Manufacturer reputation",
    ],
    correctAnswer: 1,
    explanation:
      "Pre-use checks should verify calibration is current, physical condition is good, test leads are intact, and the equipment functions correctly (prove before and after).",
  },
  {
    id: 7,
    question: "What is the purpose of a power quality analyser?",
    options: [
      "To measure DC voltage only",
      "To analyse harmonics, power factor, and voltage quality",
      "To test batteries",
      "To measure solar irradiance",
    ],
    correctAnswer: 1,
    explanation:
      "Power quality analysers measure harmonic distortion, power factor, voltage variations, and other parameters affecting grid compliance and equipment operation.",
  },
  {
    id: 8,
    question: "How should test leads be stored and maintained?",
    options: [
      "Any convenient method",
      "Protected from damage, checked before use, replaced if degraded",
      "Coiled tightly when not in use",
      "Stored in direct sunlight",
    ],
    correctAnswer: 1,
    explanation:
      "Test leads should be protected from UV, chemicals, and mechanical damage. Inspect before each use and replace if cracked, damaged, or degraded.",
  },
  {
    id: 9,
    question: "What is GS38 guidance relevant to?",
    options: [
      "Solar panel installation",
      "Safe use of electrical test equipment",
      "Grid connection requirements",
      "Battery storage design",
    ],
    correctAnswer: 1,
    explanation:
      "GS38 provides HSE guidance on the safe use of electrical test equipment, including requirements for probes, leads, and safe working practices.",
  },
  {
    id: 10,
    question: "What calibration interval is typically recommended for test equipment?",
    options: ["Monthly", "Quarterly", "Annually", "Every 5 years"],
    correctAnswer: 2,
    explanation:
      "Annual calibration is typically recommended for professional test equipment, though this may vary based on manufacturer requirements and usage frequency.",
  },
];

const faqs = [
  {
    question: "What test equipment do I need for basic PV maintenance?",
    answer:
      "Essential equipment includes: CAT III rated true RMS multimeter, DC clamp meter, insulation resistance tester (minimum 500V DC, ideally 1000V), and basic hand tools. For more thorough analysis, add an irradiance meter and thermal imaging camera.",
  },
  {
    question: "How do I interpret I-V curve results?",
    answer:
      "Compare measured curves against expected shapes. Look for: reduced Voc (temperature or cell issues), reduced Isc (soiling, shading, degradation), steps in the curve (bypass diode activation, partial shading), and reduced fill factor (series resistance, connections).",
  },
  {
    question: "When is thermal imaging most effective?",
    answer:
      "Conduct thermal imaging during stable, high-irradiance conditions (minimum 700 W/m², ideally close to 1000 W/m²). Allow systems to reach thermal equilibrium (at least one hour of operation). Avoid windy conditions that can mask temperature differences.",
  },
  {
    question: "Can I use a standard multimeter on solar panels?",
    answer:
      "Only if it is rated CAT III minimum and DC-capable. Standard consumer multimeters are often CAT II or unrated and unsafe for PV system voltages. Always verify the meter rating before use and ensure test leads match the meter ratings.",
  },
  {
    question: "How do I calibrate my test equipment?",
    answer:
      "Most professional test equipment requires manufacturer or accredited laboratory calibration. Maintain calibration certificates and track due dates. Some equipment can be field-verified against known references between calibrations.",
  },
  {
    question: "What data should I record during testing?",
    answer:
      "Record: date, time, weather conditions (irradiance, temperature, cloud cover), equipment used with serial numbers, measurement locations, all readings with units, and any observations. This supports analysis and provides evidence for warranty claims.",
  },
];

const RenewableEnergyModule7Section5 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#1a1a1a]/95 backdrop-blur supports-[backdrop-filter]:bg-[#1a1a1a]/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            to=".."
            className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Module Overview
          </Link>
          <span className="text-sm text-white">Module 7 • Section 5</span>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden py-12 sm:py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-elec-yellow/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-elec-yellow/10 px-4 py-1.5 text-sm font-medium text-elec-yellow">
              <Zap className="h-4 w-4" />
              Operation and Maintenance
            </div>
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Test Equipment and Diagnostics
            </h1>
            <p className="text-lg text-white sm:text-xl">
              Using the right tools for accurate data assessment, performance evaluation, and safe working practices.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Summary */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border-l-2 border-elec-yellow/50 bg-elec-yellow/5 p-4">
              <h3 className="mb-2 font-semibold text-white">Equipment Selection</h3>
              <p className="text-sm text-white">
                Choosing appropriate test equipment ensures accurate measurements and safe operation during diagnostics on renewable energy systems.
              </p>
            </div>
            <div className="rounded-lg border-l-2 border-elec-yellow/50 bg-elec-yellow/5 p-4">
              <h3 className="mb-2 font-semibold text-white">Safe Practice</h3>
              <p className="text-sm text-white">
                Proper use of test equipment following GS38 guidance and manufacturer instructions protects personnel and provides reliable results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Outcomes */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-4 text-xl font-bold text-white">Learning Outcomes</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Select the right meter or instrument for each task",
                "Use equipment safely and correctly",
                "Interpret test results confidently",
                "Maintain test equipment properly",
                "Apply appropriate safety procedures",
                "Document test results effectively",
              ].map((outcome, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-elec-yellow" />
                  <span className="text-sm text-white">{outcome}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {/* Section 01 */}
          <section className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-elec-yellow text-lg font-bold text-black">
                01
              </span>
              <h2 className="text-2xl font-bold text-white">Essential Test Equipment</h2>
            </div>
            <div className="space-y-4 text-white">
              <p>
                Selecting appropriate test equipment is fundamental to accurate diagnostics and safe working on renewable energy systems.
              </p>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Digital Multimeters</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li><strong>CAT rating:</strong> Minimum CAT III 1000V for PV systems</li>
                  <li><strong>True RMS:</strong> Essential for accurate AC measurements from inverters</li>
                  <li><strong>DC capability:</strong> Must measure DC voltage up to system maximum</li>
                  <li><strong>Input protection:</strong> Fused inputs with adequate breaking capacity</li>
                  <li><strong>Safety features:</strong> Auto-ranging, overload protection</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">DC Clamp Meters</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li><strong>DC current:</strong> Essential for string current measurement</li>
                  <li><strong>Range:</strong> Typically 0.1A to 400A+ covers most applications</li>
                  <li><strong>Accuracy:</strong> Better than 2% for meaningful comparison</li>
                  <li><strong>Non-intrusive:</strong> Measure without breaking circuits</li>
                  <li><strong>Hall effect:</strong> Typical sensing technology for DC</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Insulation Resistance Testers</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li><strong>Test voltage:</strong> 500V minimum, 1000V for high-voltage systems</li>
                  <li><strong>Range:</strong> Measure up to at least 1 GOhm</li>
                  <li><strong>Timer function:</strong> Useful for polarisation index testing</li>
                  <li><strong>Live circuit warning:</strong> Prevents testing on energised circuits</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          {/* Section 02 */}
          <section className="mb-12 mt-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-elec-yellow text-lg font-bold text-black">
                02
              </span>
              <h2 className="text-2xl font-bold text-white">Advanced Diagnostic Tools</h2>
            </div>
            <div className="space-y-4 text-white">
              <p>
                Sophisticated diagnostic equipment provides detailed system analysis beyond basic electrical measurements.
              </p>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">PV Analysers and I-V Curve Tracers</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li><strong>I-V curve tracing:</strong> Complete characterisation under actual conditions</li>
                  <li><strong>Maximum Power Point:</strong> Verification against STC ratings</li>
                  <li><strong>Fill factor:</strong> Indicator of cell quality and connections</li>
                  <li><strong>Series resistance:</strong> Detection of resistive losses</li>
                  <li><strong>Temperature compensation:</strong> Normalisation to standard conditions</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Thermal Imaging Cameras</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li><strong>Resolution:</strong> Minimum 160 x 120 pixels for solar applications</li>
                  <li><strong>Temperature range:</strong> -20°C to +150°C covers typical faults</li>
                  <li><strong>Accuracy:</strong> ±2°C or ±2% for reliable diagnosis</li>
                  <li><strong>Applications:</strong> Hot spots, loose connections, bypass diode failure</li>
                  <li><strong>Documentation:</strong> Built-in image storage and reporting</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Irradiance and Environmental Sensors</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li><strong>Reference cells:</strong> Calibrated sensors matching module technology</li>
                  <li><strong>Pyranometers:</strong> Broader spectral response for research</li>
                  <li><strong>Module temperature:</strong> Surface contact or IR measurement</li>
                  <li><strong>Ambient conditions:</strong> Temperature, wind speed for derating</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          {/* Section 03 */}
          <section className="mb-12 mt-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-elec-yellow text-lg font-bold text-black">
                03
              </span>
              <h2 className="text-2xl font-bold text-white">Measurement Techniques</h2>
            </div>
            <div className="space-y-4 text-white">
              <p>
                Accurate measurement requires proper technique and understanding of environmental factors affecting results.
              </p>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Environmental Conditions</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li><strong>Irradiance:</strong> Minimum 500 W/m² for basic tests, 700+ for I-V curves</li>
                  <li><strong>Stability:</strong> Avoid testing during passing clouds</li>
                  <li><strong>Temperature:</strong> Record ambient and module temperature</li>
                  <li><strong>Wind:</strong> Affects module temperature and thermal imaging</li>
                  <li><strong>Timing:</strong> Avoid early morning condensation periods</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Measurement Best Practice</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li>Allow readings to stabilise before recording</li>
                  <li>Take multiple measurements for consistency</li>
                  <li>Use appropriate range settings</li>
                  <li>Maintain safe working distances from live parts</li>
                  <li>Record all relevant environmental conditions</li>
                  <li>Document equipment used with serial numbers</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Data Normalisation</h4>
                <p className="mb-2">
                  Raw measurements must be normalised for meaningful comparison:
                </p>
                <ul className="list-inside list-disc space-y-1">
                  <li>Correct for irradiance variation from 1000 W/m²</li>
                  <li>Apply temperature coefficients (typically -0.4%/°C for power)</li>
                  <li>Account for spectral effects where relevant</li>
                  <li>Document normalisation methods used</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          {/* Section 04 */}
          <section className="mb-12 mt-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-elec-yellow text-lg font-bold text-black">
                04
              </span>
              <h2 className="text-2xl font-bold text-white">Equipment Safety and Maintenance</h2>
            </div>
            <div className="space-y-4 text-white">
              <p>
                Safe use of test equipment protects both personnel and the equipment itself. Regular maintenance ensures continued accuracy.
              </p>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">GS38 Requirements</h4>
                <p className="mb-2">
                  HSE guidance on electrical test equipment safety:
                </p>
                <ul className="list-inside list-disc space-y-1">
                  <li>Finger guards on probes (exposed tip maximum 4mm)</li>
                  <li>Fused test leads with adequate breaking capacity</li>
                  <li>Leads rated for the equipment and application</li>
                  <li>Clear insulation in good condition</li>
                  <li>Probe tips spring-loaded or shrouded</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Pre-Use Checks</h4>
                <ol className="list-inside list-decimal space-y-2">
                  <li>Verify calibration certificate is current</li>
                  <li>Inspect physical condition of equipment</li>
                  <li>Check test leads for damage or degradation</li>
                  <li>Verify battery level is adequate</li>
                  <li>Prove equipment on known source before and after use</li>
                  <li>Confirm CAT rating is appropriate for application</li>
                </ol>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Calibration and Maintenance</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li><strong>Calibration:</strong> Annual calibration by accredited laboratory</li>
                  <li><strong>Certificates:</strong> Maintain records of all calibrations</li>
                  <li><strong>Storage:</strong> Protect from extreme temperatures and humidity</li>
                  <li><strong>Cleaning:</strong> Keep connectors and contacts clean</li>
                  <li><strong>Batteries:</strong> Replace as recommended, remove if storing long-term</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            question={quickCheckQuestions[3].question}
            options={quickCheckQuestions[3].options}
            correctIndex={quickCheckQuestions[3].correctIndex}
            explanation={quickCheckQuestions[3].explanation}
          />

          {/* Section 05 */}
          <section className="mb-12 mt-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-elec-yellow text-lg font-bold text-black">
                05
              </span>
              <h2 className="text-2xl font-bold text-white">Result Interpretation and Reporting</h2>
            </div>
            <div className="space-y-4 text-white">
              <p>
                Understanding what test results mean and documenting them effectively is as important as the measurements themselves.
              </p>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Common Reference Values</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="py-2 text-left text-white">Measurement</th>
                        <th className="py-2 text-left text-white">Acceptable Range</th>
                      </tr>
                    </thead>
                    <tbody className="text-white">
                      <tr className="border-b border-white/10">
                        <td className="py-2">Insulation resistance</td>
                        <td className="py-2">Greater than 1 MOhm</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-2">String current balance</td>
                        <td className="py-2">Within 5% of parallel strings</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-2">String Voc</td>
                        <td className="py-2">Within 3% of expected</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-2">Thermal differential</td>
                        <td className="py-2">Less than 10°C above surrounding</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-2">Fill factor</td>
                        <td className="py-2">Greater than 70% typically</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Documentation Requirements</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li>Date, time, and location of testing</li>
                  <li>Environmental conditions (irradiance, temperature)</li>
                  <li>Equipment used with serial numbers and calibration dates</li>
                  <li>All measurements with units and measurement points</li>
                  <li>Photographs of any anomalies or damage</li>
                  <li>Conclusions and recommendations</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Practical Guidance */}
          <section className="mb-12 mt-12">
            <div className="rounded-xl border border-elec-yellow/30 bg-elec-yellow/5 p-6">
              <h2 className="mb-4 text-xl font-bold text-white">Practical Guidance</h2>
              <div className="space-y-4 text-white">
                <div>
                  <h4 className="font-semibold text-elec-yellow">Building Your Test Equipment Kit</h4>
                  <p className="mt-1 text-sm">
                    Start with essentials: quality CAT III multimeter, DC clamp meter, and insulation tester. Add specialised equipment as work demands. Invest in quality - reliable measurements depend on reliable equipment.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-elec-yellow">Developing Testing Skills</h4>
                  <p className="mt-1 text-sm">
                    Practice with equipment before using on critical jobs. Understand what normal readings look like so you can recognise abnormal results. Keep records to build experience with typical values for different system types.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-elec-yellow">When Results Are Uncertain</h4>
                  <p className="mt-1 text-sm">
                    If results seem unexpected, repeat measurements. Check equipment function. Consider environmental factors. Compare with historical data if available. Do not act on uncertain data - investigate further or seek expert opinion.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-white">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <h3 className="mb-2 font-semibold text-elec-yellow">{faq.question}</h3>
                  <p className="text-sm text-white">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Quiz Section */}
          <section className="mb-12">
            <Quiz
              title="Test Equipment Quiz"
              questions={quizQuestions}
              onComplete={(score) => console.log("Quiz completed with score:", score)}
            />
          </section>

          {/* Navigation */}
          <nav className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:justify-between">
            <Link to="/upskilling/renewable-energy/module-7/section-4">
              <Button variant="outline" className="w-full gap-2 border-white/20 text-white hover:bg-white/10 sm:w-auto">
                <ArrowLeft className="h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="/upskilling/renewable-energy/module-7/section-6">
              <Button className="w-full gap-2 bg-elec-yellow text-black hover:bg-elec-yellow/90 sm:w-auto">
                Next Section
                <ArrowLeft className="h-4 w-4 rotate-180" />
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule7Section5;
