/**
 * MOET · Module 6 · Section 3 · Subsection 4 — Traceability and Compliance
 * Requirements
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option.
 *
 * KSBs covered: no verified ST1426 KSB statement list for Module 6 was
 * available at conversion time (Modules 1–4 have verified lists; Module 6
 * does not). Rather than invent statements or borrow another module's list,
 * this header omits specific KSB quotes. Flagged for follow-up once a
 * verified Module 6 KSB list exists.
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

const TITLE = 'Traceability and Compliance Requirements - MOET Module 6 Section 3.4';
const DESCRIPTION =
  'Audit trails, regulatory compliance, traceability documentation, record retention and quality management for electrical maintenance technicians under ST1426.';

const quickCheckQuestions = [
  {
    id: 'traceability-purpose',
    question: "What does 'traceability' mean in the context of maintenance records?",
    options: [
      "The ability to trace the complete history of an asset's maintenance back to specific dates, personnel and documentation",
      'Keeping all maintenance records in a single locked filing cabinet on site',
      'Tracking the physical location of maintenance tools and spare parts in the stores',
      'Recording only the final outcome of each job without the intermediate steps',
    ],
    correctIndex: 0,
    explanation:
      'Traceability means being able to trace every maintenance intervention back to when it was done, who did it, what was found, what action was taken, and what documentation was produced. It creates an unbroken chain of evidence demonstrating that maintenance was properly carried out.',
  },
  {
    id: 'audit-trail',
    question: 'An audit trail in a CMMS provides:',
    options: [
      'A summary report of total maintenance costs for the financial year',
      'A chronological record of all data entries, modifications and approvals, showing who did what and when',
      'An automatic schedule of upcoming planned maintenance tasks',
      'A backup copy of records stored on a separate server',
    ],
    correctIndex: 1,
    explanation:
      'An audit trail traces every action — who created a record, who modified it, when changes were made, and what approvals were given. Essential for regulatory compliance and incident investigation.',
  },
  {
    id: 'retention-period',
    question: 'Under BS 7671, electrical installation records should be retained for:',
    options: [
      'A fixed period of 6 years from the date of issue',
      'The life of the installation — available for inspection at all times',
      'Until the next periodic inspection is completed',
      'A minimum of 12 months after the installation is energised',
    ],
    correctIndex: 1,
    explanation:
      'BS 7671 Regulation 132.13 requires records to be maintained and available for inspection throughout the life of the installation. Previous inspection records should also be retained for comparison during subsequent periodic inspections.',
  },
  {
    id: 'calibration-trace',
    question: 'Why must test instrument calibration be traceable to national standards?',
    options: [
      'It reduces the frequency at which instruments need to be recalibrated',
      'It allows instruments from different manufacturers to share the same leads',
      'It removes the need to prove voltage indicators before and after use',
      'Traceable calibration ensures measurement accuracy, legal defensibility of test results, and GS38/BS 7671 compliance',
    ],
    correctIndex: 3,
    explanation:
      'Traceable calibration ensures measurements are accurate and legally defensible. If test results are challenged — in court, by an insurer, or by an HSE inspector — you must demonstrate the instrument was calibrated to a traceable standard at the time of testing.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Traceability in maintenance means:',
    options: [
      'Storing records only at head office so they cannot be tampered with on site',
      'Tracing every maintenance activity back to specific dates, personnel, procedures and documentation',
      'Recording maintenance activities once a month in a single summary log',
      'Tracking the movement of spare parts between the stores and the plant',
    ],
    correctAnswer: 1,
    explanation:
      'Traceability creates a complete chain of evidence linking every activity to dates, personnel, procedures, parts used, and documentation.',
  },
  {
    id: 2,
    question: 'A regulatory compliance audit typically checks for:',
    options: [
      'Whether the maintenance team met its productivity and cost targets',
      'How quickly faults are reported through the helpdesk system',
      'Evidence that maintenance was planned, executed by competent persons, documented accurately, and statutory requirements met',
      'Whether spare parts are sourced from approved suppliers only',
    ],
    correctAnswer: 2,
    explanation:
      'Auditors check that maintenance was systematically planned, carried out by competent persons, properly documented, and all statutory requirements met.',
  },
  {
    id: 3,
    question: 'EAWR 1989 requires:',
    options: [
      'Test instruments to be calibrated by the manufacturer every six months',
      'All electrical work to be notified to the local authority in advance',
      'Each technician to hold a current first-aid certificate',
      'Electrical systems maintained to prevent danger, with records providing evidence of compliance',
    ],
    correctAnswer: 3,
    explanation:
      'EAWR Reg 4(2) requires systems to be maintained to prevent danger. HSE Guidance Note HSR25 makes clear that records are the primary means of demonstrating compliance.',
  },
  {
    id: 4,
    question: 'Document retention policies ensure:',
    options: [
      'Records are available for the required period for audits, investigations and legal proceedings',
      'Records are deleted as soon as a job is signed off to save storage',
      'Only senior managers may access historic maintenance records',
      'Paper records are always preferred over digital copies',
    ],
    correctAnswer: 0,
    explanation:
      'Retention policies ensure records are available for regulatory audits, incident investigations, legal proceedings, and operational decisions throughout the required period.',
  },
  {
    id: 5,
    question: 'Calibration certificates for test instruments should be:',
    options: [
      'Discarded once the instrument has been recalibrated',
      'Filed in the quality system with instrument identity, calibration date, due date and traceability reference',
      'Stored only by the calibration laboratory, not the user',
      'Combined into a single certificate covering all instruments on site',
    ],
    correctAnswer: 1,
    explanation:
      'Certificates must be filed and linked to the specific instrument by serial number, showing calibration date, next due date, and traceability chain.',
  },
  {
    id: 6,
    question: 'ISO 55001 relates to:',
    options: [
      'Information security management for digital records',
      'Occupational health and safety management systems',
      'Asset management systems — managing assets throughout their lifecycle',
      'Environmental management and carbon reporting',
    ],
    correctAnswer: 2,
    explanation:
      'ISO 55001 provides a framework for managing physical assets effectively throughout their lifecycle, including maintenance documentation and traceability.',
  },
  {
    id: 7,
    question: 'A non-conformance in a quality audit means:',
    options: [
      'An improvement opportunity that is optional to act on',
      'A record that has been archived after its retention period',
      'A task that has been completed ahead of schedule',
      'A requirement has not been met, and corrective action is needed',
    ],
    correctAnswer: 3,
    explanation:
      'A non-conformance identifies where a requirement has not been met. It requires corrective action within a defined timescale and must be formally closed out.',
  },
  {
    id: 8,
    question: 'Version control of maintenance procedures ensures:',
    options: [
      'Everyone works to the current, approved version and obsolete versions are withdrawn',
      'Procedures are reviewed only when an incident occurs',
      'Each technician keeps a personal copy of every procedure',
      'Older versions are retained for daily use alongside the latest one',
    ],
    correctAnswer: 0,
    explanation:
      'Version control ensures only the current, approved version is in use. Obsolete versions must be withdrawn to prevent following outdated procedures.',
  },
  {
    id: 9,
    question: 'An EICR C2 code means:',
    options: [
      'Improvement recommended but not urgent',
      'Potentially dangerous — urgent remedial action required',
      'Danger present, risk of injury, immediate action required',
      'Further investigation required without delay',
    ],
    correctAnswer: 1,
    explanation:
      'C2 means potentially dangerous with urgent remedial action required. This must be communicated to the duty holder and tracked to completion.',
  },
  {
    id: 10,
    question: 'A document management system (DMS) in maintenance:',
    options: [
      'Automatically carries out planned maintenance tasks',
      'Replaces the need for competent maintenance technicians',
      'Controls, stores, organises and provides access to all documentation in a structured, searchable system',
      'Stores only completed certificates, not work-in-progress records',
    ],
    correctAnswer: 2,
    explanation:
      'A DMS provides structured storage, version control, access management, and search capability for all documentation with full audit trail.',
  },
  {
    id: 11,
    question: 'Under ST1426, demonstrating compliance awareness means:',
    options: [
      'Memorising the full text of every applicable regulation',
      'Delegating all compliance responsibility to the quality department',
      'Completing maintenance tasks as quickly as possible',
      'Understanding which regulations apply, how to access them, and how daily practices ensure compliance',
    ],
    correctAnswer: 3,
    explanation:
      'ST1426 requires understanding the regulatory framework, knowing which regulations apply, and demonstrating compliance through daily practices.',
  },
  {
    id: 12,
    question: 'If a maintenance record contains an error, the correct procedure is to:',
    options: [
      'Make a clear, dated correction preserving the original entry and audit trail',
      'Erase the error completely so the record reads cleanly',
      'Create a fresh record and destroy the original',
      'Leave the error and note it verbally to the supervisor',
    ],
    correctAnswer: 0,
    explanation:
      'Errors must be corrected transparently with the original entry preserved, the correction dated and signed, and the reason recorded.',
  },
];

const faqs = [
  {
    question: 'How long must I keep electrical test certificates?',
    answer:
      'Electrical test certificates should be retained for the life of the installation. Most organisations retain certificates for a minimum of 25 years or until the installation is permanently decommissioned. Previous certificates are valuable for comparison during subsequent periodic inspections.',
  },
  {
    question: 'What is the difference between compliance and conformance?',
    answer:
      'Compliance refers to meeting statutory (legal) requirements such as EAWR 1989. Conformance refers to meeting requirements of a standard such as BS 7671 or ISO 9001. Non-compliance can result in criminal prosecution; non-conformance results in audit findings.',
  },
  {
    question: 'Do I need to keep records of failed tests?',
    answer:
      'Absolutely. Failed results demonstrate thorough testing, fault identification, and corrective action. Selectively recording only passes is dishonest and could constitute fraud. All results, including failures and subsequent retests, must be recorded.',
  },
  {
    question: 'What happens during a regulatory audit?',
    answer:
      'An auditor selects sample assets and traces their maintenance history. They check planned maintenance was on schedule, competent persons performed the work, findings were documented, corrective actions tracked to completion, and instruments were calibrated.',
  },
  {
    question: 'Is an electronic signature legally equivalent to a wet signature?',
    answer:
      'Yes, under the Electronic Communications Act 2000 and eIDAS Regulation, electronic signatures are legally valid. The system must provide adequate identity verification and audit trail. Some specific documents may still require wet signatures.',
  },
];

const MOETModule6Section3_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 6 · Section 6.3 · Subsection 4"
        title="Traceability and Compliance Requirements"
        backTo="/study-centre/apprentice/m-o-e-t-module6-section3"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Audit trails, regulatory compliance and documentation standards for electrical
            maintenance
          </p>

          <TLDR
            points={[
              'Traceability: complete history linked to dates, personnel and documents',
              'Audit trails: who did what, when, and what was approved',
              'Retention: records kept for the life of the installation',
              'Calibration: test instruments traceable to national standards',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain the importance of traceability in maintenance documentation',
              'Describe audit trail requirements for digital and paper records',
              'Apply record retention requirements for electrical installations',
              'Understand calibration traceability for test instruments',
              'Navigate regulatory compliance requirements for maintenance records',
              'Demonstrate compliance awareness as required by ST1426',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="Electrical maintenance context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>EAWR 1989:</strong> records demonstrate Reg 4(2) compliance
              </li>
              <li>
                <strong>BS 7671:</strong> Reg 132.13 requires maintained records
              </li>
              <li>
                <strong>EICR codes:</strong> C1/C2/C3/FI tracked to completion
              </li>
              <li>
                <strong>ST1426:</strong> compliance awareness assessed in EPA
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>Understanding traceability</ContentEyebrow>

          <ConceptBlock title="Understanding traceability">
            <p>
              Traceability in maintenance means the ability to trace every intervention on an asset
              back to specific dates, personnel, procedures, parts and documentation. It creates an
              unbroken chain of evidence that proves maintenance was carried out properly by
              competent people using correct methods and materials. Without traceability,
              maintenance records are little more than a list of activities — they cannot answer the
              critical questions that arise during audits, investigations, or legal proceedings.
            </p>
            <p>
              The concept of traceability extends beyond simply recording what was done. It
              encompasses who did it (verified competence), when it was done (exact date and time),
              how it was done (which procedure was followed), what was used (parts with batch
              numbers, instruments with calibration status), what was found (detailed findings and
              measurements), and what was decided (actions taken and rationale). Each link in this
              chain must be documented and verifiable.
            </p>
          </ConceptBlock>

          <ConceptBlock title="The traceability chain">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Who:</strong> named, competent technician with verifiable qualifications
              </li>
              <li>
                <strong>What:</strong> specific maintenance task with detailed description of work
                performed
              </li>
              <li>
                <strong>When:</strong> date and time of intervention, duration of work
              </li>
              <li>
                <strong>Where:</strong> exact asset identification, location code, circuit reference
              </li>
              <li>
                <strong>How:</strong> procedure followed, tools and instruments used (with
                calibration status)
              </li>
              <li>
                <strong>Results:</strong> findings, measurements, test results, condition assessment
              </li>
              <li>
                <strong>Materials:</strong> parts used with part numbers, batch numbers where
                applicable
              </li>
              <li>
                <strong>Outcome:</strong> actions taken, verification results, outstanding items
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="When traceability fails"
            whatHappens={
              <>
                In an HSE investigation following a workplace electrical fatality, investigators
                found maintenance records were incomplete — no technician name, no calibration
                references, no test results. The organisation could not demonstrate maintenance had
                been properly carried out. The absence of traceable records was a significant
                aggravating factor in the prosecution.
              </>
            }
            doInstead={
              <>
                The lesson is clear: if it is not documented with full traceability, it effectively
                did not happen.
              </>
            }
          />

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Audit trails and record integrity</ContentEyebrow>

          <ConceptBlock title="Audit trails and record integrity">
            <p>
              An audit trail shows every action taken on a record — who created it, who modified it,
              when, and what approvals were given. In digital systems, audit trails are automatic
              and tamper-proof. In paper systems, they rely on signing, dating and sequential
              numbering. The integrity of the audit trail determines whether the records can be
              relied upon as evidence of compliance.
            </p>
            <p>
              Record integrity means that the records accurately represent what actually happened,
              have not been altered without authorisation, and can be trusted by anyone who reads
              them. This is not merely an administrative concern — it is a legal and ethical
              requirement. Records that lack integrity undermine the entire maintenance management
              system and expose the organisation and individual technicians to legal liability.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Maintaining record integrity">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Never alter records retrospectively</strong> without a clear, dated
                correction and explanation
              </li>
              <li>
                <strong>Never backdate entries</strong> — if a record is late, note the actual date
                of entry alongside the date of the work
              </li>
              <li>
                <strong>Never destroy records</strong> without authorisation and in accordance with
                retention policy
              </li>
              <li>
                <strong>Paper records:</strong> use indelible ink, single-line strikethroughs for
                corrections, initial and date all changes
              </li>
              <li>
                <strong>Digital records:</strong> use the system's formal amendment process; do not
                create new records to replace originals
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Digital vs paper audit trails">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Aspect</th>
                    <th className="py-2 pr-4 font-medium text-white">Digital</th>
                    <th className="py-2 font-medium text-white">Paper</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Creation</td>
                    <td className="py-2 pr-4">Automatic timestamp and user ID</td>
                    <td className="py-2">Manual date and signature</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Modifications</td>
                    <td className="py-2 pr-4">All changes logged automatically</td>
                    <td className="py-2">Depends on discipline of the writer</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Tamper evidence</td>
                    <td className="py-2 pr-4">Difficult to alter without detection</td>
                    <td className="py-2">Physical alterations may be visible</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">Retrieval</td>
                    <td className="py-2 pr-4">Full history retrievable instantly</td>
                    <td className="py-2">Requires physical access to files</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Regulatory framework and retention</ContentEyebrow>

          <ConceptBlock title="Regulatory framework and retention">
            <p>
              Multiple regulations impose requirements on maintenance record keeping. Understanding
              these ensures your records meet the standard expected during audits and
              investigations. The regulatory framework is not a bureaucratic inconvenience — it
              exists because inadequate maintenance records have been a factor in serious incidents,
              and the records you create today may be scrutinised years or decades from now.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Regulation, requirement and retention">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Regulation</th>
                    <th className="py-2 pr-4 font-medium text-white">Requirement</th>
                    <th className="py-2 font-medium text-white">Retention</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">EAWR 1989</td>
                    <td className="py-2 pr-4">Evidence of maintenance to prevent danger</td>
                    <td className="py-2">Life of installation</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">BS 7671</td>
                    <td className="py-2 pr-4">Records maintained and available for inspection</td>
                    <td className="py-2">Life of installation</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">PUWER 1998</td>
                    <td className="py-2 pr-4">Maintenance log kept up to date</td>
                    <td className="py-2">Life of equipment</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">LOLER 1998</td>
                    <td className="py-2 pr-4">Examination records for lifting equipment</td>
                    <td className="py-2">Next exam + 2 years</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">DSEAR 2002</td>
                    <td className="py-2 pr-4">Records of ATEX equipment maintenance</td>
                    <td className="py-2">Life of equipment</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">MHSWR 1999</td>
                    <td className="py-2 pr-4">Risk assessments reviewed after incidents</td>
                    <td className="py-2">40 years (health surveillance)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Practical retention guidance">
            <p>
              Where no specific retention period is mandated, a good rule is to retain all
              maintenance records for the life of the asset plus a reasonable period after
              decommissioning (typically 6 years, which aligns with the limitation period for civil
              claims). Digital storage makes long-term retention practical and cost-effective. Never
              destroy records without written authorisation and a documented retention policy.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Calibration traceability and quality management</ContentEyebrow>

          <ConceptBlock title="Calibration traceability and quality management">
            <p>
              Every measurement is only as reliable as the instrument used. Calibration traceability
              ensures instruments are accurate and readings can be defended if challenged. This is
              not just a technical requirement — it is fundamental to the legal validity of your
              test results and the credibility of your professional work.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Calibration requirements">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>All test instruments must have a current calibration certificate</li>
              <li>Calibration must be traceable to national standards (UKAS in the UK)</li>
              <li>Never use an out-of-calibration instrument for certification testing</li>
              <li>GS38 requires voltage indicators proved before and after use</li>
              <li>Records must link specific test results to the instrument (by serial number)</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Quality standards">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>ISO 9001 — Quality management</li>
              <li>ISO 55001 — Asset management</li>
              <li>ISO 17025 — Calibration lab competence</li>
              <li>PAS 55 — Asset management specification</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Your role as a technician">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Check calibration dates before use</li>
              <li>Record instrument serial numbers on test records</li>
              <li>Report suspected instrument inaccuracy</li>
              <li>Follow calibration management procedure</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Building a compliance culture</ContentEyebrow>

          <ConceptBlock title="Building a compliance culture">
            <p>
              Compliance is not a separate activity bolted onto maintenance work — it should be
              embedded in every task you perform. A compliance culture means that every technician
              understands why traceability matters, takes personal responsibility for the quality of
              their records, and views documentation as an integral part of the job rather than an
              administrative burden.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Practical steps for every technician">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Document as you work:</strong> record findings and actions at the point of
                work, not from memory later
              </li>
              <li>
                <strong>Be specific:</strong> record actual values, part numbers, and instrument
                serial numbers — not vague summaries
              </li>
              <li>
                <strong>Be honest:</strong> record what you actually found, including problems and
                limitations
              </li>
              <li>
                <strong>Follow procedures:</strong> use the correct forms, follow the defined
                process, get the required sign-offs
              </li>
              <li>
                <strong>Raise concerns:</strong> if you identify compliance gaps, report them — do
                not work around them
              </li>
              <li>
                <strong>Continuous improvement:</strong> suggest improvements to documentation
                processes where you see opportunities
              </li>
            </ul>
            <p>
              <strong>ST1426 link:</strong> understanding traceability and compliance demonstrates
              the professional behaviours and regulatory awareness that are directly assessed in the
              EPA professional discussion. Showing that you understand not just what to do, but why
              the documentation matters, distinguishes you as a competent, professional technician.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'Traceability: complete history linked to dates, personnel and documents.',
              'Audit trails: who did what, when, and what was approved.',
              'Retention: records kept for the life of the installation.',
              'Calibration: test instruments traceable to national standards.',
              'EAWR 1989: records demonstrate Reg 4(2) compliance.',
              'BS 7671: Reg 132.13 requires maintained records.',
              'EICR codes: C1/C2/C3/FI tracked to completion.',
              'ST1426: compliance awareness assessed in EPA.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module6-section3-3')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Digital vs Paper-Based Reporting
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module6-section3-5')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Using Maintenance Management Systems
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule6Section3_4;
