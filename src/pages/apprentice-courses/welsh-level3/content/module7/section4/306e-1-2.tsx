/**
 * Unit 306E — Understand the Principles of Inspection, Testing and Commissioning
 * Learning outcome 1 — Understand how to select the instruments to be used for
 * carrying out relevant tests
 * Criterion 1.2 — How to confirm that the test instruments are fit for purpose and
 * have a current calibration certificate
 *
 * Approach: criterion 1.1 settled which instrument does which test. This page is about
 * whether that instrument can be trusted on the day — the calibration certificate and
 * the register behind it, the physical condition of the body, leads and probes, the
 * GS38 geometry, and the functional proving that a calibration sticker can never give
 * you. Pitched at a third-year who has to defend a reading, not just take one.
 * Every value, interval and figure on this page is taken from the published Elec-Mate
 * Level 2 Module 4.1.5 and Level 3 Module 4.2.1 lessons.
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
    question: 'What is the standard calibration interval for a multifunction tester used on verification work?',
    options: [
      'Annually, with a UKAS-traceable certificate',
      'Once, at the point of purchase, and never again unless the instrument is dropped',
      'Every five years, and only where the work is commercial rather than domestic',
      'Weekly, regardless of how often the instrument is used',
    ],
    correctAnswer: 0,
    explanation:
      'Annual calibration with a UKAS-traceable certificate is the universal standard for a multifunction tester. Some firms shorten it to six-monthly where the instrument is in daily use. Cost is typically in the range of £40 to £80 per instrument per year.',
  },
  {
    id: 2,
    question: 'Which of these appears on a proper calibration certificate?',
    options: [
      'The instrument serial number, the tests carried out, the as-found readings, the as-left readings and the next-due date',
      'The name of the electrician who last used the instrument and the jobs it was used on',
      'The purchase price of the instrument and its remaining depreciation',
      'A photograph of the instrument on the calibration bench and nothing else',
    ],
    correctAnswer: 0,
    explanation:
      'The certificate is a record of what was found and what was left. The as-found readings tell you whether the instrument had drifted during the year that just ended, which matters if you are looking back at results taken on it.',
  },
  {
    id: 3,
    question: 'What is the consequence of issuing a certificate using results from an out-of-calibration instrument?',
    options: [
      'The certificate is technically invalid and the work has to be re-tested with a calibrated instrument and reissued',
      'Nothing, as long as the readings were within the expected range',
      'The instrument must be scrapped but the certificate stands',
      'The certificate remains valid but cannot be used for domestic work',
    ],
    correctAnswer: 0,
    explanation:
      'An out-of-calibration instrument produces readings that are not admissible as evidence of compliance. A certificate built on them can be challenged, and the honest remedy is a re-test on a calibrated instrument followed by reissue.',
  },
  {
    id: 4,
    question: 'Why are HRC fuses used in test lead assemblies rather than glass cartridges?',
    options: [
      'HRC fuses are sand-filled and rated to interrupt very high fault currents; a glass cartridge at around 35 A breaking can rupture violently',
      'HRC fuses are cheaper, which is the only reason manufacturers fit them',
      'Glass cartridges cannot be made small enough to fit a probe handle',
      'HRC fuses blow more slowly, which reduces nuisance operation during routine testing',
    ],
    correctAnswer: 0,
    explanation:
      'Breaking capacity is the point. HRC fuses in test leads are typically 500 mA F or 1 A FF and are rated to 100 kA breaking. A glass cartridge on a high prospective short-circuit current circuit can shatter and spray glass and hot metal. Always replace a blown lead fuse with HRC.',
  },
  {
    id: 5,
    question: 'An instrument has been dropped from a stepladder onto a concrete floor. It still powers on and reads normally. What is the correct action?',
    options: [
      'Stop using it, tag it DO NOT USE, and function-check it at base against a reference instrument before it goes back into service',
      'Keep using it, because a drop only matters where the case is visibly cracked',
      'Keep using it but reduce the insulation test voltage to 250 V for the rest of the day',
      'Dispose of it immediately, because a dropped instrument can never be recalibrated',
    ],
    correctAnswer: 0,
    explanation:
      'A dropped instrument is presumed unsafe. The hazard is not the visible damage but hairline cracking in the input protection that lets fault current bypass the protection on the next live test. It behaves normally for a while and then fails violently.',
  },
  {
    id: 6,
    question: 'What does the GS38 fourth edition specify as the maximum exposed metal on a test probe tip?',
    options: [
      '4 mm, or an insulating shroud that reduces the exposed tip to 4 mm or less',
      '19 mm, so the probe can reach into recessed terminals on a distribution board',
      '2 mm, with no shroud permitted under any circumstances',
      'No fixed figure — it is left to the judgement of the operative on the day',
    ],
    correctAnswer: 0,
    explanation:
      'The 4 mm limit is the headline change in the fourth edition. Older long tips could bridge two adjacent terminals. Reputable probes offer a snap-on cap that gives a longer reach for recessed terminals when it is appropriate to use it.',
  },
  {
    id: 7,
    question: 'How does proving the voltage indicator on a proving unit differ from calibrating it?',
    options: [
      'Proving is a functional check that the tester works right now; calibration is a traceable measurement of its accuracy at a point in time',
      'They are the same operation, with proving being the informal name for calibration',
      'Proving replaces calibration where the tester is used only on single-phase circuits',
      'Calibration is done on site and proving is done at the laboratory',
    ],
    correctAnswer: 0,
    explanation:
      'A calibration sticker tells you the instrument was accurate on the date it was calibrated. It says nothing about whether the battery died this morning or a probe broke in the van. Proving before and after the dead test is what closes that gap.',
  },
  {
    id: 8,
    question: 'What is recorded in a calibration register?',
    options: [
      'The instrument identifier, the calibration date, the laboratory, the certificate number and the next-due date',
      'Only the next-due date, since everything else is on the certificate',
      'The names of every operative who has signed the instrument out',
      'The measured readings from every job the instrument has been used on',
    ],
    correctAnswer: 0,
    explanation:
      'The register is the firm-level view of the whole instrument fleet. It answers the audit question of whether the instrument used on a given job was in calibration on the day, which is a question the sticker on the case alone cannot answer once the sticker is replaced.',
  },
];

export default function Lesson306e_1_2() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'Fit for purpose is three questions, not one. Is it the right instrument for the measurement, is it in calibration, and is it physically sound today.',
          'The multifunction tester is calibrated annually with a UKAS-traceable certificate. The two-pole voltage indicator runs on a 24-month interval. Multimeter, clamp and proving unit are annual.',
          'The certificate records the serial number, the tests carried out, the as-found and as-left readings and the next-due date. The register records instrument, date, laboratory, certificate number and next-due date.',
          'A calibration sticker is a statement about a date in the past. It cannot tell you the battery is flat or a lead is cracked, which is why the pre-use inspection and the proving routine still happen every time.',
          'Results from an out-of-calibration instrument are not admissible evidence of compliance. A certificate built on them has to be re-tested and reissued.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Describe the three separate questions that together decide whether an instrument is fit for purpose — suitability, calibration and physical condition.',
          'State the calibration intervals for the instruments in a single-phase verification kit and explain what the calibration certificate records.',
          'Explain how a calibration register supports the audit trail behind a certificate, and what happens when an out-of-date instrument has been used.',
          'Carry out a pre-use inspection of an instrument body, leads and probes against the GS38 fourth edition requirements.',
          'Distinguish proving a voltage indicator before and after a dead test from calibrating it, and explain why both are required.',
        ]}
        initialVisibleCount={3}
      />

      <SectionRule />

      <ContentEyebrow>The three questions behind fit for purpose</ContentEyebrow>

      <ConceptBlock
        title="Suitable, calibrated, sound — all three or none"
        plainEnglish="An instrument can be the correct instrument for the test, in calibration, and still unfit because a lead is cracked. It can be in perfect condition and unfit because the calibration ran out last month. Fit for purpose is the intersection of three separate checks."
        onSite="Run them in that order at the van door. Is this the right instrument for what I am about to measure. Is it in date. Does it and its leads pass a look-over. Anything that fails goes back in the case and something else comes out."
      >
        <p>
          The three checks answer three genuinely different questions, and passing one tells you nothing
          about the other two.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Suitability.</strong> Does the instrument perform the measurement to the required
            standard, and is its measurement category adequate for the location. This is the criterion
            1.1 question carried forward.
          </li>
          <li>
            <strong>Calibration.</strong> Has the accuracy of the instrument been verified against a
            traceable reference within the interval, and is the certificate available.
          </li>
          <li>
            <strong>Condition.</strong> Is the body undamaged, are the leads intact, do the probes meet
            the GS38 geometry, and does the instrument function correctly right now.
          </li>
        </ul>
        <p>
          On a job where a reading is later challenged, all three get asked. A confident answer to two
          of them is not a defence.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Drift and calibration intervals</ContentEyebrow>

      <ConceptBlock
        title="Why instruments drift, and the intervals that answer it"
        plainEnglish="Test instruments do not stay accurate on their own. Heat, vibration, shock and simple age move them, and an instrument that read perfectly when it was bought can be several per cent out after a year of bouncing around in a van. Different instruments carry different calibration intervals in response."
        onSite="Check the sticker, then check the register. The sticker on the case tells you the date. The register tells you the certificate number behind it and whether the instrument has actually come back from the laboratory or is still out."
      >
        <p>
          Drift is not dramatic. It does not make the instrument read nonsense; it makes it read
          something plausible that is slightly wrong, which is far more dangerous than an obvious
          failure. Take a 5 per cent error on a 100 megohm insulation resistance reading — that is 5
          megohms, nowhere near the 1 megohm minimum expected of a new installation, so it changes
          nothing. Now take the same 5 per cent on a borderline result, or on a continuity figure of a
          fraction of an ohm, and the error is the difference between a pass and a fail. By the time
          drift is obvious enough to notice on site it has already been in the readings for months,
          which is why calibration is scheduled rather than reactive.
        </p>
        <p>The intervals across the instruments you will use on a single-phase verification:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Multifunction tester.</strong> Annually, with a UKAS-traceable certificate.
            Shortened to six-monthly where the instrument is in daily use.
          </li>
          <li>
            <strong>Two-pole voltage indicator.</strong> Every 24 months.
          </li>
          <li>
            <strong>Proving unit.</strong> Annually, sent with the two-pole tester so the pairing stays
            together.
          </li>
          <li>
            <strong>Multimeter.</strong> Annually.
          </li>
          <li>
            <strong>Clamp meter.</strong> Annually.
          </li>
        </ul>
        <p>
          Calibration is offered by the manufacturers themselves — Megger, Fluke, Kewtech and Martindale
          all run in-house services — and by third-party UKAS-accredited laboratories. Typical cost is
          £40 to £80 per instrument per year, which is small against the cost of re-testing an
          installation.
        </p>
      </ConceptBlock>

      <SectionRule />

      <InlineCheck
        id="306e-1-2-check-1"
        question="Your firm shortens the calibration interval on one particular multifunction tester from twelve months to six. What is the most likely reason?"
        options={[
          'The instrument is newer than the rest of the fleet and needs bedding in',
          'That instrument is in daily use, so it accumulates far more shock, vibration and thermal cycling than an instrument used occasionally',
          'Six-monthly calibration is a legal requirement for all multifunction testers',
          'Shortening the interval removes the need for a pre-use inspection of the leads',
        ]}
        correctIndex={1}
        explanation="Annual is the universal standard, and firms shorten it to six-monthly for the instruments that are out every day. Usage is the driver, because usage is what produces the shock and thermal cycling that moves an instrument off calibration. Nothing about a shorter interval removes the daily inspection of leads and probes."
      />

      <SectionRule />

      <ContentEyebrow>Certificates and the instrument register</ContentEyebrow>

      <ConceptBlock
        title="What the certificate says and what the register adds"
        plainEnglish="A calibration certificate is a record of a measurement made on a specific instrument on a specific date by a traceable laboratory. The register is the firm-level index of all of those certificates."
        onSite="If a client or an assessor asks whether the instrument used on their job was in calibration, the certificate alone does not answer it. The register does, because it ties instrument to date to certificate number."
      >
        <p>On the certificate:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Instrument serial number.</strong> Ties the certificate to one physical instrument,
            not to a model.
          </li>
          <li>
            <strong>The tests carried out.</strong> Which ranges and functions were verified.
          </li>
          <li>
            <strong>As-found readings.</strong> What the instrument was reading before adjustment. This
            is the line that tells you whether results taken during the year just ended can be relied
            on.
          </li>
          <li>
            <strong>As-left readings.</strong> What it reads now.
          </li>
          <li>
            <strong>Next-due date.</strong> The date that goes on the sticker.
          </li>
        </ul>
        <p>In the register: instrument identifier, calibration date, laboratory, certificate number and
        next-due date. Replace the sticker on the case when the instrument comes back from the
        laboratory, and update the register at the same time.</p>
      </ConceptBlock>

      <SectionRule />

      <ConceptBlock
        title="Using an out-of-date instrument — what actually happens"
        plainEnglish="Readings from an out-of-calibration instrument are not admissible as evidence of compliance. That is a statement about the paperwork, not about whether the installation is safe."
        onSite="The installation may be perfectly sound. The problem is that you cannot demonstrate it, because the only evidence is a set of numbers from an instrument whose accuracy nobody can vouch for."
      >
        <p>
          A certificate issued on the strength of results from an out-of-date instrument is technically
          invalid. The remedy is to re-test the installation with a calibrated instrument and reissue
          the certificate. That is a return visit, a second set of results, and an awkward conversation
          with whoever commissioned the work.
        </p>
        <p>
          It also travels. A sign-off built on inadmissible readings can be challenged long after the
          job is finished, and the register is the first thing an assessor looks at. This is why the
          check happens at the van door and not at the point somebody queries the certificate.
        </p>
      </ConceptBlock>

      <SectionRule />

      <InlineCheck
        id="306e-1-2-check-2"
        question="You discover that the multifunction tester used on last week's verification went out of calibration a fortnight ago. What is the correct response?"
        options={[
          'Nothing, because the readings all looked reasonable at the time',
          'Amend the calibration date in the register so the dates line up',
          'Send the instrument for calibration and leave the certificate as issued',
          'Send the instrument for calibration, re-test the installation with a calibrated instrument, and reissue the certificate',
        ]}
        correctIndex={3}
        explanation="The readings being reasonable is not the test — the question is whether they are admissible, and readings from an instrument outside its calibration interval are not. The instrument goes for calibration, the installation is re-tested on a calibrated instrument, and the certificate is reissued on the new results. Altering the register to make the dates fit is falsifying the audit trail."
      />

      <SectionRule />

      <ContentEyebrow>Checking the instrument before use</ContentEyebrow>

      <ConceptBlock
        title="The pre-use inspection — body, leads, probes"
        plainEnglish="Calibration says nothing about the physical state of the instrument today. The pre-use inspection does. It takes under a minute and it is the check that finds the cracked lead."
        onSite="Test leads kill more electricians than the instruments they connect to. A nick in the insulation, exposed conductor where the probe meets the cable, a frayed strain relief at the plug — any of those puts live voltage on your hand."
      >
        <p>The routine, before the job and again after it:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Bend the lead.</strong> Flex it through 360 degrees along its whole length and look
            for cracks opening in the insulation.
          </li>
          <li>
            <strong>Flex the strain reliefs.</strong> At the probe end and at the instrument end. This
            is where leads fail first.
          </li>
          <li>
            <strong>Look at the probe insulation.</strong> Finger guard intact, no chips in the moulded
            insulation, exposed tip within the GS38 limit.
          </li>
          <li>
            <strong>Look at the body.</strong> Case sound, screen undamaged, battery compartment
            closed, sockets not loose.
          </li>
          <li>
            <strong>Check the storage.</strong> Leads coiled in a figure of eight in the case. Tight
            loops crack insulation over time.
          </li>
        </ul>
        <p>
          Replacement leads must meet GS38 in their own right. Buying non-compliant probes to fit a
          compliant tester voids the compliance of the pairing, so stay with the manufacturer set or
          with aftermarket leads specifically marked for it.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ConceptBlock
        title="Fused leads, and the difference between HRC and glass"
        plainEnglish="Where the prospective fault current is high, the lead set carries an inline fuse. The type of fuse in that lead is a safety decision, not a stock decision."
        onSite="Typical inline ratings are 500 mA F or 1 A FF, and they are HRC. If you blow one, replace it with the same HRC type. Dropping a glass cartridge in because it fits is how a probe slip becomes an injury."
      >
        <p>
          HRC fuses are sand-filled and rated to interrupt very high fault currents, into the order of
          100 kA breaking. A glass cartridge sits at around 35 A breaking. On a circuit with a high
          prospective short-circuit current, a glass cartridge asked to interrupt a probe-slip fault can
          rupture violently and spray glass and hot metal at the operative holding it.
        </p>
        <p>
          The fuse is invisible until the day it matters, which is exactly why it gets substituted with
          whatever is in the drawer. Confirming the lead set is fit for purpose includes confirming what
          is inside the handle.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Proving, and kit you cannot trust</ContentEyebrow>

      <ConceptBlock
        title="Proving before and after — the check calibration cannot give you"
        plainEnglish="A calibration certificate is a statement about a date in the past. Proving is a statement about the last thirty seconds. You need both and they are not substitutes."
        onSite="Prove the tester on the proving unit. Test the circuit. Prove the tester again. The tester reads the proving voltage, typically 240 V or 110 V AC, at both ends of that sequence."
      >
        <p>
          The failure the proving routine catches is the one calibration cannot. A tester can be
          perfectly in calibration and still have a flat battery, a broken probe or an internal fault
          that developed this morning. A faulty tester reads dead on a live circuit, which is the exact
          reading you were hoping for and the exact reading that gets people killed.
        </p>
        <p>
          The second proving is the one that people skip, and it is the one that matters most. Without
          it you cannot show the tester was still working when it gave you the dead reading, only that
          it was working beforehand.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ConceptBlock
        title="Dropped, suspect, or too cheap to trust"
        plainEnglish="Some instruments become unfit in a moment. Others were never fit. Both cases are handled by taking the instrument out of service rather than by hoping."
        onSite="Tag it DO NOT USE and put it somewhere it cannot be picked up by the next person on autopilot. A tagged instrument in the van is still a hazard if the tag is on the case and the case is open."
      >
        <p>
          A dropped instrument is presumed unsafe. It is not the visible damage that is dangerous — it
          is hairline cracking in the input protection, which lets fault current bypass the protection
          on the next live test. The instrument behaves normally for a while and then fails violently.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Stop using it immediately.</strong> The reading you were about to take is not worth
            the risk.
          </li>
          <li>
            <strong>Tag it DO NOT USE.</strong> Protect the next person, who did not see it fall.
          </li>
          <li>
            <strong>Function-check it at base.</strong> Against a known source and a reference
            instrument.
          </li>
          <li>
            <strong>Send it for repair or re-calibration.</strong> If anything at all fails the check.
          </li>
        </ul>
        <p>
          The other category is the instrument that was never fit. Cheap multifunction testers below
          around £250 typically lack UKAS-traceable calibration, accurate fast RCD trip-time
          measurement, reliable continuity nulling, a robust enclosure and manufacturer support for
          re-calibration. The midmarket starting point is the Kewtech KT64+ at around £450; the premium
          tier is the Megger MFT1741+ at around £700. An instrument with no route to traceable
          calibration can never be confirmed fit for purpose, whatever it reads.
        </p>
      </ConceptBlock>

      <SectionRule />

      <InlineCheck
        id="306e-1-2-check-3"
        question="The sticker on the multifunction tester shows a next-due date three months away. What does that alone confirm?"
        options={[
          'Only that the instrument was within its interval at the last recorded calibration — it says nothing about the battery, the leads, the probes or whether the instrument works today',
          'That the instrument is fit for purpose and can be used without further checks',
          'That the leads supplied with it are GS38 compliant',
          'That the instrument is suitable for use at every measurement category location',
        ]}
        correctIndex={0}
        explanation="The sticker is a statement about accuracy on a past date. Fit for purpose also needs the suitability question — the right function and an adequate measurement category for where you are standing — and the condition question, which is the pre-use inspection of body, leads and probes plus the proving routine on the day."
      />

      <SectionRule />

      <RegsCallout
        source="HSE Guidance Note GS38 (4th ed) — Probe design"
        clause="The instrument&rsquo;s probes should incorporate a finger barrier and an insulated tip with a maximum length of metal exposed of 4 mm or, where this is not practicable, an insulating shroud reducing the exposed metal tip to 4 mm or less."
        meaning="The 4 mm rule is the headline of the fourth edition and it is the single easiest thing to check on any instrument handed to you. Older long tips could bridge two adjacent terminals on a board, turning a routine measurement into a phase-to-phase fault at the probe. Manufacturers supply snap-on caps that allow occasional reach into a recessed terminal without permanently exposing more metal. Compliance is judged on the probe and lead set together, so fitting non-compliant probes to a compliant tester makes the whole pairing non-compliant."
        cite="Source: HSE GS38 (4th ed) — Electrical test equipment for use by electricians."
      />

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Treating the calibration sticker as the whole of the fitness check"
        whatHappens={
          <>
            The sticker on the case reads in date, so the instrument goes straight out of the bag and
            onto the circuit. Nobody flexes the leads. Nobody looks at the probe tips. Halfway through
            the afternoon the operative notices the finger guard on one probe is cracked through and has
            been for a while, and that the strain relief at the instrument end has a section of exposed
            conductor under the sleeve. The instrument was accurate to a traceable reference in March.
            None of that had any bearing on the lead that has been sitting a few millimetres from a bare
            hand all day.
          </>
        }
        doInstead={
          <>
            Split the check in two and do both. The certificate and the register answer the accuracy
            question, and you check them before the instrument leaves base. The pre-use inspection
            answers the condition question, and you do it at the job — bend each lead through 360
            degrees, flex both strain reliefs, look at the probe insulation and the finger guard, look at
            the body and the sockets. Then, on the voltage indicator, prove on the proving unit before
            and after the dead test. Three checks, under two minutes, and they fail in different ways.
          </>
        }
      />

      <CommonMistake
        title="Putting whatever fuse fits into a fused lead set"
        whatHappens={
          <>
            A probe slips, the inline fuse in the lead does its job, and the lead comes back to the
            van. There is no spare of the right type in the case, but there is a glass cartridge in
            the drawer that fits the handle and carries the same current rating, so in it goes. The
            instrument works normally afterwards and nothing about the lead looks any different. The
            substitution is invisible from that point on — not on the calibration certificate, not in
            the register, and not in the pre-use inspection, because bending the lead and checking the
            probe insulation tells you nothing about what is inside the handle. On a circuit with a
            high prospective short-circuit current, the next probe slip asks that cartridge to
            interrupt a fault far beyond what it can break, and it ruptures in the hand holding it
            rather than clearing quietly.
          </>
        }
        doInstead={
          <>
            Treat the fuse in a lead set as part of the instrument specification rather than as a
            consumable. Replace a blown inline fuse with the same HRC type and rating the lead was
            supplied with, carry spares of that type in the case, and never fit a glass cartridge
            because it fits the holder. The same reasoning applies to the leads themselves:
            replacements have to meet GS38 in their own right, and putting non-compliant probes on a
            compliant tester voids the compliance of the pairing. When you are handed a lead set you
            did not fuse yourself, confirming it is fit for purpose includes asking what is inside the
            handle.
          </>
        }
      />

      <SectionRule />

      <Scenario
        title="Borrowed kit on a Monday morning — Llanelli"
        situation={
          <>
            You are second-fixing a rewire on a terrace in Llanelli and the firm has lent you a
            multifunction tester from another van because yours is at the laboratory. It arrives in a
            case with a lead set that is not the one you usually see, a calibration sticker showing a
            next-due date eight weeks away, and no paperwork. The gaffer wants the dead tests done before
            lunch so the plasterer can get back in.
          </>
        }
        whatToDo={
          <>
            Confirm the sticker against the register before you touch the circuit — instrument
            identifier, calibration date, laboratory, certificate number, next-due date. A sticker with
            no register entry behind it is an unanswered question, not a confirmation. Then inspect the
            lead set that came with it, because it is not the set you know. Bend each lead through 360
            degrees, flex both strain reliefs, check the probes for an intact finger guard, a 4 mm
            exposed tip and no chipping in the moulding, and check that any inline fuse is the HRC type
            the manufacturer specifies rather than a glass cartridge somebody dropped in. Null the leads
            on the continuity range before the first reading. Prove your voltage indicator on its proving
            unit, prove the circuit dead, prove the indicator again. Only then start the sequence.
          </>
        }
        whyItMatters={
          <>
            Borrowed kit is where the fitness checks get skipped, because the instrument arrives with an
            implied blessing from whoever lent it. That blessing covers none of the three questions. The
            calibration might be sound and the leads a hand-me-down set nobody has looked at in a year.
            Two minutes at the start of the morning is the difference between results you can defend and
            a job you re-test at your own cost.
          </>
        }
      />

      <SectionRule />

      <FAQ
        items={[
          {
            question: 'If the instrument is in calibration, why do I still have to prove the voltage indicator on a proving unit?',
            answer:
              'Because calibration and proving answer different questions. Calibration says the instrument was accurate against a traceable reference on the date it was calibrated. Proving says the tester is working in the last thirty seconds. A tester with a flat battery, a broken probe or a fault that developed this morning can be perfectly in calibration and still read dead on a live circuit. Prove the tester, test the circuit, prove the tester again.',
          },
          {
            question: 'Who keeps the calibration register, and what does an assessor look at?',
            answer:
              'The firm keeps it, and it lists the instrument identifier, the calibration date, the laboratory, the certificate number and the next-due date for every instrument in the fleet. It is checked at audit because it is the only record that can tie a specific job back to a specific instrument on a specific date. Replace the sticker on the case and update the register at the same time, when the instrument comes back from the laboratory.',
          },
          {
            question: 'Is a cheap multifunction tester ever good enough if I only do small single-phase jobs?',
            answer:
              'No. Instruments below around £250 typically lack UKAS-traceable calibration, accurate fast RCD trip-time measurement, reliable continuity nulling, a robust enclosure and manufacturer support for re-calibration. Without a route to traceable calibration you can never confirm the instrument is fit for purpose, whatever the readings look like. The midmarket starting point is the Kewtech KT64+ at around £450, with the Megger MFT1741+ at around £700 as the premium tier.',
          },
          {
            question: 'What about the insulated screwdrivers and hand tools — do they need checking too?',
            answer:
              'They are the secondary safety layer behind isolation and they carry their own marking. IEC 60900 is the international standard and EN 60900 is the European harmonised version; they are functionally identical and both require a 1000 V AC working voltage, a 10 kV AC test voltage on every tool and the double-triangle marking. Reputable makers mark to both. Tools sold as insulated without those markings should be treated as suspect and kept off live work.',
          },
        ]}
      />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Fit for purpose is three separate checks — is it the right instrument, is it in calibration, and is it physically sound today. Passing one says nothing about the other two.',
          'Multifunction tester annually with a UKAS-traceable certificate, shortened to six-monthly in daily use. Two-pole voltage indicator every 24 months. Proving unit, multimeter and clamp annually.',
          'Typical calibration cost is £40 to £80 per instrument per year, from the manufacturer or a third-party UKAS-accredited laboratory.',
          'The certificate records the serial number, the tests carried out, the as-found and as-left readings and the next-due date. The as-found line is what tells you whether the previous year of results stands.',
          'The register records instrument, date, laboratory, certificate number and next-due date, and it is what answers an audit question about a specific job.',
          'Results from an out-of-calibration instrument are not admissible. A certificate built on them has to be re-tested on calibrated kit and reissued.',
          'The pre-use inspection is bend the lead 360 degrees, flex both strain reliefs, check the probe insulation and finger guard, check the body. Replacement leads must meet GS38 in their own right.',
          'A dropped instrument is presumed unsafe — stop, tag it DO NOT USE, function-check it at base against a reference instrument before it goes back into service.',
        ]}
      />

      <SectionRule />

      <ContentEyebrow>Check yourself</ContentEyebrow>

      <Quiz
        questions={quizQuestions}
        title="Confirming instruments are fit for purpose — knowledge check"
      />
    </div>
  );
}
