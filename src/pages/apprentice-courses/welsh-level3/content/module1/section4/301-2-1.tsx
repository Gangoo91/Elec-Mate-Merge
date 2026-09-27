/**
 * Unit 301 — Understanding Building Services Engineering Practice in Wales
 * Learning Outcome 2 — Understand connected practice in construction and building services engineering
 * Criterion 2.1 — Interdependencies between trades
 *
 * Approach: teach the site chain in the order a third-year electrician meets it — what must be
 * finished before first fix, who is stood waiting on second fix, and where the shared space runs out.
 * Dependency is split into physical, sequential and informational so the learner can name the type
 * of blockage they are looking at instead of calling everything a delay.
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
    question: 'A suspended ceiling grid has not been installed yet, so you cannot fix your luminaire hangers. What kind of dependency is this?',
    options: [
      'Physical — the thing you fix to does not exist yet',
      'Informational — nobody has told you the layout',
      'Sequential — the room is decorated in the wrong order',
      'Commercial — the luminaires have not been paid for',
    ],
    correctAnswer: 0,
    explanation: 'Physical dependency means another trade has to put something there before your work has anything to attach to. No grid, no hangers, no argument.',
  },
  {
    id: 2,
    question: 'You cannot set out socket positions in a kitchen because nobody has confirmed the final unit layout. What kind of dependency is this?',
    options: [
      'Informational — you are waiting on a decision, not on physical work',
      'Physical — the units are not built yet',
      'Sequential — the plasterer has not finished',
      'There is no dependency; you should guess and adjust later',
    ],
    correctAnswer: 0,
    explanation: 'Informational dependency is waiting on a drawing, a confirmation or a client decision. The wall is ready. The answer is not.',
  },
  {
    id: 3,
    question: 'Why is first fix carried out before the walls and ceilings are closed?',
    options: [
      'Because cables, boxes and containment have to be in place while the structure is still open',
      'Because first fix materials are cheaper earlier in the job',
      'Because the client wants to see the cables before they are covered',
      'Because testing has to be finished before plastering starts',
    ],
    correctAnswer: 0,
    explanation: 'Once the boards go on, anything you left out means cutting back into finished work. First fix exists because the window to run cables closes.',
  },
  {
    id: 4,
    question: 'You find a run of pipework crushed inside a ceiling void while you are pulling cables. What is the right move?',
    options: [
      'Report it straight away so it is a shared problem with a known cause',
      'Say nothing, because you did not cause it',
      'Straighten it yourself so it does not hold your work up',
      'Wait until the handover meeting and raise it then',
    ],
    correctAnswer: 0,
    explanation: 'Found-and-reported is a shared problem. Found-and-ignored becomes yours, because you were the last trade in that void.',
  },
  {
    id: 5,
    question: 'What is the main purpose of coordinating services through a riser or ceiling void before work starts?',
    options: [
      'To resolve clashes on paper rather than discover them with a hole saw',
      'To decide which trade is allowed on site first',
      'To reduce the number of drawings the site needs',
      'To let the electrical contractor claim the best route',
    ],
    correctAnswer: 0,
    explanation: 'Coordination is where clashes are either resolved in advance or found the expensive way. First-come is not a plan.',
  },
  {
    id: 6,
    question: 'Mechanical plant has been installed and needs supplies and controls before it can be commissioned. What does this mean for your programme?',
    options: [
      'Your supply and control work is now on the critical path for somebody else’s commissioning',
      'You can leave the supplies until after the mechanical commissioning is finished',
      'The mechanical contractor will provide the final connection themselves',
      'Commissioning can proceed on a temporary supply and be signed off later',
    ],
    correctAnswer: 0,
    explanation: 'Plant does not run without power and control. Until you energise and prove it, the mechanical commissioning cannot start.',
  },
  {
    id: 7,
    question: 'Three weeks of delay happen upstream of you on a job with a fixed handover date. What normally happens to your work?',
    options: [
      'Your work is compressed into a shorter window because the end date rarely moves',
      'Your programme moves back by the same three weeks',
      'The handover is delayed by three weeks automatically',
      'Your work is reduced in scope to fit the remaining time',
    ],
    correctAnswer: 0,
    explanation: 'Delay travels downhill and lands on the last trades in. The end date is usually the one fixed thing on the programme.',
  },
  {
    id: 8,
    question: 'Which of these is a dependency electricians most often leave off their own plan?',
    options: [
      'The builder for openings and making good, and scaffolding for access',
      'The delivery of your own cable drums',
      'The availability of your own test instruments',
      'The number of operatives in your own gang',
    ],
    correctAnswer: 0,
    explanation: 'Builders work, access and the supply side sit outside your gang but govern whether your gang can work at all.',
  },
];

export default function Lesson301_2_1() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'Your work is a link in a chain. Somebody has to finish before you start, and somebody cannot start until you finish.',
          'Dependencies come in three kinds: physical, sequential and informational. Naming the kind tells you who to chase.',
          'Risers, ceiling voids and service zones are shared and contested. Coordination is where clashes get resolved, or discovered late.',
          'Every route you take, board you fix and isolation you apply removes an option from somebody else.',
          'Delay upstream arrives at you compressed, because the handover date almost never moves.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Explain how your own work sits inside a sequence, naming what must be complete before you start and who is waiting on you to finish.',
          'Distinguish physical, sequential and informational dependencies and identify which one is actually holding a task up.',
          'Describe how shared routes such as risers, ceiling voids and service zones are coordinated, and why first-come is not a plan.',
          'Explain how damage between trades is caused, found and reported, and why an unreported defect tends to land on the last trade in the room.',
          'Describe the relationship between mechanical and electrical work on a job, including supplies, controls and the order of commissioning.',
        ]}
        initialVisibleCount={3}
      />

      <SectionRule />

      <ContentEyebrow>How the trades depend on each other</ContentEyebrow>

      <ConceptBlock
        title="You are a link in a chain, not a standalone job"
        plainEnglish="Something has to be ready before you start, and somebody is stood waiting for you to finish."
      >
        <p>
          On a site of any size your work is a middle link. First fix happens while the structure is
          still open, because once the boards and the plaster go on, the window closes. Second fix
          happens after decoration, because nobody wants a sprayed accessory or a scuffed faceplate.
          Testing happens before handover, because the certificate is part of what gets handed over.
        </p>
        <p>
          That ordering is not tradition. It is the only order that does not force somebody to undo
          finished work. The moment you take a task out of order you are asking another trade to pay
          for it.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Before you start.</strong> Structure up, openings formed, routes agreed, layout confirmed.</li>
          <li><strong>While you work.</strong> Access maintained, shared voids kept clear, changes recorded.</li>
          <li><strong>After you finish.</strong> Boarding, plastering, decoration, flooring, commissioning, handover.</li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Three kinds of dependency"
        plainEnglish="Work gets blocked for three different reasons, and the fix is different for each."
      >
        <p>
          Everything that stops you falls into one of three types. Getting the type right tells you
          whether you need a trade, a programme change or a phone call.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Physical.</strong> The ceiling grid must exist before you fix to it. The wall must be built before you chase it. No amount of chasing on the phone creates a fixing point.</li>
          <li><strong>Sequential.</strong> You cannot second fix a room that is not decorated. The work is possible, but doing it now costs somebody else a redo.</li>
          <li><strong>Informational.</strong> You cannot set out until somebody confirms the kitchen layout. The wall is ready, the tools are there, and you are waiting on a decision.</li>
        </ul>
        <p>
          Informational dependencies are the ones that get mislabelled. A gang stood in a finished
          room with no drawing is not a labour problem. It is an unanswered question, and it needs
          somebody with authority to answer it, not another pair of hands.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="301-2-1-check-1"
        question="The plasterer has finished a hallway but nobody has confirmed whether the client wants the consumer unit boxed in. You cannot fix the final position. Which dependency is this?"
        options={[
          'Informational — you are waiting on a confirmed decision',
          'Physical — the wall is not ready to take the board',
          'Sequential — the decorator has to finish first',
          'None — you should fit it and move it later if asked',
        ]}
        correctIndex={0}
        explanation="The structure is ready and the work is physically possible. What is missing is a confirmed answer, so the chase goes to whoever owns the decision."
      />

      <SectionRule />

      <ContentEyebrow>Shared space and coordination</ContentEyebrow>

      <ConceptBlock
        title="Shared routes and contested space"
        onSite="A riser is not yours. It is shared, and it fills up in the order people arrive."
      >
        <p>
          Risers, ceiling voids, floor zones and service corridors carry ventilation, pipework,
          drainage, sprinklers, data and your containment. They were sized for all of it together,
          not for whoever gets there first. A tray run pinned across the middle of a riser at head
          height might suit you perfectly and make the duct behind it impossible.
        </p>
        <p>
          Gravity has the first claim. Drainage and anything running to a fall has almost no freedom,
          so it is normally set out first. Large ducts come next because they cannot be bent around
          a problem. Cables are the most flexible thing in the void, which is exactly why they end
          up being the ones asked to move.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Gravity services.</strong> Drainage and falls — least flexible, set out first.</li>
          <li><strong>Large ducts.</strong> Fixed geometry, big clearances, awkward to divert.</li>
          <li><strong>Pipework.</strong> Some flexibility, but insulation thickness eats the space you thought you had.</li>
          <li><strong>Containment and cable.</strong> Most flexible, therefore most often moved.</li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Coordination is where clashes are resolved — or discovered"
        plainEnglish="Services get laid over each other on a drawing before anybody drills anything."
      >
        <p>
          Coordination of services means putting every discipline&rsquo;s route into one view and
          arguing about it before the materials arrive. Done properly, it produces agreed zones: this
          band of the ceiling void is duct, this band is pipework, this band is containment, and here
          is where the crossings happen.
        </p>
        <p>
          Skipped, the clash still exists. You just find it with a hole saw, halfway through a run,
          with a gang stood behind you. The clash did not appear. It was always there. The only
          variable is how much it cost when you met it.
        </p>
        <p>
          When you do hit one, say so before you solve it. A route you invent on the spot to get past
          a duct may be the route somebody else was relying on for maintenance access.
        </p>
      </ConceptBlock>

      <SectionRule />

      <RegsCallout
        source="CDM 2015"
        clause="Cooperation, coordination and communication between dutyholders"
        meaning="Dutyholders must cooperate with each other, coordinate their work, and communicate with each other so that everyone understands the risks on the job and the measures being taken to control them. On site that means telling the other trades what you are about to do, and finding out what they are about to do, before either of you starts."
        cite="HSE L153, Managing health and safety in construction"
      />

      <SectionRule />

      <ContentEyebrow>Damage and who causes it</ContentEyebrow>

      <ConceptBlock
        title="Damage between trades"
        onSite="What you drill through, what gets plastered over, what gets stood on."
      >
        <p>
          Most inter-trade damage is not vandalism. It is somebody working normally in a space where
          somebody else has already worked. You drill a fixing and catch a pipe. The plasterer skims
          over a back box nobody flagged. A cable coiled on a floor gets stood on by a scaffolder,
          then walked on by everybody else for a fortnight.
        </p>
        <p>
          The rule that matters is what happens next. Damage found and reported straight away is a
          shared problem with a known cause, a known time and usually a cheap fix. Damage found and
          ignored becomes the property of whoever was last in that space, and on a fit-out that is
          very often the electrician.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Protect what you leave.</strong> Cap ends, box in, keep cables off floors and out of door swings.</li>
          <li><strong>Flag what you cover.</strong> Mark box positions and buried routes before the boarders arrive.</li>
          <li><strong>Report what you find.</strong> Photograph it, tell the supervisor, get it logged the same day.</li>
          <li><strong>Never quietly repair somebody else&rsquo;s service.</strong> You inherit it the moment you touch it.</li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="301-2-1-check-2"
        question="Pulling cables through a ceiling void you notice a ventilation flexible duct that has been crushed flat by someone kneeling on it. Nobody saw you find it. What do you do?"
        options={[
          'Leave it — you did not cause it and it is not electrical work',
          'Pull it back into shape yourself so the void is clear',
          'Photograph it and report it to the supervisor the same day',
          'Mention it at the next handover meeting if it is still an issue',
        ]}
        correctIndex={2}
        explanation="Reporting it the day you find it keeps it a shared problem. Saying nothing makes it yours by default, because you were the last trade in that void."
      />

      <SectionRule />

      <ContentEyebrow>Your work constrains others</ContentEyebrow>

      <ConceptBlock
        title="Your decisions constrain other people"
        plainEnglish="Every choice you make takes an option away from somebody else."
      >
        <p>
          A route you choose fills a zone. A board position you fix claims a wall and a working space
          in front of it. An isolation you take stops a pump, a lift, a hoist or a set of temporary
          lights that somebody was using.
        </p>
        <p>
          None of that is wrong. It is the job. What makes it a problem is doing it silently. The
          difference between a coordinated site and a chaotic one is not how many decisions get made,
          it is how many of them were announced before they were made.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Routes.</strong> The space you take is space another discipline planned on.</li>
          <li><strong>Board and plant positions.</strong> They claim wall, floor, access and maintenance clearance.</li>
          <li><strong>Isolations.</strong> Every isolation stops somebody. Find out who before you turn the key.</li>
          <li><strong>Penetrations.</strong> A hole through a wall or floor is a structural and fire-stopping decision, not just yours.</li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="The mechanical and electrical relationship"
        onSite="Their plant does not run until your supplies and controls are live and proven."
      >
        <p>
          Mechanical plant — air handling, pumps, boilers, heat pumps, ventilation — arrives as a
          box that needs a supply, a means of isolation, and controls. Some of the controls are
          theirs, some are yours, and the boundary is always worth agreeing in writing before either
          of you orders anything.
        </p>
        <p>
          Commissioning then runs in a fixed order. You energise and prove the supply. They prove the
          plant. Then the system as a whole gets balanced and demonstrated. Your part is early in
          that sequence, which means a slip in your work stops several other people, not just you.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Supply.</strong> Rating, protective device, isolation point, and where it is physically fixed.</li>
          <li><strong>Controls.</strong> Who supplies the panel, who wires the field devices, who configures it.</li>
          <li><strong>Interlocks.</strong> Fire, ventilation and shutdown links that cross the M and E boundary.</li>
          <li><strong>Proving.</strong> Agree in advance who witnesses what, and what evidence is accepted.</li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="301-2-1-check-3"
        question="You are asked to isolate a distribution board to carry out a modification. What is the first thing you establish?"
        options={[
          'Who and what is currently being fed from that board, and who needs telling',
          'Whether the board has spare ways for the new circuit',
          'Whether the isolation can wait until the end of the working day',
          'Which test instrument you will need afterwards',
        ]}
        correctIndex={0}
        explanation="An isolation is a decision that stops other people working. Establishing the downstream loads and telling those affected comes before the work is planned."
      />

      <SectionRule />

      <ContentEyebrow>When the programme slips</ContentEyebrow>

      <ConceptBlock
        title="Delay arrives compressed, and the dependencies nobody lists"
        plainEnglish="Time lost upstream is not given back to you, and half of what stops you is not another electrician."
      >
        <p>
          When groundworks run late, or a steel delivery slips, or the client changes their mind
          about a layout, the handover date almost never moves with it. The programme absorbs the
          loss by squeezing whatever is left, and what is left is the finishing trades. Second fix,
          testing and commissioning are last, so they take the hit.
        </p>
        <p>
          The professional response is not to work faster and quieter. It is to say early and in
          writing what the compression does to your remaining work: how many operatives it needs, what
          it does to testing time, and which items cannot be safely rushed. Testing and certification
          are not compressible. Somebody has to be told that before the last week, not during it.
        </p>
        <p>
          Ask an apprentice what holds their work up and they will say materials. On a real job it is
          more often somebody whose trade has nothing to do with cable, and whose name is not on your
          part of the programme at all.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>The builder.</strong> Openings, cut-outs, lintels, blockwork and making good after you. If the builder is behind, your first fix is behind.</li>
          <li><strong>Scaffolding and access.</strong> High-level work happens when the platform exists and is signed off. A dropped scaffold takes your programme with it.</li>
          <li><strong>The dry-lining and boarding gang.</strong> They set the date by which first fix must be complete and correct.</li>
          <li><strong>Decorators and floor layers.</strong> They control when second fix can begin without damage.</li>
          <li><strong>The supply side.</strong> Anything beyond your boundary — a new or upgraded supply, a metering change, work by the distribution network operator — runs on its own timescale and is not negotiable from site.</li>
          <li><strong>The client.</strong> Layout decisions, equipment selections and access to occupied areas are all client dependencies wearing a different hat.</li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Treating a shared riser as first-come, first-served"
        whatHappens={
          <>
            A gang gets into an empty riser early and runs tray straight up the centre at a
            comfortable working height, because it is quick and the riser is empty. Three weeks later
            the ventilation contractor arrives with a duct that was always going to occupy that zone
            and now physically cannot be installed. The duct cannot bend. The tray can. The tray comes
            down, the cables come out, and the whole run is done twice — the second time around
            somebody else&rsquo;s steelwork, in a riser that is no longer empty.
          </>
        }
        doInstead={
          <>
            Before the first bracket goes in, check the coordinated service zones for that riser and
            confirm which band is yours. If no coordination has been done, say so in writing and ask
            for it rather than filling the space and hoping. Set out to the agreed zone even where it
            is less convenient, keep the crossings where they were drawn, and if you genuinely cannot
            follow the zone, raise the clash before you deviate — not after the cables are in.
          </>
        }
      />

      <CommonMistake
        title="Saying nothing about damage you did not cause"
        whatHappens={
          <>
            <p>
              Pulling cables through a void you find a flexible duct crushed flat, or a pipe with
              somebody&rsquo;s fixing through it. You did not do it, nobody saw you find it, and
              reporting it means a conversation and possibly an argument. So the cables go in, the
              ceiling goes up, and it stays exactly as it was.
            </p>
            <p>
              It surfaces weeks later, by which time the cause and the timing are gone. All that is
              left is the question of who was last working in that void, and on a fit-out that is
              very often the electrician. A shared problem with a cheap fix has quietly become
              yours.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Report it the day you find it. Photograph it, tell the supervisor, get it logged, and
              let the site decide who puts it right. While the cause and the timing are still known
              it stays a shared problem with a known fix.
            </p>
            <p>
              Do not quietly put somebody else&rsquo;s service back yourself to tidy the void up
              &mdash; you inherit it the moment you touch it. Apply the same discipline to your own
              work: cap ends, keep cables off floors and out of door swings, and mark box positions
              and buried routes before the boarders arrive.
            </p>
          </>
        }
      />

      <SectionRule />

      <Scenario
        title="Llandudno — the hotel refurbishment that lost its ceiling"
        situation={
          <>
            You are second year into a refurbishment of a seafront hotel in Llandudno. Twelve bedrooms
            on the second floor are being stripped and refitted. Your first fix is done, the
            dry-liners have boarded and the plasterers are two rooms behind them. The programme has
            you starting second fix on Monday. On Friday afternoon the mechanical contractor tells you
            their new fan coil units are 90&nbsp;mm deeper than the ones allowed for, so the ceiling
            in every bedroom has to drop by 100&nbsp;mm. Your downlight positions, your emergency
            luminaires and your ceiling-mounted detector heads are all set out to the old level, and
            six of the twelve rooms are already plastered. The handover date has not moved.
          </>
        }
        whatToDo={
          <>
            Stop and establish the facts before anybody cuts anything. Get the revised ceiling level
            in writing from the mechanical contractor and confirm it with the site manager, because a
            verbal from one trade is not a variation. Walk all twelve rooms and split them into two
            lists: rooms not yet plastered, where the drop costs you a re-set of the ceiling boxes
            and a slack allowance on the drops, and rooms already plastered, where it costs new
            openings, new making good and redecoration. Price and programme those two lists
            separately so the cost of the late information is visible and attributable. Raise the
            effect on emergency lighting and detector spacing straight away, because a 100&nbsp;mm
            drop changes the ceiling plane those were designed around and that is a design question,
            not a site fix. Ask for the plasterers to be held off the remaining six rooms until the
            level is confirmed — an hour of their waiting is cheaper than a day of your cutting out.
          </>
        }
        whyItMatters={
          <>
            This is an informational dependency that was left unanswered until it had already become
            a physical one. Nobody checked the plant dimensions against the ceiling zone, so the clash
            surfaced after six rooms of finished plaster. The cost is not the cable. It is the making
            good, the redecoration and the compressed second fix, and it will land on whichever trade
            cannot evidence when they were told. Getting the change confirmed in writing and splitting
            the rooms into cost bands is what turns it from your problem into the job&rsquo;s problem.
          </>
        }
      />

      <SectionRule />

      <FAQ
        items={[
          {
            question: 'If another trade damages my cables, whose problem is it?',
            answer: 'It is a shared problem while the cause and the timing are known, and it becomes yours the longer it goes unreported. Photograph it, log it with the supervisor the same day, and let the site decide who puts it right. Repairing it quietly and saying nothing removes the only evidence that you did not cause it.',
          },
          {
            question: 'The programme says I start second fix Monday but the decorators are nowhere near finished. What do I do?',
            answer: 'Raise it before Monday, not on Monday. Working into an undecorated room means your accessories get sprayed, scuffed or removed, and you will fit them twice. Ask for the rooms to be released in a decorated sequence so you can follow the decorators room by room rather than fighting them across the whole floor.',
          },
          {
            question: 'Who decides which services get the best route through a riser?',
            answer: 'Coordination decides it, normally in favour of the least flexible service. Drainage and anything running to a fall goes first, then large ducts, then pipework with its insulation, then containment and cable. Cables lose the argument most often precisely because they are the easiest thing to reroute.',
          },
          {
            question: 'Why does anything involving the supply side need flagging so early?',
            answer: 'Because it runs on a timescale nobody on site controls. A new or upgraded supply, a metering change or any work beyond your boundary is booked, scheduled and delivered by others, and no amount of site pressure shortens it. It has to be identified at the start of the job and tracked as its own item, not picked up in the final month.',
          },
        ]}
      />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Your work sits between other people’s work: first fix before the walls close, second fix after decoration, testing before handover.',
          'Physical dependency means the thing you fix to does not exist yet, and no phone call will create it.',
          'Sequential dependency means the work is possible but doing it now forces somebody else to redo theirs.',
          'Informational dependency means you are waiting on a confirmed decision, so chase the person who owns the decision, not another trade.',
          'Risers, ceiling voids and service zones are shared and were sized for everybody — first-come is not a plan.',
          'Damage found and reported is a shared problem; damage found and ignored becomes the property of the last trade in the room.',
          'Every route, board position and isolation you choose removes an option from somebody else, so announce it before you commit to it.',
          'Upstream delay arrives compressed because the handover date rarely moves, and testing and certification are the parts that cannot be rushed.',
        ]}
      />

      <SectionRule />

      <ContentEyebrow>Check yourself</ContentEyebrow>

      <Quiz questions={quizQuestions} title="Interdependencies between trades" />
    </div>
  );
}
