/**
 * Unit 304 · Learning outcome 2 · Criterion 2.2 — Evaluate the resource
 * selection and usage
 *
 * Partner to 1.1 (organise the resources) and 1.5 (cost and waste). Two
 * questions: did you pick the right resources, and did you use the ones you
 * picked well. Learners routinely answer only the second.
 *
 * BS 7671 grounding: Regulation 133.1.3 ties certain equipment selections to
 * what is recorded on the certification, which is the point where a selection
 * decision stops being private.
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
    question: 'This criterion has two halves. What are they?',
    options: [
      'Whether you selected the right resources, and whether you used them well',
      'Whether you were on budget, and whether you were on time',
      'What you ordered, and what it cost',
      'Labour and materials',
    ],
    correctAnswer: 0,
    explanation:
      'Selection and usage are separate questions with separate answers. A perfectly used resource that was the wrong choice is still a finding.',
  },
  {
    id: 2,
    question: 'You ordered 500 m of cable and installed 430 m. What does that tell you on its own?',
    options: [
      'Nothing yet — it depends on the take-off and the allowance you set',
      'That you wasted 70 m',
      'That your take-off was wrong',
      'That the allowance was too small',
    ],
    correctAnswer: 0,
    explanation:
      'A raw difference is not a finding. Against a take-off of 430 m plus a stated 15% allowance it is exactly as planned; against a take-off of 480 m it is something else entirely.',
  },
  {
    id: 3,
    question: 'Which is the more useful record to keep during a job?',
    options: [
      'Ordered against installed, allowed against taken, and any half-day spent on something other than the work',
      'Total spend',
      'The delivery notes',
      'The hours each person worked',
    ],
    correctAnswer: 0,
    explanation:
      'Three comparisons produce findings. A single total tells you whether you are happy, not why.',
  },
  {
    id: 4,
    question: 'A hired tower sat on site for five days and was used on two. What kind of finding is that?',
    options: [
      'A usage finding — the resource was right, the booking was not',
      'A selection finding — a tower was the wrong choice',
      'Not a finding; hire is a fixed cost',
      'A supplier problem',
    ],
    correctAnswer: 0,
    explanation:
      'Separating the two halves matters. The tower was the correct access equipment; what went wrong was matching the hire period to the days it was needed.',
  },
  {
    id: 5,
    question: 'The luminaires you selected turned out to be difficult to maintain. Which half does that sit in?',
    options: [
      'Selection — the choice did not suit how the building would be used afterwards',
      'Usage — they were installed badly',
      'Neither; maintainability is the client’s concern',
      'Both equally',
    ],
    correctAnswer: 0,
    explanation:
      'It is a selection finding, and it points straight back at criterion 1.4 — whole-life cost and maintainability were constraints that should have weighed in the choice.',
  },
  {
    id: 6,
    question: 'How should an allowance be set for the next job?',
    options: [
      'From your own record of ordered against installed across similar jobs',
      'As a fixed percentage used every time',
      'By copying what the wholesaler suggests',
      'By adding whatever feels safe',
    ],
    correctAnswer: 0,
    explanation:
      'This is the compounding benefit of evaluating usage. An allowance based on your own history can be justified; a habitual number cannot.',
  },
  {
    id: 7,
    question: 'Competence was short on site and the work slowed. Where does that belong?',
    options: [
      'Selection — people are a resource, and the wrong mix is a selection finding',
      'Nowhere; it is a staffing matter',
      'Usage, because the people were there',
      'It belongs in criterion 2.4 only',
    ],
    correctAnswer: 0,
    explanation:
      'Labour is a resource like any other. Two apprentices and one electrician is a selection decision, and evaluating it honestly is part of this criterion.',
  },
  {
    id: 8,
    question: 'What makes this evaluation possible at all?',
    options: [
      'Records kept while the job was running',
      'A good memory',
      'The final invoice',
      'The client’s feedback',
    ],
    correctAnswer: 0,
    explanation:
      'Reconstructed from memory at the end, this criterion produces guesses that flatter whoever is guessing. Kept as you go, it produces numbers.',
  },
];

export default function Lesson304_2_2() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'Two questions, not one: did you pick the right resources, and did you use them well?',
          'A raw difference between ordered and installed is not a finding until you know the take-off and the allowance.',
          'Selection findings point back at criterion 1.4; usage findings point at 1.1 and 1.3.',
          'People and plant are resources too — the wrong labour mix is a selection finding.',
          'This criterion is only answerable from records kept while the job ran.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Separate the two halves of the criterion — was the resource the right one, and was it used well.',
          'Compare ordered against installed, and allowed against taken, and say what the difference means.',
          'Classify a finding as a selection issue or a usage issue, and explain why that matters.',
          'Evaluate people and plant as resources, not just materials.',
          'Use your own record to set a defensible allowance on the next job.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>Selection versus usage</ContentEyebrow>

      <ConceptBlock
        title="Selection and usage are different questions"
        plainEnglish="Was it the right thing to bring, and did you make good use of it?"
      >
        <p>
          Most attempts at this criterion answer only the second half. They report what was used,
          what was left over and what it cost, and stop — which leaves the more interesting question
          untouched.
        </p>
        <p>
          <strong>Selection</strong> asks whether the resource was the right one at all. The correct
          cable for the conditions. The access equipment that actually suited the height and the
          floor. A labour mix with the competence the work needed. Equipment the client can maintain
          once you have gone.
        </p>
        <p>
          <strong>Usage</strong> asks whether what you brought was used well. Hire periods matched
          to the days needed. Material called forward rather than dumped. Time spent installing
          rather than waiting, travelling or moving things twice.
        </p>
        <p>
          The distinction is not academic: the two failures have different remedies. A usage problem
          is fixed by better planning next time. A selection problem is fixed by a better decision —
          and it sends you back to the reasoning in criterion 1.4.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="304-2-2-check-1"
        question="A MEWP was hired for a week and used on two days, and it was the right machine for the job. Which half?"
        options={[
          'Selection — a different machine was needed',
          'Both equally',
          'Neither; hire is a fixed cost',
          'Usage — the selection was sound, the booking period was not',
        ]}
        correctIndex={3}
        explanation="Naming the half correctly is what makes the finding actionable. This one changes how you book, not what you book."
      />

      <SectionRule />

      <ContentEyebrow>Three comparisons, and people</ContentEyebrow>

      <ConceptBlock
        title="The three comparisons"
        onSite="Ordered against installed. Allowed against taken. Days planned against days spent."
      >
        <p>
          A useful evaluation rests on three comparisons, and none of them takes long if the numbers
          were captured as you went:
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Ordered against installed.</strong> The material question. Read it against your
            take-off and your stated allowance — a 70 m difference is either exactly what you
            planned or a 16% overshoot, and the raw number alone cannot tell you which.
          </li>
          <li>
            <strong>Allowed against taken.</strong> The labour question. Not just the total, but
            where it went: which task ran over, and whether the overrun was the work itself or
            something around it.
          </li>
          <li>
            <strong>Planned against spent, for plant.</strong> Hire days booked against hire days
            used. This is the one nobody looks at and it is frequently the cleanest saving
            available.
          </li>
        </ul>
        <p>
          Each comparison produces a number, and a number is something you can act on. &ldquo;We
          used a bit more than expected&rdquo; is not.
        </p>
      </ConceptBlock>

      <ConceptBlock title="People are a resource">
        <p>
          The half most often left out. If the labour mix was wrong — not enough competence for the
          work, too many hands for the space, one person who could isolate and three who could not —
          that is a resource selection finding and it belongs here rather than being quietly folded
          into &ldquo;the job took longer than expected&rdquo;.
        </p>
        <p>
          It is also the finding with the most useful consequences, because it changes how the next
          job is resourced rather than how it is priced. Two competent people and one apprentice for
          four days is a different job from four people for two days, and the evaluation is where
          you learn which one this kind of work actually wants.
        </p>
        <p>
          Keep it about the mix rather than the individuals. How you personally performed is
          criterion 2.4 and it is a separate question.
        </p>
      </ConceptBlock>

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Evaluating the leftovers and calling it done"
        whatHappens={
          <>
            The review reports that some material was left over, that it will be used on another
            job, and that ordering was broadly right. Nothing about hire periods, nothing about
            whether the equipment suited the building, nothing about the labour mix — and no numbers
            anywhere, because none were kept.
          </>
        }
        doInstead={
          <>
            Run all three comparisons and separate selection from usage in each. Even one properly
            quantified finding — &ldquo;tower hired 5 days, used 2, book to the days next
            time&rdquo; — is worth more than a page of general reflection.
          </>
        }
      />

      <CommonMistake
        title="Folding a labour-mix problem into &ldquo;it took longer than expected&rdquo;"
        whatHappens={
          <>
            <p>
              The hours overran, so the overrun goes in the review as the work having taken longer
              than planned. What is not said is that for two of the six weeks there was one person
              who could isolate and three who could not, and that during testing half the team had
              nothing to do that did not need supervising.
            </p>
            <p>
              Described as an overrun it looks like the work was harder than expected, and the
              conclusion is to allow more hours next time. The actual problem was the shape of the
              team rather than the size of it, so allowing more hours would buy exactly the same
              week again.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Treat people as a resource and put the finding where it belongs. Too little
              competence for the work, too many hands for the space, or a profile that never
              stepped down when the work changed are all resource selection findings, and they
              change how the next job is resourced rather than how it is priced.
            </p>
            <p>
              Keep it about the mix and not the individuals &mdash; how you personally performed
              is a separate criterion and a separate conversation. What this one wants is whether
              two competent people and one apprentice for four days was the right shape for this
              work, or whether the profile should have changed when the job moved into testing.
            </p>
          </>
        }
      />

      <SectionRule />

      <ContentEyebrow>Selection others can see</ContentEyebrow>

      <ConceptBlock
        title="Where selection stops being private"
        plainEnglish="Some equipment choices have to appear on the certificate."
      >
        <p>
          Most resource decisions are yours and nobody ever sees them. A few are not: BS 7671
          requires that certain uses of equipment are recorded on the appropriate certification, so
          the choice becomes part of the permanent record of the installation rather than something
          that lived in your head during week two.
        </p>
        <p>
          That is worth knowing when you evaluate selection. A decision that had to be recorded is
          one somebody may read years later, possibly while fault-finding, possibly while deciding
          whether an alteration is safe. &ldquo;It was what we had on the van&rdquo; is a poor thing
          to have written into an installation&rsquo;s history.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026"
        clause="Regulation 133.1.3 (Selection of equipment)"
        meaning="Certain usages of equipment shall be recorded on the appropriate electrical certification specified in Part 6. Designers, installers and inspectors should consult Part 6 to identify the correct certificate or report and where the entry is made, so that the selection decision is carried with the installation rather than being lost."
        cite="BS 7671 Part 1 — Scope, Object and Fundamental Principles"
      />

      <InlineCheck
        id="304-2-2-check-2"
        question="Your take-off was 430 m, you allowed 15%, you ordered 500 m and installed 430 m. What is the finding?"
        options={[
          'The take-off was accurate; the allowance was larger than this job needed',
          'The take-off was wrong',
          'Nothing went wrong at all',
          'You under-ordered',
        ]}
        correctIndex={0}
        explanation="The take-off matched reality exactly, which is good news. The 70 m was insurance you did not need — worth noting against the next job of this type rather than treating 15% as fixed."
      />

      <SectionRule />

      <ContentEyebrow>Feeding it into next time</ContentEyebrow>

      <ConceptBlock title="Turning the numbers into next time">
        <p>
          The compounding value of this criterion is that your own history becomes the basis for
          future allowances. After three or four jobs of a similar type you stop guessing: you know
          that domestic rewires in this housing stock run within 5% of take-off and that plant rooms
          do not.
        </p>
        <p>
          That is the difference between an allowance you can justify to a client or an estimator
          and a number you always use because you always have. Criterion 1.5 asked for the first
          and could not give it to you; this criterion is where it comes from.
        </p>
      </ConceptBlock>

      <Scenario
        title="On budget, badly resourced"
        situation={
          <>
            A three-storey office refurbishment in Newport, eight weeks, finished on price.
            Reviewing the resources: material came in almost exactly on take-off. A scissor lift was
            hired for six weeks and used in three separate bursts totalling eleven days. The labour
            was two electricians and two apprentices throughout, and for the four weeks of
            containment and cable pulling that was right — for the two weeks of testing and
            certification it meant two people were watching.
          </>
        }
        whatToDo={
          <>
            Two findings, both usage rather than selection. The lift should have been hired in
            blocks against the programme, not continuously. The labour profile should have stepped
            down for the testing phase, with the apprentices moved to another job or given work that
            did not need supervision. Neither is about anyone working badly.
          </>
        }
        whyItMatters={
          <>
            The job made its number, which is exactly why nobody would have looked. Both findings
            are worth real money on the next refurbishment of this size, and both are invisible
            without the comparison between what was booked and what was used.
          </>
        }
      />

      <InlineCheck
        id="304-2-2-check-3"
        question="Which of these makes this criterion answerable?"
        options={[
          'A careful reconstruction at the end',
          'The final account from the client',
          'Numbers written down during the job',
          'Asking the team what they remember',
        ]}
        correctIndex={2}
        explanation="Memory at the end of a job produces a story rather than a measurement, and the story tends to be kind to whoever is telling it. Three columns kept as you go take moments."
      />

      <SectionRule />

      <ConceptBlock title="Consumables and the small stuff">
        <p>
          Glands, screws, connectors, blades, fixings. Individually trivial, collectively a running
          cost that nobody takes off and nobody reviews — and the commonest cause of an unplanned
          trip to a counter mid-fix.
        </p>
        <p>
          They are worth one line in an evaluation, because the finding is nearly always the same
          and nearly always easy: a standing van stock set at the right level removes a category of
          delay entirely, and the level is knowable from your own record of what ran out.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Information and reordering</ContentEyebrow>

      <ConceptBlock title="Information as a resource, reviewed">
        <p>
          Drawings, specifications and manufacturer instructions were resources you organised in
          criterion 1.1, so they are resources to evaluate here. Did you have what you needed, when
          you needed it, at the right revision?
        </p>
        <p>
          The finding to look for is time lost to missing or wrong information rather than to the
          work itself. It is invisible on any invoice, it is usually recoverable by one question
          asked a fortnight earlier, and it recurs job after job until somebody writes it down.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ConceptBlock title="What you would order differently">
        <p>
          Finish the evaluation with the practical output: what would the order look like on the
          next job of this type? Not a percentage adjustment across the board, but the specific
          changes — this item in a different quantity, this one delivered in two drops, this one not
          at all.
        </p>
        <p>
          Three specific changes is a complete answer to this criterion. A general intention to
          order more carefully is not.
        </p>
      </ConceptBlock>

      <FAQ
        items={[
          {
            question: 'I am employed and I do not see the figures. How can I evaluate cost?',
            answer:
              'You do not need prices to do this well. Quantities, hire days and hours are all visible from where you stand, and all three produce findings. "The tower was on site three weeks and we used it twice" needs no access to the accounts and is a real observation about resource usage.',
          },
          {
            question: 'What if everything came in exactly as planned?',
            answer:
              'Then show the comparisons that demonstrate it and say what you would keep. That is a legitimate conclusion, and it is far stronger than the same claim without numbers behind it. It is also worth asking whether the plan had enough in it to be tested — an allowance so generous that nothing could exceed it produces this result every time.',
          },
          {
            question: 'How is this different from criterion 1.5?',
            answer:
              '1.5 is forward-looking: recognising, at the planning stage, that decisions have cost and waste implications. This one is backward-looking: what actually happened to the resources you chose. They are the same subject at opposite ends of the job, and the second is what makes the first better the next time round.',
          },
          {
            question: 'Should the client see this evaluation?',
            answer:
              'Usually not in full — it contains your own commercial workings. What can be worth sharing is anything that affects them directly: a piece of equipment that will be awkward to maintain, or a sequencing problem that came from their side and will recur. Framed as information rather than complaint, that conversation tends to be welcomed.',
          },
        ]}
      />

      <KeyTakeaways
        points={[
          'Two questions: was it the right resource, and was it used well.',
          'Selection findings send you back to criterion 1.4; usage findings to 1.1 and 1.3.',
          'Three comparisons: ordered against installed, allowed against taken, plant booked against plant used.',
          'A raw difference means nothing without the take-off and the stated allowance.',
          'People are a resource — the wrong labour mix is a selection finding, not just an overrun.',
          'Plant hire periods are the least examined and often the cleanest saving.',
          'Some equipment selections are recorded on the certification and outlive the job.',
          'Your own history is what turns a habitual allowance into a defensible one.',
        ]}
      />

      <ContentEyebrow>Check yourself</ContentEyebrow>
      <Quiz questions={quizQuestions} title="Evaluate the resource selection and usage" />
    </div>
  );
}
