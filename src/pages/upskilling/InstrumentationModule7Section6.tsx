/**
 * Module 7 · Section 6 — Commissioning a loop
 *
 * Rewritten 2026-08-30. REPOSITIONED from the old outline title "Loop testing
 * tools (loop calibrators, simulators, multimeters)".
 *
 * 🔴 WHY REPOSITIONED — audit finding. Module 6 Section 2 ("Equipment and
 * standards") ALREADY OWNS the tools outright: 47 mentions of simulate, 11 of
 * loop calibrator, read/source/simulate modes, the 4-8-12-16-20 mA injection,
 * the list of what that exercises (cable, isolators, input card, ranging,
 * display, alarms) and the key insight that it "divides the system cleanly in
 * two". Writing tools here would have duplicated an existing page wholesale.
 * Verified by grep before writing, not after.
 *
 * 🔴 SO THIS PAGE OWNS COMMISSIONING AS AN ACTIVITY, which nothing else covers.
 * The organising distinction, and the spine of the page:
 *   CALIBRATION (Module 6) asks — is this device accurate?
 *   COMMISSIONING asks — is the RIGHT device wired to the RIGHT input, reading
 *   the RIGHT way round, in the RIGHT units, and does the WHOLE CHAIN agree?
 * A perfectly calibrated transmitter on the wrong input passes every
 * calibration check ever devised and fails commissioning. That gap is the page.
 *
 * 🔴 THE CENTREPIECE — CROSSED LOOPS. Two transmitters transposed. Each loop is
 * individually flawless: right calibration, right range, right signal, correct
 * display. Nothing is faulty. Verified by grep that this is UNCOVERED anywhere
 * in Modules 1-8 (all "crossed"/"swapped" hits are incidental — threshold
 * crossed, sensor swapped-for-new). It fits the module's running theme of
 * faults with no symptom, and it is the fault that justifies the whole
 * discipline of injecting AT THE FIELD DEVICE rather than at the marshalling
 * cabinet — which is the single practical rule this page exists to teach.
 *
 * 🔴 SOURCE-GROUNDED (Kuphaldt §13.7, the loop calibrator simulate-mode passage
 * at /tmp/kup.txt:35820-35835). Verbatim facts available:
 *   - simulate mode tests "the transmitter cable and controller input"
 *   - performed on newly-installed systems as part of the commissioning
 *     procedure, PRIOR TO START-UP of the controlled process
 *   - verifies the controller's PV input, the 24 VDC supply, and transmitter
 *     wiring are all functioning
 *   - method: simulate several values while SOMEONE ELSE monitors the
 *     controller's PV display AND ALARMS
 * That last detail grounds the two-person working section — it is a real
 * two-person activity with a communication protocol, not a solo task.
 *
 * ⚠️ VERIFIED CROSS-REFERENCES (all grepped before writing):
 *   M6.2 — calibrator modes + 5-point injection + "divides the system in two"
 *   M6.6 — error combination, "before commissioning rather than after a dispute"
 *   M3.4 — double square-root extraction, called a classic commissioning fault
 *   M7.1 — loop diagram   M7.2 — terminations   M7.3 — devices fill the budget
 *   M7.5 — the barrier earth that fails silently
 * Do NOT re-teach any of them. Reference and move on.
 *
 * ⚠️ CC BY source — shingle-scanned to ZERO 9-word overlaps. Keep it that way.
 * ⚠️ Do NOT invent standards, hold-point regimes or documentation requirements.
 * Commissioning regimes are contractual and site-specific; teach the reasoning.
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
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Commissioning a loop | Instrumentation Module 7.6 | Elec-Mate';
const DESCRIPTION =
  'Why commissioning asks a different question from calibration, how an end-to-end loop check is run before start-up, and the transposed-loop fault that leaves every individual loop looking perfect.';

const outcomes = [
  '🔴 State the question commissioning asks that calibration does not',
  'Say why a perfectly calibrated transmitter can still fail commissioning',
  'List what must be complete before a loop check can begin',
  'Describe how an end-to-end loop check is run and who does what',
  '🔴 Explain why the injection point must be the field device, not the cabinet',
  '🔴 Describe the transposed-loop fault and why nothing looks wrong',
  'Explain why both ends of a loop must be checked for range and direction',
  'Say why proving a trip means observing the action, not the number',
];

const quizQuestions = [
  {
    id: 1,
    question: '🔴 What question does commissioning ask that calibration does not?',
    options: [
      'Whether the right device is wired to the right input and the whole chain agrees',
      'Whether the device drifts over time',
      'Whether the loop budget is sufficient',
      'Whether the device meets its accuracy specification',
    ],
    correctIndex: 0,
    explanation:
      'Calibration is a question about one device in isolation — is it accurate? Commissioning is a question about the installation as built — is this the right device, in the right place, connected to the right input, reading the right way round. A device can be perfect and the installation still wrong.',
  },
  {
    id: 2,
    question:
      'A transmitter is calibrated to specification on the bench and installed. It is wired to the wrong controller input. What happens at calibration checks?',
    options: [
      'They fail, revealing the error',
      'They pass — calibration examines the device, not what it is connected to',
      'They pass only if the two loops have the same range',
      'They cannot be performed until commissioning is complete',
    ],
    correctIndex: 1,
    explanation:
      'Every calibration check is satisfied because the device genuinely is accurate. The error is in the installation rather than the instrument, which is precisely the class of fault commissioning exists to catch and calibration structurally cannot.',
  },
  {
    id: 3,
    question: 'Why can a loop check not sensibly begin before the installation is complete?',
    options: [
      'The controller cannot be powered until handover',
      'The calibrator will be damaged',
      'A check on an unfinished loop proves something about an arrangement that will not be the one left behind',
      'Regulations forbid it',
    ],
    correctIndex: 2,
    explanation:
      'The whole value of an end-to-end check is that it proves the actual, final signal path. If terminations are still to be remade or a device is still to be fitted, the thing proven is not the thing that will be in service — so the proof expires the moment work resumes.',
  },
  {
    id: 4,
    question:
      '🔴 Why should the loop check signal be injected at the field device rather than at the marshalling cabinet?',
    options: [
      'The calibrator only works in the field',
      'Cabinet injection damages the input card',
      'The cabinet terminals are harder to reach',
      'Injecting at the cabinet leaves the field cable and the field end untested, and cannot reveal a transposition',
    ],
    correctIndex: 3,
    explanation:
      'Injecting at the cabinet proves only the section from the cabinet inwards. Everything upstream — the field cable, its terminations, and crucially which field device is actually on the far end of it — remains unproven, which is exactly where a transposition hides.',
  },
  {
    id: 5,
    question: '🔴 Two transmitters have been transposed. What does each loop look like on test?',
    options: [
      'Both loops look perfect — correct calibration, correct range, correct display response',
      'Both alarm continuously',
      'One reads backwards',
      'Both read zero',
    ],
    correctIndex: 0,
    explanation:
      'Nothing is faulty. Every device is accurate, every signal path is sound, and every display responds correctly to its input. The only thing wrong is which physical measurement is arriving where — and no test of an individual loop in isolation can detect that.',
  },
  {
    id: 6,
    question: 'What makes a transposition detectable during an end-to-end check?',
    options: [
      'Checking the loop resistance',
      'Injecting a distinct value at one identified field device and confirming it appears on that tag alone',
      'Comparing the two loops’ calibration certificates',
      'Measuring the supply voltage at both transmitters',
    ],
    correctIndex: 1,
    explanation:
      'The check has to tie a specific physical location to a specific tag on the display. Injecting a value that is unique among the loops being worked on, from a device you have positively identified, is what makes the answer unambiguous rather than merely plausible.',
  },
  {
    id: 7,
    question: 'Why is an end-to-end loop check normally a two-person activity?',
    options: [
      'To satisfy insurance requirements',
      'For manual handling reasons',
      'One person injects at the field device while the other observes the controller’s display and alarms',
      'Because the calibrator requires two operators',
    ],
    correctIndex: 2,
    explanation:
      'The two ends of the loop are usually nowhere near each other, and the point of the exercise is to compare what was injected with what appeared. That comparison needs somebody at each end and an agreed way of communicating values between them.',
  },
  {
    id: 8,
    question: '🔴 What does it mean to prove a trip during commissioning?',
    options: [
      'Checking the alarm appears on the display',
      'Verifying the transmitter is calibrated at the trip value',
      'Confirming the trip value is correctly entered in the configuration',
      'Driving the signal through the trip point and observing that the intended action actually occurs',
    ],
    correctIndex: 3,
    explanation:
      'A correctly entered set-point and a displayed alarm both demonstrate that the number was received. Neither demonstrates that anything happens as a result. The action is the function, so the action is what has to be observed.',
  },
  {
    id: 9,
    question:
      'A loop reads correctly at 4 mA and 20 mA but the host has been configured with a different span from the transmitter. When is this most likely to show?',
    options: [
      'In the middle of the range, where the two scalings disagree most',
      'Only during an alarm condition',
      'It will not show at all',
      'At the extremes of the range',
    ],
    correctIndex: 0,
    explanation:
      'Checking only the endpoints is what lets this survive. Two different scalings can agree at the ends and diverge in between, which is why an intermediate point is the one that catches a range mismatch — the same reasoning behind checking several points rather than two.',
  },
  {
    id: 10,
    question: 'What should happen to the loop diagram during commissioning?',
    options: [
      'It should be filed unchanged as the record',
      'Differences found between the drawing and the installation should be marked up so the record becomes accurate',
      'It should be replaced by the calibration certificates',
      'It is not needed once the loop is proven',
    ],
    correctIndex: 1,
    explanation:
      'Commissioning is usually the first time anybody compares the drawing against the installation in detail, so it is when discrepancies surface. Correcting the record at that point is what makes the drawing trustworthy for whoever fault-finds the loop in three years, per Module 7 Section 1.',
  },
  {
    id: 11,
    question: 'Why is a loop that has been proven with a simulated signal still not fully proven?',
    options: [
      'It only proves the display, not the alarms',
      'The simulation is not accurate enough',
      'It establishes nothing about the transmitter or the process connection, which sit outside the tested path',
      'Simulated signals damage the input card',
    ],
    correctIndex: 2,
    explanation:
      'Module 6 Section 2 makes this the point of the technique rather than a shortcoming — it divides the system in two. Commissioning needs both halves, so a simulated check has to be followed by a check that the real sensor responds to the real measurement.',
  },
  {
    id: 12,
    question:
      'A commissioning check finds a differential-pressure flow loop reading incorrectly at mid-scale but correctly at zero and full scale. What is worth suspecting?',
    options: [
      'A failed input card',
      'A barrier with a missing earth',
      'A cable fault',
      'The square root being extracted twice, in the transmitter and again in the host',
    ],
    correctIndex: 3,
    explanation:
      'Module 3 Section 4 covers this as a classic commissioning fault, and the reason it survives is arithmetic — the square root of zero is zero and the square root of one is one, so the endpoints agree perfectly and only the middle of the range reveals the error.',
  },
];

const InstrumentationModule7Section6 = () => {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <HubPage>
      <HubMasthead
        section="Module 7 · Section 6"
        title="Commissioning a loop"
        backTo="/electrician/upskilling/instrumentation-module-7"
      />

      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          Every device can be accurate and the installation still wrong. This is the check that
          finds out.
        </p>

        <TLDR
          points={[
            '🔴 Calibration asks whether a device is accurate. Commissioning asks whether the right device is wired to the right input, reading the right way round.',
            'Those are different questions, and passing one says nothing about the other.',
            'A perfectly calibrated transmitter on the wrong input passes every calibration check ever devised.',
            'Commissioning proves the installation as built, before the process runs on it.',
            'Module 6 Section 2 owns the tool and the injection technique. This section owns the activity.',
            'Nothing can be proven on an unfinished loop — the proof expires the moment work resumes.',
            '🔴 Inject at the FIELD DEVICE, not the marshalling cabinet. Cabinet injection leaves the field end unproven.',
            'It is a two-person job: one injects, one watches the display and the alarms.',
            '🔴 The fault that justifies all of it is the transposed loop — two transmitters swapped.',
            '🔴 Each transposed loop looks flawless in isolation. Nothing is faulty. Only an end-to-end check with a distinct value finds it.',
            'Check an intermediate point, not just the ends — two different scalings agree at 4 and 20 mA.',
            'Proving a trip means watching the action happen, not watching the number arrive.',
            'Mark up what you find. Commissioning is when the drawing and the installation first meet.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <ContentEyebrow>🔴 A different question</ContentEyebrow>

        <ConceptBlock
          title="Commissioning is not calibration"
          plainEnglish="Calibration asks if a device tells the truth. Commissioning asks if the truth it tells is arriving in the right place."
          onSite="This distinction is the whole reason the activity exists as a separate exercise."
        >
          <p>
            Module 6 covered calibration in depth, and it is worth being exact about what that
            established, because commissioning is often assumed to be the same thing done on site.
            It is not.
          </p>
          <p>
            <strong>Calibration asks a question about one device: is it accurate?</strong> Apply a
            known input, compare the output against what it should be, adjust if required. The
            question is entirely contained within the instrument.
          </p>
          <p>
            🔴{' '}
            <strong>
              Commissioning asks a question about the installation: is the right device wired to the
              right input, reading the right way round, in the right units, with every part of the
              chain agreeing?
            </strong>{' '}
            That question is not contained within any instrument, which is why no amount of
            instrument testing answers it.
          </p>
          <p>
            The sharp illustration is this. Take a transmitter calibrated to specification, with a
            certificate to prove it, and wire it to the wrong controller input.{' '}
            <strong>
              Every calibration check performed on that device passes, because the device genuinely
              is accurate.
            </strong>{' '}
            The fault is not in the instrument at all. It is in the installation, and calibration
            has no mechanism for detecting it.
          </p>
          <AppendixTable
            caption="What each activity actually establishes"
            headers={['Question', 'Calibration answers', 'Commissioning answers']}
            rows={[
              ['Is this device accurate?', 'Yes', 'Assumes it, having been done first'],
              ['Is it the right device for this tag?', 'No', 'Yes'],
              ['Is it connected to the right input?', 'No', 'Yes'],
              ['Does the host display the right units and range?', 'No', 'Yes'],
              ['Does the whole chain agree end to end?', 'No', 'Yes'],
              ['Does the alarm or trip actually act?', 'No', 'Yes'],
            ]}
            notes="Calibration is a prerequisite for commissioning, not a substitute for it. The columns do not overlap."
          />
          <p>
            So the order matters and it is not arbitrary.{' '}
            <strong>Devices are calibrated, then the loop is commissioned</strong> &mdash; because
            commissioning a loop full of uncalibrated instruments produces disagreements you cannot
            attribute, and there is no point proving a signal path carries a number faithfully if
            the number was wrong when it set off.
          </p>
        </ConceptBlock>

        <Pullquote>
          A calibration certificate proves the instrument tells the truth. It says nothing whatever
          about who is listening.
        </Pullquote>

        <SectionRule />
        <ContentEyebrow>Before you can start</ContentEyebrow>

        <ConceptBlock
          title="You cannot prove an unfinished loop"
          plainEnglish="An end-to-end check is only worth anything if the thing you tested is the thing that gets left behind."
          onSite="Commissioning early, to show progress, is how a loop gets signed off twice and proven once."
        >
          <p>
            The value of an end-to-end check rests entirely on one thing:{' '}
            <strong>that it proves the actual, final signal path</strong>. Everything else follows
            from that, including when it can sensibly be done.
          </p>
          <p>
            If a termination is still to be remade, a gland still to be fitted, a barrier still to
            be earthed or a device still to be installed, then the arrangement under test is not the
            arrangement that will go into service.{' '}
            <strong>The proof expires the moment somebody resumes work on it</strong>, and a signed
            record that no longer describes the installation is worse than no record, because it
            will be believed.
          </p>
          <p>The work that earlier sections covered is what has to be complete first:</p>
          <ul>
            <li>
              <strong>Terminations and glanding</strong> made off properly, per Section 2 &mdash;
              including the screen treated as that section describes.
            </li>
            <li>
              <strong>Cable tests</strong> done and passed, which Section 7 covers. A loop check is
              not a cable test and does not replace one.
            </li>
            <li>
              <strong>The loop budget</strong> confirmed as workable per Section 3, so the supply
              can actually drive the loop to 20 mA rather than saturating short of it.
            </li>
            <li>
              <strong>Barrier earths</strong> in place where Section 5 applies &mdash; and worth a
              deliberate look, since that is a fault which produces no symptom during any check on
              this page.
            </li>
            <li>
              <strong>Devices calibrated</strong>, per Module 6, so that a disagreement found here
              can be attributed to the installation.
            </li>
          </ul>
          <p>
            🔴 That last point about barrier earths deserves emphasis, because it is a real gap. A
            loop check exercises the signal path, and{' '}
            <strong>
              a barrier with a disconnected earth passes an end-to-end check perfectly
            </strong>
            . The protective function is not in the signal path, so nothing about injecting current
            and watching the display will ever reveal it. It has to be verified separately and
            deliberately.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>The loop check</ContentEyebrow>

        <ConceptBlock
          title="Proving the path before the process runs on it"
          plainEnglish="Inject known currents at one end and confirm the right numbers appear at the other, before anything real depends on it."
          onSite="This is the core commissioning activity, and it is done before start-up for a reason."
        >
          <p>
            Module 6 Section 2 covered the tool and the technique in detail &mdash; the
            calibrator&rsquo;s read, source and simulate modes, and the practice of injecting{' '}
            <strong>4, 8, 12, 16 and 20 mA</strong> and confirming the receiving instruments agree
            at each. That section also established what such a check exercises: the field cable and
            its terminations, any isolator or barrier, the conversion resistor and input card, the
            host&rsquo;s ranging, and the display, trend and alarms configured along the way.
          </p>
          <p>
            What this section adds is the context in which that becomes commissioning rather than
            testing.{' '}
            <strong>
              This check is performed on newly installed systems before the process is started up
            </strong>
            , and its purpose is to establish that the controller&rsquo;s process variable input,
            the loop supply and the transmitter wiring are all functioning &mdash; so that any
            signal the transmitter later sends will be correctly received and displayed.
          </p>
          <p>
            The timing carries the point.{' '}
            <strong>
              Before start-up, a wrong reading is a finding. After start-up, it is a process
              decision made on bad information.
            </strong>{' '}
            Commissioning exists to move every discoverable error into the first category.
          </p>
          <p>
            🔴 It is also, by its nature, a{' '}
            <strong>two-person activity with a communication protocol</strong>. One person injects
            at the field end; the other watches the controller&rsquo;s display and its alarms. The
            two ends of a loop are rarely within sight of each other, and the entire exercise is a
            comparison between what was sent and what arrived &mdash; which cannot be done by one
            person reading their own instrument.
          </p>
          <p>That imposes some discipline worth stating plainly:</p>
          <ul>
            <li>
              <strong>Agree the tag before injecting anything.</strong> Both people must be certain
              they are working on the same loop, which is a stronger claim than both believing it.
            </li>
            <li>
              <strong>Announce the value, then confirm what is seen.</strong> The person at the host
              reports what the display reads &mdash; they do not confirm the value they were told to
              expect. Those are different questions and only one of them is a test.
            </li>
            <li>
              <strong>Record as you go</strong>, rather than reconstructing afterwards from memory.
            </li>
          </ul>
          <p>
            The second of those is the one that quietly decides whether the exercise means anything.
            If the field end says &ldquo;sending twelve&rdquo; and the host end says &ldquo;yes,
            twelve&rdquo;, a great deal has been assumed and very little has been proven.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-7-6-confirm"
          question="During a loop check the technician at the field device announces “injecting 12 mA”. What is the most useful thing the person at the controller can say back?"
          options={[
            'The value the display is actually showing, before hearing what it should be',
            'That the loop appears healthy',
            'That the alarm has not activated',
            'Confirmation that 12 mA was expected',
          ]}
          correctIndex={0}
          explanation="Reporting the observed value is a test; agreeing with an expected value is not. Once somebody knows what the answer should be, a display reading close to it stops being scrutinised — which is exactly how a loop with a range mismatch gets signed off as correct."
        />

        <SectionRule />
        <ContentEyebrow>🔴 The fault that justifies all of it</ContentEyebrow>

        <ConceptBlock
          title="Transposed loops"
          plainEnglish="Two transmitters swapped over. Both loops work perfectly. Nothing is broken. Everything is wrong."
          onSite="This is the commissioning fault, and it is the reason the injection point matters."
        >
          <p>
            Consider two similar transmitters installed on the same plant on the same day &mdash;
            two pressure transmitters, or two temperature loops on adjacent vessels. During
            installation the field cables are transposed, so each transmitter is connected to the
            other&rsquo;s loop.
          </p>
          <p>Now examine what any individual test would find:</p>
          <ul>
            <li>
              <strong>Both transmitters are correctly calibrated.</strong> Their certificates are
              valid and their accuracy is exactly as specified.
            </li>
            <li>
              <strong>Both signal paths are electrically sound.</strong> Cable tests pass, loop
              resistance is within budget, terminations are good.
            </li>
            <li>
              <strong>Both displays respond correctly.</strong> Inject a current into either loop at
              the cabinet and the right tag moves by the right amount, in the right direction, in
              the right units.
            </li>
            <li>
              <strong>No alarm is raised, and nothing reads out of range</strong>, provided the two
              vessels happen to be at broadly similar conditions.
            </li>
          </ul>
          <p>
            🔴{' '}
            <strong>
              Nothing is faulty. Every component is working exactly as designed. The only thing
              wrong is which physical measurement is arriving where
            </strong>{' '}
            &mdash; and that is not a property of any device, so no test of any device can detect
            it.
          </p>
          <p>
            This is the sharpest example in the module of a theme that has run through it
            repeatedly: Section 5 had the barrier earth that fails silently, and this is its
            measurement equivalent. The system reports confidently and it reports the wrong vessel.
          </p>
          <p>
            The consequence is worth stating without softening it.{' '}
            <strong>
              Control action is taken on the wrong vessel, and the loop compensating for it makes
              the real condition worse rather than better
            </strong>
            . An operator responding to a rising reading adjusts the vessel that is not rising.
            Every display agrees with every other display, so the instruments are the last thing
            anybody suspects.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="🔴 Why the injection point decides whether you find it"
          plainEnglish="Injecting at the cabinet only proves the bit from the cabinet inwards. What is on the far end of the cable stays a guess."
          onSite="This single rule is what this page most wants you to take away."
        >
          <p>
            Everything about the transposition survives a check performed at the marshalling
            cabinet, and the reason is precise.{' '}
            <strong>
              Injecting at the cabinet proves the path from the cabinet to the host. It proves
              nothing at all about what is connected on the other side of those terminals.
            </strong>
          </p>
          <p>
            The cable, its terminations, and above all{' '}
            <strong>which physical device is at the far end of it</strong>, are all outside the
            tested path. So a cabinet check on a transposed pair returns two perfect results and
            confirms an incorrect installation.
          </p>
          <p>
            🔴 Injecting <strong>at the field device</strong> closes that gap, because the test now
            begins at a physical location you have gone to and positively identified. Three things
            make the result unambiguous:
          </p>
          <ul>
            <li>
              <strong>Identify the device physically, not by expectation.</strong> Read the tag on
              the instrument you are actually standing at, and check it against the loop diagram
              from Section 1 rather than against what you assume you are working on.
            </li>
            <li>
              <strong>Inject a value distinct from the other loops in progress.</strong> If two
              loops are both sitting at 12 mA, a display showing 50 per cent proves nothing about
              which one you moved. A value unique among the loops being worked on removes that
              ambiguity.
            </li>
            <li>
              <strong>Confirm it appears on that tag and, ideally, that nothing else moved.</strong>{' '}
              The second half is what actually catches a transposition, because it is the other tag
              moving that reveals it.
            </li>
          </ul>
          <p>
            That is the whole method, and it is not laborious. It is the difference between proving
            a loop and proving a length of cable.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="🔴 Signing off a loop that was checked from the cabinet"
          whatHappens={
            <>
              <p>
                Cabinet injection is quicker, warmer and drier than walking out to the field device,
                and it exercises most of the signal path. The results look identical: inject five
                values, watch five correct numbers appear, tick the loop off.
              </p>
              <p>
                The record then states that the loop was checked and found correct, and that record
                is true as far as it goes. What it does not say is which portion of the loop was
                checked.
              </p>
              <p>
                🔴 Three faults pass this check untouched. <strong>A transposition</strong> is
                invisible, as above. <strong>A field cable fault</strong> beyond the cabinet is
                outside the tested path entirely. And{' '}
                <strong>a device connected to the wrong point in the process</strong> &mdash; the
                right tag on the wrong vessel &mdash; is not even in principle detectable
                electrically.
              </p>
              <p>
                Because a signed record exists, all three are then extremely difficult to find
                later. The loop has documentation saying it was proven, so when the readings look
                strange in service, the investigation starts somewhere else and stays there.
              </p>
            </>
          }
          doInstead={
            <>
              <p>
                Treat the field device as the starting point of the check, and treat cabinet
                injection as what it is: a useful{' '}
                <strong>fault-finding step that divides the loop in two</strong>, which is how
                Module 6 Section 2 presents it.
              </p>
              <p>Practically:</p>
              <ul>
                <li>
                  <strong>Start at the instrument.</strong> Identify it physically, then inject
                  there.
                </li>
                <li>
                  <strong>Where a genuine constraint prevents it</strong> &mdash; a device that
                  cannot be reached while the plant is in its current state &mdash; record what was
                  actually checked and from where, so the limitation travels with the record instead
                  of being lost.
                </li>
                <li>
                  <strong>Finish with the real sensor.</strong> An injected signal proves the path;
                  it establishes nothing about the transmitter or the process connection, which is
                  the half of the system Module 6 Section 2 deliberately excludes. Confirming the
                  instrument responds to a real change closes it.
                </li>
              </ul>
              <p>
                The general principle behind all three:{' '}
                <strong>
                  a record should describe what was proven, not what was intended to be proven
                </strong>
                . A note saying a loop was checked from the cabinet is far more valuable to the next
                person than a tick that implies more than was done.
              </p>
            </>
          }
        />

        <InlineCheck
          id="ins-7-6-transposed"
          question="Two adjacent temperature loops have been transposed during installation. Both are checked by injecting current at the marshalling cabinet. What is the result?"
          options={[
            'One loop fails the check',
            'Both loops pass — the fault is entirely outside the section of path being tested',
            'Both loops read backwards',
            'The alarms activate on both loops',
          ]}
          correctIndex={1}
          explanation="Cabinet injection tests from the cabinet to the host, and the transposition is on the field side of that. Both checks therefore return correct results, and the exercise ends by certifying an installation that is wired to the wrong vessels."
        />

        <SectionRule />
        <ContentEyebrow>Both ends must agree</ContentEyebrow>

        <ConceptBlock
          title="Range, direction and units are configured twice"
          plainEnglish="The transmitter was told what its 4 and 20 mA mean. So was the host. Nothing guarantees they were told the same thing."
          onSite="Endpoint-only checks are what let a mismatch through."
        >
          <p>
            A 4&ndash;20 mA loop carries a proportion, not a measurement. Module 3 covered the
            arithmetic of turning that proportion back into engineering units, and the practical
            consequence for commissioning is that{' '}
            <strong>the same range has been configured in two separate places</strong> &mdash; once
            in the transmitter and once in the host &mdash; usually by different people at different
            times.
          </p>
          <p>
            🔴 If those two configurations disagree, the loop is wrong at every point except the
            ones most people check.{' '}
            <strong>
              Two different scalings still agree at 4 mA and at 20 mA, because both ends map those
              to their own bottom and top of range.
            </strong>{' '}
            The divergence is greatest in the middle, which is exactly why the five-point check
            exists rather than a two-point one.
          </p>
          <p>Three things are worth confirming explicitly rather than assuming:</p>
          <ul>
            <li>
              <strong>The range values match at both ends</strong>, read from each rather than from
              the specification both are supposed to follow.
            </li>
            <li>
              <strong>The units match.</strong> A host displaying different pressure units from
              those the transmitter was ranged in produces a believable number that is wrong by a
              fixed factor &mdash; and believable is the dangerous part.
            </li>
            <li>
              <strong>The direction is right.</strong> A reverse-acting arrangement, where the
              signal falls as the measurement rises, is legitimate but must be intended. A loop
              reading backwards passes a range check at both endpoints if nobody watches which way
              it moved.
            </li>
          </ul>
          <p>
            Where a square-root characterisation is involved, Module 3 Section 4 covers the fault
            worth knowing about: the root extracted in both the transmitter and the host. It
            survives for the same arithmetic reason as a range mismatch &mdash; the endpoints agree
            exactly and only the middle of the range is wrong.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Proving a trip means watching something happen"
          plainEnglish="A number arriving on a screen is not the same as a valve closing."
          onSite="The action is the function. The display is just how you found out."
        >
          <p>
            Alarms and trips get commissioned alongside the measurement, and there is a distinction
            here that matters more than it first appears.
          </p>
          <p>
            Driving the signal through the trip point and seeing the alarm appear proves that{' '}
            <strong>the number was received and compared correctly</strong>. That is genuinely worth
            proving. But the purpose of a trip is not to display anything &mdash; it is to make
            something happen.
          </p>
          <p>
            🔴{' '}
            <strong>
              Proving a trip means driving the signal through the set-point and observing the
              intended action actually occur
            </strong>{' '}
            &mdash; the valve moving, the pump stopping, the interlock operating. A correctly
            configured set-point with no working output is a fault that every display-based check
            reports as healthy.
          </p>
          <p>
            The same applies at the other end of the scale. Section 3 established that a loop can
            work perfectly at 4 mA and fail at 20 mA when the budget is short, so{' '}
            <strong>a trip near full scale needs proving at its own value</strong> rather than
            inferred from a loop that behaved at mid-range.
          </p>
          <p>
            Which of these actions can safely be proven, and when, is a question for the plant
            rather than the technician &mdash; some can only be demonstrated during a shutdown, and
            forcing an output on a live plant is not a decision to make on the spot. What is not
            negotiable is being clear afterwards about{' '}
            <strong>which trips were proven by action and which only by indication</strong>, because
            those are very different assurances.
          </p>
        </ConceptBlock>

        <Scenario
          title="A loop that reads perfectly and is connected to the wrong vessel"
          situation={
            <>
              <p>
                Two identical pressure transmitters are commissioned on adjacent vessels. Both loops
                are checked by injection at the marshalling cabinet, both respond correctly at all
                five points, and both are signed off. The plant starts up.
              </p>
              <p>
                Three weeks later, operators report that one vessel&rsquo;s pressure control is
                sluggish and occasionally moves the wrong way. Both transmitters are checked and
                found to be within calibration. Both loops are re-checked from the cabinet and pass
                again.
              </p>
            </>
          }
          whatToDo={
            <>
              <p>
                Notice what the evidence is actually saying. Every test performed so far has
                examined the part of the system from the cabinet inwards, and every one has passed
                &mdash; twice. Repeating a test that has already passed twice is unlikely to produce
                a different answer, and the symptom is not one that a healthy loop produces.
              </p>
              <p>
                <strong>
                  Control that occasionally acts in the wrong direction is a strong hint that the
                  measurement and the process are not the pair the controller believes they are
                </strong>
                . That points at the field side, which is precisely the region no test has yet
                covered.
              </p>
              <p>
                The check that resolves it is the one that should have been done at commissioning:
                go to one transmitter, identify it physically from its tag against the loop diagram,
                and inject a distinct value there &mdash; then observe which tag on the display
                moves. Watching the other loop at the same time is what turns a suspicion into a
                finding.
              </p>
              <p>
                If the transposition is confirmed, the correction itself is small. The important
                part is the surrounding work: establishing how long the plant has been operated on
                transposed measurements, whether any decisions were taken on them, and{' '}
                <strong>
                  whether any other pair of similar loops was commissioned the same way
                </strong>
                . A method that produced this fault once will have been applied to every loop
                commissioned that week.
              </p>
            </>
          }
          whyItMatters={
            <>
              <p>
                This is the failure mode the whole section exists for. Nothing was broken at any
                point &mdash; not the transmitters, not the cable, not the controller. Every
                instrument was accurate and every test was performed competently against the method
                being used.
              </p>
              <p>
                The defect was in the method: a check that began at the wrong end of the loop, and a
                record that said &ldquo;loop checked&rdquo; without saying from where. Both of those
                are decisions rather than accidents, which is what makes them preventable.
              </p>
            </>
          }
        />

        <FAQ
          items={[
            {
              question: 'Is a loop check the same as a cable test?',
              answer:
                'No, and one does not substitute for the other. A cable test — the subject of Section 7 — examines the cable as a cable: continuity, insulation resistance, screen integrity, and whether conductors are where the drawing says. A loop check examines whether a signal injected at one end arrives correctly at the other. A loop can pass an end-to-end check while sitting on cable with degraded insulation that has not yet failed, because at 24 V and a few milliamps a great deal of degradation causes no immediate symptom. Both are done, and the cable test comes first.',
            },
            {
              question: 'How many points should be checked?',
              answer:
                'Module 6 Section 2 sets out the familiar five — 4, 8, 12, 16 and 20 mA — and the reasoning behind more than two is worth understanding rather than following by rote. Two points establish a straight line through whatever they are, so any error that happens to agree at both ends survives them: a range mismatch, a double square root, a scaling error. Intermediate points are what catch those. The specific number and values for a given project are usually set by its commissioning documentation.',
            },
            {
              question: 'Does the loop need re-commissioning after a device is replaced?',
              answer:
                'The signal path has been broken and remade, so the assurance the original check provided no longer covers it — and the sensible response is proportionate rather than absolute. Re-proving the section that was disturbed is usually what is called for: that the replacement is the right device for the tag, that it is ranged the same way as the one it replaced, and that it reads correctly at the host. The failure worth guarding against is the assumption that a like-for-like swap needs no proving, because a replacement device configured with default settings rather than the loop’s settings is a very common way to introduce a range mismatch into a loop that was previously correct.',
            },
            {
              question: 'What should the commissioning record contain?',
              answer:
                'The specifics are set by the project rather than by any general rule, but the principle that makes a record useful is straightforward: it should describe what was actually proven, by whom, and when. That means recording the values injected and the values observed rather than a bare pass, noting where the signal was injected from, and stating explicitly what was not proven — a trip verified only by indication, a device that could not be reached. A record that captures its own limitations is far more use to whoever fault-finds the loop later than one that implies complete coverage.',
            },
            {
              question: 'Why mark up the loop diagram during commissioning?',
              answer:
                'Because commissioning is usually the first occasion on which anybody systematically compares the drawing with the installation, so it is when discrepancies surface — a terminal number that differs, a device relocated during installation, a spare pair used that the drawing does not show. Section 1 covered why an accurate loop diagram matters when fault-finding, and the corollary is that the diagram is only accurate if somebody corrects it at the point the differences are discovered. Nobody will ever have a better opportunity.',
            },
            {
              question: 'Can commissioning find a barrier with a missing earth?',
              answer:
                'No, and this is worth knowing as a genuine gap rather than a reassurance. Section 5 established that a zener barrier’s earth carries protective fault current, not signal current, so its absence has no effect whatever on how the loop behaves. Every check on this page will pass. The protective function has to be verified deliberately and separately, which is exactly why it gets missed — it is not on the path anybody is exercising.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            '🔴 Calibration asks whether a device is accurate. Commissioning asks whether the right device is wired to the right input and the whole chain agrees.',
            'A perfectly calibrated transmitter on the wrong input passes every calibration check — the fault is in the installation, not the instrument.',
            'Calibration is a prerequisite for commissioning, never a substitute: devices first, then the loop.',
            'Nothing useful can be proven on an unfinished loop — the proof expires when work resumes.',
            'Terminations (7.2), cable tests (7.7), loop budget (7.3) and device calibration (M6) all come first.',
            'Module 6 Section 2 owns the calibrator and the five-point injection. This section owns the activity around it.',
            'The check is done before start-up: before, a wrong reading is a finding; after, it is a decision made on bad information.',
            'It is a two-person job — one injects at the field end, one watches the display and the alarms.',
            '🔴 The person at the host reports what they see, rather than agreeing with the value they were told to expect.',
            '🔴 A transposed pair of loops looks flawless in isolation — correct calibration, correct paths, correct displays. Nothing is faulty.',
            '🔴 Inject at the FIELD DEVICE. Cabinet injection proves the path from the cabinet inwards and leaves the transposition invisible.',
            'Identify the instrument physically, inject a value distinct from other loops in progress, and watch that nothing else moves.',
            'Range, units and direction are configured twice — in the transmitter and in the host — and nothing guarantees they agree.',
            'Two different scalings still agree at 4 and 20 mA, so an intermediate point is what catches a mismatch.',
            'Proving a trip means observing the action occur, not the number arrive. Note which trips were proven by action and which only by indication.',
            '🔴 A loop check cannot detect a barrier with a missing earth — that is not on the signal path and must be verified separately.',
            'Record what was actually proven and from where, and mark up the drawing while the differences are in front of you.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself — Module 7.6" />

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-7-section-5')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-left touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              <ChevronLeft className="h-3 w-3" /> Previous section
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Barriers and IS loops
            </span>
          </button>
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-7-section-7')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-right touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center justify-end gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              Next section <ChevronRight className="h-3 w-3" />
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Testing instrument cable
            </span>
          </button>
        </div>
      </HubBody>
    </HubPage>
  );
};

export default InstrumentationModule7Section6;
