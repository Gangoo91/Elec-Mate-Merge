/**
 * Unit 305E · Learning outcome 3 · Criterion 3.1 — The methods and techniques for
 * installing and fixing electrical cables, conductors, wiring systems, associated
 * equipment, accessories and components
 *
 * Welsh Level 3 (Building Services Engineering — Electrotechnical Installation),
 * unit 305E Understand How to Install Wiring Systems. Learning outcome 3:
 * understand how to install and connect types of electrical cables, conductors
 * and wiring systems.
 *
 * Approach: the criterion is broad, so the page is organised as the job is —
 * containment first, accessories fixed, cable supported, cable pulled, cable
 * dressed, penetrations sealed, install proved. The A4:2026 change to cable
 * support in fire is treated as the headline because it changes van stock on
 * every job. Intervals, radii, factors and tolerances are all carried across
 * from the published Level 2 installation lessons.
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
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';

const quizQuestions = [
  {
    id: 1,
    question:
      'For 2.5 mm² twin and earth clipped direct on a horizontal run, the typical maximum interval between clips from OSG Table 4.5 is around:',
    options: ['250 mm', '100 mm', '600 mm', '1000 mm'],
    correctAnswer: 0,
    explanation:
      'Around 250 mm horizontal for small-CSA twin and earth, extending to around 400 mm vertical because the clip carries less perpendicular load. Beyond those intervals the cable sags and the sag puts strain on the terminations, which is a Reg 522.8.5 problem.',
  },
  {
    id: 2,
    question: 'Reg 521.10.202, as amended by A4:2026, requires non-combustible cable supports:',
    options: [
      'Throughout the installation, not only on escape routes',
      'Only on cables installed in escape routes such as corridors and staircases',
      'Only on cables installed outdoors or in unheated plant rooms',
      'Only on circuits supplying fire-alarm and emergency-lighting systems',
    ],
    correctAnswer: 0,
    explanation:
      'The requirement previously applied to escape routes only. A4:2026 extended it across the whole installation, because a cable dropping into any space during a fire is a hazard for people escaping and for the crews coming in. In practice that means metal clips and metal ties, not plastic.',
  },
  {
    id: 3,
    question: 'Minimum bend radius for unarmoured cable such as twin and earth is typically:',
    options: [
      '6 times the cable overall diameter',
      '3 times the cable overall diameter',
      '8 times the cable overall diameter',
      '12 times the cable overall diameter',
    ],
    correctAnswer: 0,
    explanation:
      'IET guidance gives 6 times the overall diameter for unarmoured cable, 8 times for SWA and 12 times for MICC. Tighter than the minimum strains the conductor and damages the insulation, which is a Reg 522.8.3 failure that usually shows up months later as a reduced insulation resistance.',
  },
  {
    id: 4,
    question: 'A back-box in a chased masonry wall should be set:',
    options: [
      '1 to 3 mm recessed below the finished plaster line',
      'Flush with the brick face, before any plaster is applied',
      '3 to 5 mm proud of the finished plaster line',
      'At whatever depth the existing chase happens to allow',
    ],
    correctAnswer: 0,
    explanation:
      'Recessed by 1 to 3 mm, so the plasterer skims up to the rim and the faceplate sits flat on the plaster rather than on the edge of the box. A proud box makes the plate tilt, forces the screws to pull it down, and compresses the conductors behind it.',
  },
  {
    id: 5,
    question: 'A 32 m horizontal run of 25 mm steel conduit needs an expansion coupler because:',
    options: [
      'Steel expands around 12 µm per metre per °C, so a 30 °C swing over 32 m gives roughly 12 mm of movement to accommodate',
      'Steel contracts as it warms, so the coupler stops the threaded joints pulling apart',
      'The coupler is there purely to maintain earth continuity along a long run',
      'Long runs have to be electrically isolated into sections, which the coupler provides',
    ],
    correctAnswer: 0,
    explanation:
      'Thermal expansion of steel is roughly 12 µm per metre per °C. Without a coupler somewhere in that length the movement loads up the saddles and the threaded joints until the run pulls itself apart. Standard practice is an expansion coupler around every 30 m, and sooner in unheated spaces.',
  },
  {
    id: 6,
    question: 'The right way to attach a pulling rope to a cable is:',
    options: [
      'A pulling grip that grips the outer sheath, or a factory-fitted pulling eye on large cable',
      'Strip the sheath back and tie the rope directly around the bare conductors',
      'Crimp a ring lug onto the stripped conductor and clip the rope to the lug',
      'Wrap several turns of insulation tape round the cable end and tie the rope to the tape',
    ],
    correctAnswer: 0,
    explanation:
      'A pulling grip tightens around the sheath as the rope pulls, spreading the force along roughly 150 to 300 mm of cable so the conductor is never loaded. Pulling eyes on large SWA and HV cable do the same job through the cable’s mechanical termination. Pulling on the conductor damages it at the attachment point.',
  },
  {
    id: 7,
    question: 'Maximum fill for cable installation in conduit is conventionally taken as:',
    options: [
      'Around 40 to 45 per cent, so cables can slide past each other and shed heat',
      'Around 90 per cent, filling the bore almost solidly to use the space',
      'Around 10 per cent, because only one or two cables should share a conduit',
      'There is no limit, provided the cables physically fit inside the bore',
    ],
    correctAnswer: 0,
    explanation:
      'The IET On-Site Guide Appendix C and Table H1 give cable factors and conduit factors for the calculation; BS 7671 does not tabulate them, Reg 522.8.1 sets the principle. Around 40 to 45 per cent is the conventional maximum, and a tighter fill jams the pull and derates every cable in the run through grouping.',
  },
  {
    id: 8,
    question: 'Heavy-duty cable cleats are fitted to SWA on tray because:',
    options: [
      'They restrain the cable against the mechanical force generated by short-circuit fault current',
      'They bond the armour to the metal tray for earth continuity',
      'They space the cable off the tray to improve its current-carrying capacity',
      'They protect the sheath from abrasion against the edges of perforated tray',
    ],
    correctAnswer: 0,
    explanation:
      'A heavy cable carrying a short-circuit current is thrown sideways by the magnetic force on the conductor. Cleats rated to that force restrain it. For sub-mains and any cable subject to fault currents above around 10 kA they are a requirement rather than good practice — cable ties snap on the first fault.',
  },
];

export default function Lesson305e_3_1() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'Installation has a fixed order: containment and boxes first, cable last. Pulling into partially installed containment is how cable gets damaged before it is ever energised.',
          'OSG Table 4.5 sets the support intervals — around 250 mm horizontal and 400 mm vertical for small twin and earth, with an extra fix within about 150 mm of every box, termination and change of direction.',
          'A4:2026 extended Reg 521.10.202 across the whole installation: cable supports must resist premature collapse in fire, so metal clips and metal ties replace plastic everywhere, not just on escape routes.',
          'Bend radius is 6 times the overall diameter for unarmoured cable, 8 for SWA and 12 for MICC — during the pull as well as in the finished run.',
          'A pull is planned before it starts: fill checked against the OSG factors, draw rope in, lubricant ready, grip sized, and draw boxes where the route needs them.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Sequence an installation correctly — survey the route, install the containment, fix the accessories, support the cable, pull it, dress it, seal the penetrations and prove it.',
          'Select the appropriate containment family for the scale, environment and mechanical risk, and install it to the correct saddle, bracket and lid-clip intervals.',
          'Fix back-boxes and accessories to the right depth, level and substrate, and explain why the box is set recessed below the finished plaster line.',
          'Apply OSG Table 4.5 cable support intervals and the Reg 521.10.202 non-combustible support requirement introduced across the whole installation by A4:2026.',
          'Plan and execute a cable pull within the fill limit, the pulling-tension limit and the minimum bend radius, and dress the installed cable so the next person can work on it.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>Sequencing the first fix</ContentEyebrow>

      <ConceptBlock
        title="The order of work is set by the building, not by the electrician"
        plainEnglish="Survey, containment, boxes, support, pull, dress, seal, prove. Each step depends on the one before it, and doing them out of order costs more than it saves."
        onSite="Walk the route end to end before anything goes up. Note every bend, every junction, every change of containment, every place the cable could catch. Five minutes of survey saves five hours of jammed pull."
      >
        <p>Four things a route survey is actually checking, on a real first fix:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Structure.</strong> Where the noggins are in the stud wall, which way the joists
            run against your route, and which walls are fire-rated compartment walls needing sealing
            at every penetration.
          </li>
          <li>
            <strong>Containment condition.</strong> Complete, ends finished and deburred, no
            internal sharp edges, all boxes in place with removable lids.
          </li>
          <li>
            <strong>Geometry and fill.</strong> Every change of direction respecting the minimum
            bend radius, cable count calculated rather than eyeballed, and no stretch of pull long
            enough or twisted enough to need a draw box you have not allowed for.
          </li>
          <li>
            <strong>Access.</strong> Where the drum sits, where the puller stands, and whether the
            two can see or hear each other.
          </li>
        </ul>
        <p>
          Cable goes in last. Never pull into containment that is only partly installed — you cannot
          see what the cable is catching on, and you will not know until the insulation resistance
          test says so.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Containment and fixing accessories</ContentEyebrow>

      <ConceptBlock
        title="Picking the containment family"
        plainEnglish="Conduit, trunking, and the basket/tray/ladder group — each suiting a different scale, environment and level of mechanical protection. Decide the family before you order parts, because the fittings do not cross over."
        onSite="A real job usually runs three or four families at once — ladder for the sub-main, basket across the ceiling void, conduit for the drops, mini-trunking for surface accessories. Every transition is a box or a transition fitting."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Conduit.</strong> PVC commonly at 16, 20, 25 and 32 mm outside diameter — light,
            quick, solvent-welded, for domestic and light commercial. Steel in Class A galvanised
            for heavy duty, Class B for light duty and black enamelled mostly on heritage work, with
            threaded joints, banding bushes and lock-rings, for industrial and agricultural work and
            anywhere the cable needs real protection.
          </li>
          <li>
            <strong>Trunking.</strong> PVC at 25 × 16 mm mini for domestic surface drops, 50 × 50 mm
            dado and 100 × 50 mm commercial. Metal in steel or aluminium from 75 × 75 mm up to 300 ×
            100 mm for commercial sub-mains and plant-room risers, with compartmented options for
            separating mains, data and fire-alarm cables.
          </li>
          <li>
            <strong>Cable basket, tray and ladder.</strong> Welded steel mesh, sheet steel tray, or
            a heavy-duty ladder structure for very heavy loads on industrial and plant-room main
            runs. Brackets every 1.2 to 1.5 m on horizontal runs.
          </li>
        </ul>
        <p>
          The decision is scale plus environment. Heavy sub-mains of 25 to 185 mm² go on ladder or
          heavy tray, bulk final-circuit distribution on basket, drops to accessories in conduit,
          surface work in mini-trunking with a pattress, and risers between floors in compartmented
          metal trunking.
        </p>
      </ConceptBlock>

      <VideoCard {...videos.containmentVsClipping} />

      <InlineCheck
        id="305e-3-1-check-1"
        question="Steel conduit is run on a wall with saddles at 1.5 m intervals. What is the standard practice at every box, fitting and change of direction?"
        options={[
          'A saddle within around 150 to 200 mm of the discontinuity, in addition to the regular interval',
          'No extra saddle — the fitting itself supports the conduit at that point',
          'A saddle at the midpoint between every pair of boxes, regardless of bends',
          'An extra saddle only where the run changes from horizontal to vertical',
        ]}
        correctIndex={0}
        explanation="Every box, fitting and change of direction needs a saddle within roughly 150 to 200 mm of it. Without one, that discontinuity carries the whole mechanical load of the unsupported run beyond it, and over time the threaded joint works loose and the run pulls apart."
      />

      <SectionRule />

      <ConceptBlock
        title="Fixing accessories — depth, substrate, level"
        plainEnglish="The back-box decides the quality of the second fix. Depth matched to the accessory, fixing matched to the substrate, face set slightly below the finished plaster line, and everything plumb and level before you walk away."
        onSite="The faceplate hides the back of the box, so nobody can see whether you went 25 or 35 mm. The cable knows. A pinched conductor in a shallow box runs hot and eventually shows up on a thermography survey or an insulation resistance test."
      >
        <p>
          Box depth follows the accessory, and going one size deeper is rarely wrong. 16 mm suits
          low-profile single switches only; 25 mm is the standard flush depth for 13 A sockets and
          1.5 or 2.5 mm² twin and earth; 35 mm takes fused connection units, dimmers and fan
          controllers and is the if-in-doubt depth; 47 mm takes cooker and shower switches, 6 mm²
          and above, and multi-module grid switches.
        </p>
        <p>
          The chase depth follows from the box: box depth, plus the plaster skim thickness, plus 1
          to 3 mm of recess, plus a small allowance for an uneven chase floor. A 35 mm box under a
          12 mm finish comes out at around 50 mm, a 25 mm box at around 40 mm. Dry-fit and check
          before fixing. The fixing itself follows the substrate, and the wrong one is how boxes
          pull out of walls.
        </p>
        <p>
          Solid brick, block and concrete take frame fixings — a knurled-shaft screw inside an
          integrated nylon plug, typically 60 mm × 6 mm through the back-box lugs. Aerated block
          takes cavity plugs that expand in the void, because a frame fixing crumbles it.
          Plasterboard takes a dry-line box whose spring-loaded jaws clamp the board against the box
          face; plugs around a standard flush box fail under the side load of anything plugged in.
          Timber studs take wood screws, pilot-drilled in hard timber. On dado trunking the
          accessory plate clips to the front face, and the trunking sets the level for every plate
          on it.
        </p>
        <p>
          Where a stud lands behind the marked position, move the accessory up to about 50 mm into
          the bay, or use a side-fix dry-line box that grabs the stud. Where the position is
          architecturally fixed and neither works, raise it as a query — never notch a structural
          stud to fit electrical kit.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Support intervals and fire supports</ContentEyebrow>

      <ConceptBlock
        title="Cable support intervals — OSG Table 4.5"
        plainEnglish="The support interval is a maximum, not a target. Its job is to keep the cable carrying its own weight between fixings so that none of that weight reaches a termination."
        onSite="Tighter than the table looks better and costs almost nothing — 200 mm on a kitchen run instead of 250 mm is five extra clips and a visibly neater job."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Twin and earth.</strong> 1.0 to 2.5 mm² at around 250 mm horizontal and 400 mm
            vertical; 4 to 6 mm² at around 300 mm and 400 mm; 10 to 16 mm² at around 350 mm and 450
            mm.
          </li>
          <li>
            <strong>SWA.</strong> Multi-core below 25 mm² at around 600 mm horizontal and 900 mm
            vertical; 25 to 185 mm² at around 900 mm and 1500 mm, plus cleats.
          </li>
          <li>
            <strong>Singles in conduit.</strong> The conduit is supported at around 1 m horizontal
            and 1.2 m vertical; the cable inside is not separately supported.
          </li>
        </ul>
        <p>
          Add a fix within about 150 mm of every box, termination and change of direction — the
          discontinuities where stress concentrates. That is the point of Reg 522.8.5: no
          appreciable mechanical strain may reach the terminations, including the strain of the
          cable&rsquo;s own weight, and the regulation explicitly includes consumer unit meter
          tails.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 522.8.5"
        clause="522.8.5 Every cable or conductor shall be supported in such a way that it is not exposed to undue mechanical strain and so that there is no appreciable mechanical strain on the terminations of the conductors, account being taken of mechanical strain imposed by the supported weight of the cable or conductor itself."
        meaning="The test is what arrives at the terminal. A run can look well clipped along its length and still be hanging its own weight off the last screw in a consumer unit, and that is what this rules out. Hence the clip close in to every box and change of direction: the fixing takes the weight, so the termination only has to hold the conductor. The regulation names meter tails specifically, which is where this is most often got wrong."
        cite="BS 7671 Part 5, Chapter 52, Section 522 — Regulation 522.8.5"
      />

      <SectionRule />

      <ConceptBlock
        title="The A4:2026 fire-support change — Reg 521.10.202"
        plainEnglish="Cable supports used to have to survive a fire only on escape routes. A4:2026 extended the requirement across the whole installation, because fire does not respect the boundary of a marked escape route."
        onSite="This is a van-stock change, not a paperwork change. The bag of nylon cable ties comes out and stainless steel ties or metal P-clips go in for every primary cable support."
      >
        <p>
          What satisfies it: metal P-clips in galvanised or stainless steel; stainless steel cable
          ties, typically 4.6 × 200 mm; metal trunking and basket, where the containment itself is
          the support and the cables inside need no ties at all; proprietary fire-rated cable
          management systems installed to the manufacturer&rsquo;s instructions; and steel saddles
          for conduit.
        </p>
        <p>
          What does not: plastic cable ties, plastic clips on plastic fixings, adhesive, and
          double-sided tape, all of which melt or release within seconds in a fire. Plastic ties are
          still fine for non-load-bearing tidying where a metal fixing already carries the weight,
          but never as the primary support. On a retrofit, where you find an existing install held
          up on nylon ties, flag it on the job report — it is not your defect, but leaving it
          unrecorded makes it your problem.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 521.10.202 (Cable support against premature collapse in fire)"
        clause="(Paraphrased.) Wiring systems shall be supported in such a way that they are not liable to premature collapse in the event of a fire. This regulation applies throughout the installation."
        meaning="A4:2026 widened this from the previous escape-routes-only wording to the whole installation. The reasoning is that a cable dropping into any space during a fire is a hazard for people evacuating and for the crews going in — and the boundary of an escape route was always artificial, because the kitchen ceiling void connects to the bedroom ceiling void connects to the stairwell. The practical effect is that metal clips or metal cable ties replace plastic for every clipped-direct cable run. The cost difference is small; the difference in what happens in the first minute of a fire is not."
        cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 52, Regulation 521.10.202 (introduced and expanded A4:2026)."
      />

      <InlineCheck
        id="305e-3-1-check-2"
        question="Twin and earth runs through a ceiling void in a flat above a commercial unit. Under Reg 521.10.202 as amended by A4:2026, how must it be supported?"
        options={[
          'Plastic cable ties at close intervals, since the void is not itself an escape route',
          'Adhesive cable clips bonded to the joists with high-temperature glue',
          'Non-combustible supports — metal clips, metal cable ties or a fire-rated system — because the requirement now applies throughout the installation',
          'No fixed support at all, provided the cable rests on top of the ceiling joists',
        ]}
        correctIndex={2}
        explanation="The void is not a marked escape route, but that no longer matters — A4:2026 extended the requirement across the whole installation. Nylon ties melt within seconds and drop the cable, creating a hazard for occupants evacuating and for fire crews. Metal clips, stainless steel ties or a rated fire-resistant system are what satisfy the regulation."
      />

      <SectionRule />

      <ContentEyebrow>Conduit and trunking work</ContentEyebrow>

      <ConceptBlock
        title="Conduit and trunking — bends, saddles, expansion, lids"
        plainEnglish="Containment is mechanical engineering. Bends that are too tight stop the cable pulling, saddles too far apart let the run move, and a long steel run with nowhere to expand eventually tears its own joints apart."
        onSite="A well-installed steel conduit run is one of the most satisfying things in a plant room. A badly installed one looks like a snake fight and never performs properly under fault current either."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>PVC conduit.</strong> Cold bend radius is typically 6 times the outside
            diameter, so 25 mm conduit wants about a 150 mm radius — tighter and it kinks and the
            cable will not pull. Saddles around every 1 m horizontal and 1.2 m vertical, plus one
            within 150 mm of every box and bend, with solvent-welded joints.
          </li>
          <li>
            <strong>Steel conduit.</strong> Clean full-depth threads, banding bushes at every box
            entry for earth continuity, lock-nut inside — made up properly the conduit is the CPC
            and an end-to-end continuity test reads under about 0.05 Ω. Saddles at 1.2 to 1.5 m plus
            one at every discontinuity, and an expansion coupler around every 30 m.
          </li>
          <li>
            <strong>Trunking fixings and lids.</strong> Fix through the back into the substrate,
            never through the front face — around 600 mm for plastic, 800 to 1000 mm for metal. Lid
            clips around every 600 mm, closer at ends, at fittings and on vertical runs. End cap
            every cut end.
          </li>
          <li>
            <strong>Basket and tray.</strong> Brackets every 1.2 to 1.5 m on horizontal runs —
            cantilever, trapeze or channel-mounted — tighter at ends and heavy load points, with
            slotted splice plates for expansion on runs over 30 m. Where mains, data and fire-alarm
            cables share a route, use compartmented trunking with a divider strip or separate
            baskets to meet the BS 6701 and BS 5839 separation requirements.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Pulling in, dressing and proving</ContentEyebrow>

      <ConceptBlock
        title="Pulling the cable — fill, tension, grips and lubricant"
        plainEnglish="A pull is planned arithmetic, not brute force. Work out whether the cable fits, work out how hard you are allowed to pull, attach the rope to the sheath and not the conductor, and stop the moment it feels wrong."
        onSite="Forcing a jammed pull damages the cable, and the damage does not show up until the insulation resistance test — or the periodic inspection years later. Stop, reverse, find out why, fix the cause, re-attempt."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Fill.</strong> Use the OSG Appendix C and Table H1 cable factors, not raw
            cross-sectional area — twin and earth is flat, so a circle calculation is wrong. Worked:
            the 2.5 mm² twin and earth factor is 18, so six cables give 108; a 25 mm conduit on a
            straight run has a conduit factor of around 333, so fill is 108 ÷ 333 = 32 per cent,
            inside the conventional 45 per cent maximum. Three 90° bends in a 10 m run drop the
            conduit factor to roughly 260 to 280, taking fill to around 40 per cent — inside, but
            only just.
          </li>
          <li>
            <strong>Tension.</strong> The published figure is around 50 N/mm², roughly 5 kg per mm²
            of conductor cross-section, for copper pulled with a stocking grip, dropping to around
            30 N/mm² if you pull on the conductor itself. Many sites work to a more conservative 1.5
            to 2 kg/mm² field rule. Above around 100 kg, use a tension meter or a powered puller
            with a torque limit.
          </li>
          <li>
            <strong>Grips, eyes and lubricant.</strong> A pulling grip is a braided wire mesh sleeve
            that tightens on the sheath and spreads the force along roughly 150 to 300 mm of cable;
            a pulling eye is a factory-fitted loop on large SWA, MV and HV cable transmitting force
            through the cable&rsquo;s mechanical termination. Neither ever loads the conductor. Use
            a purpose-made wax-free lubricant — never WD-40, engine oil or washing-up liquid, all of
            which Reg 522.8.1 rules out.
          </li>
          <li>
            <strong>Getting a line through.</strong> Conduit rod or fibreglass tape on short and
            medium runs, a mouse and line blown through with compressed air on long or complex ones,
            with a 6 mm polyester rope at 200 to 300 kg breaking strain for most pulls.
          </li>
          <li>
            <strong>Draw boxes.</strong> Every 30 m on a long straight run, at any change of
            direction beyond two 90° bends in series, at every floor penetration on a riser, at
            every change of containment type, and anywhere future maintenance access will be wanted.
            Plan them at design stage — retrofitting one mid-install means breaking into finished
            containment.
          </li>
        </ul>
        <p>
          Bend radius applies during the pull as well as in the finished run — 6 times the overall
          diameter unarmoured, 8 for SWA, 12 for MICC. Where a corner cannot accept it the fix is
          mechanical: a draw box so the cable enters and leaves in two straight pulls, or a
          re-route. Pulling slower does not help, and neither does lubricant.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 522.8.1"
        clause="522.8.1 A wiring system shall be selected and erected to avoid during installation, use or maintenance, damage to the sheath or insulation of cables and their terminations. The use of any lubricants that can have a detrimental effect on the cable or wiring system are not permitted."
        meaning="Damage done on the day you pull the cable counts the same as damage done years later, which is why the pull itself is part of compliance and not just good practice. The second sentence is the one people fall foul of: reaching for whatever is in the van to free a tight pull is not allowed if it attacks the sheath. Use a lubricant sold for cable pulling, and if the run will not take one that is suitable, the answer is a draw box or a re-route rather than a different tin."
        cite="BS 7671 Part 5, Chapter 52, Section 522 — Regulation 522.8.1"
      />

      <InlineCheck
        id="305e-3-1-check-3"
        question="You are pulling six 2.5 mm² twin and earth cables through 10 m of 25 mm PVC conduit with three 90° bends. The bundle jams at the second bend. What is the right response?"
        options={[
          'Apply maximum force on the rope to drive the bundle through the jam in one pull',
          'Stop, reverse the pull to free the cable, find out why it jammed, add lubricant or a draw box at the worst bend, then re-attempt',
          'Cut the conduit open at the bend, free the cable and sleeve the cut with tape',
          'Strip one cable out of the bundle and pull the remaining five through first',
        ]}
        correctIndex={1}
        explanation="Stop, reverse, investigate, re-attempt. Forcing a jam damages the cable in a way you cannot see and will not find until the insulation resistance test. The underlying cause is usually insufficient lubricant, too many bends in series, or a fill that was never calculated — and if the run is genuinely over-filled, an intermediate draw box splitting the pull in two is the real cure."
      />

      <SectionRule />

      <ConceptBlock
        title="Dressing, sealing and proving"
        plainEnglish="The cable being in is not the job finished. It has to be dressed so it performs and so the next person can work on it, the fire compartments have to be made good, and the install has to be proved before it is terminated."
        onSite="A knotted bundle of unsegregated cable on a basket is impossible to add to without disturbing everything already there. Ten minutes of dressing buys back hours across the life of the building."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Parallel, segregated and spaced.</strong> Cables run along the length of the
            tray rather than zig-zagging, with mains in one zone and data, fire alarm and
            extra-low-voltage in another, divided by a barrier where the standards require it.
            Bundling tightly raises the effective grouping count and cuts the rated current of every
            cable in the bundle, so the dressing has to deliver the spacing the design assumed.
          </li>
          <li>
            <strong>Secured and labelled.</strong> Metal cable ties at around 600 mm horizontal and
            400 mm vertical, tight enough to hold without deforming the sheath, and the minimum bend
            radius respected where a cable drops off the tray. Circuit name and board way labelled
            at every change of direction, junction box and termination.
          </li>
          <li>
            <strong>Fire-stopped.</strong> Every penetration of a fire compartment wall or floor —
            intumescent putty, pillows, mastic or a proprietary fire-stop boot, sized for the
            penetration, to Approved Document B and BS 9999. Internal partitions inside a single
            dwelling generally do not need it unless the design says so.
          </li>
          <li>
            <strong>Left usable, and proved.</strong> Feed a fresh polyester draw rope through
            alongside the installed cable and leave both ends accessible. Then insulation resistance
            test at 500 V DC before terminating — at least 1.0 MΩ confirms the cable survived the
            pull, and below that it comes out.
          </li>
        </ul>
        <p>
          Where a cable crosses joists, the holes go in the centre of the joist depth and no closer
          than 50 mm to the top or bottom edge. This one is a structural limit rather than an
          electrical one — you are protecting the joist, not the cable — and it is the kind of
          thing a building inspector notices long before an electrical inspector does. Work to the
          figures on the structural drawing or the specification for the job, because they govern.
        </p>
      </ConceptBlock>

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Plastic cable ties supporting twin and earth in a ceiling void"
        whatHappens={
          <>
            The job was first-fixed before the A4:2026 change was understood on site. Black nylon
            cable ties hold three twin and earth circuits along a ceiling void above the stairwell
            of a flat. Six months later a small kitchen fire heats the void, the ties melt within
            about thirty seconds, and all three cables drop into the stairwell. Fire crews report a
            tripping hazard and cables fouling the only escape route, and the post-incident report
            flags the support system as non-compliant with Reg 521.10.202.
          </>
        }
        doInstead={
          <>
            Change the van stock — stainless steel cable ties or metal P-clips for every primary
            cable support, with plastic kept only for non-load-bearing tidying. On retrofit work,
            record any existing plastic-tie install on the job report so the responsible person is
            on notice and a remedial visit can be quoted. Reg 521.10.202 read with Reg 522.8.5 is
            the basis for the observation.
          </>
        }
      />

      <CommonMistake
        title="Forcing a pull that has jammed"
        whatHappens={
          <>
            The bundle stops moving halfway along the run, the drum end is fifteen metres away and
            everyone wants to be finished, so another two people get on the rope. It comes through.
            Nobody knows what it came through against, because the thing it caught on is inside the
            containment where nobody can see it — a burr on a cut end, a kinked bend that never met
            the radius, a fill that was eyeballed rather than worked out from the cable and conduit
            factors. The sheath is scuffed or split and the insulation underneath is stretched or
            nicked. The circuit terminates, energises and works, so the damage is invisible on the
            day. It surfaces at the insulation resistance test if somebody tests before terminating,
            and if nobody does, it surfaces years later as an intermittent fault or a periodic
            inspection finding that nobody can account for.
          </>
        }
        doInstead={
          <>
            Treat a jam as information rather than an obstacle. Stop, reverse the pull to free the
            cable, and find out what it caught on before touching the rope again — the cause is
            almost always the fill, the bends in series or the lubricant, and all three are fixable.
            Add a draw box to split the pull into two straight runs where the geometry is the
            problem. Keep to the pulling grip on the sheath and the published tension limit rather
            than to what the crew can manage between them, and respect the bend radius during the
            pull as well as in the finished run. Then prove it: insulation resistance test before
            terminating, so a cable that was damaged in the pull comes out while it is still easy to
            replace rather than after the walls are closed.
          </>
        }
      />

      <Scenario
        title="Caerphilly flat above a café — first-fixing a kitchen ring through stud wall and ceiling void"
        situation={
          <>
            A 32 A kitchen ring final in 2.5 mm&sup2; twin and earth, in a flat above a café in
            Caerphilly. Out of the consumer unit under the stairs, up 2.4 m inside a stud wall,
            across 4 m of ceiling void, down 2.4 m to the first socket, then along the kitchen wall
            and back to the board — around 30 m in total. The stud wall has noggins at 1.2 m, the
            joists run perpendicular to your route, and one penetration is through a fire-rated stud
            wall between kitchen and hallway.
          </>
        }
        whatToDo={
          <>
            Take it in order. In the stud bays the cable hangs inside the cavity and needs no
            clipping through the bay, but it needs a metal P-clip at the top of each bay where it
            enters the ceiling void, to carry the weight of the drop below, and another at the
            back-box end. Across the void, run along the joist tops and through joist holes at the
            centre of the depth, no closer than 50 mm to either edge, with metal P-clips at around
            250 mm horizontal — non-combustible support throughout under Reg 521.10.202, and no
            plastic ties anywhere. Fire-stop the compartment penetration with intumescent putty both
            sides. At the board both legs of the ring land on the same device with the CPCs sleeved.
            Then prove it: continuity of the ring, insulation resistance at 500 V DC with at least
            1.0 MΩ, and polarity.
          </>
        }
        whyItMatters={
          <>
            A kitchen ring is the most-installed circuit in the country, which is exactly why the
            install-time detail gets skipped. The four things people miss are all in this route:
            non-combustible support across the whole void rather than just the stairwell,
            fire-stopping at the compartment penetration, joist holes in the structurally safe band,
            and clips at the top and bottom of each stud bay where the cable would otherwise hang on
            its own terminations.
          </>
        }
      />

      <SectionRule />

      <FAQ
        items={[
          {
            question: 'How often should twin and earth be clipped in a ceiling void?',
            answer:
              'Around 250 mm horizontal for the 1.0 to 2.5 mm² sizes, per OSG Table 4.5. In a void where the cable crosses joists that is at least one clip per joist crossing, plus an extra in the middle of any longer span. Reg 521.10.202 as amended by A4:2026 then requires those supports to be non-combustible, so it is metal P-clips or metal cable ties throughout — plastic ties are no longer acceptable as the primary support anywhere in the installation.',
          },
          {
            question: 'What bend radius does SWA need, and what happens if I go tighter?',
            answer:
              'Eight times the cable overall diameter, taken from the IET guidance and the manufacturer data behind BS 5467 and BS 6724. Go tighter and the steel armour kinks, the lay of the cores distorts, and the insulation is stressed in a way you cannot see. It usually passes on the day and fails an insulation resistance test months later. Plan the radius before you pull, and use a draw box at any corner that cannot accept it rather than forcing the bend.',
          },
          {
            question: 'When do I actually need to fire-stop a cable penetration?',
            answer:
              'Where the wall or floor is a fire compartment boundary — separating dwellings in a block, separating compartments in a commercial building, separating an HMO unit from the common parts. Intumescent putty, pillows, mastic or a proprietary fire-stop boot, chosen for the size and type of penetration, to Approved Document B and BS 9999. Internal partitions inside a single dwelling generally do not need it unless the design specifically calls for it.',
          },
          {
            question: 'What lubricant should I use on a pull?',
            answer:
              'A purpose-formulated cable-pulling lubricant that is wax-free — waxes can attack PVC conduit — compatible with the cable sheath, and slow to evaporate so it stays slick through a long pull. Apply it at the conduit entry and at the bends; the cable carries it along the run. Never WD-40, which degrades PVC, never engine oil, and never washing-up liquid, which dries out and leaves a residue. Reg 522.8.1 explicitly prohibits lubricants that have a detrimental effect on the cable or the wiring system.',
          },
        ]}
      />

      <KeyTakeaways
        points={[
          'Containment and boxes go in first and cable goes in last. Pulling into partly installed containment is how cable is damaged before it is energised.',
          'OSG Table 4.5 sets the support intervals — around 250 mm horizontal and 400 mm vertical for small twin and earth, with an extra fix within about 150 mm of every box, termination and bend.',
          'Reg 522.8.5 is the reason for those intervals: no appreciable mechanical strain may reach the terminations, and the regulation explicitly includes consumer unit meter tails.',
          'A4:2026 extended Reg 521.10.202 across the whole installation — metal clips and stainless steel ties replace plastic for all primary cable support.',
          'Bend radius is 6 times the overall diameter unarmoured, 8 for SWA, 12 for MICC, and it applies during the pull as well as in the finished run.',
          'Back-boxes are set 1 to 3 mm recessed below the finished plaster line, with the fixing matched to the substrate and the depth matched to the accessory.',
          'Steel conduit needs an expansion coupler around every 30 m, because steel moves roughly 12 µm per metre per °C.',
          'Every penetration of a fire compartment is sealed to Approved Document B and BS 9999, and the finished run is proved at 500 V DC with at least 1.0 MΩ before terminating.',
        ]}
      />

      <ContentEyebrow>Check yourself</ContentEyebrow>
      <Quiz questions={quizQuestions} title="Methods and techniques for installing and fixing" />
    </div>
  );
}
