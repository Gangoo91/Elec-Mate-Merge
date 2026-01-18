import { ArrowLeft, CheckCircle, Shield, AlertTriangle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module6Section3_5 = () => {
  useSEO(
    "Using a Proving Unit and Two-Pole Voltage Tester - Level 2 Electrical Testing & Inspection",
    "The most reliable way to confirm circuits are dead using proper testing equipment"
  );

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
    <div className="overflow-x-hidden bg-[#1a1a1a]">
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
              <span className="text-white/60">Section 6.3.5</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Using a Proving Unit and Two-Pole Voltage Tester
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              The most reliable way to confirm circuits are dead using proper testing equipment
            </p>
          </header>

          {/* Quick Reference Summary */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <p className="font-medium text-white mb-3">Spot it in 30 Seconds</p>
            <div className="grid sm:grid-cols-2 gap-4 text-sm text-white/80">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Two-pole voltage tester with fused, shrouded leads (GS38)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Proving unit to verify tester operation before and after</span>
                </li>
              </ul>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Live-dead-live sequence: prove → test → re-prove</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Never use neon screwdrivers or voltage pens for proving dead</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Introduction */}
          <section className="mb-10">
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                The most reliable way to confirm that a circuit is dead and safe to work on is by using a two-pole voltage tester in combination with a proving unit. This method ensures your tester is functioning correctly before and after use, and that circuits are properly verified.
              </p>
              <p>
                This subsection will guide you through correct procedures, safety practices, and common pitfalls when using these essential pieces of safety equipment.
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
                  <span>Identify the purpose of a proving unit and two-pole tester</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Use both devices together as part of safe isolation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Follow the correct sequence for proving before and after testing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Recognise unsafe tools and practices (e.g., neon screwdrivers)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Apply GS38 compliance to tester selection and use</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 1: Why Use a Proving Unit? */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Why Use a Proving Unit?
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div>
                <p className="font-medium text-white mb-2">Confirms Tester Operation:</p>
                <ul className="ml-4 space-y-1 text-sm">
                  <li>• Verifies that your voltage tester is working correctly before use</li>
                  <li>• Provides a known voltage source for testing tester function</li>
                  <li>• Confirms tester sensitivity and response to live circuits</li>
                  <li>• Checks both visual and audible indication functions</li>
                  <li>• Ensures batteries and internal components are functioning</li>
                </ul>
              </div>

              <div>
                <p className="font-medium text-white mb-2">Ensures Live-Dead-Live Check:</p>
                <ul className="ml-4 space-y-1 text-sm">
                  <li>• Proves tester works before testing the circuit (live)</li>
                  <li>• Tests the circuit to confirm it's dead (dead)</li>
                  <li>• Re-proves tester still works after testing (live)</li>
                  <li>• Identifies if tester fails during the proving process</li>
                  <li>• Provides confidence in the test results</li>
                </ul>
              </div>

              <div>
                <p className="font-medium text-white mb-2">Prevents False Results:</p>
                <ul className="ml-4 space-y-1 text-sm">
                  <li>• Detects faulty testers that might give false 'dead' readings</li>
                  <li>• Identifies testers with flat batteries or internal faults</li>
                  <li>• Prevents dangerous assumptions about circuit condition</li>
                  <li>• Ensures consistent and reliable test methodology</li>
                  <li>• Meets GS38 requirements for proving tester function</li>
                </ul>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck
              id="proving-unit-purpose"
              question="What is the main purpose of a proving unit?"
              options={["To test insulation resistance", "To confirm tester operation", "To measure voltage", "To check polarity"]}
              correctIndex={1}
              explanation="A proving unit confirms that your voltage tester is working correctly before and after use, ensuring reliable test results."
            />
          </div>

          {/* Section 2: Why a Two-Pole Voltage Tester? */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Why a Two-Pole Voltage Tester?
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div>
                <p className="font-medium text-white mb-2">Direct Voltage Indication:</p>
                <ul className="ml-4 space-y-1 text-sm">
                  <li>• Provides direct measurement between two specific points</li>
                  <li>• Shows actual voltage present across conductors</li>
                  <li>• Clear visual and/or audible indication of voltage presence</li>
                  <li>• No ambiguity about circuit condition</li>
                  <li>• Works independently of earth connections</li>
                </ul>
              </div>

              <div>
                <p className="font-medium text-white mb-2">Safety and Reliability:</p>
                <ul className="ml-4 space-y-1 text-sm">
                  <li>• Much safer than neon screwdrivers or single-pole devices</li>
                  <li>• Doesn't rely on your body to complete the circuit</li>
                  <li>• Provides consistent results regardless of user</li>
                  <li>• Less susceptible to interference from nearby circuits</li>
                  <li>• Can detect lower voltage levels reliably</li>
                </ul>
              </div>

              <div>
                <p className="font-medium text-white mb-2">GS38 Compliance:</p>
                <ul className="ml-4 space-y-1 text-sm">
                  <li>• Meets all GS38 safety requirements for test equipment</li>
                  <li>• Features fused test leads to limit fault current</li>
                  <li>• Has shrouded or protected probe tips</li>
                  <li>• Designed specifically for electrical safety testing</li>
                  <li>• Appropriate CAT rating for the system voltage</li>
                </ul>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck
              id="two-pole-tester"
              question="Why are two-pole voltage testers preferred over neon screwdrivers?"
              options={["They're cheaper", "They don't rely on your body", "They're faster", "They look more professional"]}
              correctIndex={1}
              explanation="Two-pole testers don't rely on your body to complete the circuit, making them much safer and more reliable than neon screwdrivers."
            />
          </div>

          {/* Section 3: The Correct Sequence */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              The Correct Sequence (Live-Dead-Live)
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <p className="font-medium text-white mb-2">Step 1: Prove Tester (LIVE)</p>
                <ul className="ml-4 space-y-1 text-sm">
                  <li>• Switch on the proving unit to provide known voltage</li>
                  <li>• Test your voltage tester on the proving unit terminals</li>
                  <li>• Verify both visual and audible indications work</li>
                  <li>• Confirm tester responds correctly to live voltage</li>
                  <li>• Check test leads and probes are making good contact</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Step 2: Test Circuit (DEAD)</p>
                <ul className="ml-4 space-y-1 text-sm">
                  <li>• Test L–N (Live to Neutral) at the point of work</li>
                  <li>• Test L–E (Live to Earth) at the point of work</li>
                  <li>• Test N–E (Neutral to Earth) at the point of work</li>
                  <li>• All tests should show no voltage present</li>
                  <li>• Test at the exact location where work will be performed</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <p className="font-medium text-white mb-2">Step 3: Re-prove Tester (LIVE)</p>
                <ul className="ml-4 space-y-1 text-sm">
                  <li>• Return to the proving unit immediately after testing</li>
                  <li>• Test your voltage tester again on the proving unit</li>
                  <li>• Confirm tester still responds to live voltage</li>
                  <li>• Verify no damage occurred during the proving process</li>
                  <li>• Only proceed with work if re-prove is successful</li>
                </ul>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck
              id="live-dead-live-sequence"
              question="What is the correct sequence for proving dead?"
              options={["Dead-live-dead", "Live-dead-live", "Lock-off only", "Test then isolate"]}
              correctIndex={1}
              explanation="Live-dead-live: prove tester works, test circuit is dead, re-prove tester still works. This ensures reliable results."
            />
          </div>

          {/* Section 4: Unsafe Practices to Avoid */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Unsafe Practices to Avoid
            </h2>
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <div className="text-white/80 space-y-4 leading-relaxed">
                <div>
                  <p className="font-medium text-white mb-2">Never Use Neon Screwdrivers:</p>
                  <ul className="ml-4 space-y-1 text-sm">
                    <li>• Rely on your body to complete the circuit - unsafe design</li>
                    <li>• Don't meet GS38 safety requirements</li>
                    <li>• Can give false readings due to induced voltages</li>
                    <li>• Provide no indication of voltage level</li>
                    <li>• Can fail to detect dangerous voltages</li>
                  </ul>
                </div>

                <div>
                  <p className="font-medium text-white mb-2">Don't Skip Re-proving:</p>
                  <ul className="ml-4 space-y-1 text-sm">
                    <li>• Tester could have failed during the proving process</li>
                    <li>• Internal fuses may have blown due to fault conditions</li>
                    <li>• Test leads could have been damaged</li>
                    <li>• Battery could have failed during testing</li>
                    <li>• Essential step for confirming continued tester function</li>
                  </ul>
                </div>

                <div>
                  <p className="font-medium text-white mb-2">Avoid Non-GS38 Equipment:</p>
                  <ul className="ml-4 space-y-1 text-sm">
                    <li>• Damaged or non-compliant test leads are dangerous</li>
                    <li>• Wrong CAT rating could lead to equipment failure</li>
                    <li>• Unfused leads don't provide fault current protection</li>
                    <li>• Non-shrouded probes increase shock risk</li>
                    <li>• Home-made or modified test equipment is prohibited</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck
              id="unsafe-practices"
              question="Which tool should never be used for proving dead?"
              options={["Two-pole voltage tester", "Proving unit", "Neon screwdriver", "Digital multimeter"]}
              correctIndex={2}
              explanation="Neon screwdrivers should never be used for proving dead as they rely on your body to complete the circuit and are not GS38 compliant."
            />
          </div>

          {/* Practical Guidance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Practical Guidance
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="font-medium text-white mb-3">Equipment Requirements:</p>
                <ul className="space-y-2 text-sm text-white/80">
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
                <p className="font-medium text-white mb-3">Safe Working Practices:</p>
                <ul className="space-y-2 text-sm text-white/80">
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
          </section>

          {/* Real-World Example */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              Real-World Example
            </h2>
            <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <p className="font-medium text-white mb-3">Case Study: The Hidden Tester Failure</p>
              <p className="text-white/80 mb-4">
                An electrician isolated a distribution board but skipped the re-prove stage after testing. Unknown to him, the tester's internal fuse had blown during the proving process. He assumed the circuit was dead, but it was still live. He suffered a minor electric shock that could have been fatal.
              </p>
              <div className="p-3 rounded-lg bg-white/5 border-l-2 border-amber-500">
                <p className="font-medium text-white mb-2">Lesson learned:</p>
                <p className="text-sm text-white/80">
                  Always perform the complete live-dead-live testing sequence with a proving unit. The re-prove step is not optional—it's a safety-critical verification that your tester is still functioning correctly.
                </p>
              </div>
            </div>
          </section>

          {/* Micro-Challenge */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <Zap className="w-5 h-5 text-elec-yellow" />
              Micro-Challenge
            </h2>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/30">
              <p className="text-white/80 mb-4">
                You arrive at a job and your colleague says "Don't worry, I've already tested it with my voltage pen - it's definitely dead." What do you do?
              </p>
              <div className="p-3 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-white mb-2">Answer:</p>
                <p className="text-sm text-white/80">
                  Never trust another person's testing, especially with non-GS38 equipment. Always perform your own complete live-dead-live procedure using proper two-pole voltage tester and proving unit. Voltage pens are not acceptable for proving dead.
                </p>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
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

          {/* Recap */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Recap
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="p-3 rounded-lg bg-elec-yellow/10 text-center">
                <Shield className="w-6 h-6 text-elec-yellow mx-auto mb-2" />
                <p className="text-xs font-medium text-white">Proving Units</p>
                <p className="text-xs text-white/60">Confirm testers are functional</p>
              </div>
              <div className="p-3 rounded-lg bg-green-500/10 text-center">
                <Zap className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <p className="text-xs font-medium text-white">Two-Pole Testers</p>
                <p className="text-xs text-white/60">Only safe method for proving dead</p>
              </div>
              <div className="p-3 rounded-lg bg-purple-500/10 text-center">
                <CheckCircle className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                <p className="text-xs font-medium text-white">Live-Dead-Live</p>
                <p className="text-xs text-white/60">Sequence is mandatory</p>
              </div>
              <div className="p-3 rounded-lg bg-red-500/10 text-center">
                <AlertTriangle className="w-6 h-6 text-red-500 mx-auto mb-2" />
                <p className="text-xs font-medium text-white">Unsafe Practices</p>
                <p className="text-xs text-white/60">Neon screwdrivers prohibited</p>
              </div>
              <div className="p-3 rounded-lg bg-amber-500/10 text-center">
                <Shield className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                <p className="text-xs font-medium text-white">Re-proving</p>
                <p className="text-xs text-white/60">Prevents reliance on faulty instruments</p>
              </div>
            </div>
          </section>

          {/* Pocket Guide */}
          <section className="mb-10">
            <div className="p-5 rounded-lg bg-gradient-to-br from-elec-yellow/10 via-elec-yellow/5 to-transparent border border-elec-yellow/30">
              <h2 className="text-lg font-semibold text-white mb-4">Pocket Guide</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-elec-yellow mb-2">Equipment Checklist:</p>
                  <ul className="space-y-1 text-sm text-white/80">
                    <li>• Use two-pole testers only</li>
                    <li>• GS38-compliant with fused, shrouded leads</li>
                    <li>• Proving unit for tester verification</li>
                    <li>• Inspect equipment before use</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-elec-yellow mb-2">Testing Sequence:</p>
                  <ul className="space-y-1 text-sm text-white/80">
                    <li>• Always follow live-dead-live sequence</li>
                    <li>• Prove tester → Test circuit → Re-prove tester</li>
                    <li>• Test L–N, L–E, N–E combinations</li>
                    <li>• Never skip the re-prove step</li>
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

          {/* Navigation Footer */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../3-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Proving Dead and Safe to Test
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../3-6">
                Next: When to Use Each Instrument
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module6Section3_5;
