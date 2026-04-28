/**
 * Module 6 · Section 6 · Subsection 1 — Single-line schematic (SLD) production
 * Maps to C&G 2365-03 / Unit 305 / LO5 / AC 5.1, 5.2
 *   AC 5.1 — "Produce design documentation including drawings and schematics"
 *   AC 5.2 — "Apply BS EN standards and conventions to electrical drawings"
 *
 * Layered depth: 2366-03 Unit 304 / AC 5.1; 5393-03 Unit 104 / AC 5.1
 *
 * The single-line diagram is the spine of the design pack. Every other
 * document hangs off it. This Sub covers what an SLD is, what it must
 * show, BS EN 60617 conventions for SLD symbols, CAD layer discipline,
 * fault-level annotation, breaker selection annotation and version control.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

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
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Single-line schematic (SLD) production (5.1) | Level 3 Module 6.6.1 | Elec-Mate';
const DESCRIPTION =
  'The SLD is the spine of the design pack. What it must show, BS EN 60617 conventions, CAD layer discipline, fault-level and breaker annotation, version control and the audit trail back to BS 7671 Reg 132.13 and 514.9.1.';

const checks = [
  {
    id: 'm6-s6-sub1-sld-purpose',
    question:
      'You are handed a job to produce the design pack for a 250 A three-phase commercial fit-out. Which document do you draft FIRST?',
    options: [
      'The cable schedule — start sizing cables.',
      'The single-line diagram (SLD) — it fixes the topology, the protective device layout and the fault paths. Every other document (schedules, layouts, calc sheets) hangs off the SLD topology. Drafting cables first means re-drafting them when the SLD topology shifts.',
      'The lighting layout — the customer wants to see the rooms first.',
      'The bill of materials — the procurement team needs lead times.',
    ],
    correctIndex: 1,
    explanation:
      "The SLD is the spine of the pack because it fixes the topology — supply origin, sub-mains, distribution boards, isolators, final circuit groupings and the protective devices on each. Once topology is fixed, the cable schedule follows (route + length + size per circuit on the SLD), the layouts follow (positions of DBs and accessories per the SLD topology), and the calc sheets back-fill the SLD numbers (Ze, PSCC, Zs, voltage drop). Drafting any of those first means redrafting them when the SLD changes — which it will, several times, as the design develops.",
  },
  {
    id: 'm6-s6-sub1-sld-symbols',
    question:
      'On a commercial SLD you need to show a 250 A four-pole moulded-case circuit-breaker (MCCB) with adjustable thermal-magnetic trip, feeding a 100 A three-phase TP+N sub-board through a 50 m run of XLPE four-core armoured. Which standard governs the symbols you use?',
    options: [
      'Whatever your CAD package autocompletes.',
      'BS EN 60617 — the international graphical symbols standard adopted in the UK. It defines breaker symbols (with rectangular trip box and slash for poles), cable symbols (single-line cable with parallel-line annotation for armouring), and DB symbols (rectangular block with terminal grouping). Using the recognised symbol set means anyone reading the drawing — installer, tester, future designer — interprets it the same way.',
      'Manufacturer marketing symbols.',
      'BS 7671 — the regs include the symbols you must use.',
    ],
    correctIndex: 1,
    explanation:
      "BS EN 60617 (Graphical Symbols for Diagrams) is the international standard adopted in the UK for electrical drawings. It defines a recognised graphical alphabet for breakers, fuses, switches, isolators, cables, transformers, motors, generators, batteries, RCDs, RCBOs, AFDDs, contactors, indicator lamps, instruments and most of the building-services components an L3 designer specifies. BS 7671 mandates compliance with recognised standards but does not itself define the symbol set — that's the job of BS EN 60617. Manufacturer marketing symbols are decorative and not interchangeable; CAD package defaults are usually 60617-compatible but verify per package.",
  },
  {
    id: 'm6-s6-sub1-sld-fault-annotation',
    question:
      'On the SLD the design Zs at the end of a Type C 32 A circuit-breaker final circuit comes out at 0.85 ohm. The 5 s tabulated maximum Zs for a Type C 32 A is around 0.6 ohm. What do you do at SLD level?',
    options: [
      'Ignore it — Zs is a calc sheet issue, not an SLD issue.',
      "Annotate the SLD circuit with the calc'd Zs and the regs-required maximum, with a flag (often a coloured marker or revision-cloud bubble) showing the design fails. The SLD is the dashboard — every breaker on the dashboard either passes or fails. Then resolve: change to RCBO 30 mA so the 0.4 s table applies and the Zs ceiling is much higher; or upsize the cable to drop Zs; or change device type. Re-annotate the SLD and the calc sheet.",
      'Pass it through and let the tester worry about it.',
      'Just remove the breaker and substitute another rating.',
    ],
    correctIndex: 1,
    explanation:
      "The SLD is the design dashboard. Each protective device should be annotated with at least the design Zs vs the regs ceiling (Reg 411.4.5 / Table 41.3 / Table 41.4 — the 0.4 s and 5 s ceilings). When the design fails, the SLD shows the failure visually so it cannot be missed. The fix is then a design choice: RCBO (30 mA disconnects within 40 ms regardless of Zs, so the ceiling effectively becomes the 5 s table — much more headroom); upsize cable; change device characteristic; relocate DB closer; or accept and reduce circuit length. Re-annotate after the fix. If the SLD doesn't surface failures, calc errors slip into installs.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What does an SLD (single-line diagram) actually show?',
    options: [
      'Every individual conductor on every cable.',
      'The topology of the installation — supply origin, every sub-main, every distribution board, every protective device, every final-circuit group — represented in single-line form (one line per cable regardless of how many conductors it actually has). Plus annotations: ratings, cable sizes, fault levels, Ze, PSCC, Zs, breaker types.',
      'The physical positions of accessories on the floor plan.',
      'Just the consumer unit layout.',
    ],
    correctAnswer: 1,
    explanation:
      "The SLD is a topology drawing. Every cable is drawn as a single line, even though the actual cable may be three-core, four-core, twin-and-earth or six-core. The single line is annotated with the cable type, size, length and identification. The topology shows how power flows from the supply origin through the sub-mains and DBs to the final circuits. Layout drawings show physical positions; the SLD shows electrical relationships.",
  },
  {
    id: 2,
    question: 'BS EN 60617 is the standard for:',
    options: [
      'Electrical safety standards.',
      'Graphical symbols for diagrams — the recognised symbol set for breakers, fuses, switches, isolators, cables, transformers, motors, generators, batteries, RCDs, RCBOs, AFDDs, contactors, lamps, instruments and most building-services components used on UK electrical drawings.',
      'Cable colour codes.',
      'Cable current ratings.',
    ],
    correctAnswer: 1,
    explanation:
      "BS EN 60617 (Graphical Symbols for Diagrams) is the international IEC standard adopted in the UK as the symbol set for electrical drawings. It is the reason a circle with a diagonal slash means 'switch' on every drawing, regardless of who drafted it. Using the standard symbol set is the discipline that lets a tester two years later pick up the SLD and read it without translation. Manufacturer marketing or one-off symbols break that interoperability.",
  },
  {
    id: 3,
    question: 'A commercial SLD typically annotates each protective device with:',
    options: [
      'Only the rating in amps.',
      'Device type and rating (e.g. MCCB 250 A 4P, MCB Type C 32 A, RCBO Type A 32 A 30 mA), curve characteristic where relevant, breaking capacity (Icu / Ics in kA), design Zs and regs maximum Zs, design discrimination check vs upstream device, and the BS 7671 reg references for the limits used.',
      'Just the manufacturer name.',
      'The colour of the breaker case.',
    ],
    correctAnswer: 1,
    explanation:
      "Full annotation per device is the discipline that makes the SLD self-checking. Anyone reading it can verify the device is right for its position: rating matches the cable CCC, curve characteristic matches the load type and downstream protection, breaking capacity exceeds the local PSCC, design Zs sits below the regs ceiling, and discrimination with the upstream device is intact. Annotations don't replace the calc sheet but they are the fast visual cross-check that catches errors before they reach the install.",
  },
  {
    id: 4,
    question: 'CAD layer discipline on an SLD typically separates:',
    options: [
      'Nothing — it is all one layer.',
      'At minimum: power topology (cables, breakers, DBs); annotations (ratings, calc results); revision clouds and notes; legend and title block. Some designers add layers for fault current, voltage drop, disconnection time and sub-discipline (e.g. emergency lighting circuits, fire alarm circuits, IT critical) so layers can be turned on or off for clarity.',
      'Only power on one layer and lighting on another.',
      'Only colour by department.',
    ],
    correctAnswer: 1,
    explanation:
      "Layers let the reader filter the drawing. Topology layer always on. Annotation layers (ratings, fault, voltage drop) toggled per audit purpose. Revision clouds toggled when reviewing a specific revision change. Sub-discipline layers (emergency lighting, fire alarm, IT critical) toggled for that discipline's checks. Without layer discipline, an SLD becomes unreadable as the project grows. CAD packages enforce layers automatically; hand-drawn SLDs need explicit colour or hatching coding.",
  },
  {
    id: 5,
    question: 'Why does the SLD include Ze, PSCC and Zs values directly on the drawing?',
    options: [
      'To make the drawing look full.',
      'So the tester can verify the design assumptions during initial verification — measured Ze at the origin and measured Zs at each circuit end can be compared against the design values on the SLD. Mismatch flags either a measurement issue or a design assumption that did not hold (e.g. cable installed differently to design).',
      'They are not needed on the SLD.',
      'The DNO requires them on the drawing.',
    ],
    correctAnswer: 1,
    explanation:
      "The SLD ties the design to the verification. Ze on the SLD is the DNO declared figure (or the measured-with-supply-disconnected design assumption); the tester measures Ze on energisation and confirms against the SLD. PSCC on the SLD is the design figure; the tester measures PFC and confirms. Zs at each circuit end on the SLD is the design value; the tester measures Zs and confirms. Mismatches between SLD design values and tester measurements either flag a design assumption that does not hold in reality, or flag an install deviation from the design. The SLD is the bridge between design and verification.",
  },
  {
    id: 6,
    question: 'The SLD is typically version-controlled with what convention?',
    options: [
      'No version control.',
      'Revision letters (Rev A, B, C, D) or numbers (Rev 1, 2, 3) shown in the title block, with a revision history table listing each revision with date, drafter, reason for change and what changed. Superseded revisions are marked VOID and either physically destroyed or filed separately as historical record. The current revision is the only one in active use.',
      'The drawing is undated.',
      'Whichever copy is on the foreman desk.',
    ],
    correctAnswer: 1,
    explanation:
      "Version control on the SLD is critical because the SLD is the spine — every other document references it. Revisions go up alphabetically (Rev A first issue, B, C...) or numerically (Rev 1, 2, 3...). Each revision has a row in the revision history table: date, drafter initials, reason for change (e.g. 'added EV charger circuit at Customer request 2026-04-15'), what changed. Superseded SLDs are marked VOID. Working from a superseded SLD is the most common cause of expensive fit-out rework. CDE (Common Data Environment) tooling enforces this; for small jobs it is a manual discipline.",
  },
  {
    id: 7,
    question: 'Discrimination between two protective devices is shown on the SLD how?',
    options: [
      'Not shown — discrimination is a calc-sheet only check.',
      'A discrimination annotation against each upstream/downstream device pair, citing the test (current discrimination by ratio, time discrimination by curve overlap, energy discrimination by I²t for current-limiting devices). For full discrimination across the whole SLD, manufacturer coordination tables are referenced. Where discrimination is not achievable (very common at the origin with high PSCC), the SLD notes the design choice and the regs basis.',
      'Just the upstream device size.',
      'Just the breaking capacity.',
    ],
    correctAnswer: 1,
    explanation:
      "Discrimination annotation is a visual check that the SLD topology gives selective tripping — a fault on a final circuit takes out only its own breaker, not the upstream sub-main breaker, not the origin device. Three test methods: current ratio (typically 1.6:1 minimum for MCB / MCCB pairs); time grading (the upstream device has a longer trip time at the fault current than the downstream); energy I²t (upstream withstand exceeds downstream let-through). Manufacturer coordination tables are the authority for specific device pairs. Where discrimination is not achievable, the SLD records the design choice (e.g. cascading allowed by the breaker manufacturer) and the basis.",
  },
  {
    id: 8,
    question: 'Which BS 7671 regulation underpins the requirement to produce and retain the SLD as part of the design pack?',
    options: [
      'There is no regulation — SLDs are optional.',
      'Regulation 132.13 — the explicit requirement for design documentation. Plus Reg 514.9.1 which addresses the on-site distribution board diagram requirement (with the A4:2026 domestic exception). Plus Reg 644.1.1 which makes the EIC and supporting documentation conditional on defect rectification. Plus Section 514 series on identification and notices.',
      'Regulation 132.13 — accessibility.',
      'Reg 433 — overload.',
    ],
    correctAnswer: 1,
    explanation:
      "Reg 132.13 is the design documentation hook — the installation must be documented sufficiently for it to be operated, maintained, altered and extended. Reg 514.9.1 (amended in A4:2026 with a domestic exception) requires a diagram, chart or table at every distribution board sufficient to identify circuits — the SLD discharges this at the design level and a derived per-DB schedule discharges it at install level. Reg 644.1.1 makes the EIC conditional on documentation being in order. Section 514 covers labelling and notices. Together these regs make the SLD a regulatory requirement, not a nice-to-have.",
  },
];

const faqs = [
  {
    question: 'Do I need to use a CAD package for SLDs or can I hand-draw?',
    answer:
      "Hand-drawn SLDs are acceptable for small simple jobs (a domestic CU change, a small radial alteration) where the topology is trivial and the audit trail is short. For anything commercial, multi-DB, or any installation where the design pack will live for years and be referenced by future designers and testers, CAD is the practical choice. AutoCAD, Revit MEP, AmTech, ElectricalOM, Trimble Stabicad and a handful of UK-specific tools are the common picks. The CAD package is less important than the discipline — layers, version control, BS EN 60617 symbol library, title block consistency. Most apprentices start in AutoCAD because it is the lowest barrier to entry; commercial design firms increasingly work in Revit MEP or BIM-native tooling because of CDE integration.",
  },
  {
    question: 'How detailed should the SLD be — every accessory, or just the topology?',
    answer:
      "The SLD shows topology down to the final-circuit level — every protective device, every cable run between devices, every distribution board. It does NOT show every socket, switch or luminaire on the final circuit; those go on the layout drawings and the schedule of accessories (covered in Sub 2). The SLD ends at the last protective device on the line; the schedule of accessories picks up from there. Some designers extend the SLD to show isolators and FCUs feeding fixed appliances (boilers, EV chargers, heat pumps) because those are functional intermediate devices. The rule of thumb: if it's a protective device or an isolator, it goes on the SLD; if it's a point of use, it goes on the layout.",
  },
  {
    question: 'What scale should the SLD be drawn at?',
    answer:
      "SLDs are not to scale in the geometric sense — the line lengths on the drawing do not match physical cable lengths. SLDs are topological diagrams, drawn for clarity of relationship. A small-but-busy DB room sits compactly on the drawing; a long thin sub-main to a remote outbuilding is drawn at convenient length with the actual length annotated. The annotation is the cable length (e.g. 'XLPE/SWA 25 mm² 4-core, 65 m'). Layout drawings (where physical positions matter) are scaled (typically 1:50 or 1:100 for floor plans, 1:20 for DB elevations); SLDs are not.",
  },
  {
    question: 'How do I show three-phase versus single-phase on an SLD?',
    answer:
      "Three-phase cables on an SLD are typically shown with a slash through the line and the number 3 (or 4 if including neutral) — e.g. a single line with /4 means a four-core cable (L1, L2, L3, N). Single-phase cables are shown as a single line with /2 (L, N) or /3 (L, N, CPC). Three-phase distribution boards are shown as TP+N rectangular blocks; single-phase as SP+N. Some designers use coloured lines (brown/black/grey/blue for L1/L2/L3/N, green-yellow for CPC) on multi-line schematic variants but the strict SLD is one-line-per-cable with the slash convention. BS EN 60617 covers both styles.",
  },
  {
    question: 'When does the SLD get updated — and by whom?',
    answer:
      "SLDs evolve through three life phases: (1) Design — the L3 designer drafts and revises until the design is fixed for tender or installation; revisions go up alphabetically (Rev A, B, C). (2) Installation — RFIs from the installer that result in approved design changes trigger SLD revision (e.g. 'cable route changed to avoid HVAC, length now 75 m not 65 m'); the L3 designer updates the SLD and issues the new revision; superseded copies are marked VOID. (3) As-installed — at handover, the SLD is updated to reflect what was actually installed (red-line markup process covered in Sub 5); the as-installed SLD becomes the operational drawing held by the building owner and used by future testers. The SLD belongs to the designer; install-stage and handover-stage updates are designer responsibility based on installer / tester input.",
  },
  {
    question: 'What does a typical commercial SLD title block contain?',
    answer:
      "Standard title block content: project name and number; building / area / level; drawing title (e.g. 'Single-line distribution schematic — Ground floor sub-main A'); drawing number (project-specific reference); revision letter and revision date; drafter initials and checker initials; scale (NTS — Not To Scale — for SLDs); sheet number and total sheets in the set; project address; client name; designer firm name and CDM/Building Safety Act role declaration where applicable; and the revision history table either in the title block area or on a separate revision panel. Title block consistency across the whole pack is what makes a pack feel professional and audit-friendly.",
  },
];

export default function Sub1() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module6-section6')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 6
          </button>

          <PageHero
            eyebrow="Module 6 · Section 6 · Subsection 1"
            title="Single-line schematic (SLD) production"
            description="The SLD is the spine of the design pack. Every other document hangs off it. What it must show, BS EN 60617 conventions, CAD layer discipline, fault-level and breaker annotation, version control, and the audit trail back to BS 7671 Reg 132.13 and 514.9.1."
            tone="amber"
          />

          <TLDR
            points={[
              "The single-line diagram (SLD) shows installation topology — supply origin, sub-mains, distribution boards, protective devices and final-circuit groupings — drawn one-line-per-cable with full annotations (rating, cable spec, length, fault levels, design Zs vs regs ceiling, discrimination check).",
              "BS EN 60617 is the recognised graphical symbol standard for UK electrical drawings. Use it consistently so any reader — installer, tester, future designer — interprets the drawing the same way.",
              "BS 7671 Reg 132.13 makes design documentation mandatory; Reg 514.9.1 requires a per-DB diagram or chart sufficient to identify every circuit (with an A4:2026 domestic exception). The SLD discharges these regs at the design level.",
              "Version control on the SLD is non-negotiable. Revisions go up alphabetically with a revision history table; superseded copies are marked VOID; current revision is the only one in active use.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Describe the purpose of a single-line diagram (SLD) and explain why it is the spine of the design pack.',
              'Apply BS EN 60617 graphical symbols to draft an SLD that any reader can interpret without translation.',
              'Annotate each protective device on the SLD with type, rating, curve, breaking capacity, design Zs and regs ceiling, plus discrimination check vs upstream device.',
              'Apply CAD layer discipline so the SLD remains readable as the project grows — power, annotations, revision clouds and sub-discipline layers.',
              'Maintain version control on the SLD with revision letters and a revision history table so superseded drawings cannot be worked from in error.',
              'Cite BS 7671 Reg 132.13, Reg 514.9.1 and supporting Section 514 regs as the regulatory basis for the SLD as part of the design pack.',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock
            title="What an SLD actually is"
            plainEnglish="A topology drawing — supply origin to final circuits, one line per cable. Not to scale. Annotated with ratings, cable specs, lengths, fault levels and design Zs."
            onSite="The SLD is the dashboard. If a tester or future designer can pick it up and read the whole installation in five minutes, you have done it right. If they have to flip between five other drawings to understand it, you have not."
          >
            <p>
              The single-line diagram (SLD) is a topological representation of the electrical
              installation. It shows:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Supply origin</strong> — DNO service position, service fuse rating, meter, main isolator, main earthing terminal (MET) and the connection to the earthing system (TN-S, TN-C-S PME or PNB, TT).</li>
              <li><strong>Main switchgear and sub-mains</strong> — every sub-main breaker or fuse from the origin out to the distribution boards, with cable specs (type, size, length) and the protective device on each end.</li>
              <li><strong>Distribution boards (DBs)</strong> — every DB drawn as a labelled rectangular block, with its supply breaker, busbar rating, way count and any RCD or RCBO grouping.</li>
              <li><strong>Final-circuit protective devices</strong> — every breaker, fuse, RCBO or AFDD on the DB, with type, rating, curve characteristic, breaking capacity and BS reference.</li>
              <li><strong>Cable annotations</strong> — type (e.g. T+E, FP200, XLPE/SWA), size (mm² conductor cross-section), length (metres), and Reference Method per BS 7671 Appendix 4 if relevant.</li>
              <li><strong>Fault-level annotations</strong> — Ze at the origin (DNO declared), PSCC at the origin, calculated Zs at the end of each final circuit, regs maximum Zs from Tables 41.3/41.4 or 41.5.</li>
              <li><strong>Discrimination annotations</strong> — design check between each upstream/downstream device pair.</li>
            </ul>
            <p>
              Crucially, the SLD does NOT show physical positions of accessories (those go on
              layout drawings) and does NOT show every individual conductor (each cable is one line
              regardless of core count). The SLD is electrical topology; the layouts are physical
              geometry; the schedules are detailed lists. Three different views of the same
              installation, each with its own purpose.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 132.1 (Design documentation framework, Regs 132.2–132.5)"
            clause="The information required as a basis for design is stated in Regulations 132.2 to 132.5. The requirements to which the design shall conform are stated in Regulations 132.6 to 132.16. Designers shall therefore determine and record the information listed in 132.2–132.5 to demonstrate conformity with subsequent design requirements."
            meaning={
              <>
                The Reg 132.1 framework is the design documentation hook for the whole pack. It
                does not name the SLD specifically but the SLD is the document that makes the
                determination and recording requirement achievable — without a topology diagram,
                you cannot operate, maintain, alter or extend the installation through its life
                because nobody can see what is connected to what. Cite the Reg 132.1 framework in
                the title block of the SLD as the regulatory basis.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 132.1 framework — verbatim from published facets."
          />

          <SectionRule />

          <ContentEyebrow>BS EN 60617 — the symbol set</ContentEyebrow>

          <ConceptBlock
            title="BS EN 60617 graphical symbols — the universal alphabet"
            plainEnglish="A standard symbol library for UK electrical drawings. Breaker, fuse, switch, isolator, RCD, RCBO, AFDD, motor, transformer, cable, DB block — all defined."
          >
            <p>
              BS EN 60617 (Graphical Symbols for Diagrams) is the IEC standard adopted in the UK
              that defines the graphical alphabet of electrical drawings. The relevant parts for
              SLD work include:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Part 2</strong> — Symbol elements, qualifying symbols and other symbols having general application.</li>
              <li><strong>Part 3</strong> — Conductors and connecting devices (cables, terminals, plugs, sockets, junctions).</li>
              <li><strong>Part 4</strong> — Basic passive components (resistors, capacitors, inductors).</li>
              <li><strong>Part 5</strong> — Semiconductors and electron tubes (diodes, transistors, thyristors — relevant for inverter and EV charger drawings).</li>
              <li><strong>Part 6</strong> — Production and conversion of electrical energy (generators, transformers, motors).</li>
              <li><strong>Part 7</strong> — Switchgear, controlgear and protective devices (breakers, fuses, isolators, RCDs, RCBOs, contactors).</li>
              <li><strong>Part 8</strong> — Measuring instruments, lamps and signalling devices.</li>
              <li><strong>Part 11</strong> — Architectural and topographical installation plans and diagrams (the symbol set for layout drawings).</li>
            </ul>
            <p>
              For SLDs the most-used parts are 2, 3, 6 and 7. Most professional CAD packages ship
              with a 60617-compatible symbol library; verify before relying on it. Hand-drawn SLDs
              should reference a printed BS EN 60617 quick-card pinned to the desk so the symbols
              are drawn consistently. Symbol consistency is what lets a tester two years later read
              the drawing without translation.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Symbols you will draw most often on an SLD"
            plainEnglish="A short list of the daily-use symbols. Learn these and 80 percent of an SLD reads naturally."
            onSite="Pin a BS EN 60617 quick-card to the desk for the first six months of design work. After that the symbols become muscle memory."
          >
            <p>
              The high-frequency symbols on a UK commercial SLD:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Service fuse</strong> — rectangular outline with diagonal slash and rating annotation (e.g. 'BS 88-3 100 A').</li>
              <li><strong>Main switch / isolator</strong> — circle with diagonal slash and contact lines (open or closed depending on default state); annotated with rating and pole count.</li>
              <li><strong>MCB</strong> — small rectangular outline with curve indicator (B, C, D) and rating; annotated with breaking capacity (Icn).</li>
              <li><strong>RCBO</strong> — MCB symbol with attached RCD (round symbol with delta/sigma marker for residual current sensing) and trip rating annotation (e.g. 30 mA Type A).</li>
              <li><strong>AFDD</strong> — RCBO-style symbol with arc fault indicator (often a stylised lightning or 'AFDD' text label per A4:2026).</li>
              <li><strong>MCCB</strong> — larger rectangular outline with adjustable trip indication (thermal-magnetic or electronic) and pole count slash; annotated with breaking capacity (Icu/Ics) and trip range.</li>
              <li><strong>Distribution board</strong> — labelled rectangular block with internal busbar representation; annotated with way count, busbar rating and TP+N or SP+N designation.</li>
              <li><strong>Cable</strong> — single line with annotation (e.g. 'XLPE/SWA 4c × 25 mm² + CPC, 65 m, Ref Meth E').</li>
              <li><strong>Earth electrode</strong> — three-bar earth symbol with annotation (e.g. 'Earth rod 16 mm × 2.4 m to BS 7430').</li>
              <li><strong>Main earthing terminal (MET)</strong> — labelled terminal block with bonding conductors annotated.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Topology — building the SLD from origin to final</ContentEyebrow>

          <ConceptBlock
            title="Drafting order — origin first, final circuits last"
            plainEnglish="Start at the DNO service position, work down to final circuits. Origin annotations (Ze, PSCC, service fuse, MET) anchor the whole pack."
          >
            <p>
              The professional drafting order:
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li><strong>Service position and meter</strong> — DNO service fuse, meter, isolator. Annotate Ze (DNO declared), PSCC, earthing arrangement.</li>
              <li><strong>Main switchgear</strong> — main switch, MET, primary distribution. Annotate Icu, Ics, bonding conductor sizes per Reg 543/544.</li>
              <li><strong>Sub-mains</strong> — sub-main breakers and cables to each downstream DB. Annotate device rating, cable spec, length, design Zs at sub-DB.</li>
              <li><strong>Distribution boards</strong> — each DB block with way count, busbar rating, RCD or RCBO grouping.</li>
              <li><strong>Final circuit protective devices</strong> — every breaker on every DB. Annotate type, rating, curve, breaking capacity.</li>
              <li><strong>Final circuit cables</strong> — cable spec and length per circuit. Annotate Reference Method, derating factors if non-typical.</li>
              <li><strong>Calc back-fill</strong> — once topology is fixed, run the calc sheet (cable CCC, voltage drop, fault Ip, Zs at end of circuit) and back-fill the SLD with the calc'd values. Highlight any failures with revision clouds.</li>
              <li><strong>Discrimination check</strong> — pair-by-pair check of upstream/downstream devices using manufacturer coordination tables. Annotate pass / fail / cascading-allowed per pair.</li>
            </ol>
            <p>
              Following this order means the topology is fixed before detailed annotations, which
              prevents the most common drafting waste — drafting cable annotations against a
              topology that then changes. Get topology right first, annotate second.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Fault-level and Zs annotation discipline</ContentEyebrow>

          <ConceptBlock
            title="The fault-level cascade — origin Ze and PSCC down to final-circuit Zs"
            plainEnglish="Ze and PSCC at the origin set the upstream conditions. Cable impedance accumulates downstream. Zs at each circuit end is what the regs care about for disconnection time."
          >
            <p>
              The fault-level cascade is the single most-tested calculation chain in any audit.
              The SLD makes it visible:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Ze (origin)</strong> — DNO declared external earth fault loop impedance. Typical TN-C-S PME default 0.35 ohm; TN-S 0.8 ohm or per DNO; TT measured (cannot be declared, depends on electrode quality).</li>
              <li><strong>PSCC (origin)</strong> — prospective short-circuit current at the origin per DNO declaration. Determines the minimum breaking capacity (Icu) of the main switchgear and the cascading limits downstream.</li>
              <li><strong>Sub-main impedance</strong> — calculated from cable resistance per metre × length, hot-cable correction. Adds to Ze to give Zdb (impedance at the sub-DB).</li>
              <li><strong>Final-circuit impedance</strong> — adds to Zdb to give Zs at the end of the final circuit. Compare against regs ceiling per Table 41.3 (0.4 s for circuits up to 32 A on TN systems for socket outlets) or Table 41.4 (5 s for distribution circuits and fixed-equipment circuits).</li>
              <li><strong>Discrimination ratio</strong> — at the sub-main breaker, the design fault current must be selectively cleared by the downstream device first. Manufacturer coordination tables are the authority.</li>
            </ul>
            <p>
              Annotating the fault-level cascade on the SLD turns abstract numbers into a visual
              chain — the reader can trace the impedance growth from origin to final circuit and
              see immediately if any final circuit busts the regs ceiling. The SLD is then
              self-checking; the calc sheet provides the back-up for audit.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 514.9.1 (Diagrams, charts, tables and similar information)"
            clause="A diagram, chart, table or equivalent form of information shall be provided indicating in particular: the type and composition of the circuits (points of utilisation served, number and size of conductors, type of wiring), and the means necessary for the identification of devices performing the functions of protection, isolation and switching. NOTE: For domestic (household) premises, an exception is provided in BS 7671:2018+A4:2026 — see the amended text."
            meaning={
              <>
                Reg 514.9.1 is the per-DB diagram requirement. The SLD discharges the topology
                aspect at the design pack level; a derived per-DB schedule (a copy of the relevant
                slice of the SLD plus the schedule of circuit details) discharges the on-site
                requirement. The A4:2026 amendment introduced an exception specifically for
                domestic premises — read the amended text to confirm the precise scope. For all
                non-domestic work, the per-DB diagram requirement is full force.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 51, Regulation 514.9.1."
          />

          <SectionRule />

          <ContentEyebrow>CAD layer discipline and version control</ContentEyebrow>

          <ConceptBlock
            title="Layer discipline keeps the SLD readable as the project grows"
            plainEnglish="Power topology on one layer, annotations on another, revisions on a third. Toggle layers per audit purpose. Without layers, complex SLDs become unreadable."
          >
            <p>
              The minimum layer set on a commercial SLD:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>00-Title-block</strong> — frame, title block, revision history table. Always on.</li>
              <li><strong>10-Topology</strong> — cables, breakers, DB blocks, isolators, MET. Always on.</li>
              <li><strong>20-Annotations-rating</strong> — device ratings, cable specs, lengths. Always on for design issue.</li>
              <li><strong>30-Annotations-fault</strong> — Ze, PSCC, Zs, discrimination check results. Toggled on for fault-level audit.</li>
              <li><strong>31-Annotations-vd</strong> — voltage drop per circuit. Toggled on for voltage-drop audit.</li>
              <li><strong>40-Sub-emergency-lighting</strong> — emergency lighting circuits highlighted. Toggled on for emergency lighting compliance check.</li>
              <li><strong>41-Sub-fire-alarm</strong> — fire alarm circuits highlighted. Toggled on for BS 5839 compliance check.</li>
              <li><strong>42-Sub-IT-critical</strong> — IT and critical circuits highlighted. Toggled on for resilience check.</li>
              <li><strong>90-Revision-clouds</strong> — revision clouds and change markers. Toggled on for the current revision review.</li>
              <li><strong>99-Notes-general</strong> — general notes panel, legend, abbreviations. Always on.</li>
            </ul>
            <p>
              CAD packages enforce layers automatically; hand-drawn SLDs need explicit colour or
              hatching coding to achieve the same effect. The point of layers is filterability — a
              fault-level auditor turns on layers 10, 20, 30 only and sees a clean fault-level
              view; a fire-engineer auditor turns on layers 10, 20, 41 and sees the fire alarm
              topology only. Without layers, every reader sees every annotation and the drawing
              becomes a wall of text.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Version control on the SLD — the most-broken discipline"
            plainEnglish="Revisions go up alphabetically. Each revision logs date, drafter, reason and what changed. Superseded copies are marked VOID. The current revision is the only one in active use."
            onSite="Working from a superseded SLD is the single most common cause of expensive fit-out rework. The discipline matters more than the format."
          >
            <p>
              Version control rules:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Revision letters or numbers</strong> — go up sequentially (Rev A first issue, B, C, D... or Rev 1, 2, 3, 4...). Some firms use both (Rev P1, P2, P3 for preliminary issues; Rev A, B, C for issued-for-construction).</li>
              <li><strong>Revision history table</strong> — one row per revision: date, drafter initials, checker initials, reason for change (specific — 'added EV charger circuit at Customer request 2026-04-15' not 'updated'), what changed (cross-references the changed elements).</li>
              <li><strong>Revision clouds</strong> — visual markers on the drawing showing what changed in the current revision. Cleared when the next revision is issued.</li>
              <li><strong>Title block revision indicator</strong> — large clear revision letter in the title block so any reader sees instantly which revision they have.</li>
              <li><strong>Superseded copies</strong> — physically marked VOID (large red X or VOID stamp); preferably destroyed; if retained for historical reference, filed in a separate archive folder.</li>
              <li><strong>CDE enforcement</strong> — on Common Data Environment (CDE) projects (Procore, Asite, BIM 360, Autodesk Construction Cloud), the CDE enforces version control automatically; older revisions are archived; only the current revision is downloadable for active use.</li>
            </ul>
            <p>
              The single most common version-control failure: an installer prints Rev C, takes it
              to site, the designer issues Rev D the next week, the installer keeps working from
              Rev C because nobody told them. Three weeks later the install is built to Rev C, the
              designer comes back to a site that does not match Rev D, and the discussion about
              who pays for the rework starts. Avoid by enforcing CDE access, voiding superseded
              copies and including a 'check revision before working' note in the title block.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 644.1.1 (New installation — defects to be corrected before Certificate issued)"
            clause="For a new installation, any defect or omission revealed during the inspection and testing shall be corrected before the Certificate is issued."
            meaning={
              <>
                Reg 644.1.1 makes the EIC conditional on the design pack and the install being in
                order. If verification reveals that the SLD does not match the install, that is a
                defect that must be corrected before the EIC issues — either the install is brought
                back to match the SLD, or the SLD is updated as-installed and re-issued. Either way
                the EIC cannot be signed until the documentation matches reality. The SLD discipline
                directly underpins the EIC validity.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 6, Chapter 64, Regulation 644.1.1."
          />

          <SectionRule />

          <ContentEyebrow>What an A4:2026-aligned SLD must show</ContentEyebrow>

          <ConceptBlock
            title="The 2026 amendment changed what the SLD has to surface"
            plainEnglish="A4:2026 introduced and redrafted enough regulations that the SLD as a design dashboard now has additional annotations to carry. AFDDs are mandatory in HRRBs, HMOs, PBSA and care homes per Reg 421.1.7 and recommended elsewhere. Surge protective devices (SPDs) per Reg 443.4 are mandatory where transient overvoltage could cause serious injury, public-service interruption or commercial loss — and the risk-assessment route has been removed. EV charger circuits need dedicated 30 mA RCD with DC fault protection per Reg 722.531.3.101. The SLD has to show all of this."
            onSite="Practical L3 effect on commercial drafts: the 14-unit retail SLD now carries AFDD-RCBO symbols on every socket-outlet final circuit in any retail unit that doubles as PBSA-attached or care-home-attached premises. The origin block carries the SPD specification (Type 2 minimum at the origin per Reg 443.4 risk categories). EV charger circuits (whether installed at fit-out or pre-cabled for a future install) have the dedicated RCD-with-DC-fault-protection annotation. The SLD is the audit trail; if A4:2026 says it has to be there, the SLD has to show it."
          >
            <p>
              The A4:2026-aligned SLD annotation checklist:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>AFDD-RCBO on socket-outlet final circuits ≤ 32 A</strong> — per
                Reg 421.1.7 mandatory in HRRBs, HMOs, PBSA, care homes; recommended in
                other premises. SLD shows AFDD symbol with rating and BS EN reference.
              </li>
              <li>
                <strong>SPD at the origin</strong> — per Reg 443.4 mandatory where the
                consequences of transient overvoltage are serious. The risk-assessment
                method (Reg 443.5) has been deleted; designers refer to the categories in
                443.4. SLD shows SPD type, location and connection scheme.
              </li>
              <li>
                <strong>EV charger dedicated protection</strong> — per Reg 722.531.3.101
                each connecting point individually protected by 30 mA RCD with DC fault
                current protection. SLD shows RCD type, IΔn, DC sensing method.
              </li>
              <li>
                <strong>RCD test method</strong> — note in the title block or general
                notes that RCD verification per Reg 643.7 is by single AC test at 1×IΔn
                in line with A4:2026, regardless of RCD type.
              </li>
              <li>
                <strong>Generator and battery storage</strong> — per Reg 551.7 additional
                requirements for generating sets in parallel with the public network. SLD
                shows the parallel source, the AC and DC isolation points, the warning
                notice references per Reg 514.10.
              </li>
              <li>
                <strong>Earth electrode under Reg 542.2.8</strong> — A4:2026 introduced
                Reg 542.2.8 with additional electrode requirements; SLD shows electrode
                location, type, measured resistance at handover, connection per Reg 542.3.2.
              </li>
              <li>
                <strong>Edition reference in title block</strong> — 'BS 7671:2018+A4:2026'
                cited as design basis. Anyone reading the pack knows which edition's
                limits apply.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Worked example — small commercial fit-out SLD</ContentEyebrow>

          <Scenario
            title="SLD for a 14-unit retail unit fit-out — origin to final"
            situation={
              <>
                You have been engaged to produce the design pack for a 14-unit ground-floor retail
                fit-out. The DNO Form 1 confirms a three-phase 400 A TN-C-S supply at the landlord
                meter position, Ze 0.35 ohm declared, PSCC 16 kA. The landlord has installed a
                400 A main switchgear cabinet with a four-pole switch-disconnector at the head;
                each retail unit has been allocated a sub-main of up to 60 A single-phase or 32 A
                three-phase per the lease. Your unit is Unit 7, a small cafe. The cafe brief is:
                kitchen with combi-oven, induction hob, dishwasher, coffee machine, refrigeration;
                customer area with 12-seat dining and small counter; emergency lighting and fire
                alarm to BS 5839-1 Cat L1; EV-ready conduit to a future kerbside charger (not
                installed at fit-out). The cafe sub-main allocation is 60 A single-phase with the
                landlord MCCB at the main switchgear set to 60 A trip.
              </>
            }
            whatToDo={
              <>
                Draft the SLD top-down. Origin block: landlord position with Ze 0.35 ohm, PSCC 16 kA,
                400 A service fuse, three-phase TN-C-S earthing. Sub-main block: landlord MCCB 60 A
                single-phase rated to your unit, XLPE/SWA 16 mm² 2-core+CPC 22 m run from main
                switchgear to your unit's metering position, calculated impedance 0.05 ohm,
                Zsubmain at unit DB = 0.40 ohm. Unit DB: 12-way SP+N RCBO board, 60 A busbar, all
                ways RCBO Type A 30 mA per Reg 411.3.4 and Reg 422 fire-risk consideration for the
                cafe. Final circuits: kitchen combi-oven RCBO Type C 32 A, 6 mm² T+E 8 m, design Zs
                0.45 ohm vs Type C 32 A 5 s ceiling 1.43 ohm — pass; induction hob RCBO Type C 32 A,
                6 mm² T+E 6 m, similar pass; dishwasher RCBO Type C 16 A, 2.5 mm² T+E 7 m;
                refrigeration RCBO Type C 16 A; ring final RCBO Type B 32 A, 2.5 mm² T+E 38 m;
                lighting general RCBO Type B 6 A 1.5 mm² T+E 18 m; emergency lighting maintained
                circuit on dedicated RCBO Type B 6 A with self-contained luminaires per BS 5266;
                fire alarm panel dedicated RCBO Type B 6 A FP200 cable per BS 5839-1; EV-ready
                spare way reserved with conduit pre-installed. Annotate every device with rating,
                curve, breaking capacity (Icn 6 kA matches the cascading allowed by the landlord
                MCCB Icu 25 kA — manufacturer coordination table cited). Annotate every cable with
                Reference Method (Method C clipped direct typical). Annotate Zs at end of every
                circuit. Run the discrimination check with the landlord MCCB and confirm
                cascading per the manufacturer table is acceptable. Title block shows project,
                drawing number, Rev A first issue, drafter initials, BS 7671:2018+A4:2026 cited
                as design basis, BS EN 60617 cited as symbol standard. Issue Rev A for client
                review.
              </>
            }
            whyItMatters={
              <>
                The SLD is the spine. The cable schedule (Sub 2) reads off the SLD cable
                annotations. The lighting layout reads off the SLD lighting circuits. The schedule
                of circuit details reads off the SLD device-and-cable pairs. The calc sheet
                back-fills the SLD fault-level annotations. The EIC at handover quotes the SLD
                revision in the design basis section. Every other document is downstream of the
                SLD. Get the SLD right and the rest of the pack falls into place; get the SLD
                wrong and every downstream document carries the error. The SLD is the single
                document where 80 percent of the design audit lives.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>Things that catch people out</ContentEyebrow>

          <CommonMistake
            title="Drawing cable schedules before fixing the SLD topology"
            whatHappens={
              <>
                A new L3 designer starts drafting the cable schedule because they want to feel
                productive. They size cables based on an assumed topology. Two days later the
                design review changes the topology — a sub-DB moves, two final circuits get
                regrouped, an EV charger gets added. Every cable in the schedule now needs
                re-checking against the new topology. The cable schedule was wasted work because
                topology was not fixed first.
              </>
            }
            doInstead={
              <>
                Draft the SLD topology first. Get client and reviewer sign-off on the SLD before
                detailing the schedules. Once topology is locked at Rev A or B, the cable schedule
                follows directly from the SLD cable annotations. Topology changes after the
                schedules are drafted should trigger a revision of both — never let the schedule
                drift from the SLD. The SLD is the single source of truth for topology.
              </>
            }
          />

          <CommonMistake
            title="Inconsistent symbols across drawings in the same pack"
            whatHappens={
              <>
                The SLD uses the BS EN 60617 RCBO symbol; the per-DB schedule uses a
                manufacturer-marketing RCBO icon; the layout drawings use yet another non-standard
                icon copied from an old project. The reader has to translate between three symbol
                sets to match the same device across the pack. Errors creep in.
              </>
            }
            doInstead={
              <>
                One symbol set across the whole pack — BS EN 60617 — enforced by a shared CAD
                symbol library. When working in a CAD package, lock the symbol library at project
                kick-off and require all team members to use the locked library. When working
                hand-drawn or in mixed tooling, agree the symbol set in writing and circulate a
                one-page symbol legend with every issued drawing. Symbol consistency is what makes
                a pack look professional and reads accurately.
              </>
            }
          />

          <SectionRule />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 514.13.1 (Earthing and bonding — warning notice)"
            clause="A warning notice clearly and durably marked with the words 'Safety Electrical Connection — Do Not Remove' shall be securely fixed in a visible position at or near: (a) the point of connection of every earthing conductor to an earth electrode; (b) the point of connection of every bonding conductor to an extraneous-conductive-part; (c) the main earthing terminal, where this is separate from the main switchgear."
            meaning={
              <>
                Reg 514.13.1 is one of the warning-notice regs that must be reflected on the SLD
                and the layout drawings. The MET symbol on the SLD should be flagged with a 'Safety
                Electrical Connection' notice indicator; the layout drawing should show the
                physical position of the notice. The 'Do Not Remove' wording is mandatory and the
                notice must be durable and visible. Reg 514.13.2 has a different mandatory wording
                for special-locations electrical separation. Section 514 series cover all the
                statutory notices the design pack must prescribe.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 51, Regulation 514.13.1."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "The SLD is the spine of the design pack. Every other document — cable schedules, layouts, calc sheets, EIC — references the SLD. Get topology right first, annotations second, calc back-fill third.",
              "BS EN 60617 is the recognised symbol set for UK electrical drawings. Use it consistently across the whole pack. Lock the CAD symbol library at project kick-off; circulate a one-page symbol legend with hand-drawn or mixed-tool packs.",
              "Annotate every protective device on the SLD with type, rating, curve, breaking capacity, design Zs and regs ceiling, plus discrimination check vs upstream. The SLD is then self-checking — failures are visible.",
              "Annotate every cable with type, size, length, Reference Method and any non-typical derating factors. The cable annotations on the SLD ARE the source for the cable schedule (Sub 2).",
              "CAD layer discipline keeps the SLD readable as the project grows. At minimum: title block, topology, rating annotations, fault annotations, sub-discipline highlights, revision clouds, general notes. Toggle layers per audit purpose.",
              "Version control is non-negotiable. Revisions go up alphabetically with a revision history table. Superseded copies are marked VOID. Working from a superseded SLD is the single most common cause of fit-out rework.",
              "BS 7671 Reg 132.13 mandates design documentation; Reg 514.9.1 requires per-DB diagram or chart (with A4:2026 domestic exception); Reg 644.1.1 makes EIC conditional on documentation matching install; Reg 514.13.1 mandates warning notices reflected on the SLD and layouts.",
              "The fault-level cascade — origin Ze and PSCC down to final-circuit Zs — is the single most-tested calculation chain in any audit. The SLD makes the cascade visible so failures cannot be missed.",
            ]}
          />

          <Quiz title="SLD production — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module6-section6')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section landing
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Section 6 — Documentation + Drawings
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module6-section6-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                6.2 Schedules — accessories, cables, lighting, circuits
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
