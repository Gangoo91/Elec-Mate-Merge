import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Zap, CheckCircle2, AlertTriangle, CircleDashed, Calculator, Lightbulb, XCircle, ChevronDown, ChevronUp, FileText, Shield, Activity, GitBranch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import UnitsPocketCard from '@/components/apprentice-courses/UnitsPocketCard';
import useSEO from '@/hooks/useSEO';

const InspectionTestingModule3Section2 = () => {
  useSEO({
    title: "Ring Final Circuit Continuity | Continuity Testing | Inspection & Testing",
    description: "Master the three-step ring final circuit continuity test. Learn to verify ring integrity, identify interconnections, spurs, and calculate R1+R2 for ring circuits."
  });

  const navigate = useNavigate();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const defined_learningOutcomes = [
    { id: 1, text: "Explain the purpose and importance of ring final circuit testing", icon: CircleDashed },
    { id: 2, text: "Execute the three-step ring continuity test procedure correctly", icon: Activity },
    { id: 3, text: "Identify ring circuit faults: broken rings, interconnections, and bridged conductors", icon: GitBranch },
    { id: 4, text: "Calculate and verify expected resistance values at each test step", icon: Calculator },
    { id: 5, text: "Determine R1+R2 values from ring test results", icon: Shield },
    { id: 6, text: "Test spurs and extensions from ring circuits correctly", icon: Lightbulb }
  ];

  const defined_faqs = [
    {
      question: "Why is the ring final circuit test so complex compared to radial circuit testing?",
      answer: "A ring circuit has two parallel paths for current to flow - both legs of the ring. Testing must verify: both legs are continuous (no breaks), they connect to form a complete ring, there are no interconnections between rings, and the correct conductors are connected. The three-step process systematically confirms all these requirements. A simple end-to-end test wouldn't reveal breaks in one leg or interconnections."
    },
    {
      question: "What does it mean if Step 1 readings aren't within 0.05Ω of each other?",
      answer: "If the end-to-end readings for L, N, and CPC differ by more than about 0.05Ω, this suggests: different cable sizes used in the ring, unequal leg lengths (ring doesn't follow the same route both ways), loose connections in one leg, or damage to one leg. All three conductors should follow the same physical route, so their end-to-end resistances should be very similar (allowing for the different CSA of the CPC)."
    },
    {
      question: "How do I identify an interconnection with another ring?",
      answer: "Interconnections typically show up as lower than expected readings at affected sockets. If two rings are bridged, current can flow through the other ring's conductors, reducing measured resistance. The Step 3 readings will not be consistent around the ring - some sockets will show abnormally low readings. Also, Step 1 end-to-end readings may be unexpectedly low if the interconnection creates additional parallel paths."
    },
    {
      question: "What is a 'figure of 8' pattern and why is it used?",
      answer: "The figure of 8 refers to Steps 2 and 3 where you cross-connect conductors (L to L' and N to N', then L to CPC and L' to CPC'). When you then measure at each socket, current flows around the ring in a figure-of-8 pattern. This clever arrangement means every socket should give the same reading regardless of its position - about half the end-to-end value. This makes fault detection simple: any socket with a significantly different reading indicates a problem at that point."
    },
    {
      question: "Can I use the ring test to find which socket has a fault?",
      answer: "Yes - this is one of the test's great benefits. When properly cross-connected for Step 3, every socket should give approximately the same R1+R2 reading. If one socket gives a significantly higher reading, the fault is likely at or near that socket (loose connection, damaged conductor). If a socket gives a significantly lower reading, there may be an interconnection with another circuit at that point."
    },
    {
      question: "What happens to spurs during ring circuit testing?",
      answer: "Unfused spurs connected from the ring will show higher readings than the ring sockets because the spur adds extra cable length. When testing at a spur, you measure the ring R1+R2 plus the resistance of the spur cable to that point. This is normal and expected - record the value for the spur. The ring itself should still show consistent readings at non-spur points."
    },
    {
      question: "Do I need to test every socket on a ring circuit?",
      answer: "For thorough testing, yes - test at every socket during Step 3. This is the only way to verify the complete ring integrity and identify problems at individual points. Some practitioners test only a sample, but this could miss faults at untested sockets. At minimum, test at the closest and furthest points, but best practice is every socket."
    },
    {
      question: "Why might Step 2 give different readings to Step 3?",
      answer: "Step 2 (N-N cross-connected) and Step 3 (L-CPC cross-connected) test different conductor combinations. Step 2 measures primarily the line conductors plus neutral; Step 3 measures line plus CPC. Since the CPC is often a smaller CSA (higher resistance per metre), Step 3 readings are typically slightly higher than Step 2. They should follow the same pattern around the ring though - consistent readings at each socket."
    }
  ];

  const quizQuestions = [
    {
      question: "What is the purpose of the ring final circuit continuity test?",
      options: ["To measure insulation resistance", "To verify ring integrity and detect breaks, interconnections, and faults", "To test RCD operation", "To measure earth fault loop impedance"],
      correctAnswer: 1,
      explanation: "The ring test verifies the complete ring is intact (no breaks), there are no interconnections with other rings, the correct conductors are connected, and provides R1+R2 values for each socket position."
    },
    {
      question: "In Step 1 of the ring test, what is measured?",
      options: ["Insulation between L and N", "End-to-end resistance of each conductor (L, N, CPC separately)", "R1+R2 at each socket", "Voltage at each socket"],
      correctAnswer: 1,
      explanation: "Step 1 measures the end-to-end resistance of each conductor separately (L-L', N-N', CPC-CPC') at the distribution board with the ring disconnected. These should all be similar values (for same-length legs)."
    },
    {
      question: "What should you expect for Step 1 end-to-end readings on a healthy ring?",
      options: ["All three readings exactly the same", "L and N similar, CPC slightly higher (smaller CSA)", "L highest, CPC lowest", "Random values depending on socket positions"],
      correctAnswer: 1,
      explanation: "L and N conductors are typically the same CSA so should have similar end-to-end resistance. CPC is often smaller (higher resistance per metre), so its end-to-end reading will be slightly higher, but similar pattern."
    },
    {
      question: "After cross-connecting for Step 2 or Step 3, what result indicates a healthy ring?",
      options: ["Readings increase from first to last socket", "Readings decrease from first to last socket", "All sockets give approximately the same reading", "The furthest socket gives double the first socket reading"],
      correctAnswer: 2,
      explanation: "The figure-of-8 configuration means every socket should give the same reading regardless of position - approximately half the Step 1 end-to-end value. Variations indicate faults at that position."
    },
    {
      question: "If one socket shows a significantly higher reading than others during Step 3, what does this indicate?",
      options: ["That socket is closest to the DB", "There's likely a loose connection or damaged conductor at or near that socket", "The socket is correctly wired", "This is normal for the middle socket of the ring"],
      correctAnswer: 1,
      explanation: "Higher resistance at one socket indicates increased resistance at that point - typically a loose connection, corroded terminal, or damaged conductor. The fault location is at or immediately before that socket."
    },
    {
      question: "What does a lower than expected reading at a socket during the ring test suggest?",
      options: ["Excellent wiring quality", "A possible interconnection with another circuit", "The socket is at the midpoint", "The socket is closest to the consumer unit"],
      correctAnswer: 1,
      explanation: "Lower than expected readings suggest parallel paths exist - typically an interconnection with another ring circuit. Current can flow through the other circuit's conductors, reducing measured resistance."
    },
    {
      question: "How do you calculate R1+R2 for a ring circuit from the test results?",
      options: ["Double the Step 1 readings", "Add all three Step 1 readings together", "Use the Step 3 readings directly - they are R1+R2", "Divide Step 1 readings by 2"],
      correctAnswer: 2,
      explanation: "The Step 3 readings (with L cross-connected to CPC) give R1+R2 directly at each socket. No calculation needed - the cross-connection configuration puts R1 and R2 in series automatically."
    },
    {
      question: "When testing a spur from a ring circuit, what reading should you expect compared to the ring sockets?",
      options: ["Lower reading (spur is shorter)", "Same reading as the ring sockets", "Higher reading (adds spur cable length)", "Zero reading (spurs are not earthed)"],
      correctAnswer: 2,
      explanation: "Spurs add additional cable length beyond the ring. The measured R1+R2 at a spur socket equals the ring R1+R2 at the junction box PLUS the resistance of the spur cable to that point."
    },
    {
      question: "What is the relationship between Step 1 end-to-end reading and Step 3 socket readings for a healthy ring?",
      options: ["Step 3 = Step 1 × 2", "Step 3 ≈ Step 1 ÷ 4 (approximately quarter)", "Step 3 ≈ Step 1 ÷ 2 (approximately half)", "No relationship - they measure different things"],
      correctAnswer: 2,
      explanation: "For a healthy ring, Step 3 readings at each socket should be approximately half of the relevant Step 1 end-to-end reading. This is because the cross-connection creates two parallel half-ring paths to every socket."
    },
    {
      question: "What indicates that a ring circuit is actually wired as two radials incorrectly connected?",
      options: ["Step 3 readings are all identical", "Step 1 readings are zero", "End-to-end readings are very low but socket readings vary significantly around the ring", "Step 3 readings vary from very low to double the expected value moving around the ring"],
      correctAnswer: 3,
      explanation: "If supposedly a ring is actually two radials joined, the pattern will show: first socket very low (almost zero), increasing through the ring, last socket showing full end-to-end value. A true ring gives the same reading at every socket."
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* iOS-style Header */}
      <header className="sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between px-4 h-14">
          <button
            onClick={() => navigate('/study-centre/apprentice/upskilling/inspection-testing/module3')}
            className="flex items-center text-elec-yellow touch-target"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            <span className="text-sm font-medium">Module 3</span>
          </button>
          <span className="text-xs text-white/50 font-medium">Section 2 of 6</span>
        </div>
      </header>

      <main className="pb-24">
        {/* Hero Section */}
        <section className="px-4 pt-6 pb-8">
          <Badge className="bg-elec-yellow/20 text-elec-yellow border-0 mb-3">
            Module 3 • Continuity Testing
          </Badge>
          <h1 className="text-ios-title-large font-bold text-white mb-3">
            Ring Final Circuit Continuity
          </h1>
          <p className="text-white/70 text-ios-body leading-relaxed">
            Master the three-step ring test - the definitive method for verifying ring final circuit integrity and identifying breaks, interconnections, and wiring faults.
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
                • <strong>Step 1:</strong> End-to-end resistance of L, N, CPC separately (should be similar)
              </p>
              <p className="text-white/90 text-sm leading-relaxed">
                • <strong>Steps 2&3:</strong> Cross-connect and test at every socket (all should read the same)
              </p>
              <p className="text-white/90 text-sm leading-relaxed">
                • <strong>Step 3 readings</strong> give R1+R2 directly for each socket position
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

        {/* Section 01: Why Ring Testing is Different */}
        <section className="px-4 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-elec-yellow/30">01</span>
            <h2 className="text-ios-title-2 font-bold text-white">Why Ring Testing is Different</h2>
          </div>

          <Card variant="ios" className="bg-white/5 border-white/10 mb-4">
            <CardContent className="p-5 space-y-4">
              <p className="text-white/90 leading-relaxed">
                A ring final circuit provides two parallel paths for current. This improves current capacity but creates testing complexity - a simple end-to-end test cannot confirm the ring is properly formed.
              </p>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">Ring Circuit Characteristics</h4>
                <div className="space-y-3">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-elec-yellow font-medium mb-1">Two Parallel Paths</p>
                    <p className="text-white/70 text-sm">Current can flow either way around the ring to reach any socket - this doubles the effective current capacity.</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-elec-yellow font-medium mb-1">Both Legs Must Be Continuous</p>
                    <p className="text-white/70 text-sm">A break in one leg makes it a radial - still works but with reduced capacity and protection issues.</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-elec-yellow font-medium mb-1">No Interconnections</p>
                    <p className="text-white/70 text-sm">If two rings share a connection point, protective device discrimination is compromised.</p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-amber-400 font-semibold mb-1">Common Ring Faults</h4>
                    <ul className="text-white/80 text-sm space-y-1">
                      <li>• <strong>Broken ring:</strong> One leg disconnected (functions as radial)</li>
                      <li>• <strong>Interconnection:</strong> Connected to another ring</li>
                      <li>• <strong>Cross-connection:</strong> L and N swapped in one leg</li>
                      <li>• <strong>Missing earth:</strong> CPC not continuous in one leg</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 02: Step 1 - End-to-End Testing */}
        <section className="px-4 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-elec-yellow/30">02</span>
            <h2 className="text-ios-title-2 font-bold text-white">Step 1: End-to-End Testing</h2>
          </div>

          <Card variant="ios" className="bg-white/5 border-white/10 mb-4">
            <CardContent className="p-5 space-y-4">
              <p className="text-white/90 leading-relaxed">
                Step 1 measures the resistance of each conductor's complete loop around the ring. This verifies continuity and establishes baseline values.
              </p>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">Step 1 Procedure</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-red-400 font-bold text-sm">1</span>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">Disconnect Both Ring Ends</p>
                      <p className="text-white/60 text-xs">Both legs disconnected from DB terminals</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-red-400 font-bold text-sm">2</span>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">Null Test Leads</p>
                      <p className="text-white/60 text-xs">Zero the instrument</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-red-400 font-bold text-sm">3</span>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">Test L to L' (Line to Line)</p>
                      <p className="text-white/60 text-xs">Record the reading (e.g., 0.52Ω)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-400 font-bold text-sm">4</span>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">Test N to N' (Neutral to Neutral)</p>
                      <p className="text-white/60 text-xs">Record the reading (should ≈ L reading)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-green-400 font-bold text-sm">5</span>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">Test CPC to CPC'</p>
                      <p className="text-white/60 text-xs">Record the reading (typically slightly higher if smaller CSA)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">Expected Step 1 Results</h4>
                <div className="bg-[#1a1a1a] rounded-lg p-3">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left text-white/60 py-2">Conductor</th>
                        <th className="text-center text-white/60 py-2">Typical Reading</th>
                        <th className="text-left text-white/60 py-2">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="text-white/80">
                      <tr className="border-b border-white/5">
                        <td className="py-2 text-red-400">L-L'</td>
                        <td className="text-center py-2">0.52Ω</td>
                        <td className="py-2 text-xs">2.5mm² around ring</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 text-blue-400">N-N'</td>
                        <td className="text-center py-2">0.52Ω</td>
                        <td className="py-2 text-xs">Should match L-L'</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-green-400">CPC-CPC'</td>
                        <td className="text-center py-2">0.86Ω</td>
                        <td className="py-2 text-xs">1.5mm² = higher R</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-blue-400 font-semibold mb-1">Key Check</h4>
                    <p className="text-white/80 text-sm">
                      L and N readings should be within 0.05Ω of each other. If they differ significantly, it suggests unequal leg lengths or a problem in one leg. CPC will typically be higher due to smaller cross-section.
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
            question="In Step 1, if the L-L' reading is 0.48Ω and N-N' reading is 0.72Ω, what does this suggest?"
            correctAnswer="A problem in one leg of the neutral conductor - either damage, loose connection, or different cable size used in part of the ring"
            explanation="The L and N conductors should follow the same physical route and be the same size. A significant difference suggests unequal paths or a fault in one leg. This would need investigation before proceeding."
          />
        </section>

        {/* Section 03: Steps 2 and 3 - Cross-Connection Testing */}
        <section className="px-4 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-elec-yellow/30">03</span>
            <h2 className="text-ios-title-2 font-bold text-white">Steps 2 & 3: Cross-Connection Testing</h2>
          </div>

          <Card variant="ios" className="bg-white/5 border-white/10 mb-4">
            <CardContent className="p-5 space-y-4">
              <p className="text-white/90 leading-relaxed">
                Steps 2 and 3 use a "figure of 8" configuration that makes fault detection simple - every socket on a healthy ring should give the same reading.
              </p>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">Step 2: Cross-Connect L with N</h4>
                <div className="space-y-2 text-white/80 text-sm">
                  <p><strong>Connect:</strong> L of one leg to N of other leg (and vice versa)</p>
                  <p><strong>Measure:</strong> L-N at each socket around the ring</p>
                  <p><strong>Expected:</strong> All readings approximately equal (about half of Step 1)</p>
                  <p><strong>Purpose:</strong> Verifies L and N are correctly connected, no cross-wiring</p>
                </div>
              </div>

              <div className="bg-elec-yellow/10 rounded-xl p-4">
                <h4 className="text-elec-yellow font-semibold mb-3">Step 3: Cross-Connect L with CPC (The Key Test)</h4>
                <div className="space-y-2 text-white/80 text-sm">
                  <p><strong>Connect:</strong> L of one leg to CPC of other leg (and vice versa)</p>
                  <p><strong>Measure:</strong> L-E at each socket around the ring</p>
                  <p><strong>Expected:</strong> All readings approximately equal</p>
                  <p><strong>Result:</strong> This reading IS the R1+R2 value for each socket!</p>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">Why "Figure of 8" Works</h4>
                <div className="flex items-center justify-center my-4">
                  <div className="relative w-48 h-32">
                    <div className="absolute inset-0 border-2 border-elec-yellow/50 rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-elec-yellow rounded-full"></div>
                    <div className="absolute top-1/4 left-0 w-3 h-3 bg-white/50 rounded-full"></div>
                    <div className="absolute top-3/4 left-0 w-3 h-3 bg-white/50 rounded-full"></div>
                    <div className="absolute top-1/4 right-0 w-3 h-3 bg-white/50 rounded-full"></div>
                    <div className="absolute top-3/4 right-0 w-3 h-3 bg-white/50 rounded-full"></div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-white/50 text-xs">Socket positions</div>
                  </div>
                </div>
                <p className="text-white/70 text-sm text-center">
                  When cross-connected, current flows around both legs to reach any socket. Every socket has equal resistance because it's always halfway around both loops.
                </p>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-green-400 font-semibold mb-1">Step 3 Gives R1+R2 Directly</h4>
                    <p className="text-white/80 text-sm">
                      The Step 3 reading at each socket IS the R1+R2 value for that position. No calculation needed - just record the reading. For a ring, this should be approximately (r1+r2)/4 × total ring length.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 04: Interpreting Ring Test Results */}
        <section className="px-4 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-elec-yellow/30">04</span>
            <h2 className="text-ios-title-2 font-bold text-white">Interpreting Ring Test Results</h2>
          </div>

          <Card variant="ios" className="bg-white/5 border-white/10 mb-4">
            <CardContent className="p-5 space-y-4">
              <p className="text-white/90 leading-relaxed">
                Understanding what different patterns mean helps quickly identify the type and location of faults.
              </p>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">Result Patterns</h4>
                <div className="space-y-3">
                  <div className="bg-green-500/10 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-green-400 font-medium">All Sockets Equal (±5%)</span>
                      <span className="text-green-400">✓ Healthy Ring</span>
                    </div>
                    <p className="text-white/70 text-sm">All readings within 5% = ring is complete and correctly wired</p>
                  </div>

                  <div className="bg-amber-500/10 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-amber-400 font-medium">One Socket High</span>
                      <span className="text-amber-400">⚠ Local Fault</span>
                    </div>
                    <p className="text-white/70 text-sm">Loose connection or damaged conductor at or near that socket</p>
                  </div>

                  <div className="bg-amber-500/10 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-amber-400 font-medium">One Socket Low</span>
                      <span className="text-amber-400">⚠ Interconnection</span>
                    </div>
                    <p className="text-white/70 text-sm">Possible connection to another ring at that socket</p>
                  </div>

                  <div className="bg-red-500/10 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-red-400 font-medium">Progressive Increase</span>
                      <span className="text-red-400">✗ Broken Ring</span>
                    </div>
                    <p className="text-white/70 text-sm">Values rising from one end = one leg broken, actually a radial</p>
                  </div>

                  <div className="bg-red-500/10 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-red-400 font-medium">Open Circuit at One Socket</span>
                      <span className="text-red-400">✗ Break Location</span>
                    </div>
                    <p className="text-white/70 text-sm">Break is between that socket and the previous one tested</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">Example: Broken Ring Pattern</h4>
                <div className="bg-[#1a1a1a] rounded-lg p-3 font-mono text-xs">
                  <p className="text-white/60 mb-2">Socket readings around "ring" with break:</p>
                  <table className="w-full text-white/80">
                    <tbody>
                      <tr><td>Socket 1:</td><td className="text-green-400">0.15Ω</td><td className="text-white/50">Near start</td></tr>
                      <tr><td>Socket 2:</td><td className="text-yellow-400">0.28Ω</td><td className="text-white/50">Increasing...</td></tr>
                      <tr><td>Socket 3:</td><td className="text-orange-400">0.42Ω</td><td className="text-white/50">Still rising...</td></tr>
                      <tr><td>Socket 4:</td><td className="text-red-400">0.56Ω</td><td className="text-white/50">Near break!</td></tr>
                    </tbody>
                  </table>
                  <p className="text-red-400 mt-2">Pattern shows this is a radial, not a ring</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Inline Check 2 */}
        <section className="px-4 mb-8">
          <InlineCheck
            question="During Step 3 testing, four sockets read 0.26Ω and one socket reads 0.18Ω. What does this indicate?"
            correctAnswer="Possible interconnection with another circuit at the low-reading socket - current may be flowing through a parallel path"
            explanation="Lower than expected readings suggest additional paths for current flow. An interconnection with another ring allows current to bypass part of the ring being tested, reducing the measured resistance at that point."
          />
        </section>

        {/* Section 05: Testing Spurs */}
        <section className="px-4 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-elec-yellow/30">05</span>
            <h2 className="text-ios-title-2 font-bold text-white">Testing Spurs from Ring Circuits</h2>
          </div>

          <Card variant="ios" className="bg-white/5 border-white/10 mb-4">
            <CardContent className="p-5 space-y-4">
              <p className="text-white/90 leading-relaxed">
                Unfused spurs connected from the ring will show readings that include the spur cable resistance on top of the ring R1+R2. This is expected behaviour.
              </p>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">Spur Test Procedure</h4>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Test at the spur socket with Step 3 configuration still in place</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Reading = Ring R1+R2 at junction + Spur cable R1+R2</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Will always be higher than ring socket readings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Record this higher value for the spur socket</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-500/10 rounded-xl p-4">
                <h4 className="text-green-400 font-semibold mb-2">Example: Spur Calculation</h4>
                <div className="text-white/80 text-sm space-y-2">
                  <p><strong>Ring R1+R2 at junction:</strong> 0.26Ω</p>
                  <p><strong>Spur length:</strong> 5m of 2.5/1.5mm² T&E</p>
                  <p><strong>Spur R1+R2:</strong> 5 × 0.01951 = 0.10Ω</p>
                  <p><strong>Total at spur socket:</strong> 0.26 + 0.10 = <span className="text-elec-yellow font-bold">0.36Ω</span></p>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-blue-400 font-semibold mb-1">Identifying Spurs</h4>
                    <p className="text-white/80 text-sm">
                      During testing, spur sockets are identified by their higher readings. If you don't know which are spurs beforehand, the test results will show you - spurs will read higher than the ring average.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 06: Recording Ring Test Results */}
        <section className="px-4 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-elec-yellow/30">06</span>
            <h2 className="text-ios-title-2 font-bold text-white">Recording Ring Test Results</h2>
          </div>

          <Card variant="ios" className="bg-white/5 border-white/10 mb-4">
            <CardContent className="p-5 space-y-4">
              <p className="text-white/90 leading-relaxed">
                Ring circuit test results are recorded on the schedule of test results. The format allows all key values to be recorded systematically.
              </p>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">Values to Record</h4>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span><strong>r1:</strong> Line end-to-end divided by total cable length (mΩ/m)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span><strong>rn:</strong> Neutral end-to-end divided by total cable length (mΩ/m)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span><strong>r2:</strong> CPC end-to-end divided by total cable length (mΩ/m)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span><strong>R1+R2:</strong> The highest Step 3 reading (worst case for Zs)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">Schedule Entry Example</h4>
                <div className="bg-[#1a1a1a] rounded-lg p-3 font-mono text-xs overflow-x-auto">
                  <table className="w-full text-white/80">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-1">Circuit</th>
                        <th className="text-center py-1">r1</th>
                        <th className="text-center py-1">rn</th>
                        <th className="text-center py-1">r2</th>
                        <th className="text-center py-1 text-elec-yellow">R1+R2</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-1">Ring Sockets</td>
                        <td className="text-center py-1">0.52Ω</td>
                        <td className="text-center py-1">0.52Ω</td>
                        <td className="text-center py-1">0.86Ω</td>
                        <td className="text-center py-1 text-elec-yellow">0.35Ω</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-white/50 text-xs mt-2">R1+R2 recorded is the highest value from Step 3 testing</p>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-amber-400 font-semibold mb-1">Use Highest R1+R2</h4>
                    <p className="text-white/80 text-sm">
                      For Zs verification and circuit protection checks, always use the highest R1+R2 measured during Step 3. This is the worst-case value and ensures protection is adequate at all points.
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
            question="If Step 1 end-to-end reading is 0.52Ω, what should the Step 3 readings at each socket approximately equal?"
            correctAnswer="Approximately 0.26Ω (half of the Step 1 value) - because the figure-of-8 configuration creates two parallel paths"
            explanation="The cross-connection creates two half-ring paths in parallel. This means the reading at any socket is approximately half the full end-to-end resistance, as current flows both ways around the ring."
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
                  <li>• Label the ring legs (Leg 1 and Leg 2) to keep track during testing</li>
                  <li>• Take photos of connections at DB before disconnecting</li>
                  <li>• Test every socket - don't skip any for a thorough verification</li>
                  <li>• Record readings as you go - don't try to remember them all</li>
                  <li>• Use a long wandering lead for easier socket testing</li>
                </ul>
              </div>

              <div className="bg-red-500/10 rounded-xl p-4">
                <h4 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
                  <XCircle className="w-5 h-5" />
                  Common Mistakes
                </h4>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li>• Cross-connecting wrong conductors (L to L' instead of L to N')</li>
                  <li>• Forgetting to null test leads before starting</li>
                  <li>• Testing only a few sockets instead of all</li>
                  <li>• Not recording Step 1 values before proceeding</li>
                  <li>• Misidentifying which leg is which at the DB</li>
                </ul>
              </div>

              <div className="bg-blue-500/10 rounded-xl p-4">
                <h4 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                  <CircleDashed className="w-5 h-5" />
                  Key References
                </h4>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li>• <strong>BS 7671:</strong> Regulation 314.1 - Division of installation</li>
                  <li>• <strong>GN3:</strong> Ring final circuit testing procedure</li>
                  <li>• <strong>Appendix 15:</strong> Ring circuit continuity test method</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* FAQs */}
        <section className="px-4 mb-8">
          <h2 className="text-ios-headline font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {defined_faqs.map((faq, index) => (
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
            title="Ring Test Quick Reference"
            items={[
              { term: "Step 1", definition: "End-to-end L-L', N-N', CPC-CPC' at DB" },
              { term: "Step 1 Result", definition: "L and N similar, CPC slightly higher" },
              { term: "Step 2", definition: "Cross L with N', measure L-N at each socket" },
              { term: "Step 3", definition: "Cross L with CPC', measure L-E at each socket" },
              { term: "Healthy Ring", definition: "All sockets give same reading (±5%)" },
              { term: "Step 3 Value", definition: "≈ Half of Step 1 = R1+R2 directly" },
              { term: "Spurs", definition: "Read higher than ring (add spur cable R)" }
            ]}
          />
        </section>

        {/* Quiz */}
        <section className="px-4 mb-8">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="px-4 pb-safe">
          <div className="flex gap-3">
            <Button
              variant="ios-secondary"
              className="flex-1 h-12"
              onClick={() => navigate('/study-centre/apprentice/upskilling/inspection-testing/module3/section1')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button
              variant="ios-primary"
              className="flex-1 h-12"
              onClick={() => navigate('/study-centre/apprentice/upskilling/inspection-testing/module3/section3')}
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

export default InspectionTestingModule3Section2;
