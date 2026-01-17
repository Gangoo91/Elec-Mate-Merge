import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import UnitsPocketCard from "@/components/apprentice-courses/UnitsPocketCard";
import useSEO from "@/hooks/useSEO";

const TITLE = "Ring Final Circuit Continuity - Module 3 Section 2";
const DESCRIPTION = "Master the three-step ring final circuit continuity test. Learn to verify ring integrity, identify interconnections, spurs, and calculate R1+R2 for ring circuits.";

const quickCheckQuestions = [
  {
    id: "step1-readings",
    question: "In Step 1, if the L-L' reading is 0.48\u03A9 and N-N' reading is 0.72\u03A9, what does this suggest?",
    options: [
      "Normal variation between conductors",
      "A problem in one leg of the neutral conductor",
      "The ring is correctly wired",
      "Temperature affecting the readings"
    ],
    correctIndex: 1,
    explanation: "The L and N conductors should follow the same physical route and be the same size. A significant difference suggests unequal paths or a fault in one leg. This would need investigation before proceeding."
  },
  {
    id: "interconnection",
    question: "During Step 3 testing, four sockets read 0.26\u03A9 and one socket reads 0.18\u03A9. What does this indicate?",
    options: [
      "The low-reading socket is closest to the DB",
      "Possible interconnection with another circuit at the low-reading socket",
      "Normal ring circuit variation",
      "Faulty test equipment"
    ],
    correctIndex: 1,
    explanation: "Lower than expected readings suggest additional paths for current flow. An interconnection with another ring allows current to bypass part of the ring being tested, reducing the measured resistance at that point."
  },
  {
    id: "step3-value",
    question: "If Step 1 end-to-end reading is 0.52\u03A9, what should the Step 3 readings at each socket approximately equal?",
    options: [
      "0.52\u03A9",
      "1.04\u03A9",
      "0.26\u03A9",
      "0.13\u03A9"
    ],
    correctIndex: 2,
    explanation: "The cross-connection creates two half-ring paths in parallel. This means the reading at any socket is approximately half the full end-to-end resistance, as current flows both ways around the ring."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the purpose of the ring final circuit continuity test?",
    options: ["To measure insulation resistance", "To verify ring integrity and detect breaks, interconnections, and faults", "To test RCD operation", "To measure earth fault loop impedance"],
    correctAnswer: 1,
    explanation: "The ring test verifies the complete ring is intact (no breaks), there are no interconnections with other rings, the correct conductors are connected, and provides R1+R2 values for each socket position."
  },
  {
    id: 2,
    question: "In Step 1 of the ring test, what is measured?",
    options: ["Insulation between L and N", "End-to-end resistance of each conductor (L, N, CPC separately)", "R1+R2 at each socket", "Voltage at each socket"],
    correctAnswer: 1,
    explanation: "Step 1 measures the end-to-end resistance of each conductor separately (L-L', N-N', CPC-CPC') at the distribution board with the ring disconnected. These should all be similar values (for same-length legs)."
  },
  {
    id: 3,
    question: "What should you expect for Step 1 end-to-end readings on a healthy ring?",
    options: ["All three readings exactly the same", "L and N similar, CPC slightly higher (smaller CSA)", "L highest, CPC lowest", "Random values depending on socket positions"],
    correctAnswer: 1,
    explanation: "L and N conductors are typically the same CSA so should have similar end-to-end resistance. CPC is often smaller (higher resistance per metre), so its end-to-end reading will be slightly higher, but similar pattern."
  },
  {
    id: 4,
    question: "After cross-connecting for Step 2 or Step 3, what result indicates a healthy ring?",
    options: ["Readings increase from first to last socket", "Readings decrease from first to last socket", "All sockets give approximately the same reading", "The furthest socket gives double the first socket reading"],
    correctAnswer: 2,
    explanation: "The figure-of-8 configuration means every socket should give the same reading regardless of position - approximately half the Step 1 end-to-end value. Variations indicate faults at that position."
  },
  {
    id: 5,
    question: "If one socket shows a significantly higher reading than others during Step 3, what does this indicate?",
    options: ["That socket is closest to the DB", "There's likely a loose connection or damaged conductor at or near that socket", "The socket is correctly wired", "This is normal for the middle socket of the ring"],
    correctAnswer: 1,
    explanation: "Higher resistance at one socket indicates increased resistance at that point - typically a loose connection, corroded terminal, or damaged conductor. The fault location is at or immediately before that socket."
  },
  {
    id: 6,
    question: "What does a lower than expected reading at a socket during the ring test suggest?",
    options: ["Excellent wiring quality", "A possible interconnection with another circuit", "The socket is at the midpoint", "The socket is closest to the consumer unit"],
    correctAnswer: 1,
    explanation: "Lower than expected readings suggest parallel paths exist - typically an interconnection with another ring circuit. Current can flow through the other circuit's conductors, reducing measured resistance."
  },
  {
    id: 7,
    question: "How do you calculate R1+R2 for a ring circuit from the test results?",
    options: ["Double the Step 1 readings", "Add all three Step 1 readings together", "Use the Step 3 readings directly - they are R1+R2", "Divide Step 1 readings by 2"],
    correctAnswer: 2,
    explanation: "The Step 3 readings (with L cross-connected to CPC) give R1+R2 directly at each socket. No calculation needed - the cross-connection configuration puts R1 and R2 in series automatically."
  },
  {
    id: 8,
    question: "When testing a spur from a ring circuit, what reading should you expect compared to the ring sockets?",
    options: ["Lower reading (spur is shorter)", "Same reading as the ring sockets", "Higher reading (adds spur cable length)", "Zero reading (spurs are not earthed)"],
    correctAnswer: 2,
    explanation: "Spurs add additional cable length beyond the ring. The measured R1+R2 at a spur socket equals the ring R1+R2 at the junction box PLUS the resistance of the spur cable to that point."
  },
  {
    id: 9,
    question: "What is the relationship between Step 1 end-to-end reading and Step 3 socket readings for a healthy ring?",
    options: ["Step 3 = Step 1 x 2", "Step 3 \u2248 Step 1 \u00F7 4 (approximately quarter)", "Step 3 \u2248 Step 1 \u00F7 2 (approximately half)", "No relationship - they measure different things"],
    correctAnswer: 2,
    explanation: "For a healthy ring, Step 3 readings at each socket should be approximately half of the relevant Step 1 end-to-end reading. This is because the cross-connection creates two parallel half-ring paths to every socket."
  },
  {
    id: 10,
    question: "What indicates that a ring circuit is actually wired as two radials incorrectly connected?",
    options: ["Step 3 readings are all identical", "Step 1 readings are zero", "End-to-end readings are very low but socket readings vary significantly around the ring", "Step 3 readings vary from very low to double the expected value moving around the ring"],
    correctAnswer: 3,
    explanation: "If supposedly a ring is actually two radials joined, the pattern will show: first socket very low (almost zero), increasing through the ring, last socket showing full end-to-end value. A true ring gives the same reading at every socket."
  }
];

