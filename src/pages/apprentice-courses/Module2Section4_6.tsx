import { ArrowLeft, Zap, CheckCircle, AlertTriangle, Shield, TestTube, Battery } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Safety Considerations & Testing Differences - Level 2 Module 2 Section 4.6";
const DESCRIPTION = "Learn the safety considerations and testing differences between AC and DC electrical systems - isolation, instruments, and procedures.";

const quickCheckQuestions = [
  {
    id: "dc-arcing",
    question: "Which statement about DC shock and arcing is true?",
    options: [
      "DC cannot cause shock",
      "DC may sustain arcs more readily than AC",
      "AC always has higher risk",
      "Arc risk is identical for AC and DC"
    ],
    correctIndex: 1,
    explanation: "DC can sustain arcs; take care with isolation and breaking load on DC systems."
  },
  {
    id: "insulation-testing",
    question: "Insulation resistance (LV circuits) is commonly tested using:",
    options: [
      "A VFD",
      "An insulation tester at defined DC voltage",
      "An RCD",
      "A loop tester only"
    ],
    correctIndex: 1,
    explanation: "IR tests use DC test voltages per BS 7671/Guidance Note 3."
  },
  {
    id: "loop-impedance",
    question: "Which instrument measures loop impedance on AC systems?",
    options: [
      "RCD ramp tester",
      "Earth fault loop impedance (Zs) tester",
      "Insulation tester",
      "Clamp meter only"
    ],
    correctIndex: 1,
    explanation: "Zs testers assess fault disconnection times on AC circuits."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which statement about DC shock and arcing is true?",
    options: [
      "DC cannot cause shock",
      "DC may sustain arcs more readily than AC",
      "AC always has higher risk",
      "Arc risk is identical for AC and DC",
    ],
    correctAnswer: 1,
    explanation: "DC can sustain arcs; take care with isolation and breaking load on DC systems.",
  },
  {
    id: 2,
    question: "Insulation resistance (LV circuits) is commonly tested using:",
    options: ["A VFD", "An insulation tester at defined DC voltage", "An RCD", "A loop tester only"],
    correctAnswer: 1,
    explanation: "IR tests use DC test voltages per BS 7671/Guidance Note 3.",
  },
  {
    id: 3,
    question: "Which instrument measures loop impedance on AC systems?",
    options: ["RCD ramp tester", "Earth fault loop impedance (Zs) tester", "Insulation tester", "Clamp meter only"],
    correctAnswer: 1,
    explanation: "Zs testers assess fault disconnection times on AC circuits.",
  },
  {
    id: 4,
    question: "Before testing, you should always:",
    options: ["Skip risk assessment", "Test on live circuits first", "Verify instrument CAT rating and prove on a known source", "Remove all labels"],
    correctAnswer: 2,
    explanation: "Check CAT rating, condition and prove before and after per safe systems of work.",
  },
  {
    id: 5,
    question: "RCDs are intended to operate on:",
    options: ["Pure DC only", "AC residual currents (and some types handle DC components)", "Thermal overload", "Magnetic fields only"],
    correctAnswer: 1,
    explanation: "Type AC/A/F/B classifications define their sensitivity to AC and DC components.",
  },
  {
    id: 6,
    question: "Polarity testing confirms:",
    options: ["Frequency is exactly 50 Hz", "Correct conductor connections (L/N/PE)", "Transformer kVA", "Cable size"],
    correctAnswer: 1,
    explanation: "Polarity verifies correct termination of line, neutral and protective conductors.",
  },
  {
    id: 7,
    question: "For PV strings, special consideration includes:",
    options: ["Testing live without protection", "High DC voltages and arc hazards", "Only AC testing needed", "No labelling required"],
    correctAnswer: 1,
    explanation: "PV DC strings can be high voltage; follow 712 and manufacturer procedures.",
  },
  {
    id: 8,
    question: "Loop impedance testing primarily applies to:",
    options: ["AC fault paths for ADS", "DC ELV only", "Lighting only", "Data networks"],
    correctAnswer: 0,
    explanation: "Zs/Ze testing assesses AC fault loop to ensure disconnection within required times.",
  },
  {
    id: 9,
    question: "What CAT rating should instruments have for most electrical installation work?",
    options: ["CAT I only", "CAT II for all work", "CAT III for distribution boards and fixed equipment", "CAT ratings don't matter"],
    correctAnswer: 2,
    explanation: "CAT III instruments are required for distribution boards and fixed equipment installations. CAT IV may be needed for supply-side work.",
  },
  {
    id: 10,
    question: "When testing insulation resistance on circuits with electronic equipment, you should:",
    options: [
      "Always test with equipment connected",
      "Only test at maximum voltage",
      "Disconnect sensitive electronics as per manufacturer guidance",
      "Never test circuits with electronics"
    ],
    correctAnswer: 2,
    explanation: "Sensitive electronics should be disconnected before IR testing to prevent damage, following manufacturer instructions for safe disconnection procedures.",
  }
];

