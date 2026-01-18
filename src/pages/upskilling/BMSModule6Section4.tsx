import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Event Triggers and Auto-Reporting - BMS Module 6 Section 4";
const DESCRIPTION = "Learn about automated systems for intelligent building response and comprehensive reporting in Building Management Systems.";

const quickCheckQuestions = [
  {
    id: "bms6-4-qc1",
    question: "What are the main types of event triggers in building automation?",
    options: [
      "Manual, automatic, semi-automatic, and hybrid triggers",
      "Time-based, sensor-based, alarm-based, and occupancy-based triggers",
      "Primary, secondary, tertiary, and backup triggers",
      "Hardware, software, firmware, and network triggers"
    ],
    correctIndex: 1,
    explanation: "The main types are time-based triggers (scheduled actions), sensor-based triggers (environmental responses), alarm-based triggers (safety/security responses), and occupancy-based triggers (usage pattern responses). Each type serves different automation needs and building requirements."
  },
  {
    id: "bms6-4-qc2",
    question: "How do auto-reporting systems benefit building management?",
    options: [
      "They replace the need for maintenance staff entirely",
      "They only work during normal business hours",
      "They provide consistent data collection, reduce manual workload, and enable proactive management",
      "They are only useful for large commercial buildings"
    ],
    correctIndex: 2,
    explanation: "Auto-reporting provides consistent data collection, reduces manual workload, ensures timely alerts, enables proactive management, eliminates human error in report generation, and delivers tailored information to different stakeholders without overwhelming them with irrelevant data."
  },
  {
    id: "bms6-4-qc3",
    question: "Why is signal integrity important for automation systems?",
    options: [
      "It only affects the speed of data transmission",
      "It ensures accurate data for decision-making and prevents false triggers or missed events",
      "It is only relevant for wireless systems",
      "It only matters during initial commissioning"
    ],
    correctIndex: 1,
    explanation: "Signal integrity ensures automation systems receive accurate, uncorrupted data for decision-making. Poor signal integrity can cause false triggers, missed events, incorrect automation responses, and unreliable reports, potentially compromising building safety, comfort, and efficiency."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the primary purpose of event triggers in building automation?",
    options: [
      "To replace manual building controls entirely",
      "To enable buildings to respond automatically to changing conditions",
      "To reduce the number of sensors required",
      "To simplify BMS programming"
    ],
    correctAnswer: 1,
    explanation: "Event triggers are intelligent decision-making rules that allow buildings to respond automatically to changing conditions, monitoring specific parameters and executing predefined actions when trigger conditions are met."
  },
  {
    id: 2,
    question: "Which type of trigger executes actions according to schedules?",
    options: [
      "Sensor-based triggers",
      "Alarm-based triggers",
      "Time-based triggers",
      "Occupancy-based triggers"
    ],
    correctAnswer: 2,
    explanation: "Time-based triggers execute actions according to schedules, such as switching lights at sunset, starting HVAC before occupancy, or generating weekly energy reports."
  },
  {
    id: 3,
    question: "What type of reports highlight equipment performance and maintenance needs?",
    options: [
      "Energy reports",
      "Maintenance reports",
      "Compliance reports",
      "Alarm summaries"
    ],
    correctAnswer: 1,
    explanation: "Maintenance reports highlight equipment performance, filter replacement needs, and scheduled service requirements. Predictive reporting identifies developing issues before they cause failures."
  },
  {
    id: 4,
    question: "Why is proper cable separation important for automation systems?",
    options: [
      "To reduce installation costs",
      "To prevent data corruption that could cause false triggers",
      "To make future modifications easier",
      "To comply with aesthetic requirements"
    ],
    correctAnswer: 1,
    explanation: "Proper cable separation from power circuits prevents data corruption that could cause false triggers or missed events, ensuring reliable automation responses."
  },
  {
    id: 5,
    question: "What should safety systems do in relation to automation?",
    options: [
      "Operate independently without any connection",
      "Override automation when safety takes priority",
      "Be controlled entirely by automation logic",
      "Only activate during scheduled maintenance"
    ],
    correctAnswer: 1,
    explanation: "Fire alarm inputs, emergency stops, and security systems must be wired to override automation when safety takes priority, ensuring rapid response to critical conditions."
  },
  {
    id: 6,
    question: "What is the purpose of alarm summaries in auto-reporting?",
    options: [
      "To replace the fire alarm system",
      "To consolidate all building alarms showing frequency and resolution times",
      "To automatically silence nuisance alarms",
      "To reduce the number of sensors needed"
    ],
    correctAnswer: 1,
    explanation: "Alarm summaries consolidate all building alarms into digestible formats showing frequency, resolution times, and recurring issues, helping identify systemic problems and maintenance priorities."
  },
  {
    id: 7,
    question: "What role does documentation play in supporting automation systems?",
    options: [
      "It is only needed for regulatory compliance",
      "It enables efficient diagnosis when automation does not behave as expected",
      "It is optional for small installations",
      "It only needs to be updated annually"
    ],
    correctAnswer: 1,
    explanation: "Documentation accuracy supports troubleshooting and modifications. As-built drawings, cable schedules, and I/O lists enable efficient diagnosis when automation does not behave as expected."
  },
  {
    id: 8,
    question: "What should be tested during automation commissioning?",
    options: [
      "Only the main control panel",
      "Sensor readings against known conditions and automation responses",
      "Only time-based schedules",
      "Only alarm functions"
    ],
    correctAnswer: 1,
    explanation: "During commissioning, verify sensor readings against known conditions, test automation responses, confirm emergency overrides function correctly, and validate alarm and notification systems."
  },
  {
    id: 9,
    question: "What is the benefit of custom dashboards for different stakeholders?",
    options: [
      "They reduce the overall data collected",
      "They provide relevant information without data overload",
      "They eliminate the need for technical training",
      "They only work with specific BMS brands"
    ],
    correctAnswer: 1,
    explanation: "Custom dashboards can be configured for different stakeholders, providing technical detail for maintenance teams, cost focus for financial managers, or comfort metrics for facility management, giving each audience relevant information without data overload."
  },
  {
    id: 10,
    question: "What ensures automation systems remain operational during critical events?",
    options: [
      "Faster processors",
      "UPS systems, proper load balancing, and backup power connections",
      "Wireless communication only",
      "Reduced sensor count"
    ],
    correctAnswer: 1,
    explanation: "Power supply reliability ensures automation systems remain operational during critical events. UPS systems, proper load balancing, and backup power connections maintain automation functionality when it is most needed."
  }
];

