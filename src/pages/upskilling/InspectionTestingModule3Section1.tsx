import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import UnitsPocketCard from "@/components/apprentice-courses/UnitsPocketCard";
import useSEO from "@/hooks/useSEO";

const TITLE = "Protective Conductor Continuity (R1+R2) - Module 3 Section 1";
const DESCRIPTION = "Master R1+R2 continuity testing for protective conductors. Learn test methods, acceptance values, and calculation of circuit protective conductor continuity.";

const quickCheckQuestions = [
  {
    id: "r1r2-purpose",
    question: "Why must R1+R2 be measured at the furthest point from the distribution board?",
    options: [
      "To avoid electrical interference",
      "Because the furthest point has the highest resistance (longest cable length), giving the worst-case value",
      "To protect the test equipment",
      "For easier access to terminals"
    ],
    correctIndex: 1,
    explanation: "The furthest point will have the maximum R1+R2, and therefore the highest Zs. If protection is adequate at the worst-case point, it will be adequate throughout the circuit."
  },
  {
    id: "zs-calculation",
    question: "If Ze = 0.40\u03A9 and measured R1+R2 = 0.35\u03A9, what is the calculated Zs?",
    options: [
      "0.05\u03A9",
      "0.75\u03A9",
      "0.14\u03A9",
      "1.40\u03A9"
    ],
    correctIndex: 1,
    explanation: "Earth fault loop impedance Zs equals the external impedance Ze plus the circuit impedance R1+R2. This calculated value can be compared with both measured Zs and maximum permitted values."
  },
  {
    id: "link-removal",
    question: "What must you remember to do at the distribution board after completing R1+R2 testing?",
    options: [
      "Replace all fuses",
      "Remove the temporary link between the line and CPC conductors",
      "Test for voltage",
      "Record ambient temperature"
    ],
    correctIndex: 1,
    explanation: "Forgetting to remove the link creates a dead short when the circuit is re-energised. This will cause an immediate trip at minimum, or potentially a fire if the protective device doesn't operate fast enough."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What does R1+R2 represent in continuity testing?",
    options: ["Ring circuit resistance", "Resistance of line conductor plus CPC in series", "Resistance of both line conductors", "Insulation resistance between conductors"],
    correctAnswer: 1,
    explanation: "R1+R2 is the resistance of the line conductor (R1) plus the circuit protective conductor (R2) measured in series from the distribution board to the furthest point. This value is used for Zs verification."
  },
  {
    id: 2,
    question: "What is the minimum test current required for continuity testing according to BS 7671?",
    options: ["50mA", "100mA", "200mA", "500mA"],
    correctAnswer: 2,
    explanation: "A minimum test current of 200mA is required for continuity testing. This ensures reliable readings through potentially corroded or poorly connected conductors and meets the requirements of BS 7671 and GN3."
  },
  {
    id: 3,
    question: "Where should R1+R2 be measured on a radial circuit?",
    options: ["At the distribution board only", "At the midpoint of the circuit", "At the furthest point from the distribution board", "At multiple random points"],
    correctAnswer: 2,
    explanation: "R1+R2 must be measured at the furthest point from the distribution board. This gives the highest (worst-case) resistance value, ensuring protection is adequate throughout the entire circuit length."
  },
  {
    id: 4,
    question: "If a 2.5mm\u00B2 line conductor has a resistance of 7.41m\u03A9/m and the 1.5mm\u00B2 CPC has 12.1m\u03A9/m, what is r1+r2 per metre?",
    options: ["9.76m\u03A9/m", "14.85m\u03A9/m", "19.51m\u03A9/m", "4.69m\u03A9/m"],
    correctAnswer: 2,
    explanation: "r1+r2 = 7.41 + 12.1 = 19.51m\u03A9/m. This value is used to calculate expected R1+R2 by multiplying by the circuit length in metres."
  },
  {
    id: 5,
    question: "How does temperature affect R1+R2 measurements?",
    options: ["Temperature has no effect on conductor resistance", "Higher temperature means lower resistance", "Higher temperature means higher resistance", "Only affects measurements above 50\u00B0C"],
    correctAnswer: 2,
    explanation: "Conductor resistance increases with temperature. Copper has a positive temperature coefficient of approximately 0.4% per degree Celsius. Published resistance values are at 20\u00B0C, so measurements at higher temperatures will read higher."
  },
  {
    id: 6,
    question: "The relationship Zs = Ze + R1 + R2 is used for what purpose?",
    options: ["Calculating cable size required", "Verifying earth fault loop impedance compliance", "Determining RCD rating needed", "Calculating voltage drop"],
    correctAnswer: 1,
    explanation: "The formula Zs = Ze + R1 + R2 allows calculation of expected earth fault loop impedance. By measuring Ze at the origin and R1+R2 at the circuit end, you can verify the calculated Zs is within permitted limits."
  },
  {
    id: 7,
    question: "What should you do if R1+R2 measures significantly higher than the calculated expected value?",
    options: ["Record the measured value and continue", "Investigate the cause - check connections, cable size, and route", "Add a correction factor and accept", "Assume the calculation was wrong"],
    correctAnswer: 1,
    explanation: "Unexpectedly high R1+R2 values indicate a potential problem: poor connections, wrong cable size, longer route, or conductor damage. These must be investigated and resolved, not simply accepted or adjusted."
  },
  {
    id: 8,
    question: "When testing R1+R2 at a socket outlet, what test configuration is used?",
    options: ["L terminal to E terminal at the socket", "L terminal at DB to E terminal at socket", "Link L and E at DB, measure L-E at socket", "L to N at socket"],
    correctAnswer: 2,
    explanation: "The standard method is to temporarily link L and CPC (E) at the distribution board, then measure the resistance between L and E at the furthest socket. This puts R1 and R2 in series for measurement."
  },
  {
    id: 9,
    question: "What is the typical acceptable range for R1+R2 on a 20m circuit using 2.5/1.5mm\u00B2 cable?",
    options: ["Less than 0.05\u03A9", "Approximately 0.39\u03A9 (20m \u00D7 19.51m\u03A9/m)", "Approximately 1.0\u03A9", "Greater than 2.0\u03A9"],
    correctAnswer: 1,
    explanation: "For 2.5/1.5mm\u00B2 T&E, r1+r2 \u2248 19.51m\u03A9/m. For 20m: R1+R2 = 0.01951 \u00D7 20 = 0.39\u03A9 approximately. This should be compared with your calculation based on actual cable length and type."
  },
  {
    id: 10,
    question: "Why is it important to null the test leads before R1+R2 measurement?",
    options: ["To charge the instrument battery", "To compensate for test lead resistance and ensure accurate low-resistance readings", "To reset the instrument memory", "It's not important for this test"],
    correctAnswer: 1,
    explanation: "Nulling (zeroing) the test leads subtracts their resistance from measurements. Since R1+R2 values are typically below 1\u03A9, even small lead resistance (0.1-0.3\u03A9) would significantly affect accuracy if not compensated."
  }
];