const faqs = [
  {
    question: "Why is DC considered more dangerous for arcing?",
    answer: "DC current doesn't naturally reduce to zero like AC does (which happens 100 times per second at 50Hz). This means DC arcs can be sustained more easily, making it harder to extinguish them when breaking circuits under load."
  },
  {
    question: "Can I use AC instruments on DC systems?",
    answer: "Generally no - instruments are designed for specific current types. AC instruments may not read correctly on DC systems and vice versa. Always check the instrument's specifications and use CAT-rated instruments appropriate for the system."
  },
  {
    question: "Do RCDs work on DC systems?",
    answer: "Standard Type AC RCDs only work on pure AC systems. For systems with DC components (like VFDs, EV chargers), you need Type A, F, or B RCDs depending on the application. Check BS 7671 and manufacturer requirements."
  },
  {
    question: "What's different about testing PV systems?",
    answer: "PV systems can have high DC voltages (up to 1000V or more) and are always live during daylight. Special isolation procedures, DC-rated instruments, and safety precautions are essential. Follow BS 7671 Section 712 and manufacturer guidance."
  },
  {
    question: "How do I prove dead on DC systems?",
    answer: "Use a suitable DC voltage indicator or multimeter rated for the system voltage. Always prove the instrument on a known live source before and after testing. Consider that some DC systems may have multiple sources (PV, battery, mains-derived)."
  },
  {
    question: "What about loop impedance testing on DC systems?",
    answer: "Traditional AC loop impedance testing doesn't apply to DC systems. Instead, follow manufacturer data for fault current calculations and protective device selection. Some DC systems may require specialist testing equipment."
  }
];

