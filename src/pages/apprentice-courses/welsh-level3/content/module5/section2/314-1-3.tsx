/**
 * Unit 314 · Learning outcome 1 · Criterion 1.3 — How to coordinate operatives
 * you are responsible for, in relation to supervision and motivation,
 * identification of competence, and planning work allocations, duties and
 * responsibilities
 *
 * The people half of coordination. Grounded on CDM's skills, knowledge,
 * training and experience test and the L153 guidance on appointing anyone with
 * gaps — which is the honest basis for deciding what supervision a task needs.
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
    question: 'What does identifying competence actually mean before allocating a task?',
    options: [
      'Establishing whether this person has the skills, knowledge, training and experience for this task',
      'Checking they hold a qualification',
      'Asking whether they are happy to do it',
      'Seeing how long they have been in the trade',
    ],
    correctAnswer: 0,
    explanation:
      'Competence is task-specific. Someone can be entirely competent at one thing and have never done the thing you are about to allocate.',
  },
  {
    id: 2,
    question: 'Somebody has a gap in the experience a task needs. What does CDM allow?',
    options: [
      'Allocating it with appropriate supervision while they obtain it',
      'Nothing — they cannot do the task at all',
      'Allocating it and hoping they ask if stuck',
      'Allocating it if they hold a relevant card',
    ],
    correctAnswer: 0,
    explanation:
      'The test includes being in the process of obtaining the necessary skills, knowledge, training and experience. That is how anyone ever learns anything — supervised, deliberately.',
  },
  {
    id: 3,
    question: 'How much supervision does a task need?',
    options: [
      'As much as the gap between what the task needs and what the person has',
      'The same for everyone at the same grade',
      'As much as the supervisor has time for',
      'None, once someone is qualified',
    ],
    correctAnswer: 0,
    explanation:
      'Supervision is a variable, not a status. The same apprentice needs close supervision on one task and almost none on another they have done fifty times.',
  },
  {
    id: 4,
    question: 'Which of these is real supervision?',
    options: [
      'Being close enough to intervene at the point the risk actually exists',
      'Being on site somewhere',
      'Telling them to come and find you if they need help',
      'Checking the work afterwards',
    ],
    correctAnswer: 0,
    explanation:
      'Checking afterwards is inspection, and being reachable is availability. Neither is supervision of a task where something can go wrong while you are two floors away.',
  },
  {
    id: 5,
    question: 'Why does motivation appear in a technical criterion?',
    options: [
      'Because people who understand why the work matters do it better and raise problems sooner',
      'Because morale affects the programme',
      'It is filler in the qualification',
      'Because pay is part of coordination',
    ],
    correctAnswer: 0,
    explanation:
      'The practical link is reporting. Someone who feels their work matters tells you when something is wrong; someone who does not, quietly works around it.',
  },
  {
    id: 6,
    question: 'What is the most useful thing to tell an operative alongside their task?',
    options: [
      'What it is for, and what to do if it turns out not to be possible as described',
      'How long it should take',
      'Who else has done it before',
      'What happens if it goes wrong',
    ],
    correctAnswer: 0,
    explanation:
      'Purpose lets them make sensible decisions when reality differs from the instruction, and an explicit route for "this does not work" is what stops them improvising.',
  },
  {
    id: 7,
    question: 'You allocate the same person the same task all week. What is the coordination risk?',
    options: [
      'Efficient today, but nobody else gains the experience and you become dependent on one person',
      'They will become bored',
      'It is unfair to the rest of the team',
      'No risk — specialisation is efficient',
    ],
    correctAnswer: 0,
    explanation:
      'Allocation is also development. A team where only one person can do something has a single point of failure that you created.',
  },
  {
    id: 8,
    question: 'How should you check an instruction has been understood?',
    options: [
      'Ask them to tell you what they are going to do',
      'Ask if they understood',
      'Watch them start',
      'Put it in writing',
    ],
    correctAnswer: 0,
    explanation:
      '"Did you get that?" reliably produces "yes". Hearing the plan back in their own words is the only cheap way to find out whether it landed.',
  },
];

export default function Lesson314_1_3() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'Competence is task-specific — someone can be fully competent and have never done this.',
          'CDM allows work to be allocated to someone obtaining the skills, with appropriate supervision.',
          'Supervision is a variable, not a grade. Set it by the gap, task by task.',
          'Real supervision means being close enough to intervene where the risk actually is.',
          'Ask people to tell you the plan back. "Did you understand?" always produces yes.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Identify competence as task-specific, and assess it before allocating work.',
          'Set supervision according to the gap between what the task needs and what the person has.',
          'Explain what CDM permits where somebody is still obtaining the necessary experience.',
          'Allocate duties in a way that develops the team rather than creating single points of failure.',
          'Check that an instruction has actually been understood.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>Competence is task-specific</ContentEyebrow>

      <ConceptBlock
        title="Competence belongs to a task, not to a person"
        plainEnglish="Not 'is this person competent?' but 'is this person competent at this?'"
      >
        <p>
          It is tempting to treat competence as a property somebody has: qualified or not, approved
          or apprentice. On a coordinated site that is not accurate enough to allocate work with.
        </p>
        <p>
          A time-served electrician who has spent five years on domestic rewires may never have set
          up a three-phase board. Someone with a fistful of cards may not have used a MEWP in two
          years. An apprentice in their final year may be better at containment than either of them
          and nowhere near ready to isolate a live panel.
        </p>
        <p>
          So the question to ask at allocation is narrower and more useful: does this person have
          the skills, knowledge, training and experience for <em>this task</em>? That is the same
          test CDM applies, and it is the only one that produces a sensible answer about
          supervision.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="CDM 2015"
        clause="Regulation 15 · guidance in HSE L153, paragraphs 163–173"
        meaning="A contractor must not appoint anyone to carry out work unless satisfied they have the skills, knowledge, training and experience to do it in a way that secures health and safety — or are in the process of obtaining them, with the guidance setting out what to consider where there are gaps. Sole reliance should not be placed on cards or certificates; skills decline if not used regularly, so people who do something only occasionally may need more frequent refreshing than those doing it daily."
        cite="HSE L153, Managing health and safety in construction"
      />

      <InlineCheck
        id="314-1-3-check-1"
        question="An electrician with fifteen years' experience has never worked on the type of system in front of them. What does that mean for allocation?"
        options={[
          'Fifteen years covers it',
          'They cannot be allocated the task at all',
          'Their card settles the question',
          'Competence is task-specific — this task needs the same assessment as it would for anyone',
        ]}
        correctIndex={3}
        explanation="Experience transfers unevenly. Long service earns the right to be asked rather than assumed about — and most experienced people will tell you straight if you ask."
      />

      <SectionRule />

      <ContentEyebrow>Levels of supervision</ContentEyebrow>

      <ConceptBlock
        title="Supervision is a dial, not a grade"
        onSite="Set it by the gap between what the task needs and what the person brings."
      >
        <p>
          Because competence is task-specific, supervision has to be too. Treating it as a property
          of grade — apprentices supervised, electricians not — produces both failures at once: the
          apprentice hovered over on work they have done fifty times, and the electrician left alone
          with something they have never met.
        </p>
        <p>The dial has roughly four positions:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Alongside.</strong> You are there, doing it with them. For the first time, or
            for anything where the consequence of getting it wrong is serious and immediate.
          </li>
          <li>
            <strong>Close.</strong> Within sight and earshot, checking at intervals. Familiar work,
            unfamiliar setting.
          </li>
          <li>
            <strong>Checkpoints.</strong> Agreed points where they stop and you look — before
            energising, before closing something up, at the end of a phase.
          </li>
          <li>
            <strong>On completion.</strong> Work they do routinely, checked as part of normal
            quality rather than as supervision.
          </li>
        </ul>
        <p>
          Deciding which one applies before allocating is the coordination act. Deciding it after
          something has gone wrong is not supervision, it is hindsight.
        </p>
      </ConceptBlock>

      <ConceptBlock title="What supervision is not">
        <p>
          Three things get called supervision and are not. Being on site somewhere is{' '}
          <em>availability</em>. Telling someone to come and find you if they get stuck is{' '}
          <em>an invitation</em>, and it fails precisely when they do not know they are stuck.
          Checking the work afterwards is <em>inspection</em>, which is valuable and is a different
          thing.
        </p>
        <p>
          Real supervision is being close enough to intervene at the point the risk exists. For safe
          isolation that means being there. For a termination it might mean a checkpoint before the
          accessory goes back on. For containment it may genuinely mean a look at the end.
        </p>
        <p>
          The honest test is to ask what would actually have to happen for you to catch a problem.
          If the answer involves luck, you have arranged availability rather than supervision.
        </p>
      </ConceptBlock>

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Allocating by who is free"
        whatHappens={
          <>
            Work comes up, somebody is available, they get it. It is quick and it is how most days
            go. What it skips is the competence question — so the task lands with whoever was
            standing there, and the supervision it needed was never decided because nobody paused
            long enough to decide it.
          </>
        }
        doInstead={
          <>
            Add one question to the handover of any task: has this person done this before? The
            answer takes five seconds and it changes what you say next — either &ldquo;carry
            on&rdquo; or &ldquo;come and get me before you energise it&rdquo;.
          </>
        }
      />

      <CommonMistake
        title="Calling &ldquo;come and find me if you get stuck&rdquo; supervision"
        whatHappens={
          <>
            <p>
              The task is handed over with an open invitation attached, and it feels generous. You
              are on site all day, they know where you are, and nobody is being hovered over.
              Between the two of you it counts as supervised.
            </p>
            <p>
              It fails in exactly the situation supervision exists for. Somebody who knows they are
              stuck comes and finds you; somebody who does not know they are stuck carries on
              confidently, and the arrangement has no way of catching that. Looking at the work
              afterwards catches it eventually, but that is inspection and it happens after the
              risk has already been taken.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Decide the position on the dial before the task starts and say which one it is:
              alongside for the first time or where the consequence is immediate, close for
              familiar work in an unfamiliar setting, agreed checkpoints before energising or
              closing something up, or checked on completion for work they do routinely.
            </p>
            <p>
              Test it with one question: what would actually have to happen for me to catch a
              problem here? If the answer involves luck, or relies on the other person noticing
              first, you have arranged availability rather than supervision.
            </p>
          </>
        }
      />

      <SectionRule />

      <ContentEyebrow>Why motivation matters here</ContentEyebrow>

      <ConceptBlock
        title="Why motivation is in a technical criterion"
        plainEnglish="People who understand the point of the work tell you when it is going wrong."
      >
        <p>
          Motivation looks like the soft item on the list and it has a hard consequence: reporting.
          Someone who understands why a task matters, and believes that raising a problem is wanted,
          tells you when the drawing does not match the building. Someone who does not, works around
          it quietly and you find out at second fix.
        </p>
        <p>
          Most of what produces that is unglamorous. Explain what the task is for, not just what it
          is. Say explicitly that stopping and asking is the expected response when something is not
          as described. Respond well the first time somebody does it, because everyone finds out how
          that went.
        </p>
        <p>
          Allocation carries a signal too. Giving somebody a piece of work that stretches them
          slightly, and the supervision to succeed at it, is the most reliable motivator available
          on a building site — and it doubles as development.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="314-1-3-check-2"
        question="An apprentice finds the containment route blocked and reroutes it themselves without saying anything. What does that most likely indicate?"
        options={[
          'They are not competent',
          'They were showing initiative',
          'The route was badly designed',
          'Nobody made clear that stopping and asking was the expected response',
        ]}
        correctIndex={3}
        explanation="People default to solving it themselves unless told otherwise, especially if asking has previously been met with impatience. That default is set by whoever briefed the task."
      />

      <SectionRule />

      <ContentEyebrow>Development, and checking it landed</ContentEyebrow>

      <ConceptBlock title="Allocation is also development">
        <p>
          The efficient allocation and the right allocation are often different. Giving a task to
          the person who is fastest at it gets today done and leaves you with a team where only one
          person can do it.
        </p>
        <p>
          Over a job of any length that matters twice: you carry a single point of failure — the day
          they are off, that work stops — and nobody else is getting the experience that would fix
          it. Both are consequences of allocation decisions nobody thought of as decisions.
        </p>
        <p>
          The practical version is not noble: it is putting the second person alongside the first
          for the first one, then supervising them on the second, then letting them run the third.
          It costs a little time twice and removes a dependency permanently.
        </p>
      </ConceptBlock>

      <ConceptBlock title="Checking it landed">
        <p>
          The last step of allocating a task is finding out whether the instruction arrived. Asking
          &ldquo;did you understand?&rdquo; reliably produces &ldquo;yes&rdquo;, from everybody,
          regardless of the truth — it is a social question and it gets a social answer.
        </p>
        <p>
          Asking somebody to tell you what they are about to do gets you the real state of things in
          about fifteen seconds, and it is not patronising if it is what you do with everyone. On
          anything with a sequence or a safety step in it, the gap between what you said and what
          they heard is exactly where the problem will be.
        </p>
      </ConceptBlock>

      <Scenario
        title="Competent, and not for this"
        situation={
          <>
            A small industrial job outside Wrexham. The supervisor allocates the changeover of a
            three-phase distribution board to an electrician with twelve years behind them, on the
            reasonable basis that they are experienced and it is a board change. The electrician has
            worked almost entirely on single-phase domestic and commercial work. They do not say so.
            The work is done correctly but takes most of a day longer than planned, with several
            long pauses.
          </>
        }
        whatToDo={
          <>
            Nothing unsafe happened, and the lost time is the smaller half of it. The finding is
            that one question at allocation — have you done one of these before? — would have
            produced either a different allocation or the right support, and neither would have
            embarrassed anybody. Experienced people rarely volunteer a gap unasked.
          </>
        }
        whyItMatters={
          <>
            This is the failure mode competence assessment exists for, and it is invisible because
            it looks like respecting someone&rsquo;s experience. Asking is not doubting; not asking
            is assuming.
          </>
        }
      />

      <InlineCheck
        id="314-1-3-check-3"
        question="Which supervision arrangement fits a first-time safe isolation on an unfamiliar panel?"
        options={[
          'Alongside — present at the point the risk exists',
          'Close, checking at intervals',
          'A checkpoint before energising',
          'Checked on completion',
        ]}
        correctIndex={0}
        explanation="The consequence is immediate and irreversible, so supervision has to be at the moment, not around it. The other three are appropriate dial settings for other tasks."
      />

      <SectionRule />

      <ContentEyebrow>Other people&rsquo;s operatives</ContentEyebrow>

      <ConceptBlock title="Coordinating people who are not yours">
        <p>
          On most sites some of the people affecting your work do not report to you — another
          contractor&rsquo;s operatives, a labourer shared across trades, an agency electrician for
          the week.
        </p>
        <p>
          You can still set the arrangements for the work itself and say clearly what you need. What
          changes is where a competence question goes: to their own supervisor rather than settled
          directly. And where an arrangement is ignored, it belongs with whoever holds the overall
          programme, early and in writing, described as its effect on the work rather than as a
          complaint about a person.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ConceptBlock title="Write the allocation down">
        <p>
          Who is doing what, decided verbally on a Monday, is substantially forgotten by Wednesday.
          People swap tasks sensibly, someone is off, a new face arrives, and the arrangement
          everyone is working to is no longer the one that was agreed.
        </p>
        <p>
          It does not need a document — a list in the store, a photograph of a whiteboard, a message
          to the group. The test is whether somebody arriving on Thursday could find out what they
          are meant to be doing, and who to ask, without interrupting three people to do it.
        </p>
      </ConceptBlock>

      <FAQ
        items={[
          {
            question: 'How do I ask an experienced person about a gap without offending them?',
            answer:
              'Make it the routine question rather than a special one. "Have you done one of these here before?" asked of everybody, every time, stops being about the individual. Most experienced people answer honestly and are relieved to be asked — what they will not usually do is raise it unprompted, because volunteering a gap in front of a team costs more than staying quiet.',
          },
          {
            question: 'What if I am coordinating people who do not report to me?',
            answer:
              'You can still set the arrangements for the work and say what you need from them, and you should. What changes is that competence questions may have to go through their own supervisor rather than being settled directly. Where an allocation is refused or ignored, that belongs with whoever holds the overall programme — early, and in writing.',
          },
          {
            question: 'Is supervision not the same as not trusting someone?',
            answer:
              'It is the opposite arrangement to the alternative, which is leaving someone alone with work they have not done and calling it trust. Supervision set against the task, and explained as such, is read as ordinary practice by almost everybody. What people resent is supervision that does not vary — being watched on work they have done for years.',
          },
          {
            question: 'How does this show up in assessment?',
            answer:
              'The knowledge sits with the externally-set questions. The performance side is evidenced through the employer-set practical project, which explicitly includes allocating duties and responsibilities to operatives, instructing them clearly, and confirming that instructions were understood — so these are things you will actually be doing and being observed on.',
          },
        ]}
      />

      <KeyTakeaways
        points={[
          'Competence belongs to a task — ask whether this person is competent at this.',
          'CDM: nobody is appointed to work they lack the SKTE for, or are not in the process of obtaining.',
          'Do not rely solely on cards; skills decline when they are not used.',
          'Supervision is a dial — alongside, close, checkpoints, on completion — set by the gap.',
          'Availability, an open invitation and after-the-fact inspection are not supervision.',
          'Motivation matters because motivated people report problems instead of working around them.',
          'Allocate for development as well as speed, or you build single points of failure.',
          'Have people tell you the plan back; "did you understand?" always gets a yes.',
        ]}
      />

      <ContentEyebrow>Check yourself</ContentEyebrow>
      <Quiz questions={quizQuestions} title="Coordinating the operatives you are responsible for" />
    </div>
  );
}
