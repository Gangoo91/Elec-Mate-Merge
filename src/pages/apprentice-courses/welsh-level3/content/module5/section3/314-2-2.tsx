/**
 * Unit 314 · Learning outcome 2 · Criterion 2.2 — How to manage the available
 * storage facility at the work site
 *
 * The last criterion of unit 314.
 *
 * ⚠️ GROUNDING NOTE: there is no separate "storage of materials" duty in the
 * CDM corpus. Searches for storage/housekeeping return only Regulation 18's
 * good-order and projecting-nails text. This page therefore grounds storage on
 * Regulation 18(1) (good order, reasonable cleanliness) and Regulation 17
 * (safe access and egress, site kept safe, sufficient working space) — and
 * claims no more than that. Do not let a later pass invent a storage regulation.
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
    question: 'Why is "the available storage facility" phrased that way?',
    options: [
      'Because you manage the space you are given, rather than the space you would like',
      'Because storage is always provided',
      'Because it refers only to lockable containers',
      'Because availability is the client’s responsibility',
    ],
    correctAnswer: 0,
    explanation:
      'Most sites offer a corner, a container shared with two other trades, or a room that is also a route. Managing what exists is the skill being assessed.',
  },
  {
    id: 2,
    question: 'Which CDM duty most directly covers the state of a storage area?',
    options: [
      'Regulation 18 — each part of a site kept in good order and in a reasonable state of cleanliness',
      'Regulation 12 — construction phase plan',
      'Regulation 4 — client arrangements',
      'Regulation 15 — contractor planning',
    ],
    correctAnswer: 0,
    explanation:
      'Good order and reasonable cleanliness is the duty that a chaotic store breaches. There is no separate storage regulation to point at.',
  },
  {
    id: 3,
    question: 'Material stacked across a fire route breaches which requirement most directly?',
    options: [
      'Safe access and egress under Regulation 17',
      'Good order under Regulation 18',
      'The construction phase plan',
      'Manufacturer instructions',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 17 requires suitable and sufficient safe access to and egress from places of work. A blocked route is an access failure before it is a tidiness one.',
  },
  {
    id: 4,
    question: 'What is the first thing to establish about a shared store?',
    options: [
      'Who is responsible for it and what the boundaries are',
      'How big it is',
      'Whether it locks',
      'Who has the key',
    ],
    correctAnswer: 0,
    explanation:
      'A shared space with no owner degrades within days, and every trade blames the others. Responsibility comes before logistics.',
  },
  {
    id: 5,
    question: 'Which material needs protecting from the store itself, not just from theft?',
    options: [
      'Anything that suffers from damp, dust, crushing or being walked on',
      'Only expensive items',
      'Only items in cardboard',
      'Nothing — storage is about security',
    ],
    correctAnswer: 0,
    explanation:
      'Boards stood on end against a wall, drums laid where they are stepped over and accessories at floor level in a damp container all arrive damaged at second fix.',
  },
  {
    id: 6,
    question: 'How does storage relate to criterion 1.1 of unit 304?',
    options: [
      'Calling material forward against the programme is what keeps the store manageable',
      'They are unrelated',
      'It replaces the need for storage',
      'It only applies to long-lead items',
    ],
    correctAnswer: 0,
    explanation:
      'A store is only as good as what is put in it. Twelve weeks of material delivered in week one is a storage problem created at the ordering stage.',
  },
  {
    id: 7,
    question: 'What makes a store usable rather than merely full?',
    options: [
      'You can find what you need and reach it without moving everything else',
      'Everything is inside it',
      'It is locked',
      'It is tidy at the end of each day',
    ],
    correctAnswer: 0,
    explanation:
      'Double handling is the hidden cost of a badly arranged store — paid labour with nothing installed at the end of it.',
  },
  {
    id: 8,
    question: 'Who should be able to find something in the store?',
    options: [
      'Anyone on the team, without asking the person who put it there',
      'The supervisor',
      'Whoever took the delivery',
      'Only the person responsible for the store',
    ],
    correctAnswer: 0,
    explanation:
      'A store that only one person can navigate is a single point of failure, and it fails on the day they are not there.',
  },
];

export default function Lesson314_2_2() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          '"Available" is the operative word — you manage the corner you are given, not an ideal store.',
          'CDM Reg 18: each part of the site kept in good order and in a reasonable state of cleanliness.',
          'CDM Reg 17: safe access and egress, and sufficient working space. A blocked route is an access failure.',
          'Protect material from damp, dust and crushing — the store damages more than thieves do.',
          'A store only one person can navigate fails on the day they are not there.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Manage the storage you are actually given rather than the storage you would choose.',
          'Apply CDM good order and safe access duties to a storage area.',
          'Protect material from the store as well as from theft.',
          'Arrange a store so anyone can find and reach what they need.',
          'Connect storage back to how material was called forward in the first place.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>The site store you inherit</ContentEyebrow>

      <ConceptBlock
        title="You manage what you are given"
        plainEnglish="Nobody hands you the store you would have designed."
      >
        <p>
          The criterion says &ldquo;the available storage facility&rsquo;, and the wording is
          honest about the job. On real sites storage is a shipping container shared with two other
          trades, a room that is also a walking route, a corner of a car park, or a first-floor
          office that will be needed back in week four.
        </p>
        <p>
          So the skill being assessed is not designing a stores system. It is getting the most out
          of a space with the wrong shape, the wrong security and a tenancy that may end before you
          do — and doing it without breaching the duties that apply to any part of a construction
          site.
        </p>
        <p>
          Four questions settle most of it on day one: what have we got, who else is using it, who
          is responsible for it, and how long do we have it for. The fourth is the one nobody asks
          and the one that produces the week-four scramble.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="314-2-2-check-1"
        question="You are given a container shared with the joiners and the plumbers. What is the first thing to sort out?"
        options={[
          'Getting a second padlock fitted',
          'Which shelf you will use',
          'Who is responsible for the space and where the boundaries are',
          'Whether it is weathertight',
        ]}
        correctIndex={2}
        explanation="All three of the others matter and none of them survives a shared space with no owner. Unowned shared storage degrades within days and every trade blames the others."
      />

      <SectionRule />

      <ContentEyebrow>Legal duties, and damage</ContentEyebrow>

      <ConceptBlock
        title="What the law actually says about a store"
        onSite="There is no storage regulation. There is a good order duty and an access duty."
      >
        <p>
          It is worth being precise here, because people reach for a rule that does not exist. CDM
          2015 has no separate regulation about storing materials. What it has are two general
          requirements that apply to every part of a construction site, and a store is part of a
          construction site.
        </p>
        <p>
          <strong>Good order</strong> — each part of a site must, so far as is reasonably
          practicable, be kept in good order, and those parts where construction work is being
          carried out kept in a reasonable state of cleanliness. That is the duty a chaotic store
          breaches, and it is also where the projecting-nails requirement sits: no timber or other
          material with projecting nails is to be used, or left anywhere it could be a danger.
        </p>
        <p>
          <strong>Safe access</strong> — there must be suitable and sufficient safe access to and
          egress from every place of work, the site must be kept safe, and there must be sufficient
          working space arranged to suit the people working there. Material stacked across a route,
          or filling a space somebody has to work in, is an access failure before it is an
          untidiness one.
        </p>
        <p>
          A contractor has to comply with these so far as they affect them or fall within their
          control — which a store you were allocated plainly does.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="CDM 2015"
        clause="Regulations 16, 17 and 18 · Part 4, General requirements for all construction sites"
        meaning="Regulation 18: each part of a construction site must, so far as is reasonably practicable, be kept in good order, and those parts in which construction work is being carried out kept in a reasonable state of cleanliness; no material with projecting nails or similar sharp objects may be used or left where it could be a danger. Regulation 17: there must be suitable and sufficient safe access to and egress from every place of work, the site must be kept safe and without risks to health, and there must be sufficient working space arranged to suit anyone working there. Regulation 16: a contractor must comply with Part 4 so far as it affects them, anyone under their control, or matters within their control."
        cite="HSE L153, Managing health and safety in construction"
      />

      <SectionRule />

      <ConceptBlock title="The store damages more than thieves do">
        <p>
          Security is the first thing people think about and rarely the largest loss. Most material
          that never gets installed was damaged rather than stolen, and usually by the store itself:
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Damp.</strong> A container with no ventilation sweats. Accessories in cardboard
            at floor level come out soft and marked, and enclosures come out spotted.
          </li>
          <li>
            <strong>Dust.</strong> Anything stored near cutting or chasing arrives full of it —
            particularly bad for anything with a seal, a filter or a connector.
          </li>
          <li>
            <strong>Crushing.</strong> Boards leaned against a wall, luminaires under something
            heavier, trunking stacked without support. Distortion that is invisible until it will
            not sit square on the wall.
          </li>
          <li>
            <strong>Being walked on.</strong> The floor of a busy store is not storage, and
            everything at floor level is eventually stood on.
          </li>
          <li>
            <strong>Drums on their side.</strong> Cable pulled from a drum lying flat kinks, and
            drums stored where people step over them get walked on and damaged.
          </li>
        </ul>
        <p>
          Which connects straight to verification: BS 7671 expects enclosures not to be damaged or
          deteriorated in a way that impairs safety, and expects insulation not to be damaged. An
          item damaged in your own store fails that test exactly as surely as one damaged in
          transit, and it is harder to blame anybody else for.
        </p>
      </ConceptBlock>

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Filling it because it is empty"
        whatHappens={
          <>
            A store is allocated and the instinct is to get everything into it — the whole job in
            week one, because then it is safe. What has actually happened is that you have taken
            on the risk for twelve weeks of material: somewhere to keep it, something to protect it
            from, somebody to stop it walking, and money spent long before the work that earns it.
            By week eight some of it is damaged and nobody can reach the things they need.
          </>
        }
        doInstead={
          <>
            Call material forward against the programme, in the sequence you will fix it. A store
            holding two weeks of work is manageable, findable and protectable. This is unit
            304&rsquo;s criterion 1.1 arriving with physical consequences.
          </>
        }
      />

      <CommonMistake
        title="Guarding the store against thieves and not against itself"
        whatHappens={
          <>
            <p>
              The container is padlocked, the valuable items are inside, and nothing has been
              stolen all job. What is also inside is a board leaned against the wall, cartons of
              accessories at floor level, a drum on its side by the door and everything within
              three metres of where the chasing is done.
            </p>
            <p>
              By week five the cartons are soft and marked, the enclosure is spotted, the board
              will not sit square on the wall and the drum has been stepped over so many times it
              is damaged. None of it was taken and a good deal of it can no longer be installed.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Protect material from the store as well as from people. Everything off the floor and
              off the walls, heavy low and supported, fragile above it, long lengths flat and
              supported along their length rather than bowed across two points, and nothing stored
              next to cutting or chasing.
            </p>
            <p>
              Then treat what comes out of the store as material that still has to pass a check.
              An enclosure damaged or deteriorated in your own container fails the same test as one
              damaged in transit, and it is a great deal harder to blame on anybody else.
            </p>
          </>
        }
      />

      <SectionRule />

      <ContentEyebrow>Laying the store out</ContentEyebrow>

      <ConceptBlock
        title="Findable beats tidy"
        onSite="Can somebody who did not unload it find what they need without moving everything?"
      >
        <p>
          A tidy store and a usable store are not the same thing. The test that matters is whether
          somebody who was not there when it was filled can find what they need and reach it
          without shifting everything in front of it.
        </p>
        <p>Three arrangements do most of the work:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>By sequence, not by type.</strong> What is needed next goes nearest the door.
            First fix at the front in week one; second fix at the back until it is not.
          </li>
          <li>
            <strong>Off the floor and off the walls.</strong> Anything on the floor gets stood on;
            anything leaned against a wall falls over or distorts.
          </li>
          <li>
            <strong>Heavy low, fragile high, long flat.</strong> Boards and drums low and supported,
            luminaires and accessories above them, conduit and trunking flat and supported along
            their length rather than bowed across two points.
          </li>
        </ul>
        <p>
          Every failure here costs the same thing — double handling, which is paid labour with
          nothing installed at the end of it, and which is invisible on every invoice.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="314-2-2-check-2"
        question="Second fix accessories are stacked in front of the first fix containment. What has this created?"
        options={[
          'A security problem',
          'Double handling — everything has to move before anyone can work',
          'A fire risk',
          'Nothing, as long as it is all in there',
        ]}
        correctIndex={1}
        explanation="Arranging by sequence rather than by type is what prevents it. The cost is real and never shows up anywhere — it is simply time paid for and not installed."
      />

      <SectionRule />

      <ContentEyebrow>Security and the end date</ContentEyebrow>

      <ConceptBlock title="Security in proportion">
        <p>
          Cable and copper walk, and on some sites so do power tools and anything portable with a
          resale value. Security is worth attention and it is not worth designing the whole store
          around.
        </p>
        <p>
          Proportionate looks like: know what is worth taking and treat it differently, keep
          high-value items out of a shared space, take test instruments and battery tools off site
          rather than trusting a padlock, and record what is held so a loss is noticed when it
          happens rather than at second fix.
        </p>
        <p>
          The last point is the one people skip. A store nobody has an inventory of cannot be
          discovered to be short — the shortage simply appears later as a delay, and by then nobody
          can say whether it was stolen, damaged, never delivered or used somewhere else.
        </p>
      </ConceptBlock>

      <ConceptBlock title="The store has an end date">
        <p>
          Storage is temporary and its ending is part of managing it. The room you were given may
          be needed back, the container goes off hire, the area becomes somebody else&rsquo;s work
          front.
        </p>
        <p>
          Two things follow. Know when you lose it, and plan the last deliveries around that rather
          than discovering it in week four. And leave it as you would want to find it — an emptied
          store handed back clean is a small thing that site managers remember, and a store
          abandoned full of packaging and offcuts is a small thing they remember for longer.
        </p>
        <p>
          The waste that comes out of a store at the end is also waste somebody pays to remove, so
          it belongs in the same conversation as criterion 1.5 of unit 304 rather than being
          discovered on the last afternoon.
        </p>
      </ConceptBlock>

      <Scenario
        title="Everything on site, nothing to hand"
        situation={
          <>
            A six-week refurbishment of a leisure centre in Port Talbot. The electrical contractor
            is given a plant room to store in — dry, lockable, and directly off the main corridor.
            To be safe, the whole job is delivered in the first week. By week three the boards are
            at the back behind second fix accessories, two luminaire cartons have been stood on, the
            room is full enough that only one person can be in it, and the fire exit route along the
            corridor has boxes stacked along one side.
          </>
        }
        whatToDo={
          <>
            Immediately: clear the corridor, which is an access failure rather than a tidiness one.
            Then re-lay the store by sequence, get what is not needed for a fortnight back off site
            if the supplier will take it, and check the stood-on cartons rather than assuming they
            are fine.
          </>
        }
        whyItMatters={
          <>
            Every one of these came from a single decision made in week one — take everything now.
            The store was good; what was put in it was not manageable. That is why this criterion
            and unit 304&rsquo;s resource planning are the same subject seen from two ends.
          </>
        }
      />

      <InlineCheck
        id="314-2-2-check-3"
        question="Which of these is the most urgent to deal with?"
        options={[
          'Accessories stored at floor level',
          'No inventory of what is held',
          'Second fix in front of first fix',
          'Boxes stacked along an escape route',
        ]}
        correctIndex={3}
        explanation="Three of these cost money and time. The first is a safe-access failure under Regulation 17 and is dealt with before anything else on the list."
      />

      <SectionRule />

      <ContentEyebrow>Occupied buildings, and telling people</ContentEyebrow>

      <ConceptBlock title="Storage on an occupied building">
        <p>
          Working in an occupied school, surgery or office changes the problem. There is often no
          compound and no container — you are given a room that people walk past, or a corner of a
          space still in use.
        </p>
        <p>
          Three things matter more than they would on a construction site. Nothing that could hurt
          somebody who is not wearing site footwear is left where they can reach it. Nothing blocks
          an escape route, ever, including temporarily. And the space is left presentable at the end
          of each day rather than at the end of the job, because the client is looking at it
          continuously and forming a view of the work from what they can see.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ConceptBlock title="Tell people where things are">
        <p>
          A store arrangement that lives in one person&rsquo;s head is a single point of failure.
          The day they are off, everybody else either cannot find something or takes ten minutes to
          find it — and then puts it back somewhere else.
        </p>
        <p>
          It takes very little to fix: say how the store is laid out when the team starts, and say
          it again when it is re-laid. On a longer job a label on a shelf or a line on the container
          door does the job permanently. The test is whether a new operative arriving in week three
          can work out where things are without interrupting somebody.
        </p>
      </ConceptBlock>

      <FAQ
        items={[
          {
            question: 'What if the storage we are given is genuinely not adequate?',
            answer:
              'Say so early, in writing, to whoever allocated it, and describe the consequence rather than the inadequacy — "we cannot store boards securely, so we will need to take deliveries weekly instead of in bulk, which affects the programme if a delivery slips". That is a problem somebody can solve. Simply making do and absorbing the damage is the common response and it is the expensive one.',
          },
          {
            question: 'Is a van a storage facility?',
            answer:
              'For small jobs it is the whole of it, and the same principles apply: arranged by sequence, heavy low, nothing loose, and an idea of what is in there. Where it differs is security and capacity — a van is a poor place to hold a week of material and a well-known target overnight, which is why bulk deliveries to a site with no store are usually a false economy.',
          },
          {
            question: 'Who is responsible if material goes missing from a shared store?',
            answer:
              'Contractually it depends what was agreed, which is exactly why the day-one question is who is responsible for the space. Practically, an unowned shared store means nobody is responsible and everybody is suspicious. If you cannot get ownership settled, keep anything worth taking out of it — that is a cheaper answer than the conversation afterwards.',
          },
          {
            question: 'How does this get assessed?',
            answer:
              'The knowledge is tested with the rest of the unit’s externally-set questions. The applied side sits in the employer-set practical project, which covers organising the provision and storage of resources — so a store you actually arranged and managed is the kind of thing worth having photographs and a note about while it is in front of you.',
          },
        ]}
      />

      <KeyTakeaways
        points={[
          '"Available" is the word that matters — manage the space you are given.',
          'Settle four things on day one: what, who else, who is responsible, and for how long.',
          'CDM Reg 18 — good order and reasonable cleanliness; no material with projecting nails left as a danger.',
          'CDM Reg 17 — safe access and egress and sufficient working space; a blocked route is an access failure.',
          'There is no separate storage regulation; these two general duties are what apply.',
          'The store damages more than thieves do — damp, dust, crushing, being walked on.',
          'Arrange by sequence, off the floor, heavy low and fragile high; findable beats tidy.',
          'Call material forward against the programme — a store is only as good as what is put in it.',
        ]}
      />

      <ContentEyebrow>Check yourself</ContentEyebrow>
      <Quiz questions={quizQuestions} title="Managing the available storage facility" />
    </div>
  );
}
