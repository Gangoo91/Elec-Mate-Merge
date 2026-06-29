import { ArrowLeft, ChevronLeft, ChevronRight, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  LearningOutcomes,
  ContentEyebrow,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'patm5-s2-min-record',
    question:
      'A test record contains: "Kettle — passed — 12 Jan 2026". Is this an acceptable in-service test record under HSG107?',
    options: [
      'Yes — a pass plus a date is the recognised legal minimum.',
      'No — it lacks the asset ID, location, tester, class and numerical results.',
      'Yes, provided the company logo appears on the page.',
      'Only if a second competent person countersigns the line.',
    ],
    correctIndex: 1,
    explanation:
      'HSG107 paragraph 70 and IET CoP 5th Ed. Chapter 16 expect the record to contain enough information to identify the item, the tester, the test conducted, the actual results (numerical where applicable), and the date. "Passed" alone is not a record — it is a claim with no audit trail.',
  },
  {
    id: 'patm5-s2-retention',
    question:
      'A piece of equipment is disposed of in 2026. How long should its PAT records be retained, in line with normal in-service inspection practice?',
    options: [
      'Records can be deleted as soon as the item is disposed of.',
      'Typically 6 years post-disposal, aligned with the Limitation Act 1980 claim window.',
      '12 months from the date of the final test on the item.',
      'Indefinitely — PAT records must never be deleted at all.',
    ],
    correctIndex: 1,
    explanation:
      'Under the Limitation Act 1980 a personal injury or negligence claim can be brought up to 6 years from the cause of action (3 years for personal injury, but with extensions for date of knowledge). Industry practice is to retain PAT records for at least 6 years post-disposal as the "reasonably practicable" defence requires the records still to exist when a claim arises.',
  },
  {
    id: 'patm5-s2-pat-vs-sotr',
    question:
      'A PAT record and a Schedule of Test Results (SoTR) on an EICR — what is the relationship?',
    options: [
      'They are the same document under two different names.',
      'They are different — PAT covers portable appliances, the SoTR covers fixed circuits.',
      'PAT records replace the SoTR when both are done on the same day.',
      'Only the SoTR is legally required; PAT records are entirely optional.',
    ],
    correctIndex: 1,
    explanation:
      'PAT records are about appliances and lead-fed equipment and sit under the IET CoP / HSG107 framework. The Schedule of Test Results on an EIC/EICR is about the fixed installation circuits and sits under BS 7671. They are separate documents covering separate scopes; conflating them is a common audit failure.',
  },
  {
    id: 'patm5-s2-defence',
    question:
      'A duty holder is investigated after an electric shock incident. The PAT records produced show only "all equipment passed — annual test" on a single line. What is the legal exposure?',
    options: [
      'None — the test was carried out and a record was kept.',
      'High — the record cannot show which items, tester, instrument or readings.',
      'Low — a pass is a pass, so the summary line is sufficient.',
      'Exposure only arises if the incident involved a fatality.',
    ],
    correctIndex: 1,
    explanation:
      'HSAW 1974 Sec 2 requires the employer to ensure the safety of employees "so far as is reasonably practicable". Demonstrating that requires records that identify what was done, when, by whom and with what result. A summary line is not the record HSE or a court will look for.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'HSG107 paragraph 70 lists the minimum information a PAT record should contain. Which set best matches it?',
    options: [
      'Asset ID, type/class, location, tester, date, numerical results, retest interval and result',
      'The pass/fail outcome and the date of test only',
      'The manufacturer, model and serial number of the item',
      'The purchase cost and the depreciation schedule',
    ],
    correctAnswer: 0,
    explanation:
      'HSG107 paragraph 70 and IET CoP 5th Ed. Chapter 16 between them list this set: asset ID, type/class, location, tester, date, results (numerical), retest interval, and pass/fail. The numerical values are what distinguish a record from a claim.',
  },
  {
    id: 2,
    question:
      'EAWR 1989 Reg 4(2) requires "all systems shall be maintained so as to prevent, so far as is reasonably practicable, danger". How does this give rise to the record-keeping duty for PAT?',
    options: [
      'It does not — keeping PAT records is entirely voluntary',
      'The regulation explicitly mandates written records by name',
      'Maintenance is unverifiable without records, so the record is the evidence',
      'Records only matter for the fixed wiring, not for appliances',
    ],
    correctAnswer: 2,
    explanation:
      'EAWR Reg 4(2) does not explicitly demand records, but the implicit duty is unavoidable: a duty holder cannot demonstrate "so far as is reasonably practicable" without contemporaneous evidence. HSG107 makes the implicit explicit — records are how the duty is demonstrated.',
  },
  {
    id: 3,
    question:
      'Why does "the equipment passed" without numerical results fail the HSE\'s expectation of a useful record?',
    options: [
      'It does not — a bare pass is sufficient for any equipment',
      'It only fails the expectation for heavy industrial equipment',
      'It is acceptable provided a company seal is on the document',
      'A pass with no numerical readings cannot be re-examined or trended later',
    ],
    correctAnswer: 3,
    explanation:
      'Numerical readings (insulation resistance in MΩ, earth continuity in Ω, leakage in mA) are what let a future investigator confirm the test was conducted properly. If the item subsequently fails or causes an incident, a bare "pass" gives no way to show whether earlier readings were trending towards failure or whether the test was even genuine. The numerical values are the audit trail.',
  },
  {
    id: 4,
    question:
      'Industry practice (driven by Limitation Act 1980 considerations) for retaining PAT records is:',
    options: [
      '6 years post-disposal, longer where an incident occurred or a regulated sector requires it',
      '6 months from the date of the final test on the item',
      'Until the next scheduled test only, then they can be discarded',
      'Indefinitely, with no review or scheduled deletion at all',
    ],
    correctAnswer: 0,
    explanation:
      "The Limitation Act 1980 sets the standard claim window at 6 years (with longer where a claimant's date of knowledge is later, and 3 years for personal injury). Industry practice is to retain records 6 years post-disposal so the records exist if a claim is brought. Some sectors (healthcare, education, regulated industries) require longer.",
  },
  {
    id: 5,
    question:
      'A PAT record and the BS 7671 Schedule of Test Results (SoTR) on an EIC — what is the right way to think about them?',
    options: [
      'They are the same document recorded twice',
      'A PAT record fully replaces the SoTR on the EIC',
      'Different scopes and regimes — they sit alongside each other, not interchangeable',
      'The SoTR fully replaces the PAT records for the site',
    ],
    correctAnswer: 2,
    explanation:
      'PAT records cover portable / lead-fed equipment under IET CoP / HSG107 / EAWR; the Schedule of Test Results on an EIC/EICR records circuit-level fixed-installation results (Zs, R1+R2, RCD trip times) under BS 7671. They are produced by different processes and answer different questions. Treating them as substitutes is a common audit failure.',
  },
  {
    id: 6,
    question:
      'Which of the following items belongs in a PAT test record but not on the equipment label?',
    options: [
      'The asset ID for the item',
      'The next retest date for the item',
      'The tester ID who carried out the test',
      'Numerical test values plus the instrument used and its calibration date',
    ],
    correctAnswer: 3,
    explanation:
      'The label is a summary; the record is the detail. Numerical readings (insulation resistance in MΩ, earth continuity in Ω, leakage in mA), instrument identification and calibration status live in the record. The label carries the headline status — pass/fail plus dates and IDs.',
  },
  {
    id: 7,
    question:
      'Under HSAW 1974 Section 2, what is the relationship between PAT records and the "reasonably practicable" defence?',
    options: [
      'The records are the contemporaneous evidence the defence relies on',
      'There is no relationship between the records and the defence',
      'Records only matter once a case reaches the courtroom',
      'Section 2 does not apply to electrical equipment at all',
    ],
    correctAnswer: 0,
    explanation:
      'HSAW Sec 2(1) places the "reasonably practicable" duty on every employer. Discharge requires evidence; PAT records are part of that evidence. HSE will ask for them in any investigation.',
  },
  {
    id: 8,
    question:
      'GDPR / Data Protection Act 2018 — when do PAT records become a data-protection concern?',
    options: [
      'Never — PAT records are not personal data',
      'Only when the records are shared with an external party',
      'When the register carries personal data such as named assignees or home addresses',
      'Only when the records are held on cloud storage',
    ],
    correctAnswer: 2,
    explanation:
      'A PAT record itself is not personal data, but the asset register often is — particularly where an asset is assigned to a named user, located at a home address (homeworkers), or where the tester ID is identifiable. Treat the register as a personal data processing activity and apply DPA 2018 / UK GDPR principles.',
  },
  {
    id: 9,
    question:
      'A PAT instrument provides automatic data logging. What is the procedural advantage of using it instead of paper records?',
    options: [
      'It is simply faster to work through the bench',
      'Automatic logging is mandated outright by HSG107',
      'It removes the need for a competent person to test',
      'It captures results, time-stamps and instrument ID automatically, removing transcription error',
    ],
    correctAnswer: 3,
    explanation:
      "The procedural advantage is record fidelity: the meter writes numerical readings the same way every time, links them to a specific test, and ties them to the instrument's own calibration record. Paper records lose data to transcription. The competent-person duty does not change — automatic logging records what the competent person tested, it does not replace them.",
  },
  {
    id: 10,
    question:
      'When a PAT record is challenged in an HSE investigation, what makes the difference between a defensible record and an indefensible one?',
    options: [
      'Specificity — item, tester, date, instrument, numerical readings and the result',
      'How thick the overall record file is on the shelf',
      'Whether the record is printed on company letterhead',
      'The number of signatures collected on the record',
    ],
    correctAnswer: 0,
    explanation:
      'A defensible record identifies the item (asset ID), the tester (named, identifiable), the date (precise, not "during 2026"), the instrument (model and calibration), the readings (numerical) and the result. The defensibility test is whether a third party can reconstruct the test from the record. If the record is "all equipment passed", the answer is no — and the "reasonably practicable" defence under HSAW Sec 2 is undermined.',
  },
];

