import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "emergencylighting-m4s5-check1",
    question: "What standard covers automatic testing systems for emergency lighting?",
    options: ["BS 5266-1 only", "BS 5266-8", "BS 7671 only", "Building Regulations"],
    correctIndex: 1,
    explanation: "BS 5266-8 specifically covers automatic testing systems (ATES) for emergency lighting. It defines requirements for systems that automatically perform functional and duration tests."
  },
  {
    id: "emergencylighting-m4s5-check2",
    question: "What is the main advantage of automatic testing systems?",
    options: ["Lower initial cost", "No manual intervention needed", "Higher light output", "Longer battery life"],
    correctIndex: 1,
    explanation: "Automatic testing systems perform scheduled tests without manual intervention, ensuring consistent compliance and freeing maintenance staff from routine testing tasks. Results are logged automatically."
  },
  {
    id: "emergencylighting-m4s5-check3",
    question: "How do DALI emergency lighting systems communicate?",
    options: ["WiFi only", "Digital addressable signals", "Infrared", "Bluetooth only"],
    correctIndex: 1,
    explanation: "DALI (Digital Addressable Lighting Interface) uses digital signals over dedicated control wiring to communicate with individual luminaires. Each luminaire has a unique address for monitoring and control."
  }
];

const faqs = [
  {
    question: "Can automatic testing replace manual log book records?",
    answer: "Yes, BS 5266-8 compliant systems can replace paper log books. The system must record all test results with date, time, and any failures. Printouts or electronic records must be available for inspection."
  },
  {
    question: "What happens when an automatic test detects a fault?",
    answer: "The system generates an alert (indicator light, message, or remote notification) identifying the faulty luminaire. Some systems automatically schedule re-tests and can integrate with building management systems."
  },
  {
    question: "Do all luminaires need to be addressable for remote monitoring?",
    answer: "For comprehensive monitoring, yes. However, group monitoring is possible with simpler systems where multiple luminaires report collectively. Full DALI systems provide individual luminaire status."
  },
  {
    question: "What's the difference between DALI and self-test luminaires?",
    answer: "Self-test luminaires perform tests locally with LED indicators showing pass/fail. DALI emergency luminaires can be monitored and controlled centrally, with results logged automatically. DALI offers more comprehensive management."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A large office building requires emergency lighting that can be monitored centrally with individual luminaire fault identification. What system is most suitable?",
  options: [
    "Self-contained with local test buttons",
    "Central battery with manual testing",
    "DALI emergency lighting system",
    "Basic self-test luminaires"
  ],
  correctAnswer: 2,
  explanation: "DALI emergency lighting systems provide individual luminaire addressing, central monitoring, automatic testing, and fault identification. This is ideal for large buildings requiring comprehensive management."
  }
];

const EmergencyLightingModule4Section5 = () => {
  useSEO({
    title: "Remote Testing and Monitoring | Emergency Lighting Module 4.5",
    description: "Automatic testing systems, DALI emergency lighting, BS 5266-8 compliance, and modern maintenance solutions for emergency lighting."
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
            <Link to="../emergency-lighting-module-4">
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
            <span>Module 4.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Remote Testing and Monitoring Systems
          </h1>
          <p className="text-white/80">
            Modern automated testing and compliance solutions
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>ATES:</strong> Automatic test systems</li>
              <li><strong>BS 5266-8:</strong> Testing standard</li>
              <li><strong>DALI:</strong> Digital addressable control</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Benefits</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Automated:</strong> No manual intervention</li>
              <li><strong>Logged:</strong> Automatic record keeping</li>
              <li><strong>Alerts:</strong> Fault identification</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand automatic testing systems",
              "Apply BS 5266-8 requirements",
              "Configure DALI emergency lighting",
              "Set up remote monitoring",
              "Interpret test results",
              "Manage fault notifications"
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
            Automatic Testing Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Automatic testing systems (ATES) perform scheduled functional and duration
              tests without manual intervention, recording results for compliance evidence.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">System Features</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Scheduled functional tests</li>
                  <li>Automatic duration tests</li>
                  <li>Result logging and storage</li>
                  <li>Fault detection and alerts</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">BS 5266-8 Types</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Type A: Automatic test + central</li>
                  <li>Type B: Automatic test + local</li>
                  <li>Type C: Automatic test - no report</li>
                  <li>Type D: Self-test individual</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Monthly</p>
                <p className="text-white/90 text-xs">Functional test</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Annual</p>
                <p className="text-white/90 text-xs">Duration test</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Logged</p>
                <p className="text-white/90 text-xs">Automatic records</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            DALI Emergency Lighting
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              DALI (Digital Addressable Lighting Interface) provides sophisticated
              control and monitoring of emergency luminaires through digital communication.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">DALI Emergency Features:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Individual addressing:</strong> Each luminaire uniquely identified</li>
                <li><strong>Status reporting:</strong> Lamp, battery, charger status</li>
                <li><strong>Remote testing:</strong> Tests initiated from central controller</li>
                <li><strong>Automatic scheduling:</strong> Tests run at programmed times</li>
                <li><strong>Result logging:</strong> Full compliance documentation</li>
              </ul>
            </div>

            <p>
              DALI emergency systems typically use the DALI-2 emergency standard (IEC 62386-202)
              for interoperability between different manufacturer's products.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Monitoring and Fault Management
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Remote monitoring enables real-time visibility of system status and
              immediate notification of faults, improving response times.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Monitoring Capabilities</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Real-time luminaire status</li>
                  <li>Battery health monitoring</li>
                  <li>Test schedule tracking</li>
                  <li>Compliance dashboard</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fault Notifications</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Email/SMS alerts</li>
                  <li>BMS integration</li>
                  <li>Mobile app access</li>
                  <li>Maintenance scheduling</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">System Selection Factors</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Building size and complexity</li>
                <li>Number of luminaires to monitor</li>
                <li>Maintenance team capability</li>
                <li>Integration with BMS required</li>
                <li>Budget for monitoring infrastructure</li>
                <li>Future expansion plans</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Implementation Errors</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>No alert response:</strong> — Faults reported but not actioned</li>
                <li><strong>Wrong test times:</strong> — Tests during occupied hours</li>
                <li><strong>Missing configuration:</strong> — System not fully commissioned</li>
                <li><strong>Poor documentation:</strong> — Test records not reviewed</li>
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
              <p className="font-medium text-white mb-1">Testing Systems</p>
              <ul className="space-y-0.5">
                <li>BS 5266-8 compliance</li>
                <li>Types A, B, C, D</li>
                <li>Automatic scheduling</li>
                <li>Result logging</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">DALI Emergency</p>
              <ul className="space-y-0.5">
                <li>Individual addressing</li>
                <li>IEC 62386-202</li>
                <li>Remote monitoring</li>
                <li>BMS integration</li>
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
            <Link to="../emergency-lighting-module-4-section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../emergency-lighting-module-5-section-1">
              Next Module
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EmergencyLightingModule4Section5;