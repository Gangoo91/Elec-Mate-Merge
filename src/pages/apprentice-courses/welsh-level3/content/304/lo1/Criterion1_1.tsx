/**
 * Unit 304 · Learning outcome 1 · Criterion 1.1 — Organise the resources required
 *
 * Welsh Level 3 (Building Services Engineering — Electrotechnical Installation),
 * unit 304 Planning and Evaluating Work in the Building Services Engineering
 * Sector in Wales. 35 GLH, 2 outcomes, 13 criteria.
 *
 * Why this unit is first: the English 2365 route has no unit that corresponds
 * to it, so nothing in the Study Centre covers this ground. Peter Ellis at Grŵp
 * Llandrillo Menai named 304 as "a key part of the Welsh qualification".
 *
 * Regulatory grounding is CDM 2015 as explained in HSE L153 — contractor duties
 * under regulation 15, the construction phase plan under regulation 12, and the
 * client's duty to allow adequate time and resources. Nothing here states a
 * legal duty beyond what L153 says.
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
    question:
      'You are organising resources for a three-week rewire. When is the right time to confirm that your multifunction tester is in calibration?',
    options: [
      'At the planning stage, before the programme is committed',
      'On the morning of the first dead test',
      'When the client asks to see the certificate',
      'At the next annual service, whenever that falls',
    ],
    correctAnswer: 0,
    explanation:
      'Calibration is a resource like any other. Found at the planning stage it costs a phone call; found on the day of testing it costs the test day, and possibly the handover date.',
  },
  {
    id: 2,
    question:
      'On a single-contractor project, who draws up the construction phase plan before the site is set up?',
    options: [
      'The contractor doing the work',
      'The client, in every case',
      'The principal designer',
      'Nobody — a plan is only needed where there is more than one contractor',
    ],
    correctAnswer: 0,
    explanation:
      'Where there is only one contractor, that contractor is responsible for planning the construction phase and drawing up the construction phase plan. The client still has to provide the pre-construction information they hold.',
  },
  {
    id: 3,
    question:
      'A material take-off gives you 412 m of 2.5 mm² twin and earth. Why would you order more than 412 m?',
    options: [
      'To allow for cutting waste, set-out changes and damaged lengths',
      'Because cable is always sold in exact drum lengths',
      'So the surplus can be charged to the client as an extra',
      'To keep the wholesaler’s account active',
    ],
    correctAnswer: 0,
    explanation:
      'A take-off is a measured quantity, not an order quantity. Cutting waste, routes that change on site and the odd damaged length all sit between the two. The allowance is a judgement, and a large one is itself a cost.',
  },
  {
    id: 4,
    question: 'Which of these is NOT a resource you would organise at the planning stage?',
    options: [
      'The snag list',
      'Access equipment and the cards to use it',
      'The information you will work from — drawings, specification, manufacturer instructions',
      'Welfare facilities for the people on site',
    ],
    correctAnswer: 0,
    explanation:
      'A snag list comes out of the work, not into it. Everything else has to be arranged before anyone starts, or the work stops while somebody arranges it.',
  },
  {
    id: 5,
    question:
      'Your programme puts first fix in week two, but the wholesaler quotes a six-week lead time on the distribution board. What is the planning response?',
    options: [
      'Order the board now and re-sequence anything that depends on it',
      'Start first fix and decide what to do when week eight arrives',
      'Substitute whatever board is in stock without telling anyone',
      'Ask the client to extend the programme by six weeks',
    ],
    correctAnswer: 0,
    explanation:
      'Long-lead items are ordered first and the programme is built around them. Substituting a specified board is a change to the design and is not yours to make alone.',
  },
  {
    id: 6,
    question: 'What does organising people as a resource actually mean on a Level 3 job?',
    options: [
      'Matching the competence on site to the work, including who can safely isolate and who can sign',
      'Booking as many bodies as the budget allows',
      'Making sure everyone is on the same rate',
      'Putting the apprentices on the jobs nobody else wants',
    ],
    correctAnswer: 0,
    explanation:
      'Numbers are the easy half. The half that stops work is competence: safe isolation, the cards for the access equipment, and who is entitled to certify what.',
  },
  {
    id: 7,
    question:
      'Why is it poor practice to have every material for a twelve-week job delivered in week one?',
    options: [
      'Storage, damage, theft and cash all get worse the longer material sits on site',
      'Wholesalers will not deliver in bulk',
      'It breaches BS 7671',
      'Material loses its CE or UKCA marking over time',
    ],
    correctAnswer: 0,
    explanation:
      'Material called forward against the programme is material you can protect and pay for in step with the work. A full twelve weeks of stock in a container is a risk sitting on your own site.',
  },
  {
    id: 8,
    question:
      'Which document tells you the risks that could not be designed out, before you plan your work?',
    options: [
      'The pre-construction information',
      'The electrical installation certificate',
      'The health and safety file from a different project',
      'The wholesaler’s delivery note',
    ],
    correctAnswer: 0,
    explanation:
      'Pre-construction information is what the client holds and must provide. It is an input to your planning, and asking for it is part of organising your resources.',
  },
  {
    id: 9,
    question:
      'You are second in a sequence: the plasterer follows your first fix. What does that mean for how you organise resources?',
    options: [
      'Your labour and materials have to be in place for a fixed window, not an average week',
      'It makes no difference — you work at your own pace',
      'The plasterer has to wait however long you take',
      'You should complete second fix before the plasterer starts',
    ],
    correctAnswer: 0,
    explanation:
      'Sequenced work is resourced to a window. Miss it and the follow-on trade either waits, at someone’s cost, or goes ahead and you lose access.',
  },
  {
    id: 10,
    question: 'What is the honest test of whether resources were organised well?',
    options: [
      'Whether work ever stopped waiting for something that could have been arranged earlier',
      'Whether the order value came in under budget',
      'Whether the van was tidy',
      'Whether anyone complained',
    ],
    correctAnswer: 0,
    explanation:
      'Resourcing is invisible when it works. The measure is lost time: every stoppage traced back to something foreseeable is a planning failure, and outcome 2 of this unit asks you to say so.',
  },
];

export default function Criterion1_1() {
  return (
    <div className="space-y-8">
      <LearningOutcomes
        outcomes={[
          'Identify the six kinds of resource a building services job consumes — people, time, materials, plant and access, information, and welfare.',
          'Produce a material take-off from a specification and explain why the order quantity differs from the measured quantity.',
          'Sequence orders against lead times and the programme rather than ordering everything at once.',
          'State the contractor’s duty under CDM 2015 to plan, manage and monitor the work under their control, and where the construction phase plan fits.',
          'Judge your own resourcing by the only measure that counts — whether work stopped waiting for something foreseeable.',
        ]}
        initialVisibleCount={3}
      />

      <TLDR
        points={[
          'Resources are not just materials. People, time, plant and access, information and welfare all have to be arranged before anyone starts.',
          'A take-off is a measured quantity. An order is a take-off plus an allowance, placed against lead times and the programme.',
          'CDM 2015 makes you plan, manage and monitor the work under your control — on a single-contractor job you write the construction phase plan yourself.',
          'Resourcing is judged by lost time. Every stoppage that traces back to something foreseeable is a planning failure, and this unit asks you to own it.',
        ]}
      />

      <ConceptBlock
        title="Six resources, not one"
        plainEnglish="Ask what the job will run out of. Everything on that list is a resource."
      >
        <p>
          Most people hear &ldquo;resources&rdquo; and think of the wholesaler. Materials are the
          most visible resource on a building services job, and the one least likely to stop the
          work — because a van can fetch more. The resources that stop work are the ones you cannot
          fetch at short notice.
        </p>
        <p>There are six worth planning separately:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>People.</strong> Not headcount — competence. Who is competent to isolate, who
            holds the card for the access equipment, who is entitled to sign what. An apprentice and
            an approved electrician are not interchangeable resources.
          </li>
          <li>
            <strong>Time.</strong> Your window in the programme, and where it sits against the other
            trades. Time is the resource you cannot buy more of once it has gone.
          </li>
          <li>
            <strong>Materials.</strong> Quantified from the specification and the drawings, ordered
            against lead times, delivered when there is somewhere to put them.
          </li>
          <li>
            <strong>Plant, tools and access.</strong> Towers, MEWPs, 110 V transformers, and test
            instruments that are in calibration on the day you need them.
          </li>
          <li>
            <strong>Information.</strong> Drawings, specification, manufacturer instructions, the
            pre-construction information the client holds, and BS 7671 itself. Working without it is
            guessing.
          </li>
          <li>
            <strong>Welfare.</strong> Somewhere to wash, eat and use a toilet. On construction work
            this is not a courtesy, and the duty sits with the contractor.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="304-1-1-check-1"
        question="Which resource is most likely to stop a job dead, and hardest to fix on the day?"
        options={[
          'Competence — the person who can do the thing is not there',
          'Twin and earth',
          'Consumables such as screws and glands',
          'Cable ties',
        ]}
        correctIndex={0}
        explanation="You can send someone for cable. You cannot send someone for competence: the ticket, the training and the authorisation all take longer than the day you need them."
      />

      <SectionRule />

      <ConceptBlock
        title="From specification to order"
        onSite="Take off, allow, check the lead time, then order — in that order, every time."
      >
        <p>
          A <strong>take-off</strong> is a measured quantity read off the drawings and the
          specification: so many metres of this cable, so many of that accessory, so many
          terminations. It is arithmetic, and it should be checkable by someone else.
        </p>
        <p>
          An <strong>order</strong> is not the same number. Between the two sits an allowance for
          cutting waste, for routes that change once the building is real rather than drawn, and for
          the occasional damaged length. How big that allowance is comes from experience and from
          the job — a straightforward domestic rewire is not a plant room.
        </p>
        <p>
          The allowance is a judgement with a cost on both sides. Too small and you are back at the
          wholesaler mid-fix, losing half a day. Too large and you have paid for material that ends
          up as offcut, which the next outcome of this unit will ask you to account for.
        </p>
        <p>
          Then check <strong>lead times</strong> before you commit to a programme. Switchgear,
          bespoke boards, specified luminaires and anything with a long supply chain can run to
          weeks. Those are ordered first and the programme is built around them, not the other way
          round.
        </p>
      </ConceptBlock>

      <CommonMistake
        title="Ordering the whole job in week one"
        whatHappens={
          <>
            It feels organised. What it actually does is move every risk onto your own site:
            somewhere to store it, something to protect it from, someone to stop it walking, and
            money spent weeks before the work that earns it. Damaged and missing material found in
            week eight is found too late to be anyone else&rsquo;s problem.
          </>
        }
        doInstead={
          <>
            Call material forward against the programme, in the sequence you will fix it. Order the
            long-lead items early because they have to be, and the rest in step with the work.
          </>
        }
      />

      <SectionRule />

      <ConceptBlock title="Where the law sits in your planning">
        <p>
          Planning work is not only good practice on construction work — a contractor has to do it.
          The Construction (Design and Management) Regulations 2015 put the duty to plan, manage and
          monitor the work under your control on the contractor carrying it out, and that duty is
          proportionate to the job rather than the same on every project.
        </p>
        <p>
          Two things follow for resourcing. The first is the{' '}
          <strong>construction phase plan</strong>: where you are the only contractor, drawing it up
          before the site is set up is your job, not the client&rsquo;s. The second is{' '}
          <strong>pre-construction information</strong> — what the client already knows about the
          building and the risks that were not designed out. Asking for it is part of organising
          your information resource, and planning without it is planning blind.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="CDM 2015"
        clause="Regulation 15 · guidance in HSE L153"
        meaning="A contractor must plan, manage and monitor the construction work they carry out, so far as is reasonably practicable, and must not begin work until the welfare arrangements for their workers are in place. On a project with only one contractor, that contractor is also responsible for drawing up the construction phase plan before the site is set up."
        cite="HSE L153, Managing health and safety in construction"
      />

      <InlineCheck
        id="304-1-1-check-2"
        question="You are the only contractor on a small commercial refit. Who writes the construction phase plan?"
        options={[
          'You do, before the site is set up',
          'The client, because they commissioned the work',
          'The principal designer',
          'No plan is needed on a single-contractor job',
        ]}
        correctIndex={0}
        explanation="With one contractor there is no principal contractor to hand it to. The planning duty and the plan both sit with you, and the client's job is to give you the pre-construction information they hold."
      />

      <SectionRule />

      <ConceptBlock
        title="Resourcing to a window, not to an average"
        onSite="Find out who follows you before you decide how many people you need."
      >
        <p>
          Building services work is almost never standalone. First fix has to be complete before the
          plasterer closes the walls; second fix waits for the decorator. That sequencing turns your
          time resource from &ldquo;about a fortnight&rdquo; into a fixed window with a date at each
          end.
        </p>
        <p>
          Resourcing to a window changes the arithmetic. Two people for ten days and four people for
          five days are the same labour, but only one of them fits between the joiner leaving and
          the plasterer arriving. Get it wrong and either the follow-on trade waits — at
          someone&rsquo;s cost, and it will be argued about later — or they start anyway and you
          lose access to finish.
        </p>
        <p>
          Geography is part of this too. On a rural site in mid or north Wales a next-day delivery
          may not be next day, and a forgotten item is not a twenty-minute round trip. The further
          you are from a counter, the more the planning has to carry.
        </p>
      </ConceptBlock>

      <Scenario
        title="The tester that was not in date"
        situation={
          <>
            A three-week rewire on a village school outside Bala. Everything is planned: two
            electricians, an apprentice, materials called forward weekly, a tower booked for the
            hall. Dead testing is due on the Thursday of week three so the certificate can be issued
            before the school reopens on the Monday. On the Thursday morning the multifunction
            tester&rsquo;s calibration certificate turns out to have expired eleven days earlier.
          </>
        }
        whatToDo={
          <>
            There is no honest way to test and certify on an instrument you cannot show was in
            calibration. The realistic options are all expensive by Thursday: borrow a calibrated
            instrument if anyone nearby has a spare, pay for an emergency turnaround, or tell the
            client the certificate slips past the reopening. At the planning stage, three weeks
            earlier, it was one phone call.
          </>
        }
        whyItMatters={
          <>
            Calibration is a resource with an expiry date, and expiry dates are exactly what
            planning is for. This is the kind of foreseeable stoppage outcome 2 of this unit will
            ask you to evaluate honestly — and &ldquo;the calibration ran out&rdquo; is not bad
            luck, it is a resource nobody checked.
          </>
        }
      />

      <InlineCheck
        id="304-1-1-check-3"
        question="Your first fix window is nine working days between the joiner and the plasterer. You estimate 18 person-days of work. What does that tell you?"
        options={[
          'You need two people on site for the whole window, with no slack for absence',
          'One person for nine days is enough',
          'The window is irrelevant as long as the total hours are right',
          'You should start second fix early to use the time',
        ]}
        correctIndex={0}
        explanation="18 person-days across a 9-day window is two people, flat out, with nothing spare. Worth saying out loud at the planning stage, because one day of sickness puts you into the plasterer's slot."
      />

      <SectionRule />

      <ConceptBlock title="A working checklist">
        <p>
          Before the first day on site, you should be able to answer all of these without looking
          anything up:
        </p>
        <ul className="space-y-2 text-white">
          <li>Who is on site, on which days, and what is each of them competent to do?</li>
          <li>What is my window, and which trade is either side of me?</li>
          <li>
            What have I taken off, what allowance have I added, and what is on order against which
            delivery date?
          </li>
          <li>What has a long lead time, and has it been ordered yet?</li>
          <li>Where will material be stored, and who is responsible for it once it lands?</li>
          <li>
            What plant and access equipment is booked, and does everyone who will use it hold the
            right card?
          </li>
          <li>Are my test instruments in calibration for the dates I will be testing?</li>
          <li>
            What information am I working from — which drawing revision, which specification, and do
            I have the pre-construction information?
          </li>
          <li>What are the welfare arrangements, and are they in place before anyone starts?</li>
        </ul>
        <p>
          Anything you cannot answer is not a detail. It is the thing that will stop the job, and
          you have found it while it is still cheap.
        </p>
      </ConceptBlock>

      <KeyTakeaways
        points={[
          'Six resources, not one: people, time, materials, plant and access, information, welfare.',
          'Competence is a resource with a lead time — you cannot send someone for it on the day.',
          'A take-off is a measured quantity; an order is a take-off plus a judged allowance, placed against lead times.',
          'Long-lead items are ordered first and the programme is built around them.',
          'Call material forward against the programme — a full job in a container in week one is your risk, not the supplier’s.',
          'CDM 2015 puts planning, managing and monitoring on the contractor; on a single-contractor job the construction phase plan is yours to write.',
          'Sequenced work is resourced to a window, not to an average week.',
          'The honest measure of resourcing is lost time that traces back to something foreseeable.',
        ]}
      />

      <FAQ
        items={[
          {
            question: 'How big should a material wastage allowance be?',
            answer:
              'There is no single figure, and anyone who gives you one without asking about the job is guessing. It depends on the work — a straight domestic rewire wastes less than a plant room full of set-out changes — and on how firm the design is. The useful habit is to record what you actually used against what you ordered, job after job, so your allowance comes from your own history rather than a rule of thumb.',
          },
          {
            question: 'Is a construction phase plan really needed on a small job?',
            answer:
              'The duty is proportionate, not absolute in size. What CDM 2015 asks for is a plan appropriate to the work: a short document setting out the risks and how they are controlled is a construction phase plan, and on a small single-contractor job that is what it should look like. A 40-page template copied from a different project is not better evidence, and it is not the point.',
          },
          {
            question: 'What if the client will not give me the pre-construction information?',
            answer:
              'Ask in writing, and say what you need it for. The client has a duty to provide the pre-construction information they hold, and a written request both prompts it and records that you asked. If genuinely nothing exists — common on older domestic property — then say so in your own planning and treat the unknowns as risks to manage rather than pretending they were checked.',
          },
          {
            question: 'Does any of this change because the job is in Wales?',
            answer:
              'CDM 2015 applies across Great Britain, so the planning duties are the same. What can differ is the contract: on public-sector work in Wales, bilingual signage and documentation may be a requirement, so read the specification rather than assuming. Geography matters more in practice than law does — delivery and supply lead times on a rural site are not what they are on a city job, and your planning has to carry that.',
          },
          {
            question: 'How does this criterion get assessed?',
            answer:
              'Unit 304 is knowledge, and it is tested by externally-set multiple-choice questions alongside the rest of the qualification. The practical half of planning shows up separately, in the employer-set practical project — which is why this page teaches the reasoning rather than a form to fill in.',
          },
        ]}
      />

      <ContentEyebrow>Check yourself</ContentEyebrow>
      <Quiz questions={quizQuestions} title="Organise the resources required" />
    </div>
  );
}
