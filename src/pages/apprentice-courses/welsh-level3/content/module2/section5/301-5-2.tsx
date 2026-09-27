/**
 * Unit 301 — Understanding Building Services Engineering Practice in Wales
 * Learning outcome 5 — Understand the relationship between trades and the environment
 * Criterion 5.2 — Ecological considerations and principles
 *
 * Approach: this page is about the living environment an electrician actually walks
 * into — a loft, a roof void, a chapel, an eaves run, a hedgerow, an outbuilding.
 * The teaching point is a discipline, not a body of knowledge: stop and ask, rather
 * than proceed. It also covers timing, habitat away from the roof, external lighting
 * and how to record what you find.
 *
 * This page names no environmental statute, regulation, policy or target, and makes
 * no statement about legal protection or penalties, because none could be verified
 * for this course. Where something may be protected, the page says so and says that
 * somebody qualified decides.
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
    question: 'Where is an electrician most likely to meet wildlife in the course of ordinary work?',
    options: [
      'In roof spaces, lofts, eaves and older buildings, where cabling and lighting work takes you',
      'In the consumer unit cupboard of a new build',
      'On the forecourt of the wholesaler',
      'Only on sites that are next to open countryside',
    ],
    correctAnswer: 0,
    explanation:
      'The trade spends its life in the parts of a building that animals also choose: warm, dark, undisturbed roof voids, gaps at the eaves, and the fabric of older buildings. That is where the encounter happens.',
  },
  {
    id: 2,
    question: 'You lift a loft hatch and see small dark droppings along a beam under a gap in the ridge. What do you do?',
    options: [
      'Stop work in that area, leave everything where it is, and report it so somebody qualified can decide',
      'Sweep them up and carry on, because the loft has to be cleared anyway',
      'Seal the gap in the ridge so nothing else can get in',
      'Finish the circuit you are on first and mention it at the end of the week',
    ],
    correctAnswer: 0,
    explanation:
      'The discipline is stop and ask. You are not being asked to identify anything. You are being asked to recognise that this is not your decision, to leave it undisturbed and to tell the right person straight away.',
  },
  {
    id: 3,
    question: 'A bird is going in and out of a gap behind the soffit where your new cable run is going. What is the correct response?',
    options: [
      'Treat it as an active nest, keep clear of that section and get the route or the timing changed',
      'Work quickly so the disturbance is short',
      'Block the gap once the bird has flown out',
      'Carry on because the cable clips are going below the soffit, not inside it',
    ],
    correctAnswer: 0,
    explanation:
      'Repeated coming and going in the breeding season means an active nest until somebody qualified says otherwise. Working fast is still disturbance, and blocking the gap is worse than the original job.',
  },
  {
    id: 4,
    question: 'Why does the time of year matter when planning roof or eaves work?',
    options: [
      'Nesting and roosting are seasonal, so the same job can be straightforward at one time of year and impossible at another',
      'Because cable is harder to pull in cold weather',
      'Because access equipment is cheaper out of season',
      'It does not matter, only the building type matters',
    ],
    correctAnswer: 0,
    explanation:
      'Seasonality is the reason this belongs in the programme conversation and not in the day it is discovered. Raising roof access early gives the job the option of doing it at a time that avoids a problem altogether.',
  },
  {
    id: 5,
    question: 'Which of these is most likely to be habitat that your work could disturb?',
    options: [
      'A stone outbuilding, an old hedgerow and a roof void, all of which offer shelter and undisturbed space',
      'A newly laid car park surface',
      'A steel container used as a site store',
      'A scaffold tower left up over a weekend',
    ],
    correctAnswer: 0,
    explanation:
      'Shelter, darkness and lack of disturbance are what matter. Old stone, dense hedge and quiet roof voids all provide them; fresh tarmac and a steel box do not.',
  },
  {
    id: 6,
    question: 'What is the main way external lighting affects wildlife?',
    options: [
      'Light spilling where it is not needed, in the wrong direction and for longer than needed, changes behaviour around roosts, hedgerows and water',
      'The colour of the luminaire housing',
      'The noise made by the driver',
      'The weight of the luminaire on the bracket',
    ],
    correctAnswer: 0,
    explanation:
      'The controllable factors are direction, spill, level and timing. A well aimed, well controlled scheme lights the surface that needs lighting and leaves the hedge, the water and the roof access point dark.',
  },
  {
    id: 7,
    question: 'Who decides whether work can continue after a possible roost is found?',
    options: [
      'Somebody qualified to assess it, appointed through the client or the principal contractor',
      'The electrician who found it',
      'The site foreman, on the basis of how urgent the programme is',
      'The building owner, on the basis that it is their building',
    ],
    correctAnswer: 0,
    explanation:
      'It is a specialist judgement. The electrician role is to stop, leave it undisturbed, report it clearly and get the answer in writing before going back into that area.',
  },
  {
    id: 8,
    question: 'What is the best way to record something you have found in a roof void?',
    options: [
      'A photograph taken from where you are standing, with the location, date and time noted, reported to one named person',
      'A close-up taken by climbing across the joists for a better angle',
      'A message on a group chat so everybody knows',
      'A verbal mention to whoever is nearest at the time',
    ],
    correctAnswer: 0,
    explanation:
      'Record it without disturbing it, and report it to a named person so there is one clear line of responsibility rather than a rumour that nobody acts on.',
  },
];

export default function Lesson301_5_2() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'The most common encounter in this trade is a bat roost or a bird nest in a roof space, a loft, an eaves gap or an old building.',
          'The discipline is simple and it is the whole of what is expected: stop work in that area, disturb nothing, and report it.',
          'You are not being asked to identify anything. Somebody qualified decides whether work can continue and how.',
          'Timing matters, so roof and eaves access should be raised in the programme long before the day it happens.',
          'External lighting is the part of the job where an electrician can reduce the effect on wildlife directly, through direction, spill, level and controls.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Describe the situations in which an electrician most often meets wildlife at work, particularly roof spaces, lofts, eaves and older buildings.',
          'Recognise the signs that a roost or an active nest may be present, without attempting to identify the species yourself.',
          'Apply the stop and ask discipline: leave the area undisturbed, report it to a named person, and wait for somebody qualified to decide.',
          'Explain why the time of year changes what is possible, and why roof and eaves access belongs in the programme conversation early.',
          'Design and site external lighting so that direction, spill, level and timing reduce the effect on hedgerows, water and roof access points.',
        ]}
        initialVisibleCount={3}
      />

      <SectionRule />

      <ContentEyebrow>Where wildlife meets the job</ContentEyebrow>

      <ConceptBlock
        title="Where this actually comes up"
        plainEnglish="This is not a countryside topic. It is a loft hatch topic."
      >
        <p>
          An electrician spends more time than almost any other trade in the quiet, dark, undisturbed
          parts of a building. Lofts, roof voids, eaves runs, church and chapel roofs, barn
          conversions, stone outbuildings, the space above a suspended ceiling in an old school. Those
          are exactly the places animals choose, for the same reasons: warm, dry, dark, nobody goes
          there.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Rewires in older housing.</strong> Slate roofs, open eaves, gaps at the verge and
            ridge.
          </li>
          <li>
            <strong>Chapels, churches and halls.</strong> Large undisturbed roof voids and a lighting
            upgrade that needs you in all of them.
          </li>
          <li>
            <strong>Barn and outbuilding conversions.</strong> The building has been quiet for
            decades and is about to stop being quiet.
          </li>
          <li>
            <strong>External lighting and eaves cabling.</strong> Working at the exact height where
            birds nest behind fascia and soffit.
          </li>
          <li>
            <strong>Solar and roof-mounted work.</strong> Lifting tiles and opening gaps that were
            somebody home last week.
          </li>
        </ul>
      </ConceptBlock>

      <ContentEyebrow>Bats, birds and the signs they leave</ContentEyebrow>

      <ConceptBlock
        title="Signs that something may be roosting"
        onSite="You will rarely see the animal. You see what it leaves."
      >
        <p>
          In daylight a roost usually looks like nothing. The signs are small and easy to walk past
          when you are carrying a drum and a drill and thinking about the job. Learn the handful that
          matter and slow down for two seconds when you put your head through a hatch.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Droppings in a line.</strong> Collected along a beam, on a wall plate, or in a
            small pile directly under a gap.
          </li>
          <li>
            <strong>Staining round a gap.</strong> A dark, greasy mark at a ridge, verge, soffit gap
            or lead flashing where something passes through repeatedly.
          </li>
          <li>
            <strong>Scratch marks and worn timber.</strong> Polished spots on rafters near an
            opening.
          </li>
          <li>
            <strong>Nest material.</strong> Twigs, grass or moss behind a soffit, in a vent terminal,
            on top of a light fitting or inside an old extract duct.
          </li>
          <li>
            <strong>Activity at dusk.</strong> If you are on site late and see repeated movement in
            and out of one gap, that is the gap.
          </li>
        </ul>
        <p>
          Seeing nothing in the middle of the day proves nothing. If the building type and the signs
          suggest a possibility, treat it as a possibility.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Nesting birds and the eaves run"
        plainEnglish="The eaves is both the easiest place to clip a cable and the most popular place to nest."
      >
        <p>
          Cable runs, external lighting brackets, alarm sounders and camera positions all end up at
          the same height as the soffit. In the breeding season that is busy territory, and it is
          obvious once you stand back and watch for a minute rather than going straight up the
          ladder.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Watch before you climb.</strong> Repeated coming and going to one point is the
            clearest signal you will get.
          </li>
          <li>
            <strong>Vents and terminals.</strong> An old extract terminal or an unused vent is a
            favourite, and it is the thing you were about to replace.
          </li>
          <li>
            <strong>Do not seal a gap to solve it.</strong> Closing the access while something is
            inside turns a delay into a much more serious problem.
          </li>
          <li>
            <strong>Do not move a nest.</strong> Not to one side, not into a box, not anywhere.
          </li>
          <li>
            <strong>Change the route or the timing.</strong> A metre either way, or two weeks later,
            usually solves it completely.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="301-5-2-check-1"
        question="You put your head into a chapel roof void and see a line of droppings along the wall plate below a gap in the stonework. What is the correct first action?"
        options={[
          'Take a close-up photograph by climbing along the wall plate',
          'Come back out, leave everything as it is, and report it to the site manager or the client before any further work in that void',
          'Brush the droppings up so the void is clean for working in',
          'Start the cabling at the far end of the void, away from the gap',
        ]}
        correctIndex={1}
        explanation="Stop and ask. Do not clean, do not get closer, and do not work at the other end of the same void on the basis that it is far enough away. Somebody qualified decides what happens next, including whether any part of the void can be worked in."
      />

      <ContentEyebrow>Stopping work and who to ask</ContentEyebrow>

      <ConceptBlock
        title="Stop and ask is the whole discipline"
        onSite="Nobody expects you to know what it is. They expect you to know that it is not your call."
      >
        <p>
          This is the part that gets assessed and the part that matters on site. The correct
          behaviour is short, it is the same every time, and it does not depend on you identifying
          anything.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Stop work in that area.</strong> Not the whole site, but that void, that eaves
            run, that section of roof.
          </li>
          <li>
            <strong>Disturb nothing.</strong> Do not clean, move, seal, poke, shine a light into it
            or take a closer look.
          </li>
          <li>
            <strong>Tell one named person.</strong> The site manager, the principal contractor, or
            on a small job the client, and your own supervisor.
          </li>
          <li>
            <strong>Get the decision in writing.</strong> An email or a signed note saying what was
            found and what has been agreed.
          </li>
          <li>
            <strong>Do not go back in until you have it.</strong> The temptation is to finish one
            circuit. Resist it.
          </li>
        </ul>
        <p>
          It may be protected. It may not be. Neither of those is a judgement an electrician is
          equipped to make, and the cost of guessing wrong in one direction is far higher than the
          cost of guessing wrong in the other.
        </p>
      </ConceptBlock>

      <ContentEyebrow>Season, timing and habitat</ContentEyebrow>

      <ConceptBlock
        title="Timing, seasons and the programme"
        plainEnglish="The same roof job can be simple in one month and stopped in another."
      >
        <p>
          Nesting and roosting are seasonal. So is the ability to get somebody out to assess a
          building, because surveys have their own seasons and their own lead times. This is why the
          expensive version of this problem is always the one discovered on the day, and the cheap
          version is the one raised at the programme meeting.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Flag roof and eaves access early.</strong> As soon as you see it on the drawing,
            not when the scaffold is up.
          </li>
          <li>
            <strong>Ask whether the building has already been looked at.</strong> On a conversion or
            a refurbishment there is often already a report, and it may already contain instructions
            for your trade.
          </li>
          <li>
            <strong>Sequence around it.</strong> Doing the ground floor first while the roof question
            is answered is normal programme management, not a delay.
          </li>
          <li>
            <strong>Build the lead time in.</strong> An assessment is not a same-day service, and
            pretending otherwise is how people end up carrying on.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Habitat away from the roof"
        onSite="Hedgerows, stone walls and outbuildings are all somebody home."
      >
        <p>
          The roof is the common one, but an external job has its own list. A submain across a field
          boundary, a duct through a hedge line, a supply to an old stone shed, a feeder pillar beside
          a mature tree with cavities in it. All of them are decisions about habitat, and all of them
          are far easier to move at the planning stage than on the day.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Hedgerows.</strong> Dense, old, and full of nests in season. Cutting a gap for
            access is not a small thing, and it is not your decision.
          </li>
          <li>
            <strong>Old stone walls and outbuildings.</strong> Gaps in the stonework and under loose
            slates are shelter.
          </li>
          <li>
            <strong>Mature trees with cavities.</strong> Treat any hole or split in an old trunk as a
            reason to route elsewhere.
          </li>
          <li>
            <strong>Ponds, ditches and damp ground.</strong> Trenching and pumping near them is a
            conversation before it is a task.
          </li>
          <li>
            <strong>Piles of material and spoil.</strong> Leave a heap for a month and something will
            move into it before you shift it.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="301-5-2-check-2"
        question="A duct route is shown crossing an old hedgerow in May, and the ground crew want to cut a gap through it for access. What is your position as the electrician on the job?"
        options={[
          'It is the ground crew task, so it is not your concern',
          'Raise it before anything is cut, because the hedge may hold active nests and the route or timing should be reviewed by somebody qualified',
          'Agree, as long as the gap is made narrow and replanted afterwards',
          'Agree, provided the work is done early in the morning',
        ]}
        correctIndex={1}
        explanation="It is your route, so it is your concern. An old hedge in the breeding season is exactly the situation where the answer is to stop and get the route or the timing reviewed. Narrow, early or replanted makes no difference to a nest that is in it now."
      />

      <SectionRule />

      <ContentEyebrow>Lighting, records and reporting</ContentEyebrow>

      <ConceptBlock
        title="Lighting and wildlife"
        plainEnglish="This is the one part of the ecological question that an electrician controls directly."
      >
        <p>
          External lighting is designed, selected and aimed by people in this trade. Light that spills
          into a hedge, across a river, or straight at the gap under a ridge tile changes behaviour
          around it. The good news is that every one of the controls is something you already know how
          to specify.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Direction.</strong> Point it at the surface that needs lighting. Downward, with a
            proper cut-off, not a floodlight tipped up at the sky.
          </li>
          <li>
            <strong>Spill.</strong> Shields, louvres and correct beam selection keep the light on the
            path and off the boundary.
          </li>
          <li>
            <strong>Level.</strong> More light is not better light. Over-lighting a yard creates glare
            and spill and costs more to run.
          </li>
          <li>
            <strong>Timing.</strong> Occupancy detection and a time control mean the lighting is on
            when somebody needs it, not from dusk to dawn out of habit.
          </li>
          <li>
            <strong>Position.</strong> Keep luminaires and their beams away from known access points
            into a roof, and away from hedgerows and water where there is a choice.
          </li>
        </ul>
        <p>
          Every one of those also reduces running cost and complaints from neighbours, which is
          usually how you sell it to the client.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Recording and reporting what you find"
        onSite="A clear note takes two minutes and settles the argument for good."
      >
        <p>
          What you record is the difference between a decision somebody can act on and a vague story
          that dies in a group chat. Keep it factual and keep your distance while you do it.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Photograph from where you stand.</strong> Do not climb closer for a better shot.
          </li>
          <li>
            <strong>Note the location precisely.</strong> Which void, which elevation, how far along,
            which gap.
          </li>
          <li>
            <strong>Note date and time.</strong> Activity at dusk is different information from
            activity at midday.
          </li>
          <li>
            <strong>Say what you did not do.</strong> That nothing was moved, cleaned or sealed.
          </li>
          <li>
            <strong>Send it to one named person and keep a copy.</strong> Then work somewhere else
            until you get an answer.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="301-5-2-check-3"
        question="Which external lighting change does most to reduce the effect on a hedgerow beside a farm yard?"
        options={[
          'Aim the luminaires down at the yard surface with a proper cut-off and put them on occupancy control',
          'Fit a higher output lamp so the yard is lit from further away',
          'Mount the floodlight higher and tilt it up to cover more ground',
          'Leave the lighting on all night so nothing is startled by it switching',
        ]}
        correctIndex={0}
        explanation="Direction, spill and timing are the controls. Aiming down with a cut-off keeps light off the hedge, and occupancy control means it is only lit when somebody is there. Higher output, upward tilt and all-night running each make the spill worse."
      />

      <SectionRule />

      <RegsCallout
        source="CDM 2015"
        clause="Regulation 17 — safe places of construction work: suitable and sufficient safe access to and egress from every place of work, the site kept safe and without risks to health, and sufficient working space arranged to suit anyone working there."
        meaning="Roof voids, lofts and eaves are where this topic lives, and they are also where access is worst. If the only way to look at a possible roost is to crawl along a wall plate on your elbows, the honest answer is that there is no safe place of work there yet. Getting proper access arranged is the same conversation as getting the ecological question answered, and both are reasons to come back out rather than press on."
        cite="HSE L153, Managing health and safety in construction"
      />

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Tidying up the evidence and carrying on"
        whatHappens={
          <>
            <p>
              An apprentice opens a loft on a rewire in an old terrace, finds droppings along the
              purlin, and does what a tidy tradesperson does: brushes them into a bag, puts a board
              down and starts clipping. Two days later the roofer reports a roost to the client, an
              assessment is arranged, and the first question is how long the loft has been worked in
              and what was disturbed. Nobody can answer it. The rewire is stopped in the whole roof
              area, the plasterer behind you loses his week, and the conversation about who pays for
              the delay lands on the electrical contractor because his people were in there first.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Treat droppings as information, not mess. Come back out of the hatch, photograph what
              you can see from where you are, note the date, the time and the exact position, and
              send it to the site manager and your supervisor the same hour. Work somewhere else in
              the building. When the answer comes back, keep the email. If the answer is that work can
              continue with conditions, follow them exactly, including any restriction on lighting,
              timing or which part of the void you may enter.
            </p>
          </>
        }
      />

      <CommonMistake
        title="Aiming the floodlight at the problem instead of at the ground"
        whatHappens={
          <>
            <p>
              The farmer wants the yard lit, so a floodlight goes on the gable, tilted up to throw
              as far as possible, wired straight off a photocell and left running dusk to dawn.
              Job done in an afternoon, and it certainly lights the yard.
            </p>
            <p>
              It also lights the hedge along the boundary, the water at the bottom of the yard and
              the gap under the ridge tiles all night, every night. The bill goes up, the
              neighbour rings about glare through a bedroom window, and the one part of this whole
              subject the electrician actually controls has been handed away without a thought.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Light the surface that needs lighting. Aim downward with a proper cut-off, choose the
              beam for the area rather than for the maximum throw, and add shields or louvres where
              spill would otherwise reach a boundary. Keep luminaires and their beams away from
              hedgerows, water and known roof access points where the position allows a choice.
            </p>
            <p>
              Then control when it is on. Occupancy detection with a time control means the yard is
              lit when somebody is in it rather than out of habit, and more light is not better
              light &mdash; over-lighting just adds glare and spill. Every one of those choices
              also cuts the running cost and the complaints, which is usually how you sell it to
              the client.
            </p>
          </>
        }
      />

      <SectionRule />

      <Scenario
        title="Dolgellau — a chapel rewire, a slate roof and something in the ridge"
        situation={
          <>
            <p>
              You are second week into rewiring a chapel in Dolgellau. The lighting is being taken out
              of the roof void and the scaffold is booked for another eight working days. You go up to
              set out the first of the new luminaire positions and, in the torch beam, there is dark
              staining round a gap at the ridge and a scatter of droppings on the plaster below it.
              The chapel secretary is keen; the reopening service is already announced. Your mate says
              he has seen the same in half the chapels in the county and nobody ever stops.
            </p>
          </>
        }
        whatToDo={
          <>
            <p>
              Come down. Do not clean anything, do not put a light on the gap and do not start at the
              other end. Photograph the staining and the droppings from the hatch, note the elevation,
              the position along the ridge, the date and the time. Send it to your supervisor and to
              the chapel secretary in one email, saying plainly that work in the roof void has stopped
              and that somebody qualified needs to look at it before it restarts. Ask the same day
              whether the building has already been assessed for the reroofing works, because there
              may be a report that already answers it. Then move the gang onto the ground floor
              circuits, the vestry and the external supply, which are all on the same programme and do
              not touch the void.
            </p>
          </>
        }
        whyItMatters={
          <>
            <p>
              The cost of stopping is real: scaffold hire running, a service date under pressure and a
              client who does not want to hear it. The cost of not stopping is an unknown that lands on
              your employer, because you were the last trade in the void and there is a dated
              photograph of nothing. The chapel example is also the one that comes up again and again
              in this trade in Wales, which is why the habit is worth building now. Stopping for two
              days at the right moment is a programme problem. Carrying on is somebody else deciding
              what happens to your contract.
            </p>
          </>
        }
      />

      <SectionRule />

      <FAQ
        items={[
          {
            question: 'How do I know whether it is a bat roost or just a mess in an old loft?',
            answer:
              'You do not, and you are not expected to. That is the point of the discipline. Report what you can see, describe it factually, and let somebody qualified decide. Guessing that it is nothing is the only answer that can go badly wrong.',
          },
          {
            question: 'Does the work have to stop across the whole building?',
            answer:
              'Usually not. What stops is work in that area — the void, the eaves run, the section of roof. Moving the gang to another part of the building is normal and is what a well run job does while the question is answered.',
          },
          {
            question: 'The client is paying and tells me to get on with it. What then?',
            answer:
              'Put it in writing that work in that area has stopped and why, and pass it to your supervisor. An instruction from a client does not make the decision for you, and having said it clearly in an email is what protects you and your employer if it becomes a dispute.',
          },
          {
            question: 'Is there anything I can do at the design stage to avoid the whole problem?',
            answer:
              'Yes. Keep routes out of hedgerows and old roof voids where there is an alternative, raise roof access early so the timing can be chosen, aim external lighting down and away from roof gaps and boundaries, and put outdoor lighting on occupancy control rather than dusk to dawn.',
          },
        ]}
      />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Roof spaces, lofts, eaves and older buildings are where this trade meets wildlife, and that is the situation to prepare for.',
          'Learn the signs rather than the species: droppings in a line, greasy staining round a gap, worn timber, nest material and activity at dusk.',
          'Seeing nothing in daylight proves nothing, so treat a likely building as a likely building.',
          'The discipline is stop work in that area, disturb nothing, report it to one named person, and wait for the decision in writing.',
          'Never clean, move, seal or block anything to make the problem go away, because sealing an access point is worse than the original job.',
          'Timing is seasonal, so raise roof and eaves access at the programme stage when the route or the sequence can still be changed.',
          'Hedgerows, old stone outbuildings, trees with cavities and damp ground are habitat too, and they sit on exactly the routes electricians choose.',
          'External lighting is where an electrician has direct influence, through direction, cut-off, level, position and occupancy control.',
        ]}
      />

      <SectionRule />

      <ContentEyebrow>Check yourself</ContentEyebrow>
      <Quiz questions={quizQuestions} title="5.2 Ecological considerations and principles" />
    </div>
  );
}
