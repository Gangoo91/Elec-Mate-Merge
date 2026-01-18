import { ArrowLeft, ArrowRight, Settings, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    question: "A hotel uses a 2-minute investigation delay for automatic detectors. What should happen if someone operates a manual call point?",
    answer: "The manual call point should override the investigation delay and trigger immediate full evacuation. MCP operation indicates someone has confirmed an emergency, so delays should not apply."
  },
  {
    question: "What should happen to electromagnetic door hold-opens if the fire alarm system loses power?",
    answer: "The hold-opens should release (fail-safe) so fire doors close automatically. This ensures compartmentation is maintained even if the fire alarm system is not powered. The magnetic hold-opens require power to hold doors open."
  },
  {
    question: "Why must interface circuits be monitored?",
    answer: "Monitoring detects wiring faults before an emergency, ensuring critical functions like door release and HVAC shutdown will operate when needed. An unmonitored circuit could fail without anyone knowing."
  }
];

const quizQuestions = [
  {
    question: "What is the primary purpose of a cause and effect matrix?",
    options: ["To list equipment costs", "To document how system inputs produce outputs including delays and interface actions", "To record maintenance dates", "To show cable routes only"],
    correctAnswer: 1,
    explanation: "The C&E matrix clearly defines the relationship between inputs (detectors, MCPs) and outputs (sounders, interfaces) including any logic like delays or coincidence."
  },
  {
    question: "An investigation delay (where permitted) is used to:",
    options: ["Speed up evacuation", "Allow brief checking before full evacuation", "Silence faults", "Reduce detector sensitivity"],
    correctAnswer: 1,
    explanation: "An investigation delay allows staff to check the source of an alarm before triggering full evacuation, where the fire strategy permits."
  },
  {
    question: "Coincidence (double knock) typically means:",
    options: ["Any single device triggers evacuation", "Two independent triggers are required before specific actions occur", "No alarm is raised", "Only manual call points operate"],
    correctAnswer: 1,
    explanation: "Coincidence requires two separate inputs (e.g., two detectors in the same area) before triggering certain outputs, reducing unwanted evacuations."
  },
  {
    question: "Why should manual call points typically override investigation delays?",
    options: ["They should not override delays", "Manual activation indicates confirmed emergency requiring immediate evacuation", "To test the delay function", "MCPs are less important than detectors"],
    correctAnswer: 1,
    explanation: "Manual call point operation indicates a person has confirmed an emergency situation, warranting immediate full evacuation without delay."
  },
  {
    question: "What documentation should be provided with the cause and effect matrix?",
    options: ["No documentation needed", "Interface schedules, test procedures, and commissioning records", "Only manufacturer catalogues", "Verbal descriptions only"],
    correctAnswer: 1,
    explanation: "Complete documentation includes interface schedules defining each output, test procedures, and commissioning records showing verification of each function."
  },
  {
    question: "What is meant by alert and evacuate signals in phased evacuation?",
    options: ["Same tone everywhere", "Alert prepares adjacent areas; evacuate instructs immediate departure", "They are identical signals", "Alert is visual only"],
    correctAnswer: 1,
    explanation: "Distinct signals enable phased response: alert warns adjacent areas to standby while evacuate signals immediate departure from affected zones."
  },
  {
    question: "How should interfaces fail when power is lost?",
    options: ["Remain in last state", "Fail to a safe state (e.g., doors released, plant shut down)", "Lock all doors", "Continue normal operation"],
    correctAnswer: 1,
    explanation: "Fail-safe design ensures interfaces move to safe states on power loss: fire doors close, essential plant shuts down, access control releases."
  },
  {
    question: "What is a common interface action for fire alarm activation?",
    options: ["Start HVAC fans on fire", "Release electromagnetic door hold-opens", "Open all windows", "Start lifts to top floor"],
    correctAnswer: 1,
    explanation: "Door hold-opens are typically released on alarm; other common interfaces include lift recall, HVAC shutdown, and smoke control activation."
  },
  {
    question: "Why must interface circuits be monitored?",
    options: ["Monitoring is not required", "To detect faults ensuring interface reliability before emergency", "Only for counting operations", "For aesthetic purposes"],
    correctAnswer: 1,
    explanation: "Interface monitoring detects wiring faults before an emergency, ensuring critical functions like door release and HVAC shutdown will operate when needed."
  },
  {
    question: "What should happen after building alterations affecting fire alarm zones?",
    options: ["Nothing - system continues unchanged", "Update zone plans, C&E matrix, and record changes in logbook", "Remove the fire alarm system", "Only update every 5 years"],
    correctAnswer: 1,
    explanation: "All documentation must be updated after alterations, including zone plans, C&E matrix, and logbook entries, to maintain compliance and correct system operation."
  }
];

