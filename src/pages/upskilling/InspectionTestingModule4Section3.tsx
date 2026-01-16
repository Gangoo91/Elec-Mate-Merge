import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, AlertTriangle, Wrench, Lightbulb, HelpCircle, ChevronDown, ChevronUp, BookOpen, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import useSEO from '@/hooks/useSEO';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import UnitsPocketCard from '@/components/apprentice-courses/UnitsPocketCard';

const InspectionTestingModule4Section3 = () => {
  useSEO({
    title: "IR Testing Procedure | Inspection & Testing",
    description: "Step-by-step insulation resistance testing procedure including preparation, safe isolation, and measurement techniques."
  });

  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const keyPoints = [
    "Safe isolation is essential before IR testing - the circuit must be completely dead",
    "Disconnect or isolate equipment that could be damaged by test voltage",
    "Test between all live conductors and earth, and between live conductors themselves"
  ];

  const learningOutcomes = [
    { title: "Safe Isolation", desc: "Prepare circuits for testing" },
    { title: "Equipment Protection", desc: "Identify what to disconnect" },
    { title: "Test Connections", desc: "Know where to connect probes" },
    { title: "Take Measurements", desc: "Perform tests correctly" },
    { title: "Record Results", desc: "Document findings properly" },
    { title: "Re-energise Safely", desc: "Restore circuit to service" }
  ];

  const faqs = [
    {
      q: "Why must the circuit be dead for IR testing?",
      a: "IR testers apply their own DC voltage. If the circuit is live, mains voltage would damage the instrument and create a serious safety hazard. Additionally, mains voltage would mask the test results."
    },
    {
      q: "What equipment needs disconnecting?",
      a: "Disconnect: electronic equipment, dimmers, LED drivers, control gear, smoke detectors, PIRs, timers, and any equipment with surge protection. These contain components that can be damaged by 500V DC and may also give false low readings."
    },
    {
      q: "How long should the test voltage be applied?",
      a: "Apply for at least 60 seconds or until the reading stabilises. Initial readings may be affected by capacitive charging, especially on long cable runs. A stable reading gives the true insulation resistance."
    },
    {
      q: "Which tests must be performed?",
      a: "Three tests minimum: (1) Line to Earth, (2) Neutral to Earth, (3) Line to Neutral. On three-phase: also L1-L2, L2-L3, L3-L1, and each phase to earth. Link all phases together for single reading if preferred."
    },
    {
      q: "What if readings fluctuate?",
      a: "Fluctuating readings suggest: moisture on insulation (readings slowly rise as it dries), intermittent fault (readings jump), or capacitive effects on long cables (readings slowly climb). Wait for stability or investigate."
    },
    {
      q: "Can I test with lamps left in?",
      a: "Yes, but incandescent lamps provide a path to neutral, reducing readings. LED/CFL lamps must be removed or switched off as their drivers will be damaged and give false readings. Best practice: remove all lamps."
    }
  ];

  const quizQuestions = [
    {
      question: "Before IR testing, the circuit must be:",
      options: ["Under load", "Energised at reduced voltage", "Completely isolated and proven dead", "Connected to an RCD"],
      correctIndex: 2,
      explanation: "The circuit must be safely isolated and proven dead before applying test voltage. Live circuits would damage the instrument and be dangerous."
    },
    {
      question: "Which equipment should be disconnected before IR testing?",
      options: ["Only motors", "Only heating elements", "Electronic equipment, dimmers, LED drivers", "Nothing needs disconnecting"],
      correctIndex: 2,
      explanation: "Electronic equipment, dimmers, LED drivers, and similar components can be damaged by 500V DC and may give false low readings."
    },
    {
      question: "The three basic IR tests on a single-phase circuit are:",
      options: [
        "L-E, N-E, L-N",
        "L-E only",
        "L-N only",
        "E-E only"
      ],
      correctIndex: 0,
      explanation: "Test Line to Earth, Neutral to Earth, and Line to Neutral to verify all insulation paths are satisfactory."
    },
    {
      question: "How long should test voltage be applied?",
      options: ["1-2 seconds", "10 seconds", "Until stable (minimum 60 seconds)", "5 minutes exactly"],
      correctIndex: 2,
      explanation: "Apply voltage for at least 60 seconds or until stable. Capacitive effects may cause initial variations, especially on long runs."
    },
    {
      question: "Why might initial IR readings be lower than final readings?",
      options: [
        "Instrument warming up",
        "Capacitive charging of cables",
        "Insulation improving",
        "Incorrect lead connection"
      ],
      correctIndex: 1,
      explanation: "Cable capacitance causes initial current flow that settles as the cable charges. True insulation resistance reading appears when stable."
    },
    {
      question: "On a three-phase circuit, how many IR tests are typically required?",
      options: ["3 tests", "4 tests", "6 tests", "7 tests"],
      correctIndex: 3,
      explanation: "Seven tests: L1-E, L2-E, L3-E, N-E, L1-L2, L2-L3, L3-L1. Alternatively, link all live conductors for fewer tests."
    },
    {
      question: "Lamps should be:",
      options: [
        "Left in place - they don't affect readings",
        "Removed or isolated, especially LED/CFL types",
        "Turned on during testing",
        "Replaced with 100W bulbs"
      ],
      correctIndex: 1,
      explanation: "LED/CFL lamps contain electronic drivers that can be damaged by IR test voltage. Remove all lamps for accurate results."
    },
    {
      question: "After IR testing, before re-energising:",
      options: [
        "Just switch on immediately",
        "Discharge any stored charge and reconnect equipment",
        "Leave for 24 hours",
        "Repeat all tests"
      ],
      correctIndex: 1,
      explanation: "Discharge stored capacitance safely, reconnect any disconnected equipment, then re-energise following safe procedures."
    },
    {
      question: "A fluctuating IR reading may indicate:",
      options: [
        "Good insulation",
        "Moisture or an intermittent fault",
        "The test is complete",
        "Instrument battery low"
      ],
      correctIndex: 1,
      explanation: "Fluctuating readings suggest moisture (readings rise as it dries), intermittent faults, or capacitive effects. Investigate the cause."
    },
    {
      question: "SPDs (Surge Protection Devices) should be:",
      options: [
        "Left connected",
        "Disconnected to avoid damage",
        "Tested at 1000V",
        "Replaced after each test"
      ],
      correctIndex: 1,
      explanation: "SPDs contain MOVs designed to conduct at overvoltage. The IR test voltage may trigger them, giving false readings and potentially damaging the SPD."
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* iOS Header */}
      <header className="sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between px-4 h-14">
          <button
            onClick={() => navigate('/study-centre/upskilling/inspection-testing/module4')}
            className="flex items-center gap-2 text-elec-yellow active:opacity-70 transition-opacity touch-manipulation"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-base">Module 4</span>
          </button>
          <span className="text-sm text-white/50 font-medium">Section 3 of 6</span>
        </div>
      </header>

      <main className="px-4 py-6 pb-safe space-y-8 max-w-3xl mx-auto">
        {/* Hero */}
        <section className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-500/20 rounded-full">
            <span className="text-purple-400 text-sm font-medium">Module 4 • Insulation Resistance</span>
          </div>
          <h1 className="text-ios-title-large font-bold text-white">
            IR Testing Procedure
          </h1>
          <p className="text-ios-body text-white/70">
            Step-by-step insulation resistance testing procedure for safe, accurate results.
          </p>
        </section>

        {/* In 30 Seconds */}
        <Card variant="ios-elevated" className="p-5">
          <h2 className="text-ios-headline font-semibold text-white mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-elec-yellow" />
            In 30 Seconds
          </h2>
          <ul className="space-y-3">
            {keyPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-base">{point}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Link to detailed guide */}
        <Card variant="ios" className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-semibold">Detailed IR Testing Guide</p>
              <p className="text-white/60 text-sm">Complete step-by-step procedures with diagrams</p>
            </div>
            <Button
              variant="ios-primary"
              size="sm"
              onClick={() => navigate('/study-centre/upskilling/insulation-resistance-guide')}
              className="touch-manipulation"
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              View
            </Button>
          </div>
        </Card>

        {/* Learning Outcomes */}
        <section className="space-y-4">
          <h2 className="text-ios-title-2 font-bold text-white">Learning Outcomes</h2>
          <div className="grid grid-cols-2 gap-3">
            {learningOutcomes.map((outcome, i) => (
              <Card key={i} variant="ios" className="p-4">
                <p className="text-elec-yellow font-semibold text-sm mb-1">{outcome.title}</p>
                <p className="text-white/60 text-sm">{outcome.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Content Section 01 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">01</span>
            <h2 className="text-ios-title-2 font-bold text-white">Preparation</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <p className="text-white/80">
              Before testing, ensure proper preparation:
            </p>
            <div className="space-y-3">
              {[
                { step: 1, text: "Perform safe isolation procedure" },
                { step: 2, text: "Prove circuit dead with approved voltage indicator" },
                { step: 3, text: "Apply lock-off devices and warning labels" },
                { step: 4, text: "Identify and disconnect sensitive equipment" },
                { step: 5, text: "Remove lamps, especially LED/CFL types" },
                { step: 6, text: "Disconnect SPDs and electronic controls" }
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-sm font-bold flex items-center justify-center flex-shrink-0">
                    {item.step}
                  </span>
                  <span className="text-white/80">{item.text}</span>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Content Section 02 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">02</span>
            <h2 className="text-ios-title-2 font-bold text-white">Equipment to Disconnect</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <p className="text-amber-300 text-sm">
                <AlertTriangle className="w-4 h-4 inline mr-2" />
                500V DC can damage electronic components. Always disconnect sensitive equipment.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2">
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
                <div key={i} className="flex items-center gap-2 bg-white/5 rounded-lg p-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  <span className="text-white/80 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <InlineCheck
          question="Which equipment must be disconnected before IR testing?"
          options={[
            "Only high-power equipment",
            "Electronic equipment, LED drivers, SPDs",
            "Only equipment over 10 years old",
            "Nothing if circuit is isolated"
          ]}
          correctIndex={1}
          explanation="Electronic components can be damaged by 500V DC test voltage. Disconnect all electronic equipment, LED drivers, SPDs, and similar devices."
        />

        {/* Content Section 03 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">03</span>
            <h2 className="text-ios-title-2 font-bold text-white">Test Connections</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <p className="text-white/80">
              Three tests are required on each single-phase circuit:
            </p>
            <div className="space-y-3">
              <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
                <p className="text-elec-yellow font-semibold">Test 1: Line to Earth (L-E)</p>
                <p className="text-white/70 text-sm">Connect between line conductor and earth. Verifies phase insulation to earth.</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="text-blue-400 font-semibold">Test 2: Neutral to Earth (N-E)</p>
                <p className="text-white/70 text-sm">Connect between neutral and earth. Verifies neutral insulation to earth.</p>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <p className="text-purple-400 font-semibold">Test 3: Line to Neutral (L-N)</p>
                <p className="text-white/70 text-sm">Connect between line and neutral. Verifies insulation between live conductors.</p>
              </div>
            </div>
          </Card>
        </section>

        {/* Content Section 04 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">04</span>
            <h2 className="text-ios-title-2 font-bold text-white">Taking Measurements</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <div className="space-y-3">
              {[
                { step: 1, text: "Select correct test voltage (usually 500V DC)" },
                { step: 2, text: "Connect probes securely to conductors" },
                { step: 3, text: "Press and hold the test button" },
                { step: 4, text: "Wait for reading to stabilise (60+ seconds)" },
                { step: 5, text: "Record the stable reading" },
                { step: 6, text: "Release test button and discharge circuit" }
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow text-sm font-bold flex items-center justify-center flex-shrink-0">
                    {item.step}
                  </span>
                  <span className="text-white/80">{item.text}</span>
                </div>
              ))}
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-sm text-white/70">
                <strong className="text-elec-yellow">Tip:</strong> Long cable runs may show rising readings as capacitance charges. Wait for a stable value before recording.
              </p>
            </div>
          </Card>
        </section>

        <InlineCheck
          question="How long should test voltage be applied?"
          options={[
            "5 seconds",
            "30 seconds",
            "Until stable (60+ seconds)",
            "Exactly 2 minutes"
          ]}
          correctIndex={2}
          explanation="Apply voltage for at least 60 seconds or until the reading stabilises. Capacitive effects may cause initial variations."
        />

        {/* Content Section 05 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">05</span>
            <h2 className="text-ios-title-2 font-bold text-white">Recording Results</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <p className="text-white/80">
              For each circuit, record:
            </p>
            <ul className="space-y-2">
              {[
                "Circuit identification/number",
                "Test voltage used",
                "L-E reading in MΩ",
                "N-E reading in MΩ",
                "L-N reading in MΩ",
                "Equipment disconnected (if any)",
                "Any observations or concerns"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-white/80">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4 text-center">
              <p className="text-elec-yellow font-semibold mb-1">Minimum Acceptable: ≥1.0 MΩ</p>
              <p className="text-white/60 text-sm">Each individual test must meet this minimum</p>
            </div>
          </Card>
        </section>

        {/* Content Section 06 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">06</span>
            <h2 className="text-ios-title-2 font-bold text-white">Re-energisation</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <p className="text-white/80">
              After testing is complete:
            </p>
            <div className="space-y-3">
              {[
                { step: 1, text: "Discharge any stored capacitive charge safely" },
                { step: 2, text: "Reconnect all disconnected equipment" },
                { step: 3, text: "Replace lamps" },
                { step: 4, text: "Remove lock-off devices and labels" },
                { step: 5, text: "Re-energise circuit" },
                { step: 6, text: "Verify equipment operates correctly" }
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-bold flex items-center justify-center flex-shrink-0">
                    {item.step}
                  </span>
                  <span className="text-white/80">{item.text}</span>
                </div>
              ))}
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <p className="text-amber-300 text-sm">
                <AlertTriangle className="w-4 h-4 inline mr-2" />
                Long cable runs can hold significant charge. Always discharge safely to earth before touching conductors.
              </p>
            </div>
          </Card>
        </section>

        <InlineCheck
          question="The three basic IR tests on a single-phase circuit are:"
          options={[
            "L-E only",
            "L-E, N-E, L-N",
            "L-N only",
            "Earth continuity tests"
          ]}
          correctIndex={1}
          explanation="Test Line to Earth, Neutral to Earth, and Line to Neutral to verify all insulation paths are satisfactory."
        />

        {/* Practical Tips */}
        <section className="space-y-4">
          <h2 className="text-ios-title-2 font-bold text-white flex items-center gap-2">
            <Wrench className="w-6 h-6 text-elec-yellow" />
            Practical Tips
          </h2>
          <Card variant="ios" className="p-5 space-y-4">
            <div className="space-y-4">
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                <p className="text-emerald-400 font-semibold mb-1">Test Whole Installation</p>
                <p className="text-white/70 text-sm">For initial verification, you can link all phase conductors together and test to earth in one measurement.</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="text-blue-400 font-semibold mb-1">Isolate Faulty Circuits</p>
                <p className="text-white/70 text-sm">If a whole-installation test fails, test individual circuits to locate the problem.</p>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <p className="text-amber-400 font-semibold mb-1">Check Instrument Accuracy</p>
                <p className="text-white/70 text-sm">Before testing, verify your instrument shows OL (over limit) with leads open.</p>
              </div>
            </div>
          </Card>
        </section>

        {/* FAQs */}
        <section className="space-y-4">
          <h2 className="text-ios-title-2 font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-elec-yellow" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <Card
                key={i}
                variant="ios"
                className="overflow-hidden"
                onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
              >
                <button className="w-full p-4 flex items-center justify-between text-left touch-manipulation">
                  <span className="text-white font-medium pr-4">{faq.q}</span>
                  {expandedFaq === i ? (
                    <ChevronUp className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-white/40 flex-shrink-0" />
                  )}
                </button>
                {expandedFaq === i && (
                  <div className="px-4 pb-4">
                    <p className="text-white/70 text-sm">{faq.a}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* Reference Card */}
        <UnitsPocketCard
          title="IR Testing Procedure Reference"
          items={[
            { term: "Step 1", definition: "Safe isolation & prove dead" },
            { term: "Step 2", definition: "Disconnect electronics/SPDs" },
            { term: "Step 3", definition: "Test L-E, N-E, L-N" },
            { term: "Step 4", definition: "Wait for stable reading" },
            { term: "Step 5", definition: "Record results (≥1.0 MΩ)" },
            { term: "Step 6", definition: "Discharge & re-energise" }
          ]}
        />

        {/* Quiz */}
        <section className="space-y-4">
          <h2 className="text-ios-title-2 font-bold text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-elec-yellow" />
            Section Quiz
          </h2>
          <Quiz
            questions={quizQuestions}
            onComplete={() => {}}
          />
        </section>

        {/* Navigation */}
        <nav className="flex gap-3 pt-6 pb-safe">
          <Button
            variant="ios-secondary"
            className="flex-1 h-12 touch-manipulation"
            onClick={() => navigate('/study-centre/upskilling/inspection-testing/module4/section2')}
          >
            Previous
          </Button>
          <Button
            variant="ios-primary"
            className="flex-1 h-12 touch-manipulation"
            onClick={() => navigate('/study-centre/upskilling/inspection-testing/module4/section4')}
          >
            Next Section
          </Button>
        </nav>
      </main>
    </div>
  );
};

export default InspectionTestingModule4Section3;
