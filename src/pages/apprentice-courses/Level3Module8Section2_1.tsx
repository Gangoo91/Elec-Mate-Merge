/**
 * Level 3 Module 8 Section 2.1 - Practical Assessment Guide
 *
 * Design pattern: Level3ContentTemplate.tsx
 * Dark theme with elec-yellow accent
 * Comprehensive guide to practical assessment requirements and expectations
 */

import { ArrowLeft, Zap, CheckCircle, Wrench, ClipboardCheck, AlertTriangle, Shield, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

// ============================================
// SEO CONFIGURATION
// ============================================
const TITLE = "Practical Assessment Guide - Level 3 Module 8 Section 2.1";
const DESCRIPTION = "Comprehensive guide to practical assessment requirements and expectations for City & Guilds Level 3 electrical installations. Understand marking criteria and assessment procedures.";

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the primary focus of practical assessments at Level 3?",
    options: [
      "Speed of completion only",
      "Safe, competent work demonstrating industry-standard installation practices",
      "Theoretical knowledge recall",
      "Cost-effective material usage"
    ],
    correctIndex: 1,
    explanation: "Level 3 practical assessments evaluate your ability to perform safe, competent electrical installation work to industry standards. Speed matters but safety, accuracy, and compliance are the primary criteria."
  },
  {
    id: "check-2",
    question: "Before starting any practical assessment task, what must you always do first?",
    options: [
      "Start work immediately to save time",
      "Read the task brief, identify requirements, and plan your approach",
      "Ask another candidate for help",
      "Check your phone for messages"
    ],
    correctIndex: 1,
    explanation: "Always read the task brief carefully before starting. Understand exactly what is required, identify any specific requirements or constraints, and plan your approach. Starting without reading properly leads to errors."
  },
  {
    id: "check-3",
    question: "What happens if you fail to demonstrate safe isolation during a practical assessment?",
    options: [
      "You lose a few marks but can continue",
      "The assessor gives you hints",
      "It typically results in automatic failure of the assessment",
      "Nothing - safe isolation is optional"
    ],
    correctIndex: 2,
    explanation: "Safe isolation is a fundamental safety requirement. Failure to demonstrate correct safe isolation procedure typically results in automatic failure of the practical assessment, regardless of other work quality."
  },
  {
    id: "check-4",
    question: "How should you handle mistakes discovered during your practical assessment?",
    options: [
      "Hide them and hope the assessor doesn't notice",
      "Stop working and wait for instructions",
      "Correct them properly using appropriate methods and inform the assessor if required",
      "Leave them as they won't affect the outcome"
    ],
    correctIndex: 2,
    explanation: "Professionals identify and correct their own mistakes. Proper correction demonstrates competence. Some assessment schemes require you to inform the assessor; check your specific requirements."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "What documentation should you review before starting a practical assessment?",
    options: [
      "Only the circuit diagram",
      "Task brief, assessment criteria, circuit diagrams, and any special requirements",
      "Just the marking sheet",
      "None - documentation wastes time"
    ],
    correctAnswer: 1,
    explanation: "Thorough review of all documentation - task brief, criteria, diagrams, and special requirements - ensures you understand exactly what's expected and how marks are allocated."
  },
  {
    id: 2,
    question: "What is the correct approach to time management in practical assessments?",
    options: [
      "Rush through everything as fast as possible",
      "Work steadily with periodic time checks, prioritising safety and quality",
      "Ignore time limits and focus only on perfection",
      "Complete the easiest tasks first, skip difficult ones"
    ],
    correctAnswer: 1,
    explanation: "Work at a steady, controlled pace with periodic time checks. Rushing leads to errors and safety shortcuts. Plan your time to complete all required elements within the allocation."
  },
  {
    id: 3,
    question: "How should cable entries into enclosures be made in practical assessments?",
    options: [
      "Any method that gets the cable inside",
      "Through appropriate knockouts or glands, with correct termination methods",
      "By drilling new holes wherever convenient",
      "Cable entry methods don't affect assessment marks"
    ],
    correctAnswer: 1,
    explanation: "Cable entries must use appropriate knockouts or glands as per manufacturer instructions and BS 7671 requirements. Correct entry methods demonstrate professional installation practice."
  },
  {
    id: 4,
    question: "What should you do if you're unsure about an assessment requirement?",
    options: [
      "Guess and hope for the best",
      "Ask the assessor for clarification - unclear requirements can be clarified",
      "Copy what another candidate is doing",
      "Skip that part of the assessment"
    ],
    correctAnswer: 1,
    explanation: "Assessors can clarify task requirements without giving answers. Asking for clarification demonstrates professional behaviour and prevents errors from misunderstanding instructions."
  },
  {
    id: 5,
    question: "What is the significance of workmanship standards in practical assessments?",
    options: [
      "Appearance doesn't matter if it works",
      "Good workmanship demonstrates competence and affects marking",
      "Only theoretical knowledge is assessed",
      "Workmanship is only important for commercial jobs"
    ],
    correctAnswer: 1,
    explanation: "Workmanship standards are actively assessed. Neat, organised work with proper cable management, secure fixings, and professional finish demonstrates competence and earns marks."
  },
  {
    id: 6,
    question: "When performing tests during practical assessment, what must you ensure?",
    options: [
      "Tests don't matter - installation is what counts",
      "Correct test sequence, proper instrument use, and accurate recording of results",
      "Just recording pass/fail is sufficient",
      "Only test if time permits"
    ],
    correctAnswer: 1,
    explanation: "Testing is integral to practical assessment. You must follow the correct sequence, use instruments properly, record actual readings, and demonstrate understanding of what results indicate."
  },
  {
    id: 7,
    question: "What PPE is typically required during practical electrical assessments?",
    options: [
      "No PPE is required in assessment conditions",
      "Appropriate PPE including safety footwear, eye protection where required, and insulated tools",
      "Only gloves are necessary",
      "PPE requirements are the same as for office work"
    ],
    correctAnswer: 1,
    explanation: "Practical assessments require appropriate PPE including safety footwear and eye protection where necessary. Using correct PPE demonstrates professional safety awareness."
  },
  {
    id: 8,
    question: "How should you leave your work area at the end of a practical assessment?",
    options: [
      "Leave everything as it is - someone else will clear up",
      "Clean, tidy, with tools and materials organised, ready for handover",
      "Hide any leftover materials",
      "Work area condition doesn't affect assessment"
    ],
    correctAnswer: 1,
    explanation: "Professional practice includes leaving a clean, tidy work area. This demonstrates organisation and respect for the work environment, and may be specifically assessed."
  },
  {
    id: 9,
    question: "What documentation might you need to complete as part of practical assessment?",
    options: [
      "No documentation is required - it's a practical test",
      "Test results schedules, circuit charts, and potentially certification documents",
      "Only a signature to confirm attendance",
      "Theoretical exam papers"
    ],
    correctAnswer: 1,
    explanation: "Practical assessments often include documentation requirements such as recording test results, completing circuit schedules, or demonstrating certification knowledge."
  },
  {
    id: 10,
    question: "What is the correct sequence for energising a completed installation during assessment?",
    options: [
      "Switch on immediately to save time",
      "Visual inspection, appropriate tests, verification of safety, then controlled energisation",
      "Ask the assessor to energise it",
      "Energisation isn't part of the assessment"
    ],
    correctAnswer: 1,
    explanation: "Before energisation: complete visual inspection, perform required dead tests, verify all safety requirements are met, then energise in a controlled manner and complete live tests."
  },
  {
    id: 11,
    question: "If you notice a potential safety issue during your assessment, what should you do?",
    options: [
      "Ignore it and continue working",
      "Stop work, make the area safe, and report to the assessor immediately",
      "Fix it secretly without telling anyone",
      "Wait until after the assessment to mention it"
    ],
    correctAnswer: 1,
    explanation: "Safety takes priority over assessment completion. Stop work, make the situation safe, and report to the assessor. This demonstrates the professional safety awareness expected of a qualified electrician."
  },
  {
    id: 12,
    question: "What demonstrates 'professional behaviour' during practical assessments?",
    options: [
      "Working alone without any communication",
      "Organised approach, safe practices, good communication, and respect for the environment",
      "Completing tasks as quickly as possible",
      "Asking other candidates for answers"
    ],
    correctAnswer: 1,
    explanation: "Professional behaviour includes: organised and methodical working, consistent safe practices, appropriate communication with assessors, and respect for equipment and the work environment."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "What happens if I don't finish within the time allowed?",
    answer: "Incomplete work is marked on what has been completed. Some assessments have minimum completion requirements - check your specific assessment criteria. Time management is part of the competency being assessed, but partial completion may still achieve a pass in some schemes."
  },
  {
    question: "Can I use notes or reference materials during practical assessments?",
    answer: "This depends on the specific assessment. Some allow reference to BS 7671 or manufacturer data; others are closed-book. Check your assessment brief carefully. Even when references are allowed, knowing information without looking it up saves valuable time."
  },
  {
    question: "What if a tool breaks or I need something not provided?",
    answer: "Inform the assessor immediately. Assessment centres should have backup equipment. You won't be penalised for equipment failure outside your control, but you are expected to check your own tools are in good condition before starting."
  },
  {
    question: "How do assessors decide if my work passes or fails?",
    answer: "Assessors use defined criteria covering safety, accuracy, workmanship, testing, and professional behaviour. Specific requirements vary by awarding body but always include safety as a non-negotiable element. Review the assessment criteria in advance."
  },
  {
    question: "Can I re-take a practical assessment if I fail?",
    answer: "Yes, re-sits are normally available. There may be a waiting period and additional fees. Review feedback carefully before re-sitting to understand what went wrong. Your training provider can advise on re-sit procedures and support available."
  },
  {
    question: "Are practical assessments the same at every centre?",
    answer: "While the assessment criteria and standards are consistent (set by the awarding body), specific tasks may vary between centres. All assessments test the same competencies to the same standards, but the exact circuits or scenarios may differ."
  }
];

