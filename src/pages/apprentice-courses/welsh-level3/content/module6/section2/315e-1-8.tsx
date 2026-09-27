/**
 * Unit 315E — Understand the Principles of Electrical Installation Design
 * Learning Outcome 1 — Understand the requirements and constraints that govern installation design
 * Criterion 1.8 — Requirements for the protection against undervoltage
 *
 * Approach: undervoltage is taught as a safety topic rather than a power-quality topic. The
 * learner is walked from what a sag or a dip actually looks like on site, to the real hazard,
 * which is the automatic restart when the supply comes back, and then into the design decisions
 * and the control-circuit arrangements that prevent it. Motors and machinery carry the page.
 * This criterion was a gap in our course library — no existing lesson taught it, so this is the
 * only place a learner will meet it.
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
    question: 'What is usually the real danger in an undervoltage event?',
    options: [
      'The equipment restarting automatically when the supply comes back',
      'The slight dimming of the lighting while the voltage is low',
      'The extra energy drawn by the supply during the dip',
      'The noise made by contactors chattering during the sag',
    ],
    correctAnswer: 0,
    explanation:
      'Losing the voltage normally just stops things. The hazard is the restart. A machine that comes back to life on its own, with somebody working on it or clearing a jam, is the accident waiting to happen.',
  },
  {
    id: 2,
    question: 'What does a simple start/stop control circuit with a hold-in contact do when the supply is lost?',
    options: [
      'The contactor drops out and will not re-energise until somebody presses start again',
      'The contactor stays latched mechanically and the motor restarts on its own',
      'The contactor holds in on residual magnetism until the supply returns',
      'The contactor releases and then closes again automatically after a short delay',
    ],
    correctAnswer: 0,
    explanation:
      'The coil is fed through its own auxiliary contact. Lose the coil supply and the contactor drops out, the auxiliary contact opens, and the circuit is broken. It cannot re-make itself. That is undervoltage protection, built into the most ordinary control circuit on site.',
  },
  {
    id: 3,
    question: 'BS 7671 requires measures against voltage disturbances where necessary. Which disturbances does that requirement name?',
    options: [
      'Transient overvoltages, undervoltages and harmonics',
      'Only transient overvoltages caused by lightning',
      'Only harmonics produced by variable speed drives',
      'Only voltage unbalance between the line conductors',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 131.6 sits in the fundamental principles and covers voltage disturbances generally, including transient overvoltages, undervoltages and harmonics, so as to avoid danger and unacceptable consequences for the safety and operation of the installation.',
  },
  {
    id: 4,
    question: 'What does BS 7671 require of motor control circuits in respect of loss of voltage?',
    options: [
      'They shall be designed to prevent automatic restarting after a stoppage due to a fall in or loss of voltage, if such starting is liable to cause danger',
      'They shall always be fitted with a soft starter to limit the inrush on recovery',
      'They shall be supplied from a separate circuit to the rest of the installation',
      'They shall restart automatically so that the process is not interrupted',
    ],
    correctAnswer: 0,
    explanation:
      'The requirement is conditional on danger. If automatic restarting is liable to cause danger, the control circuit has to prevent it. Loss-of-voltage protection, undervoltage relays and mechanically latched contactors are the named means.',
  },
  {
    id: 5,
    question: 'How may the absence of hazardous automatic restarting be verified?',
    options: [
      'By functional test with a simulated fall or loss of voltage, or by inspection of the control circuitry',
      'By insulation resistance testing of the motor windings only',
      'By measuring the prospective fault current at the motor terminals',
      'By checking the motor nameplate rating against the overload setting',
    ],
    correctAnswer: 0,
    explanation:
      'Acceptance is that a simulated fall or loss of voltage does not produce automatic restarting where that would be hazardous. You can prove it by functional test, or by inspecting the control circuitry and showing that no restart path exists.',
  },
  {
    id: 6,
    question: 'At initial verification, undervoltage protective devices are:',
    options: [
      'An inspection item, checked for presence where relevant',
      'Not inspected at all, because they are purely a design matter',
      'Inspected only during periodic inspection and testing, never initially',
      'Inspected only where the client has asked for it in the specification',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 642.3(k) puts the presence of undervoltage protective devices, where relevant, into the inspection schedule. It is not an optional extra you tick if you feel like it.',
  },
  {
    id: 7,
    question: 'A low auxiliary supply voltage to a control panel is a problem because:',
    options: [
      'Relays may not operate reliably, so the control logic cannot be trusted',
      'The relay coils will always burn out immediately',
      'It increases the prospective short-circuit current at the panel',
      'It causes the main protective device to trip on overload',
    ],
    correctAnswer: 0,
    explanation:
      'BS 7671 notes that if the supply voltage is too low for the design of the circuit then the operation will not be reliable for the proper function of relays. A relay that half operates, chatters, or drops out at the wrong moment is a control system you cannot trust.',
  },
  {
    id: 8,
    question: 'Which load is the designer most likely to decide must NOT drop out during a voltage dip?',
    options: [
      'Emergency lighting and safety-critical control systems',
      'A woodworking machine in a workshop',
      'A conveyor feeding a packing line',
      'A three-phase compressor in a plant room',
    ],
    correctAnswer: 0,
    explanation:
      'Some loads are dangerous to restart, some are merely inconvenient to lose, and a few must not drop out at all. Safety systems sit in the last group and are held up by other means rather than being allowed to fall over with the supply.',
  },
];

export default function Lesson315e_1_8() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'Undervoltage is not only a blackout. It is the sag when a big motor starts, the brownout on a long rural feed, the dip during a fault on the network, and the loss that comes back a second later.',
          'The danger is almost never the voltage going away. It is what happens when it comes back.',
          'A motor that stops on loss of supply and restarts on its own, with somebody clearing a jam, is the accident this whole topic exists to prevent.',
          'BS 7671 requires motor control circuits to be designed so no motor restarts automatically after a stoppage due to a fall in or loss of voltage, if such starting is liable to cause danger.',
          'The presence of undervoltage protective devices is an inspection item at initial verification, where relevant.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Describe what undervoltage means in practice, including sags, dips, brownouts and a complete loss of supply that then returns.',
          'Explain why undervoltage is treated as a safety matter, and why the hazard is usually the restart rather than the loss itself.',
          'Describe how automatic restarting of motors is prevented, using undervoltage releases, mechanically latched contactors and supervisory relays.',
          'Explain how an ordinary contactor-held start/stop circuit provides undervoltage protection in its own right.',
          'Decide, as a designer, which loads are dangerous to restart, which are merely inconvenient to lose, and which must not drop out at all.',
        ]}
        initialVisibleCount={3}
      />

      <SectionRule />

      <ContentEyebrow>What undervoltage looks like</ContentEyebrow>

      <ConceptBlock
        title="What undervoltage actually looks like on site"
        plainEnglish="It is rarely a dramatic blackout. Most of the time it is a brief dip you would miss if you blinked."
      >
        <p>
          Learners tend to picture undervoltage as the lights going out. On site it is usually far less
          obvious than that. You get a short dip when a big load starts somewhere on the same supply. You
          get a sustained sag at the far end of a long rural feed on a cold morning when everything is
          running at once. You get a momentary interruption while the network clears a fault a mile away.
          The lights flicker, a couple of contactors drop out, and everything else carries on.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Sag or dip.</strong> A short reduction in voltage, often only a few cycles long, typically caused by a large motor starting or by a fault being cleared elsewhere on the network.</li>
          <li><strong>Brownout.</strong> A longer, sustained reduction. The supply is still there but it is low enough that equipment starts behaving oddly.</li>
          <li><strong>Interruption.</strong> The supply goes completely, then comes back. This is the one that catches people out, because the coming back is the dangerous half.</li>
          <li><strong>Unbalanced dip.</strong> On a three-phase supply you can lose or sag one line and keep the others. Three-phase motors do not enjoy this at all.</li>
        </ul>
        <p>
          Either way the equipment sees a voltage it was not designed to run on, and what happens next
          depends entirely on how the control circuits were designed.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Why this is a safety topic, not a nuisance topic"
        plainEnglish="The voltage going away stops things. The voltage coming back starts them. That is the hazard."
      >
        <p>
          Picture a packing line. The supply dips, the line stops. The operator does what anybody would
          do. They walk round to the guard, open it, and reach in to clear the jam that the sudden stop
          caused. Four seconds later the network restores and every motor on that line that had no
          undervoltage protection starts at once.
        </p>
        <p>
          Nobody made a mistake in that story except the designer. The operator behaved normally. The
          machine behaved exactly as its control circuit told it to. The failure happened months earlier,
          on a drawing, when nobody asked what this machine does when the power comes back.
        </p>
        <p>
          That is why undervoltage protection is a design requirement and not a preference. BS 7671
          frames it in terms of avoiding danger and unacceptable consequences for the safety and operation
          of the installation. Read that as: somebody has to think about it before the machine is
          installed, not after somebody is hurt.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Motors and contactor control</ContentEyebrow>

      <ConceptBlock
        title="The motor case — the classic one"
        onSite="If you only remember one application of undervoltage protection, make it this one."
      >
        <p>
          A motor running on a direct-on-line starter loses its supply. The contactor coil de-energises,
          the contactor opens, the motor coasts to a stop. So far so good. The question is what the
          control circuit does when the supply returns. If the start signal is a maintained contact, a
          selector switch left in the run position, or a pressure switch that is still calling for the
          motor, the contactor pulls straight back in and the motor runs.
        </p>
        <p>
          BS 7671 deals with this directly. Motor control circuits shall be designed so as to prevent any
          motor from restarting automatically after a stoppage due to a fall in or loss of voltage, if
          such starting is liable to cause danger. Note the condition at the end. It is a danger test,
          not a blanket ban on automatic restarting.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Loss-of-voltage protection.</strong> The general term for an arrangement that will not allow the load to re-energise once the supply has been lost.</li>
          <li><strong>Undervoltage relay.</strong> Monitors the supply and opens the control circuit when the voltage falls below a set level, holding the load off until it is reset.</li>
          <li><strong>Mechanically latched contactor.</strong> A contactor that stays closed without a coil supply. Used where the load must ride through a dip, and deliberately not used where an automatic restart would be dangerous.</li>
          <li><strong>Manual reset.</strong> A start button somebody has to physically press before the machine can run again. Simple, visible, and impossible to misunderstand.</li>
        </ul>
        <p>
          Supervisory relays in a control panel do the same job at system level. They inhibit the restart
          of a group of drives until an operator acknowledges the fault and resets the panel.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 445.11"
        clause="445.11 Suitable precautions shall be taken where a reduction in voltage, or loss and subsequent restoration of voltage, could cause danger."
        meaning="The trigger is danger, not inconvenience. You are asked to look at each load and ask what happens when the voltage sags and then comes back &mdash; and where that sequence could hurt someone, something in the circuit has to stop it. That is the manual reset, the undervoltage release or the hold-in arrangement. Where nobody could be hurt, the regulation is not asking you to fit anything."
        cite="BS 7671 Part 4, Chapter 44, Section 445 — Regulation 445.11"
      />

      <InlineCheck
        id="315e-1-8-check-1"
        question="A three-phase motor drives a conveyor with an access hatch for clearing jams. The supply dips for two seconds. Which arrangement meets the requirement?"
        options={[
          'The contactor is mechanically latched so the motor keeps running through the dip and beyond',
          'A timer restarts the motor automatically five seconds after the supply returns',
          'The motor restarts automatically but sounds a warning horn as it does so',
          'The contactor drops out and the motor cannot run again until somebody presses the start button',
        ]}
        correctIndex={3}
        explanation="Automatic restarting is exactly what the requirement prohibits where it is liable to cause danger. A conveyor somebody reaches into qualifies. Manual reset is the answer. A horn does not make an automatic restart acceptable."
      />

      <ConceptBlock
        title="Contactor-held control circuits — protection you already install"
        plainEnglish="The ordinary start/stop with a hold-in contact is undervoltage protection. Most people never think of it that way."
      >
        <p>
          Take the most common control circuit in the trade. A normally closed stop button in series with a
          normally open start button, feeding a contactor coil, with an auxiliary contact on the contactor
          wired in parallel with the start button to hold it in.
        </p>
        <p>
          Press start, the coil energises, the auxiliary contact closes, and you can let go of the button
          because the coil is now feeding itself through that contact. Press stop, the circuit breaks, the
          contactor drops out, the auxiliary opens, and the hold-in path is gone.
        </p>
        <p>
          Now lose the supply. The coil de-energises, exactly as if somebody had pressed stop. The auxiliary
          contact opens. When the supply returns, the coil has no path to it, because the only two ways to
          energise that coil are the start button and the auxiliary contact, and the auxiliary contact is
          open. The machine stays off until somebody presses start.
        </p>
        <p>
          That is undervoltage protection, and it is inherent in the circuit. It is also why swapping a
          momentary start button for a maintained selector switch quietly removes it. The switch is still
          closed when the supply returns, so the contactor pulls back in. People make that change for
          convenience and do not always realise what they have taken away.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="315e-1-8-check-2"
        question="Why does replacing a momentary start button with a maintained selector switch weaken undervoltage protection?"
        options={[
          'The switch carries more current than the button and overheats the contactor coil',
          'The switch stays closed during the outage, so the contactor re-energises as soon as the supply returns',
          'The switch removes the overload protection from the control circuit',
          'The switch prevents the contactor from ever dropping out on loss of supply',
        ]}
        correctIndex={1}
        explanation="The hold-in contact arrangement works because the only two paths to the coil are the momentary button and the auxiliary contact, and both are open after a loss of supply. A maintained switch leaves a live path, so the contactor pulls straight back in."
      />

      <SectionRule />

      <ContentEyebrow>Where else it bites</ContentEyebrow>

      <ConceptBlock
        title="Where else undervoltage bites"
        onSite="Motors are the headline. They are not the whole story."
      >
        <p>
          Control gear is the next place it shows up. Relays and contactors have a pull-in voltage and a
          drop-out voltage, and the gap between them is where the trouble lives. Sit an auxiliary supply in
          that gap and you get chatter, partial operation, contacts that make but do not hold, and logic
          that does something nobody designed. BS 7671 makes the point plainly in a note: if the supply
          voltage is too low for the design of the circuit then the operation will not be reliable for the
          proper function of relays.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Mis-operation.</strong> A relay that half operates has not failed safe. It has failed unpredictably, which is worse, because the panel drawing no longer describes the panel.</li>
          <li><strong>Damage rather than stopping.</strong> Some equipment draws more current at low voltage to hold its output up. Motors under load and some power supplies will run hot and eventually fail.</li>
          <li><strong>Data and process equipment.</strong> Servers, controllers and instrumentation can corrupt data or drop a batch on a dip that a lighting circuit would shrug off.</li>
          <li><strong>Sequenced plant.</strong> A process where things must start in order can be left in a state the programmer never wrote a recovery routine for.</li>
        </ul>
        <p>
          So the question is never only &ldquo;does it stop safely?&rdquo; It is also &ldquo;does it cope
          with being low, and what state is it in afterwards?&rdquo;
        </p>
      </ConceptBlock>

      <ContentEyebrow>The designer&rsquo;s decision</ContentEyebrow>

      <ConceptBlock
        title="What the designer actually has to decide"
        plainEnglish="Three buckets. Every load on the job goes in one of them."
      >
        <p>
          Undervoltage protection is not a product you fit everywhere. It is a decision you make load by
          load, and the decision has three possible answers.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Dangerous to restart.</strong> Machinery with moving parts, conveyors, lifting equipment, anything somebody might have their hands near. These must not restart on their own. Manual reset, undervoltage release, supervisory inhibit.</li>
          <li><strong>Inconvenient to lose.</strong> A compressor, a refrigeration plant, general small power. Losing it costs time or product but hurts nobody. Automatic restart may be entirely acceptable, and sometimes desirable.</li>
          <li><strong>Must not drop out at all.</strong> Safety services, emergency lighting, fire systems, critical control. These are held up by other means rather than being allowed to fall over and be restarted.</li>
        </ul>
        <p>
          Get the buckets wrong in either direction and you have a problem. Put a conveyor in the second
          bucket and you have designed in a hazard. Put a refrigeration plant in the first bucket without
          telling anyone and you will find a site full of spoiled stock on a Monday morning because a dip on
          Saturday night left everything requiring a manual reset.
        </p>
        <p>
          BS 7671 also expects the characteristics of protective equipment to be determined with respect to
          their function, and that function explicitly includes protection against undervoltage and loss of
          voltage. In other words the decision has to be recorded in the design, not left to whoever wires
          the panel.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 445.1.5"
        clause="445.1.5 Where the reclosure of a protective device is likely to cause danger, the reclosure shall not be automatic."
        meaning="This is the first bucket written as a rule. If a device coming back in by itself would put someone at risk, the design must not let it come back in by itself &mdash; a person has to do it. On site that is the difference between a start button somebody presses and a selector switch somebody left in the run position, and it is why a timed automatic restart is not a way round the problem."
        cite="BS 7671 Part 4, Chapter 44, Section 445 — Regulation 445.1.5"
      />

      <SectionRule />

      <ContentEyebrow>Inspection, and the practical framing</ContentEyebrow>

      <ConceptBlock
        title="It is an inspection item"
        onSite="Initial verification asks for it, so somebody will be looking for it."
      >
        <p>
          Inspection at initial verification includes checking the presence of undervoltage protective
          devices where relevant. Two words in there do a lot of work.
        </p>
        <p>
          <strong>Presence</strong> means you are confirming it is there and appropriate, not just that a
          box is fitted. <strong>Where relevant</strong> means you are expected to have formed a view on
          whether it is relevant to this installation, which brings you straight back to the three buckets
          above.
        </p>
        <p>
          On the verification side, the acceptance criterion for a motor is straightforward: a simulated
          fall or loss of voltage does not produce automatic restarting where such starting would be
          hazardous. You can demonstrate that by functional test, killing the control supply and watching
          what the machine does when it comes back, or by inspecting the control circuitry and showing
          there is no path for it to restart itself.
        </p>
        <p>
          Do the functional test where it is safe. A drawing can be out of date. A machine that stays dead
          when you restore the supply cannot lie to you.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="315e-1-8-check-3"
        question="During initial verification of a small industrial unit, what does the inspection require in respect of undervoltage?"
        options={[
          'Measuring the supply voltage at every socket-outlet and recording the result',
          'Proving the undervoltage relay setting with a calibrated injection test set',
          'Checking the presence of undervoltage protective devices where relevant',
          'Confirming that every motor on site restarts automatically after a dip',
        ]}
        correctIndex={2}
        explanation="The inspection item is the presence of undervoltage protective devices where relevant. You form a view on relevance from the loads present, then confirm the protection is there and suitable."
      />

      <ConceptBlock
        title="The honest practical framing"
        plainEnglish="On most domestic work this never comes up. On anything with machinery it is a real decision."
      >
        <p>
          Be honest with yourself about where this topic lives. Rewire a house and undervoltage protection
          will not feature in your design at all. The supply dips, the fridge and the boiler come back on,
          nobody is harmed. There is nothing on that job that is dangerous to restart.
        </p>
        <p>
          Walk onto a workshop, a farm, a factory, a food plant, a builders yard with a saw bench, a
          building with lifts or automatic doors, and the picture changes completely. Now you have rotating
          machinery, guards, jams that people clear by hand, and a genuine question about every drive on
          the site.
        </p>
        <p>
          That is the distinction to carry into your design work. Not &ldquo;is this a big job?&rdquo; but
          &ldquo;is there anything here that could hurt somebody if it started on its own?&rdquo; If the
          answer is yes, you owe that load a decision.
        </p>
      </ConceptBlock>

      <SectionRule />

      <RegsCallout
        source="BS 7671:2018+A4:2026"
        clause="Regulation 131.6 — Protection against voltage disturbances"
        meaning="Where necessary, appropriate measures shall be provided to protect installations and connected equipment against voltage disturbances, including transient overvoltages, undervoltages and harmonics, so as to avoid danger and unacceptable consequences for the safety and operation of the installation."
        cite="BS 7671 Part 1, Chapter 13"
      />

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Treating undervoltage protection as something you buy rather than something you design"
        whatHappens={
          <>
            An installer is asked whether a machine has undervoltage protection and goes looking for a
            device with the words printed on it. Finding none, they either declare the machine
            non-compliant or, more often, fit a maintained selector switch on the panel door because it is
            easier for the operator than a start button. Both responses miss the point. The protection was
            already there, inherent in the hold-in contact, and the selector switch has just removed it.
            The machine now restarts on its own after every dip, and the person clearing a jam has no idea
            that changed.
          </>
        }
        doInstead={
          <>
            Work out what the control circuit does on loss of supply, then decide whether that behaviour is
            acceptable for this load. Trace the coil. If the only paths to it are a momentary start button
            and the contactor&rsquo;s own auxiliary contact, the protection is inherent and you should not
            break it. If there is a maintained switch, a pressure switch, a float switch or a building
            management output that can call for the load on its own, then you need a deliberate measure such
            as an undervoltage relay or a supervisory interlock with manual reset. Prove it by simulating
            loss of supply where it is safe to do so.
          </>
        }
      />

      <CommonMistake
        title="Ticking the inspection item from the drawing instead of watching the machine"
        whatHappens={
          <>
            At initial verification the inspector reaches the item asking for the presence of undervoltage
            protective devices. The panel schedule shows a monitoring relay, the control drawing shows a
            momentary start with a hold-in contact, so the box gets ticked and the inspector moves on
            without ever killing the control supply. The drawing was right when it was drawn. Since then
            somebody has landed a building management output on the coil, or moved the hand position onto
            a maintained switch, or fitted a float switch that calls for the pump on its own. None of that
            reached the drawing. The installation is certified as having undervoltage protection it does
            not have, and the first person to find out is whoever is stood next to the machine when the
            supply returns.
          </>
        }
        doInstead={
          <>
            Where it is safe to do so, simulate the loss of voltage and watch what the machine actually
            does when the supply comes back. A machine that stays dead cannot lie to you; a drawing can.
            Where a functional test is not safe or not practicable, inspect the control circuitry itself
            and satisfy yourself there is no path that can re-energise the coil on its own — trace every
            way into that coil, not just the ones on the drawing. And treat &ldquo;where relevant&rdquo; as
            work you have to do rather than a get-out: form a view on which loads here would be dangerous
            to restart, and record how you arrived at it.
          </>
        }
      />

      <SectionRule />

      <Scenario
        title="Port Talbot — the wash plant that came back on its own"
        situation={
          <>
            You are second fix on a refurbishment at an aggregates yard outside Port Talbot. There is an
            existing wash plant with three conveyors and a screen, all fed from a panel that was rewired by
            somebody else two years ago. The site electrician mentions, almost in passing, that when the
            supply blipped in last winter&rsquo;s storms the whole plant came back on by itself and gave the
            fitter on the screen deck the fright of his life. The panel has three-position selector switches
            on the door marked off, hand and auto. In hand, the contactor coil is fed directly through the
            switch. There is no undervoltage relay and no reset. The client wants the refurbishment finished
            by Friday and the panel is not on your scope of works.
          </>
        }
        whatToDo={
          <>
            Stop and put it in writing before anything else. This is a dangerous condition you have found,
            not a design preference, and the fact that the panel is outside your scope does not make it
            somebody else&rsquo;s problem to discover later. Record it, report it to the client and to the
            principal contractor in writing the same day, and say plainly what the hazard is: the conveyors
            and screen will restart automatically after a loss of supply, with no warning to anyone working
            on them. Then propose the fix. The cleanest route is a control supply monitoring relay that
            drops the whole panel out on loss of voltage and requires a deliberate reset at the panel before
            anything can run, combined with changing the hand position so it calls a momentary start rather
            than maintaining the coil. Price it, programme it, and make clear that the plant should not be
            run in hand until it is done. If the client will not fund it this week, the plant needs a
            documented safe system of work in the interim, and that is a conversation for the client and
            their competent person, with your written finding on the table.
          </>
        }
        whyItMatters={
          <>
            The cost of the relay and a morning of labour is trivial. The cost of the alternative is a fitter
            on a screen deck when four motors start. There is a hard commercial edge too: you have now seen
            it, and if you say nothing you own part of it. BS 7671 asks the designer to prevent automatic
            restarting where it is liable to cause danger, and verification asks for the presence of
            undervoltage protective devices where relevant. On this plant it is relevant, it is absent, and
            saying so is part of the job.
          </>
        }
      />

      <SectionRule />

      <FAQ
        items={[
          {
            question: 'Is undervoltage protection required on every circuit?',
            answer:
              'No. The requirement is conditional. Measures are provided where necessary to avoid danger and unacceptable consequences, and the motor requirement applies where automatic restarting is liable to cause danger. On a domestic rewire you will not need it anywhere. On a site with machinery you need to make a decision for each drive.',
          },
          {
            question: 'Is a mechanically latched contactor allowed, given it holds in when the supply is lost?',
            answer:
              'Yes, and BS 7671 names it among the protective measures, but you have to be clear about what it is for. A latched contactor is used where the load should ride through a dip rather than drop out. You would not use one on a machine where an automatic return of power is the hazard, because the load never dropped out in the first place.',
          },
          {
            question: 'How do I prove undervoltage protection during verification?',
            answer:
              'Simulate a fall or loss of voltage and confirm the machine does not restart automatically where that would be hazardous, or inspect the control circuitry and demonstrate there is no restart path. Where it is safe, do the functional test. A live test beats a drawing that may be out of date.',
          },
          {
            question: 'What about loads that must not drop out at all, like emergency lighting?',
            answer:
              'Those are a separate design problem. Rather than allowing them to fall over and then controlling the restart, they are held up by other means so the dip never reaches them. The undervoltage question for those loads is not how to stop them restarting, it is how to stop them stopping.',
          },
        ]}
      />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Undervoltage covers sags, dips, brownouts and short interruptions, not just a full blackout.',
          'The hazard is the restart, not the loss. Design for what happens when the supply comes back.',
          'BS 7671 requires motor control circuits to prevent automatic restarting after a fall in or loss of voltage where such starting is liable to cause danger.',
          'Loss-of-voltage protection, undervoltage relays and mechanically latched contactors are the named means of achieving it.',
          'An ordinary start/stop circuit with a hold-in auxiliary contact is undervoltage protection, and a maintained selector switch quietly removes it.',
          'Low auxiliary supply voltage makes relay operation unreliable, so control logic cannot be trusted during a sag.',
          'Sort every load into dangerous to restart, inconvenient to lose, or must not drop out at all, and record the decision.',
          'Presence of undervoltage protective devices, where relevant, is an inspection item at initial verification, provable by functional test or by inspecting the control circuitry.',
        ]}
      />

      <SectionRule />

      <ContentEyebrow>Check yourself</ContentEyebrow>

      <Quiz questions={quizQuestions} title="Protection against undervoltage" />
    </div>
  );
}
