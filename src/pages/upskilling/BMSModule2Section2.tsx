/**
 * BMS Module 2 · Section 2 — Sensors
 *
 * Rebuilt 10 Oct 2026 on the learning primitives. The page teaches what a BMS sensor hands to
 * the controller and how to choose and connect the common ones: NTC thermistors and platinum
 * resistance sensors (PT100/PT1000) with lead resistance worked through, the right temperature
 * sensor for pipes, tanks, ducts, rooms and outside air, humidity, pressure and differential
 * pressure, flow derived from differential pressure, CO2 and VOC air quality, PIR and people
 * counting, then calibration, labelling and wireless sensors. The old page carried invented
 * figures (CO2 infrared wavelengths, warm-up times, calibration gas concentrations, calibration
 * intervals, cable sizes) and a school scenario with outcomes nobody measured; all of that is
 * gone. Detailed siting rules are left to Section 2.4.
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
  VideoCard,
} from '@/components/study-centre/learning';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Sensors | BMS Module 2.2 | Elec-Mate';
const DESCRIPTION =
  'BMS sensors for electricians: NTC and PT100/PT1000 temperature sensors, lead resistance, humidity, pressure, flow, CO2 and occupancy, and how to choose each one.';

const outcomes = [
  'Explain the difference between a passive resistive sensor and an active transmitter, and what each needs from the controller',
  'Tell an NTC thermistor from a PT100 or PT1000 sensor, and say why the controller input must be set for the exact type',
  'Work out roughly how much error lead resistance adds to a two-wire platinum sensor, and when three- or four-wire connection matters',
  'Pick the right temperature sensor for a pipe, a tank, a duct, a room or outside air',
  'Describe what humidity, pressure, differential pressure and flow sensors report, and the installation points that keep them honest',
  'Explain what CO2, VOC and occupancy sensors tell a BMS, and why every sensor needs checking once it is installed',
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A failed room thermistor is replaced on the same cable with one from the van. The old sensor read correctly; the new one is a few degrees out against a reference thermometer. What should you check first?',
    options: [
      'Whether the outstation firmware needs updating',
      'Whether the room has a draught from a door',
      'Whether its curve matches the input setting',
      'Whether the cable needs a third core adding',
    ],
    correctIndex: 2,
    explanation:
      'A resistive sensor only becomes a temperature through the curve the controller applies, and thermistors come with different curves. A replacement on a different curve gives a plausible but wrong number on perfectly good wiring. The cable is ruled out because the old sensor read correctly on it, and a thermistor barely notices cable resistance anyway. Nothing about the room or the firmware changed.',
  },
  {
    id: 2,
    question: 'Why do NTC thermistors cope well with long cable runs on HVAC jobs?',
    options: [
      'Their high resistance swamps the cable resistance',
      'They generate their own voltage, so cable resistance does not matter',
      'They are always wired with three cores to cancel the cable',
      'Their output is converted to 4–20 mA inside the sensor head',
    ],
    correctIndex: 0,
    explanation:
      'A thermistor runs at thousands of ohms or more, so the cable resistance is a tiny fraction of the total and is swamped. It does not generate a voltage (that is a thermocouple), and a bare thermistor is a two-wire passive device with no transmitter in it.',
  },
  {
    id: 3,
    question:
      'A PT100 is wired two-wire, with 2 Ω of total cable resistance in the loop. Roughly how far out will the reading be?',
    options: [
      'Around 0.5 °C low',
      'No error, because platinum is linear',
      'Around 2 °C high',
      'Around 5 °C high',
    ],
    correctIndex: 3,
    explanation:
      'A PT100 changes by about 0.385 Ω per °C, so 2 Ω of cable looks like about 5 °C of extra temperature, and the error is always upward because the cable adds resistance. Linearity does not help: the controller cannot tell cable resistance from sensor resistance. Half a degree is what the same cable does to a PT1000.',
  },
  {
    id: 4,
    question: 'What does a three-wire RTD connection rely on to cancel lead resistance?',
    options: [
      'A separate supply to the sensor head',
      'Both current-carrying cores matching in resistance',
      'The controller applying a fixed offset on commissioning',
      'The sensor being mounted close to the outstation',
    ],
    correctIndex: 1,
    explanation:
      'The third core lets the input measure one lead and subtract it, which only works if both current-carrying leads match. A loose or corroded terminal on one leg upsets that balance and brings the error back. A fixed offset is a different fix and does not track changes in the cable.',
  },
  {
    id: 5,
    question:
      'The supply air temperature in a large duct swings and does not match what the room feels like. The duct sensor is a short probe near the side of the duct. What is the likely improvement?',
    options: [
      'Move the probe to the room side of the grille',
      'Fit an averaging sensor across the duct',
      'Fit a faster-responding thermistor in the same spot',
      'Change the controller to a longer sampling time',
    ],
    correctIndex: 1,
    explanation:
      'A short probe measures one spot, and air in a duct can layer and swirl, so one spot may not represent the whole stream. An averaging sensor spread across the section gives a figure the loop can trust. A faster sensor in the same bad spot just follows the wrong air more quickly.',
  },
  {
    id: 6,
    question: 'Why do most room and duct humidity sensors also give a temperature output?',
    options: [
      'Relative humidity depends on the air temperature',
      'The temperature output is needed to power the humidity element',
      'Building Regulations require both values to be logged together',
      'It lets one sensor replace the room thermostat entirely',
    ],
    correctIndex: 0,
    explanation:
      'Relative humidity is a ratio that depends on air temperature, so the sensor has to measure temperature anyway and most manufacturers give you both outputs. It is a measurement need, not a regulatory one, and it does not power anything.',
  },
  {
    id: 7,
    question:
      'You are fitting a differential pressure sensor across a supply air filter. Which choice matters most when you order it?',
    options: [
      "A range matched to the filter's working pressures",
      'The widest range available, so it can never be overloaded',
      'A unit with a built-in display so the reading can be seen',
      'A sensor rated for water, since that covers air as well',
    ],
    correctIndex: 0,
    explanation:
      'A range matched to the working pressures uses the whole span of the signal, so small changes are visible. A huge range squeezes the useful readings into a sliver of the output. The sensor must suit the medium, but a liquid rating does not automatically suit air, and a display is a convenience rather than a selection rule.',
  },
  {
    id: 8,
    question:
      'Water flow on a heating circuit is shown on the BMS, but there is no flow meter. Where is the figure most likely coming from?',
    options: [
      'The pump speed reference, scaled in the controller',
      'A temperature difference across the boiler',
      'An occupancy count multiplied by a design figure',
      'Differential pressure across an orifice plate',
    ],
    correctIndex: 3,
    explanation:
      'Pressure drop across a fixed restriction rises with flow, so a differential pressure sensor plus the manufacturer’s formula gives a flow rate. Pump speed alone does not tell you flow, because the system resistance changes as valves move. A temperature difference is used for heat, not flow.',
  },
  {
    id: 9,
    question: 'What does a CO2 reading from a classroom tell the BMS?',
    options: [
      'Whether any cleaning chemicals are in the air',
      'Whether the fire alarm should be raised',
      'Roughly how busy the room is, to set ventilation',
      'The exact number of people in the room at any moment',
    ],
    correctIndex: 2,
    explanation:
      'People breathe out CO2, so its concentration rises with the number of occupants and the BMS can raise or lower fresh air to suit. It is an indication, not a head count, and it says nothing about cleaning fumes, which are what a mixed-gas VOC sensor picks up. Fire detection is never the BMS sensor’s job.',
  },
  {
    id: 10,
    question:
      'A temperature sensor arrived with a factory calibration certificate. What still needs to happen on site?',
    options: [
      'Nothing, the certificate covers it for its working life',
      'Its installed reading checked against a reference',
      'The sensor should be sent back each year for recalibration',
      'An offset should be added to every input as standard',
    ],
    correctIndex: 1,
    explanation:
      'A factory certificate proves the sensor left the factory correct. It cannot prove the pocket, the paste, the cable and the input configuration are right, so the installed reading still has to be compared with a known value. Return intervals come from the manufacturer or the project, not a blanket rule, and an offset is only applied once a check shows it is needed.',
  },
];

const BMSModule2Section2 = () => {
  useSEO(TITLE, DESCRIPTION);
  return (
    <HubPage>
      <HubMasthead
        section="Module 2 · Section 2"
        title="Sensors"
        backTo="/study-centre/upskilling/bms-module-2"
      />
      <HubBody>
        <p className="max-w-3xl text-[15px] leading-relaxed text-white lg:text-[17px]">
          This section covers what each common BMS sensor measures and what it hands to the
          controller. On site, the type you fit and how you connect it decide whether its reading
          can be trusted.
        </p>

        <TLDR
          points={[
            'A BMS can only control as well as its sensors measure. A wrong reading gives poor control, wasted energy and complaints, however good the strategy is.',
            'Most temperature sensors are passive resistors: NTC thermistors (resistance falls as it warms) or platinum PT100/PT1000 (resistance rises). The controller input must be set for the exact type fitted.',
            'Cable resistance adds to a low-resistance platinum sensor and reads as extra heat. On a PT100 a couple of ohms is several degrees, which is why three- and four-wire connections exist.',
            'Humidity, pressure, differential pressure and air quality sensors are usually active devices with their own supply and a 0–10 V or 4–20 mA output.',
            'Choose the sensor for the medium and the place: immersion or clamp-on for pipes, averaging for big ducts, matched ranges for pressure, and always check the reading once installed.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <SectionRule />
        <ContentEyebrow>What a sensor gives the controller</ContentEyebrow>

        <ConceptBlock
          title="The controller never sees the temperature, only a signal that stands for it"
          plainEnglish="A sensor turns something physical, like heat or pressure, into something electrical the outstation can read. If that conversion is wrong, every decision made on it is wrong too."
          onSite="Before you terminate a sensor, know which of two kinds it is: a bare element the input reads directly, or a powered transmitter that sends a scaled signal. They wire and fail differently."
        >
          <p>
            Section 2.1 showed that an analogue input is just a number arriving at the outstation.
            The sensor is where that number starts. It sits at the reference point of a control
            loop, measuring the controlled variable, and the controller acts on what it reports. If
            the sensor is the wrong type, in the wrong place, or wired badly, the loop will hold the
            wrong condition very precisely, and the building will waste energy doing it.
          </p>
          <p>Field sensors on a BMS fall into two broad families:</p>
          <ul>
            <li>
              <strong>Passive resistive elements.</strong> A thermistor or a platinum resistance
              sensor is simply a resistor whose value changes with temperature. It has two (or more)
              cores and no supply of its own. The outstation input passes a small measuring current
              through it and converts the resistance to a temperature using a curve held in the
              controller.
            </li>
            <li>
              <strong>Active transmitters.</strong> Humidity, pressure, differential pressure, CO2
              and many flow sensors contain electronics. They need a supply, and they send a scaled
              analogue signal, typically 0–10 V or 4–20 mA, that the controller converts back into
              engineering units using the range you enter.
            </li>
          </ul>
          <p>
            A growing number of sensors also report over a network protocol or wirelessly instead of
            on a hard-wired analogue input. That changes how the value travels, not what the sensor
            has to get right at the point of measurement.
          </p>
        </ConceptBlock>

        <Pullquote>
          A control loop can only be as good as the number it is given. Get the sensor right and
          most of the strategy looks after itself.
        </Pullquote>

        <SectionRule />
        <ContentEyebrow>Temperature: thermistors and platinum sensors</ContentEyebrow>

        <ConceptBlock
          title="NTC thermistors and PT100/PT1000 sensors work the opposite way round"
          plainEnglish="Both are resistors that change with temperature. A thermistor drops in resistance as it warms, by a lot and not in a straight line. A platinum sensor rises in resistance as it warms, by a little and very steadily."
          onSite="The type is printed on the sensor, the data sheet or the points schedule. If none of those agree with the input configuration, stop and find out which is right before you commission anything."
        >
          <p>
            Temperature is the measurement you will meet most on a BMS, and two kinds of resistive
            element do most of the work.
          </p>
          <ul>
            <li>
              <strong>NTC thermistor.</strong> Made from metal oxide. NTC stands for negative
              temperature coefficient: as the temperature rises, the resistance falls. Thermistors
              are very sensitive (a small change in temperature gives a large change in resistance)
              but their curve is far from a straight line. Their resistance is high: typically
              thousands to tens of thousands of ohms at room temperature (10 kΩ at 25 °C is a common
              type), falling as they warm. Even on a heating flow, where it may be down to around a
              kilohm, that is still hundreds of times the resistance of the cable.
            </li>
            <li>
              <strong>Platinum resistance sensor (RTD).</strong> A fine platinum element whose
              resistance rises steadily with temperature. The name tells you its value at 0 °C: a{' '}
              <strong>PT100</strong> is 100 Ω at 0 °C and a <strong>PT1000</strong> is 1000 Ω.
              Platinum is much less sensitive than a thermistor but close to linear, which is why it
              is chosen where a wide range or better accuracy is wanted.
            </li>
            <li>
              <strong>Nickel (Ni1000) sensor.</strong> Common on some European controls ranges. It
              is 1000 Ω at 0 °C and rises with temperature like platinum, but on a different curve.
              A Ni1000 read as a PT1000, or the other way round, gives a believable but wrong
              temperature.
            </li>
          </ul>
          <p>
            For most platinum sensors the resistance changes by about 0.385 Ω per °C on a PT100 (ten
            times that, about 3.85 Ω per °C, on a PT1000). Hold that number; the next block uses it.
          </p>
          <p>
            Building services sit comfortably with thermistors because the temperatures involved
            span a narrow band, so the curved response is not a serious problem, and their high
            resistance shrugs off long cable runs. Where the range is wide and the curve would
            matter, platinum earns its place.
          </p>
          <p>
            The critical point for an electrician: thermistors come with different curves, and PT100
            and PT1000 need different input settings again. A universal input does not detect what
            is on the end of the cable. It reads a resistance and applies whichever curve it has
            been told to use. Fit one type and configure another, and the BMS shows a wrong
            temperature. A PT100 read as a PT1000 is so far out that someone will notice. A
            thermistor on the wrong thermistor curve can be only a few degrees off, which looks
            believable, and believable is the dangerous case.
          </p>
        </ConceptBlock>

        <VideoCard
          {...videos.bmsTemperatureSensors}
          topic="Watch · how the three main temperature sensor families compare"
          caption="Thermocouples feature in the video but are rare on building services. Focus on how thermistors and RTDs differ in sensitivity and linearity, which is the choice you meet on a BMS."
        />

        <VideoCard
          {...videos.bmsThermistors}
          topic="Watch · why a thermistor’s resistance falls as it warms"
          caption="Watch for the shape of the NTC curve. That curve is why the controller must be told the exact sensor type: the same resistance means different temperatures on different curves."
        />

        <InlineCheck
          id="bms-2-2-fault-signature"
          question="An NTC thermistor input suddenly reads far colder than anywhere in the building could be. Which fault fits best?"
          options={[
            'The sensor cores are shorted together',
            'The sensor has been knocked out of its pocket into warm air',
            'A core has broken, leaving the input open circuit',
            'The input has been configured as a PT1000',
          ]}
          correctIndex={2}
          explanation="An NTC thermistor’s resistance rises as it gets colder, so an open circuit looks like very high resistance and reads as extreme cold. A short looks like near-zero resistance and reads as extreme heat. On a platinum sensor it is the other way round: open reads hot, short reads cold. Learning the pattern lets you diagnose from the head end before you pick up a meter."
        />

        <SectionRule />
        <ContentEyebrow>Cable resistance and connection</ContentEyebrow>

        <ConceptBlock
          title="On a platinum sensor, the cable is part of the measurement"
          plainEnglish="The input cannot tell the sensor’s resistance from the cable’s. On a low-value sensor the cable adds enough to read as extra heat."
          onSite="On a long run to a PT100, ask whether three- or four-wire connection was specified, and terminate every core. On a three-wire circuit, a poor joint on one leg brings the error straight back."
        >
          <p>
            With a two-wire connection, the input measures the sensor plus both cable cores in
            series. All that extra resistance is read as temperature, and because the cable always
            adds resistance, the error always reads high on a platinum sensor.
          </p>
          <p>Work it through with 2 Ω of total cable resistance (1 Ω in each core):</p>
          <ul>
            <li>
              <strong>PT100:</strong> 2 Ω ÷ 0.385 Ω per °C ≈ 5.2 °C. The BMS reads about five
              degrees warm. On a heating flow sensor or a room sensor, that is a building held at
              the wrong temperature.
            </li>
            <li>
              <strong>PT1000:</strong> 2 Ω ÷ 3.85 Ω per °C ≈ 0.5 °C. Same cable, a tenth of the
              error, which is a good reason to choose a PT1000 on a long run.
            </li>
            <li>
              <strong>Thermistor:</strong> the same 2 Ω against thousands of ohms or more is a tiny
              fraction of the total, so the cable is swamped and the effect is negligible.
            </li>
          </ul>
          <p>Where a low-value platinum sensor must be accurate, the connection does the work:</p>
          <ul>
            <li>
              <strong>Three-wire.</strong> A third core lets the input measure one lead and subtract
              it. This cancels the error only if the two current-carrying cores have the same
              resistance, including every terminal and joint along the way. Mixed cable, a loose
              terminal or a corroded junction on one leg upsets the balance.
            </li>
            <li>
              <strong>Four-wire.</strong> Two cores carry the measuring current and two separate
              cores sense the voltage across the element. Cable resistance drops out entirely, even
              if the cores differ. It costs a core and needs an input that supports it.
            </li>
          </ul>
          <p>
            The input also has to be configured for the connection used. Wiring three cores to an
            input set for two-wire, or the reverse, gives a reading that is wrong in a way that is
            hard to spot.
          </p>
          <p>
            One more effect is worth knowing. To read any resistive sensor the input must pass a
            current through it, and that current warms the element slightly, so it reads a touch
            high. Inputs keep the measuring current small, or pulse it, to hold this down.
            Separately, never put an insulation resistance tester across a sensor element or an
            outstation input. The test voltage can damage the element and the electronics behind it.
            Disconnect sensors before insulation testing their cables.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-2-2-lead-resistance"
          question="An existing two-wire PT100 on a long run reads a steady few degrees warm. Swapping in a new PT100 makes no difference. What is the likeliest cause?"
          options={[
            'The new sensor is from a faulty batch',
            'The controller curve is set for a thermistor',
            'The cable is too short for the input',
            'Cable resistance adding to the sensor',
          ]}
          correctIndex={3}
          explanation="A steady warm offset that survives a sensor swap points at something in series with the sensor, and on a two-wire PT100 that is the cable. A thermistor curve applied to a platinum sensor would give a wildly wrong reading rather than a few degrees. The fix is three- or four-wire connection, a PT1000, or a measured offset as a last resort."
        />

        <CommonMistake
          title="Fitting a like-for-like sensor that is not like for like"
          whatHappens="A failed room sensor is replaced with one from the van that looks the same. It has a different thermistor curve. The head end shows a sensible-looking temperature a few degrees out, the heating backs off or drives on, and the complaint comes back a week later with nobody suspecting the new sensor."
          doInstead="Match the element type, not the housing. Check the existing sensor’s marking, the points schedule and the input configuration before you swap, and if the replacement is a different type, get the controls engineer to change the input setting. Then compare the new reading with a reference thermometer before you leave."
        />

        <SectionRule />
        <ContentEyebrow>Choosing a temperature sensor for the job</ContentEyebrow>

        <ConceptBlock
          title="The housing matters as much as the element inside it"
          plainEnglish="The same element is sold in many bodies: in a pocket for a pipe, strapped to a pipe, as a probe or averaging string for a duct, in a room box, or in a weatherproof case outside. Pick the body for where the heat is."
          onSite="Ask what the sensor is meant to represent: water leaving a boiler, air across a whole duct, the conditions people feel in a room. Then choose the type that actually measures that."
        >
          <ul>
            <li>
              <strong>Pipes: immersion sensor in a pocket.</strong> Usually the best option. The
              pocket (thermowell) lets the sensor be withdrawn without draining the system. The
              whole active length must sit in the water and the sensor must be a good fit in the
              pocket, with heat-conducting paste to help the heat across. On a bend, it should point
              into the direction of flow.
            </li>
            <li>
              <strong>Pipes: clamp-on (strap-on) sensor.</strong> Used where an immersion sensor is
              not practical. It needs a clean, smooth contact patch, heat-conducting compound
              between sensor and pipe, and insulating over so room air does not pull the reading
              towards ambient.
            </li>
            <li>
              <strong>Tanks and vessels.</strong> Storage vessels normally have ready-made sockets
              for pockets. On open tanks, an immersion or probe sensor works, or a capillary sensor
              where the head has to sit away from the tank. Get the manufacturer’s agreement before
              drilling any tank.
            </li>
            <li>
              <strong>Ducts: probe or averaging.</strong> A probe reads one spot, which is fine in a
              small, well-mixed duct but poor where the air layers or is turbulent, such as after a
              mixing box or a coil. An averaging sensor runs across the duct section and returns an
              average. Some use a continuous capillary; others string several sensing points along a
              cable, and every point must be inside the airstream.
            </li>
            <li>
              <strong>Rooms.</strong> A wall sensor, a discreet sealed cable (flying lead) sensor,
              or more than one sensor in a large space. Where the space cannot be sensed directly,
              extract air temperature is often a fair indication of average room conditions. Where
              radiant panels heat the space, a radiant (black bulb) sensor with a line of sight to
              the panel is used.
            </li>
            <li>
              <strong>Outside air.</strong> A weather-resistant sensor made for the job, sited out
              of direct sun. Sunlight and shade both distort the reading, and outside air
              temperature often drives compensated heating for a whole building.
            </li>
          </ul>
          <p>
            Exactly where each of these goes, and the faults that come from getting it wrong, is the
            subject of Section 2.4.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-2-2-pick-type"
          question="A new flow temperature sensor is needed on a low temperature hot water pipe. It must read the water itself and be changeable later without draining down. Which is normally the best choice?"
          options={[
            'A clamp-on sensor with heat-conducting compound',
            'An immersion sensor in a pocket, with paste',
            'A probe screwed straight into the water, no pocket',
            'A capillary strapped along the outside of the pipe',
          ]}
          correctIndex={1}
          explanation="An immersion sensor sits in the water, so it reads the medium rather than the pipe wall, and the pocket lets the sensor be withdrawn without draining the system. A probe with no pocket reads the water, but it cannot come out without a drain-down. Clamp-on and strapped sensors read the pipe surface and are the fallback where a pocket is not practical."
        />

        <SectionRule />
        <ContentEyebrow>Humidity</ContentEyebrow>

        <ConceptBlock
          title="Humidity sensors measure temperature too, and hate getting wet"
          plainEnglish="Relative humidity depends on air temperature, so a humidity sensor always has a temperature element alongside. Most give you both readings."
          onSite="On a combined RH+T sensor, check which output goes to which input on the points schedule. Swapped outputs give a room temperature that looks like a humidity figure, which at least is easy to spot."
        >
          <p>
            Relative humidity (%RH) is a ratio that changes with air temperature, so measuring it
            means measuring temperature as well. That is why nearly all humidity sensors come as
            combined RH+T devices with two outputs, and why every style of air temperature sensor
            (room, duct, outside) is usually available in an RH+T version.
          </p>
          <p>Points that decide how long a humidity sensor lasts and whether it tells the truth:</p>
          <ul>
            <li>
              <strong>Keep the element dry.</strong> Specific outside air versions exist for exposed
              positions.
            </li>
            <li>
              <strong>Watch the chemistry.</strong> Solvents in laboratories, chlorine in pool halls
              and disinfectants in hospitals can shorten the life of some humidity elements or upset
              their readings. Ask for a sensor suited to the environment.
            </li>
            <li>
              <strong>Downstream of a humidifier,</strong> a duct sensor must measure moisture held
              in the air, not droplets carried over from the humidifier. Too close and it reads
              spray rather than air, and the humidifier is shut off early.
            </li>
          </ul>
          <p>
            Humidity sensors are active devices, so they need a supply as well as signal cores.
            Check the supply voltage on the data sheet against what the panel provides before you
            terminate.
          </p>
        </ConceptBlock>

        <Scenario
          title="A pool hall where the humidity sensors keep dying"
          situation="A leisure centre’s pool hall dehumidification is controlled from a duct humidity sensor in the extract. The site has replaced it several times in a couple of years. Each time it reads well for a while, then drifts and the plant either over-runs or lets the hall get clammy. The latest replacement was the cheapest RH+T duct sensor the wholesaler stocked."
          whatToDo="Treat it as a selection problem, not a faulty batch. Chlorine in pool hall air attacks some humidity elements, so ask the controls engineer or the manufacturer for a sensor rated for that environment. Check it is in the extract duct where the air represents the hall, that the housing is sealed and the cable enters with a drip loop, and that the reading is compared with a reference instrument after fitting."
          whyItMatters="Swapping like for like treats the symptom and guarantees the next failure. A sensor chosen for the air it actually sits in costs a little more once and stops the cycle, and the plant controls on a reading it can trust between visits."
        />

        <SectionRule />
        <ContentEyebrow>Pressure, differential pressure and flow</ContentEyebrow>

        <ConceptBlock
          title="Pressure and differential pressure, and the flow figures worked out from them"
          plainEnglish="A pressure sensor reads the pressure at one point. A differential pressure sensor reads the difference between two points. That difference tells you a filter is clogging, a fan is moving air, or how much water or air is flowing."
          onSite="A simple pressure switch across a fan or a filter is a digital input, not an analogue one. It reports only whether a set difference has been crossed."
        >
          <p>
            Pressure and differential pressure (dP) sensors appear on both air and water systems.
            Common BMS uses include:
          </p>
          <ul>
            <li>
              <strong>Filter condition.</strong> The difference across a filter rises as it loads
              with dirt, so a dP reading or a dP switch tells the BMS when it is time to change it.
            </li>
            <li>
              <strong>Fan and air flow proving.</strong> A dP switch across a fan confirms air is
              actually moving, not just that the motor has been told to run.
            </li>
            <li>
              <strong>Duct and pipework pressure control.</strong> A pressure reading at a chosen
              point lets a variable speed fan or pump hold the system where it is needed.
            </li>
            <li>
              <strong>Flow measurement.</strong> Covered below.
            </li>
          </ul>
          <p>Selecting one comes down to four checks:</p>
          <ul>
            <li>
              It must be rated for the <strong>nominal system pressure (PN)</strong> it will sit on.
            </li>
            <li>
              Its <strong>range</strong> should closely match the working range of the job, so the
              useful readings fill the signal rather than using a sliver of it.
            </li>
            <li>
              On a dP sensor, the <strong>maximum pressure on one side</strong> must never be
              exceeded. On liquid systems a bypass with a stop valve on the connection lets you work
              on the sensor without overloading one side.
            </li>
            <li>
              It must be <strong>approved for the medium</strong>: water, steam, refrigerant, gas or
              air. A sensor for one is not automatically fit for another.
            </li>
          </ul>
          <p>
            Mounting angle and vibration both shift a pressure reading, so fit the sensor as the
            manufacturer shows. Pressure tubes need a test point near the sensor for calibration,
            should fall to a drain where condensation is possible, and must not run through cold
            areas where the condensate could freeze. Tappings belong in steady air, away from bends
            and obstructions; liquid tappings need a clean bore with no burrs and pipework laid so
            it does not trap air.
          </p>
          <p>
            <strong>Flow is usually worked out from pressure, not measured directly.</strong>
            Push a flow through a known restriction and the pressure drop tells you how much is
            passing; the BMS does the sum. Any flow figure found this way is only as good as the
            set-up: a straight run either side, correct tappings and a proper calibration.
          </p>
          <p>
            <strong>Water systems.</strong> A differential pressure sensor across an orifice plate,
            with the manufacturer’s formula applied, gives a volumetric flow rate. A Venturi does
            the same job with better accuracy. Both need careful calibration.
          </p>
          <p>
            <strong>Air systems.</strong> There are two common routes:
          </p>
          <ul>
            <li>
              <strong>Single-point velocity sensors</strong> are cheap and suit smaller ducts, but
              they are less accurate, because one point in turbulent air is not the whole duct.
            </li>
            <li>
              <strong>Velocity probes with a dP sensor</strong> measure the velocity pressure of the
              air, from which the BMS calculates velocity in m/s and then volume flow. They take
              careful set-up and repay it with better readings.
            </li>
          </ul>
          <p>
            Either way, the measuring point wants a straight run of duct away from fans, bends and
            anything else that stirs the air up. Thermal flow switches, which only report flow or no
            flow, are the exception: they want a spot where the air moves fast, such as a narrow
            section.
          </p>
        </ConceptBlock>

        <VideoCard
          {...videos.bmsPressureSwitches}
          topic="Watch · how a pressure switch decides when to change state"
          caption="Note the difference between the switching point and the reset point. On a filter or fan proving switch that gap stops the input chattering when the pressure sits near the setting."
        />

        <InlineCheck
          id="bms-2-2-dp-filter"
          question="A supply fan’s run status shows on, but the room is stuffy and the airflow proving alarm keeps tripping. What does the proving switch tell you that the run status cannot?"
          options={[
            'That the motor contactor has pulled in',
            'That air is actually moving',
            'That the filter is the correct grade',
            'That the controller output is energised',
          ]}
          correctIndex={1}
          explanation="Run status usually comes from the starter or an auxiliary contact, which proves the motor circuit is energised, not that air is moving. A slipped belt or a seized damper leaves the motor running with no airflow. The dP proving switch sees the pressure difference the moving air creates, which is the thing you actually care about."
        />

        <SectionRule />
        <ContentEyebrow>Air quality and occupancy</ContentEyebrow>

        <ConceptBlock
          title="Air quality and occupancy sensors tell the BMS how hard to work"
          plainEnglish="People breathe out CO2, so a rising CO2 reading means a room is filling up. A VOC sensor gives a rough clean-or-dirty indication from fumes and odours. Neither is a safety device."
          onSite="Do not mix up an indoor air quality sensor with a gas detector for a boiler house or refrigerant plant; those are safety systems in their own right. And fit PIR heads so people walk across their field, not straight at them."
        >
          <p>Indoor air quality sensors on a BMS come in two main kinds:</p>
          <ul>
            <li>
              <strong>CO2 sensors.</strong> The concentration of carbon dioxide gives an indication
              of how many people are using a space. The BMS uses it to raise or lower the fresh air
              rate, so a meeting room gets ventilated when it is full and not when it is empty.
            </li>
            <li>
              <strong>Mixed gas (VOC) sensors.</strong> Volatile organic compounds come from things
              like cleaning products and other fumes. A VOC sensor, usually in a room housing, gives
              an approximate view of whether the air is clean or dirty rather than a precise figure
              for any one gas.
            </li>
          </ul>
          <p>
            For a wall-mounted sensor, the place should represent the room&rsquo;s air: an open wall
            between 1.5 and 1.8 m above the floor, away from doors, windows and supply grilles. A
            duct-mounted sensor belongs in the extract, as close to the room outlets as practical,
            so it sees room air before it mixes with anything else.
          </p>
          <p>
            Presence is the other half of the picture. Where CO2 tells the BMS roughly how busy a
            room is, occupancy sensors tell it whether anyone is there at all, or exactly how many.
          </p>
          <p>
            <strong>PIR (passive infrared) sensors</strong> respond to the heat given off by people
            moving within their detection zone. They are much better at picking up movement across
            their field of view than movement directly towards them, and different lenses shape the
            zone for different jobs. A large or awkward room may need more than one. The same
            presence signal can switch lighting, set back heating and cooling in an empty room, or
            feed space use reports.
          </p>
          <p>
            <strong>People counting sensors</strong> go further than presence. Footfall counters at
            entrances and exits count people in and out of a space; ceiling-mounted space use
            sensors give a live count of who is in a space at a time. They use cameras or infrared
            beams, and the data increasingly feeds both ventilation control and decisions about how
            a building is used.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Installing, labelling and proving</ContentEyebrow>

        <ConceptBlock
          title="Every sensor needs checking once it is in, and finding again later"
          plainEnglish="Calibration means comparing a sensor with something you know is right. A certificate from the factory does not cover how you installed it."
          onSite="Leave enough spare cable to pull a sensor out without disconnecting it, and a label plate next to it with the description and the schematic reference. The next person will thank you."
        >
          <p>
            Before you fix any sensor, establish the conditions it must survive: the minimum and
            maximum ambient temperature and humidity, water ingress, vibration, any need for
            explosion protection, and outside influences such as sunlight. Then install it to the
            manufacturer&rsquo;s instructions, which override general habits. The practical points
            that come up on almost every job:
          </p>
          <ul>
            <li>
              Fit it where it can be reached safely, ideally without access equipment, and protect
              it from damage and vandalism.
            </li>
            <li>
              Allow spare cable so the sensor can be withdrawn for maintenance or replacement
              without disconnecting the wiring, and form a drip loop so water runs off rather than
              into the housing.
            </li>
            <li>
              Avoid crushing duct insulation when fitting a duct sensor; use a stepped mounting
              flange or spacers. On chilled water pockets, vapour-seal the insulation so
              condensation does not form around the sensor.
            </li>
            <li>
              Where a sensing probe or capillary passes through a wall, use a lined and insulated
              conduit, a grommet through sheet metal, and fire-stop any hole through a compartment
              wall.
            </li>
            <li>
              Fix a label plate close to the sensor with a plain description and the reference from
              the plant schematic. Label the plate, not the sensor body, so a replacement is not a
              relabelling job. Mark concealed sensors in ceilings and risers visibly and record them
              in the site documents.
            </li>
            <li>
              Provide for checking: for example, a tight-sealing test hole next to a duct sensor so
              a reference probe can be put in beside it.
            </li>
          </ul>
          <p>
            <strong>Calibration</strong> is a comparison with a known value, done at the sensor
            itself. Where a sensor reads consistently off, an offset or a resistance table in the
            controller can correct it. Many manufacturers calibrate before dispatch, but the reading
            still has to be checked once installed, because the pocket, the paste, the cable and the
            input setting are all part of the measurement. Cleaning and recalibration then belong in
            the maintenance programme at the intervals the manufacturer sets, or the stricter ones a
            building certification scheme demands where the readings are used as evidence for it.
          </p>
          <p>
            <strong>Wireless sensors</strong> using Bluetooth Low Energy, Wi-Fi or LoRaWAN are now
            common, especially on refurbishments and heritage buildings where new cabling is
            difficult. Several sensors can report through one gateway, so a system can grow without
            extra wiring. The catch is coverage: a sensor out of range is a missing point, so on
            anything but a small job expect a radio survey before the positions are fixed.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Labelling the sensor and nothing else"
          whatHappens="Sensors go into a false ceiling with the reference written on the housing in marker. Two years later a sensor fails, nobody knows which ceiling tile it is behind, and the replacement goes in with no label at all. The next engineer is chasing cables through the ceiling void to find out which point is which."
          doInstead="Fix a label plate in the immediate area of the sensor showing a plain description and the schematic reference, mark the location of concealed sensors where it can be seen, and record every position in the site documentation and the as-fitted drawings."
        />

        <FAQ
          items={[
            {
              question: 'Can I measure a thermistor or PT100 with my multifunction tester?',
              answer:
                'Use the resistance range of a multimeter with the sensor disconnected from the input. Compare the reading with the manufacturer’s table at the measured temperature. Do not put an insulation resistance test across a sensor element or an outstation input: the test voltage can damage the electronics and the result tells you nothing about temperature.',
            },
            {
              question: 'How do I know whether a sensor needs its own supply?',
              answer:
                'A bare thermistor or platinum element has two, three or four cores and no supply. Anything with electronics in it, which covers humidity, pressure, differential pressure, CO2 and most flow sensors, needs a supply and has separate signal terminals. The data sheet gives the supply voltage and whether the output is voltage or current.',
            },
            {
              question: 'Why is my new sensor reading a degree or two different from the old one?',
              answer:
                'Possibly neither is wrong yet. Check the new one against a reference thermometer at the sensor, confirm the input is set for the exact element type and connection, and look at the fit: a loose sensor in a pocket with no paste, or a strap-on sensor with no insulation over it, will read towards the surrounding air.',
            },
            {
              question: 'Are wireless sensors as good as wired ones?',
              answer:
                'For many room measurements they are a practical choice, particularly where cabling is difficult. The sensing element is the same; what changes is the link. Plan for radio coverage, battery replacement, and the gateway as a single point that many sensors depend on.',
            },
            {
              question: 'Is a CO2 sensor a safety device?',
              answer:
                'No. A BMS CO2 sensor is there to adjust ventilation for comfort and air quality. Gas detection in plant rooms, and anything to do with fire, belongs to dedicated safety systems with their own standards and interfaces.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'A BMS can only control as well as its sensors measure: wrong type, wrong place or bad wiring gives poor control, wasted energy and complaints.',
            'NTC thermistors fall in resistance as they warm and are high in value; PT100 and PT1000 platinum sensors rise steadily and are 100 Ω and 1000 Ω at 0 °C. The input must be set for the exact type.',
            'On a two-wire PT100, 2 Ω of cable reads as about 5 °C too warm. PT1000, three-wire or four-wire connection all reduce it; thermistors barely notice.',
            'Choose the housing for the job: immersion in a pocket for pipes, clamp-on where that is impossible, averaging for large ducts, weatherproof and shaded outside.',
            'Humidity sensors measure temperature too; pressure sensors must suit the system pressure, the working range and the medium; flow is usually derived from differential pressure.',
            'CO2 indicates occupancy for ventilation control and PIRs detect movement across their view. Neither is a safety device.',
            'Label next to the sensor, leave spare cable, and check every reading against a known value once installed, whatever the factory certificate says.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself" />

        <PrevNext
          noun="section"
          prevHref="/study-centre/upskilling/bms-module-2-section-1"
          prevLabel="Points: digital and analogue, inputs and outputs"
          nextHref="/study-centre/upskilling/bms-module-2-section-3"
          nextLabel="Actuators, valves and dampers"
        />
      </HubBody>
    </HubPage>
  );
};

export default BMSModule2Section2;
