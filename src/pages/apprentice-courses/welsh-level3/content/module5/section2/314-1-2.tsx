/**
 * Unit 314 · Learning outcome 1 · Criterion 1.2 — The procedures for
 * re-scheduling work to coordinate with changing conditions in the workplace
 * and to coincide with other trades
 *
 * The coordination criterion proper. Taught as: your programme is a slot inside
 * somebody else's, conditions move, and re-scheduling is a procedure rather
 * than an improvisation.
 *
 * CDM grounding: dutyholders must cooperate with each other and coordinate
 * their work to ensure health and safety.
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
    question: 'What makes re-scheduling a procedure rather than a reaction?',
    options: [
      'You decide in advance how changes get raised, agreed and communicated',
      'It is written into the contract',
      'It only happens at fixed review points',
      'The client authorises every change',
    ],
    correctAnswer: 0,
    explanation:
      'Sites change constantly. What separates coordination from chaos is having a known route for a change rather than inventing one each time.',
  },
  {
    id: 2,
    question: 'The plasterer is running two days late. What is the first coordination question?',
    options: [
      'What work can move forward into the gap without creating a new clash',
      'Who is to blame',
      'Whether the client will extend the programme',
      'Whether to send people home',
    ],
    correctAnswer: 0,
    explanation:
      'Recovering the gap is worth more than allocating fault, and it has to be checked against the rest of the sequence or you simply move the clash somewhere else.',
  },
  {
    id: 3,
    question: 'Why does a change to your sequence need telling to other trades?',
    options: [
      'Because their programme assumes yours — a silent change becomes their delay',
      'Because the contract requires notification',
      'To share the blame for the delay',
      'It does not, as long as you meet your own dates',
    ],
    correctAnswer: 0,
    explanation:
      'Coordination is mutual. Bringing second fix forward into a room the decorator has booked is your gain and their problem, and they will find out the hard way.',
  },
  {
    id: 4,
    question: 'Which condition change most often forces re-scheduling on refurbishment work?',
    options: [
      'The building turning out to differ from the drawings',
      'Weather',
      'Material price changes',
      'Staff holidays',
    ],
    correctAnswer: 0,
    explanation:
      'A wall that is solid, a void that is not accessible, a route that is already full — refurbishment produces these weekly, and each one is a re-scheduling decision.',
  },
  {
    id: 5,
    question: 'What should happen to the plan when work is re-scheduled?',
    options: [
      'It gets updated, and the people working to it are told',
      'Nothing; the original plan is the record',
      'It is rewritten from scratch',
      'It is archived and replaced verbally',
    ],
    correctAnswer: 0,
    explanation:
      'A plan that no longer describes the job is worse than no plan, because people keep working to it. Updating it is part of the re-scheduling procedure.',
  },
  {
    id: 6,
    question: 'Who needs to know about a re-scheduling decision?',
    options: [
      'Everyone whose own work depends on the part that moved',
      'Only your own operatives',
      'Only the client',
      'Only the trade that caused the change',
    ],
    correctAnswer: 0,
    explanation:
      'The test is dependency, not hierarchy. Anybody whose sequence assumed yours has to hear about it while they can still act.',
  },
  {
    id: 7,
    question: 'When conditions change, what should you check before committing to the new sequence?',
    options: [
      'That the resources, access and competence exist for the work you are bringing forward',
      'That it saves time overall',
      'That the client approves',
      'That it keeps everyone busy',
    ],
    correctAnswer: 0,
    explanation:
      'Work brought forward without the material, the access or the right person on site is not recovery — it is a second stoppage dressed up as a decision.',
  },
  {
    id: 8,
    question: 'What is the honest measure of good re-scheduling?',
    options: [
      'That the change was noticed early, decided deliberately, and communicated before it bit',
      'That the end date did not move',
      'That nobody complained',
      'That no work was lost',
    ],
    correctAnswer: 0,
    explanation:
      'Some changes cost time whatever you do. What is within your control is how early you saw it, whether somebody chose the response, and who knew in time to act.',
  },
];

export default function Lesson314_1_2() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'Your programme is a slot inside everyone else’s. A change to yours is a change to theirs.',
          'Re-scheduling is a procedure: how a change gets raised, agreed, recorded and told.',
          'Before committing to a new sequence, check the resources, access and competence exist for it.',
          'Tell everyone whose work depends on the part that moved — dependency, not hierarchy.',
          'Update the plan. A plan that no longer describes the job is worse than none, because people follow it.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Describe re-scheduling as a procedure with a known route, rather than an improvisation.',
          'Identify the conditions that commonly force a change, especially on refurbishment work.',
          'Check a proposed new sequence against resources, access and competence before committing.',
          'Work out who needs to know about a change, using dependency rather than hierarchy.',
          'Explain why cooperating and coordinating with other trades is a duty, not a courtesy.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>A shared programme</ContentEyebrow>

      <ConceptBlock
        title="Coordination means your programme is not yours alone"
        plainEnglish="Every date you move is a date somebody else built their week around."
      >
        <p>
          On any job with more than one trade, your sequence is interlocked with several others.
          The joiner before you, the plasterer after your first fix, the decorator before your second
          fix, the flooring contractor who needs the room empty on Thursday.
        </p>
        <p>
          That has a consequence people miss: a change that benefits you can cost somebody else
          more than it saved you. Bringing second fix forward into a room the decorator has booked
          is a gain on your programme and a stoppage on theirs — and it will come back, because
          they will then be late for the person after them.
        </p>
        <p>
          So the unit of decision is not &ldquo;can I move this?&rdquo; but &ldquo;what does moving
          this do to the sequence?&rdquo; That is what coordinating means, and it is why CDM puts
          cooperation and coordination on dutyholders rather than leaving it to goodwill.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="CDM 2015"
        clause="Regulations 8 and 15 · guidance in HSE L153"
        meaning="Dutyholders must cooperate with each other and coordinate their work to ensure health and safety, and must communicate with each other so that everyone understands the risks and the measures being taken to control them. A contractor must plan, manage and monitor the work under their control — which on a multi-trade site necessarily includes how their sequence meets everybody else's."
        cite="HSE L153, Managing health and safety in construction"
      />

      <InlineCheck
        id="314-1-2-check-1"
        question="You can finish a room two days early by moving second fix forward. The decorator is booked in it. What is the coordination question?"
        options={[
          'Whether you can get in before they arrive',
          'Whether the client minds',
          'What moving it does to the rest of the sequence, not just to your programme',
          'Whether two days is worth the effort',
        ]}
        correctIndex={2}
        explanation="A gain on your programme that becomes a stoppage on theirs usually comes back to you, because they are now late for whoever follows them."
      />

      <SectionRule />

      <ContentEyebrow>Routes for change</ContentEyebrow>

      <ConceptBlock
        title="Have a route for a change before you need one"
        onSite="Who raises it, who decides, who is told. Agree that in week one."
      >
        <p>
          The criterion asks for the <em>procedures</em> for re-scheduling, and that word is doing
          real work. Sites change constantly; what separates a coordinated site from a chaotic one
          is not fewer changes but a known route for handling them.
        </p>
        <p>A workable route has four steps and takes minutes once it is agreed:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Raised.</strong> Whoever sees it says so, to a known person, the same day. This
            only happens if people have been told that raising something is wanted rather than
            tolerated.
          </li>
          <li>
            <strong>Assessed.</strong> What does the change do to the rest of the sequence, and what
            are the options?
          </li>
          <li>
            <strong>Decided.</strong> Somebody chooses, and it is clear who that is. A change nobody
            decided happens anyway, just later and worse.
          </li>
          <li>
            <strong>Communicated and recorded.</strong> Everyone dependent is told, and the plan is
            updated so the next person to read it gets the current version.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock title="What actually changes on site">
        <p>
          It helps to know what to expect, because most re-scheduling comes from a short list:
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>The building differs from the drawings.</strong> The dominant cause on
            refurbishment. A wall that is solid, a void with no access, a route already occupied by
            something nobody surveyed.
          </li>
          <li>
            <strong>A preceding trade is late.</strong> Your start moves and your window compresses.
          </li>
          <li>
            <strong>Access is withdrawn.</strong> A room becomes unavailable, a tenant cannot be
            moved, a shutdown is refused on the day.
          </li>
          <li>
            <strong>Scope changes.</strong> An instruction arrives and the work is no longer what
            you sequenced.
          </li>
          <li>
            <strong>People change.</strong> Sickness, a reallocation, an operative who turns out not
            to hold the ticket the task needs.
          </li>
        </ul>
        <p>
          None of these is exotic. Knowing they are coming is what lets you build a programme with
          somewhere to move to, rather than one that only works if nothing happens.
        </p>
      </ConceptBlock>

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Filling the gap with whatever is nearest"
        whatHappens={
          <>
            Work stops, so people get moved onto the next thing that looks available. Halfway
            through it becomes clear the material for it has not arrived, or the area is not ready,
            or the person now doing it needs supervising and the supervisor is elsewhere. Two hours
            gone and a second stoppage created.
          </>
        }
        doInstead={
          <>
            Before committing, check the three things that make work possible: the resources are
            there, the access is there, and the competence is there. Ten seconds of checking
            prevents the recovery that costs more than the delay did.
          </>
        }
      />

      <CommonMistake
        title="Re-scheduling in a conversation and leaving the plan where it was"
        whatHappens={
          <>
            <p>
              The change gets agreed properly: the right people are in the corridor, the options
              are weighed, a sensible new sequence is settled on. What nobody does is write it
              anywhere, because everyone who needed to know was standing there.
            </p>
            <p>
              Two of your own operatives were not, and they carry on to the original sequence.
              Somebody arriving on Thursday reads the programme on the wall and works to a job
              that stopped existing on Tuesday. The out-of-date plan is worse than no plan at all,
              because it still carries authority and people follow it.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Finish the change properly: raised, assessed, decided, and then communicated and
              recorded. The last step is the one that gets dropped and it is the one that makes
              the first three durable.
            </p>
            <p>
              It does not need to be elaborate &mdash; a revised date on the list, a message to
              the group, a new sheet on the store wall. What it needs is to be the version people
              will actually find, so the test is whether somebody arriving on Thursday would end
              up working to the current sequence without having to ask three people.
            </p>
          </>
        }
      />

      <SectionRule />

      <ContentEyebrow>Telling the right people</ContentEyebrow>

      <ConceptBlock
        title="Who has to be told"
        plainEnglish="Work out who built their week on the thing you just moved."
      >
        <p>
          The instinct is to tell whoever is in charge. The better test is dependency: who assumed
          the thing that has changed?
        </p>
        <p>
          That usually means the trade immediately after you in the sequence, anyone sharing access
          or a shutdown window with you, your own operatives, and whoever holds the overall
          programme. The client belongs on the list only when the change reaches their date, their
          cost, or their use of the building — but when it does, they need it early enough to make a
          decision rather than receive an announcement.
        </p>
        <p>
          Early is the whole point. The same information delivered two days sooner is a choice; two
          days later it is a report.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="314-1-2-check-2"
        question="A void you were going to run cable through turns out to be inaccessible. When do you say so?"
        options={[
          'The day you find out, before you have spent time working around it',
          'Once you have found an alternative route',
          'At the next progress meeting',
          'Only if it affects the end date',
        ]}
        correctIndex={0}
        explanation="Finding an alternative first feels professional and costs you the chance for anyone else to help — the builder may be opening that ceiling next week anyway, and only they know."
      />

      <SectionRule />

      <ContentEyebrow>Updating the plan</ContentEyebrow>

      <ConceptBlock title="Update the plan, or stop calling it a plan">
        <p>
          Re-scheduling that lives only in a conversation has a short life. People who were not
          there keep working to the original sequence, and somebody arriving on Thursday reads a
          programme describing a job that stopped existing on Tuesday.
        </p>
        <p>
          The update does not need to be elaborate — a revised date on the list, a message to the
          group, a note on the wall. What it needs is to be the version people will find. An
          out-of-date plan is actively worse than none, because it carries authority it no longer
          deserves.
        </p>
      </ConceptBlock>

      <ConceptBlock title="Build somewhere to move to">
        <p>
          The best re-scheduling decision is one you prepared for. A programme with a piece of
          independent work in it — something that needs no other trade, no fresh delivery and no
          special access — gives you an answer when a stoppage arrives.
        </p>
        <p>
          On most electrical jobs that exists naturally: containment in an area nobody else is
          working in, the supply side, labelling, a section of second fix in a completed room. It
          costs nothing to identify one at the planning stage and it turns a lost day into a moved
          one.
        </p>
      </ConceptBlock>

      <Scenario
        title="The two days that moved three times"
        situation={
          <>
            A surgery refurbishment in Llandudno. The joiner finishes two days late, so first fix
            starts on the Wednesday instead of the Monday. The supervisor moves the team into the
            plant room to keep them working — but the plant room needs the isolation that was booked
            for the following week, and the practice manager will not release it at short notice.
            The team spends most of Wednesday waiting, then goes back to first fix on Thursday in a
            compressed window.
          </>
        }
        whatToDo={
          <>
            The plant room was the wrong gap-filler: it needed access nobody had secured.
            Containment in the empty rear corridor needed no isolation, no other trade and no fresh
            delivery, and would have absorbed the day cleanly. It was on the programme for week
            three and could have moved without anyone noticing.
          </>
        }
        whyItMatters={
          <>
            The joiner&rsquo;s delay cost two days and was outside anyone&rsquo;s control here. The
            third day was lost to a re-scheduling decision made in a hurry without checking access —
            and that one was entirely inside it.
          </>
        }
      />

      <InlineCheck
        id="314-1-2-check-3"
        question="Which piece of work is the best candidate to move into an unexpected gap?"
        options={[
          'Second fix in the room the decorator is finishing',
          'Testing, once the board is energised next week',
          'Work needing a shutdown you have not booked',
          'Containment in an area no other trade is working in',
        ]}
        correctIndex={3}
        explanation="It needs no other trade, no new delivery and no special access — which is exactly what makes a task movable. The other three all depend on something you do not currently have."
      />

      <SectionRule />

      <ContentEyebrow>Cost and safety of a change</ContentEyebrow>

      <ConceptBlock title="Say what it costs, not that it is a problem">
        <p>
          When a change has to be raised with somebody outside your own team, the version that gets
          acted on describes the effect rather than the event. &ldquo;The grid is not finished&rdquo;
          is an observation anyone can make. &ldquo;We cannot start first fix in the east wing until
          the grid is complete, and our window closes Friday&rdquo; is a problem with a date on it.
        </p>
        <p>
          The second version also keeps you out of the argument. It is about the programme rather
          than about whether anyone is working hard enough, and site managers can act on it without
          anybody having to be wrong.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ConceptBlock title="Re-scheduling has a safety consequence">
        <p>
          Moving work around is usually treated as a commercial decision, and it is also a safety
          one. Two trades compressed into the same space, work brought forward into an area that has
          not been cleared, or a sequence reordered so that an isolation no longer lines up — each
          of those changes the risk picture that was assessed.
        </p>
        <p>
          That is why coordination sits in health and safety regulation rather than purely in
          contract. When you re-sequence, ask what the new arrangement does to access, to isolation,
          and to who is working near whom — and if the answer is material, the method has to move
          with the programme.
        </p>
      </ConceptBlock>

      <FAQ
        items={[
          {
            question: 'How much re-scheduling is normal before it means the plan was bad?',
            answer:
              'Frequent small adjustments are a sign of a plan being used, not a plan being wrong. What suggests a poor plan is the same change recurring — if access is withdrawn three times, the issue is not the third withdrawal, it is that access was never properly established. Look at the pattern rather than the count.',
          },
          {
            question: 'The other trade will not cooperate. What then?',
            answer:
              'Raise it with whoever holds the overall programme, in writing, describing the effect rather than the personality. "We cannot start first fix in the east wing until the grid is complete, and our window closes Friday" is actionable by a site manager. "They are being difficult" is not, and it puts you in the argument rather than above it.',
          },
          {
            question: 'Should every change go to the client?',
            answer:
              'No — most are internal sequencing and telling them everything trains them to ignore you. The filter is whether it reaches their date, their cost or their use of the building. When it does, tell them while there is still a decision to make, because a client who finds out late remembers the lateness more than the change.',
          },
          {
            question: 'How do I record a re-schedule without a lot of paperwork?',
            answer:
              'A dated line is enough: what moved, why, and what it affects. Kept on the same list as the programme, it doubles as the record you will need for criterion 2.5 of unit 304 and for any conversation about who caused a delay. It takes about as long as typing a message, which is usually what it is.',
          },
        ]}
      />

      <KeyTakeaways
        points={[
          'Your programme is interlocked — a change that helps you can cost somebody else more.',
          'CDM makes cooperating, coordinating and communicating a duty between dutyholders.',
          'Agree the route for a change in week one: raised, assessed, decided, communicated and recorded.',
          'Expect the usual causes — the building differs from the drawings, a trade is late, access is withdrawn.',
          'Before filling a gap, check resources, access and competence all exist for the work you move in.',
          'Tell everyone whose work depended on the thing that moved, and tell them early enough to act.',
          'Update the plan; an out-of-date plan carries authority it no longer deserves.',
          'Identify an independent task at the planning stage so a stoppage has somewhere to go.',
        ]}
      />

      <ContentEyebrow>Check yourself</ContentEyebrow>
      <Quiz questions={quizQuestions} title="Re-scheduling work and coordinating with other trades" />
    </div>
  );
}
