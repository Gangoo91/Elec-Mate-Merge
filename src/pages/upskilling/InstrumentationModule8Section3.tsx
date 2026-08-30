/**
 * Module 8 · Section 3 — Intermittent faults
 *
 * Rewritten 2026-08-30. REPOSITIONED, with Andrew's agreement, from the old
 * outline title "Using loop calibrators and simulators for diagnostics" —
 * which Module 6 Section 2 owns outright (65 mentions of simulate / loop
 * calibrator, read-source-simulate modes, the 5-point injection, and the
 * "divides the system in two" insight). Writing that here would have made Ben
 * sit the same material twice. Verified by grep before proposing.
 *
 * 🔴 POSITIONING — what this page must NOT re-teach:
 *   M4.4/M4.5 — CAPTURE INSTRUMENTATION. M4.5 owns min/max in depth, plus two
 *          limits this page depends on but must only REFERENCE:
 *            · a meter is a sampled instrument; a transient shorter than the
 *              scan time is invisible
 *            · absence of a recorded excursion is NOT proof nothing happened
 *            · basic capture records WHAT, not WHEN; timestamped logging is a
 *              genuinely different capability
 *   M7.2 — terminations as an intermittent CAUSE, and a worked vibration
 *          scenario ("an intermittent that only appears when the extract fan
 *          runs"). Reference it as an example of correlation; do not retell it.
 *   M8.1 — the diagnostic method itself.   M8.2 — symptom triage.
 *
 * 🔴 THE ORGANISING INSIGHT, and it is genuinely uncovered: an intermittent is
 * not merely a HARDER fault, it is a DIFFERENT KIND of problem, because it
 * breaks the assumption every method in Section 1 rests on. All of that method
 * assumes THE FAULT IS PRESENT WHILE YOU TEST. A test performed during a
 * healthy period returns a healthy result and proves nothing whatever. So
 * Section 1's method is conditionally valid, and this page is what to do when
 * the condition fails.
 *
 * 🔴 THE STRATEGIC SHIFT: stop trying to OBSERVE the fault and start trying to
 * CAPTURE it. You cannot be present when it happens, so instrument the problem
 * rather than watching it.
 *
 * 🔴 CORRELATION IS THE DIAGNOSIS. An intermittent that correlates with
 * something is nearly solved. Candidates: temperature (diurnal, seasonal),
 * vibration, load, weather, plant state, time of day, recent work.
 *
 * 🔴🔴 THE STRONGEST CONTENT, verified WHOLLY UNCOVERED (0 hits across Modules
 * 1-7 for "working now" / "cleared itself" / "unexplained" / "no fault found"):
 * NEVER CLEAR A FAULT YOU CANNOT EXPLAIN. "It's working now" is not a fix.
 * Two reasons, both real:
 *   · disturbance can TEMPORARILY RESTORE a bad connection, so the act of
 *     investigating can mask the very fault you are chasing
 *   · a fault that returns after sign-off is worse than one that never
 *     cleared, because now a record exists saying it was fixed — the same
 *     argument M7.6 makes about a signed record that no longer describes the
 *     installation
 *
 * 🔴 FREQUENCY IS INFORMATION, and it inverts: an intermittent growing more
 * frequent is approaching permanence — which is BAD news for the plant and
 * GOOD news diagnostically, because it becomes catchable. Same shape as M7.7's
 * insulation-resistance trend argument.
 *
 * ⚠️ CC BY source — shingle-scanned to ZERO 9-word overlaps. Keep it that way.
 *
 * Sources: Kuphaldt, *Lessons In Industrial Instrumentation* v2.32 (CC BY),
 * §34.6.3 (intermittent faults are among the hardest because the symptoms come
 * and go, whereas a persistent fault leaves data continuously available; the
 * key is to set up equipment to capture events occurring when you are not
 * observing; min/max capture, event logging, physical evidence left by a past
 * event such as charring or discolouration, and video recording).
 * Extracted to scratchpad/src/m8_scientific.txt.
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

const TITLE = 'Intermittent faults | Instrumentation Module 8.3 | Elec-Mate';
const DESCRIPTION =
  'Why an intermittent fault breaks the diagnostic method rather than merely resisting it, how to capture evidence of something that will not happen while you watch, and why “it is working now” is not a repair.';

const outcomes = [
  '🔴 Explain why an intermittent is a different kind of problem, not just a harder one',
  'Say why a test performed during a healthy period proves nothing',
  '🔴 Shift from trying to observe a fault to trying to capture it',
  'Say what a quiet capture record does and does not rule out',
  '🔴 Use correlation to convert an intermittent into a diagnosable fault',
  'Read increasing frequency as information rather than only as bad news',
  '🔴 Say why a fault must not be cleared until it can be explained',
  'Recognise that disturbing a connection can mask the fault you are chasing',
];

const quizQuestions = [
  {
    id: 1,
    question:
      '🔴 Why is an intermittent fault a different kind of problem rather than just a harder one?',
    options: [
      'It breaks the assumption every diagnostic test relies on — that the fault is present while you test',
      'It always has more than one cause',
      'It cannot be found without stopping the plant',
      'It requires more expensive test equipment',
    ],
    correctIndex: 0,
    explanation:
      'Section 1’s whole method depends on measurements meaning something. During a healthy period every measurement is correct, so tests return results that are accurate and useless. The method has not failed — its precondition has.',
  },
  {
    id: 2,
    question:
      'A loop with an intermittent fault is tested thoroughly and everything checks out. What has been established?',
    options: [
      'That the fault has cleared',
      'That the fault was not present during the testing — which says nothing about whether it exists',
      'That the fault is in the controller',
      'That the original report was mistaken',
    ],
    correctIndex: 1,
    explanation:
      'A clean set of results during a healthy period is exactly what a healthy system produces, and exactly what an intermittent fault produces between episodes. The two are indistinguishable, which is why the testing cannot settle the question either way.',
  },
  {
    id: 3,
    question: '🔴 What is the strategic shift an intermittent fault demands?',
    options: [
      'Wait until it becomes permanent',
      'Test more thoroughly',
      'Stop trying to observe the fault and set something up to capture it while you are elsewhere',
      'Replace the most likely component',
    ],
    correctIndex: 2,
    explanation:
      'You cannot arrange to be standing there at the moment it happens, and trying harder does not change that. Instrumenting the problem so it records its own occurrence converts an unobservable event into evidence you can examine afterwards.',
  },
  {
    id: 4,
    question: 'A meter left on a loop overnight records nothing unusual. What does that rule out?',
    options: [
      'Only faults occurring during daylight',
      'Nothing at all',
      'Everything — the loop is sound',
      'Slow excursions and sustained dropouts, but not a transient shorter than the meter’s scan time',
    ],
    correctIndex: 3,
    explanation:
      'Module 4 Section 5 covers why: a meter samples rather than watching continuously, so a fast enough glitch happens between two looks and leaves no trace. Absence of a recorded excursion is proof that nothing was seen, which is weaker than proof that nothing happened.',
  },
  {
    id: 5,
    question: '🔴 What turns an intermittent into a diagnosable fault?',
    options: [
      'Finding a correlation — something else that is reliably present when it happens',
      'Replacing components until it stops',
      'Increasing the logging rate',
      'Waiting for it to become permanent',
    ],
    correctIndex: 0,
    explanation:
      'A fault that occurs randomly is very hard. A fault that occurs whenever a particular pump runs, or whenever the temperature drops, has had most of its mystery removed — the correlation both proposes a cause and gives you a way to reproduce the conditions deliberately.',
  },
  {
    id: 6,
    question: 'Which of these is worth correlating an intermittent against?',
    options: [
      'Only the age of the instrument',
      'Temperature, vibration, load, weather, plant state, time of day and recent work',
      'Only the loop resistance',
      'Only the calibration date',
    ],
    correctIndex: 1,
    explanation:
      'Anything that varies on a similar timescale to the fault is a candidate. The point of a timestamped record rather than a bare min/max capture is precisely that it can be laid alongside these and compared.',
  },
  {
    id: 7,
    question: 'An intermittent fault is becoming more frequent. How should that be read?',
    options: [
      'As normal behaviour for an ageing instrument',
      'As a reason to postpone investigation until it settles',
      'As a deteriorating fault approaching permanence — bad for the plant, but easier to catch',
      'As evidence the earlier diagnosis was wrong',
    ],
    correctIndex: 2,
    explanation:
      'Increasing frequency says something is progressing rather than fluctuating, which is the same reasoning Module 7 Section 7 applies to a falling insulation resistance. It is also the one circumstance in which waiting genuinely helps, because a fault present more often is a fault a capture is more likely to catch.',
  },
  {
    id: 8,
    question:
      '🔴 A technician disturbs a suspect termination and the fault clears. What should they conclude?',
    options: [
      'That the fault was never real',
      'That the cable needs replacing',
      'That the termination was the fault and the job is complete',
      'Very little — disturbing a poor connection can temporarily restore it, so the fault may be masked rather than removed',
    ],
    correctIndex: 3,
    explanation:
      'A corroded or loose connection can be made temporarily sound by being moved, which produces exactly the same observation as having fixed it. The act of investigating has changed the system, so a fault that stops at that moment is ambiguous rather than solved.',
  },
  {
    id: 9,
    question: '🔴 Why must a fault not be signed off until it can be explained?',
    options: [
      'Because a fault that returns after sign-off is worse than one that never cleared — a record now says it was fixed',
      'Because the customer will not accept it',
      'Because an unexplained fault is always dangerous',
      'Because the paperwork requires a cause',
    ],
    correctIndex: 0,
    explanation:
      'The record redirects the next investigation away from the real cause, in the same way Module 7 Section 6 describes a signed commissioning record that no longer describes the installation. “It is working now” describes the present moment and makes no claim about why.',
  },
  {
    id: 10,
    question: 'What kind of evidence can a past intermittent event leave behind?',
    options: [
      'None — if it is not happening now there is nothing to see',
      'Physical traces such as discolouration or charring where something overheated',
      'Only entries in the event log',
      'Only a change in calibration',
    ],
    correctIndex: 1,
    explanation:
      'Some faults mark the equipment they occur in. Heat leaves discolouration, water leaves staining and corrosion, and arcing leaves pitting — so looking for what a fault has left is a way of detecting an event nobody witnessed and no instrument recorded.',
  },
  {
    id: 11,
    question:
      'An intermittent has been captured and correlates strongly with a large motor starting nearby. What does that suggest?',
    options: [
      'The transmitter needs replacing',
      'The motor is faulty',
      'A candidate mechanism — either interference coupled during starting, or vibration disturbing a poor connection',
      'The loop must be re-ranged',
    ],
    correctIndex: 2,
    explanation:
      'The correlation names the trigger rather than the fault, and two quite different mechanisms fit it. Module 3 Section 5 covers the coupling route and Module 7 Section 2 the mechanical one — and they are distinguished by whether the disturbance is electrical or physical, which is the next test to design.',
  },
  {
    id: 12,
    question: 'What should be recorded about an intermittent that has not yet been resolved?',
    options: [
      'Only the final repair',
      'Only the times it was observed',
      'Nothing until the cause is found',
      'When it occurred, what it looked like, what was tested, and what was ruled out',
    ],
    correctIndex: 3,
    explanation:
      'An unresolved intermittent is the fault most likely to be handed to somebody else, and what they need is the pattern rather than the conclusion. Occurrences with times build the correlation that eventually solves it, and knowing what has been eliminated stops the next person repeating a week of work.',
  },
];

const InstrumentationModule8Section3 = () => {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <HubPage>
      <HubMasthead
        section="Module 8 · Section 3"
        title="Intermittent faults"
        backTo="/electrician/upskilling/instrumentation-module-8"
      />

      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          Everything in Section 1 assumed the fault was there while you tested. This is what to do
          when it is not.
        </p>

        <TLDR
          points={[
            '🔴 An intermittent is not a harder fault. It is a different kind of problem.',
            'Every method in Section 1 assumes the fault is present while you test. An intermittent breaks that assumption.',
            'A test run during a healthy period returns a healthy result — accurate, and completely useless.',
            'A clean set of results is what a sound system produces AND what an intermittent produces between episodes. They are indistinguishable.',
            '🔴 So stop trying to observe the fault and set something up to capture it while you are elsewhere.',
            'Module 4 Section 5 owns the capture instruments — and their limits, which matter here.',
            'A quiet overnight record rules out slow excursions and dropouts. It does not rule out a fast glitch.',
            '🔴 Correlation is the diagnosis. A fault tied to something else has had most of its mystery removed.',
            'Correlate against temperature, vibration, load, weather, plant state, time of day and recent work.',
            'Some faults leave physical evidence of a past event — discolouration, staining, pitting.',
            'Increasing frequency means deterioration: bad for the plant, good for catching it.',
            '🔴🔴 Never clear a fault you cannot explain. “It is working now” is not a repair.',
            '🔴 Disturbing a poor connection can temporarily restore it — so investigating can mask the fault.',
            'A fault that returns after sign-off is worse than one that never cleared, because a record now says it was fixed.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <ContentEyebrow>🔴 Why the method stops working</ContentEyebrow>

        <ConceptBlock
          title="The precondition nobody states"
          plainEnglish="Testing only tells you something if the fault is there while you test. An intermittent removes that guarantee."
          onSite="This is why an intermittent feels so different from a fault that simply resists being found."
        >
          <p>
            Section 1 set out a method: observe, hypothesise, design a test that could prove you
            wrong, perform it, and use the result. Every step of that rests on an assumption so
            obvious it is never stated &mdash;{' '}
            <strong>that a measurement taken now tells you something about the fault</strong>.
          </p>
          <p>
            🔴 An intermittent removes exactly that.{' '}
            <strong>
              During a healthy period the system genuinely is healthy, so every measurement is
              correct, every device passes, and every test returns a result that is entirely
              accurate and completely useless.
            </strong>
          </p>
          <p>
            That is worth being precise about, because it is easy to mistake for bad luck or poor
            testing. It is neither. The method has not failed; its precondition has. A persistent
            fault leaves data continuously available for inspection, and an intermittent one leaves
            data only during episodes you were not present for.
          </p>
          <p>
            The consequence catches people out in a specific way. Thorough testing produces a clean
            bill of health, which then gets reported as if it meant something:
          </p>
          <ul>
            <li>
              <strong>What a clean result actually establishes</strong> is that the fault was not
              present during the test.
            </li>
            <li>
              <strong>What it does not establish</strong> is anything at all about whether the fault
              exists.
            </li>
          </ul>
          <p>
            🔴 The two situations produce identical evidence.{' '}
            <strong>
              A sound system and an intermittently faulty system are indistinguishable while the
              intermittent one is behaving
            </strong>
            , so no amount of testing during that window separates them.
          </p>
          <p>
            Which means the first decision on an intermittent is not what to test but{' '}
            <strong>whether testing is the right activity at all</strong>. Usually, at that moment,
            it is not.
          </p>
        </ConceptBlock>

        <Pullquote>
          A clean result on an intermittent fault is not good news and not bad news. It is not news.
        </Pullquote>

        <SectionRule />
        <ContentEyebrow>What actually goes intermittent</ContentEyebrow>

        <ConceptBlock
          title="Five mechanisms, and only one of them is a loose terminal"
          plainEnglish="Connections are the first suspect and not the only one. Knowing the alternatives stops you searching one place forever."
          onSite="Each mechanism has a different correlation, which is what makes the list useful rather than academic."
        >
          <p>
            Intermittent behaviour has a small number of recurring causes, and knowing them matters
            for a reason beyond completeness:{' '}
            <strong>each one correlates with something different</strong>, so the list doubles as a
            set of things to look for in the captured data.
          </p>
          <AppendixTable
            caption="Mechanisms that produce genuinely intermittent behaviour"
            headers={['Mechanism', 'Typically correlates with', 'Owned by']}
            rows={[
              [
                'A marginal connection',
                'Vibration, temperature cycling',
                'Module 7 Section 2 — terminations',
              ],
              [
                'Moisture ingress',
                'Weather, particularly rain; seasonal damp',
                'Module 7 Section 7 — falling insulation resistance',
              ],
              [
                'Coupled interference',
                'A particular load switching or starting',
                'Module 3 Section 5 — coupling mechanisms',
              ],
              [
                '🔴 A marginal loop budget',
                'The top of the range only, not time',
                'Module 7 Section 3 — the loop saturating at full scale',
              ],
              [
                'A device fault that is condition-dependent',
                'Temperature, or a particular operating state',
                'The manufacturer’s documentation',
              ],
            ]}
            notes="A connection is the strongest first candidate. It is the right place to start and the wrong place to stop."
          />
          <p>
            🔴 The fourth row deserves attention because it is the one most often misread as
            intermittent when it is not.{' '}
            <strong>
              A loop whose budget is marginal fails at full scale and works everywhere else
            </strong>
            , so it appears to come and go &mdash; but it is not following time at all. It is
            following the process.
          </p>
          <p>
            That is a genuinely different investigation, and the captured data separates it
            immediately: a fault that correlates with the <em>reading</em> rather than with the{' '}
            <em>clock</em> or the weather is not an intermittent in the sense this section means. It
            is a permanent fault that only shows in part of the range, which Section 2 covered under
            its third triage question.
          </p>
          <p>
            The general lesson is worth carrying into the correlation work below.{' '}
            <strong>
              Before correlating against external things, check whether the fault correlates with
              the measurement itself
            </strong>
            &mdash; because if it does, it is not intermittent and none of the capture strategy is
            needed.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>🔴 Capture, do not observe</ContentEyebrow>

        <ConceptBlock
          title="Instrument the problem instead of watching it"
          plainEnglish="You cannot arrange to be standing there when it happens. So arrange for something else to be."
          onSite="This is the whole strategy, and everything practical follows from it."
        >
          <p>
            If the fault will not appear while you are watching, the answer is not to watch harder.{' '}
            <strong>
              It is to set up equipment that captures events occurring when you are not there
            </strong>
            , and then go and do something else.
          </p>
          <p>
            That reframes the job. Instead of hunting for a fault you turn the loop into something
            that records its own misbehaviour, and the diagnosis happens afterwards, on evidence.
          </p>
          <AppendixTable
            caption="Ways of capturing an event nobody witnessed"
            headers={['Method', 'What it catches', 'What it cannot tell you']}
            rows={[
              [
                'Min/max capture on a meter',
                'That an excursion happened, and how far',
                '🔴 When it happened — and nothing shorter than the scan time',
              ],
              [
                'Timestamped logging or trending',
                'What happened and when',
                'Anything faster than its own sample rate',
              ],
              [
                'Physical evidence left behind',
                'That an event occurred at some past time',
                'How often, or when',
              ],
              [
                'Recording the indication itself',
                'Behaviour nobody was present to see',
                'What was happening electrically behind it',
              ],
            ]}
            notes="Module 4 Section 5 covers these instruments and their limits properly. What matters here is choosing one that could catch the fault you are actually chasing."
          />
          <p>
            🔴 That last point in the notes is the one that decides whether the exercise is worth
            anything. Module 4 Section 5 established two limits that apply directly:
          </p>
          <ul>
            <li>
              <strong>A meter samples rather than watching.</strong> A transient shorter than its
              scan time occurs between two looks and leaves no trace at all.
            </li>
            <li>
              <strong>Absence of a recorded excursion is not proof that nothing happened.</strong>{' '}
              It is proof that nothing was seen, which is a weaker statement.
            </li>
          </ul>
          <p>
            So &ldquo;I left a meter on it overnight and it saw nothing&rdquo; rules out slow
            excursions and sustained dropouts, and rules out nothing else.{' '}
            <strong>
              If the fault you are chasing is a fast glitch, that test was never capable of finding
              it
            </strong>{' '}
            &mdash; and reporting it as evidence of a healthy loop is how an intermittent survives
            its first investigation.
          </p>
          <p>
            The other distinction from Module 4 Section 5 earns its keep here.{' '}
            <strong>A basic capture records what happened; a timestamped one records when</strong>.
            For an intermittent, when is worth far more &mdash; because a time is what lets you lay
            the event alongside everything else that was happening.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-8-3-capture"
          question="An intermittent is suspected to be a very brief dropout. A meter with min/max is left on the loop for two nights and records nothing. What is the correct conclusion?"
          options={[
            'The test could not have caught a transient shorter than the meter’s scan time, so it has not addressed the suspected fault',
            'The fault must be in the controller',
            'The fault has cleared itself',
            'The loop is healthy and the fault report was wrong',
          ]}
          correctIndex={0}
          explanation="The capture method has to match the fault being hunted. A brief dropout is precisely the case a sampled instrument can miss entirely, so a quiet record is consistent with both a sound loop and the suspected fault — which makes it no evidence at all."
        />

        <SectionRule />
        <ContentEyebrow>🔴 Correlation is the diagnosis</ContentEyebrow>

        <ConceptBlock
          title="A fault tied to something else is nearly solved"
          plainEnglish="Random is hard. “Whenever the big pump starts” is almost an answer."
          onSite="This is where most intermittents are actually cracked."
        >
          <p>
            Once events are being captured with times attached, the productive question changes from
            &ldquo;what is broken?&rdquo; to{' '}
            <strong>&ldquo;what else is true whenever this happens?&rdquo;</strong>
          </p>
          <p>
            🔴 The value is large.{' '}
            <strong>
              A fault that occurs apparently at random is extremely difficult. A fault that occurs
              whenever a particular thing happens has had most of its mystery removed
            </strong>
            , and for two separate reasons: the correlation proposes a mechanism, and it gives you a
            way to <em>reproduce the conditions deliberately</em> rather than waiting.
          </p>
          <p>
            That second reason is the one that changes the job. It restores the precondition from
            the first block &mdash; if you can make the fault appear, you can test while it is
            present, and Section 1&rsquo;s method works again.
          </p>
          <p>What is worth correlating against:</p>
          <ul>
            <li>
              <strong>Temperature</strong>, on both a daily and a seasonal cycle. Connections expand
              and contract, and a marginal one can be sound warm and open cold.
            </li>
            <li>
              <strong>Vibration</strong> &mdash; plant starting and stopping, machinery running
              nearby. Module 7 Section 2 works through exactly this case, where a loop misbehaved
              only while an extract fan ran.
            </li>
            <li>
              <strong>Electrical load or switching</strong> nearby, which points at the coupling
              mechanisms Module 3 Section 5 covers.
            </li>
            <li>
              <strong>Weather</strong>, particularly rain, which points at moisture ingress at
              terminations &mdash; the mechanism Module 7 Section 7 identifies as the usual cause of
              falling insulation resistance.
            </li>
            <li>
              <strong>Plant state</strong> &mdash; a particular operation, a changeover, a batch
              step.
            </li>
            <li>
              <strong>Time of day</strong>, which often stands in for temperature, for load, or for
              somebody doing something.
            </li>
            <li>
              <strong>Recent work</strong>. Section 1 made the general point that something which
              worked and then did not usually had something happen to it.
            </li>
          </ul>
          <p>
            A correlation names the <strong>trigger</strong> rather than the fault, and that is
            worth keeping straight. &ldquo;It happens when the big motor starts&rdquo; is consistent
            with interference coupled during starting and with vibration disturbing a poor
            connection &mdash; two different mechanisms in two different modules. The correlation
            has narrowed the field enormously and has not finished the job.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Making it happen on purpose"
          plainEnglish="Once you have a candidate trigger, try to pull it — and watch what you have just changed."
          onSite="Provocation is the fastest route from a correlation to a confirmed cause, and it needs handling carefully."
        >
          <p>
            A correlation is worth more than a clue because it suggests something you can{' '}
            <strong>do</strong>. If a fault appears whenever a nearby machine runs, you can run that
            machine. If it follows temperature, a heat gun or a cold spray on a suspect area is a
            deliberate version of the same experiment.
          </p>
          <p>
            🔴 This is the point where an intermittent becomes an ordinary fault, and it is worth
            saying explicitly why:{' '}
            <strong>
              if you can make it appear on demand, the fault is present while you test, and
              everything in Section 1 works again
            </strong>
            . Provocation is not a separate technique so much as a way of restoring the
            precondition.
          </p>
          <p>Provocation on instrument work is usually mechanical or thermal:</p>
          <ul>
            <li>
              <strong>Gently flexing or tapping</strong> a suspect termination or cable while
              watching the signal, which tests a mechanical hypothesis directly.
            </li>
            <li>
              <strong>Local warming or cooling</strong> of a suspect area where the correlation
              points at temperature.
            </li>
            <li>
              <strong>Running the correlated plant item</strong> deliberately rather than waiting
              for it to run.
            </li>
          </ul>
          <p>
            🔴 Two disciplines make the difference between this being useful and being the mistake
            in the next block.
          </p>
          <p>
            <strong>Watch the signal while you provoke, not afterwards.</strong> The information is
            in whether the signal moved <em>at the moment</em> you did something, which means
            somebody has to be looking at it, or logging it, as it happens. A fault that appeared at
            some point during ten minutes of tapping has told you very little.
          </p>
          <p>
            <strong>Change as little as possible.</strong> Flexing a cable to see whether the signal
            twitches is a test. Remaking the termination is a repair, and once it is done the
            condition that produced the evidence is gone &mdash; which is the trap the next block is
            about.
          </p>
          <p>
            One caution on scope: provoking a loop means deliberately disturbing a working system,
            and on a live plant that is a decision with consequences beyond the loop. Section 6
            covers what that involves and when it is appropriate.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="What the fault leaves behind, and how often it comes"
          plainEnglish="Some faults mark the equipment. And a fault arriving more often is telling you something too."
          onSite="Both let you learn about an event you never saw."
        >
          <p>
            Two further sources of evidence are easy to overlook because neither requires the fault
            to be present.
          </p>
          <p>
            <strong>Physical traces.</strong> Some faults mark the equipment they occur in, so the
            evidence outlives the event. Heat leaves <strong>discolouration or charring</strong>;
            water leaves staining and corrosion; arcing leaves pitting. If a hypothesis involves
            something getting hot intermittently, looking for the mark it would have left is a way
            of detecting an episode nobody witnessed and no instrument recorded.
          </p>
          <p>
            It is also a rare case where an inspection genuinely settles something, which is unusual
            in a module that has repeatedly warned that inspection proves less than measurement.
          </p>
          <p>
            🔴 <strong>Frequency.</strong> How often an intermittent occurs is data in its own
            right, and the trend matters more than the rate:
          </p>
          <ul>
            <li>
              <strong>Stable frequency</strong> suggests something being triggered by a condition
              that recurs &mdash; which points back at correlation.
            </li>
            <li>
              <strong>Increasing frequency</strong> suggests deterioration: a connection getting
              worse, insulation continuing to fall, corrosion progressing.
            </li>
          </ul>
          <p>
            The second has an uncomfortable but useful property.{' '}
            <strong>
              A fault becoming more frequent is bad news for the plant and good news for catching it
            </strong>
            , because a fault present more often is one a capture is more likely to record and one
            you are more likely to be present for.
          </p>
          <p>
            That is the same shape of argument Module 7 Section 7 makes about insulation resistance
            falling over months: the direction of travel carries more information than any single
            observation.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>🔴🔴 The discipline</ContentEyebrow>

        <CommonMistake
          title="🔴 Signing off a fault because it stopped"
          whatHappens={
            <>
              <p>
                An intermittent is investigated. Terminations are opened and inspected, connections
                are checked and remade, a suspect device is reseated. The loop is watched for a
                while and behaves perfectly. The job is closed as resolved.
              </p>
              <p>
                🔴 The problem is that{' '}
                <strong>disturbing a poor connection can temporarily restore it</strong>. A corroded
                or slightly loose termination that is moved, cleaned by the movement, or
                re-tightened onto a fresh part of the conductor will often work perfectly &mdash;
                for a while.
              </p>
              <p>
                That produces exactly the same observation as having fixed the fault, so the two
                cannot be told apart by watching. The act of investigating has changed the system,
                and{' '}
                <strong>
                  a fault that stops at the moment you disturb something is ambiguous rather than
                  solved
                </strong>
                .
              </p>
              <p>
                It returns weeks later, and it now returns to a system carrying a record saying it
                was investigated and resolved. The next person reads that, reasonably concludes the
                terminations have been dealt with, and looks somewhere else &mdash; so the record
                actively steers the second investigation away from the real cause.
              </p>
            </>
          }
          doInstead={
            <>
              <p>
                Hold to one rule:{' '}
                <strong>
                  a fault is not resolved when it stops. It is resolved when you can explain why it
                  happened.
                </strong>{' '}
                &ldquo;It is working now&rdquo; describes the present moment and makes no claim
                about cause.
              </p>
              <p>That has practical consequences worth accepting:</p>
              <ul>
                <li>
                  <strong>Look before you disturb.</strong> Once a suspect termination has been
                  opened, whatever state it was in has been destroyed. Examine and record its
                  condition first &mdash; a discoloured, corroded or visibly loose connection is
                  evidence, and it stops being evidence the moment you remake it.
                </li>
                <li>
                  <strong>Change one thing at a time.</strong> Remaking six terminations and finding
                  the fault gone explains nothing, and leaves you unable to say which of the six
                  mattered.
                </li>
                <li>
                  <strong>Say what you actually know.</strong> &ldquo;Fault not present since
                  terminations remade; cause not confirmed&rdquo; is an honest and genuinely useful
                  record. &ldquo;Fault resolved&rdquo; is neither if you cannot say why.
                </li>
                <li>
                  <strong>Leave the capture running.</strong> If a fix is unconfirmed, the cheapest
                  possible verification is to keep logging and see whether it returns.
                </li>
              </ul>
              <p>
                Module 7 Section 6 made the same argument about commissioning: a signed record that
                no longer describes the installation is worse than no record, because it will be
                believed. An unexplained fault signed off as fixed is that failure in its most
                expensive form.
              </p>
            </>
          }
        />

        <InlineCheck
          id="ins-8-3-signoff"
          question="You remake several terminations on a loop with an intermittent fault and it has behaved for a week. What is the honest status?"
          options={[
            'Resolved — a week of good behaviour confirms it',
            'Not present since the work, cause unconfirmed — because disturbance alone can produce this result',
            'Resolved, provided the terminations were the only thing changed',
            'Unresolved, and the work should be undone',
          ]}
          correctIndex={1}
          explanation="A week proves the fault is not currently occurring, which is what a genuine repair and a temporarily restored connection both look like. Recording the distinction costs nothing now and saves the next investigation from starting in the wrong place."
        />

        <ConceptBlock
          title="Handing on a fault you have not solved"
          plainEnglish="An unresolved intermittent gets passed to somebody else. What they need is the pattern, not an apology."
          onSite="This is the one record that genuinely decides how long the next investigation takes."
        >
          <p>
            Intermittents are, more than any other fault, the ones that outlast the person
            investigating them. A shift ends, a contract finishes, a fault goes quiet for a month.{' '}
            <strong>
              The chance that the person who eventually solves it is the person who started is low
            </strong>
            , which makes what you leave behind part of the work rather than an administrative
            afterthought.
          </p>
          <p>
            The course covers records thoroughly elsewhere &mdash; Module 4 Section 5 on what turns
            a reading into something actionable, Module 6 Section 4 on why a record needs a verdict.
            What is specific here is that{' '}
            <strong>
              an unresolved intermittent needs the opposite of a verdict. It needs the raw pattern.
            </strong>
          </p>
          <p>Four things are worth more than anything else you could write:</p>
          <ul>
            <li>
              🔴 <strong>Every occurrence, with a time.</strong> This is the single most valuable
              item, because occurrences accumulate into the correlation that eventually solves it.
              Three timestamps from three different people beat any amount of narrative.
            </li>
            <li>
              <strong>What it looked like.</strong> Dropped to zero, drifted, went noisy, froze
              &mdash; Section 2&rsquo;s triage questions, answered. These lead in different
              directions and &ldquo;faulty&rdquo; loses all of it.
            </li>
            <li>
              <strong>What has been eliminated, and how.</strong> Not what was checked but what the
              check established. This is what stops the next person repeating a week of work.
            </li>
            <li>
              <strong>What capture is currently running</strong>, and where. A logger left in place
              and forgotten helps nobody; one that is documented is the most useful thing on the
              job.
            </li>
          </ul>
          <p>
            🔴 And state the status honestly, because this is where the previous block bites. If
            terminations were remade and the fault has not returned,{' '}
            <strong>
              &ldquo;not present since 14 August, cause unconfirmed&rdquo; is a true and useful
              record
            </strong>
            . &ldquo;Resolved&rdquo; is neither, and it will send the next investigation somewhere
            else entirely.
          </p>
        </ConceptBlock>

        <Scenario
          title="A loop that fails about once a fortnight"
          situation={
            <>
              <p>
                A pressure loop drops out briefly, perhaps once every couple of weeks. The reading
                falls to zero for a few seconds and recovers. It has been investigated twice. Both
                times everything tested correct and the job was closed.
              </p>
              <p>
                Operations are no longer reporting it individually and have started treating it as
                something the loop does.
              </p>
            </>
          }
          whatToDo={
            <>
              <p>
                Start by recognising why the two previous investigations found nothing, because it
                was not incompetence.{' '}
                <strong>
                  Both were conducted while the loop was healthy, so both returned correct results
                  that carried no information.
                </strong>{' '}
                A third round of the same testing will produce a third clean set.
              </p>
              <p>
                🔴 So do not test. <strong>Set up a capture and leave.</strong> The symptom
                described &mdash; a drop to zero lasting seconds &mdash; is well within what a
                timestamped logger or a trend will catch, and it matters that it is timestamped
                rather than a bare min/max, because the time is what makes the next step possible.
              </p>
              <p>
                While that runs, gather the history rather than more measurements.{' '}
                <strong>Roughly when did the previous episodes occur?</strong> Operations may not
                have logged them individually, but shift records, alarm history and people&rsquo;s
                memory of what was happening will often place several of them.
              </p>
              <p>
                Then correlate. A fortnightly interval is itself a clue worth taking seriously,
                because genuinely random faults do not usually keep to a rhythm.{' '}
                <strong>Something happening on roughly that cycle is a strong candidate</strong>{' '}
                &mdash; a cleaning operation, a changeover, a delivery, a routine test of other
                equipment, a maintenance visit.
              </p>
              <p>
                A drop to zero is also worth reading in the terms Section 2 gave. Zero current means
                the circuit is not intact rather than the measurement being wrong, which points at
                the loop, its terminations or its supply rather than at the transmitter or the
                process connection &mdash; and that narrows what to inspect considerably.
              </p>
              <p>
                🔴 Finally, deal with the normalisation. A fault that has stopped being reported is
                not a fault that has gone away; it is one that has become invisible.{' '}
                <strong>Ask operations to note the time whenever it next happens</strong>, because a
                handful of timestamps is worth more than another day of testing.
              </p>
            </>
          }
          whyItMatters={
            <>
              <p>
                Two competent investigations produced nothing because both applied a method whose
                precondition was absent. Recognising that at the start of the third saves repeating
                the first two.
              </p>
              <p>
                The normalisation is the more serious problem. Once a fault becomes something the
                loop does, it stops generating reports, and the events that would have built a
                correlation stop being recorded &mdash; so the fault becomes progressively harder to
                solve the longer it is tolerated.
              </p>
            </>
          }
        />

        <FAQ
          items={[
            {
              question: 'How long should a capture be left running?',
              answer:
                'Long enough to cover several expected occurrences rather than one, because a single captured event establishes that it happens and a handful establishes a pattern. If the fault comes roughly weekly, a fortnight is a reasonable minimum, and there is little cost in leaving a logger longer. The judgement worth making is about the method rather than the duration: a capture that could not detect the suspected fault is not improved by running it for a month, which is the trap Module 4 Section 5 describes when a transient is shorter than the instrument’s scan time.',
            },
            {
              question: 'The fault has not recurred in three months. Is it fixed?',
              answer:
                'It is not occurring, which is not the same claim. If you can explain what was wrong and why the work addressed it, then it is fixed and the three months are confirmation. If you cannot, then three quiet months are consistent with a genuine repair and with a marginal connection that was temporarily improved by being disturbed — and a fault whose interval was already measured in weeks is not strongly contradicted by a few quiet months. The honest position is that it is unconfirmed, and saying so in the record costs nothing.',
            },
            {
              question: 'Is it ever right to replace a component without proving it faulty?',
              answer:
                'Sometimes, and it is worth being clear-eyed about what you are doing when you do. Replacing a strongly suspected item on a fault that is expensive to leave running can be a reasonable engineering decision, particularly where the component is cheap and access is difficult. What it is not is a diagnosis — if the fault stops you have not learned why, and if it continues you have spent the time anyway. The important part is recording it as a substitution rather than as a confirmed cause, so that nobody later reads it as an explanation.',
            },
            {
              question: 'What if the fault only happens when nobody can be there?',
              answer:
                'That is the ordinary case rather than a special difficulty, and it is exactly what capture exists for. Overnight, at weekends, or during an operation you cannot attend are all situations where equipment can be left in place and you cannot. It is also worth asking whether the timing itself is the correlation: a fault that only happens overnight may be following temperature, and one that only happens at weekends may be following a reduced load or a different operating mode. The inconvenience of the timing is frequently the clue.',
            },
            {
              question: 'Should an intermittent be escalated if it cannot be found?',
              answer:
                'Yes, and the useful trigger is when the fault affects something whose failure matters rather than when patience runs out. An intermittent on a loop that feeds a trip or an alarm is a different proposition from one on an indication, because the consequence of it occurring at the wrong moment is not merely a wrong reading. What escalation should carry is the pattern rather than an apology — occurrences with times, what has been eliminated, and what capture is currently running.',
            },
            {
              question: 'Does an intermittent always mean a loose connection?',
              answer:
                'No, though connections are a strong first candidate and Module 7 Section 2 explains why they fail in exactly this way. Other mechanisms produce genuinely intermittent behaviour: moisture that comes and goes with weather, interference that only appears when a particular load switches, a marginal loop budget that fails only at full scale, and equipment with a genuine fault that is temperature-dependent. Treating every intermittent as a connection problem is a form of the fixation Section 1 warns about — it is the right place to start and the wrong place to stop.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            '🔴 An intermittent is a different kind of problem, not a harder one — it breaks the precondition every test relies on.',
            'Section 1’s method assumes the fault is present while you test. During a healthy period it simply is not.',
            'A test run then returns a result that is entirely accurate and carries no information.',
            '🔴 A sound system and an intermittently faulty one are indistinguishable while the faulty one is behaving.',
            'So the first decision is not what to test — it is whether testing is the right activity at all.',
            '🔴 The strategy: stop trying to observe the fault, set something up to capture it, and go away.',
            'Module 4 Section 5 owns the capture instruments and, importantly, their limits.',
            '🔴 A meter samples; a transient shorter than its scan time leaves no trace. Absence of a record is not proof nothing happened.',
            'Basic capture records WHAT. Timestamped logging records WHEN — and for an intermittent, when is worth far more.',
            '🔴 Correlation is the diagnosis: it proposes a mechanism AND lets you reproduce the conditions deliberately.',
            'Reproducing it restores the precondition, so Section 1’s method works again.',
            'Correlate against temperature, vibration, load, weather, plant state, time of day and recent work.',
            'A correlation names the TRIGGER, not the fault — “when the motor starts” fits both coupling and vibration.',
            'Some faults leave physical evidence: discolouration, charring, staining, pitting. A rare case where inspection settles something.',
            'Increasing frequency means deterioration — bad for the plant, good for catching it. Same logic as M7.7’s IR trend.',
            '🔴🔴 Never clear a fault you cannot explain. It is resolved when you can say why, not when it stops.',
            '🔴 Disturbing a poor connection can temporarily restore it, so investigating can mask the fault you are chasing.',
            'Look and record before you disturb — the condition of a termination is evidence until you remake it.',
            'Change one thing at a time, or a cleared fault explains nothing.',
            '“Not present since the work, cause unconfirmed” is an honest record. “Resolved” without a cause is not.',
            'Five mechanisms go intermittent: a marginal connection, moisture, coupled interference, a marginal loop budget, a condition-dependent device fault.',
            '🔴 Check first whether the fault correlates with the READING rather than the clock — a marginal budget fails at full scale and is not intermittent at all.',
            '🔴 Provocation restores the precondition: if you can make it appear on demand, Section 1’s method works again.',
            'Watch the signal WHILE you provoke, and change as little as possible — flexing a cable is a test, remaking it is a repair.',
            'An unresolved intermittent usually outlasts the person investigating it, so what you leave behind is part of the work.',
            '🔴 It needs the raw pattern, not a verdict: every occurrence with a time, what it looked like, what was eliminated, and what capture is running.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself — Module 8.3" />

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-8-section-2')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-left touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              <ChevronLeft className="h-3 w-3" /> Previous section
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Reading the symptom
            </span>
          </button>
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-8-section-4')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-right touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center justify-end gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              Next section <ChevronRight className="h-3 w-3" />
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Preventive maintenance
            </span>
          </button>
        </div>
      </HubBody>
    </HubPage>
  );
};

export default InstrumentationModule8Section3;
