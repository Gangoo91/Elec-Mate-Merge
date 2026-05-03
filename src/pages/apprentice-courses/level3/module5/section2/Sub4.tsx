/**
 * Module 5 · Section 2 · Subsection 4 — Cable installation inspection
 * Maps to C&G 2365-03 / Unit 304 / LO3 / AC 3.1
 *
 * Visual inspection of cable selection, sizing, routing, support, fixing,
 * fire stopping, and the safe-zones rule (Reg 522.6). Identification per
 * Reg 514.3 (post-harmonisation colours) and the mixed-colours warning
 * notice for older installations (the mixed-colours warning notice — formerly Reg 514.14, deleted by BS 7671:2018+A2:2022, now industry good practice rather than a regulatory requirement).
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

const TITLE = 'Cable installation inspection | Level 3 Module 5.2.4 | Elec-Mate';
const DESCRIPTION =
  "Visual inspection of cables — selection, sizing, routing in safe zones (Reg 522.6), support and fixing, fire stopping (Section 527), identification (Reg 514.3) and the mixed-colours notice for legacy installations.";

const checks = [
  {
    id: 'm5-s2-sub4-safe-zones',
    question: 'Reg 522.6.201 (safe zones) requires cables concealed in walls less than 50 mm from the surface to be:',
    options: [
      'In any zone.',
      'Within prescribed safe zones (horizontal / vertical from accessory, or 150 mm from wall edges and ceilings) OR have RCD additional protection ≤ 30 mA, OR have earthed mechanical protection (e.g. metal capping). All three together for higher-risk masonry walls.',
      'Always horizontal.',
      'Below floor level only.',
    ],
    correctIndex: 1,
    explanation:
      'Reg 522.6.201 (UK national addition) — cables less than 50 mm from the surface in walls / partitions must be in safe zones (horizontal/vertical from accessories, or within 150 mm of wall edges / ceilings) AND/OR protected by RCD ≤ 30 mA AND/OR have earthed mechanical protection. Combination requirements depend on wall type. Visual inspection traces visible runs and considers concealed runs against design drawings.',
  },
  {
    id: 'm5-s2-sub4-colours',
    question: 'Post-harmonisation, single-phase line conductor identification per Reg 514.3 is:',
    options: [
      'Red.',
      'Brown.',
      'Black.',
      'Yellow.',
    ],
    correctIndex: 1,
    explanation:
      "Post-harmonisation (UK adoption from 2004 onwards in BS 7671): single-phase line = brown. Three-phase L1/L2/L3 = brown/black/grey. Neutral = blue. CPC = green/yellow. On older red/yellow/blue installations, a mixed-colours warning notice is industry good practice (formerly required by Reg 514.14, deleted by BS 7671:2018+A2:2022).",
  },
  {
    id: 'm5-s2-sub4-fire-stop',
    question: 'Section 527 cable penetrations through fire-rated walls / floors require:',
    options: [
      'Foam fill only.',
      'Sealing arrangements that maintain the fire resistance rating of the element penetrated — using tested intumescent products (pillows, mortar, putty, sleeves) appropriate to the fire rating, cable type, and bundle size.',
      'No sealing required.',
      'Just plaster.',
    ],
    correctIndex: 1,
    explanation:
      "Section 527 — cable penetrations through fire-resisting elements must be sealed to maintain the fire rating. Tested intumescent products are used per the manufacturer's installation drawings and matched to the fire rating (e.g. 60-min rated wall = 60-min rated seal). Visual inspection confirms presence and correct application of seals at every penetration.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'In BS 7671:2018+A4:2026, the mixed-colours warning notice (formerly Regulation 514.14) is:',
    options: [
      'A current BS 7671 regulatory requirement on every install.',
      'No longer a BS 7671 regulatory requirement — Regulation 514.14 was deleted by Amendment 2:2022. The mixed-colours notice remains industry good practice where pre-harmonisation (red/yellow/blue) and post-harmonisation (brown/black/grey) colours coexist, but it is not mandated by the current Wiring Regulations.',
      'A current requirement only on industrial installations.',
      'Never relevant.',
    ],
    correctAnswer: 1,
    explanation:
      "Regulation 514.14 was deleted by BS 7671:2018+A2:2022. The mixed-colours notice is therefore no longer a regulatory requirement under the current standard — but it remains sensible practice on legacy installations where mixed colours coexist, as a means of warning future workers to verify polarity before connection. Absence of the notice is no longer a coded non-compliance against 514.14 on an EICR.",
  },
  {
    id: 2,
    question: 'Reg 522.8.1 — cables installed where exposed to mechanical damage shall be:',
    options: [
      'Always SWA.',
      'Selected and erected to provide adequate mechanical protection — by cable type (SWA, MICC), enclosure (conduit, trunking), or location (out of reach). Risk-assessed against the level of damage expected.',
      'Always in conduit.',
      'No protection needed.',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 522.8 — mechanical protection appropriate to the risk. SWA / MICC self-protect. Twin and earth in trunking / conduit / capping. Consider the environment — workshop floor cables need different protection from a domestic loft cable. Visual inspection considers the actual risk vs the protection installed.',
  },
  {
    id: 3,
    question: 'For a 16 A radial circuit feeding a single immersion heater, the standard cable size is typically:',
    options: [
      '1.0 mm²',
      '1.5 mm²',
      '2.5 mm²',
      '6.0 mm²',
    ],
    correctAnswer: 2,
    explanation:
      "A 16 A radial circuit (typically a dedicated immersion supply) commonly uses 2.5 mm² T+E. Sizing depends on cable run, installation method, ambient temperature, and grouping — always verify against manufacturer's tables and Appendix 4 of BS 7671. Visual inspection confirms installed CSA against design.",
  },
  {
    id: 4,
    question: 'Cable support — for unsupported PVC/PVC twin and earth cable runs, the maximum permitted unsupported span per IET guidance is approximately:',
    options: [
      '10 mm.',
      '250 mm horizontal between fixings, 400 mm vertical between fixings (typical guidance — exact figures depend on cable size).',
      '5 m.',
      'No limit.',
    ],
    correctAnswer: 1,
    explanation:
      "IET on-site guide and manufacturer's fixing recommendations specify maximum unsupported spans for various cable types. Typical for PVC/PVC T+E: 250 mm horizontal / 400 mm vertical. Visual inspection checks fixings are adequate, evenly spaced, and the cable is not strained. Heavier cables (SWA, larger CSAs) need closer support.",
  },
  {
    id: 5,
    question: "Reg 522.6.202 — where cables less than 50 mm from the surface in a wall / partition are not in a safe zone, the protection options are:",
    options: [
      "RCD only.",
      "RCD ≤ 30 mA additional protection on the circuit OR earthed mechanical protection (e.g. metal capping continuous from accessory to safe zone) OR cable enclosed in earthed metallic conduit / trunking.",
      "No protection needed.",
      "Brick walls only.",
    ],
    correctAnswer: 1,
    explanation:
      "Reg 522.6.202 / 522.6.203 — multiple options: 30 mA RCD on the circuit, OR earthed mechanical protection, OR earthed metallic enclosure. Combination required for certain wall types (e.g. metal-framed partitions add additional requirements). Visual inspection checks the route, assesses zone compliance, confirms protection method matches the design.",
  },
  {
    id: 6,
    question: "Cable runs through joists in a floor must be:",
    options: [
      'Notched at any depth.',
      'Drilled within the centre third of the joist depth, in the middle 25-40% of the span, and not weaken the structural integrity. Notches allowed in top of joist within prescribed limits per Building Regulations Part A and BS 5268.',
      'Always notched.',
      'No restrictions.',
    ],
    correctAnswer: 1,
    explanation:
      "Structural rules (Building Regs Part A, BS 5268) — drilling preferred to notching for cable holes through joists. Holes within centre third of joist depth, in middle 25-40% of span, away from joist supports. Notches in top, limited depth (typically 0.125 of joist depth), within prescribed zone. Visual inspection considers the structural impact and whether the cable holes meet the requirements.",
  },
  {
    id: 7,
    question: 'Cables installed in conduit shall have a fill ratio per the IET on-site guide of approximately:',
    options: [
      '90%.',
      'Not exceeding around 40-45% of the conduit cross-sectional area for thermoplastic conduit (depending on conduit size, cable size, and number of bends) — to allow heat dissipation and cable installation/withdrawal.',
      '100%.',
      '5%.',
    ],
    correctAnswer: 1,
    explanation:
      "IET on-site guide tables limit conduit fill to allow heat dissipation and practical installation/withdrawal. Around 40-45% is typical for thermoplastic conduit; lower for steel. Higher fill = higher cable temperature = potential for derating. Visual inspection of conduit installation considers fill against the table values.",
  },
  {
    id: 8,
    question: "Cables installed in a thermal insulation layer require:",
    options: [
      'No special consideration.',
      'Application of the rating factor (Ca) for thermal insulation per BS 7671 Appendix 4 — Method 100 (cable surrounded by insulation) typically applies a 0.5 derating, requiring larger CSA. Visual inspection checks the design accounts for installation method.',
      'Only RCD protection.',
      'Smaller cable.',
    ],
    correctAnswer: 1,
    explanation:
      "Cables in thermal insulation are derated heavily (Method 100 / Method 101 in Appendix 4). A 2.5 mm² T+E in free air can carry 27 A; surrounded by insulation it may be limited to 13.5 A. Visual inspection confirms the installation method against the design — cables passing through insulation in a loft are a common derating issue.",
  },
];

const faqs = [
  {
    question: "What are the safe zones for cables in walls?",
    answer:
      "Reg 522.6.201 — vertical or horizontal lines from accessories (sockets, switches), or within 150 mm of the corner of a wall and within 150 mm of the ceiling. Cables outside these zones in walls less than 50 mm deep need additional protection (RCD, mechanical, or earthed enclosure). Plus the metal-framed partition exemption / additional rules.",
  },
  {
    question: "When is the mixed-colours warning notice required?",
    answer:
      "It is no longer required by BS 7671 — Regulation 514.14 was deleted by Amendment 2:2022 and is not in the active edition (2018+A4:2026). It remains industry good practice on legacy installations where pre-harmonisation (red/yellow/blue) and post-harmonisation (brown/black/grey) cable colours coexist: a durable notice at the consumer unit / distribution board warning future workers to verify polarity before connection. Common on alterations to pre-2004 installations, but no longer a regulatory non-compliance if absent.",
  },
  {
    question: "How do I know the cable CSA is correct?",
    answer:
      "Cross-check installed CSA against the design (design current, installation method, ambient temp, grouping factor, voltage drop calculation). Reg 524 / Appendix 4 of BS 7671 provide the tables and method. Visual inspection confirms installed CSA matches design — the design itself must be correct for the duty.",
  },
  {
    question: "Are cable colours retrospective?",
    answer:
      "No — pre-harmonisation installations don't need re-cabling just because the colours have changed. Future additions to a pre-harmonisation installation must use the post-harmonisation colours per Reg 514.3, but the older wiring is not retrospectively non-compliant. The mixed-colours warning notice (formerly Reg 514.14, deleted by A2:2022) is no longer a BS 7671 requirement, but it remains good practice on legacy installations to flag the mixed-colour state for future workers.",
  },
  {
    question: "What about cables in conduit — what do I check?",
    answer:
      "Conduit material (PVC vs steel) and IP rating against location, fill ratio (per IET on-site guide tables), bends radius (manufacturer recommended minimum), continuity if metallic (Reg 543.3), draw boxes / inspection points at intervals for cable installation/maintenance, water/dust ingress prevention at outdoor / damp installations.",
  },
  {
    question: "What happens to cable rating when it passes through thermal insulation?",
    answer:
      "Significant derating per Method 100 / 101 in Appendix 4. A common rule of thumb: cable in insulation derates roughly 0.5 — a 2.5 mm² T+E rated for 27 A in free air becomes around 13.5 A. The design should account for this; visual inspection confirms the installed CSA against the actual installation method, not against the free-air rating.",
  },
];

export default function Sub4() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module5-section2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero
            eyebrow="Module 5 · Section 2 · Subsection 4"
            title="Cable installation inspection"
            description="Visual inspection of cables — selection, sizing, routing in safe zones, support and fixing, fire stopping, identification colours and the mixed-colours notice."
            tone="emerald"
          />

          <TLDR
            points={[
              "Reg 522.6.201 — cables in walls less than 50 mm from surface must be in safe zones AND/OR have RCD ≤ 30 mA AND/OR earthed mechanical protection.",
              "Post-harmonisation colours (Reg 514.3) — single-phase L brown, three-phase L1/L2/L3 brown/black/grey, N blue, CPC green/yellow.",
              "Mixed-colours warning notice — industry good practice (formerly Reg 514.14, deleted by A2:2022) where pre- and post-harmonisation colours coexist in one installation.",
              "Section 527 fire stopping at every penetration of a fire-resisting element — use tested intumescent products matched to rating, cable, and bundle size.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Apply the Reg 522.6.201 safe-zone rules to cables concealed in walls / partitions.",
              "Identify post-harmonisation cable colours per Reg 514.3 and recognise the mixed-colours notice as industry good practice (formerly Reg 514.14, deleted by A2:2022) on legacy installations.",
              "Verify cable CSA against design, accounting for installation method derating (Appendix 4, Methods 100/101 for thermal insulation).",
              "Confirm cable support / fixing intervals against IET on-site guide and manufacturer recommendations.",
              "Apply Section 527 fire-stopping requirements at penetrations through fire-resisting walls / floors.",
              "Verify cable mechanical protection appropriate to the location risk (Reg 522.8).",
              "Identify structural compliance for cable holes through joists (Building Regs Part A, BS 5268).",
            ]}
            initialVisibleCount={4}
          />

          <ContentEyebrow>Safe zones — Reg 522.6 in practice</ContentEyebrow>

          <ConceptBlock
            title="Safe zones, RCD, mechanical protection — the three-way choice"
            plainEnglish="Cables hidden in walls less than 50 mm deep are at risk of being struck by a future picture nail or shelf bracket. Reg 522.6.201 protects against this with three options — keep them in safe zones (predictable routes), add RCD protection (trip on contact), or add earthed mechanical protection (deflect/contain). Combinations may be required."
            onSite="When you are looking at a chase or a route, ask: is this in a safe zone? If not, does the circuit have 30 mA RCD? If not, is the cable mechanically protected? If none of those, it's a finding."
          >
            <p>The three safe-zone options:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Zone routing.</strong> Cable runs vertically or horizontally from an
                accessory (socket, switch, light point) — the zones a future occupant would
                expect a cable to be. Plus within 150 mm of the corner of a wall and 150 mm of
                the ceiling. Predictable = safer.
              </li>
              <li>
                <strong>30 mA RCD additional protection.</strong> If the cable is struck, the
                resulting earth fault trips the RCD within 40 ms — saving life. Most modern
                domestic socket and lighting circuits already have this for other reasons.
              </li>
              <li>
                <strong>Earthed mechanical protection.</strong> Steel capping, earthed metal
                conduit, earthed armoured cable. Physical barrier between any future tool and
                the live conductor.
              </li>
            </ul>
            <p>
              For metal-framed partitions, additional Reg 522.6.203 requirements apply — the cable
              should be in earthed metallic conduit OR have RCD protection regardless of zone
              (because the metal frame itself can become live if struck and shorts to a cable).
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 522.6.201 (Cable concealed in a wall or partition)"
            clause="A cable installed in a wall or partition at a depth of less than 50 mm from a surface of the wall or partition shall be: (i) installed in a zone within 150 mm from the top of the wall or partition, or within 150 mm of an angle formed by two adjoining walls or partitions, or in a zone vertically or horizontally to an accessory; or (ii) provided with mechanical protection sufficient to prevent penetration by nails, screws and the like; or (iii) protected by means of an RCD with a rated residual operating current not exceeding 30 mA, complying with the applicable standard."
            meaning={
              <>
                The regulation gives three options (or combination required for certain wall
                types). Visual inspection confirms which option(s) the design has used and
                verifies they are correctly applied. Cables outside zones, with no RCD and no
                mechanical protection, are non-compliant — cross on schedule, C2 on EICR
                (potentially dangerous to future occupants).
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 52, Regulation 522.6.201."
          />

          <SectionRule />

          <ContentEyebrow>Identification — Reg 514.3 and the mixed-colours notice</ContentEyebrow>

          <ConceptBlock
            title="Post-harmonisation colours and the legacy installations you'll meet"
            plainEnglish="UK harmonised cable colours from 2004. Single-phase L = brown, N = blue. Three-phase L1/L2/L3 = brown/black/grey. CPC = green/yellow. Older installations (red/yellow/blue) are still in service — when new and old meet on the same installation, a mixed-colours warning notice is industry good practice (formerly Reg 514.14, deleted by A2:2022)."
          >
            <p>The colour identification rules:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Single-phase.</strong> L = brown, N = blue, CPC = green/yellow.
              </li>
              <li>
                <strong>Three-phase.</strong> L1 = brown, L2 = black, L3 = grey, N = blue,
                CPC = green/yellow. (Note: post-harmonisation black is L2, NOT neutral — a common
                error when working between editions.)
              </li>
              <li>
                <strong>Switch wires.</strong> May be brown (preferred) or other colour with
                brown sleeving / tape at terminations to indicate L. Common in older single-cable
                switch drops.
              </li>
              <li>
                <strong>Pre-harmonisation legacy.</strong> Red = L (single phase), yellow/blue/red
                = L1/L2/L3 three-phase, black = N, green = CPC (very old) or green/yellow (later).
              </li>
            </ul>
            <p>
              Where mixed colours are present, industry good practice (formerly required by Reg 514.14, deleted by A2:2022) is a durable warning notice at
              the CU / origin of the alteration, alerting future workers to verify polarity
              before connection. Visual inspection confirms the notice presence and legibility.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 514.14 (Notice of mixed colours) — DELETED by Amendment 2:2022"
            clause="Regulation 514.14, which previously required a mixed-colours warning notice, was deleted from the text of the Wiring Regulations by BS 7671:2018+A2:2022. There is no current regulation at clause 514.14 in the active edition (2018+A4:2026). Any guidance or requirements concerning non-standard or mixed colours must now be sought elsewhere in BS 7671 or in supporting documents (e.g. IET Guidance Notes, On-Site Guide)."
            meaning={
              <>
                <strong>Important — what this means in practice.</strong> The mixed-colours
                warning notice is no longer a BS 7671 regulatory requirement. It remains{' '}
                <strong>industry good practice</strong> on legacy installations where
                pre-harmonisation (red/yellow/blue) and post-harmonisation (brown/black/grey)
                cable colours coexist — a durable notice at the consumer unit warning future
                workers to verify polarity is sensible engineering, but it is not mandated by
                the current Wiring Regulations. On an EICR, absence of such a notice is no
                longer a coded non-compliance against 514.14; an inspector may still record an
                observation under the appropriate current clause if mixed colours present a
                safety concern in the specific installation.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 51 — Regulation 514.14 deleted by BS 7671:2018+A2:2022."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Support, fixing and fire stopping</ContentEyebrow>

          <ConceptBlock
            title="Cables stay where they were put"
            plainEnglish="Cable support keeps the cable in place over its life — without sag, strain on terminations, or risk of damage from movement. Fire stopping ensures cable penetrations don't compromise the fire compartmentation of the building. Two simple jobs that get missed often."
          >
            <p>Cable support — visual inspection checks:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Fixing intervals appropriate to cable type and weight (IET on-site guide tables /
                manufacturer recommendation). PVC/PVC T+E typical 250 mm horizontal / 400 mm
                vertical for 1.5-2.5 mm² sizes.
              </li>
              <li>
                Fixings non-damaging to cable (correct cable cleat, P-clip, tray hook). Plastic
                clips for PVC; metal clips with cable-protecting liner for armoured.
              </li>
              <li>
                No strain at terminations — cable enters the box / accessory with adequate slack
                and is fixed close to the entry to prevent pulling.
              </li>
              <li>
                Cable trays and ladders supported per their own design — typical 1-1.5 m intervals
                for steel tray, with bracing at corners and tees.
              </li>
              <li>
                Suspension cables (e.g. lighting suspended on a pendant cable) — checked for
                strain relief and termination integrity per Reg 522.7 / 522.8.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Section 527 — fire stopping at every penetration"
            plainEnglish="Cables passing through fire-resisting walls / floors carry the fire risk through the compartmentation. Section 527 requires the penetration to be sealed to maintain the fire rating of the element. Tested intumescent products — pillows, mortar, putty, sleeves, batt-and-coat — matched to the fire rating and the cable bundle."
          >
            <p>Visual inspection of fire stopping checks:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Every penetration of a fire-resisting element is sealed.
              </li>
              <li>
                The product used is tested for the fire rating of the element (60 min, 120 min etc).
              </li>
              <li>
                The product is correctly applied per the manufacturer's installation drawings —
                depth, surface area, both sides where required, no gaps.
              </li>
              <li>
                The penetration is not oversized for the cable bundle (excess hole = harder to
                seal). Where oversized, additional sealing may be required.
              </li>
              <li>
                Records / labels at the penetration identifying the system used, installer, date —
                often required by building control and helpful for future maintenance.
              </li>
            </ul>
            <p>
              Common failures: foam used where intumescent required, plaster fill (no fire
              rating), partial seal (one side only), missing seal entirely. All are recordable
              defects with significant fire safety implications.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 527.2.1 (Sealing of penetrations)"
            clause="Where a wiring system passes through elements of building construction such as floors, walls, roofs, ceilings, partitions or cavity barriers, the openings remaining after passage of the wiring system shall be sealed according to the degree of fire resistance prescribed for the respective element of building construction (if any) before penetration."
            meaning={
              <>
                Section 527 ties cable installation directly to fire compartmentation. Visual
                inspection confirms every penetration of a fire-resisting element is sealed to
                the rating of that element. Untested foam, partial seal, or missing seal are all
                recordable C2 / C1 defects depending on the building use (residential
                compartmentation defect is typically C2, in HRRBs often C1).
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 52, Section 527, Regulation 527.2.1."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <CommonMistake
            title="Foam at fire-rated penetrations"
            whatHappens={
              <>
                Cable is run through a 60-min fire-rated wall in a commercial unit. Installer
                uses expanding foam to fill the gap around the cable. Foam looks neat and tidy,
                seals against draught, passes a casual look. But foam is combustible and has no
                tested fire rating — under fire, it burns out in minutes, breaching the fire
                compartmentation and allowing fire / smoke spread.
              </>
            }
            doInstead={
              <>
                Use tested intumescent products — pillows, mortar, putty, sleeves matched to the
                fire rating of the element and the cable bundle. Manufacturers (Hilti, Promat,
                etc) publish installation drawings for each product showing depth, application,
                bundle size limits. Photograph the application for the project records. On
                EICR, foam at a fire-rated penetration is a recordable defect — C2 typically,
                C1 in higher-risk buildings.
              </>
            }
          />

          <ConceptBlock
            title="Voltage drop — Reg 525 and Appendix 4"
            plainEnglish="Voltage drop limits how long a circuit run can be before the load voltage falls outside the equipment's tolerance. Reg 525 — typically 3% for lighting and 5% for other circuits at maximum demand. Appendix 4 has the calculation. Visual inspection cross-checks the cable size against the design current and circuit length to confirm voltage drop is within limit."
            onSite="A 2.5 mm² ring final 30 m long carrying 26 A has voltage drop of approx 2 V — well within 5% (11.5 V) at 230 V. A 1.5 mm² lighting circuit 50 m long carrying 6 A has voltage drop of approx 4.4 V — close to the 3% (6.9 V) limit. Long lighting runs in commercial environments often need 2.5 mm² to keep voltage drop in spec. Visual inspection considers route length against CSA."
          >
            <p>Reg 525 voltage drop limits:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Lighting circuits — 3% of nominal (6.9 V at 230 V single-phase).</strong>
                Lower limit because lighting equipment is sensitive to voltage and dim light is a
                quality / safety issue.
              </li>
              <li>
                <strong>Other use (sockets, fixed appliances) — 5% (11.5 V at 230 V).</strong>
                Slightly more permissive — equipment generally tolerant of small voltage variation.
              </li>
              <li>
                <strong>Higher limits permissible by special design.</strong> Where equipment
                manufacturer specifies wider tolerance, larger drop may be acceptable. Document
                as a departure with the manufacturer reference.
              </li>
              <li>
                <strong>Calculation method.</strong> Drop (V) = 2 × L × I × R / 1000 where L =
                length one-way (m), I = design current (A), R = single-conductor resistance
                (mΩ/m) from Appendix 4. Result is the drop on the loaded cable.
              </li>
              <li>
                <strong>Three-phase formula.</strong> Drop (V) = √3 × L × I × R / 1000 for balanced
                three-phase loads. Lower drop for the same conductor / current than single-phase.
              </li>
              <li>
                <strong>Visual inspection cross-check.</strong> Note circuit length and CSA;
                compute approximate drop; compare to limit; flag any close to or over.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Diversity and maximum demand — sizing the supply"
            plainEnglish="Maximum demand isn't the sum of every device rating — most loads aren't on simultaneously. Diversity factors reduce the calculated demand to a realistic figure. IET on-site guide and Appendix C of OSG provide diversity tables for typical installations. Visual inspection confirms the supply tail / main switch are sized for the calculated maximum demand, not the worst-case sum."
            onSite="On a domestic install you don't size for cooker + shower + immersion + every ring final all on simultaneously. Diversity reduces the design load to maybe 60-80% of the worst-case sum. Confirm the supply (typically 100 A for modern domestic) and main switch are adequate — common defect on additions is exceeding the supply capacity without realising."
          >
            <p>Diversity application:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Lighting circuits.</strong> Typically 66% of total connected lighting load
                in domestic; 90% in commercial / industrial where lighting is largely on
                continuously.
              </li>
              <li>
                <strong>Socket circuits.</strong> Highest-rated point + 40% of remainder for
                domestic ring finals; varies for radials.
              </li>
              <li>
                <strong>Cookers.</strong> First 10 A + 30% of remainder + 5 A if socket included
                in cooker switch (domestic typical).
              </li>
              <li>
                <strong>Instantaneous water heaters / showers.</strong> 100% of largest + 100% of
                second + 25% of remainder (domestic typical) — heavy diversity if multiple.
              </li>
              <li>
                <strong>Storage water heaters.</strong> 100% of largest + 100% of second + 25% of
                remainder — typically not all on simultaneously.
              </li>
              <li>
                <strong>EV chargers.</strong> Typically 100% — the charger is sized to deliver its
                rated load and operates at full power for hours during charging. Do not apply
                diversity to EV charger circuits.
              </li>
              <li>
                <strong>Heat pumps.</strong> Per manufacturer running current — typically full
                rated current for hours during heating cycles. Limited diversity.
              </li>
            </ul>
            <p>
              Visual inspection of the supply intake confirms tail size, main switch rating, and
              CU rating are all adequate for the calculated maximum demand. On additions
              (especially EV chargers and heat pumps), recalculate and confirm the supply still
              has capacity — common defect on retrofits is exceeding 80-100 A on a domestic
              supply without DNO uprating.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Cable colour identification on three-phase — the L2 black trap"
            plainEnglish="Post-harmonisation, three-phase L2 is black. In pre-harmonisation, black was neutral. Workers crossing between editions can easily mis-identify a black conductor as neutral when it's actually L2 — with potentially fatal consequences if a 'neutral' is left exposed and is actually live."
            onSite="When you see black, check what edition you're working in. Three-phase post-2004 = L2 (line). Anything pre-2004 = neutral. Mixed installation: a warning notice is industry good practice (formerly Reg 514.14, deleted by A2:2022) and verify polarity before any termination. Black is the most common error point in three-phase identification."
          >
            <p>Three-phase identification — pre and post harmonisation:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Post-harmonisation (BS 7671 from 2004 onwards).</strong> L1 brown, L2
                black, L3 grey, N blue, CPC green/yellow. Black is a LINE conductor.
              </li>
              <li>
                <strong>Pre-harmonisation (BS 7671 prior to 2004).</strong> L1 red, L2 yellow,
                L3 blue, N black, CPC green (very old) or green/yellow (later). Black is the
                NEUTRAL.
              </li>
              <li>
                <strong>Mixed colours — formerly Reg 514.14 (deleted by A2:2022).</strong> Where both colour systems exist in
                one installation, durable warning notice required at CU / DB. Workers must
                verify polarity before any termination on conductors of ambiguous colour.
              </li>
              <li>
                <strong>Common error point.</strong> A worker familiar with new colours assumes
                black = L2 and treats a pre-harmonisation black conductor as live. Or vice versa
                — assumes black = N on a post-harmonisation install and exposes themselves to
                live L2.
              </li>
              <li>
                <strong>Single-phase variants.</strong> Single-phase post-harmonisation L = brown,
                N = blue. Single-phase pre-harmonisation L = red, N = black. Same risks if mixed
                colours present.
              </li>
              <li>
                <strong>Sleeved conductors.</strong> Switch wires and similar may be a different
                base colour with brown sleeving / tape at terminations to indicate L. Common in
                older single-cable switch drops.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Mechanical protection — Reg 522.8 and the matching to environment"
            plainEnglish="Cables exposed to mechanical risk need protection appropriate to the risk. SWA (steel wire armoured) and MICC (mineral insulated copper clad) self-protect. T+E in trunking / conduit / capping. T+E exposed in normal-risk areas. Risk-assess against the actual environment, not against generic minimums."
            onSite="A cable run across a workshop floor isn't the same as a cable in a domestic loft. Match protection to use. Dropped tools, vehicle traffic, water exposure, UV, chemical exposure — each affects the cable selection. Reg 522.8 doesn't specify exact products; it requires the protection to be appropriate."
          >
            <p>Mechanical protection options by environment:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Domestic concealed routes.</strong> T+E in safe zones with RCD where
                applicable. Normal mechanical risk from future picture nails / shelves —
                addressed by safe zones / RCD / mechanical protection per Reg 522.6.
              </li>
              <li>
                <strong>Domestic exposed routes.</strong> T+E in PVC conduit / capping for
                aesthetic and minor protection. Typical loft / cellar runs exposed.
              </li>
              <li>
                <strong>Commercial fit-out.</strong> T+E or singles in steel conduit / trunking;
                SWA for any external runs or higher-risk areas.
              </li>
              <li>
                <strong>Industrial / workshop.</strong> SWA or MICC for runs subject to impact,
                heat, chemical exposure. Galvanised steel conduit for harsh environments.
              </li>
              <li>
                <strong>Underground / external.</strong> SWA at appropriate depth (typically
                450 mm minimum), with marker tape above. Caution at any building entry — fire /
                smoke / water sealing.
              </li>
              <li>
                <strong>Hazardous areas (DSEAR / ATEX).</strong> Specific product approval for
                the zone classification — Zone 1 explosive, Zone 2 explosive, Zone 21 dust, etc.
                Specialist work; specific cable / gland / enclosure types per BS EN 60079.
              </li>
              <li>
                <strong>Marine / saline environments.</strong> Corrosion-resistant materials —
                stainless steel cleats, marine-grade SWA, glands rated for saltwater exposure.
              </li>
            </ul>
            <p>
              Visual inspection considers the actual installation environment against the cable
              type and protection installed. Mismatches (PVC T+E exposed in a workshop floor
              area, for instance) are recordable defects — Cross on initial verification, C2 / C3
              on EICR depending on actual risk exposure.
            </p>
          </ConceptBlock>

          <Scenario
            title="Loft cable buried in insulation"
            situation={
              <>
                You are doing a periodic on a domestic install. The loft has been re-insulated
                since the original wiring — the new insulation depth is 270 mm, the cables are
                buried in the middle of the layer. Original design assumed cables in free air
                with 100 mm of insulation below. Cable size is 2.5 mm² T+E feeding bedroom
                lighting circuits, 6 A MCB.
              </>
            }
            whatToDo={
              <>
                Apply Method 100 / 101 derating from Appendix 4. 2.5 mm² T+E in Method 100
                (cable surrounded by insulation) typically has a current-carrying capacity of
                around 13.5 A — versus 27 A in free air. Original design at 6 A loaded is still
                within the derated capacity, so no overload risk. Document on the EICR as an
                observation: cables now buried in insulation, derating applied; recommend client
                consider alternative routing or ducting if any future load increase is planned.
                Not a defect requiring code, but a documented observation for the duty holder.
              </>
            }
            whyItMatters={
              <>
                Cable derating is an installation-method issue. The cable hasn't changed; what
                surrounds it has. Periodic inspection is exactly when these changes get caught.
                Documenting them on the EICR informs the duty holder — they may have planned
                changes (loft conversion, EV charger circuit) that change the calculation.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Reg 522.6.201 — cables in walls less than 50 mm from surface must be in safe zones AND/OR have RCD ≤ 30 mA AND/OR earthed mechanical protection. Combination required for certain wall types.",
              "Post-harmonisation colours (Reg 514.3) — single-phase L brown, N blue, CPC green/yellow. Three-phase L1/L2/L3 brown/black/grey.",
              "Mixed-colours warning notice — industry good practice (formerly Reg 514.14, deleted by A2:2022) where pre- and post-harmonisation colours coexist in one installation.",
              "Section 527 — every cable penetration of a fire-resisting element must be sealed with a tested product matched to the rating. Untested foam is a defect.",
              "Cable derating per Appendix 4 — Method 100 (cable in insulation) typically halves the free-air rating. Visual inspection confirms installed CSA against actual installation method.",
              "Cable support intervals per IET on-site guide / manufacturer — typical PVC/PVC T+E: 250 mm horizontal / 400 mm vertical. Heavier cables need closer support.",
              "Structural compliance for cable holes through joists — drilling preferred to notching, holes within centre third / middle 25-40% of span (Building Regs Part A / BS 5268).",
              "Conduit fill ratio per IET on-site guide — around 40-45% maximum for thermoplastic conduit; lower for steel. Higher fill = thermal derating.",
            ]}
          />

          <Quiz title="Cable installation inspection — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section2-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                2.3 Protective device inspection
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section2-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.5 Special locations visual checks
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