const faqs = [
  {
    question: "Why is the ring final circuit test so complex compared to radial circuit testing?",
    answer: "A ring circuit has two parallel paths for current to flow - both legs of the ring. Testing must verify: both legs are continuous (no breaks), they connect to form a complete ring, there are no interconnections between rings, and the correct conductors are connected. The three-step process systematically confirms all these requirements. A simple end-to-end test wouldn't reveal breaks in one leg or interconnections."
  },
  {
    question: "What does it mean if Step 1 readings aren't within 0.05\u03A9 of each other?",
    answer: "If the end-to-end readings for L, N, and CPC differ by more than about 0.05\u03A9, this suggests: different cable sizes used in the ring, unequal leg lengths (ring doesn't follow the same route both ways), loose connections in one leg, or damage to one leg. All three conductors should follow the same physical route, so their end-to-end resistances should be very similar (allowing for the different CSA of the CPC)."
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
  }
];

const InspectionTestingModule3Section2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 3.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Ring Final Circuit Continuity
          </h1>
          <p className="text-white/80">
            Master the three-step ring test for verifying ring integrity
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Step 1:</strong> End-to-end resistance of L, N, CPC separately</li>
              <li><strong>Steps 2&3:</strong> Cross-connect and test at every socket</li>
              <li><strong>Result:</strong> All sockets should read the same value</li>
              <li><strong>Step 3:</strong> Readings give R1+R2 directly</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Broken rings, interconnections, cross-wiring</li>
              <li><strong>Use:</strong> Verify ring integrity, fault location</li>
              <li><strong>Apply:</strong> Every ring final circuit installation</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the purpose and importance of ring final circuit testing",
              "Execute the three-step ring continuity test procedure correctly",
              "Identify ring circuit faults: broken rings, interconnections, bridged conductors",
              "Calculate and verify expected resistance values at each test step",
              "Determine R1+R2 values from ring test results",
              "Test spurs and extensions from ring circuits correctly"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 1: Why Ring Testing is Different */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Why Ring Testing is Different
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A ring final circuit provides two parallel paths for current. This improves current capacity but creates testing complexity - a simple end-to-end test cannot confirm the ring is properly formed.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Ring Circuit Characteristics:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Two Parallel Paths:</strong> Current can flow either way around the ring to reach any socket - this doubles the effective current capacity</li>
                <li><strong>Both Legs Must Be Continuous:</strong> A break in one leg makes it a radial - still works but with reduced capacity and protection issues</li>
                <li><strong>No Interconnections:</strong> If two rings share a connection point, protective device discrimination is compromised</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-amber-500/10">
              <p className="text-sm font-medium text-amber-400 mb-2">Common Ring Faults</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Broken ring:</strong> One leg disconnected (functions as radial)</li>
                <li><strong>Interconnection:</strong> Connected to another ring</li>
                <li><strong>Cross-connection:</strong> L and N swapped in one leg</li>
                <li><strong>Missing earth:</strong> CPC not continuous in one leg</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: Step 1 - End-to-End Testing */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Step 1: End-to-End Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Step 1 measures the resistance of each conductor's complete loop around the ring. This verifies continuity and establishes baseline values.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Step 1 Procedure:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>1. Disconnect Both Ring Ends:</strong> Both legs disconnected from DB terminals</li>
                <li><strong>2. Null Test Leads:</strong> Zero the instrument</li>
                <li><strong>3. Test L to L' (Line to Line):</strong> Record the reading (e.g., 0.52\u03A9)</li>
                <li><strong>4. Test N to N' (Neutral to Neutral):</strong> Record the reading (should match L-L')</li>
                <li><strong>5. Test CPC to CPC':</strong> Record the reading (typically slightly higher if smaller CSA)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Expected Step 1 Results:</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left text-white/60 py-2 px-1">Conductor</th>
                      <th className="text-center text-white/60 py-2 px-1">Typical Reading</th>
                      <th className="text-left text-white/60 py-2 px-1">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/80">
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-1 text-red-400">L-L'</td>
                      <td className="text-center py-2 px-1">0.52\u03A9</td>
                      <td className="py-2 px-1 text-xs">2.5mm\u00B2 around ring</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-1 text-blue-400">N-N'</td>
                      <td className="text-center py-2 px-1">0.52\u03A9</td>
                      <td className="py-2 px-1 text-xs">Should match L-L'</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-1 text-green-400">CPC-CPC'</td>
                      <td className="text-center py-2 px-1">0.86\u03A9</td>
                      <td className="py-2 px-1 text-xs">1.5mm\u00B2 = higher R</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10">
              <p className="text-sm font-medium text-blue-400 mb-2">Key Check</p>
              <p className="text-sm text-white">
                L and N readings should be within 0.05\u03A9 of each other. If they differ significantly, it suggests unequal leg lengths or a problem in one leg. CPC will typically be higher due to smaller cross-section.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 3: Steps 2 and 3 - Cross-Connection Testing */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Steps 2 & 3: Cross-Connection Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Steps 2 and 3 use a "figure of 8" configuration that makes fault detection simple - every socket on a healthy ring should give the same reading.
            </p>

            <div className="my-6 p-4 rounded-lg bg-transparent border border-white/10">
              <p className="text-sm font-medium text-white mb-2">Step 2: Cross-Connect L with N</p>
              <ul className="text-sm text-white/80 space-y-1">
                <li><strong>Connect:</strong> L of one leg to N of other leg (and vice versa)</li>
                <li><strong>Measure:</strong> L-N at each socket around the ring</li>
                <li><strong>Expected:</strong> All readings approximately equal (about half of Step 1)</li>
                <li><strong>Purpose:</strong> Verifies L and N are correctly connected, no cross-wiring</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/10">
              <p className="text-sm font-medium text-elec-yellow mb-2">Step 3: Cross-Connect L with CPC (The Key Test)</p>
              <ul className="text-sm text-white/80 space-y-1">
                <li><strong>Connect:</strong> L of one leg to CPC of other leg (and vice versa)</li>
                <li><strong>Measure:</strong> L-E at each socket around the ring</li>
                <li><strong>Expected:</strong> All readings approximately equal</li>
                <li><strong>Result:</strong> This reading IS the R1+R2 value for each socket!</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Why "Figure of 8" Works:</p>
              <p className="text-sm text-white/70">
                When cross-connected, current flows around both legs to reach any socket. Every socket has equal resistance because it's always halfway around both loops. This makes fault detection simple - if one socket reads differently, the fault is at that location.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-green-500/10">
              <p className="text-sm font-medium text-green-400 mb-2">Step 3 Gives R1+R2 Directly</p>
              <p className="text-sm text-white">
                The Step 3 reading at each socket IS the R1+R2 value for that position. No calculation needed - just record the reading. For a ring, this should be approximately (r1+r2)/4 x total ring length.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Interpreting Ring Test Results */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Interpreting Ring Test Results
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding what different patterns mean helps quickly identify the type and location of faults.
            </p>

            <div className="my-6 space-y-3">
              <div className="p-3 rounded-lg bg-green-500/10">
                <p className="text-green-400 font-medium text-sm">All Sockets Equal (\u00B15%) - Healthy Ring</p>
                <p className="text-white/70 text-sm">All readings within 5% = ring is complete and correctly wired</p>
              </div>
              <div className="p-3 rounded-lg bg-amber-500/10">
                <p className="text-amber-400 font-medium text-sm">One Socket High - Local Fault</p>
                <p className="text-white/70 text-sm">Loose connection or damaged conductor at or near that socket</p>
              </div>
              <div className="p-3 rounded-lg bg-amber-500/10">
                <p className="text-amber-400 font-medium text-sm">One Socket Low - Interconnection</p>
                <p className="text-white/70 text-sm">Possible connection to another ring at that socket</p>
              </div>
              <div className="p-3 rounded-lg bg-red-500/10">
                <p className="text-red-400 font-medium text-sm">Progressive Increase - Broken Ring</p>
                <p className="text-white/70 text-sm">Values rising from one end = one leg broken, actually a radial</p>
              </div>
              <div className="p-3 rounded-lg bg-red-500/10">
                <p className="text-red-400 font-medium text-sm">Open Circuit at One Socket - Break Location</p>
                <p className="text-white/70 text-sm">Break is between that socket and the previous one tested</p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-transparent border border-white/10">
              <p className="text-sm font-medium text-white mb-2">Example: Broken Ring Pattern</p>
              <p className="text-xs text-white/60 mb-2">Socket readings around "ring" with break:</p>
              <div className="text-sm font-mono space-y-1">
                <p>Socket 1: <span className="text-green-400">0.15\u03A9</span> - Near start</p>
                <p>Socket 2: <span className="text-yellow-400">0.28\u03A9</span> - Increasing...</p>
                <p>Socket 3: <span className="text-orange-400">0.42\u03A9</span> - Still rising...</p>
                <p>Socket 4: <span className="text-red-400">0.56\u03A9</span> - Near break!</p>
              </div>
              <p className="text-red-400 text-xs mt-2">Pattern shows this is a radial, not a ring</p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 5: Testing Spurs */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Testing Spurs from Ring Circuits
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Unfused spurs connected from the ring will show readings that include the spur cable resistance on top of the ring R1+R2. This is expected behaviour.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Spur Test Procedure:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Test at the spur socket with Step 3 configuration still in place</li>
                <li>Reading = Ring R1+R2 at junction + Spur cable R1+R2</li>
                <li>Will always be higher than ring socket readings</li>
                <li>Record this higher value for the spur socket</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-green-500/10">
              <p className="text-sm font-medium text-green-400 mb-2">Example: Spur Calculation</p>
              <div className="text-sm text-white space-y-1">
                <p><strong>Ring R1+R2 at junction:</strong> 0.26\u03A9</p>
                <p><strong>Spur length:</strong> 5m of 2.5/1.5mm\u00B2 T&E</p>
                <p><strong>Spur R1+R2:</strong> 5 x 0.01951 = 0.10\u03A9</p>
                <p><strong>Total at spur socket:</strong> 0.26 + 0.10 = <span className="text-elec-yellow font-bold">0.36\u03A9</span></p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10">
              <p className="text-sm font-medium text-blue-400 mb-2">Identifying Spurs</p>
              <p className="text-sm text-white">
                During testing, spur sockets are identified by their higher readings. If you don't know which are spurs beforehand, the test results will show you - spurs will read higher than the ring average.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Recording Ring Test Results */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Recording Ring Test Results
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Ring circuit test results are recorded on the schedule of test results. The format allows all key values to be recorded systematically.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Values to Record:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>r1:</strong> Line end-to-end divided by total cable length (m\u03A9/m)</li>
                <li><strong>rn:</strong> Neutral end-to-end divided by total cable length (m\u03A9/m)</li>
                <li><strong>r2:</strong> CPC end-to-end divided by total cable length (m\u03A9/m)</li>
                <li><strong>R1+R2:</strong> The highest Step 3 reading (worst case for Zs)</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-transparent border border-white/10">
              <p className="text-sm font-medium text-white mb-2">Schedule Entry Example:</p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs font-mono">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-1">Circuit</th>
                      <th className="text-center py-1">r1</th>
                      <th className="text-center py-1">rn</th>
                      <th className="text-center py-1">r2</th>
                      <th className="text-center py-1 text-elec-yellow">R1+R2</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/80">
                    <tr>
                      <td className="py-1">Ring Sockets</td>
                      <td className="text-center py-1">0.52\u03A9</td>
                      <td className="text-center py-1">0.52\u03A9</td>
                      <td className="text-center py-1">0.86\u03A9</td>
                      <td className="text-center py-1 text-elec-yellow">0.35\u03A9</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-white/50 text-xs mt-2">R1+R2 recorded is the highest value from Step 3 testing</p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-amber-500/10">
              <p className="text-sm font-medium text-amber-400 mb-2">Use Highest R1+R2</p>
              <p className="text-sm text-white">
                For Zs verification and circuit protection checks, always use the highest R1+R2 measured during Step 3. This is the worst-case value and ensures protection is adequate at all points.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Top Tips</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Label the ring legs (Leg 1 and Leg 2) to keep track during testing</li>
                <li>Take photos of connections at DB before disconnecting</li>
                <li>Test every socket - don't skip any for a thorough verification</li>
                <li>Record readings as you go - don't try to remember them all</li>
                <li>Use a long wandering lead for easier socket testing</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Cross-connecting wrong conductors</strong> - L to L' instead of L to N'</li>
                <li><strong>Forgetting to null test leads</strong> - affects all readings</li>
                <li><strong>Testing only a few sockets</strong> - misses faults at untested points</li>
                <li><strong>Not recording Step 1 values</strong> - needed for comparison</li>
                <li><strong>Misidentifying which leg is which</strong> - causes confusion</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key References</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>BS 7671:</strong> Regulation 314.1 - Division of installation</li>
                <li><strong>GN3:</strong> Ring final circuit testing procedure</li>
                <li><strong>Appendix 15:</strong> Ring circuit continuity test method</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Reference Cards */}
        <section className="mb-10">
          <UnitsPocketCard />

          <div className="mt-6 p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Ring Test Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Three Steps</p>
                <ul className="space-y-0.5">
                  <li>Step 1: End-to-end L-L', N-N', CPC-CPC' at DB</li>
                  <li>Step 2: Cross L with N', measure L-N at sockets</li>
                  <li>Step 3: Cross L with CPC', measure L-E at sockets</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Expectations</p>
                <ul className="space-y-0.5">
                  <li>Step 1: L and N similar, CPC slightly higher</li>
                  <li>Step 2&3: All sockets same reading (\u00B15%)</li>
                  <li>Step 3 value = Half of Step 1 = R1+R2</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default InspectionTestingModule3Section2;
