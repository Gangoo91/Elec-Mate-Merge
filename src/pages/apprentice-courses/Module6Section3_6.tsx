import { ArrowLeft, Eye, Target, CheckCircle, Wrench, AlertTriangle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module6Section3_6 = () => {
  useSEO(
    "When to Use Each Instrument and Why - Level 2 Electrical Testing & Inspection",
    "Selecting the correct instrument for electrical testing and why it matters"
  );

  // Quiz questions
  const quizQuestions = [
    {
      id: 1,
      question: "Which instrument is safest for proving dead?",
      options: ["Multimeter", "Two-pole voltage tester (GS38 compliant)", "Voltage pen", "Neon screwdriver"],
      correctAnswer: 1,
      explanation: "Two-pole voltage testers that comply with GS38 are the safest and most reliable instruments for proving dead."
    },
    {
      id: 2,
      question: "What is an IR tester used for?",
      options: ["Measuring voltage", "Checking insulation resistance between conductors and earth", "Testing continuity", "Proving dead"],
      correctAnswer: 1,
      explanation: "IR testers are specifically designed to check insulation resistance between conductors and between live conductors and earth."
    },
    {
      id: 3,
      question: "Can continuity testers be used on live circuits?",
      options: ["Yes, always", "No — only on isolated circuits", "Only at low voltage", "Only with special adapters"],
      correctAnswer: 1,
      explanation: "Continuity testers must only be used on isolated circuits to prevent damage to the instrument and ensure accurate readings."
    },
    {
      id: 4,
      question: "Why are multimeters not recommended for safe isolation?",
      options: ["They're too expensive", "They can give misleading results if incorrectly set", "They're too slow", "They're not accurate enough"],
      correctAnswer: 1,
      explanation: "Multimeters can give misleading results if left on the wrong range, potentially showing zero reading even when circuits are live."
    },
    {
      id: 5,
      question: "What instrument would you use for ring final circuit verification?",
      options: ["Multimeter", "IR tester", "Continuity tester", "Voltage pen"],
      correctAnswer: 2,
      explanation: "Continuity testers are specifically designed for verifying unbroken paths in conductors, including ring final circuits."
    },
    {
      id: 6,
      question: "What additional device must always be used with a two-pole tester?",
      options: ["Multimeter", "A proving unit", "Voltage pen", "Calculator"],
      correctAnswer: 1,
      explanation: "A proving unit is essential to verify that the two-pole tester is working correctly before and after use."
    },
    {
      id: 7,
      question: "True or False: A voltage pen can be used as proof of dead.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False. Voltage pens are unreliable and should never be used as proof of dead - only GS38-compliant two-pole testers are suitable."
    },
    {
      id: 8,
      question: "What should always be confirmed before using an IR tester?",
      options: ["The weather is dry", "That the circuit is isolated and disconnected", "The battery level", "The time of day"],
      correctAnswer: 1,
      explanation: "IR testing must only be performed on isolated and disconnected circuits to prevent damage and ensure safety."
    },
    {
      id: 9,
      question: "Which instrument is most commonly used for diagnostic fault-finding?",
      options: ["IR tester", "Continuity tester", "Multimeter", "Proving unit"],
      correctAnswer: 2,
      explanation: "Multimeters are versatile instruments that can measure voltage, current, and resistance, making them ideal for diagnostic work."
    },
    {
      id: 10,
      question: "What is the consequence of using the wrong instrument for a task?",
      options: ["Nothing significant", "Slightly longer work time", "Inaccurate readings, wasted time, or serious safety risks", "Better results"],
      correctAnswer: 2,
      explanation: "Using incorrect instruments can lead to inaccurate readings, wasted time, equipment damage, or serious safety risks including injury or death."
    }
  ];

  const faqs = [
    {
      question: "Can I use an IR tester on live circuits?",
      answer: "No — insulation resistance testing must only be done on isolated circuits. Applying the test voltage to live circuits can damage equipment and create serious safety hazards. The high test voltage (typically 500V or 1000V DC) can destroy electronic components and create dangerous conditions."
    },
    {
      question: "Is it acceptable to use a voltage pen for quick checks?",
      answer: "Only as a preliminary check — never as proof of dead. Voltage pens can be unreliable and should only be used to give an initial indication, followed by proper testing with a GS38-compliant two-pole tester. They can give false readings due to electromagnetic interference or faulty sensing circuits."
    },
    {
      question: "Why use continuity testers instead of multimeters for continuity?",
      answer: "Continuity testers are specifically designed for this purpose, are easier to use, and provide more reliable results. They typically have lower test currents and clearer indications for continuity testing. The higher test current (typically 200mA) ensures reliable operation of audible and visual indicators."
    },
    {
      question: "What happens if I use the wrong test voltage for IR testing?",
      answer: "Using too low a voltage may not detect insulation breakdown that could occur at operating voltage. Using too high a voltage can damage cable insulation or electronic equipment. Always match the test voltage to the circuit operating voltage as specified in BS 7671."
    },
    {
      question: "How often should test instruments be calibrated?",
      answer: "Test instruments should be calibrated annually or according to manufacturer recommendations. More frequent calibration may be required for instruments used in harsh environments or for safety-critical applications. Always check calibration certificates before important tests."
    },
    {
      question: "Can I share test instruments between different voltage systems?",
      answer: "Only if the instrument CAT rating is suitable for the highest voltage system you will encounter. CAT III instruments are suitable for distribution circuits, while CAT IV instruments are required for overhead lines and service entrances. Never exceed the instrument ratings."
    },
    {
      question: "What should I do if my voltage tester fails the proving unit test?",
      answer: "Stop work immediately and do not proceed with proving dead. The instrument must be repaired or replaced before any electrical work can commence. Never assume circuits are dead if you cannot verify your tester is working correctly."
    },
    {
      question: "Why must I test all conductor combinations during IR testing?",
      answer: "Different insulation paths may have different conditions. For example, L-N insulation could be perfect while L-E insulation has deteriorated. Testing all combinations (L-N, L-E, N-E) ensures complete verification of insulation integrity."
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
              <Wrench className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 6.3.6
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            When to Use Each Instrument and Why
          </h1>
          <p className="text-white">
            Selecting appropriate test equipment for different applications
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
                  <span>Select the right tool for the job</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Continuity and IR tests only on isolated circuits</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Use GS38-compliant instruments and keep them calibrated</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Record all readings accurately on certificates</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-elec-yellow/20">
              <p className="font-medium mb-3">Spot it / Use it / Check it</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span><strong>Spot:</strong> Wrong instrument selection, non-GS38 tools, uncalibrated equipment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span><strong>Use:</strong> Correct instrument for each test; proving units; proper procedures</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span><strong>Check:</strong> Instrument functionality; calibration certificates; test results accuracy</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <p className="text-base text-white mb-4">
            Different electrical tests require different instruments. Using the wrong tool can give inaccurate results or even create dangerous situations. This subsection explains when to use a multimeter, insulation resistance tester (IR tester), and continuity tester, and why each one is essential to safe and compliant inspection and testing.
          </p>
          <p className="text-base text-white mb-4">
            The choice of instrument is not just about convenience or availability - it is a critical safety decision that can mean the difference between life and death. Every year, electrical accidents occur because electricians use inappropriate instruments for safety-critical tasks such as proving dead. Understanding when and why to use each instrument is fundamental to professional electrical work.
          </p>
          <p className="text-base text-white mb-4">
            BS 7671 and the Electricity at Work Regulations specify requirements for electrical testing instruments, particularly emphasising the use of GS38-compliant equipment for safety applications. The Health and Safety Executive (HSE) guidance document GS38 provides specific recommendations on electrical test equipment to prevent accidents and ensure reliable testing.
          </p>
          <p className="text-base text-white">
            This comprehensive guide will help you select the correct instrument for every testing scenario, understand the limitations of each tool, and avoid the common mistakes that lead to accidents, inaccurate results, and non-compliance with regulations.
          </p>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning Outcomes</h2>
          <p className="text-base text-white mb-4">By the end of this subsection, you will be able to:</p>
          <ul className="list-disc pl-6 space-y-2 text-base text-white">
            <li>Identify the correct instrument for continuity, insulation resistance, and voltage testing.</li>
            <li>Understand why certain instruments must not be used for proving dead.</li>
            <li>Match common testing tasks to the correct instrument.</li>
            <li>Apply safe practices for choosing and using instruments.</li>
            <li>Recognise how instrument choice links to BS 7671 requirements.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content / Learning</h2>

          {/* 1. Multimeter */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow dark:text-elec-yellow mb-3">Multimeter</p>
                    
                    <div className="space-y-4">
                       <div>
                         <p className="text-base text-white mb-2"><strong>Use when:</strong> Measuring AC/DC voltage, current, or resistance.</p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Fault diagnosis and troubleshooting electrical problems</li>
                           <li>Measuring voltage drops across components</li>
                           <li>Checking current consumption of equipment</li>
                           <li>Measuring resistance values for calculations</li>
                           <li>Verifying transformer ratios and motor windings</li>
                           <li>Testing battery voltages and charging systems</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2"><strong>Why:</strong> Provides quick, accurate measurements for diagnostics.</p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>High accuracy and resolution for precise measurements</li>
                           <li>Auto-ranging feature eliminates range selection errors</li>
                           <li>Multiple measurement functions in one instrument</li>
                           <li>Digital display provides clear, unambiguous readings</li>
                           <li>Data logging capabilities for monitoring over time</li>
                           <li>True RMS measurement for accurate AC values</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2"><strong>Do not use for:</strong> Proving dead (multimeters can mislead if on wrong range).</p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Safe isolation procedures - use GS38-compliant two-pole testers only</li>
                           <li>Confirming circuits are dead before work begins</li>
                           <li>Primary safety verification in hazardous environments</li>
                           <li>When instrument failure could result in serious injury</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2"><strong>Key Safety Considerations:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Always check CAT rating matches the environment</li>
                           <li>Verify correct function and range before use</li>
                           <li>Use appropriate test leads for the application</li>
                           <li>Never assume zero reading means circuit is dead</li>
                           <li>Regular calibration ensures measurement accuracy</li>
                         </ul>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="multimeter-use"
            question="What is the primary use of a multimeter?"
            options={["Proving dead", "Diagnostics and measuring voltage/current/resistance", "Insulation testing", "Continuity only"]}
            correctIndex={1}
            explanation="Multimeters are primarily used for diagnostic work, measuring AC/DC voltage, current, and resistance accurately."
          />
          <Separator className="my-6" />

          {/* 2. Insulation Resistance (IR) Tester */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 dark:text-elec-yellow mb-3">Insulation Resistance (IR) Tester</p>
                    
                    <div className="space-y-4">
                       <div>
                         <p className="text-base text-white mb-2"><strong>Use when:</strong> Checking the quality of insulation between conductors and between live conductors and earth.</p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Testing new installations before first energisation</li>
                           <li>Periodic testing of existing installations (EICR)</li>
                           <li>After cable damage or suspected insulation failure</li>
                           <li>Before increasing system voltage or current capacity</li>
                           <li>Testing motor windings and transformer insulation</li>
                           <li>Verifying cable integrity after installation</li>
                           <li>Investigating earth leakage or RCBO tripping issues</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2"><strong>Why:</strong> Confirms no leakage currents or breakdown of insulation, ensuring safety.</p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Prevents electric shock from damaged insulation</li>
                           <li>Identifies potential fire risks from leakage currents</li>
                           <li>Ensures compliance with BS 7671 minimum values</li>
                           <li>Predicts insulation deterioration before failure occurs</li>
                           <li>Verifies effectiveness of protective measures</li>
                           <li>Essential for electrical installation certificates</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2"><strong>Test Voltages and Standards:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>500V DC for circuits up to 500V (most common)</li>
                           <li>1000V DC for circuits between 500V and 1000V</li>
                           <li>Minimum acceptable values: 1MΩ (new installations), 0.5MΩ (existing)</li>
                           <li>Apply test voltage for minimum 60 seconds</li>
                           <li>Test all combinations: L-N, L-E, N-E</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2"><strong>Do not use for:</strong> Live systems — circuits must be disconnected and isolated.</p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Circuits containing electronic equipment (unless disconnected)</li>
                           <li>Systems with surge protection devices connected</li>
                           <li>Circuits with capacitors or filters that could be damaged</li>
                           <li>When protective devices cannot be safely bypassed</li>
                           <li>Emergency lighting circuits during normal operation</li>
                         </ul>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="ir-tester-safety"
            question="When can IR testers be used?"
            options={["On live circuits", "Only on isolated circuits", "On any circuit below 230V", "With special safety equipment"]}
            correctIndex={1}
            explanation="IR testers must only be used on isolated and disconnected circuits to prevent equipment damage and ensure safety."
          />
          <Separator className="my-6" />

          {/* 3. Continuity Tester */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-indigo-500 bg-indigo-500/5">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-indigo-600 dark:text-indigo-400 mb-3">Continuity Tester</p>
                    
                    <div className="space-y-4">
                       <div>
                         <p className="text-base text-white mb-2"><strong>Use when:</strong> Verifying unbroken paths in conductors (e.g., ring final circuits, bonding, CPCs).</p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Testing ring final circuit continuity (R1 + R2 method)</li>
                           <li>Verifying protective conductor continuity (CPC)</li>
                           <li>Checking main and supplementary bonding connections</li>
                           <li>Testing earth electrode connections</li>
                           <li>Verifying cable core continuity after installation</li>
                           <li>Checking switch and control circuit wiring</li>
                           <li>Testing motor winding continuity</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2"><strong>Why:</strong> Ensures protective conductors and circuits are complete.</p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Confirms fault current path back to source</li>
                           <li>Ensures automatic disconnection will operate correctly</li>
                           <li>Verifies protective bonding is effective</li>
                           <li>Identifies poor connections that could cause overheating</li>
                           <li>Essential for electrical safety and compliance</li>
                           <li>Prevents dangerous potential differences</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2"><strong>Test Methods and Values:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Apply test current of at least 200mA DC</li>
                           <li>Record resistance values in milliohms (mΩ)</li>
                           <li>Ring circuits: test each leg separately, then end-to-end</li>
                           <li>Compare measured values with design calculations</li>
                           <li>Temperature correction may be required for cable resistance</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2"><strong>Do not use for:</strong> Live circuits.</p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Any energised electrical system or circuit</li>
                           <li>Circuits containing electronic components that could be damaged</li>
                           <li>When risk assessment indicates live testing would be safer</li>
                           <li>Circuits where isolation cannot be confirmed</li>
                         </ul>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="continuity-purpose"
            question="What does a continuity tester verify?"
            options={["Voltage levels", "Unbroken paths in conductors", "Insulation quality", "Power consumption"]}
            correctIndex={1}
            explanation="Continuity testers verify that there are complete, unbroken paths in conductors such as ring circuits and protective conductors."
          />
          <Separator className="my-6" />

          {/* 4. Two-Pole Voltage Tester */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow bg-elec-yellow/5">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-600 dark:text-elec-yellow mb-3">Two-Pole Voltage Tester (GS38 compliant)</p>
                    
                    <div className="space-y-4">
                       <div>
                         <p className="text-base text-white mb-2"><strong>Use when:</strong> Proving circuits live or dead.</p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Safe isolation procedures before electrical work</li>
                           <li>Confirming circuit status at isolation points</li>
                           <li>Verifying effective isolation after switching</li>
                           <li>Testing for presence of voltage in enclosures</li>
                           <li>Confirming absence of dangerous voltages</li>
                           <li>Phase identification and rotation testing</li>
                           <li>Checking for backfeed or induced voltages</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2"><strong>Why:</strong> Safest and most reliable instrument for proving dead.</p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>GS38 compliance ensures appropriate safety features</li>
                           <li>Two-pole testing prevents false readings from broken earths</li>
                           <li>Fused test leads protect against fault currents</li>
                           <li>Shrouded probes reduce risk of accidental contact</li>
                           <li>Clear indication distinguishes live from dead</li>
                           <li>Built-in safety features prevent misuse</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2"><strong>GS38 Compliance Requirements:</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Fused test leads with 500mA or lower rating</li>
                           <li>Shrouded test probes with max 4mm exposed tip</li>
                           <li>Finger guards to prevent accidental contact</li>
                           <li>Clear, unambiguous indication (LED/LCD display)</li>
                           <li>Robust construction suitable for site conditions</li>
                           <li>Regular calibration and functional testing</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2"><strong>Do not use:</strong> Non-GS38 tools (neon screwdrivers, voltage pens).</p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Neon screwdrivers - unreliable and dangerous</li>
                           <li>Single-pole voltage indicators - can give false readings</li>
                           <li>Non-contact voltage detectors for proving dead</li>
                           <li>Unauthorised or modified test equipment</li>
                           <li>Equipment without current calibration certificates</li>
                         </ul>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 5. Matching Instruments to Tasks */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-violet-500 bg-violet-500/5">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-violet-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                  <div className="flex-1">
                    <p className="font-semibold text-violet-600 dark:text-violet-400 mb-3">Matching Instruments to Tasks</p>
                    
                    <div className="space-y-4">
                       <div>
                         <p className="text-base text-white mb-2">Fault-finding (e.g., "why isn't the socket working?") → <strong>Multimeter</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Check voltage at socket outlets</li>
                           <li>Measure current draw of appliances</li>
                           <li>Test resistance of heating elements</li>
                           <li>Verify transformer secondary voltages</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2">Insulation check before energising → <strong>IR Tester</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>New installation commissioning</li>
                           <li>After cable pulling and termination</li>
                           <li>Before switching on after maintenance</li>
                           <li>Following suspected cable damage</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2">Ring final circuit verification → <strong>Continuity Tester</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>R1 + R2 testing of socket circuits</li>
                           <li>CPC continuity verification</li>
                           <li>Bonding conductor testing</li>
                           <li>Cable core identification</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2">Safe isolation → <strong>Two-Pole Voltage Tester + Proving Unit</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Proving dead before any electrical work</li>
                           <li>Confirming isolation effectiveness</li>
                           <li>Testing for dangerous voltages</li>
                           <li>Verifying permit-to-work conditions</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2">Earth fault loop impedance → <strong>Loop Tester</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Zs measurements for automatic disconnection</li>
                           <li>Testing RCD operation times</li>
                           <li>Verifying protective device coordination</li>
                           <li>EICR testing requirements</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-white mb-2">PAT testing → <strong>Portable Appliance Tester</strong></p>
                         <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                           <li>Class I appliance earth continuity</li>
                           <li>Insulation resistance of portable equipment</li>
                           <li>Touch current measurements</li>
                           <li>Functional testing of appliances</li>
                         </ul>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Card>

        {/* Common Mistakes to Avoid */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 border border-red-500/20">
          <h2 className="text-lg sm:text-xl font-semibold text-red-700 dark:text-elec-yellow mb-4">Common Mistakes to Avoid</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <h3 className="font-semibold text-white mb-3">Wrong Instrument Selection</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-white">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">✗</span>
                  <span>Using multimeters for proving dead</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">✗</span>
                  <span>IR testing on live circuits</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">✗</span>
                  <span>Continuity testing without isolation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">✗</span>
                  <span>Using voltage pens for safety decisions</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-3">Poor Testing Practices</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-white">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">✗</span>
                  <span>Skipping proving unit checks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">✗</span>
                  <span>Not testing all conductor combinations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">✗</span>
                  <span>Using uncalibrated instruments</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">✗</span>
                  <span>Assuming circuit labels are correct</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Best Practices */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 border border-elec-yellow/20">
          <h2 className="text-lg sm:text-xl font-semibold text-emerald-700 dark:text-elec-yellow mb-4">Best Practices for Instrument Selection</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <h3 className="font-semibold text-white mb-3">Before You Start</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-white">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">✓</span>
                  <span>Read the test procedure thoroughly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">✓</span>
                  <span>Check instrument calibration certificates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">✓</span>
                  <span>Verify GS38 compliance where required</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">✓</span>
                  <span>Inspect test leads and probes</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-3">During Testing</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-white">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">✓</span>
                  <span>Prove tester function before and after</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">✓</span>
                  <span>Test all required combinations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">✓</span>
                  <span>Record readings immediately</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">✓</span>
                  <span>Compare results with expected values</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 border border-elec-yellow/20">
          <h2 className="text-lg sm:text-xl font-semibold text-blue-700 dark:text-elec-yellow mb-4">Practical Guidance</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <h3 className="font-semibold text-white mb-3">Essential Guidelines</h3>
              <ul className="space-y-3 text-base text-white">
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Always select the right tool for the job — never "make do"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Circuits must be isolated before using continuity or IR testers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Ensure instruments are calibrated and GS38 compliant</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Record readings on the correct test certificates</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-3">Safety Priorities</h3>
              <ul className="space-y-3 text-base text-white">
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Use only GS38-compliant testers for proving dead</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Never trust circuit labels without verification</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Maintain instruments according to manufacturer instructions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Replace damaged or unreliable equipment immediately</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Real-World Examples */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Real-World Examples</h2>
          
          <div className="space-y-6">
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-6 rounded-lg">
              <h3 className="font-semibold text-amber-700 dark:text-amber-400 mb-3">Case Study 1: The Wrong Tool Nearly Caused a Serious Accident</h3>
              <p className="text-base text-white mb-3">
                On a commercial project, an electrician used a multimeter to prove a circuit was dead. The meter was accidentally left on the wrong range, giving a zero reading even though the circuit was live. He received an electric shock when handling the conductor.
              </p>
              <p className="text-base text-white mb-3">
                <strong>What went wrong:</strong> The multimeter was set to measure DC voltage while the circuit carried AC. The digital display showed 000, which the electrician interpreted as "dead."
              </p>
              <p className="text-base text-white">
                <strong>Prevention:</strong> Using a GS38-compliant two-pole tester with a proving unit would have clearly indicated the live circuit and prevented the accident.
              </p>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-6 rounded-lg">
              <h3 className="font-semibold text-red-700 dark:text-elec-yellow mb-3">Case Study 2: IR Testing Disaster</h3>
              <p className="text-base text-white mb-3">
                An apprentice was asked to test the insulation resistance of a new circuit. Without proper training, he connected the IR tester to a live circuit containing electronic equipment.
              </p>
              <p className="text-base text-white mb-3">
                <strong>The result:</strong> The 500V test voltage destroyed £2,000 worth of control equipment and created a dangerous situation when the protective devices operated unexpectedly.
              </p>
              <p className="text-base text-white">
                <strong>Lesson learned:</strong> IR testing must only be performed on isolated circuits, and all electronic equipment must be disconnected first.
              </p>
            </div>

            <div className="bg-card border border-elec-yellow/20 p-6 rounded-lg">
              <h3 className="font-semibold text-emerald-700 dark:text-elec-yellow mb-3">Case Study 3: The Right Tools Save the Day</h3>
              <p className="text-base text-white mb-3">
                During an EICR inspection, an electrician noticed slightly high earth fault loop impedance readings. Using the correct loop impedance tester, he systematically tested each circuit.
              </p>
              <p className="text-base text-white mb-3">
                <strong>Discovery:</strong> A continuity tester revealed a high-resistance connection in the main earthing conductor that could have failed during a fault condition.
              </p>
              <p className="text-base text-white">
                <strong>Outcome:</strong> The faulty connection was repaired before it could cause a dangerous situation, demonstrating the importance of using appropriate test instruments.
              </p>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">FAQs</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index}>
                <p className="font-semibold text-white mb-2">Q: {faq.question}</p>
                <p className="text-base text-white pl-4 border-l-2 border-border/50">
                  A: {faq.answer}
                </p>
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
                <h3 className="font-semibold text-emerald-700 dark:text-elec-yellow mb-3">Instrument Selection</h3>
                <ul className="space-y-1 text-xs sm:text-sm text-white">
                  <li>✅ Multimeter = Diagnostics (voltage/current/resistance)</li>
                  <li>✅ IR Tester = Insulation quality (must be isolated)</li>
                  <li>✅ Continuity Tester = Unbroken conductors and bonding</li>
                  <li>✅ Two-Pole Tester + Proving Unit = Safe isolation</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-emerald-700 dark:text-elec-yellow mb-3">Never Use</h3>
                <ul className="space-y-1 text-xs sm:text-sm text-white">
                  <li>❌ Never use neon screwdrivers or voltage pens for proving dead</li>
                  <li>❌ Never use IR testers on live circuits</li>
                  <li>❌ Never use multimeters for proving dead</li>
                  <li>❌ Never use continuity testers on live circuits</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Summary Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Recap</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-white mb-3">Instrument Roles</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-white">
                <li>• <strong>Multimeters:</strong> Diagnostics and general measurements - never for proving dead</li>
                <li>• <strong>IR Testers:</strong> Check insulation quality on isolated circuits only</li>
                <li>• <strong>Continuity Testers:</strong> Verify unbroken conductor paths when circuits are dead</li>
                <li>• <strong>Two-Pole Testers:</strong> The only safe way to prove circuits dead</li>
                <li>• <strong>Proving Units:</strong> Essential for verifying tester function before and after use</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-3">Critical Safety Rules</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-white">
                <li>• Never use neon screwdrivers or voltage pens for proving dead</li>
                <li>• Always isolate circuits before IR or continuity testing</li>
                <li>• Use only GS38-compliant instruments for safety applications</li>
                <li>• Prove your tester works before and after each use</li>
                <li>• Test all conductor combinations (L-N, L-E, N-E)</li>
                <li>• Never trust circuit labels without verification</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-3">Professional Standards</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-white">
                <li>• Annual calibration of all test instruments</li>
                <li>• Record all readings accurately on certificates</li>
                <li>• Select the correct instrument for each specific task</li>
                <li>• Maintain instruments according to manufacturer instructions</li>
                <li>• Replace damaged or unreliable equipment immediately</li>
                <li>• Follow BS 7671 and EAWR requirements at all times</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
            <h3 className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Remember: Your Life Depends on This</h3>
            <p className="text-xs sm:text-sm text-white">
              Choosing the correct instrument isn't just about compliance or accuracy - it's literally a matter of life and death. 
              The wrong instrument choice has caused fatal accidents when electricians trusted unreliable equipment for proving dead. 
              Always use the right tool for the job, maintain your equipment properly, and never compromise on safety.
            </p>
          </div>
        </Card>

        {/* Quiz */}
        <Quiz 
          title="Test Your Knowledge: Instrument Selection"
          questions={quizQuestions}
        />

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-6 border-t border-white/10">
          <Button variant="outline" asChild>
            <Link to="../3-5" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Previous: Using a Proving Unit and Two-Pole Voltage Tester
            </Link>
          </Button>
          <Button asChild>
            <Link to=".." className="flex items-center gap-2">
              Back to Section 3 overview
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module6Section3_6;