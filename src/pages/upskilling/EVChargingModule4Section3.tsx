import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "evcharging-m4s3-check1",
    question: "What is the typical accuracy class required for CTs monitoring 22kW three-phase EV chargers?",
    options: ["Class 3", "Class 1", "Class 0.5", "Class 0.1"],
    correctIndex: 2,
    explanation: "Class 0.5 accuracy is typically required for 22kW three-phase chargers. This provides adequate precision for load monitoring and billing accuracy while being cost-effective for commercial installations."
  },
  {
    id: "evcharging-m4s3-check2",
    question: "What is a critical safety requirement when working with current transformers?",
    options: [
      "Always use copper cables",
      "Secondary circuits must never be open-circuited during operation",
      "CTs must be painted bright colours",
      "CTs should be installed horizontally only"
    ],
    correctIndex: 1,
    explanation: "CT secondary circuits must never be open-circuited during operation. An open secondary can cause dangerous high voltages and damage the CT. Shorting links must be used during installation and testing."
  },
  {
    id: "evcharging-m4s3-check3",
    question: "What is the standard undervoltage trip setting for EV charging voltage relays?",
    options: ["80% (184V)", "85% (196V)", "90% (207V)", "95% (219V)"],
    correctIndex: 2,
    explanation: "90% of nominal (207V) is the typical undervoltage trip setting for EV charging. This provides enhanced protection for sensitive charging equipment while allowing for normal voltage fluctuations."
  }
];

const faqs = [
  {
    question: "What type of CT is best for retrofit EV charging installations?",
    answer: "Split-core CTs are ideal for retrofit installations as they can be installed without disconnecting existing cables. They provide adequate accuracy for most monitoring applications and are quick to install."
  },
  {
    question: "How often should monitoring equipment be calibrated?",
    answer: "Annual calibration is typically required for revenue-grade metering. For monitoring applications, bi-annual calibration may be acceptable. Always follow manufacturer recommendations and applicable standards."
  },
  {
    question: "Can monitoring systems help with predictive maintenance?",
    answer: "Yes, advanced monitoring with trend analysis can identify degradation before failure occurs. Monitoring current harmonics, power quality, and temperature trends enables proactive maintenance scheduling."
  },
  {
    question: "What communication protocols do modern relays support?",
    answer: "Modern multifunction relays support Modbus RTU/TCP, IEC 61850, DNP3, and often have Ethernet connectivity. This allows integration with building management systems and remote monitoring platforms."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A commercial charging hub requires monitoring for 20 charging points with individual billing. What CT accuracy class is most appropriate?",
  options: [
    "Class 3 - adequate for indication only",
    "Class 1 - standard industrial monitoring",
    "Class 0.5 - suitable for billing applications",
    "Class 0.2S - revenue-grade metering"
  ],
  correctAnswer: 2,
  explanation: "Class 0.5 is most appropriate for commercial charging with individual billing. It provides adequate accuracy for billing purposes while being cost-effective. Class 0.2S is typically reserved for utility revenue metering where higher accuracy justifies the additional cost."
  }
];

