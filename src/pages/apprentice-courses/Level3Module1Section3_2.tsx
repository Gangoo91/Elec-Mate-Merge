/**
 * Level 3 Module 1 Section 3.2 - Lock-Off and Tagging Methods
 *
 * Covers: LOTO procedures, types of lock-off devices, warning tags, permit-to-work systems
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
const TITLE = "Lock-Off and Tagging Methods - Level 3 Module 1 Section 3.2";
const DESCRIPTION = "Learn lock-out tag-out (LOTO) procedures, types of lock-off devices, warning tag requirements, and permit-to-work systems for electrical safety.";

// ============================================
// INLINE CHECK QUESTIONS (4 per page)
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "Why must you use your own personal padlock when locking off equipment?",
    options: [
      "It's cheaper than using company padlocks",
      "Only you can remove it - no one else can restore power while you're working",
      "It's required for insurance purposes only",
      "Other padlocks don't fit lock-off devices"
    ],
    correctIndex: 1,
    explanation: "A personal padlock ensures that only YOU can remove it and restore power. If someone else could remove your lock, they could re-energise the circuit while you're working on it. Your lock = Your life. One lock per person working on the circuit."
  },
  {
    id: "check-2",
    question: "What essential information must a warning tag display?",
    options: [
      "Company logo only",
      "Name of person, date, reason for isolation, and contact details",
      "Just the date of isolation",
      "Only 'Do Not Switch On'"
    ],
    correctIndex: 1,
    explanation: "Warning tags must identify WHO isolated the circuit, WHEN they did it, WHY it's isolated, and HOW to contact them. This prevents accidental re-energisation and provides accountability. Without this information, someone might wrongly assume the isolation is no longer needed."
  },
  {
    id: "check-3",
    question: "Multiple electricians are working on the same isolated circuit. How should lock-off be managed?",
    options: [
      "Only one padlock is needed",
      "Each person must apply their own personal padlock using a multi-lock hasp",
      "The supervisor's lock covers everyone",
      "Tags are sufficient for multiple workers"
    ],
    correctIndex: 1,
    explanation: "Each person working on the circuit must apply their own personal padlock via a multi-lock hasp. Power can only be restored when EVERY person has removed their lock after confirming they've finished work. No single person should be able to remove another's protection."
  },
  {
    id: "check-4",
    question: "When is a permit-to-work system typically required?",
    options: [
      "For all domestic installations",
      "Only when working on outdoor equipment",
      "For high-risk work, especially in industrial/commercial settings with multiple hazards",
      "Only when the HSE visits"
    ],
    correctIndex: 2,
    explanation: "Permit-to-work systems are used for high-risk activities, particularly in industrial and commercial settings. They formally document the isolation, specify precautions, and create a controlled handover process. Common in factories, substations, and anywhere with complex or high-voltage systems."
  }
];

// ============================================
// QUIZ QUESTIONS (10 questions)
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "What does LOTO stand for in electrical safety?",
    options: [
      "Lock Out Turn Off",
      "Lock Out Tag Out",
      "Live Operation Technical Order",
      "Limited Operation Testing Only"
    ],
    correctAnswer: 1,
    explanation: "LOTO stands for Lock Out Tag Out - the procedure of physically locking isolation devices in the OFF position and attaching warning tags. This is a fundamental safety procedure to prevent accidental re-energisation during maintenance or repair work."
  },
  {
    id: 2,
    question: "Which type of lock-off device is used for miniature circuit breakers (MCBs) in consumer units?",
    options: [
      "Valve lockout",
      "MCB lock-off device that clips over the breaker toggle",
      "Cable lockout",
      "Gate valve cover"
    ],
    correctAnswer: 1,
    explanation: "MCB lock-off devices clip over the breaker toggle, preventing it from being switched on. They have a hole for a padlock to secure them in place. Different manufacturers' MCBs may require different lock-off devices, so check compatibility."
  },
  {
    id: 3,
    question: "What colour are warning tags typically for electrical isolation?",
    options: [
      "Green",
      "Blue",
      "Red or danger yellow",
      "White"
    ],
    correctAnswer: 2,
    explanation: "Electrical isolation warning tags are typically red or danger yellow with clear 'DANGER - Do Not Operate' or 'Do Not Switch On' warnings. The high-visibility colour ensures they cannot be overlooked. Some sites have specific colour codes for different types of isolation."
  },
  {
    id: 4,
    question: "What should you do if you find someone else's lock on equipment you need to re-energise?",
    options: [
      "Cut it off if they're not around",
      "Ask a supervisor to remove it",
      "Contact the person whose lock it is - never remove another person's lock",
      "Wait 24 hours then remove it"
    ],
    correctAnswer: 2,
    explanation: "Never remove another person's lock under any circumstances. That person may still be working on the circuit or may have left for a valid reason. Contact them directly to confirm they have completed work safely. This is why contact details must be on the tag."
  },
  {
    id: 5,
    question: "What is a multi-lock hasp used for?",
    options: [
      "Locking multiple consumer units together",
      "Allowing multiple workers to each apply their own padlock to the same isolation point",
      "Securing tool bags",
      "Testing multiple circuits at once"
    ],
    correctAnswer: 1,
    explanation: "A multi-lock hasp (or lockout hasp) allows multiple padlocks to be attached to a single isolation point. Each worker applies their own lock, and the equipment cannot be re-energised until every lock is removed. This protects multiple workers simultaneously."
  },
  {
    id: 6,
    question: "When can a tag be used WITHOUT a lock?",
    options: [
      "When working on low-voltage circuits only",
      "When you're only working for a few minutes",
      "Generally never - tags warn but don't physically prevent re-energisation. Locks are essential",
      "When supervisors approve it"
    ],
    correctAnswer: 2,
    explanation: "Tags alone provide NO physical protection - anyone can ignore a tag. While tags are essential for communication and warning, they must always be used WITH locks, not instead of them. The only exception might be if physical locking is impossible, in which case alternative precautions (such as a posted guard) are essential."
  },
  {
    id: 7,
    question: "A fuse is withdrawn as the means of isolation. What should happen to the fuse?",
    options: [
      "Leave it next to the fuse holder",
      "Keep it on your person or in a locked box under your control",
      "Give it to the client",
      "Put it in your van"
    ],
    correctAnswer: 1,
    explanation: "Withdrawn fuses should be kept on your person or in a locked container that only you control. This prevents anyone from finding and replacing the fuse while you're working. The fuse carrier should be tagged as well. Treat withdrawn fuses with the same care as your lock."
  },
  {
    id: 8,
    question: "What is the purpose of a permit-to-work system?",
    options: [
      "To avoid health and safety inspections",
      "To formally document and control high-risk work, ensuring all precautions are in place",
      "To speed up the work process",
      "To reduce paperwork requirements"
    ],
    correctAnswer: 1,
    explanation: "Permit-to-work systems formally document isolations, specify required precautions, and create a controlled handover process. They ensure everyone knows what's isolated, who's working, and when it's safe to restore power. Essential for complex or high-risk situations."
  },
  {
    id: 9,
    question: "Before leaving site at the end of a day (work incomplete), what should you check regarding lock-off?",
    options: [
      "Remove all locks so night shift can work",
      "Ensure your lock and tag remain in place if circuit is still unsafe",
      "Just leave the circuit live",
      "Transfer your lock to a colleague"
    ],
    correctAnswer: 1,
    explanation: "If work is incomplete and the circuit must remain isolated, your lock and tag must stay in place. If you must leave, establish clear handover procedures - but never simply transfer your lock to someone else. They must apply their own lock before you remove yours."
  },
  {
    id: 10,
    question: "What type of lock should be used for electrical lock-out?",
    options: [
      "Any padlock available",
      "Purpose-designed safety lockout padlock with unique key",
      "Combination locks are preferred",
      "Master-keyed locks for easy access"
    ],
    correctAnswer: 1,
    explanation: "Purpose-designed safety lockout padlocks should be used - they're typically coloured for easy identification, have unique keys (no master keys), and are robust enough for industrial use. Never use combination locks (others could know the code) or master-keyed locks (defeats the purpose of personal protection)."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "What if the isolator can't be locked off?",
    answer: "If physical locking isn't possible, you must use alternative methods: withdraw fuses and keep them on your person, use lock-out devices on the distribution board door, or post a competent person to guard the isolator continuously. Work should not proceed without secure isolation. Document the alternative method in your risk assessment."
  },
  {
    question: "Can I use my own padlock from home?",
    answer: "While better than nothing, it's not ideal. Purpose-designed safety lockout padlocks are preferred as they're typically brightly coloured for visibility, have non-conductive shackles in some cases, and most importantly have unique keys with no master key option. Your employer should provide appropriate lockout equipment."
  },
  {
    question: "How long should a lock remain in place?",
    answer: "The lock must remain until you have completed ALL work, verified the installation is safe, and are ready for re-energisation. This might be minutes or days depending on the job. Never remove your lock 'just for a moment' - treat every removal as final and re-apply the full isolation procedure if you need to return."
  },
  {
    question: "What if I lose the key to my padlock?",
    answer: "Never cut off your own lock without following proper procedures. Report the loss immediately, ensure the circuit remains isolated (apply another lock if possible), and follow your company's lock removal procedure. This typically involves supervisor authorisation, verification that you're clear of the equipment, and documentation."
  },
  {
    question: "Are tags legally required or just good practice?",
    answer: "While specific lock-out regulations exist in some jurisdictions, in the UK the requirement flows from the Electricity at Work Regulations duty to prevent danger. Using appropriate locks AND tags is the industry-accepted standard for meeting this duty. Tags alone are insufficient - they must accompany locks."
  },
  {
    question: "Who can authorise removal of a lock if the worker is unavailable?",
    answer: "This should only happen following strict emergency procedures: verification the worker is not in danger, authorisation by a senior competent person, documented records, and fresh proving-dead procedures before re-energisation. These procedures should be established before they're needed, not improvised in the moment."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module1Section3_2 = () => {
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
            <Link to="/study-centre/apprentice/level3-module1-section3">
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
            <span>Module 1 Section 3.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Lock-Off and Tagging Methods
          </h1>
          <p className="text-white/80">
            Physical security that ensures no one can restore power while you work
          </p>
        </header>

        {/* ----------------------------------------
            QUICK SUMMARY BOXES
            ---------------------------------------- */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>LOTO:</strong> Lock Out Tag Out - physical prevention of re-energisation</li>
              <li><strong>Personal lock:</strong> Only YOU can remove your lock - one person, one lock</li>
              <li><strong>Tags:</strong> Name, date, reason, contact details - always with locks</li>
              <li><strong>Multi-lock:</strong> Each worker applies their own lock via a hasp</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Isolation points, lock-off provisions, hasp fittings</li>
              <li><strong>Use:</strong> MCB locks, rotary isolator locks, fuse carrier locks</li>
              <li><strong>Apply:</strong> Your personal lock + warning tag at every isolation</li>
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
              "Understand and apply Lock Out Tag Out (LOTO) procedures",
              "Select and use appropriate lock-off devices for different equipment",
              "Create compliant warning tags with all required information",
              "Manage multi-person lock-off using hasps",
              "Work within permit-to-work systems",
              "Handle exceptional situations (lost keys, unavailable workers)"
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
            Why Lock-Off Matters
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proving dead tells you the circuit is safe NOW. But what stops someone switching it back on while you're working? The answer is lock-off - physically preventing anyone from restoring power until you're ready.
            </p>
            <p>
              Consider this: you isolate a circuit at the consumer unit, prove it dead at your work point, and begin work. Meanwhile, a colleague arrives, sees the MCB is off, assumes it tripped, and switches it back on. You receive a 230V shock. This scenario has killed electricians. Lock-off prevents it.
            </p>

            <div className="my-6 p-4 rounded bg-red-500/10 border border-red-500/20">
              <p className="text-sm font-medium text-red-400 mb-2">Fatal Flaw:</p>
              <p className="text-sm text-white/90">
                A tag without a lock is just a request - anyone can ignore it. A lock without a tag leaves people wondering who put it there and why. You need BOTH: the lock provides physical security, the tag provides information and accountability. Never compromise on either.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>The Principle:</strong> Your lock, your life. Only YOU should be able to remove your lock. Never allow master-keyed systems or situations where others can defeat your protection.
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
            Types of Lock-Off Devices
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Different equipment requires different lock-off devices. Understanding which device to use - and having the right ones in your kit - is essential for any electrician.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded bg-white/5">
                <p className="text-sm font-medium text-elec-yellow mb-2">MCB Lock-Off Devices</p>
                <p className="text-sm text-white/90">
                  Clip-on devices that fit over MCB toggles, preventing them from being switched to ON. Different designs suit different MCB manufacturers (BS EN 60898 type). Always check compatibility - an ill-fitting device provides false security.
                </p>
              </div>
              <div className="p-4 rounded bg-white/5">
                <p className="text-sm font-medium text-elec-yellow mb-2">Rotary Isolator Locks</p>
                <p className="text-sm text-white/90">
                  Many rotary isolators have built-in padlock holes in the OFF position. These directly accept your padlock. For isolators without this feature, handle-mounted lock-off devices are available.
                </p>
              </div>
              <div className="p-4 rounded bg-white/5">
                <p className="text-sm font-medium text-elec-yellow mb-2">Circuit Breaker Lock-Outs</p>
                <p className="text-sm text-white/90">
                  Larger MCCBs and ACBs often have built-in lock-off provisions, or require specific lock-off attachments. Industrial breakers may have multiple lock-off points. Know your equipment before you need to isolate it.
                </p>
              </div>
              <div className="p-4 rounded bg-white/5">
                <p className="text-sm font-medium text-elec-yellow mb-2">Plug Lock-Outs</p>
                <p className="text-sm text-white/90">
                  For plug-connected equipment, plug lock-out devices enclose the plug and prevent it from being inserted into a socket. Useful for portable equipment or when the isolator is a plug/socket connection.
                </p>
              </div>
            </div>

            <div className="my-6 p-4 rounded bg-white/5">
              <p className="text-sm font-medium text-white mb-2">Fuse Withdrawal</p>
              <p className="text-sm text-white/90">
                When fuses are withdrawn as the means of isolation, the fuse carrier itself becomes critical. Keep withdrawn fuses on your person or in a locked container under your control. The fuse holder should be tagged. Never leave withdrawn fuses where someone else could find and replace them.
              </p>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Trade Tip:</strong> Build a lock-off kit containing MCB devices for common manufacturers (Hager, MK, Schneider, etc.), a universal lock-off device, padlocks with unique keys, tags, and a permanent marker. Being caught without the right device is no excuse for not locking off.
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
            Warning Tags and Labels
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Warning tags communicate essential information about an isolation. They're the link between the physical lock and the human who placed it. A lock without a tag is a mystery - a tag without a lock is just a suggestion.
            </p>

            <div className="my-6 p-4 rounded bg-elec-yellow/5 border border-elec-yellow/20">
              <p className="text-sm font-medium text-elec-yellow mb-3">Required Tag Information</p>
              <ul className="text-sm text-white space-y-2">
                <li><strong>1. Clear Warning:</strong> "DANGER - DO NOT OPERATE" or "DO NOT SWITCH ON"</li>
                <li><strong>2. Your Name:</strong> Who isolated this circuit?</li>
                <li><strong>3. Date and Time:</strong> When was it isolated?</li>
                <li><strong>4. Reason:</strong> Why is it isolated? (e.g., "Rewiring kitchen circuit")</li>
                <li><strong>5. Contact Details:</strong> Mobile number or how to reach you</li>
                <li><strong>6. Expected Duration:</strong> When do you expect to finish? (if known)</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Tag Materials</p>
                <ul className="text-sm text-white space-y-1">
                  <li>High-visibility colours (red, yellow)</li>
                  <li>Waterproof or water-resistant</li>
                  <li>Durable - won't tear or fade quickly</li>
                  <li>Securely attached (cable ties, not just hung)</li>
                  <li>Large enough to be clearly readable</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Mistakes</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Illegible writing (use permanent marker)</li>
                  <li>Missing contact details</li>
                  <li>No date/time</li>
                  <li>Tag loosely attached (can fall off)</li>
                  <li>Using tags instead of locks</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> If your tag fell off and someone found your lock, could they contact you? If not, your tag isn't doing its job. Write clearly, include all details, and attach securely.
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
            Multi-Person Lock-Off and Hasps
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When multiple people work on the same isolated circuit, each person must have their own protection. A supervisor's lock doesn't protect the apprentice. A mate's lock doesn't protect you. The solution is a multi-lock hasp.
            </p>

            <div className="my-6 p-4 rounded bg-white/5 border-l-2 border-elec-yellow">
              <p className="text-sm font-medium text-elec-yellow mb-2">How Multi-Lock Hasps Work</p>
              <p className="text-sm text-white/90 mb-3">
                A hasp is a metal device that can accept multiple padlocks. It's fitted over the isolation device. Each worker applies their own padlock to the hasp. The hasp cannot be removed until EVERY padlock is removed. Power cannot be restored until everyone has confirmed they're clear.
              </p>
              <ul className="text-sm text-white/90 space-y-1">
                <li>1. First worker fits hasp and applies their lock</li>
                <li>2. Second worker adds their lock to the same hasp</li>
                <li>3. Additional workers add their locks as needed</li>
                <li>4. Each worker removes ONLY their own lock when finished</li>
                <li>5. Last lock removed = hasp can be removed = power can be restored</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded bg-red-500/10 border border-red-500/20">
              <p className="text-sm font-medium text-red-400 mb-2">Critical Rule:</p>
              <p className="text-sm text-white/90">
                Never remove another person's lock, even if they ask you to. They must physically come and remove it themselves after confirming they're clear. This rule exists because people have been killed when their lock was "helpfully" removed by colleagues who didn't realise they were still working.
              </p>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Trade Example:</strong> Three electricians working on a factory rewire. All three apply locks to the main isolator via a hasp. Sparky A finishes and removes their lock. Sparky B takes a lunch break but leaves their lock on. Sparky C is still working. The circuit CANNOT be re-energised until both B and C have also removed their locks. This protects everyone.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 04 */}
        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* ----------------------------------------
            PERMIT-TO-WORK SECTION
            ---------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">Permit-to-Work Systems</h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In industrial and commercial settings, particularly with high-voltage equipment or complex systems, permit-to-work (PTW) systems add a formal layer of control to the isolation process.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded bg-white/5">
                <p className="text-sm font-medium text-elec-yellow mb-2">What a PTW System Does</p>
                <ul className="text-sm text-white/90 space-y-1">
                  <li>Formally documents all isolations</li>
                  <li>Specifies required precautions</li>
                  <li>Creates clear handover procedures</li>
                  <li>Provides audit trail for safety</li>
                  <li>Coordinates multiple work activities</li>
                </ul>
              </div>
              <div className="p-4 rounded bg-white/5">
                <p className="text-sm font-medium text-elec-yellow mb-2">When PTW is Used</p>
                <ul className="text-sm text-white/90 space-y-1">
                  <li>High-voltage installations</li>
                  <li>Complex industrial systems</li>
                  <li>Multiple contractors working together</li>
                  <li>Confined space entry</li>
                  <li>Work with significant risk</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90">
              A permit-to-work is NOT a replacement for personal lock-off - it's an additional layer. The permit documents what's been isolated and authorises work to proceed. You still apply your personal lock and tag. The permit tracks the overall operation; your lock protects you personally.
            </p>
          </div>
        </section>

        {/* ----------------------------------------
            PRACTICAL GUIDANCE
            ---------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Your Lock-Off Kit Should Contain</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Personal padlocks (minimum 2) with unique keys - brightly coloured</li>
                <li>MCB lock-off devices for common manufacturers</li>
                <li>Universal circuit breaker lock-off device</li>
                <li>Warning tags (pre-printed with space for details)</li>
                <li>Permanent marker (waterproof)</li>
                <li>Cable ties for securing tags</li>
                <li>Multi-lock hasp for team work situations</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Lock-Off Procedure Checklist</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>1. Identify correct isolation point(s)</li>
                <li>2. Switch to OFF position</li>
                <li>3. Apply appropriate lock-off device</li>
                <li>4. Apply YOUR personal padlock</li>
                <li>5. Complete and attach warning tag</li>
                <li>6. Prove dead at point of work</li>
                <li>7. Re-prove tester</li>
                <li>8. Begin work only when fully secured</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Never Do These</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Never remove another person's lock</strong> - no exceptions</li>
                <li><strong>Never use master-keyed padlocks</strong> - defeats personal protection</li>
                <li><strong>Never leave locks overnight without tags</strong> - creates confusion</li>
                <li><strong>Never rely on tags alone</strong> - tags warn, locks prevent</li>
                <li><strong>Never assume someone else locked off for you</strong> - verify yourself</li>
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
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference - Lock-Off</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">LOTO Principles</p>
                <ul className="space-y-0.5">
                  <li>Your lock = your protection</li>
                  <li>One person, one lock (minimum)</li>
                  <li>Tags always WITH locks, never instead</li>
                  <li>Multi-lock hasps for team work</li>
                  <li>Never remove another's lock</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Tag Information</p>
                <ul className="space-y-0.5">
                  <li>Clear warning message</li>
                  <li>Your name</li>
                  <li>Date and time</li>
                  <li>Reason for isolation</li>
                  <li>Contact details</li>
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
            <Link to="/study-centre/apprentice/level3-module1-section3-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Safe Isolation
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module1-section3-3">
              Next: Live Working Restrictions
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module1Section3_2;
