/**
 * Unit 305E · Learning outcome 3 · Criterion 3.2 — The different types and methods
 * of terminating and connecting electrical cables and conductors
 *
 * Welsh Level 3 (Building Services Engineering — Electrotechnical Installation),
 * unit 305E Understand How to Install Wiring Systems. Learning outcome 3:
 * understand how to install and connect types of electrical cables, conductors
 * and wiring systems.
 *
 * Approach: three regulations frame the whole criterion — 526.1 for what a
 * connection must achieve, 526.5 for where it may live, 526.9 for how many
 * conductors may share a terminal. Everything else on the page is the method
 * that delivers them: strip, ferrule, crimp, torque, inspect. Strip lengths,
 * ferrule colours, crimper ranges and torque figures are all carried across
 * from the published Level 2 termination and cable-prep lessons.
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
    question: 'Reg 526.1 requires every connection to provide:',
    options: [
      'Durable electrical continuity, adequate mechanical strength and protection',
      'A minimum insulation resistance of 1 MΩ measured across the joint',
      'A disconnection time of no more than 0.4 seconds under fault conditions',
      'A green-and-yellow sleeve over every conductor entering the terminal',
    ],
    correctAnswer: 0,
    explanation:
      'Three requirements in one sentence — it must conduct properly and keep doing so, it must not pull apart, and it must be protected. Every other termination regulation is built on top of those three.',
  },
  {
    id: 2,
    question: 'Reg 526.5 requires every termination and joint in a live conductor to be made:',
    options: [
      'Within a suitable accessory, an equipment enclosure, or an enclosure of non-combustible material',
      'At least 150 mm away from any other cable to prevent interference',
      'Using copper conductors only, with aluminium prohibited indoors',
      'Only by a person holding a current qualification certificate',
    ],
    correctAnswer: 0,
    explanation:
      'The three permitted locations are a suitable accessory to its product standard, an equipment enclosure to its product standard, or an enclosure partially formed or completed with building material that is non-combustible when tested to BS 476-4. A joint floating in a loft on a connector strip is none of them.',
  },
  {
    id: 3,
    question: 'Reg 526.9, as updated by A4:2026, requires:',
    options: [
      'One terminal, one conductor, unless the terminal is specifically designed and rated for more',
      'Every terminal to accept at least three conductors to allow for future spurs',
      'All conductors at a single point to be soldered together before terminating',
      'Conductors of different cross-section to be combined in any screw terminal',
    ],
    correctAnswer: 0,
    explanation:
      'Busbar and DIN-rail terminals are generally designed for one conductor. Looped accessory terminals on sockets and switches are designed for two. For three or more conductors at one node you use a terminal designed for multiples, such as a lever-type connector block.',
  },
  {
    id: 4,
    question: 'A ferrule is mandatory when terminating:',
    options: [
      'Fine-stranded flex of class 5 or 6 into a cage-clamp or push-in terminal',
      'Solid twin and earth conductors into a 13 A socket terminal',
      'Any conductor above 25 mm² onto a busbar stud',
      'A bare CPC into the earth bar of a consumer unit',
    ],
    correctAnswer: 0,
    explanation:
      'Fine-stranded conductors splay under a cage-clamp and individual strands escape the grip, so the effective contact area shrinks and the joint runs hot. The ferrule gives the clamp a single solid cylinder to grip. Solid conductors are rigid enough already, and large conductors go to a compression lug instead.',
  },
  {
    id: 5,
    question: 'How should you select the bootlace ferrule for a conductor?',
    options: [
      'By the conductor size, checked against the chart for the ferrules you are using',
      'By the colour you remember for that size',
      'By whichever ferrule fits into the terminal',
      'By the crimper die you have fitted',
    ],
    correctAnswer: 0,
    explanation:
      'Ferrules are colour-coded by conductor size, but the coding follows the standard the maker works to and the sequence repeats at larger sizes. Selecting by remembered colour is how a ferrule ends up on the wrong conductor. Size it, then confirm against the chart on the box or the crimper.',
  },
  {
    id: 6,
    question:
      'You over-torque a terminal specified at 1.2 Nm. What is the most likely failure mode?',
    options: [
      'Crushed conductor strands, reduced effective cross-section, a high-resistance joint and eventual thermal damage',
      'The terminal screw thread strips and the conductor falls straight out',
      'The device trips the first time the circuit is energised',
      'Nothing — a tighter terminal always gives a lower-resistance connection',
    ],
    correctAnswer: 0,
    explanation:
      'Over-torque crushes the copper under the terminal. Crushed strands have a higher resistance than uncompressed copper, so the joint runs hot under load, the local heating accelerates oxidation, and the connection degrades from day one until a loop impedance test or a thermography survey finds it.',
  },
  {
    id: 7,
    question: 'A conductor is nicked during stripping and a few strands are cut away. You should:',
    options: [
      'Cut back to undamaged conductor and re-strip at the new length',
      'Tin the strands with solder to bridge the missing copper',
      'Terminate as-is, because a few strands make no practical difference',
      'Wrap extra insulation tape around the conductor to compensate',
    ],
    correctAnswer: 0,
    explanation:
      'A nick reduces the effective cross-section at that point, so the conductor is under-rated for its design current exactly where the joint is. A 2.5 mm² conductor missing three strands behaves like a 2.0 mm² conductor there, with around 25 per cent more resistance and 25 per cent more heating. Reg 526.1 requires durable continuity, so it comes back and gets re-stripped.',
  },
  {
    id: 8,
    question: 'Compression lugs crimped with a hex die are the standard termination for:',
    options: [
      'Conductors of 25 mm² and above landing on studs and bolted joints',
      'Lighting circuits below 1.5 mm² where screw terminals would crush the conductor',
      'Any flexible cord on a portable appliance, in place of a moulded plug',
      'Ring final sockets, where the loop terminals cannot grip two conductors',
    ],
    correctAnswer: 0,
    explanation:
      'Above 25 mm² screw terminals become impractical and the standard is a compression lug on a busbar stud, transformer terminal or bolted switchgear joint. The hex die compresses the barrel onto the conductor into a single solid mass, with heat-shrink over the barrel and the bolt torqued to the equipment specification.',
  },
];

export default function Lesson305e_3_2() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'Three regulations frame the criterion: 526.1 says what a connection must achieve, 526.5 says where it may be made, and 526.9 says how many conductors may share a terminal.',
          'Preparation decides the joint. Strip to the terminal’s length without nicking the copper, ferrule fine-stranded conductors entering cage-clamp terminals, and never solder a mains termination.',
          'Torque fails in both directions — too loose and the grip is poor, too tight and the strands are crushed. Either way the joint runs hot and the failure looks the same years later.',
          'Above 25 mm² the method changes: compression lugs on a hex die, heat-shrink over the barrel, bolted to the equipment at its own torque figure.',
          'The termination is not finished at the click. A tug test and a five-point visual check take thirty seconds and catch nearly everything.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'State the three things Reg 526.1 requires of every connection, and explain how each is delivered in practice.',
          'Identify the three locations Reg 526.5 permits for a termination in a live conductor, and recognise arrangements that fail it.',
          'Apply Reg 526.9 as updated by A4:2026 — one terminal, one conductor unless the terminal is designed and rated for more.',
          'Prepare a conductor correctly for the terminal it is entering, including strip length, nick-free stripping, and when a bootlace ferrule is mandatory.',
          'Torque every termination to the manufacturer’s figure with a calibrated driver, then inspect the finished joint against a repeatable set of visual checks.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>What a connection must achieve</ContentEyebrow>

      <ConceptBlock
        title="What a connection has to achieve"
        plainEnglish="Reg 526.1 sets three requirements for every termination, and each of them maps onto something you physically do at the terminal."
        onSite="Most inspection failures in a domestic installation are not undersized cable or faulty runs — they are bad terminations. Loose screws, fanned strands, crushed conductors and joints in places they should never have been made."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Durable electrical continuity.</strong> The joint conducts properly under load
            and under fault for the life of the installation — delivered by a clean strip, the right
            strip length, the right terminal for the conductor and the right torque. A nicked
            conductor or a loose screw fails this one.
          </li>
          <li>
            <strong>Adequate mechanical strength.</strong> The joint does not pull apart — delivered
            by the terminal grip and by supporting the cable back from the termination so its own
            weight never reaches the connection. A cable hanging on its terminals fails this one.
          </li>
          <li>
            <strong>Adequate protection.</strong> The joint is enclosed and no live conductor is
            exposed — delivered by making the termination inside an accessory, an equipment
            enclosure or a non-combustible enclosure. A joint taped up in a loft fails this one.
          </li>
        </ul>
        <p>
          The regulation then lists what the selection of the means of connection has to take
          account of — the conductor material and its insulation, the conductor class and the number
          and shape of the wires in it, the cross-sectional area, how many conductors are being
          joined, the temperature the terminal reaches in normal service, and whether locking
          arrangements are needed where there is vibration. Read as a list of design decisions, that
          is most of this criterion in six lines.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 526.1 (Electrical connections)"
        clause="Every connection between conductors or between a conductor and other equipment shall provide durable electrical continuity and adequate mechanical strength and protection. The selection of the means of connection shall take account of, as appropriate: (a) the material of the conductor and its insulation; (b) the conductor class, the number and shape of the wires forming the conductor; (c) the cross-sectional area of the conductor; (d) the number of conductors to be connected together; (e) the temperature attained at the terminals in normal service; (f) the provision of adequate locking arrangements in situations subject to vibration."
        meaning="Item (b) is the ferrule rule in disguise — conductor class and the shape of the wires decide whether a cage-clamp can grip the conductor directly, which is why fine-stranded class 5 and 6 flex needs a ferrule and solid conductors do not. Item (d) points at Reg 526.9 and the number of conductors a terminal is rated for. Item (e) is why torque matters: an over-torqued or under-torqued terminal runs hotter in normal service than the design allowed for. Item (f) is why motor terminations and vehicle work use locking arrangements that a consumer unit does not need."
        cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 52, Regulation 526.1."
      />

      <SectionRule />

      <ContentEyebrow>Accessibility and terminal loading</ContentEyebrow>

      <ConceptBlock
        title="Where a termination is allowed to live"
        plainEnglish="Reg 526.5 gives three permitted locations for a termination or joint in a live conductor. Anything outside those three is non-compliant, however neatly it is done."
        onSite="The twist-and-tape joint and the connector strip loose in a loft have been failures for two decades. The modern equivalent is a maintenance-free lever connector inside a proper junction box."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>A suitable accessory</strong> complying with the appropriate product standard —
            a socket back-box, a fused connection unit, a switch enclosure.
          </li>
          <li>
            <strong>An equipment enclosure</strong> complying with the appropriate product standard
            — a consumer unit, an isolator, a switch fuse, a motor terminal box.
          </li>
          <li>
            <strong>A non-combustible enclosure</strong> partially formed or completed with building
            material that is non-combustible when tested to BS 476-4.
          </li>
        </ul>
        <p>
          The practical read is that the joint has to be findable, enclosed and rated. A metal
          junction box with lever connectors inside satisfies it; a connector strip pushed under the
          loft insulation does not, and neither does a joint inside a void that will be plastered
          over and never seen again. Where a joint has to be genuinely inaccessible it must be a
          maintenance-free type designed for the purpose, inside an enclosure that meets the
          regulation.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 526.5"
        clause="526.5 Every termination and joint in a live conductor or a PEN conductor shall be made within one of the following or a combination thereof: (a) asuitable accessory complying with the appropriate product standard; (b) an equipment enclosure complying with the appropriate product standard; (c) an enclosure partially formed or completed with building material which is non-combustible when tested to BS 476-4."
        meaning="The list is closed &mdash; there is no fourth option and no allowance for a joint that is simply out of the way. Note the third route: the building fabric itself can form part of the enclosure, but only where that material is non-combustible to the named test, so a joint sitting in a timber stud bay or on top of loft insulation does not qualify. Ask yourself which of the three a joint sits in before you make it; if you cannot name one, you need a junction box."
        cite="BS 7671 Part 5, Chapter 52, Section 526 — Regulation 526.5"
      />

      <InlineCheck
        id="305e-3-2-check-1"
        question="Which of these arrangements satisfies Reg 526.5?"
        options={[
          'A twisted and taped joint tucked above the ceiling insulation',
          'A connector strip left loose in the ceiling void with no enclosure',
          'A joint made inside a stud bay that will be boarded and plastered over',
          'Lever connectors inside a metal junction box fixed to a joist',
        ]}
        correctIndex={3}
        explanation="Lever connectors inside a proper metal junction box are a termination made inside a suitable enclosure, which is exactly what the regulation asks for. The other three are all terminations in live conductors made outside an accessory, an equipment enclosure or a non-combustible enclosure — and the one that gets plastered over adds the problem that nobody will ever find it."
      />

      <SectionRule />

      <ConceptBlock
        title="One terminal, one conductor — and the exceptions that are designed in"
        plainEnglish="Reg 526.9 was clarified in A4:2026 to make explicit what was previously implied. If a terminal is intended for one conductor, one conductor is what goes in it."
        onSite="The failure mode is specific. Two conductors of different cross-section in one screw terminal means the screw clamps the larger one and may barely touch the smaller. Three in a two-rated terminal means uneven clamping force, and one of them works loose."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Designed for one.</strong> Ordinary screw terminals on consumer unit busbars and
            DIN-rail terminals. One conductor, and no argument.
          </li>
          <li>
            <strong>Designed for two.</strong> Looped accessory terminals on sockets and switches,
            taking two twin-and-earth conductors side by side. That is what makes a ring final work:
            both lines share the line terminal, both neutrals the neutral, both CPCs the earth.
          </li>
          <li>
            <strong>Designed for more.</strong> Lever-type connector blocks, dedicated bus terminals
            and heavy stud-and-nut terminations taking multiple lugs — what you use where three or
            more conductors meet at one node.
          </li>
        </ul>
        <p>
          For a loop-in loop-out termination, strip both conductors to the same length, gather them
          into a single tight bundle, insert, and torque so the screw clamps both as one joint.
          Check the accessory data sheet — the terminal being designed for two is the reason it
          complies, not an assumption you are entitled to make — and never force a third conductor
          into a two-rated terminal.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Preparing the conductor</ContentEyebrow>

      <ConceptBlock
        title="Conductor preparation — strip length, clean copper, the right stripper"
        plainEnglish="Every terminal has an intended strip length. Too short and the screw bites on insulation; too long and bare conductor projects past the terminal. Both are visible, and both are avoidable."
        onSite="Most accessories have a strip-length gauge moulded into the back face. Line the cable up, mark the insulation, strip to the mark. Stripping to roughly the right length is where the trouble starts."
      >
        <p>
          Typical strip lengths, with the manufacturer data sheet as the authority in every case:
          around 8 to 12 mm for screw terminals on accessories, around 6 to 10 mm for cage-clamp
          terminals on RCBOs and MCBs, and around 8 to 15 mm for crimp ferrules on flex, where the
          ferrule packet usually states the length it is designed for.
        </p>
        <p>The tools that make the difference, and what each is actually for:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Auto-adjusting strippers.</strong> Self-adjusting jaws sense the conductor
            diameter, typically covering 0.5 to 6 mm² and sometimes 10 mm². The default for varied
            work, and many will crop to length in the same squeeze.
          </li>
          <li>
            <strong>Preset-jaw strippers.</strong> Fixed stations at 0.5, 0.75, 1.0, 1.5, 2.5 and
            4.0 mm², giving a marginally cleaner cut on each size, which is why they are preferred
            on repeat-volume work such as a panel build.
          </li>
          <li>
            <strong>Rotary cable strippers, and knives.</strong> Rotary strippers take the outer
            sheath off round multi-core cable including SWA — set the diameter, push on, twist, and
            the sheath comes away without scoring the cores. A knife is for the outer sheath of twin
            and earth only, cut along the seam, never on the inner cores.
          </li>
        </ul>
        <p>
          Then inspect every strip — bright copper, no nick, no missing strands. A 2.5 mm² conductor
          with three strands cut away behaves like a 2.0 mm² conductor there, with around 25 per
          cent more resistance and heating. It passes the insulation resistance test and the loop
          test, and degrades from the day it was made. The fix is always the same: cut back to clean
          copper and re-strip.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ConceptBlock
        title="Ferrules — when they are mandatory and how the colour code works"
        plainEnglish="A bootlace ferrule turns a fan of fine strands into a single cylinder the terminal can clamp evenly. On fine-stranded flex entering a cage-clamp it is not optional."
        onSite="The colour code is a quality-control mechanism as much as a sizing one. A supervisor can run an eye down a row of two hundred terminations and spot a wrong colour instantly; without it they would have to check each one."
      >
        <p>
          Mandatory on fine-stranded class 5 or class 6 conductors — flex grades and panel wire —
          entering a cage-clamp or push-in terminal. Good practice on coarse-stranded class 2
          conductors, typical of SWA cores and much control cable, where a screw terminal grips
          adequately but the ferrule removes the variable. Never on solid conductors, which are
          mechanically rigid already.
        </p>
        <p>
          Ferrules are colour-coded by conductor size, and that is genuinely useful on a busy
          board — but treat the colour as a label, not as the selection method. The coding follows
          whichever standard the manufacturer works to, those standards do not all agree, and the
          sequence repeats at larger sizes, so the same colour appears more than once. Size the
          ferrule to the conductor and confirm it against the chart on the box or the crimper. A
          ferrule that is too large will not grip, and one that is too small will not go on
          whatever the colour says.
        </p>
        <p>
          The crimper is chosen by size, because the force scales steeply — a 0.75 mm² ferrule needs
          around 200 N of compression and a 50 mm² compression lug over 5 kN, so no single tool
          spans the range. Ratchet H-die crimpers take bootlace ferrules and small insulated lugs,
          typically 0.25 to 6 mm² and sometimes to 10 mm², with the ratchet locking the jaws until
          full compression so the crimp does not depend on grip strength. Hex-die ratchet crimpers
          take bare compression lugs, typically 10 to 25 mm² and sometimes to 35 mm². Hydraulic
          crimpers cover typically 25 to 240 mm².
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 526.9.1"
        clause="526.9.1 In order to avoid inappropriate separation or spreading of individual wires of multiwire, fine wire or very fine wire conductors, suitable terminals shall be used or the conductor ends shall be suitably treated."
        meaning="This is where the ferrule comes from. A fan of fine strands can spread as the terminal closes, so some of the copper ends up outside the clamp and one stray wire ends up outside the terminal altogether. The regulation gives you two ways out: a terminal designed to take that conductor as it is, or treating the end so it behaves like one solid cylinder &mdash; which in practice means a correctly sized, properly crimped ferrule."
        cite="BS 7671 Part 5, Chapter 52, Section 526 — Regulation 526.9.1"
      />

      <InlineCheck
        id="305e-3-2-check-2"
        question="Why is a ratchet crimper the right tool for a bootlace ferrule rather than a generic plier crimper?"
        options={[
          'A plier crimper is preferred because it lets an experienced electrician judge compression by feel',
          'The ratchet applies a controlled, repeatable force and will not release until full compression is reached, where a plier crimper depends on hand strength and can under-crimp',
          'There is no real difference — both squeeze the ferrule, so it comes down to whichever is in the pouch',
          'The ratchet leaves the ferrule loose enough to slide off and be re-used, which saves on consumables',
        ]}
        correctIndex={1}
        explanation="The ratchet mechanism locks the jaws shut until the stroke is complete, so every crimp is fully formed regardless of who made it or how tired they were. That repeatability is exactly what Reg 526.1 is asking for when it requires durable continuity and adequate mechanical strength — a crimp that varies with operator strength does not reliably deliver either."
      />

      <SectionRule />

      <ContentEyebrow>Torque and tightening</ContentEyebrow>

      <ConceptBlock
        title="Torque — the discipline that fails in both directions"
        plainEnglish="Under-torque leaves the grip loose and the joint runs hot. Over-torque crushes the conductor, reduces its effective cross-section, and the joint runs hot. Two opposite errors, one failure mode."
        onSite="Tightening by feel was normal for two generations. It is now a quality and documentation failure, and a torque screwdriver is standard kit rather than a luxury item."
      >
        <p>
          Published figures vary between manufacturers and between devices, so the data sheet is the
          authority every time — it may be a leaflet in the box, a value on the manufacturer&rsquo;s
          website, or a figure moulded into the case beside the terminal. As a sense of the ranges
          you will meet:
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Accessories.</strong> Light switch terminals to BS EN 60669 at around 0.5 to 0.7
            Nm, 13 A socket terminals to BS 1363 at around 0.6 to 0.8 Nm.
          </li>
          <li>
            <strong>Domestic RCBO and MCB circuit terminals.</strong> Commonly quoted between around
            1.0 and 1.5 Nm, though some manufacturers publish 2.0 to 2.5 Nm for the same class of
            device — which is precisely why you read the sheet rather than working from memory.
          </li>
          <li>
            <strong>Board and distribution terminals.</strong> Consumer unit incomer and main switch
            around 3.0 to 4.5 Nm, sub-main and three-phase MCCB around 8 to 12 Nm, M5 and M6 studs
            around 3 to 5 Nm and 6 to 9 Nm respectively.
          </li>
        </ul>
        <p>
          A 1.0 to 5.0 Nm click-style torque screwdriver covers most domestic and light commercial
          work, with a 5 to 25 Nm wrench added for incomers, sub-mains and stud terminations. The
          click is the stop signal, not a checkpoint to push through — carrying on turning after it
          defeats the entire point of the tool. Get the drivers calibrated on a published interval,
          keep the certificate with the tool, and store a click driver dialled down to its lowest
          setting so the internal spring is not loaded overnight. Record the torque value on the
          test documentation where the job requires it.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Large conductors, and checking the work</ContentEyebrow>

      <ConceptBlock
        title="Large conductors and armoured cable"
        plainEnglish="Above 25 mm² the screw terminal runs out of road and the method changes to compression. Armoured cable adds a second job on top of the cores — making the armour into a proper CPC."
        onSite="A compression lug done properly is a single solid mass of copper. Done with the wrong die or a half stroke, it is a joint that reads fine on the day and cooks itself over the following two years."
      >
        <p>
          The compression lug sequence: strip the conductor to the barrel length printed on the lug;
          slide the barrel fully over the copper with no gap at the rear; set the lug in the
          correctly sized hex die; crimp, with two crimps per lug on the larger sizes, one near the
          rear and one near the front; inspect for a clean hexagonal form, no projecting strands and
          no cracking; heat-shrink over the barrel to restore insulation continuity; and bolt to the
          terminal at the equipment&rsquo;s own torque figure — an M10 stud is commonly around 14 to
          20 Nm.
        </p>
        <p>
          Manual long-arm crimpers cannot reliably generate the force needed above around 50 mm²,
          and at 95 mm² and up a hydraulic crimper is essential. Hire one rather than improvise.
        </p>
        <p>
          Terminating SWA is a sequence in its own right and the order matters. Fit the gland with
          its banjo washer where required, clamp the combed-out armour inside the gland cone so the
          armour has earth continuity to the enclosure, strip the outer sheath inside the gland,
          prepare each core — bare for solid, ferruled for fine-stranded — then terminate and torque
          to specification. Miss the armour clamp and the armour is floating metal that can sit at a
          dangerous potential during a fault, instead of the CPC the design assumed.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ConceptBlock
        title="Inspecting the finished termination"
        plainEnglish="The click of the driver is not the end of the job. Five checks, thirty seconds, every termination — and they catch nearly everything before the circuit is energised."
        onSite="Make it a habit on every cage-clamp and every screw terminal. Half a minute per termination beats an hour of fault-finding three months later, and it beats a callback entirely."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Conductor fully home, insulation right up to it.</strong> The strip length
            matches the terminal depth, no insulation is pinched in the jaws, no bare copper
            projects past the entry, and there is no gap of exposed conductor before the insulation
            starts — a gap is both a shock risk and an identification problem.
          </li>
          <li>
            <strong>Tug test.</strong> A gentle pull in the direction the conductor leaves the
            terminal, with zero movement expected. Movement means the strip was wrong or the torque
            was wrong — re-strip and re-torque.
          </li>
          <li>
            <strong>Conductor not crushed.</strong> If the copper looks flattened, or strands are
            escaping past the underside of the terminal, the torque was too high. Cut back, re-strip
            and re-torque at the specified figure.
          </li>
          <li>
            <strong>Identification correct.</strong> CPC sleeved green and yellow along its full
            length inside the enclosure under Reg 514.4.2, a neutral used as a switch line sleeved
            brown, and phase identification where three-phase work requires it. The next person has
            to be able to read the installation, and that is part of what durable means.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="305e-3-2-check-3"
        question="A conductor moves slightly when you tug-test it after torquing to the manufacturer’s figure. What does that tell you?"
        options={[
          'Nothing — a small amount of movement is normal in a cage-clamp terminal',
          'The device is faulty and the terminal needs replacing',
          'The strip length was wrong, so insulation is in the terminal, or the torque was not actually applied — re-strip and re-torque',
          'The conductor is too large for the terminal and a smaller cross-section should be used',
        ]}
        correctIndex={2}
        explanation="A correctly stripped and correctly torqued conductor does not move at all. Movement almost always means the strip was short and the terminal has closed onto insulation rather than copper, or the driver never reached its set value. The remedy is to take it apart, re-strip to the specified length and re-torque — not to reduce the conductor size, which would break the sizing calculation."
      />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Tightening an RCBO terminal by feel instead of to the published figure"
        whatHappens={
          <>
            You snug the screw down hard to make sure it is tight. The copper under the terminal
            crushes flat and the effective cross-section drops. Joint resistance rises, so under
            load the local heating rises with it. Six months later the terminal is visibly browned,
            and a thermography survey picks up a hot spot at the device. The next periodic
            inspection records it as an observation, and the customer is paying for work that was
            done wrong once and is now being done twice.
          </>
        }
        doInstead={
          <>
            Use a calibrated torque screwdriver set to the manufacturer&rsquo;s figure, on every
            termination, every time. A 1.0 to 5.0 Nm click-style driver covers domestic and light
            commercial work and clicks audibly when the set value is reached, so it prevents
            over-tightening even if you keep pushing. Read the value off the data sheet or the
            device rather than working from memory, and record it on the test documentation where
            the job requires it.
          </>
        }
      />

      <CommonMistake
        title="Making the joint where the cable happens to be short"
        whatHappens={
          <>
            An existing circuit is a metre short of where the new accessory has to go. The quickest
            answer is a joint at the point the cable ran out — a connector strip, or a lever
            connector with tape round it, pushed back into the stud bay or laid on top of the
            ceiling insulation. It is a good joint electrically: clean strip, conductors fully home,
            nothing loose. The plasterer boards over it the following week. The problem is not the
            connection, it is the location. A termination in a live conductor has to be inside a
            suitable accessory, an equipment enclosure or a non-combustible enclosure, and a joint
            lying in a void is in none of those. It is also now unfindable, so when that circuit
            develops an intermittent fault the person chasing it has no reason to suspect a joint
            exists, and will look everywhere else first.
          </>
        }
        doInstead={
          <>
            Decide where the joint is allowed to live before you decide to make one. If it has to be
            made, put it in a proper junction box fixed to a joist or a stud, keep it accessible, and
            note it on the record so the next person knows it is there. Where the position genuinely
            cannot be left accessible, it has to be a maintenance-free connection designed for the
            purpose inside an enclosure that satisfies the regulation — not an ordinary connector
            strip that happens to be out of the way. And check whether the joint is needed at all:
            pulling a new length back to the accessory is often quicker than the argument about the
            one you left in the ceiling.
          </>
        }
      />

      <Scenario
        title="Llandudno kitchen rewire — terminating 6 mm² twin and earth into a 32 A RCBO"
        situation={
          <>
            You are second-fixing a kitchen rewire in Llandudno. The cooker circuit is 6 mm&sup2;
            twin and earth running about 12 m from the consumer unit to the cooker isolator. The
            board is a 14-way domestic unit and the device is a 32 A Type B RCBO whose data sheet
            specifies 1.2 Nm on the conductor terminals. The board is fixed, the main switch is
            locked off, and the cable is in with around 250 mm of tail at the device end.
          </>
        }
        whatToDo={
          <>
            Confirm safe isolation first — locked off, voltage indicator proved against a known
            supply, tested at the terminal you are about to work on. Strip the outer sheath back
            around 150 mm inside the enclosure and sleeve the CPC green and yellow along its full
            length under Reg 514.4.2. Cut the conductors so they reach the device without strain,
            leaving slack in the gutter for future rework. Strip each core to the length the data
            sheet specifies, stripper set to the 6 mm&sup2; gauge, and inspect each for nicks and
            missing strands. Land line and neutral in the circuit terminals and the CPC on a free
            way of the earth bar. Torque each terminal to 1.2 Nm with a calibrated driver and stop
            at the click. Tug-test each conductor, run the five visual checks, seat the device on
            the busbar, and record the torque value, conductor size, device and termination type on
            the test documentation.
          </>
        }
        whyItMatters={
          <>
            A bad termination at the board is the single most common cause of failed periodic
            inspections in domestic installations, and none of the individual steps above is
            difficult. The reason it goes wrong is that each one is skippable on its own — the
            sleeve, the strip gauge, the torque value, the tug test — and the joint still looks
            perfect on the day. Reg 526.1 asks for durable continuity. Two minutes of procedure per
            termination is what durable actually looks like.
          </>
        }
      />

      <SectionRule />

      <FAQ
        items={[
          {
            question: 'What torque do I use if I cannot find the data sheet?',
            answer:
              'Keep looking first — the value is usually on a leaflet in the box, on the manufacturer’s website, or moulded into the device case beside the terminal. Published figures genuinely differ between makes, and domestic RCBO terminals are quoted anywhere from around 1.0 Nm to around 2.5 Nm depending on the device, so working from memory is a guess. If you truly cannot find it, use the generic guidance in the On-Site Guide and the manufacturer torque tables as a fallback, and record on the test documentation what value you used and why.',
          },
          {
            question: 'Do I always need a ferrule on a stranded conductor?',
            answer:
              'On fine-stranded class 5 or 6 conductors entering a cage-clamp or push-in terminal, yes — without one the strands splay, the clamp catches only some of them, and the effective contact area is a fraction of what the design assumed. On coarse-stranded class 2 conductors, such as SWA cores and much control cable, a screw terminal grips adequately and the ferrule is good practice rather than essential. On solid conductors it is never needed. Many contractors ferrule all stranded terminations as standard simply to remove the judgement.',
          },
          {
            question: 'Can I solder a termination?',
            answer:
              'For mains-voltage work, no in practice. Solder has largely been replaced by crimp lugs and screw terminals because it creeps under sustained load and the joint loosens over time. Tinning the strands of a flex before pushing it into a cage-clamp is now considered worse than doing nothing, and a ferrule is the correct answer instead. Some specialised terminations still call for solder where the manufacturer specifies it, but that is an instruction to follow rather than a choice to make.',
          },
          {
            question: 'How do I get two cables into one socket terminal on a ring final?',
            answer:
              'The looped terminal on a socket or switch is designed to take two twin-and-earth conductors side by side, which is what makes a ring final possible under Reg 526.9. Strip both to the same specified length, gather them so they sit as a single tight bundle, insert fully, and torque to the manufacturer’s figure so the screw clamps both as one joint. Check the accessory data sheet to confirm the terminal is rated for two — that rating is why the arrangement complies, and it is not a licence to add a third.',
          },
        ]}
      />

      <KeyTakeaways
        points={[
          'Reg 526.1 requires durable electrical continuity, adequate mechanical strength and adequate protection from every connection, with a six-point list of what the selection must take account of.',
          'Reg 526.5 permits a termination only inside a suitable accessory, an equipment enclosure, or an enclosure of material non-combustible to BS 476-4.',
          'Reg 526.9 as updated by A4:2026 means one terminal, one conductor unless the terminal is designed and rated for more — looped accessory terminals take two, lever blocks take three or more.',
          'Strip to the terminal’s specified length, typically 8 to 12 mm on accessory screw terminals and 6 to 10 mm on cage-clamps, and cut back and re-strip any nicked conductor.',
          'Ferrules are mandatory on fine-stranded class 5 and 6 conductors entering cage-clamp or push-in terminals, good practice on coarse-stranded, and never used on solid.',
          'Ferrules are colour-coded by conductor size, but coding differs between standards and repeats at larger sizes — size to the conductor and confirm against the chart, never by remembered colour.',
          'Torque to the manufacturer’s published figure with a calibrated driver — both under-torque and over-torque produce a hot, high-resistance joint.',
          'Above 25 mm² use compression lugs on the correct hex die with heat-shrink over the barrel, and on SWA clamp the armour in the gland before you touch the cores.',
        ]}
      />

      <ContentEyebrow>Check yourself</ContentEyebrow>
      <Quiz questions={quizQuestions} title="Terminating and connecting cables and conductors" />
    </div>
  );
}
