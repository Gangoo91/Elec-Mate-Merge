import {
  ArrowLeft,
  ShieldCheck,
  CheckCircle,
  AlertTriangle,
  ClipboardList,
  FileText,
  Eye,
  Scale,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'hazard-vs-risk',
    question: 'What is the difference between a hazard and a risk?',
    options: [
      'A hazard is the likelihood of harm; a risk is something that could cause harm',
      'A hazard is something with the potential to cause harm; a risk is the likelihood that harm will occur',
      'A hazard and a risk are the same thing',
      'A hazard only applies to chemicals; a risk applies to everything else',
    ],
    correctIndex: 1,
    explanation:
      'A hazard is anything with the potential to cause harm (e.g. a trailing cable, working at height, electricity). A risk is the likelihood that the hazard will actually cause harm, combined with the severity of that harm. Risk assessments evaluate both the hazard and the associated risk to determine the correct controls.',
  },
  {
    id: 'hierarchy-top',
    question:
      'What is the most effective level of the Hierarchy of Controls?',
    options: [
      'Personal Protective Equipment (PPE)',
      'Administrative controls such as training',
      'Elimination &mdash; removing the hazard entirely',
      'Engineering controls such as guards and barriers',
    ],
    correctIndex: 2,
    explanation:
      'Elimination is the most effective control because it removes the hazard entirely, meaning there is zero residual risk. The Hierarchy of Controls ranks measures from most effective (elimination) to least effective (PPE). PPE should always be the last resort, not the first response.',
  },
  {
    id: 'dynamic-ra',
    question: 'When should a dynamic risk assessment be carried out?',
    options: [
      'Only at the start of a new project before any work begins',
      'Once a year as part of the annual safety review',
      'When conditions change or unexpected hazards appear on site',
      'Only by the site manager, never by individual operatives',
    ],
    correctIndex: 2,
    explanation:
      'A dynamic risk assessment is an ongoing, real-time process carried out when site conditions change or unexpected hazards arise that were not covered by the original written risk assessment. Every worker has a responsibility to carry out dynamic risk assessments throughout the working day using the STOP-THINK-ACT process.',
  },
];

const faqs = [
  {
    question: 'Who is responsible for writing risk assessments on a construction site?',
    answer:
      'The employer (or principal contractor on multi-employer sites) has the legal duty to ensure suitable and sufficient risk assessments are carried out under the Management of Health and Safety at Work Regulations 1999. In practice, risk assessments are typically written by a competent person such as a health and safety manager, site manager, or supervisor with the appropriate training and experience. However, workers should be consulted during the process, as they often have the best understanding of the practical hazards involved in their specific tasks.',
  },
  {
    question: 'Do I need to read the risk assessment and method statement before starting work?',
    answer:
      'Yes. Every worker has a duty to follow the safe systems of work described in the risk assessment and method statement. You should read and understand the RAMS for your task before starting work, and sign to confirm you have done so. If anything in the RAMS is unclear, or if the conditions on site do not match what is described, you must raise this with your supervisor before proceeding. Working without reading the RAMS is a common cause of accidents and a breach of your duties under the Health and Safety at Work etc. Act 1974.',
  },
  {
    question: 'What is the difference between a risk assessment and a method statement?',
    answer:
      'A risk assessment identifies hazards, evaluates the level of risk, and determines what control measures are needed to reduce that risk to an acceptable level. A method statement describes the step-by-step safe method of work for carrying out a specific task, incorporating the control measures identified in the risk assessment. They are closely linked and are often combined into a single RAMS (Risk Assessment and Method Statement) document. The risk assessment answers "what could go wrong and how do we prevent it?" while the method statement answers "how do we do this job safely, step by step?"',
  },
  {
    question: 'Can a risk assessment be generic, or must it be site-specific?',
    answer:
      'Risk assessments can start from a generic template for common tasks (e.g. cable installation, using power tools), but they must always be reviewed and adapted to reflect the specific conditions of the site and task. A generic risk assessment that has not been tailored to the actual working environment is unlikely to be considered "suitable and sufficient" under the Management Regulations 1999. Factors such as the location, weather conditions, proximity to other trades, and the experience of the workforce must all be considered and reflected in the assessment.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Under which regulation are employers required to carry out risk assessments?',
    options: [
      'The Health and Safety at Work etc. Act 1974',
      'The Management of Health and Safety at Work Regulations 1999',
      'The Construction (Design and Management) Regulations 2015',
      'The Personal Protective Equipment at Work Regulations 2022',
    ],
    correctAnswer: 1,
    explanation:
      'The Management of Health and Safety at Work Regulations 1999, Regulation 3, places a specific legal duty on employers to carry out suitable and sufficient assessments of the risks to workers and others who may be affected by their work activities. HASAWA 1974 is the overarching Act but does not specifically mandate risk assessments.',
  },
  {
    id: 2,
    question: 'What is the correct order of the 5-step risk assessment process?',
    options: [
      'Record findings, identify hazards, evaluate risks, decide who is harmed, review',
      'Evaluate risks, identify hazards, decide who is harmed, record findings, review',
      'Identify hazards, decide who might be harmed, evaluate risks and decide precautions, record findings, review and update',
      'Decide who is harmed, identify hazards, review, record findings, evaluate risks',
    ],
    correctAnswer: 2,
    explanation:
      'The HSE 5-step risk assessment process follows a logical sequence: (1) Identify hazards, (2) Decide who might be harmed and how, (3) Evaluate the risks and decide on precautions, (4) Record your significant findings, and (5) Review your assessment and update if necessary. This sequence ensures a thorough and systematic approach.',
  },
  {
    id: 3,
    question: 'In the Hierarchy of Controls, what should be tried before PPE?',
    options: [
      'Nothing &mdash; PPE is always the first control measure',
      'Elimination, substitution, engineering controls, and administrative controls',
      'Only engineering controls',
      'Only elimination and substitution',
    ],
    correctAnswer: 1,
    explanation:
      'The full Hierarchy of Controls, from most to least effective, is: Elimination, Substitution, Engineering controls, Administrative controls, and finally PPE. All higher-level controls should be considered and implemented where reasonably practicable before relying on PPE, which is always the last resort because it only protects the individual wearing it and depends on correct use.',
  },
  {
    id: 4,
    question: 'What does RAMS stand for?',
    options: [
      'Risk Analysis and Management System',
      'Risk Assessment and Method Statement',
      'Regulatory Assessment of Management Standards',
      'Review and Monitoring of Safety',
    ],
    correctAnswer: 1,
    explanation:
      'RAMS stands for Risk Assessment and Method Statement. It is a combined document widely used in the construction industry that pairs the risk assessment (identifying hazards and controls) with the method statement (the step-by-step safe system of work). RAMS are typically required before any work begins on a construction site.',
  },
  {
    id: 5,
    question: 'What does the STOP-THINK-ACT process relate to?',
    options: [
      'The formal written risk assessment procedure',
      'The emergency evacuation procedure',
      'Dynamic risk assessment carried out in real time',
      'The accident reporting process under RIDDOR',
    ],
    correctAnswer: 2,
    explanation:
      'STOP-THINK-ACT is the process used during dynamic risk assessment. When conditions change or an unexpected hazard appears, workers should STOP what they are doing, THINK about the new hazard and how to control it, and then ACT by either implementing a safe solution or stopping work and reporting the issue if it cannot be controlled safely.',
  },
  {
    id: 6,
    question:
      'Employers with how many or more employees must record their risk assessment findings in writing?',
    options: [
      '1 or more',
      '3 or more',
      '5 or more',
      '10 or more',
    ],
    correctAnswer: 2,
    explanation:
      'Under the Management of Health and Safety at Work Regulations 1999, employers with 5 or more employees must record the significant findings of their risk assessments in writing. However, even employers with fewer than 5 employees are still required to carry out risk assessments &mdash; they simply do not have to record them in writing (although it is strongly recommended as good practice).',
  },
  {
    id: 7,
    question: 'Which of the following is the most common cause of fatal injuries on construction sites?',
    options: [
      'Electric shock',
      'Fire and explosion',
      'Falls from height',
      'Exposure to harmful substances',
    ],
    correctAnswer: 2,
    explanation:
      'Falls from height are consistently the single largest cause of fatal injuries in the UK construction industry, accounting for approximately 40&ndash;50% of all construction fatalities each year. This is why working at height is subject to specific regulations (Work at Height Regulations 2005) and must always be addressed in risk assessments for construction work.',
  },
  {
    id: 8,
    question:
      'Under HASAWA 1974, which sections set out employer and employee duties?',
    options: [
      'Section 1 (general purpose) and Section 6 (manufacturers)',
      'Section 2 (employer duties) and Section 7 (employee duties)',
      'Section 4 (premises) and Section 8 (interference)',
      'Section 3 (non-employees) and Section 9 (charges for safety)',
    ],
    correctAnswer: 1,
    explanation:
      'Section 2 of the Health and Safety at Work etc. Act 1974 sets out the general duties of employers to their employees, including providing safe plant and systems of work, information, instruction, training, and supervision. Section 7 sets out the duties of employees, including taking reasonable care for their own health and safety and that of others, and cooperating with the employer on safety matters. Section 3 covers duties to non-employees.',
  },
];

