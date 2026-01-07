import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Clock, Target, CheckCircle2, AlertTriangle, ChevronDown, Zap, Play, Settings, Gauge, Lightbulb, ThermometerSun, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import useSEO from '@/hooks/useSEO';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import UnitsPocketCard from '@/components/apprentice-courses/UnitsPocketCard';

const InspectionTestingModule7Section4 = () => {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  useSEO({
    title: "Functional Testing | Module 7 Section 4 | Inspection & Testing",
    description: "Master functional testing to verify that electrical equipment, controls, and safety systems operate correctly as intended."
  });

  const learningOutcomes = [
    { icon: Play, text: "Understand the purpose and scope of functional testing" },
    { icon: Settings, text: "Test switching and control devices" },
    { icon: Gauge, text: "Verify interlocks and safety systems" },
    { icon: Lightbulb, text: "Test lighting controls and dimmers" },
    { icon: ThermometerSun, text: "Verify heating and ventilation controls" },
    { icon: CheckCircle2, text: "Document functional test results correctly" }
  ];

  const quizQuestions = [
    {
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
      question: "Documentation of functional testing should record:",
      options: [
        "Measured resistance values",
        "Satisfactory operation or defects found",
        "Cable lengths",
        "Circuit impedance"
      ],
      correctAnswer: 1,
      explanation: "Functional test results are typically recorded as satisfactory operation (✓) or defects identified. Unlike electrical measurements, functional tests verify operation rather than measure values."
    },
    {
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

  const faqData = [
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

  const pocketCardUnits = [
    { name: "Test Sequence", symbol: "Last", unit: "after live tests" },
    { name: "BS 7671 Reg", symbol: "643.10", unit: "" },
    { name: "Result Format", symbol: "✓ or defect", unit: "" },
    { name: "Interlocks", symbol: "Both", unit: "functions" },
    { name: "Emergency Lt", symbol: "Simulate", unit: "mains fail" },
    { name: "Fire Alarm", symbol: "Full", unit: "system test" }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* iOS-style Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between px-4 h-14">
          <button
            onClick={() => navigate('/study-centre/apprentice/study/inspection-testing/module7')}
            className="flex items-center gap-2 text-rose-400 active:opacity-70 transition-opacity touch-manipulation"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-base">Module 7</span>
          </button>
          <span className="text-white/60 text-sm">4 of 5</span>
        </div>
      </header>

      <main className="px-4 py-6 pb-safe max-w-2xl mx-auto">
        {/* Hero Section */}
        <section className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-rose-500/20 rounded-full mb-4">
            <span className="text-rose-400 text-sm font-medium">Module 7 • Polarity & Functional Testing</span>
          </div>
          <h1 className="text-ios-title-large text-white font-bold mb-3">
            Functional Testing
          </h1>
          <p className="text-white/70 text-ios-body leading-relaxed">
            Verify that electrical assemblies, controls, interlocks, and equipment operate correctly as intended.
          </p>
        </section>

        {/* Interactive Guide Link */}
        <Link to="/study-centre/apprentice/study/guides/functional-testing">
          <Card variant="ios-elevated" className="mb-6 border-rose-500/30 active:scale-[0.98] transition-transform touch-manipulation">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center">
                    <Play className="w-5 h-5 text-rose-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Functional Testing Guide</h3>
                    <p className="text-white/60 text-sm">Interactive testing procedures</p>
                  </div>
                </div>
                <ExternalLink className="w-5 h-5 text-rose-400" />
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* In 30 Seconds Card */}
        <Card variant="ios-elevated" className="mb-8">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-rose-400" />
              <h2 className="text-white font-semibold text-lg">In 30 Seconds</h2>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0" />
                <span className="text-white/80 text-base">Functional testing verifies equipment operates as intended</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0" />
                <span className="text-white/80 text-base">Performed AFTER all other tests confirm safety</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0" />
                <span className="text-white/80 text-base">Includes switches, controls, interlocks, and safety systems</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Learning Outcomes */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-rose-400" />
            Learning Outcomes
          </h2>
          <div className="grid gap-3">
            {learningOutcomes.map((outcome, index) => (
              <Card key={index} variant="ios" className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center shrink-0">
                    <outcome.icon className="w-5 h-5 text-rose-400" />
                  </div>
                  <span className="text-white/90 text-base">{outcome.text}</span>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Content Section 01 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-rose-400/30">01</span>
            <h2 className="text-xl font-semibold text-white">Purpose of Functional Testing</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                Functional testing is the final stage of verification, performed after all electrical tests confirm the installation is safe. It verifies that equipment and systems work correctly - not just that they're electrically sound.
              </p>
              <div className="bg-white/5 rounded-xl p-4 border border-rose-500/20">
                <h4 className="text-rose-400 font-semibold mb-2">What Functional Testing Reveals</h4>
                <ul className="space-y-2 text-white/70">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-1 text-rose-400 shrink-0" />
                    <span>Switches control the correct loads</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-1 text-rose-400 shrink-0" />
                    <span>Controls operate throughout their range</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-1 text-rose-400 shrink-0" />
                    <span>Interlocks function correctly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-1 text-rose-400 shrink-0" />
                    <span>Safety systems perform as required</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-1 text-rose-400 shrink-0" />
                    <span>Programmable devices are correctly set</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </section>

        {/* Content Section 02 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-rose-400/30">02</span>
            <h2 className="text-xl font-semibold text-white">Switching and Control Devices</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                Every switching and control device should be functionally tested to verify correct operation:
              </p>
              <div className="space-y-3">
                <div className="bg-white/5 rounded-xl p-4 border border-rose-500/20">
                  <h4 className="text-rose-400 font-semibold mb-2">Light Switches</h4>
                  <ul className="space-y-1 text-white/70 text-sm">
                    <li>• Each switch controls its intended light(s)</li>
                    <li>• Two-way and intermediate switching operates correctly</li>
                    <li>• Dimmer controls through full range</li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-rose-500/20">
                  <h4 className="text-rose-400 font-semibold mb-2">Automatic Controls</h4>
                  <ul className="space-y-1 text-white/70 text-sm">
                    <li>• PIR sensors detect and time out correctly</li>
                    <li>• Photocells respond to light levels</li>
                    <li>• Time switches operate at set times</li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-rose-500/20">
                  <h4 className="text-rose-400 font-semibold mb-2">Isolators</h4>
                  <ul className="space-y-1 text-white/70 text-sm">
                    <li>• Isolate their intended circuits</li>
                    <li>• Indicator lights function correctly</li>
                    <li>• Mechanical interlocks engage</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* InlineCheck */}
        <div className="mb-8">
          <InlineCheck
            question="A two-way light switch only works from one position. What type of fault is this?"
            answer="This is a functional fault, likely caused by incorrect wiring of the strappers or a faulty switch. While electrical continuity tests might pass, the circuit doesn't function as intended."
            color="rose"
          />
        </div>

        {/* Content Section 03 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-rose-400/30">03</span>
            <h2 className="text-xl font-semibold text-white">Interlocks and Safety Systems</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                Interlocks are critical safety devices that must be comprehensively tested:
              </p>
              <div className="bg-white/5 rounded-xl p-4 border border-rose-500/20">
                <h4 className="text-rose-400 font-semibold mb-3">Interlock Testing Requirements</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-white/5 rounded-lg">
                    <span className="text-rose-400 font-semibold">Prevention Test:</span>
                    <p className="text-white/60 text-sm mt-1">Verify interlock prevents unsafe action when equipment is energised</p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <span className="text-rose-400 font-semibold">De-energisation Test:</span>
                    <p className="text-white/60 text-sm mt-1">Verify equipment de-energises if interlock is defeated or door opened</p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <span className="text-rose-400 font-semibold">Indication Test:</span>
                    <p className="text-white/60 text-sm mt-1">Verify any associated indicators show correct status</p>
                  </div>
                </div>
              </div>
              <div className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-white/70 text-sm">
                    <strong className="text-amber-400">Safety note:</strong> Test interlocks carefully. Some are designed to isolate dangerous voltages or moving machinery. Follow manufacturer's guidance.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Content Section 04 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-rose-400/30">04</span>
            <h2 className="text-xl font-semibold text-white">Emergency and Safety Systems</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                Emergency systems require thorough functional testing to ensure they perform when needed:
              </p>
              <div className="space-y-3">
                <div className="bg-white/5 rounded-xl p-4 border border-rose-500/20">
                  <h4 className="text-rose-400 font-semibold mb-2">Emergency Lighting</h4>
                  <ul className="space-y-1 text-white/70 text-sm">
                    <li>• Simulate mains failure - lights should illuminate</li>
                    <li>• Verify maintained fittings operate on both modes</li>
                    <li>• Check duration capability (3 hour test required)</li>
                    <li>• Verify charging indicators function</li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-rose-500/20">
                  <h4 className="text-rose-400 font-semibold mb-2">Fire Alarm Systems</h4>
                  <ul className="space-y-1 text-white/70 text-sm">
                    <li>• Test detectors trigger panel indication</li>
                    <li>• Verify sounders operate throughout building</li>
                    <li>• Test cause and effect programming</li>
                    <li>• Check auxiliary outputs (door closers, dampers)</li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-rose-500/20">
                  <h4 className="text-rose-400 font-semibold mb-2">Emergency Stop Systems</h4>
                  <ul className="space-y-1 text-white/70 text-sm">
                    <li>• Verify stops immediately de-energise equipment</li>
                    <li>• Test that reset procedure is required</li>
                    <li>• Check all emergency stops on circuit</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* InlineCheck */}
        <div className="mb-8">
          <InlineCheck
            question="An emergency stop button de-energises the machine but it can immediately be restarted. Is this acceptable?"
            answer="No. Emergency stop circuits should be self-latching - a deliberate reset action should be required before the machine can restart. This prevents accidental restart while the hazard may still exist."
            color="rose"
          />
        </div>

        {/* Content Section 05 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-rose-400/30">05</span>
            <h2 className="text-xl font-semibold text-white">HVAC and Building Services</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                Heating, ventilation, and air conditioning systems have multiple functional aspects to verify:
              </p>
              <div className="bg-white/5 rounded-xl p-4 border border-rose-500/20">
                <h4 className="text-rose-400 font-semibold mb-3">HVAC Functional Testing</h4>
                <ul className="space-y-2 text-white/70">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-rose-400 shrink-0" />
                    <span>Thermostats respond to temperature changes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-rose-400 shrink-0" />
                    <span>Time controls switch at programmed times</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-rose-400 shrink-0" />
                    <span>Zone valves and dampers operate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-rose-400 shrink-0" />
                    <span>Frost protection activates correctly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-rose-400 shrink-0" />
                    <span>Interlocked systems sequence correctly</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </section>

        {/* Content Section 06 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-rose-400/30">06</span>
            <h2 className="text-xl font-semibold text-white">Documentation of Results</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                Unlike electrical measurements, functional tests record whether operation is satisfactory or identifies defects found:
              </p>
              <div className="bg-white/5 rounded-xl p-4 border border-rose-500/20">
                <h4 className="text-rose-400 font-semibold mb-3">Recording Functional Tests</h4>
                <ul className="space-y-2 text-white/70">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-1 text-rose-400 shrink-0" />
                    <span>Schedule of Inspections: tick functional testing items</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-1 text-rose-400 shrink-0" />
                    <span>Record satisfactory (✓) or limitation/defect</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-1 text-rose-400 shrink-0" />
                    <span>Note specific defects in observations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-1 text-rose-400 shrink-0" />
                    <span>Complex systems may need separate test sheets</span>
                  </li>
                </ul>
              </div>
              <p>
                For complex installations, detailed functional test records may be prepared as separate documentation attached to the electrical installation certificate.
              </p>
            </div>
          </Card>
        </section>

        {/* InlineCheck */}
        <div className="mb-8">
          <InlineCheck
            question="Should functional testing be recorded on the Schedule of Inspections or Schedule of Test Results?"
            answer="The Schedule of Inspections. Functional testing verifies operation (satisfactory or not) rather than measuring electrical values. The inspection schedule includes items for switchgear and controlgear operation."
            color="rose"
          />
        </div>

        {/* Practical Tips */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-rose-400" />
            Practical Tips
          </h2>
          <div className="space-y-3">
            <Card variant="ios" className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Systematic Approach</h4>
                  <p className="text-white/60 text-sm">Work through every switching device methodically - don't skip any</p>
                </div>
              </div>
            </Card>
            <Card variant="ios" className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Involve the Client</h4>
                  <p className="text-white/60 text-sm">Client knowledge of intended operation helps verify correct function</p>
                </div>
              </div>
            </Card>
            <Card variant="ios" className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Safety Systems</h4>
                  <p className="text-white/60 text-sm">Take extra care with safety systems - coordinate with building management</p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqData.map((faq, index) => (
              <Card key={index} variant="ios" className="overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full p-4 text-left flex items-center justify-between gap-3 active:bg-white/5 transition-colors touch-manipulation"
                >
                  <span className="text-white font-medium">{faq.question}</span>
                  <ChevronDown className={cn(
                    "w-5 h-5 text-white/40 transition-transform shrink-0",
                    expandedFaq === index && "rotate-180"
                  )} />
                </button>
                {expandedFaq === index && (
                  <div className="px-4 pb-4">
                    <p className="text-white/70 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* Reference Card */}
        <section className="mb-8">
          <UnitsPocketCard
            title="Functional Testing Reference"
            units={pocketCardUnits}
            color="rose"
          />
        </section>

        {/* Quiz */}
        <section className="mb-8">
          <Quiz
            title="Section Quiz"
            questions={quizQuestions}
            color="rose"
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col gap-3 pt-4 pb-safe">
          <Button
            variant="ios-primary"
            size="lg"
            className="w-full touch-target bg-rose-500 hover:bg-rose-600"
            onClick={() => navigate('/study-centre/apprentice/study/inspection-testing/module7/section5')}
          >
            Continue to Section 5
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
          <Button
            variant="ios-secondary"
            size="lg"
            className="w-full touch-target"
            onClick={() => navigate('/study-centre/apprentice/study/inspection-testing/module7')}
          >
            Back to Module 7
          </Button>
        </nav>
      </main>
    </div>
  );
};

export default InspectionTestingModule7Section4;
