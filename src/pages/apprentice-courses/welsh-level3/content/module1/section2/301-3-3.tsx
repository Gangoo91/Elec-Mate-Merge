/**
 * Unit 301 · Learning outcome 3 · Criterion 3.3 — The factors influencing 21st
 * century construction
 *
 * Written as the forces an electrician can feel on a job today: performance
 * measured rather than assumed, buildings that generate and store as well as
 * consume, more work moved off site, tighter programmes, and information that
 * has to survive handover.
 *
 * No policy, target, target year or statistic is named, because none could be
 * verified. Every duty stated is either a verified regulation or ordinary
 * contract and site practice, and is labelled as such.
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
    question: 'What is the biggest single change in how a modern building is judged?',
    options: [
      'Its performance is measured and tested rather than assumed from the drawing',
      'It is judged only on its appearance',
      'It is judged by the cost per square metre alone',
      'It is judged by how quickly it was built',
    ],
    correctAnswer: 0,
    explanation:
      'Once performance is measured, the gap between what was designed and what was built becomes visible — and somebody has to close it.',
  },
  {
    id: 2,
    question: 'Why does a building that generates its own electricity change the electrician’s work?',
    options: [
      'The installation carries power in two directions, so isolation, labelling and the information left behind all change',
      'It removes the need for a distributor supply',
      'It makes testing unnecessary',
      'It only affects the person who installs the panels',
    ],
    correctAnswer: 0,
    explanation:
      'A one-way installation has one place to isolate. A two-way one has more than one source, and the next person needs to be told where they are.',
  },
  {
    id: 3,
    question: 'The main effect of moving work off site into a factory is that',
    options: [
      'Decisions have to be made earlier and correctly, because the module arrives finished',
      'Less skill is required on site',
      'Testing can be skipped on site',
      'Tolerances become less important',
    ],
    correctAnswer: 0,
    explanation:
      'You cannot adjust a module on the lorry. The design freedom moves forward in the programme and disappears once manufacture starts.',
  },
  {
    id: 4,
    question: 'What kind of fault appears in a modern building that did not exist in an older one?',
    options: [
      'A configuration fault — the wiring is correct and the equipment is healthy, but the system is set up wrongly',
      'A short circuit',
      'An open circuit protective conductor',
      'A high earth fault loop impedance',
    ],
    correctAnswer: 0,
    explanation:
      'Commissioning and configuration are now a real part of the job, and a system that is wired perfectly can still behave wrongly.',
  },
  {
    id: 5,
    question: 'Why has the information left behind at handover become more important?',
    options: [
      'A modern installation cannot be understood by looking at it — settings, configurations and sources are invisible',
      'Because paperwork is checked more often',
      'Because clients prefer thicker files',
      'Because it replaces the need for testing',
    ],
    correctAnswer: 0,
    explanation:
      'You can trace a rewirable installation by eye. You cannot see a load-management setting or a stored configuration, so it has to be written down.',
  },
  {
    id: 6,
    question: 'Electrification of heat and transport affects the existing installation mainly by',
    options: [
      'Adding substantial, sustained load to buildings whose supply and distribution were sized for far less',
      'Reducing the total demand on the installation',
      'Changing the earthing arrangement of the supply',
      'Removing the need for diversity calculations',
    ],
    correctAnswer: 0,
    explanation:
      'These are not small intermittent loads. They change the assessment of maximum demand and frequently expose a board or a supply that has nothing left in it.',
  },
  {
    id: 7,
    question: 'Under BS 7671 as amended, certain usage of equipment must be',
    options: [
      'Recorded on the appropriate electrical certification specified in Part 6',
      'Reported to the supply distributor',
      'Marked physically on the equipment only',
      'Retained by the manufacturer',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 133.1.3 was modified so that where BS 7671 calls for a particular usage to be identified, it is captured on the certificate — the paperwork carries information the installation cannot show.',
  },
  {
    id: 8,
    question: 'What has not changed in twenty-first century construction?',
    options: [
      'Safe isolation, good workmanship, testing and certification',
      'The way loads are calculated',
      'The number of sources in an installation',
      'The amount of commissioning required',
    ],
    correctAnswer: 0,
    explanation:
      'Everything new sits on top of the fundamentals. An electrician who is weak on isolation and testing does not become adequate by learning a control system.',
  },
];

export default function Lesson301_3_3() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'Modern buildings are measured rather than assumed, so the gap between the drawing and the finished job is visible and somebody has to answer for it.',
          'Installations now generate and store as well as consume, which means more than one source and a much greater duty to leave good information.',
          'More work happens in a factory and less on site, which pushes decisions earlier and removes the room to improvise.',
          'Commissioning and configuration have become real work, and they produce faults that are neither wiring nor equipment.',
          'Safe isolation, workmanship, testing and certification have not changed — everything new is built on them.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Describe the main forces shaping how buildings are designed and built today, and how each reaches the electrician.',
          'Explain why measured performance rather than assumed performance changes what is expected of installed work.',
          'Explain how buildings that generate and store electricity alter isolation, labelling and handover information.',
          'Describe how moving work off site into manufacture changes when decisions must be made and who makes them.',
          'Recognise which parts of the trade have changed and which fundamentals have not.',
        ]}
        initialVisibleCount={3}
      />

      <SectionRule />

      <ContentEyebrow>Measured performance and rising load</ContentEyebrow>

      <ConceptBlock
        title="Performance is measured, not assumed"
        plainEnglish="Somebody now tests whether the building does what the drawing said it would."
      >
        <p>
          The biggest shift is not a technology, it is a change in what counts as finished. A building
          used to be finished when it was built to the drawing. Now it is finished when it demonstrably
          performs: airtightness tested, systems commissioned, controls proved, results recorded.
        </p>
        <p>
          That reaches you directly. Your circuits are not accepted because they look right; they are
          accepted because the readings support them and the certification says so. The controls you
          installed are not accepted because they are wired; they are accepted because somebody watched
          them do the right thing.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>The performance gap is real.</strong> Buildings routinely fall short of what was designed, and the causes are usually small installation and commissioning details rather than one big failure.</li>
          <li><strong>Your penetrations count.</strong> A hole through an airtightness layer is measured, and the test names a number that somebody has to improve.</li>
          <li><strong>Evidence is part of the product.</strong> The certificate and the commissioning record are not admin after the job; they are the job&rsquo;s proof.</li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Load is moving onto the electrical installation"
        onSite="Heat and transport used to burn fuel. Increasingly they draw current instead."
      >
        <p>
          Things a building used to do with a fuel it burned, it now increasingly does with electricity.
          Heat is the big one. Transport is the other. Both put substantial, sustained load onto
          installations that were sized when neither existed.
        </p>
        <p>
          The consequence is not exotic. It is the assessment of maximum demand, the size of the tails,
          the number of ways left in the board, and whether the supply has capacity. Half the modern jobs
          that look like fitting a new appliance turn out to be a supply and distribution question first.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Sustained is different from intermittent.</strong> A shower is a heavy load for ten minutes. Heat and charging can be heavy for hours.</li>
          <li><strong>Diversity assumptions age badly.</strong> An existing board&rsquo;s original assessment did not anticipate any of this.</li>
          <li><strong>Check before you promise.</strong> Confirming the supply and the spare capacity before quoting saves a difficult conversation later.</li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="301-3-3-check-1"
        question="A client asks for a heat pump supply and a charge point on an existing domestic installation. What is the first question?"
        options={[
          'Which manufacturer the client prefers',
          'Whether the loft insulation is adequate',
          'What is the existing supply capacity and the assessed maximum demand, before anything is promised about the new loads',
          'How long the installation will take',
        ]}
        correctIndex={2}
        explanation="Both are sustained loads on an installation sized before either existed. Establishing capacity first stops you quoting work the supply cannot carry."
      />

      <SectionRule />

      <ContentEyebrow>Generation and storage on site</ContentEyebrow>

      <ConceptBlock
        title="Installations that generate and store"
        plainEnglish="Power can now flow both ways, and there is more than one place to isolate."
      >
        <p>
          A conventional installation has one source. Power enters at the origin and flows outward. An
          installation with generation, with storage, or with both is not like that. It can carry power
          back towards the origin, and it can remain live from inside when the incoming supply is dead.
        </p>
        <p>
          Everything that follows from that is practical rather than theoretical. Isolation becomes a
          sequence rather than a switch. Labelling stops being a courtesy and becomes the only warning
          the next person gets. The information you leave behind has to tell somebody who has never seen
          the building where the other sources are.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Prove dead at every source.</strong> Pulling the main switch is no longer sufficient evidence that the installation is safe to work on.</li>
          <li><strong>Label at the point of danger.</strong> Warning notices belong where somebody will be standing when they open something, not filed in a folder.</li>
          <li><strong>Assume the next person knows nothing.</strong> They will not have met the building and they will not have the drawings.</li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026"
        clause="Regulation 133.1.3 (Selection of equipment) has been modified and now requires that certain usage of equipment shall be recorded on the appropriate electrical certification specified in Part 6."
        meaning="Where BS 7671 calls for the usage of a particular item of equipment to be identified, that usage must be entered on the certificate for the work. It is a narrow requirement rather than a blanket one, but it points at exactly the change this criterion is about: a modern installation holds information that cannot be read off the equipment by looking at it, so the certification has to carry it forward. The entry must be clear enough to tie it to the circuit, location or protective measure involved."
        cite="BS 7671 Part 1 — Scope, Object and Fundamental Principles, Chapter 13"
      />

      <SectionRule />

      <ContentEyebrow>Offsite build and commissioning</ContentEyebrow>

      <ConceptBlock
        title="Work moves off site"
        onSite="A module arrives finished. You cannot adjust it on the lorry."
      >
        <p>
          More of a modern building is made in a factory and delivered. Bathroom pods, plant skids,
          prefabricated risers, pre-wired assemblies, whole volumetric modules. It is faster, it is drier
          and it is more consistent than building the same thing on a scaffold in the rain.
        </p>
        <p>
          The price is that the decision point moves. On a traditional site you can resolve a coordination
          problem at first fix. When the riser is manufactured six weeks before it arrives, the
          coordination has to be right before manufacture starts, and nobody can change it afterwards
          without a cost.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Information earlier, and correct.</strong> A late change is not an inconvenience, it is a remanufacture.</li>
          <li><strong>Tolerances tighten.</strong> Two factory-made items have to meet on site with no packing and no adjustment.</li>
          <li><strong>The connection is the risk.</strong> The interface between a module and the rest of the building is where problems concentrate, and it is usually your joint.</li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Commissioning and configuration become real work"
        plainEnglish="A system can be wired perfectly and still behave wrongly."
      >
        <p>
          Older installations did what the wiring said they did. A switch fed a light. A contactor pulled
          in when its coil was energised. Modern systems have settings: schedules, addresses, thresholds,
          priorities, firmware versions.
        </p>
        <p>
          That creates a class of fault that did not exist. Nothing is loose, nothing is broken, the
          insulation resistance is fine and the continuity is fine, and the system still does the wrong
          thing because a value somewhere is not what somebody assumed. Finding that requires a different
          discipline from fault-finding on cables.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Prove the electrical installation first.</strong> Do not start chasing configuration until the wiring is verified, or you will chase both at once.</li>
          <li><strong>Record what you set.</strong> A setting nobody wrote down is a setting nobody can restore.</li>
          <li><strong>Demonstrate, do not describe.</strong> Show the client the system doing the thing, rather than telling them it will.</li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="301-3-3-check-2"
        question="A lighting control system behaves incorrectly on handover. Continuity, insulation resistance and polarity all test correctly. What is the right sequence?"
        options={[
          'Rewire the circuits from scratch',
          'Confirm the installation is electrically sound, then treat it as a configuration problem and check the settings and addressing against what was specified',
          'Replace the luminaires',
          'Record it as an acceptable variation and hand over',
        ]}
        correctIndex={1}
        explanation="Correct test results are evidence, and they point you away from the wiring. The fault lives in the setup, which is now part of the electrician's work."
      />

      <SectionRule />

      <ContentEyebrow>Handover information and programme</ContentEyebrow>

      <ConceptBlock
        title="Information has to survive the handover"
        onSite="You can trace an old installation by eye. You cannot see a setting."
      >
        <p>
          A conventional installation explains itself. Follow the cable, open the box, read the label.
          You can reconstruct most of what somebody did by looking at what they left.
        </p>
        <p>
          A modern one does not. The number of sources, the load-management arrangement, the control
          schedule, the addressing scheme and the reason a particular device was selected are all
          invisible. If they are not written down, they are lost the moment the installer leaves.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Certification is the backbone.</strong> It is the one document that reliably follows the installation.</li>
          <li><strong>Write for a stranger.</strong> The person who reads it will not have your context, your memory or your phone number.</li>
          <li><strong>Keep it with the installation.</strong> A record filed only in an office is a record the next electrician will never see.</li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Programmes are tighter and the sequence is unforgiving"
        plainEnglish="Fast build means everything closes up quickly, and late is expensive for someone else too."
      >
        <p>
          Modern construction is quicker and more sequenced than it used to be. Dry construction methods
          mean there is no drying-out period to absorb slippage. A finish can follow a first fix by days
          rather than weeks.
        </p>
        <p>
          The effect on you is that being late is not just your problem, and being ready when the
          programme says so is a genuine professional skill. It also means anything you did not resolve
          before the void closed has become a much bigger job than it was the day before.
        </p>
      </ConceptBlock>

      <ContentEyebrow>What stays the same</ContentEyebrow>

      <ConceptBlock
        title="What has not changed"
        onSite="All of it sits on safe isolation, good workmanship, testing and certification."
      >
        <p>
          It is easy to read a list like this and conclude the trade has been replaced by something else.
          It has not. Every new technology in a building is still wired by somebody who has to isolate it
          safely, terminate it properly, test it honestly and certify it accurately.
        </p>
        <p>
          The fundamentals have if anything become more important, because there is more to get wrong and
          the consequences propagate further. An electrician who is weak on isolation does not become
          adequate by learning a control system; they become dangerous in a more complicated building.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="301-3-3-check-3"
        question="Which statement best describes how new technology relates to core electrical skill?"
        options={[
          'It replaces the need for traditional skills',
          'It sits on top of the fundamentals — isolation, workmanship, testing and certification matter more, not less',
          'It is a separate trade that does not involve electricians',
          'It reduces the amount of testing required',
        ]}
        correctIndex={1}
        explanation="More sources, more settings and more interfaces mean more ways to be wrong. The fundamentals are what stop that becoming dangerous."
      />

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Treating the new parts of a job as somebody else's specialism"
        whatHappens={
          <>
            <p>
              The electrician installs the circuits, terminates the equipment, tests, certifies and
              leaves. The controls, the monitoring and the system configuration are assumed to be the
              supplier&rsquo;s problem, or the commissioning engineer&rsquo;s, or the client&rsquo;s
              integrator.
            </p>
            <p>
              Nobody has actually been appointed to do them. The system is energised but not set up. The
              client rings the electrician, because the electrician is the person they met. The
              electrician has no record of what was specified, no settings written down and no contract
              scope covering it, and the conversation goes badly in every direction.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Establish at the outset who commissions and configures what, and get it in writing. If it is
              you, price it and plan the time. If it is not you, name who it is and make sure the client
              knows before handover rather than after.
            </p>
            <p>
              Either way, record the state you left things in: what is wired, what is energised, what is
              configured and what is not. That record is the difference between a clean handover and an
              argument about a system nobody owns.
            </p>
          </>
        }
      />

      <CommonMistake
        title="Proving dead at the main switch in a building that makes its own electricity"
        whatHappens={
          <>
            <p>
              The habit is thirty years old and it has never let anybody down: open the main switch,
              prove dead, get on with the work. On an installation that generates or stores, that
              habit is no longer evidence of anything. The incoming supply is off and the
              installation can still be live from inside.
            </p>
            <p>
              The person it catches is rarely the one who installed it. It is the electrician who
              arrives two years later for an unrelated repair, finds no warning notice at the point
              they are opening, sees one main switch and reasonably assumes one source.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Treat isolation as a sequence rather than a switch. Establish every source in the
              installation, isolate each one, and prove dead at each of them before any work
              starts. One correct reading at the origin does not speak for the rest of the
              installation.
            </p>
            <p>
              Then leave the warning where the danger is. Label at the point somebody will be
              standing when they open something, not in a folder in an office, and write the
              handover information for a stranger who has never seen the building and has none of
              your context.
            </p>
          </>
        }
      />

      <SectionRule />

      <Scenario
        title="A new-build apartment block in Aberystwyth"
        situation={
          <>
            <p>
              Four storeys, prefabricated risers delivered pre-wired, communal charge points in the
              undercroft with load management, photovoltaic generation on the roof feeding the landlord
              supply, and a mechanical ventilation system in every flat with controls tied into a
              building monitoring platform.
            </p>
            <p>
              Handover is in three weeks. The risers arrived last month and are installed. The charge
              points are on site but not configured. Nobody on site can tell you who is setting the load
              management limits, and there is no document that says where the generation isolates.
            </p>
          </>
        }
        whatToDo={
          <>
            <p>
              Deal with the safety question first, because it is the one with consequences. Establish and
              document every source in the building and the correct isolation sequence for each, and get
              warning labels on at the physical points where somebody will open something. Until that is
              done, nobody working on that installation has the information they need to work safely on
              it, and that is not a handover issue, it is a today issue.
            </p>
            <p>
              Then force the commissioning question into the open in writing: who sets the charge point
              load management, against what limit, and who signs that it was done. Name the gap rather
              than hoping it resolves. Record the assessed capacity the limit is protecting, so the number
              is defensible.
            </p>
            <p>
              Finally, check the prefabricated risers at their interfaces. That is where the factory work
              meets the site work and it is where the defects concentrate. Test and record them properly
              rather than accepting them as pre-tested because they arrived complete.
            </p>
          </>
        }
        whyItMatters={
          <>
            <p>
              Every one of these is invisible on the day. An unlabelled second source is invisible until
              an electrician is working on a circuit they proved dead at the main switch. An unconfigured
              load management scheme is invisible until enough cars plug in at once. An untested factory
              joint is invisible until it heats up.
            </p>
            <p>
              What they have in common is that the building cannot be understood by looking at it. That is
              the defining feature of twenty-first century construction for an electrician, and the answer
              to all three is the same: establish it, prove it and write it down before you leave.
            </p>
          </>
        }
      />

      <SectionRule />

      <FAQ
        items={[
          {
            question: 'Does all this mean an electrician now needs to be an IT specialist?',
            answer:
              'No, but it does mean being comfortable with configuration as well as wiring. The skill is knowing how to prove the electrical installation is sound, then working methodically through settings against what was specified. That is fault-finding discipline applied to a different medium, not a different career.',
          },
          {
            question: 'How do I deal with a client who wants a new load added and does not want to hear about the supply?',
            answer:
              'Establish the capacity position first, put it in writing, and offer the options that exist — load management, an upgrade, or a different piece of equipment. The unattractive answer delivered early is far better received than the same answer delivered after the work has started.',
          },
          {
            question: 'Who is responsible for commissioning if the contract does not say?',
            answer:
              'Nobody, which is the problem. The useful thing an electrician can do is to name the gap in writing early enough for somebody to fill it, and to record clearly what state the installation was left in. Being the person who raised it is a much better position than being the person who was assumed to be doing it.',
          },
          {
            question: 'Is prefabrication reducing the work available to electricians?',
            answer:
              'It is moving it rather than removing it. The wiring still has to be done, by electricians, in a factory instead of on a scaffold, and the site work concentrates on interfaces, connection, testing and commissioning. What it does reduce is the room to solve problems late, which raises the value of getting the design and coordination right early.',
          },
        ]}
      />

      <KeyTakeaways
        points={[
          'Modern buildings are judged on measured performance rather than on conformity to a drawing, so installation and commissioning detail becomes visible.',
          'Heat and transport moving onto the electrical installation adds substantial sustained load to buildings never sized for it.',
          'Generation and storage make an installation two-way, so isolation becomes a sequence and labelling becomes the next person’s only warning.',
          'Moving work into a factory moves the decision point earlier and removes the room to improvise on site.',
          'Commissioning and configuration create a class of fault that is neither wiring nor equipment, and it needs a different discipline to find.',
          'A modern installation cannot be understood by looking at it, so the information left behind carries what the fabric cannot show.',
          'Regulation 133.1.3 as modified requires certain usage of equipment to be recorded on the appropriate Part 6 certification.',
          'Safe isolation, good workmanship, testing and certification have not changed — everything new depends on them being done properly.',
        ]}
      />

      <ContentEyebrow>Check yourself</ContentEyebrow>
      <Quiz questions={quizQuestions} title="Factors influencing 21st century construction" />
    </div>
  );
}
