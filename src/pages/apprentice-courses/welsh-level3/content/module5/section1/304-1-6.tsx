/**
 * Unit 304 · Learning outcome 1 · Criterion 1.6 — Manage risks associated with
 * completing the task and recognise the steps to be taken to stop risks
 * becoming problems
 *
 * The criterion's own wording is the lesson: a risk has not happened yet, and
 * managing it means acting while that is still true. Taught as identify, assess,
 * respond, monitor — with the emphasis on the fourth, which is where the "stop
 * it becoming a problem" half lives.
 *
 * Grounded on CDM 2015 (HSE L153) for the duty to plan, manage and monitor and
 * for pre-construction information as a source of known risks. Project risk
 * handling follows the impact-and-probability model in the construction
 * commercial corpus.
 *
 * 🔴 Never describe this content as EAL-approved, EAL-mapped or endorsed.
 */

import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  VideoCard,
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
import { videos } from '@/data/study-centre/video-library';

const quizQuestions = [
  {
    id: 1,
    question: 'What is the difference between a risk and a problem?',
    options: [
      'A risk has not happened yet; a problem has',
      'A risk is about safety, a problem is about money',
      'A risk is written down, a problem is not',
      'There is no practical difference',
    ],
    correctAnswer: 0,
    explanation:
      'The whole value of risk management sits in that gap. Once it has happened you are no longer managing a risk, you are absorbing a problem.',
  },
  {
    id: 2,
    question: 'Which two things describe a risk well enough to act on?',
    options: [
      'How likely it is, and how bad it would be',
      'Who is to blame, and how much it costs',
      'When it was written down, and by whom',
      'Whether it is technical or commercial',
    ],
    correctAnswer: 0,
    explanation:
      'Probability and impact together tell you which risks deserve attention. Either on its own will send you to the wrong one.',
  },
  {
    id: 3,
    question: 'A risk is identified as high impact but very unlikely. What is the usual response?',
    options: [
      'Plan a response you could execute, and watch for the signs it is approaching',
      'Ignore it, because it probably will not happen',
      'Stop the job until it is eliminated',
      'Treat it exactly like a high-probability risk',
    ],
    correctAnswer: 0,
    explanation:
      'Low-probability, high-impact risks are the ones that sink jobs precisely because nobody prepared. You do not spend the same effort, but you do decide in advance what you would do.',
  },
  {
    id: 4,
    question: 'Which of these is the strongest response to a risk?',
    options: [
      'Remove the cause so the risk no longer exists',
      'Accept it and monitor',
      'Transfer it to someone else',
      'Reduce how likely it is',
    ],
    correctAnswer: 0,
    explanation:
      'Eliminating the cause is always the strongest response where it is available — the same logic that puts elimination at the top of the hierarchy of control.',
  },
  {
    id: 5,
    question: 'Where do the known risks on a construction project come from before you start?',
    options: [
      'The pre-construction information the client holds and must provide',
      'The final account',
      'The health and safety file from the previous contractor’s other job',
      'The delivery notes',
    ],
    correctAnswer: 0,
    explanation:
      'Pre-construction information exists precisely to tell you what is already known about the site and the risks that were not designed out. Not asking for it is choosing to start blind.',
  },
  {
    id: 6,
    question: 'What does "monitoring" a risk actually involve?',
    options: [
      'Naming the early sign it is approaching, and checking for it on a set rhythm',
      'Keeping the risk register where you can find it',
      'Telling the client about it once',
      'Reviewing it at the end of the job',
    ],
    correctAnswer: 0,
    explanation:
      'A risk with no trigger and no review point is a risk being remembered rather than managed — and remembering is what fails under pressure.',
  },
  {
    id: 7,
    question: 'A delivery date is slipping. When does it stop being a risk?',
    options: [
      'When the date passes without the delivery — at which point it is a problem',
      'When you write it down',
      'When you tell the client',
      'When the supplier confirms the delay',
    ],
    correctAnswer: 0,
    explanation:
      'Every day before that is an opportunity to act: re-sequence, source elsewhere, move labour. After it, your options are all worse and all more expensive.',
  },
  {
    id: 8,
    question: 'Who should know about a significant risk on the job?',
    options: [
      'Everyone whose work it affects, including the people doing it',
      'The supervisor only',
      'Only the client, as it is their building',
      'Nobody, to avoid alarming people',
    ],
    correctAnswer: 0,
    explanation:
      'CDM expects cooperation, communication and coordination between dutyholders for exactly this reason. A risk known only to the person who wrote it down is not controlled.',
  },
];