const faqs = [
  {
    question: "How do I test event triggers without disrupting building operations?",
    answer: "Test during planned maintenance windows or use simulation inputs when possible. For critical safety triggers, coordinate with facility management and notify all affected parties. Use BMS override functions to prevent unwanted equipment operation during testing."
  },
  {
    question: "What should I do if automation systems respond unexpectedly?",
    answer: "Document the unexpected behaviour, check all relevant I/O connections and signal integrity, verify sensor readings, and consult with BMS programmers. Do not modify automation logic yourself - report issues to qualified BMS specialists for proper resolution."
  },
  {
    question: "How often should automated reports be generated?",
    answer: "This depends on the audience and purpose. Operational staff might need daily summaries, energy managers weekly analysis, and senior management monthly overviews. The key is providing actionable information without overwhelming users with too much data."
  },
  {
    question: "Can event triggers interfere with each other?",
    answer: "Yes, poorly designed trigger logic can create conflicts. For example, energy-saving triggers might conflict with comfort triggers. This is why BMS programming requires careful priority management and why electricians should understand the overall automation strategy."
  },
  {
    question: "What documentation is essential for automation systems?",
    answer: "Maintain accurate I/O lists, cable schedules, device locations, calibration records, and as-built drawings. Include contact details for BMS specialists and system passwords/access procedures. This documentation is crucial for troubleshooting and future modifications."
  }
];