const faqs = [
  {
    question: "What is the difference between R1+R2 and the continuity of protective conductors?",
    answer: "They are related but different measurements. 'Continuity of protective conductors' verifies there's a continuous path through the CPC - it's a pass/fail test confirming the conductor is connected end-to-end. R1+R2 measures the actual resistance of the line conductor (R1) plus the CPC (R2) in series. R1+R2 is more comprehensive - it confirms continuity AND provides the resistance value needed for Zs verification."
  },
  {
    question: "Why do we need to measure R1+R2 at the furthest point?",
    answer: "The furthest point has the highest resistance and therefore the highest Zs value. Testing here gives you the worst-case figure for the circuit. If protection is adequate at the furthest point (highest Zs), it will be adequate everywhere on that circuit. Testing at intermediate points would miss potential problems at the circuit extremity."
  },
  {
    question: "Can I use a standard multimeter for R1+R2 testing?",
    answer: "A standard multimeter can measure low resistance but has limitations: it may not have sufficient resolution for very low resistances, doesn't compensate for lead resistance automatically, and may not use the correct test current. Purpose-built low resistance ohmmeters or multifunction testers are recommended as they use appropriate test currents (typically 200mA minimum) and have better resolution for the low values involved."
  },
  {
    question: "What test current should be used for continuity testing?",
    answer: "BS 7671 and GN3 specify a minimum test current of 200mA to ensure good contact with conductors and reliable readings. Some instruments use higher currents. Using too low a current can give unreliable readings, especially on corroded or poorly connected conductors. Never use an instrument that doesn't meet the minimum current requirement."
  },
  {
    question: "How do I calculate the expected R1+R2 value?",
    answer: "Expected R1+R2 = (length in metres \u00D7 resistance per metre) for R1 + (length in metres \u00D7 resistance per metre) for R2. Resistance per metre values come from cable data tables (e.g., OSG Table I1) at 20\u00B0C. For different conductor sizes: multiply length by (r1 + r2) where r1 and r2 are the milliohm/metre values for each conductor. Remember to add a tolerance for temperature if testing at other than 20\u00B0C."
  },
  {
    question: "What if my R1+R2 reading is higher than expected?",
    answer: "Higher than expected readings may indicate: incorrect cable size used, cable longer than expected (routed differently), poor connections (loose terminals), damaged conductor, corroded joints, or incorrect r1+r2 values used in calculation. Investigate by checking terminations, verifying cable route and size, and rechecking the calculation. Never simply accept unexpectedly high values."
  }
];

