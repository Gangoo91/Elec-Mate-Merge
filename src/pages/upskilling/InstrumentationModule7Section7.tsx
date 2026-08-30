/**
 * Module 7 · Section 7 — Testing instrument cable
 *
 * Rewritten 2026-08-30. REPOSITIONED from the old outline title "Common wiring
 * faults and loop integrity checks" (that content now belongs to Module 8,
 * fault finding, and to Section 6, which owns the commissioning loop check).
 *
 * 🔴 THIS PAGE OWNS TESTING THE CABLE AS A CABLE. Section 6 explicitly promised
 * it: "A loop check is not a cable test and does not replace one... the cable
 * test comes first." This page pays that debt.
 *
 * 🔴 THE SPINE — TEST THE CABLE, NOT THE LOOP. An insulation test applies a
 * voltage far above anything the circuit was built for. With transmitters and
 * input cards still connected, that voltage lands on the electronics. So the
 * devices come off first, at BOTH ends, and the cable is tested as a cable.
 *
 * 🔴 RAG-VERIFIED AGAINST bs7671_facets (queried 2026-08-30 — NOT recalled):
 *   TABLE 64 test voltages / minimum insulation resistance:
 *     - SELV and PELV .................. 250 V DC, min 0.5 MΩ
 *     - Up to and incl. 500 V (except SELV/PELV) .. 500 V DC, min 1.0 MΩ
 *     - Above 500 V .................... 1000 V DC, min 1.0 MΩ
 *   Reg 643.3.2 = acceptance criteria. Reg 643.3.3 = procedure, which requires
 *   the SEQUENCE: apply insulation tests BEFORE connecting equipment that could
 *   influence the test or BE DAMAGED, then after connecting apply a 250 V DC
 *   test between live conductors and the protective conductor.
 *   NOTE to that reg: manufacturer's instructions may require disconnection of
 *   equipment during 250 V DC tests — it names electronic control gear,
 *   capacitive circuits and filters.
 *   ⚠️ DIVERGENCE, handled deliberately: a gn3 facet gives 1 MΩ for SELV/PELV
 *   at 250 V DC where SPDs may be affected, against Table 64's 0.5 MΩ. Page
 *   states the Table 64 figure as the Regulations' value and says guidance may
 *   set a higher acceptance figure — it does NOT present the two as identical.
 *   (Same class of trap as the Zs Cmin 0.95 vs GN3 0.80 divergence.)
 *
 * 🔴 DO NOT ASSERT that every instrument loop is SELV/PELV. Page says "where
 * the circuit is SELV or PELV". The teaching point survives either way: the
 * 500 V reflex carried over from power work is the wrong row of the table.
 *
 * 🔴 THE ORIGINAL CONTRIBUTION — "passing is not the same as accurate".
 * Arithmetic verified in Python before writing, at 24 V:
 *     0.5 MΩ  ->  48 µA  = 0.30% of a 16 mA span
 *     150 kΩ  -> 160 µA  = 1.00% of span
 *      10 kΩ  -> 2.4 mA  = 15% of span
 * So a cable sitting exactly ON the Table 64 minimum still injects ~0.3% of
 * span — comparable to a transmitter's own accuracy spec. Table 64 is a SAFETY
 * threshold, not a measurement-quality threshold. That contribution belongs in
 * the error budget of Module 6 Section 6, and the TREND matters more than the
 * absolute pass. Nothing else in the course makes this point.
 *
 * 🔴 THE SCREEN TEST. Module 3 Section 5 owns WHY a screen is earthed at one
 * end only (92 screen mentions, ground loops). Module 7 Section 2 owns screen
 * continuity through a gland. Neither says HOW YOU PROVE it is earthed at only
 * one end — which is a two-part test (continuous end to end, AND open to earth
 * at the far end). That gap is this page's.
 *
 * ⚠️ VERIFIED CROSS-REFERENCES (grepped before writing, not after):
 *   M3.5 — screen earthed one end only, ground loops   M6.6 — error budgets
 *   M7.2 — glanding and screen continuity   M7.3 — loop budget
 *   M7.5 — barrier earth   M7.6 — commissioning, "cable test comes first"
 *
 * ⚠️ CC BY source — shingle-scanned to ZERO 9-word overlaps. Keep it that way.
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import {
  TLDR,
  ConceptBlock,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
  Pullquote,
  AppendixTable,
  VideoCard,
} from '@/components/study-centre/learning';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Testing instrument cable | Instrumentation Module 7.7 | Elec-Mate';
const DESCRIPTION =
  'Testing instrument cable as a cable — why the devices come off first, which row of BS 7671 Table 64 applies to a 24 V loop, proving a screen is earthed at one end only, and why passing the minimum is not the same as being accurate.';

const outcomes = [
  '🔴 Say why every device must be disconnected before an insulation test',
  'List the tests that make up a cable test and what each one proves',
  '🔴 Identify which row of BS 7671 Table 64 applies to a SELV or PELV loop',
  'Say why the 500 V reflex from power work is wrong for these circuits',
  '🔴 Explain why a cable can pass the minimum and still spoil a measurement',
  'Describe how to prove a screen is earthed at one end only',
  'Say why the trend in insulation resistance matters more than a single pass',
  'Explain why moisture is the usual cause and where it gets in',
];

const quizQuestions = [
  {
    id: 1,
    question:
      '🔴 Why must transmitters and input cards be disconnected before an insulation resistance test?',
    options: [
      'The test applies a voltage far above anything the circuit was designed for, and it would land on the electronics',
      'To make the reading easier to interpret',
      'Because the test needs the loop de-energised',
      'To avoid disturbing the calibration',
    ],
    correctIndex: 0,
    explanation:
      'A 4–20 mA loop runs at around 24 V. An insulation test applies hundreds of volts DC. Connected electronics receive that voltage directly, which is why BS 7671 requires insulation tests to be applied before connecting equipment that could influence the test or be damaged by it.',
  },
  {
    id: 2,
    question:
      '🔴 A 24 V instrument loop forms a SELV circuit. Which row of BS 7671 Table 64 applies?',
    options: [
      '500 V DC, minimum 1.0 MΩ',
      '250 V DC, minimum 0.5 MΩ',
      '1000 V DC, minimum 1.0 MΩ',
      'Whichever the instrument is set to',
    ],
    correctIndex: 1,
    explanation:
      'Table 64 lists SELV and PELV separately at 250 V DC with a minimum of 0.5 MΩ. The 500 V row applies to circuits up to and including 500 V with the exception of SELV and PELV, so it is explicitly not the row for these circuits.',
  },
  {
    id: 3,
    question:
      'Why is reaching for 500 V a genuine hazard on instrument cable rather than just over-testing?',
    options: [
      'It is only a problem on screened cable',
      'It gives a falsely low reading',
      'It is the habit carried over from power work, and it exceeds what these circuits and any attached equipment expect',
      'It takes longer to discharge',
    ],
    correctIndex: 2,
    explanation:
      'The reflex is understandable because 500 V is the routine figure for general low voltage circuits. Applying it to a SELV or PELV circuit uses the wrong row of the table, and if anything has been left connected it applies twice the intended voltage to equipment that was never built for either.',
  },
  {
    id: 4,
    question:
      'What does an insulation test between the two cores of a signal pair actually threaten if it is poor?',
    options: [
      'The screen becomes ineffective',
      'The loop resistance rises',
      'Nothing — only core-to-earth matters',
      'A leakage path that diverts current away from the receiver, so it reads low',
    ],
    correctIndex: 3,
    explanation:
      'In a series current loop the receiver only sees what actually reaches it. A leakage path across the pair provides a route for some of the current to bypass the rest of the loop, so the transmitter regulates one value and the receiver measures a smaller one.',
  },
  {
    id: 5,
    question:
      '🔴 A cable measures exactly 0.5 MΩ and passes. Roughly what error does that leakage contribute on a 24 V loop with a 16 mA span?',
    options: [
      'About 0.3 per cent of span',
      'About 5 per cent of span',
      'About 15 per cent of span',
      'None — it passed',
    ],
    correctIndex: 0,
    explanation:
      '24 V across 0.5 MΩ diverts about 48 µA, which is roughly 0.3 per cent of a 16 mA span. That is comparable to a transmitter’s own accuracy specification — so a cable that passes the regulatory minimum can still be a meaningful contributor to the loop’s error budget.',
  },
  {
    id: 6,
    question: '🔴 What does that tell you about the minimum value in Table 64?',
    options: [
      'It guarantees the measurement will be accurate',
      'It is a safety threshold, not a measurement-quality threshold',
      'It only applies to power circuits',
      'It should be applied twice for instrument circuits',
    ],
    correctIndex: 1,
    explanation:
      'The Regulations set a floor below which insulation is considered unsatisfactory. Nothing about that floor was chosen with a 4–20 mA measurement in mind, so a measurement circuit wants insulation orders of magnitude better than the minimum rather than just above it.',
  },
  {
    id: 7,
    question:
      'Why does a downward trend in insulation resistance matter even while readings still pass?',
    options: [
      'It only matters on unscreened cable',
      'It does not — only the pass or fail matters',
      'It shows a path is developing, and the error it contributes grows as it worsens',
      'It indicates the test instrument needs calibrating',
    ],
    correctIndex: 2,
    explanation:
      'Insulation rarely fails suddenly; moisture ingress degrades it progressively. A reading that has fallen from tens of megohms to two is telling you something is happening, and it is a great deal more informative than a bare pass against a fixed number.',
  },
  {
    id: 8,
    question: '🔴 How do you prove a screen is earthed at one end only?',
    options: [
      'Measure the screen’s resistance to earth at the earthed end',
      'Check the drawing',
      'Measure continuity along the screen',
      'Two tests — continuity end to end, and confirm the screen is open to earth at the far end',
    ],
    correctIndex: 3,
    explanation:
      'Continuity alone proves the screen is intact but says nothing about how many places it is earthed. The second test is what distinguishes a correctly single-earthed screen from one inadvertently earthed at both ends, which is the arrangement Module 3 Section 5 identifies as a ground loop.',
  },
  {
    id: 9,
    question: 'Where does moisture usually enter an instrument cable installation?',
    options: [
      'At the terminations — glands, enclosures and junction boxes',
      'Through the screen',
      'It condenses inside the conductors',
      'Through the cable sheath',
    ],
    correctIndex: 0,
    explanation:
      'Intact sheathing is generally a good barrier. It is the places where the cable has been opened up and something has been fitted that leak, which is exactly why Module 7 Section 2 treats glanding as a sealing job rather than a mechanical one.',
  },
  {
    id: 10,
    question: 'When is a cable test performed relative to the commissioning loop check?',
    options: [
      'Afterwards, to confirm the result',
      'Before — a loop check cannot substitute for it, and a loop can pass while sitting on degraded cable',
      'At the same time',
      'Only if the loop check fails',
    ],
    correctIndex: 1,
    explanation:
      'They answer different questions. Section 6 covers the loop check, which proves a signal arrives correctly; at 24 V and a few milliamps a great deal of insulation degradation causes no immediate symptom, so the cable must be examined as a cable first.',
  },
  {
    id: 11,
    question:
      'A cable test is being carried out and one core cannot be disconnected at the far end. What is the correct response?',
    options: [
      'Test from the far end instead',
      'Test anyway at a reduced voltage',
      'Do not apply the test until it is disconnected, and record what could not be tested if it cannot be',
      'Assume it is satisfactory',
    ],
    correctIndex: 2,
    explanation:
      'Whatever remains connected receives the test voltage, so proceeding risks damaging it and producing a reading that describes the equipment rather than the cable. If the disconnection genuinely cannot be made, the honest outcome is a recorded limitation rather than a test result that means something other than it appears to.',
  },
  {
    id: 12,
    question: 'What should a cable test record contain beyond a pass or fail?',
    options: [
      'The calibration certificate of the transmitter',
      'The loop budget calculation',
      'Only the final verdict',
      'The measured values, the test voltage used, and anything that could not be tested',
    ],
    correctIndex: 3,
    explanation:
      'A recorded value is what makes a future trend visible, and the test voltage is what makes the value meaningful. Noting what was not tested keeps the record honest about its own coverage, which is the same principle Section 6 applies to commissioning records.',
  },
];

const InstrumentationModule7Section7 = () => {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <HubPage>
      <HubMasthead
        section="Module 7 · Section 7"
        title="Testing instrument cable"
        backTo="/electrician/upskilling/instrumentation-module-7"
      />

      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          The loop check proved the signal arrives. This proves the cable it arrives on is sound —
          and it is a different test, done first, with everything disconnected.
        </p>

        <TLDR
          points={[
            'Section 6 proved a signal gets from one end to the other. That is not a cable test and does not replace one.',
            '🔴 Test the cable as a cable: every device off, at both ends, before any test voltage is applied.',
            'An insulation test applies hundreds of volts to a circuit built for 24 — connected electronics receive all of it.',
            'BS 7671 requires insulation tests before connecting equipment that could influence the test or be damaged by it.',
            '🔴 Table 64: SELV and PELV are tested at 250 V DC with a minimum of 0.5 MΩ.',
            'The 500 V / 1.0 MΩ row applies to circuits up to 500 V with the exception of SELV and PELV — so it is the wrong row here.',
            '🔴 The 500 V reflex carried over from power work is the mistake worth naming.',
            'Test core to core, each core to earth, each core to screen, and the screen itself.',
            '🔴 A cable sitting exactly on 0.5 MΩ still diverts about 48 µA — roughly 0.3% of a 16 mA span.',
            '🔴 So Table 64 is a safety threshold, not a measurement-quality threshold. Put the contribution in the error budget.',
            'The trend matters more than the pass — insulation degrades progressively rather than failing suddenly.',
            'Prove a screen is earthed at ONE end: continuous end to end, AND open to earth at the far end.',
            'Moisture gets in at terminations, not through intact sheath — which is why glanding is a sealing job.',
            'Record measured values and the test voltage, plus anything that could not be tested.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <ContentEyebrow>🔴 Test the cable, not the loop</ContentEyebrow>

        <ConceptBlock
          title="Everything comes off first"
          plainEnglish="An insulation test applies hundreds of volts. The loop runs on 24. Anything still connected gets the difference."
          onSite="This is the rule on the page most likely to save you the cost of a transmitter."
        >
          <p>
            Section 6 finished with a promise worth honouring:{' '}
            <strong>a loop check is not a cable test</strong>. The loop check proves a signal
            injected at one end arrives correctly at the other. It says nothing about the condition
            of the insulation carrying it, because at 24 V and a few milliamps a great deal of
            degradation produces no symptom at all.
          </p>
          <p>
            Testing the cable properly means testing it <strong>as a cable</strong> &mdash; and that
            phrase carries a hard requirement.
          </p>
          <p>
            🔴 An insulation resistance test works by applying a substantial DC voltage and
            measuring the current that leaks. That voltage is hundreds of volts.{' '}
            <strong>
              The circuit it is being applied to was designed around 24 V, and every device on it
              was designed for that.
            </strong>{' '}
            A transmitter or an input card left connected does not politely ignore the test voltage.
            It receives it.
          </p>
          <p>
            This is not merely good practice.{' '}
            <strong>
              BS 7671 sets out the sequence explicitly: apply the insulation tests before connecting
              equipment that could influence the test or be damaged by it
            </strong>
            , and only afterwards, with equipment connected, apply a 250 V DC test between live
            conductors and the protective conductor. The Regulations anticipate exactly this
            problem.
          </p>
          <p>
            The accompanying note is worth knowing too, because it names the culprits.{' '}
            <strong>
              Manufacturers&rsquo; instructions may require particular equipment to be disconnected
              during testing, because it can influence the result
            </strong>{' '}
            &mdash; electronic control gear, capacitive circuits and filters are the examples given.
            Instrumentation is made almost entirely of those things.
          </p>
          <p>
            So there are two independent reasons to disconnect, and they point the same way:{' '}
            <strong>
              connected equipment may be damaged by the test, and it will corrupt the reading even
              if it survives
            </strong>
            . A measurement taken with a transmitter still on the end describes the
            transmitter&rsquo;s input circuitry, not the cable.
          </p>
          <p>
            🔴 &ldquo;Both ends&rdquo; is the part that gets missed. Disconnecting at the
            marshalling cabinet and leaving the field transmitter connected leaves the transmitter
            exposed to the full test voltage &mdash; the same asymmetry that Section 6 warned about
            for a different reason.
          </p>
        </ConceptBlock>

        <Pullquote>
          A loop that works proves the signal got through. It proves nothing whatever about how
          close the insulation is to giving up.
        </Pullquote>

        <SectionRule />
        <ContentEyebrow>What the test consists of</ContentEyebrow>

        <ConceptBlock
          title="Four questions about a piece of cable"
          plainEnglish="Is it continuous, is it isolated from earth, are the cores isolated from each other, and is the screen doing what it should?"
          onSite="Each answers a different failure, and skipping one leaves that failure undetected."
        >
          <p>
            With the cable disconnected at both ends, the tests break down into a small set, each
            aimed at something specific.
          </p>
          <AppendixTable
            caption="What each test establishes"
            headers={['Test', 'What it proves', 'The fault it catches']}
            rows={[
              [
                'Continuity of each core',
                'The conductor is unbroken end to end',
                'A break, or a core landed on the wrong terminal',
              ],
              [
                'Insulation, core to core',
                'The pair are isolated from one another',
                'A leakage path that steals signal current',
              ],
              [
                'Insulation, each core to earth',
                'Neither core is finding a path to earth',
                'Damaged sheath, wet gland, trapped conductor',
              ],
              [
                'Insulation, each core to screen',
                'The screen is isolated from the signal pair',
                'A nicked core at a termination, damage under a gland',
              ],
              [
                'Screen continuity end to end',
                'The screen is intact along its length',
                'A screen broken at a junction box',
              ],
              [
                '🔴 Screen isolation at the far end',
                'The screen is earthed in one place only',
                'A second, unintended earth — a ground loop',
              ],
            ]}
            notes="The last two are a pair. Continuity alone does not tell you how many places the screen is earthed."
          />
          <p>
            The core-to-core test deserves a note, because on a signal circuit it matters in a way
            that is easy to underrate.{' '}
            <strong>
              A 4&ndash;20 mA loop is a series circuit, and the receiver only measures the current
              that actually reaches it.
            </strong>{' '}
            A leakage path between the two conductors gives some of that current a route around the
            rest of the loop, so the transmitter regulates one value and the receiver sees a smaller
            one.
          </p>
          <p>
            The reading is low, stable, and entirely believable &mdash; which puts it in the same
            family as the faults the rest of this module has been about.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="🔴 Continuity proves a core is unbroken, not that it is the right core"
          plainEnglish="A conductor can be perfectly continuous and land on completely the wrong terminal."
          onSite="This is the cable-level version of the transposition Section 6 was about."
        >
          <p>
            Continuity is the simplest test on the list and the easiest to over-read. It answers one
            question: is there an unbroken conductor between these two points?{' '}
            <strong>
              It does not answer whether that conductor is the one the drawing says it is.
            </strong>
          </p>
          <p>
            On a multi-pair cable that distinction is the whole game. Testing each core in turn and
            finding every one continuous is entirely consistent with{' '}
            <strong>pairs being landed in the wrong order at one end</strong>, or a spare pair
            having been pressed into service without the drawing being updated. Every reading is
            good and the installation is wrong &mdash; which is exactly the pattern Section 6
            described for whole loops, arriving here one level lower down.
          </p>
          <p>
            What separates the two is identification rather than measurement. The test has to tie a{' '}
            <strong>specific conductor at one end</strong> to a{' '}
            <strong>specific conductor at the other</strong>, which means proving continuity{' '}
            <em>and</em> proving isolation from the cores you were not expecting:
          </p>
          <ul>
            <li>
              <strong>Identify at both ends</strong> against the numbering and identification scheme
              Section 4 covered, not against the order the cores happen to appear in.
            </li>
            <li>
              <strong>Confirm the core is isolated from the others</strong>, not merely continuous
              to the one you expected. A core continuous to the right terminal and also to a
              neighbour has a fault the continuity test alone will not show.
            </li>
            <li>
              <strong>Work one conductor at a time</strong> with the rest free, so a result cannot
              be produced by an unintended path through another core.
            </li>
          </ul>
          <p>
            The insulation tests already described do most of the second job, which is a good reason
            to treat continuity and insulation as one exercise on the same cable rather than as
            separate visits. Between them they establish that each core goes where it should{' '}
            <strong>and nowhere else</strong>, which is the actual requirement.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>🔴 Which row of the table</ContentEyebrow>

        <ConceptBlock
          title="A 24 V loop is not a 500 V circuit"
          plainEnglish="The test voltage depends on what kind of circuit it is, and instrument loops are usually the low row, not the routine one."
          onSite="Reaching for 500 V out of habit is the specific mistake to unlearn here."
        >
          <p>
            BS 7671 sets the test voltages and the minimum acceptable values in{' '}
            <strong>Table 64</strong>, and the row that applies depends on the circuit:
          </p>
          <AppendixTable
            caption="BS 7671 Table 64 — test voltage and minimum insulation resistance"
            headers={['Circuit', 'DC test voltage', 'Minimum insulation resistance']}
            rows={[
              ['🔴 SELV and PELV', '250 V', '0.5 MΩ'],
              ['Up to and including 500 V, except SELV and PELV', '500 V', '1.0 MΩ'],
              ['Above 500 V', '1000 V', '1.0 MΩ'],
            ]}
            notes="The middle row explicitly excludes SELV and PELV, so those circuits are not tested with it."
          />
          <p>
            🔴 The point for instrument work follows directly.{' '}
            <strong>
              Where the loop forms a SELV or PELV circuit &mdash; as a 24 V instrument supply
              commonly does &mdash; it is the first row that applies, not the familiar one.
            </strong>{' '}
            The 500 V row is written to exclude these circuits rather than to cover them.
          </p>
          <p>
            That matters because <strong>500 V is the reflex</strong>. It is the routine figure for
            general low voltage work, the setting the instrument is probably still on, and the
            number most electricians would give without thinking. Carried onto an instrument circuit
            it does two things at once: it applies twice the intended test voltage, and if anything
            has been left connected it applies that to equipment built for a fraction of it.
          </p>
          <p>
            Worth being clear about scope: the minimum values above are the acceptance criteria in
            the Regulations.{' '}
            <strong>
              Guidance and project specifications may set a higher acceptance figure in particular
              circumstances
            </strong>
            , and where a site has its own documented requirement, that is the one to work to. What
            does not vary is which row of the table the circuit belongs to.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="🔴 Testing an instrument loop at 500 V with the transmitter still on"
          whatHappens={
            <>
              <p>
                The test instrument is already set to 500 V from the last job. The cable is
                disconnected at the marshalling cabinet, which feels like disconnecting it. The test
                is applied, a healthy figure appears, the loop is recorded as satisfactory.
              </p>
              <p>
                🔴 Two things have gone wrong and neither announces itself.{' '}
                <strong>
                  The wrong row of Table 64 has been used, and the field transmitter has just
                  received 500 V DC on its terminals.
                </strong>
              </p>
              <p>
                The damage is often not immediate or total. A transmitter can survive with degraded
                input circuitry &mdash; increased drift, a shifted zero, greater temperature
                sensitivity &mdash; and continue to work. It goes back into service, passes a loop
                check because it still produces a plausible signal, and starts misbehaving weeks
                later.
              </p>
              <p>
                By then the connection to the test is long gone. The instrument gets recalibrated,
                drifts again, and is eventually replaced as faulty without anybody establishing why
                a sound device deteriorated.
              </p>
            </>
          }
          doInstead={
            <>
              <p>
                Treat disconnection and test voltage as two separate checks to make before the
                button is pressed, because they fail independently.
              </p>
              <ul>
                <li>
                  <strong>Disconnect at both ends and confirm it.</strong> Not &ldquo;the cabinet
                  end is out&rdquo; but both, physically verified. This is the step that protects
                  the equipment.
                </li>
                <li>
                  <strong>Set the voltage deliberately for this circuit</strong> rather than
                  inheriting it from the previous job. For a SELV or PELV loop that is 250 V.
                </li>
                <li>
                  <strong>Record the voltage used alongside the value.</strong> A resistance figure
                  without the test voltage is close to meaningless, and it is what makes a future
                  comparison valid.
                </li>
              </ul>
              <p>
                If a device genuinely cannot be disconnected &mdash; access, plant state, a sealed
                assembly &mdash; <strong>the test does not proceed on that section</strong>. The
                honest outcome is a recorded limitation saying what was not tested and why. That is
                far more useful than a reading that describes an input circuit, and infinitely
                better than a damaged instrument.
              </p>
            </>
          }
        />

        <InlineCheck
          id="ins-7-7-voltage"
          question="An instrument technician is about to insulation test a 24 V SELV instrument loop. The tester is set to 500 V from a previous job. What is wrong with proceeding?"
          options={[
            'It is the wrong row of Table 64 for a SELV circuit, and anything left connected receives 500 V',
            'The reading will be too low to interpret',
            'The test will take longer to complete',
            'Nothing, provided the cable is disconnected',
          ]}
          correctIndex={0}
          explanation="Table 64 lists SELV and PELV at 250 V DC, and the 500 V row is written to exclude them. Even with the cable disconnected the wrong row has been used; if anything remains connected, the error becomes an equipment-damaging one as well as a procedural one."
        />

        <SectionRule />
        <ContentEyebrow>🔴 Passing is not the same as accurate</ContentEyebrow>

        <ConceptBlock
          title="What the minimum value was chosen for"
          plainEnglish="The regulatory minimum is a safety floor. A measurement circuit needs to be far better than the floor."
          onSite="This is the reasoning that turns a pass or fail into a useful judgement."
        >
          <p>
            A cable measures 0.5 MΩ core to earth. It meets the Table 64 minimum for a SELV circuit,
            so it passes. The question worth asking is what that leakage actually does to the
            measurement.
          </p>
          <p>
            The arithmetic is straightforward. With roughly <strong>24 V</strong> across the loop
            and a leakage path of <strong>0.5 MΩ</strong>:
          </p>
          <ul>
            <li>
              Leakage current = 24 V &divide; 0.5 MΩ = <strong>about 48 µA</strong>
            </li>
            <li>
              As a proportion of a 16 mA span, that is <strong>about 0.3 per cent</strong>
            </li>
          </ul>
          <p>
            🔴 That is not negligible.{' '}
            <strong>
              It is comparable to the accuracy specification of the transmitter itself
            </strong>{' '}
            &mdash; so a cable that has just passed the regulatory minimum is contributing an error
            of the same order as the instrument whose accuracy everybody worries about.
          </p>
          <AppendixTable
            caption="Leakage against measurement error, at 24 V on a 16 mA span"
            headers={['Insulation resistance', 'Leakage current', 'Error as % of span']}
            rows={[
              ['0.5 MΩ — the Table 64 minimum', 'about 48 µA', 'about 0.3%'],
              ['150 kΩ', 'about 160 µA', 'about 1.0%'],
              ['10 kΩ — a thoroughly wet joint', 'about 2.4 mA', 'about 15%'],
            ]}
            notes="Figures are order-of-magnitude: the actual voltage across a leakage path depends where in the loop it sits."
          />
          <p>
            The conclusion is the useful part.{' '}
            <strong>Table 64 sets a safety threshold, not a measurement-quality threshold.</strong>{' '}
            Nothing about that figure was chosen with a 4&ndash;20 mA signal in mind. A measurement
            circuit wants insulation that is orders of magnitude better than the minimum &mdash;
            tens or hundreds of megohms &mdash; and a reading that has merely scraped over the line
            should be read as a finding rather than a pass.
          </p>
          <p>
            It also means the contribution belongs somewhere specific. Module 6 Section 6 covered
            combining error contributions across a loop, and{' '}
            <strong>a marginal cable is one of those contributions</strong>. It is easy to leave out
            because it passed a different test with a different purpose.
          </p>
          <p>
            🔴 Which is why <strong>the trend matters more than the pass</strong>. Insulation rarely
            fails all at once; moisture works in gradually and the resistance falls over months. A
            cable that read 200 MΩ at installation and reads 2 MΩ today is comfortably passing and
            telling you something important. Recording the measured value rather than a tick is what
            makes that visible at all.
          </p>
        </ConceptBlock>

        <VideoCard
          url={videos.insulationResistanceReadings.url}
          title={videos.insulationResistanceReadings.title}
          channel={videos.insulationResistanceReadings.channel}
          duration={videos.insulationResistanceReadings.duration}
          topic="Watch · What the readings actually tell you"
          caption="Short and worth it for the habit it builds: reading the value rather than the pass. It is filmed on general installation work rather than instrument circuits, so carry two things across as you watch. The row of Table 64 changes — a SELV or PELV loop is tested at 250 V, not 500 V. And the acceptance figure means less here than it does there, because the arithmetic above shows a cable can clear the minimum and still contribute a measurable error to the signal."
        />

        <InlineCheck
          id="ins-7-7-trend"
          question="A cable recorded 200 MΩ at installation and reads 2 MΩ at a routine check. It passes the minimum comfortably. What is the sensible reading of that?"
          options={[
            'It passes, so no action is needed',
            'A hundredfold fall indicates a developing path — worth investigating before it degrades further',
            'The test instrument is faulty',
            'The cable should be replaced immediately',
          ]}
          correctIndex={1}
          explanation="A pass against a fixed floor is the least informative thing the measurement can tell you. The change is the signal: something has altered along that cable, and the error it contributes grows as the resistance continues to fall."
        />

        <SectionRule />
        <ContentEyebrow>Proving the screen</ContentEyebrow>

        <ConceptBlock
          title="🔴 Continuous end to end, and earthed in one place"
          plainEnglish="Two separate tests. One proves the screen exists all the way along. The other proves it is only earthed once."
          onSite="Module 3 Section 5 explains why one end. This is how you demonstrate it."
        >
          <p>
            Module 3 Section 5 established the principle:{' '}
            <strong>a screen is earthed at one end only</strong>, because earthing it at both
            creates a loop in which circulating current can flow &mdash; the ground loop that
            section describes in detail. Module 7 Section 2 covered maintaining screen continuity
            through a gland where the design calls for it.
          </p>
          <p>
            Neither of those tells you how to <strong>prove</strong> the installed screen matches
            the intent, and it takes two tests rather than one:
          </p>
          <ul>
            <li>
              <strong>Continuity along the screen, end to end.</strong> This proves the screen is
              intact &mdash; that it has not been left unconnected in a junction box partway along,
              which would leave a length of cable effectively unscreened.
            </li>
            <li>
              🔴{' '}
              <strong>
                Isolation between the screen and earth at the end that is meant to be free.
              </strong>{' '}
              This is the test that proves the screen is earthed in one place rather than two.
            </li>
          </ul>
          <p>
            The second test is the one usually skipped, and it is the one that catches the more
            common fault.{' '}
            <strong>
              A screen inadvertently earthed at both ends is continuous, well terminated, and looks
              entirely correct
            </strong>{' '}
            &mdash; a screen touching an earthed gland body at the far end, or a drain wire landed
            on an earth bar because it was the obvious place for it.
          </p>
          <p>
            Its symptom is not a failure but noise: the signal develops an interference problem
            which appears intermittently and gets attributed to almost anything else. Module 3
            Section 5 covers telling a genuine ground loop from a coupling problem, and a screen
            isolation test at installation is what stops the question arising.
          </p>
          <p>
            A practical note on sequence: since the point of the test is to find an{' '}
            <em>unintended</em> earth, it has to be done with the intended earth connection lifted
            or the far end examined in isolation. Testing screen-to-earth at the end that is
            deliberately earthed simply confirms the connection you made on purpose.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Where it goes wrong</ContentEyebrow>

        <ConceptBlock
          title="Water gets in where you opened the cable"
          plainEnglish="Sheath keeps water out. Glands, boxes and terminations are where it gets in."
          onSite="Which is why almost every insulation problem is found at a termination."
        >
          <p>
            Insulation problems on instrument cable are overwhelmingly moisture problems, and they
            are overwhelmingly found in the same places.
          </p>
          <p>
            <strong>Intact sheathing is a good barrier.</strong> Cable that has been installed
            without damage and left alone tends to stay dry inside. The failures occur where the
            cable was opened up and something was fitted to it &mdash; which is exactly why Section
            2 treats glanding as an environmental sealing job first and a mechanical one second.
          </p>
          <p>The usual locations, in rough order of likelihood:</p>
          <ul>
            <li>
              <strong>Glands</strong> not correctly made off, or of the wrong type for the position
              &mdash; the seal is either not made or not maintained.
            </li>
            <li>
              <strong>Junction boxes and enclosures</strong> whose lids have been left loose, whose
              seals have perished, or which are mounted so water collects on them.
            </li>
            <li>
              <strong>Unused entries</strong> left open or blanked with something that is not a
              blank.
            </li>
            <li>
              <strong>Cable damage</strong> from installation or later work &mdash; a crushed or
              nicked sheath that admits water some distance from where the symptom appears.
            </li>
          </ul>
          <p>
            The diagnostic value of this is real:{' '}
            <strong>a low insulation reading points at a place, not just a condition</strong>.
            Rather than condemning a cable run, the first move is to open the terminations at each
            end and look &mdash; water in an enclosure, corrosion on terminals, or a gland that is
            visibly wrong is a far more likely explanation than the cable itself having failed along
            its length.
          </p>
          <p>
            Testing a run in sections, where junction boxes allow it, turns the same reading into a
            location. That is worth doing before anybody proposes pulling in a replacement.
          </p>
        </ConceptBlock>

        <Scenario
          title="A loop that drifts, on cable that passes"
          situation={
            <>
              <p>
                A level transmitter in an outdoor location has been recalibrated twice in six
                months. Each time it is found slightly out, adjusted, and returns to service. It
                drifts again within weeks. The transmitter has been replaced once, with no
                improvement.
              </p>
              <p>
                A cable test is carried out. Core to earth reads 0.8 MΩ. It passes the minimum for a
                SELV circuit, so the cable is recorded as satisfactory and attention returns to the
                instrument.
              </p>
            </>
          }
          whatToDo={
            <>
              <p>
                Stop and read the cable figure properly, because it is the most informative number
                in the story and it has just been dismissed.
              </p>
              <p>
                <strong>
                  0.8 MΩ on instrument cable is not a healthy reading that happens to be near a
                  limit. It is a poor reading that happens to be above one.
                </strong>{' '}
                Sound instrument cable in a dry installation reads in the tens or hundreds of
                megohms. A figure under a megohm says a leakage path exists and is well developed.
              </p>
              <p>
                The arithmetic makes the connection to the symptom: at 24 V, 0.8 MΩ diverts roughly
                30 µA, which is around 0.2 per cent of span &mdash; the right order of magnitude to
                produce exactly the small, persistent offset that keeps being calibrated out.
              </p>
              <p>
                🔴 And it explains why replacing the transmitter changed nothing.{' '}
                <strong>
                  The error is in the path, not the instrument, so a new instrument inherits it
                  immediately.
                </strong>{' '}
                Every recalibration was compensating a cable fault by adjusting a device that was
                already correct.
              </p>
              <p>
                The drift over weeks fits too: a moisture path is not stable. It changes with
                weather and temperature, so the offset it produces wanders &mdash; which is
                precisely the behaviour that had everybody looking at the instrument.
              </p>
              <p>
                The next step is to locate it rather than test again. Open the terminations at both
                ends and look for water, check the glanding on an outdoor enclosure, and if junction
                boxes permit it, test the run in sections to narrow down where the path is. Compare
                against any installation reading on record, because the size of the fall is itself
                evidence.
              </p>
            </>
          }
          whyItMatters={
            <>
              <p>
                Everything in this story was done competently against the standard being applied.
                The cable was tested, the result was compared with the minimum, and the minimum was
                met. The mistake was treating a regulatory floor as a statement about measurement
                quality.
              </p>
              <p>
                It also shows how a pass can cost more than a fail. Because the cable was recorded
                as satisfactory, it was removed from consideration &mdash; and a transmitter was
                replaced, twice adjusted, and the real fault left in place, growing.
              </p>
            </>
          }
        />

        <FAQ
          items={[
            {
              question: 'Can I insulation test with the barrier still in circuit?',
              answer:
                'No — an intrinsic safety barrier is exactly the kind of electronic assembly that must come out of circuit first. Section 5 describes what is inside a zener barrier: shunt diodes that conduct above a set voltage. Applying a test voltage of hundreds of volts to that will drive the zeners hard into conduction, which both risks the barrier and guarantees a meaningless reading, because what you would be measuring is the barrier conducting rather than the cable leaking. Disconnect it and test the field cable on its own.',
            },
            {
              question:
                'Section 5 said a barrier earth should be tested rather than inspected. How?',
              answer:
                'By measuring it, which is the whole point of the distinction. A zener barrier’s earth carries protective fault current, so what matters is that it presents a genuinely low resistance — and a connection can look entirely sound while being high-resistance through corrosion, paint under a tag, or a screw that was never fully tightened. None of that is visible. A low-resistance continuity measurement between the barrier’s earth terminal and the earthing point it relies on is what actually establishes the connection is there, and it is quick. The acceptance value comes from the standards governing that installation rather than from a general figure. The reason this gets missed is the one Section 5 gave: the earth is not on the signal path, so every check that exercises the loop passes regardless of its condition.',
            },
            {
              question: 'How often should instrument cable be tested?',
              answer:
                'Intervals come from the site’s own maintenance regime and any applicable inspection requirements rather than from a general rule, and the useful principle is that the value of repeat testing lies almost entirely in comparison. A single reading tells you whether the cable passes today; a series of readings tells you what is happening to it. That argues for testing consistently — same points, same test voltage, values recorded — rather than for any particular frequency, and for prioritising outdoor and wet locations, which is where the degradation actually occurs.',
            },
            {
              question: 'What if the reading is fine but the loop is noisy?',
              answer:
                'Insulation resistance and noise are largely independent problems, so a good insulation reading does not resolve a noise complaint. Module 3 Section 5 covers noise properly — whether the coupling is capacitive or inductive, and what a screen fixes as against what twisting fixes. The one overlap worth checking on this page is the screen tests above: a screen that is broken partway along, or earthed at both ends rather than one, produces noise while every insulation reading stays perfect.',
            },
            {
              question: 'Does a cable test replace the commissioning loop check?',
              answer:
                'No, and the two are not substitutes in either direction. A cable test examines the cable with everything disconnected, which is the only way to assess insulation honestly. A loop check examines the assembled signal path with everything connected, which is the only way to find out whether the right signal reaches the right place. A cable can be in excellent condition and connected to the wrong input, which is Section 6’s transposition; and a loop can pass end to end on cable that is close to failing. Both are done, cable test first.',
            },
            {
              question: 'Why record the test voltage as well as the value?',
              answer:
                'Because the value has no meaning without it. The same cable tested at 250 V and at 500 V will not necessarily give the same figure, so a bare resistance recorded without the voltage cannot be compared with anything later — which removes the trend information that is the main reason for keeping records. It also documents that the correct row of Table 64 was applied, which matters if the circuit is SELV or PELV and the reflex figure is 500 V.',
            },
            {
              question: 'The cable tests fine and the loop reads wrong. What now?',
              answer:
                'That is a useful result rather than a dead end, because it has eliminated a whole category. Module 6 Section 2 sets out the technique that follows: inject a simulated signal at the field end and see whether the receiving instruments respond correctly. If they do, the cable and the entire receiving chain are sound and the transmitter or its process connection is the problem. If they do not, the fault is on the receiving side. That single test divides the system in two, and a clean cable test has already removed one of the more tedious possibilities from it.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'A loop check and a cable test answer different questions. Both are done, and the cable test comes first.',
            '🔴 Test the cable as a cable — every device disconnected, at BOTH ends, before any test voltage is applied.',
            'An insulation test applies hundreds of volts to a circuit designed around 24 V; connected electronics receive all of it.',
            'BS 7671 requires insulation tests before connecting equipment that could influence the test or be damaged by it.',
            'The accompanying note names electronic control gear, capacitive circuits and filters — instrumentation is made of those.',
            '🔴 Table 64: SELV and PELV are tested at 250 V DC, minimum 0.5 MΩ.',
            'The 500 V / 1.0 MΩ row covers circuits up to 500 V WITH THE EXCEPTION of SELV and PELV.',
            '🔴 The 500 V reflex from power work is the specific habit to unlearn on instrument circuits.',
            'Test core to core, each core to earth, each core to screen, screen continuity, and screen isolation at the far end.',
            'A core-to-core leakage path diverts signal current around the loop, so the receiver reads low, stable and believable.',
            '🔴 A cable exactly on 0.5 MΩ diverts about 48 µA at 24 V — roughly 0.3% of a 16 mA span.',
            '🔴 So Table 64 is a safety threshold, not a measurement-quality threshold. Instrument cable should read far better than the minimum.',
            'A marginal cable is a real contributor to the loop error budget of Module 6 Section 6, and is easily left out of it.',
            '🔴 The trend matters more than the pass — 200 MΩ falling to 2 MΩ passes comfortably and is telling you something.',
            'Proving a screen takes two tests: continuous end to end, AND open to earth at the end meant to be free.',
            'A screen earthed at both ends looks perfect and produces intermittent noise — Module 3 Section 5 covers why.',
            'Moisture enters at terminations, not through intact sheath, so a low reading points at a place as well as a condition.',
            'Record measured values and the test voltage used, plus anything that could not be tested and why.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself — Module 7.7" />

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-7-section-6')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-left touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              <ChevronLeft className="h-3 w-3" /> Previous section
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Commissioning a loop
            </span>
          </button>
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-7')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-right touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center justify-end gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              Module complete <ChevronRight className="h-3 w-3" />
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Back to Module 7
            </span>
          </button>
        </div>
      </HubBody>
    </HubPage>
  );
};

export default InstrumentationModule7Section7;
