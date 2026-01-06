import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "alarm-priorities-purpose",
    question: "Why must alarms be prioritised instead of treating all events the same?",
    options: [
      "To reduce the total number of alarms generated",
      "To ensure critical safety issues receive immediate attention while minor issues are handled appropriately",
      "To make all alarms trigger faster"
    ],
    correctIndex: 1,
    explanation: "Without prioritisation, operators become overwhelmed with low-level alerts and false alarms, potentially causing them to miss critical safety issues that require immediate action."
  },
  {
    id: "escalation-purpose",
    question: "What is the purpose of escalation in alarm management?",
    options: [
      "To make alarms louder over time",
      "To ensure unacknowledged alarms are pushed to higher responsibility levels until resolved",
      "To automatically fix the problem"
    ],
    correctIndex: 1,
    explanation: "Escalation ensures that alarms are not ignored by pushing unacknowledged alerts to supervisors, maintenance teams, and management until the issue is resolved."
  },
  {
    id: "alarm-circuit-labelling",
    question: "Why should alarm circuits always be clearly labelled?",
    options: [
      "To meet colour coding requirements only",
      "To make installation faster",
      "To prevent confusion between different alarm types (fire, fault, status) during emergencies"
    ],
    correctIndex: 2,
    explanation: "Clear labelling prevents confusion during installation, maintenance, and troubleshooting. During an emergency at 3am, clear labels help technicians quickly identify the right circuit."
  }
];

const faqs = [
  {
    question: "What's the difference between alarm suppression and alarm shelving?",
    answer: "Alarm suppression temporarily disables alarms during maintenance or known system states. Alarm shelving temporarily removes alarms from active monitoring while maintaining logging. Both require time limits and management approval for safety-critical alarms."
  },
  {
    question: "Why use normally-closed (NC) contacts for critical alarms?",
    answer: "NC contacts provide fail-safe operation. If a wire breaks or connection fails, the circuit opens and generates an alarm. With normally-open contacts, a broken wire would result in no alarm - a dangerous failure mode for critical systems."
  },
  {
    question: "How often should alarm systems be tested?",
    answer: "Monthly testing for critical alarm points and escalation notifications. Annual comprehensive testing including full end-to-end testing, sensor calibration, and contact database updates. Fire alarm integration testing must meet BS 5839 requirements."
  }
];

const quizQuestion = {
  question: "A hospital boiler fault alarm was configured as 'low priority' and operators ignored it during the night shift. What does this scenario demonstrate?",
  options: [
    "The BMS was working correctly",
    "Alarm priorities and escalation must be configured correctly to prevent dangerous oversights",
    "Operators should acknowledge all alarms regardless of priority",
    "Boiler alarms are always minor issues"
  ],
  correctAnswer: 1,
  explanation: "The scenario demonstrates why correct alarm prioritisation is critical. The boiler locked out by morning, causing heating loss across hospital wards. After reprogramming priorities and adding escalation logic, critical plant alarms were pushed to on-call engineers' phones."
};

