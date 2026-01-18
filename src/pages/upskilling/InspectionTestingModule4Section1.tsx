import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import UnitsPocketCard from "@/components/apprentice-courses/UnitsPocketCard";
import useSEO from "@/hooks/useSEO";

const TITLE = "Principles of Insulation Testing - Module 4 Section 1";
const DESCRIPTION = "Understand insulation resistance fundamentals, why testing is essential, and the physics behind IR measurements.";

const quickCheckQuestions = [
  {
    id: "ir-purpose",
    question: "What does insulation resistance testing verify?",
    options: [
      "Circuit continuity",
      "Adequate isolation between conductors and earth",
      "Protective device operation",
      "Earth electrode resistance"
    ],
    correctIndex: 1,
    explanation: "Insulation resistance testing confirms conductors are adequately isolated from each other and from earth, preventing dangerous leakage currents."
  },
  {
    id: "ir-units",
    question: "Insulation resistance is typically measured in:",
    options: ["Milliohms (mΩ)", "Ohms (Ω)", "Megohms (MΩ)", "Kilohms (kΩ)"],
    correctIndex: 2,
    explanation: "Good insulation has very high resistance, typically measured in megohms (MΩ). 1 MΩ = 1,000,000 Ω."
  },
  {
    id: "ir-minimum",
    question: "What is the minimum acceptable insulation resistance per BS 7671?",
    options: ["0.5 MΩ", "1.0 MΩ", "2.0 MΩ", "5.0 MΩ"],
    correctIndex: 1,
    explanation: "BS 7671 specifies a minimum insulation resistance of 1.0 MΩ. Values below this require investigation and remedial work."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Insulation resistance testing verifies that:",
    options: [
      "Protective devices will operate",
      "Conductors are adequately isolated",
      "The circuit has low impedance",
      "RCDs will trip correctly"
    ],
    correctAnswer: 1,
    explanation: "Insulation resistance testing confirms conductors are adequately separated from each other and from earth, preventing dangerous leakage currents."
  },
  {
    id: 2,
    question: "Insulation resistance is measured in:",
    options: ["Ohms (Ω)", "Milliohms (mΩ)", "Megohms (MΩ)", "Amperes (A)"],
    correctAnswer: 2,
    explanation: "Good insulation has very high resistance, typically measured in megohms (MΩ). 1 MΩ = 1,000,000 Ω."
  },
  {
    id: 3,
    question: "Why is DC voltage used for insulation testing?",
    options: [
      "It's safer than AC",
      "It provides constant stress without charging effects",
      "It's required by law",
      "It gives higher readings"
    ],
    correctAnswer: 1,
    explanation: "DC provides constant, steady stress on insulation. AC would cause capacitive charging effects that complicate measurement."
  },
  {
    id: 4,
    question: "A low insulation resistance reading indicates:",
    options: [
      "Excellent insulation quality",
      "New cable installation",
      "Degraded or contaminated insulation",
      "Correct polarity"
    ],
    correctAnswer: 2,
    explanation: "Low readings suggest insulation is degraded, damaged, contaminated, or wet - allowing leakage current to flow."
  },
  {
    id: 5,
    question: "Which is NOT a common cause of insulation degradation?",
    options: [
      "Moisture ingress",
      "Heat cycling",
      "Correct installation",
      "UV exposure"
    ],
    correctAnswer: 2,
    explanation: "Correct installation actually protects insulation. Moisture, heat, UV, mechanical damage, and age all cause degradation."
  },
  {
    id: 6,
    question: "Failed insulation can result in:",
    options: [
      "Only nuisance tripping",
      "Only equipment damage",
      "Electric shock, fire, and equipment damage",
      "None of the above"
    ],
    correctAnswer: 2,
    explanation: "Failed insulation can cause multiple hazards: electric shock, fire from leakage currents, equipment damage, and dangerous touch voltages."
  },
  {
    id: 7,
    question: "An insulation resistance tester generates:",
    options: [
      "High AC voltage",
      "Low DC voltage",
      "Stabilised DC voltage at 250V, 500V, or 1000V",
      "Variable frequency AC"
    ],
    correctAnswer: 2,
    explanation: "IR testers generate specific stabilised DC voltages - typically 250V, 500V, or 1000V depending on the circuit being tested."
  },
  {
    id: 8,
    question: "Moisture on insulation surfaces will cause:",
    options: [
      "Higher readings",
      "Lower readings",
      "No change in readings",
      "Open circuit readings"
    ],
    correctAnswer: 1,
    explanation: "Moisture creates a conductive path on insulation surfaces, reducing the measured resistance. Readings often improve when circuits dry out."
  },
  {
    id: 9,
    question: "What unit represents 1,000,000 ohms?",
    options: ["Kilohm (kΩ)", "Megohm (MΩ)", "Gigohm (GΩ)", "Milliohm (mΩ)"],
    correctAnswer: 1,
    explanation: "1 Megohm (MΩ) = 1,000,000 Ω. This is the typical unit for insulation resistance measurements."
  },
  {
    id: 10,
    question: "The minimum acceptable insulation resistance per BS 7671 is:",
    options: ["0.5 MΩ", "1.0 MΩ", "2.0 MΩ", "10 MΩ"],
    correctAnswer: 1,
    explanation: "BS 7671 specifies a minimum insulation resistance of 1.0 MΩ for most circuits. Lower values require investigation."
  }
];

