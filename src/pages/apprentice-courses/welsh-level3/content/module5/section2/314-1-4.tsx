/**
 * Unit 314 · Learning outcome 1 · Criterion 1.4 — How to communicate
 * effectively with relevant people
 *
 * Written deliberately longer than the other pages in this unit: communication
 * is the criterion learners treat as obvious and assessors treat as the one
 * that separates a coordinator from an electrician.
 *
 * CDM grounding: dutyholders must communicate so everyone understands the risks
 * and the controls, and the principal contractor has a duty to consult and
 * engage with workers.
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
    question: 'What should decide how you communicate something?',
    options: [
      'What the communication is for — instruct, inform, request a decision, warn, or record',
      'Whoever is nearest at the time',
      'Whichever is quickest',
      'Company policy on email',
    ],
    correctAnswer: 0,
    explanation:
      'Purpose sets the channel. A warning needs to be immediate; a decision request needs to be written; an instruction needs confirming back.',
  },
  {
    id: 2,
    question: 'Which of these always needs a written record as well as a conversation?',
    options: [
      'Anything that changes cost, a date, or the scope',
      'Anything said to a client',
      'Anything involving more than two people',
      'Anything about health and safety',
    ],
    correctAnswer: 0,
    explanation:
      'Money, dates and scope are what get disputed later, and two honest people remember a conversation differently six weeks on.',
  },
  {
    id: 3,
    question: 'A message to a site manager about a delay works best when it names what?',
    options: [
      'The effect on the work and the date it bites',
      'Who caused it',
      'How long you have been waiting',
      'What you think should happen to the programme',
    ],
    correctAnswer: 0,
    explanation:
      'Effect and date are actionable by somebody with a programme in front of them. Fault is not, and it puts you inside the argument rather than above it.',
  },
  {
    id: 4,
    question: 'How do you check an instruction was understood?',
    options: [
      'Ask the person to tell you what they are going to do',
      'Ask whether they understood',
      'Send it in writing as well',
      'Watch the first few minutes',
    ],
    correctAnswer: 0,
    explanation:
      '"Did you understand?" is a social question with a social answer. Hearing the plan back takes fifteen seconds and tells you the truth.',
  },
  {
    id: 5,
    question: 'Why does CDM place weight on consulting and engaging with workers?',
    options: [
      'Workplaces where workers are consulted about health and safety are safer',
      'Because consultation is a contractual requirement',
      'To share responsibility for accidents',
      'Because unions require it',
    ],
    correctAnswer: 0,
    explanation:
      'The guidance states it directly, and the mechanism is obvious on site — the person doing the work sees the hazard first, and will only say so if saying so is wanted.',
  },
  {
    id: 6,
    question: 'When should bad news be passed on?',
    options: [
      'As soon as you are confident it is real, before you have solved it',
      'Once you have a solution to offer alongside it',
      'At the next scheduled meeting',
      'Only if it cannot be recovered',
    ],
    correctAnswer: 0,
    explanation:
      'Waiting until you have a solution removes everyone else’s chance to offer one — and they may hold the cheap answer you do not know about.',
  },
  {
    id: 7,
    question: 'What is the commonest communication failure on a coordinated site?',
    options: [
      'Something known by one person that never reached the people it affected',
      'People being rude to each other',
      'Too many emails',
      'Meetings running over',
    ],
    correctAnswer: 0,
    explanation:
      'Almost every coordination post-mortem lands here. The information existed; it just never travelled to where it mattered.',
  },
  {
    id: 8,
    question: 'On public-sector work in Wales, what should you check about site documentation?',
    options: [
      'Whether bilingual signage and documentation are a requirement of the contract',
      'That everything is in Welsh',
      'That everything is in English',
      'Nothing — language is never specified',
    ],
    correctAnswer: 0,
    explanation:
      'It can be a contract requirement rather than a general rule, so the answer is in the specification. Assuming either way is the mistake.',
  },
];

export default function Lesson314_1_4() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'Purpose sets the channel. Instruct, inform, request a decision, warn, record — each wants something different.',
          'Anything touching money, a date or the scope gets written down as well as said.',
          'Describe the effect and the date it bites, not whose fault it is. Effects are actionable; fault is not.',
          'Bad news travels early, before you have solved it — somebody else may hold the cheap answer.',
          'The commonest failure is not rudeness or volume. It is something one person knew that never travelled.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Identify the relevant people on a job and what each of them needs from you.',
          'Choose a channel from the purpose — instruct, inform, request a decision, warn, or record.',
          'Write a message about a problem that names the effect and the date rather than the fault.',
          'Confirm that an instruction has been understood, and build a site where problems get reported.',
          'Explain the duty to communicate and to consult and engage with workers under CDM 2015.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>Who needs to know</ContentEyebrow>

      <ConceptBlock
        title="Who counts as a relevant person"
        plainEnglish="Anyone whose work changes because of what you know."
      >
        <p>
          The criterion says &ldquo;relevant people&rdquo; and leaves you to work out who they are.
          On a coordinated job the list is longer than it first looks, and each group wants
          something different from you:
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Your own operatives.</strong> Want the task, the risks, the sequence, and an
            explicit route for &ldquo;this is not as described&rdquo;.
          </li>
          <li>
            <strong>Other trades.</strong> Want your dates, and early warning when they move. They
            do not want your reasoning.
          </li>
          <li>
            <strong>The site manager or principal contractor.</strong> Wants effects on the
            programme, with dates. Give them a decision to make, not a situation to absorb.
          </li>
          <li>
            <strong>The client or end user.</strong> Wants to know about anything affecting cost,
            their date, or their use of the building — and wants it while a choice still exists.
          </li>
          <li>
            <strong>The designer.</strong> Wants queries about intent, and to hear early when the
            building does not match the drawing.
          </li>
          <li>
            <strong>Suppliers.</strong> Want confirmed quantities and dates, and to be told when a
            delivery has to move.
          </li>
        </ul>
        <p>
          A useful habit when something happens: before doing anything else, run the list and ask
          whose work changes because of this. That is your distribution list, and it is nearly
          always two people longer than instinct suggests.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="314-1-4-check-1"
        question="You discover the riser is already full and your sub-main cannot follow the drawing. Who is on the list?"
        options={[
          'The site manager only',
          'Your own team only',
          'Nobody until you have found a new route',
          'The designer, the site manager, your own team, and anyone whose route shares that riser',
        ]}
        correctIndex={3}
        explanation="Four groups, all affected differently — intent, programme, today's work, and a shared resource. Solving it first and telling people afterwards removes everyone else's chance to help."
      />

      <SectionRule />

      <ContentEyebrow>Choosing the channel</ContentEyebrow>

      <ConceptBlock
        title="Let the purpose choose the channel"
        onSite="Ask what this communication is for before deciding how to send it."
      >
        <p>
          Most communication problems on site are channel problems: the right information sent the
          wrong way. Five purposes cover nearly everything, and each has a natural form:
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Instruct.</strong> Face to face, with the person who will do it, confirmed back.
            Written instructions to people who are already on site tend not to be read.
          </li>
          <li>
            <strong>Inform.</strong> Whatever reaches everybody who needs it — a group message, a
            note in the store, a word at the start of the day.
          </li>
          <li>
            <strong>Request a decision.</strong> Written, with the options and a date by which you
            need an answer. A decision requested verbally is a decision nobody made.
          </li>
          <li>
            <strong>Warn.</strong> Immediate and direct, in whatever form is fastest. Never queued
            behind a process.
          </li>
          <li>
            <strong>Record.</strong> Written, dated, and kept where it will be found again — which
            is a different requirement from being sent.
          </li>
        </ul>
        <p>
          The rule that catches most of it: <strong>say it and write it</strong> for anything
          touching money, a date or the scope. The conversation gets it acted on today; the record
          settles what was agreed in six weeks, when two honest people remember it differently.
        </p>
      </ConceptBlock>

      <ConceptBlock title="Writing something that gets acted on">
        <p>
          A message about a problem has three jobs: say what is happening, say what it does, and say
          what you need. Most site messages do the first and stop.
        </p>
        <p>Compare these two, about the same event:</p>
        <ul className="space-y-2 text-white">
          <li>
            &ldquo;The ceiling grid still is not finished in the east wing.&rdquo; — true,
            unactionable, and faintly a complaint.
          </li>
          <li>
            &ldquo;We cannot start first fix in the east wing until the grid is complete. Our window
            closes Friday; after that the team moves to the Caernarfon job and we are back in three
            weeks. Can you let me know by Wednesday whether the grid will be done?&rdquo; — the
            effect, the date it bites, the consequence, and a specific ask.
          </li>
        </ul>
        <p>
          The second also keeps you out of the argument. It is about the programme rather than about
          whether anyone is working hard enough, so a site manager can act on it without anybody
          having to be in the wrong.
        </p>
      </ConceptBlock>

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Solving it first, telling people afterwards"
        whatHappens={
          <>
            Something goes wrong, and the instinct is to arrive with the answer rather than the
            problem — it feels more professional. So two days go into finding a route round it, and
            only then does anyone else hear. Frequently it turns out the builder was opening that
            ceiling anyway, or the designer had already approved an alternative, and the two days
            bought nothing.
          </>
        }
        doInstead={
          <>
            Tell people as soon as you are confident the problem is real, even with no solution
            attached. &ldquo;This has happened, I am looking at options, I will come back by
            Thursday&rdquo; costs you nothing in credibility and gives everyone who might hold the
            cheap answer a chance to offer it.
          </>
        }
      />

      <CommonMistake
        title="Asking for a decision on the way past"
        whatHappens={
          <>
            <p>
              You need an answer on the luminaire type, so you ask the site manager while you are
              both walking to the gate. He says he will look at it. You have raised it, he has
              heard it, and as far as you are concerned the question is with him.
            </p>
            <p>
              Ten days later nothing has been decided, because nothing was ever written down,
              there were no options in front of him and no date attached. A decision requested
              verbally in passing is a decision nobody made, and the delay now looks like it
              belongs to whoever is standing nearest to it.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Match the channel to the purpose. A decision goes in writing, with the options set
              out, what each one does to cost or programme, and the date you need an answer by.
              That is the version somebody can act on between two other jobs.
            </p>
            <p>
              Then chase it against that date rather than waiting to see. If the answer has not
              arrived, the same message goes again saying what happens if it does not come by
              when &mdash; and now the record shows the question was asked in time.
            </p>
          </>
        }
      />

      <SectionRule />

      <ContentEyebrow>Confirming and escalating</ContentEyebrow>

      <ConceptBlock
        title="Confirming that it landed"
        plainEnglish="The question is not whether you said it. It is whether they have it."
      >
        <p>
          Instructions fail silently. Somebody nods, walks away with a different picture in their
          head, and you find out at second fix. The failure is not carelessness on either side —
          it is that &ldquo;did you understand?&rdquo; is a social question and gets a social
          answer, from everybody, regardless of the truth.
        </p>
        <p>
          The alternative takes about fifteen seconds: ask them to tell you what they are going to
          do. Not as a test — as the normal way you hand over a task. Done with everyone it reads as
          thoroughness; done only with the apprentice it reads as doubt.
        </p>
        <p>
          On anything with a sequence or a safety step, that fifteen seconds is where you find the
          gap between what you said and what arrived. The bigger the consequence, the less optional
          it is.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="CDM 2015"
        clause="Regulations 8, 14 and 15 · guidance in HSE L153"
        meaning="Dutyholders must cooperate, coordinate their work and communicate with each other so that everyone understands the risks and the measures being taken to control them. A principal contractor has a duty to consult and engage with workers, and the guidance is explicit that workplaces where workers are consulted and engaged in decisions about health and safety are safer and healthier — consultation being two-way, involving giving information as well as listening to it."
        cite="HSE L153, Managing health and safety in construction"
      />

      <ConceptBlock title="Communication runs upwards too">
        <p>
          Coordinating makes it easy to think of communication as something you do to a site.
          Half of it is the other direction, and it is the half that gives you early warning.
        </p>
        <p>
          The person with their hands on the work sees the problem first: the route that is already
          full, the accessory that will not fit, the floor that is not going back down as planned.
          Whether that reaches you is decided almost entirely by what happened the last three times
          somebody raised something.
        </p>
        <p>
          So the practical work is unglamorous. Say explicitly that stopping and asking is the
          expected response, not an admission. Respond well when somebody does it, because everyone
          finds out how that went by the end of the day. And close the loop — tell them what
          happened as a result, or the next thing goes unreported because raising it appeared to
          achieve nothing.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="314-1-4-check-2"
        question="An operative tells you the containment route is blocked. You sort it out with the builder. What is the last step?"
        options={[
          'Nothing further — it is resolved',
          'Record it in the site diary only',
          'Tell the operative what happened as a result',
          'Thank them at the end of the week',
        ]}
        correctIndex={2}
        explanation="Closing the loop is what makes the next report happen. A problem raised that seems to disappear into silence teaches everyone that raising things achieves nothing."
      />

      <SectionRule />

      <ContentEyebrow>Briefings, and the Welsh language</ContentEyebrow>

      <ConceptBlock
        title="Briefings that people remember"
        onSite="Short, specific to today, and finishing with what to do if it is not as described."
      >
        <p>
          A start-of-day briefing is the cheapest coordination tool there is and the easiest to do
          badly. The version that works is short and about today: what we are doing, who is where,
          what has changed since yesterday, the one or two risks that actually apply here, and what
          to do if something is not as described.
        </p>
        <p>
          The version that does not work is a recitation of general hazards — working at height,
          manual handling, electricity — which is true on every job ever and therefore tells nobody
          anything about this one. People stop listening to a briefing that never contains news,
          and then they are not listening on the day it does.
        </p>
        <p>
          Keep it under five minutes and let it be two on a quiet day. Length is not the signal of
          seriousness; specificity is.
        </p>
      </ConceptBlock>

      <ConceptBlock title="Working in Wales">
        <p>
          Two practical points worth knowing rather than assuming.
        </p>
        <p>
          On public-sector work in Wales — local authority, health board, education — bilingual
          signage and documentation can be a requirement of the contract. It is not a universal
          rule and it is not something to guess at either way: read the specification, and if it is
          silent and the client is a public body, ask.
        </p>
        <p>
          Separately, some of the people on a Welsh site will have Welsh as a first language. That
          rarely affects technical communication, but it is worth the ordinary courtesy of noticing
          — and if a briefing or a safety-critical instruction is not landing, language is one of
          the things to check rather than assume away.
        </p>
      </ConceptBlock>

      <ContentEyebrow>What to record</ContentEyebrow>

      <ConceptBlock title="What to record, and where">
        <p>
          Records are communication with the future, usually with yourself. The useful minimum on a
          coordinated job is small:
        </p>
        <ul className="space-y-2 text-white">
          <li>Instructions received, and from whom.</li>
          <li>Variations agreed, with the figure and the date agreed.</li>
          <li>Delays, with when you knew and who you told.</li>
          <li>Decisions requested, and whether an answer came back.</li>
          <li>Anything raised about safety, and what happened about it.</li>
        </ul>
        <p>
          A line each, dated, in one place. It takes a couple of minutes a day and it answers most
          of unit 304&rsquo;s outcome 2 as a side effect — which is a real argument for doing it,
          because the effort is already paid for.
        </p>
      </ConceptBlock>

      <Scenario
        title="Everybody knew, nobody was told"
        situation={
          <>
            A three-week fit-out above a shop in Swansea. On Tuesday of week one the joiner mentions
            to one of the electricians that the ceiling is coming down a week later than programmed.
            The electrician assumes the supervisor knows, because the joiner seemed to be telling
            everybody. The supervisor plans week two around the original date, orders the second
            delivery for the Monday, and arrives to find no ceiling, no access and a van of
            material with nowhere to go.
          </>
        }
        whatToDo={
          <>
            From Monday it is salvage — re-sequence into the areas that are accessible, hold the
            delivery in the van or take it back, and tell the client that the end date is now at
            risk. The cost is about a day and a half plus the goodwill of a rushed final week.
          </>
        }
        whyItMatters={
          <>
            Nothing was hidden. The information existed on site for six days and never travelled the
            fifteen metres to the person whose plan depended on it, because everyone who held it
            assumed somebody else had passed it on. That is the commonest coordination failure there
            is, and the fix is a habit rather than a system: when you learn something that changes
            somebody else&rsquo;s work, tell them, even if you think they already know.
          </>
        }
      />

      <InlineCheck
        id="314-1-4-check-3"
        question="Which briefing is more likely to be listened to on the fifth day of a job?"
        options={[
          'Two minutes on what changed overnight and the one risk specific to today',
          'The standard list of site hazards, delivered thoroughly',
          'A written brief handed out to be read later',
          'Nothing — everyone knows the job by day five',
        ]}
        correctIndex={0}
        explanation="A briefing that never contains news trains people not to listen, and then they are not listening on the morning it matters. Specific and short beats comprehensive and routine."
      />

      <FAQ
        items={[
          {
            question: 'Is writing everything down not overkill on a small job?',
            answer:
              'The filter keeps it small: money, dates and scope. On a two-day domestic job that might be one message confirming an extra socket and its price. What you are protecting against is not formality but the specific situation where two people who both behaved honestly remember an agreement differently, and that happens on small jobs at least as often as large ones.',
          },
          {
            question: 'What if I raise something and nothing happens?',
            answer:
              'Raise it once more, in writing, to whoever can act — and say what the consequence will be and when. If it still goes nowhere, the record of having raised it matters both for the delay conversation later and, where it is a safety matter, for rather more than that. What you should not do is stop raising things, which is the natural response and the wrong one.',
          },
          {
            question: 'How do I communicate with a trade that does not want to engage?',
            answer:
              'Go through whoever holds the overall programme rather than escalating the personal relationship. Describe the effect on the work with dates attached. Site managers can act on "our window closes Friday" and cannot act on a disagreement between two trades, so giving them the first keeps everybody out of the second.',
          },
          {
            question: 'Does this criterion get assessed on site?',
            answer:
              'Partly. The knowledge sits with the externally-set questions, but the performance side of unit 314 includes instructing operatives clearly and confirming that instructions were understood, evidenced through the employer-set practical project. The professional discussion also tends to probe it — "how did you know the team understood the sequence?" is a straightforward question with a revealing answer.',
          },
        ]}
      />

      <KeyTakeaways
        points={[
          'Run the list when something happens: whose work changes because of this?',
          'Purpose picks the channel — instruct, inform, request a decision, warn, record.',
          'Say it and write it for anything touching money, a date or the scope.',
          'A message that works names the effect and the date, and makes a specific ask.',
          'Tell people bad news before you have solved it; somebody else may hold the cheap answer.',
          'Have people tell you the plan back — "did you understand?" always gets a yes.',
          'Communication runs upwards: make reporting wanted, then close the loop so it keeps happening.',
          'Briefings should be short and about today; a brief with no news teaches people not to listen.',
          'On Welsh public-sector work, check whether bilingual documentation is a contract requirement.',
        ]}
      />

      <ContentEyebrow>Check yourself</ContentEyebrow>
      <Quiz questions={quizQuestions} title="Communicating effectively with relevant people" />
    </div>
  );
}
