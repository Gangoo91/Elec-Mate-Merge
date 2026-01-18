import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import { bmsModule4Section3QuizData } from "@/data/upskilling/bmsModule4Section3QuizData";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "access-bms-integration",
    question: "What is one key benefit of integrating access control with a BMS?",
    options: [
      "Reduced door hardware costs",
      "Automatic energy management based on occupancy",
      "Elimination of key management",
      "Faster door opening speeds"
    ],
    correctIndex: 1,
    explanation: "When access control integrates with BMS, badge events can trigger automatic energy management - lighting, HVAC, and equipment activation based on actual occupancy, achieving significant energy savings while maintaining comfort."
  },
  {
    id: "fail-safe-vs-secure",
    question: "What does 'fail-safe' mean for an electromagnetic lock?",
    options: [
      "The lock engages more firmly when power fails",
      "The lock releases and door unlocks when power is removed",
      "The lock has a backup battery",
      "The lock cannot be bypassed"
    ],
    correctIndex: 1,
    explanation: "A fail-safe lock releases when power is removed, allowing the door to open. This is critical for fire exits and escape routes where people must be able to evacuate during power failures."
  },
  {
    id: "fire-alarm-integration",
    question: "Why must access-controlled fire exits integrate with the fire alarm system?",
    options: [
      "To prevent false alarms",
      "To automatically unlock during fire evacuation",
      "To reduce power consumption",
      "To simplify installation"
    ],
    correctIndex: 1,
    explanation: "Fire exits with access control must integrate with fire alarm panels to automatically unlock during emergencies, ensuring clear evacuation routes. This is a legal requirement under BS 7273-4."
  },
  {
    id: "maglock-power",
    question: "What typical power supply do electromagnetic locks require?",
    options: [
      "230V AC mains supply",
      "12V or 24V DC",
      "48V DC PoE",
      "5V USB"
    ],
    correctIndex: 1,
    explanation: "Electromagnetic locks typically operate on 12V or 24V DC, supplied from dedicated access control power supplies with battery backup. This low voltage ensures safety and allows integration with standard access control systems."
  }
];

const faqs = [
  {
    question: "What is the difference between fail-safe and fail-secure locks?",
    answer: "Fail-safe locks release (unlock) when power is removed - used on fire exits. Fail-secure locks remain engaged (locked) when power is removed - used for high-security areas like server rooms. The choice is often mandated by fire regulations."
  },
  {
    question: "What cable is used for access control door hardware?",
    answer: "Typically 4-core or 6-core alarm cable for simple locks, with additional cores for door contacts, request-to-exit buttons, and monitoring. CAT6 is increasingly used for IP-based readers. All cables must be fire-rated where required."
  },
  {
    question: "How does anti-passback work?",
    answer: "Anti-passback prevents a card from being used to enter an area if it hasn't first been used to exit. This prevents card sharing and ensures accurate occupancy counts. Hard anti-passback denies entry; soft anti-passback logs violations but allows access."
  },
  {
    question: "What testing is required for fire alarm integration?",
    answer: "Monthly fire alarm tests must verify that access-controlled fire exits release correctly. Annual full system tests should include all doors. Results must be documented in the fire safety logbook for compliance."
  }
];

