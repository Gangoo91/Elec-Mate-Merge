/**
 * BMS Module 5 · Section 5 — Gateways and integration
 *
 * Rebuilt 10 Oct 2026 on the learning primitives. The page teaches what a gateway actually
 * does (it maps points, one by one, between protocols — it is not a router), the integration
 * points schedule as the contract between the trades, what is lost in translation (units,
 * scaling, register numbering, alarm priority and acknowledgement, write access and command
 * priority, stale data), how to test an integrated point end to end, and who owns the fault
 * when an integration does not work. The old page was a sales sheet for gateways with
 * unsourced figures (a sub-100 ms latency claim, DALI device and cable limits, a 24 V supply
 * presented as standard); those are gone, and the page now teaches the judgement an
 * electrician needs on an integration job.
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

const TITLE = 'Gateways and integration | BMS Module 5.5 | Elec-Mate';
const DESCRIPTION =
  'How BMS gateways map points between protocols, why the integration points schedule is the contract, what gets lost in translation, and how to test it end to end.';

const outcomes = [
  'Explain what a gateway does, and tell it apart from a router or a bridge',
  'Read and challenge an integration points schedule, and say why it is the contract between the trades',
  'Name the things that commonly get lost in translation: units, scaling, numbering, alarm priority and write access',
  'Test an integrated point end to end, from the source device to the head end and back',
  'Recognise a stale value from a failed device behind a gateway, and know what should flag it',
  'Work out which party owns an integration fault, and gather the evidence to show it',
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A BACnet router links a BACnet/IP network to an MS/TP trunk. What does it do to the BACnet messages passing through?',
    options: [
      'Passes them across without changing what they say',
      'Rewrites each one into Modbus and back again',
      'Rescales every analogue value to suit the head end',
      'Strips out any command priority the message carried',
    ],
    correctIndex: 0,
    explanation:
      'A router joins different network types that both speak BACnet, so the message content is untouched; only the transport changes. A gateway is the device that has to rebuild a point from one protocol into another, which is where things can be lost. Confusing the two leads people to expect a gateway to be as transparent as a router, and it is not.',
  },
  {
    id: 2,
    question:
      'Which document should settle an argument about whether a chiller’s "low refrigerant pressure" alarm was meant to reach the BMS?',
    options: [
      'The chiller manufacturer’s sales brochure',
      'The agreed integration points schedule',
      'The gateway’s factory default configuration',
      'The electrical installation certificate',
    ],
    correctIndex: 1,
    explanation:
      'The integration points schedule is the contract: it says which points cross the boundary, in which direction, with what units, scaling and alarm handling. If the point is on the agreed list, it is owed. If it is not, it was never in scope, however obvious it seems afterwards. The gateway default proves nothing about what was agreed.',
  },
  {
    id: 3,
    question:
      'A meter’s register map lists supply voltage as an unsigned integer with a multiplier of 0.1. The head end shows 2304 V. What is the most likely cause?',
    options: [
      'The meter is faulty and needs replacing at once',
      'The gateway is polling the wrong slave address on the trunk',
      'The scaling was not applied in the gateway mapping',
      'The RS-485 trunk is missing its end-of-line termination',
    ],
    correctIndex: 2,
    explanation:
      'A value exactly ten times too big, and otherwise sensible, is the signature of a missing scale factor: the raw register is 2304, which is 230.4 V once the multiplier is applied. A wrong address would show a different device’s data or a comms failure, and a termination fault gives errors and dropouts, not a neat ×10.',
  },
  {
    id: 4,
    question:
      'A boiler’s comms card fails. The BMS keeps showing the last flow temperature, unchanged, for a whole day, with no alarm. What was missing from the integration?',
    options: [
      'A faster polling rate configured on the gateway for the boiler',
      'A second gateway installed in parallel with the first one',
      'A trend log set up on the flow temperature point',
      'A communications-fail point that alarms at the head end',
    ],
    correctIndex: 3,
    explanation:
      'A gateway can keep serving the last value it read after the device behind it has gone quiet. Without a comms-fail or "data stale" point that raises an alarm, a frozen number looks exactly like a healthy one. Polling faster or adding a trend would only record the same frozen value more often.',
  },
  {
    id: 5,
    question:
      'A gateway writes every BACnet command it passes on into the same priority slot. An operator override and a schedule both reach a fan through it. What happens?',
    options: [
      'The override wins, because operator commands keep priority 8',
      'Whichever wrote most recently wins, as both share one slot',
      'The schedule wins, because it writes on a regular timetable',
      'The gateway rejects the second write until the first is relinquished',
    ],
    correctIndex: 1,
    explanation:
      'When a gateway puts every command into one fixed slot, the override and the schedule overwrite each other, so the most recent write wins. The operator’s normal priority 8 is lost in translation. A schedule has no special standing, and a slot accepts a new write without waiting for a relinquish.',
  },
  {
    id: 6,
    question:
      'A packaged AHU is integrated over Modbus. The register map documents an alarm word, but nothing about alarm priority or acknowledgement. What does that mean for the BMS?',
    options: [
      'The AHU will send prioritised alarms to the BMS automatically',
      'The BMS must build priority, text and acknowledgement itself',
      'Alarms cannot be integrated from a Modbus device at all',
      'The gateway will copy the AHU display’s priorities across by itself',
    ],
    correctIndex: 1,
    explanation:
      'Modbus moves bits and 16-bit registers; it has no concept of an alarm, a priority or an acknowledgement. The BMS has to read the alarm bits and build the alarm itself: limits, priority, text and who it goes to. If the points schedule does not say so, nobody does it and the alarm arrives as a bare number, or not at all.',
  },
  {
    id: 7,
    question: 'During end-to-end testing of an integrated alarm, which test proves the most?',
    options: [
      'Confirming the alarm point appears in the gateway’s mapping table',
      'Forcing the alarm object into alarm from the BMS head end',
      'Creating the real alarm at the source and watching it arrive',
      'Checking the gateway’s status LED shows good communications',
    ],
    correctIndex: 2,
    explanation:
      'Only a genuine condition at the source proves the whole chain: the device sets the bit, the gateway reads and maps it, and the BMS raises the right alarm with the right priority and text. Forcing it at the head end proves only the last step, and a mapping table or a status LED proves none of the meaning.',
  },
  {
    id: 8,
    question:
      'The head end needs to read a fire alarm "fire detected" status through a gateway. Which approach matches UK practice?',
    options: [
      'Let the BMS shut down the AHUs through the gateway when it sees the status',
      'Give the BMS write access so it can reset the fire panel after a false alarm',
      'Route the smoke damper commands through the gateway to save cabling',
      'Read it for monitoring only; the fire system does the shutdowns',
    ],
    correctIndex: 3,
    explanation:
      'In UK practice the fire detection and alarm system, through its own interfaces, shuts down plant, releases doors and runs smoke control. The BMS watches its status and can handle follow-up tasks that are not life safety. Putting a gateway in the life-safety path adds a device and a translation that the fire strategy never relied on.',
  },
  {
    id: 9,
    question:
      'A Modbus TCP to RS-485 gateway returns exception code 0B for one meter but answers for every other meter on the same trunk. Where do you look first?',
    options: [
      'The head end graphics page that was drawn for that meter',
      'That meter: its supply, slave address and trunk connection',
      'The IP address and subnet mask set on the gateway itself',
      'The BACnet device instance number configured on the head end',
    ],
    correctIndex: 1,
    explanation:
      'Exception 0B means the gateway tried to reach the target device and got no reply. Because the gateway is answering for the other meters, its own network settings are fine. The fault is local to that one meter: dead supply, wrong or duplicated address, or a broken connection at its terminals.',
  },
  {
    id: 10,
    question:
      'Who should normally hold the overall job of coordinating the integration between the BMS and the third-party systems on a project?',
    options: [
      'The electrician who installed and wired the RS-485 trunk',
      'Each third-party equipment supplier, working separately',
      'The BMS contractor, to the scope set by the designer',
      'The building operator, once the building is handed over',
    ],
    correctIndex: 2,
    explanation:
      'The designer defines the integration scope and boundaries; the BMS contractor delivers the system and coordinates the integration with other systems; suppliers provide their device’s data and settings; the electrician provides the physical layer. The operator maintains it afterwards. Leaving coordination to everyone separately is how integrations end up owned by nobody.',
  },
];

const BMSModule5Section5 = () => {
  useSEO(TITLE, DESCRIPTION);
  return (
    <HubPage>
      <HubMasthead
        section="Module 5 · Section 5"
        title="Gateways and integration"
        backTo="/study-centre/upskilling/bms-module-5"
      />
      <HubBody>
        <p className="max-w-3xl text-[15px] leading-relaxed text-white lg:text-[17px]">
          How a gateway turns one protocol&rsquo;s data into another&rsquo;s, why the points
          schedule is the contract that holds an integration together, and how to prove it works
          before anyone signs it off.
        </p>

        <TLDR
          points={[
            'A gateway does not pass messages through. It reads a value in one protocol and rebuilds it as a point in another, one mapped point at a time.',
            'The integration points schedule is the contract between the trades: every point that crosses the boundary, its direction, units, scaling, alarm handling and who owns each end.',
            'Things get lost in translation: units, scale factors, register numbering, alarm priority and acknowledgement, write priority, and whether a value is live or stale.',
            'Test every integrated point end to end: change it at the source, see it arrive correctly, and for writes, command it and watch the plant respond and release.',
            'When it does not work, the fault sits in one of three places: the physical link, the gateway mapping, or the device at either end. Evidence decides which, not opinion.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <SectionRule />
        <ContentEyebrow>What a gateway is for</ContentEyebrow>

        <ConceptBlock
          title="A gateway translates points, it does not forward messages"
          plainEnglish="A gateway sits between two systems that speak different languages. It reads values on one side, rewrites them in the other side's terms, and offers them up as if they were its own points."
          onSite="When someone says &lsquo;it is on the gateway, so the BMS can see it&rsquo;, ask which points have been mapped. A gateway with nothing configured on it shows the BMS nothing at all."
        >
          <p>
            By now you have met several protocols: BACnet for most supervisory and controller
            traffic, Modbus on meters, drives and packaged plant, and KNX, LonWorks, M-Bus and DALI
            in their own corners of the building. Very few buildings are one protocol from end to
            end. A chiller arrives with a Modbus card, the lighting runs on DALI, the heat meters
            are on M-Bus, and the BMS head end expects BACnet. Something has to sit in the middle.
          </p>
          <p>
            That something is a <strong>gateway</strong>. On one side it acts as a client of the
            foreign system: it polls the chiller&rsquo;s Modbus registers, or listens to the
            lighting bus. On the other side it acts as a device in the BMS&rsquo;s own protocol,
            presenting what it read as native points: a BACnet analogue input for chilled water flow
            temperature, a binary input for &ldquo;compressor 1 running&rdquo;. The BMS never talks
            to the chiller. It talks to the gateway, and trusts the gateway to have got the
            translation right.
          </p>
          <p>
            It helps to be precise about the neighbouring words, because they are often used loosely
            on site:
          </p>
          <ul>
            <li>
              <strong>Bridge:</strong> joins two data links and forwards traffic without looking
              inside it. Copper Ethernet to fibre Ethernet is a bridge job.
            </li>
            <li>
              <strong>Router:</strong> joins different network types that carry the <em>same</em>{' '}
              protocol. A BACnet router between BACnet/IP and an MS/TP trunk passes BACnet messages
              across untouched; only the transport changes.
            </li>
            <li>
              <strong>Gateway:</strong> joins different <em>protocols</em>. Nothing passes through
              untouched. Every value is read, interpreted and rebuilt, and every one of those steps
              has been configured by a person.
            </li>
          </ul>
          <p>
            That last point is the whole lesson. A router is transparent by design. A gateway is
            only as good as its mapping, and its mapping is only as good as the information the
            person configuring it was given.
          </p>
        </ConceptBlock>

        <Pullquote>
          A router moves a message. A gateway rewrites it. Every rewrite is a place where meaning
          can be dropped, and somebody has to check that it was not.
        </Pullquote>

        <InlineCheck
          id="bms-5-5-router-gateway"
          question="An MS/TP trunk of BACnet VAV controllers is joined to the BACnet/IP backbone. A Modbus heat pump is joined to the same backbone. Which device does each connection need?"
          options={[
            'A gateway for both, because the networks are different',
            'A router for the VAV trunk, and a gateway for the heat pump',
            'A bridge for the VAV trunk, and a router for the heat pump',
            'A router for both, because both end up on BACnet/IP',
          ]}
          correctIndex={1}
          explanation="The VAV controllers already speak BACnet, so only the network type changes, and a router does that without touching the message. The heat pump speaks Modbus, so its data has to be read and rebuilt as BACnet points, which is a gateway's job. A router cannot turn Modbus registers into BACnet objects."
        />

        <SectionRule />
        <ContentEyebrow>What a mapping actually is</ContentEyebrow>

        <ConceptBlock
          title="Every integrated point is a row of configuration"
          plainEnglish="For each value you want, someone has typed in where to find it on one side, what it means, and what to call it on the other side. Miss a detail and the point is wrong, even if it looks fine."
          onSite="Ask for the gateway&rsquo;s mapping export and the third-party register map at the same time. Laying them side by side is the quickest way to find a point that was mapped from the wrong place."
        >
          <p>
            Take a Modbus meter integrated into a BACnet BMS. For a single value, say total active
            power, the gateway needs to know:
          </p>
          <ul>
            <li>
              <strong>Which device:</strong> on a serial trunk, the meter&rsquo;s slave address.
              Serial line addresses run from 1 to 247, with address 0 reserved for broadcast.
            </li>
            <li>
              <strong>Which table and which register:</strong> Modbus keeps four kinds of data:
              discrete inputs and coils (single bits), and input registers and holding registers
              (16-bit words). Inputs are read-only; coils and holding registers can be written.
            </li>
            <li>
              <strong>How to read the number:</strong> signed or unsigned, one register or two, and
              in which order, plus any scale factor.
            </li>
            <li>
              <strong>What to call it on the BACnet side:</strong> object type, instance number,
              name, units, and whether the BMS may write to it.
            </li>
          </ul>
          <p>
            Two details catch people out again and again. The first is numbering. The Modbus
            protocol numbers the items in each table from 1, but on the wire it addresses them from
            0, so item number X is sent as address X − 1. Manufacturers&rsquo; register maps are
            written both ways, and some gateways expect one convention while the map uses the other.
            The result is every value shifted by one register, which often looks plausible, because
            neighbouring registers on a meter hold neighbouring quantities.
          </p>
          <p>
            The second is that Modbus itself attaches no meaning to anything. A register is a 16-bit
            number. The protocol does not say whether it is a temperature, a pressure or a fault
            code, what units it is in, or whether two registers together form one larger value. All
            of that lives in the device maker&rsquo;s register map, and the binding between the
            protocol and the device&rsquo;s own data is entirely vendor-specific. The gateway
            engineer is reading that document and typing it in. If the document is wrong, out of
            date or for a different firmware version, the integration will be wrong too.
          </p>
          <p>
            On Modbus TCP, a gateway in front of a serial trunk uses one IP address for many meters.
            The client picks the meter behind it using the <strong>unit identifier</strong> in the
            TCP message, which carries the serial slave address through to the trunk. Get the unit
            identifier wrong and you read a different meter perfectly happily.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Trusting a value because it looks reasonable"
          whatHappens="A gateway is mapped one register off. The BMS shows reactive power where active power should be, or line 2 voltage where line 1 should be. Both are believable numbers, so nobody questions them, and months of energy data turn out to be the wrong quantity."
          doInstead="Check every mapped analogue point against the device's own display or a reading you take yourself, at a moment when the quantities on neighbouring registers are different. A point is proven when it matches the source, not when it looks sensible."
        />

        <SectionRule />
        <ContentEyebrow>The points schedule</ContentEyebrow>

        <ConceptBlock
          title="The integration points schedule is the contract between the trades"
          plainEnglish="One spreadsheet that every party agrees: these are the points crossing the boundary, this is what each one means, and this is who is responsible for each side of it."
          onSite="If you are asked to wire or power a gateway and nobody can show you a points schedule, raise it in writing. You are about to install a device whose job has not been defined."
        >
          <p>
            Integration jobs bring together people who rarely share a drawing: the BMS contractor,
            the chiller or AHU supplier, the meter supplier, the lighting contractor, the electrical
            contractor and the client&rsquo;s facilities team. Each one sees only their own side of
            the boundary. The <strong>integration points schedule</strong> is the one document that
            spans it, and good tender documents ask for it from the outset: an indicative list
            identifying every control, monitoring, alarm and integration point in scope, alongside a
            clear statement of what is included, what is excluded and where the system boundaries
            sit.
          </p>
          <p>A workable schedule has, for every point:</p>
          <ul>
            <li>
              <strong>The source:</strong> system, device, protocol address (slave address and
              register, or device instance and object), and data type
            </li>
            <li>
              <strong>The destination:</strong> the point name and object on the BMS, following the
              site naming convention
            </li>
            <li>
              <strong>Direction:</strong> read only, or read and write; and if write, what is
              allowed to write it
            </li>
            <li>
              <strong>Units and scaling:</strong> the units at the source, the scale factor, and the
              units shown at the head end
            </li>
            <li>
              <strong>Alarm handling:</strong> whether it is an alarm, its limits, its priority on
              the BMS and who receives it
            </li>
            <li>
              <strong>Update method:</strong> polled, or reported on change, and how quickly the
              operator needs to see a change
            </li>
            <li>
              <strong>Ownership:</strong> who configures the source end, who configures the gateway,
              who proves the point
            </li>
          </ul>
          <p>
            The schedule is also where scope is controlled. A packaged chiller may offer hundreds of
            registers. Integrating all of them is not a virtue: it costs engineering time, fills the
            head end with values nobody reads, and gives more points to go wrong. The better
            question is which data the operations team will actually use, and the schedule should be
            built from that answer.
          </p>
          <p>
            Naming matters as soon as several systems land on one head end. If the BMS contractor
            calls it <em>AHU1_SAT</em> and the lighting gateway calls a different thing{' '}
            <em>Supply Temp 1</em>, operators cannot find anything and analytics cannot group it. A
            naming convention agreed early, and applied to integrated points just as strictly as to
            the BMS&rsquo;s own, saves a lot of rework.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-5-5-points-list"
          question="A chiller supplier says &lsquo;all our data is available on Modbus&rsquo;. What should happen next for the integration?"
          options={[
            'Map every register the chiller offers so that nothing is missed',
            'Agree a points schedule of the data the operators will actually use',
            'Load the gateway maker&rsquo;s default chiller template and test it',
            'Leave it until commissioning, then map whatever looks useful',
          ]}
          correctIndex={1}
          explanation="&lsquo;All our data is available&rsquo; is an offer, not a specification. The points schedule is the contract. It records, row by row, the source, format, scaling, units, direction, alarm handling and ownership for the data the operators will use. Mapping everything adds cost and clutter and gives more points to go wrong. A default template proves nothing about what was agreed."
        />

        <SectionRule />
        <ContentEyebrow>What gets lost in translation</ContentEyebrow>

        <ConceptBlock
          title="Units, scaling and number format"
          plainEnglish="The number arrives, but not the meaning. Unless someone sets the units and the scale factor in the gateway, the head end shows a raw count with the wrong label on it."
          onSite="A value exactly 10, 100 or 1000 times out is almost always a scale factor. A value that is wildly wrong and jumps around is more often two registers read in the wrong order."
        >
          <p>
            Modbus registers carry whole numbers, so devices encode fractions by scaling. A meter
            might hold 230.4 V as the integer 2304 with a documented multiplier of 0.1, or a
            temperature in tenths of a degree. Values too large for 16 bits are split across two
            registers, and the order of those two words is set by the device maker; the protocol
            only fixes the byte order within one register, most significant byte first. Some maps
            also hold values as signed numbers, so a negative temperature read as unsigned appears
            as a very large positive one.
          </p>
          <p>
            A BACnet analogue object, by contrast, normally carries its units with it. The gateway
            has to bridge that gap: read the raw register, apply the format and the scale factor,
            and present a value with the right units attached. Every one of those steps is a setting
            that can be left at default.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Alarm priority and acknowledgement"
          plainEnglish="The source system may treat an alarm as urgent, latched and needing acknowledgement. After the gateway, it can arrive as a plain on/off bit with no priority, or not arrive at all."
          onSite="For every integrated alarm, ask: who acknowledges it, and where? If the answer is &lsquo;at the chiller and at the BMS&rsquo;, agree which acknowledgement matters, or operators will clear one and leave the other standing."
        >
          <p>
            Protocols treat alarms very differently. BACnet has a full alarm and event model:
            objects carry an event state (normal, off-normal or fault), alarms are routed to
            recipients by notification class according to the state change, time and day, and a
            notification can demand a human acknowledgement. Modbus has none of that. A packaged
            unit&rsquo;s alarms appear as bits in a register, and the protocol knows nothing about
            urgency, text or acknowledgement.
          </p>
          <p>So when an alarm crosses a gateway, someone has to rebuild it on the BMS side:</p>
          <ul>
            <li>Which bit or value means alarm, and what the alarm text should say</li>
            <li>What priority it gets, consistent with the rest of the site&rsquo;s alarms</li>
            <li>Whether it latches until acknowledged, and where acknowledgement happens</li>
            <li>Who receives it, and when</li>
          </ul>
          <p>
            The risk is not only missing alarms. An integration that drags in every warning a
            packaged unit can produce, all at the same priority, buries the critical ones.
            Integrated alarms need to be prioritised as carefully as native ones, or an operator
            dealing with a run of minor messages misses the one that mattered.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Write access and command priority"
          plainEnglish="Reading a value is harmless. Writing one changes how plant runs. A gateway can turn a careful priority scheme into a blunt &lsquo;last write wins&rsquo;."
          onSite="Before any integrated point is made writable, ask what else writes to it, and what happens to the plant when the BMS stops writing. If nobody knows, leave it read-only."
        >
          <p>
            In BACnet, a commandable point keeps a priority array of 16 slots, where 1 is the most
            important and 16 the least. Each writer uses its own slot, the most important non-empty
            slot sets the value, and when a writer has finished it relinquishes its slot so the next
            one down takes over. If every slot is empty, a relinquish default value applies. A write
            sent without a priority lands at 16. The commonly recommended meanings put manual and
            automatic life safety at 1 and 2, critical equipment control at 5, minimum on/off at 6
            and manual operator at 8.
          </p>
          <p>
            That scheme lets a schedule, an operator override and a safety function coexist without
            fighting. A gateway can quietly break it. Writing a BACnet command through to a Modbus
            holding register leaves no priority behind: the register simply holds the last value
            written, by whoever wrote it. A gateway may also write every command it receives into
            one fixed slot, so an operator override and a schedule end up in the same place and the
            most recent one wins. And if nobody relinquishes, a point can stay overridden long after
            the reason has gone.
          </p>
          <p>
            Good practice is to integrate third-party plant read-only by default, and to make a
            point writable only where the points schedule says why, what is allowed to write it, and
            what the plant does if the BMS stops sending: for example, an enable command backed by a
            comms-loss timeout in the unit&rsquo;s own controller, so that if the BMS stops writing,
            the unit drops back to a defined, safe local mode.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Live or stale: the value that stops changing"
          plainEnglish="When the device behind a gateway dies, the gateway may keep showing the last thing it read. The BMS sees a number, so it assumes all is well."
          onSite="Unplug the comms to one integrated device during commissioning and watch the head end. If nothing on the screen tells you, the integration is not finished."
        >
          <p>
            A gateway that polls a device keeps a copy of each value. If the device stops answering
            (power lost, comms card failed, cable cut), many gateways go on serving the last good
            copy to the BMS. The flow temperature sits at a steady figure all day and nobody
            notices, because a steady value is exactly what a healthy, well-controlled plant also
            looks like.
          </p>
          <p>
            The fix is to make communication health a point in its own right. Gateways usually offer
            a comms-status or device-online point for each device behind them, and Modbus itself has
            two exception codes for this situation: one meaning the gateway could not find a path to
            the target, usually a configuration or overload problem, and one (0B) meaning the target
            device did not respond, usually because it is not on the network. A comms-fail alarm on
            every integrated device belongs on the points schedule like any other alarm.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-5-5-priority"
          question="An operator overrides a fan to off at BACnet priority 8. The fan&rsquo;s controller is integrated over Modbus through a gateway that is configured to pass every BACnet write straight through to one holding register. Next morning the BMS schedule writes &lsquo;on&rsquo; at priority 16. What happens at the fan, and why?"
          options={[
            'It stays off, because priority 8 always beats priority 16',
            'It stays off, because Modbus remembers the higher priority',
            'It runs, because the register keeps only the last value',
            'It runs only once the operator relinquishes priority 8',
          ]}
          correctIndex={2}
          explanation="A gateway that keeps a priority array on its BACnet side and writes only the winning value would hold the override. This one forwards each write as it arrives, and a Modbus register keeps only the last value written, so the schedule&rsquo;s &lsquo;on&rsquo; starts the fan. How writes are handled has to be written on the points schedule and tested, not assumed."
        />

        <RegsCallout
          source="Approved Document L Volume 2 (England, 2021 edition, in force now)"
          clause="Paragraphs 6.66, 6.67, 6.72 and 6.73"
          meaning="In a new building whose heating, air-conditioning or combined system has an effective rated output above 180 kW, a building automation and control system should be installed (para 6.66). In an existing building of that size, a system that is being installed or replaced should meet the same specification (para 6.67). Either way it should comply with BS EN ISO 16484, continuously monitor, log and analyse energy use, detect losses of efficiency and interoperate across manufacturers (paras 6.72 and 6.73). From 24 March 2027 the 2026 edition carries the same rules as paras 5.76, 5.77, 5.84 and 5.85. Approved Document L is statutory guidance, not law in itself. Integration is part of what the system is expected to do, so integrated points need to work, not just exist."
          cite="Approved Document L Vol 2 (2021), paras 6.66, 6.67, 6.72 and 6.73"
        />

        <SectionRule />
        <ContentEyebrow>Life safety and the gateway</ContentEyebrow>

        <ConceptBlock
          title="Keep gateways out of the life-safety path"
          plainEnglish="The BMS can watch the fire alarm through a gateway. It should not be the thing that acts on a fire."
          onSite="If a drawing shows smoke dampers or fire shutdown commands going through a BMS gateway, query it with the designer before you wire it."
        >
          <p>
            In UK practice, the actions taken on a fire (shutting down plant, releasing doors,
            running smoke control) belong to the fire detection and alarm system, working through
            its own interfaces. The BMS usually just <em>monitors</em> the fire panel&rsquo;s
            status, and may then handle follow-up that is not life safety, such as logging,
            notifying the facilities team or bringing plant back in an orderly way once the fire
            system has reset. Reading fire panel status through a gateway is common and sensible.
          </p>
          <p>
            Acting on it through a gateway is a different matter. Every gateway adds a device that
            can fail, a mapping that can be wrong, and a poll delay. In plant logic a fire signal
            outranks every other command, manual or automatic, so no BMS override can restart a fan
            that the fire strategy has stopped. That is achieved by the fire system and its
            hardwired interfaces, upstream of the BMS, not by a translated message arriving at a
            controller when the gateway next gets round to it.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Testing it end to end</ContentEyebrow>

        <ConceptBlock
          title="Prove the whole chain, from the source to the screen and back"
          plainEnglish="Do not test the gateway, the BMS and the third-party unit separately and assume the joins work. Make something happen at one end and check it arrives correctly at the other."
          onSite="Record each result against its row on the points schedule. A ticked list with readings is evidence; &lsquo;all points tested OK&rsquo; on a commissioning sheet is not."
        >
          <p>
            Each party will test their own side. The chiller supplier proves the chiller; the BMS
            contractor proves the controllers; the gateway lights up green. None of that proves the
            integration, because the faults on this page live in the joins between them. An
            end-to-end test works through the points schedule, row by row:
          </p>
          <ul>
            <li>
              <strong>Analogue reads:</strong> compare the head end value with the device&rsquo;s
              own display or an independent reading, ideally at two different values. Check the
              units and the scaling, not just that a number appears.
            </li>
            <li>
              <strong>Status reads:</strong> change the state at the source (run the pump, open the
              valve) and see the matching change on the head end, the right way round.
            </li>
            <li>
              <strong>Alarms:</strong> create the real alarm condition at the source where it is
              safe to do so, or use the device&rsquo;s own test function, and check the BMS raises
              it with the agreed text, priority and recipients. Then clear it and check it resets
              and acknowledges as agreed.
            </li>
            <li>
              <strong>Writes:</strong> command from the head end and watch the plant respond, not
              just the BMS point change. Then release the command and confirm the plant returns to
              its normal control.
            </li>
            <li>
              <strong>Comms failure:</strong> disconnect one device behind the gateway and confirm a
              comms-fail alarm appears and its values are flagged, then reconnect and confirm
              recovery.
            </li>
          </ul>
          <p>
            Keep the evidence: the test results for each third-party integration, the gateway
            configuration records (a backup of the configuration file, not just a screenshot), and
            for BACnet devices the manufacturer&rsquo;s protocol implementation conformance
            statement (PICS), which lists the objects and services a device actually supports. A
            soak test, left running while the plant cycles through its normal operation, catches
            dropouts and stale values that a ten-minute test never will.
          </p>
        </ConceptBlock>

        <Scenario
          title="Heat meters that read perfectly, for the wrong flats"
          situation="A block of flats has heat meters on an M-Bus network, brought into the BMS through a gateway for energy reporting. All the meters show sensible energy totals on the head end and the gateway reports every meter online. Three months in, a resident disputes a bill and the facilities team find that the meter reading for their flat does not match the meter in the cupboard."
          whatToDo="Stop treating the integration as proven. Walk a sample of meters: read the display at each one and compare it with the head end, recording the meter serial number as well as the reading. Here two pairs of meters had been entered against each other's flat references in the gateway mapping. Correct the mapping, then check every remaining meter the same way, not just the one that was complained about, and record the evidence against the points schedule."
          whyItMatters="Every individual link worked: the bus, the gateway, the BMS. The error was in the mapping, and only an end-to-end check against the physical device would have found it. Where readings feed billing or compliance reporting, a believable wrong number does more harm than an obvious fault."
        />

        <InlineCheck
          id="bms-5-5-end-to-end"
          question="The gateway status page shows every Modbus device online and every mapped point updating. Which further check is still needed before an integrated analogue point can be signed off?"
          options={[
            'None, because online and updating proves the point works',
            'A restart of the gateway to prove it reconnects on its own',
            'Comparing the head end value with a reading at the source',
            'A check that the point appears on the correct BMS graphic',
          ]}
          correctIndex={2}
          explanation="Online and updating proves the communication works. It says nothing about whether the right register was read, decoded and scaled correctly, and only a comparison with the source proves that. A restart and a graphic check are worth doing, but neither shows the value is right."
        />

        <SectionRule />
        <ContentEyebrow>When it does not work</ContentEyebrow>

        <ConceptBlock
          title="Who is responsible, and how to show it"
          plainEnglish="Integration faults sit on the boundary between companies, which is why they drag on. The cure is clear roles before the job, and evidence during the fault."
          onSite="Your part is the physical layer: power, cabling, terminations, termination resistors and biasing where specified, and labelling. Prove that first and record it, and you will rarely be the one left holding the fault."
        >
          <p>
            Gateways have always raised a contractual question as well as a technical one: when data
            does not cross, whose problem is it? The answer should be written down before work
            starts, and the usual division of responsibility looks like this:
          </p>
          <ul>
            <li>
              <strong>Designer:</strong> sets the integration scope, the system boundaries and the
              control intent.
            </li>
            <li>
              <strong>BMS contractor:</strong> delivers the system and coordinates integration with
              the other systems, including the gateway configuration and the points schedule.
            </li>
            <li>
              <strong>Third-party supplier:</strong> provides an accurate register map or PICS for
              the firmware actually fitted, sets the device&rsquo;s comms settings, and proves their
              side.
            </li>
            <li>
              <strong>Electrical contractor:</strong> provides power, containment, comms cabling and
              terminations to the specification, labelled and recorded.
            </li>
            <li>
              <strong>Commissioning agent or owner&rsquo;s representative:</strong> witnesses and
              validates the end-to-end results.
            </li>
            <li>
              <strong>Facilities team:</strong> keeps it working after handover.
            </li>
          </ul>
          <p>
            When something fails, narrow it to one of three places before anyone argues. Is the{' '}
            <strong>physical link</strong> sound: supply, polarity, termination, addressing, no
            duplicate addresses? Is the <strong>gateway mapping</strong> right: correct device,
            register, format, scaling, object? Is the <strong>device at either end</strong>{' '}
            configured to talk: comms enabled, correct baud rate and parity, correct firmware for
            the map? Gateway diagnostics, Modbus exception codes and the comms-status points tell
            you which, and a recorded test result is worth more than any amount of opinion on a site
            meeting.
          </p>
        </ConceptBlock>

        <Scenario
          title="The chiller that &lsquo;will not talk&rsquo;"
          situation="A new air-cooled chiller is due to be integrated through a Modbus TCP to RS-485 gateway already serving several meters. The meters all read correctly, but every request to the chiller returns an exception from the gateway saying the target device did not respond. The BMS contractor blames the cabling, the chiller supplier blames the gateway, and the electrician is asked to &lsquo;have a look at the wiring&rsquo;."
          whatToDo="Use what is already known. The gateway answers and reaches the meters on the same trunk, so the gateway and most of the trunk are fine; the fault is local to the chiller. Check the chiller end of the trunk: correct A/B polarity at the comms card, a sound screen and common connection, and termination only where the specification puts it. Then ask the chiller supplier to confirm, from the unit's controller, that Modbus is enabled and what slave address, baud rate and parity it is set to, and compare those with the gateway settings."
          whyItMatters="Here the chiller's comms card had shipped with its protocol set to a different option and a default address that clashed with a meter. No amount of rewiring would have fixed it. Splitting the fault into link, mapping and device, and using the exception code as evidence, ended the argument in an hour rather than a fortnight."
        />

        <FAQ
          items={[
            {
              question: 'Is the gateway a single point of failure?',
              answer:
                'For the points that pass through it, yes. If it fails, every integrated device behind it disappears from the BMS together. That is acceptable for monitoring and energy data, provided a comms-fail alarm tells someone. It is another reason to keep life-safety and essential control out of the gateway path, and to keep a backup of the gateway configuration so a replacement can be loaded quickly.',
            },
            {
              question: 'Should an electrician configure the gateway?',
              answer:
                'Only if it is in your scope and you are competent with that product and both protocols. On most jobs the BMS contractor configures the gateway and owns the mapping. Your part is installing it, powering it, cabling the networks to the specification and proving the physical layer. Make sure the points schedule says who does what before you start.',
            },
            {
              question: 'Why not just integrate everything the third-party unit offers?',
              answer:
                'Because every point costs time to map and test, adds load to the network and the gateway, and adds clutter to the head end. Integrating hundreds of unused registers makes the useful ones harder to find and the integration slower to commission. Agree the schedule from what the operations team will use, and leave room to add more later.',
            },
            {
              question: 'What should I hand over for an integration?',
              answer:
                'The final points schedule as tested, with readings; the gateway configuration backup and its firmware version; the third-party register maps or PICS that were used; comms settings for every device (addresses, baud rates, parity, IP settings); the network drawing showing terminations; and the end-to-end test records. Without these, the next engineer has to reverse-engineer the integration from the gateway.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'A router passes messages of one protocol between networks unchanged; a gateway reads and rebuilds points between different protocols, and every point is configuration.',
            'The integration points schedule is the contract: source, destination, direction, units, scaling, alarm handling and ownership for every point that crosses the boundary.',
            'Watch for the classic losses: scale factors, register numbering offset by one, word order, signed values, alarm priority and acknowledgement, and write priority.',
            'Integrate third-party plant read-only by default; make a point writable only with a stated reason, a known fallback and a test.',
            'Give every integrated device a comms-fail alarm, because a gateway can keep serving a frozen value after the device behind it has stopped answering.',
            'Test end to end against the source device, record results row by row, and keep the gateway configuration with the handover.',
            'Keep fire and life-safety actions in the fire system and its own interfaces; the BMS may monitor through a gateway, not act.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself" />

        <PrevNext
          noun="section"
          prevHref="/study-centre/upskilling/bms-module-5-section-4"
          prevLabel="KNX, LonWorks, M-Bus and DALI as networks"
          nextHref="/study-centre/upskilling/bms-module-5-section-6"
          nextLabel="Network design and cyber security"
        />
      </HubBody>
    </HubPage>
  );
};

export default BMSModule5Section5;
