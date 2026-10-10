/**
 * BMS Module 4 · Section 4 — Blinds and shading
 *
 * Rebuilt 10 Oct 2026 on the learning primitives. Teaches why buildings shade (glare, summer
 * heat, winter gain, night-time heat loss), the four levels of blind control and how they map
 * onto the BACS classes, how a 230 V tubular blind motor is wired (up live, down live, neutral,
 * earth) and why the two directions must be interlocked, the ways blinds are interfaced to a BMS,
 * sun tracking and solar sensors, wind/rain/ice protection, overrides and safe working. The old
 * page described the 230 V motor as "3-wire L, N, reverse" with no earth, gave a wind retraction
 * figure with no source, promised cooling and lighting savings percentages, had blinds opening on
 * a fire alarm as standard practice, and ended on a case study of invented results. All of that
 * is gone.
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
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Blinds and shading | BMS Module 4.4 | Elec-Mate';
const DESCRIPTION =
  'Motorised blinds on a BMS: why buildings shade, wiring and interlocking a 230 V blind motor, interface methods, sun tracking, and wind and weather protection.';

const outcomes = [
  'Explain the four reasons a building controls its blinds, and why they sometimes pull in opposite directions',
  'Describe the levels of blind control from manual to combined lighting, blind and HVAC control',
  'Wire a 230 V tubular blind motor correctly, and explain why the up and down directions must be interlocked',
  'Compare the common ways blinds are interfaced to a BMS and say what the BMS should see',
  'Describe how sun tracking, solar sensors and facade grouping decide where a blind should sit',
  'Set out the weather protection and override priorities, and work safely on blinds that can move on their own',
];

const quizQuestions = [
  {
    id: 1,
    question:
      'An office has internal roller blinds only. Staff complain of glare and the rooms still overheat with the blinds down. What is the most likely explanation?',
    options: [
      'The blind motors are too small to hold the fabric fully down against the glass',
      'The solar sensor is fitted to the wrong facade, so the blinds lower too late',
      'Internal blinds stop glare, but the heat is already through the glass',
      'Roller blinds cannot be put under automatic control from a BMS at all',
    ],
    correctIndex: 2,
    explanation:
      'An internal blind catches the sunlight after it has come through the glazing, so much of the heat is already in the room. It is good at glare, poor at keeping heat out. A wrongly sited sensor would affect when the blinds move, not how much heat they block once they are down.',
  },
  {
    id: 2,
    question:
      'A typical 230 V tubular blind motor arrives on site. Which set of conductors should you expect to terminate?',
    options: [
      'Up-direction live, down-direction live, neutral and earth',
      'Line, neutral and a reverse conductor, with no earth needed',
      'Line, neutral and a 0–10 V position signal',
      'Two lives and an earth, with the neutral taken from the tube',
    ],
    correctIndex: 0,
    explanation:
      'The motor has a separate live for each direction, a common neutral, and a protective conductor because it is a metal-bodied mains appliance. The old "L, N, reverse" description left out the earth, which is not optional on a Class I motor.',
  },
  {
    id: 3,
    question:
      'Two separate relay outputs from a controller are wired to the up and down lives of one motor, with no other protection. What is the risk?',
    options: [
      'The motor will run more slowly than intended because the supply is shared',
      'The blind will ignore its end limits and wind the fabric off the tube',
      'The controller will lose its position feedback after every power cut',
      'A program fault or stuck relay can feed both directions at once',
    ],
    correctIndex: 3,
    explanation:
      'Nothing physical stops both relays closing together, so a program error or a welded contact feeds both windings at once, which most motor makers forbid. The fix is an interlock: a changeover arrangement, or an actuator that cannot select both directions. End limits live in the motor and are not affected by the relay wiring.',
  },
  {
    id: 4,
    question:
      'The wind sensor cable on the roof is cut. What should the shading controller do with the external blinds?',
    options: [
      'Hold them exactly where they are until the sensor fault has been cleared',
      'Treat the lost signal as high wind and retract them',
      'Hand control to the occupants until repaired',
      'Lower them to block the sun while the sensor is out',
    ],
    correctIndex: 1,
    explanation:
      'A wind sensor that has gone silent cannot prove the wind is safe, so the safe reaction is the one you would make for high wind: retract and stay retracted, with an alarm to the BMS. Holding position or handing control to occupants leaves the blinds out in weather the system can no longer see.',
  },
  {
    id: 5,
    question:
      'A tubular motor runs the blind up and down several times during commissioning, then stops responding. Half an hour later it works again. What is most likely?',
    options: [
      'The neutral connection at the controller is loose',
      'The upper limit has been set too low during installation',
      'Its thermal protection tripped after repeated runs',
      'The BMS time schedule has disabled that zone',
    ],
    correctIndex: 2,
    explanation:
      'Tubular motors are built for short, occasional runs and have thermal protection that cuts them out after repeated cycling; they recover once they cool. A loose neutral would give an intermittent fault with no link to how much the motor had run. Check the maker’s duty rating before treating it as a fault.',
  },
  {
    id: 6,
    question:
      'What does "combined light, blind and HVAC control" add over automatic blind control on its own?',
    options: [
      'The blind decision also weighs lighting, HVAC and occupancy',
      'Blinds move faster because they share the lighting control bus',
      'Occupants can no longer override the blinds from their room',
      'The blind motors are powered from the HVAC control panel',
    ],
    correctIndex: 0,
    explanation:
      'At the top level the blind position is chosen with the room as a whole in mind: glare, solar heat in summer, useful sun in winter, closing at night against heat loss, and whether anyone is there. It is a change in the logic, not in the power supply or motor speed, and overrides still exist.',
  },
  {
    id: 7,
    question: 'Where should the solar sensor for the south-facing blinds be mounted?',
    options: [
      'On the roof mast beside the wind sensor, as high as possible',
      'Inside the room behind the blinds, at desk height',
      'On the north facade, out of direct sun, for a stable reading',
      'On the south facade, which is the one it controls',
    ],
    correctIndex: 3,
    explanation:
      'A solar sensor should see the sun the same way the facade it controls does, so it goes on that facade. A roof sensor sees sun the south facade may be shaded from, and a sensor behind the blinds measures the blinds, not the sky.',
  },
  {
    id: 8,
    question:
      'An occupant presses "down" on a room panel while the roof weather station is reporting high wind. What should the external blind do?',
    options: [
      'Stay retracted, as weather protection outranks the occupant',
      'Lower, as a local occupant command outranks automatic control',
      'Lower halfway, as a compromise between the two commands',
      'Lower once the next sun-tracking update has been calculated',
    ],
    correctIndex: 0,
    explanation:
      'A typical agreed priority order puts weather protection first, then maintenance, then the occupant, then automatic control, so wind protection wins over any button press. An occupant override does beat sun tracking, which is why the second option is tempting. It does not beat weather protection, and there is no compromise position.',
  },
  {
    id: 9,
    question:
      'You are asked to replace a motor on an external venetian blind on a building where the blinds are on automatic sun tracking. What must you do before starting?',
    options: [
      'Put the zone into manual on the BMS head end and leave a note on screen',
      'Wait for an overcast, still day so that the blinds have no reason to move',
      'Isolate and lock off the motor supply, and tell the controls firm',
      'Disconnect the wind sensor so the blinds cannot retract while you work',
    ],
    correctIndex: 2,
    explanation:
      'A blind on automatic can move at any moment for sun, wind or schedule, so only a proven, locked-off isolation is safe. A manual setting on the head end is a software state anyone can change, and disabling the wind sensor would remove the blinds’ weather protection.',
  },
  {
    id: 10,
    question:
      'The fire strategy for a building says the external blinds must retract on fire alarm. Which arrangement fits UK practice?',
    options: [
      'The fire alarm interface drives it; the BMS only monitors it',
      'The BMS detects the alarm and sends a retract command over the network',
      'Occupants retract the blinds by hand as part of the evacuation',
      'The blinds retract when the roof wind sensor picks up smoke movement',
    ],
    correctIndex: 0,
    explanation:
      'Fire actions are driven by the fire detection and alarm system and its own interfaces, not by the BMS. The BMS can report what happened. Relying on a network command from the BMS puts a life-safety action on a path that was not designed for it.',
  },
];

const BMSModule4Section4 = () => {
  useSEO(TITLE, DESCRIPTION);
  return (
    <HubPage>
      <HubMasthead
        section="Module 4 · Section 4"
        title="Blinds and shading"
        backTo="/study-centre/upskilling/bms-module-4"
      />
      <HubBody>
        <p className="max-w-3xl text-[15px] leading-relaxed text-white lg:text-[17px]">
          Why buildings move their blinds, how the motors are wired and interlocked, how the BMS
          talks to them, and what keeps them safe in the wind.
        </p>

        <TLDR
          points={[
            'Shading does four jobs: stop glare, keep summer heat out, let winter sun in, and hold heat in at night. Good control balances them; poor control picks one.',
            'A typical 230 V tubular blind motor has an up live, a down live, a neutral and an earth. The two directions must never be energised together, so the control must be interlocked.',
            'Blinds reach the BMS through relay outputs, dedicated blind actuators, or a shading controller on a bus. Most of the clever logic usually sits in the shading system, not the BMS.',
            'Sun tracking uses the sun’s calculated position and a solar sensor on each facade to decide when blinds come down and how far slats tilt.',
            'Weather protection beats everything else. A lost wind signal is treated as high wind, and anyone working on a blind isolates it first because it can move on its own.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <SectionRule />
        <ContentEyebrow>What shading is for</ContentEyebrow>

        <ConceptBlock
          title="Four reasons to move a blind, and why they argue with each other"
          plainEnglish="A blind stops people being dazzled, keeps the sun’s heat out in summer, lets it in during winter, and helps keep heat in at night. Those goals do not always agree, and the control has to choose."
          onSite="When a client says the blinds ‘never do what we want’, ask which of the four jobs they think the blinds are doing. The answer is often that the system is set up for one and the occupants want another."
        >
          <p>A blind on a commercial building is doing at least one of four jobs at any moment:</p>
          <ul>
            <li>
              <strong>Cutting glare.</strong> Direct sun on a screen or in someone&rsquo;s eyes is
              the most common reason a blind comes down, and the one occupants notice most.
            </li>
            <li>
              <strong>Keeping summer heat out.</strong> Sun through glass heats the room. Blocking
              it reduces the cooling the building has to do, or stops a room without cooling from
              overheating.
            </li>
            <li>
              <strong>Letting winter sun in.</strong> On a cold, clear day the same sunshine is free
              heating. A blind that stays down out of habit throws it away.
            </li>
            <li>
              <strong>Holding heat in at night.</strong> A closed blind adds a layer between a warm
              room and cold glass when nobody is there to care about the view.
            </li>
          </ul>
          <p>
            The conflict is easy to see. On a bright February morning, glare says close the blind
            and heating says open it. In an empty meeting room there is no glare to worry about, so
            the blind can do whatever suits the heating and cooling. In an occupied office the
            people come first. Deciding which reason wins, room by room and hour by hour, is the
            whole job of automatic shading.
          </p>
          <p>
            Daylight sits alongside all four. Every blind that comes down further than it needs to
            pushes the lighting up, which is why the best schemes link blinds to the daylight
            dimming you met in Section 4.2.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Where the building regulations come in"
          plainEnglish="The building regulations in England ask designers to keep summer solar gain through windows down. Shading is one of the ways they do it, alongside the glass itself."
          onSite="If shading was part of how a building passed its solar gain check, the blinds are not a comfort extra. Leaving them on manual or broken changes how the building behaves in summer."
        >
          <p>
            Approved Document L (England) paragraph 4.18 of the 2021 edition, the one in force now,
            asks that, for occupied or mechanically cooled spaces in buildings other than new
            residential ones, solar gain through the glazing over the summer months is no greater
            than a reference glazing arrangement would let in. The stated aim is to reduce the need
            for air conditioning, or the size of any that is installed. From 24 March 2027 the same
            rule is paragraph 3.17 of the 2026 edition.
          </p>
          <p>
            Designers meet that through the choice of glass, the size and orientation of windows,
            fixed shading such as overhangs, and moveable shading. You will not do the calculation,
            but it is worth knowing that on some buildings the blinds are part of the reason the
            design works at all. That changes how seriously a fault on them should be taken.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-4-4-reasons"
          question="An empty classroom on a cold, sunny winter afternoon. The blinds are down. Which reason for shading is the control ignoring?"
          options={[
            'Cutting glare for the occupants',
            'Keeping summer heat out',
            'Letting useful winter sun in',
            'Protecting the blinds from wind',
          ]}
          correctIndex={2}
          explanation="With nobody in the room there is no glare to cut, and in winter the sun is free heat. Leaving the blinds down throws that away. A combined control would raise them while the room is empty and bring them down again when people arrive."
        />

        <SectionRule />
        <ContentEyebrow>Levels of control</ContentEyebrow>

        <ConceptBlock
          title="From a cord to a combined strategy: four levels of blind control"
          plainEnglish="Blinds can be pulled by hand, moved by a motor on a switch, moved by a controller on its own, or moved by a controller that is also thinking about the lights and the heating. Each step up hands more of the decision to the building."
          onSite="When you price or survey a shading job, find out which level the specification is asking for. A motor on a switch and a motor under combined control need very different wiring and very different commissioning."
        >
          <p>The building automation standards describe blind control in four steps:</p>
          <ul>
            <li>
              <strong>Manual.</strong> A cord, chain or crank. Whatever the blind does depends
              entirely on the people in the room.
            </li>
            <li>
              <strong>Motorised, manual control.</strong> A motor and a wall switch. Easier for
              occupants, but still entirely their decision, and in practice mostly used for glare.
            </li>
            <li>
              <strong>Motorised, automatic control.</strong> A controller moves the blinds on sun
              and weather. Glare is handled without anyone asking, and some cooling is saved as a
              side effect.
            </li>
            <li>
              <strong>Combined light, blind and HVAC control.</strong> The blind position is chosen
              together with the lighting and the heating and cooling, and it behaves differently in
              occupied and empty rooms. This is the only level that weighs all four reasons above.
            </li>
          </ul>
          <p>
            BS EN ISO 52120-1, the standard that sorts building automation into classes A to D,
            includes shading among the functions it grades. In the usual descriptions, motorised
            blinds under manual control sit with class C, automatically controlled blinds with class
            B, and blinds integrated with lighting and HVAC with class A. You do not need the
            standard open on site; you do need to recognise that a specification calling for class A
            or B is asking for automatic or combined blind control, not just motors.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Inside or outside the glass"
          plainEnglish="A blind inside the window stops glare but not much heat. A blind outside stops the heat before it gets in, but has to survive the weather."
          onSite="External blinds bring a roof full of weather sensors, motors you need access equipment to reach, and wiring that has to cope with outdoor conditions. Allow for all of it."
        >
          <p>The type of blind changes what the controls have to do:</p>
          <ul>
            <li>
              <strong>Internal roller, venetian and vertical blinds.</strong> Good for glare and
              privacy. Because they catch the sun after it has passed through the glass, much of the
              heat is already in the room. Weather does not affect them, so the control is simpler.
            </li>
            <li>
              <strong>External venetian blinds and louvres.</strong> They intercept the sun before
              the glass, so they are far better at keeping heat out. Slats can often be tilted to
              block direct sun while letting daylight through. They are exposed to wind, rain and
              ice and must be protected from all three.
            </li>
            <li>
              <strong>Awnings and fabric screens.</strong> Also external, also weather-exposed.
              Fabric is particularly vulnerable to wind and to being left out wet.
            </li>
            <li>
              <strong>Switchable glazing.</strong> Glass that tints electrically. No motor, but it
              still needs a controller and a supply, and it still has to be fitted into the same
              logic.
            </li>
          </ul>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>The motor</ContentEyebrow>

        <ConceptBlock
          title="Wiring a 230 V tubular blind motor"
          plainEnglish="The motor sits inside the roller tube. It has one live for up, one live for down, a shared neutral and an earth. Feed the up live and it goes up; feed the down live and it goes down; feed neither and it stops."
          onSite="Before you energise anything, identify the up and down conductors from the motor’s instructions and label them at the controller. Getting direction backwards is the commonest commissioning fault on blinds, and it matters most when the wind protection drives the blind the wrong way."
        >
          <p>
            Most mains-powered blind motors are tubular: a motor and gearbox that slide into the end
            of the roller tube or the head rail. A typical one has four conductors:
          </p>
          <ul>
            <li>
              <strong>Up live:</strong> energised to drive the blind up
            </li>
            <li>
              <strong>Down live:</strong> energised to drive it down
            </li>
            <li>
              <strong>Neutral:</strong> common to both directions
            </li>
            <li>
              <strong>Protective conductor:</strong> the motor is a metal-bodied mains appliance and
              its earth must be connected like any other
            </li>
          </ul>
          <p>
            The motor stops itself at the top and bottom by its <strong>limit switches</strong>,
            which are set during installation. Once a limit is reached, that direction is cut off
            inside the motor even if the live stays on, and only the opposite direction will move
            it. That is why an up live left energised does no harm once the blind is fully up.
          </p>
          <p>
            What does do harm is energising <strong>both</strong> lives at the same time. The two
            windings fight each other, the motor can overheat, and makers forbid it. The control
            arrangement, whether a wall switch, a relay pair or a blind actuator, has to make that
            physically impossible. That is what <strong>interlocking</strong> means here.
          </p>
          <p>
            Two more things catch people out. Tubular motors are built for short, occasional runs
            and have <strong>thermal protection</strong>: drive one up and down repeatedly during
            testing and it will cut out until it cools, then work again. And many motors of this
            type must not have their direction conductors paralleled with another motor&rsquo;s on
            one switch or relay output; check the instructions before you group motors, and use a
            group control unit or one output per motor where the maker says so.
          </p>
          <p>
            Smaller blinds, and some systems that need fine positioning, use extra-low voltage DC
            motors instead. These usually reverse by swapping polarity, run from a dedicated power
            supply, and are often controlled through their own electronics rather than direct
            switching.
          </p>
        </ConceptBlock>

        <Pullquote>
          A blind motor has two directions and must only ever be offered one. If the wiring allows
          both, it is waiting for a fault to prove it.
        </Pullquote>

        <ConceptBlock
          title="How interlocking is done"
          plainEnglish="The switch or relays are arranged so that up and down cannot both be on. The best arrangements make it impossible by wiring, not just unlikely by software."
          onSite="When you inherit a blind panel, trace how up and down are separated. If the only thing stopping both is the program in the controller, flag it."
        >
          <p>There are three common ways of achieving it:</p>
          <ul>
            <li>
              <strong>An interlocked blind switch.</strong> A purpose-made up/stop/down switch in
              which the two contacts cannot close together, mechanically. This is the right part for
              local manual control; two ordinary one-way switches are not.
            </li>
            <li>
              <strong>A relay changeover arrangement.</strong> One relay switches the live on or
              off; a second, changeover relay steers that live to either the up or the down
              conductor. Because the changeover contact can only be in one position, both directions
              can never be fed, whatever the controller does.
            </li>
            <li>
              <strong>A blind actuator.</strong> A purpose-built output module, on KNX or a similar
              bus, whose channels are designed for blind motors. Each channel has an up and a down
              output that the device itself will not close together, usually with a short pause
              built in before reversing.
            </li>
          </ul>
          <p>
            What does not count is two independent relay outputs on a general-purpose controller,
            one wired to up and one to down, relying on the program never to close both. A welded
            contact or a programming slip will close both sooner or later.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Driving up and down from two unrelated outputs"
          whatHappens="A spare pair of digital outputs on a BMS outstation is wired straight to a blind motor’s up and down lives through two separate interposing relays. Months later a strategy change briefly commands both at once, or one relay welds. The motor is fed in both directions, overheats and fails, and the cause is not obvious because both relays look healthy when tested one at a time."
          doInstead="Use an interlocked arrangement: a changeover relay to select direction behind a single run relay, or a proper blind actuator. Prove the interlock at commissioning by trying to command both directions at once and confirming the motor sees only one."
        />

        <InlineCheck
          id="bms-4-4-motor"
          question="The blind is fully down and the down live is still energised. What happens?"
          options={[
            'The motor keeps driving against the stop and will burn out',
            'The blind reverses and rises',
            'The down limit has stopped it, so nothing moves',
            'The protective device trips',
          ]}
          correctIndex={2}
          explanation="The down limit switch inside the motor has cut off that direction, so a live left on does no harm. Only the up direction will now move it. The damaging case is both lives energised together, which is why the control must be interlocked."
        />

        <SectionRule />
        <ContentEyebrow>Getting the BMS involved</ContentEyebrow>

        <ConceptBlock
          title="Interface methods: who decides, and what the BMS sees"
          plainEnglish="Sometimes the BMS drives the blinds directly. More often a separate shading system makes the moves and the BMS gives it information and watches what it does."
          onSite="Ask early who owns the shading logic: the BMS contractor or the blind supplier. If nobody can answer, the commissioning will go round in circles."
        >
          <p>You will meet blinds connected to a BMS in roughly three ways:</p>
          <ul>
            <li>
              <strong>Directly from BMS outputs.</strong> The outstation drives an interlocked relay
              pair per blind or per group. Simple, and suited to a few groups of blinds, but every
              bit of sun and weather logic has to be written into the BMS strategy.
            </li>
            <li>
              <strong>Through a lighting or room control bus.</strong> KNX, for example, has blind
              actuators, weather stations and room panels that do the work between them, and the BMS
              links to that system through a gateway. The BMS sends or reads things like occupancy,
              mode and alarms rather than individual up and down commands.
            </li>
            <li>
              <strong>Through a dedicated shading controller.</strong> The blind supplier provides
              its own system with its own sensors and sun-tracking logic. The BMS connects to it
              over BACnet, Modbus or a set of volt-free contacts.
            </li>
          </ul>
          <p>
            Whatever the method, decide and write down which points cross the boundary. The usual
            ones are:
          </p>
          <ul>
            <li>
              <strong>From the BMS to the shading system:</strong> occupied or unoccupied mode,
              heating or cooling season, a central command such as &ldquo;all up for
              cleaning&rdquo;, and sometimes a request to hold blinds closed overnight.
            </li>
            <li>
              <strong>From the shading system to the BMS:</strong> wind alarm active, sensor fault,
              motor or group fault, and position or status where the system can report it.
            </li>
          </ul>
          <p>
            The BMS does not need to see every blind. It needs enough to know the system is healthy,
            to raise an alarm when the weather protection has acted, and to coordinate the blinds
            with the heating, cooling and lighting it already runs.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Cabling the system"
          plainEnglish="Blinds mean 230 V motor feeds and low-voltage bus or signal cables running to the same windows. Keep them apart, or use a method BS 7671 permits."
          onSite="Blind runs often share ceiling voids and perimeter trunking with small power. Plan the segregation with the containment, not when the cables are already in."
        >
          <p>
            A typical facade has a 230 V radial feeding blind controllers or motors, plus Band I
            cabling for the bus and the sensors, and for switches where they are bus push-buttons. A
            local up/stop/down switch wired straight to a 230 V motor is part of the mains circuit
            and is wired as such. Where these run along the same perimeter, Regulation 528.1 applies
            in the same way it does to any BMS wiring. The bus cable for a KNX twisted pair system
            is SELV, but that does not by itself let it share a wiring system with mains cables.
          </p>
          <p>
            Roof sensors bring their own issues. The cable to a wind sensor or weather station runs
            out to an exposed position, so it needs suitable protection and a sensible entry into
            the building. Treat it as you would any outdoor control cabling.
          </p>
        </ConceptBlock>

        <RegsCallout
          source="BS 7671:2018+A4:2026 Regulation 528.1"
          clause="A Band I circuit is not to share a wiring system with a Band II circuit unless one of the specified methods is adopted, for example insulating for the highest voltage present, using a separate conduit, trunking or ducting system, or, in a multicore cable, an earthed metal screen between the Band I and Band II cores."
          meaning="Blind bus and sensor cables either run separately from the 230 V motor feeds or use a permitted method such as cable insulated for the highest voltage present. It is a choice of methods, not an outright ban, and BS 7671 itself sets no separation distance here."
          cite="Paraphrased; verified against the Elec-Mate BS 7671 reference set (2018+A4:2026)."
        />

        <InlineCheck
          id="bms-4-4-interface"
          question="A supplier’s shading controller handles all sun tracking and wind protection. Which point is it most important for the BMS to receive from it?"
          options={[
            'The slat angle of every individual blind',
            'The sun’s calculated altitude',
            'The motor run hours for each blind',
            'Wind alarm active, and system fault',
          ]}
          correctIndex={3}
          explanation="The BMS needs to know when the weather protection has acted and when the system is unhealthy, so that someone is told. Individual slat angles and the sun’s position are the shading controller’s own business; reading them into the BMS adds points without adding control."
        />

        <SectionRule />
        <ContentEyebrow>Following the sun</ContentEyebrow>

        <ConceptBlock
          title="Sun tracking: where the sun is and whether it is shining"
          plainEnglish="The controller knows where the sun is from the date, time and location. A sensor tells it whether the sun is actually out. Put the two together and it knows which windows are getting direct sun right now."
          onSite="If blinds on one facade come down on cloudy days or stay up in bright sun, look at the sensor for that facade and at the controller’s clock and location settings before anything else."
        >
          <p>Automatic shading answers two separate questions:</p>
          <ul>
            <li>
              <strong>Could the sun be hitting this facade?</strong> That comes from calculation.
              Given the date, the time, and the building&rsquo;s location and orientation, the
              controller works out the sun&rsquo;s position in the sky and which facades face it. No
              sensor is needed for this part, but the clock and the location must be right.
            </li>
            <li>
              <strong>Is the sun actually shining on it?</strong> That comes from a solar sensor. A
              bright, clear morning brings the east blinds down; an overcast one leaves them up.
            </li>
          </ul>
          <p>
            The solar sensor should be fitted on the facade whose blinds it controls, so it sees
            what those windows see. A sensor on the roof, or on another face of the building, will
            bring blinds down for sun they are not getting, or leave them up when they are. Large
            buildings often have one per facade, or per group of windows facing the same way.
          </p>
          <p>
            Where blinds have tiltable slats, the controller can go further than up or down. It sets
            the slat angle so the direct beam is just blocked and the rest of the daylight still
            comes in, adjusting as the sun climbs and falls. Some systems also know about
            neighbouring buildings and trees, and leave blinds up at times when the facade is in
            shadow even though the sun is in the right part of the sky.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Grouping blinds"
          plainEnglish="Blinds are controlled in groups that share a view of the sun: usually by facade, floor and room. Get the groups wrong and nothing else can be right."
          onSite="Walk the facades with the drawings during installation and check the groups. A window on the corner of the building may face a different way from the rest of its room."
        >
          <p>
            Blinds are rarely controlled one by one from the BMS. They are grouped, and a typical
            hierarchy runs from the whole building, through each facade, down to a room or a single
            bay. Commands come from the top (all up for window cleaning), sun logic usually acts on
            facades, and occupants act on their own room.
          </p>
          <p>
            Grouping by orientation is the one that matters most, because sun tracking is
            meaningless if a group contains windows facing different ways. Grouping by room matters
            for overrides, so that one person&rsquo;s button moves their blinds and not the whole
            floor&rsquo;s.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Weather protection</ContentEyebrow>

        <ConceptBlock
          title="Wind, rain and ice: what can damage external blinds"
          plainEnglish="External blinds are delicate in bad weather. The system brings them up before the wind gets too strong, keeps fabric out of the rain, and does not try to drive them when they might be frozen."
          onSite="Ask the blind supplier for the wind limit of the product and the delay they want before blinds go back out. Those settings belong to the blind, not to the BMS engineer’s judgement."
        >
          <p>External shading needs protection from three things:</p>
          <ul>
            <li>
              <strong>Wind.</strong> An anemometer on the roof measures wind speed. When it passes
              the limit for the product, the blinds retract and are held up. The limit comes from
              the blind manufacturer for that product and installation, not from a general rule.
              After the wind drops, the system waits for a period before allowing them out again, so
              that a gusty day does not cycle them up and down.
            </li>
            <li>
              <strong>Rain.</strong> Fabric awnings and screens are usually retracted when a rain
              sensor detects rain, so that they are not left out wet.
            </li>
            <li>
              <strong>Ice.</strong> A blind frozen in place can be damaged by driving it. Systems
              often use outside temperature, sometimes with rain, to stop automatic movement when
              icing is likely.
            </li>
          </ul>
          <p>
            Two principles hold the whole thing together. First, weather protection has the{' '}
            <strong>highest priority</strong>: it overrides the sun logic, the BMS, and an occupant
            pressing a button. Second, it must <strong>fail safe</strong>: if the wind sensor stops
            reporting, through a cut cable, a seized anemometer or a dead supply, the system cannot
            prove the wind is safe and should retract the blinds and raise an alarm.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Siting the weather station"
          plainEnglish="Put the wind sensor where it feels the real wind, clear of the building and anything that shelters it."
          onSite="A wind sensor tucked behind a plant room or a parapet will read calm while the facade blinds are taking a beating. If retraction seems late, look at where the sensor is."
        >
          <p>
            A roof weather station typically combines temperature, humidity, wind, solar and rain
            sensing. Where a mast is used, it should stand about two metres above the building and
            away from anything that shades or shelters it, such as plant, parapets, taller parts of
            the building and trees. Check planning requirements before putting up a mast.
          </p>
          <p>
            Remember the difference between the sensors on it. The wind sensor wants open air above
            the roof. The solar sensors want to see what each facade sees, which is why they are
            often mounted on the facades themselves rather than on the mast.
          </p>
        </ConceptBlock>

        <Scenario
          title="Blinds that stayed out in a storm"
          situation="A four-storey office has external venetian blinds on the south and west facades, controlled by a supplier’s shading system and monitored by the BMS. After a windy night the facilities manager reports bent slats on the west side. The BMS shows no wind alarm overnight. The shading controller’s log shows the wind speed reading flat at zero for three weeks."
          whatToDo="Treat a reading stuck at zero as a sensor fault, not calm weather. Isolate and check the anemometer: it is found seized, so it has been sending a valid-looking zero. Replace it, then test the protection end to end by simulating high wind and confirming every external group retracts and the BMS shows the alarm. Agree with the supplier how a stuck or missing signal will be detected in future, for example an alarm when the reading does not change for a set period, and ask for a sensor fault point to be passed to the BMS."
          whyItMatters="A broken cable is easy to detect. A sensor that fails into a believable value is not, and wind protection that trusts it is no protection at all. The BMS was only watching the wind alarm, so it had nothing to report. Monitoring the health of the sensor, not just its alarm, is what would have caught it."
        />

        <InlineCheck
          id="bms-4-4-priority"
          question="Wind protection has retracted the external blinds. An occupant presses the down button in their office. What should happen?"
          options={[
            'Nothing — weather protection overrides occupant commands',
            'The blinds come down, because occupants always have the final say',
            'The blinds come down halfway as a compromise',
            'The BMS asks the facilities manager to approve the request',
          ]}
          correctIndex={0}
          explanation="Weather protection sits above every other command, including occupant overrides. Lowering an external blind in high wind risks damaging it and anything below it. Once the wind has dropped and the hold-off period has passed, the occupant’s controls work again."
        />

        <SectionRule />
        <ContentEyebrow>People, priorities and safety</ContentEyebrow>

        <ConceptBlock
          title="Overrides and the order of priority"
          plainEnglish="Several things want to move the blinds at once. The controller sorts them into an order, and the order needs to be written down and agreed."
          onSite="Ask for the priority list in the description of operation. If it is not written down, the commissioning engineer is making it up, and the occupants will find the gaps."
        >
          <p>A common order, from highest to lowest, is:</p>
          <ul>
            <li>
              <strong>Weather protection:</strong> wind, rain, ice, and any sensor fault treated as
              bad weather
            </li>
            <li>
              <strong>Maintenance and cleaning:</strong> a central command that holds a facade up
              while window cleaning or work is in progress
            </li>
            <li>
              <strong>Occupant override:</strong> the local button or room panel
            </li>
            <li>
              <strong>Automatic control:</strong> sun tracking, glare, and the heating, cooling and
              night settings from the BMS
            </li>
          </ul>
          <p>
            Occupant overrides usually expire. After a set time, or when the room is next empty, the
            blind returns to automatic. Without that, one press in March leaves a blind on manual
            until someone notices in August. How long an override lasts is a design and client
            decision; make sure it has been made.
          </p>
          <p>
            If the fire strategy says anything about blinds, for example that some must retract to
            keep an escape route or a smoke vent clear, that action is driven from the fire alarm
            system&rsquo;s own interface, just as plant shutdown is. The BMS may monitor it. It
            should not be the path the action depends on.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Working safely on blinds that move on their own"
          plainEnglish="An automatic blind can start at any moment because the sun came out, the wind got up, or a timer ran. Isolate before you touch it."
          onSite="Putting a zone into manual on the BMS is not isolation. Someone else can change it, and the weather protection may still drive the blind."
        >
          <p>
            Automatic blinds are machinery that starts without warning. Fingers in a head rail, a
            hand on a slat pack, or a ladder against an external blind are all at risk if the motor
            is commanded while you are there. The rules are the ones you already follow, applied to
            equipment people tend not to think of as dangerous:
          </p>
          <ul>
            <li>
              Isolate the motor supply, lock it off, and prove it dead at the motor before working
              on it.
            </li>
            <li>
              Remember that the control may be fed from somewhere else. A blind actuator or group
              controller may have its own supply, and relay outputs may carry a live from another
              board.
            </li>
            <li>
              Tell the controls or shading contractor and the building manager what you have
              isolated, so a missing group is not chased as a fault while you work.
            </li>
            <li>
              For external blinds, plan the access equipment and the weather. Do not rely on the
              wind protection to keep a blind still while you are next to it.
            </li>
          </ul>
        </ConceptBlock>

        <ConceptBlock
          title="Commissioning: what to prove before handover"
          plainEnglish="Prove that every blind goes the right way, stops in the right place, belongs to the right group, and retracts when the weather says so."
          onSite="Do the direction and group checks before the ceilings close. Finding a reversed motor behind a finished bulkhead is a much longer job."
        >
          <p>A sensible commissioning list for a motorised shading installation includes:</p>
          <ul>
            <li>
              <strong>Direction.</strong> Up command gives up, down gives down, on every motor. Pay
              special attention to anything the wind protection drives.
            </li>
            <li>
              <strong>Limits.</strong> Each blind stops at its set top and bottom positions without
              straining or leaving a gap.
            </li>
            <li>
              <strong>Interlocking.</strong> Try to command both directions at once and confirm the
              motor only sees one.
            </li>
            <li>
              <strong>Groups and addressing.</strong> Each local button and each automatic group
              moves the blinds the drawings say it should, and no others.
            </li>
            <li>
              <strong>Weather protection.</strong> Simulate high wind, rain and sensor failure, and
              confirm the right groups retract, stay retracted through occupant commands, and raise
              the right alarms at the BMS.
            </li>
            <li>
              <strong>Sun tracking.</strong> Clock, date and location set correctly, solar sensors
              mapped to the right facades, and a check on a sunny day that each facade reacts when
              it should.
            </li>
            <li>
              <strong>BMS interface.</strong> Every agreed point proved across the boundary in both
              directions.
            </li>
          </ul>
          <p>
            Some of this can only be proved properly in the right weather. Note in the handover what
            was simulated and what still needs checking in real conditions, the same way seasonal
            commissioning is handled for heating and cooling.
          </p>
        </ConceptBlock>

        <FAQ
          items={[
            {
              question: 'Can I put several 230 V blind motors on one switch?',
              answer:
                'Only if the motor maker allows it. Many tubular motors must not have their direction conductors paralleled with another motor, and the instructions will say to use a group control unit or one switch or relay output per motor. Check before you wire, not after the first one fails.',
            },
            {
              question: 'Does a 230 V blind motor really need an earth?',
              answer:
                'A typical tubular motor is a metal-bodied Class I appliance, so its protective conductor has to be connected like any other. The old description of these motors as three-wire with no earth was wrong. If a motor is genuinely double-insulated it will be marked as such; do not assume it.',
            },
            {
              question: 'Who sets the wind speed at which external blinds retract?',
              answer:
                'The blind manufacturer, for that product in that installation. It depends on the blind type, size and how it is fixed. The controls engineer enters the figure; they should not choose it. Ask for it in writing and record it in the commissioning sheets.',
            },
            {
              question: 'Should the BMS be programmed to open the blinds on fire alarm?',
              answer:
                'If the fire strategy needs blinds to move, that action should be driven from the fire alarm system’s own interface, like any other fire action. The BMS can monitor it and report it. It should not be the route a life-safety action relies on.',
            },
            {
              question: 'Why do the blinds keep going back down after I raise them?',
              answer:
                'Usually because the override has expired and the automatic control has taken over again, or because the room is in a group with other windows and the group command is winning. Check the override time and the grouping before treating it as a fault.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'Shading balances four jobs: cutting glare, keeping summer heat out, letting winter sun in and holding heat in at night. Only combined light, blind and HVAC control weighs them all.',
            'External blinds keep heat out far better than internal ones, but bring weather protection, roof sensors and access problems with them.',
            'A typical 230 V tubular motor has an up live, a down live, a neutral and an earth. The control must be interlocked so both directions can never be fed together.',
            'Interlock by hardware — an interlocked switch, a changeover relay or a blind actuator — never by trusting a program to keep two outputs apart.',
            'Sun tracking needs a correct clock and location for the sun’s position, and a solar sensor on each facade to say whether it is actually shining there.',
            'Weather protection outranks everything, including occupants, and a missing or stuck wind signal must be treated as high wind.',
            'Automatic blinds start without warning. Isolate and lock off before working on them; a manual setting on the BMS is not isolation.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself" />

        <PrevNext
          noun="section"
          prevHref="/study-centre/upskilling/bms-module-4-section-3"
          prevLabel="Access control interfaces"
          nextHref="/study-centre/upskilling/bms-module-4-section-5"
          nextLabel="Metering and sub-metering"
        />
      </HubBody>
    </HubPage>
  );
};

export default BMSModule4Section4;
