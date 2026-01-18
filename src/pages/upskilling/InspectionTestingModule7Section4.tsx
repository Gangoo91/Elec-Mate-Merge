import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import UnitsPocketCard from "@/components/apprentice-courses/UnitsPocketCard";
import useSEO from "@/hooks/useSEO";

const TITLE = "Functional Testing - Module 7 Section 4";
const DESCRIPTION = "Master functional testing to verify that electrical equipment, controls, and safety systems operate correctly as intended.";

const quickCheckQuestions = [
  {
    id: "two-way-fault",
    question: "A two-way light switch only works from one position. What type of fault is this?",
    options: [
      "An insulation fault",
      "A functional fault - likely incorrect strapper wiring",
      "A polarity fault",
      "An earth continuity fault"
    ],
    correctIndex: 1,
    explanation: "This is a functional fault, likely caused by incorrect wiring of the strappers or a faulty switch. While electrical continuity tests might pass, the circuit doesn't function as intended."
  },
  {
    id: "emergency-stop",
    question: "An emergency stop button de-energises the machine but it can immediately be restarted. Is this acceptable?",
    options: [
      "Yes, if the machine stops quickly",
      "Yes, for low-risk machinery",
      "No - a deliberate reset action should be required",
      "Only if there's a guard interlock"
    ],
    correctIndex: 2,
    explanation: "No. Emergency stop circuits should be self-latching - a deliberate reset action should be required before the machine can restart. This prevents accidental restart while the hazard may still exist."
  },
  {
    id: "recording-functional",
    question: "Should functional testing be recorded on the Schedule of Inspections or Schedule of Test Results?",
    options: [
      "Schedule of Test Results with ohm values",
      "Schedule of Inspections as satisfactory/defect",
      "Neither - it's not required",
      "Only in the observations section"
    ],
    correctIndex: 1,
    explanation: "The Schedule of Inspections. Functional testing verifies operation (satisfactory or not) rather than measuring electrical values. The inspection schedule includes items for switchgear and controlgear operation."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the purpose of functional testing?",
    options: [
      "To measure electrical quantities",
      "To verify assemblies and equipment operate correctly as intended",
      "To test insulation resistance",
      "To verify earth continuity"
    ],
    correctAnswer: 1,
    explanation: "Functional testing verifies that assemblies, including switchgear, controls, interlocks, and equipment, operate correctly as intended by their design and the installation requirements."
  },
  {
    id: 2,
    question: "When in the testing sequence should functional testing be performed?",
    options: [
      "First, before any other tests",
      "After dead tests but before live tests",
      "After all other tests are satisfactory",
      "Only during periodic inspection"
    ],
    correctAnswer: 2,
    explanation: "Functional testing is performed after all other tests (continuity, insulation resistance, polarity, earth fault loop, RCD) confirm the installation is safe. This prevents operating faulty equipment."
  },
  {
    id: 3,
    question: "Which of the following requires functional testing?",
    options: [
      "Cable insulation",
      "Switchgear, controls, and interlocks",
      "Conductor cross-sectional area",
      "Maximum demand calculation"
    ],
    correctAnswer: 1,
    explanation: "Regulation 643.10 requires functional testing of switchgear and controlgear to verify they are properly mounted, adjusted, and work correctly."
  },
  {
    id: 4,
    question: "Testing that an RCD trips when its test button is pressed is an example of:",
    options: [
      "Dead testing",
      "Instrument testing",
      "Functional testing",
      "Continuity testing"
    ],
    correctAnswer: 2,
    explanation: "Operating the RCD test button is a functional test - it verifies the device operates as intended. This is separate from instrument testing which measures trip times."
  },
  {
    id: 5,
    question: "A door interlock prevents a panel being opened when energised. Functional testing should verify:",
    options: [
      "The door opens and closes",
      "The interlock prevents opening when live AND de-energises when defeated",
      "Only that the panel can be accessed",
      "The panel is correctly labelled"
    ],
    correctAnswer: 1,
    explanation: "Functional testing of interlocks must verify both functions: the interlock prevents unsafe access when energised, and it correctly de-energises the equipment if the interlock is defeated."
  },
  {
    id: 6,
    question: "Functional testing of a fire alarm system should verify:",
    options: [
      "Insulation resistance of wiring only",
      "Detection, sounder operation, and panel indication",
      "Only that the panel powers up",
      "Cable colours are correct"
    ],
    correctAnswer: 1,
    explanation: "Fire alarm functional testing verifies the complete system operates: detectors trigger alarms, sounders operate, the panel indicates correctly, and any outputs (fire doors, dampers) function."
  },
  {
    id: 7,
    question: "A dimmer switch doesn't allow full brightness. This is discovered during:",
    options: [
      "Insulation resistance testing",
      "Continuity testing",
      "Functional testing",
      "Polarity testing"
    ],
    correctAnswer: 2,
    explanation: "Functional testing reveals operational issues - whether controls work throughout their range. A dimmer not reaching full brightness is a functional fault, not an electrical measurement issue."
  },
  {
    id: 8,
    question: "Emergency lighting functional testing should include:",
    options: [
      "Only checking lamps illuminate",
      "Simulating mains failure and verifying maintained operation",
      "Measuring lamp wattage",
      "Checking cable sizes"
    ],
    correctAnswer: 1,
    explanation: "Emergency lighting functional testing must simulate mains failure to verify the system performs its safety function - maintaining illumination during a power outage for the required duration."
  },
  {
    id: 9,
    question: "Documentation of functional testing should record:",
    options: [
      "Measured resistance values",
      "Satisfactory operation or defects found",
      "Cable lengths",
      "Circuit impedance"
    ],
    correctAnswer: 1,
    explanation: "Functional test results are typically recorded as satisfactory operation or defects identified. Unlike electrical measurements, functional tests verify operation rather than measure values."
  },
  {
    id: 10,
    question: "A time switch is set but doesn't switch at the programmed time. This indicates:",
    options: [
      "An earth fault",
      "A functional fault requiring further investigation",
      "Incorrect polarity",
      "High earth fault loop impedance"
    ],
    correctAnswer: 1,
    explanation: "This is a functional fault - the time switch isn't performing its intended function. Investigation might reveal programming issues, a faulty switch, or incorrect wiring to the switching contacts."
  }
];

