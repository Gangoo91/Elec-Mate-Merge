/**
 * Level 3 Module 1 Section 2.1 - Five Steps to Risk Assessment
 *
 * Covers: Identify hazards, Evaluate risks, Control measures, Record findings, Review
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
const TITLE = "Five Steps to Risk Assessment - Level 3 Module 1 Section 2.1";
const DESCRIPTION = "Master the HSE's 5-step risk assessment process for electrical work: identify hazards, decide who might be harmed, evaluate risks, record findings, and review regularly.";

// ============================================
// INLINE CHECK QUESTIONS (4 per page)
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the FIRST step in the HSE's 5-step risk assessment process?",
    options: [
      "Evaluate the risks and decide on precautions",
      "Identify the hazards",
      "Record your significant findings",
      "Review and update the assessment"
    ],
    correctIndex: 1,
    explanation: "Step 1 is always to identify the hazards. You cannot evaluate or control risks until you know what hazards exist in the workplace or for the specific task."
  },
  {
    id: "check-2",
    question: "When identifying 'who might be harmed', which groups must you consider?",
    options: [
      "Only the electricians doing the work",
      "Only employees on the company payroll",
      "Workers, contractors, visitors, public, and vulnerable groups",
      "Only people in the immediate work area"
    ],
    correctIndex: 2,
    explanation: "Step 2 requires considering ALL people who might be affected: employees, contractors, visitors, members of the public, and particularly vulnerable groups like young workers, pregnant women, or those with disabilities."
  },
  {
    id: "check-3",
    question: "At what employee threshold must risk assessment findings be recorded in writing?",
    options: [
      "All employers must record in writing",
      "3 or more employees",
      "5 or more employees",
      "10 or more employees"
    ],
    correctIndex: 2,
    explanation: "Employers with 5 or more employees must record their significant findings in writing. However, it's good practice for ALL employers to document their risk assessments regardless of size."
  },
  {
    id: "check-4",
    question: "Which of these is a valid trigger for reviewing a risk assessment?",
    options: [
      "A worker takes annual leave",
      "The weather changes",
      "A near miss or accident occurs",
      "It's the start of a new week"
    ],
    correctIndex: 2,
    explanation: "Near misses and accidents are key triggers for review as they indicate existing controls may be inadequate. Other triggers include new equipment, changed procedures, new hazard information, or legislative changes."
  }
];

// ============================================
// QUIZ QUESTIONS (12 questions)
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "Which regulation specifically requires employers to conduct risk assessments?",
    options: [
      "Electricity at Work Regulations 1989",
      "Management of Health and Safety at Work Regulations 1999",
      "Health and Safety at Work Act 1974",
      "Construction (Design and Management) Regulations 2015"
    ],
    correctAnswer: 1,
    explanation: "The Management of Health and Safety at Work Regulations 1999 (Regulation 3) specifically requires employers to conduct 'suitable and sufficient' risk assessments for all work activities that could affect employees or others."
  },
  {
    id: 2,
    question: "What does the term 'suitable and sufficient' mean in relation to risk assessments?",
    options: [
      "The assessment must be signed by a manager",
      "The assessment must identify all significant hazards and determine appropriate controls",
      "The assessment must be at least three pages long",
      "The assessment must be completed by a health and safety professional"
    ],
    correctAnswer: 1,
    explanation: "'Suitable and sufficient' means the assessment must properly identify all significant hazards, consider who might be harmed, evaluate the level of risk, and determine appropriate control measures. It doesn't need to be perfect, but it must be thorough and proportionate."
  },
  {
    id: 3,
    question: "When identifying hazards for electrical work, which of these would NOT typically be considered?",
    options: [
      "Electric shock from contact with live parts",
      "Arc flash from switching operations",
      "The electrician's journey to work",
      "Falls from working at height to access equipment"
    ],
    correctAnswer: 2,
    explanation: "Risk assessments focus on work activities and the workplace. An electrician's commute to work is not part of the work activity being assessed. However, shock, arc flash, and falls from height are all significant hazards associated with electrical work."
  },
  {
    id: 4,
    question: "In Step 2, why is it important to consider 'vulnerable groups'?",
    options: [
      "They are more likely to cause accidents",
      "They may face additional or different risks requiring extra precautions",
      "They are legally required to be mentioned",
      "Insurance companies require their identification"
    ],
    correctAnswer: 1,
    explanation: "Vulnerable groups (young workers, pregnant women, disabled workers, those with language barriers) may face additional risks or be unable to respond to hazards in the same way. Extra precautions may be needed to protect them adequately."
  },
  {
    id: 5,
    question: "What is the correct formula for calculating risk level?",
    options: [
      "Risk = Hazard + Exposure",
      "Risk = Likelihood x Severity",
      "Risk = Severity - Controls",
      "Risk = Hazard x Time"
    ],
    correctAnswer: 1,
    explanation: "Risk is calculated by multiplying Likelihood (probability of harm occurring) by Severity (how serious the harm would be). This gives a risk rating that helps prioritise which risks need the most urgent attention."
  },
  {
    id: 6,
    question: "On a 5x5 risk matrix, a score of 20 (likelihood 4 x severity 5) would typically indicate:",
    options: [
      "Low risk - manage by routine procedures",
      "Medium risk - look to improve when possible",
      "High risk - take action to reduce before work continues",
      "Acceptable risk - no action required"
    ],
    correctAnswer: 2,
    explanation: "A score of 20 typically falls into the 'High risk' category on a 5x5 matrix. This requires action to reduce the risk before work can safely continue. Scores of 17-25 are often classed as 'intolerable' requiring immediate action."
  },
  {
    id: 7,
    question: "What information must be included when recording significant findings?",
    options: [
      "Only the hazards identified",
      "Hazards, who's at risk, existing controls, and any further action needed",
      "Only the control measures in place",
      "Only details of who completed the assessment"
    ],
    correctAnswer: 1,
    explanation: "A proper record must document the hazards identified, who might be harmed and how, existing control measures, evaluation of residual risk, any further controls required, who is responsible for actions, and review dates."
  },
  {
    id: 8,
    question: "How long should risk assessment records typically be retained?",
    options: [
      "1 year only",
      "Until the next assessment",
      "3-5 years minimum, longer for work with long-term health effects",
      "They can be discarded once reviewed"
    ],
    correctAnswer: 2,
    explanation: "While there's no specific legal retention period, 3-5 years is recommended as good practice. For work that could cause long-term health effects (e.g., asbestos exposure), records should be kept for 40 years."
  },
  {
    id: 9,
    question: "Which of these would NOT typically trigger a review of a risk assessment?",
    options: [
      "An accident or near miss occurs",
      "New equipment is introduced",
      "A new apprentice joins the team",
      "The work procedure changes significantly"
    ],
    correctAnswer: 2,
    explanation: "A new apprentice joining doesn't automatically trigger a review, though supervision arrangements might be considered. Triggers include accidents, near misses, new equipment, changed procedures, new hazard information, and routine periodic reviews."
  },
  {
    id: 10,
    question: "What is the primary purpose of reviewing risk assessments regularly?",
    options: [
      "To satisfy insurance requirements",
      "To ensure assessments remain valid and controls are still effective",
      "To create more paperwork",
      "To provide evidence for clients"
    ],
    correctAnswer: 1,
    explanation: "Reviews ensure that risk assessments remain valid as circumstances change. Controls that were effective may become inadequate, new hazards may emerge, or better control methods may become available. Regular review keeps protection current."
  },
  {
    id: 11,
    question: "Can workers be prosecuted for not following risk assessment controls?",
    options: [
      "No, only employers can be prosecuted",
      "Yes, under Section 7 of HASWA 1974",
      "Only supervisors can be prosecuted",
      "Only if an accident occurs"
    ],
    correctAnswer: 1,
    explanation: "Under Section 7 of the Health and Safety at Work Act 1974, employees must take reasonable care for their own safety and cooperate with employers on health and safety. Deliberately ignoring risk assessment controls could result in personal prosecution."
  },
  {
    id: 12,
    question: "What is the relationship between generic and task-specific risk assessments?",
    options: [
      "Generic assessments replace task-specific ones",
      "Task-specific assessments replace generic ones",
      "Generic assessments cover routine work; task-specific cover unique situations",
      "They are the same thing with different names"
    ],
    correctAnswer: 2,
    explanation: "Generic risk assessments cover routine activities with similar hazards (e.g., standard socket installation). Task-specific assessments are needed for unique situations, complex jobs, or when site conditions differ significantly from the generic assessment assumptions."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "Do I need a new risk assessment for every single job?",
    answer: "Not necessarily. Generic risk assessments can cover routine activities with similar hazards (e.g., standard domestic socket installation). However, you must review the generic assessment for each job to ensure site-specific conditions don't introduce additional hazards. Task-specific assessments are needed for complex or unusual work."
  },
  {
    question: "What's the difference between a hazard and a risk?",
    answer: "A hazard is something with the potential to cause harm (e.g., exposed live conductors, working at height). A risk is the likelihood of that harm actually occurring combined with how severe it would be. Risk assessment evaluates risks, not just identifies hazards. The same hazard can present different risk levels depending on circumstances."
  },
  {
    question: "Who is responsible for conducting risk assessments?",
    answer: "The employer has the legal duty to ensure risk assessments are completed. However, the actual assessment can be done by any competent person - typically someone with knowledge of the work, the hazards involved, and the legal requirements. For electrical work, this is often a qualified electrician or supervisor."
  },
  {
    question: "Can I be penalised for identifying too many hazards?",
    answer: "No - thorough hazard identification is expected and valued. However, focus on significant hazards rather than trivial ones. The goal is to identify hazards that could realistically cause harm, not to list every theoretical possibility. A good assessment is thorough but proportionate to the actual risks."
  },
  {
    question: "How often should risk assessments be formally reviewed?",
    answer: "There's no fixed legal frequency, but annual review is common good practice for most work activities. High-risk activities may need more frequent review. Reviews should also be triggered by accidents, near misses, equipment changes, procedure changes, or new hazard information - don't wait for the scheduled review if circumstances change."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module1Section2_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">

      {/* ========================================
          STICKY HEADER - Minimal back navigation
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
            HEADER - Centered title with badge
            ---------------------------------------- */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 1.2.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Five Steps to Risk Assessment
          </h1>
          <p className="text-white/80">
            The systematic process for identifying hazards and controlling risks on every job
          </p>
        </header>

        {/* ----------------------------------------
            QUICK SUMMARY BOXES
            ---------------------------------------- */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Step 1:</strong> Identify the hazards present</li>
              <li><strong>Step 2:</strong> Decide who might be harmed and how</li>
              <li><strong>Step 3:</strong> Evaluate risks and decide on precautions</li>
              <li><strong>Step 4:</strong> Record your significant findings</li>
              <li><strong>Step 5:</strong> Review and update regularly</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Hazards before starting any work - walk the site</li>
              <li><strong>Use:</strong> 5-step process systematically, every time</li>
              <li><strong>Apply:</strong> Risk = Likelihood x Severity to prioritise actions</li>
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
              "Apply the HSE's 5-step risk assessment process to electrical work",
              "Identify electrical hazards and who might be harmed",
              "Calculate risk levels using likelihood and severity",
              "Record significant findings correctly and legally",
              "Know when and why to review risk assessments",
              "Understand employer and employee legal duties"
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
            CONTENT SECTION 01 - Identify Hazards
            ---------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Step 1: Identify the Hazards
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The first step is to identify what could cause harm. A hazard is anything with the potential to cause injury or ill health - it could be a physical object, a substance, a work method, or an environmental condition. For electrical work, hazards are often invisible (you can't see electricity), which makes systematic identification even more critical.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common electrical work hazards include:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>- <strong>Electric shock:</strong> Contact with live conductors - even 230V can kill</li>
                <li>- <strong>Arc flash:</strong> Explosive release of energy during switching or faults</li>
                <li>- <strong>Burns:</strong> From arcing, hot components, or fire caused by faults</li>
                <li>- <strong>Falls:</strong> Accessing equipment at height (distribution boards, cable trays)</li>
                <li>- <strong>Manual handling:</strong> Heavy equipment, cable drums, distribution boards</li>
                <li>- <strong>Confined spaces:</strong> Cable ducts, ceiling voids, switchrooms</li>
                <li>- <strong>Asbestos:</strong> In older installations, especially around old boards</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">How to identify hazards effectively:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>- Walk around the work area before starting - look for obvious dangers</li>
                <li>- Review manufacturer instructions and safety data sheets</li>
                <li>- Check accident records - what has gone wrong before?</li>
                <li>- Talk to workers who do the job - they know the real hazards</li>
                <li>- Consider non-routine operations (maintenance, breakdowns, emergencies)</li>
                <li>- Think about what could go wrong, not just normal operations</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Focus on significant hazards that could cause real harm. Don't get bogged down listing trivial risks that are already adequately controlled, but equally don't dismiss hazards because "it's never happened before."
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ----------------------------------------
            CONTENT SECTION 02 - Who Might Be Harmed
            ---------------------------------------- */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Step 2: Decide Who Might Be Harmed and How
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              This step requires thinking beyond just the person doing the work. Electrical hazards can affect anyone in the vicinity - and the consequences of getting this wrong can be fatal for people who weren't even aware work was happening.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">People to Consider</p>
                <ul className="text-sm text-white space-y-1">
                  <li>- Electricians doing the work</li>
                  <li>- Apprentices under supervision</li>
                  <li>- Other contractors on site</li>
                  <li>- Building occupants and staff</li>
                  <li>- Visitors and members of the public</li>
                  <li>- Maintenance and cleaning staff</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Vulnerable Groups Needing Extra Consideration</p>
                <ul className="text-sm text-white space-y-1">
                  <li>- Young workers (under 18) - less experience</li>
                  <li>- Pregnant women - certain exposures</li>
                  <li>- Disabled workers - evacuation, access</li>
                  <li>- Workers with language barriers</li>
                  <li>- Lone workers - no immediate help available</li>
                  <li>- Those with pacemakers - EMF exposure</li>
                </ul>
              </div>
            </div>

            <p>
              For each hazard, consider HOW people might be harmed. A distribution board presents different risks depending on whether someone is walking past it, cleaning near it, or working inside it. The same hazard can harm different people in different ways.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> During a consumer unit change in a busy office, the electrician faces shock and arc flash risks. Office workers could be harmed by trailing leads, tools left on stairs, or if isolation fails. The cleaner arriving at 6pm might not know work is happening and could contact exposed wiring.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ----------------------------------------
            CONTENT SECTION 03 - Evaluate and Control
            ---------------------------------------- */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Step 3: Evaluate Risks and Decide on Precautions
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Now you evaluate each hazard to determine the level of risk. Risk is calculated by considering both how likely harm is to occur (likelihood) and how serious that harm would be (severity). This helps prioritise which risks need the most urgent attention.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Risk Calculation: Likelihood x Severity</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-elec-yellow/80 mb-2">Likelihood Scale (1-5)</p>
                  <ul className="text-white/90 space-y-0.5 text-xs">
                    <li>1 = Rare - hardly ever happens</li>
                    <li>2 = Unlikely - could happen but unusual</li>
                    <li>3 = Possible - might happen sometimes</li>
                    <li>4 = Likely - will probably happen</li>
                    <li>5 = Almost certain - expected to happen</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-elec-yellow/80 mb-2">Severity Scale (1-5)</p>
                  <ul className="text-white/90 space-y-0.5 text-xs">
                    <li>1 = Insignificant - first aid only</li>
                    <li>2 = Minor - medical treatment needed</li>
                    <li>3 = Moderate - lost time injury</li>
                    <li>4 = Major - serious injury, disability</li>
                    <li>5 = Catastrophic - fatality or multiple serious</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Risk Rating Categories:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>- <strong>1-4 (Low):</strong> Acceptable - manage by routine procedures</li>
                <li>- <strong>5-9 (Medium):</strong> Tolerable - monitor and look to improve</li>
                <li>- <strong>10-16 (High):</strong> Substantial - take action to reduce before proceeding</li>
                <li>- <strong>17-25 (Extreme):</strong> Intolerable - stop work until risk is reduced</li>
              </ul>
            </div>

            <p>
              Once risks are evaluated, decide on precautions using the hierarchy of controls. Always try to eliminate the hazard first. If that's not possible, work down through substitution, engineering controls, administrative controls, and finally PPE as a last resort.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> The law requires risks to be reduced "so far as is reasonably practicable" (SFAIRP). This means balancing the risk against the time, cost, and effort of control measures. A high risk requires more effort to control than a low risk.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ----------------------------------------
            CONTENT SECTION 04 - Record and Review
            ---------------------------------------- */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Steps 4 & 5: Record Findings and Review Regularly
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              If you employ 5 or more people, you must record the significant findings of your risk assessment in writing. Even with fewer employees, written records are good practice - they demonstrate compliance, help with training, and provide a basis for review. A good record shows that you properly assessed risks and implemented appropriate controls.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">What to record:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>- The hazards identified (significant ones, not trivial)</li>
                <li>- Who might be harmed and how</li>
                <li>- What controls are already in place</li>
                <li>- The risk rating with current controls</li>
                <li>- Any additional controls needed</li>
                <li>- Who is responsible for implementing actions</li>
                <li>- Target dates for actions</li>
                <li>- Date of assessment and assessor's name</li>
                <li>- Review date</li>
              </ul>
            </div>

            <p>
              <strong>Step 5 - Review:</strong> Risk assessments are not one-off exercises. They must be reviewed regularly to ensure they remain valid. Circumstances change - new equipment, different methods, new hazard information, or simply the passage of time can make an assessment outdated.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white mb-1">Routine Review</p>
                <p className="text-white/90 text-xs">Annually for most work, more frequently for high-risk activities</p>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white mb-1">Triggered Review</p>
                <p className="text-white/90 text-xs">After accidents, near misses, or significant changes</p>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white mb-1">Continuous</p>
                <p className="text-white/90 text-xs">Dynamic assessment as conditions change on site</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> A risk assessment dated five years ago for "electrical work" won't satisfy an HSE inspector investigating an accident. Assessments must be specific, current, and demonstrably reviewed.
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
                <li>- Generic assessments work for routine jobs (socket installation, light fitting)</li>
                <li>- Review the generic for each job - is anything different on this site?</li>
                <li>- Consider: pets, children, elderly residents who might be affected</li>
                <li>- Document any site-specific hazards you identify</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">On Commercial/Industrial Sites</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>- Task-specific assessments often required by principal contractors</li>
                <li>- Coordinate with site safety rules and permit systems</li>
                <li>- Consider interaction with other trades working simultaneously</li>
                <li>- Higher fault levels and arc flash risks require specific assessment</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Copy-paste without review</strong> - Generic assessments used without site-specific consideration</li>
                <li><strong>Focusing only on electrical hazards</strong> - Forgetting manual handling, height, confined spaces</li>
                <li><strong>Not involving workers</strong> - The people doing the job know the real hazards</li>
                <li><strong>Assessing and forgetting</strong> - Never reviewing or updating assessments</li>
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
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference - The 5 Steps</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">The Process</p>
                <ul className="space-y-0.5">
                  <li>1. Identify hazards (walk around, check records)</li>
                  <li>2. Who might be harmed (all groups, not just workers)</li>
                  <li>3. Evaluate and control (likelihood x severity)</li>
                  <li>4. Record findings (5+ employees = legal duty)</li>
                  <li>5. Review regularly (and after any changes)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Legal Points</p>
                <ul className="space-y-0.5">
                  <li>MHSWR 1999 Reg 3 - duty to assess</li>
                  <li>"Suitable and sufficient" standard</li>
                  <li>5+ employees must record in writing</li>
                  <li>SFAIRP - so far as reasonably practicable</li>
                  <li>Employees must cooperate (HASWA s.7)</li>
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
            <Link to="/study-centre/apprentice/level3-module1-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 2
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module1-section2-2">
              Next: Method Statements
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module1Section2_1;
