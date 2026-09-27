/**
 * Unit 302 — Working in The Building Services Engineering Sector in Wales (40 GLH)
 * Learning outcome 1 — Understand the built environment in Wales
 * Criterion 1.2 — Factors influencing change in the built environment in Wales
 *
 * Approach: this page teaches change the way an electrician meets it — as load arriving
 * at a board, as complexity arriving in the controls, and as information the client now
 * needs and did not need before. Heat, transport and generation are treated as electrical
 * events on a real installation, not as topics.
 * This page contains no statistics and no named policies, strategies, Acts, funding
 * schemes or target years, because no verified source was available for them.
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
      'A heat pump replaces an oil boiler in a cottage. What is the first electrical thing that changes?',
    options: [
      'The maximum demand on the installation rises, so the supply, the board and the submain have to be reassessed',
      'Nothing changes electrically, because the heat pump replaces an existing appliance',
      'Only the lighting circuits are affected, because the plant room lighting is reused',
      'The earthing arrangement automatically becomes TT once a heat pump is fitted',
    ],
    correctAnswer: 0,
    explanation:
      'A fossil-fuel boiler drew almost nothing electrically — a pump and a controller. A heat pump is a continuous electrical load running through the coldest part of the year. Maximum demand, the main switch rating, the cable to the board and the cut-out fuse all have to be looked at before anything is ordered.',
  },
  {
    id: 2,
    question:
      'Why does a heat pump load behave differently from a shower load when you assess diversity?',
    options: [
      'The heat pump runs for long periods at the same time as the rest of the house is loaded, so you cannot assume it will coincide with nothing else',
      'A heat pump only ever runs at night, so it never coincides with other loads',
      'A heat pump draws no current once the compressor has started',
      'Diversity does not apply to any fixed appliance',
    ],
    correctAnswer: 0,
    explanation:
      'A shower is a large load for a few minutes. A heat pump is a moderate load for hours, on the coldest evenings, exactly when cooking, lighting and the car charger may also be running. That coincidence is the point — you assess the combination, not each item alone.',
  },
  {
    id: 3,
    question: 'A charge point is wanted at a mid-terrace house. What limits the job most often?',
    options: [
      'What the existing supply and earthing arrangement will carry, and whether the cable route can reach parking that the customer actually controls',
      'The colour of the charge point enclosure',
      'Whether the customer already owns an electric vehicle',
      'The distance from the charge point to the nearest lighting point',
    ],
    correctAnswer: 0,
    explanation:
      'On a terrace the two real constraints are the supply and the parking. A cable across a public footway is not a solution you can install, and a supply already close to its limit will not take a continuous charging load without work upstream.',
  },
  {
    id: 4,
    question: 'What changes about an installation once solar PV and a battery are added?',
    options: [
      'It is no longer only a consumer of energy — it can generate, store and export, so isolation, labelling and handover information all have to change',
      'Nothing changes, because the generation is behind the same main switch',
      'The installation can no longer be tested',
      'The consumer unit becomes unnecessary',
    ],
    correctAnswer: 0,
    explanation:
      'Opening the main switch no longer guarantees the installation is dead. Someone arriving later needs to know there are other sources, where they isolate and in what order. That is why labelling and the handover pack stop being a formality.',
  },
  {
    id: 5,
    question: 'Why does insulating and sealing a building affect the electrical work?',
    options: [
      'Cables buried in or covered by insulation lose heat less easily, so current-carrying capacity has to be derated, and every penetration through the sealed fabric has to be made good',
      'Insulation increases the voltage at the socket outlets',
      'Insulation has no effect on cables, only on pipework',
      'Sealed buildings mean circuits can be loaded above their rating',
    ],
    correctAnswer: 0,
    explanation:
      'A cable in a draughty loft sheds heat. The same cable under insulation does not. The correction factor is the obvious part; the less obvious part is that every hole you make through a sealed, insulated, fire-rated element is now your responsibility to close properly.',
  },
  {
    id: 6,
    question:
      'A customer has energy monitoring fitted and asks why one circuit shows a standing load overnight. What is the electrician’s honest first move?',
    options: [
      'Treat the reading as information to be checked, and investigate what is actually connected to that circuit',
      'Tell the customer monitoring readings are always wrong',
      'Disconnect the circuit until the customer stops asking',
      'Assume the monitoring clamp is faulty and replace it',
    ],
    correctAnswer: 0,
    explanation:
      'Monitoring puts the installation in front of the customer in a way it never was before. Some readings are artefacts; some are a real standing load nobody knew about. Either way the answer is to look, not to dismiss.',
  },
  {
    id: 7,
    question:
      'An older installation is asked to take heat, a charge point and generation at once. What is the professional response?',
    options: [
      'Assess the existing installation and supply, then design for the combination, and say plainly if it will not carry it',
      'Fit everything and rely on the main fuse to sort out any overload',
      'Assume that because each item works alone, all three will work together',
      'Refuse all work on installations more than twenty years old',
    ],
    correctAnswer: 0,
    explanation:
      'Each addition looks reasonable on its own. Together they are a different installation. Assessing first and saying no clearly when the supply will not take it is part of the job, not a failure to do the job.',
  },
  {
    id: 8,
    question:
      'What is the common thread running through heat, transport, generation and retrofit for the electrician?',
    options: [
      'Each arrives as more load, more complexity in the controls, and more information the client now needs at handover',
      'Each reduces the amount of design work needed on site',
      'Each removes the need to coordinate with other trades',
      'Each applies only to new build and never to existing buildings',
    ],
    correctAnswer: 0,
    explanation:
      'Load, complexity, information. If you can name what a change adds under each of those three headings, you can explain it to a customer and design for it properly.',
  },
];

export default function Lesson302_1_2() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'Change reaches you as three things: more load, more complexity, more information the client needs.',
          'Heat pumps and charge points turn small electrical loads into long, heavy, coinciding ones.',
          'Solar and batteries turn a consumer into something that also generates and stores — isolation and labelling change.',
          'Insulating and sealing the fabric changes cable ratings and makes every penetration your problem.',
          'The recurring job is an old installation being asked to do new work. Assess it. Never assume it.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Describe the main changes arriving in Welsh buildings that an electrician meets directly on site.',
          'Explain how electrified heating and vehicle charging change load, diversity and the assessment of an existing supply.',
          'Explain how customer-side generation and storage change isolation, labelling and handover information.',
          'Describe how retrofit of the building fabric affects cable derating, penetrations and fire-stopping.',
          'Explain why change means more design thinking, more coordination and more explaining at Level 3.',
        ]}
        initialVisibleCount={3}
      />

      <SectionRule />

      <ContentEyebrow>Where the new load comes from</ContentEyebrow>

      <ConceptBlock
        title="Change arrives as load"
        plainEnglish="Most of what is changing in buildings ends up as current through a cable you have to size."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>The pattern.</strong> Heating, transport and hot water used to burn something.
            Increasingly they draw current instead. That moves demand out of an oil tank or a gas
            meter and into your consumer unit.
          </li>
          <li>
            <strong>Why it matters to you.</strong> The installation in front of you was designed
            around the demand of its own time. Nothing about it was wrong. It simply was not
            designed for the loads now being added.
          </li>
          <li>
            <strong>The three questions.</strong> What is the new maximum demand? Will the supply
            carry it? Will the existing distribution — main switch, tails, board, submains — carry
            it?
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Electrified heat: the heat pump on a stone cottage"
        onSite="Replacing a boiler with a heat pump is not swapping like for like. It is adding a continuous load in the coldest weather."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Load profile.</strong> A boiler drew a pump and a controller. A heat pump draws
            a compressor, often for hours, on the days everything else in the house is also running.
            That is a different load, not a bigger version of the old one.
          </li>
          <li>
            <strong>Diversity.</strong> You cannot treat it like a shower. A shower is minutes; a
            heat pump coincides with cooking, lighting and, increasingly, a car on charge. Assess
            the combination.
          </li>
          <li>
            <strong>Cable sizing.</strong> Long runs to an outdoor unit, often across a yard or
            through a thick wall. Volt drop and the installation method both bite before the current
            rating does.
          </li>
          <li>
            <strong>Board and supply.</strong> A dedicated circuit, a properly rated protective
            device, and frequently a board upgrade because there is no spare way and no spare
            capacity.
          </li>
          <li>
            <strong>Controls.</strong> Weather compensation, buffer tanks, immersion backup,
            cylinder sensors, a smart thermostat. More interconnection, more low-voltage control
            wiring, more to commission and record.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="302-1-2-check-1"
        question="Why can a heat pump not simply be treated as another fixed appliance when assessing an existing installation?"
        options={[
          'Because it always requires a three-phase supply',
          'Because it is a long-duration load that coincides with other household loads in the coldest weather, changing maximum demand and diversity',
          'Because it cannot be protected by an RCD',
          'Because the manufacturer sizes the whole installation for you',
        ]}
        correctIndex={1}
        explanation="It is the duration and the coincidence that matter. A short, large load and a long, moderate load affect an installation very differently, and the heat pump runs hardest exactly when the rest of the house is busiest."
      />

      <SectionRule />

      <ContentEyebrow>EVs, generation and storage</ContentEyebrow>

      <ConceptBlock
        title="Electric vehicles: charge points on real buildings"
        onSite="The technical answer is usually easy. The constraint is the supply, the earthing arrangement and where the customer can actually park."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Load.</strong> A charge point is a sustained load, not an occasional one. It
            runs for hours at close to its rating. Load management may be the only way the supply
            copes.
          </li>
          <li>
            <strong>Dedicated circuit.</strong> Its own way in the board, its own protection, its
            own route. Not a spur off something convenient.
          </li>
          <li>
            <strong>Earthing arrangement.</strong> How the installation is earthed governs what you
            can do outdoors and what protective measures the equipment must provide. Establish it
            before you select anything.
          </li>
          <li>
            <strong>Terraces.</strong> A mid-terrace with on-street parking is the hard case. You
            cannot run a cable across a footway you do not own, and the parking space is not the
            customer&rsquo;s to allocate.
          </li>
          <li>
            <strong>Commercial premises.</strong> Several points at once change the picture
            completely: the aggregate load, the distribution design and whether the incoming supply
            is anywhere near sufficient.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Generation and storage on the customer side"
        plainEnglish="Once an installation can generate and store, it is no longer a one-way street, and everything about isolating it changes."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Two-way power.</strong> Solar PV can export. A battery can supply the
            installation when the grid is not there. The installation is now a source as well as a
            load.
          </li>
          <li>
            <strong>Isolation.</strong> Opening the main switch no longer proves the installation is
            dead. There are d.c. sources, battery sources and inverter sources, each with their own
            isolator and their own sequence.
          </li>
          <li>
            <strong>Labelling.</strong> Warning and identification labelling stops being paperwork
            and becomes the only thing telling the next person what is on the other side of that
            cupboard door.
          </li>
          <li>
            <strong>Information.</strong> Schematics, isolation sequence, equipment details and
            settings belong in the handover pack. The next electrician may be a stranger arriving at
            night.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026"

        clause="Regulation 512.2.1"

        meaning="Regulation 512.2.1 requires that &ldquo;Equipment shall be of a design appropriate to the situation in which it is to be used&rdquo;, and that installation &ldquo;shall take account of the conditions likely to be encountered&rdquo;. That is the whole argument for assessing before you add. An outdoor unit on an exposed hillside, a charge point on a coastal terrace and an inverter in an unventilated cupboard are all different situations, and the selection has to answer the situation rather than the catalogue. Note also that Regulation 133.1.3 (Selection of equipment) was modified by A4:2026 and now requires that certain usages of equipment shall be recorded on the appropriate electrical certification specified in Part 6. Recording is part of the work, not an afterthought."

        cite="Regulation 512.2.1"
      />

      <InlineCheck
        id="302-1-2-check-2"
        question="Why does adding solar PV and a battery change what the next electrician on site needs to know?"
        options={[
          'Because the installation no longer needs periodic inspection',
          'Because the installation now has more than one source of energy, so isolation is a sequence and the labelling and handover information have to explain it',
          'Because the consumer unit is replaced by the inverter',
          'Because all testing is done remotely once monitoring is fitted',
        ]}
        correctIndex={1}
        explanation="One main switch no longer makes the installation safe to work on. Whoever arrives next has to be told, in writing and on labels, what the other sources are and in what order they are isolated."
      />

      <SectionRule />

      <ContentEyebrow>Retrofit and sealed buildings</ContentEyebrow>

      <ConceptBlock
        title="Retrofit of the fabric: working in a sealed building"
        onSite="Insulation and airtightness change the physics around your cables and make every hole you cut someone&rsquo;s liability."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Derating.</strong> A cable that shed heat happily in a draughty loft cannot shed
            it under a thick layer of insulation. The installation method has changed, so the
            current-carrying capacity has changed, so the calculation has to be redone.
          </li>
          <li>
            <strong>Existing circuits.</strong> Insulation is often laid over cables that were
            installed years earlier. The circuits were fine before and may not be fine now. Nobody
            tells you; you have to look.
          </li>
          <li>
            <strong>Penetrations.</strong> Every cable through a sealed layer is a hole in the
            airtightness line. Poorly made penetrations undo other people&rsquo;s work and cause
            condensation problems that get blamed on the last trade in.
          </li>
          <li>
            <strong>Fire-stopping.</strong> Where you pass through a fire-rated element, the element
            has to be restored to its rating. That is your work, and it needs to be recorded and
            visible.
          </li>
          <li>
            <strong>Internal wall insulation.</strong> On a solid-walled building it swallows the
            depth you used to have. Accessories, back boxes and routes all have to be planned with
            the insulation contractor, not around them.
          </li>
        </ul>
      </ConceptBlock>

      <ContentEyebrow>Metering and older infrastructure</ContentEyebrow>

      <ConceptBlock
        title="Metering and monitoring in ordinary installations"
        plainEnglish="The installation is now visible to the customer, hour by hour, and they will ask you about what they see."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>What arrives.</strong> Smart metering, in-home displays, current transformer
            clamps on tails, circuit-level monitoring in the board, and apps tied to the heat pump,
            the inverter and the charge point.
          </li>
          <li>
            <strong>Physical consequences.</strong> Clamps need space around the tails. Monitoring
            modules need a way, a supply and often a data connection. A cramped meter cupboard
            becomes the limiting factor.
          </li>
          <li>
            <strong>Data is not measurement.</strong> An app reading is not a test result. It is a
            clue. It never replaces instrument readings and it never appears on certification.
          </li>
          <li>
            <strong>Useful to you.</strong> Monitoring shows standing loads, a heat pump
            short-cycling, or a circuit working harder than it should. Read it as a symptom and then
            go and prove it properly.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Growing load on older infrastructure"
        onSite="The recurring job in Wales is an installation designed for a different era being asked to carry heat, transport and generation at once."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>How it creeps.</strong> The heat pump goes in one year. The charge point the
            next. The battery the year after. Each addition is assessed against what was there at
            the time, and nobody ever assesses the total.
          </li>
          <li>
            <strong>Assess, do not assume.</strong> Establish the earthing arrangement, the supply
            characteristics, the existing maximum demand and the condition of what is already
            installed before you design anything new.
          </li>
          <li>
            <strong>Say it plainly.</strong> If the supply will not carry the combination, tell the
            customer early, in writing, with what it would take to change it. That is the
            professional answer, not a lost job.
          </li>
          <li>
            <strong>Load management.</strong> Sometimes the answer is not a bigger supply but a
            design that prevents the loads coinciding. Know that this is an option and know what it
            does and does not solve.
          </li>
        </ul>
      </ConceptBlock>

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Sizing the new load and ignoring everything already there"

        whatHappens={
          <>
            The mistake: an electrician sizes the heat pump circuit correctly, selects the right
            device, runs the right cable — and never touches the rest of the installation. The
            circuit is right. The installation is now overloaded, because nobody added the new
            demand to the old demand and checked the main switch, the tails and the cut-out.
          </>
        }

        doInstead={
          <>
            The fix: treat every addition as a change to the whole installation. Work out the new
            maximum demand for the building, not just the load of the thing you are fitting. Check
            what the supply and the existing distribution will carry. If it will not carry it, that
            finding goes to the customer before the order, not after the first cold snap.
          </>
        }
      />

      <CommonMistake
        title="Treating a monitoring app reading as a test result"
        whatHappens={
          <>
            <p>
              The customer rings because the app says one circuit is drawing far more than it used
              to. You look at the graph on his phone, agree that it looks wrong, and change the
              appliance he suspects. The graph does not change. Between you, nobody has measured
              anything.
            </p>
            <p>
              It goes the other way too. A healthy-looking figure on a screen gets offered as
              evidence that a circuit is fine, and a number that came out of an app ends up
              standing in for a reading that should have come out of an instrument.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Treat monitoring as a symptom and nothing more. It is genuinely useful at that: a
              standing load nobody knew about, a heat pump short-cycling, a circuit working harder
              than it should. What it gives you is somewhere to point the instruments.
            </p>
            <p>
              Then go and prove it properly. Data is not measurement. An app reading never replaces
              an instrument reading and it never appears on certification.
            </p>
          </>
        }
      />

      <InlineCheck
        id="302-1-2-check-3"
        question="Insulation is laid over existing loft cables during a retrofit. What should concern the electrician most?"
        options={[
          'The insulation will increase the earth fault loop impedance of the circuits',
          'The cables will become mechanically stronger and need no attention',
          'Those cables can no longer shed heat as they were designed to, so their current-carrying capacity is reduced and the circuits need reassessing',
          'Nothing, because the cables were compliant when they were installed',
        ]}
        correctIndex={2}
        explanation="Compliance was assessed for the installation method at the time. Burying the cables in insulation changes that method, so the derating changes. Circuits that were comfortably within their rating may no longer be."
      />

      <SectionRule />

      <Scenario
        title="Llandeilo: a farmhouse that wants everything at once"

        situation={
          <>
            You are called to a stone farmhouse outside Llandeilo. The oil boiler is on its last
            winter. The owner wants an air source heat pump, a charge point at the yard end for a
            van, and he already has solar PV on the barn roof with a battery in the old dairy fitted
            by someone else two years ago. He wants it all done before Christmas and he has been
            told by a neighbour that it is &ldquo;a day&rsquo;s work once the pump arrives&rdquo;.
          </>
        }

        whatToDo={
          <>
            What you find: a single-phase supply on a long overhead service, a split-load board with
            no spare ways, tails that were adequate for the house as it stood, and a battery in the
            dairy with one faded label and no schematic. The heat pump sits on the north gable, a
            long buried run from the board; the charge point is further out again to the yard. The
            dilemma: the heat pump alone probably fits. The heat pump plus a charge point running on
            a January evening, with the battery discharging and the house loaded, does not — not
            through that board and not on the existing tails. You can either fit the heat pump now,
            take the money, and leave the next person to discover the problem when the charge point
            goes in; or you tell him today that the board and tails need replacing and that the
            supply itself needs checking before the charge point is even quoted. The cost: a new
            board, new tails and the supply work is a material sum on top of the heat pump — enough
            that he may delay the charge point to next year. That is his decision, not yours to make
            silently by leaving it out of the quote. You also add the missing schematic and
            isolation labelling for the battery, because nobody arriving at that dairy in the dark
            knows what is live in there.
          </>
        }

        whyItMatters={
          <>
            What good looks like: assess the supply and existing installation first; calculate the
            combined maximum demand; price the enabling work openly as a separate line; record the
            equipment, its usages and the isolation sequence on the certification and in the
            handover pack.
          </>
        }
      />

      <SectionRule />

      <ContentEyebrow>What it means for the trade</ContentEyebrow>

      <ConceptBlock
        title="What this means for the trade at Level 3"
        onSite="More design thinking, more coordination with other trades, and a lot more explaining to people who did not ask for any of this."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Design moves onto site.</strong> Assessing maximum demand, selecting for the
            conditions, checking volt drop on long runs — these are no longer someone else&rsquo;s
            job in an office.
          </li>
          <li>
            <strong>Coordination.</strong> Cylinder sensors and immersion backups are specified by
            the heating engineer and wired by you. Routes, box depths and penetrations have to be
            agreed with the insulation trades before the fabric is closed. Array cabling needs a
            slot in the roofer&rsquo;s programme. Heat, generation, storage and charging then have
            to be commissioned together and made to behave as one system, and that usually falls to
            you.
          </li>
          <li>
            <strong>Recording becomes load-bearing.</strong> Certification, schematics and labelling
            are what the next person works from. On an installation with several sources, poor
            records are a safety issue.
          </li>
          <li>
            <strong>Explaining is part of the work.</strong> Customers inherit technology they did
            not choose, in a house they already owned. Plain, unhurried explanation is what stops
            the system being run badly or switched off.
          </li>
          <li>
            <strong>Honesty about limits.</strong> &ldquo;Your supply will not take this as it
            stands&rdquo; is a professional answer. It protects the customer and it protects you.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <FAQ
        items={[
          {
            question:
              'Do I really have to reassess the whole installation just to add one heat pump?',
            answer:
              'Yes, in the sense that you have to know the new total demand and whether the supply and existing distribution will carry it. You are not rewiring the house. You are establishing the earthing arrangement and supply characteristics, working out the combined maximum demand, and checking the main switch, tails and board against it. That is a morning, and it is what stops a nasty surprise later.',
          },
          {
            question:
              'What do I do if the customer refuses the supply or board work and just wants the appliance fitted?',
            answer:
              'You do not install something the installation cannot safely carry. Put the finding in writing, explain what it would take, and let them decide whether to proceed with the enabling work. If they decline and the installation will not support the load, you decline the job. A written, calm explanation keeps the relationship intact far more often than people expect.',
          },
          {
            question:
              'Why is labelling suddenly such a big deal on installations with solar and batteries?',
            answer:
              'Because the label is the only thing standing between the next person and an installation that stays live after the main switch is opened. On a single-source installation the labelling is helpful. On a multi-source installation it is the safety information, and the schematic and isolation sequence in the handover pack are part of the same job.',
          },
          {
            question:
              'How much of this is new engineering and how much is just doing the basics properly?',
            answer:
              'Mostly it is the basics applied to harder conditions. Assess the supply. Size for the real load and the real installation method. Select equipment that suits the situation. Record what you did. None of that is new. What is new is that the loads are larger, the sources are multiple and the fabric is sealed, so sloppy basics now produce visible failures.',
          },
        ]}
      />

      <KeyTakeaways
        points={[
          'Change reaches the electrician as three things: more load, more complexity, more information the client needs.',
          'A heat pump is a long-duration load that coincides with everything else in the coldest weather, so maximum demand and diversity both have to be reworked.',
          'Charge points need a dedicated circuit, a known earthing arrangement and a parking space the customer actually controls.',
          'Generation and storage make the installation a source as well as a load, so isolation becomes a sequence and labelling becomes safety-critical.',
          'Insulation and airtightness change cable derating, and every penetration you make through the sealed or fire-rated fabric is yours to close properly.',
          'Monitoring makes the installation visible to the customer; treat readings as clues to investigate, never as test results.',
          'The recurring job is an older installation being asked to carry heat, transport and generation at once — assess it, never assume it.',
          'Equipment must suit the situation it is used in, and A4:2026 requires certain usages to be recorded on the certification in Part 6.',
        ]}
      />

      <SectionRule />

      <ContentEyebrow>Check yourself</ContentEyebrow>

      <Quiz
        questions={quizQuestions}
        title="Factors influencing change in the built environment in Wales"
      />
    </div>
  );
}