const faqs = [
  {
    question: "What's the difference between functional testing and other tests?",
    answer: "Dead tests (continuity, insulation) and live tests (earth fault loop, RCD trip times) measure electrical values against standards. Functional testing verifies equipment and systems operate correctly as intended - controls switch, interlocks function, timers operate, etc."
  },
  {
    question: "Is functional testing required by BS 7671?",
    answer: "Yes. Regulation 643.10 requires assemblies such as switchgear, controlgear, and interlocks to be subjected to functional testing to verify they are properly mounted, adjusted, and installed in accordance with requirements."
  },
  {
    question: "What if functional testing reveals a problem?",
    answer: "Functional faults must be investigated and rectified. The cause might be incorrect installation, programming errors, faulty equipment, or issues with associated circuits. Document defects and actions taken on the certification."
  },
  {
    question: "Should I test every light switch?",
    answer: "Yes, every switching device should be functionally tested to verify it controls its intended load. This is also an opportunity to verify polarity - if a switch doesn't control the lamp, further investigation is needed."
  },
  {
    question: "How do I functionally test a PIR sensor?",
    answer: "Walk through the detection zone and verify the light operates. Test sensitivity and time delay settings match requirements. Check for dead spots in coverage and verify the light extinguishes after the time delay expires."
  },
  {
    question: "Is testing RCD test buttons a functional test?",
    answer: "Yes. Operating the test button verifies the mechanical tripping function works. This is separate from instrument testing which measures actual trip times and currents. Both are required for complete RCD verification."
  }
];

