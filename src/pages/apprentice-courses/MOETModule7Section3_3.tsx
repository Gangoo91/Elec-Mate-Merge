/**
 * MOET · Module 7 · Section 3 · Subsection 3 — Logging On-the-Job Activities
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
 * ⚠️ CORRECTED: the worked example table in "Writing effective log entries"
 * originally read "K12 fault diagnosis, S7 testing, B3 safety" — inventing
 * K/S/B code numbers, which the conversion brief explicitly forbids because
 * the published numbering is unverified. This is ordinary body prose, not
 * quiz data, so the codes have been removed and the descriptive KSB areas
 * kept: "fault diagnosis, testing, safety".
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

const TITLE = 'Logging On-the-Job Activities - MOET Module 7 Section 3.3';
const DESCRIPTION =
  'Recording workplace maintenance activities systematically for portfolio evidence: what to log, how to write effective entries, linking activities to KSBs and building a comprehensive record under ST1426.';

const quickCheckQuestions = [
  {
    id: 'log-purpose',
    question: 'What is the primary purpose of logging on-the-job activities for the EPA?',
    options: [
      'To provide a timesheet that records the hours you worked each day for payroll',
      'To list the tools and test instruments issued to you by your employer',
      'To record workplace activities that evidence your practical experience against ST1426',
      'To record only the qualifications and certificates you have already achieved',
    ],
    correctIndex: 2,
    explanation:
      'Activity logs create a chronological record of your practical experience. They show the assessor the breadth and depth of maintenance activities you have undertaken, providing evidence of your developing competence across the full range of KSBs required by the standard.',
  },
  {
    id: 'log-detail',
    question: 'What level of detail should a work activity log entry contain?',
    options: [
      'Only the date and a one-line note such as "carried out electrical work today"',
      'Date, location, equipment, task, methods, outcomes, safety measures and KSBs',
      'Only the name of the supervisor who signed off the work that day',
      'Only the job number from the employer system, with no further description',
    ],
    correctIndex: 1,
    explanation:
      'Effective log entries capture enough detail for the assessor to understand what you did, how you did it, and what you learned. Including the context (where, what equipment), your actions (methods, decisions), outcomes (results, test readings), safety measures, and KSB links transforms a simple diary entry into valuable portfolio evidence.',
  },
  {
    id: 'log-frequency',
    question: 'How often should you update your activity log?',
    options: [
      'Only once, at the very end of the apprenticeship before the assessment',
      'Only when your tutor or assessor specifically asks to see new evidence',
      'At least weekly, ideally after each significant activity while details are fresh',
      'Once a year, at the same time as your annual appraisal review',
    ],
    correctIndex: 2,
    explanation:
      'Regular logging — ideally after each significant activity or at least weekly — ensures details are captured accurately while they are fresh. Leaving it weeks or months means you forget important specifics: test readings, component values, the reasoning behind your decisions. These details are what make log entries valuable as evidence.',
  },
  {
    id: 'log-digital',
    question: 'What advantage do digital logging tools offer over paper-only activity logs?',
    options: [
      'They offer timestamps, photo attachments, GPS data and structured templates',
      'They automatically write your reflective accounts for you with no input required',
      'They guarantee the assessor will accept the evidence without any further review',
      'They remove the need to link any activity to the KSBs in the standard',
    ],
    correctIndex: 0,
    explanation:
      'Digital tools (e-portfolio platforms, note-taking apps, dedicated logging apps) streamline the recording process with auto-timestamps, the ability to attach photographs taken on site, GPS location data, and structured templates that prompt you for each required element. This makes logging quicker and more consistent. Always check your EPAO accepts digital evidence — most now do.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'An effective activity log entry for the EPA portfolio should include:',
    options: [
      'Just the date and the number of hours worked on that day',
      'Date, location, equipment, task description, methods used, outcomes, safety measures and KSB links',
      'Only the name of the customer and the address of the site',
      'A simple tick to confirm that some work was carried out',
    ],
    correctAnswer: 1,
    explanation:
      'A comprehensive log entry captures the full picture: when and where, what equipment was involved, what you did, how you did it, the outcome, safety considerations, and which KSBs it demonstrates. This level of detail turns a simple record into strong portfolio evidence.',
  },
  {
    id: 2,
    question: 'The benefit of logging activities regularly rather than retrospectively is:',
    options: [
      'It reduces the total number of entries you need, because regular logs can be much shorter',
      'It allows your supervisor to complete the entries on your behalf at the end of each month',
      'Details such as readings and reasoning are captured accurately while still fresh',
      'It means the entries no longer need to be linked to any of the KSBs in the standard',
    ],
    correctAnswer: 2,
    explanation:
      'Memory deteriorates rapidly. Within days you will forget specific test readings, the exact fault symptoms, which components you replaced, and the reasoning behind your approach. Recording these details promptly produces much more valuable evidence than vague retrospective accounts.',
  },
  {
    id: 3,
    question: 'When logging a fault diagnosis activity, you should record:',
    options: [
      'Only the make and model of the test instrument you used, as this proves your competence',
      'Only the time taken to find the fault, since speed is the main measure of a good diagnosis',
      'Only the final outcome, such as "fault found and repaired", with no detail of the process',
      'The symptoms, your approach, each test and result, the root cause, repair and verification',
    ],
    correctAnswer: 3,
    explanation:
      'Fault diagnosis is a key skill in the ST1426 standard. Recording the complete diagnostic journey — from initial symptoms through systematic testing to root cause identification and verification — demonstrates your methodical approach and technical reasoning, which are exactly what the assessor wants to see.',
  },
  {
    id: 4,
    question: 'Activity logs differ from reflective accounts in that:',
    options: [
      'Logs record what happened, while reflective accounts add why and what was learned',
      'Logs must be written by your supervisor, whereas reflective accounts must be written by you',
      'Logs are only required for distinction candidates, while reflective accounts are required for a pass',
      'Logs analyse what you learned, while reflective accounts simply list the facts of the activity',
    ],
    correctAnswer: 0,
    explanation:
      'Activity logs and reflective accounts serve different but complementary purposes. Logs capture the facts (what, when, where, how), while reflective accounts add deeper analysis (why, what was learned, what would you do differently). Together they provide both breadth of experience and depth of understanding.',
  },
  {
    id: 5,
    question: 'When logging safety measures taken during an activity, you should include:',
    options: [
      'Only the PPE you wore, as personal protective equipment covers all the safety requirements',
      'Specific measures: risk assessment, safe isolation, PPE, permits, and hazards controlled',
      'Only the hazards you encountered, leaving out the control measures you actually applied',
      'A general statement that you "worked safely" without describing any specific control measures',
    ],
    correctAnswer: 1,
    explanation:
      'Specific safety details demonstrate that safe working is embedded in your practice, not an afterthought. Recording that you completed a risk assessment, followed safe isolation (noting the lock-off point and proving dead procedure), wore appropriate PPE, and obtained permits shows the assessor that safety is integral to your working methods.',
  },
  {
    id: 6,
    question: 'Linking log entries to specific KSBs is important because:',
    options: [
      'It increases the number of log entries required, which the assessor counts towards your grade',
      'It allows you to skip the professional discussion, since the links already prove your competence',
      'It shows awareness of the standard and lets the assessor verify your coverage',
      'It is only needed for the knowledge test, where each question maps directly to a single KSB',
    ],
    correctAnswer: 2,
    explanation:
      'KSB linking serves two purposes: it helps you track your own coverage of the standard (identifying gaps early), and it helps the assessor quickly verify that your experience addresses all requirements. A log with clear KSB references is much more useful as evidence than one without.',
  },
  {
    id: 7,
    question:
      'If you complete a routine task that you have done many times before, should you log it?',
    options: [
      'No — once a task has been logged once, repeating it adds nothing and should never be recorded again',
      'No — routine tasks are too basic to count as portfolio evidence under any circumstances',
      'Only if your supervisor specifically asks you to log that particular routine task on the day',
      'Yes, if it covers a new KSB or shows improvement over your earlier attempts',
    ],
    correctAnswer: 3,
    explanation:
      'Routine tasks can still provide valuable evidence, particularly if they demonstrate KSBs you have not yet covered, or if you can show how your approach has developed over time. Comparing an early attempt with a recent one demonstrates professional growth and increasing competence.',
  },
  {
    id: 8,
    question: 'Test readings and measurement values recorded in your log:',
    options: [
      'Provide verifiable evidence that you understand parameters and can interpret results',
      'Are best left out of the log because they take up too much space in the entry',
      'Should be recorded only if the readings fall outside the acceptable range',
      'Are only useful to the assessor if they are converted into a graph or chart',
    ],
    correctAnswer: 0,
    explanation:
      'Recording specific readings (insulation resistance values, earth fault loop impedance, RCD trip times, motor current draws) demonstrates that you understand what you are measuring, what the acceptable range is, and how to interpret the results. This is powerful evidence of technical knowledge and practical skill.',
  },
  {
    id: 9,
    question: 'A gap analysis of your activity log should be carried out:',
    options: [
      'Only once, in the final week before the EPA, so the picture is as complete as possible',
      'Regularly throughout the apprenticeship, to spot under-evidenced KSBs in good time',
      'Only by your assessor, who is the only person permitted to review KSB coverage',
      'Never, because every workplace activity automatically covers all of the KSBs equally',
    ],
    correctAnswer: 1,
    explanation:
      'Regular gap analysis — reviewing which KSBs have strong evidence and which need more — is essential for portfolio planning. If you identify a gap with six months remaining, you have time to seek appropriate activities. Discovering gaps in the final weeks leaves no time to address them.',
  },
  {
    id: 10,
    question: 'Digital logging tools and apps can help with activity recording by:',
    options: [
      'Writing your reflective accounts automatically so you do not need to add any of your own analysis',
      'Guaranteeing that the assessor accepts your evidence without reviewing the content',
      'Enabling photographs, timestamps, GPS location data and structured templates that make logging faster and more consistent',
      'Removing the need to link any activity to the KSBs, as the app maps everything for you',
    ],
    correctAnswer: 2,
    explanation:
      'Digital tools (e-portfolio platforms, logging apps) can streamline the process: auto-timestamps, photo attachments, GPS location data, and structured templates ensure consistency and make logging quicker. Check your EPAO accepts digital evidence — most now do. The key is still the quality of the content, regardless of format.',
  },
  {
    id: 11,
    question: 'When describing the outcome of a maintenance activity in your log, you should:',
    options: [
      'Record only whether the job was completed on time, as this is the outcome the assessor checks',
      'Leave the outcome blank, since the activity description already implies a successful result',
      'State simply that the work was "completed", with no test results or verification detail',
      'Describe the result: equipment returned to service, test results, and any follow-up',
    ],
    correctAnswer: 3,
    explanation:
      'Specific outcomes demonstrate that you complete work to a professional standard: equipment tested and confirmed operational, specific readings within acceptable parameters, customer informed, documentation completed. This evidence of thorough completion is a key professional behaviour assessed in the EPA.',
  },
  {
    id: 12,
    question:
      'When logging a collaborative activity where you worked as part of a team, you should:',
    options: [
      'Describe your role, the communication involved, and the behaviours it demonstrates',
      'Record only the names of everyone in the team, as listing the team members is sufficient evidence',
      'Claim the whole task as your own work, since the assessor only credits individual achievement',
      'Avoid logging it at all, because team activities cannot demonstrate any individual KSBs',
    ],
    correctAnswer: 0,
    explanation:
      'Collaborative activities are valuable evidence for professional behaviours (teamwork, communication, responsibility) which are often harder to evidence than technical knowledge and skills. Describing your specific contribution, how you communicated with team members, and what you learned from the collaboration demonstrates important KSBs that solo activities may not cover.',
  },
];

const faqs = [
  {
    question: 'What is the difference between an activity log and a timesheet?',
    answer:
      'A timesheet records hours worked for payroll purposes. An activity log records what you actually did during those hours — the specific tasks, methods, equipment, outcomes and learning. Your activity log is a professional development record, not an attendance record. It should contain enough technical detail to serve as evidence of your growing competence.',
  },
  {
    question: 'Should I log activities where I only observed or assisted, rather than leading?',
    answer:
      'Yes, particularly early in your apprenticeship. Observing and assisting are valid learning activities. Log what you observed, what you learned, and which KSBs it relates to. As your apprenticeship progresses, your log should show a transition from observing to assisting to leading — this progression demonstrates your development.',
  },
  {
    question: 'How long should each log entry be?',
    answer:
      'There is no fixed length, but aim for enough detail that someone who was not present could understand what you did and why. A paragraph (100-200 words) for routine tasks, or half a page for complex activities, is typically sufficient. The key is specific, relevant detail rather than padding.',
  },
  {
    question: "Can I use my employer's job management system as my activity log?",
    answer:
      "You can use employer records as supporting evidence, but your activity log should contain your own reflection and KSB mapping that a job management system would not include. You might reference job numbers from the employer's system but add your own description of what you did, why, and what you learned.",
  },
  {
    question: 'What if I forget to log an activity and several weeks have passed?',
    answer:
      'Log it anyway, but note that it is a retrospective entry. Use any available prompts to aid your memory: job sheets, photographs, emails, calendar entries. Include as much detail as you can recall. However, this highlights why regular logging is important — a retrospective entry will inevitably lack the specific detail that makes evidence compelling.',
  },
];

const MOETModule7Section3_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 7 · Section 7.3 · Subsection 3"
        title="Logging On-the-Job Activities"
        backTo="/study-centre/apprentice/m-o-e-t-module7-section3"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Building a detailed, dated record of workplace experience to evidence your developing
            competence.
          </p>

          <TLDR
            points={[
              'Purpose: chronological record of practical experience.',
              'Content: date, task, methods, outcomes, safety, KSBs.',
              'Frequency: after each significant activity or weekly.',
              'Value: demonstrates breadth and depth of competence.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Write detailed, effective activity log entries that serve as strong portfolio evidence',
              'Capture technical details including test readings, methods and component information',
              'Link each activity to specific KSBs in the ST1426 standard',
              'Maintain a consistent logging routine throughout your apprenticeship',
              'Use activity logs to identify gaps in your evidence coverage',
              'Distinguish between activity logs and reflective accounts for maximum portfolio value',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="EPA assessment context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Portfolio evidence:</strong> logs form the backbone of your portfolio.
              </li>
              <li>
                <strong>Discussion prompts:</strong> assessor may ask about logged activities.
              </li>
              <li>
                <strong>Gap identification:</strong> reveals KSBs needing more evidence.
              </li>
              <li>
                <strong>ST1426:</strong> demonstrates full range of required experience.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>Why activity logging matters</ContentEyebrow>

          <ConceptBlock title="Why activity logging matters">
            <p>
              Your activity log is the backbone of your portfolio. While reflective accounts provide
              depth and witness statements provide independent verification, it is the activity log
              that demonstrates the breadth of your experience. It shows the assessor that you have
              been exposed to the full range of maintenance activities required by the ST1426
              standard.
            </p>
          </ConceptBlock>

          <ConceptBlock title="What the assessor looks for in activity logs">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Range:</strong> evidence of different types of maintenance activity (fault
                diagnosis, planned maintenance, installation, commissioning, testing).
              </li>
              <li>
                <strong>Progression:</strong> development from simple tasks to more complex work
                over the apprenticeship period.
              </li>
              <li>
                <strong>Technical detail:</strong> specific methods, readings, components and
                outcomes that demonstrate real understanding.
              </li>
              <li>
                <strong>Safety integration:</strong> evidence that safe working practices are
                embedded in your everyday work.
              </li>
              <li>
                <strong>KSB coverage:</strong> activities that collectively address all the
                knowledge, skills and behaviours in the standard.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="The retrospective logging trap"
            whatHappens={
              <>
                Trying to write your entire activity log in the final weeks before the EPA is one of
                the most common mistakes apprentices make. Retrospective entries are vague, lack
                specific detail, and are often obviously written after the fact.
              </>
            }
            doInstead={
              <>
                The assessor can tell the difference between a log written in real time and one
                constructed from memory months later — log activities as they happen.
              </>
            }
          />

          <p className="text-[14.5px] leading-relaxed text-white">
            <strong>Key point:</strong> think of your activity log as a professional engineering
            diary. It records your journey from learner to competent technician, with the specific
            evidence to prove it.
          </p>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Writing effective log entries</ContentEyebrow>

          <ConceptBlock title="Writing effective log entries">
            <p>
              An effective log entry captures enough detail for the assessor to understand what you
              did, how you did it, and why it matters. It should read like a technical account of a
              professional activity, not a brief diary note.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Structure of an effective log entry">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Element</th>
                    <th className="py-2 pr-4 font-medium text-white">What to include</th>
                    <th className="py-2 font-medium text-white">Example</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Date and location</td>
                    <td className="py-2 pr-4">When and where</td>
                    <td className="py-2">15 Jan 2026, Building 3 plant room</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Equipment</td>
                    <td className="py-2 pr-4">What you worked on</td>
                    <td className="py-2">AHU-3 supply fan motor (7.5 kW, 3-phase)</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Task description</td>
                    <td className="py-2 pr-4">What you did and why</td>
                    <td className="py-2">Diagnosed intermittent tripping on thermal overload</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Methods and tools</td>
                    <td className="py-2 pr-4">How you did it</td>
                    <td className="py-2">Insulation resistance test, current clamp readings</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Safety measures</td>
                    <td className="py-2 pr-4">How you worked safely</td>
                    <td className="py-2">Safe isolation at MCC, lock-off, proved dead</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Outcome</td>
                    <td className="py-2 pr-4">What the result was</td>
                    <td className="py-2">Low IR reading (0.3 M&Omega;) confirmed winding fault</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">KSB reference</td>
                    <td className="py-2 pr-4">Which standard areas</td>
                    <td className="py-2">Fault diagnosis, testing, safety</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Be specific, not generic">
            <p>
              Compare: &quot;Worked on a motor&quot; versus &quot;Diagnosed intermittent thermal
              overload tripping on AHU-3 supply fan motor (7.5 kW, Star-Delta starter). Insulation
              resistance test between phases and phase-to-earth revealed low reading on U-phase to
              earth (0.3 M&Omega; against minimum 1 M&Omega;), indicating winding insulation
              breakdown. Motor replaced and IR confirmed satisfactory (&gt;200 M&Omega; on all
              phases).&quot; The second entry is genuine evidence of competence.
            </p>
            <p>
              <strong>Key point:</strong> include specific values, readings and measurements
              wherever possible. Numbers demonstrate technical understanding far more effectively
              than general descriptions.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Establishing a logging routine</ContentEyebrow>

          <ConceptBlock title="Establishing a logging routine">
            <p>
              Consistent logging requires building it into your work routine. The most successful
              apprentices treat logging as part of completing a task — the job is not finished until
              it is recorded. Setting a regular time and format makes the process habitual rather
              than burdensome.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Building your logging habit">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Set a fixed time:</strong> dedicate 15-20 minutes at the end of each day or
                week to update your log.
              </li>
              <li>
                <strong>Use a template:</strong> a consistent format with prompts ensures you
                capture all required elements.
              </li>
              <li>
                <strong>Take photographs during the task:</strong> before, during and after photos
                provide visual evidence and aid memory when writing.
              </li>
              <li>
                <strong>Record readings immediately:</strong> write down test values, component
                ratings and measurements on the spot.
              </li>
              <li>
                <strong>Keep a pocket notebook:</strong> quick notes during the day can be expanded
                into full log entries later.
              </li>
              <li>
                <strong>Use digital tools:</strong> e-portfolio apps, phone notes or voice memos can
                capture details quickly on site.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Weekly logging checklist">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Have I logged all significant activities from this week?</li>
              <li>Does each entry include specific technical details and test readings?</li>
              <li>Have I described the safety measures taken for each activity?</li>
              <li>Are KSB references included for every entry?</li>
              <li>Have I attached any relevant photographs or documents?</li>
              <li>Is there anything I observed or assisted with that I should also record?</li>
            </ul>
            <p>
              <strong>Key point:</strong> the goal is little and often. Fifteen minutes of logging
              each day produces far better evidence than two hours of retrospective writing each
              month.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Using logs for gap analysis and planning</ContentEyebrow>

          <ConceptBlock title="Using logs for gap analysis and planning">
            <p>
              Your activity log is not just evidence — it is a planning tool. By reviewing your log
              against the ST1426 KSBs regularly, you can identify which areas have strong evidence
              and which need more attention. This allows you to proactively seek out activities that
              fill gaps in your experience.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Conducting a log-based gap analysis">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Review KSB coverage:</strong> check which KSBs your logged activities cover
                and which are missing.
              </li>
              <li>
                <strong>Assess evidence quality:</strong> do your existing entries provide
                sufficient detail for each KSB?
              </li>
              <li>
                <strong>Identify patterns:</strong> are you logging the same type of activity
                repeatedly while missing other areas?
              </li>
              <li>
                <strong>Plan targeted activities:</strong> discuss gaps with your employer and
                training provider to arrange relevant experience.
              </li>
              <li>
                <strong>Set milestones:</strong> create a timeline for filling gaps, with regular
                review points.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Common evidence gaps for MOET apprentices"
            onSite="The activity log directly supports the professional discussion by providing a chronological record of your practical development. The assessor will use it to select specific activities to discuss in detail, so every entry should be something you can confidently expand on."
          >
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Control systems:</strong> PLC and BMS interaction — seek opportunities to
                work with these systems.
              </li>
              <li>
                <strong>Commissioning:</strong> new installation commissioning — ask to assist on
                commissioning activities.
              </li>
              <li>
                <strong>Communication:</strong> client interaction and reporting — log instances
                where you communicated with stakeholders.
              </li>
              <li>
                <strong>Continuous improvement:</strong> suggesting and implementing improvements —
                document any suggestions you make.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Leveraging logs in the professional discussion</ContentEyebrow>

          <ConceptBlock title="Leveraging logs in the professional discussion">
            <p>
              During the professional discussion, the assessor will select activities from your log
              to explore in depth. Your log entries serve as the agenda for this conversation — the
              more detailed and well-structured they are, the better prepared you will be to expand
              on them confidently when questioned.
            </p>
          </ConceptBlock>

          <ConceptBlock title="How the assessor uses your activity log">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Selecting discussion topics:</strong> the assessor scans your log for
                activities that cover multiple KSBs, enabling efficient evidence gathering during
                the discussion.
              </li>
              <li>
                <strong>Probing technical knowledge:</strong> they may ask you to explain the theory
                behind your actions — why you chose a particular test method, what the readings
                mean, what alternatives existed.
              </li>
              <li>
                <strong>Assessing progression:</strong> comparing early and later log entries to see
                how your competence and independence have developed over the apprenticeship.
              </li>
              <li>
                <strong>Verifying authenticity:</strong> detailed, specific entries that you can
                expand upon fluently demonstrate genuine experience, while vague entries suggest
                limited involvement.
              </li>
              <li>
                <strong>Exploring behaviours:</strong> asking how you communicated with colleagues,
                dealt with unexpected situations, or demonstrated initiative during logged
                activities.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Example discussion questions from log entries">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                &quot;You logged a motor replacement on 15 January. Talk me through your safe
                isolation procedure from start to finish.&quot;
              </li>
              <li>
                &quot;Your entry mentions an insulation resistance reading of 0.3 M&Omega;. What is
                the minimum acceptable value and how did you know the motor needed replacing?&quot;
              </li>
              <li>
                &quot;I see you assisted with commissioning an AHU in March. What tests were carried
                out and what was your specific role?&quot;
              </li>
              <li>
                &quot;This entry describes a situation where you found an additional fault during
                routine maintenance. How did you communicate this to the client and what action was
                taken?&quot;
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Preparing for discussion">
            <p>
              Before the professional discussion, re-read every log entry and make sure you can
              explain each one in more detail than written. For key activities, prepare to discuss:
              the context and why the work was needed, your approach and reasoning, the specific
              technical details, the outcome and any lessons learned, and how you would handle it
              differently with the benefit of experience.
            </p>
            <p>
              <strong>Key point:</strong> your activity log is not just a static record — it is the
              script for your professional discussion. Every entry is a potential discussion topic,
              so write each one as though you will be asked about it in detail.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'Purpose: chronological record demonstrating breadth and depth of practical experience.',
              'Frequency: after each significant activity, or at least weekly.',
              'Content: date, location, equipment, task, methods, safety, outcome, KSB references.',
              'Detail level: specific enough for someone not present to understand what you did and why.',
              'Test readings: always record specific values — they demonstrate technical understanding.',
              'Safety: describe specific measures taken, not just "worked safely".',
              'Gap analysis: review log against KSBs regularly to identify missing evidence areas.',
              'Discussion prep: re-read all entries before the EPA — you may be asked about any of them.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Test Your Knowledge — Activity Logging" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module7-section3-2')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Collecting Witness Statements
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module7-section3-4')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Mapping Evidence to Standards
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule7Section3_3;
