import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "evcharging-m4s2-check1",
    question: "What is the typical VMR trip voltage threshold for EV charging installations?",
    options: ["25V", "35-50V", "100V", "230V"],
    correctIndex: 1,
    explanation: "VMR trip thresholds for EV charging are typically set at 35-50V. This is lower than the general 50V limit due to outdoor installation and higher exposure risks associated with EV charging equipment."
  },
  {
    id: "evcharging-m4s2-check2",
    question: "What is the recommended VMR trip time for safety-critical EV charging applications?",
    options: ["5 seconds", "1 second", "40ms", "200ms"],
    correctIndex: 2,
    explanation: "A 40ms trip time is recommended for EV charging to provide fast disconnection for touch safety. This ensures rapid protection when dangerous voltages appear on exposed metalwork."
  },
  {
    id: "evcharging-m4s2-check3",
    question: "During automatic earth changeover, what happens when a PEN fault is detected?",
    options: [
      "System remains on TN-C-S with alarm only",
      "Installation switches from TN-C-S to TT using local earth electrode",
      "Power is disconnected permanently until manual reset",
      "Only the affected charger is isolated"
    ],
    correctIndex: 1,
    explanation: "Automatic earth changeover systems switch from TN-C-S to TT operation, activating a pre-installed local earth electrode. This maintains protection while isolating from the faulty PEN conductor."
  }
];

const faqs = [
  {
    question: "Why is 50V the typical VMR trip setting?",
    answer: "50V is considered the maximum safe touch voltage for general applications. For EV charging, lower settings (35-50V) are preferred due to outdoor installation and higher exposure risks from users touching the charger during operation."
  },
  {
    question: "Can I use existing earth electrodes for PEN protection?",
    answer: "Yes, but they must meet resistance requirements (<200Ω for 30mA RCD protection). Additional electrodes may be needed to achieve adequate performance for reliable earth changeover operation."
  },
  {
    question: "How often should PEN protection be tested?",
    answer: "Monthly automatic tests plus annual manual verification. More frequent testing may be required in high-risk environments or critical applications such as rapid charging hubs."
  },
  {
    question: "Do I need PEN protection for every charge point?",
    answer: "Not necessarily. A single VMR system can protect multiple charge points on the same supply, but consider selective protection for large installations to maintain partial operation during faults."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A TN-C-S installation experiences an open PEN fault. What voltage could appear on exposed metalwork relative to true earth?",
  options: [
    "Maximum 50V due to RCD protection",
    "Only a few volts from normal earth resistance",
    "Up to 230V depending on load balance",
    "No voltage as the system trips instantly"
  ],
  correctAnswer: 2,
  explanation: "During an open PEN fault in a TN-C-S system, the installation earth can rise to dangerous potentials up to 230V relative to true earth, depending on the load balance. This occurs because conventional protective devices may not trip, and the fault can persist for extended periods."
  }
];