const InspectionTestingModule7Section4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-7">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content - Full width, minimal padding */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 7 Section 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Functional Testing
          </h1>
          <p className="text-white/80">
            Verify that assemblies, controls, and equipment operate correctly as intended
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Purpose:</strong> Verify equipment operates as intended</li>
              <li><strong>When:</strong> AFTER all other tests confirm safety</li>
              <li><strong>What:</strong> Switches, controls, interlocks, safety systems</li>
              <li><strong>Record:</strong> Satisfactory or defects found</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Controls not working through full range</li>
              <li><strong>Use:</strong> Operate every switch, test every interlock</li>
              <li><strong>Apply:</strong> Simulate failures for safety systems</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes - Simple list */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand the purpose and scope of functional testing",
              "Test switching and control devices",
              "Verify interlocks and safety systems",
              "Test lighting controls and dimmers",
              "Verify heating and ventilation controls",
              "Document functional test results correctly"
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

        {/* Section 1: Purpose of Functional Testing */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Purpose of Functional Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Functional testing is the final stage of verification, performed after all electrical
              tests confirm the installation is safe. It verifies that equipment and systems work
              correctly - not just that they're electrically sound.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">What Functional Testing Reveals</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Switches control the correct loads</li>
                <li>Controls operate throughout their range</li>
                <li>Interlocks function correctly</li>
                <li>Safety systems perform as required</li>
                <li>Programmable devices are correctly set</li>
              </ul>
            </div>

            <p>
              Regulation 643.10 requires assemblies such as switchgear, controlgear, and interlocks
              to be subjected to functional testing to verify they are properly mounted, adjusted,
              and installed in accordance with requirements.
            </p>
          </div>
        </section>

        {/* Section 2: Switching and Control Devices */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Switching and Control Devices
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Every switching and control device should be functionally tested to verify correct operation:
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Light Switches</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Each switch controls its intended light(s)</li>
                  <li>Two-way and intermediate switching operates correctly</li>
                  <li>Dimmer controls through full range</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Automatic Controls</p>
                <ul className="text-sm text-white space-y-1">
                  <li>PIR sensors detect and time out correctly</li>
                  <li>Photocells respond to light levels</li>
                  <li>Time switches operate at set times</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Isolators</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Isolate their intended circuits</li>
                <li>Indicator lights function correctly</li>
                <li>Mechanical interlocks engage</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 3: Interlocks and Safety Systems */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Interlocks and Safety Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Interlocks are critical safety devices that must be comprehensively tested:
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Interlock Testing Requirements</p>
              <div className="grid grid-cols-1 gap-3 text-sm">
                <div className="p-3 rounded bg-transparent">
                  <p className="font-medium text-white mb-1">Prevention Test</p>
                  <p className="text-white/90 text-xs">Verify interlock prevents unsafe action when equipment is energised</p>
                </div>
                <div className="p-3 rounded bg-transparent">
                  <p className="font-medium text-white mb-1">De-energisation Test</p>
                  <p className="text-white/90 text-xs">Verify equipment de-energises if interlock is defeated or door opened</p>
                </div>
                <div className="p-3 rounded bg-transparent">
                  <p className="font-medium text-white mb-1">Indication Test</p>
                  <p className="text-white/90 text-xs">Verify any associated indicators show correct status</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-amber-400/70">
              <strong>Safety note:</strong> Test interlocks carefully. Some are designed to isolate
              dangerous voltages or moving machinery. Follow manufacturer's guidance.
            </p>
          </div>
        </section>

        {/* Section 4: Emergency and Safety Systems */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Emergency and Safety Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Emergency systems require thorough functional testing to ensure they perform when needed:
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Emergency Lighting</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Simulate mains failure - lights should illuminate</li>
                  <li>Verify maintained fittings operate on both modes</li>
                  <li>Check duration capability (3 hour test required)</li>
                  <li>Verify charging indicators function</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fire Alarm Systems</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Test detectors trigger panel indication</li>
                  <li>Verify sounders operate throughout building</li>
                  <li>Test cause and effect programming</li>
                  <li>Check auxiliary outputs (door closers, dampers)</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Emergency Stop Systems</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Verify stops immediately de-energise equipment</li>
                <li>Test that reset procedure is required</li>
                <li>Check all emergency stops on circuit</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 5: HVAC and Building Services */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            HVAC and Building Services
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Heating, ventilation, and air conditioning systems have multiple functional aspects to verify:
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">HVAC Functional Testing</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Thermostats respond to temperature changes</li>
                <li>Time controls switch at programmed times</li>
                <li>Zone valves and dampers operate</li>
                <li>Frost protection activates correctly</li>
                <li>Interlocked systems sequence correctly</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 6: Documentation of Results */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Documentation of Results
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Unlike electrical measurements, functional tests record whether operation is satisfactory
              or identifies defects found:
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Recording Functional Tests</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Schedule of Inspections: tick functional testing items</li>
                <li>Record satisfactory or limitation/defect</li>
                <li>Note specific defects in observations</li>
                <li>Complex systems may need separate test sheets</li>
              </ul>
            </div>

            <p>
              For complex installations, detailed functional test records may be prepared as separate
              documentation attached to the electrical installation certificate.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Systematic Approach</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Work through every switching device methodically - don't skip any</li>
                <li>Test each control through its full operating range</li>
                <li>Record results as you go to avoid missing items</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Involve the Client</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Client knowledge of intended operation helps verify correct function</li>
                <li>They may know about controls that don't work as expected</li>
                <li>Explain any functional defects found in clear terms</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Skipping "obvious" switches</strong> - test every one</li>
                <li><strong>Not testing through full range</strong> - dimmers should reach max/min</li>
                <li><strong>Forgetting safety systems</strong> - always simulate failure conditions</li>
                <li><strong>Poor documentation</strong> - record defects clearly for follow-up</li>
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

        {/* Reference Cards */}
        <section className="mb-10">
          <UnitsPocketCard />

          <div className="mt-6 p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Test Sequence</p>
                <ul className="space-y-0.5">
                  <li>Functional = LAST (after all live tests)</li>
                  <li>BS 7671 Reg 643.10</li>
                  <li>Result format: satisfactory or defect</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Systems</p>
                <ul className="space-y-0.5">
                  <li>Interlocks = test BOTH functions</li>
                  <li>Emergency lighting = simulate mains fail</li>
                  <li>Fire alarm = full system test</li>
                </ul>
              </div>
            </div>
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
            <Link to="/study-centre/upskilling/inspection-testing/module-7/section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-7/section-5">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default InspectionTestingModule7Section4;
