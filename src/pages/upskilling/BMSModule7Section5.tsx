import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "pre-functional-order",
    question: "Why must pre-functional commissioning happen before full sequences are tested?",
    options: [
      "To reduce overall commissioning time",
      "To prevent equipment damage from basic wiring and power issues",
      "To satisfy insurance requirements",
      "To train building operators"
    ],
    correctIndex: 1,
    explanation: "Pre-functional commissioning must happen first to prevent equipment damage and wasted time. Testing complex sequences without verifying basic wiring can damage equipment, corrupt controllers, or create safety hazards."
  },
  {
    id: "functional-purpose",
    question: "What is one purpose of functional commissioning?",
    options: [
      "To verify cable terminations are correct",
      "To test complete sequences and system integration",
      "To measure power supply voltages",
      "To label devices and panels"
    ],
    correctIndex: 1,
    explanation: "Functional commissioning tests complete sequences of operations, alarm responses, system integration, and overall performance according to design specifications - going beyond individual component testing."
  },
  {
    id: "alarm-testing",
    question: "Why are alarm and fail-safe simulations carried out during commissioning?",
    options: [
      "To test system performance under normal conditions",
      "To ensure emergency shutdowns and safety systems work correctly",
      "To calibrate sensors and actuators",
      "To verify communication protocols"
    ],
    correctIndex: 1,
    explanation: "Alarm and fail-safe simulations verify that emergency responses, safety shutdowns, and protective systems operate correctly when needed. These are critical for occupant safety and equipment protection."
  }
];

const faqs = [
  {
    question: "What happens if pre-functional testing is skipped?",
    answer: "Skipping pre-functional testing leads to wasted time during functional commissioning when basic wiring and power issues are discovered. It can also damage equipment if fundamental electrical problems exist."
  },
  {
    question: "How long does commissioning typically take?",
    answer: "Pre-functional commissioning usually takes 1-3 days per major system, while functional commissioning can take 1-2 weeks depending on system complexity and the number of sequences to test."
  },
  {
    question: "What should be done if functional testing reveals wiring errors?",
    answer: "Stop testing immediately, isolate power safely, correct the wiring error, verify the fix with multimeter testing, update documentation, and restart functional testing from the beginning of that sequence."
  },
  {
    question: "Why is documentation so important during commissioning?",
    answer: "Documentation provides proof that systems work correctly, creates troubleshooting references for future maintenance, satisfies warranty requirements, and ensures building operators understand system operation."
  }
];

const quizQuestion = {
  question: "In a large office project, why did AHU dampers fail to close during fire alarm simulation despite working during normal testing?",
  options: [
    "Programming error in the fire alarm logic",
    "Actuator power supply failure during testing",
    "Actuator was wired to the wrong digital output",
    "Communication network failure between systems"
  ],
  correctAnswer: 2,
  explanation: "The actuator was wired to the wrong digital output. During normal operation, this output happened to provide the correct signal, but during fire alarm sequences, the emergency logic used a different output channel. This highlighted the importance of verifying wiring against IO schedules, not just functional operation."
};

