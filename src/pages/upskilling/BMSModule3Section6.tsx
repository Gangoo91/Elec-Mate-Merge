/**
 * BMS Module 3 · Section 6 — Plant safety interlocks and shutdowns
 *
 * Rebuilt 10 Oct 2026 on the learning primitives. The page teaches the split between the
 * safeties that protect people and plant (high-limit thermostats, fan and pump proving,
 * pressure limits, fire stops), which are hardwired so they act whatever the software is
 * doing, and the BMS's real job around them: monitoring, alarming, software sequencing and
 * an orderly restart. The old page ("Alarm responses and safety shutdowns") showed the BMS
 * shutting AHUs, opening smoke dampers and releasing door locks on fire, carried invented
 * CO2 ppm thresholds, alarm response times and test frequencies, and a colour-coded
 * labelling "standard". All of that is gone; fire actions now sit with the fire alarm
 * system and its own interfaces, with the BMS monitoring.
 */
import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PrevNext } from '@/components/study-centre/course-kit';
import {
  TLDR,
  ConceptBlock,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
  Pullquote,
  RegsCallout,
  VideoCard,
} from '@/components/study-centre/learning';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Plant safety interlocks and shutdowns | BMS Module 3.6 | Elec-Mate';
const DESCRIPTION =
  'Why high-limit stats, fan and pump proving, pressure limits and fire stops are hardwired, what the BMS does around them, and how plant restarts safely.';

const outcomes = [
  'Tell a hardwired safety interlock apart from a software interlock, and say which duties belong to each',
  'Explain how fan and pump proving works and why a safety interlock needs its own sensor, not the control sensor',
  'Wire a safety chain so that a broken wire or lost supply stops the plant rather than leaving it running',
  'Describe where a fire stop sits in a starter circuit so that no Hand or override path can run the plant, and why smoke control fans are the exception',
  'Set out what the BMS should do after a trip: alarm, record, wait for a reset, then restart in an orderly sequence',
  'Prove interlocks at commissioning, both that they act and that they cannot be bypassed by the software',
];

