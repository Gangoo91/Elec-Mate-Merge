/**
 * Module 8 · Section 5 — When the instrument is right
 *
 * Rewritten 2026-08-30. REPOSITIONED, with Andrew's agreement, from the old
 * outline title "Documenting faults and generating service reports" — which is
 * the MOST-COVERED topic in the entire course. Measured before proposing:
 * M4.5 "Interpreting and logging" (99 record/document hits), M6.4 "Results and
 * tolerances — why a record needs a verdict" (63), M6.5, M7.1 (30), plus the
 * records material I wrote into M7.6 and M7.7. A sixth pass would have been
 * indefensible.
 *
 * 🔴 THIS PAGE PAYS A DEBT. Module 8 Section 2's FAQ (verified, line 891) ends:
 * "...or the reading is correct and the process really is doing that, which
 * Section 5 covers." This is that section.
 *
 * 🔴 THE ORGANISING IDEA — a deliberate INVERSION of the whole module. Sections
 * 1-4 taught suspicion of readings: 8.2 in particular argued that a believable
 * reading deserves MORE suspicion than an absurd one. This section teaches the
 * opposite and harder skill: recognising when the instrument is telling the
 * truth and the process genuinely is doing something unexpected. The failure
 * mode is BLAMING THE INSTRUMENT FOR BEING RIGHT, and it is costly in a
 * different direction — a real process excursion dismissed as an instrument
 * fault.
 *
 * 🔴 "NO FAULT FOUND" IS NOT A DIAGNOSIS. It collapses four genuinely different
 * situations into one useless label, and each needs a different response:
 *   1. the fault is real and intermittent, and was absent    → Section 3
 *   2. you fixed it without realising (disturbance)          → Section 3
 *   3. the reading was right; the process changed            → this page
 *   4. the EXPECTATION was wrong, not the reading            → this page
 *
 * 🔴 CASE 4 is the subtle one and worth developing: the reading is correct, the
 * process is normal, and what is actually wrong is somebody's belief about what
 * the number should be — a range or units misunderstanding, a comparison
 * against a different measurement point, or a memory of "normal" from a
 * different operating mode.
 *
 * 🔴 KNOWING WHEN TO STOP — verified as owned by nothing (scattered hits only).
 * The economics run both ways, and the asymmetry that matters is that stopping
 * on a PROTECTIVE function is not the same decision as stopping on an
 * indication.
 *
 * ⚠️ M1.2 OWNS SENSOR LOCATION and owns it well — "a sensor reports its own
 * immediate environment and nothing else", the radiator-plume example, and
 * "the single most common reason a healthy instrument gives a useless number".
 * REFERENCE IT. Do not re-teach it. What this page adds is the diagnostic
 * framing: the reading is correct and answers a different question from the one
 * being asked.
 *
 * ⚠️ NO SOURCE COVERAGE. Kuphaldt does not address no-fault-found — searched
 * and confirmed empty. This page is DERIVED from principles already established
 * in the course (M8.1 hypothesis discipline, M8.2 triage, M8.3 intermittents,
 * M1.2 sensor location, M6.4 records needing a verdict) rather than from the
 * source text. Shingle-scan anyway; do not invent standards or statistics.
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

const TITLE = 'When the instrument is right | Instrumentation Module 8.5 | Elec-Mate';
const DESCRIPTION =
  'The harder skill: recognising when a reading is correct and the process really is doing that, why “no fault found” describes four different situations, and how to decide when to stop.';

const outcomes = [
  '🔴 Recognise when an instrument is being blamed for telling the truth',
  'Say why dismissing a real process signal is costly in a different way',
  '🔴 Name the four situations that “no fault found” collapses together',
  'Distinguish a wrong reading from a wrong expectation',
  'Say why a correct reading can still answer the wrong question',
  '🔴 Decide when to stop investigating, and say what makes that decision different for a protective function',
  'Record a not-a-fault outcome so that it is useful rather than dismissive',
  'Say what evidence would justify trusting a surprising reading',
];

const quizQuestions = [
  {
    id: 1,
    question: '🔴 What is the failure mode this section is about?',
    options: [
      'Blaming the instrument for telling the truth — dismissing a real process signal as a fault',
      'Failing to record a fault properly',
      'Testing a loop while the fault is absent',
      'Trusting a reading that is wrong',
    ],
    correctIndex: 0,
    explanation:
      'The rest of this module taught suspicion of readings, which is the right default. This is the opposite error, and it is costly in a different direction — a genuine process excursion gets investigated as an instrument problem and nothing is done about the process.',
  },
  {
    id: 2,
    question: 'Why is dismissing a real process signal worse than merely wasting time?',
    options: [
      'It is not — both cost the same',
      'The process condition continues unaddressed while everyone believes the reading is the problem',
      'It damages the instrument',
      'It invalidates the calibration record',
    ],
    correctIndex: 1,
    explanation:
      'Investigating a healthy instrument costs time. Deciding a true reading is false means the thing it was reporting carries on happening, with the added disadvantage that attention has been actively directed away from it.',
  },
  {
    id: 3,
    question: '🔴 “No fault found” can mean four different things. Which is NOT one of them?',
    options: [
      'The fault was fixed inadvertently by disturbance',
      'The reading was correct and the process changed',
      'The instrument requires recalibration',
      'The fault is intermittent and was absent during the visit',
    ],
    correctIndex: 2,
    explanation:
      'The fourth possibility is that the expectation was wrong rather than the reading. Recalibration is a response rather than an explanation — and if the instrument was found to be reading correctly, calibration is precisely what is not in question.',
  },
  {
    id: 4,
    question: 'Why is “no fault found” a poor thing to write on its own?',
    options: [
      'It is not permitted by most procedures',
      'It implies the reporter was mistaken',
      'It is too short',
      'It collapses four different situations into one label, and each needs a different response',
    ],
    correctIndex: 3,
    explanation:
      'An intermittent that was absent, a fault cleared by disturbance, a genuine process change and a wrong expectation are four different outcomes with four different follow-ups. Recorded identically, the next person cannot tell which one happened.',
  },
  {
    id: 5,
    question: '🔴 What does it mean for the expectation to be wrong rather than the reading?',
    options: [
      'The reading is correct and the process is normal — what is wrong is somebody’s belief about what the number should be',
      'The operator misread the display',
      'The alarm limits are set incorrectly',
      'The instrument needs re-ranging',
    ],
    correctIndex: 0,
    explanation:
      'Nothing is faulty in this case, including the process. A units misunderstanding, a comparison against a different measurement point, or a memory of “normal” from a different operating mode all produce a genuine belief that a correct reading is wrong.',
  },
  {
    id: 6,
    question:
      'A reading is questioned because it does not match another instrument. What is worth establishing first?',
    options: [
      'Which of the two was calibrated most recently',
      'Whether the two are actually measuring the same thing at the same place',
      'Which one the operators trust',
      'Whether either has an alarm configured',
    ],
    correctIndex: 1,
    explanation:
      'Two instruments at different points in a process can both be correct and disagree, because they are answering different questions. Establishing that they should read the same comes before deciding which one is wrong.',
  },
  {
    id: 7,
    question: 'How can a perfectly correct reading still be useless?',
    options: [
      'If the range is too wide',
      'If it is displayed in the wrong units',
      'If the sensor is reporting its own local conditions rather than the quantity people care about',
      'If it is not logged',
    ],
    correctIndex: 2,
    explanation:
      'Module 1 Section 2 covers this as the single most common reason a healthy instrument gives a useless number. A sensor reports its own immediate environment and nothing else, so the reading is true and answers a different question from the one being asked.',
  },
  {
    id: 8,
    question: 'What would justify trusting a surprising reading rather than suspecting it?',
    options: [
      'The operator’s confidence in it',
      'The absence of any alarm',
      'The instrument passing a calibration check',
      'Corroboration — another indication, a process consequence, or a physical observation consistent with it',
    ],
    correctIndex: 3,
    explanation:
      'A calibration check establishes the instrument is accurate, which is necessary and not sufficient. What settles it is whether anything else in the world agrees: a related measurement moving as it should, or a physical effect you can go and observe.',
  },
  {
    id: 9,
    question:
      '🔴 What makes the decision to stop investigating different for a protective function?',
    options: [
      'A protective function that has not been proven working leaves a hazard unaddressed, not merely a question open',
      'Protective functions are more expensive to investigate',
      'Protective functions cannot be left unresolved by regulation',
      'Nothing — the decision is the same',
    ],
    correctIndex: 0,
    explanation:
      'Stopping on an indication leaves an unanswered question. Stopping on a trip leaves something that may not act when demanded, and Section 4 covers why that failure is silent — so the same reasoning about diminishing returns does not transfer.',
  },
  {
    id: 10,
    question: 'When is it reasonable to stop investigating a fault you have not explained?',
    options: [
      'Never — every fault must be explained',
      'When further work is unlikely to add information, provided the outcome is recorded honestly and the consequence is acceptable',
      'After a fixed number of hours',
      'As soon as the plant is running normally again',
    ],
    correctIndex: 1,
    explanation:
      'Stopping is a legitimate decision rather than a failure, and it depends on both halves: whether more effort would actually produce more information, and what it costs to leave the question open. What is not legitimate is stopping and recording it as resolved.',
  },
  {
    id: 11,
    question: 'How should a not-a-fault outcome be recorded?',
    options: [
      'As a false report from the operator',
      'As “no fault found”',
      'As what was established — that the instrument was verified correct and the reading reflected an actual process condition',
      'It does not need recording if nothing was wrong',
    ],
    correctIndex: 2,
    explanation:
      'A positive statement of what was proven is far more useful than a negative one about what was not found. It also protects the person who reported it, which matters if you want the next unusual reading reported rather than ignored.',
  },
  {
    id: 12,
    question: 'Why does dismissing reports as “operator error” cause long-term harm?',
    options: [
      'It is unfair to the operator',
      'It breaches the maintenance procedure',
      'It creates industrial relations problems',
      'It discourages reporting, so the next unusual reading — which may be a real fault — goes unreported',
    ],
    correctIndex: 3,
    explanation:
      'The operator noticing something unusual is the detection mechanism for exactly the plausible, in-range faults Section 2 identified as the dangerous ones. Teaching people that reporting produces blame removes the only thing that catches them.',
  },
];

const InstrumentationModule8Section5 = () => {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <HubPage>
      <HubMasthead
        section="Module 8 · Section 5"
        title="When the instrument is right"
        backTo="/electrician/upskilling/instrumentation-module-8"
      />

      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          This module has taught you to doubt readings. This section is about the harder skill —
          knowing when to believe one.
        </p>

        <TLDR
          points={[
            '🔴 This is the opposite skill: recognising when the instrument is telling the truth.',
            '🔴 The failure mode is blaming the instrument for being right — dismissing a real process signal as a fault.',
            'That costs more than wasted time: the process condition carries on, with attention pointed away from it.',
            '🔴 “No fault found” is not a diagnosis. It collapses four different situations into one label.',
            '🔴 Four: the EXPECTATION was wrong, not the reading — and nothing at all is faulty.',
            'What justifies trusting a surprising reading is corroboration, not calibration.',
            '🔴 Knowing when to stop is a real decision — but stopping on a protective function is not the same as stopping on an indication.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <ContentEyebrow>🔴 The inversion</ContentEyebrow>

        <ConceptBlock
          title="Sometimes the instrument is telling the truth"
          plainEnglish="A reading that looks wrong may be a correct report of something genuinely unexpected."
          onSite="Everything in this module so far has trained the opposite instinct, which is why this needs stating."
        >
          <p>
            Section 2 argued that a believable reading deserves more suspicion than an absurd one,
            because every safeguard in a system is built to catch the absurd. That is sound, and
            this section is about the error it can produce when carried too far.
          </p>
          <p>
            🔴 <strong>An instrument can be blamed for telling the truth</strong>. A reading that
            nobody expected, that does not match what people believe the plant is doing, gets
            treated as a fault to be found &mdash; and the investigation proceeds confidently
            through a healthy loop, finding nothing, because there is nothing to find.
          </p>
          <p>The reason this matters is that the two errors are not symmetrical:</p>
          <ul>
            <li>
              <strong>Trusting a wrong reading</strong> means a decision taken on bad information,
              which is what Section 2 was about.
            </li>
            <li>
              🔴 <strong>Distrusting a right reading</strong> means the condition it was reporting{' '}
              <em>carries on happening</em>, with the added disadvantage that everybody&rsquo;s
              attention has been actively directed at the instrument instead.
            </li>
          </ul>
          <p>
            The second is worse in one specific respect.{' '}
            <strong>
              A wrong reading eventually produces a consequence that reveals it. A dismissed correct
              reading has already produced its warning, and the warning has been rejected.
            </strong>{' '}
            The system did its job and the answer was not believed.
          </p>
          <p>
            None of this argues for credulity. It argues for holding two hypotheses rather than one,
            which is exactly what Section 1 asked for:{' '}
            <strong>
              &ldquo;the instrument is wrong&rdquo; and &ldquo;the process is doing something
              unexpected&rdquo; are both live explanations for a surprising reading
            </strong>
            , and starting with only the first is the fixation that section warned about.
          </p>
        </ConceptBlock>

        <Pullquote>
          A wrong reading eventually produces a consequence that exposes it. A correct reading that
          was dismissed has already given its warning, and been overruled.
        </Pullquote>

        <SectionRule />
        <ContentEyebrow>🔴 Four things NFF means</ContentEyebrow>

        <ConceptBlock
          title="“No fault found” is not a diagnosis"
          plainEnglish="Four quite different outcomes get written down the same way, and each needs something different next."
          onSite="The label is what makes the next investigation start from nothing."
        >
          <p>
            A visit ends with everything testing correct, and three words get written. They describe
            what did not happen rather than what did, and they cover situations that have almost
            nothing in common.
          </p>
          <AppendixTable
            caption="What “no fault found” is actually reporting"
            headers={['What actually happened', 'What it needs next', 'Covered by']}
            rows={[
              [
                'The fault is real and intermittent; it was absent',
                'Capture, not more testing',
                'Section 3',
              ],
              [
                'You cleared it by disturbing something, without realising',
                'Say so — the fix is unconfirmed',
                'Section 3',
              ],
              [
                '🔴 The reading was correct; the process genuinely changed',
                'Tell the people who run the process',
                'This section',
              ],
              [
                '🔴 The expectation was wrong, not the reading',
                'Correct the expectation, or the document behind it',
                'This section',
              ],
            ]}
            notes="Only the first two are faults at all. The label makes all four look identical to whoever reads it next."
          />
          <p>
            🔴 The damage is specific.{' '}
            <strong>
              Recorded as &ldquo;no fault found&rdquo;, an unresolved intermittent looks exactly
              like a report that was mistaken
            </strong>
            &mdash; so the next occurrence gets less attention rather than more, and the
            accumulating occurrences that Section 3 said were the route to a correlation never
            accumulate.
          </p>
          <p>
            The alternative costs one extra sentence.{' '}
            <strong>Say what you established rather than what you did not find</strong>: that the
            loop was verified correct end to end, that the reading corresponded to an actual process
            condition, or that the fault was not present during the visit and a logger has been left
            in place.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>🔴 When nothing is wrong at all</ContentEyebrow>

        <ConceptBlock
          title="The expectation was wrong, not the reading"
          plainEnglish="The instrument is right, the process is normal, and what is mistaken is what somebody thinks the number ought to be."
          onSite="This one produces a fault report with no fault anywhere in it."
        >
          <p>
            The fourth case in that table is the one worth developing, because nothing whatever is
            faulty &mdash; not the instrument, not the loop, not the process.{' '}
            <strong>What is wrong is a belief about what the number should be.</strong>
          </p>
          <p>Several ordinary things produce it:</p>
          <ul>
            <li>
              <strong>A units misunderstanding.</strong> A correct value in different units from the
              ones somebody expects looks wrong by a consistent factor &mdash; and Module 7 Section
              6 covers this as a commissioning fault when the two ends of a loop were configured
              differently. Here the mismatch is between the display and a person.
            </li>
            <li>
              <strong>A comparison against a different point.</strong> Two instruments measuring at
              different places in a process can both be correct and disagree, because they are
              answering different questions. Establishing they <em>should</em> read the same comes
              before deciding which is wrong.
            </li>
            <li>
              <strong>A memory of &ldquo;normal&rdquo; from a different operating mode.</strong> A
              value that was right at one throughput, one product, or one season is remembered as
              the correct value and applied to conditions it never described.
            </li>
            <li>
              <strong>A specification that was never right.</strong> A design figure, a setpoint or
              a range carried forward from a document that did not match the installed plant.
            </li>
          </ul>
          <p>
            🔴 The diagnostic move is to{' '}
            <strong>
              test the expectation with the same rigour Section 1 demanded for a hypothesis
            </strong>
            . Where does the expected value come from? Is it a specification, a calculation, a
            comparison, or a recollection? Each of those has a different reliability, and a
            recollection is not evidence in the way a specification is.
          </p>
          <p>
            This is also where a plant&rsquo;s own history earns its keep. A trend showing the
            reading has been at this value for two years settles the question immediately &mdash;
            either it has always been like this and the expectation is new, or it changed at an
            identifiable moment, which converts the problem into the kind Section 2 can triage.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="A correct reading that answers the wrong question"
          plainEnglish="The number is true. It is just not describing the thing anybody cares about."
          onSite="Module 1 Section 2 calls this the single most common reason a healthy instrument gives a useless number."
        >
          <p>
            There is a case sitting between &ldquo;the instrument is faulty&rdquo; and &ldquo;the
            expectation is wrong&rdquo;, and it is common enough to deserve naming separately.{' '}
            <strong>
              The measurement is accurate, the loop is sound, and the reading still does not answer
              the question being asked of it.
            </strong>
          </p>
          <p>
            Module 1 Section 2 owns this and states the principle exactly:{' '}
            <strong>a sensor reports its own immediate environment and nothing else</strong>. A room
            temperature sensor in the warm plume above a radiator reports that plume perfectly
            accurately. It is simply not the room temperature anybody wanted to know, and that
            section works through what follows &mdash; devices swapped, controller suspected, valve
            suspected, every one testing correct.
          </p>
          <p>
            🔴 What matters for fault finding is the recognition, because{' '}
            <strong>this case defeats every technique in this module</strong>. Section 1&rsquo;s
            interception finds every output correctly corresponding to its input. Section 2&rsquo;s
            triage finds a valid signal that moves and is correct across its range. Section
            4&rsquo;s proof test passes. There is nothing wrong to find, and the reading is still
            not fit for the purpose it is being put to.
          </p>
          <p>
            The tell is usually that{' '}
            <strong>the instrument agrees with itself and disagrees with reality</strong>
            &mdash; the loop is internally consistent, and the physical world does not match. That
            is the point at which the question worth asking stops being &ldquo;what is
            broken?&rdquo; and becomes{' '}
            <strong>&ldquo;is this measuring what we think it is measuring?&rdquo;</strong>, which
            means going to look at where the sensor actually is.
          </p>
          <p>
            Related and worth mentioning: a measurement can be correct and <em>too slow</em> to be
            useful, which is a different mismatch between a reading and the question. Module 5
            covers process dynamics properly; the diagnostic point is the same &mdash; nothing is
            faulty, and the number is not answering what is being asked.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-8-5-question"
          question="A vessel temperature loop tests perfect end to end, but operators insist the reading does not reflect the vessel. What is the next question?"
          options={[
            'Whether the controller is in the correct mode',
            'Whether the sensor is positioned where it genuinely represents the vessel temperature',
            'When the transmitter was last calibrated',
            'Which instrument should be replaced first',
          ]}
          correctIndex={1}
          explanation="Every electrical test has passed, so further electrical testing will keep passing. A sensor reports its own immediate surroundings, so a correct reading from a poorly located sensor is exactly this situation — and the check is a physical one rather than an electrical one."
        />

        <SectionRule />
        <ContentEyebrow>Believing a surprise</ContentEyebrow>

        <ConceptBlock
          title="Corroboration, not calibration"
          plainEnglish="A calibration check says the instrument is accurate. It does not say the reading is real."
          onSite="What settles it is whether anything else in the world agrees."
        >
          <p>
            If a surprising reading might be true, the question becomes what would establish that it
            is &mdash; and the instinctive answer is the wrong one.
          </p>
          <p>
            <strong>Calibrating the instrument is necessary and not sufficient.</strong> It
            establishes the device converts its input correctly, which leaves untouched everything
            Section 2 and this section have described: a blocked impulse line, a sensor in the wrong
            place, a device measuring accurately in a spot nobody cares about.
          </p>
          <p>
            🔴 What actually settles it is <strong>corroboration</strong> &mdash; whether anything
            independent agrees:
          </p>
          <ul>
            <li>
              <strong>A related measurement behaving consistently.</strong> If a temperature has
              genuinely risen, something else usually reflects it &mdash; a pressure, a flow, a
              power draw, a downstream condition.
            </li>
            <li>
              <strong>A physical observation.</strong> Something you can go and see, feel or hear. A
              vessel that is genuinely hot is hot to an infrared thermometer and to a hand held near
              it.
            </li>
            <li>
              <strong>A process consequence.</strong> If the reading is true, something downstream
              should be affected &mdash; and Section 1&rsquo;s test design applies directly: if this
              is true what else should I see, and if it is false what should I not see?
            </li>
            <li>
              <strong>The history.</strong> Whether the change was abrupt or gradual, and whether
              anything else on the plant changed at the same moment.
            </li>
          </ul>
          <p>
            🔴 That last one deserves emphasis because it is fast and frequently decisive.{' '}
            <strong>
              A reading that changed at the same moment as a known process event is very likely
              reporting that event
            </strong>
            . An instrument fault has no reason to coincide with a changeover, a pump start or a
            batch step.
          </p>
          <p>
            And where corroboration is genuinely unavailable, that is worth saying rather than
            resolving by preference. &ldquo;The loop is verified correct and I cannot independently
            confirm the process condition&rdquo; is an honest position that leaves the question with
            the people who can answer it.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="🔴 When “not a fault” is the more urgent finding"
          plainEnglish="A correct reading of something unexpected may be the earliest warning anybody gets."
          onSite="This is the outcome most likely to be filed and forgotten, and the one that should not be."
        >
          <p>
            There is an assumption buried in the phrase &ldquo;no fault found&rdquo; that is worth
            dragging out, because it is often wrong.{' '}
            <strong>
              It treats the absence of an instrument fault as the absence of a problem
            </strong>
            .
          </p>
          <p>
            Consider what a correct, unexpected reading may actually be reporting. Something
            fouling. Something leaking. A filter blinding, a heat exchanger losing performance, a
            bearing heating, a valve passing when it should be shut. All of these produce a genuine
            change in a measured quantity, and all of them{' '}
            <strong>develop gradually before they fail</strong>.
          </p>
          <p>
            🔴 In that case the instrument has done precisely what it was installed to do:{' '}
            <strong>
              it has told somebody about a change they could not otherwise see, early enough to act
            </strong>
            . Section 4 made the argument for detecting deterioration before failure, and this is
            the same detection arriving unplanned, through an operator noticing a number they did
            not expect.
          </p>
          <p>Which reverses the usual sense of urgency. Compare the two outcomes honestly:</p>
          <ul>
            <li>
              <strong>An instrument fault</strong> means a wrong number and a repair. It is bounded,
              it is your department, and its consequence is understood.
            </li>
            <li>
              🔴 <strong>A correct reading of an unexpected condition</strong> means something on
              the plant is doing something nobody expected, and nothing has yet been done about it.
            </li>
          </ul>
          <p>
            The second is frequently the more serious of the two, and it is the one that gets
            written up as though nothing happened. That is the practical failure this section is
            guarding against &mdash;{' '}
            <strong>
              not the wasted visit, but the finding that was made and then filed as an absence
            </strong>
            .
          </p>
          <p>
            So the closing move on a verified-correct loop is a handover rather than a sign-off. The
            useful sentence is not &ldquo;no fault found&rdquo; but{' '}
            <strong>
              &ldquo;the instrumentation is sound, so this reading is real, and somebody needs to
              look at why&rdquo;
            </strong>
            &mdash; delivered to the people who run the process rather than left in a maintenance
            system they do not read.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="🔴 Closing it as “operator error”"
          whatHappens={
            <>
              <p>
                An unusual reading is reported, investigated, and found to be a correct reading of a
                normal condition. The most economical explanation is that whoever reported it was
                mistaken, and that is roughly what gets written.
              </p>
              <p>Sometimes that is even true. The problem is what it teaches.</p>
              <p>
                🔴{' '}
                <strong>
                  An operator noticing something unusual is the detection mechanism for precisely
                  the faults Section 2 identified as the dangerous ones
                </strong>{' '}
                &mdash; the plausible, in-range readings that raise no alarm, that no controller
                questions, and that no automatic check catches. A person deciding a number looks
                wrong is the only thing standing between those faults and a wrong decision.
              </p>
              <p>
                Teach people that reporting produces blame and they stop reporting. The immediate
                saving is a few investigations that would have found nothing. The cost arrives
                later, when a reading that really is wrong goes unmentioned because the last one
                did.
              </p>
              <p>
                Section 3&rsquo;s intermittent scenario shows the end state: a fault that operations
                stopped reporting individually and started treating as something the loop does, at
                which point the occurrences that would have built a correlation stopped being
                recorded.
              </p>
            </>
          }
          doInstead={
            <>
              <p>
                Separate two things that are easy to conflate:{' '}
                <strong>whether there was a fault, and whether reporting it was reasonable</strong>.
                Very often the answers are no and yes, and both should be said.
              </p>
              <ul>
                <li>
                  <strong>Report the finding positively.</strong> &ldquo;Loop verified correct; the
                  reading reflects an actual process condition&rdquo; states what was established.
                  &ldquo;No fault, operator error&rdquo; states a judgement about a person.
                </li>
                <li>
                  <strong>Close the loop with whoever reported it.</strong> Explaining why the
                  reading was real is what makes the next report better informed, and it is the
                  difference between someone learning the plant and someone learning not to bother.
                </li>
                <li>
                  🔴{' '}
                  <strong>Pass a genuine process finding to the people who run the process.</strong>{' '}
                  If the reading is true, the interesting question was never about the instrument,
                  and leaving it in a maintenance record answers nobody.
                </li>
                <li>
                  <strong>Fix the cause of a wrong expectation.</strong> If it came from an
                  out-of-date document, a mislabelled display or a range that does not match the
                  plant, correct that &mdash; otherwise the same report arrives again from somebody
                  else.
                </li>
              </ul>
            </>
          }
        />

        <SectionRule />
        <ContentEyebrow>🔴 Knowing when to stop</ContentEyebrow>

        <ConceptBlock
          title="Stopping is a decision, not a failure"
          plainEnglish="Continuing costs something and so does stopping. What matters is which, and whether you say so."
          onSite="The one thing that is never acceptable is stopping and calling it resolved."
        >
          <p>
            Not every fault gets explained, and an investigation that has stopped producing
            information is not improved by continuing. Deciding to stop is legitimate &mdash;{' '}
            <strong>deciding to stop and recording it as resolved is not</strong>.
          </p>
          <p>Two questions decide it, and both need answering honestly:</p>
          <ul>
            <li>
              <strong>Would more work produce more information?</strong> Section 1 gave the
              signature of an investigation that has stalled &mdash; you have stopped generating new
              hypotheses and started repeating tests. At that point additional hours buy nothing.
            </li>
            <li>
              <strong>What does leaving the question open actually cost?</strong> This is where the
              answer varies enormously.
            </li>
          </ul>
          <p>🔴 That second question carries an asymmetry worth being explicit about:</p>
          <AppendixTable
            caption="What stopping leaves behind"
            headers={[
              'What the loop does',
              'What an unresolved question leaves',
              'Reasonable to defer?',
            ]}
            rows={[
              [
                'Indication only',
                'A number somebody may misread',
                'Often, with the limitation recorded',
              ],
              [
                'Drives control',
                'A control action that may be based on bad information',
                'Sometimes, with monitoring in place',
              ],
              [
                '🔴 A protective function',
                'Something that may not act when demanded',
                '🔴 Not on the same reasoning — Section 4 explains why',
              ],
            ]}
            notes="Diminishing returns is an argument about effort. It says nothing about consequence, and consequence is what differs down this table."
          />
          <p>
            The bottom row is not a matter of thoroughness but of what failure means.{' '}
            <strong>
              An unresolved question on an indication is a question. An unresolved question on a
              trip is a hazard that may already exist
            </strong>
            , and Section 4 covered why nothing about its normal appearance will ever tell you
            which.
          </p>
          <p>
            When you do stop, three things make it defensible:{' '}
            <strong>
              say what was established, say what was not, and say what would change the answer
            </strong>
            . Module 6 Section 4 makes the same argument about calibration records needing a verdict
            rather than only numbers &mdash; and &ldquo;unresolved, monitoring in place, escalate if
            it recurs&rdquo; is a verdict.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-8-5-stop"
          question="An investigation into an unexplained fault on a high-level trip has stalled. Is stopping reasonable?"
          options={[
            'Yes — diminishing returns applies to all faults equally',
            'Yes, provided it is recorded',
            'Not on the same reasoning: an unproven protective function may already be a hazard rather than an open question',
            'No — no fault may ever be left unresolved',
          ]}
          correctIndex={2}
          explanation="Diminishing returns is an argument about whether more effort yields more information, and it is often sound. It says nothing about consequence — and on a protective function the consequence of being wrong is something that does not act when it is needed, which is why this decision escalates rather than closes."
        />

        <Scenario
          title="A reading nobody believes"
          situation={
            <>
              <p>
                A flow reading on a transfer line has been showing about fifteen per cent higher
                than operators expect for the past week. They are confident the line does not flow
                that fast. The transmitter has been calibrated, the loop checked end to end, and
                everything is correct.
              </p>
              <p>
                The maintenance record from the first visit says &ldquo;no fault found&rdquo;. A
                second visit has been requested.
              </p>
            </>
          }
          whatToDo={
            <>
              <p>
                Do not repeat the first visit. Everything electrical has been verified and will
                verify again &mdash; the useful question has already moved on.
              </p>
              <p>
                Hold the possibilities explicitly, because this is exactly the situation Section 1
                warned about when only one hypothesis is live:
              </p>
              <ul>
                <li>
                  <strong>The flow really is higher</strong> than people believe, and the reading is
                  correct.
                </li>
                <li>
                  <strong>The expectation is wrong</strong> &mdash; wrong units, a figure remembered
                  from a different operating mode, or a design number that never matched the
                  installed line.
                </li>
                <li>
                  <strong>The measurement is accurate and answering a different question</strong>{' '}
                  &mdash; something about the installation means it is not measuring the flow
                  anybody means.
                </li>
              </ul>
              <p>
                🔴{' '}
                <strong>Start with corroboration, because it is fast and it discriminates.</strong>{' '}
                If fifteen per cent more is genuinely flowing, something downstream should reflect
                it &mdash; a tank filling sooner, a batch completing quicker, a pump running
                differently, a total that does not reconcile. Section 1&rsquo;s test design applies:
                if the reading is true, what else should be true; if it is false, what should not
                be.
              </p>
              <p>
                <strong>Then interrogate the expectation.</strong> Where does &ldquo;the line does
                not flow that fast&rdquo; come from? A design figure, a previous reading, a rule of
                thumb, or a recollection? Ask when it was last checked against anything. A trend
                answers a great deal here &mdash; if the reading stepped up a week ago, something
                changed then and the question becomes what; if it has read this way for two years,
                the expectation is the newer of the two.
              </p>
              <p>
                <strong>Then look at the installation physically</strong>, because that is the case
                no electrical test reaches.
              </p>
              <p>
                🔴 Whatever the outcome, <strong>rewrite the record</strong>. &ldquo;No fault
                found&rdquo; is what caused the second visit to start from nothing. What it should
                say is what was established: that the instrument was verified accurate and the loop
                verified correct, so the remaining question is about the process or the expectation
                rather than the instrumentation &mdash; and that is a finding for the people who run
                the line rather than for maintenance.
              </p>
            </>
          }
          whyItMatters={
            <>
              <p>
                Two visits have been spent testing a healthy loop, and a third would go the same
                way, because the record described what was not found rather than what was.
              </p>
              <p>
                The genuinely uncomfortable possibility is also the most important one. If the flow
                really is fifteen per cent higher than anybody believes, the instrument has been
                reporting that for a week and the response so far has been to investigate the
                instrument.
              </p>
            </>
          }
        />

        <FAQ
          items={[
            {
              question:
                'How do I convince people a reading is right when they are sure it is wrong?',
              answer:
                'By producing corroboration rather than by asserting the instrument is fine, because a calibration certificate is exactly what a confident person expects you to produce and it does not address their objection. Something independent that agrees is far more persuasive: a related measurement that moved when this one did, a physical observation, or a total that reconciles. It also genuinely tests your own position — if you look for corroboration and find none, that is worth knowing before you commit to defending the reading.',
            },
            {
              question: 'Is it my job to investigate the process rather than the instrument?',
              answer:
                'Establishing whether the instrumentation is sound is squarely your job, and it is the question that has to be answered first because everything else depends on it. Once you have established that a loop is correct, what the process is doing becomes a question for the people who operate it — and the important part is handing it over explicitly rather than closing the job. A finding that a reading is genuine is valuable information for a process engineer or an operations team, and it is worth nothing if it stays in a maintenance record.',
            },
            {
              question: 'What if I suspect the reading is right but cannot prove it?',
              answer:
                'Say exactly that, because it is a more useful statement than either alternative. Recording that the loop was verified correct and that the process condition could not be independently confirmed leaves the question open in the right place, with the people who can investigate the process. What is not helpful is resolving the uncertainty by preference — deciding it must be an instrument fault because that is your domain, or deciding it must be real because the loop tested well. Both close a question that is genuinely still open.',
            },
            {
              question: 'Should a not-a-fault visit be recorded at all?',
              answer:
                'Yes, and it is more useful than it looks. It establishes that the loop was verified correct at a known date, which is a genuine data point for any later investigation, and it prevents the next person repeating the work. It also matters for the pattern: several not-a-fault visits on the same loop is itself a finding, suggesting either an intermittent that keeps being missed or an expectation problem that nobody has corrected. Recorded as “no fault found” that pattern is invisible; recorded as what was verified, it is obvious.',
            },
            {
              question: 'How long should I spend before concluding there is no fault?',
              answer:
                'Long enough to have verified the loop rather than merely tested the instrument, which is the usual gap. That means confirming the signal path end to end as Module 7 Section 6 describes, and looking at what feeds the sensor as well as the sensor itself — an isolating valve, an impulse line, the physical location. Beyond that, the useful trigger for stopping is the one Section 1 gives: when you have stopped generating new hypotheses and started repeating tests, more time will not help and the question has moved elsewhere.',
            },
            {
              question: 'What if the process change is a problem in its own right?',
              answer:
                'Then finding it is the most valuable outcome of the visit, and it deserves to be treated that way rather than filed as an absence of instrument fault. A reading that is correct and unexpected may be reporting a developing process problem — something fouling, leaking, wearing or drifting out of its normal operating condition. The instrument has done exactly what it was installed to do, which is to tell somebody about a change they could not otherwise see, and the appropriate response is to make sure the right people hear it promptly.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'Sections 1 to 4 taught suspicion of readings. This section is the harder, opposite skill.',
            '🔴 An instrument can be blamed for telling the truth — a real process signal dismissed as a fault.',
            'The two errors are not symmetrical: a wrong reading eventually produces a consequence that exposes it.',
            '🔴 A dismissed correct reading has already given its warning, and the warning was overruled.',
            'So hold both hypotheses: the instrument is wrong, and the process is doing something unexpected.',
            '🔴 “No fault found” is not a diagnosis — it collapses four situations into one label.',
            'Intermittent and absent (S3) · cleared by disturbance (S3) · the process changed · the expectation was wrong.',
            'Only the first two are faults at all, and each of the four needs something different next.',
            '🔴 Recorded as NFF, an unresolved intermittent looks like a mistaken report — so the next one gets less attention.',
            'Say what you established, not what you failed to find. It costs one sentence.',
            '🔴 The expectation can be wrong with nothing faulty: units, a different measurement point, a memory of “normal”, or a bad specification.',
            'Test the expectation as rigorously as a hypothesis — a recollection is not evidence in the way a specification is.',
            'A correct reading can answer a different question: a sensor reports its own surroundings and nothing else (M1.2).',
            '🔴 That case defeats every technique in this module — interception, triage and proof testing all pass.',
            'The tell is a loop that agrees with itself and disagrees with reality.',
            '🔴 What justifies trusting a surprise is corroboration, not calibration — a related measurement, a physical observation, a consequence.',
            'A reading that changed at the same moment as a known process event is very likely reporting that event.',
            '🔴 Stopping is a legitimate decision. Stopping and recording it as resolved is not.',
            '🔴 Diminishing returns is about effort and says nothing about consequence — which is why a protective function escalates instead.',
            '🔴 Closing reports as operator error removes the only mechanism that catches plausible, in-range faults.',
            'If the reading is genuine, hand it to the people who run the process — it answers nobody in a maintenance record.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself — Module 8.5" />

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-8-section-4')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-left touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              <ChevronLeft className="h-3 w-3" /> Previous section
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Preventive maintenance
            </span>
          </button>
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-8-section-6')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-right touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center justify-end gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              Next section <ChevronRight className="h-3 w-3" />
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Fault finding on running plant
            </span>
          </button>
        </div>
      </HubBody>
    </HubPage>
  );
};

export default InstrumentationModule8Section5;
