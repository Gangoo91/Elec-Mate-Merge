/**
 * Unit 317E · Criterion 4.3 — The organisational procedures for: completing the
 * necessary documentation, agreeing a programme of work with relevant people,
 * and confirming that the installation and/or maintenance work is completed.
 *
 * Approach: the criterion names three separate procedures and this lesson gives
 * each of them its own weight. Documentation is the easiest of the three to
 * over-teach, so it is held to three blocks; agreeing the programme with the
 * people who have to be there gets its own treatment, and confirming completion
 * is taught as a decision with evidence behind it rather than a formality.
 *
 * Sources used (existing verified teaching in the English course):
 *   level3/module5/section6/Sub2.tsx — handover pack composition, the three
 *     distribution destinations and retention, the Competent Person Scheme
 *     upload and the Building Control Compliance Certificate, Part P notifiable
 *     scope, the direct Building Control route, the customer walk-through,
 *     Regulation 132.1 framework, Regulation 652.1.
 *   level3/module5/section6/Sub3.tsx — the documentation chain from designer to
 *     customer, the design pack, installer and tester hand-overs, witness
 *     sheets, the defect register and Regulation 644.1.1, phased commissioning,
 *     the Operations and Maintenance pack, Regulation 133.1.3.
 *
 * 🔴 Never describe this content as EAL-approved, EAL-mapped or endorsed.
 */

import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';

