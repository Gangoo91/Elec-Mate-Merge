/**
 * MOET · Module 7 · Section 3 · Subsection 1 — Building a Work-Based Portfolio
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
  CommonMistake,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
  VideoCard,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Building a Work-Based Portfolio - MOET Module 7 Section 3.1';
const DESCRIPTION =
  'Structuring and organising a comprehensive work-based evidence portfolio for the EPA professional discussion: what to include, how to organise, quality of evidence and linking to KSBs under ST1426.';

const quickCheckQuestions = [
  {
    id: 'portfolio-purpose',
    question: 'What is the primary purpose of the work-based portfolio in the EPA?',
    options: [
      'To provide structured evidence of your workplace learning and competence, supporting the professional discussion',
      'To replace the need for any practical observation or knowledge test in the assessment',
      'To record the hours you have worked so your employer can calculate your wages',
      'To serve as a personal diary that the assessor is not permitted to read',
    ],
    correctIndex: 0,
    explanation:
      'The portfolio is the evidence base for the professional discussion. It demonstrates that you have developed the required knowledge, skills and behaviours through real workplace experience. The assessor reviews your portfolio before the discussion and uses it to structure their questions.',
  },
  {
    id: 'evidence-quality',
    question: "What makes a piece of portfolio evidence 'good quality'?",
    options: [
      'It covers as many activities as possible in the shortest possible description',
      "It is specific, relevant to the standard's KSBs, clearly described, and demonstrates genuine competence through real workplace activities",
      'It is written by your supervisor rather than by you, to ensure objectivity',
      'It consists mainly of attendance certificates from training courses you have completed',
    ],
    correctIndex: 1,
    explanation:
      'Quality evidence is specific (describes a real activity), relevant (links to specific KSBs in the standard), clearly described (the assessor can understand what you did and why), and authentic (genuinely your own work). A single well-described maintenance activity can provide evidence for multiple KSBs.',
  },
  {
    id: 'organisation-method',
    question: 'How should portfolio evidence be organised for maximum effectiveness?',
    options: [
      'In strict chronological order of when each activity was carried out',
      'Grouped by the type of document, such as all photographs together',
      'Alphabetically by the name of the supervisor who witnessed each activity',
      'Mapped to the KSBs of the apprenticeship standard, with clear cross-references showing which evidence supports which requirement',
    ],
    correctIndex: 3,
    explanation:
      'Mapping evidence to KSBs is the most effective organisation method. It allows the assessor to quickly see that all requirements are covered and makes the professional discussion more focused. Use a mapping document or matrix that cross-references each piece of evidence to the specific KSBs it demonstrates.',
  },
  {
    id: 'reflective-account',
    question:
      'What is the most important element that elevates a reflective account above a simple activity description?',
    options: [
      'Including as much technical detail about the equipment as possible',
      'Listing every tool and instrument that was used during the task',
      'Including analysis of why you made specific decisions, what you learned, and how the experience links to your professional development',
      'Describing the activity in the third person to sound more professional',
    ],
    correctIndex: 2,
    explanation:
      "Reflection transforms a description into evidence of learning. Explaining why you chose a particular approach, what you would do differently next time, and how the experience links to the standard's KSBs demonstrates critical thinking and professional growth — exactly what the assessor is looking for in the professional discussion.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'The work-based portfolio for the MOET EPA should contain:',
    options: [
      'A single detailed report on the most complex job you completed during the apprenticeship',
      'A range of evidence from real workplace activities demonstrating knowledge, skills and behaviours mapped to the apprenticeship standard',
      'Copies of all the theory test papers you sat at college during the programme',
      'A written statement from your employer confirming you have completed your hours',
    ],
    correctAnswer: 1,
    explanation:
      'The portfolio should contain diverse evidence from genuine workplace activities: work logs, maintenance reports, witness statements, photographs, project summaries, risk assessments, and reflective accounts — all mapped to the specific KSBs in the ST1426 standard.',
  },
  {
    id: 2,
    question: 'A KSB mapping matrix in your portfolio is used to:',
    options: [
      'Record the dates and times you worked so your employer can verify your attendance',
      'Rank your pieces of evidence from strongest to weakest for the assessor to read in order',
      'Show which evidence demonstrates which knowledge, skills and behaviour requirements of the standard',
      'List the qualifications you must complete before you are allowed to sit the EPA',
    ],
    correctAnswer: 2,
    explanation:
      'The KSB mapping matrix is a cross-reference document that links each piece of portfolio evidence to the specific requirements of the standard. It shows the assessor (and you) that all areas are covered and makes it easy to locate evidence during the professional discussion.',
  },
  {
    id: 3,
    question: 'When writing a reflective account for your portfolio, you should include:',
    options: [
      'Only a brief one-line summary, as assessors prefer the shortest possible accounts',
      'A list of every regulation number relevant to the task, without describing what you did',
      'The opinions of your colleagues about the task rather than your own actions and reasoning',
      'What the situation was, what you did, why you did it, what you learned, and how it links to the standard',
    ],
    correctAnswer: 3,
    explanation:
      'A reflective account follows the STAR format (Situation, Task, Action, Result) plus reflection. Describe the context, your specific actions, the reasoning behind your decisions, the outcome, and what you learned. This demonstrates deeper understanding than simply listing activities.',
  },
  {
    id: 4,
    question: 'Witness statements in the portfolio provide:',
    options: [
      'Third-party confirmation of your competence from someone who observed your work, such as a supervisor or qualified colleague',
      'A guarantee of a distinction grade, since a witnessed task cannot be questioned by the assessor',
      'A substitute for the professional discussion, removing the need to explain your evidence',
      'Written confirmation from a family member that you attended work on the stated dates',
    ],
    correctAnswer: 0,
    explanation:
      'Witness statements are valuable because they provide independent verification of your competence. A supervisor or qualified colleague confirms they observed you performing specific tasks competently. They should be specific about what was observed, when, and the standard of work demonstrated.',
  },
  {
    id: 5,
    question: 'Photographs included in the portfolio should:',
    options: [
      'Be included in large numbers without captions, since quantity is what the assessor counts',
      'Be annotated to explain what they show, be clearly dated, and demonstrate specific competences such as workmanship quality, safe working practices or completed installations',
      'Show only the finished installation, never the stages of work or the safe isolation steps',
      'Be sourced from manufacturer brochures so the equipment appears in the best possible condition',
    ],
    correctAnswer: 1,
    explanation:
      'Portfolio photographs are evidence, not decoration. They should be annotated (what does this show? what KSB does it demonstrate?), dated, and clearly linked to a specific activity or competence. Before and after photographs of maintenance work are particularly effective evidence.',
  },
  {
    id: 6,
    question: 'The minimum portfolio evidence requirement is typically:',
    options: [
      'A single piece of evidence, provided it covers the most complex task you completed',
      'Set by your workplace supervisor, who decides how much evidence is enough for the EPA',
      'Defined by the EPAO in the EPA specification — check the specific requirements for your assessment organisation',
      'The same fixed number for every apprenticeship standard, regardless of the occupation',
    ],
    correctAnswer: 2,
    explanation:
      "Each EPAO specifies the minimum evidence requirements in their EPA specification. Typically this includes a certain number of work logs, witness statements, and other evidence types. Check your specific EPAO's requirements early in your apprenticeship so you have time to gather sufficient evidence.",
  },
  {
    id: 7,
    question: 'Evidence of safe working practices in the portfolio could include:',
    options: [
      'A signed declaration that you have never had an accident, with no supporting records',
      'A copy of the Electricity at Work Regulations 1989 printed out and filed in the portfolio',
      'A photograph of the site welfare facilities, since these prove the work was carried out safely',
      'Completed risk assessments, safe isolation records, permit to work documents, toolbox talk records, near-miss reports, and photographs showing PPE use',
    ],
    correctAnswer: 3,
    explanation:
      'Evidence of safe working should be specific and documented: completed risk assessments you contributed to, records of safe isolation procedures, permits to work you were involved with, toolbox talk attendance, near-miss or hazard reports, and photographic evidence of safe practices in action.',
  },
  {
    id: 8,
    question: 'If a piece of evidence demonstrates multiple KSBs, you should:',
    options: [
      'Cross-reference it to all relevant KSBs in your mapping matrix, maximising the value of each piece of evidence',
      'Map it to only one KSB to keep the matrix simple, even though it covers several',
      'Duplicate the evidence and submit a separate copy for each KSB it demonstrates',
      'Discard it, because evidence covering more than one KSB is considered unfocused',
    ],
    correctAnswer: 0,
    explanation:
      'One piece of evidence can legitimately demonstrate multiple KSBs. For example, a maintenance report might demonstrate fault diagnosis skills (S), safety knowledge (K), and professional communication (B). Cross-referencing maximises the value of your evidence and reduces the total volume needed.',
  },
  {
    id: 9,
    question: 'The portfolio should be completed:',
    options: [
      'In a single concentrated effort during the final week before the end-point assessment',
      'Progressively throughout the apprenticeship, with evidence gathered as activities occur',
      'Only after the knowledge test has been passed, as evidence before then does not count',
      'By your training provider on your behalf, using records of the courses you attended',
    ],
    correctAnswer: 1,
    explanation:
      'Building the portfolio progressively is essential. Evidence should be gathered as activities happen — it is much harder to reconstruct evidence months later. Set a regular schedule (e.g., weekly) to update your portfolio with recent activities, and review it with your training provider at regular intervals.',
  },
  {
    id: 10,
    question: 'During the professional discussion, the assessor will use your portfolio to:',
    options: [
      'Award the grade directly from the documents, without asking you to discuss any of it',
      'Count the number of pages and pieces of evidence to decide the overall grade',
      'Ask probing questions about your evidence, exploring your understanding, reasoning and ability to apply your learning to different situations',
      'Check your spelling and presentation, as the written quality determines the grade',
    ],
    correctAnswer: 2,
    explanation:
      'The portfolio is a springboard for discussion, not the assessment itself. The assessor will ask you to explain your evidence in detail: what did you do? why? what did you learn? what would you do differently? how does this link to the standard? Your ability to discuss your evidence confidently demonstrates genuine competence.',
  },
  {
    id: 11,
    question: 'Confidential information in portfolio evidence should be handled by:',
    options: [
      'Leaving all client names and addresses in place, as the assessor needs them to verify the work',
      'Excluding any job that involved a client entirely, even if it is your strongest evidence',
      'Asking the client to sign a release form so their full details can be published in the portfolio',
      'Redacting or anonymising sensitive information while retaining the evidence value — client names, addresses and commercially sensitive data should be removed',
    ],
    correctAnswer: 3,
    explanation:
      "You must protect confidentiality while still providing effective evidence. Redact client names, addresses, and commercially sensitive information. Anonymise references (e.g., 'Client A' or 'a commercial office building'). The assessor does not need to identify the specific client — they need to see your competence.",
  },
  {
    id: 12,
    question:
      'The difference between a portfolio that supports a pass and one that supports a distinction is:',
    options: [
      'A distinction portfolio demonstrates deeper reflection, broader range of evidence, clearer KSB mapping, and evidence of going beyond minimum requirements with initiative and professional growth',
      'A distinction portfolio is simply longer, containing far more pages than a pass portfolio',
      'A distinction portfolio uses more colourful presentation and professional binding than a pass one',
      'A distinction portfolio is the one submitted earliest, ahead of the EPA deadline',
    ],
    correctAnswer: 0,
    explanation:
      'A distinction-supporting portfolio demonstrates not just competence but excellence: deeper reflective accounts showing genuine learning, a broader range of evidence covering diverse activities, clear and comprehensive KSB mapping, and evidence of initiative, problem-solving and professional development beyond the minimum requirements.',
  },
];

const faqs = [
  {
    question: 'How many pieces of evidence do I need in my portfolio?',
    answer:
      "This depends on your EPAO's requirements, but typically 10-15 significant pieces of evidence are expected, covering all KSBs. Quality matters more than quantity — five well-described, well-mapped pieces of evidence are more effective than twenty superficial ones. Check your EPAO's specification for the exact minimum requirements.",
  },
  {
    question: 'Can I include evidence from my college or training provider, not just workplace?',
    answer:
      'The portfolio should primarily contain workplace evidence, as the professional discussion assesses your on-the-job competence. However, evidence from realistic work environments at college (workshop tasks, simulated maintenance activities) can supplement workplace evidence if needed. Discuss with your training provider what balance is appropriate.',
  },
  {
    question: 'What format should the portfolio be in — paper or digital?',
    answer:
      "Check your EPAO's requirements. Many now accept or prefer digital portfolios (e.g., OneFile, e-portfolios, or PDF collections) as they are easier to organise, update and share. If paper-based, use a ring binder with clear dividers and an index. Whichever format you use, ensure it is well-organised and easy to navigate.",
  },
  {
    question:
      'My workplace does not give me varied maintenance tasks. How do I gather diverse evidence?',
    answer:
      'Speak to your employer and training provider about accessing a wider range of activities. You may be able to shadow colleagues on different tasks, participate in planned maintenance shutdowns, or work in different areas of the business. If options are limited, focus on demonstrating depth of understanding on the activities you do complete, and use reflective accounts to explore how your skills would transfer to other contexts.',
  },
  {
    question: 'Should I include evidence of things that went wrong or only successes?',
    answer:
      'Including evidence of how you handled problems, learned from mistakes, or dealt with unexpected situations is actually very valuable. It demonstrates resilience, self-awareness, and professional growth — all positive behaviours assessed in the EPA. A reflective account of a challenging situation and what you learned from it can be powerful evidence of competence development.',
  },
];

const MOETModule7Section3_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 7 · Section 7.3 · Subsection 1"
        title="Building a Work-Based Portfolio"
        backTo="/study-centre/apprentice/m-o-e-t-module7-section3"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Structuring and organising comprehensive evidence to support your EPA professional
            discussion.
          </p>

          <TLDR
            points={[
              'Purpose: evidence base for professional discussion.',
              'Content: work logs, reports, photos, witness statements.',
              'Organisation: mapped to KSBs with cross-references.',
              'Quality: specific, relevant, authentic evidence.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Understand the purpose and role of the portfolio in the EPA process',
              'Select and create high-quality evidence from workplace activities',
              'Organise evidence effectively using KSB mapping matrices',
              'Write reflective accounts that demonstrate depth of understanding',
              'Build the portfolio progressively throughout your apprenticeship',
              'Prepare portfolio evidence that supports confident professional discussion',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="EPA assessment context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Professional discussion:</strong> portfolio drives the conversation.
              </li>
              <li>
                <strong>Coverage:</strong> must address all KSBs in the standard.
              </li>
              <li>
                <strong>Progressive:</strong> build throughout your apprenticeship.
              </li>
              <li>
                <strong>ST1426:</strong> maps directly to standard requirements.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>Portfolio purpose and structure</ContentEyebrow>

          <ConceptBlock title="Portfolio purpose and structure">
            <p>
              The work-based portfolio is not a separate assessment — it is the foundation for the
              professional discussion component of the EPA. It provides the evidence that you have
              developed the knowledge, skills and behaviours required by the ST1426 standard through
              genuine workplace experience. The assessor reviews your portfolio before the
              discussion and uses it to structure their questions.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Essential portfolio components">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>KSB mapping matrix:</strong> a cross-reference document linking evidence to
                standard requirements.
              </li>
              <li>
                <strong>Work activity logs:</strong> detailed records of significant maintenance
                activities you have completed.
              </li>
              <li>
                <strong>Reflective accounts:</strong> written reflections on key learning
                experiences using the STAR format.
              </li>
              <li>
                <strong>Witness statements:</strong> third-party confirmations of your competence
                from supervisors or colleagues.
              </li>
              <li>
                <strong>Supporting documents:</strong> photographs, completed forms, test results,
                risk assessments, reports.
              </li>
              <li>
                <strong>Training records:</strong> evidence of formal and informal learning
                completed during the apprenticeship.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Start early — do not leave it to the last minute"
            whatHappens={
              <>
                The most common portfolio problem is leaving evidence gathering too late. Activities
                completed months ago are difficult to document accurately — details are forgotten,
                photographs were not taken, and witnesses may not remember specifics.
              </>
            }
            doInstead={
              <>
                Start building your portfolio from the first week of your apprenticeship and update
                it regularly.
              </>
            }
          />

          <p className="text-[14.5px] leading-relaxed text-white">
            <strong>Key point:</strong> think of the portfolio as your professional story. It tells
            the assessor who you are as a technician, what you have learned, and how you have
            developed. Make it a story worth reading.
          </p>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Selecting and creating quality evidence</ContentEyebrow>

          <ConceptBlock title="Selecting and creating quality evidence">
            <p>
              Not all workplace activities make equally effective portfolio evidence. The best
              evidence is specific, demonstrates genuine competence, and clearly links to the
              standard&apos;s requirements. Learning to identify and capture good evidence is a
              skill in itself.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Types of evidence and their effectiveness">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Evidence type</th>
                    <th className="py-2 pr-4 font-medium text-white">What it demonstrates</th>
                    <th className="py-2 font-medium text-white">Effectiveness</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Reflective account</td>
                    <td className="py-2 pr-4">Understanding, reasoning, learning</td>
                    <td className="py-2">Very high — shows depth</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Witness statement</td>
                    <td className="py-2 pr-4">Third-party verification of competence</td>
                    <td className="py-2">High — independent confirmation</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Annotated photographs</td>
                    <td className="py-2 pr-4">Workmanship quality, safe practices</td>
                    <td className="py-2">High — visual evidence</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Work activity log</td>
                    <td className="py-2 pr-4">Range and breadth of experience</td>
                    <td className="py-2">Medium — needs detail</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Certificates only</td>
                    <td className="py-2 pr-4">Attendance at training</td>
                    <td className="py-2">Low — does not show application</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Capturing evidence in real time">
            <p>
              The best time to capture evidence is during or immediately after the activity. Take
              photographs before, during and after maintenance tasks. Note down test readings,
              component details, and your reasoning while it is fresh. Ask your supervisor for a
              witness statement within a few days. Evidence captured in real time is always more
              detailed and convincing than retrospective accounts written weeks later.
            </p>
            <p>
              <strong>Key point:</strong> quality over quantity. A well-written reflective account
              of a single maintenance task can demonstrate multiple KSBs more effectively than ten
              brief log entries without detail or reflection.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Writing reflective accounts</ContentEyebrow>

          <ConceptBlock title="Writing reflective accounts">
            <p>
              Reflective accounts are the most powerful form of portfolio evidence because they
              demonstrate not just what you did, but why you did it and what you learned. They show
              the assessor that you can think critically about your practice — a key professional
              behaviour.
            </p>
          </ConceptBlock>

          <ConceptBlock title="The STAR+R framework">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Situation:</strong> what was the context? Where were you working, what
                equipment, what was the task?
              </li>
              <li>
                <strong>Task:</strong> what specifically were you asked to do? What was the problem
                or objective?
              </li>
              <li>
                <strong>Action:</strong> what did you actually do, step by step? What decisions did
                you make and why?
              </li>
              <li>
                <strong>Result:</strong> what was the outcome? Was the task successful? What were
                the test results?
              </li>
              <li>
                <strong>Reflection:</strong> what did you learn? What would you do differently? How
                does this link to the standard?
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Example reflective account structure">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Section</th>
                    <th className="py-2 pr-4 font-medium text-white">Content</th>
                    <th className="py-2 font-medium text-white">KSBs demonstrated</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Situation</td>
                    <td className="py-2 pr-4">
                      AHU-3 supply fan tripping on thermal overload intermittently
                    </td>
                    <td className="py-2">Context setting</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Task</td>
                    <td className="py-2 pr-4">Diagnose and repair the fault under supervision</td>
                    <td className="py-2">K — fault diagnosis knowledge</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Action</td>
                    <td className="py-2 pr-4">Safe isolation, IR testing, current measurements</td>
                    <td className="py-2">S — testing skills, B — safety</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Result</td>
                    <td className="py-2 pr-4">
                      Winding fault identified, motor replaced, verified operational
                    </td>
                    <td className="py-2">S — repair skills</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Reflection</td>
                    <td className="py-2 pr-4">
                      Learned systematic approach saves time vs guessing; would check vibration data
                      first next time
                    </td>
                    <td className="py-2">B — continuous improvement</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              <strong>Key point:</strong> aim for 3-5 detailed reflective accounts covering
              different types of maintenance activity: fault diagnosis, planned maintenance,
              component replacement, safety practice, and teamwork.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>KSB mapping and gap analysis</ContentEyebrow>

          <ConceptBlock title="KSB mapping and gap analysis">
            <p>
              The KSB mapping matrix is the backbone of your portfolio organisation. It provides a
              clear, at-a-glance view of which evidence covers which requirements, and — critically
              — reveals any gaps that need to be addressed before the EPA.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Creating your KSB mapping matrix">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>List all KSBs:</strong> copy every knowledge, skill and behaviour
                requirement from the ST1426 standard.
              </li>
              <li>
                <strong>Assign evidence:</strong> for each KSB, note which portfolio evidence
                demonstrates it.
              </li>
              <li>
                <strong>Identify gaps:</strong> any KSB without evidence needs attention — plan
                activities to fill the gap.
              </li>
              <li>
                <strong>Review regularly:</strong> update the matrix as you add new evidence
                throughout the apprenticeship.
              </li>
              <li>
                <strong>Discuss with your mentor:</strong> review the matrix with your training
                provider to confirm coverage.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Gap analysis timing">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Quarterly:</strong> quick review of coverage — are you building evidence
                across all areas?
              </li>
              <li>
                <strong>Six months before EPA:</strong> detailed gap analysis — identify all red and
                amber areas.
              </li>
              <li>
                <strong>Three months before EPA:</strong> focused evidence gathering for remaining
                gaps.
              </li>
              <li>
                <strong>One month before EPA:</strong> final review — ensure every KSB has strong
                evidence.
              </li>
            </ul>
            <p>
              <strong>Key point:</strong> a well-built mapping matrix gives you confidence going
              into the professional discussion because you know your evidence covers all
              requirements and you can talk about each piece in detail.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Preparing your portfolio for the professional discussion</ContentEyebrow>

          <ConceptBlock title="Preparing your portfolio for the professional discussion">
            <p>
              The portfolio is not assessed in isolation — it serves as the evidence base for the
              professional discussion. How you prepare to discuss your evidence is just as important
              as the evidence itself. The assessor will ask probing questions about your portfolio
              entries, so you need to know your own evidence inside out.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Discussion preparation checklist">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Review every piece of evidence:</strong> re-read each entry and refresh your
                memory of the details.
              </li>
              <li>
                <strong>Practise expanding on entries:</strong> for each piece, prepare to explain
                what, why, how, and what you learned.
              </li>
              <li>
                <strong>Anticipate probing questions:</strong> what would the assessor ask?
                &quot;Why did you choose that approach?&quot; &quot;What would you do
                differently?&quot;
              </li>
              <li>
                <strong>Link to the standard:</strong> be ready to explain how each activity
                demonstrates specific KSBs.
              </li>
              <li>
                <strong>Know your weak areas:</strong> if any evidence is thin, prepare a strong
                verbal explanation to compensate.
              </li>
              <li>
                <strong>Practise with your training provider:</strong> conduct mock professional
                discussions before the real assessment.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Final portfolio quality check">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                All KSBs covered in the mapping matrix with at least one strong piece of evidence.
              </li>
              <li>Evidence reference codes are consistent and match actual documents.</li>
              <li>Reflective accounts follow the STAR+R structure with genuine reflection.</li>
              <li>Witness statements are signed, dated and from credible observers.</li>
              <li>Photographs are annotated with dates, descriptions and KSB references.</li>
              <li>Confidential information has been appropriately redacted.</li>
              <li>The portfolio is well-organised and easy to navigate.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Authenticity matters">
            <p>
              The assessor is trained to identify genuine evidence from fabricated or inflated
              accounts. Write in your own words, be honest about your level of involvement
              (observed, assisted, or led), and include challenges as well as successes. Authentic,
              straightforward evidence of real learning is far more convincing than polished but
              generic descriptions. The professional discussion will quickly reveal whether you
              genuinely experienced what your portfolio claims.
            </p>
          </ConceptBlock>

          <p className="text-[14.5px] leading-relaxed text-white">
            <strong>ST1426 link:</strong> the portfolio directly supports the professional
            discussion component of the EPA. A well-built, well-mapped portfolio gives you
            confidence going into the discussion because you know your evidence covers all
            requirements and you can talk about each piece in detail.
          </p>

          <SectionRule />

          <VideoCard
            url="https://www.youtube.com/watch?v=HqkVPC9LYxw"

            title="Top 7 Rejected Evidence for NVQ"

            channel="Craig Wiltshire"

            duration="4:58"

            topic="Why portfolio evidence gets sent back"

            caption="Framed from the assessor side. Knowing what gets rejected is more useful than another list of what to collect, and it will save you re-doing work."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Portfolio purpose: evidence base for the professional discussion, not a standalone assessment.',
              'Key components: KSB matrix, activity logs, reflective accounts, witness statements, photographs.',
              'STAR+R format: Situation, Task, Action, Result, Reflection.',
              'Start early: build progressively from week one of your apprenticeship.',
              'Quality over quantity: five detailed, well-mapped entries beat twenty superficial ones.',
              'Cross-reference: one piece of evidence can map to multiple KSBs.',
              'Gap analysis: regular review against KSBs to identify missing evidence.',
              'Confidentiality: redact client names and commercially sensitive information.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Test Your Knowledge — Portfolio Building" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module7-section3')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Back to section
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Portfolio development and evidence gathering
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module7-section3-2')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Collecting Witness Statements
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule7Section3_1;
