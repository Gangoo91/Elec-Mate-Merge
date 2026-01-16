import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import { bmsModule3Section6QuizData } from "@/data/upskilling/bmsModule3Section6QuizData";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "environmental-alarms",
    question: "Give one example of an environmental alarm that a BMS might detect.",
    options: [
      "A motor running at normal speed",
      "High CO2 levels in an occupied space",
      "Normal room temperature",
      "Proper filter condition"
    ],
    correctIndex: 1,
    explanation: "High CO2 levels in an occupied space is a common environmental alarm that triggers increased ventilation to maintain acceptable indoor air quality and occupant comfort."
  },
  {
    id: "fire-alarm-action",
    question: "What action might the BMS take during a fire alarm event?",
    options: [
      "Increase heating to all zones",
      "Shut down AHUs to prevent smoke spread and open smoke dampers",
      "Start all ventilation fans at maximum speed",
      "Turn on all lighting circuits"
    ],
    correctIndex: 1,
    explanation: "During a fire alarm event, the BMS typically shuts down air handling units to prevent smoke spread through ductwork and opens designated smoke dampers while activating smoke extract systems according to the fire strategy."
  },
  {
    id: "safety-labelling",
    question: "Why must alarm and shutdown circuits be labelled differently from standard control wiring?",
    options: [
      "To make the installation look more organised",
      "To prevent confusion during maintenance and ensure safety circuits are not accidentally modified",
      "To reduce installation costs",
      "To comply with manufacturer colour preferences"
    ],
    correctIndex: 1,
    explanation: "Alarm and shutdown circuits must be clearly labelled to prevent confusion during maintenance and ensure safety-critical circuits are not accidentally modified, disconnected, or interfered with during routine work."
  },
  {
    id: "shutdown-testing",
    question: "What commissioning step is required to test shutdown sequences?",
    options: [
      "Visual inspection of wiring only",
      "Simulate fire, gas, and fault alarms to prove sequences work correctly",
      "Test only during actual emergencies",
      "Check manufacturer documentation only"
    ],
    correctIndex: 1,
    explanation: "Commissioning must include simulating fire, gas, and fault alarms using appropriate test equipment to prove that all shutdown sequences work correctly, respond within acceptable time limits, and operate in the correct sequence."
  }
];

const faqs = [
  {
    question: "What is the difference between a critical alarm and a high priority alarm?",
    answer: "Critical alarms require immediate emergency shutdown (fire, gas leak) and typically have audible + SMS + email notification. High priority alarms require operator intervention within 15 minutes but don't trigger automatic shutdown - they're things like high temperature or equipment faults that need investigation."
  },
  {
    question: "How does fire system integration work with the BMS?",
    answer: "The fire alarm panel sends signals to the BMS via dedicated interface circuits (hardwired for reliability). The BMS responds by shutting down supply fans, closing fire dampers, opening smoke dampers, starting smoke extract, and releasing magnetic door locks - all according to the building's fire strategy."
  },
  {
    question: "What should happen to the BMS if it loses communication with a safety device?",
    answer: "Loss of communication with a safety device should trigger an alarm and the system should fail to a safe state. For example, if a fire damper actuator loses communication, the damper should close (fail-safe design). Critical safety systems should have hardwired interlocks that don't depend on BMS communication."
  },
  {
    question: "How often should safety systems be tested after initial commissioning?",
    answer: "Weekly tests for alarm notification systems, monthly tests for manual shutdowns and interlocks, and annual complete system tests including fire system integration. All tests should be documented and any issues resolved immediately."
  }
];

