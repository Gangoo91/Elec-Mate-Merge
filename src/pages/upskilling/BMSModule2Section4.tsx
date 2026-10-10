/**
 * BMS Module 2 · Section 4 — Siting sensors and getting true readings
 *
 * Rebuilt 10 Oct 2026 on the learning primitives. The page teaches that a sensor has to measure
 * the conditions at the point the control strategy cares about, then works through siting and
 * installation for room, outdoor, pipe, duct, pressure and flow sensors, the installation habits
 * that keep a sensor maintainable for its life (drip loops, spare cable, access, labelling,
 * concealed sensors recorded), and what calibration actually means on a BMS: comparison with a
 * known value at the sensor, offsets, as-found and as-left records, and proving a suspect reading
 * before blaming the controller. The old page carried a set of invented clearances and figures
 * (corner, door and window distances, duct-diameter rules, a minimum duct velocity, solar-gain
 * errors, CO2 calibration ppm values, PIR mounting heights and radiator distances). All of those
 * are gone; the only distances left are the ones a sourced siting guide prints.
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

const TITLE = 'Siting sensors and getting true readings | BMS Module 2.4 | Elec-Mate';
const DESCRIPTION =
  'Where to fit room, outdoor, pipe, duct and pressure sensors so the BMS sees the truth, how to install them to last, and how to check and calibrate a reading.';

const outcomes = [
  'Explain why a sensor must represent the conditions at the point the control strategy is trying to hold, not just the spot it is screwed to',
  'Choose a sound position for a room, CO2 or outdoor sensor and name the influences that make a wall position give false readings',
  'Install pipe, duct and pressure sensors so the sensing element is fully in the medium, clear of stratification and turbulence, and not affected by the building fabric',
  'Fit any sensor so it can be reached, withdrawn, identified and replaced without disturbing the wiring or the plant',
  'Describe calibration as comparison with a known value at the sensor, and say what as-found and as-left records are for',
  'Work through a suspect reading in a sensible order: the siting, the installation, the wiring, then the sensor itself',
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A room sensor reads at setpoint and the BMS is satisfied, but the people in the room say it is cold. The sensor is on an internal wall with its cable dropping out of an unsealed conduit from a warm ceiling void. What is the most likely explanation?',
    options: [
      'The outstation input has drifted and needs replacing',
      'The setpoint is wrong and should be raised by the controls engineer',
      'Warm air from the void is reaching the sensor through the conduit',
      'Room sensors always read high and need a fixed offset',
    ],
    correctIndex: 2,
    explanation:
      'An open conduit is a chimney. Air from the void flows down it and across the back of the sensor, so the sensor reports the void, not the room. Sealing the conduit is the fix. Changing the setpoint or adding an offset would hide a siting fault rather than cure it, and the outstation is the last thing to suspect, not the first.',
  },
  {
    id: 2,
    question:
      'You are asked to fit a space temperature sensor in an open-plan office. Which position is the best starting point?',
    options: [
      'On an internal wall at about 1.5 m, clear of heat and sun',
      'On the external wall under the window, where it loses most heat',
      'Above the radiator, so it sees the heating respond quickly',
      'In an alcove by the door, where it is protected from damage',
    ],
    correctIndex: 0,
    explanation:
      'The sensor should see the air people actually sit in: an open internal wall at around 1.5 m, at least 500 mm from the adjacent wall, away from heat sources, sun and draughts. The external wall, the radiator and the alcove each give the sensor its own local climate, which is exactly what you are trying to avoid.',
  },
  {
    id: 3,
    question:
      'A clamp-on sensor on a heating flow pipe reads several degrees below the immersion sensor next to it. The pipe is painted and the sensor was strapped on dry. What is the right fix?',
    options: [
      'Apply a software offset to make the two readings agree',
      'Swap the clamp-on sensor for another of the same type',
      'Move the clamp-on sensor further down the pipe',
      'Clean to bare metal, add compound and insulate over it',
    ],
    correctIndex: 3,
    explanation:
      'A surface sensor only works if heat can get from the pipe into it. Paint, dirt and an air gap insulate it, and an uninsulated sensor is also being cooled by the room. Clean contact, heat-conductive compound and insulation over the top fix the cause. An offset would only be right at one load and one room temperature.',
  },
  {
    id: 4,
    question:
      'Why should a temperature sensor be kept a good distance downstream of the point where two flows at different temperatures meet?',
    options: [
      'Because sensors are damaged by sudden changes in temperature',
      'Because the streams have not blended yet at that point',
      'Because the pressure is too high close to the mixing point',
      'Because the pipework is often too narrow near a mixing point',
    ],
    correctIndex: 1,
    explanation:
      'Just after a mixing point the fluid is stratified: hot and cold streams sit side by side. A sensor there reads whichever layer it happens to sit in, and the controller hunts. Give the flows distance to blend, and the sensor reads the true mixed temperature.',
  },
  {
    id: 5,
    question:
      'A duct-mounted temperature sensor in a large supply duct reads well below the average when you traverse the duct with a probe. What should you check first?',
    options: [
      'Whether the duct is properly insulated along its whole length',
      'Whether the outstation input is set to the right sensor type',
      'Whether a spot probe was fitted where averaging is needed',
      'Whether the supply fan is running at its full design speed',
    ],
    correctIndex: 2,
    explanation:
      'A probe measures one spot. In a big duct, or one prone to stratification, that spot can be well away from the average. An averaging sensor spread across the full cross-section is the right device. A wrong sensor type setting would normally give a wildly wrong value everywhere, not a plausible low one.',
  },
  {
    id: 6,
    question:
      'You are fitting a static pressure tip for a duct pressure sensor. How should the tip sit in the duct?',
    options: [
      'Parallel to the airflow, not sticking out across it',
      'Facing into the airflow to catch the full pressure',
      'Across the duct at right angles, on the centre line',
      'Facing downstream, so dust cannot block the opening',
    ],
    correctIndex: 0,
    explanation:
      'Static pressure tips are fitted parallel to the airflow. A tip facing into the air also picks up velocity pressure, so it reads high. One facing downstream reads low. A tip across the flow disturbs the air it is meant to measure.',
  },
  {
    id: 7,
    question:
      'Differential pressure tubes from a duct in a plant room run across a cold roof to the sensor. In winter the reading freezes at one value. What has most likely happened?',
    options: [
      'The sensor has failed and must be replaced',
      'The outstation has frozen its last good value after a fault',
      'The sensor is over-ranged and has latched',
      'Condensate in the tube has frozen and blocked it',
    ],
    correctIndex: 3,
    explanation:
      'Moist air in a tube that passes through a cold place condenses, and the condensate can freeze and block the tube. Route tubes away from open air and cold areas, fall them to a drain point below the sensor and tapping where condensation is a risk, and the problem does not return.',
  },
  {
    id: 8,
    question:
      'You are fitting a sensor that will end up above a suspended ceiling. Which step matters most for whoever has to maintain it?',
    options: [
      'Writing the point reference directly on the sensor body',
      'Marking its position and recording it in the site records',
      'Fitting it as close to the outstation as the cable allows',
      'Terminating it with no slack, so the cable cannot be pulled',
    ],
    correctIndex: 1,
    explanation:
      'A concealed sensor that nobody can find is a sensor nobody will check. Mark its location visibly and record it in the documentation. Write the reference on a plate beside the sensor rather than on the sensor itself, because the label then survives a replacement. Leave spare cable so it can be withdrawn without disconnecting.',
  },
  {
    id: 9,
    question:
      'To check a room sensor, someone compares its reading with a thermometer held on the far side of the room. What has that comparison tested?',
    options: [
      'The sensor’s calibration alone, at that point',
      'Siting and sensor together, not calibration',
      'Nothing, as a room is never at one temperature',
      'The input scaling only, not the sensor itself',
    ],
    correctIndex: 1,
    explanation:
      'Calibration means comparing against a known value at the sensor itself. A thermometer across the room also tests whether the sensor is sited to represent the room. That is useful, but it is not calibration. It does test something, and it cannot separate a scaling error from a sensor error.',
  },
  {
    id: 10,
    question:
      'On a calibration visit you find a sensor reading off, adjust it, and record only the final, corrected value. What have you lost?',
    options: [
      'The as-found value, showing how far it had drifted',
      'Nothing, because the corrected value is the one that matters',
      'The manufacturer’s warranty cover on the sensor itself',
      'The ability to adjust the sensor again at the next visit',
    ],
    correctIndex: 0,
    explanation:
      'Recording what you found as well as what you left is how drift is tracked over time. A sensor that needs a bigger correction at every visit is telling you it is failing. If only the as-left value is written down, that warning is invisible.',
  },
];

const BMSModule2Section4 = () => {
  useSEO(TITLE, DESCRIPTION);
  return (
    <HubPage>
      <HubMasthead
        section="Module 2 · Section 4"
        title="Siting sensors and getting true readings"
        backTo="/study-centre/upskilling/bms-module-2"
      />
      <HubBody>
        <p className="max-w-3xl text-[15px] leading-relaxed text-white lg:text-[17px]">
          This section covers where each type of sensor goes, how it is fitted and how you prove
          what it says. On site, a good sensor in the wrong place gives the BMS a steady, believable
          and wrong reading.
        </p>

        <TLDR
          points={[
            'A BMS can only control what its sensors tell it. If the sensor does not represent the space, pipe or duct the strategy is trying to hold, the plant will be controlled perfectly to the wrong value.',
            'Room sensors go on an open internal wall at about 1.5 m, at least 500 mm from the adjacent wall, away from heat sources, sunlight, external doors and draughts, including draughts down the cable conduit.',
            'Pipe and duct sensors must have their whole active length in the medium, sit clear of mixing points and turbulence, and be fitted without crushing the insulation.',
            'Fit every sensor so it can be reached, withdrawn and replaced: drip loop, spare cable, safe access, a label plate beside it, and concealed positions recorded.',
            'Calibration is a comparison with a known value, done at the sensor. Record what you found and what you left, and suspect siting and wiring before the sensor.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <SectionRule />
        <ContentEyebrow>The point of a sensor</ContentEyebrow>

        <ConceptBlock
          title="A sensor has to represent the thing being controlled"
          plainEnglish="The BMS believes its sensors completely. If the sensor is in the wrong place, the BMS will hold the wrong place at the right temperature."
          onSite="Before you fix anything, ask what the sensor is meant to represent: the room, the water leaving the boiler, the air leaving the coil. Then ask whether, where it sits, it can see that."
        >
          <p>
            Section 2.2 covered what sensors are. This page is about where they go and how they are
            fitted, because that is where most bad readings come from. The sensor element itself is
            rarely the problem. A thermistor reports the temperature of whatever it is touching,
            faithfully and every second. The question is whether what it is touching is the thing
            the control loop is trying to hold.
          </p>
          <p>
            Every control loop has a <strong>reference point</strong>: the place where the
            controlled condition actually matters. For a room it is the air people sit in. For a
            heating circuit it is the mixed water going out to the emitters. For a supply air
            temperature it is the air leaving the coil, once it has blended. A sensor that sits
            beside the reference point but not in it will report something that tracks it loosely,
            and the loop will be built on that error.
          </p>
          <p>
            Poor siting shows up in three ways. The space or plant does not reach the conditions
            people expect, so there are complaints. The plant works harder than it needs to, so
            energy is wasted. And the loop is unstable, because the sensor is reacting to a local
            effect, such as the sun on a wall or a radiator below it, instead of the space as a
            whole.
          </p>
          <p>
            None of that can be fixed in software. An offset or a changed setpoint can make one
            reading look right at one moment, but the error moves with the weather, the load and the
            time of day. The cure is always to put the sensor where it can see the truth.
          </p>
        </ConceptBlock>

        <Pullquote>
          The plant will be controlled exactly to what the sensor says. Your job is to make sure
          what the sensor says is true.
        </Pullquote>

        <SectionRule />
        <ContentEyebrow>Rooms and occupied spaces</ContentEyebrow>

        <ConceptBlock
          title="Room sensors: see the room, not the wall"
          plainEnglish="Put it where a person would stand, on an inside wall, away from anything that is warmer, colder or draughtier than the room."
          onSite="Stand where the sensor is going and look around. A printer, a radiator, a sunny window, an external door or an alcove nearby are all reasons to move it."
        >
          <p>
            A space temperature sensor should sit at roughly <strong>1.5 m</strong> above the floor
            in an occupied space and at least <strong>500 mm</strong> from the adjacent wall. Within
            that, the job is to keep it away from anything with its own climate:
          </p>
          <ul>
            <li>
              <strong>Heat sources:</strong> above radiators, near lamps, and near equipment such as
              printers, photocopiers and monitors. These warm the sensor, the BMS thinks the room is
              warm, and the heating backs off.
            </li>
            <li>
              <strong>The sun:</strong> solar radiation falling on a sensor heats it well above the
              air around it.
            </li>
            <li>
              <strong>External doors and curtains:</strong> next to an outside door the sensor sees
              every blast of cold air; behind a curtain it sees a pocket of still air cut off from
              the room.
            </li>
            <li>
              <strong>External walls, recesses and alcoves:</strong> an external wall is colder than
              the room, and an alcove holds air that does not mix with the rest of the space.
            </li>
            <li>
              <strong>Walls hiding hot water pipes:</strong> the sensor reads the pipe through the
              plaster.
            </li>
          </ul>
          <p>
            Two installation details catch electricians out more than any other. First, on a solid
            wall of concrete or steel, fit the sensor on a{' '}
            <strong>thermally insulated backing</strong>, otherwise it reads the mass of the wall
            rather than the air. Second, <strong>seal the conduit and the wall cavity</strong>{' '}
            behind the sensor. An open conduit or cavity carries air from a ceiling void, riser or
            outside wall straight onto the back of the sensor.
          </p>
          <p>
            In a large space one sensor may not be enough, and more than one may be needed. Where a
            sensor in the space itself is not practical, the extract air temperature can give a fair
            indication of average conditions in the room. Where radiant panels heat the space, a
            radiant or black bulb sensor is used, with a line of sight to the panel it controls but
            not placed right beside a radiant source.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-2-4-room"
          question="Which of these is the strongest reason to move a room sensor that has already been fitted?"
          options={[
            'It is on an internal wall at about 1.5 m',
            'It is on the wall directly above a radiator',
            'It is clear of the corner by more than 500 mm',
            'It is on a plain wall away from the windows',
          ]}
          correctIndex={1}
          explanation="Above a radiator, rising warm air reaches the sensor before it reaches the room, so the BMS thinks the room is up to temperature and cuts the heat. The other three describe a well-sited sensor."
        />

        <ConceptBlock
          title="CO2, air quality and occupancy sensors"
          plainEnglish="An air quality sensor should breathe the same air as the people. An occupancy sensor should look across the way people move, not straight down the line they walk."
          onSite="A CO2 sensor beside a supply diffuser or an opening window is reading fresh air, not the room. Expect the ventilation to run too little."
        >
          <p>
            A CO2 reading is used as a stand-in for how many people are in a space, so the BMS can
            raise or lower the ventilation rate. For that to work, the sensor has to sample air that
            represents the room. A room-mounted sensor belongs on an open wall at about{' '}
            <strong>1.5 to 1.8 m</strong> above the floor. Where the sensor is duct-mounted instead,
            it goes in the <strong>extract</strong> duct, as near as practical to where the air
            leaves the room, so the reading has not been diluted further down the system.
          </p>
          <p>
            Mixed gas or VOC sensors give a rough indication of whether the air is clean or not.
            Treat them as an indicator, not a precise measurement.
          </p>
          <p>
            PIR occupancy sensors detect the heat of a moving body. They respond far better to
            someone crossing their field of view than to someone walking straight at them, so aim
            them across the route people take through the room. A single sensor may not cover an
            awkward space, and different lenses suit different jobs, so check the layout against the
            coverage pattern in the manufacturer’s data.
          </p>
        </ConceptBlock>

        <Scenario
          title="The classroom that was always too warm on paper"
          situation="A secondary school complains that a south-facing classroom is cold every morning, yet the BMS trend shows it at setpoint from first thing. The room sensor is on the wall beside the window, its cable coming down in surface conduit from the ceiling void, and the radiator is below the window."
          whatToDo="Do not touch the setpoint. Check the reading against a calibrated thermometer held in the middle of the room at sitting height, then at the sensor. If they disagree, the sensor is seeing something the room is not. Here it has three problems: morning sun on the sensor, warm air rising off the radiator, and an unsealed conduit from the void. Agree a new position on an internal wall with the controls engineer, seal the conduit entry, extend the cable and record the change."
          whyItMatters="Raising the setpoint to cover a badly sited sensor would make the room too hot on cloudy days and waste heat all year. The fix is the sensor position, and once it is right the existing strategy works as designed."
        />

        <SectionRule />
        <ContentEyebrow>Outside the building</ContentEyebrow>

        <ConceptBlock
          title="Outdoor sensors: shade, free air and nothing warm nearby"
          plainEnglish="The outside air sensor drives weather compensation and frost protection for the whole site. If it sits in the sun or over a warm vent, the building thinks it is a nicer day than it is."
          onSite="Before you fix an outside air sensor, look up and around: windows, extract louvres, ventilation shafts and boiler flues all put out warm air."
        >
          <p>
            Outdoor sensors need to be weather resistant, and specialist versions are made for the
            job. Their position matters more than any other sensor on the site, because one reading
            often sets the heating curve, the frost protection and the optimum start for the whole
            building.
          </p>
          <ul>
            <li>
              <strong>Keep it out of direct sun.</strong> In the UK that usually means a north- or
              north-west-facing wall, out of reach, and away from flues, louvres and opening
              windows. Sun and shadow moving across a sensor make its reading swing for reasons that
              have nothing to do with the air.
            </li>
            <li>
              <strong>Not above windows, extract louvres or ventilation shafts.</strong> Warm air
              leaving the building rises past the sensor.
            </li>
            <li>
              <strong>Let the air move freely.</strong> A flat roof position with a wind shield on
              the sensing point is a sound choice where it is practical.
            </li>
          </ul>
          <p>
            Where a site has a weather station for temperature, humidity, wind, sun and rain, its
            mast is usually around <strong>2 m</strong> above the building, clear of the building’s
            own shade and of trees, and it has to satisfy any planning requirements. Solar sensors
            used for blind or zone control go on the facade they are controlling, because each face
            of the building sees a different sun.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Pipes and water</ContentEyebrow>

        <ConceptBlock
          title="Immersion and clamp-on sensors on pipework"
          plainEnglish="The sensor must sit in the moving water, deep enough to read the middle of the flow, with good thermal contact to its pocket."
          onSite="Before the mechanical fitter fills the system, check that the pocket is long enough for the sensor you have, and that it faces into the flow."
        >
          <p>
            For water temperatures, an immersion sensor in a pocket (also called a thermowell) is
            usually the best option. The pocket keeps the system sealed when the sensor is
            withdrawn. To get a true reading:
          </p>
          <ul>
            <li>
              The <strong>whole active length</strong> of the sensor must be in the water, and the
              sensor must be a good fit in its pocket. A short sensor in a long pocket reads the air
              at the top.
            </li>
            <li>
              Use <strong>conductive paste</strong> in the pocket so heat transfers well from the
              pocket wall to the element.
            </li>
            <li>
              Where the pocket goes into a <strong>bend</strong>, point it towards the direction of
              flow.
            </li>
            <li>
              Fit the pocket so it <strong>cannot collect water</strong>.
            </li>
            <li>
              Size the sensor so it reaches the <strong>heart of the flow</strong>, not just the
              slow water at the pipe wall.
            </li>
            <li>
              Keep it a good distance after any <strong>mixing point</strong>, such as a three-port
              valve or a bypass, so the streams have blended.
            </li>
          </ul>
          <p>
            A pocket adds mass round the sensor, so a sensor in a pocket responds more slowly than a
            bare element. That is normally acceptable on heating and cooling water, but it is why a
            loose, dry fit makes things worse: the sensor lags even further behind the water.
          </p>
          <p>
            On chilled water, the insulation round the pocket must be fully vapour sealed, or
            condensation forms round it. When drilling for pockets or tank entries, keep swarf out
            of the system, and on a tank, check with the manufacturer before breaching it at all.
          </p>
          <p>
            A <strong>clamp-on</strong> sensor is the fallback where an immersion pocket is not
            practical. It only works with a smooth, clean contact surface, heat-conductive compound
            filling the gap between sensor and pipe, and insulation over the top to keep the room
            from cooling it.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-2-4-mixing"
          question="An immersion sensor on a heating flow reads several degrees below the water and is slow to respond. The pocket is deep and the sensor is short. What is the most likely cause?"
          options={[
            'Its element sits above the water in the pocket',
            'The pocket has too much conductive paste in it',
            'The sensor is too far downstream of the boiler',
            'The input is set for three-wire, not two-wire',
          ]}
          correctIndex={0}
          explanation="The whole active length must be in the water. A short sensor in a long pocket reads the air at the top of the pocket, so it reads low and lags. Paste improves heat transfer rather than spoiling it, a few metres of flow pipe makes little difference, and a wiring setting error on a platinum sensor would not give this lagging pattern."
        />

        <CommonMistake
          title="Strapping a clamp-on sensor to a painted pipe and walking away"
          whatHappens="The sensor touches the pipe at one line through a coat of paint, with an air gap either side and nothing over it. It reads somewhere between the water and the plant room, and lags behind changes. The boiler or valve is then controlled to a number that is neither."
          doInstead="Clean to a smooth, bare contact surface, use heat-conductive compound to fill the gap, fix the sensor firmly and insulate over it. Where accuracy really matters, ask for an immersion pocket instead."
        />

        <SectionRule />
        <ContentEyebrow>Ducts and air handling plant</ContentEyebrow>

        <ConceptBlock
          title="Duct sensors: spot, averaging, and the insulation"
          plainEnglish="Air in a duct is not the same temperature all the way across. A single probe reads one spot; an averaging sensor reads the whole width."
          onSite="Where a duct is lagged, use a mounting flange or spacers so the sensor sits on the duct without squashing the insulation flat."
        >
          <p>
            A <strong>probe</strong> sensor gives a spot reading at its tip. That is fine in a
            small, well-mixed duct, but poor in a duct prone to temperature layering or heavy
            turbulence, such as just after a heating or cooling coil or where fresh and return air
            meet. There, a <strong>duct averaging</strong> sensor is needed. It carries several
            sensing points, or a capillary that averages along its whole length, across the section
            of the duct.
          </p>
          <p>For averaging and capillary sensors:</p>
          <ul>
            <li>
              Spread the element <strong>evenly over the full cross-section</strong> of the duct,
              and secure it so it cannot vibrate.
            </li>
            <li>
              Do not bend the capillary tighter than a <strong>50 mm</strong> radius, and use the
              fixing clips the manufacturer recommends.
            </li>
            <li>
              Where the sensor has separate sensing points along its length, make sure every one of
              them is inside the duct, not in the insulation or the plant room.
            </li>
          </ul>
          <p>
            A duct humidity sensor downstream of a humidifier must read the moisture in the air, not
            droplets carried over from the humidifier. Site it where any carry-over has had time to
            be absorbed. Humidity sensors in general need their element kept dry, and some are
            damaged over time by solvents in laboratories, chlorine at swimming pools and
            disinfectants in hospitals, so check the sensor suits the air it will live in.
          </p>
          <p>
            Where a duct is insulated, avoid crushing the lagging round the sensor. Use a
            stepped-diameter mounting flange or spacing bushes so the sensor sits at the right depth
            and the insulation stays intact. A sealable test hole beside the duct sensor lets
            whoever calibrates it later put a reference probe in the same airstream.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Pressure and flow sensors: calm air, clear tubes"
          plainEnglish="Pressure readings are only as steady as the air or water at the tapping point. Put the tapping in a straight, calm run and keep the tubes clear of water and frost."
          onSite="Fit pressure sensors the right way up and away from vibrating plant. Orientation and vibration both shift the reading."
        >
          <p>
            Pressure and differential pressure sensors are used for filter monitoring, fan proving,
            duct static pressure control and, with velocity probes or orifice plates, for working
            out flow. Their accuracy depends heavily on where the tapping is.
          </p>
          <ul>
            <li>
              <strong>Not in turbulent air.</strong> Give the tapping a long enough steadying run of
              straight duct without obstructions. After a bend, damper or fan the reading will be
              unsteady however good the sensor is.
            </li>
            <li>
              <strong>Static pressure tips</strong> should not stick out into the duct across the
              flow; they are fitted parallel to the airflow.
            </li>
            <li>
              <strong>Two sensors at one point</strong> should be fitted at the same place in the
              flow, and neither should block the air to the other.
            </li>
            <li>
              <strong>A test point near the sensor head</strong> lets the sensor be checked against
              a reference without disturbing the tubes.
            </li>
            <li>
              <strong>Condensation and frost.</strong> Where condensation is a risk, fit a drain
              lower than both the sensor head and the tapping. Do not run tubes through open air,
              cold rooms or cold ducts, where condensate can freeze and block them.
            </li>
            <li>
              Tubes that end in a room get a <strong>porous cover</strong> so they do not pick up
              dust or get blocked.
            </li>
          </ul>
          <p>
            Velocity and air flow sensing needs a straight run of duct away from fans and anywhere
            turbulence is likely. Single-point velocity sensors are cheap but less accurate;
            velocity probes with a differential pressure sensor are more accurate but need careful
            setting up. Electrothermal flow switches are the exception: they want a fast airstream,
            such as a narrower section of duct.
          </p>
          <p>
            On water, pressure tappings must be smooth inside with no burrs, the impulse pipework
            must be free of air locks, and a bypass with a stop valve may be needed so one side of a
            differential sensor is not overloaded when the sensor is being worked on. Check the
            sensor is rated for the system pressure and approved for the medium it will see.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-2-4-pressure"
          question="Where is the best place for the pressure tapping of a duct static pressure sensor?"
          options={[
            'In a straight section of duct with a clear steadying run before it',
            'Immediately after the supply fan outlet, where the pressure is highest',
            'Just after a volume control damper, so it sees the damper effect',
            'In the plant room, wherever the tube run is shortest',
          ]}
          correctIndex={0}
          explanation="A steady reading needs steady air. Straight after a fan or a damper the air is turbulent and the pressure at the tapping jumps about. A straight run with no obstructions before it gives a reading the controller can work with."
        />

        <SectionRule />
        <ContentEyebrow>Fitting it to last</ContentEyebrow>

        <ConceptBlock
          title="Install every sensor so the next person can find, test and replace it"
          plainEnglish="A sensor will need checking and one day replacing. Fit it so that job takes minutes, not a ceiling tile hunt and a rewire."
          onSite="Leave a coil of spare cable, put the label on the wall or duct beside the sensor, and write down where the hidden ones are."
        >
          <p>
            Whatever the sensor, fit it to the manufacturer’s instructions and the installation and
            safety rules that apply on the site. Before you fit it, find out what it will live in:
            the range of ambient temperature and humidity, the risk of water getting in, vibration,
            whether the area needs explosion-protected equipment, and outside influences like
            sunlight. Mount it the right way up, as orientation affects how some sensors work, and
            know which part of a probe is the active section and which is not.
          </p>
          <ul>
            <li>
              <strong>Protect it.</strong> Fit sensors where they will not be knocked or tampered
              with, and where they cannot hurt anyone.
            </li>
            <li>
              <strong>Drip loop.</strong> Form the cable into a loop below the entry so water runs
              off rather than into the sensor housing.
            </li>
            <li>
              <strong>Room to withdraw.</strong> Leave enough space round the sensor, and enough
              spare cable, to pull it out for maintenance or replacement without disconnecting the
              wiring.
            </li>
            <li>
              <strong>Safe access.</strong> Where possible, fit it so it can be reached safely
              without extra access equipment.
            </li>
            <li>
              <strong>Hidden sensors.</strong> Where a sensor goes in a ceiling void, riser or
              shaft, mark its position visibly and record it in the site documentation.
            </li>
            <li>
              <strong>Label plate beside it.</strong> Fit a plate close to the sensor with a plain
              text description and the reference used on the plant schematic. Do not write on the
              sensor itself, because the label goes in the bin with it at replacement time.
            </li>
          </ul>
          <p>
            Where a sensing probe or capillary passes through a wall, run it in a lined and
            insulated conduit. Through sheet metal, protect it with a rubber grommet. And where the
            route breaks through a fire compartment wall or floor, the hole has to be properly fire
            stopped, like any other service penetration.
          </p>
          <p>
            Wireless sensors are increasingly used, especially on retrofit and heritage jobs where
            cabling is hard. The same siting rules apply to them, plus one more: the radio has to
            reach. Coverage needs checking, and on some sites a survey is needed before the sensors
            are placed.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Labelling the sensor instead of the position"
          whatHappens="The point reference is written on the sensor cover in marker pen. Three years later the sensor is swapped, the old one goes in the skip with its label, and the new one is unmarked in a void with six others. The next engineer has to trace cables to find out which is which."
          doInstead="Fit a label plate on the duct, pipe or wall beside the sensor, with a plain description and the schematic reference. Record concealed positions in the site documentation, so the label and the record outlive any single sensor."
        />

        <SectionRule />
        <ContentEyebrow>Proving the reading</ContentEyebrow>

        <ConceptBlock
          title="Calibration means comparing with something you trust"
          plainEnglish="You cannot tell if a sensor is right by looking at the BMS. You find out by putting a known, trusted measurement beside it and comparing the two."
          onSite="Take your reference reading at the sensor, not across the room. A test hole beside a duct sensor or a test point on a pressure tube is there for exactly this."
        >
          <p>
            Calibration is a comparison against a known value. On a BMS that means a calibrated
            reference instrument, or a known pressure or temperature, applied{' '}
            <strong>at the sensor</strong>. Comparing a room sensor with a thermometer on the other
            side of the room tests the siting as well as the sensor, which is useful, but it is not
            calibration.
          </p>
          <p>
            Where a sensor reads consistently off, the outstation can correct it, either with an
            offset or with the resistance table for that sensor type. That is legitimate when the
            sensor is well sited and simply has a steady error. It is not a cure for a sensor in the
            sun or over a radiator, because that error is not steady.
          </p>
          <p>Two habits make calibration worth doing:</p>
          <ul>
            <li>
              <strong>Check after installation, even with a factory certificate.</strong> Many
              manufacturers calibrate before dispatch, but the reading still has to be checked once
              the sensor is fitted and wired.
            </li>
            <li>
              <strong>Record as-found and as-left.</strong> Write down what the sensor read before
              you touched it and after you finished. Comparing as-found values over several visits
              shows how fast a sensor is drifting, and a sensor that drifts more each time is
              usually heading for failure.
            </li>
          </ul>
          <p>
            Cleaning and calibration belong in the planned maintenance programme, at the intervals
            the manufacturer gives. Where sensor data is used to show performance for a building
            assessment scheme, the scheme’s own calibration requirements apply on top.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="When a reading looks wrong: work in order"
          plainEnglish="Siting, installation, wiring, then sensor, then the controller. The cheap and common causes first."
          onSite="Put a reference instrument at the sensor and a meter on the terminals. Two readings tell you whether the problem is in the air, the wire or the box."
        >
          <p>
            When the BMS shows a value nobody believes, resist the urge to swap the sensor. Most bad
            readings are not bad sensors. A sensible order is:
          </p>
          <ul>
            <li>
              <strong>Siting.</strong> Is the sensor seeing the conditions it is meant to represent?
              Check against a reference in the space or medium itself, then at the sensor.
            </li>
            <li>
              <strong>Installation.</strong> Is the element fully in the medium, with paste or
              compound where it should be? Is the conduit sealed? Are the pressure tubes clear,
              unkinked and free of water?
            </li>
            <li>
              <strong>Wiring.</strong> Is the sensor connected to the right input, with sound
              terminations? On resistance sensors, remember the cable is in the measurement.
            </li>
            <li>
              <strong>The sensor.</strong> Measure it at its terminals and compare with the
              manufacturer’s resistance or output table at the reference temperature or pressure.
            </li>
            <li>
              <strong>The controller.</strong> Is the input configured for the right sensor type and
              range? That is the controls engineer’s side, and Section 2.5 covers it.
            </li>
          </ul>
          <p>
            The cable point deserves a moment. A resistance sensor reports temperature as a change
            in ohms, and the controller sees the cable resistance added to the element. On a 100 Ω
            element, 2 Ω of cable is a meaningful slice of the reading. On a 50 kΩ thermistor the
            same 2 Ω is lost in the noise. That is one reason the sensor type, cable length and
            wiring method are chosen together, and why a poor termination that adds resistance shows
            up as a temperature error.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-2-4-calibration"
          question="A well-sited duct sensor reads steadily a little higher than a calibrated reference put through the test hole beside it, at every load. What is the sensible response?"
          options={[
            'Move the sensor to a different part of the duct',
            'Replace the sensor with a new one straight away',
            'Offset it, noting as-found and as-left values',
            'Raise the setpoint by the same amount instead',
          ]}
          correctIndex={2}
          explanation="A steady error on a well-sited sensor is what an offset is for. Recording before and after lets the next visit see whether the error is growing. Raising the setpoint hides the error and leaves the trend logs wrong, and moving or replacing a sound, well-sited sensor solves nothing."
        />

        <FAQ
          items={[
            {
              question:
                'The drawing shows the room sensor in a spot I know is wrong. Do I fit it there anyway?',
              answer:
                'Raise it before you fit it, not after. Explain why, for example the position is above a radiator or beside an external door, and suggest an alternative. The designer or controls engineer usually agrees straight away, and moving a sensor before decoration is far cheaper than moving it after the complaints start. Record what was agreed.',
            },
            {
              question: 'Can I fit a room sensor on a column or partition?',
              answer:
                'Often, yes, provided it is an internal surface at a sensible height, clear of heat sources, sunlight and draughts, and representative of the space. Check that the cable route is sealed so air from a void or riser cannot reach the back of the sensor. A metal or concrete column needs an insulated backing.',
            },
            {
              question: 'Why does the outdoor sensor matter so much?',
              answer:
                'On many sites one outside air reading drives the heating curve, frost protection and optimum start for the whole building. If it sits in the sun or above a warm louvre, the BMS thinks it is warmer outside than it is and under-heats the building, or delays frost protection. A few minutes choosing a shaded, free-air position is well spent.',
            },
            {
              question: 'Is a calibration certificate from the supplier enough for commissioning?',
              answer:
                'No. It shows the sensor was right when it left the factory. It does not cover the position, the installation, the wiring or the input set-up. Check the installed reading against a reference at the sensor and record the result.',
            },
            {
              question: 'Do wireless sensors avoid all of this?',
              answer:
                'They avoid the cable, not the siting. A wireless room sensor above a radiator reads just as badly as a wired one. You also need to confirm the radio coverage is adequate, and on some sites that means a survey before the sensors are placed.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'A sensor must represent the reference point of the control loop. The BMS will control exactly to what it reads, right or wrong.',
            'Room sensors: open internal wall, about 1.5 m high, at least 500 mm from the adjacent wall, clear of heat sources, sun, external doors, alcoves and draughts. Seal the conduit and use an insulated backing on solid walls.',
            'Outdoor sensors: shaded, in free-moving air, and never above windows, extract louvres or ventilation shafts.',
            'Pipe and duct sensors: whole active length in the medium, clear of mixing points and turbulence, with paste or compound for good thermal contact, and the insulation left intact.',
            'Pressure tappings need straight, calm runs and tubes kept free of condensate and frost, with test points for calibration.',
            'Fit for the life of the sensor: drip loop, spare cable, safe access, a label plate beside it and concealed positions recorded.',
            'Calibration is comparison with a known value at the sensor. Check after installation, record as-found and as-left, and suspect siting and wiring before the sensor.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself" />

        <PrevNext
          noun="section"
          prevHref="/study-centre/upskilling/bms-module-2-section-3"
          prevLabel="Actuators, valves and dampers"
          nextHref="/study-centre/upskilling/bms-module-2-section-5"
          nextLabel="Controllers and I/O modules"
        />
      </HubBody>
    </HubPage>
  );
};

export default BMSModule2Section4;
