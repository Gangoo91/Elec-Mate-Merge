/**
 * Ported from the English course, combining:
 *   level2/module4/section3/Sub4.tsx
 *   level2/module3/section3/Sub2.tsx
 *
 * The Welsh Level 3 qualification covers this material, so the teaching is
 * carried into this course rather than sending a learner out to read it in
 * another one. The text is unchanged; only the page shell was removed.
 *
 * 🔴 Never describe this content as EAL-approved, EAL-mapped or endorsed.
 */

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
  VideoCard,
} from '@/components/study-centre/learning';
import { CableCrossSection } from '@/components/study-centre/diagrams';
import { videos } from '@/data/study-centre/video-library';

const checks = [
  {
    id: 'tne-clip-spacing',
    question:
      'For 2.5 mm² T&E clipped direct on a horizontal run, the typical maximum interval between clips per OSG Table 4.5 is approximately:',
    options: ['600 mm', '100 mm', '1000 mm', '250 mm'],
    correctIndex: 3,
    explanation:
      'OSG Table 4.5 (cable support intervals) gives ~250 mm horizontal for typical small-CSA T&E clipped to a wall or ceiling. Vertical the interval can extend to ~400 mm because gravity pulls less perpendicular load on the clip. Going beyond these intervals lets the cable sag, which puts mechanical stress on terminations (522.8.5) and looks scrappy.',
  },
  {
    id: 'conduit-bend-radius',
    question: 'For a cold bend on 25 mm PVC conduit, the minimum bend radius is approximately:',
    options: [
      '6× OD (so ~150 mm radius for 25 mm conduit).',
      '1× OD (so ~25 mm radius for 25 mm conduit).',
      '20× OD (so ~500 mm radius for 25 mm conduit).',
      'There is no minimum — PVC conduit can be bent to any radius cold.',
    ],
    correctIndex: 0,
    explanation:
      'Cold bend radius for PVC conduit is typically 6× the outside diameter — for 25 mm OD that is ~150 mm radius (or ~300 mm bend diameter). Tighter and the conduit kinks and the cable inside no longer pulls. Heat-bend if you need tighter, but most jobs use formed bends or pull-elbows.',
  },
  {
    id: 'fire-support-throughout',
    question:
      'BS 7671 Reg 521.10.202 (introduced via A4:2026 / Amendment 4) requires non-combustible cable supports against premature collapse in fire — applying:',
    options: [
      'Only on cables installed in escape routes such as corridors and staircases.',
      'Throughout the installation, not just on escape routes (A4:2026 expanded the previous escape-route-only requirement).',
      'Only on cables installed outdoors or in unheated plant rooms.',
      'Only on circuits supplying fire-alarm and emergency-lighting systems.',
    ],
    correctIndex: 1,
    explanation:
      'A4:2026 made this a significant change — previously the requirement applied only on escape routes. Now Reg 521.10.202 requires cables to be adequately supported against premature collapse in fire throughout the installation. In practice this means metal clips or fire-rated supports for clipped cables, not just plastic cable ties along ceiling voids. Worth re-reading the regulation in full when planning a fix-out.',
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
      'OSG Table 4.5 gives ~400 mm for vertical T&E in the 4-6 mm² range. The cable’s self-weight is the limiting factor — vertical clips carry less perpendicular load than horizontal, so intervals can be longer. Always check the OSG table for the specific CSA and orientation.',
  },
  {
    id: 2,
    question:
      'Steel conduit run on a wall, 1.5 m intervals between saddles. Standard practice for change-of-direction support is:',
    options: [
      'No additional saddle is needed at bends — the fitting itself supports the conduit.',
      'A saddle at the midpoint between every pair of boxes, regardless of bends.',
      'A saddle within ~150-200 mm of every box, fitting and change of direction.',
      'A saddle only where the conduit changes from horizontal to vertical.',
    ],
    correctAnswer: 2,
    explanation:
      'Every box, fitting and change of direction needs a saddle within ~150-200 mm to support the conduit at the discontinuity. Without it, the bend or fitting takes the full mechanical load of the unsupported run beyond — over time the threads work loose and the joint pulls apart.',
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
      '3× cable overall diameter (factory minimum).',
      '6× cable overall diameter (factory minimum).',
      '8× cable overall diameter (factory minimum).',
      '12× cable overall diameter (factory minimum).',
    ],
    correctAnswer: 1,
    explanation:
      'IET guidance (Appendix to OSG and IET On-Site Guide) gives 6× the overall cable diameter as the minimum bend radius for non-armoured cables like T&E. SWA is 8×; MICC is 12×. Tighter than the minimum and the conductor strain can damage the insulation; instant-fail on a periodic IR test six months later.',
  },
  {
    id: 6,
    question:
      'A T&E cable runs along a ceiling void in a flat above a commercial unit. Reg 521.10.202 (A4:2026) means it must be supported by:',
    options: [
      'Plastic cable ties at close intervals, since the void is not itself an escape route.',
      'Adhesive cable clips bonded to the joists with high-temperature glue.',
      'Non-combustible supports (metal clips, metal cable ties, or fire-rated systems) so cables do not prematurely collapse in fire — applies throughout the installation now, not just escape routes.',
      'No fixed support at all, provided the cable rests on top of the ceiling joists.',
    ],
    correctAnswer: 2,
    explanation:
      'A4:2026 expanded the previous escape-route-only requirement. Now Reg 521.10.202 requires cable supports to resist premature collapse in fire throughout the installation. Plastic cable ties melt within seconds in fire, dropping the cable and creating a tripping hazard for evacuating occupants AND for fire crews. Metal clips, metal cable ties or BS-rated fire-resistant systems satisfy the regulation.',
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
      'OSG Table 4.5 gives ~250 mm horizontal for small CSAs (1.0-2.5 mm² T&E). In a ceiling void where the cable might pass over joists, that is one clip per joist crossing as a baseline, plus an additional clip in the middle of any longer span. The new Reg 521.10.202 (A4:2026) requires the supports to be non-combustible — so metal P-clips or metal cable ties throughout the installation, not just on escape routes. Plastic ties are deprecated for cable support.',
  },
  {
    question: 'When do I need expansion couplers in steel conduit?',
    answer:
      'Long horizontal or vertical steel runs (>30 m) need expansion provision because steel expands roughly 12 µm/m/°C. Over 30 m and a 30°C summer-winter swing you get ~11 mm of movement; without a coupler that loads up the saddles and threaded joints. Expansion couplers (a sliding coupler with a sealing membrane) every ~30 m. Outdoor runs and runs in unheated spaces (lofts, plant rooms, garages) need them sooner.',
  },
  {
    question: 'What bend radius do I need for SWA?',
    answer:
      '8× the cable overall diameter for SWA, per BS 7671 Appendix and BS 5467 / BS 6724 cable manufacturer data. For 4-core 16 mm² SWA at ~22 mm OD that is ~176 mm radius. Tighter and the steel armour kinks, the lay of the cores distorts, and the cable can fail an IR test six months later because the insulation has been stressed at the bend. Always plan for the bend radius before pulling — use a draw box at any tight corner instead of forcing the bend.',
  },
  {
    question: 'Plastic or metal cable ties — does it actually matter?',
    answer:
      'Yes — and Reg 521.10.202 (A4:2026) made it more important. Plastic cable ties melt within seconds in a fire (typically <100°C). The cable they were supporting drops, creating a hazard for evacuating occupants AND for fire crews. Metal cable ties (stainless steel, sometimes called "industrial ties") survive fire long enough for the cable to remain in place during evacuation. Now required throughout the installation, not just on escape routes. Switch your van stock to metal where you would previously have used plastic.',
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

const checks2 = [
  {
    id: 'concealed-domestic-check',
    question:
      'You’re running a new socket circuit chased into a plastered partition wall in a domestic kitchen extension. The default wiring system is:',
    options: [
      'Singles in steel conduit, surface-clipped along the wall',
      'SWA glanded into a metal back-box at each accessory',
      'MICC (Pyro) terminated with a pot and seal at each end',
      'T&E (6242Y) in the chase, capped, with RCD protection per 522.6.202',
    ],
    correctIndex: 3,
    explanation:
      '6242Y T&E in the chase, oval PVC capping, finished with plaster. Reg 522.6.202 then requires either a prescribed zone, RCD additional protection (415.1.1), 50 mm depth, or 522.6.204 mechanical protection. T&E is fast, cheap and standard for concealed domestic.',
  },
  {
    id: 'outdoor-buried-check',
    question:
      'Feeding a detached garage 18 m down the garden, buried at 600 mm. Best wiring system:',
    options: [
      'T&E clipped to a fence and run across the lawn',
      '3-core flex on a reel for the full length',
      'SWA steel-wire-armoured with external glands',
      'Singles in PVC conduit laid loose in the trench',
    ],
    correctIndex: 2,
    explanation:
      'SWA. The steel armour gives mechanical protection against future spade strikes and (when properly glanded and bonded) acts as the CPC. T&E direct in soil is non-compliant; flex is for final connections only.',
  },
  {
    id: 'data-separation-check',
    question:
      'You’re running Cat 6a data cable in the same trunking compartment as 230 V mains. What does BS 7671 528.1 / BS EN 50174 require?',
    options: [
      'Twisting the data and mains cables together to cancel induced noise',
      'Separation by a continuous earthed metal divider, or use a separate compartment / segregated trunking',
      'Insulating the data cable to 230 V and clipping it to the mains',
      'Running the data cable at least 25 mm away inside the same compartment',
    ],
    correctIndex: 1,
    explanation:
      'BS 7671 528.1 (segregation of circuits) and BS EN 50174-2 require physical separation between Band I (extra-low voltage data) and Band II (mains). Either separate compartments, divided trunking with an earthed metal partition, or completely separate trunking.',
  },
];

const quizQuestions2 = [
  {
    id: 1,
    question: 'A "wiring system" in BS 7671 means:',
    options: [
      'The cross-sectional area of the conductor on its own',
      'The cable plus its method of support, enclosure or containment, considered together',
      'The protective device and its disconnection time for the circuit',
      'The sequence in which circuits are energised at commissioning',
    ],
    correctAnswer: 1,
    explanation:
      'Per BS 7671 Part 2 definitions, a wiring system is the cable plus the way it’s installed — clipped, in conduit, on tray, in trunking, in ducting. The selection rules in Section 521 cover both the cable AND the install method as a single decision.',
  },
  {
    id: 2,
    question: 'A non-sheathed single-core cable for fixed wiring in a commercial install must be:',
    options: [
      'Clipped direct to the wall like sheathed T&E',
      'Run loose in a cable basket above a suspended ceiling',
      'Enclosed in conduit, ducting or trunking per Reg 521.10.1',
      'Buried direct in plaster within a prescribed zone',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 521.10.1 — non-sheathed cables must be enclosed in conduit, ducting or trunking (or in trunking that meets at least IPXXD / IP4X with a tool-removable cover). Singles like 6491X are designed exactly for this — drawn into conduit, never run loose.',
  },
  {
    id: 3,
    question: 'MICC (Pyro) cable’s headline advantage over PVC alternatives is:',
    options: [
      'It is faster and cheaper to terminate than T&E',
      'It needs no CPC because the cores are double-insulated',
      'It flexes repeatedly without cracking, ideal for moving machinery',
      'Inherent fire resistance — the copper sheath and mineral insulation maintain circuit integrity in a fire',
    ],
    correctAnswer: 3,
    explanation:
      'Pyro is rated for circuit integrity in fire — used where the supply must keep working through a fire (sprinkler pumps, smoke vents, escape lighting, fire alarm sounders). Expensive, slow to terminate (gland + pot + seal), but it survives 950°C+ where polymeric cables would have failed inside three minutes.',
  },
  {
    id: 4,
    question:
      'Twin-and-earth cable buried in plaster less than 50 mm deep, NOT in a prescribed zone, NOT on a metallic enclosure — what does Reg 522.6.202 require?',
    options: [
      'Additional protection by 30 mA RCD (415.1.1) OR comply with 522.6.204 (mechanical protection)',
      'Nothing extra, provided the cable is clipped at 300 mm intervals',
      'Re-route the cable so it sits at least 100 mm below the surface',
      'Sleeve the cable in green-and-yellow PVC for identification',
    ],
    correctAnswer: 0,
    explanation:
      'Cable < 50 mm deep, no metallic protection, not in a prescribed zone — you need either a 30 mA RCD per 415.1.1 OR mechanical protection that satisfies 522.6.204 (typically earthed metal capping or conduit). Both achieve the same goal: a nail or screw doesn’t cause fatal shock.',
  },
  {
    id: 5,
    question:
      'A 32 A SWA submain feeding a garden office is glanded into a metal enclosure. The steel-wire armour:',
    options: [
      'Must be left unconnected to avoid creating a parallel earth path',
      'Acts as the CPC when glanded with a CW gland and tested for continuity (Reg 543.2)',
      'Carries the neutral current back to the consumer unit',
      'Provides the line conductor for the third phase on a TP&N submain',
    ],
    correctAnswer: 1,
    explanation:
      'Properly glanded and tested, the SWA armour is an acceptable CPC under BS 7671 543.2. R2 must be measured end-to-end and pass the limit for the CSA in Table 54.7. Always check — a poorly made gland is a high-impedance CPC and that’s a fault waiting to happen.',
  },
  {
    id: 6,
    question:
      'Flexible cord (flex) for a final connection to a fixed appliance can be a maximum length of:',
    options: ['1.0 m', '1.5 m', '3.0 m', '5.0 m'],
    correctAnswer: 2,
    explanation:
      'OSG / BS 7671 553.1.7 informal guidance: flex final connections to fixed equipment generally limited to 3.0 m max, supported and protected against mechanical damage. Longer than 3 m and you’re back into fixed-wiring territory (T&E or singles in conduit).',
  },
  {
    id: 7,
    question: 'On a hospital escape route, you would specify:',
    options: [
      'Standard 6242Y PVC T&E to keep the install cost down',
      'Bare singles clipped direct for fast heat dissipation',
      '3-core flex throughout so circuits can be moved easily',
      'Low Smoke Zero Halogen (LSZH) cable to limit toxic smoke in a fire',
    ],
    correctAnswer: 3,
    explanation:
      'LSF / LSZH (Low Smoke Zero Halogen) cables don’t emit corrosive halogen gases when burning. Critical on escape routes, public buildings, hospitals and underground stations where survivable smoke conditions matter. Standard PVC produces hydrogen chloride — toxic and corrosive.',
  },
  {
    id: 8,
    question:
      'Data cable (Cat 6a) and 230 V mains share the same trunking. The compliant arrangement is:',
    options: [
      'Separation by an earthed metal divider, OR multi-compartment trunking, OR wholly separate trunking',
      'Cable-tie the data cable to the outside of the mains trunking',
      'Run the data and mains cores twisted together to balance the load',
      'Energise the data cable from the same 230 V supply for convenience',
    ],
    correctAnswer: 0,
    explanation:
      'BS 7671 528.1 segregation rules + BS EN 50174-2 (data cabling install practice) — Band I and Band II must be physically separated. Either compartment trunking with metal dividers, separate trunking, or a guaranteed minimum spacing per the standard.',
  },
];

const faqs2 = [
  {
    question: 'Why isn’t T&E used for everything? It’s cheap and quick.',
    answer:
      'T&E is brilliant for concealed domestic — fast, neutral PVC sheath, easy to clip and chase. But it has no mechanical protection (a nail goes straight through), no fire resistance (PVC fails around 70 °C continuous, melts at 160 °C), and the white sheath looks awful surface-mounted. Once you’re outdoors, on a flat-roofed school, in a plant room, or in a fire-rated escape route, T&E is the wrong choice — you want SWA, singles in trunking, or MICC respectively.',
  },
  {
    question: 'What’s the difference between LSF and LSZH?',
    answer:
      'Low Smoke and Fume (LSF) is a marketing term — covers PVC cables modified to reduce smoke. Low Smoke Zero Halogen (LSZH or LSOH) is the proper specification — no halogen content (so no hydrogen chloride or hydrogen bromide gas in a fire). For escape routes, hospitals, schools and underground installations, the spec usually demands true LSZH, not just LSF. Always check the spec, not just the cable jacket marking.',
  },
  {
    question: 'When is MICC actually worth the install time and cost?',
    answer:
      'Where loss of supply during a fire would be catastrophic. Common applications — sprinkler pumps, fire pumps, smoke ventilation fans, fire alarm sounder circuits and emergency lighting that must operate while the building is on fire. Modern alternative is FP200 / FP400 fire-rated cable (polymer-based), which is cheaper and faster to terminate but doesn’t reach Pyro’s 950 °C circuit-integrity rating. For the highest fire-rating jobs (BS 6387 CWZ), Pyro is still spec.',
  },
  {
    question: 'Why does conduit have to be at least IPXXD / IP4X for non-sheathed cables?',
    answer:
      'Reg 521.10.1 — non-sheathed singles like 6491X have only one layer of insulation. If a finger could touch the live conductor through a gap in the trunking, you’d have basic-protection failure. IPXXD / IP4X means the test finger can’t reach the conductor — keeps the basic insulation effective even with the cover off. That’s why singles go in proper trunking with tool-removable covers, not loose in cable basket.',
  },
  {
    question: 'Can SWA be used as the CPC, or do I need to run a separate earth core?',
    answer:
      'SWA armour is an acceptable CPC under BS 7671 543.2 if (1) it’s correctly glanded with a CW or BW gland that maintains continuity, (2) it’s bonded at both ends, (3) the resistance per Table 54.7 is met, and (4) it’s tested for end-to-end continuity (R2). On bigger sub-mains it’s still common to run a separate earth core inside the cable as well, just for redundancy and easier compliance with adiabatic checks2.',
  },
  {
    question: 'What’s the fastest way to identify the right wiring system on a tender?',
    answer:
      'Three questions. (1) Where does it live — concealed in plaster (T&E), surface in a plant room (singles in trunking or SWA), buried (SWA), in a fire compartment (FP200 / Pyro), bathroom (T&E in zone or LSZH)? (2) What environment hits it — water, abrasion, sunlight, fire, EMI, mechanical impact? (3) What does the spec say — schools and hospitals nearly always demand LSZH, fire routes demand fire-rated, industrial often demands SWA throughout. Get those three answers and 90% of the wiring system selection is decided.',
  },
];

export default function Lesson304E_3_1() {
  return (
    <div className="space-y-8">

      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        The big install Sub. PVC and steel conduit, trunking, basket and ladder. Cable support
        intervals per OSG. The Reg 521.10.202 fire-support requirement (A4:2026 — applies
        throughout the install, not just escape routes). Bend radii. Expansion. The mechanical
        engineering side of the trade.
      </p>

      <TLDR
        points={[
          'Cable supports per OSG Table 4.5 — typical ~250 mm horizontal / ~400 mm vertical for small T&E. Tighter near terminations, fittings and bends.',
          'A4:2026 expanded Reg 521.10.202 — non-combustible cable supports throughout the installation, not just on escape routes. Switch from plastic ties to metal clips/ties.',
          'Bend radius = 6× cable OD for unarmoured (T&E), 8× for SWA, 12× for MICC. Tighter than that and the conductor strain damages insulation.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Install wiring systems and supports.',
          'Install PVC and steel conduit (cold and heat-formed bends, threaded joints, expansion couplers) to the bend radii and support intervals required.',
          'Install PVC and metal trunking with correct lid-clip spacing, internal/external corners, tees, end caps and fire-stopping at compartment penetrations.',
          'Install cable basket, tray and ladder with appropriate brackets, expansion provision and cable support cleats for the load and orientation.',
          'Apply OSG Table 4.5 support intervals to T&E, SWA and singles in conduit installations across horizontal, vertical and overhead runs.',
          'Apply Reg 521.10.202 (A4:2026) — non-combustible cable supports throughout the installation, not just on escape routes — using metal clips and cable ties.',
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

      <ContentEyebrow>Cable support intervals — OSG Table 4.5</ContentEyebrow>

      <ConceptBlock
        title="The OSG support interval table — your daily reference"
        plainEnglish="OSG (On-Site Guide) Table 4.5 gives the maximum interval between cable supports for clipped cables. Different intervals for horizontal vs vertical, different intervals for cable CSA. Memorise the common ones for T&E and SWA — they appear on every domestic / light commercial install."
        onSite="The interval is a MAXIMUM, not a target. Cables sag between supports; tighter intervals give a tidier install with less stress at the terminations. ~200 mm horizontal on T&E in a kitchen looks much neater than ~250 mm and is worth the extra five clips."
      >
        <p>Typical OSG Table 4.5 intervals:</p>
        <div className="space-y-2.5 sm:hidden">
          <div className="rounded-xl bg-[hsl(0_0%_11%)] border border-white/[0.06] p-3.5">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-elec-yellow/85">
              T&E (1.0-2.5 mm²)
            </div>
            <p className="text-[13px] text-white/85 mt-1">
              Horizontal ~250 mm / Vertical ~400 mm.
            </p>
          </div>
          <div className="rounded-xl bg-[hsl(0_0%_11%)] border border-white/[0.06] p-3.5">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-elec-yellow/85">
              T&E (4-6 mm²)
            </div>
            <p className="text-[13px] text-white/85 mt-1">
              Horizontal ~300 mm / Vertical ~400 mm.
            </p>
          </div>
          <div className="rounded-xl bg-[hsl(0_0%_11%)] border border-white/[0.06] p-3.5">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-elec-yellow/85">
              T&E (10-16 mm²)
            </div>
            <p className="text-[13px] text-white/85 mt-1">
              Horizontal ~350 mm / Vertical ~450 mm.
            </p>
          </div>
          <div className="rounded-xl bg-[hsl(0_0%_11%)] border border-white/[0.06] p-3.5">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-elec-yellow/85">
              SWA (multi-core, &lt;25 mm²)
            </div>
            <p className="text-[13px] text-white/85 mt-1">
              Horizontal ~600 mm / Vertical ~900 mm.
            </p>
          </div>
          <div className="rounded-xl bg-[hsl(0_0%_11%)] border border-white/[0.06] p-3.5">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-elec-yellow/85">
              SWA (multi-core, 25-185 mm²)
            </div>
            <p className="text-[13px] text-white/85 mt-1">
              Horizontal ~900 mm / Vertical ~1500 mm + cleats.
            </p>
          </div>
          <div className="rounded-xl bg-[hsl(0_0%_11%)] border border-white/[0.06] p-3.5">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-elec-yellow/85">
              PVC singles in conduit
            </div>
            <p className="text-[13px] text-white/85 mt-1">
              Conduit support ~1 m horizontal, ~1.2 m vertical; cable not separately supported
              within conduit.
            </p>
          </div>
        </div>
        <ul className="hidden sm:block space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>T&E (1.0-2.5 mm²)</strong> — Horizontal ~250 mm / Vertical ~400 mm.
          </li>
          <li>
            <strong>T&E (4-6 mm²)</strong> — Horizontal ~300 mm / Vertical ~400 mm.
          </li>
          <li>
            <strong>T&E (10-16 mm²)</strong> — Horizontal ~350 mm / Vertical ~450 mm.
          </li>
          <li>
            <strong>SWA (multi-core, &lt;25 mm²)</strong> — Horizontal ~600 mm / Vertical ~900 mm.
          </li>
          <li>
            <strong>SWA (multi-core, 25-185 mm²)</strong> — Horizontal ~900 mm / Vertical ~1500 mm
            + cleats.
          </li>
          <li>
            <strong>PVC singles in conduit</strong> — Conduit support ~1 m horizontal, ~1.2 m
            vertical.
          </li>
        </ul>
        <p>
          Add an extra clip within ~150 mm of every box, every termination, every change of
          direction. The discontinuities are where mechanical stress concentrates and where the
          cable wants to walk away from its support.
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

      <ContentEyebrow>The A4:2026 fire-support change — Reg 521.10.202</ContentEyebrow>

      <ConceptBlock
        title="Fire-resistant cable support — now applies throughout the installation"
        plainEnglish="Reg 521.10.202 used to apply only on escape routes — corridors, staircases, exit doors. A4:2026 expanded it to apply throughout the installation. The reasoning: a fire that starts in a non-escape area still threatens the safe evacuation of the building, and dropped cables hinder fire crews everywhere, not just on the marked escape route. Switch from plastic cable ties to metal clips, metal ties, or fire-rated systems for all clipped-direct cable supports."
        onSite="The practical effect is a daily van stock change. Bin the bag of nylon cable ties and replace with stainless steel cable ties or metal P-clips for any cable support task. Plastic ties are still fine for non-load-bearing bundling (tidying multi-cable runs into a neat bunch) but never as the primary support."
      >
        <p>
          The original requirement was driven by the Lakanal House fire (Camberwell, 2009) and
          Grenfell (2017), where dropped wiring impeded escape and rescue. Since the IET&rsquo;s
          amendment was published the requirement has progressively widened. A4:2026 made it
          universal because fire spreads, and the boundary of "escape route" was always artificial
          — the kitchen ceiling void connects to the bedroom ceiling void connects to the
          stairwell, and one melted plastic tie breaks the chain.
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

      <VideoCard {...videos.fireSupports} />

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 521.10.202 (Cable support against premature collapse in fire)"
        clause="(Paraphrased.) Wiring systems shall be supported in such a way that they are not liable to premature collapse in the event of a fire. This regulation applies throughout the installation."
        meaning={
          <>
            A4:2026 expanded this requirement from "escape routes only" (the previous Amendment 3
            wording) to "throughout the installation". The reasoning is that cables dropping into
            any space during a fire create hazards for escape and for rescue crews. Practical
            implication: switch from plastic cable ties to metal clips or metal ties for any
            clipped-direct cable run, not just on marked escape routes. The cost difference is
            small; the regulatory and fire-safety difference is significant. Worth noting on every
            CDM RAMS for new installs.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 52, Regulation 521.10.202 (introduced/expanded A4:2026)."
      />

      <InlineCheck {...checks[1]} />

      <SectionRule />

      <ContentEyebrow>Conduit installation — bends, intervals, joints</ContentEyebrow>

      <ConceptBlock
        title="PVC conduit — saddles every metre, cold bends 6× OD"
        plainEnglish="PVC conduit is the most common containment in domestic and light commercial install. Cold-bend up to ~6× OD; tighter needs heat. Saddle every ~1 m horizontal, ~1.2 m vertical, plus an extra saddle within 150 mm of every box and bend. Solvent-weld joints set in seconds and bond fully in minutes."
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
        plainEnglish="Steel conduit is heavier and slower to install but mechanically robust. Threaded joints made up with banding bushes (cone-shaped earth-continuity fittings). Lock-rings to retain bushes. Expansion couplers every ~30 m to absorb thermal movement. Saddle every 1.2-1.5 m horizontal."
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
            mm to top or bottom edge — Building Regs Part A). Metal P-clips every ~250 mm
            horizontal — A4:2026 Reg 521.10.202 requires non-combustible support throughout the
            installation. NO plastic ties.
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
            and fixed (from the lesson on fitting and fixing enclosures). Cable runs through the
            back-boxes in conventional ring final
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
            1.2 Nm on the cage-clamp terminal of an NDN132A). Single CPC per terminal preferred
            (Reg 526.9 update — A4:2026).
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
            The detail above covers the install-time considerations that are easy to forget:
            A4:2026 fire-support requirement throughout the ceiling void, fire-stopping at the
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
            The job was first-fixed before A4:2026 was understood on site. Black nylon cable ties
            hold three T&E circuits along a ceiling void above the stairwell of a flat. Six months
            later there is a small kitchen fire, the ceiling void heats up, the plastic ties melt
            within 30 seconds, all three cables drop into the stairwell. Fire crews report
            tripping hazards and live cables fouling the only escape route. The post-incident
            report flags the cable support system as non-compliant with Reg 521.10.202.
          </>
        }
        doInstead={
          <>
            For any new install, switch your van stock from nylon cable ties to stainless steel
            cable ties (or metal P-clips) for primary cable support. Plastic ties only for
            non-load-bearing tidying of multi-cable bundles. On retrofit jobs, where you discover
            existing plastic-tie installations, flag it on the job report — the responsible person
            is then on notice that the install is not compliant with current A4:2026 requirements
            and a remedial visit can be quoted. Reg 521.10.202 + 522.8.5 cross-link gives the
            regulatory basis.
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
            immediately at a termination loads the connection. The 6× / 8× / 12× OD figures from
            cable manufacturer data and IET guidance exist to satisfy this regulation. Tighter
            than the manufacturer minimum is a 522.8.3 fail; on a periodic inspection it shows up
            as a reduced IR or a cracked-insulation observation.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 52, Regulation 522.8.3 (verbatim)."
      />

      <SectionRule />

      <FAQ items={faqs} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'OSG Table 4.5 sets cable support intervals — typical ~250 mm horizontal / ~400 mm vertical for small T&E. Tighter at terminations and bends.',
          'A4:2026 expanded Reg 521.10.202 — non-combustible cable supports throughout the installation, not just escape routes. Switch from plastic to metal cable ties / P-clips.',
          'Bend radius minimums — 6× OD for unarmoured (T&E), 8× for SWA, 12× for MICC. Tighter than that = 522.8.3 fail.',
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

      <SectionRule />


      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        Same building, half a dozen different cable types. The environment dictates the wiring
        system — get it wrong and the install fails the spec, fails the regs, or fails on the day
        a nail goes through the wall.
      </p>

      <TLDR
        points={[
          'Wiring system = cable + install method, considered together. Section 521 of BS 7671 governs the choice.',
          'Six default systems on UK jobs: T&E concealed, singles in conduit/trunking, SWA outdoor/buried, MICC fire, flex final-connection, LSZH escape routes.',
          'Data and comms cabling has its own rules — Band I separation from mains under BS 7671 528.1 and BS EN 50174.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Identify the default wiring system for concealed domestic installs (T&E with prescribed zone / RCD per 522.6.202).',
          'Identify the default for surface commercial installs (singles in conduit or trunking per 521.10.1).',
          'Identify SWA as the standard for outdoor, buried and mechanically-exposed runs.',
          'Identify MICC and FP200 fire-rated cables and their applications.',
          'Identify flex as a final-connection system and the 3.0 m practical limit.',
          'Identify LSZH cable for escape routes, public buildings and life-critical environments.',
          'Identify segregation rules for data/comms cabling running with mains.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>What "wiring system" actually means</ContentEyebrow>

      <ConceptBlock
        title="Cable plus install method, treated as one decision"
        plainEnglish="When BS 7671 talks about a wiring system it means everything together — the cable type, the way it’s supported, the enclosure (if any), and the environment it runs through. You don’t pick a cable in isolation."
        onSite="On site that’s why you spec out a job with phrases like ‘6491X singles in 25 mm galvanised steel conduit, surface-clipped’ — that whole phrase IS the wiring system, not just the conductor."
      >
        <p>The selection has to satisfy:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Section 521</strong> — types of wiring system permitted for given conditions.
          </li>
          <li>
            <strong>Section 522</strong> — external influences (mechanical, water, chemical, fire,
            vibration, EMI).
          </li>
          <li>
            <strong>Section 523 / Appendix 4</strong> — current-carrying capacity in the chosen
            install method.
          </li>
          <li>
            <strong>Section 528</strong> — segregation rules where Band I and Band II circuits
            share enclosures.
          </li>
        </ul>
        <p>
          The six systems below cover roughly 95% of what an apprentice will ever be asked to
          install. Specials (PVC-armoured, EMI-screened, mineral-insulated for hazardous areas)
          come up on more specialist work.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>1 — T&E (PVC twin-and-earth, 6242Y)</ContentEyebrow>

      <ConceptBlock
        title="The domestic concealed default"
        plainEnglish="Two insulated cores plus a bare CPC, all wrapped in a PVC sheath. Cheap, fast to clip, neutral grey/white sheath. The cable that does the lion’s share of UK domestic installation work."
        onSite="Concealed in plaster chases, run loose under floors and through joists, clipped along loft trusses. Always with mechanical protection or RCD additional protection per 522.6.202 when concealed in a wall."
      >
        <p>
          Strengths — cheapest of the lot, fastest to install, terminates with a stripper and a
          torque driver. Weaknesses — no inherent mechanical protection, PVC sheath fails at
          moderate temperatures, ugly when surface-mounted, not for outdoor / buried use.
        </p>
        <p>Typical applications:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>Domestic ring finals and lighting circuits chased into walls or run in lofts.</li>
          <li>
            First-fix for new builds — the structural shell is wired in T&E before the plaster
            goes on.
          </li>
          <li>Concealed under floors with appropriate joist-drilling depths.</li>
        </ul>
      </ConceptBlock>

      <CableCrossSection
        type="twin-and-earth"
        caption="6242Y twin and earth — two insulated 70°C PVC cores plus a bare CPC, all wrapped in an outer PVC sheath. The ‘standard’ domestic concealed cable."
      />

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 522.6.202 (Cables in walls / partitions)"
        clause="A cable installed in a wall or partition shall comply with the requirements set out in Table 52.1: depth of cable from the surface (≤50 mm or ≥50 mm), wall construction (with or without metallic parts), prescribed zone or 30 mA RCD additional protection per 415.1.1, or compliance with Regulation 522.6.204 (additional mechanical protection). A prescribed zone is a zone within 150 mm from the top of the wall or partition or within 150 mm of an angle formed by two adjoining walls."
        meaning={
          <>
            The headline rule for chased domestic T&E: cable shallower than 50 mm in a
            non-metallic wall must EITHER sit in a prescribed zone (within 150 mm of corner /
            ceiling / accessory) AND have 30 mA RCD, OR have mechanical protection per 522.6.204
            (typically earthed metal capping). The dual condition is what protects against the
            inevitable nail or screw going in later.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 — Regulation 522.6.202 / Table 52.1."
      />

      <InlineCheck {...checks2[0]} />

      <SectionRule />

      <ContentEyebrow>2 — Singles in conduit or trunking</ContentEyebrow>

      <ConceptBlock
        title="The commercial surface-mount default"
        plainEnglish="Single-core insulated cables (6491X) drawn into steel or PVC conduit, or laid into metal trunking. The cable’s easy to swap, the containment looks tidy and gives mechanical protection."
        onSite="Plant rooms, school corridors, factories, commercial fit-outs. Steel conduit with brass bushes and lock-rings, or galvanised trunking with bonding clips. Singles get drawn in with rod-and-draw — never run loose."
      >
        <p>Why singles in containment dominates commercial:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Modifiable</strong> — pull out one circuit, draw in another. Containment stays
            put, cabling adapts to changing tenant needs.
          </li>
          <li>
            <strong>Mechanical protection</strong> — conduit and trunking shrug off knocks that
            would slice T&E.
          </li>
          <li>
            <strong>Future capacity</strong> — leaving spare conduit space lets the next install
            team add circuits without touching the building fabric.
          </li>
        </ul>
        <p>
          <strong>Constraint</strong>: non-sheathed singles MUST be in containment per Reg
          521.10.1 — never permitted to run loose.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 521.10.1"
        clause="Non-sheathed cables for fixed wiring shall be enclosed in conduit, ducting or trunking. This requirement does not apply to a protective conductor complying with Section 543. Non-sheathed cables are permitted if the cable trunking system provides at least the degree of protection IPXXD or IP4X, and if the cover can only be removed by means of a tool or a deliberate action."
        meaning={
          <>
            Singles like 6491X have one layer of insulation only. They must be enclosed — conduit,
            ducting or proper trunking — to keep that single layer effective against accidental
            contact. The IPXXD / IP4X requirement on trunking with removable covers stops a finger
            reaching the conductor when the lid’s off.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 — Regulation 521.10.1."
      />

      <SectionRule />

      <ContentEyebrow>3 — SWA (steel-wire armoured)</ContentEyebrow>

      <ConceptBlock
        title="Outdoor, buried, mechanical-risk default"
        plainEnglish="A multicore cable wrapped in spiral steel-wire armour, then an outer PVC sheath. The armour gives mechanical protection AND can act as the CPC when properly glanded."
        onSite="Sub-mains feeding garages, sheds, garden offices, EV chargers, agricultural buildings. Also used in plant rooms and on cable tray where physical protection matters."
      >
        <p>Key install practice:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Glanding</strong>: CW (with sealing washer for IP-rated entry) or BW (basic).
            The gland clamps the armour to the metal enclosure — that’s how the armour becomes the
            CPC.
          </li>
          <li>
            <strong>Burial depth</strong>: minimum 600 mm in soft ground (HSE / NJUG guidance),
            with a marker tape 150 mm above. Deeper under driveways.
          </li>
          <li>
            <strong>Bend radius</strong>: 8× the cable overall diameter — SWA doesn’t like tight
            bends, the armour springs back and stresses the gland.
          </li>
          <li>
            <strong>Termination</strong>: armour cut, dressed back over the cone of the gland,
            clamped with the locknut. Test the R2 of the armour with a low-ohms tester before
            commissioning — that’s the proof it’s working as a CPC.
          </li>
        </ul>
      </ConceptBlock>

      <CableCrossSection
        type="SWA"
        caption="Steel-wire armoured cable — multicore conductors plus a spiral steel-wire armour layer plus an outer PVC sheath. The armour does double duty as mechanical protection and CPC."
      />

      <InlineCheck {...checks2[1]} />

      <SectionRule />

      <ContentEyebrow>4 — MICC (Pyro) and FP-rated cable</ContentEyebrow>

      <ConceptBlock
        title="Fire-rated wiring — circuit integrity through a fire"
        plainEnglish="MICC (Pyro) is solid copper conductors inside a magnesium-oxide mineral insulation, all wrapped in a copper sheath. FP200/400 is a softer alternative — silicone-rubber-insulated cores in a fire-resistant polymeric sheath."
        onSite="Used wherever the supply MUST stay live during a fire — sprinkler pumps, smoke vent fans, fire-alarm sounders, emergency-lighting heads in escape routes."
      >
        <p>Comparison:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>MICC (Pyro)</strong> — rated to BS 6387 CWZ (the toughest fire test: 950°C +
            water + impact). Slow to install (every termination needs a pot, a seal, a gland — 30+
            minutes per end). Used on the highest-spec life-safety jobs and in process plants.
          </li>
          <li>
            <strong>FP200 / FP400</strong> — fast to install (terminates like normal cable, no
            pot/seal). Fire rated to BS 6387 C/W/Z but typically not at the same impact spec as
            Pyro. Standard for most modern fire-alarm install — sounders, detectors, interfaces.
          </li>
        </ul>
        <p>
          <strong>What they protect against:</strong> the cable keeps carrying current with the
          building burning around it. Inside three minutes of a flashover, regular T&E has melted
          insulation and the circuit’s open. A Pyro circuit can still feed the sprinkler pump 90
          minutes in.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>5 — Flexible cord (flex)</ContentEyebrow>

      <ConceptBlock
        title="Final connections only — never as fixed wiring"
        plainEnglish="Multi-strand flexible cores in a soft PVC or rubber sheath. Designed to flex repeatedly without cracking. NOT for fixed wiring."
        onSite="Connecting a kitchen extractor to its FCU, an under-cabinet light to its switched outlet, a fixed appliance to a 13 A switched FCU. Always supported, always protected from mechanical damage where it could be pulled."
      >
        <p>Common flex types:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>3183Y</strong> (3-core PVC flex) — standard kitchen-appliance and pendant
            connection.
          </li>
          <li>
            <strong>HO5RR-F</strong> (rubber flex) — heat-resistant, used on hot equipment like
            irons, cookers and certain industrial gear.
          </li>
          <li>
            <strong>HO7RN-F</strong> (heavy rubber) — outdoor / portable equipment, tougher
            jacket.
          </li>
        </ul>
        <p>
          <strong>Practical 3.0 m limit</strong>: per OSG and 553.1.7, flex final connections
          should generally be no longer than 3.0 m, supported, and protected from mechanical
          damage. Longer than that and you’re into fixed-wiring territory — use T&E or singles.
        </p>
      </ConceptBlock>

      <CableCrossSection
        type="flex"
        caption="3-core flexible cord — fine multi-strand cores in a soft sheath. Designed to flex repeatedly. Final connections to fixed equipment only — never as fixed wiring."
      />

      <SectionRule />

      <ContentEyebrow>6 — LSZH (Low Smoke Zero Halogen)</ContentEyebrow>

      <ConceptBlock
        title="Cable that doesn’t poison the people escaping the building"
        plainEnglish="Same conductor as standard cable, but the insulation and sheath are made from compounds that don’t release halogen gases (HCl, HBr) when they burn. Critical on any escape route or public building."
        onSite="Schools, hospitals, public buildings, underground stations, cinemas — almost always specified as LSZH throughout. The spec usually demands it; if it doesn’t and you used standard PVC, you’ll fail the spec audit even if BS 7671 is satisfied."
      >
        <p>What standard PVC does in a fire:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            Releases hydrogen chloride gas (HCl) — corrosive, blinding when mixed with eye
            moisture, lethal in confined spaces.
          </li>
          <li>
            Produces dense black smoke that drops visibility to nothing within seconds — people
            trying to escape can’t see exits.
          </li>
          <li>
            Long-term: the HCl attacks structural steel, electronic equipment and even concrete
            reinforcement long after the fire’s out.
          </li>
        </ul>
        <p>
          LSZH avoids all three. More expensive per metre but mandatory in any environment where
          lots of people might need to escape together — and increasingly the default spec on
          commercial work full stop.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>7 — Data and comms cabling (Cat 5e / 6 / 6a)</ContentEyebrow>

      <ConceptBlock
        title="Band I cable that has to live alongside Band II mains"
        plainEnglish="Cat 5e / 6 / 6a is structured cabling for ethernet, telephone and CCTV. It’s extra-low voltage (Band I), it’s noise-sensitive, and it can’t share an enclosure with mains unless properly segregated."
        onSite="Run in its own basket / trunking, or in segregated multi-compartment trunking with mains. Crosses mains at right angles where unavoidable. Terminated at patch panels, RJ45 sockets and POE injectors."
      >
        <p>The two big constraints when running data with mains:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>BS 7671 528.1 (segregation)</strong> — Band I (data, ELV) and Band II (mains)
            must not share an enclosure unless physically separated by an earthed metal partition.
          </li>
          <li>
            <strong>BS EN 50174-2 (data install practice)</strong> — gives recommended minimum
            separation distances depending on cable types and screening (typically 50 to 200 mm
            for unscreened parallel runs, 0 mm where crossing at right angles).
          </li>
        </ul>
        <p>
          If your data run has to share trunking with mains, the compliant answer is
          multi-compartment trunking with the metal divider earthed at intervals — not just
          separated clips on the same cable basket.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Section 528 (Proximity to other services) — paraphrased"
        clause="Circuits of different voltage bands shall not be contained within the same wiring system unless every cable is insulated for the highest voltage present, OR the cables of each band are separated by an earthed metallic screen, OR each band is contained in a separate compartment of the wiring system."
        meaning={
          <>
            Translation: data (Band I) and mains (Band II) need separation. Three compliant
            options — universal insulation rating to mains voltage, an earthed metal screen
            between, or wholly separate compartments. The data-cabling standard BS EN 50174-2 then
            gives the practical install distances. Paraphrased — verify exact wording in BS 7671
            528.1 / 528.2.
          </>
        }
        cite="Source: paraphrased from BS 7671:2018+A4:2026 — Section 528."
      />

      <InlineCheck {...checks2[2]} />

      <SectionRule />

      <ContentEyebrow>Where it bites you on site</ContentEyebrow>

      <CommonMistake
        title="Running T&E direct in soil to a garden shed"
        whatHappens={
          <>
            "It’s only 8 m to the shed, the cable’s armoured-looking enough, I’ll bury it 100 mm
            down and it’ll be fine." Three problems. One — T&E’s PVC sheath is not rated for
            direct burial; soil moisture and acidity attacks the sheath inside two years. Two —
            the shovel that goes in next time the gardener digs a bed cuts straight through with
            no warning (no armour, no marker tape, no protective conduit). Three — there’s no
            proper CPC for the equipment in the shed if the T&E gets damaged. First periodic codes
            it C2 minimum, possibly C1 if the cable’s exposed.
          </>
        }
        doInstead={
          <>
            SWA every time. 6 mm² 3-core SWA at 600 mm depth, marker tape 150 mm above, glanded
            into the consumer unit at the house end and into a metal enclosure at the shed end.
            Test the R2 of the armour. If you don’t want to dig that deep, alternative is T&E
            inside a buried plastic conduit — but SWA is faster, more robust and easier to
            certify.
          </>
        }
      />

      <Scenario
        title="Schools refurb spec mandates LSZH — the cable order arrived as standard PVC"
        situation={
          <>
            You’re second-fix on a primary-school classroom refurb. The spec called for LSZH
            singles throughout in galvanised trunking. The order arrived as standard 6491X PVC
            singles. The clerk-of-works hasn’t inspected yet. Your supervisor says ‘crack on,
            no-one will know’.
          </>
        }
        whatToDo={
          <>
            Don’t. Two problems. (1) The spec is part of the contract — installing standard PVC
            instead of LSZH is a defect that will cost the firm a re-pull when caught. (2) The
            whole point of LSZH on an escape route is that nobody dies of HCl inhalation in a
            fire. Wrong cable means wrong fire performance. Stop, get the LSZH delivered, swap the
            order out, log the discrepancy with the supplier. A day’s delay is cheaper than a
            re-pull and infinitely cheaper than the spec breach.
          </>
        }
        whyItMatters={
          <>
            Wiring system selection isn’t just BS 7671 — it’s also the spec, and on schools /
            hospitals / public buildings the spec is usually tighter than the regs. ‘Cable that
            meets the regs’ is not the same as ‘cable the client paid for’ — and on a refurb
            you’re obliged to deliver the latter.
          </>
        }
      />

      <SectionRule />

      <FAQ items={faqs2} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'A wiring system = cable + install method + enclosure, decided as one. Section 521 of BS 7671 is the governing chapter.',
          'T&E (6242Y) is the domestic concealed default — fast and cheap, with mechanical protection or RCD per 522.6.202 in walls.',
          'Singles in conduit / trunking is the commercial surface default — non-sheathed cable MUST be in containment per 521.10.1.',
          'SWA is the outdoor / buried / mechanical-risk default — armour gives both protection and CPC when properly glanded.',
          'MICC (Pyro) and FP-rated cables are the fire-rated specials — used where supply must survive a fire.',
          'Flex is a final-connection system only — typically 3.0 m max per OSG / 553.1.7.',
          'LSZH is mandatory wherever toxic-smoke escape conditions matter — schools, hospitals, public buildings.',
          'Data / comms (Band I) needs segregation from mains (Band II) per 528.1 + BS EN 50174-2.',
        ]}
      />

      <Quiz title="Wiring systems for environments — knowledge check" questions={quizQuestions2} />
    </div>
  );
}