const faqs = [
  {
    question: "Why use DC voltage for insulation testing?",
    answer: "DC voltage provides a constant stress on the insulation without the charging effects of AC. The steady current flow through insulation defects is easier to measure accurately, and DC won't trip RCDs during testing."
  },
  {
    question: "What does insulation resistance actually measure?",
    answer: "It measures the resistance of the insulating material between conductors or between conductors and earth. High values (megohms) indicate good insulation; low values indicate degradation, damage, or contamination allowing leakage current."
  },
  {
    question: "Why does insulation degrade over time?",
    answer: "Multiple factors: heat cycling causes expansion/contraction, moisture ingress, UV exposure, chemical contamination, mechanical damage, electrical stress, and natural aging of materials all contribute to gradual insulation breakdown."
  },
  {
    question: "What happens if insulation fails?",
    answer: "Failed insulation can cause: electric shock to persons, fire from leakage currents, equipment damage, nuisance tripping of protective devices, and potential earth faults leading to dangerous touch voltages on exposed metalwork."
  },
  {
    question: "How does an insulation resistance tester work?",
    answer: "The instrument generates a stabilised DC voltage (250V, 500V, or 1000V). This is applied to the insulation. The tester measures the tiny current that flows through the insulation and calculates resistance using Ohm's law (R=V/I)."
  },
  {
    question: "Can low readings be temporary?",
    answer: "Yes. Moisture on insulation surfaces can cause low readings that improve when the circuit dries out. Condensation is common in unheated buildings. However, consistently low readings after drying indicate genuine insulation degradation."
  }
];

