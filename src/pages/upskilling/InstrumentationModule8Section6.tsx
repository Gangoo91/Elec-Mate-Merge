/**
 * Module 8 · Section 6 — Fault finding on running plant
 *
 * Rewritten 2026-08-30. REPOSITIONED, with Andrew's agreement, from the old
 * outline title "Safety considerations during troubleshooting" — which as
 * written would have substantially repeated Module 1 Section 5.
 *
 * 🔴 M1.5 OWNS GENERAL SAFE WORKING and owns it well (46 hits): DSEAR duties,
 * what an explosive atmosphere is, the gas and dust zone schemes, Ex equipment
 * and CompEx competence. Its opening point is the FOUNDATION this page builds
 * on and must not restate:
 *   "The electrical side of an instrument loop is low energy and easy to
 *    isolate. The process it is bolted to is frequently hot, pressurised, full
 *    or toxic — and isolating the circuit does nothing about that."
 *
 * 🔴 SO THIS PAGE OWNS SOMETHING NARROWER AND UNCOVERED: the hazards created BY
 * THE ACT OF DIAGNOSIS. Not "how to work safely near instruments" but "what you
 * are doing to a live process when you fault-find on it".
 *
 * 🔴 THE DEFINING TENSION, and it follows from Section 3: most work is done on
 * isolated equipment, but a fault often EXISTS ONLY WHILE THE PLANT RUNS —
 * Section 3 established that a test during a healthy period proves nothing. So
 * diagnosis frequently requires the running state, which means deliberately
 * destabilising a working system. That tension is the page.
 *
 * 🔴 TWO FORWARD PROMISES TO PAY (both verified):
 *   8.3 line 652 — "provoking a loop means deliberately disturbing a working
 *        system... Section 6 covers what that involves and when it is
 *        appropriate."
 *   8.4 lines 565 + 883 — "Section 6 covers what putting a loop into manual on
 *        running plant actually involves" and what taking a deliberate trip
 *        involves.
 *
 * 🔴 VERIFIED REFERENCES:
 *   M5.1 — self-regulating settles, integrating RAMPS, runaway ACCELERATES.
 *          Confirmed line 164. The third is why "it will just drift a bit" is
 *          not a safe general assumption.
 *   M7.2 line 708 — "breaking a terminal to reterminate it opens a live control
 *          loop", already citing M5.1. This page generalises it.
 *   M8.4 — proof testing on running plant, controller to manual, partial
 *          testing; and the dormant-function argument that a defeated
 *          protection is absent with nothing indicating it.
 *
 * 🔴 THE SHARPEST INSTRUMENTATION-SPECIFIC HAZARD: on a live loop the signal
 * you INJECT becomes a COMMAND. Sourcing 20 mA to test an indicator also tells
 * the controller the process is at full scale, and it will act on that.
 *
 * ⚠️ NO SOURCE COVERAGE for live-plant diagnostic hazards — searched and
 * confirmed empty (all "force"/"bypass" hits are physics usages). Derived from
 * principles already established in the course plus Kuphaldt §32.4.5's
 * live-testing difficulty, which M8.4 already uses.
 * ⚠️ Do NOT invent permit regimes, isolation procedures or inhibit rules. These
 * are site-specific and contractual. Teach the reasoning, name the decision,
 * and say who owns it.
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

const TITLE = 'Fault finding on running plant | Instrumentation Module 8.6 | Elec-Mate';
const DESCRIPTION =
  'The hazards created by the act of diagnosis itself — why breaking a loop is a control action, why an injected signal is a command, what putting a controller in manual actually transfers, and what defeating a protection costs while it lasts.';

const outcomes = [
  '🔴 Say why fault finding often requires the plant to be running',
  'Explain why that makes diagnosis different from most instrument work',
  '🔴 Say what happens when a live control loop is opened, and why it depends on the process',
  '🔴 Explain why an injected test signal is a command, not just a measurement',
  'Say what putting a controller into manual actually transfers, and to whom',
  '🔴 Say what is absent while a protective function is defeated, and what indicates it',
  'Weigh a reversible action against an irreversible one',
  'Say which of these decisions are not a technician’s to take alone',
];

const quizQuestions = [
  {
    id: 1,
    question: '🔴 Why does fault finding often require the plant to be running?',
    options: [
      'Because many faults only exist in the running state — a test on a healthy or shut-down system proves nothing',
      'Because the process must be at temperature',
      'Because operators need the plant available',
      'Because isolation takes too long',
    ],
    correctIndex: 0,
    explanation:
      'Section 3 established the principle: a test carried out when the fault is absent returns a result that is accurate and useless. If the fault only appears while the plant runs, the running state is a condition of the diagnosis rather than a convenience.',
  },
  {
    id: 2,
    question: 'What makes diagnosis different from most other instrument work?',
    options: [
      'It uses different test equipment',
      'It deliberately disturbs a system that is working, rather than working on one that is isolated',
      'It takes longer',
      'It requires two people',
    ],
    correctIndex: 1,
    explanation:
      'Installation and calibration are normally done on equipment taken out of service. Fault finding frequently has to interfere with something live and in control of a process, which is a different kind of activity with a different set of consequences.',
  },
  {
    id: 3,
    question: '🔴 A live control loop is opened at a terminal. What happens next?',
    options: [
      'The controller alarms and holds its output',
      'Nothing until the loop is remade',
      'The process holds at its current value',
      'It depends on the process — a self-regulating one settles, an integrating one ramps, a runaway one accelerates',
    ],
    correctIndex: 3,
    explanation:
      'Module 5 Section 1 owns this behaviour and the third case is the reason it matters. “It will drift a little” is a safe assumption for some processes and not for others, and the difference is a property of the process rather than of the loop.',
  },
  {
    id: 4,
    question: '🔴 Why is injecting a test signal into a live loop different from measuring one?',
    options: [
      'The injected value becomes a command — the controller acts on it as though it were the measurement',
      'It risks damaging the input card',
      'It invalidates the calibration',
      'It requires the loop to be broken',
    ],
    correctIndex: 0,
    explanation:
      'Sourcing 20 mA to check an indicator also tells the controller the process is at full scale. Everything downstream responds to that, so what began as a test on one device becomes a control action on the plant.',
  },
  {
    id: 5,
    question: 'What does putting a controller into manual actually do?',
    options: [
      'It freezes the process at its current condition',
      'It transfers control of the process to a person, who now has to hold it by hand',
      'It disables the loop’s alarms',
      'It isolates the transmitter electrically',
    ],
    correctIndex: 1,
    explanation:
      'The output stops responding to the measurement, so somebody has to do what the controller was doing. That is a transfer of responsibility to an operator rather than a technical setting, which is why it is agreed rather than simply done.',
  },
  {
    id: 6,
    question: '🔴 What is true while a protective function is inhibited so that work can proceed?',
    options: [
      'The risk is transferred to the control system',
      'It still operates but does not alarm',
      'The protection is absent, and nothing about the plant’s appearance indicates that',
      'It operates with a delay',
    ],
    correctIndex: 2,
    explanation:
      'Section 4 covered the same silence in a different form: a dormant function that has failed looks exactly like one that works. A defeated one is indistinguishable in the same way, which is why an inhibit has to be time-bounded, visible and deliberately removed.',
  },
  {
    id: 7,
    question: 'Why does the reversibility of an action matter when choosing how to test?',
    options: [
      'Reversible actions need no permission',
      'Irreversible actions are always prohibited',
      'Irreversible actions take longer to plan',
      'A link can be put back; a plant that has been tripped cannot simply be un-tripped',
    ],
    correctIndex: 3,
    explanation:
      'Consequences that can be undone allow a cautious approach to be corrected. A trip, a batch spoiled or a process upset propagates beyond the loop and has to be recovered from, which raises the standard of certainty required before acting.',
  },
  {
    id: 8,
    question: 'Which of these decisions is not a technician’s to take alone?',
    options: [
      'Taking a deliberate trip to prove a protective function',
      'Reading a controller faceplate',
      'Inspecting a termination during a shutdown',
      'Measuring the current in a loop',
    ],
    correctIndex: 0,
    explanation:
      'Proving a trip means observing the action occur, which on a live plant means an actual shutdown or an arrangement that avoids one. Either way the consequences land on production and operations, so the decision belongs with them rather than with the person holding the calibrator.',
  },
  {
    id: 9,
    question:
      'Isolating an instrument circuit electrically makes it safe to work on. What does it not address?',
    options: [
      'Nothing — the work is then safe',
      'The process the instrument is connected to, which may still be hot, pressurised, full or toxic',
      'The risk of a wrong reading afterwards',
      'The need for a second person',
    ],
    correctIndex: 1,
    explanation:
      'Module 1 Section 5 makes this point at the start of the course: the electrical side of a loop is low energy and easy to isolate, and isolating it does nothing whatever about what the instrument is bolted to.',
  },
  {
    id: 10,
    question: 'Before disturbing a live loop, what is the most useful question to ask?',
    options: [
      'Who installed it?',
      'How long will it take?',
      'What is this loop controlling, and what happens to that if the signal is lost or wrong?',
      'When was it last calibrated?',
    ],
    correctIndex: 2,
    explanation:
      'The consequence lives in the process rather than the loop, so it cannot be judged from the instrumentation alone. A loop feeding an indication and a loop feeding a trip may look identical at the terminals and be entirely different to interfere with.',
  },
  {
    id: 11,
    question: 'Why does provoking an intermittent fault need particular care on a live plant?',
    options: [
      'Because it requires specialist equipment',
      'Because intermittents are rare',
      'Because it takes a long time',
      'Because provocation means deliberately trying to make a working system misbehave',
    ],
    correctIndex: 3,
    explanation:
      'Section 3 recommends provocation because it restores the condition that makes testing meaningful. On live plant it is an attempt to induce a fault in something currently in control of a process, which is a different proposition from waiting for one.',
  },
  {
    id: 12,
    question: 'What should happen to any temporary change made during fault finding?',
    options: [
      'It only needs recording if it affected the process',
      'It is removed by the next shift',
      'It is recorded when made and confirmed removed before leaving — links, inhibits, manual modes and isolations',
      'It can be left if it is harmless',
    ],
    correctIndex: 2,
    explanation:
      'Section 4 established that maintenance itself causes faults, and every example was something left in a state nobody intended. A temporary change is the clearest possible version of that, and the check costs less than the fault it prevents.',
  },
];

const InstrumentationModule8Section6 = () => {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <HubPage>
      <HubMasthead
        section="Module 8 · Section 6"
        title="Fault finding on running plant"
        backTo="/electrician/upskilling/instrumentation-module-8"
      />

      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          Most instrument work happens on something that has been made safe. Diagnosis often cannot,
          and that changes what you are doing.
        </p>

        <TLDR
          points={[
            '🔴 Fault finding often needs the plant running, because Section 3 showed a test during a healthy period proves nothing.',
            '🔴 Opening a live loop is a control action. What happens next is a property of the process, not of the loop.',
            'A self-regulating process settles, an integrating one ramps, a runaway one accelerates (Module 5 Section 1).',
            '🔴 On a live loop the signal you inject is a COMMAND — source 20 mA and the controller acts as though the process is at full scale.',
            'Putting a controller in manual transfers the process to a person. That is agreed, not simply done.',
            '🔴 While a protection is inhibited it is absent, and nothing about the plant indicates it — the same silence as a failed dormant trip.',
            '🔴 Record every temporary change when you make it, and confirm it removed before you leave.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <ContentEyebrow>🔴 Why this is different work</ContentEyebrow>

        <ConceptBlock
          title="The fault often only exists while the plant runs"
          plainEnglish="You cannot always make things safe first, because making them safe can make the fault disappear."
          onSite="That tension is what separates diagnosis from every other kind of instrument job."
        >
          <p>
            Almost everything else in this course happens on equipment that has been taken out of
            service. A cable is tested with the devices disconnected, per Module 7 Section 7. An
            instrument is calibrated on a bench. A loop is commissioned before start-up, which
            Module 7 Section 6 made a point of.
          </p>
          <p>
            🔴 Fault finding is the exception, and the reason is structural rather than cultural.{' '}
            <strong>
              Section 3 established that a test performed while the fault is absent returns a result
              that is entirely accurate and completely useless.
            </strong>{' '}
            If a fault only appears when the plant is running, hot, loaded or vibrating, then the
            running state is a <em>condition of the diagnosis</em> rather than an inconvenience to
            be worked around.
          </p>
          <p>That produces a genuine and unavoidable tension:</p>
          <ul>
            <li>
              <strong>Making things safe often means making the fault disappear</strong>, and then
              you are testing a healthy system.
            </li>
            <li>
              <strong>Keeping the fault present means working on something live</strong> that is
              controlling a process.
            </li>
          </ul>
          <p>
            Module 1 Section 5 set out the foundation this rests on, and it is worth repeating as a
            starting position rather than developing again:{' '}
            <strong>
              the electrical side of an instrument loop is low energy and easy to isolate, and the
              process it is bolted to is frequently hot, pressurised, full or toxic &mdash;
              isolating the circuit does nothing whatever about that.
            </strong>
          </p>
          <p>
            🔴 What this section adds is the other half.{' '}
            <strong>On running plant you are often not isolating the electrical side either</strong>
            , and the loop you are working on is actively controlling something. The hazard is no
            longer only what the instrument is attached to. It is{' '}
            <strong>what the instrument is doing</strong>.
          </p>
        </ConceptBlock>

        <Pullquote>
          Everywhere else in this course, making it safe comes first. Here, making it safe can be
          the thing that hides the fault.
        </Pullquote>

        <SectionRule />
        <ContentEyebrow>🔴 What you are actually doing</ContentEyebrow>

        <ConceptBlock
          title="Opening a loop is a control action"
          plainEnglish="Breaking a live loop does not pause the process. It tells the controller something, and the process responds."
          onSite="What happens next is a property of the process, and it is worth knowing before rather than after."
        >
          <p>
            Module 7 Section 2 made this point about reterminating in a live panel, and it
            generalises to every reason a loop gets opened during fault finding:{' '}
            <strong>
              breaking a live control loop is not a neutral act, and the process does not politely
              hold still while you work
            </strong>
            .
          </p>
          <p>
            What happens depends on what kind of process it is, and Module 5 Section 1 owns that
            distinction:
          </p>
          <AppendixTable
            caption="What a process does when its measurement is lost"
            headers={['Process type', 'Behaviour', 'What that means for you']}
            rows={[
              [
                'Self-regulating',
                'Settles at a new value',
                'Usually recoverable, and often the assumption people make',
              ],
              [
                'Integrating',
                'Ramps steadily in one direction',
                'Time-limited — a tank level will keep going',
              ],
              [
                '🔴 Runaway',
                'Accelerates',
                '🔴 The case that makes “it will drift a bit” unsafe as a general assumption',
              ],
            ]}
            notes="This is a property of the process rather than of the loop, so it cannot be judged from the terminals."
          />
          <p>
            🔴 The third row is the one worth carrying.{' '}
            <strong>
              Assuming a process will drift gently is a reasonable expectation for some plants and a
              serious error for others
            </strong>
            , and the loop looks the same either way. Two terminals in a marshalling cabinet do not
            tell you which you are dealing with.
          </p>
          <p>
            Which produces the single most useful question to ask before disturbing anything live:{' '}
            <strong>
              what is this loop controlling, and what happens to that if its signal is lost or
              wrong?
            </strong>{' '}
            The answer lives in the process, not in the instrumentation, so it usually means asking
            somebody rather than working it out from a drawing.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="🔴 The signal you inject is a command"
          plainEnglish="Sourcing a current to test an indicator also tells the controller the process is at that value."
          onSite="This is the hazard most specific to instrumentation, and the easiest to overlook."
        >
          <p>
            Module 6 Section 2 covers using a calibrator in source mode to drive a loop, and Module
            7 Section 6 covers injecting values during commissioning. Both are performed{' '}
            <strong>before the loop is in service</strong>, which is what makes them
            straightforward.
          </p>
          <p>
            🔴 On a live loop the same action means something entirely different.{' '}
            <strong>
              What you inject is not a test value. It is a measurement, as far as everything
              downstream is concerned, and the controller will act on it.
            </strong>
          </p>
          <p>
            Source 20 mA to see whether a panel indicator responds, and you have simultaneously told
            the controller the process is at full scale. What follows is not a display artefact:
          </p>
          <ul>
            <li>
              <strong>The controller drives its output</strong> to correct what it believes is an
              enormous error.
            </li>
            <li>
              <strong>A valve moves, a drive changes speed, a heater turns off</strong> &mdash;
              whatever the loop actually does.
            </li>
            <li>
              <strong>Alarms and trips see the injected value too</strong>, and a trip does not know
              it is a test.
            </li>
          </ul>
          <p>
            So the injected signal propagates exactly as far as a real measurement would, which is
            the whole design intent of a control system working correctly.{' '}
            <strong>
              The system is not misbehaving when this happens. It is doing precisely what it was
              built to do.
            </strong>
          </p>
          <p>
            The practical consequence is that{' '}
            <strong>a loop is taken out of the control decision before it is injected into</strong>,
            not after somebody notices the valve moving &mdash; which is what the next block is
            about.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-8-6-inject"
          question="A technician sources 12 mA into a live temperature loop to check the panel indicator, with the controller still in automatic. What else happens?"
          options={[
            'Nothing — the indicator is a separate device',
            'The controller alarms and holds its last output',
            'The controller treats 12 mA as the measurement and acts on it, moving whatever it controls',
            'The transmitter overrides the injected signal',
          ]}
          correctIndex={2}
          explanation="Everything downstream of the injection point sees a measurement, because that is what a 4–20 mA signal is. The controller has no way to distinguish a test from the process, so it responds to the value it is given — as does any alarm or trip configured on that signal."
        />

        <SectionRule />
        <ContentEyebrow>Handing the process over</ContentEyebrow>

        <ConceptBlock
          title="Manual mode transfers responsibility to a person"
          plainEnglish="Putting a controller in manual does not freeze anything. It means somebody has to do the controller's job by hand."
          onSite="Which makes it a conversation, not a setting."
        >
          <p>
            Module 8 Section 4 described the standard way of proof testing an instrument on running
            plant: put the controller into manual, let an operator hold the process, exercise the
            transmitter, then restore. That is genuinely the right technique, and it is worth being
            clear about what it involves.
          </p>
          <p>
            🔴 <strong>Manual does not mean paused.</strong> The controller stops responding to the
            measurement and holds its output where it was put. The process carries on, and{' '}
            <strong>a person is now doing what the controller was doing</strong>
            &mdash; watching, judging and adjusting.
          </p>
          <p>Three things follow:</p>
          <ul>
            <li>
              <strong>It is agreed rather than done.</strong> Somebody has to be available, willing
              and able to hold that process for as long as the work takes.
            </li>
            <li>
              <strong>The duration matters.</strong> A five-minute manual period and a two-hour one
              are different requests, and the difference should be stated at the start rather than
              discovered.
            </li>
            <li>
              <strong>Restoring it is part of the job.</strong> A loop left in manual is a loop that
              is not controlling, and it will stay that way until somebody notices &mdash; which may
              be a shift later.
            </li>
          </ul>
          <p>
            That last one is worth connecting to Section 4&rsquo;s argument that maintenance causes
            faults. A loop left in manual is{' '}
            <strong>exactly the pattern that section described</strong>: a system left in a state
            nobody intended, by a competent person doing necessary work, with no obvious symptom at
            the time.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="🔴 What is absent while a protection is defeated"
          plainEnglish="Inhibiting a trip so you can work means the trip is not there. Nothing about the plant shows that."
          onSite="This is the same silence Section 4 described, arranged deliberately."
        >
          <p>
            Some fault finding requires a protective function to be inhibited, bypassed or otherwise
            prevented from acting &mdash; typically so that testing does not shut a plant down. It
            is a legitimate technique and it carries a specific cost that is easy to under-weight.
          </p>
          <p>
            🔴 <strong>While the inhibit is in place, the protection is not there.</strong> Not
            degraded, not slower &mdash; absent. If the condition it exists to catch arises during
            that period, nothing acts.
          </p>
          <p>
            And it is silent, which is the part that connects to everything else in this module.
            Section 4 established that{' '}
            <strong>
              a dormant protective function that has failed looks exactly like one that works
            </strong>
            . A deliberately defeated one is indistinguishable in exactly the same way &mdash; the
            plant runs normally, nothing reads wrongly, and no operator looking at a screen can
            tell.
          </p>
          <p>The reasoning that follows is not complicated:</p>
          <ul>
            <li>
              <strong>Time-bounded.</strong> An inhibit is for the duration of a task, not for the
              duration of a problem. &ldquo;Until we sort it out&rdquo; is how a temporary defeat
              becomes a permanent one.
            </li>
            <li>
              <strong>Visible.</strong> The people running the plant need to know a protection is
              absent, because they are the compensating measure while it is.
            </li>
            <li>
              <strong>Deliberately removed and confirmed</strong>, rather than assumed to have been
              taken out by whoever put it in.
            </li>
          </ul>
          <p>
            🔴 The compensating point is worth stating plainly:{' '}
            <strong>
              if a protection is defeated, something else has to be doing its job for that period
            </strong>
            &mdash; usually a person watching. An inhibit with no compensating measure is not a
            controlled risk, it is an uncontrolled one with paperwork.
          </p>
          <p>
            How inhibits are authorised, recorded and time-limited is set by the site&rsquo;s own
            regime and is not a matter of individual judgement. What is worth carrying between sites
            is the reasoning: an inhibit is a decision about risk during a known window, and it
            needs to end.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="🔴 Treating an instrument job as electrically small and therefore minor"
          whatHappens={
            <>
              <p>
                Instrument work is genuinely low energy. A 24 V loop carrying a few milliamps is not
                going to hurt anybody, the terminals are small, and the job feels proportionate to
                that &mdash; a link out, a meter in, a value injected, back out again.
              </p>
              <p>
                🔴 The mistake is letting the <strong>electrical scale of the work</strong> set the
                perceived scale of the <strong>consequence</strong>. They are unrelated. A few
                milliamps is what a valve position, a burner firing rate or a shutdown decision is
                made of.
              </p>
              <p>
                Module 1 Section 5 makes the first half of this point at the start of the course:
                isolating the circuit does nothing about a process that is hot, pressurised or
                toxic. The second half is that{' '}
                <strong>
                  the tiny signal you are interfering with is connected to all of that
                </strong>
                .
              </p>
              <p>
                So a two-minute job at a terminal strip can move a valve, ramp a level, spoil a
                batch or trip a unit &mdash; none of which is visible from where the work is being
                done, and all of which happen at the speed of the process rather than the speed of
                the job.
              </p>
            </>
          }
          doInstead={
            <>
              <p>
                Judge the work by <strong>what the loop does</strong> rather than by what it
                carries. Two loops with identical terminals can be entirely different things to
                interfere with.
              </p>
              <ul>
                <li>
                  <strong>Establish what it controls before touching it.</strong> An indication, a
                  control loop, or a protective function &mdash; Section 5 used the same three tiers
                  to weigh when to stop, and they apply just as well to deciding how carefully to
                  proceed.
                </li>
                <li>
                  <strong>Take the loop out of the control decision first</strong> if you are going
                  to inject into it. The order matters: manual first, then inject.
                </li>
                <li>
                  <strong>Tell somebody before, not after.</strong> The people running the plant can
                  absorb a disturbance they are expecting far better than one they are not, and they
                  may know something about timing that changes the plan.
                </li>
                <li>
                  🔴 <strong>Prefer the reversible option where there is a choice.</strong> A link
                  goes back. A tripped plant has to be restarted, a spoiled batch cannot be
                  un-spoiled, and a process upset propagates well beyond the loop you were working
                  on.
                </li>
              </ul>
              <p>
                None of this argues for timidity. Diagnosis on live plant is ordinary, necessary
                work and it gets done every day. The argument is only that{' '}
                <strong>
                  its consequences are set by the process, so the process is what you assess
                </strong>
                &mdash; and the assessment costs a conversation.
              </p>
            </>
          }
        />

        <InlineCheck
          id="ins-8-6-manual"
          question="A loop is put into manual so a transmitter can be tested, and the work finishes late in the shift. What must not be overlooked?"
          options={[
            'Informing the next shift of the results',
            'Recording the test results',
            'Recalibrating the transmitter',
            'Returning the controller to automatic and confirming it — a loop left in manual is not controlling anything',
          ]}
          correctIndex={3}
          explanation="The loop will sit in manual indefinitely, holding a fixed output while the process moves around it, and nothing will indicate that this is unintended. It is the exact pattern Section 4 described — a system left in a state nobody meant, with no symptom at the time."
        />

        <SectionRule />
        <ContentEyebrow>Deciding, and who decides</ContentEyebrow>

        <ConceptBlock
          title="Some of this is not yours to decide alone"
          plainEnglish="Where the consequence lands on production or safety, the decision belongs with the people who carry it."
          onSite="Knowing which decisions those are is part of the competence."
        >
          <p>
            Fault finding on live plant produces a set of decisions, and they do not all sit in the
            same place. Being clear about which is which is worth as much as any technique in this
            module.
          </p>
          <AppendixTable
            caption="Where the decision sits"
            headers={['Action', 'Consequence', 'Whose decision']}
            rows={[
              ['Measuring a loop current without breaking it', 'None to the process', 'Yours'],
              [
                'Opening a loop on an indication',
                'A lost reading',
                'Yours, with the people using it told',
              ],
              [
                'Putting a control loop into manual',
                'An operator must hold the process',
                'Agreed with operations',
              ],
              [
                'Injecting into a live control loop',
                'A real control action on the plant',
                'Agreed, and after manual',
              ],
              [
                '🔴 Inhibiting a protective function',
                'The protection is absent for that period',
                '🔴 The site’s own regime — never informal',
              ],
              [
                '🔴 Taking a deliberate trip to prove a function',
                'A shutdown',
                '🔴 Operations and production',
              ],
            ]}
            notes="The technical skill sits at the top of this table. The judgement that matters sits at the bottom."
          />
          <p>
            Section 4 raised the last row directly: proving a protective function means driving the
            signal through the set-point and <strong>observing the action actually occur</strong>,
            which on a live plant means either an actual shutdown or an arrangement that exercises
            the function without one. Both are operational decisions.
          </p>
          <p>
            🔴 The point is not that a technician defers everything. It is that{' '}
            <strong>
              the consequences of these actions land on people who are not in the marshalling
              cabinet
            </strong>
            , and they are entitled to weigh them. Presenting the options clearly &mdash; what the
            test would establish, what it would cost, and what the alternative is &mdash; is the
            part of the job that requires knowing everything in this module.
          </p>
          <p>
            Section 3 raised the same question about provocation, and it is worth restating here
            because it sounds smaller than it is:{' '}
            <strong>
              deliberately trying to make a working system misbehave is a different proposition from
              waiting for it to
            </strong>
            . On an indication it is a reasonable thing to attempt. On something controlling a live
            process it is a decision.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>🔴 Before you leave</ContentEyebrow>

        <ConceptBlock
          title="Leave nothing behind"
          plainEnglish="Every temporary thing you introduce has to be recorded when you make it and removed before you go."
          onSite="This is the last line of defence against the fault the visit itself creates."
        >
          <p>
            Section 4 established that maintenance causes faults, and that every example the course
            had already given was <strong>something left in a state nobody intended</strong> &mdash;
            a barrier earth disconnected, an isolating valve shut, a connection disturbed.
          </p>
          <p>
            Fault finding on running plant produces more of these than any other activity, because
            it is the activity that introduces the most temporary changes. Each of the following is
            normal, correct while it lasts, and a fault the moment it outlasts the job:
          </p>
          <ul>
            <li>
              <strong>Links or disconnects opened</strong> to break a loop for measurement.
            </li>
            <li>
              <strong>Controllers left in manual</strong> after the reason for it has passed.
            </li>
            <li>
              <strong>Inhibits, bypasses and forced values</strong> put in to allow work to proceed.
            </li>
            <li>
              <strong>Process isolations</strong> closed to work on an impulse line &mdash; Section
              2 covered what a shut isolating valve does to a reading, and how completely invisible
              it is.
            </li>
            <li>
              <strong>Test equipment left connected</strong>, including loggers left deliberately,
              per Section 3.
            </li>
          </ul>
          <p>
            🔴 The discipline is the same for all of them and it is short:{' '}
            <strong>write it down when you make it, and confirm it removed before you leave</strong>
            . Not remembered &mdash; written, because the whole category is characterised by
            producing no symptom at the time.
          </p>
          <p>
            A logger left in place deliberately is the one exception worth naming, and it proves the
            rule: Section 3 recommended leaving one, and also recommended documenting where it is.{' '}
            <strong>
              The difference between a deliberate temporary change and a forgotten one is entirely
              in the record
            </strong>
            .
          </p>
        </ConceptBlock>

        <Scenario
          title="A trip that needs proving, on a plant that cannot stop"
          situation={
            <>
              <p>
                The high-level trip from Section 4 &mdash; six years installed, never operated,
                never function tested &mdash; is now scheduled to be proven. The vessel it protects
                is on a continuous unit that runs for months between shutdowns. The next planned
                shutdown is eleven weeks away.
              </p>
              <p>Production ask whether it can be tested without stopping.</p>
            </>
          }
          whatToDo={
            <>
              <p>
                Separate the question into the parts that have different answers, because &ldquo;can
                it be tested without stopping&rdquo; is really three questions.
              </p>
              <p>
                <strong>What can be proven without any process consequence?</strong> A good deal.
                The transmitter can be exercised across its range with the loop taken out of the
                trip decision, and the trip&rsquo;s set-point and comparison logic can be verified
                by injecting through the threshold and watching the trip signal assert. That
                establishes everything up to the point of action.
              </p>
              <p>
                🔴 <strong>What can only be proven by the action occurring?</strong> Whatever the
                trip actually operates. Section 4 was specific: a set-point verified and an alarm
                displayed both demonstrate a number was received and compared. Neither demonstrates
                the valve closes or the pump stops. And the six years of inactivity make that the
                part most likely to have failed, because inactivity is itself a cause of failure.
              </p>
              <p>
                So the honest position is that{' '}
                <strong>
                  a test without a shutdown proves the measurement and the decision, and leaves the
                  action unproven
                </strong>
                . That is worth doing and it should not be reported as having proven the trip.
              </p>
              <p>
                <strong>What are the options for the action?</strong> This is where it stops being a
                technician&rsquo;s decision. There may be a way to exercise the final element
                without a full shutdown &mdash; stroking a valve against a closed manual isolation,
                or operating it during a low-load period &mdash; and whether any of that is
                acceptable depends on the plant, not on the instrumentation.
              </p>
              <p>
                🔴 Present it as a decision with stated costs rather than as a technical obstacle:
                what each option would prove, what it would cost, and what remains unproven under
                each. Include the option of waiting eleven weeks, because it is a real option and it
                has a real cost &mdash;{' '}
                <strong>
                  eleven more weeks of a protective function with no evidence of working
                </strong>
                .
              </p>
              <p>
                And if anything is inhibited to allow the partial test, apply the earlier block
                exactly: bounded in time, known to the people running the plant, compensated while
                it lasts, and confirmed removed.
              </p>
            </>
          }
          whyItMatters={
            <>
              <p>
                This is the whole module in one job. Section 4 explains why the function has no
                evidence of working and why inactivity has made that worse. Section 5 explains why
                &ldquo;we tested it and it was fine&rdquo; would be the wrong thing to write if only
                part of it was proven. This section explains why the remaining part is not yours to
                decide alone.
              </p>
              <p>
                It also shows what the technical knowledge is ultimately for. The value you bring is
                not only the ability to perform the test &mdash; it is being able to say precisely
                what each option would and would not establish, so that the people carrying the risk
                can weigh it properly.
              </p>
            </>
          }
        />

        <FAQ
          items={[
            {
              question: 'Is it ever acceptable to work on a live control loop?',
              answer:
                'Routinely, and the alternative is often worse — a fault that only exists in the running state cannot be diagnosed on a dead plant, which is Section 3’s central point. What makes it acceptable is knowing what the loop controls, taking it out of the control decision before doing anything that would act as a command, agreeing the disturbance with the people running the process, and restoring everything afterwards. The unacceptable version is not working live; it is working live without having established what the consequence would be.',
            },
            {
              question: 'How do I find out what a loop actually controls?',
              answer:
                'The loop diagram tells you what is in the chain, per Module 7 Section 1, and it will show whether the signal feeds a controller, an indication, a trip or several of these. What it will not tell you is what the process does when that signal is lost, which is the thing you actually need — and that is a question for whoever operates the plant. Module 5 Section 1 gives the framework for their answer: whether the process is self-regulating, integrating or capable of running away is what determines how much time you have.',
            },
            {
              question: 'What if operations will not agree to the disturbance?',
              answer:
                'Then the answer is usually to find a test that costs them less rather than to press the same request, because their objection is normally about consequence and timing rather than about the work. There may be a quieter period, a lower-load condition, or a partial test that establishes some of what you need without the disturbance. It is also worth checking what the refusal actually rules out — if the fault is on a protective function, deferring has its own cost and that should be stated plainly so the decision is made with both sides visible.',
            },
            {
              question: 'Can I inject into a loop that only feeds an indication?',
              answer:
                'With considerably less ceremony, yes, and it is worth confirming that is genuinely all it feeds rather than assuming. Signals are commonly split to more places than expected — a trend, an alarm, a totaliser, a second system — and Module 7 Section 1 makes the point that a loop diagram exists partly to show devices that are easy to overlook. The check costs a minute. If the indication really is the only consumer, injecting into it disturbs nothing but a display and the people watching it, who are worth telling anyway.',
            },
            {
              question: 'What is the risk of leaving a logger connected?',
              answer:
                'Little, if it is documented, and that is the whole difference. Section 3 actively recommends leaving capture equipment in place, because an intermittent will not appear while you watch. The risk is not the equipment but the forgetting — an undocumented instrument left in a cabinet becomes something a future technician finds and cannot account for, or worse, something that gets disturbed during other work. Record where it is, what it is monitoring and who left it, and the risk becomes negligible.',
            },
            {
              question: 'How does hazardous area classification affect fault finding?',
              answer:
                'It constrains what equipment may be used and what may be opened, and Module 1 Section 5 covers the classification scheme while Module 7 Section 5 covers what intrinsic safety demands of a circuit. The point specific to diagnosis is that an intrinsically safe loop is a certified combination, so connecting ordinary test equipment to it can defeat the protection for the duration — the energy limitation was assessed for a particular arrangement, and yours is not that arrangement. Test equipment for these circuits is specified for the purpose, and this is not an area for improvisation.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'M1.5 owns hazardous areas, DSEAR and safe working. This section owns the hazards created by the act of diagnosis.',
            '🔴 Fault finding often needs the plant running, because a test while the fault is absent proves nothing (Section 3).',
            'So making things safe can be the thing that hides the fault — a tension unique to this activity.',
            'M1.5’s foundation: the electrical side is low energy and easy to isolate, and isolating it does nothing about a hot, pressurised or toxic process.',
            '🔴 This section adds the other half: on running plant you often are not isolating the loop either, and it is controlling something.',
            '🔴 Opening a live loop is a control action. Self-regulating settles, integrating ramps, runaway accelerates (M5.1).',
            '“It will drift a bit” is safe for some processes and a serious error for others — and the terminals look identical.',
            'Ask before touching: what does this loop control, and what happens if its signal is lost or wrong?',
            '🔴 On a live loop an injected signal is a COMMAND — the controller, valves, alarms and trips all act on it.',
            'The system is not misbehaving when that happens. It is doing exactly what it was built to do.',
            'So take the loop out of the control decision BEFORE injecting: manual first, then inject.',
            'Manual mode does not pause anything — it transfers the process to a person who must hold it by hand.',
            'That is agreed, its duration is stated, and restoring it is part of the job.',
            '🔴 While a protection is inhibited it is ABSENT, and nothing about the plant indicates it — the same silence as a failed dormant trip.',
            'So an inhibit is time-bounded, visible, compensated by something else, and confirmed removed.',
            '🔴 Judge a job by what the loop does, not by what it carries. A few milliamps is what a shutdown decision is made of.',
            'Prefer the reversible option: a link goes back, a tripped plant does not simply un-trip.',
            '🔴 Inhibits and deliberate trips are not a technician’s decision alone — the consequences land on operations.',
            'Your value is being able to say what each option would and would not establish, so others can weigh it.',
            '🔴 Record every temporary change when you make it and confirm it removed before leaving — links, manual modes, inhibits, isolations, test gear.',
            'A deliberate temporary change and a forgotten one differ only in the record.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself — Module 8.6" />

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-8-section-5')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-left touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              <ChevronLeft className="h-3 w-3" /> Previous section
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              When the instrument is right
            </span>
          </button>
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-8')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-right touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center justify-end gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              Module complete <ChevronRight className="h-3 w-3" />
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Back to Module 8
            </span>
          </button>
        </div>
      </HubBody>
    </HubPage>
  );
};

export default InstrumentationModule8Section6;