const PATTestingModule5Section2 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'PAT records and legal requirements | PAT Module 5.2 | Elec-Mate',
    description:
      'HSG107 + IET CoP 5th Ed. Ch 16 + EAWR Reg 4(2) + HSAW Sec 2: minimum record set, why "passed" is not a record, retention periods (Limitation Act 1980 6 years), GDPR for asset registers, and PAT vs Schedule of Test Results.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/pat-testing-module-5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 5
          </button>

          <PageHero
            eyebrow="Module 5 · Section 2"
            title="Test record keeping and legal requirements"
            description="The record is what discharges the EAWR and HSAW duty. Minimum data set under HSG107, why numerical readings matter, retention under the Limitation Act 1980, and GDPR for asset registers."
            tone="yellow"
          />

          <TLDR
            points={[
              'HSG107 paragraph 70 + IET CoP 5th Ed. Chapter 16 set the minimum useful record: asset ID, equipment type/class, location, tester, date, retest interval, numerical test results, and pass/fail. "Passed" alone is not a record.',
              'EAWR 1989 Reg 4(2) creates the implicit record duty. The regulation requires maintenance "so far as is reasonably practicable to prevent danger" — which is unverifiable without records.',
              'HSAW 1974 Section 2 makes records the evidence of the "reasonably practicable" defence. HSE and a court will both ask for them in any investigation.',
              'Retention: 6 years post-disposal is industry practice, anchored to the Limitation Act 1980 claim window. Longer for HSE-relevant incidents or regulated environments.',
              'PAT records and the Schedule of Test Results (SoTR) on an EIC/EICR are different documents covering different scopes. Do not conflate.',
              'Asset registers carrying personal data (assignee names, home addresses) are subject to UK GDPR / Data Protection Act 2018 — apply lawful basis, retention rules and access controls.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'List the minimum data fields HSG107 + IET CoP 5th Ed. Chapter 16 expect on a PAT record and explain why each is non-negotiable',
              'Trace the legal chain from EAWR Reg 4(2) and HSAW Sec 2 to the practical duty to keep records',
              'State the standard retention period for PAT records and justify it from the Limitation Act 1980',
              'Distinguish a PAT record from a BS 7671 Schedule of Test Results and explain why the two are not interchangeable',
              'Identify when an asset register engages UK GDPR / Data Protection Act 2018 and apply the appropriate controls',
              'Defend a PAT record against an HSE / insurer challenge — specificity, numerical results, and traceability to a competent person',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>What the record has to contain</ContentEyebrow>

          <ConceptBlock
            title="HSG107 paragraph 70 — the minimum useful record"
            plainEnglish="The record has to let any third party reconstruct what was tested, by whom, when, with what instrument, and what was found. Anything less and the record is a claim, not evidence."
            onSite="If your test sheet has a tick-box for pass/fail and no field for actual readings, change the test sheet. The numerical readings are the load-bearing part."
          >
            <p>
              HSG107 paragraph 70 and IET CoP 5th Ed. Chapter 16 list, between them, the data the
              record must carry:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Asset identification</strong> — the unique asset ID linking the record to
                the physical item.
              </li>
              <li>
                <strong>Equipment description and class</strong> — what the item is (e.g. kettle,
                drill, IEC lead) and its construction class (Class I, Class II, Class III).
              </li>
              <li>
                <strong>Location</strong> — where the item lives. Vital for periodic site visits and
                for identifying which user / department is responsible.
              </li>
              <li>
                <strong>Date of test</strong> — calendar date, not just month/year.
              </li>
              <li>
                <strong>Tester identification</strong> — named, identifiable competent person.
              </li>
              <li>
                <strong>Test instrument used and its calibration date</strong> — links the numerical
                readings to a calibrated instrument. A reading from an out-of-calibration meter is
                not evidence.
              </li>
              <li>
                <strong>Numerical test results</strong> — earth continuity in ohms, insulation
                resistance in megohms, leakage current in milliamps, polarity, and any specific
                tests carried out (e.g. functional check, flex check). For visual-only inspections,
                the visual checks recorded.
              </li>
              <li>
                <strong>Pass/fail result</strong> — and where fail, the failure mode.
              </li>
              <li>
                <strong>Retest interval / next test date</strong> — the planned interval.
              </li>
              <li>
                <strong>Comments</strong> — anything not covered by the structured fields:
                substitutions, deferred tests, equipment found defective and quarantined, repair
                history.
              </li>
            </ul>
            <p>
              The numerical readings are not optional. A &ldquo;pass&rdquo; with no readings cannot
              be reconstructed: a future investigator has no way to know whether the item was
              borderline, whether the tester actually carried out the tests, or whether the
              instrument was even working. Numerical readings are the audit trail.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="HSG107 (Maintaining portable electric equipment, 4th Edition) · paragraph 70"
            clause={
              <>
                Records of inspection and testing should be kept where this helps to demonstrate
                compliance with the Electricity at Work Regulations 1989. The records should include
                the equipment identification, type and condition, the date of any inspection or
                test, the name of the person carrying out the inspection or test, and the results.
              </>
            }
            meaning="HSG107 sets the practical minimum. The fields are intentionally aligned to what an HSE inspector would ask for in an investigation — not just to demonstrate that testing happened, but to identify what was tested, by whom, when, and with what result. Records less detailed than this make the EAWR Reg 4(2) defence harder, not easier."
          />

          <ConceptBlock
            title="Why &ldquo;passed&rdquo; is a claim, not a record"
            plainEnglish="A bare 'passed' is the conclusion the tester reached, but with no underlying data. Without the underlying data, the conclusion cannot be independently verified, and it cannot be defended in an investigation."
          >
            <p>
              The HSE pattern in workplace electrical-injury investigations is consistent: when an
              incident occurs, the records are requested, examined, and used to assess whether the
              duty holder met the &ldquo;so far as is reasonably practicable&rdquo; standard. The
              records that survive that scrutiny are the ones with numerical readings against the
              actual asset, on the actual date, by a named tester, on a calibrated instrument.
            </p>
            <p>
              Records that fail the scrutiny share a pattern: tick-box pass/fail with no readings,
              tester identified only as a company name, instrument identification missing, asset ID
              absent, dates given as a month or year. Each missing field is a fact the duty holder
              cannot now produce — and the absent fact is read against them.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Recording &ldquo;all equipment passed&rdquo; on a single line for a session"
            whatHappens="A small office is PAT tested. The test sheet has one line: 'All equipment passed annual test — 12 Jan 2026 — A. Moore'. Eight months later there is an electric shock incident on a kettle in the staff room. The HSE investigator asks for the test record for that kettle. There is no asset ID, no readings, no instrument record. The record is treated as 'no record', the duty holder cannot demonstrate maintenance for that specific item, and EAWR Reg 4(2) compliance becomes difficult to argue."
            doInstead="One line per item, with the full data set: asset ID, item description and class, location, test date, tester, instrument and calibration, numerical readings, pass/fail. A modern PAT instrument or test-management app does this automatically — there is no time saving in collapsing the record. Defensibility lives in the line-per-item detail."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The legal chain — EAWR, HSAW and the implicit record duty</ContentEyebrow>

          <ConceptBlock
            title="EAWR 1989 Reg 4(2) — maintenance &ldquo;so far as is reasonably practicable&rdquo;"
            plainEnglish="The Electricity at Work Regulations require that electrical systems are maintained as far as is reasonably practicable to prevent danger. The regulation does not say 'keep records' — but you cannot demonstrate the maintenance happened without them."
            onSite="When HSE asks 'how do you know the kettle was safe?', the answer has to be evidence. The record is the evidence."
          >
            <p>
              EAWR 1989 Reg 4(2) is short. It places a duty: &ldquo;As may be necessary to prevent
              danger, all systems shall be maintained so as to prevent, so far as is reasonably
              practicable, such danger.&rdquo; The phrase &ldquo;so far as is reasonably
              practicable&rdquo; is the load-bearing one — it requires the duty holder to weigh up
              the risk and the cost/effort of mitigation, and to act where the risk-cost balance
              favours action.
            </p>
            <p>
              The regulation does not explicitly mandate records. The implicit duty is unavoidable:
              demonstrating that maintenance has been done &ldquo;so far as is reasonably
              practicable&rdquo; requires evidence. Without records, the duty holder cannot evidence
              the maintenance, and HSE / a court will treat the absence of records as the absence of
              maintenance unless there is some other compelling evidence (which there rarely is).
              This is why HSG107 — published by HSE itself — frames record-keeping as the practical
              way the EAWR duty is discharged.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Electricity at Work Regulations 1989 · Regulation 4(2)"
            clause={
              <>
                As may be necessary to prevent danger, all systems shall be maintained so as to
                prevent, so far as is reasonably practicable, such danger.
              </>
            }
            meaning="The duty is on maintenance, not on records — but records are the only practical way to demonstrate the duty has been discharged. HSG107 makes this explicit: keep records to demonstrate compliance with EAWR. The regulation is short; the evidential burden it implies is large."
          />

          <RegsCallout
            source="Health and Safety at Work etc. Act 1974 · Section 2(1)"
            clause={
              <>
                It shall be the duty of every employer to ensure, so far as is reasonably
                practicable, the health, safety and welfare at work of all his employees.
              </>
            }
            meaning="The umbrella duty. Every more specific regulation — EAWR, PUWER, HSG107 guidance — sits beneath this. 'Reasonably practicable' is the legal test; PAT records are part of how the test is satisfied for electrical equipment safety."
          />

          <ConceptBlock
            title="HSAW Section 2 and the &ldquo;reasonably practicable&rdquo; defence"
            plainEnglish="When HSE prosecute or investigate, the legal question is whether the employer did everything reasonably practicable to manage the risk. The PAT records are the contemporaneous evidence the employer points to. Without them, the defence is much weaker."
          >
            <p>
              In HSE investigations and Health and Safety at Work prosecutions, the &ldquo;so far as
              is reasonably practicable&rdquo; phrase is interpreted by reference to the evidence
              the duty holder can produce. The case law tradition (going back to{' '}
              <em>Edwards v National Coal Board</em>) treats the duty as discharged when the cost
              and effort of further measures would be grossly disproportionate to the risk averted.
              That is a question of evidence: what did the employer actually do, when, with what
              care.
            </p>
            <p>For PAT, the evidence is:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>The records.</strong> Test results, dates, testers, instruments, outcomes.
              </li>
              <li>
                <strong>The competent-person regime.</strong> Who is testing, what training and
                certification they hold, how they are managed.
              </li>
              <li>
                <strong>The test-frequency policy.</strong> What intervals are set, how they were
                arrived at, how they are reviewed in light of failure rates.
              </li>
              <li>
                <strong>The fault-handling response.</strong> What happened when items failed — the
                quarantine, repair, retest, or disposal.
              </li>
            </ul>
            <p>
              Each of those four lives in records. A regime that has policies but no records, or
              records that are summaries without detail, looks like a regime that has the vocabulary
              of compliance without the substance.
            </p>
          </ConceptBlock>

          <Scenario
            title="A shock incident and an HSE request for records"
            situation="An employee receives a 230 V shock from a kettle in a staff room. They are off work for two weeks. HSE investigates. They ask for the PAT records for that kettle. The duty holder produces a printed sheet that says 'Office equipment — annual PAT — passed — 14 Jun 2026 — Test Co Ltd'. There is no asset ID on the kettle and no per-item record."
            whatToDo="The duty holder is now in a difficult position. They cannot show that the specific kettle was tested. They cannot produce numerical readings. They cannot identify the tester by name. They cannot confirm which instrument was used or its calibration status. The HSE investigator has nothing to verify against. The 'reasonably practicable' defence is effectively unavailable on the kettle specifically — even if the wider regime is documented, the per-item evidence is absent."
            whyItMatters="The point of recordkeeping is not bureaucratic — it is evidential. When a single item causes an incident, the record for THAT item is what is requested, examined, and weighed. A regime-level summary does not protect a specific item. The lesson is per-item recordkeeping, every time, with the full HSG107 paragraph 70 data set."
          />

          <RegsCallout
            source="HSE INDG236 (Maintaining portable electric equipment in low-risk environments) · introductory section"
            clause={
              <>
                The dutyholder needs to keep maintenance records to satisfy themselves that the
                maintenance is being carried out, but more importantly to provide an audit trail
                that the work has been done. Records can also be useful in formulating the
                appropriate frequency for re-inspection or retesting.
              </>
            }
            meaning="HSE\'s own consolidated guidance for low-risk environments treats records as the audit trail and as the data feeding interval review. Even in low-risk contexts where formal testing may be limited, the record is what HSE expects to see."
          />

          <SectionRule />

          <ContentEyebrow>Retention — how long records have to live</ContentEyebrow>

          <ConceptBlock
            title="6 years post-disposal — the Limitation Act 1980 anchor"
            plainEnglish="Under the Limitation Act 1980, civil claims (contract, tort, negligence) generally have to be brought within 6 years of the cause of action. Personal injury is shorter (3 years) but with extensions for late knowledge. Industry practice is to keep PAT records for 6 years post-disposal — by which point most claim windows have closed."
            onSite="Do not delete PAT records when an item is disposed of. The 6-year clock starts from disposal (or, more precisely, from the latest event that could give rise to a claim). Keep the asset register row marked 'disposed' rather than deleting it."
          >
            <p>The Limitation Act 1980 sets default time limits for civil claims:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Contract claims (Section 5):</strong> 6 years from breach.
              </li>
              <li>
                <strong>Tort claims (Section 2):</strong> 6 years from damage.
              </li>
              <li>
                <strong>Personal injury (Section 11):</strong> 3 years, but extendable from
                &ldquo;date of knowledge&rdquo; — so a claim can run later than 3 years post-event
                where the injury was not initially apparent.
              </li>
              <li>
                <strong>Latent damage (Section 14A):</strong> the date-of-knowledge extension
                applies, with a long-stop of 15 years.
              </li>
            </ul>
            <p>
              The practical industry standard for PAT records is{' '}
              <strong>6 years post-disposal of the equipment</strong>. This covers the most common
              civil-claim windows and aligns with the broader retention periods used by insurers.
              For some sectors (healthcare, education involving children, regulated industries)
              longer retention is required — healthcare records, for example, can require retention
              until the patient reaches a specific age. Check sector-specific guidance.
            </p>
            <p>
              Equipment that has been involved in an HSE-relevant incident gets longer retention.
              The records of the incident, the prior testing, the post-incident testing and any
              corrective action are the evidential file for any subsequent prosecution or claim, and
              should be retained until the matter is fully concluded plus the relevant limitation
              period. This can mean 10+ years.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Limitation Act 1980 · Section 5 (simple contract) and Section 2 (tort)"
            clause={
              <>
                An action founded on simple contract shall not be brought after the expiration of
                six years from the date on which the cause of action accrued. (Section 5) An action
                founded on tort shall not be brought after the expiration of six years from the date
                on which the cause of action accrued. (Section 2)
              </>
            }
            meaning="The 6-year limitation under sections 2 and 5 is the anchor for industry-standard PAT record retention. PAT records are kept for at least 6 years post-disposal so that, if a claim is brought within the limitation window, the evidential record still exists."
          />

          <CommonMistake
            title="Deleting records when an item is disposed of"
            whatHappens="A drill is disposed of after a failed earth continuity test. The asset register row is deleted to keep the register tidy. Two years later, an ex-employee brings a claim relating to a shock they received from the same drill before disposal. The duty holder has no record of when the drill was tested, what its history was, or when it was withdrawn from service."
            doInstead="Mark the asset register row 'DISPOSED' with the disposal date; do not delete it. Retain the test history under that row for at least 6 years post-disposal, longer where the item was involved in an incident. The register grows over time — that is fine; storage is cheap and the evidential value of the history is high."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>
            PAT records vs Schedule of Test Results — different documents
          </ContentEyebrow>

          <ConceptBlock
            title="The PAT record and the BS 7671 SoTR sit in different regulatory regimes"
            plainEnglish="A PAT record is about appliances and lead-fed equipment under the IET CoP / HSG107 / EAWR framework. The Schedule of Test Results (SoTR) on an EIC or EICR is about the fixed installation circuits under BS 7671. They cover different scopes and do not substitute for each other."
            onSite="When an EICR is produced for a building, that document does not cover the kettle in the staff room. When a PAT round is done on the appliances, that record does not cover the cooker circuit. Both are needed."
          >
            <p>The two documents differ in several material ways:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px] my-2">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="text-left text-white/80 py-2">Aspect</th>
                    <th className="text-left text-white/80 py-2">PAT record</th>
                    <th className="text-left text-white/80 py-2">SoTR (BS 7671)</th>
                  </tr>
                </thead>
                <tbody className="text-white/95">
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2 font-semibold">Regulatory regime</td>
                    <td className="py-2">EAWR / HSAW / HSG107 / IET CoP 5th Ed.</td>
                    <td className="py-2">BS 7671 / EAWR / HSAW</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2 font-semibold">Scope</td>
                    <td className="py-2">Portable / lead-fed appliances and equipment</td>
                    <td className="py-2">Fixed-wiring circuits in the installation</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2 font-semibold">Unit of record</td>
                    <td className="py-2">One row per asset</td>
                    <td className="py-2">One row per circuit</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2 font-semibold">Test results</td>
                    <td className="py-2">
                      Earth continuity (Ω), insulation resistance (MΩ), leakage (mA), polarity
                    </td>
                    <td className="py-2">
                      Zs (Ω), R1+R2 (Ω), insulation resistance (MΩ), RCD trip times (ms)
                    </td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2 font-semibold">Frequency</td>
                    <td className="py-2">Risk-based (IET CoP Table 7.1) — months to years</td>
                    <td className="py-2">Periodic inspection — typically 5 years (domestic)</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-semibold">Document family</td>
                    <td className="py-2">Asset register + per-item test record</td>
                    <td className="py-2">EIC (new work) or EICR (periodic)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Conflating the two is a common audit failure. An EICR for a building is not evidence
              that the printers, kettles and fan heaters in the building have been tested. A PAT
              round is not evidence that the cooker circuit has been verified. The two documents
              live alongside each other and are produced by separate processes.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Asset registers, personal data and UK GDPR</ContentEyebrow>

          <ConceptBlock
            title="When a PAT record or asset register engages UK GDPR / Data Protection Act 2018"
            plainEnglish="A pure test record (asset ID, location 'Office 2', test results) is not personal data. As soon as the record links to a named individual — assignee, homeworker home address, identifiable tester — UK GDPR / DPA 2018 apply, and the asset register becomes a personal-data processing activity."
            onSite="If your asset register includes a 'assigned to' column with names, or location data that is a home address, it is a data-protection record. Apply lawful basis, retention rules, and access controls — same as any HR or employee data."
          >
            <p>
              UK GDPR and the Data Protection Act 2018 apply when personal data is processed.
              Personal data is any information relating to an identified or identifiable natural
              person. PAT records cross into personal data territory in several common ways:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Assignee data:</strong> the asset register includes &ldquo;assigned
                to&rdquo; columns with named employees. The register now combines employee data with
                equipment data — the employee is identifiable.
              </li>
              <li>
                <strong>Home addresses:</strong> for homeworkers, the &ldquo;location&rdquo; field
                is the employee&rsquo;s home address. Home addresses are personal data and are
                considered relatively sensitive.
              </li>
              <li>
                <strong>Tester identification:</strong> tester names, signatures, qualifications.
                Personal data, though often handled under contract / employment basis.
              </li>
              <li>
                <strong>Audit trail of who used / signed for equipment:</strong> any history that
                links equipment events to named users.
              </li>
            </ul>
            <p>Where the register is personal data, the duty holder must:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                Identify a <strong>lawful basis</strong> for processing (typically Article 6(1)(c) —
                legal obligation under EAWR — or Article 6(1)(f) — legitimate interests for
                workplace safety).
              </li>
              <li>
                Apply <strong>retention rules</strong> consistent with the lawful basis. The
                Limitation Act 1980 anchor (6 years post-disposal) is generally compatible.
              </li>
              <li>
                Apply <strong>access controls</strong>. The register should not be openly
                accessible; access is restricted to people who need it for the safety-management
                purpose.
              </li>
              <li>
                Handle <strong>subject access requests</strong>. If an employee asks what data
                relates to them in the register, that has to be supplied within the standard 1
                month.
              </li>
              <li>
                Apply <strong>data minimisation</strong>. Do not include personal data fields you do
                not need. If location is enough, do not also record an assignee unless the assignee
                data has a purpose.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Storing the asset register in a spreadsheet shared on a public folder"
            whatHappens="The asset register is in an Excel workbook on a shared drive accessible to all employees. The register includes home addresses for homeworkers. An employee browses the register and sees the home addresses of colleagues. The duty holder has now leaked personal data — a UK GDPR breach reportable to the ICO if it meets the threshold."
            doInstead="Store the asset register in a system with role-based access. Only people with a safety-management or estates-management role need access; restrict accordingly. Do not include personal data fields that are not necessary. If you need a homeworker location, consider recording it as 'Homeworking — UK' rather than the full address, and hold the address only in the HR system under separate controls."
          />

          <SectionRule />

          <ContentEyebrow>Practical recordkeeping — what good looks like</ContentEyebrow>

          <ConceptBlock
            title="A defensible PAT record system, end-to-end"
            plainEnglish="The system has to do five things: capture the right data, keep it for the right period, link it to the right people, restrict access appropriately, and produce records on demand."
          >
            <p>The five elements:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>A PAT instrument that logs numerical results.</strong> Modern instruments
                store a record per test with date, time, instrument ID, and the readings. Choose an
                instrument with reliable export to your test-management system.
              </li>
              <li>
                <strong>A test-management system or spreadsheet with structured fields.</strong> The
                HSG107 paragraph 70 fields, one row per asset, exportable to PDF or print for an HSE
                request.
              </li>
              <li>
                <strong>An asset register with status flags.</strong> Active / disposed / under
                repair / quarantined. Disposed rows retained for the limitation period; not deleted.
              </li>
              <li>
                <strong>A retention policy.</strong> Documented: typically 6 years post-disposal,
                with extensions for incident-relevant items and sector-specific requirements.
              </li>
              <li>
                <strong>Access controls.</strong> Role-based, with a clear list of who can read /
                edit / export the register. Privacy notice if personal data is in the register.
              </li>
            </ol>
            <p>
              When HSE turn up after an incident, what they want is the per-item record produced
              within minutes. A system that requires a developer to extract the data, or a manual
              search through paper files, is a system that will fail under pressure.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'HSG107 paragraph 70 + IET CoP 5th Ed. Chapter 16: minimum record is asset ID, type/class, location, date, tester, instrument + calibration, numerical results, pass/fail, retest interval, and comments.',
              'Numerical readings are not optional — without them, the record cannot be reconstructed and the "reasonably practicable" defence weakens.',
              'EAWR Reg 4(2) creates the implicit record duty by demanding maintenance "so far as is reasonably practicable to prevent danger" — unverifiable without records.',
              'HSAW 1974 Section 2 makes the records the evidence of the defence. HSE will request them after any incident.',
              'Retention: 6 years post-disposal is industry practice, anchored to the Limitation Act 1980. Longer where the equipment was incident-involved or in regulated environments.',
              'PAT records cover appliances; the BS 7671 Schedule of Test Results covers the fixed installation. Both are needed; one does not replace the other.',
              'When the asset register includes personal data (assignees, home addresses, identifiable testers), UK GDPR / DPA 2018 apply — lawful basis, retention, access controls, subject access.',
              'Defensibility test: can a third party reconstruct what was tested, when, by whom, with what instrument, and what the numerical readings were? If yes, the record works.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'Is keeping PAT records actually a legal requirement?',
                answer:
                  'No regulation explicitly says "keep PAT records". The duty is implicit: EAWR Reg 4(2) requires maintenance "so far as is reasonably practicable to prevent danger", and HSAW 1974 Sec 2 places the umbrella employer duty. Discharging both requires evidence that maintenance has been done — that evidence is the record. HSG107 — published by HSE — frames record-keeping as the practical way the EAWR duty is demonstrated.',
              },
              {
                question: 'How long do I have to keep PAT records?',
                answer:
                  'Industry practice is 6 years post-disposal of the equipment, anchored to the Limitation Act 1980 default civil-claim window. For equipment involved in an HSE-relevant incident, retain for the duration of any investigation/proceedings plus the limitation period. Some sectors (healthcare, education, regulated industries) require longer; check sector guidance. Do not delete records simply because the equipment has been disposed of.',
              },
              {
                question:
                  'A PAT instrument prints a thermal label and stores the result. Is that the record, or do I need to copy it elsewhere?',
                answer:
                  'The instrument log is part of the record. Best practice is to export the instrument data into a test-management system or asset register that holds the wider context (location, asset description, retest interval, history). Thermal labels fade over time — the record should not depend on the legibility of a thermal print after years on a shelf. Export to a durable format (CSV, database, PDF) and back up.',
              },
              {
                question:
                  'A subcontractor tested some kit on our site. They keep the records. Are we OK?',
                answer:
                  'No — the duty is on the duty holder (typically the employer / occupier responsible for the equipment), not on the subcontractor. You must be able to produce the records on request. Either receive copies from the subcontractor (preferred) or have a contractual right of access that can be exercised on short notice. "The subcontractor has them" is not an answer to an HSE request.',
              },
              {
                question:
                  'Is there a difference between PAT records and the Schedule of Test Results on my EIC?',
                answer:
                  'Yes, they are different documents. PAT records cover portable / lead-fed equipment under IET CoP 5th Ed. + HSG107. The Schedule of Test Results on an EIC or EICR is part of the fixed-wiring inspection under BS 7671. Different scopes, different test sequences, different retention paths. An EICR does not constitute PAT evidence; PAT records do not constitute fixed-wiring evidence.',
              },
              {
                question:
                  'Our asset register includes employee names. Is that a data-protection problem?',
                answer:
                  "Potentially yes. Where the register links equipment to identifiable individuals, UK GDPR / DPA 2018 apply. Identify a lawful basis (typically legal obligation under EAWR or legitimate interests), apply retention rules consistent with that basis, restrict access role-based, handle subject access requests, and minimise data fields. If a homeworker's home address is in the register, treat it as sensitive and consider whether you need it at full granularity.",
              },
              {
                question: 'A user defaces or removes a label. Is the record now invalid?',
                answer:
                  'The label is a visible flag at the equipment; the record is the audit trail. The record is unaffected by label damage. The label gets re-applied at the next inspection (or sooner if discovered) and the asset register notes any deliberate interference. For environments where label tampering is a risk (hire fleets, shared equipment), use destructible / tamper-evident labels so the interference is visible at the next inspection.',
              },
              {
                question:
                  "I'm a small contractor doing PAT for a client. What records do I leave with them?",
                answer:
                  'A complete asset register / test report covering all items tested, with the HSG107 paragraph 70 data set per item. A summary of the testing carried out, the standards used (typically IET CoP 5th Ed.), the instrument(s) used and calibration date, and a list of any failures and the action taken. Keep your own copy too — typically 6 years post-disposal of the equipment, or 6 years post-test if the items are not under your ongoing care.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="PAT records and legal requirements — Module 5.2" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/pat-testing-module-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 5
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/pat-testing-module-5-section-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.3 Asset register creation and management
              </div>
            </button>
          </div>

          <div className="hidden">
            <Activity />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default PATTestingModule5Section2;
