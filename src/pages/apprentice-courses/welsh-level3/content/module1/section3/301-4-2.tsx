/**
 * Unit 301 · Learning outcome 4 · Criterion 4.2 — Post-1919 and modern
 * construction techniques and building services
 *
 * The working method for later stock, set against 4.1. Here the fabric is
 * predictable and the difficulty is the opposite one: tight programmes, shared
 * service space, sequences that cannot be unwound, and a building that closes
 * up fast.
 *
 * No historical claims, no statistics. Duties named are verified; everything
 * else is described as contract and site practice.
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
    question: 'What is the defining difficulty of working in later construction, compared with older stock?',
    options: [
      'The building closes up quickly and the sequence cannot be unwound, so errors get buried',
      'The fabric is unpredictable',
      'There are no service routes',
      'Fixings never hold',
    ],
    correctAnswer: 0,
    explanation:
      'You trade the problem of not knowing what is behind the wall for the problem of having one chance before the boards and the finishes go on.',
  },
  {
    id: 2,
    question: 'First fix in modern construction is defined by',
    options: [
      'Everything that must be in place before the structure is closed up by boarding, screeding or ceilings',
      'Everything installed in the first week',
      'The consumer unit and main earthing only',
      'Whatever the programme calls first fix',
    ],
    correctAnswer: 0,
    explanation:
      'It is a physical deadline, not a calendar one. Once the void closes, anything missing becomes a far more expensive job.',
  },
  {
    id: 3,
    question: 'Why do fire-stopping and penetration sealing matter more in modern construction?',
    options: [
      'The building is divided into compartments and every service penetration you make breaches one',
      'Because modern materials burn more readily',
      'Because there are fewer walls',
      'Because insurers require it and nothing else does',
    ],
    correctAnswer: 0,
    explanation:
      'Compartmentation only works if the penetrations through it are properly sealed. Your hole is somebody’s breach unless it is made good correctly.',
  },
  {
    id: 4,
    question: 'What does BS 7671 require about the support of every cable or conductor?',
    options: [
      'Regulation 522.8.5 requires every cable or conductor to be supported so it is not exposed to undue mechanical strain, and so no appreciable strain reaches the terminations',
      'Support is required only for cables above 2.5 mm²',
      'Cables in containment need no support',
      'Support requirements apply only to vertical runs',
    ],
    correctAnswer: 0,
    explanation:
      'It applies to every cable. Long vertical drops in risers and cables pulled hard through a modern building are where it is most often ignored.',
  },
  {
    id: 5,
    question: 'A cable pulled into a riser with a long vertical drop needs particular attention to',
    options: [
      'Support along the drop, so the weight of the cable is not carried by the terminations at the top',
      'Its colour coding',
      'Its insulation resistance only',
      'The type of gland used at the bottom',
    ],
    correctAnswer: 0,
    explanation:
      'The mass of a long drop is significant, and a termination is not a support. Strain at a termination is a fault waiting to happen.',
  },
  {
    id: 6,
    question: 'Who resolves a clash between electrical containment and ductwork in a ceiling void?',
    options: [
      'Coordination before installation — resolving it after both are installed means somebody pays to move',
      'Whichever trade installed first',
      'The client',
      'The building control body',
    ],
    correctAnswer: 0,
    explanation:
      'Coordination is the process that either resolves the clash on paper or discovers it on site. The second is always more expensive.',
  },
  {
    id: 7,
    question: 'Access provision in a modern building means',
    options: [
      'Anything that will need inspecting, testing or replacing must remain reachable after the finishes go on',
      'Access for construction traffic',
      'Providing a key to the plant room',
      'A requirement that applies only to plant rooms',
    ],
    correctAnswer: 0,
    explanation:
      'A joint above a fixed plasterboard ceiling is a joint nobody will ever inspect. Access is a design decision made before the ceiling closes.',
  },
  {
    id: 8,
    question: 'Prefabricated and pre-wired assemblies shift the risk mainly to',
    options: [
      'The interfaces — where the factory-made item meets the site-installed work',
      'The factory’s testing regime',
      'The transport of the module',
      'The design of the module itself',
    ],
    correctAnswer: 0,
    explanation:
      'The manufactured part is usually consistent. Defects concentrate at the joints between it and everything else, and those are site work.',
  },
];

export default function Lesson301_4_2() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'Later construction is predictable, so the difficulty moves from not knowing the fabric to not being able to change anything after it closes up.',
          'First fix is a physical deadline set by the boarder, the screeder and the ceiling fixer, not by the programme date.',
          'Every penetration you make through modern structure is a breach of something — a compartment, an airtightness layer, or both.',
          'Service space is shared and allocated; coordinate before you set out or you will be the one who moves.',
          'Anything that will need inspecting, testing or replacing has to remain reachable after the finishes go on.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Plan electrical work around the construction sequence in later stock, and recognise first fix as a physical deadline.',
          'Select fixing and installation methods suited to blockwork, dry lining, stud partitions and suspended ceilings.',
          'Explain why compartmentation and penetration sealing change how holes through modern structure are treated.',
          'Coordinate the use of shared service space, and provide access for what will need reaching after handover.',
          'Describe where the risk sits when part of the installation is prefabricated or pre-wired off site.',
        ]}
        initialVisibleCount={3}
      />

      <SectionRule />

      <ContentEyebrow>Sequence and fixings</ContentEyebrow>

      <ConceptBlock
        title="The sequence runs the job"
        onSite="First fix ends when the boarder arrives, whatever the programme says."
      >
        <p>
          In later construction the order of work is fixed by the build-up itself. Containment and cables
          go in while the structure is open. Boards go on. Screed goes down. Ceilings go up. Decoration
          happens. Second fix follows decoration. Testing and commissioning follow second fix. Handover
          follows testing.
        </p>
        <p>
          Every one of those steps closes a door behind it. Missing a first-fix drop before the boards go
          on does not cost you the twenty minutes it would have taken; it costs a board out, a repair, a
          decorator and an argument.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Work to the physical deadline.</strong> Find out when the boarder is starting in each area and work back from that.</li>
          <li><strong>Walk the area before it closes.</strong> A last check against the layout, on the day, catches the drop that was never marked out.</li>
          <li><strong>Leave draw wires where there is any doubt.</strong> A spare capped route through a wall costs almost nothing and saves a great deal.</li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Fixing into modern materials"
        plainEnglish="Predictable does not mean strong — lightweight block and plasterboard both need the right fixing."
      >
        <p>
          The fabric is consistent, which makes fixing easier to plan, but consistency is not strength.
          Lightweight aerated block crumbles under a standard plug used too aggressively. Plasterboard on
          dabs will not carry an accessory that gets handled daily. A stud partition holds well if you
          find the stud and holds nothing if you do not.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Dense block and lightweight block are different problems.</strong> Establish which you have before ordering the fixings for the job.</li>
          <li><strong>Reach the structure.</strong> On dab-lined walls the accessory box goes back to the blockwork, and the box depth has to allow for the dab void.</li>
          <li><strong>Use the stud, or use a proper cavity fixing.</strong> Guessing at a stud position and hoping is how a socket ends up hanging off a wall.</li>
          <li><strong>Suspended ceiling grid is not a support.</strong> The grid carries tiles. Anything heavier goes to the structure above on its own drops.</li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="301-4-2-check-1"
        question="You need to install a run of luminaires in a suspended ceiling. How should they be supported?"
        options={[
          'From the grid, because that is what the grid is for',
          'From the containment carrying their supply cables',
          'Independently from the structure above, not from the ceiling grid, unless the grid is specifically rated to carry them',
          'From the tiles themselves',
        ]}
        correctIndex={2}
        explanation="The grid is designed to carry tiles. Hanging equipment from it distorts it, and distorted grid is visible across the whole ceiling."
      />

      <SectionRule />

      <ContentEyebrow>Breaching fire and fabric barriers</ContentEyebrow>

      <ConceptBlock
        title="Every hole breaches something"
        plainEnglish="Compartment walls, floors and airtightness layers are only as good as the holes through them."
      >
        <p>
          Modern buildings are divided into compartments so that fire and smoke are contained, and they
          are wrapped in continuous layers intended to stop air and moisture moving. Services have to
          cross both, and every crossing is a deliberate breach that has to be closed properly.
        </p>
        <p>
          A penetration sealed with expanding foam because that is what was in the van is not a sealed
          penetration. The seal has to be an appropriate system for that construction, installed the way
          it was tested, and recorded.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Know which walls and floors are compartment lines.</strong> They are not always the ones that look substantial.</li>
          <li><strong>Plan penetrations rather than making them as you go.</strong> One properly sealed penetration carrying several services beats six unplanned ones.</li>
          <li><strong>Establish who seals and who records.</strong> It is frequently a specialist, and it is frequently assumed to be someone else.</li>
          <li><strong>An airtightness breach is measured.</strong> The test produces a number and the number has your holes in it.</li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026"
        clause="Regulation 522.8.5 — Every cable or conductor shall be supported in such a way that it is not exposed to undue mechanical strain, and so that there is no appreciable mechanical strain on the terminations of the conductors."
        meaning="This applies to every cable, and modern construction is where it is most often forgotten. Long vertical drops in risers carry real weight, and a termination is not a support. Cables pulled hard through a long run of conduit, cables draped across a ceiling void between two distant supports, and cables hanging from their own glands at the top of a riser are all the same failure: strain reaching a connection that was never intended to carry it."
        cite="BS 7671 Part 5 — Selection and Erection of Equipment, Chapter 52"
      />

      <SectionRule />

      <ContentEyebrow>Risers, voids and access</ContentEyebrow>

      <ConceptBlock
        title="Risers, voids and shared space"
        onSite="The best line through a ceiling void is the one three other trades also want."
      >
        <p>
          Designed service space is the great advantage of later construction and the source of most of
          its arguments. A riser and a ceiling void are finite, and the ductwork, the pipework, the
          sprinkler main, the structure and your containment all need a share.
        </p>
        <p>
          On a coordinated job, that share has been allocated on a drawing and your job is to work to it.
          On an uncoordinated job, nobody has allocated anything and the space goes to whoever is quickest,
          which is a very bad way to build a building.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Get the coordination information before you set out.</strong> Not after the tray is up.</li>
          <li><strong>If there is none, say so in writing.</strong> Being the contractor who asked is a strong position; being the one who filled the void is not.</li>
          <li><strong>Deviations get raised, not absorbed.</strong> A twenty-minute conversation at first fix beats a week of rework.</li>
          <li><strong>Segregation still applies.</strong> A crowded void does not relax anything about separation from other services.</li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Access, or the joint nobody will ever see again"
        plainEnglish="If it needs inspecting, testing or replacing, somebody has to be able to reach it."
      >
        <p>
          A suspended grid ceiling is accessible: lift a tile. A fixed plasterboard ceiling is not.
          A screeded floor is not. A sealed riser with no access panel is not. Every one of those is a
          place where a joint or an accessory can be installed and then never seen again.
        </p>
        <p>
          Deciding where accessible junctions and access panels go is a design decision, and it has to be
          made before the ceiling closes. Afterwards it is a builder&rsquo;s job and somebody&rsquo;s
          budget.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Prefer maintenance-free arrangements where access is impossible.</strong> If a connection genuinely cannot be reached again, it must be one that does not need reaching.</li>
          <li><strong>Ask for access panels early.</strong> They are cheap when the ceiling is being designed and expensive when it is being cut.</li>
          <li><strong>Record where things are.</strong> An accessible joint nobody can find is an inaccessible joint.</li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="301-4-2-check-2"
        question="A junction is needed above a fixed plasterboard ceiling with no access panels planned. What is the right response?"
        options={[
          'Either get an access panel provided, or rearrange the circuit so the connection is in an accessible position or is of a maintenance-free type',
          'Install the junction and note it on the certificate',
          'Install the junction and tell the client where it is',
          'Use a larger enclosure so it lasts longer',
        ]}
        correctIndex={0}
        explanation="Recording an inaccessible joint does not make it accessible. Change the arrangement or get the access provided, and do it before the ceiling goes up."
      />

      <SectionRule />

      <ContentEyebrow>Prefabrication and setting out</ContentEyebrow>

      <ConceptBlock
        title="Prefabrication: the risk sits at the joints"
        onSite="The module is usually fine. The place where it meets your work is where the defects are."
      >
        <p>
          Pre-wired risers, plant skids, bathroom pods and modular assemblies arrive complete and
          consistent. That is the point of them. What they cannot arrive with is the connection to
          everything else, and that connection is site work done under time pressure at an interface
          between two parties.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Test the interfaces properly.</strong> Do not treat a factory-tested assembly as evidence that its site connections are sound.</li>
          <li><strong>Know what was tested and by whom.</strong> A factory test certificate covers the factory&rsquo;s scope, not yours.</li>
          <li><strong>Tolerances are tighter.</strong> Two manufactured items meeting on site have no adjustment in them, and neither does the gap between them.</li>
          <li><strong>Late changes are remanufacture.</strong> Information for a prefabricated element has to be right much earlier than for site-built work.</li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Setting out once, and repeating it"
        plainEnglish="Standard dimensions mean the same decision can be made once and applied everywhere."
      >
        <p>
          The one thing later construction gives you that older stock never will is repetition. Rooms are
          the same. Partitions are at known centres. Mounting heights are in the specification. That
          means the setting out is a decision made once, properly, and then reproduced.
        </p>
        <p>
          Used well this is where the productivity comes from. A datum marked at the same height in
          every room, a jig or a marked rod for accessory positions, containment set out to the same
          level throughout, and boxes fixed to the same detail every time. Used badly, it is where a
          single error gets repeated across a hundred rooms before anyone notices.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Establish the datum from the finished floor level.</strong> Not from the slab, which is not where the occupant stands.</li>
          <li><strong>Check the first one against the specification.</strong> Then check the second. Then repeat with confidence.</li>
          <li><strong>Watch for the rooms that are not standard.</strong> Accessible provision, plant spaces and anywhere a bulkhead or a worktop changes the height.</li>
          <li><strong>A repeated error is a repeated cost.</strong> Getting the first room signed off before completing the rest is cheap insurance.</li>
        </ul>
      </ConceptBlock>

      <ContentEyebrow>Working in occupied buildings</ContentEyebrow>

      <ConceptBlock
        title="Occupied buildings and refurbishment"
        plainEnglish="Most later-stock work is not new build — it is altering a building somebody is using."
      >
        <p>
          The largest part of the work in post-war stock is not construction, it is alteration: a new
          distribution board in an occupied office, a rewire of a school over a summer, a new tenancy fit
          out in a building where the floor above is trading.
        </p>
        <p>
          The technical work is ordinary. The constraints are not. You are working around people, around
          live systems you did not install, and around a programme where the building has to function on
          Monday morning.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Plan isolations as events.</strong> Who is affected, when, for how long, and who agreed it.</li>
          <li><strong>Assume the existing records are wrong.</strong> Board schedules in occupied buildings are rarely current, and circuits have been altered by people who did not update them.</li>
          <li><strong>Leave it safe every night.</strong> An occupied building does not close behind a hoarding when you go home.</li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="301-4-2-check-3"
        question="You are altering a distribution board in an occupied office and the existing schedule does not match what you find. What do you do?"
        options={[
          'Work to the existing schedule because it is the official record',
          'Isolate the whole board and work it out as you go',
          'Establish what each way actually feeds by proving it, update the schedule, and agree any isolation with the people affected before switching anything off',
          'Label the ways you are adding and leave the rest',
        ]}
        correctIndex={2}
        explanation="An out-of-date schedule in an occupied building is how somebody's server or somebody's freezer goes off unannounced. Prove it, then plan the isolation."
      />

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Missing the close-up and paying for it three times"
        whatHappens={
          <>
            <p>
              The programme said first fix on that floor runs to the end of the week. The boarder started
              on Wednesday in the area nobody mentioned. Two drops were never installed, one of them for
              a socket the layout added at the last revision that never reached the site copy.
            </p>
            <p>
              The cost is not one repair. It is a board out, a cable installed badly because the access is
              now poor, a patch, a decorator, and a delay to the finishing trades in that room. It is also
              the credibility of the electrical contractor on that job, which is spent for the duration.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Track the physical close-up, not the programme line. Ask the boarder, not the programme,
              which area is next. Walk each area against the current layout revision on the day before it
              closes, and check you are working to the current revision at all.
            </p>
            <p>
              Where the design is still moving, install a capped spare route or a draw wire to the
              positions most likely to change. It costs a few pounds and it turns a board-out into a pull
              through.
            </p>
          </>
        }
      />

      <CommonMistake
        title="Assuming somebody else is sealing the holes you made"
        whatHappens={
          <>
            <p>
              The cables go through the compartment wall on Tuesday and the sealing is left, because
              on this job a specialist does the fire-stopping. Nobody has told the specialist those
              penetrations exist, there is no schedule of them, and the ceiling goes up on Friday.
              Two of them are still open and nobody can now see that they are.
            </p>
            <p>
              The van-foam version is no better. A hole closed with whatever was to hand is not a
              sealed penetration, because the seal has to be an appropriate system for that
              construction, installed the way it was tested. The airtightness test then produces a
              number with your holes in it, and the number belongs to somebody who has to improve it.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Establish at the start which walls and floors are compartment lines, who seals
              penetrations and who records them. All three get assumed and all three need an
              answer in writing, because a penetration everybody thinks is somebody else&rsquo;s is
              the one that stays open.
            </p>
            <p>
              Then plan the crossings instead of making them as you go. One properly sealed
              penetration carrying several services beats six unplanned ones, it is easier to seal
              correctly, and it is far easier to record.
            </p>
          </>
        }
      />

      <SectionRule />

      <Scenario
        title="An office refurbishment in Newport"
        situation={
          <>
            <p>
              Three floors of a nineteen-seventies office block being refitted for a single tenant. Blockwork
              structure, new stud partitions, new suspended ceilings throughout and a new raised floor on
              two of the three levels. The middle floor stays occupied and trading throughout.
            </p>
            <p>
              The existing riser is full of legacy cabling, much of it unidentified. The mechanical
              contractor is installing new ductwork in the same ceiling voids, and the ceiling grid goes up
              four weeks after your first fix starts.
            </p>
          </>
        }
        whatToDo={
          <>
            <p>
              Deal with the riser before anything else. Establish what is live and what is dead by proving
              it rather than by reading old labels, agree with the client what can be removed, and get the
              dead material out. A congested riser full of unknown cable is both a coordination problem and
              a safety problem, and it will not improve on its own.
            </p>
            <p>
              Get the ceiling void coordination settled with the mechanical contractor in the first week.
              Agree zones, put them on a drawing that both parties hold, and work to it. Where your route
              has to cross theirs, agree the level at the crossing rather than discovering it with a tape
              measure later.
            </p>
            <p>
              For the occupied middle floor, plan every isolation as a scheduled event with the tenant:
              what goes off, when, for how long, who confirmed it. Assume the existing board schedule is
              wrong and prove each way before you rely on it.
            </p>
            <p>
              Before the grid goes up on each floor, walk the area against the current layout revision and
              confirm every drop and every access requirement. Get access panels agreed where the ceiling
              is fixed rather than tiled.
            </p>
          </>
        }
        whyItMatters={
          <>
            <p>
              Each of these is cheap now and expensive later. Clearing the riser is a day&rsquo;s work
              before the new cabling goes in and an impossibility afterwards. Coordinating the void is a
              meeting before first fix and a week of rework after it. Proving the board schedule is an
              afternoon; taking down a trading floor by accident is a claim.
            </p>
            <p>
              The pattern across all of them is the same one that defines later construction: the building
              closes up, the programme moves on, and the window to do something properly is short and does
              not reopen.
            </p>
          </>
        }
      />

      <SectionRule />

      <FAQ
        items={[
          {
            question: 'How do I find out when an area is actually closing up?',
            answer:
              'Ask the trade that closes it. The boarder, the screeder or the ceiling fixer knows what they are starting tomorrow, and that information is often more current than the programme. Build the habit of a short conversation each week with whoever is following you.',
          },
          {
            question: 'Who is responsible for fire-stopping my penetrations?',
            answer:
              'It depends entirely on the contract, which is why it needs establishing at the start rather than at the end. On many jobs it is a specialist working to a schedule of penetrations. What causes problems is everybody assuming it is somebody else and nobody recording what was sealed.',
          },
          {
            question: 'Is it worth installing spare routes and draw wires?',
            answer:
              'On any job where the design is still moving, yes. A capped spare conduit through a wall or a draw wire left in a riser costs very little and converts a future board-out into a pull-through. It is one of the cheapest forms of insurance available on a construction site.',
          },
          {
            question: 'How much can I rely on a factory test certificate for a pre-wired assembly?',
            answer:
              'For what it covers, fully — it is a proper test of the manufacturer’s scope. For anything outside that scope, not at all. Establish exactly where the factory’s responsibility ends, and test the site connections as thoroughly as you would test any other connection you made.',
          },
        ]}
      />

      <KeyTakeaways
        points={[
          'The construction sequence runs the job — first fix ends when the structure physically closes up, not on the programme date.',
          'Consistent modern materials still need the right fixing: lightweight block, dab-lined board and stud partitions each behave differently.',
          'A suspended ceiling grid carries tiles; anything heavier is supported independently from the structure above.',
          'Every service penetration breaches a compartment line, an airtightness layer or both, and must be sealed with an appropriate system and recorded.',
          'Regulation 522.8.5 requires every cable to be supported so no appreciable mechanical strain reaches its terminations — long riser drops are where this is forgotten.',
          'Shared service space must be coordinated before installation; resolving a clash after both services are in means somebody pays to move.',
          'Access for inspection, testing and replacement is a design decision made before the ceiling closes, not a note on a certificate afterwards.',
          'Prefabrication concentrates risk at the interfaces between factory-made items and site work, and that is where the testing effort belongs.',
        ]}
      />

      <ContentEyebrow>Check yourself</ContentEyebrow>
      <Quiz questions={quizQuestions} title="Post-1919 and modern construction techniques" />
    </div>
  );
}