export default function Lesson304_1_6() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'A risk has not happened yet. A problem has. Everything useful happens while that is still true.',
          'Judge a risk on two axes — how likely, and how bad. Either alone sends you to the wrong one.',
          'Four responses: remove, reduce, transfer, accept. Removing the cause is always strongest.',
          'A risk without a trigger and a review point is being remembered, not managed.',
          'The honest measure at the end is which risks materialised, and whether you had seen them coming.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'State the difference between a risk and a problem, and why the gap between them is where the work happens.',
          'Assess a risk by probability and impact, and prioritise accordingly.',
          'Choose between the four responses — remove, reduce, transfer, accept — and say why the first is strongest.',
          'Set a trigger and a review rhythm so a risk is monitored rather than merely remembered.',
          'Explain where known risks come from before work starts, and who needs to be told about them.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>Why risk sits in planning</ContentEyebrow>

      <ConceptBlock
        title="The gap this criterion lives in"
        plainEnglish="Risk: might happen. Problem: has happened. Your whole job is in the space between."
      >
        <p>
          The criterion is unusually explicit about what it wants —{' '}
          <em>manage risks and recognise the steps to be taken to stop risks becoming problems</em>.
          That second half is the point. Anybody can list what might go wrong. Managing risk means
          acting while it still has not.
        </p>
        <p>
          The switch is one-way and it is expensive. A distribution board that <em>might</em> be
          late is a risk: you can re-sequence, chase, source elsewhere, or move labour to something
          that is not waiting on it. A board that <em>is</em> late is a problem: the options that
          remain are all worse, all cost more, and several of them involve telling someone bad news.
        </p>
        <p>
          So the useful question at every stage is not &ldquo;what could go wrong?&rdquo; but{' '}
          &ldquo;what would I do about it, and when would I need to start?&rdquo;
        </p>
      </ConceptBlock>

      <ContentEyebrow>The risk cycle</ContentEyebrow>

      <ConceptBlock
        title="Identify, assess, respond, monitor"
        onSite="The fourth step is the one that gets skipped, and it is the one the criterion is about."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Identify.</strong> What could go wrong on <em>this</em> job. Sources: the
            pre-construction information the client holds, the survey, the building itself, the
            programme&rsquo;s dependencies, and what went wrong last time on something similar.
          </li>
          <li>
            <strong>Assess.</strong> Two axes — how likely, and how bad if it happens. A risk that
            is likely and minor is an irritation to absorb. One that is unlikely and severe needs a
            plan even though it probably will not occur. One that is likely and severe should change
            how the job is done.
          </li>
          <li>
            <strong>Respond.</strong> Four options, in descending strength. <em>Remove</em> the
            cause so the risk stops existing. <em>Reduce</em> its likelihood or its impact.{' '}
            <em>Transfer</em> it to whoever is better placed to carry it. <em>Accept</em> it
            knowingly, with a plan for if it lands.
          </li>
          <li>
            <strong>Monitor.</strong> Name the early sign, and set when you will look for it. This
            is where risk management either works or quietly stops.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="304-1-6-check-1"
        question="A specified light fitting has a ten-week lead time against an eight-week programme. Which response is strongest?"
        options={[
          'Remove the cause — agree an alternative fitting now, before the programme depends on it',
          'Accept it and warn the client the job may overrun',
          'Reduce it by asking the supplier to try harder',
          'Transfer it by making the supplier responsible for the delay',
        ]}
        correctIndex={0}
        explanation="Transferring blame does not get a corridor lit. Removing the cause — a different fitting, agreed while there is still time to agree it — is the only response that makes the risk cease to exist."
      />

      <SectionRule />

      <ConceptBlock title="Triggers, and why memory is not monitoring">
        <p>
          The commonest failure is not missing a risk. It is identifying one perfectly, writing it
          down, and then never looking at it again until it has happened.
        </p>
        <p>
          A managed risk has two extra things attached: a <strong>trigger</strong> — the early sign
          that it is coming — and a <strong>review point</strong>, a moment you have already decided
          you will check. &ldquo;Board delivery&rdquo; is a risk on a list. &ldquo;Board delivery:
          if it is not confirmed by the end of week two, we move the board change to week five and
          bring second fix forward — check at the Friday review&rdquo; is a risk being managed.
        </p>
        <p>
          Triggers are what let you act early, and acting early is the entire difference in cost
          between the two halves of this criterion.
        </p>
      </ConceptBlock>

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="The generic risk assessment with the address changed"
        whatHappens={
          <>
            Last job&rsquo;s paperwork is reused, the site name is updated and it goes in the
            folder. It lists working at height, manual handling and electricity — all true of every
            job ever — and says nothing about the asbestos flagged in the survey, the fact that the
            building is occupied by children, or the single access route shared with deliveries. The
            document exists and controls nothing.
          </>
        }
        doInstead={
          <>
            Keep it short and make it about this job. Three risks that are actually specific to the
            site, with what you are doing about each, beats fifteen generic ones — and the people on
            site might even read it.
          </>
        }
      />

      <CommonMistake
        title="Recovering a late programme by squeezing the work instead of the plan"
        whatHappens={
          <>
            <p>
              Something lands late and a week has to come back from somewhere. Rather than
              re-plan, the time is taken out of how the work is done: longer days, two operations
              running in the same space, the access equipment left where it is because moving it
              properly costs twenty minutes each time.
            </p>
            <p>
              Nothing on the risk list changes, and that is the trap. A delivery risk has simply
              moved column and become a safety risk, and because the two are managed separately
              nobody is looking at the place it moved to.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Treat the recovery as a change to the plan and put it through the same four
              responses as anything else: remove, reduce, transfer, accept &mdash; with an owner,
              a date and the sign that tells you it is going wrong again.
            </p>
            <p>
              Then look across both columns every time one of them moves, because a delivery risk
              that forces rushed work becomes a safety risk and a safety control that adds a day
              becomes a delivery risk. Where the recovery cannot be found without cutting into
              how the work is done, that is the client&rsquo;s decision and they need it while
              there are still options rather than as an announcement.
            </p>
          </>
        }
      />

      <SectionRule />

      <ContentEyebrow>Where known risks live</ContentEyebrow>

      <ConceptBlock title="Where the known risks already live">
        <p>
          A lot of risk is not yours to discover. On construction work the client holds
          pre-construction information about the site and must provide it — what is known about the
          structure, the services, the hazards and the risks the design could not eliminate. It
          exists to be an input to your planning, and it is one of the few places where somebody
          else has already done the identification for you.
        </p>
        <p>
          The rest comes from looking: the survey, the building, the programme&rsquo;s dependencies
          on other trades, and your own record of what went wrong on the last job like this one.
          That last source is the most under-used and the cheapest — which is another reason
          outcome 2 of this unit asks you to write the evaluation down.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="CDM 2015"
        clause="Regulations 4, 12 and 15 · guidance in HSE L153"
        meaning="A contractor must plan, manage and monitor the construction work under their control so far as is reasonably practicable. The client must provide the pre-construction information they hold. Dutyholders must cooperate with each other, coordinate their work and communicate so that everyone understands the risks and the measures controlling them — which is why a risk known only to the person who recorded it is not a risk under control."
        cite="HSE L153, Managing health and safety in construction"
      />

      <InlineCheck
        id="304-1-6-check-2"
        question="Which entry describes a risk that is actually being managed?"
        options={[
          'Ceiling void access: if the builder has not cleared it by Wednesday, first fix moves to the plant room — checked each morning',
          'Ceiling void access may be restricted',
          'Ceiling void access — high risk',
          'Ceiling void access is the builder’s responsibility',
        ]}
        correctIndex={0}
        explanation="It names the trigger, the response and when it is checked. The other three are observations — true, possibly important, and entirely inert."
      />

      <InlineCheck
        id="304-1-6-check-3"
        question="A risk is raised at the pre-start meeting and everyone agrees it matters. What is still missing?"
        options={[
          'A formal risk register template',
          'An owner, a date, and the sign that tells you it is happening',
          'The client’s written acknowledgement',
          'Nothing — it has been identified and shared',
        ]}
        correctIndex={1}
        explanation="Agreement in a room is the easiest part and the least durable. Without a name, a date and a trigger it is a shared observation, and shared observations do not survive a busy month."
      />

      <Scenario
        title="The risk everybody saw and nobody owned"
        situation={
          <>
            A school hall rewire over the summer holidays in Denbighshire, six weeks, hard deadline
            — the building has to be open for the new term. The asbestos survey flags material in
            two ceiling voids on the intended cable route. Everyone on the pre-start call notes it.
            Nobody records who is arranging the licensed removal or by when. Four weeks in, first
            fix reaches those voids and stops.
          </>
        }
        whatToDo={
          <>
            From here it is damage limitation: licensed removal at short notice, or a re-route that
            adds containment and cost, and a conversation about the term date either way. At the
            pre-start call it was a five-minute item — who is doing it, by when, and what is the
            trigger if it has not happened.
          </>
        }
        whyItMatters={
          <>
            The risk was identified by everyone and managed by nobody, which is the most common way
            this fails. Identification without an owner, a date and a trigger is a shared
            observation, and shared observations do not survive four weeks of a busy job.
          </>
        }
      />

      <VideoCard {...videos.riskAssessmentNvq} topic="Writing a risk assessment that is about the job in front of you" />

      <SectionRule />

      <ContentEyebrow>Owners and types of risk</ContentEyebrow>

      <ConceptBlock
        title="Every risk needs an owner and a date"
        plainEnglish="A risk that belongs to everyone belongs to nobody."
      >
        <p>
          Three fields turn a list into something that works: <strong>who</strong> is dealing with
          it, <strong>by when</strong>, and <strong>what tells us it is happening</strong>. Drop any
          one and the entry goes inert.
        </p>
        <p>
          The owner is the part most often left blank, usually because a risk was raised in a
          meeting where everybody nodded. Nodding is not ownership. The person named does not have
          to be the one who fixes it — they are the one who is going to chase it and say something
          if it is not moving.
        </p>
        <p>
          The date matters for the same reason a programme has dates. &ldquo;Before we need
          it&rdquo; is not a date, and it is indistinguishable from nothing until the week it turns
          out to have been three weeks ago.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ConceptBlock
        title="Safety risk and delivery risk are not the same discipline"
        onSite="Do both. Neither one covers the other."
      >
        <p>
          It is easy to let one of these stand in for the other. A risk assessment in the health and
          safety sense concentrates on harm to people: what could hurt someone, who might be hurt,
          and what controls reduce it. That is its own activity with its own expectations, and this
          criterion does not replace it.
        </p>
        <p>
          Delivery risk is everything else that threatens the task — the late board, the drawing
          that has not been issued, the trade that will not be finished, the weather on the day the
          roof work is booked. It is managed the same way and recorded separately, because the
          people who need each are different.
        </p>
        <p>
          The overlap is real and worth noticing: a delivery risk that forces rushed work becomes a
          safety risk, and a safety control that adds a day becomes a delivery risk. Managing one
          without looking at the other is how a sensible decision in one column creates a problem in
          the next.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Telling people in time</ContentEyebrow>

      <ConceptBlock title="Telling people, and telling them in time">
        <p>
          A risk that is controlled on paper and unknown on site is not controlled. CDM expects
          dutyholders to cooperate, coordinate and communicate precisely so that everyone
          understands the risks and the measures controlling them — which means the information has
          to reach the people doing the work, not just the file.
        </p>
        <p>
          That includes the client. A risk that could move their date or their cost is theirs to
          know about while there is still a decision to make. Telling them early is a conversation
          about options; telling them late is an announcement, and it is remembered as one.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ConceptBlock title="The risks you already know about">
        <p>
          Most jobs are not unprecedented. The delivery that was late last time, the void nobody
          could get into, the client who changes their mind at second fix — these recur, and the
          cheapest risk identification available is your own record of the last three jobs like this
          one.
        </p>
        <p>
          That is another reason outcome 2 asks for an honest evaluation. A finished job that was
          never written up teaches nobody anything, and the same surprise arrives again in six
          months looking exactly as unforeseeable as it did the first time.
        </p>
      </ConceptBlock>

      <FAQ
        items={[
          {
            question: 'Is this the same thing as a risk assessment?',
            answer:
              'Overlapping but not identical. A risk assessment in the health and safety sense concentrates on harm to people and is a well-defined activity in its own right. This criterion is broader: it covers anything that threatens the task — delivery, access, information, weather, another trade — alongside the safety risks. Do both; do not let one stand in for the other.',
          },
          {
            question: 'How many risks should I record?',
            answer:
              'Few enough that each one gets an owner, a trigger and a date. A list of twenty where nothing is assigned is worse than four that are actively watched, because the long list creates a feeling of control without any of the substance.',
          },
          {
            question: 'What does "transfer" a risk mean in practice?',
            answer:
              'Moving it to whoever is genuinely better placed to carry it — a supplier guaranteeing a delivery date, a specialist taking on a task requiring a licence, an insurance policy covering a loss. What it does not mean is deciding it is somebody else’s fault. If the corridor is still dark on the day it mattered, the risk was not transferred; the blame was.',
          },
          {
            question: 'How does this show up in the assessment?',
            answer:
              'The knowledge sits with the rest of the externally-set questions for this unit. The applied side appears in the employer-set practical project and in the professional discussion, where "what could have gone wrong, and what did you do about it?" is a natural question — and one that is much easier to answer if you kept a short list as you went.',
          },
        ]}
      />

      <KeyTakeaways
        points={[
          'A risk has not happened; a problem has. Act while the first is still true.',
          'Assess on two axes — probability and impact — and let that set priority.',
          'Four responses: remove, reduce, transfer, accept. Removing the cause is strongest.',
          'Low-probability, high-impact risks still need a planned response.',
          'Attach a trigger and a review point, or you are remembering rather than monitoring.',
          'Pre-construction information is where the client’s known risks already live — ask for it.',
          'Generic risk paperwork with the address changed controls nothing.',
          'Every risk needs an owner and a date, or it belongs to nobody.',
        ]}
      />

      <ContentEyebrow>Check yourself</ContentEyebrow>
      <Quiz questions={quizQuestions} title="Manage risks and stop them becoming problems" />
    </div>
  );
}
