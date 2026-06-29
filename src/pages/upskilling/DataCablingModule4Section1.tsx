import { ArrowLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  LearningOutcomes,
  ContentEyebrow,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  SectionRule,
  AmendmentBadge,
  AppendixTable,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'datacabling-m4s1-containment-types',
    question:
      'A specifier asks you to describe the four common containment families used to carry data cabling through a commercial building. Which list correctly groups them by primary mechanical function?',
    options: [
      'Wire basket tray, ladder rack, cable tray, and conduit / trunking — each grouped by its primary mechanical function.',
      'PVC trunking is the only family permitted for data; basket and tray are for power circuits only.',
      'Steel conduit is the only family permitted for data; basket and tray are excluded by the standards.',
      'There is no functional grouping — containment family is purely an architectural / decorative choice.',
    ],
    correctIndex: 0,
    explanation:
      'The four containment families are (1) wire basket tray (welded mesh, the dominant horizontal carrier for data, easy to drop into and add to), (2) ladder rack (heavy-duty, wide cable counts, typical in comms rooms and risers), (3) solid or perforated cable tray (sheet steel, more containment, commonly perforated to dissipate heat), and (4) conduit and trunking (enclosed pathways, used where mechanical protection or aesthetic concealment is needed). BS EN 50174-2 covers the planning rules; BS 7671 §444.5.3.1 places metallic containment in the equipotential bonding network; §521.10.202 requires it to support cables against premature collapse in fire.',
  },
  {
    id: 'datacabling-m4s1-fire-collapse-cite',
    question:
      'On a 2026 commercial fit-out, the inspector points at a row of nylon cable ties under a length of plastic basket and asks "which BS 7671 regulation does this fall foul of?" — what is the correct cite?',
    options: [
      'Regulation 521.10.1 — the requirement for non-sheathed cables to be enclosed in conduit or trunking.',
      'Regulation 411.3.1 — the requirement for protective earthing of exposed-conductive-parts.',
      'Regulation 521.10.202 — support against premature collapse in fire; Note 3 fails non-metallic ties used alone.',
      'Regulation 543.2.10 — the conditions for using a separate metal enclosure as a PEN conductor.',
    ],
    correctIndex: 2,
    explanation:
      '§521.10.202 is the fire-collapse cite. Note 3 to §521.10.202 spells out that non-metallic cable ties or clips as the SOLE means of support — and non-metallic trunking as the sole support of the cables it carries — fail the regulation. Note 2 confirms cables installed in or on steel cable containment systems are deemed to meet the requirement. §521.10.1 is a different rule (non-sheathed cables in conduit / trunking). The intent (Note 5) is to prevent general collapse of wiring across access / egress routes — not to maintain circuit integrity in fire (which is Chapter 56 and BS 5266 / 5839 / 8519 territory).',
  },
  {
    id: 'datacabling-m4s1-ebn-bonding',
    question:
      'You install 60 m of welded-mesh steel basket tray carrying Cat6A horizontal cables. The basket sections are joined with manufacturer-supplied joint plates. What does BS 7671 require you to do with the basket itself?',
    options: [
      'Nothing — the basket is purely mechanical support and needs no bonding or earthing.',
      'Insulate the basket from the surrounding building steel so it stays electrically isolated.',
      'Earth just one section of the basket and leave the remaining joined sections floating.',
      'Connect it into the equipotential bonding network per Reg 444.5.3.1, with continuous joints back to the MET.',
    ],
    correctIndex: 3,
    explanation:
      '§444.5.3.1 places metallic containment, conductive screens, conductive sheaths and armouring of data transmission cables — alongside ICT equipment functional earthing conductors — into the equipotential bonding network. The basket is part of the EBN, not a free metalwork item. Joints must be electrically continuous (manufacturer joint plates with bonding straps where required), and there must be an identified bonding path back to the MET (or, if the building has a Main Functional Earthing Terminal under §545.2, to that). BS EN 50310 sets the meshed bonding architecture; §444.1.3 caps mesh size at 2 m × 2 m where critical ICT is installed.',
  },
  {
    id: 'datacabling-m4s1-fill-capacity',
    question:
      'A specifier sizes a basket tray "to fit the cables I need to install today." What is the practical problem with this sizing approach?',
    options: [
      'It leaves no spare capacity for moves / adds / changes and traps heat in continuous-PoE bundles.',
      'There is no problem — sizing to exactly today\u2019s cable count is precisely what the standards require.',
      'It saves money on containment, which is the principal objective of the containment design.',
      'It directly violates BS 7671 Section 444 in every case, regardless of the services involved.',
    ],
    correctIndex: 0,
    explanation:
      'Containment capacity is a design parameter, not a finishing detail. BS EN 50174-2 gives fill-ratio guidance (typically up to about 50 percent of basket cross-section in active use, leaving room for moves, adds and changes plus dressing-in). With Type 4 PoE++ at 90 W PSE / 71.3 W PD per IEEE 802.3bt and the BS 7671 §716.523.2.101 hard cap of 750 mA per conductor, bundle heat is not theoretical — TIA TSB-184-A and PD CLC/TR 50174-99-1:2015 set bundle de-rating guidance. A first-fit basket sized to "exactly today" is sized for failure inside year three.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which BS 7671 regulation places metallic containment, conductive screens and cable armouring into the equipotential bonding network?',
    options: [
      'Regulation 444.5.3.1 — metallic containment, screens, sheaths and armouring of data cables in the EBN.',
      'Regulation 411.3.1.1 — protective earthing of exposed-conductive-parts via the circuit protective conductor.',
      'Regulation 521.10.1 — non-sheathed cables required to be enclosed in conduit, ducting or trunking.',
      'Regulation 528.3.5 — restriction on wiring systems within a lift or hoist well shaft.',
    ],
    correctAnswer: 0,
    explanation:
      'BS 7671 §444.5.3.1 lists the parts that must be connected to the equipotential bonding network. Metallic containment, conductive screens, sheaths and armouring of data transmission cables and ICT equipment all sit inside the EBN — they are not free-floating metalwork. The bonding path must be electrically continuous and connected to the MET (and, where present, the MFET under §545).',
  },
  {
    id: 2,
    question:
      'A 2026 inspection finds a horizontal cable run supported only by plastic cable ties to a steel beam, with no clips or saddles. Which BS 7671 regulation has been breached and why?',
    options: [
      'Regulation 521.10.1 — this only governs non-sheathed cables enclosed in conduit or trunking.',
      'Regulation 444.5.3 — this governs the sizing of the bonding ring conductor in the EBN.',
      'Regulation 521.10.202 — fire-collapse support; Note 3 fails non-metallic ties used as the sole support.',
      'Regulation 544.1.2 — this governs the connection point of the main protective bonding (MPB).',
    ],
    correctAnswer: 2,
    explanation:
      '§521.10.202 is the fire-collapse rule. Plastic cable ties as the SOLE means of support fail it directly under Note 3. The fix is to use steel clips, saddles, suitably spaced steel ties, or to place the cables in or on a steel cable containment system (Note 2 confirms steel containment is deemed to meet the regulation). The intent (Note 5) is to keep wiring from collapsing across escape and access routes during a fire.',
  },
  {
    id: 3,
    question:
      'Which standard sets the planning and installation practice for cable containment inside buildings, and is directly cited from BS 7671 §444.410?',
    options: [
      'BS 7430 — the code of practice for protective earthing of electrical installations.',
      'BS 5266 — the code of practice for emergency lighting of premises.',
      'BS 7909 — the code of practice for temporary electrical systems for entertainment.',
      'BS EN 50174-2 — IT cabling installation: planning and practices inside buildings, cited from Reg 444.410.',
    ],
    correctAnswer: 3,
    explanation:
      'BS 7671 §444.410 explicitly cites BS EN 50174-1 (specification and QA), BS EN 50174-2 (planning and practice inside buildings) and BS EN 50310 (telecommunications bonding networks for buildings) as the standards to apply for control / signalling / communication circuits. §444.410 is the gateway clause that brings the EN 50174 / 50310 family directly into BS 7671 compliance.',
  },
  {
    id: 4,
    question:
      'You are choosing between welded-mesh basket tray and solid sheet-steel cable tray for a 200-cable horizontal run feeding a high-density AP cluster on PoE++ Type 4. Which factor argues most strongly for basket?',
    options: [
      'Open mesh lets continuous-PoE bundle heat dissipate by convection, and allows lateral additions without re-pulling.',
      'Basket tray is always the cheaper option to buy and install in every situation.',
      'Solid sheet-steel cable tray cannot be bonded into the equipotential bonding network.',
      'BS 7671 specifically requires welded-mesh basket for any horizontal data run.',
    ],
    correctAnswer: 0,
    explanation:
      'Heat management is the dominant argument for open-mesh basket on continuous-PoE bundles. The BS 7671 §716.523.2.101 cap (750 mA per conductor) plus §716.523.1.101 (design current must not exceed BS EN 50173-1 limits — see also PD CLC/TR 50174-99-1:2015 and TIA TSB-184-A) make bundle thermals an installation issue, not a theoretical one. Basket also wins on access for moves / adds / changes. Solid tray has its place — where mechanical protection or fire-resistive separation is needed — but the default horizontal carrier for general-purpose Cat6A is welded-mesh basket.',
  },
  {
    id: 5,
    question:
      'In Annex A444 of BS 7671, what minimum separation between Band II power cables and information technology cables is given for "no containment" or "open metallic containment A" (the default cable-routing case)?',
    options: [
      '50 mm in free air, reducible to zero with any form of metallic containment.',
      '500 mm in free air, regardless of the type of containment used for the run.',
      '200 mm in free air; reducible to 150 mm with perforated open metallic containment B; or zero physical separation with solid metallic containment C (Note 4 — no physical separation other than the containment itself).',
      'No separation is required at all if the conductors are insulated for the highest band present.',
    ],
    correctAnswer: 2,
    explanation:
      'Annex A444 Table A444.1 gives the headline separation hierarchy: 200 mm in free air with no containment, 150 mm with perforated open metallic containment (e.g. steel tray with up to 20 percent perforation, 1.0 mm wall), and 0 mm physical separation with fully enclosed steel containment (1.5 mm minimum wall). The principle: more containment = less air-gap separation needed. Module 4 Section 2 walks the table in detail.',
  },
  {
    id: 6,
    question:
      'A trunking spec has been written with 80 percent fill at first fit. What is the practical problem this creates over the cabling life?',
    options: [
      'No problem at all — 80 percent first-fit fill is the accepted industry-standard target.',
      'It directly violates BS 7671 Regulation 521.10.202, the fire-collapse support regulation.',
      'It directly violates BS EN 50173-1, the generic cabling performance standard.',
      'It leaves no room for moves / adds / changes, pinches cables past their bend radius, and traps PoE heat.',
    ],
    correctAnswer: 3,
    explanation:
      'BS EN 50174-2 sets the planning rules. Containment is sized so that moves / adds / changes can be accommodated without re-pulling, and so that PoE bundle thermals stay within the manufacturer de-rating curves. An 80 percent first-fit fill leaves nothing for growth, prevents proper dressing, and concentrates heat. The standards do not give a single hard fill number — they require the designer to consider growth, thermals and access.',
  },
  {
    id: 7,
    question:
      'What is the BS 7671 §444.6.2 minimum separation between information and communications technology cables and discharge / neon / mercury vapour (or other high-intensity discharge) lamps, including CFL?',
    options: [
      '130 mm minimum, with CFLs treated as gas-discharge sources per Reg 444.6.2.',
      '50 mm — the same minimum used for general LV power-versus-data segregation.',
      '200 mm — matching the free-air power-versus-data separation in Annex A444.',
      '500 mm — a conservative figure applied to all luminaire types near ICT cables.',
    ],
    correctAnswer: 0,
    explanation:
      '§444.6.2 fixes a 130 mm minimum separation between ICT cables and HID / CFL lamps. The clause also requires data wiring racks and electrical equipment to be separated. This is independent of the §528 / Annex A444 power-vs-data segregation: HID lamps emit electromagnetic interference at frequencies that affect ICT cabling regardless of voltage band. Where containment crosses lamp positions, plan the route around the 130 mm envelope.',
  },
  {
    id: 8,
    question:
      'You are designing the conduit / trunking system for a small commercial fit-out. Which BS 7671 cite places the metallic containment requirement formally inside the regulations?',
    options: [
      'Regulation 411.3.1.1 — protective earthing of exposed-conductive-parts via the CPC.',
      'Regulation 528.3.5 — restriction on wiring systems within a lift or hoist well.',
      'Regulations 444.5.3.1 (containment in the EBN), 521.10.202 (fire-collapse support) and 444.410 together.',
      'Regulation 543.7 — measures for circuits with high protective conductor currents.',
    ],
    correctAnswer: 2,
    explanation:
      'Containment for data cabling sits at the intersection of three BS 7671 cites: §444.5.3.1 (metallic containment in the EBN), §521.10.202 (fire-collapse support, with steel containment deemed compliant per Note 2), and §444.410 (apply BS EN 50174-1 / -2 and BS EN 50310 for the install-practice detail). All three are required. None alone is the whole answer.',
  },
  {
    id: 9,
    question:
      'A retrofit project adds 24 Cat6A cables to an existing basket tray that was sized "right" for the original 18 cables. The new bundle now sits in a tight clump. What practical risks emerge?',
    options: [
      'No risks arise — because the basket is open mesh, heat can never build up in a clumped bundle.',
      'BS 7671 Section 444 prohibits adding any further cables to an existing basket tray.',
      'The original 18-cable install automatically becomes non-compliant retrospectively.',
      'Bundle-centre heat can exceed the PoE de-rating curve and bend-radius is squeezed at supports.',
    ],
    correctAnswer: 3,
    explanation:
      'Bundle thermals are the dominant retrofit risk on continuous-PoE work. The cable manufacturer de-rating curves (and the EN / TIA bundle guidance) are written for the bundle, not the cable in free air. Splitting the bundle, using larger conductor (23 AWG), choosing LP-rated cables, or running a parallel basket are all valid mitigations. The §716.523.2.101 hard cap (750 mA per conductor) does NOT change with bundle size — but the temperature inside the bundle does, and the §716.523.1.101 design-current limit referenced to BS EN 50173-1 is the hook that brings bundle thermals into BS 7671 compliance.',
  },
  {
    id: 10,
    question:
      'An office tenant says "we don\'t want any visible containment — pull the cables direct on top of the suspended ceiling tiles." What is the correct response?',
    options: [
      'Refuse — loose cables on tiles are unsupported, fail Reg 521.10.202, and block future changes; specify basket above the tiles.',
      'Agree — the suspended ceiling tiles will adequately support the weight of the cables.',
      'Agree, but only where the cables laid on the tiles are PVC-sheathed types.',
      'Agree, provided the cables are bonded into the equipotential bonding network.',
    ],
    correctAnswer: 0,
    explanation:
      'Cables laid loose on ceiling tiles are not supported — they fail §521.10.202 directly and they cause secondary problems (tile deflection, dust ingress, bend-radius violations at every change of direction, no future MAC capacity). The standard practice is basket tray or ladder rack above the tiles, sized for capacity plus growth, with proper spacing from luminaires (§444.6.2 — 130 mm from HID / CFL) and from LV power (§444.6.1 + Annex A444). The tenant gets the clean ceiling AND a compliant install.',
  },
];

