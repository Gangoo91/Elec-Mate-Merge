/**
 * Level 3 Module 1 Section 2.5 - Safe Systems of Work
 *
 * Covers: Permits to work (PTWs), Lock-off/Tag-out (LOTO), Safe isolation procedures
 * Design: Follows Level3ContentTemplate.tsx exactly
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
const TITLE = "Safe Systems of Work - Level 3 Module 1 Section 2.5";
const DESCRIPTION = "Master safe systems of work for electrical installations: permits to work, lock-off/tag-out procedures, safe isolation, and the coordination required for high-risk electrical work.";

// ============================================
// INLINE CHECK QUESTIONS (4 per page)
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is a 'Safe System of Work' in legal terms?",
    options: [
      "Just another name for a risk assessment",
      "A method of working that eliminates or minimises risks after considering all factors",
      "A permit to work document",
      "Any written procedure"
    ],
    correctIndex: 1,
    explanation: "A Safe System of Work is a defined method of working, developed after systematic hazard identification and risk assessment, that eliminates hazards or minimises risks to acceptable levels. It includes all the controls - not just paperwork."
  },
  {
    id: "check-2",
    question: "What is the PRIMARY purpose of a permit to work system?",
    options: [
      "To create paperwork for auditors",
      "To formally control high-risk work through authorisation, clear responsibilities, and handover",
      "To replace the need for risk assessments",
      "To allow live working"
    ],
    correctIndex: 1,
    explanation: "A permit to work provides formal control of high-risk activities through documented authorisation, clear allocation of responsibilities, verification of controls, and controlled handover between parties. It's not just paperwork - it's an active control system."
  },
  {
    id: "check-3",
    question: "In a LOTO (Lock-Off/Tag-Out) procedure, why must each worker apply their OWN lock?",
    options: [
      "To make the system look more secure",
      "So that no one can re-energise until ALL workers have completed their work and removed their locks",
      "It's just company policy",
      "One lock is usually sufficient"
    ],
    correctIndex: 1,
    explanation: "Each worker applies their own lock so that they personally control their own safety. The system cannot be re-energised until every single lock is removed. This ensures all workers have completed their work and are clear before power is restored."
  },
  {
    id: "check-4",
    question: "When proving a voltage indicator before safe isolation, what must you do AFTER testing the circuit dead?",
    options: [
      "Nothing - work can start",
      "Remove the lock-off device",
      "Re-prove the voltage indicator on a known live source or proving unit",
      "Call the supervisor"
    ],
    correctIndex: 2,
    explanation: "You must re-prove your voltage indicator AFTER testing to confirm it was working correctly during the test. If the VI proves on a known source both BEFORE and AFTER, you can be confident the 'dead' reading was accurate, not due to instrument failure."
  }
];

// ============================================
// QUIZ QUESTIONS (12 questions)
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "What are the THREE key elements of any safe system of work?",
    options: [
      "Paperwork, signatures, and dates",
      "Safe person, safe place, safe equipment",
      "Risk assessment, method statement, and permit",
      "Training, supervision, and documentation"
    ],
    correctAnswer: 1,
    explanation: "A safe system of work requires: a SAFE PERSON (competent, trained, fit for work), a SAFE PLACE (hazards identified and controlled), and SAFE EQUIPMENT (correct tools, PPE, properly maintained). All three must be in place."
  },
  {
    id: 2,
    question: "Which activities typically require a formal permit to work in electrical work?",
    options: [
      "Any electrical work",
      "Only work over 1000V",
      "Live working, high-voltage work, work affecting multiple systems, entry to switchrooms",
      "Only work lasting more than one day"
    ],
    correctAnswer: 2,
    explanation: "Permits are typically required for high-risk electrical activities: live working, HV work, work on or near LV switchgear with high fault levels, work affecting multiple circuits/systems, entry to substations or secure electrical areas, and work requiring coordination with others."
  },
  {
    id: 3,
    question: "What is the role of the 'Authorised Person' in a permit to work system?",
    options: [
      "To do the actual electrical work",
      "To issue and cancel permits, verify isolations, and control access to equipment",
      "To sign off paperwork at the end",
      "To write the risk assessment"
    ],
    correctAnswer: 1,
    explanation: "The Authorised Person (AP) is responsible for issuing and cancelling permits, verifying isolation has been achieved, confirming the safety of equipment before work starts, and controlling access. They authorise but typically don't do the work themselves."
  },
  {
    id: 4,
    question: "A lock-off device is used to:",
    options: [
      "Keep tools secure",
      "Physically prevent re-energisation of isolated equipment",
      "Mark completed work",
      "Identify the circuit number"
    ],
    correctAnswer: 1,
    explanation: "A lock-off device physically prevents an isolator from being switched back on. With a lock in place, even if someone wanted to re-energise, they physically cannot. This provides positive protection that doesn't rely on signs, communication, or memory."
  },
  {
    id: 5,
    question: "What is a 'multi-lock hasp' used for?",
    options: [
      "Securing tool boxes",
      "Allowing multiple workers to each apply their own lock to a single isolation point",
      "Locking distribution board doors",
      "Connecting multiple cables"
    ],
    correctAnswer: 1,
    explanation: "A multi-lock hasp allows several workers to each apply their own personal lock to a single isolation point. The equipment cannot be re-energised until every single lock is removed - ensuring all workers are clear before switching on."
  },
  {
    id: 6,
    question: "According to GS38, what must you do with your voltage indicator BEFORE testing for dead?",
    options: [
      "Calibrate it",
      "Prove it works on a known live source or proving unit",
      "Read the manual",
      "Replace the batteries"
    ],
    correctAnswer: 1,
    explanation: "GS38 requires you to prove your voltage indicator works on a known live source (or proving unit) BEFORE testing the isolated circuit. This confirms the instrument is functioning correctly before you rely on its readings."
  },
  {
    id: 7,
    question: "What information must be recorded on a permit to work?",
    options: [
      "Only the date and signatures",
      "Just the work description",
      "Equipment to be worked on, isolation details, hazards, controls, persons responsible, and time limits",
      "Only emergency contact numbers"
    ],
    correctAnswer: 2,
    explanation: "A permit must record: what equipment/area, what work is being done, what isolations are in place, what hazards exist, what controls are required, who is responsible, time/date validity, and signatures for issue, receipt, and clearance."
  },
  {
    id: 8,
    question: "When should a permit to work be cancelled?",
    options: [
      "At the end of the shift",
      "When the work is complete, the area is safe, and it's ready for return to service",
      "When the Authorised Person leaves site",
      "After one week"
    ],
    correctAnswer: 1,
    explanation: "A permit is cancelled when work is complete, the area has been made safe, tools and temporary earths are removed, all workers are clear, and the equipment is ready for return to service. Cancellation should involve the same rigour as issue."
  },
  {
    id: 9,
    question: "What does 'LOTO' stand for?",
    options: [
      "Live On/Turn Off",
      "Lock-Out/Tag-Out",
      "Local Operations Technical Order",
      "Low Output Test Only"
    ],
    correctAnswer: 1,
    explanation: "LOTO stands for Lock-Out/Tag-Out - the procedure for applying locks and warning tags to isolated equipment to prevent inadvertent re-energisation while work is in progress."
  },
  {
    id: 10,
    question: "Why are warning tags used in addition to lock-off devices?",
    options: [
      "They are decorative",
      "They provide information about who applied the lock, why, and how to contact them",
      "They replace the need for locks",
      "They are legally required instead of locks"
    ],
    correctAnswer: 1,
    explanation: "Tags provide vital information: who applied the lock, why (what work is being done), when, and contact details. If there's a question about the isolation, or in an emergency, this information tells you who to contact. Tags complement but don't replace locks."
  },
  {
    id: 11,
    question: "What is the correct sequence for safe isolation?",
    options: [
      "Lock off, test, isolate, prove",
      "Identify, isolate, lock off, prove dead, prove tester",
      "Identify, isolate, secure (lock off), prove tester, prove dead, re-prove tester",
      "Switch off and start work"
    ],
    correctAnswer: 2,
    explanation: "The correct sequence is: 1) Identify the circuit, 2) Isolate at the appropriate point, 3) Secure with lock-off and tags, 4) Prove the tester on a known source, 5) Test and prove dead at the point of work, 6) Re-prove the tester. Only then can work begin."
  },
  {
    id: 12,
    question: "Who can authorise removal of a lock-off device in normal circumstances?",
    options: [
      "Any electrician",
      "Only the person who applied the lock",
      "The site manager",
      "Anyone with a master key"
    ],
    correctAnswer: 1,
    explanation: "Only the person who applied the lock should remove it - this confirms they have completed their work and are clear. Removing someone else's lock is extremely dangerous as that person may still be working on the circuit. Emergency procedures exist for exceptional circumstances."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "Do I always need a permit to work for electrical work?",
    answer: "No. Permits are for high-risk activities where formal control and coordination are needed - live working, HV work, work affecting multiple systems, entry to secure areas. Routine LV work on isolated circuits typically uses method statements and safe isolation procedures without formal permits. Your employer's procedures will define when permits are required."
  },
  {
    question: "What if someone removes my lock without my knowledge?",
    answer: "This is a serious safety breach - potentially criminal if it results in injury. Never remove someone else's lock without following formal emergency procedures (which require senior authorisation, attempts to contact the lock owner, and physical verification that all workers are clear). Report any instances of lock removal to management immediately."
  },
  {
    question: "Can I use a non-contact voltage detector (volt-stick) for safe isolation?",
    answer: "No. Non-contact detectors can give false negatives and are NOT approved for proving dead during safe isolation. They can be used as an initial indication only. GS38 requires a proper two-pole voltage indicator with test probes that make contact with conductors. Prove the tester before AND after testing."
  },
  {
    question: "What's the difference between isolation and switching off?",
    answer: "Switching off stops normal operation but the supply may still be connected - the equipment could be switched back on instantly. Isolation creates a physical break in the circuit and is secured so it cannot be easily re-energised. For safe working, equipment must be isolated and locked off, not just switched off."
  },
  {
    question: "How long is a permit to work valid for?",
    answer: "Permits are typically valid for one shift or one day maximum. If work extends beyond this, a new permit or extension must be issued after verification that conditions remain safe. Never continue working on an expired permit - the situation may have changed and controls may no longer be valid."
  },
  {
    question: "What if conditions change after a permit is issued?",
    answer: "If conditions change significantly from those stated on the permit, work must stop. The Competent Person (permit holder) should contact the Authorised Person. The permit may need to be suspended or cancelled and a new assessment done. Never continue under a permit if the actual conditions don't match what's written."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module1Section2_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">

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
            <Link to="/study-centre/apprentice/level3-module1-section2">
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
            <span>Module 1.2.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Safe Systems of Work
          </h1>
          <p className="text-white/80">
            PTWs, LOTO procedures, and the formal controls that keep you alive
          </p>
        </header>

        {/* ----------------------------------------
            QUICK SUMMARY BOXES
            ---------------------------------------- */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>SSOW:</strong> Safe person + Safe place + Safe equipment</li>
              <li><strong>PTW:</strong> Formal authorisation for high-risk work</li>
              <li><strong>LOTO:</strong> Lock-Off/Tag-Out - physical prevention</li>
              <li><strong>Proving:</strong> Test before AND after checking dead</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> When formal controls (permits) are needed</li>
              <li><strong>Use:</strong> YOUR lock on every isolation point</li>
              <li><strong>Apply:</strong> Prove-test-prove sequence every time</li>
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
              "Understand what constitutes a safe system of work",
              "Know when and how permit to work systems are used",
              "Apply Lock-Off/Tag-Out (LOTO) procedures correctly",
              "Execute the safe isolation procedure to GS38 standard",
              "Understand roles: Authorised Person, Competent Person",
              "Know the legal basis for these procedures"
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
            CONTENT SECTION 01 - Safe Systems of Work
            ---------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What is a Safe System of Work?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A Safe System of Work (SSOW) is a formal procedure resulting from systematic examination of a task to identify all hazards and define the safest method of doing the work. It's more than just paperwork - it's the complete package of controls, training, equipment, and procedures that enable work to be done safely.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The three foundations of any SSOW:</p>
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="p-3 rounded bg-white/5 text-center">
                  <p className="font-medium text-elec-yellow mb-1">Safe Person</p>
                  <p className="text-white/70 text-xs">Competent, trained, fit, supervised appropriately</p>
                </div>
                <div className="p-3 rounded bg-white/5 text-center">
                  <p className="font-medium text-elec-yellow mb-1">Safe Place</p>
                  <p className="text-white/70 text-xs">Hazards identified and controlled, environment suitable</p>
                </div>
                <div className="p-3 rounded bg-white/5 text-center">
                  <p className="font-medium text-elec-yellow mb-1">Safe Equipment</p>
                  <p className="text-white/70 text-xs">Right tools, PPE, properly maintained and inspected</p>
                </div>
              </div>
            </div>

            <p>
              <strong>Legal basis:</strong> The Management of Health and Safety at Work Regulations 1999 requires employers to implement preventive and protective measures. For electrical work, the Electricity at Work Regulations 1989 requires that work is done dead where reasonably practicable, and where it cannot be, suitable precautions are taken.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Components of a safe system for electrical work:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>- Risk assessment identifying hazards and controls</li>
                <li>- Method statement describing safe procedures</li>
                <li>- Safe isolation procedure (LOTO)</li>
                <li>- Permit to work where required</li>
                <li>- Competent, trained personnel</li>
                <li>- Appropriate PPE and equipment</li>
                <li>- Supervision and verification</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> A safe system of work isn't just documents - it's a complete approach to working safely, including the people, procedures, and equipment. The paperwork records and communicates the system, but the system is what keeps you alive.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ----------------------------------------
            CONTENT SECTION 02 - Permits to Work
            ---------------------------------------- */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Permits to Work (PTW)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A Permit to Work is a formal written document that authorises certain people to carry out specific work, at a specific time, and sets out the precautions required. It's used for high-risk activities where normal procedures need additional formal controls and coordination.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">When permits are typically required:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>- Live electrical work (where dead working isn't practicable)</li>
                <li>- High voltage work (above 1000V AC)</li>
                <li>- Work on or near LV switchgear with high fault levels</li>
                <li>- Work affecting multiple systems or areas</li>
                <li>- Entry to substations or secure electrical areas</li>
                <li>- Work requiring coordination with other parties</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-elec-yellow/80 mb-2">Authorised Person (AP)</p>
                <ul className="text-white/90 space-y-0.5 text-xs">
                  <li>- Issues and cancels permits</li>
                  <li>- Verifies isolation is in place</li>
                  <li>- Confirms equipment is safe to work on</li>
                  <li>- Controls access to equipment</li>
                  <li>- Typically does NOT do the work</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-elec-yellow/80 mb-2">Competent Person (CP)</p>
                <ul className="text-white/90 space-y-0.5 text-xs">
                  <li>- Receives the permit</li>
                  <li>- Responsible for the work and team</li>
                  <li>- Ensures controls are followed</li>
                  <li>- Returns the permit when complete</li>
                  <li>- Confirms area is safe for return to service</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Permit lifecycle:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>1. Preparation:</strong> Risk assessment, method statement, isolation plan</li>
                <li><strong>2. Issue:</strong> AP confirms isolations, issues permit to CP, both sign</li>
                <li><strong>3. Receipt:</strong> CP accepts responsibility, briefs team, work begins</li>
                <li><strong>4. Monitoring:</strong> Work progresses under permit controls</li>
                <li><strong>5. Clearance:</strong> Work complete, area made safe, CP returns permit</li>
                <li><strong>6. Cancellation:</strong> AP verifies safe, cancels permit, equipment returned to service</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> A permit is not just paperwork - it's an active control system. The permit is a communication tool that ensures everyone knows what's isolated, what's being done, who's responsible, and when it's safe to restore power.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ----------------------------------------
            CONTENT SECTION 03 - LOTO Procedures
            ---------------------------------------- */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Lock-Off/Tag-Out (LOTO) Procedures
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Lock-Off/Tag-Out (LOTO) is the physical method of securing isolation to prevent inadvertent re-energisation. It combines locks (physical prevention) with tags (information) to provide robust protection for workers on isolated equipment.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The components of LOTO:</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-elec-yellow/80 mb-2">Lock-Off</p>
                  <ul className="text-white/90 space-y-0.5 text-xs">
                    <li>- Physical lock preventing operation</li>
                    <li>- Personal lock with unique key</li>
                    <li>- Multi-lock hasp for multiple workers</li>
                    <li>- Cannot be removed by others</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-elec-yellow/80 mb-2">Tag-Out</p>
                  <ul className="text-white/90 space-y-0.5 text-xs">
                    <li>- Warning tag attached with lock</li>
                    <li>- States: who, what work, when, contact</li>
                    <li>- Provides information to others</li>
                    <li>- Never used alone (tags can be removed)</li>
                  </ul>
                </div>
              </div>
            </div>

            <p>
              <strong>Why each worker needs their own lock:</strong> The fundamental principle is that you control your own safety. When you apply your personal lock, only YOU can remove it. Even if your colleagues finish and remove their locks, the equipment cannot be re-energised while your lock remains. You remove your lock when YOU are finished and clear - not when someone else tells you they're ready to switch on.
            </p>

            <div className="p-4 rounded bg-white/5 my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Multi-Worker Scenario</p>
              <p className="text-xs text-white/90 mb-2">
                Three electricians are working on an isolated motor starter. Each applies their own lock to the multi-lock hasp at the isolation point. Worker A finishes at 2pm and removes their lock. Workers B and C continue working. Worker B finishes at 3pm and removes their lock. Worker C is still inside the starter. The equipment CANNOT be re-energised because C's lock is still on. At 3:30pm, C finishes, removes their lock, and only THEN can the circuit be re-energised.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">LOTO procedure steps:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>1. Identify all energy sources requiring isolation</li>
                <li>2. Notify all affected personnel</li>
                <li>3. Shut down equipment using normal procedures</li>
                <li>4. Isolate all energy sources</li>
                <li>5. Apply personal lock(s) and tag(s)</li>
                <li>6. Verify isolation (prove dead - see Section 04)</li>
                <li>7. Perform the work</li>
                <li>8. Remove tools, replace guards, prepare for restart</li>
                <li>9. Remove YOUR lock and tag when YOU are clear</li>
                <li>10. Only re-energise when ALL locks removed and area confirmed clear</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Never remove someone else's lock. If a lock owner is absent and re-energisation is urgent, follow emergency procedures - which require senior authorisation, documented attempts to contact the owner, and physical verification all workers are clear.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ----------------------------------------
            CONTENT SECTION 04 - Safe Isolation
            ---------------------------------------- */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Safe Isolation Procedure (GS38)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Safe isolation is the procedure for making electrical equipment dead before work begins. HSE Guidance Note GS38 provides the standard for this procedure, including requirements for test equipment. This procedure must be followed for ALL electrical work where equipment will be worked on - it's the foundation of electrical safety.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The safe isolation sequence:</p>
              <div className="space-y-2">
                <div className="p-2 rounded bg-white/5 flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow flex items-center justify-center text-xs font-bold">1</span>
                  <span className="text-sm">Identify the circuit/equipment to be isolated</span>
                </div>
                <div className="p-2 rounded bg-white/5 flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow flex items-center justify-center text-xs font-bold">2</span>
                  <span className="text-sm">Isolate - switch off and withdraw fuse or lock MCB/isolator</span>
                </div>
                <div className="p-2 rounded bg-white/5 flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow flex items-center justify-center text-xs font-bold">3</span>
                  <span className="text-sm">Secure - apply lock-off device and warning tag</span>
                </div>
                <div className="p-2 rounded bg-white/5 flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow flex items-center justify-center text-xs font-bold">4</span>
                  <span className="text-sm">Prove the voltage indicator on known live source</span>
                </div>
                <div className="p-2 rounded bg-white/5 flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow flex items-center justify-center text-xs font-bold">5</span>
                  <span className="text-sm">Test at point of work - L-N, L-E, N-E (all phases on 3-phase)</span>
                </div>
                <div className="p-2 rounded bg-white/5 flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow flex items-center justify-center text-xs font-bold">6</span>
                  <span className="text-sm">Re-prove voltage indicator on known live source</span>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-elec-yellow/80 mb-2">GS38 Test Equipment Requirements</p>
                <ul className="text-white/90 space-y-0.5 text-xs">
                  <li>- Two-pole voltage indicator recommended</li>
                  <li>- Max 4mm exposed probe tips</li>
                  <li>- Fused test leads</li>
                  <li>- Finger guards on probes</li>
                  <li>- Appropriate CAT rating for equipment</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-elec-yellow/80 mb-2">Why Prove Before AND After?</p>
                <ul className="text-white/90 space-y-0.5 text-xs">
                  <li>- Proving BEFORE confirms VI is working</li>
                  <li>- A 'dead' reading could be instrument failure</li>
                  <li>- Proving AFTER confirms VI was working during test</li>
                  <li>- Both readings correct = confidence circuit is dead</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Real incident:</strong> An electrician tested a circuit "dead" but didn't prove his tester. When he cut into the cable, it was live - the tester's battery had failed. He received serious burns. Had he proved the tester before and after, he would have discovered it wasn't working.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> NEVER trust a single test. Prove-test-prove is the minimum safe procedure. Your life depends on your tester working - verify it every single time.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* ----------------------------------------
            PRACTICAL GUIDANCE
            ---------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">On Domestic Work</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>- Formal permits usually not required, but safe isolation always is</li>
                <li>- Isolate at the consumer unit - lock off the MCB</li>
                <li>- If isolating at main switch, inform the customer</li>
                <li>- ALWAYS prove-test-prove, even for "simple" jobs</li>
                <li>- Consider isolation upstream for consumer unit work (DNO cut-out)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">On Commercial/Industrial Sites</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>- Follow the site's permit to work system where required</li>
                <li>- Multiple isolation points may be needed - identify ALL sources</li>
                <li>- Coordinate with duty holders and other trades</li>
                <li>- Higher fault levels increase arc flash risk during testing</li>
                <li>- Document all isolations and test results</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Not proving the tester</strong> - "It was working yesterday" isn't good enough</li>
                <li><strong>Testing at the wrong location</strong> - Test at point of work, not just the DB</li>
                <li><strong>Relying on labels</strong> - Circuit charts can be wrong; always verify</li>
                <li><strong>Using someone else's lock</strong> - Only YOUR lock gives YOU control</li>
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
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference - Safe Systems of Work</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Safe Isolation Steps</p>
                <ul className="space-y-0.5">
                  <li>1. Identify circuit/equipment</li>
                  <li>2. Isolate at appropriate point</li>
                  <li>3. Secure with lock and tag</li>
                  <li>4. Prove voltage indicator</li>
                  <li>5. Test dead at point of work</li>
                  <li>6. Re-prove voltage indicator</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">LOTO Principles</p>
                <ul className="space-y-0.5">
                  <li>Each worker applies own lock</li>
                  <li>Only you remove YOUR lock</li>
                  <li>Tags provide information, not protection</li>
                  <li>Multi-lock hasp for team work</li>
                  <li>Never bypass emergency procedures</li>
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
            <Link to="/study-centre/apprentice/level3-module1-section2-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Dynamic Risk Assessments
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module1-section3">
              Next: Section 3
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module1Section2_5;