const BMSModule6Section1 = () => {
  useSEO({
    title: "BMS Alarm Priorities and Escalation Logic | Module 6.1",
    description: "Learn alarm management and escalation procedures for Building Management Systems including prioritisation, testing, and the electrician's role."
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../bms-module-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 6.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Alarm Priorities and Escalation Logic
          </h1>
          <p className="text-white/80">
            Managing BMS alarms effectively for safety and reliability
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Critical:</strong> Life safety - immediate action (fire, overpressure)</li>
              <li><strong>Major:</strong> Significant impact - prompt attention (AHU failure)</li>
              <li><strong>Minor:</strong> Maintenance items - log for later (filter dirty)</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Alarm panel colour coding and priority levels</li>
              <li><strong>Use:</strong> NC contacts for fail-safe critical alarms</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the purpose of alarm priorities in a BMS",
              "Describe escalation logic and why it is critical",
              "Recognise the electrician's role in installing and testing alarm signals",
              "Apply best practices for ensuring alarm reliability and clarity"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1: Introduction */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Why Alarm Management Matters
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A Building Management System is not just about efficiency - it's also about <strong>safety and reliability</strong>. Alarms notify operators when conditions deviate from set limits, whether it's a rise in temperature, a failed fan, or a fire alarm trigger.
            </p>
            <p>
              However, <strong>not all alarms are equally important</strong>. A system that treats every event the same will overwhelm operators with false or low-level alerts.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-sm font-medium text-red-300 mb-2">The Problem</p>
                <p className="text-sm text-white/90">Systems without alarm priorities overwhelm operators with noise, potentially masking critical safety issues.</p>
              </div>
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <p className="text-sm font-medium text-green-300 mb-2">The Solution</p>
                <p className="text-sm text-white/90">Alarm priorities and escalation ensure critical alerts receive immediate attention while minor issues are logged appropriately.</p>
              </div>
            </div>

            <p>
              For electricians, this means ensuring alarm signals are wired correctly, relays are functioning, and devices trigger alarms in line with design intent.
            </p>
          </div>
        </section>

        {/* Section 2: Alarm Priorities */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Understanding Alarm Priorities
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Alarms are categorised by severity to help operators respond appropriately. Think of it like a hospital triage system - the most serious cases get immediate attention while less urgent matters can wait.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-sm font-medium text-red-300 mb-2">Critical Alarms (High Priority)</p>
                <p className="text-sm text-white/90">Life safety or system protection issues requiring immediate action. Examples: fire alarms, boiler overpressure, chiller failures. When you see a critical alarm, everything else stops.</p>
              </div>
              <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <p className="text-sm font-medium text-orange-300 mb-2">Major Alarms (Medium Priority)</p>
                <p className="text-sm text-white/90">Significant issues impacting comfort or efficiency requiring prompt attention. Examples: AHU fan failure, high CO2 levels. Need addressing within hours to prevent bigger problems.</p>
              </div>
              <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <p className="text-sm font-medium text-yellow-300 mb-2">Minor Alarms (Low Priority)</p>
                <p className="text-sm text-white/90">Maintenance-related issues that can be logged for later service. Examples: filter dirty warning, low battery in sensor. Can usually wait until next planned maintenance visit.</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <p className="text-sm font-medium text-blue-300 mb-2">Example in Practice</p>
              <p className="text-sm text-white/90">A fire alarm should override everything else. A "filter dirty" warning should not distract operators from responding to a fire.</p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 3: Escalation Logic */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Escalation Logic
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Escalation is like a safety net for your alarm system. It ensures that if an alarm is not acknowledged or acted upon, it automatically gets pushed to higher levels of responsibility until someone deals with it.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Typical escalation levels:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Level 1:</strong> Alarm appears on BMS dashboard for operator (15-30 min timer)</li>
                <li><strong>Level 2:</strong> Escalated to supervisor/maintenance via SMS or email</li>
                <li><strong>Level 3:</strong> For critical alarms - escalates to security, fire brigade, or site management</li>
              </ul>
            </div>

            <p>
              The beauty of escalation is that it creates accountability throughout the organisation. No one can claim they "didn't know" about a critical issue because the system keeps pushing it up the chain until someone takes action.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Electrician's Role */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Electrician's Role in Alarm Circuits
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              As an electrician, your role in alarm systems is critical for ensuring reliable operation. You're not just connecting wires - you're creating the nervous system that keeps buildings and people safe.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Tasks</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Correct wiring:</strong> Digital and analog inputs for alarm triggers</li>
                  <li><strong>Clear labelling:</strong> Mark circuits as fire, fault, or status</li>
                  <li><strong>Segregation:</strong> Keep alarm wiring separate from mains</li>
                  <li><strong>Fail-safe:</strong> Use NC circuits for critical alarms</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Testing Tasks</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Relay testing:</strong> Ensure signals reach the BMS</li>
                  <li><strong>Simulation:</strong> Trip faults to verify response</li>
                  <li><strong>End-to-end:</strong> Sensor to notification chain</li>
                  <li><strong>Documentation:</strong> Record all test results</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 5: Fire Alarm Integration */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Fire Alarm Integration
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Fire alarm integration is critical for life safety and requires special consideration in BMS design. Fire alarm systems must comply with BS 5839 standards.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key integration points:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Smoke extract fan activation</li>
                <li>HVAC system shutdown</li>
                <li>Door release mechanisms</li>
                <li>Lift recall to ground floor</li>
                <li>Emergency lighting activation</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <p className="text-sm font-medium text-yellow-300 mb-2">Critical Wiring Requirements</p>
              <p className="text-sm text-white/90">Fire alarm cables must be fire-resistant (FP200 or equivalent), use separate containment from standard BMS cabling, ensure all connections are accessible for testing, and use monitored inputs to detect cable faults.</p>
            </div>
          </div>
        </section>

        {/* Section 6: Troubleshooting */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Troubleshooting Common Issues
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-red-300 mb-2">Alarms Don't Trigger</p>
                <ul className="text-sm text-white/90 space-y-1">
                  <li>Check sensor wiring continuity</li>
                  <li>Verify input module configuration</li>
                  <li>Confirm alarm setpoints in software</li>
                  <li>Validate sensor calibration and range</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-orange-300 mb-2">Constant False Alarms</p>
                <ul className="text-sm text-white/90 space-y-1">
                  <li>Adjust alarm deadbands (typically 2-5% of span)</li>
                  <li>Check sensor mounting location</li>
                  <li>Verify environmental conditions match specs</li>
                  <li>Consider adding alarm delays for transient conditions</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-yellow-300 mb-2">No Escalation Notifications</p>
                <ul className="text-sm text-white/90 space-y-1">
                  <li>Check email/SMS gateway configuration</li>
                  <li>Test network connectivity</li>
                  <li>Verify contact database is accurate</li>
                  <li>Confirm escalation timer settings</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Best Practices */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Best Practices for Alarm Wiring
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Installation</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Segregation:</strong> Keep alarm wiring separate from mains</li>
                  <li><strong>Fail-safe:</strong> NC circuits for critical alarms</li>
                  <li><strong>Testing:</strong> Simulate real conditions during commissioning</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Documentation</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Clear alarm lists:</strong> In O&M manuals</li>
                  <li><strong>Escalation procedures:</strong> Documented for staff</li>
                  <li><strong>Cause and effect matrix:</strong> Complete and verified</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
              <p className="text-sm font-medium text-elec-yellow mb-2">During Commissioning</p>
              <ul className="text-sm text-white/90 space-y-1">
                <li>Trigger alarms manually and confirm correct priority display</li>
                <li>Check escalation timing and verify acknowledgment clears alarms</li>
                <li>Test fail-safe operation and validate cause and effect entries</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Real World Case Study */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Real World Example</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-sm font-medium text-red-300 mb-2">The Problem</p>
              <p className="text-sm text-white/90">At a hospital, a boiler fault alarm was configured as "low priority" rather than "critical." Operators ignored it during the night shift, assuming it wasn't urgent.</p>
            </div>
            <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
              <p className="text-sm font-medium text-orange-300 mb-2">The Impact</p>
              <p className="text-sm text-white/90">By morning, the boiler had locked out, and heating was lost across several wards, affecting patient care and comfort.</p>
            </div>
            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <p className="text-sm font-medium text-green-300 mb-2">The Solution</p>
              <p className="text-sm text-white/90">After reprogramming priorities and adding escalation logic, critical plant alarms were pushed to on-call engineers' phones, preventing repeat incidents.</p>
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
        <div className="mt-6 p-5 rounded-lg bg-transparent border border-white/10">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">Testing Schedule</p>
              <ul className="space-y-0.5">
                <li>Monthly: Critical alarm points, escalation notifications</li>
                <li>Annual: Full end-to-end, sensor calibration, contacts update</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Key Standards</p>
              <ul className="space-y-0.5">
                <li>BS 5839: Fire detection and alarm systems</li>
                <li>BS 7671: Electrical safety testing</li>
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
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../bms-module-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 6
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../bms-module-6-section-2">
              Next: Data Logging Methods
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BMSModule6Section1;
