import { ArrowLeft, Eye, Target, CheckCircle, Shield, AlertTriangle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module6Section3_4 = () => {
  useSEO(
    "Proving Dead and Safe to Test - Level 2 Electrical Testing & Inspection",
    "Essential safe isolation procedures and proving dead techniques"
  );

  // Quiz questions
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
    <div className="min-h-screen bg-background">
      {/* Top header bar */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
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
            <div className="p-2 rounded-lg bg-card">
              <Shield className="w-6 h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
              Section 6.3.4
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Proving Dead and Safe to Test
          </h1>
          <p className="text-muted-foreground">
            Essential safe isolation procedures and proving dead techniques
          </p>
        </header>

        {/* Spot it in 30 Seconds Card */}
        <Card className="mb-8 p-6 bg-card border-border/20">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-foreground" />
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Spot it in 30 Seconds</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
              <p className="font-medium mb-3">In 30 seconds</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>Isolate → Lock off → Label → Prove tester → Test dead → Re-prove</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>GS38-compliant two-pole tester (no neon screwdrivers)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>Test all combinations: L–N, L–E, N–E at point of work</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>Keep isolation key in your possession throughout work</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-card border border-emerald-500/20">
              <p className="font-medium mb-3">Spot it / Use it / Check it</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span><strong>Spot:</strong> Live circuits, faulty testers, backfed supplies, incorrect labels</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span><strong>Use:</strong> Safe isolation procedure; proving unit before/after; lock-off devices</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span><strong>Check:</strong> Circuit identity; tester function; all conductors dead; secure isolation</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <p className="text-base text-foreground mb-4">
            Before any installation or maintenance work begins, electricians must ensure that circuits are dead and safe to work on. Failure to prove dead is one of the most common causes of electrical accidents.
          </p>
          <p className="text-base text-foreground">
            This subsection explains how to correctly isolate, prove dead, and verify safety before touching conductors or equipment, following the requirements of the Electricity at Work Regulations and industry best practices.
          </p>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning Outcomes</h2>
          <p className="text-base text-foreground mb-4">By the end of this subsection, you will be able to:</p>
          <ul className="list-disc pl-6 space-y-2 text-base text-foreground">
            <li>Explain the purpose of proving dead and its legal requirements.</li>
            <li>Follow the safe isolation procedure step by step.</li>
            <li>Use a GS38-compliant voltage tester and proving unit correctly.</li>
            <li>Avoid unsafe practices such as relying on neon screwdrivers.</li>
            <li>Apply correct verification procedures before starting electrical work.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Content / Learning</h2>

          {/* 1. Why Prove Dead? */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 dark:text-emerald-400 mb-3">Why Prove Dead?</p>
                    
                    <div className="space-y-4">
                       <div>
                         <p className="text-base text-foreground mb-2"><strong>Prevents Accidental Contact:</strong></p>
                         <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                           <li>Electric shock from live conductors can cause serious injury or death</li>
                           <li>Arc flash incidents can cause severe burns and blast injuries</li>
                           <li>Even low voltages can be lethal in certain conditions (wet hands, heart conditions)</li>
                           <li>Protects against induced voltages from adjacent circuits or equipment</li>
                           <li>Prevents damage to sensitive equipment during maintenance</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-foreground mb-2"><strong>Confirms Effective Isolation:</strong></p>
                         <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                           <li>Circuit labels may be incorrect due to modifications or poor maintenance</li>
                           <li>Circuits can be backfed through alternative supply routes</li>
                           <li>Isolators may be faulty or not fully disconnecting all poles</li>
                           <li>Multiple sources may supply the same equipment (normal/emergency supplies)</li>
                           <li>Induced voltages from parallel circuits can present hazards</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-foreground mb-2"><strong>Legal and Regulatory Compliance:</strong></p>
                         <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                           <li>Electricity at Work Regulations 1989 - Regulation 4 requires systems to be dead before work</li>
                           <li>Health and Safety at Work Act 1974 - duty of care to prevent foreseeable harm</li>
                           <li>BS 7671 requirements for safe working practices</li>
                           <li>Corporate manslaughter legislation applies to electrical safety failures</li>
                           <li>Professional liability and insurance requirements</li>
                         </ul>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="prove-dead-purpose"
            question="What is the primary purpose of proving dead?"
            options={["To comply with paperwork", "To prevent electrical accidents", "To save time", "To check circuit labels"]}
            correctIndex={1}
            explanation="The primary purpose is to prevent electrical accidents by confirming that circuits are actually dead before work begins."
          />
          <Separator className="my-6" />

          {/* 2. Safe Isolation Procedure */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 dark:text-emerald-400 mb-3">Safe Isolation Procedure (Step by Step)</p>
                    
                    <div className="space-y-4">
                       <div>
                         <p className="text-base text-foreground mb-2"><strong>Step 1: Identify the Correct Circuit</strong></p>
                         <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                           <li>Use circuit schedules, labels, and physical tracing to confirm circuit identity</li>
                           <li>Test switching operations to verify which circuits are controlled</li>
                           <li>Check for multiple supplies (emergency lighting, UPS systems)</li>
                           <li>Identify any interconnections or parallel feeds</li>
                           <li>Never rely solely on labelling - always verify by testing</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-foreground mb-2"><strong>Step 2: Switch Off the Supply at the Isolator</strong></p>
                         <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                           <li>Use the correct isolator - main switch, MCB, or dedicated isolator</li>
                           <li>Ensure all poles are disconnected (single-phase and three-phase)</li>
                           <li>Check the isolator is suitable for the load current</li>
                           <li>Verify switching operation - some isolators may stick or fail to fully open</li>
                           <li>Look for isolation indication on the isolator (visible contact gap where possible)</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-foreground mb-2"><strong>Step 3: Apply Lock-off Devices and Warning Notices</strong></p>
                         <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                           <li>Use appropriate lock-off device: miniature lock-offs for MCBs, hasps for larger isolators</li>
                           <li>Apply your personal padlock - only you should have the key</li>
                           <li>Attach clear warning notices: "DANGER - MEN WORKING" or similar</li>
                           <li>Include your name, contact details, and expected completion time</li>
                           <li>Ensure notices are visible from all approaches to the isolator</li>
                           <li>Consider additional barriers or guards if necessary</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-foreground mb-2"><strong>Step 4: Prove Your Tester on a Proving Unit</strong></p>
                         <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                           <li>Use a proving unit that provides a known voltage (typically 230V AC)</li>
                           <li>Check your two-pole voltage indicator reads the expected voltage</li>
                           <li>Verify the tester's audio and visual indicators work correctly</li>
                           <li>Check test leads are secure and undamaged</li>
                           <li>Ensure battery levels are adequate for reliable operation</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-foreground mb-2"><strong>Step 5: Test Between Live, Neutral, and Earth at Point of Work</strong></p>
                         <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                           <li>Test all combinations: L–N, L–E, N–E (and L1–L2, L2–L3, L3–L1 for three-phase)</li>
                           <li>Test at the exact point where work will be carried out</li>
                           <li>Hold test probes firmly against clean conductors or terminals</li>
                           <li>Allow sufficient time for readings to stabilise (2-3 seconds minimum)</li>
                           <li>All readings should indicate zero/dead - no voltage present</li>
                           <li>Be especially careful with control circuits and auxiliary supplies</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-foreground mb-2"><strong>Step 6: Re-prove Your Tester on the Proving Unit</strong></p>
                         <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                           <li>Immediately re-test the voltage indicator on the proving unit</li>
                           <li>Confirm it still reads the expected voltage correctly</li>
                           <li>This verifies the tester hasn't failed during the proving dead procedure</li>
                           <li>If the tester doesn't work on the proving unit, repeat the entire procedure</li>
                           <li>Only proceed with work once the complete procedure is successful</li>
                         </ul>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="isolation-steps"
            question="What is the correct sequence for safe isolation?"
            options={["Test, isolate, lock off", "Isolate, lock off, test", "Lock off, test, isolate", "Identify, isolate, lock off, prove tester, test, re-prove"]}
            correctIndex={3}
            explanation="The correct sequence ensures circuit identity is confirmed before isolation, and tester function is verified before and after testing."
          />
          <Separator className="my-6" />

          {/* 3. GS38-Compliant Tester Use */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-3">GS38-Compliant Tester Use</p>
                    
                    <div className="space-y-4">
                       <div>
                         <p className="text-base text-foreground mb-2"><strong>Two-pole Voltage Indicators Only:</strong></p>
                         <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                           <li>Uses two separate probes to measure voltage between conductors</li>
                           <li>Provides clear indication of voltage presence through LED and audible signals</li>
                           <li>Self-checking circuitry that identifies internal faults</li>
                           <li>Designed specifically for proving dead applications</li>
                           <li>Reliable operation even in harsh electrical environments</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-foreground mb-2"><strong>Prohibited Equipment:</strong></p>
                         <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                           <li><strong>Neon screwdrivers:</strong> Unreliable, can fail without indication, single-pole operation</li>
                           <li><strong>Voltage pens:</strong> Prone to false readings, affected by electromagnetic fields</li>
                           <li><strong>Single-pole testers:</strong> Rely on body capacitance, inconsistent operation</li>
                           <li><strong>Non-contact voltage detectors:</strong> Not suitable for proving dead applications</li>
                           <li><strong>Multimeters:</strong> Not designed for safety-critical proving dead function</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-foreground mb-2"><strong>CAT-rated and Fused Test Leads:</strong></p>
                         <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                           <li>CAT III or CAT IV rating appropriate for the installation voltage</li>
                           <li>In-line fuses to protect against short-circuit currents</li>
                           <li>Finger guards on probes to prevent accidental contact</li>
                           <li>Maximum 4mm exposed probe tip to reduce short-circuit risk</li>
                           <li>High-quality insulation rated for the working voltage</li>
                           <li>Regular inspection for damage, wear, or contamination</li>
                         </ul>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="gs38-compliance"
            question="Which tester is GS38-compliant for proving dead?"
            options={["Neon screwdriver", "Two-pole voltage indicator", "Voltage pen", "Digital multimeter"]}
            correctIndex={1}
            explanation="Only two-pole voltage indicators meet GS38 requirements for proving dead - they are specifically designed for this safety-critical function."
          />
          <Separator className="my-6" />

          {/* 4. Consequences of Skipping Proving Dead */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-red-600 bg-red-600/5">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 dark:text-emerald-400 mb-3">Consequences of Skipping Proving Dead</p>
                    
                    <div className="space-y-4">
                       <div>
                         <p className="text-base text-foreground mb-2"><strong>Electric Shock or Electrocution:</strong></p>
                         <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                           <li>Direct contact with live conductors can cause immediate cardiac arrest</li>
                           <li>Even non-fatal shocks can cause falls from height or into hazards</li>
                           <li>Secondary injuries from muscular contraction or loss of control</li>
                           <li>Long-term health effects including nerve damage and psychological trauma</li>
                           <li>Risk increases in wet conditions or with damaged PPE</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-foreground mb-2"><strong>Arc Flash Burns:</strong></p>
                         <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                           <li>Temperatures can exceed 20,000°C - hotter than the sun's surface</li>
                           <li>Severe burns to exposed skin and airways</li>
                           <li>Blast pressure can cause hearing damage and throw personnel</li>
                           <li>Molten metal splatter can penetrate clothing and embed in skin</li>
                           <li>Toxic gases from burning insulation and metal vapourisation</li>
                         </ul>
                       </div>

                       <div>
                         <p className="text-base text-foreground mb-2"><strong>Legal and Professional Consequences:</strong></p>
                         <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                           <li>HSE prosecution under EAWR - unlimited fines and imprisonment</li>
                           <li>Corporate manslaughter charges for companies</li>
                           <li>Loss of professional qualifications and certifications</li>
                           <li>Civil liability for damages and compensation</li>
                           <li>Increased insurance premiums and potential exclusions</li>
                           <li>Prohibition notices stopping all electrical work</li>
                         </ul>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="consequences"
            question="What is the most serious consequence of not proving dead?"
            options={["Paperwork issues", "Equipment damage", "Serious injury or death", "Delayed completion"]}
            correctIndex={2}
            explanation="The most serious consequence is serious injury or death from electric shock, burns, or arc flash incidents."
          />
          <Separator className="my-6" />
        </Card>

        {/* Safe Isolation Checklist */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Safe Isolation Checklist</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Before Starting:</h3>
              <div className="space-y-2 text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span>Circuit identity confirmed and verified</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span>Voltage tester checked on proving unit</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span>Lock-off devices and warning notices ready</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span>PPE inspected and appropriate for task</span>
                </label>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">During Isolation:</h3>
              <div className="space-y-2 text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span>Supply isolated at appropriate point</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span>Lock-off device fitted with personal padlock</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span>Warning notices clearly displayed</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span>All conductors tested dead at point of work</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span>Voltage tester re-proved on proving unit</span>
                </label>
              </div>
            </div>
          </div>
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Practical Guidance</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Essential Practices:</h3>
                <ul className="text-xs sm:text-sm text-foreground space-y-1">
                  <li>• Always lock off isolators and keep the key in your possession</li>
                  <li>• Never trust labelling alone; circuits may be misidentified</li>
                  <li>• Test between all combinations: L–N, L–E, and N–E</li>
                  <li>• Always re-prove the tester before and after use</li>
                  <li>• Check for alternative supplies and backfeed routes</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Emergency Procedures:</h3>
                <ul className="text-xs sm:text-sm text-foreground space-y-1">
                  <li>• If someone is in contact with live conductors, switch off supply immediately</li>
                  <li>• Do not touch the person until supply is confirmed dead</li>
                  <li>• Call emergency services and provide first aid if trained</li>
                  <li>• Report all electrical accidents to HSE and company management</li>
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Common Mistakes to Avoid:</h3>
                <ul className="text-xs sm:text-sm text-foreground space-y-1">
                  <li>• Using unreliable test equipment (neon screwdrivers, voltage pens)</li>
                  <li>• Assuming circuits are dead without testing</li>
                  <li>• Working on circuits controlled by others</li>
                  <li>• Removing lock-off devices belonging to other workers</li>
                  <li>• Failing to check for induced voltages from adjacent circuits</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Best Practice Tips:</h3>
                <ul className="text-xs sm:text-sm text-foreground space-y-1">
                  <li>• Develop and stick to a personal proving dead routine</li>
                  <li>• Keep proving units calibrated and in good condition</li>
                  <li>• Use high-quality GS38-compliant test equipment</li>
                  <li>• Consider using voltage-indicating devices as secondary protection</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Micro-challenges */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-6 h-6 text-amber-500" />
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Quick Knowledge Check</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
            <div className="p-4 rounded-lg bg-muted/50 border border-border/30">
              <p className="font-semibold text-foreground mb-2">Challenge 1:</p>
              <p className="text-sm text-muted-foreground">Why is proving dead important before electrical work?</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50 border border-border/30">
              <p className="font-semibold text-foreground mb-2">Challenge 2:</p>
              <p className="text-sm text-muted-foreground">Name the correct type of tester to prove dead.</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50 border border-border/30">
              <p className="font-semibold text-foreground mb-2">Challenge 3:</p>
              <p className="text-sm text-muted-foreground">What must you do after proving dead?</p>
            </div>
          </div>
        </Card>

        {/* Real-World Example */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-amber-500" />
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Real-World Example</h2>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <p className="text-foreground mb-4">
              <strong>Case Study: Incorrect Circuit Identification</strong>
            </p>
            <p className="text-foreground mb-4">
              An electrician working in an office assumed a labelled MCB controlled a lighting circuit. Without testing, they touched the live conductor and suffered an electric shock requiring hospital treatment.
            </p>
            <p className="text-foreground mb-4">
              Investigation revealed the labelling was wrong due to a previous alteration where circuits had been reconfigured but labels not updated. The "lighting" MCB actually controlled socket outlets that remained energised.
            </p>
            <p className="text-foreground">
              <strong>Lesson:</strong> Had the electrician followed the prove-dead procedure and tested all conductors at the point of work, the accident would have been completely avoided. Never trust labelling alone.
            </p>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="group">
                <summary className="font-medium text-foreground cursor-pointer list-none flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <span>{faq.question}</span>
                  <span className="transition-transform group-open:rotate-180">▼</span>
                </summary>
                <div className="mt-2 p-3 text-sm text-muted-foreground bg-muted/10 rounded-lg">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Pocket Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
            <div className="p-4 rounded-lg bg-card border border-red-500/20">
              <Shield className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
              <p className="font-semibold text-red-600 dark:text-emerald-400 text-sm">Always lock off and label</p>
            </div>
            <div className="p-4 rounded-lg bg-card border border-orange-500/20">
              <Eye className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
              <p className="font-semibold text-orange-600 dark:text-emerald-400 text-sm">Use only two-pole testers</p>
            </div>
            <div className="p-4 rounded-lg bg-card border border-amber-500/20">
              <Zap className="w-8 h-8 text-amber-500 mx-auto mb-2" />
              <p className="font-semibold text-amber-600 dark:text-amber-400 text-sm">Test L–N, L–E, N–E</p>
            </div>
            <div className="p-4 rounded-lg bg-card border border-green-500/20">
              <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="font-semibold text-green-600 dark:text-green-400 text-sm">Prove tester before and after use</p>
            </div>
            <div className="p-4 rounded-lg bg-card border border-emerald-500/20">
              <Target className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
              <p className="font-semibold text-emerald-400 dark:text-emerald-400 text-sm">Never assume circuits are dead</p>
            </div>
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Recap</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Key Points:</h3>
              <ul className="text-xs sm:text-sm text-foreground space-y-1">
                <li>• Proving dead is a life-saving step before work</li>
                <li>• Safe isolation involves lock-off, testing, and proving</li>
                <li>• Only GS38-compliant testers should be used</li>
                <li>• Failure to prove dead can result in injury, death, or prosecution</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Remember:</h3>
              <ul className="text-xs sm:text-sm text-foreground space-y-1">
                <li>• Follow the six-step isolation procedure every time</li>
                <li>• Test all conductor combinations at point of work</li>
                <li>• Keep isolation keys in your possession throughout work</li>
                <li>• Re-prove tester function before and after testing</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Quiz */}
        <Quiz 
          title="Test Your Knowledge: Proving Dead and Safe to Test"
          questions={quizQuestions}
        />

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Button variant="outline" className="flex-1 h-auto py-3 px-4" asChild>
            <Link to="module6-section3/3" className="flex items-center justify-center text-center">
              <ArrowLeft className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="flex-1">
                <span className="block text-xs text-muted-foreground">Previous</span>
                <span className="block font-medium">Setting Up and Zeroing Instruments</span>
              </span>
            </Link>
          </Button>
          <Button className="flex-1 h-auto py-3 px-4" asChild>
            <Link to="module6-section3/5" className="flex items-center justify-center text-center">
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

export default Module6Section3_4;