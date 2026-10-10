/**
 * BMS Module 4 · Section 2 — Daylight and presence detection
 *
 * Rebuilt 10 Oct 2026 on the learning primitives. The page teaches how occupancy sensors (PIR,
 * microwave and dual technology) and light sensors decide when lighting runs and how bright it
 * runs: presence versus absence detection, hold times, closed-loop daylight dimming, constant
 * illuminance, where sensors go, how they are commissioned, and how their signals reach a DALI
 * application controller and the BMS. Approved Document L (2021 paras 6.61–6.64 and the LENI
 * method in Appendix B; 2026 paras 5.66–5.75 from 24 March 2027) sets what is expected. The old page carried invented energy
 * savings percentages, an invented case study with a savings figure, unsourced lux targets, PIR
 * detection ranges and recommended time delays per room type. All of that is gone.
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

const TITLE = 'Daylight and presence detection | BMS Module 4.2 | Elec-Mate';
const DESCRIPTION =
  'How PIR, microwave and light sensors switch and dim lighting: presence versus absence, hold times, daylight dimming, sensor siting and commissioning.';

const outcomes = [
  'Explain how PIR and microwave occupancy sensors detect people, and the weakness of each',
  'Choose between presence detection and absence detection for a given space, and say why',
  'Describe closed-loop daylight dimming, photo-switching and constant illuminance, and tell them apart',
  'Site occupancy and light sensors so they see what the control strategy needs them to see',
  'Commission sensors properly: walk tests, hold times, sensitivity and daylight calibration at the task',
  'Describe what Approved Document L expects of lighting controls, and how sensor data reaches the BMS',
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A PIR sensor in a long corridor keeps missing people until they are almost underneath it. They walk straight towards it from the far end. What is the most likely cause?',
    options: [
      'The hold time has been set too short for the corridor',
      'The sensor has been linked to the wrong DALI group address',
      'A PIR responds poorly to movement straight towards it',
      'The corridor light level is too high for the sensor',
    ],
    correctIndex: 2,
    explanation:
      'A PIR is far more sensitive to movement across its field of view than to movement directly towards it. Someone walking head-on down a corridor barely changes which segments of the lens they occupy. A corridor-pattern lens, or a sensor positioned so people cross its zones, fixes it. The hold time only affects switch-off, not detection.',
  },
  {
    id: 2,
    question:
      'What is the difference between a presence detection scheme and an absence detection scheme?',
    options: [
      'Presence switches on by itself; absence needs a manual switch-on',
      'Presence uses PIR sensors; absence uses microwave sensors',
      'Presence dims the lights; absence switches them off',
      'Presence is for occupied spaces; absence is only for unoccupied spaces',
    ],
    correctIndex: 0,
    explanation:
      'Both turn the lighting off automatically when the space empties. The difference is switch-on: presence detection turns the lights on when someone walks in, absence detection waits for somebody to press the switch. The sensor technology can be the same in both.',
  },
  {
    id: 3,
    question:
      'A ceiling light sensor in an open-plan office is calibrated on a dull afternoon with the desks clear. Months later, staff complain that the lights dim too far on bright days. What should you check first?',
    options: [
      'Whether the DALI bus power supply is now overloaded',
      'Whether the PIR hold time has been shortened',
      'Whether the luminaires have been replaced with brighter ones',
      'Whether its view now includes bright surfaces or direct sun',
    ],
    correctIndex: 3,
    explanation:
      'A ceiling light sensor measures light reflected back from the surfaces below it, not the light at the desk. New pale desks, paper, or sunlight falling within its view change that ratio, so it thinks the room is brighter than it is. Re-check its view, then recalibrate against a lux meter reading taken at the task.',
  },
  {
    id: 4,
    question:
      'Under Approved Document L, where should general lighting in occupied spaces have daylight controls?',
    options: [
      'In every occupied space regardless of glazing',
      'In the parts likely to get high levels of daylight',
      'Only in spaces served by a BACS',
      'Only where the lighting load is above a set wattage',
    ],
    correctIndex: 1,
    explanation:
      'Paragraph 6.64 of the 2021 edition (5.71 in the 2026 edition, from 24 March 2027) asks for daylight controls, such as photo-switching and dimming, in the parts of occupied spaces likely to receive high levels of natural light. It does not ask for them in a deep core zone with no daylight, and it does not depend on whether a BACS is installed.',
  },
  {
    id: 5,
    question:
      'A microwave occupancy sensor in a small office keeps the lights on whenever people walk along the corridor outside. What is the best first step?',
    options: [
      'Swap it for a light sensor of the same make',
      'Reduce its sensitivity and re-run the walk test',
      'Lengthen the hold time so it switches less often',
      'Move the office lighting onto the corridor circuit',
    ],
    correctIndex: 1,
    explanation:
      'Microwave sensors can detect through lightweight partitions, doors and glass, so they often see movement in the next space. Turning the sensitivity down until it covers only the office, then proving it with a walk test, is the fix. A longer hold time does nothing about the false detections and keeps the lights on even longer after each one.',
  },
  {
    id: 6,
    question: 'Why does a DALI-2 light sensor have programmable hysteresis?',
    options: [
      'So small daylight flickers do not flood the bus with messages',
      'So it can switch its own relay output when daylight is high',
      'So its reading matches desk level without needing a lux meter',
      'So the occupancy hold time restarts when the light level changes',
    ],
    correctIndex: 0,
    explanation:
      'A DALI-2 light sensor can report periodically or when its reading changes. Hysteresis stops tiny changes in daylight from triggering a stream of reports. It is an input device with no relay output, calibration still needs a lux meter at the task, and hold time belongs to occupancy control.',
  },
  {
    id: 7,
    question:
      'A light sensor faces out of a window and sets the electric lighting from a pre-set relationship, never seeing the lights it controls. What is the main weakness of this arrangement?',
    options: [
      'It cannot correct itself, so it relies on good initial set-up',
      'It over-reads its own luminaires and dims the zone too far',
      'Approved Document L does not accept it as a daylight control',
      'It needs a DALI address for each luminaire it is set to watch',
    ],
    correctIndex: 0,
    explanation:
      'This is open-loop control. The sensor never sees the lights it controls, so it cannot check the result, and its accuracy depends on the initial set-up. It cannot over-read its own luminaires, because it never sees them. The approved document describes the outcome it wants, not the sensor arrangement.',
  },
  {
    id: 8,
    question:
      'The approved document’s LENI method only credits occupancy control where the lights go off within a set time of the room emptying. What is that time?',
    options: ['5 minutes', '10 minutes', '20 minutes', '30 minutes'],
    correctIndex: 2,
    explanation:
      'Appendix B gives the occupancy factor credit where controls turn the lights off within 20 minutes of the room being empty. A hold time set longer than that, often to stop complaints, means the design no longer gets the credit it was calculated with.',
  },
  {
    id: 9,
    question:
      'Constant illuminance control and daylight dimming both lower the light output. What is constant illuminance actually compensating for?',
    options: [
      'Occupants leaving the space for short periods',
      'Changes in mains voltage through the day',
      'Sunlight entering through rooflights',
      'New luminaires giving more light than the design needs',
    ],
    correctIndex: 3,
    explanation:
      'Lighting is designed to give enough light at the end of its maintenance period, so when new it gives more than needed. Constant illuminance under-runs the luminaires at first and slowly raises their output as they age. Daylight dimming responds to natural light, which is a different job, and the two often run together.',
  },
  {
    id: 10,
    question:
      'The BMS contractor asks for the occupancy status of each floor from the lighting control system. What is the most likely reason?',
    options: [
      'To switch the lighting from the BMS instead of the lighting system',
      'To set heating, cooling or ventilation back when zones are empty',
      'To use the lighting sensors as the fire detection system',
      'To meet the BACS requirement for systems over 180 kW',
    ],
    correctIndex: 1,
    explanation:
      'The same occupancy information that turns lights off can tell the BMS a zone is empty, so it can set heating or cooling back or reduce ventilation. The lighting system keeps control of the lighting. Occupancy sensors are never part of fire detection, and the 180 kW BACS trigger is about heating and cooling output, not sensors.',
  },
];

const BMSModule4Section2 = () => {
  useSEO(TITLE, DESCRIPTION);
  return (
    <HubPage>
      <HubMasthead
        section="Module 4 · Section 2"
        title="Daylight and presence detection"
        backTo="/study-centre/upskilling/bms-module-4"
      />
      <HubBody>
        <p className="max-w-3xl text-[15px] leading-relaxed text-white lg:text-[17px]">
          This page covers the presence and daylight sensors that decide how lighting behaves. Most
          lighting complaints on site come down to how these sensors were fitted and set up.
        </p>

        <TLDR
          points={[
            'Occupancy sensors answer “is anyone here?”. PIR sees warm bodies moving across its view; microwave sees any movement, including through thin walls. Dual-technology sensors combine them.',
            'Presence detection switches lights on and off automatically. Absence detection makes people switch on, and only switches off automatically. The choice is a design decision, not a product feature.',
            'Light sensors answer “how much light is already here?”. Closed-loop daylight dimming trims the electric light so the task gets what it needs and no more.',
            'Approved Document L expects automatic switch-off in unused spaces and daylight controls where natural light is high. Its LENI method only credits occupancy control that switches off within 20 minutes of a room emptying.',
            'Most complaints about sensors are siting and commissioning faults, not product faults. Walk test every detector, and calibrate every light sensor against a lux meter at the task.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <SectionRule />
        <ContentEyebrow>Why lighting has sensors at all</ContentEyebrow>

        <ConceptBlock
          title="Two questions, two kinds of sensor"
          plainEnglish="One sensor tells the system whether people are in the room. The other tells it how much light is already there. Between them they decide whether the lights are on, and how bright."
          onSite="When a lighting complaint comes in, work out first which of the two questions the system is getting wrong. ‘The lights go off on me’ is occupancy. ‘It’s too dim by the window’ is daylight. They are different faults with different fixes."
        >
          <p>
            Section 4.1 covered how lighting is switched and dimmed: relays, 1–10 V and DALI. This
            section is about what tells that equipment to act. In almost every commercial building
            built or refitted in recent years, that is a mix of two sensor types.
          </p>
          <ul>
            <li>
              <strong>Occupancy sensors</strong> detect people. They decide <em>when</em> the
              lighting should be on.
            </li>
            <li>
              <strong>Light sensors</strong> (also called photocells, daylight sensors or lux
              sensors) measure illuminance. They decide <em>how much</em> electric light is needed,
              or whether any is needed at all.
            </li>
          </ul>
          <p>
            The reason is simple. Lighting left burning in an empty room, or running at full output
            beside a sunlit window, is energy spent for nothing. Approved Document L sets out what
            is expected for new and refurbished non-domestic buildings, and the BACS efficiency
            classes in BS EN ISO 52120-1 look at whether lighting follows occupancy and daylight.
            When a specification asks for a high class, someone can walk the building after handover
            and check that occupancy sensors really do control the lighting. You want that check to
            pass.
          </p>
          <p>
            Occupancy information is also useful well beyond lighting. A BMS can use it to set
            heating or cooling back in an empty zone, or to cut ventilation. That is why the
            controls engineer will often ask the lighting contractor for an occupancy signal per
            area, and why the electrician fitting the sensors needs to understand what they are
            really for.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>How occupancy sensors detect people</ContentEyebrow>

        <ConceptBlock
          title="PIR: warm bodies moving across a pattern of zones"
          plainEnglish="A PIR does not see people. It sees a warm shape moving from one patch of its view into another. Stand still and you vanish. Walk straight at it and you barely register."
          onSite="Before you fix a PIR, look at which way people actually walk past it. A sensor that people approach head-on will always be slow to react, however sensitive you set it."
        >
          <p>
            PIR stands for <strong>passive infrared</strong>. Passive, because the sensor emits
            nothing: it only receives the infrared (heat) radiation that warm bodies give off. The
            lens in front of the element is split into many small segments, so the sensor sees the
            room as a pattern of separate zones. When a warm body moves from one zone into the next,
            the element sees the change, and that change is what counts as detection.
          </p>
          <p>Three consequences follow, and every one of them shows up on site.</p>
          <ul>
            <li>
              <strong>Direction matters.</strong> A PIR is much more sensitive to movement across
              its field of view than to movement straight towards it. Someone walking at the sensor
              stays in roughly the same zone for a long time, so the change is small.
            </li>
            <li>
              <strong>Stillness is invisible.</strong> A person reading, typing or sitting an exam
              may move too little to cross a zone boundary. The sensor decides the room is empty and
              the hold time starts running down.
            </li>
            <li>
              <strong>It needs line of sight.</strong> Infrared does not pass through partitions,
              high-backed furniture or shelving. A desk behind a filing cabinet may be outside the
              sensor’s view entirely.
            </li>
          </ul>
          <p>
            Large or awkward spaces often need more than one sensor to cover them, and manufacturers
            offer different lenses (wide-angle ceiling patterns, long narrow corridor patterns,
            high-bay patterns) for different jobs. Picking the lens is as much a part of the design
            as picking the sensor.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Microwave and dual technology"
          plainEnglish="A microwave sensor sends out a weak radio signal and watches for movement in what bounces back. It picks up small movements a PIR would miss, but it can also see through things you did not want it to."
          onSite="If lights in a room keep coming on when nobody is in it, and the sensor is microwave, assume it is seeing through the wall or door before you assume it is faulty."
        >
          <p>
            A <strong>microwave</strong> sensor is active: it transmits a low-power radio signal and
            looks for changes in the reflections caused by movement. It does not care about heat,
            and it responds to movement in any direction, including straight towards it. That makes
            it better than a PIR at catching small movements, and it is often used in toilets with
            cubicle walls, in stairwells and in spaces where people stay quite still.
          </p>
          <p>
            The weakness is the same property seen from the other side. Radio passes through
            lightweight partitions, doors and glass, so a microwave sensor can be triggered by
            people in the next room or the corridor outside. Air movement can also move things
            enough to trigger it: blinds, hanging signs, plants by a diffuser. Setting the
            sensitivity is part of commissioning every microwave sensor.
          </p>
          <p>
            <strong>Dual-technology</strong> sensors put two detection methods in one housing,
            commonly PIR with microwave or with ultrasonic. The usual logic is that both must agree
            before the lights switch on, which cuts false triggering, and either one alone is enough
            to hold them on, which reduces lights going off on still occupants. Check the
            manufacturer’s settings: that logic is often adjustable, and a sensor set to ‘either one
            switches on’ inherits the false triggers of both.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-4-2-pir-direction"
          question="A PIR in a meeting room switches the lights off during long, quiet meetings, even though the room is full. Which change addresses the cause rather than hiding it?"
          options={[
            'Replace the luminaires with a dimmable type',
            'Turn the hold time up to its maximum setting',
            'Fit a sensor type that also detects small movements',
            'Move the sensor directly above the door',
          ]}
          correctIndex={2}
          explanation="The cause is that a PIR cannot see people who are sitting still. A sensor that also responds to small movements, positioned to see the table, treats the cause. Turning the hold time to maximum hides the symptom, and also keeps the room lit long after everyone has left. Moving it above the door makes it see the corridor and not the table."
        />

        <SectionRule />
        <ContentEyebrow>Presence or absence</ContentEyebrow>

        <ConceptBlock
          title="Who turns the lights on: the sensor or the person"
          plainEnglish="Presence detection: walk in, lights come on; leave, they go off. Absence detection: walk in and press the switch; leave, they go off by themselves."
          onSite="When you are handed a specification, check which one each room is meant to be. The sensor hardware may be identical; the difference is often a single setting, or which terminal the switch goes to."
        >
          <p>
            Every occupancy scheme switches the lighting off automatically once the space has been
            empty for long enough. Where they differ is how the lights come <em>on</em>.
          </p>
          <ul>
            <li>
              <strong>Presence detection</strong> switches the lighting on when someone enters, and
              off, or down to a lower level, once the space is unoccupied. Nobody has to touch a
              switch.
            </li>
            <li>
              <strong>Absence detection</strong> leaves switching on to the occupant, with a manual
              switch or push-button, and only switches off automatically.
            </li>
          </ul>
          <p>
            Presence suits spaces where people would never reliably find a switch, or should not
            have to: corridors, stairs, toilets, store rooms, car parks, plant rooms. Absence suits
            spaces with good daylight or where people often do not need the lights at all, such as a
            perimeter office or a classroom on a bright morning. With absence detection the lights
            only come on when someone decides the room is too dark, which presence detection can
            never know.
          </p>
          <p>
            On stairs and escape corridors, remember that the emergency lighting only comes on when
            the mains fails, not when a sensor turns the lights off. Make sure the sensors see every
            approach, including each landing, so nobody steps onto a dark stair.
          </p>
          <p>
            Guidance in Scotland names both presence and absence detection as ways of switching off
            lighting in unused spaces. Approved Document L in England gives presence detection as
            its example but describes the outcome rather than the method, which leaves the designer
            free to choose.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Hold time: how long the system waits"
          plainEnglish="The hold time is the gap between the last movement the sensor saw and the lights going off. Too short and people get plunged into darkness. Too long and the lights burn in empty rooms."
          onSite="Do not just wind the hold time up when someone complains. Find out why the sensor stopped seeing them. A long hold time hides a badly sited sensor; it does not fix it."
        >
          <p>
            After the last detection, the controller starts a timer. If nothing else is detected
            before it runs out, the lighting goes off, or dims to a lower level first and then off.
            That timer goes by several names: hold time, time delay, time-out, run-on.
          </p>
          <p>
            There is a real limit here. Approved Document L’s Lighting Energy Numeric Indicator
            (LENI) method, in Appendix B, only allows a reduced occupancy factor where the controls
            turn the lighting off <strong>within 20 minutes</strong> of the room becoming empty. If
            the building’s lighting compliance was shown using LENI with occupancy credit, a hold
            time set beyond that undoes part of the calculation the design was signed off on. Check
            with the designer before you lengthen it.
          </p>
          <p>
            Many systems also step down before they switch off: lights dim to a low level when the
            room first goes quiet, giving the occupant a visible warning to move, and only switch
            off if nothing happens. In corridors and stairs this ‘corridor function’ keeps a low
            level of light while neighbouring rooms are occupied, which people find far more
            comfortable than a dark corridor.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-4-2-absence"
          question="A primary school asks for classroom lighting that does not come on by itself on bright mornings, but goes off when the room is left empty at break. Which scheme fits?"
          options={[
            'Presence detection with a longer hold time',
            'Absence detection with a manual switch at the door',
            'A time switch set to the school day',
            'A photocell that switches the lights on at dusk',
          ]}
          correctIndex={1}
          explanation="Absence detection leaves switching on to the teacher, so lights only come on when the room is actually too dark, and still switches them off automatically when the class leaves. Presence detection would switch on every time someone entered, however bright the room. A time switch knows nothing about whether the room is empty."
        />

        <SectionRule />
        <ContentEyebrow>Using the daylight already there</ContentEyebrow>

        <ConceptBlock
          title="Daylight dimming, photo-switching and constant illuminance"
          plainEnglish="Daylight dimming turns the electric light down when the sun is doing some of the work. Photo-switching turns it off altogether when there is plenty of daylight. Constant illuminance is a different idea: it stops new lights being too bright."
          onSite="Ask which of the three the specification wants in each zone. Commissioning each one is different, and it is easy to set up one when the drawings meant another."
        >
          <p>
            <strong>Daylight dimming</strong> (often called daylight harvesting) uses a light sensor
            to measure how much light is reaching a zone and trims the electric lighting so the
            total stays at the design level. On a bright day near the windows the lights run low; on
            a dull day, or after dark, they run at full output. Done well, nobody notices it
            happening, because the change is slow and the light on the desk barely moves.
          </p>
          <p>
            <strong>Photo-switching</strong> does the same job in steps: the lighting switches off
            (or switches down a stage) when daylight passes a set level, and back on when it falls.
            It is simpler and suits non-dimmable lighting, but it needs a deadband between the off
            and on levels, or the lights will flick on and off as clouds pass. Approved Document L
            names both photo-switching and dimming as examples of daylight controls.
          </p>
          <p>
            <strong>Constant illuminance</strong> (sometimes called maintained illuminance) solves a
            different problem. A lighting design has to give enough light at the end of its
            maintenance period, after the luminaires have aged and collected dirt. So on day one,
            new lighting gives more light than the design needs. A constant illuminance system
            under-runs the luminaires when new and slowly raises their output as they age, until
            maintenance is due. The LENI method in Approved Document L gives this its own factor,
            separate from daylight dimming.
          </p>
          <p>
            Daylight only reaches so far into a building. For the LENI calculation, Approved
            Document L treats areas within <strong>6 m</strong> of a wall with a window, or under a
            roof that is at least <strong>10%</strong> rooflights or translucent material, as having
            adequate daylight for dimming credit. That is a calculation rule, not a design rule, but
            it is a fair guide to why the row of luminaires nearest the window is usually its own
            control zone and the core of a deep-plan floor is not.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Closed loop and open loop"
          plainEnglish="A closed-loop sensor looks down at the room it controls, so it sees its own lights too. An open-loop sensor looks out at the daylight and never sees the lights it is dimming."
          onSite="Look at where the sensor is pointing. If a sensor meant for closed-loop dimming is staring at the window, it has been installed as if it were open-loop, and it will dim far too much on bright days."
        >
          <p>
            Most daylight dimming inside buildings is <strong>closed loop</strong>. The sensor is on
            the ceiling looking down at the work area, and it measures the light reflected back from
            the surfaces below: desks, floor, paper. That reading includes both daylight and the
            electric light it is controlling, so the controller can trim the lighting until the
            reading sits at the target. This is the same feedback idea as a temperature loop in
            Section 3.2: measure, compare with a setpoint, adjust, measure again.
          </p>
          <p>
            Two things follow from that. First, the sensor is measuring reflected light at the
            ceiling, not illuminance at the desk. The relationship between the two depends on how
            pale the surfaces are, which is why every closed-loop sensor has to be calibrated in the
            room it is in. Second, it must not see bright things that are not representative of the
            zone: the window itself, direct sun patches, or an uplighter.
          </p>
          <p>
            <strong>Open-loop</strong> sensors look at the daylight source instead, typically facing
            out of a window or up at a rooflight, and set the electric lighting from a pre-set
            relationship. They never see the lights they control. They are simpler to reason about
            but cannot correct themselves, so they rely heavily on good initial set-up. External
            lighting dusk-to-dawn photocells are the most familiar open-loop example.
          </p>
          <p>
            In a DALI-2 system, a light sensor can report its reading periodically or only when it
            changes, and it has programmable hysteresis so that tiny flickers in daylight do not
            flood the bus with messages. Fades matter here too: DALI-2 added extended fade times,
            from 0.1 seconds up to 16 minutes, which is what lets daylight adjustments happen slowly
            enough that nobody notices.
          </p>
        </ConceptBlock>

        <Pullquote>
          A daylight sensor does not measure the light on the desk. It measures the light bouncing
          back up to the ceiling, and you calibrate it so the two agree.
        </Pullquote>

        <InlineCheck
          id="bms-4-2-closed-loop"
          question="Why must a closed-loop daylight sensor be calibrated in the room where it is installed, rather than set from the box?"
          options={[
            'Its reading depends on how reflective the surfaces below it are',
            'Each sensor has a different DALI address range from the factory',
            'Calibration sets the occupancy hold time for that room',
            'Approved Document L requires a calibration certificate for each sensor',
          ]}
          correctIndex={0}
          explanation="A ceiling sensor sees light reflected from the desks, floor and walls below it. Dark carpet and pale carpet give very different readings for the same desk illuminance, so the sensor has to be matched to a lux meter reading taken at the task in that room. Calibration has nothing to do with hold time, and there is no certificate requirement in the approved document."
        />

        <SectionRule />
        <ContentEyebrow>Where sensors go</ContentEyebrow>

        <ConceptBlock
          title="Siting occupancy sensors"
          plainEnglish="Put the occupancy sensor where it can see the people it is meant to see, and nothing else."
          onSite="Stand under the sensor position on the drawing and look around. If you cannot see the far desk, the sensor cannot either. Raise it now, before the ceiling goes in."
        >
          <p>
            Sensor positions on a lighting layout are a starting point, not an instruction to be
            followed whatever the room turns out to look like. Check each one against the room as
            built.
          </p>
          <ul>
            <li>
              <strong>Cover where people actually sit or work</strong>, not just the middle of the
              room. Desks in corners and against walls are the usual blind spots.
            </li>
            <li>
              <strong>Use the movement pattern.</strong> A PIR detects best when people cross its
              zones. In a corridor, that usually means a long-range corridor lens or several
              sensors, not one sensor at the end facing the length of it.
            </li>
            <li>
              <strong>Keep away from things that move or change temperature</strong>: supply air
              diffusers, heaters, fan coil grilles, blinds, and doors to busy corridors. Warm air
              and moving objects are the commonest sources of false triggering.
            </li>
            <li>
              <strong>Mind the doorway.</strong> A sensor that sees out into the corridor will keep
              the room lit for everyone walking past. Mask that part of the lens, or reduce
              sensitivity, and prove it with a walk test.
            </li>
            <li>
              <strong>Check the mounting height</strong> against the manufacturer’s coverage data. A
              sensor rated for an office ceiling will not cover the same floor area from a warehouse
              roof.
            </li>
          </ul>
        </ConceptBlock>

        <ConceptBlock
          title="Siting light sensors"
          plainEnglish="Put the light sensor over a typical part of the zone it controls, looking at ordinary surfaces, with no window, sun patch or lamp in its view."
          onSite="Many sensors combine occupancy and light detection in one head. The best place for one job is not always the best place for the other. If the two conflict, ask the designer which matters more in that room."
        >
          <ul>
            <li>
              <strong>One sensor per daylight zone</strong>, sited over a representative part of it:
              typically partway between the window and the inner edge of the zone, over desks rather
              than circulation space.
            </li>
            <li>
              <strong>Not looking at the window.</strong> A closed-loop sensor that sees the sky or
              direct sun will over-read and dim the lights too far.
            </li>
            <li>
              <strong>Not looking at a light source</strong>, especially an uplighter or a luminaire
              from a different zone, which it cannot control and will mistake for daylight.
            </li>
            <li>
              <strong>Away from surfaces that change.</strong> A sensor above a glossy reception
              counter or a whiteboard will read very differently depending on what is on it.
            </li>
          </ul>
          <p>
            Many modern luminaires take a plug-in sensor. Zhaga-D4i luminaires, for example, have a
            powered receptacle into which a light or occupancy sensor can be fitted, so the sensor
            ends up exactly where the luminaire is. That is convenient, but the luminaire positions
            were chosen for light distribution, not for sensor coverage. Check that the sensors you
            plug in can actually see what they need to.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Fitting the daylight sensor next to the window because that is where the daylight is"
          whatHappens="The perimeter zone sensor is fixed close to the glazing so it ‘gets the daylight’. On a bright day it sees sun on the sill and the sky beyond, reads very high, and dims the whole zone down. The occupants at the inner desks, who get far less daylight, end up working in gloom and start complaining, or prop a piece of card over the sensor."
          doInstead="Site a closed-loop sensor over a typical part of the zone it controls, looking down at desks, with the window and sun patches out of its view. Then calibrate it against a lux meter reading at the task, on a day with some daylight, and record the setting. If the zone is too deep for one sensor to represent it, the zone needs splitting, not the sensor moving closer to the light."
        />

        <SectionRule />
        <ContentEyebrow>What the approved document expects</ContentEyebrow>

        <ConceptBlock
          title="Approved Document L on lighting controls"
          plainEnglish="For non-domestic buildings in England, the approved document expects lighting to turn itself off in spaces nobody is using, to respond to daylight where there is plenty of it, and to be metered."
          onSite="When a lighting controls specification looks generous, these paragraphs are usually why. Leaving a sensor out ‘to save time’ can leave the building short of what its compliance assumed."
        >
          <p>
            Approved Document L Volume 2 covers non-domestic buildings in England. The 2021 edition
            is the one in force now; the 2026 edition takes effect on 24 March 2027, and renumbers
            the same rules. The paragraphs that matter for this page are:
          </p>
          <ul>
            <li>
              <strong>Paragraph 6.62</strong> (5.68 from 24 March 2027) points lighting controls in
              new and existing buildings to the Building Research Establishment&rsquo;s Digest 498,{' '}
              <em>Selecting lighting controls</em>.
            </li>
            <li>
              <strong>Paragraph 6.63</strong> (5.69 from 24 March 2027) expects automatic controls
              that switch general lighting off when a space is not in use, giving presence detection
              as the example. They should be fitted in all spaces that are not normally occupied (in
              the document&rsquo;s sense, places such as corridors, toilets and stores, where nobody
              stays for long), and in occupied spaces where they suit the way the space is used.
            </li>
            <li>
              <strong>Paragraph 6.64</strong> (5.71 from 24 March 2027) expects daylight controls,
              such as photo-switching and dimming, for general lighting in the parts of occupied
              spaces likely to receive high levels of natural light.
            </li>
            <li>
              <strong>Paragraph 6.61</strong> (5.66 from 24 March 2027) expects lighting to be
              metered. One accepted route is a lighting management system that can calculate the
              energy used and make that information available to a building management system.
            </li>
          </ul>
          <p>
            The 2026 edition also adds two lighting paragraphs that apply from 24 March 2027.
            Paragraph 5.70 covers hotel bedrooms: key-card switches and/or automatic occupancy
            detection to turn lights off when the room is empty. Paragraph 5.75 expects fixed
            external lighting on new buildings to switch off automatically in daylight hours and
            when the building is not in operational use at night, unless lighting is essential for
            safety or security, or the luminaire (or group on one sensor) draws less than 4 W.
          </p>
          <p>
            Two things are worth noticing. The approved document says what outcome is wanted (lights
            off when spaces are unused, response to daylight where it is high) rather than which
            sensor to use. And it is statutory guidance on how to meet the Building Regulations,
            which is why a building control body will look for it. Wales and Scotland have their own
            documents; check the right one for the site.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Connecting sensors to the system</ContentEyebrow>

        <ConceptBlock
          title="Sensors report; controllers decide"
          plainEnglish="In a DALI-2 system a sensor does not switch anything. It tells the application controller what it has seen, and the controller decides what the lights do."
          onSite="If a sensor’s indicator shows detection but the lights do nothing, the sensor is probably fine. Look at the controller’s logic and the group the sensor is linked to."
        >
          <p>
            Simple stand-alone sensors have a relay or a 1–10 V output and switch or dim the
            lighting themselves. In DALI-2 systems, the roles are split. Occupancy sensors are
            defined in Part 303 of the DALI-2 specification and light sensors in Part 304. Both are{' '}
            <strong>input devices</strong>: they only report. An occupancy sensor sends events such
            as occupied, vacant, movement and no movement; a light sensor reports its measured
            level. An <strong>application controller</strong> receives those reports and commands
            the drivers (the control gear).
          </p>
          <p>
            Some products combine a sensor and an application controller in one housing, which blurs
            the line on site, but the two jobs are still separate in the system. That matters when
            you are fault-finding: a sensor can be working perfectly while the controller ignores it
            because it has been linked to the wrong group.
          </p>
          <p>Some practical points for the installer:</p>
          <ul>
            <li>
              Many DALI sensors are powered from the two-wire DALI bus itself, so they need no
              separate supply. They do add to the load on the bus power supply, which the designer
              should have allowed for.
            </li>
            <li>
              A single DALI system has room for 64 control gear (drivers) and 64 control devices
              (sensors, switches and controllers), each with its own address. A single input product
              can hold up to 32 ‘instances’ on one address, such as an occupancy sensor and several
              push-buttons in one unit.
            </li>
            <li>
              Label each sensor with its address and zone as you fit it. Finding which ceiling
              sensor is ‘occupancy sensor 17’ after the ceiling is closed is slow work.
            </li>
          </ul>
        </ConceptBlock>

        <ConceptBlock
          title="What the BMS takes from the lighting system"
          plainEnglish="The lighting system controls the lights. The BMS usually just reads from it: who is where, what is on, how much energy it is using, and what has failed."
          onSite="When the controls engineer asks for occupancy points from the lighting gateway, find out what they will use them for. It tells you how much it matters if a sensor is badly sited."
        >
          <p>
            In most commercial buildings the lighting control system is a system in its own right,
            with its own controllers and software, and it talks to the BMS through a gateway
            (Section 5.5 covers gateways). The BMS rarely controls the lighting directly. What it
            usually takes is:
          </p>
          <ul>
            <li>
              <strong>Occupancy by zone</strong>, so it can set heating, cooling or ventilation back
              in empty areas. The same sensor that switches the lights off can tell the BMS a floor
              has emptied. A badly sited sensor then wastes heating as well as light.
            </li>
            <li>
              <strong>Lighting energy</strong>, which supports the metering expected by paragraph
              6.61 (5.66 from 24 March 2027).
            </li>
            <li>
              <strong>Faults and status</strong>, such as failed drivers or emergency luminaire test
              results, covered in Section 4.1.
            </li>
            <li>
              <strong>Overrides</strong>, such as an after-hours ‘all off’ sweep from the BMS time
              schedule, or a ‘building occupied’ flag for cleaners.
            </li>
          </ul>
          <p>
            Occupancy sensors are part of the lighting and HVAC controls. They are never part of the
            fire detection system or the security system, even when they look similar on the
            ceiling. Do not let anyone treat a lighting detector as an intruder alarm or a
            people-in-the-building record for evacuation.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-4-2-input-device"
          question="A DALI-2 occupancy sensor shows a detection on its indicator, but the luminaires in its zone stay off. What is the most likely place to look first?"
          options={[
            'The sensor’s lens, which may be dirty',
            'The mains supply to the sensor',
            'The occupancy sensor’s own relay output',
            'The controller logic and the group the sensor is in',
          ]}
          correctIndex={3}
          explanation="The indicator shows the sensor has detected someone and is reporting it. In DALI-2 the sensor only reports; the application controller decides what the lights do. So the likely fault is in the controller’s logic or the group linking. A dirty lens would stop detection, which the indicator shows is happening, and a DALI-2 input device has no relay output to switch the lights."
        />

        <SectionRule />
        <ContentEyebrow>Commissioning</ContentEyebrow>

        <ConceptBlock
          title="Setting sensors up so they stay set up"
          plainEnglish="Commissioning sensors means walking every room, proving each detector sees what it should and nothing it should not, and calibrating each light sensor against a real measurement."
          onSite="Write down every setting you leave: hold time, sensitivity, mode, light target and the lux reading you calibrated against. When the complaint comes six months later, that record is the difference between a ten-minute fix and a day of guesswork."
        >
          <p>For occupancy sensors:</p>
          <ul>
            <li>
              <strong>Confirm the mode</strong> for each room, presence or absence, against the
              specification.
            </li>
            <li>
              <strong>Walk test.</strong> Most sensors have a test mode with a very short hold time
              and an indicator. Walk the edges of the coverage area, sit at the furthest desks and
              make small movements, and stand in the doorway and the corridor outside to prove the
              sensor does <em>not</em> see there.
            </li>
            <li>
              <strong>Set sensitivity</strong>, especially for microwave sensors, until the coverage
              matches the room and stops at its walls.
            </li>
            <li>
              <strong>Set the hold time</strong> to the specification, and remember the 20 minute
              limit behind any LENI occupancy credit. Then take the sensor out of test mode, which
              is an easy step to forget.
            </li>
          </ul>
          <p>For light sensors:</p>
          <ul>
            <li>
              <strong>Set the target</strong> to the design illuminance for the task, from the
              lighting design, not from memory.
            </li>
            <li>
              <strong>Calibrate at the task.</strong> Measure the illuminance on the working plane
              with a lux meter, with the electric lighting at a known level, and set the sensor so
              its reading corresponds. Many systems calibrate once with no daylight (after dark) and
              check again with daylight present.
            </li>
            <li>
              <strong>Check the response speed.</strong> Adjustments should be slow enough that
              nobody notices them. Fast dimming as clouds pass is distracting and leads to sensors
              being covered up.
            </li>
            <li>
              <strong>Prove the switch-off level and deadband</strong> on any photo-switched zone,
              so it does not cycle on and off around the threshold.
            </li>
          </ul>
          <p>
            Sensors are often commissioned before furniture arrives. Partitions, tall cabinets and
            new floor finishes change what a sensor sees, so a quick re-check once the space is
            fitted out and occupied is worth building into the programme.
          </p>
        </ConceptBlock>

        <Scenario
          title="Exam season, and the lights go out"
          situation="A secondary school sports hall is used for exams in the summer term. Halfway through the first paper, the lighting at one end of the hall switches off. Candidates are sitting still and writing. The site manager’s first instinct is to put every sensor in the hall into permanent ‘on’ for the rest of exam season."
          whatToDo="Get the lights back on for the exam using the override provided, then investigate after the session. Check which sensors cover that end, their type and hold time, and whether new exam desk layouts left rows outside their coverage. The likely cause is PIRs seeing too little movement from seated candidates, made worse by a short hold time. Options include sensors that also detect small movements, re-aiming or adding sensors to cover the desk rows, and a scheduled ‘exam mode’ that holds the lights on for the booked hours and then returns to automatic. Record what you changed and agree with the school who switches exam mode on and off."
          whyItMatters="Leaving every sensor in permanent ‘on’ fixes the symptom and quietly removes the occupancy control the building was designed and signed off with. Months later the hall is lit all evening for nobody. The right fix keeps automatic control for normal use and deals with the special case properly."
        />

        <CommonMistake
          title="Fixing every occupancy complaint by turning up the hold time"
          whatHappens="A user complains that the lights go off on them. The quickest change is to turn the hold time to maximum. The complaint stops, but the lights now stay on long after rooms empty, the building can lose occupancy credit it was designed with, and the real cause, a sensor that cannot see the user, is still there."
          doInstead="Find out why the sensor stopped seeing the person. Check where they sit, which way they face, what is between them and the sensor, and what type of sensor it is. Fix coverage first: re-site, add a sensor, change the lens or move to a type that detects small movements. Only adjust the hold time within the specification, and record the change."
        />

        <FAQ
          items={[
            {
              question:
                'Can I mix sensors from one manufacturer with a DALI controller from another?',
              answer:
                'With DALI-2 that is the intention: occupancy and light sensors built to Parts 303 and 304 are meant to work with any DALI-2 application controller that supports those input device types. Check the controller’s specification lists support for them before you assume it. Older DALI version 1 systems have no standard sensor type, so sensors there tend to be tied to one manufacturer’s system.',
            },
            {
              question: 'Is a combined occupancy and light sensor always a good idea?',
              answer:
                'It saves a ceiling position and wiring, and it is often fine. The catch is that the best place to see people and the best place to measure daylight are not always the same. In a deep perimeter zone you may get better results from occupancy sensors placed for coverage and a separate light sensor placed for a representative reading.',
            },
            {
              question: 'Should a daylight sensor be set to the same light level everywhere?',
              answer:
                'No. The target comes from the lighting design for each space and task. A corridor, an open-plan office and a drawing studio will have different design illuminances. Take each target from the design, and calibrate each sensor against a lux meter reading in that space.',
            },
            {
              question: 'Do I need daylight dimming in a room with no windows?',
              answer:
                'There is no daylight to respond to, so daylight dimming does nothing useful there. Occupancy control still applies, and constant illuminance may still be specified, because it deals with luminaire ageing rather than daylight.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'PIR sensors detect warm bodies moving across their zones. They are poor at seeing still people and movement straight towards them, and they need line of sight.',
            'Microwave sensors detect any movement, including small ones, but can see through thin walls, doors and glass. Sensitivity must be set on every one.',
            'Presence detection switches on and off automatically; absence detection leaves switching on to the occupant. Both switch off automatically.',
            'Closed-loop daylight sensors measure reflected light at the ceiling, so they must be sited away from windows and lamps and calibrated against a lux meter at the task.',
            'Approved Document L expects automatic switch-off in unused spaces, daylight controls where natural light is high, and metered lighting. LENI only credits occupancy control that switches off within 20 minutes.',
            'In DALI-2, sensors only report; the application controller decides. The BMS usually reads occupancy, energy and faults from the lighting system rather than controlling it.',
            'Fix complaints at the cause. Re-site or change the sensor before reaching for a longer hold time, and record every setting you leave.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself" />

        <PrevNext
          noun="section"
          prevHref="/study-centre/upskilling/bms-module-4-section-1"
          prevLabel="Lighting control"
          nextHref="/study-centre/upskilling/bms-module-4-section-3"
          nextLabel="Access control interfaces"
        />
      </HubBody>
    </HubPage>
  );
};

export default BMSModule4Section2;
