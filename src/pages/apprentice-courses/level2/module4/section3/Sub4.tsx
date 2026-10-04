/**
 * Module 4 · Section 3 · Sub 4 — Install wiring systems and supports
 * City & Guilds 2365-02 → Unit 204 → LO3 → AC 3.4
 *   AC 3.4 — "Install wiring systems and supports"
 *
 * The big install Sub. Containment (PVC + steel conduit, trunking, tray + basket
 * + ladder) with bend radii, intervals, expansion. Cable support intervals per
 * OSG Table D1, bend radii per OSG Table D5. Reg 521.10.202 fire-support
 * requirement (throughout the installation since the 2018 edition) and 522.8.5.
 * Worked example: 2nd-fix kitchen ring through stud wall + ceiling void.
 */

import { useNavigate } from 'react-router-dom';
import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
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
import useSEO from '@/hooks/useSEO';

const TITLE = 'Install wiring systems and supports (3.4) | Level 2 Module 4.3.4 | Elec-Mate';
const DESCRIPTION =
  'PVC and steel conduit, trunking, tray, basket and ladder. Cable supports and intervals per OSG. Reg 521.10.202 fire-support requirement (applies throughout the install). T&E and SWA installation patterns from kitchen rings to commercial sub-mains.';

const checks = [
  {
    id: 'tne-clip-spacing',
    question:
      'For 1.5 mm² T&E (under 9 mm across) clipped direct on a horizontal run, the maximum interval between clips per OSG Table D1 is:',
    options: ['400 mm', '300 mm', '600 mm', '250 mm'],
    correctIndex: 3,
    explanation:
      'OSG Table D1 gives 250 mm horizontal and 400 mm vertical for non-armoured cables under 9 mm across (for flat cable, measure the width). 300 mm is the horizontal figure for cables 9–15 mm across; 600 mm is for mineral insulated cable. Going beyond these intervals lets the cable sag, which puts mechanical stress on terminations (522.8.5) and looks scrappy.',
  },
  {
    id: 'conduit-bend-radius',
    question: 'For a cold bend on 25 mm PVC conduit, the minimum bend radius is approximately:',
    options: [
      '2.5× OD (so ~63 mm inner radius for 25 mm conduit).',
      '1× OD (so ~25 mm radius for 25 mm conduit).',
      '6× OD (so ~150 mm radius for 25 mm conduit).',
      'There is no minimum — PVC conduit can be bent to any radius cold.',
    ],
    correctIndex: 0,
    explanation:
      'OSG Table D3 note (c): the inner radius of a conduit bend should be not less than 2.5 times the outside diameter of the conduit — about 63 mm for 25 mm conduit. Tighter and the conduit kinks and the cable inside no longer pulls. Heat-bend if you need tighter, but most jobs use formed bends or pull-elbows.',
  },
  {
    id: 'fire-support-throughout',
    question:
      'BS 7671 Reg 521.10.202 requires wiring systems to be supported so they are not liable to premature collapse in a fire — applying:',
    options: [
      'Only on cables installed in escape routes such as corridors and staircases.',
      'Throughout the installation, not just on escape routes (the 2018 edition replaced the escape-route-only Reg 521.11.201).',
      'Only on cables installed outdoors or in unheated plant rooms.',
      'Only on circuits supplying fire-alarm and emergency-lighting systems.',
    ],
    correctIndex: 1,
    explanation:
      'The 2018 edition made this a significant change — previously Reg 521.11.201 applied only on escape routes. Reg 521.10.202 requires cables to be adequately supported against premature collapse in fire throughout the installation. In practice this means metal clips or fire-rated supports for clipped cables, not just plastic cable ties along ceiling voids. Worth re-reading the regulation in full when planning a fix-out.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'For 6 mm² T&E clipped direct vertically (e.g. a feeder drop), typical maximum support interval is approximately:',
    options: ['200 mm', '400 mm', '600 mm', '1200 mm'],
    correctAnswer: 1,
    explanation:
      'OSG Table D1 gives 400 mm vertical for non-armoured cables 9–15 mm across, which covers 6 mm² T&E. The cable’s self-weight is the limiting factor — vertical clips carry less perpendicular load than horizontal, so intervals can be longer. Always check Table D1 for the cable’s overall size and orientation.',
  },
  {
    id: 2,
    question:
      'Steel conduit run on a wall, 1.5 m intervals between saddles. Standard practice for change-of-direction support is:',
    options: [
      'No additional saddle is needed at bends — the fitting itself supports the conduit.',
      'A saddle at the midpoint between every pair of boxes, regardless of bends.',
      'A support within 300 mm of every bend or fitting.',
      'A saddle only where the conduit changes from horizontal to vertical.',
    ],
    correctAnswer: 2,
    explanation:
      'OSG Table D3 note (b): supports should be positioned within 300 mm of bends or fittings. Without it, the bend or fitting takes the full mechanical load of the unsupported run beyond — over time the threads work loose and the joint pulls apart.',
  },
  {
    id: 3,
    question:
      'PVC trunking has lid clips that secure the cover to the body. On a long horizontal run, lid clips should be:',
    options: [
      'One at each end only — the lid is self-retaining along the middle of the run.',
      'One every ~3 m, matching the standard length of a trunking stick.',
      'One every ~50 mm, giving a continuous clamped seam along the lid.',
      'One every ~600 mm — closer at ends and at any point where the lid might be lifted by passing traffic.',
    ],
    correctAnswer: 3,
    explanation:
      'Trunking lids without enough clips bow out, gap, or fall off. ~600 mm spacing is a typical baseline; tighter at exposed ends, in high-traffic areas, on vertical runs (gravity pulls the lid down), and around fittings. Fit the clips that come with the trunking — they are sized for the lid section and snap into the trunking body.',
  },
  {
    id: 4,
    question: 'Cable basket runs in a service riser typically need expansion provision on:',
    options: [
      'Long vertical or horizontal steel runs (>30 m) — typically using slotted bolt holes or sliding splices to allow thermal expansion.',
      'Every run regardless of length, because steel basket cannot tolerate any thermal movement.',
      'Only at the point where the basket changes from horizontal to vertical.',
      'Only on basket runs carrying data cables, which are sensitive to movement.',
    ],
    correctAnswer: 0,
    explanation:
      'Steel cable basket and tray expand significantly with temperature change — a 30 m run can expand 10-15 mm between cold and warm conditions. Splice plates with slotted bolt holes, or expansion-joint sections every ~30 m, allow that movement without buckling the run or stressing supports. Aluminium basket expands roughly twice as much.',
  },
  {
    id: 5,
    question: 'Bend radius for 6 mm² T&E (twin and CPC) is typically:',
    options: [
      '3× the cable width — the figure for cables under 10 mm across.',
      '4× the cable width — non-armoured cable 10–25 mm across (for flat cable, the width).',
      '6× the cable width — the figure for armoured cable.',
      '8× the cable width — the figure for solid aluminium or shaped conductors.',
    ],
    correctAnswer: 1,
    explanation:
      'OSG Table D5 gives the minimum internal bend radius for non-armoured PVC cable as 3× the diameter up to 10 mm and 4× from 10 to 25 mm; for flat cable the diameter is the width (major axis). 6 mm² T&E is over 10 mm wide, so 4×. Armoured cable is 6×. Tighter than the minimum and the conductor strain can damage the insulation.',
  },
  {
    id: 6,
    question:
      'A T&E cable runs along a ceiling void in a flat above a commercial unit. Reg 521.10.202 means it must be supported by:',
    options: [
      'Plastic cable ties at close intervals, since the void is not itself an escape route.',
      'Adhesive cable clips bonded to the joists with high-temperature glue.',
      'Non-combustible supports (metal clips, metal cable ties, or fire-rated systems) so cables do not prematurely collapse in fire — applies throughout the installation, not just escape routes.',
      'No fixed support at all, provided the cable rests on top of the ceiling joists.',
    ],
    correctAnswer: 2,
    explanation:
      'Since the 2018 edition, Reg 521.10.202 requires cable supports to resist premature collapse in fire throughout the installation (NOTE 3: non-metallic clips or ties must not be the sole means of support). Plastic cable ties melt within seconds in fire, dropping the cable and creating a tripping hazard for evacuating occupants AND for fire crews. Metal clips, metal cable ties or BS-rated fire-resistant systems satisfy the regulation.',
  },
  {
    id: 7,
    question: 'A 32 m horizontal run of 25 mm steel conduit needs an expansion coupler because:',
    options: [
      'Steel contracts as it warms, so the coupler stops the run pulling its threaded joints apart.',
      'The coupler is purely for earth continuity along a long steel conduit run.',
      'Long runs must be electrically isolated into sections, which the coupler provides.',
      'Steel expands ~12 µm per m per °C; over 32 m a 30°C swing gives ~11 mm of expansion that has to be accommodated to prevent stress on the saddles and threaded joints.',
    ],
    correctAnswer: 3,
    explanation:
      'Steel coefficient of thermal expansion is roughly 12 µm/m/°C. A 32 m steel conduit run subject to a 30°C temperature swing expands ~12 mm. Without an expansion coupler somewhere in that length, the movement loads up the saddles and the threaded joints, eventually pulling the run apart. Standard practice — expansion coupler every ~30 m of long horizontal or vertical steel run.',
  },
  {
    id: 8,
    question: 'Cable cleats (heavy-duty cable supports for SWA on tray) are used because:',
    options: [
      'They restrain the cable against the considerable mechanical forces created by short-circuit fault currents in heavy cables (sub-mains, distribution).',
      'They electrically bond the armour of the SWA to the metal tray for earth continuity.',
      'They space the cable off the tray to improve current-carrying capacity by air cooling.',
      'They protect the cable sheath from abrasion against the edges of the perforated tray.',
    ],
    correctAnswer: 0,
    explanation:
      'When a heavy SWA or single-core cable carries a short-circuit fault current, the mechanical force from the magnetic field on the conductor can throw the cable several inches sideways. Cable cleats (rated to a kA force) restrain that movement. For sub-mains and distribution cables, cleats are mandatory rather than just good practice. Cable ties would snap on the first fault.',
  },
];

