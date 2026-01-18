import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "evcharging-m5s3-check1",
    question: "What accuracy class is recommended for Dynamic Load Management applications?",
    options: ["Class 3 (±3%)", "Class 1 (±1%)", "Class 0.1 (±0.1%)", "Class 5 (±5%)"],
    correctIndex: 1,
    explanation: "Class 1 (±1%) accuracy is the minimum recommendation for DLM applications. Class 0.5 (±0.5%) is preferred for revenue-grade monitoring and billing applications."
  },
  {
    id: "evcharging-m5s3-check2",
    question: "What is the primary advantage of split-core CT clamps?",
    options: ["Higher accuracy", "Lower cost", "Retrofit installation without disconnection", "Smaller physical size"],
    correctIndex: 2,
    explanation: "Split-core CTs allow retrofit installation on existing electrical installations without disconnecting or breaking primary circuit connections, making them ideal for upgrading monitoring systems."
  },
  {
    id: "evcharging-m5s3-check3",
    question: "Why should CT secondary connections never be open-circuited under load?",
    options: ["It damages the CT permanently", "It causes dangerous high voltages", "It affects accuracy", "It trips the circuit breaker"],
    correctIndex: 1,
    explanation: "Open-circuiting CT secondary connections under load creates dangerous high voltages due to the transformer action. The secondary must always have a burden connected when primary current is flowing."
  }
];

const faqs = [
  {
    question: "How do I select the correct CT clamp ratio for my application?",
    answer: "Select CT ratio based on maximum expected current: 100:5A for circuits up to 100A, 200:5A up to 200A, etc. Choose the next larger ratio above your maximum current for optimal accuracy and headroom."
  },
  {
    question: "What causes inaccurate CT readings and how can they be corrected?",
    answer: "Common causes include incorrect CT ratio configuration, poor conductor positioning, electromagnetic interference, and burden mismatch. Corrections involve proper installation, calibration, and shielding of secondary connections."
  },
  {
    question: "How often should CT clamps be calibrated?",
    answer: "Annual calibration is recommended for revenue-grade applications, with 2-3 yearly calibration acceptable for monitoring-only applications. High-accuracy installations may require 6-monthly verification."
  },
  {
    question: "How can control logic handle communication failures?",
    answer: "Implement fail-safe modes with predetermined power limits, use watchdog timers for communication monitoring, provide local data buffering, and include manual override capabilities for emergency operation."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A 500kVA industrial facility requires EV charging monitoring for 25 charge points. What CT installation approach is most appropriate?",
  options: [
    "Single CT on main incomer only",
    "Split-core Class 1 CTs on main panels with Modbus communication",
    "Rogowski coils on each individual charger",
    "Hall effect sensors on the neutral conductor"
  ],
  correctAnswer: 1,
  explanation: "Split-core Class 1 CTs installed on main distribution panels with Modbus communication provides non-intrusive installation, appropriate accuracy for DLM, and standard industrial communication protocols for integration."
  }
];

