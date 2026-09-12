/**
 * MOET · Module 7 · Section 2 · Subsection 6 — Assessment Marking Criteria Awareness
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option. This section of Module 7 covers technique for the EPA
 * practical observation rather than a specific piece of engineering
 * knowledge, so no ST1426 knowledge/skill/behaviour statement is quoted
 * here — none of the verified KSB statements checked for this conversion
 * describe assessment-preparation technique.
 *
 * This is the last subsection of Section 2. The original page's "next"
 * button pointed back to the section hub because Module 7 Section 3 had not
 * been written yet. Section 3 (3.1 Building a Work-Based Portfolio) now
 * exists in the same module, so the next button below points there instead,
 * matching how every other section-to-section boundary in this course is
 * handled.
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt.
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
  Scenario,
  CommonMistake,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Assessment Marking Criteria Awareness - MOET Module 7 Section 2.6';
const DESCRIPTION =
  'Understanding EPA marking criteria, grading descriptors and assessment expectations: what assessors look for, how to achieve pass and distinction grades, and common pitfalls in the MOET practical observation under ST1426.';

const quickCheckQuestions = [
  {
    id: 'grading-difference',
    question:
      "What is the key difference between a 'pass' and a 'distinction' grade in the EPA practical observation?",
    options: [
      'A pass takes longer to complete than a distinction during the observation',
      'Pass demonstrates competence; distinction demonstrates competence with exceptional quality, initiative, depth of understanding and professional confidence',
      'A distinction is awarded only to candidates who finish ahead of time',
      'There is no practical difference; the grades are decided by the knowledge test alone',
    ],
    correctIndex: 1,
    explanation:
      'A pass grade confirms you are competent — you can safely perform the required tasks to an acceptable standard. A distinction demonstrates you go beyond competence: exceptional workmanship quality, proactive safety awareness, deeper technical understanding, confident communication, and professional initiative. It is the difference between adequate and excellent.',
  },
  {
    id: 'assessor-observation',
    question: 'During the practical observation, the assessor is primarily watching for:',
    options: [
      'How quickly the candidate completes the task, regardless of safety',
      'Safe working practices, systematic approach, correct use of tools/instruments, workmanship quality, communication, and professional behaviours',
      'Whether the candidate uses the most expensive tools available',
      'How confidently the candidate answers questions about unrelated trades',
    ],
    correctIndex: 1,
    explanation:
      'The assessor evaluates multiple dimensions simultaneously: safety consciousness, systematic methodology, technical skill with tools and instruments, quality of finished work, verbal communication of understanding, and professional behaviours (initiative, organisation, attention to detail). No single factor determines the grade — it is the combination.',
  },
  {
    id: 'common-fail-point',
    question: 'Which of the following is a common reason for failing the practical observation?',
    options: [
      'Omitting safety-critical steps such as safe isolation, failing to prove dead, or not wearing appropriate PPE',
      'Explaining each action clearly and confidently as the work progresses',
      'Taking a methodical, systematic approach to fault diagnosis',
      'Producing a neat, professional finish on every connection',
    ],
    correctIndex: 0,
    explanation:
      'Safety-critical omissions are the most common fail points. Failing to isolate before working, skipping the prove-test-prove sequence, not wearing appropriate PPE, and bypassing safety interlocks are all grounds for failing the practical observation regardless of how well other aspects are performed.',
  },
  {
    id: 'ksb-assessment',
    question: 'How are KSBs (Knowledge, Skills, Behaviours) assessed across the EPA components?',
    options: [
      'KSBs are assessed holistically across all components — the knowledge test, practical observation and professional discussion each contribute evidence of different KSBs',
      'Only the knowledge test assesses KSBs; the other components are not graded',
      'KSBs are self-assessed by the apprentice and signed off by their employer',
      'Behaviours are the only KSBs assessed, since knowledge and skills are assumed',
    ],
    correctIndex: 0,
    explanation:
      'The EPA is designed so that different components assess different KSBs, with some overlap for triangulation. The knowledge test primarily assesses K (knowledge), the practical observation primarily assesses S (skills) and B (behaviours), and the professional discussion assesses all three through reflection on workplace evidence. Together they build a complete picture of competence.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'The EPA grading structure for the MOET standard includes:',
    options: [
      'Pass only — there are no grades',
      'Fail, pass, and distinction',
      'Bronze, silver, and gold',
      'Grades A to E',
    ],
    correctAnswer: 1,
    explanation:
      "The MOET EPA uses a three-tier grading structure: fail (not yet competent), pass (competent to the required standard), and distinction (competent with exceptional performance). There is no 'merit' grade in this standard.",
  },
  {
    id: 2,
    question: 'To achieve a distinction in the practical observation, you should:',
    options: [
      'Complete the task as quickly as possible, as finishing first is the main distinction criterion',
      'Use the most advanced test instruments available, even for tasks that do not require them',
      'Demonstrate exceptional safety awareness, superior workmanship, confident technical communication, initiative, and thorough verification',
      'Avoid speaking to the assessor so that you are not distracted while completing the work',
    ],
    correctAnswer: 2,
    explanation:
      'Distinction requires performance that goes beyond the minimum competence standard. This includes: proactive (not just reactive) safety practices, workmanship that exceeds the minimum acceptable standard, confident and technically accurate communication, evidence of initiative and problem-solving, and thorough verification with attention to detail.',
  },
  {
    id: 3,
    question: 'The assessor uses grading descriptors to ensure:',
    options: [
      'The assessment can be completed faster, with fewer checks needed against the standard',
      'Candidates from the same training provider all receive the same grade as one another',
      'The most experienced candidates are always awarded a distinction regardless of performance',
      'Consistent, objective and fair assessment against defined criteria, regardless of which assessor or EPAO conducts the assessment',
    ],
    correctAnswer: 3,
    explanation:
      "Grading descriptors provide standardised criteria so that assessment is objective and consistent. Every assessor uses the same descriptors, and every EPAO applies the same standard. This means your grade reflects your actual competence, not the particular assessor's personal preferences.",
  },
  {
    id: 4,
    question: 'If you make a minor error during the practical observation, you should:',
    options: [
      'Recognise the error, correct it, and briefly explain what happened and why you corrected it',
      'Carry on as though nothing happened and hope the assessor did not notice',
      'Stop the assessment immediately and ask to start again from the beginning',
      'Blame the tools or equipment so the error is not counted against you',
    ],
    correctAnswer: 0,
    explanation:
      'Self-recognition and correction of errors demonstrates competence and self-awareness. The assessor notes both the error and your response to it. A candidate who spots their own mistake and corrects it properly shows more competence than one who does not notice. This can actually work in your favour for achieving higher grades.',
  },
  {
    id: 5,
    question: 'The KSBs (Knowledge, Skills, Behaviours) assessed in the EPA are:',
    options: [
      'Only the practical skills, since knowledge and behaviours are checked during the apprenticeship instead',
      'The complete set of knowledge, practical skills, and professional behaviours defined in the ST1426 apprenticeship standard',
      'A list of personal qualities chosen by each EPAO and varying from one centre to another',
      'The set of qualifications the apprentice must already hold before starting the EPA',
    ],
    correctAnswer: 1,
    explanation:
      'KSBs encompass all three dimensions: Knowledge (what you know and understand), Skills (what you can do in practice), and Behaviours (how you conduct yourself professionally). The EPA assesses all three through its different components — practical observation, knowledge test, and professional discussion.',
  },
  {
    id: 6,
    question: 'During the professional discussion element of the EPA, you should:',
    options: [
      'Keep your answers as brief as possible so the discussion finishes quickly',
      'Give general, textbook answers rather than referring to your own workplace experience',
      'Provide detailed, evidenced answers that link your workplace experience to the apprenticeship standard, demonstrating depth of understanding',
      'Steer every question back to the single topic you feel most confident about',
    ],
    correctAnswer: 2,
    explanation:
      'The professional discussion assesses your ability to reflect on and articulate your learning and experience. Provide specific examples from your workplace, explain what you did, why you did it, what you learned, and how it links to the standard. Detailed, genuine responses score higher than brief or generic answers.',
  },
  {
    id: 7,
    question: 'Professional behaviours assessed during the EPA include:',
    options: [
      'The speed of completion and the number of tasks attempted within the time limit',
      "The candidate's physical strength and stamina when handling heavy equipment",
      'The cost of the tools and instruments the candidate brings to the observation',
      'Safety consciousness, initiative, communication, teamwork, time management, attention to detail, and continuous improvement',
    ],
    correctAnswer: 3,
    explanation:
      'Professional behaviours are assessed throughout the EPA. They include: taking responsibility for safety, showing initiative in problem-solving, communicating clearly and professionally, working effectively with others, managing time efficiently, maintaining attention to detail, and demonstrating a commitment to learning and improvement.',
  },
  {
    id: 8,
    question: 'The purpose of the knowledge test element of the EPA is to:',
    options: [
      'Assess your underpinning knowledge and understanding of the technical, safety and regulatory topics covered by the apprenticeship standard',
      'Observe your practical skill in carrying out maintenance tasks on live equipment',
      'Record your workplace attendance and the number of hours logged during the apprenticeship',
      'Replace the practical observation for candidates who score highly on the written paper',
    ],
    correctAnswer: 0,
    explanation:
      'The knowledge test assesses whether you understand the technical and regulatory foundations of your role. It covers areas such as electrical theory, safety legislation, maintenance practices, and engineering principles. Understanding, not rote memorisation, is assessed — questions require application of knowledge, not just recall.',
  },
  {
    id: 9,
    question: 'To prepare effectively for the EPA marking criteria, you should:',
    options: [
      'Memorise the exact wording of the descriptors without practising any of the tasks they describe',
      'Review the grading descriptors, understand what each grade requires, practise to the distinction standard, and seek feedback from your training provider',
      'Focus only on the pass-level requirements, as preparing for distinction wastes valuable time',
      'Wait until the day of the assessment so the criteria are fresh in your mind on arrival',
    ],
    correctAnswer: 1,
    explanation:
      'Effective preparation means understanding the criteria you will be judged against. Review the grading descriptors for each EPA component, practise performing tasks to the distinction standard (not just the pass standard), seek regular feedback from your training provider and workplace mentor, and address any gaps identified during mock assessments.',
  },
  {
    id: 10,
    question: "An assessor who asks 'What would you do if...?' during the observation is:",
    options: [
      'Trying to distract you so that you make a mistake on the task you are completing',
      'Checking that you can recite the exact wording of the relevant regulation from memory',
      'Testing your ability to think through scenarios, apply knowledge to new situations, and demonstrate depth of understanding',
      'Signalling that you have already failed and the rest of the observation is a formality',
    ],
    correctAnswer: 2,
    explanation:
      'Scenario questions test higher-order thinking — can you apply your knowledge to new or unfamiliar situations? This is a key distinction between pass and distinction candidates. A confident, reasoned response that considers safety, regulations, and practical implications demonstrates genuine competence.',
  },
  {
    id: 11,
    question: 'If you are unsure about something during the EPA, the best approach is to:',
    options: [
      'Guess confidently and present the answer as fact, since admitting doubt always loses marks',
      'Stay silent and move on, hoping the assessor will not return to the topic',
      'Insist that the question is unfair and ask for it to be removed from the assessment',
      'Acknowledge the uncertainty, explain what you do know, and describe how you would find the correct information in a real workplace situation',
    ],
    correctAnswer: 3,
    explanation:
      "Honest acknowledgement of limitations, combined with knowing how to find information, is a professional behaviour. Explain what you are certain about, acknowledge what you are unsure of, and describe the resources you would consult (manufacturer's data, BS 7671, supervisor guidance). This demonstrates self-awareness and professional maturity.",
  },
  {
    id: 12,
    question: 'The overall EPA grade is determined by:',
    options: [
      'A combination of grades across all assessment components as defined in the EPA specification — you must achieve at least a pass in each component',
      'The grade achieved in the practical observation alone, with the other components ungraded',
      'An average of the component grades, so a fail in one can be offset by a distinction in another',
      'The training provider recommendation submitted before the end-point assessment begins',
    ],
    correctAnswer: 0,
    explanation:
      'The overall grade is calculated from the combination of grades across all EPA components (knowledge test, practical observation, professional discussion) according to the rules in the EPA specification. You must pass each component — failing one means failing overall. The specific combination rules for achieving a distinction are defined by the EPAO and published in the assessment plan.',
  },
];

const faqs = [
  {
    question: 'Where can I find the official grading descriptors for the MOET EPA?',
    answer:
      'The grading descriptors are published in the EPA specification document for ST1426, available from the Institute for Apprenticeships and Technical Education (IfATE) website and from your EPAO. Your training provider should give you a copy and explain each criterion. Review them carefully — they are your roadmap to understanding exactly what the assessor is looking for.',
  },
  {
    question: 'How many EPA components are there and do I need to pass all of them?',
    answer:
      'The MOET EPA typically has three components: a knowledge test, a practical observation, and a professional discussion with portfolio. You must achieve at least a pass in each component. Your overall grade is determined by a combination of the grades across all components as defined in the EPA specification. You cannot fail one component and still achieve an overall pass.',
  },
  {
    question: 'Can I retake a failed EPA component?',
    answer:
      'Yes, if you fail one or more components, you can retake them. There is typically a waiting period before retake (your EPAO will confirm the timeframe). You should use the feedback from the failed attempt to identify areas for improvement and work with your training provider to address them before retaking.',
  },
  {
    question: 'How should I prepare for the professional discussion?',
    answer:
      "Prepare by reviewing your portfolio evidence and being ready to discuss each piece in detail: what the situation was, what you did, why you did it, what the outcome was, and what you learned. Practise speaking about your experience confidently and linking it to the standard's KSBs. Your training provider should conduct mock professional discussions to help you prepare.",
  },
  {
    question: 'Does the assessor have a checklist they work through?',
    answer:
      'Assessors use structured assessment plans with specific criteria and evidence requirements. They observe and record evidence against each criterion during the assessment. They are trained to be objective and consistent. The assessment is structured, not random — so knowing the criteria helps you demonstrate the right evidence at the right time.',
  },
];

const MOETModule7Section2_6 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 7 · Section 7.2 · Subsection 6"
        title="Assessment Marking Criteria Awareness"
        backTo="/study-centre/apprentice/m-o-e-t-module7-section2"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Understanding what assessors look for and how to achieve your best grade in the EPA.
          </p>

          <TLDR
            points={[
              'Grades: fail, pass, distinction — no merit.',
              'Pass: competent to the required standard.',
              'Distinction: exceptional quality, initiative, depth.',
              'Criteria: published grading descriptors for each component.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Understand the EPA grading structure and what each grade requires',
              'Identify the key marking criteria for the practical observation component',
              'Recognise the difference between pass and distinction-level performance',
              'Understand how professional behaviours contribute to your overall grade',
              'Identify common fail points and how to avoid them during assessment',
              'Prepare effectively using the official grading descriptors and criteria',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="EPA assessment context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Components:</strong> knowledge test, practical, professional discussion.
              </li>
              <li>
                <strong>KSBs:</strong> knowledge, skills and behaviours assessed.
              </li>
              <li>
                <strong>Objective:</strong> standardised criteria across all EPAOs.
              </li>
              <li>
                <strong>ST1426:</strong> full standard mapped to assessment.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>The EPA grading structure</ContentEyebrow>

          <ConceptBlock title="The EPA grading structure">
            <p>
              The MOET End-Point Assessment uses a straightforward grading structure: fail, pass,
              and distinction. Understanding what each grade requires helps you target your
              preparation and performance. The key is that the EPA is not a competition against
              other candidates — it is an assessment of your competence against defined standards.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Grade definitions">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Grade</th>
                    <th className="py-2 pr-4 font-medium text-white">What it means</th>
                    <th className="py-2 font-medium text-white">Key indicators</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium text-red-400">Fail</td>
                    <td className="py-2 pr-4">Not yet competent to the required standard</td>
                    <td className="py-2">
                      Safety-critical errors, insufficient knowledge, unable to complete key tasks
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium text-green-400">Pass</td>
                    <td className="py-2 pr-4">Competent to the required standard</td>
                    <td className="py-2">
                      Safe working, correct procedures, acceptable workmanship, adequate knowledge
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium text-elec-yellow">Distinction</td>
                    <td className="py-2 pr-4">
                      Exceeds the required standard with exceptional performance
                    </td>
                    <td className="py-2">
                      Proactive safety, superior workmanship, deep understanding, confident
                      communication, initiative
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <CommonMistake
            title="Automatic fail criteria"
            whatHappens={
              <>
                Certain errors result in an automatic fail regardless of performance in other areas:
                working on live conductors without safe isolation, failing to use or correctly apply
                the prove-test-prove sequence, bypassing safety interlocks or devices, and creating
                an unsafe situation that could endanger yourself or others.
              </>
            }
            doInstead={<>These are non-negotiable safety requirements.</>}
          />

          <p className="text-[14.5px] leading-relaxed text-white">
            <strong>Key point:</strong> aim for distinction in your preparation, even if you would
            be happy with a pass. Preparing to the highest standard gives you the best margin for
            success under assessment pressure.
          </p>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Practical observation marking criteria</ContentEyebrow>

          <ConceptBlock title="Practical observation marking criteria">
            <p>
              The practical observation is where your hands-on competence is directly assessed. The
              assessor uses structured criteria to evaluate multiple aspects of your performance
              simultaneously. Understanding these criteria allows you to demonstrate the right
              evidence at the right time.
            </p>
          </ConceptBlock>

          <ConceptBlock title="What the assessor evaluates">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Safety:</strong> safe isolation, PPE use, risk awareness, safe working
                throughout — this is the foundation.
              </li>
              <li>
                <strong>Methodology:</strong> systematic approach, logical sequence, correct
                procedures followed.
              </li>
              <li>
                <strong>Technical skill:</strong> correct use of tools, instruments, and techniques;
                accuracy of work.
              </li>
              <li>
                <strong>Workmanship:</strong> quality of connections, cable management, component
                installation, finish.
              </li>
              <li>
                <strong>Communication:</strong> explaining actions, reasoning, and technical
                understanding verbally.
              </li>
              <li>
                <strong>Verification:</strong> testing completed work, confirming correct operation,
                documenting results.
              </li>
              <li>
                <strong>Professionalism:</strong> organisation, time management, housekeeping,
                attention to detail.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Pass vs distinction — practical examples">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Criterion</th>
                    <th className="py-2 pr-4 font-medium text-white">Pass level</th>
                    <th className="py-2 font-medium text-white">Distinction level</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Safe isolation</td>
                    <td className="py-2 pr-4">Completes correctly with prompting</td>
                    <td className="py-2">Completes confidently, explains each step unprompted</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Fault diagnosis</td>
                    <td className="py-2 pr-4">Uses systematic method, finds fault</td>
                    <td className="py-2">
                      Uses efficient method, explains reasoning clearly, identifies root cause
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Workmanship</td>
                    <td className="py-2 pr-4">Acceptable quality, functional</td>
                    <td className="py-2">
                      Exceptional quality, neat, professional finish, uses torque settings
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Communication</td>
                    <td className="py-2 pr-4">Answers questions when asked</td>
                    <td className="py-2">
                      Proactively explains, references standards, shows deep understanding
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              <strong>Key point:</strong> distinction is not about perfection — it is about
              consistent excellence across all criteria. You do not need to be perfect in every
              area, but you need to demonstrate exceptional performance in the majority of them.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Common pitfalls and how to avoid them</ContentEyebrow>

          <ConceptBlock title="Common pitfalls and how to avoid them">
            <p>
              Understanding common fail points and pitfalls helps you avoid them. These are not
              obscure traps — they are predictable errors that assessment experience shows
              candidates repeatedly make. Being aware of them is your best defence.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Top 10 candidate pitfalls">
            <ol className="list-decimal space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Skipping safe isolation steps</strong> — rushing or assuming the circuit is
                dead without proving it.
              </li>
              <li>
                <strong>Not explaining actions</strong> — working silently so the assessor cannot
                assess understanding.
              </li>
              <li>
                <strong>Poor cable preparation</strong> — nicked conductors, wrong strip length,
                missing ferrules.
              </li>
              <li>
                <strong>Ignoring manufacturer&apos;s data</strong> — not checking component
                specifications before installation.
              </li>
              <li>
                <strong>Skipping functional verification</strong> — assuming the repair is correct
                without testing.
              </li>
              <li>
                <strong>Random fault diagnosis</strong> — replacing components without systematic
                diagnosis.
              </li>
              <li>
                <strong>Poor time management</strong> — spending too long on early tasks and rushing
                later ones.
              </li>
              <li>
                <strong>Not updating labelling</strong> — leaving outdated or missing circuit
                identification.
              </li>
              <li>
                <strong>Messy work area</strong> — poor housekeeping throughout the assessment.
              </li>
              <li>
                <strong>Nervousness preventing communication</strong> — freezing up instead of
                explaining actions.
              </li>
            </ol>
          </ConceptBlock>

          <ConceptBlock title="Managing assessment nerves">
            <p>
              Nervousness is natural and expected. The best antidote is thorough preparation — the
              more you have practised, the more your responses become automatic under pressure.
              Focus on one step at a time rather than thinking about the entire assessment. If you
              feel overwhelmed, take a breath and return to the procedure you know. The assessor
              understands that candidates are nervous and will not penalise natural anxiety — only
              the impact on your performance.
            </p>
            <p>
              <strong>Key point:</strong> most failures are preventable. Thorough preparation,
              practised procedures, and awareness of common pitfalls will see you through the
              assessment with confidence.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Preparing to meet the criteria</ContentEyebrow>

          <ConceptBlock title="Preparing to meet the criteria">
            <p>
              Effective EPA preparation is targeted — you need to know what you are preparing for
              and practise specifically against the marking criteria. Generic revision is less
              effective than focused preparation against the published grading descriptors.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Preparation strategy">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Obtain the grading descriptors:</strong> get the official EPA specification
                from your training provider or IfATE.
              </li>
              <li>
                <strong>Self-assess honestly:</strong> rate yourself against each criterion — where
                are your strengths and gaps?
              </li>
              <li>
                <strong>Practise to distinction standard:</strong> do not practise to just pass —
                practise to the highest level.
              </li>
              <li>
                <strong>Mock assessments:</strong> complete at least two full mock assessments under
                timed conditions.
              </li>
              <li>
                <strong>Seek feedback:</strong> ask your training provider and workplace mentor for
                honest feedback.
              </li>
              <li>
                <strong>Address gaps:</strong> focus additional practice time on your weakest areas.
              </li>
              <li>
                <strong>Practise communication:</strong> explain your actions out loud until it
                feels natural.
              </li>
              <li>
                <strong>Prepare your portfolio:</strong> ensure all evidence is complete, organised
                and clearly linked to KSBs.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Mock assessment checklist">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Complete at least two full mock practical assessments under timed conditions.</li>
              <li>
                Have your training provider observe and provide feedback against the grading
                descriptors.
              </li>
              <li>Practise the professional discussion with prepared portfolio evidence.</li>
              <li>Complete timed mock knowledge tests to build exam technique.</li>
              <li>Record and review your communication — are you explaining actions clearly?</li>
              <li>Identify and address weaknesses revealed during mock assessments.</li>
            </ul>
            <p>
              <strong>Key point:</strong> mock assessments are the closest you can get to the real
              thing. Treat them seriously — dress as you would for the EPA, use the same tools, and
              work under the same time pressure. The more realistic your practice, the more
              confident you will be on the day.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>On the day — maximising your performance</ContentEyebrow>

          <ConceptBlock title="On the day — maximising your performance">
            <p>
              Your performance on assessment day is the culmination of months of preparation.
              Understanding how to manage the day itself — from practical logistics to psychological
              readiness — can make the difference between achieving a pass and a distinction. The
              assessor is looking for a competent, confident professional, and how you conduct
              yourself matters as much as your technical ability.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Assessment day preparation">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Tools and equipment:</strong> check everything the night before — all tools
                present, test instruments calibrated, batteries charged.
              </li>
              <li>
                <strong>Documentation:</strong> bring your portfolio, any required ID, and writing
                materials.
              </li>
              <li>
                <strong>PPE:</strong> clean, appropriate PPE ready — safety boots, overalls, eye
                protection, gloves.
              </li>
              <li>
                <strong>Arrive early:</strong> give yourself time to settle, familiarise yourself
                with the environment, and compose yourself.
              </li>
              <li>
                <strong>Listen carefully:</strong> pay close attention to the assessor&apos;s
                briefing — ask clarifying questions if anything is unclear.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="During the assessment">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Talk through your actions:</strong> narrate what you are doing and why —
                this lets the assessor hear your understanding.
              </li>
              <li>
                <strong>Follow your procedures:</strong> stick to the safe working practices you
                have rehearsed.
              </li>
              <li>
                <strong>Manage your time:</strong> keep an awareness of time without clock-watching
                — pace yourself steadily.
              </li>
              <li>
                <strong>Stay calm if things go wrong:</strong> recognise errors, correct them, and
                explain your correction.
              </li>
              <li>
                <strong>Maintain professionalism:</strong> tidy as you go, organise your workspace,
                treat it as a real job.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="The power of communication">
            <p>
              The single most common difference between pass and distinction candidates is
              communication. Distinction candidates naturally explain what they are doing and why,
              reference relevant standards, and demonstrate understanding through their commentary.
              If you are naturally quiet, practise speaking through your actions during mock
              assessments until it becomes second nature. The assessor cannot mark what they cannot
              observe or hear.
            </p>
          </ConceptBlock>

          <p className="text-[14.5px] leading-relaxed text-white">
            <strong>ST1426 link:</strong> understanding the marking criteria is itself a
            professional behaviour — it shows that you take your development seriously and prepare
            methodically for important milestones. This same approach will serve you throughout your
            career whenever you face assessments, audits, or professional reviews.
          </p>

          <SectionRule />

          <Scenario
            title="Doing the job right and still losing marks"

            situation={
              <>
                <p>
                  During a practical observation you diagnose and repair a control fault correctly
                  and the machine works. You score lower than you expected.
                </p>

                <p>
                  The feedback mentions that you did not explain your reasoning and did not record
                  what you found.
                </p>
              </>
            }

            whatToDo={
              <>
                <p>
                  Read the marking criteria before the assessment, not after. Assessors mark against
                  defined criteria, and several of them are usually about process and communication
                  rather than the technical outcome.
                </p>

                <p>
                  Narrate your reasoning as you work. "I am checking the interlock first because the
                  fault only appears after a guard has been opened" demonstrates diagnostic
                  thinking; doing the same check silently demonstrates only that you checked
                  something.
                </p>

                <p>
                  Treat the documentation as part of the task, not the paperwork afterwards. If the
                  criteria include recording findings, an unrecorded repair is an incomplete task
                  however well the machine runs.
                </p>

                <p>
                  Ask what the criteria are if you genuinely do not know. Wanting to understand how
                  you will be assessed is a reasonable question, not an attempt to game it.
                </p>
              </>
            }

            whyItMatters={
              <p>
                A practical assessment is not only testing whether you can fix the machine — your
                employer already knows that. It is testing whether you can show competence in a way
                somebody else can verify, which is a different skill and one that transfers directly
                to working under a permit, handing over to another shift, or defending a decision
                later. Fixing it silently and correctly is exactly what a good technician does on a
                bad site.
              </p>
            }
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Grades: fail, pass, distinction — no merit grade exists for MOET.',
              'Components: knowledge test + practical observation + professional discussion.',
              'Must pass all: failing any single component means failing overall.',
              'Automatic fail: unsafe isolation, bypassing safety devices, working live without authorisation.',
              'Distinction indicators: proactive safety, confident communication, exceptional workmanship, initiative.',
              'Grading descriptors are available from IfATE and your EPAO — review them thoroughly.',
              'Complete at least two mock assessments under realistic timed conditions.',
              'Communication: talk through your actions — the assessor cannot mark what they cannot hear.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Test Your Knowledge — Marking Criteria" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module7-section2-5')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Completing Work to Industry Standards
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module7-section3-1')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Building a Work-Based Portfolio
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule7Section2_6;