// ============================================
// ASSESSMENT CRITERIA
// ============================================
const assessmentCriteria = [
  {
    category: "Safety",
    weight: "Critical",
    elements: ["Safe isolation demonstrated", "PPE used appropriately", "No unsafe practices", "Risk awareness shown"],
    consequence: "Failure of any safety element typically results in overall failure"
  },
  {
    category: "Technical Accuracy",
    weight: "High",
    elements: ["Correct connections", "Appropriate component selection", "Compliance with diagrams", "Proper cable management"],
    consequence: "Errors reduce marks; significant errors may prevent pass"
  },
  {
    category: "Testing",
    weight: "High",
    elements: ["Correct test sequence", "Proper instrument use", "Accurate recording", "Result interpretation"],
    consequence: "Testing competence is essential for passing"
  },
  {
    category: "Workmanship",
    weight: "Medium",
    elements: ["Neat cable runs", "Secure fixings", "Professional finish", "Organised workspace"],
    consequence: "Poor workmanship reduces marks but rarely causes failure alone"
  },
  {
    category: "Time Management",
    weight: "Medium",
    elements: ["Completion within time", "Efficient working", "Prioritisation skills", "Steady progress"],
    consequence: "Incomplete work limits marks available; may affect pass/fail"
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module8Section2_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">

      {/* STICKY HEADER */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module8">
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
            <span>Module 8.2.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Practical Assessment Guide
          </h1>
          <p className="text-white/80">
            Comprehensive preparation for Level 3 practical assessments
          </p>
        </header>

        {/* QUICK SUMMARY BOXES */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Focus:</strong> Safe, competent work to industry standards</li>
              <li><strong>Critical:</strong> Safe isolation is non-negotiable</li>
              <li><strong>Process:</strong> Read brief, plan, execute, test, document</li>
              <li><strong>Standard:</strong> Work as you would on a real installation</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Assessment criteria define exactly what earns marks</li>
              <li><strong>Use:</strong> Task brief contains all required information</li>
              <li><strong>Apply:</strong> Professional standards throughout every task</li>
            </ul>
          </div>
        </div>

        {/* LEARNING OUTCOMES */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand practical assessment structure and marking criteria",
              "Prepare effectively for practical assessment conditions",
              "Demonstrate safe working practices throughout assessments",
              "Apply correct testing procedures and documentation",
              "Manage time effectively while maintaining quality",
              "Present work to professional industry standards"
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
            Understanding Practical Assessments
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Practical assessments at Level 3 evaluate your ability to perform electrical installation work safely and competently to industry standards. Unlike written exams that test knowledge recall, practical assessments require you to demonstrate that you can actually do the job - plan work, install correctly, test properly, and document appropriately.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">What Practical Assessments Evaluate:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Technical Competence:</strong> Can you correctly install electrical systems? This includes accurate connections, appropriate component selection, compliance with diagrams and specifications, and proper cable management techniques.</li>
                <li><strong>Safety Awareness:</strong> Do you work safely at all times? Safe isolation is mandatory. Risk assessment, appropriate PPE use, and hazard awareness are constantly evaluated - not just at specific moments.</li>
                <li><strong>Testing Ability:</strong> Can you verify your work meets requirements? This means correct test sequence, proper instrument use, accurate result recording, and understanding what results mean.</li>
                <li><strong>Professional Practice:</strong> Do you work as a competent professional? Organisation, time management, communication with assessors, and work area management all contribute to assessment outcomes.</li>
                <li><strong>Problem-Solving:</strong> Can you handle unexpected situations? While assessments follow set tasks, your ability to identify and correct your own errors demonstrates professional competence.</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 my-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-400 mb-1">Critical Understanding</p>
                  <p className="text-xs text-white/90">
                    Safe isolation failure typically results in automatic assessment failure, regardless of how well you perform everything else. This reflects real-world consequences - an electrician who does not isolate safely puts lives at risk. Practice safe isolation until it becomes completely automatic.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Professional Reality:</strong> Think of practical assessments as observed work experience. You are being watched doing the same tasks you would do as a qualified electrician. The standard expected is the standard required on real installations.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 01 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* CONTENT SECTION 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Before You Start: Preparation Essentials
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Success in practical assessments begins before you touch any tools. Proper preparation significantly increases your chances of success and reduces stress during the assessment itself.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <ClipboardCheck className="h-4 w-4 text-elec-yellow" />
                  <p className="text-sm font-medium text-white">Documentation Review</p>
                </div>
                <ul className="text-xs text-white/90 space-y-1">
                  <li>Read the complete task brief - every word matters</li>
                  <li>Study circuit diagrams until you understand every connection</li>
                  <li>Review assessment criteria - know what earns marks</li>
                  <li>Note any specific requirements or constraints</li>
                  <li>Identify materials and tools you will need</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <Wrench className="h-4 w-4 text-elec-yellow" />
                  <p className="text-sm font-medium text-white">Physical Preparation</p>
                </div>
                <ul className="text-xs text-white/90 space-y-1">
                  <li>Check your tools are complete and in good condition</li>
                  <li>Ensure test instruments are within calibration</li>
                  <li>Prepare appropriate PPE</li>
                  <li>Get adequate rest before assessment day</li>
                  <li>Arrive with time to spare - rushing creates stress</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The First Five Minutes:</p>
              <p className="text-sm text-white/90 mb-2">
                How you begin sets the tone for your entire assessment. Use the first few minutes wisely:
              </p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Read Everything:</strong> Read the task brief completely, even if you think you know what is required. Assessment tasks may have specific variations from what you have practised.</li>
                <li><strong>Understand Before Acting:</strong> Make sure you understand exactly what is required before starting any work. Clarify anything unclear with the assessor - this is allowed and expected.</li>
                <li><strong>Plan Your Approach:</strong> Mentally (or briefly on paper) plan the sequence of work. What will you do first? What depends on what? Where might you encounter difficulties?</li>
                <li><strong>Check Your Resources:</strong> Verify you have all required materials and tools. Report any shortages to the assessor before starting.</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Time Investment:</strong> Spending 5-10 minutes on thorough preparation typically saves more time than it costs. Errors from misunderstanding requirements take far longer to correct than prevention takes.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 02 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* CONTENT SECTION 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            During Assessment: Key Standards
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              During the assessment, you must demonstrate consistent professional standards. Assessors observe your entire process, not just the finished result. How you work matters as much as what you produce.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Safe Working Throughout:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Safe Isolation Every Time:</strong> Before working on any circuit, demonstrate the complete safe isolation procedure. Locate supply, isolate, secure against re-energisation, prove the proving device, verify dead, prove the proving device again. This must become automatic.</li>
                <li><strong>PPE Compliance:</strong> Wear required PPE throughout the assessment. Safety footwear, eye protection when required, and use of insulated tools should be automatic, not something you remember halfway through.</li>
                <li><strong>Workspace Safety:</strong> Keep your work area organised and free from hazards. Trailing cables, scattered tools, and clutter create risks and demonstrate poor professional practice.</li>
                <li><strong>Risk Awareness:</strong> Be aware of hazards throughout your work. This includes awareness of others in the workspace, potential cable routes in walls, and any environmental hazards.</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Installation Quality Standards:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Cable Management:</strong> Cables should follow neat, logical routes. Use appropriate clips or containment at specified intervals. Avoid excessive cable bending and ensure cables are protected from damage.</li>
                <li><strong>Terminations:</strong> Every termination must be electrically sound and mechanically secure. Strip cables to appropriate length - enough for good connection without excessive exposed conductor. Tighten terminals to manufacturer specifications.</li>
                <li><strong>Component Installation:</strong> Mount accessories and equipment securely, level, and at correct heights. Follow manufacturer instructions for installation. Ensure all covers and barriers are correctly fitted.</li>
                <li><strong>Circuit Identification:</strong> Label circuits correctly according to the specification. Clear, accurate identification is a regulatory requirement and professional standard.</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70 mt-4">
              <strong>Assessment Reality:</strong> Assessors note everything - the order you work, how you handle tools, whether you check your own work. Work as if every action is being watched and recorded, because it essentially is.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 03 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* CONTENT SECTION 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Testing and Completion
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Testing is not an afterthought - it is integral to the assessment. Your testing demonstrates that you can verify your installation meets safety requirements. Rushing or skipping tests costs marks and may indicate the installation is unsafe to energise.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Testing Sequence (Initial Verification):</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Visual Inspection First:</strong> Before any instrument tests, conduct a thorough visual inspection. Check connections, cable damage, correct polarity, appropriate components. Many faults can be identified visually.</li>
                <li><strong>Dead Tests (Installation Isolated):</strong>
                  <ul className="text-xs text-white/80 ml-4 mt-1 space-y-0.5">
                    <li>- Continuity of protective conductors</li>
                    <li>- Continuity of ring final circuit conductors</li>
                    <li>- Insulation resistance</li>
                    <li>- Polarity (can be confirmed during continuity testing)</li>
                  </ul>
                </li>
                <li><strong>Live Tests (After Safe Energisation):</strong>
                  <ul className="text-xs text-white/80 ml-4 mt-1 space-y-0.5">
                    <li>- Earth fault loop impedance (Zs)</li>
                    <li>- Prospective fault current (where required)</li>
                    <li>- RCD operation</li>
                    <li>- Functional testing</li>
                  </ul>
                </li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Recording Results:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Accuracy:</strong> Record actual readings, not just pass/fail. Actual values allow comparison with limits and demonstrate competent instrument use.</li>
                <li><strong>Completeness:</strong> Complete all sections of any test documentation provided. Missing information suggests incomplete testing.</li>
                <li><strong>Clarity:</strong> Write legibly. Your documentation may be reviewed by others and must be clearly readable.</li>
                <li><strong>Understanding:</strong> Be prepared to explain your results. What does a reading of 0.35 ohms for R1+R2 tell you? Could you explain if asked?</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 my-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-400 mb-1">Final Checks</p>
                  <p className="text-xs text-white/90">
                    Before declaring your work complete: verify all connections are tight, all covers are fitted, all labels are in place, your test results are recorded, and your work area is tidy. These final checks often catch issues that could cost marks.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Professional Standard:</strong> Your completed work should be ready for handover to a client. Ask yourself: "Would I be proud to show this to an experienced electrician? Would I be confident connecting a family's home to this installation?"
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 04 */}
        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* ASSESSMENT CRITERIA TABLE */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-6">Assessment Criteria Overview</h2>
          <p className="text-sm text-white/70 mb-4">
            Understanding how different elements are weighted helps you prioritise during the assessment.
          </p>

          <div className="space-y-4">
            {assessmentCriteria.map((criteria, index) => (
              <div key={index} className="p-4 rounded-lg bg-transparent border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-white">{criteria.category}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    criteria.weight === 'Critical' ? 'bg-red-500/20 text-red-400' :
                    criteria.weight === 'High' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {criteria.weight} Weight
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 gap-2 mb-2">
                  {criteria.elements.map((element, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-white/80">
                      <CheckCircle className="h-3 w-3 text-elec-yellow/50" />
                      <span>{element}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-white/60 italic">{criteria.consequence}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PRACTICAL GUIDANCE */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Pre-Assessment Checklist</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Tools complete, clean, and in good working condition</li>
                <li>Test instruments calibrated and batteries charged</li>
                <li>PPE prepared and ready to wear</li>
                <li>Documentation requirements understood</li>
                <li>Circuit diagrams studied and understood</li>
                <li>Assessment criteria reviewed</li>
                <li>Route to venue confirmed, arrival time planned</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">During Assessment Tips</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Work steadily - rushing leads to errors and safety shortcuts</li>
                <li>Check your own work as you go - don't leave all checking until the end</li>
                <li>If you make a mistake, correct it properly rather than trying to hide it</li>
                <li>Communicate appropriately with the assessor when necessary</li>
                <li>Keep your workspace organised throughout</li>
                <li>Take brief pauses to check time and progress</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Reasons for Failure</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Safe isolation failure</strong> - Not demonstrating the complete procedure correctly</li>
                <li><strong>Incorrect connections</strong> - Wiring errors, wrong polarity, poor terminations</li>
                <li><strong>Testing errors</strong> - Wrong sequence, incorrect instrument use, missing tests</li>
                <li><strong>Time management</strong> - Not completing required elements within time allowed</li>
                <li><strong>Safety breaches</strong> - Working live, not using PPE, creating hazards</li>
                <li><strong>Following instructions</strong> - Not reading the task brief properly</li>
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
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference - Practical Assessment Success</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Before Starting</p>
                <ul className="space-y-0.5">
                  <li>Read task brief completely</li>
                  <li>Study circuit diagrams</li>
                  <li>Review assessment criteria</li>
                  <li>Check tools and materials</li>
                  <li>Plan your approach</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Non-Negotiables</p>
                <ul className="space-y-0.5">
                  <li>Safe isolation every time</li>
                  <li>PPE worn throughout</li>
                  <li>Correct test sequence</li>
                  <li>Accurate documentation</li>
                  <li>Professional behaviour</li>
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
            <Link to="../level3-module8-section1-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Past Paper Analysis
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module8-section2-2">
              Next: Wiring Techniques Review
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module8Section2_1;