const faqs = [
  {
    question: 'How often should I clip T&E running through a ceiling void?',
    answer:
      'OSG Table D1 gives 250 mm horizontal for cables under 9 mm across and 300 mm for 9–15 mm (for flat T&E, measure the width). In a ceiling void where the cable might pass over joists, that is one clip per joist crossing as a baseline, plus an additional clip in the middle of any longer span. Reg 521.10.202 requires supports that will not collapse early in a fire — so metal P-clips or metal cable ties throughout the installation, not just on escape routes. Plastic ties are deprecated for cable support.',
  },
  {
    question: 'When do I need expansion couplers in steel conduit?',
    answer:
      'Long horizontal or vertical steel runs (>30 m) need expansion provision because steel expands roughly 12 µm/m/°C. Over 30 m and a 30°C summer-winter swing you get ~11 mm of movement; without a coupler that loads up the saddles and threaded joints. Expansion couplers (a sliding coupler with a sealing membrane) every ~30 m. Outdoor runs and runs in unheated spaces (lofts, plant rooms, garages) need them sooner.',
  },
  {
    question: 'What bend radius do I need for SWA?',
    answer:
      '6× the cable overall diameter for armoured cable, per OSG Table D5. For a 4-core 16 mm² SWA at about 22 mm across that is roughly a 132 mm radius. Tighter and the steel armour kinks, the lay of the cores distorts, and the cable can fail an IR test six months later because the insulation has been stressed at the bend. Always plan for the bend radius before pulling — use a draw box at any tight corner instead of forcing the bend.',
  },
  {
    question: 'Plastic or metal cable ties — does it actually matter?',
    answer:
      'Yes — Reg 521.10.202 makes it a requirement. Plastic cable ties melt within seconds in a fire (typically <100°C). The cable they were supporting drops, creating a hazard for evacuating occupants AND for fire crews. Metal cable ties (stainless steel, sometimes called "industrial ties") survive fire long enough for the cable to remain in place during evacuation. Required throughout the installation since the 2018 edition, not just on escape routes. Switch your van stock to metal where you would previously have used plastic.',
  },
  {
    question: 'Do I need to fire-stop where a cable passes through a wall?',
    answer:
      'If the wall is a fire compartment wall (separating dwellings in a flat block, separating fire compartments in a commercial building, separating an HMO unit from common parts), yes — fire-stopping at every penetration. Intumescent putty, intumescent pillows, fire-rated mastic, or proprietary fire-stop boots depending on the size and type of penetration. Approved Document B (Fire Safety) and BS 9999 set the requirements. Internal partition walls within a single dwelling generally do not need fire-stopping unless specified by the design.',
  },
  {
    question: 'How tight do I bend a T&E cable around a corner?',
    answer:
      '6× overall cable diameter as a hard minimum. For 2.5 mm² T&E that is roughly 6 × 8 = ~48 mm radius (a gentle curve, not a sharp bend). For tighter changes of direction, use a JB or a back-box as a transition point and fold the cable in two short straight segments rather than one tight bend. Kinking the cable is a 522.8.3 fail.',
  },
];