const EVChargingModule5Section3 = () => {
  useSEO({
    title: "CT Clamps, Load-Sensing, and Control Logic | EV Charging Module 5.3",
    description: "Master current transformer clamps, load-sensing technologies, and control logic for EV charging systems."
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 5.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            CT Clamps, Load-Sensing, and Control Logic
          </h1>
          <p className="text-white/80">
            Monitoring and control technology for advanced load management
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>CT Clamps:</strong> Non-intrusive current measurement</li>
              <li><strong>Accuracy:</strong> Class 1 (±1%) minimum for DLM</li>
              <li><strong>Control:</strong> Real-time load balancing algorithms</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Clamp-on devices around cables, digital displays</li>
              <li><strong>Use:</strong> Monitor loads, implement dynamic allocation</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Select and install appropriate CT clamps",
              "Design load-sensing systems for DLM",
              "Implement intelligent control logic",
              "Calibrate monitoring equipment",
              "Troubleshoot CT and sensing issues",
              "Integrate monitoring with control systems"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            CT Clamp Technology
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Current Transformer clamps provide non-intrusive current measurement through
              electromagnetic induction, essential for Dynamic Load Management systems.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Operating Principles</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Induction:</strong> Magnetic field creates secondary current</li>
                  <li><strong>Ratio:</strong> Fixed transformation (100:5A, 200:5A)</li>
                  <li><strong>Non-intrusive:</strong> No circuit disconnection needed</li>
                  <li><strong>Isolation:</strong> Safe monitoring of high currents</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">CT Types</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Split-core:</strong> Retrofit without disconnection</li>
                  <li><strong>Solid-core:</strong> Higher accuracy, new installations</li>
                  <li><strong>Rogowski coils:</strong> Flexible, large conductors</li>
                  <li><strong>Hall effect:</strong> DC and AC measurement</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Accuracy Specifications:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Class 1:</strong> ±1% accuracy - minimum for DLM applications</li>
                <li><strong>Class 0.5:</strong> ±0.5% - revenue-grade monitoring</li>
                <li><strong>Burden rating:</strong> Match secondary circuit impedance</li>
                <li><strong>Dynamic range:</strong> 1% to 120% of rated current</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Load-Sensing Technologies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Advanced load-sensing combines CT clamps, smart metering, and digital signal
              processing to deliver comprehensive real-time electrical monitoring.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Power Measurement</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Real power: P = V × I × cos φ</li>
                  <li>Reactive power monitoring</li>
                  <li>Apparent power for capacity</li>
                  <li>Harmonic analysis for quality</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Multi-Point Monitoring</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Main incomer total load</li>
                  <li>Sub-circuit disaggregation</li>
                  <li>Generation monitoring</li>
                  <li>Individual load analysis</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Communication Protocols:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Modbus RTU/TCP:</strong> Industrial standard meter communication</li>
                <li><strong>M-Bus:</strong> European utility meter standard</li>
                <li><strong>DNP3:</strong> SCADA and utility applications</li>
                <li><strong>IEC 61850:</strong> Substation automation standard</li>
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">1Hz+</p>
                <p className="text-white text-xs">Load management</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">10Hz+</p>
                <p className="text-white text-xs">Power quality</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">kHz</p>
                <p className="text-white text-xs">Transient capture</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Control Logic and Algorithms
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Intelligent control algorithms process monitoring data to make real-time decisions
              about power allocation, safety protection, and system optimisation.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Load Monitoring</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Baseline:</strong> Non-EV load calculation</li>
                  <li><strong>Forecasting:</strong> Predictive demand algorithms</li>
                  <li><strong>Pattern recognition:</strong> ML load identification</li>
                  <li><strong>Anomaly detection:</strong> Unusual consumption alerts</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Dynamic Response</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Real-time:</strong> Sub-second response to changes</li>
                  <li><strong>Hysteresis:</strong> Prevents oscillation</li>
                  <li><strong>Rate limiting:</strong> Controlled power ramping</li>
                  <li><strong>Priority:</strong> Hierarchical load shedding</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Optimisation Strategies:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Linear programming:</strong> Mathematical resource allocation</li>
                <li><strong>Genetic algorithms:</strong> Evolutionary computing for complex problems</li>
                <li><strong>Fuzzy logic:</strong> Handling uncertainty and imprecise requirements</li>
                <li><strong>Model predictive:</strong> Future state prediction for proactive control</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">CT Installation Best Practices</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Install CTs on all three phases for three-phase monitoring</li>
                <li>Ensure proper conductor centralisation within CT aperture</li>
                <li>Maintain minimum separation from switching equipment</li>
                <li>Use appropriate cable termination for secondary connections</li>
                <li>Label all CTs with ratio, direction, and circuit ID</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Safety Critical - Never Do</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Open-circuit secondary:</strong> — creates dangerous high voltages</li>
                <li><strong>Wrong ratio setting:</strong> — causes incorrect load management</li>
                <li><strong>Poor conductor position:</strong> — reduces measurement accuracy</li>
                <li><strong>Missing earth bond:</strong> — safety hazard on CT secondary</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference */}
        <div className="mt-6 p-5 rounded-lg bg-transparent">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">CT Selection Guide</p>
              <ul className="space-y-0.5">
                <li>Up to 100A: 100:5A ratio</li>
                <li>Up to 200A: 200:5A ratio</li>
                <li>Up to 400A: 400:5A ratio</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Accuracy Classes</p>
              <ul className="space-y-0.5">
                <li>Class 1: DLM applications</li>
                <li>Class 0.5: Revenue-grade</li>
                <li>Class 0.2: High precision</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <section className="mb-10 mt-12">
          <SingleQuestionQuiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/ev-charging-module-5-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/ev-charging-module-5-section-4">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EVChargingModule5Section3;