const faqs = [
  {
    question:
      'Is plastic / PVC containment ever acceptable for data cabling under BS 7671:2018+A4:2026?',
    answer: (
      <>
        Yes, in defined circumstances — plastic trunking and PVC conduit are still permitted wiring
        systems. But §521.10.202 Note 3 explicitly says non-metallic trunking as the SOLE means of
        support of the cables therein does not meet the fire-collapse rule. In practice that means
        plastic trunking either has to be supplemented with metallic clips / saddles at the spacing
        the regulation requires, or the wiring inside it has to be supported independently. Steel
        containment is the simplest route to compliance — Note 2 deems cables installed in or on
        steel cable containment systems to meet §521.10.202.
      </>
    ),
  },
  {
    question: 'How much spare capacity should I leave in basket tray at first fit?',
    answer: (
      <>
        BS EN 50174-2 does not give a single hard percentage; it requires the designer to plan for
        foreseeable moves, adds and changes plus PoE bundle thermal management. Industry practice is
        around 40-50 percent fill at first fit, leaving lateral access for adds. Continuous-PoE++
        work tightens this — bundle de-rating per TIA TSB-184-A and PD CLC/TR 50174-99-1:2015
        (referenced from BS 7671 §716.523.1.101 Note 2) means a tight bundle of Type 4 cables runs
        hotter than a loose one. Sizing generously at first fit is cheaper than re-pulling at year
        three.
      </>
    ),
  },
  {
    question:
      'Does the basket tray need to be earthed if all the cables inside it are unscreened (UTP)?',
    answer: (
      <>
        Yes. §444.5.3.1 puts metallic containment of data transmission cables into the equipotential
        bonding network, regardless of whether the cables themselves are screened. The basket is
        metalwork — exposed metalwork in the building, capable of acquiring a potential under fault
        or transient conditions, and capable of carrying induced currents that affect the cabling
        EMC environment. It bonds to the MET (or MFET under §545 where present), with electrically
        continuous joints. BS EN 50310 sets the meshed bonding architecture for ICT installations.
      </>
    ),
  },
  {
    question: 'What is the difference between basket tray and ladder rack in practice?',
    answer: (
      <>
        Basket is welded steel mesh, typically 50 mm by 100 mm grid, light, easy to cut and join,
        ideal for horizontal runs above ceilings. Ladder rack is a heavier steel structure of two
        side rails connected by rungs at fixed centres — designed for high cable counts, long
        unsupported spans, and heavy loadings. Ladder is the typical choice in comms rooms,
        equipment rooms and risers. Basket is the typical choice for in-ceiling horizontal
        distribution. Both are metallic containment in the §444.5.3.1 sense; both are deemed to meet
        §521.10.202 under Note 2 when steel.
      </>
    ),
  },
  {
    question: 'How do I plan for moves, adds and changes (MAC) when sizing containment?',
    answer: (
      <>
        Three rules of thumb, all backed by BS EN 50174-2: (1) size for at least 40-50 percent spare
        capacity at first fit; (2) prefer open-access containment (basket / ladder) over enclosed
        (trunking / conduit) where the install will see ongoing change; (3) leave clear lateral
        access on basket so adds can be dropped in without re-pulling. The whole point of structured
        cabling is a 15-20 year life across many service refreshes — the containment has to enable
        that life, not constrain it.
      </>
    ),
  },
  {
    question: 'Where does the 2 m by 2 m mesh size from §444.1.3 come into containment design?',
    answer: (
      <>
        §444.1.3 caps the mesh size of a common meshed bonding network at 2 m by 2 m in areas where
        ICT equipment susceptible to electromagnetic environmental interferences is installed. In
        containment terms, this drives how often the metallic containment runs connect cross-wise to
        other building metalwork (steel deck, structural steel, separate bonding ring conductor). On
        a tight ICT-density floor — comms rooms, dealing rooms, broadcast facilities — that 2 m grid
        is part of the bonding plan, not a free choice. BS EN 50310 sets the detailed architecture;
        §444.1.3 fixes the mesh dimension.
      </>
    ),
  },
];

