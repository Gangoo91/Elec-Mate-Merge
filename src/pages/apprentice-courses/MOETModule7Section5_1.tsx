/**
 * MOET · Module 7 · Section 5 · Subsection 1 — Employer and Training Provider Sign-Off
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option.
 *
 * KSBs: this page describes the EPA gateway sign-off process itself — an
 * administrative/procedural step of the apprenticeship, not a knowledge,
 * skill or behaviour drawn from the standard's content. No KSB quote applies
 * and none is included.
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original; structure, shell and reading measure rebuilt.
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import {
  StudyPage,
  Bleed,
  ReadingProgress,
  TLDR,
  ConceptBlock,
  CommonMistake,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Employer and Training Provider Sign-Off - MOET Module 7 Section 5.1';
const DESCRIPTION =
  'Understanding the employer and training provider sign-off process before EPA gateway: what needs to be confirmed, the tripartite review process, resolving outstanding issues and ensuring readiness for end-point assessment under ST1426.';

const quickCheckQuestions = [
  {
    id: 'signoff-purpose',
    question: 'What is the purpose of employer and training provider sign-off before the EPA?',
    options: [
      'It is simply an administrative formality to confirm your apprenticeship funding has been paid, and has no bearing on your readiness',
      'It allows the employer to extend your apprenticeship indefinitely so they can keep you on apprentice pay for longer',
      'Both parties confirm you have completed on-programme learning and are ready for end-point assessment',
      'It transfers responsibility for your assessment result to the employer and training provider, so any EPA failure is recorded against them rather than you',
    ],
    correctIndex: 2,
    explanation:
      'Sign-off is a genuine quality gate, not a rubber stamp. Both the employer and training provider must confirm you have completed all required learning, demonstrated the required competences, and are genuinely ready for assessment. This protects you from being entered for EPA before you are prepared, which could result in failure.',
  },
  {
    id: 'signoff-tripartite',
    question: 'What is a tripartite review in the context of EPA readiness?',
    options: [
      'A meeting between you, your employer and your training provider to confirm readiness and authorise the gateway',
      'A meeting between you and the independent end-point assessor to plan the structure and timing of the EPA components',
      'A review carried out solely by the awarding body to confirm your qualification certificates have been issued',
      'A check carried out by the EPAO after the EPA to decide whether you have passed each assessment component',
    ],
    correctIndex: 0,
    explanation:
      'The tripartite review brings all three parties together: you (the apprentice), your employer, and your training provider. It is where your progress is assessed, any concerns are raised, final actions are agreed, and the formal decision to proceed to EPA gateway is made. All three parties must agree you are ready.',
  },
  {
    id: 'signoff-issues',
    question:
      'If there are outstanding issues identified during the sign-off review, what should happen?',
    options: [
      'The apprentice should be entered for the EPA anyway, since the issues can be resolved during the assessment itself',
      'An action plan should be agreed with specific tasks, responsibilities and deadlines to resolve the issues before the gateway is opened',
      'The training provider should remove the affected KSBs from the standard so the gateway can proceed',
      'The employer should sign off alone, since their workplace judgement overrides the training provider',
    ],
    correctIndex: 1,
    explanation:
      'Outstanding issues must be resolved before progressing to EPA. An action plan should specify: what needs to be done (e.g., additional evidence, further training, more workplace experience), who is responsible, and when it will be completed. Rushing through the gateway with unresolved issues risks EPA failure — it is better to delay slightly and be properly prepared.',
  },
  {
    id: 'signoff-role',
    question: 'What is your role as the apprentice in the sign-off process?',
    options: [
      'Ensure your portfolio is complete, confirm your qualifications, and honestly assess your own readiness',
      'Wait passively for your employer and training provider to decide, since the gateway decision is entirely theirs to make',
      'Arrange and pay for your own end-point assessment directly with the EPAO before the gateway is opened',
      'Assess the readiness of the other apprentices in your cohort and report your findings to the training provider',
    ],
    correctIndex: 0,
    explanation:
      'You are an active and equal participant in the sign-off process. Ensure your portfolio is ready, confirm qualifications are complete, honestly assess your own readiness (are there areas you feel weak on?), and raise any concerns. It is better to ask for more preparation time than to enter the EPA unprepared. Your honesty at this stage protects you.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Before entering the EPA gateway, sign-off is required from:',
    options: [
      'The independent end-point assessment organisation (EPAO) alone',
      'Both the employer and the training provider, confirming the apprentice has met all on-programme requirements and is ready for end-point assessment',
      'The employer alone, since they hold the apprenticeship contract',
      'The awarding body that issues the Level 3 Diploma certificate',
    ],
    correctAnswer: 1,
    explanation:
      'Both the employer and training provider must sign off. The employer confirms you have demonstrated competence in the workplace and completed required workplace activities. The training provider confirms you have achieved the required qualifications and completed the training programme. Both signatures are required before the gateway can be opened.',
  },
  {
    id: 2,
    question: "The employer's sign-off specifically confirms:",
    options: [
      'That your Level 3 Diploma and Functional Skills certificates have all been issued by the awarding body',
      'That you have read and understood the EPA assessment plan and know the structure of each assessment component',
      'That you have demonstrated the required knowledge, skills and behaviours in practice and are ready to be assessed',
      'That the independent EPAO has reviewed your portfolio and agreed it meets the minimum evidence requirements',
    ],
    correctAnswer: 2,
    explanation:
      "The employer's sign-off is a substantive confirmation of workplace competence: you have completed sufficient and varied experience, demonstrated KSBs in real work situations, and shown readiness for independent assessment. This is based on their observation of your work, supervisor feedback, and review of your workplace evidence.",
  },
  {
    id: 3,
    question: "The training provider's sign-off specifically confirms:",
    options: [
      'That you have demonstrated the required knowledge, skills and behaviours competently in real workplace situations',
      'That a suitable EPA date has been booked with the EPAO and the assessment venue has been confirmed',
      'That your employer is satisfied with your attendance, timekeeping and conduct in the workplace',
      'That you have completed all required qualifications, built a sufficient portfolio, and are educationally ready for the EPA',
    ],
    correctAnswer: 3,
    explanation:
      'The training provider confirms the educational side: all required qualifications completed (e.g., Level 3 Diploma), learning outcomes achieved, portfolio evidence sufficient, and educational readiness for the EPA. They may also confirm that English and maths requirements have been met.',
  },
  {
    id: 4,
    question: 'English and maths requirements for EPA gateway typically require:',
    options: [
      'Achievement of Level 2 English and maths (or Functional Skills equivalents) as a minimum before the EPA gateway can be opened',
      'Achievement of Level 3 English and maths before any on-programme learning can begin',
      'A pass in GCSE science in addition to English and maths at Level 1',
      'No formal English and maths requirement, provided the portfolio is complete',
    ],
    correctAnswer: 0,
    explanation:
      'Most apprenticeship standards, including ST1426, require Level 2 English and maths (GCSE grade 4/C or Functional Skills Level 2) before the EPA gateway. If you have not yet achieved these, they must be completed before sign-off. Check the specific requirements with your training provider — some standards have different requirements.',
  },
  {
    id: 5,
    question: 'A tripartite review should take place:',
    options: [
      'Only once, immediately before the EPA, since holding earlier reviews would simply duplicate effort',
      'At regular intervals throughout the apprenticeship, with a formal final review before the EPA gateway decision',
      'After the EPA has been completed, to review how the assessment went and capture lessons learned',
      'Whenever a problem arises, with no scheduled reviews in between, so that meetings are only held when something has gone wrong',
    ],
    correctAnswer: 1,
    explanation:
      'Regular tripartite reviews (at least quarterly) ensure everyone is aligned on progress and any issues are identified early. The final gateway review, typically 2-3 months before the planned EPA, is where the formal sign-off decision is made. Regular reviews mean there should be no surprises at this stage.',
  },
  {
    id: 6,
    question:
      'If the employer wants to push you through the gateway but the training provider has concerns, the correct outcome is:',
    options: [
      'The employer can sign off alone, since they hold the apprenticeship contract and their judgement overrides the provider',
      'The apprentice decides, choosing whether to proceed despite the training provider’s concerns',
      'The concerns must be addressed before sign-off — both parties must agree the apprentice is ready',
      'The EPAO is asked to settle the disagreement and decide whether the gateway should be opened',
    ],
    correctAnswer: 2,
    explanation:
      "Both signatures are required — neither party can override the other. If there is disagreement, the concerns must be discussed openly and resolved. Usually this means identifying specific actions to address the training provider's concerns. Proceeding without genuine agreement from both parties puts the apprentice at risk of failure.",
  },
  {
    id: 7,
    question: 'Your role in the sign-off process includes:',
    options: [
      'Waiting passively for your employer and provider to decide, since the gateway decision is entirely theirs to make',
      'Arranging and paying for your own end-point assessment directly with the EPAO before the gateway is opened',
      'Assessing the readiness of the other apprentices in your cohort and reporting your findings to the training provider',
      'Ensuring your portfolio is complete, your qualifications are done, and you honestly assess your own readiness',
    ],
    correctAnswer: 3,
    explanation:
      'You are an active participant in the sign-off process: ensure your portfolio is ready, confirm all qualifications are completed, honestly assess your own readiness (are there areas you feel weak on?), and raise any concerns. It is better to ask for more preparation time than to enter the EPA unprepared.',
  },
  {
    id: 8,
    question:
      'If you do not feel ready for the EPA but your employer and provider want to proceed, you should:',
    options: [
      'Express your concerns clearly and specifically — identify the areas you feel underprepared in and request additional support or time to address them before the gateway is opened',
      'Say nothing and proceed, since admitting you feel underprepared would only undermine your employer’s confidence in you',
      'Refuse to attend the EPA altogether until you feel completely confident in every area of the standard',
      'Proceed anyway and rely on resitting any failed components afterwards, treating the first attempt as a practice run',
    ],
    correctAnswer: 0,
    explanation:
      "Your concerns are valid and should be heard. Express them specifically: 'I do not feel confident about my control systems knowledge' or 'I have not had enough experience of commissioning activities.' This is not weakness — it is professional self-awareness. Your employer and provider can then address these specific concerns through targeted support or additional experience.",
  },
  {
    id: 9,
    question: 'The sign-off documentation typically includes:',
    options: [
      'A graded mark sheet showing how the EPAO assessed each of your EPA components',
      'Written confirmation from both parties, a record of the gateway review, and formal agreement to proceed',
      'A signed declaration from the apprentice alone confirming that they personally feel ready to be assessed',
      'A copy of the apprenticeship funding agreement and the employer’s invoice for the training delivered',
    ],
    correctAnswer: 1,
    explanation:
      'The sign-off should be formally documented: written declarations from both employer and training provider, minutes or record of the gateway review meeting, confirmation that all pre-requisites are met, and formal authorisation to proceed. This paperwork is submitted to the EPAO as part of the gateway process.',
  },
  {
    id: 10,
    question: 'Off-the-job training hours must be completed before sign-off because:',
    options: [
      'They are only recommended rather than required, so completing them before sign-off simply looks good to the EPAO',
      'They can be made up after the EPA if there is a shortfall, provided the apprentice agrees to do so',
      'The funding rules require a minimum of 20% off-the-job training to be evidenced before the EPA can proceed',
      'They replace the need for a portfolio, since logged training hours are sufficient evidence on their own',
    ],
    correctAnswer: 2,
    explanation:
      'Off-the-job training is a mandatory component of all apprenticeships. You must have completed the required hours (typically 20% of your working hours) before the gateway. Both you and your employer must have records of these hours. Any shortfall must be addressed before sign-off — it cannot be retrospectively completed after the EPA.',
  },
  {
    id: 11,
    question: 'After sign-off is completed, the next step is:',
    options: [
      'The Level 3 Diploma is awarded, marking the formal completion of the whole apprenticeship',
      'A further round of off-the-job training begins to top up any hours still outstanding',
      'The employer issues the apprentice with their final pay rise to reflect qualified status',
      'The gateway is formally opened with the EPAO, who then schedules the EPA components',
    ],
    correctAnswer: 3,
    explanation:
      'After sign-off, the gateway paperwork is submitted to the EPAO. The EPAO confirms everything is in order and schedules the EPA components. There is typically a window of 2-4 weeks between gateway opening and the first EPA component, which should be used for final revision and preparation. The assessment plan specifies the timeframe.',
  },
  {
    id: 12,
    question: 'A common reason for gateway sign-off being delayed is:',
    options: [
      'Outstanding qualification certificates, incomplete portfolio evidence, or off-the-job hours below the minimum',
      'The EPAO being fully booked, since gateway sign-off cannot happen until an assessment date is confirmed',
      'The apprentice scoring too highly in mock assessments, which prompts the provider to delay and re-check the evidence',
      'The employer wanting the apprentice to sit the EPA sooner than the training provider has scheduled it',
    ],
    correctAnswer: 0,
    explanation:
      'The most common delays are administrative: awaiting qualification certificates (which can take weeks to process), portfolio evidence gaps that need additional workplace activities to fill, and off-the-job training hour shortfalls. Planning ahead — requesting certificates early, building your portfolio continuously, and tracking training hours throughout — prevents most of these delays.',
  },
];

const faqs = [
  {
    question: 'When should I start preparing for the sign-off review?',
    answer:
      'Preparation should be ongoing throughout the apprenticeship — regular portfolio building, evidence gathering, and qualification completion. However, you should start specifically preparing for the gateway review at least 3 months before your planned EPA date. This gives time to identify and address any gaps. Your training provider should be guiding you on timeline and readiness.',
  },
  {
    question: 'What happens if I fail to meet the gateway requirements by the planned date?',
    answer:
      'The EPA is delayed until the requirements are met. This is not unusual and is far better than entering the EPA unprepared. Discuss the situation with your employer and training provider, agree a revised timeline, and focus on addressing the outstanding requirements. A short delay with a successful EPA outcome is much better than an on-time EPA that results in failure.',
  },
  {
    question: 'Can the employer refuse to sign off for reasons unrelated to my competence?',
    answer:
      'The sign-off should be based purely on your competence and readiness, not on business preferences (e.g., wanting to keep you as a lower-cost apprentice for longer). If you believe the refusal is unjustified, discuss it with your training provider. They can mediate and ensure the decision is based on genuine competence assessment.',
  },
  {
    question: 'Do I need to have completed all my off-the-job training hours before sign-off?',
    answer:
      'Yes. The minimum off-the-job training requirement (typically 20% of your working hours over the apprenticeship) must be evidenced before the gateway. If there is a shortfall, your employer and training provider should agree a plan to complete the remaining hours before the gateway review.',
  },
  {
    question: 'What qualifications need to be completed before gateway?',
    answer:
      'For the ST1426 MOET standard, you typically need your Level 3 Diploma (or equivalent), Level 2 English and maths (if not already held), and any other mandatory qualifications specified in the assessment plan. Check the specific requirements with your training provider — they will confirm exactly what is needed for your EPAO.',
  },
];

const MOETModule7Section5_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 7 · Section 7.5 · Subsection 1"
        title="Employer and Training Provider Sign-Off"
        backTo="/study-centre/apprentice/m-o-e-t-module7-section5"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Understanding the gateway approval process and ensuring you are ready for end-point
            assessment.
          </p>

          <TLDR
            points={[
              'Both parties: Employer AND training provider must sign off.',
              'Confirms: Competence, qualifications, portfolio completeness.',
              'Tripartite: You, employer and provider review together.',
              'Pre-requisites: Level 2 English, maths, off-the-job hours.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Understand the purpose and process of employer and training provider sign-off',
              'Know what pre-requisites must be completed before the gateway can be opened',
              'Prepare effectively for the tripartite gateway readiness review',
              'Resolve outstanding issues identified during the sign-off process',
              'Understand your rights and responsibilities in the gateway decision',
              'Know what happens after sign-off and how the EPA is then scheduled',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="EPA assessment context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Gateway:</strong> sign-off opens the door to EPA scheduling.
              </li>
              <li>
                <strong>Quality gate:</strong> ensures you are not assessed prematurely.
              </li>
              <li>
                <strong>Preparation time:</strong> typically 2-4 weeks between gateway and EPA.
              </li>
              <li>
                <strong>ST1426:</strong> mandatory step before any EPA component.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>The sign-off process</ContentEyebrow>

          <ConceptBlock title="A quality gate, not a rubber stamp">
            <p>
              The sign-off process is the formal mechanism that confirms you have completed all
              on-programme requirements and are ready for end-point assessment. It is a quality gate
              — designed to protect you from being assessed before you are genuinely prepared. Both
              your employer and training provider must independently confirm your readiness.
            </p>
            <p>
              This dual sign-off requirement exists because the employer and training provider have
              different perspectives on your readiness. The employer sees your workplace competence
              — how you perform on real tasks, your professional behaviours in practice, and your
              ability to work independently. The training provider sees your academic achievement —
              qualifications completed, knowledge demonstrated, and portfolio evidence assembled.
            </p>
          </ConceptBlock>

          <ConceptBlock title="What must be confirmed">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Qualifications:</strong> Level 3 Diploma (or equivalent) completed and
                passed.
              </li>
              <li>
                <strong>English and maths:</strong> Level 2 achieved (GCSE grade 4/C or Functional
                Skills Level 2).
              </li>
              <li>
                <strong>Off-the-job training:</strong> minimum 20% hours completed and evidenced.
              </li>
              <li>
                <strong>Portfolio:</strong> work-based evidence portfolio meets minimum
                requirements.
              </li>
              <li>
                <strong>Workplace competence:</strong> employer confirms demonstration of required
                KSBs.
              </li>
              <li>
                <strong>Readiness:</strong> genuine professional judgement that the apprentice is
                ready for assessment.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Sign-off is not a rubber stamp"
            whatHappens={
              <>
                Being entered for EPA before you are ready is one of the most common causes of
                failure. A sign-off that just checks boxes without genuine assessment of readiness
                leaves gaps unaddressed until the assessment itself exposes them.
              </>
            }
            doInstead={
              <>
                If either party has concerns about your readiness, these should be discussed openly
                and addressed before proceeding. A short delay for additional preparation is far
                better than a failed attempt. The sign-off protects you: it ensures you are not
                assessed before you are ready and confirms that everyone — you, your employer and
                your training provider — agrees that you are prepared for the EPA.
              </>
            }
          />

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>The tripartite gateway review</ContentEyebrow>

          <ConceptBlock
            title="A meeting between you, your employer and your training provider"
            onSite="Be honest during the review. If you have concerns about specific areas, raise them. It is far better to address a gap now than to discover it during the EPA."
          >
            <p>
              The tripartite review is a formal meeting between you, your employer representative
              (usually your line manager or supervisor) and your training provider. It is the
              meeting where the gateway decision is made — to proceed, to delay pending specific
              actions, or to agree that more time is needed.
            </p>
            <p>
              Regular tripartite reviews throughout the apprenticeship (at least quarterly) ensure
              there are no surprises at the final gateway review. If progress has been tracked
              consistently, the gateway review should be a confirmation of readiness rather than a
              discovery of problems.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Preparing for the gateway review">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Complete your portfolio:</strong> ensure all evidence is in place, mapped to
                KSBs, and well-organised.
              </li>
              <li>
                <strong>Check qualifications:</strong> confirm all required qualifications have been
                achieved and certificates obtained.
              </li>
              <li>
                <strong>Review off-the-job hours:</strong> verify your training log shows the
                required hours have been completed.
              </li>
              <li>
                <strong>Self-assess:</strong> honestly evaluate your readiness against each KSB —
                are there areas you feel weak on?
              </li>
              <li>
                <strong>Prepare questions:</strong> if you have concerns or uncertainties about the
                EPA process, prepare questions for the review.
              </li>
              <li>
                <strong>Bring evidence:</strong> have your portfolio, qualification certificates and
                training records available.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Typical gateway review agenda">
            <ol className="list-decimal space-y-2 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Progress review:</strong> summary of on-programme achievements and remaining
                actions.
              </li>
              <li>
                <strong>Qualification check:</strong> confirmation that all required qualifications
                are completed.
              </li>
              <li>
                <strong>Portfolio review:</strong> assessment of portfolio completeness and quality.
              </li>
              <li>
                <strong>Employer feedback:</strong> employer&apos;s assessment of workplace
                competence and readiness.
              </li>
              <li>
                <strong>Apprentice self-assessment:</strong> your honest evaluation of your
                readiness and any concerns.
              </li>
              <li>
                <strong>Decision:</strong> proceed, action plan, or agree more time is needed.
              </li>
            </ol>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Resolving outstanding issues</ContentEyebrow>

          <ConceptBlock
            title="Specificity is the key to resolving issues efficiently"
            onSite="Every issue identified should have a specific action plan: what needs to be done, who is responsible, and when it will be completed. Review progress against the action plan at a follow-up meeting before confirming sign-off."
          >
            <p>
              It is not uncommon for the gateway review to identify outstanding issues that need
              addressing. This is the process working as intended — better to find and fix gaps now
              than during the EPA itself. Every issue identified should have a specific, time-bound
              action plan.
            </p>
            <p>
              The key to resolving issues efficiently is specificity. &quot;Complete more portfolio
              evidence&quot; is too vague. &quot;Add a reflective account covering a fault diagnosis
              on the packaging line, mapped to KSB K12 and S7, by 15th March&quot; is actionable and
              can be tracked.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Common gateway issues and solutions">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Issue</th>
                    <th className="py-2 pr-4 font-medium text-white">Solution</th>
                    <th className="py-2 font-medium text-white">Typical timeline</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 align-top">Portfolio evidence gaps</td>
                    <td className="py-2 pr-4 align-top">Add specific evidence for missing KSBs</td>
                    <td className="py-2">2-4 weeks</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 align-top">English/maths not yet achieved</td>
                    <td className="py-2 pr-4 align-top">Complete and pass the required exam</td>
                    <td className="py-2">Next exam sitting</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 align-top">Off-the-job hours shortfall</td>
                    <td className="py-2 pr-4 align-top">Plan and complete remaining hours</td>
                    <td className="py-2">Depends on shortfall</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 align-top">Limited experience in specific area</td>
                    <td className="py-2 pr-4 align-top">Arrange targeted workplace activities</td>
                    <td className="py-2">2-6 weeks</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 align-top">Knowledge gaps identified</td>
                    <td className="py-2 pr-4 align-top">
                      Additional revision or training sessions
                    </td>
                    <td className="py-2">2-4 weeks</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 align-top">Certificate not yet received</td>
                    <td className="py-2 pr-4 align-top">
                      Chase awarding body; obtain interim confirmation
                    </td>
                    <td className="py-2">1-4 weeks</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Your rights and responsibilities</ContentEyebrow>

          <ConceptBlock
            title="A three-way agreement"
            onSite="The sign-off process works best when all three parties communicate openly and honestly. If you feel you are not ready, say so. If you feel you are being held back unfairly, raise it with your training provider. The process is designed to serve your interests — use it."
          >
            <p>
              The sign-off process is a three-way agreement. You are not a passive participant — you
              have both rights and responsibilities. Understanding these ensures the process works
              fairly and effectively.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Your rights">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>To be informed about the gateway requirements well in advance.</li>
              <li>To have your concerns heard and taken seriously.</li>
              <li>To request additional time or support if you do not feel ready.</li>
              <li>To understand the reasons if sign-off is delayed.</li>
              <li>To have decisions based on competence, not business convenience.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Your responsibilities">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Keep your portfolio up to date throughout the apprenticeship.</li>
              <li>Complete qualifications within the agreed timeframes.</li>
              <li>Track your off-the-job training hours and flag any shortfall early.</li>
              <li>Honestly assess your own readiness and raise concerns.</li>
              <li>Actively participate in progress reviews and the gateway review.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>After sign-off: opening the gateway</ContentEyebrow>

          <ConceptBlock
            title="Use the preparation window wisely"
            onSite="The gateway is the final checkpoint before the independent EPA. Once through the gateway, you are in the hands of the EPAO and their appointed assessor. Everything you have done during your apprenticeship — the learning, the experience, the portfolio building — has prepared you for this. Trust your preparation and approach the EPA with confidence."
          >
            <p>
              Once both parties have signed off and all pre-requisites are confirmed, the gateway
              paperwork is submitted to the EPAO. The EPAO reviews the submission, confirms
              everything is in order, and schedules the EPA components. There is typically a period
              of 2-4 weeks between gateway opening and the first assessment — use this time wisely
              for final preparation.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Post-gateway preparation">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Review your portfolio:</strong> final check that everything is in order,
                well-organised, and you can discuss every piece of evidence.
              </li>
              <li>
                <strong>Practise discussions:</strong> rehearse talking through your evidence and
                answering probing questions.
              </li>
              <li>
                <strong>Revise key knowledge:</strong> review the technical content most likely to
                be assessed.
              </li>
              <li>
                <strong>Practise practical tasks:</strong> refresh your practical skills,
                particularly safe isolation and testing procedures.
              </li>
              <li>
                <strong>Prepare mentally:</strong> build confidence through preparation — you have
                been signed off because you are ready.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'Both employer and training provider must sign off before the gateway opens.',
              'All qualifications (Level 3 Diploma, Level 2 English and maths) must be achieved.',
              'Off-the-job training hours (20% minimum) must be completed and evidenced.',
              'Your portfolio must be substantially complete and mapped to KSBs.',
              'You are an active participant — raise any concerns about your readiness.',
              'Typically 2-4 weeks between gateway opening and first EPA component.',
              'A short delay for proper preparation is always better than a premature EPA.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Test Your Knowledge — Sign-Off and Gateway" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module7-section5')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Back to section
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Section overview
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module7-section5-2')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  EPA Gateway Requirements
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule7Section5_1;