const Module2Section4_6 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2.4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 2.4.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Safety Considerations & Testing Differences
          </h1>
          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
            Learn safety and testing differences between AC and DC electrical systems
          </p>
        </header>

        {/* Summary Box */}
        <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
          <p className="text-sm text-white/80 leading-relaxed">
            <strong className="text-elec-yellow">Key Points:</strong> Safe isolation requires lock-off and prove dead (before/after) with a proving unit.
            DC hazards include sustained arcing - use DC-rated switching and PPE. Select correct CAT rating for instruments and appropriate RCD type (AC/A/F/B) where DC components exist.
          </p>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Learning Outcomes
          </h2>
          <p className="text-white/70 mb-4">By the end of this section, you'll be able to:</p>
          <ul className="space-y-3 text-white/80">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Plan safe isolation and proving dead for AC and DC systems</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Select the right instruments and CAT ratings for testing</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Understand when RCD, loop, IR and continuity tests apply</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Apply BS 7671/GN3 guidance to special installations (PV/EV/BESS)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Recognise the increased arc hazards associated with DC systems</span>
            </li>
          </ul>
        </section>

        {/* Section 2: Safety Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Safety Fundamentals for AC and DC Systems
          </h2>
          <div className="space-y-4 text-white/80">
            <p>
              Safety procedures must be adapted for different current types. DC systems present unique challenges
              due to their ability to sustain arcs and the presence of multiple sources in modern installations.
            </p>

            <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <p className="text-elec-yellow">
                  <strong>Universal Rule:</strong> Always isolate, lock‑off, tag and prove dead before starting work.
                  Use a proving unit and prove before/after testing.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-elec-yellow">Key Safety Differences</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li><strong>DC Arc Hazards:</strong> DC may sustain arcs more readily than AC - use DC‑rated switches, fuses and breakers</li>
                <li><strong>Multiple Sources:</strong> PV, battery, mains - each needs separate isolation and clear labelling</li>
                <li><strong>Instrument Rating:</strong> Confirm CAT III/IV rating appropriate for voltage/current ranges</li>
                <li><strong>PPE Selection:</strong> Use PPE suitable for the arc risk, especially on DC and battery systems</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="mb-10">
          <InlineCheck {...quickCheckQuestions[0]} />
        </div>

        {/* Section 3: Testing Differences */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Testing Differences Between AC and DC
          </h2>
          <div className="space-y-4 text-white/80">
            <p>
              Different test methods and instruments are required for AC and DC systems.
              Understanding these differences is crucial for proper installation verification.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-bold text-elec-yellow">Tests for Both AC & DC</h4>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li><strong>Continuity:</strong> Applies to both - ensure correct conductor connections</li>
                  <li><strong>Polarity:</strong> L/N/PE for AC, +/−/PE for DC systems</li>
                  <li><strong>Insulation Resistance:</strong> Uses DC test set at defined voltages</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-elec-yellow">AC-Specific Tests</h4>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li><strong>Loop Impedance (Zs/Ze):</strong> For AC ADS disconnection calculations</li>
                  <li><strong>RCD Testing:</strong> AC systems with correct type selection (AC/A/F/B)</li>
                  <li><strong>Phase Sequence:</strong> Three-phase motor rotation</li>
                </ul>
              </div>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
              <p className="text-yellow-300">
                <strong>Important:</strong> For DC systems, traditional loop impedance testing doesn't apply.
                Instead, use manufacturer data for fault current paths and protective device selection.
              </p>
            </div>
          </div>
        </section>

        <div className="mb-10">
          <InlineCheck {...quickCheckQuestions[1]} />
        </div>

        {/* Section 4: Instrument Selection */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Instrument Selection and CAT Ratings
          </h2>
          <div className="space-y-4 text-white/80">
            <p>
              Choosing the correct instruments with appropriate safety ratings is essential for safe testing.
              Different systems require different instrument capabilities and safety categories.
            </p>

            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-elec-yellow">Essential Test Instruments</h4>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li><strong>Insulation Tester:</strong> Selectable DC test voltages (250/500/1000V as specified)</li>
                  <li><strong>Loop Tester:</strong> Suitable for system type and prospective fault current ranges</li>
                  <li><strong>RCD/RCBO Tester:</strong> Compatible with device type (AC/A/F/B)</li>
                  <li><strong>DC Clamp Meter:</strong> For battery, PV and control circuits where needed</li>
                  <li><strong>Proving Unit:</strong> To verify voltage indicators before and after use</li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h4 className="font-semibold text-elec-yellow mb-2">CAT Rating Guide</h4>
                <ul className="list-disc pl-4 space-y-1 text-sm text-white/70">
                  <li><strong>CAT III:</strong> Distribution boards, fixed equipment - most electrical work</li>
                  <li><strong>CAT IV:</strong> Supply side, meters, primary equipment - higher energy systems</li>
                  <li><strong>Voltage Rating:</strong> Must exceed maximum system voltage (e.g. 1000V for PV)</li>
                  <li><strong>Current Rating:</strong> Appropriate for expected measurements</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <div className="mb-10">
          <InlineCheck {...quickCheckQuestions[2]} />
        </div>

        {/* Section 5: Special Installation Considerations */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Special Installation Considerations
          </h2>
          <div className="space-y-4 text-white/80">
            <p>
              Modern installations often include special systems covered by BS 7671 Part 7.
              These require additional safety measures and testing procedures.
            </p>

            <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h4 className="font-semibold text-elec-yellow mb-2">PV Systems (712)</h4>
                <ul className="list-disc pl-4 space-y-1 text-sm text-white/70">
                  <li>High DC voltages (up to 1000V+)</li>
                  <li>Always live during daylight</li>
                  <li>DC isolation required</li>
                  <li>Special labelling and warnings</li>
                </ul>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h4 className="font-semibold text-elec-yellow mb-2">EV Charging (722)</h4>
                <ul className="list-disc pl-4 space-y-1 text-sm text-white/70">
                  <li>DC residual components possible</li>
                  <li>RCD type selection critical</li>
                  <li>High power DC charging</li>
                  <li>Emergency isolation requirements</li>
                </ul>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h4 className="font-semibold text-elec-yellow mb-2">Battery Storage</h4>
                <ul className="list-disc pl-4 space-y-1 text-sm text-white/70">
                  <li>High prospective DC currents</li>
                  <li>Multiple energy sources</li>
                  <li>Ventilation requirements</li>
                  <li>Segregation from LV systems</li>
                </ul>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <p className="text-elec-yellow">
                  <strong>Remember:</strong> Always follow BS 7671 Part 7 requirements and manufacturer
                  instructions for special installations. When in doubt, seek specialist advice.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Practical Guidance for Apprentices
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Testing Procedures</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h4 className="font-semibold text-elec-yellow mb-2">Before Testing</h4>
                  <ul className="list-disc pl-4 space-y-1 text-sm text-white/70">
                    <li>Check instrument calibration dates and condition</li>
                    <li>Verify CAT rating suitable for the system</li>
                    <li>Prove instruments on known live source</li>
                    <li>Review manufacturer disconnection requirements</li>
                  </ul>
                </div>
                <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-elec-yellow mb-2">During Testing</h4>
                  <ul className="list-disc pl-4 space-y-1 text-sm text-elec-yellow/80">
                    <li>Follow safe isolation procedures throughout</li>
                    <li>Disconnect sensitive electronics for IR tests</li>
                    <li>Record all results and compare with design values</li>
                    <li>Re-prove instruments after completion</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Common Mistakes to Avoid</h3>
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <ul className="list-disc pl-4 space-y-2 text-sm text-white/70">
                  <li><strong>Wrong instrument type:</strong> Using AC instruments on DC systems or vice versa</li>
                  <li><strong>Inadequate CAT rating:</strong> Using instruments not rated for the system voltage</li>
                  <li><strong>Skipping proving:</strong> Not proving instruments dead before and after testing</li>
                  <li><strong>Damaging electronics:</strong> IR testing live electronics without disconnection</li>
                  <li><strong>Poor documentation:</strong> Not recording serial numbers, cal dates, or results properly</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Building Your Expertise</h3>
              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <ul className="list-disc pl-4 space-y-2 text-sm text-elec-yellow/80">
                  <li><strong>Learn BS 7671 Part 6:</strong> Testing requirements and acceptable values</li>
                  <li><strong>Study Guidance Note 3:</strong> Detailed testing procedures and safety</li>
                  <li><strong>Practice with instruments:</strong> Become familiar with different test equipment</li>
                  <li><strong>Understand limitations:</strong> Know when specialist equipment or advice is needed</li>
                  <li><strong>Stay updated:</strong> New technologies require new testing approaches</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Frequently Asked Questions
          </h2>
          <div className="divide-y divide-white/10">
            {faqs.map((faq, index) => (
              <div key={index} className="py-4 first:pt-0 last:pb-0">
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pocket Guide */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
            AC/DC Safety & Testing Pocket Guide
          </h2>
          <p className="text-sm text-white/70 mb-4">
            Essential safety and testing reference for AC/DC electrical systems
          </p>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-sm">
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                <h4 className="font-semibold text-elec-yellow mb-2 flex items-center gap-2">
                  <TestTube className="w-4 h-4" />
                  AC System Tests
                </h4>
                <ul className="space-y-1 text-white/70 text-xs">
                  <li>• Continuity (L/N/PE connections)</li>
                  <li>• Insulation resistance (DC test set)</li>
                  <li>• Loop impedance (Zs/Ze) for ADS</li>
                  <li>• RCD/RCBO testing (correct type)</li>
                  <li>• Phase sequence (3φ motors)</li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                <h4 className="font-semibold text-elec-yellow mb-2 flex items-center gap-2">
                  <Battery className="w-4 h-4" />
                  DC System Tests
                </h4>
                <ul className="space-y-1 text-white/70 text-xs">
                  <li>• Continuity (+/−/PE connections)</li>
                  <li>• Insulation resistance (specified voltage)</li>
                  <li>• No direct Zs testing applicable</li>
                  <li>• Follow Part 7 special procedures</li>
                  <li>• Use manufacturer fault data</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-3 rounded-lg">
                <h4 className="font-semibold text-elec-yellow mb-2">Safety Priorities</h4>
                <ul className="space-y-1 text-elec-yellow/80 text-xs">
                  <li>• <strong>Isolate:</strong> Lock-off all sources</li>
                  <li>• <strong>Prove dead:</strong> Before & after with proving unit</li>
                  <li>• <strong>CAT rating:</strong> III/IV for voltage range</li>
                  <li>• <strong>DC arcs:</strong> Use DC-rated switching</li>
                  <li>• <strong>Label:</strong> Multiple sources clearly</li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                <h4 className="font-semibold text-elec-yellow mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Special Systems
                </h4>
                <ul className="space-y-1 text-white/70 text-xs">
                  <li>• <strong>PV (712):</strong> High DC volts, always live</li>
                  <li>• <strong>EV (722):</strong> DC components, RCD type</li>
                  <li>• <strong>BESS:</strong> High current, ventilation</li>
                  <li>• <strong>UPS:</strong> Multiple sources, isolation</li>
                  <li>• <strong>VFD:</strong> Harmonics, disconnect for IR</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="grid grid-cols-4 gap-4 text-xs">
              <div className="text-center">
                <p className="font-semibold text-white">RCD Types</p>
                <p className="text-white/70">AC/A/F/B for DC components</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-white">CAT Ratings</p>
                <p className="text-white/70">III/IV for system voltage</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-white">IR Test Volts</p>
                <p className="text-white/70">250/500/1000V DC</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-white">Arc Hazard</p>
                <p className="text-white/70">DC higher risk</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge: Safety and Testing Differences"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../4-5"><ArrowLeft className="w-4 h-4 mr-2" />Previous</Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[44px] bg-elec-yellow text-[#1a1a1a] touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../5-1">Next<ArrowLeft className="w-4 h-4 ml-2 rotate-180" /></Link>
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default Module2Section4_6;
