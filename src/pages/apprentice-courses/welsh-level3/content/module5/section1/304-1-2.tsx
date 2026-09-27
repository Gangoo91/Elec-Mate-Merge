/**
 * Unit 304 · Learning outcome 1 · Criterion 1.2 — Set success criteria for the task(s)
 *
 * Pairs with criterion 2.1, which asks the learner to review whether the
 * criteria they set were the right ones. Written so the two read as one idea
 * split across the unit's two outcomes.
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
    question: 'What makes a statement a usable success criterion?',
    options: [
      'Someone other than you can apply it at the end and get the same yes or no',
      'It sounds professional in a quotation',
      'It is ambitious enough to impress the client',
      'It is written by the client rather than the contractor',
    ],
    correctAnswer: 0,
    explanation:
      'A criterion is a test. If two people applying it can reasonably disagree about whether it was met, it is an opinion dressed as a criterion.',
  },
  {
    id: 2,
    question: 'Which of these is NOT a usable success criterion for a consumer unit replacement?',
    options: [
      'The installation looks tidy and professional',
      'Every final circuit is tested and recorded on a Schedule of Test Results',
      'An Electrical Installation Certificate is issued to the person ordering the work',
      'The supply is restored the same day',
    ],
    correctAnswer: 0,
    explanation:
      '"Tidy and professional" cannot be failed by anyone except you. The other three are each a yes or a no that a stranger could check.',
  },
  {
    id: 3,
    question: 'When do success criteria have to be agreed?',
    options: [
      'Before the work starts',
      'At the halfway point, once the scope is clearer',
      'At handover, when both sides can see the result',
      'Only if the client asks for them',
    ],
    correctAnswer: 0,
    explanation:
      'Criteria agreed at the end are not criteria, they are an argument. Their whole value is that both sides committed to the same test before anyone had an interest in the answer.',
  },
  {
    id: 4,
    question:
      'A client asks for "better lighting in the workshop". What is the first planning move?',
    options: [
      'Turn the brief into things that can be checked — fitting positions, switching, control and compliance',
      'Quote for as many luminaires as the budget allows',
      'Start the work and refine it as you go',
      'Decline the job until the client writes a specification',
    ],
    correctAnswer: 0,
    explanation:
      'Vague briefs are normal. The skill is converting one into criteria both sides recognise, then getting agreement before the first fixing goes up.',
  },
  {
    id: 5,
    question: 'Which four families do most success criteria fall into?',
    options: [
      'Compliant, complete, on time, within cost',
      'Cheap, fast, tidy, popular',
      'Designed, installed, tested, invoiced',
      'Safe, legal, insured, certified',
    ],
    correctAnswer: 0,
    explanation:
      'Compliant and complete describe the output; on time and within cost describe the delivery. A set of criteria that misses one of the four usually goes wrong in exactly that corner.',
  },
  {
    id: 6,
    question: 'Why does compliance with BS 7671 belong in your criteria even though it is a given?',
    options: [
      'Because writing it down makes it the shared test rather than an assumption',
      'Because BS 7671 requires criteria to be written',
      'Because it lets you charge more',
      'It does not — a given should never be listed',
    ],
    correctAnswer: 0,
    explanation:
      'Things everyone assumes are the ones argued about later. A criterion that states the obvious costs one line and removes a whole category of dispute.',
  },
  {
    id: 7,
    question: 'A criterion reads: "Minimise disruption to the school day." How would you improve it?',
    options: [
      'Name the constraint — no noisy work during lessons, no circuit isolated for more than an hour',
      'Leave it — everyone knows what it means',
      'Delete it, because disruption is unavoidable',
      'Change it to "cause no disruption at all"',
    ],
    correctAnswer: 0,
    explanation:
      '"Minimise" has no failing condition. Turning it into named limits gives you something to plan against and the client something to hold you to.',
  },
  {
    id: 8,
    question: 'What does criterion 2.1 of this unit later ask you to do with these criteria?',
    options: [
      'Review whether the criteria you set were the appropriate ones',
      'Copy them onto the certificate',
      'Send them to the awarding body',
      'Nothing — they are finished with once agreed',
    ],
    correctAnswer: 0,
    explanation:
      'The criteria themselves get judged. Setting criteria that were too loose, too vague or aimed at the wrong thing is a planning fault, and 2.1 asks you to say so honestly.',
  },
];

export default function Lesson304_1_2() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'A success criterion is a test with a yes or a no in it. If only you can judge it, it is not one.',
          'Most criteria fall into four families: compliant, complete, on time, within cost.',
          'They are agreed and written down before work starts — criteria set at the end are just an argument.',
          'Outcome 2 comes back and judges the criteria themselves, so setting weak ones is a fault you will have to own.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Explain what separates a success criterion from a statement of intent.',
          'Write criteria across the four families — compliant, complete, on time, within cost.',
          'Convert a vague client brief into criteria that a third party could apply.',
          'Say why criteria have to be agreed and written down before the work starts.',
          'Connect the criteria you set to the evaluation that criterion 2.1 will ask you for.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>What a criterion is</ContentEyebrow>

      <ConceptBlock
        title="A criterion is a test, not an intention"
        plainEnglish="Could a stranger pick up your list at handover and tell you pass or fail?"
      >
        <p>
          &ldquo;Do a good job.&rdquo; &ldquo;Keep it tidy.&rdquo; &ldquo;Minimise
          disruption.&rdquo; These are intentions. They describe an attitude to the work, and none of
          them can be failed by anybody except the person who wrote them.
        </p>
        <p>
          A success criterion is different: it is a test you commit to in advance, and somebody else
          could apply it. &ldquo;Every final circuit tested and recorded on a Schedule of Test
          Results.&rdquo; &ldquo;No circuit isolated for more than one hour during the school
          day.&rdquo; &ldquo;Completed within the nine-day window between the joiner and the
          plasterer.&rdquo; Each of those has a failing condition, which is exactly what makes it
          useful.
        </p>
        <p>
          The habit worth building is to read each criterion back and ask what failure would look
          like. If you cannot describe it in a sentence, the criterion is an intention and it needs
          rewriting before anyone agrees to it.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="304-1-2-check-1"
        question="Which of these could a third party apply at handover without asking your opinion?"
        options={[
          'The work is to a high standard',
          'The client is happy with the result',
          'The distribution board is labelled and a Schedule of Test Results is issued',
          'The installation is neat',
        ]}
        correctIndex={2}
        explanation="Labels exist or they do not; a schedule was issued or it was not. The other three all route back through somebody's judgement, which is what you were trying to avoid."
      />

      <SectionRule />

      <ConceptBlock
        title="The four families"
        onSite="Write one criterion in each family before you write a second in any of them."
      >
        <p>
          Criteria that go wrong usually go wrong because a whole family was missing. Cover all four
          and the gaps close themselves:
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Compliant.</strong> The work meets BS 7671, the specification and the
            manufacturer&rsquo;s instructions, and the certification says so. Obvious — which is
            precisely why it gets assumed rather than agreed.
          </li>
          <li>
            <strong>Complete.</strong> Every item in the scope is finished, and anything left is
            listed and agreed rather than discovered. This is the family that stops
            &ldquo;finished&rdquo; meaning two different things at handover.
          </li>
          <li>
            <strong>On time.</strong> The dates, and the constraints inside them — not just the end
            date but the windows you have to work within.
          </li>
          <li>
            <strong>Within cost.</strong> The work is delivered inside the price, and anything that
            changes the price is raised when it arises rather than at the invoice.
          </li>
        </ul>
        <p>
          Compliant and complete describe the <em>output</em>. On time and within cost describe the{' '}
          <em>delivery</em>. A job can hit one pair and miss the other entirely, and a client will
          remember whichever one you missed.
        </p>
      </ConceptBlock>

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Criteria that only exist in your head"
        whatHappens={
          <>
            You know what a finished job looks like. The client has their own version, and nobody
            compared the two. At handover you are both certain you are right, and the argument is
            about something that could have been settled in five minutes at the start — usually
            making good, or whether something was in the scope at all.
          </>
        }
        doInstead={
          <>
            Write them down and send them, even on a small job, even as three lines in an email.
            The value is not the document; it is that both sides had to agree before either had
            anything to lose by agreeing.
          </>
        }
      />

      <CommonMistake
        title="Writing down the requirements and leaving out the restrictions"
        whatHappens={
          <>
            <p>
              The list covers everything the finished installation has to be, and none of what the
              client said you must not do. No noisy work before nine. Access only through the side
              door. The server room supply cannot go off. All three were said on the first
              morning, to you, and none of them left that conversation.
            </p>
            <p>
              The person who breaches one is almost never you. It is the operative who joined on
              day four, was never in the room, and has no way of knowing that the way he switched
              off to work safely has just taken down the thing the client cared about most.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Treat a constraint as a criterion in its own right and put it on the same written
              list. It does not describe the finished installation, but it can fail the job just
              as completely as a missing circuit, so it gets written in the same terms: what must
              not happen, and when.
            </p>
            <p>
              Then make sure it reaches everybody who turns up after the conversation. Written
              down, a constraint survives the morning it was said in; held in one person&rsquo;s
              memory, it lasts until that person is on another job.
            </p>
          </>
        }
      />

      <SectionRule />

      <ContentEyebrow>From brief to criteria</ContentEyebrow>

      <ConceptBlock title="Turning a brief into criteria">
        <p>
          Most briefs arrive vague, and that is not a failing on the client&rsquo;s part — they are
          describing a problem, not specifying a solution. &ldquo;The workshop lighting is no
          good&rdquo; is a perfectly reasonable thing for a customer to say. Converting it is your
          job.
        </p>
        <p>The conversion runs in three steps:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Ask what &ldquo;good&rdquo; would look like to them.</strong> Too dim at the
            bench? Shadows over the machine? Lamps failing constantly? Each of those points at a
            different job.
          </li>
          <li>
            <strong>Name what will physically change.</strong> Number and position of luminaires,
            switching and control arrangement, what is removed, what is made good.
          </li>
          <li>
            <strong>Attach the tests.</strong> Compliant — BS 7671 and the manufacturer&rsquo;s
            instructions, certified. Complete — the listed positions installed, old fittings removed,
            making good done. On time — the agreed day. Within cost — the quoted figure, with any
            change raised before it is incurred.
          </li>
        </ul>
        <p>
          You have not made the brief more demanding; you have made it checkable. That protects both
          sides, and it is the difference between a happy client and a client who is sure they asked
          for something else.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="304-1-2-check-2"
        question='A criterion reads "the job will be finished quickly". Which rewrite is usable?'
        options={[
          'Complete and certified by the end of Friday 17th, with the supply restored each evening',
          'The job will be finished as quickly as reasonably possible',
          'The job will be finished quicker than the last contractor managed',
          'The job will not be allowed to drag on',
        ]}
        correctIndex={0}
        explanation="A date and a daily constraint can both be checked by anyone holding a calendar. The other three are the same intention with more words."
      />

      <InlineCheck
        id="304-1-2-check-3"
        question="The client says the server room supply must stay live throughout. Where does that belong?"
        options={[
          'In your head, as something to remember',
          'In the written criteria — it is a constraint that can fail the job',
          'Nowhere; it is obvious from the building',
          'On the certificate at the end',
        ]}
        correctIndex={1}
        explanation="Constraints fail jobs as surely as requirements do, and they are the ones a second-week operative never heard. Written down, they survive the conversation they were said in."
      />

      <Scenario
        title="Two definitions of finished"
        situation={
          <>
            A consumer unit replacement in an occupied flat in Wrexham. You quote, you attend, you
            replace the board, you test, you certify and you issue the Electrical Installation
            Certificate. The client refuses to pay the final amount: the old board left a patch of
            bare plaster and two holes, and they expected the wall to be as it was.
          </>
        }
        whatToDo={
          <>
            There is no clean answer once you are here — the scope never said either way, so you are
            negotiating rather than referring to something agreed. Practically you either absorb the
            making good or you argue over a sum smaller than the goodwill it costs. The fix was one
            line at the start: &ldquo;Making good of the board position is not included&rdquo; or
            &ldquo;Making good to a paint-ready finish is included&rdquo; — either is fine, as long
            as it was said.
          </>
        }
        whyItMatters={
          <>
            Nothing technical went wrong. The electrical work was compliant, complete, on time and
            on price by your definition, and the job still ended badly — because the{' '}
            <em>complete</em> family was never agreed. This is the most common way a well-executed
            job fails its own success criteria.
          </>
        }
      />

      <SectionRule />

      <ContentEyebrow>Assessment and compliance criteria</ContentEyebrow>

      <ConceptBlock title="Criteria you will be judged on later">
        <p>
          This unit does not leave the criteria alone once they are set. Criterion 2.1 asks you to{' '}
          <strong>review the appropriateness of the success criteria set</strong> — in other words,
          to look back and say whether they were the right ones.
        </p>
        <p>
          That changes how you should write them. Criteria set so loosely that anything passes are
          not a safe hiding place; they are a finding against your planning. So are criteria aimed
          at the wrong thing — a set that carefully measures cable routes on a job the client judged
          entirely on disruption.
        </p>
        <p>
          The practical response is to keep the criteria where you can find them, and to note during
          the job when one turns out to be unhelpful. Writing the evaluation from memory three weeks
          later is how honest reflection turns into a paragraph of nothing.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ConceptBlock
        title="Compliance is the one criterion you do not get to set"
        plainEnglish="Three of the four families are negotiable. This one is not."
      >
        <p>
          On time and within cost are agreed between you and the client. Complete is a scope
          conversation. Compliant is neither — it is settled before anyone sits down, and no
          agreement between the two of you can move it.
        </p>
        <p>
          BS 7671 puts it plainly: every installation shall be inspected and tested on completion,
          before being put into service, to verify that the requirements have been met. That applies
          to additions and alterations as well as to whole new installations. It is a criterion that
          arrives with the job.
        </p>
        <p>
          Which is exactly why it belongs on the written list. A client who has seen
          &ldquo;inspected, tested and certified before energising&rdquo; in the quote understands
          why the last two days exist. One who has not sometimes reads them as padding.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026"
        clause="Part 6 — Inspection and Testing"
        meaning="Every installation shall, on completion before being put into service, be inspected and tested to verify, so far as is reasonably practicable, that the requirements of BS 7671 have been met. The requirement applies to additions and alterations as well as to new installations — any such work shall have appropriate inspection and testing performed before being put into service."
        cite="BS 7671 Part 6 — initial verification"
      />

      <SectionRule />

      <ContentEyebrow>Constraints and who accepts</ContentEyebrow>

      <ConceptBlock
        title="Constraints are criteria wearing different clothes"
        onSite="Anything the client says you must not do is a criterion. Write it as one."
      >
        <p>
          Some of what a client tells you is a requirement and some is a restriction, and it is easy
          to record the first and forget the second. &ldquo;No noisy work before nine.&rdquo;
          &ldquo;The server room supply cannot go off.&rdquo; &ldquo;Access only through the side
          door.&rdquo; None of those describe the finished installation, and all of them can fail
          the job.
        </p>
        <p>
          Treat them as criteria in their own right. They belong in the same written list, because
          they are the ones most likely to be breached by somebody who never heard them — a
          second-day operative who was not on the first-day conversation.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ConceptBlock title="Who accepts the work">
        <p>
          A criterion needs somebody to apply it. On a domestic job that is obvious. On anything
          larger it frequently is not: the person who briefed you, the person paying, the person who
          will use the installation and the person who signs it off can be four different people
          with four different ideas of success.
        </p>
        <p>
          Ask early who accepts the work. It costs one question and it prevents the specific,
          miserable situation where a job is finished, correct, and waiting on somebody who was
          never part of the conversation and does not agree with what was asked for.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Keeping criteria to hand</ContentEyebrow>

      <ConceptBlock title="Keep them where you will find them">
        <p>
          Criteria that live in a quotation nobody reopens are only half useful. The point of
          writing them down is that they can be checked — during the work as well as at the end.
        </p>
        <p>
          The habit worth having is to read the list once at the midpoint. It takes two minutes and
          it catches the drift that nobody notices day to day: a scope that quietly grew, a
          constraint everyone stopped observing, a date that stopped being realistic three days ago
          and has not been mentioned.
        </p>
      </ConceptBlock>

      <FAQ
        items={[
          {
            question: 'Is this not overkill on a half-day job?',
            answer:
              'The effort should scale with the work, but the principle does not change. On a half-day job three lines in the quote does everything a document would: what is included, what is not, and when it is done by. The jobs that generate disputes are rarely the big ones — on a big job somebody writes a specification. It is the half-day jobs where everyone assumed.',
          },
          {
            question: 'What if the client will not engage with any of this?',
            answer:
              'Then write the criteria yourself and send them as a statement of what you are going to do, rather than as something to be negotiated. A client who does not reply has still been told, and you have a record of what was proposed. That is worth far more at the end than a conversation neither of you remembers the same way.',
          },
          {
            question: 'Do success criteria change once work starts?',
            answer:
              'They can, and sometimes they should — a building rarely matches its drawings exactly. What matters is that a change is agreed and recorded when it happens, not assumed. An unrecorded change is indistinguishable at handover from a criterion you simply failed.',
          },
          {
            question: 'Who sets the criteria on a job with a full specification?',
            answer:
              'Most of them are set for you: the specification, the drawings and BS 7671 between them define compliant and complete, and the contract defines on time and within cost. Your job is then to read them out properly rather than invent them — and to notice the gaps, because a specification that says nothing about making good leaves the same hole as a verbal brief.',
          },
        ]}
      />

      <KeyTakeaways
        points={[
          'A success criterion is a test with a failing condition — an intention is not.',
          'Read each criterion back and ask what failure looks like; if you cannot say, rewrite it.',
          'Cover four families: compliant, complete, on time, within cost.',
          'Compliant and complete describe the output; on time and within cost describe the delivery.',
          'Agree and write them down before work starts, even on a small job, even in three lines.',
          'Vague briefs are normal — converting one into checkable criteria is the skill.',
          '"Complete" is the family most jobs fall down on, usually over making good and scope.',
          'Criterion 2.1 will judge the criteria themselves, so loose ones are a fault, not a shelter.',
        ]}
      />

      <ContentEyebrow>Check yourself</ContentEyebrow>
      <Quiz questions={quizQuestions} title="Set success criteria for the task(s)" />
    </div>
  );
}
