/**
 * Unit 301 · Learning outcome 4 · Criterion 4.1 — The considerations required
 * when performing building services engineering work on pre-1919 buildings and
 * structures
 *
 * Criterion 3.1 covered why the fabric is the way it is. This page is the
 * working method: survey, permission, route strategy, fixing, containment,
 * making good and what to leave behind. It is deliberately a procedure rather
 * than a description.
 *
 * No historical claims and no statistics. The only duties named are ones we can
 * verify; everything else is described as contract and site practice.
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
    question: 'What is the first task on an older building, before any design or pricing?',
    options: [
      'A proper survey of the fabric and the existing services, including the roof space and any cellar',
      'Ordering the materials',
      'Setting out the accessory positions',
      'Isolating the supply',
    ],
    correctAnswer: 0,
    explanation:
      'Every subsequent decision — route, method, fixing, price — depends on what the building actually is. Guessing at that stage is what loses money.',
  },
  {
    id: 2,
    question: 'The guiding principle for route selection in an older building is',
    options: [
      'Least intervention — use existing voids and openings before creating new ones',
      'Shortest distance between two points',
      'Whatever is quickest to install',
      'Always surface mount everything',
    ],
    correctAnswer: 0,
    explanation:
      'Every new hole is damage to fabric that may be difficult or expensive to repair, and on a protected building it may not be permitted at all.',
  },
  {
    id: 3,
    question: 'Why is reversibility a useful argument when proposing a method?',
    options: [
      'Work that can be removed later without damaging the fabric is far easier to get agreed',
      'It reduces the installation cost',
      'It removes the need for certification',
      'It is a requirement of BS 7671',
    ],
    correctAnswer: 0,
    explanation:
      'Whoever is responsible for the building is weighing permanent damage against a service. Reversible work changes that balance in your favour.',
  },
  {
    id: 4,
    question: 'What does BS 7671 require regarding the support of wiring systems?',
    options: [
      'Regulation 521.10.202 gives requirements for the methods of support of wiring systems, and those requirements must be applied',
      'Support is a matter of good practice only',
      'Support methods are set by the manufacturer alone',
      'Cables in older buildings are exempt from support requirements',
    ],
    correctAnswer: 0,
    explanation:
      'Difficult fabric does not relax the requirement. It makes achieving it harder, which is why the fixing strategy has to be worked out in advance.',
  },
  {
    id: 5,
    question: 'You need to fix containment to a wall with soft lime joints and rubble fill. What should you do?',
    options: [
      'Test a fixing first, fix into the masonry units rather than the joints, and spread the load over more points than you would on blockwork',
      'Use the longest fixing available',
      'Fix into the joints because they drill more easily',
      'Rely on the plaster to hold the fixing',
    ],
    correctAnswer: 0,
    explanation:
      'The joint is the softest part of the wall and the fill behind may hold nothing. Proving one fixing before committing to the run costs ten minutes.',
  },
  {
    id: 6,
    question: 'Who should make good after electrical work in an older building?',
    options: [
      'Whoever is competent in the right material — the repair has to match the fabric, not just fill the hole',
      'The electrician, always',
      'Nobody — the holes are left for the client',
      'Whoever is on site that day',
    ],
    correctAnswer: 0,
    explanation:
      'Filling a lime plaster chase with modern filler makes a visible, impermeable patch that can cause damp problems of its own. The material matters.',
  },
  {
    id: 7,
    question: 'What is the correct approach when you find an unidentified cable buried in an old wall?',
    options: [
      'Treat it as live until proven dead, establish what it is, and record it whether or not you can resolve it',
      'Assume it is dead because it looks old',
      'Cut it back and make good',
      'Leave it and say nothing',
    ],
    correctAnswer: 0,
    explanation:
      'Old-looking is not the same as dead. An unresolved cable is a finding for the client and for the next person, and it belongs on paper.',
  },
  {
    id: 8,
    question: 'Why should the method statement for work in an older building be more detailed than for new work?',
    options: [
      'Because the fabric is unpredictable and the decisions about how to cut, fix and make good need to be agreed rather than improvised',
      'Because older buildings are always protected',
      'Because the regulations are different',
      'Because the work takes longer',
    ],
    correctAnswer: 0,
    explanation:
      'The agreement is the point. Writing the method down forces the conversation with the client before the drill comes out rather than after.',
  },
];

export default function Lesson301_4_1() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'Survey before you price: the roof space, the cellar, the wall construction and the existing services all change the job.',
          'Least intervention is the governing principle — use what exists before you cut anything new.',
          'Agree method and position with whoever is responsible for the building before work starts, in writing where the job is big enough.',
          'Fixing strategy has to be worked out on the actual fabric, not assumed from the material schedule.',
          'Making good is a material question, and a modern impermeable repair in an old wall causes problems of its own.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Carry out a structured survey of an older building before designing or pricing electrical work in it.',
          'Apply the principle of least intervention when selecting routes, positions and installation methods.',
          'Choose fixing and containment methods that suit soft mortars, variable masonry and structural timber.',
          'Explain why making good in an older building is a material question and not simply a tidying-up task.',
          'Describe what must be agreed, recorded and handed over when working on older or protected fabric.',
        ]}
        initialVisibleCount={3}
      />

      <SectionRule />

      <ContentEyebrow>Survey and least intervention</ContentEyebrow>

      <ConceptBlock
        title="Survey first, and survey properly"
        onSite="Half a day with a torch before the quote saves a fortnight of arguments."
      >
        <p>
          Nothing about an older building can be assumed from the outside. Two identical-looking terrace
          houses can be different constructions inside. The survey is not a formality, it is where the
          job is priced and designed.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Get into the roof space and the cellar.</strong> They are where existing routes, previous work and the honest condition of the building all live.</li>
          <li><strong>Establish the wall construction room by room.</strong> Solid or lath, plaster or dry lining, and whether it is the same on every floor. It frequently is not.</li>
          <li><strong>Find the existing services.</strong> All of them, including the ones that look abandoned. Note where they enter, where they run and where they end.</li>
          <li><strong>Note the damp.</strong> Where the fabric is wet, at what level, and on which walls. It will change your selection.</li>
          <li><strong>Photograph everything.</strong> The condition before you started is worth having when somebody points at a crack later.</li>
        </ul>
        <p>
          Record it as a document, not as a memory. A survey you cannot show the client is a survey that
          will be disputed.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Least intervention"
        plainEnglish="Use what is already there before you make anything new."
      >
        <p>
          This is the single principle that separates competent work on older fabric from destructive
          work on it. Every new hole, chase and penetration is damage. Some of it is necessary and all of
          it should be justified.
        </p>
        <p>
          The order of preference is straightforward. Use an existing route. Use an existing opening or
          penetration. Run in a void that already exists. Surface mount in a sympathetic containment.
          Only then chase or core, and only where it has been agreed.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Floor voids earn their keep.</strong> The space between ground and first floor is often the only usable horizontal route in the building.</li>
          <li><strong>Redundant routes may be reusable.</strong> An old conduit run or a disused service route can sometimes carry new work without a single new hole.</li>
          <li><strong>Accept the longer run.</strong> An extra ten metres of cable is cheaper than a plasterer, and very much cheaper than damaging protected fabric.</li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="301-4-1-check-1"
        question="You can reach a first-floor accessory either by chasing 3 m down a lime-plastered solid wall or by taking a longer route through an existing floor void. Which is the better answer?"
        options={[
          'The chase, because it is the shortest route',
          'Whichever is quicker on the day',
          'The floor void, because it avoids damaging fabric that is difficult and expensive to repair properly',
          'The chase, because surface routes are unprofessional',
        ]}
        correctIndex={2}
        explanation="Least intervention. The extra cable costs very little; the plastering, the disturbance and the risk of getting it wrong cost a great deal."
      />

      <SectionRule />

      <ContentEyebrow>Consent before you cut</ContentEyebrow>

      <ConceptBlock
        title="Permission and agreement before anything is cut"
        plainEnglish="Confirm the method and the positions with whoever is responsible for the building."
      >
        <p>
          On new work the specification tells you what to do and the answer is generally not contentious.
          On older fabric the method is contentious, because it is a choice between different kinds of
          damage.
        </p>
        <p>
          Establish before you start: what may be chased and what may not, what may be surface mounted
          and in what material, what may be cored and where, who makes good and in what material, and
          whether any consent applies to the building. If nobody on site knows the last one, that is a
          question for the client, not a decision for you.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Put it in writing where the job justifies it.</strong> An email confirming the agreed method is worth more than a conversation nobody remembers.</li>
          <li><strong>Offer options, not obstacles.</strong> &ldquo;We can do it flush if the plasterer follows us, or in conduit today for less&rdquo; is a client decision, and it should be theirs.</li>
          <li><strong>Reversibility is your best argument.</strong> Work that can be undone later without damage gets agreed far more readily.</li>
        </ul>
      </ConceptBlock>

      <ContentEyebrow>Fixings and containment</ContentEyebrow>

      <ConceptBlock
        title="Fixings: prove one before you commit to the run"
        onSite="The fixing that worked in the last house will not necessarily work in this one."
      >
        <p>
          Fixing is the practical problem that catches people out most often. Soft mortar, friable stone,
          rubble fill and thick unpredictable plaster all defeat a standard plug, and the failure usually
          happens weeks after you left.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Test before you set out.</strong> One fixing, somewhere that does not matter, loaded properly. You learn the wall in five minutes.</li>
          <li><strong>Into the unit, not the joint.</strong> Masonry units hold. Lime joints often do not.</li>
          <li><strong>Spread the load.</strong> More fixings at closer centres than you would use on blockwork, so no single point carries much.</li>
          <li><strong>Resin where nothing else works.</strong> In friable material a resin anchor can grip where a mechanical fixing cannot, but it is a commitment and it is not readily reversible.</li>
          <li><strong>Watch the depth.</strong> Going deeper on a rubble-filled wall can take you out of the sound face and into fill that holds nothing.</li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026"
        clause="Regulation 521.10.202 gives requirements for the methods of support of wiring systems, and compliance with those requirements shall be assessed when evaluating methods of support."
        meaning="Difficult fabric does not create an exemption. Whatever the wall is made of, the wiring system has to be supported to the standard&rsquo;s requirements, and the method chosen has to be one you can justify and evidence. In an older building that means working out the fixing strategy during the survey rather than discovering it at second fix, and it is a good reason to prefer containment you can support properly over a clipped run into a wall that will not hold clips."
        cite="BS 7671 Part 5 — Selection and Erection of Equipment, Chapter 52"
      />

      <SectionRule />

      <ConceptBlock
        title="Containment that suits the building"
        plainEnglish="Surface work is a legitimate answer, and how it looks is part of doing it well."
      >
        <p>
          In solid-wall construction, surface containment is often the right engineering answer and it
          should be presented as such rather than apologised for. What separates a good surface
          installation from a bad one is entirely in the setting out and the choice of material.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Follow the building&rsquo;s lines.</strong> Run along the top of a skirting, in the angle of a wall, behind a cornice, above a picture rail. A run that follows the architecture disappears.</li>
          <li><strong>Pick the material deliberately.</strong> Steel conduit reads as appropriate in an industrial or agricultural building where white plastic trunking does not.</li>
          <li><strong>Set it out once, properly.</strong> Straight, level, with clean bends and consistent heights. Untidy surface work is what gives surface work its reputation.</li>
          <li><strong>Keep it reversible.</strong> Fixings that can be removed and holes that can be filled leave the building recoverable.</li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="301-4-1-check-2"
        question="A client objects to surface conduit in a stone farm building on appearance grounds. What is the constructive response?"
        options={[
          'Insist that surface conduit is the only option',
          'Chase the walls as the client prefers and absorb the making good',
          'Fit the cables clipped direct with no containment',
          'Offer a material and a route that suit the building — steel conduit set out along structural lines — and explain that the alternative is chasing fabric that is hard to repair',
        ]}
        correctIndex={3}
        explanation="The objection is usually to bad surface work rather than to surface work. Material choice and setting out are where you answer it."
      />

      <SectionRule />

      <ContentEyebrow>Making good with matching materials</ContentEyebrow>

      <ConceptBlock
        title="Making good is a material question"
        onSite="The wrong filler in an old wall causes a damp problem where there was none."
      >
        <p>
          Filling a chase in an old wall with modern hard filler or cement gives you a repair that is
          harder and less permeable than everything around it. It will show, it will crack at the edges
          as the wall moves, and it will stop that patch of wall drying out.
        </p>
        <p>
          The right repair uses a material compatible with what is there, and that is normally somebody
          else&rsquo;s trade. What belongs to you is knowing that it matters, saying so, and not filling
          the hole with whatever is in the van because the job needs to look finished.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Agree who makes good before you cut.</strong> It is part of the method agreement, not an afterthought.</li>
          <li><strong>Do not seal around a box in a solid wall as a matter of habit.</strong> Consider where the moisture in that wall is going to go instead.</li>
          <li><strong>Leave it to the right trade.</strong> Being the electrician who said &ldquo;this needs a lime repair, not filler&rdquo; is a professional act.</li>
        </ul>
      </ConceptBlock>

      <ContentEyebrow>Access and what you leave behind</ContentEyebrow>

      <ConceptBlock
        title="Access is harder than you think"
        onSite="Old buildings were not built for a tower scaffold and a cable drum."
      >
        <p>
          Access in older stock is a genuine planning problem rather than a detail. Staircases are
          narrower and turn tighter. Floors are not always level and not always sound. Roof spaces are
          reached through small hatches with no boarding and ceilings below that will not carry weight.
          Outside, there may be nowhere level to stand a tower and nothing safe to tie a ladder to.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Survey the access at the same time as the fabric.</strong> How you get a drum to the top floor is part of the job, not an afterthought.</li>
          <li><strong>Assume an unboarded roof space is unboarded for a reason.</strong> Crawl boards, not a foot on the plaster.</li>
          <li><strong>Check what the floor will take.</strong> Old floors and heavy equipment are a bad combination, and so are old floors and a lot of people standing in one place.</li>
          <li><strong>Plan the route for materials.</strong> A long length of containment that will not go round the stairs has to be jointed somewhere, and it is better to decide where.</li>
        </ul>
        <p>
          None of this is unique to electrical work, but the electrician is often the trade carrying the
          longest, heaviest items to the least accessible parts of the building.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="What you leave behind"
        plainEnglish="You are one layer in a long sequence. Make the next layer easier."
      >
        <p>
          Everybody who worked on this building before you left the next person a problem or a help.
          Buried unlabelled junction boxes, cables that go nowhere, circuits nobody can identify: all of
          it was somebody&rsquo;s five minutes saved.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Label everything you leave.</strong> Including what you disconnected and why.</li>
          <li><strong>Record the routes.</strong> A simple marked-up plan of where the cables actually run is worth more in this fabric than anywhere else, because nobody can trace them.</li>
          <li><strong>Report what you could not resolve.</strong> The unidentified cable, the run that disappears, the damp at low level. Findings, not inconveniences.</li>
          <li><strong>Keep the site in good order as you go.</strong> Dust and debris in an occupied older building spread further and matter more than on a construction site.</li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="301-4-1-check-3"
        question="During a rewire you find a cable entering a wall with no identifiable termination and no obvious source. What is the correct handling?"
        options={[
          'Cut it back, cap it and plaster over it',
          'Assume it is dead because the installation is old',
          'Connect it to the nearest circuit to make it safe',
          'Treat it as live until proved otherwise, establish what you can, and record it as an observation for the client whether or not you resolve it',
        ]}
        correctIndex={3}
        explanation="Prove dead rather than deduce dead, and write down what you could not settle. The record is what protects the next person and you."
      />

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Pricing an old building as though it were a new one"
        whatHappens={
          <>
            <p>
              The quote is built from a standard rate per point. It assumes cavity walls, dry lining,
              consistent joist centres and a plasterer following behind. It is competitive, it wins the
              job, and it is wrong on day one.
            </p>
            <p>
              The walls are solid and the fixings fail. Half the routes do not exist and have to be
              invented. The client expected flush accessories and nobody discussed the making good. The
              job runs over, the margin is gone, and the relationship with the client is strained by an
              argument about who should have known.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Survey before you price, and price from what you found rather than from a standard rate.
              Identify the routes that exist and the ones that will have to be created, name the fixing
              and containment method, and state clearly what making good is included and what is not.
            </p>
            <p>
              Put the constraints in the quotation. &ldquo;Solid wall construction throughout; horizontal
              distribution via the first-floor void; surface containment on the north wall where damp is
              present; making good by others&rdquo; is four lines that prevent four arguments.
            </p>
          </>
        }
      />

      <CommonMistake
        title="Filling the chase with whatever is in the van so the job looks finished"
        whatHappens={
          <>
            <p>
              The last accessory goes on at four o&rsquo;clock and there is a chase and two core
              holes still open. Nobody has arranged a plasterer, the client is coming back in the
              morning, and there is filler in the van. Twenty minutes later the wall looks tidy and
              the job looks complete.
            </p>
            <p>
              What has actually been put into that wall is a repair harder and less permeable than
              everything around it. It cracks at the edges as the wall moves, it shows through the
              decoration, and it stops that patch drying &mdash; so the moisture comes out
              somewhere nearby instead, usually just above or beside the accessory you fitted.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Settle who makes good, and in what material, as part of the method agreement before
              anything is cut. It is a line in the quotation, not a decision to be taken at four
              o&rsquo;clock with a tub of filler.
            </p>
            <p>
              Where the repair needs a material compatible with the existing fabric, that is
              normally another trade&rsquo;s work, and saying so is a professional act rather than
              an admission. Leave the hole and the explanation rather than leaving a repair that
              causes a problem the building did not have.
            </p>
          </>
        }
      />

      <SectionRule />

      <Scenario
        title="A chapel conversion in Llandudno"
        situation={
          <>
            <p>
              A former chapel being converted to a single dwelling. Thick rubble-filled stone walls, lime
              plaster where there is any plaster at all, a high open roof with exposed trusses, and a
              small gallery. There is one existing supply into a cupboard by the door and almost nothing
              else.
            </p>
            <p>
              The client wants lighting throughout, general socket provision, underfloor heating controls
              and a charging point outside. Nobody on site can tell you what consents apply to the
              building, and the architect&rsquo;s drawings show accessory positions but no routes.
            </p>
          </>
        }
        whatToDo={
          <>
            <p>
              Stop and settle the consent question with the client before anything is cut. A building of
              this type frequently carries protection, and the difference that makes to acceptable methods
              is total. Asking costs a phone call; guessing wrong costs far more than the contract.
            </p>
            <p>
              Survey the building properly and establish the horizontal distribution strategy before
              looking at any individual accessory. In a building with almost no voids, the new floor build-up
              and any new stud partitions are likely to be the only routes that do not involve cutting
              original fabric, and they are being built now, which means the electrical routes have to be
              agreed with the builder this week rather than next month.
            </p>
            <p>
              For the high-level lighting, work with the roof structure rather than against it: steel
              conduit set out along the trusses, fixed to timber rather than into the stonework, reads as
              appropriate in this building and avoids touching the walls at all. Test a fixing into the
              stone before assuming anything can be fixed to it.
            </p>
            <p>
              Set the external charging point supply out to leave the wall alone where you can — through
              the new floor build-up and out at low level in a sleeve with a fall on it, rather than
              coring the original stonework.
            </p>
          </>
        }
        whyItMatters={
          <>
            <p>
              Almost every decision on this job is irreversible. A chase through original lime plaster
              cannot be undone. A cored hole through rubble-filled stone cannot be undone. If the building
              turns out to be protected and the work was not agreed, the consequences fall on the client
              and on the contractor who did it.
            </p>
            <p>
              The routes also have to be agreed while the builder is still building, because the one
              opportunity to install services without touching the original fabric is inside the new work.
              Miss that window and every remaining option involves cutting something old.
            </p>
          </>
        }
      />

      <SectionRule />

      <FAQ
        items={[
          {
            question: 'How much extra time should I allow for work in older stock?',
            answer:
              'There is no multiplier that works, which is exactly why the survey matters. The variables are the fabric, the number of routes that already exist, and how much making good is in your scope. Price from what you found on the survey, and state the assumptions you priced against in the quotation.',
          },
          {
            question: 'What if the client insists on flush accessories everywhere in a solid-wall building?',
            answer:
              'It can usually be done, but it means chasing every wall and a plasterer working behind you in a compatible material. Set out the cost, the disturbance and the making-good requirement in writing and let the client decide. What you should not do is agree to it on a price that assumed something easier.',
          },
          {
            question: 'Can I use a cable detector as proof there is nothing behind the wall?',
            answer:
              'No. In this fabric a detector is a first indication only — timber, rubble fill, varying thickness and old metalwork all confuse it. Combine it with what the survey told you, open up carefully, and never rely on a single source of information before drilling into an unknown wall.',
          },
          {
            question: 'Is it my job to tell the client the building is damp?',
            answer:
              'It is your job to record it if it affected your work, which it usually will. You are not diagnosing the cause or specifying the cure — that is another trade. You are recording an observation that explains why you selected what you selected and where you did not put an accessory.',
          },
        ]}
      />

      <KeyTakeaways
        points={[
          'Survey the building — roof space, cellar, wall construction and existing services — before designing or pricing anything.',
          'Least intervention governs route selection: existing routes and voids first, new penetrations last and only where agreed.',
          'Agree the method, the positions and who makes good with whoever is responsible for the building, in writing where the job justifies it.',
          'Establish whether any consent applies to the building rather than assuming; if nobody on site knows, ask the client.',
          'Prove a fixing on the actual fabric before setting out a run, fix into masonry units rather than joints, and spread the load.',
          'Regulation 521.10.202 gives requirements for the methods of support of wiring systems, and difficult fabric does not relax them.',
          'Surface containment is a legitimate answer; material choice and setting out are what make it good work rather than a compromise.',
          'Making good is a material question — a modern impermeable repair in an old wall creates a damp problem where none existed.',
        ]}
      />

      <ContentEyebrow>Check yourself</ContentEyebrow>
      <Quiz questions={quizQuestions} title="Working on pre-1919 buildings and structures" />
    </div>
  );
}
