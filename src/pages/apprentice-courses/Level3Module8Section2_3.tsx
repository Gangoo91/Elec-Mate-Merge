/**
 * Level 3 Module 8 Section 2.3 - Safe Isolation Practice
 *
 * Design pattern: Level3ContentTemplate.tsx
 * Dark theme with elec-yellow accent
 * Step-by-step safe isolation procedures for practical exam scenarios
 */

import { ArrowLeft, Zap, CheckCircle, ShieldAlert, Lock, AlertTriangle, Power, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

// ============================================
// SEO CONFIGURATION
// ============================================
const TITLE = "Safe Isolation Practice - Level 3 Module 8 Section 2.3";
const DESCRIPTION = "Step-by-step safe isolation procedures for practical exam scenarios. Master the essential safety procedure that underpins all electrical work.";

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "Why must you prove the proving device works BEFORE and AFTER testing for dead?",
    options: [
      "It is not necessary - once is enough",
      "To confirm the device was working correctly throughout the proving dead process",
      "Only to satisfy the assessor",
      "Because the regulations require three tests"
    ],
    correctIndex: 1,
    explanation: "Proving the device before confirms it works. Proving after confirms it did not fail during testing. If you only prove before, you cannot know if the device failed while testing - a failed device would show 'dead' even on a live circuit."
  },
  {
    id: "check-2",
    question: "What is the purpose of the lock-off device in safe isolation?",
    options: [
      "To make the installation look professional",
      "To prevent accidental or unauthorised re-energisation while work is in progress",
      "It is optional if you work quickly",
      "Only required for three-phase supplies"
    ],
    correctIndex: 1,
    explanation: "Lock-off prevents anyone from re-energising the circuit while you work on it. Without lock-off, someone unaware of your work could switch on and create an electrocution hazard. It is mandatory, not optional."
  },
  {
    id: "check-3",
    question: "Where should you test to confirm a circuit is dead?",
    options: [
      "Only at the consumer unit",
      "At the point of work where you will actually be working",
      "Anywhere convenient on the circuit",
      "Testing is optional if you trust the lock-off"
    ],
    correctIndex: 1,
    explanation: "Test at the point of work - this is where you need confirmation of dead. A fault between the consumer unit and point of work could mean the circuit is live at your work location even though it appears dead at the origin."
  },
  {
    id: "check-4",
    question: "What type of voltage indicator is acceptable for safe isolation?",
    options: [
      "Any multimeter",
      "A two-pole voltage indicator complying with GS38 requirements",
      "A neon screwdriver",
      "An LED indicator built into an accessory"
    ],
    correctIndex: 1,
    explanation: "GS38-compliant two-pole voltage indicators are required. They test between conductors (not conductor to earth via your body). Neon screwdrivers and simple testers can give false readings and are not acceptable for safe isolation."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "What does 'GS38' refer to in the context of safe isolation?",
    options: [
      "A specific brand of voltage indicator",
      "HSE guidance on electrical test equipment safety",
      "A BS 7671 regulation number",
      "A type of lock-off device"
    ],
    correctAnswer: 1,
    explanation: "GS38 is HSE Guidance Note 38: 'Electrical test equipment for use on low voltage electrical systems'. It specifies safety requirements for test equipment including voltage indicators used in safe isolation."
  },
  {
    id: 2,
    question: "In what order should the safe isolation procedure be performed?",
    options: [
      "Test dead, then isolate, then lock off",
      "Identify, isolate, secure, prove device, test dead, prove device again",
      "Lock off first, then identify the circuit",
      "The order doesn't matter as long as all steps are done"
    ],
    correctAnswer: 1,
    explanation: "The correct sequence is: Identify the circuit, isolate at the correct point, secure against re-energisation (lock-off), prove the proving device, test for dead at point of work, prove the proving device again."
  },
  {
    id: 3,
    question: "What should you do if your voltage indicator shows no voltage but you have not proved the device?",
    options: [
      "Proceed with work - no voltage means safe",
      "Do not trust the reading - prove the device first then retest",
      "Use a different type of tester",
      "Ask someone else to check"
    ],
    correctAnswer: 1,
    explanation: "Never trust an unproven device. The indicator could be faulty and showing 'dead' incorrectly. Prove the device works on a known live source, then retest your circuit, then prove again."
  },
  {
    id: 4,
    question: "When is it acceptable to work on a live electrical system?",
    options: [
      "When you are experienced and confident",
      "When the voltage is below 50V AC",
      "Only when it is unreasonable to work dead and suitable precautions are taken",
      "Never under any circumstances"
    ],
    correctAnswer: 2,
    explanation: "The Electricity at Work Regulations require working dead wherever reasonably practicable. Live working is only permitted when it's unreasonable to work dead AND suitable precautions are taken. This is rare and requires specific risk assessment."
  },
  {
    id: 5,
    question: "What is a 'proving unit' used for?",
    options: [
      "Testing the continuity of cables",
      "Providing a known voltage source to verify voltage indicator functionality",
      "Measuring earth fault loop impedance",
      "Proving the installation is compliant"
    ],
    correctAnswer: 1,
    explanation: "A proving unit generates a known voltage to test that your voltage indicator is working correctly. It allows you to prove the device without needing access to a separate known live source."
  },
  {
    id: 6,
    question: "Who is responsible for maintaining safe isolation during the work?",
    options: [
      "The building owner",
      "The person who performed the isolation",
      "Anyone working nearby",
      "The health and safety officer"
    ],
    correctAnswer: 1,
    explanation: "The person who performs the isolation is responsible for maintaining it. They control the lock-off key and must ensure isolation is maintained until work is complete and it is safe to re-energise."
  },
  {
    id: 7,
    question: "What should a warning notice at the isolation point include?",
    options: [
      "Just the word 'DANGER'",
      "Name of person, reason for isolation, date/time, and contact information",
      "Only the circuit number",
      "Warning notices are not required"
    ],
    correctAnswer: 1,
    explanation: "Warning notices should clearly identify who isolated the circuit, why, when, and how to contact them. This prevents confusion and ensures only the responsible person removes isolation."
  },
  {
    id: 8,
    question: "If you discover a circuit has multiple sources of supply, what must you do?",
    options: [
      "Isolate only the main source",
      "Isolate and secure ALL sources of supply before testing dead",
      "Work more carefully on the live section",
      "Multiple supplies are rare and unlikely to occur"
    ],
    correctAnswer: 1,
    explanation: "All sources must be isolated, secured, and the circuit proven dead from all sources. Examples include backup generators, solar PV systems, UPS systems, and cross-feeds from adjacent properties."
  },
  {
    id: 9,
    question: "What voltage is typically used by a proving unit?",
    options: [
      "230V AC",
      "Usually 50V DC or similar low voltage that the indicator will detect",
      "400V AC",
      "Proving units don't produce voltage"
    ],
    correctAnswer: 1,
    explanation: "Proving units typically produce a low voltage (often 50V DC or similar) sufficient for the voltage indicator to detect. This confirms the indicator is functioning without creating additional hazard."
  },
  {
    id: 10,
    question: "What is the consequence of safe isolation failure in a practical assessment?",
    options: [
      "A few marks deducted",
      "Typically automatic failure of the entire assessment",
      "A verbal warning only",
      "Re-attempt allowed immediately"
    ],
    correctAnswer: 1,
    explanation: "Safe isolation failure typically results in automatic overall assessment failure. This reflects the real-world consequence - failure to isolate safely can result in death. It is treated as the most serious error possible."
  },
  {
    id: 11,
    question: "Why must all conductors including neutral be tested when proving dead?",
    options: [
      "Neutral is always at zero volts so doesn't need testing",
      "Neutral may carry voltage due to faults, borrowed neutrals, or broken PEN conductors",
      "Only phase conductors need testing",
      "Testing neutral wastes time"
    ],
    correctAnswer: 1,
    explanation: "Neutral can carry dangerous voltage due to various faults including broken PEN conductors, borrowed neutrals, or neutral-earth faults elsewhere. Test between all conductors (L-N, L-E, N-E) for complete confirmation."
  },
  {
    id: 12,
    question: "What should you do if someone else needs to access the isolated circuit?",
    options: [
      "Give them your lock-off key",
      "They must apply their own lock and the original lock remains in place",
      "Remove your lock so they can add theirs",
      "Lock-off can only be used by one person"
    ],
    correctAnswer: 1,
    explanation: "Multiple lock-off devices can be applied - each person working on the circuit applies their own lock. The circuit cannot be re-energised until ALL locks are removed by their respective owners."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "What if there is no suitable isolation point with lock-off facility?",
    answer: "Do not proceed until adequate isolation can be achieved. You may need to isolate at a higher level (e.g., submain rather than final circuit) or at the origin. If no suitable point exists, the installation may need modification before work can proceed safely."
  },
  {
    question: "Can I use a multimeter instead of a two-pole voltage indicator?",
    answer: "GS38 recommends proprietary two-pole voltage indicators rather than general-purpose multimeters for safe isolation. Multimeters may not meet the safety requirements, may be set to wrong range, and single-pole measurement creates additional risks."
  },
  {
    question: "How do I prove the proving device if I don't have a proving unit?",
    answer: "You can prove on a known live source - typically a socket outlet or supply point that you are certain is energised. However, a proving unit is preferred as it is always available, known to be safe, and removes doubt about the 'known live' source."
  },
  {
    question: "What if the circuit breaker won't lock off?",
    answer: "Some older circuit breakers lack lock-off facility. Use a lock-off device designed for the type of protective device, isolate at a point that can be locked (e.g., isolator), or fit a temporary lock-off enclosure. Never proceed without secure isolation."
  },
  {
    question: "Do I need to safe isolate for every task in an assessment?",
    answer: "Yes - safe isolation is required before working on any circuit, even if you isolated the same circuit earlier. Circumstances may have changed. Demonstrate the full procedure each time to show competence and ensure safety."
  },
  {
    question: "What if my voltage indicator battery is low?",
    answer: "Do not use a device with low battery indication - it may give unreliable readings. Replace or charge batteries before the assessment. Low battery warnings should trigger immediate replacement, not continued use."
  }
];

