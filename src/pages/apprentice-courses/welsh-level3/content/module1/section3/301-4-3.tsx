/**
 * Unit 301 — Understanding Building Services Engineering Practice in Wales
 * Learning Outcome 4 — Understand developments in building services engineering
 * Criterion 4.3 — The new and emerging technologies in the building services engineering trade and
 *                 the impact they are having, or may have, on existing practice
 *
 * Approach: every technology is taught as an electrical consequence — what it does to load, to
 * earthing, to the board, to commissioning and to the paperwork the next person inherits.
 * No futurology and no predictions: if it changes your working day, it is in; if it is a headline,
 * it is not. The closing section states plainly what does not change.
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
    question: 'A heat pump is being fitted to a stone cottage that currently has an oil boiler. What is the first electrical question to ask?',
    options: [
      'Whether the existing supply and board can carry the new load once diversity is applied',
      'Which room the controls should be mounted in',
      'Whether the cylinder needs replacing',
      'What colour the outdoor unit is',
    ],
    correctAnswer: 0,
    explanation: 'Electrifying heat adds a continuous load that the original installation was never sized for. Supply capacity and board capacity come before everything else.',
  },
  {
    id: 2,
    question: 'Why does adding a heat pump change how you apply diversity compared with a traditional heating system?',
    options: [
      'Because the heat pump runs for long periods rather than in short bursts, so it is treated as a sustained load',
      'Because heat pumps are always on a separate supply',
      'Because diversity no longer applies to domestic installations',
      'Because the load is entirely intermittent and can be ignored',
    ],
    correctAnswer: 0,
    explanation: 'Sustained running load behaves very differently from a short-duty appliance. That affects cable sizing, protective device selection and how much headroom is genuinely left.',
  },
  {
    id: 3,
    question: 'What is the significance of the earthing arrangement when installing an electric vehicle charge point?',
    options: [
      'The arrangement determines what additional protective measures the installation needs',
      'Earthing arrangements have no bearing on charge point installation',
      'Only the cable size is affected by the earthing arrangement',
      'The charge point manufacturer decides the earthing arrangement of the premises',
    ],
    correctAnswer: 0,
    explanation: 'The supply earthing arrangement at the premises drives the protective measures required, and it must be established on site rather than assumed.',
  },
  {
    id: 4,
    question: 'An installation with customer-side generation and storage differs from a conventional one mainly because:',
    options: [
      'It can both consume and export, so it may be live from more than one direction',
      'It uses a different type of cable throughout',
      'It does not require testing before energisation',
      'It only needs a single point of isolation',
    ],
    correctAnswer: 0,
    explanation: 'Energy can flow both ways. Isolation, labelling and the information handed to the next person all have to reflect that there is more than one source.',
  },
  {
    id: 5,
    question: 'A connected lighting control system is installed and commissioned. A luminaire does not respond to its switch. What kind of fault might this be that older installations never produced?',
    options: [
      'A configuration fault — the wiring and the equipment are both sound but the addressing is wrong',
      'A short circuit on the switch drop',
      'A failed lamp',
      'An open-circuit protective conductor',
    ],
    correctAnswer: 0,
    explanation: 'Connected systems introduce a third category of fault that is neither wiring nor equipment. It lives in the configuration, and it is found with commissioning records, not a continuity test.',
  },
  {
    id: 6,
    question: 'How has efficient lighting changed the maintenance work an electrician is called to do?',
    options: [
      'From replacing lamps to replacing or reconfiguring whole luminaires and drivers',
      'From replacing luminaires to replacing lamps',
      'Maintenance is no longer required on lighting installations',
      'Only the switch plates now need replacing',
    ],
    correctAnswer: 0,
    explanation: 'Where the light source is integral, there is no lamp to change. The job becomes a luminaire or driver replacement, and a compatibility question.',
  },
  {
    id: 7,
    question: 'Prefabricated and modular construction changes site electrical work mainly by:',
    options: [
      'Moving work off site into a factory, so tolerances are tighter and there is less room to improvise on site',
      'Removing the need for testing and certification',
      'Making all on-site connections optional',
      'Eliminating the need for coordination with other trades',
    ],
    correctAnswer: 0,
    explanation: 'Modules arrive complete. What is left on site is interface work, and an interface that does not line up cannot be adjusted the way a site-built one could.',
  },
  {
    id: 8,
    question: 'Which of the following does new technology NOT change?',
    options: [
      'The need for safe isolation, good workmanship, testing and certification',
      'The load calculations for a dwelling',
      'The amount of commissioning and configuration required',
      'The amount of explaining the client needs',
    ],
    correctAnswer: 0,
    explanation: 'New technology sits on top of the fundamentals. Safe isolation, workmanship, testing and certification are the foundation and they do not move.',
  },
];

export default function Lesson301_4_3() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'Heat and transport are moving onto the electrical installation, which turns load assessment and supply capacity into the first question on many jobs, not the last.',
          'Generation and storage make an installation something that both consumes and exports, so isolation and labelling have to account for more than one source.',
          'Controls, monitoring and connected lighting add commissioning and configuration work, and a fault type that is neither wiring nor equipment.',
          'Prefabrication moves work into a factory, tightens tolerances and leaves far less room to improvise on site.',
          'Safe isolation, workmanship, testing and certification do not change. Everything new sits on top of them.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Describe how the electrification of heat changes load assessment, diversity, cable sizing and controls, and when it raises a supply or board question.',
          'Explain what an electric vehicle charge point demands of an installation in terms of dedicated circuits, earthing arrangements and load management.',
          'Explain how customer-side generation and storage change isolation, labelling and the information handed on to the next person working on the installation.',
          'Describe the commissioning and configuration work introduced by connected controls, monitoring systems and efficient lighting, including the new category of fault they produce.',
          'Explain what these developments mean for the trade — more design thinking, more coordination and more explaining — and identify the practices that do not change.',
        ]}
        initialVisibleCount={3}
      />

      <SectionRule />

      <ContentEyebrow>Heat and transport go electric</ContentEyebrow>

      <ConceptBlock
        title="Electrification of heat"
        onSite="A heat pump on a stone cottage is a load problem before it is a heating problem."
      >
        <p>
          When heating moves from a fuel to electricity, a house that drew a few hundred watts for its
          boiler controls starts drawing kilowatts for hours at a time. That is not the same shape of
          load as a shower or a kettle. It is sustained, it runs in cold weather when everything else
          is also running, and it does not obligingly stop while somebody cooks dinner.
        </p>
        <p>
          The practical consequences land in a predictable order. You assess the existing load, apply
          diversity honestly to a sustained load rather than a burst one, check what the supply and
          the main protective device will actually carry, and only then look at circuit design. On an
          older property the answer is often that the board has no spare capacity and the supply
          question has to be asked before anybody orders a unit.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Load assessment.</strong> Sustained running load changes the maximum demand figure materially.</li>
          <li><strong>Diversity.</strong> Assumptions built for intermittent appliances do not transfer to something running for hours.</li>
          <li><strong>Cable sizing.</strong> Continuous operation, external routes and grouping all bite harder on a sustained load.</li>
          <li><strong>Controls.</strong> Weather compensation, cylinder control and external sensors mean far more low-voltage control wiring than a boiler ever needed.</li>
          <li><strong>The supply question.</strong> Board capacity, main fuse rating and existing earthing arrangement have to be established early, in writing.</li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Electric vehicle charging"
        plainEnglish="The same problem appears twice: once on a terrace, once on a car park."
      >
        <p>
          A charge point is a dedicated circuit with a long duty cycle, an earthing question and a
          load-management question. The domestic version and the commercial version are the same
          three problems at different scales.
        </p>
        <p>
          On a terrace in a town centre you are dealing with one point, a limited supply, an awkward
          cable route and an earthing arrangement you have to establish rather than assume. On a
          commercial car park you are dealing with many points that cannot all draw full current at
          once, which makes load management part of the design rather than an optional extra.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Dedicated circuit.</strong> Its own way, its own protection, sized for continuous operation.</li>
          <li><strong>Earthing arrangement.</strong> Established on site; it drives what additional protective measures are required.</li>
          <li><strong>Load management.</strong> Either the supply can carry everything at once or the installation must limit it.</li>
          <li><strong>Position and route.</strong> Parking bays, pavement edges, shared access and future additions all shape the route.</li>
          <li><strong>The next installation.</strong> A second point later is far cheaper if the first one was designed expecting it.</li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="301-4-3-check-1"
        question="You are quoting a charge point for a mid-terrace house with an existing board that is already close to full. What has to be settled before you can price the job properly?"
        options={[
          'The supply capacity, the earthing arrangement and whether the board can take another way',
          'The colour and mounting height of the charge point',
          'Whether the client parks on the left or the right',
          'Which day of the week the work will be carried out',
        ]}
        correctIndex={0}
        explanation="Capacity, earthing and board space decide whether this is a straightforward circuit or a supply and board job. Everything else is detail on top of that answer."
      />

      <SectionRule />

      <ContentEyebrow>Generation and storage behind the meter</ContentEyebrow>

      <ConceptBlock
        title="Customer-side generation and storage"
        onSite="An installation that feeds itself can be live from a direction you did not expect."
      >
        <p>
          Once there is generation or a battery on the customer side, the installation is no longer a
          one-way street. It consumes, it exports, and parts of it can remain live after the incoming
          supply has been isolated. That single fact changes how you approach the whole installation.
        </p>
        <p>
          Isolation stops being one operation and becomes a sequence. Labelling stops being helpful
          and becomes essential, because the next person through the door will not know what is there
          unless the installation tells them. The paperwork you leave behind is the only thing
          standing between an unfamiliar engineer and a nasty surprise.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Two-way flow.</strong> The installation both draws and supplies, so assumptions about direction do not hold.</li>
          <li><strong>Multiple sources.</strong> Isolating the incoming supply may not make everything dead.</li>
          <li><strong>Labelling.</strong> Sources, isolation points and the correct sequence must be identified on the installation itself.</li>
          <li><strong>Handover information.</strong> The next person needs to know what is fitted, where it isolates and in what order.</li>
          <li><strong>Records.</strong> What is installed and how it is arranged has to be documented, not carried in somebody&rsquo;s head.</li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026"
        clause="Regulation 133.1.3 — Selection of equipment"
        meaning="Modified by A4:2026, this now requires certain usages of equipment to be recorded on the appropriate electrical certification specified in Part 6. As installations pick up generation, storage, charging equipment and connected controls, what you write on the certification is part of the installation, not an afterthought — it is how the next person finds out what is actually there."
        cite="BS 7671 Part 5 — Selection and Erection of Equipment"
      />

      <SectionRule />

      <ContentEyebrow>Controls and connected systems</ContentEyebrow>

      <ConceptBlock
        title="Controls, monitoring and connected systems"
        plainEnglish="More of the job is now setting things up rather than wiring things in."
      >
        <p>
          Heating controls, lighting controls, metering, monitoring and building systems have all
          moved from a switch and a contactor to addressable devices that have to be configured. The
          cable pulling is the small part. The commissioning is the long part.
        </p>
        <p>
          That produces a fault type the trade did not used to see. The wiring is sound. The equipment
          is sound. The system still does not do what the client expects, because something is
          addressed wrongly, a schedule is set incorrectly, or two devices have been given the same
          identity. You cannot find it with a continuity test. You find it with the commissioning
          record and a methodical walk through the configuration.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Wiring fault.</strong> Found with test instruments. Behaves consistently.</li>
          <li><strong>Equipment fault.</strong> Found by substitution. The device itself is at fault.</li>
          <li><strong>Configuration fault.</strong> Found in the commissioning data. Everything measures correctly and still behaves wrongly.</li>
        </ul>
        <p>
          Keep the commissioning record. On a connected system it is the wiring diagram for the part
          of the installation you cannot see.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="301-4-3-check-2"
        question="On a commissioned lighting control system, two luminaires in different rooms switch together and neither responds to its own local control. Insulation resistance and continuity results are all in order. What is the most likely cause?"
        options={[
          'A short circuit between two switch drops',
          'A configuration fault — the two devices share an address or a group assignment',
          'Both drivers have failed in the same way',
          'An open-circuit protective conductor on the lighting circuit',
        ]}
        correctIndex={1}
        explanation="The electrical tests are sound, so the wiring and equipment are not the problem. Two devices behaving as one points at the addressing or grouping set during commissioning."
      />

      <SectionRule />

      <ContentEyebrow>Lighting and offsite build</ContentEyebrow>

      <ConceptBlock
        title="Efficient lighting and its controls"
        onSite="There is often no lamp to change any more."
      >
        <p>
          Where the light source is integral to the luminaire, the old maintenance visit — a box of
          lamps and a set of steps — does not exist. A failure means replacing the luminaire or the
          driver, which immediately becomes a compatibility question: does the replacement match the
          output, the appearance, the control method and the dimming behaviour of everything around
          it?
        </p>
        <p>
          The controls side has grown as fast. Presence detection, daylight linking, scene setting and
          timed profiles all have to be set up, demonstrated and recorded. A perfectly wired
          installation that has never been commissioned will be reported as faulty, and the call-out
          will come to you.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Replacement, not relamping.</strong> Whole luminaires or drivers, with a compatibility check each time.</li>
          <li><strong>Matching.</strong> Output, appearance and dimming behaviour have to sit alongside the existing installation.</li>
          <li><strong>Control method.</strong> The replacement must work with the control system already in place.</li>
          <li><strong>Commissioning.</strong> Detection, daylight linking and scenes must be set, demonstrated and recorded.</li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Prefabrication and modular construction"
        plainEnglish="More of the work happens in a factory, so the site has less room to improvise."
      >
        <p>
          Bathroom pods, plant skids, pre-wired risers and modular units arrive on site complete and
          tested. What is left for the site gang is the interface: bring the supply to the right
          point, at the right height, in the right form, and connect it.
        </p>
        <p>
          That sounds easier. It is, right up until something does not line up. A site-built
          installation tolerates being 50&nbsp;mm out. A module does not — the connection point is
          where the factory put it, and the module cannot be adjusted on site. Setting out becomes
          unforgiving, and the information you work from has to be right first time.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Interface work.</strong> Your job narrows to getting the supply to a defined point in a defined form.</li>
          <li><strong>Tolerances.</strong> Positions that used to be approximate are now fixed.</li>
          <li><strong>Information up front.</strong> Setting-out dimensions have to be confirmed before the module arrives, not after.</li>
          <li><strong>Testing across the boundary.</strong> Agree what the factory tested, what you test, and what the certification covers.</li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="301-4-3-check-3"
        question="Pre-wired bathroom pods are arriving next week and your first fix supplies must land at fixed connection points. What is the single most important thing to secure before the delivery?"
        options={[
          'An extra operative for the delivery day',
          'A larger cable drum than usual',
          'Confirmed setting-out dimensions for every connection point',
          'A decision on the accessory finish inside the pods',
        ]}
        correctIndex={2}
        explanation="A module cannot be adjusted to meet your cable. Confirmed dimensions before the pods arrive are the difference between a connection and a week of remedial work."
      />

      <SectionRule />

      <ContentEyebrow>What it means for the trade</ContentEyebrow>

      <ConceptBlock
        title="What all of this does to the trade"
        plainEnglish="The wiring is a smaller share of the job than it used to be."
      >
        <p>
          Put the whole picture together and the shape of the work has shifted. There is more design
          thinking expected at Level 3, because load assessment, diversity and supply capacity now
          come up on ordinary domestic jobs rather than only on projects with a designer attached.
        </p>
        <p>
          There is more coordination, because heat pumps, charge points, storage and controls all sit
          across the boundary between disciplines. There is far more commissioning and configuration,
          which is skilled, slow and easy to underprice. And there is a great deal more explaining,
          because clients did not ask for the complexity and will not accept it unexplained.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>More design thinking.</strong> Load, diversity and capacity decisions on everyday jobs.</li>
          <li><strong>More coordination.</strong> Work that crosses into heating, ventilation and building systems.</li>
          <li><strong>More commissioning.</strong> Configuration, demonstration and records as a priced part of the job.</li>
          <li><strong>More explaining.</strong> Clients need the reason for the supply upgrade, the extra isolator and the labelling.</li>
          <li><strong>More record keeping.</strong> What is installed and how it is set up has to be written down for the next person.</li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="The part that does not change"
        onSite="New technology sits on top of the fundamentals. It does not replace them."
      >
        <p>
          It is easy to read a list like this and conclude that the trade is being reinvented. It is
          not. A heat pump circuit is still designed, installed, inspected, tested and certificated.
          A charge point is still isolated safely before you work on it. A battery installation still
          needs the same standard of termination and the same discipline about routes and support.
        </p>
        <p>
          Safe isolation, good workmanship, inspection, testing and certification are the floor
          everything else stands on. An electrician who is excellent at those and unfamiliar with a
          new product can learn the product. An electrician who is fluent with the product and casual
          about isolation is dangerous, and no amount of new technology changes that.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Treating a heat pump as a like-for-like swap for the old boiler"
        whatHappens={
          <>
            The heating engineer books the changeover, the unit is delivered, and the electrical work
            is assumed to be a spur off the existing board. On the day, the board turns out to be full,
            the maximum demand has been calculated on assumptions that suited a boiler drawing almost
            nothing, and the sustained load of the new unit does not fit under the existing main
            protective device. Now the property has no heating, a heat pump sat in the hall, and a
            supply question that takes weeks to answer rather than hours.
          </>
        }
        doInstead={
          <>
            Treat the electrical assessment as the first task on the job, not the last. Establish the
            existing supply arrangement, the rating of the main protective device, the earthing
            arrangement and the real spare capacity of the board before anybody sets a date. Assess
            maximum demand with the new load treated as sustained, not intermittent. If the answer is
            that the supply or the board has to change, say so in writing while there is still time to
            arrange it, and make clear that the supply side runs on its own timescale.
          </>
        }
      />

      <CommonMistake
        title="Chasing a configuration fault round the wiring"
        whatHappens={
          <>
            <p>
              The client reports that the lighting behaves oddly in two rooms, so the callback starts
              where callbacks always started: continuity, insulation resistance, polarity, then
              pulling accessories off the wall to look at terminations. Everything measures
              correctly, so the testing gets repeated more carefully, and it measures correctly
              again.
            </p>
            <p>
              A day and a half later the wiring is exactly as sound as it was at nine o&rsquo;clock
              on the first morning. Nothing is loose and nothing is broken. The system is doing what
              it was set up to do, and nobody has looked at how it was set up, because nobody wrote
              it down when it was commissioned.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Sort the fault into one of three kinds before you start. A wiring fault is found with
              instruments and behaves consistently. An equipment fault is found by substitution. A
              configuration fault measures perfectly and still behaves wrongly &mdash; and that one
              is found in the commissioning data, not with a test lead.
            </p>
            <p>
              Prove the electrical installation first, because it narrows the problem quickly, then
              go to the commissioning record and walk the configuration methodically. Where no
              record exists, say so and price reconstructing it as real work, and keep the record on
              anything you commission yourself &mdash; on a connected system it is the wiring
              diagram for the part you cannot see.
            </p>
          </>
        }
      />

      <SectionRule />

      <Scenario
        title="Carmarthen — the farmhouse that grew a second supply problem"
        situation={
          <>
            A renovated farmhouse outside Carmarthen. The owners have had a heat pump fitted last
            winter, and they have now asked you for a charge point on the outbuilding and a battery in
            the utility room. The board is a ten-way unit that was full before the heat pump and has
            been extended once already with a small sub-board. The heat pump circuit was added by
            somebody else and there is no certification for it in the folder the owner hands you. The
            owner&rsquo;s expectation is a day&rsquo;s work: &ldquo;it&rsquo;s just two more circuits.&rdquo;
          </>
        }
        whatToDo={
          <>
            Do not quote two circuits. Start with what is actually there. Establish the supply
            arrangement, the rating of the main protective device and the earthing arrangement at the
            origin, because the charge point decision depends on it and it cannot be assumed from the
            age of the property. Assess maximum demand with the heat pump treated as a sustained load
            and both new loads added, then establish whether load management is needed rather than a
            supply increase. Inspect and record the condition of the existing installation, including
            the uncertificated heat pump circuit, and make clear in writing that you can take no
            responsibility for work you did not carry out and cannot evidence. Set out the isolation
            arrangement for the battery before you design anything else, because part of the
            installation will remain live after the incoming supply is opened, and the labelling and
            handover information have to reflect that. Then price it honestly as three pieces of work:
            an assessment, a board and supply resolution, and the two new circuits with their
            commissioning.
          </>
        }
        whyItMatters={
          <>
            The owner is not being unreasonable — they have been told repeatedly that these are simple
            additions. What has actually happened is that a modest rural installation has quietly
            become one that consumes heavily, charges a vehicle and stores energy, on an origin that
            was never assessed for any of it. The cost of getting this wrong is not an inconvenience.
            It is an installation where isolating the main switch does not make everything dead and
            nobody has written that down anywhere. The assessment and the records are the job. The
            two circuits are the easy part.
          </>
        }
      />

      <SectionRule />

      <FAQ
        items={[
          {
            question: 'Do I need to be a designer to handle these jobs at Level 3?',
            answer: 'You need to think like one earlier than previous generations did. Load assessment, diversity and supply capacity used to belong to a project with a designer attached. On a domestic job with a heat pump and a charge point, those questions arrive with the enquiry, and the person who takes the enquiry has to be able to recognise them even if somebody else finalises the design.',
          },
          {
            question: 'How do I approach a fault on a connected system I did not commission?',
            answer: 'Prove the electrical installation first with the tests you already know, because that narrows the problem quickly. If the wiring and the equipment are sound, the fault is in the configuration, and you need the commissioning record to go any further. If no record exists, say so and price the reconstruction of it rather than working blind — that is a real piece of work, not an inconvenience.',
          },
          {
            question: 'Why does an installation with storage need so much more labelling than a conventional one?',
            answer: 'Because opening the main switch may not make everything dead. The next person through the door will not know what is fitted or in what order it isolates unless the installation and the documentation tell them. Labelling on a two-way installation is a safety measure, not tidiness.',
          },
          {
            question: 'Does any of this reduce the importance of testing and certification?',
            answer: 'The opposite. The more that is installed, and the more of it that is configured rather than simply wired, the more the certification and the handover information matter, because they are the only reliable account of what is actually there. New technology adds to the record. It never replaces it.',
          },
        ]}
      />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Electrifying heat adds a sustained load, which changes maximum demand, diversity, cable sizing and very often forces a supply or board question.',
          'A charge point is a dedicated circuit with an earthing question and a load-management question, and the same three problems appear on a terrace and on a car park.',
          'Generation and storage make an installation two-way, so isolation becomes a sequence and labelling becomes essential rather than helpful.',
          'Connected controls introduce a fault type that is neither wiring nor equipment, and it is found in the commissioning record rather than with a test instrument.',
          'Efficient lighting has replaced relamping with luminaire and driver replacement, which is a compatibility decision every time.',
          'Prefabrication moves work off site, tightens tolerances and removes the room to improvise, so setting-out information must be confirmed before delivery.',
          'The trade now carries more design thinking, more coordination, more commissioning and far more explaining to clients who did not ask for the complexity.',
          'Safe isolation, good workmanship, inspection, testing and certification do not change — every new technology sits on top of them.',
        ]}
      />

      <SectionRule />

      <ContentEyebrow>Check yourself</ContentEyebrow>

      <Quiz questions={quizQuestions} title="New and emerging technologies in building services" />
    </div>
  );
}
