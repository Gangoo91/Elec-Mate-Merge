import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Clock, Target, CheckCircle2, AlertTriangle, ChevronDown, Zap, Hand, Cpu, TestTube2, Shield, Scale, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import useSEO from '@/hooks/useSEO';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import UnitsPocketCard from '@/components/apprentice-courses/UnitsPocketCard';

const InspectionTestingModule6Section4 = () => {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  useSEO({
    title: "RCD Test Button vs Instrument Testing | Module 6 Section 4 | Inspection & Testing",
    description: "Understand the critical differences between RCD test buttons and instrument testing, and why both are necessary for complete verification."
  });

  const learningOutcomes = [
    { icon: Hand, text: "Understand what the RCD test button actually tests" },
    { icon: Cpu, text: "Recognise limitations of test button verification" },
    { icon: TestTube2, text: "Explain why instrument testing is essential" },
    { icon: Shield, text: "Identify what only instrument testing can verify" },
    { icon: Scale, text: "Compare the two methods appropriately" },
    { icon: CheckCircle2, text: "Apply correct testing procedures" }
  ];

  const quizQuestions = [
    {
      question: "What does pressing the RCD test button actually test?",
      options: [
        "The complete earth fault path including external circuit",
        "The internal trip mechanism operates correctly",
        "The disconnection time meets BS 7671 requirements",
        "The earth electrode resistance is satisfactory"
      ],
      correctAnswer: 1,
      explanation: "The test button creates an internal test circuit that bypasses the external installation, only verifying that the internal sensing and tripping mechanism operates."
    },
    {
      question: "Why can't the RCD test button verify disconnection times?",
      options: [
        "It applies a different frequency",
        "It doesn't measure time - only that the RCD trips",
        "It applies current in the wrong direction",
        "The test current is too high"
      ],
      correctAnswer: 1,
      explanation: "The test button is a simple mechanical switch with no timing capability. It can only indicate that the RCD trips, not how quickly it does so."
    },
    {
      question: "What critical fault condition can only be detected by instrument testing?",
      options: [
        "Faulty internal components",
        "Stuck test button",
        "Loss of the earth return path (broken CPC)",
        "Worn internal contacts"
      ],
      correctAnswer: 2,
      explanation: "The test button bypasses the external circuit. Only instrument testing, which includes the circuit's earth path, can detect issues like a broken CPC or disconnected earth."
    },
    {
      question: "How often does BS 7671 recommend testing the RCD using its test button?",
      options: [
        "Weekly",
        "Monthly",
        "Quarterly (every 3 months)",
        "Annually"
      ],
      correctAnswer: 2,
      explanation: "BS 7671 recommends that users operate the test button quarterly (every 3 months) to exercise the mechanical components and verify basic functionality."
    },
    {
      question: "An RCD passes its test button test but fails instrument testing at 1×IΔn. What does this indicate?",
      options: [
        "The test instrument is faulty",
        "The test button circuit is providing incorrect results",
        "The internal mechanism works but there's a fault in the circuit or RCD sensitivity",
        "Both tests should always give the same result"
      ],
      correctAnswer: 2,
      explanation: "This indicates the mechanical trip works (test button passes) but there's an issue with the actual sensing capability or the circuit's earth path that instrument testing reveals."
    },
    {
      question: "What test current does the internal RCD test button typically apply?",
      options: [
        "Exactly 1×IΔn (e.g., exactly 30mA for a 30mA RCD)",
        "5×IΔn for fast tripping",
        "A current designed to trip the mechanism, usually close to IΔn",
        "A varying ramp current"
      ],
      correctAnswer: 2,
      explanation: "The test button applies a current designed to operate the mechanism, typically close to or slightly above IΔn, but this is not precisely calibrated and varies by manufacturer."
    },
    {
      question: "Which statement about RCD test button testing is correct?",
      options: [
        "It verifies the complete protective circuit including CPCs",
        "It can detect a high-resistance earth fault path",
        "It should be performed quarterly by the user",
        "It provides the same verification as instrument testing"
      ],
      correctAnswer: 2,
      explanation: "Quarterly test button operation is recommended for users. The test button only checks internal mechanisms and cannot verify external circuit integrity."
    },
    {
      question: "During an EICR, which RCD tests are required?",
      options: [
        "Test button only - if it trips, the RCD is fine",
        "Instrument testing only - test buttons are unreliable",
        "Both test button operation AND instrument testing at required test currents",
        "Either method - they're equivalent"
      ],
      correctAnswer: 2,
      explanation: "An EICR requires both: verify the test button operates the RCD AND perform instrument testing at 1×IΔn and 5×IΔn to confirm trip times meet requirements."
    },
    {
      question: "What could cause an RCD to pass instrument testing but fail its test button?",
      options: [
        "This is impossible - they test the same thing",
        "A fault in the test button circuit or resistor",
        "Incorrect instrument connections",
        "Testing on the wrong circuit"
      ],
      correctAnswer: 1,
      explanation: "The test button has its own internal circuit with a resistor. If this component fails, the button may not operate even though the RCD's main function is intact."
    },
    {
      question: "Why must electricians use calibrated test instruments rather than relying on test buttons?",
      options: [
        "Test buttons can stick in cold weather",
        "Only instruments can verify trip times and test the complete protective circuit",
        "Test buttons are not fitted to all RCDs",
        "Instruments are faster to use"
      ],
      correctAnswer: 1,
      explanation: "Calibrated instruments measure disconnection times, apply precise test currents, and test through the actual circuit including the earth path - none of which the test button can do."
    }
  ];

  const faqData = [
    {
      question: "If the test button works, why do I need instrument testing?",
      answer: "The test button only confirms the internal trip mechanism operates - it creates an internal fault that bypasses the external circuit. Instrument testing verifies the RCD trips within required times AND that the external circuit (including CPCs and earth path) is intact. A broken CPC would not be detected by the test button."
    },
    {
      question: "Can I tell the client their RCD is fine after a successful test button press?",
      answer: "No. While the test button confirms basic mechanism function, you cannot confirm the RCD meets BS 7671 requirements without instrument testing. The test button doesn't measure trip times or verify the circuit's protective conductor continuity."
    },
    {
      question: "How often should the test button be pressed?",
      answer: "BS 7671 recommends quarterly (every 3 months) testing by the user. This exercises the mechanical components and provides ongoing verification that basic tripping function is maintained between professional tests."
    },
    {
      question: "What if the test button doesn't trip the RCD?",
      answer: "If pressing the test button doesn't trip the RCD, the unit may be faulty and should not be relied upon for protection. However, first verify the supply is on and the RCD is in the 'on' position. If it still fails, the RCD should be replaced or investigated by a competent person."
    },
    {
      question: "Can I use the test button to verify an RCD after replacement?",
      answer: "The test button is useful for initial verification that the mechanism operates, but full commissioning must include instrument testing to verify trip times at 1×IΔn and 5×IΔn, plus functional testing at ½×IΔn to confirm non-tripping below threshold."
    },
    {
      question: "Does the test button apply exactly 30mA on a 30mA RCD?",
      answer: "No. The test button applies a current designed to trip the mechanism, typically somewhere between 50% and 100% of IΔn. The exact value varies by manufacturer and is not precisely calibrated like test instruments."
    }
  ];

  const pocketCardUnits = [
    { name: "Test Button Test", symbol: "Mechanism", unit: "only" },
    { name: "Instrument Test", symbol: "Complete", unit: "circuit" },
    { name: "User Test Frequency", symbol: "Quarterly", unit: "3 months" },
    { name: "Required Times", symbol: "1×IΔn & 5×IΔn", unit: "tests" },
    { name: "Max Trip 1×IΔn", symbol: "300", unit: "ms" },
    { name: "Max Trip 5×IΔn", symbol: "40", unit: "ms" }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* iOS-style Header */}
      <header className="sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between px-4 h-14">
          <button
            onClick={() => navigate('/study-centre/upskilling/inspection-testing/module-6')}
            className="flex items-center gap-2 text-cyan-400 active:opacity-70 transition-opacity touch-manipulation"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-base">Module 6</span>
          </button>
          <span className="text-white/60 text-sm">4 of 5</span>
        </div>
      </header>

      <main className="px-4 py-6 pb-safe max-w-3xl mx-auto">
        {/* Hero Section */}
        <section className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-500/20 rounded-full mb-4">
            <span className="text-cyan-400 text-sm font-medium">Module 6 • RCD Testing</span>
          </div>
          <h1 className="text-ios-title-large text-white font-bold mb-3">
            Test Button vs Instrument Testing
          </h1>
          <p className="text-white/70 text-ios-body leading-relaxed">
            Understand why the RCD test button is not a substitute for professional instrument testing and what each method actually verifies.
          </p>
        </section>

        {/* In 30 Seconds Card */}
        <Card variant="ios-elevated" className="mb-8">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-cyan-400" />
              <h2 className="text-white font-semibold text-lg">In 30 Seconds</h2>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                <span className="text-white/80 text-base">The test button only verifies internal mechanism operation - not the external circuit</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                <span className="text-white/80 text-base">Instrument testing verifies trip times AND tests through the actual protective circuit</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                <span className="text-white/80 text-base">Both methods are required - they test different things</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Learning Outcomes */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-cyan-400" />
            Learning Outcomes
          </h2>
          <div className="grid gap-3">
            {learningOutcomes.map((outcome, index) => (
              <Card key={index} variant="ios" className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center shrink-0">
                    <outcome.icon className="w-5 h-5 text-cyan-400" />
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
            <span className="text-3xl font-bold text-cyan-400/30">01</span>
            <h2 className="text-xl font-semibold text-white">How the Test Button Works</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                The RCD test button creates an internal imbalance by connecting a resistor between line and the load side of the current transformer. This simulates an earth fault current flowing through the RCD without involving the external circuit.
              </p>
              <div className="bg-white/5 rounded-xl p-4 border border-cyan-500/20">
                <h4 className="text-cyan-400 font-semibold mb-2">Test Button Circuit</h4>
                <p className="text-white/70 text-sm mb-3">When pressed, the button:</p>
                <ul className="space-y-2 text-white/70 text-sm">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-cyan-400 shrink-0" />
                    <span>Connects internal test resistor</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-cyan-400 shrink-0" />
                    <span>Creates current imbalance through the toroid</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-cyan-400 shrink-0" />
                    <span>Triggers the trip mechanism if functioning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-cyan-400 shrink-0" />
                    <span>Bypasses the external circuit completely</span>
                  </li>
                </ul>
              </div>
              <p>
                The test button confirms the sensing and tripping mechanism works but tells you nothing about trip times, actual sensitivity, or whether the external protective circuit is intact.
              </p>
            </div>
          </Card>
        </section>

        {/* Content Section 02 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-cyan-400/30">02</span>
            <h2 className="text-xl font-semibold text-white">Limitations of Test Button Testing</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                While the test button is a valuable user tool for regular verification, it has significant limitations that make it unsuitable as the sole means of RCD verification:
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-red-500/10 rounded-xl border border-red-500/20">
                  <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-medium">Cannot measure trip times</span>
                    <p className="text-white/60 text-sm">No timing capability - just confirms operation</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-red-500/10 rounded-xl border border-red-500/20">
                  <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-medium">Doesn't test the earth path</span>
                    <p className="text-white/60 text-sm">A broken CPC would not be detected</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-red-500/10 rounded-xl border border-red-500/20">
                  <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-medium">Uncalibrated test current</span>
                    <p className="text-white/60 text-sm">Applied current varies by manufacturer</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-red-500/10 rounded-xl border border-red-500/20">
                  <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-medium">No sensitivity verification</span>
                    <p className="text-white/60 text-sm">Cannot determine actual trip threshold</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* InlineCheck */}
        <div className="mb-8">
          <InlineCheck
            question="What critical fault could remain undetected if only the test button was used to verify an RCD?"
            answer="A broken or disconnected CPC (circuit protective conductor) would not be detected because the test button bypasses the external circuit. The RCD would trip on the test button but provide no protection during a real fault."
            color="cyan"
          />
        </div>

        {/* Content Section 03 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-cyan-400/30">03</span>
            <h2 className="text-xl font-semibold text-white">What Instrument Testing Verifies</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                Professional RCD testing instruments apply precise test currents through the actual circuit and measure the disconnection time. This provides comprehensive verification that test button testing cannot achieve:
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-green-500/10 rounded-xl border border-green-500/20">
                  <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-medium">Precise trip time measurement</span>
                    <p className="text-white/60 text-sm">Confirms compliance with 300ms at 1×IΔn, 40ms at 5×IΔn</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-green-500/10 rounded-xl border border-green-500/20">
                  <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-medium">Tests through actual circuit</span>
                    <p className="text-white/60 text-sm">Verifies earth path integrity and CPC continuity</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-green-500/10 rounded-xl border border-green-500/20">
                  <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-medium">Calibrated test currents</span>
                    <p className="text-white/60 text-sm">Applies exact 1×IΔn, 5×IΔn, and ½×IΔn currents</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-green-500/10 rounded-xl border border-green-500/20">
                  <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-medium">Ramp testing capability</span>
                    <p className="text-white/60 text-sm">Can determine actual RCD sensitivity</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Content Section 04 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-cyan-400/30">04</span>
            <h2 className="text-xl font-semibold text-white">Comparison Table</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-3 pr-4 text-cyan-400 font-semibold">Feature</th>
                      <th className="text-center py-3 px-2 text-cyan-400 font-semibold">Test Button</th>
                      <th className="text-center py-3 pl-4 text-cyan-400 font-semibold">Instrument</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    <tr className="border-b border-white/10">
                      <td className="py-3 pr-4">Verifies mechanism trips</td>
                      <td className="py-3 px-2 text-center text-green-400">✓</td>
                      <td className="py-3 pl-4 text-center text-green-400">✓</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 pr-4">Measures trip time</td>
                      <td className="py-3 px-2 text-center text-red-400">✗</td>
                      <td className="py-3 pl-4 text-center text-green-400">✓</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 pr-4">Tests earth path</td>
                      <td className="py-3 px-2 text-center text-red-400">✗</td>
                      <td className="py-3 pl-4 text-center text-green-400">✓</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 pr-4">Calibrated current</td>
                      <td className="py-3 px-2 text-center text-red-400">✗</td>
                      <td className="py-3 pl-4 text-center text-green-400">✓</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 pr-4">Ramp testing</td>
                      <td className="py-3 px-2 text-center text-red-400">✗</td>
                      <td className="py-3 pl-4 text-center text-green-400">✓</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">User can perform</td>
                      <td className="py-3 px-2 text-center text-green-400">✓</td>
                      <td className="py-3 pl-4 text-center text-amber-400">Trained</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </section>

        {/* InlineCheck */}
        <div className="mb-8">
          <InlineCheck
            question="An RCD passes its test button but takes 450ms to trip at 1×IΔn during instrument testing. What is the verdict?"
            answer="The RCD FAILS. Although the mechanism operates (test button passes), the trip time of 450ms exceeds the maximum permitted 300ms at 1×IΔn. This RCD must be replaced as it doesn't meet BS 7671 requirements."
            color="cyan"
          />
        </div>

        {/* Content Section 05 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-cyan-400/30">05</span>
            <h2 className="text-xl font-semibold text-white">When Each Test is Required</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                Both testing methods serve important but different purposes and are required at different intervals:
              </p>
              <div className="space-y-4">
                <div className="bg-white/5 rounded-xl p-4 border border-cyan-500/20">
                  <h4 className="text-cyan-400 font-semibold mb-2">Test Button (User Testing)</h4>
                  <ul className="space-y-2 text-white/70 text-sm">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 mt-0.5 text-cyan-400 shrink-0" />
                      <span><strong>Frequency:</strong> Quarterly (every 3 months)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 mt-0.5 text-cyan-400 shrink-0" />
                      <span><strong>Performed by:</strong> User/occupier</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 mt-0.5 text-cyan-400 shrink-0" />
                      <span><strong>Purpose:</strong> Exercise mechanism, basic verification</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-cyan-500/20">
                  <h4 className="text-cyan-400 font-semibold mb-2">Instrument Testing (Professional)</h4>
                  <ul className="space-y-2 text-white/70 text-sm">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 mt-0.5 text-cyan-400 shrink-0" />
                      <span><strong>Frequency:</strong> Initial verification, periodic inspection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 mt-0.5 text-cyan-400 shrink-0" />
                      <span><strong>Performed by:</strong> Competent person (electrician)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 mt-0.5 text-cyan-400 shrink-0" />
                      <span><strong>Purpose:</strong> Full compliance verification</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Content Section 06 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-cyan-400/30">06</span>
            <h2 className="text-xl font-semibold text-white">EICR Requirements</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                During an Electrical Installation Condition Report (EICR), the inspector must perform comprehensive RCD testing that includes both methods:
              </p>
              <div className="bg-white/5 rounded-xl p-4 border border-cyan-500/20">
                <h4 className="text-cyan-400 font-semibold mb-3">EICR RCD Testing Requirements</h4>
                <ol className="space-y-3 text-white/70">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-sm flex items-center justify-center shrink-0">1</span>
                    <span>Verify test button operates the RCD</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-sm flex items-center justify-center shrink-0">2</span>
                    <span>Test at 1×IΔn - record trip time (max 300ms)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-sm flex items-center justify-center shrink-0">3</span>
                    <span>Test at 5×IΔn - record trip time (max 40ms)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-sm flex items-center justify-center shrink-0">4</span>
                    <span>Test at ½×IΔn - confirm no tripping</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-sm flex items-center justify-center shrink-0">5</span>
                    <span>Record all results on schedule of test results</span>
                  </li>
                </ol>
              </div>
              <div className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30 mt-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-white/70 text-sm">
                    Relying solely on test button operation would not meet the requirements of BS 7671 or the model forms for electrical certification.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* InlineCheck */}
        <div className="mb-8">
          <InlineCheck
            question="Can an electrician issue a satisfactory EICR if RCDs only pass their test buttons but no instrument testing was performed?"
            answer="No. An EICR requires instrument testing to verify trip times at 1×IΔn and 5×IΔn. Test button operation alone cannot demonstrate compliance with BS 7671 disconnection time requirements."
            color="cyan"
          />
        </div>

        {/* Practical Tips */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-cyan-400" />
            Practical Tips
          </h2>
          <div className="space-y-3">
            <Card variant="ios" className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Advise Clients</h4>
                  <p className="text-white/60 text-sm">Always advise clients to test their RCDs quarterly using the test button</p>
                </div>
              </div>
            </Card>
            <Card variant="ios" className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Document Both</h4>
                  <p className="text-white/60 text-sm">Record both test button function AND instrument test results</p>
                </div>
              </div>
            </Card>
            <Card variant="ios" className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Failed Button Test</h4>
                  <p className="text-white/60 text-sm">If test button doesn't trip RCD, treat as serious defect requiring replacement</p>
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
            title="Test Methods Quick Reference"
            units={pocketCardUnits}
            color="cyan"
          />
        </section>

        {/* Quiz */}
        <section className="mb-8">
          <Quiz
            title="Section Quiz"
            questions={quizQuestions}
            color="cyan"
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col gap-3 pt-4 pb-safe">
          <div className="flex gap-3">
            <Button
              variant="ios-secondary"
              size="lg"
              className="flex-1 touch-target"
              onClick={() => navigate('/study-centre/upskilling/inspection-testing/module-6/section-3')}
            >
              Previous
            </Button>
            <Button
              variant="ios-primary"
              size="lg"
              className="flex-1 touch-target"
              onClick={() => navigate('/study-centre/upskilling/inspection-testing/module-6/section-5')}
            >
              Next Section
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
          <Button
            variant="ios-secondary"
            size="lg"
            className="w-full touch-target"
            onClick={() => navigate('/study-centre/upskilling/inspection-testing/module-6')}
          >
            Back to Module 6
          </Button>
        </nav>
      </main>
    </div>
  );
};

export default InspectionTestingModule6Section4;