const quizQuestions = [
  {
    id: 1,
    question: 'The handover pack for a domestic consumer unit replacement consists of:',
    options: [
      'The certificate and its two schedules, the Building Control Compliance Certificate, operational instructions, as-built records and the manufacturer manuals for the new equipment.',
      'The certificate on its own, with the schedules, the Building Control Compliance Certificate and the manuals all retained by the contractor for their own records.',
      'A Minor Electrical Installation Works Certificate and the manual for any new equipment, because a consumer unit replacement counts as minor works.',
      'A condition report and the Building Control Compliance Certificate, since a consumer unit replacement is reported on rather than certified.',
    ],
    correctAnswer: 0,
    explanation:
      'The pack is the full evidence bundle the customer needs for any future inspection, property sale, insurance claim or warranty interaction — the Electrical Installation Certificate with its Schedule of Inspections and Schedule of Test Results, the Building Control Compliance Certificate issued by the scheme after the upload, written operational instructions, the as-built circuit schedule, and the manuals for what was fitted.',
  },
  {
    id: 2,
    question:
      'The Competent Person Scheme notification window for Part P notifiable work in England is:',
    options: [
      '30 days from completion — the window NICEIC, NAPIT and ELECSA all operate to for the upload.',
      '7 days from completion, so that Building Control can inspect the work before it is concealed, with the notification void if the week is missed.',
      '12 months from completion, notifications being batched annually alongside the scheme renewal and the contractor assessment visit.',
      'Before work starts, so the scheme can arrange a pre-work Building Control inspection in the same way as a direct application.',
    ],
    correctAnswer: 0,
    explanation:
      'Thirty days from completion is the standard scheme window for Part P notifiable work in England; Wales has its own broadly equivalent regime. Missing it triggers scheme audit flags and delays the Building Control Compliance Certificate the customer needs for a sale, an insurance claim or any later regulatory interaction.',
  },
  {
    id: 3,
    question:
      'On a commercial project, the documentation chain and the hand-overs within it run in the order:',
    options: [
      'Designer (design pack) to installer (as-builts) to tester (test results) to certifier (signed certificate) to customer (Operations and Maintenance pack).',
      'Customer (brief) to certifier (certificate) to designer (design pack) to installer (as-builts) to tester (test results).',
      'Installer (as-builts) to designer (design pack) to tester (test results) to customer (pack) to certifier (certificate).',
      'Tester (test results) to installer (as-builts) to designer (design pack) to certifier (certificate) to customer (pack).',
    ],
    correctAnswer: 0,
    explanation:
      'Each role generates documentation the next role uses. The designer produces the design pack. The installer marks up what was actually built and records the materials fitted. The tester records the readings. The certifier signs the declarations and assembles the pack. The customer receives the consolidated Operations and Maintenance pack.',
  },
  {
    id: 4,
    question: 'The installer hands to the tester:',
    options: [
      'Marked-up as-builts, the materials register, the dead-test record, and confirmation of safe-isolation status for live testing.',
      'The signed certificate, so the tester can confirm the readings match the values that have already been certified.',
      'The Building Control Compliance Certificate, which the tester needs before the live-test sequence can begin.',
      'Nothing — the tester works from the original design pack alone, the two roles being kept apart for independence.',
    ],
    correctAnswer: 0,
    explanation:
      'The installer hands over as-built mark-ups showing any deviation from the design, a materials register recording what was actually fitted, the dead-test readings captured as installation progressed, and the safe-isolation status saying which circuits can now be live-tested and which are still being worked on. A defect register and a log of any design change notes go with it.',
  },
  {
    id: 5,
    question:
      'Separate witness sheets for residual current device trip times and loop impedance on a larger commercial commissioning are used because:',
    options: [
      'The contract or specification requires a countersigned record of safety-critical items, adding an audit trail on top of the standard schedule.',
      'BS 7671 prohibits recording those values on the Schedule of Test Results, making a separate witness sheet the only permitted place for them.',
      'They replace the Schedule of Test Results on commercial work, removing the need to complete the standard schedule for those circuits.',
      'BS 7671 Part 6 makes them a regulatory requirement above a defined installation size, and omitting them invalidates the certificate.',
    ],
    correctAnswer: 0,
    explanation:
      'Witness sheets are a contract or specification overlay on top of the BS 7671 minimum, not a regulatory requirement — the Schedule of Test Results already captures the data. They add a countersigned record on safety-critical items, typically signed by both the testing electrician and the witnessing engineer, and they have to be scheduled into the programme in advance because a witness has to be booked.',
  },
  {
    id: 6,
    question:
      'On a phased project where the installation is handed over in stages, the documentation works by:',
    options: [
      'Each phase being its own commissioning event with its own certificate stating its extent, and the master pack updated as each phase completes.',
      'A single certificate issued at the very end of the project covering everything, with no documentation produced at the intermediate hand-overs.',
      'One certificate reissued and re-dated at each phase, superseding the previous version so only the latest document exists.',
      'The customer holding the phase documentation informally until the project is complete, at which point a formal pack is assembled from it.',
    ],
    correctAnswer: 0,
    explanation:
      'Each phase hands over a defined extent with its own certificate covering only that scope, and each certificate states its extent clearly to avoid ambiguity. The master pack is updated to add each phase as it completes. Final completion may issue a project-wide certificate, or may rely on the phased certificates as the certification record.',
  },
  {
    id: 7,
    question:
      'A defect on new work is found during inspection and testing. Regulation 644.1.1 requires that:',
    options: [
      'The defect or omission is corrected before the certificate is issued.',
      'The defect is recorded on the certificate as a departure and the certificate is issued with the defect noted against it.',
      'The certificate is issued first so the customer has documentation, with the defect corrected on a return visit within thirty days.',
      'The defect is reported to Building Control, which decides whether the certificate can be issued.',
    ],
    correctAnswer: 0,
    explanation:
      'For new work, any defect or omission revealed during inspection and testing is corrected before the certificate is issued. That is why the tester hands the certifier a defect register: closed defects become part of the audit trail, and open defects block the certificate.',
  },
  {
    id: 8,
    question: 'The contractor file copy of the certification is retained:',
    options: [
      'For at least six years, the Limitation Act baseline, with professional indemnity insurers commonly requiring considerably longer.',
      'For thirty days, matching the Competent Person Scheme notification window, after which the scheme record replaces the contractor copy.',
      'Only until the customer confirms receipt of their own copy, at which point the contractor copy can be destroyed.',
      'For twelve months, matching the typical installation warranty period, after which there is no further retention requirement.',
    ],
    correctAnswer: 0,
    explanation:
      'Six years is the Limitation Act baseline that most professional indemnity insurers treat as a minimum; many policies require far longer. Competent Person Scheme audit adds its own retention expectation. Cloud storage of the certificate, the photographs and the notification reference is now standard practice.',
  },
];

