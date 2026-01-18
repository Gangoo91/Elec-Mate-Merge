import { ArrowLeft, Search, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Systematic Approach to Fault Diagnosis - Instrumentation Course";
const DESCRIPTION = "Learn systematic troubleshooting methodologies for instrumentation systems including half-split technique, signal tracing, and root cause analysis.";

const quickCheckQuestions = [
  {
    id: "m8s1-qc1",
    question: "What is the first step in systematic fault diagnosis?",
    options: ["Replace the transmitter", "Gather information and understand the symptom", "Disconnect all wiring", "Call the manufacturer"],
    correctIndex: 1,
    explanation: "The first step is always to gather information about the fault - what symptoms are observed, when did it start, what changed recently, and what is the expected vs actual behaviour."
  },
  {
    id: "m8s1-qc2",
    question: "What is the half-split troubleshooting technique?",
    options: ["Cutting cables in half", "Testing at the midpoint to determine which half contains the fault", "Using half the normal voltage", "Working with a partner"],
    correctIndex: 1,
    explanation: "The half-split technique involves testing at the midpoint of a circuit or system to determine which half contains the fault, then repeating to rapidly narrow down the location."
  },
  {
    id: "m8s1-qc3",
    question: "Why is documentation important in troubleshooting?",
    options: ["To satisfy management", "To create a knowledge base, identify patterns, and prevent repeat faults", "To increase paperwork", "It's not important"],
    correctIndex: 1,
    explanation: "Documentation creates a valuable knowledge base for future troubleshooting, helps identify recurring fault patterns, supports root cause analysis, and prevents repeat failures through lessons learned."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the first step in troubleshooting a fault?",
    options: ["Replace the component immediately", "Gather information and clearly define the symptom before investigating", "Run full diagnostics on all systems", "Consult the manufacturer"],
    correctAnswer: 1,
    explanation: "The first step is always to gather information and clearly define the symptom. Understanding exactly what is wrong, when it started, and what changed helps focus the investigation efficiently."
  },
  {
    id: 2,
    question: "What does the half-split technique involve?",
    options: ["Cutting cables in half", "Testing at the midpoint of a system to identify which half contains the fault", "Working with a partner", "Using half the test voltage"],
    correctAnswer: 1,
    explanation: "The half-split technique tests at the midpoint of a circuit to determine which half contains the fault. This quickly eliminates half the potential fault locations with each test."
  },
  {
    id: 3,
    question: "Why is documenting troubleshooting important?",
    options: ["To keep management happy", "To build a knowledge base for future faults, identify patterns, and support root cause analysis", "It's not important", "To increase paperwork"],
    correctAnswer: 1,
    explanation: "Documentation builds a valuable knowledge base for future troubleshooting, helps identify recurring fault patterns, supports root cause analysis, and enables continuous improvement."
  },
  {
    id: 4,
    question: "What should you consider before replacing a component?",
    options: ["Just replace it to be safe", "Verify the fault is actually in that component by testing, not assumption", "The cost of the component only", "How long it will take"],
    correctAnswer: 1,
    explanation: "Before replacing any component, verify through testing that the fault is actually in that component. Assumption-based replacement wastes time and money and doesn't address the real problem."
  },
  {
    id: 5,
    question: "What is root cause analysis?",
    options: ["Finding the deepest cable", "Identifying the underlying reason why a fault occurred, not just the immediate symptom", "Checking the cable roots", "A type of plant maintenance"],
    correctAnswer: 1,
    explanation: "Root cause analysis identifies why a fault occurred, not just what failed. This prevents recurrence by addressing the underlying issue, whether design flaw, installation error, or environmental factor."
  },
  {
    id: 6,
    question: "What information should you gather before starting diagnosis?",
    options: ["Just the fault alarm", "Symptom details, timeline, recent changes, process conditions, and historical data", "Equipment serial numbers only", "Nothing - just start testing"],
    correctAnswer: 1,
    explanation: "Effective diagnosis requires understanding the symptom details, when it started, what changed recently, current process conditions, and any historical fault data for the equipment."
  },
  {
    id: 7,
    question: "What is the benefit of systematic troubleshooting over random checking?",
    options: ["It takes longer", "Faster fault location, no repeated tests, and documented results for future reference", "It's more expensive", "There is no benefit"],
    correctAnswer: 1,
    explanation: "Systematic troubleshooting locates faults faster, avoids repeating tests, ensures nothing is missed, and produces documented results that help with future troubleshooting."
  },
  {
    id: 8,
    question: "When should you use signal injection testing?",
    options: ["Only for digital signals", "To test a section of the loop by injecting a known signal and observing the response", "Never - it's dangerous", "Only during installation"],
    correctAnswer: 1,
    explanation: "Signal injection testing verifies a section of the loop by injecting a known signal and observing the response. It's useful for isolating faults between transmitter, wiring, and receiver."
  },
  {
    id: 9,
    question: "What does 'verify before and after' mean in troubleshooting?",
    options: ["Check the time", "Confirm the symptom exists before repair and verify it's resolved after repair", "Verify equipment location", "Check work permits"],
    correctAnswer: 1,
    explanation: "Verify the symptom exists before starting repair to confirm you're addressing the right problem, then verify it's resolved after repair to confirm successful repair."
  },
  {
    id: 10,
    question: "Why should you check for recent changes when troubleshooting?",
    options: ["To assign blame", "Recent changes often cause faults - maintenance, configuration changes, or process modifications", "To update documentation", "It's not relevant"],
    correctAnswer: 1,
    explanation: "Recent changes are often the cause of new faults. Maintenance work, configuration changes, software updates, or process modifications can introduce problems."
  }
];

const faqs = [
  {
    question: "How do I know when to escalate a troubleshooting task?",
    answer: "Escalate when you've exhausted your diagnostic capabilities, when the fault requires specialist knowledge or tools you don't have, when safety is at risk, or when the fault exceeds your authority level."
  },
  {
    question: "Should I always find root cause before fixing the immediate problem?",
    answer: "For critical systems, restore operation first if safe to do so, then investigate root cause. For non-critical systems, completing root cause analysis before returning to service prevents recurrence."
  },
  {
    question: "How detailed should troubleshooting documentation be?",
    answer: "Include enough detail that someone else could understand and repeat the diagnosis. Document symptoms, tests performed, readings obtained, conclusions drawn, and actions taken."
  },
  {
    question: "What if the fault is intermittent and not present during investigation?",
    answer: "Review alarm history and trends, interview operators about patterns, install temporary monitoring if needed, and check for environmental correlations like temperature, time of day, or process cycles."
  },
  {
    question: "How do I avoid bias in troubleshooting?",
    answer: "Don't assume the cause based on past experience. Test systematically, let the evidence guide you, and consider unlikely possibilities if obvious causes are ruled out."
  },
  {
    question: "Is it faster to just replace components until the fault clears?",
    answer: "No. Shotgun troubleshooting wastes components, time, and doesn't identify root cause. Systematic diagnosis is faster and more effective, especially for complex faults."
  }
];

const InstrumentationModule8Section1 = () => {
  useSEO({
    title: TITLE,
    description: DESCRIPTION
  });

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
        {/* Centered Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Search className="h-4 w-4" />
            <span>Module 8 Section 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Systematic Approach to Fault Diagnosis
          </h1>
          <p className="text-white/80">
            Structured troubleshooting methodologies for efficient fault location
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Step 1:</strong> Gather information - define the symptom</li>
              <li><strong>Step 2:</strong> Analyse - identify possible causes</li>
              <li><strong>Step 3:</strong> Test - verify each hypothesis</li>
              <li><strong>Step 4:</strong> Repair - fix and verify resolution</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Half-split technique halves fault area with each test</li>
              <li><strong>Use:</strong> Always document findings for future reference</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply structured troubleshooting methodology",
              "Use half-split technique for efficient diagnosis",
              "Gather and analyse fault information",
              "Perform root cause analysis",
              "Document troubleshooting activities",
              "Avoid common troubleshooting mistakes"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Structured Troubleshooting Methodology
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Systematic troubleshooting follows a structured approach that efficiently narrows down
              fault locations whilst avoiding wasted effort on incorrect assumptions. This methodology
              applies to any instrumentation fault, from simple wiring issues to complex control system problems.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The Four-Step Process:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>1. Information Gathering:</strong> Define symptom, timeline, recent changes, expected behaviour</li>
                <li><strong>2. Analysis:</strong> List possible causes, prioritise by probability</li>
                <li><strong>3. Testing:</strong> Systematically test each hypothesis, starting with most likely</li>
                <li><strong>4. Resolution:</strong> Repair fault, verify fix, document findings</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Questions to Ask First:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>What exactly is the symptom?</strong> Precise description of fault behaviour</li>
                <li><strong>When did it start?</strong> Sudden vs gradual onset</li>
                <li><strong>What changed recently?</strong> Maintenance, configuration, process changes</li>
                <li><strong>Is it constant or intermittent?</strong> Pattern identification</li>
                <li><strong>Does it correlate with anything?</strong> Time, temperature, process state</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Half-Split Technique
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The half-split technique is a powerful method for efficiently locating faults in
              series systems like instrumentation loops. By testing at the midpoint, you eliminate
              half the potential fault locations with each test.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">How It Works:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Step 1:</strong> Identify the complete signal path from transmitter to display</li>
                <li><strong>Step 2:</strong> Test at the approximate midpoint (junction box, marshalling cabinet)</li>
                <li><strong>Step 3:</strong> If signal is good at midpoint, fault is between midpoint and display</li>
                <li><strong>Step 4:</strong> If signal is bad at midpoint, fault is between transmitter and midpoint</li>
                <li><strong>Step 5:</strong> Repeat in the faulty half until fault is located</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Efficiency Example:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>A loop has 8 possible fault points</li>
                <li>Random testing could take up to 8 tests</li>
                <li>Half-split takes maximum 3 tests (8, 4, 2, 1)</li>
                <li>For 64 fault points, half-split needs only 6 tests maximum</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Root Cause Analysis
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Finding and fixing the immediate fault is only part of effective troubleshooting.
              Root cause analysis identifies why the fault occurred, preventing recurrence and
              improving overall system reliability.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The 5 Whys Technique:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Problem:</strong> Transmitter failed</li>
                <li><strong>Why 1:</strong> Internal electronics damaged by moisture</li>
                <li><strong>Why 2:</strong> Water entered through cable gland</li>
                <li><strong>Why 3:</strong> Gland seal was damaged</li>
                <li><strong>Why 4:</strong> Wrong gland type for application</li>
                <li><strong>Why 5:</strong> Installation specification not followed</li>
                <li><strong>Root Cause:</strong> Training gap on installation requirements</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common Root Cause Categories:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Design Issues:</strong> Incorrect specification, undersizing, wrong materials</li>
                <li><strong>Installation Errors:</strong> Poor workmanship, procedure not followed</li>
                <li><strong>Environmental Factors:</strong> Temperature, humidity, vibration, corrosion</li>
                <li><strong>Maintenance Gaps:</strong> Missed inspections, deferred repairs</li>
                <li><strong>Operational Factors:</strong> Process conditions outside design limits</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Documentation and Knowledge Management
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper documentation transforms individual troubleshooting experience into organisational
              knowledge. Recording findings helps future technicians diagnose similar faults faster
              and identifies patterns requiring systemic improvements.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">What to Document:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Symptom Description:</strong> Exactly what was observed</li>
                <li><strong>Tests Performed:</strong> What was tested and results obtained</li>
                <li><strong>Fault Found:</strong> Specific component or connection that failed</li>
                <li><strong>Root Cause:</strong> Why the fault occurred</li>
                <li><strong>Repair Action:</strong> What was done to fix it</li>
                <li><strong>Verification:</strong> How you confirmed the fix worked</li>
                <li><strong>Recommendations:</strong> Prevent recurrence, improve design</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Real World Example */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">Real World Example</h2>
          <div className="p-4 rounded-lg bg-card/50 border border-white/10">
            <h3 className="text-sm font-medium text-elec-yellow mb-2">Systematic Diagnosis of Temperature Reading Fault</h3>
            <p className="text-sm text-white mb-3">
              A reactor temperature indication shows 25 degrees C when the reactor is clearly at operating
              temperature. Rather than immediately replacing the transmitter, the technician applies systematic diagnosis.
            </p>
            <div className="text-sm text-white space-y-2">
              <p><strong>Information Gathering:</strong> Symptom started after yesterday's maintenance. No alarms. Other reactor instruments normal. Maintenance records show junction box was opened for unrelated work.</p>
              <p><strong>Half-Split Test:</strong> Current measured at junction box shows correct 16.5mA for expected temperature. Current at DCS input card shows 4.0mA.</p>
              <p><strong>Conclusion:</strong> Fault between junction box and DCS, not transmitter. Inspection reveals disconnected wire at marshalling cabinet - maintenance technician disturbed wrong terminals.</p>
              <p><strong>Resolution:</strong> Reconnect wire, verify reading correct, document cause. Recommend clearer labelling in marshalling cabinet.</p>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Before Starting</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Gather all available information about the fault</li>
                <li>Check alarm history and trend data</li>
                <li>Review recent maintenance and change records</li>
                <li>Understand the normal system behaviour</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">During Diagnosis</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Test systematically - don't jump to conclusions</li>
                <li>Use half-split to narrow down location efficiently</li>
                <li>Record all measurements and observations</li>
                <li>Consider multiple possible causes</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Assumption-based diagnosis</strong> - always test, don't assume</li>
                <li><strong>Shotgun troubleshooting</strong> - replacing parts randomly wastes time and money</li>
                <li><strong>Stopping at symptom</strong> - find root cause to prevent recurrence</li>
                <li><strong>Not documenting</strong> - lost knowledge affects future troubleshooting</li>
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
            <Link to="/upskilling/instrumentation-module-7-section-7">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default InstrumentationModule8Section1;
