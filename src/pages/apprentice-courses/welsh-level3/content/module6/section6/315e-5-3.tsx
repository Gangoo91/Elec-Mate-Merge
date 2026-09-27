/**
 * Unit 315E · Learning outcome 5 · Criterion 5.3 — The application of smart
 * technology when used for convenience, comfort, safety, and security
 *
 * Written as selection and design, which is what outcome 5 is about, not as a
 * tour of products. The four words in the criterion are treated as four
 * different jobs with four different consequences when the technology fails,
 * and the safety one is held apart from the other three deliberately.
 *
 * This criterion was a gap — nothing in the Study Centre taught it — so this
 * page is the only place a learner meets it.
 *
 * No product, manufacturer, protocol brand or market figure is named. The two
 * citations are the only ones we hold for this subject.
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
    question: 'What is the first design question to ask about any smart device you are asked to install?',
    options: [
      'What happens to the load it controls when the device fails or loses its connection',
      'Which app it uses',
      'Whether the client likes the colour',
      'How quickly it can be commissioned',
    ],
    correctAnswer: 0,
    explanation:
      'Everything else follows from the failure mode. A device whose failure leaves a light on is a different design problem from one whose failure leaves a door lock open.',
  },
  {
    id: 2,
    question: 'Why must a safety function never depend solely on a smart control?',
    options: [
      'Safety must not rely on a network, a configuration or a battery that can fail silently',
      'Smart controls are not permitted in installations',
      'Safety functions always need a higher voltage',
      'Because smart devices cannot be tested',
    ],
    correctAnswer: 0,
    explanation:
      'Convenience can fail and annoy someone. A safety function that fails can hurt them. The protective measure has to stand on its own.',
  },
  {
    id: 3,
    question: 'A smart switch with a safety-related switching or isolation role should be treated as',
    options: [
      'Electrical equipment, subject to inspection and testing like anything else',
      'A communications device outside the scope of testing',
      'The client’s own equipment, not the electrician’s concern',
      'Exempt because it is controlled remotely',
    ],
    correctAnswer: 0,
    explanation:
      'Guidance Note 3 lists remote or smart technology switches as items to include in inspection and testing, and says to treat them as electrical equipment where they have a safety-related switching or isolation role.',
  },
  {
    id: 4,
    question: 'Smart control that shifts load or limits export turns the installation into',
    options: [
      'A prosumer’s electrical installation, where Chapter 82 applies',
      'A commercial installation regardless of size',
      'An installation exempt from BS 7671',
      'A temporary installation',
    ],
    correctAnswer: 0,
    explanation:
      'Chapter 82 is new in Amendment 4 and covers low voltage installations that include local production and/or storage of energy.',
  },
  {
    id: 5,
    question: 'Why does load shifting increase the case for surge protection?',
    options: [
      'Switching between sources, load shedding and load shifting can make switching overvoltages more frequent and greater',
      'Because it increases the supply voltage',
      'Because smart devices are more fragile than other equipment',
      'It does not — surge protection is unrelated',
    ],
    correctAnswer: 0,
    explanation:
      'The standard gives those three activities as examples of why switching overvoltages in a prosumer’s installation may be more frequent and perhaps greater than in an ordinary one.',
  },
  {
    id: 6,
    question: 'What is the most common practical failure of a smart installation at handover?',
    options: [
      'It is wired correctly and energised but never configured, and nobody was appointed to configure it',
      'The cables are undersized',
      'The protective devices are the wrong type',
      'The earthing arrangement is incorrect',
    ],
    correctAnswer: 0,
    explanation:
      'Commissioning and configuration are real work. If the contract does not say who does them, frequently nobody does, and the electrician gets the phone call.',
  },
  {
    id: 7,
    question: 'A client asks for smart lighting throughout. What must the design still provide?',
    options: [
      'A way to operate the lighting that does not depend on the smart system working',
      'A separate consumer unit for the lighting',
      'A higher lighting design level than normal',
      'Nothing extra — the smart system is the control',
    ],
    correctAnswer: 0,
    explanation:
      'A house whose lights cannot be switched on when the network is down is a house with a design fault, not a feature.',
  },
  {
    id: 8,
    question: 'What should you record about a smart installation that you would not need to for a conventional one?',
    options: [
      'The settings and configuration, because none of it can be read off the installation by looking at it',
      'The manufacturer’s address',
      'The date the client bought the equipment',
      'Nothing different is required',
    ],
    correctAnswer: 0,
    explanation:
      'You can trace a conventional installation by eye. A schedule, a threshold or an addressing scheme is invisible, so if it is not written down it is lost.',
  },
];

export default function Lesson315e_5_3() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'Smart technology is a control layer sitting on an ordinary electrical installation — the installation underneath still has to be right on its own.',
          'Judge every device by what happens when it fails, not by what it does when it works.',
          'Convenience, comfort and security can degrade gracefully. A safety function cannot, so it must never depend solely on a network or a configuration.',
          'Where smart control shifts load, limits export or manages storage, the installation becomes a prosumer’s installation and Chapter 82 applies.',
          'The settings are invisible, so commissioning and a written record are part of the job rather than paperwork after it.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Distinguish the four purposes named in this criterion — convenience, comfort, safety and security — and explain why safety is treated differently from the other three.',
          'Assess a smart device by its failure mode before assessing it by its features.',
          'Explain why a smart switch with a safety-related switching or isolation role is treated as electrical equipment for inspection and testing.',
          'Recognise when smart control of generation, storage or load makes an installation a prosumer’s electrical installation.',
          'State what must be commissioned, demonstrated and recorded before a smart installation is handed over.',
        ]}
        initialVisibleCount={3}
      />

      <SectionRule />

      <ContentEyebrow>What smart control is for</ContentEyebrow>

      <ConceptBlock
        title="A control layer, not a different installation"
        plainEnglish="Underneath every smart system is an ordinary circuit that still has to be designed properly."
      >
        <p>
          It is easy to treat smart technology as a separate subject. It is not. A smart light switch
          still switches a lighting circuit. A smart thermostat still calls a heating load. A smart
          socket still carries current through a contact.
        </p>
        <p>
          Everything you already know applies unchanged: the circuit is designed, the conductors are
          selected, the protective device is selected, the disconnection time is met, the installation is
          tested and certified. The smart part sits on top of that and decides <em>when</em> things
          happen. It does not change whether the thing underneath is safe.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Get the installation right first.</strong> A smart device on a badly designed circuit is a badly designed circuit with an app.</li>
          <li><strong>The load is still the load.</strong> Smart control does not reduce a heating load, it only moves when it runs.</li>
          <li><strong>The device is equipment.</strong> It has a rating, a set of conditions it suits, and a place it belongs.</li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Four purposes, and why safety is not like the other three"
        onSite="Convenience failing is annoying. Safety failing hurts somebody."
      >
        <p>
          The criterion names four jobs smart technology is put to, and they are not equivalent. The
          useful way to separate them is by what happens when the technology stops working.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Convenience.</strong> Scheduling, remote operation, scenes, voice control. Fails and the occupant does it by hand. Low consequence.</li>
          <li><strong>Comfort.</strong> Heating, cooling, ventilation, shading, lighting level. Fails and the building gets too warm or too cold before anyone notices. Moderate consequence, and slow.</li>
          <li><strong>Security.</strong> Alarms, entry, cameras, occupancy simulation. Fails and a protection the occupant believes in is silently absent. High consequence, and the failure is invisible.</li>
          <li><strong>Safety.</strong> Anything protecting a person from harm. Fails and somebody can be hurt. This is the one that must not depend on the smart layer at all.</li>
        </ul>
        <p>
          The design rule that falls out of this is simple. Convenience, comfort and security may be
          delivered by the smart system, provided the occupant is told what they lose when it is down.
          Safety may not. A protective measure has to work when the network is down, the hub is
          unplugged, the battery is flat and the configuration has been wiped.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="315e-5-3-check-1"
        question="A client wants the isolation of a workshop supply to be operable from an app so they can switch it off from the house. What is the correct position?"
        options={[
          'An app-operated isolator is acceptable if the app is reliable',
          'Refuse the work, because smart control cannot be installed in a workshop',
          'The app may be an additional convenience, but the means of isolation required by the design must be a real device that works independently of it',
          'Fit the app control and remove the manual isolator to avoid confusion',
        ]}
        correctIndex={2}
        explanation="Isolation is a safety function. It cannot depend on a network, a phone, a hub or a configuration. Convenience can be added alongside it, never instead of it."
      />

      <SectionRule />

      <ContentEyebrow>Designing for failure</ContentEyebrow>

      <ConceptBlock
        title="Design for the failure, not the demonstration"
        plainEnglish="Ask what the load does when the control dies — on, off, or last state."
      >
        <p>
          Every smart device has a failure mode, whether or not anyone chose it. When it loses power,
          loses its connection, or gets a corrupted configuration, the load it controls ends up in some
          state. The question is whether that state was designed or was an accident.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Fails on.</strong> Right for a light in a stairwell. Wrong for a heater in an empty building.</li>
          <li><strong>Fails off.</strong> Right for most heating and most equipment. Wrong for a freezer, a sump pump or anything protecting something else.</li>
          <li><strong>Holds last state.</strong> Convenient, and the most likely to surprise somebody, because the state is whatever it happened to be.</li>
        </ul>
        <p>
          Ask the question out loud with the client before you order anything. &ldquo;If this stops
          talking to the internet on a Friday night, what do you want this circuit to do?&rdquo; is a
          question most clients have never been asked and can always answer.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Manual operation is not optional"
        onSite="A house whose lights will not come on without a working network is a house with a fault."
      >
        <p>
          The single most common complaint about smart installations is not that they broke, it is that
          when they broke nobody could work the building. Somebody removed the physical switches because
          the app does that now, and then the hub failed.
        </p>
        <p>
          Keep a way to operate the essentials by hand. It costs little at first fix and it is the
          difference between a system that degrades and a system that strands people. It also makes the
          installation testable, fault-findable and saleable to the next owner, who may not want any of
          the smart layer at all.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="GN3 9th Ed:2022 (A4)"
        clause="Regulation 2.13 lists remote or smart technology switches as items to include in inspection and testing."
        meaning="Although a smart switch or a building management controller is largely a control and communication device, it is to be treated as electrical equipment for the purposes of inspection and testing wherever it has a safety-related switching or isolation role. That means identifying it, verifying its control interfaces and its safety-related switching functions, and covering functional operation along with the relevant earthing and insulation considerations. You cannot leave a device out of the inspection because it is on the network rather than on a wall."
        cite="Guidance Note 3, Chapter 2"
      />

      <SectionRule />

      <ContentEyebrow>When it changes the installation</ContentEyebrow>

      <ConceptBlock
        title="When smart control changes what the installation is"
        plainEnglish="Shift load, limit export or manage storage and you are no longer designing an ordinary installation."
      >
        <p>
          Most smart technology is a convenience layer. Some of it is not. Once the control is deciding
          when to charge a battery, when to export, when to shed load or when to run a heat pump against
          a tariff, it is managing energy flows, and the installation has crossed into different
          territory.
        </p>
        <p>
          Chapter 82 is new in Amendment 4 and covers this. It applies where local production and/or
          storage of energy is present in a low voltage installation, and such installations are
          designated prosumer&rsquo;s electrical installations. It gives requirements, measures and
          recommendations for their design, erection and verification.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>The supply requirements still bind.</strong> The installation has to comply with the supply requirements &mdash; voltage, frequency and the rest &mdash; regardless of what the control layer is doing.</li>
          <li><strong>Switching becomes routine.</strong> Switching between sources, load shedding and load shifting are given as examples of why switching overvoltages may be more frequent and perhaps greater than in an ordinary installation.</li>
          <li><strong>So surge protection moves up the agenda.</strong> Where that is the case, consideration is to be given to installing surge protective devices to protect the installation and its equipment.</li>
        </ul>
        <p>
          The practical consequence for you: a job that looked like fitting a smart tariff controller can
          turn into a design question about surge protection and export arrangements, and it is better to
          find that out at the quote than at the commissioning.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 826.1.4"
        clause="826.1.4 Protection against transient overvoltages Switching overvoltages in a PEI may be more frequent and perhaps greater than in a non PEI installation (for example, due to the switching between sources, load shedding, load shifting). Consideration is to be given to the installation of surge protective devices for the protection of the PEI installation and equipment against switching overvoltages."
        meaning="PEI is the prosumer&rsquo;s electrical installation &mdash; the one you have just created by adding generation, storage and a controller that moves load about. The point being made is that the switching itself is the new hazard: every automatic transfer between sources and every shifted load is another switching event on a system that used to see very few. So surge protection stops being a box you tick on a risk assessment and becomes something you have to actively think about and be able to justify, either way, on this particular job."
        cite="BS 7671 Part 8, Chapter 82 — Regulation 826.1.4"
      />

      <InlineCheck
        id="315e-5-3-check-2"
        question="A domestic client already has generation and storage, and now wants a controller that shifts loads to cheap-rate periods. What has the design become?"
        options={[
          'An ordinary domestic installation with an extra accessory',
          'A commercial installation requiring a three-phase supply',
          'A prosumer’s electrical installation, so Chapter 82 applies and the increased frequency of switching overvoltages should inform whether surge protection is needed',
          'Outside the scope of BS 7671',
        ]}
        correctIndex={2}
        explanation="Local production and storage put it in Chapter 82's scope, and load shifting is one of the named reasons switching overvoltages may be more frequent and greater."
      />

      <SectionRule />

      <ContentEyebrow>Security of the system</ContentEyebrow>

      <ConceptBlock
        title="Security, and the protection people think they have"
        onSite="A camera that stopped uploading three weeks ago looks exactly like one that is working."
      >
        <p>
          Security is the purpose where failure is most likely to go unnoticed, because nothing visible
          changes. The occupant believes they are protected until the day they need it.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Silent failure is the risk.</strong> Ask whether the system tells anybody when it stops working, and if it does not, say so plainly to the client.</li>
          <li><strong>Power is your part of it.</strong> A security function on an unprotected circuit that somebody switches off at the board is a security function with an off switch.</li>
          <li><strong>Do not oversell it.</strong> Explain what the installation does and does not do. Never let a client leave believing a convenience feature is a safety measure.</li>
        </ul>
      </ConceptBlock>

      <ContentEyebrow>Commissioning and handover</ContentEyebrow>

      <ConceptBlock
        title="Commissioning is work, and somebody has to be appointed to it"
        plainEnglish="Wired and energised is not the same as working."
      >
        <p>
          A conventional accessory works the moment it is terminated. A smart device does nothing useful
          until it has been configured: joined to a network, addressed, scheduled, given thresholds, tied
          to the things it controls and demonstrated.
        </p>
        <p>
          That work is real, it takes time, and it is very often in nobody&rsquo;s scope. The system gets
          energised, everybody assumes the supplier or the integrator or the client will finish it, and
          the client rings the electrician because the electrician is the person they met.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Settle it in writing at the start.</strong> Who configures, who commissions, who signs it off.</li>
          <li><strong>Price it if it is yours.</strong> Configuration time is labour like any other.</li>
          <li><strong>Demonstrate, do not describe.</strong> Show the client each function actually happening before you leave.</li>
          <li><strong>Prove the installation first.</strong> Do not chase a configuration fault until the wiring is verified, or you will be chasing two problems at once.</li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="315e-5-3-check-3"
        question="A smart heating system behaves incorrectly at handover. Continuity, insulation resistance, polarity and earth fault loop impedance all test correctly. What does that tell you?"
        options={[
          'One of the tests must have been performed incorrectly',
          'The electrical installation is sound, so the fault lies in the configuration — check settings, schedules and addressing against what was specified',
          'The cables need replacing with a larger size',
          'The equipment is faulty and should be returned',
        ]}
        correctIndex={1}
        explanation="Correct test results are evidence, and they point away from the wiring. Configuration faults are a real category: nothing is loose, nothing is broken, and the system still does the wrong thing."
      />

      <SectionRule />

      <ConceptBlock
        title="What you leave behind"
        onSite="You can trace a conventional installation by eye. You cannot see a setting."
      >
        <p>
          A conventional installation explains itself to the next electrician. Follow the cable, open the
          box, read the label. A smart installation does not. The schedule, the threshold, the addressing
          scheme, the reason a device was chosen and what happens when it fails are all invisible.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Write the settings down.</strong> A setting nobody recorded is a setting nobody can restore.</li>
          <li><strong>Write for a stranger.</strong> The next person will not have your context or your phone number.</li>
          <li><strong>Keep it with the installation.</strong> A record that exists only in an office is a record the next electrician never sees.</li>
          <li><strong>Record the failure modes you designed.</strong> Which circuits fail on, which fail off, and why.</li>
        </ul>
      </ConceptBlock>

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Letting the smart layer become the only way to work the building"
        whatHappens={
          <>
            <p>
              The specification calls for smart control throughout, so the physical switches are reduced
              to a minimum or left out entirely to keep the walls clean. Everything is operated from the
              app. It demonstrates beautifully on handover day.
            </p>
            <p>
              Eighteen months later the hub fails, or the broadband is down for two days, or the occupant
              changes their phone and cannot get back into the account. Now the lights will not switch,
              the heating runs to whatever schedule it last held, and nobody in the building can do
              anything about any of it. The electrician gets the call, and the honest answer &mdash;
              that the building was designed this way &mdash; is not one the client wants.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Keep a hand-operable route to every essential function, and say explicitly in the quotation
              that you are doing so and why. Lighting that can be switched at the wall, heating that can
              be called without an app, sockets that work with nothing connected.
            </p>
            <p>
              Then have the failure conversation with the client before you order the equipment, and
              record the answers. Which circuits fail on, which fail off, and what the occupant should
              expect when the system is down. It takes twenty minutes and it turns the eventual failure
              into an inconvenience rather than a complaint.
            </p>
          </>
        }
      />

      <CommonMistake
        title="Energising the system and calling that the handover"
        whatHappens={
          <>
            <p>
              The devices are in, the circuits are tested and the system powers up. Nobody has agreed
              who joins it to the network, who addresses the devices, who sets the schedules and
              thresholds, or who demonstrates each function to the client. Everyone assumes somebody
              else has that — the supplier, the integrator, the client&rsquo;s own IT person — so it sits
              unfinished with the power on.
            </p>
            <p>
              The client rings the electrician, because the electrician is the person they met. Now
              there is unpriced configuration work, a client who believes they were handed a working
              system, and nobody able to say what the settings were meant to be. Worse, when the first
              thing misbehaves there is no way to tell a configuration fault from an installation fault,
              so the fault-finding starts by taking apart work that was never wrong.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Settle it in writing before anything is ordered: who configures, who commissions, who
              signs it off. If that work is yours, price the time like any other labour rather than
              absorbing it as half an hour at the end.
            </p>
            <p>
              Then prove the installation before you touch the configuration, so you are never chasing
              two problems at once, and demonstrate each function actually happening in front of the
              client rather than describing what it will do. Leave the settings, the addressing and the
              designed failure modes written down with the installation, because a setting nobody
              recorded is a setting nobody can restore.
            </p>
          </>
        }
      />

      <SectionRule />

      <Scenario
        title="A converted barn near Crickhowell"
        situation={
          <>
            <p>
              A barn conversion, occupied, running a heat pump, a battery and roof-mounted generation.
              The client has bought an energy management controller that will shift the heat pump and the
              battery charging to cheap-rate periods, and wants smart lighting and smart door entry
              throughout while you are there.
            </p>
            <p>
              They also want the front door lock and the garage supply operable from the app, and have
              asked whether the physical light switches can be left out to keep the stone walls clear.
            </p>
          </>
        }
        whatToDo={
          <>
            <p>
              Separate the four purposes before you price anything. The lighting and the entry
              convenience are fine as smart functions. The load shifting is an energy management
              question. The garage supply isolation is a safety function and is not negotiable &mdash;
              the means of isolation the design requires must be a real device that works with the
              network down, whatever the app also offers.
            </p>
            <p>
              Tell the client plainly that leaving out the light switches is a design fault rather than a
              style choice, and offer the compromise: a discreet hand-operable route to every lighting
              circuit, set out to suit the building. They almost always agree once the failure case is
              described.
            </p>
            <p>
              Then deal with what the energy controller actually changes. With local production and
              storage present, this is a prosumer&rsquo;s installation and Chapter 82 applies to its
              design, erection and verification. Load shifting and switching between sources are named
              reasons switching overvoltages may be more frequent and perhaps greater here than in an
              ordinary installation, so surge protection needs genuine consideration rather than a
              default answer. The installation must still meet the supply requirements.
            </p>
            <p>
              Finally, settle commissioning in writing. Who configures the controller, against what
              limits, and who signs that it was done. Then record every setting and every designed
              failure mode and leave the record with the installation.
            </p>
          </>
        }
        whyItMatters={
          <>
            <p>
              Three of these are invisible on the day and expensive later. An app-only isolation looks
              fine until somebody needs to make the garage dead and the hub is offline. Missing switches
              look elegant until the first outage. Unconsidered surge protection on an installation that
              now switches sources routinely looks like nothing at all, right up until equipment starts
              failing and nobody can explain why.
            </p>
            <p>
              The common thread is that the smart layer changed the design and nobody wrote it down. What
              separates a professional job here from an enthusiastic one is that the failure modes were
              chosen deliberately, the safety functions were kept off the network, and the settings exist
              on paper for whoever comes next.
            </p>
          </>
        }
      />

      <SectionRule />

      <FAQ
        items={[
          {
            question: 'Is it my job to configure a client’s smart system, or just to wire it?',
            answer:
              'Whichever the contract says — and the problem is that it usually says nothing. Establish it in writing before you start. If configuration is yours, price the time properly. If it is not, name who it belongs to and make sure the client knows before handover rather than after, and record what state you left the installation in.',
          },
          {
            question: 'Can a smart device ever form part of a protective measure?',
            answer:
              'Treat that as a design decision well above the level of an on-site judgement call. The working rule for an installing electrician is that a protective measure must function with the smart layer entirely absent. If a design appears to rely on a networked device for safety, query it with whoever produced the design rather than installing it and hoping.',
          },
          {
            question: 'The client wants to supply their own smart equipment. Where does that leave me?',
            answer:
              'The circuit, the protective device and the installation work remain yours and must be right regardless. Establish in writing what you are responsible for and what you are not, check that client-supplied equipment suits the conditions and the load, and do not certify the operation of something you did not select or commission.',
          },
          {
            question: 'How much of this really comes up on ordinary domestic work?',
            answer:
              'More every year, and usually arriving as something else — a heat pump, a charge point, a battery. The moment energy is being produced, stored or shifted, the smart controller stops being an accessory and becomes part of the design. Spotting that at the quotation stage is the skill this criterion is really testing.',
          },
        ]}
      />

      <KeyTakeaways
        points={[
          'Smart technology is a control layer on an ordinary installation — the circuit underneath must be correctly designed, tested and certified on its own.',
          'Judge every device by its failure mode first: what the load does when the device loses power, loses its connection or loses its configuration.',
          'Convenience, comfort and security may be delivered by the smart layer provided the occupant is told what they lose; safety may not depend on it at all.',
          'Keep a hand-operable route to every essential function — a building that cannot be worked without a network is a building with a design fault.',
          'Guidance Note 3 lists remote or smart technology switches as inspection and testing items, treated as electrical equipment where they have a safety-related switching or isolation role.',
          'Smart control of generation, storage, export or load shifting brings the installation into Chapter 82 as a prosumer’s electrical installation.',
          'Switching between sources, load shedding and load shifting can make switching overvoltages more frequent and greater, so surge protection needs real consideration.',
          'Configuration is invisible, so commissioning must be scoped to somebody in writing, demonstrated to the client, and recorded for whoever comes next.',
        ]}
      />

      <ContentEyebrow>Check yourself</ContentEyebrow>
      <Quiz questions={quizQuestions} title="Smart technology for convenience, comfort, safety and security" />
    </div>
  );
}
