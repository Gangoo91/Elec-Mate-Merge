/**
 * Unit 302 — Working in The Building Services Engineering Sector in Wales (40 GLH)
 * Learning outcome 2 — Understand how to work effectively with others
 * Criterion 2.2 — How to communicate effectively with clients, employers, colleagues and with other stakeholders.
 *
 * Approach: the act of communicating, not the relationship behind it — who is listening, what the message is for,
 * which channel carries it, and how you prove it landed, applied to site, to the client and to the office.
 * Welsh language is framed as a specification question for the job in hand, never as a general legal rule.
 * 🔴 Never describe this content as EAL-approved, EAL-mapped or endorsed.
 */

import { TLDR } from '@/components/study-centre/learning';
import { ConceptBlock } from '@/components/study-centre/learning';
import { RegsCallout } from '@/components/study-centre/learning';
import { CommonMistake } from '@/components/study-centre/learning';
import { Scenario } from '@/components/study-centre/learning';
import { KeyTakeaways } from '@/components/study-centre/learning';
import { FAQ } from '@/components/study-centre/learning';
import { LearningOutcomes } from '@/components/study-centre/learning';
import { ContentEyebrow } from '@/components/study-centre/learning';
import { SectionRule } from '@/components/study-centre/learning';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';

const quizQuestions = [
  {
    id: 1,
    question: 'A tenant asks why her power was off this morning. Which reply is pitched correctly?',
    options: [
      'We had the supply off for two hours to replace a damaged cable. It is back on and nothing in your flat was affected.',
      'We isolated at the origin to swap a defective sub-main that had a fault-current issue.',
      'Ask the site agent, it is all on the permit.',
      'There was an issue with the installation but it is fine now.',
    ],
    correctAnswer: 0,
    explanation:
      'She needs what happened, how long, and whether it affects her. Trade words answer a question she did not ask.',
  },
  {
    id: 2,
    question:
      'You need the client to choose between two consumer unit positions by Thursday. What do you do?',
    options: [
      'Email both options with the cost difference and a decision needed by Thursday, then ring to say it has gone.',
      'Ask the decorator to pass it on next time the client visits.',
      'Wait until the client turns up on site and ask them there.',
      'Pick the cheaper position and tell them once it is in.',
    ],
    correctAnswer: 0,
    explanation:
      'A decision request needs writing and a date, so there is something to chase. The call is what makes them read it.',
  },
  {
    id: 3,
    question: 'Which version of the same problem is most likely to get it fixed?',
    options: [
      'We cannot start first fix in Block B until the grid ceiling is out, and our window closes Friday.',
      'The ceiling fixers are holding us up again.',
      'Nobody on this job talks to anybody.',
      'It is not our fault, we were ready on Monday.',
    ],
    correctAnswer: 0,
    explanation:
      'The effect gives the agent something to act on. Naming a culprit invites a defence, not a solution.',
  },
  {
    id: 4,
    question:
      'You have just given an apprentice a safe isolation instruction. How do you confirm it landed?',
    options: [
      'Ask them to tell you back what they are going to do, and in what order.',
      'Ask them whether they understand.',
      'Watch them start and then step away.',
      'Send them a text with the same words in it.',
    ],
    correctAnswer: 0,
    explanation:
      'Do you understand reliably produces a yes. Telling it back in their own words shows what they actually heard.',
  },
  {
    id: 5,
    question:
      'A variation on site will add three days and about eight hundred pounds. When does your employer hear it?',
    options: [
      'Straight away, before the client rings them about it.',
      'At the end of the month with the timesheets.',
      'Once you have worked out a way to absorb the delay.',
      'Only if the client complains about it first.',
    ],
    correctAnswer: 0,
    explanation:
      'Anything that will reach the client goes up the line first, or your employer loses the chance to answer well.',
  },
  {
    id: 6,
    question: 'What makes a site email most likely to be read and acted on?',
    options: [
      'One subject, the ask in the first line, and a date.',
      'Every outstanding item on the job gathered into one message.',
      'The full history of the problem first, with the request at the end.',
      'Copying in everybody on the contact list so nobody is missed.',
    ],
    correctAnswer: 0,
    explanation:
      'People skim. If the ask and the date are not in the first two lines, the message becomes background reading.',
  },
  {
    id: 7,
    question:
      'On a public-sector job in Wales, bilingual signage and documentation should be treated as:',
    options: [
      'A question to check in the contract specification for that job.',
      'Always required on every construction site in Wales by law.',
      'Never relevant to electrical work.',
      'Something the main contractor sorts out without telling anyone.',
    ],
    correctAnswer: 0,
    explanation:
      'It can be a contract requirement on public-sector work, so you check the specification rather than assume.',
  },
  {
    id: 8,
    question:
      'An improver tells you a containment route will not work. You are busy. What is the right response?',
    options: [
      'Hear it now or set a definite time to look, then go back and tell them what you did with it.',
      'Tell them to crack on and you will worry about it later.',
      'Explain that the drawing is signed off so it must work.',
      'Ask somebody more experienced to check it instead.',
    ],
    correctAnswer: 0,
    explanation:
      'The one with hands on the work sees it first. Whether the next problem reaches you depends on this one.',
  },
];

