import { ArrowLeft, Activity, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Symptoms of Sensor, Loop, or Signal Failure - Instrumentation Course";
const DESCRIPTION = "Learn to identify and distinguish between sensor failures, loop faults, and signal processing problems in instrumentation systems.";

const quickCheckQuestions = [
  {
    id: "m8s2-qc1",
    question: "What does a 4-20mA signal reading of less than 4mA typically indicate?",
    options: ["Normal minimum reading", "Sensor saturation", "Open circuit or wiring fault", "Maximum process value"],
    correctIndex: 2,
    explanation: "A reading below 4mA indicates a loop fault such as an open circuit, broken wire, or power supply failure - not a process measurement issue."
  },
  {
    id: "m8s2-qc2",
    question: "What symptom suggests sensor drift rather than sudden failure?",
    options: ["Signal drops to zero", "Gradual change in readings over time that doesn't match process changes", "Signal stuck at 20mA", "Intermittent dropouts"],
    correctIndex: 1,
    explanation: "Drift appears as gradual change in readings over time that doesn't correlate with actual process changes. It often develops slowly and may not trigger alarms."
  },
  {
    id: "m8s2-qc3",
    question: "How can you distinguish between a sensor fault and a wiring fault?",
    options: ["Check the cable colour", "Substitute a calibrator for the sensor and check if receiver responds correctly", "Measure the ambient temperature", "Check the equipment serial number"],
    correctIndex: 1,
    explanation: "By substituting a calibrator for the sensor, you can inject a known signal. If the receiver responds correctly, the wiring is good and the sensor is faulty."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A signal stuck at 4mA usually means:",
    options: ["Maximum process reading", "Open circuit, power supply failure, or sensor at minimum range", "Signal is normal", "Wiring short circuit"],
    correctAnswer: 1,
    explanation: "A signal stuck at 4mA can indicate the sensor is at minimum range (normal), or there's a power supply failure, open circuit, or the transmitter has failed to its low output state."
  },
  {
    id: 2,
    question: "How would you identify signal drift?",
    options: ["Sudden change in reading", "Compare current reading to known reference values or check calibration history for gradual deviation", "Signal oscillating rapidly", "No change at all"],
    correctAnswer: 1,
    explanation: "Signal drift is identified by comparing current readings to known reference values, checking calibration history for gradual deviation, or noting that readings don't match verified process conditions."
  },
  {
    id: 3,
    question: "What's a common cause of erratic or noisy signals?",
    options: ["Perfect installation", "Electrical interference (EMI), loose connections, or ground loops", "Correct cable routing", "Proper shielding"],
    correctAnswer: 1,
    explanation: "Erratic or noisy signals are commonly caused by EMI from motors or VFDs, loose connections that make intermittent contact, ground loops, or damaged cable shielding."
  },
  {
    id: 4,
    question: "What might cause a signal to be stuck at exactly 20mA?",
    options: ["Open circuit", "Sensor output saturation at maximum, short circuit across sensor, or receiver fault", "Normal operation", "Power supply off"],
    correctAnswer: 1,
    explanation: "A signal stuck at 20mA can indicate the sensor is at maximum range (normal if process is at max), sensor saturation beyond range, short circuit across the transmitter, or receiver input fault."
  },
  {
    id: 5,
    question: "Why might readings differ between transmitter and control room?",
    options: ["They should always match exactly", "Voltage drop in long cables, scaling differences, or A/D converter issues at the receiver", "Different time zones", "Cable colour mismatch"],
    correctAnswer: 1,
    explanation: "Differences between transmitter and control room readings can result from voltage drop in long cable runs, incorrect scaling configuration, A/D converter calibration issues, or input card problems."
  },
  {
    id: 6,
    question: "What does a signal below 3.6mA typically indicate in NAMUR convention?",
    options: ["Normal minimum reading", "Transmitter fault or cable break (downscale fault indication)", "Maximum process value", "Calibration required"],
    correctAnswer: 1,
    explanation: "NAMUR NE43 convention uses below 3.6mA as a downscale fault indication, signalling transmitter failure or cable break. This distinguishes faults from valid minimum readings."
  },
  {
    id: 7,
    question: "What causes signal oscillation or hunting?",
    options: ["Correct installation", "Control loop instability, process instability, or intermittent connection", "Proper tuning", "Good shielding"],
    correctAnswer: 1,
    explanation: "Signal oscillation can result from control loop tuning problems, actual process instability, or electrical issues like intermittent connections that cause the signal to vary."
  },
  {
    id: 8,
    question: "How can you test if a fault is in the sensor or the loop?",
    options: ["Replace both at once", "Use a calibrator to simulate the sensor signal and check if the loop responds correctly", "Check the cable colour", "Measure the cable length"],
    correctAnswer: 1,
    explanation: "By disconnecting the sensor and connecting a calibrator to simulate known signals, you can verify if the loop (wiring and receiver) responds correctly, isolating the sensor."
  },
  {
    id: 9,
    question: "What's the significance of a signal reading negative current?",
    options: ["Normal operation", "Reversed polarity, faulty transmitter, or measurement error", "Maximum reading", "Correct installation"],
    correctAnswer: 1,
    explanation: "Negative current indicates reversed polarity (transmitter connected backwards), a failed transmitter outputting reverse current, or a measurement error in the test equipment."
  },
  {
    id: 10,
    question: "Why is trend data valuable for fault diagnosis?",
    options: ["It looks good in reports", "Shows historical patterns, drift development, and correlation with events", "It's required by law", "It increases storage costs"],
    correctAnswer: 1,
    explanation: "Trend data reveals patterns like gradual drift, intermittent faults, correlation with process events, time-of-day variations, and helps distinguish between sudden failures and developing problems."
  }
];

const faqs = [
  {
    question: "How do I know if drift is in the sensor or the receiver?",
    answer: "Measure the actual current in the loop with a calibrated meter. If the current is correct but the displayed value is wrong, the receiver or scaling is drifting. If the current is wrong, the sensor is drifting."
  },
  {
    question: "What's the difference between noise and signal instability?",
    answer: "Noise is typically high-frequency interference superimposed on the signal. Instability is lower-frequency variation often related to the process or control loop tuning. Noise can be filtered; instability requires process or tuning changes."
  },
  {
    question: "Can a partially blocked impulse line cause symptoms?",
    answer: "Yes. Partial blockage causes sluggish response, delayed readings, and can create oscillation as pressure equalises slowly. Complete blockage causes the reading to freeze at the last value."
  },
  {
    question: "Why does my temperature reading spike when the plant shuts down?",
    answer: "Loss of cooling or process flow can cause actual temperature spikes. Alternatively, electrical noise from shutdown sequences can affect sensitive inputs. Check if multiple readings are affected."
  },
  {
    question: "How can vibration cause signal problems?",
    answer: "Vibration can loosen connections causing intermittent contact, damage sensor elements, create mechanical resonance in pressure sensing elements, and cause premature fatigue failure of cables and components."
  },
  {
    question: "What causes a transmitter to fail to its designed fail-safe state?",
    answer: "Transmitters are designed to fail to a known state (high or low) when they detect internal faults. Power supply problems, internal component failure, or sensor element failure trigger this safety function."
  }
];

const InstrumentationModule8Section2 = () => {
  useSEO({
    title: TITLE,
    description: DESCRIPTION
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/instrumentation-module-8">
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
            <Activity className="h-4 w-4" />
            <span>Module 8 Section 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Symptoms of Sensor, Loop, or Signal Failure
          </h1>
          <p className="text-white/80">
            Recognising and distinguishing different failure modes
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Below 4mA:</strong> Open circuit or power failure</li>
              <li><strong>Stuck at 4mA:</strong> Minimum range or transmitter fault</li>
              <li><strong>Stuck at 20mA:</strong> Maximum range or saturation</li>
              <li><strong>Erratic Signal:</strong> EMI, loose connections, ground loops</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Below 3.6mA = NAMUR fault indication</li>
              <li><strong>Use:</strong> Calibrator substitution isolates sensor vs loop faults</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify sensor failure symptoms",
              "Recognise loop and wiring fault indicators",
              "Distinguish signal processing problems",
              "Interpret trend data for fault diagnosis",
              "Use substitution testing to isolate faults",
              "Understand NAMUR fault indication standards"
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
            Signal Level Indicators
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The current level in a 4-20mA loop provides immediate diagnostic information.
              Understanding what different signal levels indicate helps quickly categorise
              faults and direct troubleshooting efforts.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Below 4mA (Less than 3.6mA):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Open Circuit:</strong> Broken wire, loose connection, failed termination</li>
                <li><strong>Power Failure:</strong> Loop power supply off or failed</li>
                <li><strong>Transmitter Fault:</strong> Internal failure, no output</li>
                <li><strong>NAMUR Indication:</strong> Below 3.6mA signals fault condition</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Stuck at 4mA:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Minimum Range:</strong> Process at lowest measurement point (normal)</li>
                <li><strong>Transmitter Fail-Low:</strong> Internal fault defaulting to minimum</li>
                <li><strong>Sensor Element Open:</strong> RTD or thermocouple break</li>
                <li><strong>Blocked Process Connection:</strong> Impulse line blocked</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Stuck at 20mA:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Maximum Range:</strong> Process at highest measurement point (normal)</li>
                <li><strong>Sensor Saturation:</strong> Process beyond measurement range</li>
                <li><strong>Transmitter Fail-High:</strong> Internal fault defaulting to maximum</li>
                <li><strong>Short Circuit:</strong> Signal wires shorted at transmitter</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Drift and Gradual Degradation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Unlike sudden failures, drift develops gradually over time. The reading slowly
              deviates from the true value, often without triggering alarms. Identifying drift
              requires comparison to known references or calibration history.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common Drift Causes:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Sensor Ageing:</strong> Gradual degradation of sensing element</li>
                <li><strong>Environmental Effects:</strong> Temperature changes affecting electronics</li>
                <li><strong>Process Buildup:</strong> Coating or fouling on sensor element</li>
                <li><strong>Cable Degradation:</strong> Insulation breakdown causing leakage</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Detection Methods:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Reference Comparison:</strong> Compare to known reference or redundant sensor</li>
                <li><strong>Calibration History:</strong> Track as-found values over time</li>
                <li><strong>Process Correlation:</strong> Compare to laboratory analysis or other measurements</li>
                <li><strong>Trend Analysis:</strong> Review long-term trend data for gradual changes</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Noise and Erratic Signals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Erratic or noisy signals indicate problems with signal integrity rather than
              measurement accuracy. These symptoms typically point to wiring issues, EMI,
              or grounding problems rather than sensor failure.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Noise Characteristics:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>50/60Hz Pattern:</strong> Mains frequency interference - ground loop or EMI</li>
                <li><strong>Random Spikes:</strong> Loose connections, intermittent contact</li>
                <li><strong>High Frequency:</strong> VFD or motor drive interference</li>
                <li><strong>Cyclic Pattern:</strong> Process-related or mechanical vibration</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Diagnostic Steps:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Check Shield:</strong> Verify continuous shield with single-point earth</li>
                <li><strong>Inspect Connections:</strong> Look for loose, corroded, or damaged terminals</li>
                <li><strong>Cable Routing:</strong> Check separation from power cables</li>
                <li><strong>Ground Loop:</strong> Test for multiple earth connections</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Isolating Fault Location
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Determining whether a fault is in the sensor, wiring, or receiver requires
              systematic substitution testing. By injecting known signals at different
              points, you can isolate the faulty section.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Substitution Testing:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Step 1:</strong> Disconnect sensor and connect calibrator to loop</li>
                <li><strong>Step 2:</strong> Inject known current (e.g., 12mA for 50%)</li>
                <li><strong>Step 3:</strong> Check receiver displays correct value</li>
                <li><strong>Step 4:</strong> If receiver correct, fault is in sensor</li>
                <li><strong>Step 5:</strong> If receiver incorrect, fault is in loop or receiver</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Interpreting Results:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Receiver responds correctly:</strong> Sensor or sensor wiring fault</li>
                <li><strong>Receiver shows no change:</strong> Loop wiring open circuit</li>
                <li><strong>Receiver shows wrong value:</strong> Scaling error or receiver fault</li>
                <li><strong>Receiver shows noise:</strong> Wiring interference or ground loop</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Real World Example */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">Real World Example</h2>
          <div className="p-4 rounded-lg bg-card/50 border border-white/10">
            <h3 className="text-sm font-medium text-elec-yellow mb-2">Flow Transmitter Reading Low</h3>
            <p className="text-sm text-white mb-3">
              A flow transmitter consistently reads 10% lower than expected. Operations suspect
              sensor drift, but systematic diagnosis reveals a different cause.
            </p>
            <div className="text-sm text-white space-y-2">
              <p><strong>Symptom:</strong> Flow reading consistently low compared to laboratory samples and material balance calculations. No alarms, signal appears stable.</p>
              <p><strong>Calibrator Test:</strong> Inject 12mA at transmitter terminals. DCS shows 48.5% instead of expected 50%. Indicates receiver or scaling issue, not transmitter.</p>
              <p><strong>Investigation:</strong> Check input card scaling configuration. Discover engineering unit range was changed from 0-1000 to 0-1100 during a software update but transmitter range wasn't updated.</p>
              <p><strong>Resolution:</strong> Correct scaling to match transmitter 4-20mA range. Verify reading accuracy with calibrator injection. Document configuration change procedure to prevent recurrence.</p>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Quick Symptom Guide</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Signal below 4mA = Loop problem (open circuit, power)</li>
                <li>Signal stuck at one value = Sensor or process fault</li>
                <li>Erratic signal = EMI, connections, or ground loops</li>
                <li>Gradual change = Drift, fouling, or degradation</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">First Response Steps</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Check if problem is isolated to one loop or multiple</li>
                <li>Review recent changes and maintenance activities</li>
                <li>Compare to redundant sensors if available</li>
                <li>Check alarm history and trend data</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Assuming sensor fault</strong> - always verify before replacing</li>
                <li><strong>Ignoring gradual drift</strong> - small errors compound over time</li>
                <li><strong>Not checking scaling</strong> - configuration errors are common</li>
                <li><strong>Overlooking recent changes</strong> - often the cause of new faults</li>
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
            <Link to="../section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default InstrumentationModule8Section2;
