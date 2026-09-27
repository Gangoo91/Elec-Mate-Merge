/**
 * Unit 305E — Understand How to Install Wiring Systems
 * Learning Outcome 1 — Wiring systems, enclosures and the accessories used with them
 * Criterion 1.2 — The requirements of industrial plugs, sockets, and couplers
 *
 * Approach: teach the industrial connector as equipment chosen for a hostile environment,
 * not as a bigger domestic plug. The spine is coding, keying and interlocking — the
 * constructional features that stop an incompatible supply being joined and stop live
 * contacts being exposed. Everything else hangs off selection for the conditions.
 *
 * This criterion was a gap: no existing lesson in our courses covers industrial plugs,
 * socket-outlets and couplers, so this page is the only place a learner meets it.
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
    question: 'What is the purpose of coding and keying on an industrial plug and socket-outlet?',
    options: [
      'So a plug cannot be inserted into a socket-outlet intended for a different supply type',
      'So the plug is easier to grip when the operator is wearing gloves',
      'So the cable can be identified after it has been buried in a trench',
      'So the accessory can be sold at a higher price than a domestic one',
    ],
    correctAnswer: 0,
    explanation:
      'Coding and keying are constructional features. They make the connector mechanically incompatible with connectors intended for a different supply, so two supplies that must not be joined physically cannot be joined. You still read the rating and coding off the device and the specification.',
  },
  {
    id: 2,
    question: 'What does an interlocked socket-outlet achieve?',
    options: [
      'The contacts cannot be live while accessible, so the plug cannot be withdrawn on load',
      'The socket-outlet resets itself automatically once a fault has been cleared',
      'The socket-outlet measures the current drawn by the connected equipment',
      'The socket-outlet accepts any plug once the lid has been closed',
    ],
    correctAnswer: 0,
    explanation:
      'Interlocking ties the switch to the plug. You cannot reach live contacts, and you cannot pull the plug while the supply is on. That matters most where these connectors live: wet, outdoors, and used by people who are not electricians.',
  },
  {
    id: 3,
    question: 'Which standard covers the construction and performance of industrial plugs and socket-outlets intended for connection to fixed wiring?',
    options: [
      'BS EN IEC 60309-2',
      'The manufacturer catalogue for the range being installed',
      'The site safety policy issued by the principal contractor',
      'The equipment schedule attached to the installation certificate',
    ],
    correctAnswer: 0,
    explanation:
      'BS EN IEC 60309-2 specifies the construction and performance requirements for industrial plugs and socket-outlets intended for connection to fixed wiring. BS EN IEC 60309-1 carries the general requirements, including the classification used where a socket-outlet must be interlocked.',
  },
  {
    id: 4,
    question: 'Where in BS 7671 would you look for requirements covering construction and demolition site installations?',
    options: [
      'Part 7, Section 704',
      'The definitions in Part 2',
      'The assessment of general characteristics in Part 3',
      'The current-carrying capacity tables in the appendices',
    ],
    correctAnswer: 0,
    explanation:
      'Section 704 is titled Construction and demolition site installations and covers temporary installations on those sites. Amendment 4 made a number of small changes to it, including requirements addressing external influences.',
  },
  {
    id: 5,
    question: 'A site connector has a cracked body and one visibly bent pin. What is the correct action?',
    options: [
      'Take it out of service and replace it with the correct type from the specification',
      'Straighten the pin with pliers, refit it and note the repair in the site diary',
      'Tape the crack, keep it in service and report it at the next weekly inspection',
      'Fit a domestic accessory instead because the load is small',
    ],
    correctAnswer: 0,
    explanation:
      'A damaged connector has lost the protection it was selected for. The body keeps water and dirt out and the pins carry the current. Neither is repairable on site. Withdraw it and replace it like for like against the specification.',
  },
  {
    id: 6,
    question: 'Why is a long accumulation of flexible leads joined by couplers a risk on a site compound?',
    options: [
      'Every coupler is a joint that can part, sit in water or be driven over, and the run trips people',
      'Couplers reduce the colour intensity of the cable sheath over time',
      'Couplers cannot be used outdoors under any circumstances',
      'Couplers are only permitted where the cable is armoured',
    ],
    correctAnswer: 0,
    explanation:
      'A coupler joins two flexible cables. Each one adds a mechanical weak point, somewhere water can collect and something else to be run over. The answer is a properly designed distribution arrangement rather than an ever-growing chain of leads.',
  },
  {
    id: 7,
    question: 'Which BS 7671 requirement most directly supports choosing a connector that suits a wet, exposed position?',
    options: [
      'Regulation 512.2.1 — equipment shall be of a design appropriate to the situation of use',
      'The requirement to label every socket-outlet with its date of installation',
      'The requirement to fit every socket-outlet at the same height',
      'The requirement to use one manufacturer throughout an installation',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 512.2.1 states that equipment shall be of a design appropriate to the situation in which it is to be used, and that the installation shall take account of the conditions likely to be encountered. That is the selection question in one sentence.',
  },
  {
    id: 8,
    question: 'A pitch supply on a camping park will not accept the plug on a customer touring caravan. What should the electrician do?',
    options: [
      'Leave both alone and investigate why the equipment does not match the specified supply',
      'File the plug pins down until they enter the socket-outlet',
      'Fit an adaptor made up on site from spare parts in the van',
      'Swap the socket-outlet for a domestic accessory the plug will fit',
    ],
    correctAnswer: 0,
    explanation:
      'If a plug will not enter a socket-outlet, the coding and keying are doing their job. Modifying either side defeats the protection the construction was designed to give. Establish what the supply is meant to be and put the right equipment on it.',
  },
];

export default function Lesson305e_1_2() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'An industrial connector is built for wet, dirty, mechanically abused work and for being plugged and unplugged over and over, often outdoors and often by someone in gloves.',
          'Coding and keying are the core idea: the connector is constructed so a plug cannot enter a socket-outlet intended for a different supply type.',
          'Never assert what a particular coding means from memory. Read the rating and coding off the device and off the specification for the job.',
          'Interlocking means the contacts cannot be live while accessible. Switch off before the plug comes out, and the plug cannot come out while it is live.',
          'On site the failures are physical: dropped bodies, driven-over leads, connectors left in puddles and bent pins. Damaged connectors are a frequent finding.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Explain what distinguishes an industrial plug, socket-outlet or coupler from a domestic accessory, and why the difference is about environment and handling rather than size.',
          'Describe how coding and keying prevent a plug being connected to a socket-outlet intended for a different supply type, and why you read the rating and coding off the device and the specification.',
          'Explain what an interlocked socket-outlet does, and why preventing live accessible contacts matters in wet and outdoor locations.',
          'Select an industrial connector for the conditions it will meet, taking account of ingress, mechanical damage, mounting position and how the equipment will be handled.',
          'Recognise the common defects found on site connectors and couplers, and state the correct action when one is found damaged.',
        ]}
        initialVisibleCount={3}
      />

      <SectionRule />

      <ContentEyebrow>Built for a hostile environment</ContentEyebrow>

      <ConceptBlock
        title="What makes a connector industrial"
        plainEnglish="It is not a bigger domestic plug. It is equipment designed for a hostile environment and for constant handling."
      >
        <p>
          A domestic plug lives indoors and stays put for months. An industrial connector gets
          connected and disconnected several times a day, dropped on concrete, left in a puddle in a
          site compound overnight and handled by a groundworker in wet gloves who is looking at the
          machine rather than the plug. Every feature of the construction follows from that:
          impact-resistant body, sprung lid, glanded cable entry, shrouded contacts. BS EN IEC
          60309-2 specifies the construction and performance requirements for industrial plugs and
          socket-outlets intended for connection to fixed wiring.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Repeated use.</strong> The mechanism is built for many connections and
            disconnections, not a one-off installation.
          </li>
          <li>
            <strong>Weather and dirt.</strong> Seals, lids and glands keep water and solids out of
            the contact chamber.
          </li>
          <li>
            <strong>Mechanical abuse.</strong> The body survives being dropped, kicked and knocked
            by plant.
          </li>
          <li>
            <strong>Gloved handling.</strong> Shape, grip and latch are sized for heavy gloves in
            poor light.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Coding, keying and interlocking</ContentEyebrow>

      <ConceptBlock
        title="Coding and keying — the principle that keeps supplies apart"
        plainEnglish="The connector is built so a plug cannot be pushed into a socket-outlet intended for a different supply. You cannot join the wrong two things by accident."
      >
        <p>
          This is the most important idea on the page. Coding and keying are constructional features
          built into the plug and the socket-outlet so the two halves only mate when they belong
          together. The protection is mechanical: it does not rely on anybody reading a label and it
          does not rely on anybody being careful. On a working site there may be more than one kind
          of supply in the same compound, arriving on similar looking leads. If those connectors
          could all be joined to each other, sooner or later somebody would join two that must never
          meet.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Mechanical, not advisory.</strong> The mismatch is prevented by the shape of the
            parts, not by a warning notice.
          </li>
          <li>
            <strong>Both halves matter.</strong> The plug, the socket-outlet and any coupler in the
            run must all be the matching type.
          </li>
          <li>
            <strong>Read, do not remember.</strong> The rating and coding are marked on the device
            and stated in the specification. That is where you get them from, every time.
          </li>
          <li>
            <strong>Never adapt.</strong> Filing, forcing or making up an adaptor destroys the one
            feature the connector exists for.
          </li>
        </ul>
        <p>
          You will hear site shorthand for connector types. Do not work from shorthand and do not
          work from memory. Look at what is marked on the device, check it against the specification
          and the equipment, and if the two disagree, stop and find out why.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ConceptBlock
        title="Interlocking — dead before it comes apart"
        onSite="Switch off, then the plug comes out. While the supply is on, the plug stays put and the contacts stay out of reach."
      >
        <p>
          An interlocked socket-outlet ties the switch and the plug together mechanically. With the
          supply on you cannot withdraw the plug; to withdraw the plug you must switch off first, and
          once it is out the contacts are not live. Picture where that is used: a pitch supply in the
          rain, a distribution unit at the edge of a compound with water running past it, a supply
          pillar on a pontoon. In each case somebody who is not an electrician will walk up and pull
          a plug, possibly with wet hands, possibly while the load is running.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>No live withdrawal.</strong> Breaking a connection on load is what pits and burns
            contacts and produces arcing at the connector face.
          </li>
          <li>
            <strong>No accessible live parts.</strong> Once the plug is out, there is nothing live to
            reach.
          </li>
          <li>
            <strong>Predictable for non-electricians.</strong> The sequence is forced by the
            hardware, so the user cannot get it wrong.
          </li>
          <li>
            <strong>Water tolerant.</strong> Plug out and lid closed, the contact chamber is shut
            against the weather.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026"
        clause="Regulation 708.55.1.1(a)"
        meaning="For a caravan or camping park pitch supply, every socket-outlet or connector shall comply with BS EN IEC 60309-2 and shall be interlocked and classified to Clause 6.5 of BS EN IEC 60309-1 to prevent the socket contacts being live when accessible. In plain terms: the connector must be the industrial type, and it must be built so you cannot reach live contacts."
        cite="BS 7671 Part 7, Section 708"
      />

      <SectionRule />

      <ContentEyebrow>Locations, and selecting for them</ContentEyebrow>

      <ConceptBlock
        title="Where you meet these connectors"
        plainEnglish="Anywhere with weather, movement, temporary arrangements and people who are not electricians doing the plugging in."
      >
        <p>
          What these locations have in common is more useful than the list: the installation is
          exposed, things move about, the arrangement changes from week to week, and the person
          connecting the load is rarely the person who installed the supply.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Construction and demolition sites.</strong> Section 704 of BS 7671 is where the
            requirements for construction and demolition site installations live, and Amendment 4
            made a number of small changes to it including requirements addressing external
            influences.
          </li>
          <li>
            <strong>Caravan and camping parks.</strong> Section 708 covers electrical installations
            in caravan and camping parks and similar locations, with specific requirements for
            socket-outlets, residual current protection, operational conditions and external
            influences.
          </li>
          <li>
            <strong>Marinas and similar locations.</strong> Salt, spray, movement and long flexible
            leads running along pontoons.
          </li>
          <li>
            <strong>Agricultural buildings.</strong> Washdown, dust, corrosive atmospheres and
            livestock.
          </li>
          <li>
            <strong>Industrial plant.</strong> Machines moved, swapped out and reconnected as
            production changes.
          </li>
          <li>
            <strong>Temporary event supplies.</strong> Stages, catering units and cabins built in a
            day and run in the weather.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="305e-1-2-check-1"
        question="A site engineer asks you to make up a short lead so plant can be connected to a supply its plug does not fit. What is the correct response?"
        options={[
          'Refuse, and establish what supply the plant actually requires against the specification',
          'Make the lead up, but only if both ends are from the same manufacturer',
          'Make the lead up and label it clearly so nobody else uses it',
          'Fit a domestic accessory on one end because it is only temporary',
        ]}
        correctIndex={0}
        explanation="The plug not fitting is the coding and keying working as intended. Making an adaptor defeats it. Go back to the specification and the equipment rating plate and sort out the real mismatch."
      />

      <SectionRule />

      <ConceptBlock
        title="Selecting for the conditions — ingress and mechanical protection"
        plainEnglish="Choose for the environment the connector will sit in, not the environment on the day you install it."
      >
        <p>
          Regulation 512.2.1 of BS 7671 states that equipment shall be of a design appropriate to the
          situation in which it is to be used, and that the installation shall take account of the
          conditions likely to be encountered. Read that second half carefully: not the conditions on
          the day, but the conditions likely to be encountered. A compound that is dry in July is a
          lake in November. The selection has two halves — what is going to try to get inside, and
          what is going to hit it. Both are read off the specification and the manufacturer data.
          Never assume a protection level from the look of a product and never quote one from memory.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Which way does it face.</strong> A socket-outlet facing upwards collects water.
            Facing down or angled sheds it.
          </li>
          <li>
            <strong>Is the lid working.</strong> A sprung lid that has lost its spring no longer
            provides what it was selected for.
          </li>
          <li>
            <strong>Is the gland right.</strong> Correct type, correctly sized, correctly tightened.
            An oversized gland is an open hole.
          </li>
          <li>
            <strong>Can a vehicle reach it.</strong> Mounting position, height and physical
            protection. A telehandler does not read notices either.
          </li>
          <li>
            <strong>Where does the lead run.</strong> Across a haul road is a different problem from
            along a fence line.
          </li>
          <li>
            <strong>What is in the air.</strong> Dust, washdown chemicals, salt spray and ammonia all
            attack different things.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 512.2.1"
        clause="512.2.1 Equipment shall be of a design appropriate to the situation in which it is to be used or its mode of installation shall take account of the conditions likely to be encountered."
        meaning="Two ways to satisfy one requirement. Either the connector itself is built for the place it is going, or the way you install it makes up the difference &mdash; under cover, turned to shed water, mounted clear of the haul road. What you cannot do is fit something unsuited to the location and leave it at that. The phrase to hold on to is &ldquo;likely to be encountered&rdquo;: you are selecting for the worst week of the year, not for the weather on the day you fit it."
        cite="BS 7671 Part 5, Chapter 51, Section 512 — Regulation 512.2.1"
      />

      <SectionRule />

      <ContentEyebrow>Couplers and chained leads</ContentEyebrow>

      <ConceptBlock
        title="Couplers and connectors in a lead"
        plainEnglish="A coupler joins two flexible cables. Each one you add is another joint that can part, flood or be run over."
      >
        <p>
          A coupler is the pair of parts that joins one flexible cable to another so the run
          continues. It is legitimate equipment, coded and keyed like everything else in the family.
          The problem is what happens when a site starts solving distance with couplers. One lead was
          not long enough so a second went on, then a third, and now there are three joints in the
          mud between the board and the tool, one under a scaffold board and one in a wheel rut.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Every joint is a liability.</strong> More joints means more damage, more water
            ingress and more chance of a lead parting under load.
          </li>
          <li>
            <strong>Volt drop and heat.</strong> Long chained runs bring electrical problems on top
            of the mechanical ones.
          </li>
          <li>
            <strong>Trip and snag.</strong> The accumulation itself becomes the hazard where leads
            cross access routes.
          </li>
          <li>
            <strong>The real fix is distribution.</strong> Move the supply closer with a properly
            designed distribution arrangement rather than growing the chain.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="305e-1-2-check-2"
        question="Which of these best describes a coupler in the context of industrial connectors?"
        options={[
          'A device that converts one supply type into another',
          'A mechanical clamp used to fix a cable to a structure',
          'A pair of mating parts used to join one flexible cable to another',
          'A terminal block used inside a distribution enclosure',
        ]}
        correctIndex={2}
        explanation="A coupler joins two flexible cables so the run continues. It is coded and keyed like the rest of the family, and every coupler in a run is another joint that can be damaged, flooded or pulled apart."
      />

      <SectionRule />

      <ContentEyebrow>Defects and the rules on site</ContentEyebrow>

      <ConceptBlock
        title="What actually goes wrong — inspection and maintenance"
        onSite="Look at the ones lying in the mud first. That is where the findings are."
      >
        <p>
          When you inspect industrial connectors you are mostly looking for physical damage, and the
          defects are visible if you pick the thing up and turn it over. Damaged connectors are one
          of the most frequent findings on a site inspection, for a simple reason: nobody owns them.
          The lead belongs to whoever is using it today.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Cracked bodies.</strong> Dropped on concrete, run over or crushed. A cracked body
            is no longer keeping anything out.
          </li>
          <li>
            <strong>Bent, burnt or missing pins.</strong> Bent pins come from forcing. Burnt or
            pitted contacts come from breaking on load or from a loose termination.
          </li>
          <li>
            <strong>Missing lids and seals.</strong> The sprung lid is part of the protection.
            Without it the connector is open to the weather.
          </li>
          <li>
            <strong>Failed cable entry.</strong> Gland loose or missing, sheath pulled back out of
            the gland, conductors visible at the entry.
          </li>
          <li>
            <strong>Standing in water.</strong> A connector on the ground in a puddle, or a lead
            coiled in a pool at the bottom of a shaft.
          </li>
          <li>
            <strong>Signs of heat.</strong> Discolouration, distortion or a smell of hot plastic at
            the connector face means stop and investigate.
          </li>
        </ul>
        <p>
          The action is always the same: take it out of service. These are not repairable on site. A
          body is a moulded assembly and a bent pin has already been overstressed. Replace with the
          correct type from the specification and record what you found.
        </p>
      </ConceptBlock>

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Replacing a damaged industrial socket-outlet with a domestic accessory"
        whatHappens={
          <>
            <p>
              A pitch supply gets smashed by a reversing motorhome. The customer is waiting, so
              somebody fits a general purpose accessory in a weatherproof box because that is what is
              in the van. It works, the equipment runs and the job is closed.
            </p>
            <p>
              Everything the original connector provided has quietly gone. No coding and keying, so
              the mechanical barrier against connecting the wrong supply has gone. No interlock, so
              the contacts can be live while accessible and the plug can be pulled on load. The
              enclosure was never selected for that position or those conditions. The next person to
              use it in the rain has none of the protection the installation was designed around.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Treat the connector type as part of the design, not as a consumable. If the correct
              part is not on the van, isolate the supply, make the position safe, put a notice on it
              and come back with the right unit.
            </p>
            <p>
              Replace like for like against the specification, check the coding and rating marked on
              the replacement against the rest of the installation, and confirm the interlock
              operates before you leave. Then write the defect and the replacement down.
            </p>
          </>
        }
      />

      <CommonMistake
        title="Solving distance by adding another coupler"
        whatHappens={
          <>
            <p>
              The lead does not reach, so a second one goes on the end of it, and by Thursday there
              is a third. Nobody made a decision; each joint was the obvious answer to that morning&rsquo;s
              problem. The parts are all proper coded and keyed couplers, so it looks legitimate, and
              the tool works.
            </p>
            <p>
              What has actually been built is a run with three joints in it, one under a scaffold
              board, one in a wheel rut and one lying in the mud. Every joint is somewhere water can
              get in, something can be run over, and the lead can part under load. On top of that the
              run is now long enough to bring volt drop and heat into a job that started as a
              mechanical convenience, and the leads themselves are a trip and snag hazard across the
              access route.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Treat the chain as the symptom and the distribution as the problem. If leads keep being
              joined to reach a working area, the supply is in the wrong place, and the fix is to move
              it closer with a properly designed distribution arrangement rather than growing the
              chain another length at a time.
            </p>
            <p>
              Where a coupler is genuinely needed, keep the number of joints to what the run actually
              requires, position them clear of wheel ruts, puddles and access routes, and inspect them
              as you would any other connector — pick them up, turn them over and look at the body,
              the lid and the contacts. Raise the chained runs you inherit rather than adding to them.
            </p>
          </>
        }
      />

      <SectionRule />

      <ConceptBlock
        title="The practical rules on site"
        plainEnglish="A short list you can apply without thinking, because on site you often will not have time to think."
      >
        <p>
          Almost all the trouble with industrial connectors comes from a handful of shortcuts. Learn
          these as rules and they keep you out of every one of them.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Read the rating off the device.</strong> Not from memory, not from the last one,
            not from what somebody on site tells you.
          </li>
          <li>
            <strong>Check it against the specification.</strong> The design says what pairs with
            what. If the device and the specification disagree, stop.
          </li>
          <li>
            <strong>Never force a connector.</strong> If it does not go in, it is not meant to go in.
          </li>
          <li>
            <strong>Never adapt or modify.</strong> No filing, no made-up adaptors, no swapping parts
            between types.
          </li>
          <li>
            <strong>Never substitute a domestic accessory.</strong> The industrial connector is doing
            several jobs a domestic one does not do at all.
          </li>
          <li>
            <strong>Never pair what the specification did not pair.</strong> Plug and socket-outlet
            are chosen together as part of a supply arrangement.
          </li>
          <li>
            <strong>Switch off before you disconnect.</strong> Even where an interlock would stop
            you, make it the habit.
          </li>
          <li>
            <strong>Get connectors off the ground.</strong> Hang them, bracket them or route the lead
            so the joint is not sitting in water.
          </li>
          <li>
            <strong>Report and record damage.</strong> A defect you noticed and did not write down
            has not been reported.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="305e-1-2-check-3"
        question="Regulation 512.2.1 requires equipment of a design appropriate to the situation in which it is to be used. Which decision does that most directly drive when selecting a site connector?"
        options={[
          'Choosing the cheapest connector the wholesaler holds in stock',
          'Choosing the same connector used on the previous project for consistency',
          'Choosing a connector based on the colour of the enclosure it is mounted in',
          'Choosing a connector and mounting position suited to the water, dirt and impact the location will see',
        ]}
        correctIndex={3}
        explanation="Regulation 512.2.1 also requires the installation to take account of the conditions likely to be encountered. That is a selection question about ingress, mechanical damage and mounting position, answered from the specification and the manufacturer data."
      />

      <SectionRule />

      <Scenario
        title="Llanelli — a flooded connector on a coastal site compound"
        situation={
          <>
            <p>
              You are the approved electrician on a construction site on the edge of Llanelli. It has
              rained for three days and the lower half of the compound is standing water. A
              groundworker tells you the vibrating roller keeps tripping out. You find the lead
              running from a temporary distribution unit, down a bank and into the water, with a
              coupler joint fully submerged halfway along. There is a second coupler further on
              sitting on a scaffold board. The run has clearly grown one lead at a time.
            </p>
            <p>
              The site manager wants the roller working in twenty minutes. He suggests you lift the
              submerged joint out, dry it with a rag and put it back together on a pallet so it is
              off the ground. The compaction gang are on a fixed price and standing still.
            </p>
          </>
        }
        whatToDo={
          <>
            <p>
              Isolate the supply at the distribution unit and lock it off before anything is touched.
              Nothing gets lifted out of that water while it is energised.
            </p>
            <p>
              Withdraw both couplers and the leads from service and inspect them in the dry: bodies
              for cracks, lids and seals, glands and sheath grip, contacts for pitting,
              discolouration or distortion. Anything damaged is replaced, not dried out and refitted.
            </p>
            <p>
              Then fix the real problem, which is the chain of leads. Get a properly installed
              distribution point closer to the work so one correctly rated lead reaches the roller,
              and route it out of the water and off the access route. Confirm the interlock and the
              lid operate on the outlet you use. Record the defects, the replacements and the change
              to the arrangement, and tell the site manager in writing why the compound layout needs
              a permanent answer.
            </p>
          </>
        }
        whyItMatters={
          <>
            <p>
              A joint under water is not a connection any more, it is a fault waiting for somebody to
              be standing in the same puddle. The tripping was the protective device telling you
              something. Drying it with a rag removes the warning and leaves the hazard.
            </p>
            <p>
              The cost of doing it properly is an hour of the gang standing still and a distribution
              point that should have been there anyway. The cost of the shortcut is a shock incident
              in standing water, a site shutdown and an investigation that looks straight at whoever
              signed the temporary installation off.
            </p>
          </>
        }
      />

      <SectionRule />

      <FAQ
        items={[
          {
            question: 'Why can I not just fit an adaptor so the plug fits the socket-outlet?',
            answer:
              'Because the plug not fitting is the protection working. Coding and keying exist so a plug cannot enter a socket-outlet intended for a different supply type. An adaptor removes that mechanical barrier and lets somebody connect equipment to a supply it was never designed for. If a plug will not fit, establish what the equipment requires and what the supply actually is before anything else happens.',
          },
          {
            question: 'How do I know what a connector is rated for?',
            answer:
              'You read it. The rating and coding are marked on the device, and the specification states what should be there. Check the two agree, and check the equipment you are connecting agrees with both. Working from memory, or from what a similar connector was on a different job, is how the wrong thing gets plugged in.',
          },
          {
            question: 'Is interlocking needed everywhere industrial connectors are used?',
            answer:
              'It depends on the location and on what the design calls for, so you check the relevant part of BS 7671 and the specification rather than assuming. Regulation 708.55.1.1(a) is an explicit example: for a caravan or camping park pitch supply, every socket-outlet or connector must comply with BS EN IEC 60309-2 and be interlocked so the socket contacts cannot be live when accessible.',
          },
          {
            question: 'Where do I find the BS 7671 requirements for a construction site?',
            answer:
              'Section 704 in Part 7, titled Construction and demolition site installations. It covers temporary installations on construction and demolition sites, and Amendment 4 made a number of small changes to it including requirements addressing external influences. Read the section itself rather than relying on what somebody tells you is normal practice on that site.',
          },
        ]}
      />

      <SectionRule />

      <KeyTakeaways
        points={[
          'An industrial connector is selected for a wet, dirty, mechanically abused environment and for repeated connection and disconnection, often outdoors and often by someone wearing gloves.',
          'Coding and keying are constructional features that make a plug mechanically incompatible with a socket-outlet intended for a different supply type.',
          'Never state what a particular coding means from memory — read the rating and coding off the device and confirm them against the specification for the job.',
          'An interlocked socket-outlet prevents the socket contacts being live when accessible, so the plug cannot be withdrawn on load and nothing is live to touch once it is out.',
          'BS EN IEC 60309-2 covers the construction and performance of industrial plugs and socket-outlets for connection to fixed wiring; BS EN IEC 60309-1 carries the general requirements.',
          'Selection is a conditions question: Regulation 512.2.1 requires equipment appropriate to the situation and an installation that takes account of the conditions likely to be encountered.',
          'A coupler joins two flexible cables, and an accumulation of leads and couplers is itself a hazard — the answer is better distribution, not another joint.',
          'Damaged connectors are a frequent finding: cracked bodies, bent or burnt pins, missing lids and failed glands. Withdraw them, replace like for like, and record what you found.',
        ]}
      />

      <SectionRule />

      <ContentEyebrow>Check yourself</ContentEyebrow>

      <Quiz questions={quizQuestions} title="Industrial plugs, socket-outlets and couplers" />
    </div>
  );
}