// ============================================
// ISOLATION STEPS
// ============================================
const isolationSteps = [
  {
    step: 1,
    title: "Identify the Circuit",
    description: "Positively identify the circuit to be worked on using circuit charts, labels, and verification",
    critical: "Correct identification prevents isolating the wrong circuit",
    actions: ["Check circuit chart/schedule", "Verify circuit identity at work location", "Confirm with functional test if appropriate", "Identify all supplies to the circuit"]
  },
  {
    step: 2,
    title: "Isolate the Supply",
    description: "Isolate at the appropriate point using a suitable means of isolation",
    critical: "Use a device suitable for isolation - not all devices are appropriate",
    actions: ["Locate correct isolation point", "Switch/operate the isolation device", "Verify the device is in OFF/isolated position", "Note position of any other linked circuits"]
  },
  {
    step: 3,
    title: "Secure Against Re-energisation",
    description: "Apply lock-off device and warning notice to prevent re-energisation",
    critical: "Lock-off is mandatory - never skip this step",
    actions: ["Apply lock-off device with your own padlock", "Retain the key on your person", "Attach warning notice with your details", "Check isolation device cannot be operated"]
  },
  {
    step: 4,
    title: "Prove the Proving Device",
    description: "Test your voltage indicator on a known live source or proving unit",
    critical: "Never trust an unproven device - it may be faulty",
    actions: ["Use proving unit or known live source", "Confirm indicator shows voltage/responds", "Check indicator for damage or low battery", "Verify leads and probes are undamaged"]
  },
  {
    step: 5,
    title: "Test for Dead",
    description: "Test at the point of work between all conductors",
    critical: "Test at where you will work, not just at the origin",
    actions: ["Test Line to Neutral", "Test Line to Earth", "Test Neutral to Earth", "Test all phases if three-phase supply"]
  },
  {
    step: 6,
    title: "Prove the Proving Device Again",
    description: "Verify the device still works correctly after testing",
    critical: "Confirms device was working throughout the testing",
    actions: ["Use same proving unit or known live source", "Confirm indicator still responds to voltage", "Only proceed if device proves satisfactory", "Document completion of safe isolation"]
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module8Section2_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">

      {/* STICKY HEADER */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* MAIN ARTICLE CONTENT */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* HEADER */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 8.2.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Safe Isolation Practice
          </h1>
          <p className="text-white/80">
            The most critical safety procedure - master it completely
          </p>
        </header>

        {/* QUICK SUMMARY BOXES */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Sequence:</strong> Identify, Isolate, Secure, Prove, Test, Prove</li>
              <li><strong>Critical:</strong> Prove device BEFORE and AFTER testing dead</li>
              <li><strong>Non-negotiable:</strong> Lock-off is mandatory, not optional</li>
              <li><strong>Assessment:</strong> Failure typically means overall failure</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Multiple supplies, borrowed neutrals, PV systems</li>
              <li><strong>Use:</strong> GS38-compliant two-pole voltage indicator</li>
              <li><strong>Apply:</strong> Test at point of work, not just at origin</li>
            </ul>
          </div>
        </div>

        {/* LEARNING OUTCOMES */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Execute the complete safe isolation procedure correctly every time",
              "Understand why each step is critical and cannot be skipped",
              "Use appropriate equipment for proving and testing",
              "Apply lock-off and warning procedures correctly",
              "Handle situations with multiple supplies",
              "Avoid common safe isolation errors that cause assessment failure"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* CONTENT SECTION 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Why Safe Isolation is Non-Negotiable
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Safe isolation is not just another procedure - it is the procedure that prevents electrocution. Every year, electrical workers are killed or seriously injured because of isolation failures. In practical assessments, safe isolation failure typically results in automatic overall failure, regardless of how well you perform everything else.
            </p>

            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 my-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-400 mb-1">Life or Death Reality</p>
                  <p className="text-xs text-white/90">
                    Contact with 230V can kill. The Electricity at Work Regulations 1989 make it a legal requirement to work dead wherever reasonably practicable. Safe isolation is how you ensure 'dead' really means dead. There is no second chance if you get this wrong.
                  </p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Legal Requirements:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Electricity at Work Regulations 1989 (Regulation 13):</strong> Adequate precautions must be taken to prevent danger when work is done on equipment that has been made dead. Safe isolation is how this is achieved.</li>
                <li><strong>Regulation 14:</strong> Work on or near live conductors is prohibited unless it is unreasonable to work dead AND suitable precautions are taken. Working dead is the expectation, not the exception.</li>
                <li><strong>HSE Guidance (GS38):</strong> Specifies requirements for electrical test equipment. Your voltage indicator must meet these requirements - non-compliant equipment is not acceptable.</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Why Complete Procedure is Essential:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Wrong Circuit:</strong> Without positive identification, you might isolate the wrong circuit and work on a live one.</li>
                <li><strong>Re-energisation:</strong> Without lock-off, someone could switch the circuit back on while you work.</li>
                <li><strong>Faulty Tester:</strong> Without proving, your voltage indicator might be faulty and show 'dead' on a live circuit.</li>
                <li><strong>Multiple Supplies:</strong> Without thorough testing, an alternative supply (generator, PV, cross-feed) could energise the circuit.</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Assessment Reality:</strong> Assessors are specifically watching for safe isolation. They will note if you skip steps, rush the procedure, or fail to prove your device. This is not about catching you out - it is about ensuring you have the competence to work safely.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 01 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* CONTENT SECTION 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            The Complete Procedure Step by Step
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Safe isolation follows a specific sequence. Each step builds on the previous one, and skipping any step compromises safety. Learn this sequence until it becomes automatic - you should be able to perform it correctly under any circumstances.
            </p>

            <div className="space-y-4 my-6">
              {isolationSteps.map((step, index) => (
                <div key={index} className="p-4 rounded-lg bg-transparent border border-white/10">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-elec-yellow font-bold text-sm">{step.step}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-white mb-1">{step.title}</h3>
                      <p className="text-xs text-white/70 mb-2">{step.description}</p>
                      <p className="text-xs text-elec-yellow/70 mb-2"><strong>Critical:</strong> {step.critical}</p>
                      <div className="grid grid-cols-2 gap-1">
                        {step.actions.map((action, i) => (
                          <div key={i} className="flex items-center gap-1 text-xs text-white/80">
                            <CheckCircle className="h-3 w-3 text-elec-yellow/50" />
                            <span>{action}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-lg bg-transparent border border-elec-yellow/20 my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Memory Aid: The Proven Sequence</p>
              <p className="text-xs text-white/90">
                <strong>I</strong>dentify - <strong>I</strong>solate - <strong>S</strong>ecure - <strong>P</strong>rove - <strong>T</strong>est - <strong>P</strong>rove
              </p>
              <p className="text-xs text-white/70 mt-2">
                Remember: "I Is Safe To Proceed" - but only after the second Prove confirms the device worked throughout.
              </p>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Practice Note:</strong> Perform this procedure repeatedly until it becomes second nature. In an assessment, nerves can cause you to skip steps or rush. Automatic competence prevents this - your hands do the right thing even when your brain is stressed.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 02 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* CONTENT SECTION 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Equipment and Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Safe isolation requires appropriate equipment that meets safety standards. Using incorrect or inadequate equipment is dangerous and will result in assessment failure. Know what equipment is required and ensure yours is suitable.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="h-4 w-4 text-elec-yellow" />
                  <p className="text-sm font-medium text-white">Voltage Indicator</p>
                </div>
                <ul className="text-xs text-white/90 space-y-1">
                  <li>Two-pole type (not single-pole neon)</li>
                  <li>GS38 compliant for low voltage use</li>
                  <li>Finger guards on probes (10mm exposed tip maximum)</li>
                  <li>Fused leads (500mA maximum)</li>
                  <li>Category rating suitable for installation (typically CAT III or IV)</li>
                  <li>Visual and/or audible indication</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <Power className="h-4 w-4 text-elec-yellow" />
                  <p className="text-sm font-medium text-white">Proving Unit</p>
                </div>
                <ul className="text-xs text-white/90 space-y-1">
                  <li>Produces known voltage for testing indicator</li>
                  <li>Portable and battery powered</li>
                  <li>Compatible with your voltage indicator</li>
                  <li>Clearly indicates when outputting voltage</li>
                  <li>Eliminates need for 'known live' source</li>
                  <li>Safer than using installation as proving source</li>
                </ul>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="h-4 w-4 text-elec-yellow" />
                  <p className="text-sm font-medium text-white">Lock-Off Equipment</p>
                </div>
                <ul className="text-xs text-white/90 space-y-1">
                  <li>Lock-off device suitable for isolation point type</li>
                  <li>Personal padlock with unique key</li>
                  <li>Multiple hasp if others will also work on circuit</li>
                  <li>Key retained on your person throughout work</li>
                  <li>Warning notices/tags</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldAlert className="h-4 w-4 text-elec-yellow" />
                  <p className="text-sm font-medium text-white">Warning Notices</p>
                </div>
                <ul className="text-xs text-white/90 space-y-1">
                  <li>Clear 'DANGER - DO NOT SWITCH ON' message</li>
                  <li>Your name and contact details</li>
                  <li>Date and time of isolation</li>
                  <li>Circuit/equipment identified</li>
                  <li>Durable and clearly visible</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Equipment Checks Before Use:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Visual Inspection:</strong> Check indicator and leads for physical damage. Cracked cases, damaged probes, worn leads, or exposed conductors make equipment unsafe.</li>
                <li><strong>Functionality:</strong> Press test button if fitted. Check display/LEDs respond. Verify batteries are adequate (no low battery warning).</li>
                <li><strong>Leads:</strong> Check leads are firmly attached. Verify probe tips are undamaged. Ensure finger guards are in place and secure.</li>
                <li><strong>Calibration:</strong> Be aware of any calibration requirements. Most voltage indicators do not require calibration but should be periodically checked.</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70 mt-4">
              <strong>Equipment Failure:</strong> If you discover equipment problems during an assessment, inform the assessor immediately. Do not proceed with faulty equipment. Assessors can provide replacement equipment - continuing with suspect equipment would be a safety failure.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 03 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* CONTENT SECTION 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Common Errors and How to Avoid Them
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Many safe isolation failures stem from the same repeated errors. Understanding these common mistakes helps you avoid them. In assessments, these errors result in failure; in real work, they can result in death.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-sm font-medium text-red-400 mb-2">Fatal Errors</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>Not proving the proving device at all</li>
                  <li>Proving only before OR only after (not both)</li>
                  <li>Skipping lock-off because 'it will be quick'</li>
                  <li>Testing at origin but working elsewhere</li>
                  <li>Using non-GS38 compliant tester</li>
                  <li>Assuming circuit is dead without testing</li>
                  <li>Ignoring low battery warnings</li>
                  <li>Not testing neutral to earth</li>
                </ul>
              </div>
              <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <p className="text-sm font-medium text-yellow-400 mb-2">Common Mistakes</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>Rushing through the procedure</li>
                  <li>Not attaching warning notice</li>
                  <li>Inadequate circuit identification</li>
                  <li>Using someone else's lock</li>
                  <li>Leaving key in lock</li>
                  <li>Not checking for multiple supplies</li>
                  <li>Unclear verbal confirmation of steps</li>
                  <li>Testing in wrong sequence</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Assessment-Specific Guidance:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Verbalise Your Actions:</strong> Clearly state what you are doing at each step. This helps the assessor follow your procedure and demonstrates your understanding. "I am now proving my voltage indicator on the proving unit..."</li>
                <li><strong>Don't Rush:</strong> Nervous candidates often rush safe isolation to 'get on with the work'. This is backwards - take the time to do it correctly. The work cannot proceed safely until isolation is complete.</li>
                <li><strong>Complete Every Step:</strong> Even if you feel certain the circuit is dead, complete every step of the procedure. Assessors are checking that you always follow the full procedure, not just when you remember to.</li>
                <li><strong>Handle Interruptions:</strong> If you are interrupted during safe isolation, return to a safe point in the procedure - do not assume you know where you were. Restart proving if unsure.</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 my-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-400 mb-1">Success Formula</p>
                  <p className="text-xs text-white/90">
                    1. Know the procedure completely. 2. Have the correct equipment ready. 3. Take your time. 4. Verbalise each step. 5. Never skip steps under any circumstances. 6. Practice until it is automatic.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Mindset:</strong> Treat every circuit as if it will kill you until you have personally proven it dead. This is not paranoia - it is professional practice that keeps you alive. The one time you assume a circuit is dead could be the last assumption you make.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 04 */}
        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* PRACTICAL GUIDANCE */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Equipment Preparation Checklist</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Voltage indicator - GS38 compliant, undamaged, batteries good</li>
                <li>Proving unit - working, charged/batteries OK</li>
                <li>Lock-off device - suitable for isolation point types</li>
                <li>Padlock - personal lock with unique key</li>
                <li>Warning notices - complete with your details</li>
                <li>Spare batteries if using battery-powered devices</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Practice Exercises</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Practice the full procedure at home on your consumer unit (do not remove covers)</li>
                <li>Time yourself - a competent isolation should take 2-3 minutes</li>
                <li>Practice verbalising each step clearly</li>
                <li>Have someone observe and check you don't skip steps</li>
                <li>Practice with your actual assessment equipment</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Red Flags to Watch For</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Multiple supply warnings</strong> - Look for PV, generator, UPS notices</li>
                <li><strong>Borrowed neutrals</strong> - Shared neutrals between circuits</li>
                <li><strong>Unusual wiring</strong> - Evidence of modifications or poor practice</li>
                <li><strong>Inadequate labelling</strong> - If circuits aren't clearly identified, extra care needed</li>
                <li><strong>Damaged equipment</strong> - Never use damaged test equipment</li>
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

        {/* QUICK REFERENCE */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent border border-elec-yellow/20">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference - Safe Isolation</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">The Six Steps</p>
                <ul className="space-y-0.5">
                  <li>1. Identify the circuit</li>
                  <li>2. Isolate at correct point</li>
                  <li>3. Secure (lock-off + notice)</li>
                  <li>4. Prove proving device works</li>
                  <li>5. Test dead at point of work</li>
                  <li>6. Prove proving device again</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Tests Required</p>
                <ul className="space-y-0.5">
                  <li>Line to Neutral</li>
                  <li>Line to Earth</li>
                  <li>Neutral to Earth</li>
                  <li>All phases (if three-phase)</li>
                  <li>Between all phases</li>
                  <li>Each phase to neutral and earth</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* QUIZ */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* NAVIGATION */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module8-section2-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Wiring Techniques Review
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module8-section2-4">
              Next: Testing Procedures Guide
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module8Section2_3;
