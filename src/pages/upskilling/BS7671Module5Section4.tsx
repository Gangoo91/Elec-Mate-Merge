import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "isolation-purpose",
    question: "What is the main purpose of isolation in electrical systems?",
    options: [
      "To control lighting levels",
      "To provide complete disconnection from live supply for safe maintenance",
      "To improve system efficiency",
      "To reduce energy consumption"
    ],
    correctIndex: 1,
    explanation: "Isolation provides complete disconnection from live supply to ensure safety during maintenance work, preventing accidental energisation and protecting personnel from electric shock."
  },
  {
    id: "emergency-example",
    question: "Which is an example of emergency switching?",
    options: [
      "Routine maintenance disconnection",
      "Normal lighting control",
      "Immediate power disconnection during fire or electric shock emergency",
      "Seasonal equipment shutdown"
    ],
    correctIndex: 2,
    explanation: "Emergency switching provides immediate power disconnection in dangerous situations such as fire, electric shock, or other emergencies to prevent injury or damage."
  },
  {
    id: "labelling-importance",
    question: "Why is clear labelling of isolation points important?",
    options: [
      "For aesthetic purposes only",
      "To ensure correct identification and prevent accidental operation",
      "To comply with colour coding standards",
      "To reduce installation costs"
    ],
    correctIndex: 1,
    explanation: "Clear labelling ensures correct identification of isolation points, prevents operation of wrong devices, and enables quick location during emergencies or maintenance work."
  }
];

const faqs = [
  {
    question: "Can an MCB provide isolation?",
    answer: "Yes, when suitable. MCBs can provide isolation function if they have a clear OFF indication, lockable operating mechanism, and are appropriate for the system voltage. Always verify the MCB is marked as suitable for isolation."
  },
  {
    question: "What colour should emergency stop buttons be?",
    answer: "Emergency stop buttons must be red with a mushroom-head design. They should be located in prominent, easily accessible positions and operate in a fail-safe manner using normally closed contacts."
  },
  {
    question: "How often should emergency controls be tested?",
    answer: "Emergency switching devices should be tested regularly - typically monthly for high-risk environments and at least annually for general installations. Testing ensures reliability when needed most."
  },
  {
    question: "What is Lock Out Tag Out (LOTO)?",
    answer: "LOTO is a safety procedure ensuring equipment is properly isolated before maintenance. It involves locking the isolation device in the OFF position and attaching a tag identifying who locked it and why."
  }
];

const quizQuestion = {
  question: "Which switching function enables immediate disconnection during dangerous situations?",
  options: [
    "Isolation switching",
    "Mechanical maintenance switching",
    "Emergency switching",
    "Functional switching"
  ],
  correctAnswer: 2,
  explanation: "Emergency switching enables immediate disconnection in dangerous situations such as fire, electric shock, or equipment malfunction to prevent injury or damage."
};

