import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "arc-fault-cause",
    question: "What causes an arc fault?",
    options: ["Overload conditions only", "Electrical breakdown between conductors due to damaged cables or loose connections", "Normal switching operations", "Earth fault conditions"],
    correctIndex: 1,
    explanation: "Arc faults are caused by electrical breakdown between conductors, typically due to damaged cables, loose connections, or worn insulation, creating dangerous sparks and high temperatures."
  },
  {
    id: "afdd-action",
    question: "What does an AFDD do when it detects a dangerous arc?",
    options: ["Sounds an alarm only", "Reduces the current flow", "Disconnects power to the affected circuit", "Increases voltage to clear the arc"],
    correctIndex: 2,
    explanation: "When an AFDD detects a dangerous arc, it immediately disconnects power to the affected circuit to prevent fire and protect the installation."
  },
  {
    id: "afdd-mandatory",
    question: "Are AFDDs mandatory under BS 7671?",
    options: ["Yes, in all new installations", "Yes, but only in commercial buildings", "No, they are recommended but not mandatory", "Only in high-risk locations"],
    correctIndex: 2,
    explanation: "AFDDs are recommended under Amendment 2 of BS 7671 but are not mandatory. They are encouraged for enhanced fire prevention in high-risk areas."
  }
];

const faqs = [
  {
    question: "Why can't MCBs and RCDs detect arc faults?",
    answer: "Arc fault currents are often below MCB trip thresholds and may not create earth leakage detectable by RCDs. Series arcs particularly can occur at normal operating current levels, making them invisible to traditional protection."
  },
  {
    question: "Where are AFDDs recommended?",
    answer: "AFDDs are recommended for high-risk sleeping accommodation (HMOs, care homes), premises with valuable content (museums, galleries), and wooden or combustible structures where fire consequences would be severe."
  },
  {
    question: "How do AFDDs distinguish between dangerous and normal arcs?",
    answer: "AFDDs use advanced algorithms to analyse frequency patterns, current signatures, and waveform characteristics. Normal arcs from switches and motor brushes have different signatures to dangerous arcing from damaged cables."
  },
  {
    question: "Can AFDDs cause nuisance tripping?",
    answer: "Modern AFDDs have sophisticated pattern recognition to minimise nuisance trips. However, some loads like certain LED drivers or motor controllers may require careful coordination. Always verify compatibility with installed equipment."
  }
];

const quizQuestion = {
  question: "Where is it recommended to install AFDDs under BS 7671 Amendment 2?",
  options: [
    "In all domestic properties",
    "High-risk sleeping accommodation, places with valuable content, and wooden/combustible structures",
    "Only in industrial installations",
    "Only where RCDs are not fitted"
  ],
  correctAnswer: 1,
  explanation: "AFDDs are recommended for high-risk sleeping accommodation (HMOs, care homes), places with valuable content (museums), and wooden or combustible structures where fire risks are elevated."
};

