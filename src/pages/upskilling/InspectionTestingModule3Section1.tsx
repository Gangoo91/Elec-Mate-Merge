import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Zap, CheckCircle2, AlertTriangle, Link2, Calculator, Lightbulb, XCircle, ChevronDown, ChevronUp, FileText, Shield, Activity, Ruler } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import UnitsPocketCard from '@/components/apprentice-courses/UnitsPocketCard';
import useSEO from '@/hooks/useSEO';

const InspectionTestingModule3Section1 = () => {
  useSEO({
    title: "Protective Conductor Continuity (R1+R2) | Continuity Testing | Inspection & Testing",
    description: "Master R1+R2 continuity testing for protective conductors. Learn test methods, acceptance values, and calculation of circuit protective conductor continuity."
  });

  const navigate = useNavigate();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const defined_learningOutcomes = [
    { id: 1, text: "Understand the purpose of R1+R2 testing for circuit protective conductors", icon: Shield },
    { id: 2, text: "Perform R1+R2 continuity tests using the correct method and equipment", icon: Activity },
    { id: 3, text: "Calculate expected R1+R2 values from cable data and circuit length", icon: Calculator },
    { id: 4, text: "Interpret test results and identify continuity faults", icon: Lightbulb },
    { id: 5, text: "Record R1+R2 values correctly on test certificates", icon: FileText },
    { id: 6, text: "Apply R1+R2 values to Zs calculations for circuit verification", icon: Ruler }
  ];

  const defined_defined_faqs = [
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
      answer: "Expected R1+R2 = (length in metres × resistance per metre) for R1 + (length in metres × resistance per metre) for R2. Resistance per metre values come from cable data tables (e.g., OSG Table I1) at 20°C. For different conductor sizes: multiply length by (r1 + r2) where r1 and r2 are the milliohm/metre values for each conductor. Remember to add a tolerance for temperature if testing at other than 20°C."
    },
    {
      question: "What if my R1+R2 reading is higher than expected?",
      answer: "Higher than expected readings may indicate: incorrect cable size used, cable longer than expected (routed differently), poor connections (loose terminals), damaged conductor, corroded joints, or incorrect r1+r2 values used in calculation. Investigate by checking terminations, verifying cable route and size, and rechecking the calculation. Never simply accept unexpectedly high values."
    },
    {
      question: "Does temperature affect R1+R2 measurements?",
      answer: "Yes - conductor resistance increases with temperature. Published resistance values are typically at 20°C. At higher temperatures, resistance is higher; at lower temperatures, it's lower. For compliance verification, measurements should be adjusted to 20°C equivalent, or allowance made in calculations. A cable at 30°C will measure about 4% higher resistance than at 20°C."
    },
    {
      question: "What is the relationship between R1+R2 and Zs?",
      answer: "Zs (earth fault loop impedance) = Ze + R1 + R2, where Ze is the external earth fault loop impedance. Knowing R1+R2 allows you to calculate the expected Zs value: measure Ze at the origin, add R1+R2 measured at the circuit end. This calculated Zs can be compared with measured Zs to verify consistency, and with maximum permitted Zs to confirm adequate fault protection."
    }
  ];

  const defined_quizQuestions = [
    {
      question: "What does R1+R2 represent in continuity testing?",
      options: ["Ring circuit resistance", "Resistance of line conductor plus CPC in series", "Resistance of both line conductors", "Insulation resistance between conductors"],
      correctAnswer: 1,
      explanation: "R1+R2 is the resistance of the line conductor (R1) plus the circuit protective conductor (R2) measured in series from the distribution board to the furthest point. This value is used for Zs verification."
    },
    {
      question: "What is the minimum test current required for continuity testing according to BS 7671?",
      options: ["50mA", "100mA", "200mA", "500mA"],
      correctAnswer: 2,
      explanation: "A minimum test current of 200mA is required for continuity testing. This ensures reliable readings through potentially corroded or poorly connected conductors and meets the requirements of BS 7671 and GN3."
    },
    {
      question: "Where should R1+R2 be measured on a radial circuit?",
      options: ["At the distribution board only", "At the midpoint of the circuit", "At the furthest point from the distribution board", "At multiple random points"],
      correctAnswer: 2,
      explanation: "R1+R2 must be measured at the furthest point from the distribution board. This gives the highest (worst-case) resistance value, ensuring protection is adequate throughout the entire circuit length."
    },
    {
      question: "If a 2.5mm² line conductor has a resistance of 7.41mΩ/m and the 1.5mm² CPC has 12.1mΩ/m, what is r1+r2 per metre?",
      options: ["9.76mΩ/m", "14.85mΩ/m", "19.51mΩ/m", "4.69mΩ/m"],
      correctAnswer: 2,
      explanation: "r1+r2 = 7.41 + 12.1 = 19.51mΩ/m. This value is used to calculate expected R1+R2 by multiplying by the circuit length in metres."
    },
    {
      question: "How does temperature affect R1+R2 measurements?",
      options: ["Temperature has no effect on conductor resistance", "Higher temperature means lower resistance", "Higher temperature means higher resistance", "Only affects measurements above 50°C"],
      correctAnswer: 2,
      explanation: "Conductor resistance increases with temperature. Copper has a positive temperature coefficient of approximately 0.4% per degree Celsius. Published resistance values are at 20°C, so measurements at higher temperatures will read higher."
    },
    {
      question: "The relationship Zs = Ze + R1 + R2 is used for what purpose?",
      options: ["Calculating cable size required", "Verifying earth fault loop impedance compliance", "Determining RCD rating needed", "Calculating voltage drop"],
      correctAnswer: 1,
      explanation: "The formula Zs = Ze + R1 + R2 allows calculation of expected earth fault loop impedance. By measuring Ze at the origin and R1+R2 at the circuit end, you can verify the calculated Zs is within permitted limits."
    },
    {
      question: "What should you do if R1+R2 measures significantly higher than the calculated expected value?",
      options: ["Record the measured value and continue", "Investigate the cause - check connections, cable size, and route", "Add a correction factor and accept", "Assume the calculation was wrong"],
      correctAnswer: 1,
      explanation: "Unexpectedly high R1+R2 values indicate a potential problem: poor connections, wrong cable size, longer route, or conductor damage. These must be investigated and resolved, not simply accepted or adjusted."
    },
    {
      question: "When testing R1+R2 at a socket outlet, what test configuration is used?",
      options: ["L terminal to E terminal at the socket", "L terminal at DB to E terminal at socket", "Link L and E at DB, measure L-E at socket", "L to N at socket"],
      correctAnswer: 2,
      explanation: "The standard method is to temporarily link L and CPC (E) at the distribution board, then measure the resistance between L and E at the furthest socket. This puts R1 and R2 in series for measurement."
    },
    {
      question: "What is the typical acceptable range for R1+R2 on a 20m circuit using 2.5/1.5mm² cable?",
      options: ["Less than 0.05Ω", "Approximately 0.39Ω (20m × 19.51mΩ/m)", "Approximately 1.0Ω", "Greater than 2.0Ω"],
      correctAnswer: 1,
      explanation: "For 2.5/1.5mm² T&E, r1+r2 ≈ 19.51mΩ/m. For 20m: R1+R2 = 0.01951 × 20 = 0.39Ω approximately. This should be compared with your calculation based on actual cable length and type."
    },
    {
      question: "Why is it important to null the test leads before R1+R2 measurement?",
      options: ["To charge the instrument battery", "To compensate for test lead resistance and ensure accurate low-resistance readings", "To reset the instrument memory", "It's not important for this test"],
      correctAnswer: 1,
      explanation: "Nulling (zeroing) the test leads subtracts their resistance from measurements. Since R1+R2 values are typically below 1Ω, even small lead resistance (0.1-0.3Ω) would significantly affect accuracy if not compensated."
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
          <span className="text-xs text-white/50 font-medium">Section 1 of 6</span>
        </div>
      </header>

      <main className="pb-24">
        {/* Hero Section */}
        <section className="px-4 pt-6 pb-8">
          <Badge className="bg-elec-yellow/20 text-elec-yellow border-0 mb-3">
            Module 3 • Continuity Testing
          </Badge>
          <h1 className="text-ios-title-large font-bold text-white mb-3">
            Protective Conductor Continuity (R1+R2)
          </h1>
          <p className="text-white/70 text-ios-body leading-relaxed">
            Learn to measure and verify the critical earth fault path resistance that ensures protective devices can disconnect faults quickly enough to prevent injury.
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
                • <strong>R1+R2</strong> = line conductor resistance + CPC resistance in series
              </p>
              <p className="text-white/90 text-sm leading-relaxed">
                • <strong>Test at furthest point</strong> to find worst-case (highest) resistance
              </p>
              <p className="text-white/90 text-sm leading-relaxed">
                • <strong>Zs = Ze + R1 + R2</strong> - use to verify earth fault loop compliance
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

        {/* Section 01: Purpose of R1+R2 Testing */}
        <section className="px-4 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-elec-yellow/30">01</span>
            <h2 className="text-ios-title-2 font-bold text-white">Purpose of R1+R2 Testing</h2>
          </div>

          <Card variant="ios" className="bg-white/5 border-white/10 mb-4">
            <CardContent className="p-5 space-y-4">
              <p className="text-white/90 leading-relaxed">
                R1+R2 testing verifies the integrity and resistance of the earth fault current path within a circuit. This is critical because when a fault occurs, current must flow through this path to operate the protective device quickly enough to prevent electric shock.
              </p>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">What R1+R2 Represents</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-4 bg-white/5 rounded-lg p-3">
                    <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-red-400 font-bold text-lg">R1</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Line Conductor</p>
                      <p className="text-white/60 text-sm">Phase conductor from DB to furthest point</p>
                    </div>
                  </div>
                  <div className="text-center text-white/50 text-2xl font-bold">+</div>
                  <div className="flex items-center gap-4 bg-white/5 rounded-lg p-3">
                    <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-green-400 font-bold text-lg">R2</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Circuit Protective Conductor</p>
                      <p className="text-white/60 text-sm">Earth (CPC) from furthest point back to DB</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-blue-400 font-semibold mb-1">Why It Matters</h4>
                    <p className="text-white/80 text-sm">
                      During an earth fault, current flows through R1 (to the fault) and R2 (back to the source via the CPC). The total resistance of this path (along with Ze) determines the fault current, which must be high enough to operate the protective device within the required time.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 02: R1+R2 Test Method */}
        <section className="px-4 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-elec-yellow/30">02</span>
            <h2 className="text-ios-title-2 font-bold text-white">R1+R2 Test Method</h2>
          </div>

          <Card variant="ios" className="bg-white/5 border-white/10 mb-4">
            <CardContent className="p-5 space-y-4">
              <p className="text-white/90 leading-relaxed">
                The standard method involves temporarily linking the line and CPC at the distribution board, then measuring the combined resistance at the circuit's furthest point.
              </p>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-4">Test Procedure</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-elec-yellow font-bold text-sm">1</span>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">Isolate and Prove Dead</p>
                      <p className="text-white/60 text-xs">Ensure the circuit is safely isolated</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-elec-yellow font-bold text-sm">2</span>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">Null Test Leads</p>
                      <p className="text-white/60 text-xs">Zero the instrument with leads shorted together</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-elec-yellow font-bold text-sm">3</span>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">Link L and CPC at DB</p>
                      <p className="text-white/60 text-xs">Temporarily connect line to earth at the board using a flying lead</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-elec-yellow font-bold text-sm">4</span>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">Measure at Furthest Point</p>
                      <p className="text-white/60 text-xs">Test between L and E at the furthest socket/point on the circuit</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-elec-yellow font-bold text-sm">5</span>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">Record Result</p>
                      <p className="text-white/60 text-xs">Note the reading in ohms on the test schedule</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-elec-yellow font-bold text-sm">6</span>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">Remove Link</p>
                      <p className="text-white/60 text-xs">Don't forget to remove the temporary link before re-energising!</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-amber-400 font-semibold mb-1">Critical Reminder</h4>
                    <p className="text-white/80 text-sm">
                      Always remove the temporary link between L and CPC before re-energising the circuit. Forgetting this creates a direct short circuit when power is restored, which will cause an immediate trip at best, or fire/damage at worst.
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
            question="Why must R1+R2 be measured at the furthest point from the distribution board?"
            correctAnswer="Because the furthest point has the highest resistance (longest cable length), giving the worst-case value for Zs calculations"
            explanation="Resistance increases with cable length. The furthest point will have the maximum R1+R2, and therefore the highest Zs. If protection is adequate at the worst-case point, it will be adequate throughout the circuit."
          />
        </section>

        {/* Section 03: Calculating Expected R1+R2 */}
        <section className="px-4 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-elec-yellow/30">03</span>
            <h2 className="text-ios-title-2 font-bold text-white">Calculating Expected R1+R2</h2>
          </div>

          <Card variant="ios" className="bg-white/5 border-white/10 mb-4">
            <CardContent className="p-5 space-y-4">
              <p className="text-white/90 leading-relaxed">
                Before testing, calculate the expected R1+R2 value. This allows you to verify your measurement makes sense and helps identify potential problems.
              </p>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">Calculation Formula</h4>
                <div className="bg-[#1a1a1a] rounded-lg p-4 font-mono text-center">
                  <p className="text-elec-yellow text-lg mb-2">R1+R2 = Length (m) × (r1 + r2) mΩ/m</p>
                  <p className="text-white/60 text-sm">Where r1 and r2 are from cable data tables</p>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">Common Cable Values (mΩ/m at 20°C)</h4>
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
                        <td className="py-2 px-1">1.0/1.0mm²</td>
                        <td className="text-center py-2 px-1">18.1</td>
                        <td className="text-center py-2 px-1">18.1</td>
                        <td className="text-center py-2 px-1 text-elec-yellow">36.2</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 px-1">1.5/1.0mm²</td>
                        <td className="text-center py-2 px-1">12.1</td>
                        <td className="text-center py-2 px-1">18.1</td>
                        <td className="text-center py-2 px-1 text-elec-yellow">30.2</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 px-1">2.5/1.5mm²</td>
                        <td className="text-center py-2 px-1">7.41</td>
                        <td className="text-center py-2 px-1">12.1</td>
                        <td className="text-center py-2 px-1 text-elec-yellow">19.51</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 px-1">4.0/1.5mm²</td>
                        <td className="text-center py-2 px-1">4.61</td>
                        <td className="text-center py-2 px-1">12.1</td>
                        <td className="text-center py-2 px-1 text-elec-yellow">16.71</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-1">6.0/2.5mm²</td>
                        <td className="text-center py-2 px-1">3.08</td>
                        <td className="text-center py-2 px-1">7.41</td>
                        <td className="text-center py-2 px-1 text-elec-yellow">10.49</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-white/50 text-xs mt-2">Values from OSG Table I1 for copper conductors at 20°C</p>
              </div>

              <div className="bg-green-500/10 rounded-xl p-4">
                <h4 className="text-green-400 font-semibold mb-2">Example Calculation</h4>
                <div className="text-white/80 text-sm space-y-2">
                  <p><strong>Circuit:</strong> Socket outlet circuit, 25m of 2.5/1.5mm² T&E</p>
                  <p><strong>r1+r2:</strong> 19.51 mΩ/m (from table)</p>
                  <p><strong>Calculation:</strong> 25 × 0.01951 = <span className="text-elec-yellow font-bold">0.49Ω</span></p>
                  <p>Expected R1+R2 ≈ 0.49Ω (at 20°C)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 04: Using R1+R2 for Zs Verification */}
        <section className="px-4 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-elec-yellow/30">04</span>
            <h2 className="text-ios-title-2 font-bold text-white">Using R1+R2 for Zs Verification</h2>
          </div>

          <Card variant="ios" className="bg-white/5 border-white/10 mb-4">
            <CardContent className="p-5 space-y-4">
              <p className="text-white/90 leading-relaxed">
                R1+R2 values allow calculation of the expected earth fault loop impedance (Zs) without the need for a live test. This is particularly useful for RCD-protected circuits where live Zs testing is not always reliable.
              </p>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">The Zs Formula</h4>
                <div className="bg-[#1a1a1a] rounded-lg p-4 font-mono text-center">
                  <p className="text-elec-yellow text-xl mb-2">Zs = Ze + (R1 + R2)</p>
                  <p className="text-white/60 text-sm">Where Ze is measured at the origin</p>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">Practical Application</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-400 font-bold text-sm">1</span>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">Measure Ze at Origin</p>
                      <p className="text-white/60 text-xs">E.g., Ze = 0.35Ω at the consumer unit</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-400 font-bold text-sm">2</span>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">Measure R1+R2 at Circuit End</p>
                      <p className="text-white/60 text-xs">E.g., R1+R2 = 0.49Ω at furthest socket</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-400 font-bold text-sm">3</span>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">Calculate Zs</p>
                      <p className="text-white/60 text-xs">Zs = 0.35 + 0.49 = <span className="text-elec-yellow">0.84Ω</span></p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">Compare with Maximum Zs</p>
                      <p className="text-white/60 text-xs">For B32: Max Zs = 1.37Ω. 0.84Ω ✓ Compliant</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Calculator className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-blue-400 font-semibold mb-1">Temperature Correction</h4>
                    <p className="text-white/80 text-sm">
                      For verification purposes, R1+R2 values at operating temperature (typically 70°C for conductors) should be used. Apply multiplier of approximately 1.2 to values measured at 20°C for comparison with maximum Zs.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Inline Check 2 */}
        <section className="px-4 mb-8">
          <InlineCheck
            question="If Ze = 0.40Ω and measured R1+R2 = 0.35Ω, what is the calculated Zs?"
            correctAnswer="0.75Ω (calculated as Ze + R1+R2 = 0.40 + 0.35)"
            explanation="Earth fault loop impedance Zs equals the external impedance Ze plus the circuit impedance R1+R2. This calculated value can be compared with both measured Zs and maximum permitted values."
          />
        </section>

        {/* Section 05: Identifying Continuity Faults */}
        <section className="px-4 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-elec-yellow/30">05</span>
            <h2 className="text-ios-title-2 font-bold text-white">Identifying Continuity Faults</h2>
          </div>

          <Card variant="ios" className="bg-white/5 border-white/10 mb-4">
            <CardContent className="p-5 space-y-4">
              <p className="text-white/90 leading-relaxed">
                R1+R2 testing can reveal various installation faults. Understanding what different results indicate helps with diagnosis and correction.
              </p>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">Result Interpretation</h4>
                <div className="space-y-3">
                  <div className="bg-green-500/10 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-green-400 font-medium">Expected Value</span>
                      <span className="text-green-400 text-sm">✓</span>
                    </div>
                    <p className="text-white/70 text-sm">Reading matches calculation within tolerance. Circuit passes.</p>
                  </div>

                  <div className="bg-amber-500/10 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-amber-400 font-medium">Higher Than Expected</span>
                      <span className="text-amber-400 text-sm">⚠</span>
                    </div>
                    <p className="text-white/70 text-sm">Poor connections, wrong cable size, longer route, or damaged conductor. Investigate.</p>
                  </div>

                  <div className="bg-amber-500/10 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-amber-400 font-medium">Lower Than Expected</span>
                      <span className="text-amber-400 text-sm">⚠</span>
                    </div>
                    <p className="text-white/70 text-sm">Parallel earth paths, cable shorter than thought, or testing wrong circuit. Verify.</p>
                  </div>

                  <div className="bg-red-500/10 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-red-400 font-medium">Open Circuit (∞)</span>
                      <span className="text-red-400 text-sm">✗</span>
                    </div>
                    <p className="text-white/70 text-sm">No continuity - broken conductor, disconnected terminal, or wrong test point.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">Common Fault Causes</h4>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span><strong>High resistance:</strong> Loose terminal screws, corroded connections</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Open circuit:</strong> CPC not connected, earth bar loose, cable damage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Variable reading:</strong> Intermittent connection, loose strands</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Wrong value:</strong> Wrong cable size used, additional cable in series</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 06: Recording R1+R2 Results */}
        <section className="px-4 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-elec-yellow/30">06</span>
            <h2 className="text-ios-title-2 font-bold text-white">Recording R1+R2 Results</h2>
          </div>

          <Card variant="ios" className="bg-white/5 border-white/10 mb-4">
            <CardContent className="p-5 space-y-4">
              <p className="text-white/90 leading-relaxed">
                R1+R2 values are recorded on the Schedule of Test Results (schedule of circuit details) as part of the electrical installation certificate or periodic inspection report.
              </p>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">Recording Requirements</h4>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span>Record R1+R2 in ohms (Ω) to at least 2 decimal places</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span>Record for every circuit where continuity test is applicable</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span>Note if value is measured or calculated from ring test results</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span>Include test instrument details in the certificate</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">Example Schedule Entry</h4>
                <div className="bg-[#1a1a1a] rounded-lg p-3 font-mono text-xs overflow-x-auto">
                  <table className="w-full text-white/80">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-1">Circuit</th>
                        <th className="text-center py-1">Cable</th>
                        <th className="text-center py-1">R1+R2</th>
                        <th className="text-center py-1">Zs</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-1">Sockets</td>
                        <td className="text-center py-1">2.5/1.5</td>
                        <td className="text-center py-1 text-elec-yellow">0.49Ω</td>
                        <td className="text-center py-1">0.84Ω</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-blue-400 font-semibold mb-1">Tip: Use R1+R2 for Diagnosis</h4>
                    <p className="text-white/80 text-sm">
                      Recorded R1+R2 values are useful for future fault finding. If a circuit develops problems later, comparing current measurements with original recorded values can help identify where changes have occurred.
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
            question="What must you remember to do at the distribution board after completing R1+R2 testing?"
            correctAnswer="Remove the temporary link between the line and CPC conductors before re-energising the circuit"
            explanation="Forgetting to remove the link creates a dead short when the circuit is re-energised. This will cause an immediate trip at minimum, or potentially a fire if the protective device doesn't operate fast enough."
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
                  <li>• Always null your test leads before starting R1+R2 measurements</li>
                  <li>• Calculate expected values before testing - know what you expect to find</li>
                  <li>• Use a brightly coloured flying lead for the L-CPC link - easier to spot for removal</li>
                  <li>• Test intermediate points too - can help locate high-resistance connections</li>
                  <li>• Write down each reading immediately - don't rely on memory</li>
                </ul>
              </div>

              <div className="bg-red-500/10 rounded-xl p-4">
                <h4 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
                  <XCircle className="w-5 h-5" />
                  Common Mistakes
                </h4>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li>• Forgetting to null test leads (adds ~0.2Ω to readings)</li>
                  <li>• Testing at midpoint instead of furthest point</li>
                  <li>• Using wrong r1+r2 values in calculations</li>
                  <li>• Leaving the link in place after testing</li>
                  <li>• Not investigating unexpectedly high readings</li>
                </ul>
              </div>

              <div className="bg-blue-500/10 rounded-xl p-4">
                <h4 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                  <Link2 className="w-5 h-5" />
                  Key References
                </h4>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li>• <strong>BS 7671:</strong> Regulation 643 - Continuity of protective conductors</li>
                  <li>• <strong>GN3:</strong> Inspection and Testing guidance</li>
                  <li>• <strong>OSG Table I1:</strong> Cable resistance values</li>
                  <li>• <strong>Chapter 41:</strong> Maximum Zs values for protective devices</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* FAQs */}
        <section className="px-4 mb-8">
          <h2 className="text-ios-headline font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {defined_defined_faqs.map((faq, index) => (
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
            title="R1+R2 Quick Reference"
            items={[
              { term: "R1+R2 Formula", definition: "Length (m) × (r1+r2) mΩ/m ÷ 1000 = Ω" },
              { term: "2.5/1.5mm² T&E", definition: "r1+r2 = 19.51 mΩ/m" },
              { term: "1.5/1.0mm² T&E", definition: "r1+r2 = 30.2 mΩ/m" },
              { term: "Zs Formula", definition: "Zs = Ze + R1 + R2" },
              { term: "Test Current", definition: "Minimum 200mA required" },
              { term: "Test Location", definition: "Furthest point from distribution board" },
              { term: "Critical Action", definition: "Remove L-CPC link before re-energising" }
            ]}
          />
        </section>

        {/* Quiz */}
        <section className="px-4 mb-8">
          <Quiz
            title="Test Your Knowledge"
            questions={defined_quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="px-4 pb-safe">
          <div className="flex gap-3">
            <Button
              variant="ios-secondary"
              className="flex-1 h-12"
              onClick={() => navigate('/study-centre/apprentice/upskilling/inspection-testing/module3')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Module 3
            </Button>
            <Button
              variant="ios-primary"
              className="flex-1 h-12"
              onClick={() => navigate('/study-centre/apprentice/upskilling/inspection-testing/module3/section2')}
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

export default InspectionTestingModule3Section1;