const BMSModule3Section6 = () => {
  useSEO({
    title: "Alarm Responses and Safety Shutdowns | BMS Module 3.6",
    description: "Master BMS alarm management and safety shutdown procedures. Learn fire system integration, equipment protection sequences, emergency protocols, and critical safety system commissioning."
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../bms-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        {/* Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 3.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Alarm Responses and Safety Shutdowns
          </h1>
          <p className="text-white/80">
            Critical safety systems and emergency response procedures
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Alarms:</strong> Early warning when limits exceeded</li>
              <li><strong>Shutdowns:</strong> Emergency override to protect life/property</li>
              <li><strong>Fire Integration:</strong> AHU stop, dampers close, extract starts</li>
              <li><strong>Critical:</strong> A single wiring error can compromise safety</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Red/orange labelled circuits, fire panel interfaces</li>
              <li><strong>Use:</strong> Protecting occupants, equipment, preventing escalation</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Alarm response types and purposes",
              "Safety shutdown procedures",
              "Common alarm and shutdown scenarios",
              "Fire system integration requirements",
              "Proper wiring for alarm circuits",
              "Equipment protection sequences",
              "Commissioning and testing procedures",
              "Electrician responsibilities in safety systems"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Alarm Response Systems and Classifications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Alarm response systems continuously monitor building conditions and equipment status, triggering appropriate
              actions when parameters exceed safe operating limits. Effective alarm management prevents minor issues from
              developing into major problems while ensuring critical alarms receive immediate attention.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Alarm Priority Levels:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Critical (Immediate):</strong> Emergency shutdown - fire, gas leak, equipment failure</li>
                <li><strong>High (&lt;15 min):</strong> Operator intervention - high temp, equipment fault</li>
                <li><strong>Medium (&lt;1 hr):</strong> Investigation needed - filter change, maintenance</li>
                <li><strong>Low (&lt;24 hr):</strong> Monitor trend - minor deviation, informational</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Environmental Alarms</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>CO2:</strong> 1000ppm warning, 1500ppm action, 5000ppm danger</li>
                  <li><strong>Temperature:</strong> &lt;5°C freeze, &gt;35°C overheat</li>
                  <li><strong>Humidity:</strong> &lt;30% too dry, &gt;70% condensation</li>
                  <li><strong>Air quality:</strong> VOCs, particulate matter</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Equipment Alarms</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Fan/pump failure:</strong> Current sensor or aux contact</li>
                  <li><strong>Filter condition:</strong> Differential pressure</li>
                  <li><strong>Motor faults:</strong> Overload, overheating</li>
                  <li><strong>Valve position:</strong> Commanded vs actual mismatch</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Power System Monitoring:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Power loss alarms and UPS status</li>
                <li>Circuit breaker status monitoring</li>
                <li>Phase loss detection for motors</li>
                <li>Power quality (voltage, harmonics, power factor)</li>
              </ul>
            </div>

            <InlineCheck {...quickCheckQuestions[0]} />
          </div>
        </section>

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Safety Shutdown Procedures and Integration
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Safety shutdowns override normal BMS operation to protect life, property, and equipment when hazardous
              conditions are detected. These procedures must be fast, reliable, and thoroughly tested to ensure they
              operate correctly during actual emergencies.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fire System Integration Responses:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>General alarm:</strong> Shut supply fans, close fire dampers, maintain extract</li>
                <li><strong>Smoke detection:</strong> Stop zone AHUs, close supply, open smoke extract</li>
                <li><strong>Stairwell:</strong> Pressurisation mode, open stair supply, extract from lobby</li>
                <li><strong>Plant room:</strong> Emergency shutdown, close all dampers, dedicated extract</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Equipment Protection</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Chiller:</strong> High pressure → stage down → lockout</li>
                  <li><strong>Boiler:</strong> Flame fail → close gas → post-purge</li>
                  <li><strong>Pump:</strong> Dry run → stop → start standby</li>
                  <li><strong>Motor:</strong> Overload → disconnect → cool down</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Gas Detection Response</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Natural gas:</strong> Close supply, eliminate ignition</li>
                  <li><strong>CO:</strong> Increase ventilation, evacuation alert</li>
                  <li><strong>Refrigerant:</strong> Shutdown, emergency vent</li>
                  <li><strong>Chemical:</strong> Containment, emergency notify</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Power Failure Procedures:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Orderly shutdown on UPS low battery</li>
                <li>Staggered restart to avoid inrush current</li>
                <li>Safe mode operation until full verification</li>
                <li>Automatic transfer and generator management</li>
              </ul>
            </div>

            <InlineCheck {...quickCheckQuestions[1]} />
          </div>
        </section>

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Electrician's Role in Safety System Implementation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electricians play a crucial role in ensuring safety functions operate correctly through proper installation,
              wiring, and testing of alarm circuits, interlocks, and emergency control devices. Safety-critical circuits
              require special attention to detail and rigorous testing procedures.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Safety Circuit Installation Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Fire integration:</strong> Monitored circuits, fire-rated cable, proper termination</li>
                <li><strong>Emergency relays:</strong> Safety-rated devices for power interruption</li>
                <li><strong>Gas detection:</strong> Intrinsically safe circuits where required</li>
                <li><strong>Circuit segregation:</strong> Dedicated conduits for safety circuits</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Interlock Implementation</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Hardwired:</strong> Direct safety device to equipment</li>
                  <li><strong>Monitored:</strong> BMS watches but can't override</li>
                  <li><strong>Redundant:</strong> Multiple independent paths</li>
                  <li><strong>Fail-safe:</strong> Safe state on failure</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Labelling Standards</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Red:</strong> Fire circuits</li>
                  <li><strong>Yellow:</strong> Gas detection</li>
                  <li><strong>Orange:</strong> Emergency stops</li>
                  <li><strong>Clear ID:</strong> Both ends of all cables</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Critical Power Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>UPS-backed circuits for continuous operation</li>
                <li>Generator automatic transfer systems</li>
                <li>Local battery backup where UPS unavailable</li>
                <li>Clean power for sensitive monitoring equipment</li>
              </ul>
            </div>

            <InlineCheck {...quickCheckQuestions[2]} />
          </div>
        </section>

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Testing and Commissioning Safety Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Comprehensive testing and commissioning of safety systems is essential to ensure they operate correctly
              during actual emergencies. Testing must verify both individual component function and complete system
              response under simulated emergency conditions.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Systematic Testing Procedures:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Step 1:</strong> Test each alarm sensor and shutdown relay independently</li>
                <li><strong>Step 2:</strong> Verify wiring integrity and insulation resistance</li>
                <li><strong>Step 3:</strong> Test interlock logic and sequence timing</li>
                <li><strong>Step 4:</strong> End-to-end system testing with simulated emergencies</li>
                <li><strong>Step 5:</strong> Document all results and obtain certifications</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fire Integration Testing</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Smoke detector simulation</li>
                  <li>Manual call point verification</li>
                  <li>Damper operation check</li>
                  <li>Fan control confirmation</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Ongoing Maintenance</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Weekly: Alarm notifications</li>
                  <li>Monthly: Manual shutdowns</li>
                  <li>Annual: Complete system test</li>
                  <li>Continuous: Trend analysis</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Equipment Protection Testing:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Sensor simulation with calibrated test equipment</li>
                <li>Response time measurement for critical shutdowns</li>
                <li>Cascade testing of dependent equipment</li>
                <li>Reset procedure verification</li>
              </ul>
            </div>

            <InlineCheck {...quickCheckQuestions[3]} />
          </div>
        </section>

        {/* Case Study */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Case Study: Shopping Mall Fire System Integration Failure</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white">
                <strong>Incident:</strong> Large shopping mall fire system was integrated with BMS for coordinated emergency response.
                During commissioning, one AHU continued running when fire alarm triggered - the fire panel Zone 7 output was wired
                to BMS Input 8 instead of Input 7.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 text-sm text-white">
              <div>
                <p className="font-medium text-red-400/80 mb-2">Potential Consequences</p>
                <ul className="space-y-1">
                  <li>Operating AHU could spread smoke</li>
                  <li>Escape routes compromised</li>
                  <li>Non-compliance with fire regulations</li>
                  <li>Insurance claim disputes</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-elec-yellow/80 mb-2">Corrections Made</p>
                <ul className="space-y-1">
                  <li>Rewired Zone 7 to correct BMS input</li>
                  <li>Individual testing of all fire zones</li>
                  <li>Verified AHU shutdown for each zone</li>
                  <li>Updated circuit documentation</li>
                </ul>
              </div>
            </div>
            <div className="p-3 rounded bg-transparent border border-white/10 text-sm">
              <p className="text-white"><strong>Key Lesson:</strong> A single wiring error can compromise entire building
              safety systems. Systematic testing of each safety function and accurate documentation are essential.</p>
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
              <p className="font-medium text-white mb-1">Fire System Response</p>
              <ul className="space-y-0.5">
                <li>Supply fans: Stop immediately</li>
                <li>Fire dampers: Close</li>
                <li>Smoke extract: Start</li>
                <li>Door locks: Release</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Testing Schedule</p>
              <ul className="space-y-0.5">
                <li>Weekly: Alarm notifications</li>
                <li>Monthly: Manual shutdowns</li>
                <li>Annual: Complete integration test</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <section className="mb-10 mt-12">
          <SingleQuestionQuiz
            title="Test Your Knowledge"
            questions={bmsModule3Section6QuizData}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../bms-module-3-section-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../bms-module-4">
              Next Module
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BMSModule3Section6;
