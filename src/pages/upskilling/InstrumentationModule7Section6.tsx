import { ArrowLeft, Wrench, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Loop Testing Tools - Instrumentation Course";
const DESCRIPTION = "Learn how to use loop calibrators, signal simulators, and multimeters for testing, commissioning, and troubleshooting 4-20mA current loops.";

const quickCheckQuestions = [
  {
    id: "m7s6-qc1",
    question: "What current value represents 50% of a 4-20mA signal?",
    options: ["8mA", "10mA", "12mA", "14mA"],
    correctIndex: 2,
    explanation: "12mA represents 50% of the 4-20mA span. The calculation is: 4mA + (50% x 16mA span) = 4mA + 8mA = 12mA."
  },
  {
    id: "m7s6-qc2",
    question: "What is the typical voltage for a powered 4-20mA loop?",
    options: ["12VDC", "24VDC", "48VDC", "5VDC"],
    correctIndex: 1,
    explanation: "24VDC is the industry standard for powered 4-20mA loops, providing adequate compliance voltage for transmitter operation and allowing for cable voltage drops."
  },
  {
    id: "m7s6-qc3",
    question: "When measuring loop current with a multimeter, how must the meter be connected?",
    options: ["In parallel", "In series", "Across the power supply", "To ground only"],
    correctIndex: 1,
    explanation: "A multimeter must be connected in series with the loop to measure current. Breaking the loop and inserting the meter allows current to flow through the meter's internal shunt resistor."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What current should a loop simulator generate to simulate 50% signal?",
    options: ["10.000mA", "12.000mA - midway between 4mA (0%) and 20mA (100%)", "16.000mA", "8.000mA"],
    correctAnswer: 1,
    explanation: "For 50% of a 4-20mA signal: 50% of (20-4) = 8mA, plus the 4mA offset = 12mA. This represents the exact midpoint of the measurement range."
  },
  {
    id: 2,
    question: "What's one key benefit of using a loop calibrator?",
    options: ["It reduces cable costs", "Provides precise current source and measurement capability for accurate loop testing and commissioning", "It increases signal strength automatically", "It eliminates the need for documentation"],
    correctAnswer: 1,
    explanation: "Loop calibrators provide precise current sources and measurement capabilities, enabling accurate testing, commissioning, and troubleshooting of 4-20mA loops with traceable accuracy."
  },
  {
    id: 3,
    question: "How can you test a transmitter with a multimeter?",
    options: ["Only by checking the power supply voltage", "Measure the output current in series with the loop while applying a known input to the transmitter", "Test the cable resistance only", "Check the device nameplate information"],
    correctAnswer: 1,
    explanation: "To test a transmitter with a multimeter, measure the output current by connecting the meter in series with the loop while applying a known input (pressure, temperature, etc.) to verify proper current output."
  },
  {
    id: 4,
    question: "What's the typical voltage range for a powered 4-20mA loop?",
    options: ["12VDC", "24VDC plus or minus 10% (21.6V to 26.4V) for reliable transmitter operation", "48VDC", "5VDC"],
    correctAnswer: 1,
    explanation: "The industry standard for 4-20mA loops is 24VDC plus or minus 10%, providing a range of 21.6V to 26.4V to ensure adequate compliance voltage for proper transmitter operation across the full current range."
  },
  {
    id: 5,
    question: "Why is signal simulation useful during commissioning?",
    options: ["It reduces equipment costs", "Allows testing of receivers and control systems with known, precise signals before connecting actual transmitters", "It eliminates the need for calibration", "It automatically configures all devices"],
    correctAnswer: 1,
    explanation: "Signal simulation allows systematic testing of receivers and control systems with known, precise current values, enabling verification of accuracy, scaling, and alarm functions before connecting actual transmitters."
  },
  {
    id: 6,
    question: "What is the purpose of a span check at 20mA?",
    options: ["To test the power supply", "To verify the receiver shows maximum scale value and calculate span accuracy", "To check cable resistance", "To test alarm functions only"],
    correctAnswer: 1,
    explanation: "A span check at 20mA verifies the receiver shows the correct maximum scale value and allows calculation of span error percentage to ensure the full range is accurate."
  },
  {
    id: 7,
    question: "What accuracy is typical for a professional loop calibrator's current output?",
    options: ["Plus or minus 1%", "Plus or minus 0.1%", "Plus or minus 0.02%", "Plus or minus 5%"],
    correctAnswer: 2,
    explanation: "Professional loop calibrators typically achieve plus or minus 0.02% accuracy for current output, providing the precision needed for calibrating and testing industrial instrumentation."
  },
  {
    id: 8,
    question: "What should you check before performing resistance measurements on a loop?",
    options: ["That the display is working", "That power is removed from the circuit", "That cables are labelled", "That alarms are disabled"],
    correctAnswer: 1,
    explanation: "Power must be removed from the circuit before performing resistance measurements to avoid damaging the meter and to get accurate readings without interference from loop current."
  },
  {
    id: 9,
    question: "What is the minimum insulation resistance typically required for instrumentation cables?",
    options: ["100 kohms", "500 kohms", "1 Megohm", "10 Megohms"],
    correctAnswer: 2,
    explanation: "A minimum of 1 Megohm insulation resistance is typically required for instrumentation cables, measured at 500V or 1000V DC between cores and between cores and earth/shield."
  },
  {
    id: 10,
    question: "What does HART communication capability in a calibrator allow?",
    options: ["Only current measurement", "Digital configuration and diagnostics of smart transmitters", "Faster cable installation", "Automatic fault repair"],
    correctAnswer: 1,
    explanation: "HART capability allows digital configuration, diagnostics, and advanced testing of smart transmitters superimposed on the 4-20mA signal, enabling comprehensive device management."
  }
];

const faqs = [
  {
    question: "Do I need an expensive calibrator for basic loop testing?",
    answer: "For basic testing, a quality multimeter with milliamp range can measure loop current. However, for sourcing signals and comprehensive testing, a dedicated loop calibrator provides the accuracy and functionality needed for professional work."
  },
  {
    question: "How often should loop calibrators be calibrated?",
    answer: "Typically annually, or more frequently in critical applications. Check the manufacturer's recommendations and your site quality requirements. Keep calibration certificates current."
  },
  {
    question: "Can I use a clamp meter for 4-20mA measurement?",
    answer: "Yes, but with limitations. Process clamp meters for low current can measure without breaking the loop, but accuracy is typically plus or minus 0.1mA at best, less precise than series measurement."
  },
  {
    question: "What's the difference between source and simulate modes?",
    answer: "Source mode generates a signal regardless of loop conditions. Simulate mode acts like a transmitter, drawing current from an external power supply. Use simulate for testing powered loops."
  },
  {
    question: "Why does my calibrator reading differ from the DCS reading?",
    answer: "Differences can result from calibrator accuracy, input card accuracy, scaling configuration, or cable voltage drops. Test each element separately to identify the source of discrepancy."
  },
  {
    question: "Should I test at 4mA or 20mA first?",
    answer: "Start with 4mA (zero) as this is the baseline. Adjust zero first, then span at 20mA. Finally verify linearity at intermediate points. This sequence ensures systematic calibration."
  }
];

const InstrumentationModule7Section6 = () => {
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
            <Link to="/electrician/upskilling/instrumentation-module-7">
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
            <Wrench className="h-4 w-4" />
            <span>Module 7 Section 6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Loop Testing Tools
          </h1>
          <p className="text-white/80">
            Loop calibrators, simulators, and multimeters for commissioning and troubleshooting
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Loop Calibrators:</strong> Source and measure precise 4-20mA signals</li>
              <li><strong>Multimeters:</strong> Measure current, voltage, resistance in series</li>
              <li><strong>Zero Check:</strong> 4mA = 0% scale value</li>
              <li><strong>Span Check:</strong> 20mA = 100% scale value</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> 12mA = 50% signal (quick mid-scale check)</li>
              <li><strong>Use:</strong> Always verify calibrator accuracy before critical tests</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Use loop calibrators for sourcing and measuring",
              "Apply multimeter techniques for current measurement",
              "Perform zero, span, and linearity checks",
              "Test receivers with signal simulation",
              "Verify wiring integrity and insulation",
              "Understand advanced calibrator features"
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
            Loop Calibrators and Process Signal Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Loop calibrators are essential tools for commissioning, maintaining, and troubleshooting
              4-20mA current loops. They combine signal source and measurement functions in a portable,
              battery-powered instrument designed for field use.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Source Functions (Simulate Transmitter):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Current Output:</strong> Generate precise 4-20mA signals (typical accuracy plus or minus 0.02%)</li>
                <li><strong>Voltage Output:</strong> 1-5V, 0-10V, and custom voltage ranges</li>
                <li><strong>Resistance Simulation:</strong> RTD and potentiometer values</li>
                <li><strong>Process Units:</strong> Display in engineering units (degrees C, bar, etc.)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Measure Functions (Test Receivers):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Current Measurement:</strong> 4-20mA with high accuracy</li>
                <li><strong>Voltage Measurement:</strong> Loop supply and signal voltages</li>
                <li><strong>24V Loop Supply:</strong> Power externally powered devices</li>
                <li><strong>HART Communication:</strong> Digital configuration and diagnostics</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Multimeter Techniques for Loop Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A quality digital multimeter is fundamental for loop testing, providing current, voltage,
              and resistance measurements. Understanding proper connection techniques ensures accurate
              readings and prevents equipment damage.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Series Current Measurement:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Break Loop:</strong> Insert meter in series with signal path</li>
                <li><strong>Burden Voltage:</strong> Consider meter voltage drop (typically 0.1-1V)</li>
                <li><strong>Range Selection:</strong> Use 20mA or 200mA range for best resolution</li>
                <li><strong>Auto-ranging:</strong> Be aware of range switching delays</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Voltage Measurements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Supply Voltage:</strong> Measure across power supply terminals under load</li>
                <li><strong>Transmitter Terminal Voltage:</strong> Verify adequate compliance voltage</li>
                <li><strong>Voltage Drop:</strong> Calculate cable and load voltage drops</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Resistance Testing:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Power Down:</strong> Always remove power before resistance tests</li>
                <li><strong>Loop Resistance:</strong> Measure total cable resistance</li>
                <li><strong>Insulation Testing:</strong> Use 500V or 1000V insulation tester, minimum 1 Megohm required</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Signal Simulation and Loop Validation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Signal simulators allow testing of receivers and control systems with known, precise
              current values. This enables verification of scaling, alarms, and control functions
              before connecting actual transmitters.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Standard Test Sequence:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Zero Check (4mA):</strong> Verify receiver shows minimum scale value (0%)</li>
                <li><strong>Mid-Scale (12mA):</strong> Verify 50% reading, check linearity</li>
                <li><strong>Span Check (20mA):</strong> Verify receiver shows maximum scale value (100%)</li>
                <li><strong>Alarm Testing:</strong> Verify high/low alarm setpoints trigger correctly</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Tolerance Checking:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Typical Tolerance:</strong> Plus or minus 0.25% of span for process loops</li>
                <li><strong>As-Found Recording:</strong> Document readings before adjustment</li>
                <li><strong>As-Left Recording:</strong> Document readings after calibration</li>
                <li><strong>Pass/Fail Criteria:</strong> Compare against specification limits</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Wiring Integrity and Pre-Test Verification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Before functional testing, verify wiring integrity to ensure safe and accurate results.
              Systematic pre-test checks prevent damage to equipment and identify installation issues.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Pre-Testing Checklist:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Documentation Review:</strong> Check loop drawings and specifications</li>
                <li><strong>Visual Inspection:</strong> Check connections, cable condition, terminations</li>
                <li><strong>Continuity Test:</strong> Confirm complete circuit before applying power</li>
                <li><strong>Insulation Test:</strong> Verify minimum 1 Megohm between cores and earth</li>
                <li><strong>Power Supply Check:</strong> Verify correct voltage and polarity</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common Test Points:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Transmitter Terminals:</strong> Current output and supply voltage</li>
                <li><strong>Junction Boxes:</strong> Intermediate connection verification</li>
                <li><strong>Control Room Terminals:</strong> Input card readings</li>
                <li><strong>Shield Connections:</strong> Single-point earth verification</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Real World Example */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">Real World Example</h2>
          <div className="p-4 rounded-lg bg-card/50 border border-white/10">
            <h3 className="text-sm font-medium text-elec-yellow mb-2">Commissioning a Reactor Temperature Loop</h3>
            <p className="text-sm text-white mb-3">
              A site engineer uses a loop calibrator to validate a new reactor temperature control loop
              before startup, ensuring accurate measurement and proper alarm function.
            </p>
            <div className="text-sm text-white space-y-2">
              <p><strong>Setup:</strong> RTD temperature transmitter (0-200 degrees C, 4-20mA), DCS analog input with 250 ohm load, 150m cable run.</p>
              <p><strong>Test Procedure:</strong> Disconnect transmitter, connect calibrator in simulate mode. Inject 4mA (expect 0 degrees C), 12mA (expect 100 degrees C), 20mA (expect 200 degrees C). Verify DCS reads within plus or minus 0.5 degrees C.</p>
              <p><strong>Result:</strong> All readings within specification. Alarms tested and verified at HH=180 degrees C and LL=10 degrees C. Documentation completed with calibration certificate. Loop released for service.</p>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Commissioning</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always verify calibrator calibration status before starting</li>
                <li>Document as-found and as-left readings for every loop</li>
                <li>Test full range including alarm setpoints</li>
                <li>Verify control response if connected to control system</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">During Troubleshooting</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Start with visual inspection of connections</li>
                <li>Measure current at multiple points to isolate faults</li>
                <li>Compare readings to previous calibration data</li>
                <li>Check power supply voltage under load conditions</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Wrong meter mode</strong> - connecting ammeter in parallel blows fuse</li>
                <li><strong>Testing energised circuits</strong> - measure resistance with power removed</li>
                <li><strong>Ignoring burden voltage</strong> - meter drop affects loop operation</li>
                <li><strong>Missing documentation</strong> - always record test results</li>
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
            <Link to="../instrumentation-module-7-section-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../instrumentation-module-7-section-7">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default InstrumentationModule7Section6;
