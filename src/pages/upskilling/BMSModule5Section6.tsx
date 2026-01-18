import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "rs485-cable-length",
    question: "What is the maximum recommended cable length for an RS-485 Modbus RTU segment?",
    options: ["500m", "1200m", "2000m"],
    correctIndex: 1,
    explanation: "RS-485 has a maximum recommended cable length of approximately 1200m per segment before signal loss occurs. Beyond this distance, signal quality degrades and communication becomes unreliable."
  },
  {
    id: "segmentation-importance",
    question: "Why is segmentation important in large BACnet MSTP networks?",
    options: ["It reduces cable costs", "It reduces traffic congestion and improves reliability", "It eliminates the need for termination resistors"],
    correctIndex: 1,
    explanation: "Segmentation breaks large networks into smaller sections, reducing data traffic on each segment and isolating faults. This improves communication speed and system reliability."
  },
  {
    id: "high-latency-cause",
    question: "What is one common cause of high latency on a BMS network?",
    options: ["Using shielded cables", "Proper cable termination", "Too many devices on a single bus segment"],
    correctIndex: 2,
    explanation: "Having too many devices on a single bus segment creates data bottlenecks, where devices must wait their turn to communicate. This increases response times and overall system latency."
  }
];

const faqs = [
  {
    question: "How do I know if network performance is acceptable?",
    answer: "Use a protocol analyser to measure actual response times. Life safety systems need <100ms, HVAC control <500ms, and monitoring <2 seconds. Test under peak load conditions."
  },
  {
    question: "What's the 75% rule for device counts?",
    answer: "To maintain reliable performance, limit device counts to 75% of maximum: 24 devices for Modbus RTU (32 max), 95 devices for BACnet MSTP (127 max). This allows headroom for expansion and peak loads."
  },
  {
    question: "When should I segment a network?",
    answer: "Segment when response times exceed targets, when device counts approach limits, or when geographic distances make single segments impractical. Plan segmentation during design - it's expensive to retrofit."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A BACnet MSTP network with 100 devices has slow response times. What is the BEST solution?",
  options: [
    "Increase the baud rate to 115200",
    "Segment the network into multiple smaller networks",
    "Replace all devices with newer models",
    "Add more termination resistors"
  ],
  correctAnswer: 1,
  explanation: "Segmenting the network into smaller sections (e.g., 4 x 25 devices) dramatically reduces token rotation time and improves response times. Increasing baud rate has limited effect, and adding termination resistors would cause problems."
  }
];

