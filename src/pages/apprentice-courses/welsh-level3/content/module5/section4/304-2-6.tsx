/**
 * Unit 304 · Learning outcome 2 · Criterion 2.6 — Evaluate the handover
 *
 * The last criterion of the unit, and the partner to 1.7. Handover is evaluated
 * on what happened after it rather than on whether it took place: callbacks that
 * were not faults, documents that had to be chased, things the client never
 * understood.
 *
 * BS 7671 grounding: certification issued to the person ordering the work,
 * complete with the guidance for recipients in Appendix 6 — which is the point
 * where handover stops being a formality and becomes something the client can
 * actually use.
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
    question: 'What is the honest measure of a handover?',
    options: [
      'What happened in the weeks after it',
      'Whether it took place on the agreed day',
      'Whether the client signed',
      'Whether the certificate was issued',
    ],
    correctAnswer: 0,
    explanation:
      'Callbacks that were not faults, documents chased, and questions that should have been answered on the day are all handover findings arriving late.',
  },
  {
    id: 2,
    question: 'A client rings twice in a fortnight asking how the immersion timer works. What is that?',
    options: [
      'A demonstration failure at handover, not a fault',
      'A defect',
      'An unreasonable client',
      'A manufacturer problem',
    ],
    correctAnswer: 0,
    explanation:
      'Two calls about operation is the clearest evidence there is that the fifteen minutes of demonstration never happened or went to the wrong person.',
  },
  {
    id: 3,
    question: 'Certification should be issued complete with what, under BS 7671?',
    options: [
      'The guidance for recipients set out in Appendix 6',
      'A copy of the quotation',
      'The contractor’s insurance details',
      'A maintenance contract',
    ],
    correctAnswer: 0,
    explanation:
      'Appendix 6 guidance for recipients is what makes the certificate usable by the person who receives it, rather than a form they file without reading.',
  },
  {
    id: 4,
    question: 'Which handover finding is easiest to act on next time?',
    options: [
      'Documents that had to be chased after the event',
      'The client’s general impression',
      'Whether the building was clean',
      'How long the handover meeting took',
    ],
    correctAnswer: 0,
    explanation:
      'Chased documents have a specific cause every time — something was not assembled before the last day, and assembling it earlier is a decision entirely within your control.',
  },
  {
    id: 5,
    question: 'Who the demonstration was given to matters because?',
    options: [
      'The person who will actually operate the installation is often not the person who signs',
      'It affects the certificate',
      'It determines the defects liability period',
      'It does not matter, as long as someone was shown',
    ],
    correctAnswer: 0,
    explanation:
      'A demonstration to a site manager who leaves the following week is a demonstration that did not happen, as far as the building is concerned.',
  },
  {
    id: 6,
    question: 'How should a sectional handover be evaluated?',
    options: [
      'Whether the boundary was written down and understood by everyone',
      'Whether it was avoided',
      'Whether the client paid in stages',
      'Whether the sections were equal in size',
    ],
    correctAnswer: 0,
    explanation:
      'Partial handovers are normal. What goes wrong is an unwritten boundary, where "live" and "verified and signed off" quietly stop meaning the same thing.',
  },
  {
    id: 7,
    question: 'Nothing came back at all after handover. What does that tell you?',
    options: [
      'Probably that it went well — worth recording what you did that made it so',
      'Nothing useful',
      'That the client did not use the installation',
      'That the client was dissatisfied but silent',
    ],
    correctAnswer: 0,
    explanation:
      'A quiet fortnight is a genuine result. The value is in naming the practices behind it, because those are what you repeat.',
  },
  {
    id: 8,
    question: 'Where does a handover finding usually send you?',
    options: [
      'Back to criterion 1.7 — handover requirements that were not planned in',
      'To the client’s procedures',
      'To the manufacturer',
      'Nowhere; handover is the end of the job',
    ],
    correctAnswer: 0,
    explanation:
      'Almost every handover problem traces to something that was never given time in the programme. That is the loop this unit is built to close.',
  },
];

export default function Lesson304_2_6() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'A handover is judged by the fortnight after it, not by the meeting itself.',
          'Callbacks that are not faults are demonstration failures — and they are the commonest kind.',
          'Certification goes to the person ordering the work, complete with the Appendix 6 guidance for recipients.',
          'Ask who the demonstration was given to, not just whether one happened.',
          'Nearly every handover finding traces back to criterion 1.7 and time that was never planned.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Evaluate a handover on what happened afterwards, not on whether it took place.',
          'Classify a callback as a fault, a demonstration failure or a documentation failure.',
          'Explain what Appendix 6 guidance for recipients adds to the certification.',
          'Check that the demonstration reached the person who will actually operate the installation.',
          'Trace a handover finding back to the planning that should have allowed for it.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>The test of a handover</ContentEyebrow>

      <ConceptBlock
        title="Judged by what happened next"
        plainEnglish="Did anything come back that should not have?"
      >
        <p>
          A handover can go perfectly well on the day and still have been a poor handover. Everyone
          was pleasant, the certificate was handed over, the client said thank you — and then over
          the next fortnight three things come back that should not have.
        </p>
        <p>
          That fortnight is the measurement. Sort what came back into three kinds, because each one
          points somewhere different:
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Genuine faults.</strong> Something is wrong with the installation. These belong
            to criterion 2.3 — they are output findings that escaped.
          </li>
          <li>
            <strong>Operation questions.</strong> Nothing is wrong; somebody does not know how to
            use it. This is a demonstration failure, and it is the most common category by a
            distance.
          </li>
          <li>
            <strong>Document requests.</strong> Something was not issued, or was issued to somebody
            who did not pass it on. Entirely avoidable and entirely within your control.
          </li>
        </ul>
        <p>
          Only the first is really about the work. The other two are about the handover itself, and
          both are cheap to fix once you have noticed the pattern.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="304-2-6-check-1"
        question="A client calls to say the outside light 'is not working properly' — it is on a PIR they did not know about. What kind of finding?"
        options={[
          'A fault to be rectified',
          'A design error',
          'A demonstration failure — the installation is fine and nobody explained it',
          'Not a finding at all',
        ]}
        correctIndex={2}
        explanation="Nothing is wrong with the installation. Two minutes at handover would have removed the call entirely, and that is the cheapest fix available anywhere in this unit."
      />

      <SectionRule />

      <ContentEyebrow>People shown and documents issued</ContentEyebrow>

      <ConceptBlock
        title="Who was actually shown"
        onSite="Not 'did we demonstrate?' but 'to whom, and are they still there?'"
      >
        <p>
          Demonstration is the part of handover most often recorded as done and least often done
          usefully. The question that matters is who received it.
        </p>
        <p>
          On domestic work the person who commissioned the job and the person who lives with it are
          usually the same, and it is straightforward. On commercial work they routinely are not:
          you show the site manager, who hands the building to a facilities team, who meet the
          installation for the first time when something trips at eight in the morning.
        </p>
        <p>
          So the evaluation question is whether the demonstration reached somebody who will still be
          there and will use it. If it did not, that is not a small point — it is the difference
          between a system somebody can operate and a system that generates calls to you for years.
        </p>
      </ConceptBlock>

      <ConceptBlock title="What the documents have to carry">
        <p>
          BS 7671 is specific about where certification goes: to the person ordering the work.
          There is a further detail worth knowing, because it changes what a good handover looks
          like — the standard treats certification as being issued{' '}
          <em>complete with the guidance for recipients</em> set out in Appendix 6.
        </p>
        <p>
          That guidance is what turns a certificate from a form into something the recipient can
          use. It tells them what the document is, what to do with it, and what it means for them.
          A certificate handed over without it is technically issued and practically inert, and it
          is one of the reasons clients file them unread and cannot find them when the next
          electrician asks.
        </p>
        <p>
          Evaluating your handover documentation therefore has two parts: was everything issued, and
          was it issued in a form the person receiving it could actually use.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026"
        clause="Regulation 644.4 · Appendix 6"
        meaning="The Electrical Installation Certificate is issued to the person ordering the work by those responsible for the design, construction and verification, taking account of their respective responsibilities. The standard treats certification as being issued complete with the guidance for recipients detailed in Appendix 6 — the notes that tell the person receiving it what the document is and what they should do with it."
        cite="BS 7671 Part 6 and Appendix 6"
      />

      <VideoCard
        {...videos.scheduleOfInspections}
        topic="The schedule that goes with the certificate — worth checking against what you actually installed"
      />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Recording that the handover took place"
        whatHappens={
          <>
            The evaluation says the handover was completed on the agreed date, the certificate was
            issued and the client was satisfied. All true, all uninformative — and written before
            the only evidence that matters has had time to arrive.
          </>
        }
        doInstead={
          <>
            Leave the entry open for two or three weeks and then close it with what came back, and
            what kind of thing it was. A handover evaluation written on the day of the handover is
            being written too early to say anything.
          </>
        }
      />

      <CommonMistake
        title="Handing over the certificate with the guidance stripped off it"
        whatHappens={
          <>
            <p>
              The certificate and the schedules go across and the notes that come with them do
              not, because they look like boilerplate and the client only wants the signed page.
              As far as the job is concerned the document has been issued.
            </p>
            <p>
              What the client now holds is a form rather than something they can use. Nothing
              tells them what the document is, what to do with it or what it means for them, so it
              gets filed unread &mdash; and turns up later as a request for a copy, or as a
              question you have to answer on the phone that the paperwork was supposed to answer.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Issue certification complete with the guidance for recipients set out in Appendix 6.
              That guidance is the part that turns a certificate into something the recipient can
              act on, and leaving it out is what makes an issued document practically inert.
            </p>
            <p>
              Then evaluate the documentation in two parts rather than one: was everything issued,
              and was it issued in a form the person receiving it could actually use. A document
              that reached the right person and told them nothing has only done half its job.
            </p>
          </>
        }
      />

      <SectionRule />

      <ContentEyebrow>Partial handover boundaries</ContentEyebrow>

      <ConceptBlock
        title="The boundary on a partial handover"
        plainEnglish="Which bits are theirs now, and which are still yours?"
      >
        <p>
          Work is frequently handed over in pieces. Where that happened, the evaluation question is
          whether the boundary was written down and whether everyone read it the same way.
        </p>
        <p>
          Two failures recur. The first is a part of the installation that is energised because it
          shares a board with the finished area, but has not been verified — which is exactly the
          situation certification exists to prevent. The second is quieter: the client believes an
          area was handed over and you believe it was not, so nobody is watching it and a defect in
          it belongs to whoever is asked first.
        </p>
        <p>
          Both are avoided by one written line per section, and both are worth recording as findings
          if they happened, because they will happen again on the next job with the same shape.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="304-2-6-check-2"
        question="Three weeks after handover the client asks for the test results 'for their insurer'. What does that tell you?"
        options={[
          'The documentation reached somebody who did not pass it on, or was never issued',
          'The client has lost them, which is not your concern',
          'The insurer is being difficult',
          'Nothing — this is a normal request',
        ]}
        correctIndex={0}
        explanation="It is a documentation finding either way. Whether it was never issued or issued to the wrong person, the fix is the same: know who receives it and confirm that they have it."
      />

      <SectionRule />

      <ContentEyebrow>Closing the loop</ContentEyebrow>

      <ConceptBlock title="Closing the loop back to 1.7">
        <p>
          This is the last criterion in the unit, and nearly everything it finds points back to the
          first outcome. A rushed certification traces to time that was never in the programme. A
          missed demonstration traces to nobody identifying who needed it. Chased documents trace to
          information that was not gathered until the last afternoon.
        </p>
        <p>
          That is the loop unit 304 is built around, and it is the thing worth taking from the whole
          unit: handover problems are almost never handover problems. They are planning problems
          that stayed invisible until the last day, when there was no longer any time to absorb
          them.
        </p>
      </ConceptBlock>

      <Scenario
        title="A good handover and a bad fortnight"
        situation={
          <>
            A new office fit-out in Cardiff handed over on the Friday as planned. Certificate issued
            to the fit-out contractor who commissioned the work, schedules complete, building clean,
            everyone satisfied. Over the next three weeks: the tenant&rsquo;s facilities manager
            rings twice about the lighting control, once about which way the isolator should sit,
            and finally asks for a copy of the certificate, which the fit-out contractor has not
            passed on.
          </>
        }
        whatToDo={
          <>
            Nothing here is a fault and all of it was avoidable. The demonstration went to the
            contractor rather than to the people who would use the building, and the certification
            reached the person who ordered the work — correctly — but nobody checked that it
            travelled on to the end user. Two findings, both about routing rather than content.
          </>
        }
        whyItMatters={
          <>
            By every measure available on the Friday this was a good handover. The evaluation is
            only possible three weeks later, which is precisely why this criterion should not be
            written on the day the job finishes.
          </>
        }
      />

      <InlineCheck
        id="304-2-6-check-3"
        question="Nothing at all came back in the month after handover. What should the evaluation say?"
        options={[
          'That the handover was satisfactory',
          'What you did that produced that — demonstration to the right people, documents issued and confirmed',
          'Nothing; there is no finding',
          'That the client must not have used the installation',
        ]}
        correctIndex={1}
        explanation="A silent month is a real result and worth understanding. Naming the practices behind it is how you repeat them — and it is a far stronger entry than the bare assertion that it went well."
      />

      <SectionRule />

      <ContentEyebrow>Records and the ideal handover</ContentEyebrow>

      <ConceptBlock title="Keep a copy of everything you issued">
        <p>
          The evaluation is easier and the next two years are easier if you hold your own copy of
          every document that went across: certificate, schedules, marked-up drawings, anything
          handed over.
        </p>
        <p>
          It answers the query that arrives months later about a result or a circuit, it settles
          what was and was not included, and it means a client who has lost their copy costs you a
          minute rather than a visit. On a handover that went badly it is also the only reliable
          record of what actually left your hands.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ConceptBlock title="The handover you would want to receive">
        <p>
          A useful test when evaluating: imagine arriving at this installation cold, in two years,
          to fault-find on it. What would you want to find, and does the handover provide it?
        </p>
        <p>
          Usually the answer is a labelled board, a schedule that matches it, a note of anything
          unusual, and some indication of what is behind the plaster. None of that is difficult and
          all of it is decided in the last two days of a job — which is exactly why criterion 1.7
          asks for it to be planned rather than improvised.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ConceptBlock title="Where this unit ends up">
        <p>
          Thirteen criteria, two outcomes, and one idea running through them: the quality of a job
          is decided long before anybody can see it. Resources organised badly show up as lost days.
          Criteria left unstated show up as an unhappy client. Time never allowed for handover shows
          up as a fortnight of callbacks.
        </p>
        <p>
          Outcome 2 exists to make that visible while it is still fresh enough to act on. A job
          evaluated honestly makes the next one better; a job filed unexamined makes the next one
          identical.
        </p>
      </ConceptBlock>

      <FAQ
        items={[
          {
            question: 'How long should I leave it before evaluating the handover?',
            answer:
              'Two to three weeks covers most of it — long enough for operation questions and document requests to surface, short enough that people still remember the job. On a building with a seasonal system, heating or emergency lighting testing for instance, some findings will not appear until the first time it is used in anger, and those are worth capturing whenever they arrive.',
          },
          {
            question: 'The client never got in touch. Is that a good handover or an indifferent client?',
            answer:
              'Usually the former, and you can tell the difference by what you did rather than by their silence. If the demonstration went to the people who operate the installation, the documents were issued and confirmed, and the board is labelled, a quiet month is the expected outcome. If none of those happened, silence is less reassuring and worth a check-in call.',
          },
          {
            question: 'Is a callback that is not a fault still my problem?',
            answer:
              'Commercially it is your time either way, which is reason enough to care. More importantly it is information: two calls about how something works on the same type of job means your handover routine has a gap in it, and the fix is fifteen minutes at the end of the next one rather than an hour of driving afterwards.',
          },
          {
            question: 'How does this criterion get assessed?',
            answer:
              'The knowledge sits with the externally-set questions for the unit. In the professional discussion it tends to arrive as "how did you know the client was happy with the work?" — and there is a large difference between an answer built on what actually came back and an answer built on the fact that nobody complained.',
          },
        ]}
      />

      <KeyTakeaways
        points={[
          'Evaluate a handover on the fortnight after it, not on the day itself.',
          'Sort what came back: genuine faults, operation questions, document requests.',
          'Operation questions are demonstration failures and are the commonest kind.',
          'Ask who was shown, not just whether a demonstration happened.',
          'Certification goes to the person ordering the work, complete with the Appendix 6 guidance for recipients.',
          'On a partial handover, the written boundary is what prevents "live" and "signed off" diverging.',
          'A quiet month is a finding too — name the practices that produced it.',
          'Almost every handover finding traces back to planning in criterion 1.7.',
        ]}
      />

      <ContentEyebrow>Check yourself</ContentEyebrow>
      <Quiz questions={quizQuestions} title="Evaluate the handover" />
    </div>
  );
}