const quizQuestions = [
  {
    id: 1,
    question:
      'An electric duct heater battery must never be energised without airflow. Where should that interlock live?',
    options: [
      'In the BMS strategy, as a software check on the proven fan status point',
      'In the head end graphics, as an operator warning before switching on',
      'In the heater contactor coil circuit, via airflow and high-limit devices',
      'In the fan VSD parameters, as a minimum speed setting that keeps air moving',
    ],
    correctIndex: 2,
    explanation:
      'Overheating a heater battery with no air across it is a fire risk, so the protection must act whatever the software does. Wiring the airflow switch and high-limit cut-out in series with the heater contactor coil achieves that. A software check on fan status is a useful extra, but it fails with the controller, a bad strategy load or a forced point.',
  },
  {
    id: 2,
    question:
      'Why should a safety high-limit thermostat be a separate device from the sensor the BMS uses to control temperature?',
    options: [
      'Because one sensor fault would cause the overheat and blind the safety',
      'Because BMS sensors are not accurate enough to read high temperatures reliably',
      'Because the safety stat needs to report a value to the head end',
      'Because two sensors can be averaged to give a more stable control reading',
    ],
    correctIndex: 0,
    explanation:
      'The safety exists to catch a failure of normal control. If one sensor did both jobs, the fault that lets the temperature run away (a sensor reading low, for example) would stop the safety seeing the danger too. Accuracy is not the point, and a safety stat is usually a simple switch rather than a value.',
  },
  {
    id: 3,
    question:
      'A fan has a differential pressure switch for proving. Why is the switch contact normally wired closed-when-healthy into the safety chain?',
    options: [
      'Because closed contacts draw less current from the panel control supply',
      'Because the BMS can only read closed contacts as a digital input',
      'Because it makes the circuit easier to test with a continuity tester',
      'So that a broken wire stops the plant instead of hiding',
    ],
    correctIndex: 3,
    explanation:
      'A chain that must be made for the plant to run turns every open-circuit fault into a safe stop. If the safety relied on a contact closing to stop the plant, a broken wire would leave the plant running with no protection and nobody would know. Current draw and ease of testing have nothing to do with it.',
  },
  {
    id: 4,
    question:
      'An AHU’s fire stop is hardwired, but the BMS also has a fire alarm status input. What is that input mainly for?',
    options: [
      'Sending the fire signal on to the fire brigade',
      'Restarting the fan once the alarm is silenced',
      'Logging the cause and holding back fan fail alarms',
      'Letting Hand mode run the fan during the alarm',
    ],
    correctIndex: 2,
    explanation:
      'The input lets the BMS record that plant stopped because of fire, not failure, suppress the flood of fan failure alarms, and keep its own outputs off until the fire system is reset. It is not the life-safety path, it does not call the brigade, and nothing should run the fan while the fire signal is present.',
  },
  {
    id: 5,
    question:
      'A high-limit stat on a boiler circuit has tripped and been reset at the device. What should the BMS strategy do next?',
    options: [
      'Restart the plant at once to recover the space temperature',
      'Reset the high-limit stat again remotely, then restart',
      'Restart it through the normal start sequence and delays',
      'Disable the alarm so it stops reporting the same fault',
    ],
    correctIndex: 2,
    explanation:
      'Once the safety is healthy again, the BMS should bring the plant back through its normal ordered start, with pumps proven and delays observed. A cold slam restart risks repeat trips and large starting loads. The BMS should never be able to reset a hardwired safety remotely, and disabling the alarm throws away the record.',
  },
  {
    id: 6,
    question:
      'Why is a safety chain usually fed from the starter panel’s own control supply rather than from the BMS outstation?',
    options: [
      'Because outstations only supply 0–10 V signals',
      'So the safeties do not depend on the outstation',
      'So the BMS can reset the safeties remotely',
      'Because control supplies never need isolating',
    ],
    correctIndex: 1,
    explanation:
      'Fed from the panel’s own control supply, the chain works whatever the outstation is doing, and losing that supply also removes permission to run. The BMS output is then just one more contact in series. Outstations switch volt-free contacts, not only 0–10 V. Remote reset of safeties is exactly what must not be possible.',
  },
  {
    id: 7,
    question: 'Why are high-limit thermostats on heater batteries and boilers often manual reset?',
    options: [
      'So the BMS can reset them from the head end',
      'So a trip is looked at before plant runs again',
      'So they trip at a lower temperature than auto reset',
      'So they do not need wiring into the safety chain',
    ],
    correctIndex: 1,
    explanation:
      'A manual-reset high limit forces a person to look at the cause before the plant can run again, so an overheat cannot keep cycling unnoticed. It is reset at the device, not from the head end, and it still sits in the hardwired chain.',
  },
  {
    id: 8,
    question: 'What does a BMS fan status point normally come from on a well-designed AHU?',
    options: [
      'The BMS digital output that commanded the fan to start',
      'A separate proving device, such as a DP switch',
      'The fan motor’s nameplate data entered into the outstation at commissioning',
      'The head end graphic showing the animated fan symbol turning',
    ],
    correctIndex: 1,
    explanation:
      'Status should be proven by something that sees the fan doing work, not inferred from the command. A command only says what the BMS asked for. Comparing command against proven status is how the BMS spots a fan that has failed or been stopped by a safety.',
  },
  {
    id: 9,
    question:
      'Where plant must keep running if the head end or network fails, how are the outstations normally set up?',
    options: [
      'To stop all plant until the head end is back',
      'To work stand-alone, keeping local control',
      'To pass control to the fire alarm interface',
      'To put every starter into Hand automatically',
    ],
    correctIndex: 1,
    explanation:
      'Outstations are set up to work stand-alone, so a failure elsewhere in the BMS does not stop local control. Stopping everything turns a network fault into a plant outage. The fire alarm system is not a control path, and nothing should put a starter into Hand.',
  },
  {
    id: 10,
    question:
      'At commissioning, how should a software interlock that stops a chiller enable without chilled water flow be proved?',
    options: [
      'Both ways: enables with flow, stays off without it',
      'By reading the strategy and confirming the logic block is there',
      'By checking the chiller runs normally once flow is established',
      'By forcing the flow point healthy in software and watching the chiller enable',
    ],
    correctIndex: 0,
    explanation:
      'An interlock has to be shown to allow the action when conditions are met and to block it when they are not. Only testing the healthy case proves nothing about the protection. Reading the logic is not a test, and forcing the point healthy is exactly the kind of bypass the test is meant to rule out.',
  },
];

