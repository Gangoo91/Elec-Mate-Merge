/**
 * Level 3 Module 1 Section 3.1 - Safe Isolation Procedures
 *
 * Covers: Tools, proving dead, test instruments, the safe isolation sequence
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

// ============================================
// SEO CONFIGURATION
// ============================================
const TITLE = "Safe Isolation Procedures - Level 3 Module 1 Section 3.1";
const DESCRIPTION = "Master safe isolation procedures including proving dead techniques, approved voltage indicators, and the critical sequence that protects electricians from electrical shock.";

// ============================================
// INLINE CHECK QUESTIONS (4 per page)
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "Why must you prove dead on all conductors, not just the line conductor?",
    options: [
      "It's only required for three-phase supplies",
      "Neutral and protective conductors can carry fault currents or be incorrectly connected",
      "To check the test instrument is working",
      "It's a legal requirement but serves no practical purpose"
    ],
    correctIndex: 1,
    explanation: "Neutral conductors can become live due to broken PEN conductors, incorrect wiring, or borrowed neutrals. The protective conductor could be live if incorrectly connected. Never assume any conductor is safe - prove ALL conductors dead."
  },
  {
    id: "check-2",
    question: "What is the purpose of a proving unit when used with a voltage indicator?",
    options: [
      "To calibrate the voltage indicator",
      "To prove the indicator works immediately before and after testing the circuit",
      "To boost the battery of the voltage indicator",
      "To provide a reference voltage for comparison"
    ],
    correctIndex: 1,
    explanation: "A proving unit generates a known voltage to confirm your voltage indicator is functioning correctly. You MUST prove your tester works BEFORE testing the circuit and AGAIN AFTER testing. This proves it was working throughout the test."
  },
  {
    id: "check-3",
    question: "An electrician isolates a circuit, tests it dead, but doesn't re-prove their tester afterwards. Why is this dangerous?",
    options: [
      "It's not dangerous, the circuit was already tested",
      "The tester may have failed during testing, giving a false 'dead' reading",
      "The proving unit might have been faulty",
      "BS 7671 doesn't require re-proving"
    ],
    correctIndex: 1,
    explanation: "If your voltage indicator fails during testing (battery dies, internal fault), it shows no voltage even on a live circuit. Re-proving on a known live source or proving unit confirms it was working correctly when you tested. Without this, you cannot be certain the circuit is dead."
  },
  {
    id: "check-4",
    question: "A circuit has multiple sources of supply (e.g., PV system and mains). What additional action is required?",
    options: [
      "Only isolate the main supply",
      "Identify and isolate ALL sources of supply before proving dead",
      "Test at the meter only",
      "Use a higher-rated voltage indicator"
    ],
    correctIndex: 1,
    explanation: "Modern installations often have multiple sources: solar PV, battery storage, generators, or UPS systems. Each source must be identified and isolated. Missing one source could result in electrocution even though the 'main' supply is off. Always check for back-fed supplies."
  }
];

// ============================================
// QUIZ QUESTIONS (12 questions)
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "What is the correct sequence for safe isolation?",
    options: [
      "Isolate, lock off, prove dead, prove tester",
      "Prove tester, isolate, lock off, prove dead, re-prove tester",
      "Lock off, isolate, prove dead, prove tester",
      "Prove dead, isolate, lock off, re-prove tester"
    ],
    correctAnswer: 1,
    explanation: "The safe isolation sequence is: 1) Prove your tester on a known live source or proving unit, 2) Identify and isolate the circuit, 3) Secure the isolation (lock off/tag), 4) Prove the circuit dead on ALL conductors, 5) Re-prove your tester to confirm it was working. This sequence ensures no false sense of security."
  },
  {
    id: 2,
    question: "According to GS38, what is the maximum exposed metal probe tip length for voltage indicators?",
    options: [
      "2mm",
      "4mm",
      "6mm",
      "10mm"
    ],
    correctAnswer: 1,
    explanation: "GS38 specifies a maximum 4mm exposed probe tip to prevent accidental contact with adjacent conductors or earthed metalwork. Longer tips increase the risk of short circuits and arc flash. Many approved voltage indicators have spring-loaded shrouded tips that meet this requirement."
  },
  {
    id: 3,
    question: "Why should you avoid using a multimeter as your primary means of proving dead?",
    options: [
      "Multimeters are too accurate",
      "Multimeters require batteries that might fail without warning",
      "Multimeters can give incorrect readings if on wrong range or with low batteries, and lack fail-safe indication",
      "Multimeters are not accurate enough"
    ],
    correctAnswer: 2,
    explanation: "Multimeters on the wrong range (e.g., resistance instead of voltage) or with low batteries can display no reading even when voltage is present. Approved voltage indicators (two-pole testers) are designed to fail safe and provide positive indication of both presence and absence of voltage."
  },
  {
    id: 4,
    question: "What does 'proving dead' actually prove?",
    options: [
      "That the circuit breaker is off",
      "That there is no voltage present at the point of work at that moment in time",
      "That the circuit is permanently safe",
      "That the isolation device is locked off"
    ],
    correctAnswer: 1,
    explanation: "Proving dead only confirms no voltage at the test point at that instant. It doesn't guarantee the circuit won't become live again (e.g., someone switches it back on, capacitor discharge, induced voltages). That's why secure isolation (locking off) is equally essential."
  },
  {
    id: 5,
    question: "A voltage indicator shows 0V on all conductors. What must you do next?",
    options: [
      "Begin work immediately",
      "Re-prove the tester on a known live source or proving unit",
      "Inform the client the work is complete",
      "Remove the lock-off device"
    ],
    correctAnswer: 1,
    explanation: "A 0V reading only means no voltage IF your tester is working. You must re-prove on a known live source or proving unit to confirm your tester is still functioning. Only then can you be confident the circuit is genuinely dead and safe to work on."
  },
  {
    id: 6,
    question: "Where should you test when proving dead on a lighting circuit?",
    options: [
      "At the consumer unit only",
      "At the light fitting only",
      "At the point of work, testing all conductors including any switched live",
      "At the light switch only"
    ],
    correctAnswer: 2,
    explanation: "Always prove dead at the point where you will be working. Lighting circuits can have multiple switches, two-way/intermediate wiring, and dimmer packs. Test all conductors present - line, switched live, neutral, and earth. A circuit may be partially live even when apparently isolated."
  },
  {
    id: 7,
    question: "What category of test leads does GS38 recommend for electrical testing?",
    options: [
      "CAT I",
      "CAT II",
      "CAT III or CAT IV depending on location",
      "Any category is acceptable"
    ],
    correctAnswer: 2,
    explanation: "GS38 recommends CAT III rated equipment for distribution level work and CAT IV for origin/meter level. Higher CAT ratings provide better protection against transient overvoltages. Using under-rated equipment risks instrument failure, arc flash, and injury."
  },
  {
    id: 8,
    question: "An electrician uses a 'volt stick' (non-contact voltage detector) to check a circuit is dead. Is this acceptable?",
    options: [
      "Yes, volt sticks are quick and convenient",
      "No, volt sticks are only suitable for initial indication, not proving dead",
      "Yes, if the volt stick has a CAT III rating",
      "No, volt sticks are illegal to use"
    ],
    correctAnswer: 1,
    explanation: "Non-contact voltage detectors (volt sticks) are useful for initial indication but can be affected by shielded cables, weak batteries, or adjacent conductors. They cannot be used to prove dead - only approved two-pole voltage indicators with proving should be used for safe isolation."
  },
  {
    id: 9,
    question: "What information should be on a warning label attached to an isolated circuit?",
    options: [
      "Date only",
      "Name of person, date, reason for isolation, and contact details",
      "Company name only",
      "Circuit number only"
    ],
    correctAnswer: 1,
    explanation: "Warning labels must identify who isolated the circuit, when, why, and how to contact them. This prevents others from unknowingly re-energising the circuit and provides traceability. The label should clearly state 'Do not switch on' or similar warning."
  },
  {
    id: 10,
    question: "Why might a circuit still be dangerous even after the main isolator is switched off?",
    options: [
      "The isolator might be faulty",
      "Stored energy in capacitors, alternative supplies (PV, UPS), induced voltages, or incorrect wiring",
      "The neutral might still be connected",
      "The earth rod is still live"
    ],
    correctAnswer: 1,
    explanation: "Hazards remain from: capacitor discharge (especially in motor circuits and power factor correction), back-feed from PV/generators/UPS, induced voltages from adjacent circuits, or incorrectly wired installations. Always prove dead at the work point, not just at the isolator."
  },
  {
    id: 11,
    question: "A proving unit typically generates what voltage?",
    options: [
      "12V DC",
      "50V AC",
      "230V or 400V AC at safe current",
      "500V DC"
    ],
    correctAnswer: 2,
    explanation: "Proving units generate a voltage similar to mains (230V or 400V) but at a current-limited, safe level (typically a few milliamps). This tests your voltage indicator under realistic conditions without the danger of mains current. Always check your proving unit's specifications."
  },
  {
    id: 12,
    question: "What is the minimum IP rating recommended for voltage indicators used on construction sites?",
    options: [
      "IP2X",
      "IP44",
      "IP54 or higher",
      "No IP rating required"
    ],
    correctAnswer: 2,
    explanation: "Construction sites expose equipment to dust and water splash. IP54 provides protection against dust ingress and water splashing from any direction. Using equipment with insufficient protection risks failure when you need it most. Check the environment matches your equipment rating."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "Can I use a proving unit from a different manufacturer than my voltage indicator?",
    answer: "Generally yes, but check both are compatible. Most proving units generate standard voltages (230V/400V) that any compliant voltage indicator should detect. However, some voltage indicators have specific proving units designed to work together. Always verify your combination works correctly before relying on it for safety."
  },
  {
    question: "How often should voltage indicators be calibrated or replaced?",
    answer: "GS38 recommends equipment is regularly inspected and maintained. Most manufacturers recommend formal calibration annually, though this depends on use frequency and environment. Daily visual checks for damage, and proving before every use, are essential. If dropped or damaged, stop using immediately."
  },
  {
    question: "What if I can't lock off the isolator?",
    answer: "You must find a way to secure the isolation. Options include using isolator lock-off devices, padlocks on distribution boards, withdrawing fuses and keeping them on your person, or posting a competent person to guard the isolator. Work should not proceed until isolation is secure - your life depends on it."
  },
  {
    question: "Is it safe to prove dead on the supply side of the isolator?",
    answer: "You can test on the supply side to verify your tester, but always prove dead on the LOAD side (downstream) and at your actual work point. Testing only the supply side doesn't confirm isolation of the circuit you're working on - there could be multiple sources or bypass wiring."
  },
  {
    question: "Why do we test between all conductors and not just line-to-earth?",
    answer: "Testing line-to-earth might show 0V if the earth path is broken. Testing line-to-neutral confirms supply voltage. Testing neutral-to-earth can reveal borrowed neutrals or TN-C-S issues. A comprehensive test between ALL combinations gives you the full picture and catches more faults."
  },
  {
    question: "Can I rely on an electrician's certificate saying a circuit is isolated?",
    answer: "Never. Always prove dead yourself before working. Certificates can be wrong, circumstances change, and someone else may have restored power. The safe isolation procedure is your personal responsibility every single time. Trust nothing - verify everything."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module1Section3_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">

      {/* ========================================
          STICKY HEADER
          ======================================== */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module1-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* ========================================
          MAIN ARTICLE CONTENT
          ======================================== */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* ----------------------------------------
            HEADER
            ---------------------------------------- */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 1 Section 3.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Safe Isolation Procedures
          </h1>
          <p className="text-white/80">
            The sequence that keeps you alive when working on electrical systems
          </p>
        </header>

        {/* ----------------------------------------
            QUICK SUMMARY BOXES
            ---------------------------------------- */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Sequence:</strong> Prove tester - Isolate - Lock off - Prove dead - Re-prove tester</li>
              <li><strong>Test all:</strong> Line, neutral, AND earth - never assume any conductor is safe</li>
              <li><strong>Use approved:</strong> Two-pole voltage indicators meeting GS38, not multimeters</li>
              <li><strong>Every time:</strong> No shortcuts, no assumptions, no exceptions</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> All isolation points, multiple supplies, lock-off provisions</li>
              <li><strong>Use:</strong> GS38-compliant voltage indicator with proving unit</li>
              <li><strong>Apply:</strong> Full sequence at every job - domestic, commercial, industrial</li>
            </ul>
          </div>
        </div>

        {/* ----------------------------------------
            LEARNING OUTCOMES
            ---------------------------------------- */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Execute the safe isolation sequence correctly every time",
              "Select and use GS38-compliant test equipment",
              "Understand WHY each step exists and what happens if you skip it",
              "Identify all conductors requiring testing",
              "Recognise multiple supply scenarios (PV, UPS, generators)",
              "Apply proving procedures using voltage indicators and proving units"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ----------------------------------------
            CONTENT SECTION 01
            ---------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Why Safe Isolation Matters
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Every year, electricians die or suffer life-changing injuries from electric shock. In almost every case, the cause is the same: they believed a circuit was dead when it wasn't. Safe isolation isn't paperwork or procedure for its own sake - it's the barrier between you and a potentially fatal mistake.
            </p>
            <p>
              The human body cannot detect the presence of electricity before contact. By the time you feel a shock, current is already flowing through you. At 230V, ventricular fibrillation can occur in milliseconds. Your heart stops. Without immediate defibrillation, you die. This is why we prove dead - not because regulations say so, but because your life depends on certainty.
            </p>

            <div className="my-6 p-4 rounded bg-red-500/10 border border-red-500/20">
              <p className="text-sm font-medium text-red-400 mb-2">Real Consequence:</p>
              <p className="text-sm text-white/90">
                An electrician tested a circuit "dead" using a multimeter that was set to resistance mode. The display showed "0" - which he mistook for 0 volts. When he cut the cable, the arc flash burned 40% of his body. He survived, but lost his career and spent two years in recovery. The correct equipment and procedure would have taken 30 seconds.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Safe isolation is not about following rules - it's about creating certainty where doubt could kill you.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 01 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ----------------------------------------
            CONTENT SECTION 02
            ---------------------------------------- */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            The Safe Isolation Sequence
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The sequence is fixed and must be followed in order. Each step exists because of incidents where skipping that step killed someone. Learn it, practise it, and never deviate from it.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded bg-white/5 border-l-2 border-elec-yellow">
                <p className="text-sm font-medium text-elec-yellow mb-1">Step 1: Prove Your Tester</p>
                <p className="text-sm text-white/90">
                  Before testing anything, confirm your voltage indicator works. Use a proving unit or known live source. If it doesn't show voltage here, it won't show voltage on a live circuit either - and you'd never know the circuit was live.
                </p>
              </div>

              <div className="p-4 rounded bg-white/5 border-l-2 border-elec-yellow">
                <p className="text-sm font-medium text-elec-yellow mb-1">Step 2: Identify and Isolate</p>
                <p className="text-sm text-white/90">
                  Identify the correct circuit. Check for ALL sources of supply - not just the obvious ones. Solar PV, battery storage, UPS systems, generators, and alternative feeds can all back-feed a circuit. Switch off or disconnect ALL supplies.
                </p>
              </div>

              <div className="p-4 rounded bg-white/5 border-l-2 border-elec-yellow">
                <p className="text-sm font-medium text-elec-yellow mb-1">Step 3: Secure the Isolation</p>
                <p className="text-sm text-white/90">
                  Lock off isolators with personal padlocks, withdraw fuses, or post a guard. Attach warning labels with your name, date, and contact details. This prevents anyone restoring power while you're working. Your lock, your life.
                </p>
              </div>

              <div className="p-4 rounded bg-white/5 border-l-2 border-elec-yellow">
                <p className="text-sm font-medium text-elec-yellow mb-1">Step 4: Prove Dead</p>
                <p className="text-sm text-white/90">
                  At the point of work, test between ALL conductors: L-N, L-E, N-E (single phase) or L1-L2, L2-L3, L3-L1, and each line to neutral and earth (three phase). A voltage on ANY combination means the circuit is NOT dead.
                </p>
              </div>

              <div className="p-4 rounded bg-white/5 border-l-2 border-elec-yellow">
                <p className="text-sm font-medium text-elec-yellow mb-1">Step 5: Re-Prove Your Tester</p>
                <p className="text-sm text-white/90">
                  Immediately after proving dead, re-test your voltage indicator on a known live source or proving unit. This confirms your tester was working throughout. If it fails now, you cannot trust your "dead" reading - go back to Step 1.
                </p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>The Golden Rule:</strong> Prove - Isolate - Secure - Prove Dead - Re-Prove. Five steps. Every time. No exceptions.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 02 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ----------------------------------------
            CONTENT SECTION 03
            ---------------------------------------- */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Test Equipment: GS38 Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              HSE Guidance Note GS38 sets out the requirements for electrical test equipment. These aren't arbitrary specifications - each requirement exists because inadequate equipment has caused deaths. Understanding GS38 helps you choose the right tools and use them correctly.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Voltage Indicator Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Clearly marked voltage and current ratings</li>
                  <li>Finger barriers or shrouded probes</li>
                  <li>Maximum 4mm exposed probe tip</li>
                  <li>Fused leads (typically 500mA)</li>
                  <li>CAT III or CAT IV rated for application</li>
                  <li>Robust construction for site use</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Why Not Use Multimeters?</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Wrong range selection shows 0V on live circuits</li>
                  <li>Low battery can give false readings</li>
                  <li>No fail-safe indication of presence/absence</li>
                  <li>Display can be misread under pressure</li>
                  <li>Designed for measurement, not safety verification</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded bg-white/5">
              <p className="text-sm font-medium text-white mb-2">Two-Pole Voltage Indicators (The Right Tool)</p>
              <p className="text-sm text-white/90">
                Purpose-designed voltage indicators use two probes and require actual contact with conductors. They typically have LED or LCD displays, audible indication, and are designed to fail safe - if they're not working properly, they show it. They can't be set to the "wrong range" because they only do one job: detect voltage.
              </p>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Trade Example:</strong> A domestic rewire. You isolate at the consumer unit, but the old installation has multiple supplies - an immersion heater on a separate circuit from an older board. Your voltage indicator, properly used at each point of work, reveals 230V on what you thought was a dead cable. The circuit had a separate supply you hadn't identified. The five-minute proving procedure just saved your life.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 03 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ----------------------------------------
            CONTENT SECTION 04
            ---------------------------------------- */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Multiple Supplies and Hidden Dangers
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Modern installations increasingly have multiple sources of supply. What looks like a simple domestic installation might have solar PV, battery storage, or an EV charger with vehicle-to-grid capability. Commercial and industrial sites often have backup generators, UPS systems, or dual supplies. Every source must be identified and isolated.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white mb-1">Solar PV</p>
                <p className="text-white/90 text-xs">DC present in daylight even with AC isolated</p>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white mb-1">Battery Storage</p>
                <p className="text-white/90 text-xs">Can back-feed AC supply</p>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white mb-1">Generators</p>
                <p className="text-white/90 text-xs">May auto-start on mains failure</p>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white mb-1">UPS Systems</p>
                <p className="text-white/90 text-xs">Output remains live after mains isolation</p>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white mb-1">Dual Supplies</p>
                <p className="text-white/90 text-xs">Automatic changeover switches</p>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white mb-1">Capacitors</p>
                <p className="text-white/90 text-xs">Store charge after isolation</p>
              </div>
            </div>

            <div className="my-6 p-4 rounded bg-red-500/10 border border-red-500/20">
              <p className="text-sm font-medium text-red-400 mb-2">Hidden Danger - Borrowed Neutrals:</p>
              <p className="text-sm text-white/90">
                In older or incorrectly wired installations, circuits may share neutrals (borrowed neutrals). Isolating one circuit doesn't isolate the neutral if another circuit is feeding it. The neutral conductor can carry full load current and become a shock hazard. Always test the neutral conductor.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best Practice:</strong> Before any work, ask: "What sources of supply exist here?" Check with the client, examine the installation, look for PV panels, battery units, generator connections. Never assume a single point of isolation makes everything safe.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 04 */}
        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* ----------------------------------------
            PRACTICAL GUIDANCE
            ---------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Domestic Safe Isolation</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Identify circuit at consumer unit - label should match, but verify</li>
                <li>Check for separate supplies (immersion, shower, outbuildings)</li>
                <li>Lock off MCB/RCBO or withdraw fuse</li>
                <li>Prove dead at the accessory you're working on, not just at the board</li>
                <li>Test all terminals - switched lives on lighting circuits catch people out</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Commercial/Industrial Safe Isolation</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Request isolation from permit-to-work system if applicable</li>
                <li>Multiple isolators may control one circuit - identify all</li>
                <li>Check for UPS, emergency lighting, generator backup</li>
                <li>Motor circuits: allow capacitor discharge time before proving dead</li>
                <li>Use personal lock-out devices - never rely on another person's lock</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Fatal Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Testing at the wrong point</strong> - Always at point of work, not just at the board</li>
                <li><strong>Skipping re-proving</strong> - Tester could have failed during test</li>
                <li><strong>Trusting labels</strong> - Circuit charts are often wrong or outdated</li>
                <li><strong>Using volt sticks alone</strong> - Only for initial indication, never for proving dead</li>
                <li><strong>Rushing</strong> - The sequence takes 2-3 minutes. Your life is worth more.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ----------------------------------------
            FAQs
            ---------------------------------------- */}
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

        {/* ----------------------------------------
            QUICK REFERENCE
            ---------------------------------------- */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference - Safe Isolation</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">The Sequence</p>
                <ul className="space-y-0.5">
                  <li>1. Prove tester on known source</li>
                  <li>2. Identify and isolate all supplies</li>
                  <li>3. Secure isolation (lock/tag)</li>
                  <li>4. Prove dead at point of work</li>
                  <li>5. Re-prove tester immediately</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">GS38 Key Points</p>
                <ul className="space-y-0.5">
                  <li>Max 4mm exposed probe tip</li>
                  <li>Fused leads (500mA typical)</li>
                  <li>CAT III/IV rated for application</li>
                  <li>Two-pole indicators, not multimeters</li>
                  <li>Use with proving unit</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ----------------------------------------
            QUIZ
            ---------------------------------------- */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* ----------------------------------------
            NAVIGATION
            ---------------------------------------- */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module1-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module1-section3-2">
              Next: Lock-Off and Tagging
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module1Section3_1;
