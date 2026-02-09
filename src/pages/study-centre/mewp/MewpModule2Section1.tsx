import {
  ArrowLeft,
  Search,
  CheckCircle,
  ClipboardList,
  FileText,
  AlertTriangle,
  RefreshCw,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'five-step-order',
    question:
      'A colleague tells you he completed a risk assessment by writing down the hazards and the control measures. Which critical step did he miss before recording his findings?',
    options: [
      'Identify the hazards',
      'Decide who might be harmed and how',
      'Evaluate the risks and decide on precautions',
      'Review and update the assessment',
    ],
    correctIndex: 2,
    explanation:
      "Before recording findings (Step 4), you must evaluate the risks by considering likelihood and severity, and decide whether existing controls are adequate or if further precautions are needed (Step 3). Simply listing hazards and controls without evaluating the level of risk does not meet the 'suitable and sufficient' standard.",
  },
  {
    id: 'method-statement-timing',
    question: 'When must a method statement briefing take place in relation to MEWP operations?',
    options: [
      'Within 24 hours of the work starting',
      'Before the MEWP operation begins',
      'After the first day of work so the team can identify issues',
      'Only if the client requests one',
    ],
    correctIndex: 1,
    explanation:
      'The method statement briefing must take place before the MEWP operation begins. All workers involved must understand the safe system of work, the hazards, and the control measures before any work at height commences. This is a legal requirement, not optional.',
  },
  {
    id: 'review-trigger',
    question:
      "A near miss occurred on site yesterday when a MEWP's outrigger sank into soft ground that was not identified in the risk assessment. What action is required?",
    options: [
      'Add a note to the existing risk assessment and carry on',
      'Stop work, review and update the risk assessment, re-brief the team',
      'Report the near miss but continue with the existing assessment',
      'Wait until the annual review date to update the assessment',
    ],
    correctIndex: 1,
    explanation:
      'Any near miss or incident requires an immediate review and update of the risk assessment. Work should stop until the assessment has been revised, new controls put in place, and all affected workers re-briefed. Waiting for an annual review or simply adding a note is not sufficient.',
  },
];

