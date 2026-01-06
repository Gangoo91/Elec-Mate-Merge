import { ArrowLeft, Eye, Target, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module6Section4_1 = () => {
  useSEO(
    "Continuity of Protective Conductors (CPCs) - Level 2 Electrical Testing & Inspection",
    "Essential testing procedures for CPCs to ensure electrical safety and fault protection"
  );

  // Quick check questions
  const quickCheckQuestions = [
    {
      id: 1,
      question: "What is the purpose of the CPC?",
      options: ["Power distribution", "Fault protection", "Lighting control"],
      correctAnswer: 1,
      explanation: "The CPC provides a low-resistance path for fault currents, ensuring protective devices operate quickly and safely."
    },
    {
      id: 2,
      question: "Name one instrument used for CPC continuity testing.",
      options: ["Clamp meter", "Low-resistance ohmmeter", "Thermal camera"],
      correctAnswer: 1,
      explanation: "A low-resistance ohmmeter (part of a multifunction tester) is used for CPC continuity testing."
    },
    {
      id: 3,
      question: "What does a high resistance result suggest?",
      options: ["Good continuity", "Loose or broken connection", "Normal operation"],
      correctAnswer: 1,
      explanation: "High resistance indicates loose connections, breaks, or undersized conductors."
    }
  ];

  // Quiz questions
  const quizQuestions = [
    {
      id: 1,
      question: "What does CPC stand for?",
      options: ["Circuit Phase Conductor", "Circuit Protective Conductor", "Central Protective Cable"],
      correctAnswer: 1,
      explanation: "CPC stands for Circuit Protective Conductor."
    },
    {
      id: 2,
      question: "Why is CPC continuity essential?",
      options: ["It ensures lighting circuits operate correctly", "It provides a path for fault current to earth", "It reduces energy consumption"],
      correctAnswer: 1,
      explanation: "CPC continuity provides a path for fault current to earth, enabling protective device operation."
    },
    {
      id: 3,
      question: "Which test confirms both line and CPC continuity?",
      options: ["r1 test", "R1+R2 test", "End-to-end test only"],
      correctAnswer: 1,
      explanation: "The R1+R2 test confirms both line and CPC continuity simultaneously."
    },
    {
      id: 4,
      question: "What instrument is commonly used for CPC continuity testing?",
      options: ["Clamp meter", "Multifunction tester", "Thermal camera"],
      correctAnswer: 1,
      explanation: "A multifunction tester with low-resistance ohmmeter function is used for CPC testing."
    },
    {
      id: 5,
      question: "What should you do before testing?",
      options: ["Connect the supply", "Prove dead and isolate circuit", "Record initial readings"],
      correctAnswer: 1,
      explanation: "Always prove dead and isolate the circuit before conducting CPC continuity tests."
    },
    {
      id: 6,
      question: "What does a high resistance value on the CPC indicate?",
      options: ["Good continuity", "Loose or broken connection", "Oversized conductor"],
      correctAnswer: 1,
      explanation: "High resistance indicates loose connections, breaks, or other faults in the CPC."
    },
    {
      id: 7,
      question: "What document requires CPC continuity testing?",
      options: ["EAWR 1989", "BS 7671 Wiring Regulations", "Health and Safety at Work Act"],
      correctAnswer: 1,
      explanation: "BS 7671 Wiring Regulations require CPC continuity testing as part of verification procedures."
    },
    {
      id: 8,
      question: "In an R1+R2 test, what is linked together at the distribution board?",
      options: ["CPC and neutral", "Line and CPC", "Neutral and line"],
      correctAnswer: 1,
      explanation: "In an R1+R2 test, the line conductor and CPC are linked together at the distribution board."
    },
    {
      id: 9,
      question: "Why should test instruments be zeroed before testing?",
      options: ["To confirm earth fault loop impedance", "To remove lead resistance from results", "To protect the tester"],
      correctAnswer: 1,
      explanation: "Zeroing removes the resistance of test leads from the final results, ensuring accuracy."
    },
    {
      id: 10,
      question: "What is the main danger of a CPC not being continuous?",
      options: ["Circuit overload", "Risk of electric shock from exposed metalwork", "Poor lighting levels"],
      correctAnswer: 1,
      explanation: "A discontinuous CPC can result in exposed metalwork becoming live during fault conditions, creating a serious shock risk."
    }
  ];

  const faqs = [
    {
      question: "Do I need to test CPC continuity if the wiring is new?",
      answer: "Yes, all new installations require verification before being energised. New installations are no exception - testing verifies that installation work has been completed correctly."
    },
    {
      question: "What if my CPC readings vary slightly across sockets?",
      answer: "Small variations are normal due to differences in conductor length, but large discrepancies indicate a fault. Variations should be proportional to cable length and within expected ranges."
    },
    {
      question: "Is visual inspection enough?",
      answer: "No, physical testing is required to confirm electrical continuity. Visual inspection alone cannot detect high-resistance connections or internal cable damage."
    },
    {
      question: "How do I know if my readings are acceptable?",
      answer: "Compare results to design values or tables in BS 7671. Readings should be low and consistent with conductor size and length. Any sudden increases indicate potential faults."
    },
    {
      question: "What's the difference between end-to-end and R1+R2 testing?",
      answer: "End-to-end tests only the CPC, while R1+R2 tests both line and CPC simultaneously. R1+R2 is more comprehensive and commonly used in verification testing."
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
              Section 6.4.1
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Continuity of Protective Conductors (CPCs)
          </h1>
          <p className="text-white">
            Essential testing procedures for CPCs to ensure electrical safety and fault protection
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
                  <span>CPC provides fault current path to earth</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Test using low-resistance ohmmeter</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>R1+R2 test confirms both line and CPC</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Always isolate circuit before testing</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-elec-yellow/20">
              <p className="font-medium mb-3">Spot it / Use it / Check it</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span><strong>Spot:</strong> High-resistance connections, broken conductors, loose terminals</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span><strong>Use:</strong> Multifunction tester with GS38-compliant leads</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span><strong>Check:</strong> Zero instrument, test all points, record readings</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <p className="text-base text-white mb-4">
            The protective conductor, often referred to as the CPC (Circuit Protective Conductor), is essential in ensuring safety in electrical installations. It provides a low-resistance path for fault currents, ensuring protective devices (like fuses and MCBs) operate quickly and safely to disconnect supply.
          </p>
          <p className="text-base text-white">
            Testing CPC continuity is a critical verification step under BS 7671 to confirm all exposed-conductive-parts are effectively earthed.
          </p>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning Outcomes</h2>
          <p className="text-base text-white mb-4">By the end of this subsection, learners will be able to:</p>
          <ul className="space-y-3 text-base text-white">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Explain the role of CPCs in fault protection</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Identify when CPC continuity testing is required</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Carry out CPC continuity tests using the correct instruments</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Interpret results against expected values</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Record and evaluate test outcomes</span>
            </li>
          </ul>
        </Card>

        {/* Content / Learning */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content / Learning</h2>

          {/* 1. Purpose and Importance of CPC Testing */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 dark:text-elec-yellow mb-3">Purpose and Importance of CPC Testing</p>
                    
                    <div className="space-y-4">
                       <div>
                         <p className="text-base text-white mb-2"><strong>Safety Protection:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Provides low-resistance path for fault currents to earth - typically less than 1.67 ohms for domestic circuits</li>
                           <li>Ensures protective devices (MCBs, RCDs) operate within required disconnection times (0.4s for socket circuits, 5s for fixed equipment)</li>
                           <li>Prevents dangerous voltages appearing on exposed metalwork during fault conditions</li>
                           <li>Protects against electric shock by maintaining equipotential bonding throughout installation</li>
                           <li>Reduces fire risk from sustained fault currents that could cause overheating and ignition</li>
                           <li>Enables automatic disconnection of supply (ADS) - the primary method of protection in TN and TT systems</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2"><strong>Regulatory Compliance:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>BS 7671:2018+A2:2022 Section 612.2 requires verification of protective conductor continuity</li>
                           <li>Part P Building Regulations compliance for notifiable work in domestic installations</li>
                           <li>Electricity at Work Regulations 1989 - Regulation 4 requires precautions against danger</li>
                           <li>Health and Safety at Work Act 1974 - employer and employee duties for electrical safety</li>
                           <li>IET Guidance Note 3 provides detailed testing procedures and acceptable values</li>
                           <li>Insurance requirements and professional indemnity coverage depends on proper testing</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2"><strong>System Integrity and Performance:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Confirms earthing system effectiveness throughout entire electrical installation</li>
                           <li>Verifies correct installation and termination of protective conductors at all connection points</li>
                           <li>Detects high-resistance joints before they become dangerous or cause nuisance tripping</li>
                           <li>Ensures design fault loop impedance calculations remain valid and protective device coordination works</li>
                           <li>Maintains equipotential bonding integrity between all exposed and extraneous conductive parts</li>
                           <li>Confirms parallel earth paths are properly connected and provide redundancy</li>
                         </ul>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="cpc-purpose-check"
            question="What is the primary purpose of CPC continuity testing?"
            options={["To measure power consumption", "To ensure protective devices operate during faults", "To check cable insulation", "To measure voltage drop"]}
            correctIndex={1}
            explanation="CPC continuity testing ensures protective devices can operate correctly during fault conditions by providing a low-resistance path to earth."
          />
          <Separator className="my-6" />

          {/* 2. Testing Methods and Procedures */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow dark:text-elec-yellow mb-3">Testing Methods and Procedures</p>
                    
                    <div className="space-y-4">
                       <div>
                         <p className="text-base text-white mb-2"><strong>R1 + R2 Method (Recommended for New Installations):</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Link line and CPC at distribution board using temporary fly lead (typically 4mm² or appropriate size)</li>
                           <li>Measure resistance between line and CPC at each outlet point using low resistance ohmmeter</li>
                           <li>Tests both line conductor and CPC continuity simultaneously in one measurement</li>
                           <li>Most comprehensive method - detects faults in either conductor</li>
                           <li>Results directly relate to fault loop impedance calculations (Zs = Ze + R1 + R2)</li>
                           <li>Required for all socket outlets, fixed equipment connections, and lighting circuits</li>
                           <li>Typical acceptable values: 0.05-2.0 ohms depending on conductor size and circuit length</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2"><strong>End-to-End CPC Test (Alternative Method):</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Test CPC continuity from distribution board earth terminal to furthest circuit point</li>
                           <li>Measure resistance between CPC terminals at consumer unit and final accessory</li>
                           <li>Isolates CPC testing from line conductor - useful for fault diagnosis</li>
                           <li>Particularly useful for fault finding on existing installations with high resistance readings</li>
                           <li>Can identify specific cable sections or joints with elevated resistance</li>
                           <li>Essential for testing main equipotential bonding conductors to gas, water, oil installations</li>
                           <li>Results should typically be less than half the R1+R2 value (as CPC often smaller CSA than line)</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2"><strong>Step-by-Step Testing Procedure:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li><strong>Step 1:</strong> Isolate circuit completely at consumer unit/distribution board and prove dead</li>
                           <li><strong>Step 2:</strong> Remove or disconnect any electronic equipment (dimmers, timers, smoke detectors)</li>
                           <li><strong>Step 3:</strong> Zero the ohmmeter using short test leads (typically 0.01-0.02 ohms lead resistance)</li>
                           <li><strong>Step 4:</strong> For R1+R2: link line and CPC at board, measure at each outlet L-E terminals</li>
                           <li><strong>Step 5:</strong> Record results on appropriate test certificate (EIC, EICR, or Minor Works)</li>
                           <li><strong>Step 6:</strong> Compare results to expected values based on conductor specifications</li>
                           <li><strong>Step 7:</strong> Investigate any unusually high readings or unexpected variations</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2"><strong>Common Testing Challenges:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Parallel earth paths through structural steelwork or metallic services can affect readings</li>
                           <li>Electronic equipment with filters or surge protectors must be disconnected</li>
                           <li>Long test leads can introduce significant resistance - use appropriate lead lengths</li>
                           <li>Temperature variations affect conductor resistance (use correction factors if necessary)</li>
                           <li>Poor contact at test points can give false high resistance readings</li>
                           <li>Ensure clean, tight connections at test probe points for accurate measurements</li>
                         </ul>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="cpc-methods-check"
            question="What does scorching around electrical accessories typically indicate?"
            options={["Normal ageing", "Overheating due to loose connections or overloading", "Recent cleaning", "High-quality installation"]}
            correctIndex={1}
            explanation="Scorching indicates overheating due to loose connections or overloading, which requires immediate investigation and rectification."
          />
          <Separator className="my-6" />

          {/* 3. Interpretation of Results */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-3">Interpretation of Results</p>
                    
                    <div className="space-y-4">
                       <div>
                         <p className="text-base text-white mb-2"><strong>Acceptable Values and Limits:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>R1+R2 values should be low and proportional to conductor length and cross-sectional area</li>
                           <li>Typical domestic socket circuit (32A, 4mm²): R1+R2 should be 0.2-1.2 ohms depending on length</li>
                           <li>Lighting circuits (6A, 1.5mm²): R1+R2 typically 0.5-3.0 ohms for reasonable cable runs</li>
                           <li>Cooker circuits (32A, 6mm²): R1+R2 should be 0.15-0.8 ohms for typical installations</li>
                           <li>Values must ensure maximum disconnection times are met (0.4s for TN systems, 0.2s for certain circuits)</li>
                           <li>Consistent readings across similar circuit points indicate good installation quality</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2"><strong>Fault Indicators and Investigation:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Infinite resistance (open circuit) indicates broken or disconnected CPC - immediate safety concern</li>
                           <li>Unexpectedly high resistance suggests loose connections, corroded joints, or undersized conductors</li>
                           <li>Significantly different values at similar distances indicate installation faults or cable damage</li>
                           <li>Readings that don't correlate with cable manufacturer specifications require investigation</li>
                           <li>Values that compromise protective device operation times must be rectified immediately</li>
                           <li>Sudden increases in resistance between test points indicate localised high-resistance joints</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2"><strong>Documentation and Certification:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Record all R1+R2 measurements on Electrical Installation Certificate (EIC) Schedule of Test Results</li>
                           <li>Note ambient temperature during testing (standard reference is 20°C)</li>
                           <li>Document any remedial work required and actions taken to rectify faults</li>
                           <li>Compare results to design values and manufacturer's cable specifications</li>
                           <li>For EICR work, flag any readings requiring immediate attention (C1/C2 codes)</li>
                           <li>Retain test records for minimum periods as required by BS 7671 and building regulations</li>
                           <li>Include test instrument details, calibration dates, and test conditions</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2"><strong>Troubleshooting High Resistance Readings:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Check all terminations for tightness and corrosion at consumer unit and accessories</li>
                           <li>Inspect cable routes for physical damage, crushing, or penetration by fixings</li>
                           <li>Verify correct cable types and sizes have been installed as per design</li>
                           <li>Test individual cable sections to isolate the location of high resistance</li>
                           <li>Consider effects of parallel paths through bonding or structural metalwork</li>
                           <li>Remake poor connections and retest to confirm resistance reduction</li>
                         </ul>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Practical Guidance</h2>
          <ul className="space-y-3 text-base text-white">
            <li className="flex items-start gap-2">
              <span className="text-white">•</span>
              <span>Run through all CPC points on a ring or radial circuit</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-white">•</span>
              <span>Always zero instruments before testing</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-white">•</span>
              <span>Ensure good contact with metal parts (use crocodile clips where possible)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-white">•</span>
              <span>For larger installations, keep a log of measured values to spot patterns or faults</span>
            </li>
          </ul>
        </Card>

        {/* Real World Example */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 border border-elec-yellow/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Real-World Example: Kitchen Ring Circuit CPC Testing</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-white mb-3">Scenario</h3>
              <p className="text-base text-white mb-4">
                You are testing a newly installed kitchen ring circuit (32A MCB, 2.5mm² twin and earth cable) that serves 6 double socket outlets around a kitchen. The circuit has been installed using the radial method initially, then linked at the far end to create the ring. Total cable length is approximately 45 metres.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-3">Pre-Test Setup</h3>
              <ul className="text-xs sm:text-sm text-white space-y-2 ml-4 list-disc">
                <li><strong>Safety First:</strong> Circuit isolated at consumer unit, MCB switched off and locked</li>
                <li><strong>Prove Dead:</strong> GS38 voltage indicator confirms no voltage at each socket outlet</li>
                <li><strong>Equipment:</strong> Megger MFT1741 multifunction tester, test leads zeroed (0.01Ω lead resistance)</li>
                <li><strong>Preparation:</strong> All socket outlets accessible, no equipment connected</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-3">R1+R2 Testing Procedure</h3>
              <ul className="text-xs sm:text-sm text-white space-y-2 ml-4 list-disc">
                <li><strong>Step 1:</strong> At consumer unit, link L1 and CPC terminals using 4mm² fly lead</li>
                <li><strong>Step 2:</strong> Test at each socket between L and E terminals:</li>
              </ul>
              
              <div className="mt-4 bg-[#121212] border border-white/10 rounded-lg p-4">
                <p className="font-medium text-white mb-2">Test Results:</p>
                <ul className="text-xs sm:text-sm text-white space-y-1 ml-4">
                  <li>Socket 1 (nearest): 0.28Ω</li>
                  <li>Socket 2: 0.45Ω</li>
                  <li>Socket 3: 0.62Ω</li>
                  <li>Socket 4: 0.58Ω</li>
                  <li>Socket 5: 0.41Ω</li>
                  <li>Socket 6 (furthest): 0.31Ω</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-3">Analysis and Interpretation</h3>
              <div className="space-y-3">
                <div className="p-3 border border-green-500/20 rounded">
                  <p className="text-xs sm:text-sm text-white"><strong>✓ Good News:</strong> All readings are acceptably low (under 1Ω) indicating good continuity</p>
                </div>
                <div className="p-3 border border-green-500/20 rounded">
                  <p className="text-xs sm:text-sm text-white"><strong>✓ Ring Integrity:</strong> Sockets 1 and 6 show similar low values, confirming ring is complete</p>
                </div>
                <div className="p-3 border border-green-500/20 rounded">
                  <p className="text-xs sm:text-sm text-white"><strong>✓ Design Compliance:</strong> Maximum reading (0.62Ω) well within limits for 32A protection</p>
                </div>
                <div className="p-3 border border-elec-yellow/20 rounded">
                  <p className="text-xs sm:text-sm text-white"><strong>📋 Pattern Recognition:</strong> Resistance increases towards middle of ring (sockets 3&4) as expected</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-3">Certification and Documentation</h3>
              <ul className="text-xs sm:text-sm text-white space-y-2 ml-4 list-disc">
                <li>Results recorded on EIC Schedule of Test Results under "R1+R2" column</li>
                <li>Maximum value (0.62Ω) noted for fault loop impedance calculations</li>
                <li>Ambient temperature: 18°C (within acceptable range, no correction needed)</li>
                <li>Test instrument: Megger MFT1741, calibration valid until March 2025</li>
                <li>All readings confirm circuit suitable for energisation and normal service</li>
              </ul>
            </div>

            <div className="p-4 bg-transparent border border-amber-500/20 rounded">
              <h4 className="font-semibold text-white mb-2">What if Socket 4 had read 3.2Ω?</h4>
              <p className="text-xs sm:text-sm text-white mb-2">This would indicate a fault requiring investigation:</p>
              <ul className="text-xs sm:text-sm text-white space-y-1 ml-4 list-disc">
                <li>Check terminations at socket 4 for loose connections</li>
                <li>Inspect cable route for damage or crushing</li>
                <li>Test individual legs of ring to isolate the fault</li>
                <li>High resistance could prevent MCB operation within required 0.4 seconds</li>
                <li>Circuit would fail verification and require remedial work before energisation</li>
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
                <h3 className="font-semibold text-emerald-700 dark:text-elec-yellow mb-3">Key Takeaways</h3>
                <ul className="space-y-1 text-xs sm:text-sm text-white">
                  <li>• CPC continuity ensures earth fault protection</li>
                  <li>• Test using a low-resistance ohmmeter</li>
                  <li>• R1+R2 confirms both line and CPC continuity</li>
                  <li>• Keep resistance values low and consistent</li>
                  <li>• Always isolate before testing</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-emerald-700 dark:text-elec-yellow mb-3">Critical Points</h3>
                <ul className="space-y-1 text-xs sm:text-sm text-white">
                  <li>• Zero instruments before every test</li>
                  <li>• Use GS38-compliant equipment only</li>
                  <li>• Record all readings accurately</li>
                  <li>• High resistance = potential fault</li>
                  <li>• Visual inspection is never enough</li>
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
                <li>• The importance of CPCs in fault protection</li>
                <li>• How to carry out CPC continuity tests</li>
                <li>• Acceptable resistance values and fault indicators</li>
                <li>• Real-world implications of poor CPC connections</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-3">Key Skills Gained</h3>
              <ul className="space-y-2 text-base text-white">
                <li>• CPC testing procedures using multifunctional testers</li>
                <li>• R1+R2 test methodology</li>
                <li>• Result interpretation and fault diagnosis</li>
                <li>• Safety protocols for continuity testing</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Quiz */}
        <Quiz questions={quizQuestions} />

        {/* Navigation */}
        <div className="flex gap-4 mt-8">
          <Button variant="outline" className="flex-1 h-auto py-3 px-4" asChild>
            <Link to=".." className="flex items-center justify-center text-center">
              <ArrowLeft className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="flex-1">
                <span className="block text-xs text-white">Previous</span>
                <span className="block font-medium">Section 4 Overview</span>
              </span>
            </Link>
          </Button>
          <Button className="flex-1 h-auto py-3 px-4" asChild>
            <Link to="../4-2" className="flex items-center justify-center text-center">
              <span className="flex-1">
                <span className="block text-xs text-primary-foreground/80">Next</span>
                <span className="block font-medium">Subsection 4.2</span>
              </span>
              <ArrowLeft className="w-4 h-4 ml-2 flex-shrink-0 rotate-180" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module6Section4_1;