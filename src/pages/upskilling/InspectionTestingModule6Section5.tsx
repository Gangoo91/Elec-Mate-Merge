import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Clock, Target, CheckCircle2, AlertTriangle, ChevronDown, Zap, Layers, Timer, Network, ArrowDownUp, Shield, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import useSEO from '@/hooks/useSEO';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import UnitsPocketCard from '@/components/apprentice-courses/UnitsPocketCard';

const InspectionTestingModule6Section5 = () => {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  useSEO({
    title: "Discriminating & Selective RCDs | Module 6 Section 5 | Inspection & Testing",
    description: "Master RCD discrimination and selectivity to ensure correct sequential tripping and maintain supply to unaffected circuits during fault conditions."
  });

  const learningOutcomes = [
    { icon: Layers, text: "Understand discrimination between series-connected RCDs" },
    { icon: Timer, text: "Explain time-delayed (S-type) RCD characteristics" },
    { icon: Network, text: "Design selective RCD protection schemes" },
    { icon: ArrowDownUp, text: "Calculate discrimination requirements" },
    { icon: Shield, text: "Verify selectivity through testing" },
    { icon: Award, text: "Apply discrimination in practical installations" }
  ];

  const quizQuestions = [
    {
      question: "What is meant by 'discrimination' or 'selectivity' between RCDs?",
      options: [
        "The ability to detect different types of faults",
        "Ensuring only the RCD nearest the fault trips, not upstream RCDs",
        "The difference between 30mA and 100mA rated RCDs",
        "The time taken for an RCD to reset after tripping"
      ],
      correctAnswer: 1,
      explanation: "Discrimination (selectivity) means the RCD nearest the fault trips while upstream RCDs remain closed, maintaining supply to unaffected circuits."
    },
    {
      question: "What does the 'S' in an S-type RCD stand for?",
      options: [
        "Standard",
        "Selective (time-delayed)",
        "Single-phase",
        "Surge-protected"
      ],
      correctAnswer: 1,
      explanation: "S-type (Selective) RCDs have an intentional time delay to allow downstream general-type RCDs to trip first, achieving discrimination."
    },
    {
      question: "What is the minimum trip delay for an S-type RCD at 1×IΔn?",
      options: [
        "40ms",
        "130ms",
        "300ms",
        "500ms"
      ],
      correctAnswer: 1,
      explanation: "S-type RCDs have a minimum delay of 130ms at rated residual current. They must still trip within 500ms at 1×IΔn and 200ms at 5×IΔn."
    },
    {
      question: "For discrimination to work between two RCDs in series, what should their IΔn ratings be?",
      options: [
        "Both the same rating",
        "Upstream should be lower than downstream",
        "Upstream should be at least 3× the downstream rating",
        "Rating doesn't matter if time discrimination is used"
      ],
      correctAnswer: 2,
      explanation: "For current discrimination, the upstream RCD should typically be at least 3× the rating of the downstream RCD. This can be combined with time delay for better discrimination."
    },
    {
      question: "A 30mA general RCD and 100mA S-type RCD are installed in series. Which should be upstream?",
      options: [
        "30mA general RCD upstream",
        "100mA S-type RCD upstream",
        "Either can be upstream",
        "They should not be installed in series"
      ],
      correctAnswer: 1,
      explanation: "The 100mA S-type should be upstream. Its higher rating and time delay allow the 30mA general RCD to trip first for faults on its circuit while maintaining supply to other circuits."
    },
    {
      question: "What is the maximum trip time for an S-type RCD at 5×IΔn?",
      options: [
        "40ms",
        "150ms",
        "200ms",
        "500ms"
      ],
      correctAnswer: 2,
      explanation: "S-type RCDs must trip within 200ms at 5×IΔn (compared to 40ms for general-type RCDs), allowing time for downstream devices to operate first."
    },
    {
      question: "In a domestic installation with an RCBO board, how is discrimination typically achieved?",
      options: [
        "All RCBOs trip simultaneously",
        "The incomer RCD is S-type, individual RCBOs are general-type",
        "No discrimination is possible with RCBO boards",
        "Higher rated RCBOs trip first"
      ],
      correctAnswer: 1,
      explanation: "An upstream S-type RCD (100mA or 300mA) at the incomer combined with general-type 30mA RCBOs provides discrimination - the RCBO trips first, the incomer remains closed."
    },
    {
      question: "What test confirms discrimination between series-connected RCDs?",
      options: [
        "Insulation resistance test",
        "Ramp testing to determine actual trip thresholds",
        "Earth electrode resistance test",
        "Prospective fault current test"
      ],
      correctAnswer: 1,
      explanation: "Ramp testing reveals the actual trip current of each RCD, confirming the downstream RCD will trip before the upstream device reaches its trip threshold."
    },
    {
      question: "Why might nuisance tripping occur if discrimination fails?",
      options: [
        "The fault current is too low",
        "The upstream RCD trips, disconnecting all circuits instead of just the faulty one",
        "The downstream RCD trips too slowly",
        "Earth leakage is cumulative"
      ],
      correctAnswer: 1,
      explanation: "Without discrimination, the upstream RCD may trip first, disconnecting all circuits including healthy ones - causing inconvenience and potential safety issues."
    },
    {
      question: "For an S-type RCD at 1×IΔn, what is the trip time window?",
      options: [
        "0 to 300ms",
        "130ms to 500ms",
        "40ms to 200ms",
        "0 to 40ms"
      ],
      correctAnswer: 1,
      explanation: "S-type RCDs have a trip time window of 130ms (minimum delay) to 500ms (maximum) at 1×IΔn, allowing time for downstream general-type RCDs to operate first."
    }
  ];

  const faqData = [
    {
      question: "Can two 30mA RCDs be installed in series?",
      answer: "Yes, but discrimination may not be achievable without time delay. If an upstream 30mA S-type and downstream 30mA general-type are used, the time delay provides some discrimination. However, for better selectivity, the upstream should have a higher rating (e.g., 100mA S-type upstream, 30mA general downstream)."
    },
    {
      question: "What happens if discrimination doesn't work?",
      answer: "Without discrimination, a fault on one circuit may trip the upstream RCD, disconnecting all circuits protected by that device. This causes unnecessary disruption to unaffected circuits and can create safety issues if essential equipment (like emergency lighting) loses power."
    },
    {
      question: "Why is time-delayed discrimination important in commercial installations?",
      answer: "Commercial installations often have critical loads that must remain operational during faults on other circuits. Time-delayed upstream RCDs ensure only the faulty circuit loses power while maintaining supply to essential services like servers, refrigeration, or emergency systems."
    },
    {
      question: "Can RCBOs provide discrimination?",
      answer: "Individual RCBOs don't provide discrimination between each other as they typically have the same rating and response time. Discrimination is achieved by having an S-type RCD upstream of general-type RCBOs, or by using RCBOs with different ratings where appropriate."
    },
    {
      question: "How do I verify discrimination has been achieved?",
      answer: "Ramp testing each RCD reveals actual trip thresholds. For discrimination, the downstream RCD's trip current must be below the upstream RCD's minimum sensitivity (50% of IΔn). Time discrimination can be verified by comparing trip times at test currents."
    },
    {
      question: "Are S-type RCDs suitable for personal protection circuits?",
      answer: "S-type RCDs are typically used upstream for discrimination, not for final circuits requiring personal protection. The time delay means they don't provide the rapid disconnection needed for personal protection (max 40ms at 5×IΔn) - general-type 30mA RCDs are required for this."
    }
  ];

  const pocketCardUnits = [
    { name: "S-Type Min Delay", symbol: "130", unit: "ms @ 1×IΔn" },
    { name: "S-Type Max Trip", symbol: "500", unit: "ms @ 1×IΔn" },
    { name: "S-Type @ 5×IΔn", symbol: "200", unit: "ms max" },
    { name: "Current Ratio", symbol: "3:1", unit: "upstream:down" },
    { name: "General @ 1×IΔn", symbol: "300", unit: "ms max" },
    { name: "General @ 5×IΔn", symbol: "40", unit: "ms max" }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* iOS-style Header */}
      <header className="sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between px-4 h-14">
          <button
            onClick={() => navigate('/study-centre/apprentice/study/inspection-testing/module6')}
            className="flex items-center gap-2 text-cyan-400 active:opacity-70 transition-opacity touch-manipulation"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-base">Module 6</span>
          </button>
          <span className="text-white/60 text-sm">5 of 5</span>
        </div>
      </header>

      <main className="px-4 py-6 pb-safe max-w-3xl mx-auto">
        {/* Hero Section */}
        <section className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-500/20 rounded-full mb-4">
            <span className="text-cyan-400 text-sm font-medium">Module 6 • RCD Testing</span>
          </div>
          <h1 className="text-ios-title-large text-white font-bold mb-3">
            Discriminating & Selective RCDs
          </h1>
          <p className="text-white/70 text-ios-body leading-relaxed">
            Ensure correct sequential operation of series-connected RCDs to maintain supply to unaffected circuits during fault conditions.
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
                <span className="text-white/80 text-base">Discrimination ensures only the RCD nearest the fault trips</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                <span className="text-white/80 text-base">S-type (time-delayed) RCDs trip between 130ms and 500ms at 1×IΔn</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                <span className="text-white/80 text-base">Combine current ratio (3:1) and time delay for best selectivity</span>
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
            <h2 className="text-xl font-semibold text-white">What is Discrimination?</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                Discrimination (also called selectivity) is the coordination of protective devices to ensure that only the device nearest to a fault operates, leaving upstream devices closed and maintaining supply to unaffected circuits.
              </p>
              <div className="bg-white/5 rounded-xl p-4 border border-cyan-500/20">
                <h4 className="text-cyan-400 font-semibold mb-3">Why Discrimination Matters</h4>
                <ul className="space-y-2 text-white/70">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-1 text-cyan-400 shrink-0" />
                    <span>Minimises disruption during fault conditions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-1 text-cyan-400 shrink-0" />
                    <span>Maintains supply to critical loads</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-1 text-cyan-400 shrink-0" />
                    <span>Aids fault location by indicating which circuit has the fault</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-1 text-cyan-400 shrink-0" />
                    <span>Prevents unnecessary tripping of healthy circuits</span>
                  </li>
                </ul>
              </div>
              <p>
                Without discrimination, a fault on a single socket outlet could trip the main RCD and disconnect the entire installation - an unacceptable situation in most modern installations.
              </p>
            </div>
          </Card>
        </section>

        {/* Content Section 02 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-cyan-400/30">02</span>
            <h2 className="text-xl font-semibold text-white">Methods of Achieving Discrimination</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                RCD discrimination can be achieved through two methods, ideally used in combination for optimum selectivity:
              </p>
              <div className="space-y-4">
                <div className="bg-white/5 rounded-xl p-4 border border-cyan-500/20">
                  <h4 className="text-cyan-400 font-semibold mb-2">1. Current Discrimination</h4>
                  <p className="text-white/70 text-sm mb-2">
                    The upstream RCD has a higher rated residual current (IΔn) than the downstream RCD.
                  </p>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <span className="text-cyan-400 font-mono">Upstream IΔn ≥ 3× Downstream IΔn</span>
                  </div>
                  <p className="text-white/60 text-xs mt-2">
                    Example: 100mA upstream, 30mA downstream
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-cyan-500/20">
                  <h4 className="text-cyan-400 font-semibold mb-2">2. Time Discrimination</h4>
                  <p className="text-white/70 text-sm mb-2">
                    The upstream RCD has an intentional time delay (S-type) allowing faster downstream devices to trip first.
                  </p>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <span className="text-cyan-400 font-mono">S-type delay: 130ms to 500ms</span>
                  </div>
                  <p className="text-white/60 text-xs mt-2">
                    The downstream general-type RCD trips within 300ms, before the S-type operates
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* InlineCheck */}
        <div className="mb-8">
          <InlineCheck
            question="A 30mA RCD protects a final circuit. What rating should an upstream discriminating RCD be?"
            answer="At least 100mA (3× the downstream rating). Using an S-type 100mA RCD upstream provides both current and time discrimination for optimal selectivity."
            color="cyan"
          />
        </div>

        {/* Content Section 03 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-cyan-400/30">03</span>
            <h2 className="text-xl font-semibold text-white">S-Type RCD Characteristics</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                S-type (Selective) RCDs are designed specifically for upstream installation in discriminating systems. They have an intentional time delay before tripping:
              </p>
              <div className="bg-white/5 rounded-xl p-4 border border-cyan-500/20">
                <h4 className="text-cyan-400 font-semibold mb-3">S-Type Trip Time Requirements</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/70">At 1×IΔn</span>
                    <span className="font-mono text-cyan-400">130ms - 500ms</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/70">At 2×IΔn</span>
                    <span className="font-mono text-cyan-400">60ms - 200ms</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/70">At 5×IΔn</span>
                    <span className="font-mono text-cyan-400">50ms - 150ms</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-white/70">At ½×IΔn</span>
                    <span className="font-mono text-cyan-400">No trip</span>
                  </div>
                </div>
              </div>
              <div className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-white/70 text-sm">
                    S-type RCDs are NOT suitable for additional protection (personal protection circuits) as they don't meet the 40ms requirement at 5×IΔn. Use general-type 30mA RCDs for final circuits.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Content Section 04 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-cyan-400/30">04</span>
            <h2 className="text-xl font-semibold text-white">Practical Discrimination Schemes</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                Common discrimination arrangements in UK installations:
              </p>
              <div className="space-y-4">
                <div className="bg-white/5 rounded-xl p-4 border border-cyan-500/20">
                  <h4 className="text-cyan-400 font-semibold mb-2">Domestic with Split-Load Board</h4>
                  <p className="text-white/60 text-sm">
                    100mA S-type at incomer → 30mA RCBOs for final circuits
                  </p>
                  <p className="text-green-400/80 text-xs mt-2">✓ Good discrimination</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-cyan-500/20">
                  <h4 className="text-cyan-400 font-semibold mb-2">Commercial Sub-Distribution</h4>
                  <p className="text-white/60 text-sm">
                    300mA S-type at sub-main → 100mA S-type at DB → 30mA general at final circuits
                  </p>
                  <p className="text-green-400/80 text-xs mt-2">✓ Three-stage discrimination</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-cyan-500/20">
                  <h4 className="text-cyan-400 font-semibold mb-2">Poor Practice to Avoid</h4>
                  <p className="text-white/60 text-sm">
                    30mA general at incomer → 30mA general at final circuits
                  </p>
                  <p className="text-red-400/80 text-xs mt-2">✗ No discrimination - both may trip</p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* InlineCheck */}
        <div className="mb-8">
          <InlineCheck
            question="Why shouldn't S-type RCDs be used for socket outlet circuits requiring additional protection?"
            answer="S-type RCDs have a minimum delay of 50ms at 5×IΔn, which doesn't meet the 40ms maximum required for additional protection. General-type 30mA RCDs must be used for circuits requiring additional protection."
            color="cyan"
          />
        </div>

        {/* Content Section 05 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-cyan-400/30">05</span>
            <h2 className="text-xl font-semibold text-white">Testing for Discrimination</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                To verify discrimination will work in practice, test both RCDs and compare their characteristics:
              </p>
              <div className="bg-white/5 rounded-xl p-4 border border-cyan-500/20">
                <h4 className="text-cyan-400 font-semibold mb-3">Verification Steps</h4>
                <ol className="space-y-3 text-white/70">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-sm flex items-center justify-center shrink-0">1</span>
                    <span>Ramp test downstream RCD - note trip current</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-sm flex items-center justify-center shrink-0">2</span>
                    <span>Ramp test upstream RCD - note trip current</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-sm flex items-center justify-center shrink-0">3</span>
                    <span>Verify downstream trips at lower current than upstream's 50% threshold</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-sm flex items-center justify-center shrink-0">4</span>
                    <span>Test trip times to confirm time delay discrimination</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-sm flex items-center justify-center shrink-0">5</span>
                    <span>Document results on schedule of test results</span>
                  </li>
                </ol>
              </div>
              <p>
                For example: If a 30mA downstream RCD trips at 24mA, and a 100mA upstream S-type won't trip below 50mA (50% of 100mA), discrimination is assured by current alone, plus the time delay provides additional margin.
              </p>
            </div>
          </Card>
        </section>

        {/* Content Section 06 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-cyan-400/30">06</span>
            <h2 className="text-xl font-semibold text-white">Documentation Requirements</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                Where discrimination is required, the design and testing should be documented to demonstrate compliance and aid future maintenance:
              </p>
              <div className="bg-white/5 rounded-xl p-4 border border-cyan-500/20">
                <h4 className="text-cyan-400 font-semibold mb-3">Documentation Checklist</h4>
                <ul className="space-y-2 text-white/70">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-cyan-400 shrink-0" />
                    <span>RCD types and ratings at each level</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-cyan-400 shrink-0" />
                    <span>Trip times at 1×IΔn and 5×IΔn for each RCD</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-cyan-400 shrink-0" />
                    <span>Ramp test results showing actual trip currents</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-cyan-400 shrink-0" />
                    <span>Circuit arrangement showing RCD locations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-cyan-400 shrink-0" />
                    <span>Notes on discrimination achieved</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </section>

        {/* InlineCheck */}
        <div className="mb-8">
          <InlineCheck
            question="A 30mA RCD trips at 26mA during ramp testing. The upstream 100mA S-type won't trip until at least 50mA. Is discrimination achieved?"
            answer="Yes. The downstream 30mA RCD will trip at 26mA, well below the upstream RCD's minimum trip threshold of 50mA (50% of 100mA). The time delay of the S-type provides additional margin."
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
                  <h4 className="text-white font-medium mb-1">Use Both Methods</h4>
                  <p className="text-white/60 text-sm">Combine current ratio AND time delay for reliable discrimination</p>
                </div>
              </div>
            </Card>
            <Card variant="ios" className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Consider Earth Leakage</h4>
                  <p className="text-white/60 text-sm">Cumulative leakage from multiple circuits may affect upstream RCDs</p>
                </div>
              </div>
            </Card>
            <Card variant="ios" className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Personal Protection</h4>
                  <p className="text-white/60 text-sm">S-type must NOT be used where additional protection is required</p>
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
            title="RCD Discrimination Quick Reference"
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

        {/* Module Completion Card */}
        <Card variant="ios-elevated" className="mb-8 border-cyan-500/30">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Module 6 Complete!</h3>
            <p className="text-white/60 mb-4">
              You've mastered RCD testing including types, trip times, ramp testing, and discrimination.
            </p>
            <p className="text-cyan-400 text-sm">
              Continue to Module 7: Polarity & Functional Testing →
            </p>
          </CardContent>
        </Card>

        {/* Navigation */}
        <nav className="flex flex-col gap-3 pt-4 pb-safe">
          <Button
            variant="ios-primary"
            size="lg"
            className="w-full touch-target"
            onClick={() => navigate('/study-centre/apprentice/study/inspection-testing/module7')}
          >
            Continue to Module 7
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

export default InspectionTestingModule6Section5;
