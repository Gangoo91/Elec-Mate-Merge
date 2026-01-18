import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Earth Fault Monitoring - Fire Alarm Module 4 Section 5";
const DESCRIPTION = "Learn about earth fault monitoring requirements, fault location methods, insulation resistance testing and troubleshooting for BS 5839-1 fire alarm systems.";

const quickCheckQuestions = [
  {
    id: "earth-fault-effect",
    question: "Earth faults can:",
    options: [
      "Improve performance",
      "Cause false alarms or system malfunction",
      "Be ignored",
      "Only affect chargers"
    ],
    correctIndex: 1,
    explanation: "Earth faults can disrupt correct operation, cause false alarms or prevent proper fault indication."
  },
  {
    id: "ir-minimum",
    question: "Typical IR measurement for fire alarm circuits expects values of:",
    options: [
      "Less than 10k ohms",
      "At least 2M ohms to earth, higher preferred",
      "Exactly 1 ohm",
      "Below 100 ohms"
    ],
    correctIndex: 1,
    explanation: "Maintain high insulation values, minimum 2M ohms, to earth to ensure correct operation."
  },
  {
    id: "fault-location",
    question: "Tracking down an earth fault is best done by:",
    options: [
      "Ignoring it until it clears",
      "Systematic disconnection/reconnection to isolate the faulty section",
      "Replacing the entire system",
      "Waiting for a second fault"
    ],
    correctIndex: 1,
    explanation: "Use divide-and-conquer: disconnect sections systematically to narrow down the fault location."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Earth faults can:",
    options: ["Improve performance", "Cause false alarms or system malfunction", "Be ignored", "Only affect chargers"],
    correctAnswer: 1,
    explanation: "Earth faults can disrupt correct operation, cause false alarms or prevent proper fault indication."
  },
  {
    id: 2,
    question: "Typical IR measurement for fire alarm circuits expects values of:",
    options: ["Less than 10k ohms", "At least 2M ohms to earth, higher preferred", "Exactly 1 ohm", "Below 100 ohms"],
    correctAnswer: 1,
    explanation: "Maintain high insulation values, minimum 2M ohms, to earth to ensure correct operation."
  },
  {
    id: 3,
    question: "Earth fault indication should be:",
    options: ["Hidden from operators", "Clearly displayed at the CIE", "Only recorded internally", "Ignored unless multiple"],
    correctAnswer: 1,
    explanation: "Faults must be clearly indicated so they can be investigated and rectified promptly."
  },
  {
    id: 4,
    question: "The minimum insulation resistance for fire alarm circuits per BS 5839-1 is typically:",
    options: ["100 ohms", "1k ohms", "2M ohms to earth", "100M ohms"],
    correctAnswer: 2,
    explanation: "BS 5839-1 expects at least 2M ohms insulation resistance between circuits and earth to ensure reliable operation."
  },
  {
    id: 5,
    question: "Earth fault monitoring in modern panels typically:",
    options: ["Only checks at commissioning", "Continuously monitors circuit insulation", "Requires external equipment", "Checks once per year"],
    correctAnswer: 1,
    explanation: "Modern panels have built-in earth fault monitoring that continuously checks insulation to earth."
  },
  {
    id: 6,
    question: "Tracking down an earth fault is best done by:",
    options: ["Ignoring it until it clears", "Systematic disconnection/reconnection to isolate the faulty section", "Replacing the entire system", "Waiting for a second fault"],
    correctAnswer: 1,
    explanation: "Use divide-and-conquer: disconnect sections systematically to narrow down the fault location."
  },
  {
    id: 7,
    question: "Water ingress commonly causes earth faults at:",
    options: ["Battery terminals only", "Field devices, junction boxes and cable entries", "The control panel display", "Nowhere specific"],
    correctAnswer: 1,
    explanation: "Water enters at devices and connection points, reducing insulation resistance and causing earth faults."
  },
  {
    id: 8,
    question: "When testing IR during commissioning, you should:",
    options: ["Ignore manufacturer limits", "Record readings and compare to minimum standards and manufacturer data", "Only test the supply cable", "Use mains voltage for testing"],
    correctAnswer: 1,
    explanation: "Record all readings, compare against minimum 2M ohms and any manufacturer-specific requirements."
  },
  {
    id: 9,
    question: "An intermittent earth fault might be caused by:",
    options: ["A permanent short circuit", "Moisture, loose connections or damaged insulation that varies with conditions", "Correct installation", "High-quality materials"],
    correctAnswer: 1,
    explanation: "Intermittent faults often relate to environmental conditions (humidity, temperature) affecting marginal insulation."
  },
  {
    id: 10,
    question: "Split earth monitoring reports:",
    options: ["Overall system health only", "Earth faults on positive and negative circuits separately", "Battery voltage", "Loop addresses"],
    correctAnswer: 1,
    explanation: "Split monitoring helps identify which side of the circuit has the fault for faster diagnosis."
  }
];

