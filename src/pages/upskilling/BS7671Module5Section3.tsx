import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
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
  AmendmentBadge,
  RegBadge,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm5s3-conduit-fill',
    question:
      'You are running 4 lengths of 2.5 mm² T+E equivalent (treated as singles for fill purposes — 6 × 2.5 mm² singles total) and 2 × 1.5 mm² singles in 20 mm steel conduit, with two right-angle bends in a straight run. Per the OSG / IEE conduit cable factor approach, which decision is correct?',
    options: [
      'Use the straight-run table — bends do not reduce capacity',
      'Use the bends-and-sets table for 20 mm conduit, compare cable factor sum vs the column for two bends, and step up to 25 mm if exceeded',
      'Ignore conduit fill — only trunking has a fill rule',
      'Apply 45% by cross-sectional area to the conduit',
    ],
    correctIndex: 1,
    explanation:
      'Conduit sizing in BS 7671 / OSG is by the cable factor and conduit factor tables — the cable factors get summed and matched against the conduit factor for the relevant bends-and-length condition (Table E1 / E2 / E3 of the IEE OSG). The 45% area rule is a TRUNKING simplification, not a conduit one. Bends increase pulling tension and reduce the usable factor — once you exceed the column, step up the conduit size or split the run with a draw-in box.',
  },
  {
    id: 'm5s3-trunking-45',
    question:
      'Cable trunking in BS 7671 practice — what is the conventional space-factor rule of thumb most installers and the OSG cite?',
    options: [
      '100% area can be filled provided cables are neatly dressed',
      'No more than 45% of the trunking internal cross-sectional area should be occupied by cables (OSG cable factor approach), to allow for heat dissipation, pulling, and future additions',
      '60% area is the BS 7671 mandated maximum',
      'There is no fill rule — only conduit has one',
    ],
    correctIndex: 1,
    explanation:
      'The OSG and IET guidance use a cable factor / trunking factor approach that effectively caps fill at around 45% of the internal cross-sectional area of the trunking. The aim is threefold: (1) avoid overheating from heat trapped in tightly packed cables — Reg 523.5 / Appendix 4 grouping factors, (2) allow cables to be drawn in without damage to insulation — Reg 522.8.3, and (3) leave capacity for future additions. BS 7671 itself does not state "45%" as a numerical regulation — it is the OSG / IET trunking factor result.',
  },
  {
    id: 'm5s3-swa-gland',
    question:
      'You are terminating a 4 × 6 mm² SWA into a metal-clad isolator with a brass CW gland and the steel-wire armour as the CPC. The isolator gland-plate is painted. Which of the following is the correct sequence to ensure compliance with Reg 543 / 522.6 / 522.8?',
    options: [
      'Tighten the gland to compress the armour cone and rely on the paint as cosmetic — current can still pass',
      'Strip back the paint around the gland hole, fit a banjo earth tag (or earthing nut) under the gland, terminate the armour into the cone, and bond the banjo tag to the enclosure earth bar with a separately sized earthing conductor where required',
      'Cut the armour off, fit a normal stuffing gland, and run a separate green/yellow as the CPC — armour is decorative',
      'Sleeve the armour in green/yellow and connect it to neutral inside the isolator',
    ],
    correctIndex: 1,
    explanation:
      'Where SWA armour is being used as the CPC (Reg 543.2.2 lists steel-wire armour as a permitted protective conductor), the connection must be metal-to-metal and verified continuous. Painted gland plates are a classic failure — paint is an insulator. Strip the paint, fit a serrated washer or banjo earth tag beneath the brass gland body, then connect the tag to the local earth bar with a conductor sized per Reg 543.1.1 (adiabatic) or 543.1.4 (table). The armour-as-CPC arrangement must demonstrate adequate cross-sectional area for the prospective earth-fault current — for some smaller SWAs (e.g. 1.5 mm² 3-core), the armour CSA is too low and a separate CPC is needed.',
  },
  {
    id: 'm5s3-ik-rating',
    question:
      'A workshop install puts a metal-clad RCBO board in a corner where forklift trucks regularly pass within 300 mm. What is the right BS 7671 / external-influence call?',
    options: [
      'No special action — the consumer unit case is metal so it is fine',
      'Apply Reg 522.6 (external influence AG — mechanical impact). For AG3 / high impact, additional protection (steel cage, robust enclosure, or relocation) is required; specify enclosure with a higher IK rating per BS EN 62262 (e.g. IK08 or above)',
      'Move to a plastic enclosure — plastic is more impact-tolerant',
      'IK ratings are advisory and not part of BS 7671',
    ],
    correctIndex: 1,
    explanation:
      'Reg 522.6 covers mechanical impact as an external influence. The AG classification (AG1 low / AG2 medium / AG3 high mechanical impact) drives the required protection — Appendix 5 lists external influence codes. The mechanical-impact rating of the equipment itself is given by the IK code (BS EN 62262) — IK00 (no protection) up to IK10 (20 J impact). For AG3 environments — workshops, plant rooms with vehicle access, areas with falling tools — the enclosure IK rating must be matched to the risk, typically IK08 (5 J) or IK10 (20 J), or the equipment must be additionally protected by a barrier / cage / re-location.',
  },
  {
    id: 'm5s3-segregation',
    question:
      'A new fire alarm cable (Band I, BS 5839 enhanced FP-rated cable) runs in the same plastic trunking as a Band II 230 V lighting circuit. Which BS 7671 rule has been broken and how do you fix it?',
    options: [
      'Reg 528 — segregation between Band I and Band II circuits has been breached. Either separate the circuits into separate trunkings, use a compartmented trunking with a metallic barrier between bands, or insulate every Band I cable for the highest voltage present (impractical for FP cable).',
      'No rule broken — fire alarm cable is allowed in any trunking',
      'Reg 411 — earthing is the issue',
      'Reg 134 — workmanship is the only concern',
    ],
    correctIndex: 0,
    explanation:
      'Reg 528.1 covers proximity to other electrical services. Band I (≤ ELV) and Band II (LV up to 1000 V AC) shall be physically segregated unless either every Band I cable is insulated for the highest voltage present (Reg 528.1 (i)), or the cables are run in separate compartments of trunking with a continuous earthed metallic barrier (Reg 528.1 (ii)), or each circuit is in a separate conduit / trunking / cable. Mixing fire alarm and lighting in the same uncompartmented plastic trunking breaches all three permitted methods. BS 5839-1 and BS 7671 also require fire alarm cables to be supported by methods that resist early collapse (metallic clips/saddles — not plastic ties) — Reg 521.10.202.',
  },
  {
    id: 'm5s3-fire-stop',
    question:
      'After running a 70 mm PVC conduit between two fire compartments through a 60-minute fire-rated wall, what does Reg 527.2 require?',
    options: [
      'Nothing — the conduit is the seal',
      'Reinstate the fire compartmentation around AND inside the conduit using a tested fire-stopping system rated to the same fire resistance as the wall (e.g. intumescent collar, fire-rated mortar, foam to a tested system); record the system used on the EIC',
      'Wrap the conduit in foil tape — that is sufficient',
      'Reg 527 only applies to plant rooms',
    ],
    correctIndex: 1,
    explanation:
      "Reg 527.2 (Sealing of wiring system penetrations) requires that wherever a wiring system passes through an element of building construction (wall, floor, ceiling, roof) which is required to be fire resistant, the penetration shall be sealed to provide the same degree of fire resistance as the element. Both the gap AROUND the conduit and the bore THROUGH the conduit must be sealed using a tested system — intumescent collar / pillow / fire-rated mortar / fire-rated foam, all to a manufacturer's tested specification. The system used should be recorded on the EIC and the certificate annotated against Section 527 of the inspection schedule.",
  },
  {
    id: 'm5s3-tray-vs-basket',
    question:
      'Which is the correct selection rule between cable tray, cable ladder and cable basket?',
    options: [
      'They are interchangeable — pick whichever is cheapest',
      'Tray (perforated, light/medium loading, good for SWA and multi-core), Ladder (open rungs, heavy long-span SWA, good ventilation, structural strength), Basket (light loading, mainly data/comms/control — not designed to support heavy SWA over long spans)',
      'Basket is for SWA only',
      'Ladder is only for outdoors',
    ],
    correctIndex: 1,
    explanation:
      "Each containment type has a working envelope. Cable tray (perforated steel or GRP) — medium loading, supports lighter SWA, fixed support intervals from manufacturer load tables. Cable ladder (steel rungs, no continuous base) — heavy SWA, long spans, the rungs allow generous airflow which helps grouping factors (Appendix 4). Cable basket (welded wire mesh) — designed for low-weight cabling like data, comms, lighting and control; basket is NOT designed to carry the dead weight of a long SWA run and using it that way risks collapse and Reg 522.8.5 (mechanical strength) failure. Always size to the manufacturer's loading curve and the relevant BS EN 61537 rating.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which BS 7671 regulation set covers the cable enclosure / containment selection — including conduit, trunking and ducting — and the requirement for cables to be installed in a manner suitable for the system?',
    options: [
      'Reg 411 — protection against electric shock',
      'Reg 521.10 (cable enclosures / containment) and Reg 521.5 (cable types) — the Section 521 selection of wiring systems family',
      'Reg 134 only — workmanship',
      'Reg 651 — periodic inspection',
    ],
    correctAnswer: 1,
    explanation:
      'Section 521 deals with the SELECTION of wiring systems by type. Reg 521.5 lists permitted cable types and supports; Reg 521.10 deals with cable enclosures (conduit, trunking, ducting) — including the requirement that the system shall be such that cables are not subjected to undue mechanical stress and can be drawn in or replaced without damage. Reg 522 then deals with EXTERNAL INFLUENCES on the chosen system — including the mechanical-impact rule under Reg 522.6 and installation conditions under Reg 522.8.',
  },
  {
    id: 2,
    question:
      'For a steel conduit forming the CPC of a circuit, what specifically must be demonstrated under BS 7671?',
    options: [
      'The conduit is painted to prevent corrosion',
      'The conduit is electrically continuous (Reg 543.3.6 — every joint, coupling, bend and accessory tightened to make a low-resistance metallic connection), the impedance is verified by an R1+R2 / Zs measurement, and any flexible section is bonded by a separate CPC across the flexible portion',
      'The conduit run has no bends',
      'The conduit has the same colour as the cables inside it',
    ],
    correctAnswer: 1,
    explanation:
      'Steel conduit may be used as a CPC (Reg 543.2.2). To rely on it: every coupling, bend, box and accessory must be properly engaged (running couplers tightened, brass bushes biting into the box), the run must be confirmed by R1+R2 (or measured Zs) such that the loop impedance permits ADS within Table 41.1, and flexible final sections (e.g. flexible conduit to a motor) MUST have a separate green/yellow CPC bridging the flexible part — flexible conduit is NOT a reliable CPC. Reg 522.8.11 also requires that any conduit/trunking which can collect water has drainage provision.',
  },
  {
    id: 3,
    question:
      'A 90 mm SWA run is being supported on cable ladder across a 6 m unsupported plant-room span. Which group of regulations and standards governs the spacing of supports and the choice of clip / cleat?',
    options: [
      'Reg 411 plus the OSG',
      'Reg 522.8 (mechanical stress) and Appendix 4 / cable manufacturer support tables, with cable cleats tested to BS EN 61914 where short-circuit forces are credible',
      'Reg 134 alone',
      'There is no support spacing rule',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 522.8 (Other mechanical stresses, including 522.8.5) requires that wiring systems be supported at intervals such that they are not damaged by their own weight or by other mechanical stresses. Support intervals come from Appendix 4 / manufacturer data — large SWA on cable ladder typically requires saddle cleats every 600 mm to 1500 mm horizontally and 1200 mm to 1800 mm vertically. For circuits with high prospective short-circuit current, the magnetic forces produced during a fault can rip cables off the ladder — cable cleats tested to BS EN 61914 (Cable cleats for electrical installations) and rated to the calculated peak fault current must be used.',
  },
  {
    id: 4,
    question:
      'Reg 522.6 (mechanical impact) refers to external influence AG. Which BS standard provides the IK rating system for impact resistance of enclosures, and which IK rating corresponds to a 20 J impact?',
    options: [
      'BS 7671 itself — IK10',
      'BS EN 62262 — IK10 corresponds to 20 J',
      'BS EN 60529 — IK10 means dust-tight',
      'There is no IK rating system',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 62262 (Degrees of protection provided by enclosures for electrical equipment against external mechanical impacts — IK code) defines IK00 (unprotected) through IK10 (20 J impact resistance). It complements the IP code (BS EN 60529 — ingress protection against solid foreign objects and water). For AG3 (high mechanical impact) environments — Appendix 5 of BS 7671 — equipment must be selected with an IK rating matched to the assessed impact energy, OR additional mechanical protection must be provided (steel guard, cage, kerb, location out of the impact zone).',
  },
  {
    id: 5,
    question:
      'You are running fire alarm cabling for a Cat L1 system per BS 5839-1, in an escape route. What BS 7671 / BS 5839 combination drives your cable selection AND your support method?',
    options: [
      'Standard FP200 cable on plastic cable ties — adequate',
      'Enhanced fire-rated cable to BS 8434-2 / BS EN 50200 PH120 (e.g. FP400, FP PLUS, MICC) supported by metallic clips, saddles or trays — Reg 521.10.202 prohibits non-metallic supports for cables in escape routes where they could fall in a fire and become a tripping/entanglement hazard for occupants or fire and rescue services',
      'Twin and earth on plastic clips',
      'No specific requirement applies',
    ],
    correctAnswer: 1,
    explanation:
      'BS 5839-1 (and BS 5266-1 for emergency lighting) drive the cable performance — standard fire-rated for most areas, enhanced fire-rated where prolonged operation is critical (e.g. premises with sleeping risk, single-stair buildings, evacuation lifts). Reg 521.10.202 of BS 7671 is the support rule: cables in escape routes must be installed using methods that resist premature collapse in a fire — metallic clips, saddles, or fully metallic containment. Plastic cable ties / plastic-only saddles are explicitly NOT acceptable as the primary support method for cables in escape routes, even where the cable itself is fire rated.',
  },
  {
    id: 6,
    question:
      'On a TN-C-S installation, a metal trunking is being used to enclose Band II circuits. What earthing arrangement does Reg 543 / 521 require?',
    options: [
      'No earthing — the trunking is decorative',
      'The metal trunking shall be electrically continuous (every coupling tight, copper-link bonded across expansion joints), bonded to the MET as an exposed-conductive-part, and where used as a CPC must be sized per Reg 543.1 — typically requiring a verified R1+R2 measurement',
      'Bond it to neutral',
      'Earth one end only',
    ],
    correctAnswer: 1,
    explanation:
      'Metal trunking is an exposed-conductive-part of the wiring system (Reg 411.3.1.1 — protective earthing of exposed-conductive-parts). It shall be electrically continuous and bonded to the MET. If it is being relied on as the CPC of the circuits within (rather than running a separate green/yellow), it must comply with Reg 543.1 cross-sectional sizing AND have its impedance verified by R1+R2 / Zs measurement so ADS within Table 41.1 is demonstrable. Expansion joints must be bridged by a copper bonding link — they are mechanical joints, not electrical ones.',
  },
  {
    id: 7,
    question:
      'Which option correctly describes the BS 7671 approach to MICC (mineral-insulated copper-cable, often Pyro)?',
    options: [
      'It is obsolete and not allowed under BS 7671',
      'MICC is a recognised cable type (Reg 521.5) with excellent fire performance — a copper sheath, magnesium-oxide insulation, copper conductors. Common uses: fire alarm risers, sprinkler systems, kitchen extract motors, plant rooms. Termination requires a BS 6207-2 sealing pot and a moisture-tight gland — MgO is hygroscopic. The copper sheath can be used as the CPC (Reg 543.2.2)',
      'MICC must always have a plastic oversheath',
      'MICC needs no termination',
    ],
    correctAnswer: 1,
    explanation:
      'Mineral-insulated cable to BS EN 60702-1 / BS 6207 is a key fire-performance cable still in use today — its all-mineral construction means it survives prolonged fire exposure better than most polymer-jacketed fire-rated cables. The constraint is the termination: magnesium oxide is hygroscopic, so within hours of stripping back the sheath the insulation resistance drops. Pots, sealing compound, gland and discs to BS 6207-2 are essential, and IR testing immediately after termination is standard practice. The copper sheath is a recognised CPC (Reg 543.2.2) and is also a continuous earthed metallic barrier for Reg 528 segregation purposes.',
  },
  {
    id: 8,
    question:
      'A Band II ring final and a fire alarm Band I cable enter the same metal compartmented trunking. Which Reg 528 condition makes this acceptable?',
    options: [
      'It is never acceptable',
      'Acceptable where the trunking has separate compartments separated by a CONTINUOUS EARTHED METALLIC BARRIER (Reg 528.1 (ii)), with each band in its own compartment, and the metallic barrier is bonded to the MET as an exposed-conductive-part',
      'Acceptable provided cables are different colours',
      'Acceptable provided the fire alarm cable is rated 600/1000 V',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 528.1 lists the three permitted methods to mix Band I and Band II: (i) every Band I cable insulated for the highest voltage present, (ii) cables run in separate compartments of a trunking system with a continuous earthed metallic barrier between them, or (iii) cables run in physically separate conduits / trunkings / ducts. Compartmented metal trunking is the practical workshop solution — the barrier MUST be continuous (every joint and bend covered, no missing sections at fittings) and earthed back to the MET. Plastic compartmented trunking does NOT satisfy (ii) on its own — there is no metallic barrier.',
  },
];

const faqItems = [
  {
    question: 'Where is the actual numerical "45% trunking fill" rule written in BS 7671?',
    answer:
      'It isn\'t — and that surprises a lot of installers. BS 7671 itself does not state "45%". The cable factor / trunking factor approach in the OSG and the IET On-Site Guide / Guidance Note 1 produces the equivalent of about a 45% space factor when you compare summed cable factors against trunking factors. The reasoning sits inside BS 7671 in Reg 522.8.3 (cables drawn in without damage), Reg 523.5 (grouping derating from Appendix 4) and Reg 521.10 (cable enclosures shall not subject cables to undue mechanical stress). The 45% number is the practical engineering result of those regulations.',
  },
  {
    question:
      'Can I use the steel-wire armour as the only CPC on a 1.5 mm² 3-core SWA feeding a small lighting circuit?',
    answer:
      'Often no. Reg 543.2.2 permits steel-wire armour as a protective conductor, but Reg 543.1 requires the CPC cross-sectional area to satisfy either the adiabatic equation (543.1.3) or Table 54.7. Smaller SWAs — particularly 1.5 mm² 2- or 3-core — have armour CSAs that fall short of what the adiabatic returns for the prospective fault current and the protective device. Two correct routes: (a) calculate the armour CSA against the adiabatic and prove it passes, or (b) run a separate green/yellow CPC inside the cable or alongside it. Always verify Zs by measurement on commissioning — Reg 411.4.4.',
  },
  {
    question:
      'How often do I have to support a horizontal cable on a tray vs a clipped-direct cable?',
    answer:
      'It is not in the regulations as numbers — Reg 522.8.5 requires support such that the cable is not damaged by its own weight or by mechanical stress. The numerical support intervals come from Appendix 4 / OSG / cable manufacturer data. Typical examples: PVC singles in a horizontal run — clip every 250–400 mm depending on size; SWA on tray — saddle every 600–1500 mm horizontally; PVC twin and earth horizontal in domestic — clip every 250 mm horizontally / 400 mm vertically. For escape-route fire alarm cables, support intervals follow BS 5839-1 plus Reg 521.10.202 (metallic supports only).',
  },
  {
    question:
      'What is the difference between IP rating and IK rating, and which one matters for mechanical impact?',
    answer:
      'IP (Ingress Protection, BS EN 60529) covers solid foreign objects and water — IP54, IP65, IP68 etc. IK (BS EN 62262) covers mechanical impact energy — IK00 (none) up to IK10 (20 J). Reg 522.6 (mechanical impact, external influence AG) is satisfied by selecting equipment with the right IK rating (or providing a barrier). They are independent — an enclosure can be IP66 and IK02, or IP44 and IK10. Specify both when the environment demands both — e.g. a workshop wash-down area with forklift traffic might need IP65 + IK10.',
  },
  {
    question:
      'Why is plastic trunking not a substitute for compartmented metal trunking for Band I / Band II separation?',
    answer:
      'Reg 528.1 (ii) is explicit — the barrier between compartments must be a CONTINUOUS EARTHED METALLIC BARRIER. Plastic trunking, even with internal dividers, has no metallic barrier and no earth connection — so it does not satisfy (ii). The two practical compliant options in plastic systems are: insulate every Band I cable for the full Band II voltage (Reg 528.1 (i)) — usually impractical for fire-alarm or data cables — or run each band in a physically separate trunking (Reg 528.1 (iii)). On a real site, dedicated fire-alarm metal trunking or galvanised conduit alongside Band II PVC trunking is the cleaner answer.',
  },
  {
    question:
      'When the wiring system passes through a fire compartment wall, who is responsible for the fire-stop — the electrician or the builder?',
    answer:
      'BS 7671 Reg 527.2 puts the duty on the person installing the wiring system: the penetration shall be sealed to provide the degree of fire resistance of the element of building construction it passes through. In practice on a managed site this is split — the principal contractor provides the wall, the electrician seals around AND inside the cable / containment passing through it. Whichever party does the work, the EIC should record the make/model of the tested fire-stop system used (intumescent collar, pillow, fire mortar, foam) and reference Reg 527 in the schedule of inspections. CDM 2015 places overall responsibility on the principal contractor.',
  },
  {
    question:
      'Which cables can I run in the wall-zone at less than 50 mm depth without RCD additional protection?',
    answer:
      'Almost none, under the current BS 7671. Reg 522.6 (specifically the in-wall sub-clauses) requires that cables concealed in walls or partitions at a depth less than 50 mm shall be protected by either (a) an earthed metallic covering meeting the CPC requirements (e.g. SWA, MICC, screened cable with screen connected to earth), (b) being installed in earthed metal conduit / trunking, (c) being mechanically protected against penetration by nails, screws or the like, OR (d) being installed in safe zones AND protected by a 30 mA RCD (additional protection per Reg 415.1.1). The default modern domestic answer is (d) — safe zones + 30 mA RCBO. Steel capping alone is NOT mechanical protection per Reg 522.6 — it is considered protection against impact during construction, not against drilled fixings.',
  },
  {
    question:
      'How do I know whether to use cable cleats vs cable clips on a large SWA installation?',
    answer:
      'Cable clips (saddles) are sized for static dead-weight support — fine for normal load and modest fault current. Cable cleats to BS EN 61914 are tested to withstand the magnetic forces produced during a short-circuit fault — and those forces grow with the square of the prospective fault current. Rule of thumb: where the prospective fault current at the cable position exceeds about 10 kA peak, or where the cable is on long open spans (ladder, tray) where a fault could rip the cable off and drop it on plant or personnel, cable cleats with a tested short-circuit rating are required. Domestic and small commercial SWAs at typical PSCC values of 1–6 kA are usually fine on standard saddles — but the calculation should be on file.',
  },
  {
    question: 'Is steel capping over a buried-in-plaster cable sufficient mechanical protection?',
    answer:
      'No — and this trips installers up. Reg 522.6 distinguishes between protection during construction and protection against penetration. Steel capping (the thin pressed-steel channel pinned over the cable before plastering) protects the cable from the trowel during plastering — it is a workmanship aid. It is NOT classed as mechanical protection against nails or screws driven by a future occupant. The compliant routes for cables in walls less than 50 mm deep are still: earthed metallic covering (SWA / MICC), earthed metal conduit, true mechanical penetration protection, or safe zones plus 30 mA RCD additional protection.',
  },
];

const BS7671Module5Section3 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Containment Systems & Mechanical Protection | BS 7671:2018+A4:2026 | Module 5.3',
    description:
      'Conduit, trunking, tray, ladder, basket, SWA and MICC — sizing, support, segregation and fire-stopping under BS 7671:2018+A4:2026 (Reg 521.5, 521.10, 522.6, 522.8, 527, 528).',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../bs7671-module-5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 5
          </button>

          <PageHero
            eyebrow="Module 5 · Section 3"
            title="Containment systems and mechanical protection"
            description="How BS 7671:2018+A4:2026 governs the metalwork, plastic-work and fixings around the cable — conduit and trunking sizing, tray vs ladder vs basket, SWA and MICC termination, mechanical impact, segregation between Bands, and fire-stopping at compartment penetrations."
            actions={
              <>
                <RegBadge>521.10</RegBadge>
                <RegBadge>522.6</RegBadge>
                <RegBadge>522.8</RegBadge>
                <AmendmentBadge regs={['521.10']} />
              </>
            }
            tone="yellow"
          />

          <TLDR
            points={[
              'Section 521 selects the wiring system (cable type AND containment type); Section 522 covers external influences acting on it — mechanical impact (522.6), mechanical stress and supports (522.8), water, vibration, fauna.',
              'Conduit fill is sized by cable factor / conduit factor tables (OSG); trunking by the equivalent ~45% space-factor approach. Bends, sets and run length all reduce the usable factor.',
              'Where SWA armour or MICC sheath is used as the CPC (Reg 543.2.2), the gland-plate connection must be metal-to-metal (paint stripped, banjo / earth tag, conductor sized per 543.1) and Zs verified.',
              'Reg 522.6 mechanical impact is graded by the AG external-influence code — match the equipment IK rating (BS EN 62262, IK00–IK10) to the environment.',
              'Reg 528 segregation between Band I and Band II — fire alarm with mains lighting in the same uncompartmented trunking is non-compliant; Reg 527.2 requires every fire-compartment penetration to be sealed back to the rated fire resistance.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Select the right containment for the loading, environment and routing — conduit, trunking, tray, ladder, basket, ducting or armoured cable — and justify it against Section 521 / 522.',
              'Size a conduit run using the OSG cable factor / conduit factor tables, accounting for bends, sets and run length; size a trunking using the ~45% / cable-factor method.',
              'Specify and verify the support of cables and SWA — clip vs saddle vs cable cleat (BS EN 61914) — against Reg 522.8 and the manufacturer load tables.',
              'Apply Reg 522.6 mechanical impact protection — choose the right enclosure IK rating (BS EN 62262) for the AG external-influence code and call out additional barriers / cages where needed.',
              'Apply Reg 528 segregation between Band I and Band II circuits, including the three permitted methods, and explain why a continuous earthed metallic barrier is the practical compliant answer in mixed installations.',
              'Implement Reg 527.2 fire-stopping at compartment penetrations using a tested system rated to the fire resistance of the element, and record it on the EIC.',
              'Terminate SWA, MICC and screened cables correctly so the metallic covering can be relied upon as both the CPC and the segregation barrier — banjo washers, sealing pots, gland selection, paint removal at the gland-plate.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Conduit systems</ContentEyebrow>

          <ConceptBlock
            title="Steel and PVC conduit — what BS 7671 expects"
            plainEnglish="Conduit is a closed-section cable enclosure. Steel conduit (BS EN 61386-21) gives mechanical protection AND can act as the CPC. PVC conduit (BS EN 61386-22) is lighter and easier to bend but cannot be a CPC and can soften at temperature."
            onSite="Domestic surface-wiring routes in steel conduit are now rare; trunking and surface-clipped T+E dominate. Steel conduit still earns its place in workshops, plant rooms, escape routes (where Reg 521.10.202 needs metallic support) and where mechanical impact is high."
          >
            <p>
              Reg 521.10 covers cable enclosures (conduits, trunking, ducts). The system shall be
              such that cables can be drawn in or replaced without damage to the cable or to the
              enclosure (Reg 522.8.3). Steel conduit, when used as a CPC, must be electrically
              continuous (Reg 543.3.6) — every coupling tight, every brass bush biting into the
              enclosure metal, every flexible section bridged by a separate green/yellow CPC. Bends
              must respect the cable bend radius (Reg 522.8.6) — typically 6× cable diameter for
              thermoplastic singles, more for SWA. Where the conduit can collect water, Reg 522.8.11
              demands drainage.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Sizing conduit — cable factor vs conduit factor"
            plainEnglish="Add up the cable factors of every cable you intend to draw in. Compare against the conduit factor for the run length and number of bends. If you exceed it, step up the conduit size — or split the run with a draw-in box."
            onSite="The OSG tables give cable factors per conductor size and conduit factors per size and per bends-and-length combination. Always size the conduit BEFORE chopping the wall — retro-fitting an extra 1.5 mm² CPC into a stuffed 20 mm conduit is misery."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 521.10.1 — Cable enclosures — drawing in"
            clause="A wiring system shall be selected and erected so that no damage is caused by tension, compression or pulling forces during the drawing in or removal of cables, conductors or flexible cords. The radius of every bend in a wiring system shall be such that conductors and cables shall not suffer damage."
            meaning="Conduit and trunking exist to let cables be drawn in NOW and replaced LATER — without damage either time. Overstuffed conduit, sharp bends, missing draw-boxes — they all breach Reg 521.10.1 and Reg 522.8."
            cite="BS 7671:2018+A4:2026, Reg 521.10.1 (Section 521 — Selection of wiring systems)"
          />

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>Trunking systems</ContentEyebrow>

          <ConceptBlock
            title="Steel trunking, PVC trunking, compartmented trunking"
            plainEnglish="Trunking is a larger-section cable enclosure with a removable lid — much easier to wire than conduit. Steel trunking can be a CPC and a Reg 528 barrier; PVC trunking can be neither."
            onSite="The 45% rule is the rule of thumb that drops out of the OSG cable factor / trunking factor approach. Aim well below 45% on any run that will see future additions — the cable factor approach already assumes a worst-case packing pattern."
          >
            <p>
              Section 521 / OSG trunking sizing: for each cable size, look up the cable factor; sum
              them; compare to the trunking factor for the trunking cross-section. The result
              corresponds to roughly 45% area fill — the residual 55% area is the heat-dissipation
              and pulling-clearance buffer. Reg 523.5 (grouping) then applies independently — even a
              properly sized trunking that runs at 45% fill may need cable derating if grouped with
              other circuits over long lengths. Reg 522.8.4 also applies — trunking must be
              installed with provisions to prevent damage to cables at edges and corners (rounded
              edges, grommets, bushes).
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Compartmented trunking — the segregation tool"
            plainEnglish="A trunking with internal compartments separated by a continuous earthed metallic barrier lets you run Band I and Band II circuits in the same enclosure without breaching Reg 528.1."
            onSite="The barrier must be continuous through every fitting — bends, tees, end-caps, expansion couplers. Inspect along the full length: a missing barrier insert at a tee converts a compliant install into a Reg 528.1 failure."
          />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>Cable tray, ladder and basket</ContentEyebrow>

          <ConceptBlock
            title="Tray vs ladder vs basket — pick by load and ventilation"
            plainEnglish="Tray is light/medium. Ladder is heavy and ventilated. Basket is light, mainly comms / data / control."
            onSite="Cable tray (perforated steel or GRP) — most common general-purpose containment. Cable ladder (open rungs) — large SWA over long spans; the open base also helps Appendix 4 grouping. Cable basket (welded mesh) — designed for low-weight cabling like data, comms, control. Don't run a 6 m span of large SWA on basket — it will sag and breach Reg 522.8.5 (mechanical strength)."
          >
            <p>
              The relevant standard is BS EN 61537 (Cable tray and cable ladder systems for cable
              management). Manufacturer load tables list the maximum uniformly-distributed load
              between supports; the support intervals given in Appendix 4 / OSG are the BS 7671
              defaults. For tray and ladder used as a CPC, Reg 543.2.2 lists metal cable management
              systems as recognised protective conductors — but they must be electrically continuous
              (every joint coupled, expansion joints bridged) and sized per Reg 543.1.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[6]} />

          <SectionRule />

          <ContentEyebrow>SWA — Steel-Wire Armoured cable</ContentEyebrow>

          <ConceptBlock
            title="SWA — the workhorse cable for sub-mains, externals and plant"
            plainEnglish="A multi-core PVC- or XLPE-insulated cable with a layer of galvanised steel wires under an outer sheath. The armour is mechanical protection AND a recognised CPC."
            onSite="Termination is where SWA jobs go right or wrong. CW gland with banjo washer or earth tag, paint stripped from the gland-plate, gland body cone biting into the armour, gland-plate threaded into the enclosure (or fitted with a serrated locknut)."
          >
            <p>
              SWA is governed by BS 5467 (XLPE) or BS 6346 (PVC) for the cable, and BS 6121 for the
              gland. Reg 543.2.2 lists steel-wire armour and the metallic sheaths of cables as
              protective conductors. To rely on the armour as the CPC: the armour CSA must satisfy
              Reg 543.1 (adiabatic equation 543.1.3 or Table 54.7); the gland must be tightened to
              manufacturer torque so the cone compresses the armour into a continuous metallic path;
              paint at the gland-plate must be removed and a serrated washer or banjo earth tag
              fitted to provide a low-resistance metal-to-metal joint; R1+R2 / Zs must be measured
              on commissioning to confirm Reg 411.4.4.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Cable cleats vs cable clips — Reg 522.8 + BS EN 61914"
            plainEnglish="A clip (saddle) holds the cable against gravity. A cleat is engineered to hold the cable against the magnetic forces of a short-circuit fault."
            onSite="Where prospective fault current is high (PSCC ≳ 10 kA peak) and SWA is on tray, ladder or in vertical risers, fit cable cleats tested to BS EN 61914 with a short-circuit rating that exceeds the calculated peak Ipk. Otherwise the fault forces can rip the cable off, dropping it onto plant or personnel."
          />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>MICC — mineral-insulated copper-cable</ContentEyebrow>

          <ConceptBlock
            title="MICC (Pyro) — the original fire-performance cable"
            plainEnglish="Solid copper conductors, magnesium-oxide powder insulation, copper sheath. Withstands very high temperatures. Used where the cable must keep working in a fire."
            onSite="Common applications: fire alarm risers, sprinkler pump circuits, kitchen extract motors, smoke-control fans, plant-room emergency circuits. Two grades: light-duty (500 V) and heavy-duty (750 V). Outer LSZH or LSF oversheath when needed for environment / mechanical / aesthetic reasons."
          >
            <p>
              MICC is to BS EN 60702-1 / BS 6207 with BS 6207-2 covering the terminations. MgO is
              hygroscopic — it absorbs moisture from the air within minutes of stripping the sheath.
              Termination is therefore a single operation: strip, fit pot, fill with compound, fit
              disc, fit gland — and IR-test immediately. Reg 543.2.2 lists the metal sheath as a
              recognised protective conductor; in fire alarm and emergency circuits the sheath also
              provides the Reg 528 metallic barrier function — so MICC can run alongside LV cabling
              without compartmented trunking.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Fire-rated cables — FP200, FP400, BS 8434, BS EN 50200</ContentEyebrow>

          <ConceptBlock
            title="Standard vs enhanced fire-rated cable — picking the grade"
            plainEnglish="Fire-rated cable is what carries fire alarm and emergency lighting circuits. Standard grade survives 30+ minutes; enhanced survives 120 minutes."
            onSite="BS 5839-1 (fire alarm) and BS 5266-1 (emergency lighting) drive the cable grade. Cat L1 systems in single-stair sleeping-risk premises typically need enhanced fire-rated cable. Standard grade — FP200 family — is fine in most M and P category systems. Always read the system designer's specification, not just the BS 7671 minimum."
          >
            <p>
              The fire-performance test standards are BS EN 50200 (basic — 30 min flame), BS 8434-2
              (enhanced — 120 min flame + impact + water), and BS EN 50362 (large cable, 120 min).
              FP200 / FP200 Gold and similar polymer-jacketed mineral-insulated cables meet BS EN
              50200 PH30. FP PLUS, FP400 and similar enhanced cables meet BS 8434-2 PH120. MICC
              exceeds both. Reg 521.10.202 (BS 7671) then sets the SUPPORT rule for these cables in
              escape routes — metallic clips/saddles only, never plastic.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 527.1 — Selection of materials to minimise fire spread"
            clause="The risk of spread of fire shall be minimised by the selection of appropriate materials and erection. Wiring systems shall be selected and erected to minimise the spread of flame in accordance with Section 527."
            meaning="The cable choice (fire performance), the support method (metallic vs non-metallic), and the penetration sealing (Reg 527.2) all sit together — pick the cable, support it with metal, fire-stop the holes."
            cite="BS 7671:2018+A4:2026, Reg 527.1 (Chapter 52 — Selection and erection of wiring systems)"
          />

          <SectionRule />

          <ContentEyebrow>Mechanical impact — Reg 522.6</ContentEyebrow>

          <ConceptBlock
            title="External influence AG and the IK code"
            plainEnglish="Reg 522.6 says: assess how hard the equipment will get hit, and select equipment rated for it. AG1 / AG2 / AG3 graded by Appendix 5; IK00–IK10 the equipment rating."
            onSite="Practical map. Domestic indoors (low impact) — AG1, IK02–IK04 typical. Light industrial — AG2, IK07–IK08. Heavy industrial / forklift / mechanical workshop — AG3, IK10 or barrier protection. Outdoors at low level — IK10 or kerb / steel cage."
          >
            <p>
              IK is to BS EN 62262 — IK00 (no protection) through IK10 (20 J impact). It is
              independent of IP (BS EN 60529) which covers ingress. In the EICR / EIC the
              external-influence code from Appendix 5 should be the design input — AG1 / AG2 / AG3 —
              and the equipment selection should respond to it. Where the rating cannot be met by
              the equipment alone, additional mechanical protection (cage, kerb, barrier, relocation
              out of the impact zone) closes the gap.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Cables buried in walls less than 50 mm — Reg 522.6"
            plainEnglish="Cables hidden in walls less than 50 mm deep are at risk from drilled fixings. BS 7671 forces one of: earthed metallic covering, earthed metal containment, true mechanical protection, or safe zones plus 30 mA RCD."
            onSite="The default modern domestic answer is safe zones + 30 mA RCBO. Steel capping under plaster is for trowel protection only — not Reg 522.6 mechanical protection. For partitions containing metal parts, even safe zones + RCD is not enough on its own — the cables must be in earthed conduit / SWA / earthed metallic covering."
          />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>Cable supports — Reg 522.8</ContentEyebrow>

          <ConceptBlock
            title="Reg 522.8 — supports, fixings, mechanical stress"
            plainEnglish="Cable shall be supported so its own weight, vibration, and any other mechanical stress does not damage it or the joint."
            onSite="Domestic T+E: clip every 250 mm horizontal / 400 mm vertical (OSG). Singles in trunking: tied at intervals to prevent slumping at lid removal. SWA on tray: 600–1500 mm cleat spacing horizontal, 1200–1800 mm vertical, manufacturer load curves. SWA on a vertical riser: cleat at the top of every floor and at intermediate points to take the dead-weight + fault forces."
          >
            <p>
              Reg 522.8.5 covers self-weight; 522.8.4 covers cables passing through holes / over
              edges (rounded edges, grommets); 522.8.6 covers bend radius; 522.8.11 covers drainage
              of moisture from enclosures. The support intervals are NOT in BS 7671 as numbers —
              they are in Appendix 4 / OSG tables / cable manufacturer data, and the BS 7671
              requirement is that the support is sufficient to comply with 522.8.5.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Reg 521.10.202 — supports for escape-route fire-resistant cables"
            plainEnglish="In escape routes, fire-resistant cables must be installed using methods that resist premature collapse in a fire. Plastic ties / plastic-only clips are not acceptable."
            onSite="Use metallic clips, metallic saddles, metallic cable management (tray, ladder, conduit, trunking) — anything that will hold the cable in place when the surrounding plastic has melted. The point of the rule is that a fire-rated cable that drops onto an escape route in a fire is a tripping hazard for occupants and a hose-snag for fire and rescue services."
          />

          <InlineCheck {...inlineChecks[4]} />

          <SectionRule />

          <ContentEyebrow>Segregation — Reg 528</ContentEyebrow>

          <ConceptBlock
            title="Band I and Band II — three permitted methods"
            plainEnglish="(i) insulate every Band I cable for the highest voltage present; (ii) separate compartments with a continuous earthed metallic barrier; or (iii) separate enclosures."
            onSite="Real installations: fire alarm in dedicated metal trunking or galvanised conduit; data and comms in cable basket; LV in PVC trunking. Once you start mixing, compartmented metal trunking with a verified continuous metallic barrier is the only Reg 528.1 (ii) compliant route — and the barrier must be continuous through every fitting."
          >
            <p>
              Reg 528.1 lists the three methods; Reg 528.2 deals with proximity to non-electrical
              services (gas, water — keep clear or insulate). Reg 528.3 deals with equipotential
              bonding requirements between metallic systems. The wider intent is to prevent a Band
              II fault from injecting fault voltage into a Band I (signalling / fire / control)
              system, and to prevent a fire alarm or data system from being dropped by a localised
              LV fault.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 528.1 — Proximity of band I and band II circuits"
            clause="Band I and Band II circuits shall not be contained in the same wiring system unless one of the following methods is adopted: (i) every cable is insulated for the highest voltage present, or (ii) the cables are run in separate compartments of a wiring system having a continuous partition between the bands which provides electrical separation, or (iii) each circuit is in a separate conduit / trunking / ducting / cable management system."
            meaning="Mixing fire alarm with mains is allowed — but only via insulation up-rating, compartmented metal trunking, or separate enclosures. PVC dividers in plastic trunking do not satisfy (ii) — there is no metallic barrier."
            cite="BS 7671:2018+A4:2026, Reg 528.1 (Chapter 52)"
          />

          <SectionRule />

          <ContentEyebrow>Penetrations and fire-stopping — Reg 527.2</ContentEyebrow>

          <ConceptBlock
            title="Reg 527.2 — sealing wiring system penetrations"
            plainEnglish="Where a cable, conduit or trunking passes through a fire-rated wall or floor, the penetration must be sealed back to the same fire resistance as the element. Both around AND inside the conduit / trunking."
            onSite="Use a tested system — intumescent collars, intumescent pillows, fire-rated mortar, fire-rated foam, fire-rated putty — installed strictly per the manufacturer's tested specification. Mixing systems, or substituting general-purpose foam for fire-rated foam, breaks the test and the certificate."
          >
            <p>
              Reg 527.2.1: where a wiring system passes through an element of building construction
              having a specified fire resistance, the openings remaining shall be sealed to the same
              degree of fire resistance. Reg 527.2.2: internal sealing of the wiring system itself
              (i.e. inside the conduit or trunking) is required where its cross-sectional area
              exceeds 710 mm² to prevent the system itself becoming a chimney. The seal shall remain
              effective against products of combustion when applied (527.2.3) and shall be
              compatible with the cable and the building element (527.2.4).
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 527.2.1 — Sealing of wiring system penetrations"
            clause="Where a wiring system passes through elements of building construction such as floors, walls, roofs, ceilings, partitions or cavity barriers, the openings remaining after passage of the wiring system shall be sealed according to the degree of fire resistance prescribed for the respective element of building construction (if any) before penetration."
            meaning="Cables passing through compartment boundaries are an unsealed hole until you seal them. The fire-rated wall is only fire-rated again once the penetration is sealed back to the same rating with a tested system."
            cite="BS 7671:2018+A4:2026, Reg 527.2.1 (Chapter 52)"
          />

          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Painted gland-plate killing the SWA earth"
            whatHappens="A 4 × 6 mm² SWA terminates into a painted metal isolator. The CW gland tightens onto the painted plate; the brass body never touches bare metal. R1+R2 reads open or wildly high; Zs is unverifiable; ADS via the armour CPC is non-demonstrable."
            doInstead="Always strip paint at the gland-plate down to bare metal in a ring around the gland hole, fit a serrated washer or banjo earth tag under the gland body, and bond the banjo (where used) to the local earth bar with a conductor sized per Reg 543.1. Re-test R1+R2 and Zs after termination — never trust visual inspection alone."
          />

          <CommonMistake
            title="Plastic cable ties on fire alarm cable in an escape route"
            whatHappens="A retro-fit fire alarm uses plastic cable ties to support FP200 cable along a corridor that forms part of the protected escape route. In a fire scenario the ties melt, the cable falls, and the BS 5839 system fails its support criterion. Reg 521.10.202 explicitly forbids non-metallic supports for fire-resistant cable in escape routes."
            doInstead="Use metallic clips, metallic saddles, or metallic cable containment (tray, conduit, trunking). Even where the cable itself is fire-rated, the supports must survive the fire too. P-clips with metal-banded or steel inserts are the simplest correct retrofit; for new-build, dedicated fire-alarm metal trunking is cleaner."
          />

          <CommonMistake
            title="Mixing Band I and Band II in plastic trunking with a plastic divider"
            whatHappens="A site installer puts a fire-alarm cable and a 230 V lighting circuit in the same PVC trunking, on opposite sides of a moulded plastic divider. Reg 528.1 (ii) requires a CONTINUOUS EARTHED METALLIC barrier — a plastic divider isn't one. The compliance fails on inspection; the fire alarm certifier rejects the routing; the work is ripped out."
            doInstead="Either re-route into separate trunkings (Reg 528.1 (iii)), use compartmented metal trunking with the barrier bonded to the MET (Reg 528.1 (ii)), or insulate every Band I cable for the highest voltage present (Reg 528.1 (i) — usually impractical for fire-alarm cable). On any mixed installation, segregation is a design call that has to be made BEFORE the trunking is bought."
          />

          <SectionRule />

          <ContentEyebrow>Worked example — sub-main from intake to remote workshop</ContentEyebrow>

          <ConceptBlock
            title="Designing a 100 A SWA sub-main on cable ladder, through a fire-rated wall"
            plainEnglish="A 100 A TP+N SWA from a main switchroom to a workshop 60 m away. Cable ladder for the bulk of the run, through a 60-minute fire-rated compartment wall, into a metal-clad isolator at the workshop end."
            onSite="This pulls together every regulation in this section: containment selection, support spacing, mechanical impact, segregation from other services, fire-stop, gland termination and CPC verification. Get one wrong and the inspection fails — get them all right and it sails through."
          >
            <p>
              <strong>1. Cable selection.</strong> 4 × 35 mm² XLPE/SWA/PVC to BS 5467, sized per
              Appendix 4 for the 100 A design current with the route grouping factor and ambient.
              <strong> 2. Containment.</strong> Cable ladder for the 60 m main run (heavy SWA, long
              span, ventilated — better grouping); cable cleats per BS EN 61914 sized to the
              calculated PSCC peak. <strong>3. Support intervals.</strong> Saddle / cleat at 1200 mm
              horizontal max per manufacturer load table — Reg 522.8.5.{' '}
              <strong>4. Penetration of the fire-rated wall.</strong> Drill clean hole, sleeve
              through if needed, install a tested intumescent collar / pillow / fire-rated mortar
              system rated to 60 minutes — Reg 527.2.1. Record the system make/model on the EIC.
              <strong> 5. Mechanical impact.</strong> Where the SWA drops to the workshop isolator
              at low level near vehicle traffic, fit a galvanised steel guard or kerb to AG3 / IK10
              — Reg 522.6. <strong>6. Segregation.</strong> Other services in the route — gas, water
              — are kept clear; any shared building voids respect Reg 528.2.{' '}
              <strong>7. Termination.</strong> CW brass gland at each end, paint stripped from
              gland-plates, banjo earth tags fitted, gland body torqued to manufacturer spec.{' '}
              <strong>8. Verification.</strong> Continuity of armour CPC by R1+R2; insulation
              resistance L/L, L/N, L/E and N/E ≥ 1 MΩ at 500 V; Zs measured at the workshop isolator
              confirms ADS within Table 41.1 for the upstream OPD. <strong>9. EIC.</strong> All of
              the above recorded — the schedule of inspection ticks Section 521 (selection of wiring
              systems), 522 (external influences), 527 (fire spread), 528 (segregation), 543
              (protective conductors).
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Scenarios — applying it on the day</ContentEyebrow>

          <Scenario
            title="Light industrial unit — adding an EV charger feeder along a tray run"
            situation="Existing 50 m cable tray runs at 4 m height through a light-industrial unit. You need to add a 32 A SWA feed for a wall-box EV charger on an end wall. The tray already carries six other cables — three Band II, three data."
            whatToDo="Check Appendix 4 grouping factors — the new SWA pushes cable count to 7; Iz of the new SWA derates by the appropriate Cg from Table 4C1. Confirm the new sizing still meets In ≤ Iz. Mount the new SWA with proper tray cleats — not cable ties — to Reg 522.8 spacing per manufacturer. The Band I (data) cables remain segregated by their own twisted/screened construction, but check Reg 528.1 (i) — data cables are usually rated 30/50 V, NOT for the 230/400 V Band II voltage. If they share the same tray with no barrier, you may breach Reg 528.1. Either add a tray-divider with a continuous earthed metallic barrier (528.1 (ii)) or move data to a separate tray / basket (528.1 (iii))."
            whyItMatters="Tray cable runs accumulate over the years — every project adds a few more cables. The original Reg 528 / 522 / 521 design eventually drifts out of compliance. An EV charger addition is a fresh design event under BS 7671 — the whole route has to be re-evaluated, not just the new cable. The EIC for the new circuit should record the as-tested grouping derating and the segregation arrangement."
          />

          <Scenario
            title="Refurb of an office floor — fire alarm rewire through a 60-min compartment wall"
            situation="A Cat L1 fire alarm is being installed across two floor compartments separated by a 60-minute fire-rated wall. The cable is enhanced fire-rated FP-PLUS to BS 8434-2. The route passes through two existing service penetrations that are unsealed."
            whatToDo="Reg 521.10.202 forces metallic supports through escape routes — fit P-clips with metal bands, or run in galvanised conduit. Reg 528 (segregation from existing Band II circuits in the same ceiling void) — keep the FP-PLUS in its own tray or run separately at minimum 150 mm clear, OR insulate-rate-up the route, OR compartmented trunking. At the wall penetration, DO NOT just push the cable through — the existing hole needs reinstatement to 60 min using a tested system (intumescent collar + fire-rated mortar). Both AROUND the cable and INSIDE any conduit / trunking that exceeds 710 mm² — Reg 527.2.2. Record the make / model of fire-stop used on the EIC and on the BS 5839 commissioning certificate."
            whyItMatters="A Cat L1 system is what protects sleeping occupants in an evacuating building. The fire-rated cable, the metallic supports, and the fire-stop at the compartment wall ALL have to survive the 60 minutes the wall is rated for. Failure of any one of the three drops the whole compartmentation strategy. BS 7671 Reg 527.2 and BS 5839-1 read together — and both must be on the certificate."
          />

          <SectionRule />

          <ContentEyebrow>Designer's quick reference</ContentEyebrow>

          <ConceptBlock
            title="Containment decision tree"
            plainEnglish="(1) What's the cable type / weight? (2) What's the run environment (mechanical impact, vibration, water, fire compartments)? (3) Do you need the containment to be the CPC? (4) Is there segregation between Band I and Band II?"
            onSite="(1) Light singles / data / control — basket, light tray, PVC trunking. T+E or larger SWA — saddle clips, cable tray, ladder. (2) AG1 — most metal/plastic. AG2 — steel, sturdy plastic. AG3 — steel only, IK08+, possibly with cage/kerb. (3) CPC needed — steel conduit, steel trunking, SWA armour, MICC sheath. Plastic NOT a CPC. (4) Mixed bands — compartmented metal trunking with continuous earthed barrier, OR separate enclosures, OR insulation up-rating."
          >
            <p>
              The decision tree pulls Section 521 (system selection), Section 522 (external
              influences — 522.6 mechanical impact, 522.8 mechanical stress), Section 527 (fire
              spread + 527.2 sealing), Section 528 (segregation) and Section 543 (CPC requirements)
              into a single design pass. Every cert should be defensible against all five — and the
              inspection schedule on the EIC has tick-boxes that map directly to each.
            </p>
          </ConceptBlock>

          <FAQ items={faqItems} />

          <KeyTakeaways
            points={[
              'Section 521 selects the wiring system; Section 522 governs external influences (522.6 mechanical impact, 522.8 mechanical stress and supports); Section 527 covers fire spread and penetrations; Section 528 covers segregation between Bands.',
              'Conduit fill via cable factor / conduit factor (OSG); trunking via the equivalent ~45% space-factor approach. Bends and run length reduce the usable factor.',
              'Where SWA armour or MICC sheath is the CPC (Reg 543.2.2), termination quality is everything — paint stripped, banjo earth tag, manufacturer torque, verified R1+R2.',
              'Reg 522.6 mechanical impact is graded by the AG external-influence code; equipment IK rating to BS EN 62262 (IK00–IK10) is the response. Cables in walls less than 50 mm — earthed metallic covering, earthed metal containment, mechanical protection or safe zones + 30 mA RCD.',
              'Reg 528.1 — three methods to mix Band I and Band II: insulation up-rating, continuous earthed metallic barrier, or separate enclosures. Plastic dividers do NOT satisfy (ii).',
              'Reg 527.2 — every penetration through a fire compartment is sealed to the same fire rating using a tested system. Record the system on the EIC.',
              'Reg 521.10.202 — fire-resistant cables in escape routes must be supported by metallic methods; plastic ties / clips are not acceptable.',
            ]}
          />

          <Quiz questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 5
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-5-section-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.4 Isolation, switching and emergency controls
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default BS7671Module5Section3;
