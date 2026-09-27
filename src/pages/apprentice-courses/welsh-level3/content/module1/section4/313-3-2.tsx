/**
 * Unit 313 — Electrical installation: customer and client care (26 GLH)
 * Learning outcome 3 — Understand the importance of customer service in relation to
 * installation and/or maintenance activity.
 * Criterion 3.2 — The working requirements and practices of the clients and customers in the
 * working environment where the installation and/or maintenance activity is taking place.
 *
 * Approach: treat the building as a working operation with a rhythm of its own and the
 * electrician as a visitor inside it. Named environments — ward, classroom, shop floor,
 * milking parlour — and the survey questions that surface the client's rules before anything
 * is priced, programmed or switched off.
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
    question:
      'Before planning a shutdown in an occupied building, what should you establish first?',
    options: [
      'The occupier’s rhythm — when it is busy, when it is empty, and what cannot be interrupted',
      'The cheapest hourly rate you can offer for weekend working',
      'Whether the existing installation is more than ten years old',
      'The make and model of every accessory already fitted',
    ],
    correctAnswer: 0,
    explanation: 'The building has a job of its own. Pick the window round that, not your diary.',
  },
  {
    id: 2,
    question: 'A client’s site rules are stricter than your normal working practice. What applies?',
    options: [
      'The client’s rules, provided they are at least as strict as the legal duties you must meet',
      'Your company rules, because your employer wrote them',
      'Whichever set is quicker to follow on the day',
      'Neither — site rules bind only the client’s own employees',
    ],
    correctAnswer: 0,
    explanation: 'You work to the stricter of the two. Their premises, their rules, their call.',
  },
  {
    id: 3,
    question: 'Who decides whether the disruption your work causes is acceptable?',
    options: [
      'The occupier, because they carry the cost of the interruption',
      'The electrician, because they understand the electrical risk',
      'The wholesaler, because they control material lead times',
      'The designer, because they produced the drawings',
    ],
    correctAnswer: 0,
    explanation: 'An hour at the wrong moment can cost more than a full day at the right one.',
  },
  {
    id: 4,
    question: 'Why ask a site contact about their permit-to-work arrangements?',
    options: [
      'To find out what authorisation the client requires before work can start on their premises',
      'To transfer responsibility for electrical safety onto the client',
      'To avoid having to produce a risk assessment of your own',
      'To establish who pays for any damage caused',
    ],
    correctAnswer: 0,
    explanation: 'A permit is the client’s control. It sits alongside your safe system of work.',
  },
  {
    id: 5,
    question:
      'You are working in a primary school in term time. What is the likely access constraint?',
    options: [
      'Safeguarding — signing in, being escorted, and staying separated from pupils',
      'A ban on cordless tools anywhere on the premises',
      'A requirement to hold a gas registration',
      'A rule that all work is done from mobile scaffold towers',
    ],
    correctAnswer: 0,
    explanation: 'Schools control contact with children. Expect sign-in, escorting and screening.',
  },
  {
    id: 6,
    question: 'Why is the survey visit the right time to ask about the client’s working practices?',
    options: [
      'Because the answers change the programme, the price and the method before anything is committed',
      'Because surveys are unpaid so the time costs nothing',
      'Because the client is legally obliged to answer at survey stage',
      'Because the information cannot be obtained once work has started',
    ],
    correctAnswer: 0,
    explanation: 'A restriction found at survey is planning. Found on day one it is an argument.',
  },
  {
    id: 7,
    question: 'A comms room feeds the card terminals across a retail unit. What follows?',
    options: [
      'Its supply must not be lost in trading hours without a plan agreed with the manager',
      'It can be isolated freely because it is not a life safety system',
      'It should be isolated first so the rest of the work is simpler',
      'It is outside the electrician’s scope and needs no discussion',
    ],
    correctAnswer: 0,
    explanation: 'Losing the tills on a Saturday costs real money. Agree how it is handled first.',
  },
  {
    id: 8,
    question: 'What happens commercially if you ignore the client’s working practices?',
    options: [
      'You lose repeat work and referrals even though the installation itself is faultless',
      'Your certification becomes invalid and must be reissued',
      'The client may lawfully withhold the whole contract sum',
      'Your qualification is suspended until you retrain',
    ],
    correctAnswer: 0,
    explanation: 'Clients rebook whoever caused least trouble. Technical quality is assumed.',
  },
];

export default function Lesson313_3_2() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'The building already has a job. Lessons, residents, customers, milking. You are a visitor inside somebody else’s operation.',
          'Find the rhythm before you plan: when it is busy, when it is empty, what cannot be interrupted, who must be told before power goes off.',
          'The client’s rules may be stricter than site norms — sign-in, escorts, no lone working, no photography, their own permit system.',
          'Disruption is measured by the occupier. An hour at the wrong moment is worse than a day at the right one.',
          'Ask “what do I need to know about working here?” at the survey. That question is worth an hour of guessing later.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Explain why the premises have operational requirements of their own, independent of your programme',
          'Identify the access rules, restricted areas and working practices a client may impose on a visiting contractor',
          'Describe how constraints differ across domestic, retail, healthcare, education, industrial and agricultural settings',
          'Gather the right information at survey so the programme and method match the occupier’s rhythm',
          'Explain how the occupier judges disruption, and how misjudging it loses work even when the installation is perfect',
        ]}
        initialVisibleCount={3}
      />

      <SectionRule />

      <ContentEyebrow>The building&rsquo;s own routine</ContentEyebrow>

      <ConceptBlock
        title="The building has a job of its own"
        plainEnglish="Your work interrupts something that was already happening. Understand that something first."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Every premises is an operation.</strong> A school teaches. A care home runs day
            and night. A farm milks twice a day. The electrical work is secondary to all of it.
          </li>
          <li>
            <strong>You are a visitor.</strong> The occupier decides where you go, when, and what
            you may switch off. That is not obstruction. It is them protecting what pays their
            bills.
          </li>
          <li>
            <strong>Your programme is not their programme.</strong> Two days of rewiring is nothing
            to you and a fortnight of lost trade to them, depending which two days you pick.
          </li>
          <li>
            <strong>Shape the work to the building.</strong> Not the other way round. That is the
            whole difference between a contractor who gets rebooked and one who does not.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ConceptBlock
        title="Find the rhythm before you plan"
        plainEnglish="Busy times, quiet times, dead times. Get them before you promise anything."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>When is it busy?</strong> Drop-off and pick-up, the lunch sitting, the Saturday
            shop floor, the morning drugs round, the two milkings. Those are the hours you avoid.
          </li>
          <li>
            <strong>When is it empty?</strong> Half term, a Sunday, the shutdown fortnight. Empty
            hours are worth paying a premium for, because they cost the occupier nothing.
          </li>
          <li>
            <strong>What can never be interrupted?</strong> Nurse call, refrigeration, servers, fire
            alarm and emergency lighting, a bulk milk tank. Each needs a plan, not a hopeful shrug.
          </li>
          <li>
            <strong>Who must be told?</strong> There is always a named person — site manager, ward
            sister, duty manager. Get the name, the mobile number and the notice they expect.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <InlineCheck
        id="313-3-2-check-1"
        question="A client says the premises are 'quiet after four'. What do you do with that?"
        options={[
          'Book all the noisy and disruptive work for after four without further discussion',
          'Assume the building is empty after four and isolate the main switch',
          'Ignore it, because working hours are set by your employer',
          'Confirm what quiet means, who is still on site, and whether working then is actually permitted',
        ]}
        correctIndex={3}
        explanation="Quiet is not empty, and not permitted. Cleaners, security, out-of-hours staff and the intruder alarm all live in that gap."
      />

      <SectionRule />

      <ContentEyebrow>Occupied domestic and retail</ContentEyebrow>

      <ConceptBlock
        title="Occupied domestic work"
        onSite="Somebody lives here. They will still be living here tonight, whatever state you leave it in."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Power off has a household cost.</strong> A full freezer, a home worker on a
            video call, a stairlift, a nebuliser. Ask before you pull the main switch.
          </li>
          <li>
            <strong>Agree the temporary arrangement.</strong> Which sockets stay live, which room
            stays lit, when the heating comes back, whether the fridge gets a temporary supply.
          </li>
          <li>
            <strong>Respect the house.</strong> Dust sheets, boot covers, one room at a time, swept
            before you leave. It costs minutes and it is the entire impression.
          </li>
          <li>
            <strong>Vulnerable occupants change the plan.</strong> Longer notice and shorter outages
            for an elderly resident or anyone who depends on mains power for health.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ConceptBlock
        title="Retail and hospitality — trading hours rule everything"
        onSite="The tills are the priority. Everything else is negotiable."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Trading hours are sacred.</strong> A shop manager will let you in at six in the
            morning and refuse flatly at midday Saturday. Same job, different answer.
          </li>
          <li>
            <strong>Find the loads that make money.</strong> Tills, card terminals, the comms
            cabinet they run through, chillers, display lighting, kitchen extraction.
          </li>
          <li>
            <strong>Customers are present.</strong> Barriers and signage, no trailing leads across a
            shop floor, no steps in a doorway. The public have not been briefed.
          </li>
          <li>
            <strong>Service and deliveries move the window.</strong> A restaurant kitchen at eleven
            is a different place at three. Ask which slot the manager wants you in.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Healthcare, schools and industry</ContentEyebrow>

      <ConceptBlock
        title="Healthcare, care homes and schools — controlled access"
        onSite="Clinical need and safeguarding outrank the programme, every time."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>The ward sister or home manager controls the area.</strong> They say when you
            can be in a bay and which resident must not be disturbed. Take the instruction.
          </li>
          <li>
            <strong>Infection control applies to you.</strong> Hand hygiene, clean tools, dust
            containment, screens round the work, limits on what you bring into a clinical area.
          </li>
          <li>
            <strong>Critical supplies are genuinely critical.</strong> Nurse call, hoists,
            refrigerated medication, emergency lighting. Isolating these is planned and authorised,
            never casual.
          </li>
          <li>
            <strong>Safeguarding governs school access.</strong> Sign in, wear the badge, expect an
            escort, keep separated from pupils. Exams and lessons do not move, so noisy work lands
            in the holidays.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <InlineCheck
        id="313-3-2-check-2"
        question="You need to isolate a sub-board serving part of a care home corridor. Who authorises it?"
        options={[
          'Nobody — it is an electrical decision and yours alone',
          'The client’s insurer, who must approve every isolation',
          'The home manager, after you have explained what loses supply and for how long',
          'Any member of care staff who happens to be nearby',
        ]}
        correctIndex={2}
        explanation="The occupier authorises interruptions to their own operation. Your job is to make the consequences plain enough for a real decision."
      />

      <SectionRule />

      <ConceptBlock
        title="Industrial and commercial — permits and shutdowns"
        onSite="You work when the plant lets you, and you work to their paperwork."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Shutdown windows are booked months ahead.</strong> The line stops for a fixed
            period. Everything happens inside it, or it waits for the next one.
          </li>
          <li>
            <strong>Permit to work is the client&rsquo;s control.</strong> Hot work, confined space,
            work at height, roof access and HV commonly need a signed permit before you lift a tool.
          </li>
          <li>
            <strong>Their isolation procedure may override yours.</strong> Many sites run their own
            lock-off system with their own padlocks and register. Learn it at induction and use it.
          </li>
          <li>
            <strong>Induction is not a formality.</strong> Fire points, muster points, banned areas,
            PPE standards, no-photography zones. Sit through it and you avoid most later arguments.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <RegsCallout
        source="CDM 2015"
        clause="Regulation 17 — Safe places of construction work"
        meaning="There must, so far as is reasonably practicable, be suitable and sufficient safe access to and egress from every place of work; a construction site must be kept safe and without risks to the health of any person at work there; and there must be sufficient working space, arranged so that it is suitable for anyone who is working or likely to work there. In an occupied building those duties run alongside the occupier&rsquo;s own use of the space, which is why their working practices constrain yours."
        cite="HSE L153, Managing health and safety in construction"
      />

      <SectionRule />

      <ContentEyebrow>The client&rsquo;s own rules</ContentEyebrow>

      <ConceptBlock
        title="The client’s rules may be stricter than yours"
        plainEnglish="Where their rule is tighter than yours, their rule wins."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Sign-in and escorting.</strong> Every visitor logged in and out, and accompanied
            in sensitive areas. It is also how they account for everyone if the alarm sounds.
          </li>
          <li>
            <strong>No lone working.</strong> Common in care, custodial and some industrial
            settings. It changes your labour plan, so find out before you price a one-man job.
          </li>
          <li>
            <strong>Photography bans.</strong> Hospitals, schools and many manufacturers forbid
            cameras. Agree in advance how you will record test results and site conditions instead.
          </li>
          <li>
            <strong>Restricted areas and their permits.</strong> Server rooms, drug stores, exam
            halls. A client permit does not replace your risk assessment and method statement — you
            do both.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <InlineCheck
        id="313-3-2-check-3"
        question="At survey a factory engineer says the line runs 24 hours except the first Monday of the month. What is that?"
        options={[
          'The shutdown window your whole programme has to be planned around',
          'Useful background that does not affect the price',
          'A reason to quote for continuous working instead',
          'A matter for the client to resolve after the contract is signed',
        ]}
        correctIndex={0}
        explanation="That one sentence sets the programme, the labour plan and the delivery dates. It is the most important thing said all day."
      />

      <SectionRule />

      <ContentEyebrow>Letting the client judge disruption</ContentEyebrow>

      <ConceptBlock
        title="Ask at the survey — then let them judge the disruption"
        plainEnglish="One open question at the survey, and the occupier scores the inconvenience, not you."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>&ldquo;What do I need to know about working here?&rdquo;</strong> Ask it
            plainly, then stop talking. Occupiers volunteer things you would never think to ask.
          </li>
          <li>
            <strong>Then get specific.</strong> When are you busiest? What must never lose supply?
            Who do I ring at seven in the morning? Where do I park and put the waste?
          </li>
          <li>
            <strong>Offer options, not a decision.</strong> Thursday morning for four hours, or
            Sunday in one go for six. Which hurts you less? Let them choose, and write it into the
            quotation.
          </li>
          <li>
            <strong>Confirm the day before.</strong> A survey three weeks ago guarantees nothing.
            One call catches the delivery, the inspection or the funeral nobody mentioned.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Planning the shutdown around your diary instead of theirs"
        whatHappens={
          <>
            You book a board change for a Tuesday because that is when your labourer is free, and
            tell the client on Monday afternoon. Tuesday turns out to be the big delivery, or the
            clinic. The occupier either refuses on the spot, so you lose the day, or agrees through
            gritted teeth and never calls again.
          </>
        }
        doInstead={
          <>
            Establish the rhythm at survey and put the agreed outage window in the quotation, with
            the notice you will give. Offer two or three windows and let the occupier pick. Confirm
            the choice the day before in a message they can forward to their staff. If your labour
            is not free in the window they choose, that is your problem, not theirs.
          </>
        }
      />

      <CommonMistake
        title="Treating the client&rsquo;s own rules as paperwork you can work round"
        whatHappens={
          <>
            <p>
              The job was priced as one man for a day, because that is how long the work takes. On
              the morning you find that this client does not allow lone working, every visitor is
              signed in and escorted, and cameras are banned anywhere past the door. The escort is
              not available until ten.
            </p>
            <p>
              Half the day goes before a tool comes out, the photographs you were going to use to
              record conditions cannot be taken, and the labour you did not price has to come from
              somewhere. None of it is the client being awkward. It was all knowable at the survey
              and nobody asked.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Ask at survey what their rules are for a visiting contractor: sign-in and escorting,
              lone working, photography, restricted areas and any permit system. Where their rule
              is stricter than normal practice, their rule wins on their premises &mdash; so price
              the time it takes rather than discovering it on the day.
            </p>
            <p>
              Then write it where the rest of the team will see it. Working hours, access
              arrangements, the named contact, the notice period and the restricted areas go on the
              job sheet and into the method statement, because the person who arrives first on
              Monday was not at the survey. And remember their permit sits alongside your risk
              assessment and method statement, never instead of them.
            </p>
          </>
        }
      />

      <SectionRule />

      <Scenario
        title="Dairy distribution board replacement near Whitland, Carmarthenshire"
        situation={
          <>
            You have priced the replacement of a corroded distribution board in the dairy of a
            120-cow farm outside Whitland. It feeds the parlour vacuum pump, the plate cooler, the
            wash system and the bulk tank refrigeration. You allowed a full day and pencilled in a
            Wednesday. On the morning, the farmer tells you milking starts at half five and again at
            half three, the tanker collects at seven tomorrow, and the tank cannot lose
            refrigeration for long with milk in it.
          </>
        }
        whatToDo={
          <>
            Stop and re-plan with the farmer rather than pressing on. Walk the board with him and
            agree which ways can be dead all day, which must be back before the afternoon milking,
            and what happens to the tank — either a temporary supply, or transfer the refrigeration
            way last and energise it first. Fix the deadline out loud: parlour live and tested
            before half three. Say plainly that if it is not finished you will make safe, leave
            everything live and come back after milking. Then hold to it.
          </>
        }
        whyItMatters={
          <>
            A tank of milk from 120 cows is a day&rsquo;s income from the whole herd, and a rejected
            collection can mean the tanker does not tip at all. If the refrigeration fails, no
            amount of neat wiring repairs that. The electrical work was never the hard part here —
            the milking clock was. Farmers talk to farmers, as ward sisters and shop managers talk
            to each other. The contractor who worked round the milking gets the parlour rewire. The
            one who stopped the parlour at half three does not.
          </>
        }
      />

      <SectionRule />

      <FAQ
        items={[
          {
            question:
              'The client will not give me an outage window long enough to finish in one visit. What now?',
            answer:
              'Plan the work in stages that each end with a safe, live, usable installation. Price the extra visits honestly and explain why they exist. Forcing a long outage on an occupier who has said no is how jobs get cancelled on the morning.',
          },
          {
            question: 'Do I have to follow site rules that go beyond what the law requires?',
            answer:
              'On their premises, yes. A client may impose escorting, a no-lone-working rule, a photography ban or their own permit system. Work to the stricter of their rules and your own legal duties, and price the time those rules take.',
          },
          {
            question:
              'What if the occupier’s restrictions make the work unsafe — no room at the board, say?',
            answer:
              'Raise it before you start. Safe access, egress and sufficient working space are duties you cannot trade away to suit a preference. Explain the problem, propose an alternative time or a temporary clearance, and get the agreement in writing.',
          },
          {
            question: 'How do I record all this so the rest of the team knows?',
            answer:
              'Put the working hours, access arrangements, named contact, notice period, restricted areas and agreed outage windows on the job sheet and in the method statement. The apprentice who arrives first on Monday needs what you were told at survey.',
          },
        ]}
      />

      <SectionRule />

      <KeyTakeaways
        points={[
          'The premises have an operation of their own. You are a visitor inside it and your programme is the secondary thing.',
          'Establish the rhythm before you plan: busy times, empty times, what can never be interrupted, and who must be told.',
          'Constraints differ genuinely by setting — occupied domestic, retail trading hours, infection control, safeguarding, shutdown windows.',
          'Where the client’s rules are stricter than normal practice, the client’s rules apply on their premises.',
          'A client permit system sits alongside your own risk assessment and method statement, never instead of them.',
          'Ask “what do I need to know about working here?” at the survey, then write the answers into the quotation.',
          'Disruption is scored by the occupier. An hour at the wrong moment costs far more than a day at the right one.',
          'Getting this wrong loses repeat work and referrals even when the installation, testing and certification are faultless.',
        ]}
      />

      <SectionRule />

      <ContentEyebrow>Check yourself</ContentEyebrow>

      <Quiz questions={quizQuestions} title="3.2 — Working inside the client’s operation" />
    </div>
  );
}
