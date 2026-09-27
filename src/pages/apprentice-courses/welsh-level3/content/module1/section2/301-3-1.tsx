/**
 * Unit 301 · Learning outcome 3 · Criterion 3.1 — The factors influencing
 * pre-1919 construction
 *
 * Written as what an electrician actually meets in an old building and why the
 * fabric behaves the way it does. Solid walls, lime, timber, local stone, no
 * designed service routes, and a century of other people's alterations.
 *
 * No historical claims are made and no dates are asserted beyond the 1919 line
 * the criterion itself draws. Where a duty is named it is a duty we can verify.
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
    question: 'What is the single biggest structural difference an electrician meets in an older building?',
    options: [
      'The external walls are usually solid, with no cavity to run anything through',
      'The walls are thinner than modern walls',
      'There are no external walls above first floor',
      'The walls are always timber framed',
    ],
    correctAnswer: 0,
    explanation:
      'A cavity is a ready-made route and a ready-made moisture break. A solid wall gives you neither, and everything you do to it is either surface mounted or chased.',
  },
  {
    id: 2,
    question: 'Why does lime mortar change how you fix to an older wall?',
    options: [
      'It is softer than cement, so a fixing can pull through or crumble the joint rather than hold',
      'It conducts electricity and cannot be drilled',
      'It sets harder than cement and blunts every bit',
      'It prevents the use of any mechanical fixing at all',
    ],
    correctAnswer: 0,
    explanation:
      'Soft bedding means the load has to be spread or taken into the masonry unit itself. A plug sized for modern blockwork will often spin in a lime joint.',
  },
  {
    id: 3,
    question: 'An older solid wall handles moisture by which principle?',
    options: [
      'Letting it move through the fabric and evaporate away again',
      'Blocking it entirely with an impermeable barrier',
      'Draining it down a cavity to a weep hole',
      'Pumping it out mechanically',
    ],
    correctAnswer: 0,
    explanation:
      'The fabric gets damp and dries again. Sealing one face with something impermeable stops the drying but not the wetting, and the moisture simply goes somewhere else.',
  },
  {
    id: 4,
    question: 'Why does the hardness of the masonry vary so much between jobs in different parts of Wales?',
    options: [
      'Older buildings were largely built from whatever stone or brick was available nearby',
      'The building regulations set a different hardness for each county',
      'Stone gets harder the further north you go',
      'It is the mortar that varies, not the stone',
    ],
    correctAnswer: 0,
    explanation:
      'Transport was the constraint, so the material was local. That is why one job eats SDS bits and the next lets you push a fixing in by hand.',
  },
  {
    id: 5,
    question: 'What should you assume about the service routes in a pre-1919 building?',
    options: [
      'There are none by design — every service in the building was added later by somebody',
      'They were designed in but have been blocked up',
      'They follow the same zones as modern construction',
      'They will be shown on the original drawings',
    ],
    correctAnswer: 0,
    explanation:
      'Nothing about the original fabric anticipated a consumer unit or a data cabinet. Every route you find is somebody else’s decision, and it may be a bad one.',
  },
  {
    id: 6,
    question: 'You find lath and plaster on an internal wall. What does that tell you?',
    options: [
      'The finish is thin, brittle and carried on timber — it will not take a fixing and it breaks in sheets',
      'The wall is structural and cannot be disturbed',
      'The wall is a modern stud partition',
      'The wall will be safe to chase like plasterboard',
    ],
    correctAnswer: 0,
    explanation:
      'Hitting it with a chaser or a hole saw takes off far more than you intended, and the repair is a plasterer’s job, not yours.',
  },
  {
    id: 7,
    question: 'Before you drill, chase or surface-fix in a protected older building, who decides what is acceptable?',
    options: [
      'Not you alone — the client, the specification and whoever holds any consent on the building all have a say',
      'The electrician, because it is an electrical decision',
      'The plasterer, because they make good afterwards',
      'Nobody, as long as the work meets BS 7671',
    ],
    correctAnswer: 0,
    explanation:
      'Meeting BS 7671 does not give you permission to cut into somebody’s building. Ask before the drill comes out, not after.',
  },
  {
    id: 8,
    question: 'What is the safest working assumption about previous electrical work in an old building?',
    options: [
      'It was added in layers over a long period, and what you can see is not all of it',
      'It was all installed at the same time to one standard',
      'It has all been removed at some point',
      'It will match the drawings on the consumer unit',
    ],
    correctAnswer: 0,
    explanation:
      'Dead circuits, buried joints and abandoned runs are normal. Prove what is live and what is dead rather than reading the story off the board.',
  },
];

export default function Lesson301_3_1() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'Older buildings were built from what was to hand, with solid walls, soft mortars and structural timber, and with no thought given to services because there were none.',
          'That means no cavity to run in, no standard fixing that always works, and a wall that handles damp by drying rather than by blocking it.',
          'Every service in the building was added by somebody after it was built, and the quality of those additions varies enormously.',
          'Your freedom to cut, chase and fix is smaller than in new work, and it is not yours alone to decide.',
          'The trade skill is reading the fabric before you touch it, and choosing the method that does least harm.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Describe the main features of older building fabric that change how electrical work is planned and carried out.',
          'Explain why solid wall construction removes both the route and the moisture break that modern construction gives you.',
          'Explain how lime-based mortars and plasters behave, and what that means for fixing, chasing and making good.',
          'Recognise that an older building manages moisture by drying rather than by barrier, and why sealing it makes things worse.',
          'Identify who must be consulted before cutting into, fixing to or altering the fabric of an older or protected building.',
        ]}
        initialVisibleCount={3}
      />

      <SectionRule />

      <ContentEyebrow>Solid wall construction</ContentEyebrow>

      <ConceptBlock
        title="Solid walls, and what you lose"
        plainEnglish="No cavity means no free route and no moisture break."
      >
        <p>
          The external wall of an older building is generally one thickness of masonry, however thick
          that is. There is no cavity. That single fact removes two things you take for granted in
          modern work.
        </p>
        <p>
          The first is a route. In a cavity wall you have a void behind the inner leaf that a cable can
          be dropped down. In a solid wall you have masonry all the way through. Anything you install is
          either fixed to the surface, chased into the face, or run somewhere else entirely, and
          &ldquo;somewhere else entirely&rdquo; is usually the answer that survives.
        </p>
        <p>
          The second is separation from the outside. In a cavity wall the outer leaf can be wet through
          and the inner leaf stays dry. In a solid wall, wet outside eventually means damp inside. That
          is not a defect in the building, it is how it works &mdash; but it is an external influence you
          have to select for.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Thickness is not consistency.</strong> A wall can be faced in good stone and filled behind with rubble and lime. What your drill meets at 30&nbsp;mm is not what it meets at 200&nbsp;mm.</li>
          <li><strong>Long fixings are not automatically better.</strong> Going deeper can take you straight into loose fill that holds nothing.</li>
          <li><strong>Surface routes are not a failure.</strong> In this fabric, conduit or a well-set-out trunking run is often the honest answer, and it is reversible.</li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Local material, and why every job drills differently"
        onSite="The stone changes from valley to valley, and so does your fixing plan."
      >
        <p>
          Before bulk transport, building material came from close by. That is why the older stock in one
          part of Wales is hard grey stone, in another it is soft red sandstone, in another it is brick,
          and in another it is stone below and brick above where somebody raised the walls later.
        </p>
        <p>
          For you this is not an academic point. It decides what bit you bring, how long a run of chasing
          takes, whether a fixing holds, and whether the face of the wall survives the job. A hammer
          setting that is right on hard stone will blow the face off soft sandstone in one pass.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Test in a hidden spot first.</strong> Inside a cupboard, behind where the board will sit. You learn the fabric before it costs you.</li>
          <li><strong>Rotary before hammer.</strong> On soft or friable material, drop the hammer action. It is slower and it does not shatter the hole.</li>
          <li><strong>Carry more than one fixing type.</strong> Resin, sleeve, frame fixings and plasterboard fixings all earn their place in an older building, sometimes in one room.</li>
        </ul>
      </ConceptBlock>

      <ContentEyebrow>Lime mortars and fixings</ContentEyebrow>

      <ConceptBlock
        title="Lime, and why your fixing spins"
        plainEnglish="Soft mortar takes movement instead of resisting it — and it will not grip a plug."
      >
        <p>
          The mortar in an older wall is usually lime based and softer than the masonry around it. That
          was deliberate: the joint takes the movement, so the stone or brick does not crack. It also
          means the joint is the weakest place in the wall to fix into.
        </p>
        <p>
          Drill a joint and set a plug in it and you will often get a fixing that feels fine when you
          nip it up and pulls out three months later when somebody leans on the trunking. Fix into the
          masonry unit itself where you can, or spread the load across several points.
        </p>
        <p>
          Lime plaster behaves the same way on the inside face: softer, thicker and less consistent than
          modern skim. A chaser wanders in it and a hole saw tears it.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="301-3-1-check-1"
        question="You are fixing a run of galvanised trunking to a rubble-filled solid wall with lime joints. What is the sound approach?"
        options={[
          'Fix into the masonry units rather than the joints, spread the load over more fixings than you would use on blockwork, and test one fixing before setting the whole run out',
          'Use the longest fixings you have so they reach the far side of the wall',
          'Fix into the mortar joints because they drill more easily',
          'Use adhesive only, so nothing is drilled at all',
        ]}
        correctIndex={0}
        explanation="The joints are the softest part of the wall and the fill behind may hold nothing. Fixing into the unit, spreading the load and proving one fixing first is what keeps the run up."
      />

      <SectionRule />

      <ContentEyebrow>Breathability and moisture</ContentEyebrow>

      <ConceptBlock
        title="Moisture is managed by drying, not by blocking"
        plainEnglish="The fabric gets wet and dries again. Stop the drying and you have made a problem."
      >
        <p>
          Older construction deals with water by letting it in and letting it out again. The materials
          are porous, the finishes are porous, and over a season the wall wets and dries. It is a slow,
          forgiving system and it works as long as nothing interrupts the drying half.
        </p>
        <p>
          Modern impermeable materials interrupt it. Cement render, waterproof tanking, foil-backed
          board, gloss paint, even a generous bead of silicone around a back box in the wrong place: each
          of them stops the wall breathing at that spot and pushes the moisture to the next available
          exit, which is often just above or beside the thing you fitted.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Assume damp is present.</strong> Not as a fault to be fixed by you, but as a condition to be selected for.</li>
          <li><strong>Do not seal a wall to tidy up your own hole.</strong> Making good in an old wall is somebody else&rsquo;s trade and it matters which material they use.</li>
          <li><strong>Watch where you put accessories.</strong> The bottom of an external wall, behind a cupboard, below a chimney breast: all places where moisture arrives and where a flush box is a poor idea.</li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026"
        clause="Regulation 512.2.1 — Equipment shall be of a design appropriate to the situation in which it is to be used, and the installation shall take account of the conditions likely to be encountered."
        meaning="Damp, temperature swing, corrosive atmosphere and mechanical stress are external influences you are required to design for. In an older building they are not exceptional conditions, they are the normal ones. Selecting an accessory or a wiring system that suits a dry modern cavity wall, and installing it in a damp solid wall because that is what is on the van, is a selection failure rather than bad luck."
        cite="BS 7671 Part 5 — Selection and Erection of Equipment"
      />

      <SectionRule />

      <ContentEyebrow>Hidden timber and missing routes</ContentEyebrow>

      <ConceptBlock
        title="Timber, where you do not expect it"
        onSite="Structural timber inside a masonry wall is normal in this fabric."
      >
        <p>
          Older buildings use timber structurally in places that modern construction does not. Timber
          lintels over openings. Timber bonding pieces built into masonry to give something to nail to.
          Timber floors whose joists are built into the wall itself rather than sitting on hangers.
          Internal walls of lath on studs rather than block.
        </p>
        <p>
          Two consequences. First, a cable detector reading is harder to interpret, because there is far
          more timber and far less consistency than the tool assumes. Second, a hole you drill through
          what feels like a soft patch of wall may be through something that is holding the opening up.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Lath and plaster breaks in sheets.</strong> A chaser or a hole saw brings down more than the piece you wanted, and the repair is visible.</li>
          <li><strong>Joists run where they run.</strong> Not at a regulation centre, not always square to the wall, and sometimes doubled around an old opening.</li>
          <li><strong>Notching and drilling limits still apply.</strong> They are harder to satisfy in timber you did not design and cannot fully see.</li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="No services were designed in"
        plainEnglish="Every pipe, cable and duct in the building was added by somebody after it was finished."
      >
        <p>
          This is the point that changes how you plan. There is no riser. There is no service zone. There
          is no ceiling void that was put there to hold anything. There may be a cellar, a roof space and
          a chimney, and all three have usually been pressed into service by whoever came before you.
        </p>
        <p>
          What that gives you is a building where every route is an improvisation, and the quality of the
          improvisation varies from careful to dangerous. A run down a redundant flue. A cable buried in
          plaster with no protection because the wall was being replastered that week anyway. A board
          under the stairs because that was where the meter was.
        </p>
        <p>
          You inherit all of it. The part that matters professionally is that you are adding another
          layer, and somebody will inherit yours.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="301-3-1-check-2"
        question="Why is a cable detector less reliable in a pre-1919 building than in a modern one?"
        options={[
          'The fabric is inconsistent — timber, rubble fill, varying thickness and previous metalwork all confuse the reading',
          'Detectors do not work on stone at all',
          'Older cables are non-metallic and cannot be detected',
          'The readings are accurate but the display is harder to see in old buildings',
        ]}
        correctIndex={0}
        explanation="The tool assumes a reasonably uniform wall. This fabric is anything but. The detector is a first indication, not a proof — you still open up carefully."
      />

      <SectionRule />

      <ContentEyebrow>Past alterations and consent</ContentEyebrow>

      <ConceptBlock
        title="A century of other people's alterations"
        onSite="What you can see is never all of it."
      >
        <p>
          An older building has been changed many times. Rooms subdivided and put back. Fireplaces
          blocked and reopened. Extensions added in a different material against the original wall.
          Services installed, abandoned, partly removed and installed again.
        </p>
        <p>
          The electrical layers alone can be several deep. Rubber-insulated runs left in place because
          taking them out meant lifting the floor. A rewire that reused the old routes and left the old
          cable in the wall. Junction boxes plastered over. Circuits that feed nothing and circuits that
          feed something nobody remembers.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Prove dead, do not deduce dead.</strong> An abandoned-looking cable is a hypothesis until you have tested it.</li>
          <li><strong>Label what you find.</strong> The next person&rsquo;s job is made or ruined by whether you wrote on it.</li>
          <li><strong>Report what you cannot resolve.</strong> A cable disappearing into a wall with no known end is a finding, not an inconvenience.</li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Permission, consent and who actually decides"
        plainEnglish="Compliance with BS 7671 is not permission to cut into somebody's building."
      >
        <p>
          Many older buildings carry some form of protection, and many more sit in areas where the
          external appearance is controlled. Even where nothing formal applies, the client may have views
          about a chase through a decorative plaster cornice that you would not guess from the
          specification.
        </p>
        <p>
          The professional habit is simple and it costs nothing: before you cut, chase, core or
          surface-fix anything in an older building, confirm with the person responsible that the method
          and the position are acceptable. Put the confirmation in writing if the job is big enough to
          have an email trail.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Ask about the method, not just the position.</strong> Surface conduit in a place where a chase is unacceptable is a decision the client should make.</li>
          <li><strong>Reversibility is an argument in your favour.</strong> Work that can be removed later without damage is easier to get agreed.</li>
          <li><strong>Do not guess at protection.</strong> If nobody on site knows the status of the building, that is a question for the client, not something to resolve with a drill.</li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="301-3-1-check-3"
        question="What is the correct response when nobody on site can tell you whether the building you are working in is protected?"
        options={[
          'Carry on, because BS 7671 compliance covers you',
          'Assume it is not protected unless there is a sign on the building',
          'Stop before any cutting or fixing and get an answer from the client — the status changes what methods are acceptable',
          'Use surface fixing everywhere so the question never arises',
        ]}
        correctIndex={2}
        explanation="Surface fixing is often the right answer, but the point is that the decision is not yours to make on your own. Get it settled before the damage is done."
      />

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Treating an older wall like a modern one and finding out afterwards"
        whatHappens={
          <>
            <p>
              The electrician arrives with the fixings that work on blockwork and the chaser that works
              on skim, and starts at the first accessory position. The first fixing spins in a lime joint.
              The chaser wanders and takes a strip of soft plaster off with it. A hole saw through what
              looked like a stud partition comes out the other side through the face of a lath and
              plaster wall in the next room.
            </p>
            <p>
              None of it is a disaster on its own. Together they turn a two-day job into a two-day job
              plus a plasterer, and they put the electrician in the position of explaining damage to a
              client who was not expecting any. On a protected building it can be considerably worse than
              an awkward conversation.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Spend the first half hour reading the building. Tap the walls and find out which are solid
              and which are lath. Drill one test hole somewhere that does not matter and learn what the
              fabric is. Look in the roof space and the cellar for existing routes before you invent new
              ones.
            </p>
            <p>
              Then set out the whole job before you cut anything, and agree the method and the positions
              with the client. Bring more than one fixing type. Assume surface containment is a legitimate
              answer rather than a compromise, and price accordingly.
            </p>
          </>
        }
      />

      <CommonMistake
        title="Deciding an old cable is dead because it looks abandoned"
        whatHappens={
          <>
            <p>
              Halfway through the job a length of old cable appears in the wall, going nowhere
              anybody can identify. It looks like part of a layer that was left behind years ago,
              so it gets cut back out of the way and the work carries on. Sometimes that is exactly
              what it was. Sometimes it was still feeding something upstairs that nobody had
              switched on that week.
            </p>
            <p>
              The quieter version of the same mistake is leaving it alone and saying nothing. The
              next electrician meets the identical unmarked cable, forms the identical hopeful
              opinion, and the guessing carries on for another twenty years &mdash; one more layer
              in a building where the layers are already several deep.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Prove dead rather than deduce dead. An abandoned-looking cable is a hypothesis until
              it has been tested, and in this stock the odds are genuinely uncertain, because
              rewires here routinely reused the old routes and left the old cable in the wall.
            </p>
            <p>
              Then leave the building better than you found it. Label what you find so the next
              person is not starting from nothing, and report what you cannot resolve &mdash; a
              cable disappearing into a wall with no known end is a finding for the client, not an
              inconvenience to be plastered over.
            </p>
          </>
        }
      />

      <SectionRule />

      <Scenario
        title="Rewiring a stone terrace in Machynlleth"
        situation={
          <>
            <p>
              Three-storey stone terrace, solid walls, lime plaster internally, lath and plaster on the
              internal partitions. The client wants a full rewire with flush accessories throughout
              because that is what they have seen in a new build.
            </p>
            <p>
              A quick look upstairs shows the top-floor ceiling is lath and plaster and in poor
              condition. The ground-floor external wall is damp at low level along the party wall side.
              There is no cavity anywhere and no usable void except the floor between ground and first.
            </p>
          </>
        }
        whatToDo={
          <>
            <p>
              Set the expectation before the quote, not during the job. Flush accessories everywhere means
              chasing every solid wall, and that means a plasterer following you through the whole
              building &mdash; a cost the client has not budgeted and a disturbance to the fabric that may
              not be acceptable.
            </p>
            <p>
              Offer the honest alternative: use the intermediate floor void as the main horizontal
              distribution, drop to accessories on internal walls where the chase is short and in ordinary
              plaster, and use discreet surface containment on the damp external wall where a flush box
              would sit in wet masonry. Keep the low-level positions off that wall entirely if the layout
              allows.
            </p>
            <p>
              Put the damp in writing as an observation for the client to act on with the right trade. It
              is not yours to cure, but it is yours to record because it changed your selection.
            </p>
          </>
        }
        whyItMatters={
          <>
            <p>
              The difference between the two approaches is several thousand pounds of making good and a
              client who either understood the trade-off up front or discovered it when the plaster came
              off. One of those conversations happens at quotation stage and the other happens on day
              three with dust everywhere.
            </p>
            <p>
              It also matters technically. An accessory flush-mounted in a damp solid wall is equipment
              that has not been selected for the conditions it will meet. Moving it is design; leaving it
              there and hoping is not.
            </p>
          </>
        }
      />

      <SectionRule />

      <FAQ
        items={[
          {
            question: 'Is surface containment in an older building a sign of a poor job?',
            answer:
              'No. In solid wall construction it is frequently the better engineering answer: it avoids disturbing fabric that is difficult to repair, it keeps accessories out of damp masonry, and it can be removed later without damage. Set out neatly and in a material that suits the building, it reads as a considered decision rather than a shortcut.',
          },
          {
            question: 'Can I assume an old building has been rewired at some point?',
            answer:
              'You can assume something has been done, not that it was complete. Partial rewires are extremely common — one floor, or the lighting but not the sockets, or everything except the run that was too hard to reach. Treat the installation as a mixture until testing tells you otherwise.',
          },
          {
            question: 'What do I do if I find damp where I need to put an accessory?',
            answer:
              'Move the accessory if the layout allows, select equipment suited to the conditions if it does not, and record the damp as an observation for the client. Curing it is another trade’s work, but the fact that it changed your selection belongs on paper.',
          },
          {
            question: 'How much of this is really the electrician’s problem rather than the builder’s?',
            answer:
              'The fabric is the builder’s. The consequences of the fabric for your routes, your fixings, your equipment selection and your making-good costs are entirely yours. Pricing and planning a job in older stock without reading the building is how electricians lose money on work they quoted honestly.',
          },
        ]}
      />

      <KeyTakeaways
        points={[
          'Solid wall construction removes both the free cable route and the moisture break that modern cavity construction provides.',
          'Material was local, so hardness and workability vary enormously from job to job — test the fabric before you commit to a method.',
          'Lime mortar and lime plaster are deliberately soft; fix into the masonry unit rather than the joint and spread the load.',
          'Older fabric manages moisture by wetting and drying, so anything impermeable you add pushes the moisture somewhere else.',
          'Structural timber turns up inside masonry walls, over openings and as lath partitions — a detector reading is an indication, not a proof.',
          'No services were designed into the building, so every route present was somebody’s later improvisation of varying quality.',
          'Previous electrical work sits in layers; prove dead rather than deduce dead, and label what you leave behind.',
          'Meeting BS 7671 is not permission to cut into the fabric — confirm method and position with whoever is responsible for the building.',
        ]}
      />

      <ContentEyebrow>Check yourself</ContentEyebrow>
      <Quiz questions={quizQuestions} title="Factors influencing pre-1919 construction" />
    </div>
  );
}
