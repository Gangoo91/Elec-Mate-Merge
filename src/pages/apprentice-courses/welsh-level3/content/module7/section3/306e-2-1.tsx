/**
 * Unit 306E — Understand the Principles of Inspection, Testing and Commissioning
 * Learning outcome 2 — Understand the methods and procedures for conducting a visual
 * inspection on enclosures, cables, conductors and wiring systems
 * Criterion 2.1 — How to confirm the installed electrical equipment is located and
 * secured correctly and electrically and mechanically sound
 *
 * Approach: the criterion asks four separate questions about a piece of equipment and
 * this page keeps them separate — where it sits, how it is held there, whether it is
 * physically intact, and whether the connections into it will carry current for the
 * life of the installation. Reg 642.2 supplies the frame; the detail is the kit and the
 * fabric an electrician actually meets.
 * Every value, interval and regulation on this page is taken from the published
 * Elec-Mate Level 2 Module 4.5.1 and Level 3 Module 5.2.4 lessons.
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
    question: 'Reg 642.2 sets three verification objectives for the inspection. What are they?',
    options: [
      'Compliance with Section 511, correct selection and erection in accordance with BS 7671 and manufacturers instructions, and no visible damage or defect impairing safety',
      'Correct cable size, correct protective device rating and correct earthing arrangement',
      'Correct labelling, correct notices and correct circuit schedule',
      'Continuity, insulation resistance and polarity results all within the design values',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 642.2 is the three-part question behind every inspection item. Is it the right kit, was it installed correctly per BS 7671 and per the manufacturer, and is anything visibly damaged so as to impair safety.',
  },
  {
    id: 2,
    question: 'What does Section 526 require of an electrical connection?',
    options: [
      'Durable electrical continuity and adequate mechanical strength',
      'A torque setting recorded on the certificate for every terminal',
      'A crimped ferrule on every stranded conductor without exception',
      'A maximum of two conductors in any one terminal',
    ],
    correctAnswer: 0,
    explanation:
      'Those two requirements are what electrically and mechanically sound means at a termination. Every termination at the board, at accessories, in joints and at appliance outlet points has to satisfy both.',
  },
  {
    id: 3,
    question: 'What is the typical unsupported span for PVC/PVC twin and earth in the 1.5 to 2.5 mm² sizes?',
    options: [
      'Around 250 mm horizontal and 400 mm vertical between fixings',
      'Around 1 m horizontal and 1.5 m vertical between fixings',
      'Around 50 mm horizontal and 100 mm vertical between fixings',
      'There is no figure — cable may be left unsupported in any orientation',
    ],
    correctAnswer: 0,
    explanation:
      'Those are the typical figures from the on-site guidance and manufacturer recommendations. Heavier cables and larger cross-sectional areas need closer support. Steel tray is a different figure again, typically 1 to 1.5 m with bracing at corners and tees.',
  },
  {
    id: 4,
    question: 'A socket outlet is fitted within 600 mm of a kitchen sink with an IP2X faceplate. What is the finding?',
    options: [
      'Non-compliant — the location calls for a higher degree of protection, IP44 minimum being the practical recommendation near a sink',
      'Compliant — IP2X is the minimum for any indoor location so it satisfies the requirement',
      'Not applicable — IP ratings apply only to outdoor equipment',
      'A limitation — the IP rating cannot be verified once the faceplate is fitted',
    ],
    correctAnswer: 0,
    explanation:
      'Equipment has to be selected for the external influences of its location. Indoor dry is IP2X territory, near a sink is IP44, outdoor under a soffit IP44 and outdoor exposed IP65. An IP2X accessory in a wet location is a selection defect the inspection exists to catch.',
  },
  {
    id: 5,
    question: 'What is the minimum cross-sectional area for the conductor connecting a surge protective device?',
    options: [
      '6 mm², kept as short as practicable, per Reg 534.4.10',
      '1.5 mm², matching the lighting circuit conductors',
      '25 mm², matching the meter tails',
      'There is no minimum — the connection follows the device manufacturer only',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 534.4.10 sets 6 mm² as the minimum and the conductor is kept as short as practicable, connected to the main earthing terminal and to the line conductor. Inspection confirms the size, the route length and the connection.',
  },
  {
    id: 6,
    question: 'A cable passes through a 60-minute fire-rated wall and the gap is filled with expanding foam. What is the position?',
    options: [
      'A defect — the penetration must be sealed with a tested product matched to the fire rating of the element',
      'Acceptable — foam seals the gap against draught and smoke equally well',
      'Acceptable provided the foam is applied to both faces of the wall',
      'Outside the scope of electrical inspection, because fire stopping is a builder responsibility',
    ],
    correctAnswer: 0,
    explanation:
      'Foam is combustible and has no tested fire rating. Section 527 requires the opening left after the wiring system passes through to be sealed to the degree of fire resistance prescribed for that element. Tested intumescent products matched to the rating, the cable and the bundle size are what satisfies that.',
  },
  {
    id: 7,
    question: 'Where should a hole for a cable be drilled through a floor joist?',
    options: [
      'Within the centre third of the joist depth and in the middle 25 to 40 per cent of the span',
      'As close to the top edge of the joist as the cable will allow',
      'Directly above a supporting wall, where the joist is strongest',
      'Anywhere in the joist, since a cable hole is too small to matter structurally',
    ],
    correctAnswer: 0,
    explanation:
      'Drilling is preferred to notching, and the structural rules from Building Regulations Part A and BS 5268 place the hole in the centre third of the depth and the middle 25 to 40 per cent of the span, away from the joist supports. Notches in the top are limited in depth and confined to a prescribed zone.',
  },
  {
    id: 8,
    question: 'You cannot inspect the terminations behind a sealed busbar shroud on a finished board. How is that recorded?',
    options: [
      'LIM — a limitation, with a clear note of what could not be accessed, flagged to the supervisor',
      'Compliant, on the basis that a sealed shroud implies the terminations behind it were made correctly',
      'Non-compliant, because any termination that cannot be seen must be treated as a defect',
      'Not applicable, because hidden terminations fall outside the scope of an inspection',
    ],
    correctAnswer: 0,
    explanation:
      'Inspection is visual and accessible-parts based and you do not dismantle a finished installation to inspect it where that is impracticable. LIM records the limitation honestly. The supervisor then decides whether to revisit, accept it, or open the installation up.',
  },
];

export default function Lesson306e_2_1() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'The criterion contains four separate questions. Where is it, what is holding it there, is it undamaged, and will the connections into it carry current for thirty years.',
          'Reg 642.2 frames all four — compliance with Section 511, correct selection and erection per BS 7671 and the manufacturer instructions, and nothing visibly damaged so as to impair safety.',
          'Located correctly is a question about external influences and access, not just about whether the accessory is at the right height.',
          'Secured correctly has published figures behind it — around 250 mm horizontal and 400 mm vertical for PVC/PVC twin and earth in the 1.5 to 2.5 mm² sizes, and 1 to 1.5 m for steel tray.',
          'Electrically sound at a termination means durable electrical continuity and adequate mechanical strength. No copper past the terminal, no insulation trapped in it, sleeving present, torqued to the manufacturer figure.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Separate the four judgements this criterion asks for — located correctly, secured correctly, mechanically sound and electrically sound — and inspect each on its own terms.',
          'Apply the three verification objectives of Reg 642.2 to a piece of installed equipment and say which objective each finding sits under.',
          'Verify that equipment has been selected for the external influences of the location it occupies, using IP and impact ratings.',
          'Check fixings, support intervals and strain relief against the published figures for the cable and containment in front of you.',
          'Judge a termination as electrically and mechanically sound against the durable-continuity and adequate-strength requirements of Section 526.',
        ]}
        initialVisibleCount={3}
      />

      <SectionRule />

      <ContentEyebrow>Four questions, not one</ContentEyebrow>

      <ConceptBlock
        title="Breaking the criterion into what you actually look at"
        plainEnglish="Located, secured, mechanically sound, electrically sound. Four judgements about the same piece of equipment, each of which can pass while another fails. A perfectly terminated consumer unit screwed to a damp wall fails on location. A beautifully positioned socket with a conductor overstripped fails on connection."
        onSite="Go round a piece of equipment in that order and you will not skip anything. Where is it. What is holding it. Is it broken. Are the connections right. Then move to the next one."
      >
        <p>
          The temptation is to do all four at once by eye and call it tidy. Tidy is not one of the four.
          A board can be immaculate and still sit in the wrong environment, or be held on two of the
          four fixings, or have a conductor bottomed out on its insulation behind a terminal screw.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Located correctly.</strong> The right environment, the right zone, the right
            distance from other services, with adequate access to operate and maintain it.
          </li>
          <li>
            <strong>Secured correctly.</strong> The right fixings in the right number at the right
            centres, into something that will hold them, with the cable strain taken before the
            termination.
          </li>
          <li>
            <strong>Mechanically sound.</strong> Enclosure complete, no missing knockouts, nothing
            cracked, bend radii respected, nothing distorted by over-tightening.
          </li>
          <li>
            <strong>Electrically sound.</strong> Every termination giving durable electrical continuity
            and adequate mechanical strength, with conductors correctly identified and protective
            conductors sleeved.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Located and secured correctly</ContentEyebrow>

      <ConceptBlock
        title="Located correctly — the environment decides the equipment"
        plainEnglish="Equipment has to be rated for where it sits. A bathroom accessory is a different specification from a kitchen accessory, which is a different specification from a shed accessory. Get that wrong and the installation is non-compliant before a single test is taken."
        onSite="Run a mental sweep of the whole job. Indoor dry, IP2X minimum. Kitchen near a sink, IP44 is the practical recommendation. Outdoor under a soffit, IP44 minimum. Outdoor exposed, IP65 minimum. Workshop or industrial, IP65 plus an impact rating."
      >
        <p>
          Every accessory faceplate carries its IP rating. Verify it before it is fitted and verify it
          again at inspection, because the item that went in is not always the item that was specified.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>IP2X kitchen socket within 600 mm of a sink.</strong> Should be IP44 minimum. One of
            the most common location defects on a domestic job.
          </li>
          <li>
            <strong>Standard plastic faceplate in a workshop.</strong> Where regular impact is likely,
            the selection is an impact-rated metal-clad accessory.
          </li>
          <li>
            <strong>Indoor luminaire in a damp or outdoor location.</strong> The fitting has to be rated
            for the environment it is actually in, not the one it was bought for.
          </li>
          <li>
            <strong>Bonding clamps.</strong> Located within 600 mm of the meter or where the service
            enters the building, on bright clean metal, with the BS 951 label in place.
          </li>
        </ul>
        <p>
          Access is part of location too. Switchgear that cannot be reached to operate, or a board
          boxed in behind a fitted cupboard, is a location finding even where every termination inside
          it is perfect.
        </p>
      </ConceptBlock>

      <SectionRule />

      <InlineCheck
        id="306e-2-1-check-1"
        question="An accessory has been installed in a location its enclosure is not rated for. What does BS 7671 allow?"
        options={[
          'Nothing — the accessory must always be replaced with one rated for the location',
          'The accessory may stay if the client accepts the risk in writing',
          'The accessory may stay if it is inspected annually rather than on the normal cycle',
          'It may be used where appropriate additional protection is provided in the erection of the installation, and that protection does not impair the operation of the equipment',
        ]}
        correctIndex={3}
        explanation="Where equipment does not by its own construction have the characteristics for the external influences of its location, it may still be used provided appropriate additional protection is added during erection — an over-enclosure, for example — and that protection does not adversely affect how the equipment works. A client signature is not a substitute for that, and a shorter inspection interval does not make an unsuitable enclosure suitable."
      />

      <SectionRule />

      <ConceptBlock
        title="Secured correctly — the figures behind the fixings"
        plainEnglish="Cable support keeps a cable where it was put for the life of the installation — no sag, no strain on terminations, no damage from movement. Equipment fixing does the same job for the box on the wall."
        onSite="Look at the spacing and look at what the fixing is going into. Four fixings in plasterboard with no noggin behind them is not secured, however many screws are in it."
      >
        <p>The published figures you inspect against:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>PVC/PVC twin and earth, 1.5 to 2.5 mm².</strong> Typically around 250 mm horizontal
            and 400 mm vertical between fixings. Heavier cables and larger cross-sectional areas need
            closer support.
          </li>
          <li>
            <strong>Steel cable tray and ladder.</strong> Typically 1 to 1.5 m intervals, with bracing
            at corners and tees.
          </li>
          <li>
            <strong>Fixing type.</strong> Correct cable cleat, P-clip or tray hook. Plastic clips for
            PVC; metal clips with a cable-protecting liner for armoured.
          </li>
          <li>
            <strong>Strain relief at entries.</strong> The cable enters the box or accessory with
            adequate slack and is fixed close to the entry so nothing can pull on the termination.
          </li>
          <li>
            <strong>Suspended equipment.</strong> Pendant and suspension arrangements checked for strain
            relief and termination integrity.
          </li>
        </ul>
        <p>
          Fire performance of the fixing matters on escape routes. Cables there need supports that will
          not fail prematurely in a fire — a plastic clip melts, the cable falls, and it becomes a trip
          hazard for people evacuating.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 522.8.5"
        clause="522.8.5 Every cable or conductor shall be supported in such a way that it is not exposed to undue mechanical strain and so that there is no appreciable mechanical strain on the terminations of the conductors, account being taken of mechanical strain imposed by the supported weight of the cable or conductor itself."
        meaning="When you inspect fixings you are not marking the spacing out of ten &mdash; you are asking whether any strain is reaching a terminal. That is why the clip nearest the accessory matters more than the ones along the run, and why a vertical drop with nothing holding it near the top fails even where the intervals further down look right. The regulation tells you to count the weight of the cable itself, so a heavy run is judged more harshly than a light one over the same span."
        cite="BS 7671 Part 5, Chapter 52, Section 522 — Regulation 522.8.5"
      />

      <SectionRule />

      <ContentEyebrow>Mechanically and electrically sound</ContentEyebrow>

      <ConceptBlock
        title="Mechanically sound — what visible damage actually covers"
        plainEnglish="Reg 642.2 asks whether the equipment is visibly damaged or defective so as to impair safety. That is a wider question than whether anything is obviously broken."
        onSite="Take the lid off, look inside, look at the back box, look at the cable where it enters. Most mechanical defects are at the boundaries — where the cable meets the box, where the box meets the wall, where the lid meets the body."
      >
        <p>What the mechanical check covers on installed equipment:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Enclosure complete.</strong> No missing knockouts in a metal box, blanking pieces
            present, lid and fixings intact, faceplates not cracked or missing.
          </li>
          <li>
            <strong>Grommets in place.</strong> Every back-box entry grommeted so the cable is not
            resting on a cut metal edge.
          </li>
          <li>
            <strong>Bend radii respected.</strong> No kinks, no sharp turns forced into the cable to
            make it reach.
          </li>
          <li>
            <strong>Nothing distorted.</strong> Over-tightened fixings that have bowed a plastic box or
            pulled a faceplate out of flat.
          </li>
          <li>
            <strong>Corrosion and wear.</strong> Particularly at bonding clamps, external enclosures and
            anything in a damp location.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ConceptBlock
        title="Electrically sound — Section 526 at every termination"
        plainEnglish="A connection has to provide durable electrical continuity and adequate mechanical strength. Those two requirements between them are what electrically sound means at a terminal."
        onSite="Every termination at the board, at accessories, in junction boxes and at appliance outlet points gets the same look. It is the highest-volume check on the whole inspection and it is the one where defects hide in plain sight."
      >
        <p>What you are looking at, terminal by terminal:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>No copper showing past the terminal.</strong> An overstripped conductor leaves bare
            metal outside the brass. That is a defect, not a cosmetic issue.
          </li>
          <li>
            <strong>No insulation trapped inside the terminal.</strong> The screw has bottomed out on
            the sheath rather than on the conductor. The joint looks tight and carries a fraction of the
            contact area it should.
          </li>
          <li>
            <strong>Protective conductors sleeved.</strong> Green and yellow sleeving on the bare
            protective conductor at every point, including the flying lead to a metal back box.
          </li>
          <li>
            <strong>Torque to the manufacturer figure.</strong> Reg 642.2 requires erection in
            accordance with manufacturers instructions, and the terminal torque is one of those
            instructions.
          </li>
          <li>
            <strong>Joints accessible.</strong> Connections have to remain accessible for inspection
            unless they fall within the exceptions for maintenance-free joints.
          </li>
        </ul>
        <p>
          A tug test on a first-fix termination, before it is buried in plaster or hidden behind a
          faceplate, is the standard habit that catches the loose ones. Once the installation is
          finished you do not re-open an accessory just to tug it — by then the torque setting is what
          has done the job, and the inspection is visual.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 526.1"
        clause="526.1 Every connection between conductors or between a conductor and other equipment shall provide durable electrical continuity and adequate mechanical strength and protection."
        meaning="Three words to inspect against, and they are not the same test. Durable rules out a joint that is sound today and loose after a winter of heating and cooling. Continuity is the electrical half &mdash; full contact on clean copper, not on sheath. Mechanical strength and protection is the half you can see: the conductor held properly and the joint enclosed. A trapped-insulation termination fails all three at once, which is why it is the defect worth training your eye on."
        cite="BS 7671 Part 5, Chapter 52, Section 526 — Regulation 526.1"
      />

      <SectionRule />

      <InlineCheck
        id="306e-2-1-check-2"
        question="Inside a finished board you find one conductor where the insulation has been clamped under the terminal screw rather than the copper. Which part of the criterion has failed?"
        options={[
          'Located correctly — the conductor has been brought into the wrong terminal',
          'Electrically sound — the connection does not provide durable electrical continuity, and the apparent tightness is a false reading',
          'Secured correctly — the cable needs an additional fixing closer to the entry',
          'Mechanically sound only — the electrical performance is unaffected because the screw is tight',
        ]}
        correctIndex={1}
        explanation="Trapped insulation is an electrical soundness failure. Section 526 requires durable electrical continuity as well as adequate mechanical strength, and a screw bearing on the sheath delivers neither reliably. The screw feels tight, which is exactly why this defect survives a careless look, and the reduced contact area is what heats up later."
      />

      <SectionRule />

      <ContentEyebrow>The fabric behind the equipment</ContentEyebrow>

      <ConceptBlock
        title="The fabric the equipment sits in"
        plainEnglish="Equipment does not float. It is fixed into joists, run through conduit, buried in insulation and pushed through fire-rated walls, and each of those imposes its own rules on how it may be installed."
        onSite="These are the findings that get argued about, because they are as much building as electrical. They are still yours to verify."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Joists.</strong> Drilling is preferred to notching. Holes within the centre third of
            the joist depth and the middle 25 to 40 per cent of the span, away from the supports.
            Notches in the top are limited in depth, typically 0.125 of the joist depth, and confined to
            a prescribed zone.
          </li>
          <li>
            <strong>Conduit fill.</strong> Around 40 to 45 per cent of the cross-sectional area for
            thermoplastic conduit, lower for steel. Higher fill means higher cable temperature and
            potential derating, and it makes withdrawal impractical.
          </li>
          <li>
            <strong>Thermal insulation.</strong> A cable surrounded by insulation is derated heavily. A
            2.5 mm² twin and earth rated 27 A in free air may be limited to around 13.5 A. The design
            has to account for the actual installation method, and the inspection confirms the installed
            cross-sectional area against that method rather than against the free-air figure.
          </li>
          <li>
            <strong>Underground runs.</strong> Armoured cable at an appropriate depth, typically 450 mm
            minimum, with marker tape above it.
          </li>
          <li>
            <strong>Mechanical protection.</strong> Appropriate to the risk of the location — armoured
            or mineral-insulated self-protect, twin and earth needs conduit, trunking or capping where
            the risk warrants it.
          </li>
        </ul>
        <p>
          The most consequential of these is fire stopping. Where a wiring system passes through a
          fire-resisting element, the opening left behind has to be sealed so the element keeps its
          rating. Look at every penetration — is it sealed at all, is the product a tested one, is it
          applied to the depth and surface area the manufacturer drawing calls for, and is it on both
          faces where the system requires both. The common failures, in the order you will meet them:
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Foam.</strong> Combustible, no tested rating, burns out in minutes. Neat, cheap and
            worthless.
          </li>
          <li>
            <strong>Plaster fill.</strong> No fire rating at all.
          </li>
          <li>
            <strong>Partial seal.</strong> One face done, the other left open.
          </li>
          <li>
            <strong>Oversized opening.</strong> Far more hole than cable, which makes a proper seal
            harder and often means additional sealing is required.
          </li>
          <li>
            <strong>No seal.</strong> The penetration was made and never returned to.
          </li>
        </ul>
        <p>
          Tested intumescent products — pillows, mortar, putty, sleeves, batt and coat — matched to the
          fire rating of the element and to the cable bundle are what satisfies the requirement, applied
          per the manufacturer installation drawings. A record or label at the penetration identifying
          the system, the installer and the date is often wanted by building control and is useful for
          whoever maintains it later.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Condition signs, and recording findings</ContentEyebrow>

      <ConceptBlock
        title="Equipment that tells you its own condition"
        plainEnglish="Some installed equipment carries its own soundness indicator, and reading it is part of the inspection rather than an optional extra."
        onSite="Surge protective devices are the obvious case. The module either shows healthy or it does not, and the one showing red has already done its job and now needs replacing."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Presence.</strong> The device is fitted at the origin and has not been removed during
            second fix or maintenance.
          </li>
          <li>
            <strong>Type.</strong> Type 2 is typical at a small commercial or domestic board. Type 1
            where the building has lightning protection or an exposed overhead supply. Type 3 downstream
            for sensitive equipment, in addition to an upstream Type 2.
          </li>
          <li>
            <strong>Status.</strong> Modules indicating healthy, typically a green flag or LED. A
            red end-of-life indicator means the device has absorbed a surge and is a non-conformance.
          </li>
          <li>
            <strong>Connection.</strong> A 6 mm² minimum connecting conductor per Reg 534.4.10, kept as
            short as practicable, connected to the main earthing terminal and to the line conductor.
          </li>
          <li>
            <strong>Notice.</strong> The warning notice fitted where required, so maintenance staff know
            what the device will do to the circuits if it fails closed.
          </li>
        </ul>
        <p>
          Protective devices are read the same way — correct type and rating against the design, rating
          matched to the cable so the device rating does not exceed the current-carrying capacity, and
          nothing bypassed or modified.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ConceptBlock
        title="Recording what you found, including what you could not reach"
        plainEnglish="Every item gets one of four codes. Compliant, not applicable, limitation, or non-compliant. Using them honestly is what makes the record worth anything."
        onSite="The one that gets abused is the tick. A tick is a personal statement that you looked and you are willing to put your name to it. If you did not look, say so."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Compliant.</strong> Inspected, meets BS 7671, no concerns.
          </li>
          <li>
            <strong>Not applicable.</strong> The item does not apply to this installation. Always think
            before using it, because an item that looks not applicable is sometimes a missed requirement.
          </li>
          <li>
            <strong>Limitation.</strong> The item applies but could not be accessed without dismantling
            the installation. A sealed busbar shroud over terminations, a cable run in finished plaster,
            connections behind a fixed appliance. Record clearly what was limited and why.
          </li>
          <li>
            <strong>Non-compliant.</strong> The item fails. It is reported, fixed and re-inspected. The
            installation is not energised until it is resolved.
          </li>
        </ul>
        <p>
          Inspection is visual and accessible-parts based, and you do not break a finished installation
          apart to inspect it where that is impracticable. That is why the limitation code exists. It is
          not a way to skip work — a limitation is recorded when accessing the item would create new
          work or new defects, not when it would simply take another ten minutes.
        </p>
      </ConceptBlock>

      <SectionRule />

      <InlineCheck
        id="306e-2-1-check-3"
        question="Which of these is a legitimate limitation rather than an inspection that was simply not done?"
        options={[
          'The board looked tidy so the terminations were taken as sound',
          'The customer wanted the supply energised so the accessory checks were left',
          'Cable runs in finished plastered walls, inspected and confirmed in prescribed zones at first fix, no longer visible at final inspection',
          'The visit was running late so the bonding clamps were not looked at',
        ]}
        correctIndex={2}
        explanation="A legitimate limitation is one where the item genuinely cannot be accessed without disturbing the installation, and the honest record says what was limited and why — here, runs verified at first fix and since covered by plaster. Tidiness, time pressure and customer pressure are reasons the inspection was not carried out, and recording them as limitations misrepresents the work."
      />

      <SectionRule />

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 642.2 (Inspection — verification objectives)"
        clause="The inspection shall be made to verify that the installed electrical equipment is: (a) in compliance with the requirements of Section 511 (this may be ascertained by mark or by certification furnished by the installer or the manufacturer); and (b) correctly selected and erected in accordance with BS 7671, taking into account manufacturers instructions; and (c) not visibly damaged or defective so as to impair safety."
        meaning="This is the regulation the criterion is written from. Part (a) is the kit itself — is it the right equipment, marked and certified for the job. Part (b) is location and securing — was it put where it belongs, fixed how it should be, terminated to the torque and orientation the maker specifies. Part (c) is soundness — is anything cracked, corroded, distorted or worn to the point that safety is impaired. Every finding you make on a piece of installed equipment lands under one of those three, and being able to say which one is the difference between an observation and an inspection."
        cite="Source: BS 7671:2018+A4:2026 Part 6, Chapter 64, Regulation 642.2."
      />

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Letting the terminations take the weight of the cable"
        whatHappens={
          <>
            A heavy sub-main is dropped into a switch enclosure and landed straight into the terminals
            with the nearest cable fixing well over a metre away. Everything is torqued correctly and
            the installation passes its tests. Over the following year the cable settles under its own
            weight and the whole load is carried by the terminal clamps. One conductor creeps out of
            full engagement, the contact area drops, the joint heats, and the first anybody knows is a
            smell and discoloured insulation at the terminal.
          </>
        }
        doInstead={
          <>
            Fix the cable close to the entry so the strain is taken before the conductor reaches the
            terminal, and leave adequate slack inside the enclosure so nothing is pulling. Inspect for
            that specifically — look at where the last fixing is relative to the entry, and look for a
            cable that is taut rather than relaxed as it enters. Section 526 asks for adequate mechanical
            strength at the connection, and a termination doing structural work has none to spare.
          </>
        }
      />

      <CommonMistake
        title="Accepting a foamed penetration as fire stopping because it looks neat"
        whatHappens={
          <>
            The armoured cable passes through a fire-resisting wall and somebody has filled the gap
            around it with expanding foam, trimmed flush and painted over. It looks finished, and at
            a glance from a metre away it reads as sealed, so it gets a tick. Foam is combustible and
            carries no tested rating, so in a fire it burns out of the opening in minutes and the
            wall stops being a fire-resisting element at exactly the moment it is needed. The same
            tick covers the other versions of this: a penetration filled with plaster, one face
            sealed properly and the other left open, and an opening cut far larger than the cable
            that no amount of product will close correctly. None of them are visible as defects once
            the decorator has been through.
          </>
        }
        doInstead={
          <>
            Inspect the penetration, not the appearance. Ask four questions at every one: is it
            sealed at all, is the product a tested one, is it applied to the depth and surface area
            the manufacturer drawing calls for, and is it done on both faces where that system
            requires both. Tested intumescent products matched to the fire rating of the element and
            to the cable bundle are what satisfies the requirement, installed to the manufacturer
            drawings. Where a penetration is oversized, say so — that is a finding in its own right
            because it usually means additional sealing is required. And look for the record or label
            at the penetration identifying the system, the installer and the date, because without it
            nobody after you can tell a tested seal from a tube of foam.
          </>
        }
      />

      <SectionRule />

      <Scenario
        title="Garage conversion handover — Aberystwyth"
        situation={
          <>
            A garage on the edge of Aberystwyth has been converted into a home office and workshop. The
            new sub-board is fixed to the party wall, a supply runs in armoured cable from the house
            through a fire-rated wall into the garage, there is a surge protective device at the origin
            of the sub-board, sockets along the bench and a socket beside a small sink in the corner.
            Your supervisor wants the equipment checked before any instrument comes out.
          </>
        }
        whatToDo={
          <>
            Take it equipment by equipment, four questions each. The sub-board: located on a dry wall
            with access to operate the main switch, fixed into something that will hold it on all
            fixings, enclosure complete with no missing knockouts and all blanking pieces in, every
            termination with no copper past the brass, no trapped insulation and protective conductors
            sleeved. The surge device: present, the right type for the location, status indicating
            healthy rather than end of life, and its connecting conductor 6 mm² minimum, short, landed on
            the main earthing terminal and the line. The armoured supply: gland made off properly,
            supported at sensible centres along its run, and the penetration through the fire-rated wall
            sealed with a tested intumescent product matched to the rating rather than filled with foam.
            The bench sockets: impact rating appropriate to a workshop where things get dropped. The
            socket by the sink: IP44 as a minimum, not a standard indoor faceplate. Record each finding
            against the item it belongs to, with a limitation and a written note anywhere you genuinely
            could not get to.
          </>
        }
        whyItMatters={
          <>
            Conversions are where equipment ends up in environments nobody designed for. The sink was
            added late, the workshop use was decided after the sockets were specified, and the fire-rated
            wall was somebody else responsibility until it was not. None of those show up on a test
            result. They show up when a person looks at each item and asks the four questions in order,
            which is the whole of this criterion.
          </>
        }
      />

      <SectionRule />

      <FAQ
        items={[
          {
            question: 'How do I judge whether equipment is secured correctly when there is no published figure for it?',
            answer:
              'Fall back on the manufacturer instructions, which Reg 642.2 requires the erection to take into account. They will specify the number and type of fixings, the orientation and often the substrate. Where the figure genuinely does not exist, the test is whether the fixing will hold the equipment for the life of the installation under the loads it will actually see, including anyone leaning on it or pulling a plug out of it hard.',
          },
          {
            question: 'The terminations inside the accessory are hidden once the faceplate is on. Is that always a limitation?',
            answer:
              'Not on a new installation, because you inspect as you build. Second-fix terminations get checked before the faceplate goes on, and first-fix terminations get checked before they are buried. The limitation code is for items you genuinely cannot reach at the point of inspection without dismantling finished work — a sealed busbar shroud, plastered-over runs, connections behind a fixed appliance. Record what was limited and why, and flag it.',
          },
          {
            question: 'Is fire stopping really my responsibility as the electrician?',
            answer:
              'The opening left after a wiring system passes through a fire-resisting element is created by the electrical work, and the requirement to seal it to the fire resistance of that element sits in BS 7671. Whoever physically applies the product, the inspection verifies that every penetration is sealed, with a tested product matched to the rating, applied per the manufacturer drawings, on both faces where the system requires it.',
          },
          {
            question: 'What if a cable is now buried in insulation that was added after the installation was designed?',
            answer:
              'Check the installed cross-sectional area against the actual installation method rather than the original assumption. A cable surrounded by insulation is derated heavily — a 2.5 mm² twin and earth rated 27 A in free air may be limited to around 13.5 A. Where the load is still comfortably within the derated capacity there is no overload risk, but it is recorded as an observation so the duty holder knows before they plan any increase in load.',
          },
        ]}
      />

      <SectionRule />

      <KeyTakeaways
        points={[
          'The criterion is four judgements — located correctly, secured correctly, mechanically sound, electrically sound. Each can pass while another fails.',
          'Reg 642.2 frames all of them: compliance with Section 511, correct selection and erection per BS 7671 and manufacturers instructions, and nothing visibly damaged so as to impair safety.',
          'Located correctly means selected for the external influences of the actual location — IP2X indoor dry, IP44 near a sink or under a soffit, IP65 outdoor exposed, IP65 plus impact rating in a workshop.',
          'Bonding clamps are located within 600 mm of the meter or the service entry, on bright clean metal, carrying the BS 951 label.',
          'Support figures: around 250 mm horizontal and 400 mm vertical for PVC/PVC twin and earth at 1.5 to 2.5 mm², and 1 to 1.5 m for steel tray with bracing at corners and tees.',
          'Electrically sound at a termination means durable electrical continuity and adequate mechanical strength — no copper past the terminal, no trapped insulation, sleeving present, torqued to the manufacturer figure.',
          'Surge protective devices are connected with a 6 mm² minimum conductor per Reg 534.4.10, kept short, with the status indicator read as part of the inspection.',
          'Where a fire-resisting element is penetrated, the opening is sealed with a tested product matched to its rating. Foam and plaster fill are defects.',
        ]}
      />

      <SectionRule />

      <ContentEyebrow>Check yourself</ContentEyebrow>

      <Quiz
        questions={quizQuestions}
        title="Confirming installed equipment is located, secured and sound — knowledge check"
      />
    </div>
  );
}
