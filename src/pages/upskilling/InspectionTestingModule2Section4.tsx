import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Zap, CheckCircle2, AlertTriangle, Activity, Target, Lightbulb, XCircle, ChevronDown, ChevronUp, FileText, Shield, CircleDot, Gauge } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Quiz from '@/components/apprentice-courses/Quiz';
import InlineCheck from '@/components/apprentice-courses/InlineCheck';
import UnitsPocketCard from '@/components/apprentice-courses/UnitsPocketCard';
import { useSEO } from '@/hooks/useSEO';

const InspectionTestingModule2Section4 = () => {
  useSEO({
    title: "Proving Dead Techniques | Safe Isolation | Inspection & Testing Course",
    description: "Master the critical techniques for proving circuits dead before work commences. Learn the prove-test-prove sequence, all-pole testing, and three-phase verification procedures."
  });

  const navigate = useNavigate();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const defined_learningOutcomes = [
    { id: 1, text: "Execute the correct prove-test-prove sequence using approved equipment", icon: Activity },
    { id: 2, text: "Perform all-pole testing between all live conductors and earth", icon: Zap },
    { id: 3, text: "Identify where to test for both single-phase and three-phase circuits", icon: Target },
    { id: 4, text: "Recognise and respond to unexpected test results", icon: AlertTriangle },
    { id: 5, text: "Understand limitations of proving dead at different test points", icon: CircleDot },
    { id: 6, text: "Document proving dead procedures correctly", icon: FileText }
  ];

  const defined_defined_defined_defined_defined_faqs = [
    {
      question: "Why must I prove the voltage indicator works AFTER testing as well as before?",
      answer: "The second prove confirms the instrument was functioning correctly throughout the testing process. If your voltage indicator had an intermittent fault, flat battery, or damaged lead that occurred DURING testing, the first prove would pass but the actual test would be unreliable. Without the second prove, you cannot distinguish between a genuinely dead circuit and an instrument failure showing no voltage when there actually is one."
    },
    {
      question: "Can I use a multimeter instead of a voltage indicator?",
      answer: "While multimeters CAN detect voltage, GS38 recommends dedicated voltage indicators for proving dead because: they provide clearer pass/fail indication, have fewer user-selectable modes (reducing error risk), are designed specifically for this safety-critical task, and typically have better probe/lead safety features. If you must use a multimeter, ensure it's CAT rated appropriately, has GS38-compliant leads, and you still prove it before AND after with a proving unit."
    },
    {
      question: "What if I get a low voltage reading instead of zero?",
      answer: "A low voltage reading (typically under 50V) may indicate: induced voltage from parallel cables, capacitive charge, backup supply, or an incomplete isolation. NEVER assume low voltage is safe. Investigate the source - if it's induced/capacitive it will typically collapse under load (use a voltage tester with load capability). If uncertain, treat it as live until the source is identified and the circuit is confirmed safe by a competent person."
    },
    {
      question: "Why test between ALL conductors and not just line-to-earth?",
      answer: "Testing only L-E would miss: voltage between line conductors (L-N, L1-L2, etc.), floating neutral situations, backfeed from interconnected circuits, and borrowed neutral faults. The all-pole testing pattern ensures every possible voltage path is checked. A circuit can be 'dead' to earth but have dangerous voltage between conductors, or have an energised neutral from a shared circuit."
    },
    {
      question: "How close to the work location should proving dead be done?",
      answer: "Ideally, prove dead as close to the actual work point as possible. Testing at the isolation point only confirms isolation there - there could be other sources downstream. For cable work, test at both ends if possible. For equipment, test at the equipment terminals. If testing at the isolation point only, ensure you've identified ALL possible energy sources to the work area."
    },
    {
      question: "What's the difference between 'dead' and 'safe'?",
      answer: "A circuit is 'dead' when it has no voltage present. However, 'dead' doesn't automatically mean 'safe' - there may be other hazards (stored energy in capacitors, mechanical hazards, pressurised systems, etc.). Safe working requires: confirming dead, ensuring it cannot become live (LOTO), and addressing all other hazards. Proving dead is one essential step in making work safe, not the only step."
    },
    {
      question: "Do I need to prove dead again if I leave the work area temporarily?",
      answer: "Yes, if there's any possibility the circuit could have been re-energised. If your personal lock remained in place and no one else could have removed it, strictly speaking the circuit should still be dead. However, best practice is to re-prove dead after any break in work, especially if: you were away for an extended period, the work area was unattended, or you have any doubt about the isolation status."
    },
    {
      question: "What should I do if my proving unit shows my voltage indicator has failed?",
      answer: "Stop work immediately. Do NOT trust any previous readings from that instrument. Use a different, known-good voltage indicator and repeat the entire proving dead sequence from the beginning. The failed instrument should be removed from service and either replaced or sent for verification/repair. Document the failure in case any previous work needs to be reviewed."
    }
  ];

  const defined_defined_defined_defined_quizQuestions = [
    {
      question: "What is the correct sequence for proving a circuit dead?",
      options: ["Test-Prove-Test", "Prove-Test-Prove", "Test-Test-Prove", "Prove-Prove-Test"],
      correctAnswer: 1,
      explanation: "The correct sequence is Prove-Test-Prove: First prove the voltage indicator works (using proving unit), then test the circuit (should show dead), then prove the indicator still works (proving unit again). This confirms the instrument was functioning throughout."
    },
    {
      question: "When testing a single-phase circuit, which combinations must you test between?",
      options: ["L-E only", "L-N only", "L-E and L-N", "L-E, L-N, and N-E"],
      correctAnswer: 3,
      explanation: "For single-phase, you must test L-E (line to earth), L-N (line to neutral), AND N-E (neutral to earth). This ensures no voltage on any conductor and detects borrowed neutral or backfeed situations that L-E alone would miss."
    },
    {
      question: "For a three-phase circuit, how many separate tests are required between all conductors?",
      options: ["3 tests", "6 tests", "9 tests", "10 tests"],
      correctAnswer: 3,
      explanation: "Three-phase testing requires 10 tests: L1-L2, L1-L3, L2-L3 (between phases), L1-N, L2-N, L3-N (phases to neutral), L1-E, L2-E, L3-E (phases to earth), and N-E (neutral to earth). This covers every possible voltage path."
    },
    {
      question: "If your voltage indicator shows 25V AC on a circuit you expected to be dead, what should you do?",
      options: ["Ignore it as it's below 50V", "Proceed with work wearing insulated gloves", "Investigate the source before proceeding", "Report it but continue working"],
      correctAnswer: 2,
      explanation: "Any unexpected voltage reading must be investigated before proceeding. Low voltages could indicate incomplete isolation, backfeed, induced voltage, or instrument error. Never assume low voltage is safe - identify the source and confirm the circuit is genuinely safe."
    },
    {
      question: "Why is testing at the point of work preferable to testing at the isolation point?",
      options: ["It's more convenient", "It confirms isolation closer to where you'll be working", "Isolation points are hard to access", "It uses less battery on the tester"],
      correctAnswer: 1,
      explanation: "Testing at the point of work confirms isolation closest to the hazard area. Testing only at the isolation point doesn't account for other possible energy sources downstream, backfeed from interconnected systems, or errors in identifying the correct circuit."
    },
    {
      question: "What does a successful proving unit test confirm?",
      options: ["The circuit is dead", "The proving unit battery is good", "The voltage indicator is functioning correctly", "The isolation point is secure"],
      correctAnswer: 2,
      explanation: "The proving unit generates a known voltage to confirm the voltage indicator is working correctly - it detects and displays voltage. This confirms the instrument's function, not the circuit's status. The circuit test comes after the first prove."
    },
    {
      question: "If the second 'prove' test fails (indicator doesn't respond to proving unit), what does this mean?",
      options: ["The circuit is definitely dead", "The first test result cannot be trusted", "The proving unit needs replacing", "The test should be repeated immediately"],
      correctAnswer: 1,
      explanation: "If the second prove fails, the indicator was not functioning correctly during the circuit test. The 'dead' reading cannot be trusted - it might have been an instrument failure rather than genuine zero voltage. Repeat the entire sequence with a known-good instrument."
    },
    {
      question: "What additional hazard should you consider after proving a circuit dead?",
      options: ["Radio frequency interference", "Stored energy in capacitors", "Magnetic fields", "Static electricity only"],
      correctAnswer: 1,
      explanation: "Capacitors can store dangerous charges even after isolation. Large capacitors in motor drives, power factor correction, and power supplies can retain lethal voltages. After proving dead, wait for discharge time (per manufacturer) or use approved discharge procedures before touching."
    },
    {
      question: "When testing a circuit with a neutral conductor, why is testing N-E important?",
      options: ["To check earth continuity", "To detect voltage on the neutral from shared/borrowed neutral situations", "To measure neutral current", "To verify N-E loop impedance"],
      correctAnswer: 1,
      explanation: "Testing N-E can detect 'borrowed neutral' situations where the neutral carries voltage from another circuit sharing the same neutral conductor. Even with your circuit's line isolated, the neutral could be energised relative to earth from another source."
    },
    {
      question: "At what point in the isolation process should proving dead be performed?",
      options: ["Before isolation", "Immediately after isolation, before LOTO", "After LOTO, before starting work", "After starting work, if in doubt"],
      correctAnswer: 2,
      explanation: "Proving dead is performed AFTER isolation and LOTO. The sequence is: Isolate → Lock → Tag → Try (operate equipment to verify isolation) → Prove Dead (voltage test). Only after all these steps should work commence."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* iOS-style Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between px-4 h-14">
          <button
            onClick={() => navigate('/study-centre/apprentice/upskilling/inspection-testing/module2')}
            className="flex items-center text-elec-yellow touch-target"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            <span className="text-sm font-medium">Module 2</span>
          </button>
          <span className="text-xs text-white/50 font-medium">Section 4 of 6</span>
        </div>
      </header>

      <main className="pb-24">
        {/* Hero Section */}
        <section className="px-4 pt-6 pb-8">
          <Badge className="bg-elec-yellow/20 text-elec-yellow border-0 mb-3">
            Module 2 • Safe Isolation
          </Badge>
          <h1 className="text-ios-title-large font-bold text-white mb-3">
            Proving Dead Techniques
          </h1>
          <p className="text-white/70 text-ios-body leading-relaxed">
            Master the critical voltage testing techniques that confirm circuits are genuinely dead before work commences - the final safety verification before touching conductors.
          </p>
        </section>

        {/* In 30 Seconds Card */}
        <section className="px-4 mb-8">
          <Card variant="ios-elevated" className="bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border-elec-yellow/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <Zap className="w-5 h-5 text-elec-yellow" />
                In 30 Seconds
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-white/90 text-sm leading-relaxed">
                • <strong>Prove-Test-Prove</strong> - verify instrument works before AND after testing the circuit
              </p>
              <p className="text-white/90 text-sm leading-relaxed">
                • <strong>All-pole testing</strong> - test between ALL conductors (L-E, L-N, N-E) not just line-to-earth
              </p>
              <p className="text-white/90 text-sm leading-relaxed">
                • <strong>Test at work point</strong> - prove dead as close to your work location as possible
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Learning Outcomes */}
        <section className="px-4 mb-8">
          <h2 className="text-ios-headline font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 gap-3">
            {defined_learningOutcomes.map((outcome) => (
              <Card key={outcome.id} variant="ios" className="bg-white/5 border-white/10">
                <CardContent className="flex items-start gap-3 p-4">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <outcome.icon className="w-4 h-4 text-elec-yellow" />
                  </div>
                  <span className="text-white/90 text-sm leading-relaxed">{outcome.text}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Section 01: The Prove-Test-Prove Sequence */}
        <section className="px-4 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-elec-yellow/30">01</span>
            <h2 className="text-ios-title-2 font-bold text-white">The Prove-Test-Prove Sequence</h2>
          </div>

          <Card variant="ios" className="bg-white/5 border-white/10 mb-4">
            <CardContent className="p-5 space-y-4">
              <p className="text-white/90 leading-relaxed">
                The <strong>prove-test-prove</strong> sequence is the fundamental method for safely confirming a circuit is dead. It ensures your voltage indicating device is working correctly throughout the testing process.
              </p>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-4">The Three Critical Steps</h4>
                <div className="space-y-4">
                  <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-500/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-green-400 font-bold">1</span>
                      </div>
                      <div>
                        <h5 className="text-green-400 font-semibold">PROVE (Before)</h5>
                        <p className="text-white/80 text-sm mt-1">
                          Connect voltage indicator to proving unit. Indicator should show voltage (50V, 100V, 230V depending on proving unit setting). This confirms the instrument DETECTS voltage.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-yellow-500/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-yellow-400 font-bold">2</span>
                      </div>
                      <div>
                        <h5 className="text-yellow-400 font-semibold">TEST (Circuit)</h5>
                        <p className="text-white/80 text-sm mt-1">
                          Test the isolated circuit at the point of work. Use all-pole testing (see next section). Indicator should show NO voltage. This is your critical safety test.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-400 font-bold">3</span>
                      </div>
                      <div>
                        <h5 className="text-blue-400 font-semibold">PROVE (After)</h5>
                        <p className="text-white/80 text-sm mt-1">
                          Connect voltage indicator to proving unit again. Indicator MUST show voltage. This confirms the instrument was working correctly during the circuit test.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-red-400 font-semibold mb-1">Critical Understanding</h4>
                    <p className="text-white/80 text-sm">
                      If the second PROVE fails (indicator doesn't show voltage on proving unit), you <strong>cannot trust the TEST result</strong>. The indicator may have failed during testing. Start over with a different, verified instrument.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 02: Single-Phase All-Pole Testing */}
        <section className="px-4 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-elec-yellow/30">02</span>
            <h2 className="text-ios-title-2 font-bold text-white">Single-Phase All-Pole Testing</h2>
          </div>

          <Card variant="ios" className="bg-white/5 border-white/10 mb-4">
            <CardContent className="p-5 space-y-4">
              <p className="text-white/90 leading-relaxed">
                For single-phase circuits (L, N, E), you must test between <strong>every combination</strong> of conductors. Testing only line-to-earth is insufficient and dangerous.
              </p>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">Single-Phase Test Pattern</h4>
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-red-500 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">L</span>
                      </div>
                      <span className="text-white/60">→</span>
                      <div className="w-10 h-10 rounded bg-green-600 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">E</span>
                      </div>
                    </div>
                    <span className="text-white/80 text-sm">Line to Earth</span>
                  </div>
                  <div className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-red-500 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">L</span>
                      </div>
                      <span className="text-white/60">→</span>
                      <div className="w-10 h-10 rounded bg-blue-500 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">N</span>
                      </div>
                    </div>
                    <span className="text-white/80 text-sm">Line to Neutral</span>
                  </div>
                  <div className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-blue-500 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">N</span>
                      </div>
                      <span className="text-white/60">→</span>
                      <div className="w-10 h-10 rounded bg-green-600 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">E</span>
                      </div>
                    </div>
                    <span className="text-white/80 text-sm">Neutral to Earth</span>
                  </div>
                </div>
                <p className="text-white/60 text-xs mt-3 text-center">= 3 tests required for single-phase</p>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-amber-400 font-semibold mb-1">Why N-E Testing Matters</h4>
                    <p className="text-white/80 text-sm">
                      The N-E test detects <strong>"borrowed neutral"</strong> situations where another circuit shares the same neutral conductor. Even with your line isolated, the neutral could carry voltage from the other circuit. L-E testing alone would not detect this hazard.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Inline Check 1 */}
        <section className="px-4 mb-8">
          <InlineCheck
            question="Why would testing only L-E (line to earth) be dangerous for proving a single-phase circuit dead?"
            correctAnswer="It would miss voltage between L-N (line-neutral) and N-E (borrowed neutral situations) - you must test all three combinations"
            explanation="L-E testing only confirms line is dead relative to earth. The neutral could still carry voltage from a shared circuit, and there could be voltage between line and neutral from backfeed. All-pole testing catches all these hazards."
          />
        </section>

        {/* Section 03: Three-Phase All-Pole Testing */}
        <section className="px-4 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-elec-yellow/30">03</span>
            <h2 className="text-ios-title-2 font-bold text-white">Three-Phase All-Pole Testing</h2>
          </div>

          <Card variant="ios" className="bg-white/5 border-white/10 mb-4">
            <CardContent className="p-5 space-y-4">
              <p className="text-white/90 leading-relaxed">
                Three-phase circuits (L1, L2, L3, N, E) require comprehensive testing between every possible conductor combination - a total of <strong>10 individual tests</strong>.
              </p>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">Three-Phase Test Matrix</h4>

                <div className="mb-4">
                  <h5 className="text-elec-yellow text-sm font-medium mb-2">Phase-to-Phase (3 tests)</h5>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-white/5 rounded-lg p-2 text-center">
                      <span className="text-white/80 text-xs">L1-L2</span>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2 text-center">
                      <span className="text-white/80 text-xs">L1-L3</span>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2 text-center">
                      <span className="text-white/80 text-xs">L2-L3</span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h5 className="text-elec-yellow text-sm font-medium mb-2">Phase-to-Neutral (3 tests)</h5>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-white/5 rounded-lg p-2 text-center">
                      <span className="text-white/80 text-xs">L1-N</span>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2 text-center">
                      <span className="text-white/80 text-xs">L2-N</span>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2 text-center">
                      <span className="text-white/80 text-xs">L3-N</span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h5 className="text-elec-yellow text-sm font-medium mb-2">Phase-to-Earth (3 tests)</h5>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-white/5 rounded-lg p-2 text-center">
                      <span className="text-white/80 text-xs">L1-E</span>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2 text-center">
                      <span className="text-white/80 text-xs">L2-E</span>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2 text-center">
                      <span className="text-white/80 text-xs">L3-E</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="text-elec-yellow text-sm font-medium mb-2">Neutral-to-Earth (1 test)</h5>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-white/5 rounded-lg p-2 text-center">
                      <span className="text-white/80 text-xs">N-E</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10 text-center">
                  <span className="text-elec-yellow font-bold">Total: 10 tests</span>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-blue-400 font-semibold mb-1">Memory Aid</h4>
                    <p className="text-white/80 text-sm">
                      Work systematically: start with L1 and test to everything else (L2, L3, N, E), then L2 to remaining (L3, N, E), then L3 to remaining (N, E), finally N-E. This ensures no combination is missed.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">Four-Wire vs Five-Wire Systems</h4>
                <div className="grid grid-cols-1 gap-3">
                  <div className="bg-white/5 rounded-lg p-3">
                    <h5 className="text-elec-yellow font-medium mb-1">3-Phase + N (No Separate E)</h5>
                    <p className="text-white/70 text-sm">Test phases to neutral and to exposed metalwork. 6-7 tests depending on accessible earth point.</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <h5 className="text-elec-yellow font-medium mb-1">3-Phase Only (No N)</h5>
                    <p className="text-white/70 text-sm">Test all three phase combinations plus each phase to earth. 6 tests total.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 04: Test Point Selection */}
        <section className="px-4 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-elec-yellow/30">04</span>
            <h2 className="text-ios-title-2 font-bold text-white">Test Point Selection</h2>
          </div>

          <Card variant="ios" className="bg-white/5 border-white/10 mb-4">
            <CardContent className="p-5 space-y-4">
              <p className="text-white/90 leading-relaxed">
                <strong>Where</strong> you test is as important as <strong>how</strong> you test. Testing at the wrong location could give false confidence about safety at your actual work point.
              </p>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">Test Location Priority</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 bg-green-500/10 rounded-lg p-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-green-400 font-bold text-sm">1</span>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">Point of Work (Ideal)</p>
                      <p className="text-white/60 text-xs">Test at the actual conductors/terminals you'll be working on</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-yellow-500/10 rounded-lg p-3">
                    <div className="w-8 h-8 rounded-full bg-yellow-500/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-yellow-400 font-bold text-sm">2</span>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">Nearest Accessible Point</p>
                      <p className="text-white/60 text-xs">If work point isn't accessible, test as close as possible</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-orange-500/10 rounded-lg p-3">
                    <div className="w-8 h-8 rounded-full bg-orange-500/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-orange-400 font-bold text-sm">3</span>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">Isolation Point (Last Resort)</p>
                      <p className="text-white/60 text-xs">Only if no other option - verify ALL sources to work point</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">Common Test Locations</h4>
                <div className="space-y-2 text-white/80 text-sm">
                  <p><strong>Distribution boards:</strong> Test at outgoing terminals of the isolated circuit</p>
                  <p><strong>Motors/equipment:</strong> Test at equipment terminals after opening isolator</p>
                  <p><strong>Cables:</strong> Test at both ends where possible</p>
                  <p><strong>Socket outlets:</strong> Test at the socket terminals (not just using plug-in tester)</p>
                  <p><strong>Lighting circuits:</strong> Test at the switch position or fitting terminals</p>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-amber-400 font-semibold mb-1">Backfeed Considerations</h4>
                    <p className="text-white/80 text-sm">
                      Always consider possible energy sources DOWNSTREAM of your isolation point: emergency lighting batteries, UPS systems, solar PV, generators, interconnected circuits. Test at the work point to catch backfeed your isolation might not prevent.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Inline Check 2 */}
        <section className="px-4 mb-8">
          <InlineCheck
            question="Why should you test at the point of work rather than just at the isolation point?"
            correctAnswer="Testing at the isolation point doesn't detect other energy sources downstream such as backfeed from batteries, generators, PV, or interconnected circuits"
            explanation="Your isolation point only controls energy from that source. There may be other sources feeding the same circuit from the other direction. Testing at the work point ensures ALL possible sources are accounted for."
          />
        </section>

        {/* Section 05: Interpreting Unexpected Results */}
        <section className="px-4 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-elec-yellow/30">05</span>
            <h2 className="text-ios-title-2 font-bold text-white">Interpreting Unexpected Results</h2>
          </div>

          <Card variant="ios" className="bg-white/5 border-white/10 mb-4">
            <CardContent className="p-5 space-y-4">
              <p className="text-white/90 leading-relaxed">
                Not all voltage readings are straightforward. Understanding what different readings mean helps you respond safely and avoid dangerous assumptions.
              </p>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">Result Interpretation</h4>
                <div className="space-y-3">
                  <div className="bg-green-500/10 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-green-400 font-medium">0V Reading</span>
                      <Gauge className="w-4 h-4 text-green-400" />
                    </div>
                    <p className="text-white/70 text-sm">Expected result for a dead circuit. Proceed only after second prove confirms instrument still works.</p>
                  </div>

                  <div className="bg-amber-500/10 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-amber-400 font-medium">Low Voltage (5-50V)</span>
                      <Gauge className="w-4 h-4 text-amber-400" />
                    </div>
                    <p className="text-white/70 text-sm">Could indicate: induced voltage, capacitive coupling, partial isolation, or control circuit. Investigate source - do NOT assume safe.</p>
                  </div>

                  <div className="bg-red-500/10 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-red-400 font-medium">Full Voltage (230V/400V)</span>
                      <Gauge className="w-4 h-4 text-red-400" />
                    </div>
                    <p className="text-white/70 text-sm">Circuit is LIVE. Isolation has failed or wrong circuit isolated. Stop - do not proceed. Reverify isolation points.</p>
                  </div>

                  <div className="bg-blue-500/10 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-blue-400 font-medium">Fluctuating Reading</span>
                      <Gauge className="w-4 h-4 text-blue-400" />
                    </div>
                    <p className="text-white/70 text-sm">May indicate: loose connection, intermittent supply, or induced EMF. Treat as potentially live until explained.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">Common Causes of Unexpected Voltage</h4>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span><strong>Induced voltage:</strong> Cables running parallel to energised circuits can have voltage induced</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span><strong>Capacitive charge:</strong> Long cables or capacitors can hold charge after isolation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span><strong>Borrowed neutral:</strong> Shared neutral carrying current from other circuits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span><strong>Backfeed:</strong> Alternative supply (UPS, generator, PV, batteries)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span><strong>Wrong circuit:</strong> Incorrect circuit identification at isolation point</span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-red-400 font-semibold mb-1">Never Assume</h4>
                    <p className="text-white/80 text-sm">
                      Never assume a low voltage reading is "just induced" or "probably capacitive" without verifying. Some induced voltages can deliver significant current. When in doubt, consult a competent person before proceeding.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 06: Documentation Requirements */}
        <section className="px-4 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-elec-yellow/30">06</span>
            <h2 className="text-ios-title-2 font-bold text-white">Documentation Requirements</h2>
          </div>

          <Card variant="ios" className="bg-white/5 border-white/10 mb-4">
            <CardContent className="p-5 space-y-4">
              <p className="text-white/90 leading-relaxed">
                Proper documentation of proving dead provides evidence of safe working practices and helps with any subsequent investigation or audit of procedures.
              </p>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">What to Record</h4>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Date, time, and location of testing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Circuit/equipment identification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Voltage indicator make, model, and serial number</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Proving unit confirmation (before and after)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Test results (all conductor combinations)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Name and signature of person conducting test</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">Integration with Other Documentation</h4>
                <div className="space-y-2 text-white/80 text-sm">
                  <p><strong>Permit-to-Work:</strong> Proving dead confirmation often part of PTW sign-on</p>
                  <p><strong>Risk Assessment:</strong> May reference specific proving dead requirements</p>
                  <p><strong>Method Statement:</strong> Should detail proving dead procedure for the work</p>
                  <p><strong>Test Results:</strong> Formal testing records may include proving dead confirmation</p>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-blue-400 font-semibold mb-1">Good Practice</h4>
                    <p className="text-white/80 text-sm">
                      Take a timestamped photo showing your voltage indicator on the proving unit (proving step) and at the test point (showing 0V). This provides clear visual evidence of the prove-test-prove sequence being followed.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Inline Check 3 */}
        <section className="px-4 mb-8">
          <InlineCheck
            question="If your voltage indicator fails the second prove (doesn't respond to proving unit after testing the circuit), what should you do?"
            correctAnswer="Do NOT trust the test result - the indicator may have failed during testing. Repeat the entire sequence with a different, verified instrument"
            explanation="The second prove confirms the instrument was working during the circuit test. Failure means you cannot trust the 'dead' reading - it may have been an instrument failure showing no voltage when there actually was voltage present."
          />
        </section>

        {/* Practical Guidance */}
        <section className="px-4 mb-8">
          <h2 className="text-ios-headline font-semibold text-white mb-4">Practical Guidance</h2>

          <Card variant="ios" className="bg-white/5 border-white/10 mb-4">
            <CardContent className="p-5 space-y-4">
              <div className="bg-green-500/10 rounded-xl p-4">
                <h4 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Top Tips
                </h4>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li>• Keep proving unit with your voltage indicator - they're a matched pair</li>
                  <li>• Develop a systematic testing routine you follow every time</li>
                  <li>• Say the test out loud: "L1-E zero, L2-E zero..." to maintain concentration</li>
                  <li>• Take photos at each stage for your records</li>
                  <li>• If ANY reading is unexpected, stop and investigate</li>
                </ul>
              </div>

              <div className="bg-red-500/10 rounded-xl p-4">
                <h4 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
                  <XCircle className="w-5 h-5" />
                  Common Mistakes
                </h4>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li>• Skipping the second prove ("it was working a minute ago")</li>
                  <li>• Testing only L-E and missing N-E or L-L voltages</li>
                  <li>• Testing at isolation point, not at work location</li>
                  <li>• Assuming low voltage is "just induced" without investigation</li>
                  <li>• Rushing through the sequence under time pressure</li>
                </ul>
              </div>

              <div className="bg-blue-500/10 rounded-xl p-4">
                <h4 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Key Standards
                </h4>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li>• <strong>GS38:</strong> Defines proving dead equipment and procedures</li>
                  <li>• <strong>HSG85:</strong> Safe working on electrical equipment</li>
                  <li>• <strong>EAW Reg 13:</strong> Precautions for work on dead equipment</li>
                  <li>• <strong>BS 7671:</strong> Chapter 64 - Initial verification procedures</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* FAQs */}
        <section className="px-4 mb-8">
          <h2 className="text-ios-headline font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {defined_defined_defined_defined_defined_faqs.map((faq, index) => (
              <Card key={index} variant="ios" className="bg-white/5 border-white/10">
                <button
                  className="w-full p-4 text-left flex items-center justify-between touch-target"
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                >
                  <span className="text-white/90 font-medium text-sm pr-4">{faq.question}</span>
                  {openFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-white/50 flex-shrink-0" />
                  )}
                </button>
                {openFAQ === index && (
                  <div className="px-4 pb-4">
                    <p className="text-white/70 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* Reference Card */}
        <section className="px-4 mb-8">
          <UnitsPocketCard
            title="Proving Dead Quick Reference"
            items={[
              { term: "Prove-Test-Prove", definition: "Verify indicator → Test circuit → Verify indicator again" },
              { term: "Single-Phase Tests", definition: "L-E, L-N, N-E (3 tests)" },
              { term: "Three-Phase Tests", definition: "All combinations of L1,L2,L3,N,E (10 tests)" },
              { term: "Test Location", definition: "Point of work > nearest accessible > isolation point" },
              { term: "Second Prove Fails", definition: "Do NOT trust test result - repeat with new instrument" },
              { term: "Low Voltage", definition: "Investigate source - never assume safe" },
              { term: "Documentation", definition: "Date, time, circuit, instrument, results, signature" }
            ]}
          />
        </section>

        {/* Quiz */}
        <section className="px-4 mb-8">
          <Quiz
            title="Test Your Knowledge"
            questions={defined_defined_defined_defined_quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="px-4 pb-safe">
          <div className="flex gap-3">
            <Button
              variant="ios-secondary"
              className="flex-1 h-12"
              onClick={() => navigate('/study-centre/apprentice/upskilling/inspection-testing/module2/section3')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button
              variant="ios-primary"
              className="flex-1 h-12"
              onClick={() => navigate('/study-centre/apprentice/upskilling/inspection-testing/module2/section5')}
            >
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Button>
          </div>
        </nav>
      </main>
    </div>
  );
};

export default InspectionTestingModule2Section4;
