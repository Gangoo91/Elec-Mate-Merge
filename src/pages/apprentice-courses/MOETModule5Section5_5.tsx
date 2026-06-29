import { ArrowLeft, FileText, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
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
      "It records the environmental conditions present at the time of calibration",
      "It shows the instrument's condition before adjustment, revealing drift since the last check",
      "It confirms the instrument was returned to the correct user afterwards",
      "It proves the reference standard used was within its calibration date",
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
      'A warning sticker showing the instrument’s voltage rating',
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
      "The make and model of the instrument under test on the day",
      "The name of the technician who actually performed the calibration",
      "The environmental conditions recorded during the calibration work",
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
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <FileText className="h-4 w-4" />
            <span>Module 5.5.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Documenting Calibration Results
          </h1>
          <p className="text-white">
            Recording, managing and auditing calibration documentation for quality compliance
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">
              In 30 Seconds
            </p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1">
                <strong>As-found / as-left:</strong> Record before and after adjustment data
              </li>
              <li className="pl-1">
                <strong>ALCOA+:</strong> Data integrity framework for quality records
              </li>
              <li className="pl-1">
                <strong>Traceability:</strong> Reference standard chain to national standards
              </li>
              <li className="pl-1">
                <strong>Audit trail:</strong> Tamper-evident record of all activities
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">
              Maintenance Context
            </p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1">
                <strong>CMS:</strong> Calibration management system for scheduling and trending
              </li>
              <li className="pl-1">
                <strong>21 CFR Part 11:</strong> FDA requirements for electronic records
              </li>
              <li className="pl-1">
                <strong>Drift trending:</strong> Optimise calibration intervals from historical data
              </li>
              <li className="pl-1">
                <strong>Recall system:</strong> Automated notifications for due calibrations
              </li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Identify the essential elements of a calibration certificate and calibration record',
              'Explain the importance of as-found data for drift trending and interval management',
              'Apply ALCOA+ data integrity principles to calibration documentation',
              'Describe electronic record requirements including audit trails and electronic signatures',
              'Manage calibration status labelling and recall systems',
              'Prepare calibration documentation for quality audits',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Calibration Record Content
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A complete calibration record must contain: <strong>instrument identification</strong>{' '}
              (tag number, serial number, description, location),{' '}
              <strong>calibration procedure reference</strong>,
              <strong> reference standards used</strong> (identification, certificate number,
              calibration due date), <strong>environmental conditions</strong> (temperature,
              humidity), <strong>as-found data</strong> (readings before adjustment),{' '}
              <strong>adjustments made</strong>, <strong>as-left data</strong> (readings after
              adjustment), <strong>measurement uncertainty</strong>,
              <strong> pass/fail determination</strong>, <strong>technician identification</strong>,
              and
              <strong> date</strong>.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                Essential Calibration Record Elements
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Instrument ID:</strong> Tag number, serial number, description, physical
                  location
                </li>
                <li className="pl-1">
                  <strong>Procedure:</strong> Reference to the specific calibration SOP used
                </li>
                <li className="pl-1">
                  <strong>Standards:</strong> ID, certificate number, due date for each reference
                  standard
                </li>
                <li className="pl-1">
                  <strong>Environment:</strong> Temperature, humidity, and any other relevant
                  conditions
                </li>
                <li className="pl-1">
                  <strong>As-found:</strong> All test point readings before any adjustment
                </li>
                <li className="pl-1">
                  <strong>As-left:</strong> All test point readings after adjustment (or
                  confirmation no adjustment needed)
                </li>
                <li className="pl-1">
                  <strong>Uncertainty:</strong> Expanded uncertainty with coverage factor and
                  confidence level
                </li>
                <li className="pl-1">
                  <strong>Result:</strong> Pass/fail determination against acceptance criteria
                </li>
              </ul>
            </div>

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

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Never skip recording as-found data. Even if the instrument
              clearly needs adjustment, the as-found readings provide essential information for
              drift trending, OOT investigations, and interval management. An adjustment without
              as-found data is an incomplete calibration record.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Data Integrity and ALCOA+
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Calibration records are quality records that must meet <strong>data integrity</strong>{' '}
              requirements. The ALCOA+ framework defines the essential attributes:{' '}
              <strong>Attributable</strong> -- who performed the calibration is clearly identified.{' '}
              <strong>Legible</strong> -- records are readable and permanent.
              <strong> Contemporaneous</strong> -- data is recorded at the time it is generated, not
              afterwards.
              <strong> Original</strong> -- the first capture of the data. <strong>Accurate</strong>{' '}
              -- the data correctly reflects the calibration results.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">ALCOA+ Framework</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Attribute</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Meaning</th>
                      <th className="border border-white/10 px-3 py-2 text-left">
                        Practical Example
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Attributable</td>
                      <td className="border border-white/10 px-3 py-2">Who performed the work</td>
                      <td className="border border-white/10 px-3 py-2">
                        Technician name, signature, employee ID
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Legible</td>
                      <td className="border border-white/10 px-3 py-2">Readable and permanent</td>
                      <td className="border border-white/10 px-3 py-2">
                        Clear handwriting in permanent ink, printed records
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Contemporaneous</td>
                      <td className="border border-white/10 px-3 py-2">Recorded at the time</td>
                      <td className="border border-white/10 px-3 py-2">
                        Data entered during calibration, not written up later
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Original</td>
                      <td className="border border-white/10 px-3 py-2">First capture of data</td>
                      <td className="border border-white/10 px-3 py-2">
                        The actual record sheet, not a recopied version
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Accurate</td>
                      <td className="border border-white/10 px-3 py-2">Correct data</td>
                      <td className="border border-white/10 px-3 py-2">
                        Readings match what the instrument displayed
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p>
              The plus (+) adds: <strong>Complete</strong> -- all required data is present.{' '}
              <strong>Consistent</strong>
              -- data is logical and does not contradict other records. <strong>Enduring</strong> --
              records are stored securely for the required retention period.{' '}
              <strong>Available</strong> -- records can be retrieved when needed for review, audit,
              or investigation. Failure to meet these criteria can result in regulatory
              non-compliance and loss of confidence in measurement validity.
            </p>

            <p>
              For handwritten records, corrections must be made by a single line through the error
              (keeping the original visible), with the correction written alongside, initialled, and
              dated. Erasure, overwriting, or use of correction fluid is not permitted. For
              electronic records, the system must maintain an automatic audit trail of all changes
              with timestamps and user identification.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical tip:</strong> When recording calibration data in the field, write
              readings on the calibration record as you take them -- do not write on scrap paper
              first and transfer later. Transferring data introduces transcription errors and
              violates the 'contemporaneous' and 'original' principles of ALCOA+.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Electronic Records and Calibration Management Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electronic calibration management systems provide significant advantages: automated
              scheduling and reminders, elimination of manual transcription errors, built-in
              calculations (error, uncertainty), automatic audit trails, secure data storage with
              backup, powerful search and retrieval, and drift trending with graphical analysis.
              Systems such as Beamex CMX, Fluke DPC/TRACK, and integrated CMMS modules are widely
              used.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                  Electronic Record Advantages
                </h3>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Automated scheduling and recall notifications</li>
                  <li className="pl-1">Automatic error and uncertainty calculations</li>
                  <li className="pl-1">Searchable records with instant retrieval</li>
                  <li className="pl-1">Drift trending with graphical analysis</li>
                  <li className="pl-1">Integration with CMMS and asset management</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                  Regulatory Requirements
                </h3>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">21 CFR Part 11 (FDA) -- electronic signatures</li>
                  <li className="pl-1">EU GMP Annex 11 -- computerised systems</li>
                  <li className="pl-1">Complete and automatic audit trails</li>
                  <li className="pl-1">Role-based access control</li>
                  <li className="pl-1">System validation and periodic review</li>
                </ul>
              </div>
            </div>

            <p>
              In regulated industries (pharmaceutical, food, nuclear), electronic records must
              comply with applicable regulations such as <strong>21 CFR Part 11</strong> (FDA) or{' '}
              <strong>Annex 11</strong>
              (EU GMP). These require: validated computer systems, electronic signatures equivalent
              to handwritten signatures, complete and automatic audit trails, system access controls
              (role-based permissions), data backup and recovery procedures, and periodic system
              reviews.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Documenting calibrators (such as Beamex MC6) that record
              data automatically in the field and transfer it directly to the CMS eliminate manual
              data entry entirely. This is the gold standard for calibration documentation in
              regulated environments.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Calibration Status and Recall Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Every calibrated instrument must have a visible{' '}
              <strong>calibration status indicator</strong>, typically a label or tag applied to the
              instrument showing: the calibration status (calibrated, limited use, out of service),
              the calibration date, the next due date, and a unique identifier linking to the
              calibration record. The status must be clear and unambiguous to anyone who picks up or
              reads the instrument.
            </p>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">
                Calibration Status Categories
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Calibrated (green):</strong> In-tolerance, approved for use within its
                  calibrated range
                </li>
                <li className="pl-1">
                  <strong>Limited use (yellow):</strong> Does not meet full specification but
                  suitable for specific non-critical applications
                </li>
                <li className="pl-1">
                  <strong>Out of service (red):</strong> Failed calibration, overdue, or awaiting
                  repair -- must not be used
                </li>
                <li className="pl-1">
                  <strong>For reference only:</strong> Not calibrated for measurement purposes, used
                  only as a reference or indication
                </li>
                <li className="pl-1">
                  <strong>Calibration not required:</strong> The instrument is used where calibrated
                  accuracy is not required
                </li>
              </ul>
            </div>

            <p>
              A <strong>calibration recall system</strong> automatically tracks when each instrument
              is due for calibration and generates work orders, notifications, or alerts. Effective
              recall systems provide: advance notification (e.g. 30 days before due date), automatic
              work order generation, escalation if calibration is not completed by the due date, and
              reporting on overdue instruments. The recall system is typically part of the CMS or
              integrated into the site CMMS.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical tip:</strong> Maintain an up-to-date instrument register listing
              every instrument that requires calibration, its location, calibration interval, and
              status. This register is the foundation of the recall system and is typically the
              first document requested during a quality audit.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Audit Readiness and Continuous Improvement
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              For audit readiness, maintain: an up-to-date <strong>instrument register</strong>{' '}
              listing all calibrated instruments, current <strong>calibration procedures</strong>,
              complete
              <strong> calibration records</strong> with traceability evidence,{' '}
              <strong>reference standard certificates</strong>,{' '}
              <strong>OOT investigation reports</strong>, <strong>interval review records</strong>,{' '}
              <strong>staff competence records</strong> (training and qualifications), and evidence
              of <strong>management review</strong> of the calibration programme.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Audit Checklist</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Instrument register:</strong> Complete, up-to-date list of all calibrated
                  instruments
                </li>
                <li className="pl-1">
                  <strong>Procedures:</strong> Current, approved, version-controlled calibration
                  SOPs
                </li>
                <li className="pl-1">
                  <strong>Records:</strong> Complete calibration certificates with as-found/as-left
                  data
                </li>
                <li className="pl-1">
                  <strong>Traceability:</strong> Reference standard certificates demonstrating chain
                  to national standards
                </li>
                <li className="pl-1">
                  <strong>OOT reports:</strong> Investigation records for any out-of-tolerance
                  findings
                </li>
                <li className="pl-1">
                  <strong>Interval reviews:</strong> Evidence of periodic review and optimisation of
                  calibration intervals
                </li>
                <li className="pl-1">
                  <strong>Training:</strong> Records demonstrating technician competence for each
                  procedure
                </li>
                <li className="pl-1">
                  <strong>Management review:</strong> Evidence of periodic programme review and
                  improvement
                </li>
              </ul>
            </div>

            <p>
              Continuous improvement of the calibration programme involves regularly reviewing drift
              data to optimise intervals, analysing OOT trends to identify systemic issues,
              reviewing calibration procedures for efficiency and effectiveness, assessing new
              calibration technology and methods, and seeking feedback from technicians on practical
              difficulties. The calibration programme should be reviewed as part of the site
              management review process.
            </p>

            <p className="text-sm text-white italic">
              <strong>Note:</strong> Good calibration documentation is not just about compliance --
              it protects the organisation, the process, and the people. Accurate, complete records
              provide confidence that measurements are reliable, products are safe, and the plant
              operates within its design parameters.
            </p>
          </div>
        </section>

        <hr className="border-white/5 my-12" />

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 my-12" />

        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Documentation Essentials</p>
                <ul className="space-y-0.5">
                  <li>ALCOA+ -- data integrity framework for quality records</li>
                  <li>As-found data -- essential for drift trending</li>
                  <li>Traceability -- standard ID linked to its certificate</li>
                  <li>Corrections -- single line strike-through, initial, date</li>
                  <li>Retention -- as defined by QMS and regulations</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Systems and Compliance</p>
                <ul className="space-y-0.5">
                  <li>CMS -- scheduling, tracking, trending, reporting</li>
                  <li>21 CFR Part 11 -- electronic records and signatures</li>
                  <li>Recall system -- automated due-date notifications</li>
                  <li>Status labels -- green/yellow/red for instrument status</li>
                  <li>Audit readiness -- instrument register + complete records</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <Quiz title="Test Your Knowledge" questions={quizQuestions} />
        </section>

        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section5-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section5">
              Back to Section Overview
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default MOETModule5Section5_5;
