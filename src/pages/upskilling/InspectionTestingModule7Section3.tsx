import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Clock, Target, CheckCircle2, AlertTriangle, ChevronDown, Zap, RotateCcw, Activity, Gauge, Factory, Cog, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import useSEO from '@/hooks/useSEO';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import UnitsPocketCard from '@/components/apprentice-courses/UnitsPocketCard';

const InspectionTestingModule7Section3 = () => {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  useSEO({
    title: "Three-Phase Rotation Testing | Module 7 Section 3 | Inspection & Testing",
    description: "Learn to verify correct phase sequence (rotation) on three-phase supplies to ensure motors and equipment rotate in the correct direction."
  });

  const learningOutcomes = [
    { icon: RotateCcw, text: "Understand the importance of correct phase rotation" },
    { icon: Activity, text: "Use phase rotation testers correctly" },
    { icon: Gauge, text: "Identify consequences of incorrect rotation" },
    { icon: Factory, text: "Apply testing to motor installations" },
    { icon: Cog, text: "Verify rotation at three-phase outlets" },
    { icon: ShieldCheck, text: "Document phase sequence results" }
  ];

  const quizQuestions = [
    {
      question: "What is phase rotation (phase sequence)?",
      options: [
        "The speed at which AC voltage alternates",
        "The order in which the three phases reach their peak voltage",
        "The angle between voltage and current",
        "The number of phases in a supply"
      ],
      correctAnswer: 1,
      explanation: "Phase rotation refers to the sequence (order) in which the three phases (L1, L2, L3) reach their positive peak voltage - typically measured as clockwise (positive) or anti-clockwise (negative)."
    },
    {
      question: "What is the standard (correct) phase sequence in the UK?",
      options: [
        "L3, L2, L1 (anti-clockwise)",
        "L1, L2, L3 (clockwise)",
        "L1, L3, L2",
        "Phase sequence varies by region"
      ],
      correctAnswer: 1,
      explanation: "The standard phase sequence in the UK is L1, L2, L3 in clockwise rotation. This is the 'positive' sequence that three-phase motors and equipment are designed for."
    },
    {
      question: "What is the primary consequence of incorrect phase rotation on a three-phase motor?",
      options: [
        "The motor runs slower",
        "The motor runs in reverse direction",
        "The motor draws more current",
        "The motor won't start"
      ],
      correctAnswer: 1,
      explanation: "Incorrect phase rotation causes three-phase induction motors to run in the opposite (reverse) direction. This can be dangerous for machinery like fans, pumps, or conveyors."
    },
    {
      question: "A phase rotation tester shows 'negative' or 'reverse' sequence. What does this indicate?",
      options: [
        "Two phases have been swapped",
        "The supply voltage is too low",
        "There is a phase-to-earth fault",
        "The neutral is disconnected"
      ],
      correctAnswer: 0,
      explanation: "A negative/reverse sequence indicates two of the three phases have been swapped somewhere in the installation, reversing the rotation direction from the standard L1-L2-L3 sequence."
    },
    {
      question: "How do you correct reverse phase rotation?",
      options: [
        "Reconnect all three phases in reverse order",
        "Swap any two of the three phases",
        "Add a phase rotation relay",
        "Install a larger motor"
      ],
      correctAnswer: 1,
      explanation: "Swapping any two phases will reverse the rotation direction. If the sequence is wrong, swapping any pair (e.g., L1 with L2) will correct it to the proper sequence."
    },
    {
      question: "Where should phase rotation be verified?",
      options: [
        "Only at the main switchboard",
        "At the main incoming supply and at three-phase outlets/equipment",
        "Only at motor terminals",
        "Phase rotation doesn't need verification"
      ],
      correctAnswer: 1,
      explanation: "Phase rotation should be verified at the incoming supply and at three-phase outlets or equipment terminals, as wiring errors can occur at any point in the distribution system."
    },
    {
      question: "What type of equipment could be damaged by reverse rotation?",
      options: [
        "Lighting circuits",
        "Single-phase heating elements",
        "Centrifugal pumps and compressors",
        "Resistive loads"
      ],
      correctAnswer: 2,
      explanation: "Centrifugal pumps, compressors, fans, and similar rotating equipment can be damaged if run in reverse. Pumps may lose prime, and some machinery has direction-specific lubrication systems."
    },
    {
      question: "A phase rotation indicator has connections labelled L1, L2, L3. How should it be connected?",
      options: [
        "Connect to any phases in any order",
        "Connect L1 to L1, L2 to L2, L3 to L3 of the supply",
        "Only connect L1 and L3",
        "Connect through CTs"
      ],
      correctAnswer: 1,
      explanation: "Connect the tester's L1, L2, L3 terminals to the corresponding supply phases. The tester then indicates whether the sequence matches the correct L1-L2-L3 rotation."
    },
    {
      question: "Phase rotation testing is part of which category of tests in BS 7671?",
      options: [
        "Dead testing",
        "Live testing",
        "Functional testing",
        "Insulation testing"
      ],
      correctAnswer: 2,
      explanation: "Phase rotation testing is a functional test as it verifies the correct operation of the three-phase supply. It requires the supply to be energised."
    },
    {
      question: "What safety precaution is essential during phase rotation testing?",
      options: [
        "Wear hearing protection",
        "Test equipment must be rated for the voltage and proved functional",
        "Circuit must be isolated",
        "All loads must be connected"
      ],
      correctAnswer: 1,
      explanation: "Phase rotation testing is performed live, so the test equipment must be rated for the system voltage and proved functional before and after use using a proving unit."
    }
  ];

  const faqData = [
    {
      question: "Why does phase rotation matter for motors?",
      answer: "Three-phase induction motors develop a rotating magnetic field based on the phase sequence. The direction of this field determines motor rotation. Incorrect sequence reverses the field direction, making the motor run backwards - potentially dangerous for connected machinery."
    },
    {
      question: "Can phase rotation be wrong at individual outlets but correct at the main board?",
      answer: "Yes. Wiring errors at any point (sub-mains, distribution boards, final connections) can cause phase reversal at specific locations while the main supply sequence remains correct. This is why testing at multiple points is important."
    },
    {
      question: "Do all three-phase loads require correct phase rotation?",
      answer: "Motors and direction-sensitive equipment require correct rotation. However, resistive loads (heaters) and some electronic equipment with internal rectification are not affected by phase sequence - they work regardless of rotation direction."
    },
    {
      question: "What does a phase rotation relay do?",
      answer: "A phase rotation relay monitors phase sequence and prevents equipment starting if rotation is incorrect. It's a protective device used on critical machinery. However, it should not be used as a substitute for correct installation - the wiring should be corrected."
    },
    {
      question: "How often should phase rotation be checked?",
      answer: "Phase rotation should be verified during initial verification of any three-phase installation and after any work that involves disconnecting and reconnecting three-phase supplies. During periodic inspection, it should be checked at outlets and equipment terminals."
    },
    {
      question: "Can single-phase loads be affected by phase rotation issues?",
      answer: "No. Single-phase loads only use one phase and neutral, so phase rotation is irrelevant. However, if phase identification is incorrect (wrong phase marked as L1), this can cause issues with load balancing and monitoring systems."
    }
  ];

  const pocketCardUnits = [
    { name: "Correct Sequence", symbol: "L1-L2-L3", unit: "clockwise" },
    { name: "UK Phases", symbol: "Brown-Black-Grey", unit: "L1-L2-L3" },
    { name: "Phase Voltage", symbol: "230V", unit: "to neutral" },
    { name: "Line Voltage", symbol: "400V", unit: "phase-phase" },
    { name: "Correction", symbol: "Swap 2", unit: "phases" },
    { name: "Test Type", symbol: "Live", unit: "functional" }
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
          <span className="text-white/60 text-sm">3 of 5</span>
        </div>
      </header>

      <main className="px-4 py-6 pb-safe max-w-2xl mx-auto">
        {/* Hero Section */}
        <section className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-rose-500/20 rounded-full mb-4">
            <span className="text-rose-400 text-sm font-medium">Module 7 • Polarity & Functional Testing</span>
          </div>
          <h1 className="text-ios-title-large text-white font-bold mb-3">
            Three-Phase Rotation Testing
          </h1>
          <p className="text-white/70 text-ios-body leading-relaxed">
            Verify correct phase sequence to ensure three-phase motors and equipment operate in the correct direction.
          </p>
        </section>

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
                <span className="text-white/80 text-base">Correct sequence is L1-L2-L3 (clockwise rotation)</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0" />
                <span className="text-white/80 text-base">Wrong rotation causes motors to run backwards</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0" />
                <span className="text-white/80 text-base">Swap any two phases to correct reverse rotation</span>
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
            <h2 className="text-xl font-semibold text-white">Understanding Phase Rotation</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                In a three-phase supply, the three phases (L1, L2, L3) each carry alternating current that peaks at different times, 120° apart. Phase rotation (or phase sequence) describes the order in which these peaks occur.
              </p>
              <div className="bg-white/5 rounded-xl p-4 border border-rose-500/20">
                <h4 className="text-rose-400 font-semibold mb-3">Phase Sequence Basics</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-4 p-3 bg-white/5 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                      <RotateCcw className="w-5 h-5 text-green-400" style={{ transform: 'scaleX(-1)' }} />
                    </div>
                    <div>
                      <span className="text-green-400 font-semibold">Clockwise (Positive)</span>
                      <p className="text-white/60 text-sm">L1 → L2 → L3 → L1 (correct)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-white/5 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                      <RotateCcw className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <span className="text-red-400 font-semibold">Anti-clockwise (Negative)</span>
                      <p className="text-white/60 text-sm">L1 → L3 → L2 → L1 (reversed)</p>
                    </div>
                  </div>
                </div>
              </div>
              <p>
                Three-phase induction motors create a rotating magnetic field based on this sequence. The field rotation direction determines which way the motor shaft rotates.
              </p>
            </div>
          </Card>
        </section>

        {/* Content Section 02 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-rose-400/30">02</span>
            <h2 className="text-xl font-semibold text-white">Consequences of Wrong Rotation</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                Incorrect phase rotation can have serious consequences for motor-driven equipment:
              </p>
              <div className="space-y-3">
                <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/30">
                  <h4 className="text-red-400 font-semibold mb-2">Critical Hazards</h4>
                  <ul className="space-y-2 text-white/70">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 mt-1 text-red-400 shrink-0" />
                      <span><strong>Pumps:</strong> Run dry, lose prime, cavitation damage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 mt-1 text-red-400 shrink-0" />
                      <span><strong>Fans:</strong> Incorrect airflow direction, reduced efficiency</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 mt-1 text-red-400 shrink-0" />
                      <span><strong>Compressors:</strong> Damage to valves and bearings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 mt-1 text-red-400 shrink-0" />
                      <span><strong>Conveyors:</strong> Material moves wrong direction</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 mt-1 text-red-400 shrink-0" />
                      <span><strong>Lifts:</strong> Direction indicator mismatch (safety hazard)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* InlineCheck */}
        <div className="mb-8">
          <InlineCheck
            question="A centrifugal pump motor runs but produces no water flow. Could phase rotation be the cause?"
            answer="Yes. If the phase rotation is reversed, the pump impeller spins backwards, unable to create the centrifugal force needed to move water. The pump appears to run but produces no flow or very low pressure."
            color="rose"
          />
        </div>

        {/* Content Section 03 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-rose-400/30">03</span>
            <h2 className="text-xl font-semibold text-white">Phase Rotation Testing</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                A phase rotation tester (phase sequence indicator) is used to verify correct rotation. This is a live test requiring appropriate safety precautions.
              </p>
              <div className="bg-white/5 rounded-xl p-4 border border-rose-500/20">
                <h4 className="text-rose-400 font-semibold mb-3">Test Procedure</h4>
                <ol className="space-y-3 text-white/70">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 text-sm flex items-center justify-center shrink-0">1</span>
                    <span>Verify tester is rated for system voltage (400V+)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 text-sm flex items-center justify-center shrink-0">2</span>
                    <span>Prove tester functional using proving unit</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 text-sm flex items-center justify-center shrink-0">3</span>
                    <span>Connect L1, L2, L3 leads to corresponding phases</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 text-sm flex items-center justify-center shrink-0">4</span>
                    <span>Read indication (clockwise/anti-clockwise or +/-)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 text-sm flex items-center justify-center shrink-0">5</span>
                    <span>Re-prove tester after use</span>
                  </li>
                </ol>
              </div>
              <div className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-white/70 text-sm">
                    <strong className="text-amber-400">Safety:</strong> This is live testing at 400V. Use appropriate PPE, follow safe working procedures, and ensure adequate clearances.
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
            <h2 className="text-xl font-semibold text-white">Correcting Phase Rotation</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                If phase rotation is incorrect, the solution is simple: swap any two phases. This reverses the rotation direction.
              </p>
              <div className="bg-white/5 rounded-xl p-4 border border-rose-500/20">
                <h4 className="text-rose-400 font-semibold mb-3">Correction Example</h4>
                <div className="space-y-3 text-white/70">
                  <div className="p-3 bg-white/5 rounded-lg">
                    <span className="text-red-400 font-semibold">Before (Wrong):</span>
                    <p className="font-mono mt-1">L1 → L3 → L2 (anti-clockwise)</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="text-rose-400">Swap L2 and L3</span>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <span className="text-green-400 font-semibold">After (Correct):</span>
                    <p className="font-mono mt-1">L1 → L2 → L3 (clockwise)</p>
                  </div>
                </div>
              </div>
              <p>
                The correction should be made at the most appropriate point - either at the main distribution board or at the specific outlet/equipment affected, depending on where the error originated.
              </p>
            </div>
          </Card>
        </section>

        {/* InlineCheck */}
        <div className="mb-8">
          <InlineCheck
            question="If phase rotation is wrong at a single motor but correct at the main board, where should the correction be made?"
            answer="At the motor terminals or the local isolator. The fault is in the final wiring to that motor, so correcting at the motor/isolator fixes it without affecting other equipment on the correct supply."
            color="rose"
          />
        </div>

        {/* Content Section 05 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-rose-400/30">05</span>
            <h2 className="text-xl font-semibold text-white">Phase Identification (UK Colours)</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                UK harmonised cable colours for three-phase installations:
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-4 p-3 bg-white/5 rounded-xl">
                  <div className="w-12 h-12 rounded-lg bg-amber-700 border-2 border-white/20" />
                  <div>
                    <span className="text-white font-semibold">BROWN - L1</span>
                    <p className="text-white/60 text-sm">Phase 1 (was Red)</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-white/5 rounded-xl">
                  <div className="w-12 h-12 rounded-lg bg-gray-900 border-2 border-white/20" />
                  <div>
                    <span className="text-white font-semibold">BLACK - L2</span>
                    <p className="text-white/60 text-sm">Phase 2 (was Yellow)</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-white/5 rounded-xl">
                  <div className="w-12 h-12 rounded-lg bg-gray-500 border-2 border-white/20" />
                  <div>
                    <span className="text-white font-semibold">GREY - L3</span>
                    <p className="text-white/60 text-sm">Phase 3 (was Blue)</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-white/5 rounded-xl">
                  <div className="w-12 h-12 rounded-lg bg-blue-600 border-2 border-white/20" />
                  <div>
                    <span className="text-white font-semibold">BLUE - N</span>
                    <p className="text-white/60 text-sm">Neutral (was Black)</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Content Section 06 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-rose-400/30">06</span>
            <h2 className="text-xl font-semibold text-white">Recording and Documentation</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                Phase rotation verification should be documented on electrical installation certificates and inspection reports:
              </p>
              <div className="bg-white/5 rounded-xl p-4 border border-rose-500/20">
                <h4 className="text-rose-400 font-semibold mb-3">Documentation Requirements</h4>
                <ul className="space-y-2 text-white/70">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-rose-400 shrink-0" />
                    <span>Record phase rotation at incoming supply</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-rose-400 shrink-0" />
                    <span>Note rotation at three-phase outlets/equipment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-rose-400 shrink-0" />
                    <span>Confirm clockwise/positive sequence</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-rose-400 shrink-0" />
                    <span>Record any corrections made</span>
                  </li>
                </ul>
              </div>
              <p>
                The Schedule of Inspections includes a check for phase sequence. Mark as satisfactory (✓) if correct L1-L2-L3 sequence, or as requiring attention if reversed.
              </p>
            </div>
          </Card>
        </section>

        {/* InlineCheck */}
        <div className="mb-8">
          <InlineCheck
            question="During an EICR, phase rotation is found to be reversed at the main intake. What observation code applies?"
            answer="Code C2 (potentially dangerous). Reversed phase rotation at the intake affects all three-phase equipment downstream. This requires urgent attention to prevent damage to motors and machinery."
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
                  <h4 className="text-white font-medium mb-1">Check at Multiple Points</h4>
                  <p className="text-white/60 text-sm">Test rotation at incoming and at critical equipment - don't assume</p>
                </div>
              </div>
            </Card>
            <Card variant="ios" className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Motor Direction Arrow</h4>
                  <p className="text-white/60 text-sm">Many motors have a direction arrow - verify it matches intended operation</p>
                </div>
              </div>
            </Card>
            <Card variant="ios" className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Never Run Backward</h4>
                  <p className="text-white/60 text-sm">Don't run motors backward "just briefly" to check - damage can occur instantly</p>
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
            title="Three-Phase Rotation Reference"
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
            onClick={() => navigate('/study-centre/apprentice/study/inspection-testing/module7/section4')}
          >
            Continue to Section 4
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

export default InspectionTestingModule7Section3;
