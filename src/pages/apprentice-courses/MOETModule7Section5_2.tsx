import { ArrowLeft, Shield, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const TITLE = 'EPA Gateway Requirements - MOET Module 7 Section 5.2';
const DESCRIPTION =
  'Understanding the specific EPA gateway requirements for the ST1426 MOET standard: mandatory qualifications, portfolio standards, evidence requirements, EPAO processes and the formal gateway submission procedure.';

const quickCheckQuestions = [
  {
    id: 'gateway-what',
    question: 'What is the EPA gateway?',
    options: [
      'The first day of the apprenticeship, where the training plan and KSBs are agreed between the apprentice, employer and provider',
      'An optional mid-point review where the apprentice can choose to bring forward part of their end-point assessment',
      'The formal checkpoint between on-programme learning and end-point assessment, where pre-requisites are verified',
      'The final certificate-issuing stage where the EPAO confirms the overall grade and notifies the apprenticeship register',
    ],
    correctIndex: 2,
    explanation:
      'The gateway is the boundary between on-programme learning (your apprenticeship training) and the independent EPA. It is where all pre-requisites are checked, sign-off is confirmed, and the EPAO is notified that you are ready for assessment. Nothing in the EPA can take place until the gateway has been formally opened.',
  },
  {
    id: 'gateway-portfolio',
    question: 'What portfolio requirements must be met at gateway for the MOET EPA?',
    options: [
      "The portfolio must contain sufficient evidence mapped to the standard's KSBs, meeting the EPAO's minimum requirements",
      "Only a single reflective account summarising the apprentice's best piece of work is needed, as the professional discussion covers everything else in detail",
      "The portfolio is not required at gateway and is instead built up by the assessor during the practical observation on the day of assessment",
      "A copy of the employer's company policies and procedures, with the apprentice's signature confirming they have read each one during the apprenticeship",
    ],
    correctIndex: 0,
    explanation:
      'The portfolio is a gateway requirement — it must be substantially complete before the gateway is opened. Each EPAO specifies minimum requirements (number of evidence items, types of evidence expected, mapping to KSBs). The portfolio is then submitted to the assessor before the professional discussion, so it must be ready at gateway stage.',
  },
  {
    id: 'gateway-qualifications',
    question: 'Which qualifications are typically required before the gateway can be opened?',
    options: [
      'Only the Level 2 Diploma, since the Level 3 qualification is awarded automatically once the EPA is passed',
      'A current first aid certificate and an in-date asbestos awareness course, with no academic qualifications needed at this stage',
      'Level 3 Diploma, Level 2 English and maths, and any other qualifications specified in the assessment plan',
      'A degree-level qualification in engineering, as the MOET standard sits at Level 5 on the framework',
    ],
    correctIndex: 2,
    explanation:
      'The gateway requires all mandatory qualifications to be achieved and evidenced. For ST1426 this typically includes: the Level 3 Diploma, Level 2 English and maths, and any additional qualifications specified in the assessment plan. Certificates or confirmed results must be available — pending results are generally not accepted.',
  },
  {
    id: 'gateway-epao',
    question: "What is the EPAO's role in the gateway process?",
    options: [
      'The EPAO delivers the off-the-job training and signs off the apprentice as workplace-competent before the gateway meeting',
      'The EPAO verifies the gateway submission, then assigns an assessor and schedules the EPA components',
      'The EPAO chairs the tripartite gateway review and makes the final decision on whether the employer has provided enough training',
      'The EPAO issues the Level 3 Diploma and the English and maths certificates once the portfolio has been approved',
    ],
    correctIndex: 1,
    explanation:
      "The EPAO does not conduct the gateway review itself — that is between you, your employer and your training provider. The EPAO's role is to receive the gateway paperwork, verify all requirements are met, and then organise the assessment: assigning an assessor, scheduling the components, and ensuring all logistics are in place.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'The EPA gateway must be opened before:',
    options: [
      'The apprentice can begin their off-the-job training and start logging the required 20% hours',
      'Any EPA assessment component can take place — none can be scheduled until the gateway is formally confirmed',
      'The employer is allowed to enrol the apprentice on the Level 3 Diploma with the training provider',
      'The apprentice can sit the resit of any qualification they have not yet passed during the programme',
    ],
    correctAnswer: 1,
    explanation:
      'The gateway is the mandatory prerequisite for all EPA assessment. No component — practical observation, professional discussion, or knowledge test — can take place until the gateway has been formally opened, all pre-requisites verified, and the EPAO has confirmed readiness to schedule the assessment.',
  },
  {
    id: 2,
    question: "The EPAO's role in the gateway process is to:",
    options: [
      'Deliver the apprentice’s on-programme training and confirm they are workplace-competent before sign-off',
      'Chair the tripartite gateway review and decide whether the employer has provided sufficient training',
      'Verify the gateway submission from the training provider, then schedule the EPA assessment components',
      'Issue the Level 3 Diploma and English and maths certificates once the portfolio has been approved',
    ],
    correctAnswer: 2,
    explanation:
      "The EPAO receives the gateway paperwork (sign-off forms, qualification evidence, portfolio submission), verifies everything is in order, and then arranges the assessment. They do not conduct the gateway review itself — that is between the employer, training provider and apprentice. The EPAO's role is to verify and schedule.",
  },
  {
    id: 3,
    question:
      'If a mandatory qualification certificate is not yet available at the gateway meeting, you should:',
    options: [
      'Open the gateway anyway and provide the certificate to the assessor on the day of the practical observation',
      'Ask the EPAO to award the qualification on your behalf based on the evidence held in your portfolio',
      'Substitute the missing qualification with an extra reflective account that demonstrates equivalent knowledge',
      'Delay the gateway submission until the qualification is evidenced, as most EPAOs require confirmed results',
    ],
    correctAnswer: 3,
    explanation:
      'Gateway requirements are non-negotiable. If a certificate is not yet available, check whether confirmed results (e.g., from the awarding body) would be accepted temporarily. In most cases, the gateway is delayed until the certificate is available. Plan ahead — request certificates early and allow processing time.',
  },
  {
    id: 4,
    question: 'The portfolio submitted at gateway should include:',
    options: [
      "Evidence from across the apprenticeship, mapped to KSBs, meeting the EPAO's minimum requirements",
      "Only the evidence gathered in the final three months of the apprenticeship, as earlier work is considered out of date",
      "A single bound document written entirely by the training provider on the apprentice's behalf to ensure consistency",
      "Copies of every job sheet and timesheet from the whole apprenticeship, submitted without any mapping or commentary",
    ],
    correctAnswer: 0,
    explanation:
      'The gateway portfolio should be the finished product: comprehensive evidence from the full apprenticeship period, mapped to all KSBs, well-organised with a clear mapping matrix, and meeting all EPAO requirements. This is what the assessor will review before your professional discussion.',
  },
  {
    id: 5,
    question: 'The timeframe between gateway opening and the first EPA component is typically:',
    options: [
      'On the same day as the gateway meeting, so that the apprentice can be assessed while the evidence is fresh',
      'Specified in the assessment plan — usually 2-4 weeks, allowing time to assign an assessor and prepare',
      'A fixed period of six months set by law and identical for every apprenticeship standard',
      'Decided solely by the employer, who chooses any date that suits the workplace schedule',
    ],
    correctAnswer: 1,
    explanation:
      'The assessment plan specifies the window between gateway and EPA. This period (typically 2-4 weeks) allows: the EPAO to assign an assessor, the assessor to review your portfolio before the professional discussion, you to complete final preparation, and practical arrangements to be made (venue, equipment access).',
  },
  {
    id: 6,
    question:
      'If the gateway reveals that your off-the-job training hours are slightly below the 20% minimum:',
    options: [
      'The shortfall can be ignored if your portfolio and qualifications are otherwise complete and strong',
      'The missing hours can be made up by adding extra reflective accounts to the portfolio instead',
      'The shortfall must be addressed before the gateway opens, with a plan to complete the remaining hours',
      'The EPAO can grant a waiver for the missing hours provided the employer signs a declaration',
    ],
    correctAnswer: 2,
    explanation:
      'The 20% off-the-job training requirement is a mandatory funding condition, not optional. Any shortfall must be rectified before the gateway. The employer and training provider should agree a plan to complete the remaining hours. The ESFA can audit these records, and non-compliance has consequences for the training provider.',
  },
  {
    id: 7,
    question: 'The gateway submission to the EPAO typically includes:',
    options: [
      'Only the apprentice’s CV and a covering letter explaining why they are ready to be assessed',
      'A draft of the practical task the apprentice intends to be observed carrying out during the EPA',
      'The assessor’s marking grid and grade descriptors, completed in advance by the training provider',
      'Signed declarations from both parties, qualification evidence, off-the-job hours, the portfolio, and any EPAO forms',
    ],
    correctAnswer: 3,
    explanation:
      'The gateway submission is a formal document pack: signed declarations from both employer and training provider, copies of qualification certificates, evidence of off-the-job training hours, the work-based portfolio, and any forms required by the specific EPAO. Incomplete submissions will be returned, causing delays.',
  },
  {
    id: 8,
    question:
      'An apprentice who has achieved all qualifications but whose portfolio is incomplete should:',
    options: [
      "Complete the portfolio before the gateway opens, as it must meet the EPAO's minimum standards first",
      "Open the gateway on the strength of the qualifications and finish the portfolio during the EPA window",
      "Ask the assessor to base the grade on the qualifications alone, treating the portfolio as optional",
      "Submit the incomplete portfolio and rely on the professional discussion to fill any evidence gaps",
    ],
    correctAnswer: 0,
    explanation:
      "The portfolio is a gateway pre-requisite. An incomplete portfolio means the gateway cannot be opened. Focus on completing the required evidence, mapping it to KSBs, and ensuring the portfolio meets the EPAO's minimum requirements before the gateway review. Submitting an incomplete portfolio wastes everyone's time and delays the process.",
  },
  {
    id: 9,
    question: 'Different EPAOs may have slightly different gateway requirements because:',
    options: [
      'Each EPAO is free to change the mandatory qualifications and the off-the-job percentage to suit its own model',
      'The core requirements are set by the standard, but EPAOs may add their own evidence and format requirements',
      'The assessment plan is only a guideline, so EPAOs can decide which parts of it they wish to apply',
      'Gateway requirements are set independently by each college and have no national consistency',
    ],
    correctAnswer: 1,
    explanation:
      "The assessment plan sets the core gateway requirements, but EPAOs may add specific requirements in their EPA specification: minimum number of portfolio items, required evidence types, specific formats, and additional forms. Always check your EPAO's specification early in the apprenticeship so you know exactly what is needed.",
  },
  {
    id: 10,
    question:
      'If the gateway is successfully opened and then you become unavailable for the scheduled EPA:',
    options: [
      'The gateway is automatically cancelled and the whole submission must be built and approved again from scratch',
      'You forfeit your place and must wait a full twelve months before the EPA can be rescheduled',
      'Contact the EPAO and training provider immediately — most allow rescheduling without re-opening the gateway',
      'The assessment goes ahead in your absence and is graded on the portfolio evidence alone',
    ],
    correctAnswer: 2,
    explanation:
      'Once opened, the gateway normally remains valid for a period specified by the EPAO. If you need to reschedule (illness, unavoidable absence), contact the EPAO and training provider immediately. Most will accommodate genuine reasons for rescheduling. However, extended delays may require the gateway to be refreshed.',
  },
  {
    id: 11,
    question: 'The KSB mapping matrix in your portfolio serves to:',
    options: [
      'Record the dates on which each piece of evidence was created so the assessor can check it is recent',
      'List the qualifications you have achieved and the awarding body that issued each certificate',
      'Summarise the off-the-job training hours you have logged across the apprenticeship period',
      'Show the assessor which evidence addresses which knowledge, skills and behaviour requirements from the standard',
    ],
    correctAnswer: 3,
    explanation:
      "The KSB mapping matrix is a critical navigation tool. It shows the assessor exactly where to find evidence for each requirement in the standard. Without it, the assessor must search through your entire portfolio to verify coverage. A clear, accurate mapping matrix demonstrates your understanding of the standard and makes the assessor's job easier — which benefits you.",
  },
  {
    id: 12,
    question: 'Planning for the gateway should ideally begin:',
    options: [
      'At least 3 months before the planned EPA date, allowing time to close gaps and obtain certificates',
      'In the final week before the EPA, once you are confident the assessment date is fixed',
      'Only after the EPAO has formally assigned an assessor to your case',
      'On the first day of the apprenticeship, before any on-programme learning has taken place',
    ],
    correctAnswer: 0,
    explanation:
      'Starting 3 months before the target EPA date gives you time to: complete any remaining qualifications, finalise portfolio evidence, address any gaps identified in reviews, obtain certificates (which can take weeks), and conduct a thorough readiness review. Last-minute preparation for the gateway almost always leads to delays.',
  },
];

const faqs = [
  {
    question: 'How far in advance should I prepare my gateway submission?',
    answer:
      'Start preparing at least 3 months before your target EPA date. This allows time for: completing any remaining qualifications, finalising your portfolio, conducting a thorough gap analysis, addressing any issues identified, and obtaining sign-off. The gateway submission should be ready 4-6 weeks before the planned EPA to allow processing time.',
  },
  {
    question: 'What if my EPAO rejects the gateway submission?',
    answer:
      'The EPAO will explain what is missing or insufficient. Common reasons include: incomplete qualification evidence, portfolio not meeting minimum requirements, or missing gateway forms. Address the issues identified, resubmit, and the EPAO will review again. This delays the EPA but is better than proceeding with an incomplete submission.',
  },
  {
    question: 'Can I change EPAO at the gateway stage?',
    answer:
      'Changing EPAO is possible but disruptive, as different EPAOs may have different gateway requirements and portfolio specifications. It should only be done for good reason (e.g., the original EPAO ceasing to offer the assessment). Discuss with your training provider — they manage the EPAO relationship and will guide the process.',
  },
  {
    question: 'Is there a maximum time between gateway and EPA?',
    answer:
      "Most EPAOs specify a maximum window between gateway opening and the first EPA component — typically 3-6 months. If the EPA does not take place within this window, the gateway may need to be refreshed (updated portfolio, confirmed readiness review). Check your EPAO's specification for the exact timeframe.",
  },
  {
    question: 'What happens if I pass the gateway but then realise I am not ready?',
    answer:
      'Speak to your training provider immediately. It may be possible to request additional preparation time before the EPA is scheduled, or to postpone if it has already been scheduled. It is far better to raise concerns early than to attend the EPA feeling unprepared. Your training provider and employer should support you in getting ready.',
  },
];

const MOETModule7Section5_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span>Module 7.5.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            EPA Gateway Requirements
          </h1>
          <p className="text-white">
            Understanding the specific pre-requisites and processes for opening the EPA gateway
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">
              In 30 Seconds
            </p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1">
                <strong>Gateway:</strong> Formal checkpoint before independent assessment
              </li>
              <li className="pl-1">
                <strong>Qualifications:</strong> Level 3 Diploma, Level 2 English and maths
              </li>
              <li className="pl-1">
                <strong>Portfolio:</strong> Complete, mapped to KSBs, meets EPAO standards
              </li>
              <li className="pl-1">
                <strong>Submission:</strong> Formal paperwork to EPAO with all evidence
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">
              EPA Assessment Context
            </p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1">
                <strong>Mandatory:</strong> No EPA components until gateway is open
              </li>
              <li className="pl-1">
                <strong>EPAO verified:</strong> Pre-requisites checked by assessment organisation
              </li>
              <li className="pl-1">
                <strong>Scheduling:</strong> EPA components scheduled after gateway confirmation
              </li>
              <li className="pl-1">
                <strong>ST1426:</strong> Specific requirements in the assessment plan
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Understand the specific gateway requirements for the ST1426 MOET standard',
              'Know which qualifications must be achieved and evidenced before gateway',
              "Ensure your portfolio meets the EPAO's minimum gateway requirements",
              'Understand the formal submission process to the EPAO',
              'Know the typical timeframe between gateway and EPA scheduling',
              'Prepare for potential issues and know how to resolve them before submission',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Understanding the Gateway
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The EPA gateway is the formal boundary between your on-programme apprenticeship and
              the independent end-point assessment. Once the gateway is opened, you transition from
              being an apprentice in training to a candidate being assessed against the professional
              standard. Nothing about the EPA — no scheduling, no assessment, no grading — can
              happen until the gateway is confirmed.
            </p>

            <p>
              The gateway exists to ensure consistency and fairness across all apprentices taking
              the same standard. By requiring the same pre-requisites for everyone, it ensures that
              all candidates entering the EPA have a comparable foundation of learning and
              experience. This protects both the integrity of the standard and your interests as a
              candidate.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                Gateway Pre-Requisites Checklist
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Level 3 Diploma:</strong> Completed and certificate available (or
                  confirmed results from awarding body)
                </li>
                <li className="pl-1">
                  <strong>Level 2 English:</strong> GCSE grade 4/C or Functional Skills Level 2
                  achieved
                </li>
                <li className="pl-1">
                  <strong>Level 2 Maths:</strong> GCSE grade 4/C or Functional Skills Level 2
                  achieved
                </li>
                <li className="pl-1">
                  <strong>Off-the-job training:</strong> Minimum 20% hours completed and logged
                </li>
                <li className="pl-1">
                  <strong>Employer sign-off:</strong> Written confirmation of workplace competence
                  and readiness
                </li>
                <li className="pl-1">
                  <strong>Training provider sign-off:</strong> Written confirmation of programme
                  completion and readiness
                </li>
                <li className="pl-1">
                  <strong>Portfolio:</strong> Complete, mapped to KSBs, meeting EPAO minimum
                  requirements
                </li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Missing even one pre-requisite means the gateway cannot be
              opened. Check every requirement well in advance and address any shortfalls early.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Portfolio Requirements at Gateway
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Your portfolio must be substantially complete at the gateway stage. The assessor will
              review it before the professional discussion, using it to prepare questions and verify
              your evidence coverage. A poorly prepared or incomplete portfolio undermines the
              entire assessment process.
            </p>

            <p>
              The portfolio is not just a collection of documents — it is a structured demonstration
              of your competence mapped to the standard. Every piece of evidence should be
              purposefully included and linked to specific KSBs. Quality matters more than quantity:
              a few well-chosen, well-described pieces of evidence are worth more than a large
              volume of poorly organised material.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                EPAO Portfolio Standards
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Minimum evidence items:</strong> Check your EPAO's specification —
                  typically 10-15 significant pieces of evidence
                </li>
                <li className="pl-1">
                  <strong>Evidence types:</strong> Usually requires a mix: work logs, reflective
                  accounts, witness statements, photographs, completed documents
                </li>
                <li className="pl-1">
                  <strong>KSB mapping:</strong> A clear matrix showing which evidence addresses
                  which KSBs
                </li>
                <li className="pl-1">
                  <strong>Format:</strong> Check whether your EPAO requires digital or physical
                  submission, and the accepted file formats
                </li>
                <li className="pl-1">
                  <strong>Confidentiality:</strong> Ensure all client and commercially sensitive
                  information is appropriately redacted
                </li>
                <li className="pl-1">
                  <strong>Currency:</strong> Evidence should span the apprenticeship period, not
                  just the final months
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">
                Check Your Specific EPAO's Requirements
              </p>
              <p className="text-sm text-white">
                Different EPAOs may have different portfolio specifications. Some require a specific
                number of reflective accounts, others mandate certain types of evidence, and formats
                vary. Always refer to your specific EPAO's EPA specification document — do not rely
                on general guidance alone. Your training provider should have a copy of the
                specification and can confirm the exact requirements.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The portfolio is not just evidence — it is your
              preparation tool for the professional discussion. Every piece of evidence should be
              something you can discuss confidently, in detail, and link to the standard's
              requirements.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Qualification Evidence Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Qualification evidence must be robust and verifiable. The EPAO will check that
              certificates are genuine and that the qualifications match the requirements. Planning
              ahead for certificate processing times prevents last-minute delays.
            </p>

            <p>
              Certificate processing is the single most common cause of avoidable gateway delays.
              Awarding bodies can take 4-8 weeks to issue certificates after results are confirmed.
              If you wait until the gateway review to request certificates, you may face weeks of
              unnecessary delay.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                Preparing Qualification Evidence
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Request certificates early:</strong> Awarding bodies can take several
                  weeks to issue certificates — do not wait until the last minute
                </li>
                <li className="pl-1">
                  <strong>Keep copies:</strong> Take photographs or scans of all certificates for
                  your records
                </li>
                <li className="pl-1">
                  <strong>Check details:</strong> Ensure your name, qualification title and level
                  are correct on all certificates
                </li>
                <li className="pl-1">
                  <strong>Gather all evidence:</strong> Include the Level 3 Diploma, English and
                  maths certificates, and any additional qualifications
                </li>
                <li className="pl-1">
                  <strong>Interim evidence:</strong> If a certificate has not yet arrived, ask the
                  awarding body or training provider for a results confirmation letter
                </li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Qualification certificates are the most common cause of
              gateway delays. Request them well in advance and have a backup plan (results
              confirmation) if processing takes longer than expected.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            The Gateway Submission Process
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The gateway submission is the formal communication to the EPAO that you are ready for
              assessment. Your training provider typically manages this process, but understanding
              what is involved helps you ensure everything is in order.
            </p>

            <p>
              The submission is a structured document pack that provides the EPAO with everything
              they need to verify your readiness and begin arranging the assessment. An incomplete
              or poorly organised submission will be returned, causing delays.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Submission Process</p>
              <ol className="text-sm text-white space-y-2 list-decimal list-outside ml-5">
                <li className="pl-1">
                  <strong>Gateway review completed:</strong> Tripartite meeting confirms readiness
                  and both parties sign off
                </li>
                <li className="pl-1">
                  <strong>Documentation compiled:</strong> Sign-off forms, qualification
                  certificates, portfolio, off-the-job hours evidence
                </li>
                <li className="pl-1">
                  <strong>Training provider submits:</strong> Formal submission to the EPAO through
                  their designated process
                </li>
                <li className="pl-1">
                  <strong>EPAO reviews:</strong> Checks all pre-requisites are met and documentation
                  is complete
                </li>
                <li className="pl-1">
                  <strong>Gateway confirmed:</strong> EPAO confirms the gateway is open and begins
                  scheduling
                </li>
                <li className="pl-1">
                  <strong>EPA scheduled:</strong> Assessment dates agreed and communicated to all
                  parties
                </li>
              </ol>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The submission process typically takes 1-2 weeks from
              submission to confirmation. Factor this into your timeline — the gateway needs to be
              submitted well before your target EPA date.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            From Gateway to Assessment
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Once the gateway is confirmed, the focus shifts entirely to assessment preparation.
              The EPAO assigns an assessor, the assessor reviews your portfolio, and assessment
              dates are arranged. This is your final preparation window — use it wisely.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                The Gateway-to-EPA Timeline
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Stage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">
                        Typical Timeframe
                      </th>
                      <th className="border border-white/10 px-3 py-2 text-left">Your Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Gateway confirmed</td>
                      <td className="border border-white/10 px-3 py-2">Day 0</td>
                      <td className="border border-white/10 px-3 py-2">
                        Begin focused final revision
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Assessor assigned</td>
                      <td className="border border-white/10 px-3 py-2">1-2 weeks</td>
                      <td className="border border-white/10 px-3 py-2">
                        Continue preparation; review portfolio
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">
                        Assessment dates confirmed
                      </td>
                      <td className="border border-white/10 px-3 py-2">2-3 weeks</td>
                      <td className="border border-white/10 px-3 py-2">
                        Finalise preparation; practical skills refresh
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">EPA day</td>
                      <td className="border border-white/10 px-3 py-2">3-4 weeks</td>
                      <td className="border border-white/10 px-3 py-2">
                        Light revision; rest; arrive prepared
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The gateway is the final administrative step before the
              EPA. Once confirmed, the focus shifts entirely to assessment preparation. Use the time
              between gateway confirmation and the first assessment component for final revision,
              portfolio review, and building your confidence. You have been signed off because you
              are ready — trust the process.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">Quick Reference</h2>
          <div className="p-4 rounded-lg bg-white/5">
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1">
                No EPA component can take place until the gateway is formally confirmed
              </li>
              <li className="pl-1">
                All qualifications must be achieved and certificated (or confirmed) before gateway
              </li>
              <li className="pl-1">
                Your portfolio must be complete, mapped to KSBs, and meet EPAO minimum standards
              </li>
              <li className="pl-1">
                Check your specific EPAO's requirements early — they vary between organisations
              </li>
              <li className="pl-1">
                Request qualification certificates well in advance to avoid delays
              </li>
              <li className="pl-1">
                The submission process takes 1-2 weeks — factor this into your timeline
              </li>
              <li className="pl-1">
                Typically 2-4 weeks between gateway confirmation and first EPA component
              </li>
            </ul>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quiz */}
        <section className="mb-10">
          <Quiz title="Test Your Knowledge — Gateway Requirements" questions={quizQuestions} />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section5-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Employer Sign-Off
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section5-3">
              Next: Final Revision
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default MOETModule7Section5_2;
