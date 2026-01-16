import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Clock, Target, CheckCircle2, AlertTriangle, ChevronDown, Zap, ArrowLeftRight, Cpu, Settings, Eye, FileText, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import useSEO from '@/hooks/useSEO';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import UnitsPocketCard from '@/components/apprentice-courses/UnitsPocketCard';

const InspectionTestingModule7Section1 = () => {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  useSEO({
    title: "Polarity Testing Methods | Module 7 Section 1 | Inspection & Testing",
    description: "Master polarity testing techniques to verify correct connection of line, neutral and protective conductors throughout electrical installations."
  });

  const learningOutcomes = [
    { icon: ArrowLeftRight, text: "Understand the importance of correct polarity" },
    { icon: Cpu, text: "Use appropriate instruments for polarity verification" },
    { icon: Settings, text: "Apply different polarity testing methods" },
    { icon: Eye, text: "Identify consequences of reversed polarity" },
    { icon: FileText, text: "Document polarity test results correctly" },
    { icon: CheckCircle2, text: "Verify polarity at all relevant locations" }
  ];

  const quizQuestions = [
    {
      question: "What is the primary purpose of polarity testing?",
      options: [
        "To measure voltage levels",
        "To verify line, neutral, and CPC are correctly connected throughout",
        "To test insulation resistance",
        "To verify earth electrode resistance"
      ],
      correctAnswer: 1,
      explanation: "Polarity testing confirms that line, neutral, and circuit protective conductors are correctly connected at all points, ensuring safe operation and proper protective device function."
    },
    {
      question: "Single-pole switches must be connected in which conductor?",
      options: [
        "Neutral conductor",
        "Line conductor",
        "Circuit protective conductor",
        "Either line or neutral"
      ],
      correctAnswer: 1,
      explanation: "Single-pole switches must always be connected in the line conductor. If connected in neutral, the circuit would remain live when switched off, creating a serious shock hazard."
    },
    {
      question: "What instrument is commonly used for polarity testing on de-energised circuits?",
      options: [
        "Clamp meter",
        "Low-resistance ohmmeter (continuity tester)",
        "Insulation resistance tester",
        "Power quality analyser"
      ],
      correctAnswer: 1,
      explanation: "A low-resistance ohmmeter (continuity tester) is used on de-energised circuits to verify correct connections between known reference points and circuit conductors."
    },
    {
      question: "When testing polarity on a lighting circuit with the switch open, continuity between L and the lamp should be:",
      options: [
        "Zero ohms",
        "Open circuit (infinite)",
        "Approximately 1 ohm",
        "High resistance (megohms)"
      ],
      correctAnswer: 1,
      explanation: "With the switch open (off), there should be no continuity between line at the origin and the lamp terminal, proving the switch is correctly connected in the line conductor."
    },
    {
      question: "At a socket outlet, the line terminal is marked with which letter?",
      options: [
        "N",
        "E",
        "L",
        "P"
      ],
      correctAnswer: 2,
      explanation: "Socket outlet terminals are marked L (line), N (neutral), and E or the earth symbol (⏚) for the protective conductor."
    },
    {
      question: "What is the consequence of reversed polarity at a socket outlet?",
      options: [
        "Equipment won't work",
        "The fuse protects the wrong conductor, making disconnection unsafe",
        "Voltage will be doubled",
        "No consequence - polarity doesn't matter for AC"
      ],
      correctAnswer: 1,
      explanation: "Reversed polarity means the fuse/switch is in the neutral, so equipment remains live even when the fuse blows or switch is off, creating a serious shock hazard."
    },
    {
      question: "In a radial circuit, polarity should be verified at:",
      options: [
        "Only the first and last socket",
        "Only the consumer unit",
        "Every socket outlet and switch",
        "Randomly selected points"
      ],
      correctAnswer: 2,
      explanation: "Polarity must be verified at all points in the circuit including every socket outlet, switch, and accessory, as wiring errors can occur at any point."
    },
    {
      question: "Which conductor should be identified by a BROWN sleeve or marking?",
      options: [
        "Neutral",
        "Line",
        "Circuit protective conductor",
        "Earth"
      ],
      correctAnswer: 1,
      explanation: "Brown identifies the line conductor. Blue is neutral, and green/yellow stripes identify the protective conductor (CPC)."
    },
    {
      question: "For an Edison screw (ES) lamp holder, correct polarity requires the outer contact to be connected to:",
      options: [
        "Line conductor",
        "Neutral conductor",
        "Earth conductor",
        "Either line or neutral"
      ],
      correctAnswer: 1,
      explanation: "For Edison screw lamp holders, the outer screwed contact must be neutral and the centre contact must be line, reducing shock risk when changing lamps."
    },
    {
      question: "What does a live polarity tester indicate?",
      options: [
        "Continuity between conductors",
        "Insulation condition",
        "Which conductor is line when circuit is energised",
        "Earth fault loop impedance"
      ],
      correctAnswer: 2,
      explanation: "A live polarity tester (socket tester or voltage indicator with phase indication) identifies which conductor is line when the circuit is energised, without needing to isolate."
    }
  ];

  const faqData = [
    {
      question: "Why is polarity testing so important?",
      answer: "Incorrect polarity creates serious safety hazards. If a single-pole switch is in the neutral conductor, the circuit remains live even when switched off. If socket polarity is reversed, equipment fuses disconnect the neutral, leaving equipment live. These errors can cause fatal electric shocks."
    },
    {
      question: "Can I use a socket tester to verify polarity?",
      answer: "Socket testers provide a quick indication of polarity and common wiring faults on energised circuits. However, they have limitations and can miss certain fault conditions. Full polarity verification during initial verification should use continuity testing from known reference points."
    },
    {
      question: "Does polarity matter for AC circuits?",
      answer: "Yes, absolutely. While AC voltage alternates, correct polarity ensures protective devices (fuses, MCBs) and single-pole switches are in the line conductor. This is essential for safe isolation and protection. Reversed polarity is a serious defect requiring immediate rectification."
    },
    {
      question: "How do I test polarity on a lighting circuit?",
      answer: "With the circuit isolated and switch off, test continuity from the line conductor at the origin to the switch common terminal, then from the switch switched terminal to the lamp holder line terminal. With the switch on, continuity should exist from origin line to lamp line terminal."
    },
    {
      question: "What faults can a socket tester detect?",
      answer: "Most socket testers can detect: line-neutral reversal, line-earth reversal, missing earth, missing neutral, and missing line. However, they cannot detect a bootleg earth (neutral connected to earth terminal) or confirm CPC continuity back to the origin."
    },
    {
      question: "Is polarity testing required at every socket on an EICR?",
      answer: "Yes. Regulation 643.8 requires polarity to be verified at the point of utilisation (every outlet) and at switchgear devices to confirm single-pole devices are in the line conductor. This applies to both initial verification and periodic inspection."
    }
  ];

  const pocketCardUnits = [
    { name: "Line Colour", symbol: "Brown", unit: "L" },
    { name: "Neutral Colour", symbol: "Blue", unit: "N" },
    { name: "CPC Colour", symbol: "G/Y", unit: "⏚" },
    { name: "Switch Position", symbol: "Line", unit: "only" },
    { name: "ES Outer Contact", symbol: "Neutral", unit: "N" },
    { name: "ES Centre Contact", symbol: "Line", unit: "L" }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* iOS-style Header */}
      <header className="sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between px-4 h-14">
          <button
            onClick={() => navigate('/study-centre/apprentice/study/inspection-testing/module7')}
            className="flex items-center gap-2 text-rose-400 active:opacity-70 transition-opacity touch-manipulation"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-base">Module 7</span>
          </button>
          <span className="text-white/60 text-sm">1 of 5</span>
        </div>
      </header>

      <main className="px-4 py-6 pb-safe max-w-3xl mx-auto">
        {/* Hero Section */}
        <section className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-rose-500/20 rounded-full mb-4">
            <span className="text-rose-400 text-sm font-medium">Module 7 • Polarity & Functional Testing</span>
          </div>
          <h1 className="text-ios-title-large text-white font-bold mb-3">
            Polarity Testing Methods
          </h1>
          <p className="text-white/70 text-ios-body leading-relaxed">
            Master the techniques for verifying correct connection of line, neutral, and protective conductors throughout electrical installations.
          </p>
        </section>

        {/* Interactive Guide Link */}
        <Link to="/study-centre/apprentice/study/guides/polarity-testing">
          <Card variant="ios-elevated" className="mb-6 border-rose-500/30 active:scale-[0.98] transition-transform touch-manipulation">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-rose-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Polarity Testing Guide</h3>
                    <p className="text-white/60 text-sm">Interactive step-by-step procedures</p>
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
                <span className="text-white/80 text-base">Single-pole switches must be in the LINE conductor only</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0" />
                <span className="text-white/80 text-base">Verify polarity at EVERY socket, switch, and accessory</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0" />
                <span className="text-white/80 text-base">Reversed polarity is a C1 dangerous condition requiring immediate action</span>
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
            <h2 className="text-xl font-semibold text-white">Why Polarity Matters</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                Correct polarity is fundamental to electrical safety. While AC voltage alternates direction, the protection system relies on switches and protective devices being in specific conductors to function safely.
              </p>
              <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/30">
                <h4 className="text-red-400 font-semibold mb-2">Dangers of Reversed Polarity</h4>
                <ul className="space-y-2 text-white/70">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 mt-1 text-red-400 shrink-0" />
                    <span>Equipment remains live when switched "off"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 mt-1 text-red-400 shrink-0" />
                    <span>Fuses protect the neutral - equipment stays live when fuse blows</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 mt-1 text-red-400 shrink-0" />
                    <span>Edison screw lamp holders expose live metal during lamp changes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 mt-1 text-red-400 shrink-0" />
                    <span>Risk of fatal electric shock</span>
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
            <h2 className="text-xl font-semibold text-white">What to Verify</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                Regulation 643.8 requires verification that polarity is correct at every location. This includes:
              </p>
              <div className="space-y-3">
                <div className="bg-white/5 rounded-xl p-4 border border-rose-500/20">
                  <h4 className="text-rose-400 font-semibold mb-2">Points Requiring Polarity Verification</h4>
                  <ul className="space-y-2 text-white/70">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 mt-1 text-rose-400 shrink-0" />
                      <span>Single-pole devices are in the line conductor</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 mt-1 text-rose-400 shrink-0" />
                      <span>Centre contact of ES lamp holders is connected to line</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 mt-1 text-rose-400 shrink-0" />
                      <span>Socket outlets have correct L, N, E connections</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 mt-1 text-rose-400 shrink-0" />
                      <span>All accessories correctly wired</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 mt-1 text-rose-400 shrink-0" />
                      <span>CPCs are correctly identified and connected</span>
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
            question="Why must single-pole switches be connected in the line conductor?"
            answer="So that when the switch is off, no voltage is present at the load. If the switch was in neutral, the line would remain connected to the load, creating a shock hazard even with the switch off."
            color="rose"
          />
        </div>

        {/* Content Section 03 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-rose-400/30">03</span>
            <h2 className="text-xl font-semibold text-white">Testing Methods</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                There are two main approaches to polarity testing, each suitable for different situations:
              </p>
              <div className="space-y-4">
                <div className="bg-white/5 rounded-xl p-4 border border-rose-500/20">
                  <h4 className="text-rose-400 font-semibold mb-2">1. Continuity Method (De-energised)</h4>
                  <p className="text-white/70 text-sm mb-2">
                    Uses a low-resistance ohmmeter to verify connections from known reference points at the consumer unit to each outlet.
                  </p>
                  <ul className="space-y-1 text-white/60 text-sm">
                    <li>• Requires circuit isolation</li>
                    <li>• Confirms actual conductor connections</li>
                    <li>• Used during initial verification</li>
                    <li>• Most thorough method</li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-rose-500/20">
                  <h4 className="text-rose-400 font-semibold mb-2">2. Live Testing Method (Energised)</h4>
                  <p className="text-white/70 text-sm mb-2">
                    Uses approved voltage indicators or socket testers on energised circuits.
                  </p>
                  <ul className="space-y-1 text-white/60 text-sm">
                    <li>• Quick verification of energised circuits</li>
                    <li>• Useful during periodic inspection</li>
                    <li>• Socket testers show common faults</li>
                    <li>• Has some limitations (see FAQs)</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Content Section 04 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-rose-400/30">04</span>
            <h2 className="text-xl font-semibold text-white">Continuity Test Procedure</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                The preferred method for initial verification uses continuity testing from known reference points:
              </p>
              <div className="bg-white/5 rounded-xl p-4 border border-rose-500/20">
                <h4 className="text-rose-400 font-semibold mb-3">Socket Outlet Polarity Test</h4>
                <ol className="space-y-3 text-white/70">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 text-sm flex items-center justify-center shrink-0">1</span>
                    <span>Isolate circuit at consumer unit, prove dead</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 text-sm flex items-center justify-center shrink-0">2</span>
                    <span>Connect long test lead between line terminal at CU and socket line (L)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 text-sm flex items-center justify-center shrink-0">3</span>
                    <span>Verify low resistance (continuity) exists</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 text-sm flex items-center justify-center shrink-0">4</span>
                    <span>Repeat for neutral (N) and earth (E) terminals</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 text-sm flex items-center justify-center shrink-0">5</span>
                    <span>Confirm no continuity between wrong terminals</span>
                  </li>
                </ol>
              </div>
            </div>
          </Card>
        </section>

        {/* InlineCheck */}
        <div className="mb-8">
          <InlineCheck
            question="During a polarity test, continuity is found between the line terminal at the CU and the neutral socket of a socket outlet. What does this indicate?"
            answer="This indicates reversed polarity - the line conductor at the CU is connected to the neutral terminal at the socket. This is a dangerous condition requiring immediate rectification."
            color="rose"
          />
        </div>

        {/* Content Section 05 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-rose-400/30">05</span>
            <h2 className="text-xl font-semibold text-white">Conductor Identification</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                Correct identification of conductors using harmonised colours:
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-4 p-3 bg-white/5 rounded-xl">
                  <div className="w-12 h-12 rounded-lg bg-amber-700 border-2 border-white/20" />
                  <div>
                    <span className="text-white font-semibold">BROWN</span>
                    <p className="text-white/60 text-sm">Line conductor (L)</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-white/5 rounded-xl">
                  <div className="w-12 h-12 rounded-lg bg-blue-600 border-2 border-white/20" />
                  <div>
                    <span className="text-white font-semibold">BLUE</span>
                    <p className="text-white/60 text-sm">Neutral conductor (N)</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-white/5 rounded-xl">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 via-yellow-400 to-green-500 border-2 border-white/20" />
                  <div>
                    <span className="text-white font-semibold">GREEN/YELLOW</span>
                    <p className="text-white/60 text-sm">Protective conductor (CPC)</p>
                  </div>
                </div>
              </div>
              <div className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30 mt-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-white/70 text-sm">
                    <strong className="text-amber-400">Old colours:</strong> Installations pre-2006 may use Red (L), Black (N). The CPC has always been green/yellow.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Content Section 06 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-rose-400/30">06</span>
            <h2 className="text-xl font-semibold text-white">Recording Results</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                Polarity verification must be recorded on the Schedule of Test Results. The result is recorded as either a tick (✓) for correct polarity or a cross (✗) for incorrect.
              </p>
              <div className="bg-white/5 rounded-xl p-4 border border-rose-500/20">
                <h4 className="text-rose-400 font-semibold mb-3">Recording Requirements</h4>
                <ul className="space-y-2 text-white/70">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-rose-400 shrink-0" />
                    <span>Every circuit requires polarity confirmation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-rose-400 shrink-0" />
                    <span>Record for all outlets on each circuit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-rose-400 shrink-0" />
                    <span>EICR: Code C1 for reversed polarity (danger)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-rose-400 shrink-0" />
                    <span>Method of verification should be noted</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </section>

        {/* InlineCheck */}
        <div className="mb-8">
          <InlineCheck
            question="What observation code should be assigned on an EICR for reversed polarity at a socket outlet?"
            answer="Code C1 (danger present) - reversed polarity creates immediate risk of electric shock as equipment may remain live when apparently isolated. Immediate remedial action is required."
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
                  <h4 className="text-white font-medium mb-1">Test Systematically</h4>
                  <p className="text-white/60 text-sm">Work through each circuit methodically - don't skip outlets</p>
                </div>
              </div>
            </Card>
            <Card variant="ios" className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Long Wandering Lead</h4>
                  <p className="text-white/60 text-sm">Use a long test lead from CU for efficient testing of multiple points</p>
                </div>
              </div>
            </Card>
            <Card variant="ios" className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Don't Trust Colours Alone</h4>
                  <p className="text-white/60 text-sm">Always test - wiring errors can occur regardless of conductor colours</p>
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
            title="Polarity Quick Reference"
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
            onClick={() => navigate('/study-centre/apprentice/study/inspection-testing/module7/section2')}
          >
            Continue to Section 2
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

export default InspectionTestingModule7Section1;
