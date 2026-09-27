/**
 * Unit 313 · Learning outcome 2 · Criterion 2.2 — The limits of responsibility
 * of own job role with respect to supplying technical and functional
 * information
 *
 * The criterion about knowing when to stop talking. At Level 3 a learner starts
 * being asked questions they can half-answer, and the professional skill is
 * recognising which of those belong to somebody else.
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
    question: 'Why does a criterion exist about the LIMITS of your role?',
    options: [
      'Because answering beyond what you know or are authorised for creates real problems',
      'To discourage apprentices from speaking to clients',
      'Because information is confidential',
      'To reduce the amount of paperwork',
    ],
    correctAnswer: 0,
    explanation:
      'An answer given confidently gets acted on. Where it was outside your knowledge or your authority, somebody has made a decision on a bad basis.',
  },
  {
    id: 2,
    question: 'A client asks whether their installation "complies". What is the honest position?',
    options: [
      'It depends what you inspected and tested, and a blanket answer is not supportable',
      'Yes, if the work you did complies',
      'No, unless there is a current condition report',
      'That is a question for the designer',
    ],
    correctAnswer: 0,
    explanation:
      'A statement about the whole installation is a statement about things you may not have looked at. Say what you did, what you found, and what you did not cover.',
  },
  {
    id: 3,
    question: 'Which of these is outside a typical installing electrician’s remit?',
    options: [
      'Confirming a design is adequate for a load the client plans to add later',
      'Explaining what you installed',
      'Explaining the test results you took',
      'Describing how the controls work',
    ],
    correctAnswer: 0,
    explanation:
      'A future load is a design question requiring information you do not have. It is a perfectly reasonable question to be asked and not a reasonable one to answer off the cuff.',
  },
  {
    id: 4,
    question: 'What is the right way to decline a question you should not answer?',
    options: [
      'Say what you can answer, name who can answer the rest, and offer to pass it on',
      'Say it is not your job',
      'Give your best guess with a caveat',
      'Change the subject',
    ],
    correctAnswer: 0,
    explanation:
      'A refusal with a route attached is helpful. "I do not know" followed by nothing is what pushes people into asking somebody less careful.',
  },
  {
    id: 5,
    question: 'A best guess with a caveat is risky because?',
    options: [
      'People remember the guess and forget the caveat',
      'It takes too long',
      'It is dishonest',
      'Caveats are not permitted',
    ],
    correctAnswer: 0,
    explanation:
      'The qualifier disappears within a day and the number survives. This is how an off-the-cuff figure ends up in somebody’s budget.',
  },
  {
    id: 6,
    question: 'Who typically owns questions about contractual terms and money?',
    options: [
      'Whoever holds the commercial relationship — not usually the person on the tools',
      'The electrician doing the work',
      'The client',
      'The designer',
    ],
    correctAnswer: 0,
    explanation:
      'Answering on price or liability from site is a common way to commit a firm to something nobody authorised.',
  },
  {
    id: 7,
    question: 'When does your responsibility to inform extend beyond what you were asked?',
    options: [
      'When you find something that affects safety',
      'Never — answer only what is asked',
      'When the client is friendly',
      'When it makes the job look better',
    ],
    correctAnswer: 0,
    explanation:
      'A dangerous condition is reported whether or not anybody asked and whether or not it is within your scope of works.',
  },
  {
    id: 8,
    question: 'What should you do after passing a question on?',
    options: [
      'Tell the person you passed it on, and to whom',
      'Nothing further',
      'Follow up only if they chase',
      'Answer it yourself if the reply is slow',
    ],
    correctAnswer: 0,
    explanation:
      'A question that disappears into silence teaches people not to ask you. Closing the loop takes a sentence.',
  },
];

export default function Lesson313_2_2() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'Two separate limits: what you know, and what you are authorised to say.',
          'Answer what you can, name who owns the rest, and offer to pass it on.',
          'A best guess with a caveat is dangerous — the caveat is forgotten and the number survives.',
          'Money, liability and design intent are the three that most often sit with somebody else.',
          'The exception: anything affecting safety is reported whether or not you were asked.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Recognise the questions that fall outside your knowledge or your authority.',
          'Decline a question in a way that is helpful rather than obstructive.',
          'Explain why a best guess with a caveat is worse than no answer.',
          'Identify the exception — a safety finding is reported regardless of scope.',
          'Close the loop when a question has been passed on.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>Two kinds of limit</ContentEyebrow>

      <ConceptBlock
        title="Two different limits"
        plainEnglish="Things you do not know, and things you are not the one to say."
      >
        <p>
          The criterion says &ldquo;limits of responsibility of own job role&rsquo;, and there are
          two of them. They feel the same in the moment and they are not.
        </p>
        <p>
          <strong>The knowledge limit.</strong> You genuinely do not know. The right answer is
          straightforward and most people manage it.
        </p>
        <p>
          <strong>The authority limit.</strong> You know, or think you do, and it is not yours to
          say. A price, a liability, a decision about the design, a commitment about a date. This is
          the harder one, because you have something to offer and the instinct is to be helpful.
        </p>
        <p>
          At Level 3 you start being asked questions of the second kind — you are visibly the person
          in charge on site, so people ask you things that belong to an estimator, a designer or a
          director. Recognising which is which is the skill this criterion is after.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="313-2-2-check-1"
        question="A client asks what it would cost to add a car charger later. Which limit is that?"
        options={[
          'Authority — you may have a rough idea, and a price is not yours to give',
          'Knowledge — you cannot know',
          'Neither; it is a fair question to answer',
          'Both equally',
        ]}
        correctIndex={0}
        explanation="You could probably produce a number, and that is exactly the danger. A figure from the person on site becomes an expectation, and it will be remembered without the word 'roughly'."
      />

      <SectionRule />

      <ContentEyebrow>Questions to pass on</ContentEyebrow>

      <ConceptBlock
        title="The three that usually are not yours"
        onSite="Money, liability, design intent. Pass all three unless you own them."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Money.</strong> Prices, variations, what something will cost, whether an extra
            is chargeable. Answering from site is how a firm ends up committed to something nobody
            authorised.
          </li>
          <li>
            <strong>Liability.</strong> Who is at fault, whether something is covered, whether
            previous work was negligent. Opinions here get repeated and sometimes end up in
            correspondence with your name on them.
          </li>
          <li>
            <strong>Design intent.</strong> Why something was specified, whether an alternative
            would do, whether the installation will support a future load. These need information
            the designer has and you do not.
          </li>
        </ul>
        <p>
          A fourth, more specific to this trade:{' '}
          <strong>blanket statements about compliance</strong>. &ldquo;Is my installation
          safe?&rdquo; is a reasonable thing for a client to ask and a poor thing to answer in
          general terms. You can say what you inspected, what you tested and what you found. A
          statement about the whole installation is a statement about things you have not looked at.
        </p>
      </ConceptBlock>

      <ConceptBlock title="Declining well">
        <p>
          A limit is only a problem if it is delivered badly. &ldquo;Not my job&rdquo; is accurate
          and unhelpful, and it pushes people towards asking somebody less careful — which is the
          outcome this criterion exists to prevent.
        </p>
        <p>The form that works has three parts and takes about fifteen seconds:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Answer the part you can.</strong> There is almost always something — what you
            installed, what you found, what happens next.
          </li>
          <li>
            <strong>Name who owns the rest.</strong> Not &ldquo;somebody else&rdquo; but the
            designer, the office, the contract administrator.
          </li>
          <li>
            <strong>Offer to pass it on.</strong> Which converts a refusal into a service and means
            the question actually gets answered.
          </li>
        </ul>
        <p>
          Done this way a limit reads as professionalism. Most clients find somebody who says
          &ldquo;that one is a design question, I will get it to them today&rdquo; more reassuring
          than somebody who answers everything instantly.
        </p>
      </ConceptBlock>

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="The helpful ballpark"
        whatHappens={
          <>
            &ldquo;Roughly a grand, but don&rsquo;t hold me to that.&rdquo; Two weeks later the
            client has a budget of a thousand pounds, the estimator produces a real figure of
            eighteen hundred, and somebody is now having a conversation about why the price went up
            — with your number as the baseline.
          </>
        }
        doInstead={
          <>
            Give no figure at all, and give a route instead: &ldquo;I would not want to guess at
            that and be wrong — let me get the office to price it properly and come back to
            you.&rdquo; It takes the same fifteen seconds and commits nobody.
          </>
        }
      />

      <CommonMistake
        title="Answering &ldquo;is it all safe?&rdquo; about an installation you never looked at"
        whatHappens={
          <>
            <p>
              You have changed a board and tested the circuits you worked on. On the way out the
              client asks whether the rest of the place is alright, and because the bits you saw
              looked reasonable you say yes, it all seems fine. You were in two rooms.
            </p>
            <p>
              That sentence now covers circuits you never tested, a loft you never went into and an
              outbuilding you never opened, and it will be repeated as though you had inspected
              them. If something turns up later, the conversation starts from the fact that the
              electrician said it was fine.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Answer with the scope attached, every time. Say what you inspected, what you tested
              and what you found &mdash; and say plainly that you have not looked at the rest, so
              you cannot tell them anything about it. A statement about the whole installation is a
              statement about things you have not seen.
            </p>
            <p>
              Then give them the route rather than leaving them with nothing. If they want an
              answer about the whole installation, that is a separate piece of work with a
              different scope, and the office can deal with arranging and pricing it.
            </p>
          </>
        }
      />

      <SectionRule />

      <ContentEyebrow>The overriding exception</ContentEyebrow>

      <ConceptBlock
        title="The exception that overrides all of this"
        plainEnglish="Scope does not limit a safety finding."
      >
        <p>
          Everything above is about restraint. There is one situation where the opposite applies: if
          you find something that affects safety, it is reported — whether or not anybody asked,
          whether or not it is inside your scope of works, and whether or not it is convenient.
        </p>
        <p>
          &ldquo;It was not part of our job&rdquo; is not a position anybody wants to be explaining
          afterwards. What you report is what you found, factually, with what you did about it — not
          a diagnosis of the whole installation and not a judgement about whoever installed it.
        </p>
        <p>
          The same applies, more mildly, to anything you notice that will cost the client money or
          trouble later. You are not obliged to survey what you were not engaged for, and mentioning
          what you happened to see is the difference between a contractor and a trusted one.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026"
        clause="Regulation 644.4"
        meaning="The Electrical Installation Certificate is issued by the person or persons responsible for the design, construction and verification of the installation, taking account of their respective responsibilities. Certification is explicitly apportioned — where those roles sit with different people, each signs for their own part, which is the clearest statement in the standard that responsibility has boundaries."
        cite="BS 7671 Part 6 — Inspection and Testing"
      />

      <InlineCheck
        id="313-2-2-check-2"
        question="Lifting a floor for your own work, you find a junction box with no accessible cover on an unrelated circuit. What do you do?"
        options={[
          'Report it — a safety finding is not limited by your scope of works',
          'Nothing; it is outside the job',
          'Fix it without telling anyone',
          'Mention it only if the client asks',
        ]}
        correctIndex={0}
        explanation="Scope limits what you were engaged to do. It does not limit what you say when you find something unsafe, and 'not part of our job' is not a comfortable thing to explain afterwards."
      />

      <SectionRule />

      <ContentEyebrow>Where your certification stops</ContentEyebrow>

      <ConceptBlock title="Knowing where your certification stops">
        <p>
          BS 7671 makes the boundary explicit in one place that is worth noticing. Certification is
          issued by those responsible for the design, construction and verification —{' '}
          <em>taking account of their respective responsibilities</em>. Where those three roles sit
          with different people, each signs for their own part.
        </p>
        <p>
          That is the standard saying, in its own terms, that responsibility is divided and that
          nobody signs for work that was not theirs. It is a useful thing to hold on to when
          somebody asks you to confirm something about a design you did not produce or an
          installation you did not build.
        </p>
      </ConceptBlock>

      <ConceptBlock title="Close the loop">
        <p>
          Passing a question on is only half of it. A question that vanishes into an organisation
          teaches the person who asked that you are not worth asking, and the next thing they need
          they will take somewhere else — or not ask at all, which is worse when it turns out to
          have mattered.
        </p>
        <p>
          Two sentences prevents it: tell them you have passed it on and to whom, and come back when
          there is an answer even if the answer is that it is still being looked at. It costs almost
          nothing and it is most of what people mean when they say a contractor is good to deal
          with.
        </p>
      </ConceptBlock>

      <Scenario
        title="A number that became a budget"
        situation={
          <>
            Second fix on a house extension near Ammanford. The homeowner asks, in passing, what it
            would cost to run power and lighting to a garden office next spring. The electrician,
            being helpful, says it would probably be somewhere around a thousand pounds depending on
            the run. In March the homeowner rings the office to book it, having set aside a thousand
            pounds. The real figure, once the run length, the armoured cable, the excavation and a
            garden distribution arrangement are priced, is nearly double.
          </>
        }
        whatToDo={
          <>
            The conversation is now about a price increase rather than a price, and it starts from a
            position of disappointment nobody created deliberately. Practically it is handled by
            explaining what was not known in the autumn — but the damage to the relationship was
            done by a helpful answer given without the information to support it.
          </>
        }
        whyItMatters={
          <>
            Nothing dishonest happened. The word &ldquo;probably&rdquo; was said and did not survive
            the winter, which is what qualifiers do. This is the authority limit in its most
            ordinary form, and it costs goodwill rather than safety — which is why it is so easy to
            keep doing.
          </>
        }
      />

      <InlineCheck
        id="313-2-2-check-3"
        question="Which response to an out-of-scope question is best?"
        options={[
          'That is not my job',
          'Roughly, I would say — but do not quote me',
          'I will find out and let you know',
          'Here is what I can tell you; the rest is a design question and I will get it to them today',
        ]}
        correctIndex={3}
        explanation="It answers what it can, names the owner, and commits to a route. Promising to find out and come back is nearly right, but it leaves who and when unstated, which is how a passed-on question disappears."
      />

      <SectionRule />

      <ContentEyebrow>Limits change &mdash; keep a record</ContentEyebrow>

      <ConceptBlock title="Limits change as you do">
        <p>
          These boundaries are not fixed for life. An improver&rsquo;s limits are not an approved
          electrician&rsquo;s, and an approved electrician running a job has authority a
          subcontracted pair of hands does not. What stays constant is the need to know where the
          line currently sits.
        </p>
        <p>
          It is worth asking your employer directly rather than inferring it: what can I commit to
          on site, what must come back, and who do I route a design question to? Most people never
          ask, and then discover the boundary by crossing it. Asking takes one conversation and it
          also signals that you are thinking about the job rather than only the work.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ConceptBlock title="Write down what you said">
        <p>
          The information you supply becomes something people act on, which makes it worth a record
          — particularly where you declined to answer something.
        </p>
        <p>
          A line in the diary saying a client asked about adding a car charger and was told it needs
          pricing by the office costs seconds and settles any later question about what was said. It
          also means the request reaches the office as a fact rather than as a half-remembered
          conversation, which is usually how those enquiries get lost.
        </p>
      </ConceptBlock>

      <FAQ
        items={[
          {
            question: 'Does saying "I do not know" make me look incompetent?',
            answer:
              'It reliably does the opposite, provided it comes with a route. Clients have generally met somebody who answered everything instantly and was wrong about some of it. "I would rather find out than guess" is read as care almost universally — what damages credibility is the confident answer that later turns out to be improvised.',
          },
          {
            question: 'I am the most senior person on site. Should I not be able to answer?',
            answer:
              'Being senior on site is about the work, not about every question that arrives with it. A price needs the estimator’s information; a design question needs the designer’s. Knowing which questions need somebody else is part of being senior rather than a gap in it — and nobody expects the person running the installation to also hold the commercial position.',
          },
          {
            question: 'What if the client presses for an answer?',
            answer:
              'Hold the line and shorten the wait. "I could guess and I would rather not be wrong about your money — give me until tomorrow and I will have you a real answer" works almost always. Pressure is usually about wanting certainty soon rather than wanting it now, and offering a date generally satisfies it.',
          },
          {
            question: 'How does this show up in assessment?',
            answer:
              'The knowledge sits with the externally-set questions. It also comes up naturally in the professional discussion, where being asked about a situation you handled will often reveal whether you knew where your remit ended. An example of a question you passed on, and why, is a strong thing to have ready.',
          },
        ]}
      />

      <KeyTakeaways
        points={[
          'Two limits: what you know, and what you are authorised to say. The second is the harder one.',
          'Money, liability and design intent usually belong to somebody else.',
          'Blanket compliance statements cover things you have not looked at — say what you inspected and found.',
          'Decline in three parts: answer what you can, name the owner, offer to pass it on.',
          'A best guess with a caveat loses the caveat and keeps the number.',
          'The exception: a safety finding is reported regardless of scope.',
          'BS 7671 apportions certification by respective responsibilities — the standard divides it too.',
          'Close the loop, or people stop asking you and ask somebody less careful.',
        ]}
      />

      <ContentEyebrow>Check yourself</ContentEyebrow>
      <Quiz questions={quizQuestions} title="The limits of your own role" />
    </div>
  );
}
