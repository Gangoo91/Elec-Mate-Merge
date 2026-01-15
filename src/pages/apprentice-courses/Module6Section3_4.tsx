import { ArrowLeft, CheckCircle, Shield, AlertTriangle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module6Section3_4 = () => {
  useSEO(
    "Proving Dead and Safe to Test - Level 2 Electrical Testing & Inspection",
    "Essential safe isolation procedures and proving dead techniques"
  );

  const quizQuestions = [
    {
      id: 1,
      question: "What regulation requires proving dead before work?",
      options: ["Gas Safety Act", "Electricity at Work Regulations", "Building Regulations", "Health & Safety Act"],
      correctAnswer: 1,
      explanation: "The Electricity at Work Regulations (EAWR) 1989 requires that systems are proven dead before work begins to prevent electrical accidents."
    },
    {
      id: 2,
      question: "What is the first step in safe isolation?",
      options: ["Apply lock-off", "Identify the correct circuit", "Prove dead immediately", "Test the tester"],
      correctAnswer: 1,
      explanation: "Circuit identification is crucial first step - working on the wrong circuit is a common cause of electrical accidents."
    },
    {
      id: 3,
      question: "Which device is used to check a tester works correctly?",
      options: ["Multimeter", "Proving unit", "Neon screwdriver", "Voltage pen"],
      correctAnswer: 1,
      explanation: "A proving unit provides a known voltage source to verify that your voltage tester is working correctly before and after use."
    },
    {
      id: 4,
      question: "What is the correct tool to prove dead?",
      options: ["Two-pole voltage indicator", "Neon screwdriver", "Voltage pen", "Multimeter"],
      correctAnswer: 0,
      explanation: "Only GS38-compliant two-pole voltage indicators should be used for proving dead - neon screwdrivers and voltage pens are unreliable."
    },
    {
      id: 5,
      question: "True or False: Circuit labelling can be relied on alone.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False. Circuit labels can be incorrect due to modifications, poor maintenance, or human error. Always prove dead regardless of labelling."
    },
    {
      id: 6,
      question: "Why must you test L–N, L–E, and N–E?",
      options: ["To confirm correct polarity", "To ensure all conductors are dead", "To check insulation resistance", "To measure voltage drop"],
      correctAnswer: 1,
      explanation: "Testing all combinations ensures no conductor is live - circuits can be backfed or have switching arrangements that leave some conductors live."
    },
    {
      id: 7,
      question: "Why do you re-prove your tester after use?",
      options: ["To check calibration", "To ensure it hasn't failed", "To extend battery life", "To reset the display"],
      correctAnswer: 1,
      explanation: "Re-proving after use confirms the tester hasn't failed during the proving dead procedure - a failed tester could give false readings."
    },
    {
      id: 8,
      question: "What should you do with the isolator key?",
      options: ["Leave it in the switch", "Keep it with you", "Hand it to another worker", "Put it in the office"],
      correctAnswer: 1,
      explanation: "Keep the isolation key with you to prevent accidental re-energisation by others while you're working on the circuit."
    },
    {
      id: 9,
      question: "Which unsafe practice is specifically warned against in GS38?",
      options: ["Using fused leads", "Using neon screwdrivers", "Using proving units", "Using CAT-rated equipment"],
      correctAnswer: 1,
      explanation: "GS38 specifically warns against neon screwdrivers and voltage pens as they are unreliable and can give false readings."
    },
    {
      id: 10,
      question: "What is the main risk of skipping the proving dead procedure?",
      options: ["Extra paperwork", "Serious injury or death", "Slightly slower work", "Equipment damage"],
      correctAnswer: 1,
      explanation: "The main risk is serious injury or death from electric shock, burns, or arc flash incidents when working on live circuits."
    }
  ];

  const faqs = [
    {
      question: "Can I just trust the isolator switch?",
      answer: "No — circuits can be backfed through other connections, switching arrangements may be complex, or the isolator may be faulty. Always prove dead at the point of work regardless of isolation switching."
    },
    {
      question: "Why do I need to re-prove my tester after use?",
      answer: "To ensure it hasn't failed during the proving dead procedure. A tester could develop a fault during use, leading to false 'dead' readings on subsequent tests."
    },
    {
      question: "Can I use a multimeter instead of a voltage indicator?",
      answer: "No. Only two-pole voltage indicators are recommended under GS38 for proving dead. Multimeters are not suitable for this safety-critical application."
    },
    {
      question: "What if the circuit won't go dead?",
      answer: "Stop work immediately. Check for alternative supplies, backfeeds, or incorrect circuit identification. Investigate systematically before proceeding with isolation."
    },
    {
      question: "How long does isolation have to be maintained?",
      answer: "Throughout the entire work period. The circuit must remain isolated and locked off until all work is complete and the installation is safe to re-energise."
    },
    {
      question: "What if I don't have a proving unit?",
      answer: "You cannot safely prove dead without one. A proving unit is essential equipment - do not proceed with electrical work without proper testing of your voltage indicator."
    },
    {
      question: "Can I work alone when proving dead?",
      answer: "While not prohibited, it's safer to have someone else present, especially in high-risk environments. Follow your company's lone working policies and risk assessments."
    },
    {
      question: "What constitutes adequate warning notices?",
      answer: "Clear, visible signs stating 'DANGER - MEN WORKING' or similar, positioned at all points where the circuit could be re-energised. Include your name and contact details."
    },
    {
      question: "Should I test at the origin or point of work?",
      answer: "Always test at the point of work - this confirms the circuit is dead where you'll be working, accounting for any intermediate switching or faults."
    },
    {
      question: "What personal protective equipment should I wear?",
      answer: "At minimum, safety glasses and appropriate gloves. Follow your risk assessment - high-risk work may require arc flash protection and other specialist PPE."
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
              <span className="text-white/60">Section 6.3.4</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Proving Dead and Safe to Test
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Essential safe isolation procedures and proving dead techniques
            </p>
          </header>

          {/* Quick Reference Summary */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <p className="font-medium text-white mb-3">Spot it in 30 Seconds</p>
            <div className="grid sm:grid-cols-2 gap-4 text-sm text-white/80">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Isolate → Lock off → Label → Prove tester → Test dead → Re-prove</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>GS38-compliant two-pole tester (no neon screwdrivers)</span>
                </li>
              </ul>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Test all combinations: L–N, L–E, N–E at point of work</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Keep isolation key in your possession throughout work</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Introduction */}
          <section className="mb-10">
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Before any installation or maintenance work begins, electricians must ensure that circuits are dead and safe to work on. Failure to prove dead is one of the most common causes of electrical accidents.
              </p>
              <p>
                This subsection explains how to correctly isolate, prove dead, and verify safety before touching conductors or equipment, following the requirements of the Electricity at Work Regulations and industry best practices.
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
                  <span>Explain the purpose of proving dead and its legal requirements</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Follow the safe isolation procedure step by step</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Use a GS38-compliant voltage tester and proving unit correctly</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Avoid unsafe practices such as relying on neon screwdrivers</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Apply correct verification procedures before starting electrical work</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 1: Why Prove Dead? */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Why Prove Dead?
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div>
                <p className="font-medium text-white mb-2">Prevents Accidental Contact:</p>
                <ul className="ml-4 space-y-1 text-sm">
                  <li>• Electric shock from live conductors can cause serious injury or death</li>
                  <li>• Arc flash incidents can cause severe burns and blast injuries</li>
                  <li>• Even low voltages can be lethal in certain conditions (wet hands, heart conditions)</li>
                  <li>• Protects against induced voltages from adjacent circuits or equipment</li>
                  <li>• Prevents damage to sensitive equipment during maintenance</li>
                </ul>
              </div>

              <div>
                <p className="font-medium text-white mb-2">Confirms Effective Isolation:</p>
                <ul className="ml-4 space-y-1 text-sm">
                  <li>• Circuit labels may be incorrect due to modifications or poor maintenance</li>
                  <li>• Circuits can be backfed through alternative supply routes</li>
                  <li>• Isolators may be faulty or not fully disconnecting all poles</li>
                  <li>• Multiple sources may supply the same equipment (normal/emergency supplies)</li>
                  <li>• Induced voltages from parallel circuits can present hazards</li>
                </ul>
              </div>

              <div>
                <p className="font-medium text-white mb-2">Legal and Regulatory Compliance:</p>
                <ul className="ml-4 space-y-1 text-sm">
                  <li>• Electricity at Work Regulations 1989 - Regulation 4 requires systems to be dead before work</li>
                  <li>• Health and Safety at Work Act 1974 - duty of care to prevent foreseeable harm</li>
                  <li>• BS 7671 requirements for safe working practices</li>
                  <li>• Corporate manslaughter legislation applies to electrical safety failures</li>
                  <li>• Professional liability and insurance requirements</li>
                </ul>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck
              id="prove-dead-purpose"
              question="What is the primary purpose of proving dead?"
              options={["To comply with paperwork", "To prevent electrical accidents", "To save time", "To check circuit labels"]}
              correctIndex={1}
              explanation="The primary purpose is to prevent electrical accidents by confirming that circuits are actually dead before work begins."
            />
          </div>

          {/* Section 2: Safe Isolation Procedure */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Safe Isolation Procedure (Step by Step)
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div>
                <p className="font-medium text-white mb-2">Step 1: Identify the Correct Circuit</p>
                <ul className="ml-4 space-y-1 text-sm">
                  <li>• Use circuit schedules, labels, and physical tracing to confirm circuit identity</li>
                  <li>• Test switching operations to verify which circuits are controlled</li>
                  <li>• Check for multiple supplies (emergency lighting, UPS systems)</li>
                  <li>• Identify any interconnections or parallel feeds</li>
                  <li>• Never rely solely on labelling - always verify by testing</li>
                </ul>
              </div>

              <div>
                <p className="font-medium text-white mb-2">Step 2: Switch Off the Supply at the Isolator</p>
                <ul className="ml-4 space-y-1 text-sm">
                  <li>• Use the correct isolator - main switch, MCB, or dedicated isolator</li>
                  <li>• Ensure all poles are disconnected (single-phase and three-phase)</li>
                  <li>• Check the isolator is suitable for the load current</li>
                  <li>• Verify switching operation - some isolators may stick or fail to fully open</li>
                  <li>• Look for isolation indication on the isolator (visible contact gap where possible)</li>
                </ul>
              </div>

              <div>
                <p className="font-medium text-white mb-2">Step 3: Apply Lock-off Devices and Warning Notices</p>
                <ul className="ml-4 space-y-1 text-sm">
                  <li>• Use appropriate lock-off device: miniature lock-offs for MCBs, hasps for larger isolators</li>
                  <li>• Apply your personal padlock - only you should have the key</li>
                  <li>• Attach clear warning notices: "DANGER - MEN WORKING" or similar</li>
                  <li>• Include your name, contact details, and expected completion time</li>
                  <li>• Ensure notices are visible from all approaches to the isolator</li>
                  <li>• Consider additional barriers or guards if necessary</li>
                </ul>
              </div>

              <div>
                <p className="font-medium text-white mb-2">Step 4: Prove Your Tester on a Proving Unit</p>
                <ul className="ml-4 space-y-1 text-sm">
                  <li>• Use a proving unit that provides a known voltage (typically 230V AC)</li>
                  <li>• Check your two-pole voltage indicator reads the expected voltage</li>
                  <li>• Verify the tester's audio and visual indicators work correctly</li>
                  <li>• Check test leads are secure and undamaged</li>
                  <li>• Ensure battery levels are adequate for reliable operation</li>
                </ul>
              </div>

              <div>
                <p className="font-medium text-white mb-2">Step 5: Test Between Live, Neutral, and Earth at Point of Work</p>
                <ul className="ml-4 space-y-1 text-sm">
                  <li>• Test all combinations: L–N, L–E, N–E (and L1–L2, L2–L3, L3–L1 for three-phase)</li>
                  <li>• Test at the exact point where work will be carried out</li>
                  <li>• Hold test probes firmly against clean conductors or terminals</li>
                  <li>• Allow sufficient time for readings to stabilise (2-3 seconds minimum)</li>
                  <li>• All readings should indicate zero/dead - no voltage present</li>
                  <li>• Be especially careful with control circuits and auxiliary supplies</li>
                </ul>
              </div>

              <div>
                <p className="font-medium text-white mb-2">Step 6: Re-prove Your Tester on the Proving Unit</p>
                <ul className="ml-4 space-y-1 text-sm">
                  <li>• Immediately re-test the voltage indicator on the proving unit</li>
                  <li>• Confirm it still reads the expected voltage correctly</li>
                  <li>• This verifies the tester hasn't failed during the proving dead procedure</li>
                  <li>• If the tester doesn't work on the proving unit, repeat the entire procedure</li>
                  <li>• Only proceed with work once the complete procedure is successful</li>
                </ul>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck
              id="isolation-steps"
              question="What is the correct sequence for safe isolation?"
              options={["Test, isolate, lock off", "Isolate, lock off, test", "Lock off, test, isolate", "Identify, isolate, lock off, prove tester, test, re-prove"]}
              correctIndex={3}
              explanation="The correct sequence ensures circuit identity is confirmed before isolation, and tester function is verified before and after testing."
            />
          </div>

          {/* Section 3: GS38-Compliant Tester Use */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              GS38-Compliant Tester Use
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div>
                <p className="font-medium text-white mb-2">Two-pole Voltage Indicators Only:</p>
                <ul className="ml-4 space-y-1 text-sm">
                  <li>• Uses two separate probes to measure voltage between conductors</li>
                  <li>• Provides clear indication of voltage presence through LED and audible signals</li>
                  <li>• Self-checking circuitry that identifies internal faults</li>
                  <li>• Designed specifically for proving dead applications</li>
                  <li>• Reliable operation even in harsh electrical environments</li>
                </ul>
              </div>

              <div>
                <p className="font-medium text-white mb-2">Prohibited Equipment:</p>
                <ul className="ml-4 space-y-1 text-sm">
                  <li>• <strong>Neon screwdrivers:</strong> Unreliable, can fail without indication, single-pole operation</li>
                  <li>• <strong>Voltage pens:</strong> Prone to false readings, affected by electromagnetic fields</li>
                  <li>• <strong>Single-pole testers:</strong> Rely on body capacitance, inconsistent operation</li>
                  <li>• <strong>Non-contact voltage detectors:</strong> Not suitable for proving dead applications</li>
                  <li>• <strong>Multimeters:</strong> Not designed for safety-critical proving dead function</li>
                </ul>
              </div>

              <div>
                <p className="font-medium text-white mb-2">CAT-rated and Fused Test Leads:</p>
                <ul className="ml-4 space-y-1 text-sm">
                  <li>• CAT III or CAT IV rating appropriate for the installation voltage</li>
                  <li>• In-line fuses to protect against short-circuit currents</li>
                  <li>• Finger guards on probes to prevent accidental contact</li>
                  <li>• Maximum 4mm exposed probe tip to reduce short-circuit risk</li>
                  <li>• High-quality insulation rated for the working voltage</li>
                  <li>• Regular inspection for damage, wear, or contamination</li>
                </ul>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck
              id="gs38-compliance"
              question="Which tester is GS38-compliant for proving dead?"
              options={["Neon screwdriver", "Two-pole voltage indicator", "Voltage pen", "Digital multimeter"]}
              correctIndex={1}
              explanation="Only two-pole voltage indicators meet GS38 requirements for proving dead - they are specifically designed for this safety-critical function."
            />
          </div>

          {/* Section 4: Consequences of Skipping */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Consequences of Skipping Proving Dead
            </h2>
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 mb-4">
              <div className="text-white/80 space-y-4 leading-relaxed">
                <div>
                  <p className="font-medium text-white mb-2">Electric Shock or Electrocution:</p>
                  <ul className="ml-4 space-y-1 text-sm">
                    <li>• Direct contact with live conductors can cause immediate cardiac arrest</li>
                    <li>• Even non-fatal shocks can cause falls from height or into hazards</li>
                    <li>• Secondary injuries from muscular contraction or loss of control</li>
                    <li>• Long-term health effects including nerve damage and psychological trauma</li>
                    <li>• Risk increases in wet conditions or with damaged PPE</li>
                  </ul>
                </div>

                <div>
                  <p className="font-medium text-white mb-2">Arc Flash Burns:</p>
                  <ul className="ml-4 space-y-1 text-sm">
                    <li>• Temperatures can exceed 20,000°C - hotter than the sun's surface</li>
                    <li>• Severe burns to exposed skin and airways</li>
                    <li>• Blast pressure can cause hearing damage and throw personnel</li>
                    <li>• Molten metal splatter can penetrate clothing and embed in skin</li>
                    <li>• Toxic gases from burning insulation and metal vapourisation</li>
                  </ul>
                </div>

                <div>
                  <p className="font-medium text-white mb-2">Legal and Professional Consequences:</p>
                  <ul className="ml-4 space-y-1 text-sm">
                    <li>• HSE prosecution under EAWR - unlimited fines and imprisonment</li>
                    <li>• Corporate manslaughter charges for companies</li>
                    <li>• Loss of professional qualifications and certifications</li>
                    <li>• Civil liability for damages and compensation</li>
                    <li>• Increased insurance premiums and potential exclusions</li>
                    <li>• Prohibition notices stopping all electrical work</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck
              id="consequences"
              question="What is the most serious consequence of not proving dead?"
              options={["Paperwork issues", "Equipment damage", "Serious injury or death", "Delayed completion"]}
              correctIndex={2}
              explanation="The most serious consequence is serious injury or death from electric shock, burns, or arc flash incidents."
            />
          </div>

          {/* Safe Isolation Checklist */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Safe Isolation Checklist
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Before Starting:</p>
                <ul className="space-y-2 text-sm text-white/80">
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 border border-white/40 rounded" />
                    <span>Circuit identity confirmed and verified</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 border border-white/40 rounded" />
                    <span>Voltage tester checked on proving unit</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 border border-white/40 rounded" />
                    <span>Lock-off devices and warning notices ready</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 border border-white/40 rounded" />
                    <span>PPE inspected and appropriate for task</span>
                  </li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">During Isolation:</p>
                <ul className="space-y-2 text-sm text-white/80">
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 border border-white/40 rounded" />
                    <span>Supply isolated at appropriate point</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 border border-white/40 rounded" />
                    <span>Lock-off device fitted with personal padlock</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 border border-white/40 rounded" />
                    <span>Warning notices clearly displayed</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 border border-white/40 rounded" />
                    <span>All conductors tested dead at point of work</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 border border-white/40 rounded" />
                    <span>Voltage tester re-proved on proving unit</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Practical Guidance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Practical Guidance
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-white mb-2">Essential Practices:</p>
                  <ul className="space-y-1 text-sm text-white/80">
                    <li>• Always lock off isolators and keep the key in your possession</li>
                    <li>• Never trust labelling alone; circuits may be misidentified</li>
                    <li>• Test between all combinations: L–N, L–E, and N–E</li>
                    <li>• Always re-prove the tester before and after use</li>
                    <li>• Check for alternative supplies and backfeed routes</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-2">Emergency Procedures:</p>
                  <ul className="space-y-1 text-sm text-white/80">
                    <li>• If someone is in contact with live conductors, switch off supply immediately</li>
                    <li>• Do not touch the person until supply is confirmed dead</li>
                    <li>• Call emergency services and provide first aid if trained</li>
                    <li>• Report all electrical accidents to HSE and company management</li>
                  </ul>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-white mb-2">Common Mistakes to Avoid:</p>
                  <ul className="space-y-1 text-sm text-white/80">
                    <li>• Using unreliable test equipment (neon screwdrivers, voltage pens)</li>
                    <li>• Assuming circuits are dead without testing</li>
                    <li>• Working on circuits controlled by others</li>
                    <li>• Removing lock-off devices belonging to other workers</li>
                    <li>• Failing to check for induced voltages from adjacent circuits</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-2">Best Practice Tips:</p>
                  <ul className="space-y-1 text-sm text-white/80">
                    <li>• Develop and stick to a personal proving dead routine</li>
                    <li>• Keep proving units calibrated and in good condition</li>
                    <li>• Use high-quality GS38-compliant test equipment</li>
                    <li>• Consider using voltage-indicating devices as secondary protection</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Knowledge Check */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <Zap className="w-5 h-5 text-amber-500" />
              Quick Knowledge Check
            </h2>
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Challenge 1:</p>
                <p className="text-sm text-white/70">Why is proving dead important before electrical work?</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Challenge 2:</p>
                <p className="text-sm text-white/70">Name the correct type of tester to prove dead.</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Challenge 3:</p>
                <p className="text-sm text-white/70">What must you do after proving dead?</p>
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
              <p className="font-medium text-white mb-3">Case Study: Incorrect Circuit Identification</p>
              <p className="text-white/80 mb-4">
                An electrician working in an office assumed a labelled MCB controlled a lighting circuit. Without testing, they touched the live conductor and suffered an electric shock requiring hospital treatment.
              </p>
              <p className="text-white/80 mb-4">
                Investigation revealed the labelling was wrong due to a previous alteration where circuits had been reconfigured but labels not updated. The "lighting" MCB actually controlled socket outlets that remained energised.
              </p>
              <p className="text-white/80">
                <strong>Lesson:</strong> Had the electrician followed the prove-dead procedure and tested all conductors at the point of work, the accident would have been completely avoided. Never trust labelling alone.
              </p>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <details key={index} className="group">
                  <summary className="font-medium text-white cursor-pointer list-none flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <span>{faq.question}</span>
                    <span className="transition-transform group-open:rotate-180 text-white/40">▼</span>
                  </summary>
                  <div className="mt-2 p-3 text-sm text-white/70 bg-white/5 rounded-lg">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* Pocket Guide */}
          <section className="mb-10">
            <div className="p-5 rounded-lg bg-gradient-to-br from-elec-yellow/10 via-elec-yellow/5 to-transparent border border-elec-yellow/30">
              <h2 className="text-lg font-semibold text-white mb-4">Pocket Guide</h2>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
                <div className="p-3 rounded-lg border border-white/10">
                  <Shield className="w-6 h-6 text-elec-yellow mx-auto mb-2" />
                  <p className="text-xs font-medium text-white">Always lock off and label</p>
                </div>
                <div className="p-3 rounded-lg border border-white/10">
                  <Zap className="w-6 h-6 text-elec-yellow mx-auto mb-2" />
                  <p className="text-xs font-medium text-white">Use only two-pole testers</p>
                </div>
                <div className="p-3 rounded-lg border border-white/10">
                  <AlertTriangle className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                  <p className="text-xs font-medium text-white">Test L–N, L–E, N–E</p>
                </div>
                <div className="p-3 rounded-lg border border-white/10">
                  <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
                  <p className="text-xs font-medium text-white">Prove tester before and after</p>
                </div>
                <div className="p-3 rounded-lg border border-white/10">
                  <Shield className="w-6 h-6 text-elec-yellow mx-auto mb-2" />
                  <p className="text-xs font-medium text-white">Never assume dead</p>
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
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="font-medium text-white mb-2">Key Points:</p>
                <ul className="space-y-1 text-sm text-white/80">
                  <li>• Proving dead is a life-saving step before work</li>
                  <li>• Safe isolation involves lock-off, testing, and proving</li>
                  <li>• Only GS38-compliant testers should be used</li>
                  <li>• Failure to prove dead can result in injury, death, or prosecution</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-2">Remember:</p>
                <ul className="space-y-1 text-sm text-white/80">
                  <li>• Follow the six-step isolation procedure every time</li>
                  <li>• Test all conductor combinations at point of work</li>
                  <li>• Keep isolation keys in your possession throughout work</li>
                  <li>• Re-prove tester function before and after testing</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Quiz */}
          <section className="mb-10">
            <Quiz
              title="Test Your Knowledge: Proving Dead and Safe to Test"
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
              <Link to="../3-3">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Setting Up and Zeroing
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../3-5">
                Next: Proving Unit and Two-Pole Tester
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module6Section3_4;