const EVChargingModule4Section2 = () => {
  useSEO({
    title: "Open PEN Fault Protection Methods | EV Charging Module 4.2",
    description: "Learn protection methods against open PEN conductor faults in EV charging installations. Covers VMR systems, earth changeover, and BS 7671 compliance."
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
            <Link to="/study-centre/upskilling/ev-charging-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 4.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Open PEN Fault Protection Methods
          </h1>
          <p className="text-white/80">
            Protecting against dangerous voltages from PEN conductor failures
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Open PEN:</strong> Can cause up to 230V on metalwork</li>
              <li><strong>VMR:</strong> Detects voltage rise, trips within 40ms</li>
              <li><strong>Changeover:</strong> Switches to TT system automatically</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> VMR unit with voltage display, earth electrode</li>
              <li><strong>Use:</strong> Essential for outdoor TN-C-S EV charging</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify causes and consequences of open PEN faults",
              "Specify VMR protection devices for EV charging",
              "Design voltage monitoring systems",
              "Implement current-based protection methods",
              "Apply BS 7671 PEN conductor protection requirements",
              "Coordinate protection with existing earthing"
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
            Understanding Open PEN Faults
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Open PEN (Protective Earth and Neutral) faults represent one of the most serious
              electrical hazards in TN-C-S systems. When the combined PEN conductor breaks, dangerous
              voltages can appear on exposed metalwork, creating severe shock and fire risks.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fault Causes</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Overhead lines:</strong> Weather or vehicle impact</li>
                  <li><strong>Underground:</strong> Excavation or corrosion damage</li>
                  <li><strong>Joints:</strong> Distribution network failures</li>
                  <li><strong>Maintenance:</strong> Deliberate disconnection</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Voltage Consequences</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Normal:</strong> Earth at 0V (supply neutral)</li>
                  <li><strong>Open PEN:</strong> Earth rises to dangerous levels</li>
                  <li><strong>Worst case:</strong> Up to 230V on metalwork</li>
                  <li><strong>Load dependent:</strong> Varies with balance</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Detection Challenges:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Fault may not trip conventional protective devices</li>
                <li>Installation continues to operate normally in many cases</li>
                <li>Dangerous voltages may persist for extended periods</li>
                <li>Users may be unaware of the hazardous condition</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Voltage Monitoring Relay (VMR) Protection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              VMR systems continuously monitor the neutral-earth voltage difference and disconnect
              the installation when dangerous voltages are detected. For EV charging, fast response
              times are essential.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">VMR Components</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Monitoring circuit:</strong> High impedance (1MΩ)</li>
                  <li><strong>Isolation:</strong> Prevents nuisance tripping</li>
                  <li><strong>Filtering:</strong> Transient immunity built-in</li>
                  <li><strong>Indication:</strong> LED status monitoring</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Switching Circuit</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Contactor:</strong> Main circuit isolation</li>
                  <li><strong>Changeover:</strong> Earth switching capability</li>
                  <li><strong>Auxiliary:</strong> Alarm and monitoring contacts</li>
                  <li><strong>Override:</strong> Manual test facilities</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">EV Charging VMR Settings:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Trip voltage:</strong> 35-50V (enhanced for outdoor use)</li>
                <li><strong>Trip time:</strong> 40ms (fast disconnection)</li>
                <li><strong>Reconnect delay:</strong> 3 minutes (prevent cycling)</li>
                <li><strong>Test facility:</strong> Automatic + manual verification</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Earth Changeover Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Automatic earth changeover systems switch from TN-C-S to TT operation during a PEN
              fault, maintaining protection using a pre-installed local earth electrode.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Normal Operation (TN-C-S)</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Earth:</strong> Connected to DNO PEN</li>
                  <li><strong>Protection:</strong> Standard MCB + RCD</li>
                  <li><strong>Electrode:</strong> Isolated and monitored</li>
                  <li><strong>Fault loop:</strong> Low impedance via DNO</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fault Operation (TT)</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Earth:</strong> Switched to local electrode</li>
                  <li><strong>Protection:</strong> RCD mandatory (≤200Ω)</li>
                  <li><strong>PEN:</strong> Complete isolation from fault</li>
                  <li><strong>Fault loop:</strong> High impedance, RCD required</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Switching Sequence:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>T+0ms:</strong> PEN fault detected, VMR initiates trip</li>
                <li><strong>T+40ms:</strong> Main contactor opens, load disconnected</li>
                <li><strong>T+100ms:</strong> Earth changeover to TT electrode</li>
                <li><strong>T+200ms:</strong> System verification, ready for reconnection</li>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Design Requirements</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Make-before-break earth switching prevents momentary isolation</li>
                <li>Mechanical interlocking prevents simultaneous connection</li>
                <li>Fail-safe operation with battery backup for control circuits</li>
                <li>Position indication and remote monitoring capabilities</li>
                <li>Earth electrode: typically 15-45Ω for reliable RCD operation</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Poor earth electrode:</strong> — Must achieve required resistance</li>
                <li><strong>Slow trip time:</strong> — 40ms maximum for EV charging safety</li>
                <li><strong>No testing:</strong> — Monthly automatic + annual manual required</li>
                <li><strong>Missing documentation:</strong> — Record all settings and test results</li>
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
              <p className="font-medium text-white mb-1">VMR Settings (EV Charging)</p>
              <ul className="space-y-0.5">
                <li>Trip voltage: 35-50V</li>
                <li>Trip time: 40ms</li>
                <li>Reconnect delay: 3 minutes</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Earth Electrode Requirements</p>
              <ul className="space-y-0.5">
                <li>Resistance: &lt;200Ω (ideally &lt;100Ω)</li>
                <li>Testing: Annual verification</li>
                <li>Type: Typically 1.2-2.4m rod</li>
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
            <Link to="/study-centre/upskilling/ev-charging-module-4-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/ev-charging-module-4-section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EVChargingModule4Section2;