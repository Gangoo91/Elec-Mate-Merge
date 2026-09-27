/**
 * Unit 301 — Understanding Building Services Engineering Practice in Wales
 * Learning outcome 5 — Understand the relationship between trades and the environment
 * Criterion 5.1 — Industry regulation and sustainability and the natural environment
 *
 * Approach: the trade does not set its own rules where it meets the natural
 * environment. The specification, the contract, the site rules and the standards
 * the work is built to arrive before the electrician does. This page teaches the
 * electrician to read those constraints, to recognise the ways an ordinary
 * electrical task can reach water, soil, trees and air, and to ask before acting.
 *
 * This page names no environmental statute, regulation, policy or target, because
 * none could be verified for this course. Duties are written as site and contract
 * practice, which is how they actually reach the person holding the tool.
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
    question: 'Where do the constraints on how you work near the natural environment usually reach you from?',
    options: [
      'The specification, the contract, the site rules and the standards the work is built to',
      'Your own judgement on the day, decided at the van',
      'The wholesaler who supplied the material',
      'Whoever else happens to be working in the same room',
    ],
    correctAnswer: 0,
    explanation:
      'The constraints are set by others and handed down. By the time you are on site they appear as the spec, the contract, the site induction and the standards the installation has to meet. Your job is to read them and work inside them.',
  },
  {
    id: 2,
    question: 'A road gully or yard drain outside a building should be treated as what?',
    options: [
      'A pipe that may run straight to a watercourse, so nothing but clean rainwater goes down it',
      'A convenient place to empty buckets because it is already dirty',
      'A soakaway that filters anything you put into it',
      'Part of the foul drainage, so anything liquid is acceptable',
    ],
    correctAnswer: 0,
    explanation:
      'Surface water drainage often discharges to a ditch, brook or river with no treatment on the way. Treat every outside gully as if it opens directly into the stream at the bottom of the field.',
  },
  {
    id: 3,
    question: 'Why is silty water from a trench treated seriously on a site near a brook?',
    options: [
      'Fine suspended solids smother the bed of a watercourse and the damage is visible a long way downstream',
      'It stains the concrete a different colour',
      'It makes the trench harder to backfill',
      'It is only a problem if the water is coloured red',
    ],
    correctAnswer: 0,
    explanation:
      'Silt is the most common pollution from ordinary groundworks. It looks like nothing more than muddy water, it travels, and it settles out over the bed of the watercourse where it does the harm.',
  },
  {
    id: 4,
    question: 'Where should a generator or a fuel can be refuelled on a site with a ditch along one boundary?',
    options: [
      'On a hard, contained area well away from any drain, ditch or slope running towards water, with a spill kit to hand',
      'Wherever the generator happens to be standing, to save carrying the can',
      'On the grass, because grass soaks up a spill',
      'Next to the gully so that any spill washes away quickly',
    ],
    correctAnswer: 0,
    explanation:
      'A small spill on hard standing can be contained and cleaned. The same spill on a slope above a ditch, or beside a gully, is gone before you have found the absorbent.',
  },
  {
    id: 5,
    question: 'What is the problem with washing a core drill or a grout mixer out onto open ground near a stream?',
    options: [
      'Cement washings are strongly alkaline as well as silty, so they harm a watercourse even in small amounts',
      'Nothing, because cement is a natural material',
      'It only matters if the water is being pumped out of a trench',
      'It wastes water that has already been paid for',
    ],
    correctAnswer: 0,
    explanation:
      'Cement washings carry both fine solids and a high alkalinity. They are one of the easiest pollution incidents to cause and one of the easiest to prevent, because all it takes is washing out into a lined, contained point.',
  },
  {
    id: 6,
    question: 'A mature tree on the site has a fenced area around it. What does that fence mean for your cable route?',
    options: [
      'You do not dig, store material or park inside it until the person who set it out agrees a route',
      'You can dig inside it as long as you backfill the same day',
      'It only applies to plant, not to hand digging',
      'It is there to stop the tree being hit by vehicles, so working on foot is fine',
    ],
    correctAnswer: 0,
    explanation:
      'The fenced area protects roots and soil, which sit far wider than most people expect. Trenching, stacking drums or standing a van inside it all cause damage that shows up years later. Ask for a route rather than assuming.',
  },
  {
    id: 7,
    question: 'Why is prevention treated as cheaper than clean-up on site?',
    options: [
      'Stopping a spill or a discharge costs minutes, while recovering from one costs days of work, plant and lost programme',
      'Clean-up is free if the contractor has insurance',
      'Prevention is not cheaper, it is simply more popular',
      'Because clean-up work is always done by somebody else',
    ],
    correctAnswer: 0,
    explanation:
      'A drip tray and five minutes of thought cost almost nothing. A pollution incident brings the job to a stop, drags in people who were not on the programme, and damages the contractor relationship that got you the work.',
  },
  {
    id: 8,
    question: 'You are about to do something that might affect the surroundings and you are not sure. What is the correct move?',
    options: [
      'Stop, and ask the site manager or the principal contractor before you start',
      'Carry on and mention it at the end of the day',
      'Ask another electrician on a different site by phone',
      'Do it the way the last job was done and assume it is acceptable',
    ],
    correctAnswer: 0,
    explanation:
      'Asking first costs a few minutes of somebody else time. Asking afterwards is a report of something that has already happened, and by then the options have narrowed to clean-up.',
  },
];

export default function Lesson301_5_1() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'You work inside rules written by other people. The spec, the contract, the site rules and the standards the installation is built to all land before you do.',
          'Water is the route most damage travels down. Every outside gully, ditch and trench pump is a short path to a brook.',
          'Silt, fuel, cement washings and dust are the four things an electrical job realistically produces that reach the surroundings.',
          'Prevention is minutes. Clean-up is days, plant, other people and a stopped programme.',
          'When you are unsure, the answer is to stop and ask the site manager or the principal contractor first, not to explain afterwards.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Explain how the specification, the contract, the site rules and the standards the work is built to set the limits on what an electrician may do where the job meets the natural environment.',
          'Recognise the features of a site that change how you work: watercourses, ditches and surface water drains, protected habitat, and trees with a fenced root area.',
          'Identify the pollution an ordinary electrical job can cause, including silt from trenching, fuel and oil from plant, cement and grout washings, and dust from cutting and chasing.',
          'Justify why prevention is treated as cheaper and more reliable than clean-up, in both money and programme.',
          'Decide who to ask, and when to stop, before doing something that could affect the surroundings.',
        ]}
        initialVisibleCount={3}
      />

      <SectionRule />

      <ContentEyebrow>Regulation and site conditions</ContentEyebrow>

      <ConceptBlock
        title="The rules arrive before you do"
        plainEnglish="Where the work meets the natural environment, an electrician is almost never the person who decides what is allowed."
      >
        <p>
          On a domestic rewire you make a hundred small decisions a day. On a site with a watercourse
          down one side, a fenced tree and a neighbouring field, the decisions that matter have
          already been made by somebody else and written down. Your skill is in finding them and
          working inside them, not in re-opening them at eight in the morning with a breaker in your
          hand.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>The specification.</strong> Says what is to be installed and often where it may
            and may not go. A route shown avoiding one side of a building is usually avoiding
            something.
          </li>
          <li>
            <strong>The contract.</strong> Sets obligations on the main contractor that are passed
            straight down to you, including how waste leaves, how deliveries arrive and what has to
            be recorded.
          </li>
          <li>
            <strong>The site rules and induction.</strong> The practical version. Where you may wash
            out, where you may refuel, which areas are fenced and who to call.
          </li>
          <li>
            <strong>The standards the work is built to.</strong> These shape the kit you select for
            an exposed or wet position, which in turn decides how long it lasts and how often
            somebody has to come back and disturb the place again.
          </li>
        </ul>
        <p>
          None of that is a reason to switch off. The person who reads the constraints and plans
          round them at the start is the one who is not standing in a stopped trench at three in the
          afternoon.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Read the site before you unload the van"
        onSite="Five minutes walking the boundary tells you more than an hour of reading."
      >
        <p>
          Before the first drum comes off, work out where water goes. Stand at the highest point of
          your work area and follow the fall. Ground slopes, and anything liquid you release finds
          the same path every time.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Watercourses.</strong> A brook, a mill leat, a drainage ditch, a pond. Note how
            far away it is and whether the ground falls towards it.
          </li>
          <li>
            <strong>Surface water drains.</strong> Yard gullies, car park drains, downpipe shoes.
            Assume they run to a watercourse untreated until somebody tells you otherwise.
          </li>
          <li>
            <strong>Soft ground and banks.</strong> Where spoil will run in rain, and where a
            trench will fill and need pumping.
          </li>
          <li>
            <strong>Fenced or taped areas.</strong> A tree protection fence, a marked habitat, a
            stand-off from a bank. Somebody put it there deliberately.
          </li>
          <li>
            <strong>Neighbours.</strong> A garden, a school field, a farm gate. Dust, noise and
            light all travel across a boundary.
          </li>
        </ul>
      </ConceptBlock>

      <ContentEyebrow>Silt and watercourses</ContentEyebrow>

      <ConceptBlock
        title="Silt: the pollution nobody expects to cause"
        plainEnglish="Muddy water looks harmless. It is the most common thing to go wrong on a small site."
      >
        <p>
          Dig a trench for a supply cable in Welsh weather and it fills. Pump it out and you have
          moved a large volume of fine solids somewhere. If that somewhere is a ditch or a gully, the
          fines travel downstream and settle over the bed. It does not smell, it does not burn, and
          it is still the thing most likely to bring a site to a halt.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Do not pump straight to a drain or a ditch.</strong> Ask where trench water is
            to go. Usually it is to a settlement area or over grass well back from the bank, so the
            solids drop out before the water reaches anything.
          </li>
          <li>
            <strong>Keep spoil back from the bank.</strong> A spoil heap on a slope in heavy rain is
            a silt source that works all night without you.
          </li>
          <li>
            <strong>Cover or seed what will be open for weeks.</strong> Bare soil is the supply.
          </li>
          <li>
            <strong>Watch the wheels.</strong> Mud tracked onto the road washes into the nearest
            gully at the first shower.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="301-5-1-check-1"
        question="You need to dewater a cable trench on a site with a brook along the boundary. What do you do first?"
        options={[
          'Run the hose to the nearest gully because it is only water',
          'Ask where trench water is to be discharged, because it must not go straight to a ditch or a gully',
          'Pump it onto the spoil heap so the solids stay on site',
          'Wait for it to soak away on its own and lose the day',
        ]}
        correctIndex={1}
        explanation="Trench water carries fine solids. Where it goes is a site decision, usually to a settlement area or a well set back soft area, never straight into a drain or watercourse. Pumping onto a spoil heap simply washes the heap into the same place."
      />

      <ContentEyebrow>Fuel, oil and concrete washout</ContentEyebrow>

      <ConceptBlock
        title="Fuel, oil and the small generator"
        onSite="The 20 litre can in the back of the van is the one that causes the incident."
      >
        <p>
          Electrical work brings small plant: a generator for temporary supplies, a compressor, a
          dumper somebody else is running, a diesel heater in the drying-out phase. Every one is a
          fuel store, and a fuel spill spreads further and faster than people expect.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Refuel away from drains and slopes.</strong> Hard standing, well back, and never
            over a gully or on a bank above a ditch.
          </li>
          <li>
            <strong>Use a drip tray under standing plant.</strong> A parked generator leaks slowly
            and quietly.
          </li>
          <li>
            <strong>Know where the spill kit is before you need it.</strong> Absorbent granules and
            a drain mat are useless in a locked container two hundred metres away.
          </li>
          <li>
            <strong>Never leave a nozzle unattended.</strong> The overflow happens in the thirty
            seconds you turned your back.
          </li>
          <li>
            <strong>Report a spill immediately.</strong> The site has a procedure. A small spill
            reported is an incident form. A small spill hidden is a much larger problem in a week.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Concrete, grout and washout"
        plainEnglish="Cement washings are both silty and strongly alkaline, which is a bad combination for anything living in water."
      >
        <p>
          Electricians make more cement waste than they think. Core drilling slurry, grout round a
          duct, a bag of post mix for a column base, the bucket the mixer paddle was cleaned in. All
          of it wants to be tipped where it is convenient.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Wash out at the designated point only.</strong> Usually a lined pit or a
            contained bay. If there is not one, ask before you mix.
          </li>
          <li>
            <strong>Core drilling slurry.</strong> Collect it. A wet vacuum and a bund of sand round
            the core position keeps it off the floor and out of the gully.
          </li>
          <li>
            <strong>Never rinse a bucket into a gully.</strong> Even the last inch is enough to
            matter and it is the easiest habit to break.
          </li>
          <li>
            <strong>Bag the bags.</strong> Empty cement bags blow, and a wet one leaves a ring of
            hard residue wherever it lands.
          </li>
        </ul>
      </ConceptBlock>

      <ContentEyebrow>Dust from cutting and chasing</ContentEyebrow>

      <ConceptBlock
        title="Dust, cutting and chasing"
        onSite="What you cut indoors ends up outdoors, and what you cut outdoors ends up next door."
      >
        <p>
          Chasing walls, cutting trunking and tray, drilling masonry and grinding threaded rod all
          produce dust that does not stay in the room. It settles on cars, on a neighbouring garden,
          on a pond, and it goes into the lungs of whoever is standing in it, which is usually you.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>On-tool extraction first.</strong> It protects you and it stops the dust
            travelling.
          </li>
          <li>
            <strong>Water suppression where extraction is not practical.</strong> Then remember the
            slurry has to be collected rather than hosed away.
          </li>
          <li>
            <strong>Cut in a set place.</strong> One cutting station, screened, away from
            boundaries, beats cutting wherever you are standing.
          </li>
          <li>
            <strong>Think about wind direction.</strong> If it is blowing at the school field, move
            or wait.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="301-5-1-check-2"
        question="You have to core through an external wall and there is a gully two metres away. What is the right preparation?"
        options={[
          'Core it and hose the slurry into the gully straight away before it sets',
          'Core it dry so there is no slurry to deal with',
          'Put a board over the gully and let the slurry run onto the ground beside it',
          'Collect the slurry with a wet vacuum and bund the core position so nothing reaches the gully',
        ]}
        correctIndex={3}
        explanation="Cement slurry is silty and alkaline. Collect it at the point it is made. Coring dry creates a large dust problem instead, and letting it run onto the ground beside the gully simply delays the same result by one shower of rain."
      />

      <SectionRule />

      <ContentEyebrow>Trees, hedgerows and prevention</ContentEyebrow>

      <ConceptBlock
        title="Trees, hedgerows and the ground under them"
        plainEnglish="The damage to a tree is done underground, by digging, storing and parking, long before anything shows above ground."
      >
        <p>
          A tree fence on a site is not decoration and it is not only there to stop a dumper hitting
          the trunk. The roots that keep the tree alive spread wide and sit shallow, and they are
          damaged by compaction as much as by cutting. Stacking cable drums under a canopy for three
          weeks does real harm.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Do not dig inside a protected area.</strong> Not by machine and not by hand,
            until a route is agreed with whoever set the fence out.
          </li>
          <li>
            <strong>Do not store or park inside it.</strong> Compaction is invisible and permanent.
          </li>
          <li>
            <strong>Hedgerows are habitat, not just a boundary.</strong> Pulling a cable through a
            hedge line, or cutting a gap for access, is a decision for somebody else.
          </li>
          <li>
            <strong>If a route has to cross, ask for alternatives.</strong> A duct pushed under, a
            different side of the building, or a change of sequence usually exists and costs less
            than the argument afterwards.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Prevention beats clean-up, and knowing who to ask"
        onSite="A drip tray is a pound an hour. A stopped site is not."
      >
        <p>
          The reason prevention wins is not that it is virtuous. It is that the costs are wildly
          uneven. Preventing a problem costs a few minutes and a piece of cheap kit. Recovering from
          one costs a suspended work area, a day of other people time, plant you did not plan for,
          the programme slipping and a conversation with the client you did not want to have.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Prevention is predictable.</strong> You can plan it, price it and put it in the
            method statement.
          </li>
          <li>
            <strong>Clean-up is not.</strong> You do not know how far it went or who is now
            involved.
          </li>
          <li>
            <strong>Reputation compounds.</strong> Contractors remember the subcontractor who
            stopped the site, and they remember the one who never has.
          </li>
          <li>
            <strong>The preventive kit is boring and cheap.</strong> Drip trays, a drain mat,
            granules, a bund of sand, a wet vacuum, a settlement bay, a cutting station.
          </li>
        </ul>
        <p>
          The other half of prevention is knowing the limit of your own decision. Nobody expects an
          electrician to be an expert on watercourses or trees. What is expected is that you
          recognise the moment your task has moved outside what you are entitled to decide, and that
          you stop there rather than one step later.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Site manager or principal contractor first.</strong> They hold the site rules and
            they know who else is involved.
          </li>
          <li>
            <strong>Your own supervisor.</strong> For anything that changes the price, the route or
            the programme.
          </li>
          <li>
            <strong>The designer, through the proper route.</strong> When the spec and the ground
            disagree, that is a design question, not a site improvisation.
          </li>
          <li>
            <strong>Write it down.</strong> A note in the day book, a photograph, an email. It takes
            two minutes and it is the difference between a record and an argument.
          </li>
        </ul>
        <p>
          Stopping is not an admission that you cannot do the job. On a well run site it is the
          behaviour that gets you asked back.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="301-5-1-check-3"
        question="The spec shows a duct route straight through a fenced tree area. What is the correct response?"
        options={[
          'Raise it with the site manager and your supervisor so an alternative route or method is agreed and recorded',
          'Follow the spec, because the spec is the instruction you are paid to follow',
          'Move the route yourself by a couple of metres and say nothing',
          'Hand dig it instead of machine digging, which makes it acceptable',
        ]}
        correctIndex={0}
        explanation="A conflict between the drawing and a protected area is a design question. Following the drawing causes the damage, moving it quietly leaves an unrecorded route somebody will dig into later, and hand digging still cuts roots. Raise it and get the answer in writing."
      />

      <SectionRule />

      <RegsCallout
        source="BS 7671:2018+A4:2026"
        clause="Regulation 512.2.1 — equipment shall be of a design appropriate to the situation in which it is to be used, and the installation shall take account of the conditions likely to be encountered."
        meaning="External influences are not a footnote. Temperature, humidity, mechanical stress and a corrosive atmosphere all decide whether the kit you fit outdoors, in a plant room or on a coastal site survives. Equipment chosen for the conditions stays in service; equipment chosen on price alone is dug out, replaced and disposed of years early, and every one of those return visits disturbs the place again."
        cite="BS 7671 Part 5 — Selection and Erection of Equipment"
      />

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Treating an outside gully as somewhere to empty a bucket"
        whatHappens={
          <>
            <p>
              The lads finish a run of external lighting, rinse the grout bucket and the core drill
              bung out over the yard gully, and tip the last of a bottle of screenwash after it. The
              gully is a surface water drain. It runs to the ditch behind the car park, and the ditch
              runs to the brook. By the time anybody notices the white plume in the ditch, the
              groundworks gang have also washed a wheelbarrow out in the same place and the site has
              a visible discharge with no way of proving who started it. The work area is stopped
              while it is traced.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Establish one washout point before the first bucket is mixed and use it for everything.
              Ask at induction where it is; if the answer is vague, ask the site manager to point at
              it. Keep a drain mat in the van for the gully nearest your work area and put it down
              before you start wet work. Treat every outside gully as if it opens directly into the
              brook, because on most sites it effectively does, and rinse nothing into it but clean
              rainwater.
            </p>
          </>
        }
      />

      <CommonMistake
        title="Using the shade under a fenced tree as a lay-down area"
        whatHappens={
          <>
            <p>
              The drums arrive and the only flat, shaded, out-of-the-way spot is inside the tree
              fence. Nothing gets cut, nothing gets dug and the trunk is never touched, so it
              feels harmless. Three weeks later the drums come out, the fence goes back and the
              ground looks much as it did.
            </p>
            <p>
              The damage was done underground on the first day. The roots that keep the tree alive
              spread wide and sit shallow, and they are harmed by compaction as much as by cutting
              &mdash; from the drums, from the van that kept turning round in there, from three
              weeks of boots. None of it shows for a season or two, and none of it can be undone.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Treat the fence as covering the ground and the roots rather than the trunk. Nothing
              is stored, parked or dug inside it &mdash; not by machine, not by hand &mdash; until
              a route or a position has been agreed with whoever set the fence out.
            </p>
            <p>
              Sort the lay-down area at the same time you walk the boundary, before the delivery
              arrives rather than while the lorry is waiting. Where a cable route genuinely has to
              cross a protected area, ask for the alternatives: a duct pushed under, a different
              side of the building or a change of sequence usually exists, and any of them costs
              less than the argument afterwards.
            </p>
          </>
        }
      />

      <SectionRule />

      <Scenario
        title="Llandeilo — a cable drum, a trench and a stream at the bottom of the field"
        situation={
          <>
            <p>
              You are running a submain from a farm building to a new workshop on a sloping plot
              outside Llandeilo. The trench is ninety metres and the ground falls the whole way to a
              stream at the bottom boundary. It rains overnight and the trench is half full. The
              groundworker offers you his pump and points at the stream: it is downhill, it is thirty
              metres away, and it will take ten minutes. The alternative is waiting for the site
              manager to come back from another job, and you have two men standing.
            </p>
          </>
        }
        whatToDo={
          <>
            <p>
              Do not put the hose in the stream. Ring the site manager rather than waiting for him,
              and describe exactly what you have: volume, ground fall, distance to the watercourse.
              While you wait, do the work you can: pull the drum to the top of the run, set the drum
              stands back from the bank, and cut the ducts. Pump only when a discharge point is
              agreed, which will normally be a settlement area or a flat grassed area well back from
              the stream where the solids drop out before the water travels. Put a note and a
              photograph in the day book showing the water, the time you called and the instruction
              you were given.
            </p>
          </>
        }
        whyItMatters={
          <>
            <p>
              Ten minutes of pumping puts a visible silt plume into a stream that runs through two
              more properties. The cost is not the pumping. It is the work area shut while it is
              investigated, the days lost from a programme with a fixed handover, the plant standing,
              and a farm client whose neighbours can see it. Two men standing for ninety minutes is a
              known, small number. The other outcome is an unknown, large one, and the phone call
              that prevented it took ninety seconds.
            </p>
          </>
        }
      />

      <SectionRule />

      <FAQ
        items={[
          {
            question: 'How do I tell a surface water gully from a foul drain outside a building?',
            answer:
              'Often you cannot by looking, which is exactly why the safe assumption is surface water. Ask at induction or ask the site manager for the drainage drawing. On an occupied site the facilities manager usually knows. Until you have an answer, nothing but clean rainwater goes down it.',
          },
          {
            question: 'The main contractor told me to pump the trench into the ditch. Am I covered?',
            answer:
              'An instruction does not change what happens to the ditch. Ask for it in writing and say plainly what you are concerned about. In practice, once you put that in an email the instruction usually changes. If it does not, you have a record and your supervisor now owns the decision rather than you.',
          },
          {
            question: 'Does any of this apply on a domestic job with no site manager?',
            answer:
              'Yes, and there is nobody to ask, which makes your own discipline the whole of the control. The same short list works: know where the gully goes, wash out into a bucket and not the drain, keep fuel off the path and the grass, and keep dust off the neighbour.',
          },
          {
            question: 'What does external influences in the wiring standards have to do with the environment outside?',
            answer:
              'Equipment selected for the conditions lasts. Equipment selected on price fails early in a wet, salty or hot position, and every early failure means another visit, another dig, another set of materials and another disturbance to the same ground. Choosing correctly the first time is the quietest sustainability decision an electrician makes.',
          },
        ]}
      />

      <SectionRule />

      <KeyTakeaways
        points={[
          'The rules that govern how you work near the natural environment are set by others and reach you as the specification, the contract, the site rules and the standards the work is built to.',
          'Walk the boundary and find where water goes before you unload, because every liquid you release takes that same path.',
          'Treat every outside gully as a direct pipe to a watercourse until somebody proves otherwise.',
          'Silt from trenching and spoil is the most common pollution an ordinary job causes, and it is entirely preventable with settlement and set-back.',
          'Refuel and store plant on contained hard standing away from drains and slopes, with the spill kit already to hand.',
          'Wash out cement, grout and core slurry at one designated point and collect the slurry at the point it is made.',
          'A tree protection fence covers roots and soil, so no digging, storing or parking inside it without an agreed route.',
          'When the task moves beyond what you are entitled to decide, stop and ask the site manager or principal contractor, and record the answer.',
        ]}
      />

      <SectionRule />

      <ContentEyebrow>Check yourself</ContentEyebrow>
      <Quiz questions={quizQuestions} title="5.1 Industry regulation and the natural environment" />
    </div>
  );
}