const faqs = [
  {
    question: 'Who is legally responsible for carrying out a risk assessment for MEWP work?',
    answer:
      'The employer (or self-employed person) has the legal duty to carry out a suitable and sufficient risk assessment under the Management of Health and Safety at Work Regulations 1999. In practice, the assessment is often delegated to a competent person — someone with sufficient training, experience, and knowledge of the specific hazards. However, the legal responsibility always remains with the employer.',
  },
  {
    question: 'Does every MEWP job need its own risk assessment?',
    answer:
      'Not necessarily. A generic risk assessment can cover routine, repetitive MEWP tasks carried out in similar conditions. However, site-specific factors must always be considered. If the site, conditions, equipment, or personnel change significantly, the generic assessment must be supplemented with a site-specific assessment. In practice, most MEWP work benefits from a brief site-specific review even when a generic assessment exists.',
  },
  {
    question: 'What is the difference between a risk assessment and a method statement?',
    answer:
      "A risk assessment identifies the hazards and evaluates the risks. It answers the question 'What could go wrong and how likely is it?' A method statement (safe system of work) describes the step-by-step procedure for carrying out the work safely. It answers the question 'How will we do this safely?' The two documents work together — the method statement is informed by the findings of the risk assessment.",
  },
  {
    question: 'Can a risk assessment be done verbally, or must it be written down?',
    answer:
      'Under Regulation 3(6) of the Management of Health and Safety at Work Regulations 1999, if you employ five or more people, you must record the significant findings in writing. Even if you employ fewer than five, it is strongly recommended to record findings in writing. A written record provides evidence of compliance, ensures consistency, and makes it easier to communicate findings and review the assessment later.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Under which regulation is an employer required to carry out a risk assessment before MEWP work?',
    options: [
      'Electricity at Work Regulations 1989',
      'Management of Health and Safety at Work Regulations 1999',
      'Construction (Design and Management) Regulations 2015',
      'Personal Protective Equipment Regulations 2002',
    ],
    correctAnswer: 1,
    explanation:
      'The Management of Health and Safety at Work Regulations 1999, Regulation 3, requires every employer to carry out a suitable and sufficient assessment of the risks to the health and safety of employees and others affected by their work. This is the primary regulation governing risk assessment.',
  },
  {
    id: 2,
    question: "What does 'suitable and sufficient' mean in the context of a risk assessment?",
    options: [
      'It must be written by a qualified health and safety consultant',
      'It must identify all hazards, evaluate risks, and be proportionate to the level of risk',
      'It must be at least 10 pages long to cover all eventualities',
      'It must be approved by the HSE before work can begin',
    ],
    correctAnswer: 1,
    explanation:
      "'Suitable and sufficient' means the assessment must identify all significant hazards, evaluate the level of risk, and determine appropriate control measures — but it should be proportionate. A simple, low-risk task does not need a 20-page document. The assessment must be thorough enough to demonstrate that hazards have been properly considered.",
  },
  {
    id: 3,
    question: 'What is the first step in the five-step risk assessment process?',
    options: [
      'Record your findings',
      'Evaluate the risks',
      'Identify the hazards',
      'Decide who might be harmed',
    ],
    correctAnswer: 2,
    explanation:
      'Step 1 is to identify the hazards. You must visit the work site, walk the route, and systematically identify all hazards — overhead, underground, and at ground level — before you can assess who might be harmed or evaluate the risks.',
  },
  {
    id: 4,
    question:
      'During a site survey for MEWP work, which of the following would you NOT typically need to check?',
    options: [
      'Ground bearing capacity and slope gradients',
      "The MEWP operator's home address",
      'Proximity to overhead power lines',
      'Access routes for the MEWP to reach the work area',
    ],
    correctAnswer: 1,
    explanation:
      "The operator's home address is not relevant to a site survey. Ground conditions, overhead hazards, and access routes are all critical factors that must be assessed before any MEWP operation begins.",
  },
  {
    id: 5,
    question: 'A method statement for MEWP work should include which of the following?',
    options: [
      'A step-by-step task description with hazards and controls at each step',
      'Only the names of the workers involved',
      'A list of all equipment owned by the company',
      "The company's annual financial statement",
    ],
    correctAnswer: 0,
    explanation:
      'A method statement must describe the task step by step, identify the hazards at each step, and specify the control measures. It should also include competency requirements, PPE, emergency procedures, and a review date.',
  },
  {
    id: 6,
    question: 'When must a risk assessment be shared with the workforce?',
    options: [
      'Within one week of work starting',
      'Only if a worker specifically requests it',
      'Before the work begins, typically via a toolbox talk',
      'After the work is completed, as a record',
    ],
    correctAnswer: 2,
    explanation:
      'Risk assessment findings must be communicated to all affected workers before the work begins. This is typically done through a toolbox talk or site briefing. Workers must understand the hazards and controls before they start working.',
  },
  {
    id: 7,
    question: 'Which of the following is NOT a valid trigger for reviewing a risk assessment?',
    options: [
      'A near miss occurred during the operation',
      'The MEWP was replaced with a different type of machine',
      'A new worker joined the team who has not been briefed',
      'It is a sunny Tuesday',
    ],
    correctAnswer: 3,
    explanation:
      'Near misses, changes in equipment, and changes in personnel are all valid triggers for reviewing a risk assessment. The day of the week and weather (unless conditions have genuinely changed, e.g. high winds) are not valid triggers. However, risk assessments must be reviewed at least annually regardless.',
  },
  {
    id: 8,
    question: 'Why is near-miss reporting considered as important as accident reporting?',
    options: [
      'Near misses are more common than accidents and reveal weaknesses in controls',
      'Near misses result in more insurance claims',
      'The HSE only investigates near misses, not accidents',
      'Near-miss reports are optional under UK law',
    ],
    correctAnswer: 0,
    explanation:
      'Near misses are far more frequent than actual accidents and provide early warning of hazards or control failures. Reporting and investigating near misses allows you to improve risk assessments and prevent future incidents before someone is actually injured.',
  },
];

