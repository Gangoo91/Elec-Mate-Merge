/**
 * Unit 304 · Learning outcome 1 · Criterion 1.3 — Carry out effective planning
 *
 * The criterion that ties 1.1 and 1.2 together: resources and criteria are the
 * inputs, the programme is the output. CDM grounding from HSE L153 — the
 * contractor's duty to plan, manage and monitor, and the construction phase
 * plan as the written form of it.
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
    question: 'What makes a plan "effective" rather than just written down?',
    options: [
      'It changes what someone does, and it gets updated when the job moves',
      'It runs to enough pages to look thorough',
      'It was produced before the job started',
      'It uses the same template as the last project',
    ],
    correctAnswer: 0,
    explanation:
      'A plan nobody acts on and nobody revisits is paperwork. The test is whether it altered a decision and whether it still describes the job a fortnight in.',
  },
  {
    id: 2,
    question: 'Which sequence describes planning a task properly?',
    options: [
      'Scope, then sequence, then resource, then check it against the constraints',
      'Resource, then scope, then hope',
      'Sequence, then price, then scope',
      'Price, then scope, then sequence',
    ],
    correctAnswer: 0,
    explanation:
      'You cannot sequence work you have not scoped, or resource a sequence you have not set. The final check against constraints is what turns a wish into a programme.',
  },
  {
    id: 3,
    question:
      'What is the critical path of a piece of work?',
    options: [
      'The chain of tasks where any delay delays the whole job',
      'The most dangerous route through the building',
      'The tasks with the highest cost',
      'The order the client would prefer',
    ],
    correctAnswer: 0,
    explanation:
      'Some tasks have slack and some do not. Knowing which are which tells you where to put attention and where a lost day genuinely does not matter.',
  },
  {
    id: 4,
    question: 'How much planning detail is right?',
    options: [
      'Proportionate to the work — enough to make the decisions the job actually needs',
      'As much as possible, always',
      'The minimum that will satisfy an inspector',
      'The same for every job, so it is consistent',
    ],
    correctAnswer: 0,
    explanation:
      'Proportionality is the principle CDM itself uses. A two-page plan that is read beats a forty-page template that is copied.',
  },
  {
    id: 5,
    question: 'Which of these belongs in a construction phase plan for a small single-contractor job?',
    options: [
      'The significant risks on this job and how they are controlled',
      'A full company health and safety policy',
      'Every risk assessment the company has ever produced',
      'The client’s contact details and nothing else',
    ],
    correctAnswer: 0,
    explanation:
      'The plan is about this project. Generic material bulks it out and buries the few things a person on site actually needs to know.',
  },
  {
    id: 6,
    question: 'Why does a plan need review points built into it?',
    options: [
      'Because the job changes, and a plan that is not revisited stops describing reality',
      'To generate paperwork for the client',
      'Because the regulations specify weekly reviews',
      'To slow the work down deliberately',
    ],
    correctAnswer: 0,
    explanation:
      'Buildings differ from drawings, deliveries slip and people go sick. Planned review points are how a plan survives contact with the job rather than quietly becoming fiction.',
  },
  {
    id: 7,
    question:
      'Your programme assumes the builder finishes the ceiling on Tuesday. What should the plan record about that?',
    options: [
      'That it is an assumption your work depends on, and what happens if it slips',
      'Nothing — it is the builder’s responsibility',
      'That the builder has been told the date',
      'That you will work around it somehow',
    ],
    correctAnswer: 0,
    explanation:
      'Dependencies on other people are the commonest cause of a plan failing. Naming them turns a silent assumption into something you can watch and act on.',
  },
  {
    id: 8,
    question: 'What is the relationship between planning and the success criteria you set in 1.2?',
    options: [
      'The plan is how the criteria will be met — criteria without a plan are just hopes',
      'They are unrelated activities',
      'Criteria are written after the plan is finished',
      'The plan replaces the criteria once work starts',
    ],
    correctAnswer: 0,
    explanation:
      'Criteria say what "done properly" means. The plan is the route to it. If your plan cannot be traced back to your criteria, one of the two is wrong.',
  },
];

export default function Lesson304_1_3() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'Scope, sequence, resource, check. In that order — you cannot sequence work you have not scoped.',
          'Find the critical path. Some tasks have slack; a day lost on the critical path is a day lost on the job.',
          'Write down the assumptions your programme rests on, especially the ones about other trades.',
          'Detail should be proportionate. A two-page plan that gets read beats a forty-page template that gets copied.',
          'Planning does not stop on day one — it becomes managing and monitoring.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Describe the four steps of planning a task — scope, sequence, resource, then check against constraints.',
          'Identify the critical path through a piece of work and explain why slack matters.',
          'Record the assumptions and dependencies a programme rests on, including other trades.',
          'Judge how much planning detail is proportionate to a job, and what belongs in a construction phase plan.',
          'Explain why planning continues into the work as managing and monitoring.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>The four planning steps</ContentEyebrow>

      <ConceptBlock
        title="Scope, sequence, resource, check"
        plainEnglish="What is the work, in what order, with what, and does it fit?"
      >
        <p>
          Criterion 1.1 gave you resources and 1.2 gave you the definition of done. Planning is what
          turns those into a programme. It runs in four steps, and the order is not negotiable
          because each one needs the last.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Scope.</strong> Everything the task includes, written as tasks rather than as a
            description. &ldquo;Rewire the ground floor&rdquo; is a description. &ldquo;Lift floors,
            run 14 circuits, install 9 back boxes, second fix, board change, test, certify&rdquo; is
            a scope you can plan against.
          </li>
          <li>
            <strong>Sequence.</strong> What has to happen before what. Some of this is physical —
            containment before cable — and some is contractual, where another trade is either side
            of you.
          </li>
          <li>
            <strong>Resource.</strong> People, time, materials and plant against each step, from
            1.1. This is where a sequence stops being a wish list.
          </li>
          <li>
            <strong>Check.</strong> Hold the whole thing up against the constraints: the window, the
            budget, the access, the client&rsquo;s operating hours. Planning that never gets checked
            is the reason programmes are missed on day one.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="304-1-3-check-1"
        question="You are handed a programme with dates but no scope breakdown. What is the immediate risk?"
        options={[
          'The dates will be too generous',
          'The client will not understand it',
          'The dates were set against work nobody has actually listed, so they mean very little',
          'There is no risk — dates are what matter',
        ]}
        correctIndex={2}
        explanation="Dates derived from a feeling rather than a task list are a guess with a calendar attached. Scope first, always — it is the only thing the other three steps can be built on."
      />

      <SectionRule />

      <ContentEyebrow>Critical path and assumptions</ContentEyebrow>

      <ConceptBlock
        title="The critical path, and where slack lives"
        onSite="Ask which tasks can slip a day without moving the end date. Guard the ones that cannot."
      >
        <p>
          Not every task matters equally to the finish date. Some sit in a chain where each waits on
          the one before, and a day lost anywhere in that chain is a day lost on the whole job. That
          chain is the <strong>critical path</strong>.
        </p>
        <p>
          Other tasks have slack: they could start later, or take longer, without anything else
          moving. Knowing which is which changes how you run the week. It tells you where to put
          your most reliable people, which delivery genuinely cannot slip, and which problem you can
          reasonably leave until tomorrow.
        </p>
        <p>
          Most electrical work on a building has an obvious critical path — containment, then cable,
          then the board, then testing and certification, with the follow-on trades wrapped around
          it. The useful discipline is saying so out loud at the planning stage rather than
          discovering it when something slips.
        </p>
      </ConceptBlock>

      <ConceptBlock title="Assumptions are the part that breaks">
        <p>
          Every programme rests on things you do not control. The builder finishes the ceiling on
          Tuesday. The board arrives in week three. The client empties the room. Scaffolding stays
          up until Friday. None of those are facts when you write them down; they are assumptions,
          and each one is a way the plan can fail.
        </p>
        <p>
          Effective planning names them. A short list headed &ldquo;this programme assumes&rdquo;
          does three things at once: it makes you notice how much rests on other people, it gives
          you something specific to chase mid-job, and it makes the conversation about a delay a
          factual one rather than a blame one.
        </p>
      </ConceptBlock>

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Planning as a deliverable"
        whatHappens={
          <>
            A folder gets produced before the job, everyone signs it, and it goes on a shelf. Two
            weeks in, the sequence has changed, two assumptions have failed and the plan describes a
            project that no longer exists. It is still in the folder, which is what makes it worse —
            there is a document that says everything is fine.
          </>
        }
        doInstead={
          <>
            Plan lightly enough that updating it is cheap, and put review points in the programme so
            updating it is expected. A plan revised three times during a job is doing its work; one
            that was perfect on day one and untouched since is not.
          </>
        }
      />

      <CommonMistake
        title="Putting only the physical work on the programme"
        whatHappens={
          <>
            <p>
              Every task on the programme is something somebody does with their hands: containment,
              cable, boxes, board, test. The luminaire selection the client has not confirmed, the
              revised drawing that has not arrived and the query nobody has answered appear
              nowhere, because they are not work.
            </p>
            <p>
              They are what stops the job. The delay turns up in week four looking as though it
              came from nowhere and belonging to nobody, and because it was never a programme item
              there is no date anybody missed and nothing to chase back to.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Give the information its own dates and put it on the same programme.
              &ldquo;Luminaire selection confirmed by the end of week two&rdquo; is a programme
              item in exactly the way first fix is, and it is one you can chase while there is
              still time for the answer to be useful.
            </p>
            <p>
              Then pick them up in the weekly look: have the answers arrived, has an assumption
              failed, does the plan still describe the job. An information item with a date on it
              is somebody&rsquo;s to deliver; the same item with no date is everybody&rsquo;s to
              be surprised by.
            </p>
          </>
        }
      />

      <SectionRule />

      <ContentEyebrow>Proportionate planning</ContentEyebrow>

      <ConceptBlock title="How much plan is enough">
        <p>
          The honest answer is: enough to make the decisions this job needs, and no more. CDM 2015
          itself works on proportionality — what is required is planning appropriate to the work,
          not planning of a fixed size.
        </p>
        <p>
          For a single-contractor job the written form of this is the{' '}
          <strong>construction phase plan</strong>, drawn up before the site is set up. On a small
          job that is a short document: what the work is, the significant risks and how they are
          controlled, the welfare arrangements, and who is doing what. It should be about{' '}
          <em>this</em> project. A forty-page template carried over from a different job buries the
          three things that actually matter here, and anyone reading it learns nothing.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="CDM 2015"
        clause="Regulations 12 and 15 · guidance in HSE L153"
        meaning="A contractor must plan, manage and monitor the construction work they carry out. Where there is only one contractor on the project, that contractor is responsible for planning the construction phase and for drawing up the construction phase plan before the site is set up. The effort is proportionate to the project, and the client must provide the pre-construction information they hold."
        cite="HSE L153, Managing health and safety in construction"
      />

      <InlineCheck
        id="304-1-3-check-2"
        question="Which of these is the best evidence that your planning was effective?"
        options={[
          'The plan was never revised, because it was right first time',
          'The plan was revised twice during the job as things changed',
          'The plan was the longest one the company has produced',
          'The plan was signed by everyone before work started',
        ]}
        correctIndex={1}
        explanation="Revisions are not a sign of poor planning — they are a sign the plan was being used. An untouched plan on a job that changed is a plan nobody consulted."
      />

      <InlineCheck
        id="304-1-3-check-3"
        question="Where should contingency sit in a programme?"
        options={[
          'Held as a visible block before a fixed date, so spending it is a decision',
          'Spread evenly across every task',
          'At the start, so early problems are absorbed',
          'Nowhere — contingency encourages slow working',
        ]}
        correctIndex={0}
        explanation="Float padded into each task gets absorbed without anyone noticing, and you reach the end with nothing left and no idea where it went. Held as a block it stays visible and spendable."
      />

      <Scenario
        title="The week that was planned backwards"
        situation={
          <>
            A small commercial unit in Bangor: new lighting and power to a fitted-out office. The
            programme says first fix Monday to Wednesday, board change Thursday, test and certify
            Friday. On Monday the partitions are not up, so there is nothing to fix to. The joiner
            was always going to be there Monday and Tuesday — it was on the programme the client
            sent at the start — but the electrical sequence was written without reading it.
          </>
        }
        whatToDo={
          <>
            The week is recoverable, just: containment and the supply side can move forward,
            partitions get done, and first fix compresses into Wednesday and Thursday with an extra
            pair of hands. Testing slips to the following Monday, which has to be told to the
            client today rather than on Friday afternoon.
          </>
        }
        whyItMatters={
          <>
            Nothing here was unknowable. The dependency was written down, by someone else, before
            the job started — the failure was in the <em>check</em> step: the plan was never held up
            against the constraints it had to live inside. That is the difference between having a
            programme and having planned.
          </>
        }
      />

      <SectionRule />

      <ContentEyebrow>Sequencing and contingency</ContentEyebrow>

      <ConceptBlock
        title="Sequencing against other trades"
        plainEnglish="Your programme is a slot inside somebody else's programme."
      >
        <p>
          Electrical work on a building is interleaved with everyone else&rsquo;s. The pattern is
          familiar enough to plan against: containment and first fix before the walls close, then a
          gap while plastering and decoration happen, then second fix, then testing and handover.
        </p>
        <p>
          What that means practically is that you get <strong>two or three visits</strong>, not one
          continuous run, and each visit has a trade either side of it. Planning as though the job
          is one block is the commonest structural error in an electrical programme — it produces a
          duration that is right and a set of dates that are wrong.
        </p>
        <p>
          Two questions are worth asking of every visit: who has to be finished before I can start,
          and who is waiting on me to finish. Both answers belong in the plan, with names against
          them.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ConceptBlock
        title="Contingency, and where to put it"
        onSite="Float at the end protects the job. Float padded into every task just gets used up."
      >
        <p>
          Every programme needs some slack, and where you put it decides whether it helps. Padding
          each individual task is the instinctive approach and the least effective: the extra gets
          absorbed quietly into each one and you arrive at the end with no reserve and no idea where
          it went.
        </p>
        <p>
          Holding it as a block at the end — or immediately before a fixed date like a handover —
          keeps it visible and spendable. You can see how much you have left, and drawing on it is a
          decision somebody makes rather than something that just happens.
        </p>
        <p>
          How much depends on how many assumptions the programme rests on. A job with three
          dependencies on other trades and a long-lead item needs more than a domestic rewire in an
          empty house, and saying so out loud is part of planning rather than pessimism.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Information and monitoring</ContentEyebrow>

      <ConceptBlock title="Plan the information, not just the work">
        <p>
          A programme normally lists physical tasks and stops there. The things that most often
          hold a job up are not physical: a drawing revision that has not arrived, a decision the
          client has not made, a specification query nobody has answered.
        </p>
        <p>
          Give those dates too. &ldquo;Luminaire selection confirmed by end of week two&rdquo; is a
          programme item in exactly the same way first fix is, and it is one you can chase. Left
          off, it becomes a delay that appears to come from nowhere and belongs to nobody.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ConceptBlock title="Monitoring: the second half of the duty">
        <p>
          CDM asks a contractor to plan, manage and monitor. Planning is the part everyone
          remembers. Monitoring is checking, during the work, that what you planned is what is
          happening — and it needs a rhythm or it does not happen at all.
        </p>
        <p>
          On most jobs a short weekly look is enough: are we where the programme says, have any
          assumptions failed, has anything new appeared, does the plan still describe the job. Five
          minutes, written down, and the answer is either &ldquo;yes&rdquo; or it is the earliest
          warning you are going to get.
        </p>
        <p>
          It also gives you something to write in outcome 2. A job monitored weekly produces an
          honest evaluation almost by itself; one that was not leaves you reconstructing a fortnight
          from memory.
        </p>
      </ConceptBlock>

      <FAQ
        items={[
          {
            question: 'Do I need planning software for this?',
            answer:
              'No. A task list with an order and a set of dates does the job on most electrical work, and it has the advantage that you will actually update it. Software earns its place when there are enough interdependent tasks that tracking the critical path by eye becomes unreliable — on a domestic or small commercial job it rarely is.',
          },
          {
            question: 'What is the difference between a programme and a construction phase plan?',
            answer:
              'A programme is about sequence and time — what happens when. A construction phase plan is about health and safety — the significant risks on this job, how they are controlled, and the arrangements for welfare and site rules. They overlap, because how you sequence work is often how you control a risk, but they answer different questions and a client may ask for either.',
          },
          {
            question: 'How do I plan a job where the scope genuinely is not known yet?',
            answer:
              'Plan the part you can and name the part you cannot. Investigation work is a legitimate task in its own right: survey, expose, report, then plan the rest. What you should not do is pretend to a programme for work nobody has scoped — that is how a plan and a price both end up wrong, and the price is harder to fix afterwards.',
          },
          {
            question: 'Who else needs to see the plan?',
            answer:
              'Anyone whose work depends on it or whom it depends on. That is usually the client or contract administrator, the trades either side of you in the sequence, and the people doing the work. A plan held only by the person who wrote it cannot coordinate anything, and coordination is most of what it is for.',
          },
        ]}
      />

      <KeyTakeaways
        points={[
          'Scope, sequence, resource, check — each step depends on the one before it.',
          'A scope is a list of tasks, not a description of the job.',
          'Identify the critical path; it tells you where a lost day actually costs you.',
          'Write down the assumptions the programme rests on, especially those about other trades.',
          'Planning detail is proportionate to the work — CDM works that way too.',
          'A construction phase plan on a small single-contractor job should be short and about that job.',
          'Build review points in, and expect to revise; an untouched plan on a changing job is fiction.',
          'Planning becomes managing and monitoring — it does not stop on the first day.',
        ]}
      />

      <ContentEyebrow>Check yourself</ContentEyebrow>
      <Quiz questions={quizQuestions} title="Carry out effective planning" />
    </div>
  );
}
