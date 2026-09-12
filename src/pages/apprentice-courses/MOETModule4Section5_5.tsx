/**
 * MOET · Module 4 · Section 5.5 · Subsection 5 — Test Documentation and Certification
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
 * numbering has not been verified against a primary source — so do not
 * invent codes here.
 *   Knowledge · "Documentation requirements: documentation control,
 *                auditable records."
 *   Skills    · "Record information."
 *              · "Produce or update documents. For example, handover notes
 *                 and reports."
 *
 * Certificate names (EIC, MEIWC, EICR) and EICR classification codes (C1,
 * C2, C3, FI) are copied verbatim from the original page — this course has
 * no canonical certificate registry and has previously overstated the count
 * elsewhere, so nothing here has been renamed or "tidied". Numeric/legal
 * detail (retention periods, calibration intervals) is copied verbatim; the
 * bs7671_facets RAG holds regulation rules, not this kind of procedural
 * detail, so it could not be checked against it.
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
  AppendixTable,
  VideoCard,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Test Documentation and Certification - MOET Module 4.5.5';
const DESCRIPTION =
  'Comprehensive guide to test documentation and certification for maintenance technicians: recording actual values, completing test schedules, electrical installation certificates, and maintaining accurate records in accordance with BS 7671.';

const quickCheckQuestions = [
  {
    id: 'doc-purpose',
    question: 'Why is accurate test documentation essential in electrical maintenance?',
    options: [
      'It removes the need to carry out testing on any future periodic inspection.',
      'It allows the technician to round and adjust results to convenient values.',
      'It provides a permanent compliance record and baseline for comparison between inspections.',
      'It guarantees the installation will never develop a fault in service.',
    ],
    correctIndex: 2,
    explanation:
      "Accurate test documentation serves multiple critical purposes: it provides a baseline record of the installation's condition for future comparison, demonstrates compliance with BS 7671 and the Electricity at Work Regulations 1989, provides evidence of due diligence in the event of an incident, and enables condition-based maintenance decisions based on trending data.",
  },
  {
    id: 'doc-actual-values',
    question: 'When recording test results, what is the correct approach?',
    options: [
      'Record only "pass" or "fail" against each test on the schedule.',
      'Record the minimum acceptable value from BS 7671 rather than the reading.',
      'Round every reading up to the nearest convenient whole number for clarity.',
      'Always record the actual measured value, not a rounded or adjusted figure.',
    ],
    correctIndex: 3,
    explanation:
      'Always record the actual measured value, not a rounded or adjusted figure. If the insulation resistance reading is 127 MΩ, record 127 MΩ — not ">1 MΩ" or "pass". Actual values enable meaningful comparison between inspections and provide the data needed for condition-based maintenance decisions.',
  },
  {
    id: 'doc-eicr',
    question: 'What is the purpose of an Electrical Installation Condition Report (EICR)?',
    options: [
      'To certify a brand-new installation before it is first energised and handed over.',
      'To record only the test results obtained for a single final circuit.',
      "To set out the manufacturer's technical data and ratings for the consumer unit.",
      'To record the condition of an existing installation and classify deficiencies by severity.',
    ],
    correctIndex: 3,
    explanation:
      'An EICR records the condition of an existing electrical installation at the time of inspection. It identifies any deficiencies and classifies them using the standard coding system: C1 (danger present — requires immediate action), C2 (potentially dangerous — urgent remedial action required), C3 (improvement recommended), and FI (further investigation required). The EICR enables the duty holder to make informed decisions about remedial work.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'When completing a schedule of test results, the insulation resistance value recorded should be:',
    options: [
      'The minimum acceptable value from BS 7671',
      'The actual measured value from the calibrated test instrument',
      'An estimated value based on the circuit length',
      'The value printed on the cable specification',
    ],
    correctAnswer: 1,
    explanation:
      "The schedule of test results must contain the actual measured values obtained using a calibrated test instrument. Recording minimum acceptable values, estimates, or specification values defeats the purpose of testing and may constitute a fraudulent record. The actual values enable trend analysis between inspections and provide genuine evidence of the installation's condition.",
  },
  {
    id: 2,
    question:
      'Which document is issued following the periodic inspection of an existing electrical installation?',
    options: [
      'A Building Regulations Compliance Certificate',
      'An Electrical Installation Certificate (EIC)',
      'An Electrical Installation Condition Report (EICR)',
      'A Minor Electrical Installation Works Certificate (MEIWC)',
    ],
    correctAnswer: 2,
    explanation:
      "An Electrical Installation Condition Report (EICR) is issued following periodic inspection and testing of an existing installation. An EIC is issued for new installations or significant alterations, and a MEIWC is for minor works that do not involve a new circuit. The EICR includes the inspector's overall assessment, observations with classification codes, and the schedule of test results.",
  },
  {
    id: 3,
    question: 'The observation code C1 on an EICR indicates:',
    options: [
      'Improvement is recommended but not required',
      'The installation is satisfactory',
      'Further investigation is required before a classification can be given',
      'Danger present — risk of injury. Immediate remedial action required',
    ],
    correctAnswer: 3,
    explanation:
      "C1 indicates 'Danger present' — there is an immediate risk of injury and the deficiency requires urgent remedial action. The person responsible for the installation should be informed immediately and the danger should be made safe if possible. C1 observations represent the most serious classification and may require immediate isolation of the affected circuit.",
  },
  {
    id: 4,
    question: 'A calibrated test instrument means:',
    options: [
      'It has been verified against traceable reference standards, with a calibration certificate confirming its accuracy',
      'It is brand new from the manufacturer and has never been used in the field before',
      'It has passed a visual inspection and its test leads and probes are undamaged',
      'It has a fully charged battery, a working display and an in-date PAT label',
    ],
    correctAnswer: 0,
    explanation:
      "Calibration is the process of verifying an instrument's accuracy against traceable reference standards (traceable to national standards). A calibration certificate confirms the instrument reads within acceptable limits of accuracy. Test results obtained with uncalibrated instruments may be unreliable and could be challenged in legal proceedings. Most test instruments require annual calibration.",
  },
  {
    id: 5,
    question:
      'When a test result is at or near the minimum acceptable value specified in BS 7671, the technician should:',
    options: [
      'Adjust the reading slightly so that it clearly passes, then record the adjusted value',
      'Record the actual value, flag it as marginal, investigate the cause and consider remedial action',
      'Record only that the circuit passed the test, without noting the actual measured value',
      'Ignore the marginal result, since a pass is a pass regardless of how close to the limit',
    ],
    correctAnswer: 1,
    explanation:
      'Marginal results require professional judgement. While the installation may technically pass at the time of testing, a value near the limit may indicate deterioration that will continue, potentially reaching a dangerous condition before the next inspection. The competent person should record the actual value, note the marginal condition, investigate possible causes (damaged insulation, moisture, contamination), and consider recommending remedial action or a reduced inspection interval.',
  },
  {
    id: 6,
    question: 'Test records should be retained for:',
    options: [
      'One year from the date the installation was first energised and certified',
      'Only until the signed certificate has been handed over to the client',
      'The lifetime of the installation, to enable trend analysis between inspections',
      'Six months, after which the historic records may be safely destroyed',
    ],
    correctAnswer: 2,
    explanation:
      'Test records should be retained for the lifetime of the installation. Previous records enable comparison between inspections (trend analysis), which can reveal gradual deterioration that might not be apparent from a single set of results. The complete test history also demonstrates a regime of proper maintenance and provides evidence of due diligence in the event of an incident or legal proceedings.',
  },
];

const faqs = [
  {
    question: 'What test schedules are required for BS 7671 certification?',
    answer:
      'BS 7671 requires a Schedule of Test Results (formerly Schedule of Inspections and Test Results) to accompany every Electrical Installation Certificate (EIC) and Electrical Installation Condition Report (EICR). The schedule records the results of continuity, insulation resistance, polarity, earth fault loop impedance, RCD, and prospective fault current tests for each circuit. For EICRs, a Schedule of Inspections is also required, recording the visual inspection findings.',
  },
  {
    question: 'Who is competent to sign electrical test certificates?',
    answer:
      'Electrical test certificates must be signed by competent persons. For an EIC, three signatures may be required: the designer, the installer, and the person responsible for inspection and testing. For an EICR, the inspector must be a competent person with the necessary knowledge, skills, and experience to inspect and test electrical installations. Registration with a competent person scheme (such as NICEIC, NAPIT, or ELECSA) provides evidence of competence.',
  },
  {
    question: 'What happens if test instruments are out of calibration?',
    answer:
      'Test results obtained with instruments that are out of calibration may be unreliable and cannot be relied upon as evidence of compliance. If it is discovered that an instrument was out of calibration, all tests performed since the last valid calibration date may need to be repeated. In legal proceedings, test results from uncalibrated instruments are likely to be challenged and may be inadmissible. Maintaining instruments within calibration is a professional obligation.',
  },
  {
    question: 'How should I handle a result that is borderline pass/fail?',
    answer:
      'A borderline result requires professional judgement. Record the actual measured value — never adjust it to make a clear pass or fail. Consider the installation environment, the age of the installation, and the rate of deterioration. A marginal insulation resistance reading in a dry environment may be acceptable with monitoring, while the same reading in a damp environment may indicate a problem requiring immediate attention. Document your reasoning and any recommendations.',
  },
];

const MOETModule4Section5_5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 4 · Section 4.5 · Subsection 5"
        title="Test Documentation and Certification"
        backTo="/study-centre/apprentice/m-o-e-t-module4-section5"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Recording actual values, completing test schedules, and maintaining accurate
            certification records.
          </p>

          <TLDR
            points={[
              'Record actual values: Never round, estimate, or record pass/fail only',
              'Calibrated instruments: All test results require calibrated equipment',
              'Correct certificates: EIC for new work, EICR for existing installations',
              'Retain records: Keep for the lifetime of the installation',
            ]}
          />

          <ConceptBlock title="Maintenance technician context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Legal evidence:</strong> Test records demonstrate due diligence and
                compliance
              </li>
              <li>
                <strong>Trend analysis:</strong> Comparing values between inspections reveals
                deterioration
              </li>
              <li>
                <strong>Professional duty:</strong> Accurate documentation is a core competency
              </li>
              <li>
                <strong>ST1426:</strong> Maps to documentation and reporting competencies
              </li>
            </ul>
          </ConceptBlock>

          <LearningOutcomes
            outcomes={[
              'Record actual measured test values accurately and consistently',
              'Complete schedules of test results in accordance with BS 7671',
              'Understand the purpose and content of EICs, MEIWCs, and EICRs',
              'Apply the EICR observation classification system (C1, C2, C3, FI)',
              'Maintain calibration records for test instruments',
              'Retain and organise test documentation for the installation lifetime',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Recording actual values</ContentEyebrow>

          <ConceptBlock title="Recording Actual Values">
            <p>
              Always record the actual measured value, not a rounded or adjusted figure. If the
              insulation resistance reading is 127 MΩ, record 127 MΩ — not &quot;&gt;1 MΩ&quot; or
              &quot;pass&quot;. If the RCD trip time is 22 ms, record 22 ms — not &quot;&lt;40
              ms&quot;. Actual values enable meaningful comparison between inspections and provide
              the data needed for condition-based maintenance decisions. The only exception is where
              the instrument reads overrange (e.g., &quot;&gt;200 MΩ&quot;), in which case the
              overrange indication should be recorded as such.
            </p>
            <p>
              Recording &quot;pass&quot; or &quot;fail&quot; instead of actual values removes all
              useful information. A circuit with insulation resistance of 2 MΩ and one with 200 MΩ
              would both be recorded as &quot;pass&quot;, yet the first circuit is close to the
              minimum acceptable value and may be deteriorating. Only by recording actual values can
              this deterioration be tracked over time.
            </p>
          </ConceptBlock>

          <AppendixTable
            caption="Good Practice vs Poor Practice"
            headers={['Test', 'Good Record', 'Poor Record']}
            rows={[
              ['Insulation resistance', '127 MΩ', 'Pass / ">1 MΩ"'],
              ['RCD trip time', '22 ms', 'Pass / "<300 ms"'],
              ['Zs', '0.48 Ω', 'OK / Within limits'],
              ['Continuity (R1+R2)', '0.34 Ω', 'Satisfactory'],
            ]}
          />

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Schedules of test results</ContentEyebrow>

          <ConceptBlock title="Schedules of Test Results">
            <p>
              The Schedule of Test Results is the detailed record that accompanies every Electrical
              Installation Certificate (EIC) and Electrical Installation Condition Report (EICR). It
              records the results of all tests performed on each circuit, providing a complete
              picture of the installation&apos;s electrical condition at the time of testing.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Information required for each circuit">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Circuit identification:</strong> Circuit number, description, and location
              </li>
              <li>
                <strong>Circuit details:</strong> Cable type, size, reference method, overcurrent
                device type and rating
              </li>
              <li>
                <strong>Continuity:</strong> R1+R2 or R2 values in ohms
              </li>
              <li>
                <strong>Insulation resistance:</strong> Between live conductors and between live
                conductors and earth, in MΩ
              </li>
              <li>
                <strong>Polarity:</strong> Confirmation of correct polarity
              </li>
              <li>
                <strong>Earth fault loop impedance:</strong> Zs value in ohms
              </li>
              <li>
                <strong>RCD:</strong> Type, rating, and measured trip time
              </li>
              <li>
                <strong>Prospective fault current:</strong> Ipf at the origin or relevant point
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Common documentation errors">
            <p>
              Common errors include: leaving fields blank (every field should contain a value, N/A,
              or a dash with explanation), recording values without units, using incorrect test
              voltage for insulation resistance, failing to record which circuits were tested on the
              EICR, and not recording the instrument serial numbers and calibration dates. These
              errors can invalidate the certificate and may have legal consequences.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Certificates and reports</ContentEyebrow>

          <ConceptBlock title="Certificates and Reports">
            <p>
              BS 7671 specifies three main certification documents, each serving a different
              purpose. Using the correct document for the type of work carried out is essential —
              issuing the wrong certificate type is a common error that can have regulatory
              implications.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Electrical Installation Certificate (EIC)">
            <p>
              Issued for new installations, complete rewires, and alterations that include new
              circuits. The EIC certifies that the work complies with BS 7671 and includes the
              design, construction, and inspection/testing stages. It requires up to three
              signatories: designer, installer, and inspector/tester (which may be the same person
              for smaller works).
            </p>
          </ConceptBlock>

          <ConceptBlock title="Minor Electrical Installation Works Certificate (MEIWC)">
            <p>
              Issued for minor works that do not include the provision of a new circuit — such as
              adding a socket to an existing circuit, replacing a consumer unit on existing
              circuits, or adding a fused spur. The MEIWC is a simplified form but still requires
              test results and confirmation of compliance.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Electrical Installation Condition Report (EICR)">
            <p>
              Issued following the periodic inspection and testing of an existing installation. The
              EICR records the condition of the installation at the time of inspection and includes
              observations classified by severity: C1 (danger present), C2 (potentially dangerous),
              C3 (improvement recommended), and FI (further investigation required). The overall
              assessment states whether the installation is satisfactory or unsatisfactory.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Instrument calibration and record keeping</ContentEyebrow>

          <ConceptBlock title="Instrument Calibration and Record Keeping">
            <p>
              All test instruments used for certification purposes must be calibrated and within
              their calibration period. Calibration is the process of verifying an instrument&apos;s
              accuracy against traceable reference standards — standards that can be traced back to
              national measurement standards. A calibration certificate confirms that the instrument
              reads within acceptable limits of accuracy for each measurement function and range.
            </p>
            <p>
              The serial numbers and calibration dates of all instruments used must be recorded on
              the certification documents. This provides traceability — if a question arises about
              the validity of test results, the calibration status of the instrument at the time of
              testing can be verified. Most test instruments require annual calibration, although
              the calibration interval may vary depending on the instrument type, usage, and
              manufacturer&apos;s recommendations.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Record retention">
            <p>
              Test records should be retained for the lifetime of the installation. Previous records
              enable trend analysis — comparing values between inspections to identify gradual
              deterioration that might not be apparent from a single set of results. The Electricity
              at Work Regulations 1989 do not specify a retention period, but best practice is
              indefinite retention. Digital record-keeping systems make this practical and allow
              easy retrieval and comparison.
            </p>
            <p className="italic">
              <strong className="not-italic">ST1426 link:</strong> Accurate test documentation and
              certification is a core competency for the maintenance technician standard. You will
              be expected to complete test schedules correctly, select the appropriate certification
              document, and maintain organised records. Developing good documentation habits during
              your apprenticeship is essential for professional practice.
            </p>
          </ConceptBlock>

          <SectionRule />

          <VideoCard
            url="https://www.youtube.com/watch?v=DJn8KIQkApo"

            title="Schedule of Inspections"

            channel="Craig Wiltshire"

            duration="2:48"

            topic="What the schedule is for and how it is filled in"

            caption="Short and specific — the schedule of inspections is the part of certification most often completed badly."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Certification documents: EIC for new installations and new circuits; MEIWC for minor works with no new circuits; EICR for periodic inspection of existing installations. All require schedules of test results.',
              'Record instrument serial numbers and calibration dates on the certification documents.',
              'EICR classification codes: C1 danger present — immediate action required; C2 potentially dangerous — urgent action required; C3 improvement recommended; FI further investigation required.',
              'Retain all test records for the lifetime of the installation.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section5-4')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Functional Testing
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section5-6')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Commissioning Procedures
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule4Section5_5;
