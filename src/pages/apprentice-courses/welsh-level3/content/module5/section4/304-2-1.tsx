/**
 * Unit 304 · Learning outcome 2 · Criterion 2.1 — Review the appropriateness of
 * the success criteria set
 *
 * The partner to criterion 1.2. Where 1.2 asked the learner to set criteria,
 * this asks whether the ones they set were the right ones — which means the
 * criteria themselves are on trial, not just the work.
 *
 * CDM grounding: planning, managing and MONITORING are one duty, and reviewing
 * what you set is the monitoring half.
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
    question: 'What is being reviewed in this criterion?',
    options: [
      'The criteria themselves — whether they were the right tests to set',
      'Whether the work passed the criteria',
      'The client’s satisfaction with the finished job',
      'The accuracy of the test results',
    ],
    correctAnswer: 0,
    explanation:
      'Criterion 2.3 reviews the output. This one reviews your judgement in setting the criteria, which is a different and less comfortable question.',
  },
  {
    id: 2,
    question: 'Every criterion you set was met, comfortably. What does that suggest?',
    options: [
      'Possibly that they were set too loosely to tell you anything',
      'That the job was run perfectly',
      'That the criteria were exactly right',
      'Nothing — passing is the aim',
    ],
    correctAnswer: 0,
    explanation:
      'Criteria that nothing could fail are not a measure. A set where everything passes with room to spare is worth a second look, not a celebration.',
  },
  {
    id: 3,
    question: 'The client was unhappy although every criterion was met. What is the finding?',
    options: [
      'The criteria measured the wrong things — something that mattered to them was never a criterion',
      'The client is being unreasonable',
      'The criteria were too demanding',
      'Nothing; the agreement was met',
    ],
    correctAnswer: 0,
    explanation:
      'This is the single most useful finding this criterion produces. A gap between "passed" and "satisfied" is a gap in what you chose to measure.',
  },
  {
    id: 4,
    question: 'A criterion had to be renegotiated mid-job. Is that a failure?',
    options: [
      'Not necessarily — but it is worth asking whether it was set on an assumption that did not hold',
      'Yes, always',
      'No, and it needs no examination',
      'Only if the client raised it',
    ],
    correctAnswer: 0,
    explanation:
      'Buildings differ from drawings and scopes move. The question is whether the change came from new information or from something you could have known at the start.',
  },
  {
    id: 5,
    question: 'Which criterion family is most often found missing at review?',
    options: [
      'Complete — usually around scope and making good',
      'Compliant',
      'On time',
      'Within cost',
    ],
    correctAnswer: 0,
    explanation:
      'Compliance and dates are hard to forget. What gets left out is the boundary of the job, which is exactly where "finished" turns out to mean two things.',
  },
  {
    id: 6,
    question: 'When is the best time to capture a review point?',
    options: [
      'During the job, when something turns out to be unhelpful',
      'Three weeks later, once you have perspective',
      'At the end, all in one sitting',
      'Only if there was a problem',
    ],
    correctAnswer: 0,
    explanation:
      'An evaluation written from memory is an evaluation of your memory. A note made the day a criterion proved useless is worth more than a page written later.',
  },
  {
    id: 7,
    question: 'Reviewing honestly means writing down that you set a weak criterion. Why do it?',
    options: [
      'Because the finding is what improves the next job — and it is what this criterion assesses',
      'Because the awarding body requires a confession',
      'To protect yourself from the client',
      'It is optional; a positive review is safer',
    ],
    correctAnswer: 0,
    explanation:
      'An evaluation that finds nothing is either a perfect job or an unexamined one, and assessors have seen enough of both to tell them apart.',
  },
  {
    id: 8,
    question: 'What should a review of criteria actually produce?',
    options: [
      'Specific changes to how you will set criteria next time',
      'A score out of ten for the job',
      'A list of what went well',
      'A note that the criteria were appropriate',
    ],
    correctAnswer: 0,
    explanation:
      'A review with no change coming out of it has not finished. "Next time I will state making good explicitly" is the shape of a useful conclusion.',
  },
];

export default function Lesson304_2_1() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'This reviews your judgement, not your work. The criteria themselves are the thing being examined.',
          'Everything passing comfortably is a warning sign, not a result — loose criteria measure nothing.',
          '"Passed but unhappy" is the most useful finding available: you measured the wrong thing.',
          'Capture review points during the job. An evaluation from memory is an evaluation of your memory.',
          'A review that produces no change to how you work next time has not finished.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Explain what is on trial in this criterion — the criteria you set, not the work you did.',
          'Test a set of criteria for looseness, for the wrong target, and for missing families.',
          'Interpret the gap between "every criterion passed" and "the client was unhappy".',
          'Distinguish a criterion changed by new information from one set on a poor assumption.',
          'Turn a review into a specific change to how you will set criteria next time.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>The criteria on trial</ContentEyebrow>

      <ConceptBlock
        title="The criteria are the thing on trial"
        plainEnglish="Not 'did we pass?' — 'were those the right tests to be setting?'"
      >
        <p>
          Criterion 1.2 asked you to set success criteria. This one asks whether they were the
          appropriate ones. That is a genuinely different question, and it is the more
          uncomfortable of the two, because the answer can be &ldquo;we passed every test and the
          tests were wrong&rdquo;.
        </p>
        <p>
          It is also the question that improves the next job. Whether this job was delivered is
          largely settled by now. Whether you know how to define &ldquo;delivered&rdquo; well is a
          skill you carry forward, and it only develops if you look back at it deliberately.
        </p>
        <p>
          Three tests are worth applying to any set of criteria after the fact: were they tight
          enough to fail anything, did they point at what actually mattered, and was a whole family
          missing.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="304-2-1-check-1"
        question="Every criterion was met and the client is delighted. What is worth checking?"
        options={[
          'Nothing; that is the ideal outcome',
          'Whether the client was paying attention',
          'Whether anything could have failed them — criteria nothing can fail are not a measure',
          'Whether the criteria were too hard',
        ]}
        correctIndex={2}
        explanation="A happy client and a passed set of criteria is a good day. It is still worth knowing whether the criteria did any work, because next time the job may not go this well."
      />

      <SectionRule />

      <ContentEyebrow>Too loose, or wrongly aimed</ContentEyebrow>

      <ConceptBlock
        title="Too loose to tell you anything"
        onSite="Read each criterion and ask what would have had to happen for it to fail."
      >
        <p>
          The commonest fault is criteria that could not realistically have been failed.
          &ldquo;Work completed to BS 7671&rdquo; on a job where you were always going to work to BS
          7671. &ldquo;Completed within the agreed programme&rdquo; where the programme had three
          weeks of slack in it. &ldquo;No unnecessary disruption&rdquo;, where nobody defined
          necessary.
        </p>
        <p>
          These feel like criteria and behave like decoration. The test to apply afterwards is
          simple: describe the circumstance in which this criterion would have been failed. If you
          cannot, or the circumstance you describe is absurd, the criterion was not doing anything.
        </p>
        <p>
          The remedy is not to make criteria harsh. It is to make them specific — a date rather
          than &ldquo;on time&rdquo;, a named boundary rather than &ldquo;complete&rdquo;, a stated
          limit rather than &ldquo;minimal&rdquo;.
        </p>
      </ConceptBlock>

      <ConceptBlock title="Aimed at the wrong thing">
        <p>
          The second fault is harder to spot because everything looks fine. Your criteria were
          specific, testable and all met — and the client is still dissatisfied. That is not
          unreasonableness; it is a measurement failure, and it is the most valuable thing this
          criterion can surface.
        </p>
        <p>
          It happens when your criteria describe the work as a contractor sees it and the client
          judges it as a user. You measured circuits, certification and the programme. They were
          judging noise during business hours, how the place looked each evening, and whether they
          had to explain the same thing twice.
        </p>
        <p>
          The correction is to ask, at the start of the next job, what they will judge it on — not
          what they want built, but what would make them say it went well. Those answers are
          criteria, and they are rarely the ones a contractor writes unprompted.
        </p>
      </ConceptBlock>

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="The review that finds everything was fine"
        whatHappens={
          <>
            Half a page saying the criteria were appropriate, the work met them, and lessons will be
            carried forward. It takes ten minutes, nobody can argue with it, and it is worth
            precisely nothing — to you, to the next job, or to an assessor who has read a hundred
            of them.
          </>
        }
        doInstead={
          <>
            Find one thing. Every job has a criterion that was vague, a boundary that was assumed,
            or something that mattered to somebody and was never written down. Name it and say what
            you will do differently. One real finding beats a page of reassurance.
          </>
        }
      />

      <CommonMistake
        title="Filing every change under &ldquo;unforeseeable&rdquo;"
        whatHappens={
          <>
            <p>
              Three criteria had to be renegotiated during the job, and all three appear in the
              review as circumstances outside anybody&rsquo;s control. The loft was not boarded.
              The room was still occupied. The board position had to move. Each is recorded as
              something that came to light, and the account is entirely defensive without ever
              saying anything untrue.
            </p>
            <p>
              At least one of those was knowable before the job started, by a survey or by a
              question. Filing it under bad luck means nothing changes, and the same criterion
              rests on the same unchecked assumption on the next job, where it comes to light
              again.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Sort each change into one of two piles as you write it up. New information &mdash;
              genuinely unknowable at the start &mdash; gets recorded, with a note of how quickly
              it was picked up and agreed, and that is the end of it. A poor assumption &mdash;
              something you could have checked, asked about or seen on a survey &mdash; is the
              finding.
            </p>
            <p>
              Being honest about which is which is the whole skill here, and it is what separates
              a reflective account from a defensive one. The finding is never that the criterion
              moved; it is that it rested on something nobody verified.
            </p>
          </>
        }
      />

      <SectionRule />

      <ContentEyebrow>Criteria changed mid job</ContentEyebrow>

      <ConceptBlock title="Changed mid-job: new information or poor assumption?">
        <p>
          Criteria get renegotiated. A wall turns out to be solid, a scope grows, a date moves for
          reasons nobody controlled. That is not automatically a failing, and a review that treats
          every change as an error will teach you to set criteria so vague they never need changing
          — which is worse.
        </p>
        <p>The distinction worth making is where the change came from:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>New information.</strong> Something genuinely unknowable at the start. Record
            it, note how quickly it was picked up and agreed, and move on.
          </li>
          <li>
            <strong>A poor assumption.</strong> Something you could have checked, asked about, or
            seen on a survey. This is the finding — not that the criterion changed, but that it
            rested on something nobody verified.
          </li>
        </ul>
        <p>
          Being honest about which is which is the whole skill. It is also what separates a
          reflective account from a defensive one, and assessors read for exactly that.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="304-2-1-check-2"
        question="A criterion assumed the loft was boarded. It was not, and the criterion had to change. Which is it?"
        options={[
          'New information nobody could have had',
          'Neither; criteria always change',
          'A client failure to disclose',
          'A poor assumption — a survey or a question would have established it',
        ]}
        correctIndex={3}
        explanation="Whether a loft is boarded is knowable before the job starts. The finding is not that the criterion moved — it is that it rested on something nobody checked."
      />

      <SectionRule />

      <ContentEyebrow>Reviewing as a planning duty</ContentEyebrow>

      <ConceptBlock
        title="Reviewing is the other half of the planning duty"
        onSite="Monitoring is not just watching the work. It includes watching the plan."
      >
        <p>
          CDM asks a contractor to plan, manage and monitor. The three are one duty across the life
          of the job, not three separate activities, and monitoring includes checking that the
          arrangements you set up are still the right ones.
        </p>
        <p>
          That is what makes this criterion something other than a paperwork exercise at the end. A
          criterion that has stopped making sense in week two is worth noticing in week two, while
          it can still be changed by agreement rather than discovered at handover.
        </p>
        <p>
          The practical version is a two-minute look at your own criteria partway through. Are these
          still the right tests? Has anything appeared that ought to be one? Has one quietly become
          impossible?
        </p>
      </ConceptBlock>

      <RegsCallout
        source="CDM 2015"
        clause="Regulation 15 · guidance in HSE L153"
        meaning="A contractor must plan, manage and monitor the construction work they carry out, so far as is reasonably practicable, so that it is carried out without risks to health or safety. Monitoring is part of the same duty as planning — the arrangements you set at the start are expected to be checked and adjusted as the work proceeds, not simply filed."
        cite="HSE L153, Managing health and safety in construction"
      />

      <SectionRule />

      <ConceptBlock title="Write it while it is happening">
        <p>
          A review assembled at the end, from memory, tends to produce the same three observations
          every time: it went broadly well, communication could have been better, and we will bear
          it in mind. Those are not findings, they are the shape memory collapses into.
        </p>
        <p>
          The alternative costs almost nothing. When something turns out badly defined, note it in
          one line on the day. &ldquo;Nobody had agreed who was making good&rdquo;. &ldquo;The
          finish date was a guess and everyone treated it as fixed&rdquo;. Six of those is a real
          evaluation, and it takes less total time than writing the vague version.
        </p>
      </ConceptBlock>

      <Scenario
        title="Passed everything, lost the customer"
        situation={
          <>
            A pub rewire in Ruthin over a two-week closure. Criteria: all circuits installed and
            certified, work complete by the Friday, within the quoted price, compliant with BS 7671.
            All four met. The landlord will not use the firm again — every morning the bar was left
            covered in dust and cable offcuts, and twice they arrived to find the cellar supply off
            without warning.
          </>
        }
        whatToDo={
          <>
            There is nothing to fix on this job; it is finished and it passed. The review finding is
            the one that matters: two things the customer judged the work on — daily condition of
            the premises, and notice before an isolation — were never criteria. Both are easy to
            agree at the start and neither had occurred to anyone to write down.
          </>
        }
        whyItMatters={
          <>
            This is exactly what 2.1 exists to catch. The criteria were specific, testable and met.
            They measured the installation and not the experience of having the work done, and the
            gap between those two is where repeat business lives.
          </>
        }
      />

      <InlineCheck
        id="304-2-1-check-3"
        question="What should come out the other end of this review?"
        options={[
          'A specific change to how you will set criteria on the next job',
          'A judgement on whether the job was a success',
          'A list of what the client did wrong',
          'Confirmation that the criteria were appropriate',
        ]}
        correctIndex={0}
        explanation="The review is only finished when it has produced something you will do differently. Everything else is description."
      />

      <SectionRule />

      <ContentEyebrow>Unwritten and inherited criteria</ContentEyebrow>

      <ConceptBlock title="The criteria nobody wrote down">
        <p>
          Some of the strongest findings are about criteria that were never set at all. A client
          judges a job on things they never thought to say, because to them they were obvious:
          the place tidy each evening, notice before the power goes off, the same face turning up
          each day.
        </p>
        <p>
          Reviewing for absences is harder than reviewing what is on the list, and the way in is to
          work backwards from any friction. Every moment of awkwardness during the job usually marks
          an expectation somebody held and nobody had agreed.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ConceptBlock title="Criteria you inherited">
        <p>
          On specified work most criteria arrive with the job — the specification, the drawings and
          the contract define compliant, complete, on time and within cost between them. It is
          tempting to conclude there is nothing to review.
        </p>
        <p>
          There is: whether you read them properly, and whether you noticed the gaps. A
          specification silent on making good leaves exactly the same hole as a verbal brief, and
          spotting that at tender rather than at handover is a skill this criterion is quietly
          assessing.
        </p>
      </ConceptBlock>

      <FAQ
        items={[
          {
            question: 'Is it not risky to write down that I set a weak criterion?',
            answer:
              'It is the opposite. An evaluation that finds nothing reads as an evaluation nobody did, and that is the impression you least want to give in a professional discussion. Naming a weakness and saying what you changed demonstrates the judgement being assessed. A record that says everything was appropriate demonstrates only that you wrote something.',
          },
          {
            question: 'How long should this review be?',
            answer:
              'Short and specific beats long and general every time. Three criteria examined properly — this one was loose, this one measured the wrong thing, this one we changed and here is why — is a complete review. Several pages restating what the criteria were is not, however thorough it looks.',
          },
          {
            question: 'What if the criteria genuinely were appropriate?',
            answer:
              'Then say so and show your working: here is what could have failed each one, here is what the client judged it on, and here is why those match. That is a defensible conclusion. What does not work is asserting appropriateness without the test — it looks identical to not having looked.',
          },
          {
            question: 'Who else should see this review?',
            answer:
              'Practically, whoever sets criteria on the next job — often you, sometimes a supervisor or estimator. On a job where a client relationship is continuing, some findings are worth sharing with them too: "we did not agree who was making good, and we will next time" is a good conversation to have while they still remember the job.',
          },
        ]}
      />

      <KeyTakeaways
        points={[
          'This criterion puts your judgement on trial, not your workmanship.',
          'Apply three tests: were they tight enough to fail, did they aim at what mattered, was a family missing.',
          'A criterion you cannot describe a failure for was not doing anything.',
          '"Passed but unhappy" means you measured the work rather than the experience of it.',
          '"Complete" is the family most often found missing — usually scope and making good.',
          'Separate criteria changed by new information from criteria built on unchecked assumptions.',
          'Monitoring is part of the same duty as planning — review criteria during the job, not only after.',
          'Capture findings in one line on the day; end with a change you will actually make.',
        ]}
      />

      <ContentEyebrow>Check yourself</ContentEyebrow>
      <Quiz questions={quizQuestions} title="Review the appropriateness of success criteria set" />
    </div>
  );
}