const BS7671Module4Section6 = () => {
  useSEO({
    title: "Arc Fault Detection Devices (AFDDs) | BS7671 Module 4.6",
    description: "Learn about AFDDs, how they detect dangerous arcing conditions, and when they're recommended under BS 7671 for enhanced fire prevention."
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bs7671-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 4.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Arc Fault Detection Devices (AFDDs)
          </h1>
          <p className="text-white/80">
            Enhanced Fire Prevention Through Arc Detection
          </p>
        </header>

        {/* Quick Summary */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Function:</strong> Detects dangerous arcing, disconnects circuit</li>
              <li><strong>Detection:</strong> Frequency analysis, pattern recognition</li>
              <li><strong>Status:</strong> Recommended, not mandatory (Amendment 2)</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Consumer units, combined with RCBOs</li>
              <li><strong>Use:</strong> High-risk sleeping, combustible structures</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand what arc faults are and how they occur",
              "Learn how AFDDs work and where they should be used",
              "Identify changes introduced in Amendment 2 regarding AFDDs",
              "Be aware of installation and coordination considerations"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1: What Is an Arc Fault */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What Is an Arc Fault?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              An arc fault is an electrical breakdown between conductors that can occur due to damaged cables, loose connections, or worn insulation. This creates dangerous high temperatures exceeding 3000°C, sparks, and potential fires.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Damaged Cables</p>
                <p className="text-white/90 text-xs">Insulation breakdown</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Loose Connections</p>
                <p className="text-white/90 text-xs">Terminal arcing</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Rodent Damage</p>
                <p className="text-white/90 text-xs">Cable gnawing</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Why Traditional Protection Fails:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>MCBs/Fuses:</strong> Arc currents often below trip threshold, intermittent nature prevents detection</li>
                <li><strong>RCDs:</strong> Line-to-neutral arcs don't create earth leakage, no protection against series arcs</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: How AFDDs Work */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            How AFDDs Work
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              AFDDs continuously monitor circuits for arc characteristics and disconnect power when a dangerous arc is detected. They use sophisticated algorithms to distinguish between dangerous arcs and normal arcing from switches or motor brushes.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Operating Sequence:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>1. Monitoring:</strong> Continuously analyses current waveforms and frequency patterns</li>
                <li><strong>2. Pattern Recognition:</strong> Intelligent algorithms distinguish between normal and dangerous arcs</li>
                <li><strong>3. Arc Detection:</strong> Identifies characteristic signatures of dangerous arcing</li>
                <li><strong>4. Disconnection:</strong> Rapidly disconnects circuit to prevent fire development</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Detection Methods</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Frequency Analysis:</strong> High-frequency components from arcing</li>
                  <li><strong>Current Signature:</strong> Waveform distortions and irregularities</li>
                  <li><strong>Pattern Recognition:</strong> AI distinguishes arc types</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Arc Types Detected</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Series:</strong> Along single conductor (loose connections)</li>
                  <li><strong>Parallel:</strong> Between live conductors or to earth</li>
                  <li><strong>Ground:</strong> From live conductor to earthed parts</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Amendment 2 Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Amendment 2 Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Amendment 2 of BS 7671 introduced recommendations for AFDD use in specific high-risk applications. They remain optional rather than mandatory in most situations but are encouraged for enhanced fire prevention.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-red-400/80 mb-2">High-Risk Sleeping</p>
                <ul className="text-xs space-y-1">
                  <li>HMOs (Houses in Multiple Occupation)</li>
                  <li>Care homes</li>
                  <li>Student accommodation</li>
                  <li>Vulnerable occupants</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Valuable Content</p>
                <ul className="text-xs space-y-1">
                  <li>Museums, art galleries</li>
                  <li>Historic buildings</li>
                  <li>Archives</li>
                  <li>Irreplaceable heritage</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-green-400/80 mb-2">Combustible Structures</p>
                <ul className="text-xs space-y-1">
                  <li>Timber frame buildings</li>
                  <li>Thatched properties</li>
                  <li>Wooden structures</li>
                  <li>Rapid fire spread risk</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Considerations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Final circuits in high-risk areas</li>
                <li>Circuits supplying bedrooms and escape routes</li>
                <li>Areas with high fire load</li>
                <li>Circuits in concealed spaces</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Amendment 3 Updates */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Amendment 3: Energy Storage and EV Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Amendment 3 extends AFDD applications to energy storage systems, EV charging infrastructure, and renewable energy installations where arc fault risks are elevated due to DC circuits and high-power switching.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Energy Storage Protection</p>
                <ul className="text-sm text-white space-y-1">
                  <li>AFDDs recommended for battery storage</li>
                  <li>DC arc fault detection capabilities</li>
                  <li>Integration with BMS</li>
                  <li>Thermal protection coordination</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">EV Charging Infrastructure</p>
                <ul className="text-sm text-white space-y-1">
                  <li>AFDD for high-power charging circuits</li>
                  <li>DC fault detection in charging cables</li>
                  <li>Protection against connector arcing</li>
                  <li>Smart charging integration</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Advanced Technologies */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Advanced AFDD Technologies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Modern AFDDs incorporate advanced algorithms, IoT connectivity, and predictive maintenance capabilities to enhance fire prevention and system reliability.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Smart Detection</p>
                <ul className="text-xs space-y-1">
                  <li>AI-enhanced recognition</li>
                  <li>Machine learning algorithms</li>
                  <li>Adaptive sensitivity</li>
                  <li>False trip reduction</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">IoT Integration</p>
                <ul className="text-xs space-y-1">
                  <li>Remote monitoring</li>
                  <li>Cloud diagnostics</li>
                  <li>Mobile app notifications</li>
                  <li>Event logging</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">System Coordination</p>
                <ul className="text-xs space-y-1">
                  <li>BMS integration</li>
                  <li>Fire alarm coordination</li>
                  <li>Emergency lighting</li>
                  <li>HVAC shutdown</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Installation Best Practices:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Functional testing after installation</li>
                <li>Periodic testing schedules</li>
                <li>Firmware updates as available</li>
                <li>Documentation and certification</li>
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

        {/* Quick Reference */}
        <div className="mt-6 p-5 rounded-lg bg-transparent">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">Arc Fault Types</p>
              <ul className="space-y-0.5">
                <li>Series: Loose connections</li>
                <li>Parallel: Between conductors</li>
                <li>Ground: To earthed parts</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Recommended Locations</p>
              <ul className="space-y-0.5">
                <li>High-risk sleeping accommodation</li>
                <li>Valuable content premises</li>
                <li>Combustible structures</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz */}
        <section className="mb-10">
          <SingleQuestionQuiz
            question={quizQuestion.question}
            options={quizQuestion.options}
            correctAnswer={quizQuestion.correctAnswer}
            explanation={quizQuestion.explanation}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bs7671-module-4-section-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bs7671-module-4-section-7">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BS7671Module4Section6;
