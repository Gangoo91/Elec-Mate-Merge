/**
 * Unit 306E — Understand the Principles of Inspection, Testing and Commissioning
 * Learning outcome 2 — Understand the methods and procedures for conducting a visual
 * inspection on enclosures, cables, conductors and wiring systems
 * Criterion 2.2 — How to carry out a visual inspection of the main/key aspects of
 * standard single-phase circuits
 *
 * Approach: criterion 2.1 inspected the equipment. This page walks the circuit — origin
 * to board to first accessory to last accessory to notices — in the fixed order the
 * Schedule of Inspections is laid out in, applying the Reg 642.3 items to a standard
 * single-phase final circuit and recording what was found with the four codes.
 * Every value, regulation and section reference on this page is taken from the
 * published Elec-Mate Level 2 Module 4.5.1 and Module 4.5.2 lessons.
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
import { videos } from '@/data/study-centre/video-library';
import { EquipotentialBonding } from '@/components/study-centre/diagrams';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';

const quizQuestions = [
  {
    id: 1,
    question: 'What does Reg 642.1 fix about the order of work?',
    options: [
      'Inspection precedes testing and is normally done with that part of the installation under inspection disconnected from the supply',
      'Testing precedes inspection so that the visual checks can be guided by the results',
      'Inspection and testing are a single combined activity recorded in any order',
      'Inspection is carried out energised so that live readings can be taken by eye',
    ],
    correctAnswer: 0,
    explanation:
      'Inspection is first and it is done dead. There is no point pushing test current through a circuit that is visibly mis-wired, and you cannot safely walk a board with the cover off and your eyes on terminations if those terminations are live.',
  },
  {
    id: 2,
    question: 'Which regulation pairing is verified by the single-pole devices item on the walk-through?',
    options: [
      'Reg 132.14.1 and Reg 530.3.3 — fuses, circuit-breakers and single-pole switches in the line conductor only',
      'Reg 522.6.201 and Reg 522.6.202 — cables concealed in walls',
      'Reg 411.3.3 and Reg 411.3.4 — additional protection by 30 mA RCD',
      'Reg 526.1 and Reg 526.3 — connections and accessibility of joints',
    ],
    correctAnswer: 0,
    explanation:
      'A fuse in the neutral leaves the circuit live when the fuse blows. A single-pole switch in the neutral leaves the lamp or appliance permanently live. It is one of the highest-frequency defects found on first-fix inspection, which is why it has its own item on the form.',
  },
  {
    id: 3,
    question: 'A cable is run in a wall less than 50 mm from the surface and outside a prescribed zone, on a circuit with 30 mA RCD additional protection. How is that recorded?',
    options: [
      'Compliant — the regulation permits a non-zone route where 30 mA RCD additional protection is provided',
      'Non-compliant — cables must always be in a prescribed zone regardless of protection',
      'A limitation — the route cannot be confirmed once the wall is finished',
      'Not applicable — routing items do not apply to concealed cables',
    ],
    correctAnswer: 0,
    explanation:
      'The inspection item asks whether the wiring system meets BS 7671, not whether it took the simplest route. A non-zone cable in a wall with 30 mA RCD additional protection complies. The route itself belongs in the description on the certificate.',
  },
  {
    id: 4,
    question: 'On a TN-C-S domestic installation, how is the earth electrode item recorded?',
    options: [
      'Not applicable — the supply provides the earthing arrangement and no installation electrode is required',
      'A limitation — the electrode applies but could not be accessed at the cut-out',
      'Compliant — record the electrode resistance measured at the cut-out',
      'Non-compliant — every installation must have its own earth electrode',
    ],
    correctAnswer: 0,
    explanation:
      'Not applicable means the item does not apply to the installation in front of you. A TN-C-S supply uses the combined neutral and earth conductor of the supply, so no consumer electrode is required. A limitation would mean the item applies but could not be reached.',
  },
  {
    id: 5,
    question: 'A lighting circuit has the line conductor landed in the neutral terminal of a ceiling rose and the neutral in the line terminal. What is this?',
    options: [
      'A polarity defect, normally caught at testing under Reg 643.6, which the identification-of-conductors inspection item should also catch by eye',
      'A routing defect caught by the cables item under Section 522',
      'An earthing defect caught by the earthing arrangements item under Reg 411',
      'A connection defect caught by the connection-of-conductors item under Section 526',
    ],
    correctAnswer: 0,
    explanation:
      'The lamp may still work, but the switch will leave it permanently live, which is a shock risk at every lamp change. Inspection targets it through conductor identification at every accessory; testing targets it by instrument.',
  },
  {
    id: 6,
    question: 'Which of these notices sits under the identification and warning notices item?',
    options: [
      'The RCD test notice at the consumer unit, required by Reg 514.12.2 where RCDs are present',
      'The measured continuity value for the main bonding conductor to the gas service',
      'The circuit design current calculated for the shower radial',
      'The disconnection time achieved on the ring final circuit',
    ],
    correctAnswer: 0,
    explanation:
      'The notices item covers the board way labels, the main switch label, the periodic inspection notice, the RCD test notice and the BS 951 bonding labels. Measured values and calculated design figures belong on the test schedule, not on an inspection item.',
  },
  {
    id: 7,
    question: 'What does Reg 531.3.3 now say about Type AC RCDs?',
    options: [
      'They shall only be used to serve fixed equipment where it is known that the load current contains no DC components',
      'They may be used on any circuit provided the rated residual operating current is 30 mA',
      'They are permitted on socket circuits but not on lighting circuits',
      'They are unrestricted, and the choice of RCD type is left entirely to the designer',
    ],
    correctAnswer: 0,
    explanation:
      'Modern equipment routinely contains DC components — LED drivers, switch-mode supplies, induction hobs, chargers and heat pumps — so Type A has become the effective minimum for general fixed wiring. A Type AC device on a kitchen socket circuit is a non-conformance.',
  },
  {
    id: 8,
    question: 'You finish the walk-through with every item compliant except two limitations and no non-compliances. What happens next?',
    options: [
      'Hand it to the supervisor for review, agree how the limitations are recorded on the certificate, then proceed to dead testing',
      'Re-mark the two limitations as non-compliances so the form shows a full set of findings, then energise',
      'Energise the installation and carry out the dead tests on the live circuits to save a second visit',
      'Issue the certificate on the strength of a clean inspection, since testing is only needed where something failed',
    ],
    correctAnswer: 0,
    explanation:
      'A clean inspection is the gate to testing, not a substitute for it. The limitations are either revisited or recorded on the certificate, and dead testing follows. Only when both inspection and testing are complete does the certificate get issued.',
  },
];

export default function Lesson306e_2_2() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'Inspection precedes testing and is normally done with that part of the installation disconnected. That order is fixed by Reg 642.1 and it is not a preference.',
          'The walk follows the installation — origin, then the board, then each circuit accessory by accessory, then earthing and bonding, then the notices. Same order every time.',
          'Reg 642.3 supplies the items. On a standard single-phase circuit the working ones are identification, routing, conductor selection, connection, single-pole devices, accessories, protective conductors, disconnection and notices.',
          'Single-pole devices in the line conductor only has its own item because it is one of the highest-frequency defects found at first fix.',
          'Every item gets one of four codes. Compliant, not applicable, limitation, non-compliant. Nothing gets energised while a non-compliance stands.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Walk a standard single-phase circuit from the origin to the last accessory in the same fixed order every time, and explain why the order matters.',
          'Apply each Reg 642.3 inspection item to a single-phase final circuit and say what you are looking at to verify it.',
          'Verify conductor identification, routing, cross-sectional area and connection at every point on the circuit.',
          'Check that every single-pole protective and switching device sits in the line conductor, and recognise why this item has a section to itself.',
          'Record each item using the four codes, distinguishing a genuine limitation from an inspection that was simply not carried out.',
        ]}
        initialVisibleCount={3}
      />

      <SectionRule />

      <ContentEyebrow>The walk, and why the order is fixed</ContentEyebrow>

      <ConceptBlock
        title="Same route through the installation, every single time"
        plainEnglish="A structured inspection follows the installation. Origin, distribution, circuit walk, earthing and bonding, notices. The moment you start jumping around you miss things, and the things you miss are the ones nobody else is going to look at either."
        onSite="The Schedule of Inspections is laid out in roughly this order. Follow the form and the form keeps you honest about the order. Do not try to fill it in afterwards from memory."
      >
        <p>
          Reg 642.1 fixes two things at once — that inspection comes before testing, and that it is
          normally carried out with that part of the installation disconnected from the supply. Both
          have a practical reason behind them.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Inspection first.</strong> There is no value in pushing test current through a
            circuit that is visibly mis-wired or has a loose termination. Fix what the eye can see
            before the instrument comes out.
          </li>
          <li>
            <strong>Dead.</strong> You cannot safely walk a board with the cover off and your eyes on
            terminations if those terminations are at 230 V.
          </li>
          <li>
            <strong>Accessible parts.</strong> You inspect what you can see and reach without
            dismantling the installation. Where access is genuinely limited, that is recorded, not
            guessed at.
          </li>
        </ul>
        <p>
          At Level 3 the expectation shifts. You are no longer just following somebody with a clipboard
          — you are running the walk yourself on a small installation, filling the form in, and handing
          it up for review and counter-signature.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 642.1"
        clause="642.1 Inspection shall precede testing and shall normally be done with that part of the installation under inspection disconnected from the supply."
        meaning="The order is set for you: eyes first, instruments second. That is not a preference about how to spend the morning &mdash; a visible defect found before the test saves you repeating every test it could have influenced. &ldquo;Normally&rdquo; disconnected leaves room for the few checks that can only be made live, but it puts the burden on you to justify working any other way, and the default you plan for is dead."
        cite="BS 7671 Part 6, Chapter 64, Section 642 — Regulation 642.1"
      />

      <VideoCard {...videos.scheduleOfInspections} />

      <SectionRule />

      <ContentEyebrow>Starting at the origin</ContentEyebrow>

      <ConceptBlock
        title="Origin, tails and the board"
        plainEnglish="The first part of the walk is everything between the incoming supply and the outgoing way that feeds your circuit. Get this wrong and nothing downstream matters."
        onSite="Cut-out, meter, tails, main switch, main earthing terminal, main bonding, then the board itself. Cover off, torch on, work left to right so you cannot skip a way."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Supply and metering.</strong> Service cable and service head condition, the
            distributor earthing arrangement, the metering equipment and any isolator present.
          </li>
          <li>
            <strong>Consumer tails.</strong> Cross-sectional area correct — 25 mm² is the common figure
            on a modern domestic board — sheath stripped to the right point, no copper past the
            terminals, sleeving on the protective conductor.
          </li>
          <li>
            <strong>Main switch and enclosure.</strong> Main switch labelled and isolating the
            installation, board enclosure complete, no missing knockouts, all blanking pieces fitted.
          </li>
          <li>
            <strong>Earthing conductor.</strong> Present, continuous from the main earthing terminal to
            the supply earthing terminal, and correctly sized for the supply — typically 16 mm² on a
            100 A TN-C-S arrangement.
          </li>
          <li>
            <strong>Board way labels.</strong> Every way labelled with a circuit description that
            matches the circuit schedule.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <InlineCheck
        id="306e-2-2-check-1"
        question="You reach the board on a finished single-phase installation and the way labels do not match the circuit schedule. What is the correct call?"
        options={[
          'Record it as non-compliant on the labelling item, report it, have it corrected and re-inspected before the installation is energised',
          'Record it as a limitation, because the labels cannot be verified until the circuits are energised',
          'Record it as not applicable, because labelling is a paperwork matter rather than an inspection item',
          'Correct the labels yourself and mark the item compliant without recording anything',
        ]}
        correctIndex={0}
        explanation="Labelling of protective devices, switches and terminals is an inspection item in its own right, and a mismatch between the labels and the schedule is a failure of it. It is recorded as non-compliant and resolved before energising. Correcting it silently leaves no audit trail, and the form is supposed to show what was found."
      />

      <SectionRule />

      <ContentEyebrow>Identification and cable routes</ContentEyebrow>

      <ConceptBlock
        title="Identification of conductors along the whole circuit"
        plainEnglish="Every conductor on the circuit has to be identifiable as what it is, at every point you can see it. This is the item that catches a transposition before an instrument does."
        onSite="Brown, blue, green and yellow throughout. Switched lives identified with brown sleeving at both ends, not just at the switch. Every bare protective conductor sleeved at every termination including the flying lead to a metal back box."
      >
        <p>
          A line conductor landed in the neutral terminal of a ceiling rose is a polarity defect. The
          lamp still lights, so nothing looks wrong — but the switch is now in the neutral and the lamp
          stays live with the switch off, which is a shock risk at every lamp change. Testing targets it
          under the polarity test; inspection targets it by conductor identification at every accessory.
          Either check on its own can miss what the other finds.
        </p>
        <p>
          Where an installation carries both pre-harmonisation and post-harmonisation colours, a durable
          mixed-colours warning notice at the board is industry good practice — the clause that formerly
          required it at 514.14 was deleted by Amendment 2:2022, so its absence is no longer a coded
          non-compliance against that clause, but the reason for it has not gone away. The point of the
          notice is to tell the next person to verify polarity before connecting anything.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 514.4.2"
        clause="514.4.2 Protective conductor The bi-colour combination green-and-yellow shall be used exclusively for identification of a protective conductor and this combination shall not be used for any other purpose."
        meaning="Exclusively works in both directions, and that is the part worth holding on to. Green-and-yellow tells you the conductor is protective and nothing else, so on inspection you can read it at face value &mdash; and it can never be borrowed for a switch wire, a functional connection or a spare core, however convenient the colour is to hand. A green-and-yellow conductor doing another job is a defect in its own right, not a labelling untidiness."
        cite="BS 7671 Part 5, Chapter 51, Section 514 — Regulation 514.4.2"
      />

      <SectionRule />

      <ConceptBlock
        title="Cables — where they run and what size they are"
        plainEnglish="Two items, one look. Is the cable in a route the regulations permit, and is it the size the design called for."
        onSite="You will inspect most of this at first fix, before the plaster goes on, and record a limitation at final inspection with a note saying when and how it was verified."
      >
        <p>Routing, for a cable concealed in a wall or partition less than 50 mm from the surface:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Prescribed zones.</strong> Vertically or horizontally to an accessory, or within
            150 mm of the top of the wall or of an angle formed by two adjoining walls.
          </li>
          <li>
            <strong>Or 30 mA RCD additional protection.</strong> A non-zone route is permitted where the
            circuit has it. That is a compliant result, not a grudging one.
          </li>
          <li>
            <strong>Or mechanical protection.</strong> Sufficient to prevent penetration by nails,
            screws and the like, or earthed metallic containment.
          </li>
        </ul>
        <p>Selection, checked against the circuit schedule rather than against habit:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>1.5 mm².</strong> Typical lighting circuits.
          </li>
          <li>
            <strong>2.5 mm².</strong> Typical ring final circuits.
          </li>
          <li>
            <strong>4 mm².</strong> Typical 32 A radial circuits.
          </li>
          <li>
            <strong>6 mm².</strong> Typical shower circuits.
          </li>
          <li>
            <strong>Device against cable.</strong> The protective device rating has to sit within the
            current-carrying capacity of the conductor it protects, per Reg 433.1.1.
          </li>
        </ul>
        <p>
          Also on this part of the walk: supports at the right intervals, bend radii respected with no
          kinks, no damage to the sheath, and cables not in contact with thermal insulation in a way
          that causes overheating.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Connections and single-pole switching</ContentEyebrow>

      <ConceptBlock
        title="Connection of conductors and connection of accessories"
        plainEnglish="Two separate items that you inspect at the same physical point. Is the termination itself sound, and is the accessory wired the way its maker says it should be."
        onSite="Faceplate off or loose. Look into the terminals. Then look at the arrangement as a whole. Most defects are one of about five things and you will see all five in your first year."
      >
        <p>Connection of conductors, at every termination you can reach:</p>
        <ul className="space-y-2 text-white">
          <li>Every termination secure, with no copper showing past the terminal.</li>
          <li>No insulation trapped inside the terminal.</li>
          <li>Protective conductors sleeved at every point, including the back-box flying lead.</li>
          <li>Joints accessible for inspection, or falling within the exception at Reg 526.3.</li>
          <li>Torque setting consistent with the manufacturer instructions.</li>
        </ul>
        <p>Connection of accessories, at the same point:</p>
        <ul className="space-y-2 text-white">
          <li>Sockets, switches and lighting points wired to the manufacturer diagram.</li>
          <li>Loop-in lighting wired correctly, with permanent and switched live identified.</li>
          <li>No mixing of switched and permanent live in the same terminal.</li>
          <li>Back-box grommets in place, faceplate fixings tight and the plate sitting flat.</li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <InlineCheck
        id="306e-2-2-check-2"
        question="Halfway along a circuit you open a switched fused connection unit and find the fuse carrier sitting in the neutral conductor. Which inspection item catches this?"
        options={[
          'Identification of conductors, because the fuse colour does not match the conductor it is fitted in',
          'Connection of conductors, because the termination at the fuse holder is on the wrong conductor',
          'Connection of single-pole devices for protection or switching in line conductors only',
          'Earthing arrangements, because a fuse in the neutral disturbs the earth fault return path',
        ]}
        correctIndex={2}
        explanation="This is the single-pole devices item, verifying Reg 132.14.1 — a single-pole fuse, switch or circuit-breaker shall be inserted in the line conductor only — together with Reg 530.3.3, which forbids a switching device in the neutral conductor alone. A fuse in the neutral leaves the circuit live when the fuse blows, which is why the item exists separately rather than being folded into the general connection check. It is a fail and it gets fixed before anything is energised."
      />

      <SectionRule />

      <ConceptBlock
        title="Single-pole devices in line conductors only"
        plainEnglish="Every fuse, every circuit-breaker and every single-pole switch on the circuit sits in the line conductor. Never the neutral. It sounds obvious, which is precisely why it gets missed."
        onSite="Check it at the board, check it at every switched fused connection unit, check it at every light switch, and check any in-line fuse on an appliance circuit."
      >
        <p>Three different failures, three different consequences:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>A fuse in the neutral.</strong> When it blows, the circuit is still connected to
            line. Anyone investigating the fault finds live conductors on a circuit that appears dead.
          </li>
          <li>
            <strong>A single-pole circuit-breaker in the neutral.</strong> No overcurrent protection on
            the line conductor. Everything now depends on an upstream device that may not coordinate
            with it.
          </li>
          <li>
            <strong>A single-pole switch in the neutral.</strong> The lamp or appliance is permanently
            live with the switch off. A shock risk at every lamp change.
          </li>
        </ul>
        <p>
          This is one of the highest-frequency defects found at first-fix inspection, particularly with
          unbranded or imported gear. Treat it as a first-class check at every accessory rather than a
          formality you tick at the board.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Earthing, bonding and closing out</ContentEyebrow>

      <ConceptBlock
        title="Earthing, bonding and protective conductors — the verification chain"
        plainEnglish="These three items are one chain and you walk them together. Earthing conductor to the main earthing terminal, main bonding out to the extraneous parts, protective conductors out to every point on the circuit."
        onSite="Spend extra time here. These are the items that protect people under fault conditions, and they are the ones where a missing sleeve or a clamp on painted pipe undoes the whole thing."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Earthing conductor.</strong> Present, correctly sized for the supply, continuous from
            the main earthing terminal to the supply earthing terminal. Typically 16 mm² on a 100 A
            TN-C-S arrangement.
          </li>
          <li>
            <strong>Main earthing terminal.</strong> Clearly identified, accessible, connections clean
            and tight with no corrosion.
          </li>
          <li>
            <strong>Main bonding.</strong> Each extraneous-conductive-part bonded back to the main
            earthing terminal, clamps within 600 mm of the meter or the service entry, on bright clean
            metal, carrying the BS 951 label. Sized per Reg 544.1, typically 10 mm² on a TN-C-S supply
            up to 100 A, but check against the actual supply.
          </li>
          <li>
            <strong>Protective conductors.</strong> Run to and terminated at each point in wiring and at
            each accessory, per Reg 411.3.1.1, with the limited exception of a lampholder having no
            exposed-conductive-parts. Sized per Chapter 54, continuous through the circuit, sleeved green
            and yellow at every termination.
          </li>
          <li>
            <strong>Supplementary bonding.</strong> Where required by a special location, or excluded
            where 30 mA RCD additional protection covers the location instead.
          </li>
        </ul>
        <p>
          Inspection verifies presence, sleeving, secure termination and visual continuity. Electrical
          continuity is confirmed later, by test.
        </p>
      </ConceptBlock>

      <EquipotentialBonding />

      <SectionRule />

      <ConceptBlock
        title="Disconnection, device types and the notices that close the walk"
        plainEnglish="The last two items are the protective devices themselves and the paperwork attached to the board. Both are visual, and both are where a standard single-phase circuit most often falls short of the current amendment."
        onSite="The two failures you will see most are a socket circuit with no 30 mA RCD additional protection, and a Type AC RCD where a Type A is now needed."
      >
        <p>Automatic disconnection, checked against the design:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Device type and rating.</strong> Correct for the load, matched to the cable so the
            rating sits within the conductor capacity, and coordinated with the device upstream.
          </li>
          <li>
            <strong>Additional protection.</strong> 30 mA RCD where Reg 411.3.3 requires it on socket
            outlets up to 32 A, where Reg 411.3.4 requires it on lighting in domestic premises, where
            Reg 522.6.202 requires it for cables in walls outside prescribed zones, and where Reg 415.1.1
            requires it in a special location.
          </li>
          <li>
            <strong>RCD type.</strong> Reg 531.3.3 restricts Type AC to fixed equipment where the load
            current is known to contain no DC components, which makes Type A the effective minimum for
            general fixed wiring.
          </li>
          <li>
            <strong>Arc fault detection.</strong> Where Reg 421.1.7 applies to the premises, the device
            is verified as present.
          </li>
        </ul>
        <p>Notices and labels, the last stop on the walk:</p>
        <ul className="space-y-2 text-white">
          <li>Board way labels matching the circuit schedule, and the main switch labelled.</li>
          <li>Periodic inspection notice fitted, per Reg 514.12.</li>
          <li>RCD test notice fitted where RCDs are present, per Reg 514.12.2.</li>
          <li>BS 951 label at every bonding clamp, per Reg 514.13.</li>
          <li>Surge protection notice where a device is fitted, and any notice a special location needs.</li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <InlineCheck
        id="306e-2-2-check-3"
        question="Which of these findings belongs on the Schedule of Test Results rather than on the inspection record?"
        options={[
          'A protective conductor left unsleeved at a socket outlet',
          'The disconnection time achieved on a line-to-earth fault on the circuit',
          'A single-pole switch found in the neutral conductor at a light switch',
          'A missing BS 951 label on the bonding clamp at the gas service',
        ]}
        correctIndex={1}
        explanation="Disconnection time is a measured or calculated value and it belongs with the test results. The other three are all visual findings — sleeving, device position and a missing label are things the eye catches with no instrument involved, and they sit on the inspection record."
      />

      <SectionRule />

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 642.3 (Inspection — items to be checked)"
        clause="The inspection shall include at least the checking of the following items where relevant: (a) connection of conductors; (b) identification of conductors; (c) routing of cables in prescribed zones, or protection against mechanical damage, in compliance with Section 522; (d) selection of conductors for current-carrying capacity and voltage drop, in accordance with the design; (e) connection of single-pole devices for protection or switching in line conductors only; (f) correct connection of accessories and equipment; (g) presence of fire barriers, suitable seals and protection against thermal effects; (h) methods of protection against electric shock; (l) labelling of protective devices, switches and terminals; (o) presence of danger notices and other warning signs."
        meaning="This is the master list the walk-through is built on, shown here with the items that bite hardest on a standard single-phase circuit. Items (a) to (g) are the workmanship items and they are where most of an inspection time goes. Items (h) onwards are the protection and presentation items. At Level 3 you are not reciting the list — you are expected to recognise each item on the form, know which BS 7671 chapter it maps to, and know what you are physically looking at to verify it. The full regulation continues to item (t) and ends by requiring the inspection to include all particular requirements for special installations or locations."
        cite="Source: BS 7671:2018+A4:2026 Part 6, Chapter 64, Regulation 642.3 (extract)."
      />

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Ticking down the column to keep the form tidy"
        whatHappens={
          <>
            The form has around sixty items and the installation looks well built. The walk turns into a
            glance and the column gets ticked from top to bottom, because they all looked fine and it is
            late. The supervisor signs it without re-checking. Six months later a fault develops and the
            protective conductor at one socket outlet turns out never to have been connected. That item
            is marked compliant on the record, in your handwriting, with a signature under it. The audit
            trail has collapsed and it took no defect at all to do it — only a tick that was never earned.
          </>
        }
        doInstead={
          <>
            Treat every compliant mark as a personal commitment — you looked, you verified, you are
            willing to put your name to it. If you did not look at an item, say so. Record it as a
            limitation with a note saying you did not access it, and the supervisor will either look
            themselves or send you back to do it properly. A form full of honest limitations is far more
            useful than a form full of dishonest ticks, because the whole value of the record is that
            somebody reading it later knows exactly what was checked and what was not.
          </>
        }
      />

      <CommonMistake
        title="Passing the protection items because a device is fitted"
        whatHappens={
          <>
            The walk reaches the protective devices and everything is present and working. There is
            an RCD on the board, the sockets are covered by it, so the additional protection items
            get marked compliant and the inspector moves on to the notices. Nobody looks at what type
            of RCD it is, or at which circuits the additional protection is actually required on as
            opposed to the ones it happens to land on. This is the opposite failure to a careless
            tick — somebody did look, carefully, but checked the installation against what an
            installation used to need rather than against what the design and the current requirements
            ask for. A Type AC device is restricted to fixed equipment where the load current is known
            to contain no DC components, and a socket circuit, a lighting circuit in a dwelling, a
            cable buried outside a prescribed zone and a special location each bring their own
            requirement for 30 mA additional protection. An RCD being present answers none of those
            questions on its own.
          </>
        }
        doInstead={
          <>
            Take the protection items one requirement at a time rather than one device at a time. For
            each circuit on the board, ask which regulation is asking for additional protection here
            and whether what is fitted satisfies it — then read the type off the device rather than
            assuming it from the fact that it trips. Check the device rating against the cable as well
            as against the load, so the rating sits inside the conductor capacity and coordinates with
            the device upstream. Where the premises bring arc fault detection into scope, verify the
            device is actually there. And where something is present but of the wrong type, record it
            as non-compliant with the reason, because &ldquo;an RCD is fitted&rdquo; is not a finding
            anybody can act on.
          </>
        }
      />

      <SectionRule />

      <Scenario
        title="Consumer unit change, walking the kitchen ring — Merthyr Tydfil"
        situation={
          <>
            An old fuse box in a terrace in Merthyr Tydfil has been replaced with a modern board on
            individual protective devices with a surge protective device at the origin. Tails are
            upgraded to 25 mm², the main earthing terminal is in and the main bonding has been renewed.
            Every existing circuit has been reterminated into the new board. The customer is upstairs
            waiting for it to be switched on. The installation is dead and your supervisor hands you the
            form and says walk the kitchen ring.
          </>
        }
        whatToDo={
          <>
            Start at the origin, not at the kitchen. Cut-out and meter condition, tails at 25 mm² into
            the main switch with no copper past the terminals, main switch labelled, earthing conductor
            landed and sized for the supply, bonding clamps within 600 mm of the meter on bright metal
            with the BS 951 labels present. Then the board — way labels matching the schedule, the
            kitchen ring on a protective device with 30 mA additional protection as Reg 411.3.3 requires
            for socket outlets up to 32 A, and the RCD type checked against Reg 531.3.3 rather than
            assumed. Then walk the ring itself, socket by socket, in circuit order. Faceplate loose at
            each one. Brown to line, blue to neutral, sleeved protective conductor to earth. No copper
            past the terminal, no insulation trapped, grommet in the back box, flying lead to the metal
            box sleeved and landed. Conductor size 2.5 mm² as the schedule says. Nothing switched sitting
            in a neutral. The original cable routes are in plastered walls — record that as a limitation
            with a written note saying the runs are no longer visible and that the circuit now has 30 mA
            additional protection. Finish at the notices: periodic inspection notice, RCD test notice,
            surge device notice. Hand it up.
          </>
        }
        whyItMatters={
          <>
            A board change is the most common job you will inspect, and it is the one where the pressure
            to skip the walk is highest because somebody is standing at the top of the stairs waiting.
            The pattern is the same every time — origin, board, circuit, bonding, notices — and once the
            rhythm is consistent a clean walk on a board change takes twenty-five to thirty minutes.
            That is the speed a competent electrician works at, and it is built by doing every item in
            the same order until the order stops being a decision.
          </>
        }
      />

      <SectionRule />

      <FAQ
        items={[
          {
            question: 'How is this walk different from the equipment check in criterion 2.1?',
            answer:
              'Criterion 2.1 stands in front of one piece of equipment and asks four questions about it — where it is, what is holding it, is it intact, are the connections sound. This criterion follows the circuit. It starts at the origin and ends at the last accessory, and it applies the Reg 642.3 items in sequence to everything the circuit touches on the way. Plenty of individual items overlap; the discipline is different, because here the risk is missing a point on the route rather than missing a fault on an item.',
          },
          {
            question: 'Most of the cable is behind plaster. Does that mean most of the routing item is a limitation?',
            answer:
              'On a new installation, no. You inspect as you build, so the runs are verified at first fix before anything is covered, and the record at final inspection says so. The limitation note reads something like cable runs in walls inspected at first fix on a stated date, confirmed in prescribed zones, no longer visible at final inspection. On a board change into an existing installation, the runs may genuinely never have been visible to you, and the limitation stands on its own with a note of what protection the circuit now has.',
          },
          {
            question: 'What is the difference between a not-applicable item and a limitation?',
            answer:
              'Not applicable means the item does not apply to this installation at all — an earth electrode on a TN-C-S supply, three-phase identification on a single-phase installation, bonding to oil in a building with no oil supply. A limitation means the item does apply, but you could not access it without dismantling finished work. Think before marking anything not applicable, because an item that looks not applicable is occasionally a requirement that was missed.',
          },
          {
            question: 'Where does the record of the walk end up?',
            answer:
              'On the Schedule of Inspections, which is one of the model forms in BS 7671 Appendix 6, and which attaches to the certificate for the work. Reg 644.3 is the regulation that requires the inspection to be recorded there rather than simply carried out. The signed form is the audit trail — an inspector reading the pack years later sees exactly what was checked, what was limited, and by whom.',
          },
        ]}
      />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Reg 642.1 fixes the order — inspection precedes testing and is normally done with that part of the installation disconnected from the supply.',
          'The walk follows the installation: origin, board, circuit accessory by accessory, earthing and bonding, notices. Same order every time.',
          'Identification of conductors catches transpositions by eye that the polarity test catches by instrument. Both are needed because either can miss what the other finds.',
          'A cable in a wall less than 50 mm deep is compliant in a prescribed zone, or with 30 mA RCD additional protection, or with sufficient mechanical protection.',
          'Conductor selection is checked against the schedule — typically 1.5 mm² lighting, 2.5 mm² rings, 4 mm² 32 A radials, 6 mm² showers — with the device rating within the conductor capacity per Reg 433.1.1.',
          'Single-pole protective and switching devices sit in the line conductor only, per Reg 132.14.1, and Reg 530.3.3 forbids a switching device in the neutral alone. It is one of the most frequent first-fix defects.',
          'A protective conductor is run to and terminated at each point in wiring and at each accessory, per Reg 411.3.1.1, sleeved green and yellow at every termination.',
          'Notices close the walk — board way labels, main switch label, periodic inspection notice under Reg 514.12, RCD test notice under Reg 514.12.2, BS 951 bonding labels under Reg 514.13.',
        ]}
      />

      <SectionRule />

      <ContentEyebrow>Check yourself</ContentEyebrow>

      <Quiz
        questions={quizQuestions}
        title="Visual inspection of a standard single-phase circuit — knowledge check"
      />
    </div>
  );
}
