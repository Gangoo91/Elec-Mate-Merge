/**
 * Level 3 Module 1 Section 3.3 - Live Working Restrictions
 *
 * Covers: When live working is permitted, legal requirements, risk assessment, and precautions
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
const TITLE = "Live Working Restrictions - Level 3 Module 1 Section 3.3";
const DESCRIPTION = "Understand when live working is permitted, the legal requirements under Electricity at Work Regulations, and the strict precautions required for any live work.";

// ============================================
// INLINE CHECK QUESTIONS (4 per page)
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "According to Regulation 14 of the Electricity at Work Regulations, when is live working permitted?",
    options: [
      "Whenever it's more convenient than isolating",
      "Only when it is unreasonable to work dead AND suitable precautions are taken",
      "Only by qualified supervisors",
      "Live working is never permitted under any circumstances"
    ],
    correctIndex: 1,
    explanation: "Regulation 14 permits live working ONLY when it is unreasonable in all circumstances for the equipment to be dead, AND suitable precautions are taken to prevent injury. Both conditions must be met. Convenience or time-saving is NOT a valid reason."
  },
  {
    id: "check-2",
    question: "An electrician wants to trace a fault by testing on a live circuit. Is this considered live working?",
    options: [
      "No, testing is not considered live working",
      "Yes, any work where there is a risk of contact with live conductors is live working",
      "Only if you touch the conductors",
      "No, because testing instruments provide protection"
    ],
    correctIndex: 1,
    explanation: "Testing, fault-finding, and any activity where there is a foreseeable risk of contact with live conductors is considered live working. The Electricity at Work Regulations apply to ALL such work, regardless of the purpose."
  },
  {
    id: "check-3",
    question: "What makes live testing 'unreasonable to work dead' under the regulations?",
    options: [
      "The customer doesn't want the power turned off",
      "It would take too long to isolate",
      "The circuit must be energised to identify the fault or verify operation",
      "There isn't a lock-off device available"
    ],
    correctIndex: 2,
    explanation: "Testing often requires the circuit to be live to identify faults (e.g., finding where voltage is lost) or verify correct operation. This is a legitimate reason why working dead may be unreasonable. Customer inconvenience or time pressure are NOT valid reasons."
  },
  {
    id: "check-4",
    question: "Who is responsible for ensuring live working precautions are adequate?",
    options: [
      "Only the HSE",
      "The employer and the person doing the work both have duties",
      "Only the site supervisor",
      "The equipment manufacturer"
    ],
    correctIndex: 1,
    explanation: "The Electricity at Work Regulations place duties on both employers (to provide safe systems of work, training, and equipment) AND employees (to cooperate, use precautions, and not work beyond their competence). Both share responsibility for safety."
  }
];

// ============================================
// QUIZ QUESTIONS (12 questions)
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "Under the Electricity at Work Regulations 1989, what must be proven before live working is permitted?",
    options: [
      "That the work will be completed quickly",
      "That it is unreasonable to work dead AND suitable precautions are taken",
      "That the worker has 5+ years experience",
      "That a supervisor has approved it verbally"
    ],
    correctAnswer: 1,
    explanation: "Regulation 14 states that live working is only permitted when it is 'unreasonable in all the circumstances' to work dead, AND adequate precautions are taken to prevent injury. Both conditions must be satisfied - one alone is insufficient."
  },
  {
    id: 2,
    question: "Which of these is a valid reason for live working?",
    options: [
      "The customer cannot be without power during working hours",
      "The circuit must be energised to diagnose the fault",
      "It's quicker than isolating the circuit",
      "The lock-off device doesn't fit the MCB"
    ],
    correctAnswer: 1,
    explanation: "Live testing is often necessary because the circuit must be energised to locate faults or verify operation. Customer convenience, speed, or lack of equipment are NOT valid justifications for live working under the regulations."
  },
  {
    id: 3,
    question: "What documentation is typically required before undertaking planned live work?",
    options: [
      "No documentation is required",
      "A risk assessment and method statement detailing precautions",
      "Only verbal approval from a supervisor",
      "Just the client's signature"
    ],
    correctAnswer: 1,
    explanation: "Planned live work should be supported by a documented risk assessment and method statement. These identify hazards, assess risks, and specify control measures. This demonstrates that the work has been properly planned and that precautions are adequate."
  },
  {
    id: 4,
    question: "What is the minimum competence requirement for live working?",
    options: [
      "Any qualified electrician can do live work",
      "Adequate technical knowledge, experience, and understanding of the specific risks and precautions",
      "Level 3 electrical qualification only",
      "Just supervision by a competent person"
    ],
    correctAnswer: 1,
    explanation: "The Electricity at Work Regulations require persons to be 'competent' - having adequate knowledge, experience, and understanding of the work and associated risks. This varies depending on the complexity and danger of the work. A qualification alone doesn't guarantee competence for specific live work."
  },
  {
    id: 5,
    question: "What is 'accompanied working' in the context of live work?",
    options: [
      "Having a friend on site for company",
      "Working with someone trained and capable of emergency rescue and first aid",
      "Having the client watch the work",
      "Being supervised at all times"
    ],
    correctAnswer: 1,
    explanation: "Accompanied working means having another competent person present who understands the hazards and can provide emergency assistance including isolating the supply and administering first aid or CPR if electric shock occurs. They shouldn't be a passive observer."
  },
  {
    id: 6,
    question: "What does 'suitable precautions' mean for live working?",
    options: [
      "Wearing standard work clothes",
      "Using insulated tools, barriers, PPE, accompanied working, and following safe systems of work",
      "Working carefully",
      "Having insurance"
    ],
    correctAnswer: 1,
    explanation: "Suitable precautions include: insulated tools meeting relevant standards, physical barriers to prevent contact, appropriate PPE, accompanied working, clear work space, proper lighting, avoiding jewellery/conductive items, and following documented safe systems of work."
  },
  {
    id: 7,
    question: "What class of insulated tools should be used for live working on low voltage systems?",
    options: [
      "Class 0",
      "VDE rated tools insulated to 1000V AC",
      "Any tools with rubber handles",
      "Double-insulated power tools"
    ],
    correctAnswer: 1,
    explanation: "VDE rated tools are tested to 10,000V and certified safe for use on systems up to 1000V AC. They have distinctive red/yellow insulation and the VDE mark. Standard tools with rubber handles are NOT adequate protection for live working."
  },
  {
    id: 8,
    question: "Before starting live testing, what should you check about your test equipment?",
    options: [
      "That it's charged",
      "That it's GS38 compliant, in good condition, and appropriate for the voltage and environment",
      "That it's the same brand as last time",
      "Nothing specific"
    ],
    correctAnswer: 1,
    explanation: "Test equipment should meet GS38 requirements (fused leads, shrouded probes, appropriate CAT rating), be in good condition (no damaged insulation, probes intact), and be suitable for the voltage and environment. Pre-use checks are essential safety measures."
  },
  {
    id: 9,
    question: "An apprentice is asked to trace a live fault. What should they do?",
    options: [
      "Proceed if they have been shown how to do it before",
      "Refuse if not competent, or work only under direct supervision appropriate to their competence level",
      "Ask a colleague for advice then proceed alone",
      "Do it quickly to prove their capability"
    ],
    correctAnswer: 1,
    explanation: "The Electricity at Work Regulations require persons to not engage in work beyond their competence. An apprentice should only undertake live work under appropriate supervision matching their competence level, or refuse if they cannot work safely."
  },
  {
    id: 10,
    question: "What is the purpose of shrouded probe tips on test equipment?",
    options: [
      "To make them easier to grip",
      "To prevent accidental contact with adjacent live conductors or earthed metalwork",
      "To protect the probes from damage",
      "To improve accuracy"
    ],
    correctAnswer: 1,
    explanation: "Shrouded probes with limited exposed metal (max 4mm per GS38) prevent accidental short circuits to adjacent conductors and reduce the risk of arc flash. The shrouding protects the user from inadvertent contact during live testing."
  },
  {
    id: 11,
    question: "Why should jewellery and watches be removed before live working?",
    options: [
      "To avoid scratching them",
      "They are conductive and could cause short circuits or act as a path for shock current",
      "They get in the way",
      "It's company policy but not a safety issue"
    ],
    correctAnswer: 1,
    explanation: "Metal jewellery and watches are excellent conductors. They could contact live parts causing short circuits (leading to burns and arc flash) or provide a low-resistance path for current through your body. Remove all conductive items before live work."
  },
  {
    id: 12,
    question: "What should happen if precautions prove inadequate during live work?",
    options: [
      "Continue but work more carefully",
      "Stop work immediately and reassess - don't continue until safe",
      "Call for supervision",
      "Make a note for next time"
    ],
    correctAnswer: 1,
    explanation: "If precautions are found to be inadequate during live work, you must STOP immediately. Continuing puts you at risk. Reassess the situation, implement additional controls, or decide if the work can reasonably continue. Safety takes priority over task completion."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "Can I test a socket outlet while it's live to check polarity?",
    answer: "Yes, this is a common example of live testing where it's unreasonable to work dead - you need voltage present to check polarity. However, you must use GS38-compliant test equipment, ensure adequate precautions (appropriate probes, clear work area), and be competent to do the work safely."
  },
  {
    question: "Does live working always require two people?",
    answer: "Not always, but accompanied working is strongly recommended for most live work, especially where shock risk is significant. For some low-risk live testing (e.g., using a socket tester), single working may be acceptable if other precautions are in place. The risk assessment determines whether accompanied working is necessary."
  },
  {
    question: "My boss wants me to work live because isolating would shut down production. Is this legal?",
    answer: "Economic considerations alone do NOT justify live working. The test is whether it's 'unreasonable in ALL circumstances' to work dead. Production loss might be considered, but safety must take priority. If dead working is reasonably practicable, it must be done dead. Document any pressure to work unsafely."
  },
  {
    question: "What happens if someone is injured during authorised live work?",
    answer: "Even if live working was justified and authorised, the employer and duty holders may still be liable if precautions were inadequate. The incident must be reported (RIDDOR if applicable), investigated, and lessons learned. The fact that work was 'authorised' doesn't exempt anyone from ensuring precautions were sufficient."
  },
  {
    question: "Are there any situations where live working is completely prohibited?",
    answer: "High voltage work (above 1000V AC or 1500V DC) is subject to even stricter controls and is generally prohibited except for specific operations by specially trained personnel. Work inside live panels, work in confined spaces with shock risk, and work by non-competent persons should not proceed live."
  },
  {
    question: "How do I document that live working was justified?",
    answer: "Record: why dead working was unreasonable (specific technical reason), the risk assessment findings, precautions implemented, competence of persons involved, and authorisation (if your company requires it). This creates an audit trail showing the decision was properly made. Keep records even for routine testing."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module1Section3_3 = () => {
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
            <span>Module 1 Section 3.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Live Working Restrictions
          </h1>
          <p className="text-white/80">
            When it's permitted, why it's dangerous, and what precautions are essential
          </p>
        </header>

        {/* ----------------------------------------
            QUICK SUMMARY BOXES
            ---------------------------------------- */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Default:</strong> Work dead - live working is the exception, not the rule</li>
              <li><strong>Two conditions:</strong> Must be unreasonable to work dead AND precautions adequate</li>
              <li><strong>Testing:</strong> Often requires live - legitimate reason, but still needs precautions</li>
              <li><strong>Never:</strong> Convenience, speed, or customer preference alone</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Ask:</strong> "Can this reasonably be done dead?"</li>
              <li><strong>If live:</strong> VDE tools, GS38 testers, barriers, clear area, no jewellery</li>
              <li><strong>Document:</strong> Why dead working was unreasonable</li>
              <li><strong>Accompanied:</strong> For significant shock risk</li>
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
              "Understand Regulation 14 of the Electricity at Work Regulations",
              "Determine when live working may be justified",
              "Identify precautions required for live work",
              "Apply competence requirements for live working",
              "Document and authorise live working appropriately",
              "Recognise when to refuse unsafe live work"
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
            The Legal Framework
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Electricity at Work Regulations 1989 establish the fundamental principle: work should be done dead. Regulation 14 states that no person shall work on or near live conductors unless it is unreasonable in all the circumstances for them to be dead, AND suitable precautions are taken to prevent injury.
            </p>
            <p>
              This creates a two-part test. First, can the work reasonably be done dead? If yes, it MUST be done dead. Only if dead working is genuinely unreasonable do you move to the second part: are the precautions adequate? Both conditions must be satisfied for live work to be lawful.
            </p>

            <div className="my-6 p-4 rounded bg-red-500/10 border border-red-500/20">
              <p className="text-sm font-medium text-red-400 mb-2">Common Illegal Justifications:</p>
              <ul className="text-sm text-white/90 space-y-1">
                <li>"The customer can't be without power" - Not a valid reason</li>
                <li>"It would take too long to isolate" - Not a valid reason</li>
                <li>"I've done it before without problems" - Not a valid reason</li>
                <li>"My supervisor told me to" - Does not transfer legal responsibility</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> The law doesn't prohibit live working - it restricts it to situations where dead working is genuinely unreasonable AND precautions are adequate. Both tests must be passed.
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
            When Live Working May Be Justified
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The most common legitimate reason for live working is testing and fault-finding. You cannot measure voltage on a dead circuit. You cannot find where voltage is lost without the circuit being energised. You cannot verify correct operation of controls and protection without power. These are genuine technical reasons.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded bg-white/5">
                <p className="text-sm font-medium text-elec-yellow mb-2">Potentially Justified</p>
                <ul className="text-sm text-white/90 space-y-1">
                  <li>Voltage testing (polarity, presence)</li>
                  <li>Fault-finding requiring live trace</li>
                  <li>Verifying protection device operation</li>
                  <li>Testing emergency lighting under load</li>
                  <li>Checking phase rotation</li>
                  <li>Commissioning requiring energisation</li>
                </ul>
              </div>
              <div className="p-4 rounded bg-white/5">
                <p className="text-sm font-medium text-red-400 mb-2">NOT Justified</p>
                <ul className="text-sm text-white/90 space-y-1">
                  <li>Customer inconvenience</li>
                  <li>Time pressure or deadline</li>
                  <li>Lack of isolation equipment</li>
                  <li>Economic cost of shutdown</li>
                  <li>"It's only a quick job"</li>
                  <li>Supervisor instruction alone</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded bg-white/5 border-l-2 border-elec-yellow">
              <p className="text-sm font-medium text-elec-yellow mb-2">The Reasonableness Test</p>
              <p className="text-sm text-white/90">
                Ask yourself: "Is there any way this work could be done with the circuit dead?" If the answer is yes, you should work dead. The question isn't whether it's more convenient to work live, but whether it's genuinely unreasonable in all the circumstances to work dead.
              </p>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Trade Example:</strong> You need to find why a socket circuit has no power. Isolation testing shows continuity is fine. You need to trace where voltage is being lost - this requires the circuit to be energised. Live testing is justified here because you genuinely cannot diagnose the fault without power. But you still need adequate precautions.
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
            Required Precautions
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Even when live working is justified, it remains dangerous. The precautions you take must reduce risk to the lowest level reasonably practicable. These aren't optional extras - they're the second legal requirement that must be satisfied.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded bg-white/5">
                <p className="text-sm font-medium text-elec-yellow mb-2">Insulated Tools</p>
                <p className="text-sm text-white/90">
                  VDE-rated tools insulated to 1000V AC are essential. They have distinctive red/yellow insulation and the VDE certification mark. Tools with rubber-coated handles are NOT adequate - the coating can be damaged or incomplete. VDE tools are tested to 10,000V for safety margin.
                </p>
              </div>

              <div className="p-4 rounded bg-white/5">
                <p className="text-sm font-medium text-elec-yellow mb-2">Test Equipment</p>
                <p className="text-sm text-white/90">
                  GS38-compliant equipment: fused leads (typically 500mA), shrouded probes with max 4mm exposed tip, finger barriers, CAT III/IV rating appropriate to location. Check equipment before use - damaged insulation or probes make it dangerous.
                </p>
              </div>

              <div className="p-4 rounded bg-white/5">
                <p className="text-sm font-medium text-elec-yellow mb-2">Physical Protection</p>
                <p className="text-sm text-white/90">
                  Insulated matting under feet. Barriers to prevent contact with adjacent live parts. Screens to protect others. Clear and clean work area with adequate lighting. Avoid working above live equipment where you could fall onto it.
                </p>
              </div>

              <div className="p-4 rounded bg-white/5">
                <p className="text-sm font-medium text-elec-yellow mb-2">Personal Factors</p>
                <p className="text-sm text-white/90">
                  Remove all jewellery, watches, and conductive items. Avoid loose clothing that could contact live parts. Ensure adequate concentration - no distractions, fatigue, or pressure. Right person for the job - competent and fit.
                </p>
              </div>

              <div className="p-4 rounded bg-white/5">
                <p className="text-sm font-medium text-elec-yellow mb-2">Accompanied Working</p>
                <p className="text-sm text-white/90">
                  A second person who understands the hazards, knows how to isolate the supply, and is trained in emergency response including CPR. They're not a passive observer - they're your safety backup. Required for significant shock risk.
                </p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Precautions Are Not Optional:</strong> If you cannot implement adequate precautions, you cannot do the work live. "We didn't have the right equipment" is not a defence - it means the work should not have proceeded.
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
            Competence and Responsibility
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Electricity at Work Regulations require that people have adequate competence for the work they do. For live working, this means understanding both the technical aspects and the specific hazards and precautions. Competence isn't just about qualifications - it's about genuine capability.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Competence Factors</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Technical knowledge of the system</li>
                  <li>Understanding of electrical hazards</li>
                  <li>Experience with similar work</li>
                  <li>Knowledge of required precautions</li>
                  <li>Ability to recognise danger</li>
                  <li>Physical and mental fitness</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Employer Duties</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Assess competence of workers</li>
                  <li>Provide necessary training</li>
                  <li>Supply appropriate equipment</li>
                  <li>Establish safe systems of work</li>
                  <li>Supervise appropriately</li>
                  <li>Authorise live work where required</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded bg-red-500/10 border border-red-500/20">
              <p className="text-sm font-medium text-red-400 mb-2">Your Right to Refuse</p>
              <p className="text-sm text-white/90">
                You have the right - and the legal duty - to refuse to do work that you consider unsafe or beyond your competence. If you're asked to work live when it could be done dead, or without adequate precautions, you should refuse. Document the situation and raise it with management.
              </p>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Trade Reality:</strong> Pressure to take shortcuts is common. Supervisors may not fully understand the legal position. You are personally responsible for your own safety and can be prosecuted for unsafe work regardless of instructions. "My supervisor told me to" is not a legal defence.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Decision Process for Live Working</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>1. Can this work be done dead? If yes, work dead.</li>
                <li>2. Is there a genuine technical reason why dead working is unreasonable?</li>
                <li>3. What precautions are needed to make live work safe?</li>
                <li>4. Can all required precautions be implemented?</li>
                <li>5. Am I competent to do this work safely?</li>
                <li>6. Document the justification and precautions.</li>
                <li>7. Only if ALL steps are satisfied, proceed with caution.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Live Testing Checklist</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>GS38-compliant test equipment, checked and in good condition</li>
                <li>Probe tips shrouded, leads fused, CAT rating appropriate</li>
                <li>VDE-rated tools if manipulation needed</li>
                <li>Clear work area, adequate lighting</li>
                <li>Jewellery and watches removed</li>
                <li>Accompanied working if shock risk is significant</li>
                <li>Know isolation point if emergency occurs</li>
                <li>First aid available, AED location known</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Stop If:</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Precautions aren't adequate</li>
                <li>You're unsure about any aspect of the work</li>
                <li>Something unexpected is found</li>
                <li>The work scope changes</li>
                <li>You feel fatigued or unable to concentrate</li>
                <li>External pressure is compromising safety</li>
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
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference - Live Working</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Legal Test (Reg 14)</p>
                <ul className="space-y-0.5">
                  <li>1. Unreasonable to work dead?</li>
                  <li>2. Precautions adequate?</li>
                  <li>BOTH must be YES</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Essential Precautions</p>
                <ul className="space-y-0.5">
                  <li>VDE tools (1000V rated)</li>
                  <li>GS38-compliant test equipment</li>
                  <li>Barriers/screens</li>
                  <li>No jewellery/conductive items</li>
                  <li>Accompanied working if needed</li>
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
            <Link to="/study-centre/apprentice/level3-module1-section3-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Lock-Off and Tagging
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module1-section3-4">
              Next: Earthing and Bonding
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module1Section3_3;
