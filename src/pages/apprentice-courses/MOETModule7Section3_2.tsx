/**
 * MOET · Module 7 · Section 3 · Subsection 2 — Collecting Witness Statements
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option. This subsection covers evidence and documentation for
 * the EPA professional discussion, which the following ST1426 statements
 * genuinely fit (reused from the Module 1/4 conversions where they were
 * verified — quoted rather than numbered, as the published K/S/B numbering
 * has not been verified against a primary source):
 *   Knowledge  · "Documentation requirements: documentation control,
 *                 auditable records."
 *   Skills     · "Record information."
 *              · "Produce or update documents. For example, handover notes
 *                 and reports."
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

const TITLE = 'Collecting Witness Statements - MOET Module 7 Section 3.2';
const DESCRIPTION =
  'Obtaining and formatting witness statements from supervisors and colleagues for the EPA portfolio: who to ask, what to include, formatting requirements and maximising evidence value under ST1426.';

const quickCheckQuestions = [
  {
    id: 'witness-who',
    question:
      'Who is the most appropriate person to provide a witness statement for your portfolio?',
    options: [
      'A family member who can vouch for your general character and work ethic',
      'A supervisor, qualified colleague or mentor who directly observed the activity',
      'A colleague who heard about the activity from someone else afterwards',
      'Any member of staff in the company, whether or not they saw the work',
    ],
    correctIndex: 1,
    explanation:
      'The witness must have directly observed the activity. Supervisors, qualified colleagues, and workplace mentors who watched you perform the task are the most credible witnesses. Their statement must describe what they specifically observed, not a general opinion of your character.',
  },
  {
    id: 'witness-content',
    question: 'A good witness statement should include:',
    options: [
      'The date, the activity observed, what the apprentice did, and the standard achieved',
      'A general statement of the apprentice’s character and timekeeping over the year',
      'The witness’s opinion of how the apprenticeship programme could be improved',
      'A list of the apprentice’s qualifications and previous job roles only',
    ],
    correctIndex: 0,
    explanation:
      "An effective witness statement is specific: it identifies the date, the activity, what the apprentice did (in observable terms), the standard achieved, and which KSBs were demonstrated. Generic statements like 'X is a good worker' have little evidence value for the EPA.",
  },
  {
    id: 'witness-timing',
    question: 'When should you request witness statements during your apprenticeship?',
    options: [
      'Only in the final week before your end-point assessment is booked',
      "As close to the activity as possible, while the details are fresh in both your mind and the witness's mind",
      'Only after you have completed the entire apprenticeship programme',
      'At the very start of the apprenticeship, before you have done the work',
    ],
    correctIndex: 1,
    explanation:
      "Request witness statements promptly after significant activities. The witness's recollection will be most accurate and detailed when the activity is recent. Waiting months or until the end of the apprenticeship results in vague, less useful statements.",
  },
  {
    id: 'witness-template',
    question:
      'Why is it helpful to provide a template or prompts when requesting a witness statement?',
    options: [
      'It allows you to write the statement yourself and have the witness simply sign it',
      'Most witnesses are unfamiliar with evidence requirements, so prompts guide a useful statement',
      'It guarantees the witness will give you a distinction-level assessment of your work',
      'It removes the need for the witness to have actually observed the activity at all',
    ],
    correctIndex: 1,
    explanation:
      'Supervisors and colleagues often do not know what a good witness statement looks like for an EPA. Providing a template with prompts (date, activity, what was observed, standard of work, KSBs) guides them to produce specific, useful evidence rather than a vague character reference. The statement must still be in their own words.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'A witness statement for the EPA portfolio must be:',
    options: [
      'Anonymous, to protect the identity of the person who observed the work',
      'Signed, dated, and from a named individual who directly observed the activity described',
      'Written by the apprentice and approved verbally by the witness',
      'Limited to a single sentence summarising the apprentice’s overall ability',
    ],
    correctAnswer: 1,
    explanation:
      'Witness statements must be attributable — signed by a named individual with their role/position identified, dated, and describing activities they personally observed. The assessor may verify statements, so they must be genuine and accurate.',
  },
  {
    id: 2,
    question: 'The ideal number of witness statements in a portfolio is:',
    options: [
      'Exactly one, from your direct line manager, covering your whole apprenticeship',
      'As many as possible from a single observer, to keep the evidence consistent',
      'Typically 3-6, from different observers covering different activities and KSBs',
      'At least twenty, regardless of how many different activities they describe',
    ],
    correctAnswer: 2,
    explanation:
      'Having 3-6 witness statements from different observers covering different types of activity provides good breadth of evidence. Multiple witnesses add credibility, and different activities demonstrate range. Quality and relevance matter more than a specific number.',
  },
  {
    id: 3,
    question: 'When asking a supervisor for a witness statement, you should:',
    options: [
      'Insist they complete it on the spot, regardless of how busy they are',
      'Write the statement yourself and ask them only to add their signature',
      'Ask them to comment on your character rather than a specific activity',
      'Explain its purpose, remind them of the activity, and provide a template',
    ],
    correctAnswer: 3,
    explanation:
      'Help your witness by explaining the purpose, reminding them of the specific activity (date, location, task), and providing a template showing what information is needed. This makes it easier for them and results in a more useful statement. Never write the statement yourself — it must be in their own words.',
  },
  {
    id: 4,
    question:
      "A witness statement that says 'John is always a reliable and hardworking apprentice' is:",
    options: [
      'Too vague — it describes no specific activity, competence or KSB link',
      'Ideal, because it gives a positive overall impression of the apprentice',
      'Acceptable, provided it is signed and dated by a named supervisor',
      'The strongest evidence, because it covers the whole apprenticeship at once',
    ],
    correctAnswer: 0,
    explanation:
      "General character references have minimal evidence value. The assessor needs specific, observable evidence: 'On [date], I observed John safely isolate a motor starter circuit, systematically diagnose a faulty contactor, and replace it to a professional standard.' This describes a real activity and demonstrates identifiable KSBs.",
  },
  {
    id: 5,
    question: 'Witness statements from different people are valuable because:',
    options: [
      'They allow you to submit far more pages of evidence than a single witness would',
      'They give multiple perspectives, cover different activities and add independent credibility',
      'They mean the assessor does not need to ask you any questions in the discussion',
      'They remove the requirement to keep your own work logs and reflective accounts',
    ],
    correctAnswer: 1,
    explanation:
      'Different witnesses bring different perspectives: a supervisor may comment on your safety practices, a qualified colleague on your technical skills, and a client on your communication. Multiple independent confirmations of competence are more convincing than multiple statements from one person.',
  },
  {
    id: 6,
    question: 'If a witness is reluctant to provide a statement, you should:',
    options: [
      'Write the statement on their behalf and forge their signature to save time',
      'Report them to your training provider for failing to support your EPA',
      'Explain its importance, offer a template, and discuss the activity to aid recall',
      'Abandon that area of evidence completely and hope it is not assessed',
    ],
    correctAnswer: 2,
    explanation:
      'Reluctance is often due to uncertainty about what to write. Making it easy — explaining the purpose, providing a template, and discussing the specific activity — usually resolves the issue. If they remain unwilling, seek an alternative witness who did observe the same or similar activity.',
  },
  {
    id: 7,
    question: 'Witness statements should be stored in your portfolio:',
    options: [
      'Loose at the back of the folder with no cross-reference to anything else',
      'Separately from the portfolio so the assessor cannot link them to your work',
      'Only as digital copies that are deleted once the activity is complete',
      'Linked to the relevant evidence and KSBs in your mapping matrix',
    ],
    correctAnswer: 3,
    explanation:
      'Witness statements should be integrated into your portfolio structure, cross-referenced to the relevant evidence and KSBs. This makes it easy for the assessor to find corroborating evidence when reviewing your portfolio and preparing discussion questions.',
  },
  {
    id: 8,
    question: "The witness's position or role should be recorded on the statement because:",
    options: [
      'It establishes their credibility to observe and evaluate the work described',
      'It is required so the EPAO can contact them to offer them a job',
      'It allows the assessor to grade the witness rather than the apprentice',
      'It replaces the need for the witness to sign and date the statement',
    ],
    correctAnswer: 0,
    explanation:
      "Recording the witness's role (e.g., 'Maintenance Supervisor', 'Senior Electrician', 'Engineering Manager') establishes their credibility as someone competent to judge the quality of the work observed. A statement from a qualified professional carries more weight than one from an unrelated colleague.",
  },
  {
    id: 9,
    question: 'A witness statement can cover:',
    options: [
      'Only a single activity, never more than one, regardless of what was observed',
      'One or more related activities the witness saw, each specifically described',
      'Activities the witness was told about but did not see for themselves',
      'Any activity in the standard, even those the apprentice has not yet attempted',
    ],
    correctAnswer: 1,
    explanation:
      'A witness statement can cover multiple activities if the witness observed all of them and each is specifically described. For example, a supervisor might describe observing you on three different maintenance tasks over a period, noting your development. Each activity should be clearly dated and described.',
  },
  {
    id: 10,
    question: 'After collecting a witness statement, you should:',
    options: [
      'File it away unread and assume it covers the evidence you need',
      'Edit the wording yourself to make the statement sound more impressive',
      'Review it against the intended KSBs, map it, and prepare to discuss the activity',
      'Submit it immediately to the EPAO ahead of the rest of your portfolio',
    ],
    correctAnswer: 2,
    explanation:
      'Review each statement to confirm it covers the intended evidence areas. If it is too vague, ask the witness if they can add more specific detail. Add it to your KSB mapping matrix and prepare to discuss the activity in detail during your professional discussion — the assessor will likely ask about it.',
  },
  {
    id: 11,
    question: 'A witness statement is most effective when it describes:',
    options: [
      'Your general attitude and enthusiasm, without reference to any specific task',
      'How long you have worked at the company and your overall attendance record',
      'The witness’s own qualifications and career history described in full detail',
      'The specific actions you took, the quality of your work and your competence',
    ],
    correctAnswer: 3,
    explanation:
      "Observable actions are the foundation of effective witness evidence: 'I observed the apprentice carry out safe isolation using the prove-test-prove sequence, diagnose the fault using insulation resistance testing, and replace the motor contactor with neat terminations and correct torque.' This is specific, verifiable evidence of competence.",
  },
  {
    id: 12,
    question:
      'When planning your witness statement collection across the apprenticeship, you should:',
    options: [
      'Identify key activities early, brief witnesses, and collect statements progressively',
      'Leave all collection until the final month and gather them in one rushed effort',
      'Use only one witness for everything to keep the wording consistent throughout',
      'Collect statements only for the activities you personally found easiest to perform',
    ],
    correctAnswer: 0,
    explanation:
      'A planned approach ensures comprehensive coverage: identify which upcoming activities should be witnessed, brief the witness in advance so they know what to observe, request the statement promptly afterwards, and build a collection from different witnesses over time. This produces a stronger evidence base than a last-minute collection effort.',
  },
];

const faqs = [
  {
    question: 'Can my training provider write a witness statement?',
    answer:
      'Yes, if they directly observed you performing a work activity (e.g., during a workplace visit or practical assessment). However, the portfolio should primarily contain witness statements from workplace observers — supervisors, qualified colleagues, and mentors who see your day-to-day performance.',
  },
  {
    question: 'What if my supervisor refuses to write a witness statement?',
    answer:
      'If your direct supervisor is unavailable or unwilling, identify other qualified persons who observed the activity: a senior electrician you worked with, a project manager, a client representative, or another supervisor. Explain the situation to your training provider — they can advise on alternatives and may be able to speak to your employer about the importance of supporting your EPA.',
  },
  {
    question: 'Is there a standard template for witness statements?',
    answer:
      "Your EPAO or training provider will usually provide a template. If not, a good witness statement includes: the witness's name and position, the date of the activity, a description of what the apprentice did, the standard of work observed, which KSBs were demonstrated, and the witness's signature and date of signing.",
  },
  {
    question: 'Can I use witness statements from previous employment?',
    answer:
      'If the activities were during your apprenticeship and are relevant to the standard, yes. The key criteria are: the witness observed the specific activity, the activity is relevant to the ST1426 KSBs, and the statement is specific and detailed enough to serve as evidence.',
  },
  {
    question: 'How long should a witness statement be?',
    answer:
      'There is no fixed length, but effective statements are typically half a page to one page. They should be long enough to describe the activity specifically and comment on the standard of work, but not so long that they become unfocused. Specific detail is more important than length.',
  },
];

const MOETModule7Section3_2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 7 · Section 7.3 · Subsection 2"
        title="Collecting Witness Statements"
        backTo="/study-centre/apprentice/m-o-e-t-module7-section3"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Obtaining specific, credible third-party evidence to strengthen your EPA portfolio.
          </p>

          <TLDR
            points={[
              'Who: supervisors, qualified colleagues who observed you.',
              'What: specific activities, observable competence, KSBs.',
              'When: as soon as possible after the activity.',
              'Format: named, signed, dated, role identified.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify appropriate witnesses for different types of workplace evidence',
              'Request and guide witnesses to produce specific, KSB-linked statements',
              'Time your requests to capture detailed, accurate recollections',
              'Integrate witness statements into your portfolio mapping structure',
              'Ensure statements meet EPAO formatting and authentication requirements',
              'Use witness evidence to strengthen your professional discussion preparation',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="EPA assessment context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Credibility:</strong> independent verification of competence.
              </li>
              <li>
                <strong>Range:</strong> multiple witnesses covering different activities.
              </li>
              <li>
                <strong>Specificity:</strong> observable actions, not general opinions.
              </li>
              <li>
                <strong>ST1426:</strong> supports professional discussion evidence.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>Who should provide witness statements</ContentEyebrow>

          <ConceptBlock title="Who should provide witness statements">
            <p>
              The credibility of a witness statement depends on who provides it. The ideal witness
              is someone who directly observed your work, has the technical competence to judge the
              quality of what they observed, and is recognised as a credible source within the
              industry.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Suitable witnesses by priority">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Direct supervisor:</strong> best source — observes your work regularly and
                can comment on development over time.
              </li>
              <li>
                <strong>Qualified electrician/technician:</strong> can assess technical competence
                and workmanship quality.
              </li>
              <li>
                <strong>Engineering manager:</strong> can comment on professional behaviours,
                communication and teamwork.
              </li>
              <li>
                <strong>Workplace mentor:</strong> can describe your learning journey and
                development.
              </li>
              <li>
                <strong>Client/customer representative:</strong> can comment on communication,
                professionalism and service quality.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Who should NOT provide statements"
            whatHappens={
              <>
                Witness statements from people who did not directly observe the activity (hearsay is
                not evidence), family members or personal friends (lack of objectivity), unqualified
                colleagues who cannot judge technical competence, or anyone who would not be
                considered a credible professional witness weaken the portfolio.
              </>
            }
            doInstead={
              <>
                The assessor evaluates the credibility of each witness as part of reviewing your
                portfolio — choose witnesses who genuinely observed the work and can judge it.
              </>
            }
          />

          <p className="text-[14.5px] leading-relaxed text-white">
            <strong>Key point:</strong> aim for at least 3 different witnesses across your
            portfolio. This demonstrates that multiple people have observed and can vouch for your
            competence, which is more convincing than a single person&apos;s opinion.
          </p>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>What makes an effective witness statement</ContentEyebrow>

          <ConceptBlock title="What makes an effective witness statement">
            <p>
              The difference between a useful witness statement and a useless one is specificity.
              The assessor needs to see evidence of observable competence, not a character
              reference. Guiding your witnesses on what to include makes all the difference.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Essential elements of a strong witness statement">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Date and location:</strong> when and where the activity took place.
              </li>
              <li>
                <strong>Activity description:</strong> what the task was and what equipment was
                involved.
              </li>
              <li>
                <strong>Observable actions:</strong> specific things the witness saw you do (e.g.,
                &quot;carried out safe isolation correctly&quot;).
              </li>
              <li>
                <strong>Quality assessment:</strong> the standard of work observed (e.g., &quot;neat
                terminations, correct torque applied&quot;).
              </li>
              <li>
                <strong>Professional behaviours:</strong> communication, safety awareness,
                initiative demonstrated.
              </li>
              <li>
                <strong>KSB reference:</strong> which areas of the standard the activity
                demonstrates (optional but helpful).
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Weak vs strong witness statements">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Aspect</th>
                    <th className="py-2 pr-4 font-medium text-white">Weak statement</th>
                    <th className="py-2 font-medium text-white">Strong statement</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Content</td>
                    <td className="py-2 pr-4">&quot;Good worker, always on time&quot;</td>
                    <td className="py-2">
                      &quot;On 15 Jan, I observed safe isolation of MCC-3...&quot;
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Specificity</td>
                    <td className="py-2 pr-4">General praise, no dates or details</td>
                    <td className="py-2">Named activity, dated, specific actions described</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Evidence value</td>
                    <td className="py-2 pr-4">Minimal — character reference only</td>
                    <td className="py-2">High — verifiable competence evidence</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">KSB coverage</td>
                    <td className="py-2 pr-4">None identifiable</td>
                    <td className="py-2">Multiple KSBs clearly demonstrated</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              <strong>Key point:</strong> a witness statement that describes one specific activity
              in detail is worth more than three vague statements about your general capabilities.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Timing and planning your requests</ContentEyebrow>

          <ConceptBlock title="Timing and planning your requests">
            <p>
              Timing is critical for effective witness statements. The best time to request one is
              within a few days of the activity, while details are fresh. Planning ahead —
              identifying which activities need witness evidence and who will provide it — avoids a
              last-minute rush.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Planning your witness evidence">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Identify target activities:</strong> plan which workplace activities you
                want witnessed and evidenced.
              </li>
              <li>
                <strong>Brief the witness in advance:</strong> let them know you would like a
                statement after the task.
              </li>
              <li>
                <strong>Request promptly:</strong> ask within a few days of the activity while it is
                fresh.
              </li>
              <li>
                <strong>Provide the template:</strong> give them a pre-formatted document with
                prompts.
              </li>
              <li>
                <strong>Follow up politely:</strong> if the statement has not been returned, follow
                up within a week.
              </li>
              <li>
                <strong>Review and file:</strong> check the statement covers the intended KSBs and
                file it in your portfolio.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Helping your witness write effectively">
            <p>
              Most supervisors and colleagues are not familiar with apprenticeship evidence
              requirements. Help them by: reminding them of the specific activity (date, location,
              what you were doing), providing a template with prompts, and explaining that specific
              observations are more useful than general comments. Make the process as easy as
              possible for them — busy professionals are more likely to provide a statement if it
              takes ten minutes rather than an hour.
            </p>
            <p>
              <strong>Key point:</strong> build witness statement collection into your regular
              apprenticeship routine. After any significant maintenance activity, ask yourself:
              &quot;Should I get a witness statement for this?&quot;
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Integrating statements into your portfolio</ContentEyebrow>

          <ConceptBlock title="Integrating statements into your portfolio">
            <p>
              Witness statements are most effective when they are integrated into your portfolio
              structure, cross-referenced to relevant evidence and KSBs. An isolated statement filed
              at the back of the folder loses much of its impact.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Integration steps">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Assign a reference code (e.g., WS-01, WS-02) matching your portfolio system.</li>
              <li>Cross-reference the statement to your KSB mapping matrix.</li>
              <li>
                Link it to related evidence (work log entry, photographs, reflective account).
              </li>
              <li>
                Ensure the activity described in the statement matches your own documentation.
              </li>
              <li>Prepare to discuss the witnessed activity in your professional discussion.</li>
              <li>
                Store the original (signed) securely and keep a copy in your working portfolio.
              </li>
            </ul>
            <p>
              <strong>Key point:</strong> witness statements corroborate your own evidence. When the
              assessor sees that your activity log, your reflective account, and an independent
              witness statement all describe the same activity consistently, the evidence is highly
              convincing.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Using witness evidence in the professional discussion</ContentEyebrow>

          <ConceptBlock title="Using witness evidence in the professional discussion">
            <p>
              During the professional discussion, the assessor may reference witness statements and
              ask you to expand on the activities described. Being prepared to discuss witnessed
              activities in detail demonstrates that the evidence is genuine and that you have deep
              understanding of your own practice.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Preparing to discuss witnessed activities">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Re-read each statement:</strong> refresh your memory of what the witness
                described.
              </li>
              <li>
                <strong>Prepare to add detail:</strong> the assessor may ask for more information
                than the statement contains.
              </li>
              <li>
                <strong>Explain your reasoning:</strong> be ready to discuss why you approached the
                task as you did.
              </li>
              <li>
                <strong>Connect to learning:</strong> describe what you learned from the experience.
              </li>
              <li>
                <strong>Link to standards:</strong> explain how the activity demonstrates specific
                KSBs.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Example discussion questions from witness evidence">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                &quot;Your supervisor mentions you carried out safe isolation. Can you talk me
                through the exact procedure you followed?&quot;
              </li>
              <li>
                &quot;The witness describes your fault diagnosis approach. What made you choose that
                method over alternatives?&quot;
              </li>
              <li>
                &quot;This statement mentions good communication with the production team. How did
                you explain the fault and repair to them?&quot;
              </li>
              <li>
                &quot;What would you do differently if you encountered the same fault again?&quot;
              </li>
            </ul>
          </ConceptBlock>

          <p className="text-[14.5px] leading-relaxed text-white">
            <strong>ST1426 link:</strong> witness statements provide independent verification of
            your workplace competence. During the professional discussion, the assessor may ask you
            to expand on activities described in witness statements — be prepared to discuss them in
            detail and with confidence.
          </p>

          <SectionRule />

          <Scenario
            title="A witness statement that proves nothing"

            situation={
              <>
                <p>
                  An apprentice submits a witness statement for a motor replacement. It reads: "I
                  confirm that [name] carried out this work to a good standard." It is signed and
                  dated by a supervisor.
                </p>

                <p>The assessor rejects it.</p>
              </>
            }

            whatToDo={
              <>
                <p>
                  Understand why it fails. It attests to a standard rather than describing what was
                  observed, so it gives the assessor nothing to map against a KSB. "To a good
                  standard" is an opinion; the evidence has to be an account.
                </p>

                <p>
                  Get the witness to describe what they actually saw you do: that you isolated and
                  proved dead before starting, that you checked the replacement against the
                  nameplate, that you took insulation resistance readings before reconnection, that
                  you tested for rotation before coupling the load.
                </p>

                <p>
                  Make sure the witness is competent to judge what they are attesting to, and that
                  the statement says who they are and in what capacity they observed it.
                </p>

                <p>
                  Tie it to a date, a location and a job reference so it can be cross-checked
                  against your own log and the plant records.
                </p>
              </>
            }

            whyItMatters={
              <p>
                The assessor is not questioning whether the work happened. They are asking which
                knowledge, skills and behaviours it demonstrates, and a statement with no observable
                detail cannot answer that. This is the most common reason portfolio evidence gets
                returned, and it costs weeks — the work is done and the witness has moved on, so the
                statement often cannot be rewritten with any authority.
              </p>
            }
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Who: supervisors, qualified colleagues, mentors who directly observed the activity.',
              'When: within days of the activity — do not wait months.',
              'What to include: date, activity, observable actions, quality assessment, KSBs demonstrated.',
              'Format: named witness, role stated, signed, dated.',
              'Number: aim for 3-6 from different observers covering different activities.',
              'Integration: cross-reference to KSB matrix and related portfolio evidence.',
              'Preparation: be ready to discuss every witnessed activity in detail.',
              'Template: provide prompts to help witnesses write specific, useful statements.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Test Your Knowledge — Witness Statements" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module7-section3-1')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Building a Work-Based Portfolio
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module7-section3-3')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Logging On-the-Job Activities
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule7Section3_2;
