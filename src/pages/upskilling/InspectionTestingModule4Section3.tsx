import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import UnitsPocketCard from "@/components/apprentice-courses/UnitsPocketCard";
import useSEO from "@/hooks/useSEO";

const TITLE = "IR Testing Procedure - Module 4 Section 3";
const DESCRIPTION = "Step-by-step insulation resistance testing procedure including preparation, safe isolation, and measurement techniques.";

const quickCheckQuestions = [
  {
    id: "disconnect-equipment",
    question: "Which equipment must be disconnected before IR testing?",
    options: [
      "Only high-power equipment",
      "Electronic equipment, LED drivers, SPDs",
      "Only equipment over 10 years old",
      "Nothing if circuit is isolated"
    ],
    correctIndex: 1,
    explanation: "Electronic components can be damaged by 500V DC test voltage. Disconnect all electronic equipment, LED drivers, SPDs, and similar devices."
  },
  {
    id: "test-duration",
    question: "How long should test voltage be applied?",
    options: [
      "5 seconds",
      "30 seconds",
      "Until stable (60+ seconds)",
      "Exactly 2 minutes"
    ],
    correctIndex: 2,
    explanation: "Apply voltage for at least 60 seconds or until the reading stabilises. Capacitive effects may cause initial variations."
  },
  {
    id: "three-tests",
    question: "The three basic IR tests on a single-phase circuit are:",
    options: [
      "L-E only",
      "L-E, N-E, L-N",
      "L-N only",
      "Earth continuity tests"
    ],
    correctIndex: 1,
    explanation: "Test Line to Earth, Neutral to Earth, and Line to Neutral to verify all insulation paths are satisfactory."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Before IR testing, the circuit must be:",
    options: ["Under load", "Energised at reduced voltage", "Completely isolated and proven dead", "Connected to an RCD"],
    correctAnswer: 2,
    explanation: "The circuit must be safely isolated and proven dead before applying test voltage. Live circuits would damage the instrument and be dangerous."
  },
  {
    id: 2,
    question: "Which equipment should be disconnected before IR testing?",
    options: ["Only motors", "Only heating elements", "Electronic equipment, dimmers, LED drivers", "Nothing needs disconnecting"],
    correctAnswer: 2,
    explanation: "Electronic equipment, dimmers, LED drivers, and similar components can be damaged by 500V DC and may give false low readings."
  },
  {
    id: 3,
    question: "The three basic IR tests on a single-phase circuit are:",
    options: [
      "L-E, N-E, L-N",
      "L-E only",
      "L-N only",
      "E-E only"
    ],
    correctAnswer: 0,
    explanation: "Test Line to Earth, Neutral to Earth, and Line to Neutral to verify all insulation paths are satisfactory."
  },
  {
    id: 4,
    question: "How long should test voltage be applied?",
    options: ["1-2 seconds", "10 seconds", "Until stable (minimum 60 seconds)", "5 minutes exactly"],
    correctAnswer: 2,
    explanation: "Apply voltage for at least 60 seconds or until stable. Capacitive effects may cause initial variations, especially on long runs."
  },
  {
    id: 5,
    question: "Why might initial IR readings be lower than final readings?",
    options: [
      "Instrument warming up",
      "Capacitive charging of cables",
      "Insulation improving",
      "Incorrect lead connection"
    ],
    correctAnswer: 1,
    explanation: "Cable capacitance causes initial current flow that settles as the cable charges. True insulation resistance reading appears when stable."
  },
  {
    id: 6,
    question: "On a three-phase circuit, how many IR tests are typically required?",
    options: ["3 tests", "4 tests", "6 tests", "7 tests"],
    correctAnswer: 3,
    explanation: "Seven tests: L1-E, L2-E, L3-E, N-E, L1-L2, L2-L3, L3-L1. Alternatively, link all live conductors for fewer tests."
  },
  {
    id: 7,
    question: "Lamps should be:",
    options: [
      "Left in place - they don't affect readings",
      "Removed or isolated, especially LED/CFL types",
      "Turned on during testing",
      "Replaced with 100W bulbs"
    ],
    correctAnswer: 1,
    explanation: "LED/CFL lamps contain electronic drivers that can be damaged by IR test voltage. Remove all lamps for accurate results."
  },
  {
    id: 8,
    question: "After IR testing, before re-energising:",
    options: [
      "Just switch on immediately",
      "Discharge any stored charge and reconnect equipment",
      "Leave for 24 hours",
      "Repeat all tests"
    ],
    correctAnswer: 1,
    explanation: "Discharge stored capacitance safely, reconnect any disconnected equipment, then re-energise following safe procedures."
  },
  {
    id: 9,
    question: "A fluctuating IR reading may indicate:",
    options: [
      "Good insulation",
      "Moisture or an intermittent fault",
      "The test is complete",
      "Instrument battery low"
    ],
    correctAnswer: 1,
    explanation: "Fluctuating readings suggest moisture (readings rise as it dries), intermittent faults, or capacitive effects. Investigate the cause."
  },
  {
    id: 10,
    question: "SPDs (Surge Protection Devices) should be:",
    options: [
      "Left connected",
      "Disconnected to avoid damage",
      "Tested at 1000V",
      "Replaced after each test"
    ],
    correctAnswer: 1,
    explanation: "SPDs contain MOVs designed to conduct at overvoltage. The IR test voltage may trigger them, giving false readings and potentially damaging the SPD."
  }
];