const faqs = [
  {
    question: 'Who counts as a "relevant person" when I am agreeing the programme?',
    answer:
      'Anybody whose work has to happen before, during or immediately after yours, plus anybody who has to be present for a step. On a small job that is the customer and possibly one other trade. On a commercial project it extends to the designer, the principal contractor, the other disciplines you interface with, the person who will witness any countersigned tests, and whoever has to accept the work at the end. The test is simple: if the step cannot happen without them, they are relevant and the date has to be agreed with them rather than announced at them.',
  },
  {
    question: 'The installation was not built exactly as designed. Whose job is it to record that?',
    answer:
      'The installer, through the as-built mark-up. Construction rarely matches the design exactly — a cable route changes around an unforeseen obstacle, an accessory moves at the customer request, a circuit is added. The tester needs to test what is actually there rather than what was drawn, and the certifier needs the mark-ups to describe the extent accurately. Five minutes marking up at the time saves hours of tracing later.',
  },
  {
    question: 'Do I have to print the handover pack, or is a PDF enough?',
    answer:
      'Best practice is both — printed at handover, PDF emailed afterwards. The printed copy is the formal handover. The PDF is the backup, and it is what the customer will actually find when a solicitor or an insurer asks for it in three years. Offering both costs almost nothing and removes any argument about whether the customer received the documentation.',
  },
  {
    question: 'The customer is a tenant rather than the owner. Who do I hand the pack to?',
    answer:
      'The duty-holder for the installation, which in residential rented property is the landlord rather than the tenant. Hand the formal pack to the landlord or to the agent who instructed the work. Give the tenant a verbal walk-through of the safety-relevant parts — where the board and the main isolator are, how to test the residual current devices, what to do in an electrical emergency — and a short written summary of anything new they will use day to day.',
  },
];

