/**
 * Unit 317E · Criterion 3.6 — The requirements for testing before circuits are energised.
 *
 * Approach: this lesson is the pre-energisation gate only. It teaches which
 * tests have to be finished before the supply is restored, why each of them
 * has to be carried out on a dead installation, and what it means to put a
 * circuit into service without them. The full ordered test sequence and the
 * live tests that follow energisation are taught elsewhere in this section —
 * this page does not repeat them.
 *
 * Sources used (existing verified teaching in the English course):
 *   level3/module5/section3/Sub1.tsx — the dead-test set, Reg 643.1 sequence
 *     text, Reg 643.7.2 closing paragraph, safe isolation prove-test-prove,
 *     GS38 lead requirements, Reg 643.2.1 continuity instrument output,
 *     Table 64 insulation-resistance test voltages and minima, Appendix 6
 *     Schedule of Test Results columns, calibration expectations.
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
import { InsulationResistanceTest } from '@/components/study-centre/diagrams';

const quizQuestions = [
  {
    id: 1,
    question: 'Regulation 643.1 describes the tests of Regulations 643.2 to 643.6 as:',
    options: [
      'Tests that shall be carried out in that order before the installation is energised.',
      'Tests that may be carried out in any order at the discretion of the person verifying, provided all of them are completed at some point during the job.',
      'Tests that are carried out after energisation, because the supply is needed to give the instrument a reference voltage to measure against.',
      'Tests that apply only to new installations, with existing installations verified entirely by the live tests from Regulation 643.7 onwards.',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 643.1 states that the tests of Regulations 643.2 to 643.6, where relevant, shall be carried out in that order before the installation is energised. That is what makes energisation a gate. Regulation 643.7 onwards covers the tests that by their nature require the supply to be connected.',
  },
  {
    id: 2,
    question:
      'Regulation 643.2.1 specifies the output of the instrument used for the continuity test as:',
    options: [
      'At least 200 mA at a no-load voltage between 4 V and 24 V.',
      'At least 25 A at mains voltage, so the test current is high enough to burn off oxide at every termination on a long protective conductor.',
      'Exactly 30 mA at 230 V, matching the rating of the residual current device so the continuity test also confirms the device will operate.',
      'Below 1 mA at 500 V, using the same source as the insulation-resistance test so one instrument setting covers both measurements.',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 643.2.1 sets the continuity instrument output at a minimum of 200 mA at a no-load voltage of 4 V to 24 V. The current is high enough to make a real measurement rather than a nuisance high reading from poor contact; the voltage is low enough to avoid risk if a circuit turns out to be unexpectedly live. Modern multifunction testers comply by default.',
  },
  {
    id: 3,
    question:
      'Table 64 gives the insulation-resistance test voltage and minimum value for a low-voltage circuit up to 500 V as:',
    options: [
      '500 V DC, with a minimum acceptable insulation resistance of 1 MΩ.',
      '230 V AC, with a minimum acceptable insulation resistance of 1 MΩ, because the test has to be carried out at the nominal voltage of the circuit.',
      '250 V DC, with a minimum acceptable insulation resistance of 0.5 MΩ, which is the figure that applies to every circuit regardless of nominal voltage.',
      '1000 V DC, with a minimum acceptable insulation resistance of 2 MΩ, the higher voltage being needed to stress the insulation realistically.',
    ],
    correctAnswer: 0,
    explanation:
      'Table 64 gives 500 V DC for circuits up to 500 V, expecting at least 1 MΩ. The 250 V DC test with a 0.5 MΩ minimum is the SELV and PELV case; 1000 V DC applies to circuits above 500 V. Recording the test voltage used alongside the reading is part of the record.',
  },
  {
    id: 4,
    question: 'The prove-test-prove routine that precedes every dead test is:',
    options: [
      'Prove the voltage indicator on a known live source, test the isolated point, then prove the indicator on a known live source again.',
      'Prove the calibration label is in date, test the isolated point, then prove the calibration label again at the end of the working day.',
      'Prove the indicator on a known live source once before the test only, because a voltage indicator cannot fail during the few seconds a test takes.',
      'Prove the indicator against a second meter held by a colleague, so two simultaneous readings confirm the circuit is dead without needing a proving unit.',
    ],
    correctAnswer: 0,
    explanation:
      'The indicator is proved on a known live source before the test point and again afterwards. The second prove is what confirms the indicator was still working at the moment it told you the point was dead. A dead reading from an unproven indicator is not proof of absence of supply.',
  },
  {
    id: 5,
    question: 'HSE Guidance Note GS38 describes test leads that have:',
    options: [
      'Insulated probes with no more than 4 mm of exposed metal at the tip, finger barriers, fused leads where appropriate and double insulation throughout.',
      'Bare metal probes with a long exposed tip, so the operative can reach recessed terminals deep inside an enclosure without removing accessories.',
      'Unfused leads of any length, because the internal protection in the instrument makes lead fusing unnecessary on low-voltage work.',
      'Crocodile clips on both leads, so the operative can clip on and stand well clear of live parts for the duration of the test.',
    ],
    correctAnswer: 0,
    explanation:
      'GS38 describes minimal exposed metal at the tip (no more than 4 mm), finger barriers that stop a hand slipping onto a live part, fusing where appropriate, double insulation and a CAT rating suited to the system. It matters during dead testing because safe isolation depends on the proving ritual being trustworthy.',
  },
  {
    id: 6,
    question:
      'Regulation 643.7.2, closing paragraph, sets out what happens when a test indicates a failure to comply. It requires that:',
    options: [
      'That test and any preceding test whose results may have been influenced by the fault shall be repeated after the fault has been rectified.',
      'The failed test alone shall be repeated after the fault has been rectified, since the earlier tests were carried out before the fault was introduced and remain valid.',
      'The installation shall be energised so that the failure can be investigated under working conditions before any repeat testing is attempted.',
      'The failure shall be recorded on the certificate as a departure, allowing the remaining tests to continue without rectification.',
    ],
    correctAnswer: 0,
    explanation:
      'The closing paragraph of Regulation 643.7.2 requires the failed test and any preceding test whose results may have been influenced by the indicated fault to be repeated after rectification. A fault does not just fail its own test; it can corrupt the readings taken before it was found.',
  },
  {
    id: 7,
    question:
      'You are part way through the pre-energisation tests and discover the installation is not actually isolated. The correct response is:',
    options: [
      'Stop, re-isolate at the correct point, prove dead again, investigate why the original isolation was incomplete, and document the near miss.',
      'Carry on carefully, touching only one conductor at a time and wearing insulated gloves, since the remaining dead tests can be completed on a live circuit.',
      'Switch the main breaker on and off several times to clear whatever is back-feeding the circuit, then continue once the reading settles.',
      'Record the unexpected voltage as a test result and return to investigate it at the end of the job once the other circuits are finished.',
    ],
    correctAnswer: 0,
    explanation:
      'Discovery of an unexpected live means stop. Re-isolate properly, prove dead again and find out why the first isolation did not work — a wrong device locked off, a back-fed circuit from a UPS, generator or neighbouring supply, a parallel protective conductor path, or induced voltage from an adjacent live circuit. Document it as a near miss.',
  },
  {
    id: 8,
    question:
      'Which of these entries belongs on the Appendix 6 Schedule of Test Results as pre-energisation evidence?',
    options: [
      'Continuity results, ring final continuity values, insulation resistance readings and polarity confirmation, recorded per circuit.',
      'A single overall pass or fail per circuit, since the schedule records only the verdict and not the individual measured values.',
      'Earth fault loop impedance, prospective fault current and residual current device trip time only, the dead-test values being kept in the contractor file.',
      'The protective device type and rating only, with all measured values retained separately and not entered on the schedule.',
    ],
    correctAnswer: 0,
    explanation:
      'The Schedule of Test Results carries a row per circuit and a column per test. The pre-energisation entries are continuity (R1 plus R2, or R2 only depending on method), ring final continuity values for ring circuits, insulation resistance across each combination, and polarity confirmation. Those cells are the audit trail behind the certificate.',
  },
];

const faqs = [
  {
    question: 'Why test anything dead when the installation is going to be energised anyway?',
    answer:
      'Because the dead tests find defects in the conductor and insulation paths at zero energy. If a protective conductor is broken or an insulation fault is present, energising will at best trigger an unexpected trip and at worst cause damage or shock. A fault found dead is straightforward to repair; the same fault found live can be dangerous to investigate. The pre-energisation block is a protective filter, not paperwork.',
  },
  {
    question: 'The contractor before me says they tested it. Can I skip the pre-energisation tests?',
    answer:
      'No. Your signature on the certification is your own professional declaration that the installation meets the standard. You verify by carrying out the tests, not by accepting somebody else in the chain saying they did. The certificate carries a separate inspection and testing declaration precisely so the verification is independent of the person who installed the work.',
  },
  {
    question: 'What if I have to break off part way through — lunch, a fault chase, another trade?',
    answer:
      'Re-prove the isolation when you come back. Proven dead at midday does not mean dead an hour later. Somebody may have reset a breaker, a generator may have started, a standby supply may have picked up. Treat every restart as a fresh isolation: identify, lock off, prove dead. Two minutes of discipline against a potentially fatal assumption.',
  },
  {
    question: 'Do I record every measurement before energising, or can I sample?',
    answer:
      'For initial verification it is every circuit and every test, recorded on the Schedule of Test Results. The schedule has a row per circuit and a column per test for that reason. Sampling belongs to periodic work under an agreed scope, where the sample has to be representative and the limitation has to be written on the report. Either way the recorded values must support the conclusion on the certificate.',
  },
];

export default function Lesson317e_3_6() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'Regulation 643.1 requires the tests of Regulations 643.2 to 643.6, where relevant, to be carried out in that order before the installation is energised. Energisation is a gate you pass, not a step you take.',
          'The pre-energisation block is continuity of protective conductors, continuity of ring final circuits, insulation resistance and polarity. Visual inspection under Regulation 642 comes before any of it.',
          'Every one of those tests depends on the installation being verifiably dead, which means safe isolation with a voltage indicator proved on a known live source before and after the test point.',
          'The instruments are specified as well as the tests: continuity output of at least 200 mA at 4 V to 24 V no-load under Regulation 643.2.1, and the insulation-resistance test voltages and minima in Table 64.',
          'A failure before energisation stops the job. Regulation 643.7.2 requires the failed test and any preceding test the fault may have influenced to be repeated after rectification.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'State which tests Regulation 643.1 requires to be complete before the installation is energised, and where the live tests begin.',
          'Explain why continuity, insulation resistance and polarity each have to be carried out on a dead installation rather than a live one.',
          'Carry out safe isolation to the prove-test-prove routine with GS38-compliant leads and a voltage indicator proved on a known live source before and after.',
          'Select instruments that meet the specified requirements, including the Regulation 643.2.1 continuity output and the Table 64 insulation-resistance test voltages.',
          'Apply the Regulation 643.7.2 rule when a pre-energisation test fails, repeating the failed test and any earlier test the fault may have influenced.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>Energisation is a gate, not a step</ContentEyebrow>

      <ConceptBlock
        title="Nothing goes live until the dead block is finished"
        plainEnglish="Regulation 643.1 puts the tests of Regulations 643.2 to 643.6 before energisation. That single word — before — is what turns them from a list of jobs into a gate. Until every relevant test in that block is complete and satisfactory, the installation stays dead."
        onSite="The pressure on site is always to get the board on. The builder wants power for the kettle, the customer wants to see the lights work, the next trade wants a socket. The answer is the same every time: the supply goes on when the pre-energisation tests are finished, not when somebody asks."
      >
        <p>What the gate separates:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Before the gate.</strong> Visual inspection under Regulation 642, then the tests
            of Regulations 643.2 to 643.6 in that order — continuity of protective conductors,
            continuity of ring final circuits, insulation resistance and polarity.
          </li>
          <li>
            <strong>The gate itself.</strong> Every relevant test complete, every result recorded,
            every failure rectified and re-tested. Only then is the supply restored.
          </li>
          <li>
            <strong>After the gate.</strong> Regulation 643.7 onwards covers the tests that by their
            nature need the supply connected. Those are taught elsewhere in this section; they are
            not your concern until the gate is passed.
          </li>
        </ul>
        <p>
          The order inside the block is not decoration either. Continuity proves the protective
          conductor path that later readings lean on. Insulation resistance proves there is no fault
          between conductors or to earth. Polarity proves the connections are the right way round.
          Each one clears the ground for the next.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 643.1 (Sequence of tests) and Regulation 643.7.2 (closing paragraph)"
        clause="Regulation 643.1: The tests of Regulations 643.2 to 643.6, where relevant, shall be carried out in that order before the installation is energised. Regulation 643.7 onwards covers tests that by their nature require the supply to be connected. Per Regulation 643.7.2 (closing paragraph): if any test indicates a failure to comply, that test and any preceding test, the results of which may have been influenced by the fault indicated, shall be repeated after the fault has been rectified."
        meaning="This is the regulation that creates the pre-energisation gate. Regulations 643.2 to 643.6 are the tests carried out with the installation dead. Regulation 643.7 onwards is where the supply comes in. Visual inspection under Regulation 642 precedes all of it. The closing paragraph of 643.7.2 adds the recovery rule: a failure does not only fail its own test, it can corrupt earlier readings, and those have to be repeated too."
        cite="Source: BS 7671:2018+A4:2026 Part 6, Chapter 64, Regulations 643.1 and 643.7.2."
      />

      <SectionRule />

      <ContentEyebrow>What has to be complete</ContentEyebrow>

      <ConceptBlock
        title="The four pre-energisation tests and what each one proves"
        plainEnglish="Four things have to be true before a circuit can safely be put into service: the protective conductor is continuous, a ring is actually a ring, the insulation is sound, and the connections are the right way round. Each of the pre-energisation tests proves one of them."
        onSite="Work circuit by circuit, not test by test across the board. Finishing continuity on everything and then starting insulation resistance on everything sounds efficient, but it makes it far easier to lose track of which circuit is clear and which is still open."
      >
        <p>The block in order, and what each test answers:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Continuity of protective conductors — Regulation 643.2.</strong> Is the
            protective conductor electrically continuous from the main earthing terminal to every
            accessory and exposed-conductive-part? Measured by the R1 plus R2 method (line and
            protective conductor end to end) or R2 only via a wander lead, and compared against the
            resistance you would expect for that cable size, route and length.
          </li>
          <li>
            <strong>Continuity of ring final circuits — Regulation 643.2.1.</strong> Is this ring
            actually a ring, rather than a damaged ring or two radials? The three-part method takes
            end-to-end readings on each conductor, then cross-checks at every outlet.
          </li>
          <li>
            <strong>Insulation resistance — Regulation 643.3.</strong> Is there a fault between live
            conductors, or between a live conductor and earth? Test voltage per Table 64 — 500 V DC
            for circuits up to 500 V, expecting at least 1 MΩ. Catches damaged insulation,
            conductors nicked by a screw, and faulty fixed appliances.
          </li>
          <li>
            <strong>Polarity — Regulation 643.6.</strong> Are single-pole devices in the line
            conductor only, per Regulation 132.14, and are line, neutral and protective conductor
            correctly connected at every accessory? Reversed polarity is the fault that makes the
            metal case of an appliance live while the switch reads off.
          </li>
        </ul>
        <p>
          Earth electrode resistance under Regulation 643.7 applies to TT installations and to any
          installation with an earth electrode. Note where that sits: some measurement methods need
          the supply, which is exactly why the regulation numbering puts it on the far side of the
          gate. The three-terminal stake method is the most accurate and needs test stakes; the
          loop-impedance method uses the supply; the clamp method induces a current and needs no
          disconnection. Each has its own scope, and which one you can use affects when in the job
          the electrode can be verified.
        </p>
        <p>
          The words &ldquo;where relevant&rdquo; in Regulation 643.1 do some work here. Not every
          test applies to every circuit — ring final continuity has nothing to say about a radial,
          and electrode resistance has nothing to say about an installation with no electrode. What
          the phrase does not permit is dropping a test because it is inconvenient. If a test is
          relevant to the circuit in front of you, it is inside the gate.
        </p>
      </ConceptBlock>

      <InsulationResistanceTest />

      <InlineCheck
        id="317e-3-6-check-1"
        question="Regulation 643.1 places the tests of Regulations 643.2 to 643.6 at which point in the job?"
        options={[
          'Before the installation is energised, carried out in that order where relevant.',
          'After the installation is energised, so that each reading can be cross-checked against a live measurement taken at the same time.',
          'At any point during the job, since the regulation sets out which tests are needed but leaves the timing to the person verifying.',
          'Only after the certificate has been issued, as a confirmation exercise once the paperwork is complete.',
        ]}
        correctIndex={0}
        explanation="Regulation 643.1 requires the tests of Regulations 643.2 to 643.6, where relevant, to be carried out in that order before the installation is energised. Regulation 643.7 onwards covers the tests that need the supply connected. The word before is what makes energisation a gate rather than a step."
      />

      <SectionRule />

      <ContentEyebrow>Why these tests have to be done dead</ContentEyebrow>

      <ConceptBlock
        title="Each of them is either impossible or dangerous on a live circuit"
        plainEnglish="It is easy to read the pre-energisation block as a sequencing convention. It is not. Every test in the block either cannot physically be done on an energised circuit, or would put the person doing it and the equipment connected to it at risk."
        onSite="If somebody asks why you cannot just do it with the board on, the honest answer is the instrument. A continuity tester puts out a low voltage and expects to see the resistance of a conductor. Point it at 230 V and the reading is meaningless and the instrument is in trouble."
      >
        <p>Test by test:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Continuity.</strong> The instrument specified in Regulation 643.2.1 outputs at
            least 200 mA at a no-load voltage of 4 V to 24 V. It measures the resistance of a
            conductor by driving its own small current through it. A circuit that is still energised
            gives a reading that has nothing to do with conductor resistance — and the low test
            voltage is chosen precisely so that there is no risk if a circuit turns out to be
            unexpectedly live.
          </li>
          <li>
            <strong>Insulation resistance.</strong> The test applies a DC voltage between conductors
            and between conductors and earth — 500 V DC on most low-voltage circuits per Table 64.
            You cannot apply that to a circuit that already has the supply on it, and the reason
            connected equipment is disconnected or accounted for is that the test voltage is there
            to stress the insulation, not the electronics.
          </li>
          <li>
            <strong>Ring final continuity.</strong> The method depends on being able to separate and
            cross-connect the ends of each conductor at the board. That is dead work by definition.
          </li>
          <li>
            <strong>Polarity.</strong> This is the one that people are most tempted to check with
            the supply on, and it is the worst one to leave until then. The whole point of verifying
            polarity before energisation is that a polarity error discovered after the supply is
            restored has already had the chance to make an appliance case live.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 643.2.1 (continuity test instrument) and Table 64 (insulation resistance test voltages and minimum values)"
        clause="Regulation 643.2.1 requires the continuity test to be made using an instrument with a no-load output voltage between 4 V and 24 V and a short-circuit output current of not less than 200 mA. Table 64 gives the test voltage and minimum insulation resistance for each circuit category — 250 V DC and 0.5 MΩ for SELV and PELV, 500 V DC and 1 MΩ for circuits up to 500 V, and 1000 V DC for circuits above 500 V."
        meaning="The regulation does not only say which tests to carry out before energisation — it specifies the instrument that makes each of them valid. An instrument that cannot deliver 200 mA at low voltage is not carrying out the continuity test the regulation describes, and an insulation-resistance reading taken at the wrong voltage is not the reading Table 64 sets the limit for. Record the test voltage alongside the value."
        cite="Source: BS 7671:2018+A4:2026 Part 6, Chapter 64, Regulation 643.2.1 and Table 64."
      />

      <SectionRule />

      <ContentEyebrow>Safe isolation comes first</ContentEyebrow>

      <ConceptBlock
        title="The pre-energisation tests are only valid if the installation is verifiably dead"
        plainEnglish="Every test in the block rests on one assumption: the installation is dead. Safe isolation is what turns that assumption into evidence, and the prove-test-prove routine is what makes the evidence trustworthy."
        onSite="Carry a proving unit. A dedicated proving unit gives you a known live source that does not depend on any installation. Prove the indicator, test the point, prove the indicator again. Three steps, every single time, including after a break."
      >
        <p>The routine in full:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Identify.</strong> Confirm exactly what is being isolated. Check drawings,
            labels, follow cables. Multiple supplies are the common trap — standby supplies,
            generators, uninterruptible supplies, generation on the customer side and vehicle
            charging equipment can all back-feed a board the drawings show as singly supplied.
          </li>
          <li>
            <strong>Switch off.</strong> At the originating device — the main switch for the whole
            installation, or the circuit protective device for a single circuit. Confirm it has
            operated.
          </li>
          <li>
            <strong>Lock off and post a warning.</strong> Apply a lock-out device so the supply
            cannot be restored by anyone else, and post a notice reading WORK IN PROGRESS — DO NOT
            ENERGISE with your name, the date and a contact.
          </li>
          <li>
            <strong>Prove the indicator on a known live source.</strong> All probes, all phases.
            Confirms the indicator works.
          </li>
          <li>
            <strong>Test the isolated point.</strong> Confirm absence of voltage across every
            combination — line to neutral, line to earth, neutral to earth, and line to line on
            three-phase.
          </li>
          <li>
            <strong>Prove the indicator again.</strong> Same proving unit, same probes. If it now
            fails, the dead reading you took in between was never reliable — retest with a different
            indicator before touching anything.
          </li>
        </ul>
        <p>
          The lock and the notice are not optional extras on this list. The tests of Regulations
          643.2 to 643.6 take time, and during that time you are not stood at the board. Anything
          that can be switched back on by somebody else while you are at the far end of the circuit
          has not been isolated — it has only been switched off.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="HSE Guidance Note GS38 (Test Equipment for use by Electricians)"
        clause="Test leads should incorporate fused leads where appropriate, finger barriers, insulated probes with no more than 4 mm of exposed metal at the tip, and double insulation throughout. The voltage indicator should be proved before AND after the test on a known live source to confirm correct operation."
        meaning="GS38 is the recognised standard for the equipment you prove isolation with. Leads with excessive exposed metal, no finger barriers or no fusing carry a real risk of arc flash and shock. The proving routine before and after the test point confirms the indicator was operating at the moment it gave you a dead reading. Both of these belong to dead testing, because the whole pre-energisation block depends on the isolation being trustworthy."
        cite="Source: HSE Guidance Note GS38 (Test Equipment for use by Electricians, latest revision)."
      />

      <InlineCheck
        id="317e-3-6-check-2"
        question="Why does the voltage indicator have to be proved on a known live source AFTER the test point as well as before it?"
        options={[
          'To satisfy the calibration certificate, which requires a proving check at both ends of each working day.',
          'To discharge any stored charge left in the indicator by the test, which would otherwise give a false reading on the next circuit.',
          'Because it confirms the indicator was still working at the moment it reported the test point dead — without it, the dead reading is unverified.',
          'Because the indicator has to be proved on the same circuit it was used on, and the only way to do that is to prove it again afterwards.',
        ]}
        correctIndex={2}
        explanation="A voltage indicator can fail between the first prove and the test — a flat battery, a broken lead. Proving it on a known live source afterwards brackets the dead reading and confirms the instrument was operational when it gave it. If the second prove fails, the dead reading is worthless and the point has to be re-tested with a different indicator."
      />

      <SectionRule />

      <ContentEyebrow>Instruments that make the test count</ContentEyebrow>

      <ConceptBlock
        title="Calibrated, in date, and right for the test"
        plainEnglish="A reading is only verification if the instrument that produced it was fit for the job. Each of the pre-energisation tests has an instrument requirement attached to it, and the calibration status of that instrument is part of what makes the result stand up."
        onSite="Check the calibration date before you leave the yard, not when you are stood at the board. Most multifunction testers will let you store the instrument serial and print it onto the results — do it, because the instrument identity belongs with the readings."
      >
        <p>What each pre-energisation test needs:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Continuity.</strong> Output of at least 200 mA at 4 V to 24 V no-load per
            Regulation 643.2.1. Auto-zero for lead resistance. Enough resolution to read the small
            values a short protective conductor gives.
          </li>
          <li>
            <strong>Insulation resistance.</strong> The Table 64 voltages — 500 V DC for circuits up
            to 500 V, 250 V DC for SELV and PELV, 1000 V DC for circuits above 500 V. The minimum
            acceptable values are 1 MΩ on the 500 V test and 0.5 MΩ on the 250 V SELV test.
          </li>
          <li>
            <strong>Polarity.</strong> Verified dead by continuity — the resistance through a
            single-pole switch reads low with the switch closed and open with it off, which confirms
            the device is in the line conductor.
          </li>
          <li>
            <strong>Calibration.</strong> Every instrument used for verification should be
            calibrated — annually, or to the manufacturer recommendation — and traceable to a
            national standard. The calibration certificate belongs with the instrument, and the test
            record should reference the instrument used and its calibration status.
          </li>
        </ul>
        <p>
          An uncalibrated instrument does not produce a failed verification. It produces no
          verification at all, because there is nothing to support the number.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="317e-3-6-check-3"
        question="A pre-energisation insulation-resistance test on a 230 V circuit reads 0.3 MΩ against the Table 64 minimum of 1 MΩ. What happens next?"
        options={[
          'Record 0.3 MΩ as a pass with a note, since any reading above zero shows the insulation has not broken down completely.',
          'Repeat the test at 250 V instead of 500 V, which will give a higher reading and bring the circuit inside the 1 MΩ minimum.',
          'Energise the circuit and rely on the residual current device to clear any fault that develops in service.',
          'Investigate and isolate the affected circuit, find the fault, repair it and re-test. The circuit does not move to the next stage until the fault is resolved.',
        ]}
        correctIndex={3}
        explanation="A failed pre-energisation test is a finding to investigate, not an acceptable result. Below 1 MΩ on a 230 V circuit there is leakage somewhere — line to earth, line to neutral or neutral to earth. Narrow it down by disconnecting connected equipment and splitting the circuit, repair, then re-test. Regulation 643.7.2 also requires any earlier test the fault may have influenced to be repeated."
      />

      <SectionRule />

      <ConceptBlock
        title="The failures the gate is there to catch"
        plainEnglish="Skipping the pre-energisation block does not usually produce an immediate bang. It produces an installation that looks fine and carries a defect nobody has measured, which is a far worse outcome because it goes into service unchallenged."
        onSite="The realistic failure is not dramatic. It is a broken protective conductor on one circuit in a house, which nobody discovers for years, until the day a fault appears on an appliance and there is no path for the fault current to take."
      >
        <p>What each missing test leaves behind:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>No continuity test.</strong> A protective conductor that is open somewhere
            between the main earthing terminal and the accessory. Automatic disconnection cannot
            work on that circuit, and nothing about the installation in normal use will tell anyone.
          </li>
          <li>
            <strong>No ring final continuity test.</strong> A ring that is broken and running as two
            radials, with the protective device rated for a ring sitting in front of conductors that
            are now carrying the load alone.
          </li>
          <li>
            <strong>No insulation resistance test.</strong> A conductor nicked by a fixing screw, a
            damp joint or a faulty fixed appliance, energised into a fault instead of found at zero
            energy.
          </li>
          <li>
            <strong>No polarity test.</strong> A single-pole device in the neutral rather than the
            line conductor, so the apparent off position leaves the accessory live, or line and
            neutral crossed at an accessory so the case of connected equipment sits at line
            potential.
          </li>
        </ul>
        <p>
          There is also the working-practice dimension. The default position under the Electricity
          at Work Regulations, Regulation 14, is that work is carried out dead. Energising early
          removes the option of doing the remaining work dead, and every subsequent investigation
          becomes live work that has to be justified.
        </p>
        <p>
          And there is the record. If the supply went on before the tests were finished, the values
          on the schedule no longer describe the installation as it was at the moment of
          energisation. Anyone reading the certificate later — the next person to work on it, or
          the person carrying out the first periodic inspection — is relying on those readings as
          the baseline. A baseline taken out of order is not a baseline.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="More than one supply — the isolation that was never an isolation"
        plainEnglish="The pre-energisation tests assume the installation has one source of supply and that you have switched it off. On a modern installation that assumption fails often enough that identifying every source is part of the work, not a formality."
        onSite="The drawings lie more often than the cables do, especially on anything that has been altered since it was first installed. Walk the board. Look at what is connected to it and what could feed back into it before you accept that the main switch is the only thing you need to lock off."
      >
        <p>Where the second supply usually comes from:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Uninterruptible supplies.</strong> Fitted to protect a server or a till system
            and wired so that it back-feeds the board it is supposed to be fed from.
          </li>
          <li>
            <strong>Standby generation.</strong> Anything with an automatic changeover can bring a
            board back to life without anybody touching a switch.
          </li>
          <li>
            <strong>Generation on the customer side.</strong> Installed generation feeding into the
            installation rather than drawing from it.
          </li>
          <li>
            <strong>Vehicle charging equipment.</strong> Another connection point with its own
            supply arrangements to identify before you accept an isolation.
          </li>
          <li>
            <strong>Shared submains.</strong> On a divided building, a board can be fed from a
            neighbouring supply through an arrangement nobody documented.
          </li>
        </ul>
        <p>
          If an unexpected voltage turns up at a point you believed was isolated, that is the
          proving routine doing its job. Stop, re-isolate at the correct point, prove dead again,
          find the source, and record the near miss so the next person on that installation knows
          it is there.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Recording the evidence before the supply goes on"
        plainEnglish="The pre-energisation tests are only worth what you can show afterwards. Every reading has a cell on the Appendix 6 Schedule of Test Results, and the completed schedule is what supports the certificate at the end of the job."
        onSite="Fill the schedule as you go, circuit by circuit, not from memory at the van at the end of the day. Values written down an hour later are values somebody can argue with, and a blank cell on a schedule is indistinguishable from a test that was never carried out."
      >
        <p>The pre-energisation entries on the schedule:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Continuity.</strong> R1 plus R2, or R2 only, depending on the method used —
            recorded as the measured value, per circuit.
          </li>
          <li>
            <strong>Ring final continuity.</strong> The r1, rn and r2 values for each ring circuit.
          </li>
          <li>
            <strong>Insulation resistance.</strong> Per circuit, across each combination — line to
            line, line to neutral, line to earth, neutral to earth — with the Table 64 test voltage
            used recorded alongside.
          </li>
          <li>
            <strong>Polarity.</strong> Confirmation per circuit, with a note against any accessory
            that needed attention.
          </li>
          <li>
            <strong>Instrument identity.</strong> The instrument used and its calibration status,
            so the readings can be traced back to equipment that was fit to produce them.
          </li>
        </ul>
        <p>
          On initial verification this is every circuit and every test. The completed schedule is
          the evidence that the gate was passed rather than stepped over.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Energising to prove the lights work, then finishing the dead tests afterwards"
        whatHappens={
          <>
            The board is nearly finished and the customer asks to see the lights on. It goes live
            for two minutes, then off again, and the remaining continuity and polarity checks get
            done afterwards. Nothing appears to have gone wrong, so it becomes a habit. On the third
            job it does go wrong: one circuit had a crossed polarity at a ceiling rose, so for those
            two minutes the switched conductor was the neutral and the fitting was live at the lamp
            holder with the switch off. Somebody had been working on that fitting ten minutes
            earlier.
          </>
        }
        doInstead={
          <>
            Treat energisation as one event with a precondition. The precondition is that the tests
            of Regulations 643.2 to 643.6 are complete and satisfactory for every circuit that will
            be live. If a customer wants to see something working, tell them when the tests will be
            finished and show them then. A two-minute demonstration is not a reason to pass the
            gate early.
          </>
        }
      />

      <CommonMistake
        title="Treating a failed test as a single failed cell on the schedule"
        whatHappens={
          <>
            Insulation resistance fails on one circuit. The fault is found and repaired, the
            insulation-resistance test is repeated, it passes, and the schedule row is completed.
            The continuity reading taken earlier on the same circuit is left as it was. But the
            fault was a damaged cable that had also compromised the protective conductor, and the
            original continuity reading was taken through a parallel path that the repair has now
            removed. The recorded continuity value no longer describes the circuit that exists.
          </>
        }
        doInstead={
          <>
            Apply the closing paragraph of Regulation 643.7.2. Repeat the failed test and any
            preceding test whose result may have been influenced by the fault. In practice that
            usually means re-running the whole pre-energisation block on the affected circuit, which
            takes minutes and removes any argument about which readings still describe the
            installation.
          </>
        }
      />

      <Scenario
        title="Caernarfon — a rewired first floor and a board that will not be energised today"
        situation={
          <>
            You are second on a first-floor rewire in Caernarfon. Six circuits are terminated at a
            new board, the plasterer is due tomorrow, and the customer has asked whether the
            upstairs sockets can be left live overnight so they can run a dehumidifier. Visual
            inspection is done. You have continuity on five of the six circuits, insulation
            resistance on four, and nothing on polarity. The bathroom circuit gave a continuity
            reading noticeably higher than the calculated value and has not been investigated yet.
          </>
        }
        whatToDo={
          <>
            Say no to the overnight supply, and explain why in one sentence the customer can repeat:
            the tests that have to be finished before a circuit is energised are not finished. Then
            work the gate. Finish continuity on the sixth circuit. Investigate the high reading on
            the bathroom circuit — a value well above the calculated figure points at a termination,
            so work back through the accessible connections rather than guessing. Once the cause is
            found and corrected, re-test it, and repeat any earlier test on that circuit whose result
            the fault could have influenced, per the closing paragraph of Regulation 643.7.2.
            Complete insulation resistance on the remaining circuits at 500 V DC per Table 64, and
            record the test voltage next to each value. Complete polarity on all six. Only when every
            relevant test in Regulations 643.2 to 643.6 is recorded and satisfactory does the supply
            go on. Offer the customer a fixed time tomorrow morning instead, and leave the board
            locked off with the warning notice in place overnight.
          </>
        }
        whyItMatters={
          <>
            The bathroom circuit is the point. A high continuity reading that has not been chased is
            exactly the kind of defect the pre-energisation block exists to catch, and it is on a
            circuit in a location where a compromised protective conductor matters most. Energising
            for the sake of a dehumidifier would have put that circuit into service with a known,
            unexplained reading against it — and once a board has been live overnight, the pressure
            to leave it live only grows.
          </>
        }
      />

      <SectionRule />

      <FAQ items={faqs} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Regulation 643.1 requires the tests of Regulations 643.2 to 643.6, where relevant, to be carried out in that order before the installation is energised.',
          'Visual inspection under Regulation 642 precedes every test. Regulation 643.7 onwards covers the tests that need the supply connected.',
          'The pre-energisation block is continuity of protective conductors, continuity of ring final circuits, insulation resistance and polarity.',
          'Each of those tests either cannot be carried out on an energised circuit, or would put the person and the connected equipment at risk if it were.',
          'Safe isolation is the precondition for all of them: identify, switch off, lock off and post a notice, prove the indicator, test the point, prove the indicator again.',
          'GS38 leads — no more than 4 mm of exposed metal at the tip, finger barriers, fusing where appropriate, double insulation, CAT rating suited to the system.',
          'Instrument requirements are part of the regulation: at least 200 mA at 4 V to 24 V no-load for continuity under Regulation 643.2.1, and the Table 64 voltages and minima for insulation resistance.',
          'A failure before energisation stops the circuit. Under Regulation 643.7.2 the failed test and any preceding test the fault may have influenced are repeated after rectification.',
        ]}
      />

      <ContentEyebrow>Check yourself</ContentEyebrow>

      <Quiz questions={quizQuestions} title="Testing before energisation — knowledge check" />
    </div>
  );
}
