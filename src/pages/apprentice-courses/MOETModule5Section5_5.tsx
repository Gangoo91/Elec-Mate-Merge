/**
 * MOET · Module 5 · Section 5 · Subsection 5 — Documenting Calibration
 * Results
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option.
 *
 * KSBs covered, quoted rather than numbered: the IfATE/Skills England API
 * publishes these statements without their K/S/B codes, and the published
 * numbering has not been verified against a primary source — so do not invent
 * codes here. The conversion brief for this course does not list a Module 5
 * KSB set, so only statements that already appear verbatim in the brief's
 * verified lists for other modules — and that genuinely fit this page's
 * content — are used here.
 *   Knowledge  · "Documentation requirements: documentation control,
 *                 auditable records."
 *   Skills     · "Record information."
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt. The original
 * placed its four InlineCheck questions out of numeric order (0, 3, 1, 2)
 * because each pairs with the section it follows — that pairing is preserved
 * here rather than renumbered. This is the last subsection of Section 5.5, so
 * the "next" nav card returns to the section overview, matching the original
 * page's own navigation choice.
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

const TITLE = 'Documenting Calibration Results - MOET Module 5 Section 5.5';
const DESCRIPTION =
  'Best practices for recording, managing and auditing calibration documentation to meet quality, safety and regulatory requirements including ALCOA+ data integrity, electronic records, audit trails and calibration management systems.';

const quickCheckQuestions = [
  {
    id: 'qc1',
    question: 'What is the minimum information required on a calibration certificate?',
    options: [
      'Instrument ID, range, as-found/as-left data, reference standards, uncertainty and date',
      'Only the instrument serial number and the date that it was calibrated',
      'The original purchase price of the instrument and its supplier details',
      'The name of the operator who normally uses the instrument on site',
    ],
    correctIndex: 0,
    explanation:
      'A complete calibration certificate must contain all information needed to demonstrate traceability, accuracy, and compliance with the calibration procedure: instrument ID, range, as-found/as-left data, reference standards with traceability, environmental conditions, uncertainty, pass/fail result, technician, and date.',
  },
  {
    id: 'qc2',
    question: 'Why is as-found data important?',
    options: [
      'It records the environmental conditions present at the time of calibration',
      "It shows the instrument's condition before adjustment, revealing drift since the last check",
      'It confirms the instrument was returned to the correct user afterwards',
      'It proves the reference standard used was within its calibration date',
    ],
    correctIndex: 1,
    explanation:
      'As-found data shows the instrument condition before any adjustment, revealing how much it has drifted since its last calibration, enabling trend analysis and calibration interval optimisation.',
  },
  {
    id: 'qc3',
    question: 'What is a calibration status label?',
    options: [
      'A barcode used to book the instrument out of the store',
      "A warning sticker showing the instrument's voltage rating",
      'A label applied to the instrument showing its calibration status, due date, and unique identifier',
      'A tag recording the technician who last used the instrument',
    ],
    correctIndex: 2,
    explanation:
      'Calibration status labels visually indicate that the instrument has been calibrated, when the next calibration is due, and provide a unique identifier linking to the calibration records.',
  },
  {
    id: 'qc4',
    question: 'What does ALCOA+ stand for in data integrity?',
    options: [
      'Accurate, Logged, Compliant, Original, Auditable, plus extra attributes',
      'Approved, Labelled, Calibrated, Owned, Archived, plus extra attributes',
      'Authorised, Linked, Controlled, Optimised, Assured, plus extra attributes',
      'Attributable, Legible, Contemporaneous, Original, Accurate, plus extra attributes',
    ],
    correctIndex: 3,
    explanation:
      'ALCOA+ defines the essential attributes of data integrity for quality records: the data must be attributable to a person, legible, recorded at the time, original, accurate, complete, consistent, enduring, and available.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the purpose of trending calibration data over time?',
    options: [
      'To reduce the number of reference standards needed for each calibration',
      'To identify drift patterns and optimise the calibration intervals used',
      'To establish the original purchase value of each measuring instrument',
      'To confirm which technician calibrated each instrument and when',
    ],
    correctAnswer: 1,
    explanation:
      'Trending reveals drift patterns over multiple calibrations, enabling predictive adjustments to calibration intervals and early identification of instruments approaching their tolerance limits.',
  },
  {
    id: 2,
    question: 'How long should calibration records be retained?',
    options: [
      'Only until the next calibration of that instrument is completed',
      'For exactly 12 months from the recorded date of calibration',
      'As defined by the QMS and regulations -- typically instrument lifetime plus a period',
      'Only while the instrument remains in active service on the site',
    ],
    correctAnswer: 2,
    explanation:
      'Retention periods are defined by the quality management system, regulatory requirements and equipment lifetime. Pharmaceutical (GMP) may require lifetime plus 10 years. General industrial practice is typically 5-10 years minimum.',
  },
  {
    id: 3,
    question: 'What is an audit trail in calibration documentation?',
    options: [
      'The route a calibrated instrument takes between different site locations',
      'A summary of all the instruments due for calibration during this month',
      'The list of reference standards held by the on-site calibration laboratory',
      'A complete, tamper-evident record of all calibration activities and approvals',
    ],
    correctAnswer: 3,
    explanation:
      'The audit trail provides a verifiable record of who performed what action, when, and why. In electronic systems, this includes timestamps, user IDs, and change logs that cannot be altered.',
  },
  {
    id: 4,
    question: 'What does 21 CFR Part 11 require for electronic calibration records?',
    options: [
      'Records must match paper trustworthiness, with e-signatures and audit trails',
      'Electronic records must be printed out and stored as paper copies only',
      'Electronic records must be deleted once the instrument is finally retired',
      'Electronic records may omit the technician identity in order to protect privacy',
    ],
    correctAnswer: 0,
    explanation:
      '21 CFR Part 11 (FDA regulation) requires electronic records to include electronic signatures, complete audit trails, system access controls, and system validation to ensure data integrity.',
  },
  {
    id: 5,
    question: 'What is a calibration recall system?',
    options: [
      'A process for returning faulty instruments back to the manufacturer',
      'A system that tracks due dates and notifies when instruments need calibration',
      'A method of recovering deleted calibration records from a backup',
      'A procedure for recalling instruments issued to the wrong technician',
    ],
    correctAnswer: 1,
    explanation:
      'A calibration recall system automatically tracks when each instrument is due for calibration and generates work orders, notifications, or alerts to ensure calibrations are completed on time.',
  },
  {
    id: 6,
    question:
      'What action is required if calibration records are found to be incomplete or incorrect?',
    options: [
      'Destroy the incomplete record and start a fresh one with no explanatory note',
      'Ignore the minor gaps provided the instrument itself passed its calibration',
      'Investigate, correct the records, assess the impact and prevent recurrence',
      'Return the instrument to service and review the record at the next audit',
    ],
    correctAnswer: 2,
    explanation:
      'Incomplete or incorrect records may indicate that calibrations were not performed correctly. The discrepancy must be investigated, records corrected, impact on measurement validity assessed, and preventive measures implemented.',
  },
  {
    id: 7,
    question: 'What is the benefit of electronic calibration records over paper?',
    options: [
      'They remove the need to record any as-found and as-left data',
      'They allow corrections to be made without leaving any audit trail',
      'They eliminate the requirement for full measurement traceability',
      'They enable automated scheduling, trending, secure storage and audit trails',
    ],
    correctAnswer: 3,
    explanation:
      'Electronic records offer searchability, automated trending, secure backup, audit trails, integration with CMS/CMMS asset management systems, and elimination of manual transcription errors.',
  },
  {
    id: 8,
    question: 'What information links a calibration record to the reference standard used?',
    options: [
      "The reference standard's unique ID, certificate number and calibration due date",
      'The make and model of the instrument under test on the day',
      'The name of the technician who actually performed the calibration',
      'The environmental conditions recorded during the calibration work',
    ],
    correctAnswer: 0,
    explanation:
      'The reference standard must be uniquely identified and linked to its own calibration certificate, establishing the traceability chain from the instrument under test to national standards.',
  },
  {
    id: 9,
    question: "What is a 'limited use' or 'reference only' calibration status?",
    options: [
      'The instrument has not yet been calibrated for the very first time',
      'It may only be used for non-critical work as it misses full accuracy spec',
      'The instrument may only be used by a single named, authorised technician',
      'The instrument is restricted to use in one fixed location on the site',
    ],
    correctAnswer: 1,
    explanation:
      'Limited use status indicates the instrument is functional but does not meet its full accuracy specification. It can be used for non-critical or reference measurements where its actual accuracy is sufficient for the requirement.',
  },
  {
    id: 10,
    question: 'During a quality audit, what calibration documentation is typically reviewed?',
    options: [
      'Only the most recent calibration certificate held for each instrument',
      'Only the original instrument purchase invoices and warranty documents',
      'Procedures, records, standard certificates, OOT investigations and reviews',
      'Only the calibration status labels physically attached to the instruments',
    ],
    correctAnswer: 2,
    explanation:
      'Auditors review the complete calibration management system including procedures, records, traceability evidence, OOT handling, interval justification, staff competence records, and equipment maintenance.',
  },
  {
    id: 11,
    question: 'How should corrections be made to handwritten calibration records?',
    options: [
      'Use correction fluid to cover the error and write the right value on top',
      'Erase the original entry completely and write the new value in cleanly',
      'Overwrite the incorrect figure so that only the correct value is visible',
      'Strike through with a single line, write the correction, initial and date it',
    ],
    correctAnswer: 3,
    explanation:
      'Corrections must preserve the original entry (visible through the single strike-through), be initialled and dated by the person making the correction, and explain the reason if not obvious. Erasure, overwriting, and correction fluid are not permitted.',
  },
  {
    id: 12,
    question: 'What is the purpose of a calibration management system (CMS)?',
    options: [
      'To schedule, track, document and trend all calibration activities for compliance',
      'To physically calibrate instruments without any operator involvement at all',
      'To replace the need for traceable, certified reference standards entirely',
      'To store only the purchase and warranty records for measurement equipment',
    ],
    correctAnswer: 0,
    explanation:
      'A CMS manages the complete calibration lifecycle: scheduling, tracking instrument status, storing records, trending drift data, managing OOT events, and generating compliance reports for data-driven interval management. Examples include Beamex CMX and Fluke DPC/TRACK.',
  },
];

const faqs = [
  {
    question: 'Can I use handwritten calibration records?',
    answer:
      'Yes, handwritten records are acceptable provided they are legible, complete, recorded in permanent ink, signed and dated, and any corrections are made by striking through (not erasing) the error and initialling the correction. However, electronic records are preferred for their searchability, trending capability, and audit trail features.',
  },
  {
    question: 'What is ALCOA+ in the context of calibration records?',
    answer:
      'ALCOA+ is a data integrity framework used in regulated industries: Attributable (who), Legible (readable), Contemporaneous (recorded at the time), Original (first record), Accurate (correct), plus Complete, Consistent, Enduring, and Available. Calibration records must satisfy all these criteria.',
  },
  {
    question: 'How do I handle a calibration that was performed late (overdue)?',
    answer:
      'Document the overdue calibration, perform the calibration and record as-found data. If the instrument is found in tolerance, the impact may be minimal. If out of tolerance, an OOT investigation is required covering the overdue period. Implement corrective actions to prevent recurrence (e.g. improve scheduling, increase resources). Report the overdue status in the calibration system.',
  },
  {
    question: 'What is the difference between a calibration certificate and a calibration report?',
    answer:
      'A calibration certificate is a formal document issued by the calibrating organisation stating the calibration results with traceability. A calibration report may contain additional details such as uncertainty budgets, detailed test data, and observations. In practice, the terms are often used interchangeably, but accredited certificates must comply with ISO/IEC 17025 requirements.',
  },
  {
    question: 'How should calibration records be stored and backed up?',
    answer:
      'Electronic records should be stored on secure, backed-up servers with regular backup schedules (daily incremental, weekly full). Access should be controlled through role-based permissions. Paper records should be stored in a secure, fire-protected location with controlled access. Both formats must be retained for the period specified by the quality management system and applicable regulations.',
  },
];

const MOETModule5Section5_5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 5 · Section 5.5 · Subsection 5"
        title="Documenting Calibration Results"
        backTo="/study-centre/apprentice/m-o-e-t-module5-section5"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Recording, managing and auditing calibration documentation for quality compliance.
          </p>

          <TLDR
            points={[
              'As-found / as-left: record before and after adjustment data.',
              'ALCOA+: the data integrity framework for quality records.',
              'Traceability: reference standard chain to national standards.',
              'Audit trail: a tamper-evident record of all activities.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify the essential elements of a calibration certificate and calibration record',
              'Explain the importance of as-found data for drift trending and interval management',
              'Apply ALCOA+ data integrity principles to calibration documentation',
              'Describe electronic record requirements including audit trails and electronic signatures',
              'Manage calibration status labelling and recall systems',
              'Prepare calibration documentation for quality audits',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="Maintenance technician context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>CMS:</strong> a calibration management system for scheduling and trending.
              </li>
              <li>
                <strong>21 CFR Part 11:</strong> FDA requirements for electronic records.
              </li>
              <li>
                <strong>Drift trending:</strong> optimise calibration intervals from historical
                data.
              </li>
              <li>
                <strong>Recall system:</strong> automated notifications for due calibrations.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>Calibration record content</ContentEyebrow>

          <ConceptBlock
            title="Calibration record content"
            onSite="Never skip recording as-found data. Even if the instrument clearly needs adjustment, the as-found readings provide essential information for drift trending, OOT investigations, and interval management. An adjustment without as-found data is an incomplete calibration record."
          >
            <p>
              A complete calibration record must contain: <strong>instrument identification</strong>{' '}
              (tag number, serial number, description, location),{' '}
              <strong>calibration procedure reference</strong>,{' '}
              <strong>reference standards used</strong> (identification, certificate number,
              calibration due date), <strong>environmental conditions</strong> (temperature,
              humidity), <strong>as-found data</strong> (readings before adjustment),{' '}
              <strong>adjustments made</strong>, <strong>as-left data</strong> (readings after
              adjustment), <strong>measurement uncertainty</strong>,{' '}
              <strong>pass/fail determination</strong>, <strong>technician identification</strong>,
              and <strong>date</strong>.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Essential calibration record elements">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Instrument ID:</strong> tag number, serial number, description, physical
                location.
              </li>
              <li>
                <strong>Procedure:</strong> reference to the specific calibration SOP used.
              </li>
              <li>
                <strong>Standards:</strong> ID, certificate number, due date for each reference
                standard.
              </li>
              <li>
                <strong>Environment:</strong> temperature, humidity, and any other relevant
                conditions.
              </li>
              <li>
                <strong>As-found:</strong> all test point readings before any adjustment.
              </li>
              <li>
                <strong>As-left:</strong> all test point readings after adjustment (or confirmation
                no adjustment needed).
              </li>
              <li>
                <strong>Uncertainty:</strong> expanded uncertainty with coverage factor and
                confidence level.
              </li>
              <li>
                <strong>Result:</strong> pass/fail determination against acceptance criteria.
              </li>
            </ul>
            <p>
              The <strong>as-found data</strong> is particularly valuable. It reveals how much the
              instrument has drifted since its previous calibration, providing the basis for drift
              trending and calibration interval optimisation. If the as-found data consistently
              shows the instrument well within tolerance, the interval may be extended. If drift is
              approaching tolerance limits, the interval should be shortened.
            </p>
            <p>
              Each record must establish <strong>traceability</strong> by identifying the reference
              standards used and linking them to their own calibration certificates. This creates an
              unbroken chain of comparisons from the instrument under test through working standards
              and reference standards to national measurement institutes. Without this chain, the
              calibration has no demonstrated validity.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Data integrity and ALCOA+</ContentEyebrow>

          <ConceptBlock
            title="Data integrity and ALCOA+"
            onSite="When recording calibration data in the field, write readings on the calibration record as you take them -- do not write on scrap paper first and transfer later. Transferring data introduces transcription errors and violates the 'contemporaneous' and 'original' principles of ALCOA+."
          >
            <p>
              Calibration records are quality records that must meet <strong>data integrity</strong>{' '}
              requirements. The ALCOA+ framework defines the essential attributes:{' '}
              <strong>Attributable</strong> -- who performed the calibration is clearly identified.{' '}
              <strong>Legible</strong> -- records are readable and permanent.{' '}
              <strong>Contemporaneous</strong> -- data is recorded at the time it is generated, not
              afterwards. <strong>Original</strong> -- the first capture of the data.{' '}
              <strong>Accurate</strong> -- the data correctly reflects the calibration results.
            </p>
          </ConceptBlock>

          <ConceptBlock title="ALCOA+ framework">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Attribute</th>
                    <th className="py-2 pr-4 font-medium text-white">Meaning</th>
                    <th className="py-2 font-medium text-white">Practical example</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Attributable</td>
                    <td className="py-2 pr-4">Who performed the work</td>
                    <td className="py-2">Technician name, signature, employee ID</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Legible</td>
                    <td className="py-2 pr-4">Readable and permanent</td>
                    <td className="py-2">Clear handwriting in permanent ink, printed records</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Contemporaneous</td>
                    <td className="py-2 pr-4">Recorded at the time</td>
                    <td className="py-2">Data entered during calibration, not written up later</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Original</td>
                    <td className="py-2 pr-4">First capture of data</td>
                    <td className="py-2">The actual record sheet, not a recopied version</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Accurate</td>
                    <td className="py-2 pr-4">Correct data</td>
                    <td className="py-2">Readings match what the instrument displayed</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              The plus (+) adds: <strong>Complete</strong> -- all required data is present.{' '}
              <strong>Consistent</strong> -- data is logical and does not contradict other records.{' '}
              <strong>Enduring</strong> -- records are stored securely for the required retention
              period. <strong>Available</strong> -- records can be retrieved when needed for review,
              audit, or investigation. Failure to meet these criteria can result in regulatory
              non-compliance and loss of confidence in measurement validity.
            </p>
            <p>
              For handwritten records, corrections must be made by a single line through the error
              (keeping the original visible), with the correction written alongside, initialled, and
              dated. Erasure, overwriting, or use of correction fluid is not permitted. For
              electronic records, the system must maintain an automatic audit trail of all changes
              with timestamps and user identification.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Electronic records and CMS</ContentEyebrow>

          <ConceptBlock
            title="Electronic records and calibration management systems"
            onSite="Documenting calibrators (such as Beamex MC6) that record data automatically in the field and transfer it directly to the CMS eliminate manual data entry entirely. This is the gold standard for calibration documentation in regulated environments."
          >
            <p>
              Electronic calibration management systems provide significant advantages: automated
              scheduling and reminders, elimination of manual transcription errors, built-in
              calculations (error, uncertainty), automatic audit trails, secure data storage with
              backup, powerful search and retrieval, and drift trending with graphical analysis.
              Systems such as Beamex CMX, Fluke DPC/TRACK, and integrated CMMS modules are widely
              used.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Electronic record advantages">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Automated scheduling and recall notifications.</li>
              <li>Automatic error and uncertainty calculations.</li>
              <li>Searchable records with instant retrieval.</li>
              <li>Drift trending with graphical analysis.</li>
              <li>Integration with CMMS and asset management.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Regulatory requirements">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>21 CFR Part 11 (FDA) -- electronic signatures.</li>
              <li>EU GMP Annex 11 -- computerised systems.</li>
              <li>Complete and automatic audit trails.</li>
              <li>Role-based access control.</li>
              <li>System validation and periodic review.</li>
            </ul>
            <p>
              In regulated industries (pharmaceutical, food, nuclear), electronic records must
              comply with applicable regulations such as <strong>21 CFR Part 11</strong> (FDA) or{' '}
              <strong>Annex 11</strong> (EU GMP). These require: validated computer systems,
              electronic signatures equivalent to handwritten signatures, complete and automatic
              audit trails, system access controls (role-based permissions), data backup and
              recovery procedures, and periodic system reviews.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Calibration status and recall systems</ContentEyebrow>

          <ConceptBlock
            title="Calibration status and recall systems"
            onSite="Maintain an up-to-date instrument register listing every instrument that requires calibration, its location, calibration interval, and status. This register is the foundation of the recall system and is typically the first document requested during a quality audit."
          >
            <p>
              Every calibrated instrument must have a visible{' '}
              <strong>calibration status indicator</strong>, typically a label or tag applied to the
              instrument showing: the calibration status (calibrated, limited use, out of service),
              the calibration date, the next due date, and a unique identifier linking to the
              calibration record. The status must be clear and unambiguous to anyone who picks up or
              reads the instrument.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Calibration status categories">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Calibrated (green):</strong> in-tolerance, approved for use within its
                calibrated range.
              </li>
              <li>
                <strong>Limited use (yellow):</strong> does not meet full specification but suitable
                for specific non-critical applications.
              </li>
              <li>
                <strong>Out of service (red):</strong> failed calibration, overdue, or awaiting
                repair -- must not be used.
              </li>
              <li>
                <strong>For reference only:</strong> not calibrated for measurement purposes, used
                only as a reference or indication.
              </li>
              <li>
                <strong>Calibration not required:</strong> the instrument is used where calibrated
                accuracy is not required.
              </li>
            </ul>
            <p>
              A <strong>calibration recall system</strong> automatically tracks when each instrument
              is due for calibration and generates work orders, notifications, or alerts. Effective
              recall systems provide: advance notification (e.g. 30 days before due date), automatic
              work order generation, escalation if calibration is not completed by the due date, and
              reporting on overdue instruments. The recall system is typically part of the CMS or
              integrated into the site CMMS.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Audit readiness and continuous improvement</ContentEyebrow>

          <ConceptBlock
            title="Audit readiness and continuous improvement"
            onSite="Good calibration documentation is not just about compliance -- it protects the organisation, the process, and the people. Accurate, complete records provide confidence that measurements are reliable, products are safe, and the plant operates within its design parameters."
          >
            <p>
              For audit readiness, maintain: an up-to-date <strong>instrument register</strong>{' '}
              listing all calibrated instruments, current <strong>calibration procedures</strong>,
              complete <strong>calibration records</strong> with traceability evidence,{' '}
              <strong>reference standard certificates</strong>,{' '}
              <strong>OOT investigation reports</strong>, <strong>interval review records</strong>,{' '}
              <strong>staff competence records</strong> (training and qualifications), and evidence
              of <strong>management review</strong> of the calibration programme.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Audit checklist">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Instrument register:</strong> complete, up-to-date list of all calibrated
                instruments.
              </li>
              <li>
                <strong>Procedures:</strong> current, approved, version-controlled calibration SOPs.
              </li>
              <li>
                <strong>Records:</strong> complete calibration certificates with as-found/as-left
                data.
              </li>
              <li>
                <strong>Traceability:</strong> reference standard certificates demonstrating chain
                to national standards.
              </li>
              <li>
                <strong>OOT reports:</strong> investigation records for any out-of-tolerance
                findings.
              </li>
              <li>
                <strong>Interval reviews:</strong> evidence of periodic review and optimisation of
                calibration intervals.
              </li>
              <li>
                <strong>Training:</strong> records demonstrating technician competence for each
                procedure.
              </li>
              <li>
                <strong>Management review:</strong> evidence of periodic programme review and
                improvement.
              </li>
            </ul>
            <p>
              Continuous improvement of the calibration programme involves regularly reviewing drift
              data to optimise intervals, analysing OOT trends to identify systemic issues,
              reviewing calibration procedures for efficiency and effectiveness, assessing new
              calibration technology and methods, and seeking feedback from technicians on practical
              difficulties. The calibration programme should be reviewed as part of the site
              management review process.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'ALCOA+ is the data integrity framework for quality records.',
              'As-found data is essential for drift trending.',
              'Traceability means the reference standard ID is linked to its own certificate.',
              'Corrections use a single line strike-through, then initial and date it.',
              'Retention periods are defined by the QMS and applicable regulations.',
              'A CMS handles scheduling, tracking, trending and reporting.',
              '21 CFR Part 11 governs electronic records and signatures.',
              'Status labels use green/yellow/red for instrument status.',
              'Audit readiness rests on an instrument register plus complete records.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section5-4')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Functional Testing of Loops
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section5')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Back to section <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Testing and Calibration of Systems
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule5Section5_5;
