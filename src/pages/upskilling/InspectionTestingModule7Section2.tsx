import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Clock, Target, CheckCircle2, AlertTriangle, ChevronDown, Zap, Plug, Lightbulb, Home, Building, Settings, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import useSEO from '@/hooks/useSEO';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import UnitsPocketCard from '@/components/apprentice-courses/UnitsPocketCard';

const InspectionTestingModule7Section2 = () => {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  useSEO({
    title: "Single-Phase Polarity Verification | Module 7 Section 2 | Inspection & Testing",
    description: "Learn detailed techniques for verifying polarity on single-phase circuits including sockets, lighting, and switches in domestic and commercial installations."
  });

  const learningOutcomes = [
    { icon: Plug, text: "Verify polarity at socket outlet circuits" },
    { icon: Lightbulb, text: "Test polarity on lighting circuits with switches" },
    { icon: Home, text: "Apply testing to domestic installations" },
    { icon: Building, text: "Extend techniques to commercial environments" },
    { icon: Settings, text: "Use correct test equipment and methods" },
    { icon: Wrench, text: "Troubleshoot polarity faults" }
  ];

  const quizQuestions = [
    {
      question: "When testing socket outlet polarity with a continuity tester, which terminals should show continuity to their respective CU terminals?",
      options: [
        "Only line and neutral",
        "Only line and earth",
        "Line, neutral, and earth to their respective terminals",
        "Any terminals - they're interchangeable"
      ],
      correctAnswer: 2,
      explanation: "Each socket terminal (L, N, E) must show continuity only to its corresponding terminal at the consumer unit, confirming correct wiring throughout."
    },
    {
      question: "On a lighting circuit with the switch OFF, testing between line at CU and the lamp holder centre contact should show:",
      options: [
        "Continuity (low resistance)",
        "Open circuit (no continuity)",
        "High resistance (megohms)",
        "Voltage present"
      ],
      correctAnswer: 1,
      explanation: "With the switch off, the circuit is broken, so no continuity should exist between line at CU and the lamp holder. This proves the switch is in the line conductor."
    },
    {
      question: "A two-way lighting circuit has polarity correct when:",
      options: [
        "Either switch can control the light",
        "The common terminal of each switch is in the line or switched live respectively",
        "Both switches are in the neutral",
        "Only one switch works at a time"
      ],
      correctAnswer: 1,
      explanation: "For correct two-way polarity, the line feeds the common terminal of one switch, and the common terminal of the second switch feeds the lamp. Strappers connect the L1 and L2 terminals."
    },
    {
      question: "Testing polarity at a switched fused connection unit (FCU), the switch should break:",
      options: [
        "The neutral conductor only",
        "The line conductor only",
        "Both line and neutral",
        "The earth conductor"
      ],
      correctAnswer: 1,
      explanation: "Like all single-pole switches, the switch in an FCU must break the line conductor only. The neutral passes straight through."
    },
    {
      question: "At a cooker control unit with socket, correct polarity means:",
      options: [
        "The neon indicator lights when switched on",
        "Both socket and cooker outlet have correct L, N, E, and switch is in line",
        "The socket works independently of the switch",
        "The cooker can be isolated"
      ],
      correctAnswer: 1,
      explanation: "Correct polarity requires the socket and cooker outlet both have correct L, N, and E connections, with the switch controlling the line to the cooker circuit."
    },
    {
      question: "When using a socket tester, a typical indication for correct wiring is:",
      options: [
        "All three LEDs lit",
        "Specific LED pattern as per manufacturer's chart",
        "No LEDs lit",
        "Buzzer sounds"
      ],
      correctAnswer: 1,
      explanation: "Socket testers use LED patterns to indicate wiring status. The correct pattern varies by manufacturer but typically shows two LEDs for correct wiring. Always refer to the device's indication chart."
    },
    {
      question: "Testing polarity at a ceiling rose for a pendant lamp, the line should connect to:",
      options: [
        "The outer sleeve contact of the lamp holder",
        "The centre contact of the lamp holder (via switch)",
        "Directly to the lamp holder earth terminal",
        "The neutral terminal of the ceiling rose"
      ],
      correctAnswer: 1,
      explanation: "The switched line should connect to the centre contact of the lamp holder (the safest contact when changing lamps), while neutral connects to the outer sleeve."
    },
    {
      question: "A ring final circuit has 12 socket outlets. Polarity testing requires checking:",
      options: [
        "Just the first and last sockets",
        "Random selection of 3 sockets",
        "All 12 socket outlets",
        "Only sockets near the consumer unit"
      ],
      correctAnswer: 2,
      explanation: "Polarity must be verified at every point of utilisation. All 12 sockets must be tested as wiring errors can occur at any point in the circuit."
    },
    {
      question: "Which test should be performed BEFORE polarity testing on a circuit?",
      options: [
        "Insulation resistance",
        "RCD testing",
        "Safe isolation and proving dead",
        "Earth fault loop impedance"
      ],
      correctAnswer: 2,
      explanation: "Safe isolation must be performed and the circuit proved dead before any continuity-based polarity testing. This is a fundamental safety requirement."
    },
    {
      question: "A bathroom shaver socket has isolation transformer. Correct polarity means:",
      options: [
        "Line connects to the primary winding",
        "The socket is earthed",
        "Both outlets show 240V",
        "There is no polarity requirement due to isolation"
      ],
      correctAnswer: 0,
      explanation: "Even with an isolation transformer, the supply-side polarity must be correct with line feeding the primary through any switch, ensuring proper isolation when switched off."
    }
  ];

  const faqData = [
    {
      question: "How do I test polarity on a two-way switched lighting circuit?",
      answer: "Test that the line at CU connects to the common terminal of the first switch. With both switches in one position, verify continuity from the second switch common terminal to the lamp centre contact. The strappers (L1 and L2) should interconnect both switches regardless of switch positions."
    },
    {
      question: "Can I use the R1+R2 test to verify polarity?",
      answer: "Yes, the R1+R2 test inherently verifies polarity if performed correctly. By testing continuity between line at the origin and the line terminal at each socket (with a link at the CU), you confirm the line conductor runs to the correct terminal throughout."
    },
    {
      question: "What if I find reversed polarity at a single socket on a ring circuit?",
      answer: "This indicates incorrect wiring at that specific socket - the line and neutral conductors have been swapped at that accessory. The socket must be rewired correctly. Check how the fault occurred to identify if other points need verification."
    },
    {
      question: "Do I need to test polarity at junction boxes?",
      answer: "Junction boxes themselves don't have polarity requirements, but any switches or outlets fed from them do. You must verify that line conductors continue correctly through junction boxes to their destinations."
    },
    {
      question: "How should polarity be tested on a circuit with intermediate switches?",
      answer: "Verify the line at CU connects to one two-way switch common. With all switches in the correct positions, there should be continuity through the strappers, intermediates, to the second two-way switch common, and to the lamp centre contact."
    },
    {
      question: "What's the most common cause of polarity errors?",
      answer: "Incorrect termination at accessories - connecting brown to N terminal and blue to L terminal. This often happens due to rushing, poor lighting, or confusion with old colour codes. Always double-check connections before replacing faceplates."
    }
  ];

  const pocketCardUnits = [
    { name: "Socket L Terminal", symbol: "Brown", unit: "line" },
    { name: "Socket N Terminal", symbol: "Blue", unit: "neutral" },
    { name: "Socket E Terminal", symbol: "G/Y", unit: "CPC" },
    { name: "Switch COM", symbol: "Line in", unit: "" },
    { name: "ES Centre", symbol: "Line", unit: "switched" },
    { name: "ES Outer", symbol: "Neutral", unit: "" }
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
          <span className="text-white/60 text-sm">2 of 5</span>
        </div>
      </header>

      <main className="px-4 py-6 pb-safe max-w-2xl mx-auto">
        {/* Hero Section */}
        <section className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-rose-500/20 rounded-full mb-4">
            <span className="text-rose-400 text-sm font-medium">Module 7 • Polarity & Functional Testing</span>
          </div>
          <h1 className="text-ios-title-large text-white font-bold mb-3">
            Single-Phase Polarity Verification
          </h1>
          <p className="text-white/70 text-ios-body leading-relaxed">
            Detailed techniques for verifying polarity on socket outlets, lighting circuits, and switches in single-phase installations.
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
                <span className="text-white/80 text-base">Test every socket - L to L, N to N, E to E from CU</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0" />
                <span className="text-white/80 text-base">Switch OFF: no continuity from CU line to lamp centre</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0" />
                <span className="text-white/80 text-base">Switch ON: continuity from CU line to lamp centre</span>
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
            <h2 className="text-xl font-semibold text-white">Socket Outlet Testing</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                Socket outlets require verification that each terminal is connected to the correct conductor throughout the circuit. Using a long wandering lead from the consumer unit:
              </p>
              <div className="bg-white/5 rounded-xl p-4 border border-rose-500/20">
                <h4 className="text-rose-400 font-semibold mb-3">Socket Polarity Test Steps</h4>
                <ol className="space-y-3 text-white/70">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 text-sm flex items-center justify-center shrink-0">1</span>
                    <span>Isolate circuit, prove dead at each socket</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 text-sm flex items-center justify-center shrink-0">2</span>
                    <span>Connect long lead to LINE terminal at CU outgoing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 text-sm flex items-center justify-center shrink-0">3</span>
                    <span>At socket: test to L terminal - should show continuity</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 text-sm flex items-center justify-center shrink-0">4</span>
                    <span>Test to N and E - should show NO continuity (open circuit)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 text-sm flex items-center justify-center shrink-0">5</span>
                    <span>Repeat for N and E from their respective CU terminals</span>
                  </li>
                </ol>
              </div>
            </div>
          </Card>
        </section>

        {/* Content Section 02 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-rose-400/30">02</span>
            <h2 className="text-xl font-semibold text-white">Lighting Circuit Testing</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                Lighting circuits must verify that the switch is in the line conductor, ensuring the lamp holder is dead when switched off:
              </p>
              <div className="space-y-4">
                <div className="bg-white/5 rounded-xl p-4 border border-rose-500/20">
                  <h4 className="text-rose-400 font-semibold mb-2">Switch Position Test</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="p-3 bg-white/5 rounded-lg">
                      <span className="text-rose-400 font-semibold">Switch OFF:</span>
                      <p className="text-white/60 mt-1">CU Line → Lamp centre = OPEN</p>
                    </div>
                    <div className="p-3 bg-white/5 rounded-lg">
                      <span className="text-rose-400 font-semibold">Switch ON:</span>
                      <p className="text-white/60 mt-1">CU Line → Lamp centre = CONTINUITY</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-rose-500/20">
                  <h4 className="text-rose-400 font-semibold mb-2">Neutral Continuity</h4>
                  <p className="text-white/70 text-sm">CU Neutral → Lamp outer sleeve = CONTINUITY (always, regardless of switch position)</p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* InlineCheck */}
        <div className="mb-8">
          <InlineCheck
            question="With the light switch OFF, you test from CU line to the lamp holder centre contact and find continuity. What does this indicate?"
            answer="The switch is incorrectly wired in the neutral conductor. The lamp holder remains live when switched off - this is a dangerous condition requiring immediate rectification."
            color="rose"
          />
        </div>

        {/* Content Section 03 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-rose-400/30">03</span>
            <h2 className="text-xl font-semibold text-white">Two-Way Switching</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                Two-way lighting circuits require careful polarity verification to ensure the line feeds through both switches correctly:
              </p>
              <div className="bg-white/5 rounded-xl p-4 border border-rose-500/20">
                <h4 className="text-rose-400 font-semibold mb-3">Two-Way Circuit Polarity</h4>
                <ul className="space-y-2 text-white/70 text-sm">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-rose-400 shrink-0" />
                    <span><strong>Switch 1 COM:</strong> Receives permanent line from CU</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-rose-400 shrink-0" />
                    <span><strong>Switch 1 L1 & L2:</strong> Connect to switch 2 L1 & L2 (strappers)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-rose-400 shrink-0" />
                    <span><strong>Switch 2 COM:</strong> Supplies switched line to lamp</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-rose-400 shrink-0" />
                    <span><strong>Neutral:</strong> Direct to lamp (not through switches)</span>
                  </li>
                </ul>
              </div>
              <div className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-white/70 text-sm">
                    <strong className="text-amber-400">Testing tip:</strong> When testing two-way circuits, you may need to operate switches to different positions to verify all connections.
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
            <h2 className="text-xl font-semibold text-white">Switched FCUs and Cooker Outlets</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                Fused connection units and cooker control outlets have internal switches that must be verified for correct polarity:
              </p>
              <div className="space-y-3">
                <div className="bg-white/5 rounded-xl p-4 border border-rose-500/20">
                  <h4 className="text-rose-400 font-semibold mb-2">Switched FCU Testing</h4>
                  <ul className="space-y-2 text-white/70 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 text-rose-400 shrink-0" />
                      <span>Supply L to L IN terminal</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 text-rose-400 shrink-0" />
                      <span>L OUT to load (through fuse and switch)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 text-rose-400 shrink-0" />
                      <span>N passes straight through to load</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 text-rose-400 shrink-0" />
                      <span>E continuous through to load</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-rose-500/20">
                  <h4 className="text-rose-400 font-semibold mb-2">Cooker Control Unit</h4>
                  <p className="text-white/70 text-sm">Verify the cooker switch breaks the line conductor to both the cooker outlet and any integrated socket. The socket should have correct individual polarity.</p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* InlineCheck */}
        <div className="mb-8">
          <InlineCheck
            question="At a switched FCU with the switch OFF, should there be continuity between the supply line and the load line terminals?"
            answer="No. With the switch OFF, the internal switch (in series with the fuse) should break the line path, so there should be no continuity between supply and load line terminals."
            color="rose"
          />
        </div>

        {/* Content Section 05 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-rose-400/30">05</span>
            <h2 className="text-xl font-semibold text-white">Ring Final Circuit Considerations</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                Ring final circuits require polarity verification at every socket outlet, as errors can occur at any point in the ring:
              </p>
              <div className="bg-white/5 rounded-xl p-4 border border-rose-500/20">
                <h4 className="text-rose-400 font-semibold mb-3">Ring Circuit Polarity Test Strategy</h4>
                <ul className="space-y-2 text-white/70">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-1 text-rose-400 shrink-0" />
                    <span>Test every socket on the ring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-1 text-rose-400 shrink-0" />
                    <span>Include all spurs and their outlets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-1 text-rose-400 shrink-0" />
                    <span>R1+R2 test inherently checks polarity if done correctly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-1 text-rose-400 shrink-0" />
                    <span>Cross-reference with ring continuity test results</span>
                  </li>
                </ul>
              </div>
              <p>
                Remember that a broken ring can still have correct polarity at individual sockets. Polarity testing and ring continuity testing are separate verifications.
              </p>
            </div>
          </Card>
        </section>

        {/* Content Section 06 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-rose-400/30">06</span>
            <h2 className="text-xl font-semibold text-white">Troubleshooting Polarity Faults</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                When polarity faults are found, systematic investigation identifies the cause:
              </p>
              <div className="space-y-3">
                <div className="bg-white/5 rounded-xl p-4 border border-rose-500/20">
                  <h4 className="text-rose-400 font-semibold mb-2">Common Causes</h4>
                  <ul className="space-y-2 text-white/70 text-sm">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 mt-0.5 text-amber-400 shrink-0" />
                      <span>L and N reversed at individual accessory</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 mt-0.5 text-amber-400 shrink-0" />
                      <span>Crossed conductors in junction box</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 mt-0.5 text-amber-400 shrink-0" />
                      <span>Wrong connections at CU (rare)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 mt-0.5 text-amber-400 shrink-0" />
                      <span>Confusion with old/new colour codes</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-rose-500/20">
                  <h4 className="text-rose-400 font-semibold mb-2">Investigation Steps</h4>
                  <ol className="space-y-2 text-white/70 text-sm list-decimal list-inside">
                    <li>Check if fault affects single point or multiple</li>
                    <li>If multiple, trace back to common junction</li>
                    <li>Inspect terminations at affected points</li>
                    <li>Check junction boxes upstream</li>
                    <li>Verify CU connections if widespread</li>
                  </ol>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* InlineCheck */}
        <div className="mb-8">
          <InlineCheck
            question="Three socket outlets on a radial circuit all show reversed polarity, but sockets nearer the CU are correct. Where is the fault likely to be?"
            answer="The fault is likely in a junction box or the last correctly wired socket, where all cables for the affected section join. The L and N conductors have been crossed at that point, affecting all downstream outlets."
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
                  <h4 className="text-white font-medium mb-1">Combine with R1+R2</h4>
                  <p className="text-white/60 text-sm">Perform polarity verification as part of R1+R2 testing for efficiency</p>
                </div>
              </div>
            </Card>
            <Card variant="ios" className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Label As You Go</h4>
                  <p className="text-white/60 text-sm">Mark tested sockets to avoid missing any or re-testing</p>
                </div>
              </div>
            </Card>
            <Card variant="ios" className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Never Assume</h4>
                  <p className="text-white/60 text-sm">Even new installations can have wiring errors - always test</p>
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
            title="Single-Phase Polarity Reference"
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
            onClick={() => navigate('/study-centre/apprentice/study/inspection-testing/module7/section3')}
          >
            Continue to Section 3
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

export default InspectionTestingModule7Section2;