export default function CscsCardModule2Section1() {
  useSEO({
    title: 'Risk Assessment & Method Statements | CSCS Card Module 2.1',
    description:
      'Learn the 5-step risk assessment process, hierarchy of controls, RAMS preparation, dynamic risk assessment, and legal responsibilities under UK health and safety law for the CSCS HS&E test.',
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
            <Link to="../cscs-card-module-2">
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
          <ShieldCheck className="h-10 w-10 text-green-400 mx-auto mb-4" />
          <span className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
            MODULE 2 &middot; SECTION 1
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Risk Assessment &amp; Method Statements
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            The 5-step risk assessment process, hierarchy of controls, RAMS preparation,
            dynamic risk assessment, and your legal responsibilities on site
          </p>
        </div>

        {/* Quick Summary */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-green-400/80 text-sm font-normal">00</span>
            Quick Summary
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-green-500/10 border-l-2 border-l-green-500/50 border border-green-500/30">
              <p className="font-semibold text-base text-green-400 mb-2">In 30 Seconds</p>
              <ul className="text-base text-white space-y-1.5">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span>
                    <strong>Hazard vs Risk:</strong> A hazard is anything that could cause harm; risk is the
                    likelihood and severity of that harm.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span>
                    <strong>5 Steps:</strong> Identify hazards, decide who is harmed, evaluate risks, record
                    findings, review and update.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span>
                    <strong>Hierarchy:</strong> Eliminate &rarr; Substitute &rarr; Engineer &rarr;
                    Admin &rarr; PPE (last resort).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span>
                    <strong>RAMS:</strong> Risk Assessment and Method Statement &mdash; read, understand,
                    and sign before starting work.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span>
                    <strong>Dynamic RA:</strong> STOP-THINK-ACT when conditions change on site.
                  </span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-green-500/10 border-l-2 border-l-green-500/50 border border-green-500/30">
              <p className="font-semibold text-base text-green-400 mb-2">For the CSCS Test</p>
              <ul className="text-base text-white space-y-1.5">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span>
                    <strong>Legal duty:</strong> Management of Health and Safety at Work Regulations
                    1999 requires risk assessments.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span>
                    <strong>Written records:</strong> Required for employers with 5 or more employees.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span>
                    <strong>Falls from height:</strong> The single biggest killer on UK construction sites.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span>
                    <strong>HASAWA 1974:</strong> Section 2 (employer duties), Section 7 (employee duties).
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Learning Outcomes */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-green-400/80 text-sm font-normal">&nbsp;</span>
            Learning Outcomes
          </h2>
          <p className="text-white mb-4">By the end of this section, you will be able to:</p>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <span>Explain the difference between a hazard and a risk with construction examples</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <span>Describe the 5-step risk assessment process and apply it to common site tasks</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <span>List the Hierarchy of Controls in order and give an example at each level</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <span>Explain the purpose of a method statement and its relationship to a risk assessment</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <span>Carry out a dynamic risk assessment using the STOP-THINK-ACT process</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <span>
                State the employer and employee duties under HASAWA 1974 Sections 2, 3, and 7
              </span>
            </li>
          </ul>
        </section>

        <hr className="border-white/10 mb-10" />

        {/* Section 01: What Is a Risk Assessment? */}
        <section className="mb-10">
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-green-400/80 text-sm font-normal">01</span>
              What Is a Risk Assessment?
            </h2>
            <div className="space-y-4 text-white">
              <p>
                A risk assessment is a careful examination of what could cause harm to people in the
                workplace, so that you can determine whether you have taken enough precautions or
                whether more needs to be done to prevent injury or ill health. It is a{' '}
                <strong>legal requirement</strong> under the Management of Health and Safety at Work
                Regulations 1999, Regulation 3, for every employer to carry out suitable and sufficient
                risk assessments.
              </p>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-green-400">Key Definitions</h3>
                <div className="space-y-3 text-sm">
                  <div className="bg-white/5 border border-green-400/20 p-3 rounded-lg">
                    <p className="text-green-300 font-medium mb-1">Hazard</p>
                    <p className="text-white/80">
                      Anything with the <strong className="text-white">potential to cause harm</strong>.
                      Examples include trailing cables, working at height, live electrical conductors,
                      asbestos, moving vehicles on site, and noisy machinery.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-green-400/20 p-3 rounded-lg">
                    <p className="text-green-300 font-medium mb-1">Risk</p>
                    <p className="text-white/80">
                      The <strong className="text-white">likelihood</strong> that the hazard will cause
                      harm, combined with the <strong className="text-white">severity</strong> of that
                      harm. A high hazard with good controls in place may result in a low risk. An
                      uncontrolled minor hazard could present a high risk.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-green-400 font-medium mb-3">Why Risk Assessments Are Essential</h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong>Legal requirement:</strong> Failure to carry out risk assessments is a
                      criminal offence that can result in prosecution, unlimited fines, and imprisonment
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong>Prevent injuries and ill health:</strong> By identifying hazards before
                      work starts, controls can be put in place to eliminate or reduce the risk
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong>Protect everyone:</strong> Risk assessments must consider not only
                      employees but also contractors, visitors, members of the public, and anyone
                      else who could be affected
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong>Demonstrate compliance:</strong> Written risk assessments provide
                      evidence that the employer has fulfilled their legal duty and can be crucial in
                      the event of an HSE investigation or prosecution
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-green-400 font-medium mb-2">Employer Duties</h3>
                <p className="text-white/80 text-sm mb-3">
                  The Management of Health and Safety at Work Regulations 1999 require every
                  employer to:
                </p>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Make a suitable and sufficient assessment of the risks to employees and
                      non-employees arising from work activities
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Appoint one or more competent persons to assist with health and safety measures
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Record the significant findings of the risk assessment if employing 5 or more
                      people
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Review and update risk assessments regularly, especially after any incident,
                      change in working practices, or change in legislation
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">CSCS Test Tip</h3>
                </div>
                <p className="text-white/80 text-sm">
                  The CSCS HS&amp;E test frequently asks about the difference between a hazard and
                  a risk. Remember: a <strong className="text-white">hazard</strong> is something
                  that <em>could</em> cause harm; a <strong className="text-white">risk</strong> is
                  how <em>likely</em> it is to cause harm and how <em>severe</em> that harm would
                  be. Do not confuse the two.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: The 5-Step Risk Assessment Process */}
        <section className="mb-10">
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-green-400/80 text-sm font-normal">02</span>
              The 5-Step Risk Assessment Process
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The Health and Safety Executive (HSE) recommends a straightforward 5-step approach
                to risk assessment. This process applies to all workplaces and tasks, from simple
                office activities to complex construction operations.
              </p>

              {/* 5-Step Flowchart Diagram */}
              <div className="bg-white/5 border border-green-400/30 p-4 sm:p-6 rounded-lg">
                <h3 className="text-green-400 font-medium mb-4 text-center text-sm uppercase tracking-wider">
                  The 5-Step Risk Assessment Process
                </h3>
                <div className="flex flex-col items-center gap-2">
                  {/* Step 1 */}
                  <div className="w-full max-w-md bg-green-500/15 border border-green-400/40 rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <div className="w-7 h-7 rounded-full bg-green-500/30 border border-green-400/60 flex items-center justify-center flex-shrink-0">
                        <span className="text-green-300 font-bold text-sm">1</span>
                      </div>
                      <span className="text-green-300 font-semibold text-sm">Identify Hazards</span>
                    </div>
                    <p className="text-white/60 text-xs">
                      Walk the site. What could cause harm?
                    </p>
                  </div>
                  {/* Arrow */}
                  <div className="flex items-center justify-center">
                    <div className="h-4 w-0.5 bg-green-400/40" />
                  </div>
                  {/* Step 2 */}
                  <div className="w-full max-w-md bg-green-500/15 border border-green-400/40 rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <div className="w-7 h-7 rounded-full bg-green-500/30 border border-green-400/60 flex items-center justify-center flex-shrink-0">
                        <span className="text-green-300 font-bold text-sm">2</span>
                      </div>
                      <span className="text-green-300 font-semibold text-sm">Who Might Be Harmed?</span>
                    </div>
                    <p className="text-white/60 text-xs">
                      Workers, visitors, public, vulnerable groups
                    </p>
                  </div>
                  {/* Arrow */}
                  <div className="flex items-center justify-center">
                    <div className="h-4 w-0.5 bg-green-400/40" />
                  </div>
                  {/* Step 3 */}
                  <div className="w-full max-w-md bg-green-500/15 border border-green-400/40 rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <div className="w-7 h-7 rounded-full bg-green-500/30 border border-green-400/60 flex items-center justify-center flex-shrink-0">
                        <span className="text-green-300 font-bold text-sm">3</span>
                      </div>
                      <span className="text-green-300 font-semibold text-sm">Evaluate Risks &amp; Decide Precautions</span>
                    </div>
                    <p className="text-white/60 text-xs">
                      Apply Hierarchy of Controls. What more can be done?
                    </p>
                  </div>
                  {/* Arrow */}
                  <div className="flex items-center justify-center">
                    <div className="h-4 w-0.5 bg-green-400/40" />
                  </div>
                  {/* Step 4 */}
                  <div className="w-full max-w-md bg-green-500/15 border border-green-400/40 rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <div className="w-7 h-7 rounded-full bg-green-500/30 border border-green-400/60 flex items-center justify-center flex-shrink-0">
                        <span className="text-green-300 font-bold text-sm">4</span>
                      </div>
                      <span className="text-green-300 font-semibold text-sm">Record Your Findings</span>
                    </div>
                    <p className="text-white/60 text-xs">
                      Written record required for 5+ employees
                    </p>
                  </div>
                  {/* Arrow */}
                  <div className="flex items-center justify-center">
                    <div className="h-4 w-0.5 bg-green-400/40" />
                  </div>
                  {/* Step 5 */}
                  <div className="w-full max-w-md bg-green-500/15 border border-green-400/40 rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <div className="w-7 h-7 rounded-full bg-green-500/30 border border-green-400/60 flex items-center justify-center flex-shrink-0">
                        <span className="text-green-300 font-bold text-sm">5</span>
                      </div>
                      <span className="text-green-300 font-semibold text-sm">Review &amp; Update</span>
                    </div>
                    <p className="text-white/60 text-xs">
                      After incidents, changes, or at least annually
                    </p>
                  </div>
                </div>
                <p className="text-white/50 text-xs text-center mt-4 italic">
                  The 5-step process is cyclical &mdash; step 5 feeds back into step 1 when conditions change.
                </p>
              </div>

              {/* Step Details */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-green-400 font-medium mb-3">
                  <ClipboardList className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  Step-by-Step Breakdown
                </h3>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-green-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-500/20 border border-green-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-green-300 font-bold text-sm">1</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-green-300 font-medium mb-1">Identify Hazards</h4>
                        <p className="text-white/80 text-sm">
                          Walk around the workplace or site, observe work activities, talk to workers, check
                          manufacturer instructions, review accident records, and consider non-routine
                          activities. On a construction site, common hazards include working at height,
                          moving plant, excavations, live services, dust, noise, and manual handling. Think
                          about what could realistically go wrong during each activity.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-green-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-500/20 border border-green-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-green-300 font-bold text-sm">2</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-green-300 font-medium mb-1">Decide Who Might Be Harmed</h4>
                        <p className="text-white/80 text-sm">
                          Consider everyone who could be affected: employees, contractors, sub-contractors,
                          visitors, members of the public, delivery drivers, and anyone passing by. Pay
                          particular attention to <strong className="text-white">vulnerable groups</strong> such
                          as young workers, new starters, pregnant workers, people with disabilities, and
                          lone workers. Think about how each group might be exposed to the hazard.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-green-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-500/20 border border-green-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-green-300 font-bold text-sm">3</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-green-300 font-medium mb-1">
                          Evaluate Risks &amp; Decide Precautions
                        </h4>
                        <p className="text-white/80 text-sm">
                          For each hazard, consider the existing controls already in place, then evaluate
                          whether the remaining (residual) risk is acceptable. If not, decide what
                          additional precautions are needed using the{' '}
                          <strong className="text-white">Hierarchy of Controls</strong>. The aim is to
                          reduce the risk to a level that is{' '}
                          <strong className="text-white">as low as reasonably practicable (ALARP)</strong>.
                          For example: hazard = working at height on a scaffold; existing control =
                          guardrails fitted; additional control = toe boards and brick guards added,
                          scaffold inspected weekly.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-green-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-500/20 border border-green-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-green-300 font-bold text-sm">4</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-green-300 font-medium mb-1">Record Your Significant Findings</h4>
                        <p className="text-white/80 text-sm">
                          Employers with <strong className="text-white">5 or more employees</strong> must
                          record their risk assessment findings in writing. The record should include the
                          hazards identified, who might be harmed, the existing controls, the residual
                          risk level, and any additional controls required. The assessment must be shared
                          with all affected workers and be accessible on site. Even employers with fewer
                          than 5 employees should keep written records as good practice.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-green-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-500/20 border border-green-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-green-300 font-bold text-sm">5</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-green-300 font-medium mb-1">Review &amp; Update</h4>
                        <p className="text-white/80 text-sm">
                          Risk assessments are <strong className="text-white">living documents</strong> that
                          must be reviewed and updated regularly. Triggers for review include: after an
                          accident or near miss, when working methods or equipment change, when new
                          information about hazards becomes available, when new legislation is introduced,
                          and at a minimum of <strong className="text-white">annually</strong>. A risk
                          assessment that sits in a drawer and is never revisited is not fulfilling its
                          purpose.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-green-400">Construction Example</h3>
                <p className="text-white/80 text-sm">
                  <strong className="text-white">Task:</strong> Installing a consumer unit in a
                  domestic property.{' '}
                  <strong className="text-white">Hazard:</strong> Live electrical conductors.{' '}
                  <strong className="text-white">Who:</strong> Electrician, other trades working
                  nearby, homeowner.{' '}
                  <strong className="text-white">Risk evaluation:</strong> High severity (electrocution
                  can be fatal), reduced likelihood with controls.{' '}
                  <strong className="text-white">Controls:</strong> Isolate supply, lock off, prove
                  dead, use GS38 test leads, erect warning signs, competent person only.{' '}
                  <strong className="text-white">Record:</strong> Documented in RAMS and signed by all
                  operatives.{' '}
                  <strong className="text-white">Review:</strong> Before each new installation and
                  after any near miss.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: The Hierarchy of Controls */}
        <section className="mb-10">
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-green-400/80 text-sm font-normal">03</span>
              The Hierarchy of Controls
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The Hierarchy of Controls is a system for selecting the most effective control
                measures to reduce risk. Controls at the top of the hierarchy are the most effective
                because they eliminate or reduce the hazard at source. Controls at the bottom are
                least effective because they rely on individual behaviour and only protect the person
                using them.
              </p>

              {/* Hierarchy of Controls Pyramid */}
              <div className="bg-white/5 border border-green-400/30 p-4 sm:p-6 rounded-lg">
                <h3 className="text-green-400 font-medium mb-4 text-center text-sm uppercase tracking-wider">
                  Hierarchy of Controls
                </h3>
                <div className="flex flex-col items-center gap-1.5 max-w-lg mx-auto">
                  {/* Level 1 - Elimination (narrowest) */}
                  <div className="w-[40%] sm:w-[35%] bg-green-500/25 border border-green-400/50 rounded-t-lg rounded-b-sm p-2 text-center">
                    <p className="text-green-300 font-semibold text-xs sm:text-sm">Elimination</p>
                    <p className="text-white/50 text-[10px] sm:text-xs">Remove the hazard entirely</p>
                  </div>
                  {/* Level 2 - Substitution */}
                  <div className="w-[52%] sm:w-[48%] bg-green-500/20 border border-green-400/40 rounded-sm p-2 text-center">
                    <p className="text-green-300 font-semibold text-xs sm:text-sm">Substitution</p>
                    <p className="text-white/50 text-[10px] sm:text-xs">Replace with something less dangerous</p>
                  </div>
                  {/* Level 3 - Engineering Controls */}
                  <div className="w-[64%] sm:w-[61%] bg-green-500/15 border border-green-400/30 rounded-sm p-2 text-center">
                    <p className="text-green-300 font-semibold text-xs sm:text-sm">Engineering Controls</p>
                    <p className="text-white/50 text-[10px] sm:text-xs">Isolate people from the hazard</p>
                  </div>
                  {/* Level 4 - Administrative Controls */}
                  <div className="w-[76%] sm:w-[74%] bg-green-500/10 border border-green-400/25 rounded-sm p-2 text-center">
                    <p className="text-green-300 font-semibold text-xs sm:text-sm">Administrative Controls</p>
                    <p className="text-white/50 text-[10px] sm:text-xs">Change how people work</p>
                  </div>
                  {/* Level 5 - PPE (widest) */}
                  <div className="w-[88%] sm:w-[87%] bg-green-500/5 border border-green-400/20 rounded-sm rounded-b-lg p-2 text-center">
                    <p className="text-green-300 font-semibold text-xs sm:text-sm">PPE</p>
                    <p className="text-white/50 text-[10px] sm:text-xs">Last resort &mdash; protect the individual</p>
                  </div>
                  {/* Labels */}
                  <div className="flex justify-between w-[88%] sm:w-[87%] mt-1">
                    <span className="text-green-400/60 text-[10px] sm:text-xs italic">&uarr; Most effective</span>
                    <span className="text-green-400/60 text-[10px] sm:text-xs italic">Least effective &darr;</span>
                  </div>
                </div>
                <p className="text-white/50 text-xs text-center mt-3 italic">
                  Always start at the top. PPE should never be the first or only control measure.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-green-400 font-medium mb-3">
                  <Scale className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  Construction Examples at Each Level
                </h3>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-green-400/20 p-3 rounded-lg">
                    <h4 className="text-green-300 font-medium mb-1">1. Elimination</h4>
                    <p className="text-white/80 text-sm">
                      Prefabricate components at ground level so that working at height is not required.
                      Design out the hazard entirely &mdash; for example, installing services before
                      a ceiling is fitted rather than working above a suspended ceiling later.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-green-400/20 p-3 rounded-lg">
                    <h4 className="text-green-300 font-medium mb-1">2. Substitution</h4>
                    <p className="text-white/80 text-sm">
                      Replace a solvent-based adhesive with a water-based alternative to reduce harmful
                      fume exposure. Use battery-powered tools instead of mains-powered tools in wet
                      conditions to reduce electrical risk. Use mechanical lifting instead of manual
                      handling.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-green-400/20 p-3 rounded-lg">
                    <h4 className="text-green-300 font-medium mb-1">3. Engineering Controls</h4>
                    <p className="text-white/80 text-sm">
                      Install guardrails and edge protection on scaffolds. Use local exhaust ventilation
                      (LEV) to capture dust at source. Fit RCD protection on circuits. Install physical
                      barriers to separate pedestrians from moving vehicles on site. Use enclosed drill
                      shrouds to contain silica dust.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-green-400/20 p-3 rounded-lg">
                    <h4 className="text-green-300 font-medium mb-1">4. Administrative Controls</h4>
                    <p className="text-white/80 text-sm">
                      Provide training and toolbox talks. Implement permit-to-work systems for high-risk
                      activities. Use signage and safety warnings. Rotate workers to reduce exposure time
                      to noise or vibration. Establish safe systems of work through method statements.
                      Restrict access to certain areas.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-green-400/20 p-3 rounded-lg">
                    <h4 className="text-green-300 font-medium mb-1">5. PPE (Last Resort)</h4>
                    <p className="text-white/80 text-sm">
                      Hard hats, safety boots, hi-vis clothing, hearing protection, eye protection, dust
                      masks, gloves, and harnesses. PPE is the least effective control because it only
                      protects the individual wearing it, it depends on being worn correctly, and it can
                      be uncomfortable, leading workers to remove it. PPE should always supplement
                      higher-level controls, never replace them.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">Common Mistake</h3>
                </div>
                <p className="text-white/80 text-sm">
                  A frequent failing on construction sites is jumping straight to PPE without
                  considering the higher-level controls. If an HSE inspector asks what controls are
                  in place and the answer is &ldquo;we gave everyone hard hats and hi-vis&rdquo;,
                  this is unlikely to be considered suitable and sufficient. The inspector will want
                  to see evidence that elimination, substitution, and engineering controls were
                  considered first.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Method Statements & RAMS */}
        <section className="mb-10">
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-green-400/80 text-sm font-normal">04</span>
              Method Statements &amp; RAMS
            </h2>
            <div className="space-y-4 text-white">
              <p>
                A <strong>method statement</strong> (also called a safe system of work or SSOW) is
                a document that describes how a particular task or activity will be carried out
                safely. It sets out the work in a logical, step-by-step sequence, incorporating the
                control measures identified in the risk assessment.
              </p>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-green-400">
                  <FileText className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  What a Method Statement Contains
                </h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong>Description of the work:</strong> What task is being carried out,
                      where, and the expected duration
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong>Sequence of operations:</strong> Step-by-step breakdown of the work
                      from start to finish
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong>Hazards and control measures:</strong> Linked directly to the
                      associated risk assessment
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong>Plant, equipment, and materials:</strong> What tools, machinery, and
                      substances will be used
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong>PPE requirements:</strong> What personal protective equipment must be
                      worn for each stage
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong>Competency requirements:</strong> What qualifications, training, or
                      experience operatives need
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong>Emergency procedures:</strong> What to do if something goes wrong,
                      including first aid and rescue arrangements
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong>Responsible persons:</strong> Who is supervising, who is carrying
                      out the work, and who to report issues to
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-green-400 font-medium mb-3">
                  The Relationship Between RA and MS
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-white/5 border border-green-400/20 p-3 rounded-lg">
                    <h4 className="text-green-300 font-medium mb-2">Risk Assessment</h4>
                    <ul className="text-white/80 text-sm space-y-1.5">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>Identifies <strong className="text-white">what</strong> could go wrong</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>Evaluates <strong className="text-white">how likely</strong> and <strong className="text-white">how severe</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>Determines <strong className="text-white">what controls</strong> are needed</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-green-400/20 p-3 rounded-lg">
                    <h4 className="text-green-300 font-medium mb-2">Method Statement</h4>
                    <ul className="text-white/80 text-sm space-y-1.5">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>Describes <strong className="text-white">how</strong> to do the job safely</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>Sets out the work <strong className="text-white">step by step</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>Incorporates the <strong className="text-white">controls from the RA</strong></span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-green-400 font-medium mb-2">Who Writes and Reviews RAMS?</h3>
                <p className="text-white/80 text-sm mb-3">
                  RAMS are typically written by the contractor or sub-contractor carrying out the
                  work. They must be written by a{' '}
                  <strong className="text-white">competent person</strong> with relevant knowledge
                  and experience of the task. On construction sites, RAMS are usually reviewed and
                  approved by the principal contractor or site manager before work can begin.
                </p>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      RAMS must be <strong>task-specific</strong> and <strong>site-specific</strong> &mdash;
                      generic RAMS are not acceptable
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      All operatives must <strong>read, understand, and sign</strong> the RAMS before
                      starting work
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      RAMS should be discussed during the <strong>site induction</strong> and
                      <strong> toolbox talks</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      A copy of the RAMS must be <strong>available on site</strong> at all times
                      during the work
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Dynamic Risk Assessment */}
        <section className="mb-10">
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-green-400/80 text-sm font-normal">05</span>
              Dynamic Risk Assessment
            </h2>
            <div className="space-y-4 text-white">
              <p>
                A <strong>dynamic risk assessment</strong> is an ongoing, real-time assessment of
                risk carried out by workers as conditions change throughout the working day. Unlike
                a formal written risk assessment which is completed before work begins, a dynamic
                risk assessment is a continuous mental process that every worker should be performing
                at all times.
              </p>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-green-400">When to Use Dynamic RA</h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Conditions on site have <strong className="text-white">changed</strong> since the
                      original risk assessment was written (e.g. weather deterioration, unexpected
                      ground conditions)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      An <strong className="text-white">unexpected hazard</strong> appears that was not
                      identified in the written risk assessment (e.g. unmarked buried services, damaged
                      scaffolding)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      The <strong className="text-white">work activity changes</strong> mid-task or the
                      scope of work differs from what was planned
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Other trades</strong> begin working nearby and
                      introduce new hazards (e.g. hot works near flammable materials)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      You notice a <strong className="text-white">near miss</strong> or unsafe condition
                      that suggests the existing controls are not adequate
                    </span>
                  </li>
                </ul>
              </div>

              {/* STOP-THINK-ACT */}
              <div className="bg-white/5 border border-green-400/30 p-4 sm:p-6 rounded-lg">
                <h3 className="text-green-400 font-medium mb-4 text-center text-sm uppercase tracking-wider">
                  <Eye className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  The STOP-THINK-ACT Process
                </h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-center">
                    <div className="w-12 h-12 rounded-full bg-red-500/20 border-2 border-red-400/60 flex items-center justify-center mx-auto mb-2">
                      <span className="text-red-300 font-bold text-lg">S</span>
                    </div>
                    <p className="text-red-300 font-semibold text-sm mb-1">STOP</p>
                    <p className="text-white/60 text-xs">
                      Stop what you are doing immediately. Do not continue working if you have
                      identified a new or changed hazard.
                    </p>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 text-center">
                    <div className="w-12 h-12 rounded-full bg-amber-500/20 border-2 border-amber-400/60 flex items-center justify-center mx-auto mb-2">
                      <span className="text-amber-300 font-bold text-lg">T</span>
                    </div>
                    <p className="text-amber-300 font-semibold text-sm mb-1">THINK</p>
                    <p className="text-white/60 text-xs">
                      Assess the new hazard. What is the risk? Can you control it? Is it safe to
                      continue? Do you need help or advice?
                    </p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-center">
                    <div className="w-12 h-12 rounded-full bg-green-500/20 border-2 border-green-400/60 flex items-center justify-center mx-auto mb-2">
                      <span className="text-green-300 font-bold text-lg">A</span>
                    </div>
                    <p className="text-green-300 font-semibold text-sm mb-1">ACT</p>
                    <p className="text-white/60 text-xs">
                      Either implement a safe control and continue, or stop work entirely and
                      report the issue to your supervisor.
                    </p>
                  </div>
                </div>
                <p className="text-white/50 text-xs text-center mt-4 italic">
                  If in doubt, stop the job. No task is so urgent that it cannot be done safely.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-green-400 font-medium mb-2">Communicating New Risks</h3>
                <p className="text-white/80 text-sm mb-3">
                  When you identify a new risk through dynamic assessment, it is essential to
                  communicate it to others. This ensures that everyone on site is aware of the
                  changed conditions.
                </p>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong>Verbally inform</strong> your immediate colleagues working in the area
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong>Report to your supervisor</strong> or site manager as soon as possible
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      If the hazard is <strong>immediately dangerous</strong>, evacuate the area and
                      prevent others from entering
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      The written risk assessment should be <strong>updated</strong> to reflect the new
                      findings
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">Your Right to Stop Work</h3>
                </div>
                <p className="text-white/80 text-sm">
                  Every worker has the right &mdash; and the duty &mdash; to{' '}
                  <strong className="text-white">stop work</strong> if they believe there is a
                  serious and imminent danger that has not been adequately controlled. This right is
                  protected by law under the Management of Health and Safety at Work Regulations
                  1999 and the Employment Rights Act 1996. No employer can lawfully discipline a
                  worker for refusing to carry out work they reasonably believe to be dangerous.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Recording & Communicating Findings */}
        <section className="mb-10">
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-green-400/80 text-sm font-normal">06</span>
              Recording &amp; Communicating Findings
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Carrying out a thorough risk assessment is only effective if the findings are
                properly recorded and communicated to everyone who needs to know. A risk assessment
                that sits in a filing cabinet and is never shared with the workforce offers no
                protection whatsoever.
              </p>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-green-400">Written Records</h3>
                <p className="text-white/80 text-sm mb-3">
                  Under the Management of Health and Safety at Work Regulations 1999, employers
                  with <strong className="text-white">5 or more employees</strong> must record the
                  significant findings of their risk assessments in writing. The written record
                  should include:
                </p>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>The hazards identified during the assessment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Who might be harmed and how</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>The control measures already in place</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Any additional actions required, including who is responsible and by when</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>The date of the assessment and when it will next be reviewed</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-green-400 font-medium mb-3">Communicating to Workers</h3>
                <p className="text-white/80 text-sm mb-3">
                  Risk assessment findings must be communicated to all workers who are affected.
                  There are several methods used on construction sites:
                </p>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong>Site inductions:</strong> New workers receive a safety briefing that
                      covers the site-specific risks and the controls in place
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong>Toolbox talks:</strong> Short, focused safety briefings (typically
                      10&ndash;15 minutes) delivered on site to discuss specific hazards and safe
                      working practices. Usually delivered weekly or before high-risk tasks
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong>RAMS briefings:</strong> Before starting a task, the supervisor
                      briefs all operatives on the risk assessment and method statement, and each
                      person signs to confirm they have understood
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong>Safety notice boards:</strong> Displaying risk assessments, safety
                      alerts, emergency procedures, and site rules in prominent locations such as
                      the site welfare area
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong>Safety signage:</strong> Mandatory signs (blue circles), prohibition
                      signs (red circles with line), warning signs (yellow triangles), and safe
                      condition signs (green rectangles) all communicate risk information visually
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-green-400 font-medium mb-2">Overcoming Language Barriers</h3>
                <p className="text-white/80 text-sm">
                  Construction sites often have a diverse workforce with workers whose first
                  language is not English. Employers have a duty to ensure that safety information
                  is understood by <strong className="text-white">all</strong> workers. This may
                  require translated documents, pictorial safety instructions, visual demonstrations,
                  buddy systems pairing workers with a bilingual colleague, or the use of
                  interpreters during inductions and toolbox talks. Simply handing over a written
                  RAMS document in English to a worker who cannot read English is{' '}
                  <strong className="text-white">not</strong> considered adequate communication.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Common Construction Hazards */}
        <section className="mb-10">
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-green-400/80 text-sm font-normal">07</span>
              Common Construction Hazards
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Construction is one of the most hazardous industries in the UK. Understanding the
                most common hazards is essential for carrying out effective risk assessments. The
                following are the hazards you will encounter most frequently on site and are the
                most commonly tested topics on the CSCS HS&amp;E test.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-green-400 font-medium mb-3">
                  <AlertTriangle className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  The &ldquo;Fatal Five&rdquo; &mdash; Top Causes of Death in Construction
                </h3>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-green-400/20 p-3 rounded-lg">
                    <h4 className="text-green-300 font-medium mb-1">1. Falls from Height</h4>
                    <p className="text-white/80 text-sm">
                      The single largest cause of fatal injuries in UK construction, accounting for
                      approximately <strong className="text-white">40&ndash;50%</strong> of all
                      construction deaths each year. Falls from roofs, scaffolds, ladders, and through
                      fragile surfaces (such as roof lights) are all common. The Work at Height
                      Regulations 2005 require employers to avoid working at height where possible,
                      prevent falls using guardrails or platforms, and minimise the distance and
                      consequences of any fall using nets or harnesses.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-green-400/20 p-3 rounded-lg">
                    <h4 className="text-green-300 font-medium mb-1">2. Struck by Moving Objects</h4>
                    <p className="text-white/80 text-sm">
                      Being hit by falling materials, swinging loads from cranes, or moving vehicles
                      on site. This includes being struck by excavator buckets, reversing dumpers,
                      and objects falling from scaffolding. Controls include exclusion zones around
                      lifting operations, banksmen for vehicle movements, toe boards and brick guards
                      on scaffolds, and segregation of pedestrian and vehicle routes.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-green-400/20 p-3 rounded-lg">
                    <h4 className="text-green-300 font-medium mb-1">3. Trapped by Collapse</h4>
                    <p className="text-white/80 text-sm">
                      Being buried or trapped by the collapse of excavations, structures, or
                      temporary works. Trench collapses are particularly deadly &mdash; unsupported
                      trenches can collapse without warning and the weight of soil makes escape
                      extremely difficult. All excavations over 1.2 metres deep must be properly
                      supported or battered back. Temporary works such as formwork and falsework must
                      be designed and inspected by a competent person.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-green-400/20 p-3 rounded-lg">
                    <h4 className="text-green-300 font-medium mb-1">4. Manual Handling Injuries</h4>
                    <p className="text-white/80 text-sm">
                      Musculoskeletal disorders caused by lifting, carrying, pushing, or pulling
                      heavy or awkward loads. Manual handling injuries are the most common cause of
                      <strong className="text-white"> non-fatal</strong> injuries in construction
                      and often result in long-term back, shoulder, and knee problems. The Manual
                      Handling Operations Regulations 1992 require employers to avoid manual handling
                      where possible, assess unavoidable tasks, and reduce the risk using mechanical
                      aids, team lifts, and good technique training.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-green-400/20 p-3 rounded-lg">
                    <h4 className="text-green-300 font-medium mb-1">5. Electricity</h4>
                    <p className="text-white/80 text-sm">
                      Contact with live electrical conductors, whether from overhead power lines,
                      underground cables, or the installation being worked on. Electric shock can
                      cause burns, cardiac arrest, and death. As an electrician, you are at
                      particular risk and must always follow the safe isolation procedure: switch off,
                      isolate, lock off, prove dead, and post warning notices. The Electricity at Work
                      Regulations 1989 apply to all electrical work activities.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-green-400 font-medium mb-3">Other Significant Construction Hazards</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-white/5 border border-green-400/20 p-3 rounded-lg">
                    <h4 className="text-green-300 font-medium mb-1">Harmful Substances</h4>
                    <p className="text-white/80 text-sm">
                      Asbestos, silica dust, cement, solvents, welding fumes, and lead. The Control of
                      Substances Hazardous to Health Regulations 2002 (COSHH) require employers to
                      assess and control exposure. Many construction health hazards have long latency
                      periods &mdash; symptoms may not appear for years or decades.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-green-400/20 p-3 rounded-lg">
                    <h4 className="text-green-300 font-medium mb-1">Noise</h4>
                    <p className="text-white/80 text-sm">
                      Prolonged exposure to high noise levels from power tools, machinery, and
                      demolition causes permanent hearing loss. The Control of Noise at Work
                      Regulations 2005 set exposure limits: 80 dB(A) lower action level, 85 dB(A)
                      upper action level. Hearing protection is mandatory above the upper action
                      level.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-green-400/20 p-3 rounded-lg">
                    <h4 className="text-green-300 font-medium mb-1">Fire</h4>
                    <p className="text-white/80 text-sm">
                      Fire risks on construction sites are elevated due to the presence of
                      flammable materials, hot works (welding, cutting, grinding), temporary
                      electrical installations, and limited escape routes. The Regulatory Reform
                      (Fire Safety) Order 2005 requires a fire risk assessment and appropriate
                      prevention and detection measures.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-green-400/20 p-3 rounded-lg">
                    <h4 className="text-green-300 font-medium mb-1">Vibration</h4>
                    <p className="text-white/80 text-sm">
                      Hand-arm vibration from power tools (e.g. hammer drills, angle grinders, breakers)
                      can cause Hand-Arm Vibration Syndrome (HAVS) and vibration white finger. The
                      Control of Vibration at Work Regulations 2005 set daily exposure limits and
                      require employers to assess and control exposure through tool selection, job
                      rotation, and health surveillance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Review & Legal Responsibilities */}
        <section className="mb-10">
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-green-400/80 text-sm font-normal">08</span>
              Review &amp; Legal Responsibilities
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Risk assessments are not one-off documents. They must be reviewed and updated
                regularly to remain effective. Understanding when to review and the legal framework
                behind risk assessment is essential for both the CSCS HS&amp;E test and your
                day-to-day responsibilities on site.
              </p>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-green-400">When to Review a Risk Assessment</h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong>After an accident, incident, or near miss:</strong> Any event that suggests
                      the existing controls may be inadequate
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong>When working methods or equipment change:</strong> New plant, materials,
                      tools, or processes may introduce different hazards
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong>When the workforce changes:</strong> New workers, young workers, or workers
                      with different levels of experience may face different risks
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong>When new information becomes available:</strong> Updates to guidance,
                      manufacturer safety data sheets, or industry best practice
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong>When legislation changes:</strong> New or amended regulations may require
                      different controls or standards
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong>At least annually:</strong> Even if no specific trigger has occurred, risk
                      assessments should be reviewed at a minimum of once per year to confirm they remain
                      valid and up to date
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-green-400 font-medium mb-3">
                  <Scale className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  HASAWA 1974: Employer vs Employee Duties
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-white/5 border border-green-400/20 p-3 rounded-lg">
                    <h4 className="text-green-300 font-medium mb-2">
                      Section 2 &mdash; Employer Duties to Employees
                    </h4>
                    <ul className="text-white/80 text-sm space-y-1.5">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          Provide and maintain safe plant and safe systems of work
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          Ensure the safe use, handling, storage, and transport of articles and substances
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          Provide information, instruction, training, and supervision
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          Maintain a safe place of work with safe access and egress
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          Provide and maintain a safe working environment with adequate welfare facilities
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-green-400/20 p-3 rounded-lg">
                    <h4 className="text-green-300 font-medium mb-2">
                      Section 7 &mdash; Employee Duties
                    </h4>
                    <ul className="text-white/80 text-sm space-y-1.5">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          Take reasonable care of your own health and safety
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          Take reasonable care of the health and safety of others who may be affected
                          by your acts or omissions
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          Cooperate with your employer on health and safety matters
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          Not intentionally or recklessly interfere with or misuse anything provided
                          for health and safety (Section 8)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          Report any hazards, defects, or dangerous situations to your employer
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-green-400 font-medium mb-2">
                  Section 3 &mdash; Duties to Non-Employees
                </h3>
                <p className="text-white/80 text-sm">
                  Section 3 of HASAWA 1974 extends the employer&rsquo;s duty of care beyond their
                  own employees. Employers must conduct their work in such a way that{' '}
                  <strong className="text-white">
                    persons not in their employment
                  </strong>{' '}
                  &mdash; such as members of the public, visitors, delivery drivers, and
                  contractors from other companies &mdash; are not exposed to risks to their health
                  and safety. This is particularly important on construction sites where multiple
                  contractors work alongside each other and the public may be nearby.
                </p>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">Penalties for Non-Compliance</h3>
                </div>
                <p className="text-white/80 text-sm mb-3">
                  Failing to carry out suitable and sufficient risk assessments, or failing to
                  implement the controls identified, is a criminal offence. The consequences can be
                  severe:
                </p>
                <ul className="text-white/80 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                    <span>
                      <strong className="text-white">Improvement notices:</strong> HSE requires the
                      employer to fix a breach within a specified time
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                    <span>
                      <strong className="text-white">Prohibition notices:</strong> Work must stop
                      immediately until the danger is removed
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                    <span>
                      <strong className="text-white">Prosecution:</strong> Criminal charges brought
                      against the company, directors, or individual managers
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                    <span>
                      <strong className="text-white">Unlimited fines:</strong> Since the Sentencing
                      Council guidelines (2016), fines for health and safety offences can be
                      unlimited and are calculated based on the size and turnover of the organisation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                    <span>
                      <strong className="text-white">Imprisonment:</strong> Individuals found guilty
                      of gross negligence manslaughter or breaches resulting in death can face
                      custodial sentences
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                    <span>
                      <strong className="text-white">Corporate manslaughter:</strong> Under the
                      Corporate Manslaughter and Corporate Homicide Act 2007, organisations can be
                      prosecuted if a gross failing by senior management causes a death
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-green-400">Key Legislation Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-green-400 font-mono text-xs mt-0.5 w-5 text-right flex-shrink-0">
                      &bull;
                    </span>
                    <span className="text-white/80">
                      <strong className="text-white">HASAWA 1974:</strong> The overarching Act that places
                      general duties on employers, employees, and the self-employed
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-400 font-mono text-xs mt-0.5 w-5 text-right flex-shrink-0">
                      &bull;
                    </span>
                    <span className="text-white/80">
                      <strong className="text-white">Management Regs 1999:</strong> Requires employers to
                      carry out risk assessments, appoint competent persons, and implement preventive
                      measures
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-400 font-mono text-xs mt-0.5 w-5 text-right flex-shrink-0">
                      &bull;
                    </span>
                    <span className="text-white/80">
                      <strong className="text-white">CDM 2015:</strong> Specific regulations for the
                      construction industry, covering roles, responsibilities, and safety planning
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-400 font-mono text-xs mt-0.5 w-5 text-right flex-shrink-0">
                      &bull;
                    </span>
                    <span className="text-white/80">
                      <strong className="text-white">Work at Height Regs 2005:</strong> Requires planning,
                      organisation, and risk control for all work at height
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-400 font-mono text-xs mt-0.5 w-5 text-right flex-shrink-0">
                      &bull;
                    </span>
                    <span className="text-white/80">
                      <strong className="text-white">COSHH 2002:</strong> Controls exposure to hazardous
                      substances in the workplace
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-400 font-mono text-xs mt-0.5 w-5 text-right flex-shrink-0">
                      &bull;
                    </span>
                    <span className="text-white/80">
                      <strong className="text-white">Electricity at Work Regs 1989:</strong> Requires
                      precautions to be taken against the risk of death or personal injury from
                      electricity
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-green-400/80 text-sm font-normal">&nbsp;</span>
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
          <Quiz title="Section 1 Knowledge Check" questions={quizQuestions} />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cscs-card-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-green-500 text-white hover:bg-green-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cscs-card-module-2-section-2">
              Next: Personal Protective Equipment
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
}
