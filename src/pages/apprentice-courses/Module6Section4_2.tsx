import { ArrowLeft, Target, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module6Section4_2 = () => {
  useSEO(
    "Continuity of Ring Circuits - Level 2 Electrical Testing & Inspection",
    "Essential testing procedures for ring final circuits to ensure proper ring integrity and safety"
  );

  // Quick check questions
  const quickCheckQuestions = [
    {
      id: 1,
      question: "What is the main purpose of ring continuity testing?",
      options: ["Check power consumption", "Verify ring integrity", "Measure voltage"],
      correctAnswer: 1,
      explanation: "Ring continuity testing verifies that the ring circuit is complete and properly connected, ensuring safe operation and load distribution."
    },
    {
      id: 2,
      question: "What instrument is used for ring continuity testing?",
      options: ["Clamp meter", "Low-resistance ohmmeter", "Voltage tester"],
      correctAnswer: 1,
      explanation: "A low-resistance ohmmeter (multifunction tester) is used to measure the resistance values in ring circuits."
    },
    {
      id: 3,
      question: "What does a broken ring indicate?",
      options: ["Normal operation", "Serious safety hazard", "Energy saving"],
      correctAnswer: 1,
      explanation: "A broken ring creates an overloaded radial circuit and poses serious safety risks including overheating and fire."
    }
  ];

  // Quiz questions
  const quizQuestions = [
    {
      id: 1,
      question: "What is the maximum rating for ring final circuits in domestic installations?",
      options: ["20A", "32A", "40A"],
      correctAnswer: 1,
      explanation: "Ring final circuits are typically protected by 32A MCBs or RCBOs in domestic installations."
    },
    {
      id: 2,
      question: "What cable size is standard for ring final circuits?",
      options: ["1.5mm²", "2.5mm²", "4mm²"],
      correctAnswer: 1,
      explanation: "2.5mm² twin and earth cable is standard for 32A ring final circuits."
    },
    {
      id: 3,
      question: "How many paths does current have in a properly functioning ring circuit?",
      options: ["One", "Two", "Three"],
      correctAnswer: 1,
      explanation: "In a ring circuit, current has two paths to reach any point, sharing the load between both legs."
    },
    {
      id: 4,
      question: "What test confirms both legs of a ring are complete?",
      options: ["Voltage test", "End-to-end resistance test", "Insulation test"],
      correctAnswer: 1,
      explanation: "End-to-end resistance testing confirms both legs of the ring are complete and properly connected."
    },
    {
      id: 5,
      question: "What happens if one leg of a ring circuit is broken?",
      options: ["Circuit stops working", "Becomes overloaded radial", "Works more efficiently"],
      correctAnswer: 1,
      explanation: "A broken ring becomes an overloaded radial circuit, potentially causing overheating and safety hazards."
    },
    {
      id: 6,
      question: "What should you do before testing ring continuity?",
      options: ["Test with power on", "Isolate and prove dead", "Check with customers"],
      correctAnswer: 1,
      explanation: "Always isolate the circuit and prove dead before conducting any continuity tests."
    },
    {
      id: 7,
      question: "What document requires ring continuity verification?",
      options: ["EAWR 1989", "BS 7671", "Company policy"],
      correctAnswer: 1,
      explanation: "BS 7671 Wiring Regulations require verification of ring continuity as part of testing procedures."
    },
    {
      id: 8,
      question: "How should ring circuit readings compare between legs?",
      options: ["Identical", "Approximately equal", "Significantly different"],
      correctAnswer: 1,
      explanation: "Ring circuit legs should show approximately equal resistance values, indicating balanced construction."
    },
    {
      id: 9,
      question: "What could cause unusually high resistance in one leg?",
      options: ["Normal variation", "Loose connections or damage", "Good installation"],
      correctAnswer: 1,
      explanation: "High resistance indicates loose connections, cable damage, or poor terminations requiring investigation."
    },
    {
      id: 10,
      question: "Why is ring continuity testing critical for safety?",
      options: ["Reduces energy bills", "Prevents circuit overloading", "Improves lighting"],
      correctAnswer: 1,
      explanation: "Ring continuity testing prevents dangerous overloading that could cause fires and electrical hazards."
    }
  ];

  const faqs = [
    {
      question: "How often should ring circuits be tested?",
      answer: "Ring circuits should be tested during initial installation, at periodic inspections (typically every 10 years for domestic), and whenever modifications are made. Any signs of problems require immediate testing."
    },
    {
      question: "Can I tell if a ring is broken just by looking?",
      answer: "No, visual inspection cannot determine ring integrity. You need proper electrical testing with calibrated instruments to confirm both legs are complete and have correct resistance values."
    },
    {
      question: "What if my ring test shows unequal resistance values?",
      answer: "Slight variations are normal due to cable routing differences, but significant discrepancies indicate faults. Investigate loose connections, cable damage, or incorrect installation methods."
    },
    {
      question: "Do I need special qualifications to test ring circuits?",
      answer: "Yes, ring circuit testing requires appropriate electrical qualifications and competency. This is typically part of 18th Edition, inspection and testing courses, and relevant NVQ qualifications."
    },
    {
      question: "What should I do if I find a broken ring?",
      answer: "A broken ring is a serious safety issue. Isolate the circuit immediately, investigate the cause, repair the break, and retest before re-energising. Consider whether an EICR code is required."
    }
  ];

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Top header bar */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6.4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg ">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 6.4.2
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Continuity of Ring Circuits
          </h1>
          <p className="text-white">
            Essential testing procedures for ring final circuits to ensure proper ring integrity and safety
          </p>
        </header>

        {/* Spot it in 30 Seconds Card */}
        <Card className="mb-8 p-6 bg-transparent border-white/20">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-white" />
            <h2 className="text-lg sm:text-xl font-semibold text-white">Spot it in 30 Seconds</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <p className="font-medium mb-3">In 30 seconds</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Ring circuits must form complete loops</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Test using end-to-end resistance method</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Both legs should show similar resistance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Broken rings become dangerous radials</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-elec-yellow/20">
              <p className="font-medium mb-3">Spot it / Use it / Check it</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span><strong>Spot:</strong> Broken rings, loose connections, incorrect terminations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span><strong>Use:</strong> Low-resistance ohmmeter, GS38 test leads</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span><strong>Check:</strong> Both ring legs, terminations at board, socket connections</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <p className="text-base text-white mb-4">
            Ring final circuits are a unique UK wiring method where cables form a complete loop or 'ring' from the distribution board, around the circuit, and back to the board. This configuration allows current to flow through two paths, reducing voltage drop and enabling higher load capacity with smaller cable sizes.
          </p>
          <p className="text-base text-white">
            Testing ring continuity is absolutely critical because a broken ring becomes an overloaded radial circuit, potentially causing dangerous overheating, cable damage, and fire risks.
          </p>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning Outcomes</h2>
          <p className="text-base text-white mb-4">By the end of this subsection, learners will be able to:</p>
          <ul className="space-y-3 text-base text-white">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Understand the importance of ring circuit integrity</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Perform end-to-end continuity tests on ring circuits</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Interpret test results and identify ring faults</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Understand the safety implications of broken rings</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Document ring continuity test results correctly</span>
            </li>
          </ul>
        </Card>

        {/* Content / Learning */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content / Learning</h2>

          {/* 1. Ring Circuit Fundamentals */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 text-elec-yellow mb-3">Ring Circuit Fundamentals and Safety Importance</p>
                    
                    <div className="space-y-4">
                       <div>
                         <p className="text-base text-white mb-2"><strong>Ring Circuit Design Principles:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Cable forms complete loop from consumer unit outward terminals back to consumer unit return terminals</li>
                           <li>Current divides between two paths, reducing load on each cable leg by approximately 50%</li>
                           <li>Enables 32A protection with 2.5mm² cable (normally rated 27A as radial)</li>
                           <li>Reduces voltage drop across circuit by providing parallel current paths</li>
                           <li>Standard in UK domestic installations for socket outlets since 1950s</li>
                           <li>Must terminate in same way at both ends - no interconnections along the route</li>
                           <li>Socket outlets connected as spurs are limited to maintain circuit integrity</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2"><strong>Critical Safety Implications:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Broken ring becomes radial circuit carrying full load through single cable path</li>
                           <li>2.5mm² cable carrying 32A load will overheat rapidly - cable rating exceeded by 18%</li>
                           <li>Overheating causes insulation degradation leading to fire risk and dangerous conditions</li>
                           <li>Voltage drop increases significantly, affecting equipment operation and safety</li>
                           <li>MCB may not protect adequately as current still below 32A trip point</li>
                           <li>RCD protection becomes less effective due to increased earth fault loop impedance</li>
                           <li>Multiple socket outlets beyond cable capacity creates cumulative overload risk</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2"><strong>Regulatory Requirements and Standards:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>BS 7671:2018+A2:2022 Section 612.2.2 mandates ring continuity verification</li>
                           <li>Regulation 433.1.5 requires overload protection coordinated with conductor capacity</li>
                           <li>Appendix 15 provides specific guidance on ring circuit design and testing</li>
                           <li>IET Guidance Note 3 details acceptable test methods and result interpretation</li>
                           <li>Part P Building Regulations apply to new installations and major modifications</li>
                           <li>Electricity at Work Regulations 1989 require systems to be safe and properly maintained</li>
                           <li>EICR Code C1 (Danger Present) applies to broken rings requiring immediate action</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2"><strong>Design Limitations and Load Considerations:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Maximum floor area: 100m² per ring circuit to limit socket outlet density</li>
                           <li>Unfused spurs limited to one twin socket or one fixed appliance per ring outlet</li>
                           <li>Total unfused spur load must not exceed 50% of ring circuit rating</li>
                           <li>Cable length typically limited to 106m total loop length for domestic applications</li>
                           <li>Kitchen ring circuits often require dedicated circuit due to high appliance loads</li>
                           <li>Socket outlet spacing should allow even load distribution around ring</li>
                           <li>Special consideration needed for high-load appliances (washing machines, tumble dryers)</li>
                         </ul>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="ring-fundamentals-check"
            question="What happens when a ring circuit is broken and operates as a radial?"
            options={["Works more efficiently", "Becomes overloaded and dangerous", "Saves energy", "Improves voltage regulation"]}
            correctIndex={1}
            explanation="A broken ring becomes an overloaded radial circuit where the remaining cable carries the full load, causing dangerous overheating."
          />
          <Separator className="my-6" />

          {/* 2. Ring Continuity Testing Methods */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow text-elec-yellow mb-3">Ring Continuity Testing Methods and Procedures</p>
                    
                    <div className="space-y-4">
                       <div>
                         <p className="text-base text-white mb-2"><strong>End-to-End Continuity Testing (Primary Method):</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Disconnect both line conductors at consumer unit and measure resistance between them</li>
                           <li>Repeat for neutral conductors - should give similar reading to line measurement</li>
                           <li>Test CPC (earth) conductors separately - typically higher reading due to smaller CSA</li>
                           <li>Typical values for 2.5mm² ring: Line and Neutral ≈ 1.2Ω, CPC ≈ 1.9Ω (depends on length)</li>
                           <li>Reading of infinity (OL) indicates broken ring requiring immediate investigation</li>
                           <li>Significantly different readings between legs suggests poor connections or cable damage</li>
                           <li>Must test all three conductors separately to identify specific conductor faults</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2"><strong>Cross-Connection Testing for Interconnections:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Links one leg of line to opposite leg of neutral at consumer unit</li>
                           <li>Measures resistance at each socket outlet between line and neutral terminals</li>
                           <li>Should show gradually increasing then decreasing resistance around ring</li>
                           <li>Highest reading at midpoint of ring, lowest at start/end connections</li>
                           <li>Sudden jumps or inconsistent readings indicate interconnections or wiring errors</li>
                           <li>Identifies socket outlets not properly connected to ring main cables</li>
                           <li>Essential test to confirm proper ring topology and eliminate dangerous wiring faults</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2"><strong>Step-by-Step Testing Procedure:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li><strong>Step 1:</strong> Isolate ring circuit at consumer unit and prove dead using GS38 voltage indicator</li>
                           <li><strong>Step 2:</strong> Identify outgoing and return legs of ring circuit at consumer unit terminals</li>
                           <li><strong>Step 3:</strong> Zero low-resistance ohmmeter using test leads (note lead resistance typically 0.01-0.02Ω)</li>
                           <li><strong>Step 4:</strong> Disconnect both line conductors and measure end-to-end resistance</li>
                           <li><strong>Step 5:</strong> Repeat for neutral conductors - values should be similar to line reading</li>
                           <li><strong>Step 6:</strong> Test CPC conductors separately - expect higher reading due to smaller CSA</li>
                           <li><strong>Step 7:</strong> Record all readings and compare to expected values for cable type and length</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2"><strong>Advanced Fault Diagnosis Techniques:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Sectional testing by temporarily disconnecting socket outlets to isolate cable sections</li>
                           <li>Using insulation resistance tester to identify cable-to-cable faults or earth leakage</li>
                           <li>Time Domain Reflectometry (TDR) for precise fault location in inaccessible cable runs</li>
                           <li>Load testing using appropriate test equipment to verify current sharing between ring legs</li>
                           <li>Thermal imaging to identify overheating joints or connections under load conditions</li>
                           <li>Comparative testing with known good circuits to establish baseline values</li>
                           <li>Documentation of all test points and readings for future reference and troubleshooting</li>
                         </ul>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="ring-testing-check"
            question="What would an infinite resistance reading during end-to-end testing indicate?"
            options={["Perfect ring", "Broken ring circuit", "High quality cable", "Normal result"]}
            correctIndex={1}
            explanation="An infinite resistance reading indicates a broken ring circuit, which is a serious safety hazard requiring immediate investigation and repair."
          />
          <Separator className="my-6" />

          {/* 3. Result Interpretation and Fault Diagnosis */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-3">Result Interpretation and Fault Diagnosis</p>
                    
                    <div className="space-y-4">
                       <div>
                         <p className="text-base text-white mb-2"><strong>Expected Values and Acceptance Criteria:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>2.5mm² copper ring (30m each leg): Line/Neutral ≈ 1.2Ω, CPC (1.5mm²) ≈ 1.9Ω</li>
                           <li>4mm² copper ring (40m each leg): Line/Neutral ≈ 0.9Ω, CPC (1.5mm²) ≈ 2.5Ω</li>
                           <li>Readings should be consistent between line and neutral conductors (±10% variation)</li>
                           <li>CPC reading higher due to smaller cross-sectional area (typically 1.5mm² vs 2.5mm²)</li>
                           <li>Total loop resistance affects earth fault loop impedance calculations (Zs values)</li>
                           <li>Values must ensure protective device operation within required disconnection times</li>
                           <li>Temperature coefficient: 0.004 per °C increase above 20°C reference temperature</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2"><strong>Common Fault Indicators and Investigation:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Infinite resistance (OL): Complete break in ring - check all terminations and cable joints</li>
                           <li>Very high resistance (&gt;5Ω): Poor connections, loose terminals, or corroded joints</li>
                           <li>Unequal leg readings: Different cable sizes, poor connections, or partial damage</li>
                           <li>Cross-connection test shows unexpected patterns: Interconnections or wiring errors</li>
                           <li>Readings that vary significantly from design calculations: Wrong cable type or size</li>
                           <li>Gradual increase in readings over time: Progressive connection deterioration</li>
                           <li>Inconsistent readings between similar circuits: Installation quality issues</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2"><strong>Safety Assessment and Risk Classification:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Complete ring break: EICR Code C1 (Danger Present) - immediate disconnection required</li>
                           <li>High resistance connections: Code C2 (Potentially Dangerous) - urgent remedial work needed</li>
                           <li>Minor variations within limits: Code C3 (Improvement Recommended) - monitor and review</li>
                           <li>Assessment must consider total circuit load and protective device coordination</li>
                           <li>Factor in voltage drop calculations and effect on connected equipment</li>
                           <li>Consider cumulative effect of multiple socket outlets and typical load patterns</li>
                           <li>Document all findings with clear recommendations for remedial action</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2"><strong>Remedial Actions and Quality Assurance:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Tighten all terminations to manufacturer's torque specifications (typically 1.2Nm for MCBs)</li>
                           <li>Replace damaged cable sections using appropriate jointing methods (maintenance-free connectors)</li>
                           <li>Investigate and rectify causes of high resistance (corrosion, poor workmanship, damage)</li>
                           <li>Retest after remedial work to confirm acceptable values restored</li>
                           <li>Update test certificates and documentation with new readings and work performed</li>
                           <li>Consider upgrading circuits if fundamental design issues identified</li>
                           <li>Implement monitoring schedule for circuits showing marginal performance</li>
                         </ul>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Card>

        {/* Quick Knowledge Check */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Quick Knowledge Check</h2>
          <div className="space-y-6">
            {quickCheckQuestions.map((question, index) => (
              <InlineCheck
                key={question.id}
                id={`quick-check-${question.id}`}
                question={question.question}
                options={question.options}
                correctIndex={question.correctAnswer}
                explanation={question.explanation}
              />
            ))}
          </div>
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Practical Guidance</h2>
          <ul className="space-y-3 text-base text-white">
            <li className="flex items-start gap-2">
              <span className="text-white">•</span>
              <span>Always isolate circuit completely before testing and use GS38 compliant equipment</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-white">•</span>
              <span>Test all three conductors (line, neutral, earth) separately to identify specific faults</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-white">•</span>
              <span>Zero your test instrument before each series of measurements</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-white">•</span>
              <span>Compare readings between legs - they should be approximately equal</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-white">•</span>
              <span>Document all readings clearly for future reference and comparison</span>
            </li>
          </ul>
        </Card>

        {/* Real World Example */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 border border-elec-yellow/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Real-World Example: Kitchen Ring Circuit Testing</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-white mb-3">Scenario</h3>
              <p className="text-base text-white mb-4">
                You're testing a kitchen ring circuit during a periodic inspection. The circuit is protected by a 32A MCB and serves 8 double socket outlets around the kitchen perimeter. Recent electrical work was carried out to install a new socket behind the fridge. The homeowner reports occasional tripping of the MCB when multiple appliances are used.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-3">Initial Safety Checks</h3>
              <ul className="text-xs sm:text-sm text-white space-y-2 ml-4 list-disc">
                <li><strong>Isolation:</strong> MCB switched off, locked out, and tested with proving unit</li>
                <li><strong>Prove Dead:</strong> GS38 voltage indicator confirms no voltage at all socket outlets</li>
                <li><strong>Visual Inspection:</strong> Check for obvious damage, loose connections, or overheating signs</li>
                <li><strong>Equipment Ready:</strong> Calibrated multifunction tester, test leads zeroed to 0.01Ω</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-3">End-to-End Continuity Results</h3>
              <div className="mt-4 bg-[#121212] border border-white/10 rounded-lg p-4">
                <p className="font-medium text-white mb-2">Test Measurements:</p>
                <ul className="text-xs sm:text-sm text-white space-y-1 ml-4">
                  <li>Line conductors: ∞ (Open Circuit)</li>
                  <li>Neutral conductors: ∞ (Open Circuit)</li>
                  <li>CPC conductors: 1.8Ω (Normal)</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-3">Fault Investigation and Findings</h3>
              <div className="space-y-3">
                <div className="p-3 border border-red-500/20 rounded">
                  <p className="text-xs sm:text-sm text-white"><strong>⚠️ Critical Finding:</strong> Ring circuit is broken - line and neutral showing infinite resistance</p>
                </div>
                <div className="p-3 border border-amber-500/20 rounded">
                  <p className="text-xs sm:text-sm text-white"><strong>🔍 Investigation:</strong> Traced to new socket installation where ring was not properly restored</p>
                </div>
                <div className="p-3 border border-red-500/20 rounded">
                  <p className="text-xs sm:text-sm text-white"><strong>🚨 Safety Risk:</strong> Circuit operating as 20-outlet radial with 2.5mm² cable - serious overload risk</p>
                </div>
                <div className="p-3 border border-elec-yellow/20 rounded">
                  <p className="text-xs sm:text-sm text-white"><strong>📋 Explanation:</strong> MCB tripping due to excessive current through single cable path</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-3">Immediate Actions and Resolution</h3>
              <ul className="text-xs sm:text-sm text-white space-y-2 ml-4 list-disc">
                <li><strong>Circuit Isolated:</strong> MCB locked off with clear labelling - "DANGER - BROKEN RING CIRCUIT"</li>
                <li><strong>Client Informed:</strong> Explained safety risks and need for immediate electrical work</li>
                <li><strong>Remedial Work:</strong> Proper ring circuit restoration at new socket location</li>
                <li><strong>Retest Results:</strong> Line: 1.1Ω, Neutral: 1.1Ω, CPC: 1.8Ω - all within acceptable limits</li>
                <li><strong>EICR Code:</strong> Initially C1 (Danger Present), resolved to satisfactory after repair</li>
                <li><strong>Documentation:</strong> Full report with before/after readings and photographic evidence</li>
              </ul>
            </div>

            <div className="p-4 bg-transparent border border-green-500/20 rounded">
              <h4 className="font-semibold text-white mb-2">Learning Points</h4>
              <ul className="text-xs sm:text-sm text-white space-y-1 ml-4 list-disc">
                <li>Ring continuity testing immediately identified dangerous condition</li>
                <li>Apparent electrical problems (MCB tripping) had serious underlying safety cause</li>
                <li>Recent electrical work was poorly executed, compromising circuit safety</li>
                <li>Proper testing prevented potential fire risk from prolonged overloading</li>
                <li>Comprehensive documentation essential for liability and insurance purposes</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/10 last:border-0 pb-4 last:pb-0">
                <h3 className="font-medium text-white mb-2">{faq.question}</h3>
                <p className="text-sm text-white">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Pocket Guide</h2>
          <div className="bg-card border border-elec-yellow/20 p-6 rounded-lg">
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <h3 className="font-semibold text-elec-yellow text-elec-yellow mb-3">Key Takeaways</h3>
                <ul className="space-y-1 text-xs sm:text-sm text-white">
                  <li>• Ring circuits must form complete loops</li>
                  <li>• Test using end-to-end resistance method</li>
                  <li>• Both legs should show similar resistance</li>
                  <li>• Broken rings become dangerous radials</li>
                  <li>• Always isolate before testing</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-elec-yellow text-elec-yellow mb-3">Critical Points</h3>
                <ul className="space-y-1 text-xs sm:text-sm text-white">
                  <li>• Infinite resistance = broken ring</li>
                  <li>• Test line, neutral, and earth separately</li>
                  <li>• Document all readings carefully</li>
                  <li>• High resistance indicates faults</li>
                  <li>• Safety is paramount - isolate if in doubt</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Summary Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Recap</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-white mb-3">What We Learned</h3>
              <ul className="space-y-2 text-base text-white">
                <li>• The critical importance of ring circuit integrity</li>
                <li>• How to perform end-to-end continuity testing</li>
                <li>• How to interpret test results and identify faults</li>
                <li>• The serious safety risks of broken ring circuits</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-3">Key Skills Gained</h3>
              <ul className="space-y-2 text-base text-white">
                <li>• Ring continuity testing using proper instruments</li>
                <li>• Fault diagnosis and investigation techniques</li>
                <li>• Safety assessment and risk classification</li>
                <li>• Documentation and certification requirements</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Quiz */}
        <Quiz questions={quizQuestions} />

        {/* Navigation */}
        <div className="flex gap-4 mt-8">
          <Button variant="outline" className="flex-1 h-auto py-3 px-4" asChild>
            <Link to="../4-1" className="flex items-center justify-center text-center">
              <ArrowLeft className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="flex-1">
                <span className="block text-xs text-white">Previous</span>
                <span className="block font-medium">Subsection 4.1</span>
              </span>
            </Link>
          </Button>
          <Button className="flex-1 h-auto py-3 px-4" asChild>
            <Link to=".." className="flex items-center justify-center text-center">
              <span className="flex-1">
                <span className="block text-xs text-primary-foreground/80">Back to</span>
                <span className="block font-medium">Section 4 Overview</span>
              </span>
              <ArrowLeft className="w-4 h-4 ml-2 flex-shrink-0 rotate-180" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module6Section4_2;