const EVChargingModule4Section3 = () => {
  useSEO({
    title: "Monitoring Devices and Relays | EV Charging Module 4.3",
    description: "Learn to install and configure monitoring devices and relays for enhanced EV charging protection. Covers CTs, voltage relays, and power quality monitoring."
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/ev-charging-module-4">
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
            <span>Module 4.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Monitoring Devices and Relays
          </h1>
          <p className="text-white/80">
            Enhanced protection and diagnostics for EV charging systems
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>CTs:</strong> Class 0.5 for billing, Class 1 for monitoring</li>
              <li><strong>Voltage:</strong> 90% UV trip, 106% OV trip typical</li>
              <li><strong>Power quality:</strong> THD &lt;8%, power factor &gt;0.85</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> CT donut on cable, relay with LCD display</li>
              <li><strong>Use:</strong> Load balancing, billing, predictive maintenance</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Select appropriate monitoring devices for EV charging",
              "Install and configure current transformers",
              "Implement power quality monitoring",
              "Design protective relay schemes",
              "Integrate with building management systems",
              "Establish maintenance and diagnostic procedures"
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
            Current Transformer Selection and Installation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Current transformers (CTs) enable accurate current measurement for monitoring,
              protection, and billing in EV charging installations. Selection depends on
              application requirements and accuracy needs.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">CT Types</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Split-core:</strong> Retrofit without disconnection</li>
                  <li><strong>Window-type:</strong> New installations, best accuracy</li>
                  <li><strong>Rogowski coils:</strong> Flexible, high-frequency</li>
                  <li><strong>Precision:</strong> Revenue-grade metering</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Accuracy Classes</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>7kW single:</strong> 50/5A, Class 1</li>
                  <li><strong>22kW three-phase:</strong> 100/5A, Class 0.5</li>
                  <li><strong>Distribution board:</strong> 200/5A, Class 0.5</li>
                  <li><strong>Main incomer:</strong> 400/5A, Class 0.2S</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Installation Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Clearance:</strong> Minimum 200mm from adjacent conductors</li>
                <li><strong>Lead length:</strong> Keep secondary leads under 4m</li>
                <li><strong>Cabling:</strong> Twisted pair for EMI immunity</li>
                <li><strong>Protection:</strong> IP54 minimum for environmental protection</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Voltage Protection Relays
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Voltage monitoring relays protect EV charging equipment from undervoltage,
              overvoltage, phase loss, and phase sequence faults. Proper configuration
              ensures equipment protection while avoiding nuisance tripping.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">EV Charging Settings</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>UV trip:</strong> 90% (207V), 5s delay</li>
                  <li><strong>OV trip:</strong> 106% (244V), 1s delay</li>
                  <li><strong>Phase unbalance:</strong> 3%, 10s delay</li>
                  <li><strong>Phase loss:</strong> 80% (184V), 2s delay</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Protection Functions</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Phase sequence:</strong> L1-L2-L3 verification</li>
                  <li><strong>Auto reconnect:</strong> When voltage normalises</li>
                  <li><strong>Indication:</strong> LED status and alarms</li>
                  <li><strong>Communication:</strong> Remote monitoring interface</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Advanced Features:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Voltage trend recording for preventive maintenance</li>
                <li>Power quality assessment including THD and flicker</li>
                <li>Remote monitoring integration with SCADA systems</li>
                <li>Event logging with timestamps for fault analysis</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Power Quality Monitoring
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              EV chargers with power electronics can introduce harmonics and affect power quality.
              Monitoring ensures compliance with standards and identifies potential issues before
              they cause problems.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Voltage Quality Metrics</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Variation:</strong> ±10% limits</li>
                  <li><strong>Flicker:</strong> P99 &lt;1.0</li>
                  <li><strong>Frequency:</strong> ±1% (49.5-50.5Hz)</li>
                  <li><strong>Unbalance:</strong> &lt;2% for three-phase</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Current Quality</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>THD:</strong> &lt;8% at nominal power</li>
                  <li><strong>DC injection:</strong> &lt;6mA</li>
                  <li><strong>Power factor:</strong> &gt;0.85</li>
                  <li><strong>Individual harmonics:</strong> Per IEC 61851</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Monitoring Thresholds (EV Charging):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Voltage THD:</strong> 6% monitoring threshold, 8% limit</li>
                <li><strong>Current THD:</strong> 6% monitoring threshold, 8% limit</li>
                <li><strong>DC injection:</strong> 4mA monitoring, 6mA limit</li>
                <li><strong>Power factor:</strong> 0.90 monitoring, 0.85 minimum</li>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Testing and Commissioning</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Verify CT polarity and ratio using primary injection testing</li>
                <li>Test all protection relay functions and settings individually</li>
                <li>Commission communication links and verify data accuracy</li>
                <li>Validate integration with charge point controllers</li>
                <li>Document all settings and commissioning results</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Open CT secondary:</strong> — Dangerous voltages, always use shorting links</li>
                <li><strong>Wrong CT ratio:</strong> — Incorrect readings affect billing and protection</li>
                <li><strong>Sensitive settings:</strong> — Causes nuisance tripping, adjust for environment</li>
                <li><strong>Missing earth:</strong> — CT secondary must be single-point earthed</li>
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
                <li>7kW: 50/5A, Class 1</li>
                <li>22kW: 100/5A, Class 0.5</li>
                <li>Billing: Class 0.5 minimum</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Voltage Relay Settings</p>
              <ul className="space-y-0.5">
                <li>UV: 90% (207V)</li>
                <li>OV: 106% (244V)</li>
                <li>Phase loss: 80% (184V)</li>
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
            <Link to="/study-centre/upskilling/ev-charging-module-4-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/ev-charging-module-4-section-4">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EVChargingModule4Section3;