/**
 * MOET · Module 5 · Section 5 · Subsection 1 — Calibration Procedures and
 * Standards
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option.
 *
 * KSBs covered, quoted rather than numbered: the IfATE/Skills England API
 * publishes these statements without their K/S/B codes, and the published
 * numbering has not been verified against a primary source — so do not invent
 * codes here. The conversion brief for this course does not list a Module 5
 * KSB set, so only a statement that already appears verbatim in the brief's
 * verified lists for other modules — and that genuinely fits this page's
 * content — is used here.
 *   Knowledge  · "Electrical. Electrical maintenance tools, measurement, and
 *                 test equipment application, operation, care and
 *                 calibration requirements."
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

const TITLE = 'Calibration Procedures and Standards - MOET Module 5 Section 5.1';
const DESCRIPTION =
  'Comprehensive guide to standardised calibration procedures, ISO/IEC 17025, UKAS accreditation, measurement uncertainty, GUM framework and calibration management systems for electrical maintenance technicians under ST1426.';

const quickCheckQuestions = [
  {
    id: 'qc1',
    question:
      'Which international standard specifies requirements for calibration laboratory competence?',
    options: ['ISO/IEC 17025', 'ISO 9001', 'BS 7671', 'IEC 61131-3'],
    correctIndex: 0,
    explanation:
      'ISO/IEC 17025 specifies the general requirements for the competence, impartiality, and consistent operation of calibration and testing laboratories.',
  },
  {
    id: 'qc2',
    question: 'What is a Standard Operating Procedure (SOP) for calibration?',
    options: [
      'A summary of all calibrations due across the site in the next quarter',
      'A detailed, step-by-step documented procedure specific to a particular instrument type and calibration task',
      'A manufacturer guarantee that the instrument will never drift out of tolerance',
      'A record of the as-found and as-left readings taken during a single calibration',
    ],
    correctIndex: 1,
    explanation:
      'An SOP provides detailed instructions for performing a specific calibration, ensuring consistency, repeatability, and compliance regardless of which technician performs the work.',
  },
  {
    id: 'qc3',
    question: 'What is measurement uncertainty?',
    options: [
      'The fixed error of the reference standard stated on its calibration certificate',
      'The smallest change in input the instrument is able to detect and display',
      'A quantitative expression of the range of values within which the true value is expected to lie',
      'The difference between the as-found and as-left readings during calibration',
    ],
    correctIndex: 2,
    explanation:
      'Measurement uncertainty quantifies the doubt in a measurement result -- the range within which the true value is believed to lie with a stated level of confidence (typically 95%).',
  },
  {
    id: 'qc4',
    question: "What is the 'guard band' approach to pass/fail decisions?",
    options: [
      'Widening the tolerance limits so that fewer instruments are declared out of tolerance',
      'Repeating the measurement several times and reporting only the most favourable result',
      'Calibrating against two reference standards and accepting if either one passes',
      'Applying a decision rule that accounts for measurement uncertainty when making conformity statements',
    ],
    correctIndex: 3,
    explanation:
      "Guard banding narrows the acceptance limits by the measurement uncertainty, ensuring a high probability that a declared 'pass' genuinely means the instrument is within tolerance.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What does a calibration management system (CMS) provide?',
    options: [
      'A single physical reference standard against which all site instruments are checked',
      'Scheduling, tracking, documentation, and trending of all calibration activities',
      'A device that automatically adjusts instruments back into tolerance when they drift',
      'The legal authority to issue UKAS-accredited calibration certificates',
    ],
    correctAnswer: 1,
    explanation:
      'A CMS manages the complete calibration lifecycle: scheduling calibrations, tracking instrument status, storing calibration records, trending drift data, and generating compliance reports.',
  },
  {
    id: 2,
    question: 'What is the purpose of a calibration procedure?',
    options: [
      'To guarantee that an instrument will remain in tolerance for the whole calibration interval',
      'To record the as-found and as-left readings obtained during a single calibration',
      'To define the method, equipment, acceptance criteria, and documentation requirements for a specific calibration task',
      'To list every instrument on site that is due for calibration in the coming period',
    ],
    correctAnswer: 2,
    explanation:
      'Calibration procedures ensure that calibrations are performed consistently and correctly, specifying the test equipment, test points, acceptance criteria, environmental requirements, and documentation format.',
  },
  {
    id: 3,
    question: 'How is measurement uncertainty typically expressed?',
    options: [
      'As a single worst-case error figure with no confidence level or coverage factor stated',
      'As the resolution of the instrument display divided by the number of test points used',
      'As the simple difference between the as-found and as-left readings recorded',
      'As an expanded uncertainty U with a coverage factor k and confidence level (e.g. U = 0.05 bar, k=2, 95% confidence)',
    ],
    correctAnswer: 3,
    explanation:
      'Expanded uncertainty U is calculated from combined standard uncertainty multiplied by coverage factor k (typically k=2 for approximately 95% confidence level).',
  },
  {
    id: 4,
    question: 'What is GUM?',
    options: [
      'The Guide to the Expression of Uncertainty in Measurement -- the internationally accepted framework for evaluating measurement uncertainty',
      'The UK accreditation body that assesses calibration laboratories against ISO/IEC 17025',
      'A national physical reference standard held by the laboratory at the top of the traceability chain',
      'A software package used to schedule calibrations and generate work orders when they fall due',
    ],
    correctAnswer: 0,
    explanation:
      'GUM (JCGM 100) provides the internationally agreed framework for evaluating and expressing measurement uncertainty, used by all accredited calibration laboratories.',
  },
  {
    id: 5,
    question: 'What is an out-of-tolerance (OOT) investigation?',
    options: [
      'A routine check that the instrument display reads zero before the calibration begins',
      'An investigation triggered when an instrument is found outside its acceptable tolerance during calibration, to assess the impact on previous measurements',
      'A review of the calibration interval carried out whenever an instrument passes within tolerance',
      'The process of widening the tolerance limits so that a borderline instrument can be declared a pass',
    ],
    correctAnswer: 1,
    explanation:
      'An OOT investigation assesses whether out-of-tolerance readings may have affected process safety, product quality, or compliance since the last successful calibration.',
  },
  {
    id: 6,
    question: 'What records must be maintained for each calibration?',
    options: [
      'Only the final pass or fail result, as the underlying readings are not needed once a decision is made',
      'Just the instrument serial number and the date the next calibration falls due',
      'Instrument ID, procedure reference, standards used (with traceability), environmental conditions, as-found/as-left data, uncertainty, technician, and date',
      'The purchase price and warranty details of the instrument under test',
    ],
    correctAnswer: 2,
    explanation:
      'Complete calibration records are required to demonstrate compliance, enable trend analysis, support OOT investigations, and satisfy audit requirements.',
  },
  {
    id: 7,
    question: 'What is the role of ISO 9001 in calibration?',
    options: [
      'It sets the technical accuracy specifications that each type of measuring instrument must meet',
      'It accredits calibration laboratories and authorises them to issue UKAS-marked certificates',
      'It defines the coverage factor k and confidence level to be used in uncertainty statements',
      'It requires that measuring equipment used in the quality management system is calibrated and traceable to ensure measurement validity',
    ],
    correctAnswer: 3,
    explanation:
      'ISO 9001 Clause 7.1.5 requires organisations to ensure that monitoring and measuring equipment is calibrated, identified, and protected, and that measurement traceability is maintained.',
  },
  {
    id: 8,
    question: 'Why is environmental control important during calibration?',
    options: [
      'Temperature, humidity, and pressure affect both the reference standard and instrument under test, potentially introducing errors',
      'It removes the need to evaluate measurement uncertainty, since controlled conditions are error-free',
      'It allows the calibration interval to be doubled because drift no longer occurs indoors',
      'It is only required for electrical instruments and has no effect on pressure or temperature devices',
    ],
    correctAnswer: 0,
    explanation:
      'Environmental conditions directly affect measurement accuracy. Calibrations should be performed under controlled conditions or with corrections applied for deviations from reference conditions.',
  },
  {
    id: 9,
    question: 'What is a calibration interval review?',
    options: [
      'A fixed manufacturer-set period that may never be altered once the instrument is in service',
      'A periodic assessment of calibration intervals based on drift data, reliability trends, and risk to optimise the frequency of calibration',
      'A review of the test points and acceptance criteria written into the calibration procedure',
      'An inspection of the instrument carried out halfway between its scheduled calibrations',
    ],
    correctAnswer: 1,
    explanation:
      'Interval reviews analyse historical drift data to determine if calibration intervals can be extended (consistent in-tolerance results) or need shortening (increasing drift or OOT findings).',
  },
  {
    id: 10,
    question: 'What is the difference between Type A and Type B uncertainty evaluation?',
    options: [
      'Type A applies to electrical instruments while Type B applies to pressure and temperature instruments',
      'Type A is evaluated before calibration and Type B is evaluated only after an out-of-tolerance finding',
      'Type A uses statistical analysis of repeated measurements; Type B uses other information such as specifications, certificates, and experience',
      'Type A is reported on accredited certificates and Type B is reported on non-accredited certificates',
    ],
    correctAnswer: 2,
    explanation:
      'Type A evaluation uses statistical methods (standard deviation of repeated measurements). Type B evaluation uses other available information such as calibration certificates, manufacturer specifications, and published data.',
  },
  {
    id: 11,
    question: 'What action is required when a reference standard is found out of tolerance?',
    options: [
      'Continue using the standard until its next scheduled calibration, then replace it if it fails again',
      'Apply the as-found error as a correction to all future readings and take no further action',
      'Adjust the standard back into tolerance on site and resume work without recalibration',
      'Perform a reverse traceability investigation on all instruments calibrated using that standard since its last successful calibration',
    ],
    correctAnswer: 3,
    explanation:
      "A reverse traceability investigation must assess whether the standard's error could have caused instruments to be incorrectly declared in-tolerance, requiring recall and recalibration of affected instruments.",
  },
  {
    id: 12,
    question: 'Why must calibration procedures be controlled documents?',
    options: [
      'To ensure only current, approved versions are used, maintaining consistency and preventing use of superseded methods',
      'To allow each technician to amend the procedure freely to suit the instrument in front of them',
      'To keep the procedure confidential so that competitors cannot copy the calibration method',
      'To remove the need for training records, since the document explains every step in full',
    ],
    correctAnswer: 0,
    explanation:
      'Controlled documents ensure version control, formal approval, and change management, maintaining the integrity and consistency of calibration results and preventing use of outdated procedures.',
  },
];

const faqs = [
  {
    question: 'What is the difference between accredited and traceable calibration?',
    answer:
      'Traceable calibration means the measurement is linked to national standards through an unbroken chain of comparisons. Accredited calibration (e.g. UKAS) additionally means the laboratory has been independently assessed for competence per ISO/IEC 17025, and the uncertainty statement on the certificate is reliable. Accredited calibration provides the highest level of confidence.',
  },
  {
    question: 'How do I calculate measurement uncertainty?',
    answer:
      'Follow the GUM methodology: identify all uncertainty sources (reference standard, resolution, repeatability, environmental effects), quantify each as a standard uncertainty, combine them using root-sum-of-squares (assuming independence), and multiply by the coverage factor k (usually k=2) to obtain expanded uncertainty at approximately 95% confidence.',
  },
  {
    question: 'Can I perform calibration in the field or must it be done in a laboratory?',
    answer:
      'Many calibrations can be performed in the field using portable calibration equipment. Field calibrations are acceptable provided the calibration procedure is followed, environmental conditions are recorded and accounted for, and the reference equipment has appropriate accuracy and traceability. Some high-accuracy calibrations require controlled laboratory conditions.',
  },
  {
    question: 'What happens if a reference standard is found out of tolerance?',
    answer:
      "This triggers a reverse traceability investigation. All instruments calibrated using that standard since its last successful calibration must be re-evaluated. If the standard's error could have caused instruments to be incorrectly declared in-tolerance, those instruments must be recalled and recalibrated.",
  },
  {
    question: 'How often should calibration procedures be reviewed?',
    answer:
      'Calibration procedures should be reviewed at defined intervals (typically every 2-3 years), when problems are identified, when equipment or methods change, when regulatory requirements change, or when audit findings require it. Reviews must be documented and any changes formally approved before implementation.',
  },
];

const MOETModule5Section5_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 5 · Section 5.5 · Subsection 1"
        title="Calibration Procedures and Standards"
        backTo="/study-centre/apprentice/m-o-e-t-module5-section5"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            SOPs, ISO/IEC 17025, measurement uncertainty and calibration management.
          </p>

          <TLDR
            points={[
              'SOPs: controlled, step-by-step procedures for each calibration task.',
              'ISO/IEC 17025: the laboratory competence standard for calibration.',
              'GUM: the framework for evaluating measurement uncertainty.',
              'Guard banding: accounts for uncertainty in pass/fail decisions.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain the purpose and structure of calibration procedures and SOPs',
              'Describe ISO/IEC 17025 requirements for calibration laboratory competence',
              'Understand measurement uncertainty and the GUM evaluation framework',
              'Outline the role of calibration management systems in maintaining compliance',
              'Explain out-of-tolerance investigations and their impact on process integrity',
              'Apply guard banding and decision rules for conformity assessment',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="Maintenance technician context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>UKAS:</strong> UK accreditation for calibration laboratories.
              </li>
              <li>
                <strong>OOT investigation:</strong> assesses impact when instruments are found out
                of tolerance.
              </li>
              <li>
                <strong>CMS:</strong> software for scheduling, tracking and trending calibrations.
              </li>
              <li>
                <strong>Interval optimisation:</strong> based on historical drift data.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>Calibration procedures and SOPs</ContentEyebrow>

          <ConceptBlock
            title="Calibration procedures and SOPs"
            onSite="A calibration performed without following the approved procedure has no demonstrated validity, regardless of how accurate the result might be. Always use the current, controlled version of the SOP."
          >
            <p>
              A calibration procedure (Standard Operating Procedure, SOP) provides step-by-step
              instructions for performing a specific calibration. It ensures that the calibration is
              performed consistently regardless of which technician carries it out. A well-written
              SOP is the foundation of reliable calibration practice.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Essential SOP content">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Scope:</strong> which instrument types and ranges the procedure covers.
              </li>
              <li>
                <strong>Reference standards:</strong> required equipment and their accuracy
                specifications.
              </li>
              <li>
                <strong>Environmental requirements:</strong> temperature, humidity, vibration
                limits.
              </li>
              <li>
                <strong>Safety precautions:</strong> isolation requirements, PPE, hazardous
                materials.
              </li>
              <li>
                <strong>Test steps:</strong> detailed, numbered steps including test points and
                stabilisation times.
              </li>
              <li>
                <strong>Acceptance criteria:</strong> tolerance limits expressed as percentage of
                span or reading.
              </li>
              <li>
                <strong>Documentation:</strong> what must be recorded and where.
              </li>
              <li>
                <strong>Failure actions:</strong> OOT investigation requirements if the instrument
                fails.
              </li>
            </ul>
            <p>
              Procedures must be controlled documents within the quality management system. They are
              reviewed and approved by authorised personnel, version-controlled, and available at
              the point of use. Changes require a formal change process. Training records must
              demonstrate that technicians are competent to perform each procedure they are
              assigned.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>ISO/IEC 17025 and UKAS accreditation</ContentEyebrow>

          <ConceptBlock
            title="ISO/IEC 17025 and UKAS accreditation"
            onSite="Maintenance technicians should understand the significance of UKAS accreditation when selecting calibration services, and ensure their own calibration activities follow documented procedures with traceable reference standards."
          >
            <p>
              <strong>ISO/IEC 17025</strong> is the international standard specifying requirements
              for the competence of testing and calibration laboratories. It covers both management
              system requirements (similar to ISO 9001) and technical requirements including staff
              competence, method validation, equipment calibration and maintenance, measurement
              traceability, and reporting of results.
            </p>
          </ConceptBlock>

          <ConceptBlock title="UKAS accreditation">
            <p>
              In the UK, laboratory accreditation against ISO/IEC 17025 is provided by{' '}
              <strong>UKAS (United Kingdom Accreditation Service)</strong>. Accreditation involves
              rigorous assessment of the laboratory&apos;s management system, technical competence,
              and measurement capability through regular surveillance visits.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Accredited vs non-accredited">
            <p>
              An accredited calibration certificate carries the UKAS logo and provides the highest
              level of confidence. It includes a verified uncertainty statement. Many industries
              (pharmaceutical, aerospace, nuclear) require UKAS-accredited calibration for critical
              instruments.
            </p>
          </ConceptBlock>

          <ConceptBlock title="ISO/IEC 17025 technical requirements">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Staff competence:</strong> training, qualifications, and authorisation
                records.
              </li>
              <li>
                <strong>Method validation:</strong> demonstrating procedures are fit for purpose.
              </li>
              <li>
                <strong>Equipment:</strong> calibrated, maintained, and within calibration due
                dates.
              </li>
              <li>
                <strong>Traceability:</strong> unbroken chain to national measurement standards.
              </li>
              <li>
                <strong>Uncertainty:</strong> evaluated and reported for all calibration results.
              </li>
              <li>
                <strong>Reporting:</strong> complete, unambiguous calibration certificates.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Measurement uncertainty</ContentEyebrow>

          <ConceptBlock
            title="Measurement uncertainty"
            onSite="When making pass/fail decisions, always consider measurement uncertainty. The guard band approach subtracts uncertainty from acceptance limits, ensuring declared passes are genuine."
          >
            <p>
              Every measurement has uncertainty -- no measurement is perfectly exact.{' '}
              <strong>Measurement uncertainty</strong> quantifies this doubt, expressing the range
              of values within which the true value is expected to lie with a stated confidence
              level. The internationally accepted framework for evaluating uncertainty is the{' '}
              <strong>GUM (Guide to the Expression of Uncertainty in Measurement, JCGM 100)</strong>
              .
            </p>
          </ConceptBlock>

          <ConceptBlock title="GUM methodology steps">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Step 1:</strong> identify all sources of uncertainty (Type A -- statistical
                analysis of repeated measurements; Type B -- specifications, certificates,
                environmental effects).
              </li>
              <li>
                <strong>Step 2:</strong> quantify each source as a standard uncertainty.
              </li>
              <li>
                <strong>Step 3:</strong> combine using root-sum-of-squares to obtain combined
                standard uncertainty.
              </li>
              <li>
                <strong>Step 4:</strong> multiply by coverage factor k (typically k=2) for expanded
                uncertainty U at approximately 95% confidence.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Common sources of uncertainty">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Source</th>
                    <th className="py-2 pr-4 font-medium text-white">Type</th>
                    <th className="py-2 font-medium text-white">Example</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Repeatability</td>
                    <td className="py-2 pr-4">A</td>
                    <td className="py-2">Standard deviation of repeated readings</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Reference standard</td>
                    <td className="py-2 pr-4">B</td>
                    <td className="py-2">From calibration certificate</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Resolution</td>
                    <td className="py-2 pr-4">B</td>
                    <td className="py-2">Smallest display increment / 2</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Temperature effect</td>
                    <td className="py-2 pr-4">B</td>
                    <td className="py-2">Temperature coefficient x deviation</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>OOT investigations and interval management</ContentEyebrow>

          <ConceptBlock
            title="OOT investigations and interval management"
            onSite="An OOT finding is not just a calibration issue -- it is a quality event that can have wide-ranging implications. Always follow the OOT investigation procedure thoroughly."
          >
            <p>
              When an instrument is found <strong>out of tolerance (OOT)</strong> during
              calibration, an investigation must be performed to assess the impact on measurements
              made since the last successful calibration. This is a critical quality process that
              protects product quality, process safety, and regulatory compliance.
            </p>
          </ConceptBlock>

          <ConceptBlock title="OOT investigation steps">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Identify which processes or products were measured using the instrument.</li>
              <li>
                Estimate the potential error in those measurements based on the as-found deviation.
              </li>
              <li>
                Determine whether the error could have affected safety, quality, or compliance.
              </li>
              <li>Decide on corrective action (product recall, process review, re-testing).</li>
              <li>Document the investigation findings and actions taken.</li>
              <li>Review the calibration interval for adequacy.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Calibration interval management">
            <p>
              <strong>Calibration interval management</strong> balances the risk of using an
              out-of-tolerance instrument against the cost and disruption of frequent calibration.
              Intervals are initially set based on manufacturer recommendations, then optimised
              using drift data. If as-found data consistently shows the instrument well within
              tolerance, the interval may be extended. If drift approaches tolerance limits, the
              interval should be shortened.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Calibration management systems">
            <p>
              Effective calibration management requires software that tracks all instruments,
              schedules calibrations, stores records, trends drift data, manages OOT events, and
              generates compliance reports. Systems such as Beamex CMX, Fluke DPC/TRACK, and
              enterprise CMMS platforms (SAP PM, Maximo) provide these capabilities. They
              automatically generate work orders when calibrations are due and flag instruments
              showing excessive drift.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Decision rules and conformity assessment</ContentEyebrow>

          <ConceptBlock
            title="Decision rules and conformity assessment"
            onSite="Calibration procedures and standards form the quality framework for all measurement activities. The principles covered here underpin the practical calibration techniques covered in the following sections of Module 5.5."
          >
            <p>
              When declaring an instrument as &apos;pass&apos; or &apos;fail&apos;, the measurement
              uncertainty must be considered. <strong>ILAC-G8</strong> provides guidance on decision
              rules for statements of conformity. The simplest approach is{' '}
              <strong>guard banding</strong>, which narrows the acceptance limits by the measurement
              uncertainty.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Guard band example">
            <p>
              If the instrument tolerance is plus/minus 0.1 bar and the measurement uncertainty is
              plus/minus 0.02 bar:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Without guard band:</strong> pass if reading is within plus/minus 0.1 bar.
              </li>
              <li>
                <strong>With guard band:</strong> pass if reading is within plus/minus 0.08 bar (0.1
                - 0.02).
              </li>
              <li>
                The narrower acceptance band ensures high confidence that a declared pass is
                genuine.
              </li>
              <li>
                Readings between 0.08 and 0.1 bar fall into the &apos;indeterminate zone&apos;.
              </li>
            </ul>
            <p>
              Different industries and regulatory frameworks may require different decision rules.
              Some accept &apos;simple acceptance&apos; (no uncertainty consideration), while
              regulated industries (pharmaceutical, nuclear) typically require guard banding. The
              decision rule used must be documented and agreed with the customer or regulatory
              authority.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'ISO/IEC 17025 sets laboratory competence; GUM (JCGM 100) governs uncertainty evaluation; UKAS is the UK accreditation service; ILAC-G8 sets decision rules for conformity; ISO 9001 Clause 7.1.5 covers measurement resources.',
              'An SOP is a controlled, step-by-step procedure.',
              'A guard band is the acceptance limit minus the measurement uncertainty.',
              'An OOT (out-of-tolerance) finding requires a formal investigation.',
              'A CMS (calibration management system) schedules, tracks and trends calibrations.',
              'A coverage factor of k=2 corresponds to approximately 95% confidence.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section5')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Back to section
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Testing and Calibration of Systems
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section5-2')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Test Instruments for Control Systems
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule5Section5_1;
