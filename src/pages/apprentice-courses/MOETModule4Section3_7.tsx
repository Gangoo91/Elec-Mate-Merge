/**
 * MOET · Module 4 · Section 3 · Subsection 7 — Documentation of Faults
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option.
 *
 * KSBs covered, quoted rather than numbered: the IfATE/Skills England API
 * publishes these statements without their K/S/B codes, and the published
 * numbering has not been verified against a primary source — so do not invent
 * codes here.
 *   Knowledge  · "Documentation requirements: documentation control, auditable
 *                 records."
 *              · "Electrical. Problem solving and critical reasoning
 *                 techniques."
 *              · "Continuous improvement (CI) systems and techniques."
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
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Documentation of Faults - MOET Module 4 Section 3.7';
const DESCRIPTION =
  'Recording and reporting fault diagnosis outcomes including job cards, maintenance logs, fault reports, root cause analysis documentation, CMMS entries and the importance of accurate records for compliance, reliability and continuous improvement.';

const quickCheckQuestions = [
  {
    id: 'fault-report-purpose',
    question: 'The primary purpose of completing a detailed fault report after every repair is to:',
    options: [
      'Provide the operator with a personal record that they can keep for their own interest',
      'Satisfy the parts supplier so that warranty discounts and rebates can later be claimed',
      'Demonstrate to colleagues and supervisors how quickly the repair was actually completed',
      'Create a history that aids future diagnosis, flags recurring problems and shows compliance',
    ],
    correctIndex: 3,
    explanation:
      'Fault reports serve multiple purposes beyond the immediate repair. They create a searchable maintenance history that helps future technicians diagnose similar faults more quickly. They identify recurring problems that may indicate a design weakness or environmental issue. They demonstrate regulatory compliance and due diligence. They provide data for reliability analysis and continuous improvement programmes.',
  },
  {
    id: 'root-cause-analysis',
    question: 'A root cause analysis (RCA) differs from a standard fault report because it:',
    options: [
      'Investigates why the fault occurred in the first place and identifies actions to prevent recurrence, not just what failed',
      'Records only the parts used and the time taken to complete the repair',
      'Is written by the operator rather than the technician who carried out the work',
      'Replaces the need to record the fault in the maintenance management system',
    ],
    correctIndex: 0,
    explanation:
      "A standard fault report records what happened, what was found and what was done to repair it. A root cause analysis goes further — it asks why the fault occurred and keeps asking 'why' until the underlying cause is identified. For example, a motor bearing failure (symptom) may be caused by misalignment (immediate cause), which was caused by inadequate foundation maintenance (root cause). The RCA then recommends corrective actions to address the root cause and prevent recurrence.",
  },
  {
    id: 'cmms-entry',
    question:
      'When completing a CMMS (Computerised Maintenance Management System) entry for a fault repair, the most important information to record accurately is:',
    options: [
      'The symptoms, diagnostic steps, root cause, repair actions, parts used and recommendations',
      'Only the date and the name of the technician who attended and closed out the job',
      'A brief note that the equipment is now working again, with no further supporting detail',
      'The cost of the replacement parts only, so the budget can be reconciled at month end',
    ],
    correctIndex: 0,
    explanation:
      'A complete CMMS entry should capture the full story of the fault: what was reported, what was found during investigation, what tests were performed, what the root cause was determined to be, what repair actions were taken, what parts were used, what the outcome was, and what recommendations were made. This comprehensive record supports future diagnosis, reliability analysis, spare parts planning and compliance requirements.',
  },
  {
    id: 'photographic-evidence',
    question: 'Photographic evidence taken during fault diagnosis is valuable because it:',
    options: [
      'Removes the need to write any text description of the fault in the report at all',
      'Gives an objective visual record of conditions found, useful for review, training and claims',
      'Automatically identifies the root cause of the fault without any further analysis needed',
      'Is the only form of evidence that is ever accepted by insurers and safety regulators',
    ],
    correctIndex: 1,
    explanation:
      'Photographs capture details that may not be adequately described in written text — the extent of damage, the condition of components, cable routing, the state of connections, environmental conditions and any safety concerns. They can be reviewed by engineers who were not present, used for training purposes, attached to CMMS records, and provide evidence in the event of a dispute, insurance claim or regulatory investigation.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'A fault report should be completed:',
    options: [
      'Only for major faults that cause significant production downtime',
      'For every fault repair, regardless of complexity, as soon as practicable after the work is completed',
      'Once a month, summarising all the repairs carried out during that period',
      'Only when the operator specifically requests a written record',
    ],
    correctAnswer: 1,
    explanation:
      'Every fault repair should be documented, even seemingly trivial ones. A loose connection that took five minutes to repair may be the third occurrence this year on the same circuit — a pattern that would only be visible if all three events were recorded. Completing the report promptly ensures that details are fresh and accurate. Batch reporting at the end of a period leads to incomplete and inaccurate records.',
  },
  {
    id: 2,
    question: "The '5 Whys' technique in root cause analysis involves:",
    options: [
      'Interviewing exactly five different people who witnessed the fault',
      'Listing five possible faults and testing each one in turn',
      "Asking 'why' repeatedly (typically about five times) to drill down from the symptom through immediate causes to the underlying root cause",
      'Completing the fault report within five minutes of finishing the repair',
    ],
    correctAnswer: 2,
    explanation:
      "The 5 Whys is a simple but effective root cause analysis technique. Starting from the symptom, you ask 'why did this happen?' and then ask 'why?' about each successive answer. For example: Motor tripped on overload (Why?) — Drawing excessive current (Why?) — Bearing seized (Why?) — Lubrication had failed (Why?) — Preventive maintenance schedule was not followed (Why?) — No PM system in place. The root cause is the lack of a preventive maintenance system, not the bearing failure.",
  },
  {
    id: 3,
    question:
      'A CMMS (Computerised Maintenance Management System) provides value to an organisation by:',
    options: [
      'Replacing the need for skilled technicians to attend and investigate faults in person',
      'Automatically diagnosing and repairing equipment faults without any technician input',
      'Guaranteeing that no equipment anywhere in the installation will ever fail in service',
      'Giving a searchable history that drives trend analysis, PM scheduling and compliance evidence',
    ],
    correctAnswer: 3,
    explanation:
      'A CMMS is a central repository for all maintenance data. It records the complete maintenance history of every asset, enables analysis of failure patterns and trends, schedules and tracks preventive maintenance, manages spare parts inventory, calculates maintenance costs, and provides the documented evidence needed for regulatory compliance, insurance and audits. It transforms raw maintenance data into actionable information for reliability improvement.',
  },
  {
    id: 4,
    question: 'When recording fault symptoms in a report, you should describe:',
    options: [
      'The symptoms exactly as reported and as found, without jumping to conclusions about the cause',
      'Only your final conclusion about the cause, leaving out the symptoms you actually observed',
      'A general impression of the overall equipment condition, without any specific recorded detail',
      'The repair actions you intend to take, written up before carrying out any real investigation',
    ],
    correctAnswer: 0,
    explanation:
      "Recording symptoms accurately and separately from the diagnosis is essential. The operator's report of what they observed, and your own observations on arrival, are primary evidence. Recording them without interpretation preserves this evidence for future analysis. If your diagnosis later proves incorrect, the accurately recorded symptoms can be re-analysed. Mixing symptoms with conclusions confuses the record and may bias future investigators.",
  },
  {
    id: 5,
    question: 'A maintenance log book kept in an electrical switchroom should record:',
    options: [
      'Only the dates on which the switchroom was last cleaned and visually inspected',
      'All work, modifications, test results, faults, operational changes and condition observations',
      'Only those faults that resulted in a complete loss of supply to the whole building',
      'The names of all staff who entered the switchroom, with no other supporting detail',
    ],
    correctAnswer: 1,
    explanation:
      'An electrical switchroom log book is a legal document that provides a chronological record of everything that happens to the installation. It should record all routine maintenance, fault repairs, modifications, test results, operational changes, environmental observations and any concerns. This record is invaluable for fault diagnosis (showing what has changed), compliance evidence, and understanding the history of the installation.',
  },
  {
    id: 6,
    question: 'The Electricity at Work Regulations 1989 require that:',
    options: [
      'A written fault report is submitted to the HSE after every single electrical repair',
      'Every electrical installation in the workplace is rewired completely every ten years',
      'Systems be maintained to prevent danger; records, though not mandated, are how you show this',
      'All maintenance work is carried out only by externally registered specialist contractors',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 4(2) of the Electricity at Work Regulations 1989 requires that electrical systems be maintained so as to prevent danger. While the regulations do not explicitly require written records, HSE Guidance Note HSR25 makes clear that records are the only practical way to demonstrate that a maintenance programme exists and is being followed. In the event of an incident, the absence of records would make it very difficult to demonstrate compliance.',
  },
  {
    id: 7,
    question: 'When documenting a modification made during a fault repair, you should record:',
    options: [
      'Only the date the modification was made, since the technical detail can be recalled later',
      'Nothing at all, provided the modification restores the equipment to normal working order',
      'Only the cost of any new components that were fitted during the course of the modification',
      'What changed and why, who authorised it, and updated as-built drawings and documentation',
    ],
    correctAnswer: 3,
    explanation:
      'Any modification to an electrical installation must be fully documented. The record should include what was changed and why, who authorised the change, the technical justification, the components used, and any test results confirming the modification is safe and effective. Critically, all affected drawings, schematics and documentation must be updated to show the as-built condition. Undocumented modifications are a significant safety risk and a frequent source of confusion during future maintenance.',
  },
  {
    id: 8,
    question:
      'Spare parts used during a fault repair should be recorded in the fault report primarily to:',
    options: [
      'Enable stock replenishment, track reliability, support warranty claims and aid future repairs',
      'Allow the technician to claim overtime payments for the time spent fitting the components',
      'Prove to the operator that genuine manufacturer parts were used on every single occasion',
      'Remove the need to record the diagnostic process and the root cause of the original fault',
    ],
    correctAnswer: 0,
    explanation:
      'Recording parts used serves multiple purposes: it triggers stock replenishment to ensure parts availability for future faults; it tracks which components fail most frequently, supporting reliability improvement and bulk purchasing decisions; it provides evidence for warranty claims against manufacturers; and it ensures that if the same fault recurs, the next technician knows exactly what part to use. Part numbers, manufacturers and batch numbers should all be recorded.',
  },
  {
    id: 9,
    question:
      'A trend analysis of maintenance records showing increasing frequency of overheating faults on a motor would indicate:',
    options: [
      'A normal operating pattern that requires no action at all, because all motors run warm',
      'Progressive deterioration needing investigation (bearing, insulation, ventilation or load) before failure',
      'A measurement error in the temperature sensor reading that can be safely ignored for now',
      'A clear reason to immediately scrap the motor without carrying out any further investigation',
    ],
    correctAnswer: 1,
    explanation:
      'Trend analysis is one of the most valuable outputs of good maintenance documentation. An increasing frequency of similar faults on the same asset indicates progressive deterioration. Identifying this trend early allows planned intervention (bearing replacement, cleaning, load investigation) at a convenient time, avoiding the much greater cost and disruption of an unplanned failure. This is predictive maintenance — using data to anticipate and prevent failures.',
  },
  {
    id: 10,
    question: 'A permit to work system is documented because:',
    options: [
      'It allows higher-risk work to proceed without isolating the equipment beforehand',
      'It records only the parts and the tools that were used during the work activity',
      'The written permit formally records hazards, precautions and authorisation, protecting all parties',
      'It replaces the need for a separate method statement or risk assessment for the task',
    ],
    correctAnswer: 2,
    explanation:
      'A permit to work is a formal, documented safety system used for work that involves significant risk, including electrical work on or near live or recently de-energised systems. The written permit records the hazards identified, the precautions required, the isolation arrangements, the authorisation chain, the time limitations, and the handback procedure. It is a legal document that demonstrates due diligence and provides evidence that proper safety procedures were followed.',
  },
  {
    id: 11,
    question: 'When handing over a completed fault repair to the operator, you should:',
    options: [
      'Leave the area without speaking to the operator at all, provided the equipment is working',
      'Tell the operator only that the job is now finished, with no further explanation offered',
      'Hand over the equipment even with temporary measures still in place, without mentioning them',
      'Explain what was found and repaired, confirm it is safe, demonstrate it, and note any limitations',
    ],
    correctAnswer: 3,
    explanation:
      'A proper handover is the final step in the fault repair process. The operator needs to know what was found, what was done, whether there are any limitations or temporary measures in place, and whether any follow-up work is needed. A verbal explanation supplemented by written documentation (job card, CMMS entry, log book entry) ensures clear communication. The operator should confirm they are satisfied and that the equipment is operating correctly before you leave.',
  },
  {
    id: 12,
    question:
      'The primary benefit of maintaining accurate, detailed maintenance records over several years is:',
    options: [
      'Building an asset history that drives trend analysis, replacement decisions and compliance evidence',
      'Reducing the total number of skilled technicians the organisation needs to employ on site',
      'Allowing the maintenance team to avoid carrying out routine preventive maintenance tasks',
      'Guaranteeing that equipment will simply never fail again once proper records are being kept',
    ],
    correctAnswer: 0,
    explanation:
      'Long-term maintenance records are a strategic asset. They reveal patterns invisible in short-term data — seasonal variations, gradual deterioration, the true reliability of different equipment brands, the effectiveness of maintenance strategies, and the optimal replacement interval for assets. This data supports evidence-based decisions about capital expenditure, maintenance strategy, spare parts stocking, and workforce planning. Organisations with good maintenance data consistently achieve higher equipment availability at lower cost.',
  },
];

const faqs = [
  {
    question: 'What should I include in a fault report?',
    answer:
      'A complete fault report should include: date, time and location; asset identification (number, description, location); who reported the fault and the reported symptoms; your findings on arrival; diagnostic steps taken and test results; root cause identified; repair actions completed; parts used (with part numbers); test results after repair confirming safe operation; time taken; any recommendations for preventing recurrence; and your name and signature. Photographs and sketches are valuable additions where relevant.',
  },
  {
    question: 'How detailed should my CMMS entries be?',
    answer:
      "Detailed enough that a competent technician who was not involved in the repair could understand what happened, what was done, and why. Avoid abbreviations that are not universally understood. Record the full diagnostic process, not just the conclusion. Include test results with values, not just 'passed' or 'failed'. Note environmental conditions if they are relevant. The test of a good CMMS entry is whether it would help someone diagnose the same fault if it recurred in five years' time when you are no longer available to ask.",
  },
  {
    question: 'When is a root cause analysis required?',
    answer:
      "Formally, an RCA should be conducted for significant failures (safety-related, production-critical, high-cost), recurring faults, and any incident that resulted in or could have resulted in injury. Informally, every technician should think about root cause for every fault — even if the formal report is brief. Asking 'why did this fail?' rather than just 'what failed?' is the foundation of reliability improvement. Many organisations set thresholds (e.g., downtime exceeding four hours, repair cost exceeding a set amount) that trigger a formal RCA.",
  },
  {
    question: 'What are the legal requirements for maintenance records in the UK?',
    answer:
      'The Electricity at Work Regulations 1989 require maintenance to prevent danger but do not explicitly mandate records. However, HSE Guidance Note HSR25 and the IET Code of Practice for In-Service Inspection and Testing make clear that records are essential to demonstrate compliance. BS 7671 requires an Electrical Installation Certificate for new work and a Minor Works Certificate or Electrical Installation Condition Report as appropriate. Health and safety legislation (HASAWA 1974, MHSWR 1999) requires risk assessments and safe systems of work to be documented. In practice, the absence of maintenance records creates a presumption of non-compliance.',
  },
  {
    question: 'How long should maintenance records be kept?',
    answer:
      'There is no single statutory retention period for all maintenance records, but general guidance suggests: Electrical Installation Certificates and EICRs should be kept for the life of the installation. Routine maintenance records should be kept for at least the asset life plus a reasonable period (typically six years to align with the limitation period for civil claims). Records related to accidents or incidents should be kept for at least forty years (to cover latent injury claims). CMMS data should be retained indefinitely as it has ongoing value for trend analysis and asset management.',
  },
  {
    question: 'Should I update drawings when I make a modification during a fault repair?',
    answer:
      'Absolutely. Any modification to an electrical installation — whether planned or arising from a fault repair — must be reflected in the as-built drawings and documentation. An undocumented modification is a safety risk: future technicians will rely on drawings that no longer represent reality. At minimum, mark up the affected drawing with the change and date, and arrange for the formal drawing to be updated. Record the modification in the log book, CMMS and on the appropriate electrical certificate (Minor Works Certificate or Amendment to an Electrical Installation Certificate).',
  },
];

const MOETModule4Section3_7 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 4 · Section 4.3 · Subsection 7"
        title="Documentation of Faults"
        backTo="/study-centre/apprentice/m-o-e-t-module4-section3"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Recording, reporting and learning from fault diagnosis outcomes
          </p>

          <TLDR
            points={[
              'Fault reports: record symptoms, diagnosis, repair actions, parts and recommendations.',
              'Root cause: go beyond what failed to why it failed and how to prevent recurrence.',
              'CMMS: computerised records enable trend analysis, scheduling and compliance evidence.',
              'Legal: records demonstrate compliance with EAW Regs, HASAWA and BS 7671.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Complete accurate fault reports that capture the full diagnostic and repair process',
              'Conduct root cause analysis using the 5 Whys and fishbone diagram techniques',
              'Make effective CMMS entries that support future diagnosis and trend analysis',
              'Understand the legal and regulatory requirements for maintenance documentation in the UK',
              'Use maintenance data for trend analysis and reliability improvement',
              'Follow proper handover procedures including verbal explanation and written records',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="Maintenance technician context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Professional practice:</strong> accurate documentation is a core competence,
                not optional paperwork.
              </li>
              <li>
                <strong>Future technicians:</strong> your records help the next person diagnose
                faster and safer.
              </li>
              <li>
                <strong>Continuous improvement:</strong> trend data drives reliability programmes.
              </li>
              <li>
                <strong>ST1426:</strong> documentation and reporting is assessed in the EPA.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>The importance of fault documentation</ContentEyebrow>

          <ConceptBlock title="The importance of fault documentation">
            <p>
              Documentation is the final — and arguably most undervalued — step in the fault
              diagnosis process. A repair that is completed but not documented is a repair that
              benefits no one except the immediate situation. Without a written record, the
              knowledge gained during diagnosis is lost: the next technician who encounters the same
              fault starts from scratch, recurring problems are not identified, compliance cannot be
              demonstrated, and the organisation cannot learn from its maintenance experience.
            </p>
            <p>
              For the maintenance technician, documentation is not an administrative burden — it is
              a professional responsibility. The Electricity at Work Regulations 1989 require that
              electrical systems be maintained so as to prevent danger. While the regulations do not
              explicitly mandate written records, HSE Guidance Note HSR25 makes clear that records
              are the only practical means of demonstrating that a systematic maintenance regime
              exists and is being followed. In the event of an incident, the quality of your
              maintenance records will be scrutinised.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Why fault documentation matters">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Future diagnosis:</strong> a well-documented fault repair enables the next
                technician to diagnose a similar or recurring fault far more quickly.
              </li>
              <li>
                <strong>Pattern recognition:</strong> records reveal trends — increasing failure
                rates, seasonal patterns, recurring root causes — that are invisible without data.
              </li>
              <li>
                <strong>Compliance evidence:</strong> demonstrates adherence to the Electricity at
                Work Regulations, HASAWA 1974, and BS 7671.
              </li>
              <li>
                <strong>Legal protection:</strong> provides evidence of due diligence in the event
                of an incident, claim or prosecution.
              </li>
              <li>
                <strong>Asset management:</strong> supports capital replacement decisions by
                providing evidence of equipment condition and reliability.
              </li>
              <li>
                <strong>Knowledge transfer:</strong> preserves the diagnostic knowledge of
                experienced technicians for the benefit of the wider team.
              </li>
            </ul>
            <p>
              Poor maintenance documentation has real consequences. A technician spends two hours
              diagnosing a fault that a colleague fixed last month but did not record — that is two
              hours of lost productivity and extended downtime. A recurring fault goes unrecognised
              because each occurrence is documented differently or not at all. An undocumented
              modification causes a safety incident because the next technician relied on drawings
              that no longer represent reality. Insurance claims are rejected because there is no
              evidence of a maintenance regime. These are not hypothetical scenarios — they happen
              regularly in organisations with inadequate documentation practices.
            </p>
            <p>
              <strong>Key point:</strong> the best time to complete a fault report is immediately
              after the repair, while the details are fresh. A report completed two days later will
              inevitably be less accurate and less complete than one written on the spot. Make
              documentation a habit, not an afterthought.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Fault reports, job cards and log books</ContentEyebrow>

          <ConceptBlock title="Fault reports, job cards and log books">
            <p>
              The fault report is the primary document that records the details of a fault diagnosis
              and repair. Different organisations use different formats — paper job cards, digital
              forms, CMMS work orders — but the essential content is the same. A good fault report
              tells the complete story: what was reported, what was found, what was done, and what
              should happen next.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Essential content of a fault report">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Section</th>
                    <th className="py-2 font-medium text-white">Details to record</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Identification</td>
                    <td className="py-2">
                      Date, time, job/work order number, asset number, asset description, location
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Reported fault</td>
                    <td className="py-2">
                      Who reported it, when, what symptoms they described, any relevant context
                      (time of day, conditions, what was happening)
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Findings on arrival</td>
                    <td className="py-2">
                      State of equipment when you arrived, observable symptoms, any differences from
                      the reported description
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Diagnostic process</td>
                    <td className="py-2">
                      Tests performed, measurements taken (with values), areas inspected, sequence
                      of diagnostic steps
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Root cause</td>
                    <td className="py-2">
                      Identified cause of the fault, how it was confirmed, contributing factors
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Repair actions</td>
                    <td className="py-2">
                      What was replaced, repaired or adjusted; method used; any temporary measures
                      in place
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Parts used</td>
                    <td className="py-2">
                      Part numbers, descriptions, quantities, manufacturers, batch numbers where
                      relevant
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Post-repair testing</td>
                    <td className="py-2">
                      Tests performed to confirm repair, results obtained, confirmation of safe
                      operation
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Recommendations</td>
                    <td className="py-2">
                      Preventive actions, follow-up work required, modifications suggested, PM
                      schedule changes
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">Sign-off</td>
                    <td className="py-2">
                      Technician name, signature, date, time completed, total time on task, handover
                      confirmation
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Log books and site records">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Switchroom log book:</strong> a bound, sequential record of all work,
                observations and events in the switchroom — a legal document that should never have
                pages removed.
              </li>
              <li>
                <strong>Plant room log:</strong> records operational parameters, abnormal
                conditions, maintenance visits and any concerns.
              </li>
              <li>
                <strong>Permit to work file:</strong> archived permits provide evidence of safe
                working practices and isolation procedures.
              </li>
              <li>
                <strong>Test record file:</strong> periodic test results for the installation,
                enabling comparison over time.
              </li>
              <li>
                <strong>Modification register:</strong> a chronological record of all modifications,
                with references to drawings, certificates and authorisations.
              </li>
            </ul>
            <p>
              <strong>Professional tip:</strong> write your fault report as if the reader is a
              competent technician who has never seen this installation before. Avoid unexplained
              abbreviations. Be specific about locations, component references and measured values.
              A report that states &quot;fixed loose wire in panel&quot; is far less useful than
              &quot;Re-terminated L3 supply conductor at contactor KM4 terminal 1 in MCC Panel 3 —
              found loose with evidence of arcing and overheating. Torqued to 2.5 Nm per
              manufacturer specification.&quot;
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Root cause analysis techniques</ContentEyebrow>

          <ConceptBlock title="Root cause analysis techniques">
            <p>
              Root cause analysis (RCA) is the discipline of investigating not just what failed, but
              why it failed. A standard fault repair addresses the immediate symptom: the motor
              bearing failed, so the bearing was replaced. Root cause analysis asks deeper
              questions: why did the bearing fail? Was it the wrong type? Was it poorly lubricated?
              Was the motor misaligned? Was there excessive vibration from an external source? Only
              by identifying and addressing the root cause can you prevent the fault from recurring.
            </p>
          </ConceptBlock>

          <ConceptBlock title="The 5 Whys technique">
            <p>
              The 5 Whys is a simple, effective technique that drills down from the symptom to the
              root cause by repeatedly asking &quot;why?&quot; Each answer becomes the basis for the
              next question. While the name suggests five iterations, the actual number varies — the
              key is to keep asking until you reach a cause that can be addressed with a systemic
              action.
            </p>
            <div className="space-y-2 rounded bg-white/5 p-3">
              <p>
                <strong className="text-elec-yellow/80">Problem:</strong> Motor overload protection
                tripped repeatedly on conveyor drive
              </p>
              <p>
                <strong className="text-elec-yellow/80">Why 1:</strong> Motor drawing excessive
                current → bearing had seized
              </p>
              <p>
                <strong className="text-elec-yellow/80">Why 2:</strong> Why did the bearing seize? →
                Lubrication had failed — bearing was dry
              </p>
              <p>
                <strong className="text-elec-yellow/80">Why 3:</strong> Why had lubrication failed?
                → Grease nipple was blocked and inaccessible
              </p>
              <p>
                <strong className="text-elec-yellow/80">Why 4:</strong> Why was the grease nipple
                blocked and inaccessible? → Motor mounting position makes the grease point
                unreachable without scaffolding
              </p>
              <p>
                <strong className="text-elec-yellow/80">Why 5:</strong> Why has this not been
                addressed? → No preventive maintenance task exists for this bearing point
              </p>
              <p className="border-t border-white/10 pt-2">
                <strong className="text-emerald-400">Root cause:</strong> Inaccessible grease point
                not included in PM schedule
              </p>
              <p>
                <strong className="text-emerald-400">Corrective actions:</strong> (1) Fit remote
                grease line to accessible location (2) Add to PM schedule at three-monthly interval
                (3) Audit other motors for similar access issues
              </p>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Fishbone (Ishikawa) diagram">
            <p>
              For more complex faults with multiple potential causes, the fishbone diagram provides
              a structured framework. The fault (effect) is placed at the head of the fish, and
              potential causes are categorised along the bones under standard headings:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Man (People):</strong> operator error, inadequate training, incorrect
                procedure followed, fatigue.
              </li>
              <li>
                <strong>Machine (Equipment):</strong> component wear, design weakness, inadequate
                rating, age.
              </li>
              <li>
                <strong>Method (Process):</strong> incorrect operating procedure, inadequate
                maintenance strategy, poor work instructions.
              </li>
              <li>
                <strong>Material (Components):</strong> substandard parts, incorrect specification,
                material degradation, counterfeit components.
              </li>
              <li>
                <strong>Measurement (Data):</strong> incorrect calibration, wrong instrument used,
                misread results.
              </li>
              <li>
                <strong>Mother Nature (Environment):</strong> temperature, humidity, contamination,
                vibration, EMC.
              </li>
            </ul>
            <p>
              Analysis of maintenance records across industrial sites consistently shows that the
              most common root causes of electrical faults are: inadequate preventive maintenance
              (connections not re-torqued, filters not cleaned, insulation not tested),
              environmental factors not addressed (heat, moisture, contamination), design weaknesses
              (undersized components, inadequate IP rating), and human factors (incorrect
              installation, wrong settings, procedure not followed). Recognising these categories
              helps you focus your RCA on the most probable areas.
            </p>
            <p>
              <strong>Key point:</strong> the purpose of root cause analysis is not to assign blame
              — it is to prevent recurrence. Focus on systemic causes (processes, procedures,
              design) rather than individual actions. A finding of &quot;operator error&quot; is not
              a root cause — it should prompt further questions: why did the operator make that
              error? Was the procedure unclear? Was training inadequate? Was the equipment poorly
              designed?
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>CMMS and digital maintenance records</ContentEyebrow>

          <ConceptBlock title="CMMS and digital maintenance records">
            <p>
              Computerised Maintenance Management Systems (CMMS) have transformed maintenance
              documentation from static paper files into dynamic, searchable databases that support
              analysis, planning and decision-making. As a maintenance technician, you will be
              expected to make accurate and detailed CMMS entries as part of your daily work. The
              quality of the data you enter directly determines the value the system provides to the
              organisation.
            </p>
          </ConceptBlock>

          <ConceptBlock title="CMMS core functions for maintenance technicians">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Work order management:</strong> receiving, recording and closing out fault
                repair and preventive maintenance work orders.
              </li>
              <li>
                <strong>Asset history:</strong> viewing the complete maintenance history of any
                asset — previous faults, repairs, modifications, test results.
              </li>
              <li>
                <strong>Spare parts:</strong> recording parts used, checking stock availability, and
                triggering reorder when levels drop.
              </li>
              <li>
                <strong>Failure coding:</strong> classifying faults by type, cause and location
                using standardised codes — essential for trend analysis.
              </li>
              <li>
                <strong>Planned maintenance:</strong> scheduling and recording preventive
                maintenance tasks at defined intervals.
              </li>
              <li>
                <strong>Document management:</strong> linking drawings, manuals, test certificates
                and photographs to asset records.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Writing effective CMMS entries">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Be specific:</strong> &quot;Re-terminated L1 at contactor KM3, terminal T1 —
                found loose with discolouration. Torqued to 2.5 Nm&quot; is far better than
                &quot;tightened connection&quot;.
              </li>
              <li>
                <strong>Include measurements:</strong> &quot;Insulation resistance L1-E: 0.8 M ohm
                (minimum acceptable 1.0 M ohm per BS 7671)&quot; — values provide evidence and
                enable trend comparison.
              </li>
              <li>
                <strong>Use correct failure codes:</strong> accurate coding enables the CMMS to
                produce meaningful reports on failure types and trends.
              </li>
              <li>
                <strong>Record the diagnostic process:</strong> not just the conclusion — the steps
                taken and tests performed are valuable for future reference.
              </li>
              <li>
                <strong>Add recommendations:</strong> if you identified a preventive action, record
                it as a recommendation — this drives continuous improvement.
              </li>
              <li>
                <strong>Attach photographs:</strong> where relevant, attach photographs to the work
                order — a picture of a burnt-out contactor tells a story that words cannot.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Trend analysis from CMMS data">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Increasing failure frequency on specific assets.</li>
              <li>Common failure modes across asset types.</li>
              <li>Seasonal or environmental patterns.</li>
              <li>Mean time between failures (MTBF).</li>
              <li>Mean time to repair (MTTR).</li>
              <li>Cost per failure for replacement planning.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Key performance indicators">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Planned vs reactive maintenance ratio.</li>
              <li>PM completion rate and compliance.</li>
              <li>Equipment availability percentage.</li>
              <li>Repeat failure rate (same fault, same asset).</li>
              <li>Work order backlog and aging.</li>
              <li>Spare parts usage and stock turns.</li>
            </ul>
            <p>
              <strong>Professional standard:</strong> the quality of your CMMS entries reflects your
              professionalism. Supervisors, engineers and managers read these entries. Future
              technicians rely on them. Auditors examine them. Take the same pride in your
              documentation as you do in your technical work — both are essential elements of
              professional maintenance practice.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Handover, communication and continuous improvement</ContentEyebrow>

          <ConceptBlock title="Handover, communication and continuous improvement">
            <p>
              Documentation does not exist in isolation — it is part of a broader communication
              process that includes verbal handover, team briefings, shift reports and management
              reporting. The best fault report in the world is wasted if it sits in a filing cabinet
              and no one reads it. Effective maintenance organisations use their documentation to
              drive continuous improvement: learning from every fault, identifying systemic
              weaknesses, and progressively improving equipment reliability.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Handover procedure after fault repair">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Verbal briefing:</strong> explain to the operator and/or supervisor what was
                found, what was done, and whether there are any limitations or follow-up
                requirements.
              </li>
              <li>
                <strong>Demonstration:</strong> where appropriate, demonstrate that the equipment is
                operating correctly and safely.
              </li>
              <li>
                <strong>Written confirmation:</strong> complete the fault report, CMMS entry and any
                relevant log book entries before leaving the site.
              </li>
              <li>
                <strong>Safety confirmation:</strong> confirm that all safety systems (guards,
                interlocks, emergency stops) are reinstated and functional.
              </li>
              <li>
                <strong>Permit cancellation:</strong> if a permit to work was issued, follow the
                formal cancellation and handback procedure.
              </li>
              <li>
                <strong>Outstanding work:</strong> if any follow-up work is required, record it as a
                new work order or recommendation — do not leave it to memory.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Using documentation for continuous improvement">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Failure review meetings:</strong> regular review of significant faults and
                their root causes — sharing lessons learned across the team.
              </li>
              <li>
                <strong>Reliability-centred maintenance:</strong> using failure data to optimise PM
                frequencies — increase intervals where no faults occur, decrease where faults are
                frequent.
              </li>
              <li>
                <strong>Design-out maintenance:</strong> where recurring faults indicate a design
                weakness, proposing modifications to eliminate the fault mode.
              </li>
              <li>
                <strong>Training needs:</strong> analysis of fault records may reveal knowledge gaps
                that can be addressed through targeted training.
              </li>
              <li>
                <strong>Spare parts optimisation:</strong> usage data from fault records supports
                decisions about which parts to stock, in what quantity, and from which supplier.
              </li>
            </ul>
            <p>
              Any modification made to an electrical installation — whether planned or arising from
              a fault repair — must be fully documented and reflected in the as-built drawings. An
              undocumented modification is a serious safety risk. The next technician may isolate
              the wrong circuit, apply the wrong test parameters, or misunderstand the circuit
              operation because the documentation does not match reality. At minimum, a modification
              requires: a description of the change, technical justification, authorisation, updated
              drawings, an appropriate electrical certificate (Minor Works or Amendment), and a CMMS
              record. Many organisations also require a formal Management of Change (MOC) process
              for significant modifications.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Shift and team communication">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Shift handover:</strong> brief the incoming shift on any outstanding faults,
                temporary repairs in place, or equipment operating under restrictions.
              </li>
              <li>
                <strong>Team toolbox talks:</strong> share significant fault findings with the team
                so everyone benefits from the diagnostic experience.
              </li>
              <li>
                <strong>Escalation:</strong> if a fault reveals a safety concern or a systemic issue
                beyond your authority to resolve, escalate it in writing to the appropriate person.
              </li>
              <li>
                <strong>Management reporting:</strong> provide accurate data for KPI reports,
                downtime records and maintenance cost tracking.
              </li>
            </ul>
            <p className="italic">
              <strong>Note:</strong> as an apprentice working towards your ST1426 End Point
              Assessment, your ability to document faults accurately and communicate effectively
              will be directly assessed. The EPA professional discussion will include questions
              about how you record and report maintenance activities. Developing good documentation
              habits now — during your apprenticeship — will serve you throughout your career and
              distinguish you as a thorough, professional technician.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'Fault report — complete for every repair.',
              'CMMS entry — searchable, coded, detailed.',
              'Log book — chronological site record.',
              'Root cause analysis — for significant faults.',
              'Modification register — every change recorded.',
              'Photographic evidence — conditions found.',
              'Electricity at Work Regulations 1989 (Reg 4(2)).',
              'HSE Guidance Note HSR25.',
              'BS 7671 — Electrical Installation Certificates.',
              'HASAWA 1974 — general duties.',
              'IET Code of Practice — In-Service Testing.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section3-6')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Intermittent Faults and Environmental Factors
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section4-1')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Safe Isolation and Verification
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule4Section3_7;
