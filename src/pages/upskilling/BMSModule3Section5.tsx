/**
 * BMS Module 3 · Section 5 — Overrides, frost protection and seasonal change
 *
 * Rebuilt 10 Oct 2026 on the learning primitives. The page teaches the layers of command a
 * plant item answers to (fire and hardwired safeties, the Hand/Off/Auto switch, head end
 * overrides, occupant overrides, the schedule), why an override left in place is one of the
 * commonest causes of wasted energy and complaints, how frost and building protection routines
 * work in two stages, and how a building is moved between heating and cooling seasons without
 * the two fighting. The old page carried invented figures (a "15–30% saving", an "£85,000 a
 * year" override loss, fixed override time limits, seasonal setpoint tables, an outdoor sensor
 * mounting height) and used the US term for lock-off; all of that is gone. Frost setpoints are left to
 * the design and the controls specification because no source gives a figure.
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
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Overrides, frost protection and seasonal change | BMS Module 3.5 | Elec-Mate';
const DESCRIPTION =
  'How BMS overrides, Hand/Off/Auto switches, frost and building protection routines and summer/winter changeover work, and how to stop them wasting energy.';

const outcomes = [
  'Rank the layers of command a plant item answers to, from the fire signal down to the time schedule',
  'Explain what the Hand position on a starter does and does not bypass, and why it must be left in Auto',
  'Use head end overrides safely: timed, recorded, released, and never on a safety function',
  'Describe the two stages of a frost protection routine and the job of building protection',
  'Explain why heating and cooling must be interlocked, and how seasonal change goes wrong',
  'Find overrides that have been left in place and put a building back under automatic control',
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A supply fan has been stopped by the fire alarm interface. A technician puts the starter in Hand. What should happen?',
    options: [
      'The fan runs, because Hand bypasses every automatic command',
      'The fan runs at low speed until the fire alarm is reset',
      'It stays stopped, as the fire stop sits upstream of Hand',
      'The BMS decides, based on the fire alarm status point',
    ],
    correctIndex: 2,
    explanation:
      'A fire signal must take priority over every manual and automatic command, so the fire stop is wired where neither the Hand/Off/Auto switch nor the BMS can get round it. If Hand can run a fan the fire strategy has stopped, the panel wiring is wrong. The BMS only monitors fire status; it is not the path that stops the fan.',
  },
  {
    id: 2,
    question:
      'You are asked to leave a heating pump forced on from the head end while a valve is replaced next week. What is the best way to do it?',
    options: [
      'Apply a timed override with a reason, and check it is released',
      'Put the starter in Hand so the BMS cannot interfere with the pump at all',
      'Raise the heating setpoint so that the pump is called for continuously',
      'Disable the pump in the strategy and ask the site to remember to undo it',
    ],
    correctIndex: 0,
    explanation:
      'A timed override with a recorded reason expires on its own and leaves a trail for whoever comes next. Hand takes the pump away from the BMS entirely, including its monitoring logic, and is easily forgotten. Fiddling a setpoint or editing the strategy hides what was done.',
  },
  {
    id: 3,
    question:
      'An office is too warm in May and the gas bill is up. Trends show boilers and chillers both running all day. Which is the most likely first thing to check?',
    options: [
      'Whether the outside air sensor has been fitted upside down',
      'Whether the chillers need a full refrigerant recharge now',
      'Whether the BMS needs a newer software version loaded on it',
      'Whether heating is forced on, or the setpoints overlap',
    ],
    correctIndex: 3,
    explanation:
      'Heating and cooling running together in the same space usually comes from an override left in place, overlapping setpoints, or two systems that were never interlocked. Those are quick to check on the head end. Refrigerant and software are a long way down the list.',
  },
  {
    id: 4,
    question: 'In a two-stage frost routine on a heating system, what brings in stage two?',
    options: [
      'The outside air falling to the frost setpoint',
      'The system water falling below its minimum',
      'The building being unoccupied for over a day',
      'An operator acknowledging the stage one alarm',
    ],
    correctIndex: 1,
    explanation:
      'Stage one starts the circulating pumps when the outside air reaches the frost setpoint. Stage two is triggered by the system water itself falling below its minimum. It then enables the heat source and holds a minimum return temperature. It does not wait for an operator.',
  },
  {
    id: 5,
    question: 'Where do the frost protection setpoints for a particular building come from?',
    options: [
      'A fixed figure that every BMS manufacturer uses as standard',
      'The design and controls specification for the building',
      'Whatever the commissioning engineer thinks is about right',
      'BS 7671, in its section on auxiliary circuits for control',
    ],
    correctIndex: 1,
    explanation:
      'Frost and building protection limits are design decisions recorded in the controls specification and description of operation. They depend on the plant, the building and its use. BS 7671 does not set them, and a commissioning engineer should set what is specified, not guess.',
  },
  {
    id: 6,
    question:
      'A frost thermostat on an AHU keeps tripping on cold mornings. The facilities manager asks you to link it out. What is the right response?',
    options: [
      'Link it out, but leave a note in the panel saying what was done',
      'Turn its setting down until it stops tripping on cold mornings',
      'Move it to a warmer spot downstream, where it will not trip as often',
      'Refuse to defeat it, and find out why the coil gets so cold',
    ],
    correctIndex: 3,
    explanation:
      'The frost thermostat is protecting a coil that can split if it freezes. Nuisance trips are a symptom: a stuck valve, a failed pump, a damper opening before the heating is proved, or a sequence fault. Fix the cause. Moving it or changing its setting defeats it just as surely as a link does.',
  },
  {
    id: 7,
    question:
      'What is the purpose of a building protection routine that runs when the normal heating is off?',
    options: [
      'To protect the fabric and contents from cold and condensation',
      'To keep the occupied space at its full comfort setpoint overnight',
      'To pre-heat the building so that it is warm when staff arrive',
      'To run the plant regularly so the hours-run counters stay even',
    ],
    correctIndex: 0,
    explanation:
      'Building protection works on room temperature and brings the heating on only when the space falls below a protection limit, to stop damage from cold and condensation. It is not comfort heating and it is not optimum start, which is about being ready for occupancy.',
  },
  {
    id: 8,
    question:
      'During commissioning, a starter has a working Hand/Off/Auto switch. What should be done with it before you move on?',
    options: [
      'Leave it in Hand so the plant runs while the BMS is finished',
      'Leave it in Off so that nothing starts up unexpectedly overnight',
      'Prove Hand and Off, then return it to Auto and check the BMS',
      'Remove the switch handle so that nobody else can change it',
    ],
    correctIndex: 2,
    explanation:
      'Hand and Off are proved, then the switch goes back to Auto, and the auto-status point is checked on the head end so the BMS knows the plant is available. A switch left in Hand or Off is a manual override that nobody is tracking.',
  },
  {
    id: 9,
    question:
      'A customer says the BMS "stopped working" after a fault-find last autumn. Plant runs all night and ignores the schedule. What is your first check?',
    options: [
      'Replace the outstation, because the schedule is clearly corrupt',
      'Reload the strategy from the last backup without looking further',
      'Check the time and date on the outstation and nothing else at all',
      'Look for points still overridden or in Hand since that visit',
    ],
    correctIndex: 3,
    explanation:
      'Plant ignoring its schedule after a visit points straight at an override, a forced output or a Hand/Off/Auto switch that was never put back. Most head ends can list overridden points. Replacing or reloading things before that check throws away the evidence and may not fix it.',
  },
  {
    id: 10,
    question:
      'Why do seasonal functions often need a return visit after a building is handed over?',
    options: [
      'Because the BMS software must be reloaded every spring and autumn',
      'Because heating or cooling cannot be fully proved out of season',
      'Because the outdoor sensor needs recalibrating at each changeover',
      'Because occupants are only trained on overrides in the first winter',
    ],
    correctIndex: 1,
    explanation:
      'You cannot prove a cooling sequence under real load in January, or frost protection in July. The items that could not be fully commissioned should be listed at handover and revisited when the season allows. Simulating an outdoor temperature proves the logic, not the plant under load.',
  },
];

const BMSModule3Section5 = () => {
  useSEO(TITLE, DESCRIPTION);
  return (
    <HubPage>
      <HubMasthead
        section="Module 3 · Section 5"
        title="Overrides, frost protection and seasonal change"
        backTo="/study-centre/upskilling/bms-module-3"
      />
      <HubBody>
        <p className="max-w-3xl text-[15px] leading-relaxed text-white lg:text-[17px]">
          Who is really in charge of a piece of plant at any moment, what keeps it from freezing
          when nobody is in, and how a building is moved between heating and cooling without the two
          fighting.
        </p>

        <TLDR
          points={[
            'Plant answers to layers of command. The fire signal and hardwired safeties sit on top, then the Hand/Off/Auto switch, then head end overrides, then the schedule and control loops.',
            'An override is a temporary instruction. Left in place, it is one of the commonest causes of wasted energy and comfort complaints on a BMS site.',
            'Good practice: timed overrides with a reason, a regular check of what is overridden, and every switch back in Auto before you leave.',
            'Frost protection works in stages: pumps first when it is cold outside, then the heat source when the water itself gets cold. Building protection guards the fabric when the heating is off.',
            'Seasonal change means heating and cooling must be interlocked so they never run together in one space, and seasonal sequences need proving when the season arrives.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <SectionRule />
        <ContentEyebrow>Who is in charge</ContentEyebrow>

        <ConceptBlock
          title="Every plant item answers to layers of command"
          plainEnglish="More than one thing can tell a fan or pump what to do. The higher layer always wins, and you need to know which layer is in control before you touch anything."
          onSite="Before you fault-find a fan that will not start, check every layer in order: fire and safety stops, the panel switch, the head end, then the schedule. Most no-start calls end at the first or second."
        >
          <p>
            In Section 3.3 the schedule decided when plant ran. In Section 3.4 demand decided how
            hard it worked. Both of those are automatic control. Real buildings also need ways for
            people to step in, and ways for protection to step in when nobody is around. Put
            together, a typical supply fan answers to several layers, and the one on top wins:
          </p>
          <ul>
            <li>
              <strong>Fire and life safety.</strong> The fire detection and alarm system acts
              through its own interfaces. A fire signal takes priority over every manual and
              automatic command in the plant logic, and the plant does what the fire strategy
              requires: most AHUs and fans stop, but smoke control fans run.
            </li>
            <li>
              <strong>Hardwired safeties.</strong> Devices such as a frost thermostat or a high
              limit stat that stop or protect the plant directly, without asking the software. These
              get their own page in Section 3.6.
            </li>
            <li>
              <strong>The Hand/Off/Auto switch</strong> on the starter or VSD panel. Off stops the
              plant locally. Hand runs it locally. Only Auto hands control to the BMS.
            </li>
            <li>
              <strong>Head end and outstation overrides.</strong> An operator forcing an output, a
              setpoint or a schedule from the head end or a local display.
            </li>
            <li>
              <strong>Occupant overrides.</strong> An extend button in a meeting room or a plus or
              minus adjustment on a room unit, within limits the strategy allows.
            </li>
            <li>
              <strong>Protection routines.</strong> Frost and building protection, which bring plant
              on outside occupied hours to stop damage.
            </li>
            <li>
              <strong>Normal automatic control.</strong> Time schedules, optimum start, control
              loops and demand-based logic.
            </li>
          </ul>
          <p>
            Where exactly protection routines sit against operator overrides is a design choice
            written in the description of operation. What is never a choice is the top of the list.
            No Hand position and no override path may run a fan that the fire strategy has stopped.
            That is why the fire stop is wired upstream of both the BMS output and the Hand/Off/Auto
            switch, and why the BMS only monitors fire status rather than being the route that stops
            plant.
          </p>
        </ConceptBlock>

        <Pullquote>
          Before you ask why a piece of plant is doing something, ask who is telling it to. It is
          usually doing exactly what the highest active command says.
        </Pullquote>

        <InlineCheck
          id="bms-3-5-layers"
          question="A pump is running in the early hours of a Sunday. The schedule says it should be off. Which explanation fits the idea of layers of command?"
          options={[
            'The schedule has a higher priority than everything else, so it must be faulty',
            'A higher layer, such as frost protection or an override, is commanding it on',
            'Pumps always run at night to keep the BMS controllers warm',
            'The BMS has lost its program and is running every output',
          ]}
          correctIndex={1}
          explanation="The schedule sits near the bottom. A pump running against its schedule is usually obeying something higher: a frost protection stage on a cold night, an operator override, or a starter left in Hand. Check those before suspecting the schedule or the controller."
        />

        <SectionRule />
        <ContentEyebrow>At the panel</ContentEyebrow>

        <ConceptBlock
          title="Hand/Off/Auto: the override you can see"
          plainEnglish="Hand means a person is running the plant. Off means a person has stopped it. Auto means the BMS is in charge. Anything other than Auto is a manual override."
          onSite="When you finish any work at a starter panel, walk the row of switches and check every one is in Auto. Then check the head end agrees: each auto-status point should read available."
        >
          <p>
            You met the Hand/Off/Auto switch in Section 2.7 as part of the plant interface. Here it
            matters as an override. Turning it to Hand runs the motor whatever the BMS wants. That
            is useful for testing a new starter, for moving air during works, or for keeping a pump
            going when an outstation has failed. It is also the easiest override in the building to
            forget, because it leaves no record on the head end other than the auto-status point
            dropping out.
          </p>
          <p>
            What Hand bypasses depends on how the panel was wired, and you should read the drawings
            rather than assume. In a well-designed panel, Hand cuts out the BMS enable and nothing
            else. The fire stop, the motor overload, the emergency stop and the hardwired plant
            safeties still act in Hand, because they sit in the control circuit before the switch.
            If you find a panel where Hand also skips a safety device, report it as a defect.
          </p>
          <p>
            In Hand the BMS has lost control but may still be watching. A good strategy reads the
            auto-status point, raises an alarm when plant is not available to it, and stops
            reporting a failure to start as a plant fault. That alarm is your friend: it is how a
            switch left in Hand gets noticed before the next energy report does it for you.
          </p>
          <p>
            Commissioning practice is straightforward. Prove the Hand and Off positions work, then
            put the switch back to Auto and confirm the BMS can start and stop the plant itself. The
            switch should be left in Auto at handover unless the client has asked otherwise in
            writing.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Leaving a starter in Hand after testing"
          whatHappens={
            <>
              A fan or pump is put in Hand to test rotation or prove a new starter, the job moves
              on, and the switch stays where it is. The plant now runs day and night, ignores the
              schedule and the demand logic, and the BMS shows it as not available. Weeks later
              someone notices the energy use or the noise, and the BMS gets the blame.
            </>
          }
          doInstead={
            <>
              Treat every switch you move as something you owe back. Return it to Auto before you
              leave the panel, check the head end shows the plant as available and under BMS
              control, and note any switch you have to leave in Hand on the job sheet and with the
              site, with the reason.
            </>
          }
        />

        <SectionRule />
        <ContentEyebrow>On the head end</ContentEyebrow>

        <ConceptBlock
          title="Software overrides: forcing outputs, setpoints and schedules"
          plainEnglish="From the head end you can tell any point to hold a value regardless of the strategy. It is powerful, it is quick, and it stays there until someone takes it off."
          onSite="Before you force anything, decide how and when it will be released. If the system offers a timed override, use it."
        >
          <p>
            Operators can override the programmed sequence directly from the head end or from a
            local display on the outstation. The common kinds are:
          </p>
          <ul>
            <li>
              <strong>Forcing an output.</strong> Commanding a digital output on or off, or holding
              an analogue output such as a valve or damper position at a fixed value.
            </li>
            <li>
              <strong>Overriding an input.</strong> Telling the strategy to use a typed-in value
              instead of a sensor reading. Useful for testing logic, dangerous if forgotten, because
              the plant is now being controlled against a number that has nothing to do with the
              room.
            </li>
            <li>
              <strong>Changing a setpoint or a schedule.</strong> Extending occupancy for an event
              or raising a space setpoint. These are often legitimate, but they should still be
              temporary unless the change is made properly in the strategy.
            </li>
          </ul>
          <p>
            Most current systems hold several commands for a point at once and act on the highest
            one that is active. When an override is released, the point drops back to whatever the
            next layer down is asking for. That is why releasing an override is the right way to end
            it. Writing the original value back by hand can itself become a new, permanent override.
          </p>
          <p>
            Good override practice is the same on every platform. Use a time limit where the system
            offers one, so the override expires on its own. Record who applied it and why, which
            most head ends will do if you fill in the reason. Restrict who can override what through
            access rights, so an occupant can nudge a room setpoint but cannot force a boiler. Never
            override a point that is part of a safety function; that is not what overrides are for,
            and Section 3.6 explains why those functions should not depend on software in the first
            place.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Occupant overrides and why they need limits"
          plainEnglish="People in the building should be able to ask for a bit more heat or an extra hour. The strategy decides how much they get and for how long."
          onSite="When you install a room unit with an extend button or a setpoint adjuster, check on the head end that pressing it does what the description of operation says, and that it times out."
        >
          <p>
            Local overrides keep people comfortable and stop them propping doors or bringing in fan
            heaters. Typical examples are an extend button that keeps a zone in occupied mode for a
            set period after the schedule ends, and a room unit that lets the occupant shift the
            setpoint a little either way. The limits on both, how far and how long, are set in the
            strategy and should be in the description of operation.
          </p>
          <p>
            The occupants also need to know what the controls do. Where people have a manual
            override or an adjustable setpoint in their area, the operation of the BMS should be
            explained to them, and the same goes for areas where manual control has been replaced by
            the BMS. An unexplained button gets pressed constantly or never, and either way the
            complaints land on the controls.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-3-5-release"
          question="You overrode a heating valve fully open to test it. The test is finished. What is the correct way to end the override?"
          options={[
            'Type in the valve position the strategy was giving before the test',
            'Command the valve shut so it cannot cause overheating',
            'Release the override so the point returns to the strategy',
            'Leave it, because it will be corrected at the next service visit',
          ]}
          correctIndex={2}
          explanation="Releasing the override hands the point back to the control loop. Typing in the old value, or shutting it, replaces one fixed command with another, so the valve is still overridden and no longer responds to the room. Leaving it is exactly how overrides become permanent."
        />

        <SectionRule />
        <ContentEyebrow>The cost of forgetting</ContentEyebrow>

        <ConceptBlock
          title="Overrides left in place waste energy and cause complaints"
          plainEnglish="A temporary override that nobody takes off becomes the way the building runs. It wastes energy quietly and causes complaints loudly."
          onSite="On any BMS visit, ask for the list of overridden points and anything not in Auto before you start. It takes minutes and often explains the fault you were called for."
        >
          <p>
            Overrides that outlive their reason are one of the commonest causes of wasted energy and
            comfort complaints in buildings with a BMS. The pattern is familiar. A pump is forced on
            during a fault-find and never released, so it runs every night and weekend. A valve is
            held open for a test and the space overheats, so the cooling comes on to fight it. A
            schedule is extended for a one-off event and becomes the new normal. A sensor input is
            overridden to a fixed value and the plant controls to a room that no longer exists.
          </p>
          <p>
            The second cost is less obvious. An override masks faults. If a chiller has been forced
            on, nobody finds out that its enable signal stopped working. If a temperature input is
            overridden, a failed sensor goes unnoticed. The fault surfaces months later, after the
            override is finally released, and looks like something new.
          </p>
          <p>The fix is mostly discipline rather than technology:</p>
          <ul>
            <li>Use timed overrides wherever the system offers them.</li>
            <li>
              Ask the controls engineer for an override summary on the head end, or an alarm when a
              point has been overridden for longer than the site allows.
            </li>
            <li>
              Have someone review overridden points as a routine part of running the building, not
              only when there is a complaint.
            </li>
            <li>
              At handover, release every override and put every switch in Auto, and record any that
              must stay with the reason and the person responsible.
            </li>
          </ul>
        </ConceptBlock>

        <Scenario
          title="The pump that ran all summer"
          situation={
            <>
              A secondary school calls in July. The heating pumps on the low temperature hot water
              circuit are running continuously, and the caretaker can hear them from the corridor.
              The boilers are off for the summer. Looking at the head end, you find the pump enable
              was forced on in February, when a contractor was chasing an air lock. Nobody released
              it, and the trend log shows the pumps have not stopped since.
            </>
          }
          whatToDo={
            <>
              Release the override, rather than forcing the pump off, so it returns to the strategy.
              Check the auto-status point and the starter switch, in case it was also put in Hand.
              Then ask for the full list of overridden points on the site, because where there is
              one there are usually others. Record what you found and what you changed, and suggest
              the site sets an alarm for long-standing overrides.
            </>
          }
          whyItMatters={
            <>
              Five months of a pump running for no reason is wasted electricity, wear on the pump
              and its motor, and noise in a building that should be quiet. None of it needed a part.
              It needed someone to look at what was being commanded, by whom, and since when.
            </>
          }
        />

        <SectionRule />
        <ContentEyebrow>Frost protection</ContentEyebrow>

        <ConceptBlock
          title="Frost protection runs in stages"
          plainEnglish="When it gets cold, first get the water moving. If the water itself starts getting cold, bring the heat on. Do the least that keeps everything safe."
          onSite="When you check a frost routine, find out which pumps are in stage one, which sensor triggers stage two, and what the specified limits are. Then check that every one of those sensors is reading sensibly."
        >
          <p>
            Water in pipes, coils and pumps that are not moving or heated can freeze and split them,
            and the damage shows up as a flood when it thaws. Frost protection routines run plant
            and pumps outside occupied periods to stop that happening. A common arrangement works in
            two stages:
          </p>
          <ul>
            <li>
              <strong>Stage one:</strong> when the outside air temperature falls to the frost
              setpoint, the outstation starts selected circulating pumps. Moving water is far less
              likely to freeze than still water, and running a pump costs much less than firing a
              boiler.
            </li>
            <li>
              <strong>Stage two:</strong> if the water temperature in the system still falls below
              its minimum, the routine brings in full protection. On a heating system that means
              enabling the heat source and holding a minimum return temperature. On other water
              systems the BMS operates whatever protective devices the design specifies.
            </li>
          </ul>
          <p>
            The frost setpoints themselves are set by the design and written in the controls
            specification. They depend on the plant, how exposed it is and what it serves, so there
            is no single correct figure to carry from one job to the next. Your job is to check the
            routine does what the specification says, at the values it gives.
          </p>
          <p>
            Remember what this routine depends on. If the outstation is off, faulty or offline, or
            the pump starters are in Off, software frost protection does nothing. Where frost damage
            would be serious, the design often adds a hardwired frost thermostat in the plant room
            that brings the pumps on whatever the BMS is doing, and an alarm when an outstation
            drops off the network. Check which your site has before you power down a controller in
            winter.
          </p>
          <p>
            Approved Document L (England) touches on this for boiler plant above 100 kW. The 2021
            edition, in force now, says the optimum start/stop control should provide either night
            setback or frost protection outside occupied periods, along with either high/low firing
            or sequenced multiple boilers (paragraph 6.7). From 24 March 2027 the 2026 edition keeps
            this as paragraph 5.11, for new boiler plant in existing buildings. The design decides
            which of setback or frost protection is used, and the controls specification sets the
            limits.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Building protection and plant protection"
          plainEnglish="Building protection keeps the rooms from getting cold or damp enough to cause damage. Plant protection gives idle equipment a short run now and then so it does not seize."
        >
          <p>
            Frost protection looks after the water systems. Building protection looks after the
            fabric and contents. It works on room temperature: if a space falls below its protection
            limit while the normal heating is off, the routine brings the heating and its associated
            plant on until the space recovers. The aim is to prevent cold damage and condensation,
            not to make the room comfortable, so the limit is well below any comfort setpoint.
          </p>
          <p>
            Unless the specification says otherwise, building protection overrides the other
            operating programmes and is active whenever normal heating is switched off, including
            nights, weekends, holidays and the summer shutdown. If you find a building protection
            routine disabled to save energy, ask who decided that and whether it was written down.
          </p>
          <p>
            Plant protection is a different idea. During a long shutdown, some plant is run for
            short periods to stop pumps and valves sticking. When the normal seasonal sequence
            starts the plant anyway, that routine is overridden and stands aside.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Frost protection on air handling units"
          plainEnglish="An AHU pulls in outside air across a water coil. On a cold day that coil can freeze in minutes if the heat is not there, so it is protected in hardware as well as software."
          onSite="On an AHU with a frost thermostat, find out where it is, whether it needs a manual reset, and exactly what it does when it trips. Then check the BMS has a point that tells it the frost stat has operated."
        >
          <p>
            Air handling units are the plant most at risk, because they put outside air straight
            across water coils. The usual protection is layered:
          </p>
          <ul>
            <li>
              <strong>A frost or preheat coil</strong> warms incoming air before it reaches the main
              heating and cooling coils.
            </li>
            <li>
              <strong>Software routines</strong> hold the heating valve open and keep the coil pump
              running when the air entering is cold, and keep the fresh air dampers shut until
              heating is proved at start-up.
            </li>
            <li>
              <strong>A frost thermostat</strong>, often a long capillary element across the face of
              the coil, which operates when any part of the air stream gets too cold. It is a
              hardwired safety: it stops the fan directly, without waiting for the BMS. The fresh
              air damper should close in hardware too, typically a spring-return actuator that drops
              shut when the fan stops or the frost stat opens. The strategy then opens the heating
              valve and runs the coil pump to recover. Section 3.6 covers how it is wired.
            </li>
          </ul>
          <p>
            Heat recovery devices need protecting too. Approved Document L expects heat exchangers
            to have defrost control, and a way to stop, modulate or bypass the recovery when it
            would do more harm than good. Without defrost control, ice can build up on the exhaust
            side of a recovery device on cold days and block it.
          </p>
          <p>
            Sensing lines can freeze as well. Differential pressure tubes carrying moist air should
            not run through cold spaces or outside, and where condensation is likely they need a
            drain point lower than the device so water does not sit in them.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Linking out a frost thermostat that keeps tripping"
          whatHappens={
            <>
              An AHU frost stat trips on cold mornings and the building loses its ventilation, so
              someone links it out or turns its setting right down to stop the calls. The trips
              stop. Then one cold night a valve sticks or a pump fails, nothing stops the fan, and
              the coil freezes and splits. The ceiling below finds out first.
            </>
          }
          doInstead={
            <>
              Treat nuisance trips as a symptom. Check the heating valve and its actuator, the coil
              pump, the start-up sequence (are the dampers opening before heat is proved?) and the
              frost routine on the BMS. Fix the cause and leave the frost stat working at its
              specified setting. If you are asked to defeat it, refuse and put the request in
              writing to the person responsible for the plant.
            </>
          }
        />

        <InlineCheck
          id="bms-3-5-frost-stages"
          question="On a cold night the heating pumps start, but the boilers stay off. Is the frost routine working?"
          options={[
            'No, because frost protection should always start the boilers immediately',
            'Yes, if the water temperature is still above the stage two minimum',
            'No, because the pumps should only run during occupied hours',
            'Yes, but only if the building protection routine is disabled',
          ]}
          correctIndex={1}
          explanation="That is stage one doing its job: water is moving because the outside air has reached the frost setpoint. The heat source only comes in at stage two, when the system water itself falls below its minimum. Starting boilers straight away would protect the plant at much greater cost."
        />

        <SectionRule />
        <ContentEyebrow>Seasonal change</ContentEyebrow>

        <ConceptBlock
          title="Summer, winter and the months in between"
          plainEnglish="The building needs different plant running at different times of year. The trick is to change over cleanly so heating and cooling never run against each other."
          onSite="In spring and autumn, look at trends for any space where heating and cooling outputs are both above zero at the same time. That is the clearest sign of a seasonal problem."
        >
          <p>
            Time programmes on a BMS are built to handle seasonal variation as well as days,
            weekends, holidays and the clock change to and from British Summer Time. Around those
            programmes, a building moves between modes over the year:
          </p>
          <ul>
            <li>
              <strong>Heating season:</strong> boilers or heat pumps enabled, flow temperature
              varied with outside temperature by weather compensation, frost and building protection
              active out of hours.
            </li>
            <li>
              <strong>Cooling season:</strong> chillers enabled, heating plant often shut down or
              limited to hot water and reheat duties, plant protection runs keeping idle pumps free.
            </li>
            <li>
              <strong>Transition:</strong> both may be needed on the same day, cold in the morning
              and warm by afternoon. This is where most seasonal problems happen.
            </li>
          </ul>
          <p>
            Changeover can be manual, with an operator switching a summer/winter mode on the head
            end, or automatic, based on outside temperature with a gap and a time delay so the plant
            does not flip back and forth on a changeable day. Approved Document L expects heating
            systems to have weather compensation where appropriate and technically feasible (2021
            paragraph 5.11; 4.13 from 24 March 2027), and mechanical ventilation supply temperature
            to be set by a variable setpoint with outdoor temperature compensation (2021 paragraph
            6.56; 5.61 from 24 March 2027). So the outside air sensor matters all year. Site it away
            from sun, extract discharges and other heat sources, or every seasonal decision built on
            it will be wrong.
          </p>
          <p>
            Some terminal units use one coil for both duties: a two-pipe fan coil, or a unit with a
            six-way valve that switches the coil between heating and cooling water. On those, the
            changeover signal decides what is in the coil, and a wrong changeover gives a room heat
            when it asked for cooling.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Heating and cooling must never fight"
          plainEnglish="If the heating and the cooling are both on in the same room, you are paying twice to stand still."
          onSite="On a job where heating and cooling were installed by different contractors, ask early who owns the interlock between them. If the answer is nobody, raise it."
        >
          <p>
            The clearest seasonal waste is heating and cooling running at the same time in the same
            space. It is surprisingly common. The usual causes are overlapping setpoints (heating to
            a higher figure than cooling starts at), an override left on one system, or a heating
            system and a cooling system put in by two different contractors with nothing linking
            them.
          </p>
          <p>
            The cure is an interlock between heating and cooling control, so that one is locked out
            whenever the other is active in that space, plus a deadband between the heating and
            cooling setpoints so the room can float between them without either running. The BACS
            efficiency classes in BS EN ISO 52120-1 grade this function, from no interlock to a
            total interlock, which shows how much it matters to the energy performance of a
            controlled building.
          </p>
          <p>
            From the electrician&apos;s side, the interlock is usually software, but it relies on
            the signals you wire: valve and actuator feedback, plant enable and status points, and
            the changeover signal on two-pipe systems. A miswired or missing status point can make
            an interlock believe the other system is off when it is running.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-3-5-interlock"
          question="In a room with no interlock, the heating setpoint has been set higher than the temperature at which cooling starts. What will happen?"
          options={[
            'Nothing unusual, because the BMS will average the two setpoints',
            'Only the cooling runs, because cooling always has priority',
            'Only the heating runs, because heating always has priority',
            'Heating and cooling can both run, working against each other',
          ]}
          correctIndex={3}
          explanation="The setpoints overlap: in the band between them, the heating and the cooling are both calling at the same time. Without an interlock both run and fight. The fix is a proper deadband with heating below cooling, and an interlock so one is locked out while the other is active."
        />

        <ConceptBlock
          title="Proving seasonal functions"
          plainEnglish="You can test the logic any time. You can only test the plant under real seasonal load when that season comes round."
          onSite="When you hand over in summer, make sure the frost and heating sequences are on the list of items to revisit in winter, and the other way round."
        >
          <p>
            Complete commissioning is often blocked by plant that is out of service or by the time
            of year. You can simulate the outside air temperature on the head end to check that the
            changeover and frost logic switches at the right values, and you should. That proves the
            logic. It does not prove that the boilers hold the return temperature on a freezing
            night, or that the chillers cope on the first hot week.
          </p>
          <p>
            Anything that could not be fully commissioned should be identified at handover, with
            arrangements made to come back and finish it. The schedules for the job should also say
            what the plant does on seasonal shutdown, alongside its actions on daily shutdown,
            start-up, communications failure and power failure. During the first year of operation,
            plan reviews that catch each season, so problems with changeover and frost protection
            are found in the season that exposes them.
          </p>
          <p>
            When you simulate a value, treat it like any other override. Write down what you
            overrode, release it when you finish, and check the point is reading the real sensor
            again before you leave.
          </p>
        </ConceptBlock>

        <SectionRule />

        <FAQ
          items={[
            {
              question: 'How long should a timed override last?',
              answer:
                'As long as the job needs and no longer. There is no standard figure. The site or the controls specification may set default limits for each type of override; follow those, and if there are none, set the shortest period that covers the work and note it on the job sheet.',
            },
            {
              question:
                'Can I put a starter in Hand to keep a building heated if the outstation fails?',
              answer:
                'Often yes, if the site agrees and the panel is wired so the fire stop and hardwired safeties still act in Hand. But Hand also removes time control and any frost or interlock logic the BMS was providing, so somebody has to watch it. Label it, tell the site, record it, and put it back in Auto when the outstation is restored.',
            },
            {
              question: 'What temperature should frost protection be set to?',
              answer:
                'Whatever the design and the controls specification say for that building. The limits depend on the plant, how exposed it is and what it serves, so there is no single figure to carry between jobs. If the specification is missing or vague, raise it with the designer or controls engineer rather than picking a number.',
            },
            {
              question: 'Is it my job as the electrician to find overrides?',
              answer:
                'Whenever you work on BMS-controlled plant, it is your job to know which layer is in control before you start and to leave every switch and override as it should be when you finish. Reviewing overrides across the site is normally the operator or controls contractor, but a quick look at the override list is part of any sensible fault-find.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'Plant answers to layers of command. Fire and hardwired safeties sit on top; no Hand/Off/Auto switch or override may run a fan the fire strategy has stopped, and smoke control fans run on fire.',
            'Hand/Off/Auto is an override. Prove Hand and Off at commissioning, then leave the switch in Auto and check the BMS sees it as available.',
            'Head end overrides should be timed, given a reason and released, never overwritten with a typed value. Never override a safety function.',
            'Overrides left in place are one of the commonest causes of wasted energy and complaints, and they mask faults. Check the override list on every visit.',
            'Frost protection works in stages: pumps first on low outside temperature, heat source when the water gets cold. Setpoints come from the design and the controls specification, and software frost protection does nothing if the outstation is dead.',
            'Building protection guards the fabric against cold and condensation whenever normal heating is off. AHU frost thermostats are hardwired safeties and are never linked out.',
            'Heating and cooling must be interlocked with a deadband between them, and seasonal sequences need proving in the season they serve.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself" />

        <PrevNext
          noun="section"
          prevHref="/study-centre/upskilling/bms-module-3-section-4"
          prevLabel="Demand-based control and load management"
          nextHref="/study-centre/upskilling/bms-module-3-section-6"
          nextLabel="Plant safety interlocks and shutdowns"
        />
      </HubBody>
    </HubPage>
  );
};

export default BMSModule3Section5;
