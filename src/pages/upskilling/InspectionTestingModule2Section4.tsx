import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Zap, CheckCircle, Activity, Target, AlertTriangle, CircleDot, FileText, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import UnitsPocketCard from '@/components/apprentice-courses/UnitsPocketCard';
import useSEO from '@/hooks/useSEO';

const InspectionTestingModule2Section4 = () => {
  useSEO({
    title: "Proving Dead Techniques | Safe Isolation | Inspection & Testing Course",
    description: "Master the critical techniques for proving circuits dead before work commences. Learn the prove-test-prove sequence, all-pole testing, and three-phase verification procedures."
  });

  const defined_faqs = [
    {
      question: "Why must I prove the voltage indicator works AFTER testing as well as before?",
      answer: "The second prove confirms the instrument was functioning correctly throughout the testing process. If your voltage indicator had an intermittent fault, flat battery, or damaged lead during testing, the first prove would pass but the actual test would be unreliable. Without the second prove, you cannot distinguish between a genuinely dead circuit and an instrument failure."
    },
    {
      question: "Can I use a multimeter instead of a voltage indicator?",
      answer: "While multimeters CAN detect voltage, GS38 recommends dedicated voltage indicators for proving dead because: they provide clearer pass/fail indication, have fewer user-selectable modes (reducing error risk), are designed specifically for this safety-critical task, and typically have better probe/lead safety features."
    },
    {
      question: "What if I get a low voltage reading instead of zero?",
      answer: "A low voltage reading (typically under 50V) may indicate: induced voltage from parallel cables, capacitive charge, backup supply, or an incomplete isolation. NEVER assume low voltage is safe. Investigate the source - if it's induced/capacitive it will typically collapse under load. If uncertain, treat it as live."
    },
    {
      question: "Why test between ALL conductors and not just line-to-earth?",
      answer: "Testing only L-E would miss: voltage between line conductors (L-N, L1-L2, etc.), floating neutral situations, backfeed from interconnected circuits, and borrowed neutral faults. A circuit can be 'dead' to earth but have dangerous voltage between conductors."
    },
    {
      question: "How close to the work location should proving dead be done?",
      answer: "Ideally, prove dead as close to the actual work point as possible. Testing at the isolation point only confirms isolation there - there could be other sources downstream. For cable work, test at both ends if possible. For equipment, test at the equipment terminals."
    },
    {
      question: "What's the difference between 'dead' and 'safe'?",
      answer: "A circuit is 'dead' when it has no voltage present. However, 'dead' doesn't automatically mean 'safe' - there may be other hazards (stored energy in capacitors, mechanical hazards, pressurised systems, etc.). Proving dead is one essential step in making work safe, not the only step."
    },
    {
      question: "Do I need to prove dead again if I leave the work area temporarily?",
      answer: "Yes, if there's any possibility the circuit could have been re-energised. If your personal lock remained in place, strictly speaking the circuit should still be dead. However, best practice is to re-prove dead after any break in work, especially if the work area was unattended."
    },
    {
      question: "What should I do if my proving unit shows my voltage indicator has failed?",
      answer: "Stop work immediately. Do NOT trust any previous readings from that instrument. Use a different, known-good voltage indicator and repeat the entire proving dead sequence from the beginning. The failed instrument should be removed from service."
    }
  ];

  const quizQuestions = [
    {
      question: "What is the correct sequence for proving a circuit dead?",
      options: ["Test-Prove-Test", "Prove-Test-Prove", "Test-Test-Prove", "Prove-Prove-Test"],
      correctAnswer: 1,
      explanation: "The correct sequence is Prove-Test-Prove: First prove the voltage indicator works (using proving unit), then test the circuit (should show dead), then prove the indicator still works (proving unit again)."
    },
    {
      question: "When testing a single-phase circuit, which combinations must you test between?",
      options: ["L-E only", "L-N only", "L-E and L-N", "L-E, L-N, and N-E"],
      correctAnswer: 3,
      explanation: "For single-phase, you must test L-E (line to earth), L-N (line to neutral), AND N-E (neutral to earth). This ensures no voltage on any conductor and detects borrowed neutral situations."
    },
    {
      question: "For a three-phase circuit, how many separate tests are required between all conductors?",
      options: ["3 tests", "6 tests", "9 tests", "10 tests"],
      correctAnswer: 3,
      explanation: "Three-phase testing requires 10 tests: L1-L2, L1-L3, L2-L3 (between phases), L1-N, L2-N, L3-N (phases to neutral), L1-E, L2-E, L3-E (phases to earth), and N-E (neutral to earth)."
    },
    {
      question: "If your voltage indicator shows 25V AC on a circuit you expected to be dead, what should you do?",
      options: ["Ignore it as it's below 50V", "Proceed with work wearing insulated gloves", "Investigate the source before proceeding", "Report it but continue working"],
      correctAnswer: 2,
      explanation: "Any unexpected voltage reading must be investigated before proceeding. Low voltages could indicate incomplete isolation, backfeed, induced voltage, or instrument error."
    },
    {
      question: "Why is testing at the point of work preferable to testing at the isolation point?",
      options: ["It's more convenient", "It confirms isolation closer to where you'll be working", "Isolation points are hard to access", "It uses less battery on the tester"],
      correctAnswer: 1,
      explanation: "Testing at the point of work confirms isolation closest to the hazard area. Testing only at the isolation point doesn't account for other possible energy sources downstream."
    },
    {
      question: "What does a successful proving unit test confirm?",
      options: ["The circuit is dead", "The proving unit battery is good", "The voltage indicator is functioning correctly", "The isolation point is secure"],
      correctAnswer: 2,
      explanation: "The proving unit generates a known voltage to confirm the voltage indicator is working correctly - it detects and displays voltage. This confirms the instrument's function, not the circuit's status."
    },
    {
      question: "If the second 'prove' test fails (indicator doesn't respond to proving unit), what does this mean?",
      options: ["The circuit is definitely dead", "The first test result cannot be trusted", "The proving unit needs replacing", "The test should be repeated immediately"],
      correctAnswer: 1,
      explanation: "If the second prove fails, the indicator was not functioning correctly during the circuit test. The 'dead' reading cannot be trusted - repeat the entire sequence with a known-good instrument."
    },
    {
      question: "What additional hazard should you consider after proving a circuit dead?",
      options: ["Radio frequency interference", "Stored energy in capacitors", "Magnetic fields", "Static electricity only"],
      correctAnswer: 1,
      explanation: "Capacitors can store dangerous charges even after isolation. Large capacitors in motor drives, power factor correction, and power supplies can retain lethal voltages."
    },
    {
      question: "When testing a circuit with a neutral conductor, why is testing N-E important?",
      options: ["To check earth continuity", "To detect voltage on the neutral from shared/borrowed neutral situations", "To measure neutral current", "To verify N-E loop impedance"],
      correctAnswer: 1,
      explanation: "Testing N-E can detect 'borrowed neutral' situations where the neutral carries voltage from another circuit sharing the same neutral conductor."
    },
    {
      question: "At what point in the isolation process should proving dead be performed?",
      options: ["Before isolation", "Immediately after isolation, before LOTO", "After LOTO, before starting work", "After starting work, if in doubt"],
      correctAnswer: 2,
      explanation: "Proving dead is performed AFTER isolation and LOTO. The sequence is: Isolate - Lock - Tag - Try - Prove Dead. Only after all these steps should work commence."
    }
  ];

  return (
    <div className="bg-background text-foreground">
      {/* Minimal Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="flex items-center justify-between px-4 h-14">
          <Link to="/study-centre/upskilling/inspection-testing/module-2">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Module 2
            </Button>
          </Link>
          <span className="text-xs text-muted-foreground">Section 4 of 6</span>
        </div>
      </header>

      <main className="px-4 py-6 pb-24 max-w-3xl mx-auto">
        {/* Centered Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-elec-yellow" />
            <span className="text-sm text-muted-foreground">Module 2 Section 4</span>
          </div>
          <h1 className="text-2xl font-bold">Proving Dead Techniques</h1>
        </div>

        {/* Quick Summary */}
        <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 mb-8">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Prove-Test-Prove</p>
              <p className="font-medium">Verify instrument works before AND after</p>
            </div>
            <div>
              <p className="text-muted-foreground">All-Pole Testing</p>
              <p className="font-medium">Test L-E, L-N, and N-E (not just L-E)</p>
            </div>
            <div>
              <p className="text-muted-foreground">Test Location</p>
              <p className="font-medium">As close to work point as possible</p>
            </div>
            <div>
              <p className="text-muted-foreground">Three-Phase</p>
              <p className="font-medium">10 tests between all conductors</p>
            </div>
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm">Execute the correct prove-test-prove sequence using approved equipment</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm">Perform all-pole testing between all live conductors and earth</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm">Identify where to test for single-phase and three-phase circuits</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm">Recognise and respond to unexpected test results</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm">Understand limitations of proving dead at different test points</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm">Document proving dead procedures correctly</span>
            </div>
          </div>
        </div>

        {/* Section 01: The Prove-Test-Prove Sequence */}
        <section className="mb-8">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            <h2 className="text-xl font-semibold">The Prove-Test-Prove Sequence</h2>
          </div>

          <div className="space-y-4 text-white">
            <p>
              The <strong>prove-test-prove</strong> sequence is the fundamental method for safely confirming a circuit is dead. It ensures your voltage indicating device is working correctly throughout the testing process.
            </p>

            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4 text-elec-yellow" />
                The Three Critical Steps
              </h4>
              <div className="space-y-4">
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/30 flex items-center justify-center flex-shrink-0 text-green-400 font-bold">1</div>
                    <div>
                      <h5 className="text-green-400 font-semibold">PROVE (Before)</h5>
                      <p className="text-sm mt-1">
                        Connect voltage indicator to proving unit. Indicator should show voltage (50V, 100V, 230V depending on setting). This confirms the instrument DETECTS voltage.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-yellow-500/30 flex items-center justify-center flex-shrink-0 text-yellow-400 font-bold">2</div>
                    <div>
                      <h5 className="text-yellow-400 font-semibold">TEST (Circuit)</h5>
                      <p className="text-sm mt-1">
                        Test the isolated circuit at the point of work. Use all-pole testing (see next section). Indicator should show NO voltage. This is your critical safety test.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/30 flex items-center justify-center flex-shrink-0 text-blue-400 font-bold">3</div>
                    <div>
                      <h5 className="text-blue-400 font-semibold">PROVE (After)</h5>
                      <p className="text-sm mt-1">
                        Connect voltage indicator to proving unit again. Indicator MUST show voltage. This confirms the instrument was working correctly during the circuit test.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-red-400 font-semibold mb-1">Critical Understanding</h4>
                  <p className="text-sm">
                    If the second PROVE fails (indicator doesn't show voltage on proving unit), you <strong>cannot trust the TEST result</strong>. The indicator may have failed during testing. Start over with a different, verified instrument.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Single-Phase All-Pole Testing */}
        <section className="mb-8">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            <h2 className="text-xl font-semibold">Single-Phase All-Pole Testing</h2>
          </div>

          <div className="space-y-4 text-white">
            <p>
              For single-phase circuits (L, N, E), you must test between <strong>every combination</strong> of conductors. Testing only line-to-earth is insufficient and dangerous.
            </p>

            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-3">Single-Phase Test Pattern</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-background/50 rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-red-500 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">L</span>
                    </div>
                    <span className="text-muted-foreground">to</span>
                    <div className="w-10 h-10 rounded bg-green-600 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">E</span>
                    </div>
                  </div>
                  <span className="text-sm font-medium">Line to Earth</span>
                </div>
                <div className="flex items-center justify-between bg-background/50 rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-red-500 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">L</span>
                    </div>
                    <span className="text-muted-foreground">to</span>
                    <div className="w-10 h-10 rounded bg-blue-500 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">N</span>
                    </div>
                  </div>
                  <span className="text-sm font-medium">Line to Neutral</span>
                </div>
                <div className="flex items-center justify-between bg-background/50 rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-blue-500 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">N</span>
                    </div>
                    <span className="text-muted-foreground">to</span>
                    <div className="w-10 h-10 rounded bg-green-600 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">E</span>
                    </div>
                  </div>
                  <span className="text-sm font-medium">Neutral to Earth</span>
                </div>
              </div>
              <p className="text-xs mt-3 text-center">= 3 tests required for single-phase</p>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-amber-400 font-semibold mb-1">Why N-E Testing Matters</h4>
                  <p className="text-sm">
                    The N-E test detects <strong>"borrowed neutral"</strong> situations where another circuit shares the same neutral conductor. Even with your line isolated, the neutral could carry voltage from the other circuit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Check 1 */}
        <div className="mb-8">
          <InlineCheck
            question="Why would testing only L-E (line to earth) be dangerous for proving a single-phase circuit dead?"
            correctAnswer="It would miss voltage between L-N (line-neutral) and N-E (borrowed neutral situations) - you must test all three combinations"
            explanation="L-E testing only confirms line is dead relative to earth. The neutral could still carry voltage from a shared circuit, and there could be voltage between line and neutral from backfeed."
          />
        </div>

        {/* Section 03: Three-Phase All-Pole Testing */}
        <section className="mb-8">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            <h2 className="text-xl font-semibold">Three-Phase All-Pole Testing</h2>
          </div>

          <div className="space-y-4 text-white">
            <p>
              Three-phase circuits (L1, L2, L3, N, E) require comprehensive testing between every possible conductor combination - a total of <strong>10 individual tests</strong>.
            </p>

            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-3">Three-Phase Test Matrix</h4>

              <div className="mb-4">
                <h5 className="text-elec-yellow text-sm font-medium mb-2">Phase-to-Phase (3 tests)</h5>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-background/50 rounded-lg p-2 text-center">
                    <span className="text-sm">L1-L2</span>
                  </div>
                  <div className="bg-background/50 rounded-lg p-2 text-center">
                    <span className="text-sm">L1-L3</span>
                  </div>
                  <div className="bg-background/50 rounded-lg p-2 text-center">
                    <span className="text-sm">L2-L3</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h5 className="text-elec-yellow text-sm font-medium mb-2">Phase-to-Neutral (3 tests)</h5>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-background/50 rounded-lg p-2 text-center">
                    <span className="text-sm">L1-N</span>
                  </div>
                  <div className="bg-background/50 rounded-lg p-2 text-center">
                    <span className="text-sm">L2-N</span>
                  </div>
                  <div className="bg-background/50 rounded-lg p-2 text-center">
                    <span className="text-sm">L3-N</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h5 className="text-elec-yellow text-sm font-medium mb-2">Phase-to-Earth (3 tests)</h5>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-background/50 rounded-lg p-2 text-center">
                    <span className="text-sm">L1-E</span>
                  </div>
                  <div className="bg-background/50 rounded-lg p-2 text-center">
                    <span className="text-sm">L2-E</span>
                  </div>
                  <div className="bg-background/50 rounded-lg p-2 text-center">
                    <span className="text-sm">L3-E</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h5 className="text-elec-yellow text-sm font-medium mb-2">Neutral-to-Earth (1 test)</h5>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-background/50 rounded-lg p-2 text-center">
                    <span className="text-sm">N-E</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border text-center">
                <span className="text-elec-yellow font-bold">Total: 10 tests</span>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-blue-400 font-semibold mb-1">Memory Aid</h4>
                  <p className="text-sm">
                    Work systematically: start with L1 and test to everything else (L2, L3, N, E), then L2 to remaining (L3, N, E), then L3 to remaining (N, E), finally N-E.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Test Point Selection */}
        <section className="mb-8">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            <h2 className="text-xl font-semibold">Test Point Selection</h2>
          </div>

          <div className="space-y-4 text-white">
            <p>
              <strong>Where</strong> you test is as important as <strong>how</strong> you test. Testing at the wrong location could give false confidence about safety at your actual work point.
            </p>

            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-elec-yellow" />
                Test Location Priority
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-green-500/10 rounded-lg p-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/30 flex items-center justify-center flex-shrink-0 text-green-400 font-bold text-xs">1</div>
                  <div>
                    <p className="text-foreground font-medium text-sm">Point of Work (Ideal)</p>
                    <p className="text-xs">Test at the actual conductors/terminals you'll be working on</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-yellow-500/10 rounded-lg p-3">
                  <div className="w-6 h-6 rounded-full bg-yellow-500/30 flex items-center justify-center flex-shrink-0 text-yellow-400 font-bold text-xs">2</div>
                  <div>
                    <p className="text-foreground font-medium text-sm">Nearest Accessible Point</p>
                    <p className="text-xs">If work point isn't accessible, test as close as possible</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-orange-500/10 rounded-lg p-3">
                  <div className="w-6 h-6 rounded-full bg-orange-500/30 flex items-center justify-center flex-shrink-0 text-orange-400 font-bold text-xs">3</div>
                  <div>
                    <p className="text-foreground font-medium text-sm">Isolation Point (Last Resort)</p>
                    <p className="text-xs">Only if no other option - verify ALL sources to work point</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-3">Common Test Locations</h4>
              <div className="space-y-2 text-sm">
                <p><strong>Distribution boards:</strong> Test at outgoing terminals of the isolated circuit</p>
                <p><strong>Motors/equipment:</strong> Test at equipment terminals after opening isolator</p>
                <p><strong>Cables:</strong> Test at both ends where possible</p>
                <p><strong>Socket outlets:</strong> Test at the socket terminals (not just using plug-in tester)</p>
                <p><strong>Lighting circuits:</strong> Test at the switch position or fitting terminals</p>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-amber-400 font-semibold mb-1">Backfeed Considerations</h4>
                  <p className="text-sm">
                    Always consider possible energy sources DOWNSTREAM of your isolation point: emergency lighting batteries, UPS systems, solar PV, generators, interconnected circuits.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Check 2 */}
        <div className="mb-8">
          <InlineCheck
            question="Why should you test at the point of work rather than just at the isolation point?"
            correctAnswer="Testing at the isolation point doesn't detect other energy sources downstream such as backfeed from batteries, generators, PV, or interconnected circuits"
            explanation="Your isolation point only controls energy from that source. There may be other sources feeding the same circuit from the other direction. Testing at the work point ensures ALL possible sources are accounted for."
          />
        </div>

        {/* Section 05: Interpreting Unexpected Results */}
        <section className="mb-8">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            <h2 className="text-xl font-semibold">Interpreting Unexpected Results</h2>
          </div>

          <div className="space-y-4 text-white">
            <p>
              Not all voltage readings are straightforward. Understanding what different readings mean helps you respond safely and avoid dangerous assumptions.
            </p>

            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-3">Result Interpretation</h4>
              <div className="space-y-3">
                <div className="bg-green-500/10 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-green-400 font-medium">0V Reading</span>
                    <CircleDot className="w-4 h-4 text-green-400" />
                  </div>
                  <p className="text-sm">Expected result for a dead circuit. Proceed only after second prove confirms instrument still works.</p>
                </div>

                <div className="bg-amber-500/10 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-amber-400 font-medium">Low Voltage (5-50V)</span>
                    <CircleDot className="w-4 h-4 text-amber-400" />
                  </div>
                  <p className="text-sm">Could indicate: induced voltage, capacitive coupling, partial isolation, or control circuit. Investigate source - do NOT assume safe.</p>
                </div>

                <div className="bg-red-500/10 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-red-400 font-medium">Full Voltage (230V/400V)</span>
                    <CircleDot className="w-4 h-4 text-red-400" />
                  </div>
                  <p className="text-sm">Circuit is LIVE. Isolation has failed or wrong circuit isolated. Stop - do not proceed. Reverify isolation points.</p>
                </div>

                <div className="bg-blue-500/10 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-blue-400 font-medium">Fluctuating Reading</span>
                    <CircleDot className="w-4 h-4 text-blue-400" />
                  </div>
                  <p className="text-sm">May indicate: loose connection, intermittent supply, or induced EMF. Treat as potentially live until explained.</p>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-3">Common Causes of Unexpected Voltage</h4>
              <ul className="space-y-2 text-sm">
                <li>• <strong>Induced voltage:</strong> Cables running parallel to energised circuits can have voltage induced</li>
                <li>• <strong>Capacitive charge:</strong> Long cables or capacitors can hold charge after isolation</li>
                <li>• <strong>Borrowed neutral:</strong> Shared neutral carrying current from other circuits</li>
                <li>• <strong>Backfeed:</strong> Alternative supply (UPS, generator, PV, batteries)</li>
                <li>• <strong>Wrong circuit:</strong> Incorrect circuit identification at isolation point</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 06: Documentation Requirements */}
        <section className="mb-8">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            <h2 className="text-xl font-semibold">Documentation Requirements</h2>
          </div>

          <div className="space-y-4 text-white">
            <p>
              Proper documentation of proving dead provides evidence of safe working practices and helps with any subsequent investigation or audit of procedures.
            </p>

            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-elec-yellow" />
                What to Record
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Date, time, and location of testing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Circuit/equipment identification</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Voltage indicator make, model, and serial number</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Proving unit confirmation (before and after)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Test results (all conductor combinations)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Name and signature of person conducting test</span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-blue-400 font-semibold mb-1">Good Practice</h4>
                  <p className="text-sm">
                    Take a timestamped photo showing your voltage indicator on the proving unit (proving step) and at the test point (showing 0V). This provides clear visual evidence of the prove-test-prove sequence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Check 3 */}
        <div className="mb-8">
          <InlineCheck
            question="If your voltage indicator fails the second prove (doesn't respond to proving unit after testing the circuit), what should you do?"
            correctAnswer="Do NOT trust the test result - the indicator may have failed during testing. Repeat the entire sequence with a different, verified instrument"
            explanation="The second prove confirms the instrument was working during the circuit test. Failure means you cannot trust the 'dead' reading - it may have been an instrument failure showing no voltage when there actually was voltage present."
          />
        </div>

        {/* FAQs */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {defined_faqs.map((faq, index) => (
              <div key={index} className="border border-border rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-2">{faq.question}</h4>
                <p className="text-sm text-white/90">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Reference Card */}
        <section className="mb-8">
          <UnitsPocketCard
            title="Proving Dead Quick Reference"
            items={[
              { term: "Prove-Test-Prove", definition: "Verify indicator - Test circuit - Verify indicator again" },
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
        <section className="mb-8">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Bottom Navigation */}
        <nav className="flex justify-between gap-4 pt-8 border-t border-border">
          <Link to="/study-centre/upskilling/inspection-testing/module-2/section-3" className="flex-1">
            <Button variant="ghost" className="w-full justify-start">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <Link to="/study-centre/upskilling/inspection-testing/module-2/section-5" className="flex-1">
            <Button className="w-full justify-end bg-elec-yellow hover:bg-elec-yellow/90 text-black">
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </nav>
      </main>
    </div>
  );
};

export default InspectionTestingModule2Section4;