export default function Sub4() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage>
      <HubMasthead
        section="Module 4 · Section 3 · Subsection 4"
        title="Install wiring systems and supports"
        backTo=".."
      />
      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          The big install Sub. PVC and steel conduit, trunking, basket and ladder. Cable support
          intervals per OSG. The Reg 521.10.202 fire-support requirement (applies throughout the
          install, not just escape routes). Bend radii. Expansion. The mechanical engineering side
          of the trade.
        </p>

        <TLDR
          points={[
            'Cable supports per OSG Table D1 — 250 mm horizontal / 400 mm vertical for cables under 9 mm across, 300 / 400 mm for 9–15 mm. Tighter near terminations, fittings and bends.',
            'Reg 521.10.202 (since 2018) — supports must not collapse early in a fire, throughout the installation. Plastic clips or ties cannot be the sole support.',
            'Bend radius (OSG Table D5) = 3× for unarmoured cable under 10 mm, 4× for 10–25 mm (flat T&E: use the width), 6× for armoured. Tighter than that and the conductor strain damages insulation.',
          ]}
        />

        <LearningOutcomes
          outcomes={[
            'Install wiring systems and supports — verbatim AC 3.4 from City & Guilds 2365-02 Unit 204.',
            'Install PVC and steel conduit (cold and heat-formed bends, threaded joints, expansion couplers) to the bend radii and support intervals required.',
            'Install PVC and metal trunking with correct lid-clip spacing, internal/external corners, tees, end caps and fire-stopping at compartment penetrations.',
            'Install cable basket, tray and ladder with appropriate brackets, expansion provision and cable support cleats for the load and orientation.',
            'Apply OSG Table D1 support intervals to T&E, SWA and singles in conduit installations across horizontal, vertical and overhead runs.',
            'Apply Reg 521.10.202 — fire-resistant cable supports throughout the installation, not just on escape routes — using metal clips and cable ties.',
          ]}
          initialVisibleCount={3}
        />

        <ContentEyebrow>Containment families — pick the right system</ContentEyebrow>

        <ConceptBlock
          title="PVC conduit, steel conduit, trunking, basket, tray, ladder"
          plainEnglish="Six common containment families. Each suits a different scale, environment and mechanical-protection need. PVC conduit for domestic and light commercial. Steel conduit for industrial and where physical protection matters. Trunking for high cable counts. Basket and tray for service risers and commercial fit-outs. Ladder for heavy industrial sub-mains. Pick the family before you start ordering parts."
        >
          <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
              <strong>PVC conduit</strong> — 16, 20, 25, 32 mm OD common. Lightweight, quick to
              install, solvent-weld joints. Domestic and light commercial. Cold-bend or heat-bend;
              pre-formed elbows for tight corners.
            </li>
            <li>
              <strong>Steel conduit</strong> — Class A galvanised (heavy duty), Class B (light
              duty), black enamelled (rare modern, mostly heritage). Threaded joints, banding
              bushes, lock-rings. Industrial, agricultural, anywhere cables need real mechanical
              protection.
            </li>
            <li>
              <strong>PVC trunking</strong> — Square-section channel with a snap-on lid. 25 × 16
              mini-trunking domestic, 50 × 50 dado, 100 × 50 commercial. Holds multiple cables; lid
              lifts for additions later.
            </li>
            <li>
              <strong>Metal trunking</strong> — Steel or aluminium, larger cross-sections (75 × 75
              up to 300 × 100). Commercial sub-main runs, plant-room risers. Compartmented options
              for separation of mains / data / fire alarm cables.
            </li>
            <li>
              <strong>Cable basket</strong> — Welded steel mesh "basket" — supports loose cables in
              commercial false ceilings. Easy to add cables, easy to inspect. Brackets every 1.2-1.5
              m on horizontal.
            </li>
            <li>
              <strong>Cable tray</strong> — Solid or perforated steel sheet "tray" — heavier than
              basket, tidier appearance, takes more cable weight. Commercial and industrial.
            </li>
            <li>
              <strong>Cable ladder</strong> — Heavy-duty steel ladder structure for very heavy cable
              loads (sub-mains, distribution). Industrial, plant-room main runs.
            </li>
          </ul>
        </ConceptBlock>

        <ConceptBlock
          title="Mixing systems — when to switch from one to another"
          plainEnglish="A real install often uses three or four containment systems. Sub-main from incomer to consumer unit might be on cable ladder. Final circuits in the loft on basket. Drops to accessories in conduit chased into walls. Surface-mounted accessories in pattress boxes connected by mini-trunking. Each transition is a junction box or a transition fitting."
        >
          <p>The decisions:</p>
          <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
              <strong>Sub-main scale</strong> — heavy cables (25-185 mm² SWA or single-cores) →
              cable ladder or heavy tray.
            </li>
            <li>
              <strong>Bulk final-circuit distribution</strong> — multiple T&E or singles across a
              ceiling void → basket.
            </li>
            <li>
              <strong>Drops to accessories on a wall</strong> → conduit (PVC for domestic, steel for
              industrial) or chased T&E for short runs.
            </li>
            <li>
              <strong>Surface mount on a finished wall</strong> → mini-trunking + surface pattress.
            </li>
            <li>
              <strong>Service riser between floors</strong> → metal trunking with compartments, or
              large-section PVC trunking domestic-grade.
            </li>
          </ul>
        </ConceptBlock>

        <SectionRule />

        <ContentEyebrow>Cable support intervals — OSG Table D1</ContentEyebrow>

        <ConceptBlock
          title="The OSG support interval table — your daily reference"
          plainEnglish="OSG (On-Site Guide) Table D1 gives the maximum spacing of clips for cables in accessible positions. It goes by the overall size of the cable (for flat T&E, the width), with different figures for horizontal and vertical runs and for armoured cable. Memorise the common ones — they appear on every domestic / light commercial install."
          onSite="The interval is a MAXIMUM, not a target. Cables sag between supports; tighter intervals give a tidier install with less stress at the terminations. ~200 mm horizontal on T&E in a kitchen looks much neater than ~250 mm and is worth the extra five clips."
        >
          <p>OSG Table D1 maximum clip spacings (horizontal / vertical):</p>
          <div className="space-y-2.5 sm:hidden">
            <div className="rounded-xl bg-[hsl(0_0%_11%)] border border-white/[0.06] p-3.5">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-elec-yellow/85">
                Under 9 mm across (e.g. 1.0–1.5 mm² T&E)
              </div>
              <p className="text-[13px] text-white/85 mt-1">Horizontal 250 mm / Vertical 400 mm.</p>
            </div>
            <div className="rounded-xl bg-[hsl(0_0%_11%)] border border-white/[0.06] p-3.5">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-elec-yellow/85">
                9–15 mm across (e.g. 4–6 mm² T&E)
              </div>
              <p className="text-[13px] text-white/85 mt-1">Horizontal 300 mm / Vertical 400 mm.</p>
            </div>
            <div className="rounded-xl bg-[hsl(0_0%_11%)] border border-white/[0.06] p-3.5">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-elec-yellow/85">
                15–20 mm across (e.g. 10–16 mm² T&E)
              </div>
              <p className="text-[13px] text-white/85 mt-1">Horizontal 350 mm / Vertical 450 mm.</p>
            </div>
            <div className="rounded-xl bg-[hsl(0_0%_11%)] border border-white/[0.06] p-3.5">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-elec-yellow/85">
                Armoured (SWA), 9–15 mm across
              </div>
              <p className="text-[13px] text-white/85 mt-1">Horizontal 350 mm / Vertical 450 mm.</p>
            </div>
            <div className="rounded-xl bg-[hsl(0_0%_11%)] border border-white/[0.06] p-3.5">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-elec-yellow/85">
                Armoured (SWA), 15–20 mm across
              </div>
              <p className="text-[13px] text-white/85 mt-1">
                Horizontal 400 mm / Vertical 550 mm (20–40 mm across: 450 / 600 mm).
              </p>
            </div>
            <div className="rounded-xl bg-[hsl(0_0%_11%)] border border-white/[0.06] p-3.5">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-elec-yellow/85">
                PVC singles in conduit
              </div>
              <p className="text-[13px] text-white/85 mt-1">
                Conduit support per OSG Table D3 — 20–25 mm rigid PVC at 1.5 m horizontal / 1.75 m
                vertical; cable not separately supported within conduit.
              </p>
            </div>
          </div>
          <ul className="hidden sm:block space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
              <strong>Under 9 mm across (e.g. 1.0–1.5 mm² T&E)</strong> — Horizontal 250 mm /
              Vertical 400 mm.
            </li>
            <li>
              <strong>9–15 mm across (e.g. 4–6 mm² T&E)</strong> — Horizontal 300 mm / Vertical 400
              mm.
            </li>
            <li>
              <strong>15–20 mm across (e.g. 10–16 mm² T&E)</strong> — Horizontal 350 mm / Vertical
              450 mm.
            </li>
            <li>
              <strong>Armoured (SWA), 9–15 mm across</strong> — Horizontal 350 mm / Vertical 450 mm.
            </li>
            <li>
              <strong>Armoured (SWA), 15–20 mm across</strong> — Horizontal 400 mm / Vertical 550 mm
              (20–40 mm across: 450 / 600 mm).
            </li>
            <li>
              <strong>PVC singles in conduit</strong> — Conduit support per OSG Table D3 — 20–25 mm
              rigid PVC at 1.5 m horizontal / 1.75 m vertical.
            </li>
          </ul>
          <p>
            Add an extra clip close to every box, every termination, every change of direction. The
            discontinuities are where mechanical stress concentrates and where the cable wants to
            walk away from its support.
          </p>
        </ConceptBlock>

        <RegsCallout
          source="BS 7671:2018+A4:2026 — Regulation 522.8.5 (Cable mechanical strain)"
          clause="Every cable or conductor shall be supported in such a way that it is not exposed to undue mechanical strain and so that there is no appreciable mechanical strain on the terminations of the conductors, account being taken of mechanical strain imposed by the supported weight of the cable or conductor itself. NOTE: Consumer unit meter tails are included in the requirements of this regulation."
          meaning={
            <>
              Reg 522.8.5 is the why behind support intervals. A cable with insufficient support
              sags, and the sag puts mechanical strain on the conductor terminations — the
              cable&rsquo;s own weight pulls on the connections. Over time the strain loosens screw
              terminals, cracks soldered joints, and degrades the connection quality (526.1
              cross-link). The OSG intervals exist to keep the cable self-supporting between fix
              points so the terminations stay strain-free. The note explicitly includes consumer
              unit meter tails — they are heavy 25 mm² conductors and need clipping near the CU and
              near the meter to prevent strain on the stud terminations.
            </>
          }
          cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 52, Regulation 522.8.5 (verbatim)."
        />

        <InlineCheck {...checks[0]} />

        <SectionRule />

        <ContentEyebrow>Fire-resistant cable support — Reg 521.10.202</ContentEyebrow>

        <ConceptBlock
          title="Fire-resistant cable support — now applies throughout the installation"
          plainEnglish="Before 2018, the support rule (Reg 521.11.201) applied only on escape routes. The 2018 edition replaced it with Reg 521.10.202, which applies throughout the installation, and A4:2026 added a note explaining the intent. The reasoning: cables that drop in a fire hinder evacuation and firefighting wherever they fall. NOTE 3 rules out non-metallic clips or ties as the sole means of support for cables clipped direct or hung under tray."
          onSite="The practical effect is a van stock change. Bin the bag of nylon cable ties as primary support and use steel cable ties or metal P-clips. Plastic ties are still fine for bundling cables that are already supported some other way, but never as the only support."
        >
          <p>
            NOTE 1 to the regulation explains why: wiring systems hanging across access or egress
            routes may hinder evacuation and firefighting. The kitchen ceiling void connects to the
            bedroom ceiling void connects to the stairwell, so one melted plastic tie can drop a
            cable across the escape route even though the tie was nowhere near it.
          </p>
          <p>Acceptable supports under 521.10.202:</p>
          <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Metal P-clips (galvanised steel or stainless).</li>
            <li>Metal cable ties (stainless steel, 4.6 × 200 mm typical).</li>
            <li>
              Metal cable trunking and basket (the trunking itself acts as the support; cables
              inside need no plastic ties).
            </li>
            <li>
              Proprietary fire-rated cable management systems (Hilti CFS-T, Marshall-Tufflex
              Sterling, etc.).
            </li>
            <li>Steel saddles for conduit.</li>
          </ul>
          <p>
            NOT acceptable as primary support: plastic cable ties, plastic clips on plastic fixings,
            glue, double-sided tape. They all melt or release within seconds in a fire and the cable
            falls.
          </p>
        </ConceptBlock>

        <RegsCallout
          source="BS 7671:2018+A4:2026 — Regulation 521.10.202 (Cable support against premature collapse in fire)"
          clause="Wiring systems shall be supported such that they will not be liable to premature collapse in the event of a fire. NOTE 3: This regulation precludes, for example, the use of non-metallic cable clips or cable ties as the sole means of support where cables are clipped direct to exposed surfaces or suspended under cable tray, and the use of non-metallic cable trunking as the sole means of support of the cables therein."
          meaning={
            <>
              The 2018 edition extended this requirement from escape routes only (the old Reg
              521.11.201) to the whole installation. The reasoning is that cables dropping into any
              space during a fire create hazards for escape and for rescue crews. Practical
              implication: switch from plastic cable ties to metal clips or metal ties for any
              clipped-direct cable run, not just on marked escape routes. The cost difference is
              small; the regulatory and fire-safety difference is significant. Worth noting on every
              CDM RAMS for new installs.
            </>
          }
          cite="Source: BS 7671:2018+A4:2026, Regulation 521.10.202 and NOTE 3."
        />

        <InlineCheck {...checks[1]} />

        <SectionRule />

        <ContentEyebrow>Conduit installation — bends, intervals, joints</ContentEyebrow>

        <ConceptBlock
          title="PVC conduit — supports within 300 mm of bends, bends at least 2.5× OD"
          plainEnglish="PVC conduit is the most common containment in domestic and light commercial install. Bends need an inner radius of at least 2.5× the conduit's outside diameter (OSG Table D3). For 20–25 mm rigid PVC, supports at no more than 1.5 m horizontal and 1.75 m vertical, plus one within 300 mm of every bend or fitting. Solvent-weld joints set in seconds and bond fully in minutes."
          onSite="PVC conduit goes up fast. The skill is in the planning — getting bends right, leaving access at intervals (round inspection boxes for the cable to be pulled), and not running a 30 m run with 4 bends and no draw box."
        >
          <p>Standard PVC conduit installation sequence:</p>
          <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Mark the route on the wall, marking saddle positions to interval.</li>
            <li>Drill saddle holes, fit plugs, fit saddles.</li>
            <li>Cut conduit lengths, deburr the ends.</li>
            <li>Form bends (cold for gentle, heat for tight), or use pre-formed elbows.</li>
            <li>Solvent-weld joints — use the right solvent for the conduit grade.</li>
            <li>Click conduit into saddles, working from one end.</li>
            <li>Pull cable last — never try to pull through partially-installed conduit.</li>
          </ul>
        </ConceptBlock>

        <ConceptBlock
          title="Steel conduit — threaded joints, expansion couplers, banding bushes"
          plainEnglish="Steel conduit is heavier and slower to install but mechanically robust. Threaded joints made up with banding bushes (cone-shaped earth-continuity fittings). Lock-rings to retain bushes. Expansion couplers every ~30 m to absorb thermal movement. Supports at no more than 1.75 m horizontal / 2.0 m vertical for 20–25 mm steel conduit (OSG Table D3)."
          onSite="Steel conduit installation is a craft — accurate measuring, clean threading, dressed runs, every saddle in line with the next. A well-installed steel conduit run is one of the most satisfying things to look at in a plant room. A poorly installed one looks like a snake fight and never functions properly under fault current."
        >
          <p>Key steel conduit details:</p>
          <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
              <strong>Threading</strong> — die-set or pipe-thread machine. Clean threads, plenty of
              thread length (full die depth).
            </li>
            <li>
              <strong>Banding bushes</strong> — cone-shaped fitting that screws over the thread to
              give earth continuity at every box entry. Locknut on the inside.
            </li>
            <li>
              <strong>Expansion couplers</strong> — sliding coupler with a sealing membrane. Every
              ~30 m on long runs, especially in unheated spaces.
            </li>
            <li>
              <strong>Earth bonding</strong> — the conduit IS the CPC if all joints are made up
              properly with banding bushes. An IR test of the conduit-only continuity should give
              &lt;0.05 Ω end to end.
            </li>
            <li>
              <strong>Saddles</strong> — spacing-bar saddles (with a clearance bracket) or P-clips
              at 1.2-1.5 m intervals. Saddle within ~150 mm of every box and bend.
            </li>
          </ul>
        </ConceptBlock>

        <InlineCheck {...checks[2]} />

        <SectionRule />

        <ContentEyebrow>Trunking, basket, tray</ContentEyebrow>

        <ConceptBlock
          title="Trunking — multi-cable channel with a snap-on lid"
          plainEnglish="Trunking is a square-section channel that carries multiple cables under a removable lid. Mini-trunking (25 × 16 mm) for domestic surface accessory drops. Dado trunking (50 × 50 mm or 100 × 50 mm) for commercial desk-height runs. Larger metal trunking (100 × 100 mm and up) for sub-main and service-riser distribution."
        >
          <p>Trunking installation principles:</p>
          <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
              <strong>Fixings to the wall</strong> — typically every ~600 mm for plastic trunking,
              ~800-1000 mm for metal. Through the back of the trunking into the substrate; never
              through the front face (compromises the lid seating).
            </li>
            <li>
              <strong>Lid clips</strong> — every ~600 mm, closer at ends, fittings, and vertical
              runs. The clips that come with the trunking are sized for the lid section and snap
              into the body without distorting either.
            </li>
            <li>
              <strong>Internal corners</strong> — pre-formed angle pieces; bend-and-mitre only on
              metal trunking with the right tools.
            </li>
            <li>
              <strong>End caps</strong> — every cut end. Stops dust and rodents getting in and looks
              finished.
            </li>
            <li>
              <strong>Cable retaining clips inside</strong> — small plastic or metal clips that hold
              cables against the back of the trunking so they do not pile up when the lid is off.
              Saves frustration on additions.
            </li>
            <li>
              <strong>Compartmenting</strong> — for combined mains / data / fire alarm runs, use
              compartmented trunking with a divider strip. Keeps the cable families segregated to
              limit interference and meet BS 6701 (data) / BS 5839 (fire) separation requirements.
            </li>
          </ul>
        </ConceptBlock>

        <ConceptBlock
          title="Cable basket and tray — bracket spacing, expansion, cable cleating"
          plainEnglish="Basket (mesh) and tray (sheet) carry loose cable runs in service voids and risers. Brackets every 1.2-1.5 m on horizontal, tighter on verticals and at the ends of runs. Long runs need expansion provision. Cables loaded onto the basket/tray need either resting weight (small CSAs) or cable cleats (heavy SWA / single-core)."
        >
          <p>Basket / tray essentials:</p>
          <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
              <strong>Brackets</strong> — cantilever (one-side wall mount, basket extends
              horizontally), trapeze (suspended from above), channel-mount (on Unistrut). ~1.2-1.5 m
              intervals on horizontal, tighter at ends and at heavy load points.
            </li>
            <li>
              <strong>Expansion</strong> — splice plates with slotted bolt holes at every joint of
              long runs (&gt;30 m). Aluminium runs need it sooner than steel.
            </li>
            <li>
              <strong>Cable cleats</strong> — for sub-mains and any cable carrying a potential
              short-circuit fault current &gt;10 kA, cleats restrain the magnetic-force throw of the
              cable on the basket. Mandatory for HV / heavy LV, good practice for sub-mains.
            </li>
            <li>
              <strong>Cable separation</strong> — basket carries multiple cable types (mains, data,
              fire alarm) — use separation barriers or run separate baskets where the regulations
              require.
            </li>
            <li>
              <strong>Earthing</strong> — metal basket runs are often earthed via a continuity bond
              at one end. Check the spec; some basket runs are designed to be the CPC for the cables
              they carry.
            </li>
          </ul>
        </ConceptBlock>

        <SectionRule />

        <ContentEyebrow>
          Worked example — kitchen ring through stud wall + ceiling void
        </ContentEyebrow>

        <Scenario
          title="2nd-fix wiring a kitchen ring through stud wall, ceiling void, into a copper-clad CU"
          situation={
            <>
              A 32 A kitchen ring final, 2.5 mm² T&E. Route: out of consumer unit (under stairs), up
              vertically inside stud wall to ceiling level (2.4 m), across ceiling void (4 m) to
              kitchen wall, drop down stud wall (2.4 m) to first socket position, then daisy-chain
              across kitchen wall back to first socket and up/across/back to CU. Total cable run ~30
              m. Building is a flat above a café — escape route is a critical design factor.
            </>
          }
          whatToDo={
            <>
              <strong>Step 1 — survey the route.</strong> Walk it. Note: stud wall has noggins at
              1.2 m height; ceiling void has joists running perpendicular to cable route; one wall
              penetration through fire-rated stud wall (kitchen to hallway) needs intumescent
              fire-stopping.
              <br />
              <br />
              <strong>Step 2 — vertical drop in stud wall, CU end.</strong> Cable into top of CU
              enclosure via knockout + grommet. Vertical run inside stud wall cavity — no clipping
              needed inside the cavity (cable falls inside the bay), but a metal P-clip at top of
              the bay where the cable enters the ceiling void to support the weight of the cable
              below.
              <br />
              <br />
              <strong>Step 3 — ceiling void run.</strong> Cable runs along the joist tops, through
              joist holes if perpendicular crossings (centre of the joist depth, not closer than 50
              mm to top or bottom edge — Building Regs Part A). Metal P-clips at OSG Table D1
              spacing — Reg 521.10.202 requires support that will not collapse early in a fire,
              throughout the installation. NO plastic ties as the only support.
              <br />
              <br />
              <strong>Step 4 — fire-stop the wall penetration.</strong> Where the cable passes
              through the fire-rated stud wall between kitchen and hallway, intumescent putty around
              the cable in the penetration, both sides. This is Approved Document B and BS 9999 —
              penetration of a fire compartment must maintain the fire-resistance rating of the
              wall.
              <br />
              <br />
              <strong>Step 5 — vertical drop in kitchen wall.</strong> Same as the CU end — cable
              through a knockout + grommet at the top of the stud bay, hangs down inside the cavity,
              exits at the back-box level via a knockout in the back-box. Metal P-clip at the top of
              the bay; another at the back-box.
              <br />
              <br />
              <strong>Step 6 — daisy-chain along kitchen wall.</strong> Each back-box already chased
              and fixed (from Sub3). Cable runs through the back-boxes in conventional ring final
              pattern — line and neutral conductors landed on the loop terminals of each socket, CPC
              bonded through.
              <br />
              <br />
              <strong>Step 7 — return leg back to CU.</strong> Daisy-chain finishes at the last
              socket; the second leg of the ring picks up at the same socket and runs back to the CU
              via the same route (or a different route on the drawing — confirm).
              <br />
              <br />
              <strong>Step 8 — terminations at CU.</strong> Both ends of the ring land on the same
              RCBO Type A 32 A. Line conductors twisted together into the line terminal; neutrals
              into the neutral terminal; CPCs into the earth bar. Torque per Hager spec (typically
              1.2 Nm on the cage-clamp terminal of an NDN132A). Each CPC in its own earth-bar
              terminal where the board allows, so one can be lifted for testing without disturbing
              the other.
              <br />
              <br />
              <strong>Step 9 — verification.</strong> R1+R2 test on the ring (continuity of CPC and
              line back to itself), insulation resistance test (≥1.0 MΩ minimum at 500 V dc),
              polarity, then schedule for installer initial verification.
            </>
          }
          whyItMatters={
            <>
              A kitchen ring is the most common circuit type and the most-installed worked example.
              The detail above covers the install-time considerations that are easy to forget: Reg
              521.10.202 fire-support requirement throughout the ceiling void, fire-stopping at the
              compartment penetration, joist-hole placement in the safe centre band of the joist,
              and clipping at the discontinuities (top and bottom of stud bays) where the cable
              would otherwise hang under its own weight.
            </>
          }
        />

        <CommonMistake
          title="Plastic cable ties holding T&E along a ceiling void above an escape route"
          whatHappens={
            <>
              The job was first-fixed by someone who never read Reg 521.10.202. Black nylon cable
              ties hold three T&E circuits along a ceiling void above the stairwell of a flat. Six
              months later there is a small kitchen fire, the ceiling void heats up, the plastic
              ties melt within 30 seconds, all three cables drop into the stairwell. Fire crews
              report tripping hazards and live cables fouling the only escape route. The
              post-incident report flags the cable support system as non-compliant with Reg
              521.10.202.
            </>
          }
          doInstead={
            <>
              For any new install, switch your van stock from nylon cable ties to stainless steel
              cable ties (or metal P-clips) for primary cable support. Plastic ties only for
              non-load-bearing tidying of multi-cable bundles. On retrofit jobs, where you discover
              existing plastic-tie installations, flag it on the job report — the responsible person
              is then on notice that the install is not compliant with Reg 521.10.202 and a remedial
              visit can be quoted. Reg 521.10.202 + 522.8.5 cross-link gives the regulatory basis.
            </>
          }
        />

        <RegsCallout
          source="BS 7671:2018+A4:2026 — Regulation 522.8.3 (Bend radius)"
          clause="The radius of every bend in a wiring system shall be such that conductors or cables do not suffer damage and terminations are not stressed."
          meaning={
            <>
              Reg 522.8.3 is the regulation behind every minimum bend radius figure. "Conductors or
              cables do not suffer damage" — kink the cable and the insulation cracks or the
              conductor strain compromises the wire. "Terminations are not stressed" — a tight bend
              immediately at a termination loads the connection. The minimum bend radii in OSG Table
              D5 (3× or 4× for unarmoured cable by size, 6× for armoured) exist to satisfy this
              regulation. Tighter than the manufacturer minimum is a 522.8.3 fail; on a periodic
              inspection it shows up as a reduced IR or a cracked-insulation observation.
            </>
          }
          cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 52, Regulation 522.8.3 (verbatim)."
        />

        <SectionRule />

        <FAQ items={faqs} />

        <SectionRule />

        <KeyTakeaways
          points={[
            'OSG Table D1 sets cable support intervals — 250 / 400 mm for cables under 9 mm across, 300 / 400 mm for 9–15 mm. Tighter at terminations and bends.',
            'Reg 521.10.202 (since 2018) — cable supports must not collapse early in a fire, throughout the installation. Switch from plastic to metal cable ties / P-clips.',
            'Bend radius minimums (OSG Table D5) — 3× or 4× for unarmoured (by size), 6× for armoured. Tighter than that = 522.8.3 fail.',
            'Steel conduit needs expansion couplers every ~30 m on long runs — 12 µm/m/°C thermal expansion adds up.',
            'Trunking lid clips every ~600 mm (closer at ends, fittings, vertical runs); end caps every cut; cable retaining clips inside for tidy multi-cable runs.',
            'Cable basket / tray brackets every 1.2-1.5 m horizontal; cable cleats for sub-mains and any cable subject to >10 kA short-circuit fault current.',
            'Reg 522.8.5 means terminations should never carry the weight of the cable — proper support intervals prevent strain on the connections.',
            'Fire-stop every cable penetration of a fire compartment wall — intumescent putty / pillows / mastic per Approved Doc B and BS 9999.',
          ]}
        />

        <Quiz
          title="Installing wiring systems and supports — knowledge check"
          questions={quizQuestions}
        />

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => navigate('/study-centre/apprentice/level2/module4/section3/3-3')}
            className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
          >
            <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
              <ChevronLeft className="h-3 w-3" /> Previous subsection
            </div>
            <div className="mt-1 text-[14px] font-semibold text-white truncate">
              3.3 Fixing accessories to dimensions
            </div>
          </button>
          <button
            onClick={() => navigate('/study-centre/apprentice/level2/module4/section3/3-5')}
            className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
          >
            <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
              Next subsection <ChevronRight className="h-3 w-3" />
            </div>
            <div className="mt-1 text-[14px] font-semibold text-black truncate">
              3.5 Terminating wiring systems
            </div>
          </button>
        </div>
      </HubBody>
    </HubPage>
  );
}
