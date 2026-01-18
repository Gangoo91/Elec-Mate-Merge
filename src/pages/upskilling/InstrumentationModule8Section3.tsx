import { ArrowLeft, ArrowRight, Settings2, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Using Loop Calibrators and Simulators for Diagnostics - Instrumentation Course";
const DESCRIPTION = "Learn to use loop calibrators and signal simulators to diagnose 4-20mA faults, inject known signals, and isolate problems between sensors and controllers.";

const quickCheckQuestions = [
  {
    question: "What's the purpose of using a loop calibrator during diagnostics?",
    options: [
      "To replace multimeters",
      "To inject known signals and isolate faults between sensor and controller sides",
      "To generate random test values",
      "To permanently modify loop settings"
    ],
    correctAnswer: 1
  },
  {
    question: "If you inject 12mA with a calibrator and the controller shows exactly 50%, what does this confirm?",
    options: [
      "The transmitter is faulty",
      "The loop wiring and controller are functioning correctly",
      "The calibrator is broken",
      "The power supply is unstable"
    ],
    correctAnswer: 1
  }
];

const quizQuestions = [
  {
    id: "im8s3-q1",
    question: "What tool would you use to simulate a 12mA signal?",
    options: [
      "A multimeter",
      "A loop calibrator or process calibrator",
      "An oscilloscope",
      "A power supply"
    ],
    correctAnswer: 1,
    explanation: "A loop calibrator or process calibrator can generate precise current signals like 12mA to simulate transmitter outputs for testing purposes."
  },
  {
    id: "im8s3-q2",
    question: "Why is simulation useful during loop testing?",
    options: [
      "It's cheaper than using real sensors",
      "It provides known, controllable signals to isolate faults between sensor and controller sides",
      "It's faster than other methods",
      "It doesn't require any tools"
    ],
    correctAnswer: 1,
    explanation: "Simulation provides known, controllable signals that help isolate whether faults are on the sensor side or controller side, eliminating guesswork in diagnostics."
  },
  {
    id: "im8s3-q3",
    question: "What does it mean if a simulated signal works but the real signal doesn't?",
    options: [
      "The controller is faulty",
      "The wiring is damaged",
      "The sensor/transmitter is likely faulty since the loop and controller respond correctly to known signals",
      "The power supply is wrong"
    ],
    correctAnswer: 2,
    explanation: "If the simulated signal works correctly, it proves the loop wiring and controller are functioning properly, indicating the fault lies in the sensor or transmitter."
  },
  {
    id: "im8s3-q4",
    question: "When would you use a multimeter vs a calibrator?",
    options: [
      "Always use a multimeter first",
      "Multimeter to measure existing signals; calibrator to generate known test signals",
      "They do the same thing",
      "Calibrators are only for digital signals"
    ],
    correctAnswer: 1,
    explanation: "Use a multimeter to measure existing signals and verify readings; use a calibrator to generate known test signals for systematic troubleshooting and isolation testing."
  },
  {
    id: "im8s3-q5",
    question: "What's the benefit of using loop-back testing?",
    options: [
      "It tests only the sensor",
      "It verifies the complete signal path from output back to input, testing end-to-end loop integrity",
      "It's the cheapest method",
      "It only works with digital signals"
    ],
    correctAnswer: 1,
    explanation: "Loop-back testing connects the calibrator output to the system input, verifying the complete signal path and end-to-end loop integrity including cables and controller."
  }
];

const faqs = [
  {
    question: "What's the difference between a loop calibrator and a process calibrator?",
    answer: "A loop calibrator is typically a simpler device focused on 4-20mA current loops, whilst a process calibrator is more versatile and can handle multiple signal types including voltage, RTDs, thermocouples, frequency, and pressure. Process calibrators often include HART communication capabilities."
  },
  {
    question: "Can I damage equipment by using a calibrator incorrectly?",
    answer: "Yes, incorrect polarity connections can damage sensitive electronics. Always verify positive and negative terminals before connecting. Also ensure the calibrator is set to the correct mode (source vs simulate) before connecting to live systems."
  },
  {
    question: "What's a 5-point calibration check?",
    answer: "A 5-point check tests the loop response at 0%, 25%, 50%, 75%, and 100% of the signal range (4mA, 8mA, 12mA, 16mA, and 20mA). This verifies linearity across the full measurement range and identifies any non-linear responses or drift at specific points."
  },
  {
    question: "How do I know which side of the loop has the fault?",
    answer: "Connect your calibrator in place of the transmitter and inject known signals. If the controller responds correctly, the fault is likely in the transmitter or sensor. If the controller doesn't respond, check the wiring, input card, or power supply on the controller side."
  }
];

const InstrumentationModule8Section3 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-4 py-3">
          <Link to="/study-centre/upskilling/instrumentation-module-8">
            <Button variant="ghost" size="sm" className="text-white hover:text-elec-yellow touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Module 8
            </Button>
          </Link>
        </div>
      </div>

      {/* Centred Title Header */}
      <div className="px-4 pt-6 pb-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-elec-yellow/20 mb-4">
          <Settings2 className="h-6 w-6 text-elec-yellow" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Using Loop Calibrators and Simulators for Diagnostics</h1>
        <p className="text-gray-400 text-sm">Section 8.3 - 20 minutes</p>
      </div>

      {/* Main Content */}
      <div className="px-4 pb-24 max-w-3xl mx-auto">
        {/* Quick Summary Boxes - Level 2 Pattern */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li>- Calibrators inject known signals</li>
              <li>- Isolate sensor vs controller faults</li>
              <li>- Test at 4, 8, 12, 16, 20mA points</li>
              <li>- Eliminates diagnostic guesswork</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li>- Erratic readings despite good wiring</li>
              <li>- Need to prove transmitter fault</li>
              <li>- Controller not responding correctly</li>
              <li>- Linearity verification required</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-elec-yellow" />
            Learning Outcomes
          </h2>
          <div className="bg-card/30 rounded-lg p-4 space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-elec-yellow text-xs font-bold">1</span>
              </div>
              <p className="text-gray-300 text-sm">Learn how to simulate sensor signals using a calibrator</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-elec-yellow text-xs font-bold">2</span>
              </div>
              <p className="text-gray-300 text-sm">Verify whether the issue lies in the sensor or controller</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-elec-yellow text-xs font-bold">3</span>
              </div>
              <p className="text-gray-300 text-sm">Use signal injection to isolate sections of the loop</p>
            </div>
          </div>
        </div>

        {/* Section 01: Calibrator Diagnostic Process */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-elec-yellow font-mono text-sm">01</span>
            <h2 className="text-xl font-semibold text-white">Loop Calibrator Diagnostic Process</h2>
          </div>
          <div className="space-y-4 text-gray-300">
            <p>
              Loop calibrators and signal simulators are essential tools when it comes to
              identifying where a fault exists within a 4-20mA loop. These instruments allow
              technicians to inject known signals into the system and verify the response,
              effectively isolating the problem to either the sensor side or the controller side.
            </p>
            <div className="bg-card/30 rounded-lg p-4">
              <h4 className="text-white font-medium mb-3">Step-by-Step Diagnostic Process</h4>
              <div className="space-y-3">
                <div className="border-l-2 border-elec-yellow/30 pl-3">
                  <p className="text-sm font-medium text-white">Step 1: Connect Calibrator in Place of Transmitter</p>
                  <p className="text-sm text-gray-400">Safely disconnect the field transmitter and wire the calibrator to simulate the output. Verify polarity and confirm 24V loop power.</p>
                </div>
                <div className="border-l-2 border-elec-yellow/30 pl-3">
                  <p className="text-sm font-medium text-white">Step 2: Inject Known Signal (e.g., 12mA = 50%)</p>
                  <p className="text-sm text-gray-400">Test at 4mA (0%), 12mA (50%), and 20mA (100%) minimum. Record actual vs expected readings.</p>
                </div>
                <div className="border-l-2 border-elec-yellow/30 pl-3">
                  <p className="text-sm font-medium text-white">Step 3: Observe Control System Response</p>
                  <p className="text-sm text-gray-400">Check controller displays match calibrator output. Verify alarm functions and data logging.</p>
                </div>
                <div className="border-l-2 border-elec-yellow/30 pl-3">
                  <p className="text-sm font-medium text-white">Step 4: Interpret Results</p>
                  <p className="text-sm text-gray-400">If controller responds correctly, fault is likely in transmitter. If not, check wiring and input card.</p>
                </div>
                <div className="border-l-2 border-elec-yellow/30 pl-3">
                  <p className="text-sm font-medium text-white">Step 5: Compare Real Signal to Simulated Values</p>
                  <p className="text-sm text-gray-400">Reconnect transmitter and compare field reading to calibrator test results.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Inline Check 1 */}
        <div className="mb-8">
          <InlineCheck
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctAnswer={quickCheckQuestions[0].correctAnswer}
          />
        </div>

        {/* Section 02: Signal Values Reference */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-elec-yellow font-mono text-sm">02</span>
            <h2 className="text-xl font-semibold text-white">Standard Test Signal Values</h2>
          </div>
          <div className="space-y-4 text-gray-300">
            <p>
              Using standardised test points ensures consistent diagnostics and makes it easier
              to identify non-linear responses or specific fault conditions.
            </p>
            <div className="bg-card/30 rounded-lg p-4">
              <h4 className="text-white font-medium mb-3">4-20mA Signal Reference</h4>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <div className="bg-elec-yellow/10 rounded p-3 text-centre">
                  <p className="text-elec-yellow font-mono text-lg">4.00mA</p>
                  <p className="text-gray-400 text-xs">0% Scale</p>
                </div>
                <div className="bg-elec-yellow/10 rounded p-3 text-centre">
                  <p className="text-elec-yellow font-mono text-lg">8.00mA</p>
                  <p className="text-gray-400 text-xs">25% Scale</p>
                </div>
                <div className="bg-elec-yellow/10 rounded p-3 text-centre">
                  <p className="text-elec-yellow font-mono text-lg">12.00mA</p>
                  <p className="text-gray-400 text-xs">50% Scale</p>
                </div>
                <div className="bg-elec-yellow/10 rounded p-3 text-centre">
                  <p className="text-elec-yellow font-mono text-lg">16.00mA</p>
                  <p className="text-gray-400 text-xs">75% Scale</p>
                </div>
                <div className="bg-elec-yellow/10 rounded p-3 text-centre">
                  <p className="text-elec-yellow font-mono text-lg">20.00mA</p>
                  <p className="text-gray-400 text-xs">100% Scale</p>
                </div>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h5 className="text-green-400 font-medium mb-2">If Controller Responds Correctly</h5>
                <ul className="text-sm space-y-1">
                  <li>- Loop wiring is intact</li>
                  <li>- Controller input card functioning</li>
                  <li>- Problem likely in transmitter/sensor</li>
                  <li>- Consider sensor calibration issues</li>
                </ul>
              </div>
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <h5 className="text-red-400 font-medium mb-2">If Controller Doesn't Respond</h5>
                <ul className="text-sm space-y-1">
                  <li>- Check loop wiring continuity</li>
                  <li>- Verify controller input card</li>
                  <li>- Test loop power supply voltage</li>
                  <li>- Check for grounding issues</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Section 03: Advanced Calibrator Techniques */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-elec-yellow font-mono text-sm">03</span>
            <h2 className="text-xl font-semibold text-white">Advanced Calibrator Techniques</h2>
          </div>
          <div className="space-y-4 text-gray-300">
            <p>
              Beyond basic signal injection, calibrators can be used for more sophisticated
              testing methods that provide deeper insight into loop performance.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-card/30 rounded-lg p-4">
                <h5 className="text-white font-medium mb-2">Loop-Back Testing</h5>
                <ul className="text-sm space-y-1">
                  <li>- Connect calibrator output to input</li>
                  <li>- Verify end-to-end loop integrity</li>
                  <li>- Test complete signal path</li>
                  <li>- Isolate cable vs controller issues</li>
                </ul>
              </div>
              <div className="bg-card/30 rounded-lg p-4">
                <h5 className="text-white font-medium mb-2">Dynamic Response Testing</h5>
                <ul className="text-sm space-y-1">
                  <li>- Step signal changes (4mA to 20mA)</li>
                  <li>- Measure controller response time</li>
                  <li>- Test system damping characteristics</li>
                  <li>- Verify control loop stability</li>
                </ul>
              </div>
              <div className="bg-card/30 rounded-lg p-4">
                <h5 className="text-white font-medium mb-2">Multi-Point Calibration</h5>
                <ul className="text-sm space-y-1">
                  <li>- Test 5-point linearity check</li>
                  <li>- Identify non-linear responses</li>
                  <li>- Validate scaling accuracy</li>
                  <li>- Detect drift patterns</li>
                </ul>
              </div>
              <div className="bg-card/30 rounded-lg p-4">
                <h5 className="text-white font-medium mb-2">HART Communication Testing</h5>
                <ul className="text-sm space-y-1">
                  <li>- Test digital communication integrity</li>
                  <li>- Verify device identification</li>
                  <li>- Check diagnostic information</li>
                  <li>- Validate configuration parameters</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Inline Check 2 */}
        <div className="mb-8">
          <InlineCheck
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctAnswer={quickCheckQuestions[1].correctAnswer}
          />
        </div>

        {/* Section 04: Real World Example */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-elec-yellow font-mono text-sm">04</span>
            <h2 className="text-xl font-semibold text-white">Real World Example</h2>
          </div>
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg p-4">
            <h4 className="text-blue-400 font-medium mb-3">Faulty pH Transmitter Investigation</h4>
            <p className="text-gray-300 text-sm mb-4">
              A technician suspects a faulty pH transmitter after receiving reports of erratic
              readings that don't correlate with process conditions. Using a loop calibrator,
              he systematically isolates the problem.
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex items-start gap-2">
                <span className="text-blue-400 font-mono text-xs">1</span>
                <p className="text-sm text-gray-300">Disconnected pH transmitter and connected calibrator</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-400 font-mono text-xs">2</span>
                <p className="text-sm text-gray-300">Injected 12mA signal (7.0 pH equivalent)</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-400 font-mono text-xs">3</span>
                <p className="text-sm text-gray-300">Control system displayed exactly 7.0 pH</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-400 font-mono text-xs">4</span>
                <p className="text-sm text-gray-300">Tested full range from 4-20mA with perfect response</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-400 font-mono text-xs">5</span>
                <p className="text-sm text-gray-300">Reconnected transmitter - erratic readings returned</p>
              </div>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
              <p className="text-green-400 font-medium text-sm mb-1">Result</p>
              <p className="text-gray-300 text-sm">
                The calibrator test confirmed the transmitter failure. When the simulator
                produced accurate system responses, it proved the loop wiring and controller
                were functioning correctly, eliminating hours of unnecessary troubleshooting.
              </p>
            </div>
          </div>
        </div>

        {/* Practical Guidance */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-white mb-4">Practical Guidance</h3>
          <div className="bg-card/30 rounded-lg p-4 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2"></div>
              <p className="text-gray-300 text-sm">Always verify calibrator battery level before starting diagnostics to avoid inaccurate readings mid-test.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2"></div>
              <p className="text-gray-300 text-sm">Document all test readings in a structured format for future reference and trend analysis.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2"></div>
              <p className="text-gray-300 text-sm">When testing multiple loops, work systematically and label all connections to avoid confusion.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2"></div>
              <p className="text-gray-300 text-sm">Keep calibrators in their protective cases when not in use to maintain accuracy and prevent damage.</p>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-white mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-card/30 rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">{faq.question}</h4>
                <p className="text-gray-400 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quiz Section */}
        <div className="mb-12">
          <Quiz
            title="Section 8.3 Knowledge Check"
            questions={quizQuestions}
          />
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-white/10">
          <Link to="/study-centre/upskilling/instrumentation-module-8-section-2">
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
          </Link>
          <Link to="/study-centre/upskilling/instrumentation-module-8-section-4">
            <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/80 touch-manipulation active:scale-[0.98]">
              Next Section
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InstrumentationModule8Section3;
