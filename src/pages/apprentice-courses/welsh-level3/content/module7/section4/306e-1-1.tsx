/**
 * Unit 306E — Understand the Principles of Inspection, Testing and Commissioning
 * Learning outcome 1 — Understand how to select the instruments to be used for
 * carrying out relevant tests
 * Criterion 1.1 — The test instruments required for de-energised tests on standard
 * single-phase circuits
 *
 * Approach: this page works backwards from the dead test set itself. It names each
 * de-energised test on a standard single-phase circuit, then names the instrument and
 * the range on that instrument which produces the result, and explains why the nearest
 * alternative instrument does not. It is pitched at a third-year who is expected to
 * justify the selection, not just recite a kit list.
 * Every value, range and regulation on this page is taken from the published
 * Elec-Mate Level 2 Module 4.1.5 and Level 3 Module 4.2.1 lessons.
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
import { InsulationResistanceTest } from '@/components/study-centre/diagrams';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';

const quizQuestions = [
  {
    id: 1,
    question:
      'Which instrument and range produces the R1+R2 figure you write on the schedule for a standard single-phase radial?',
    options: [
      'A multifunction tester on its low-resistance continuity range',
      'A multimeter on its 0 to 40 megohm resistance range',
      'A clamp meter with the jaws closed round the line conductor',
      'A socket tester plugged in at the furthest point of the circuit',
    ],
    correctAnswer: 0,
    explanation:
      'Continuity is a low-resistance measurement. The multifunction tester carries a dedicated low-resistance range for it, quoted as 0 to 200 ohms on typical instruments. A general-purpose multimeter resistance range is built for fault-finding, not for resolving the fraction of an ohm that separates a good protective conductor from a poor one.',
  },
  {
    id: 2,
    question: 'What is the standard insulation resistance test voltage for a 230 V single-phase final circuit?',
    options: [
      '500 V DC',
      '250 V DC, which is reserved for SELV and control circuits',
      '1000 V DC, which is used above 500 V',
      '230 V AC, matching the nominal supply voltage of the circuit',
    ],
    correctAnswer: 0,
    explanation:
      'The multifunction tester offers 250 V DC for SELV and control circuits, 500 V DC for standard low voltage, and 1000 V DC for systems above 500 V. A standard single-phase final circuit sits squarely on the 500 V DC setting.',
  },
  {
    id: 3,
    question:
      'You are asked to prove a single-phase circuit dead before starting the de-energised tests. What is the correct instrument pairing?',
    options: [
      'A GS38-compliant two-pole voltage indicator with its associated proving unit',
      'A multimeter on the AC volts range, swept across every conductor combination',
      'A non-contact volt-stick waved along the length of the isolated cable',
      'A socket tester plugged into the nearest outlet on the same circuit',
    ],
    correctAnswer: 0,
    explanation:
      'Safe isolation is a three-step routine — prove the tester on the proving unit, test the circuit, prove the tester again. Only the two-pole voltage indicator and its proving unit support that routine. A volt-stick is a voltage detector; it senses presence capacitively and cannot confirm absence.',
  },
  {
    id: 4,
    question: 'Why does a multimeter make an unreliable proving-dead instrument on an isolated circuit?',
    options: [
      'Its input impedance is around 10 megohms, so an induced ghost voltage reads as a real source',
      'It cannot measure AC voltage at all, so it can never indicate live or dead',
      'It reads peak voltage rather than RMS, so every reading is inflated',
      'Its leads carry no fuse, which is the only reason it fails GS38',
    ],
    correctAnswer: 0,
    explanation:
      'High input impedance is a feature for measurement, because the instrument does not load the circuit under test. It is a defect for proving dead. A two-pole indicator sits at roughly 1 to 5 kilohms, which loads an induced voltage down to zero while a real source holds up.',
  },
  {
    id: 5,
    question: 'Which of the de-energised tests needs an instrument function you will only use on a TT installation?',
    options: [
      'Earth electrode resistance, measured as a three-wire test at the electrode',
      'Insulation resistance between line and neutral at 500 V DC',
      'Continuity of the protective conductor on a lighting circuit',
      'Polarity verified from the origin to each accessory',
    ],
    correctAnswer: 0,
    explanation:
      'Continuity, insulation resistance and polarity apply to every installation. Earth electrode resistance only applies where the installation relies on its own electrode, which is the TT case. Selecting the instrument means knowing which of its functions this particular job will actually need.',
  },
  {
    id: 6,
    question: 'What does a socket tester legitimately contribute to a single-phase dead-test programme?',
    options: [
      'Nothing on the dead tests — it is a plug-in screening tool for an energised circuit',
      'It gives the R1+R2 value at each socket, saving a wander-lead run',
      'It measures insulation resistance between line and earth at each outlet',
      'It confirms the polarity of the supply side of the consumer unit',
    ],
    correctAnswer: 0,
    explanation:
      'A socket tester needs the circuit energised to light its lamps, so it plays no part in the de-energised sequence at all. It is a rapid screening tool afterwards, and it never substitutes for instrument-based verification.',
  },
  {
    id: 7,
    question: 'Why is a wander lead part of the instrument selection for a long single-phase radial?',
    options: [
      'It lets you reach the far end of the circuit from the board for an end-to-end continuity measurement',
      'It raises the test voltage so the insulation resistance reading is easier to interpret',
      'It isolates the circuit so the two-pole tester is no longer required',
      'It converts the continuity range into an earth electrode resistance range',
    ],
    correctAnswer: 0,
    explanation:
      'Long radials need a lead that will physically reach. Wander leads are made for this, in 10 m and 20 m lengths on typical instrument ranges. Choosing the instrument without checking you can reach the far accessory wastes a trip.',
  },
  {
    id: 8,
    question: 'A CAT III 600 V multimeter is the only meter in the van. Where must you not use it?',
    options: [
      'At the supply origin, cut-out or tails, which is CAT IV territory',
      'At a distribution board, because boards are always CAT IV',
      'At a 13 A socket outlet, because socket work demands CAT IV',
      'Anywhere at all, because CAT III instruments are withdrawn from use',
    ],
    correctAnswer: 0,
    explanation:
      'CAT II covers appliances and plug-and-cord equipment, CAT III covers fixed installation and distribution circuits, CAT IV covers the origin of the installation. A CAT III instrument at a CAT IV location is not protected against the transient overvoltage it may meet there.',
  },
];

export default function Lesson306e_1_1() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'The de-energised set on a standard single-phase circuit is continuity, insulation resistance, polarity, and earth electrode resistance where the installation relies on an electrode.',
          'One instrument covers all four — the multifunction tester — but you select a different range on it for each test, and selecting the wrong range produces a number that looks plausible and means nothing.',
          'Before any measuring instrument comes out, the two-pole voltage indicator and its proving unit have already done their job. They are selected for safe isolation, never for measurement.',
          'A multimeter sits at around 10 megohms input impedance and a two-pole indicator at roughly 1 to 5 kilohms. That single difference is why one measures and the other proves dead.',
          'Instrument selection is also a location decision. CAT II at the appliance, CAT III at the board, CAT IV at the origin — match or exceed, never fall short.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Name every de-energised test carried out on a standard single-phase circuit and state the instrument function that produces each result.',
          'Select the correct multifunction tester range for continuity, insulation resistance, polarity and earth electrode resistance.',
          'Explain why safe isolation instruments are selected before any measuring instrument is chosen, and why the two must never be swapped.',
          'Justify the rejection of a multimeter, a volt-stick or a socket tester where a dedicated installation-test instrument is required.',
          'Match a test instrument to the measurement category of the location it will be used in, from the appliance end through to the origin.',
        ]}
        initialVisibleCount={3}
      />

      <SectionRule />

      <ContentEyebrow>What the dead tests actually ask for</ContentEyebrow>

      <ConceptBlock
        title="Four de-energised tests, four instrument functions"
        plainEnglish="Work out what you are measuring before you work out what you are measuring it with. On a standard single-phase circuit the de-energised set is short and fixed, and each item on it maps to one function on one instrument."
        onSite="Say the list out loud at the board before you open the case. Continuity. Insulation resistance. Polarity. Electrode, if this is a TT supply. Four items. If you cannot name the instrument function for each one before you start, you are about to guess."
      >
        <p>
          The de-energised sequence is the part of verification that happens with the circuit
          disconnected from the supply. Everything on it can be obtained without a single volt on the
          conductors.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Continuity.</strong> R1+R2 for line and protective conductor end to end, R2 for
            the protective conductor on its own, and the continuity of bonding tails. Measured on the
            low-resistance range.
          </li>
          <li>
            <strong>Insulation resistance.</strong> Line to neutral, line to earth and neutral to
            earth, at 500 V DC on a standard low-voltage circuit.
          </li>
          <li>
            <strong>Polarity.</strong> Verified from the origin through to each accessory, before
            energising, using the continuity function rather than a separate instrument.
          </li>
          <li>
            <strong>Earth electrode resistance.</strong> Only where the installation relies on its own
            electrode. A three-wire test at the electrode, on the dedicated instrument range.
          </li>
        </ul>
        <p>
          Loop impedance, prospective fault current and RCD operating time are not on this list. They
          are live tests and they belong to the energised part of the sequence. Confusing the two
          groups is the first place an instrument selection question goes wrong.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ConceptBlock
        title="The instruments that come before the measuring instruments"
        plainEnglish="You cannot carry out a de-energised test until the circuit is genuinely de-energised and you have proved it. That proving is done by two pieces of kit that are not measuring instruments at all."
        onSite="Two-pole voltage indicator and its associated proving unit. Martindale VI-13800 with a GVD2, Drummond DTL10 with a Lite, Fluke T130 with a PRV240. They travel as a pair and they are useless apart."
      >
        <p>
          The three-step prove-dead routine decides whether the whole test programme is built on solid
          ground. Prove the tester on the proving unit. Test the circuit. Prove the tester again.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Step one.</strong> Probes on the proving unit terminals. The tester reads the
            proving voltage, typically 240 V or 110 V AC. That confirms the tester works.
          </li>
          <li>
            <strong>Step two.</strong> Probes on the conductors at the point of work. Should read
            zero, or below the tester threshold.
          </li>
          <li>
            <strong>Step three.</strong> Probes back on the proving unit. Still reading the proving
            voltage. That confirms the tester did not fail between step one and step two.
          </li>
        </ul>
        <p>
          Drop step three and the dead reading in step two is unsupported — the tester could have
          failed after you proved it, and a failed tester reads dead on a live circuit. That is the
          reason the pairing exists.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Continuity and insulation resistance</ContentEyebrow>

      <ConceptBlock
        title="Continuity — the low-resistance range, and why the multimeter will not do"
        plainEnglish="Continuity on an installation is a low-resistance measurement, often well under an ohm. The multifunction tester carries a dedicated range for it, quoted as 0 to 200 ohms on typical instruments, with a null function to take the leads out of the reading."
        onSite="Null the leads first, every time. On a Kewtech KT64+ the null button is right there for exactly that reason. An un-nulled lead set can add more resistance than the conductor you are trying to measure."
      >
        <p>
          A general-purpose multimeter offers 0 to 40 megohms auto-ranging with an audible beep below
          around 30 ohms. That beep answers the question &ldquo;is this conductor joined to that
          one&rdquo;, which is a fault-finding question. It does not answer &ldquo;what is the
          resistance of this protective conductor to three decimal places&rdquo;, which is the
          verification question.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>R1+R2.</strong> Line and protective conductor linked at the far end, measured end
            to end from the board. The figure that goes on the schedule.
          </li>
          <li>
            <strong>R2 alone.</strong> Protective conductor only, using a wander lead from the board
            to the accessory. Used where the circuit configuration makes R1+R2 impractical.
          </li>
          <li>
            <strong>Bonding tails.</strong> Same range, checking the continuity of the main bonding
            conductors back to the main earthing terminal.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 643.2.1"
        clause="643.2.1 The continuity of conductors and connections to exposed-conductive-parts and extraneous-conductive-parts, if any, shall be verified by a measurement of resistance of: (a) protective conductors, including protective bonding conductors; and (b) in the case of ring final circuits, live conductors."
        meaning="Read the words &ldquo;a measurement of resistance&rdquo; and the instrument choice settles itself. You are not asked to establish that two things are joined &mdash; you are asked for a value, which is why a continuity beep is not the test and a dedicated low-resistance range is. The regulation also tells you what has to be measured: the protective conductors and the bonding, plus the live conductors as well once the circuit is a ring."
        cite="BS 7671 Part 6, Chapter 64, Section 643 — Regulation 643.2.1"
      />

      <SectionRule />

      <InlineCheck
        id="306e-1-1-check-1"
        question="A colleague hands you a Fluke 117 and says it will do for the continuity results on a lighting circuit. What is the correct response?"
        options={[
          'Accept it, because a multimeter and a multifunction tester both read in ohms',
          'Accept it provided you null the leads on the multimeter first',
          'Decline it — continuity for verification needs the dedicated low-resistance range on an installation-test instrument, not a general-purpose resistance range',
          'Decline it, because a multimeter cannot measure resistance at all',
        ]}
        correctIndex={2}
        explanation="A multimeter does measure resistance, and it does have a continuity beep, so the objection is not that it reads nothing. The objection is resolution and purpose. The multifunction tester carries a dedicated low-resistance range built to resolve the fraction of an ohm that a verification result turns on, and a null function to remove the lead resistance from the answer."
      />

      <SectionRule />

      <ConceptBlock
        title="Insulation resistance — three test voltages, one correct choice"
        plainEnglish="The instrument offers 250 V DC, 500 V DC and 1000 V DC. The circuit in front of you decides which one you press. A standard single-phase final circuit is 500 V DC."
        onSite="Look at what is connected before you press the button. Anything that will not survive 500 V DC on its terminals comes off the circuit first, or you will be replacing it and explaining why."
      >
        <p>
          Insulation resistance is measured between line and neutral, line and earth, and neutral and
          earth. The instrument applies a DC test voltage and reports the resistance of the insulation
          separating those conductors.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>250 V DC.</strong> SELV and control circuits. The lower voltage protects
            low-voltage electronics that 500 V would damage.
          </li>
          <li>
            <strong>500 V DC.</strong> Standard low-voltage installation circuits. This is the setting
            for a normal single-phase final circuit.
          </li>
          <li>
            <strong>1000 V DC.</strong> Systems operating above 500 V.
          </li>
        </ul>
        <p>
          The limit for a new installation is typically greater than 1 megohm. Some instruments carry
          a pre-test function that checks for connected load before applying the full test voltage —
          the Fluke 1664FC calls it Insulation PreTest. Where the instrument does not have that, the
          discipline is yours.
        </p>
      </ConceptBlock>

      <InsulationResistanceTest />

      <SectionRule />

      <ContentEyebrow>Polarity and earth electrode testing</ContentEyebrow>

      <ConceptBlock
        title="Polarity and earth electrode resistance — the two that are easy to under-plan"
        plainEnglish="There is no polarity instrument — polarity is verified on the continuity range of the same instrument, from the origin through to every accessory. Earth electrode resistance is a dedicated three-wire range that you may never press on a domestic job and cannot do without on a rural one."
        onSite="Selecting for a rural job means checking the electrode function is actually on the model you are taking. Not every budget multifunction tester carries it, and finding that out standing at the electrode is a wasted afternoon."
      >
        <p>
          Selecting the instrument for polarity means selecting the continuity range and then selecting
          a lead arrangement that lets you reach each point. On a standard single-phase circuit that is
          usually a wander lead from the board to the accessory, or a link at the board with the reading
          taken at the far end.
        </p>
        <p>
          Polarity also has an inspection half, which belongs to the visual stage rather than the
          instrument stage. Conductor identification at every accessory is what the eye catches; the
          instrument confirms it electrically. The two are complementary, and on a mis-wired accessory
          either one on its own can miss what the other finds.
        </p>
        <p>
          Earth electrode resistance is the clearest example of why instrument selection is a job-by-job
          decision rather than a fixed kit list. Two single-phase circuits can be electrically identical
          and still need different instrument functions, purely because of the earthing arrangement
          behind them. It is also the test most often left to the end and then skipped, so build it into
          the plan at the point you select the instrument rather than at the point you run out of
          daylight.
        </p>
      </ConceptBlock>

      <SectionRule />

      <InlineCheck
        id="306e-1-1-check-2"
        question="A single-phase circuit is being verified on a TT installation. Which instrument function is added to the de-energised set that would not be needed on a TN-C-S supply?"
        options={[
          'Earth electrode resistance, measured as a three-wire test at the electrode',
          'Insulation resistance at 1000 V DC instead of 500 V DC',
          'Loop impedance measured at the furthest point of the circuit',
          'RCD operating time measured at the consumer unit',
        ]}
        correctIndex={0}
        explanation="Earth electrode resistance is the function that a TT installation adds to the dead sequence, because the installation relies on its own electrode rather than on a supply earth. Loop impedance and RCD operating time are both live tests, and the insulation resistance test voltage does not change with the earthing arrangement."
      />

      <SectionRule />

      <ContentEyebrow>What the multifunction tester replaces</ContentEyebrow>

      <ConceptBlock
        title="One instrument or five — what the multifunction tester replaces"
        plainEnglish="A multifunction tester packages the separate test functions required for verification into a single instrument. Continuity, insulation resistance, loop impedance, RCD operating time and current, and earth electrode resistance."
        onSite="Megger MFT1741+, Fluke 1664FC, Kewtech KT64+ and Martindale ET4500 are the instruments you will meet. They all run the same set of tests. The differences are screen, auto-sequence functions, storage and download."
      >
        <p>
          The standalone insulation tester still exists — the Megger MIT2500 and Fluke 1577 are
          examples — and it is selected where the work is outside the normal low-voltage installation
          case. For a standard single-phase circuit the multifunction tester is the selection.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Megger MFT1741+.</strong> Full test suite, auto-RCD, no-trip loop mode, download to
            the manufacturer software.
          </li>
          <li>
            <strong>Fluke 1664FC.</strong> Insulation pre-test, auto-test sequence, wireless transfer.
          </li>
          <li>
            <strong>Kewtech KT64+.</strong> Full suite with an integrated null button, the
            budget-conscious choice at around £450.
          </li>
          <li>
            <strong>Metrel MI3155.</strong> Common on commercial work, adds three-phase functions you
            will not need on a single-phase final circuit.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Leads, probes and CAT rating</ContentEyebrow>

      <ConceptBlock
        title="What the leads decide, and what they cost you if you get them wrong"
        plainEnglish="Instrument selection is not finished when you have chosen the box. The leads, probes and clips are part of the selection, and they are part of the compliance."
        onSite="Manufacturer-supplied leads meet GS38. Replacement leads must meet it too. Buying non-compliant probes to fit a compliant tester voids the compliance of the pairing, so stick with the manufacturer set or something specifically marked for the purpose."
      >
        <p>
          Three lead choices change what you can actually do on a de-energised sequence.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Wander leads.</strong> Long single-conductor leads for R1+R2 and R2 across long
            radials. Megger make a 10 m WL10 and a 20 m WL20. Without one, a long circuit forces a link
            and a two-person measurement.
          </li>
          <li>
            <strong>Crocodile clip leads.</strong> Hands-free testing inside a board. The clip design
            has to grip firmly without bridging adjacent terminals.
          </li>
          <li>
            <strong>Probe geometry.</strong> Finger guard intact, 4 mm exposed tip, no chips in the
            moulded insulation. That is the GS38 shape and it is non-negotiable on live work.
          </li>
        </ul>
        <p>
          Store them coiled in a figure of eight in the instrument case. Tight loops crack the
          insulation, and a cracked lead is a lead you are about to have to replace.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ConceptBlock
        title="Measurement category — the same test, a different instrument"
        plainEnglish="The CAT rating on an instrument says how much transient overvoltage its input protection can survive. The further upstream you work, the higher the transient you may meet, and the higher the rating you need."
        onSite="CAT II for appliances and plug-and-cord equipment. CAT III for fixed installation and distribution circuits. CAT IV for the origin, the cut-out and the supply tails. Match or exceed the location. Never work down."
      >
        <p>
          This is where an instrument selection question stops being about function and starts being
          about where you are standing. The same insulation resistance test on the same single-phase
          circuit is a different instrument decision at the origin than it is at the last socket.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Fluke 117.</strong> CAT III 600 V. Distribution board work, not supply-side.
          </li>
          <li>
            <strong>Fluke 87V.</strong> CAT III 1000 V and CAT IV 600 V. Covers supply-side work.
          </li>
          <li>
            <strong>Martindale VI-13800.</strong> CAT IV 600 V, suitable for cut-out work.
          </li>
          <li>
            <strong>Megger MFT1741+.</strong> CAT IV 300 V and CAT III 600 V.
          </li>
          <li>
            <strong>Lead matching.</strong> The leads carry their own rating. A CAT IV instrument with
            CAT II leads is limited by the leads.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <InlineCheck
        id="306e-1-1-check-3"
        question="Which combination correctly matches each de-energised task on a standard single-phase circuit to its instrument function?"
        options={[
          'Continuity on the clamp meter, insulation resistance on the socket tester, polarity on the two-pole tester',
          'Continuity on the two-pole tester, insulation resistance on the multimeter, polarity on the clamp meter',
          'Continuity on the socket tester, insulation resistance on the clamp meter, polarity on the multimeter',
          'Continuity on the low-resistance range, insulation resistance at 500 V DC, polarity on the continuity range, with the two-pole tester and proving unit used beforehand to prove dead',
        ]}
        correctIndex={3}
        explanation="The de-energised measurements all sit on the multifunction tester — the low-resistance range for continuity and for polarity, and 500 V DC for insulation resistance. The two-pole tester and proving unit are the pairing used before any of that, to prove the circuit dead. A clamp meter reads current on an energised conductor and a socket tester needs the circuit live, so neither belongs in the dead sequence."
      />

      <SectionRule />

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 651.3"
        clause="Measuring instruments and monitoring equipment and methods shall be chosen in accordance with the relevant parts of BS EN 61557."
        meaning="This is the requirement that turns instrument selection from a preference into an obligation. The same wording governs instrument choice for initial verification, so it applies to every test in this unit. Where equipment other than a BS EN 61557 instrument is used, the accepted position is that it must offer no less a degree of performance and safety. BS 7671 nails the choice to a named standard, BS EN 61557, because an instrument that does not meet it cannot be relied on for a safety-critical measurement. Anything you use on a verification job either carries that mark or demonstrates equivalent performance and safety. It is the line that separates a professional installation-test instrument from a general-purpose meter that happens to read in ohms."
        cite="BS 7671 Part 6, Chapter 65 — Regulation 651.3"
      />

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Treating the multimeter and the multifunction tester as interchangeable because both read ohms"
        whatHappens={
          <>
            The multifunction tester is locked in the van and the job is a single lighting circuit. The
            multimeter is in the pouch. It reads resistance, so the continuity figures get taken on it
            and written straight onto the schedule. The readings look reasonable — a fraction of an ohm
            here, a couple of ohms there. What has actually been recorded is the lead resistance plus
            the conductor resistance, on an instrument whose resistance range was designed to tell you
            whether a fuse is intact rather than to resolve tenths of an ohm. The schedule now carries
            numbers that nobody can reproduce.
          </>
        }
        doInstead={
          <>
            Select the instrument from the test, not from what is nearest. Continuity for verification
            goes on the dedicated low-resistance range of an installation-test instrument, nulled
            before the first reading. Insulation resistance goes on the 500 V DC range of the same
            instrument. The multimeter stays in the pouch for fault-finding, which is the job it is
            genuinely better at. If the right instrument is locked in the van, the answer is to fetch
            it, not to substitute.
          </>
        }
      />

      <CommonMistake
        title="Pressing 500 V DC before looking at what is still connected to the circuit"
        whatHappens={
          <>
            The instrument is the right one and the range is the right one, so the test goes ahead —
            but nothing has been disconnected first. Whatever is still on the circuit is now sitting
            with the test voltage across its terminals, and anything on there that was never built to
            survive it does not. That is the expensive half. The other half is the reading: the
            instrument reports the insulation of the circuit in parallel with everything connected to
            it, so a perfectly sound circuit can return a low figure and get written up as a defect,
            or an equipment path can flatter a circuit that is not sound. Either way the number on the
            schedule is not a measurement of the thing it claims to measure, and the afternoon that
            follows is spent chasing a fault in the wiring that was never in the wiring.
          </>
        }
        doInstead={
          <>
            Walk the circuit and look at what is connected before you press anything, then take off
            whatever will not survive the test voltage. Choose the test voltage from the circuit in
            front of you rather than from habit — a standard low-voltage final circuit is the 500 V DC
            setting, and SELV and control circuits are the lower one precisely because the electronics
            on them would not survive. Where the instrument offers a pre-test that checks for
            connected load before applying the full voltage, use it; where it does not, that
            discipline is yours to supply. And treat an unexpected reading as a question rather than a
            finding: ask what else is on the circuit before you write it up as a defect.
          </>
        }
      />

      <SectionRule />

      <Scenario
        title="Two circuits, two instrument decisions — Caernarfon"
        situation={
          <>
            Monday morning, two jobs booked in Caernarfon. The first is a new shower circuit in a
            1970s semi on a TN-C-S supply — a single radial, board to shower switch to shower. The
            second is a barn conversion outside town on a TT supply, with a long single-phase radial
            running out to a workshop at the far end of the yard. Your supervisor asks you to list the
            instruments you are taking before you load the van, and to say why for each one.
          </>
        }
        whatToDo={
          <>
            Both jobs get the two-pole voltage indicator and its proving unit first, because nothing
            starts until the circuit is proved dead and the proving routine needs both halves of that
            pairing. Both get the multifunction tester — low-resistance range for R1+R2 and for
            polarity, and 500 V DC for insulation resistance line to neutral, line to earth and neutral
            to earth. The shower circuit needs nothing more on the dead sequence. The barn needs two
            additions. First, the earth electrode resistance function, because the installation relies
            on its own electrode; check the model you are taking actually carries it before you leave.
            Second, a wander lead long enough to reach the workshop from the board — a 20 m lead rather
            than a 10 m one, measured against the actual run rather than guessed. Check the leads for
            finger guards, a 4 mm exposed tip and no chips in the moulding before either job starts.
          </>
        }
        whyItMatters={
          <>
            The two circuits are electrically almost the same and the instrument list is not. That is
            the whole of criterion 1.1 in one morning. Turning up at the barn with a 10 m wander lead
            and a tester that does not carry an electrode function costs you a second visit, and the
            client is the one who notices. Selecting instruments is a planning task done at the van
            door, not an improvisation done at the board.
          </>
        }
      />

      <SectionRule />

      <FAQ
        items={[
          {
            question: 'Do I need a separate insulation tester if I already carry a multifunction tester?',
            answer:
              'Not for a standard single-phase circuit. The multifunction tester carries the 250 V, 500 V and 1000 V DC insulation ranges built in. Standalone insulation testers such as the Megger MIT2500 or Fluke 1577 exist for work outside the normal low-voltage installation case, but for verification of a domestic or small commercial single-phase final circuit the multifunction tester is the selection.',
          },
          {
            question: 'Why is polarity listed as a de-energised test if there is no polarity instrument?',
            answer:
              'Because it is verified by continuity, not by voltage. With the circuit dead you link at the board and check from the origin through to each accessory on the low-resistance range. That catches a single-pole device landed in the neutral, or a line and neutral transposed at an accessory, before anything is energised. There is a second half to polarity that lives in the visual inspection, where conductor identification at each accessory is checked by eye.',
          },
          {
            question: 'Can I use the same instrument at a socket outlet and at the cut-out?',
            answer:
              'Only if its measurement category covers the higher location. CAT II is appliances and plug-and-cord equipment, CAT III is fixed installation and distribution circuits, CAT IV is the origin. A Fluke 117 at CAT III 600 V is fine at a distribution board and wrong at the cut-out. A Fluke 87V at CAT III 1000 V and CAT IV 600 V, or a Martindale VI-13800 at CAT IV 600 V, covers the supply side. The leads carry their own rating and limit the pairing.',
          },
          {
            question: 'How do I know which functions the instrument I am borrowing actually has?',
            answer:
              'Check before you load the van, against the test list for the job. The functions that catch people out are earth electrode resistance, which not every budget instrument carries, and lead reach, where a long radial needs a 10 m or 20 m wander lead rather than the standard set. Both are simple to confirm at base and expensive to discover at the far end of a circuit.',
          },
        ]}
      />

      <SectionRule />

      <KeyTakeaways
        points={[
          'The de-energised set on a standard single-phase circuit is continuity, insulation resistance, polarity, and earth electrode resistance where the installation has its own electrode.',
          'Loop impedance, prospective fault current and RCD operating time are live tests and are not part of the dead sequence.',
          'The two-pole voltage indicator and its proving unit are selected first and are never measuring instruments — prove the tester, test the circuit, prove the tester again.',
          'Continuity for verification goes on the dedicated low-resistance range, quoted as 0 to 200 ohms on typical instruments, nulled before the first reading.',
          'Insulation resistance is 250 V DC for SELV and control, 500 V DC for standard low voltage, 1000 V DC above 500 V. A new installation is typically expected above 1 megohm.',
          'Polarity has no instrument of its own — it is verified on the continuity range, from the origin through to every accessory.',
          'A multimeter at around 10 megohms input impedance reads ghost voltages as real; a two-pole indicator at roughly 1 to 5 kilohms loads them to zero. That is why they are not interchangeable.',
          'Instrument selection is also a location decision — CAT II at appliances, CAT III at boards, CAT IV at the origin, with the leads carrying their own rating.',
        ]}
      />

      <SectionRule />

      <ContentEyebrow>Check yourself</ContentEyebrow>

      <Quiz
        questions={quizQuestions}
        title="Selecting instruments for de-energised tests — knowledge check"
      />
    </div>
  );
}
