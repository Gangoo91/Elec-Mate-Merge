/**
 * Unit 301 — Understanding Building Services Engineering Practice in Wales
 * Learning outcome 5 — Understand the relationship between trades and the environment
 * Criterion 5.4 — Waste disposal in building services
 *
 * Approach: the practical end of the outcome. What an electrical job actually
 * produces, why segregation at source is cheaper than sorting later, who owns the
 * copper, how waste leaves site and what has to go down a specialist route. Written
 * from the skip backwards, in money, because that is the argument that changes
 * behaviour on site.
 *
 * This page names no environmental statute, regulation, policy or target, and quotes
 * no statistics, because none could be verified for this course. Duties around
 * carriers and transfer paperwork are written as contract and site practice, which
 * is how they reach the person filling the skip.
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
    question: 'What is the most useful way to think about a full skip on an electrical job?',
    options: [
      'Material that was bought, carried and paid for once, and is now being paid for again to remove',
      'A necessary part of any job that cannot be reduced',
      'The responsibility of the main contractor alone',
      'Evidence that the job is progressing well',
    ],
    correctAnswer: 0,
    explanation:
      'Waste is money before it is rubbish. Every item in the skip was purchased, delivered and handled, and now it is being paid for a second time to be taken away.',
  },
  {
    id: 2,
    question: 'Why is segregation at source cheaper than sorting later?',
    options: [
      'Deciding where something goes when it leaves your hand takes no extra time, while sorting a mixed pile afterwards is a job in itself',
      'Because sorted waste weighs less',
      'Because it means fewer bins are needed on site',
      'Because it removes the need for any waste paperwork',
    ],
    correctAnswer: 0,
    explanation:
      'At the point of work the decision is free. Once everything is in one heap, somebody has to be paid to pull it apart, and on most jobs nobody ever is.',
  },
  {
    id: 3,
    question: 'A mixed skip is usually charged how, compared with segregated waste?',
    options: [
      'At the highest rate that applies to anything in it, which is why separating frequently pays for itself',
      'At the lowest rate, because it saves the site sorting',
      'At the same rate as any other skip regardless of contents',
      'Free of charge, because the contents can be recovered',
    ],
    correctAnswer: 0,
    explanation:
      'A mixed load is generally priced on the worst thing in it. Pull the clean metal, the cardboard and the copper out and the remaining skip is both smaller and cheaper.',
  },
  {
    id: 4,
    question: 'Who owns the copper recovered from cable offcuts and strip-out on a contract?',
    options: [
      'It depends on who bought the material, and it should be agreed in writing before anybody strips anything',
      'Whoever does the stripping',
      'Always the electrical contractor',
      'Always the client',
    ],
    correctAnswer: 0,
    explanation:
      'Copper has a value, which means ownership matters and disputes are common. On a strip-out the client usually bought it originally; on new work the contractor did. Get it agreed up front and keep the weigh-in tickets.',
  },
  {
    id: 5,
    question: 'Which of these should not simply be dropped into the general site skip?',
    options: [
      'Lamps, luminaires and batteries, which need a separate route',
      'Clean cardboard packaging',
      'Broken timber battens with the nails removed',
      'Empty plastic conduit offcuts',
    ],
    correctAnswer: 0,
    explanation:
      'Lamps, electrical equipment and batteries go down their own routes. Cardboard, clean timber and plastic offcuts are ordinary segregated streams.',
  },
  {
    id: 6,
    question: 'You find old plant in a switchroom that appears to contain oil, and nobody has mentioned it. What do you do?',
    options: [
      'Leave it alone and ask, because it is not yours to handle or to put in a skip',
      'Drain it and put the casing in the metal skip',
      'Put it in the general skip because it is being removed anyway',
      'Move it outside so it is out of the way and deal with it later',
    ],
    correctAnswer: 0,
    explanation:
      'Anything containing oil or refrigerant is somebody else specialist job. Do not drain it, do not skip it and do not shift it. Report it and let the right route be arranged.',
  },
  {
    id: 7,
    question: 'How does waste normally leave a site, and what is kept?',
    options: [
      'Through a registered carrier, with the transfer paperwork retained, because on most sites it is a contract requirement and it is checked',
      'In whichever vehicle happens to be leaving that day',
      'In an operative own van, with no record needed',
      'Through the nearest household recycling centre',
    ],
    correctAnswer: 0,
    explanation:
      'Registered carrier and kept transfer paperwork is standard site and contract practice, and it is audited. Taking site waste away in your own van without any record is how a contractor loses a contract.',
  },
  {
    id: 8,
    question: 'What is the honest answer when you are unsure which route an item of waste should take?',
    options: [
      'Ask the site manager or your supervisor before it goes anywhere, rather than guessing',
      'Put it in the general skip, because that is what general means',
      'Take it home and deal with it privately',
      'Leave it beside the skip for somebody else to decide',
    ],
    correctAnswer: 0,
    explanation:
      'Guessing wrong contaminates a load and can cost the site the whole skip charge at a higher rate. Asking takes a minute, and leaving it beside the skip simply makes it somebody else problem with no decision attached.',
  },
];

export default function Lesson301_5_4() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'Everything in the skip was bought, carried and paid for once, and is now being paid for a second time to leave.',
          'Segregate at source, because the decision costs nothing at the point of work and costs a day of labour afterwards.',
          'A mixed skip is generally charged at the highest rate that applies to anything in it, so separating frequently pays.',
          'Copper has a value, ownership depends on who bought the material, and it should be agreed and recorded before anybody strips a drum.',
          'Waste leaves site through a registered carrier with the transfer paperwork kept; on most sites that is a contract requirement and it is checked.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Explain why waste on a job is money before it is rubbish, having been paid for on the way in and again on the way out.',
          'List what an electrical job actually produces as waste, from cable offcuts and copper to packaging, metal enclosures, lamps and batteries.',
          'Apply segregation at source so that the decision is made when the item leaves your hand rather than by somebody sorting a mixed heap later.',
          'Describe how copper value and ownership are settled in advance, and why records and weigh-in tickets matter.',
          'Identify the items that need a specialist route, and state plainly that the correct response to an unfamiliar item is to ask rather than guess.',
        ]}
        initialVisibleCount={3}
      />

      <SectionRule />

      <ContentEyebrow>Waste as a cost</ContentEyebrow>

      <ConceptBlock
        title="Waste is money before it is rubbish"
        plainEnglish="You pay for it twice: once at the wholesaler and once at the skip."
      >
        <p>
          Stand at the skip at the end of a first fix and look at what is in it. Cable offcuts you
          paid for by the metre. Boxes of accessories opened for one item. Trunking cut short.
          Packaging for material that is now on the wall. None of that arrived by accident and all
          of it was on an invoice.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Paid on the way in.</strong> Purchase, delivery, handling and storage.
          </li>
          <li>
            <strong>Paid on the way out.</strong> Skip hire, weight and disposal rate.
          </li>
          <li>
            <strong>Paid in labour twice.</strong> Somebody carried it in and somebody carries it
            out.
          </li>
          <li>
            <strong>Sometimes paid in value thrown away.</strong> Copper in the general skip is cash
            you have handed to whoever empties it.
          </li>
        </ul>
        <p>
          Put the argument to an apprentice in those terms and it lands. Put it as tidiness and it
          does not.
        </p>
      </ConceptBlock>

      <ContentEyebrow>Segregating at source</ContentEyebrow>

      <ConceptBlock
        title="Segregate at the moment it leaves your hand"
        onSite="The cheapest sort in the world is the one that happens at the point of work."
      >
        <p>
          Segregation fails when the bins are at the gate and the work is on the third floor. Nobody
          walks. Put the containers where the waste is made and the whole thing runs itself.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Containers at the point of work.</strong> A bag for copper offcuts, a bag for
            cardboard, a tub for small metal, on the barrow with you.
          </li>
          <li>
            <strong>Label them plainly.</strong> A drum with a piece of tape saying COPPER ONLY is
            enough, and it stops the contamination that ruins a load.
          </li>
          <li>
            <strong>Empty them at the end of each day.</strong> A full bag left overnight gets used
            as a bin by everybody else.
          </li>
          <li>
            <strong>Make it easier than the alternative.</strong> If the right bin is nearer than
            the skip, people use it.
          </li>
          <li>
            <strong>Break packaging down as you go.</strong> Flattened cardboard takes a fraction of
            the space, and space in a skip is the thing being charged for.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="What an electrical job actually produces"
        plainEnglish="Know your own waste stream before you argue with anybody about theirs."
      >
        <p>
          The list is short and it barely changes from job to job. Learn it and you can set the
          containers up on day one instead of improvising in week three.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Cable offcuts and copper.</strong> The one with a real value. Kept separate,
            kept clean, kept secure.
          </li>
          <li>
            <strong>Cardboard and packaging.</strong> The largest volume by far, and the easiest to
            separate.
          </li>
          <li>
            <strong>Metal enclosures, trunking, tray and conduit.</strong> Clean scrap metal with a
            value of its own.
          </li>
          <li>
            <strong>Plasterboard and building debris.</strong> From chasing and cutting in, and
            usually its own stream on a managed site.
          </li>
          <li>
            <strong>Lamps and luminaires.</strong> Separate route, handled carefully, never thrown
            into a skip.
          </li>
          <li>
            <strong>Batteries.</strong> Emergency packs, alarm cells, tool packs. Separate route
            every time.
          </li>
          <li>
            <strong>Cable drums and pallets.</strong> Often returnable for credit, which makes them
            neither waste nor free.
          </li>
          <li>
            <strong>Anything containing oil or refrigerant.</strong> Not yours to drain, not yours
            to skip, not yours to move.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="301-5-4-check-1"
        question="You are first fixing a floor of offices. Where should the copper offcut bag sit?"
        options={[
          'By the skip at the gate, so it is on the way out',
          'In the site office, where it cannot be taken',
          'On the barrow with you at the point of work, labelled, and emptied into a secure store at the end of the day',
          'Anywhere convenient, because offcuts can be collected at the end of the job',
        ]}
        correctIndex={2}
        explanation="Segregation only works if the right container is nearer than the skip. Collecting offcuts at the end of the job means they were swept up with everything else weeks ago, and copper left unsecured overnight walks."
      />

      <ContentEyebrow>Copper and scrap value</ContentEyebrow>

      <ConceptBlock
        title="Copper, value and who owns it"
        onSite="The argument about who owns the copper always happens after it has been weighed in."
      >
        <p>
          Copper is the one waste stream on an electrical job with a serious value, which is exactly
          why it causes trouble. Ownership follows who bought the material, and on a strip-out that
          is usually not you.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>New work offcuts.</strong> The contractor bought the cable, so the offcuts are
            generally the contractor material, subject to the contract.
          </li>
          <li>
            <strong>Strip-out from an existing building.</strong> The client usually owns what is
            being removed. Recovery value is often already allowed for in the price.
          </li>
          <li>
            <strong>Agree it in writing before you start.</strong> One line in the order or the
            pre-start minutes removes the whole dispute.
          </li>
          <li>
            <strong>Keep the tickets.</strong> The weigh-in receipt is the record, and it goes to
            the office, not into a pocket.
          </li>
          <li>
            <strong>Never let it be personal.</strong> An operative weighing in site copper on their
            own account is a dismissal, and it is the reason some sites ban stripping altogether.
          </li>
          <li>
            <strong>Keep it secure.</strong> Stripped drums left in an open compound do not stay
            there.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="The mixed skip and why separating pays"
        plainEnglish="A mixed load is usually priced on the worst thing in it."
      >
        <p>
          The general skip feels free because somebody else ordered it. It is not. It is charged by
          the load and generally at a rate driven by the most awkward material in it, so the cheap
          habit of throwing everything in one place is the expensive one.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Pull the value out first.</strong> Copper and clean metal are worth money rather
            than costing money.
          </li>
          <li>
            <strong>Then pull the volume out.</strong> Cardboard is bulk, and bulk is what fills the
            skip you are paying for.
          </li>
          <li>
            <strong>Keep contaminants out.</strong> One item in the wrong skip can change the rate
            for the entire load.
          </li>
          <li>
            <strong>Do not let your skip become the site skip.</strong> If your bin is the only tidy
            one, it fills with everybody else waste and you pay for it.
          </li>
          <li>
            <strong>Watch the fill.</strong> Half the space in most skips is air inside boxes and
            uncut lengths.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="301-5-4-check-2"
        question="Your metal-only skip has had a bag of plasterboard offcuts and a broken luminaire dropped into it overnight. What is the consequence?"
        options={[
          'Nothing, the yard will sort it out at no cost',
          'The skip will simply be refused and taken away empty',
          'The load may be reclassified as mixed and charged at a higher rate, so the contamination has to be pulled out before it is collected',
          'It improves the load because there is more weight in it',
        ]}
        correctIndex={2}
        explanation="Contamination is what turns a cheap segregated load into an expensive mixed one. Pull it out before collection, and keep segregated skips where they can be seen or covered so it does not happen again."
      />

      <SectionRule />

      <ContentEyebrow>Getting waste off site legally</ContentEyebrow>

      <ConceptBlock
        title="How waste leaves site"
        onSite="Registered carrier, transfer paperwork kept, and somebody will ask to see it."
      >
        <p>
          On any managed site, waste leaves through a registered carrier and the transfer paperwork
          is retained. On most sites this is a contract requirement written into the order, and it is
          checked, both by the main contractor and at audit. Treat it as part of the job rather than
          as administration that happens elsewhere.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Use the site arrangement.</strong> Do not bring your own skip onto a managed
            site without asking; it usually breaches the main contractor arrangement.
          </li>
          <li>
            <strong>Know who your carrier is.</strong> If your firm arranges its own collections,
            somebody in the office holds those details, and you should know who to ask.
          </li>
          <li>
            <strong>Keep the paperwork.</strong> Tickets and transfer notes go to the office the
            same week, not at the end of the contract.
          </li>
          <li>
            <strong>Describe the load honestly.</strong> A description that does not match the
            contents is the thing that gets found.
          </li>
          <li>
            <strong>Never take site waste away privately.</strong> No record, no carrier, and the
            contractor carries the consequence.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Specialist routes, and the honest answer"
        plainEnglish="Some items are not yours to handle, and saying so is the professional answer."
      >
        <p>
          A proportion of what comes out of an old building needs a route of its own, and part of
          being a competent electrician is recognising the items rather than knowing every
          destination.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Lamps.</strong> Handled whole, boxed or tubed, and sent on their own route.
            Never broken to save space.
          </li>
          <li>
            <strong>Luminaires and electrical equipment.</strong> Separate stream, kept out of
            general skips.
          </li>
          <li>
            <strong>Batteries of every kind.</strong> Emergency packs, alarm cells, tool packs. Kept
            dry, terminals protected, collected separately.
          </li>
          <li>
            <strong>Oil-filled or refrigerant-containing plant.</strong> Not drained, not moved, not
            skipped. Report it.
          </li>
          <li>
            <strong>Old material you do not recognise.</strong> In an old building, unidentified
            board, lagging or panel is a stop-and-ask item, not a skip item.
          </li>
          <li>
            <strong>The honest answer.</strong> Saying that you do not know and will find out takes
            a minute, and it is worth far more than a confident guess that contaminates a load or
            puts something in the wrong place.
          </li>
        </ul>
      </ConceptBlock>

      <ContentEyebrow>Good order on the job</ContentEyebrow>

      <ConceptBlock
        title="Good order in the store and on the job"
        onSite="A tidy store is a material control system, not a housekeeping preference."
      >
        <p>
          The last part of waste management is the part that is visible from the door. Sites that
          are kept in order produce less waste, because material is findable, undamaged and dry, and
          because nobody is throwing away what they cannot locate.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>One store, one system.</strong> Full material one side, surplus and returns the
            other, waste containers outside it.
          </li>
          <li>
            <strong>Keep it dry and off the floor.</strong> Pallets and racking pay for themselves
            on the first wet week.
          </li>
          <li>
            <strong>Clear as you go.</strong> Offcuts, packaging and strapping picked up at the end
            of each task rather than at the end of the job.
          </li>
          <li>
            <strong>Break down timber and packaging, and deal with nails.</strong> Projecting nails
            in dumped battens injure people and the material must not be left where it is a danger.
          </li>
          <li>
            <strong>Keep routes and exits clear.</strong> Waste stacked in a corridor is both a
            waste problem and an access problem.
          </li>
          <li>
            <strong>Return drums and pallets.</strong> They are often worth a credit, and they take
            up more space than anything else you own.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="301-5-4-check-3"
        question="Stripping out an old plant room you find a sealed unit that appears to hold oil, plus a crate of old fluorescent tubes. What is the correct handling?"
        options={[
          'Drain the oil into a drum and put the tubes in the general skip',
          'Break the tubes down to save space and move the unit outside',
          'Put both in the metal skip because both are mainly metal',
          'Leave the oil-filled unit alone and report it, and keep the tubes whole and boxed for their own collection route',
        ]}
        correctIndex={3}
        explanation="Oil-filled plant is not yours to drain, move or skip. Lamps go whole, boxed, down their own route, and are never broken to save space. When in doubt, the item stays where it is and you ask."
      />

      <SectionRule />

      <RegsCallout
        source="CDM 2015"
        clause="Regulation 18 — each part of a construction site must, so far as is reasonably practicable, be kept in good order and those parts in which construction work is being carried out must be kept in a reasonable state of cleanliness; and no material with projecting nails or similar sharp objects may be used, or left anywhere it could be a danger."
        meaning="Waste handling and site safety are the same subject. Offcuts, strapping, broken pallets and packaging left where they fall are trip hazards and puncture injuries before they are a disposal cost. Clearing as you go, breaking timber down and dealing with nails is how good order is actually achieved, and it is also what makes segregation possible, because you cannot separate a heap that nobody has touched for a fortnight."
        cite="HSE L153, Managing health and safety in construction"
      />

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Letting the sparks skip become the site skip"
        whatHappens={
          <>
            <p>
              The electrical contractor orders a metal skip for enclosures, trunking offcuts and tray
              because the scrap value offsets the hire. It is the only clean container on site and it
              sits by the loading door. Within a fortnight it holds plasterboard from the dryliners,
              a broken luminaire, two bags of canteen rubbish and a bucket of set grout. The load is
              reclassified as mixed, charged at the higher rate, and the expected credit for the metal
              disappears. The contracts manager sees a cost where he was promised a saving, and the
              next job is priced with no segregation at all.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Site your segregated container where you work, not where everybody passes, and keep it
              covered or locked when the gang is off site. Label it on all four sides in plain words,
              and tell the site manager at the pre-start that it is a single-stream skip so the
              induction says the same thing. Check it each morning and pull contamination out while it
              is two items rather than half a load. If it keeps happening, move it inside your own
              compound and accept the extra walk, because the credit is worth more than the steps.
            </p>
          </>
        }
      />

      <CommonMistake
        title="Making the awkward items fit the skip"
        whatHappens={
          <>
            <p>
              It is the last afternoon, the unit has to be cleared, and what is left is the
              difficult stuff: a crate of tubes, a box of old emergency battery packs and a couple
              of items nobody recognises. The tubes get trodden down so the crate goes in flat, the
              packs go in with the metal, and the unidentified board goes in the general skip
              because it has to go somewhere.
            </p>
            <p>
              Every one of those decisions was made to save ten minutes. Between them they have
              contaminated two loads, put the rate up for everything in them, and sent something
              down a route it should never have gone down &mdash; from a skip with the electrical
              contractor&rsquo;s name against it.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Handle the specialist items as their own task rather than as the sweepings. Lamps go
              whole, boxed or tubed, down their own route and are never broken to save space.
              Batteries of every kind go separately, kept dry with the terminals protected.
              Luminaires and electrical equipment stay out of the general skip.
            </p>
            <p>
              For anything holding oil or refrigerant, and for old material you cannot identify, the
              safe default is that it does not move: leave it, label it, photograph it and ask your
              supervisor or the site manager before the end of the day. Saying you do not know and
              will find out takes a minute and is worth far more than a confident guess.
            </p>
          </>
        }
      />

      <SectionRule />

      <Scenario
        title="Port Talbot — a factory strip-out, a stripped drum and a question nobody asked"
        situation={
          <>
            <p>
              You are running a two-man strip-out in an old unit in Port Talbot ahead of a refit. By
              the second day there is a pile of armoured cable, a stack of steel trunking, four old
              distribution boards and a crate of fluorescent tubes. Your apprentice has spent the
              afternoon stripping the armoured cable down for the copper and has a drum of clean
              copper in the corner. He asks whether you are weighing it in on Friday and splitting it
              with him. Nobody has said anything about copper in the order, and the client site
              contact is on holiday. There is also a squat old unit behind the boards with an oil
              level sight glass on the side.
            </p>
          </>
        }
        whatToDo={
          <>
            <p>
              Stop the stripping until ownership is settled. Email your own office and the client
              contract administrator the same afternoon: describe what has been recovered, ask in
              writing who owns it, and say that nothing will be weighed in until there is an answer.
              Secure the copper in your locked container in the meantime. Nobody weighs anything in
              on a personal account, and you say that to the apprentice plainly, because it is the
              quickest way anybody in this trade loses a job. Keep the tubes whole and boxed for
              their own collection, keep the steel in the metal stream, and do not touch the
              oil-filled unit at all: photograph it, report it, and let a specialist route be
              arranged for it.
            </p>
          </>
        }
        whyItMatters={
          <>
            <p>
              Everything in that unit has a value or a cost attached and both are somebody else money
              until it is written down. Copper weighed in before ownership is agreed turns a clean
              recovery into an accusation that cannot be disproved once the drum is empty. Tubes
              broken into a skip contaminate the load and the rate goes up for everything in it. And
              an oil-filled unit moved by a gang that was not asked to move it is the incident nobody
              wants to explain. The professional version of this day is slower by one email and one
              phone call, and it leaves you with a weigh-in ticket, a clean audit trail and a client
              who uses you again on the refit.
            </p>
          </>
        }
      />

      <SectionRule />

      <FAQ
        items={[
          {
            question: 'Is it worth separating cardboard when the general skip is right there?',
            answer:
              'Yes, because cardboard is mostly air and air is what fills the skip you are paying for. Flattening and separating it reduces the number of collections more than almost anything else you can do on an electrical job.',
          },
          {
            question: 'Can I take a few offcuts home for a job in the garage?',
            answer:
              'Not without asking. The material belongs to somebody, and taking it off site with no record is the same problem as weighing copper in privately. If it is genuinely surplus and nobody wants it, ask your supervisor and get a yes in writing.',
          },
          {
            question: 'The main contractor has not provided a metal skip. What should I do?',
            answer:
              'Raise it at the pre-start or the next progress meeting and put the case in money: clean metal and copper pulled out of the general load reduce the mixed rate and may produce a credit. If the answer is still no, arrange your own collection through your firm and keep the paperwork.',
          },
          {
            question: 'I do not know which route an item should take and everybody is busy. What is the safe default?',
            answer:
              'The safe default is that it does not move. Leave it where it is, label it, and ask your supervisor or the site manager before the end of the day. Guessing contaminates a load, and putting something awkward in a general skip is the version of this that ends up being traced back.',
          },
        ]}
      />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Everything in the skip was paid for on the way in and is being paid for again on the way out.',
          'Segregate at source with labelled containers at the point of work, because sorting a mixed heap later never happens.',
          'A mixed skip is generally charged at the highest rate applying to anything in it, so separating frequently pays for itself.',
          'Know the electrical waste list: cable and copper, cardboard, metal enclosures and containment, building debris, lamps, luminaires, batteries, drums and pallets.',
          'Copper ownership follows who bought the material, so agree it in writing before stripping and keep every weigh-in ticket with the office.',
          'Waste leaves site through a registered carrier with the transfer paperwork kept, which on most sites is a contract requirement and is checked.',
          'Lamps, batteries, electrical equipment and anything holding oil or refrigerant go down specialist routes, and unfamiliar old material is a stop-and-ask item.',
          'Good order in the store and on the job is material control: dry, findable material is not waste, and cleared offcuts and nails are not injuries.',
        ]}
      />

      <SectionRule />

      <ContentEyebrow>Check yourself</ContentEyebrow>
      <Quiz questions={quizQuestions} title="5.4 Waste disposal in building services" />
    </div>
  );
}