const faqs = [
  {
    question: "Who approves investigation delays?",
    answer: "Delays must be agreed with the responsible person (usually the building owner/manager) and documented in the fire risk assessment. The fire strategy should support their use."
  },
  {
    question: "How often should interface functions be tested?",
    answer: "Follow BS 5839-1 recommendations - typically weekly for at least one device, quarterly for a proportion, and annually for 100% including interface fail-safe behaviour."
  },
  {
    question: "Can coincidence be used in sleeping risk premises?",
    answer: "Generally not recommended for sleeping risk due to delayed response. Where used, ensure very short investigation periods and robust staff response procedures."
  },
  {
    question: "What if the C&E matrix changes after handover?",
    answer: "Any changes must be documented, recorded in the logbook, and the matrix updated. Major changes may require variation certificates and updated commissioning."
  },
  {
    question: "How should interfaces to third-party systems be documented?",
    answer: "Document the connection point, signal type, expected action, fail-safe behaviour, and responsible parties for each interface in the interface schedule."
  },
  {
    question: "What testing verifies coincidence logic?",
    answer: "Activate each trigger independently (should not cause full action), then activate both together (should trigger action). Document both test conditions."
  }
];

const FireAlarmModule3Section6 = () => {
  useSEO({
    title: "Cause & Effect Design - Fire Alarm Course",
    description: "BS 5839-1 cause and effect design: programming logic, delays, coincidence, interfaces, documentation, and commissioning procedures."
  });

  return (
    <div className="min-h-screen bg-background text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-background/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center justify-between max-w-3xl mx-auto">
          <Button variant="ghost" size="sm" asChild className="gap-2 text-white hover:text-elec-yellow">
            <Link to="/electrician/upskilling/fire-alarm-module-3">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Module</span>
            </Link>
          </Button>
          <span className="text-sm text-white">Section 6 of 6</span>
        </div>
      </header>

      <main className="px-4 py-8 max-w-3xl mx-auto">
        {/* Title */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-elec-yellow/10 border border-elec-yellow/30 mb-4">
            <Settings className="h-8 w-8 text-elec-yellow" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Cause & Effect Design</h1>
          <p className="text-white">Programming system logic, interfaces, documentation, and commissioning for reliable fire alarm operation</p>
        </div>

        {/* Learning Outcomes */}
        <div className="mb-8 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
          <h2 className="text-lg font-semibold text-white mb-3">What You Will Learn</h2>
          <ul className="space-y-2 text-white">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <span>Develop cause and effect matrices aligned with fire strategy</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <span>Programme investigation delays and coincidence logic appropriately</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <span>Integrate interfaces with doors, lifts, HVAC, and plant systems</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <span>Design fail-safe and monitored interface circuits</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <span>Commission and document system functions with test evidence</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <span>Maintain documentation through building lifecycle changes</span>
            </li>
          </ul>
        </div>

        {/* Section 01: Cause and Effect Matrix */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">01</span>
            Cause and Effect Matrix
          </h2>
          <div className="space-y-4 text-white">
            <p>
              The cause and effect (C&E) matrix is the core document defining how the fire alarm system behaves in all scenarios.
            </p>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h3 className="font-semibold text-white mb-2">Matrix Components</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Inputs:</strong> detectors, MCPs, interfaces (by zone/address)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Logic:</strong> delays, coincidence, overrides, escalation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Outputs:</strong> sounders, VADs, interfaces, remote signalling</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Scenarios:</strong> normal alarm, fault, test mode, power failure</span>
                </li>
              </ul>
            </div>

            <p>
              The matrix must clearly show what happens for every possible input, including any logic processing before outputs activate.
            </p>
          </div>
        </section>

        {/* Section 02: Delays and Coincidence */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">02</span>
            Delays and Coincidence
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Delays and coincidence can reduce unwanted evacuations but must be carefully justified and agreed with the responsible person.
            </p>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h3 className="font-semibold text-white mb-2">Delay Types</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Investigation delay:</strong> allows staff to check before full evacuation (typically 1-3 mins)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Coincidence:</strong> requires two independent triggers before action</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>MCP override:</strong> manual activation bypasses all delays</span>
                </li>
              </ul>
            </div>

            <p>
              Delays must be documented in the fire risk assessment. They are not appropriate for all premises, particularly those with sleeping risk or where rapid evacuation is essential.
            </p>
          </div>
        </section>

        {/* Section 03: Alert and Evacuate Signals */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">03</span>
            Alert and Evacuate Signals
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Phased evacuation requires distinct signalling for different areas to control occupant movement progressively.
            </p>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h3 className="font-semibold text-white mb-2">Signal Design</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Alert (intermittent):</strong> prepare to leave, await instruction</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Evacuate (continuous):</strong> leave immediately via nearest exit</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Fire floor + above:</strong> immediate evacuate signal</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Other floors:</strong> alert first, then progressive evacuation</span>
                </li>
              </ul>
            </div>

            <p>
              The C&E matrix must clearly define which zones receive alert versus evacuate signals for each fire location.
            </p>
          </div>
        </section>

        <InlineCheck
          question={quickCheckQuestions[0].question}
          answer={quickCheckQuestions[0].answer}
        />

        {/* Section 04: Interface Integration */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">04</span>
            Interface Integration
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Fire alarm systems commonly interface with other building systems to support fire safety strategy.
            </p>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h3 className="font-semibold text-white mb-2">Typical Interfaces</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Door hold-opens:</strong> release on alarm to close fire doors</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Lifts:</strong> recall to ground floor, disable call buttons</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>HVAC:</strong> shutdown or smoke control mode as designed</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Access control:</strong> fail-safe release for evacuation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Plant shutdown:</strong> gas, machinery, process equipment</span>
                </li>
              </ul>
            </div>

            <p>
              Each interface must be documented in the interface schedule showing connection details, expected action, and fail-safe behaviour.
            </p>
          </div>
        </section>

        {/* Section 05: Fail-Safe and Monitoring */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">05</span>
            Fail-Safe and Monitoring
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Interface circuits must be designed for reliability with fail-safe operation and fault monitoring.
            </p>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h3 className="font-semibold text-white mb-2">Design Principles</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Fail-safe:</strong> move to safe state on power loss or fault</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Monitored:</strong> detect open/short circuit faults before emergency</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Independence:</strong> avoid single points of failure</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Testing:</strong> verify fail-safe behaviour during commissioning</span>
                </li>
              </ul>
            </div>

            <p>
              An unmonitored interface could fail without indication, leaving critical safety functions unavailable when needed.
            </p>
          </div>
        </section>

        <InlineCheck
          question={quickCheckQuestions[1].question}
          answer={quickCheckQuestions[1].answer}
        />

        {/* Section 06: Commissioning and Documentation */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">06</span>
            Commissioning and Documentation
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Complete documentation supports ongoing operation, maintenance, and future modifications.
            </p>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h3 className="font-semibold text-white mb-2">Documentation Package</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>C&E matrix:</strong> complete with all scenarios and variations</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Test records:</strong> witnessed commissioning of each function</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>As-built drawings:</strong> accurate device positions and zones</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Interface schedules:</strong> connections and actions for each system</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>O&M manual:</strong> operation, maintenance, and test procedures</span>
                </li>
              </ul>
            </div>

            <p>
              All documentation must be kept up to date throughout the building lifecycle. Any changes to the system require documentation updates.
            </p>
          </div>
        </section>

        <InlineCheck
          question={quickCheckQuestions[2].question}
          answer={quickCheckQuestions[2].answer}
        />

        {/* Pro Tips */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">07</span>
            Pro Tips
          </h2>
          <div className="p-4 rounded-lg bg-green-500/10 border-l-2 border-green-500/50">
            <ul className="space-y-2 text-white">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Develop the C&E matrix early in design and validate with all stakeholders</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Test each interface fail-safe condition during commissioning, not just normal operation</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Keep the C&E matrix updated after any system changes and record in the logbook</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">08</span>
            Common Mistakes
          </h2>
          <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
            <ul className="space-y-2 text-white">
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">X</span>
                <span>Using unjustified delays without fire risk assessment agreement</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">X</span>
                <span>Unmonitored interface circuits that could fail without indication</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">X</span>
                <span>Missing documentation making future maintenance impossible</span>
              </li>
            </ul>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">09</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-white">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-8">
          <Quiz
            title="Cause & Effect Design Knowledge Check"
            questions={quizQuestions}
            moduleTitle="Cause & Effect Design"
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row gap-4 justify-between pt-8 border-t border-white/10">
          <Button variant="outline" asChild className="gap-2">
            <Link to="/study-centre/upskilling/fire-alarm-module-3-section-5">
              <ArrowLeft className="h-4 w-4" />
              Previous: Special Applications
            </Link>
          </Button>
          <Button asChild className="gap-2 bg-elec-yellow text-black hover:bg-elec-yellow/90">
            <Link to="/study-centre/upskilling/fire-alarm-module-4">
              Next: Module 4
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </nav>
      </main>
    </div>
  );
};

export default FireAlarmModule3Section6;
