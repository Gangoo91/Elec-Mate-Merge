import { ArrowLeft, Eye, Target, CheckCircle, Shield, AlertTriangle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module6Section3_5 = () => {
  useSEO(
    "Using a Proving Unit and Two-Pole Voltage Tester - Level 2 Electrical Testing & Inspection",
    "The most reliable way to confirm circuits are dead using proper testing equipment"
  );

  // Quiz questions
  const quizQuestions = [
    {
      id: 1,
      question: "What is the main purpose of a proving unit?",
      options: ["To test insulation resistance", "To confirm tester operation", "To measure voltage", "To check polarity"],
      correctAnswer: 1,
      explanation: "A proving unit confirms that your tester is working correctly before and after use, ensuring you can trust your test results."
    },
    {
      id: 2,
      question: "Which device is safest for proving dead?",
      options: ["Neon screwdriver", "Two-pole voltage tester", "Voltage pen", "Multimeter"],
      correctAnswer: 1,
      explanation: "Two-pole voltage testers are GS38-compliant and provide the safest, most reliable method for proving circuits are dead."
    },
    {
      id: 3,
      question: "What sequence is followed when proving dead?",
      options: ["Dead-live-dead", "Live-dead-live", "Lock-off only", "Test then isolate"],
      correctAnswer: 1,
      explanation: "The live-dead-live sequence ensures your tester works before testing, confirms the circuit is dead, then verifies the tester still works."
    },
    {
      id: 4,
      question: "What must you test between during proving?",
      options: ["L–N, L–E, N–E", "N–N only", "Earth only", "Live only"],
      correctAnswer: 0,
      explanation: "You must test between all combinations: L–N, L–E, and N–E to ensure all conductors are dead."
    },
    {
      id: 5,
      question: "True or False: A multimeter is recommended for proving dead.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False. Multimeters can give false or confusing readings and aren't recommended for proving dead."
    },
    {
      id: 6,
      question: "What could happen if you skip the re-prove step?",
      options: ["Nothing significant", "You may trust a faulty tester", "Faster isolation", "Better accuracy"],
      correctAnswer: 1,
      explanation: "If you skip re-proving, you might trust a tester that has failed during testing, leading to dangerous assumptions."
    },
    {
      id: 7,
      question: "What safety standard applies to testers and leads?",
      options: ["GS38", "BS 7671", "ISO 9001", "IEC 60364"],
      correctAnswer: 0,
      explanation: "GS38 is the safety standard that applies to electrical test equipment and leads."
    },
    {
      id: 8,
      question: "Which unsafe tool relies on your body for operation?",
      options: ["Neon screwdriver", "Proving unit", "Two-pole tester", "Digital meter"],
      correctAnswer: 0,
      explanation: "Neon screwdrivers rely on your body to complete the circuit, making them unsafe and non-compliant."
    },
    {
      id: 9,
      question: "Why are voltage pens not acceptable for proving dead?",
      options: ["They drain batteries too quickly", "They only detect potential presence, not confirm dead", "They are too heavy", "They are too expensive"],
      correctAnswer: 1,
      explanation: "Voltage pens only detect the presence of potential fields, they cannot reliably confirm a circuit is dead."
    },
    {
      id: 10,
      question: "When should you re-prove your tester?",
      options: ["Only at the end of the day", "Immediately after testing", "Only if the circuit seems faulty", "Once per week"],
      correctAnswer: 1,
      explanation: "You must re-prove your tester immediately after testing to confirm it hasn't failed during the testing process."
    }
  ];

  const faqs = [
    {
      question: "Can a multimeter replace a two-pole tester?",
      answer: "No — multimeters can give false or confusing readings and aren't recommended for proving dead. Only GS38-compliant two-pole voltage indicators should be used."
    },
    {
      question: "How often should proving units be checked?",
      answer: "They should be maintained and replaced according to the manufacturer's guidance. Many units have battery indicators and self-test functions that should be checked regularly."
    },
    {
      question: "Why can't I use a neon screwdriver?",
      answer: "They are not GS38 compliant and unsafe — they rely on your body to complete a circuit. They can give false readings and provide no indication of voltage level."
    },
    {
      question: "What if my proving unit stops working during a job?",
      answer: "Stop work immediately. You cannot safely prove dead without a functioning proving unit. Obtain a replacement before continuing with any electrical work."
    },
    {
      question: "How do I know if my tester leads are damaged?",
      answer: "Inspect leads before each use for cuts, exposed conductors, damaged insulation, or bent/damaged probe tips. Replace immediately if any damage is found."
    },
    {
      question: "Can I use the same tester for live testing and proving dead?",
      answer: "Yes, but ensure it's appropriate for both applications and meets GS38 requirements. Some testers are designed specifically for proving dead applications."
    },
    {
      question: "What voltage should a proving unit provide?",
      answer: "Typically 230V or similar to the system voltage being tested. Check the proving unit matches your tester's requirements and the system voltage."
    },
    {
      question: "Why do test leads need to be fused?",
      answer: "Fused leads limit fault current if the leads are accidentally connected across a supply, protecting both the user and the equipment from dangerous fault currents."
    },
    {
      question: "How long should I wait between isolation and testing?",
      answer: "Test immediately after isolation, but allow time for any stored energy (capacitors) to discharge. Follow equipment manufacturer's guidance for specific discharge times."
    },
    {
      question: "What if I get inconsistent readings when proving dead?",
      answer: "Stop and investigate. Check tester function on proving unit, inspect leads and connections, and verify isolation is complete. Never proceed if readings are inconsistent."
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
              <Zap className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 6.3.5
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Using a Proving Unit and Two-Pole Voltage Tester
          </h1>
          <p className="text-white">
            The most reliable way to confirm circuits are dead using proper testing equipment
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
                  <span>Two-pole voltage tester with fused, shrouded leads (GS38)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Proving unit to verify tester operation before and after</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Live-dead-live sequence: prove → test → re-prove</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Never use neon screwdrivers or voltage pens for proving dead</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-elec-yellow/20">
              <p className="font-medium mb-3">Spot it / Use it / Check it</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span><strong>Spot:</strong> GS38-compliant testers; proving units; damaged leads; unsafe tools</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span><strong>Use:</strong> Live-dead-live sequence; test all conductor combinations; proper PPE</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span><strong>Check:</strong> Tester function; lead condition; consistent readings; re-prove after use</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <p className="text-base text-white mb-4">
            The most reliable way to confirm that a circuit is dead and safe to work on is by using a two-pole voltage tester in combination with a proving unit. This method ensures your tester is functioning correctly before and after use, and that circuits are properly verified.
          </p>
          <p className="text-base text-white">
            This subsection will guide you through correct procedures, safety practices, and common pitfalls when using these essential pieces of safety equipment.
          </p>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning Outcomes</h2>
          <p className="text-base text-white mb-4">By the end of this subsection, you will be able to:</p>
          <ul className="list-disc pl-6 space-y-2 text-base text-white">
            <li>Identify the purpose of a proving unit and two-pole tester.</li>
            <li>Use both devices together as part of safe isolation.</li>
            <li>Follow the correct sequence for proving before and after testing.</li>
            <li>Recognise unsafe tools and practices (e.g., neon screwdrivers).</li>
            <li>Apply GS38 compliance to tester selection and use.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content / Learning</h2>

          {/* 1. Why Use a Proving Unit? */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow dark:text-elec-yellow mb-3">Why Use a Proving Unit?</p>
                    
                    <div className="space-y-4">
                       <div>
                         <p className="text-base text-white mb-2"><strong>Confirms Tester Operation:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Verifies that your voltage tester is working correctly before use</li>
                           <li>Provides a known voltage source for testing tester function</li>
                           <li>Confirms tester sensitivity and response to live circuits</li>
                           <li>Checks both visual and audible indication functions</li>
                           <li>Ensures batteries and internal components are functioning</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2"><strong>Ensures Live-Dead-Live Check:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Proves tester works before testing the circuit (live)</li>
                           <li>Tests the circuit to confirm it's dead (dead)</li>
                           <li>Re-proves tester still works after testing (live)</li>
                           <li>Identifies if tester fails during the proving process</li>
                           <li>Provides confidence in the test results</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2"><strong>Prevents False Results:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Detects faulty testers that might give false 'dead' readings</li>
                           <li>Identifies testers with flat batteries or internal faults</li>
                           <li>Prevents dangerous assumptions about circuit condition</li>
                           <li>Ensures consistent and reliable test methodology</li>
                           <li>Meets GS38 requirements for proving tester function</li>
                         </ul>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="proving-unit-purpose"
            question="What is the main purpose of a proving unit?"
            options={["To test insulation resistance", "To confirm tester operation", "To measure voltage", "To check polarity"]}
            correctIndex={1}
            explanation="A proving unit confirms that your voltage tester is working correctly before and after use, ensuring reliable test results."
          />
          <Separator className="my-6" />

          {/* 2. Why a Two-Pole Voltage Tester? */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-3">Why a Two-Pole Voltage Tester?</p>
                    
                    <div className="space-y-4">
                       <div>
                         <p className="text-base text-white mb-2"><strong>Direct Voltage Indication:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Provides direct measurement between two specific points</li>
                           <li>Shows actual voltage present across conductors</li>
                           <li>Clear visual and/or audible indication of voltage presence</li>
                           <li>No ambiguity about circuit condition</li>
                           <li>Works independently of earth connections</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2"><strong>Safety and Reliability:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Much safer than neon screwdrivers or single-pole devices</li>
                           <li>Doesn't rely on your body to complete the circuit</li>
                           <li>Provides consistent results regardless of user</li>
                           <li>Less susceptible to interference from nearby circuits</li>
                           <li>Can detect lower voltage levels reliably</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2"><strong>GS38 Compliance:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Meets all GS38 safety requirements for test equipment</li>
                           <li>Features fused test leads to limit fault current</li>
                           <li>Has shrouded or protected probe tips</li>
                           <li>Designed specifically for electrical safety testing</li>
                           <li>Appropriate CAT rating for the system voltage</li>
                         </ul>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="two-pole-tester"
            question="Why are two-pole voltage testers preferred over neon screwdrivers?"
            options={["They're cheaper", "They don't rely on your body", "They're faster", "They look more professional"]}
            correctIndex={1}
            explanation="Two-pole testers don't rely on your body to complete the circuit, making them much safer and more reliable than neon screwdrivers."
          />
          <Separator className="my-6" />

          {/* 3. The Correct Sequence */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-elec-yellow mb-3">The Correct Sequence (Live-Dead-Live)</p>
                    
                    <div className="space-y-4">
                       <div>
                         <p className="text-base text-white mb-2"><strong>Step 1: Prove Tester (LIVE)</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Switch on the proving unit to provide known voltage</li>
                           <li>Test your voltage tester on the proving unit terminals</li>
                           <li>Verify both visual and audible indications work</li>
                           <li>Confirm tester responds correctly to live voltage</li>
                           <li>Check test leads and probes are making good contact</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2"><strong>Step 2: Test Circuit (DEAD)</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Test L–N (Live to Neutral) at the point of work</li>
                           <li>Test L–E (Live to Earth) at the point of work</li>
                           <li>Test N–E (Neutral to Earth) at the point of work</li>
                           <li>All tests should show no voltage present</li>
                           <li>Test at the exact location where work will be performed</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2"><strong>Step 3: Re-prove Tester (LIVE)</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Return to the proving unit immediately after testing</li>
                           <li>Test your voltage tester again on the proving unit</li>
                           <li>Confirm tester still responds to live voltage</li>
                           <li>Verify no damage occurred during the proving process</li>
                           <li>Only proceed with work if re-prove is successful</li>
                         </ul>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="live-dead-live-sequence"
            question="What is the correct sequence for proving dead?"
            options={["Dead-live-dead", "Live-dead-live", "Lock-off only", "Test then isolate"]}
            correctIndex={1}
            explanation="Live-dead-live: prove tester works, test circuit is dead, re-prove tester still works. This ensures reliable results."
          />
          <Separator className="my-6" />

          {/* 4. Unsafe Practices to Avoid */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 dark:text-elec-yellow mb-3">Unsafe Practices to Avoid</p>
                    
                    <div className="space-y-4">
                       <div>
                         <p className="text-base text-white mb-2"><strong>Never Use Neon Screwdrivers:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Rely on your body to complete the circuit - unsafe design</li>
                           <li>Don't meet GS38 safety requirements</li>
                           <li>Can give false readings due to induced voltages</li>
                           <li>Provide no indication of voltage level</li>
                           <li>Can fail to detect dangerous voltages</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2"><strong>Don't Skip Re-proving:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Tester could have failed during the proving process</li>
                           <li>Internal fuses may have blown due to fault conditions</li>
                           <li>Test leads could have been damaged</li>
                           <li>Battery could have failed during testing</li>
                           <li>Essential step for confirming continued tester function</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2"><strong>Avoid Non-GS38 Equipment:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Damaged or non-compliant test leads are dangerous</li>
                           <li>Wrong CAT rating could lead to equipment failure</li>
                           <li>Unfused leads don't provide fault current protection</li>
                           <li>Non-shrouded probes increase shock risk</li>
                           <li>Home-made or modified test equipment is prohibited</li>
                         </ul>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="unsafe-practices"
            question="Which tool should never be used for proving dead?"
            options={["Two-pole voltage tester", "Proving unit", "Neon screwdriver", "Digital multimeter"]}
            correctIndex={2}
            explanation="Neon screwdrivers should never be used for proving dead as they rely on your body to complete the circuit and are not GS38 compliant."
          />
          <Separator className="my-6" />

        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Practical Guidance</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <h3 className="font-semibold text-white mb-3">Equipment Requirements</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-white">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Always carry a GS38-compliant two-pole tester and proving unit</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Keep test leads clean, dry, and free from exposed metal</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Store proving units properly — avoid extreme temperatures</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Check equipment calibration and maintenance dates</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-3">Safe Working Practices</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-white">
                <li className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Treat all circuits as live until proven otherwise</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Inspect test equipment before each use</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Follow manufacturer's instructions for all equipment</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Stop work immediately if equipment fails re-prove test</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Real-World Example */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Real-World Example</h2>
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-6 rounded-lg">
            <h3 className="text-amber-700 dark:text-amber-400 font-semibold mb-4">Case Study: The Hidden Tester Failure</h3>
            <div className="space-y-4">
              <p className="text-white">
                An electrician isolated a distribution board but skipped the re-prove stage after testing. Unknown to him, the tester's internal fuse had blown during the proving process. He assumed the circuit was dead, but it was still live. He suffered a minor electric shock that could have been fatal.
              </p>
              <div className="bg-amber-50/50 dark:bg-amber-900/10 p-4 rounded-lg border-l-4 border-l-amber-500">
                <p className="font-semibold text-white mb-2">Lesson learned:</p>
                <p className="text-white">
                  Always perform the complete live-dead-live testing sequence with a proving unit. The re-prove step is not optional—it's a safety-critical verification that your tester is still functioning correctly.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Micro-challenge */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Micro-Challenge</h2>
          <div className="bg-emerald-50/50 dark:bg-blue-900/20 border border-blue-200/50 p-6 rounded-lg">
            <div className="space-y-4">
              <p className="text-white">
                You arrive at a job and your colleague says "Don't worry, I've already tested it with my voltage pen - it's definitely dead." What do you do?
              </p>
              <div className="bg-emerald-50/50 dark:bg-blue-900/10 p-4 rounded-lg border-l-4 border-l-elec-yellow">
                <p className="font-semibold text-white mb-2">Answer:</p>
                <p className="text-white">
                  Never trust another person's testing, especially with non-GS38 equipment. Always perform your own complete live-dead-live procedure using proper two-pole voltage tester and proving unit. Voltage pens are not acceptable for proving dead.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-border/30 pb-4 last:border-b-0">
                <h3 className="font-semibold text-white mb-2">Q: {faq.question}</h3>
                <p className="text-white">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Summary Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Recap</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-elec-yellow rounded-lg flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2">Proving Units</h3>
              <p className="text-sm text-white">Confirm testers are functional</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2">Two-Pole Testers</h3>
              <p className="text-sm text-white">Only safe method for proving dead</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2">Live-Dead-Live</h3>
              <p className="text-sm text-white">Sequence is mandatory</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2">Unsafe Practices</h3>
              <p className="text-sm text-white">Neon screwdrivers prohibited</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2">Re-proving</h3>
              <p className="text-sm text-white">Prevents reliance on faulty instruments</p>
            </div>
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Pocket Guide</h2>
          <div className="bg-card border border-elec-yellow/20 p-6 rounded-lg">
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <h3 className="font-semibold text-emerald-700 dark:text-elec-yellow mb-3">Equipment Checklist</h3>
                <ul className="space-y-1 text-xs sm:text-sm text-white">
                  <li>• Use two-pole testers only</li>
                  <li>• GS38-compliant with fused, shrouded leads</li>
                  <li>• Proving unit for tester verification</li>
                  <li>• Inspect equipment before use</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-emerald-700 dark:text-elec-yellow mb-3">Testing Sequence</h3>
                <ul className="space-y-1 text-xs sm:text-sm text-white">
                  <li>• Always follow live-dead-live sequence</li>
                  <li>• Prove tester → Test circuit → Re-prove tester</li>
                  <li>• Test L–N, L–E, N–E combinations</li>
                  <li>• Never skip the re-prove step</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Final Quiz */}
        <Quiz 
          title="Test Your Knowledge"
          questions={quizQuestions}
        />

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Button variant="outline" className="flex-1 h-auto py-3 px-4" asChild>
            <Link to="../3-4" className="flex items-center justify-center text-center">
              <ArrowLeft className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="flex-1">
                <span className="block text-xs text-white">Previous</span>
                <span className="block font-medium">Proving Dead and Safe to Test</span>
              </span>
            </Link>
          </Button>
          <Button className="flex-1 h-auto py-3 px-4" asChild>
            <Link to="../3-6" className="flex items-center justify-center text-center">
              <span className="flex-1">
                <span className="block text-xs text-primary-foreground/80">Next</span>
                <span className="block font-medium">Testing for Earth Continuity</span>
              </span>
              <ArrowLeft className="w-4 h-4 ml-2 flex-shrink-0 rotate-180" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module6Section3_5;