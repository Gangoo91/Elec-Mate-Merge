/**
 * Unit 302 — Working in The Building Services Engineering Sector in Wales
 * Learning outcome 1 — Understand the built environment in Wales
 * Criterion 1.3 — Safety of the built environment
 *
 * Approach: teach the electrician&rsquo;s contribution to building safety through what an
 * installer actually does — penetrations, escape routes, isolation, inherited work,
 * occupied premises, the fabric and handover. No statute, fire-safety regime or
 * building-safety legislation is named anywhere on this page, because none of it could
 * be verified against a source we hold.
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
      'You drill a 50 mm hole through a fire-rated compartment wall for a new SWA. What is your responsibility for that hole?',
    options: [
      'Reinstate it so the wall performs as it did, using a system suited to that wall and that cable',
      'Leave it open so the cable can be pulled back later without damage',
      'Fill it with expanding foam, because foam seals the gap',
      'Nothing — the hole belongs to the builder once the cable is in',
    ],
    correctAnswer: 0,
    explanation:
      'A compartment wall only works if it is continuous. You made the breach, so making it good is your job. General-purpose foam is not fire-stopping.',
  },
  {
    id: 2,
    question:
      'During a rewire in an occupied office, where must your trunking and drums not be stored?',
    options: [
      'Across an escape corridor or in front of a final exit door',
      'In the locked plant room you have been given for the duration',
      'In a taped-off area of the room you are working in',
      'On the back of your van',
    ],
    correctAnswer: 0,
    explanation:
      'Materials in a corridor obstruct escape; that is not untidiness. CDM 2015 Regulation 17 requires safe access to and egress from every place of work.',
  },
  {
    id: 3,
    question:
      'Who should be able to find and operate the means of isolation for a workshop board in an emergency?',
    options: [
      'Anyone who needs to, including non-electricians — so it must be reachable, identified and unobstructed',
      'Only the electrician who installed it',
      'Only someone holding a copy of the schedule of circuits',
      'Only the duty holder, who keeps the board locked at all times',
    ],
    correctAnswer: 0,
    explanation:
      'Isolation you can only find with inside knowledge is not isolation in an emergency. Labelling and position are safety features, not tidiness.',
  },
  {
    id: 4,
    question:
      'Adding a circuit in a 1970s house, you find an unidentified cable with no earth continuity and cracked insulation, outside your quoted work. What do you do?',
    options: [
      'Record it, leave it isolated, and report it in writing to the person who instructed you',
      'Ignore it — you were not paid to look at it',
      'Reconnect it as found so the customer is not inconvenienced',
      'Strip it out without telling anyone, to tidy the job up',
    ],
    correctAnswer: 0,
    explanation:
      'Scope limits what you are paid to do, not what you are allowed to know. A dangerous condition you have seen is one you must report, in writing.',
  },
  {
    id: 5,
    question: 'Why does a pre-refurbishment asbestos survey change how you route a sub-main?',
    options: [
      'It tells you what must not be drilled or disturbed, so the route is planned around it before any tool comes out',
      'It only matters to the demolition contractor',
      'It allows you to drill anything provided you wear a dust mask',
      'It expires the moment work starts, so it can be disregarded',
    ],
    correctAnswer: 0,
    explanation:
      'The survey exists so people who cut into the fabric know what is in it. Reading it afterwards means the disturbance has already happened.',
  },
  {
    id: 6,
    question:
      'You are working in a care home corridor. What changes compared with an empty new build?',
    options: [
      'Occupants are untrained, may not move quickly and may not understand barriers, so the area needs continuous control',
      'Nothing — the electrical work is identical, so the method is identical',
      'You can work faster because no main contractor is supervising',
      'Personal protective equipment is no longer needed indoors',
    ],
    correctAnswer: 0,
    explanation:
      'The building is someone&rsquo;s home. Control means physical separation, someone watching the area, and leaving it safe every time you step away.',
  },
  {
    id: 7,
    question: 'What does a good handover pack contribute to the safety of the building?',
    options: [
      'It lets the next person work without guessing — circuits identified, alterations recorded, certification issued',
      'It satisfies the customer that the invoice is justified',
      'It is only useful for warranty claims',
      'It removes the need to test the installation',
    ],
    correctAnswer: 0,
    explanation:
      'Every unlabelled circuit is a future risk. What you leave decides whether the next electrician isolates the right thing.',
  },
  {
    id: 8,
    question: 'Under BS 7671 Part 6, when must an installation be inspected and tested?',
    options: [
      'On completion, before being put into service, to verify so far as is reasonably practicable that BS 7671 has been met',
      'Only when the client specifically asks for a certificate',
      'Only on new build, never on alterations',
      'At any point within twelve months of energising',
    ],
    correctAnswer: 0,
    explanation:
      'Part 6 requires inspection and testing on completion, before the installation is put into service. Energising first leaves the building live but unverified.',
  },
];

export default function Lesson302_1_3() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'Your cables, penetrations and boards are part of the building&rsquo;s safety. A hole through a compartment wall is a defect you created.',
          'What you breach, you make good — reinstated so the element performs as it did, by a method suited to that construction and that service.',
          'An escape route must work in the dark, with the power off, for someone slow moving. Materials in a corridor are an obstruction, not untidiness.',
          'Isolation only counts if a non-electrician can find it, reach it and operate it. Labels and position are safety features.',
          'Record what you find, report what is dangerous, and hand over information the next person can actually work from.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Explain how electrical installation work forms part of a building&rsquo;s safety rather than sitting alongside it.',
          'Describe the discipline of making good any breach of a fire-rated element you create, and why continuity matters.',
          'Identify how escape routes, emergency lighting and means of isolation are affected by installation work.',
          'Explain the correct response to inherited defects and unknown circuits found outside the agreed scope.',
          'Describe safe working in occupied buildings and around fabric that must not be disturbed, and the safety value of handover.',
        ]}
        initialVisibleCount={3}
      />
      <SectionRule />

      <ContentEyebrow>Part of the building fabric</ContentEyebrow>

      <ConceptBlock
        title="Your work is part of the building, not a separate system in it"
        plainEnglish="The building is one safety system. Your cable route runs through it, so your decisions change it."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>A cable route is a structural decision.</strong> Where the cable goes decides
            what you cut, notch and penetrate.
          </li>
          <li>
            <strong>A penetration is a building-safety item.</strong> Hole a fire-rated element and
            it stops doing its job until you reinstate it.
          </li>
          <li>
            <strong>An isolator is an emergency control.</strong> Somebody may operate it with no
            training, under pressure, possibly in the dark.
          </li>
          <li>
            <strong>A label is safety equipment.</strong> Without it the next person guesses, and
            guessing is how people get hurt.
          </li>
          <li>
            <strong>Damage counts even when it still works.</strong> BS 7671 Regulation 134.1.1
            requires that insulation of live parts is not damaged during erection, and that
            enclosures are not damaged or deteriorated during installation in any way that impairs
            safety.
          </li>
        </ul>
      </ConceptBlock>
      <SectionRule />

      <ContentEyebrow>Compartmentation and escape routes</ContentEyebrow>

      <ConceptBlock
        title="Compartmentation: what you breach, you make good"
        onSite="Before you drill, know what the wall or floor is doing. After you drill, put it back."
      >
        <p className="text-white">
          Buildings are divided so a fire in one part is held back from another. Walls, floors and
          ceilings do that, and only while they stay continuous. A 50 mm hole with a cable through
          it and a gap round it is a route for smoke, and smoke moves long before flame.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Identify the element first.</strong> Ask what the wall or floor is for.
            Drawings, the main contractor or the building manager know.
          </li>
          <li>
            <strong>Make good to the standard it was.</strong> A fire-stopping system suited to that
            construction, that opening size and that service.
          </li>
          <li>
            <strong>Match the seal to the service.</strong> Plastic conduit, singles, SWA and
            trunking all behave differently in a fire.
          </li>
          <li>
            <strong>Expanding foam is not fire-stopping.</strong> It seals draughts. Using it
            because it is in the van is the commonest failure.
          </li>
          <li>
            <strong>Record the penetration.</strong> Where, through what, sealed with what, by whom.
            A seal nobody can find is a seal nobody can check.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="302-1-3-check-1"
        question="You have pulled three SWAs through one opening in a compartment floor. How should it be closed?"
        options={[
          'With a fire-stopping system rated for that floor construction and suitable for those cables, then recorded with its location',
          'Packed with mineral wool offcuts left by the insulation contractor',
          'Filled round the cables with expanding foam and painted over',
          'Left open, and mentioned verbally to the site manager at the end of the week',
        ]}
        correctIndex={0}
        explanation="The reinstatement has to restore the floor&rsquo;s performance, so it must suit that construction and those services. Recording it means the seal can be inspected later instead of taken on trust."
      />
      <SectionRule />

      <ConceptBlock
        title="Escape routes and emergency lighting"
        plainEnglish="The way out has to work in the dark, with the power off, for someone who cannot move fast."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Obstruction is a live hazard.</strong> Drums, steps and offcuts in a corridor
            are a reason somebody does not get out.
          </li>
          <li>
            <strong>Doors keep working.</strong> Do not wedge a self-closing door open to run a
            cable or a lead.
          </li>
          <li>
            <strong>Emergency lighting must work with the supply off.</strong> Isolate a circuit
            feeding luminaires with an emergency function and you may have taken the charge off part
            of the system without noticing.
          </li>
          <li>
            <strong>Tell someone before you kill a system.</strong> Switching off emergency
            lighting, alarms or door controls changes the building&rsquo;s safety arrangements for
            as long as it is off.
          </li>
          <li>
            <strong>Put it back before you leave.</strong> Every day, not just at the end of the
            job. Nobody schedules a fire for a convenient evening.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="CDM 2015"

        clause="Regulation 17 — Safe places of construction work"

        meaning="Regulation 17 (safe places of construction work) requires that there must, so far as is reasonably practicable, be suitable and sufficient safe access to and egress from every place of work; that a construction site must be kept safe and without risks to health for any person at work there; and that there must be sufficient working space arranged to suit anyone working there. Read that against a corridor with a cable drum in it. Safe access and egress is the requirement, not a housekeeping preference."

        cite="HSE L153, Managing health and safety in construction"
      />
      <SectionRule />

      <ContentEyebrow>Isolation and inherited work</ContentEyebrow>

      <ConceptBlock
        title="Isolation somebody else can find and use"
        onSite="If a cleaner, a nurse or a fire officer cannot find the switch, you have not finished."
      >
        <p className="text-white">
          Ask a blunt question at the end of every job. If something goes wrong at two in the
          morning and there is no electrician in the building, can the person who is there switch it
          off?
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Position matters as much as rating.</strong> An isolator behind stacking chairs,
            or in a locked cupboard whose key lives in another building, is not available when it is
            needed.
          </li>
          <li>
            <strong>Labels are written for the reader.</strong> &ldquo;DB2/14&rdquo; means nothing
            to a care assistant. &ldquo;Kitchen sockets — south wall&rdquo; does.
          </li>
          <li>
            <strong>Say what it does not isolate.</strong> A local isolator leaving a controls
            supply live must say so, or the machine is assumed dead.
          </li>
          <li>
            <strong>Durable, not marker pen.</strong> A label that has faded in two years is worse
            than none, because people trust it.
          </li>
          <li>
            <strong>Show the occupier where it is.</strong> Walking the responsible person round the
            boards at handover is the only time anyone is shown.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="302-1-3-check-2"
        question="A hand dryer circuit is isolated by a fused connection unit hidden above a ceiling tile. Why is that a safety problem, not just an inconvenience?"
        options={[
          'In an emergency a non-electrician cannot find or reach the means of isolation, so the equipment cannot be made safe quickly',
          'It makes future testing take slightly longer',
          'Suspended ceilings are never permitted to contain accessories',
          'It is only a problem if the circuit exceeds 20 A',
        ]}
        correctIndex={0}
        explanation="Isolation that depends on inside knowledge and a ladder is not isolation when it is needed. Accessibility and identification are part of what makes the installation safe."
      />
      <SectionRule />

      <ConceptBlock
        title="What you inherit: old installations and other people&rsquo;s alterations"
        plainEnglish="You did not create it, but once you have seen it you own the decision about what to do."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Scope limits the work, not the duty.</strong> You were paid to add two circuits.
            You were not paid to ignore a missing main protective bonding conductor in plain sight.
          </li>
          <li>
            <strong>Record what you find, in writing.</strong> A photograph and a line in your
            report beats a remark on the way out.
          </li>
          <li>
            <strong>Separate dangerous from untidy.</strong> Exposed live parts are one category; an
            ugly cable run is another. Say which is which.
          </li>
          <li>
            <strong>Make safe what cannot be left.</strong> Immediately dangerous means isolated,
            locked off and reported, whatever the quote said.
          </li>
          <li>
            <strong>Identify unknown circuits.</strong> Trace it, prove it dead, label it — or you
            have taken responsibility for it.
          </li>
          <li>
            <strong>Say what you did not inspect.</strong> Silence reads as &ldquo;checked and
            fine&rdquo;.
          </li>
        </ul>
      </ConceptBlock>
      <SectionRule />

      <ContentEyebrow>Working in occupied buildings</ContentEyebrow>

      <ConceptBlock
        title="Working safely in an occupied building"
        onSite="They are not site-trained, they are not wearing boots, and some of them cannot move quickly."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Physical separation beats signs.</strong> A sign informs somebody who reads it.
            A barrier stops somebody who does not.
          </li>
          <li>
            <strong>Assume people cannot evacuate quickly.</strong> Residents with frames, small
            children, people with sensory impairments.
          </li>
          <li>
            <strong>Leave it safe every time you step away.</strong> Open board doors and trailing
            leads get no grace period for a tea break.
          </li>
          <li>
            <strong>Dust and noise are hazards too.</strong> Drilling above a sleeping resident is a
            planning question, not a courtesy.
          </li>
          <li>
            <strong>Agree isolations in advance.</strong> A circuit may feed equipment somebody
            depends on. Their staff decide when, not you.
          </li>
          <li>
            <strong>Learn their arrangements.</strong> Where people assemble, who you report to, how
            you raise an alarm.
          </li>
        </ul>
      </ConceptBlock>
      <SectionRule />

      <ConceptBlock
        title="Safety of the fabric: find out before you cut"
        plainEnglish="That wall might be holding the building up, holding fire back, or full of something you must not disturb."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Asbestos-containing materials.</strong> If a survey exists, read it before
            planning the route. If none exists and the building is old enough to worry about, stop
            and ask rather than test it with a drill.
          </li>
          <li>
            <strong>Structural elements.</strong> Beams, columns and pre-stressed floor units must
            not be drilled or notched without a designer&rsquo;s agreement. &ldquo;It is only a
            small hole&rdquo; is not an engineering judgement.
          </li>
          <li>
            <strong>Buried services.</strong> Gas, water, heating, data, sprinkler pipework. Scan
            and read the drawings before you break out.
          </li>
          <li>
            <strong>Damp-proof courses and membranes.</strong> Drill through one and you have given
            water a path that shows up years later.
          </li>
          <li>
            <strong>Historic and listed fabric.</strong> Older stone and timber buildings in Wales
            often restrict what can be cut at all.
          </li>
          <li>
            <strong>Get agreement in writing.</strong> An email confirming a penetration takes a
            minute and settles the argument later.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="302-1-3-check-3"
        question="You need to cross a concrete floor slab with a new sub-main in a building of uncertain age. What comes first?"
        options={[
          'Core it in the most convenient position and inspect the debris afterwards',
          'Find out what the slab is and what it contains — drawings, surveys, the person responsible for the building — before choosing the route',
          'Use a smaller core so any reinforcement you cut matters less',
          'Ask another trade where they cored and copy the position',
        ]}
        correctIndex={1}
        explanation="Finding out comes first because the information changes the route. Coring first and looking afterwards means the damage and the breach have already happened."
      />
      <SectionRule />

      <ContentEyebrow>Handover as a safety act</ContentEyebrow>

      <ConceptBlock
        title="Handover is a safety act, not paperwork"
        onSite="What you leave behind decides whether the next person works safely or works blind."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Certification records the verification.</strong> BS 7671 Part 6 requires that
            every installation shall, on completion before being put into service, be inspected and
            tested to verify, so far as is reasonably practicable, that the requirements of BS 7671
            have been met.
          </li>
          <li>
            <strong>Schedules describe reality.</strong> A circuit chart copied from the old board
            is a trap. It must describe what is connected now.
          </li>
          <li>
            <strong>Alterations get written down.</strong> The circuit you moved, how you re-fed it,
            the point you abandoned. Undocumented changes are why future isolation goes wrong.
          </li>
          <li>
            <strong>Fire-stopping records belong in the pack.</strong> Locations and products, so
            seals can be inspected rather than assumed.
          </li>
          <li>
            <strong>State what is outstanding.</strong> A known limitation written plainly is safer
            than a clean-looking record with a gap in it.
          </li>
          <li>
            <strong>Show somebody, in person.</strong> Walk the responsible person round the boards,
            the isolators and the emergency lighting test switch.
          </li>
        </ul>
      </ConceptBlock>
      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Treating the hole as somebody else&rsquo;s job"

        whatHappens={
          <>
            The most frequent building-safety failure caused by electrical work is not a wiring
            error. It is a penetration that was never reinstated. It happens the same way every
            time: the cable goes through on the Friday, the intention is to seal it on the Monday,
            the ceiling grid goes in over the weekend, and the opening disappears from view while
            staying wide open inside the void.
          </>
        }

        doInstead={
          <>
            The fix is a habit, not a rule. You do not leave the area with an unsealed penetration
            you created. If you genuinely cannot seal it that day, you mark it, record it and tell
            the person who controls the area in writing, so it sits on somebody&rsquo;s list rather
            than in somebody&rsquo;s memory.
          </>
        }
      />

      <CommonMistake
        title="Labelling the board for the next electrician instead of the person who will need it"
        whatHappens={
          <>
            <p>
              The new ways are labelled the way you would want to find them: accurate, brief,
              correct. At two in the morning the person standing in front of that board is a care
              assistant or a night porter, and what they read means nothing to them. They switch
              off something else, or they switch nothing off and wait for somebody to arrive.
            </p>
            <p>
              The physical side goes the same way. An isolator ends up behind stacking chairs, or
              in a cupboard whose key lives in another building, or above a ceiling tile. It is
              rated correctly, it is installed correctly, and it is not available at the moment it
              is needed.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Write the label for the reader who is not an electrician, in plain words that name
              the thing and the place, and say what the device does not isolate where a supply is
              left live. Make it durable: a label that has faded in two years is worse than none,
              because people trust it.
            </p>
            <p>
              Then treat position as part of the design. Keep the front of the board and every
              isolator reachable, and at handover walk the responsible person round the boards, the
              isolators and the emergency lighting test switch. That walk is usually the only time
              anybody is ever shown.
            </p>
          </>
        }
      />
      <SectionRule />

      <Scenario
        title="Bridgend — a care home corridor, a locked store and a Friday afternoon"

        situation={
          <>
            You are second-fixing nurse-call and lighting circuits in a residential care home in
            Bridgend. The corridor you are working in is the only route from eight bedrooms to the
            final exit, and residents use it with frames. The new sub-main runs from a board in a
            store cupboard, through the compartment wall at the end of the corridor, into the day
            room ceiling void.
          </>
        }

        whatToDo={
          <>
            By three o&rsquo;clock three things have gone wrong. The 65 mm opening you cored through
            the compartment wall is open with the SWA hanging through it. The store cupboard has
            been refilled by home staff with stacking chairs and a hoist, so the board is behind
            them. And your steps, two drums and a bag of trunking are along the corridor, because
            the day room is in use for a family visit. The manager wants you gone by four. Your
            fire-stopping delivery is due Monday, and a trip to the wholesaler is two hours you are
            not being paid for. <strong>The corridor.</strong> Clear it now, into the van or the
            locked store, not to the far wall. That corridor is the escape route for people who
            cannot hurry, and it is not negotiable. <strong>The hole.</strong> You cannot leave an
            open breach through a compartment wall in an occupied care home over a weekend and call
            it a Monday job. Two honest options: fetch a correct fire-stopping system this afternoon
            and seal it, or tell the manager in writing before you leave exactly where the breach is
            and that it is unsealed, so the home can put a control in place. The second is worse.
            Doing neither, and saying nothing, is the one that ends careers.{' '}
            <strong>The store cupboard.</strong> Clear the front of the board, label it plainly,
            show the manager what it switches, and put the need for clear access in the handover
            note. If it keeps filling up, the honest answer is that the board is in the wrong place
            — not that the staff need telling again.
          </>
        }

        whyItMatters={
          <>
            You go over by ninety minutes and you pay for the wholesaler trip yourself. The
            alternative was a compartment wall with a hole in it, an isolator behind a hoist, and
            your name on the job.
          </>
        }
      />
      <SectionRule />

      <FAQ
        items={[
          {
            question:
              'The main contractor has a fire-stopping subcontractor. Can I just leave my holes?',
            answer:
              'Only if that is formally agreed, the subcontractor knows where every one of your penetrations is, and it is recorded. In practice the handover of that information is where it fails. You are the only person who knows exactly where you drilled, so listing your penetrations and passing the list over remains your job — and until a breach is sealed in an occupied building, somebody needs to be told it is there.',
          },
          {
            question:
              'I found dangerous work by a previous electrician but the customer will not pay to fix it. What now?',
            answer:
              'You are not obliged to work for nothing, but you are obliged to be straight. Put what you found in writing, describe the risk plainly enough for a non-electrician, and say it needs attention. If something is immediately dangerous, isolate and lock off, and say you have done so. The decision then sits with the person who owns the building, on the record, rather than with you in silence.',
          },
          {
            question: 'How is an occupied building really different from a site?',
            answer:
              'On a site everyone around you is trained, equipped and expecting hazards. In an occupied building nobody is. Separation has to be physical rather than advisory, the area must be left safe every time you step away rather than at the end of the day, and any isolation has to be agreed with the people who run the building, because somebody may depend on the supply you are about to switch off.',
          },
          {
            question: 'Is labelling a safety issue or just good practice?',
            answer:
              'It becomes a safety issue the moment somebody other than you needs to act. The person who has to switch something off in a hurry is usually not an electrician and has no drawings. A durable, plain-language label at an accessible isolator is the difference between an incident stopped in seconds and one that runs until help arrives.',
          },
        ]}
      />
      <SectionRule />

      <KeyTakeaways
        points={[
          'Electrical work is part of the building&rsquo;s safety. Your routes, penetrations, boards and labels change how safe the building is.',
          'What you breach, you make good — reinstated so the element performs as it did, with a system suited to that construction and service, and recorded.',
          'General-purpose foam and insulation offcuts are not fire-stopping. Sealing with whatever is in the van is the commonest failure.',
          'An escape route must work in the dark, with the power off, for someone who cannot move quickly. CDM 2015 Regulation 17 requires safe access and egress.',
          'Isolation counts only if a non-electrician can find it, reach it and understand what it switches. Position and labelling are safety features.',
          'Record what you inherit and report what is dangerous, regardless of scope — and say what you did not inspect.',
          'In occupied buildings assume people are untrained, unprotected and sometimes unable to evacuate quickly. Physical separation beats signage.',
          'Find out before you cut, and hand over information the next person can act on, including certification under BS 7671 Part 6.',
        ]}
      />
      <SectionRule />

      <ContentEyebrow>Check yourself</ContentEyebrow>

      <Quiz
        questions={quizQuestions}
        title="Safety of the built environment — check your understanding"
      />
    </div>
  );
}
