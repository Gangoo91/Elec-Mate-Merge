/**
 * MOET · Module 1 · Section 1.6 · Subsection 4 — Reporting Incidents, Accidents and Near Misses
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option. NOT ST0154 (the "MOET" the course is named after) —
 * ST0154 v1.6 is still live, but its own EPA plan records that the Electrical
 * Technician option "was retired 31/12/2025" and was replaced by ST1426
 * (single discipline) or ST1443 (dual discipline). The course keeps the MOET
 * name because that is what employers and colleges still call the role.
 *
 * KSBs covered, quoted rather than numbered: the IfATE/Skills England API
 * publishes these statements without their K/S/B codes, and the published
 * numbering has not been verified against a primary source — so do not invent
 * codes here.
 *   Knowledge  · "Individual maintenance technician's roles and
 *                 responsibilities. Escalation procedures."
 *              · "Documentation requirements: documentation control,
 *                 auditable records."
 *              · "Health and safety regulations – key features and impact on role."
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
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Reporting Incidents, Accidents and Near Misses - MOET Module 1 Section 6.4';
const DESCRIPTION =
  'Comprehensive guide to incident reporting for electrical maintenance technicians: RIDDOR 2013, reportable injuries, dangerous occurrences, near-miss reporting, accident investigation, accident book requirements and data protection.';

const quickCheckQuestions = [
  {
    id: 'riddor-reporting',
    question: 'Under RIDDOR 2013, which of the following must be reported to the HSE?',
    options: [
      'A worker receiving an electric shock that results in them being taken to hospital for treatment',
      'A minor cut to a finger that is treated on site with a plaster',
      'A worker feeling unwell after a long shift and going home early',
      'A small spillage of cleaning fluid that is wiped up immediately',
    ],
    correctIndex: 0,
    explanation:
      "Under RIDDOR 2013, injuries that result in a worker being taken to hospital for treatment (not just examination) are reportable as 'over-7-day incapacitation' or 'specified injuries' depending on the nature. Electric shock causing hospital attendance is a reportable injury. Minor first-aid-only injuries do not need to be reported to the HSE but must be recorded in the accident book.",
  },
  {
    id: 'near-miss-importance',
    question: 'Why is it important to report near misses, even though no injury occurred?',
    options: [
      'Because near misses indicate hazards that could cause serious injury next time — they are warnings',
      'Because the law requires every near miss to be reported to the HSE within 10 days',
      'Because reporting near misses entitles the worker to a safety bonus payment',
      'Because near misses must be logged before the worker can claim overtime',
    ],
    correctIndex: 0,
    explanation:
      'Near misses are valuable warning signs — they identify hazards and unsafe conditions before anyone is hurt. For every serious accident, there are typically many near misses. Reporting and investigating near misses allows organisations to identify root causes and implement corrective actions before a serious incident occurs. This is the foundation of proactive safety management.',
  },
  {
    id: 'accident-investigation',
    question: 'The primary purpose of an accident investigation is to:',
    options: [
      'Identify the root causes and implement corrective actions to prevent recurrence',
      'Complete the paperwork required by the insurance company',
      'Identify which individual was to blame and take disciplinary action',
      'Prepare a legal defence in case of prosecution',
    ],
    correctIndex: 0,
    explanation:
      'The primary purpose of accident investigation is to identify root causes (the underlying failures in systems, procedures or management that allowed the accident to happen) and implement corrective actions to prevent recurrence. It is NOT about blame — a blame culture discourages reporting and prevents organisations from learning. The focus must be on why, not who.',
  },
  {
    id: 'reporting-timeframe',
    question: 'Under RIDDOR 2013, a death or specified injury must be reported to the HSE:',
    options: [
      'Within 15 days of the accident using the online form only',
      'Within 7 days of the accident, in writing by post',
      'Without delay, by the quickest practicable means (telephone for fatal/specified, followed by online form within 10 days)',
      'At the next routine HSE inspection of the premises',
    ],
    correctIndex: 2,
    explanation:
      'Deaths and specified injuries must be reported without delay by the quickest practicable means — in practice, this means telephoning the HSE Incident Contact Centre on 0345 300 9923 immediately. A written report (Form F2508 online) must then be submitted within 10 days. Over-7-day incapacitation injuries must be reported within 15 days.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'RIDDOR 2013 stands for:',
    options: [
      'Recording of Incidents, Diseases and Dangerous Operations Regulations 2013',
      'Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013',
      'Regulation of Industrial Diseases, Disorders and Occupational Risks 2013',
      'Reporting of Industrial Damage and Dangerous Operational Risks 2013',
    ],
    correctAnswer: 1,
    explanation:
      'RIDDOR stands for the Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013. These regulations require employers, the self-employed and those in control of premises to report certain work-related injuries, diseases and dangerous occurrences to the HSE.',
  },
  {
    id: 2,
    question: "Which of the following is a 'specified injury' under RIDDOR 2013?",
    options: [
      'A headache caused by working near a noisy generator',
      'A minor burn treated with cold water and a dressing',
      'A fracture other than to fingers, thumbs and toes',
      'A strain from lifting a heavy cable drum',
    ],
    correctAnswer: 2,
    explanation:
      'Specified injuries under RIDDOR include: fractures (other than to fingers, thumbs and toes), amputations, permanent loss of sight, crush injuries, scalping, burns covering more than 10% of the body, loss of consciousness caused by head injury or asphyxia, and any injury requiring admittance to hospital for more than 24 hours.',
  },
  {
    id: 3,
    question:
      'An electrical short circuit that causes a fire in a distribution board is reportable under RIDDOR as:',
    options: [
      'An occupational disease',
      'A minor incident — no report needed',
      'A specified injury',
      'A dangerous occurrence',
    ],
    correctAnswer: 3,
    explanation:
      'An electrical short circuit or overload accompanied by fire or explosion is classified as a dangerous occurrence under RIDDOR 2013 and must be reported to the HSE. This applies even if no one was injured — dangerous occurrences are events with the potential to cause serious harm.',
  },
  {
    id: 4,
    question: 'Over-7-day incapacitation injuries must be reported to the HSE within:',
    options: ['15 days of the accident', '10 days', '24 hours', '30 days'],
    correctAnswer: 0,
    explanation:
      'If a worker is incapacitated for more than 7 consecutive days (not counting the day of the accident) as a result of a work-related injury, the employer must report this to the HSE within 15 days of the accident. The report is submitted online using Form F2508.',
  },
  {
    id: 5,
    question: 'The accident book (BI 510) must record which of the following?',
    options: [
      'Only accidents that result in more than 7 days off work',
      'All work-related accidents, injuries, diseases and dangerous occurrences, however minor',
      'Only accidents that are reportable to the HSE under RIDDOR',
      'Only accidents involving members of the public, not employees',
    ],
    correctAnswer: 1,
    explanation:
      'The accident book must record ALL work-related accidents, injuries, diseases and dangerous occurrences, no matter how minor. This provides a complete record for trend analysis, legal evidence, insurance purposes and RIDDOR compliance. Even minor first-aid-only incidents should be recorded.',
  },
  {
    id: 6,
    question: 'Under GDPR and the Data Protection Act 2018, accident book entries must:',
    options: [
      'Be displayed on the staff noticeboard so everyone is aware of recent incidents',
      'Be kept indefinitely as a permanent record of the workplace',
      'Be individually removable so other employees cannot access personal data',
      'Be shared with all colleagues to encourage a culture of openness',
    ],
    correctAnswer: 2,
    explanation:
      'Modern accident books (BI 510) use individually removable pages or sealed pockets so that each entry can be separated — preventing other employees from seeing personal details of previous entries. This complies with GDPR and the Data Protection Act 2018. Electronic reporting systems must also restrict access appropriately.',
  },
  {
    id: 7,
    question:
      "The 'safety triangle' (Heinrich's Triangle) suggests that for every serious accident, there are approximately:",
    options: [
      '10 minor injuries and 100 near misses',
      '100 minor injuries and 1000 near misses',
      '5 minor injuries and 50 near misses',
      '29 minor injuries and 300 near misses/unsafe acts',
    ],
    correctAnswer: 3,
    explanation:
      "Heinrich's Triangle (also known as the safety triangle or accident pyramid) suggests a ratio of 1 serious injury : 29 minor injuries : 300 near misses/unsafe acts. This illustrates why near-miss reporting is so important — by addressing the large number of near misses at the base of the triangle, you can prevent the serious incidents at the top.",
  },
  {
    id: 8,
    question: 'During an accident investigation, the first step should be to:',
    options: [
      'Make the area safe and preserve the scene as evidence',
      'Write the RIDDOR report and submit it to the HSE',
      'Interview the injured person before they forget what happened',
      'Identify who was responsible and suspend them',
    ],
    correctAnswer: 0,
    explanation:
      'The first priority is always to make the area safe (prevent further injuries) and preserve the scene as evidence. Do not disturb equipment, move tools or clean up until the investigation team has documented the scene. Take photographs, make sketches, and secure any physical evidence. Then proceed to interview witnesses while memories are fresh.',
  },
  {
    id: 9,
    question: 'Root cause analysis in accident investigation aims to identify:',
    options: [
      'The single immediate action that directly triggered the accident',
      'The underlying systemic failures (management, procedures, training, design) that allowed the accident chain to develop',
      'The individual whose mistake led to the accident so they can be retrained',
      'The total financial cost of the accident for the insurance claim',
    ],
    correctAnswer: 1,
    explanation:
      'Root cause analysis looks beyond the immediate cause (the final action or event) to identify the underlying systemic failures — inadequate procedures, insufficient training, poor design, management failures, inadequate supervision, or organisational culture issues. Addressing root causes prevents recurrence; addressing only the immediate cause often just moves the problem.',
  },
  {
    id: 10,
    question:
      'A near miss during electrical maintenance work (e.g., touching a conductor that turned out to be dead, but could have been live) should be:',
    options: [
      'Ignored, because no injury occurred and there is nothing to report',
      'Recorded only in your own notebook in case it is needed later',
      "Reported through the company's near-miss reporting system and investigated to identify the failure",
      'Reported directly to the HSE by telephone as a dangerous occurrence',
    ],
    correctAnswer: 2,
    explanation:
      "All near misses should be reported through the company's internal near-miss reporting system. This near miss indicates a failure in the isolation or proving dead procedure that could result in a fatal electric shock next time. Investigation should identify why the conductor was not properly verified and implement corrective actions. Near misses are not reportable to the HSE under RIDDOR unless they fall under the 'dangerous occurrence' categories.",
  },
  {
    id: 11,
    question: 'Which of the following is an occupational disease reportable under RIDDOR?',
    options: [
      'Seasonal influenza caught from a colleague at work',
      'A back strain from a single incident of lifting a heavy load',
      'Mild eye fatigue from a day of detailed terminating work',
      'Carpal tunnel syndrome caused by repetitive use of vibrating tools',
    ],
    correctAnswer: 3,
    explanation:
      'Carpal tunnel syndrome is a reportable occupational disease under RIDDOR when it is caused by work involving the use of vibrating tools. Other reportable occupational diseases include occupational dermatitis, occupational asthma, hand-arm vibration syndrome (HAVS), and diseases associated with exposure to biological agents. The employer must report when they receive a diagnosis from a doctor.',
  },
  {
    id: 12,
    question: 'Who is responsible for reporting a RIDDOR-reportable incident to the HSE?',
    options: [
      'The employer (or self-employed person, or person in control of the premises)',
      'The injured worker themselves, once they have recovered',
      'The first aider who treated the injured person at the scene',
      'The trade union safety representative for the workplace',
    ],
    correctAnswer: 0,
    explanation:
      "The duty to report under RIDDOR falls on the employer, the self-employed person (if they are injured), or the person in control of the premises where the incident occurred. In practice, this is usually the employer's health and safety manager or a designated responsible person. The injured person should report the accident internally but is not responsible for the RIDDOR notification.",
  },
];

const faqs = [
  {
    question: 'What is the difference between an accident, an incident and a near miss?',
    answer:
      'An accident is an unplanned event that results in injury, ill health or damage. An incident is a broader term covering accidents, near misses and dangerous occurrences — essentially any unplanned event that could have or did cause harm. A near miss is an event that could have caused injury or damage but did not — for example, a dropped tool that narrowly missed someone. All three should be reported and recorded internally; RIDDOR only applies to specific categories of accidents and dangerous occurrences.',
  },
  {
    question:
      'Do I have to report a minor electric shock that did not result in hospital treatment?',
    answer:
      'A minor electric shock that is treated on site with first aid only does not need to be reported to the HSE under RIDDOR. However, it MUST be recorded in the company accident book, reported to your supervisor, and investigated internally to identify the cause and prevent recurrence. If the shock results in the worker being taken to hospital for treatment (not just precautionary examination), or if it causes incapacitation for more than 7 days, it becomes RIDDOR-reportable.',
  },
  {
    question: 'How do I report an incident to the HSE under RIDDOR?',
    answer:
      'RIDDOR reports are submitted online at www.hse.gov.uk/riddor using the appropriate form (F2508 for injuries and dangerous occurrences, F2508A for diseases). For fatal or specified injuries, the HSE must also be notified by telephone immediately on 0345 300 9923. The online form must then be submitted within 10 days. Records of RIDDOR reports must be kept for at least 3 years.',
  },
  {
    question: 'What happens if my employer fails to report a RIDDOR incident?',
    answer:
      'Failure to report a RIDDOR-reportable incident is a criminal offence under the Health and Safety at Work etc. Act 1974. The HSE can prosecute employers who fail to report, with penalties including unlimited fines. If you believe your employer has failed to report an incident, you can contact the HSE directly or report through your trade union safety representative. Employees are protected from dismissal or detriment for raising health and safety concerns.',
  },
  {
    question: 'Should I preserve the scene after an electrical accident?',
    answer:
      'Yes — after making the area safe and treating any casualties, the accident scene should be preserved as far as possible. Do not disturb equipment, remove tools, clean up debris or reset circuit breakers until the investigation team has documented the scene. Take photographs from multiple angles, note the position of switches and isolators, record any readings on instruments, and secure any physical evidence (failed components, damaged cables). This evidence is critical for the investigation and may be needed if the HSE conducts its own enquiry.',
  },
];

const MOETModule1Section6_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 1 · Section 1.6 · Subsection 4"
        title="Reporting Incidents, Accidents and Near Misses"
        backTo="/study-centre/apprentice/m-o-e-t-module1-section6"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            RIDDOR requirements, internal reporting, accident investigation and learning from near
            misses.
          </p>

          <TLDR
            points={[
              'RIDDOR: Report deaths, specified injuries, 7-day incapacitation, dangerous occurrences',
              'Timeframes: Immediate (fatal/specified), 15 days (7-day), 10 days (online form)',
              'Near misses: Report internally — they are early warnings',
              'Investigation: Find root causes, not blame',
              'Electrical fires: Short circuit causing fire = dangerous occurrence',
              'Electric shock: Hospital treatment = reportable injury',
              'Near misses: Failed isolation, wrong circuit = must report internally',
              'ST1426: Maps to reporting and compliance KSBs',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify which injuries, diseases and occurrences are reportable under RIDDOR 2013',
              'Explain the reporting timeframes and methods for different categories of incident',
              'Describe the purpose and process of internal near-miss reporting',
              'Carry out a structured accident investigation using root cause analysis',
              'Record incidents correctly in the accident book with GDPR compliance',
              'Recognise electrical-specific dangerous occurrences and their reporting requirements',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>RIDDOR 2013 — what must be reported</ContentEyebrow>

          <ConceptBlock title="Categories of Reportable Incident">
            <p>
              The Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013
              (RIDDOR) require employers, the self-employed and persons in control of premises to
              report certain work-related incidents to the Health and Safety Executive (HSE). RIDDOR
              reporting enables the HSE to identify trends, investigate serious incidents, and
              target enforcement action where it is most needed. Failure to report is a criminal
              offence.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Deaths:</strong> Any death arising from a work-related accident, including
                deaths of non-workers (members of the public) as a result of a work activity
              </li>
              <li>
                <strong>Specified injuries:</strong> Fractures (except fingers/thumbs/toes),
                amputations, permanent loss of sight or reduction in sight, crush injuries to the
                head or torso, scalping, burns covering more than 10% of the body, loss of
                consciousness from head injury or asphyxia, hypothermia or heat-induced illness
                requiring hospital admission for more than 24 hours
              </li>
              <li>
                <strong>Over-7-day incapacitation:</strong> Where a worker is incapacitated for more
                than 7 consecutive days (not counting the day of the accident) as a result of a
                work-related injury
              </li>
              <li>
                <strong>Non-fatal injuries to non-workers:</strong> Where a member of the public is
                injured as a result of a work activity and is taken to hospital for treatment
              </li>
              <li>
                <strong>Occupational diseases:</strong> Carpal tunnel syndrome, hand-arm vibration
                syndrome, occupational dermatitis, occupational asthma, and other specified diseases
                when linked to the work activity
              </li>
              <li>
                <strong>Dangerous occurrences:</strong> Specified near-miss events with high
                potential for serious harm (see below)
              </li>
            </ul>
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4">
              <p className="mb-2 text-sm font-medium text-red-400">
                Dangerous Occurrences Relevant to Electrical Work
              </p>
              <ul className="list-disc space-y-1.5 pl-5 text-sm text-white marker:text-elec-yellow/70">
                <li>
                  <strong>Electrical short circuit or overload causing fire or explosion:</strong>{' '}
                  Even if no one is injured, an electrical fault that results in fire or explosion
                  is a reportable dangerous occurrence
                </li>
                <li>
                  <strong>
                    Electrical incidents causing stoppage of plant for more than 24 hours:
                  </strong>{' '}
                  Where an electrical fault causes a cessation of work for more than 24 hours
                </li>
                <li>
                  <strong>
                    Explosion or fire causing suspension of normal work for over 24 hours:
                  </strong>{' '}
                  Any fire or explosion that prevents normal working for more than 24 hours
                </li>
                <li>
                  <strong>Collapse of building or structure:</strong> Where an electrical fault
                  causes structural damage
                </li>
                <li>
                  <strong>Incidents involving overhead electric lines:</strong> Contact with or
                  close approach to overhead power lines
                </li>
              </ul>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Category</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Initial Report</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Written Report</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">
                      Death or specified injury
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Immediately by telephone (0345 300 9923)
                    </td>
                    <td className="border border-white/10 px-3 py-2">Online form within 10 days</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">
                      Over-7-day incapacitation
                    </td>
                    <td className="border border-white/10 px-3 py-2">Not required by telephone</td>
                    <td className="border border-white/10 px-3 py-2">
                      Online form within 15 days of the accident
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">
                      Dangerous occurrence
                    </td>
                    <td className="border border-white/10 px-3 py-2">Immediately by telephone</td>
                    <td className="border border-white/10 px-3 py-2">Online form within 10 days</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">
                      Occupational disease
                    </td>
                    <td className="border border-white/10 px-3 py-2">Not required by telephone</td>
                    <td className="border border-white/10 px-3 py-2">
                      Online form as soon as a doctor confirms diagnosis
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> RIDDOR records must be kept for at least 3 years from the
              date the incident was reported. These records may be needed for HSE investigations,
              civil claims, insurance purposes and organisational learning.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Internal reporting and the accident book</ContentEyebrow>

          <ConceptBlock title="The Accident Book (BI 510)">
            <p>
              Not all incidents meet the RIDDOR threshold for external reporting, but ALL incidents
              — no matter how minor — should be recorded internally. The accident book (BI 510) is
              the primary record, supplemented by the organisation's internal reporting systems.
              Comprehensive internal reporting creates a complete picture of safety performance and
              enables trend analysis.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Legal requirement:</strong> The Social Security (Claims and Payments)
                Regulations 1979 require employers to keep an accident book or equivalent system
              </li>
              <li>
                <strong>What to record:</strong> Date and time, location, name and occupation of the
                injured person, details of the injury or condition, description of what happened,
                treatment given, name of the person making the entry
              </li>
              <li>
                <strong>Who records:</strong> The injured person should make the entry if possible,
                or a colleague on their behalf
              </li>
              <li>
                <strong>Timeliness:</strong> Entries should be made as soon as practicable after the
                incident, while details are fresh
              </li>
              <li>
                <strong>GDPR compliance:</strong> Modern accident books use individually removable
                pages so previous entries cannot be seen by others. Electronic systems must restrict
                access to authorised personnel
              </li>
              <li>
                <strong>Retention:</strong> Records must be kept for at least 3 years
              </li>
            </ul>
            <p>
              <strong>Internal Reporting Systems.</strong> In addition to the accident book, most
              organisations have internal reporting systems that capture more detail for
              investigation and trend analysis:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Incident report forms (paper or electronic)</li>
              <li>Near-miss reporting cards or apps</li>
              <li>Safety observation systems</li>
              <li>Toolbox talk feedback and records</li>
              <li>Supervisor daily safety reports</li>
            </ul>
            <p>
              <strong>Data Protection Considerations.</strong> Accident and incident records contain
              personal data and must be handled in accordance with GDPR:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Only collect data that is necessary and proportionate</li>
              <li>Store records securely with restricted access</li>
              <li>Do not retain records longer than necessary (minimum 3 years for RIDDOR)</li>
              <li>Individuals have the right to access their own records</li>
              <li>Consider anonymising data for trend analysis and reporting</li>
            </ul>
            <div className="rounded-lg border border-orange-500/30 bg-orange-500/10 p-4">
              <p className="mb-2 text-sm font-medium text-orange-400">Contractor Reporting</p>
              <p className="text-sm text-white">
                As a maintenance electrician working as a contractor, you have dual reporting
                responsibilities. You must report incidents to the building/client's management
                (using their systems) AND to your own employer. The duty to report to the HSE under
                RIDDOR falls on the person in control of the premises for dangerous occurrences
                affecting the building, and on your employer for injuries to their employees. Ensure
                you understand both reporting channels before starting work on any site.
              </p>
            </div>
            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> If in doubt about whether an incident is reportable, report
              it. It is far better to report an incident that turns out not to be RIDDOR-reportable
              than to fail to report one that is. Your supervisor or health and safety manager can
              help determine the correct reporting category.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Near-miss reporting and the safety triangle</ContentEyebrow>

          <ConceptBlock title="Heinrich's Safety Triangle">
            <p>
              Near misses are events that could have caused injury or damage but, by chance or good
              fortune, did not. They are the most valuable source of safety intelligence available
              to any organisation because they reveal hazards and system failures before anyone is
              hurt. For electrical maintenance work — where the consequences of a genuine incident
              can be fatal — near-miss reporting is especially critical.
            </p>
            <p>
              Herbert Heinrich's research (later updated by Frank Bird) identified a statistical
              relationship between the severity levels of workplace incidents:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1</strong> serious or major injury
              </li>
              <li>
                <strong>29</strong> minor injuries
              </li>
              <li>
                <strong>300</strong> near misses / no-injury incidents / unsafe acts
              </li>
            </ul>
            <p>
              The principle is clear: by addressing the large number of near misses at the base of
              the triangle, you reduce the likelihood of the minor injuries in the middle and the
              serious injuries at the top. Near-miss reporting is the foundation of proactive
              (rather than reactive) safety management.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Examples of Near Misses in Electrical Maintenance">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Isolation failure:</strong> You isolated what you believed was the correct
                circuit, but when proving dead, discovered the circuit was still live — you had
                isolated the wrong circuit. No shock because you followed safe isolation procedure,
                but the labelling was incorrect
              </li>
              <li>
                <strong>Live working near miss:</strong> While removing a consumer unit cover, you
                noticed exposed live busbars that were not adequately shrouded. You did not touch
                them, but a less experienced person might have
              </li>
              <li>
                <strong>Arc flash risk:</strong> You opened a distribution board panel and noticed
                significant evidence of previous arcing and overheating — black deposits, melted
                connections — indicating an imminent failure that could have caused an arc flash
              </li>
              <li>
                <strong>Falling equipment:</strong> A cable tray bracket failed and the tray
                dropped, narrowly missing a colleague working below. No injury, but the same failure
                at a different moment could have been fatal
              </li>
              <li>
                <strong>Incorrect labelling:</strong> Circuit labels on a distribution board were
                wrong — circuits were not where the schedule said they were. Discovered during
                testing, not during live work, but the potential for working on the wrong live
                circuit was real
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Creating a Positive Reporting Culture">
            <p>
              Many near misses go unreported because workers fear blame, embarrassment or
              disciplinary action. A positive reporting culture requires:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>No blame:</strong> The focus is on system failures, not individual errors.
                Punishing reporters guarantees under-reporting
              </li>
              <li>
                <strong>Easy reporting:</strong> Simple, quick reporting methods — cards, apps,
                verbal reports to supervisors
              </li>
              <li>
                <strong>Feedback:</strong> Reporters must see that their reports lead to action. If
                nothing changes, people stop reporting
              </li>
              <li>
                <strong>Recognition:</strong> Acknowledge and thank people who report near misses —
                they are contributing to safety
              </li>
              <li>
                <strong>Leadership:</strong> Managers must actively encourage reporting and report
                their own near misses
              </li>
              <li>
                <strong>Learning:</strong> Share anonymised near-miss lessons in toolbox talks and
                safety briefings
              </li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> If you experience a near miss, report it immediately — do
              not wait until the end of the day or think "it doesn't matter because nothing
              happened." The same conditions that caused your near miss still exist and could cause
              a serious injury to the next person. Reporting near misses is one of the most
              important things you can do as a safety-conscious maintenance technician.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Accident investigation process</ContentEyebrow>

          <ConceptBlock title="Step 1 and 2 — Secure the Scene, Gather Evidence">
            <p>
              When an accident or serious near miss occurs, a thorough investigation is essential to
              understand what happened, why it happened, and how to prevent it from happening again.
              The investigation should be carried out by a competent person (or team) as soon as
              practicable after the incident, while evidence is fresh and the scene is intact.
            </p>
            <p>
              <strong>Step 1 — Secure the Scene</strong>
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Ensure the area is safe — no continuing danger to investigators or others</li>
              <li>Preserve the scene — do not move equipment, tools or materials</li>
              <li>Take photographs and video from multiple angles</li>
              <li>Make sketches showing positions of people, equipment and materials</li>
              <li>
                Note the position of switches, isolators, lockout devices and test instruments
              </li>
              <li>Secure any physical evidence (failed components, damaged cables, PPE)</li>
            </ul>
            <p>
              <strong>Step 2 — Gather Evidence</strong>
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Witness statements:</strong> Interview witnesses individually as soon as
                possible. Ask open questions ("What did you see?") not leading questions ("Did he
                forget to isolate?")
              </li>
              <li>
                <strong>Documentation:</strong> Collect risk assessments, method statements, permits
                to work, training records, maintenance records, calibration certificates for test
                instruments
              </li>
              <li>
                <strong>Environmental data:</strong> Note lighting levels, temperature, noise, time
                of day, weather (for outdoor work), shift patterns
              </li>
              <li>
                <strong>Equipment examination:</strong> Inspect and test equipment involved (by a
                competent person). Record serial numbers, calibration dates, condition
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Step 3 and 4 — Root Causes and Corrective Actions">
            <p>
              <strong>Step 3 — Analyse and Identify Root Causes</strong>
            </p>
            <p>
              Root cause analysis goes beyond the immediate cause (e.g., "he touched a live
              conductor") to identify the underlying systemic failures. Common root cause analysis
              techniques include:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>5 Whys:</strong> Ask "why?" repeatedly until you reach the fundamental
                cause. Example: Why did he touch the live conductor? Because it was not isolated.
                Why was it not isolated? Because the wrong circuit was identified. Why was the wrong
                circuit identified? Because the labelling was out of date. Why was the labelling out
                of date? Because there is no system for updating labels after modifications
              </li>
              <li>
                <strong>Fishbone diagram (Ishikawa):</strong> Categorise causes under headings:
                People, Procedures, Plant, Place, Policies
              </li>
              <li>
                <strong>Timeline analysis:</strong> Map out the sequence of events to identify where
                the chain could have been broken
              </li>
            </ul>
            <p>
              <strong>Step 4 — Implement Corrective Actions</strong>
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Immediate actions:</strong> Address any continuing hazards straight away
              </li>
              <li>
                <strong>Short-term actions:</strong> Implement temporary controls while permanent
                solutions are developed
              </li>
              <li>
                <strong>Long-term actions:</strong> Address root causes through procedure changes,
                training, design modifications, management systems
              </li>
              <li>
                <strong>Follow the hierarchy of control:</strong> Eliminate, substitute, engineer,
                administrate, PPE
              </li>
              <li>
                <strong>Assign responsibility:</strong> Each corrective action must have a named
                owner and a target completion date
              </li>
              <li>
                <strong>Verify effectiveness:</strong> Check that corrective actions have been
                implemented and are working
              </li>
            </ul>
            <p>
              <strong>Case Study: Investigation of an Electrical Near Miss.</strong> A maintenance
              technician was tasked with replacing a contactor in a motor control centre (MCC). They
              isolated the supply at the local isolator, locked off and proved dead. However, when
              they removed the contactor, they discovered that the isolator only disconnected two of
              the three phases — the third phase remained live due to a faulty isolator mechanism.
              The technician was not injured because they were wearing insulated gloves and noticed
              the live indicator before touching the busbars. Investigation using the 5 Whys
              revealed: (1) the isolator was faulty, (2) the fault had not been detected during the
              last periodic inspection, (3) the inspection did not include functional testing of
              isolators, (4) the inspection checklist was incomplete. Corrective actions included
              adding isolator functional testing to the inspection procedure, replacing all
              isolators of the same age and type, and retraining inspection staff.
            </p>
            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The maintenance technician standard requires you to be
              able to participate in incident investigations and contribute to corrective actions.
              You should be able to provide accurate witness statements, assist with evidence
              gathering, and implement corrective actions relevant to your work. You are also
              expected to report hazards and near misses proactively.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Lessons learned and continuous improvement</ContentEyebrow>

          <ConceptBlock title="Trend Analysis and Pattern Recognition">
            <p>
              The true value of incident reporting and investigation lies not in the paperwork
              itself but in the lessons learned and the improvements that follow. A proactive safety
              culture uses data from accidents, near misses and investigations to drive continuous
              improvement — identifying patterns, strengthening systems and preventing future harm.
              For electrical maintenance technicians, this means being an active participant in the
              feedback loop, not just a data source.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Accident data review:</strong> Regularly analyse accident book entries,
                RIDDOR reports and near-miss records to identify trends — are certain types of
                incident recurring? Are there common locations, times, tasks or equipment involved?
              </li>
              <li>
                <strong>Leading indicators:</strong> Track proactive measures such as the number of
                near misses reported, safety observations completed, toolbox talks delivered and
                training hours. A drop in near-miss reporting may indicate under-reporting, not
                improved safety
              </li>
              <li>
                <strong>Lagging indicators:</strong> Track reactive measures such as injury rates,
                lost-time incidents, RIDDOR reports and enforcement actions. These tell you what has
                happened, not what will happen
              </li>
              <li>
                <strong>Benchmarking:</strong> Compare your organisation's incident rates with
                industry averages to identify areas for improvement
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Communicating Lessons Learned">
            <p>
              Lessons from investigations are only valuable if they reach the people who need to
              know. Effective communication methods include:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Safety alerts:</strong> Immediate notifications of serious incidents with
                key lessons — distributed by email, noticeboard, or safety app
              </li>
              <li>
                <strong>Toolbox talks:</strong> Short, focused discussions at the start of shifts or
                work activities, using real incident case studies to reinforce safe practices
              </li>
              <li>
                <strong>Safety briefings:</strong> Formal briefings for larger teams, covering
                investigation findings, root causes and corrective actions
              </li>
              <li>
                <strong>Notice boards:</strong> Display anonymised incident summaries and safety
                statistics in common areas
              </li>
              <li>
                <strong>Industry sharing:</strong> Organisations such as the HSE, ECA, JIB and
                NICEIC publish safety bulletins and incident alerts that provide lessons from across
                the industry
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Closing the Loop and Your Role">
            <p>
              <strong>Closing the Loop.</strong> Every corrective action identified in an
              investigation must be tracked to completion. This means assigning a named owner,
              setting a deadline, providing the resources needed, verifying that the action has been
              completed, and then checking that it is effective in preventing recurrence. An
              investigation that identifies corrective actions but never implements them is worse
              than no investigation — it creates a false sense of security.
            </p>
            <p>
              <strong>Your Role in Continuous Improvement.</strong> As a maintenance technician, you
              contribute to continuous improvement by: reporting all incidents and near misses
              honestly, participating in investigations when asked, attending safety briefings and
              toolbox talks, implementing corrective actions in your work, sharing safety knowledge
              with colleagues, and challenging unsafe practices when you see them. Safety is not a
              one-person job — it requires everyone's participation.
            </p>
            <p>
              <strong>HSE Enforcement and the Consequences of Failure.</strong> The HSE has the
              power to investigate workplace incidents, issue improvement notices and prohibition
              notices, and prosecute employers and individuals who fail to comply with health and
              safety law. Penalties for RIDDOR offences and health and safety breaches include
              unlimited fines for organisations, imprisonment for individuals (up to 2 years under
              the Health and Safety at Work etc. Act 1974), and corporate manslaughter charges in
              the most serious cases. Beyond the legal consequences, a failure to report and learn
              from incidents is a moral failure — every accident that could have been prevented
              represents a failure of the safety management system.
            </p>
            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The maintenance technician standard includes behaviours
              relating to continuous improvement and taking responsibility for safety. Demonstrating
              that you actively participate in reporting, investigation and corrective action
              implementation is a key part of your end-point assessment evidence.
            </p>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="The near miss nobody reported"

            situation={
              <>
                <p>
                  An apprentice opens a panel and finds a live conductor where the drawing showed an
                  isolated one. Nothing happens — they notice before touching it, close the panel
                  and find their supervisor.
                </p>

                <p>Because nobody was hurt, it is dealt with verbally and never written down.</p>
              </>
            }

            whatToDo={
              <>
                <p>
                  Report it anyway. A near miss is the same event as an accident with the outcome
                  changed by luck, and it carries the same information about what is wrong with the
                  installation or the process.
                </p>

                <p>
                  Record what the drawing said and what was actually there. That discrepancy is the
                  real finding — someone else will open that panel expecting the same thing the
                  drawing promised.
                </p>

                <p>
                  Separate the report from blame. Near-miss reporting only works if people can raise
                  one without it becoming an investigation into them; a workforce that has learned
                  reporting is costly stops reporting.
                </p>

                <p>
                  Check whether it is reportable under RIDDOR. Most near misses are not, but some
                  are classed as dangerous occurrences, and that assessment should be made
                  deliberately rather than assumed.
                </p>
              </>
            }

            whyItMatters={
              <p>
                The drawing is now known to be wrong and nobody has written that down. The next
                person to open that panel gets the same surprise with no guarantee they will notice
                in time. Near-miss reporting is the cheapest safety information a site can get — it
                describes a failure that has already happened, at no cost, and the only way it gets
                wasted is by not recording it.
              </p>
            }
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Deaths/specified injuries — phone immediately + online within 10 days',
              'Over-7-day incapacitation — online within 15 days',
              'Dangerous occurrences — phone immediately + online within 10 days',
              'Occupational diseases — online when doctor confirms',
              'HSE telephone: 0345 300 9923',
              'Online: www.hse.gov.uk/riddor',
              'RIDDOR 2013 — Reporting regulations',
              'HSWA 1974 — General duties',
              'BI 510 — Accident book',
              'GDPR / DPA 2018 — Data protection',
              'HSG245 — Investigating accidents',
              'ST1426 — Reporting and compliance KSBs',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Test Your Knowledge" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module1-section6-3')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Evacuation Procedures
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module1-section6-5')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Role of First Responders on Site
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule1Section6_4;
