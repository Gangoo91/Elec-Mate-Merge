/**
 * Level 3 Module 1 Section 2.2 - Writing and Interpreting Method Statements (RAMS)
 *
 * Covers: RAMS structure, writing effective method statements, interpreting others' RAMS
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
const TITLE = "Writing and Interpreting Method Statements (RAMS) - Level 3 Module 1 Section 2.2";
const DESCRIPTION = "Learn to write effective RAMS documents and interpret method statements for electrical work. Understand the key components, structure, and practical application on site.";

// ============================================
// INLINE CHECK QUESTIONS (4 per page)
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What does RAMS stand for?",
    options: [
      "Risk Assessment Management System",
      "Risk Assessment and Method Statement",
      "Required Assessment for Managing Safety",
      "Regulatory Assessment Method Standard"
    ],
    correctIndex: 1,
    explanation: "RAMS stands for Risk Assessment and Method Statement - a combined document that identifies hazards and risks alongside the step-by-step safe working procedure."
  },
  {
    id: "check-2",
    question: "What is the key difference between a risk assessment and a method statement?",
    options: [
      "They are the same thing with different names",
      "Risk assessment identifies hazards; method statement describes HOW to work safely",
      "Method statements are only for industrial work",
      "Risk assessments are optional but method statements are not"
    ],
    correctIndex: 1,
    explanation: "A risk assessment identifies WHAT could go wrong and evaluates the level of risk. A method statement describes HOW to do the work safely, incorporating the control measures from the risk assessment into a step-by-step procedure."
  },
  {
    id: "check-3",
    question: "When writing a method statement for consumer unit replacement, what must be specified regarding isolation?",
    options: [
      "Just state 'isolate the supply'",
      "The exact isolation points, verification method, and lock-off procedure",
      "Only the voltage being isolated",
      "The name of the DNO"
    ],
    correctIndex: 1,
    explanation: "Vague instructions like 'isolate the supply' are inadequate. The method statement must specify exact isolation points (main switch, DNO cutout if applicable), how isolation will be verified (approved voltage indicator), and lock-off procedures to prevent re-energisation."
  },
  {
    id: "check-4",
    question: "Who should sign a method statement before work begins?",
    options: [
      "Only the site manager",
      "Only the electrician doing the work",
      "All workers who will follow the method statement",
      "The HSE inspector"
    ],
    correctIndex: 2,
    explanation: "All workers who will follow the method statement should sign to confirm they have read, understood, and will follow it. This demonstrates that the briefing has taken place and creates a record of who was informed."
  }
];

// ============================================
// QUIZ QUESTIONS (12 questions)
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "What is the primary purpose of a method statement?",
    options: [
      "To satisfy insurance requirements",
      "To describe HOW work will be done safely, step by step",
      "To list the materials needed for a job",
      "To record what work was completed"
    ],
    correctAnswer: 1,
    explanation: "A method statement describes HOW work will be carried out safely, providing a step-by-step procedure that incorporates the control measures identified in the risk assessment. It's a practical working document, not just paperwork."
  },
  {
    id: 2,
    question: "Which of these is NOT a typical section in a comprehensive method statement?",
    options: [
      "Scope of work and location",
      "Step-by-step work sequence",
      "Employee salary information",
      "Emergency procedures"
    ],
    correctAnswer: 2,
    explanation: "Employee salary information is not relevant to safe working procedures. Method statements typically include scope, sequence of work, hazards and controls, competence requirements, PPE, equipment, and emergency procedures."
  },
  {
    id: 3,
    question: "What is a 'generic' method statement?",
    options: [
      "A method statement that covers routine work with consistent hazards",
      "A method statement written by a generic company",
      "An incomplete method statement",
      "A method statement that doesn't need signing"
    ],
    correctAnswer: 0,
    explanation: "A generic method statement covers routine activities where the hazards and safe working methods are consistent (e.g., standard socket installation). It must be reviewed and adapted for site-specific conditions but saves writing new documents for every similar job."
  },
  {
    id: 4,
    question: "When should a task-specific method statement be written instead of using a generic one?",
    options: [
      "Never - generic statements always suffice",
      "When the client specifically requests it",
      "When work involves unique hazards or conditions not covered by generic statements",
      "Only for jobs over a certain value"
    ],
    correctAnswer: 2,
    explanation: "Task-specific method statements are needed when work involves hazards, conditions, or procedures not adequately covered by generic statements - for example, complex industrial installations, unusual site conditions, or high-risk activities."
  },
  {
    id: 5,
    question: "What should a method statement specify about competence requirements?",
    options: [
      "Nothing - competence is assumed",
      "The qualifications, training, and experience needed for each task",
      "Only the lead electrician's qualifications",
      "The assessor's competence only"
    ],
    correctAnswer: 1,
    explanation: "The method statement should specify what qualifications, training, or experience workers need for each element of the work. This might include JIB grade, specific equipment training, or supervision requirements for apprentices."
  },
  {
    id: 6,
    question: "How should work steps be presented in a method statement?",
    options: [
      "As a general description of the work",
      "In numbered, sequential order with associated hazards and controls",
      "As bullet points without particular order",
      "In alphabetical order"
    ],
    correctAnswer: 1,
    explanation: "Work steps should be numbered and sequential, showing the logical order of operations. Each step should identify associated hazards and the specific controls required at that point in the work."
  },
  {
    id: 7,
    question: "What is a 'hold point' in a method statement?",
    options: [
      "A tea break",
      "A point where work must stop for inspection or verification before continuing",
      "The end of the working day",
      "A point where additional workers are needed"
    ],
    correctAnswer: 1,
    explanation: "A hold point is a critical stage where work must stop and a check or verification must be completed before proceeding. For example, verifying isolation before starting work, or inspection before final connections. Hold points prevent critical safety steps being skipped."
  },
  {
    id: 8,
    question: "What emergency information should be included in a method statement?",
    options: [
      "None - emergencies are covered by site procedures",
      "First aid location, emergency contacts, and specific response procedures",
      "Only the address of the nearest hospital",
      "Only fire assembly points"
    ],
    correctAnswer: 1,
    explanation: "Method statements should include first aid arrangements, emergency contact numbers, location of emergency equipment, evacuation procedures, and specific response procedures for foreseeable emergencies related to the work (e.g., electric shock, arc flash)."
  },
  {
    id: 9,
    question: "When reviewing a contractor's method statement, what should you check first?",
    options: [
      "The formatting and presentation",
      "That it's site-specific and covers the actual work being done",
      "The number of pages",
      "The contractor's logo"
    ],
    correctAnswer: 1,
    explanation: "First check that the method statement is specific to the actual work being undertaken at this site, not a generic document from another job. Then verify it covers all significant hazards and specifies appropriate controls."
  },
  {
    id: 10,
    question: "How should changes to work scope be handled if they arise during a job?",
    options: [
      "Continue with the existing method statement",
      "Stop work, assess the change, and update or create a new method statement if needed",
      "Ignore minor changes",
      "Complete the work and update the statement afterwards"
    ],
    correctAnswer: 1,
    explanation: "If work scope changes significantly, the existing method statement may no longer be valid. Work should stop while the change is assessed. The method statement must be updated (or a new one created) and workers re-briefed before proceeding."
  },
  {
    id: 11,
    question: "What makes a control measure in a method statement 'specific' rather than 'vague'?",
    options: [
      "Using technical language",
      "Stating exactly what will be done, how, and by whom",
      "Making it longer",
      "Including more hazards"
    ],
    correctAnswer: 1,
    explanation: "Specific controls state exactly what will be done ('Install temporary barriers at 2m radius'), how ('secured with tape and weighted bases'), and who is responsible. Vague statements like 'use barriers' or 'take care' are inadequate."
  },
  {
    id: 12,
    question: "Who is responsible for ensuring workers follow the method statement on site?",
    options: [
      "Only the person who wrote it",
      "The HSE",
      "The supervisor/person in control of the work and each individual worker",
      "The client only"
    ],
    correctAnswer: 2,
    explanation: "The supervisor or person in control of the work is responsible for ensuring the method statement is followed. However, individual workers also have a legal duty to follow safe working procedures and can be held personally liable for deliberate non-compliance."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "Do I need a separate method statement for every job?",
    answer: "Not always. Generic method statements can cover routine work with consistent hazards (e.g., standard domestic socket installation). However, you must review the generic for each job and create a task-specific statement for work with unique hazards, complex procedures, or site conditions not covered by the generic."
  },
  {
    question: "What's the difference between RAMS, SWMS, and a safe system of work?",
    answer: "RAMS (Risk Assessment and Method Statement) is a combined document. SWMS (Safe Work Method Statement) is essentially the same thing - the terms are interchangeable. A Safe System of Work is broader - it includes the RAMS plus training, supervision, equipment, permits, and all organisational arrangements that ensure safe working."
  },
  {
    question: "Can I refuse to work if I think the method statement is inadequate?",
    answer: "Yes. Under Section 7 of HASWA 1974, you must not endanger yourself or others. If you believe the method statement doesn't adequately address the risks, raise your concerns with your supervisor. If they can't be resolved, you should not proceed with the work until adequate controls are in place."
  },
  {
    question: "Who can write a method statement for electrical work?",
    answer: "Method statements should be written by a competent person who understands both the work and the hazards. For electrical work, this typically means a qualified electrician or supervisor with relevant experience. The document should be reviewed and approved by management before issue."
  },
  {
    question: "How detailed does a method statement need to be?",
    answer: "Detailed enough that a competent worker can follow it safely. This means more detail for complex or high-risk work, less for simple routine tasks. The key test is: could someone following this document do the work safely? If not, more detail is needed."
  },
  {
    question: "What happens if I don't follow the method statement?",
    answer: "Not following an agreed method statement is a serious matter. It could invalidate your employer's insurance, result in disciplinary action, and if an accident occurs, you could face personal prosecution. If you think a step is unnecessary or better methods exist, raise this before starting work - don't just ignore procedures."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module1Section2_2 = () => {
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
            <span>Module 1.2.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Writing and Interpreting Method Statements
          </h1>
          <p className="text-white/80">
            Creating RAMS documents that actually protect workers and interpreting others' safely
          </p>
        </header>

        {/* ----------------------------------------
            QUICK SUMMARY BOXES
            ---------------------------------------- */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>RAMS:</strong> Risk Assessment + Method Statement combined</li>
              <li><strong>Purpose:</strong> Describes HOW to work safely, step by step</li>
              <li><strong>Generic:</strong> For routine work with consistent hazards</li>
              <li><strong>Task-specific:</strong> For unique or complex situations</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Is the RAMS specific to THIS job and site?</li>
              <li><strong>Use:</strong> Follow the sequence exactly as written</li>
              <li><strong>Apply:</strong> Sign to confirm understanding before work</li>
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
              "Understand the structure and purpose of RAMS documents",
              "Write effective method statements for electrical work",
              "Distinguish between generic and task-specific statements",
              "Interpret and critically review contractors' RAMS",
              "Implement hold points and verification steps",
              "Brief workers and document sign-off procedures"
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
            CONTENT SECTION 01 - What is a RAMS
            ---------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What is a RAMS Document?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              RAMS stands for <strong>Risk Assessment and Method Statement</strong> - a combined document that brings together hazard identification, risk evaluation, and safe working procedures into a single practical document. In the electrical industry, RAMS are essential for demonstrating to clients, principal contractors, and regulators that work will be carried out safely.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The two components work together:</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-elec-yellow/80 mb-2">Risk Assessment (WHAT might go wrong)</p>
                  <ul className="text-white/90 space-y-0.5 text-xs">
                    <li>- Identifies hazards present</li>
                    <li>- Evaluates who might be harmed</li>
                    <li>- Calculates level of risk</li>
                    <li>- Determines control measures needed</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-elec-yellow/80 mb-2">Method Statement (HOW to work safely)</p>
                  <ul className="text-white/90 space-y-0.5 text-xs">
                    <li>- Step-by-step work sequence</li>
                    <li>- Specific controls at each step</li>
                    <li>- Who does what and when</li>
                    <li>- Verification and hold points</li>
                  </ul>
                </div>
              </div>
            </div>

            <p>
              The method statement takes the control measures identified in the risk assessment and builds them into a practical working procedure. Without the risk assessment, you don't know what hazards to address. Without the method statement, you have hazards identified but no clear procedure for controlling them.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> RAMS is not just paperwork to satisfy clients. A well-written RAMS document is a practical tool that helps workers complete jobs safely. If your RAMS ends up in a drawer unread, it's failed its purpose.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ----------------------------------------
            CONTENT SECTION 02 - Key Components
            ---------------------------------------- */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Key Components of an Effective Method Statement
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              An effective method statement contains specific information that enables workers to complete the job safely. Vague statements like "take appropriate precautions" or "work safely" are useless - the document must specify exactly what will be done.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Essential sections to include:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>1. Document control:</strong> Job reference, revision number, date, author, approver</li>
                <li><strong>2. Scope of work:</strong> Exactly what work is covered, location, what's NOT included</li>
                <li><strong>3. Competence requirements:</strong> Qualifications, training, supervision needed</li>
                <li><strong>4. Plant and equipment:</strong> Specific tools, test equipment, access equipment required</li>
                <li><strong>5. PPE requirements:</strong> What PPE is mandatory for each phase of work</li>
                <li><strong>6. Work sequence:</strong> Numbered steps in logical order</li>
                <li><strong>7. Hazards and controls:</strong> Specific controls for each step</li>
                <li><strong>8. Hold points:</strong> Where work stops for verification</li>
                <li><strong>9. Emergency procedures:</strong> First aid, contacts, specific response actions</li>
                <li><strong>10. Sign-off:</strong> Space for worker acknowledgement</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-2">Vague (Inadequate)</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li>- "Isolate the supply"</li>
                  <li>- "Use appropriate PPE"</li>
                  <li>- "Work safely at height"</li>
                  <li>- "Test before working"</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-green-400/80 mb-2">Specific (Effective)</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li>- "Isolate at main switch, verify dead with Fluke T150, apply lock-off device"</li>
                  <li>- "Safety glasses and Class 0 insulated gloves required for CU work"</li>
                  <li>- "Use 3-section ladder per BS EN 131, secured at top by second person"</li>
                  <li>- "Prove VI on known live, test circuit L-N, L-E, N-E, re-prove VI"</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> For a consumer unit change, the work sequence might include: 1) Site survey and isolation point identification, 2) Client notification and power-off scheduling, 3) Safe isolation procedure (detailed sub-steps), 4) Existing CU removal, 5) New CU installation and wiring, 6) Inspection before energisation (HOLD POINT), 7) Testing sequence, 8) Energisation and final checks.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ----------------------------------------
            CONTENT SECTION 03 - Writing for Electrical Work
            ---------------------------------------- */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Writing Method Statements for Electrical Work
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electrical work has specific hazards that must be addressed in every method statement. The invisible nature of electricity means written procedures are even more critical - you can't see if a circuit is live just by looking at it, so the procedure must ensure verification happens.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Electrical-specific elements to always include:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>- <strong>Isolation procedure:</strong> Exact isolation points, not just "isolate"</li>
                <li>- <strong>Verification method:</strong> Approved voltage indicator to be used, proving procedure</li>
                <li>- <strong>Lock-off details:</strong> Type of device, who holds the key, when removed</li>
                <li>- <strong>Testing sequence:</strong> Which tests, in what order, with what equipment</li>
                <li>- <strong>Live working justification:</strong> If any live work required, why and what controls</li>
                <li>- <strong>Re-energisation procedure:</strong> Who authorises, checks before switching on</li>
              </ul>
            </div>

            <p>
              <strong>Generic vs Task-Specific:</strong> Generic method statements work for routine activities where hazards and methods are consistent. A generic for "domestic socket installation" can cover most socket work. But task-specific statements are needed when:
            </p>

            <ul className="text-sm text-white space-y-1 ml-4 my-4">
              <li>- The site has unusual hazards (asbestos, confined spaces, industrial equipment)</li>
              <li>- The work is complex or non-routine</li>
              <li>- Multiple trades or contractors are working together</li>
              <li>- Higher fault levels or arc flash risks exist</li>
              <li>- The client or principal contractor requires task-specific documentation</li>
            </ul>

            <div className="p-4 rounded bg-white/5 my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Writing Tips for Clarity</p>
              <ul className="text-sm text-white/90 space-y-1">
                <li>- Use simple, direct language - avoid jargon where possible</li>
                <li>- One action per numbered step</li>
                <li>- Include WHO does each step if multiple workers involved</li>
                <li>- Use active voice: "Electrician applies lock-off" not "Lock-off is applied"</li>
                <li>- Include timings where relevant (e.g., "wait 5 minutes for capacitor discharge")</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> The test of a good method statement is: could a competent electrician who hasn't done this job before follow it safely? If not, add more detail.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ----------------------------------------
            CONTENT SECTION 04 - Interpreting and Reviewing
            ---------------------------------------- */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Interpreting and Reviewing Method Statements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Whether you're reviewing a contractor's RAMS as a client/supervisor, or receiving a method statement to follow as a worker, critical review is essential. A poorly written method statement can give false assurance that work is safe when hazards haven't been properly addressed.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Questions to ask when reviewing a method statement:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>- Is it specific to THIS work at THIS site, or a generic from another job?</li>
                <li>- Does it cover all the significant hazards I can identify?</li>
                <li>- Are the control measures specific and achievable?</li>
                <li>- Does the work sequence make logical sense?</li>
                <li>- Are there adequate hold points for verification?</li>
                <li>- Are competence requirements clearly stated?</li>
                <li>- Does it comply with current regulations and best practice?</li>
                <li>- What happens if something goes wrong - are emergency procedures adequate?</li>
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white mb-1">Before Work</p>
                <p className="text-white/90 text-xs">Read, question, sign only when satisfied</p>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white mb-1">During Work</p>
                <p className="text-white/90 text-xs">Follow exactly, stop if conditions change</p>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white mb-1">After Work</p>
                <p className="text-white/90 text-xs">Note any issues for future revision</p>
              </div>
            </div>

            <p>
              <strong>Toolbox talks and briefings:</strong> The method statement briefing is as important as the document itself. Before work starts, everyone involved should be briefed on the key hazards, controls, their specific responsibilities, and what to do if problems arise. This isn't just reading the document aloud - it's a discussion to confirm understanding.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> An incident investigation found the method statement was well-written but nobody had read it. The document was signed during site induction without explanation. The accident occurred because workers didn't know about a critical isolation step. The paperwork existed, but the safe system of work had failed.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Never sign a method statement you haven't read and understood. Your signature confirms you will follow it - signing blindly makes you responsible for a procedure you don't know.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Writing RAMS</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>- Visit the site if possible before writing task-specific RAMS</li>
                <li>- Involve the workers who will do the job - they know practical hazards</li>
                <li>- Use your generic templates as starting points, not finished documents</li>
                <li>- Have someone else review before issue - fresh eyes catch gaps</li>
                <li>- Keep language simple - if apprentices can't understand it, simplify</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Following RAMS</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>- Read the whole document before starting work</li>
                <li>- Ask questions if anything is unclear - before work starts</li>
                <li>- Follow the sequence as written - don't skip steps</li>
                <li>- Stop work if conditions don't match the document</li>
                <li>- Report any near misses or issues for future revision</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Copy-paste from other jobs</strong> - Generic documents used without site-specific review</li>
                <li><strong>Vague control measures</strong> - "Take care" or "Use appropriate PPE" means nothing</li>
                <li><strong>Missing hold points</strong> - No verification steps at critical stages</li>
                <li><strong>No emergency procedures</strong> - Assuming site arrangements cover everything</li>
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
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference - Method Statement Checklist</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Must Include</p>
                <ul className="space-y-0.5">
                  <li>Scope and location of work</li>
                  <li>Numbered work sequence</li>
                  <li>Hazards at each step</li>
                  <li>Specific control measures</li>
                  <li>Competence requirements</li>
                  <li>PPE requirements</li>
                  <li>Emergency procedures</li>
                  <li>Worker sign-off section</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">For Electrical Work</p>
                <ul className="space-y-0.5">
                  <li>Exact isolation points</li>
                  <li>Verification procedure (VI proving)</li>
                  <li>Lock-off requirements</li>
                  <li>Testing sequence</li>
                  <li>Re-energisation procedure</li>
                  <li>Arc flash considerations</li>
                  <li>Hold points before energisation</li>
                  <li>Electric shock response procedure</li>
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
            <Link to="/study-centre/apprentice/level3-module1-section2-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Five Steps
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module1-section2-3">
              Next: Hierarchy of Controls
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module1Section2_2;
