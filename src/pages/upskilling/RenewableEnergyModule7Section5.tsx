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
      "Test voltage should match or slightly exceed system voltage. For 1000V DC systems, use 1000V test voltage. Higher voltages may damage equipment.",
  },
  {
    id: 5,
    question: "What does a low insulation resistance reading indicate?",
    options: [
      "Normal operation",
      "Degraded insulation possibly due to moisture, damage, or ageing",
      "High system efficiency",
      "Overcurrent condition",
    ],
    correctAnswer: 1,
    explanation:
      "Low insulation resistance indicates compromised insulation, potentially due to moisture ingress, cable damage, connector degradation, or equipment failure.",
  },
  {
    id: 6,
    question: "Why is an earth loop impedance tester needed for PV systems?",
    options: [
      "To measure DC output",
      "To verify earthing system effectiveness for fault clearance",
      "To measure solar irradiance",
      "To check inverter efficiency",
    ],
    correctAnswer: 1,
    explanation:
      "Earth loop impedance testing verifies that the earthing system can carry fault current and that protective devices will operate within required times.",
  },
  {
    id: 7,
    question: "What is the purpose of a PV string combiner tester?",
    options: [
      "To combine multiple inverters",
      "To measure multiple strings simultaneously for comparison",
      "To clean panels",
      "To design new systems",
    ],
    correctAnswer: 1,
    explanation:
      "String combiner testers measure voltage and current of multiple strings simultaneously, enabling rapid identification of underperforming strings.",
  },
  {
    id: 8,
    question: "What safety feature should test leads have for PV testing?",
    options: [
      "Any colour is acceptable",
      "Shrouded connectors preventing accidental contact",
      "Maximum flexibility",
      "Longest possible length",
    ],
    correctAnswer: 1,
    explanation:
      "Shrouded connectors prevent accidental contact with live parts during testing. Test leads should also be CAT-rated and in good condition.",
  },
  {
    id: 9,
    question: "What does a data logger record for PV system analysis?",
    options: [
      "Only instantaneous readings",
      "Time-stamped measurements for trend analysis",
      "Verbal notes only",
      "Video recordings",
    ],
    correctAnswer: 1,
    explanation:
      "Data loggers record time-stamped measurements enabling trend analysis, performance comparison over time, and correlation with environmental conditions.",
  },
  {
    id: 10,
    question: "How often should test equipment be calibrated?",
    options: [
      "Never",
      "Annually or per manufacturer recommendation",
      "Only when visibly damaged",
      "Every 10 years",
    ],
    correctAnswer: 1,
    explanation:
      "Test equipment should be calibrated annually or per manufacturer recommendation to ensure measurement accuracy. Keep calibration certificates available.",
  },
];

const faqs = [
  {
    question: "What basic test equipment do I need for PV maintenance?",
    answer:
      "Essential equipment includes: CAT III/IV rated digital multimeter (True RMS, DC capable to 1000V), DC clamp meter, insulation resistance tester (1000V), and earth continuity tester. Thermal imaging capability is highly valuable but can be outsourced initially.",
  },
  {
    question: "How do I interpret thermal imaging results?",
    answer:
      "Hot spots on modules may indicate cell defects, bypass diode failures, or shading effects. Hot connections suggest high resistance (loose terminals). Compare temperatures to surrounding areas and adjacent modules. Document anomalies with location and severity rating.",
  },
  {
    question: "When should I use an I-V curve tracer?",
    answer:
      "Use I-V curve tracers for detailed module or string characterisation, warranty claim evidence, comparing actual to nameplate performance, and diagnosing complex underperformance. They require good irradiance conditions (minimum 700 W/m²) for meaningful results.",
  },
  {
    question: "What calibration records do I need to maintain?",
    answer:
      "Maintain calibration certificates for all test instruments, typically renewed annually. Keep records of calibration dates, next due dates, and any adjustments made. Calibration should be traceable to national standards.",
  },
  {
    question: "Can I use standard AC equipment for DC measurements?",
    answer:
      "No - equipment must be specifically rated for DC voltage and current at the levels present. Standard AC equipment may give incorrect readings or be damaged by DC. Ensure CAT ratings are appropriate for both AC and DC sides.",
  },
  {
    question: "What PPE is required when using test equipment on PV systems?",
    answer:
      "Wear arc-rated clothing and voltage-rated insulated gloves appropriate to system voltage. Face protection is recommended. Ensure test leads are in good condition with shrouded connectors. Follow safe isolation procedures before testing.",
  },
];

