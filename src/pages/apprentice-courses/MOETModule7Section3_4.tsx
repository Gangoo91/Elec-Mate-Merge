/**
 * MOET · Module 7 · Section 3 · Subsection 4 — Mapping Evidence to Standards
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
 * ⚠️ CORRECTED: the original page invented specific K/S/B code numbers in
 * several places — "K3", "S5", "S9", "B4", "K12", "K7" — in the "Example
 * Matrix Extract" table and the "Example Discussion Questions" list. The
 * conversion brief explicitly forbids writing K/S/B code numbers because the
 * published numbering is unverified. This is body prose, not quiz data, so
 * the fabricated numbers have been removed; the Knowledge/Skill/Behaviour
 * LETTER categories (K/S/B, already used elsewhere on this page as plain
 * category labels, e.g. "Knowledge (K)") and every descriptive area name
 * ("fault diagnosis", "commissioning", "continuous improvement", "testing
 * principles" etc.) are preserved unchanged.
 *
 * This is the last subsection of Section 3. The original page's "next"
 * button pointed back to the section hub because Module 7 Section 4 had not
 * been written yet. Section 4 (4.1 Teamwork and Collaboration) now exists in
 * the same module, so the next button below points there instead, matching
 * how every other section-to-section boundary in this course is handled.
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
  CommonMistake,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Mapping Evidence to Standards - MOET Module 7 Section 3.4';
const DESCRIPTION =
  'Creating and maintaining a KSB mapping matrix for the EPA portfolio: cross-referencing evidence to the ST1426 standard requirements, conducting gap analysis and ensuring comprehensive coverage.';

const quickCheckQuestions = [
  {
    id: 'mapping-purpose',
    question: 'What is the primary purpose of a KSB mapping matrix?',
    options: [
      'To record the dates and hours of every workplace activity for the off-the-job training log',
      'To list the qualifications you have achieved so the EPAO can verify the gateway requirements',
      'To cross-reference your evidence to the K, S and B of ST1426, ensuring full coverage',
      'To set out the order in which the EPA components will be assessed on the day of the assessment',
    ],
    correctIndex: 2,
    explanation:
      'The KSB mapping matrix is your evidence management tool. It links each piece of portfolio evidence to the specific requirements of the standard, makes it easy to identify gaps, and helps the assessor verify that all areas are covered. Without it, evidence is just a collection of documents — with it, the evidence tells a coherent story of competence.',
  },
  {
    id: 'mapping-cross-ref',
    question:
      'Why is it beneficial to cross-reference a single piece of evidence to multiple KSBs?',
    options: [
      'One real activity can genuinely demonstrate several competences at the same time',
      'It increases the total page count of the portfolio, which assessors view as a sign of a thorough apprentice',
      'It allows weaker evidence to be hidden among stronger items so the assessor is less likely to probe it',
      'It means each KSB only needs to be considered once, removing the need to review coverage again later',
    ],
    correctIndex: 0,
    explanation:
      'Real-world activities naturally involve multiple competences. A single maintenance task might demonstrate fault diagnosis knowledge (K), practical testing skills (S), safe working behaviours (B), and professional communication (B). Cross-referencing captures this reality and reduces the total volume of evidence needed while ensuring comprehensive coverage.',
  },
  {
    id: 'mapping-gaps',
    question: 'What should you do when your mapping matrix reveals a gap in evidence coverage?',
    options: [
      'Remove the uncovered KSB from your matrix so the portfolio appears to have complete coverage',
      'Plan activities with your employer and provider to generate evidence in good time',
      'Wait until the professional discussion and rely on answering questions verbally to cover the gap',
      'Duplicate an existing strong piece of evidence and map the copy against the uncovered KSB',
    ],
    correctIndex: 1,
    explanation:
      'Gaps identified early can be addressed through planned workplace activities, additional experience in different areas, or targeted training. Discuss gaps with your employer (to arrange relevant activities) and training provider (to ensure you have time). Discovering gaps too late leaves no time to generate genuine evidence.',
  },
  {
    id: 'mapping-review',
    question: 'How often should you review and update your KSB mapping matrix?',
    options: [
      'At every progress review and whenever new evidence is added, with a thorough review before the EPA',
      'Only once, at the very start of the apprenticeship, as the matrix is fixed and should not be altered afterwards',
      'Only in the final week before the EPA, once all the evidence has been gathered and is ready to submit',
      'Only when the assessor specifically requests an updated version during the professional discussion',
    ],
    correctIndex: 0,
    explanation:
      'The mapping matrix is a living document that should be updated continuously. Reviewing it at every progress meeting ensures gaps are identified early. Adding new evidence references as you collect them keeps the matrix current. A thorough review three months before the EPA gives enough time to address any remaining gaps.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'A KSB mapping matrix for the MOET EPA should list:',
    options: [
      'Only the knowledge requirements, since skills and behaviours are assessed solely during the practical observation',
      'Every K, S and B from ST1426, cross-referenced to the evidence for each one',
      'A summary of the apprentice’s off-the-job training hours, broken down by month across the apprenticeship',
      'The grade descriptors the assessor will apply, so the apprentice knows what is needed for a distinction',
    ],
    correctAnswer: 1,
    explanation:
      'The matrix must cover every K, S and B from the standard — not just the ones you feel strong on. This ensures complete coverage and reveals any areas that need attention. The assessor uses the matrix to verify your evidence addresses the full standard.',
  },
  {
    id: 2,
    question: 'The most effective way to organise a KSB mapping matrix is:',
    options: [
      'As a single long paragraph describing each activity in turn, so the assessor reads the story in sequence',
      'By grouping evidence purely by date, with the most recent items placed at the top of the document',
      'A grid with KSBs on one axis and evidence on the other, clearly marking each link',
      'By listing only the strongest evidence item for the apprenticeship, with all other items left unmapped',
    ],
    correctAnswer: 2,
    explanation:
      'A grid or matrix format (KSBs on one axis, evidence on the other) provides the clearest visual representation of coverage. Use tick marks, colours or reference codes to show links. This makes gaps immediately visible and helps the assessor navigate your portfolio efficiently.',
  },
  {
    id: 3,
    question: 'When mapping evidence to KSBs, you should consider:',
    options: [
      'Only the single KSB the activity was originally planned to demonstrate, ignoring any others it happens to cover',
      'Only the knowledge a piece of evidence shows, since skills and behaviours are mapped on a separate matrix',
      'Only the most recent KSBs, as evidence from earlier in the apprenticeship is considered out of date',
      'Every KSB it genuinely shows — the knowledge, skills and behaviours all together',
    ],
    correctAnswer: 3,
    explanation:
      'A maintenance activity typically involves knowledge (understanding the system), skills (practical techniques) and behaviours (safety, communication, professionalism) simultaneously. Mapping all genuine links maximises the evidence value and demonstrates integrated competence — you apply knowledge, skills and behaviours together in practice.',
  },
  {
    id: 4,
    question:
      'If your mapping matrix shows that one KSB has only a single weak piece of evidence, you should:',
    options: [
      'Strengthen it with extra evidence — another log entry, reflective account or witness statement',
      'Leave it as it is, because every KSB only needs one piece of evidence to be considered covered',
      'Re-map a strong piece of evidence from another KSB to fill the space, even if it does not relate to this one',
      'Note it as a gap for the assessor to raise during the professional discussion rather than acting on it now',
    ],
    correctAnswer: 0,
    explanation:
      'A single weak piece of evidence for a KSB is a risk. The assessor may probe this area in the professional discussion, and if you cannot demonstrate competence, it could affect your grade. Strengthening evidence through additional activity logs, reflective accounts or witness statements provides a more robust evidence base.',
  },
  {
    id: 5,
    question: 'The mapping matrix should be reviewed:',
    options: [
      'Only once the EPA has been completed, as a record of what was submitted for future reference',
      'Regularly throughout — at each progress review and as new evidence is added',
      'Only by the assessor, since the apprentice should not alter the matrix once evidence has been added',
      'Only if the EPAO returns the portfolio and asks for the coverage to be reworked before resubmission',
    ],
    correctAnswer: 1,
    explanation:
      'Regular review ensures your matrix stays current and identifies gaps early. Review it at each progress meeting with your training provider, update it as you add new evidence, and conduct a thorough review at least three months before the EPA to allow time to address any remaining gaps.',
  },
  {
    id: 6,
    question: 'Colour coding in a mapping matrix is useful for:',
    options: [
      'Making the portfolio look more professional, which directly increases the grade the assessor awards',
      'Distinguishing knowledge entries from skills and behaviour entries, which must never appear on the same matrix',
      'Giving a quick visual indication of evidence strength — green, amber and red',
      'Showing the chronological order in which evidence was collected across the apprenticeship period',
    ],
    correctAnswer: 2,
    explanation:
      'A traffic-light colour system makes the matrix a powerful planning tool: green for well-evidenced KSBs, amber for adequate but could be stronger, and red for gaps that need addressing. At a glance, you and your training provider can see overall readiness and focus attention on areas that need work. It also demonstrates a professional, organised approach to your apprenticeship.',
  },
  {
    id: 7,
    question: "Behaviours in the ST1426 standard (the 'B' in KSBs) are best evidenced through:",
    options: [
      'A signed statement from the apprentice simply claiming that they always behave professionally at work',
      'The qualification certificates achieved during the apprenticeship, which prove professional conduct',
      'Multiple-choice knowledge tests, which are the most reliable way to confirm behavioural competence',
      'Specific examples of behaviours shown in real activities — logged, witnessed or reflected on',
    ],
    correctAnswer: 3,
    explanation:
      'Behaviours must be demonstrated through actions, not just claimed. Evidence of teamwork, communication, safety awareness, initiative and professionalism comes from describing specific instances where you exhibited these behaviours. Witness statements from supervisors confirming observed behaviours are particularly effective.',
  },
  {
    id: 8,
    question: 'An evidence reference code system in the matrix helps by:',
    options: [
      'Letting you locate a specific document quickly via its unique code in the matrix',
      'Allowing the apprentice to leave the actual evidence out of the portfolio, since the code stands in for it',
      'Automatically grading each piece of evidence, so the assessor does not need to read it in full',
      'Hiding which KSBs are weakly evidenced by replacing descriptions with codes the assessor cannot interpret',
    ],
    correctAnswer: 0,
    explanation:
      'A simple reference system (e.g., WL-01 for Work Log 1, RA-03 for Reflective Account 3, WS-02 for Witness Statement 2) enables both you and the assessor to quickly locate the actual evidence from the matrix. It demonstrates organisation and professionalism.',
  },
  {
    id: 9,
    question:
      'If an activity demonstrates a skill (S) but you are unsure whether it also demonstrates the related knowledge (K), you should:',
    options: [
      'Map it to the knowledge requirement anyway, since any skill must rely on some related knowledge',
      'Check whether the evidence explains the underpinning knowledge; if not, add that explanation',
      'Leave the knowledge requirement unmapped, because knowledge can only be evidenced by written tests',
      'Ask the assessor to decide during the professional discussion rather than mapping it yourself beforehand',
    ],
    correctAnswer: 1,
    explanation:
      'Knowledge is best evidenced when you can explain why you did something, not just what you did. If your evidence describes the practical activity but does not explain the underpinning knowledge, consider adding a reflective account or expanding the log entry to include the reasoning. This strengthens the evidence for both K and S.',
  },
  {
    id: 10,
    question: 'The final version of your mapping matrix before the EPA should:',
    options: [
      'Still contain several red gaps, as these give the assessor useful topics to explore in the discussion',
      'Cover only the KSBs the apprentice feels most confident about, leaving the weaker areas off the matrix',
      'Cover every KSB with strong evidence, use consistent codes, and be clearly presented',
      'List the evidence without any reference codes, so the assessor reads each document in full from the start',
    ],
    correctAnswer: 2,
    explanation:
      'The final matrix should be complete, accurate and well-presented. Every KSB should have at least one strong piece of evidence (ideally multiple). Reference codes should be consistent, and the format should allow the assessor to quickly verify coverage and locate specific evidence.',
  },
  {
    id: 11,
    question: 'During the professional discussion, the assessor may use your mapping matrix to:',
    options: [
      'Calculate the final grade automatically by counting the number of evidence items mapped to each KSB',
      'Add new evidence to your portfolio on your behalf where they feel a KSB needs more coverage',
      'Replace the professional discussion entirely, so that no spoken questions need to be asked',
      'Identify areas to probe — especially weaker KSBs — to verify your competence',
    ],
    correctAnswer: 3,
    explanation:
      'The assessor uses the matrix as a discussion planning tool. They may focus questions on areas where evidence is thinner, or ask you to expand on evidence that appears particularly interesting. Being prepared to discuss every mapped evidence item confidently is essential.',
  },
  {
    id: 12,
    question:
      'When starting your mapping matrix at the beginning of the apprenticeship, the most important first step is:',
    options: [
      'Listing every KSB from the official ST1426 plan to give you a framework to populate',
      'Gathering as many pieces of evidence as possible before deciding which KSBs they might relate to',
      'Writing the reflective accounts first, since these can be mapped to any KSB once they are finished',
      'Waiting for the training provider to supply a completed matrix that you can copy for your own portfolio',
    ],
    correctAnswer: 0,
    explanation:
      'Starting with the complete list of KSBs from the official ST1426 assessment plan creates your framework from day one. As you complete activities and gather evidence, you populate the matrix progressively. This approach means you always have a clear picture of which areas are covered and which still need attention, enabling strategic planning throughout the apprenticeship.',
  },
];

const faqs = [
  {
    question: 'Should I create the mapping matrix at the start or end of the apprenticeship?',
    answer:
      'Create a draft at the start listing all KSBs from the standard, then build it progressively as you gather evidence. Starting early means you always know where your gaps are and can plan activities to fill them. Leaving it to the end means you may discover gaps too late to address.',
  },
  {
    question:
      'My training provider uses an e-portfolio system with built-in mapping. Is that sufficient?',
    answer:
      'E-portfolio mapping tools are very useful and often align directly with the standard. Check that the system covers all KSBs in the ST1426 standard and that you can generate a clear overview showing coverage. If the system does not produce a clear matrix view, consider creating a supplementary mapping document.',
  },
  {
    question: 'How many pieces of evidence should I map to each KSB?',
    answer:
      'There is no fixed number, but aim for at least 2-3 pieces of evidence per KSB where possible. This provides redundancy — if one piece is weaker, the others compensate. Some KSBs may naturally have more evidence than others, and that is fine as long as every KSB has at least one strong piece.',
  },
  {
    question:
      'Can I map evidence to KSBs from different modules of the apprenticeship, or only Module 7?',
    answer:
      'Evidence from any stage of your apprenticeship can be mapped. In fact, evidence from earlier modules often demonstrates knowledge (K), while later activities demonstrate the application of that knowledge as skills (S). Cross-referencing across your entire apprenticeship experience shows development over time.',
  },
  {
    question: 'What if my EPAO uses different KSB numbering than the standard?',
    answer:
      'Always use the numbering from the official ST1426 apprenticeship standard as your primary reference. If your EPAO uses different codes, create a cross-reference between the two systems. Your training provider should be able to clarify any differences between the standard and EPAO-specific requirements.',
  },
];

const MOETModule7Section3_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 7 · Section 7.3 · Subsection 4"
        title="Mapping Evidence to Standards"
        backTo="/study-centre/apprentice/m-o-e-t-module7-section3"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Creating and maintaining a KSB mapping matrix for comprehensive EPA portfolio coverage.
          </p>

          <TLDR
            points={[
              'Tool: KSB mapping matrix linking evidence to standard.',
              'Coverage: every K, S and B in the ST1426 standard.',
              'Cross-referencing: one evidence item can map to multiple KSBs.',
              'Gap analysis: reveals areas needing more evidence.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Create a comprehensive KSB mapping matrix covering the full ST1426 standard',
              'Cross-reference evidence to multiple KSBs to maximise portfolio efficiency',
              'Conduct regular gap analysis to identify areas needing additional evidence',
              'Use colour coding and reference systems for clear, professional presentation',
              'Distinguish between knowledge, skills and behaviours in your evidence mapping',
              'Prepare your mapping matrix for assessor review and professional discussion',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="EPA assessment context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Assessor navigation:</strong> matrix helps assessor find evidence quickly.
              </li>
              <li>
                <strong>Discussion planning:</strong> assessor uses matrix to plan questions.
              </li>
              <li>
                <strong>Completeness:</strong> demonstrates all standard areas covered.
              </li>
              <li>
                <strong>ST1426:</strong> direct traceability to standard requirements.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>Understanding KSB mapping</ContentEyebrow>

          <ConceptBlock title="Understanding KSB mapping">
            <p>
              The KSB mapping matrix is the single most important organisational tool in your
              portfolio. It transforms a collection of documents into a structured demonstration of
              competence. Without mapping, even excellent evidence can be overlooked because the
              assessor cannot see how it links to the standard.
            </p>
          </ConceptBlock>

          <ConceptBlock title="The three components of KSBs">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Knowledge (K):</strong> what you understand — technical theory, regulations,
                standards, principles. Evidenced through explanations of why you did something, not
                just what you did.
              </li>
              <li>
                <strong>Skills (S):</strong> what you can do — practical abilities demonstrated
                through workplace activities. Evidenced through activity logs, witness statements
                and photographs showing competent performance.
              </li>
              <li>
                <strong>Behaviours (B):</strong> how you conduct yourself — professionalism, safety
                awareness, communication, teamwork. Evidenced through descriptions of your approach
                and conduct during activities, and confirmed by witness observations.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="All KSBs must be covered"
            whatHappens={
              <>
                The assessor will check that every KSB in the standard has been addressed. A single
                uncovered KSB could affect your grade or delay your assessment.
              </>
            }
            doInstead={
              <>Start mapping early so you have maximum time to fill any gaps that emerge.</>
            }
          />

          <p className="text-[14.5px] leading-relaxed text-white">
            <strong>Key point:</strong> the mapping matrix is your evidence of evidence. It is the
            document that ties everything together and proves to the assessor that your portfolio is
            complete, well-organised, and ready for the professional discussion.
          </p>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Building your mapping matrix</ContentEyebrow>

          <ConceptBlock title="Building your mapping matrix">
            <p>
              Creating an effective matrix involves listing every requirement from the standard,
              cataloguing your evidence, and then systematically linking the two. The format should
              make it easy to see coverage at a glance and quickly locate specific evidence.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Step-by-step matrix construction">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Step 1:</strong> list every KSB from the ST1426 standard — use the official
                assessment plan, not a summary.
              </li>
              <li>
                <strong>Step 2:</strong> create a reference system for your evidence (e.g., WL-01,
                RA-01, WS-01, PH-01).
              </li>
              <li>
                <strong>Step 3:</strong> for each piece of evidence, identify all KSBs it genuinely
                demonstrates.
              </li>
              <li>
                <strong>Step 4:</strong> enter the evidence references against each relevant KSB in
                the matrix.
              </li>
              <li>
                <strong>Step 5:</strong> apply colour coding — green for well-evidenced, amber for
                adequate, red for gaps.
              </li>
              <li>
                <strong>Step 6:</strong> create a brief description column noting what each evidence
                item shows for each KSB.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Example matrix extract">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Type</th>
                    <th className="py-2 pr-4 font-medium text-white">Requirement</th>
                    <th className="py-2 pr-4 font-medium text-white">Evidence</th>
                    <th className="py-2 font-medium text-white">Status</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Knowledge (K)</td>
                    <td className="py-2 pr-4">Electrical principles and theory</td>
                    <td className="py-2 pr-4">RA-01, WL-03, WL-07</td>
                    <td className="py-2 text-green-400">Strong</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Skill (S)</td>
                    <td className="py-2 pr-4">Fault diagnosis techniques</td>
                    <td className="py-2 pr-4">WL-04, WS-02, PH-03</td>
                    <td className="py-2 text-green-400">Strong</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Skill (S)</td>
                    <td className="py-2 pr-4">Commissioning activities</td>
                    <td className="py-2 pr-4">WL-08</td>
                    <td className="py-2 text-yellow-400">Adequate</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Behaviour (B)</td>
                    <td className="py-2 pr-4">Continuous improvement</td>
                    <td className="py-2 pr-4">--</td>
                    <td className="py-2 text-red-400">Gap</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              <strong>Key point:</strong> the matrix is a living document. Update it every time you
              add new evidence to your portfolio. A current, accurate matrix is one of the most
              powerful tools for EPA preparation.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Conducting gap analysis</ContentEyebrow>

          <ConceptBlock title="Conducting gap analysis">
            <p>
              Gap analysis is the process of reviewing your mapping matrix to identify KSBs that
              lack sufficient evidence. It should be conducted regularly — at least quarterly and at
              every progress review — with a comprehensive review at least three months before the
              EPA.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Conducting effective gap analysis">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Red gaps:</strong> KSBs with no evidence at all — these are your top
                priority. Plan specific activities to generate evidence.
              </li>
              <li>
                <strong>Amber areas:</strong> KSBs with only one piece of evidence or evidence that
                lacks detail — seek to strengthen with additional logs, reflective accounts or
                witness statements.
              </li>
              <li>
                <strong>Green areas:</strong> well-evidenced KSBs — ensure the evidence is still
                current and that you can discuss it confidently.
              </li>
              <li>
                <strong>Action planning:</strong> for each gap, agree specific actions with your
                employer and training provider, including deadlines.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Common behaviour gaps">
            <p>
              Behaviours (B) are often the hardest KSBs to evidence explicitly. Apprentices
              frequently forget to describe their professional conduct, communication approach and
              teamwork in activity logs. Review your entries — if they only describe technical
              actions without mentioning how you communicated, collaborated or demonstrated
              initiative, add reflective commentary to strengthen the behaviour evidence.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Gap analysis timeline">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Months 1-6:</strong> create initial matrix framework. Begin populating with
                early evidence. Identify which KSBs will be hardest to evidence given your
                workplace.
              </li>
              <li>
                <strong>Months 6-12:</strong> first formal gap analysis. Discuss coverage with
                training provider. Plan activities to address gaps in knowledge and skills areas.
              </li>
              <li>
                <strong>Months 12-18:</strong> quarterly gap reviews. Focus on behaviour evidence
                and cross-referencing. Seek witness statements for activities already completed.
              </li>
              <li>
                <strong>3 months before EPA:</strong> comprehensive review. All KSBs should have at
                least one piece of evidence. Final push to close remaining gaps.
              </li>
              <li>
                <strong>1 month before EPA:</strong> final check. Matrix should be complete. Focus
                shifts to preparing to discuss evidence confidently.
              </li>
            </ul>
            <p>
              <strong>Key point:</strong> gap analysis is only useful if you act on the findings.
              Identifying a gap three months before the EPA gives you time to address it.
              Identifying it three days before does not.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Preparing your matrix for the assessor</ContentEyebrow>

          <ConceptBlock title="Preparing your matrix for the assessor">
            <p>
              The final version of your mapping matrix should be clear, complete and easy to
              navigate. The assessor will use it as their primary tool for reviewing your portfolio
              and planning the professional discussion, so presentation matters.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Final matrix checklist">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Every KSB from the ST1426 standard is listed.</li>
              <li>Every KSB has at least one piece of evidence mapped against it.</li>
              <li>
                Evidence reference codes are consistent and match the actual portfolio documents.
              </li>
              <li>Brief descriptions explain what each evidence item demonstrates for each KSB.</li>
              <li>The matrix is clearly formatted and easy to read (printed or on screen).</li>
              <li>You can locate every referenced evidence item quickly when asked.</li>
              <li>You can discuss every piece of evidence confidently and in detail.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Evidence reference code system"
            onSite="The mapping matrix is the navigational tool for your entire portfolio. A well-constructed matrix demonstrates not just that you have gathered evidence, but that you understand the standard's requirements and can organise your evidence to meet them — itself a demonstration of professional competence."
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Prefix</th>
                    <th className="py-2 pr-4 font-medium text-white">Evidence type</th>
                    <th className="py-2 font-medium text-white">Example</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">WL</td>
                    <td className="py-2 pr-4">Work Log / Activity Log</td>
                    <td className="py-2">WL-01, WL-02, WL-03...</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">RA</td>
                    <td className="py-2 pr-4">Reflective Account</td>
                    <td className="py-2">RA-01, RA-02, RA-03...</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">WS</td>
                    <td className="py-2 pr-4">Witness Statement</td>
                    <td className="py-2">WS-01, WS-02, WS-03...</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">PH</td>
                    <td className="py-2 pr-4">Photographic Evidence</td>
                    <td className="py-2">PH-01, PH-02, PH-03...</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">CT</td>
                    <td className="py-2 pr-4">Certificate / Qualification</td>
                    <td className="py-2">CT-01, CT-02, CT-03...</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Using your matrix in the professional discussion</ContentEyebrow>

          <ConceptBlock title="Using your matrix in the professional discussion">
            <p>
              The mapping matrix does not just serve as a preparation tool — it plays an active role
              during the professional discussion itself. The assessor will have reviewed your matrix
              before the discussion and will use it to plan their questioning strategy, focusing on
              areas where they need to verify competence.
            </p>
          </ConceptBlock>

          <ConceptBlock title="How the assessor uses your matrix">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Identifying discussion topics:</strong> the assessor selects activities from
                your matrix that cover multiple KSBs, enabling efficient evidence verification.
              </li>
              <li>
                <strong>Probing weaker areas:</strong> KSBs with fewer evidence references may
                receive more detailed questioning to confirm competence.
              </li>
              <li>
                <strong>Verifying cross-references:</strong> the assessor may ask you to explain how
                a single activity demonstrates multiple KSBs to confirm genuine understanding.
              </li>
              <li>
                <strong>Checking authenticity:</strong> questions about mapped evidence test whether
                you genuinely performed the activities described, not just documented them.
              </li>
              <li>
                <strong>Distinguishing pass from distinction:</strong> deeper follow-up questions on
                mapped evidence assess whether your understanding goes beyond competent to
                exceptional.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Example discussion questions triggered by the matrix">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                &quot;I can see you have mapped WL-04 to both a skill (fault diagnosis) and a
                knowledge point (testing principles). Can you explain how that activity demonstrates
                both?&quot;
              </li>
              <li>
                &quot;Your matrix shows the continuous improvement behaviour is evidenced by RA-02.
                Tell me about the improvement you suggested and what happened as a result.&quot;
              </li>
              <li>
                &quot;I notice the commissioning skill has only one piece of evidence. Can you
                describe any other commissioning experience you have had?&quot;
              </li>
              <li>
                &quot;Your evidence for that knowledge requirement comes from a witness statement.
                Can you expand on the underpinning knowledge that activity required?&quot;
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Preparing for matrix-based questions">
            <p>
              Before the professional discussion, review every entry in your matrix and make sure
              you can explain: what the evidence is, how the activity demonstrates the mapped
              KSB(s), the underpinning knowledge behind your actions, what you would do differently
              with the benefit of experience, and how the activity demonstrates professional
              behaviours. If you cannot confidently discuss a mapped item, either strengthen the
              evidence or prepare additional talking points.
            </p>
            <p>
              <strong>Key point:</strong> your mapping matrix is your navigation chart for the
              professional discussion. Know it thoroughly — every reference, every cross-link, every
              KSB. The assessor will use it as their guide, so make sure you can follow the same map
              with confidence.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'Start early: create the matrix framework from day one using the official ST1426 standard.',
              'Cover everything: list every K, S and B — no exceptions.',
              'Cross-reference: map each evidence item to all KSBs it genuinely demonstrates.',
              'Reference codes: use consistent codes (WL-01, RA-01, WS-01, PH-01) for easy navigation.',
              'Colour code: green = strong, amber = adequate, red = gap needing attention.',
              'Review regularly: update at every progress meeting and when adding new evidence.',
              'Gap analysis: conduct formal review at 6 months, 12 months, and 3 months before EPA.',
              'Discussion prep: be ready to discuss every mapped evidence item confidently and in detail.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Test Your Knowledge — Evidence Mapping" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module7-section3-3')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Logging On-the-Job Activities
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module7-section4-1')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Teamwork and Collaboration
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule7Section3_4;