const BS7671Module5Section4 = () => {
  useSEO({
    title: "Isolation, Switching & Emergency Controls | BS7671 Module 5.4",
    description: "Learn about isolation, switching off for mechanical maintenance, and emergency switching requirements per BS7671. Essential safety controls for electrical installations."
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
            <Link to="/electrician/upskilling/bs7671-module-5">
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
            <span>Module 5.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Isolation, Switching & Emergency Controls
          </h1>
          <p className="text-white/80">
            Essential safety controls for electrical installations
          </p>
        </header>

        {/* Quick Summary */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Isolation:</strong> Complete disconnection for safe maintenance</li>
              <li><strong>Mechanical maintenance:</strong> Controlled disconnect with LOTO</li>
              <li><strong>Emergency:</strong> Immediate disconnection in danger</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Requirements</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Isolators:</strong> Lockable, visible break indication</li>
              <li><strong>Emergency stops:</strong> Red, accessible, latching OFF</li>
              <li><strong>Labelling:</strong> Clear identification, durable</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Differences between isolation, mechanical maintenance, and emergency switching",
              "Types of switches and control devices for each function",
              "Legal and safety requirements for switching functions",
              "Labelling and accessibility requirements"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1: Switching Functions */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Types of Switching Functions
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS7671 defines three distinct switching functions, each with specific requirements and applications. Understanding the differences is essential for safe electrical installation design.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="font-medium text-elec-yellow mb-2">Isolation</p>
                <p className="text-sm text-white/90 mb-3">Complete disconnection for safe maintenance work</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>• Visible break or clear OFF indication</li>
                  <li>• Provision for locking in OFF</li>
                  <li>• Suitable fault current rating</li>
                  <li>• Accessible and clearly marked</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="font-medium text-orange-400 mb-2">Mechanical Maintenance</p>
                <p className="text-sm text-white/90 mb-3">Controlled disconnection with safety procedures</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>• Lock-off procedures (LOTO)</li>
                  <li>• Permit to work systems</li>
                  <li>• Warning notices and tags</li>
                  <li>• Authorised person controls</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="font-medium text-red-400 mb-2">Emergency Switching</p>
                <p className="text-sm text-white/90 mb-3">Immediate disconnection in dangerous situations</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>• Rapid operation capability</li>
                  <li>• Highly visible and accessible</li>
                  <li>• Red colour coding</li>
                  <li>• Latching OFF operation</li>
                </ul>
              </div>
            </div>

            <InlineCheck {...quickCheckQuestions[0]} />
          </div>
        </section>

        {/* Section 2: Switchgear Types */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Switchgear Types and Applications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Different switching devices suit specific functions based on their operating characteristics, current ratings, and ability to safely make and break electrical circuits.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Isolation Devices</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Isolator switches:</strong> OFF-load operation, visible break</li>
                  <li><strong>MCB/MCCB:</strong> Can provide isolation when suitable</li>
                  <li><strong>Fuse switches:</strong> Combined protection and isolation</li>
                  <li><strong>Plug/socket:</strong> Isolation for portable equipment</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Emergency Devices</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Emergency stops:</strong> Red mushroom-head buttons</li>
                  <li><strong>Fire-man's switches:</strong> External isolation for signs</li>
                  <li><strong>Trip switches:</strong> Rapid disconnection</li>
                  <li><strong>Safety relays:</strong> System integration</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Application Examples:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-sm">
                <div className="p-3 rounded bg-transparent border border-white/10">
                  <p className="font-medium text-white mb-1">Domestic</p>
                  <p className="text-white/90 text-xs">Consumer unit main switch, MCBs</p>
                </div>
                <div className="p-3 rounded bg-transparent border border-white/10">
                  <p className="font-medium text-white mb-1">Commercial</p>
                  <p className="text-white/90 text-xs">Distribution board isolators</p>
                </div>
                <div className="p-3 rounded bg-transparent border border-white/10">
                  <p className="font-medium text-white mb-1">Industrial</p>
                  <p className="text-white/90 text-xs">Motor control, emergency stops</p>
                </div>
                <div className="p-3 rounded bg-transparent border border-white/10">
                  <p className="font-medium text-white mb-1">Special</p>
                  <p className="text-white/90 text-xs">PV isolators, EV charging</p>
                </div>
              </div>
            </div>

            <InlineCheck {...quickCheckQuestions[1]} />
          </div>
        </section>

        {/* Section 3: Labelling and Accessibility */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Labelling and Accessibility
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper labelling and accessibility ensure switching devices can be located and operated quickly and safely, especially during emergencies.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Labelling Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Identification:</strong> Clear circuit or equipment ID</li>
                  <li><strong>Durable:</strong> Resistant to environment</li>
                  <li><strong>Legible:</strong> Appropriate text size and contrast</li>
                  <li><strong>Function:</strong> "ISOLATOR", "EMERGENCY STOP"</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Accessibility Standards</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Location:</strong> Easily accessible to authorised personnel</li>
                  <li><strong>Unobstructed:</strong> Clear access and operation</li>
                  <li><strong>Lighting:</strong> Adequate illumination for ID</li>
                  <li><strong>Emergency:</strong> Immediate access without tools</li>
                </ul>
              </div>
            </div>

            <InlineCheck {...quickCheckQuestions[2]} />
          </div>
        </section>

        {/* Section 4: Installation Locations */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Strategic Installation Locations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Switching devices must be strategically located at entrance points, near machinery, and in distribution boards to ensure effective control and safety.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Entrance & Origin</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Service entrance main isolator</li>
                  <li>Consumer unit main switch</li>
                  <li>Distribution board isolators</li>
                  <li>Sub-main disconnection points</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Equipment Areas</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Within sight of equipment</li>
                  <li>Motor control panels</li>
                  <li>Production line stops</li>
                  <li>Process equipment</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Emergency Points</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Kitchen/catering areas</li>
                  <li>Laboratories and workshops</li>
                  <li>Swimming pool plant rooms</li>
                  <li>High-risk industrial processes</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-transparent border border-white/10">
              <p className="text-sm font-medium text-white mb-2">Standard Installation Heights</p>
              <ul className="text-sm text-white/90 space-y-1">
                <li><strong>General switches:</strong> 0.45m - 1.2m above floor</li>
                <li><strong>Distribution boards:</strong> Centre at 1.4m - 1.8m</li>
                <li><strong>Emergency stops:</strong> 0.8m - 1.7m (accessible range)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Real World Scenario */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Real World Application</h2>
          <div className="p-5 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
            <h3 className="text-sm font-medium text-elec-yellow mb-3">Commercial Kitchen Emergency Control System</h3>
            <p className="text-sm text-white/90 leading-relaxed mb-4">
              In a commercial kitchen, emergency stop buttons are installed near cooking equipment and at exit points. During a fire risk event, staff activate the emergency stop to isolate circuits, cutting power to ovens, fryers, and extraction systems.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white/80">
              <div>
                <p className="font-medium text-white mb-1">Risk Assessment</p>
                <p>High fire risk from cooking equipment, hot oil, and gas supplies requiring immediate power disconnection capability.</p>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Solution</p>
                <p>Red mushroom-head emergency stops at three locations connected to safety relay system with clear labelling and staff training.</p>
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
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference */}
        <div className="mt-6 p-5 rounded-lg bg-transparent border border-white/10">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-3 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">Isolation</p>
              <ul className="space-y-0.5 text-white/80">
                <li>• OFF-load operation</li>
                <li>• Visible break indication</li>
                <li>• Lockable in OFF position</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Mechanical Maintenance</p>
              <ul className="space-y-0.5 text-white/80">
                <li>• LOTO procedures</li>
                <li>• Permit to work</li>
                <li>• Warning notices</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Emergency Switching</p>
              <ul className="space-y-0.5 text-white/80">
                <li>• Immediate operation</li>
                <li>• Red colour coding</li>
                <li>• Latching OFF</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz */}
        <section className="mb-10 mt-10">
          <SingleQuestionQuiz
            question={quizQuestion.question}
            options={quizQuestion.options}
            correctAnswer={quizQuestion.correctAnswer}
            explanation={quizQuestion.explanation}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/bs7671-module-5-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/bs7671-module-5-section-5">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BS7671Module5Section4;
