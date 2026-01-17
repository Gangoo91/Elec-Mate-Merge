/**
 * Level 3 Module 1 Section 2.4 - Dynamic Risk Assessments on Site
 *
 * Covers: Real-time hazard assessment, changing conditions, stop-work authority
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
const TITLE = "Dynamic Risk Assessments on Site - Level 3 Module 1 Section 2.4";
const DESCRIPTION = "Learn how to conduct dynamic risk assessments during electrical work: recognising changing conditions, real-time hazard evaluation, and exercising stop-work authority when conditions become unsafe.";

// ============================================
// INLINE CHECK QUESTIONS (4 per page)
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is a dynamic risk assessment?",
    options: [
      "A formal written document completed before work starts",
      "A continuous mental process of assessing hazards as conditions change",
      "An assessment done after an accident occurs",
      "An assessment completed only by supervisors"
    ],
    correctIndex: 1,
    explanation: "A dynamic risk assessment is a continuous mental process where workers constantly evaluate their environment for new or changing hazards as they work. It complements but doesn't replace formal written assessments."
  },
  {
    id: "check-2",
    question: "When should you stop work and reassess the situation?",
    options: [
      "Only when your supervisor tells you to",
      "Only when an accident has occurred",
      "When conditions change or you identify a hazard not covered by existing controls",
      "Never - the original risk assessment covers everything"
    ],
    correctIndex: 2,
    explanation: "You should stop and reassess whenever conditions change from those assumed in the original risk assessment, or when you identify a new hazard. This is a fundamental part of dynamic risk assessment."
  },
  {
    id: "check-3",
    question: "The 'SLAM' technique stands for:",
    options: [
      "Stop, Look, Assess, Manage",
      "Slow, Learn, Act, Move",
      "Safety, Legislation, Assessment, Method",
      "Start, Lead, Arrange, Monitor"
    ],
    correctIndex: 0,
    explanation: "SLAM stands for Stop, Look, Assess, Manage. It's a quick mental checklist for dynamic risk assessment: Stop before acting, Look for hazards, Assess the risks, and Manage the situation safely."
  },
  {
    id: "check-4",
    question: "Who has the authority to stop work when conditions become unsafe?",
    options: [
      "Only the site manager",
      "Only qualified electricians",
      "Everyone - every worker has stop-work authority for safety",
      "Only HSE inspectors"
    ],
    correctIndex: 2,
    explanation: "Every worker has the right and responsibility to stop work when they believe conditions are unsafe. This 'stop-work authority' is fundamental to safety culture - no job is so urgent it can't be done safely."
  }
];

// ============================================
// QUIZ QUESTIONS (12 questions)
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "What is the key difference between a formal risk assessment and a dynamic risk assessment?",
    options: [
      "Formal assessments are written; dynamic are ongoing mental evaluations during work",
      "Formal assessments are for big jobs; dynamic are for small jobs",
      "Formal assessments are legal requirements; dynamic are optional",
      "There is no difference"
    ],
    correctAnswer: 0,
    explanation: "Formal risk assessments are documented evaluations completed before work starts. Dynamic risk assessments are continuous mental processes during work, evaluating changing conditions in real-time. Both are needed - one doesn't replace the other."
  },
  {
    id: 2,
    question: "You arrive at a domestic job and find the consumer unit is in a small, damp cellar with limited access. This wasn't mentioned during the quote. What should you do?",
    options: [
      "Complete the work as quoted - the customer is waiting",
      "Stop, reassess the risks, and determine if additional controls are needed",
      "Refuse the job entirely",
      "Complete the work faster to get out of the cellar quickly"
    ],
    correctAnswer: 1,
    explanation: "This is a classic dynamic risk assessment scenario. Conditions differ from what was expected, so you must stop, reassess the risks (confined space, damp, access), determine what additional controls are needed, and proceed only when safe to do so."
  },
  {
    id: 3,
    question: "Which of these is NOT a trigger for dynamic risk assessment?",
    options: [
      "Weather conditions changing",
      "Discovering unexpected hazards during work",
      "The time reaching 12 o'clock midday",
      "Other trades working in the same area"
    ],
    correctAnswer: 2,
    explanation: "The time of day alone is not a trigger for dynamic reassessment. However, weather changes, unexpected hazards, and interaction with other workers are all situations requiring you to stop and reassess the risks."
  },
  {
    id: 4,
    question: "During a cable installation, you notice water dripping from the ceiling onto electrical equipment. What's the correct response?",
    options: [
      "Cover the equipment with plastic and continue",
      "Work faster to complete before more water accumulates",
      "Stop work immediately, make the area safe, and report the hazard",
      "It's not your responsibility - continue with the installation"
    ],
    correctAnswer: 2,
    explanation: "Water near electrical equipment creates immediate danger. Stop work, make the area safe (isolate if necessary), establish barriers if needed, and report the hazard. This is exactly what dynamic risk assessment is for - responding to unexpected hazards."
  },
  {
    id: 5,
    question: "The SLAM technique is used for:",
    options: [
      "Installing consumer units",
      "Quick mental assessment of hazards before and during tasks",
      "Calculating fault current",
      "Completing formal risk assessment documentation"
    ],
    correctAnswer: 1,
    explanation: "SLAM (Stop, Look, Assess, Manage) is a simple mental technique for dynamic risk assessment. It helps workers quickly evaluate hazards before starting tasks and continuously during work."
  },
  {
    id: 6,
    question: "Your formal risk assessment identified working at height as a hazard and specified using a step ladder. On site, you find the step ladder won't reach safely. What should you do?",
    options: [
      "Stand on a chair or table to reach",
      "Stretch from the step ladder even though it's unsafe",
      "Stop, reassess, and obtain suitable access equipment before proceeding",
      "Ask the customer if they have a taller ladder"
    ],
    correctAnswer: 2,
    explanation: "The original control (step ladder) is inadequate. Dynamic risk assessment means recognising this and stopping until suitable access equipment is available. Never improvise with unsuitable equipment just to complete a job."
  },
  {
    id: 7,
    question: "What is 'situational awareness' in the context of dynamic risk assessment?",
    options: [
      "Knowing your location on site",
      "Being alert to your surroundings and recognising changing conditions or new hazards",
      "Awareness of what time it is",
      "Knowing who else is on site"
    ],
    correctAnswer: 1,
    explanation: "Situational awareness means being constantly alert to your environment - noticing changes, recognising new hazards as they appear, and understanding how conditions might affect your safety. It's essential for effective dynamic risk assessment."
  },
  {
    id: 8,
    question: "A customer asks you to complete additional work not included in the original scope. From a dynamic risk assessment perspective, what should you consider?",
    options: [
      "Just complete it to keep the customer happy",
      "Whether the new work introduces hazards not covered by existing assessments",
      "Only the additional cost",
      "Nothing - variations are normal"
    ],
    correctAnswer: 1,
    explanation: "Additional work may introduce new hazards not considered in your original risk assessment. You must evaluate whether the new tasks require additional controls, PPE, or a revised method statement before proceeding."
  },
  {
    id: 9,
    question: "You're working in a commercial building when fire alarms activate. What should you do?",
    options: [
      "Continue working - it's probably a drill",
      "Stop work immediately, make equipment safe, and evacuate following the fire procedure",
      "Wait to see if it stops",
      "Finish the current task first"
    ],
    correctAnswer: 1,
    explanation: "Fire alarms require immediate response regardless of whether it might be a drill. Stop work, make equipment safe (isolate if possible), and evacuate. Dynamic risk assessment includes responding appropriately to emergency situations."
  },
  {
    id: 10,
    question: "Which personal factor should you consider in a dynamic risk assessment?",
    options: [
      "Your favourite football team",
      "Fatigue, illness, or anything affecting your concentration",
      "What you're having for lunch",
      "How long until you finish for the day"
    ],
    correctAnswer: 1,
    explanation: "Personal factors like fatigue, illness, stress, or medication can significantly affect your ability to work safely. Dynamic risk assessment includes honestly evaluating whether you're fit to do the work - if not, stop and address the issue."
  },
  {
    id: 11,
    question: "What should you do if you stop work due to safety concerns and your supervisor pressures you to continue?",
    options: [
      "Continue working - the supervisor knows best",
      "Explain your concerns clearly and don't continue until satisfied it's safe",
      "Walk off site immediately",
      "File a complaint before continuing"
    ],
    correctAnswer: 1,
    explanation: "Explain your safety concerns clearly and specifically. If you're not satisfied the work can be done safely, you have the legal right (under HASWA Section 7) to refuse unsafe work. Good supervisors will listen to valid safety concerns."
  },
  {
    id: 12,
    question: "After completing a task, why is it worth reflecting on how it went from a safety perspective?",
    options: [
      "It's not worth it - the job is done",
      "To identify lessons learned and improve future risk assessments",
      "Only if an accident occurred",
      "Only if required by the supervisor"
    ],
    correctAnswer: 1,
    explanation: "Reflection after work helps identify what went well and what could be improved. If you encountered unexpected hazards, this information should feed back into future formal risk assessments. Learning from experience improves safety over time."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "Does dynamic risk assessment replace the formal written risk assessment?",
    answer: "No. Dynamic risk assessment complements formal assessments - it doesn't replace them. The formal assessment identifies foreseeable hazards and establishes controls before work starts. Dynamic assessment handles the unexpected - the things that couldn't be foreseen or that change during the work."
  },
  {
    question: "How do I document a dynamic risk assessment?",
    answer: "Dynamic assessments are typically not formally documented in the same way as written risk assessments. However, if you identify significant new hazards or make substantial changes to the work method, you should record this - at minimum, tell your supervisor. Some sites have systems for recording dynamic assessments or 'near miss' reports."
  },
  {
    question: "What if I'm not sure whether something is a hazard?",
    answer: "If in doubt, treat it as a hazard. Stop, assess, and if you're still uncertain, seek advice from someone more experienced or your supervisor. It's always better to be cautious than to continue with uncertainty. Never feel embarrassed about asking - that caution could save your life."
  },
  {
    question: "Can I be disciplined for stopping work?",
    answer: "Under the Health and Safety at Work Act 1974 (Section 7), you have a legal duty to take reasonable care of yourself and others. If you genuinely believe work cannot continue safely, you're protected in stopping. However, you should be able to explain your concerns clearly. Document them if possible."
  },
  {
    question: "How often should I be doing dynamic risk assessment?",
    answer: "Continuously. Dynamic risk assessment isn't a one-time activity - it's an ongoing awareness throughout the work. Every time conditions change, you encounter something unexpected, or you move to a different task or location, you should be mentally assessing the hazards."
  },
  {
    question: "What's the difference between dynamic risk assessment and 'working safely'?",
    answer: "Dynamic risk assessment is the mental process behind working safely. It's the conscious evaluation of hazards that enables you to make good decisions. Simply 'being careful' isn't enough - you need to actively think about what could go wrong and how to prevent it."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module1Section2_4 = () => {
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
            <span>Module 1.2.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Dynamic Risk Assessments on Site
          </h1>
          <p className="text-white/80">
            The ongoing mental process of spotting hazards as conditions change
          </p>
        </header>

        {/* ----------------------------------------
            QUICK SUMMARY BOXES
            ---------------------------------------- */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>What:</strong> Continuous mental assessment of hazards</li>
              <li><strong>When:</strong> Throughout the job, whenever conditions change</li>
              <li><strong>Why:</strong> Site conditions differ from the plan</li>
              <li><strong>How:</strong> SLAM - Stop, Look, Assess, Manage</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Changes from expected conditions</li>
              <li><strong>Use:</strong> SLAM technique before and during tasks</li>
              <li><strong>Apply:</strong> Stop-work authority when unsafe</li>
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
              "Understand what dynamic risk assessment is and why it matters",
              "Apply the SLAM technique for real-time hazard evaluation",
              "Recognise triggers that require you to stop and reassess",
              "Exercise stop-work authority confidently when needed",
              "Maintain situational awareness throughout work activities",
              "Feed lessons learned back into formal assessments"
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
            CONTENT SECTION 01 - What is Dynamic RA
            ---------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What is Dynamic Risk Assessment?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A dynamic risk assessment is a continuous, mental process of identifying hazards and evaluating risks in real-time as you work. Unlike formal written risk assessments completed before work starts, dynamic assessment happens on the job - it's about staying alert to changing conditions and responding appropriately.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Why dynamic assessment matters:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>- <strong>Sites differ from the plan:</strong> What you find may not match the survey or description</li>
                <li>- <strong>Conditions change:</strong> Weather, other workers, equipment failures</li>
                <li>- <strong>New hazards appear:</strong> Unexpected discoveries during the work</li>
                <li>- <strong>Written assessments can't cover everything:</strong> Some hazards are unforeseeable</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-elec-yellow/80 mb-2">Formal Risk Assessment</p>
                <ul className="text-white/90 space-y-0.5 text-xs">
                  <li>- Done before work starts</li>
                  <li>- Written and documented</li>
                  <li>- Based on foreseeable hazards</li>
                  <li>- Reviewed periodically</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-elec-yellow/80 mb-2">Dynamic Risk Assessment</p>
                <ul className="text-white/90 space-y-0.5 text-xs">
                  <li>- Done continuously during work</li>
                  <li>- Mental process, usually unwritten</li>
                  <li>- Handles unexpected situations</li>
                  <li>- Active throughout the task</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Dynamic risk assessment doesn't replace formal assessment - it complements it. The formal assessment deals with what you expect; the dynamic assessment deals with what you actually find.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ----------------------------------------
            CONTENT SECTION 02 - SLAM Technique
            ---------------------------------------- */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            The SLAM Technique
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              SLAM is a simple mental checklist that helps structure your dynamic risk assessment. Use it before starting any task, and again whenever conditions change or you encounter something unexpected.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
              <div className="p-3 rounded bg-white/5 text-center">
                <p className="text-2xl font-bold text-elec-yellow mb-1">S</p>
                <p className="font-medium text-white text-sm">Stop</p>
                <p className="text-white/70 text-xs mt-1">Pause before acting</p>
              </div>
              <div className="p-3 rounded bg-white/5 text-center">
                <p className="text-2xl font-bold text-elec-yellow mb-1">L</p>
                <p className="font-medium text-white text-sm">Look</p>
                <p className="text-white/70 text-xs mt-1">Identify the hazards</p>
              </div>
              <div className="p-3 rounded bg-white/5 text-center">
                <p className="text-2xl font-bold text-elec-yellow mb-1">A</p>
                <p className="font-medium text-white text-sm">Assess</p>
                <p className="text-white/70 text-xs mt-1">Evaluate the risks</p>
              </div>
              <div className="p-3 rounded bg-white/5 text-center">
                <p className="text-2xl font-bold text-elec-yellow mb-1">M</p>
                <p className="font-medium text-white text-sm">Manage</p>
                <p className="text-white/70 text-xs mt-1">Control or stop</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Applying SLAM in practice:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Stop:</strong> Before you start a task - or if anything changes - pause and think. Don't rush in.</li>
                <li><strong>Look:</strong> What hazards can you see? What's changed from what you expected? What could go wrong?</li>
                <li><strong>Assess:</strong> How serious are these hazards? Are existing controls adequate? What else is needed?</li>
                <li><strong>Manage:</strong> Implement additional controls, or if you can't manage the risk safely - stop work.</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> You arrive to install a new socket. STOP before starting. LOOK - you notice the floor is wet from a leak. ASSESS - electrical work with a wet floor creates serious shock risk. MANAGE - don't proceed until the leak is fixed and floor dried, or use additional insulating matting and RCD protection.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ----------------------------------------
            CONTENT SECTION 03 - Triggers for Reassessment
            ---------------------------------------- */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Triggers for Stopping and Reassessing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Certain situations should automatically trigger you to stop and reassess. Think of these as 'red flags' that indicate conditions have changed and your original plan may no longer be safe.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key triggers requiring reassessment:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>- <strong>Conditions differ from expected:</strong> Site layout, access, equipment location different from survey</li>
                <li>- <strong>Unexpected hazards:</strong> Asbestos materials, unexpected live circuits, structural issues</li>
                <li>- <strong>Environmental changes:</strong> Weather worsening, lighting changes, water ingress</li>
                <li>- <strong>Interaction with others:</strong> Other trades working in same area, public access</li>
                <li>- <strong>Equipment problems:</strong> Tool failure, PPE damage, test equipment issues</li>
                <li>- <strong>Scope changes:</strong> Customer requests additional work, discovering faults requiring more work</li>
                <li>- <strong>Personal factors:</strong> Feeling unwell, fatigued, distracted, or stressed</li>
                <li>- <strong>Near misses:</strong> Something nearly went wrong - even if it didn't, stop and think why</li>
              </ul>
            </div>

            <div className="p-4 rounded bg-white/5 my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Electrical Trade Example - Unexpected Discovery</p>
              <p className="text-xs text-white/90">
                You're chasing a wall to run a new cable. You break through and see what looks like old insulation material that could be asbestos. STOP immediately. Don't disturb it further. This is a hazard not covered by your original assessment. You need an asbestos survey before proceeding - the work method may need to change completely.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> If in doubt, stop. It's always better to pause and reassess than to continue into danger. The few minutes spent checking are nothing compared to the consequences of getting it wrong.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ----------------------------------------
            CONTENT SECTION 04 - Stop Work Authority
            ---------------------------------------- */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Stop-Work Authority and Responsibility
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Every worker has both the right and the responsibility to stop work when they believe it cannot be done safely. This isn't about being difficult - it's a fundamental safety principle recognised in law under the Health and Safety at Work Act 1974.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Your legal position:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>- <strong>Section 7 HASWA:</strong> You must take reasonable care of your own health and safety</li>
                <li>- <strong>Right to refuse:</strong> You can refuse work you reasonably believe is dangerous</li>
                <li>- <strong>Protected from dismissal:</strong> Refusing genuinely unsafe work is legally protected</li>
                <li>- <strong>Duty to report:</strong> You must report hazards you identify to your employer</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-green-400/80 mb-2">When You Should Stop</p>
                <ul className="text-white/90 space-y-0.5 text-xs">
                  <li>- Conditions are unsafe and can't be controlled</li>
                  <li>- You identify a hazard not covered by controls</li>
                  <li>- Equipment or PPE is inadequate or damaged</li>
                  <li>- You're not competent for the work required</li>
                  <li>- You're unwell, fatigued, or unable to concentrate</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-elec-yellow/80 mb-2">How to Exercise Stop-Work</p>
                <ul className="text-white/90 space-y-0.5 text-xs">
                  <li>- Stop the work safely</li>
                  <li>- Make the area safe (isolate, barriers if needed)</li>
                  <li>- Explain your concerns clearly and specifically</li>
                  <li>- Document if possible</li>
                  <li>- Don't resume until the issue is resolved</li>
                </ul>
              </div>
            </div>

            <p>
              <strong>Dealing with pressure:</strong> You may face pressure to continue work despite concerns. Stand firm on genuine safety issues - explain your concerns clearly and specifically, not just "I don't feel safe." Point to the specific hazard and what controls are missing. Good employers and supervisors will listen; if they don't, you're still protected in refusing.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> No job is so important that it can't be done safely. Anyone who pressures you to take dangerous shortcuts isn't looking out for your wellbeing. Your safety is your responsibility - and you have the right to protect it.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Building Situational Awareness</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>- Get in the habit of scanning your environment regularly</li>
                <li>- Notice what other people are doing nearby</li>
                <li>- Pay attention to changes - sounds, smells, activity levels</li>
                <li>- Ask yourself "what could go wrong here?"</li>
                <li>- Trust your instincts - if something feels wrong, investigate</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Arriving at a New Site</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>- Don't rush to start work - take time to look around first</li>
                <li>- Compare what you see with what you expected</li>
                <li>- Identify emergency exits, first aid, assembly points</li>
                <li>- Note any hazards not mentioned in the risk assessment</li>
                <li>- Check that your planned controls will work in this environment</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Complacency</strong> - "I've done this a hundred times" doesn't mean this time is safe</li>
                <li><strong>Time pressure</strong> - Rushing to meet deadlines leads to shortcuts</li>
                <li><strong>Ignoring instincts</strong> - If something feels wrong, it probably is</li>
                <li><strong>Over-reliance on written assessments</strong> - They can't predict everything</li>
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
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference - Dynamic Risk Assessment</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">SLAM Technique</p>
                <ul className="space-y-0.5">
                  <li>S - Stop before acting</li>
                  <li>L - Look for hazards</li>
                  <li>A - Assess the risks</li>
                  <li>M - Manage safely or stop</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Triggers to Stop</p>
                <ul className="space-y-0.5">
                  <li>Unexpected hazards discovered</li>
                  <li>Conditions differ from plan</li>
                  <li>Equipment/PPE problems</li>
                  <li>Personal factors (fatigue, illness)</li>
                  <li>Near misses occur</li>
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
            <Link to="/study-centre/apprentice/level3-module1-section2-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Hierarchy of Controls
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module1-section2-5">
              Next: Safe Systems of Work
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module1Section2_4;
