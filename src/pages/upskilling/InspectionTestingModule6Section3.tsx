import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Clock, Target, CheckCircle2, AlertTriangle, ChevronDown, Zap, TrendingUp, Activity, Gauge, Settings, Timer, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import useSEO from '@/hooks/useSEO';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import UnitsPocketCard from '@/components/apprentice-courses/UnitsPocketCard';

const InspectionTestingModule6Section3 = () => {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  useSEO({
    title: "RCD Ramp Testing | Module 6 Section 3 | Inspection & Testing",
    description: "Master RCD ramp testing techniques to determine actual trip current sensitivity and verify RCD performance meets BS 7671 requirements."
  });

  const learningOutcomes = [
    { icon: TrendingUp, text: "Understand the purpose and principles of ramp testing" },
    { icon: Activity, text: "Perform ramp tests using appropriate test equipment" },
    { icon: Gauge, text: "Interpret ramp test results and sensitivity ranges" },
    { icon: Settings, text: "Identify when ramp testing is required vs standard testing" },
    { icon: Timer, text: "Compare ramp testing with fixed current testing" },
    { icon: BarChart3, text: "Document ramp test results correctly" }
  ];

  const quizQuestions = [
    {
      question: "What does RCD ramp testing determine?",
      options: [
        "The disconnection time at rated residual current",
        "The actual residual current at which the RCD trips",
        "The maximum earth fault loop impedance",
        "The insulation resistance of the circuit"
      ],
      correctAnswer: 1,
      explanation: "Ramp testing gradually increases the residual current until the RCD trips, determining the actual trip current rather than just whether it trips within time at rated current."
    },
    {
      question: "For a 30mA RCD, what is the acceptable ramp test trip current range?",
      options: [
        "0 to 15mA",
        "15mA to 30mA",
        "30mA to 45mA",
        "30mA to 60mA"
      ],
      correctAnswer: 1,
      explanation: "A 30mA RCD must trip between 50% and 100% of its rated residual current (IΔn), so between 15mA and 30mA. This range confirms proper sensitivity."
    },
    {
      question: "What starting current is typically used for a ramp test?",
      options: [
        "100% of IΔn",
        "50% of IΔn",
        "Zero or very low current",
        "5 times IΔn"
      ],
      correctAnswer: 2,
      explanation: "Ramp testing starts from zero or very low current and gradually increases until the RCD trips. This determines the actual trip threshold."
    },
    {
      question: "Why might an RCD trip at a lower current than its rated IΔn?",
      options: [
        "The RCD is faulty and should be replaced",
        "This is normal - RCDs can trip from 50% to 100% of IΔn",
        "The test equipment is not calibrated correctly",
        "There is excessive standing leakage on the circuit"
      ],
      correctAnswer: 1,
      explanation: "BS EN 61008 and 61009 require RCDs to trip at any current between 50% and 100% of rated IΔn. Tripping at lower values within this range is normal and expected."
    },
    {
      question: "What does ramp testing reveal that standard trip time testing does not?",
      options: [
        "Whether the RCD will trip at 5×IΔn",
        "The actual sensitivity/trip threshold of the RCD",
        "The disconnection time at rated current",
        "The test button functionality"
      ],
      correctAnswer: 1,
      explanation: "Standard testing only confirms the RCD trips within time at rated current. Ramp testing reveals the actual trip threshold, showing how sensitive the RCD actually is."
    },
    {
      question: "If a 100mA RCD trips at 40mA during a ramp test, what is the conclusion?",
      options: [
        "The RCD is faulty - sensitivity too high",
        "The RCD passes - 40mA is between 50% and 100% of 100mA",
        "The RCD fails - should trip closer to 100mA",
        "Retest required - result is inconclusive"
      ],
      correctAnswer: 1,
      explanation: "40mA is between 50mA (50% of 100mA) and 100mA (100% of IΔn), so this is an acceptable trip current and the RCD passes the ramp test."
    },
    {
      question: "When is ramp testing particularly important?",
      options: [
        "On every circuit during EICR testing",
        "When assessing discrimination between series RCDs",
        "Only on new installations",
        "When the RCD test button doesn't work"
      ],
      correctAnswer: 1,
      explanation: "Ramp testing is particularly valuable when assessing discrimination (selectivity) between upstream and downstream RCDs to ensure correct sequential tripping."
    },
    {
      question: "What rate should the test current increase during a ramp test?",
      options: [
        "Instantaneously to rated current",
        "Very slowly - typically over 2 seconds or more",
        "Within 40ms",
        "As fast as possible"
      ],
      correctAnswer: 1,
      explanation: "Ramp testing uses a gradually increasing current, typically rising over 2 seconds or more, to accurately determine the actual trip threshold."
    },
    {
      question: "A 300mA RCD trips at 280mA during ramp testing. Is this acceptable?",
      options: [
        "No - should trip between 150mA and 200mA",
        "Yes - 280mA is between 150mA (50%) and 300mA (100%)",
        "No - should trip closer to 150mA for safety",
        "Yes - but only if trip time is under 40ms"
      ],
      correctAnswer: 1,
      explanation: "280mA is within the acceptable range of 150mA to 300mA (50% to 100% of rated 300mA IΔn), so the RCD passes the ramp test."
    },
    {
      question: "What should be recorded from a ramp test?",
      options: [
        "Only pass or fail",
        "The actual trip current in milliamps",
        "The time taken to reach trip current",
        "The number of test attempts"
      ],
      correctAnswer: 1,
      explanation: "The actual trip current (in mA) should be recorded from ramp testing. This provides valuable information about the RCD's actual sensitivity for future comparison."
    }
  ];

  const faqData = [
    {
      question: "What is the difference between ramp testing and standard RCD testing?",
      answer: "Standard RCD testing applies the full rated residual current (IΔn) and measures disconnection time. Ramp testing gradually increases current from zero until the RCD trips, revealing the actual trip threshold. Both tests serve different purposes - standard testing confirms trip time compliance, while ramp testing reveals actual sensitivity."
    },
    {
      question: "Is ramp testing mandatory for every RCD?",
      answer: "Ramp testing is not mandatory for every RCD test. However, it's valuable when assessing discrimination between series RCDs, investigating nuisance tripping, or when detailed knowledge of RCD sensitivity is required. Standard trip time testing is the primary requirement."
    },
    {
      question: "Why do RCDs have a 50% to 100% trip range?",
      answer: "This tolerance range accounts for manufacturing variations and ensures safety while preventing nuisance tripping. RCDs must trip before reaching rated current (100%) but are permitted to trip at any current from 50% upward. This ensures protection while allowing reasonable manufacturing tolerance."
    },
    {
      question: "Can ramp testing damage an RCD?",
      answer: "No, ramp testing does not damage RCDs when performed correctly with appropriate test equipment. The test uses the same fault currents the RCD is designed to detect and interrupt. However, excessive repeated testing over a short period should be avoided."
    },
    {
      question: "How does standing leakage affect ramp test results?",
      answer: "Standing earth leakage current on the circuit adds to the test current, potentially causing the RCD to trip at a lower applied test current than expected. For accurate results, either account for measured standing leakage or disconnect loads that contribute to leakage current."
    },
    {
      question: "What if the ramp test result is outside the 50-100% range?",
      answer: "If an RCD trips below 50% of IΔn, check for excessive standing leakage or consider if the RCD is oversensitive. If it doesn't trip until above 100% of IΔn, the RCD is faulty and must be replaced as it doesn't provide adequate protection."
    }
  ];

  const pocketCardUnits = [
    { name: "Ramp Test Range", symbol: "50-100%", unit: "of IΔn" },
    { name: "30mA RCD", symbol: "15-30", unit: "mA trip" },
    { name: "100mA RCD", symbol: "50-100", unit: "mA trip" },
    { name: "300mA RCD", symbol: "150-300", unit: "mA trip" },
    { name: "Ramp Duration", symbol: "≥2", unit: "seconds" },
    { name: "S-Type Delay", symbol: "130-500", unit: "ms" }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* iOS-style Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between px-4 h-14">
          <button
            onClick={() => navigate('/study-centre/apprentice/study/inspection-testing/module6')}
            className="flex items-center gap-2 text-cyan-400 active:opacity-70 transition-opacity touch-manipulation"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-base">Module 6</span>
          </button>
          <span className="text-white/60 text-sm">3 of 5</span>
        </div>
      </header>

      <main className="px-4 py-6 pb-safe max-w-2xl mx-auto">
        {/* Hero Section */}
        <section className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-500/20 rounded-full mb-4">
            <span className="text-cyan-400 text-sm font-medium">Module 6 • RCD Testing</span>
          </div>
          <h1 className="text-ios-title-large text-white font-bold mb-3">
            RCD Ramp Testing
          </h1>
          <p className="text-white/70 text-ios-body leading-relaxed">
            Determine the actual trip current sensitivity of RCDs through graduated current testing for complete performance verification.
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
                <span className="text-white/80 text-base">Ramp testing reveals the actual trip current, not just pass/fail at rated current</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                <span className="text-white/80 text-base">RCDs must trip between 50% and 100% of rated residual current (IΔn)</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                <span className="text-white/80 text-base">Essential for assessing discrimination between series-connected RCDs</span>
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
            <h2 className="text-xl font-semibold text-white">Understanding Ramp Testing</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                Ramp testing is an advanced RCD test method that gradually increases the applied residual current from zero until the RCD trips. Unlike standard testing which applies a fixed current and measures time, ramp testing reveals the actual current at which the RCD operates.
              </p>
              <p>
                This test provides valuable information about RCD sensitivity that standard trip time testing cannot reveal. It shows exactly where within the acceptable range the RCD trips, which is crucial for discrimination assessment and detecting degradation.
              </p>
              <div className="bg-white/5 rounded-xl p-4 border border-cyan-500/20">
                <h4 className="text-cyan-400 font-semibold mb-2">What Ramp Testing Reveals</h4>
                <ul className="space-y-2 text-white/70">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-1 text-cyan-400 shrink-0" />
                    <span>Actual trip threshold (not just pass/fail)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-1 text-cyan-400 shrink-0" />
                    <span>RCD sensitivity for discrimination purposes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-1 text-cyan-400 shrink-0" />
                    <span>Changes in RCD performance over time</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </section>

        {/* Content Section 02 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-cyan-400/30">02</span>
            <h2 className="text-xl font-semibold text-white">Acceptable Trip Current Ranges</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                BS EN 61008 and 61009 specify that RCDs must trip at any residual current between 50% and 100% of their rated residual current (IΔn). This means a properly functioning RCD can trip anywhere within this range:
              </p>
              <div className="space-y-3">
                <div className="bg-white/5 rounded-xl p-4 border border-cyan-500/20">
                  <h4 className="text-cyan-400 font-semibold mb-2">Trip Current Ranges</h4>
                  <div className="space-y-2 text-white/70">
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span>30mA RCD</span>
                      <span className="font-mono text-cyan-400">15mA - 30mA</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span>100mA RCD</span>
                      <span className="font-mono text-cyan-400">50mA - 100mA</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span>300mA RCD</span>
                      <span className="font-mono text-cyan-400">150mA - 300mA</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span>500mA RCD</span>
                      <span className="font-mono text-cyan-400">250mA - 500mA</span>
                    </div>
                  </div>
                </div>
              </div>
              <p>
                An RCD tripping at any current within its range is functioning correctly. The wide tolerance accounts for manufacturing variations whilst ensuring protection is provided before fault current reaches the rated value.
              </p>
            </div>
          </Card>
        </section>

        {/* InlineCheck */}
        <div className="mb-8">
          <InlineCheck
            question="A 30mA RCD trips at 22mA during ramp testing. Is this acceptable?"
            answer="Yes, this is acceptable. 22mA falls within the required range of 15mA (50%) to 30mA (100%) of the rated 30mA IΔn."
            color="cyan"
          />
        </div>

        {/* Content Section 03 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-cyan-400/30">03</span>
            <h2 className="text-xl font-semibold text-white">Performing Ramp Tests</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                Modern multifunction installation testers include ramp test functionality. The test is performed similarly to standard RCD testing but with specific settings:
              </p>
              <div className="space-y-4">
                <div className="bg-white/5 rounded-xl p-4">
                  <h4 className="text-cyan-400 font-semibold mb-3">Ramp Test Procedure</h4>
                  <ol className="space-y-3 text-white/70">
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-sm flex items-center justify-center shrink-0">1</span>
                      <span>Select ramp test mode on the tester</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-sm flex items-center justify-center shrink-0">2</span>
                      <span>Set the correct RCD rating (IΔn) on the instrument</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-sm flex items-center justify-center shrink-0">3</span>
                      <span>Connect test leads (L-PE for single-phase)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-sm flex items-center justify-center shrink-0">4</span>
                      <span>Initiate test - current rises gradually from zero</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-sm flex items-center justify-center shrink-0">5</span>
                      <span>Instrument displays actual trip current when RCD operates</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-sm flex items-center justify-center shrink-0">6</span>
                      <span>Verify result is between 50% and 100% of IΔn</span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Content Section 04 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-cyan-400/30">04</span>
            <h2 className="text-xl font-semibold text-white">Ramp vs Standard Testing</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                Both test methods serve different purposes and provide different information. Understanding when to use each is essential for comprehensive RCD verification.
              </p>
              <div className="grid gap-3">
                <div className="bg-white/5 rounded-xl p-4 border border-cyan-500/20">
                  <h4 className="text-cyan-400 font-semibold mb-2">Standard Trip Time Testing</h4>
                  <ul className="space-y-1 text-white/70 text-sm">
                    <li>• Applies fixed current (1×IΔn or 5×IΔn)</li>
                    <li>• Measures disconnection time</li>
                    <li>• Required for compliance testing</li>
                    <li>• Confirms RCD meets BS 7671 time requirements</li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-cyan-500/20">
                  <h4 className="text-cyan-400 font-semibold mb-2">Ramp Testing</h4>
                  <ul className="space-y-1 text-white/70 text-sm">
                    <li>• Gradually increases current from zero</li>
                    <li>• Measures actual trip threshold</li>
                    <li>• Valuable for discrimination assessment</li>
                    <li>• Reveals RCD sensitivity characteristics</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* InlineCheck */}
        <div className="mb-8">
          <InlineCheck
            question="Why is ramp testing particularly useful when multiple RCDs are installed in series?"
            answer="Ramp testing reveals the actual trip sensitivity of each RCD, allowing verification that upstream RCDs have higher trip thresholds than downstream ones, ensuring correct discrimination (selectivity)."
            color="cyan"
          />
        </div>

        {/* Content Section 05 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-cyan-400/30">05</span>
            <h2 className="text-xl font-semibold text-white">Effects of Standing Leakage</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                Standing earth leakage current from connected equipment can significantly affect ramp test results. This leakage adds to the test current, making the RCD appear more sensitive than it actually is.
              </p>
              <div className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-amber-400 font-semibold mb-2">Accounting for Standing Leakage</h4>
                    <ul className="space-y-2 text-white/70 text-sm">
                      <li>• Measure standing leakage with clamp meter before testing</li>
                      <li>• Add standing leakage to instrument reading for true trip current</li>
                      <li>• Consider disconnecting loads for accurate sensitivity measurement</li>
                      <li>• High leakage may cause nuisance tripping on sensitive circuits</li>
                    </ul>
                  </div>
                </div>
              </div>
              <p>
                For example, if standing leakage is 8mA and a 30mA RCD trips at 14mA applied test current, the actual trip current is 14mA + 8mA = 22mA, which is within the acceptable 15-30mA range.
              </p>
            </div>
          </Card>
        </section>

        {/* Content Section 06 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-cyan-400/30">06</span>
            <h2 className="text-xl font-semibold text-white">Recording Ramp Test Results</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                Unlike standard testing which is recorded as a simple pass/fail with trip time, ramp test results should include the actual trip current measured. This provides baseline data for future comparisons.
              </p>
              <div className="bg-white/5 rounded-xl p-4 border border-cyan-500/20">
                <h4 className="text-cyan-400 font-semibold mb-3">Documentation Requirements</h4>
                <ul className="space-y-2 text-white/70">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-cyan-400 shrink-0" />
                    <span>Actual trip current (mA) - not just pass/fail</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-cyan-400 shrink-0" />
                    <span>RCD rating tested against (IΔn)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-cyan-400 shrink-0" />
                    <span>Standing leakage if measured</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-cyan-400 shrink-0" />
                    <span>Location and circuit reference</span>
                  </li>
                </ul>
              </div>
              <p>
                Recording actual values allows comparison during future periodic inspections to identify any degradation in RCD sensitivity over time.
              </p>
            </div>
          </Card>
        </section>

        {/* InlineCheck */}
        <div className="mb-8">
          <InlineCheck
            question="What advantage does recording actual ramp test values provide over recording just pass/fail?"
            answer="Recording actual values creates a baseline for comparison during future inspections, allowing detection of sensitivity changes or degradation that might not yet cause a fail but indicate developing problems."
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
                  <h4 className="text-white font-medium mb-1">Test Both Directions</h4>
                  <p className="text-white/60 text-sm">Test on both positive and negative half-cycles for comprehensive RCD assessment</p>
                </div>
              </div>
            </Card>
            <Card variant="ios" className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Compare Multiple Tests</h4>
                  <p className="text-white/60 text-sm">Repeat tests to confirm consistency - significant variation may indicate issues</p>
                </div>
              </div>
            </Card>
            <Card variant="ios" className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Check Calibration</h4>
                  <p className="text-white/60 text-sm">Ensure test instrument is within calibration date for accurate readings</p>
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
            title="Ramp Testing Quick Reference"
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
          <Button
            variant="ios-primary"
            size="lg"
            className="w-full touch-target"
            onClick={() => navigate('/study-centre/apprentice/study/inspection-testing/module6/section4')}
          >
            Continue to Section 4
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
          <Button
            variant="ios-secondary"
            size="lg"
            className="w-full touch-target"
            onClick={() => navigate('/study-centre/apprentice/study/inspection-testing/module6')}
          >
            Back to Module 6
          </Button>
        </nav>
      </main>
    </div>
  );
};

export default InspectionTestingModule6Section3;