const InspectionTestingModule3Section1 = () => {
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
            <span>Module 3.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Protective Conductor Continuity (R1+R2)
          </h1>
          <p className="text-white/80">
            Measure and verify the critical earth fault path resistance
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>R1+R2:</strong> Line conductor + CPC resistance in series</li>
              <li><strong>Test:</strong> At furthest point for worst-case value</li>
              <li><strong>Formula:</strong> Zs = Ze + R1 + R2</li>
              <li><strong>Current:</strong> Minimum 200mA test current required</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Poor connections, damaged conductors</li>
              <li><strong>Use:</strong> Zs verification, protection compliance</li>
              <li><strong>Apply:</strong> Every radial circuit at furthest point</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand the purpose of R1+R2 testing for circuit protective conductors",
              "Perform R1+R2 continuity tests using the correct method and equipment",
              "Calculate expected R1+R2 values from cable data and circuit length",
              "Interpret test results and identify continuity faults",
              "Record R1+R2 values correctly on test certificates",
              "Apply R1+R2 values to Zs calculations for circuit verification"
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

        {/* Section 1: Purpose of R1+R2 Testing */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Purpose of R1+R2 Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              R1+R2 testing verifies the integrity and resistance of the earth fault current path within a circuit. This is critical because when a fault occurs, current must flow through this path to operate the protective device quickly enough to prevent electric shock.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">What R1+R2 Represents:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>R1 (Line Conductor):</strong> Phase conductor from DB to furthest point</li>
                <li><strong>R2 (Circuit Protective Conductor):</strong> Earth (CPC) from furthest point back to DB</li>
                <li><strong>Combined:</strong> Total resistance of the fault current path within the circuit</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Why It Matters</p>
              <p className="text-sm text-white">
                During an earth fault, current flows through R1 (to the fault) and R2 (back to the source via the CPC). The total resistance of this path (along with Ze) determines the fault current, which must be high enough to operate the protective device within the required time.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: R1+R2 Test Method */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            R1+R2 Test Method
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The standard method involves temporarily linking the line and CPC at the distribution board, then measuring the combined resistance at the circuit's furthest point.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Test Procedure:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>1. Isolate and Prove Dead:</strong> Ensure the circuit is safely isolated</li>
                <li><strong>2. Null Test Leads:</strong> Zero the instrument with leads shorted together</li>
                <li><strong>3. Link L and CPC at DB:</strong> Temporarily connect line to earth at the board using a flying lead</li>
                <li><strong>4. Measure at Furthest Point:</strong> Test between L and E at the furthest socket/point on the circuit</li>
                <li><strong>5. Record Result:</strong> Note the reading in ohms on the test schedule</li>
                <li><strong>6. Remove Link:</strong> Don't forget to remove the temporary link before re-energising!</li>
              </ul>
            </div>

            <p className="text-sm text-red-400/80 italic">
              <strong>Critical Reminder:</strong> Always remove the temporary link between L and CPC before re-energising the circuit. Forgetting this creates a direct short circuit when power is restored.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 3: Calculating Expected R1+R2 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Calculating Expected R1+R2
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Before testing, calculate the expected R1+R2 value. This allows you to verify your measurement makes sense and helps identify potential problems.
            </p>

            <div className="my-6 p-4 rounded-lg bg-transparent border border-white/10">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Calculation Formula</p>
              <p className="text-center font-mono text-elec-yellow">R1+R2 = Length (m) x (r1 + r2) m\u03A9/m</p>
              <p className="text-xs text-white/60 text-center mt-2">Where r1 and r2 are from cable data tables</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common Cable Values (m\u03A9/m at 20\u00B0C):</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left text-white/60 py-2 px-1">Cable</th>
                      <th className="text-center text-white/60 py-2 px-1">r1</th>
                      <th className="text-center text-white/60 py-2 px-1">r2</th>
                      <th className="text-center text-elec-yellow py-2 px-1">r1+r2</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/80">
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-1">1.0/1.0mm\u00B2</td>
                      <td className="text-center py-2 px-1">18.1</td>
                      <td className="text-center py-2 px-1">18.1</td>
                      <td className="text-center py-2 px-1 text-elec-yellow">36.2</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-1">1.5/1.0mm\u00B2</td>
                      <td className="text-center py-2 px-1">12.1</td>
                      <td className="text-center py-2 px-1">18.1</td>
                      <td className="text-center py-2 px-1 text-elec-yellow">30.2</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-1">2.5/1.5mm\u00B2</td>
                      <td className="text-center py-2 px-1">7.41</td>
                      <td className="text-center py-2 px-1">12.1</td>
                      <td className="text-center py-2 px-1 text-elec-yellow">19.51</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-1">4.0/1.5mm\u00B2</td>
                      <td className="text-center py-2 px-1">4.61</td>
                      <td className="text-center py-2 px-1">12.1</td>
                      <td className="text-center py-2 px-1 text-elec-yellow">16.71</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-1">6.0/2.5mm\u00B2</td>
                      <td className="text-center py-2 px-1">3.08</td>
                      <td className="text-center py-2 px-1">7.41</td>
                      <td className="text-center py-2 px-1 text-elec-yellow">10.49</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-white/50 text-xs mt-2">Values from OSG Table I1 for copper conductors at 20\u00B0C</p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-green-500/10">
              <p className="text-sm font-medium text-green-400 mb-2">Example Calculation</p>
              <div className="text-sm text-white space-y-1">
                <p><strong>Circuit:</strong> Socket outlet circuit, 25m of 2.5/1.5mm\u00B2 T&E</p>
                <p><strong>r1+r2:</strong> 19.51 m\u03A9/m (from table)</p>
                <p><strong>Calculation:</strong> 25 x 0.01951 = <span className="text-elec-yellow font-bold">0.49\u03A9</span></p>
                <p>Expected R1+R2 \u2248 0.49\u03A9 (at 20\u00B0C)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Using R1+R2 for Zs Verification */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Using R1+R2 for Zs Verification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              R1+R2 values allow calculation of the expected earth fault loop impedance (Zs) without the need for a live test. This is particularly useful for RCD-protected circuits where live Zs testing is not always reliable.
            </p>

            <div className="my-6 p-4 rounded-lg bg-transparent border border-white/10">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Zs Formula</p>
              <p className="text-center font-mono text-elec-yellow text-xl">Zs = Ze + (R1 + R2)</p>
              <p className="text-xs text-white/60 text-center mt-2">Where Ze is measured at the origin</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Practical Application:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>1.</strong> Measure Ze at Origin (e.g., Ze = 0.35\u03A9 at the consumer unit)</li>
                <li><strong>2.</strong> Measure R1+R2 at Circuit End (e.g., R1+R2 = 0.49\u03A9 at furthest socket)</li>
                <li><strong>3.</strong> Calculate Zs: 0.35 + 0.49 = <span className="text-elec-yellow">0.84\u03A9</span></li>
                <li><strong>4.</strong> Compare with Maximum Zs (For B32: Max Zs = 1.37\u03A9. 0.84\u03A9 = Compliant)</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Temperature Correction</p>
              <p className="text-sm text-white">
                For verification purposes, R1+R2 values at operating temperature (typically 70\u00B0C for conductors) should be used. Apply multiplier of approximately 1.2 to values measured at 20\u00B0C for comparison with maximum Zs.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 5: Identifying Continuity Faults */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Identifying Continuity Faults
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              R1+R2 testing can reveal various installation faults. Understanding what different results indicate helps with diagnosis and correction.
            </p>

            <div className="my-6 space-y-3">
              <div className="p-3 rounded-lg bg-green-500/10">
                <p className="text-green-400 font-medium text-sm">Expected Value - Pass</p>
                <p className="text-white/70 text-sm">Reading matches calculation within tolerance. Circuit passes.</p>
              </div>
              <div className="p-3 rounded-lg bg-amber-500/10">
                <p className="text-amber-400 font-medium text-sm">Higher Than Expected - Investigate</p>
                <p className="text-white/70 text-sm">Poor connections, wrong cable size, longer route, or damaged conductor.</p>
              </div>
              <div className="p-3 rounded-lg bg-amber-500/10">
                <p className="text-amber-400 font-medium text-sm">Lower Than Expected - Verify</p>
                <p className="text-white/70 text-sm">Parallel earth paths, cable shorter than thought, or testing wrong circuit.</p>
              </div>
              <div className="p-3 rounded-lg bg-red-500/10">
                <p className="text-red-400 font-medium text-sm">Open Circuit (\u221E) - Fail</p>
                <p className="text-white/70 text-sm">No continuity - broken conductor, disconnected terminal, or wrong test point.</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common Fault Causes:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>High resistance:</strong> Loose terminal screws, corroded connections</li>
                <li><strong>Open circuit:</strong> CPC not connected, earth bar loose, cable damage</li>
                <li><strong>Variable reading:</strong> Intermittent connection, loose strands</li>
                <li><strong>Wrong value:</strong> Wrong cable size used, additional cable in series</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 6: Recording R1+R2 Results */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Recording R1+R2 Results
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              R1+R2 values are recorded on the Schedule of Test Results (schedule of circuit details) as part of the electrical installation certificate or periodic inspection report.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Recording Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Record R1+R2 in ohms (\u03A9) to at least 2 decimal places</li>
                <li>Record for every circuit where continuity test is applicable</li>
                <li>Note if value is measured or calculated from ring test results</li>
                <li>Include test instrument details in the certificate</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Tip: Use R1+R2 for Diagnosis</p>
              <p className="text-sm text-white">
                Recorded R1+R2 values are useful for future fault finding. If a circuit develops problems later, comparing current measurements with original recorded values can help identify where changes have occurred.
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
                <li>Always null your test leads before starting R1+R2 measurements</li>
                <li>Calculate expected values before testing - know what you expect to find</li>
                <li>Use a brightly coloured flying lead for the L-CPC link - easier to spot for removal</li>
                <li>Test intermediate points too - can help locate high-resistance connections</li>
                <li>Write down each reading immediately - don't rely on memory</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Forgetting to null test leads</strong> - adds ~0.2\u03A9 to readings</li>
                <li><strong>Testing at midpoint</strong> - doesn't give worst-case value</li>
                <li><strong>Using wrong r1+r2 values</strong> - check cable size carefully</li>
                <li><strong>Leaving the link in place</strong> - creates short circuit</li>
                <li><strong>Not investigating high readings</strong> - could indicate dangerous connection</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key References</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>BS 7671:</strong> Regulation 643 - Continuity of protective conductors</li>
                <li><strong>GN3:</strong> Inspection and Testing guidance</li>
                <li><strong>OSG Table I1:</strong> Cable resistance values</li>
                <li><strong>Chapter 41:</strong> Maximum Zs values for protective devices</li>
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
            <h3 className="text-sm font-medium text-white mb-4">R1+R2 Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Formulas</p>
                <ul className="space-y-0.5">
                  <li>R1+R2 = Length (m) x (r1+r2) m\u03A9/m</li>
                  <li>Zs = Ze + R1 + R2</li>
                  <li>Test current: Min 200mA</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Common r1+r2 Values</p>
                <ul className="space-y-0.5">
                  <li>2.5/1.5mm\u00B2: 19.51 m\u03A9/m</li>
                  <li>1.5/1.0mm\u00B2: 30.2 m\u03A9/m</li>
                  <li>Test at furthest point</li>
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
            <Link to="../module-2/section-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default InspectionTestingModule3Section1;