const BMSModule5Section6 = () => {
  useSEO({
    title: "Network Planning and Latency Management | BMS Course",
    description: "Learn network design, segmentation strategies, and latency management for building automation systems."
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/bms-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 5.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Network Planning and Latency Management
          </h1>
          <p className="text-white">
            Network design, segmentation strategies, and performance optimisation
          </p>
        </header>

        {/* Quick Summary */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Modbus RTU:</strong> Max 32 devices, 1200m cable</li>
              <li><strong>BACnet MSTP:</strong> Max 127 devices, segment at ~75</li>
              <li><strong>Key rule:</strong> Plan segmentation during design</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Slow response times = overloaded segment</li>
              <li><strong>Use:</strong> 75% rule for device counts</li>
              <li><strong>Test:</strong> Protocol analyser during commissioning</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Calculate device limits and cable lengths",
              "Design effective network segmentation",
              "Understand latency sources and solutions",
              "Test and verify network performance"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1: Network Planning Basics */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Network Planning Basics
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Network planning ensures all devices communicate efficiently. Poorly planned networks result in
              data clashes, long delays, or complete loss of control. Understanding technical limits is essential.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Device Limit Factors</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Electrical loading:</strong> Each device adds capacitance and resistance</li>
                <li><strong>Token passing time:</strong> More devices = longer communication cycle</li>
                <li><strong>Address space:</strong> Limited unique addresses available</li>
                <li><strong>Collision domain:</strong> More devices increase data conflict chance</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-blue-400/80 mb-2">Modbus RTU Limits</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Max 32 devices (electrical limit)</li>
                  <li>Addresses 1-247 (protocol limit)</li>
                  <li>Keep to 24 devices for reliability</li>
                  <li>~30ms polling time per device</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-green-400/80 mb-2">BACnet MSTP Limits</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Max 127 devices per segment</li>
                  <li>Best performance at 50-75 devices</li>
                  <li>Segment at 100 devices</li>
                  <li>~5-20ms per device in rotation</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-orange-400/80 mb-2">RS-485 Cable Length Formula</p>
              <p className="text-sm text-white font-mono mb-2">Max Length = 120,000 / Baud Rate (metres)</p>
              <div className="grid grid-cols-3 gap-3 text-center text-sm">
                <div className="p-3 rounded bg-transparent border border-white/10">
                  <p className="font-medium text-red-400/80 mb-1">9600 baud</p>
                  <p className="text-white text-xs">Max: 1200m</p>
                </div>
                <div className="p-3 rounded bg-transparent border border-white/10">
                  <p className="font-medium text-elec-yellow/80 mb-1">19200 baud</p>
                  <p className="text-white text-xs">Max: 600m</p>
                </div>
                <div className="p-3 rounded bg-transparent border border-white/10">
                  <p className="font-medium text-blue-400/80 mb-1">38400 baud</p>
                  <p className="text-white text-xs">Max: 300m</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">RS-485 Daisy Chain Rules</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Single continuous cable from first to last device</li>
                <li>120Ω termination resistors at both ends only</li>
                <li>No stubs longer than 300mm</li>
                <li>Never use star wiring (causes reflections)</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Network Segmentation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Network Segmentation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Segmentation means breaking a large network into smaller, manageable sections.
              This approach provides multiple benefits for BMS performance and reliability.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-2">Before Segmentation (100 devices)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Token rotation: 100 x 45ms = 4.5s</li>
                  <li>Each device waits 4.5s between comms</li>
                  <li>Critical alarms delayed up to 4.5s</li>
                  <li>System appears "sluggish"</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-green-400/80 mb-2">After Segmentation (4 x 25)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Token rotation: 25 x 45ms = 1.125s</li>
                  <li>4x faster response per segment</li>
                  <li>Alarms respond in ~1 second</li>
                  <li>System feels responsive</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Segmentation Approaches</p>
              <div className="grid grid-cols-3 gap-3 text-center text-sm">
                <div className="p-3 rounded bg-transparent border border-white/10">
                  <p className="font-medium text-blue-400/80 mb-1">Geographic</p>
                  <p className="text-white text-xs">By floor, zone, plant room</p>
                </div>
                <div className="p-3 rounded bg-transparent border border-white/10">
                  <p className="font-medium text-green-400/80 mb-1">Functional</p>
                  <p className="text-white text-xs">By system type (AHU, VAV)</p>
                </div>
                <div className="p-3 rounded bg-transparent border border-white/10">
                  <p className="font-medium text-purple-400/80 mb-1">Hybrid</p>
                  <p className="text-white text-xs">Combined approach</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Segmentation Design Steps</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>1.</strong> Device inventory - count by type and location</li>
                <li><strong>2.</strong> Calculate segment loading - apply 75% rule</li>
                <li><strong>3.</strong> Design topology - group logically, plan cable routes</li>
                <li><strong>4.</strong> Validate and document - verify requirements met</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-blue-400/80 mb-2">Reliability Benefits</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Single segment failure = 100% system down</li>
                <li>Four segment failure = only 25% affected</li>
                <li>Fault diagnostic time reduced by 85%</li>
                <li>System availability: 95% vs 99.2%</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Latency Management */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Latency Management
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Latency is the delay between sending a message and receiving a response. In BMS, high latency
              means commands take too long to action - critical for life safety systems.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Safety Critical Warning</p>
              <p className="text-sm text-white">
                High latency in life safety systems can be dangerous. Fire dampers must respond within seconds.
                BS EN 54 requires fire safety system response times under 10 seconds.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Latency Components</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-white mb-1">Network Access Time</p>
                  <p className="text-sm text-white">Time to gain network access (token passing). Increases linearly with device count.</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-white mb-1">Processing Time</p>
                  <p className="text-sm text-white">Device CPU processing. 5-20ms simple devices, 100ms+ complex controllers.</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-white mb-1">Transmission Time</p>
                  <p className="text-sm text-white">Physical data transmission. ~1ms per 10 characters at 9600 baud.</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-white mb-1">Physical Response</p>
                  <p className="text-sm text-white">Actuator movement. Dampers 15-90s, valves 30-300s typical.</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent border border-red-400/30">
                <p className="font-medium text-red-400/80 mb-1">Life Safety</p>
                <p className="text-white text-xs">&lt;100ms target</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-elec-yellow/30">
                <p className="font-medium text-elec-yellow/80 mb-1">HVAC Control</p>
                <p className="text-white text-xs">&lt;500ms target</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-green-400/30">
                <p className="font-medium text-green-400/80 mb-1">Monitoring</p>
                <p className="text-white text-xs">&lt;2 seconds target</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-2">Common Causes</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Network overloading (too many devices)</li>
                  <li>Electromagnetic interference (EMI)</li>
                  <li>Shared bandwidth with IT traffic</li>
                  <li>Poor cable installation</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-green-400/80 mb-2">Solutions</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Segment at 75% of device limits</li>
                  <li>Use managed switches with QoS</li>
                  <li>Dedicated VLANs for BMS traffic</li>
                  <li>Proper shielding and separation</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-orange-400/80 mb-2">Testing Methodology</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>1.</strong> Baseline testing - minimal load response times</li>
                <li><strong>2.</strong> Load testing - add devices, measure impact</li>
                <li><strong>3.</strong> Stress testing - maximum load conditions</li>
                <li><strong>4.</strong> EMI testing - near noise sources</li>
                <li><strong>5.</strong> Documentation - record all results</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* FAQ Section */}
        <section className="mb-10 mt-10">
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
        <div className="mt-6 p-5 rounded-lg bg-transparent border border-white/10">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">Device Limits (75% Rule)</p>
              <ul className="space-y-0.5">
                <li>Modbus RTU: 24 devices</li>
                <li>BACnet MSTP: 95 devices</li>
                <li>RS-485: 1200m at 9600 baud</li>
                <li>Ethernet: 100m per segment</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Latency Targets</p>
              <ul className="space-y-0.5">
                <li>Life safety: &lt;100ms</li>
                <li>HVAC control: &lt;500ms</li>
                <li>Monitoring: &lt;2 seconds</li>
                <li>Test: 95% must meet target</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz */}
        <section className="mb-10 mt-10">
          <SingleQuestionQuiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bms-module-5-section-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Gateways
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bms-module-6">
              Next: Module 6
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BMSModule5Section6;