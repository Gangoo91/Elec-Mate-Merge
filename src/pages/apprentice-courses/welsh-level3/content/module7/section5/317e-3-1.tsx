/**
 * Unit 317E · Criterion 3.1 — The tests to be carried out on an electrical
 * installation in accordance with BS 7671 and IET Guidance Note 3
 *
 * Approach: the full test set, the order it is carried out in, and the
 * dependency that makes the order what it is. BS 7671 Part 6 supplies the
 * tests and the acceptance criteria; Guidance Note 3 supplies the methods,
 * the instrument standards and the way results are compared.
 *
 * Sources used (existing verified teaching):
 *   level3/module5/section3/Sub1.tsx — the dead-test sequence and instruments
 *   level3/module5/section1/Sub3.tsx — IET Guidance Note 3, what it adds
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
  VideoCard,
} from '@/components/study-centre/learning';
import { InsulationResistanceTest } from '@/components/study-centre/diagrams';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { videos } from '@/data/study-centre/video-library';

const quizQuestions = [
  {
    id: 1,
    question: 'What is the order of testing required by Reg 643.1?',
    options: [
      'Dead tests first — continuity of protective conductors, continuity of ring final conductors, insulation resistance, polarity, earth electrode resistance — carried out in that order before the installation is energised, then the live tests once the supply is connected.',
      'Live tests first, to establish the supply characteristics, followed by the dead tests carried out on the energised installation.',
      'Insulation resistance first, then continuity, then polarity, with the live tests interleaved as each circuit allows.',
      'Any order the inspector prefers, provided every test is carried out and every result recorded.',
    ],
    correctAnswer: 0,
    explanation:
      'The tests of Reg 643.2 to 643.6 are carried out in that order before the installation is energised. Reg 643.7 onwards covers the tests that by their nature need the supply connected. The order is mandated, not advisory, because each step is a precondition for the next.',
  },
  {
    id: 2,
    question: 'What test voltage and minimum value apply to insulation resistance on a low voltage circuit?',
    options: [
      '500 V DC with a minimum of 1 MΩ, with 250 V DC and a minimum of 0.5 MΩ used for SELV and PELV circuits.',
      '230 V AC with a minimum of 1 MΩ, applied between line and neutral only.',
      '1000 V DC with a minimum of 0.5 MΩ for every circuit regardless of nominal voltage.',
      '50 V DC with a minimum of 2 MΩ, to avoid damaging connected electronic equipment.',
    ],
    correctAnswer: 0,
    explanation:
      'Circuits up to 500 V are tested at 500 V DC with a minimum of 1 MΩ. SELV and PELV are tested at 250 V DC with a minimum of 0.5 MΩ. Circuits above 500 V are tested at 1000 V DC. The test stresses the insulation realistically rather than simply checking for a dead short.',
  },
  {
    id: 3,
    question: 'What output does a continuity instrument have to provide?',
    options: [
      'At least 200 mA test current at a no-load voltage between 4 V and 24 V.',
      'At least 25 mA test current at a no-load voltage of 50 V.',
      'At least 1 A test current at a no-load voltage of 230 V.',
      'Any output at all, since continuity is a pass or fail check rather than a measurement.',
    ],
    correctAnswer: 0,
    explanation:
      'The current matters because it is what reveals an intermittent or high-resistance contact that a low-current meter would read straight through. Modern multifunction testers comply by default. The leads are nulled before the readings are taken, and resolution needs to reach 0.01 Ω.',
  },
  {
    id: 4,
    question: 'How is a residual current device verified under the current amendment?',
    options: [
      'Operate the integral test button, then apply a single alternating-current test at the rated residual operating current. A general non-delay device must disconnect within 300 ms maximum.',
      'Apply tests at half, one and five times the rated residual operating current and compare each trip time against the time and current table.',
      'Measure the loop impedance at the device and calculate the expected trip time from it.',
      'Press the integral test button only, because the button exercises the same detection circuit as an applied test current.',
    ],
    correctAnswer: 0,
    explanation:
      'The multi-current sequence and the time and current performance table were deleted. A single alternating-current test at the rated residual operating current is now the verification method, with 300 ms maximum for a general non-delay device. The integral test button still confirms the mechanical and electronic operation.',
  },
  {
    id: 5,
    question:
      'A test part way through the sequence indicates a failure to comply. What does the regulation require?',
    options: [
      'That test, and any preceding test whose results may have been influenced by the fault, are repeated after the fault has been rectified.',
      'The failed test is repeated once the fault is rectified, and the earlier tests stand because they were carried out before the fault was known about.',
      'The whole verification is abandoned and restarted from the beginning with a new certificate.',
      'The failure is recorded on the certificate as a departure and the sequence continues unchanged.',
    ],
    correctAnswer: 0,
    explanation:
      'You cannot simply patch the fault and carry on. Rectify it, then repeat that test and every earlier test whose result the fault could have influenced. This protects against a set of results that were invalidated by a change made part way through.',
  },
  {
    id: 6,
    question:
      'Why is a multiplier applied when comparing a measured loop impedance against the tabulated maximum?',
    options: [
      'Because the tabulated maxima assume conductors at operating temperature while site measurements are taken at ambient, so the guidance applies a 0.8 multiplier to give a realistic ambient comparison limit — a 1.37 Ω tabulated figure becoming 1.10 Ω.',
      'Because test instruments read approximately 20 per cent high and the multiplier corrects the instrument error.',
      'Because the supply voltage varies through the day and the multiplier averages the variation.',
      'Because the multiplier converts a single-phase reading into its three-phase equivalent.',
    ],
    correctAnswer: 0,
    explanation:
      'Copper resistance rises with temperature, and the tabulated values are set for conductors at operating temperature so that automatic disconnection still works under fault. Verification happens on cold conductors, so the guidance applies the multiplier to the tabulated value before comparing.',
  },
  {
    id: 7,
    question:
      'Which instrument standard covers low-resistance ohmmeters used for continuity testing?',
    options: [
      'BS EN 61557-4.',
      'BS EN 61557-2.',
      'BS EN 61557-3.',
      'BS EN 61557-6.',
    ],
    correctAnswer: 0,
    explanation:
      'The 61557 series splits by instrument type: part 2 insulation resistance testers, part 3 loop impedance testers, part 4 low-resistance ohmmeters, part 5 earth electrode testers, part 6 residual current device testers, and part 10 multifunction instruments, each function of which must meet the corresponding individual part.',
  },
  {
    id: 8,
    question: 'Why is continuity of protective conductors the first test in the sequence?',
    options: [
      'Because a broken protective conductor falsifies every later result — without an intact earth path no fault current can flow and automatic disconnection cannot operate, so every test that follows assumes the path is good.',
      'Because it is the quickest test to carry out and gets the sequence moving.',
      'Because the instrument used for continuity has to be nulled before the other functions can be used.',
      'Because the protective conductor has to be disconnected before insulation resistance can be measured.',
    ],
    correctAnswer: 0,
    explanation:
      'A loop impedance reading taken on a circuit with a broken protective conductor either reads open circuit or, where a parallel earth path exists, gives a misleadingly low figure. Prove the protective path first and everything measured afterwards means something.',
  },
];

export default function Lesson317e_3_1() {
  return (
    <div className="space-y-8">
      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        There is one test set and one order, and neither is a matter of preference. BS 7671 Part 6
        sets out the tests and the acceptance criteria; Guidance Note 3 sets out the methods, the
        instruments and how results are compared. This lesson walks the whole sequence and explains
        why each step has to come where it does.
      </p>

      <TLDR
        points={[
          'Reg 643.1 mandates the order. The tests of Reg 643.2 to 643.6 are carried out in that order before the installation is energised, and the tests from Reg 643.7 onwards follow once the supply is connected.',
          'The dead tests are continuity of protective conductors, continuity of ring final conductors, insulation resistance, polarity, and earth electrode resistance where an electrode is present.',
          'The live tests are external loop impedance, prospective fault current, loop impedance at each relevant point, residual current device operation, arc fault detection device confirmation and functional testing.',
          'Every step is a precondition for the next. Continuity proves the protective path, insulation resistance proves there is no fault path, polarity proves the connections are the right way round, and only then is it safe to energise.',
          'Guidance Note 3 supplies what the standard does not — the methods, the instrument standards, and the multiplier used when comparing a cold measured value against a tabulated maximum.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'List in order the tests to be carried out on an electrical installation and identify which are dead tests and which require the supply connected.',
          'Explain the dependency between each test and the one before it, and what a result would mean if the order were not followed.',
          'State the instrument requirements for continuity and insulation resistance testing, including test currents, test voltages and minimum acceptable values, and identify the instrument standards referenced for each test type.',
          'Apply the guidance on comparing a measured loop impedance against a tabulated maximum, including the multiplier and the reason for it.',
          'Describe the correct response when a test indicates a failure part way through the sequence.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>Two documents, one test set</ContentEyebrow>

      <ConceptBlock
        title="The standard says what, the guidance says how"
        plainEnglish="BS 7671 specifies which tests are carried out and what result is acceptable. Guidance Note 3 explains how each test is actually performed, with what instrument, in what sequence, and what to do when a reading does not match expectation. They are written to be used together."
        onSite="Working from the standard alone is possible and unwise. Guidance Note 3 turns regulation language into procedure, and it is the document an assessor reaches for when they question your method."
      >
        <p>The relationship, using continuity as the example:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>The standard says.</strong> The continuity of conductors shall be verified by a
            measurement of resistance.
          </li>
          <li>
            <strong>The guidance explains.</strong> The combined line and protective conductor
            method, linking the two at the board and reading at the far end. The protective
            conductor only method, using a long lead from the main earthing terminal. The
            three-part ring final method. How to null the leads. What reading to expect for a given
            conductor size and route length. What to do when the reading does not match.
          </li>
        </ul>
        <p>
          Guidance Note 3 is non-statutory. It does not invent requirements — those come from the
          standard — but it is widely accepted as the standard of practice, meaning what a
          competent person should know and apply. Using its methods and its acceptance criteria is
          the safe route to demonstrating compliance.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>The mandated order</ContentEyebrow>

      <ConceptBlock
        title="Dead tests, then energise, then live tests"
        plainEnglish="The sequence is not a suggestion. The dead tests run in the stated order before the installation is energised, and the live tests follow once it is safe to connect the supply. Run them out of order and you get results that are either misleading or unsafe to have obtained."
        onSite="If you catch yourself wanting a loop impedance reading before continuity has been verified, stop. The loop reading depends on the protective conductor being intact. Sequence first, readings second."
      >
        <p>The full order, start to finish:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Continuity of protective conductors.</strong> Including main and supplementary
            bonding.
          </li>
          <li>
            <strong>Continuity of ring final circuit conductors.</strong> Where a ring final is
            installed.
          </li>
          <li>
            <strong>Insulation resistance.</strong> Between live conductors and between live
            conductors and earth.
          </li>
          <li>
            <strong>Polarity, dead.</strong> Confirming single-pole devices sit in the line
            conductor and that every termination is the right way round.
          </li>
          <li>
            <strong>Earth electrode resistance.</strong> Where the installation has an electrode.
          </li>
          <li>
            <strong>First energisation.</strong> Only once every dead test has passed.
          </li>
          <li>
            <strong>External earth fault loop impedance and prospective fault current.</strong> At
            the origin.
          </li>
          <li>
            <strong>Earth fault loop impedance at each relevant point.</strong> Circuit ends, last
            sockets, isolators.
          </li>
          <li>
            <strong>Residual current device operation.</strong> Integral test button, then the
            applied test current.
          </li>
          <li>
            <strong>Arc fault detection device confirmation and functional testing.</strong>
            Switchgear, controls, interlocks and surge protective device status.
          </li>
        </ul>
      </ConceptBlock>

      <VideoCard {...videos.sequenceOfTests} />

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 643.1 (sequence of tests) and Regulation 643.7.2 (closing paragraph)"
        clause="Regulation 643.1: The tests of Regulations 643.2 to 643.6, where relevant, shall be carried out in that order before the installation is energised. Regulation 643.7 onwards covers tests that by their nature require the supply to be connected. Per Regulation 643.7.2 (closing paragraph): if any test indicates a failure to comply, that test and any preceding test, the results of which may have been influenced by the fault indicated, shall be repeated after the fault has been rectified."
        meaning="Two requirements in one place. The order is mandated rather than recommended, and the recovery from a failure is mandated too. Rectifying a fault and carrying on from where you stopped is not compliant — you repeat the failed test and every earlier test whose result that fault could have influenced."
        cite="Source: BS 7671:2018+A4:2026 Part 6, Chapter 64, Regulations 643.1 and 643.7.2."
      />

      <SectionRule />

      <ContentEyebrow>The dead tests and what each one proves</ContentEyebrow>

      <ConceptBlock
        title="Five tests, five different questions about the same installation"
        plainEnglish="Each dead test asks something the others cannot. Continuity asks whether the earth path exists. Insulation resistance asks whether there is an unintended path between conductors. Polarity asks whether the connections are the right way round. Electrode resistance asks whether the earthing means works."
        onSite="Every one of these happens with the supply isolated and proven dead. The order they appear in below is the order they are carried out in."
      >
        <p>The dead tests in sequence:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Continuity of protective conductors.</strong> Verifies the protective conductor
            is electrically continuous from the main earthing terminal to every accessory and
            exposed-conductive-part. Either the combined line and protective conductor method or
            the protective conductor only method with a wander lead. The reading is compared
            against the expected resistance for the conductor size, route and length.
          </li>
          <li>
            <strong>Continuity of ring final circuit conductors.</strong> Verifies that a ring is
            actually a ring rather than a damaged ring or two radials. End to end on the line, the
            neutral and the protective conductor, then the cross-connected readings at every
            outlet.
          </li>
          <li>
            <strong>Insulation resistance.</strong> Verifies the insulation between live conductors
            and between live conductors and earth. Catches damaged insulation, a conductor nicked
            by a screw, and faulty fixed appliances left connected.
          </li>
          <li>
            <strong>Polarity.</strong> Verifies single-pole devices are in the line conductor only
            and that line, neutral and protective conductor are correctly connected at every
            accessory. Bad polarity leaves equipment live when the switch says off.
          </li>
          <li>
            <strong>Earth electrode resistance.</strong> Where an electrode is present, verifies it
            is making good contact with the soil mass. Three-terminal stake method, loop impedance
            method, or a clamp method, each with its own scope and limitations.
          </li>
        </ul>
      </ConceptBlock>

      <InsulationResistanceTest caption="Insulation resistance is measured with the circuit isolated, between the live conductors and between the live conductors and earth. The test voltage is applied deliberately to stress the insulation rather than simply to look for a dead short." />

      <InlineCheck
        id="317e-3-1-check-1"
        question="You are about to test insulation resistance on a lighting circuit that still has dimmer modules and electronic drivers connected. What is the concern?"
        options={[
          'Connected equipment forms part of what the test sees, so a low reading may be coming from the equipment rather than the cabling — the equipment is disconnected or the result is investigated before the reading is accepted.',
          'The test cannot be carried out at all while any accessory remains in place on the circuit.',
          'The test voltage is reduced to 250 V DC because the circuit supplies electronic equipment.',
          'The reading will always be higher than the true value, so the result can be accepted as a pass.',
        ]}
        correctIndex={0}
        explanation="Insulation resistance measures everything connected across it. A low reading is information, not automatically a cable fault. The recovery is to disconnect connected items one at a time and retest after each, which is the standard route to finding whether the fault is in the equipment or the wiring."
      />

      <SectionRule />

      <ContentEyebrow>Energise, then the live tests</ContentEyebrow>

      <ConceptBlock
        title="What the live tests establish"
        plainEnglish="Once the dead tests are clean the installation is energised and the live tests follow. These measure the things that only exist when the supply is connected — the actual fault loop, the fault current available, and whether the protective devices operate as they should."
        onSite="Live testing has a different risk profile because the kit is energised. Use an instrument rated for the prospective fault current, stand to the side rather than in front of the board, and warn the customer before you trip a residual current device."
      >
        <p>The live tests in order:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>External earth fault loop impedance at the origin.</strong> The contribution
            from the supply side, before the installation adds anything.
          </li>
          <li>
            <strong>Prospective fault current at the origin.</strong> Frequently read from the same
            instrument as the loop impedance, and used to confirm the protective devices have
            adequate breaking capacity.
          </li>
          <li>
            <strong>Earth fault loop impedance at each relevant point.</strong> Circuit ends, last
            sockets and isolators. This is the measurement compared against the tabulated maximum.
          </li>
          <li>
            <strong>Residual current device operation.</strong> The integral test button first,
            then a single alternating-current test at the rated residual operating current.
          </li>
          <li>
            <strong>Arc fault detection device confirmation.</strong> Where fitted, operated and
            confirmed.
          </li>
          <li>
            <strong>Functional testing.</strong> Switchgear, controls, interlocks, emergency
            switching and surge protective device status indication.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 643.8 (verification of residual current device effectiveness)"
        clause="Where RCDs are required for additional protection, the effectiveness of automatic disconnection by the RCD shall be verified using suitable test equipment to BS EN 61557-6. Per the NOTE: regardless of RCD Type, effectiveness is deemed verified where the RCD disconnects within 300 ms maximum (general non-delay type) with an alternating-current test at rated residual operating current. Appendix 3 Table 3A (Time/current performance criteria for RCDs) has been deleted."
        meaning="The old multi-current sequence has gone along with the time and current table. A single alternating-current test at the rated residual operating current is now the verification method for every device type, with 300 ms maximum for a general non-delay device. Test schedules and crib sheets written to the older method need updating."
        cite="Source: BS 7671:2018+A4:2026 Regulation 643.8, and the deletion of Appendix 3 Table 3A."
      />

      <ConceptBlock
        title="Why the order is what it is"
        plainEnglish="Every test in the sequence rests on the one before it. Break the order and you are not simply doing the same work in a different arrangement — you are producing results that do not mean what they appear to mean."
        onSite="This is the part that gets challenged at assessment. Be able to say, for each test, what would be wrong with the result if the previous test had not been done."
      >
        <p>The dependencies, step by step:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Continuity first.</strong> A broken protective conductor falsifies everything
            downstream. Without an intact earth path no fault current can flow and automatic
            disconnection cannot operate.
          </li>
          <li>
            <strong>Insulation resistance second.</strong> A conductor with degraded insulation is
            found before anything is energised into it, rather than afterwards.
          </li>
          <li>
            <strong>Polarity third.</strong> Reversed polarity passes both continuity and
            insulation resistance quite happily, and then delivers a live neutral. Only a polarity
            check finds it.
          </li>
          <li>
            <strong>Electrode resistance fourth.</strong> The electrode is measured against an
            installation earthing system already known to be sound.
          </li>
          <li>
            <strong>Live tests last.</strong> Energising is the point of no return, and it is only
            safe once the four dead stages have passed.
          </li>
        </ul>
        <p>
          Fast and loose testing is one of the leading causes of a certificate being rejected. The
          person reading your results afterwards can see from the figures whether the sequence was
          followed, and a set of results that could not have been obtained in the stated order
          tells them everything they need to know about the rest of the job.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="317e-3-1-check-2"
        question="An installation has an earth electrode. When is the electrode resistance measured?"
        options={[
          'First, before continuity, because the electrode is the origin of the earthing system.',
          'After the installation has been energised, alongside the loop impedance readings at the origin.',
          'As a dead test after continuity, insulation resistance and polarity, so that the electrode is measured against an installation earthing system already proven sound.',
          'Only where the network operator declines to declare an external loop impedance figure.',
        ]}
        correctIndex={2}
        explanation="The electrode sits at the end of the dead sequence. Measuring it against an earthing system whose continuity has not yet been proven would tell you very little, because you would not know whether a poor result belonged to the electrode or to the conductors connecting it."
      />

      <SectionRule />

      <ContentEyebrow>Instruments, evidence and comparison</ContentEyebrow>

      <ConceptBlock
        title="The kit each test demands"
        plainEnglish="Each test specifies an instrument capability. Continuity needs real current to reveal an intermittent contact. Insulation resistance needs the right test voltage to stress the insulation realistically. Calibration is what turns a reading into evidence."
        onSite="Check the calibration date before the job, not after it. Record the instrument and its calibration status with the results — most modern testers will store and print it for you."
      >
        <p>Requirements by test:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Continuity.</strong> Output current at least 200 mA at a no-load voltage of 4 V
            to 24 V. Leads nulled before the readings. Resolution to 0.01 Ω.
          </li>
          <li>
            <strong>Insulation resistance.</strong> 500 V DC for circuits up to 500 V, with a
            minimum acceptable value of 1 MΩ. 250 V DC for SELV and PELV, with a minimum of 0.5 MΩ.
            1000 V DC for circuits above 500 V.
          </li>
          <li>
            <strong>Polarity.</strong> Continuity test or the polarity indication on a
            multifunction instrument. Dead polarity is verified by checking that the line passes
            through any single-pole device — low resistance with the switch closed, open with it
            off.
          </li>
          <li>
            <strong>Earth electrode resistance.</strong> Three-terminal stake method for the most
            accurate result, a loop impedance method, or a clamp method where nothing can be
            disconnected. Each has its own scope.
          </li>
          <li>
            <strong>Residual current device.</strong> An instrument to the relevant standard, used
            for the single applied test at the rated residual operating current.
          </li>
        </ul>
        <p>
          The instrument standards are split by type. The general requirements sit in the first part
          of the series, insulation resistance testers in part 2, loop impedance testers in part 3,
          low-resistance ohmmeters in part 4, earth electrode testers in part 5, residual current
          device testers in part 6, and multifunction instruments in part 10, each function of which
          must meet its corresponding individual part. Calibration is typically annual and traceable
          to a national standard, and the certificate accompanies the instrument.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="HSE Guidance Note GS38 (Test Equipment for use by Electricians)"
        clause="Test leads should incorporate fused leads where appropriate, finger barriers, insulated probes with no more than 4 mm of exposed metal at the tip, and double insulation throughout. The voltage indicator should be proved before AND after the test on a known live source to confirm correct operation."
        meaning="This is the recognised standard for safe test equipment use, and it applies to dead testing as much as to live testing, because safe isolation depends on the prove-test-prove ritual being trustworthy. Leads with too much exposed metal, no finger barriers or no fuses risk arc flash and shock. Proving the indicator afterwards is what makes the dead reading evidence rather than an assumption."
        cite="Source: HSE Guidance Note GS38, Test Equipment for use by Electricians, latest revision."
      />

      <ConceptBlock
        title="Comparing a cold measurement against a hot maximum"
        plainEnglish="The tabulated maximum loop impedance values assume conductors at operating temperature, because that is the condition under which automatic disconnection has to work. Site testing happens on cold conductors, which read lower. The guidance closes that gap with a multiplier."
        onSite="Apply the 0.8 multiplier to the tabulated value before you compare. A tabulated 1.37 Ω becomes 1.10 Ω as the realistic ambient target. A reading of 1.05 Ω is a pass; 1.20 Ω is not, even though it sits below the raw tabulated figure."
      >
        <p>Why the multiplier exists:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Conductor resistance rises with temperature.</strong> A conductor at operating
            temperature has roughly 20 per cent higher resistance than the same conductor at
            ambient.
          </li>
          <li>
            <strong>The table is set at operating temperature.</strong> The maximum values are
            written so that disconnection still works under fault, when conductors heat rapidly.
          </li>
          <li>
            <strong>Verification happens cold.</strong> Testing takes place before circuits are
            loaded, so the conductors are at ambient.
          </li>
          <li>
            <strong>The multiplier compensates.</strong> Applied to the tabulated value, it gives
            the ambient-temperature acceptance limit. A more precise temperature correction can be
            calculated where ambient differs significantly, but the multiplier is the practical
            route.
          </li>
        </ul>
        <p>
          This is exactly the situation where a reading that looks like a marginal pass turns out
          to be a fail. A measurement of 4.42 Ω against a tabulated maximum of 4.37 Ω is over the
          raw figure before the multiplier is even applied — and once it is applied, the gap is far
          wider than it first appeared.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="317e-3-1-check-3"
        question="You measure a loop impedance of 1.20 Ω at the far end of a circuit whose tabulated maximum is 1.37 Ω. What is the position?"
        options={[
          'A pass, because the measured value is below the tabulated maximum.',
          'A fail — the tabulated value assumes conductors at operating temperature, so the 0.8 multiplier gives an ambient acceptance limit of 1.10 Ω and 1.20 Ω is above it.',
          'Inconclusive, because loop impedance cannot be compared against a tabulated value at all.',
          'A pass, provided the circuit also has residual current protection fitted.',
        ]}
        correctIndex={1}
        explanation="This is precisely the case the multiplier exists to catch. The circuit would be marginal or non-compliant once the conductors reached operating temperature, which is the condition under which disconnection actually has to work. Comparing against the raw tabulated figure would have passed an installation that should not pass."
      />

      <SectionRule />

      <ConceptBlock
        title="Every reading has a column"
        plainEnglish="The test sequence produces a set of numbers, and every one of them has a home on the schedule of test results. A reading taken and not recorded is a test that, as far as anybody reading the paperwork is concerned, never happened."
        onSite="Capture the readings as you take them, either on a tablet fed by the instrument or on a paper schedule transcribed the same day. Per circuit, per test, per reading. Even where software builds the schedule for you, review it before you sign it."
      >
        <p>What the results schedule needs for each circuit:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Circuit reference.</strong> Matching the inspection schedule and the board
            labelling, so the three documents agree with each other.
          </li>
          <li>
            <strong>Continuity.</strong> The measured resistance, and for a ring final the three
            readings from the end-to-end and cross-connected method.
          </li>
          <li>
            <strong>Insulation resistance.</strong> The readings between live conductors and
            between live conductors and earth, with the test voltage used stated.
          </li>
          <li>
            <strong>Polarity.</strong> Pass or fail per circuit, with any accessory-specific note.
          </li>
          <li>
            <strong>Loop impedance.</strong> At the origin and at the furthest point, ready to be
            compared against the tabulated maximum with the multiplier applied.
          </li>
          <li>
            <strong>Residual current device operation.</strong> The measured trip time and the
            rated residual operating current used.
          </li>
        </ul>
        <p>
          Gaps in the schedule make the certificate incomplete, and the person who signs it is
          exposed if a missing entry later turns out to have concealed a defect. The schedule is
          the evidence; the certificate is the summary that points at it.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Taking a reading from an instrument that is not calibrated"
        whatHappens={
          <>
            An old meter that has been knocked around the van for years reads 0.5 Ω on a continuity
            test. It looks fine and the item gets ticked. The instrument has drifted and the true
            value is several times higher, which would have been a finding for that circuit length.
            The defect sits in the record undetected, and the verification work is now the thing
            that concealed it.
          </>
        }
        doInstead={
          <>
            Use only calibrated instruments for verification. Check the calibration date before the
            job starts. Record the instrument identity and its calibration status with the results,
            which most multifunction testers will do for you. Annual calibration traceable to a
            national standard is the normal expectation, and a lapsed certificate is a finding at
            assessment.
          </>
        }
      />

      <CommonMistake
        title="Patching a fault and carrying on from where you stopped"
        whatHappens={
          <>
            A high resistance shows up on one circuit part way through the sequence. The
            termination is remade, the failed test is repeated, and the sequence carries on from
            that point. Nobody goes back to the earlier tests whose results that same loose
            termination could have influenced, so part of the record now describes an installation
            that no longer exists in that condition.
          </>
        }
        doInstead={
          <>
            Rectify the fault, then repeat the failed test and every preceding test whose result
            the fault could have affected. Record the original failure, the investigation, the
            corrective action and the retest reading. A record that shows a fault found and fixed
            is far stronger than one that quietly hides it.
          </>
        }
      />

      <Scenario
        title="Unit rewire in Merthyr Tydfil with the programme running late"
        situation={
          <>
            You are finishing a small industrial unit rewire on an estate in Merthyr Tydfil. The
            client wants power on by four o clock so a delivery of chilled stock can go into the
            new cold room. You have completed continuity on every circuit but not insulation
            resistance or polarity. The site manager suggests energising now and picking up the
            remaining tests afterwards with the supply on.
          </>
        }
        whatToDo={
          <>
            Say no, and say why in terms the manager can act on. The tests up to and including
            polarity are carried out in order before the installation is energised, and that
            ordering is a requirement rather than a preference. Energising before insulation
            resistance means energising into any insulation fault that exists, and energising
            before polarity means any reversed connection is live before anybody has looked for it.
            Offer a workable alternative instead — complete insulation resistance and polarity on
            the cold room supply and the circuits feeding it first, energise that section once its
            dead sequence is clean, and continue the remaining circuits afterwards. Record clearly
            which circuits were energised when, and finish the live tests on everything before the
            certificate is issued.
          </>
        }
        whyItMatters={
          <>
            The commercial pressure to energise early is the single most common reason the sequence
            gets broken, and it is the situation the ordering was written for. Sequencing the work
            so that a section can be completed properly and energised on its own keeps both the
            programme and the verification intact. Energising the whole unit on a promise to test
            later leaves you certifying an installation that was put into service before it was
            verified.
          </>
        }
      />

      <SectionRule />

      <FAQ
        items={[
          {
            question: 'Can I change the order if it suits the way the job is running?',
            answer:
              'No. The dead tests are carried out in the stated order before energisation, and the live tests follow. The dependency is built in — each test rests on the one before it. Where the programme makes the full sequence awkward, the answer is to sequence the work by section so that each section gets a complete sequence, not to reorder the tests.',
          },
          {
            question: 'Do I have to disconnect equipment before an insulation resistance test?',
            answer:
              'Connected equipment forms part of what the test measures, so a low reading may be coming from the equipment rather than the wiring. The standard recovery for a low reading between live conductors and earth is to disconnect connected items one at a time and retest after each, which tells you whether the fault is in an appliance or in the installation.',
          },
          {
            question: 'What do I do if I have to break off part way through a test sequence?',
            answer:
              'Re-prove isolation when you come back. Proven dead an hour ago does not mean dead now — somebody may have reset a breaker, a generator may have started, an uninterruptible supply may have engaged. Treat every restart as a fresh isolation: identify, lock off, prove dead with a proven indicator.',
          },
          {
            question: 'Why does the residual current device test look so much simpler than it used to?',
            answer:
              'Because the multi-current sequence and the time and current performance table were deleted. Verification is now the integral test button plus a single alternating-current test at the rated residual operating current, with 300 ms maximum for a general non-delay device. Older instruments still work — you simply use the single-test function and record the trip time.',
          },
        ]}
      />

      <SectionRule />

      <KeyTakeaways
        points={[
          'BS 7671 Part 6 specifies the tests and the acceptance criteria; Guidance Note 3 supplies the methods, the instrument standards and the way results are compared. They are used together.',
          'Reg 643.1 mandates the order: the tests of Reg 643.2 to 643.6 in that order before energisation, then the tests from Reg 643.7 onwards with the supply connected.',
          'The dead tests are continuity of protective conductors, continuity of ring final conductors, insulation resistance, polarity, and earth electrode resistance where an electrode exists.',
          'The live tests are external loop impedance and prospective fault current at the origin, loop impedance at each relevant point, residual current device operation, arc fault detection device confirmation and functional testing.',
          'Continuity comes first because a broken protective conductor falsifies every later result; polarity comes after insulation resistance because a reversal passes both earlier tests and still leaves a live neutral.',
          'Continuity instruments output at least 200 mA at 4 V to 24 V no load. Insulation resistance is 500 V DC with a 1 MΩ minimum for circuits up to 500 V, 250 V DC with a 0.5 MΩ minimum for SELV and PELV, and 1000 V DC above 500 V.',
          'Residual current device verification is the integral test button plus a single alternating-current test at the rated residual operating current, with 300 ms maximum for a general non-delay device.',
          'Apply the 0.8 multiplier to a tabulated maximum loop impedance before comparing it against a cold site measurement — a 1.37 Ω tabulated figure becomes a 1.10 Ω ambient limit.',
        ]}
      />

      <ContentEyebrow>Check yourself</ContentEyebrow>

      <Quiz
        questions={quizQuestions}
        title="The test sequence — knowledge check"
      />
    </div>
  );
}