const BMSModule6Section4 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
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
        {/* Centred Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 6 Section 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Event Triggers and Auto-Reporting
          </h1>
          <p className="text-white/80">
            Automated systems for intelligent building response and comprehensive reporting
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>What:</strong> Automated rules that make buildings respond to conditions</li>
              <li><strong>Why:</strong> Faster responses, consistent operation, reduced manual work</li>
              <li><strong>Types:</strong> Time-based, sensor-based, alarm-based, occupancy-based</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Scheduled lighting changes, HVAC adjusting to occupancy</li>
              <li><strong>Use:</strong> Ensure reliable signal paths and proper cable separation</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the purpose of event triggers in building automation",
              "Describe common trigger types and their applications",
              "Understand auto-reporting systems and their benefits",
              "Recognise the electrician's role in supporting automated systems",
              "Apply best practices for signal integrity and documentation",
              "Support commissioning and ongoing system maintenance"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Understanding Event Triggers */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Understanding Event Triggers
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Event triggers are the intelligent decision-making rules that allow buildings to respond automatically to changing conditions. They monitor specific parameters and execute predefined actions when trigger conditions are met.
            </p>
            <p>
              Modern Building Management Systems do not just monitor - they respond intelligently to changing conditions. Event triggers automate building responses, whilst auto-reporting ensures stakeholders receive timely, relevant information without manual intervention.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Types of Event Triggers:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong className="text-elec-yellow">Time-based triggers:</strong> Execute actions according to schedules - switching lights at sunset, starting HVAC before occupancy, or generating weekly energy reports</li>
                <li><strong className="text-elec-yellow">Sensor-based triggers:</strong> Respond to environmental conditions - activating cooling when temperature exceeds setpoints, switching to natural ventilation when outdoor air quality improves</li>
                <li><strong className="text-elec-yellow">Alarm-based triggers:</strong> Provide safety and security responses - evacuating lifts during fire alarms, notifying security of after-hours access</li>
                <li><strong className="text-elec-yellow">Occupancy-based triggers:</strong> Optimise building services based on usage patterns - reducing lighting in unoccupied areas, adjusting ventilation for crowd levels</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Trigger Logic Example</p>
              <p className="text-sm text-white">IF (outdoor temperature &gt; 25°C) AND (occupancy detected) AND (time between 08:00-18:00) THEN (activate cooling, open motorised blinds, send comfort notification to facilities team).</p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Auto-Reporting Systems */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Auto-Reporting Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Auto-reporting transforms building data into meaningful information delivered automatically to stakeholders. This eliminates manual report generation whilst ensuring timely access to critical building performance data.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Types of Automated Reports:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong className="text-elec-yellow">Energy reports:</strong> Provide consumption analysis, efficiency trends, and cost breakdowns for strategic energy management</li>
                <li><strong className="text-elec-yellow">Maintenance reports:</strong> Highlight equipment performance, filter replacement needs, and scheduled service requirements</li>
                <li><strong className="text-elec-yellow">Alarm summaries:</strong> Consolidate all building alarms showing frequency, resolution times, and recurring issues</li>
                <li><strong className="text-elec-yellow">Compliance reporting:</strong> Automatically generate documentation for regulatory requirements and energy certificates</li>
                <li><strong className="text-elec-yellow">Custom dashboards:</strong> Provide tailored information for different stakeholders without data overload</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Report Automation Benefits</p>
              <p className="text-sm text-white">Automated reporting ensures consistent data collection, reduces human error, provides timely alerts, and enables proactive building management by highlighting trends before they become problems.</p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Electrician's Role */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Electrician's Role in Automation Support
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Reliable automation depends on accurate, stable data inputs. Your installation work provides the foundation that allows intelligent building systems to make correct decisions and generate trustworthy reports.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Responsibilities:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong className="text-elec-yellow">Signal integrity:</strong> Properly terminated communications cables, appropriate cable separation from power circuits, and correct earthing prevent data corruption</li>
                <li><strong className="text-elec-yellow">Power supply reliability:</strong> UPS systems, proper load balancing, and backup power connections maintain automation functionality</li>
                <li><strong className="text-elec-yellow">Sensor calibration:</strong> Regular verification that sensors provide correct readings ensures trigger setpoints operate as designed</li>
                <li><strong className="text-elec-yellow">Safety integration:</strong> Understanding how automation interacts with fire alarms, emergency stops, and security systems</li>
                <li><strong className="text-elec-yellow">Documentation:</strong> As-built drawings, cable schedules, and I/O lists enable efficient troubleshooting</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Real World Example */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Real World Example
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Hospital Emergency Response Automation</p>
              <p className="text-sm text-white mb-3">
                A major hospital implemented comprehensive event triggers for emergency response. When a fire alarm activates, the system automatically: recalls all lifts to ground floor, pressurises stairwells, switches air handling to smoke extraction mode, unlocks all security doors, and sends notifications to fire brigade and senior staff.
              </p>
              <p className="text-sm text-white mb-3">
                <strong>The Challenge:</strong> During testing, the automation responded incorrectly - lifts went to wrong floors, some air handling units did not switch modes, and notification delays occurred.
              </p>
              <p className="text-sm text-white mb-3">
                <strong>The Investigation:</strong> Electricians discovered multiple issues: fire alarm contacts had been wired to wrong BMS inputs, communications cables had interference from adjacent power circuits, and some devices lacked proper surge protection causing intermittent failures.
              </p>
              <p className="text-sm text-white">
                <strong>The Solution:</strong> Correct I/O wiring, proper cable separation, improved earthing, and comprehensive surge protection resolved all issues. The automation now provides reliable emergency response, potentially saving lives during real incidents.
              </p>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Quality</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Use appropriate cable types for signal and power circuits</li>
                <li>Maintain proper separation between data and power cables</li>
                <li>Ensure secure terminations to prevent loose connections</li>
                <li>Test all circuits before system commissioning</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">System Reliability</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Install appropriate surge protection devices</li>
                <li>Provide dedicated UPS for critical automation components</li>
                <li>Label all circuits clearly for future maintenance</li>
                <li>Document all modifications accurately</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Commissioning Support</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Verify sensor readings against known conditions</li>
                <li>Test automation responses during commissioning</li>
                <li>Confirm emergency overrides function correctly</li>
                <li>Validate alarm and notification systems</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Ignoring cable separation</strong> - causes interference and false triggers</li>
                <li><strong>Poor documentation</strong> - makes troubleshooting difficult</li>
                <li><strong>Skipping commissioning tests</strong> - leaves faults undetected</li>
                <li><strong>Modifying automation logic without authorisation</strong> - can compromise safety</li>
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

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Dashboards
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-5">
              Next: Fire Panel Integration
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BMSModule6Section4;