const BMSModule7Section5 = () => {
  useSEO({
    title: "Pre-Functional and Functional Commissioning | BMS Module 7.5",
    description: "Learn the two stages of BMS commissioning: pre-functional verification and functional sequence testing."
  });

  const outcomes = [
    "Distinguish between pre-functional and functional commissioning",
    "Explain the types of checks performed at each stage",
    "Recognise the electrician's role in supporting commissioning engineers",
    "Apply best practices for verifying signals, safety interlocks, and system operation"
  ];

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/bms-module-7">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 7.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Pre-Functional and Functional Commissioning
          </h1>
          <p className="text-white">
            System verification and testing for BMS operation
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Pre-functional:</strong> Verify power, wiring, I/O, and safety interlocks</li>
              <li><strong>Functional:</strong> Test complete sequences and system integration</li>
              <li><strong>Goal:</strong> Prove the BMS works exactly as designed</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Commissioning sheets, test procedures, IO lists</li>
              <li><strong>Use:</strong> Support engineers, verify signals, correct wiring issues</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {outcomes.map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Introduction */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What is Commissioning?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Commissioning is the process of proving that a Building Management System (BMS) works exactly as designed. It happens in two stages: <strong>pre-functional commissioning</strong> (basic verification of wiring, power, communication, and safety) and <strong>functional commissioning</strong> (testing full sequences of operations and confirming equipment responds correctly to programmed logic).
            </p>
            <p>
              For electricians, this stage is critical: if signals are miswired, mislabelled, or not powered correctly, commissioning stalls and delays the project. Your preparation and support during this phase directly determines project success.
            </p>
          </div>
        </section>

        {/* Section 02: Pre-Functional Commissioning */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Pre-Functional Commissioning
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Pre-functional commissioning systematically verifies all electrical infrastructure before testing operational sequences. This critical phase prevents equipment damage and ensures safe commissioning.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Power System Verification:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>24V AC/DC supplies: 22-26V under load</li>
                <li>230V single phase: 207-253V (BS7671)</li>
                <li>400V three phase: 360-440V line-to-line</li>
                <li>Control signal voltages: 0-10V, 4-20mA ranges</li>
                <li>Battery backup and UPS systems: Full capacity test</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Digital I/O Testing</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Digital Inputs: Simulate contact closure with jumper</li>
                  <li>Status feedback: Manually operate devices to verify</li>
                  <li>Digital Outputs: Command on/off, check indicators</li>
                  <li>Relay outputs: Check contact closure with multimeter</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Analogue I/O Testing</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Temperature inputs: Use calibrated simulator</li>
                  <li>Pressure inputs: Apply known pressure, verify ±2%</li>
                  <li>Analog outputs: Command 0-100%, measure with multimeter</li>
                  <li>Sensor calibration: Check against traceable instruments</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Safety Interlock Verification (Critical):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Fire Alarm Interface:</strong> Verify equipment shuts down within 5 seconds</li>
                <li><strong>Emergency Stops:</strong> Test immediate power isolation</li>
                <li><strong>High/Low Pressure Trips:</strong> Simulate and verify safe shutdown</li>
                <li><strong>Temperature Limits:</strong> Test high temperature cutouts</li>
              </ul>
            </div>

            <InlineCheck {...quickCheckQuestions[0]} />
          </div>
        </section>

        {/* Section 03: Functional Commissioning */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Functional Commissioning
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Functional commissioning validates complete system operation under real conditions. This comprehensive testing ensures the BMS performs as designed and responds correctly to all operational scenarios.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Performance Acceptance Criteria:</p>
              <div className="grid grid-cols-3 gap-3 text-center text-sm">
                <div className="p-3 rounded bg-transparent border border-white/10">
                  <p className="font-medium text-white mb-1">Temperature</p>
                  <p className="text-white text-xs">±1°C of setpoint</p>
                </div>
                <div className="p-3 rounded bg-transparent border border-white/10">
                  <p className="font-medium text-white mb-1">Response Time</p>
                  <p className="text-white text-xs">&lt;2 minutes to setpoint</p>
                </div>
                <div className="p-3 rounded bg-transparent border border-white/10">
                  <p className="font-medium text-white mb-1">Stability</p>
                  <p className="text-white text-xs">No oscillation &gt;5 min</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">AHU Sequence Testing:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Pre-start checks: Dampers closed, isolation valves shut</li>
                <li>Start sequence: Supply fan → return fan → dampers modulate</li>
                <li>Temperature control: Heating/cooling valve response to setpoint</li>
                <li>Fault conditions: Motor overload, filter blockage, freeze protection</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Boiler Plant Commissioning:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Lead/lag operation: Primary boiler starts first, standby follows</li>
                <li>Staging logic: Additional boilers fire based on demand</li>
                <li>Safety sequences: Low water, high temperature, gas pressure trips</li>
                <li>Efficiency controls: Weather compensation, setback schedules</li>
              </ul>
            </div>

            <InlineCheck {...quickCheckQuestions[1]} />
          </div>
        </section>

        {/* Section 04: Alarm and Safety Testing */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Alarm and Fail-Safe Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Systematic testing of all emergency and alarm conditions is critical for occupant safety and equipment protection.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Critical Alarm Tests:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Fire alarm interface:</strong> All equipment stops within 5 seconds</li>
                <li><strong>High/low pressure:</strong> Equipment trips, backup systems activate</li>
                <li><strong>Power failure:</strong> UPS backup, graceful shutdown sequences</li>
                <li><strong>Communication loss:</strong> Local control mode, fail-safe positions</li>
                <li><strong>Sensor failure:</strong> Switch to backup sensors, alarm notifications</li>
              </ul>
            </div>

            <InlineCheck {...quickCheckQuestions[2]} />
          </div>
        </section>

        {/* Section 05: Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Electrician's Role in Commissioning</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Be on hand to operate field switches, dampers, and valves when requested</li>
                <li>Correct wiring issues quickly if points fail during testing</li>
                <li>Verify signals with multimeters before blaming programming errors</li>
                <li>Ensure access to panels and provide safe isolation if rework is needed</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Best Practices</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Double-check I/O wiring before handover to engineers</li>
                <li>Label circuits and keep drawings updated during changes</li>
                <li>Stay with commissioning engineers to assist with quick response</li>
                <li>Record results in commissioning sheets for O&M documentation</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Skipping pre-functional:</strong> Testing sequences without verifying basic I/O first</li>
                <li><strong>Poor documentation:</strong> Not documenting changes made during commissioning</li>
                <li><strong>Safety shortcuts:</strong> Skipping safety interlock testing to save time</li>
                <li><strong>Inadequate tuning:</strong> Insufficient time for control loop optimisation</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Real World Example */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">Real World Example</h2>
          <div className="p-4 rounded-lg bg-transparent border border-white/10">
            <h3 className="text-sm font-medium text-red-400/80 mb-2">Large Office Project: AHU Fire Safety Testing</h3>
            <p className="text-sm text-white leading-relaxed mb-3">
              During functional commissioning of an AHU, fire alarm simulation revealed that dampers failed to close during emergency shutdown. The system appeared to function normally during pre-functional testing, but failed the critical safety sequence.
            </p>
            <p className="text-sm text-white leading-relaxed mb-3">
              Electricians initially suspected programming errors since the damper actuators had worked correctly during individual testing. Further testing with multimeters showed the actuator had been wired to the wrong digital output. During normal operation, this output happened to provide the correct signal, but during fire alarm sequences, the emergency logic used a different output channel.
            </p>
            <div className="mt-4 p-3 rounded bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-1">Lesson Learned</p>
              <p className="text-xs text-white">
                Always verify wiring against IO schedules, not just functional operation. Test emergency and safety sequences separately from normal operation. Use multimeters to verify signals before assuming programming issues.
              </p>
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
                <p className="text-sm text-white leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference Card */}
        <div className="mt-6 p-5 rounded-lg bg-transparent border border-white/10">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">Pre-Functional Checks</p>
              <ul className="space-y-0.5">
                <li>Power supply verification</li>
                <li>I/O point testing</li>
                <li>Safety interlock verification</li>
                <li>Communication testing</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Functional Tests</p>
              <ul className="space-y-0.5">
                <li>Complete sequence testing</li>
                <li>Alarm and fail-safe simulation</li>
                <li>System integration verification</li>
                <li>Performance validation</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <section className="my-10">
          <SingleQuestionQuiz
            question={quizQuestion.question}
            options={quizQuestion.options}
            correctAnswer={quizQuestion.correctAnswer}
            explanation={quizQuestion.explanation}
          />
        </section>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bms-module-7-section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Software Upload
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bms-module-7-section-6">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BMSModule7Section5;
