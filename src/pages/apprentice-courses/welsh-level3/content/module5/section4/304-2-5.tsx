/**
 * Unit 304 · Learning outcome 2 · Criterion 2.5 — Review the achievement of
 * timescales
 *
 * Partner to criterion 1.3. Hitting the end date is the least interesting thing
 * about a programme; what matters is whether the internal dates held, what was
 * spent to recover them, and where the time actually went.
 *
 * CDM grounding: the client's duty to allow adequate time is the other half of
 * every "we ran out of programme" finding.
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

const quizQuestions = [
  {
    id: 1,
    question: 'The job finished on the agreed date. Is the timescale review finished?',
    options: [
      'No — what it cost to hit that date is the more useful question',
      'Yes, the date was met',
      'Only if it also came in on budget',
      'Only if the client confirms it',
    ],
    correctAnswer: 0,
    explanation:
      'An end date hit with overtime, extra labour and a rushed final week is a different result from one hit as planned, and the two teach opposite lessons.',
  },
  {
    id: 2,
    question: 'Which is the more revealing comparison?',
    options: [
      'Each planned milestone against when it was actually reached',
      'Planned finish against actual finish',
      'Total hours against quoted hours',
      'Days on site against days quoted',
    ],
    correctAnswer: 0,
    explanation:
      'A single end-to-end figure hides everything. Milestone by milestone shows you where the time went and when the slippage started.',
  },
  {
    id: 3,
    question: 'A delay was caused by another trade running late. What belongs in your review?',
    options: [
      'When you knew, what you did about it, and how quickly you told people',
      'That it was their fault, and nothing further',
      'Nothing — it was outside your control',
      'An estimate of what it cost them',
    ],
    correctAnswer: 0,
    explanation:
      'The cause was theirs; the response was yours. Speed of recognition and communication is the part of an external delay that you own.',
  },
  {
    id: 4,
    question: 'Where does time most often disappear on an electrical job?',
    options: [
      'Between tasks — waiting, travelling, setting up again, working around something',
      'In the installation itself',
      'In testing',
      'In certification',
    ],
    correctAnswer: 0,
    explanation:
      'The installation is the part people estimate carefully. The gaps around it are rarely estimated at all, and that is where a programme quietly goes.',
  },
  {
    id: 5,
    question: 'You recovered two lost days by working a Saturday. How should that read in the review?',
    options: [
      'The date was met and it cost a day of overtime — record both',
      'The programme was achieved',
      'There was a two-day delay',
      'Nothing to record, as the client was unaffected',
    ],
    correctAnswer: 0,
    explanation:
      'Recording only the outcome loses the finding. Recovery has a price, and a programme that needs recovering twice on similar jobs was not realistic.',
  },
  {
    id: 6,
    question: 'What does CDM say about the time available for a project?',
    options: [
      'The client must make suitable arrangements, including allocating sufficient time and resources',
      'Programmes must allow 10% contingency',
      'Contractors must accept the client’s programme',
      'Nothing about time',
    ],
    correctAnswer: 0,
    explanation:
      'It is the other half of every "we ran out of programme" finding. A programme that can only be met by cutting corners is something to raise, in writing, early.',
  },
  {
    id: 7,
    question: 'Snags clustered in the last area completed. What does the timescale review conclude?',
    options: [
      'The programme ran out before the work did, and quality paid for the date',
      'That area was more difficult',
      'Nothing — snags are separate from timescales',
      'The inspection was more thorough by then',
    ],
    correctAnswer: 0,
    explanation:
      'This is where 2.3 and 2.5 meet. The time finding and the quality finding are the same event seen from two directions.',
  },
  {
    id: 8,
    question: 'What should a timescale review produce for the next job?',
    options: [
      'Better estimates for the specific tasks that were wrong, from your own record',
      'A commitment to work faster',
      'A larger contingency on everything',
      'A note that the date was met',
    ],
    correctAnswer: 0,
    explanation:
      'Padding everything is the lazy fix and it makes you uncompetitive. Knowing that first fix in this housing stock takes a day longer than you thought is worth far more.',
  },
];

export default function Lesson304_2_5() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'Hitting the date is not the finding. What it cost to hit it usually is.',
          'Compare milestone by milestone — a single start-to-finish figure hides where the time went.',
          'Time disappears between tasks, not inside them: waiting, travelling, setting up again.',
          'For an external delay, the cause was theirs and the response was yours. Evaluate the response.',
          'The fix is better estimates for the tasks that were wrong — not more padding on everything.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Explain why hitting the end date is the least informative thing about a programme.',
          'Compare planned milestones against actual, rather than only start against finish.',
          'Record what recovery cost, not just that the date was met.',
          'Separate an external cause of delay from your own response to it.',
          'Turn a timescale review into better estimates for specific tasks on the next job.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>Beyond the end date</ContentEyebrow>

      <ConceptBlock
        title="The end date is the least interesting number"
        plainEnglish="Finished on Friday. Right — but how, and at what price?"
      >
        <p>
          Most timescale reviews begin and end with whether the job finished when it was supposed
          to. That is worth knowing and it is almost never the useful part, because two jobs that
          both finished on the Friday can have nothing in common.
        </p>
        <p>
          One ran as planned, with the last day spent on certification and a walk round. The other
          was two days behind by week two, recovered with a Saturday and an extra pair of hands,
          and finished with eight snags in the room that was rushed. Both report &ldquo;completed on
          programme&rdquo;. Only one of them should be repeated.
        </p>
        <p>
          So record the outcome, then record what it cost: overtime, additional labour, resequencing,
          quality traded for the date. That second line is the actual review.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="304-2-5-check-1"
        question="Two jobs both finished on the agreed date. What distinguishes them in a review?"
        options={[
          'Nothing; both met the programme',
          'What was spent to get there — overtime, extra labour, quality traded for the date',
          'The size of the job',
          'Whether the client noticed',
        ]}
        correctIndex={1}
        explanation="The date is an outcome shared by both. The cost of achieving it is what tells you whether the programme was realistic and whether you would price it the same way again."
      />

      <SectionRule />

      <ContentEyebrow>Where the time actually went</ContentEyebrow>

      <ConceptBlock
        title="Milestone by milestone"
        onSite="Plot planned against actual for each stage. The gap tells you when it started."
      >
        <p>
          A start-to-finish comparison gives you one number and hides everything inside it. Run it
          against the milestones you set in criterion 1.3 and the shape appears:
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Where the slippage began.</strong> Usually earlier than anyone remembers, and
            usually somewhere that seemed to be going fine.
          </li>
          <li>
            <strong>Whether it grew or held.</strong> Two days lost in week one that stayed at two
            days is a different problem from two days that became five.
          </li>
          <li>
            <strong>Which estimates were wrong.</strong> The specific task that took half again as
            long as you thought — that is the one number worth carrying to the next job.
          </li>
        </ul>
        <p>
          None of this needs software. A list of milestones with two dates beside each is enough,
          and it takes a couple of minutes if the dates were noted as they passed.
        </p>
      </ConceptBlock>

      <ConceptBlock title="Time goes between the tasks">
        <p>
          Estimating concentrates on the work: how long to run the circuits, how long to second fix,
          how long to test. Those estimates are usually reasonable, because people have done them
          many times.
        </p>
        <p>
          What is rarely estimated is everything around them — waiting for access, travelling back
          for something, setting out again after a break in the work, working around another trade,
          finding the right drawing. On a job that overran, it is worth asking honestly how much of
          the loss was in the tasks and how much was in the gaps.
        </p>
        <p>
          The answer changes what you do about it. Slow tasks are a resourcing or method question.
          Lost gaps are a planning question, and they point back at criteria 1.1 and 1.3 rather than
          at anybody&rsquo;s pace.
        </p>
      </ConceptBlock>

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Padding everything next time"
        whatHappens={
          <>
            A job overruns, so the next programme gets a generous margin on every task. It feels
            prudent. What it actually does is make you slower and dearer than the people you are
            bidding against, while leaving the specific bad estimate uncorrected — because nobody
            ever found out which one it was.
          </>
        }
        doInstead={
          <>
            Find the task that was wrong and fix that estimate. One accurate correction is worth
            more than a blanket margin, and it leaves the rest of your pricing competitive.
          </>
        }
      />

      <CommonMistake
        title="Writing &ldquo;delayed by others&rdquo; and stopping there"
        whatHappens={
          <>
            <p>
              The grid was late, so the three days go down as somebody else&rsquo;s delay. It is
              perfectly true, it is the end of the entry, and it closes the enquiry at the only
              point where it stops being useful &mdash; because the half of the event that was
              yours never gets examined.
            </p>
            <p>
              It also leaves you with nothing to show. If the delay is argued about later,
              entitlement to time generally turns on notice and on records, and a delay nobody
              wrote down at the time is very hard to demonstrate afterwards.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Keep the cause and then evaluate the response, which is the part you control. When
              did you know &mdash; on the day, or a week earlier if anybody had looked? What did
              you do: move labour, resequence, bring other work forward, or wait? Who did you
              tell, and how soon?
            </p>
            <p>
              Then write the entry so it carries all of that: grid finished three days late, we
              knew on day two and moved to the plant room on day three. That version is a finding,
              it is the one that improves the next job, and it is the one that stands up if the
              three days are ever disputed.
            </p>
          </>
        }
      />

      <SectionRule />

      <ContentEyebrow>Other people&rsquo;s delays</ContentEyebrow>

      <ConceptBlock
        title="Somebody else's delay, your response"
        plainEnglish="You cannot control when the plasterer finishes. You can control how fast you react."
      >
        <p>
          A large share of lost time on building work comes from outside: a trade running late, an
          instruction that did not arrive, access that was not available. Recording &ldquo;delayed
          by others&rdquo; is true and it ends the enquiry too early.
        </p>
        <p>
          Three questions keep it useful, and all three are about you:
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>When did you know?</strong> On the day, or a week earlier if anyone had looked?
          </li>
          <li>
            <strong>What did you do?</strong> Moved labour, resequenced, brought other work forward
            — or waited?
          </li>
          <li>
            <strong>Who did you tell, and when?</strong> A delay flagged early is a decision for the
            client; flagged late it is an announcement, and it will be remembered as one.
          </li>
        </ul>
        <p>
          On a contract, this is also the practical half: entitlement to more time generally depends
          on notice and on records, so the contemporaneous note you made is the thing that matters
          later. A delay nobody recorded at the time is difficult to demonstrate afterwards.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="CDM 2015"
        clause="Regulation 4 · guidance in HSE L153"
        meaning="A client must make suitable arrangements for managing a project, and those arrangements include allocating sufficient time and other resources. On a single-contractor project the client must also allow adequate time for the construction phase to be planned before the site is set up. A programme that can only be met by working unsafely is not simply a commercial problem — it is worth raising, in writing, while there is still time to change it."
        cite="HSE L153, Managing health and safety in construction"
      />

      <InlineCheck
        id="304-2-5-check-2"
        question="You were held up three days by the ceiling grid. Which entry is a review finding?"
        options={[
          'Delayed three days by the ceiling contractor',
          'Lost three days through no fault of our own',
          'The programme was unachievable',
          'Grid finished three days late; we knew on day two and moved to the plant room on day three',
        ]}
        correctIndex={3}
        explanation="It records the cause, when you knew, and what you did — which is the only part you can improve. It is also the version that is any use if the delay is argued about later."
      />

      <SectionRule />

      <ContentEyebrow>Timescales against quality</ContentEyebrow>

      <ConceptBlock title="Where timescales and quality meet">
        <p>
          The two most reliable findings in outcome 2 are connected. A cluster of snags in the last
          area completed, from criterion 2.3, and a programme that was recovered in the final week,
          from this criterion, are the same event described twice.
        </p>
        <p>
          It is worth writing them up together, because separately each looks minor and together
          they say something clear: the date was protected and the work paid for it. That is a
          decision somebody made, usually without saying so out loud, and naming it is more useful
          than either finding alone.
        </p>
      </ConceptBlock>

      <Scenario
        title="On time, twice over"
        situation={
          <>
            Two similar housing association rewires in Bangor, a month apart, both priced at five
            days and both finished on the Friday. Reviewing them together: the first ran to plan.
            The second lost a day on the Tuesday when the tenant could not give access to two rooms,
            was still a day behind on Thursday morning, and was recovered by a second electrician
            attending Friday. Three of the eight snags were in the rooms done last.
          </>
        }
        whatToDo={
          <>
            The finding is not that the second job was worse. It is that access on occupied
            properties is a foreseeable risk that was resourced as though it were not — and that the
            recovery cost a day of somebody else&rsquo;s labour that nobody recorded against the
            job. Next time, confirm access arrangements before the week starts and hold the
            contingency where it can be seen.
          </>
        }
        whyItMatters={
          <>
            Both jobs report &ldquo;completed on programme&rdquo;, and an evaluation that stopped at
            the end date would have found nothing to say about either. The comparison is what makes
            the finding visible.
          </>
        }
      />

      <InlineCheck
        id="304-2-5-check-3"
        question="What should the timescale review hand to the next job?"
        options={[
          'A corrected estimate for the specific task that ran over',
          'A larger margin on every task',
          'A note to start earlier',
          'A reminder to work more quickly',
        ]}
        correctIndex={0}
        explanation="Specific corrections make you more accurate. Blanket padding makes you more expensive and leaves the real error in place for next time."
      />

      <SectionRule />

      <ContentEyebrow>Estimates, decisions and telling people</ContentEyebrow>

      <ConceptBlock title="The estimate underneath the programme">
        <p>
          Every date rests on an estimate of how long something takes, and most of those estimates
          are inherited rather than measured — a figure somebody used years ago that nobody has
          checked since.
        </p>
        <p>
          A timescale review is the one moment those get tested against reality. Pick the two tasks
          that dominated the programme and compare estimate to actual honestly. Two corrected
          figures carried into the next job is a better outcome than any amount of reflection on
          working practices.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ConceptBlock title="Was there a decision, or did it just happen?">
        <p>
          When a programme comes under pressure, something gives: scope, quality, cost or the date.
          One of those is going to move, and the useful review question is whether anybody chose
          which.
        </p>
        <p>
          Often nobody did — the date was treated as fixed, and quality absorbed the difference
          without a conversation. That is worth naming precisely because it was never decided. A
          deliberate trade, agreed with the client, is a professional judgement; the same trade
          made by default on a Thursday afternoon is a finding.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ConceptBlock title="Telling people while it still matters">
        <p>
          The single most valuable habit this criterion produces is early notice. A date that is
          slipping, raised when it starts to slip, is a decision the client gets to make — reorder,
          accept the date, add resource, change the sequence.
        </p>
        <p>
          The same information a week later is an announcement, and it lands as one. Evaluate
          yourself on the gap between when you knew and when you said, because that gap is entirely
          within your control and it is what people actually remember about a delay.
        </p>
      </ConceptBlock>

      <FAQ
        items={[
          {
            question: 'What if the programme was never realistic in the first place?',
            answer:
              'Then that is the finding, and it belongs with a second question: did anyone say so at the time? An unrealistic programme accepted in silence is partly your finding too, because raising it was available and cheap at the start. CDM puts a duty on the client to allow sufficient time, which gives you something solid to point at when you raise it.',
          },
          {
            question: 'Should I record overtime I was not paid for?',
            answer:
              'For the purposes of this evaluation, yes — it is time the job consumed regardless of who absorbed it, and leaving it out makes the programme look more achievable than it was. Whether it appears anywhere else is a separate question between you and your employer.',
          },
          {
            question: 'How do I capture actual dates without a lot of admin?',
            answer:
              'A line a day is enough: what was finished, anything that stopped and why. Written on the day it takes half a minute and it answers this criterion, part of 2.2, and most of a delay conversation. Reconstructed at the end it takes an hour and produces something noticeably vaguer.',
          },
          {
            question: 'Is this the same as the project being late?',
            answer:
              'No, and that is the point. A project can finish on time with a programme that failed repeatedly inside it, and a project can finish late having been well run against circumstances nobody controlled. This criterion asks about the achievement of timescales, which includes the internal ones nobody outside the job ever sees.',
          },
        ]}
      />

      <KeyTakeaways
        points={[
          'Record whether the date was met, then record what meeting it cost.',
          'Compare planned against actual milestone by milestone — the end date hides the story.',
          'Time is usually lost between tasks rather than inside them.',
          'For an external delay, evaluate your response: when you knew, what you did, who you told.',
          'Contemporaneous notes are what make a delay demonstrable later.',
          'CDM puts a duty on the client to allow sufficient time and resources.',
          'Snags in the last area plus a recovered final week is one finding, not two.',
          'Correct the specific estimate that was wrong; do not pad everything.',
        ]}
      />

      <ContentEyebrow>Check yourself</ContentEyebrow>
      <Quiz questions={quizQuestions} title="Review the achievement of timescales" />
    </div>
  );
}