const faqs = [
  {
    question: "Why must the circuit be dead for IR testing?",
    answer: "IR testers apply their own DC voltage. If the circuit is live, mains voltage would damage the instrument and create a serious safety hazard. Additionally, mains voltage would mask the test results."
  },
  {
    question: "What equipment needs disconnecting?",
    answer: "Disconnect: electronic equipment, dimmers, LED drivers, control gear, smoke detectors, PIRs, timers, and any equipment with surge protection. These contain components that can be damaged by 500V DC and may also give false low readings."
  },
  {
    question: "How long should the test voltage be applied?",
    answer: "Apply for at least 60 seconds or until the reading stabilises. Initial readings may be affected by capacitive charging, especially on long cable runs. A stable reading gives the true insulation resistance."
  },
  {
    question: "Which tests must be performed?",
    answer: "Three tests minimum: (1) Line to Earth, (2) Neutral to Earth, (3) Line to Neutral. On three-phase: also L1-L2, L2-L3, L3-L1, and each phase to earth. Link all phases together for single reading if preferred."
  },
  {
    question: "What if readings fluctuate?",
    answer: "Fluctuating readings suggest: moisture on insulation (readings slowly rise as it dries), intermittent fault (readings jump), or capacitive effects on long cables (readings slowly climb). Wait for stability or investigate."
  },
  {
    question: "Can I test with lamps left in?",
    answer: "Yes, but incandescent lamps provide a path to neutral, reducing readings. LED/CFL lamps must be removed or switched off as their drivers will be damaged and give false readings. Best practice: remove all lamps."
  }
];

