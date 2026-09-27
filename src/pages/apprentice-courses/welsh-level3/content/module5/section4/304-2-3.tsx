/**
 * Unit 304 · Learning outcome 2 · Criterion 2.3 — Evaluate the finished output
 *
 * The one criterion in outcome 2 where there is an external standard rather
 * than a judgement: the installation either verified against BS 7671 or it did
 * not. Taught as three layers — compliant, complete, and the qualities nobody
 * tests but everybody notices.
 *
 * Grounded on BS 7671 Part 6: every installation inspected and tested on
 * completion before being put into service.
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
    question: 'What makes this criterion different from the rest of outcome 2?',
    options: [
      'Part of it is measured against an external standard rather than your judgement',
      'It is the only one that is optional',
      'It is assessed by the client',
      'It does not require evidence',
    ],
    correctAnswer: 0,
    explanation:
      'Compliance is not a matter of opinion. The installation either verified against BS 7671 or it did not, and the certification records which.',
  },
  {
    id: 2,
    question: 'A circuit failed its insulation resistance test and was put right before handover. Is that a finding?',
    options: [
      'Yes — the fault was caught, but why it existed is worth knowing',
      'No, because it was corrected',
      'No, test failures are routine',
      'Only if the client noticed',
    ],
    correctAnswer: 0,
    explanation:
      'Testing did its job. The evaluation question is upstream: a damaged cable, a poor termination or a rushed second fix each point somewhere different.',
  },
  {
    id: 3,
    question: 'Which of these belongs in the "complete" layer rather than "compliant"?',
    options: [
      'Making good around a repositioned accessory',
      'Correct disconnection times',
      'Polarity verified throughout',
      'Conductor sizing to the design',
    ],
    correctAnswer: 0,
    explanation:
      'Making good is not a BS 7671 question, and it is the single most common reason a compliant installation is called unfinished.',
  },
  {
    id: 4,
    question: 'How should workmanship be evaluated if there is no test for it?',
    options: [
      'Against what the next person will meet — labelling, routing, access and symmetry',
      'It cannot be, so leave it out',
      'By asking whether the client complained',
      'By comparing it to the last job',
    ],
    correctAnswer: 0,
    explanation:
      'The useful standard is not neatness for its own sake. It is whether the installation can be worked on, understood and maintained by someone who was not there.',
  },
  {
    id: 5,
    question: 'A snag list of twelve minor items comes out of the handover inspection. What does that suggest?',
    options: [
      'Something systematic — twelve separate small failures usually share a cause',
      'That the inspection was unusually thorough',
      'Nothing; twelve is normal',
      'That the client is difficult',
    ],
    correctAnswer: 0,
    explanation:
      'One snag is an oversight. Twelve is a pattern — rushed second fix, an unclear specification, or a phase of work nobody checked as it went.',
  },
  {
    id: 6,
    question: 'When is the best time to find a defect in the finished output?',
    options: [
      'During the work, by checking as each phase completes',
      'At the handover inspection',
      'During the defects liability period',
      'When the client reports it',
    ],
    correctAnswer: 0,
    explanation:
      'Every step down that list costs more. A fault found as you go costs minutes; the same fault found after handover costs a return visit and some credibility.',
  },
  {
    id: 7,
    question: 'What is the record that the finished output was verified?',
    options: [
      'The certification and its supporting schedules',
      'The invoice',
      'The client’s signature on a delivery note',
      'Photographs of the work',
    ],
    correctAnswer: 0,
    explanation:
      'The Electrical Installation Certificate, with the Schedule of Inspections and Schedule of Test Results behind it, is the permanent evidence of verification.',
  },
  {
    id: 8,
    question: 'What should evaluating the output produce?',
    options: [
      'Findings about why any shortfall existed, not just a list of what was wrong',
      'A judgement of pass or fail',
      'A list of snags',
      'Confirmation that the certificate was issued',
    ],
    correctAnswer: 0,
    explanation:
      'The snag list is the input to this criterion, not the output. What you are after is the cause, because that is the only part you can change next time.',
  },
];

export default function Lesson304_2_3() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'Three layers: compliant, complete, and the qualities nobody tests but everybody notices.',
          'Compliance is not an opinion — it verified against BS 7671 or it did not, and the certification says which.',
          '"Complete" is where compliant installations get called unfinished, usually over making good.',
          'Twelve small snags share a cause. Look for the pattern, not the items.',
          'The output of this criterion is causes, not a list of what was wrong.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Evaluate a finished installation in three layers — compliant, complete, and the qualities nobody tests.',
          'Explain why compliance is the one part of outcome 2 that is not a matter of judgement.',
          'Read a snag list for patterns rather than treating each item separately.',
          'Trace a defect back to its cause rather than stopping at the correction.',
          'Identify the certification as the permanent record that verification happened.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>Three layers of judgement</ContentEyebrow>

      <ConceptBlock
        title="Three layers to judge it in"
        plainEnglish="Does it comply, is it finished, and would you be happy to find it?"
      >
        <p>
          &ldquo;Was the work any good?&rdquo; is too broad to answer usefully. Split it into three
          layers and each one gets a different kind of evidence:
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Compliant.</strong> Inspected and tested, results within expectation, certified.
            This layer is objective — it is the one place in outcome 2 where there is a right
            answer independent of anyone&rsquo;s view.
          </li>
          <li>
            <strong>Complete.</strong> Everything in the scope done, nothing outstanding that was
            not agreed, the building put back. Judged against what was agreed in criterion 1.2, not
            against what feels finished.
          </li>
          <li>
            <strong>Quality nobody tests.</strong> Labelling, routing, symmetry, access for
            maintenance, whether a stranger could understand the board. No instrument measures any
            of it and every electrician who comes after you will form a view.
          </li>
        </ul>
        <p>
          A job can pass the first and fail the other two, and that combination is exactly what
          produces a client who is dissatisfied with work that was technically correct.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026"
        clause="Part 6 — Inspection and Testing"
        meaning="Every installation shall, on completion before being put into service, be inspected and tested to verify, so far as is reasonably practicable, that the requirements of BS 7671 have been met. This is a pre-commissioning requirement — inspection and testing must be completed and the results evaluated before the installation is energised or handed over for use, and it applies to additions and alterations as well as to new work."
        cite="BS 7671 Part 6 — initial verification"
      />

      <InlineCheck
        id="304-2-3-check-1"
        question="Which layer is 'the consumer unit is not labelled' a failure of?"
        options={[
          'Compliant',
          'Complete',
          'It is not a failure at all',
          'Quality — nobody tests it, and everyone who opens that board afterwards meets it',
        ]}
        correctIndex={3}
        explanation="Labelling is the clearest example of the third layer: invisible to a test, immediately visible to the next person, and a decision about how much work the future is going to take."
      />

      <SectionRule />

      <ContentEyebrow>Test failures and snag patterns</ContentEyebrow>

      <ConceptBlock
        title="A test failure is data, not a disgrace"
        onSite="The fault got caught. Now ask why it was there."
      >
        <p>
          Testing exists to find things, so finding something is not a failure of the process — it
          is the process working. The evaluation question is upstream of the correction.
        </p>
        <p>
          An insulation resistance reading that is low, a polarity error, a missing CPC connection:
          each points somewhere specific. A damaged cable suggests storage or handling. A poor
          termination in one accessory is one thing; the same fault in three suggests somebody was
          working too fast or had not been shown properly. A fault clustered in the last area
          completed usually means the programme ran out before the work did.
        </p>
        <p>
          Recording the correction and stopping there wastes the information. &ldquo;Two
          terminations remade on the kitchen ring&rdquo; is a note. &ldquo;Two terminations remade,
          both in the section finished on the last afternoon&rdquo; is a finding, and it belongs
          next to criterion 2.5.
        </p>
      </ConceptBlock>

      <ConceptBlock title="Read the snag list for patterns">
        <p>
          A handover inspection produces a list. The instinct is to work through it item by item,
          fix everything and consider the matter closed. That gets the job finished and teaches you
          nothing.
        </p>
        <p>
          Group them instead. Are they in one area? One type of accessory? One phase of the work?
          Twelve snags spread evenly across a building is a different story from twelve in the room
          that was done last, and both are different from twelve that are all the same accessory
          fitted the same wrong way.
        </p>
        <p>
          The pattern is the finding. Individual snags are just work.
        </p>
      </ConceptBlock>

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Evaluating the output by whether anyone complained"
        whatHappens={
          <>
            Silence gets read as success. But most clients do not complain about the things in the
            third layer — they simply notice, form a view, and do not call you next time. And the
            next electrician into that board forms a view too, one you never hear.
          </>
        }
        doInstead={
          <>
            Judge it against the three layers deliberately, and specifically against what the next
            person will meet. Would you be pleased to open this board in five years knowing nothing
            about the job? That question is answerable, and it does not need anyone to complain.
          </>
        }
      />

      <CommonMistake
        title="Closing the snag list out and never asking why it looked like that"
        whatHappens={
          <>
            <p>
              Twelve items come off the handover inspection. They are worked through one at a
              time, every one is put right, the list is signed off and the job closes. It feels
              like the list has been dealt with, because it has.
            </p>
            <p>
              What nobody looked at is the shape of it. Eight of the twelve were in the room that
              was finished last, or all of them were the same accessory fitted the same way, or
              they cluster in one phase of the work. That shape was the only useful thing the list
              contained, and it went in the bin with the list.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Group the items before you start correcting them. One area, one type of accessory,
              one phase, one person&rsquo;s work &mdash; the grouping is the finding, and twelve
              snags spread evenly across a building tells you something completely different from
              twelve in the last room completed.
            </p>
            <p>
              Then record the cause alongside the correction. &ldquo;Two terminations remade&rdquo;
              is a note; &ldquo;two terminations remade, both in the section finished on the last
              afternoon&rdquo; is a finding, and it is the one that stops the same list appearing
              on the next job.
            </p>
          </>
        }
      />

      <SectionRule />

      <ContentEyebrow>Finding it earlier</ContentEyebrow>

      <ConceptBlock
        title="Find it earlier and it costs less"
        onSite="Check each phase as it completes, not the whole job at the end."
      >
        <p>
          There is a straightforward ladder of cost for any defect, and every rung down multiplies
          it:
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>During the work.</strong> Minutes. The person who made it is standing there and
            the access is still open.
          </li>
          <li>
            <strong>At testing.</strong> An hour, and possibly a floorboard.
          </li>
          <li>
            <strong>At the handover inspection.</strong> A return to an area that is finished, often
            decorated, sometimes occupied.
          </li>
          <li>
            <strong>After handover.</strong> A visit, a customer who has lost some confidence, and
            whatever it costs to get back into a building that is now in use.
          </li>
        </ul>
        <p>
          Which means the single most effective quality practice is not a better final inspection —
          it is checking each phase as it closes, while the cost of a correction is still measured
          in minutes.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="304-2-3-check-2"
        question="Eight of the twelve snags are in the last room completed. What is the likely finding?"
        options={[
          'That room was harder than the others',
          'Different people worked in that room',
          'Coincidence — snags cluster randomly',
          'The programme ran out before the work did, and quality was traded for the date',
        ]}
        correctIndex={3}
        explanation="A cluster in the last area finished is one of the most reliable patterns there is, and it links straight to criterion 2.5. Fixing the twelve snags does not fix the cause."
      />

      <SectionRule />

      <ConceptBlock title="What the certification records">
        <p>
          The Electrical Installation Certificate, with the Schedule of Inspections and the Schedule
          of Test Results behind it, is the permanent evidence that verification took place and what
          it found. It outlives the job, the relationship and usually the people involved.
        </p>
        <p>
          That gives it a role in this evaluation beyond the compliance tick. A schedule that
          matches what is actually installed, with results recorded as they were taken, is part of
          the quality of the finished output — arguably the part with the longest life. A schedule
          that has a circuit missing, or values that were tidied up afterwards, is a defect in the
          output even if every cable in the building is perfect.
        </p>
      </ConceptBlock>

      <Scenario
        title="Verified, certified, and hard to live with"
        situation={
          <>
            A distribution board replacement in a small industrial unit outside Llanelli. Every
            circuit tested and within expectation, certificate issued, no snags raised on the day.
            Eighteen months later another firm attends a fault. The board has no circuit
            identification beyond factory numbering, the schedule lists circuits in an order that
            does not match the board, and two spare ways are wired but not recorded.
          </>
        }
        whatToDo={
          <>
            Nothing can be done retrospectively without a return visit. The finding is that the
            third layer was never evaluated: the work passed every test it was given and failed the
            only test that mattered eighteen months later, which was whether a stranger could
            understand it.
          </>
        }
        whyItMatters={
          <>
            Compliance and quality are not the same thing, and only one of them gets measured
            automatically. This is the case for evaluating the output against what the next person
            will meet rather than against the certificate alone.
          </>
        }
      />

      <InlineCheck
        id="304-2-3-check-3"
        question="What is this criterion actually asking you to produce?"
        options={[
          'The causes behind any shortfall, so the next job is different',
          'A record that the work was completed',
          'A list of snags and their corrections',
          'The test results',
        ]}
        correctIndex={0}
        explanation="The snag list and the results are inputs. The evaluation is what you conclude from them, and a conclusion that changes nothing has not finished the job."
      />

      <SectionRule />

      <ContentEyebrow>Judged against the brief</ContentEyebrow>

      <ConceptBlock title="Judge it against the brief, not against your standards">
        <p>
          The output is measured against what was agreed, which is not the same as what you would
          have liked to build. A client who specified surface containment on a budget has not
          received a worse job because you would have chased the walls.
        </p>
        <p>
          Keep the two separate in the evaluation. &ldquo;Met the brief; the brief was constrained
          by budget and the client understood that&rdquo; is a clean finding. Quietly marking your
          own work down against a standard nobody asked for teaches you nothing and is not honest
          evaluation either.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Photographs and what you left behind</ContentEyebrow>

      <ConceptBlock title="Photographs are evidence, and they are free">
        <p>
          Work that gets covered up is work nobody can inspect later — cable routes before the
          plasterer, containment in a ceiling void, a termination inside an enclosure that is about
          to be closed.
        </p>
        <p>
          A handful of photographs at the point each phase closes costs nothing and does two jobs:
          it gives you something concrete to evaluate the output against, and it answers the
          question that arrives six months later about what is behind a wall. It is also the only
          practical way to demonstrate quality in the layers no test reaches.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ConceptBlock title="The output includes what you left behind">
        <p>
          A finished installation is not only the parts that carry current. The board labelling, the
          schedule that matches it, the marked-up drawing where the installation differs from the
          design — all of it is output, and all of it is what the next person meets.
        </p>
        <p>
          Evaluate it the same way as the physical work: could somebody who was not here understand
          this, and how long would it take them? That question has an honest answer, and it is
          usually the part of the job that ages worst.
        </p>
      </ConceptBlock>

      <FAQ
        items={[
          {
            question: 'Is this not just the same as inspection and testing?',
            answer:
              'Inspection and testing is one of the three layers and the only one with an instrument behind it. This criterion is broader: it asks whether the finished work was complete against what was agreed, and whether it is something the next person can work with. An installation can pass every test and still be a poor output.',
          },
          {
            question: 'How do I evaluate quality without being unfair to myself?',
            answer:
              'Use an external reference point rather than your own feelings about the job. "Could somebody who was not here understand this board from the schedule?" is answerable without self-criticism. So is "is there access to every joint and accessory?" Neither requires you to decide whether you are a good electrician.',
          },
          {
            question: 'The client signed it off happily. Is that not enough?',
            answer:
              'It is good evidence for the "complete" layer and almost none for the third. Most clients cannot assess labelling, routing or maintainability, and would not know to look. Their satisfaction tells you the scope was right and the experience was acceptable; it does not tell you what the installation will be like to work on.',
          },
          {
            question: 'What if the output genuinely had no shortfall?',
            answer:
              'Then say what made that true, because that is the transferable part. Checking at the end of each phase, results recorded as taken, labelling done at second fix rather than at the end — those are practices, and naming them is more useful than recording that nothing went wrong.',
          },
        ]}
      />

      <KeyTakeaways
        points={[
          'Three layers: compliant, complete, and the quality nobody tests.',
          'Compliance is objective — verified against BS 7671 before being put into service, and certified.',
          '"Complete" is where compliant work gets called unfinished, usually over scope and making good.',
          'A test failure is information about something upstream; record the cause, not just the correction.',
          'Read a snag list for patterns — a cluster in the last area finished is a programme finding.',
          'Every rung down the ladder from "during the work" to "after handover" multiplies the cost.',
          'The certification and its schedules are the longest-lived part of the output.',
          'Judge the third layer by what the next person will meet, not by whether anyone complained.',
        ]}
      />

      <ContentEyebrow>Check yourself</ContentEyebrow>
      <Quiz questions={quizQuestions} title="Evaluate the finished output" />
    </div>
  );
}