export default function Lesson302_2_2() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'Who you are talking to decides the words, not what you are talking about. Jargon aimed at a client is your mistake, not theirs.',
          'Work out what the message is for before you choose how to send it. A decision needs writing and a date; a warning needs to be immediate.',
          'Money, dates and scope get said out loud and confirmed in writing. Every time.',
          'Describe the effect on the work, not the person you blame for it.',
          'Bad news early beats bad news complete — waiting for a fix removes everybody else&rsquo;s chance to offer one.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Pitch the same piece of information three ways for a client, a colleague and your employer',
          'Choose the channel from the purpose — instructing, informing, asking for a decision, warning, recording',
          'Put anything touching money, a date or the scope in writing as well as saying it',
          'Confirm a message has landed instead of assuming it has',
          'Treat Welsh language and bilingual documentation as a specification question on Welsh public-sector work',
        ]}
        initialVisibleCount={3}
      />

      <SectionRule />

      <ContentEyebrow>Pitching the message</ContentEyebrow>

      <ConceptBlock
        title="The audience sets the register, not the subject"
        plainEnglish="One fact leaves your mouth in three different shapes depending on who is receiving it."
      >
        <p className="text-white">
          The sub-main to a plant room is undersized. Same fact, three deliveries. None of them is
          dumbed down — each is aimed, and a client who leaves not knowing what happens next is a
          failure of the speaker.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>To the client.</strong> &ldquo;The cable feeding the plant room is too small for
            the new load. Leave it and it runs hot and keeps tripping. Replacing it is a day and a
            half and I will send the figure today.&rdquo;
          </li>
          <li>
            <strong>To a colleague.</strong> &ldquo;Sub-main is 16 mil, new load will not have it. I
            want 35 in on the same route — can you get the tray checked for capacity before
            Thursday?&rdquo; Shorthand is fine; it is faster.
          </li>
          <li>
            <strong>To your employer.</strong> &ldquo;Extra to contract. Sub-main replacement, day
            and a half, cable and glands on top. Client knows a cost is coming, not the number.
            Price it, or shall I?&rdquo; Commercial first.
          </li>
        </ul>
      </ConceptBlock>

      <ContentEyebrow>Choosing the right channel</ContentEyebrow>

      <ConceptBlock
        title="Purpose picks the channel"
        plainEnglish="Decide what the message is supposed to achieve, then pick how to send it."
      >
        <p className="text-white">
          Most site messages that fail went wrong when somebody chose the wrong pipe for them.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Instructing.</strong> Face to face, then confirmed back to you. Never a text to
            someone already working.
          </li>
          <li>
            <strong>Informing.</strong> Whatever is quickest and reaches everyone who needs it —
            morning briefing, group message, a note on the board by the welfare unit.
          </li>
          <li>
            <strong>Requesting a decision.</strong> In writing, with the options, the cost or time
            difference, and a date you need it by. Anything else and you are still chasing it in a
            fortnight.
          </li>
          <li>
            <strong>Warning.</strong> Immediate and in person if anyone is at risk. Shout first,
            write it up after. A warning that arrives by email tomorrow is not a warning.
          </li>
          <li>
            <strong>Recording.</strong> Written, dated, kept. Results, variations, inductions,
            refusals, what was behind the plasterboard. Recording is communication with the future,
            not with a person.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Say it and write it"
        onSite="If it touches money, a date or the scope of the work, it goes in both."
      >
        <p className="text-white">
          Saying it gets the reaction. Writing it gets the record. Where three firms and a client
          are working from slightly different memories, neither is enough on its own.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Money.</strong> Extras, day works, materials the client asked you to supply,
            anything you have been told to do that is not on the drawing.
          </li>
          <li>
            <strong>Dates.</strong> When you are on, when you are off, when you need an area, when
            you need a decision, when the temporary supply comes out.
          </li>
          <li>
            <strong>Scope.</strong> What you are doing and what you are not. &ldquo;We are not
            making good the plaster&rdquo; belongs in writing at the start, not in an argument at
            handover.
          </li>
          <li>
            <strong>It need not be formal.</strong> Two lines the same afternoon beats a perfect
            letter next week: &ldquo;Following this morning — you have asked for four extra sockets
            in the rear office, price tomorrow.&rdquo;
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="302-2-2-check-1"
        question="A site agent stops you in the corridor and tells you to move six light positions in the main hall. What comes first?"
        options={[
          'Move them and mention it at the next progress meeting',
          'Confirm it back in writing the same day, using the words extra to contract if that is what it is',
          'Refuse to touch them until a formal instruction arrives from the client',
          'Ask your apprentice to note it in the day book',
        ]}
        correctIndex={1}
        explanation="A corridor instruction that changes the scope needs a written confirmation from you the same day. You are not being awkward — you are making sure there is one version of the conversation."
      />

      <SectionRule />

      <ContentEyebrow>Making it land</ContentEyebrow>

      <ConceptBlock
        title="Writing that actually gets read"
        plainEnglish="Site email is skimmed on a phone, standing up, between two other things."
      >
        <p className="text-white">
          A site manager gets well over a hundred emails a week and yours competes with all of them.
          Four habits do most of the work, on a message to the gang as much as an email.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>One subject per message.</strong> Three unrelated asks get one answer and you
            lose the other two.
          </li>
          <li>
            <strong>The ask at the top.</strong> First line says what you want. Background goes
            underneath for whoever needs it.
          </li>
          <li>
            <strong>A date.</strong> &ldquo;As soon as possible&rdquo; is not a date and reads as
            whenever. &ldquo;By 4pm Thursday&rdquo; is a date.
          </li>
          <li>
            <strong>A findable subject line.</strong> &ldquo;Unit 4 — consumer unit position,
            decision needed Thurs&rdquo; can be searched for in six weeks. &ldquo;Quick
            question&rdquo; cannot.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Bad news early: what your employer needs from site"
        onSite="Assume everything reaches the client eventually. Make sure it reaches your employer first."
      >
        <p className="text-white">
          Your employer prices, programmes and answers the client from whatever you tell them.
          Waiting for a fix before you speak removes everybody else&rsquo;s chance to offer one.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Variations.</strong> Anything outside the original scope, the moment you are
            asked, not the moment you finish it.
          </li>
          <li>
            <strong>Delays.</strong> Yours or anyone else&rsquo;s, with the knock-on: two days
            waiting on a builder costs a week if it pushes you past a plastering date.
          </li>
          <li>
            <strong>Problems with the client.</strong> An unhappy client on Tuesday is a phone call.
            One who has already rung the office is a complaint.
          </li>
          <li>
            <strong>Anything safety related.</strong> Near misses, refusals to work, conditions you
            stopped for. These go up immediately and they go in writing.
          </li>
          <li>
            <strong>Report the problem and its state.</strong> &ldquo;The riser will not take both
            containment runs. Two options, I will have them tomorrow, but you need it now in case it
            affects the crane booking.&rdquo;
          </li>
          <li>
            <strong>Do not dress it down.</strong> A &ldquo;slight issue&rdquo; that turns out to be
            a week gets you distrusted on the next job. Say the size of it.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Describe the effect, not the fault"
        plainEnglish="Say what it does to the work. Do not say who you blame for it."
      >
        <p className="text-white">
          Two sentences to the same agent about the same problem. The effect version is the harder
          one — it carries a deadline — but it aims at the problem, not the person.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Fault version.</strong> &ldquo;The ceiling fixers are holding us up
            again.&rdquo; The agent now has an accusation to manage, the fixers get defensive, and
            the ceiling is still there.
          </li>
          <li>
            <strong>Effect version.</strong> &ldquo;We cannot start first fix in Block B until the
            grid is out, and our window closes Friday.&rdquo; A date, a dependency and a cost —
            something to act on.
          </li>
          <li>
            <strong>Why it matters to you.</strong> The fault version puts you inside the argument.
            The effect version leaves you outside it and still working with the fixers next week.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="302-2-2-check-2"
        question="The plasterers have boarded over three back boxes on the first floor. What goes to the site agent?"
        options={[
          'Three back boxes on the first floor are behind board — we need them opened up before second fix starts Monday',
          'The plasterers have covered our boxes again, can you have a word with them',
          'Nothing. Cut them out yourself and say no more about it',
          'A photo of the wall with no text',
        ]}
        correctIndex={0}
        explanation="Location, what has happened, what you need and by when — with no blame in it. That is everything the agent needs in order to give somebody an instruction."
      />

      <SectionRule />

      <ContentEyebrow>Checking the message landed</ContentEyebrow>

      <ConceptBlock
        title="Checking it landed, and hearing what comes back"
        plainEnglish="Asking someone whether they understand almost always produces a yes."
      >
        <p className="text-white">
          &ldquo;Do you understand?&rdquo; asks about the listener&rsquo;s pride, not the message.
          And the improver in the void knows the route is fouled long before it reaches
          anybody&rsquo;s programme.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Have it told back.</strong> &ldquo;Run me through what you are doing
            first&rdquo; takes twenty seconds and shows exactly which part did not go in.
          </li>
          <li>
            <strong>Listen for the order.</strong> People get the steps right and the sequence
            wrong. Safe isolation told back in the wrong order is the entire point of asking.
          </li>
          <li>
            <strong>With a client, use their words.</strong> &ldquo;So you are happy for us to be
            off Friday and back Tuesday?&rdquo; Silence is not agreement and a nod is not a
            decision.
          </li>
          <li>
            <strong>The first problem raised sets the price of the next.</strong> Brush one off and
            the next three stay in the van.
          </li>
          <li>
            <strong>Close the loop.</strong> Go back and say what happened with it, even when the
            answer is no. &ldquo;We are staying on the drawing because of the duct, but you were
            right that it is tight.&rdquo;
          </li>
          <li>
            <strong>Ask early, not at handover.</strong> &ldquo;Anything you hit today that is going
            to bite us tomorrow?&rdquo; at the end of the shift catches most of it.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="CDM 2015"

        clause="Regulations 8, 14 and 15 · guidance in HSE L153"

        meaning="Under CDM 2015, dutyholders must cooperate with each other, coordinate their work, and communicate with each other so that everyone understands the risks and the measures being taken to control them. On a construction site, communicating is a named duty, not a courtesy. A principal contractor also has a duty to consult and engage with workers. The guidance states that workplaces where workers are consulted and engaged in decisions about health and safety are safer and healthier, and that consultation is two-way: it involves giving information as well as listening. That is the formal version of everything on this page — telling people is half of it, hearing what comes back is the other half."

        cite="HSE L153, Managing health and safety in construction"
      />

      <SectionRule />

      <ContentEyebrow>Timing, and language</ContentEyebrow>

      <ConceptBlock
        title="Welsh on a Welsh site"
        onSite="On public-sector work, check the specification before you assume either way."
      >
        <p className="text-white">
          On public-sector contracts in Wales, bilingual signage and documentation can be a contract
          requirement. Treat it as a question about the specification in front of you — not a
          general rule.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Ask at the start.</strong> Find out at pre-start whether bilingual signage,
            notices or client documentation are specified. Finding out after the labels are printed
            is expensive.
          </li>
          <li>
            <strong>People, not just paperwork.</strong> Some colleagues, clients and tenants have
            Welsh as a first language. Nobody expects fluency from you; asking which language suits
            them costs nothing.
          </li>
          <li>
            <strong>If a safety-critical instruction is not landing.</strong> Language is one thing
            to check, alongside noise and PPE muffling your voice. Check it rather than deciding it
            cannot be that.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="302-2-2-check-3"
        question="You have just realised a delivery slip puts the distribution boards a week late. Nobody else knows. When do you tell the office?"
        options={[
          'Once you have found an alternative supplier so you can present a fix with it',
          'At the next progress meeting in five days',
          'Today, with what you know so far and what you are still checking',
          'When the boards fail to arrive on the original date',
        ]}
        correctIndex={2}
        explanation="Every day you hold it is a day somebody else cannot use to resequence, chase the supplier or warn the client. Early and incomplete beats late and tidy."
      />

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Sending the message and calling it communicated"

        whatHappens={
          <>
            The email went at 07:42 with the variation in it. Three weeks later the client says they
            never agreed and the agent says he never saw it. Both may be telling the truth — it was
            buried under a paragraph of background, with no date, under a subject line that said
            &ldquo;Update&rdquo;.
          </>
        }

        doInstead={
          <>
            Sending is not communicating. It finishes when somebody tells you back what they will
            do. A message with no reply is not agreement — it is an open item, and chasing it is
            part of the job, not nagging.
          </>
        }
      />

      <CommonMistake
        title="Giving the client the version you would give a colleague"
        whatHappens={
          <>
            <p>
              You explain it the way you would explain it in the van: the sub-main is 16 mil, it
              will not have the new load, you want 35 in on the same route. The client nods along.
              People nod because they do not want to look slow, and a nod is not a decision.
            </p>
            <p>
              Nothing has actually been agreed. They do not know it means running hot and tripping
              if it is left, they do not know it is a day and a half, and they have no idea a cost
              is coming. When the figure arrives it reads as a surprise charge rather than the
              thing they already said yes to.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Aim the same fact at the person in front of you. For a client that is what is wrong,
              what happens if it is left, how long it takes to put right and when the figure will
              reach them. That is not dumbing it down &mdash; a client who leaves the conversation
              not knowing what happens next is the speaker&rsquo;s failure, not theirs.
            </p>
            <p>
              Then check it landed in their own words: &ldquo;so you are happy for us to replace
              the cable and I will send the figure today?&rdquo; Follow it with two lines in
              writing the same afternoon, because it touches money and a date.
            </p>
          </>
        }
      />

      <Scenario
        title="Bridgend — the tenant, the site agent and the missing Tuesday"

        situation={
          <>
            You are the approved electrician on a twelve-flat refurbishment in Bridgend for a
            housing association, tenants still in the block. The programme gives you Tuesday and
            Wednesday in Flat 7 to rewire the kitchen circuit. On the Monday the joiner has not
            lifted the hall floor and is not back until Thursday. Losing Tuesday costs the plasterer
            on Friday, pushes Flat 8 a week and leaves a two-man gang on half a job for three days —
            roughly nine hundred pounds of labour. The tenant has a letter saying her kitchen is off
            for two days.
          </>
        }

        whatToDo={
          <>
            <p className="text-white">
              Three messages, three shapes, before you leave site on Monday.
            </p>
            <ul className="space-y-2 text-white">
              <li>
                <strong>To the site agent, in person then in writing.</strong> &ldquo;Flat 7 hall
                floor is still down so we cannot pull the kitchen circuit Tuesday. Lifted by 8am
                Tuesday and we hold; Thursday and we lose the plasterer Friday and Flat 8 moves a
                week.&rdquo; No mention of whose fault the floor is.
              </li>
              <li>
                <strong>To your employer, same afternoon.</strong> The commercial version — a likely
                week on Flat 8, about nine hundred pounds of standing time, caused by another trade,
                and the association will hear it from the tenant first unless somebody rings them.
              </li>
              <li>
                <strong>To the tenant, at her door.</strong> &ldquo;The hall floor has to come up
                before we can run the new cable and that is not happening tomorrow. I will know the
                new dates by Tuesday lunchtime and I will knock and tell you. Your power stays on
                until then.&rdquo; Then knock, good news or not.
              </li>
            </ul>
          </>
        }

        whyItMatters={
          <>
            <strong>What bad looks like.</strong> You say nothing Monday, hoping the joiner appears.
            Tuesday you stand around, Thursday the tenant rings the association, and your employer
            hears about a nine hundred pound problem from an annoyed client. The delay was never
            yours. The silence was.
          </>
        }
      />

      <SectionRule />

      <FAQ
        items={[
          {
            question:
              'Is it not rude to confirm a verbal instruction in writing? It looks like I do not trust them.',
            answer:
              'Framed properly it reads as organised, not suspicious — &ldquo;just so we are both working off the same thing&rdquo; covers it. The people who mind are almost always the ones who later say it was never agreed, which is exactly why you write it.',
          },
          {
            question: 'How much detail does a client actually want?',
            answer:
              'Enough to know what is happening, how long it takes, what it affects and what it costs. Detail beyond that is for you and your employer. If they ask something technical, answer in plain words first and offer the detail after.',
          },
          {
            question: 'My employer says not to bother them with small problems. Where is the line?',
            answer:
              'The line is not size, it is reach. Anything that will touch the client, the programme or the price goes up however small it looks. Anything you can settle on site without those three moving is yours to settle.',
          },
          {
            question:
              'What if someone senior communicates badly with me — no information, everything last minute?',
            answer:
              'Do not mirror it. Ask for the specific thing you need, in writing, with a date, and confirm back what you have been told so the gaps become visible. You cannot make them better at it, but you can stop anything landing on you for being unrecorded.',
          },
        ]}
      />

      <KeyTakeaways
        points={[
          'Who is listening decides the words. The same fact is three different sentences for a client, a colleague and your employer.',
          'Work out the purpose first — instruct, inform, ask for a decision, warn, record — and let that pick the channel.',
          'Money, dates and scope get said out loud and confirmed in writing the same day, every time.',
          'Describe the effect on the work rather than naming who you blame, and you stay outside the argument.',
          'Do you understand produces a yes. Having it told back to you produces the truth.',
          'How you take the first problem somebody raises decides whether you hear the next one — closing the loop keeps it open.',
          'Your employer hears about variations, delays, unhappy clients and safety issues before the client does.',
          'On Welsh public-sector work, check the specification for bilingual signage and documentation rather than assuming.',
        ]}
      />

      <SectionRule />

      <ContentEyebrow>Check yourself</ContentEyebrow>

      <Quiz questions={quizQuestions} title="Criterion 2.2 — Communicating effectively on site" />
    </div>
  );
}
