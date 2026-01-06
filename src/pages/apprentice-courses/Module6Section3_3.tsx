import { ArrowLeft, Eye, Target, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module6Section3_3 = () => {
  useSEO(
    "Setting Up and Zeroing Instruments - Level 2 Electrical Testing & Inspection",
    "Proper preparation and calibration of test equipment"
  );

  // Quiz questions
  const quizQuestions = [
    {
      id: 1,
      question: "Why must instruments be zeroed before testing?",
      options: ["To save time", "To correct for internal resistance", "To extend battery life", "To look professional"],
      correctAnswer: 1,
      explanation: "Zeroing corrects for internal resistance and ensures accurate readings by establishing a known reference point."
    },
    {
      id: 2,
      question: "What should a continuity tester read when leads are shorted?",
      options: ["5 Ω", "0 Ω", "Infinity", "1 Ω"],
      correctAnswer: 1,
      explanation: "When test leads are shorted together, a properly zeroed continuity tester should read 0 Ω (zero ohms)."
    },
    {
      id: 3,
      question: "What should an insulation resistance tester read with open leads?",
      options: ["0 Ω", "Infinity (∞)", "1 Ω", "100 MΩ"],
      correctAnswer: 1,
      explanation: "With leads separated (open circuit), an insulation resistance tester should show infinity (∞) before applying test voltage."
    },
    {
      id: 4,
      question: "Which of the following is a pre-use check?",
      options: ["Checking batteries and fuses", "Shaking the tester", "Switching ranges repeatedly", "Testing on random circuits"],
      correctAnswer: 0,
      explanation: "Pre-use checks include verifying batteries, fuses, physical condition, and GS38 compliance of test equipment."
    },
    {
      id: 5,
      question: "True or False: Digital meters never need checking or zeroing.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False. Even digital meters with auto-zero features require lead checks and verification before use."
    },
    {
      id: 6,
      question: "What problem might occur if a meter isn't zeroed?",
      options: ["Inaccurate readings", "Faster testing", "Longer battery life", "Better accuracy"],
      correctAnswer: 0,
      explanation: "Failure to zero instruments can lead to inaccurate readings, false fault diagnoses, and unsafe conditions."
    },
    {
      id: 7,
      question: "Why should instruments be recalibrated regularly?",
      options: ["To comply with regulations", "To reset the clock", "To change fuses", "To update software"],
      correctAnswer: 0,
      explanation: "Regular calibration ensures continued accuracy and compliance with industry standards and regulations."
    },
    {
      id: 8,
      question: "What should you do if an instrument cannot be zeroed?",
      options: ["Continue anyway", "Remove it from service", "Hit it gently", "Use different leads"],
      correctAnswer: 1,
      explanation: "If an instrument cannot be zeroed properly, it must be removed from service and inspected or recalibrated."
    },
    {
      id: 9,
      question: "When should you re-check zeroing?",
      options: ["After lunch", "After moving or dropping the instrument", "After testing the first circuit only", "Once per week"],
      correctAnswer: 1,
      explanation: "Instruments should be re-zeroed after being moved, dropped, or exposed to temperature changes that could affect calibration."
    },
    {
      id: 10,
      question: "What is the correct action if a continuity test shows resistance due to un-zeroed leads?",
      options: ["Assume a fault", "Re-zero the instrument", "Replace the circuit immediately", "Continue testing"],
      correctAnswer: 1,
      explanation: "If unexpected resistance readings appear, first re-zero the instrument to eliminate lead resistance before diagnosing faults."
    }
  ];

   const faqs = [
     {
       question: "Do digital meters need zeroing?",
       answer: "Most auto-zero, but still require a lead check before use to ensure accuracy and proper operation. Even auto-zeroing instruments should be verified with leads shorted."
     },
     {
       question: "How often should calibration be carried out?",
       answer: "Annually or as specified by the manufacturer/site requirements. Some high-precision work may require more frequent calibration. Critical applications may need 6-monthly checks."
     },
     {
       question: "What if my instrument cannot be zeroed?",
       answer: "Remove it from service immediately and have it inspected or recalibrated by a qualified technician. Never attempt to use an instrument that cannot be properly zeroed."
     },
     {
       question: "Why do lead resistances vary between different test leads?",
       answer: "Different lead lengths, wire gauges, and connection quality affect resistance. This is why zeroing with the actual leads to be used is essential for accurate measurements."
     },
     {
       question: "Can temperature affect instrument accuracy?",
       answer: "Yes, extreme temperatures can affect calibration. Allow instruments to acclimatise for 15-30 minutes and re-check zeroing when moving between different temperature environments."
     },
     {
       question: "What&apos;s the difference between auto-zero and manual zeroing?",
       answer: "Auto-zero automatically compensates for internal offsets, while manual zeroing requires the user to adjust the instrument. Both methods require verification before use."
     },
     {
       question: "How do I know if my zeroing is accurate enough?",
       answer: "The zero reading should be stable within ±0.01 Ω for most applications. If readings fluctuate significantly, investigate environmental factors or instrument condition."
     },
     {
       question: "Should I zero the instrument every time I change test leads?",
       answer: "Yes, different test leads have different resistance values. Always zero with the specific leads you will use for testing to ensure accuracy."
     },
     {
       question: "What environmental factors affect instrument zeroing?",
       answer: "Temperature, humidity, electromagnetic interference, and vibration can all affect readings. Test in stable conditions where possible and re-zero if conditions change significantly."
     },
     {
       question: "Is it necessary to zero before every individual test?",
       answer: "Not necessarily, but check zero periodically during extended testing sessions. Always re-zero after instrument has been moved, dropped, or exposed to temperature changes."
     },
     {
       question: "Can I use an instrument that zeros to 0.1 Ω instead of 0.0 Ω?",
       answer: "This may indicate the instrument needs calibration. While 0.1 Ω might be acceptable for some tests, it could affect accuracy for precise measurements like R1+R2 values."
     },
     {
       question: "What should I do if zeroing changes when I move the test leads?",
       answer: "This suggests damaged or deteriorating leads. Check for internal breaks, loose connections, or contamination. Replace leads immediately if this occurs."
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
              Back to Section 6.3
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
              <Eye className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 6.3.3
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Setting Up and Zeroing Instruments
          </h1>
          <p className="text-white">
            Proper preparation and calibration of test equipment
          </p>
        </header>

        {/* Spot it in 30 Seconds Card */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
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
                  <span>Zero check: short leads for continuity (0 Ω reading)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Open circuit check: IR tester shows infinity (∞)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Battery and fuse verification in test instruments</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Physical inspection: cracks, damage, lead integrity</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-elec-yellow/20">
              <p className="font-medium mb-3">Spot it / Use it / Check it</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span><strong>Spot:</strong> Non-zeroed meters, damaged leads, drift after drops or temperature change</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span><strong>Use:</strong> Proper zeroing sequence before every test; prove-zero-test routine</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span><strong>Check:</strong> Re-zero after movement; calibration dates; accurate baseline readings</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <p className="text-base text-white mb-4">
            Before any electrical testing can be carried out, instruments must be properly prepared and checked. Zeroing ensures that the instrument reads accurately and that environmental or internal resistance factors are accounted for.
          </p>
          <p className="text-base text-white">
            Incorrect setup or failure to zero instruments can lead to false readings, misdiagnosis of faults, or unsafe conditions. This process is fundamental to reliable electrical testing and safety compliance.
          </p>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning Outcomes</h2>
          <p className="text-base text-white mb-4">By the end of this subsection, you will be able to:</p>
          <ul className="list-disc pl-6 space-y-2 text-base text-white">
            <li>Explain why setting up and zeroing instruments is essential.</li>
            <li>Perform a pre-use check on test instruments.</li>
            <li>Zero instruments correctly before use.</li>
            <li>Identify problems caused by incorrect zeroing.</li>
            <li>Apply best practices to maintain accuracy and safety.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content / Learning</h2>

          {/* 1. Why Zero Instruments? */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow text-elec-yellow mb-3">Why Zero Instruments?</p>
                    
                    <div className="space-y-4">
                       <div>
                         <p className="text-base text-white mb-2"><strong>Internal Resistance Factors:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>All instruments have internal resistance that affects readings (typically 0.1-2.0 Ω)</li>
                           <li>Test leads add resistance that varies with length and condition (0.02-0.5 Ω per metre)</li>
                           <li>Connection resistance at probe tips can introduce errors (0.01-0.1 Ω per connection)</li>
                           <li>Temperature changes affect resistance values in components and connections</li>
                           <li>Aging components and wear can cause resistance drift over time</li>
                           <li>Contamination on contacts and probes increases resistance unpredictably</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2"><strong>Calibration and Accuracy Requirements:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Zeroing corrects the instrument to a known reference point (0 Ω baseline)</li>
                           <li>Ensures accurate continuity and insulation resistance readings within ±5% tolerance</li>
                           <li>Eliminates offset errors that can mask or create false faults in circuits</li>
                           <li>Maintains measurement integrity throughout extended testing procedures</li>
                           <li>Provides traceability to national measurement standards for certification</li>
                           <li>Compensates for environmental factors like humidity and temperature</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2"><strong>BS 7671 Compliance:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Section 643 requires test equipment to be verified before use</li>
                           <li>Accurate measurements essential for protective device coordination calculations</li>
                           <li>Incorrect readings can lead to non-compliant certification and legal issues</li>
                           <li>Professional duty of care requires using properly calibrated equipment</li>
                         </ul>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="zeroing-purpose"
            question="What does zeroing correct for in an instrument?"
            options={["Battery voltage", "Internal/lead resistance", "Temperature only", "Display brightness"]}
            correctIndex={1}
            explanation="Zeroing corrects for internal instrument resistance and lead resistance, establishing an accurate reference point for measurements."
          />
          <Separator className="my-6" />

          {/* 2. Pre-Use Checks */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 text-elec-yellow mb-3">Pre-Use Checks</p>
                    
                    <div className="space-y-4">
                       <div>
                         <p className="text-base text-white mb-2"><strong>Physical Inspection Checklist:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Inspect for physical damage: cracked casing, worn leads, damaged insulation</li>
                           <li>Check test leads for cuts, nicks, or exposed conductors that could cause shock</li>
                           <li>Verify probe tips are not damaged, bent, or excessively worn</li>
                           <li>Ensure case integrity, display clarity, and button/dial operation</li>
                           <li>Check for loose connections in lead terminations and probe assemblies</li>
                           <li>Verify protective sleeves and guards are in place and undamaged</li>
                           <li>Look for signs of moisture ingress or contamination</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2"><strong>Functional Verification Steps:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Verify batteries are charged and fuses are intact (check indicator lights)</li>
                           <li>Confirm GS38 compliance: shrouded tips (≤4mm exposed), fused leads, proper CAT rating</li>
                           <li>Test range selection and display operation across all measurement functions</li>
                           <li>Check calibration date and validity (typically 12 months from last service)</li>
                           <li>Verify auto-ranging and manual range selection functions correctly</li>
                           <li>Test battery condition indicator and low battery warning systems</li>
                           <li>Confirm continuity and insulation test functions operate properly</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2"><strong>Documentation and Records:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Record serial numbers and calibration due dates in equipment log</li>
                           <li>Note any defects or concerns discovered during inspection</li>
                           <li>Verify instrument is assigned to qualified personnel only</li>
                           <li>Check manufacturer&apos;s instruction manual is available if needed</li>
                         </ul>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="continuity-short"
            question="What should a continuity tester read when leads are shorted?"
            options={["5 Ω", "0 Ω", "1 Ω", "Infinity"]}
            correctIndex={1}
            explanation="When test leads are shorted together, a properly zeroed continuity tester should read 0 Ω (zero ohms)."
          />
          <Separator className="my-6" />

          {/* 3. Zeroing a Continuity Tester or Multimeter */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 text-elec-yellow mb-3">Zeroing a Continuity Tester or Multimeter</p>
                    
                    <div className="space-y-4">
                       <div>
                         <p className="text-base text-white mb-2"><strong>Step-by-Step Zeroing Procedure:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li><strong>Step 1:</strong> Select resistance/continuity function on instrument</li>
                           <li><strong>Step 2:</strong> Choose appropriate measurement range (auto or manual)</li>
                           <li><strong>Step 3:</strong> Short the test leads together firmly at the probe tips</li>
                           <li><strong>Step 4:</strong> Adjust zero dial (manual) or wait for auto-zero (digital)</li>
                           <li><strong>Step 5:</strong> Confirm reading shows exactly 0.00 Ω when properly zeroed</li>
                           <li><strong>Step 6:</strong> Note the ambient temperature for reference</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2"><strong>Verification and Testing:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Confirm zero reading is stable and consistent over 10-15 seconds</li>
                           <li>Separate leads to verify open circuit shows OL (overload) or high resistance</li>
                           <li>Re-short leads to confirm zero reading returns immediately</li>
                           <li>Test on known good continuity path (e.g., short piece of cable) if available</li>
                           <li>Check that readings are repeatable within instrument tolerance</li>
                           <li>Verify the instrument responds correctly to different resistance values</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2"><strong>Common Zeroing Issues:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Instrument won&apos;t zero: check battery level and lead connections</li>
                           <li>Unstable zero reading: clean probe tips and check for loose connections</li>
                           <li>Cannot achieve exact zero: may indicate calibration drift - service required</li>
                           <li>Zero drifts after initial setting: allow longer warm-up time or check temperature</li>
                         </ul>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

           {/* 4. Zeroing an Insulation Resistance Tester */}
           <section className="mb-6">
             <div className="space-y-6">
               <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-3">Zeroing an Insulation Resistance Tester</p>
                    
                    <div className="space-y-4">
                       <div>
                         <p className="text-base text-white mb-2"><strong>IR Tester Setup:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Ensure leads are separated (no load connected to avoid damage)</li>
                           <li>Select appropriate test voltage (250V for SELV, 500V for 230V circuits, 1000V for 400V+)</li>
                           <li>Confirm that meter reads infinity (∞) before applying test voltage</li>
                           <li>Verify test voltage matches circuit voltage rating and insulation class</li>
                           <li>Check ambient conditions don't affect readings (humidity, temperature)</li>
                           <li>Ensure circuit is completely isolated with all switches open</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2"><strong>Pre-Test Verification Steps:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Display shows infinity (∞) or overload (OL) indication with open leads</li>
                           <li>Test leads checked for damage, contamination, or moisture</li>
                           <li>Circuit proven dead using appropriate voltage indicator</li>
                           <li>All parallel paths isolated (switches off, equipment disconnected)</li>
                           <li>Safety barriers and warning signs positioned if required</li>
                           <li>Personnel informed of high voltage testing in progress</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2"><strong>Critical Safety Checks:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Never apply insulation test voltage to live circuits</li>
                           <li>Remove or isolate electronic equipment before testing</li>
                           <li>Ensure adequate clearance distances from personnel</li>
                           <li>Verify circuit can safely withstand test voltage level</li>
                         </ul>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="temperature-effect"
            question="Why must you re-check zeroing after temperature change?"
            options={["Battery drains faster", "Display becomes dim", "Accuracy may be affected", "Leads become stiff"]}
            correctIndex={2}
            explanation="Temperature changes can affect the accuracy of instruments and resistance values, requiring re-zeroing to maintain precision."
          />
          <Separator className="my-6" />

          {/* 5. Common Problems from Not Zeroing */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-amber-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                  <div className="flex-1">
                    <p className="font-semibold text-amber-600 dark:text-amber-400 mb-3">Common Problems from Not Zeroing</p>
                    
                    <div className="space-y-4">
                       <div>
                         <p className="text-base text-white mb-2"><strong>Common Zeroing Problems:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>False "open-circuit" readings on continuity tests due to lead resistance</li>
                           <li>Misinterpretation of insulation values caused by instrument drift</li>
                           <li>Safety hazards from incorrect fault diagnosis and wrong remedial action</li>
                           <li>Wasted time investigating non-existent faults or missing real problems</li>
                           <li>Compliance failures during inspection and testing procedures</li>
                           <li>Incorrect R1+R2 values leading to protective device coordination errors</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2"><strong>Impact on Safety and Testing:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Inaccurate readings leading to wrong conclusions about circuit integrity</li>
                           <li>Potential danger from undetected high resistance connections</li>
                           <li>Non-compliance with BS 7671 testing requirements and certification</li>
                           <li>Loss of confidence in test results and professional credibility</li>
                           <li>Increased risk of electrical fires from missed faults</li>
                           <li>Legal implications if faulty installations are incorrectly certified</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2"><strong>Real-World Consequences:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Electricians strip and re-terminate healthy circuits unnecessarily</li>
                           <li>Good circuits failed due to instrument error, not actual faults</li>
                           <li>Time and material costs from chasing phantom problems</li>
                           <li>Customer relations damaged by unnecessary work and delays</li>
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
           
           <div className="space-y-6">
             <div>
               <h3 className="font-medium text-white mb-3">Essential Pre-Testing Steps</h3>
               <ul className="space-y-3 text-base text-white">
                 <li className="flex items-start gap-3">
                   <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                   <span><strong>Always prove dead</strong> using appropriate voltage indicator before connecting test instruments</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                   <span><strong>Verify instrument functionality</strong> with proving unit before and after voltage testing</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                   <span><strong>Check test lead integrity</strong> and GS38 compliance before each use</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                   <span><strong>Ensure appropriate CAT rating</strong> for the electrical environment being tested</span>
                 </li>
               </ul>
             </div>

             <div>
               <h3 className="font-medium text-white mb-3">Zeroing Best Practices</h3>
               <ul className="space-y-3 text-base text-white">
                 <li className="flex items-start gap-3">
                   <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                   <span><strong>Zero instruments at the test location</strong>, not in the van or office</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                   <span><strong>Use the actual test leads</strong> that will be used for testing</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                   <span><strong>Re-zero if instrument is dropped</strong>, jolted, or exposed to significant temperature change</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                   <span><strong>Allow instruments to acclimatise</strong> when moving between different temperature environments</span>
                 </li>
               </ul>
             </div>

             <div>
               <h3 className="font-medium text-white mb-3">Storage and Maintenance</h3>
               <ul className="space-y-3 text-base text-white">
                 <li className="flex items-start gap-3">
                   <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                   <span><strong>Store instruments properly</strong> in protective cases to prevent calibration drift and physical damage</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                   <span><strong>Send meters for periodic calibration</strong> as required by industry standards (typically annually)</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                   <span><strong>Maintain calibration records</strong> and certificates for traceability</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                   <span><strong>Train all staff</strong> on proper zeroing and checking procedures</span>
                 </li>
               </ul>
             </div>
           </div>
         </Card>

        {/* Real-World Example */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Real-World Example</h2>
          
          <div className="rounded-lg p-5 bg-amber-950/20 border border-amber-700/30 mb-4">
            <p className="text-base text-white mb-4">
              <strong>Scenario:</strong> During fault-finding, an electrician skipped zeroing a continuity tester. The meter showed a resistance reading of 1.5 Ω on a new circuit, suggesting a potential loose connection. The circuit was unnecessarily stripped and re-terminated, wasting time.
            </p>
            <p className="text-base text-white">
              The issue was later found to be the tester itself, which had not been zeroed properly. The 1.5 Ω was simply the resistance of the test leads.
            </p>
          </div>

          <div className="rounded-lg p-4 bg-elec-yellow/10 border border-blue-700/30">
            <p className="text-base text-white">
              <strong>Professional Insight:</strong> Always zero before use to avoid misdiagnosis and wasted work. A simple 30-second zeroing procedure can save hours of unnecessary troubleshooting.
            </p>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-l-4 border-l-elec-yellow/50 pl-4">
                <h3 className="font-medium text-white mb-2">Q: {faq.question}</h3>
                <p className="text-sm text-white">A: {faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-8 p-6 bg-gradient-to-br from-elec-yellow/10 via-elec-yellow/5 to-transparent border-elec-yellow/30">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span>📋</span>
            Pocket Guide: Zeroing Essentials
          </h2>
          <div className="space-y-2 text-base text-white">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Zero before every test.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Continuity tester = 0 Ω when shorted.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>IR tester = ∞ before applying test voltage.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Re-check zeroing after moving or dropping instruments.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Calibration = key to long-term accuracy.</span>
            </div>
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6">Recap</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
            <div className="p-4 rounded-lg bg-muted/50 border border-white/10">
              <p className="text-sm font-medium text-white mb-1">Accuracy</p>
              <p className="text-xs text-white">Zeroing ensures accurate, reliable measurements</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50 border border-white/10">
              <p className="text-sm font-medium text-white mb-1">Continuity 0 Ω</p>
              <p className="text-xs text-white">Continuity testers should read 0 Ω when shorted</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50 border border-white/10">
              <p className="text-sm font-medium text-white mb-1">IR ∞ Open</p>
              <p className="text-xs text-white">Insulation resistance testers should show ∞ with open leads</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50 border border-white/10">
              <p className="text-sm font-medium text-white mb-1">Re-check</p>
              <p className="text-xs text-white">Poor zeroing = wasted time, false faults, unsafe conclusions</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50 border border-white/10">
              <p className="text-sm font-medium text-white mb-1">Prove-Zero-Check</p>
              <p className="text-xs text-white">Always prove, zero, and re-check instruments for safety</p>
            </div>
          </div>
        </Card>

        {/* Quiz */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6">Test Your Knowledge</h2>
          <Quiz questions={quizQuestions} />
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <Button variant="outline" asChild>
            <Link to="../3-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: GS38 compliance and tester safety
            </Link>
          </Button>
          
          <Button asChild>
            <Link to="..">
              Back to Section Overview
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module6Section3_3;