const InspectionTestingModule4Section3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 4 Section 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            IR Testing Procedure
          </h1>
          <p className="text-white/80">
            Step-by-step insulation resistance testing procedure for safe, accurate results
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Safety:</strong> Isolate circuit, prove dead</li>
              <li><strong>Prepare:</strong> Disconnect sensitive equipment</li>
              <li><strong>Test:</strong> L-E, N-E, L-N connections</li>
              <li><strong>Duration:</strong> Wait for stable reading (60s+)</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Points</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Minimum:</strong> 1.0 MΩ for each test</li>
              <li><strong>Disconnect:</strong> LEDs, SPDs, electronics</li>
              <li><strong>After:</strong> Discharge and reconnect</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Prepare circuits safely for testing",
              "Identify equipment to disconnect",
              "Know where to connect probes",
              "Perform tests correctly",
              "Record results properly",
              "Re-energise safely"
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

        {/* Section 1: Preparation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Preparation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Before testing, ensure proper preparation:
            </p>

            <div className="my-6">
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>1.</strong> Perform safe isolation procedure</li>
                <li><strong>2.</strong> Prove circuit dead with approved voltage indicator</li>
                <li><strong>3.</strong> Apply lock-off devices and warning labels</li>
                <li><strong>4.</strong> Identify and disconnect sensitive equipment</li>
                <li><strong>5.</strong> Remove lamps, especially LED/CFL types</li>
                <li><strong>6.</strong> Disconnect SPDs and electronic controls</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: Equipment to Disconnect */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Equipment to Disconnect
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p className="text-sm text-elec-yellow/70">
              <strong>Warning:</strong> 500V DC can damage electronic components. Always disconnect sensitive equipment.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 my-6">
              {[
                "LED drivers",
                "Dimmer switches",
                "PIR sensors",
                "Smoke detectors",
                "Timers/programmers",
                "SPDs",
                "Electronic starters",
                "Control gear",
                "Thermostats",
                "Door bells",
                "Alarm panels",
                "Smart home devices"
              ].map((item, i) => (
                <div key={i} className="text-sm text-white/80">{item}</div>
              ))}
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 3: Test Connections */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Test Connections
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Three tests are required on each single-phase circuit:
            </p>

            <div className="space-y-4 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-1">Test 1: Line to Earth (L-E)</p>
                <p className="text-sm text-white/80">Connect between line conductor and earth. Verifies phase insulation to earth.</p>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-1">Test 2: Neutral to Earth (N-E)</p>
                <p className="text-sm text-white/80">Connect between neutral and earth. Verifies neutral insulation to earth.</p>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-1">Test 3: Line to Neutral (L-N)</p>
                <p className="text-sm text-white/80">Connect between line and neutral. Verifies insulation between live conductors.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Taking Measurements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Taking Measurements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="my-6">
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>1.</strong> Select correct test voltage (usually 500V DC)</li>
                <li><strong>2.</strong> Connect probes securely to conductors</li>
                <li><strong>3.</strong> Press and hold the test button</li>
                <li><strong>4.</strong> Wait for reading to stabilise (60+ seconds)</li>
                <li><strong>5.</strong> Record the stable reading</li>
                <li><strong>6.</strong> Release test button and discharge circuit</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Tip:</strong> Long cable runs may show rising readings as capacitance charges. Wait for a stable value before recording.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 5: Recording Results */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Recording Results
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              For each circuit, record:
            </p>

            <div className="my-6">
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Circuit identification/number</li>
                <li>Test voltage used</li>
                <li>L-E reading in MΩ</li>
                <li>N-E reading in MΩ</li>
                <li>L-N reading in MΩ</li>
                <li>Equipment disconnected (if any)</li>
                <li>Any observations or concerns</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/10 text-center">
              <p className="text-elec-yellow font-semibold mb-1">Minimum Acceptable: &ge;1.0 MΩ</p>
              <p className="text-white/60 text-sm">Each individual test must meet this minimum</p>
            </div>
          </div>
        </section>

        {/* Section 6: Re-energisation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Re-energisation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              After testing is complete:
            </p>

            <div className="my-6">
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>1.</strong> Discharge any stored capacitive charge safely</li>
                <li><strong>2.</strong> Reconnect all disconnected equipment</li>
                <li><strong>3.</strong> Replace lamps</li>
                <li><strong>4.</strong> Remove lock-off devices and labels</li>
                <li><strong>5.</strong> Re-energise circuit</li>
                <li><strong>6.</strong> Verify equipment operates correctly</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Warning:</strong> Long cable runs can hold significant charge. Always discharge safely to earth before touching conductors.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Test Whole Installation</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>For initial verification, you can link all phase conductors together and test to earth in one measurement</li>
                <li>If this passes, individual circuits are likely to pass</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Isolate Faulty Circuits</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>If a whole-installation test fails, test individual circuits to locate the problem</li>
                <li>Use half-split method for long circuits</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Check Instrument Accuracy</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Before testing, verify your instrument shows OL (over limit) with leads open</li>
                <li>Check calibration date is current</li>
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
                <p className="font-medium text-white mb-1">Test Procedure</p>
                <ul className="space-y-0.5">
                  <li>Step 1: Safe isolation & prove dead</li>
                  <li>Step 2: Disconnect electronics/SPDs</li>
                  <li>Step 3: Test L-E, N-E, L-N</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">After Testing</p>
                <ul className="space-y-0.5">
                  <li>Step 4: Wait for stable reading</li>
                  <li>Step 5: Record results (&ge;1.0 MΩ)</li>
                  <li>Step 6: Discharge & re-energise</li>
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
            <Link to="/study-centre/upskilling/inspection-testing/module-4/section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-4/section-4">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default InspectionTestingModule4Section3;
