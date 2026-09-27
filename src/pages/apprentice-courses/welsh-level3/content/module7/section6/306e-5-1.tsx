/**
 * Unit 306E · Understand the Principles of Inspection, Testing and Commissioning
 * Learning outcome: Understand methods for providing clear and accurate
 * information to relevant people
 * Criterion 5.1 — How to record outcomes from basic inspections and dead tests
 * clearly and accurately
 *
 * Treated at Level 3 as part of the work rather than as paperwork afterwards:
 * what the schedule of test results carries, why a recorded value has to be the
 * value the instrument showed, what a blank field costs, and who picks the
 * document up next. Grounded in BS 7671 Regulation 644.3, Section 644 and
 * Regulation 644.1.1.
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
    question: 'What does Regulation 644.3 require?',
    options: [
      'That the results of every test are recorded and the records retained as part of the certification',
      'That results are recorded only where the customer asks for them',
      'That only failing results are recorded, since passes can be assumed',
      'That the instrument memory is treated as the record, with no separate schedule',
    ],
    correctAnswer: 0,
    explanation:
      'Every test result forms part of the regulatory record. The schedule of test results captures the per-circuit data, the schedule of inspections captures the visual items, and the certificate ties them together with the declarations and signatures.',
  },
  {
    id: 2,
    question:
      'A circuit fails the insulation resistance test during final testing of a new installation. What does Regulation 644.1.1 require before the certificate is issued?',
    options: [
      'The defect must be corrected, and the circuit re-tested, before the certificate is issued',
      'The failing value is recorded with a classification and the customer arranges the remedial work',
      'The failing value is recorded as a departure from BS 7671 with the designer’s reasoning',
      'The certificate is issued and a re-test scheduled within thirty days',
    ],
    correctAnswer: 0,
    explanation:
      'For a new installation, any defect or omission revealed during the inspection and testing has to be corrected before the certificate is issued. The certificate states that the installation is safe at the point of handover, so issuing one over a known fault misrepresents it.',
  },
  {
    id: 3,
    question: 'How should an RCD trip time of 28 ms be recorded on the schedule of test results?',
    options: [
      'As the measured value, 28 ms — the pass against the limit is implicit',
      'As Pass, because the column records compliance rather than the figure',
      'As 300 ms, the maximum the device was tested against',
      'As 30 mA, the rated residual operating current of the device',
    ],
    correctAnswer: 0,
    explanation:
      'Always the measured value. If the same device is tested at the next periodic inspection and trips at 200 ms, both readings pass but the comparison shows performance has dropped sharply. Recording only Pass throws that information away.',
  },
  {
    id: 4,
    question:
      'A column on the schedule does not apply to a circuit — for example the residual current rating on a circuit protected by a plain MCB. What goes in the cell?',
    options: [
      'N/A, written explicitly',
      'Nothing — leave it blank, since it plainly does not apply',
      'A dash, so the row stays visually tidy',
      'The value from the nearest circuit that does have an RCD',
    ],
    correctAnswer: 0,
    explanation:
      'A blank cell is ambiguous — it could mean not applicable, or it could mean the test was forgotten. N/A is a decision, recorded as one. The same applies to ring values on a radial circuit and the electrode column on a TN installation.',
  },
  {
    id: 5,
    question: 'Where does the maximum Zs figure in the schedule come from?',
    options: [
      'BS 7671 A4:2026 Table 41.3, for the type and rating of the protective device',
      'The measured loop impedance at the far end of the circuit',
      'The published worst-case Ze for the supply arrangement',
      'A fixed value applied to every Type B device regardless of rating',
    ],
    correctAnswer: 0,
    explanation:
      'It is a table lookup against the device. For a Type B 32 A device the current value is 1.37 Ω. Quoting a figure carried over from an earlier edition on a current certificate is quoting a superseded standard, and a future inspector working to the current table will read your circuit differently.',
  },
  {
    id: 6,
    question:
      'You spot a typing error in a Zs reading on a paper schedule you have already signed. What is the accepted way to fix it?',
    options: [
      'A single line through the wrong value, the correct value alongside, initialled and dated',
      'Correction fluid over the wrong value and the correct one written on top',
      'Scribble the wrong value out so it cannot be read, then write the correct one',
      'Leave it — a signed document must not be altered under any circumstances',
    ],
    correctAnswer: 0,
    explanation:
      'The correction has to be visible and attributable. Correction fluid and heavy scribbling both destroy the original entry and undermine the document. If the errors are extensive, re-issue a corrected schedule with a note referencing the original.',
  },
  {
    id: 7,
    question:
      'On a paper schedule, R1 + R2 for a domestic kitchen ring has been written as 4.5 Ω. What should that prompt?',
    options: [
      'Investigate before recording — a ring of that length in 2.5/1.5 mm² cable reads roughly 0.18 to 0.30 Ω, so this is around ten times too high',
      'Nothing — the value is above zero and below the maximum Zs for the device',
      'Re-test the insulation resistance, since continuity and insulation are related',
      'Record it and add a note that the cable may be long',
    ],
    correctAnswer: 0,
    explanation:
      'It is almost certainly a decimal point or a unit error — 0.45 Ω written as 4.5 Ω, or a reading taken in milliohms and transcribed without conversion. The sanity check is always the same question: does this number make sense for this circuit, this cable and this route?',
  },
  {
    id: 8,
    question:
      'A test could not be carried out because the connected equipment could not be taken offline. What goes on the schedule?',
    options: [
      'A recorded limitation saying what was not tested, why, and what happens next',
      'A blank cell, because no measurement was taken',
      'An estimated value based on the other circuits on the board',
      'Nothing on the schedule — a verbal explanation to the customer is enough',
    ],
    correctAnswer: 0,
    explanation:
      'Limitations are recorded against the affected circuit and summarised at certificate level. The next person to open the document needs to know what has been verified and what has not, and a follow-up date turns the limitation into something that actually gets resolved.',
  },
];

export default function Lesson306e_5_1() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'Regulation 644.3 requires the results of every test to be recorded and retained as part of the certification. The record is not a companion document to the work — it is part of it.',
          'The schedule of test results carries the per-circuit measurements, the schedule of inspections carries the visual items, and the certificate carries the declarations that tie them together.',
          'A recorded value must be the value the instrument showed. Record 28 ms, not Pass. Record the reading with its units, and never leave a required field blank.',
          'Regulation 644.1.1 is blunt: for a new installation, defects revealed during inspection and testing are corrected before the certificate is issued.',
          'Write it for the person who picks it up in five years — the next inspector, a solicitor at sale, an investigator after an incident. They cannot ring you up to ask what you meant.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Explain why recording is part of carrying out the test rather than an administrative task that follows it.',
          'Identify what belongs on the schedule of test results, the schedule of inspections and the certificate, and which document is appropriate for a given piece of work.',
          'Complete a per-circuit row accurately, recording measured values with their units rather than a pass or fail verdict.',
          'Record limitations, departures and anything not tested so that the document is unambiguous to somebody reading it years later.',
          'Recognise the transcription and transfer errors that produce a plausible-looking but wrong schedule, and apply sanity checks that catch them before signature.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>Recording as part of the work</ContentEyebrow>

      <ConceptBlock
        title="The record is made at the instrument, not at the van"
        plainEnglish="You write the value down at the moment you take it, against the circuit it belongs to. Everything else is reconstruction."
        onSite="The classic failure is values scrawled on the back of a hand and transcribed hours later. Numbers get swapped, circuits get transposed, and the person reviewing the pack spots the inconsistency — so the job gets re-tested."
      >
        <p>
          Recording as you go is the only way the figure on the schedule is guaranteed to be the
          figure the instrument produced. Memory fails in predictable ways: two circuits with
          similar values swap places, a decimal point moves, and the reading you remember is the one
          you expected rather than the one you got.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Set the circuit identifier before the test.</strong> Most current instruments
            let you store a reading against a circuit number. Use it — that is what stops readings
            being assigned to the wrong row later.
          </li>
          <li>
            <strong>Confirm the value before moving on.</strong> Look at it, decide whether it makes
            sense for that circuit, and only then walk to the next accessory.
          </li>
          <li>
            <strong>Transcribe from the instrument, not from memory,</strong> and investigate
            anomalies at the time. An odd value found on site costs ten minutes; the same value
            found at review costs a return visit.
          </li>
        </ul>
        <p>
          A download populates a schedule; it does not replace one. The completed, signed document
          is the regulatory deliverable and the download is the audit trail sitting behind it.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 644.1.1 (Defect correction prior to certification)"
        clause="For a new installation, any defect or omission revealed during the inspection and testing shall be corrected before the Certificate is issued."
        meaning="The certificate states that the installation is safe and compliant at the moment it is issued. You cannot issue a clean certificate for an installation with a known insulation fault, a non-compliant loop impedance, a missing CPC continuity or any other defect found during testing, however the defect is annotated. Fix it, re-test it, then certify. This is the regulation that stops recording turning into a tick-box exercise: the schedule cannot show a fail and the certificate be issued alongside it."
        cite="Source: BS 7671:2018+A4:2026 Part 6, Chapter 64, Regulation 644.1.1."
      />

      <SectionRule />

      <ContentEyebrow>Which document carries what</ContentEyebrow>

      <ConceptBlock
        title="The three forms, and the two alternatives"
        plainEnglish="Certificate, schedule of inspections, schedule of test results. Three documents, three jobs, issued together as one pack."
        onSite="Choosing the wrong form is a sign-off error in itself. A consumer unit replacement is a major alteration and takes the full pack; adding one socket to an existing ring does not."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Electrical Installation Certificate.</strong> The top-level signed document.
            Address and extent of the work, supply characteristics including the system earthing
            arrangement, Ze and prospective fault current, the designer, constructor and inspector
            declarations each separately signed, any departures from BS 7671 with reasoning,
            comments, and the recommended date for the next inspection.
          </li>
          <li>
            <strong>Schedule of inspections.</strong> The visual checklist — connection and
            identification of conductors, warning notices and labels, diagrams and instructions,
            barriers and enclosures, fault and additional protection, single-pole devices in the
            line conductor, methods of safe isolation. Each item ticked, marked not applicable, or
            annotated.
          </li>
          <li>
            <strong>Schedule of test results.</strong> The per-circuit measurements. Continuity,
            ring final values, insulation resistance, polarity, Zs calculated and measured, RCD
            operating times, arc fault detection device test where fitted, and notes.
          </li>
          <li>
            <strong>Minor works certificate.</strong> A single page for a minor addition or
            alteration to an existing circuit — a socket added to a ring, an accessory replaced like
            for like. It records the test results for the altered portion only. Not for a new
            circuit and not for a consumer unit replacement.
          </li>
          <li>
            <strong>Condition report.</strong> Used to assess an existing installation rather than
            certify new work. Extent of the inspection, observations classified C1, C2, C3 or FI,
            and the recommended next inspection. The test data underneath still sits on a schedule
            of test results.
          </li>
        </ul>
        <p>
          How a defect is handled follows from which document you are completing. On new work it is
          corrected before the certificate is issued. On a condition report it is classified and the
          client decides what to act on, with a C1 requiring immediate action.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 644.3"
        clause="644.3 The Certificate shall include details of the extent of the work covered, and: (a) Schedule(s) of Inspection; and (b) Schedule(s) of Circuit Details and Schedule(s) of Test Results. The schedules shall be based on the models in Appendix 6."
        meaning="The schedules are not attachments you send on if the client asks &mdash; the regulation makes them part of the certificate, so a certificate issued without them is incomplete. Note &ldquo;the extent of the work covered&rdquo; sitting in the same sentence: what you inspected and tested has to be written down as plainly as the results, because that is what tells the next person which parts of the installation your signature does and does not stand behind."
        cite="BS 7671 Part 6, Chapter 64, Section 644 — Regulation 644.3"
      />

      <InlineCheck
        id="306e-5-1-check-1"
        question="You have replaced a consumer unit on an existing domestic installation. Which documents go to the customer?"
        options={[
          'A minor works certificate on its own, since no new circuits were created',
          'A condition report, because the existing wiring was assessed rather than installed',
          'A certificate on its own — the schedules are supporting notes and are optional',
          'An Electrical Installation Certificate together with the schedule of inspections and the schedule of test results',
        ]}
        correctIndex={3}
        explanation="A consumer unit replacement is a major alteration and takes the full pack. The certificate carries the declarations, the schedule of inspections carries the visual items, and the schedule of test results carries every per-circuit reading. A minor works certificate covers small alterations to an existing circuit, and a condition report assesses an existing installation rather than certifying work you have just carried out."
      />

      <SectionRule />

      <ContentEyebrow>The schedule of test results</ContentEyebrow>

      <ConceptBlock
        title="The header — what is common to every circuit"
        plainEnglish="Fill the header completely on every schedule, even on a small job. Empty header fields create ambiguity that nobody can resolve later."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Certificate reference number.</strong> This is what links the schedule to its
            parent certificate. Without it the two documents are loose pages.
          </li>
          <li>
            <strong>Address of the installation.</strong> Full postal address, written the same way
            on every document in the pack.
          </li>
          <li>
            <strong>Date of testing, and the person responsible.</strong> A single date, or a range
            where the work spanned visits with a note per row saying which visit a reading belongs
            to. Name and qualification of whoever carried out the testing.
          </li>
          <li>
            <strong>Instrument details.</strong> Model, serial number and calibration status. This
            is what lets a disputed reading be traced back to a calibrated instrument, which is the
            whole point of recording it.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="The per-circuit row, group by group"
        plainEnglish="Around sixteen to twenty columns per circuit, in four groups: what the circuit is, what it is wired in, what protects it, and what it measured."
        onSite="Certification software fills a lot of this automatically from an instrument download. That removes transcription errors and introduces import errors, which is why the review before signature is the step that matters."
      >
        <p>
          <strong>Identification.</strong> Circuit number, a plain-English description such as
          kitchen ring final, the type of wiring, and the reference method from Appendix 4 — 100 for
          clipped direct, 101 for above plasterboard, 102 for an insulated void.
        </p>
        <p>
          <strong>Cable data.</strong> Cross-sectional area of the line conductor and of the
          protective conductor, in mm².
        </p>
        <p>
          <strong>Protective device.</strong> Type and rating with the product standard, the maximum
          Zs read from A4:2026 Table 41.3 for that device, the rated residual operating current
          where there is an RCD or RCBO, the RCD type, and whether an arc fault detection device is
          fitted.
        </p>
        <p>
          <strong>Test results.</strong> R1 + R2, and for a ring the end-to-end r1, rn and r2 as
          well. Insulation resistance line to neutral, line to earth and neutral to earth. Polarity
          as a tick or P. Zs calculated and Zs measured. RCD operating time. The arc fault device
          test where fitted. Then the notes column, which is where everything that does not fit a
          column goes.
        </p>
        <p>
          A worked row for a kitchen ring on 2.5/1.5 mm² cable, clipped direct, protected by a Type
          B 32 A RCBO with a 30 mA residual rating, looks like this: maximum Zs 1.37 Ω from Table
          41.3; r1 0.32 Ω, rn 0.34 Ω, r2 0.55 Ω; R1 + R2 taken as the highest cross-connection
          reading at 0.22 Ω; insulation resistance off scale on all three combinations; polarity P;
          Zs calculated from a measured Ze of 0.32 Ω as 0.54 Ω and measured at the far socket as
          0.57 Ω; operating time 28 ms. Every cell filled, every figure the one the instrument
          showed.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="306e-5-1-check-2"
        question="On a row for a circuit protected by a 32 A Type B RCBO with a 30 mA residual rating, the residual current column has been left blank. Is that acceptable?"
        options={[
          'Yes — the device is labelled RCBO, so a future inspector can infer 30 mA',
          'No — it is a required field on any row with an RCD function, and a blank cell reads as though the circuit has no residual protection',
          'Yes — the rating only needs recording where the RCD is a separate unit',
          'Yes — the measured operating time proves the device works, so the rating is redundant',
        ]}
        correctIndex={1}
        explanation="The residual operating current is part of the description of the protection on that circuit, and it is not always 30 mA — a sub-main feed may be at 100 mA for selectivity. Leaving it out means the next inspector cannot tell whether the device is rated for additional protection, whether the test result they are reading was taken at the right current, or whether there is residual protection at all."
      />

      <SectionRule />

      <ContentEyebrow>Accuracy</ContentEyebrow>

      <ConceptBlock
        title="Record the value, not the verdict"
        plainEnglish="The number is the evidence. Pass is your opinion of the number, and an opinion cannot be compared against anything later."
      >
        <p>
          A schedule full of ticks says the installation was acceptable on the day. A schedule full
          of values says how acceptable, and lets the next person see what has changed since. That
          comparison is the reason the figures are kept.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Operating times in milliseconds.</strong> 28 ms, not Pass. A device that reads
            28 ms today and 200 ms at the next inspection has degraded badly, even though both
            readings are inside the limit.
          </li>
          <li>
            <strong>Insulation resistance as measured.</strong> Off scale is recorded as off scale,
            not as OK. A circuit that reads well below its neighbours today is the one worth
            watching.
          </li>
          <li>
            <strong>Both Zs figures, with units where there is any doubt.</strong> Calculated and
            measured close together is itself a check; a wide divergence points at a bad continuity
            reading or a contact resistance problem. Where the column header carries the unit the
            cell can be a bare number, but forms vary and mixed units cause misreading.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="The errors that produce a plausible but wrong schedule"
        plainEnglish="A wrong figure that looks reasonable is more dangerous than an obviously silly one, because nothing draws attention to it."
        onSite="Two passes. First at the point of test, writing the value as the instrument shows it. Second at the end of the day, reading every value back against what the circuit should produce."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>The decimal point.</strong> 0.45 Ω written as 4.5 Ω. The ten-fold error is
            invisible unless you ask whether the figure is possible for that circuit.
          </li>
          <li>
            <strong>Milliohms and ohms.</strong> A reading of 450 mΩ transcribed as 450 Ω instead of
            0.45 Ω. Check the unit on the display, not just the digits.
          </li>
          <li>
            <strong>Transposed digits.</strong> 0.32 Ω written as 0.23 Ω. Hard to spot in isolation,
            easy to spot in context — r1 and rn on a ring should sit close together, so a pair that
            does not is worth a second look.
          </li>
          <li>
            <strong>The wrong row, or stale data.</strong> A reading taken on circuit 5 written onto
            circuit 6, or a value left in instrument memory from yesterday&rsquo;s job. Read the
            description column back against the value, and clear the instrument at the start of each
            job.
          </li>
          <li>
            <strong>Superseded table values.</strong> A template or an old printed schedule that
            still carries maximum Zs figures from an earlier edition, so a circuit passes against
            the displayed limit and would fail against the current one. Amendments do revise these
            tables, and a value you half-remember from training is not a source. Check the figure
            against the current tables every time rather than against the one printed on the form
            in front of you &mdash; for a Type B device the current limits include 7.28 Ω at 6 A,
            4.37 Ω at 10 A, 2.73 Ω at 16 A, 2.19 Ω at 20 A, 1.37 Ω at 32 A and 1.09 Ω at 40 A.
          </li>
        </ul>
        <p>
          The sanity ranges worth carrying in your head: R1 + R2 on a domestic ring in 2.5/1.5 mm²
          cable around 0.18 to 0.30 Ω; a lighting circuit in 1.5/1.0 mm² around 0.5 to 1.5 Ω;
          insulation resistance on healthy new wiring above 100 MΩ and usually off scale; a healthy
          30 mA device operating in the region of 20 to 50 ms. A value well outside those ranges is
          investigated before it is written down.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Blanks, limitations and notes</ContentEyebrow>

      <ConceptBlock
        title="A blank cell is a question nobody can answer"
        plainEnglish="Not applicable is a decision. Blank is an unanswered question, and years later there is no way to tell which one you meant."
      >
        <p>
          Every required field gets something in it. Where a test genuinely does not apply, write
          N/A: ring values on a radial, the residual current rating on a circuit protected by a
          plain MCB, the electrode column on a TN installation. Where a test was not carried out,
          record it as not tested with the reason.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Equipment that could not be taken offline.</strong> Record which circuit, what
            the equipment was, what was done instead, and when the outstanding test will happen.
          </li>
          <li>
            <strong>Areas not accessed.</strong> A locked store or outbuilding with no key
            available. Say so, and set the follow-up.
          </li>
          <li>
            <strong>Equipment disconnected for testing.</strong> Name what came off, and record the
            follow-up reading taken after it went back on.
          </li>
          <li>
            <strong>Anomalies investigated.</strong> The original reading, what you found, what you
            did, and the corrected reading. That sequence is what makes a corrected result credible
            rather than suspicious.
          </li>
          <li>
            <strong>Departures from BS 7671.</strong> A deliberate deviation with the reasoning
            behind it, recorded at certificate level as well as against the circuit.
          </li>
        </ul>
        <p>
          Limitations recorded against a circuit are summarised at certificate level too, so
          somebody reading the top sheet knows the pack has qualifications in it.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="306e-5-1-check-3"
        question="A circuit initially read 480 MΩ on the insulation test where every other circuit was off scale. You found and repaired a sheath pinched at a back box, re-tested, and it now reads off scale. What goes on the schedule?"
        options={[
          'Only the corrected reading, since the original value was caused by a fault that no longer exists',
          'Only the original reading, with a note that it was repaired afterwards',
          'The original reading, the corrective action, and the corrected reading',
          'Neither reading — the circuit passed both times, so a single tick is sufficient',
        ]}
        correctIndex={2}
        explanation="All three. The original figure shows what was found, the action shows what was done about it, and the corrected figure shows the state at handover. Recording only the final value hides that the circuit needed work, which matters to the next inspector comparing readings — and a corrected value with no explanation behind it invites the question of why it changed."
      />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Issuing the certificate with a known defect written into the notes"
        whatHappens={
          <>
            Testing on a new installation turns up one circuit with an insulation reading below the
            1 MΩ minimum. The customer is pressing to move in, so the certificate goes out with a
            line in the notes saying the reading is low and further investigation is recommended.
            Months later there is an incident on that circuit, and the document meant to show the
            installation was safe instead records that a defect was identified, written down and
            left in place.
          </>
        }
        doInstead={
          <>
            Find the fault, correct it, re-test, and only then issue the certificate — with the
            original reading, the corrective action and the corrected reading all recorded.
            Regulation 644.1.1 does not offer a notes-column alternative for a new installation.
            Most defects of this kind are a back box or a damaged length of cable and cost an hour.
            The conversation about handover slipping by an hour is a great deal shorter than the
            conversation about a certificate that should never have been issued.
          </>
        }
      />

      <CommonMistake
        title="Writing the verdict in the cell instead of the reading"
        whatHappens={
          <>
            The testing is done properly, every circuit is comfortably inside its limits, and the
            schedule gets filled in with ticks and the word Pass down the columns. Nothing is
            dishonest about it &mdash; the circuits really did pass. What has been thrown away is the
            evidence. A device that operated in 28 ms and one that scraped in near the limit both
            read Pass, so when the same circuit is tested at the next inspection there is nothing to
            compare the new figure against and no way to see that it has degraded. The same goes for
            an insulation reading recorded as OK rather than as measured, and for a Zs column filled
            in with a tick: the one circuit on the board that was worth watching now looks exactly
            like the eleven that were not. A verdict is your opinion of a number, and an opinion
            cannot be compared with anything.
          </>
        }
        doInstead={
          <>
            Write down what the instrument showed, cell by cell, with the units where there is any
            room for doubt. Operating times in milliseconds, insulation resistance as measured with
            off scale recorded as off scale, both the calculated and the measured Zs so the two can
            be read against each other. Then use the figures as you write them: ask whether each one
            is possible for that circuit before you move on, because a value that sits well outside
            what the cable and the route can account for is telling you something while you are
            still stood in front of it. The comparison those numbers make possible in five years is
            the whole reason the schedule is retained.
          </>
        }
      />

      <Scenario
        title="Haverfordwest — the schedule that came back from review"
        situation={
          <>
            A rewire on a farmhouse outside Haverfordwest, TT supply, twelve circuits. You test over
            two days because the owner needs the milking parlour supply live overnight. Your
            schedule goes to the supervisor for review before the certificate is issued and comes
            straight back. Three things are flagged: the electrode column is blank on every row, the
            residual current rating is missing on four RCBO rows, and circuit 9 — a lighting circuit
            in 1.5/1.0 mm² cable — shows R1 + R2 of 8.4 Ω.
          </>
        }
        whatToDo={
          <>
            Deal with them in order of what they cost. The electrode is a real test on a TT
            installation, so a blank column is not a formatting problem — either the measurement was
            taken and never transferred, in which case it goes in, or it was not taken, in which
            case you go back and take it before anything is signed. The four missing residual
            ratings are transfer losses from the instrument import and are filled from the devices
            themselves, not from memory of what you usually fit. Circuit 9 is the one to worry
            about: a lighting circuit in that cable sits around 0.5 to 1.5 Ω, so 8.4 Ω is roughly
            ten times what the route can account for. Either it is 0.84 Ω with a misplaced decimal
            point, or the circuit has a high-resistance joint. You do not guess which — you return
            and re-measure, and whatever the instrument says this time is what goes on the schedule.
            The two-day split is recorded in the header as a date range with a note against the rows
            tested on the second visit.
          </>
        }
        whyItMatters={
          <>
            None of the three flags is an administrative nicety. The blank electrode column removes
            the only evidence that the earthing arrangement on a TT installation was verified at
            all. The missing residual ratings leave a future inspector unable to tell what
            protection is on those circuits. And 8.4 Ω either misstates a sound circuit by a factor
            of ten or conceals a genuine defect — and there is no way to tell which from the paper.
            A supervisor caught it here. The next reader might be somebody investigating why a
            circuit did not disconnect.
          </>
        }
      />

      <SectionRule />

      <ContentEyebrow>Who reads it next</ContentEyebrow>

      <ConceptBlock
        title="The document outlives the job"
        plainEnglish="Write for a stranger reading it years from now, without you available to explain anything."
      >
        <p>
          The pack has a predictable set of future readers, and every one of them needs it to stand
          on its own:
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>The next inspector.</strong> At the periodic inspection they compare
            today&rsquo;s readings against yours. Drift in insulation resistance or loop impedance
            across the interval can show slow degradation even where the current reading still
            passes — but only if your figures are values rather than ticks.
          </li>
          <li>
            <strong>The customer, and their solicitor.</strong> The certificate is asked for at
            sale, and it is what the owner produces to show the installation was certified.
          </li>
          <li>
            <strong>An insurer or investigator.</strong> After an incident the pack is read closely,
            and a note describing a known defect that was left in place reads very differently in
            that room than it did on the day.
          </li>
          <li>
            <strong>The electrician who comes back to alter the installation.</strong> Your notes
            about a spur, a shared conductor or an unusual cable route save them the afternoon you
            spent finding it.
          </li>
        </ul>
        <p>
          Retention follows from that. The customer keeps their copy for the life of the
          installation. The contractor keeps a file copy for at least six years for civil liability,
          and commonly far longer where an insurer requires it. Where the work is notifiable, the
          notification goes to the relevant body within its own window. If a customer loses their
          copy, issue a duplicate from the file marked as a duplicate of the original and its date —
          never re-test and issue a fresh certificate, because that puts a different date on the
          same work and misleads whoever reads it next.
        </p>
      </ConceptBlock>

      <SectionRule />

      <FAQ
        items={[
          {
            question: 'Is a hand-written schedule still acceptable?',
            answer:
              'Yes, provided every required field is completed, the writing is legible and the signature is genuine. Digital has become the norm because it validates completeness, imports readings from the instrument and removes handwriting from the equation, but nothing in the regulations demands it. Where a scheme or a client specifies a digital submission, that is a contractual requirement rather than a regulatory one — read what you have agreed to.',
          },
          {
            question: 'The instrument stores every reading. Why complete a schedule at all?',
            answer:
              'Because the signed schedule is the document that certifies the installation, and the download is the evidence behind it. The download has no declarations, no context, no visual inspection items and nobody’s signature against it. It is genuinely useful — it removes transcription error and gives you a defensible trail of what the instrument actually measured — but it populates the schedule rather than replacing it, and the values still have to be reviewed before they are signed for.',
          },
          {
            question: 'How much detail belongs in the notes column?',
            answer:
              'Enough that a stranger can understand the row without calling you. Brief, factual and specific: where a spur is and how long it is, what equipment was disconnected and what the follow-up reading was, what could not be tested and when it will be, what an anomalous reading turned out to be. A sentence or two per entry. The test is simple — read the row back as though you had never seen the installation, and see whether anything is left unexplained.',
          },
          {
            question: 'What if the live tests are not done at the same visit as the dead tests?',
            answer:
              'Complete the dead-test portion of the schedule at the time and add the live values when you take them, so that the finished document has every applicable column filled before it is signed. Record the dates involved in the header rather than presenting split work as a single visit. What you must not do is energise or hand over any portion that has not been fully tested — an untested circuit is an omission, and omissions are resolved before certification, not afterwards.',
          },
        ]}
      />

      <KeyTakeaways
        points={[
          'Regulation 644.3 requires every test result to be recorded and retained as part of the certification. The record is part of the work, not a task that follows it.',
          'Write the value at the instrument, against the circuit it belongs to. A schedule written up later from memory is reconstruction, and it shows.',
          'The certificate carries the declarations, the schedule of inspections carries the visual items, and the schedule of test results carries the per-circuit measurements. Choosing the wrong form invalidates the certification.',
          'Record measured values, not verdicts — 28 ms rather than Pass — because the next inspector needs something to compare against.',
          'Never leave a required field blank. N/A where a test does not apply, not tested with a reason where it was not carried out.',
          'Maximum Zs comes from the current Table 41.3 for the device — 1.37 Ω for a Type B 32 A — never from a figure carried over from an earlier edition.',
          'Sanity-check every figure against what the circuit could plausibly produce. Decimal points, milliohms against ohms, transposed digits and stale instrument data all produce readings that look reasonable and are wrong.',
          'Regulation 644.1.1: on a new installation, defects revealed during inspection and testing are corrected before the certificate is issued. A note in the comments is not a substitute for a repair.',
        ]}
      />

      <ContentEyebrow>Check yourself</ContentEyebrow>
      <Quiz questions={quizQuestions} title="Recording inspection and dead-test outcomes" />
    </div>
  );
}