const InspectionTestingModule4Section1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-4">
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
            <Zap className="h-4 w-4" />
            <span>Module 4 Section 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Principles of Insulation Testing
          </h1>
          <p className="text-white/80">
            Understand why insulation resistance testing is essential and the physics behind IR measurements
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Purpose:</strong> Verify conductors are adequately isolated</li>
              <li><strong>Method:</strong> Apply high DC voltage, measure leakage</li>
              <li><strong>Results:</strong> Low values = degradation or contamination</li>
              <li><strong>Minimum:</strong> 1.0 MΩ per BS 7671</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Why It Matters</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Shock Prevention:</strong> Isolate live from accessible parts</li>
              <li><strong>Fire Prevention:</strong> Detect dangerous leakage currents</li>
              <li><strong>Equipment Protection:</strong> Identify degradation early</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand the purpose of IR testing",
              "Learn how insulation resistance works",
              "Recognise causes of degradation",
              "Understand safety implications",
              "Know BS 7671 requirements",
              "Learn how IR testers operate"
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

        {/* Section 1: What is Insulation Resistance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What is Insulation Resistance?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              <strong className="text-white">Insulation resistance (IR)</strong> is a measure of how well the
              insulating materials in an electrical installation prevent unwanted current flow between conductors,
              or from conductors to earth.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Principle</p>
              <p className="text-sm text-white/90">
                Perfect insulation would have infinite resistance. In reality, all insulating materials allow
                some tiny current to pass - this is normal. Problems occur when this leakage becomes excessive.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key facts:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>IR testing verifies conductors are adequately isolated from each other and from earth</li>
                <li>Tests apply a high DC voltage to stress insulation and measure leakage current</li>
                <li>Results indicate insulation condition - low values suggest degradation or contamination</li>
                <li>Measured in megohms (MΩ) - 1 MΩ = 1,000,000 Ω</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Why Test Insulation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Why Test Insulation?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Insulation testing is critical for electrical safety. It protects people and property from the
              dangers of electrical faults.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Safety Benefits</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Prevent Electric Shock:</strong> Ensures live conductors cannot contact accessible metalwork</li>
                  <li><strong>Prevent Fire:</strong> Detects leakage currents that could cause overheating</li>
                  <li><strong>Protect Equipment:</strong> Identifies degradation before failure occurs</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Compliance Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Verify Installation:</strong> Confirms new work meets safety standards</li>
                  <li><strong>Periodic Testing:</strong> Monitors ongoing installation condition</li>
                  <li><strong>Fault Finding:</strong> Locates insulation breakdown problems</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: How IR Testing Works */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            How IR Testing Works
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              An insulation resistance tester applies a <strong className="text-white">stabilised DC voltage</strong> between
              the conductors under test.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The testing process:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>1. Instrument generates a stable DC voltage (250V, 500V, or 1000V)</li>
                <li>2. Voltage is applied across the insulation being tested</li>
                <li>3. Tiny leakage current flows through the insulation</li>
                <li>4. Instrument measures this current (typically microamps)</li>
                <li>5. Resistance calculated using Ohm's Law: R = V/I</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Why DC Voltage */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Why DC Voltage?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              DC voltage is used for insulation testing because it provides the most accurate results:
            </p>

            <div className="my-6">
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Provides constant, steady stress on insulation</li>
                <li>No capacitive charging effects to complicate readings</li>
                <li>Easier to measure small leakage currents accurately</li>
                <li>Won't trip RCDs during testing</li>
                <li>Reveals genuine insulation resistance, not capacitive reactance</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Note:</strong> If AC were used, cables would act as capacitors, and the readings would include
              capacitive reactance rather than true insulation resistance.
            </p>
          </div>
        </section>

        {/* Section 5: Causes of Degradation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Causes of Degradation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Insulation degrades over time due to various factors:
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              {[
                { factor: "Heat", effect: "Accelerates aging, causes brittleness" },
                { factor: "Moisture", effect: "Creates conductive paths" },
                { factor: "UV Light", effect: "Breaks down plastic materials" },
                { factor: "Chemicals", effect: "Attacks insulation compounds" },
                { factor: "Mechanical", effect: "Abrasion, crushing, cuts" },
                { factor: "Electrical", effect: "Overvoltage stress, arcing" }
              ].map((item, i) => (
                <div key={i} className="text-sm">
                  <p className="text-elec-yellow/80 font-medium">{item.factor}</p>
                  <p className="text-white/80">{item.effect}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 6: BS 7671 Requirements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            BS 7671 Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="my-6 p-4 rounded-lg bg-elec-yellow/10 text-center">
              <p className="text-2xl font-mono text-elec-yellow mb-2">Minimum: 1.0 MΩ</p>
              <p className="text-white/60 text-sm">Required insulation resistance per BS 7671</p>
            </div>

            <p>
              This minimum applies to each circuit tested. In practice, new installations should achieve
              readings significantly higher than 1 MΩ - typically 100 MΩ or more.
            </p>

            <p className="text-sm text-white/70">
              <strong className="text-elec-yellow">Note:</strong> The 1 MΩ minimum is measured with all equipment
              disconnected. With equipment connected, readings may be lower due to electronic components.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">New Installations</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Expect readings of 100 MΩ or higher</li>
                <li>Low readings on new work indicate installation problems</li>
                <li>Test before equipment is connected for true cable insulation values</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Older Installations</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Readings decrease over time - this is normal</li>
                <li>Monitor trends - gradual decline is expected, sudden drops indicate problems</li>
                <li>Values approaching 1 MΩ require close monitoring</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Weather Effects</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Damp conditions reduce readings significantly</li>
                <li>Test in dry conditions or allow for moisture effects</li>
                <li>Re-test after drying if readings are borderline</li>
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

        {/* Reference Cards */}
        <section className="mb-10">
          <UnitsPocketCard />

          <div className="mt-6 p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Key Values</p>
                <ul className="space-y-0.5">
                  <li>Minimum IR: 1.0 MΩ per BS 7671</li>
                  <li>New installation: &gt;100 MΩ typical</li>
                  <li>Test voltages: 250V, 500V, 1000V DC</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Units</p>
                <ul className="space-y-0.5">
                  <li>1 MΩ = 1,000,000 Ω</li>
                  <li>Measurement unit: Megohms (MΩ)</li>
                  <li>Test type: DC voltage application</li>
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
            <Link to="/study-centre/upskilling/inspection-testing/module-3/section-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-4/section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default InspectionTestingModule4Section1;
