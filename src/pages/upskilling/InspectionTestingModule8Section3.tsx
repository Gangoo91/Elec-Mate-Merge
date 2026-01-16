import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Clock, Target, CheckCircle2, AlertTriangle, ChevronDown, Zap, Table, FileSpreadsheet, Calculator, Hash, ClipboardCheck, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import useSEO from '@/hooks/useSEO';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import UnitsPocketCard from '@/components/apprentice-courses/UnitsPocketCard';

const InspectionTestingModule8Section3 = () => {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  useSEO({
    title: "Schedule of Test Results | Module 8 Section 3 | Inspection & Testing",
    description: "Learn to correctly complete the Schedule of Test Results, recording all electrical measurements from initial verification and periodic inspection."
  });

  const learningOutcomes = [
    { icon: Table, text: "Understand the purpose of the Schedule of Test Results" },
    { icon: FileSpreadsheet, text: "Complete all columns correctly" },
    { icon: Calculator, text: "Record measured values in appropriate units" },
    { icon: Hash, text: "Cross-reference with circuit schedules" },
    { icon: ClipboardCheck, text: "Identify when values indicate defects" },
    { icon: CheckCircle2, text: "Verify completeness before signing" }
  ];

  const quizQuestions = [
    {
      question: "What is the primary purpose of the Schedule of Test Results?",
      options: [
        "To list circuit descriptions only",
        "To record all measured electrical values from testing",
        "To show the installation cost",
        "To list equipment manufacturers"
      ],
      correctAnswer: 1,
      explanation: "The Schedule of Test Results provides a permanent record of all electrical test values, enabling comparison with requirements and future inspections."
    },
    {
      question: "For each circuit, what continuity values should be recorded?",
      options: [
        "Only R2",
        "R1+R2 (or R2 where applicable)",
        "Only the longest cable length",
        "No continuity values needed"
      ],
      correctAnswer: 1,
      explanation: "R1+R2 should be recorded for each circuit as this value is used to calculate maximum Zs. Where R2 is measured separately for main bonding, this should also be recorded."
    },
    {
      question: "What insulation resistance value should be recorded for a circuit tested at 500V?",
      options: [
        "The applied voltage (500V)",
        "The measured resistance in megohms (MΩ)",
        "Just 'Pass' or 'Fail'",
        "The time taken to test"
      ],
      correctAnswer: 1,
      explanation: "The actual measured insulation resistance in megohms should be recorded. If the reading exceeds the meter range (e.g., >200MΩ), record '>200MΩ' or similar."
    },
    {
      question: "When recording RCD test results, which values should be shown?",
      options: [
        "Only whether it tripped",
        "Trip time at ×1 IΔn and ×5 IΔn, plus test at ½ IΔn",
        "Only the manufacturer's specification",
        "The RCD serial number only"
      ],
      correctAnswer: 1,
      explanation: "Record trip times at ×1 IΔn (max 300ms) and ×5 IΔn (max 40ms), plus confirmation of no trip at ½ IΔn. Both positive and negative half-cycle tests where applicable."
    },
    {
      question: "How should earth fault loop impedance (Zs) be recorded?",
      options: [
        "In kilohms",
        "In ohms, with enough decimal places to show compliance",
        "Rounded to whole numbers only",
        "Just compared to maximum allowed"
      ],
      correctAnswer: 1,
      explanation: "Zs should be recorded in ohms to sufficient precision (typically 2 decimal places) to demonstrate compliance with maximum values in BS 7671 tables."
    },
    {
      question: "What does 'n/a' or 'N/A' mean in a test results column?",
      options: [
        "Not allowed",
        "Not applicable - that test is not required for this circuit",
        "Not attempted - come back later",
        "Needs attention"
      ],
      correctAnswer: 1,
      explanation: "N/A indicates the test is not applicable to that circuit. For example, RCD tests don't apply to circuits not protected by an RCD."
    },
    {
      question: "Circuit reference numbers on the Schedule should match:",
      options: [
        "A random numbering system",
        "The circuit chart at the distribution board",
        "Alphabetical order of rooms",
        "Installation date order"
      ],
      correctAnswer: 1,
      explanation: "Circuit references must match those on the distribution board circuit chart/schedule. This enables cross-referencing and identification for future work."
    },
    {
      question: "If polarity is correct at all points tested, how is this recorded?",
      options: [
        "Write the word 'correct'",
        "A tick (✓) in the polarity column",
        "Leave blank",
        "Write the phase colour"
      ],
      correctAnswer: 1,
      explanation: "A tick indicates correct polarity was verified. Incorrect polarity requires detailed explanation in observations and appropriate coding."
    },
    {
      question: "The maximum Zs column shows the limiting value for the circuit. Where does this come from?",
      options: [
        "Client's specification",
        "BS 7671 tables based on protective device type and rating",
        "Estimated by the tester",
        "Previous test results"
      ],
      correctAnswer: 1,
      explanation: "Maximum Zs values are taken from BS 7671 Chapter 41 tables, based on the protective device type (MCB curve B/C/D, fuse type) and rating."
    },
    {
      question: "What should be done if a measured value doesn't meet requirements?",
      options: [
        "Leave that column blank",
        "Record the value, add to observations, and code appropriately",
        "Change the value to make it pass",
        "Only note it verbally to the client"
      ],
      correctAnswer: 1,
      explanation: "Record the actual measured value, add details to the observations section, and assign an appropriate defect code (C1, C2, or C3). Never falsify results."
    }
  ];

  const faqData = [
    {
      question: "Why do I need to record actual values rather than just pass/fail?",
      answer: "Actual values provide baseline data for future inspections, demonstrate compliance margins, and help diagnose problems. A value just within limits now might fail next time - trending data helps predict issues."
    },
    {
      question: "Should I test and record every circuit individually?",
      answer: "Yes. Each circuit should be tested and recorded separately. This identifies which specific circuits have issues and provides comprehensive data for future reference. Group testing doesn't provide adequate information."
    },
    {
      question: "What if my meter shows '>200MΩ' for insulation resistance?",
      answer: "Record '>200MΩ' (or your meter's maximum displayed value). This indicates excellent insulation well above the minimum requirement of 1.0MΩ. The exact value above the display limit isn't significant."
    },
    {
      question: "How do I record ring final circuit continuity?",
      answer: "Record r1, rn, and r2 values from the three-step test. Also record the R1+R2 value at the furthest point. Some schedules have specific columns for ring circuits; otherwise use the remarks column."
    },
    {
      question: "Do I need to record Ze separately from Zs?",
      answer: "Ze (external earth fault loop impedance) should be measured and recorded, typically on the main form or the first page of results. Zs values for individual circuits build on this Ze value."
    },
    {
      question: "What units should be used throughout?",
      answer: "Use standard units: ohms (Ω) for impedance and resistance, megohms (MΩ) for insulation resistance, milliseconds (ms) for RCD trip times, milliamps (mA) for RCD ratings, amps (A) for device ratings."
    }
  ];

  const pocketCardUnits = [
    { name: "Continuity", symbol: "Ω", unit: "(R1+R2)" },
    { name: "Insulation", symbol: "MΩ", unit: "megohms" },
    { name: "Loop Impedance", symbol: "Ω", unit: "(Ze, Zs)" },
    { name: "RCD Time", symbol: "ms", unit: "milliseconds" },
    { name: "Current Rating", symbol: "A", unit: "amps" },
    { name: "RCD Rating", symbol: "mA", unit: "milliamps" }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* iOS-style Header */}
      <header className="sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between px-4 h-14">
          <button
            onClick={() => navigate('/study-centre/apprentice/study/inspection-testing/module8')}
            className="flex items-center gap-2 text-sky-400 active:opacity-70 transition-opacity touch-manipulation"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-base">Module 8</span>
          </button>
          <span className="text-white/60 text-sm">3 of 5</span>
        </div>
      </header>

      <main className="px-4 py-6 pb-safe max-w-3xl mx-auto">
        {/* Hero Section */}
        <section className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-sky-500/20 rounded-full mb-4">
            <span className="text-sky-400 text-sm font-medium">Module 8 • Visual Inspection & Documentation</span>
          </div>
          <h1 className="text-ios-title-large text-white font-bold mb-3">
            Schedule of Test Results
          </h1>
          <p className="text-white/70 text-ios-body leading-relaxed">
            Record all measured electrical values accurately and completely to demonstrate compliance and provide baseline data for future inspections.
          </p>
        </section>

        {/* Interactive Guide Link */}
        <Link to="/study-centre/apprentice/study/guides/documentation">
          <Card variant="ios-elevated" className="mb-6 border-sky-500/30 active:scale-[0.98] transition-transform touch-manipulation">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/20 flex items-center justify-center">
                    <FileSpreadsheet className="w-5 h-5 text-sky-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Documentation Guide</h3>
                    <p className="text-white/60 text-sm">Complete forms and schedules guide</p>
                  </div>
                </div>
                <ExternalLink className="w-5 h-5 text-sky-400" />
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* In 30 Seconds Card */}
        <Card variant="ios-elevated" className="mb-8">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-sky-400" />
              <h2 className="text-white font-semibold text-lg">In 30 Seconds</h2>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 shrink-0" />
                <span className="text-white/80 text-base">Record actual measured values, not just pass/fail</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 shrink-0" />
                <span className="text-white/80 text-base">Every circuit tested separately and recorded</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 shrink-0" />
                <span className="text-white/80 text-base">Use correct units: Ω, MΩ, ms, mA, A</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Learning Outcomes */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-sky-400" />
            Learning Outcomes
          </h2>
          <div className="grid gap-3">
            {learningOutcomes.map((outcome, index) => (
              <Card key={index} variant="ios" className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/20 flex items-center justify-center shrink-0">
                    <outcome.icon className="w-5 h-5 text-sky-400" />
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
            <span className="text-3xl font-bold text-sky-400/30">01</span>
            <h2 className="text-xl font-semibold text-white">Purpose of the Schedule</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                The Schedule of Test Results is a vital document that records all electrical measurements from testing. It serves multiple purposes:
              </p>
              <div className="bg-white/5 rounded-xl p-4 border border-sky-500/20">
                <h4 className="text-sky-400 font-semibold mb-2">Key Functions</h4>
                <ul className="space-y-2 text-white/70">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-1 text-sky-400 shrink-0" />
                    <span>Demonstrates compliance with BS 7671 requirements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-1 text-sky-400 shrink-0" />
                    <span>Provides baseline data for future periodic inspections</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-1 text-sky-400 shrink-0" />
                    <span>Aids fault diagnosis by showing normal values</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-1 text-sky-400 shrink-0" />
                    <span>Forms part of the electrical installation certificate</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </section>

        {/* Content Section 02 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-sky-400/30">02</span>
            <h2 className="text-xl font-semibold text-white">Key Columns Explained</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                Understanding each column ensures complete and accurate recording:
              </p>
              <div className="space-y-3">
                <div className="bg-white/5 rounded-xl p-4 border border-sky-500/20">
                  <h4 className="text-sky-400 font-semibold mb-2">Circuit Details</h4>
                  <ul className="space-y-1 text-white/70 text-sm">
                    <li>• Circuit number/reference</li>
                    <li>• Circuit description</li>
                    <li>• Protective device type and rating</li>
                    <li>• Cable size (mm²)</li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-sky-500/20">
                  <h4 className="text-sky-400 font-semibold mb-2">Test Results</h4>
                  <ul className="space-y-1 text-white/70 text-sm">
                    <li>• Continuity: R1+R2 (Ω)</li>
                    <li>• Insulation resistance (MΩ)</li>
                    <li>• Polarity (✓ or defect code)</li>
                    <li>• Earth fault loop impedance: Zs (Ω)</li>
                    <li>• RCD operating times (ms)</li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-sky-500/20">
                  <h4 className="text-sky-400 font-semibold mb-2">Reference Values</h4>
                  <ul className="space-y-1 text-white/70 text-sm">
                    <li>• Maximum Zs from BS 7671 tables</li>
                    <li>• RCD rating (IΔn in mA)</li>
                    <li>• Maximum operating times required</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* InlineCheck */}
        <div className="mb-8">
          <InlineCheck
            question="Why is recording the actual R1+R2 value important rather than just noting 'satisfactory'?"
            answer="The R1+R2 value is needed to calculate Zs and verify protection. It also provides baseline data - if R1+R2 increases significantly at future inspections, this indicates deteriorating connections or conductor damage."
            color="sky"
          />
        </div>

        {/* Content Section 03 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-sky-400/30">03</span>
            <h2 className="text-xl font-semibold text-white">Recording Continuity Results</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                Continuity test results confirm protective conductor integrity and enable Zs calculation:
              </p>
              <div className="bg-white/5 rounded-xl p-4 border border-sky-500/20">
                <h4 className="text-sky-400 font-semibold mb-3">What to Record</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/70">R1+R2</span>
                    <span className="text-sky-400">Value in Ω (e.g., 0.45Ω)</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/70">R2 (bonding)</span>
                    <span className="text-sky-400">Value in Ω (e.g., 0.12Ω)</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-white/70">Ring circuit</span>
                    <span className="text-sky-400">r1, rn, r2 values</span>
                  </div>
                </div>
              </div>
              <div className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-white/70 text-sm">
                    Remember to subtract test lead resistance from readings, or null leads before testing.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Content Section 04 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-sky-400/30">04</span>
            <h2 className="text-xl font-semibold text-white">Recording Insulation Resistance</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                Insulation resistance values demonstrate conductor insulation integrity:
              </p>
              <div className="bg-white/5 rounded-xl p-4 border border-sky-500/20">
                <h4 className="text-sky-400 font-semibold mb-3">Recording Format</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/70">Minimum acceptable</span>
                    <span className="text-sky-400">1.0MΩ</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/70">Typical new installation</span>
                    <span className="text-sky-400">&gt;200MΩ</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-white/70">Test voltage (SELV/LV)</span>
                    <span className="text-sky-400">250V / 500V</span>
                  </div>
                </div>
              </div>
              <p>
                If your meter shows &gt;200MΩ or similar, record this. For values near the limit (1-2MΩ), record the exact value as this may warrant investigation or observation.
              </p>
            </div>
          </Card>
        </section>

        {/* InlineCheck */}
        <div className="mb-8">
          <InlineCheck
            question="A circuit shows 1.5MΩ insulation resistance. This passes the minimum. Should you record any observations?"
            answer="Record the value (1.5MΩ) and consider adding an observation. While it passes (≥1.0MΩ), this is low for a healthy circuit. It may indicate deteriorating insulation or dampness and warrants monitoring or investigation."
            color="sky"
          />
        </div>

        {/* Content Section 05 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-sky-400/30">05</span>
            <h2 className="text-xl font-semibold text-white">Recording RCD Test Results</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                RCD test results require multiple values to be recorded:
              </p>
              <div className="bg-white/5 rounded-xl p-4 border border-sky-500/20">
                <h4 className="text-sky-400 font-semibold mb-3">RCD Test Values</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/70">×1 IΔn trip time</span>
                    <span className="text-sky-400">Value in ms (max 300ms)</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/70">×5 IΔn trip time</span>
                    <span className="text-sky-400">Value in ms (max 40ms)</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/70">×½ IΔn</span>
                    <span className="text-sky-400">&gt;200ms or 'NT' (no trip)</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-white/70">Test button</span>
                    <span className="text-sky-400">✓ (operates)</span>
                  </div>
                </div>
              </div>
              <p>
                Some schedules require positive (+) and negative (-) half-cycle tests. Record both values where applicable.
              </p>
            </div>
          </Card>
        </section>

        {/* Content Section 06 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-sky-400/30">06</span>
            <h2 className="text-xl font-semibold text-white">Completeness Checks</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                Before signing off, verify the schedule is complete:
              </p>
              <div className="bg-white/5 rounded-xl p-4 border border-sky-500/20">
                <h4 className="text-sky-400 font-semibold mb-3">Final Checklist</h4>
                <ul className="space-y-2 text-white/70">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-sky-400 shrink-0" />
                    <span>All circuits tested and recorded</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-sky-400 shrink-0" />
                    <span>No blank columns (use N/A where appropriate)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-sky-400 shrink-0" />
                    <span>Circuit references match distribution board</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-sky-400 shrink-0" />
                    <span>Values within acceptable limits or coded</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-sky-400 shrink-0" />
                    <span>Defects cross-referenced to observations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-sky-400 shrink-0" />
                    <span>Page numbers and signature on each page</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </section>

        {/* InlineCheck */}
        <div className="mb-8">
          <InlineCheck
            question="You've recorded Zs as 0.95Ω but the maximum for this 32A Type B MCB is 1.15Ω. Should you record anything else?"
            answer="The value passes (0.95 < 1.15Ω) so no defect code is needed. However, recording the maximum Zs value alongside the measured value demonstrates the compliance margin and aids future inspectors."
            color="sky"
          />
        </div>

        {/* Practical Tips */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-sky-400" />
            Practical Tips
          </h2>
          <div className="space-y-3">
            <Card variant="ios" className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Test and Record Together</h4>
                  <p className="text-white/60 text-sm">Record values immediately as you test - don't rely on memory</p>
                </div>
              </div>
            </Card>
            <Card variant="ios" className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Use Electronic Records</h4>
                  <p className="text-white/60 text-sm">Many test instruments download results directly - cleaner and faster</p>
                </div>
              </div>
            </Card>
            <Card variant="ios" className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Never Falsify Results</h4>
                  <p className="text-white/60 text-sm">Inaccurate records are professional misconduct and dangerous</p>
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
            title="Test Results Units Reference"
            units={pocketCardUnits}
            color="sky"
          />
        </section>

        {/* Quiz */}
        <section className="mb-8">
          <Quiz
            title="Section Quiz"
            questions={quizQuestions}
            color="sky"
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col gap-3 pt-4 pb-safe">
          <Button
            variant="ios-primary"
            size="lg"
            className="w-full touch-target bg-sky-500 hover:bg-sky-600"
            onClick={() => navigate('/study-centre/apprentice/study/inspection-testing/module8/section4')}
          >
            Continue to Section 4
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
          <Button
            variant="ios-secondary"
            size="lg"
            className="w-full touch-target"
            onClick={() => navigate('/study-centre/apprentice/study/inspection-testing/module8')}
          >
            Back to Module 8
          </Button>
        </nav>
      </main>
    </div>
  );
};

export default InspectionTestingModule8Section3;