const BMSModule4Section3 = () => {
  useSEO({
    title: "Access Control Basics and Door Relays | BMS Module 4.3",
    description: "Master access control integration with BMS. Learn door relay wiring, electromagnetic locks, fail-safe/fail-secure operation, fire alarm integration, and security system commissioning."
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/bms-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 4.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Access Control Basics and Door Relays
          </h1>
          <p className="text-white">
            Security integration and door control systems in BMS
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Access Control:</strong> Card readers, door locks, BMS integration</li>
              <li><strong>Door Relays:</strong> Interface between control and lock hardware</li>
              <li><strong>Fail-Safe:</strong> Unlocks when power removed (fire exits)</li>
              <li><strong>Integration:</strong> Energy saving, security, fire systems</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Maglocks, card readers, door release buttons</li>
              <li><strong>Use:</strong> Controlled entry, energy management, audit trails</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Access control system fundamentals",
              "Door relay operation and wiring",
              "Lock types and failure modes",
              "Fire alarm integration requirements",
              "BMS integration benefits",
              "Security system architecture",
              "Commissioning and testing procedures",
              "Compliance and safety standards"
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
            Access Control in BMS Integration
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Access control systems restrict and monitor movement through buildings. When integrated with BMS, they
              become intelligent operational tools that manage energy, security, and compliance simultaneously.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BMS Integration Capabilities:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Energy Management:</strong> Badge-in triggers lighting/HVAC (30% savings)</li>
                <li><strong>Security:</strong> Automated alarm and CCTV triggering</li>
                <li><strong>Audit Trails:</strong> Comprehensive access logging for compliance</li>
                <li><strong>Time Recording:</strong> Badge events double as time tracking</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Badge-In Triggers</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Floor lighting to occupied mode</li>
                  <li>HVAC setpoint adjustment</li>
                  <li>Desk booking system activation</li>
                  <li>Security camera recording</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Advanced Features</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Predictive pre-conditioning</li>
                  <li>Personal climate preferences</li>
                  <li>Calendar integration</li>
                  <li>Space utilisation analytics</li>
                </ul>
              </div>
            </div>

            <InlineCheck {...quickCheckQuestions[0]} />
          </div>
        </section>

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Door Relays and Locking Mechanisms
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Door relays interface between electronic access control and physical security. They receive low-voltage
              control signals and switch higher-power circuits that operate locks, strikes, and security hardware.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Lock Technologies:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Electromagnetic (Maglocks):</strong> 12/24V DC, 300-500kg holding, fail-safe</li>
                <li><strong>Electric Strikes:</strong> 12V DC, frame-mounted, configurable fail mode</li>
                <li><strong>Electric Mortice:</strong> 12V motor, 1000kg+, highest security</li>
                <li><strong>Electrified Hardware:</strong> Built into panic bars, hinges</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fail-Safe (Fire Exits)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Unlocks when power removed</li>
                  <li>Required for escape routes</li>
                  <li>UPS needed for security</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="text-sm font-medium text-red-400/80 mb-2">Fail-Secure (High Security)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Stays locked when power removed</li>
                  <li>For server rooms, vaults</li>
                  <li>Manual override essential</li>
                </ul>
              </div>
            </div>

            <InlineCheck {...quickCheckQuestions[1]} />
          </div>
        </section>

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Fire Alarm and Safety Integration
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Access-controlled doors on fire escape routes must integrate with fire alarm systems to ensure automatic
              unlocking during emergencies. This is a legal requirement under BS 7273-4.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fire Integration Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Automatic Release:</strong> Fire alarm triggers door unlock</li>
                <li><strong>Hardwired:</strong> Fire panel outputs to access control relays</li>
                <li><strong>Override:</strong> Fire service key switches for emergency access</li>
                <li><strong>Testing:</strong> Monthly verification with documentation</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Critical Compliance Points:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>BS 7273-4 for fire door release</li>
                <li>BS 5839-1 for fire detection integration</li>
                <li>Monthly testing mandatory</li>
                <li>Fire safety logbook documentation</li>
              </ul>
            </div>

            <InlineCheck {...quickCheckQuestions[2]} />
          </div>
        </section>

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Wiring and Installation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper wiring ensures reliable operation and safety compliance. Access control circuits typically use
              low-voltage DC power with separate control and monitoring conductors.
            </p>

            <div className="grid sm:grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">300kg Maglock</p>
                <p className="text-white text-xs">12/24V DC, 0.5A, 2-4 core</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Electric Strike</p>
                <p className="text-white text-xs">12V DC, 0.2A, 2 core min</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Mortice Lock</p>
                <p className="text-white text-xs">12V DC, 0.8A, 4 core min</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Wiring Best Practices:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Fire-rated cables where required</li>
                <li>Separate power and data conductors</li>
                <li>Door contacts for monitoring</li>
                <li>Request-to-exit (REX) buttons</li>
                <li>End-of-line resistors for supervision</li>
              </ul>
            </div>

            <InlineCheck {...quickCheckQuestions[3]} />
          </div>
        </section>

        {/* Case Study */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Case Study: Corporate HQ Integration</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white">
                <strong>Project:</strong> Corporate headquarters integrated access control with BMS for comprehensive
                building automation. Employee badge events trigger personalised environment settings throughout the building.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 text-sm text-white">
              <div>
                <p className="font-medium text-elec-yellow/80 mb-2">Badge-In Triggers</p>
                <ul className="space-y-1">
                  <li>Personalised lighting scenes</li>
                  <li>HVAC to preferred temperatures</li>
                  <li>Meeting room booking</li>
                  <li>VIP arrival notifications</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-elec-yellow/80 mb-2">Results Achieved</p>
                <ul className="space-y-1">
                  <li>35% reduction in energy costs</li>
                  <li>Improved employee satisfaction</li>
                  <li>Complete audit trail compliance</li>
                  <li>Seamless security integration</li>
                </ul>
              </div>
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
        <div className="mt-6 p-5 rounded-lg bg-transparent border border-white/10">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">Lock Failure Modes</p>
              <ul className="space-y-0.5">
                <li>Fail-safe: Fire exits (unlocks)</li>
                <li>Fail-secure: High security (stays locked)</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Key Standards</p>
              <ul className="space-y-0.5">
                <li>BS 7273-4: Fire door release</li>
                <li>BS 5839-1: Fire detection</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <section className="mb-10 mt-12">
          <SingleQuestionQuiz
            title="Test Your Knowledge"
            questions={bmsModule4Section3QuizData}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bms-module-4-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bms-module-4-section-4">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BMSModule4Section3;