const faqs = [
  {
    question: "Can I ignore an earth fault if the system still works?",
    answer: "No - the system is compromised and a second fault could cause serious malfunction. Investigate promptly."
  },
  {
    question: "What IR test voltage should I use?",
    answer: "Typically 500V DC unless the manufacturer specifies otherwise. Disconnect sensitive electronics first."
  },
  {
    question: "How do I test IR with devices connected?",
    answer: "Generally you should disconnect devices or test at the panel with circuits isolated. Follow manufacturer guidance."
  },
  {
    question: "What causes intermittent earth faults?",
    answer: "Usually moisture-related - condensation, humidity changes or minor water ingress that varies with conditions."
  },
  {
    question: "Should I record earth fault events?",
    answer: "Yes - log all faults, investigations and repairs in the system log book and maintenance records."
  },
  {
    question: "Can damaged cable cause earth faults?",
    answer: "Yes - crushed, nicked or water-damaged insulation is a common cause. Check for physical damage during investigation."
  }
];

const FireAlarmModule4Section5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 4 Section 5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Earth Fault Monitoring
          </h1>
          <p className="text-white/80">
            Insulation resistance requirements, fault location and troubleshooting
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Minimum IR:</strong> 2M ohms to earth per BS 5839-1</li>
              <li><strong>Monitoring:</strong> Continuous, split +ve/-ve indication</li>
              <li><strong>Common cause:</strong> Water ingress at devices/JBs</li>
              <li><strong>Method:</strong> Divide-and-conquer to locate fault</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Earth fault = investigate immediately</li>
              <li><strong>Use:</strong> 500V DC IR test (disconnect electronics)</li>
              <li><strong>Apply:</strong> Record all IR readings for trending</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain why earth fault monitoring is critical for reliable fire alarm operation",
              "Measure and record insulation resistance to BS 5839-1 requirements",
              "Interpret earth fault indications on fire alarm control panels",
              "Apply systematic fault-finding techniques to locate earth faults",
              "Identify common causes of earth faults in fire alarm installations",
              "Document and report earth fault investigations and remediation"
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

        {/* Section 01: Why Earth Faults Matter */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Why Earth Faults Matter
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Fire alarm systems use floating DC circuits. Earth faults - unintended connections to earth - can cause unpredictable behaviour and compromise life safety.
            </p>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white">
                <strong>Critical:</strong> A single earth fault may not cause immediate problems, but a second fault could create a short circuit bypassing normal protection, causing false alarms, missed alarms or system failure.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Consequences of Earth Faults:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>False alarms from circuit imbalance</li>
                <li>Devices not responding correctly</li>
                <li>Communication failures on loops</li>
                <li>Undetected faults leading to second failure</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Insulation Resistance Requirements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Insulation Resistance Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 5839-1 specifies minimum insulation resistance values to ensure reliable operation. These must be tested during commissioning and periodically.
            </p>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-white mb-2">Minimum Requirements:</p>
              <ul className="text-sm text-white space-y-1">
                <li><strong>Between circuits and earth:</strong> 2M ohms minimum</li>
                <li><strong>Test voltage:</strong> 500V DC (unless manufacturer specifies otherwise)</li>
                <li><strong>Disconnect sensitive equipment</strong> before testing</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Testing Procedure:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Isolate system from batteries and mains</li>
                <li>Test between each circuit conductor and earth</li>
                <li>Record readings for each circuit</li>
                <li>Compare against previous readings if available</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Panel Earth Fault Monitoring */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Panel Earth Fault Monitoring
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Modern fire alarm panels incorporate continuous earth fault monitoring. Understanding how this works helps with fault diagnosis.
            </p>

            <div className="space-y-4 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Basic Monitoring</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Detects when circuit insulation drops below threshold</li>
                  <li>Displays "Earth Fault" on panel</li>
                  <li>May indicate affected loop or zone</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Split Earth Monitoring</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Monitors positive and negative sides separately</li>
                  <li>Indicates which polarity has the fault</li>
                  <li>Faster diagnosis - know which conductor to focus on</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Advanced Features</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>IR value display in some panels</li>
                  <li>Loop isolation for systematic testing</li>
                  <li>Event logging for intermittent faults</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Common Causes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Common Causes of Earth Faults
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding common causes helps target your investigation and prevent recurrence.
            </p>

            <div className="space-y-4 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Environmental</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Water ingress at devices or junction boxes</li>
                  <li>Condensation in unheated areas</li>
                  <li>High humidity environments</li>
                  <li>Corrosion from chemicals or salt air</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Defects</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Damaged insulation during pulling or stripping</li>
                  <li>Over-tightened glands crushing cable</li>
                  <li>Metal swarf in enclosures</li>
                  <li>Incorrect termination at devices</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Equipment Faults</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Faulty devices with internal breakdown</li>
                  <li>Damaged device bases or covers</li>
                  <li>Failed cable glands or seals</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Fault Location Techniques */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Fault Location Techniques
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Systematic fault-finding minimises disruption and quickly locates the problem.
            </p>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-white mb-2">Divide and Conquer Method:</p>
              <ol className="text-sm text-white space-y-1 list-decimal ml-4">
                <li>Note which circuits/loops show the fault</li>
                <li>Disconnect half the devices on the affected circuit</li>
                <li>Check if fault clears - if yes, fault is in disconnected section</li>
                <li>Continue halving until you isolate the faulty device or section</li>
                <li>Test the specific device and cable to confirm</li>
              </ol>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Additional Techniques:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Use panel loop isolation features if available</li>
                <li>Check event log for timing and patterns</li>
                <li>Visual inspection of suspect areas (water damage, construction work)</li>
                <li>IR testing of individual cable sections once isolated</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 06: Documentation and Prevention */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Documentation and Prevention
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper documentation helps track trends and prevents recurrence of earth fault issues.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Recording Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Date/time of fault appearance and clearance</li>
                  <li>Affected circuits and IR readings</li>
                  <li>Root cause identified</li>
                  <li>Remedial action taken</li>
                  <li>Post-repair IR readings</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Prevention Strategies</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Proper cable gland selection and installation</li>
                  <li>IP-rated enclosures for harsh environments</li>
                  <li>Regular inspection during maintenance visits</li>
                  <li>Trend analysis of IR readings over time</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Commissioning</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Record baseline IR readings for all circuits</li>
                <li>Document in commissioning records for future comparison</li>
                <li>Investigate any readings below 2M ohms before handover</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Fault Finding</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Check panel event log for timing patterns - correlate with weather/environmental changes</li>
                <li>Keep a torch handy - many earth faults are visible as water staining or corrosion</li>
                <li>Use split earth indication to narrow down positive vs negative fault</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Ignoring intermittent earth faults</strong> - they indicate a developing problem that will worsen</li>
                <li><strong>Not recording commissioning IR readings</strong> - makes future troubleshooting much harder</li>
                <li><strong>Replacing devices without investigating root cause</strong> - the problem often returns</li>
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

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">IR Requirements</p>
                <ul className="space-y-0.5">
                  <li>Minimum 2M ohms to earth</li>
                  <li>500V DC test voltage</li>
                  <li>Disconnect electronics first</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Fault Finding</p>
                <ul className="space-y-0.5">
                  <li>Divide and conquer method</li>
                  <li>Check event log for patterns</li>
                  <li>Visual inspection for water damage</li>
                  <li>Document all findings</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Module Complete Banner */}
        <section className="mb-10">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-sm font-medium text-elec-yellow mb-1">Module 4 Complete</p>
            <p className="text-sm text-white">
              You have completed all sections covering power supplies, batteries, cables, wiring methods and earth fault monitoring. Continue to Module 5 to learn about detection devices and their applications.
            </p>
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
            <Link to="../section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/fire-alarm/module-5">
              Next Module
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default FireAlarmModule4Section5;
