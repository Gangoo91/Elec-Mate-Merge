/**
 * Unit 313 — Learning Outcome 2 — Criterion 2.5
 * "The methods for checking that relevant persons have an adequate understanding
 * of the technical and non-technical information provided."
 *
 * Approach: the page is built round one uncomfortable fact — asking someone whether
 * they understand does not tell you whether they understand. Everything after that
 * is the practical alternative: make the person say it back, or show you, and know
 * what it looks like when it has not landed. Client checks and operative checks are
 * taught as two different jobs because on site they are.
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
    question: 'Why is "Do you understand?" a poor check of understanding?',
    options: [
      'It is a social question, so nearly everybody answers yes whether they understand or not',
      'It takes too long to ask on a busy site',
      'It is only allowed in writing, never spoken',
      'It can only be asked of operatives, never clients',
    ],
    correctAnswer: 0,
    explanation:
      'Saying no costs the person something — it can feel like admitting they are slow, or wasting your time. Yes is the cheap answer, so yes is the answer you get. The question tells you about politeness, not comprehension.',
  },
  {
    id: 2,
    question: 'What is teach-back?',
    options: [
      'Asking the person to tell you, in their own words, what they are going to do',
      'Repeating your explanation a second time more slowly',
      'Giving the person a printed copy to read later',
      'Asking a colleague to confirm you explained it properly',
    ],
    correctAnswer: 0,
    explanation:
      'You hand the explanation back to them and listen to what comes out. Their words, not yours. Anything missing or mangled in their version is the bit that did not land, and you fix that bit only.',
  },
  {
    id: 3,
    question: 'A tenant is shown how to reset an RCD. What is the strongest check?',
    options: [
      'Ask them to walk to the board and reset it themselves while you watch',
      'Ask them if they are happy with what you have shown them',
      'Leave a printed sheet taped inside the consumer unit door',
      'Tell them to ring the office if it goes off again',
    ],
    correctAnswer: 0,
    explanation:
      'Demonstration-back. Watching is the only way you learn whether they can find the board, identify the right device and operate it. Everything else is you hoping.',
  },
  {
    id: 4,
    question: 'What are you mainly checking when you hand over to a client?',
    options: [
      'That they can operate the installation and know what to do when something trips or fails',
      'That they can recite the cable sizes you have used',
      'That they agree the price is fair',
      'That they have read every page of the certificate',
    ],
    correctAnswer: 0,
    explanation:
      'A client check is functional. Can they use it, and do they know their next move when it stops working? How it was built is your business and the next electrician’s.',
  },
  {
    id: 5,
    question: 'What are you mainly checking when you brief an operative?',
    options: [
      'That the sequence and the safety step have landed, in order, in their words',
      'That they are enthusiastic about the job',
      'That they have a copy of the drawing in their van',
      'That they have signed the briefing sheet',
    ],
    correctAnswer: 0,
    explanation:
      'An operative is going to act on the information unsupervised. Order matters and the safety step matters. A signature proves attendance, not understanding.',
  },
  {
    id: 6,
    question: 'Which of these is a warning sign that understanding has not landed?',
    options: [
      'The person agrees instantly and adds nothing of their own',
      'The person asks you three follow-up questions',
      'The person repeats the sequence back and gets one step wrong',
      'The person asks you to slow down',
    ],
    correctAnswer: 0,
    explanation:
      'Fast blanket agreement is usually the sound of someone wanting the conversation over. Questions, corrections and requests to slow down are all evidence that the person is actually engaging with it.',
  },
  {
    id: 7,
    question:
      'A customer rings back two days later and there is no fault on the installation. What does that tell you?',
    options: [
      'The handover information did not land, and no proper check was made at the time',
      'The customer is being difficult and should be charged for the visit',
      'The installation needs re-testing in full',
      'The certificate was issued incorrectly',
    ],
    correctAnswer: 0,
    explanation:
      'A no-fault callback is retrospective evidence about your handover. The kit is fine. The explanation was not, and nothing at the time revealed that.',
  },
  {
    id: 8,
    question: 'How do you check that written information has been understood?',
    options: [
      'Ask the person what they will do with it, or point at the one line that matters and ask them to read it back',
      'Ask whether they have received it',
      'Ask them to sign the bottom of the last page',
      'Email it again with the important part in bold',
    ],
    correctAnswer: 0,
    explanation:
      'Receipt is not reading and reading is not understanding. A document is only understood when the person can say what it changes for them.',
  },
];

export default function Lesson313_2_5() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'Handing information over is not the job. Confirming it arrived is the job.',
          '“Do you understand?” is a social question and gets a social answer. It is worth nothing as a check.',
          'Make the person tell it back in their own words, or show you on the actual equipment.',
          'With a client you are checking they can operate it and know what to do when it trips. With an operative you are checking a sequence and a safety step.',
          'Do the check with everybody, every single time, and nobody feels singled out.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Explain why asking someone whether they understand does not tell you whether they understand.',
          'Use teach-back and demonstration-back to check that technical and functional information has landed.',
          'Distinguish what you are checking with a client from what you are checking with an operative.',
          'Recognise the behavioural signs that an explanation has not been understood.',
          'Check understanding of written information, and frame every check so it reads as thoroughness rather than a test.',
        ]}
        initialVisibleCount={3}
      />

      <SectionRule />

      <ContentEyebrow>The question that fails</ContentEyebrow>

      <ConceptBlock
        title="Why the obvious question is the worst one"
        plainEnglish="Asking do you understand tests manners, not knowledge."
      >
        <p>
          You have just spent ten minutes explaining a new consumer unit to a landlord. You finish
          with &ldquo;does that all make sense?&rdquo; and he says yes. You have learned nothing.
        </p>
        <p>
          That question is not a technical question. It is a social one, and it comes with a correct
          social answer already attached. Saying no means admitting, to a tradesperson standing in
          your hallway, that you did not follow something they clearly thought was simple. It also
          means keeping them there longer. Yes is faster, cheaper and less embarrassing, so yes is
          what you get &mdash; from confident people, from nervous people, from people who followed
          every word and from people who stopped listening at the second sentence. The answers are
          identical, which is exactly why the question is useless.
        </p>
        <p>
          The same trap sits in its cousins: &ldquo;all right with that?&rdquo;,
          &ldquo;happy?&rdquo;, &ldquo;any questions?&rdquo;. All of them invite a nod. If the only
          thing standing between you and a callback is a nod, you have not checked anything.
        </p>
      </ConceptBlock>

      <ContentEyebrow>Teach-back and demonstration-back</ContentEyebrow>

      <ConceptBlock
        title="Teach-back: make them say it"
        plainEnglish="Ask the person to tell you what they are going to do, in their words."
        onSite="Frame it as checking yourself, not them: tell me what you have got, so I know I have explained it properly."
      >
        <p>
          Instead of asking whether they understand, ask them to use the information. &ldquo;Before
          I pack up &mdash; if the sockets in the kitchen go dead tonight, talk me through what you
          would do.&rdquo; Now they have to produce something, and what they produce is real data.
        </p>
        <p>
          Listen for their words, not yours. If they can only echo your phrasing back, they have
          memorised a sentence. If they can put it their own way &mdash; &ldquo;go to the box under
          the stairs, find the one that has flicked down, push it back up, and if it drops again
          leave it and ring you&rdquo; &mdash; it has landed.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Ask for an action, not an opinion.</strong> &ldquo;What would you do
            if&hellip;&rdquo; beats &ldquo;is that clear?&rdquo;
          </li>
          <li>
            <strong>Stay quiet while they answer.</strong> Filling their pause with your own words
            destroys the check.
          </li>
          <li>
            <strong>Fix only the gap.</strong> If four steps out of five come back right, re-teach
            the fifth. Do not run the whole speech again.
          </li>
          <li>
            <strong>Own the failure.</strong> &ldquo;I have not explained that bit well&rdquo; keeps
            them talking. &ldquo;No, you have got that wrong&rdquo; shuts them down.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Demonstration-back: make them do it"
        plainEnglish="Where the information is about operating something, watch them operate it."
      >
        <p>
          Words are a weak proxy for a physical task. Somebody can describe resetting an RCD
          perfectly and still stand in front of the board unable to tell which device is which, or
          push the switch the wrong way, or not notice that the main switch is also off.
        </p>
        <p>
          So hand it over physically. Do not point at the board and describe it &mdash; stand back
          and let them walk to it. Watch where they hesitate. Hesitation is the information you came
          for: it tells you precisely which part of your explanation was too thin, and it is
          completely invisible in any verbal check.
        </p>
        <p>
          This applies just as hard to an apprentice. Telling them how to prove a tester
          dead-live-dead and watching them prove a tester dead-live-dead are two different events,
          and only the second one tells you anything.
        </p>
      </ConceptBlock>

      <SectionRule />

      <InlineCheck
        id="313-2-5-check-1"
        question="You have explained isolation arrangements to a site caretaker. Which question actually checks understanding?"
        options={[
          '"Does all of that make sense?"',
          '"If a contractor needs that panel dead next week, what would you do first?"',
          '"Are you happy with the isolation arrangements?"',
          '"Any questions before I go?"',
        ]}
        correctIndex={1}
        explanation="Only the first question forces the caretaker to produce something. The other three can all be answered with a nod, and a nod is not evidence."
      />

      <ContentEyebrow>Different checks for different people</ContentEyebrow>

      <ConceptBlock
        title="A client check and an operative check are different jobs"
        plainEnglish="With a client you check function. With an operative you check sequence and safety."
      >
        <p>
          It is tempting to treat checking understanding as one skill. It is not. What counts as
          &ldquo;adequate understanding&rdquo; depends entirely on what the person is about to do
          with the information.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Client or end user.</strong> Functional information. Can they switch it on, use
            it, and isolate it? Do they know what a tripped device looks like, what to try once, and
            when to stop trying and ring somebody? They do not need to know the cable size or the Zs
            value.
          </li>
          <li>
            <strong>Operative or apprentice.</strong> Technical information. Can they repeat the
            sequence in the right order? Have they got the one step that keeps them alive &mdash;
            the isolation, the lock-off, the proving? Order matters here in a way it does not with a
            client.
          </li>
          <li>
            <strong>Duty holder or facilities manager.</strong> Both, plus obligation. Do they know
            what they now have to arrange, and by when?
          </li>
        </ul>
        <p>
          Get this the wrong way round and you waste everybody&rsquo;s time. Quizzing a ward sister
          on circuit design is noise. Asking an apprentice whether he is &ldquo;happy&rdquo; with a
          live working ban is negligence.
        </p>
      </ConceptBlock>

      <ContentEyebrow>Spotting that it has not landed</ContentEyebrow>

      <ConceptBlock
        title="The tells that it has not landed"
        plainEnglish="People rarely say they are lost. They show it."
      >
        <p>
          You will almost never be told directly. You have to read it. The signals are consistent
          enough to be worth learning by name.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>The repeat, reworded.</strong> They ask you something you have already answered,
            phrased slightly differently. That is not them being slow. That is your answer having
            missed.
          </li>
          <li>
            <strong>The sudden quiet.</strong> Someone who was asking questions stops asking them.
            Understanding usually generates more questions, not fewer. Silence after a complicated
            bit is a red flag, not a green one.
          </li>
          <li>
            <strong>Agreeing too fast.</strong> A yes that arrives before you have finished the
            sentence is about ending the conversation.
          </li>
          <li>
            <strong>Right once, watched.</strong> They do it correctly while you stand there, then
            cannot start it on their own. They were following your body language, not the procedure.
          </li>
          <li>
            <strong>Borrowed words.</strong> They give your exact phrasing back, including a term
            you would bet money they could not define.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Written information needs its own check"
        plainEnglish="Handing over a document proves delivery, not understanding."
      >
        <p>
          Certificates, schedules, manufacturer instructions, operation and maintenance files
          &mdash; most of what you leave behind is paper or a PDF, and paper is where understanding
          goes to die. The client takes it, says thanks, and files it unread in a kitchen drawer.
        </p>
        <p>
          The check for a document is not &ldquo;have you got it?&rdquo; It is one of two questions.
          Either ask what they will do with it &mdash; &ldquo;who needs a copy of that when you sell
          the place?&rdquo; &mdash; or narrow it to the single line that actually changes something
          for them, point at it, and ask them to read it out and tell you what it means for them.
        </p>
        <p>
          One line, out loud, beats twelve pages taken away. If the recommended date for the next
          inspection is the thing that matters, that is the line you point at, and you have then
          genuinely handed something over rather than posted it into a drawer.
        </p>
      </ConceptBlock>

      <SectionRule />

      <RegsCallout
        source="BS 7671"
        clause="Appendix 6 — guidance for recipients"
        meaning="A certificate is not just a record for you and the next electrician. BS 7671 requires certification to be issued complete with the guidance for recipients set out in Appendix 6 — the notes that tell the person receiving it what the document is and what to do with it. That guidance exists precisely because handing over a technical document to a non-technical person does not, on its own, inform them. Issuing it complete is the minimum; walking the recipient to the line that matters is the check."
        cite="BS 7671 requires certification to be issued complete with the guidance for recipients set out in Appendix 6."
      />

      <InlineCheck
        id="313-2-5-check-2"
        question="You hand a landlord an EICR and the accompanying guidance notes. What still needs doing?"
        options={[
          'Point at the observations and the next inspection date and ask him what he now has to arrange',
          'Nothing — the guidance notes explain the document for him',
          'Ask him to sign to confirm he has received it',
          'Email a second copy so there is a record of delivery',
        ]}
        correctIndex={0}
        explanation="Issuing the report complete with its guidance is required, and it is a good document. It is still a document. Until he can tell you what he has to do and when, you have delivered paper rather than information."
      />

      <ContentEyebrow>Tone, and the callback</ContentEyebrow>

      <ConceptBlock
        title="Checking is not testing the person"
        plainEnglish="How you frame the check decides whether it lands as thoroughness or as an insult."
      >
        <p>
          The honest objection to all of this is that it can come across as patronising. Nobody
          wants to be quizzed in their own kitchen, and a time-served electrician being asked to
          repeat a briefing back can quite reasonably bristle.
        </p>
        <p>
          Two things fix that. The first is consistency: you do it with everybody, every time,
          including the ones you would trust with anything. Something done universally reads as a
          process. Something done selectively reads as a judgement on the person in front of you.
        </p>
        <p>
          The second is where you put the fault. Point the check at your own explanation rather than
          their comprehension. &ldquo;Say it back so I know I have not missed anything out&rdquo;
          puts you on the hook, not them. It is also true &mdash; when a teach-back comes back
          wrong, the explanation usually was.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="The callback that is not a fault"
        plainEnglish="A no-fault return visit is proof that a check was never made."
      >
        <p>
          Somebody rings two days later. You drive out. Nothing is wrong with the installation. The
          RCD had tripped and they did not know they could reset it, or the immersion is on a boost
          they were never shown, or they thought the new board had to be left in a particular
          position overnight.
        </p>
        <p>
          That visit is not a fault on the installation. It is a fault in the handover, and it is
          retrospective evidence that no real check took place &mdash; because if you had asked them
          to tell you what they would do when something tripped, this would have surfaced while you
          were standing there with a screwdriver in your hand, and cost you ninety seconds.
        </p>
        <p>
          Treat no-fault callbacks as feedback on your own communication. If the same one keeps
          happening on the same type of job, that is the part of your handover to rebuild.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Treating a signature as evidence of understanding"
        whatHappens={
          <>
            An operative is handed a method statement, signs the briefing sheet and gets on with the
            work. A client signs to acknowledge receipt of the certificate pack. Weeks later
            something goes wrong and it turns out neither of them had taken in the part that
            mattered. The signature proves a piece of paper changed hands at a particular time. It
            says nothing whatsoever about what went in, and everybody involved knows people sign
            things they have not read.
          </>
        }
        doInstead={
          <>
            Keep the signature &mdash; it is a useful record and often contractually required
            &mdash; but never let it stand in for the check. Before the pen comes out, ask for the
            content back: &ldquo;what are the two things on that sheet that change how you work
            today?&rdquo; or &ldquo;which bit of that report needs action first?&rdquo; Sign
            afterwards. The signature then records a conversation rather than a delivery.
          </>
        }
      />

      <CommonMistake
        title="Writing off a no-fault callback as a time-waster"
        whatHappens={
          <>
            <p>
              Two days after a board change somebody rings. You drive out, push a switch back up
              and drive home. Nothing was wrong with the installation, so it goes down as a wasted
              morning and a story for the yard.
            </p>
            <p>
              Then the same call comes in off the next job of that type, and the one after,
              always about the same thing. Every one of them is half a day, and every one of them
              was decided at the door weeks earlier, when a nod got accepted as a check.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Read it as feedback on your handover rather than on the customer. A return visit
              where the installation turns out to be fine is retrospective evidence that no real
              check was made &mdash; asking them to talk you through what they would do when
              something tripped would have surfaced it in ninety seconds, while you still had a
              screwdriver in your hand.
            </p>
            <p>
              Then act on the pattern instead of the incident. Where the same no-fault callback
              keeps arriving from the same kind of job, that is the part of the handover to
              rebuild, and it is usually one sentence: reset it once, and if it goes again leave it
              alone and ring us.
            </p>
          </>
        }
      />

      <InlineCheck
        id="313-2-5-check-3"
        question="An experienced electrician you rate is about to work on a board you have just briefed him on. Why still run a check?"
        options={[
          'Because you check everybody every time, which is what stops any single check feeling like a judgement',
          'Because experienced operatives are the most likely to make mistakes',
          'Because the briefing sheet requires two signatures',
          'Because it transfers responsibility for the work to him',
        ]}
        correctIndex={0}
        explanation="Consistency is what makes the check socially survivable. Skip it for the people you rate and the check becomes a statement about whoever you did not skip it for."
      />

      <Scenario
        title="Rewiring a flat above a shop in Llanelli"
        situation={
          <>
            You have rewired a one-bedroom flat above a takeaway in Llanelli and fitted a new board
            with RCBOs. The tenant is a woman in her seventies who has lived there thirty years and
            has never had anything but rewireable fuses. Her son deals with the letting agent and is
            not there. It is half four on a Friday, the van is loaded, and you have a two-hour
            drive. You run through the board with her at the door, she nods at everything and says
            &ldquo;you know best, love&rdquo;. She is holding the certificate pack in one hand and
            has not looked at it.
          </>
        }
        whatToDo={
          <>
            Put the bag down and take four more minutes. Ask her to walk to the cupboard herself and
            point at which switch feeds the kitchen &mdash; do not point at it for her. Then give
            her a live scenario: &ldquo;the kettle blows and the kitchen sockets go dead. Show me
            what you would do.&rdquo; Watch. If she goes for the main switch, or cannot see which
            device has operated, you have found the gap and you fix that one thing. Tell her the
            rule for stopping: reset once, and if it trips again leave it alone and ring. Then take
            the certificate pack, open it at the observations and next inspection date, and tell her
            which single page her son needs to see. Text him the same two sentences before you pull
            off, so the information exists somewhere other than her memory.
          </>
        }
        whyItMatters={
          <>
            Without the check you get one of two Fridays. Either she rings in a fortnight, you drive
            two hours each way to push a switch back up and you have lost a day&rsquo;s work &mdash;
            or worse, she does not ring, sits in a cold flat over a weekend because the immersion
            circuit tripped, and the agent hears about it before you do. Four minutes at the door
            against a wasted day and a damaged relationship with a letting agent who has fourteen
            other properties. The rewire was never the risky part of that job.
          </>
        }
      />

      <SectionRule />

      <FAQ
        items={[
          {
            question: 'Is teach-back not a bit patronising with an experienced electrician?',
            answer:
              'It is if you only use it on the people you doubt. Do it with everyone, including the ones you would trust with your own house, and point it at your own explanation rather than their ability — “run it back to me so I know I have not left anything out”. Framed that way it reads as a competent handover, which is what it is.',
          },
          {
            question: 'What do I do when the teach-back comes back wrong?',
            answer:
              'Take the blame and re-teach the one gap. “That is my fault, I have skipped a step” keeps them engaged and keeps them honest next time. Never repeat the whole explanation — it signals that the first go was wasted and it buries the bit that actually needed fixing.',
          },
          {
            question: 'The client is not on site at handover. How do I check anything?',
            answer:
              'Check with whoever is there and will actually use it — the caretaker, the site manager, the tenant — and record who that was. Then get a short written summary to the absent client and follow it with a phone call asking what they want to do about the one item that needs action. Their answer is your check. Sending the document alone is not.',
          },
          {
            question: 'Is a signed briefing sheet enough evidence that an operative understood?',
            answer:
              'No. It is evidence the paperwork changed hands. Keep it, because it is a legitimate record, but do the real check before the pen comes out by asking for the sequence and the safety step back in their own words. Then the signature is recording a conversation instead of standing in for one.',
          },
        ]}
      />

      <KeyTakeaways
        points={[
          'Giving information and confirming it arrived are two separate pieces of work. Only the second one protects anybody.',
          '“Do you understand?” is a social question and produces a social answer. It is not a check.',
          'Teach-back: ask the person to tell you what they are going to do, in their own words, and stay quiet while they do it.',
          'Demonstration-back: where the task is physical, watch them do it on the real equipment and read the hesitations.',
          'With a client, check they can operate it and know what to do when it trips. With an operative, check the sequence and the safety step.',
          'Warning signs are behavioural: the reworded repeat, sudden silence, instant agreement, and getting it right only while watched.',
          'Written information needs its own check — ask what they will do with it, or point at the one line that matters.',
          'Check everybody every time. Consistency is what turns a check from an insult into thoroughness.',
        ]}
      />

      <SectionRule />

      <ContentEyebrow>Check yourself</ContentEyebrow>
      <Quiz questions={quizQuestions} title="Checking understanding has landed" />
    </div>
  );
}