export default function Lesson317e_4_3() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'The criterion names three procedures, not one. Completing the documentation, agreeing the programme of work with the relevant people, and confirming the work is complete are separate pieces of organisation and each of them can fail on its own.',
          'Documentation means the full pack, not the certificate on its own — the certificate with its Schedule of Inspections and Schedule of Test Results, the Building Control Compliance Certificate, operational instructions, as-built records and the manuals for what was fitted.',
          'The pack goes to three places: the customer, the contractor file for at least six years, and the Competent Person Scheme within 30 days for Part P notifiable work in England.',
          'Agreeing the programme is about hand-overs between roles and about the people who have to be present — the designer to installer hand-over, the installer to tester hand-over, witnessed tests that need a witness booked, and phased hand-overs that each carry their own certificate.',
          'Confirming completion is a decision with evidence behind it: the defect register closed under Regulation 644.1.1, the schedules reviewed by whoever signs, and a recorded handover to the person accepting the work.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'List the contents of a handover pack and explain what each item is for and when the customer will need it.',
          'Identify the three destinations the certification goes to, and the retention and notification duty attached to each.',
          'Map the hand-overs in the documentation chain from designer to installer to tester to certifier to customer, and say what each role passes forward.',
          'Agree a programme of work with the relevant people, including booking witnessed tests and handling phased hand-overs that each carry their own certificate.',
          'Confirm completion by closing the defect register under Regulation 644.1.1, reviewing the schedules before signing, and recording the handover to the person accepting the work.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>Three procedures, one close-out</ContentEyebrow>

      <ConceptBlock
        title="Documentation, programme and confirmation are three different failures"
        plainEnglish="It is tempting to treat all of this as paperwork. It is not. Completing the documentation is a records problem. Agreeing the programme is a people problem. Confirming completion is a judgement problem. Each fails in its own way and each has its own fix."
        onSite="You can tell which one has gone wrong by what the phone call sounds like. A documentation failure sounds like a solicitor asking for a certificate. A programme failure sounds like a witness turning up on the wrong day. A confirmation failure sounds like a customer saying the job was never finished."
      >
        <p>What each procedure is actually responsible for:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Completing the documentation.</strong> Producing the right documents, getting
            them to the right places, and keeping them for as long as they are needed. The output
            is a pack the customer can rely on for the life of the installation.
          </li>
          <li>
            <strong>Agreeing the programme with relevant people.</strong> Making sure each
            hand-over in the chain happens with the information the next person needs, on a date
            everybody has agreed, with anybody who has to be present actually booked in. The output
            is a sequence of work that does not stall.
          </li>
          <li>
            <strong>Confirming the work is complete.</strong> Deciding — on evidence — that the
            work is finished, that nothing is outstanding, and that the person accepting it knows
            what they are accepting. The output is a recorded acceptance, not an assumption.
          </li>
        </ul>
        <p>
          On a one-person domestic job all three collapse into the same afternoon, but they do not
          merge. You still assemble a pack, you still agree a time with the customer, and you still
          make an explicit decision that the work is complete before you hand over.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Completing the documentation</ContentEyebrow>

      <ConceptBlock
        title="The pack is the evidence bundle, not the certificate"
        plainEnglish="The certificate is one document in a pack. What the customer actually needs is everything required to evidence what was done, prove it was certified, operate it safely, and satisfy whoever asks about it later."
        onSite="Build the pack as the job runs. Drop the manuals into a folder as you unbox the equipment. Print the certificate and both schedules on completion. Assemble it before you leave, hand it over, then email the PDF."
      >
        <p>What goes in and what each item is for:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Certificate plus Schedule of Inspections plus Schedule of Test Results.</strong>
            The signed certification of the work, the visual checklist and the per-circuit readings.
            Needed for a property sale, a future inspection, an insurance claim or a warranty claim.
          </li>
          <li>
            <strong>Building Control Compliance Certificate.</strong> Evidence the work was notified
            to Building Control. Issued by the scheme after the upload, not produced on site.
          </li>
          <li>
            <strong>Operational instructions.</strong> A plain-English summary for the user — where
            the board and the isolator are, the residual current device test routine, what the
            labels mean.
          </li>
          <li>
            <strong>As-built records.</strong> On a domestic job typically the circuit schedule
            affixed inside the board door plus a copy in the pack. On larger work this extends to
            single-line diagrams, panel schedules and marked-up drawings showing what was actually
            installed.
          </li>
          <li>
            <strong>Manufacturer manuals.</strong> For everything fitted — protective devices,
            surge protection, charging equipment, anything with its own test routine or fault
            codes.
          </li>
        </ul>
        <p>
          On a commercial project the same bundle is called the Operations and Maintenance pack and
          it carries more: the design pack, the as-built drawings, the witness sheets, the
          departures log, the recommended maintenance schedule, a spare parts list and a contact
          directory. Same principle, more volume.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 132.1 (Design documentation framework, Regs 132.2–132.5)"
        clause="The information required as a basis for design is stated in Regulations 132.2 to 132.5. The requirements to which the design shall conform are stated in Regulations 132.6 to 132.16. Designers shall therefore determine and record the information listed in 132.2–132.5 to demonstrate conformity with subsequent design requirements."
        meaning="This is the design-side documentation duty, and it sits at the start of the chain rather than the end. The information the designer determines and records is what the installer builds to and what the certifier verifies against. On a domestic job it is typically the circuit schedule inside the board door plus the schedule attached to the certificate. On larger work it extends to single-line diagrams, panel schedules and full cable books. The handover pack is the delivery vehicle for it."
        cite="Source: BS 7671:2018+A4:2026 Regulation 132.1 framework."
      />

      <ConceptBlock
        title="Three destinations, three different reasons"
        plainEnglish="The same certification goes to three places and each copy is doing a different job. The customer copy is the duty-holder evidence. The contractor copy is liability and audit. The scheme copy is the notification to Building Control."
        onSite="Certification software handles all three from one workflow — generate the certificate, email the customer the PDF, file the contractor copy in the cloud, submit the scheme notification. Managing it by hand adds an hour to every job and is where the scheme upload gets forgotten."
      >
        <p>Where each copy goes:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Customer.</strong> The full pack, printed at handover plus a PDF emailed.
            Retained by the duty-holder for the life of the installation and used for any future
            inspection, sale, insurance claim or warranty claim.
          </li>
          <li>
            <strong>Contractor.</strong> File copy kept at least six years as the Limitation Act
            baseline, and often far longer under a professional indemnity policy. Competent Person
            Scheme audit adds its own expectation. Personal data on the file attracts UK GDPR
            obligations, so retention runs to the published privacy notice.
          </li>
          <li>
            <strong>Competent Person Scheme.</strong> Uploaded within 30 days for Part P notifiable
            work in England. The scheme acts as the notification route to Building Control and then
            issues the Building Control Compliance Certificate to the customer at the property
            address, typically two to six weeks after upload.
          </li>
        </ul>
        <p>
          A contractor who is not registered with a scheme takes the other route: direct
          notification to Local Authority Building Control before the work starts, with Building
          Control inspecting and issuing their own completion certificate. Slower, and paid for per
          job rather than annually.
        </p>
      </ConceptBlock>

      <ContentEyebrow>Notifying the work</ContentEyebrow>

      <ConceptBlock
        title="Deciding whether the notification is needed at all"
        plainEnglish="Not every job triggers a Building Control notification. The scope test is narrow and it is worth knowing, because uploading work that does not need uploading wastes everybody time and failing to upload work that does need it causes a real problem at the point of sale."
        onSite="Run the test before you leave site rather than at the end of the week. Deciding whether the job was notifiable when you can still see the installation is a great deal easier than deciding from a job sheet five days later."
      >
        <p>The notifiable scope in England, narrowed by the 2013 revision:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Notifiable — a new circuit.</strong> A new ring final, a new lighting circuit, a
            new shower circuit, a new charging circuit.
          </li>
          <li>
            <strong>Notifiable — consumer unit replacement.</strong> Replacing the unit itself,
            rather than swapping a device inside an existing one.
          </li>
          <li>
            <strong>Notifiable — most work in defined special locations.</strong> Bathrooms,
            swimming pools, saunas.
          </li>
          <li>
            <strong>Not notifiable — like-for-like accessory replacement.</strong> Maintenance
            rather than new work.
          </li>
          <li>
            <strong>Not notifiable — additions to an existing circuit outside a special
            location.</strong>{' '}
            Adding a socket to an existing ring, for example.
          </li>
        </ul>
        <p>
          Notifiable and certifiable are two different questions. Work that is not notifiable still
          needs the appropriate BS 7671 certificate — the certification regime and the Building
          Regulations notification regime are separate and only partly overlap. Wales operates its
          own broadly equivalent notification regime.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="Building Regulations 2010 — Approved Document P, Electrical Safety in Dwellings (Part P notifiable work scope, paraphrased)"
        clause="Notifiable electrical installation work in dwellings in England includes: the installation of a new circuit; the replacement of a consumer unit; the addition or alteration of existing circuits in a special location (e.g. Section 701 bathrooms, swimming pools, saunas). Like-for-like accessory replacement, repair work and additions/alterations to existing circuits OUTSIDE special locations are NOT notifiable."
        meaning="The scope test decides whether the Competent Person Scheme upload is required at all, or whether a non-registered contractor has to go direct to Local Authority Building Control before the work starts. Work outside the notifiable scope still requires certification under BS 7671 — the two regimes sit alongside each other rather than replacing one another. Check the scope test before deciding the upload is needed."
        cite="Source: Building Regulations 2010 (England), Approved Document P 2013 edition; Welsh equivalent under the Welsh Building Regulations."
      />

      <InlineCheck
        id="317e-4-3-check-1"
        question="What does the Competent Person Scheme upload actually produce for the customer?"
        options={[
          'The Building Control Compliance Certificate — evidence the work was notified to Building Control, separate from the installation certificate itself.',
          'The Electrical Installation Certificate, generated by the scheme once the test results are uploaded rather than produced on site.',
          'A Minor Electrical Installation Works Certificate, converted from the uploaded certificate for the customer records.',
          'A condition report confirming the new work is satisfactory, which the customer keeps in place of the installation certificate.',
        ]}
        correctIndex={0}
        explanation="The upload is the contractor notification to Building Control, made through the scheme. The scheme then issues the Building Control Compliance Certificate to the customer, typically posted within two to six weeks. The installation certificate covers BS 7671 compliance; the Building Control Compliance Certificate covers the Building Regulations notification. A customer selling a property is often asked for both."
      />

      <SectionRule />

      <ContentEyebrow>Agreeing the programme with relevant people</ContentEyebrow>

      <ConceptBlock
        title="Every hand-over is a date and a deliverable agreed with a named person"
        plainEnglish="A programme of work is not a wall chart. It is a set of hand-overs, each of which has a date, a deliverable and somebody on the other end who has agreed to receive it. Agreeing the programme means agreeing those, not publishing them."
        onSite="Work back from the hand-overs, not forward from today. If the tester needs the as-builts and the safe-isolation status before they can start, that date drives when the installer has to finish marking up — and that has to be agreed with the person doing the marking up, not assumed."
      >
        <p>The hand-overs to agree, and what each one carries:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Designer to installer.</strong> The design pack — single-line diagrams, panel
            schedules, calculations, protective device and earthing specification, departures log,
            interface details with the other disciplines. Without it the installer is
            reverse-engineering a specification from a verbal brief.
          </li>
          <li>
            <strong>Installer to tester.</strong> Marked-up as-builts, the materials register, the
            dead-test record captured as installation progressed, the safe-isolation status saying
            which circuits are ready for live test, the defect register and any design change notes
            raised during the work.
          </li>
          <li>
            <strong>Tester to certifier.</strong> The completed Schedule of Test Results, any
            witness sheets the specification calls for, an anomaly log of readings that were not
            what was expected, the defect register, and the instrument calibration evidence.
          </li>
          <li>
            <strong>Certifier to customer.</strong> The consolidated pack, handed over at an agreed
            time with the person who is accepting the work actually present.
          </li>
        </ul>
        <p>
          On a single-person domestic job every one of these hand-overs is to yourself. That does
          not remove them — it removes the reminder. The discipline of separating the steps
          mentally is what stops the design notes never getting written and the as-built schedule
          never getting updated.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="The parts of the programme that need somebody else in the diary"
        plainEnglish="Most of a programme is your own sequence. A few parts of it depend on another person being physically present on a particular day, and those are the parts that derail a project when they are not agreed in advance."
        onSite="Read the specification before commissioning starts and find out which tests are witnessed. A witness usually needs notice. Discovering on the morning of the test that the client engineer has to be there is how a week gets lost."
      >
        <p>What needs booking rather than scheduling:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Witnessed tests.</strong> Where the contract or specification requires a
            countersigned record on safety-critical items, the witness is usually the client
            engineer or a third-party commissioning agent and usually needs advance notice. Build
            the witness schedule before commissioning starts.
          </li>
          <li>
            <strong>Access and isolation.</strong> Any step that needs a supply switched off,
            another trade out of the way, or an area cleared has to be agreed with whoever controls
            that. Live testing in an occupied space may need access physically restricted while it
            happens.
          </li>
          <li>
            <strong>Interfaces with other disciplines.</strong> Where the installation meets
            heating controls, fire detection, building management, security or lift controls, the
            commissioning of each side has to be sequenced with the other.
          </li>
          <li>
            <strong>Phased hand-overs.</strong> On a phased project each phase is its own
            commissioning event with its own certificate stating its extent, and each phase
            hand-over needs the receiving party there.
          </li>
          <li>
            <strong>The customer handover itself.</strong> A walk-through needs the person who will
            use the installation present. Posting a pack through the door is not a handover.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="317e-4-3-check-2"
        question="On a project where the specification calls for witnessed tests, when should the witness schedule be built?"
        options={[
          'On the morning of each test, once you know which circuits are ready and can call whoever is available.',
          'After commissioning is finished, so the witness can countersign the completed records in one visit.',
          'Before commissioning starts, from the contract specification or the commissioning plan, so the witness can be booked with notice.',
          'It does not need building — witnessed tests are a regulatory requirement and the witness attends automatically.',
        ]}
        correctIndex={2}
        explanation="Witnessed tests are a contract or specification overlay, not a regulatory requirement, and the witness is typically the client engineer or a third-party commissioning agent who needs advance notice. Identify the witnessed tests from the specification or commissioning plan before commissioning starts and build the schedule from that, so the witness is booked rather than chased."
      />

      <SectionRule />

      <ContentEyebrow>Confirming the work is complete</ContentEyebrow>

      <ConceptBlock
        title="Completion is a decision, and the defect register is the evidence"
        plainEnglish="Confirming completion is not the moment you pack up. It is a decision that nothing is outstanding, and the thing that makes it a decision rather than an assumption is a register of everything that was found and what happened to it."
        onSite="Keep the defect register open from the first day of testing. Every item goes on it — a missing label, a tight grommet, a reading that needs chasing. Closed items become the audit trail. Open items are the reason the certificate has not been issued yet."
      >
        <p>What has to be true before completion is confirmed:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>The defect register is closed.</strong> Each defect logged with description,
            location, action required, action completed and re-test result. For new work,
            Regulation 644.1.1 requires any defect or omission revealed during inspection and
            testing to be corrected before the certificate is issued.
          </li>
          <li>
            <strong>The schedules have been read, not just filled in.</strong> Whoever signs reviews
            every row of the Schedule of Test Results before signing. A verbal assurance from
            somebody else that it all tested fine is not a substitute for looking at the data you
            are certifying.
          </li>
          <li>
            <strong>Anomalies have been resolved or recorded.</strong> A reading that was not what
            was expected is either explained or written down with the conclusion reached —
            acceptable, requires further investigation, or requires rectification.
          </li>
          <li>
            <strong>The extent is described accurately.</strong> The certificate says what it
            covers. On a phased job it says which phase. On an alteration it says which part of the
            installation.
          </li>
          <li>
            <strong>Where equipment usage has to be recorded, it has been.</strong> Where the
            regulations call for a particular usage of equipment to be identified, Regulation
            133.1.3 requires that usage to be entered on the certification.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 133.1.3 (equipment usage on certification)"
        clause="Regulation 133.1.3 (Selection of equipment) has been modified and now requires that certain usage of equipment shall be recorded on the appropriate electrical certification specified in Part 6 of BS 7671. Designers, installers, and inspectors shall ensure that where BS 7671 calls for the usage of particular equipment to be identified, that usage is explicitly entered on the certification associated with the work covered by Part 6."
        meaning="Confirming completion includes confirming the certification actually says what it has to say. Where the regulations call out a specific role for a piece of equipment, that role has to be entered on the certificate rather than left implicit. The next person inspecting the installation relies on those entries to confirm the protective measures match the equipment that was fitted."
        cite="Source: BS 7671:2018+A4:2026 Regulation 133.1.3."
      />

      <ConceptBlock
        title="The handover event — confirmation the customer takes part in"
        plainEnglish="The last step of confirming completion is confirming it with the person who has to accept it. That means an agreed time, the pack in their hands, and a short structured walk-through so they know what they have been given."
        onSite="Five minutes done properly removes most of the follow-up calls. A customer who cannot find the isolator and does not know what the labels mean will ring you, and they will ring you at a bad time."
      >
        <p>What the walk-through covers:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Board and main isolator location.</strong> Where to go in an emergency. Confirm
            they can identify both.
          </li>
          <li>
            <strong>Residual current device test routine.</strong> Demonstrate the test buttons,
            explain the monthly routine and how to reset.
          </li>
          <li>
            <strong>Circuit labels.</strong> Walk them through the as-built schedule on the board
            door so the labelling makes sense to them.
          </li>
          <li>
            <strong>Anything new.</strong> Equipment the previous installation did not have, with
            the manual and any test routine of its own.
          </li>
          <li>
            <strong>Next inspection date and the contact route.</strong> What is recorded on the
            certificate, and how to reach you. Mention that the Building Control Compliance
            Certificate arrives separately by post from the scheme, so they do not think something
            was missed.
          </li>
        </ul>
        <p>
          Frequency of the next inspection is a judgement rather than a fixed number. Regulation
          652.1 requires it to be determined having regard to the type of installation and
          equipment, its use and operation, the frequency and quality of maintenance and the
          external influences it is subject to, taking account of the results and recommendations
          of previous certificates and reports.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="317e-4-3-check-3"
        question="A defect is found on new work during inspection and testing. What does that mean for the certificate?"
        options={[
          'The certificate can be issued with the defect noted against it, so the customer has documentation while the repair is arranged.',
          'The certificate is issued by the scheme rather than the contractor once the defect has been reported to Building Control.',
          'The certificate is issued on the day and reissued after the repair, so both versions exist in the customer record.',
          'The defect is corrected before the certificate is issued — an open defect on new work blocks it.',
        ]}
        correctIndex={3}
        explanation="For new work, Regulation 644.1.1 requires any defect or omission revealed during inspection and testing to be corrected before the certificate is issued. That is what the defect register is for: closed items form the audit trail of what was found and fixed, and open items are the reason the certificate has not been signed yet."
      />

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Letting the paperwork swallow the other two procedures"
        whatHappens={
          <>
            The certificate is immaculate. Both schedules are complete, the pack is assembled, the
            scheme upload went in the same day. But nobody agreed with the client engineer that the
            loop impedance readings on the plant room boards were witnessed tests, so those sheets
            are unsigned. And nobody confirmed completion with the facilities manager, who finds
            out the work is finished when the contractor stops turning up. The final account stalls
            for six weeks over a document that takes a signature, and the relationship is soured by
            a handover that never happened.
          </>
        }
        doInstead={
          <>
            Treat the three procedures as three separate items on the close-out checklist.
            Documentation complete. Programme agreed and every dependency booked, witnessed tests
            included. Completion confirmed, with a recorded handover to a named person. Ticking the
            first one does not tick the other two, and the two that get forgotten are the two that
            depend on somebody else.
          </>
        }
      />

      <CommonMistake
        title="Missing the 30-day Competent Person Scheme upload window"
        whatHappens={
          <>
            A domestic consumer unit replacement finishes in early March. The pack is handed over
            and the job is closed, but the notification never gets uploaded. Eight weeks later the
            customer calls: the Building Control Compliance Certificate has not arrived, their
            solicitor is asking for it because the sale is going through, and the buyer lender will
            not release funds without it. The window has expired, the late notification takes
            additional weeks to process, and it triggers a fee and an audit flag against the scheme
            membership.
          </>
        }
        doInstead={
          <>
            Put the upload on the job-completion checklist rather than the to-do list. Same-day is
            ideal; a weekly batch with a fixed slot is a workable fallback. Thirty days sounds
            generous and disappears quickly once jobs stack up. Tell the customer at handover that
            the Building Control Compliance Certificate arrives separately by post, typically two
            to six weeks later, so they know what they are waiting for.
          </>
        }
      />

      <Scenario
        title="Llandudno — a hotel bar refit handed over in two phases"
        situation={
          <>
            You are running the electrical close-out on a small hotel bar refit in Llandudno. The
            work splits naturally into two: the back-of-house plant and the new distribution board,
            which finished last week, and the bar area itself, which finishes on Friday. The hotel
            wants the back-of-house side signed off now so the kitchen can trade. The specification
            calls for countersigned records on the loop impedance and residual current device
            readings at the new board. There are three items still open on the defect register:
            two missing circuit labels and one insulation-resistance reading on a bar lighting
            circuit that came in lower than the others and has not been chased.
          </>
        }
        whatToDo={
          <>
            Split the certification to match the phasing. The back-of-house work is its own
            commissioning event and takes its own certificate stating its extent explicitly — the
            new distribution board and the back-of-house circuits only — so there is no ambiguity
            later about what was covered when. Before that certificate is signed, close the defect
            register for that extent: the two labels go on, and if the low insulation-resistance
            reading is on a bar lighting circuit it belongs to phase two rather than this one, so
            record it against phase two and say so.
            <br />
            <br />
            Book the witness now rather than on Friday. The countersigned readings at the new board
            are a specification requirement, the witness is the client side engineer, and they need
            notice. Agree the date with them and with the hotel, because the test needs the kitchen
            supply off for a window and the hotel has to agree when that window is.
            <br />
            <br />
            Confirm completion of phase one properly. Review every row of the Schedule of Test
            Results before signing rather than taking the readings on trust. Assemble the phase-one
            pack — certificate, both schedules, operational instructions, as-built schedule for the
            new board, manuals for what was fitted — and hand it over to the person who is
            accepting it, with the walk-through. Upload the notification if the work is notifiable.
            <br />
            <br />
            Then chase the low insulation-resistance reading before Friday. It is an anomaly, not
            yet a defect, and it either resolves with an explanation or becomes an item that has to
            be corrected before the phase-two certificate can be issued.
          </>
        }
        whyItMatters={
          <>
            All three procedures are live at once here and each of them would fail differently. If
            the documentation is wrong, the phase-one certificate covers an extent it should not
            and the next inspector cannot tell what was actually verified. If the programme is not
            agreed, the witness is not there and the countersigned records never get signed. If
            completion is confirmed without closing the register, an unexplained reading goes into
            service on a circuit in a public area. The hotel wanting the kitchen trading is a real
            pressure, and the answer is to phase the certification properly rather than to sign
            early.
          </>
        }
      />

      <SectionRule />

      <FAQ items={faqs} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'The criterion names three procedures — documentation, programme, confirmation — and each of them fails on its own. Completing one does not complete the others.',
          'The handover pack is the certificate plus both schedules, the Building Control Compliance Certificate, operational instructions, as-built records and the manufacturer manuals.',
          'Three destinations: the customer (printed plus PDF, lifetime retention by the duty-holder), the contractor (at least six years, often far longer under a professional indemnity policy), and the Competent Person Scheme (within 30 days for Part P notifiable work in England).',
          'The scheme upload is the notification route to Building Control; the scheme then posts the Building Control Compliance Certificate to the customer, typically two to six weeks later.',
          'Agreeing the programme means agreeing the hand-overs — designer to installer, installer to tester, tester to certifier, certifier to customer — each with a date, a deliverable and a named person on the other end.',
          'Anything needing another person present is booked, not scheduled: witnessed tests, access and isolation windows, interfaces with other disciplines, phased hand-overs, the customer walk-through itself.',
          'Confirming completion means the defect register is closed under Regulation 644.1.1, the schedules have been reviewed by whoever signs, anomalies are resolved or recorded, and the extent on the certificate is accurate.',
          'The handover is an event the customer takes part in — board and isolator location, test-button routine, circuit labels, anything new, next inspection date and contact route.',
        ]}
      />

      <ContentEyebrow>Check yourself</ContentEyebrow>

      <Quiz
        questions={quizQuestions}
        title="Documentation, programme and completion — knowledge check"
      />
    </div>
  );
}
