import { ArrowLeft, AlertTriangle, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Common Wiring Faults and Loop Integrity Checks - Instrumentation Course";
const DESCRIPTION = "Learn to identify and diagnose common wiring faults in 4-20mA loops including open circuits, short circuits, ground loops, and reversed polarity.";

const quickCheckQuestions = [
  {
    id: "m7s7-qc1",
    question: "What current reading indicates an open circuit in a 4-20mA loop?",
    options: ["4mA", "12mA", "20mA", "0mA or less than 4mA"],
    correctIndex: 3,
    explanation: "An open circuit prevents current flow, resulting in 0mA reading. Any reading below 3.8mA typically indicates a break in the loop circuit."
  },
  {
    id: "m7s7-qc2",
    question: "What causes a ground loop in instrumentation systems?",
    options: ["Too much current", "Multiple earth connections creating circulating currents", "High resistance cable", "Incorrect wire gauge"],
    correctIndex: 1,
    explanation: "Ground loops occur when a circuit has multiple earth connections at different potentials, allowing circulating currents that cause signal interference and measurement errors."
  },
  {
    id: "m7s7-qc3",
    question: "What is the correct way to terminate a cable shield?",
    options: ["Earth at both ends", "Earth at single point only (usually control room end)", "Leave unconnected", "Connect to signal wire"],
    correctIndex: 1,
    explanation: "Cable shields should be earthed at a single point only, typically at the control room end, to provide EMI protection without creating ground loops."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What symptom suggests an open circuit in a 4-20mA loop?",
    options: ["Signal stuck at 20mA", "Signal reads 0mA or less than 4mA indicating no current flow", "Erratic fluctuating readings", "Normal operation"],
    correctAnswer: 1,
    explanation: "An open circuit prevents any current from flowing, resulting in 0mA or a reading below the 4mA minimum. This is often caused by broken wires, loose connections, or failed terminations."
  },
  {
    id: 2,
    question: "What's a sign of reversed polarity?",
    options: ["Normal signal levels", "Transmitter fails to power up, or negative current indication", "Signal stuck at 12mA", "Improved accuracy"],
    correctAnswer: 1,
    explanation: "Reversed polarity prevents 2-wire transmitters from operating because they require correct polarity for their internal electronics. The transmitter won't power up and the loop shows no current."
  },
  {
    id: 3,
    question: "How can improper shielding cause problems?",
    options: ["It reduces cable weight", "It allows electromagnetic interference to couple into signal wires, causing noise and unstable readings", "It increases current flow", "It has no effect"],
    correctAnswer: 1,
    explanation: "Improper shielding allows EMI from motors, VFDs, and other equipment to couple into signal wires, causing noise, unstable readings, and measurement errors."
  },
  {
    id: 4,
    question: "What fault might cause signal drift or offset errors?",
    options: ["Open circuit", "High resistance connections, corrosion, or water ingress affecting terminations", "Reversed polarity", "Missing labels"],
    correctAnswer: 1,
    explanation: "High resistance connections from corrosion, loose terminations, or water ingress cause voltage drops that vary with current, leading to signal drift and offset errors."
  },
  {
    id: 5,
    question: "Why is insulation resistance important?",
    options: ["For colour identification", "Low insulation resistance allows leakage currents causing measurement errors and potential safety hazards", "It affects cable weight", "It determines cable colour"],
    correctAnswer: 1,
    explanation: "Low insulation resistance allows leakage currents between conductors or to earth, causing measurement errors. Minimum 1 Megohm is typically required for reliable operation."
  },
  {
    id: 6,
    question: "What causes a short circuit in a 4-20mA loop?",
    options: ["Open connections", "Conductors touching due to damaged insulation, water ingress, or incorrect termination", "Low battery", "Wrong cable type"],
    correctAnswer: 1,
    explanation: "Short circuits occur when conductors make unintended contact due to damaged insulation, water ingress, pinched cables, or crossed wires at terminations."
  },
  {
    id: 7,
    question: "What symptom indicates a ground loop problem?",
    options: ["Zero current reading", "Signal noise, 50/60Hz interference pattern, or readings that shift when touching equipment", "Constant 20mA reading", "No power to transmitter"],
    correctAnswer: 1,
    explanation: "Ground loops cause circulating currents that appear as 50/60Hz noise, drifting signals, or readings that change when touching equipment due to body capacitance effects."
  },
  {
    id: 8,
    question: "What is the purpose of continuity testing before commissioning?",
    options: ["To test insulation", "To verify the complete circuit path exists with no breaks before applying power", "To measure current", "To check cable colour"],
    correctAnswer: 1,
    explanation: "Continuity testing verifies the complete circuit path exists with no breaks in wiring, confirming all connections are made before applying power to the loop."
  },
  {
    id: 9,
    question: "What might cause intermittent signal faults?",
    options: ["Permanent open circuit", "Loose connections that make and break contact due to vibration or temperature changes", "Correct installation", "Proper shielding"],
    correctAnswer: 1,
    explanation: "Intermittent faults are often caused by loose connections that make and break contact due to vibration, thermal expansion, or corroded terminals."
  },
  {
    id: 10,
    question: "How should you troubleshoot an erratic 4-20mA signal?",
    options: ["Replace all cables immediately", "Systematically check for EMI sources, shield integrity, loose connections, and ground loops", "Ignore it", "Increase the supply voltage"],
    correctAnswer: 1,
    explanation: "Systematic troubleshooting involves checking EMI sources nearby, verifying shield continuity and earthing, inspecting connections, and testing for ground loops using isolation techniques."
  }
];

const faqs = [
  {
    question: "How can I tell the difference between an open circuit and a faulty transmitter?",
    answer: "Disconnect the transmitter and use a loop calibrator in source mode. If the receiver responds correctly to the calibrator, the transmitter is faulty. If not, the fault is in the wiring or receiver."
  },
  {
    question: "What's the quickest way to find an intermittent connection?",
    answer: "While monitoring the signal, systematically flex cables and tap on junction boxes and terminations. The fault location often becomes apparent when the signal drops out during manipulation."
  },
  {
    question: "Why does my signal have 50Hz noise?",
    answer: "50Hz noise typically indicates a ground loop, poor shielding, or cables routed too close to power cables. Check shield earthing, cable routing, and verify single-point grounding."
  },
  {
    question: "Can water in a junction box cause signal problems?",
    answer: "Yes. Water creates leakage paths between terminals, lowering insulation resistance and causing signal drift, noise, and potential short circuits. Inspect and dry boxes, then identify the water source."
  },
  {
    question: "Should I earth the shield at both ends for long cable runs?",
    answer: "No. Even for long runs, earth at one end only to prevent ground loops. For very long runs or high EMI environments, consider using optical isolation or digital protocols instead."
  },
  {
    question: "How do I test for a ground loop without special equipment?",
    answer: "Temporarily disconnect the earth at one end of the shield and observe the signal. If noise reduces significantly, a ground loop exists. Implement proper single-point earthing."
  }
];

const InstrumentationModule7Section7 = () => {
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
            <AlertTriangle className="h-4 w-4" />
            <span>Module 7 Section 7</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Common Wiring Faults and Loop Integrity Checks
          </h1>
          <p className="text-white/80">
            Identifying and diagnosing wiring problems in instrumentation loops
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Open Circuit:</strong> 0mA reading, no current flow</li>
              <li><strong>Short Circuit:</strong> Maximum current, damaged insulation</li>
              <li><strong>Ground Loop:</strong> 50/60Hz noise, multiple earths</li>
              <li><strong>High Resistance:</strong> Signal drift, loose connections</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Signal below 4mA indicates wiring fault, not sensor issue</li>
              <li><strong>Use:</strong> Earth shields at single point only to prevent ground loops</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify symptoms of common wiring faults",
              "Diagnose open circuits and short circuits",
              "Understand ground loop causes and prevention",
              "Test insulation resistance and continuity",
              "Troubleshoot intermittent connection faults",
              "Verify shield integrity and termination"
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
            Open Circuits and Connection Failures
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              An open circuit is one of the most common wiring faults, preventing current flow
              through the loop. This results in a reading of 0mA or below the 4mA minimum,
              clearly indicating a wiring problem rather than a process issue.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common Causes:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Broken Conductors:</strong> Physical damage, strain, or fatigue failure</li>
                <li><strong>Loose Terminations:</strong> Screws not tightened, ferrules pulled out</li>
                <li><strong>Corroded Connections:</strong> Environmental damage at terminals</li>
                <li><strong>Disconnected Wires:</strong> Maintenance work not restored</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Diagnostic Approach:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Visual Inspection:</strong> Check all visible connections and cable condition</li>
                <li><strong>Continuity Test:</strong> Test end-to-end with power removed</li>
                <li><strong>Section Testing:</strong> Divide loop into sections to isolate fault location</li>
                <li><strong>Resistance Measurement:</strong> Compare to expected cable resistance</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Ground Loops and EMI Problems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Ground loops occur when a circuit has multiple connections to earth at different
              potentials. Small voltage differences between earth points cause circulating
              currents that interfere with the measurement signal.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Symptoms:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>50/60Hz Noise:</strong> Mains frequency interference pattern</li>
                <li><strong>Drifting Signals:</strong> Readings that shift over time</li>
                <li><strong>Touch Sensitivity:</strong> Signal changes when touching equipment</li>
                <li><strong>Inconsistent Readings:</strong> Different values at transmitter vs receiver</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Prevention:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Single-Point Earthing:</strong> Earth shield at control room end only</li>
                <li><strong>Galvanic Isolation:</strong> Use isolators where needed</li>
                <li><strong>Proper Shield Termination:</strong> Continuous shield, single earth connection</li>
                <li><strong>Cable Segregation:</strong> Separate instrument cables from power cables</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Short Circuits and Insulation Failures
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Short circuits occur when conductors make unintended contact, bypassing part
              of the circuit. This can result from damaged insulation, water ingress, or
              incorrect wiring at termination points.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common Causes:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Damaged Insulation:</strong> Mechanical damage, rodent damage, UV degradation</li>
                <li><strong>Water Ingress:</strong> Moisture in junction boxes or cable glands</li>
                <li><strong>Crossed Wires:</strong> Incorrect termination or bare wire touching</li>
                <li><strong>Pinched Cables:</strong> Cables trapped in enclosure doors or glands</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Insulation Testing:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Test Voltage:</strong> 500V or 1000V DC insulation tester</li>
                <li><strong>Core-to-Core:</strong> Test between signal conductors</li>
                <li><strong>Core-to-Shield:</strong> Test each conductor to cable shield</li>
                <li><strong>Core-to-Earth:</strong> Test each conductor to earth</li>
                <li><strong>Minimum Requirement:</strong> Greater than 1 Megohm for reliable operation</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Systematic Troubleshooting Approach
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective troubleshooting requires a systematic approach that isolates the fault
              location efficiently. Starting with simple checks and progressively testing each
              component saves time and prevents unnecessary equipment replacement.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Diagnostic Sequence:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Step 1:</strong> Verify symptom and gather information from operators</li>
                <li><strong>Step 2:</strong> Check power supply voltage and polarity</li>
                <li><strong>Step 3:</strong> Measure loop current at multiple points</li>
                <li><strong>Step 4:</strong> Test transmitter with calibrator substitution</li>
                <li><strong>Step 5:</strong> Test receiver with signal injection</li>
                <li><strong>Step 6:</strong> Check wiring continuity and insulation</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Documentation:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Record Findings:</strong> Document all measurements and observations</li>
                <li><strong>Update Records:</strong> Note repairs and modifications made</li>
                <li><strong>Root Cause:</strong> Identify why the fault occurred</li>
                <li><strong>Prevention:</strong> Recommend actions to prevent recurrence</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Real World Example */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">Real World Example</h2>
          <div className="p-4 rounded-lg bg-card/50 border border-white/10">
            <h3 className="text-sm font-medium text-elec-yellow mb-2">Intermittent Level Reading Fault</h3>
            <p className="text-sm text-white mb-3">
              A level transmitter reports erratic readings that occasionally drop to zero.
              The operations team suspects a faulty transmitter, but systematic troubleshooting
              reveals a different cause.
            </p>
            <div className="text-sm text-white space-y-2">
              <p><strong>Investigation:</strong> Calibrator test at transmitter shows stable 4-20mA output tracking level changes correctly. Signal measured at DCS shows intermittent dropouts not present at transmitter.</p>
              <p><strong>Finding:</strong> Junction box inspection reveals corroded terminal with green oxide deposits. Vibration from nearby pump causes intermittent loss of contact.</p>
              <p><strong>Resolution:</strong> Cleaned terminals, replaced terminal block, applied corrosion inhibitor. Identified failed gland seal allowing moisture ingress. Replaced gland and verified IP rating restored.</p>
              <p><strong>Lesson:</strong> Systematic testing isolated the fault to wiring, not the transmitter, avoiding unnecessary equipment replacement and identifying the root cause of moisture ingress.</p>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Fault Diagnosis Steps</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always check the simplest things first (power, fuses, connections)</li>
                <li>Use substitution testing to isolate transmitter vs wiring faults</li>
                <li>Measure at multiple points to locate fault position</li>
                <li>Document findings for future reference</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Prevention Measures</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Regular visual inspection of junction boxes and terminations</li>
                <li>Ensure proper IP rating of all enclosures</li>
                <li>Apply corrosion inhibitor to outdoor terminals</li>
                <li>Verify single-point shield earthing at installation</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Assuming transmitter fault</strong> - always verify wiring first</li>
                <li><strong>Earthing shields at both ends</strong> - creates ground loops</li>
                <li><strong>Ignoring intermittent faults</strong> - they indicate developing problems</li>
                <li><strong>Not testing insulation</strong> - low insulation causes subtle errors</li>
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
            <Link to="../section-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/instrumentation-module-8">
              Complete Module 7
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default InstrumentationModule7Section7;