const BMSModule3Section6 = () => {
  useSEO(TITLE, DESCRIPTION);
  return (
    <HubPage>
      <HubMasthead
        section="Module 3 · Section 6"
        title="Plant safety interlocks and shutdowns"
        backTo="/study-centre/upskilling/bms-module-3"
      />
      <HubBody>
        <p className="max-w-3xl text-[15px] leading-relaxed text-white lg:text-[17px]">
          What protects people and plant is wired so it works whatever the software does. The BMS
          watches it, tells someone, and brings the plant back properly afterwards.
        </p>

        <TLDR
          points={[
            'Safeties that protect people and plant are hardwired into the starter or heater control circuit: high-limit stats, fan and pump proving, pressure limits, fire stops and emergency stops.',
            'The BMS monitors those safeties, raises alarms, runs software interlocks for good sequencing and handles the orderly restart. It is not the protection.',
            'A safety chain is closed when healthy, so a broken wire or lost supply stops the plant instead of hiding a fault.',
            'Fire signals take priority over every manual and automatic command, and the plant does what the fire strategy requires: most fans stop, smoke control fans run. The fire alarm system and its own interfaces do it; the BMS knows it happened.',
            'Every interlock is proved at commissioning both ways: it allows the action when it should and blocks it when it should.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <SectionRule />
        <ContentEyebrow>The dividing line</ContentEyebrow>

        <ConceptBlock
          title="Two kinds of interlock, and the question that sorts them"
          plainEnglish="Some interlocks keep plant running sensibly. Others stop something burning, bursting or hurting someone. The first kind can live in software. The second kind must not depend on it."
          onSite="For any interlock on a drawing, ask one question: if the outstation died right now, or someone forced the point, would anyone get hurt or would plant be damaged? If yes, it belongs in the wiring."
        >
          <p>
            An interlock stops one thing happening unless something else is true. You already know
            the simplest one: a reversing starter where each contactor has a normally closed
            auxiliary contact in the other&rsquo;s coil circuit, so forward and reverse can never
            pull in together. Building services plant is full of the same idea.
          </p>
          <p>
            A <strong>software interlock</strong> is written into the BMS strategy. Do not enable
            the boiler until the primary pump is proven. Do not start the supply fan until the inlet
            damper end switch says it is open. Do not run the chiller without chilled water flow.
            These keep plant running in the right order. They are acceptable in software only
            because something else still stands between the fault and harm: the boiler&rsquo;s own
            flow and limit protection, the chiller&rsquo;s own flow switch wired into its safety
            terminals. Check that device is fitted and wired. If nothing else protects the plant,
            the interlock belongs in the wiring. On many AHUs the damper end switch is wired into
            the fan starter for the same reason.
          </p>
          <p>
            A <strong>hardwired safety interlock</strong> is a physical contact in the control
            circuit of the thing it protects. It breaks the contactor coil, the heater supply or the
            burner enable directly. No program, network message or operator action at the head end
            can make it close. Guidance for commissioning BMS work has said for decades that
            life-safety interlocks should be hardwired and not depend on software, and that is still
            the line to hold.
          </p>
          <p>
            The reason is simple. Software fails in ways that are hard to see: a controller reboots,
            a strategy is reloaded from an old backup, a point is left forced after testing, a value
            is mistyped. A contact in series with a coil has one job and fails in ways you can
            design for.
          </p>
          <p>
            <strong>What normally sits on each side of the line.</strong> Protection devices go in
            the wiring; sequencing, optimising and reporting go in the BMS. When you open a starter
            panel, trace the coil circuit of each contactor: every contact in series with that coil
            that is not the BMS output is a safety or a selector.
          </p>
          <p>Typically hardwired, in the control circuit of the plant they protect:</p>
          <ul>
            <li>
              <strong>High-limit thermostats</strong> on heater batteries, boilers and hot water
              plant, often manual reset so a trip has to be looked at before plant runs again.
            </li>
            <li>
              <strong>Airflow proving</strong> for electric heater batteries, so the heater cannot
              be energised without air moving across it.
            </li>
            <li>
              <strong>Pressure limits</strong>, such as low water pressure cut-outs on sealed
              heating systems and the refrigerant pressure safeties inside a chiller.
            </li>
            <li>
              <strong>Frost thermostats</strong> on AHU coils, where the design uses them to stop
              the fan and protect the coil (Section 3.5 covers frost strategy).
            </li>
            <li>
              <strong>Fire stops</strong> from the fire alarm system&rsquo;s interface, and{' '}
              <strong>emergency stop</strong> buttons.
            </li>
            <li>
              <strong>Motor protection</strong>: overloads and thermistor relays in the starter.
            </li>
          </ul>
          <p>Typically in the BMS strategy:</p>
          <ul>
            <li>Start and enable sequences, and duty and standby changeover on a failure.</li>
            <li>Proving checks that compare what was commanded with what actually happened.</li>
            <li>
              Minimum run and off times, and limits on starts per hour, to protect plant life.
            </li>
            <li>Alarms on every safety trip, and the ordered restart afterwards.</li>
          </ul>
          <p>
            Packaged plant adds one more layer. A boiler or chiller arrives with the
            manufacturer&rsquo;s own controls, which look after its safety and firing or its
            refrigeration circuit. The BMS normally sends it an on/off enable, reads its fault and
            alarm signals and monitors temperatures and hours run. It does not reach inside and
            replace those safeties, and you should never wire it to.
          </p>
        </ConceptBlock>

        <Pullquote>
          If a safety stops working when a laptop is plugged in, a point is forced or an outstation
          reboots, it was never a safety.
        </Pullquote>

        <InlineCheck
          id="bms-3-6-sorting"
          question="Which of these interlocks is reasonable to leave to the BMS strategy alone?"
          options={[
            'Heater battery off when airflow is lost',
            'Standby pump started on duty failure',
            'Supply fan off on a fire signal',
            'Boiler off when the high-limit stat opens',
          ]}
          correctIndex={1}
          explanation="Duty and standby changeover is operational: if it fails, you lose heating or cooling and get an alarm, but nothing burns or bursts. Heater airflow, fire stops and boiler high limits protect people and plant directly, so they are wired into the control circuit and act regardless of the BMS."
        />

        <SectionRule />
        <ContentEyebrow>Proving</ContentEyebrow>

        <ConceptBlock
          title="Fan and pump proving: knowing it is really running"
          plainEnglish="Telling a fan to start is not the same as the fan moving air. Proving is the evidence that it actually is."
          onSite="A fan with a snapped belt draws little current but the motor still turns. A current relay may call that running; a differential pressure switch across the fan will not. Know which device you are relying on and what it can and cannot see."
        >
          <p>
            Every fan and pump the BMS commands should have its status proven by something
            independent of the command. The usual devices are:
          </p>
          <ul>
            <li>
              <strong>Differential pressure switch</strong> across a fan or across a pump. It closes
              when the fan or pump is producing pressure, which means it is actually doing work.
            </li>
            <li>
              <strong>Flow switch</strong> in a pipe or duct. Thermal-type flow switches need to be
              sited where the flow is reasonably fast, so check the manufacturer&rsquo;s
              instructions for position.
            </li>
            <li>
              <strong>Current sensing relay</strong> on a motor lead, which proves the motor is
              drawing current but not that anything is moving.
            </li>
            <li>
              <strong>Auxiliary contact</strong> on the contactor, which proves only that the
              contactor pulled in. It is a weak proof of running.
            </li>
          </ul>
          <p>
            The BMS uses proving in two ways. As a <strong>status</strong>: after a start command it
            waits a set proving time, then compares command with status. A mismatch raises a fan or
            pump failure alarm and, where there is a standby, brings it in. As an{' '}
            <strong>interlock</strong>: plant downstream, such as a boiler or a heater battery step,
            is not enabled until proving is made.
          </p>
          <p>
            Where losing airflow or water flow could cause damage or a fire, the same kind of
            proving device is also wired directly into the protected plant&rsquo;s control circuit.
            An electric heater battery is the classic case: its contactor coil is fed through the
            airflow switch and a high-limit cut-out, so it drops out the moment either opens,
            whatever the outstation is doing.
          </p>
          <p>
            Most heater battery makers also need the fan to run on for a period after the heater
            switches off, to carry away the heat left in the elements. That overrun belongs in the
            starter or heater controls, so a BMS stop command does not cut the fan and heater
            together.
          </p>
        </ConceptBlock>

        <VideoCard
          {...videos.bmsTimeDelayRelays}
          topic="Watch · How time delays shape starts, proving and restarts"
          caption="Look at on-delay and off-delay behaviour. The same ideas give a fan time to build pressure before proving is checked, and space out plant starts after a trip or mains failure."
        />

        <ConceptBlock
          title="The safety sensor is not the control sensor"
          plainEnglish="The thermostat that switches off when things get dangerous must be a different device from the sensor that normally controls the temperature."
          onSite="If you are asked to save a device by reading the high-limit value from the BMS supply air sensor, the answer is no. The two jobs need two devices."
        >
          <p>
            A high-limit stat exists to catch the case where normal control has failed. If the BMS
            supply sensor drifts low, the strategy keeps opening the valve or switching heater steps
            on, and the air gets hotter. If that same sensor were also feeding the safety, the
            safety would be blind to exactly the failure it is there for.
          </p>
          <p>
            Process industries treat this as a firm rule: safety shutdowns use their own sensors and
            their own logic, kept apart from the regulating control system, so one fault cannot take
            out both. The domestic water heater shows the same thing in miniature. Its control
            thermostat holds temperature; a separate overheat cut-out should only ever act if that
            control fails.
          </p>
          <p>
            For you on site, this means the high-limit stat, the frost stat and the proving switch
            are separate devices with their own wiring into the control circuit. The BMS may also
            have an input from each so it can alarm, but that input is a copy of the state, not the
            protection itself.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-3-6-proving"
          question="A BMS shows a supply fan as running, but the space is stuffy and the fan is silent. Status comes from an auxiliary contact on the contactor. What is the most likely gap?"
          options={[
            'The head end graphic has not refreshed since the fan last ran',
            'It proves the contactor, not the airflow',
            'The fan overload has tripped and then reset itself automatically',
            'The fire alarm interface relay has stopped the fan',
          ]}
          correctIndex={1}
          explanation="An auxiliary contact proves the contactor closed, nothing more. A failed motor, snapped belt or downstream fault leaves the BMS believing the fan runs. A differential pressure switch across the fan would have shown the truth and raised a fan failure alarm."
        />

        <SectionRule />
        <ContentEyebrow>Wiring it so it fails safe</ContentEyebrow>

        <ConceptBlock
          title="Closed when healthy: why a safety chain runs in series"
          plainEnglish="Wire safeties so the plant only runs while every one of them is making. Then any break, whether a trip, a loose wire or a dead supply, stops the plant."
          onSite="Walk the chain with the drawing: control supply, through each safety in series, through the Hand/Off/Auto switch and BMS enable, to the coil. If a safety is wired to close on a fault and switch something else off, ask why."
        >
          <p>
            Think about a stop button. If it were wired as a normally open contact that told a
            controller to stop the motor, a wire falling off its terminal would look exactly like
            nobody pressing it. The motor would keep running and could not be stopped. The fix,
            standard in motor control, is to use the normally closed contact so that pressing the
            button and losing the wire do the same thing: stop.
          </p>
          <p>
            Safety interlocks follow the same rule. Each device has its contact closed when
            conditions are healthy, and the contacts are wired in series in the coil circuit of the
            contactor, the heater or the burner enable. Any one opening, for any reason, drops the
            plant out. A broken wire, a failed device that goes open and a blown control fuse all
            fail towards stopped.
          </p>
          <p>
            This is why you will often see the safety chain fed from the starter panel&rsquo;s own
            control supply rather than from the BMS outstation. The BMS output is then one more
            contact in series, the permission to run, and it is the last in line rather than the
            thing everything depends on.
          </p>
          <p>
            Each safety usually also has a volt-free contact or a separate status point back to the
            BMS. That lets the head end say <em>which</em> safety tripped instead of just &ldquo;fan
            failed&rdquo;. Wiring those monitoring points is part of the job, and labelling them
            clearly saves the next engineer a lot of guessing.
          </p>
        </ConceptBlock>

        <RegsCallout
          source="BS 7671:2018+A4:2026 Section 557"
          clause="Section 557 covers auxiliary circuits, including control, signalling and measurement circuits. The supply for an auxiliary circuit may be dependent on, or independent of, the main circuit, according to the function the auxiliary circuit has to perform."
          meaning={
            <>
              <p>
                A safety chain and its monitoring points are auxiliary circuits. Which supply they
                take is a design decision about function, not convenience.
              </p>
              <p>
                For a safety chain the usual choice is a control supply derived within the starter
                panel, so that losing it also removes the plant&rsquo;s permission to run. A BMS
                monitoring input may need to keep reporting when the plant is off, which can point
                to a different supply. Check that someone chose deliberately, and that the drawings
                show it.
              </p>
            </>
          }
          cite="Section 557 position as verified against BS 7671:2018+A4:2026."
        />

        <CommonMistake
          title="Linking out a safety that keeps tripping"
          whatHappens="An AHU heater high-limit or a fan airflow switch trips several times a week. Someone fits a wire link across it to keep the building warm until the controls engineer can attend. The fault behind the trips (a slipping belt, a dirty filter, a sticking valve) carries on, and now nothing stops the heater when airflow drops. This kind of shortcut, taken by people in a hurry, is a recognised cause of serious incidents on fired and heated plant."
          doInstead="Treat a repeating trip as the safety doing its job and reporting a real fault. Make the plant safe, record what you found, check airflow, filters, belts and valve operation, and report it to whoever owns the plant. If a temporary bypass is ever genuinely needed it is a decision for the responsible person under a written permit, with the plant attended, never a quiet link in a panel."
        />

        <SectionRule />
        <ContentEyebrow>Fire and emergency stops</ContentEyebrow>

        <ConceptBlock
          title="Fire priority: nothing may run what the fire strategy has stopped"
          plainEnglish="When the fire alarm says stop a fan, that fan stops, and no switch, button or BMS command can start it again until the fire signal clears."
          onSite="During a fire alarm cause-and-effect test, put a few AHUs in Hand first. If any keeps running on a fire signal, the fire stop is wired in the wrong place and that is a finding, not a curiosity."
        >
          <p>
            In UK practice, the actions that protect people in a fire (stopping or starting fans,
            closing dampers, releasing doors, running smoke control) are carried out by the fire
            detection and alarm system and its own interface equipment. The BMS is not the
            life-safety path. It typically <strong>monitors</strong> the fire alarm status and may
            do non-life-safety follow-up, such as logging the event, holding its own commands off
            and preparing an orderly restart.
          </p>
          <p>
            For the electrician, the critical detail is where the fire stop contact goes. It must
            sit in the starter control circuit upstream of the Hand/Off/Auto selector and the BMS
            enable, so that it breaks the coil supply whatever position the selector is in. A fire
            signal must take priority over every manual and automatic command. If the fire contact
            only breaks the BMS output, or only the Auto leg of the selector, someone switching to
            Hand during an incident can run a fan the fire strategy has stopped.
          </p>
          <p>
            Two cases need more thought. On a variable speed drive, the drive&rsquo;s own keypad
            usually has a local or hand mode that ignores its run terminal, so a fire stop wired
            only to the run input can be bypassed at the keypad. Wire the fire stop to the
            drive&rsquo;s hardwired enable or safe torque off input, or to a contactor, as the drive
            maker and the fire strategy require, and test it with the keypad in local. And some fans
            must run in a fire, not stop: smoke extract and stair pressurisation fans. Their
            fire-mode wiring is a separate design, often arranged so that nothing short of the fire
            system can stop them. Never apply the stop pattern on this page to a smoke control fan;
            wire exactly what the fire strategy&rsquo;s cause and effect says.
          </p>
          <p>
            Emergency stop buttons in plant rooms follow the same logic: wired into the control
            circuit, closed when healthy, and not dependent on any controller to act.
          </p>
          <p>
            What the BMS does is still useful. A separate fire alarm status input lets it record
            that plant stopped because of fire rather than failure, suppress the flood of fan
            failure alarms that would otherwise follow, and keep its own outputs off until the fire
            system is reset and the site is ready to restart.
          </p>
        </ConceptBlock>

        <Scenario
          title="An AHU that would not stop for a fire test"
          situation="On a fire alarm cause-and-effect test in an office block, every AHU stops when the zone is triggered except one, which the maintenance contractor had left in Hand after a belt change. The site manager asks whether the BMS has a fault, because the BMS graphic shows the fire input received."
          whatToDo="Isolate and look at the starter control circuit for that AHU against the drawing. In this case the fire alarm interface contact had been wired in series with the BMS enable output, after the selector's Auto contact, so Hand bypassed it completely. Move the fire stop so it breaks the common control supply ahead of the selector, mark up the drawing, and re-test with the AHU in Hand, Off and Auto. Repeat the check on every other AHU in Hand, not just the one that failed, and record it for the fire alarm engineer and the controls contractor."
          whyItMatters="The BMS was working perfectly: it saw the fire signal and dropped its own command. The fault was that the life-safety stop depended on a path that a manual switch could go round. Only testing with the selector in each position finds this."
        />

        <InlineCheck
          id="bms-3-6-fire"
          question="Before a fire alarm cause-and-effect test, why would you switch a few AHUs into Hand?"
          options={[
            'To prove that no Hand path can get round the fire stop wiring',
            'To stop the BMS restarting the fans before the test is complete',
            'To let the fire engineer time each fan’s run-down after the stop',
            'To keep air moving so test smoke clears from the zone quickly',
          ]}
          correctIndex={0}
          explanation="The fire stop must break the starter circuit upstream of the Hand/Off/Auto selector. If a fan in Hand keeps running on the fire signal, the stop is wired where Hand bypasses it, and that is a finding. Holding off a BMS restart is the job of the BMS fire status input, not Hand. Run-down timing and smoke clearance are not the purpose of the test."
        />

        <SectionRule />
        <ContentEyebrow>After the trip</ContentEyebrow>

        <ConceptBlock
          title="What the BMS does when a safety acts"
          plainEnglish="The safety stops the plant. The BMS notices, says which safety tripped, stops fighting it, and waits for it to be healthy before bringing the plant back the right way."
          onSite="When you are called to a tripped plant, read the BMS alarm log first. It usually tells you which device opened and when, which saves you hunting along the chain with a meter."
        >
          <p>A good strategy handles a safety trip in clear steps:</p>
          <ul>
            <li>
              <strong>Detect.</strong> Command and proven status disagree, or a safety&rsquo;s own
              monitoring point changes state.
            </li>
            <li>
              <strong>Alarm.</strong> Raise an alarm that names the device and the plant, with a
              priority that matches the risk. Section 6.1 (Alarms) covers alarm handling in detail.
            </li>
            <li>
              <strong>Stand down.</strong> Drop its own enable and hold dependent plant off, so the
              strategy is not trying to restart into a fault or bringing in a standby that will trip
              on the same cause, such as a lost water pressure.
            </li>
            <li>
              <strong>Wait.</strong> Hold off until the safety is healthy again. Manual-reset
              devices need a person to look at the cause and reset them at the device. The BMS
              should not be able to reset a hardwired safety remotely.
            </li>
            <li>
              <strong>Restart in order.</strong> Bring the plant back through its normal start
              sequence: pumps and fans first, proven, then the plant that depends on them.
            </li>
          </ul>
          <p>
            Strategies often add a trip counter that holds the plant off after repeated trips in a
            short period, so a plant that keeps tripping stays off with an alarm rather than
            cycling. That is a sensible software feature, and the hardwired safety still does the
            protecting.
          </p>
          <p>
            <strong>After a mains failure</strong> the building should wake up in a planned order,
            not all at once. Ask to see what the description of operation says about power failure
            and BMS failure; if it says nothing, raise it before handover rather than after the
            first outage.
          </p>
          <p>
            A well-written specification sets out what the plant does on start-up, on daily and
            seasonal shutdown, on communications failure, on BMS failure and on total power failure.
            The restart after a mains failure is where those decisions matter most to you.
          </p>
          <p>
            Starting routines are usually delayed and staggered so that large motors and heater
            loads do not all start together, and so each stage can prove before the next is enabled.
            Programmed minimum on and off times and a limit on starts per hour stop a plant
            short-cycling while things settle. Where plant must keep running without the head end,
            outstations are set up to work stand-alone, so a failure elsewhere in the BMS does not
            stop local control.
          </p>
          <p>
            Remember where the protection lives during all of this. While the BMS is rebooting and
            reloading, hardwired safeties are already active. That is the whole point of putting
            them in the wiring.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Letting the BMS reset or restart straight into a fault"
          whatHappens="A strategy is set to re-send the start command every time status drops, with no wait and no count. A pump trips on its overload, the BMS hammers the start, and the motor is cycled repeatedly until something fails. Elsewhere a boiler is re-enabled the instant a pressure cut-out remakes, before anyone has looked at why the pressure fell."
          doInstead="Expect the strategy to alarm, stand down, wait for the safety to be healthy, and restart through the normal sequence with proving and delays. Look for a trip counter that holds plant off after repeated trips. If you find a strategy that fights its safeties, report it to the controls engineer; do not wire round it."
        />

        <InlineCheck
          id="bms-3-6-restart"
          question="Power returns after a mains failure. What should a well-designed BMS do with the AHUs, pumps and boilers?"
          options={[
            'Start everything together so the building recovers fastest',
            'Leave everything off until each safety is reset by hand',
            'Start in a planned order, proving each stage first',
            'Wait for the fire alarm system to permit the restart',
          ]}
          correctIndex={2}
          explanation="A staggered, ordered restart keeps starting loads down and makes sure pumps and fans are proven before the plant that depends on them is enabled. Healthy hardwired safeties do not all need resetting after a mains failure, and the fire alarm system only holds plant off while a fire signal is present."
        />

        <SectionRule />
        <ContentEyebrow>Your part on site</ContentEyebrow>

        <ConceptBlock
          title="Reading, wiring and changing a safety chain"
          plainEnglish="Most safety interlocks are installed, altered and fault-found by electricians. The wiring is yours, so knowing what each contact is for is yours too."
          onSite="Before you change anything in a starter panel, mark up which contacts in each coil circuit are safeties. If you cannot tell from the drawing, find out before you lift a wire."
        >
          <p>
            On a BMS job the controls engineer writes the strategy, but the electrician usually
            wires the starter panels, the field devices and the links between them. That puts you in
            charge of the part of the safety system that has to work when the software does not. A
            few habits make the difference:
          </p>
          <ul>
            <li>
              <strong>Know the chain.</strong> For each contactor, list every contact in its coil
              circuit and what it is: overload, high limit, airflow, pressure, frost, fire stop,
              emergency stop, selector, BMS enable.
            </li>
            <li>
              <strong>Keep safeties independent of the BMS.</strong> No safety should depend on the
              outstation being powered, healthy or correctly programmed. If you find one that does,
              report it.
            </li>
            <li>
              <strong>Separate status from protection.</strong> Where the BMS needs to know a safety
              has tripped, use a spare volt-free contact or a separate status input. Do not route
              the safety itself through a BMS input and output.
            </li>
            <li>
              <strong>Label and document.</strong> Safety devices and their terminals should be
              identified clearly in the panel and on the drawings, so the next person does not
              mistake a high-limit for a spare.
            </li>
            <li>
              <strong>Re-test after any change.</strong> Replacing a device, rewiring a starter or a
              controls upgrade all mean proving the affected interlocks again.
            </li>
          </ul>
          <p>
            Safe isolation needs the same thought. A starter panel with BMS wiring can carry a
            separate control supply, interposing relays fed from the outstation and fire alarm
            interface circuits from another panel altogether. Section 1.6 (The electrician&rsquo;s
            role and working safely) covers isolating control panels; here, the point is that
            opening the main isolator may not kill every circuit in the safety chain.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Proving it works</ContentEyebrow>

        <ConceptBlock
          title="Testing interlocks at commissioning and after changes"
          plainEnglish="An interlock is only proven when you have made it act for real, and shown the plant cannot run when it should not."
          onSite="Test the safety at the device. Open the stat, close the damper, drop the pressure, press the button. Simulating it by forcing a BMS point proves the software, not the wiring."
        >
          <p>
            BMS commissioning guidance draws the same split this page does. Every electro-mechanical
            interlock and fail-safe device is to be proved against the specification, and those
            devices should be working before the BMS itself is commissioned against them. Software
            interlocks are then checked separately.
          </p>
          <p>For hardwired safeties:</p>
          <ul>
            <li>
              Operate each device for real and confirm the plant stops in every selector position,
              including Hand.
            </li>
            <li>
              Confirm the BMS sees the trip and raises the right alarm, naming the right device.
            </li>
            <li>
              Remove a wire from one safety in the chain (safely, with the plant isolated as
              appropriate) and confirm the plant will not run. That proves the chain fails safe.
            </li>
            <li>Reset and confirm the restart follows the designed sequence.</li>
          </ul>
          <p>
            For software interlocks, test both ways. Positively: the action happens when the
            required conditions are in place. Negatively: the interlocked action cannot happen on
            its own when they are not. A pump-proving interlock that has only been seen to let the
            boiler fire has not been tested.
          </p>
          <p>
            Fire interfaces are tested with the fire alarm engineer, against the cause and effect
            for the building. Record every interlock test and hand the records over with the rest of
            the commissioning documents. Repeat the relevant tests after any change to the panel,
            the strategy or the plant.
          </p>
        </ConceptBlock>

        <FAQ
          items={[
            {
              question:
                'If the BMS can stop a fan anyway, why does the fire stop need wiring separately?',
              answer:
                'Because the BMS can also fail, be overridden, be in the middle of a reload or simply be bypassed by someone switching to Hand. The fire alarm system and its interfaces carry out the life-safety actions so they do not depend on any of that. The BMS can still receive a fire status signal for logging and to hold its own outputs off.',
            },
            {
              question:
                'Can I take the high-limit signal from the BMS temperature sensor to save a device?',
              answer:
                'No. The high-limit exists to catch a failure of normal control, and one common failure is the control sensor itself. If both jobs share one sensor, that fault disables the protection at the moment it is needed. Fit a separate high-limit device wired into the control circuit, and give the BMS a status input from it if you want the alarm.',
            },
            {
              question: 'Should the BMS be able to reset a tripped safety remotely?',
              answer:
                'Not a hardwired safety. A manual-reset high-limit or pressure cut-out is there so that a person looks at the cause before the plant runs again. The BMS can show that it tripped, hold its own commands off and restart the plant in order once the safety has been reset at the device.',
            },
            {
              question: 'Is a current relay good enough for fan proving?',
              answer:
                'It proves the motor is drawing current, which catches a tripped overload or a dead motor. It can miss a broken belt or a fan running against a closed damper. Where losing airflow matters, such as in front of an electric heater battery, a differential pressure or airflow switch that sees the air itself is the better proof.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'Anything that protects people or plant is hardwired into the control circuit of the plant it protects, so it acts whatever the software is doing.',
            'The BMS monitors safeties, raises alarms that name the device, runs software interlocks for sequencing, and brings plant back in an orderly restart.',
            'Prove status with a device that sees the work being done, and keep safety sensors separate from control sensors.',
            'Wire safeties closed when healthy and in series, so a broken wire, failed device or lost supply stops the plant.',
            'A fire stop sits ahead of the Hand/Off/Auto selector, and on a drive it goes to the hardwired enable, not just the run terminal. Fire takes priority over every manual and automatic command, and the fire alarm system, not the BMS, carries out the fire actions. Smoke control fans run on fire; never wire the stop pattern to them.',
            'A safety that keeps tripping is reporting a fault. Find the fault; never link the safety out.',
            'Test every interlock for real and both ways, in every selector position, and record it.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself" />

        <PrevNext
          noun="section"
          prevHref="/study-centre/upskilling/bms-module-3-section-5"
          prevLabel="Overrides, frost protection and seasonal change"
          nextHref="/study-centre/upskilling/bms-module-4"
          nextLabel="Module 4: Lighting, access, blinds and metering"
        />
      </HubBody>
    </HubPage>
  );
};

export default BMSModule3Section6;
