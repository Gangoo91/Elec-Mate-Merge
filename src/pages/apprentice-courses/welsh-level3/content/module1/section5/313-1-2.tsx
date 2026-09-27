/**
 * Unit 313 · Learning outcome 1 · Criterion 1.2 — Interpret technical and
 * functional information and data
 *
 * The partner to 1.1. Having found the information, the question is what it
 * actually tells you — and, just as importantly, what it does not.
 *
 * ⚠️ Grounding note as 1.1: this unit is written from the qualification's own
 * criteria plus BS 7671 where it genuinely applies.
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
    question: 'What is the first question to ask of any piece of information?',
    options: [
      'What question was this produced to answer?',
      'Who wrote it?',
      'Is it detailed enough?',
      'Is it current?',
    ],
    correctAnswer: 0,
    explanation:
      'A document answers the question it was made for. Reading an answer to a different question out of it is the commonest interpretation error there is.',
  },
  {
    id: 2,
    question: 'A schedule of test results shows a Zs of 0.68 Ω. What does that alone tell you?',
    options: [
      'What was measured at that point, on that day, by that instrument',
      'That the circuit is compliant',
      'The current condition of the circuit',
      'The design intent',
    ],
    correctAnswer: 0,
    explanation:
      'A measurement is a reading with a date on it. Whether it was satisfactory depends on the comparison you make against it, and whether it is still true depends on what has happened since.',
  },
  {
    id: 3,
    question: 'A condition report codes an observation C3. What does that mean in practice?',
    options: [
      'Improvement recommended — it is not a defect requiring urgent action',
      'The installation is dangerous',
      'The item must be replaced',
      'The report is out of date',
    ],
    correctAnswer: 0,
    explanation:
      'Misreading codes is a common failure, and it runs both ways — treating a C3 as urgent, or explaining away something coded more seriously.',
  },
  {
    id: 4,
    question: 'What should you do when two sources disagree?',
    options: [
      'Establish which is more reliable for this question, and raise the discrepancy',
      'Use the more recent one',
      'Use the more detailed one',
      'Average them',
    ],
    correctAnswer: 0,
    explanation:
      'Recency and detail are weak proxies. The stronger question is which document was actually made to answer the thing you are asking, and somebody needs to know they conflict.',
  },
  {
    id: 5,
    question: 'Interpreting functional information from a user usually means what?',
    options: [
      'Translating a description of symptoms into a technical hypothesis',
      'Taking their explanation of the cause at face value',
      'Ignoring it until you have tested',
      'Writing it down verbatim',
    ],
    correctAnswer: 0,
    explanation:
      '"The lights flicker when the kettle goes on" is an observation worth everything. The user’s theory about why is worth much less, and the two arrive together.',
  },
  {
    id: 6,
    question: 'What is the risk of interpreting a drawing without its revision?',
    options: [
      'You may be reading a superseded design as though it were current',
      'The scale may be wrong',
      'It may be unsigned',
      'There is no risk',
    ],
    correctAnswer: 0,
    explanation:
      'Revision is part of the meaning. The same drawing number can describe two different installations, and nothing on the page tells you which one you are holding.',
  },
  {
    id: 7,
    question: 'Which is a sound conclusion from an absence of information?',
    options: [
      'This is unknown and must be established',
      'It was probably done correctly',
      'It does not exist',
      'The previous contractor omitted it',
    ],
    correctAnswer: 0,
    explanation:
      'Absence of evidence is not evidence. The only safe reading of a gap is that it is a gap, which turns it into something to test rather than something to assume.',
  },
  {
    id: 8,
    question: 'How should you record an interpretation you are not certain of?',
    options: [
      'As an interpretation, with the basis for it and what would confirm it',
      'As a fact, to avoid confusing people',
      'Not at all until it is confirmed',
      'Verbally only',
    ],
    correctAnswer: 0,
    explanation:
      'A recorded interpretation that names its own uncertainty is useful and honest. One dressed up as a fact becomes the basis of somebody else’s decision.',
  },
];

export default function Lesson313_1_2() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'First question of any document: what was it produced to answer?',
          'A measurement is a reading, a date and an instrument — not a verdict.',
          'When sources conflict, ask which was made to answer this question, and tell somebody they conflict.',
          'A user’s observation is gold; a user’s theory about the cause is a hypothesis.',
          'Absence of information means unknown — never "probably fine".',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Ask what question a document was produced to answer before reading anything out of it.',
          'Read measurements, codes and drawings for what they actually state.',
          'Handle conflicting sources by reliability rather than by recency or detail.',
          'Separate a user’s observation from a user’s theory about the cause.',
          'Record an uncertain interpretation as an interpretation.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>What a document is answering</ContentEyebrow>

      <ConceptBlock
        title="Every document answers one question"
        plainEnglish="Find out what it was for before you read anything out of it."
      >
        <p>
          Criterion 1.1 was about finding information. This one is about what it means, and the
          single most useful habit is to establish what the document was produced to answer before
          extracting anything from it.
        </p>
        <p>
          A tender drawing answers &ldquo;what are we asking contractors to price?&rdquo; An
          as-installed drawing answers &ldquo;what did we build?&rdquo; A condition report answers
          &ldquo;what was the state of this installation on that date, against the criteria I was
          applying?&rdquo; A schedule of test results answers &ldquo;what did these instruments read
          at these points on that day?&rdquo;
        </p>
        <p>
          None of them answers &ldquo;what is in this building now and is it safe?&rdquo;, which is
          usually the question people are actually asking. Reading an answer to your question out of
          a document made for a different one is the commonest interpretation error in the trade,
          and it feels exactly like doing research.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="313-1-2-check-1"
        question="You have a tender drawing and you need to know what is installed. What is the honest reading?"
        options={[
          'It tells you what is installed',
          'It tells you what was asked for, not what was built — the difference has to be established',
          'It is worthless for this purpose',
          'It is reliable if the job was completed',
        ]}
        correctIndex={1}
        explanation="Jobs change between tender and completion constantly. The drawing is a good starting point and a poor record, and knowing which it is changes how much weight you put on it."
      />

      <SectionRule />

      <ContentEyebrow>Reading measurements and codes</ContentEyebrow>

      <ConceptBlock
        title="Reading a measurement"
        onSite="A number is a reading, a date and an instrument. On its own it is not a verdict."
      >
        <p>
          Test results are the most-misread data in the trade, because a number looks like a
          conclusion. It is not. Any measurement carries four things with it:
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>What was measured</strong>, and at which point — a reading at the origin and a
            reading at the furthest accessory are different facts.
          </li>
          <li>
            <strong>When</strong>. Installations change; a reading is a snapshot.
          </li>
          <li>
            <strong>With what</strong>, and whether that instrument was in calibration.
          </li>
          <li>
            <strong>Against what</strong>. A value is satisfactory or not only relative to the
            comparison being made, and the comparison is a separate judgement from the reading.
          </li>
        </ul>
        <p>
          So a schedule showing a set of values tells you what was found. Whether it was acceptable,
          and whether it still is, are two further questions — and the schedule answers neither by
          itself.
        </p>
      </ConceptBlock>

      <ConceptBlock title="Reading codes and classifications">
        <p>
          Condition reports carry classification codes, and misreading them runs in both directions.
          Treating an observation coded for improvement as though it demanded urgent action
          oversells the work and unsettles a client. Explaining away something coded more seriously
          is worse and harder to defend.
        </p>
        <p>
          Two habits help. Read the observation, not just the code — the code is a summary and the
          wording carries what was actually seen. And check what the report was assessing: a report
          limited in extent, with parts of the installation inaccessible, is answering a narrower
          question than its front page suggests, and the limitations section is where that is
          recorded.
        </p>
        <p>
          The general point is that a classification is somebody&rsquo;s judgement, recorded in
          shorthand, on a date, against stated criteria and limitations. All four qualifiers belong
          in your reading of it.
        </p>
      </ConceptBlock>

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Reading an absence as an all-clear"
        whatHappens={
          <>
            A previous report does not mention the supply arrangement, so the arrangement is assumed
            to be the usual one. A schedule has no entry for a circuit, so it is assumed not to
            exist. The reasoning feels sound and is inverted — the document is silent, and silence
            is not a statement.
          </>
        }
        doInstead={
          <>
            Treat every gap as an explicit unknown. &ldquo;Not recorded — to be established on
            site&rdquo; is a finding you can act on; &ldquo;presumably standard&rdquo; is an
            assumption that will be discovered at the worst possible moment.
          </>
        }
      />

      <CommonMistake
        title="Adopting the customer&rsquo;s diagnosis along with their description"
        whatHappens={
          <>
            <p>
              The tenant says the RCD trips when it rains and the wiring must be perished. You
              arrive with the answer already chosen, so the testing goes looking for perished
              cable and everything the theory did not mention gets a quick glance at best.
            </p>
            <p>
              Two things go wrong at once. The actual cause is never tested for, because the
              testing was narrowed before it started. And the genuinely valuable half of what the
              tenant said &mdash; that it correlates with rain, which no document would ever have
              told you &mdash; ends up buried under a diagnosis nobody checked.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Split what you are told into two piles as you hear it. The observation is gold: when
              it happens, how often, what else is running. The theory about the cause is a
              hypothesis &mdash; worth hearing, worth not contradicting on the doorstep, and worth
              testing rather than adopting.
            </p>
            <p>
              Then ask for more observation instead of debating the theory. It produces better
              information than an argument does, it keeps your testing wide enough to find the
              real cause, and it goes down far better with somebody who has been living with the
              fault.
            </p>
          </>
        }
      />

      <SectionRule />

      <ContentEyebrow>Conflicts and verbal accounts</ContentEyebrow>

      <ConceptBlock
        title="When two sources disagree"
        plainEnglish="Not the newest, not the most detailed — the one made to answer this question."
      >
        <p>
          Conflicts are routine: a drawing says one thing and a schedule another, a client remembers
          something different from the certificate, two documents from the same firm do not match.
        </p>
        <p>
          The instinct is to take the more recent or the more detailed. Both are weak. The stronger
          question is which document was actually produced to answer the thing you are asking — an
          as-installed record beats a newer tender drawing on what exists, and a test schedule beats
          a client&rsquo;s recollection on what measured what.
        </p>
        <p>
          Then there is a second obligation, and it is the one that makes this a relationships unit:
          somebody needs to be told the sources conflict. Quietly picking the one you believe
          resolves your problem and leaves the discrepancy in place for the next person — who will
          spend the same afternoon on it.
        </p>
      </ConceptBlock>

      <ConceptBlock title="Interpreting what people tell you">
        <p>
          Functional information arrives as description, and it comes bundled with theory. Both
          parts are useful and they are worth very different amounts.
        </p>
        <p>
          <strong>The observation is gold.</strong> &ldquo;The lights flicker when the kettle goes
          on.&rdquo; &ldquo;It trips in heavy rain.&rdquo; &ldquo;Only that one socket gets
          warm.&rdquo; These are things nobody could have got from a document, and they frequently
          point straight at the cause.
        </p>
        <p>
          <strong>The theory is a hypothesis.</strong> &ldquo;It must need a bigger fuse.&rdquo;
          &ldquo;The last electrician wired it wrong.&rdquo; Worth hearing, worth not contradicting
          on the spot, and worth testing rather than adopting.
        </p>
        <p>
          The skill is separating them without appearing to dismiss the person. In practice that
          means asking for more observation — when does it happen, how often, what else is on at the
          time — rather than debating the theory, which is both more productive and much better
          received.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="313-1-2-check-2"
        question="A tenant says 'the RCD trips when it rains, the wiring must be perished'. How do you use that?"
        options={[
          'Take the rain correlation seriously and treat the cause as untested',
          'Accept both parts and plan a rewire',
          'Disregard it as a lay opinion',
          'Test only what the tenant suggested',
        ]}
        correctIndex={0}
        explanation="The correlation is a real and valuable observation that no document would have given you. The diagnosis is a guess, and adopting it narrows your testing before you have started."
      />

      <SectionRule />

      <ContentEyebrow>Revisions, and recording your conclusion</ContentEyebrow>

      <ConceptBlock title="Revision, date and version are part of the meaning">
        <p>
          A drawing without its revision is an incomplete statement. The same drawing number can
          describe two materially different installations, and nothing on the page tells you which
          one you are holding.
        </p>
        <p>
          The same applies to a standard — a requirement read from a superseded edition is a
          confident answer to a question that has moved — and to a manufacturer&rsquo;s
          instructions, where a product code can persist across a design change.
        </p>
        <p>
          It is a small habit with a large payoff: before relying on anything, check what version it
          is and whether a later one exists. Most of the time it takes seconds and changes nothing.
          Occasionally it saves a day of work installed correctly to the wrong information.
        </p>
      </ConceptBlock>

      <ConceptBlock title="Recording what you concluded">
        <p>
          Interpretation is invisible unless you write it down, and it is worth writing down
          precisely because somebody else will build on it.
        </p>
        <p>
          The form that works separates the three things: what the source said, what you concluded,
          and how confident you are. &ldquo;Drawing rev C shows the sub-main via the riser; riser is
          full, so the installed route is probably the external wall — to be confirmed before
          ordering&rdquo; is useful to everyone who reads it. &ldquo;Sub-main runs on the external
          wall&rdquo; reads as a fact, gets relied on, and may be wrong.
        </p>
        <p>
          Naming your own uncertainty is not weakness in a record. It is the difference between
          somebody being able to use your work and somebody having to redo it because they cannot
          tell what was established and what was assumed.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026"
        clause="Foreword"
        meaning="An existing installation's lack of full compliance with the current edition does not necessarily mean that it is unsafe for continued use or that it requires upgrading. When interpreting a previous report or certificate, consider actual safety and risk rather than the edition it was assessed against — an observation recorded years ago was made against the criteria in force at that time."
        cite="BS 7671 Foreword"
      />

      <Scenario
        title="Two drawings, one riser"
        situation={
          <>
            A sub-main replacement in a converted mill in Newtown. The client supplies two drawings:
            a tender drawing showing the sub-main routed through the central riser, and an older
            marked-up print showing it on the external elevation. The tender drawing is five years
            newer and much cleaner, so it is used for the take-off and the cable ordered
            accordingly. On site the riser is full and has been for years; the existing sub-main is
            on the external wall exactly as the old marked-up print shows.
          </>
        }
        whatToDo={
          <>
            The ordered length is wrong and the route needs re-planning — recoverable, at the cost
            of a delivery and some days. The interpretation error was choosing on recency and
            presentation: the scruffy old print was an as-installed record answering &ldquo;what is
            there?&rdquo;, and the newer drawing was a tender document answering &ldquo;what are we
            proposing?&rdquo;
          </>
        }
        whyItMatters={
          <>
            Both documents were honest and neither was wrong. The failure was in reading, not in the
            sources — and the tell was available from the start, because one of them was marked up
            by hand and the other was not.
          </>
        }
      />

      <InlineCheck
        id="313-1-2-check-3"
        question="Which note is more useful to the next person?"
        options={[
          'Sub-main runs externally',
          'Drawings unreliable',
          'Drawing rev C shows the riser route; riser is full, so likely external — confirm before ordering',
          'Route to be determined',
        ]}
        correctIndex={2}
        explanation="It gives the source, the reasoning, the conclusion and the confidence, so the next person can either rely on it or check the one thing that is uncertain. The others are a fact that may be wrong, a complaint, and a gap."
      />

      <SectionRule />

      <ContentEyebrow>Where assumptions enter a job</ContentEyebrow>

      <ConceptBlock title="Interpretation is where assumptions enter a job">
        <p>
          Unit 304 asked you to record the assumptions a programme rests on. This is where most of
          them are born: a drawing read as a record, a silence read as an all-clear, a measurement
          read as a verdict.
        </p>
        <p>
          The link is worth making deliberately. When you finish interpreting a set of information,
          the output is not just conclusions — it is a list of the things you are now assuming.
          Those belong in the plan, where they can be watched, rather than staying in your head
          where they will be discovered.
        </p>
      </ConceptBlock>

      <FAQ
        items={[
          {
            question: 'How do I interpret a report that contradicts what I can see?',
            answer:
              'Start by assuming both are accurate and that something changed between them — that is usually true. Establish when the report was made and what has happened since, because alterations by other people are the commonest explanation. Where it genuinely cannot be reconciled, record what you found and what the report said, and let whoever commissioned both know they disagree.',
          },
          {
            question: 'Is it my place to question a designer’s information?',
            answer:
              'Raising a discrepancy is not questioning their competence — it is telling them something about the building they could not have known from a desk. Designers generally want to hear it, and the framing that works is factual: "the drawing shows the route through the riser; on site the riser is full. How would you like us to proceed?"',
          },
          {
            question: 'What if a client insists their version of events is right?',
            answer:
              'You rarely need to resolve it in the moment. Record what they told you and what you found, and let the evidence settle it — usually testing does, and quickly. Arguing about recollection is unwinnable and damages the relationship this unit is about, where simply establishing the facts and reporting them tends to end the disagreement without anybody having to concede.',
          },
          {
            question: 'How much interpretation should I record on a small job?',
            answer:
              'Anything that somebody else might act on, and anything you are not certain of. On a small job that is often two lines. The test is whether a person arriving cold could tell what you established from what you assumed — if they could not, the record is not doing its job however short it is.',
          },
        ]}
      />

      <KeyTakeaways
        points={[
          'Establish what a document was produced to answer before reading anything out of it.',
          'A measurement carries what, where, when, with what, and against what — it is not a verdict.',
          'Read the observation behind a classification code, and check the report’s stated limitations.',
          'An absence in a document is an unknown, never an all-clear.',
          'When sources conflict, prefer the one made to answer this question — and tell somebody they conflict.',
          'A user’s observation is valuable; their theory about the cause is a hypothesis to test.',
          'Revision and date are part of a document’s meaning.',
          'Record what the source said, what you concluded, and how confident you are — separately.',
        ]}
      />

      <ContentEyebrow>Check yourself</ContentEyebrow>
      <Quiz questions={quizQuestions} title="Interpreting technical and functional information" />
    </div>
  );
}
