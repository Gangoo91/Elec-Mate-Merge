/**
 * Unit 301 · Learning outcome 3 · Criterion 3.2 — The factors influencing post
 * 1919 to modern construction
 *
 * Written as the physical shift an electrician can see and feel: cavity walls,
 * standardised components, dry linings, services designed in rather than added,
 * insulation arriving, and airtightness arriving after it.
 *
 * No historical claims and no dates are asserted beyond the 1919 line the
 * criterion itself draws, and no statistics are quoted.
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
    question: 'What does a cavity give an electrician that a solid wall does not?',
    options: [
      'A void behind the inner leaf that can carry a cable, and a break that keeps outside moisture off the inside face',
      'A stronger wall to fix heavy equipment to',
      'A warmer wall that needs no insulation',
      'A guaranteed route for every service',
    ],
    correctAnswer: 0,
    explanation:
      'Route and moisture break, in one detail. Both are why work in later stock is faster and less destructive than work in older stock.',
  },
  {
    id: 2,
    question: 'Standardised components changed the trade mainly because',
    options: [
      'Sizes, spacings and fittings became predictable, so work could be planned and priced before arriving on site',
      'They were cheaper than anything that came before',
      'They removed the need for testing',
      'They made every building identical',
    ],
    correctAnswer: 0,
    explanation:
      'Predictability is what lets you take off quantities from a drawing and set out a job without measuring every wall first.',
  },
  {
    id: 3,
    question: 'Why does a dry-lined wall change your fixing and your first-fix method?',
    options: [
      'The finish is a board on battens or dabs with a void behind it, so fixings must reach the structure and the void can hide services',
      'Dry lining cannot be drilled',
      'Dry lining is always structural',
      'There is no difference from wet plaster',
    ],
    correctAnswer: 0,
    explanation:
      'A plasterboard fixing in a dab-lined wall carries very little. The void behind is also where cables and pipes end up, which matters before you drill.',
  },
  {
    id: 4,
    question: 'What is the most significant change once buildings are insulated and sealed?',
    options: [
      'Warm moist air inside meets cold surfaces and condenses, so moisture becomes a design problem rather than a drying problem',
      'Heating loads increase',
      'Electrical loads decrease',
      'Ventilation becomes unnecessary',
    ],
    correctAnswer: 0,
    explanation:
      'The building no longer breathes the way older fabric does. Where that moisture goes has to be planned, including in voids where cables run.',
  },
  {
    id: 5,
    question: 'Insulation around a cable affects the installation because',
    options: [
      'It reduces the cable’s ability to lose heat, so the current-carrying capacity for that method of installation is lower',
      'It damages the insulation of the cable chemically',
      'It increases the circuit’s earth fault loop impedance',
      'It has no effect provided the cable is correctly rated',
    ],
    correctAnswer: 0,
    explanation:
      'Thermal insulation is part of the method of installation. Selecting a cable as though it runs in free air when it is buried in loft insulation is a design error.',
  },
  {
    id: 6,
    question: 'A riser, a ceiling void and a service zone all exist in later construction because',
    options: [
      'Services were designed into the building from the start rather than added afterwards',
      'They are required by BS 7671',
      'They were left over from older construction methods',
      'They are used for structural bracing',
    ],
    correctAnswer: 0,
    explanation:
      'That is the defining shift: the building anticipates its services. It also means those spaces are shared, and coordination becomes part of the job.',
  },
  {
    id: 7,
    question: 'What should you assume about a ceiling void in a commercial building?',
    options: [
      'It is shared — other trades have a claim on it and first-come is not a coordination plan',
      'It belongs to whichever trade arrives first',
      'It is reserved for electrical services',
      'It is structurally free of obstructions',
    ],
    correctAnswer: 0,
    explanation:
      'Ductwork, pipework, sprinklers and structure all compete for the same space. Filling it without reference to anyone else creates somebody else’s clash.',
  },
  {
    id: 8,
    question: 'Why does provision for water to escape matter in later construction wiring systems?',
    options: [
      'Condensation can form inside trunking, conduit and ducts, and water that cannot get out sits against conductors and terminations',
      'Water improves cooling and should be retained',
      'It only matters in outdoor installations',
      'It is a recommendation with no requirement behind it',
    ],
    correctAnswer: 0,
    explanation:
      'Where water may collect or condensation may form, provision has to be made for its escape. Sealed containment in a cold void is exactly where this bites.',
  },
];

export default function Lesson301_3_2() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'The defining change is that buildings began to anticipate their services instead of having them bolted on afterwards.',
          'Cavity construction gave you a route and a moisture break; standardisation gave you predictable sizes so work could be planned in advance.',
          'Dry lining moved the finish off the masonry and put a void behind it, which changes every fixing and hides every service.',
          'Insulation and airtightness turned moisture from something the fabric dried out into something the design has to handle.',
          'Once services are designed in, the space they occupy is shared, and coordination becomes part of the electrician’s job.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Describe the main changes in construction from the early twentieth century onward that affect electrical work.',
          'Explain what cavity wall construction gives the installer in terms of routes, moisture separation and fixing.',
          'Explain how standardised components and dimensions changed planning, take-off and setting out.',
          'Describe how insulation and airtightness alter the way moisture and heat behave inside a building.',
          'Recognise that services became designed-in features of the building, and what that means for coordination.',
        ]}
        initialVisibleCount={3}
      />

      <SectionRule />

      <ContentEyebrow>Cavity walls and standardisation</ContentEyebrow>

      <ConceptBlock
        title="The cavity, and what it hands you"
        plainEnglish="Two leaves with a gap between them: a route, and a break that keeps outside water off the inside."
      >
        <p>
          Cavity construction is the single detail that most changes what an electrician can do to a
          wall. There is an outer leaf, a gap, and an inner leaf. Water crossing the outer leaf runs down
          the cavity rather than reaching the inside face. That is why an inside wall in later stock is
          dry where the equivalent wall in older stock is not.
        </p>
        <p>
          For you the gap is also a route. A cable can be dropped down a cavity from above. A back box
          can sit in the inner leaf with space behind it. A supply can come through the wall with a
          sleeve and a fall on it. None of that is available in a solid wall.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>The cavity is not a free-for-all.</strong> Wall ties, cavity trays, closers and insulation all live in there, and cutting through a tray or a damp-proof detail puts water where it should not go.</li>
          <li><strong>Later cavities are often filled.</strong> Insulation in the gap removes the free route and changes what happens to anything you install in it.</li>
          <li><strong>The inner leaf is what holds your fixings.</strong> Its material varies from dense block to lightweight aerated block, and they behave completely differently under a fixing.</li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Standardisation, and why a job can be planned before you see it"
        onSite="Predictable sizes mean you can take off quantities from a drawing and be right."
      >
        <p>
          Older buildings were made from whatever was available at whatever size it came in. Later
          construction is assembled from components made to standard sizes: blocks, boards, joist
          centres, door openings, ceiling grids. Once the sizes are predictable, so is the work.
        </p>
        <p>
          This is what makes a proper take-off possible. You can count accessories from a layout, work
          out cable lengths from dimensions rather than by walking the building with a wheel, and set
          your first fix out to the stud centres before the boards go on.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Standard centres mean standard drilling positions.</strong> Notching and drilling zones in joists are meaningful when the joists are regular.</li>
          <li><strong>Accessory heights become a specification, not a guess.</strong> Mounting heights can be set out once and repeated across the whole building.</li>
          <li><strong>Prefabricated assemblies become possible.</strong> If the dimension is known, the assembly can be made before it arrives.</li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="301-3-2-check-1"
        question="You are first-fixing a dab-lined blockwork wall. What matters most for the accessory boxes?"
        options={[
          'The box should be fixed to the board with plasterboard fixings because it is quicker',
          'The box depth is irrelevant on a lined wall',
          'The box must be fixed back to the blockwork, not to the board, and the void behind the board must be accounted for in the box depth',
          'The cable must be clipped to the face of the board',
        ]}
        correctIndex={2}
        explanation="A dab void is typically enough to swallow a shallow box entirely, and plasterboard fixings will not hold an accessory somebody plugs and unplugs daily."
      />

      <SectionRule />

      <ContentEyebrow>Dry lining and voids</ContentEyebrow>

      <ConceptBlock
        title="Dry lining: the finish leaves the wall"
        plainEnglish="The board is not the wall. There is a gap behind it, and your fixing has to get past it."
      >
        <p>
          Wet plaster applied directly to masonry gives you a hard, continuous surface bonded to the
          structure. Dry lining gives you a board held off the masonry on dabs or battens, or a stud
          partition with nothing behind it at all. The difference matters in three ways every day.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Fixings.</strong> Anything carrying load must reach the structure behind. Board fixings are for light items, and an accessory that gets handled is not a light item.</li>
          <li><strong>Routes.</strong> The void is where services end up, which is convenient for you and dangerous for whoever drills next. Cables in that void need the same discipline as cables anywhere else.</li>
          <li><strong>Making good.</strong> Board is easy to repair and easy to damage. A hole in the wrong place is cheap to fix but visible if it is not done properly.</li>
        </ul>
        <p>
          Stud partitions bring their own rule: the studs and noggins are the structure, they are at
          known centres, and a cable passing through one needs protection at the point where somebody
          will later put a screw.
        </p>
      </ConceptBlock>

      <ContentEyebrow>Insulation and airtightness</ContentEyebrow>

      <ConceptBlock
        title="Insulation arrives, and heat stops escaping"
        plainEnglish="Insulation is part of the method of installation, not a detail happening near the cable."
      >
        <p>
          Once buildings are insulated, cables start running through, under and inside insulation. A
          cable only carries its rated current because it can lose heat to its surroundings. Surround it
          with insulation and it cannot, so the current-carrying capacity for that installation method
          falls.
        </p>
        <p>
          The trap is that this is invisible. A cable sized correctly on the drawing, installed correctly
          to the drawing, and then buried by an insulation contractor three weeks later is now
          undersized, and nothing on site announces it.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Design for where the cable will end up.</strong> Not where it is on the day you clip it.</li>
          <li><strong>Loft runs are the classic case.</strong> A run laid on the joists before the insulation goes down ends up under it.</li>
          <li><strong>Talk to whoever is insulating.</strong> A route above the insulation line, or a run in containment, is easier to agree before the material arrives.</li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="301-3-2-check-2"
        question="A lighting circuit was correctly sized for a run clipped over ceiling joists. The insulation contractor later lays insulation over the whole loft. What has changed?"
        options={[
          'Nothing — the cable size was correct when installed',
          'The earth fault loop impedance has increased',
          'The cable is now in a more thermally onerous installation method, so its current-carrying capacity for that situation has fallen and the original sizing may no longer hold',
          'The circuit’s protective device rating has changed',
        ]}
        correctIndex={2}
        explanation="The cable did not move but its surroundings did. Rating a cable is rating an installation method, and somebody else changed the method after you left."
      />

      <SectionRule />

      <ConceptBlock
        title="Airtightness, and where the moisture goes now"
        onSite="A sealed building with warm wet air inside needs somewhere for that moisture to go — and it is not your trunking."
      >
        <p>
          Insulation on its own is not enough to make a building efficient; the air has to stop leaking
          out too. Once it does, the moisture generated inside a building has nowhere to escape by
          accident. It is either ventilated out deliberately or it condenses on the coldest surface it
          can find.
        </p>
        <p>
          Cold surfaces in a sealed, insulated building tend to be in exactly the places services run:
          cold roof voids, unheated risers, the inside face of a metal enclosure on an outside wall,
          trunking crossing an unheated space. Warm moist air reaching those places leaves water behind.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Sealed containment collects water.</strong> A run of trunking in a cold void with no drainage becomes a reservoir.</li>
          <li><strong>Every penetration you make is a leakage path.</strong> A hole through an airtightness layer is somebody&rsquo;s test failure later.</li>
          <li><strong>Mechanical ventilation becomes electrical work.</strong> A sealed building needs ventilation plant, and that plant needs supplies, controls and commissioning.</li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026"
        clause="Regulation 522.3.2 — Where water may collect or condensation may form in a wiring system, provision shall be made for its escape."
        meaning="This is a requirement, not advice, and modern insulated construction is where it earns its keep. Trunking, conduit and ducts crossing cold voids will collect condensate. The provision — a weep hole at a low point, a fall to a drainage position, a gland arrangement that lets water out — has to be designed in, and it must not itself create a hazard or let contaminants reach live parts."
        cite="BS 7671 Part 5 — Selection and Erection of Equipment"
      />

      <SectionRule />

      <ContentEyebrow>Designed-in service routes</ContentEyebrow>

      <ConceptBlock
        title="Services designed in, and space that belongs to everyone"
        plainEnglish="Risers, ceiling voids and service zones exist on purpose — and every other trade knows it."
      >
        <p>
          The clearest sign of later construction is that the building has places for its services. A
          riser running the height of the building. A ceiling void above a suspended grid. A service zone
          in a floor. A plant room with a door on it.
        </p>
        <p>
          That is a huge improvement on improvising a route through a chimney. It also brings a problem
          the older stock never had: those spaces are shared, and the ductwork, the pipework, the
          sprinkler main and the structure all have a claim on them. Space in a ceiling void is finite and
          it is allocated, whether formally on a coordinated drawing or informally by whoever gets there
          first.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Check the coordination before you set out.</strong> Filling the best part of a void without reference to anyone is how a clash becomes yours to move.</li>
          <li><strong>Leave access.</strong> Anything that will need inspecting, testing or replacing has to be reachable after the ceiling goes up.</li>
          <li><strong>Segregation and support still apply.</strong> A shared void does not relax anything about how your wiring system is supported or separated.</li>
        </ul>
      </ConceptBlock>

      <ContentEyebrow>More metalwork, and new difficulties</ContentEyebrow>

      <ConceptBlock
        title="More metal in the building than there used to be"
        plainEnglish="Structural steel, metal studs, ducting and pipework all change what has to be considered for earthing and bonding."
      >
        <p>
          Older buildings are largely masonry and timber. Later construction puts a great deal more metal
          into the fabric: structural steel frames, metal stud partitions, steel decking, suspended
          ceiling grids, ductwork, and pipework in materials that conduct.
        </p>
        <p>
          Some of that metalwork is an extraneous-conductive-part and some of it is not, and telling the
          difference is a judgement you have to make rather than a rule you can apply by eye. What has
          certainly changed is the amount of metalwork present and the number of places your wiring
          system runs alongside it or passes through it.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Establish what is genuinely extraneous.</strong> Metalwork introduced into the building by the electrical installation is not the same thing as metalwork liable to introduce a potential from elsewhere.</li>
          <li><strong>Metal studs cut cables.</strong> A cable passing through a pressed metal stud needs protection at the passage, and the edges are sharper than timber.</li>
          <li><strong>Containment is a conductive part of your installation.</strong> Continuity of metal containment, and its use where it is relied upon, is a matter to be established rather than assumed.</li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="What got harder, not easier"
        onSite="Predictability cuts both ways: the tolerances are tighter and there is less room to improvise."
      >
        <p>
          It is tempting to read the change from older to modern construction as everything becoming
          simpler. Some of it did. But standardisation means the tolerances are tighter, the programme is
          tighter, and there is far less room to solve a problem by putting something somewhere else.
        </p>
        <p>
          In an old building, if a route does not work, you find another one, and nobody notices. In a
          modern building the route is drawn, the void is allocated, the accessory height is specified
          and the finish is going on next week. The skill moves from improvisation to getting it right
          before it is buried.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="301-3-2-check-3"
        question="What is the most useful summary of the difference between working in older and later construction?"
        options={[
          'Later construction is simply easier in every respect',
          'Older stock is unpredictable but forgiving; later stock is predictable but unforgiving of errors you discover after it is closed up',
          'Older stock requires more testing than later stock',
          'There is no practical difference once BS 7671 is applied',
        ]}
        correctIndex={1}
        explanation="You trade the problem of not knowing what is behind the wall for the problem of having one chance to get it right before the finish goes on."
      />

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Treating a designed service route as if it were yours alone"
        whatHappens={
          <>
            <p>
              The electrical first fix arrives at the ceiling void ahead of the mechanical contractor and
              takes the straightest, easiest line for a full run of tray, right through the middle of the
              void where the head height is best.
            </p>
            <p>
              Two weeks later the ductwork arrives and there is nowhere for it to go. The duct cannot be
              reduced, cannot be rerouted around structure, and cannot pass beneath the tray without
              dropping below the ceiling line. The tray moves. The cables are already pulled. The
              electrical contractor pays for the move and loses a week, and it is difficult to argue
              otherwise, because the coordinated drawing showed the duct in that zone all along.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Before any containment goes up in a shared void, get the coordination information and work
              to it. If there is no coordinated drawing, say so in writing and get a decision about who
              owns which zone before you start rather than after.
            </p>
            <p>
              Where you genuinely need to deviate, raise it at the time and get it agreed. A twenty-minute
              conversation at first-fix stage is cheaper than a week of rework, and it is the electrician
              who raised it who comes out of it well.
            </p>
          </>
        }
      />

      <CommonMistake
        title="Designing for the day you clip the cable rather than the finished building"
        whatHappens={
          <>
            <p>
              The loft run is set out over the joists, sized correctly for exactly that, clipped
              neatly and signed off. Three weeks later the insulation contractor arrives and lays
              the loft out to the specified depth, and every one of those cables is now buried.
              Nobody did anything wrong that day either &mdash; they installed what they were
              asked to install.
            </p>
            <p>
              The cable has not moved, but its surroundings have, and the installation method it is
              now in is far more thermally onerous than the one it was rated for. Nothing on site
              announces it. The drawing still says the run is compliant and the certificate is
              already in the file.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Design for where the cable will end up, not for where it sits on the day you fix it.
              Find out the finished insulation depth from the specification or the section before
              you set out, and if nobody can tell you, record the assumption you worked to.
            </p>
            <p>
              Then talk to whoever is insulating, before their material arrives rather than after.
              A route above the finished insulation line, or a run in containment, is easy to agree
              at that point and expensive to arrange once the loft is full.
            </p>
          </>
        }
      />

      <SectionRule />

      <Scenario
        title="A school block extension in Blaenavon"
        situation={
          <>
            <p>
              A two-storey teaching block: blockwork inner leaf, dry-lined internally, suspended ceiling
              grid throughout, a cold roof void above the top floor and a single riser serving both
              levels. The building is designed to be airtight and mechanically ventilated.
            </p>
            <p>
              Your design has a metal trunking run crossing the cold roof void to reach a distribution
              board at the far end, and a set of cable drops down the riser. The insulation to the roof
              void is being installed by others, after your first fix.
            </p>
          </>
        }
        whatToDo={
          <>
            <p>
              Two things need fixing before anything is installed. First, the trunking crossing the cold
              void will collect condensation, because warm moist air from the occupied floor will reach a
              cold metal enclosure. Provide for the water to escape: weep positions at the low points, a
              deliberate fall towards them, and gland arrangements at the ends that do not trap water
              against terminations.
            </p>
            <p>
              Second, settle the insulation question in writing before the insulation contractor arrives.
              Either the cables are routed and supported above the finished insulation line, or they are
              designed for the thermally onerous method they will end up in. Agreeing which, in an email,
              costs nothing now and is unarguable later.
            </p>
            <p>
              For the riser, get the coordination information and claim your zone formally. Leave access
              at every position that will need inspection or testing after the ceiling grid closes.
            </p>
          </>
        }
        whyItMatters={
          <>
            <p>
              Both failures are invisible on handover day and both surface later. Water in trunking shows
              up as a failed insulation resistance reading or a nuisance trip during the first cold snap,
              long after anybody remembers who installed it. An undersized run under insulation shows up
              as heat, and heat in a school roof void is not a small problem.
            </p>
            <p>
              The common factor is that modern construction closes up quickly and completely. Anything you
              did not resolve before the boards and the insulation went on is now an expensive problem
              rather than a quick one.
            </p>
          </>
        }
      />

      <SectionRule />

      <FAQ
        items={[
          {
            question: 'Can I still run a cable down a cavity?',
            answer:
              'Sometimes, but treat it as a decision rather than a default. Many cavities are insulation-filled, which removes the free space and changes the thermal environment. Where the cavity is clear, you still have ties, trays and closers to avoid, and anything you install must not bridge the cavity in a way that carries water across it.',
          },
          {
            question: 'How do I know how much insulation will end up over my cables?',
            answer:
              'Ask, and get it in writing. The specification or the architect’s section will normally show the finished insulation depth. Design the run for the finished condition, not the condition on the day you install it, and if the answer is not available, record the assumption you made.',
          },
          {
            question: 'Who owns the space in a ceiling void?',
            answer:
              'On a coordinated job, whoever the coordinated drawing gives it to. On an uncoordinated job, nobody, which is worse. If there is no coordination information, raise it — being the contractor who asked is a much better position than being the contractor who filled the void.',
          },
          {
            question: 'Is condensation in trunking really that common?',
            answer:
              'In an unheated or cold void in an otherwise warm, sealed building, yes. It is one of the standard causes of unexplained low insulation resistance readings on circuits that tested fine at installation. Providing a drainage path at the design stage is far cheaper than chasing the fault later.',
          },
        ]}
      />

      <KeyTakeaways
        points={[
          'The defining change in later construction is that buildings anticipate their services rather than having them added afterwards.',
          'A cavity gives you a cable route and a moisture break, but it also contains ties, trays and closers you must not cut through.',
          'Standardised sizes and spacings are what make take-off, pre-planning and prefabrication possible.',
          'Dry lining puts a void between the finish and the structure — fixings must reach the structure and the void will hold services.',
          'Insulation is part of the method of installation; a cable that ends up buried in it is no longer the cable you designed.',
          'Airtightness means moisture is managed deliberately, and condensation collects in cold voids where containment runs.',
          'Where water may collect or condensation may form, provision must be made for its escape — that is a requirement, not a preference.',
          'Designed service space is shared space; coordinate before you set out, and leave access for what will need reaching later.',
        ]}
      />

      <ContentEyebrow>Check yourself</ContentEyebrow>
      <Quiz questions={quizQuestions} title="Factors influencing post-1919 to modern construction" />
    </div>
  );
}