const DataCablingModule4Section1 = () => {
  const navigate = useNavigate();

  useSEO(
    'Containment Systems for Data Cabling | Module 4.1 | Elec-Mate',
    'Containment systems for structured cabling — basket tray, ladder rack, cable tray, conduit and trunking; metallic vs plastic; BS 7671 §521.10.202 fire-collapse support; §444.5.3.1 metallic containment in the equipotential bonding network; BS EN 50174-2 capacity / fill ratios; access for moves, adds and changes.'
  );

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/data-cabling-module-4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 4
          </button>

          <PageHero
            eyebrow="Module 4 · Section 1"
            title="Containment Systems"
            description="Basket tray, ladder rack, cable tray, conduit and trunking — the metallic and non-metallic containment families that carry data cabling through commercial buildings. With BS 7671 §521.10.202 (support against premature fire collapse), §444.5.3.1 (metallic containment in the equipotential bonding network) and §444.410 (apply BS EN 50174-1 / -2 and BS EN 50310) all in scope from 15 April 2026."
            tone="yellow"
          />

          <TLDR
            points={[
              'Containment for data cabling means basket tray (welded mesh — the default horizontal carrier), ladder rack (heavy-duty risers / comms rooms), cable tray (solid or perforated steel), conduit and trunking (enclosed pathways). Choose by mechanical protection, capacity, access for moves / adds / changes, and bundle thermal management for continuous PoE.',
              'BS 7671 §521.10.202 requires wiring systems to be supported such that they will not be liable to premature collapse in the event of a fire. Note 2 deems steel containment to meet the rule; Note 3 explicitly fails non-metallic cable ties or trunking as the SOLE means of support.',
              'BS 7671 §444.5.3.1 places metallic containment, conductive screens, sheaths and armouring of data cables into the equipotential bonding network. The basket / tray / trunking is part of the EBN — not free-floating metalwork. Joints electrically continuous; bonding path back to the MET (or MFET under §545).',
              'BS EN 50174-2 (cited from §444.410) gives the planning rules — capacity, fill ratios, separation from power, access for moves / adds / changes. Industry practice: 40-50 percent first-fit fill, lateral access on basket, generous bend-radius space, and bundle sizes that respect manufacturer PoE de-rating curves.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify the four common containment families (wire basket, ladder rack, cable tray, conduit / trunking) and select between them by mechanical protection, capacity, access and thermal management',
              'Cite BS 7671 §521.10.202 verbatim, including Notes 2-5, and apply Note 3 (non-metallic ties / trunking as sole support fail the rule) on a real install',
              'Cite BS 7671 §444.5.3.1 verbatim and explain why metallic containment, screens, sheaths and armouring of data cables sit in the equipotential bonding network',
              'Apply §444.410 — bring BS EN 50174-1 (specification / QA), BS EN 50174-2 (planning / install) and BS EN 50310 (telecommunications bonding) into the BS 7671 compliance envelope',
              'Size a basket tray for capacity, including PoE bundle de-rating per TIA TSB-184-A and PD CLC/TR 50174-99-1:2015 (referenced from §716.523.1.101 Note 2)',
              'Plan basket / ladder routing around the §444.6.2 130 mm separation from HID / CFL lamps and against the Annex A444 Table A444.1 separation hierarchy from LV power',
              'Justify metallic containment over non-metallic on a continuous-PoE++ horizontal run, on heat dissipation, fire-collapse compliance and EBN-bonding grounds',
              'Document the containment design in the as-built record so the next contractor can plan moves, adds and changes without re-pulling',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>The four containment families</ContentEyebrow>

          <ConceptBlock
            title="Basket, ladder, tray, trunking — different jobs, different rules"
            plainEnglish="Containment for data cabling is not one product — it is four families of products, each with a different mechanical job. Wire basket tray is the dominant horizontal carrier above ceilings. Ladder rack is the heavy-duty option for risers and comms rooms. Sheet steel cable tray (solid or perforated) is the choice where mechanical protection or fire compartmentation matters. Conduit and trunking are enclosed pathways for short runs, vertical drops, or aesthetic concealment. Choosing between them is a design decision, not a stock decision."
            onSite="On any survey, walk the proposed cable routes and decide containment family by family of cables. Above-ceiling horizontal? Basket. Riser between floors? Ladder rack. Across a plant room with risk of mechanical damage? Sheet steel tray. Wall drop into a rack? Trunking. The mistake is to pick one family and force everything into it."
          >
            <p>The four families, and what each is for:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>Wire basket tray.</strong> Welded steel mesh, typically 50 mm by 100 mm
                grid, side rails of 1.5 mm steel. Light, easy to cut and join with manufacturer
                joint plates. Open mesh dissipates heat from continuous-PoE bundles by natural
                convection. Allows lateral cable additions without re-pulling — the dominant
                argument for it on horizontal runs above ceilings. Dominant horizontal carrier for
                general-purpose Cat6A.
              </li>
              <li>
                <strong>Ladder rack.</strong> Two heavy steel side rails connected by rungs at fixed
                centres (typically 225 mm or 300 mm). Designed for high cable counts, long
                unsupported spans, and heavy loadings (chassis switch lacing, large fibre bundles).
                Open-rung construction also helps thermal dissipation. The standard choice in comms
                rooms, equipment rooms and risers.
              </li>
              <li>
                <strong>Cable tray (solid or perforated steel).</strong> Sheet-steel channel,
                1.0-1.5 mm wall, with side flanges. Perforated tray (up to 20 percent perforation
                per Annex A444 Note 2) qualifies as "open metallic containment B" for separation
                purposes. Solid-walled enclosed steel tray (1.5 mm minimum, fully enclosed)
                qualifies as "solid metallic containment C" — zero physical separation needed from
                LV power.
              </li>
              <li>
                <strong>Conduit and trunking.</strong> Fully enclosed pathways. Steel conduit (BS EN
                61386 series) or steel trunking provides mechanical protection, EMC screening when
                bonded, and §521.10.202 fire-collapse compliance under Note 2. Plastic / PVC
                trunking is permitted as a wiring system but Note 3 to §521.10.202 fails it as the
                SOLE means of support — it must be supplemented or the wiring inside it
                independently supported.
              </li>
            </ul>
            <p>
              The selection question is rarely "which one?" — it is "which combination?". Most real
              buildings combine basket on horizontal floors, ladder rack in risers and equipment
              rooms, perforated tray across plant rooms, and trunking for wall drops into outlets.
              The competent design picks the right family for each segment.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · §521.10.202 (Wiring system support against premature collapse in fire — verbatim)"
            clause={
              <>
                Wiring systems shall be supported such that they will not be liable to premature
                collapse in the event of a fire.
                <br />
                NOTE 1: Wiring systems hanging across access or egress routes may hinder evacuation
                and firefighting activities.
                <br />
                NOTE 2: Cables installed in or on steel cable containment systems are deemed to meet
                the requirements of this regulation.
                <br />
                NOTE 3: This regulation precludes, for example, the use of non-metallic cable clips
                or cable ties as the sole means of support where cables are clipped direct to
                exposed surfaces or suspended under cable tray, and the use of non-metallic cable
                trunking as the sole means of support of the cables therein.
                <br />
                NOTE 4: Suitably spaced steel or copper clips, saddles or ties are examples that
                will meet the requirements of this regulation.
                <br />
                NOTE 5: The intent of this regulation is to prevent the general collapse of wiring
                systems as a result of exposure to the effects of fire such that they would hinder
                the safe evacuation, rescue or access to firefighters. It is not the intent of this
                regulation to provide support to maintain circuit integrity for life safety and/or
                firefighting applications under fire conditions. These requirements are addressed in
                Chapter 56 and in Codes of Practice BS 5266, BS 5839 and BS 8519.
              </>
            }
            meaning="The fire-collapse rule is the simplest big-impact regulation in BS 7671 for data containment. Steel containment is deemed compliant (Note 2). Plastic ties / clips alone are not (Note 3). Steel clips, saddles and ties are compliant (Note 4). The intent is keeping wiring from falling into escape routes — not maintaining circuit integrity (which is fire-rated cable, not containment). Most contraventions on data jobs come from retrofitting plastic ties to steel beams, or supporting cables only on plastic trunking lid clips."
            cite="Verified verbatim from bs7671_regulations.full_text · A4:2026 edition · BS 7671:2018+A4:2026, published 15 April 2026"
          />

          {/* Containment families diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Containment family map — five families in a row, by mechanical job
            </h4>
            <svg
              viewBox="0 0 900 540"
              className="w-full h-auto"
              role="img"
              aria-label="Diagram showing five containment families arranged in a row from left to right: wire basket tray, ladder rack, perforated cable tray, steel conduit, and steel or plastic trunking. Each family is shown with a small icon in a dedicated row, with a name label above and a use-case label below. A legend at the bottom explains that all five sit inside the equipotential bonding network per BS 7671 §444.5.3.1, and steel containment is deemed compliant with §521.10.202 Note 2."
            >
              {/* Header */}
              <text
                x="450"
                y="30"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui"
              >
                FIVE CONTAINMENT FAMILIES — CHOOSE BY JOB
              </text>

              {/* Five cells, each 160 wide centred on x = 90, 250, 450, 650, 810 — but spacing from left margin 40 with 5 cells: width 820 / 5 = 164. Use centres 122, 286, 450, 614, 778 */}

              {/* Row 1: Family name labels (above icons) — y = 70 */}
              <text
                x="122"
                y="70"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                1 · WIRE BASKET
              </text>
              <text
                x="286"
                y="70"
                textAnchor="middle"
                fill="#BBF7D0"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                2 · LADDER RACK
              </text>
              <text
                x="450"
                y="70"
                textAnchor="middle"
                fill="#A5F3FC"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                3 · CABLE TRAY
              </text>
              <text
                x="614"
                y="70"
                textAnchor="middle"
                fill="#E9D5FF"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                4 · CONDUIT
              </text>
              <text
                x="778"
                y="70"
                textAnchor="middle"
                fill="#FECACA"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                5 · TRUNKING
              </text>

              {/* Row 2: Icon cells (each cell 140 wide x 110 tall) — y = 90 to 200 */}

              {/* Basket cell */}
              <rect
                x="52"
                y="90"
                width="140"
                height="110"
                rx="8"
                fill="rgba(234,179,8,0.10)"
                stroke="#EAB308"
                strokeWidth="1.6"
              />
              {/* basket mesh icon centred at 122,145 — 80x60 mesh */}
              {[82, 102, 122, 142, 162].map((x) => (
                <line
                  key={'bv-' + x}
                  x1={x}
                  y1="115"
                  x2={x}
                  y2="175"
                  stroke="#EAB308"
                  strokeWidth="1.4"
                />
              ))}
              {[115, 135, 155, 175].map((y) => (
                <line
                  key={'bh-' + y}
                  x1="82"
                  y1={y}
                  x2="162"
                  y2={y}
                  stroke="#EAB308"
                  strokeWidth="1.4"
                />
              ))}

              {/* Ladder cell */}
              <rect
                x="216"
                y="90"
                width="140"
                height="110"
                rx="8"
                fill="rgba(34,197,94,0.10)"
                stroke="#22C55E"
                strokeWidth="1.6"
              />
              {/* ladder rails + rungs centred at 286,145 */}
              <line x1="246" y1="110" x2="246" y2="180" stroke="#22C55E" strokeWidth="2" />
              <line x1="326" y1="110" x2="326" y2="180" stroke="#22C55E" strokeWidth="2" />
              {[120, 135, 150, 165, 180].map((y) => (
                <line
                  key={'rg-' + y}
                  x1="246"
                  y1={y}
                  x2="326"
                  y2={y}
                  stroke="#22C55E"
                  strokeWidth="1.6"
                />
              ))}

              {/* Cable tray cell (perforated) */}
              <rect
                x="380"
                y="90"
                width="140"
                height="110"
                rx="8"
                fill="rgba(34,211,238,0.10)"
                stroke="#22D3EE"
                strokeWidth="1.6"
              />
              {/* tray icon centred at 450,145 — U-channel with perforations */}
              <path
                d="M 400 130 L 400 175 L 500 175 L 500 130"
                fill="none"
                stroke="#22D3EE"
                strokeWidth="2"
              />
              {[412, 428, 444, 460, 476, 492].map((x) => (
                <circle key={'p-' + x} cx={x} cy="153" r="2.5" fill="#22D3EE" />
              ))}

              {/* Conduit cell */}
              <rect
                x="544"
                y="90"
                width="140"
                height="110"
                rx="8"
                fill="rgba(168,85,247,0.10)"
                stroke="#A855F7"
                strokeWidth="1.6"
              />
              {/* circular conduit cross-section centred at 614,145 */}
              <circle cx="614" cy="145" r="28" fill="none" stroke="#A855F7" strokeWidth="2" />
              <circle
                cx="614"
                cy="145"
                r="20"
                fill="none"
                stroke="#A855F7"
                strokeWidth="1"
                strokeDasharray="3 3"
              />

              {/* Trunking cell */}
              <rect
                x="708"
                y="90"
                width="140"
                height="110"
                rx="8"
                fill="rgba(239,68,68,0.10)"
                stroke="#EF4444"
                strokeWidth="1.6"
              />
              {/* trunking rectangle with lid centred at 778,145 */}
              <rect
                x="734"
                y="120"
                width="88"
                height="50"
                rx="3"
                fill="none"
                stroke="#EF4444"
                strokeWidth="2"
              />
              <line
                x1="734"
                y1="132"
                x2="822"
                y2="132"
                stroke="#EF4444"
                strokeWidth="1.4"
                strokeDasharray="3 3"
              />

              {/* Row 3: Use-case labels (below icons) — y = 220, 236 */}
              <text
                x="122"
                y="222"
                textAnchor="middle"
                fill="#E5E7EB"
                fontSize="10"
                fontFamily="system-ui"
              >
                welded mesh
              </text>
              <text
                x="122"
                y="238"
                textAnchor="middle"
                fill="#E5E7EB"
                fontSize="10"
                fontFamily="system-ui"
              >
                horizontal above
              </text>
              <text
                x="122"
                y="254"
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="9.5"
                fontFamily="system-ui"
              >
                ceilings
              </text>

              <text
                x="286"
                y="222"
                textAnchor="middle"
                fill="#E5E7EB"
                fontSize="10"
                fontFamily="system-ui"
              >
                heavy steel
              </text>
              <text
                x="286"
                y="238"
                textAnchor="middle"
                fill="#E5E7EB"
                fontSize="10"
                fontFamily="system-ui"
              >
                comms rooms
              </text>
              <text
                x="286"
                y="254"
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="9.5"
                fontFamily="system-ui"
              >
                risers
              </text>

              <text
                x="450"
                y="222"
                textAnchor="middle"
                fill="#E5E7EB"
                fontSize="10"
                fontFamily="system-ui"
              >
                solid / perforated
              </text>
              <text
                x="450"
                y="238"
                textAnchor="middle"
                fill="#E5E7EB"
                fontSize="10"
                fontFamily="system-ui"
              >
                plant rooms
              </text>
              <text
                x="450"
                y="254"
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="9.5"
                fontFamily="system-ui"
              >
                mechanical risk
              </text>

              <text
                x="614"
                y="222"
                textAnchor="middle"
                fill="#E5E7EB"
                fontSize="10"
                fontFamily="system-ui"
              >
                steel BS EN 61386
              </text>
              <text
                x="614"
                y="238"
                textAnchor="middle"
                fill="#E5E7EB"
                fontSize="10"
                fontFamily="system-ui"
              >
                wall drops
              </text>
              <text
                x="614"
                y="254"
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="9.5"
                fontFamily="system-ui"
              >
                short runs
              </text>

              <text
                x="778"
                y="222"
                textAnchor="middle"
                fill="#E5E7EB"
                fontSize="10"
                fontFamily="system-ui"
              >
                steel or PVC
              </text>
              <text
                x="778"
                y="238"
                textAnchor="middle"
                fill="#E5E7EB"
                fontSize="10"
                fontFamily="system-ui"
              >
                enclosed pathway
              </text>
              <text
                x="778"
                y="254"
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="9.5"
                fontFamily="system-ui"
              >
                concealment
              </text>

              {/* Separator */}
              <line
                x1="40"
                y1="290"
                x2="860"
                y2="290"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
              />

              {/* Compliance summary row — three boxes */}
              <text
                x="450"
                y="316"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.04em"
              >
                BS 7671 — APPLIES TO EVERY FAMILY
              </text>

              <rect
                x="60"
                y="334"
                width="246"
                height="100"
                rx="8"
                fill="rgba(234,179,8,0.08)"
                stroke="#EAB308"
                strokeWidth="1.4"
              />
              <text
                x="183"
                y="356"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                §521.10.202
              </text>
              <text
                x="183"
                y="376"
                textAnchor="middle"
                fill="#E5E7EB"
                fontSize="10"
                fontFamily="system-ui"
              >
                Fire-collapse support
              </text>
              <text
                x="183"
                y="394"
                textAnchor="middle"
                fill="#E5E7EB"
                fontSize="10"
                fontFamily="system-ui"
              >
                Note 2: steel deemed
              </text>
              <text
                x="183"
                y="410"
                textAnchor="middle"
                fill="#E5E7EB"
                fontSize="10"
                fontFamily="system-ui"
              >
                compliant
              </text>
              <text
                x="183"
                y="426"
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="9.5"
                fontFamily="system-ui"
              >
                Note 3: plastic-only fails
              </text>

              <rect
                x="328"
                y="334"
                width="246"
                height="100"
                rx="8"
                fill="rgba(34,197,94,0.08)"
                stroke="#22C55E"
                strokeWidth="1.4"
              />
              <text
                x="451"
                y="356"
                textAnchor="middle"
                fill="#BBF7D0"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                §444.5.3.1
              </text>
              <text
                x="451"
                y="376"
                textAnchor="middle"
                fill="#E5E7EB"
                fontSize="10"
                fontFamily="system-ui"
              >
                Equipotential bonding
              </text>
              <text
                x="451"
                y="394"
                textAnchor="middle"
                fill="#E5E7EB"
                fontSize="10"
                fontFamily="system-ui"
              >
                network — metallic
              </text>
              <text
                x="451"
                y="410"
                textAnchor="middle"
                fill="#E5E7EB"
                fontSize="10"
                fontFamily="system-ui"
              >
                containment in EBN
              </text>
              <text
                x="451"
                y="426"
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="9.5"
                fontFamily="system-ui"
              >
                Bond path → MET / MFET
              </text>

              <rect
                x="596"
                y="334"
                width="246"
                height="100"
                rx="8"
                fill="rgba(34,211,238,0.08)"
                stroke="#22D3EE"
                strokeWidth="1.4"
              />
              <text
                x="719"
                y="356"
                textAnchor="middle"
                fill="#A5F3FC"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                §444.410
              </text>
              <text
                x="719"
                y="376"
                textAnchor="middle"
                fill="#E5E7EB"
                fontSize="10"
                fontFamily="system-ui"
              >
                Apply BS EN 50174-1
              </text>
              <text
                x="719"
                y="394"
                textAnchor="middle"
                fill="#E5E7EB"
                fontSize="10"
                fontFamily="system-ui"
              >
                / -2 and BS EN 50310
              </text>
              <text
                x="719"
                y="410"
                textAnchor="middle"
                fill="#E5E7EB"
                fontSize="10"
                fontFamily="system-ui"
              >
                for control / signalling
              </text>
              <text
                x="719"
                y="426"
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="9.5"
                fontFamily="system-ui"
              >
                / communication circuits
              </text>

              {/* Bottom legend panel */}
              <rect
                x="40"
                y="454"
                width="820"
                height="74"
                rx="10"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
              />
              <text
                x="60"
                y="478"
                fill="#FDE68A"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.06em"
              >
                LEGEND
              </text>
              <text x="60" y="498" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                All five metallic families connect to the equipotential bonding network · joints
                electrically continuous · path to MET
              </text>
              <text x="60" y="516" fill="#9CA3AF" fontSize="10" fontFamily="system-ui">
                BS 7671:2018+A4:2026 — applies from 15 April 2026 · BS EN 50174-2 sets capacity /
                fill / install practice
              </text>
            </svg>
          </div>

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Metallic vs non-metallic — the fire-collapse rule</ContentEyebrow>

          <ConceptBlock
            title="Why steel containment is the default for compliant data cabling"
            plainEnglish="The fire-collapse rule (§521.10.202) makes steel containment the lowest-friction route to compliance. Steel is deemed compliant under Note 2. Plastic alone fails Note 3 as the sole means of support. The simplest, cleanest design therefore uses steel basket / ladder / tray / trunking as the primary containment, with plastic accessories (lid clips, end caps, edge protectors) playing supporting roles only."
            onSite="When you walk a proposed install and see plastic basket, plastic cable ties to a steel beam, plastic-only trunking with cables resting on the lid — flag it. You are not the regulator, but you are the contractor on the hook for §521.10.202 compliance. The fix is steel containment plus steel clips / saddles at appropriate spacing."
          >
            <p>
              §521.10.202 has five Notes that together define the practical compliance envelope:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Note 1.</strong> Wiring systems hanging across access or egress routes may
                hinder evacuation. This is the WHY of the regulation — it is about keeping escape
                routes clear, not protecting the cabling itself.
              </li>
              <li>
                <strong>Note 2.</strong> Cables installed in or on steel cable containment are
                DEEMED to meet the regulation. This is the lowest-friction compliance route — steel
                containment, no further argument.
              </li>
              <li>
                <strong>Note 3.</strong> Non-metallic cable ties / clips as the SOLE means of
                support fail. Non-metallic trunking as the SOLE support of the cables therein fails.
                "Sole" is the key word — these materials can play supporting roles, but cannot be
                the only thing holding cables up.
              </li>
              <li>
                <strong>Note 4.</strong> Steel or copper clips, saddles or ties at suitable spacing
                meet the regulation. This is the alternative to steel containment — cables clipped
                direct to the structure with metallic fixings.
              </li>
              <li>
                <strong>Note 5.</strong> Intent is to prevent collapse blocking escape routes — NOT
                to maintain circuit integrity in fire. Fire-rated cable for life-safety /
                fire-fighting circuits is Chapter 56 and BS 5266 / 5839 / 8519. §521.10.202 is a
                different regulation.
              </li>
            </ul>
            <p>
              The practical reading: design with steel containment AND steel fixings. Treat plastic
              as accessories. Document the design so the inspector sees the steel content of the
              support system at first glance.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · §444.5.3.1 (Parts to be connected to the equipotential bonding network — verbatim)"
            clause={
              <>
                The following parts shall be connected to the equipotential bonding network:
                <br />
                (a) metallic containment, conductive screens, conductive sheaths or armouring of
                data transmission cables or of information and communications technology equipment;
                <br />
                (b) functional earthing conductors of antenna systems;
                <br />
                (c) conductors of the earthed pole of a DC supply for information and communications
                technology equipment;
                <br />
                (d) functional earthing conductors;
                <br />
                (e) protective conductors.
              </>
            }
            meaning="§444.5.3.1 settles the question of whether basket / ladder / tray / trunking is part of the bonding network. It is. So are cable screens, sheaths and armouring. So are antenna functional earths. So are the ICT functional earths now formally introduced under §545. The whole metallic infrastructure of an ICT installation is one bonded system — and the EBN architecture is set by BS EN 50310, with the meshed-bonding option capped at 2 m × 2 m mesh size where critical ICT is installed (§444.1.3)."
            cite="Verified verbatim from bs7671_regulations.full_text · A4:2026 edition · BS 7671:2018+A4:2026, published 15 April 2026"
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Capacity, fill ratios, and PoE thermal management</ContentEyebrow>

          <ConceptBlock
            title="Sizing for the cabling life — not just for today"
            plainEnglish="Containment capacity is a design parameter, not a finishing detail. BS EN 50174-2 (cited from §444.410) gives the planning rules. The competent design sizes containment for foreseeable moves, adds and changes (typically 40-50 percent fill at first fit), for proper bend-radius space, and for PoE bundle thermal management. Continuous-PoE++ work — Type 4 at up to 90 W PSE / 71.3 W PD per IEEE 802.3bt, capped at 750 mA per conductor by §716.523.2.101 — pushes bundle heat from theoretical to operational."
            onSite="Walk the proposed basket route with two numbers in your head: the day-one cable count, and the year-five cable count. If they are close, your basket is undersized. If your basket cannot accept a third more cables without re-cutting the supports, you have built a one-shot install. The aim is to absorb a service refresh — additional APs, additional cameras, a second PoE-lighting circuit, a BMS sensor net — without lifting the basket."
          >
            <p>The factors that drive containment sizing:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>First-fit capacity plus growth.</strong> BS EN 50174-2 expects design for
                foreseeable additions. Industry rule of thumb: 40-50 percent fill at first fit.
                Lower fill on basket allows lateral additions; higher fill on enclosed trunking
                forces re-pulling for adds.
              </li>
              <li>
                <strong>PoE bundle de-rating.</strong> Continuous-PoE current heats the bundle. TIA
                TSB-184-A (2017) and PD CLC/TR 50174-99-1:2015 (referenced from §716.523.1.101 Note
                2) provide the de-rating curves. Tight bundles run hotter; bundle interior cables
                run hotter than bundle exterior. Mitigations: limit bundle size, separate bundles,
                use 23 AWG cable, use LP (limited-power) rated cables.
              </li>
              <li>
                <strong>Bend-radius space.</strong> Cat6A solid cable wants a minimum 4× cable OD
                bend radius during install (8× at terminations). Basket / tray drops to outlets need
                enough vertical clearance to maintain that radius — typically 100-150 mm. (Module 4
                Section 2 covers bend radius in detail.)
              </li>
              <li>
                <strong>Separation from LV power.</strong> §444.6.1 + Annex A444 Table A444.1 set
                minimum separation distances by containment type — 200 mm in free air, 150 mm with
                perforated open metallic containment, 0 mm with fully enclosed solid containment.
                (Module 4 Section 2 walks the table.)
              </li>
              <li>
                <strong>Separation from HID / CFL lamps.</strong> §444.6.2 fixes a 130 mm minimum
                from data cabling to discharge lamps — including CFL. Plan basket routes to clear
                lamp positions.
              </li>
            </ul>
            <p>
              Sizing generously at first fit is cheaper than re-pulling at year three. The basket /
              ladder / tray is part of the building structure — it has a 30-year life, not a 5-year
              life. Size it for the cable life it will carry.
            </p>
          </ConceptBlock>

          <AppendixTable
            caption="Containment family selection — by job and by BS 7671 / BS EN cite"
            source="2026 — A4 alignment"
            headers={['Family', 'Primary use', 'Capacity / access', 'Key BS 7671 / BS EN cites']}
            rows={[
              [
                'Wire basket tray (welded mesh)',
                'Horizontal runs above ceilings',
                'Lateral additions easy · ~50% first-fit fill',
                '§521.10.202 Note 2 · §444.5.3.1 · BS EN 50174-2',
              ],
              [
                'Ladder rack',
                'Comms rooms · equipment rooms · risers',
                'High cable counts · long spans · top-loaded',
                '§521.10.202 Note 2 · §444.5.3.1 · BS EN 50174-2',
              ],
              [
                'Cable tray (perforated)',
                'Plant rooms · mechanical-risk routes',
                'Top-loaded · open type B for separation',
                '§521.10.202 Note 2 · Annex A444 Table A444.1 (150 mm)',
              ],
              [
                'Cable tray (solid, fully enclosed)',
                'EMC-critical or fire-compartment runs',
                'Top-loaded · type C — 0 mm separation',
                '§521.10.202 Note 2 · Annex A444 Table A444.1 (0 mm)',
              ],
              [
                'Steel conduit / trunking',
                'Wall drops · short runs · concealment',
                'Enclosed · re-pulling needed for adds',
                '§521.10.202 Note 2 · §521.10.1 · BS EN 61386',
              ],
              [
                'Plastic / PVC trunking',
                'Aesthetic concealment only',
                'Enclosed · Note 3 fails as SOLE support',
                '§521.10.202 Note 3 — must be supplemented',
              ],
            ]}
            notes="All metallic families connect to the equipotential bonding network per §444.5.3.1. Bonding path back to the MET (or MFET under §545 where present); joints electrically continuous; bonding architecture per BS EN 50310. The 2 m × 2 m mesh cap in §444.1.3 applies in areas with ICT susceptible to electromagnetic environmental interference."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Access for moves, adds and changes</ContentEyebrow>

          <ConceptBlock
            title="Containment is the access path for the next 20 years of work"
            plainEnglish="Structured cabling has a 15-20 year life across many service refreshes. Inside that life, every service generation will add cables — IP voice, PoE++ lighting, PoE cameras, IP-based BMS, AP densification. The containment is the access path for all of that future work. Get the access right at first fit and the cabling absorbs the service generations. Get it wrong and every refresh becomes a re-pull."
            onSite="The access test: can a competent contractor add a single cable from the comms room to a new outlet location, without lifting more than a few ceiling tiles? If yes, the containment is doing its job. If no — if the proposed addition requires re-pulling the entire basket fill, replacing trunking, or cutting through fire-stopping — the containment was undersized or the wrong family at first fit."
          >
            <p>The access checklist for any data containment design:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Capacity headroom.</strong> 40-50 percent first-fit fill on basket / ladder.
                Generous, but not extravagant — the headroom is the access budget.
              </li>
              <li>
                <strong>Lateral access.</strong> Open-mesh basket allows cables to be dropped in
                from above without disturbing existing dressed bundles. Closed trunking does not —
                adds force re-pulling.
              </li>
              <li>
                <strong>Spacing for clipping.</strong> Cables in basket dressed with steel ties at
                sensible centres (typically 300 mm), with enough room around bundles that ties can
                be cut and re-tied to incorporate adds. Over-tight dressing blocks adds.
              </li>
              <li>
                <strong>Bend-radius access.</strong> Drops to outlets sized so a fresh cable can be
                added at the manufacturer minimum bend radius without cutting the existing bundle.
                (Module 4 Section 2 covers bend radius in detail.)
              </li>
              <li>
                <strong>Identifiable cables.</strong> Every cable in the basket labelled at both
                ends per BS EN 50174-1 and TIA-606-D — so adds can be made without disturbing the
                wrong link. (Module 4 Section 4 covers labelling.)
              </li>
              <li>
                <strong>Documented routes.</strong> As-built drawings of every basket / ladder /
                tray route, with capacity and current fill recorded. The next contractor cannot plan
                an add without knowing what the access path looks like.
              </li>
            </ul>
            <p>
              The economic argument is the same as the structured-cabling argument generally:
              first-fit cost is slightly higher; lifecycle cost is dramatically lower. The
              containment that absorbs a service refresh without re-pulling pays for itself the
              first time the building churns.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <CommonMistake
            title="Plastic cable ties to a steel beam, holding cables up across the ceiling void"
            whatHappens={
              <>
                Retrofit job in a 1980s commercial building. Existing data cabling was added ad-hoc
                over the years using black plastic cable ties to the structural steel beams above
                the suspended ceiling. No basket. No ladder. Just plastic ties holding 80 Cat5e
                cables across the void. Inspector arrives, lifts a tile, and fails the install on
                §521.10.202 Note 3 — non-metallic ties as the sole means of support do not meet the
                fire-collapse rule.
              </>
            }
            doInstead={
              <>
                Install proper steel basket tray along the run, transfer the cables onto it, and use
                steel ties or saddles at sensible spacing to dress them. Where steel basket cannot
                be installed (existing fire compartmentation, structural constraint), use steel
                clips or saddles to the structure at appropriate centres — Note 4 to §521.10.202
                explicitly recognises steel or copper clips, saddles or ties as compliant. The cost
                of doing it once properly is materially less than the cost of repeated remedial
                visits and the eventual full re-pull.
              </>
            }
          />

          <Scenario
            title="The QS asks 'do we have to use steel basket — plastic basket is half the price?'"
            situation={
              <>
                A new-build commercial fit-out. The QS has priced plastic basket tray at half the
                cost of steel basket and is pushing back on the steel spec on cost grounds. The
                architect has not weighed in. The cabling will run continuous PoE++ for a future
                high-density AP cluster.
              </>
            }
            whatToDo={
              <>
                Hold the line on steel for three reasons, in order: (1) §521.10.202 Note 3 fails
                non-metallic basket as the sole means of support — the plastic basket would need to
                be supplemented with steel fixings, eliminating the cost saving and making the
                install messier; (2) §444.5.3.1 places metallic containment in the equipotential
                bonding network — plastic basket is not bondable, so the EMC screening role of
                metallic containment is lost and the building would need to rely entirely on cable
                screens (with the EBN-bonding question pushed onto every screen termination); (3)
                PoE bundle thermal management — open steel mesh dissipates heat by convection;
                plastic mesh has lower thermal conductivity, trapping more heat in the bundle
                interior. Document the rationale in writing so the QS owns the decision if it gets
                escalated.
              </>
            }
            whyItMatters={
              <>
                "Cheaper basket" is a false economy on a continuous-PoE install. The §521.10.202 fix
                takes back the saving. The §444.5.3.1 EBN-bonding loss creates an EMC problem that
                costs more to mitigate at the cable / termination level than the basket saving. The
                PoE thermal cost shows up at year three when the AP cluster hits Class EA-marginal
                channel test results. The competent design holds the line on steel and documents
                why.
              </>
            }
          />

          <SectionRule />

          <KeyTakeaways
            title="Worth remembering"
            points={[
              'Four containment families: wire basket (default horizontal carrier), ladder rack (heavy-duty risers / comms rooms), cable tray (solid or perforated steel for protection / EMC), conduit and trunking (enclosed pathways for drops and concealment). Choose by job — not by stock.',
              '§521.10.202 — wiring systems shall not be liable to premature collapse in fire. Note 2: steel containment deemed compliant. Note 3: non-metallic ties / trunking as sole support fail. Note 4: steel or copper clips / saddles compliant.',
              '§444.5.3.1 — metallic containment, conductive screens, sheaths and armouring of data cables sit in the equipotential bonding network. Joints electrically continuous; bonding path to the MET (or MFET under §545).',
              '§444.410 — apply BS EN 50174-1 (specification / QA), BS EN 50174-2 (planning / install) and BS EN 50310 (telecommunications bonding) for all control / signalling / communication circuits.',
              'Size for the cabling life: 40-50 percent first-fit fill, lateral access, generous bend-radius space, PoE bundle de-rating per TIA TSB-184-A and PD CLC/TR 50174-99-1:2015. The containment outlives the cables — make it carry the next refresh.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Knowledge check" questions={quizQuestions} />

          {/* Bottom navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 mt-6 border-t border-white/10">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/data-cabling-module-4')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-5 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13.5px] font-medium touch-manipulation hover:bg-white/[0.1] active:scale-[0.98]"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Module 4
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/data-cabling-module-4-section-2')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-5 rounded-full bg-elec-yellow text-black text-[13.5px] font-semibold touch-manipulation hover:bg-elec-yellow/90 active:scale-[0.98]"
            >
              Next section: Cable Separation and Bend Radius
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>
        </PageFrame>
      </div>
    </div>
  );
};

export default DataCablingModule4Section1;
