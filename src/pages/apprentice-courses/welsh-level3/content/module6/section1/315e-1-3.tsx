/**
 * Unit 315E · Criterion 1.3 — Electrical circuits.
 *
 * Approach: the circuit shapes a working electrician designs and installs —
 * distribution against final, radial against ring, lighting, dedicated appliance
 * radials, fused spurs and special-purpose circuits. The page is written around
 * the design judgement rather than a list of shapes: which arrangement suits
 * which load, which layout, and which future.
 *
 * Every technical fact, figure and regulation number on this page comes from the
 * existing published teaching in this course on final circuit types
 * (level2/module3/section3/Sub1.tsx).
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
  VideoCard,
} from '@/components/study-centre/learning';
import { ConsumerUnit } from '@/components/study-centre/diagrams';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { videos } from '@/data/study-centre/video-library';

const quizQuestions = [
  {
    id: 1,
    question: 'A radial final circuit is best described as:',
    options: [
      'A single cable leaving the protective device and running out to the loads, branching at accessories rather than looping back',
      'A cable that leaves the protective device, daisies through every accessory and returns to the same device',
      'A circuit protected by two separate devices sharing the load between parallel conductors',
      'A circuit fed from a fused connection unit rather than from a protective device',
    ],
    correctAnswer: 0,
    explanation:
      'Radial means one cable out with no return path. It is the default shape for lighting and for almost every dedicated appliance circuit in UK domestic work.',
  },
  {
    id: 2,
    question:
      'Regulation 433.1.204 permits a ring final circuit wired in 2.5 mm² to be protected by:',
    options: [
      'BS 88 series, BS 3036, BS EN 60898, BS EN 60947-2 or BS EN 61009-1 RCBO at 30 A or 32 A',
      'BS 1362 cartridge fuses rated at 13 A only',
      'BS EN 60269-3 fuses rated above 45 A',
      'Any device rated 40 A or higher provided RCD protection is fitted',
    ],
    correctAnswer: 0,
    explanation:
      'The regulation names the device families and the 30 A or 32 A rating. RCBOs are the modern domestic norm because they combine overload, fault current and 30 mA residual protection in one module.',
  },
  {
    id: 3,
    question: 'A 20 A radial socket circuit in 2.5 mm² T&E is informally guided at:',
    options: [
      'Sockets serving up to 50 m² of floor area',
      'Sockets serving up to 75 m² of floor area',
      'Sockets serving up to 100 m² of floor area',
      'Sockets serving any floor area provided the load is under 20 A',
    ],
    correctAnswer: 0,
    explanation:
      'The On-Site Guide informal figures are 50 m² for a 20 A radial in 2.5 mm² and 75 m² for a 32 A radial in 4 mm², subject to derating.',
  },
  {
    id: 4,
    question: 'A standard domestic lighting circuit is most commonly wired in:',
    options: ['1.5 mm² T&E', '1.0 mm² T&E', '2.5 mm² T&E', '4 mm² T&E'],
    correctAnswer: 0,
    explanation:
      '1.5 mm² on a 6 A or 10 A MCB is the workhorse. 1.0 mm² is permitted but tighter on volt drop for long runs, and 2.5 mm² is over-size for typical lighting loads.',
  },
  {
    id: 5,
    question:
      'In a 3-plate loop-in lighting installation, permanent line, neutral and switched line all terminate at:',
    options: [
      'The ceiling rose or loop-in box',
      'The wall switch back-box',
      'A junction box buried in the wall',
      'The consumer unit neutral bar',
    ],
    correctAnswer: 0,
    explanation:
      'Line and neutral loop through the rose, a switch drop goes down to the wall switch, and the switched line returns to the rose to feed the lamp. It saves cable and keeps the junctions accessible.',
  },
  {
    id: 6,
    question: 'What protects the spur cable downstream of a 13 A switched FCU on a 32 A ring?',
    options: [
      'The 13 A BS 1362 fuse inside the FCU',
      'The 32 A device protecting the ring',
      'The RCD in the consumer unit',
      'Nothing — the spur cable is self-limiting',
    ],
    correctAnswer: 0,
    explanation:
      'The fuse inside the FCU polices everything downstream, which is why you can run as many sockets as you like off an FCU spur and why 1.5 mm² is acceptable below it.',
  },
  {
    id: 7,
    question: 'A 7 kW EV charge point on a single-phase supply needs a protective device closest to:',
    options: ['32 A', '16 A', '20 A', '45 A'],
    correctAnswer: 0,
    explanation:
      'I = 7000 / 230 ≈ 30.4 A, rounded up to a standard 32 A device on its own dedicated radial, usually 6 mm² T&E, with the RCD type specified by the charger manufacturer.',
  },
  {
    id: 8,
    question: 'Which regulation is the design principle behind dividing an installation into circuits?',
    options: [
      'Regulation 314.1',
      'Regulation 433.1.204',
      'Regulation 462.1',
      'Regulation 510.3',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 314.1 requires the installation to be divided into circuits to avoid danger, minimise inconvenience, facilitate inspection and testing, and limit the effects of a single circuit failing.',
  },
];

const faqs = [
  {
    question: 'Why is the UK ring final circuit so unusual internationally?',
    answer:
      'Post-war Britain had a copper shortage and wanted to standardise on the BS 1363 13 A fused plug. A ring lets you feed a lot of sockets from a single 32 A device using only 2.5 mm² cable, because the load splits between two paths. Most other countries use radial socket circuits at 16 A or 20 A in heavier cable. Both work — the UK approach was an economy decision that stuck.',
  },
  {
    question: 'When would you choose a radial over a ring for sockets?',
    answer:
      'When the area served is small enough that a 20 A radial covers it, when the layout is linear rather than looped so a ring would mean a long dead return leg, or when you want fault-finding to be simple. A radial tells you where the break is because everything downstream goes dead. A broken ring leg hides itself until the remaining leg overloads.',
  },
  {
    question: 'Why is a lighting circuit designed at 100 W per lamp position when the lamps are LED?',
    answer:
      'BS 7671 does not set a maximum lamp count, but Table A2 and the On-Site Guide suggest 100 W per lamp position for the design current calculation even on LED installations. It builds in headroom so the same circuit still complies if someone swaps the fittings for something heavier later.',
  },
  {
    question: 'Do EV chargers and PV inverters always need their own circuit?',
    answer:
      'Yes. Both go on dedicated radials sized for the device per the manufacturer instructions. EV chargers also need specific RCD types — Type A with 6 mA DC detection, or Type B for older charger designs — under BS 7671 Section 722, and PV inverters need the AC-side breaker per Section 712.',
  },
];

export default function Lesson315e_1_3() {
  return (
    <div className="space-y-8">
      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        The circuit shapes you design and install, and the judgement behind choosing one over
        another. Get the shape wrong and you get nuisance trips, dead lights, or a cable running hot
        for years.
      </p>

      <TLDR
        points={[
          'A distribution circuit feeds a board. A final circuit feeds loads and ends at the accessory or appliance — nothing else downstream.',
          'Radial is the default: one cable out, branching at accessories, no return path. Ring final is the UK exception that puts 32 A on 2.5 mm² by splitting the load between two paths.',
          'Choosing between them is a design decision about floor area, load profile, layout, fault-finding and who extends the circuit next.',
          'Anything with manufacturer instructions specifying a protective device, RCD type or installation method gets a dedicated circuit of its own.',
          'Regulation 314.1 is the principle behind all of it — divide the installation into circuits to avoid danger and minimise inconvenience.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Distinguish a distribution circuit from a final circuit and identify where each begins and ends.',
          'Describe the operating principle of a radial, a ring final and a loop-in lighting circuit, including the failure mode of each.',
          'Apply Regulation 433.1.204 to the design of a ring final circuit and its spurs.',
          'Justify the choice of circuit arrangement for a given load, floor area and layout.',
          'Select and size dedicated circuits for appliances and special-purpose loads, with the correct isolation.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>Where a design starts</ContentEyebrow>

      <ConceptBlock
        title="Distribution circuits feed boards. Final circuits feed loads."
        plainEnglish="A final circuit starts at a protective device on a board and ends at the accessory or appliance. If something else hangs off the end of it that then feeds further loads, you are looking at a distribution circuit, not a final one."
        onSite="Walk into any house and the consumer unit has six to twelve protective devices on the rail. Each one is the origin of a single final circuit, and the mix of ratings tells you which shapes are downstream before you lift a floorboard."
      >
        <p>
          BS 7671 does not mandate one universal circuit shape. It sets out the protection rules and
          leaves the designer to pick a wiring topology that meets them. The shapes you will
          actually meet on UK domestic and small-commercial work are these, and each of them solves
          a slightly different problem:
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Radial.</strong> Single cable out, branching at accessories. The default shape
            for almost every dedicated load.
          </li>
          <li>
            <strong>Ring final.</strong> Two cables looping back to the same protective device. The
            UK arrangement that lets 32 A run on 2.5 mm².
          </li>
          <li>
            <strong>Lighting loop-in.</strong> A radial in topology, wired in a particular style at
            each rose so the junctions stay accessible.
          </li>
          <li>
            <strong>Shower and cooker.</strong> Dedicated radials sized to the appliance.
          </li>
          <li>
            <strong>FCU spurs.</strong> Fused branches off a ring or radial for fixed appliances,
            with a 13 A BS 1362 fuse policing the spur cable.
          </li>
          <li>
            <strong>Special-purpose dedicated.</strong> Boilers, EV chargers, PV inverters,
            immersion heaters and heat pumps, each on its own circuit with manufacturer-specified
            protection.
          </li>
        </ul>
      </ConceptBlock>

      <VideoCard {...videos.houseWiring} />

      <ConsumerUnit caption="A typical split-load consumer unit. Every protective device on the rail is the origin of one final circuit, and the spread of ratings — 6 A lights, 16 A immersion, 20 A radials, 32 A rings, 40 A shower — tells you which circuit shapes are downstream." />

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 314.1 (Division of installations)"
        clause="Every installation shall be divided into circuits, as necessary, to: (a) avoid danger and minimize inconvenience in the event of a fault; (b) facilitate safe inspection, testing and maintenance; (c) take account of hazards that may arise from the failure of a single circuit such as a lighting circuit; (d) reduce the possibility of unwanted tripping of RCDs due to excessive protective conductor (PE) currents not due to a fault; (e) mitigate the effects of electromagnetic disturbances; (f) prevent the indirect energizing of a circuit intended to be isolated."
        meaning="More circuits, smaller bites. A single fault on one circuit should not take the whole property offline. That principle is why you do not see one giant ring serving a house — you see a kitchen ring, a downstairs sockets ring, an upstairs sockets ring, separate lighting per floor and a stack of dedicated specials."
        cite="Source: BS 7671:2018+A4:2026 — Regulation 314.1."
      />

      <SectionRule />

      <ContentEyebrow>Radial and ring — the two socket-circuit shapes</ContentEyebrow>

      <ConceptBlock
        title="One cable, one direction, one obvious failure mode"
        plainEnglish="The cable leaves the protective device, branches at accessories as needed, and ends at the last point on the run. Nothing loops back."
        onSite="If you can stand at the board and trace a single cable that ends at one location with no return, it is a radial. Kitchen appliance circuits, immersions, dedicated equipment and lighting are all radials."
      >
        <p>The sizes you will meet on domestic radials:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>16 A radial.</strong> 2.5 mm² T&amp;E. Smaller socket loads and fixed equipment.
          </li>
          <li>
            <strong>20 A radial.</strong> 2.5 mm² T&amp;E, sockets serving up to 50 m² of floor area
            under the On-Site Guide informal guidance.
          </li>
          <li>
            <strong>32 A radial.</strong> 4 mm² T&amp;E, or 6 mm² depending on derating, sockets
            serving up to 75 m².
          </li>
        </ul>
        <p>
          <strong>Failure mode.</strong> An open circuit anywhere on the run takes down everything
          downstream of the break. A short to earth trips the protective device. Both are easy to
          localise, because the dead section tells you where to start looking. That
          diagnosability is a genuine design advantage and is worth weighing when you choose the
          shape.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Ring final — two cables, one device, and a fault you cannot see"
        plainEnglish="The cable leaves the protective device, daisies through every socket on the circuit and comes back to the same device. Load at any socket flows in by two paths, so each cable carries only part of the worst-case current."
        onSite="At the board you see two line conductors at one device terminal, two at the neutral bar and two at the earth bar. Open any socket on the ring and there are two cables in, plus any spurs going out."
      >
        <p>
          The clever part is that a 32 A ring works on 2.5 mm² T&amp;E — rated around 27 A clipped
          direct — because the cable only has to carry part of the load at the worst point, with the
          rest going round the long way. A single 32 A radial would need 4 mm² or 6 mm².
        </p>
        <p>
          <strong>Spurs.</strong> One unfused single or twin socket per teed-off point on the ring.
          For more outlets at one location, hang a 13 A switched FCU off the ring and the
          FCU&rsquo;s fuse polices everything downstream of it.
        </p>
        <p>
          <strong>Failure mode, and why it matters more than the radial one.</strong> A break in one
          leg of a ring does not kill anything. The load simply feeds in from one side instead of
          two. Nobody notices until the remaining leg is carrying the whole circuit and starts to
          run hot. That is a hidden defect with a thermal consequence, and it is exactly why
          ring-continuity testing — end-to-end and R1+R2 — is done at every periodic inspection.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 433.1.204 (Ring final circuits)"
        clause="Accessories to BS 1363 may be supplied through a ring final circuit, with or without unfused spurs, protected by a 30 A or 32 A protective device complying with BS 88 series, BS 3036, BS EN 60898, BS EN 60947-2 or BS EN 61009-1 (RCBO). The circuit shall be wired with copper conductors having line and neutral conductors with a minimum cross-sectional area of 2.5 mm² except for two-core mineral insulated cables complying with BS EN 60702-1, for which the minimum cross-sectional area is 1.5 mm²."
        meaning="The headline numbers for every UK ring final: a 30 A or 32 A device, 2.5 mm² minimum in copper, or 1.5 mm² for two-core mineral insulated cable. The regulation also names the device families that are permitted, including the old BS 3036 rewireable fuse that you will still meet on unmodernised boards."
        cite="Source: BS 7671:2018+A4:2026 — Regulation 433.1.204."
      />

      <InlineCheck
        id="315e-1-3-check-1"
        question="You open a consumer unit and find two line conductors in one device terminal, two at the neutral bar and two at the earth bar for the same circuit. What shape is it?"
        options={[
          'A radial with a spur taken from the board',
          'A lighting loop-in circuit',
          'A distribution circuit feeding a sub-board',
          'A ring final circuit',
        ]}
        correctIndex={3}
        explanation="Two of everything at the protective device is the ring-final fingerprint — the cable leaves and returns to the same device. A radial lands a single conductor at each terminal."
      />

      <SectionRule />

      <ContentEyebrow>Choosing between them</ContentEyebrow>

      <ConceptBlock
        title="Ring or radial is a design decision, not a habit"
        plainEnglish="Both arrangements comply. The question is which one suits this load, this layout and this building over the next twenty years."
        onSite="The honest answer on most domestic rewires is that the ring is chosen because the next electrician expects one. That is a valid reason, but it should be a reason you can state, not a reflex."
      >
        <p>Work through these five questions and the shape usually picks itself:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>How much floor area?</strong> A 20 A radial in 2.5 mm² covers up to around
            50 m², a 32 A radial in 4 mm² up to around 75 m². Above that, or where the sockets are
            spread around a perimeter, the ring earns its place.
          </li>
          <li>
            <strong>What is the load profile?</strong> Kitchens stack high-power loads — kettle,
            toaster, microwave and dishwasher all at once. Giving the kitchen its own circuit keeps
            a trip out of the rest of the house and reduces the chance the 32 A device ever sees a
            genuine overload.
          </li>
          <li>
            <strong>What shape is the run?</strong> A ring only pays for itself if the return leg
            does useful work on the way back. A linear run out to a garden office with a dead
            return leg is a radial dressed up as a ring.
          </li>
          <li>
            <strong>Who fault-finds it next?</strong> A radial announces a break. A ring hides one.
            On a property with a heavy test regime, or a landlord who will want the circuit proved
            periodically, the hidden-break behaviour of a ring is a real cost.
          </li>
          <li>
            <strong>Who extends it next?</strong> A ring constrains the next person — one unfused
            spur per teed-off point, and everything beyond that has to go through an FCU. A radial
            can be extended within its rating far more freely. Design for the person who comes
            after you.
          </li>
          <li>
            <strong>What has to be notified?</strong> Creating a new circuit is notifiable under
            Part P; adding a single compliant spur to an existing circuit is not. That does not
            change which shape is right, but it does change the paperwork and the programme, so it
            belongs in the conversation with the customer before you commit to a layout.
          </li>
        </ul>
        <p>
          Whichever shape you land on, the overload protection still has to be satisfied on its own
          terms. Regulation 433.1 does not care how the cable is routed — it cares that the
          protective device, the design current and the cable current-carrying capacity line up. A
          ring is not a way of escaping that requirement; it is a way of meeting it with less
          copper, and only where the load genuinely splits between the two legs.
        </p>
        <p>
          Regulation 314.1 is the hook for all of this. The reg does not tell you ring or radial; it
          tells you to divide the installation so that a fault does not cause danger or unnecessary
          inconvenience, and so that inspection, testing and maintenance stay practical. Your choice
          of shape is how you satisfy it.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Lighting circuits</ContentEyebrow>

      <ConceptBlock
        title="A radial in topology, loop-in in style"
        plainEnglish="A 6 A or 10 A radial that visits every ceiling rose. At each rose the permanent line and neutral loop through, and a switch drop goes down to the wall switch — the switched line comes back to the rose to feed the lamp."
        onSite="Open any pendant rose and you find three terminal blocks: line loop, neutral loop, switched line. Cables in are usually the feed from upstream, the feed going downstream, and the drop to the switch. That is the 3-plate."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Cable.</strong> 1.5 mm² T&amp;E. 1.0 mm² is permitted but rare in modern work
            because it is tighter on volt drop over a long loft run.
          </li>
          <li>
            <strong>Protective device.</strong> 6 A or 10 A. 6 A is fine for any normal domestic
            lighting circuit; 10 A is used where a lot of drivers or older filament loads share the
            circuit.
          </li>
          <li>
            <strong>Design current.</strong> BS 7671 does not mandate a maximum lamp count, but
            Table A2 and the On-Site Guide suggest allowing 100 W per lamp position for the design
            current calculation even on an LED install, so that a future swap-out does not break
            the design.
          </li>
        </ul>
        <p>
          <strong>Failure mode.</strong> An open circuit on the loop drops every lamp downstream of
          the break. An open circuit on a switch drop kills that one lamp only. That split makes
          lighting faults quick to localise if you understand the topology before you start
          testing.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="315e-1-3-check-2"
        question="Every light from the landing onwards has gone dead, but the landing light and everything before it still works. Where is the fault most likely to be?"
        options={[
          'In the switch drop to the landing light',
          'An open circuit in the loop between the landing rose and the next rose downstream',
          'At the protective device, which has partially failed',
          'In the neutral bar of the consumer unit',
        ]}
        correctIndex={1}
        explanation="An open circuit on the loop takes out everything downstream of the break and leaves everything upstream working. A fault in a switch drop would kill one lamp only, and a device failure would kill the whole circuit."
      />

      <SectionRule />

      <ContentEyebrow>Appliance and special-purpose circuits</ContentEyebrow>

      <ConceptBlock
        title="Dedicated radials sized to the appliance"
        plainEnglish="One appliance, one circuit, no sharing. The device and cable are sized on the appliance maximum demand — after diversity, in the case of a cooker."
        onSite="The cable runs from the board straight to a 45 A cooker switch and on to the connection unit behind the appliance. Showers get a dedicated 45 A pull-cord in the bathroom."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Cooker, 7 kW oven plus 7 kW hob.</strong> Around 14 kW connected, but diversity
            from On-Site Guide Appendix A reduces the design current to about 10 A plus 30% of the
            remainder plus 5 A for the socket. Typically lands on a 32 A device in 6 mm² T&amp;E.
          </li>
          <li>
            <strong>9.5 kW shower.</strong> I = 9500 / 230 ≈ 41 A, so a 40 A or 45 A device on
            6 mm² T&amp;E clipped direct on a short run.
          </li>
          <li>
            <strong>10.5 kW shower.</strong> I = 10 500 / 230 ≈ 46 A, so a 50 A device on 10 mm²
            T&amp;E.
          </li>
        </ul>
        <p>
          Both appliances need local isolation — the 45 A cooker switch or the bathroom pull cord —
          so the customer can power them down without going to the board. Regulation 462.1 is the
          hook.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="FCU spurs — putting the protective boundary where you need it"
        plainEnglish="A 13 A BS 1362 fuse in a faceplate. Hang it off a ring or radial when you want a dedicated supply to a fixed appliance without using up a socket, and the fuse takes over protection from that point on."
        onSite="Switched FCUs go anywhere the customer might need local isolation — boilers, immersions, kitchen hoods. Unswitched FCUs suit set-and-forget loads: door bells, CCTV transformers, alarm panels."
      >
        <p>The fuse does the protective work, and that has two design consequences:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>The spur cable can be smaller.</strong> 1.5 mm² T&amp;E off a 32 A ring is fine
            downstream of a 13 A FCU, because the fuse limits the current that cable can ever see.
          </li>
          <li>
            <strong>The fuse is sized to the appliance.</strong> 3 A for boilers and door bells, 5 A
            for low-power equipment, 13 A for general fixed loads. Manufacturer instructions
            specify it.
          </li>
        </ul>
        <p>
          On a 32 A ring you can run as many spur sockets as you like off a single FCU, because the
          FCU protects the lot collectively. That is the standard approach for a kitchen extension
          where you need more outlets than the ring will take as unfused spurs.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Special-purpose circuits — where the manufacturer writes the specification"
        plainEnglish="Anything with manufacturer instructions specifying a particular protective device, RCD type or installation method gets its own circuit. No sharing, no spurs."
        onSite="Modern boards increasingly look like this: a small ring, a couple of lighting circuits, then a stack of dedicated radials for everything else. The EV charger has driven that change more than anything."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Boiler.</strong> Switched 13 A FCU with a 3 A or 5 A fuse, off the ring or its
            own short radial. Local isolation is mandatory.
          </li>
          <li>
            <strong>Immersion heater, 3 kW.</strong> I = 3000 / 230 ≈ 13 A, so a dedicated 16 A or
            20 A radial in 2.5 mm² T&amp;E with a double-pole 20 A switch by the cylinder.
          </li>
          <li>
            <strong>EV charger, 7.4 kW.</strong> Dedicated 32 A radial in 6 mm² T&amp;E, with an RCD
            of Type A plus 6 mA DC detection or as specified in the charger manual. BS 7671 Section
            722 gives the installation rules.
          </li>
          <li>
            <strong>PV inverter, 4 kW.</strong> Dedicated AC-side 20 A or 32 A breaker per the
            inverter manual, labelled, with isolation each side under Section 712.
          </li>
          <li>
            <strong>Heat pump.</strong> Dedicated radial sized for steady-state plus start-up
            current, typically 25 A or 32 A on 6 mm² T&amp;E.
          </li>
        </ul>
        <p>
          <strong>Why dedicated.</strong> A nuisance trip on a shared circuit can disable a fridge
          full of food, a boiler in winter or a charging vehicle. The regulation-level hook is
          314.1. The practical hook is the manufacturer instructions, which are enforceable through
          Regulation 510.3.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 462.1 (Provisions for isolation)"
        clause="Each electrical installation shall have provisions for isolation from each supply."
        meaning="Every installation needs a way to be cut off from its supply, and for final circuits that requirement drives the cooker switch, the shower pull cord, the FCU rocker and the EV charger isolator. Each one is the local isolation provision for that dedicated circuit, and it is why a special-purpose circuit almost always has a switch somewhere other than the board."
        cite="Source: BS 7671:2018+A4:2026 — Regulation 462.1."
      />

      <InlineCheck
        id="315e-1-3-check-3"
        question="A customer wants two extra double sockets behind a TV, fed from an existing ring final. What is the compliant arrangement?"
        options={[
          'Two unfused spurs teed off the same point on the ring in 2.5 mm²',
          'One unfused spur in 1.5 mm² feeding both sockets',
          'A 13 A switched FCU on the ring, with both sockets in 1.5 mm² downstream of it',
          'Both sockets connected directly into the ring as extra points, making three cables at one back box',
        ]}
        correctIndex={2}
        explanation="Only one unfused spur is permitted per teed-off point. Fit an FCU and the 13 A fuse polices everything downstream, so 1.5 mm² and any number of outlets are then acceptable."
      />

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Running a second unfused spur off the same point on a ring"
        whatHappens={
          <>
            The customer wants two double sockets behind the TV. You spur off the nearest socket on
            the ring and tee both back boxes off the same conductor. That is two unfused spurs from
            one point — a clear breach of the On-Site Guide and Regulation 433.1.204. If both
            sockets pull close to 13 A on a heavy load, the spur cable is running over its Iz with
            no fuse in front of it. The insulation cooks slowly, and by the time the 32 A device
            notices you already have a fire risk.
          </>
        }
        doInstead={
          <>
            One unfused spur per teed-off point. Where you need more outlets in one location, fit a
            13 A switched FCU on the ring and run the additional sockets in 1.5 mm² downstream of
            it — collectively protected at 13 A, no breach, no fire risk. It costs two minutes and
            a few pounds in fittings.
          </>
        }
      />

      <CommonMistake
        title="Reaching for a ring because that is what the last board had"
        whatHappens={
          <>
            A single-storey extension gets a ring for six sockets along one wall, with a long return
            leg dragged back through the loft doing no useful work. The circuit costs more in cable
            than a radial would, it adds a second fault path that nobody will test again until the
            next periodic, and when a leg does break the customer will never know until the
            surviving leg is carrying everything.
          </>
        }
        doInstead={
          <>
            State the reason before you pick the shape. Run the floor area against the 50 m² figure
            for a 20 A radial and the 75 m² figure for a 32 A radial. If the area and the load fit
            inside a radial and the layout is linear, use one — fewer terminations, a clearer
            failure mode and an easier circuit for the next person to extend.
          </>
        }
      />

      <Scenario
        title="Rewiring a two-bedroom terrace in Caernarfon"
        situation={
          <>
            A 1930s terrace is being fully rewired. Ground floor is a knocked-through lounge and
            dining area of about 40 m², plus a small kitchen. Upstairs is two bedrooms and a
            bathroom with a 9.5 kW shower going in. The owner also wants an EV charger on the front
            wall and has asked you to keep the board tidy for the future.
          </>
        }
        whatToDo={
          <>
            Split it on Regulation 314.1 and size each circuit on its own terms. Kitchen on its own
            ring, because that is where the stacked loads are and a trip there should not kill the
            rest of the house. Ground-floor sockets in the through room sit comfortably inside
            50 m², so a 20 A radial in 2.5 mm² is defensible and gives a clean failure mode.
            Upstairs sockets on a ring or a radial depending on the run — if the cable would have to
            be dragged back through the loft for nothing, take the radial. Lighting split per floor
            in 1.5 mm² on 6 A devices, designed at 100 W per lamp position. Shower on its own
            dedicated radial: 9500 / 230 ≈ 41 A, so a 40 A or 45 A device on 6 mm², with a
            double-pole pull cord for local isolation under Regulation 462.1. EV charger on a
            dedicated 32 A radial in 6 mm² with the RCD type from the charger manual, per Section
            722.
          </>
        }
        whyItMatters={
          <>
            The shape of a circuit is not just about today. It decides who can safely add to it
            later, what the cable can carry under a future load, and whether the next inspector
            signs it off or codes it. Being able to say why each circuit is the shape it is turns a
            rewire into a design.
          </>
        }
      />

      <SectionRule />

      <FAQ items={faqs} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'A final circuit starts at a protective device and ends at the load. A distribution circuit feeds another board.',
          'Radial: one cable out, no return. 16 A and 20 A in 2.5 mm² (around 50 m²), 32 A in 4 mm² or 6 mm² (around 75 m²).',
          'Ring final: 32 A on 2.5 mm² because the load splits between two paths. Regulation 433.1.204 sets 30 A or 32 A and the permitted device families.',
          'A broken radial announces itself; a broken ring leg hides until the surviving leg overheats. That is why ring continuity is tested at every periodic.',
          'Lighting is a radial wired loop-in: 1.5 mm² on 6 A or 10 A, designed at 100 W per lamp position even on LED.',
          'Cooker and shower are dedicated radials sized after diversity, with local isolation under Regulation 462.1.',
          'An FCU moves the protective boundary — the 13 A BS 1362 fuse polices the spur, so 1.5 mm² and any number of outlets are acceptable downstream.',
          'Specials (EV, PV, heat pump, boiler, immersion) get dedicated circuits because Regulation 314.1 and the manufacturer instructions, enforceable under 510.3, require it.',
        ]}
      />

      <ContentEyebrow>Check yourself</ContentEyebrow>

      <Quiz questions={quizQuestions} title="Electrical circuits — knowledge check" />
    </div>
  );
}
