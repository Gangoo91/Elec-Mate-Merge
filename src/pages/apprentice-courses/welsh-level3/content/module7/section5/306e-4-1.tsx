/**
 * Unit 306E · Understand the Principles of Inspection, Testing and Commissioning
 * Learning outcome: Understand the methods and processes to carry out correctly
 * the tests that ensure safe and efficient operation of the electrical installation
 * Criterion 4.1 — How to carry out de-energised tests on standard single-phase circuits
 *
 * Pitched at Level 3, so the page teaches the Regulation 643.1 sequence and then
 * spends most of its length on why that order exists and what each reading is
 * telling you. Obtaining a number is Level 2; deciding what the number means, and
 * what to do when it is wrong, is the Level 3 half of the criterion.
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
import { videos } from '@/data/study-centre/video-library';
import {
  EarthingSystemDiagram,
  InsulationResistanceTest,
} from '@/components/study-centre/diagrams';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';

const quizQuestions = [
  {
    id: 1,
    question: 'Which tests does Regulation 643.1 require to be carried out in order, before the installation is energised?',
    options: [
      'The tests of Regulations 643.2 to 643.6',
      'Every test in Regulations 643.2 to 643.11',
      'Only the continuity tests',
      'Whichever tests the instrument on the van can perform',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 643.1 makes two separate statements. The tests of Regulations 643.2 to 643.11 shall be carried out and the results compared with relevant criteria. Separately, the tests of Regulations 643.2 to 643.6 shall be carried out in that order before the installation is energised — those are the dead tests. Where the installation incorporates an earth electrode, the test of Regulation 643.7 shall also be made.',
  },
  {
    id: 2,
    question: 'Why is continuity tested before insulation resistance?',
    options: [
      'Because insulation resistance pushes 500 V DC into the circuit, and without a proven CPC the test current can take an unintended path',
      'Because continuity warms the conductors and gives a more stable insulation reading',
      'Because insulation resistance can only be measured once the circuit is energised',
      'Because the order is a preference and continuity is simply quicker',
    ],
    correctAnswer: 0,
    explanation:
      'The insulation resistance result only means something if the earth reference is solid. If the CPC is broken somewhere along the circuit, the test current finds another route and the reading no longer represents the insulation between live conductors and earth. Continuity establishes the reference; insulation resistance then measures against it.',
  },
  {
    id: 3,
    question:
      'The correct insulation resistance test voltage for a 230 V circuit with no SELV or PELV equipment connected is:',
    options: ['500 V DC', '250 V DC', '230 V AC', '1000 V DC'],
    correctAnswer: 0,
    explanation:
      '500 V DC covers circuits up to 500 V, which takes in normal 230 V and 400 V low-voltage work. 250 V DC is used for SELV, PELV and safety circuits where the higher voltage would damage equipment. 1000 V DC is for circuits above 500 V.',
  },
  {
    id: 4,
    question: 'What does the R1 + R2 measurement give you?',
    options: [
      'Continuity of the line conductor and the circuit protective conductor combined, which is added to Ze to predict Zs',
      'The insulation resistance between line and CPC, expressed in megohms',
      'End-to-end continuity of the neutral on a ring final circuit only',
      'The earth fault loop impedance measured live at the origin',
    ],
    correctAnswer: 0,
    explanation:
      'R1 + R2 is the line-plus-CPC continuity reading, taken at the board with line and CPC linked at the far end of the circuit. Added to Ze it predicts Zs without energising anything, which is how the design gets verified before the supply goes on.',
  },
  {
    id: 5,
    question: 'For a ring final circuit, the continuity test verifies:',
    options: [
      'End-to-end continuity of line, neutral and CPC separately, plus a cross-connection reading at every socket that should be roughly equal',
      'Only end-to-end continuity of the CPC, since line and neutral are covered by the polarity test',
      'The insulation resistance between the two legs of the ring',
      'The loop impedance at the midpoint socket, which should be half the value at the board',
    ],
    correctAnswer: 0,
    explanation:
      'Two parts. End-to-end on each of line, neutral and CPC at the board confirms the ring is unbroken. Cross-connecting line to line and CPC to CPC then reading at every socket confirms it is wired as a true ring rather than two long radials bridged at the board.',
  },
  {
    id: 6,
    question: 'The polarity test verifies which of these?',
    options: [
      'That every fuse and single-pole device is in the line conductor, that lampholder outer contacts are on the neutral, and that wiring is correctly connected throughout',
      'That insulation resistance exceeds 1 MΩ at every accessory',
      'That the loop impedance at each accessory is within the table limit for the protective device',
      'That the CPC is continuous from the board to every accessory',
    ],
    correctAnswer: 0,
    explanation:
      'Polarity is about conductors landing in the right terminals. Reversed polarity at a switch leaves the lamp permanently live; reversed polarity at a socket puts line on the pin where neutral should be. It is confirmed by continuity from the board out to the line terminal of every accessory.',
  },
  {
    id: 7,
    question:
      'An insulation resistance test on a 230 V circuit reads 0.5 MΩ. What is the correct action?',
    options: [
      'Stop, do not energise, and investigate — the minimum for a low-voltage circuit is 1 MΩ',
      'Record it and energise, since the reading is above zero',
      'Repeat the test at 250 V DC and record whichever result is higher',
      'Record it as a departure and continue with the remaining tests',
    ],
    correctAnswer: 0,
    explanation:
      'Below the Table 64 minimum of 1 MΩ there is a fault in the circuit — damaged cable, a wet termination, a faulty accessory, or equipment left connected. Disconnect each element in turn and re-test to localise it, fix it, then re-test. Both the failing reading and the corrected reading get recorded.',
  },
  {
    id: 8,
    question:
      'A circuit fails the insulation resistance test because of a pinched cable at a back box. After repairing it, what does Regulation 643.7.2 require?',
    options: [
      'Repeat that test and any preceding test whose result may have been influenced by the same fault',
      'Repeat only the insulation resistance test, since the fault was an insulation fault',
      'Repeat the whole dead-test sequence on every circuit on the board',
      'Record the original reading with a note that it was repaired, with no re-test needed',
    ],
    correctAnswer: 0,
    explanation:
      'Where a test indicates a failure to comply, that test and any preceding test whose result may have been influenced are repeated after the fault has been rectified. A pinched cable at a metal box can affect the continuity reading as well as the insulation reading, so both are repeated and both sets of figures recorded.',
  },
];

export default function Lesson306e_4_1() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'Regulation 643.1 fixes the order: continuity of protective conductors, ring final continuity, insulation resistance, polarity, then earth electrode resistance where there is an electrode. All of it before energisation.',
          'The order is a dependency chain, not a preference. Each test is only meaningful because the one before it has confirmed something.',
          'Insulation resistance on low-voltage circuits is 500 V DC with a minimum of 1 MΩ; SELV and PELV circuits are tested at 250 V DC.',
          'At Level 3 the work is in the interpretation. A reading that passes but sits an order of magnitude away from its neighbours is telling you something, and it gets investigated before it gets recorded.',
          'When a test fails, fix the fault and repeat that test plus any earlier test the same fault could have distorted.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'State the de-energised test sequence for a standard single-phase circuit in the order Regulation 643.1 requires, and explain the dependency that fixes each position in that order.',
          'Carry out continuity of protective conductors by the R1 + R2 and long-lead methods, including nulling the instrument leads before any reading is taken.',
          'Carry out the three-part ring final continuity test and interpret r1, rn and r2 against each other to identify a ring that is not a true ring.',
          'Select the correct insulation resistance test voltage, decide what has to be disconnected first, and judge a reading against the minimum value rather than simply recording it.',
          'Decide what to do when a test fails, including which earlier tests have to be repeated once the fault has been rectified.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>Before any lead touches a conductor</ContentEyebrow>

      <ConceptBlock
        title="What has to be true before you start"
        plainEnglish="Dead testing means dead. Verified safe isolation, a calibrated instrument, nulled leads, a briefed customer, and sensitive equipment dealt with."
        onSite="Five minutes of preparation at the start saves an hour of confused fault-finding later. Do it in the same order every time until it is habit."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Safe isolation verified.</strong> Locked off at the upstream device, proved dead
            at the point of work, indicator re-proved, key in your pocket. A multifunction tester is
            not a proving device and never declares an installation dead.
          </li>
          <li>
            <strong>Instrument in calibration.</strong> Check the sticker before you start. Out of
            calibration means the readings will not be accepted.
          </li>
          <li>
            <strong>Leads inspected and nulled.</strong> Look for cracked insulation and broken
            probe tips, then short the leads on the continuity range and null the instrument so lead
            resistance is subtracted. Re-null if you change or extend a lead.
          </li>
          <li>
            <strong>Customer briefed, sensitive equipment dealt with.</strong> Say how long the
            supply will be off, and get anything with electronics in it disconnected or shorted out
            before the insulation test rather than halfway through it.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 643.1 (Testing — General)"
        clause="The tests of Regulations 643.2 to 643.11, where relevant, shall be carried out and the results compared with relevant criteria. Measuring instruments and monitoring equipment and methods shall be chosen in accordance with the relevant parts of BS EN 61557. If other measuring equipment is used, it shall provide no lesser degree of performance and safety. The tests of Regulations 643.2 to 643.11, where relevant, shall be carried out in that order before the installation is energized. Where the installation incorporates an earth electrode, the test of Regulation 643.7 shall also be made."
        meaning="Read the two statements separately, because they do different jobs. The first sets the whole test set — Regulations 643.2 to 643.11 — and requires the results to be compared with relevant criteria. The second fixes the dead-test gate: Regulations 643.2 to 643.6 are carried out in that order before the installation is energised, with Regulation 643.7 added where there is an earth electrode. The tests above 643.6 are the live ones and come after energisation. It also fixes the instrument: measuring equipment is chosen in accordance with BS EN 61557, which is what a current multifunction tester carries certification for."
        cite="Source: BS 7671:2018+A4:2026 Part 6, Chapter 64, Regulation 643.1."
      />

      <SectionRule />

      <ContentEyebrow>The sequence</ContentEyebrow>

      <ConceptBlock
        title="The tests in order, and why each one sits where it does"
        plainEnglish="Continuity, ring final continuity, insulation resistance, polarity, earth electrode on TT. Each test relies on the one before it having confirmed something."
      >
        <p>The dependency chain is the reason the order is not negotiable:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Continuity of protective conductors — Reg 643.2.1.</strong> Confirms the CPC is
            unbroken from the earthing terminal out to every accessory. Every later test assumes a
            working earth path.
          </li>
          <li>
            <strong>Continuity of ring final conductors — Reg 643.2.1.</strong> Confirms the ring is
            a ring. Until you know the topology you cannot interpret an R1 + R2 reading taken at a
            socket.
          </li>
          <li>
            <strong>Insulation resistance — Reg 643.3.</strong> Pushes 500 V DC between live
            conductors and to earth. If the CPC were broken the test current would find another path
            and the figure would be meaningless.
          </li>
          <li>
            <strong>Polarity.</strong> Uses continuity readings, so it comes after the
            continuity tests. It also has to be confirmed before energisation, because reversed
            polarity at a switch leaves a lamp permanently live.
          </li>
          <li>
            <strong>Earth electrode resistance — Reg 643.7.</strong> TT installations only. The
            electrode value has to be known before live loop readings can be interpreted, because
            the fault loop runs through it.
          </li>
        </ul>
        <p>
          Loop impedance, RCD operation and prospective fault current are live tests, taken after
          first energisation. A clean dead-test sequence is the gate that lets you get there.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="306e-4-1-check-1"
        question="You are told a radial circuit has already had its insulation resistance tested and passed at 12 MΩ, so you can skip continuity and move on. What is wrong with that?"
        options={[
          'Nothing — 12 MΩ is above the minimum, so the circuit is sound',
          'The insulation reading cannot be trusted, because without verified continuity the test current may have returned through a path other than the circuit CPC',
          'The insulation resistance test should have been done at 250 V DC first',
          'Only the value is wrong — 12 MΩ is below the minimum for a 230 V circuit',
        ]}
        correctIndex={1}
        explanation="A reading of 12 MΩ is comfortably above the 1 MΩ minimum, and the test voltage of 500 V DC is right for a 230 V circuit, so neither of those is the problem. The problem is what the reading measured. With a broken CPC the leakage finds another route — often another circuit — and the figure no longer describes the insulation between the live conductors and earth of the circuit in front of you."
      />

      <SectionRule />

      <ContentEyebrow>Continuity of protective conductors</ContentEyebrow>

      <ConceptBlock
        title="R1 + R2 and the long-lead method"
        plainEnglish="Two accepted ways of proving the CPC is continuous. R1 + R2 links line and CPC at the far end and reads the loop at the board. The long-lead method runs a single lead from the board earth bar out to each accessory in turn."
        onSite="A low-resistance ohmmeter on the continuity range, typically around a 200 mA test current. Null the leads first, every session, and again if you add an extension lead."
      >
        <p>
          <strong>R1 + R2.</strong> At the far end of the circuit, link line to CPC. At the board,
          with the circuit isolated, measure from line to CPC at the outgoing way. That figure is R1
          + R2 for the circuit. Compare it with the design prediction, add it to Ze to predict Zs,
          then remove the link.
        </p>
        <p>
          <strong>Long lead.</strong> One lead on the CPC at the board, the other lead — extended if
          it needs to be — taken to each accessory in turn and touched onto the CPC there. Each
          reading is R2 from the board to that point. Faster where you only need to confirm
          continuity rather than predict Zs, and the same technique gets reused for polarity with
          the board-end lead moved onto the line conductor.
        </p>
        <p>
          The judgement is in the comparison. A ring on 2.5/1.5 mm² twin and earth of ordinary
          domestic length lands somewhere around 0.18 to 0.30 Ω; a lighting circuit on 1.5/1.0 mm²
          sits nearer 0.5 to 1.5 Ω. A number that is ten times what the cable and the route can
          account for is a wrong decimal point, a wrong range, or a real defect, and none of the
          three should be written down before it is resolved.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 643.2.1"
        clause="643.2.1 The continuity of conductors and connections to exposed-conductive-parts and extraneous-conductive-parts, if any, shall be verified by a measurement of resistance of: (a) protective conductors, including protective bonding conductors; and (b) in the case of ring final circuits, live conductors."
        meaning="Notice what is being verified: not just the conductor, but the connections at each end of it, out to the exposed- and extraneous-conductive-parts. That is why both accepted methods end up touching every accessory in turn rather than proving the run once and moving on. It also explains why the live conductors get measured on a ring and nowhere else &mdash; on a ring they form a loop whose continuity can be proved the same way, and a break in it would otherwise go unnoticed."
        cite="BS 7671 Part 6, Chapter 64, Section 643 — Regulation 643.2.1"
      />

      <SectionRule />

      <ContentEyebrow>Ring final continuity</ContentEyebrow>

      <ConceptBlock
        title="Three parts, and what each part proves"
        plainEnglish="A ring has two conductor paths to every socket. If one path is broken the sockets still work, so the defect is invisible without this test."
        onSite="The classic defect is the bridged radial — two long legs joined at the board that behave like a ring until they are loaded. The cross-connection readings are what expose it."
      >
        <p>
          <strong>Part one — end to end.</strong> Disconnect both ends of line, neutral and CPC at
          the board so you have six conductor ends. Measure each conductor end to end: r1 for line,
          rn for neutral, r2 for the CPC.
        </p>
        <p>
          <strong>Part two — cross-connect line to neutral.</strong> Link the two line ends to the
          two neutral ends, then read at every socket. The readings should be consistent all the way
          round.
        </p>
        <p>
          <strong>Part three — cross-connect line to CPC.</strong> Link line to CPC the same way and
          read at every socket. The highest of those readings is the effective R1 + R2 for the
          circuit and is the figure you carry forward into the Zs calculation.
        </p>
        <p>
          Interpreting it: on a ring wired in one cable size throughout, r1 and rn should be close
          to each other — within about ten per cent — because the two conductors are the same size
          and follow the same route. With 2.5 mm² live conductors and a 1.5 mm² CPC, r2 comes out
          around 1.6 to 1.7 times r1. If r2 does not sit in that ratio, something is different about
          the CPC path: a mixed cable size, a hidden joint, or a length of the ring that is not what
          you were told it was. Readings that climb steadily as you walk the ring, or one socket
          well out of line with the rest, say the ring is not a ring.
        </p>
      </ConceptBlock>

      <VideoCard {...videos.ringFinalTest} />

      <InlineCheck
        id="306e-4-1-check-2"
        question="On a kitchen ring in 2.5/1.5 mm² twin and earth you measure r1 = 0.32 Ω, rn = 0.34 Ω and r2 = 0.55 Ω. What do these tell you?"
        options={[
          'The CPC is broken, because r2 is higher than r1 and rn',
          'The ring is wired as two radials, because r1 and rn differ',
          'The neutral is undersized, because rn is higher than r1',
          'They are consistent with an intact ring — r1 and rn are close, and r2 sits at roughly 1.7 times r1 as expected for a 1.5 mm² CPC against 2.5 mm² live conductors',
        ]}
        correctIndex={3}
        explanation="r1 and rn within a few per cent of each other is what an intact ring in one cable size looks like. r2 is higher because the CPC is a smaller cross-section, and the ratio of about 1.7 is what 1.5 mm² against 2.5 mm² produces. A broken CPC would read open, not 0.55 Ω, and a small difference between r1 and rn is normal rather than evidence of two radials."
      />

      <SectionRule />

      <ContentEyebrow>Insulation resistance</ContentEyebrow>

      <ConceptBlock
        title="Test voltage, minimum value, and what to take out first"
        plainEnglish="500 V DC for normal low-voltage circuits, 250 V DC for SELV and PELV, 1000 V DC for circuits above 500 V. The minimum acceptable value for a low-voltage circuit is 1 MΩ."
        onSite="Walk the installation before the instrument comes out. Anything with a circuit board in it either comes off the circuit or gets shorted out per the manufacturer&rsquo;s instructions."
      >
        <p>
          The test is applied between live conductors and between live conductors and earth, with
          the circuit isolated. Regulation 643.3 sets the test voltage and Table 64 sets the minimum
          acceptable result; Table 64 is where the 250 V DC figure for SELV, PELV and
          safety circuits comes from.
        </p>
        <p>Typical items that come off the circuit before the 500 V DC test:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Surge protective devices.</strong> An SPD will operate during the test and can
            give a false low reading, or be damaged.
          </li>
          <li>
            <strong>Dimmers and electronic transformers</strong> for low-voltage lighting.
          </li>
          <li>
            <strong>Appliances with electronic boards</strong> — ovens, hobs, washing machines,
            modern refrigeration.
          </li>
          <li>
            <strong>
              Computers, networking equipment, smart controllers, and RCD or RCBO trip electronics.
            </strong>{' '}
            Test on the line side of the device, or follow the manufacturer&rsquo;s instructions for
            testing in place.
          </li>
        </ul>
        <p>
          A4:2026 redrafted Regulation 643.3 and clarified this: where equipment has been
          disconnected for the main test, a 250 V DC test is applied following the reconnection of
          that equipment, and both results are recorded. So the shape of the job is disconnect, test
          at 500 V DC, reconnect, test at 250 V DC.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 643.3.1"
        clause="643.3.1 The insulation resistance shall be measured between: (a) live conductors; and (b) live conductors and the protective conductor connected to the earthing arrangement. During this measurement, line and neutral conductors may be connected together."
        meaning="The last sentence is the one that changes what you actually do. Linking line and neutral together turns the second measurement into one reading instead of two, which is the usual approach on a final circuit with nothing sensitive left connected. What it will not do is tell you which of the two conductors is the poor one, so where a linked result comes back low you separate them and repeat to find out where the problem is."
        cite="BS 7671 Part 6, Chapter 64, Section 643 — Regulation 643.3.1"
      />

      <ConceptBlock
        title="Reading the insulation result rather than just recording it"
        plainEnglish="Above 1 MΩ is a pass. That is the floor, not the target, and on new work a pass can still be worth investigating."
      >
        <p>
          Healthy new wiring reads well over 100 MΩ, and on most circuits the instrument simply runs
          off the top of its scale. So a circuit that comes back at, say, 480 MΩ has technically
          passed by a wide margin — and is still the odd one out on a board where everything else is
          off scale. That gap is the thing worth ten minutes of your time.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>An order-of-magnitude outlier.</strong> Passing, but different from its peers.
            Walk the circuit. A sheath pinched on a sharp edge at a back box is the common find — no
            breach yet, but a leakage path that will get worse.
          </li>
          <li>
            <strong>A reading below 1 MΩ.</strong> A fault. Do not energise. Disconnect the elements
            of the circuit one at a time and re-test to localise it. It can be as ordinary as a
            shower pull-cord refitted to a damp ceiling, or as serious as a cable damaged during
            second fix.
          </li>
          <li>
            <strong>A borderline reading on new plaster.</strong> Residual moisture in a freshly
            plastered wall can pull a genuine reading down. It is still recorded as measured, with a
            note, and re-tested after the building has dried out.
          </li>
        </ul>
      </ConceptBlock>

      <InsulationResistanceTest />

      <SectionRule />

      <ContentEyebrow>Polarity and earth electrode</ContentEyebrow>

      <ConceptBlock
        title="The last two tests — polarity, then the electrode on TT"
        plainEnglish="Polarity confirms line is in the line terminal, neutral in the neutral and CPC at the earth terminal, at every accessory and at the board. The electrode test applies only where the installation has an electrode."
      >
        <p>The polarity test has to establish:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>
              Every fuse and single-pole control or protective device is in the line conductor.
            </strong>{' '}
            A single-pole device in the neutral switches the circuit off and leaves it live.
          </li>
          <li>
            <strong>Lampholder outer or screwed contacts are connected to the neutral.</strong> The
            part a person can touch when changing a lamp should not be the line side.
          </li>
          <li>
            <strong>Wiring is correctly connected throughout.</strong> Conductors in the right
            terminals at every accessory on the circuit.
          </li>
        </ul>
        <p>
          It is a dead test, done by continuity from the board out to the line terminal at each
          accessory — often using the same long lead as the continuity work. Live polarity at the
          origin, which confirms the supply itself has not been connected the wrong way round,
          belongs to the live sequence after energisation.
        </p>
        <p>
          <strong>The electrode.</strong> A TT installation stands on its own earth electrode rather
          than the supply earthing arrangement, so the electrode itself gets measured. Regulation
          643.7 requires the electrode resistance to be measured where the installation has one,
          using a dedicated earth electrode tester or the loop method appropriate to a TT supply. A
          single domestic electrode typically comes out somewhere in the region of 50 to 200 Ω,
          which paired with a 30 mA RCD sits comfortably inside the Table 41.5 limit of 1667 Ω for
          that device. A much higher value needs investigation rather than acceptance — usually an
          improved electrode arrangement.
        </p>
        <p>
          On TN-S and TN-C-S you mark the result not applicable rather than leaving the field empty.
          Not applicable is a decision; blank is an unanswered question.
        </p>
      </ConceptBlock>

      <EarthingSystemDiagram system="TT" />

      <InlineCheck
        id="306e-4-1-check-3"
        question="A 32 A Type B RCBO circuit on a TN-C-S supply gives R1 + R2 = 0.22 Ω. Using the published worst-case Ze of 0.35 Ω, what does the dead-test data let you say before energisation?"
        options={[
          'Predicted Zs is 0.57 Ω, comfortably inside the A4:2026 Table 41.3 maximum of 1.37 Ω for a Type B 32 A device',
          'Nothing — Zs can only be established by a live measurement at the far end of the circuit',
          'Predicted Zs is 0.22 Ω, because R1 + R2 is the loop impedance for the circuit',
          'Predicted Zs is 1.37 Ω, because that is the tabulated value for the device',
        ]}
        correctIndex={0}
        explanation="Zs is predicted as Ze plus R1 + R2, so 0.35 plus 0.22 gives 0.57 Ω, against a tabulated maximum of 1.37 Ω for a Type B 32 A device in A4:2026 Table 41.3. That is the whole point of taking R1 + R2 while the installation is dead — the design gets verified before the supply goes on, and the live measurement at the far end later confirms it."
      />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Reaching for the insulation resistance range first because it is the quick one"
        whatHappens={
          <>
            The inspection is done and the installation looks right, so the instrument goes onto the
            insulation range and 500 V DC goes between the live conductors and earth. Every circuit
            reads well above the minimum and gets written down as a clean pass. Later, during
            continuity, R1 + R2 on one circuit comes back open — the CPC is broken at a junction box
            in the loft. That circuit&rsquo;s insulation figure was never a measurement of its
            insulation to earth; it was leakage finding a way home through another circuit&rsquo;s
            CPC. The real value is unknown and the schedule says it is fine.
          </>
        }
        doInstead={
          <>
            Continuity first, on every job, without exception. Low-resistance range, leads nulled,
            R1 + R2 on every circuit, every CPC and bonding conductor proved continuous, values
            recorded as you take them. Only then switch to the insulation range. The order in
            Regulation 643.1 is what makes each later reading mean what you think it means.
          </>
        }
      />

      <CommonMistake
        title="Repeating only the test that failed, and recording only the figure that passed"
        whatHappens={
          <>
            An insulation resistance reading comes back below the minimum, the cause is found and
            put right, and the insulation test is repeated. It passes, that figure goes on the
            schedule, and the job moves on. Two things have quietly gone wrong. The fault that pulled
            the insulation down may well have distorted an earlier reading too — a cable pinched
            against a metal back box creates a parallel path that shows up in continuity as readily
            as in insulation — and that earlier figure is still sitting on the schedule, taken while
            the fault was present. And the schedule now shows one clean number with no history, so
            nobody reading it later can tell that a fault was ever found there, what it was, or what
            was done about it. The circuit that needed the most attention on the whole job looks
            identical on paper to the ones that needed none.
          </>
        }
        doInstead={
          <>
            When a test indicates a failure, stop the sequence, rectify the fault, then repeat that
            test and any preceding test whose result the same fault could have influenced. Work out
            which those are rather than guessing in either direction — one faulty circuit does not
            invalidate the whole board, and repeating only the obvious test is how a distorted
            earlier reading survives. Then record all three things: the original failing reading, the
            corrective action, and the post-repair reading. And do not energise past anything still
            unresolved, because the dead-test sequence is the gate to first energisation and an
            outstanding fault keeps it shut.
          </>
        }
      />

      <Scenario
        title="Merthyr Tydfil — the ring that read beautifully and was not a ring"
        situation={
          <>
            A three-bedroom terrace in Merthyr Tydfil, new consumer unit on existing wiring. The
            downstairs sockets circuit is described on the old chart as a ring. Continuity on the
            radials is clean. On the sockets circuit you disconnect both ends at the board and
            measure end to end: r1 = 0.32 Ω, rn = 0.34 Ω, r2 = 0.55 Ω, all sensible. You
            cross-connect line to CPC and start walking the sockets. The first two read 0.21 and
            0.22 Ω. The third reads 0.36 Ω. The fourth reads 0.51 Ω and climbing.
          </>
        }
        whatToDo={
          <>
            Stop walking and think about what the numbers describe. On a true ring, cross-connected,
            every socket sits at roughly the same point electrically and the readings stay flat all
            the way round. Readings that climb steadily say you are measuring further and further
            along a single path — the two legs are not joined at the far end, and what you have is
            two radials bridged at the board. The sensible end-to-end figures do not contradict
            that, because a bridge at the board completes the loop for that measurement. Find the
            break: it is usually a termination missed at one accessory, most often the one where the
            readings stop being flat. Repair it, then repeat the ring test in full — end to end and
            both cross-connections — and record the corrected set.
          </>
        }
        whyItMatters={
          <>
            A bridged radial works. The sockets all have power, the customer notices nothing, and
            the circuit will sit like that for years. What it has lost is the two-path sharing that
            a 32 A ring on 2.5 mm² depends on, so the cable can be loaded beyond what it was
            designed to carry. The end-to-end readings alone would have let this through, and so
            would a single R1 + R2 taken at one convenient socket. It is the pattern across the
            whole walk that exposes it — which is why the cross-connection test is done at every
            socket and not at a sample.
          </>
        }
      />

      <SectionRule />

      <ContentEyebrow>When something fails</ContentEyebrow>

      <ConceptBlock
        title="Fix it, then repeat what the fault could have touched"
        plainEnglish="A failed test is not a note on the schedule. It stops the sequence until the fault is found and rectified."
      >
        <p>
          Where a test indicates a failure to comply, that test and any preceding test whose result
          may have been influenced by the same fault are repeated after the fault has been
          rectified. That is Regulation 643.7.2, and the phrase that does the work is any preceding
          test.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Work out what the fault could have distorted.</strong> A cable pinched against a
            metal back box can create a parallel path that affects continuity as well as insulation,
            so both tests are repeated on that circuit.
          </li>
          <li>
            <strong>Repeat only what is genuinely affected.</strong> One faulty circuit does not
            invalidate the whole board. Judgement, not blanket re-testing.
          </li>
          <li>
            <strong>Record all three things.</strong> The original failing reading, the corrective
            action, and the post-repair reading. A schedule that shows only the final clean figure
            hides the history that a future inspector would want.
          </li>
          <li>
            <strong>Do not energise past an unresolved failure.</strong> The dead-test sequence is
            the gate to first energisation, and an outstanding fault keeps the gate shut.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <FAQ
        items={[
          {
            question: 'What does nulling the instrument actually do?',
            answer:
              'On the low-resistance range you short the two test leads together and zero the instrument, which subtracts the resistance of the leads themselves from every reading that follows. Without it you are adding a couple of hundred milliohms of lead to each measurement, which barely shows on a long circuit and badly distorts a short one. Null at the start of every session, and again whenever you change a lead or add an extension.',
          },
          {
            question: 'Can I leave equipment connected for the insulation resistance test?',
            answer:
              'Only where it can take the test voltage. Anything with electronics in it either comes off the circuit or gets shorted out following the manufacturer’s instructions, because 500 V DC can damage it and it can give you a false low reading in return. Once the main test is done and passed you reconnect and carry out the 250 V DC test on the circuit with the equipment back in place, then record both results.',
          },
          {
            question: 'Why test at the point of work instead of at the board?',
            answer:
              'Because the board only tells you about the board. Testing at the point where you will be working is what catches a circuit that was isolated at the wrong device, a back-feed from a second supply, and a conductor landed on a terminal it does not belong on. The same logic runs through the whole dead-test sequence — you measure the thing you are relying on, in the place you are relying on it.',
          },
          {
            question: 'Do these tests apply on a periodic inspection as well as new work?',
            answer:
              'Yes, with adaptation. A condition report is mostly inspection plus sample testing rather than a full test of every circuit and every accessory, and the extent of the sample is a matter of professional judgement. Where a circuit is tested, the sequence is the same and for the same reasons: isolate, continuity, insulation resistance, polarity. What changes is how much you test and how the findings are classified, not the order in which you take the readings.',
          },
        ]}
      />

      <KeyTakeaways
        points={[
          'Regulation 643.1 requires the tests of Regulations 643.2 to 643.6 in that order before energisation, with Regulation 643.7 added where there is an earth electrode; the tests above 643.6 are live and follow energisation.',
          'Continuity comes first because every later test assumes a proven earth path. Null the leads before the first reading and again if you change them.',
          'R1 + R2 added to Ze predicts Zs before the supply goes on, which is how the design gets verified while the installation is still dead.',
          'Ring final continuity is three parts. r1 close to rn, r2 at roughly 1.6 to 1.7 times r1 on 2.5/1.5 mm² cable, and cross-connection readings that stay flat around the ring.',
          'Insulation resistance is 500 V DC with a 1 MΩ minimum for low-voltage circuits, 250 V DC for SELV and PELV, and a 250 V DC test after reconnecting equipment that had to be disconnected.',
          'A pass that sits an order of magnitude below its neighbours is worth investigating before it is recorded. The minimum is a floor, not a target.',
          'Polarity confirms single-pole devices in the line conductor, lampholder outer contacts on the neutral, and correct connection throughout — all before energisation.',
          'When a test fails, rectify the fault and repeat that test plus any preceding test the fault could have influenced, recording the original reading, the action and the corrected reading.',
        ]}
      />

      <ContentEyebrow>Check yourself</ContentEyebrow>
      <Quiz questions={quizQuestions} title="De-energised tests on single-phase circuits" />
    </div>
  );
}
