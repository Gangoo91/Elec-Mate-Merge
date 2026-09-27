/**
 * Unit 302 — Working in The Building Services Engineering Sector in Wales
 * Learning outcome 1 — Understand the built environment in Wales
 * Criterion 1.1 — Building stock in Wales
 *
 * Approach: this page teaches the electrical consequences of the building types an
 * electrician actually works in across Wales — solid walls, slate and stone, rural
 * supplies, industrial-era terraces, farm buildings, new estates and conversions.
 * Everything is framed as trade experience of what you meet on site, not as a survey
 * of the housing stock.
 * This page contains NO statistics and cites NO sources about Welsh building stock,
 * because no verified source was available; only BS 7671 is quoted.
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
      'Why does a solid stone wall change your wiring proposal before you have even priced the job?',
    options: [
      'There is no cavity, so there is no easy concealed route and surface containment has to be considered and agreed',
      'Stone walls always need SWA cable throughout the property',
      'Stone walls mean the installation must be converted to a TT earthing arrangement',
      'Stone walls prevent you from using any form of mechanical protection',
    ],
    correctAnswer: 0,
    explanation:
      'A cavity or a stud gives you a void to drop cable through. Solid stone gives you nothing. Either you chase, which is slow and may not be permitted, or you go on the surface, which the client has to accept before you start.',
  },
  {
    id: 2,
    question:
      'A solid wall in an old building is showing damp at low level. What does that change about your equipment selection?',
    options: [
      'You select equipment and enclosures suitable for the damp conditions, and you avoid burying accessories in the damp fabric',
      'Nothing, because damp only affects plaster and decoration',
      'You fit a larger consumer unit to compensate for the moisture',
      'You increase every circuit by one cable size',
    ],
    correctAnswer: 0,
    explanation:
      'Moisture is an external influence. It drives enclosure choice, fixing choice and where you are willing to put an accessory. Burying a flush box in a wet wall creates a problem you will be called back to.',
  },
  {
    id: 3,
    question:
      'What is the main earthing consideration you should expect on an isolated rural property in Wales?',
    options: [
      'It may be a TT arrangement relying on an installation earth electrode, so electrode condition and RCD protection matter',
      'It will always have a PME supply because all UK supplies are PME',
      'Earthing is not required on rural properties because of the soil type',
      'The supply will always be three-phase so earthing is simpler',
    ],
    correctAnswer: 0,
    explanation:
      'Away from the built-up network you frequently meet TT. That puts the earth electrode and its connection on your inspection list, and it shapes the protective devices you select.',
  },
  {
    id: 4,
    question:
      'On a mid-terrace from the industrial era, what should you check before assuming a cable route through a wall?',
    options: [
      'Whether the wall is a party wall shared with the neighbour, and whether services are shared or run through it',
      'Whether the neighbour uses the same electricity supplier',
      'Whether the terrace faces north or south',
      'Whether the roof is slate or tile',
    ],
    correctAnswer: 0,
    explanation:
      'Drilling into or through a party wall is not your wall to cut. Shared services, shared meter cupboards and neighbouring cables all live in that fabric. Check first, cut later.',
  },
  {
    id: 5,
    question: 'In a milking parlour, what drives your choice of accessories and containment?',
    options: [
      'The external influences present — water, slurry, corrosive atmosphere, dust, mechanical damage and livestock',
      'The preference of the electrician who installed the previous system',
      'The colour scheme chosen by the farmer',
      'The number of sockets requested, and nothing else',
    ],
    correctAnswer: 0,
    explanation:
      'Agricultural environments are wet, dirty, corrosive and physically rough. Equipment has to be appropriate to that situation, and where it is not, additional protection has to be provided in the erection.',
  },
  {
    id: 6,
    question:
      'On a new-build estate, why can a straightforward downlight position become a problem?',
    options: [
      'Penetrating the ceiling or wall line can compromise airtightness, insulation and fire-stopping that the construction depends on',
      'New builds never allow downlights of any kind',
      'Plasterboard cannot support any luminaire',
      'Downlights are not permitted above ground-floor level',
    ],
    correctAnswer: 0,
    explanation:
      'Modern construction is a designed system. Every hole you make in a membrane, an insulated line or a fire-stopped barrier has to be made good properly, or you have quietly degraded the building.',
  },
  {
    id: 7,
    question:
      'You are rewiring a converted chapel and the client asks you to chase the stone. What is the honest position?',
    options: [
      'Permission may be required before anything is cut, so you confirm what is allowed in writing before work starts',
      'Chasing is always allowed because electrical work is exempt',
      'Chasing is never allowed in any converted building',
      'You may chase as long as you make good afterwards',
    ],
    correctAnswer: 0,
    explanation:
      'On protected or historic fabric you may need permission before you cut. Get the position confirmed by whoever holds it, in writing, and design a reversible solution if you cannot.',
  },
  {
    id: 8,
    question: 'What is the through-line for criterion 1.1?',
    options: [
      'The building decides the wiring system, the route and the equipment — not your preference',
      'The client decides the wiring system and the electrician follows without comment',
      'The cheapest wiring system should be used in every building',
      'The same wiring system should be used everywhere for consistency',
    ],
    correctAnswer: 0,
    explanation:
      'Survey the fabric first. What the building is made of, how wet it is, who owns the wall and what it is used for all narrow your options before you pick up a tool.',
  },
];

export default function Lesson302_1_1() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'Survey the fabric before you price the job. Solid stone, cavity, stud and prefabricated panels give you completely different routes.',
          'Solid walls have no cavity. Concealed work means chasing, chasing is slow, and on some buildings it is not allowed at all.',
          'Damp, dust, corrosion, livestock and mechanical damage are external influences. They decide your enclosures, not your habits.',
          'Rural properties bring long runs, TT earthing, standby or off-grid arrangements, and a long drive to the wholesaler.',
          'The building decides the wiring system, the route and the equipment. Your preference comes last.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Describe the main types of building an electrician works in across Wales and what each one is made of.',
          'Explain how solid-wall, cavity and timber-framed construction change the cable routes available to you.',
          'Identify the external influences that different building types impose on equipment selection.',
          'Explain why rural and isolated properties change supply arrangements, earthing and job resourcing.',
          'Justify a wiring system and route from the fabric of the building rather than from personal preference.',
        ]}
        initialVisibleCount={3}
      />

      <SectionRule />

      <ContentEyebrow>Solid walls and stone</ContentEyebrow>

      <ConceptBlock
        title="Solid-wall construction: there is no cavity to hide in"
        plainEnglish="Older stone and solid brick walls are one continuous mass. There is no void behind the plaster, so there is nowhere for a cable to drop."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>No void, no easy drop.</strong> In a cavity wall you can drop a cable down the
            inner leaf. In a solid stone wall you cannot. Every concealed run has to be cut into the
            wall or buried in the plaster depth, and the plaster depth on an old wall is rarely what
            you hope it is.
          </li>
          <li>
            <strong>Chasing stone is slow.</strong> Rubble stone is not uniform. You meet hard
            stone, soft lime mortar and voids packed with rubble in the same metre. A chase that
            takes ten minutes in blockwork can take an hour, and it makes dust and noise the client
            did not expect.
          </li>
          <li>
            <strong>Chasing may not be permitted.</strong> On some buildings the fabric is protected
            and cutting is simply off the table. That is a design constraint, not a negotiation.
          </li>
          <li>
            <strong>Surface containment becomes a serious option.</strong> Trunking, conduit or
            cable in a discreet dado or skirting run is a legitimate answer, not a failure. It has
            to be proposed, drawn and agreed with the client before the first fixing goes in.
          </li>
          <li>
            <strong>Get it in writing.</strong> &ldquo;We will surface-run in mini-trunking along
            this wall&rdquo; belongs in the quotation. A client who discovers it on day three will
            not accept it.
          </li>
          <li>
            <strong>Damp changes what you can bury.</strong> A solid wall can carry moisture from
            the outer face to the inner face. You will meet blown plaster and salting at low level,
            and a flush box set into wet masonry corrodes and seizes. Surface-mount it, lift it
            clear, or move it to a dry partition.
          </li>
          <li>
            <strong>The enclosure follows the condition.</strong> Where the wall is damp, the
            equipment and its enclosure have to suit that. Note the damp on your survey; if you fit
            to a wet wall because the client insisted, that note is the only thing protecting you
            later.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ConceptBlock
        title="Slate, stone and weathering: what you may and may not drill"
        onSite="Older buildings in Wales are full of slate and stone detailing — slate sills, slate dampcourses, stone lintels, dressed quoins. Each one changes how you fix and how you penetrate."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Slate splits.</strong> A percussion drill in slate will crack it along the
            cleavage. Drill on rotary only, use a slow feed, and if a fixing can go into the mortar
            joint instead of the face of the stone, put it in the joint.
          </li>
          <li>
            <strong>The mortar joint is your friend.</strong> A fixing in lime mortar can be raked
            out and repointed later. A hole through dressed stone is permanent. Reversibility is
            worth designing for even when nobody has asked for it.
          </li>
          <li>
            <strong>Penetrations must shed water.</strong> Any cable through an external wall needs
            a fall to the outside and a proper seal. A level or back-falling hole in a rubble wall
            becomes a water path straight to the accessory inside.
          </li>
          <li>
            <strong>Watch the slate dampcourse.</strong> Some older walls have a slate course
            working as a damp barrier. Drilling straight through it bridges the barrier and you have
            introduced damp that was not there.
          </li>
          <li>
            <strong>Exposed elevations take a beating.</strong> On a west-facing wall in the hills,
            an external enclosure is standing in wind-driven rain for weeks. Glands, gaskets and
            orientation matter more than the IP number on the box.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <InlineCheck
        id="302-1-1-check-1"
        question="You are quoting a rewire on a solid-stone cottage. The client wants everything concealed. What is the correct first move?"
        options={[
          'Price for full concealment and deal with any problems when you start work',
          'Refuse the job because stone cannot be rewired',
          'Assume the plaster depth is enough to bury cable and proceed',
          'Survey the fabric, establish whether chasing is possible and permitted, and present surface containment as a priced option if it is not',
        ]}
        correctIndex={3}
        explanation="Concealment in solid stone is a question of whether you can cut and whether you are allowed to cut. Answer both at survey, then let the client choose between a priced chase and a priced surface solution."
      />

      <SectionRule />

      <ContentEyebrow>Distance on rural properties</ContentEyebrow>

      <ConceptBlock
        title="Rural and isolated properties: distance changes everything"
        onSite="A farmhouse two miles up a single-track lane is a different job from the same house in a town, before you have looked at a single circuit."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Long service runs.</strong> The distance from the intake to an outbuilding
            drives volt drop, cable size, protective device selection and the cost of the trench.
            Measure the run properly at survey; pacing it out and guessing is how jobs lose money.
          </li>
          <li>
            <strong>Expect TT.</strong> Away from the built-up network you frequently find no
            distributor earth and an installation earth electrode instead. That puts electrode
            condition, connection condition and RCD protection at the front of your inspection.
          </li>
          <li>
            <strong>Standby and off-grid arrangements.</strong> Generators, battery storage and
            small-scale generation turn up on remote properties. Changeover arrangements, isolation
            and clear labelling stop somebody back-feeding a supply that is supposed to be dead.
          </li>
          <li>
            <strong>Supply interruption is normal.</strong> Clients on exposed rural feeds live with
            outages. That changes what they want protected and what they expect from you.
          </li>
          <li>
            <strong>Resourcing the job.</strong> The nearest wholesaler may be an hour each way. A
            forgotten gland is half a day. Van stock, a full materials list and a phone call before
            you leave the yard are part of the planning, not an afterthought.
          </li>
          <li>
            <strong>Signal and access.</strong> No mobile signal means no online test sheet and no
            quick call for advice. Plan for paper and plan for working alone safely.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Terraces and farm buildings</ContentEyebrow>

      <ConceptBlock
        title="Terraced housing from the industrial eras: shared walls, shared problems"
        plainEnglish="Rows of terraces built for mining, quarrying and steel communities are still in daily use. They are compact, they share walls, and their services were fitted long after they were built."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>The party wall is not yours.</strong> It is shared with the neighbour. Deep
            chases, through-fixings and penetrations affect somebody else&rsquo;s property, and
            cables belonging to next door can be sitting in it.
          </li>
          <li>
            <strong>Meter positions are awkward.</strong> Under the stairs, in a cellar head, in a
            cupboard behind a fridge, or out on a rear elevation. Access for isolation and for
            future testing has to be part of your plan.
          </li>
          <li>
            <strong>Routes are limited.</strong> Narrow plans mean few internal partitions to run
            through. Cables often end up going up and over, or down and under, and you need to know
            which before you commit.
          </li>
          <li>
            <strong>Floors and ceilings are the real route.</strong> Suspended timber floors and
            lath ceilings can be the only practical path. Lift carefully, notch and drill joists
            properly, and expect the boards to fight you.
          </li>
          <li>
            <strong>Layered history.</strong> You will meet three generations of wiring in one
            house. Identify what is live, what is abandoned and what is feeding the neighbour before
            you cut anything.
          </li>
          <li>
            <strong>Noise and dust travel.</strong> In a mid-terrace the neighbour hears every
            chase. Tell them in advance and you will have a better week.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ConceptBlock
        title="Farm and agricultural buildings: the environment selects the equipment"
        onSite="A milking parlour, a grain store and a machinery shed are three different environments, and none of them is a house."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Water is constant.</strong> Parlours and yards are hosed down. Equipment gets a
            direct jet, not a splash. Select for washdown and gland downwards so water cannot track
            in.
          </li>
          <li>
            <strong>The atmosphere is corrosive.</strong> Slurry, urine, ammonia and silage effluent
            attack metalwork and fixings. Galvanised steel that is fine in a factory is consumed in
            a livestock building. Consider the material of the enclosure, the gland and the fixing.
          </li>
          <li>
            <strong>Dust is a hazard, not a nuisance.</strong> Grain and feed dust settles on hot
            surfaces and gets into enclosures. Sealed equipment and a cleaning regime both matter.
          </li>
          <li>
            <strong>Livestock cause mechanical damage.</strong> Cattle rub, chew and lean. Anything
            within reach needs robust containment or needs to be out of reach altogether.
          </li>
          <li>
            <strong>Machinery causes impact.</strong> Loader buckets and trailers hit conduit and
            enclosures. Position for protection and add mechanical protection where position will
            not save you.
          </li>
          <li>
            <strong>Additional protection is a legitimate answer.</strong> Where equipment does not
            suit the environment by its construction, you may still use it if you provide
            appropriate additional protection when you install it, and that protection must not stop
            the equipment working.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <InlineCheck
        id="302-1-1-check-2"
        question="You are adding a socket circuit in a livestock building. A standard indoor consumer unit and moulded accessories are on the van. What do you do?"
        options={[
          'Fit what is on the van and tell the farmer to keep the hose away from it',
          'Fit the indoor equipment and add an extra RCD to compensate',
          'Select equipment appropriate to the corrosive, wet and dusty situation, or provide appropriate additional protection so the equipment can be used there',
          'Fit the indoor equipment inside a timber box you make on site',
        ]}
        correctIndex={2}
        explanation="Equipment has to be of a design appropriate to the situation. Where it is not, the recognised route is appropriate additional protection provided during erection, and that protection must not affect how the equipment operates."
      />

      <SectionRule />

      <ContentEyebrow>New build and conversions</ContentEyebrow>

      <ConceptBlock
        title="Modern estates and new build: predictable fabric, different constraints"
        plainEnglish="A new house is easier to route but harder to penetrate. The construction is a designed system and the electrician is one of the people who can quietly break it."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Routes are predictable.</strong> Cavity walls, timber stud partitions, service
            voids and plated routes mean you generally know where a cable can go before you arrive.
          </li>
          <li>
            <strong>Airtightness is a real constraint.</strong> Membranes and sealed service voids
            are there to stop air leakage. Every accessory that breaks the line needs the correct
            airtight box or a proper seal, not tape and hope.
          </li>
          <li>
            <strong>Insulation affects the cable.</strong> Cables surrounded by thermal insulation
            carry less current. The installation method you actually used is the one you have to
            design to, not the one on the drawing.
          </li>
          <li>
            <strong>Fire-stopping is not optional.</strong> Penetrations through compartment walls,
            ceilings and floors have to be reinstated with a correct product. An unfilled hole
            through a fire barrier is a serious defect that nobody sees once the ceiling is up.
          </li>
          <li>
            <strong>Prefabricated elements limit you.</strong> Factory-made panels, cassette floors
            and engineered joists have defined service zones. Cutting outside them can damage
            structure, and on engineered joists it is not recoverable.
          </li>
          <li>
            <strong>Programme pressure is a risk.</strong> On a fast-moving estate you get one
            window before the plasterboard goes on. Missing it means cutting a finished house, which
            costs somebody money.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ConceptBlock
        title="Conversions and protected fabric: permission before you cut"
        onSite="Chapels, barns, mills and school buildings get converted to housing and workspace. The new use is modern. The fabric is not."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>You may need permission before you cut.</strong> On protected or historic fabric
            the answer is not automatically yes. Establish who holds the decision and get it
            confirmed in writing before you start, not after.
          </li>
          <li>
            <strong>Design for reversibility.</strong> Surface containment on discreet fixings into
            mortar joints can be removed and the wall made good. A chased and filled route cannot be
            undone.
          </li>
          <li>
            <strong>Mixed fabric in one building.</strong> A converted barn may have an original
            stone shell, a new steel frame and a modern insulated lining, all in the same room. Each
            part takes a different fixing and a different route.
          </li>
          <li>
            <strong>Hidden features.</strong> Beams, arches, tie rods and blocked openings sit
            behind new plasterboard. Scan, ask, and check drawings before you drill.
          </li>
          <li>
            <strong>Long volumes and high ceilings.</strong> A converted chapel has no convenient
            first floor to route through. Distances grow, access equipment is needed, and both of
            those are cost.
          </li>
          <li>
            <strong>Write the constraints into the quote.</strong> If you have agreed surface
            containment and restricted fixings, that belongs in the paperwork so nobody argues about
            it at handover.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Reading the fabric before pricing</ContentEyebrow>

      <ConceptBlock
        title="Reading the building before you price the job"
        plainEnglish="A survey is not a walk round with a notepad. It is the point at which the fabric tells you what installation is possible."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Tap the walls.</strong> Solid, cavity, stud or dry-lined. Two minutes with your
            knuckles saves a day of wrong assumptions.
          </li>
          <li>
            <strong>Find the intake and the earthing arrangement.</strong> What comes in, where it
            comes in, and whether there is an earth electrode. Everything downstream depends on it.
          </li>
          <li>
            <strong>Look up and look down.</strong> Loft, floor void and cellar are where your
            routes live. If there are none, you are on the surface.
          </li>
          <li>
            <strong>Assess the environment room by room.</strong> Wet, dusty, corrosive, cold,
            exposed, at risk of impact. Write it down against each area.
          </li>
          <li>
            <strong>Ask who owns what.</strong> Party walls, shared meter cupboards and neighbouring
            cables change what you are allowed to touch.
          </li>
          <li>
            <strong>Turn the survey into the quote.</strong> Route, wiring system, containment and
            any restriction, all written down. The building decides. You record the decision.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <RegsCallout
        source="BS 7671:2018+A4:2026"
        clause="Regulations 512.2.1 and 512.2.2"
        meaning="Equipment shall be of a design appropriate to the situation in which it is to be used, and its installation shall take account of the conditions likely to be encountered — temperature, humidity, mechanical stresses, corrosive atmosphere and other external influences. Where equipment does not, by its construction, have the characteristics relevant to the external influences of its location, it may nevertheless be used on condition that appropriate additional protection is provided in the erection of the installation, and that protection shall not adversely affect the operation of the equipment protected. That is the rule behind every decision on this page: the stone farmhouse, the damp solid wall and the milking parlour are all external influences you have to select for."
        cite="BS 7671 Part 5 — Selection and Erection of Equipment"
      />

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Pricing a rewire from the floor plan instead of the fabric"
        whatHappens={
          <>
            The quote is built from room count and socket count, priced as if every wall were
            plastered blockwork. On site the walls turn out to be solid rubble stone with lime
            plaster. Chasing takes four times as long, one elevation cannot be cut at all, and the
            client has never been told that trunking is coming. The job stops while everybody argues
            about who pays for the extra days, and the relationship is finished before second fix.
          </>
        }
        doInstead={
          <>
            Survey the fabric before you price. Establish the construction of every wall you need to
            run in, whether cutting is possible and whether it is permitted. Then present the wiring
            system and route as part of the quotation — including where containment will be surface
            run, where fixings are restricted and what the client will actually see. Get that agreed
            in writing. A client who chooses surface trunking at quotation stage accepts it. A
            client who discovers it on day three does not.
          </>
        }
      />

      <CommonMistake
        title="Letting the van stock decide the equipment instead of the environment"
        whatHappens={
          <>
            <p>
              The socket outlet in the yard building goes in because it was on the van and it was
              a Friday. It works perfectly on the day. Then the parlour gets hosed down, the
              ammonia does its work on the gland and the fixings, feed dust settles inside the
              enclosure, and a heifer leans on the conduit.
            </p>
            <p>
              Nine months later the farmer rings about a circuit that keeps tripping, and what you
              find is not a fault you can repair. The equipment was never of a design appropriate
              to the situation it was put in, so the whole position has to be done again &mdash; in
              your time, because you chose it.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Assess the environment room by room at survey and write it down: wet, dusty,
              corrosive, cold, exposed, at risk of impact. Then select equipment for what you
              wrote, and take the material of the enclosure, the gland and the fixing as
              separate decisions rather than one.
            </p>
            <p>
              Where the equipment does not suit the location by its construction, the recognised
              route is appropriate additional protection provided when you install it &mdash; and
              that protection must not stop the equipment working. Position out of reach of
              livestock and machinery where you can, and add mechanical protection where position
              alone will not save it.
            </p>
          </>
        }
      />

      <SectionRule />

      <InlineCheck
        id="302-1-1-check-3"
        question="Two identical kitchen extensions, one on a new estate in Cwmbran and one on a stone cottage near Dolgellau. Why will the wiring systems differ?"
        options={[
          'They should not differ, because the same layout means the same installation',
          'The rural one must be three-phase because it is further from the substation',
          'The fabric, the environment and the permitted routes differ, and those decide the wiring system rather than the layout of the kitchen',
          'The new build requires surface containment and the cottage requires concealed cable',
        ]}
        correctIndex={2}
        explanation="Identical room layouts tell you nothing about construction. Cavity and stud give concealed routes; solid stone may not. Damp, exposure and restrictions on cutting then narrow the choice further."
      />

      <SectionRule />

      <Scenario
        title="Converted chapel, Machynlleth — the client wants it all hidden"
        situation={
          <>
            You are quoting a full rewire of a chapel in Machynlleth converted to a three-bedroom
            home. The shell is solid rubble stone with lime plaster straight onto the masonry. There
            is no loft to speak of: the main room is open to the roof at nearly six metres. A new
            timber-framed mezzanine carries the bedrooms. The owner wants every cable concealed,
            wants downlights in the stone gable wall, and has told you the last electrician said it
            would be &ldquo;no problem&rdquo;. You have also been told the building is protected,
            but nobody can tell you exactly what that means for cutting the stone.
          </>
        }
        whatToDo={
          <>
            Split the building into what it actually is. The timber mezzanine is straightforward:
            concealed runs in the studwork and the floor void, no argument. The stone shell is not.
            Stop and establish, in writing and before you price, who holds the decision on cutting
            the protected fabric and what they will allow. Assume nothing. For the gable, propose
            surface luminaires on fixings into mortar joints rather than chased downlights in
            dressed stone — reversible, and it removes the consent question entirely. Price the
            ground-floor perimeter as a discreet surface containment run at skirting and dado level,
            drawn on a plan so the owner can see exactly where it goes. Price access equipment for
            the six-metre volume separately and honestly; that is real cost, not padding. Present
            both options side by side: the agreed surface solution with its price, and a chased
            solution marked as subject to written permission that you do not yet have. Let the owner
            choose with the facts in front of them.
          </>
        }
        whyItMatters={
          <>
            Cutting protected fabric without the permission you needed is not a snag; it is damage
            you cannot undo, and it lands on you. Guessing at concealment in solid rubble is how a
            five-day rewire becomes a twelve-day rewire at your expense, with the owner refusing the
            variation because you never warned them. Doing the work up front costs you an afternoon
            and a phone call. Getting it wrong costs you the job, the money and the reference in a
            town where everybody knows everybody.
          </>
        }
      />

      <SectionRule />

      <FAQ
        items={[
          {
            question: 'How do I tell a solid wall from a cavity wall on site?',
            answer:
              'Knock it and listen, check the thickness at a window or door reveal, and look at how the bricks or stones are laid on an exposed elevation. A drilled test in a discreet spot will confirm it. Do this at survey, because the answer decides whether concealed routes exist at all.',
          },
          {
            question: 'Is surface containment a second-class solution?',
            answer:
              'No. On solid or protected fabric it is often the correct engineering answer, and it is reversible. Poorly planned surface containment looks like an afterthought, so set the runs out properly, keep them level, use the right size and show the client where they will go before you start.',
          },
          {
            question: 'Why does a rural property change my paperwork as well as my wiring?',
            answer:
              'A TT arrangement puts the earth electrode and its connection into your testing and your certification. Standby or off-grid arrangements need clear isolation and labelling so nobody energises a supply from an unexpected direction. Poor mobile signal also means you may be completing records on paper.',
          },
          {
            question: 'What should I do if I am not sure whether I am allowed to cut a building?',
            answer:
              'Stop and ask. Find out who holds the decision for that building, put the question to them in writing and wait for the answer before you cut. In the meantime, design a reversible solution so the job can proceed either way. Cutting first and asking afterwards is the one route with no way back.',
          },
        ]}
      />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Solid walls have no cavity. Concealed routes must be cut, cutting is slow, and on some buildings it is not permitted at all.',
          'Surface containment is a legitimate engineering answer to solid construction, but it must be proposed, drawn and agreed with the client before you start.',
          'Slate and stone need rotary drilling, mortar-joint fixings where possible, and penetrations that fall outwards and are sealed.',
          'Damp in a solid wall drives your enclosure choice and tells you what you must not bury.',
          'Rural properties bring long runs, TT earthing with an installation electrode, standby or off-grid arrangements, and a long trip for materials.',
          'Industrial-era terraces bring party walls you do not own, awkward meter positions and very limited routes.',
          'Farm buildings are wet, corrosive, dusty and physically rough; select equipment for those external influences or provide appropriate additional protection.',
          'The building decides the wiring system, the route and the equipment — not your preference.',
        ]}
      />

      <SectionRule />

      <ContentEyebrow>Check yourself</ContentEyebrow>

      <Quiz questions={quizQuestions} title="Building stock in Wales — electrical consequences" />
    </div>
  );
}