const RenewableEnergyModule7Section5 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-4 py-3 flex items-center gap-3">
          <Link to="/electrician/upskilling/renewable-energy-module-7">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <span className="text-white font-medium truncate">Test Equipment & Diagnostics</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="px-4 py-6 text-center">
        <div className="inline-flex items-center gap-2 bg-elec-yellow/10 border border-elec-yellow/30 rounded-full px-3 py-1 mb-3">
          <Zap className="w-4 h-4 text-elec-yellow" />
          <span className="text-elec-yellow text-sm font-medium">Module 7 - Section 5</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Test Equipment & Diagnostics
        </h1>
        <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto">
          Selection and use of meters, test equipment, and diagnostic tools for renewable energy systems
        </p>
      </div>

      {/* Quick Summary */}
      <div className="px-4 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">In 30 Seconds:</span> CAT III minimum rating for all PV test equipment
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">Spot it:</span> DC clamp meters enable non-intrusive current measurement
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">Use it:</span> I-V curve tracing needs minimum 700 W/m² irradiance
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">Key Tool:</span> Thermal imaging reveals hot spots and faults
            </p>
          </div>
        </div>
      </div>

      {/* Learning Outcomes */}
      <div className="px-4 pb-6">
        <h2 className="text-lg font-semibold text-white mb-3">What You Will Learn</h2>
        <div className="space-y-2">
          {[
            "Select appropriate test equipment for PV systems",
            "Use multimeters and clamp meters safely on DC systems",
            "Perform insulation resistance testing correctly",
            "Interpret thermal imaging results",
            "Understand I-V curve tracing principles",
            "Maintain and calibrate test equipment",
          ].map((outcome, index) => (
            <div key={index} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-elec-yellow mt-0.5 shrink-0" />
              <span className="text-white/80 text-sm">{outcome}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 space-y-6 pb-8">
        {/* Section 01 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">01</span>
            <h2 className="text-xl font-semibold text-white">Essential Test Equipment</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Proper test equipment is essential for safe and effective diagnosis of renewable energy systems. Equipment must be rated for DC voltages and conditions present.
            </p>
            <p>
              <span className="text-white font-medium">Digital Multimeter:</span> Must be True RMS capable for accurate inverter output measurement. Require CAT III rating minimum (CAT IV preferred) for fixed installations. DC voltage capability to at least 1000V for most PV systems and DC current measurement via series connection or separate clamp.
            </p>
            <p>
              <span className="text-white font-medium">DC Clamp Meter:</span> Enables non-intrusive current measurement on live strings. Must be specifically DC capable as standard AC clamps will not work. Hall effect type for DC measurement. Useful for comparing string currents without disconnection.
            </p>
            <p>
              <span className="text-white font-medium">Insulation Resistance Tester:</span> 1000V test capability for standard PV systems. Higher voltages may be needed for 1500V systems. Must generate sufficient test voltage under load. Important for detecting degraded insulation and ground faults.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[0]]} />

        {/* Section 02 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">02</span>
            <h2 className="text-xl font-semibold text-white">Thermal Imaging Equipment</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Thermal imaging cameras reveal temperature anomalies that indicate developing faults before they cause system failures.
            </p>
            <p>
              <span className="text-white font-medium">Camera Selection:</span> Higher resolution enables better identification of small defects. Temperature accuracy of 2 degrees C or better is recommended. Wide temperature range covers normal operation to fault conditions. Field of view should suit inspection distances.
            </p>
            <p>
              <span className="text-white font-medium">Optimal Conditions:</span> Best results with minimum 500 W/m² irradiance, ideally above 700 W/m². System should be operating at significant load. Uniform lighting avoids reflection issues. Early morning or overcast conditions reduce glare.
            </p>
            <p>
              <span className="text-white font-medium">Interpretation:</span> Hot cells may indicate internal short circuits, cell cracks, or bypass diode failures. Hot connections suggest high resistance from loose terminals. Compare relative temperatures between modules and strings. Document anomalies with severity classification.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[1]]} />

        {/* Section 03 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">03</span>
            <h2 className="text-xl font-semibold text-white">Advanced Diagnostic Tools</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Specialised diagnostic tools enable detailed performance analysis beyond basic electrical measurements.
            </p>
            <p>
              <span className="text-white font-medium">I-V Curve Tracers:</span> These measure complete current-voltage characteristics of modules and strings. They reveal fill factor, series resistance, shunt resistance, and degradation. Require good irradiance (minimum 700 W/m²) for accurate results. Compare results to manufacturer specifications.
            </p>
            <p>
              <span className="text-white font-medium">Irradiance Meters:</span> These measure solar radiation for performance normalisation. Reference cells match module spectral response. Pyranometers provide broader spectral measurement. Essential for accurate yield calculations and performance analysis.
            </p>
            <p>
              <span className="text-white font-medium">Data Loggers:</span> These record time-stamped measurements for trend analysis. Multiple channels monitor various parameters simultaneously. Important for performance monitoring and fault investigation. Ensure adequate memory and battery life for monitoring period.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[2]]} />

        {/* Section 04 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">04</span>
            <h2 className="text-xl font-semibold text-white">Test Procedures and Techniques</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Correct test procedures ensure accurate results and safe working on energised or potentially energised systems.
            </p>
            <p>
              <span className="text-white font-medium">Voltage Measurement:</span> Verify meter settings before connecting. Check Voc (open circuit voltage) with load disconnected. Measure Vmpp during operation for MPPT verification. Compare string voltages for consistency.
            </p>
            <p>
              <span className="text-white font-medium">Current Measurement:</span> Use clamp meters where possible to avoid circuit interruption. For series measurement, ensure meter is correctly rated. Compare string currents under consistent irradiance. Document irradiance conditions during testing.
            </p>
            <p>
              <span className="text-white font-medium">Insulation Testing:</span> Isolate the system and prove dead before testing. Apply test voltage matching system voltage rating. Allow reading to stabilise before recording. Test positive to earth, negative to earth, and positive to negative.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[3]]} />

        {/* Section 05 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">05</span>
            <h2 className="text-xl font-semibold text-white">Equipment Care and Calibration</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Proper maintenance and calibration ensures test equipment provides accurate, reliable measurements.
            </p>
            <p>
              <span className="text-white font-medium">Daily Checks:</span> Inspect test leads for damage before use. Check battery condition. Verify meter zeroing and basic function. Ensure correct range selection.
            </p>
            <p>
              <span className="text-white font-medium">Calibration Requirements:</span> Annual calibration is typical for most test equipment. More frequent calibration may be needed for critical measurements. Keep calibration certificates available. Calibration should be traceable to national standards.
            </p>
            <p>
              <span className="text-white font-medium">Storage and Transport:</span> Store equipment in protective cases. Protect from extreme temperatures and humidity. Remove batteries for long-term storage. Keep accessories and manuals together with instruments.
            </p>
          </div>
        </section>

        {/* Practical Guidance */}
        <div className="bg-gradient-to-r from-elec-yellow/10 to-amber-500/10 border border-elec-yellow/20 rounded-xl p-4">
          <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
            <Zap className="w-4 h-4 text-elec-yellow" />
            Practical Guidance
          </h3>
          <div className="space-y-2 text-white/80 text-sm">
            <p>
              <span className="text-white font-medium">Building a test kit:</span> Start with essential equipment - multimeter, DC clamp, IR tester. Add specialised tools as workload justifies. Consider rental or outsourcing for expensive equipment used infrequently.
            </p>
            <p>
              <span className="text-white font-medium">Safe testing practices:</span> Always verify equipment ratings match the system. Use appropriate PPE. Follow safe isolation procedures. Never assume systems are de-energised without verification.
            </p>
            <p>
              <span className="text-white font-medium">Documentation:</span> Record all test results with conditions and equipment used. Maintain calibration records. Keep equipment manuals available for reference.
            </p>
          </div>
        </div>

        {/* FAQs */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h3 className="text-white font-medium mb-2">{faq.question}</h3>
                <p className="text-white/70 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz
          title="Test Equipment Quiz"
          questions={quizQuestions}
        />

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center pt-4 border-t border-white/10">
          <Link to="../section-4">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Button>
          </Link>
          <Link to="../section-6">
            <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule7Section5;
