/**
 * Level 3 Module 5 Section 4.1 - Safe Energisation of Circuits
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Safe Energisation of Circuits - Level 3 Module 5 Section 4.1";
const DESCRIPTION = "Master safe procedures for energising electrical circuits during commissioning, including pre-energisation checks, phased energisation and monitoring for initial power-up.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What must be completed BEFORE energising any circuit for the first time?",
    options: [
      "Only a visual inspection",
      "All dead tests including continuity, insulation resistance and polarity",
      "Only the RCD test",
      "Just check the cable connections"
    ],
    correctIndex: 1,
    explanation: "BS 7671 Regulation 643 requires all dead tests (continuity, insulation resistance, polarity) to be completed and passed before energisation. This ensures the circuit is safe to energise and prevents damage or danger."
  },
  {
    id: "check-2",
    question: "When first energising a distribution board, what is the recommended approach?",
    options: [
      "Turn everything on at once to save time",
      "Energise with all MCBs off, then bring circuits on one at a time",
      "Start with the largest load first",
      "It doesn't matter - just turn the main switch on"
    ],
    correctIndex: 1,
    explanation: "Phased energisation (main on with all MCBs off, then one circuit at a time) allows you to identify any problems on individual circuits without affecting the whole installation. This systematic approach helps isolate faults quickly."
  },
  {
    id: "check-3",
    question: "What should you check immediately after energising a circuit?",
    options: [
      "Check the electricity meter is recording",
      "Verify correct voltage and phase rotation, check for abnormal sounds or smells",
      "Start the largest motor immediately",
      "Leave the site immediately"
    ],
    correctIndex: 1,
    explanation: "After energisation, immediately verify voltage and phase rotation (for three-phase), listen for unusual sounds, and check for any burning smells or visible signs of distress. This early warning can prevent serious damage or fire."
  },
  {
    id: "check-4",
    question: "What is the purpose of monitoring current draw during initial energisation?",
    options: [
      "To calculate the electricity bill",
      "To verify the circuit is not overloaded and loads are operating normally",
      "To impress the client",
      "It's only needed for commercial installations"
    ],
    correctIndex: 1,
    explanation: "Monitoring current draw verifies that loads are operating correctly and within expected parameters. Excessive current could indicate a fault, short circuit, or overloaded circuit that needs investigation before continuing."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which dead test must show satisfactory results before energisation can proceed?",
    options: [
      "Only insulation resistance",
      "Only continuity",
      "All dead tests: continuity, insulation resistance, and polarity",
      "Only polarity"
    ],
    correctAnswer: 2,
    explanation: "All dead tests must pass before energisation. Continuity confirms protective conductors are connected, insulation resistance confirms no shorts or breakdowns, and polarity confirms correct connections. Missing any could result in danger."
  },
  {
    id: 2,
    question: "What minimum insulation resistance reading must be achieved before a 230V circuit can be energised?",
    options: [
      "0.5 megohms",
      "1.0 megohms",
      "2.0 megohms",
      "10 megohms"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 Table 6.1 requires a minimum of 1.0 megohms for circuits up to 500V. Below this value, the insulation is considered inadequate and the circuit must not be energised until the cause is identified and rectified."
  },
  {
    id: 3,
    question: "Before energising, who should be notified?",
    options: [
      "Only the DNO",
      "Only the client",
      "All persons in the area who could be affected, plus the client/duty holder",
      "No notification is required"
    ],
    correctAnswer: 2,
    explanation: "Anyone in the area who could be affected by the energisation must be warned. This includes other trades, building occupants, and the client or duty holder. This is a safety requirement and professional courtesy."
  },
  {
    id: 4,
    question: "During phased energisation of a three-phase distribution board, what should be checked first?",
    options: [
      "The largest motor",
      "Voltage presence on all phases and phase rotation",
      "Socket outlets only",
      "Lighting circuits only"
    ],
    correctAnswer: 1,
    explanation: "Before connecting loads, verify that all three phases are present and at correct voltage (400V line-to-line, 230V line-to-neutral). Check phase rotation for motor circuits. Incorrect phase sequence will cause motors to run backwards."
  },
  {
    id: 5,
    question: "What action should be taken if a burning smell is detected during energisation?",
    options: [
      "Wait to see if it goes away",
      "Immediately de-energise, investigate and rectify before re-energising",
      "Open windows for ventilation",
      "Carry on - new installations often smell"
    ],
    correctAnswer: 1,
    explanation: "A burning smell indicates overheating, which could lead to fire or insulation breakdown. Immediately de-energise the circuit, identify the source (loose connection, overloaded cable, fault), and rectify before attempting to re-energise."
  },
  {
    id: 6,
    question: "Why should large motors not be started immediately after energisation?",
    options: [
      "They use too much electricity",
      "They may cause voltage dips affecting other equipment and should be started last",
      "Motors don't need to be tested",
      "There is no reason - start them immediately"
    ],
    correctAnswer: 1,
    explanation: "Large motors draw high starting currents (6-8 times running current) that can cause voltage dips. Start smaller loads first to verify the installation, then start motors individually while monitoring voltage and current."
  },
  {
    id: 7,
    question: "What live tests are typically performed immediately after energisation?",
    options: [
      "Continuity and insulation resistance",
      "Earth fault loop impedance, prospective fault current, RCD operation",
      "Only voltage measurement",
      "No tests are performed after energisation"
    ],
    correctAnswer: 1,
    explanation: "Live tests including Ze and Zs (earth fault loop impedance), prospective fault current (Ipf), and RCD operation can only be performed with the supply connected. These complete the verification process after initial energisation."
  },
  {
    id: 8,
    question: "What should be done with test equipment before performing live tests?",
    options: [
      "Nothing - just use it",
      "Check calibration is current and prove it works before and after testing",
      "Only check the battery",
      "Only check the leads"
    ],
    correctAnswer: 1,
    explanation: "Test equipment must have current calibration and be proved before and after use (especially voltage indicators using a proving unit). This ensures accurate readings and confirms the instrument is functioning correctly."
  },
  {
    id: 9,
    question: "During energisation, an RCD trips immediately. What should be the first action?",
    options: [
      "Replace the RCD",
      "De-energise, check for earth leakage or fault, then systematically investigate",
      "Bypass the RCD",
      "Ignore it and move on"
    ],
    correctAnswer: 1,
    explanation: "An RCD tripping indicates an earth fault or excessive earth leakage. De-energise and systematically disconnect circuits to identify the faulty circuit. Check for moisture, incorrect wiring, or damaged insulation."
  },
  {
    id: 10,
    question: "What documentation should be available before energising?",
    options: [
      "Nothing is required",
      "Design specifications, circuit schedules, and completed dead test results",
      "Only the electricity bill",
      "Only the client's phone number"
    ],
    correctAnswer: 1,
    explanation: "Design specifications confirm what to expect, circuit schedules help systematic energisation, and completed dead test results prove the installation is safe to energise. This documentation is essential for safe commissioning."
  },
  {
    id: 11,
    question: "For a TT system, what additional consideration applies during energisation?",
    options: [
      "None - same as TN systems",
      "Verify the earth electrode is connected and RCDs are functioning correctly",
      "Only test socket outlets",
      "Higher voltage is expected"
    ],
    correctAnswer: 1,
    explanation: "TT systems rely entirely on RCDs for earth fault protection since the earth path through the electrode has high impedance. Verify the electrode is connected and RCDs operate correctly. Check RA x Ia is less than 50V."
  },
  {
    id: 12,
    question: "What is the recommended sequence for energising a new installation?",
    options: [
      "All circuits at once",
      "Essential services, then distribution, then final circuits systematically",
      "Largest loads first",
      "Random order"
    ],
    correctAnswer: 1,
    explanation: "Start with essential/critical services that may be needed if problems occur. Energise main distribution, then sub-distribution, then final circuits one at a time. This systematic approach allows problems to be identified and isolated quickly."
  }
];

const faqs = [
  {
    question: "What if dead test results are borderline - can I still energise?",
    answer: "Borderline results (e.g., insulation resistance just above 1 megohm) should be investigated. While technically compliant, they may indicate developing problems. Identify the cause before energising. If in doubt, do not energise until satisfactory readings are obtained."
  },
  {
    question: "Can I energise part of an installation while other parts are still being worked on?",
    answer: "Yes, but only if the live parts are completely separated from the work area, with secure isolation and warning notices. The work area must remain dead and locked off. This requires careful planning and communication with all workers."
  },
  {
    question: "What should I do if there's no DNO supply yet?",
    answer: "If waiting for DNO connection, you cannot perform live tests. Complete all dead tests and document them. When supply becomes available, perform live tests and complete the commissioning. Note any limitations on the certificate."
  },
  {
    question: "How do I handle energising circuits with sensitive electronic equipment?",
    answer: "Energise the circuit with electronic equipment disconnected first. Verify voltage and absence of transients. Then connect equipment. Some sensitive equipment may require soft-start procedures or specific commissioning sequences per manufacturer instructions."
  },
  {
    question: "What PPE is required during energisation?",
    answer: "Minimum requirements include safety footwear, eye protection (arc flash risk), and appropriate clothing. For higher risk energisation (large installations, high fault levels), consider arc-rated clothing, face shields, and insulated gloves. Follow your risk assessment."
  },
  {
    question: "Should I inform the DNO before energising a new installation?",
    answer: "The DNO should already be aware if they've provided a new supply. For existing supplies with increased load, you may need to confirm the connection agreement. Always ensure the installation is suitable for the supply characteristics declared by the DNO."
  }
];

const Level3Module5Section4_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">

      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module5-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Article Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 5.4.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Safe Energisation of Circuits
          </h1>
          <p className="text-white/80">
            Systematic procedures for safely bringing electrical installations to life
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Before:</strong> All dead tests must pass</li>
              <li><strong>Notify:</strong> All persons who could be affected</li>
              <li><strong>Method:</strong> Phased energisation, one circuit at a time</li>
              <li><strong>Monitor:</strong> Voltage, current, sounds, smells</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Completed test sheets, clear work area</li>
              <li><strong>Use:</strong> Systematic circuit-by-circuit approach</li>
              <li><strong>Apply:</strong> Immediate de-energisation if problems detected</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand pre-energisation requirements and checks",
              "Apply phased energisation procedures systematically",
              "Monitor circuits during initial power-up",
              "Respond appropriately to problems during energisation",
              "Complete live testing after successful energisation",
              "Document the energisation process correctly"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Pre-Energisation Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Pre-Energisation Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Before any circuit is energised for the first time, a comprehensive series of checks and tests must be completed. These verify that the installation is safe to energise and will function correctly. Energising without completing these checks risks electric shock, fire, and equipment damage.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Dead tests that must pass before energisation:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Continuity of protective conductors:</strong> All CPCs and bonding connected</li>
                <li><strong>Continuity of ring final circuits:</strong> Ring integrity verified</li>
                <li><strong>Insulation resistance:</strong> Minimum 1 megohm for 230V circuits</li>
                <li><strong>Polarity:</strong> All single-pole devices in line conductor</li>
                <li><strong>Earth electrode resistance:</strong> For TT systems</li>
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Visual Check</p>
                <p className="text-white/90 text-xs">All covers on, no loose cables, work complete</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Documentation</p>
                <p className="text-white/90 text-xs">Test results recorded, design available</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Communication</p>
                <p className="text-white/90 text-xs">All persons notified, area clear</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Never energise if any dead test has failed or given unexpected results. Investigate and rectify first. 'Just seeing if it works' is never acceptable.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Phased Energisation Procedure */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Phased Energisation Procedure
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Phased energisation means bringing the installation live systematically, one section at a time. This allows problems to be identified and isolated quickly without affecting the entire installation. It is the professional approach to commissioning.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Recommended Sequence</p>
                <ul className="text-sm text-white space-y-1">
                  <li>1. Ensure all MCBs/RCBOs are OFF</li>
                  <li>2. Turn main switch ON</li>
                  <li>3. Check voltage at busbars</li>
                  <li>4. Energise essential/critical circuits first</li>
                  <li>5. Then general circuits one at a time</li>
                  <li>6. Large motors last</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">At Each Stage Check</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Correct voltage present</li>
                  <li>No tripping of protective devices</li>
                  <li>No unusual sounds (buzzing, arcing)</li>
                  <li>No burning smells</li>
                  <li>Equipment operates correctly</li>
                  <li>Current draw is as expected</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Three-phase considerations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Verify all three phases are present (check L1-L2, L2-L3, L1-L3)</li>
                <li>Expected voltages: 400V phase-to-phase, 230V phase-to-neutral</li>
                <li>Check phase rotation before connecting motors (clockwise = ABC)</li>
                <li>Incorrect rotation will cause motors to run backwards</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A distribution board with 12 circuits should take approximately 30 minutes to energise properly - 2-3 minutes per circuit to verify operation, plus time for main energisation and live tests.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Monitoring During Energisation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Monitoring During Energisation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Active monitoring during energisation can identify problems before they become dangerous. Use all your senses - sight, smell, sound, and (carefully) touch - to detect issues. Have test equipment ready to measure voltage and current.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">What to monitor:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Voltage:</strong> Check at busbars and at point of use - should be 230V +10%/-6%</li>
                <li><strong>Current:</strong> Use clamp meter to verify loads are within expected range</li>
                <li><strong>Temperature:</strong> Feel for warm connections (after a few minutes)</li>
                <li><strong>Sound:</strong> Listen for buzzing, humming, or arcing sounds</li>
                <li><strong>Smell:</strong> Any burning smell requires immediate investigation</li>
                <li><strong>Visual:</strong> Look for sparks, smoke, or distressed components</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-green-400/80 mb-2">Normal Observations</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Stable voltage readings</li>
                  <li>Current within circuit rating</li>
                  <li>Equipment operates smoothly</li>
                  <li>MCBs remain closed</li>
                  <li>No unusual sounds or smells</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-2">Warning Signs - De-energise!</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Burning smell - overheating</li>
                  <li>Buzzing from connections - loose</li>
                  <li>MCB/RCD trips immediately</li>
                  <li>Flickering or unstable voltage</li>
                  <li>Smoke or visible damage</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Safety:</strong> Never ignore warning signs. Immediate de-energisation and investigation prevents small problems becoming major incidents. Document what you observed.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Live Testing After Energisation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Live Testing After Energisation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Once initial energisation is successful and stable, live tests must be performed to complete the verification. These tests can only be done with the supply connected and confirm the installation will provide adequate protection in service.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Live tests required:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Prospective fault current (Ipf):</strong> At origin and distribution boards</li>
                <li><strong>Earth fault loop impedance (Ze):</strong> External loop impedance at origin</li>
                <li><strong>Earth fault loop impedance (Zs):</strong> At circuit extremities</li>
                <li><strong>RCD operation:</strong> Trip times at 1x and optionally 5x rated current</li>
                <li><strong>Polarity confirmation:</strong> Live verification at socket outlets</li>
                <li><strong>Phase rotation:</strong> For three-phase motor circuits</li>
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">RCD Test</p>
                <p className="text-white/90 text-xs">30mA in 300ms max at 1x, 40ms at 5x</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Loop Test</p>
                <p className="text-white/90 text-xs">Zs must not exceed Table 41 values</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Ipf Test</p>
                <p className="text-white/90 text-xs">Must not exceed device Icn</p>
              </div>
            </div>

            <p>
              Record all live test results on the schedule of test results. These complete the verification process and prove the installation provides the required level of protection. Any failures must be investigated and rectified.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Use no-trip loop testers on RCD-protected circuits to prevent nuisance tripping. Standard loop testers may trip 30mA RCDs, requiring multiple resets and potentially affecting connected equipment.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Before You Start</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Confirm all dead tests are complete and satisfactory</li>
                <li>Brief all persons in the area - they need to know power is coming on</li>
                <li>Have fire extinguisher accessible (CO2 for electrical fires)</li>
                <li>Ensure test equipment is calibrated and proven</li>
                <li>Know where the emergency stop/isolation is located</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">During Energisation</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Work systematically - don't rush</li>
                <li>Allow time between circuits for observation</li>
                <li>Document any issues as you go</li>
                <li>Keep escape routes clear</li>
                <li>Don't stand directly in front of equipment during switch-on</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Rushing:</strong> Taking shortcuts leads to missed problems</li>
                <li><strong>All at once:</strong> Makes fault finding difficult</li>
                <li><strong>Ignoring warnings:</strong> Small signs precede big failures</li>
                <li><strong>No documentation:</strong> Unable to prove safe commissioning</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Pre-Energisation Checklist</p>
                <ul className="space-y-0.5">
                  <li>All dead tests passed and recorded</li>
                  <li>Visual inspection complete</li>
                  <li>All covers fitted</li>
                  <li>Area clear, persons notified</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Voltage Tolerances</p>
                <ul className="space-y-0.5">
                  <li>230V nominal: 216V to 253V</li>
                  <li>400V nominal: 376V to 440V</li>
                  <li>Check all phases present</li>
                  <li>Verify phase rotation (ABC)</li>
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

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module5-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 4
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module5-section4-4-2">
              Next: Functional Testing
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module5Section4_1;
