import { ArrowLeft, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module6Section3_6 = () => {
  useSEO(
    "When to Use Each Instrument and Why - Level 2 Electrical Testing & Inspection",
    "Selecting the correct instrument for electrical testing and why it matters"
  );

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
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/5 -ml-2 min-h-[44px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6.3
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 6</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 6.3.6</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              When to Use Each Instrument and Why
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Selecting appropriate test equipment for different applications
            </p>
          </header>

          {/* Quick Reference Summary */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <p className="font-medium text-white mb-3">Spot it in 30 Seconds</p>
            <div className="grid sm:grid-cols-2 gap-4 text-sm text-white/80">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Select the right tool for the job</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Continuity and IR tests only on isolated circuits</span>
                </li>
              </ul>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Use GS38-compliant instruments and keep them calibrated</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Record all readings accurately on certificates</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Introduction */}
          <section className="mb-10">
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Different electrical tests require different instruments. Using the wrong tool can give inaccurate results or even create dangerous situations. This subsection explains when to use a multimeter, insulation resistance tester (IR tester), and continuity tester, and why each one is essential to safe and compliant inspection and testing.
              </p>
              <p>
                The choice of instrument is not just about convenience or availability - it is a critical safety decision that can mean the difference between life and death. Every year, electrical accidents occur because electricians use inappropriate instruments for safety-critical tasks such as proving dead.
              </p>
              <p>
                BS 7671 and the Electricity at Work Regulations specify requirements for electrical testing instruments, particularly emphasising the use of GS38-compliant equipment for safety applications.
              </p>
            </div>
          </section>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">00</span>
              Learning Outcomes
            </h2>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <p className="text-white/80 mb-3">By the end of this subsection, you will be able to:</p>
              <ul className="space-y-2 text-white/80">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Identify the correct instrument for continuity, insulation resistance, and voltage testing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Understand why certain instruments must not be used for proving dead</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Match common testing tasks to the correct instrument</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Apply safe practices for choosing and using instruments</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Recognise how instrument choice links to BS 7671 requirements</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 1: Multimeter */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Multimeter
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div>
                <p className="font-medium text-white mb-2">Use when: Measuring AC/DC voltage, current, or resistance.</p>
                <ul className="ml-4 space-y-1 text-sm">
                  <li>• Fault diagnosis and troubleshooting electrical problems</li>
                  <li>• Measuring voltage drops across components</li>
                  <li>• Checking current consumption of equipment</li>
                  <li>• Measuring resistance values for calculations</li>
                  <li>• Verifying transformer ratios and motor windings</li>
                  <li>• Testing battery voltages and charging systems</li>
                </ul>
              </div>

              <div>
                <p className="font-medium text-white mb-2">Why: Provides quick, accurate measurements for diagnostics.</p>
                <ul className="ml-4 space-y-1 text-sm">
                  <li>• High accuracy and resolution for precise measurements</li>
                  <li>• Auto-ranging feature eliminates range selection errors</li>
                  <li>• Multiple measurement functions in one instrument</li>
                  <li>• Digital display provides clear, unambiguous readings</li>
                  <li>• Data logging capabilities for monitoring over time</li>
                  <li>• True RMS measurement for accurate AC values</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                <p className="font-medium text-white mb-2">Do not use for: Proving dead (multimeters can mislead if on wrong range).</p>
                <ul className="ml-4 space-y-1 text-sm">
                  <li>• Safe isolation procedures - use GS38-compliant two-pole testers only</li>
                  <li>• Confirming circuits are dead before work begins</li>
                  <li>• Primary safety verification in hazardous environments</li>
                  <li>• When instrument failure could result in serious injury</li>
                </ul>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck
              id="multimeter-use"
              question="What is the primary use of a multimeter?"
              options={["Proving dead", "Diagnostics and measuring voltage/current/resistance", "Insulation testing", "Continuity only"]}
              correctIndex={1}
              explanation="Multimeters are primarily used for diagnostic work, measuring AC/DC voltage, current, and resistance accurately."
            />
          </div>

          {/* Section 2: IR Tester */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Insulation Resistance (IR) Tester
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div>
                <p className="font-medium text-white mb-2">Use when: Checking the quality of insulation between conductors and between live conductors and earth.</p>
                <ul className="ml-4 space-y-1 text-sm">
                  <li>• Testing new installations before first energisation</li>
                  <li>• Periodic testing of existing installations (EICR)</li>
                  <li>• After cable damage or suspected insulation failure</li>
                  <li>• Before increasing system voltage or current capacity</li>
                  <li>• Testing motor windings and transformer insulation</li>
                  <li>• Verifying cable integrity after installation</li>
                  <li>• Investigating earth leakage or RCBO tripping issues</li>
                </ul>
              </div>

              <div>
                <p className="font-medium text-white mb-2">Why: Confirms no leakage currents or breakdown of insulation, ensuring safety.</p>
                <ul className="ml-4 space-y-1 text-sm">
                  <li>• Prevents electric shock from damaged insulation</li>
                  <li>• Identifies potential fire risks from leakage currents</li>
                  <li>• Ensures compliance with BS 7671 minimum values</li>
                  <li>• Predicts insulation deterioration before failure occurs</li>
                  <li>• Verifies effectiveness of protective measures</li>
                  <li>• Essential for electrical installation certificates</li>
                </ul>
              </div>

              <div>
                <p className="font-medium text-white mb-2">Test Voltages and Standards:</p>
                <ul className="ml-4 space-y-1 text-sm">
                  <li>• 500V DC for circuits up to 500V (most common)</li>
                  <li>• 1000V DC for circuits between 500V and 1000V</li>
                  <li>• Minimum acceptable values: 1MΩ (new installations), 0.5MΩ (existing)</li>
                  <li>• Apply test voltage for minimum 60 seconds</li>
                  <li>• Test all combinations: L-N, L-E, N-E</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                <p className="font-medium text-white mb-2">Do not use for: Live systems — circuits must be disconnected and isolated.</p>
                <ul className="ml-4 space-y-1 text-sm">
                  <li>• Circuits containing electronic equipment (unless disconnected)</li>
                  <li>• Systems with surge protection devices connected</li>
                  <li>• Circuits with capacitors or filters that could be damaged</li>
                  <li>• When protective devices cannot be safely bypassed</li>
                  <li>• Emergency lighting circuits during normal operation</li>
                </ul>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck
              id="ir-tester-safety"
              question="When can IR testers be used?"
              options={["On live circuits", "Only on isolated circuits", "On any circuit below 230V", "With special safety equipment"]}
              correctIndex={1}
              explanation="IR testers must only be used on isolated and disconnected circuits to prevent equipment damage and ensure safety."
            />
          </div>

          {/* Section 3: Continuity Tester */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Continuity Tester
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div>
                <p className="font-medium text-white mb-2">Use when: Verifying unbroken paths in conductors (e.g., ring final circuits, bonding, CPCs).</p>
                <ul className="ml-4 space-y-1 text-sm">
                  <li>• Testing ring final circuit continuity (R1 + R2 method)</li>
                  <li>• Verifying protective conductor continuity (CPC)</li>
                  <li>• Checking main and supplementary bonding connections</li>
                  <li>• Testing earth electrode connections</li>
                  <li>• Verifying cable core continuity after installation</li>
                  <li>• Checking switch and control circuit wiring</li>
                  <li>• Testing motor winding continuity</li>
                </ul>
              </div>

              <div>
                <p className="font-medium text-white mb-2">Why: Ensures protective conductors and circuits are complete.</p>
                <ul className="ml-4 space-y-1 text-sm">
                  <li>• Confirms fault current path back to source</li>
                  <li>• Ensures automatic disconnection will operate correctly</li>
                  <li>• Verifies protective bonding is effective</li>
                  <li>• Identifies poor connections that could cause overheating</li>
                  <li>• Essential for electrical safety and compliance</li>
                  <li>• Prevents dangerous potential differences</li>
                </ul>
              </div>

              <div>
                <p className="font-medium text-white mb-2">Test Methods and Values:</p>
                <ul className="ml-4 space-y-1 text-sm">
                  <li>• Apply test current of at least 200mA DC</li>
                  <li>• Record resistance values in milliohms (mΩ)</li>
                  <li>• Ring circuits: test each leg separately, then end-to-end</li>
                  <li>• Compare measured values with design calculations</li>
                  <li>• Temperature correction may be required for cable resistance</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                <p className="font-medium text-white mb-2">Do not use for: Live circuits.</p>
                <ul className="ml-4 space-y-1 text-sm">
                  <li>• Any energised electrical system or circuit</li>
                  <li>• Circuits containing electronic components that could be damaged</li>
                  <li>• When risk assessment indicates live testing would be safer</li>
                  <li>• Circuits where isolation cannot be confirmed</li>
                </ul>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck
              id="continuity-purpose"
              question="What does a continuity tester verify?"
              options={["Voltage levels", "Unbroken paths in conductors", "Insulation quality", "Power consumption"]}
              correctIndex={1}
              explanation="Continuity testers verify that there are complete, unbroken paths in conductors such as ring circuits and protective conductors."
            />
          </div>

          {/* Section 4: Two-Pole Voltage Tester */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Two-Pole Voltage Tester (GS38 Compliant)
            </h2>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/30">
              <div className="text-white/80 space-y-4 leading-relaxed">
                <div>
                  <p className="font-medium text-white mb-2">Use when: Proving circuits live or dead.</p>
                  <ul className="ml-4 space-y-1 text-sm">
                    <li>• Safe isolation procedures before electrical work</li>
                    <li>• Confirming circuit status at isolation points</li>
                    <li>• Verifying effective isolation after switching</li>
                    <li>• Testing for presence of voltage in enclosures</li>
                    <li>• Confirming absence of dangerous voltages</li>
                    <li>• Phase identification and rotation testing</li>
                    <li>• Checking for backfeed or induced voltages</li>
                  </ul>
                </div>

                <div>
                  <p className="font-medium text-white mb-2">Why: Safest and most reliable instrument for proving dead.</p>
                  <ul className="ml-4 space-y-1 text-sm">
                    <li>• GS38 compliance ensures appropriate safety features</li>
                    <li>• Two-pole testing prevents false readings from broken earths</li>
                    <li>• Fused test leads protect against fault currents</li>
                    <li>• Shrouded probes reduce risk of accidental contact</li>
                    <li>• Clear indication distinguishes live from dead</li>
                    <li>• Built-in safety features prevent misuse</li>
                  </ul>
                </div>

                <div>
                  <p className="font-medium text-white mb-2">GS38 Compliance Requirements:</p>
                  <ul className="ml-4 space-y-1 text-sm">
                    <li>• Fused test leads with 500mA or lower rating</li>
                    <li>• Shrouded test probes with max 4mm exposed tip</li>
                    <li>• Finger guards to prevent accidental contact</li>
                    <li>• Clear, unambiguous indication (LED/LCD display)</li>
                    <li>• Robust construction suitable for site conditions</li>
                    <li>• Regular calibration and functional testing</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Matching Instruments to Tasks */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Matching Instruments to Tasks
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Fault-finding (e.g., "why isn't the socket working?") → Multimeter</p>
                <ul className="ml-4 space-y-1 text-sm text-white/80">
                  <li>• Check voltage at socket outlets</li>
                  <li>• Measure current draw of appliances</li>
                  <li>• Test resistance of heating elements</li>
                  <li>• Verify transformer secondary voltages</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Insulation check before energising → IR Tester</p>
                <ul className="ml-4 space-y-1 text-sm text-white/80">
                  <li>• New installation commissioning</li>
                  <li>• After cable pulling and termination</li>
                  <li>• Before switching on after maintenance</li>
                  <li>• Following suspected cable damage</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Ring final circuit verification → Continuity Tester</p>
                <ul className="ml-4 space-y-1 text-sm text-white/80">
                  <li>• R1 + R2 testing of socket circuits</li>
                  <li>• CPC continuity verification</li>
                  <li>• Bonding conductor testing</li>
                  <li>• Cable core identification</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/30">
                <p className="font-medium text-white mb-2">Safe isolation → Two-Pole Voltage Tester + Proving Unit</p>
                <ul className="ml-4 space-y-1 text-sm text-white/80">
                  <li>• Proving dead before any electrical work</li>
                  <li>• Confirming isolation effectiveness</li>
                  <li>• Testing for dangerous voltages</li>
                  <li>• Verifying permit-to-work conditions</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Common Mistakes to Avoid */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              Common Mistakes to Avoid
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                <p className="font-medium text-white mb-3">Wrong Instrument Selection:</p>
                <ul className="space-y-2 text-sm text-white/80">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">✗</span>
                    <span>Using multimeters for proving dead</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">✗</span>
                    <span>IR testing on live circuits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">✗</span>
                    <span>Continuity testing without isolation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">✗</span>
                    <span>Using voltage pens for safety decisions</span>
                  </li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                <p className="font-medium text-white mb-3">Poor Testing Practices:</p>
                <ul className="space-y-2 text-sm text-white/80">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">✗</span>
                    <span>Skipping proving unit checks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">✗</span>
                    <span>Not testing all conductor combinations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">✗</span>
                    <span>Using uncalibrated instruments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">✗</span>
                    <span>Assuming circuit labels are correct</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Best Practices for Instrument Selection
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <p className="font-medium text-white mb-3">Before You Start:</p>
                <ul className="space-y-2 text-sm text-white/80">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Read the test procedure thoroughly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Check instrument calibration certificates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Verify GS38 compliance where required</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Inspect test leads and probes</span>
                  </li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <p className="font-medium text-white mb-3">During Testing:</p>
                <ul className="space-y-2 text-sm text-white/80">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Prove tester function before and after</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Test all required combinations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Record readings immediately</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Compare results with expected values</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Real-World Examples */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Real-World Examples
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
                <p className="font-medium text-white mb-3">Case Study 1: The Wrong Tool Nearly Caused a Serious Accident</p>
                <p className="text-white/80 mb-3">
                  On a commercial project, an electrician used a multimeter to prove a circuit was dead. The meter was accidentally left on the wrong range, giving a zero reading even though the circuit was live. He received an electric shock when handling the conductor.
                </p>
                <p className="text-white/80">
                  <strong>Prevention:</strong> Using a GS38-compliant two-pole tester with a proving unit would have clearly indicated the live circuit and prevented the accident.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                <p className="font-medium text-white mb-3">Case Study 2: IR Testing Disaster</p>
                <p className="text-white/80 mb-3">
                  An apprentice was asked to test the insulation resistance of a new circuit. Without proper training, he connected the IR tester to a live circuit containing electronic equipment.
                </p>
                <p className="text-white/80">
                  <strong>The result:</strong> The 500V test voltage destroyed £2,000 worth of control equipment. <strong>Lesson learned:</strong> IR testing must only be performed on isolated circuits, and all electronic equipment must be disconnected first.
                </p>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-2">Q: {faq.question}</p>
                  <p className="text-sm text-white/70">A: {faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Pocket Guide */}
          <section className="mb-10">
            <div className="p-5 rounded-lg bg-gradient-to-br from-elec-yellow/10 via-elec-yellow/5 to-transparent border border-elec-yellow/30">
              <h2 className="text-lg font-semibold text-white mb-4">Pocket Guide</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-elec-yellow mb-2">Instrument Selection:</p>
                  <ul className="space-y-1 text-sm text-white/80">
                    <li>✅ Multimeter = Diagnostics (voltage/current/resistance)</li>
                    <li>✅ IR Tester = Insulation quality (must be isolated)</li>
                    <li>✅ Continuity Tester = Unbroken conductors and bonding</li>
                    <li>✅ Two-Pole Tester + Proving Unit = Safe isolation</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-elec-yellow mb-2">Never Use:</p>
                  <ul className="space-y-1 text-sm text-white/80">
                    <li>❌ Never use neon screwdrivers for proving dead</li>
                    <li>❌ Never use IR testers on live circuits</li>
                    <li>❌ Never use multimeters for proving dead</li>
                    <li>❌ Never use continuity testers on live circuits</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Recap */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Recap
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <p className="font-medium text-white mb-2">Instrument Roles:</p>
                <ul className="space-y-1 text-sm text-white/80">
                  <li>• <strong>Multimeters:</strong> Diagnostics - never for proving dead</li>
                  <li>• <strong>IR Testers:</strong> Check insulation on isolated circuits</li>
                  <li>• <strong>Continuity Testers:</strong> Verify unbroken conductor paths</li>
                  <li>• <strong>Two-Pole Testers:</strong> The only safe way to prove dead</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-2">Critical Safety Rules:</p>
                <ul className="space-y-1 text-sm text-white/80">
                  <li>• Never use neon screwdrivers for proving dead</li>
                  <li>• Always isolate circuits before IR or continuity testing</li>
                  <li>• Use only GS38-compliant instruments for safety</li>
                  <li>• Prove your tester works before and after use</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-2">Professional Standards:</p>
                <ul className="space-y-1 text-sm text-white/80">
                  <li>• Annual calibration of all test instruments</li>
                  <li>• Record all readings accurately on certificates</li>
                  <li>• Select the correct instrument for each task</li>
                  <li>• Follow BS 7671 and EAWR requirements</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Quiz */}
          <section className="mb-10">
            <Quiz
              title="Test Your Knowledge: Instrument Selection"
              questions={quizQuestions}
            />
          </section>

          {/* Navigation Footer */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../3-5">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Proving Unit and Two-Pole Tester
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="..">
                Back to Section 3 Overview
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module6Section3_6;