export default function MewpModule2Section1() {
  useSEO({
    title: 'Risk Assessment Process & Documentation | MEWP Module 2.1',
    description:
      'Learn the five-step risk assessment process for MEWP operations, site survey techniques, method statement preparation, and how to record, communicate, and review risk assessment findings.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button
            variant="ghost"
            className="min-h-[44px] text-white hover:text-white active:text-white p-0 -ml-1 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mewp-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Centred Header */}
        <div className="mb-12 text-center">
          <Search className="h-10 w-10 text-elec-yellow mx-auto mb-4" />
          <span className="inline-block bg-elec-yellow text-black px-3 py-1 rounded-full text-sm font-semibold mb-4">
            Module 2 — Section 1
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Risk Assessment Process &amp; Documentation
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            Understanding the legal framework, practical steps, and documentation required before
            any MEWP operation can begin
          </p>
        </div>

        {/* Quick Summary */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">00</span>
            Quick Summary
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-2 border-l-elec-yellow/50 border border-elec-yellow/30">
              <p className="font-semibold text-base text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="text-base text-white space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>Legal duty:</strong> Employers must assess risks before any MEWP
                    operation.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>Five steps:</strong> Identify, decide who's harmed, evaluate, record,
                    review.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>Site survey:</strong> Ground, overhead, access, traffic, weather,
                    lighting.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>Method statement:</strong> Step-by-step safe system of work for the
                    task.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>Communicate:</strong> Brief all workers before work begins (toolbox
                    talk).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>Review:</strong> After any incident, change, or at least annually.
                  </span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-2 border-l-elec-yellow/50 border border-elec-yellow/30">
              <p className="font-semibold text-base text-elec-yellow mb-2">On Site</p>
              <ul className="text-base text-white space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>Before arrival:</strong> Obtain site information, check for known
                    hazards.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>Walk the site:</strong> Survey the ground, overhead space, and access
                    routes.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>Document:</strong> Record findings in writing, cross-reference to method
                    statement.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>Brief the team:</strong> Ensure every worker understands the risks and
                    controls.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Learning Outcomes */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">&nbsp;</span>
            Learning Outcomes
          </h2>
          <p className="text-white mb-4">By the end of this section, you will be able to:</p>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>
                Explain the legal requirements for risk assessment under MHSWR 1999, WAHR 2005, and
                LOLER 1998
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>
                Describe the five-step risk assessment process and apply it to MEWP operations
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Carry out a site survey and identify hazards relevant to MEWP work</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Prepare a method statement and safe system of work for a MEWP task</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Record and communicate risk assessment findings effectively</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>
                Identify the triggers for reviewing a risk assessment and apply continuous
                improvement
              </span>
            </li>
          </ul>
        </section>

        <hr className="border-white/10 mb-10" />

        {/* Section 01: Why Risk Assessment Is Required */}
        <section className="mb-10">
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Why Risk Assessment Is Required
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Risk assessment is not optional — it is a legal requirement under several key pieces
                of UK health and safety legislation. Before any MEWP operation begins, the employer
                must ensure that a suitable and sufficient risk assessment has been carried out by a
                competent person.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-elec-yellow">
                  Definition: Suitable and Sufficient
                </h3>
                <p className="text-white/80 text-sm">
                  A <strong className="text-white">suitable and sufficient</strong> risk assessment
                  is one that identifies all significant hazards, evaluates the level of risk, and
                  determines appropriate control measures — but is proportionate to the complexity
                  and level of risk involved. It does not need to cover every conceivable scenario,
                  but it must address all reasonably foreseeable hazards.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-2">Key Legislation</h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>
                        Management of Health and Safety at Work Regulations 1999 (MHSWR)
                      </strong>{' '}
                      — Regulation 3 requires every employer to carry out a suitable and sufficient
                      assessment of risks to employees and anyone else affected by their
                      undertaking. This is the primary regulation governing risk assessment in the
                      workplace.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Work at Height Regulations 2005 (WAHR)</strong> — Regulation 4
                      requires a risk assessment for all work at height activities. MEWP operations
                      fall squarely within the scope of these regulations. The hierarchy of control
                      (avoid, prevent, mitigate) must be applied.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>
                        Lifting Operations and Lifting Equipment Regulations 1998 (LOLER)
                      </strong>{' '}
                      — MEWPs are classified as lifting equipment. LOLER requires that every lifting
                      operation is properly planned, supervised, and carried out safely. A risk
                      assessment forms part of this planning requirement.
                    </div>
                  </li>
                </ul>
              </div>

              <p>
                The risk assessment must be carried out by a <strong>competent person</strong> —
                someone with sufficient training, knowledge, and experience to identify the hazards
                and evaluate the risks associated with the specific MEWP operation. This person must
                understand the type of MEWP being used, the site conditions, and the nature of the
                work.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-2">Recording Requirements</h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      If the employer has <strong>5 or more employees</strong>, the significant
                      findings must be recorded in writing (MHSWR Regulation 3(6)).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Even with fewer than 5 employees, written records are{' '}
                      <strong>strongly recommended</strong> — they provide evidence of compliance
                      and aid communication.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      The assessment must be <strong>reviewed regularly</strong> — and immediately
                      after any accident, near miss, or significant change in conditions.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Records should be retained for the duration of the project and kept available
                      for inspection by the HSE or local authority.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">Failure to Comply</h3>
                </div>
                <p className="text-white/80 text-sm">
                  Failure to carry out a suitable and sufficient risk assessment before MEWP work is
                  a criminal offence. Penalties can include unlimited fines and, in cases of gross
                  negligence resulting in death, imprisonment. Company directors and managers can be
                  held personally liable under Section 37 of the Health and Safety at Work Act 1974.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: The Five-Step Risk Assessment Process */}
        <section className="mb-10">
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400/80 text-sm font-normal">02</span>
              The Five-Step Risk Assessment Process
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The HSE recommends a straightforward five-step approach to risk assessment. This
                process applies to all work activities, including MEWP operations. Each step builds
                on the previous one, and skipping a step undermines the entire assessment.
              </p>

              <div className="space-y-3">
                {/* Step 1 */}
                <div className="bg-white/5 border border-purple-400/30 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-300 font-bold text-sm">1</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-purple-300 font-medium mb-2">Identify the Hazards</h3>
                      <p className="text-white/80 text-sm mb-2">
                        Visit the work site in person. Walk the full route the MEWP will travel and
                        the area where it will operate. Look for hazards at three levels:
                      </p>
                      <ul className="text-white space-y-1 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                          <span>
                            <strong>Overhead:</strong> Power lines, structures, beams, pipes, trees,
                            lighting rigs
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                          <span>
                            <strong>Ground level:</strong> Slopes, soft ground, voids, excavations,
                            kerbs, drains, uneven surfaces
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                          <span>
                            <strong>Underground:</strong> Buried services (gas, electric, water),
                            cellars, basements, manholes
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="bg-white/5 border border-purple-400/30 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-300 font-bold text-sm">2</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-purple-300 font-medium mb-2">
                        Decide Who Might Be Harmed and How
                      </h3>
                      <p className="text-white/80 text-sm mb-2">
                        Consider all persons who could be affected by the MEWP operation — not just
                        the operator:
                      </p>
                      <ul className="text-white space-y-1 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                          <span>
                            <strong>MEWP operator:</strong> Falls from height, entrapment,
                            electrocution, machine overturn
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                          <span>
                            <strong>Ground workers:</strong> Struck by falling objects, collision
                            with the MEWP
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                          <span>
                            <strong>Members of the public:</strong> Pedestrians, residents,
                            customers near the work area
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                          <span>
                            <strong>Other trades:</strong> Workers from other contractors operating
                            in the same area
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="bg-white/5 border border-purple-400/30 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-300 font-bold text-sm">3</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-purple-300 font-medium mb-2">
                        Evaluate the Risks and Decide on Precautions
                      </h3>
                      <p className="text-white/80 text-sm mb-2">
                        For each hazard, assess the level of risk by considering:
                      </p>
                      <ul className="text-white space-y-1 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                          <span>
                            <strong>Likelihood:</strong> How probable is it that the hazard will
                            cause harm?
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                          <span>
                            <strong>Severity:</strong> If it does cause harm, how serious would the
                            injury be?
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                          <span>
                            <strong>Risk = Likelihood x Severity:</strong> Use a risk matrix to
                            determine priority
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                          <span>
                            <strong>Existing controls:</strong> Are current precautions adequate, or
                            are further measures needed?
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="bg-white/5 border border-purple-400/30 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-300 font-bold text-sm">4</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-purple-300 font-medium mb-2">Record Your Findings</h3>
                      <p className="text-white/80 text-sm mb-2">
                        Document the assessment in a clear, structured format:
                      </p>
                      <ul className="text-white space-y-1 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                          <span>
                            Written risk assessment with hazards, risk ratings, and control measures
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                          <span>Name of the assessor, date of assessment, and review date</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                          <span>Share the document with all persons affected by the findings</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                          <span>Keep it accessible on site — not buried in a filing cabinet</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="bg-white/5 border border-purple-400/30 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-300 font-bold text-sm">5</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-purple-300 font-medium mb-2">Review and Update</h3>
                      <p className="text-white/80 text-sm mb-2">
                        A risk assessment is a living document — it must be reviewed and updated:
                      </p>
                      <ul className="text-white space-y-1 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                          <span>After any accident, incident, or near miss</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                          <span>When site conditions change (weather, ground, new structures)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                          <span>When different equipment is introduced</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                          <span>When new information about hazards becomes available</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                          <span>At a minimum, annually — even if nothing has changed</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Site Survey and Hazard Identification */}
        <section className="mb-10">
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-teal-400/80 text-sm font-normal">03</span>
              Site Survey and Hazard Identification
            </h2>
            <div className="space-y-4 text-white">
              <p>
                A thorough site survey is the foundation of any MEWP risk assessment. You should
                visit the site in person — preferably accompanied by site personnel who know the
                local hazards, underground services, and operational constraints. Never rely solely
                on photographs or third-hand descriptions.
              </p>

              <div className="bg-white/5 border border-teal-400/30 p-4 rounded-lg">
                <h3 className="text-teal-300 font-medium mb-3">Site Survey Checklist</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Ground Conditions</h4>
                    <ul className="text-white space-y-1.5">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-teal-400 mt-0.5 flex-shrink-0" />
                        <span>Bearing capacity — can the ground support the MEWP?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-teal-400 mt-0.5 flex-shrink-0" />
                        <span>Slopes and gradients — within machine limits?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-teal-400 mt-0.5 flex-shrink-0" />
                        <span>Voids, cellars, and basements beneath the surface</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-teal-400 mt-0.5 flex-shrink-0" />
                        <span>Drainage covers, manholes, and service trenches</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-teal-400 mt-0.5 flex-shrink-0" />
                        <span>Recent excavations or backfilled areas</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Overhead Hazards</h4>
                    <ul className="text-white space-y-1.5">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-teal-400 mt-0.5 flex-shrink-0" />
                        <span>Power lines — overhead and spanning the area</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-teal-400 mt-0.5 flex-shrink-0" />
                        <span>Structures, beams, soffits, canopies</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-teal-400 mt-0.5 flex-shrink-0" />
                        <span>Trees, branches, and vegetation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-teal-400 mt-0.5 flex-shrink-0" />
                        <span>Building facades and projecting features</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-teal-400 mt-0.5 flex-shrink-0" />
                        <span>Minimum safe clearance distances</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-teal-400/30 p-4 rounded-lg">
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Access and Traffic</h4>
                    <ul className="text-white space-y-1.5">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-teal-400 mt-0.5 flex-shrink-0" />
                        <span>Access route width — sufficient for the MEWP?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-teal-400 mt-0.5 flex-shrink-0" />
                        <span>Height restrictions on access routes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-teal-400 mt-0.5 flex-shrink-0" />
                        <span>Surface condition of access routes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-teal-400 mt-0.5 flex-shrink-0" />
                        <span>Vehicle and pedestrian traffic movements</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-teal-400 mt-0.5 flex-shrink-0" />
                        <span>Need for traffic management or banksmen</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Environmental Factors</h4>
                    <ul className="text-white space-y-1.5">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-teal-400 mt-0.5 flex-shrink-0" />
                        <span>Weather exposure — wind, rain, ice, lightning</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-teal-400 mt-0.5 flex-shrink-0" />
                        <span>Lighting conditions — daylight and artificial</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-teal-400 mt-0.5 flex-shrink-0" />
                        <span>Proximity to members of the public</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-teal-400 mt-0.5 flex-shrink-0" />
                        <span>Other trades and contractors working nearby</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-teal-400 mt-0.5 flex-shrink-0" />
                        <span>Noise, dust, fumes, or other environmental hazards</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">Overhead Power Lines</h3>
                </div>
                <p className="text-white/80 text-sm">
                  Overhead power lines are one of the most dangerous hazards for MEWP operations.
                  Contact or close proximity can cause fatal electrocution. You must identify all
                  overhead lines during your survey and maintain the safe clearance distances
                  specified in HSE guidance document GS6. If in doubt, contact the Distribution
                  Network Operator (DNO) before work begins. Never assume a line is dead — treat all
                  lines as live.
                </p>
              </div>

              <p>
                Record all findings from the site survey with photographs where possible. Note the
                date, time, weather conditions, and the names of anyone who accompanied you. This
                information forms the basis of your risk assessment and method statement.
              </p>
            </div>
          </div>
        </section>

        {/* Section 04: Safe System of Work / Method Statement */}
        <section className="mb-10">
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-red-400/80 text-sm font-normal">04</span>
              Safe System of Work / Method Statement
            </h2>
            <div className="space-y-4 text-white">
              <p>
                A safe system of work (SSOW) — often documented as a method statement — describes
                how the MEWP operation will be carried out safely. It translates the findings of the
                risk assessment into a practical, step-by-step procedure that workers can follow on
                site.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-elec-yellow">
                  Definition: Method Statement
                </h3>
                <p className="text-white/80 text-sm">
                  A <strong className="text-white">method statement</strong> (also called a safe
                  system of work or SSOW) is a document that describes in a logical sequence exactly
                  how a job is to be carried out safely and without risks to health. It includes
                  what hazards have been identified and how they will be controlled at each step of
                  the process.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-3">
                  <ClipboardList className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  Method Statement Components
                </h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Reference number:</strong> Unique identifier, cross-referenced to the
                      risk assessment
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Author name and date:</strong> Who prepared the method statement and
                      when
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Task description:</strong> Step-by-step breakdown of the work — from
                      mobilisation to demobilisation
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Hazards at each step:</strong> What could go wrong at each stage of
                      the process
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Control measures:</strong> Specific actions to eliminate or reduce
                      each hazard
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Competencies and training:</strong> Qualifications and training
                      required for each role (e.g. IPAF PAL card)
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>PPE requirements:</strong> Hard hat, hi-vis vest, harness, safety
                      boots — specified for each task step
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Emergency procedures:</strong> What to do if something goes wrong —
                      rescue plan, first aid, emergency contacts
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Review date:</strong> When the method statement will next be reviewed
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Signatures:</strong> Author, supervisor, and all workers who have been
                      briefed
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-red-400/30 p-4 rounded-lg">
                <h3 className="text-red-300 font-medium mb-3">
                  <FileText className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  Example Method Statement Outline — MEWP Operation
                </h3>
                <div className="text-sm space-y-3">
                  <div className="border-b border-white/10 pb-2">
                    <p className="text-white/60 text-xs uppercase tracking-wider mb-1">Header</p>
                    <p className="text-white">
                      Ref: MS-2024-047 | RA Ref: RA-2024-047 | Author: J. Smith | Date: 15/01/2024 |
                      Review: 15/07/2024
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <span className="text-white/40 font-mono text-xs mt-0.5 w-5 text-right flex-shrink-0">
                        1.
                      </span>
                      <div>
                        <p className="text-white">
                          <strong>Mobilisation and set-up area</strong>
                        </p>
                        <p className="text-white/60 text-xs">
                          Hazard: Traffic on access route | Control: Banksman, hi-vis, barriers
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-white/40 font-mono text-xs mt-0.5 w-5 text-right flex-shrink-0">
                        2.
                      </span>
                      <div>
                        <p className="text-white">
                          <strong>Pre-use checks on MEWP</strong>
                        </p>
                        <p className="text-white/60 text-xs">
                          Hazard: Defective equipment | Control: Operator checklist, report defects
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-white/40 font-mono text-xs mt-0.5 w-5 text-right flex-shrink-0">
                        3.
                      </span>
                      <div>
                        <p className="text-white">
                          <strong>Position MEWP and deploy outriggers</strong>
                        </p>
                        <p className="text-white/60 text-xs">
                          Hazard: Soft ground, slopes | Control: Spreader pads, check level
                          indicator
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-white/40 font-mono text-xs mt-0.5 w-5 text-right flex-shrink-0">
                        4.
                      </span>
                      <div>
                        <p className="text-white">
                          <strong>Elevate platform to working height</strong>
                        </p>
                        <p className="text-white/60 text-xs">
                          Hazard: Overhead obstructions, entrapment | Control: Spotter, exclusion
                          zone
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-white/40 font-mono text-xs mt-0.5 w-5 text-right flex-shrink-0">
                        5.
                      </span>
                      <div>
                        <p className="text-white">
                          <strong>Carry out work task</strong>
                        </p>
                        <p className="text-white/60 text-xs">
                          Hazard: Falling objects, overreach | Control: Tool lanyards, no leaning
                          over guardrails
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-white/40 font-mono text-xs mt-0.5 w-5 text-right flex-shrink-0">
                        6.
                      </span>
                      <div>
                        <p className="text-white">
                          <strong>Lower platform and stow MEWP</strong>
                        </p>
                        <p className="text-white/60 text-xs">
                          Hazard: Ground personnel struck | Control: Warning horn, visual check
                          below
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-white/40 font-mono text-xs mt-0.5 w-5 text-right flex-shrink-0">
                        7.
                      </span>
                      <div>
                        <p className="text-white">
                          <strong>Demobilisation</strong>
                        </p>
                        <p className="text-white/60 text-xs">
                          Hazard: Traffic | Control: Banksman, barriers until MEWP loaded
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-white/10 pt-2">
                    <p className="text-white/60 text-xs">
                      PPE: Hard hat, hi-vis, harness (if required), safety boots | Emergency: Rescue
                      plan attached | Signed: ________
                    </p>
                  </div>
                </div>
              </div>

              <p>
                The method statement must be practical and specific to the actual task. A generic
                document that has not been tailored to the site and the work being performed is of
                little value. Workers should be able to read the method statement and understand
                exactly what they need to do, what the hazards are, and how they are being
                controlled.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Recording and Communicating Findings */}
        <section className="mb-10">
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400/80 text-sm font-normal">05</span>
              Recording and Communicating Findings
            </h2>
            <div className="space-y-4 text-white">
              <p>
                A risk assessment that sits in a filing cabinet is worthless. The entire purpose of
                the assessment is to inform the people who are doing the work — and those affected
                by it — about the hazards they face and the precautions that must be taken.
                Communication is just as important as the assessment itself.
              </p>

              <div className="bg-white/5 border border-cyan-400/30 p-4 rounded-lg">
                <h3 className="text-cyan-300 font-medium mb-2">Sharing Risk Assessment Findings</h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong>Toolbox talk:</strong> The most common method — a brief, focused
                      discussion with the workforce before work begins, covering the key hazards and
                      controls.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong>Displayed on site:</strong> The risk assessment and method statement
                      should be physically available on site — in the site office, welfare area, or
                      posted on a notice board.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong>Language appropriate:</strong> If workers have limited English, the
                      assessment may need to be translated or communicated using diagrams,
                      photographs, or video.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong>Understood, not just signed:</strong> Getting a signature on a
                      briefing sheet is not enough. Workers must genuinely understand the risks and
                      controls. Ask questions to confirm.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-2">Method Statement Briefing</h3>
                <p className="text-white/80 text-sm mb-3">
                  The method statement briefing must take place{' '}
                  <strong className="text-white">before</strong> the MEWP operation starts. This is
                  a separate, more detailed briefing than a general site induction:
                </p>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Walk through each step of the method statement with the team</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Confirm each person understands their role and responsibilities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Highlight the emergency procedures and rescue plan</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Allow time for questions — encourage workers to raise concerns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Record attendance with names, signatures, date, and time</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-2">Record Keeping</h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Keep the risk assessment and method statement on site for the duration of the
                      work
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Retain completed documents after the work is finished — typically for at least
                      3 years, or longer for high-risk work
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Records must be available for inspection by the HSE, local authority, or
                      principal contractor
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Store toolbox talk records with the associated risk assessment and method
                      statement
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">Common Failing</h3>
                </div>
                <p className="text-white/80 text-sm">
                  One of the most common failings identified by HSE inspectors is risk assessments
                  that exist on paper but have not been communicated to the workforce. A risk
                  assessment is only effective if the people doing the work know what it says and
                  understand how to follow it. "I didn't know" is not an acceptable defence — but it
                  is evidence that the employer failed to communicate the findings.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Review and Continuous Improvement */}
        <section className="mb-10">
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Review and Continuous Improvement
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Risk assessment is not a one-off exercise. It is a continuous cycle of assessment,
                implementation, monitoring, and review. The goal is not just to prevent the next
                accident — it is to continuously improve the safety of MEWP operations over time.
              </p>

              <div className="bg-white/5 border border-elec-yellow/30 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-3">
                  <RefreshCw className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  Triggers for Review
                </h3>
                <p className="text-white/80 text-sm mb-3">
                  The risk assessment must be reviewed and, if necessary, updated when any of the
                  following occurs:
                </p>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Accident or near miss:</strong> Any incident related to the MEWP
                      operation — even if no one was injured — triggers an immediate review.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Change in equipment:</strong> A different type or model of MEWP is
                      introduced, or the machine is replaced.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Change in site conditions:</strong> Ground conditions alter (e.g.
                      heavy rain), new structures are erected, or access routes change.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Change in personnel:</strong> New workers join the team, or the MEWP
                      operator changes.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>New information about hazards:</strong> A previously unidentified
                      hazard is discovered, or industry guidance is updated.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>At minimum, annually:</strong> Even if none of the above triggers
                      apply, the assessment must be reviewed at least once a year.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-2">Lessons Learned</h3>
                <p className="text-white/80 text-sm mb-3">
                  Every review should generate lessons learned that feed into future risk
                  assessments:
                </p>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      What hazards were identified during the work that were not in the original
                      assessment?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Were the control measures effective in practice, or did they need to be
                      adapted?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Did any near misses occur that indicate a weakness in the safe system of work?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      What feedback did the workforce provide about the practicality of the
                      controls?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Can any improvements be made for the next similar operation?</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-elec-yellow/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-elec-yellow">
                  The Importance of Near-Miss Reporting
                </h3>
                <p className="text-white/80 text-sm mb-3">
                  Near misses are incidents where no one was injured but the potential for harm
                  existed. They are often referred to as "free lessons" because they reveal
                  weaknesses in controls without anyone actually being hurt.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-white mb-2 text-sm">Why near misses matter:</h4>
                    <ul className="text-white/80 space-y-1 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Far more frequent than actual accidents</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Provide early warning of control failures</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Allow you to fix problems before someone is hurt</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Build a safety culture when reporting is encouraged</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-2 text-sm">Encourage reporting by:</h4>
                    <ul className="text-white/80 space-y-1 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Making reporting quick and easy (simple forms)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>No blame — focus on learning, not punishment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Acting on reports visibly and promptly</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Feeding outcomes back into risk assessments</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">Heinrich's Triangle</h3>
                </div>
                <p className="text-white/80 text-sm">
                  Research suggests that for every major injury, there are approximately 29 minor
                  injuries and 300 near misses. This means that behind every serious MEWP accident,
                  there were hundreds of warning signs that went unreported or unacted upon.
                  Investigating near misses is one of the most effective ways to prevent serious
                  incidents.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">&nbsp;</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-white/80 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <div className="mt-12">
          <Quiz title="Risk Assessment Process & Documentation Quiz" questions={quizQuestions} />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mewp-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mewp-module-2-section-2">
              Next: The Six Key Hazards
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
}
